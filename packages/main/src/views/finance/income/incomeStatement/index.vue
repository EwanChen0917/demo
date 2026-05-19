<template>
  <KeenCard title="推送任务进度" position="start" grow>
    <template #operation>
      <div class="d-flex justify-content-between">
        <div class="statistics">
          <div class="statistics-item">
            <span class="cycle" style="background: #b6b6b6"></span>
            待执行：{{ pushStatistics?.waitPushCount }}
          </div>
          <div class="statistics-item">
            <span class="cycle" style="background: var(--bs-primary)"></span>
            进行中：{{ pushStatistics?.pushIngCount }}
          </div>
          <div class="statistics-item">
            <span class="cycle" style="background: var(--bs-success)"></span>
            已完成：{{ pushStatistics?.pushSuccessCount }}
          </div>
          <div class="statistics-item">
            <span class="cycle" style="background: var(--bs-danger)"></span>
            失败：{{ pushStatistics?.pushFailCount }}
          </div>
          <div class="statistics-item">
            <SvgIcon class="svg-icon" icon="history" />
            <el-link type="primary" :underline="false" @click="historyDialogRef?.open">
              历史记录：{{ pushStatistics?.allCount }}
            </el-link>
          </div>
        </div>
        <div class="d-flex">
          <div class="refresh" @click="queryPushBatchList">
            <i class="iconfont icon-shujutongbu1"></i>
            <el-button type="primary" link>刷新</el-button>
            <div
              v-show="!showFlag"
              @click="showFlag = !showFlag"
              class="text-center cursor-pointer arrows-icon-down"
            >
              <i class="iconfont icon-jiantouxiangxia"></i>
            </div>
            <div
              v-show="showFlag"
              @click="showFlag = !showFlag"
              class="text-center cursor-pointer arrows-icon-up"
            >
              <i class="iconfont icon-jiantouxiangshang"></i>
            </div>
          </div>
        </div>
      </div>
    </template>
    <div class="tip" v-if="showFlag">显示今日最近9条任务进度，更多任务请查看历史记录</div>
    <div class="task-list" v-if="showFlag" v-loading="pushListLoading">
      <div class="task-item" v-for="(item, index) in pushBatchList" :key="index">
        <div class="task-item-header">
          <div class="left">
            <div class="type">{{ item?.typeDesc }}</div>
            <Tag :color="taskColorMap[item?.status]" size="small">
              {{ taskStatusMap[item?.status] }}
            </Tag>
          </div>
          <div class="right">
            <span v-if="item?.status === taskStatus.进行中">
              预计剩余时间：{{ item?.remainingTime }}
            </span>
            <span v-else>耗时：{{ item?.useTime }}</span>
          </div>
        </div>
        <div class="text-gray-600">{{ item?.pushRemark }}</div>
        <el-progress
          :percentage="
            item?.successCount + item?.failCount
              ? ((item?.successCount + item?.failCount) / item?.totalCount) * 100
              : 0
          "
          :show-text="false"
          :status="progressStatusMap[item?.status]"
          :stroke-width="8"
        />
        <div class="task-item-footer">
          <div class="left">
            <span>
              已处理：{{ item?.successCount + item?.failCount }} / {{ item?.totalCount }}单
            </span>
            <span>
              成功个数：
              <span style="color: var(--el-color-success)">{{ item?.successCount }}</span>
            </span>
            <span>
              失败个数：
              <span style="color: var(--el-color-danger)">{{ item?.failCount }}</span>
            </span>
          </div>
          <div class="right" v-if="item?.status === taskStatus.进行中">
            开始时间：{{ item?.createTime }}
          </div>
          <div class="right" v-else>完成时间：{{ item?.finishTime }}</div>
        </div>
      </div>
    </div>
  </KeenCard>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearchData"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input v-model="search.keyword" placeholder="结算单号、网上订单号" clearable>
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-input
        v-model="analysisCode"
        placeholder="行标识"
        style="width: 250px"
        clearable
        @change="handleBlur"
      >
        <template #suffix>
          <i class="iconfont icon-sousuo"></i>
        </template>
        <template #append>
          <BatchSearchPopover
            ref="batchSearchRef"
            @search="handleBatchSearch"
            @clear="handleBatchClear"
          />
        </template>
      </el-input>
      <div class="select-shop-list">
        <ProductShopSelectFinance
          style="width: 225px"
          v-model="shop"
          placeholder="店铺名称"
          clearable
          filterable
          multiple
          @change="handleBlur2"
        />
        <div class="select-icon-more">
          <BatchSearchPopover
            ref="batchSearchRef2"
            @search="handleBatchSearch2"
            @clear="handleBatchClear2"
          />
        </div>
      </div>
      <OrganizationSelect
        v-model="search.settlementOrganizationList"
        placeholder="结算组织"
        multiple
        clearable
        filterable
      />
      <PlatformSelect style="width: 120px" v-model="search.platform" filterable clearable />
      <CountrySelect style="width: 120px" v-model="search.country" clearable />
      <el-select style="width: 120px" v-model="search.pushStatus" placeholder="推送状态" clearable>
        <el-option v-for="(val, key) in pushStatusMap" :value="key" :label="val" :key="key" />
      </el-select>
      <el-select v-model="search.searchTimeType" style="width: 120px">
        <el-option :value="1" label="平台结算时间" />
        <el-option :value="2" label="创建时间" />
        <el-option :value="3" label="推送时间" />
      </el-select>
      <el-date-picker
        style="width: 280px"
        v-model="search.time"
        type="daterange"
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="YYYY-MM-DD HH:mm:ss"
      />
    </template>
    <template #buttons>
      <el-dropdown @command="handlePushCommand">
        <el-button type="primary" :loading="markLoading">
          推送成功标识
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="markPush">标记所选</el-dropdown-item>
            <el-dropdown-item command="markPushSearch">按筛选条件标记</el-dropdown-item>
            <el-dropdown-item command="cancelMarkPush">取消标记所选</el-dropdown-item>
            <el-dropdown-item command="cancelMarkPushSearch">按筛选条件取消标记</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-dropdown @command="handlePushCommand">
        <el-button :loading="batchPushLoading">
          批量推送
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="batchPush">推送所选</el-dropdown-item>
            <el-dropdown-item command="batchSearchPush">按筛选条件推送</el-dropdown-item>
            <el-dropdown-item command="batchFailedPush">推送失败数据</el-dropdown-item>
            <el-dropdown-item command="batchWaitPush">推送未推送数据</el-dropdown-item>
            <el-dropdown-item command="batchFailedAndWaitPush">推送失败+未推送</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-dropdown @command="handleDeleteCommand">
        <el-button :loading="batchDeleteLoading">
          批量删除
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="batchDelete">删除所选</el-dropdown-item>
            <el-dropdown-item command="batchSearchDelete">按筛选条件删除</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <ExportBtn
        :service="financeSystemApi.financeIncomeStatementOrderExportQueryList"
        :params="{
          ...omit(search, 'time'),
          typeStartTime: search.time ? search.time[0] : undefined,
          typeEndTime: search.time
            ? dayjs(search.time[1])?.endOf('day')?.format('YYYY-MM-DD HH:mm:ss')
            : undefined,
        }"
      >
        导出
      </ExportBtn>
      <el-tooltip content="根据查询条件（行标识必填）更新供应链SKU，已推送应收单和有值应收单不更新">
        <el-button type="primary" :disabled="!search.analysisCodeList?.length" @click="handleUpdateSupplierSku">
          更新供应链SKU
        </el-button>
      </el-tooltip>
    </template>
    <template #tools-prepend>
      <el-button :loading="store.taskMap[refreshType.收入结算单].apiSync" @click="handleRefresh">
        更新推送状态
      </el-button>
    </template>
    <div class="statistics">
      <div class="statistics-item">
        <span class="cycle" style="background: #b6b6b6"></span>
        未推送：{{ listData?.statistics?.waitPushCount }}
      </div>
      <div class="statistics-item">
        <span class="cycle" style="background: var(--bs-danger)"></span>
        推送失败：{{ listData?.statistics?.pushFailCount }}
      </div>
      <div class="statistics-item">
        <span class="cycle" style="background: var(--bs-success)"></span>
        已推送：{{ listData?.statistics?.pushSuccessCount }}
      </div>
    </div>
    <div class="statistics-item-right" v-if="shopListData?.compareTime">
      <div class="statistics-item">{{ `当前显示: ${shopListData?.compareTime}的数据对比` }}</div>
      <div class="statistics-item">
        <span class="cycle" style="background: var(--bs-primary)"></span>
        总店铺数：{{ shopListData?.totalShopNum }}
      </div>
      <div class="statistics-item">
        <span class="cycle" style="background: var(--bs-success)"></span>
        正常：{{ shopListData?.normalShopNum }}
      </div>
      <div class="statistics-item">
        <span class="cycle" style="background: var(--bs-danger)"></span>
        异常：{{ shopListData?.abnormalShopNum }}
      </div>
      <div class="statistics-item">
        <el-button @click="showDetail">
          <template #icon>
            <i class="iconfont icon-sousuo"></i>
          </template>
          查看多店铺对比详情
        </el-button>
      </div>
    </div>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      row-key="code"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="40" reserve-selection fixed />
      <el-table-column type="expand" fixed>
        <template #default="{ row }">
          <div style="padding: 0 6%">
            <el-table :data="row?.detailList">
              <el-table-column label="SKU" prop="sku" min-width="140" />
              <el-table-column label="msku" prop="msku" min-width="140" />
              <el-table-column label="商品类型" prop="skuTypeDesc" min-width="140" />
              <el-table-column label="产品SKU" prop="skuCode" min-width="140" />
              <el-table-column label="供应链SKU" prop="productSku" min-width="140" />
              <el-table-column label="数量" prop="qty" />
              <el-table-column label="币别" prop="currencyCode" />
              <el-table-column label="金额" prop="amount" />
              <el-table-column label="税额" prop="taxAmount" />
              <el-table-column label="收入" prop="incomeAmount" />
              <el-table-column label="折扣额" prop="discountAmount" />
              <el-table-column label="买家运费" prop="buyerFreightAmount" />
              <el-table-column
                label="平台其他收入"
                prop="platformOtherIncomeAmount"
                min-width="120"
              />
              <el-table-column label="销售佣金" prop="salesCommissionAmount" />
              <el-table-column label="配送费" prop="distributionAmount" />
              <el-table-column label="平台仓储费" prop="platformStorageCharge" min-width="90" />
              <el-table-column label="平台推广费" prop="platformPromotionCharge" min-width="90" />
              <el-table-column label="站内广告费" prop="stationAdvertisingCharge" min-width="90" />
              <el-table-column label="平台保险费" prop="platformInsuranceCharge" min-width="90" />
              <el-table-column label="移除弃置费" prop="removalDisposalCharge" min-width="90" />
              <el-table-column label="调整费" prop="adjustmentCharge" />
              <el-table-column label="平台其他费" prop="platformOtherCharge" min-width="90" />
              <el-table-column
                label="平台代缴税"
                prop="platformWithholdingTaxCharge"
                min-width="90"
              />
              <el-table-column label="手续费" prop="serviceCharge" min-width="90" />
              <el-table-column label="出库数量" prop="outStockQty" />
              <el-table-column label="数差" prop="qtyDiff" />
              <el-table-column label="其他应付款" prop="otherPayAmount" min-width="90" />
              <el-table-column label="备注" prop="remark" />
            </el-table>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="结算单号" prop="code" min-width="140" fixed />
      <el-table-column label="平台单号" prop="platformCode" min-width="120" />
      <el-table-column label="店铺" prop="shop" />
      <el-table-column label="平台" prop="platform" />
      <el-table-column label="结算组织" prop="orgName" />
      <el-table-column label="国家" prop="country" />
      <el-table-column label="平台结算时间" prop="platformSettlementTime" />
      <el-table-column label="创建时间" prop="createTime" />
      <el-table-column label="推送状态" prop="pushStatusDesc">
        <template #default="{ row }">
          <Tag :color="pushColorMap[row?.pushStatus]">
            {{ pushStatusMap[row?.pushStatus] }}
          </Tag>
        </template>
      </el-table-column>
      <el-table-column label="推送时间" prop="pushTime" />
      <el-table-column label="异常信息" prop="errorRemark" min-width="150">
        <template #default="{ row }">
          <OverflowTooltip :content="row?.errorRemark" :line="2" />
        </template>
      </el-table-column>
      <el-table-column label="行标识" prop="analysisCode" min-width="150" />
      <el-table-column label="操作" fixed="right">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '查看详情',
                key: 'view',
                type: 'primary',
                hide: row?.pushStatus !== pushStatus.已推送,
                permissionCode: '',
                row,
              },
              {
                label: '推送',
                key: 'push',
                type: 'primary',
                hide: row?.pushStatus !== pushStatus.未推送,
                permissionCode: '',
                row,
              },
              {
                label: '重新推送',
                key: 'push',
                type: 'primary',
                hide: row?.pushStatus !== pushStatus.推送失败,
                permissionCode: '',
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
  </KeenList>
  <HistoryDialog ref="historyDialogRef" />
  <DetailDialog ref="detailDialogRef" />
  <DetailDialogMore ref="detailDialogMOreRef" />
  <FailDialog ref="failDialogRef" />
</template>

<script setup lang="ts" name="incomeStatement">
  import useList from '@/hooks/list/useList';
  import { FinanceSystemApi, financeSystemApi } from '@/api';
  import {
    progressStatusMap,
    pushStatus,
    pushColorMap,
    pushStatusMap,
    taskColorMap,
    taskStatus,
    taskStatusMap,
  } from '@/views/finance/income/incomeStatement/enum';
  import { Refresh } from '@element-plus/icons-vue';
  import HistoryDialog from '@/views/finance/income/incomeStatement/components/historyDialog.vue';
  import OrganizationSelect from '@/views/finance/income/incomeRule/components/organizationSelect.vue';
  import PlatformSelect from '@/views/finance/income/incomeRule/components/platformSelect.vue';
  import DetailDialog from '@/views/finance/income/incomeStatement/components/detailDialog.vue';
  import * as swal from '@/utils/swal';
  import { ElMessage, ElSelect } from 'element-plus';
  import { omit } from 'lodash-es';
  import dayjs from 'dayjs';
  import { financeBudgetRefresh, stopFinanceBudgetRefresh } from '@/worker/controls/notice';
  import { useStore } from '@/store/modules/useStore';
  import useTask from '@/store/modules/task';
  import { refreshType } from '@/views/budget/base/enums/enums';
  import FailDialog from '@/views/finance/income/incomeAnalysis/components/failDialog.vue';
  import DetailDialogMore from './components/detailDialogMore.vue';

  const user = useStore();
  const store = useTask();
  const route = useRoute();

  const tableRef = ref(null);
  const PAGE_SIZE = 10;
  let isFirstQuery = true;

  const buildSearchParams = (searchData) => {
    const { time } = searchData;
    if (isFirstQuery) {
      if (route?.query?.code && !searchData.analysisCodeList) {
        if (Array.isArray(route?.query?.code)) {
          searchData.analysisCodeList = route.query?.code;
        } else {
          searchData.analysisCodeList = [route?.query?.code];
        }
      }
      isFirstQuery = false;
    }
    return {
      ...omit(searchData, 'time'),
      typeStartTime: time ? time[0] : undefined,
      typeEndTime: time ? dayjs(time[1])?.endOf('day')?.format('YYYY-MM-DD HH:mm:ss') : undefined,
    };
  }

  const {
    search,
    // searchData,
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
    runQuery,
    resetSearch,
    // selectedKeys,
  } = useList<
    FinanceSystemApi.FinanceIncomeStatementOrderQueryList.RequestBody,
    FinanceSystemApi.FinanceIncomeStatementOrderQueryList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      shopList: undefined,
      platform: undefined,
      country: undefined,
      settlementOrganizationList: undefined,
      pushStatus: undefined,
      time: undefined,
      searchTimeType: 1,
      typeStartTime: undefined,
      typeEndTime: undefined,
      analysisCodeList: undefined,
    },
    // eslint-disable-next-line no-shadow
    interceptSearchData: (searchData) => {
      return buildSearchParams(searchData);
    },
    pageSize: PAGE_SIZE,
    service: financeSystemApi.financeIncomeStatementOrderQueryList,
  });

  const resetSearchData = () => {
    analysisCode.value = '';
    shop.value = [];
    resetSearch();
  };

  const batchSearchRef = ref();
  const batchSearchRef2 = ref();
  const analysisCode = ref();
  const shop = ref();
  if (route?.query?.code) {
    if (Array.isArray(route?.query?.code)) {
      analysisCode.value = route?.query?.code.join(',');
    } else {
      analysisCode.value = route?.query?.code;
    }
  }
  // 行标识
  const handleBlur = () => {
    if (analysisCode.value) {
      search.analysisCodeList = analysisCode.value.split(',');
      batchSearchRef.value?.clear();
    } else {
      analysisCode.value = '';
      search.analysisCodeList = [];
    }
  };
  const handleBatchSearch = (val) => {
    search.analysisCodeList = val
      ?.replace(/\n/g, ',')
      .split(',')
      .filter((res) => res);
    analysisCode.value = '';
  };
  const handleBatchClear = () => {
    search.analysisCodeList = [];
  };

  // 店铺
  const handleBlur2 = (e) => {
    if (shop.value) {
      search.shopList = shop.value;
      batchSearchRef2.value?.clear();
    } else {
      shop.value = [];
      search.shopList = [];
    }
  };
  const handleBatchSearch2 = (val) => {
    search.shopList = val
      ?.replace(/\n/g, ',')
      .split(',')
      .filter((res) => res);
    shop.value = [];
  };
  const handleBatchClear2 = () => {
    search.shopList = [];
  };

  // 表格操作
  const detailDialogRef = ref(null);
  const detailDialogMOreRef = ref(null);
  const handleActions = async (item) => {
    const { key, row } = item;
    switch (key) {
      case 'view':
        detailDialogRef.value?.open(row);
        break;
      case 'push': {
        const isConfirmed = await swal.confirm('确认推送吗？');
        if (!isConfirmed) return;
        await financeSystemApi.financeIncomeStatementOrderPush({
          code: row?.code,
          type: 4, // 0-推送所有 1-按筛选条件推送 2-推送失败数据 3-推送未推送数据 4-推送失败+未推送
        });
        ElMessage.success('已推送');
        refreshList();
        break;
      }
      default:
        break;
    }
  };

  const showDetail = () => {
    detailDialogMOreRef.value?.open();
  };

  const historyDialogRef = ref(null);

  // 推送任务列表
  const showFlag = ref(false);
  const pushBatchList = ref([]);
  const pushStatistics = ref({});
  const pushListLoading = ref(false);
  const queryPushBatchList = async () => {
    try {
      pushListLoading.value = true;
      const res = await financeSystemApi.financeIncomeStatementOrderQueryPushBatchList({
        pageSize: 9,
        pageNum: 1,
      });
      pushBatchList.value = res?.recordList || [];
      pushStatistics.value = res?.statistics || {};
    } finally {
      pushListLoading.value = false;
    }
  };
  queryPushBatchList();

  // 选中行
  const codeList = ref([]);
  const handleSelectionChange = (selection) => {
    codeList.value = selection.map((item) => item.code);
  };

  // 批量推送
  const failDialogRef = ref(null);
  const batchPushLoading = ref(false);
  const cancelMarkLoading = ref(false);
  const markLoading = ref(false);
  const batchPush = async (params, tip) => {
    try {
      batchPushLoading.value = true;
      const res = await financeSystemApi.financeIncomeStatementOrderPushBatch(params);
      if (res?.failList?.length) {
        failDialogRef.value?.open(res?.failList);
      } else {
        ElMessage.success(`${tip}成功`);
      }
      tableRef.value?.clearSelection();
      refreshList();
    } finally {
      batchPushLoading.value = false;
    }
  };

  const handlePushCommand = async (command) => {
    switch (command) {
      case 'batchPush': {
        if (!codeList.value?.length) {
          ElMessage.warning('请先勾选数据');
          return;
        }
        const isConfirmed = await swal.confirm('确认推送所选吗？');
        if (!isConfirmed) return;
        batchPush(
          {
            codeList: codeList.value,
            type: 0,
          },
          '推送所选'
        );
        break;
      }
      case 'batchSearchPush': {
        const isConfirmed = await swal.confirm('确认按筛选条件推送吗？');
        if (!isConfirmed) return;
        const { time } = search;
        batchPush(
          {
            ...omit(search, 'time'),
            typeStartTime: time ? time[0] : undefined,
            typeEndTime: time
              ? dayjs(time[1])?.endOf('day')?.format('YYYY-MM-DD HH:mm:ss')
              : undefined,
            type: 1,
          },
          '按筛选条件推送'
        );
        break;
      }
      case 'batchFailedPush': {
        const isConfirmed = await swal.confirm('确认推送失败数据吗？');
        if (!isConfirmed) return;
        batchPush(
          {
            type: 2,
            pushStatus: 3,
          },
          '推送失败数据'
        );
        break;
      }
      case 'batchWaitPush': {
        const isConfirmed = await swal.confirm('确认推送未推送数据吗？');
        if (!isConfirmed) return;
        batchPush(
          {
            type: 3,
            pushStatus: 0,
          },
          '推送未推送数据'
        );
        break;
      }
      case 'batchFailedAndWaitPush': {
        const isConfirmed = await swal.confirm('确认推送失败+未推送数据吗？');
        if (!isConfirmed) return;
        batchPush(
          {
            type: 4,
            pushStatusList: [0, 3],
          },
          '推送失败+未推送'
        );
        break;
      }
      case 'markPush': {
        if (!codeList.value?.length) {
          ElMessage.warning('请先勾选数据');
          return;
        }
        const isConfirmed = await swal.confirm('确认标记推送数据吗？');
        if (!isConfirmed) return;
        markPushStatus('标记', 1, '');
        break;
      }
      case 'markPushSearch': {
        if (!search.analysisCodeList?.length) {
          ElMessage.warning('筛选条件必须包含行标识');
          return;
        }
        if (listData.value.total == 0) {
          ElMessage.warning('无操作数据');
          return;
        }
        const isConfirmed = await swal.confirm(
          `请确认是否对${listData.value.total}条数据执行标记操作？`
        );
        if (!isConfirmed) return;
        markPushStatus('标记', 1, 'search');
        break;
      }
      case 'cancelMarkPush': {
        if (!codeList.value?.length) {
          ElMessage.warning('请先勾选数据');
          return;
        }
        const isConfirmed = await swal.confirm('确认取消标记推送数据吗？');
        if (!isConfirmed) return;
        markPushStatus('取消标记', 0, '');
        break;
      }
      case 'cancelMarkPushSearch': {
        if (!search.analysisCodeList?.length) {
          ElMessage.warning('筛选条件必须包含行标识');
          return;
        }
        if (listData.value.total == 0) {
          ElMessage.warning('无操作数据');
          return;
        }
        const isConfirmed = await swal.confirm(
          `请确认是否对${listData.value.total}条数据执行取消标记操作？`
        );
        if (!isConfirmed) return;
        markPushStatus('取消标记', 0, 'search');
        break;
      }
      default:
        break;
    }
  };

  // 批量删除
  const batchDeleteLoading = ref(false);
  const batchDelete = async (params, tip) => {
    try {
      batchDeleteLoading.value = true;
      const res = await financeSystemApi.financeIncomeStatementOrderDeletedBatch(params);
      if (res?.failList?.length) {
        failDialogRef.value?.open(res?.failList);
      } else {
        ElMessage.success(`${tip}成功`);
      }
      tableRef.value?.clearSelection();
      refreshList();
    } finally {
      batchDeleteLoading.value = false;
    }
  };
  // 标记推送成功
  const markPushStatus = async (tip, status, type) => {
    try {
      if (status == 1) {
        markLoading.value = true;
      } else {
        cancelMarkLoading.value = true;
      }
      let param = {
        markPushSuccess: status == 1,
      };
      if (type) {
        param = Object.assign(param, search);
      } else {
        param.codes = codeList.value;
      }
      const res = await financeSystemApi.financeIncomeStatementOrderMarkPushStatus(param);
      if (res?.failList?.length) {
        failDialogRef.value?.open(res?.failList);
      } else {
        ElMessage.success(`${tip}成功`);
      }
      tableRef.value?.clearSelection();
      refreshList();
    } finally {
      if (status == 1) {
        markLoading.value = false;
      } else {
        cancelMarkLoading.value = false;
      }
    }
  };

  const handleDeleteCommand = async (command) => {
    switch (command) {
      case 'batchDelete': {
        if (!codeList.value?.length) {
          ElMessage.warning('请先勾选数据');
          return;
        }
        const isConfirmed = await swal.confirm('确认删除所选吗？');
        if (!isConfirmed) return;
        batchDelete(
          {
            codeList: codeList.value,
          },
          '删除所选'
        );
        break;
      }
      case 'batchSearchDelete': {
        const isConfirmed = await swal.confirm('确认按筛选条件删除吗？');
        if (!isConfirmed) return;
        const { time } = search;
        batchDelete(
          {
            ...omit(search, 'time'),
            typeStartTime: time ? time[0] : undefined,
            typeEndTime: time
              ? dayjs(time[1])?.endOf('day')?.format('YYYY-MM-DD HH:mm:ss')
              : undefined,
          },
          '按筛选条件删除'
        );
        break;
      }
      default:
        break;
    }
  };

  const handleUpdateSupplierSku = async () => {
    const searchParams = buildSearchParams(search);
    if (!search.analysisCodeList?.length) {
      ElMessage.error('请输入行标识');
      return;
    }
    await financeSystemApi.financeIncomeStatementOrderUpdateSupplySku(searchParams);
    ElMessage.warning('数据处理中，请稍后刷新查看');
  }

  const shopListData = ref(null);
  const getShopListData = async () => {
    const res = await financeSystemApi.financeIncomeStatementOrderQueryShopCompareSumData();
    shopListData.value = res;
  };
  // 获取店铺对比数据
  getShopListData();

  const handleRefresh = async () => {
    await financeSystemApi.financeBasicPlatformRefresh({
      modelCode: 'income_statement_order',
      param: search,
      sleepTime: 0,
    });
    store.taskMap[refreshType.收入结算单].apiSync = true;
    financeBudgetRefresh(user.token as string, refreshType.收入结算单);
  };
  watch(
    () => store.taskMap[refreshType.收入结算单].apiSync,
    (val) => {
      if (!val) refreshList();
    }
  );

  onMounted(() => {
    financeBudgetRefresh(user.token as string, refreshType.收入结算单);
  });

  onBeforeUnmount(() => {
    stopFinanceBudgetRefresh();
  });
</script>

<style scoped lang="scss">
  .task-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 10px;
    min-height: 200px;
    .task-item {
      display: flex;
      flex-direction: column;
      gap: 10px;
      flex-grow: 1;
      width: 30%;
      padding: 10px;
      border: 1px solid #e4e4e4;
      border-radius: 12px;

      &-header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .left {
          display: flex;
          align-items: center;
          gap: 5px;
        }
      }

      &-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .left {
          display: flex;
          gap: 5px;
        }
      }
    }
  }

  .statistics {
    display: flex;
    gap: 15px;
    padding: 5px 0 0 5px;
    float: left;

    &-item {
      display: flex;
      align-items: center;
      gap: 3px;
    }
  }
  .statistics-item-right {
    display: flex;
    justify-content: flex-end;
    gap: 15px;
    padding: 5px 5px 0 0;
    &-item {
      display: flex;
      align-items: center;
      gap: 3px;
      margin-top: 5px;
    }
  }

  .cycle {
    display: inline-block;
    border-radius: 50%;
    width: 5px;
    height: 5px;
  }

  .refresh {
    display: flex;
    align-items: center;
    gap: 3px;
    cursor: pointer;
    font-size: 12px;
    color: var(--el-color-primary);
    .icon-shujutongbu1 {
      font-size: 12px;
    }
  }

  .arrows-icon-down {
    &:hover {
      animation: moveDown 2s linear infinite;

      @keyframes moveDown {
        0% {
          transform: translateY(0);
        }
        25% {
          transform: translateY(3px);
        }
        50% {
          transform: translateY(0);
        }
        75% {
          transform: translateY(-3px);
        }
        100% {
          transform: translateY(0);
        }
      }
    }
  }

  .arrows-icon-up {
    &:hover {
      animation: moveUp 2s linear infinite;

      @keyframes moveUp {
        0% {
          transform: translateY(0);
        }
        25% {
          transform: translateY(-3px);
        }
        50% {
          transform: translateY(0);
        }
        75% {
          transform: translateY(3px);
        }
        100% {
          transform: translateY(0);
        }
      }
    }
  }
  .select-shop-list {
    border: 1px solid var(--el-border-color);
    border-radius: 6px;
    :deep(.el-select__wrapper) {
      box-shadow: none;
      border-right: 1px solid var(--el-border-color);
      border-radius: 6px 0 0 6px;
    }
    .select-icon-more {
      display: inline-block;
      color: var(--el-color-info);
      padding: 0 9px;
    }
  }
</style>
