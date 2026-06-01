<template>
  <KeenList
    :custom-fields="customFieldList"
    :conditionCode="conditionCode"
    @refresh="refreshList"
    @refresh-custom-fields="queryCustomFieldList"
    @reset-search="reset"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input
        v-model="search.keyword"
        :placeholder="searchTypeMap[search.keywordType]?.placeholder"
        style="width: 300px"
        clearable
      >
        <template #prepend>
          <el-select v-model="search.keywordType" class="w-100px">
            <el-option label="产品SKU" :value="1" />
            <el-option label="产品名称" :value="4" />
          </el-select>
        </template>
        <template #suffix>
          <i class="iconfont icon-sousuo"></i>
        </template>
        <template #append v-if="search.keywordType === 1">
          <BatchSearchPopover ref="batchSearchRef" @search="handleBatchSearch" />
        </template>
      </el-input>
    </template>
    <template #filters>
      <customerSelect
        v-model="search.customerCodeList"
        placeholder="客户"
        clearable
        multiple
        collapse-tags
        collapse-tags-tooltip
      />
      <el-select
        v-model="search.customerCollectCodeList"
        placeholder="客户汇总名称"
        filterable
        clearable
        multiple
        collapse-tags
        collapse-tags-tooltip
      >
        <el-option
          v-for="item in dickbook.customer_collect_list"
          :key="item.code"
          :label="item.name"
          :value="item.code"
        />
      </el-select>
      <WarehouseSelect
        v-model="search.warehouseCodeList"
        placeholder="目的仓"
        filterable
        clearable
        multiple
        collapse-tags
        collapse-tags-tooltip
      />
      <!-- 所属组织 -->
      <el-select v-model="search.organizationDeptId" placeholder="所属组织" clearable>
        <el-option
          v-for="item in dickbook.organization_dept"
          :key="item.deptId"
          :label="item.deptName"
          :value="item.deptId"
        />
      </el-select>
      <!-- 销售 -->
      <el-select v-model="search.saler" placeholder="销售" clearable filterable>
        <el-option
          v-for="item in dickbook.saler_dept"
          :key="item.memberCode"
          :label="item.name"
          :value="item.memberCode"
        />
      </el-select>
      <el-select
        v-model="search.saleStatusList"
        placeholder="产品状态"
        filterable
        clearable
        :teleported="false"
        multiple
        collapse-tags
        collapse-tags-tooltip
      >
        <!-- 销售状态: 1-在售 2-不在售 or 1-未上架 2-在销售 3-清仓中 4-已退市 -->
        <el-option label="未上架" :value="1" />
        <el-option label="在销售" :value="2" />
        <el-option label="清仓中" :value="3" />
        <el-option label="已退市" :value="4" />
      </el-select>
      <el-select
        v-model="search.statusList"
        placeholder="预测状态"
        clearable
        multiple
        collapse-tags
        collapse-tags-tooltip
      >
        <!-- 预测状态: 0-开启 1-关闭 2-锁定 -->
        <el-option label="开启" :value="0" />
        <el-option label="关闭" :value="1" />
        <!-- <el-option label="锁定" :value="2" /> -->
      </el-select>

      <el-select
        v-model="search.operatorList"
        placeholder="运营"
        filterable
        clearable
        multiple
        collapse-tags
        collapse-tags-tooltip
      >
        <el-option
          v-for="person of dickbook.operator_dept"
          :key="person.value"
          :label="person.label"
          :value="person.value"
        />
      </el-select>
      <el-select
        v-model="search.planerList"
        placeholder="计划"
        filterable
        clearable
        :teleported="false"
        multiple
        collapse-tags
        collapse-tags-tooltip
      >
        <el-option
          v-for="person of dickbook.supply_planer_dept"
          :key="person.value"
          :label="person.label"
          :value="person.value"
        />
      </el-select>
    </template>
    <template #buttons>
      <el-button
        type="primary"
        @click="
          router.push({
            path: '/salesForecastingList/retailAdd',
          })
        "
      >
        添加预测商品
      </el-button>
      <!-- <el-button type="primary" @click="importRetailDialogRef?.open('批量添加预测商品')">
        批量添加预测商品
      </el-button> -->
      <el-button
        class="button"
        type="primary"
        @click="multiUpdate"
        :disabled="multipleSelection.length === 0"
      >
        批量更新预测
      </el-button>
      <el-button type="primary" @click="importRetailDialogRef?.open('上传更新预测')">
        上传更新预测
      </el-button>
      <el-button type="primary" plain @click="handleExport" v-loading="exportLoading">
        导出
      </el-button>
      <el-dropdown @command="handleCommand">
        <el-button type="primary">
          批量操作
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="batchAddProduct">批量添加预测商品</el-dropdown-item>
            <!--            <el-dropdown-item command="batchAddNew">批量添加新品</el-dropdown-item>-->
            <el-dropdown-item command="batchOpen">批量开启</el-dropdown-item>
            <el-dropdown-item command="batchClose">批量关闭</el-dropdown-item>
            <!-- <el-dropdown-item command="sort">排序设置</el-dropdown-item>
            <el-dropdown-item command="resetSort">重置排序</el-dropdown-item> -->
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      class-name="table-row-dashed"
      :row-key="(row) => row.uniqueCode"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="40" reserve-selection fixed />
      <el-table-column prop="skuCode" label="产品SKU" min-width="160" fixed>
        <template #default="{ row }">
          <span>{{ row.skuCode }}</span>
          <Copy :content="row.skuCode" />
        </template>
      </el-table-column>
      <el-table-column
        v-if="showBaseColumn('productName')"
        prop="productName"
        label="产品名称"
        min-width="160"
        fixed
      >
        <template #default="{ row }">
          <GoodsInfo
            hide-image
            :title="row.productName"
            :subtitle="row.skuCode"
            copy-title
            copy-subtitle
          />
        </template>
      </el-table-column>
      <el-table-column
        v-if="showBaseColumn('customerDesc')"
        prop="customerDesc"
        label="客户名称/客户汇总名称"
        min-width="120"
        fixed
      />
      <el-table-column
        v-if="showBaseColumn('warehouseDesc')"
        prop="warehouseDesc"
        label="发货仓库"
        min-width="120"
        fixed
      />
      <el-table-column
        v-if="showBaseColumn('organizationDeptIdDesc')"
        prop="organizationDeptIdDesc"
        label="所属组织"
        min-width="120"
      />
      <el-table-column
        v-if="showBaseColumn('salerName')"
        prop="salerName"
        label="销售"
        min-width="120"
      />
      <el-table-column
        v-if="showBaseColumn('salesStatusDesc')"
        prop="salesStatusDesc"
        label="产品状态"
        min-width="100"
      >
        <template #default="{ row }">
          <Tag :color="saleStatusColorMap[row.salesStatus]">{{ row.salesStatusDesc }}</Tag>
        </template>
      </el-table-column>
      <el-table-column
        v-if="showBaseColumn('statusDesc')"
        prop="statusDesc"
        label="预测状态"
        min-width="100"
      >
        <template #default="{ row }">
          <Tag :color="statusColorMap[row.status]">{{ row.statusDesc }}</Tag>
        </template>
      </el-table-column>
      <el-table-column
        v-if="showBaseColumn('updateTime')"
        prop="updateTime"
        label="预测更新时间"
        min-width="160"
      />
      <el-table-column
        v-if="showBaseColumn('operatorName')"
        prop="operatorName"
        label="运营"
        min-width="100"
      />
      <el-table-column
        v-if="showBaseColumn('plannerName')"
        prop="plannerName"
        label="计划"
        min-width="100"
      />
      <template v-if="listData?.recordList?.length">
        <el-table-column
          width="140px"
          :label="column.desc"
          :key="column.desc"
          v-for="(column, index) of realSalesList"
        >
          <template #default="{ $index }">
            {{ listData?.recordList[$index]?.salesList[index]?.value }}
          </template>
        </el-table-column>
        <el-table-column
          width="140px"
          :label="column.month"
          :key="column.month"
          v-for="(column, index) of realInventoryList"
        >
          <template #default="{ $index }">
            {{
              listData?.recordList[$index]?.salesForecastItemInventoryMonthBeanList[index]?.value
            }}
          </template>
        </el-table-column>
        <el-table-column
          width="140px"
          :label="column.week"
          :key="column.week"
          v-for="(column, index) of realSalesForecastList"
        >
          <template #default="{ $index }">
            {{ listData?.recordList[$index]?.salesForecastItemWeekBeanList[index]?.value }}
          </template>
        </el-table-column>
      </template>
      <el-table-column prop="actions" label="操作" min-width="100" fixed="right">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '预测历史',
                key: 'history',
                type: 'primary',
                text: true,
                row,
              },
              {
                label: '更新预测',
                key: 'update',
                type: 'primary',
                text: true,
                hide: row.status === 1,
                row,
              },
              {
                label: '关闭',
                key: 'close',
                type: 'primary',
                text: true,
                hide: row.status === 1,
                row,
              },
              {
                label: '开启',
                key: 'open',
                type: 'primary',
                text: true,
                hide: !(row.status === 1),
                row,
              },
              {
                label: '销量',
                key: 'salesCount',
                type: 'primary',
                text: true,
                row,
              },
            ]"
            @click="handleActions"
          />
        </template>
      </el-table-column>
    </el-table>
    <KeenPagination
      :current="current"
      :page-size="pageSize"
      :page-size-option="pageSizeOption"
      :total="total"
      @size-change="handlePageSizeChange"
      @current-change="handleCurrentChange"
    />
    <importRetailDialog :params="search" ref="importRetailDialogRef" @close="runQuery" />
    <PredictingHistoryDialog ref="predictingHistoryDialogRef" />
    <UpdateDialog ref="updateDialogRef" @success="runQuery" />
  </KeenList>
</template>

<script lang="ts" setup name="retail">
  import { erpApi, ErpApi, memberApi, platformApi } from '@/api/index';
  import useList from '@/hooks/list/useList';
  import * as swal from '@/utils/swal';
  import { ElMessage } from 'element-plus';
  import { openWindow } from '@/utils';
  import importRetailDialog from './components/importRetailDialog.vue';
  import PredictingHistoryDialog from './components/predictingHistoryDialog.vue';
  import UpdateDialog from './components/updateDialog.vue';
  import { useRouter } from 'vue-router';
  import customerSelect from '@/views/supplyChainManage/efficiencyTools/salesForecasting/components/customerSelect.vue';
  import WarehouseSelect from '@/views/supplyChainManage/efficiencyTools/salesForecasting/components/warehouseSelect.vue';
  import PredictingSnapshotsDialog from './components/predictingSnapshotsDialog.vue';
  import customFields from './customFields';

  const router = useRouter();
  const route = useRoute();

  const saleStatusColorMap = ref({
    1: 'gray',
    2: 'green',
    3: 'yellow',
    4: 'red',
  });
  const statusColorMap = ref({
    0: 'green',
    1: 'red',
    2: 'yellow',
  });
  const PAGE_SIZE = 10;

  const searchTypeMap = {
    1: {
      label: '产品SKU',
      placeholder: '产品SKU',
    },
    4: {
      label: '产品名称',
      placeholder: '产品名称',
    },
  };

  const batchSearchRef = ref();
  const tableRef = ref(null);
  const exportLoading = ref(false);
  const importRetailDialogRef = ref(); // 批量添加预测商品、上传更新预测
  const predictingHistoryDialogRef = ref(); // 预测历史
  const updateDialogRef = ref(); // 更新预测

  // const detailDialogRef = ref();
  // const importDialogRef = ref();
  // const batchImportDialogRef = ref();
  // const updateDialogRef = ref();
  // const predictingSnapshotsDialogRef = ref();
  // const predictingHistoryDialogRef = ref();
  // const addDialogRef = ref();
  // const sortDialogRef = ref();
  // const exportLoading = ref(false);

  const handleCommand = async (command: string) => {
    switch (command) {
      case 'batchOpen':
        batchChangeStatus(0);
        break;
      case 'batchClose':
        batchChangeStatus(1);
        break;
      case 'batchAddProduct':
        // batchImportDialogRef.value?.open(1);
        importRetailDialogRef.value?.open('批量添加预测商品');
        break;
        // case 'batchAddNew':
        //   batchImportDialogRef.value?.open(1);
        //   break;
        //  case 'sort':
        //   sortDialogRef.value.open();
        //   break;
        // case 'resetSort':
        //   resetSort();
        break;
      default:
        break;
    }
  };

  const batchChangeStatus = async (targetStatus = 0) => {
    if (!multipleSelection.value?.length) return ElMessage.warning('请先选择要操作的商品');
    const text = targetStatus === 0 ? '开启' : '关闭';
    const res = await swal.confirm(`确认批量${text}已选的在线商品吗?`);
    if (res) {
      await erpApi.luteosErpRetailSaleForecastBatchChangeStatus({
        idList:
          multipleSelection.value?.map((item) => {
            return item.id;
          }) || [],
        status: targetStatus,
      });
      ElMessage.success('操作成功');
      tableRef.value.clearSelection();
      runQuery();
    }
  };

  const {
    search,
    pagination: {
      total,
      current,
      pageSize,
      handleCurrentChange,
      pageSizeOption,
      handlePageSizeChange,
    },
    listData,
    listLoading,
    refreshList,
    resetSearch,
    runQuery,
  } = useList<
    ErpApi.LuteosErpRetailSaleForecastQueryList.RequestBody,
    ErpApi.LuteosErpRetailSaleForecastQueryList.ResponseBody
  >({
    searchDefaults: {
      keywordType: 1,
      keyword: undefined,
      customerCodeList: [],
      operatorList: [],
      warehouseCodeList: [],
      customerCollectCodeList: [],
      saleStatusList: [],
      statusList: [0],
      planerList: [],
      organizationDeptId: undefined,
      saler: undefined,
    },
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpRetailSaleForecastQueryList,
  });

  const showBaseColumn = (label) => {
    return customFieldList.value
      ?.find((item) => item?.title === '基础信息')
      ?.checkedArr?.includes(label);
  };

  // 统一获取某分组（标题）的切片上限，兼容单选/多选的 checkedArr 形态
  const getSliceEndByTitle = (title: string): number | undefined => {
    const group = customFieldList.value?.find((item) => item?.title === title);
    const checked = group?.checkedArr;
    const key = Array.isArray(checked) ? checked[0] : checked;
    const endStr = String(key ?? '').split('-')[1];
    return endStr ? Number(endStr) : undefined;
  };

  // 基于标题做切片，找不到上限时返回完整数组
  const sliceByTitle = (baseData: any[] = [], title: string) => {
    const end = getSliceEndByTitle(title);
    return baseData.slice(0, end ?? baseData.length);
  };
  const record = computed(() => listData?.value?.recordList?.[0] ?? {});
  // 统一生成三个列表
  const realSalesList = computed(() => sliceByTitle(record.value?.salesList ?? [], '销量信息'));
  const realInventoryList = computed(() =>
    sliceByTitle(record.value?.salesForecastItemInventoryMonthBeanList ?? [], '库存水位')
  );
  const realSalesForecastList = computed(() =>
    sliceByTitle(record.value?.salesForecastItemWeekBeanList ?? [], '预测信息')
  );

  const getCreatorList = async () => {
    const [res1, res2, res3, res4] = await Promise.all([
      memberApi.luteosMemberQueryDeptMemberMap({
        operatorDepartmentCode: ['all_dept', 'supply_planer_dept'],
      }),
      erpApi.luteosErpPlanPsfccQueryList({
        pageNum: 1,
        pageSize: 500,
        status: 0,
      }),
      // 所属组织
      erpApi.luteosErpMemberQuerySubDeptList({
        deptIdList: [986555723, 986773513, 986928017, 986581684],
        searchChildDept: true,
      }),
      // 销售
      erpApi.luteosErpMemberQueryDeptMemberList({
        deptId: 971474265,
      }),
    ]);
    return {
      operator_dept: res1.all_dept!.map((item) => {
        return {
          label: item.name,
          value: item.memberCode,
        };
      }),
      supply_planer_dept: res1.supply_planer_dept!.map((item) => {
        return {
          label: item.name,
          value: item.memberCode,
        };
      }),
      customer_collect_list: res2.recordList,
      organization_dept: res3.deptInfoList,
      saler_dept: res4.memberList,
    };
  };

  const dickbook: any = ref({
    operator_dept: [],
    customer_collect_list: [],
    organization_dept: [],
    saler_dept: [],
  });

  const initDickbook = async () => {
    const memeberList = await getCreatorList();
    dickbook.value = {
      ...memeberList,
    };
  };
  // 获取列表自定义字段
  const conditionCode = ref<any>(null);
  const customFieldList = ref<typeof customFields>([]);
  const queryCustomFieldList = async () => {
    const res = await platformApi.platformSearchQueryConditionList({
      platform: 'lute_erp',
      moduleType: 'list',
      itemType: route?.name ? String(route?.name) : '',
      pageSize: 1,
      pageNum: 1,
    });

    if (res?.recordList?.length) {
      const hideList = JSON.parse(res?.recordList[0]?.searchCondition || '[]');
      customFieldList.value = customFields?.map((item) => {
        return {
          ...item,
          propertyArr: item.propertyArr?.map((k) => {
            return {
              ...k,
              checked: !hideList?.includes(k?.key),
            };
          }),
          checkedArr: item.propertyArr
            ?.filter((item) => !hideList?.includes(item?.key))
            ?.map((k) => k.key),
        };
      });
      conditionCode.value = res?.recordList[0]?.conditionCode;
    } else {
      customFieldList.value = customFields?.map((item) => {
        return {
          ...item,
          checkedArr: item.propertyArr?.filter((item) => item.checked)?.map((k) => k.key),
        };
      });
    }
  };
  const reset = () => {
    batchSearchRef.value?.clear();
    resetSearch();
  };

  const handleBatchSearch = (val) => {
    search.keyword = val?.replace(/\n/g, ',');
  };

  const multiUpdate = () => {
    const errorRows = multipleSelection.value.filter((row) => {
      return row.status === 1;
    });
    if (errorRows && errorRows.length) {
      ElMessage.warning('含有预测状态“关闭”的在线商品，不可操作！');
    } else {
      updateDialogRef.value?.open(multipleSelection.value, 3);
    }
  };

  const changeStatus = async (row, targetStatus = 0) => {
    const text = targetStatus === 0 ? '开启' : '关闭';
    const res = await swal.confirm(`确认${text}?`);
    if (res) {
      await erpApi.luteosErpRetailSaleForecastBatchChangeStatus({
        idList: [row.id],
        status: targetStatus,
      });
      ElMessage.success('操作成功');
      runQuery();
    }
  };
  const handleActions = (item) => {
    const { key, row } = item;
    if (key === 'open') {
      changeStatus(row, 0);
    } else if (key === 'close') {
      changeStatus(row, 1);
    } else if (key === 'update') {
      updateDialogRef.value?.open([row], 3);
    } else if (key === 'history') {
      predictingHistoryDialogRef.value.open(row, 'retail');
    } else if (key === 'salesCount') {
      router.push({
        path: '/salesStatistics',
        query: {
          onlineSkuCode: row.onlineSkuCode,
          tab: 'retail',
        },
      });
    }
  };

  const multipleSelection = ref<any[]>([]);
  const handleSelectionChange = (val: any[]) => {
    multipleSelection.value = val;
  };

  const handleExport = async () => {
    try {
      exportLoading.value = true;
      await erpApi.luteosErpRetailSaleForecastExportTemplate({
        ...search,
        pageNum: current.value,
        pageSize: pageSize.value,
      });
      const isConfirmed = await swal.confirm({
        text: '下载中，请前往下载任务中心查看。',
        icon: 'success',
        confirmButtonText: '去查看',
        cancelButtonText: '知道了',
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-active-light',
        },
      });
      if (!isConfirmed) return;
      openWindow('/downloadmanage');
    } finally {
      exportLoading.value = false;
    }
  };

  onMounted(() => {
    initDickbook();
    queryCustomFieldList();
  });
</script>

<style scoped lang="scss">
  :deep(.el-table-fixed-column--left) {
    background-color: white !important;
  }

  :deep(.el-table-fixed-column--right) {
    background-color: white !important;
  }

  .batch-search {
    .batch-search-textarea {
      border: none;
      max-height: 300px;
      outline: none;
      width: 100%;
    }
  }
</style>
