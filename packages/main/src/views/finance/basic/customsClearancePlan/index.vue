<template>
  <div>
    <KeenList
      @refresh="refreshList"
      @reset-search="resetSearchData"
      @reset-search-by-key="(key) => (search[key] = undefined)"
    >
      <template #search>
        <el-input
          style="width: 200px"
          v-model="searchKeyword"
          placeholder="订单号"
          clearable
          @blur="handleBlur"
          @input="changeKeyword"
        >
          <template #suffix>
            <i class="iconfont icon-sousuo"></i>
          </template>
          <template #append>
            <div title="支持订单号多个搜索">
              <BatchSearchPopover ref="batchSearchRef" @search="handleBatchSearch" />
            </div>
          </template>
        </el-input>
      </template>
      <template #filters>
        <el-input
          style="width: 200px"
          v-model="search.skuKeyword"
          placeholder="供应链SKU"
          clearable
        />
        <el-date-picker
          v-model="search.deliveryTime"
          type="daterange"
          style="width: 260px"
          range-separator="-"
          start-placeholder="发货开始时间"
          end-placeholder="发货结束时间"
          format="YYYY/MM/DD"
          value-format="YYYY-MM-DD"
          :popper-options="{ placement: 'bottom-start' }"
        />
        <el-select
          v-model="search.logisticsAuditors"
          placeholder="物流审核人"
          :options="userList"
          multiple
          :clearable="true"
          filterable
          collapse-tags
          collapse-tags-tooltip
        />
        <el-select
          v-model="search.customsDeclarationMaintainStatus"
          clearable
          placeholder="报关维护状态"
        >
          <el-option
            v-for="item in maintenanceList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
        <el-select v-model="search.customsDeclarationStatus" clearable placeholder="报关状态">
          <el-option
            v-for="item in statusList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
        <el-select v-model="search.pushStatus" clearable placeholder="推送状态">
          <el-option
            v-for="item in pushList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </template>
      <template #buttons>
        <el-dropdown>
          <el-button type="primary">
            批量维护
            <el-icon class="el-icon--right"><arrow-down /></el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="customsDeclarationStatusChange(0, '未确认')">
                未确认
              </el-dropdown-item>
              <el-dropdown-item @click="customsDeclarationStatusChange(1, '需报关')">
                需报关
              </el-dropdown-item>
              <el-dropdown-item @click="customsDeclarationStatusChange(2, '无需报关')">
                无需报关
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-button class="button" type="primary" @click="pushData">批量推送积加</el-button>
        <BatchOperatePophover name="导出" :options="exportActions" />
      </template>
      <template #tools-prepend>
        <el-tooltip placement="top" v-if="store.taskMap.customsDeclarationPlanSync">
          <template #content>
            <div>数据获取并更新中…</div>
          </template>
          <i class="iconfont icon-shujutongbu1 icon-loading" @click="handleRefresh"></i>
        </el-tooltip>
        <el-tooltip placement="top" v-else>
          <template #content>
            <div>获取已发货订单及报关入库数据，更新报关计划</div>
            <div>上次更新时间：{{ store.taskMap?.customsDeclarationPlanLastRefreshTime }}</div>
          </template>
          <i class="iconfont icon-shujutongbu1" @click="handleRefresh"></i>
        </el-tooltip>
      </template>
      <el-table
        ref="tableRef"
        v-loading="listLoading"
        :data="listData?.customsDeclarationPlanList"
        @selection-change="handleSelectionChange"
        row-key="billNo"
        class-name="table-row-dashed"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column label="订单号" prop="erpCode" min-width="200" />
        <el-table-column label="供应链SKU" prop="supplySku" min-width="150" />
        <el-table-column label="供应链SKU名称" prop="supplySkuName" min-width="200" />
        <el-table-column label="发货时间" prop="deliveryTime" min-width="150" />
        <el-table-column label="物流审核人" prop="logisticsAuditorName" min-width="150" />
        <el-table-column
          label="报关维护"
          prop="customsDeclarationMaintainStatusDesc"
          min-width="150"
        />
        <el-table-column label="是否需要报关" width="200">
          <template #default="{ row }">
            <!-- 如为是，则不可编辑；如为否，已推送不可编辑，未推送可编辑；如为未确认，可编辑 -->
            <el-select
              v-model="customsDeclarationStatus"
              placeholder="报关状态"
              @change="changeCustomsDeclarationStatus(row)"
              class="select-edit"
              v-if="row.edit"
            >
              <el-option
                v-for="item in statusList"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              />
            </el-select>
            <span v-else>{{ row.customsDeclarationStatusDesc }}</span>
            <!-- 未推送 + 否 -->
            <el-icon
              style="color: var(--bs-success)"
              :size="20"
              class="icon"
              :class="{ mt5: !row.edit }"
              @click="changeEditStatus(row)"
              v-if="
                row?.customsDeclarationMaintainStatus !== 1 && !row?.jiJiaPushInfo?.pushStatus == 1
              "
            >
              <Edit />
            </el-icon>
          </template>
        </el-table-column>
        <el-table-column label="推送状态" prop="jiJiaPushInfo" width="120">
          <template #default="{ row }">
            <el-tooltip placement="top" effect="light">
              <template #content>
                <div
                  style="max-width: 600px; color: var(--bs-danger)"
                  v-if="row?.jiJiaPushInfo?.pushStatus == 2"
                >
                  {{ `推送失败：${row?.jiJiaPushInfo?.failReason}` }}
                </div>
                <div
                  style="max-width: 600px; color: var(--bs-text-gray-600)"
                  v-if="row?.jiJiaPushInfo?.pushStatus == 1"
                >
                  {{ `推送成功，最近推送时间：${row?.jiJiaPushInfo?.pushTime}` }}
                </div>
                <div
                  style="max-width: 600px; color: var(--bs-text-gray-600)"
                  v-if="row?.jiJiaPushInfo?.pushStatus == 0"
                >
                  未推送
                </div>
              </template>
              <el-icon
                style="color: var(--bs-danger)"
                :size="20"
                v-if="row?.jiJiaPushInfo?.pushStatus == 2"
              >
                <WarningFilled />
              </el-icon>
              <el-icon
                style="color: var(--bs-success)"
                :size="20"
                v-if="row?.jiJiaPushInfo?.pushStatus == 1"
              >
                <CircleCheckFilled />
              </el-icon>
              <el-icon style="color: #b6b6b6" :size="20" v-if="row?.jiJiaPushInfo?.pushStatus == 0">
                <RemoveFilled />
              </el-icon>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="120">
          <template #default="{ row }">
            <KeenActions
              display-style="buttons"
              :actions="[
                {
                  label: '推送',
                  key: 'push',
                  type: 'primary',
                  row: row,
                  disabled: !(
                    row?.jiJiaPushInfo?.pushStatus !== 1 && row.customsDeclarationStatus !== 0
                  ),
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
    </KeenList>
  </div>
</template>

<script setup lang="ts" name="customsClearancePlan">
  import useList from '@/hooks/list/useList';
  import {
    erpApi,
    financeSystemApi,
    memberApi,
    productOperationApi,
    ProductOperationApi,
  } from '@/api';
  import type { FinanceSystemContracts } from '@/api';
  import * as swal from '@/utils/swal';
  import { ElMessage } from 'element-plus';
  import { omit } from 'lodash-es';
  import {
    customsDeclarationPlanRefresh,
    stopCustomsDeclarationPlanRefresh,
  } from '@/worker/controls/notice';
  import { useStore } from '@/store/modules/useStore';
  import useTask from '@/store/modules/task';
  import { checkPermission } from '@/utils/permission';
  import { openWindow } from '@/utils';

  const user = useStore();
  const store = useTask();
  const PAGE_SIZE = 10;
  const pushList = [
    { name: '未推送', code: 0 },
    { name: '推送成功', code: 1 },
    { name: '推送失败', code: 2 },
  ];
  const statusList = [
    { name: '未确认', code: 0 },
    { name: '需报关', code: 1 },
    { name: '无需报关', code: 2 },
  ];
  const maintenanceList = [
    { name: '未确认', code: 0 },
    { name: '是', code: 1 },
  ];
  const tableRef = ref(null);
  const pageSizeOption = ref([10, 20, 50, 100, 500, 1000]);
  const {
    search,
    pagination: { total, current, pageSize, handleCurrentChange, handlePageSizeChange },
    listData,
    listLoading,
    runQuery,
    resetSearch,
    refreshList,
  } = useList<
    { codeKeywords?: string[]; pageNum: number; pageSize: number },
    FinanceSystemContracts.CustomsDeclarationPlanListResp
  >({
    searchDefaults: {
      codeKeywords: [],
      deliveryTime: undefined,
      skuKeyword: undefined,
      logisticsAuditors: [],
      customsDeclarationStatus: undefined,
      customsDeclarationMaintainStatus: undefined,
      pushStatus: undefined,
    },
    // eslint-disable-next-line no-shadow
    interceptSearchData: (searchData) => {
      const { deliveryTime } = searchData;
      return {
        ...omit(searchData, 'deliveryTime'),
        deliveryStartTime: deliveryTime ? deliveryTime[0] : undefined,
        deliveryEndTime: deliveryTime ? deliveryTime[1] : undefined,
      };
    },
    pageSize: PAGE_SIZE,
    service: financeSystemApi.financeBasicQueryCustomsDeclarationPlanList,
  });
  watch(listData, () => {
    listData.value?.customsDeclarationPlanList?.forEach((item) => {
      Reflect.set(item, 'edit', false);
    });
  });
  const router = useRouter();

  const exportActions = [
    {
      title: '导出所选',
      // hide: !checkPermission('orderAddUpload'),
      fn: async () => {
        const checkedList = tableRef.value?.getSelectionRows?.() || [];
        if (!checkedList?.length) {
          ElMessage.error('请选择要导出的数据');
          return;
        }
        await handlerExport({
          codes: checkedList.map((item) => item.erpCode),
        });
        tableRef.value?.clearSelection?.();
      },
    },
    {
      title: '按筛选条件导出',
      // hide: !checkPermission('updateAddressUpload'),
      fn: async () => {
        handlerExport({
          ...omit(search, 'deliveryTime'),
          deliveryStartTime: search.deliveryTime ? search.deliveryTime[0] : undefined,
          deliveryEndTime: search.deliveryTime ? search.deliveryTime[1] : undefined,
        });
      },
    },
  ];

  const handlerExport = async (params) => {
    const res = await financeSystemApi.financeBasicExportCustomsDeclarationPlanList(params);
    const isExportConfirm = await swal.exportConfirm();
    if (!isExportConfirm) return;

    await nextTick();
    const path = router.resolve({
      path: '/downloadmanage',
      query: {
        app_code: res?.appCode,
        module_code: res?.moduleCode,
        record_type: 2,
      },
    });
    openWindow(path.href);
  };

  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'push') {
      const text =
        row?.jiJiaPushInfo?.pushStatus == 1 ? '该数据已推送，是否覆盖？' : '确认推送吗？';
      const isConfirm = await swal.confirm(text);
      if (!isConfirm) return;
      const param = [
        {
          billTypes: [20],
          billNo: row.billNo,
          systemCode: 'jijia',
        },
      ];
      const res = await financeSystemApi.financeBasicBatchSyncThirdSystemBill(param).catch(() => {
        runQuery();
      });
      if (res) {
        ElMessage.success('推送成功');
        runQuery();
      }
    }
  };

  const userList: any = ref([]);
  const getCreatorList = async () => {
    const res = await memberApi.luteosMemberQueryDeptMemberList({
      operatorDepartmentCode: 'all_dept',
    });
    userList.value = res.memberList!.map((item) => {
      return {
        label: item.name,
        value: item.memberCode,
      };
    });
  };
  getCreatorList();

  const customsDeclarationStatus = ref(0);
  // 编辑状态
  const changeEditStatus = (row) => {
    if (row.edit) {
      row.edit = false;
      return;
    }
    listData.value?.customsDeclarationPlanList?.forEach((item) => {
      if (item.billNo == row.billNo) {
        item.edit = true;
      } else {
        item.edit = false;
      }
    });

    customsDeclarationStatus.value = row.customsDeclarationStatus;
  };
  const billNoList = ref([]);
  const handleSelectionChange = (list) => {
    billNoList.value = list.map((item) => item.billNo);
  };
  const customsDeclarationStatusChange = async (status, text) => {
    const isConfirm = await swal.confirm(`确认批量更新为${text}？`);
    if (!isConfirm) return;
    const param = {
      listBillNo: billNoList.value,
      customsDeclarationStatus: status, // 报关状态：0-未确认 1-是 2-否
    };
    const res = await financeSystemApi
      .financeBasicBatchUpdateCustomsDeclarationStatus(param)
      .catch(() => {
        runQuery();
      });
    if (res) {
      ElMessage.success('操作成功');
      setTimeout(() => {
        runQuery();
        tableRef.value?.clearSelection();
      }, 800);
    }
  };

  const changeCustomsDeclarationStatus = (row) => {
    const param = {
      listBillNo: [row.billNo],
      customsDeclarationStatus: customsDeclarationStatus.value, // 报关状态：0-未确认 1-是 2-否
    };
    financeSystemApi.financeBasicBatchUpdateCustomsDeclarationStatus(param);
    row.edit = false;
    ElMessage.success('操作成功');
    const find = statusList.find((item) => {
      return item.code == customsDeclarationStatus.value;
    });
    if (find) {
      row.customsDeclarationStatusDesc = find.name;
    }
    setTimeout(() => {
      runQuery();
    }, 800);
  };
  // 批量推送积加
  const pushData = async () => {
    if (billNoList.value.length) {
      const isConfirmed = await swal.confirm('确认批量推送积加吗？');
      if (!isConfirmed) return;
      const param: any = [];
      billNoList.value.forEach((billNo) => {
        param.push({
          billTypes: [20],
          billNo,
          systemCode: 'jijia',
        });
      });
      financeSystemApi.financeBasicBatchSyncThirdSystemBill(param);
      runQuery();
      tableRef.value?.clearSelection();
    } else {
      ElMessage.warning('请先勾选数据');
    }
  };

  const batchSearchRef = ref();
  const searchKeyword = ref();
  const handleBlur = (e) => {
    if (e.target.value) {
      batchSearchRef.value?.clear();
    }
  };
  const changeKeyword = () => {
    if (searchKeyword.value) {
      search.codeKeywords = [searchKeyword.value];
    } else {
      search.codeKeywords = [];
    }
    batchSearchRef.value?.clear();
  };
  const handleBatchSearch = (val) => {
    searchKeyword.value = '';
    search.codeKeywords = val
      ?.split('\n')
      .map((x) => x.trim())
      .filter((x) => x);
  };
  const resetSearchData = () => {
    searchKeyword.value = '';
    resetSearch();
  };

  const handleRefresh = async () => {
    if (store.taskMap.customsDeclarationPlanSync) {
      return;
    }
    await financeSystemApi.financeBasicPlatformRefresh({
      modelCode: 'customs_declaration_plan',
      // forceRefresh: true,
      // param: {
      //   type: 1,
      // },
    });
    store.taskMap.customsDeclarationPlanSync = true;
    customsDeclarationPlanRefresh(user.token as string);
  };

  watch(
    () => store.taskMap.customsDeclarationPlanSync,
    (val) => {
      if (!val) refreshList();
    }
  );

  onMounted(() => {
    customsDeclarationPlanRefresh(user.token as string);
  });

  onBeforeUnmount(() => {
    stopCustomsDeclarationPlanRefresh();
  });
</script>

<style scoped lang="scss">
  .page-top-box {
    background-color: #fff;
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 12px;

    .text-num {
      font-weight: 500;
      margin-right: 30px;
    }

    .text-bule {
      color: #75a3f4;
    }

    .text-green {
      color: #50cf7e;
    }

    .text-red {
      color: #ef6868;
    }
  }

  .icon {
    display: inline-block;
    cursor: pointer;
    float: right;
    margin-top: 8px;
    margin-right: 15px;
  }
  .mt5 {
    margin-top: 0px;
  }

  .select-edit {
    width: 110px;
  }

  .icon-shujutongbu1 {
    color: #666666;
    cursor: pointer;
  }
  .icon-loading {
    color: #666666;
    cursor: pointer;
    animation: rotate 1s linear infinite;
  }
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
