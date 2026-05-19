<template>
  <div class="product-manager-dashboard">
    <FilterComponent :update-date="updateDate" @refresh="initData">
      <FilterSection
        :searchParams="searchParams"
        :updateDate="updateDate"
        @update:level2-list="handleLevel2List"
      />
    </FilterComponent>
    <el-scrollbar style="flex: 1" :view-style="{ height: 'unset' }">
      <div class="content-section" v-loading="loading">
        <!-- Dashboard content goes here -->
        <CorePoint
          :data="state.total"
          :trendList="state.trendList"
          :top3NegativeCount="state.top3NegativeCount"
          :returnRateTop3Platform="state.returnRateTop3Platform"
          :refundRateTop3Platform="state.refundRateTop3Platform"
          :top3VocCount="state.top3VocCount"
          @skip-particulars="skipParticulars"
        />
        <TrendAnalysis :trendList="state.trendList" />
        <DimensionAnalysis
          :level2List="state.level2List"
          :return-level2-list="state.returnLevel2List"
          :level2Trend="state.level2Trend"
          :return-level2-trend="state.returnLevel2Trend"
          :level3MapList="state.level3MapList"
          :returnLevel3MapList="state.returnLevel3MapList"
          :spuLevel3MapList="state.spuLevel3MapList"
          :spuReturnLevel3MapList="state.spuReturnLevel3MapList"
          :spuTrend="state.spuTrend"
          :spuReturnTrend="state.spuReturnTrend"
          :spuLaunchCycleReturnTrend="state.spuLaunchCycleReturnTrend"
          :spuLevel3LaunchCycleMapList="state.spuLevel3LaunchCycleMapList"
          :spuReturnLevel3LaunchCycleMapList="state.spuReturnLevel3LaunchCycleMapList"
          @skip-particulars="skipParticulars"
        />
      </div>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup name="PMDashboard">
  import { biApi, type BiContracts } from '@/api';
  import { encryptByBase64 } from '@/utils/aesTils';
  import dayjs from 'dayjs';
  import FilterSection from './parts/FilterSection.vue';
  import CorePoint from './parts/CorePoint.vue';
  import TrendAnalysis from './parts/TrendAnalysis.vue';
  import FilterComponent from '../components/FilterComponent.vue';
  import DimensionAnalysis from './parts/DimensionAnalysis.vue';
  const searchParams = reactive<BiContracts.CommonAnalysisReq>({
    dateType: 'month',
    week: undefined,
    month: undefined,
    year: undefined,
    productLineList: ['吸奶器'],
    level1List: ['产品问题'],
    categoryList: undefined,
    platformList: undefined,
    countryList: undefined,
    spuNewProductTag: '',
    spuNameList: undefined,
    spuStatusList: ['可销售'],
  });
  provide('searchParams', searchParams);
  let level2List: string[] = [];
  const handleLevel2List = (value: string[]) => {
    level2List = value;
  };

  const state = reactive<BiContracts.ProductManagerResp>({
    total: undefined,
    trendList: undefined,
    level2List: undefined,
    level2Trend: undefined,
    spuTrend: undefined,
    level3MapList: undefined,
    spuLevel3MapList: undefined,
    top3NegativeCount: undefined,
    returnRateTop3Platform: undefined,
    refundRateTop3Platform: undefined,
    top3VocCount: undefined,
    spuLaunchCycleReturnTrend: undefined,
    spuLevel3LaunchCycleMapList: undefined,
    spuReturnLevel3LaunchCycleMapList: undefined,
  });
  const updateDate = ref('');

  biApi.biProductManagerQueryLastDate().then((res) => {
    updateDate.value = res as string;
    searchParams.month = dayjs(updateDate.value).format('YYYY-MM');
  });
  const loading = ref(false);
  const initData = async () => {
    loading.value = true;
    const res = await biApi.biProductManagerQueryProductManager(searchParams).finally(() => {
      loading.value = false;
    });
    Object.assign(state, res);
  };
  watch(
    () => searchParams,
    () => {
      initData();
    },
    { deep: 1 }
  );

  const router = useRouter();
  const skipParticulars = async (payload) => {
    const fields = {
      平台: 'platformList',
      国家: 'countryList',
      标签一级分类: 'level1List',
      标签二级分类: 'level2',
      标签三级分类: 'level3',
      SPU名称: 'spuNameList',
      品线: 'productLineList',
      SPU状态: 'spuStatusList',
      VOC来源: 'vocSource',
      数据来源: 'dataSource',
      三级类目: 'categoryList',
    };

    const params = new URLSearchParams();
    const mergeSearchParams = {
      ...searchParams,
      date: searchParams[searchParams.dateType!],
      ...payload,
    };
    if (!mergeSearchParams.level2) {
      mergeSearchParams.level2 = level2List;
    }
    if (mergeSearchParams.dateType === 'week') {
      const weekList = mergeSearchParams.date.split(' ');
      const weekStr = weekList[0];
      const res = await biApi.biCommonQueryWeek({ weekStr });
      params.append('反馈日期_s', res.weekList?.[0].startDate);
      params.append('反馈日期_e', res.weekList?.[0].endDate);
    } else if (mergeSearchParams.dateType === 'month') {
      const dateObj = dayjs(mergeSearchParams.date);
      const monthStart = dateObj.startOf('month').format('YYYY-MM-DD');
      const monthEnd = dateObj.endOf('month').format('YYYY-MM-DD');
      params.append('反馈日期_s', monthStart);
      params.append('反馈日期_e', monthEnd);
    } else if (mergeSearchParams.dateType === 'year') {
      const dateObj = dayjs(mergeSearchParams.date);
      // 只有年份，则1月到12月；如果是今年，则只看当月
      if (mergeSearchParams.date.length === 4) {
        if (dateObj.isSame(dayjs(), 'year')) {
          const yearStart = dateObj.startOf('year').format('YYYY-MM-DD');
          const today = dayjs().format('YYYY-MM-DD');
          params.append('反馈日期_s', yearStart);
          params.append('反馈日期_e', today);
        } else {
          const yearStart = dateObj.startOf('year').format('YYYY-MM-DD');
          const yearEnd = dateObj.endOf('year').format('YYYY-MM-DD');
          params.append('反馈日期_s', yearStart);
          params.append('反馈日期_e', yearEnd);
        }
      } else {
        // 如果是年月，则只看当月
        const startYear = dateObj.startOf('year').format('YYYY-MM-DD');
        const endYear = dateObj.endOf('month').format('YYYY-MM-DD');
        params.append('反馈日期_s', startYear);
        params.append('反馈日期_e', endYear);
      }
    }
    Object.keys(fields).forEach((key: string) => {
      const value = (mergeSearchParams as any)[fields[key]];
      // 注：三级类目名称在「重点产品趋势分析」和「单产品VOC标签分析」中不参与搜索
      if (!((mergeSearchParams.moduleType === 'productAnalysis' || mergeSearchParams.moduleType === 'spuTagAnalysis') && fields[key] === 'categoryList')) {
        if (Array.isArray(value)) {
          params.append(key, value.join(','));
        } else if (value !== undefined && value !== null) {
          params.append(key, value);
        }
      }
    });
    // 要对空格转加号做特殊处理
    const biUrl = `https://finebi.luteos.com/webroot/decision/v5/design/report/d04e262881ae4e75b2ff4b0b92da220e/view?${params
      .toString()
      .replace(/\+/g, '%20')}`;
    const url = router.resolve({
      name: 'frame',
      params: {
        menuCode: 'M2025073018402714630583',
        frameUrl: encryptByBase64(biUrl),
      },
    });
    const win = window.open(`https://erp.luteos.com${url.href}`, 'pd-dashboard-particulars');
  };
</script>

<style lang="scss" scoped>
  .product-manager-dashboard {
    height: 100%;
    display: flex;
    flex-direction: column;
    :deep(.font-din) {
      font-family: DIN;
    }
  }
  .header-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    .right {
      display: flex;
      align-items: center;
      gap: 16px;

      .deal-time {
        display: flex;
        align-items: center;
        gap: 4px;
        white-space: nowrap;
        font-size: 14px;
        /* 较弱/Regular 12 */
        font-family: 'PingFang SC';
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px; /* 166.667% */
        icon-Root,
        .Root-tyicon {
          font-size: 14px;
          color: #999;
          cursor: unset;
        }
        .label {
          color: var(---N6, var(---N6, #999));
        }
        .value {
          color: var(---N9, var(---N9, #1f1f1f));
        }
      }

      .iconfont,
      .Root-tyicon {
        font-size: 16px;
        color: #666666;
        cursor: pointer;
      }
    }
  }
  .content-section {
    padding: 16px;
    padding-top: 0px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .gap {
    width: 1px;
    height: 12px;
    background-color: var(---N4, #dedede);
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
  :deep(.el-table thead th) {
    font-weight: 500 !important;
  }
</style>
