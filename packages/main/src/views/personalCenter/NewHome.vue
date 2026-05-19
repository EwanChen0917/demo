<template>
  <div class="home-v2">
    <SearchLine @reset-search="resetSearch" @refresh="initData">
      <template #search>
        <div class="time-search">
          <el-select
            class="time-search-type"
            v-model="searchParams.dateType"
            placeholder="时间维度"
            @change="onTimeTypeChange"
          >
            <el-option value="day" label="日">日</el-option>
            <el-option value="week" label="周">周</el-option>
            <el-option value="month" label="月">月</el-option>
          </el-select>
          <el-date-picker
            v-if="searchParams.dateType === 'day'"
            class="time-picker time-picker--range"
            :model-value="[searchParams.startDate, searchParams.endDate]"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="YYYY-MM-DD"
            format="YYYY-MM-DD"
            :disabled-date="(date) => date.getTime() > new Date().getTime()"
            :clearable="false"
            @update:model-value="
              (val) => {
                searchParams.startDate = val[0];
                searchParams.endDate = val[1];
                initData();
              }
            "
          />
          <el-date-picker
            v-if="searchParams.dateType === 'month'"
            class="time-picker"
            v-model="searchParams.month"
            type="month"
            placeholder="日期"
            value-format="YYYY-MM"
            format="YYYY-MM"
            :disabled-date="(date) => date.getTime() > new Date().getTime()"
            :clearable="false"
            @change="initData"
          />
          <el-select
            v-if="searchParams.dateType === 'week'"
            class="time-picker"
            v-model="searchParams.week"
            placeholder="周"
            @change="initData"
          >
            <el-option v-for="item in dict.weekStrList" :key="item" :value="item" :label="item">
              {{ item }}
            </el-option>
          </el-select>
        </div>
        <div ref="areaCountryContainerRef">
          <el-cascader
            v-model="searchParams.areaCountryList"
            :options="areaOptions"
            :props="{
              expandTrigger: 'hover',
              multiple: true,
              checkStrictly: false,
            }"
            placeholder="区域/国家"
            filterable
            clearable
            collapse-tags
            collapse-tags-tooltip
            :style="{ width: areaCountrySelectorWidth + 'px' }"
            @change="handlerAreaChange"
          />
        </div>
        <el-select
          v-if="false"
          v-model="searchParams.areaList"
          placeholder="区域"
          :options="dict.areaCountryList || []"
          multiple
          :props="{
            label: 'area',
            value: 'area',
          }"
          :clearable="true"
          filterable
          collapse-tags
          collapse-tags-tooltip
          @change="initData"
        />
        <el-select
          v-if="false"
          v-model="searchParams.countryList"
          placeholder="国家"
          :options="
            (dict.areaCountryList || [])
              .map((x) => x.countryList)
              .flat(2)
              .map((x) => ({ country: x }))
          "
          :props="{
            label: 'country',
            value: 'country',
          }"
          multiple
          :clearable="true"
          filterable
          collapse-tags
          collapse-tags-tooltip
          @change="initData"
        />
        <el-select
          v-model="searchParams.gtmProductLineList"
          auto-width
          placeholder="GTM组"
          :options="(dict.gtmProductLineList || []).map((x) => ({ name: x }))"
          :props="{
            label: 'name',
            value: 'name',
          }"
          multiple
          :clearable="true"
          filterable
          collapse-tags
          collapse-tags-tooltip
          @change="initData"
        />
        <!-- <el-select
          v-model="searchParams.shopList"
          auto-width
          placeholder="店铺名称"
          :options="(dict.shopList || []).map((x) => ({ name: x }))"
          multiple
          :props="{
            label: 'name',
            value: 'name',
          }"
          :clearable="true"
          filterable
          collapse-tags
          collapse-tags-tooltip
          @change="initData"
        /> -->
        <el-select
          v-model="searchParams.category3List"
          auto-width
          placeholder="三级类目"
          :options="(dict.category3List || []).map((x) => ({ name: x }))"
          multiple
          :props="{
            label: 'name',
            value: 'name',
          }"
          :clearable="true"
          filterable
          collapse-tags
          collapse-tags-tooltip
          :filterMethod="handleCategorySearch"
          @change="initData"
        />
        <el-select
          v-model="searchParams.category4List"
          auto-width
          placeholder="四级类目"
          :options="(dict.category4List || []).map((x) => ({ name: x }))"
          multiple
          :props="{
            label: 'name',
            value: 'name',
          }"
          :clearable="true"
          filterable
          collapse-tags
          collapse-tags-tooltip
          :filterMethod="handleCategory4Search"
          @change="initData"
        />
        <el-select
          v-model="searchParams.spuNameList"
          :loading="spuLoading"
          auto-width
          placeholder="SPU名称"
          :options="(dict.spuNameList || []).map((x) => ({ name: x }))"
          multiple
          :props="{
            label: 'name',
            value: 'name',
          }"
          :clearable="true"
          filterable
          collapse-tags
          collapse-tags-tooltip
          :filterMethod="handleSpuSearch"
          @change="initData"
        />
      </template>
      <template #left-actions>
        <div class="left-container">
          <div class="divider"></div>
          <div class="date-info">
            <i class="iconfont icon-shijian"></i>
            <span class="label">数据截止日期：</span>
            <span class="date">{{ lastDate }}</span>
          </div>
          <div class="divider"></div>
          <el-popover
            placement="bottom-end"
            trigger="click"
            :teleported="false"
            @before-enter="pointDescVisible = true"
            @after-leave="pointDescVisible = false"
          >
            <template #reference>
              <i
                class="iconfont icon-xianxingtubiaoxunwen"
                style="margin-right: 16px; color: #000"
              ></i>
            </template>
            <PointDesc v-if="pointDescVisible" :page-type="'全链路首页'" />
          </el-popover>
        </div>
      </template>
    </SearchLine>
    <div class="home__content" style="flex: 1">
      <div class="left">
        <el-scrollbar class="scrollbar">
          <!-- 指标总览 -->
          <PointData
            :trafficAnalysis="dataDetail.trafficAnalysis"
            :metricOverview="dataDetail.metricOverview"
            :metricOverviewTrend="dataDetail.metricOverviewTrend"
            v-loading="loading"
          />
          <!-- 流量分析，有亚马逊权限才展示 -->
          <FlowAnalysis
            v-if="
              !(
                searchParams.dateType === 'day' &&
                !dataDetail.trafficAnalysis?.amazonTrafficAnalysis
              )
            "
            :dateType="searchParams.dateType"
            :trafficAnalysis="dataDetail.trafficAnalysis"
            v-loading="loading"
          />
          <!-- 广告分析 -->
          <AdvertisingAnalysis :adAnalysis="dataDetail.adAnalysis" v-loading="loading" />
          <!-- 销售分析      -->
          <SaleAnalysis :salesAnalysis="dataDetail.salesAnalysis" v-loading="loading" />
          <!-- top 10 -->
          <Top10 ref="top10Ref" />
          <!-- 供应链分析 -->
          <SupplyChainAnalysis
            :supplyChainAnalysis="dataDetail.supplyChainAnalysis"
            v-loading="loading"
          />
          <!-- 售后分析 -->
          <AfterSaleAnalysis
            :afterSalesAnalysis="dataDetail.afterSalesAnalysis"
            v-loading="loading"
          />
        </el-scrollbar>
      </div>
      <div v-if="false" class="right">
        <el-scrollbar>
          <Sidebar :monthValue="monthValue" />
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="homeDashboard">
  import dayjs from 'dayjs';
  import { biApi, BiContracts } from '@/api';
  import Sidebar from '@/views/personalCenter/part/sidebar/sidebar.vue';
  import { FrontPageReq, FrontPageResp, ManageAnalysisEnumsResp } from '@/api/bi/data-contracts';
  import PointDesc from '@/views/bi/decisionAnalysis/components/PointDesc.vue';
  import SearchLine from './part/SearchLine.vue';
  import FlowAnalysis from './part/flowAnalysis/index.vue';
  import AdvertisingAnalysis from './part/advertisingAnalysis/index.vue';
  import AfterSaleAnalysis from './part/afterSaleAnalysis/index.vue';
  import SupplyChainAnalysis from './part/supplyChainAnalysis/index.vue';
  import SaleAnalysis from './part/saleAnalysis/index.vue';
  import Top10 from './part/top10/index.vue';
  import { useReport } from './hooks/useReport';
  import PointData from './part/pointData/index.vue';
  import { useDistributed } from './util/distributed';

  const pointDescVisible = ref(false);
  const modulesApi = {
    pointData: {
      api: biApi.biFrontpageQueryMetricOverview,
      props: ['metricOverview', 'metricOverviewTrend'],
    },
    flowAnalysis: {
      api: biApi.biFrontpageQueryTrafficAnalysis,
      props: ['trafficAnalysis'],
    },
    advertisingAnalysis: {
      api: biApi.biFrontpageQueryAdAnalysis,
      props: ['adAnalysis'],
    },
    saleAnalysis: {
      api: biApi.biFrontpageQuerySalesAnalysis,
      props: ['salesAnalysis'],
    },
    // top10: [biApi.biFrontpageQuerySpuSalesAnalysisList, biApi.biFrontpageQueryAreaSalesAnalysisList, biApi.biFrontpageQueryGtmSalesAnalysisList],
    supplyChainAnalysis: {
      api: biApi.biFrontpageQuerySupplyChainAnalysis,
      props: ['supplyChainAnalysis'],
    },
    afterSaleAnalysis: {
      api: biApi.biFrontpageQueryAfterSalesAnalysis,
      props: ['afterSalesAnalysis'],
    },
  };
  const loading = ref(false);
  const { distribute } = useDistributed();

  const dict = ref<ManageAnalysisEnumsResp>({
    areaList: [],
    categoryList: [],
    countryList: [],
    platformList: [],
  });
  const lastDate = ref<string>('');
  let originalDict = {
    category3List: [],
    category4List: [],
    spuNameList: [],
  };
  const getDict = async () => {
    const res = await biApi.biFrontpageQueryEnums(buildQuery());
    if (res) {
      distribute(res, dict);
      Object.keys(originalDict).forEach((key) => {
        requestIdleCallback(() => {
          originalDict[key] = res[key];
        });
      });
    }
  };
  const getLastDate = async () => {
    const res = await biApi.biFrontpageQueryLastDate({ dateType: searchParams.value.dateType });
    if (res && typeof res === 'string') {
      lastDate.value = res;
    }
  };
  const getInitForm = () => {
    const obj = {
      startDate: dayjs().subtract(7, 'day').format('YYYY-MM-DD'),
      endDate: dayjs().subtract(1, 'day').format('YYYY-MM-DD'),
      dateType: 'day',
      month: '',
      week: '',
      areaCountryList: [],
      areaList: [],
      countryList: [],
      gtmProductLineList: [],
      shopList: [],
      category3List: [],
      category4List: [],
      spuNameList: [],
    };

    const firstWeek = dict.value?.weekStrList?.[0] || '';
    if (firstWeek) {
      obj.dateType = 'week';
      obj.week = firstWeek;
    }

    return obj;
  };

  const searchParams = ref<FrontPageReq>(getInitForm());

  const monthValue = computed(() => {
    if (searchParams.value.dateType === 'month') {
      return dayjs(searchParams.value.month, 'YYYY-MM').format('YYYY-MM');
    }
    if (searchParams.value.dateType === 'week') {
      const reg = /(?<year>2\d{3}).*(?<month>\d{2})-/;
      const gs = searchParams.value.week.match(reg)?.groups;
      if (gs) {
        return dayjs(`${gs.year}-${gs.month}`, 'YYYY-MM').format('YYYY-MM');
      }
      return '';
    }
    if (searchParams.value.dateType === 'day') {
      if (searchParams.value.endDate) {
        return dayjs(searchParams.value.endDate, 'YYYY-MM-DD').format('YYYY-MM');
      }
    }
    return '';
  });

  const areaOptions = computed(() => {
    return (dict.value.areaCountryList || []).map((area) => {
      return {
        label: area.area,
        value: area.area,
        children: (area.countryList || []).map((c) => {
          return {
            label: c,
            value: c,
          };
        }),
      };
    });
  });

  const dataDetail = ref<FrontPageResp>({});

  const buildQuery = () => {
    const areaCountryList = searchParams.value.areaCountryList || [];
    const areaList = [...new Set(areaCountryList.map((x) => x[0]).filter(Boolean))];
    const countryList = [...new Set(areaCountryList.map((x) => x[1]).filter(Boolean))];
    return {
      ...searchParams.value,
      areaCountryList: undefined,
      areaList,
      countryList,
    };
  };

  provide('buildQuery', buildQuery);
  const top10Ref = ref();
  const getData = async () => {
    loading.value = true;
    const params = buildQuery();
    try {
      top10Ref.value?.init(params);
      const results = await Promise.allSettled(
        Object.values(modulesApi).map((api) => api.api(params))
      ).finally(() => {
        loading.value = false;
      });
      Object.keys(modulesApi).forEach((module, index) => {
        const result = results[index];
        if (result.status === 'fulfilled') {
          const data = result.value;
          const props = modulesApi[module].props;
          requestIdleCallback(() => {
            props.forEach((prop) => {
              dataDetail.value[prop] = data[prop];
            });
            if (module === 'saleAnalysis' && dataDetail.value.salesAnalysis) {
              dataDetail.value.salesAnalysis.dateType = params.dateType;
            }
          });
        } else {
          console.log(`接口 ${module} 失败:`, result.reason);
        }
      });
    } catch (e) {}
    // dataDetail.value = res || {};
    report('Filter_criteria', {
      ...params,
    });
  };

  const resetSearch = () => {
    searchParams.value = {
      ...getInitForm(),
      dateType: searchParams.value.dateType,
    };
    onTimeTypeChange();
    initData();
  };
  const initData = async () => {
    getDict();
    getLastDate();
    await getData();
  };

  const areaCountrySelectorWidth = ref(110);
  const areaCountryContainerRef = ref(null);
  const handlerAreaChange = async () => {
    initData();
    await nextTick();
    const els = areaCountryContainerRef.value.querySelectorAll('.el-cascader__tags .el-tag');
    let width = 0;
    els.forEach((el) => {
      width += el.clientWidth;
    });
    width += 55;
    if (width < 110) {
      width = 110;
    }
    areaCountrySelectorWidth.value = width;
  };
  const { report } = useReport();
  onMounted(async () => {
    await initData();
  });
  onActivated(() => {
    report('home_page_enter');
  });

  const onTimeTypeChange = () => {
    searchParams.value.startDate = '';
    searchParams.value.endDate = '';
    searchParams.value.month = '';
    searchParams.value.week = '';
    if (searchParams.value.dateType === 'day') {
      searchParams.value.startDate = dayjs().subtract(7, 'day').format('YYYY-MM-DD');
      searchParams.value.endDate = dayjs().subtract(1, 'day').format('YYYY-MM-DD');
    } else if (searchParams.value.dateType === 'month') {
      searchParams.value.month = dayjs().format('YYYY-MM');
    } else if (searchParams.value.dateType === 'week') {
      searchParams.value.week = dict.value.weekStrList?.[0] || '';
    }
    initData();
  };
  let handleCategorySearch = (val) => {
    console.log('search category', val);
    if (originalDict.category3List) {
      dict.value.category3List = originalDict.category3List;
      handleCategorySearch = null;
    }
  };
  let handleCategory4Search = (val) => {
    if (originalDict.category4List) {
      dict.value.category4List = originalDict.category4List;
      handleCategory4Search = null;
    }
  };
  const spuLoading = ref(false);
  let handleSpuSearch = (val) => {
    if (originalDict.spuNameList) {
      spuLoading.value = true;
      setTimeout(() => {
        dict.value.spuNameList = originalDict.spuNameList;
        spuLoading.value = false;
      }, 50);
      handleSpuSearch = null;
    }
  };
</script>

<style lang="scss" scoped>
  .home-v2 {
    min-width: 1200px;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  :deep(.lt-multi-select) {
    width: auto;
    min-width: 100px;

    .el-tag {
      max-width: 180px !important;
    }
  }

  :deep(.el-cascader) {
    .el-cascader__tags {
      top: 0;
      transform: translateY(0);

      .el-tag {
        max-width: 100px;
      }
    }
  }

  :deep(.link-label) {
    cursor: pointer;

    &:hover {
      color: var(--el-color-primary);
    }
  }

  .time-search {
    display: inline-flex;
    align-items: center;

    .time-search-type {
      width: 64px;
      border-radius: 6px 0px 0px 6px;
      background: #fff;
      &:focus-within {
        z-index: 1;
      }

      :deep(.el-select__wrapper) {
        border-radius: 6px 0px 0px 6px;
        background: #fff;
      }
    }

    :deep(.time-picker) {
      transform: translateX(-1px);
      width: 159px;
      &.time-picker--range {
        width: 220px;
        border-radius: 0 6px 6px 0;
      }
      .el-input__wrapper {
        border-radius: 0 6px 6px 0;
      }

      .el-select__wrapper {
        border-radius: 0 6px 6px 0;
      }
    }
  }

  .left-container {
    display: flex;
    align-items: center;
    .date-info {
      display: flex;
      align-items: center;
      font-size: 12px;
      color: var(---N6, #999);
      .label {
        display: flex;
        align-items: center;
        white-space: nowrap;
      }
      .date {
        color: #000;
        font-size: 13px;
      }
      .iconfont {
        cursor: pointer;
        font-size: 16px;
        color: var(---N8, #666);
        &:hover {
          color: var(---N9, #1f1f1f);
        }
      }
      .icon-shijian {
        cursor: initial;
        font-size: 14px;
        margin-right: 4px;
        color: var(---N6, #999);
        line-height: 20px;
      }
    }
    .divider {
      width: 1px;
      height: 12px;
      margin: 0 16px;
      background-color: var(---N4, #dedede);
    }
  }

  .home__content {
    height: 0;
    flex: 1;
    padding: 16px;
    display: flex;
    gap: 16px;
    min-height: 0;
    align-items: stretch;

    :deep(.el-loading-spinner) {
      margin-top: 0;
      transform: translateY(-50%);
    }

    // :deep(.el-radio-group) {
    //   --el-button-font-weight: 400;
    //   --el-font-size-base: 12px;

    //   .el-radio-button {
    //     --el-radio-button-checked-bg-color: var(---P6, #02b96b);
    //     --el-radio-button-checked-border-color: var(---P6, #02b96b);
    //     --el-color-primary: var(---P6, #02b96b);
    //     --el-border-color-extra-light: #fff;
    //     --el-button-bg-color: #fff;
    //   }

    //   .el-radio-button.is-active .el-radio-button__original-radio:not(:disabled) {
    //     & + .el-radio-button__inner {
    //       background-color: #fff;
    //       border-color: var(--el-radio-button-checked-bg-color, var(--el-color-primary));
    //       color: var(--el-radio-button-checked-bg-color, var(--el-color-primary));
    //       font-weight: 400;
    //     }
    //   }
    // }

    .left {
      flex: 1;
      min-width: 0;
      height: 100%;
      overflow: auto;
      display: flex;
      flex-direction: column;
      gap: 16px;

      :deep(.el-scrollbar__view) {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
    }

    .right {
      width: 324px;
      height: 100%;
      overflow: auto;
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
