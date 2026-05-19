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
          <span class="title">品牌分析专题</span>
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
              <el-select v-model="search.area" placeholder="区域" clearable filterable>
                <el-option v-for="item in dict.areaList" :key="item" :label="item" :value="item" />
              </el-select>
            </el-form-item>
            <el-form-item :style="{ width: '186px' }">
              <el-select v-model="search.country" placeholder="国家" clearable filterable>
                <el-option
                  v-for="item in dict.countryList"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="body" v-loading="loading">
        <el-scrollbar class="left left-scrollbar">
          <div>
            <!-- 品牌声量分析 -->
            <BrandVoiceTrends
              v-if="state.brandVoiceTrends"
              :trendAnalysis="state.brandVoiceTrends!"
            />
            <!-- 品牌注册用户数 -->
            <CustomerCountTrends
              v-if="state.customerCountTrends"
              :trendAnalysis="state.customerCountTrends!"
            />
            <!-- 独立站购买用户数及复购率 -->
            <PurchaseTrends
              v-if="state.purchaseLast12MonthTrends"
              :trendAnalysis="state.purchaseLast12MonthTrends!"
            />
            <!-- 多维分析 -->
            <DrillDownAnalysis
              v-if="state.drillDownAnalysis"
              :drillDownAnalysis="state.drillDownAnalysis!"
              :searchParams="search"
            />
          </div>
        </el-scrollbar>
        <el-scrollbar class="right">
          <AnalysisResult :originAnalysisResults="state.analysisResults!" />
        </el-scrollbar>
      </div>
    </main>
  </el-drawer>
</template>

<script lang="ts" setup>
  import { biApi, BiContracts } from '@/api';
  import dayjs from 'dayjs';
  import BrandVoiceTrends from './components/BrandVoiceTrends.vue';
  import CustomerCountTrends from './components/CustomerCountTrends.vue';
  import PurchaseTrends from './components/PurchaseTrends.vue';
  import DrillDownAnalysis from './components/DrillDownAnalysis.vue';
  import AnalysisResult from './components/AnalysisResult.vue';

  const props = defineProps<{
    searchParams: BiContracts.ManageAnalysisReq;
  }>();
  const isFullscreen = ref(false);
  const drawerVisible = defineModel<boolean>();
  const time = ref<string>(dayjs().format('YYYY-MM'));
  const search = reactive<BiContracts.ManageAnalysisReq>({
    startMonth: time.value,
    endMonth: time.value,
    area: '',
    country: '',
  });
  watchEffect(() => {
    time.value = props.searchParams.endMonth || dayjs().format('YYYY-MM');
    search.area = props.searchParams.areaList?.length === 1 ? props.searchParams.areaList[0] : '';
    search.country =
      props.searchParams.countryList?.length === 1 ? props.searchParams.countryList[0] : '';
  });
  watchEffect(() => {
    search.startMonth = time.value;
    search.endMonth = time.value;
  });
  const state = ref<any>({
    analysisResults: [],
    drillDownAnalysis: null,
    brandVoiceTrends: null,
  });

  const loading = ref(false);
  const initData = async () => {
    loading.value = true;
    biApi.biBrandQueryEnums(search).then((res) => {
      if (res) {
        dict.value = res;
      }
    });
    const res = await biApi.biBrandQueryBrandAnalysis(search).finally(() => {
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
    state.value = {
      analysisResults: res.analysisResults || [],
      drillDownAnalysis: res.drillDownAnalysis || null,
      brandVoiceTrends: {
        last12MonthTrends: res.brandVoiceLast12MonthTrends || [],
        currentYearTrends: res.brandVoiceCurrentYearTrends || [],
        lastYearTrends: res.brandVoiceLastYearTrends || [],
      },
      customerCountTrends: {
        last12MonthTrends: res.customerCountLast12MonthTrends || [],
        currentYearTrends: res.customerCountCurrentYearTrends || [],
        lastYearTrends: res.customerCountLastYearTrends || [],
      },
      purchaseLast12MonthTrends: res.purchaseLast12MonthTrends || [],
    };
  };
  watchEffect(() => {
    initData();
  });
  const handleClose = () => {
    drawerVisible.value = false;
  };
  const dict = ref<any>({ areaList: [], categoryList: [], platformList: [] });
  const open = () => {
    drawerVisible.value = true;
  };
  defineExpose({
    open,
  });
</script>

<style lang="scss">
  .inventory-turnover-drawer {
    --el-dialog-padding-primary: 0 !important;
    --el-drawer-padding-primary: 0 !important;
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
