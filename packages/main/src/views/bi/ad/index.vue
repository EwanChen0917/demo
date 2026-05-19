<template>
  <div class="ad-dashboard">
    <FilterComponent :update-date="updateDate" @refresh="initData">
      <el-date-picker
        class="time-picker"
        popper-class="ad-time-picker-popper"
        :model-value="[searchParams.startDate, searchParams.endDate]"
        type="daterange"
        placeholder="日期"
        value-format="YYYY-MM-DD"
        format="YYYY-MM-DD"
        :clearable="false"
        @update:model-value="
          (data) => {
            searchParams.startDate = data[0];
            searchParams.endDate = data[1];
            initData();
          }
        "
        :disabledDate="
          (data) => {
            const today = dayjs(updateDate);
            return today.isBefore(dayjs(data), 'day');
          }
        "
      />
      <el-select
        v-model="searchParams.countryList"
        :options="(dict.countryList || []).map((x) => ({ label: x, value: x }))"
        placeholder="国家"
        clearable
        filterable
        multiple
        collapse-tags
        collapse-tags-tooltip
        @change="initData"
      />
      <el-select
        class="platform-select"
        v-model="searchParams.platformList"
        :options="(dict.platformList || []).map((x) => ({ label: x, value: x }))"
        placeholder="平台"
        clearable
        filterable
        multiple
        collapse-tags
        collapse-tags-tooltip
        @change="initData"
      />
      <el-select
        v-model="searchParams.gtmProductLineList"
        :options="(dict.gtmProductLineList || []).map((x) => ({ label: x, value: x }))"
        class="gtm-select"
        placeholder="GTM组"
        clearable
        filterable
        multiple
        collapse-tags
        collapse-tags-tooltip
        @change="initData"
      />
      <el-select
        v-model="searchParams.productLineList"
        :options="(dict.productLineList || []).map((x) => ({ label: x, value: x }))"
        placeholder="品线"
        clearable
        filterable
        multiple
        collapse-tags
        collapse-tags-tooltip
        @change="initData"
      />
      <el-select
        v-model="searchParams.brandList"
        :options="(dict.brandList || []).map((x) => ({ label: x, value: x }))"
        placeholder="品牌"
        clearable
        filterable
        multiple
        collapse-tags
        collapse-tags-tooltip
        @change="initData"
      />
      <el-select
        v-model="searchParams.categoryList"
        :options="(dict.categoryList || []).map((x) => ({ label: x, value: x }))"
        class="category-select"
        placeholder="三级品类"
        clearable
        filterable
        multiple
        collapse-tags
        collapse-tags-tooltip
        @change="initData"
      />
      <el-select
        v-model="searchParams.spuNameList"
        :options="(dict.spuNameList || []).map((x) => ({ label: x, value: x }))"
        placeholder="SPU"
        clearable
        filterable
        multiple
        collapse-tags
        collapse-tags-tooltip
        @change="initData"
      />
      <el-select
        class="adstype-select"
        v-model="searchParams.adsType"
        placeholder="广告类型"
        clearable
        @change="initData"
      >
        <el-option v-for="option in dict.adsType" :key="option" :label="option" :value="option" />
      </el-select>
      <el-select
        class="currency-select"
        v-model="searchParams.currencyCode"
        placeholder="币种"
        @change="initData"
      >
        <el-option label="美元" value="USD" />
        <el-option label="人民币" value="CNY" />
      </el-select>
      <el-button text @click="resetFilters">重置</el-button>
    </FilterComponent>
    <el-scrollbar :style="{ flex: 1 }" :view-style="{ height: 'unset' }">
      <div v-loading="loading" class="data-container">
        <!-- 核心数据 -->
        <CoreData :total="dataDetail.total" :trendList="dataDetail.trendList" />
        <!-- 趋势分析 -->
        <TrendAnalysis :trendList="dataDetail.trendList" />
        <TotalAd :total="dataDetail.total" :trendList="dataDetail.trendList" />
        <AdAnalysis
          v-if="dataDetail.quadrantTotal"
          :quadrantDetailList="dataDetail.quadrantDetailList"
          :quadrantTotal="dataDetail.quadrantTotal"
          :quadrantTotalList="dataDetail.quadrantTotalList"
          :clicksStart="dataDetail.clicksStart"
          :clicksEnd="dataDetail.clicksEnd"
          :maxClicks="dataDetail.maxClicks"
          :minClicks="dataDetail.minClicks"
          @refresh-data="refreshAdAnalysis"
        />
        <DataOverview :searchParams="searchParams" />
        <CountryAnalysis
          :countryPropList="dataDetail.countryPropList"
          :gtmProductLinePropList="dataDetail.gtmProductLinePropList"
          :brandPropList="dataDetail.brandPropList"
          :adsTypePropList="dataDetail.adsTypePropList"
        />
        <TopList
          :brandTop10="dataDetail.brandTop10"
          :categoryTop10="dataDetail.categoryTop10"
          :spuTop10="dataDetail.spuTop10"
        />
        <div class="split-wrapper">
          <CvrAnalysis :total="dataDetail.total" />
          <StrategicAnalysis :adsLevel="dataDetail.adsLevel" />
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts" name="ad">
  import { biApi, type BiContracts } from '@/api';
  import dayjs from 'dayjs';
  import { useReport } from '@/hooks/event/useReport';
  import { decryptByBase64 } from '@/utils/aesTils';
  import CoreData from './parts/CoreData.vue';
  import TrendAnalysis from './parts/TrendAnalysis.vue';
  import TotalAd from './parts/TotalAd.vue';
  import AdAnalysis from './parts/AdAnalysis.vue';
  import DataOverview from './parts/DataOverview.vue';
  import CountryAnalysis from './parts/CountryAnalysis.vue';
  import TopList from './parts/TopList.vue';
  import CvrAnalysis from './parts/CvrAnalysis.vue';
  import StrategicAnalysis from './parts/StrategicAnalysis.vue';
  import FilterComponent from '../components/FilterComponent.vue';

  // 从工作台首页跳转过来时，获取传递的参数
  const route = useRoute();
  const queryParams = JSON.parse(
    route.query.params ? decryptByBase64(route.query.params as string) : '{}'
  ) as BiContracts.CommonAnalysisReq;

  const searchParams = ref<BiContracts.CommonAnalysisReq>({
    startDate: queryParams.startDate || dayjs().subtract(7, 'day').format('YYYY-MM-DD'),
    endDate: queryParams.endDate || dayjs().subtract(1, 'day').format('YYYY-MM-DD'),
    countryList: queryParams.countryList || [], // 国家
    platformList: queryParams.platformList || [], // 平台
    gtmProductLineList: queryParams.gtmProductLineList || [], // gtm组
    productLineList: [], // 品线
    brandList: [], // 品牌
    categoryList: queryParams.categoryList || [], // 三级品类
    spuNameList: queryParams.spuNameList || [], // spu
    adsType: undefined, // 广告类型
    currencyCode: 'USD', // 币种
  });
  const dict = ref<BiContracts.EnumsResp>({});
  const getDict = async () => {
    const res = await biApi.biCommonQueryEnums({ enumType: 'ad' });
    if (res) {
      dict.value = res;
    }
  };
  const updateDate = ref(dayjs().format('YYYY-MM-DD'));
  const dataDetail = shallowReactive<BiContracts.AdAnalysisResp>({
    adsTypePropList: undefined,
    brandPropList: undefined,
    brandTop10: undefined,
    categoryTop10: undefined,
    countryDetailList: undefined,
    countryPropList: undefined,
    gtmProductLinePropList: undefined,
    quadrantDetailList: undefined,
    quadrantTotal: undefined,
    quadrantTotalList: undefined,
    spuTop10: undefined,
    total: undefined,
    trendList: undefined,
    clicksStart: undefined,
    clicksEnd: undefined,
    maxClicks: undefined,
    minClicks: undefined,
    adsLevel: undefined,
  });
  provide('detailData', dataDetail);
  const { report } = useReport();
  const loading = ref(false);
  const initData = async () => {
    loading.value = true;
    getDict();
    const res = await biApi.biAdQueryAdAnalysis(searchParams.value).finally(() => {
      loading.value = false;
    });
    Object.assign(dataDetail, res);
    report('Filter_criteria', {
      ...searchParams.value,
    });
  };
  initData();
  const resetFilters = () => {
    searchParams.value = {
      startDate: dayjs().subtract(7, 'day').format('YYYY-MM-DD'),
      endDate: dayjs().subtract(1, 'day').format('YYYY-MM-DD'),
      countryList: [], // 国家
      platformList: [], // 平台
      gtmProductLineList: [], // gtm组
      productLineList: [], // 品线
      brandList: [], // 品牌
      categoryList: [], // 三级品类
      spuNameList: [], // spu
      adsType: undefined, // 广告类型
      currencyCode: 'USD', // 币种
    };
    initData();
  };
  const refreshAdAnalysis = async () => {
    const res = await biApi.biAdQueryAdQuadrantAnalysis(searchParams.value);
    dataDetail.quadrantDetailList = res.quadrantDetailList;
    dataDetail.quadrantTotal = res.quadrantTotal;
    dataDetail.quadrantTotalList = res.quadrantTotalList;
    dataDetail.clicksStart = res.clicksStart;
    dataDetail.clicksEnd = res.clicksEnd;
  };
</script>

<style scoped lang="scss">
  .ad-dashboard {
    height: 100%;
    display: flex;
    flex-direction: column;
    :deep(.el-date-editor--daterange) {
      width: 240px;
    }
    .data-container {
      // max-width: 1408px;
      padding: 0 16px 16px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      row-gap: 16px;
    }
    .station-trend {
      display: flex;
      flex-direction: column;
      gap: 16px;
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
  .split-wrapper {
    display: flex;
    column-gap: 16px;
    & > .data-card:first-child {
      width: 0;
      flex: 1;
    }
    & > .data-card:last-child {
      width: 0;
      flex: 2;
    }
  }
</style>
