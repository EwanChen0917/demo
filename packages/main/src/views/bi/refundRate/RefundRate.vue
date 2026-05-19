<template>
  <el-drawer
    v-model="drawerVisible"
    append-to-body
    close-on-click-modal
    close-on-press-escape
    lock-scroll
    :size="isFullscreen ? '100%' : 1200"
    :with-header="false"
    class="inventory-turnover-drawer"
    destroy-on-close
  >
    <main class="inventory-turnover-main">
      <div class="header">
        <div class="header-content">
          <span class="title">售后&VOC专题</span>
          <div class="header-actions">
            <SvgIcon v-if="isFullscreen" @click.stop="isFullscreen = false" icon="recoverscreen" />
            <SvgIcon v-else @click.stop="isFullscreen = true" icon="fullscreen" />
            <el-divider direction="vertical" :style="{ height: '10px' }" />
            <SvgIcon class="cursor-point" icon="close" @click.stop="handleClose" />
          </div>
        </div>
        <div class="header-select">
          <el-form
            inline
            :model="search"
            class="search-form"
            :show-message="false"
            inline-message
            :label-width="0"
          >
            <el-form-item>
              <el-date-picker
                v-model="time"
                type="month"
                placeholder="日期"
                value-format="YYYY-MM"
                format="YYYY-MM"
                :clearable="false"
                :disabledDate="
                  (data) => {
                    const today = dayjs();
                    return data > today.endOf('month');
                  }
                "
              />
            </el-form-item>
            <el-form-item>
              <el-select
                v-model="search.platformList"
                :options="dict.platformList.map(item=>{
                  return {
                    label: item,
                    value: item,
                  };
                })"
                placeholder="平台"
                clearable
                filterable
                multiple
                collapse-tags
              />
            </el-form-item>
            <el-form-item>
              <el-select
                v-model="search.areaList"
                :options="dict.areaList.map(item=>{
                  return {
                    label: item,
                    value: item,
                  };
                })"
                placeholder="区域"
                clearable
                filterable
                multiple
                collapse-tags
              />
            </el-form-item>
            <el-form-item :style="{ width: '162px' }">
              <el-select
                v-model="search.countryList"
                :options="dict.countryList.map(item=>{
                  return {
                    label: item,
                    value: item,
                  };
                })"
                placeholder="国家"
                clearable
                filterable
                multiple
                collapse-tags
              />
            </el-form-item>
            <el-form-item :style="{ width: '162px' }">
              <el-select
                v-model="search.categoryList"
                :options="dict.categoryList.map(item=>{
                  return {
                    label: item,
                    value: item,
                  };
                })"
                placeholder="品类"
                clearable
                filterable
                multiple
                collapse-tags
              />
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="body" v-loading="loading">
        <el-scrollbar class="left left-scrollbar">
          <div>
            <!-- 趋势分析 -->
            <RefundRateTrendAnalysis
              v-if="state.trendAnalysis"
              :trendAnalysis="state.trendAnalysis!"
            />
            <!-- 多维分析 -->
            <RefundDrillDownAnalysis
              v-if="state.drillDownAnalysis"
              :hasCategory="search.categoryList?.length > 0"
              :drillDownAnalysis="state.drillDownAnalysis!"
              :searchParams="search"
            />
          </div>
        </el-scrollbar>
        <el-scrollbar class="right">
          <AnalysisResults :originAnalysisResults="state.analysisResults!" :searchParams="search" />
        </el-scrollbar>
      </div>
    </main>
  </el-drawer>
</template>

<script lang="ts" setup>
  import { biApi, BiContracts } from '@/api';
  import dayjs from 'dayjs';
  import RefundDrillDownAnalysis from './components/RefundDrillDownAnalysis.vue';
  import AnalysisResults from '../components/AnalysisResults.vue';
  import RefundRateTrendAnalysis from './components/RefundRateTrendAnalysis.vue';

  const props = defineProps<{
    searchParams: BiContracts.ManageAnalysisReq;
  }>();
  const isFullscreen = ref(false);
  const drawerVisible = defineModel<boolean>();
  const time = ref<string>(dayjs().format('YYYY-MM'));
  const search = shallowReactive<BiContracts.ManageAnalysisReq>({
    startMonth: time.value,
    endMonth: time.value,
    areaList: [],
    categoryList: [],
    countryList: [],
    platformList: [],
  });
  watchEffect(() => {
    time.value = props.searchParams.endMonth || dayjs().format('YYYY-MM');
    search.areaList = props.searchParams.areaList || [];
    search.countryList = props.searchParams.countryList || [];
    search.categoryList = props.searchParams.categoryList || [];
    search.platformList = props.searchParams.platformList || [];
  });
  watchEffect(() => {
    search.startMonth = time.value;
    search.endMonth = time.value;
  });
  const state = reactive<{
    analysisResults: BiContracts.BiAnalysisResultBean[];
    drillDownAnalysis: BiContracts.AfterSalesDrillDownBean;
    trendAnalysis: {
      last12MonthTrends: BiContracts.AfterSalesAnalysisTrendBean[];
      currentYearTrends: BiContracts.AfterSalesAnalysisTrendBean[];
      lastYearTrends: BiContracts.AfterSalesAnalysisTrendBean[];
    };
  }>({
    analysisResults: [],
    drillDownAnalysis: {},
    trendAnalysis: null as any,
  });

  const loading = ref(false);
  const initData = async () => {
    loading.value = true;
    biApi.biAfterSalesQueryEnums(search).then((res) => {
      if (res) {
        dict.value = res;
      }
    });
    const res = await biApi.biAfterSalesQueryAfterSalesAnalysis(search).finally(() => {
      loading.value = false;
    });
    const sortRule = ['by_supply_chain', 'by_finance_bp'];
    const analysisTypeDesc = {
      by_supply_chain: '增长链路',
      by_finance_bp: '数据复盘',
    };
    res.analysisResults?.sort((a, b) => {
      const aIndex = sortRule.indexOf(a.analysisType!);
      const bIndex = sortRule.indexOf(b.analysisType!);
      a.analysisTypeDesc = analysisTypeDesc[a.analysisType!];
      b.analysisTypeDesc = analysisTypeDesc[b.analysisType!];
      return aIndex - bIndex;
    });
    const { analysisResults, drillDownAnalysis, ...trendAnalysis } = res;
    Object.assign(state, {
      analysisResults: analysisResults || [],
      drillDownAnalysis: drillDownAnalysis || {},
      trendAnalysis: {
        last12MonthTrends: trendAnalysis.last12MonthTrends || [],
        currentYearTrends: trendAnalysis.currentYearTrends || [],
        lastYearTrends: trendAnalysis.lastYearTrends || [],
      },
    });
  };
  watch(
    search,
    () => {
      initData();
    },
    { immediate: true }
  );
  const handleClose = () => {
    drawerVisible.value = false;
  };
  const dict = ref<any>({ areaList: [], categoryList: [], platformList: [] });
</script>

<style lang="scss">
  .inventory-turnover-drawer {
    --el-drawer-padding-primary: 0;
    .inventory-turnover-main {
      display: flex;
      flex-direction: column;
      gap: 4px;
      height: 100%;
      width: 100%;
      background: var(---N0, #fff);
    }
    .header {
      flex: none;
      display: flex;
      flex-direction: column;
      padding: 16px 20px 20px;
      row-gap: 20px;
      border-bottom: 1px solid var(---N2, #f5f5f5);
      background: var(---N0, #fff);
    }
    .body {
      height: 0;
      flex: 1;
      display: flex;
      flex-direction: row;
      .left {
        width: 0;
        flex: 1;
        border-right: 1px solid var(---N2, #f5f5f5);
      }
      .right {
        width: 415px;
        flex: none;
      }
    }
    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .title {
      color: var(---N9, #1f1f1f);
      font-family: 'PingFang SC';
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: 24px; /* 150% */
    }
    .header-actions {
      display: flex;
      align-items: center;
      color: var(---N9, #1f1f1f);
      font-size: 20px;
      cursor: pointer;
      .svg-icon {
        font-size: 20px;
        display: inline-flex;
        &:hover {
          color: var(---C4, #02b96b);
        }
      }
    }
    .header-select {
      .el-form-item {
        width: 146px;
        height: 24px;
        align-items: center;
        gap: 10px;
        flex-shrink: 0;
        margin-right: 12px;
        margin-bottom: 0;
      }
    }
    .el-radio-group {
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
    .el-table {
      --el-table-header-text-color: #666;
      --el-table-text-color: #1f1f1f;
      --el-table-border-color: #f5f5f5;

      thead {
        th {
          font-weight: 400;
        }
      }
    }
  }
</style>
