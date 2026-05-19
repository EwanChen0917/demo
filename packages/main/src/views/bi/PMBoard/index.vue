<template>
  <div class="pm-dashboard">
    <FilterComponent :update-date="updateDate" @refresh="initData">
      <TimeSearch
        v-if="updateDate"
        :update-date="updateDate"
        :weekOptions="dict.weekStrList"
        ref="timeSearchRef"
        @change="handleChangeTime"
      />
      <el-select
        v-model="searchParams.productLineList"
        :options="(dict.productLineList || []).map((x) => ({ label: x, value:x }))"
        placeholder="产品品线"
        clearable
        filterable
        multiple
        collapse-tags
        collapse-tags-tooltip
        @change="initData"
      />
      <el-select
        v-model="searchParams.categoryList"
        :options="(dict.categoryList || []).map((x) => ({ label: x, value:x }))"
        placeholder="三级类目"
        clearable
        filterable
        multiple
        collapse-tags
        collapse-tags-tooltip
        @change="initData"
      />
      <el-select
        v-model="searchParams.platformList"
        :options="(dict.platformList || []).map((x) => ({ label: x, value:x }))"
        placeholder="平台"
        clearable
        filterable
        multiple
        collapse-tags
        collapse-tags-tooltip
        @change="initData"
      />
      <el-select
        v-model="searchParams.developerNameList"
        :options="(dict.developerNameList || []).map((x) => ({ label: x, value:x }))"
        placeholder="产品经理"
        clearable
        filterable
        multiple
        collapse-tags
        collapse-tags-tooltip
        @change="initData"
      />
      <el-select
        v-model="searchParams.spuNewProductTag"
        placeholder="产品分类"
        clearable
        @change="initData"
      >
        <el-option label="新品" value="新品" />
        <el-option label="老品" value="老品" />
      </el-select>
      <el-select v-model="searchParams.spuAiotTag" placeholder="AIoT" clearable @change="initData">
        <el-option label="是" :value="1" />
        <el-option label="否" :value="0" />
      </el-select>
      <el-select
        v-model="searchParams.spuNameList"
        placeholder="SPU名称"
        :options="(dict.spuNameList || []).map((x) => ({ label: x, value:x }))"
        :clearable="true"
        filterable
        multiple
        collapse-tags
        collapse-tags-tooltip
        @change="initData"
      />
      <el-button text @click="reset">重置</el-button>
    </FilterComponent>
    <el-scrollbar :style="{ flex: 1 }" :view-style="{ height: 'unset' }">
      <div class="data-container">
        <CoreData v-if="dataDetail.coreIndicator" :search-params="searchParams" />
        <SalesTrend />
        <DownholeAnalysis :search-params="searchParams" />
        <KpiTable :search-params="searchParams" />
        <ReviewAnalysis
          :search-params="searchParams"
          @update:review-unusual-data-list="
            (val) => {
              dataDetail.reviewUnusual!.reviewUnusualDataList = val;
            }
          "
        />
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts" name="PMBoard">
  import { biApi, BiContracts } from '@/api';
  import dayjs from 'dayjs';
  import TimeSearch from './components/TimeSearch.vue';
  import CoreData from './components/coreData.vue';
  import SalesTrend from './components/salesTrend.vue';
  import DownholeAnalysis from './components/downholeAnalysis.vue';
  import KpiTable from './components/kpiTable.vue';
  import ReviewAnalysis from './components/reviewAnalysis.vue';
  import FilterComponent from '../components/FilterComponent.vue';

  defineOptions({
    name: 'PMDashboard',
  });

  const dict = ref<any>({
    gtmProductLineList: [],
    productLineList: [],
    categoryList: [],
    platformList: [],
    developerNameList: [],
    spuNameList: [],
  });
  const getDict = async () => {
    const res = await biApi.biCommonQueryEnums({
      ...searchParams,
      enumList: ['product_line', 'category', 'platform', 'developer_name', 'spu_name'],
    });
    if (res) {
      dict.value = res;
    }
  };

  const dateType = ref<'month' | 'week' | 'year'>('month');
  const updateDate = ref<string>();
  const searchParams = reactive<BiContracts.CommonAnalysisReq>({
    endMonth: '',
    startMonth: '',
    dateType: dateType.value,
    gtmProductLineList: [],
    productLineList: [],
    categoryList: [],
    platformList: [],
    developerNameList: [],
    spuNameList: [],
  });
  const dataDetail = reactive<BiContracts.DeveloperResp>({
    coreIndicator: {
      averageOrderAmount: {},
      customerCount: {},
      brandVoiceCount: {},
      grossProfitAmount: {},
      grossProfitRate: {},
      inventoryTurnoverDays: {},
      refundRate: {},
      repurchaseRate: {},
      revenueAmount: {},
      salesAmount: {},
    },
    developerSpuSalesAnalysisList: undefined,
    drillDownByCategoryList: undefined,
    reviewUnusual: undefined,
    salesTrendList: undefined,
  });
  provide('detailData', dataDetail);

  const loading = ref(false);
  provide('loading', loading);
  const initData = async () => {
    loading.value = true;
    getDict();
    const res = await biApi.biDeveloperQuery(searchParams).finally(() => {
      loading.value = false;
    });
    if (res) {
      Object.assign(dataDetail, res);
    }
  };
  const getUpdateDate = async () => {
    const res = await biApi.biSalesMonthQueryLastDate();
    if (res) {
      updateDate.value = res as string;
      searchParams.startMonth = dayjs(res as string).format('YYYY-MM');
      searchParams.endMonth = dayjs(res as string).format('YYYY-MM');
      initData();
    }
  };
  getUpdateDate();
  const handleChangeTime = (val: [string, string], type: 'month' | 'year' | 'week') => {
    if (type === 'month') {
      [searchParams.startMonth, searchParams.endMonth] = val;
      // 清除年
      searchParams.startYear = null;
      searchParams.endYear = null;
      searchParams.dateType = 'month';
    } else if (type === 'year') {
      // 清除月
      searchParams.startMonth = null;
      searchParams.endMonth = null;
      [searchParams.startYear, searchParams.endYear] = val;
      searchParams.dateType = 'year';
    } else if (type === 'week') {
      // 清除月
      searchParams.startMonth = null;
      searchParams.endMonth = null;
      // 清除年
      searchParams.startYear = null;
      searchParams.endYear = null;
      [searchParams.startWeek, searchParams.endWeek] = val;
      searchParams.dateType = 'week';
    }
    initData();
  };
  const timeSearchRef = ref<InstanceType<typeof TimeSearch>>();
  const reset = () => {
    // searchParams.dateType = 'month';
    // searchParams.startMonth = updateDate.value;
    // searchParams.endMonth = updateDate.value;
    // searchParams.startYear = null;
    // searchParams.endYear = null;
    // searchParams.startWeek = '';
    // searchParams.endWeek = '';
    searchParams.productLineList = [];
    searchParams.categoryList = [];
    searchParams.platformList = [];
    searchParams.developerNameList = [];
    searchParams.spuNameList = [];
    searchParams.spuNewProductTag = '';
    searchParams.spuAiotTag = '';
    // timeSearchRef.value?.reset();
    initData();
  };
</script>

<style scoped lang="scss">
  .pm-dashboard {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    font-family: 'PingFang SC', sans-serif;
    .data-container {
      // max-width: 1408px;
      width: 100%;
      display: flex;
      flex-direction: column;
      row-gap: 16px;
      padding: 0 16px 16px;
      margin: 0 auto;
    }
    .station-trend {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    :deep(.el-radio-group) {
      // font-family: 'PingFang SC', sans-serif;
      // --el-button-font-weight: 400;
      // --el-font-size-base: 12px;
      // .el-radio-button {
      //   --el-radio-button-checked-bg-color: var(---P6, #02b96b);
      //   --el-radio-button-checked-border-color: var(---P6, #02b96b);
      //   --el-color-primary: var(---P6, #02b96b);
      //   --el-border-color-extra-light: #fff;
      //   --el-button-bg-color: #fff;
      // }
      // .el-radio-button.is-active .el-radio-button__original-radio:not(:disabled) {
      //   & + .el-radio-button__inner {
      //     background-color: #fff;
      //     border-color: var(--el-radio-button-checked-bg-color, var(--el-color-primary));
      //     color: var(--el-radio-button-checked-bg-color, var(--el-color-primary));
      //     font-weight: 400;
      //   }
      // }
    }
    :deep(.el-table) {
      --el-table-header-text-color: #666;
      --el-table-text-color: #1f1f1f;
      --el-table-border-color: #f5f5f5;

      thead {
        th {
          font-weight: 400;
        }
      }
    }
    .text-din {
      font-family: 'DIN';
    }
  }
  :deep(.vxe-grid) {
    border-radius: 10px;
  }
</style>
