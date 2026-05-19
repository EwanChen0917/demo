<template>
  <div class="bi-dashboard">
    <FilterComponent :update-date="dataDetail.updateDate" @refresh="initData()">
      <TimeSearch
        v-if="dataDetail.updateDate"
        :update-date="dataDetail.updateDate"
        @change="
          (val) => {
            searchParams.startMonth = val[0];
            searchParams.endMonth = val[1];
            initData();
          }
        "
      />
      <el-select
        v-model="searchParams.platformList"
        :options="(dict.platformList || []).map((x) => ({ label: x, value: x }))"
        placeholder="平台"
        clearable
        filterable
        multiple
        collapse-tags
        @change="initData"
      />
      <el-select
        v-model="searchParams.areaList"
        :options="(dict.areaList || []).map((x) => ({ label: x, value: x }))"
        placeholder="区域"
        clearable
        filterable
        multiple
        collapse-tags
        @change="initData"
      />
      <el-select
        v-model="searchParams.countryList"
        :options="(dict.countryList || []).map((x) => ({ label: x, value: x }))"
        placeholder="国家"
        clearable
        filterable
        multiple
        collapse-tags
        @change="initData"
      />
      <el-select
        v-model="searchParams.categoryList"
        :options="(dict.categoryList || []).map((x) => ({ label: x, value: x }))"
        placeholder="品类"
        clearable
        filterable
        multiple
        collapse-tags
        @change="initData"
      />
      <el-button text @click="handleRest">重置</el-button>
      <template #actions>
        <el-popover
          placement="bottom-end"
          trigger="click"
          :teleported="false"
          @before-enter="pointDescVisible = true"
          @after-leave="pointDescVisible = false"
        >
          <template #reference>
            <i class="iconfont icon-xianxingtubiaoxunwen"></i>
          </template>
          <PointDesc v-if="pointDescVisible" :page-type="'经营驾驶舱'" />
        </el-popover>
      </template>
    </FilterComponent>
    <el-scrollbar :style="{ flex: 1 }" :view-style="{ height: 'unset' }">
      <div class="data-container">
        <!-- 核心数据 -->
        <coreData :searchParams="searchParams" />
        <!-- 销售数据分布分析 -->
        <salesData />
        <!-- 品类 Top10 分析 -->
        <categoryData />
        <!-- 销售额&毛利额趋势 -->
        <salesGrossProfitTrend v-model:time-type="timeType" ref="salesGrossProfitTrendRef" />
        <!-- 客单价&订单量趋势 -->
        <averageOrderAndTrend :averageOrderAndTrendData="averageOrderAndTrendData" />
        <!-- 环比增长率趋势 -->
        <m2mGrowthTrendData time-type="currentYearTrends" />
        <!-- 下钻分析 -->
        <downholeAnalysis :searchParams="searchParams" />
        <!-- 独立站排行分析 -->
        <stationRank v-model:station-country="stationCountry" />
        <div class="station-trend">
          <!-- 独立站整体表现趋势 -->
          <stationTrend :station-country="stationCountry" />
          <trafficSource />
          <funnelConversions />
        </div>
        <!-- <deviceView /> -->
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts" name="decisionAnalysis">
  import { biApi } from '@/api';
  import dayjs from 'dayjs';
  import coreData from './components/coreData.vue';
  import salesData from './components/salesData.vue';
  import categoryData from './components/categoryData.vue';
  import salesGrossProfitTrend from './components/salesGrossProfitTrend.vue';
  import averageOrderAndTrend from './components/averageOrderAndTrend.vue';
  import m2mGrowthTrendData from './components/m2mGrowthTrendData.vue';
  import downholeAnalysis from './components/downholeAnalysis.vue';
  import stationTrend from './components/stationTrend.vue';
  import stationRank from './components/stationRank.vue';
  import trafficSource from './components/trafficSource.vue';
  import funnelConversions from './components/funnelConversions.vue';
  import TimeSearch from '../components/TimeSearch.vue';
  import PointDesc from './components/PointDesc.vue';
  import FilterComponent from '../components/FilterComponent.vue';

  const pointDescVisible = ref(false);
  const time = dayjs().format('YYYY-MM');
  const searchParams = ref<any>({
    endMonth: time,
    startMonth: time,
    areaList: [],
    categoryList: [],
    countryList: [],
    platformList: [],
  });
  const dict = ref<any>({ areaList: [], categoryList: [], countryList: [], platformList: [] });
  const getDict = async () => {
    const res = await biApi.biAnalysisQueryEnums(searchParams.value);
    if (res) {
      dict.value = res;
    }
  };
  const dataDetail = ref<any>({
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
    drillDownAnalysis: {
      drillDownByArea: [],
      drillDownByCountry: [],
      drillDownByPlatform: [],
      drillDownByCategory: [],
    },
    proportionAnalysis: {
      areaProportions: [],
      countryProportions: [],
      platformProportions: [],
      categoryProportionOrderBySales: [],
      categoryProportionOrderByGrossProfits: [],
    },
    trafficAnalysis: {
      conversionFunnel: {},
      trafficSourceDists: [],
      countryRankingMap: {},
      countryRankingTrendMap: {},
    },
    trendAnalysis: {
      salesTrend: {
        currentYearTrends: [],
        last12MonthTrends: [],
        lastYearTrends: [],
      },
    },
  });
  provide('detailData', dataDetail);

  const salesGrossProfitTrendRef = ref();
  const loading = ref(false);
  provide('loading', loading);
  let firstLoad = true;
  const initData = async () => {
    loading.value = true;
    getDict();
    const res = await biApi.biAnalysisQueryManageAnalysis(searchParams.value).finally(() => {
      loading.value = false;
    });
    if (res) {
      dataDetail.value.drillDownAnalysis = {
        drillDownByArea: [],
        drillDownByCountry: [],
        drillDownByPlatform: [],
        drillDownByCategory: [],
      };
      dataDetail.value = res;
      // 初始默认时间为数据更新的月份
      const updateDate = dayjs(res.updateDate).startOf('month').format('YYYY-MM');
      if (firstLoad && dayjs(searchParams.value.endMonth).isAfter(updateDate)) {
        firstLoad = false;
        searchParams.value.startMonth = updateDate;
        searchParams.value.endMonth = updateDate;
        initData();
        return;
      }
      initAverageOrderAndTrendData();
      // getDimensionAnalysis();
    }
  };
  const timeType = ref('last12MonthTrends'); // 暂时无用
  const averageOrderAndTrendData = ref<any>();
  const initAverageOrderAndTrendData = async () => {
    const res = await biApi.biAnalysisQueryAverageOrderAmountTrends(searchParams.value);
    if (res) {
      averageOrderAndTrendData.value = res.averageOrderAmountTrends;
    }
  };
  const stationCountry = ref('美国');
  onMounted(() => {
    initData();
  });
  const handleRest = () => {
    searchParams.value = {
      endMonth: searchParams.value.endMonth,
      startMonth: searchParams.value.startMonth,
      areaList: [],
      categoryList: [],
      countryList: [],
      platformList: [],
    };
    initData();
  };
  // const getDimensionAnalysis = async () => {
  //   const res = await biApi.biAnalysisQueryDimensionAnalysis({
  //     ...searchParams.value,
  //     dimensionList: [
  //       {
  //         dimension: 'area',
  //         dimensionValue:''
  //       },
  //     ],
  //   });
  //   if (res) {
  //     dataDetail.value.drillDownAnalysis = res;
  //   }
  // };
</script>

<style scoped lang="scss">
  .bi-dashboard {
    height: 100%;
    display: flex;
    flex-direction: column;
    font-family: 'PingFang SC', sans-serif;
    .data-container {
      // max-width: 1408px;
      padding: 0 16px 16px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(24, 1fr);
      gap: 16px;
      & > div {
        grid-column: span 24;
      }
      & > div:nth-child(2) {
        grid-column: span 17;
      }
      & > div:nth-child(3) {
        grid-column: span 7;
      }
      & > div:nth-child(5) {
        grid-column: span 12;
      }
      & > div:nth-child(6) {
        grid-column: span 12;
      }
      // & > div:nth-child(8) {
      //   grid-column: span 14;
      // }
      // & > div:nth-child(9) {
      //   grid-column: span 10;
      // }
      & > div:nth-child(8) {
        grid-column: span 16;
      }
      & > div:nth-child(9) {
        grid-column: span 8;
      }
      & > div:nth-child(10) {
        grid-column: span 12;
      }
      & > div:nth-child(11) {
        grid-column: span 12;
      }
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
  :deep(.el-radio-group) {
    font-family: 'PingFang SC', sans-serif;
    --el-button-font-weight: 400;
    --el-font-size-base: 12px;
    --el-border-radius-base: 6px;
    .el-radio-button {
      --el-radio-button-checked-bg-color: var(---P6, #02b96b);
      --el-radio-button-checked-border-color: var(---P6, #02b96b);
      --el-color-primary: var(---P6, #02b96b);
      --el-border-color-extra-light: #fff;
      --el-button-bg-color: #fff;
      &:first-child .el-radio-button__inner {
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
      }
      &:last-child .el-radio-button__inner {
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
      }
    }
    .el-radio-button__inner {
      padding: 4px 10px;
      line-height: 20px;
      min-width: 70px;
      border: 1px solid var(---N4, #e7e9e8);
      border-radius: 0;
      align-items: center;
      justify-content: center;
    }
    .el-radio-button.is-active .el-radio-button__original-radio:not(:disabled) {
      & + .el-radio-button__inner {
        background-color: #fff;
        border-color: var(--el-radio-button-checked-bg-color, var(--el-color-primary));
        color: var(--el-radio-button-checked-bg-color, var(--el-color-primary));
        font-weight: 400;
        box-shadow: unset;
      }
    }
  }
</style>
