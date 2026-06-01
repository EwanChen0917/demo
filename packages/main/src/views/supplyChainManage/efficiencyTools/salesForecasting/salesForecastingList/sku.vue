<template>
  <KeenList
    :resetBtnOptions="{
      size: 'small',
    }"
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input
        size="small"
        v-model="search.keyword2"
        :placeholder="searchTypeMap[search.keyword2Type]?.placeholder"
        style="width: 335px"
        clearable
      >
        <template #prepend>
          <el-select v-model="search.keyword2Type" style="width: 100px">
            <el-option
              v-for="(item, key) in searchTypeMap"
              :value="parseInt(key)"
              :label="item.label"
              :key="key"
            />
          </el-select>
        </template>
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-select
        style="width: 160px"
        v-model="search.saleStatusList"
        placeholder="销售状态"
        filterable
        clearable
        :teleported="false"
        multiple
      >
        <el-option label="未上架" :value="1" />
        <el-option label="在销售" :value="2" />
        <el-option label="清仓中" :value="3" />
        <el-option label="已退市" :value="4" />
      </el-select>
      <el-select
        size="small"
        v-model="search.statusList"
        placeholder="预测状态"
        filterable
        clearable
        multiple
        collapse-tags
        collapse-tags-tooltip
      >
        <el-option label="开启" :value="0" />
        <el-option label="关闭" :value="1" />
        <el-option label="锁定" :value="2" />
      </el-select>
      <!--      <CountrySelect v-model="search.country" placeholder="站点" clearable style="width: 120px" />-->
      <el-select size="small" v-model="search.channel" placeholder="渠道" filterable clearable>
        <el-option
          v-for="person of dickbook.sales_forecast_channel"
          :key="person.value"
          :label="person.desc"
          :value="person.value"
        />
      </el-select>
      <ErpSiteSelect
        size="small"
        v-model="search.country"
        teleported
        clearable
        :channel="search.channel"
      />
      <el-select size="small" v-model="search.operator" placeholder="运营" filterable clearable>
        <el-option
          v-for="person of dickbook.supply_operator_dept"
          :key="person.value"
          :label="person.label"
          :value="person.value"
        />
      </el-select>
      <el-select size="small" v-model="search.planer" placeholder="计划" filterable clearable>
        <el-option
          v-for="person of dickbook.supply_planer_dept"
          :key="person.value"
          :label="person.label"
          :value="person.value"
        />
      </el-select>
      <el-popover
        popper-class="rt_el_pop"
        :offset="0"
        :hide-after="0"
        placement="bottom-end"
        :width="300"
        trigger="click"
      >
        <div class="h-xl-100">
          <div class="px-7 py-5">
            <div class="fs-4 text-dark fw-bold">筛选条件</div>
          </div>
          <div class="separator border-gray-200"></div>
          <div class="py-5 h-xl-100">
            <div
              style="
                height: calc(100% - 100px);
                padding-left: 1.75rem;
                padding-right: 1rem;
                margin-right: 0.75rem;
              "
            >
              <div class="mb-5">
                <third-category
                  style="width: 100%"
                  v-model="search.thirdCategoryCode"
                  placeholder="三级分类"
                  clearable
                />
              </div>
              <div class="mb-5">
                <el-tree-select
                  multiple
                  ref="catTreeSelectRef"
                  placeholder="运营人部门"
                  v-model="search.operatorDepts"
                  :data="deptTree"
                  filterable
                  clearable
                  check-strictly
                  popper-class="picker-cat-tree-select"
                  highlight-current
                  :teleported="false"
                />
              </div>
              <div class="mb-5">
                <ProductShopSelect
                  v-model="search.shops"
                  placeholder="店铺账号"
                  clearable
                  multiple
                />
              </div>
              <div class="mb-5">
                <ProductLineSelect v-model="search.productLineCodes" clearable multiple />
              </div>
              <div class="mb-5">
                <el-select
                  v-model="search.modelCodes"
                  placeholder="型号"
                  :teleported="false"
                  filterable
                  clearable
                  multiple
                >
                  <el-option
                    v-for="item in modelList"
                    :key="item.modelCode"
                    :label="item.modelName"
                    :value="item.modelCode"
                  />
                </el-select>
              </div>
              <div class="mb-5">
                <el-select
                  v-model="search.tags"
                  placeholder="标签"
                  :teleported="false"
                  filterable
                  clearable
                  multiple
                >
                  <el-option
                    v-for="item in labelList"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  />
                </el-select>
              </div>
              <div class="mb-5">
                <el-select v-model="search.noMapping" placeholder="是否新品" clearable>
                  <el-option label="是" :value="true" />
                  <el-option label="否" :value="false" />
                </el-select>
              </div>
            </div>
            <div
              class="d-flex justify-content-end"
              style="padding-left: 1.75rem; padding-right: 1.75rem; margin-top: 10px"
            >
              <el-button class="button" type="primary" @click="runQuery">查询</el-button>
              <el-button class="button" type="primary" @click="resetSearch">重置</el-button>
            </div>
          </div>
        </div>
        <template #reference>
          <div class="more-filter-icon">
            <el-icon class="Root-tyicon icon-Root-tyshaixuan"></el-icon>
          </div>
        </template>
      </el-popover>
    </template>
    <template #buttons>
      <el-button class="button" type="primary" @click="addDialogRef?.open(1, false)">
        添加预测商品
      </el-button>
      <el-button class="button" plain @click="addDialogRef?.open(1, true)">新品预测</el-button>
      <el-button class="button" plain @click="importDialogRef?.open(1)">上传更新</el-button>
      <el-button plain class="button" @click="predictingSnapshotsDialogRef?.open(1)">
        预测历史
      </el-button>
      <el-button
        class="button"
        plain
        @click="multiUpdate"
        :disabled="multipleSelection.length === 0"
      >
        批量更新预测
      </el-button>
      <el-dropdown @command="handleCommand">
        <el-button plain>
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
            <el-dropdown-item command="sort">排序设置</el-dropdown-item>
            <el-dropdown-item command="resetSort">重置排序</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <!--      <el-button
        type="primary"
        @click="batchChangeStatus(0)"
        :disabled="multipleSelection.length === 0"
      >
        批量开启
      </el-button>
      <el-button
        type="primary"
        @click="batchChangeStatus(1)"
        :disabled="multipleSelection.length === 0"
      >
        批量关闭
      </el-button>-->
      <el-button plain @click="handleExport" v-loading="exportLoading">导出</el-button>
    </template>
    <el-table
      ref="tableRef"
      border
      v-loading="listLoading"
      :data="listData?.recordList"
      class-name="table-row-dashed"
      @selection-change="handleSelectionChange"
      row-key="id"
    >
      <el-table-column type="selection" width="40" reserve-selection />
      <el-table-column min-width="360" prop="productName" label="产品信息/产品SKU">
        <template #header>
          <div class="d-flex align-items-center gap-1">
            <span>产品信息/产品SKU</span>
            <el-tooltip content="商品中心SKU编码" placement="top">
              <el-icon size="16" color="var(--el-color-primary)">
                <QuestionFilled />
              </el-icon>
            </el-tooltip>
          </div>
        </template>
        <template #default="{ row }">
          <GoodsInfo
            hide-image
            :title="row.productName"
            :subtitle="row.skuCode"
            copy-title
            copy-subtitle
          >
            <template #description>
              <div class="d-flex gap-5">
                <div v-if="row.noMapping">
                  <img
                    src="@/assets/svgs/newProductIcon.svg"
                    alt=""
                    class="w-25px newProductIcon"
                  />
                </div>
                <div
                  class="d-flex align-items-center gap-2"
                  v-for="item in row.tagItemList"
                  :key="item.itemCode"
                >
                  <el-tooltip :content="item.name" placement="top">
                    <img style="width: 25px; height: 25px" :src="item?.fullIconUrl" />
                  </el-tooltip>
                </div>
              </div>
            </template>
          </GoodsInfo>
        </template>
      </el-table-column>
      <el-table-column min-width="100" prop="salesStatusDesc" label="产品状态">
        <template #default="{ row }">
          <Tag :color="saleStatusColorMap[row.salesStatus]">{{ row.salesStatusDesc }}</Tag>
        </template>
      </el-table-column>
      <el-table-column min-width="100" prop="statusDesc" label="预测状态">
        <template #default="{ row }">
          <Tag :color="statusColorMap[row.status]">{{ row.statusDesc }}</Tag>
        </template>
      </el-table-column>
      <el-table-column prop="brandName" min-width="100" label="品牌" />
      <el-table-column min-width="100" prop="productLineName" label="品线" />
      <el-table-column min-width="150" prop="modelName" label="型号">
        <template #default="{ row }">
          <div v-if="row.modelName" class="d-flex flex-wrap gap-1">
            <template v-for="item of row.modelName.split(',')" :key="item">
              <el-tag type="info">{{ item }}</el-tag>
            </template>
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="200" prop="shop" label="店铺账号" />
      <el-table-column min-width="100" prop="channelDesc" label="渠道">
        <template #default="{ row }">
          <el-tag type="info">{{ row.channelDesc }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column min-width="150" prop="originalPlatformMark" label="渠道唯一标识" />
      <el-table-column prop="country" label="站点" min-width="100">
        <template #default="{ row }">
          <el-tag type="info">{{ row.country }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column min-width="150" prop="thirdCategoryName" label="三级分类" />
      <el-table-column min-width="150" prop="deptName" label="部门" />
      <el-table-column min-width="150" prop="operatorName" label="运营人员">
        <template #default="{ row }">
          <el-tag v-if="row.operatorName" round type="info">
            <SvgIcon icon="fullUser_red" class="me-1" />
            {{ row.operatorName }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column min-width="150" prop="plannerName" label="计划人员">
        <template #default="{ row }">
          <el-tag v-if="row.plannerName" round type="info">
            <SvgIcon icon="fullUser" class="me-1" />
            {{ row.plannerName }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column width="100" prop="updateTime" label="预测更新时间" />
      <template v-if="listData?.recordList?.length">
        <el-table-column
          width="140px"
          :label="column.desc"
          :key="column.desc"
          v-for="(column, index) of listData?.recordList[0].salesList"
        >
          <template #default="{ $index }">
            {{ listData?.recordList[$index]?.salesList[index]?.value }}
            <el-popover
              trigger="hover"
              placement="right"
              :offset="4"
              :width="330"
              :show-arrow="false"
              popper-class="rt_el_pop"
              v-if="
                listData?.recordList[$index]?.salesList[index]?.value > 0 &&
                search.channel === 'shopify'
              "
            >
              <template #reference>
                <i class="iconfont icon-jiantouxiangxia" style="color: var(--el-color-primary)" />
              </template>
              <div style="padding: 10px">
                销量: {{ listData?.recordList[$index]?.salesList[index]?.saleQty }}
                <br />
                售后: {{ listData?.recordList[$index]?.salesList[index]?.afterSaleReplacementQty }}
                <br />
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="lastActivitySales" width="140">
          <template #header>
            <div class="d-flex align-items-center gap-1">
              <span>上次活动销量</span>
              <el-tooltip placement="top">
                <template #content>
                  <div>1.根据最近一次活动开始和结束时间统计销量</div>
                  <div>2.选择结束时间最近的一次活动统计</div>
                </template>
                <el-icon size="16" color="var(--el-color-primary)">
                  <QuestionFilled />
                </el-icon>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          width="140px"
          :label="column.incrName"
          :key="column.incrName"
          v-for="(column, index) of listData?.recordList[0].activeIncrList?.filter(
            (item) => item?.incrName
          )"
        >
          <template #default="{ $index }">
            {{ listData?.recordList[$index]?.activeIncrList[index]?.incrValue }}
          </template>
        </el-table-column>
        <el-table-column
          width="140px"
          :label="column.week"
          :key="column.week"
          v-for="(column, index) of listData?.recordList[0].salesForecastItemWeekBeanList"
        >
          <template #default="{ $index }">
            {{ listData?.recordList[$index]?.salesForecastItemWeekBeanList[index]?.value }}
          </template>
        </el-table-column>
      </template>
      <el-table-column label="操作" width="140px" fixed="right">
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
                label: '关闭预测',
                key: 'close',
                type: 'primary',
                text: true,
                hide: row.status === 1,
                row,
              },
              {
                label: '开启预测',
                key: 'open',
                type: 'primary',
                text: true,
                hide: !(row.status === 1),
                row,
              },
              {
                label: '销量统计',
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
    <ImportDialog :search-params="search" ref="importDialogRef" @success="runQuery" />
    <BatchImportDialog ref="batchImportDialogRef" type="batchAddNew" @success="runQuery" />
    <DetailDialog ref="detailDialogRef" @success="runQuery" />
    <UpdateDialog ref="updateDialogRef" @success="handleSuccess" />
    <PredictingSnapshotsDialog ref="predictingSnapshotsDialogRef" />
    <PredictingHistoryDialog ref="predictingHistoryDialogRef" />
    <AddDialog ref="addDialogRef" @success="runQuery" />
    <SortDialog
      ref="sortDialogRef"
      @success="refreshList"
      :channel-list="dickbook.sales_forecast_channel"
      :type="1"
    />
    <ExportDialog ref="exportDialogRef" />
  </KeenList>
</template>

<script lang="ts" setup name="sku">
  import { erpApi, ErpApi, memberApi, platformApi, dataApi, productApi } from '@/api/index';
  import { useRouter } from 'vue-router';
  import * as swal from '@/utils/swal';
  import { ElMessage, ElSelect } from 'element-plus';
  import useList from '@/hooks/list/useList';
  import Tag from '@/components/Tag/index.vue';
  import { cloneDeep } from 'lodash-es';
  import ErpSiteSelect from '@/views/supplyChainManage/efficiencyTools/salesForecasting/components/erpSiteSelect.vue';
  import { QuestionFilled } from '@element-plus/icons-vue';
  import ThirdCategory from '@/views/supplyChainManage/efficiencyTools/salesForecasting/salesForecastingList/components/thirdCategory.vue';
  import axios from 'axios';
  import { useStore } from '@/store/modules/useStore';
  import BatchImportDialog from '@/views/supplyChainManage/efficiencyTools/salesForecasting/salesForecastingList/components/batchImportDialog.vue';
  import SortDialog from '@/views/supplyChainManage/efficiencyTools/salesForecasting/salesForecastingList/components/sortDialog.vue';
  import ImportDialog from './components/importDialog.vue';
  import DetailDialog from '../components/detailDialog.vue';
  import UpdateDialog from './components/updateDialog.vue';
  import PredictingSnapshotsDialog from './components/predictingSnapshotsDialog.vue';
  import PredictingHistoryDialog from './components/predictingHistoryDialog.vue';
  import AddDialog from './components/addDialog.vue';
  import ExportDialog from './components/exportDialog.vue';

  const router = useRouter();
  const PAGE_SIZE = 10;
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

  const searchTypeMap = {
    1: {
      label: '产品SKU',
      placeholder: '产品SKU(多个可用空格或逗号分隔)',
    },
    2: {
      label: '渠道唯一标识',
      placeholder: '渠道唯一标识(多个可用空格或逗号分隔)',
    },
    3: {
      label: 'sellerSku',
      placeholder: 'sellerSku(多个可用空格或逗号分隔)',
    },
    4: {
      label: '商品名称',
      placeholder: '商品名称',
    },
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
    ErpApi.LuteosErpSaleForecastV2QueryList.RequestBody,
    ErpApi.LuteosErpSaleForecastV2QueryList.ResponseBody
  >({
    searchDefaults: {
      keyword: '',
      statusList: [0, 2],
      saleStatus: '',
      saleStatusList: undefined,
      operator: '',
      channel: '',
      planer: '',
      country: '',
      createTimeStart: '',
      createTimeEnd: '',
      thirdCategoryCode: undefined,
      shops: undefined,
      productLineCodes: undefined,
      modelCodes: undefined,
      operatorDepts: undefined,
      tags: undefined,
      type: 1,
      keyword2Type: 1,
      keyword2: undefined,
      noMapping: undefined,
    },
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpSaleForecastV2QueryList,
  });
  const getCreatorList = async () => {
    const res = await memberApi.luteosMemberQueryDeptMemberMap({
      operatorDepartmentCode: ['supply_operator_dept', 'supply_planer_dept'],
    });
    return {
      supply_operator_dept: res.supply_operator_dept!.map((item) => {
        return {
          label: item.name,
          value: item.memberCode,
        };
      }),
      supply_planer_dept: res.supply_planer_dept!.map((item) => {
        return {
          label: item.name,
          value: item.memberCode,
        };
      }),
    };
  };
  const getCountryList = async () => {
    const res = await dataApi.luteosDataQueryCountryList({
      pageNum: 1,
      pageSize: 500,
    });
    return res.countryList!.map((item) => {
      return {
        label: item.countryName,
        value: item.countryCode,
      };
    });
  };
  const dickbook: any = ref({
    sales_forecast_channel: [],
    countryList: [],
    supply_operator_dept: [],
    supply_planer_dept: [],
  });
  const initDickbook = async () => {
    const memeberList = await getCreatorList();
    // const res = await platformApi.platformDict({
    //   dictCodes: ['supply_planer_dept', 'supply_operator_dept'],
    // });
    const channelList = await platformApi.platformAllList();
    // console.log(channelList);
    const countryList = await getCountryList();
    dickbook.value = {
      // ...res.dictMap,
      countryList,
      sales_forecast_channel: channelList,
      ...memeberList,
    };
  };
  const handleActions = (item) => {
    const { key, row } = item;
    if (key === 'view') {
      detailDialogRef.value.open(cloneDeep(row.weekBeanList));
    } else if (key === 'open') {
      changeStatus(row, 0);
    } else if (key === 'close') {
      changeStatus(row, 1);
    } else if (key === 'update') {
      updateDialogRef.value?.open([row], 1);
    } else if (key === 'history') {
      predictingHistoryDialogRef.value.open(row);
    } else if (key === 'salesCount') {
      router.push({
        path: '/salesStatistics',
        query: {
          onlineSkuCode: row.onlineSkuCode,
        },
      });
    }
  };
  const changeStatus = async (row, targetStatus = 0) => {
    const text = targetStatus === 0 ? '开启' : '关闭';
    const res = await swal.confirm(`确认${text}?`);
    if (res) {
      await erpApi.luteosErpSaleForecastV2BatchChangeStatus({
        idList: [row.id],
        status: targetStatus,
      });
      /* await erpApi.luteosErpSaleForecastV2ChangeStatus({
        channel: row.channel,
        country: row.country,
        onlineSkuCode: row.onlineSkuCode,
        status: targetStatus,
      }); */
      ElMessage.success('操作成功');
      runQuery();
    }
  };

  const tableRef = ref(null);
  const batchChangeStatus = async (targetStatus = 0) => {
    if (!multipleSelection.value?.length) return ElMessage.warning('请先选择要操作的商品');
    const text = targetStatus === 0 ? '开启' : '关闭';
    const res = await swal.confirm(`确认批量${text}已选的在线商品吗?`);
    if (res) {
      await erpApi.luteosErpSaleForecastV2BatchChangeStatus({
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

  const multipleSelection = ref<any[]>([]);
  const handleSelectionChange = (val: any[]) => {
    multipleSelection.value = val;
  };
  const multiUpdate = () => {
    const errorRows = multipleSelection.value.filter((row) => {
      return row.status === 1;
    });
    if (errorRows && errorRows.length) {
      ElMessage.warning('含有预测状态“关闭”的在线商品，不可操作！');
    } else {
      updateDialogRef.value?.open(multipleSelection.value, 1);
    }
  };
  const handleSuccess = () => {
    tableRef.value.clearSelection();
    runQuery();
  };

  onMounted(() => {
    initDickbook();
  });
  const detailDialogRef = ref();
  const importDialogRef = ref();
  const batchImportDialogRef = ref();
  const updateDialogRef = ref();
  const predictingSnapshotsDialogRef = ref();
  const predictingHistoryDialogRef = ref();
  const addDialogRef = ref();
  const sortDialogRef = ref();
  const exportLoading = ref(false);
  const user = useStore();

  const handleCommand = async (command: string) => {
    switch (command) {
      case 'batchOpen':
        batchChangeStatus(0);
        break;
      case 'batchClose':
        batchChangeStatus(1);
        break;
      case 'batchAddProduct':
        batchImportDialogRef.value?.open(1);
        break;
      case 'batchAddNew':
        batchImportDialogRef.value?.open(1);
        break;
      case 'sort':
        sortDialogRef.value.open();
        break;
      case 'resetSort':
        resetSort();
        break;
      default:
        break;
    }
  };

  const resetSort = async () => {
    const isConfirmed = await swal.confirm('确认重置排序设置吗？');
    if (!isConfirmed) return;
    const res = await erpApi.luteosErpSaleForecastV2ClearSort({
      type: 1,
    });
    ElMessage.success('重置成功');
    refreshList();
  };

  const modelList = ref([]);
  const queryModelList = async () => {
    const res = await productApi.luteosProductModelQueryModelList({
      pageNum: 1,
      pageSize: 500,
    });
    modelList.value = res?.modelBeanList;
  };
  queryModelList();

  const labelList = ref([]);
  const queryLabelList = async () => {
    const res = await erpApi.luteosErpPlanPsftQueryList({
      pageNum: 1,
      pageSize: 500,
    });
    labelList.value = res?.recordList;
  };
  queryLabelList();

  const deptTreeData = ref<any[]>([]);
  const queryDeptTree = async () => {
    const res = await memberApi.luteosMemberQueryDeptTree({ deptId: null });
    deptTreeData.value = res.deptInfoList;
  };
  queryDeptTree();

  const deptTree = computed(() => {
    const mapNode = (item, level = 1) => ({
      value: `${item.deptId}`,
      label: item.deptName,
      leaf: !item.children?.length,
      children: item.children?.map((subItem) => mapNode(subItem, level + 1)),
      level,
    });
    return deptTreeData.value?.map((item) => mapNode(item));
  });

  const exportDialogRef = ref();
  const handleExport = () => {
    exportDialogRef.value.open({
      ...search,
      pageNum: current,
      pageSize,
    });
  };
</script>

<style scoped lang="scss">
  .more-filter-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    aspect-ratio: 1/1;
    border-radius: 4px;
    border: 1px solid #dfe2e6;
    cursor: pointer;
  }
  .newProductIcon {
    transform: rotate(45deg);
  }
</style>
