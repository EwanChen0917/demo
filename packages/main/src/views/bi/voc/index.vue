<template>
  <div class="bi-voc-dashboard">
    <div class="more-filter-section">
      <FilterComponent
        dataFlat
        :update-date="updateDate"
        v-model:show-data-flat="showDataFlat"
        @refresh="initData"
      >
        <FilterSection
          v-model:searchParams="searchParams"
          v-model:dataSourceList="defaultDataSource"
          v-model:vocTagList="defaultVocTagList"
          :updateDate="updateDate"
          @reset="handleReset"
        />
        <template #catalog>
          <div class="catalog-wrapper">
            <div
              class="catalog-tag"
              :class="{ 'is-active': activeTab === c.id }"
              @click="onTabClick(c.id)"
              v-for="(c, idx) in catelogList"
              :key="c.label"
            >
              <i class="iconfont" :class="c.icon"></i>
              <span>{{ c.label }}</span>
            </div>
          </div>
        </template>
      </FilterComponent>
    </div>
    <el-scrollbar style="flex: 1" :view-style="{ height: 'unset' }">
      <div class="content-section">
        <CorePoint :data="data" id="corePoint" :ref="(el) => setRef(el)" />
        <VocTrend
          :trendList="trendList"
          id="vocTrend"
          :ref="(el) => setRef(el)"
          @skip-particulars="handleSkipDetail"
        />
        <VocTag
          id="tagDistribution"
          :ref="(el) => setRef(el)"
          @skip-particulars="handleSkipDetail"
        />
        <ProductVoc id="productVocDetail" :ref="(el) => setRef(el)" />
      </div>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup name="BiVoc">
  import { biApi, BiContracts } from '@/api';
  import dayjs from 'dayjs';
  import { encryptByBase64, decryptByBase64 } from '@/utils/aesTils';

  import { reactiveOmit } from '@vueuse/core';
  import { pick } from 'lodash-es';
  import FilterComponent from '../components/FilterComponent.vue';
  import FilterSection from './parts/FilterSection.vue';
  import CorePoint from './parts/CorePoint.vue';
  import VocTrend from './parts/VocTrend.vue';
  import VocTag from './parts/VocTag.vue';
  import ProductVoc from './parts/ProductVoc.vue';
  import { deleteConditions, queryConditions, saveConditions } from '../utils/utils';

  defineOptions({
    name: 'BiVoc',
  });
  const showDataFlat = ref(false);
  provide('showDataFlat', showDataFlat);
  const defaultMonth =
    Number(dayjs().format('DD')) > 10
      ? dayjs().format('YYYY-MM')
      : dayjs().subtract(1, 'month').format('YYYY-MM');
  const route = useRoute();
  // 从首页看板跳转过来的参数
  const transformQueryToArray = route.query.params
    ? JSON.parse(decryptByBase64(route.query.params as string))
    : null;
  const defaultVocTagList = shallowRef([['产品问题']]);
  const defaultDataSource = shallowRef([['客服工单'], ['商品评论']]);
  const MODUEL_NAME = 'biVoc';
  let conditionCode = '';
  const searchParams = reactive<BiContracts.BaseVocQueryReq>({
    periodType: 'month',
    weekList: undefined,
    monthList: [defaultMonth, defaultMonth],
    productLineMarketGroupList: undefined,
    productLineList: undefined,
    categoryNameLevel3List: undefined,
    platformList: undefined,
    countryList: undefined,
    spuNameList: undefined,
    vocLevel1List: undefined,
    vocLevel2List: undefined,
    vocLevel3List: undefined,
    dataCaliber: ['反馈/结算口径'],
    vocTypeList: undefined,
    dataSourceList: undefined,
  });
  queryConditions(MODUEL_NAME).then((res) => {
    const { recordList } = res;
    const savedConditions = recordList ? recordList[recordList.length - 1] : null;
    // 设置默认筛选项
    Object.assign(searchParams, {
      vocLevel1List: ['产品问题'],
      dataCaliber: ['反馈/结算口径'],
      vocTypeList: ['客服工单', '商品评论'],
      productLineList: ['吸奶器'],
    });
    if (savedConditions) {
      conditionCode = savedConditions.conditionCode!;
      const searchCondition = JSON.parse(savedConditions.searchCondition || '{}');
      Object.assign(
        searchParams,
        pick(
          searchCondition,
          'productLineMarketGroupList',
          'productLineList',
          'categoryNameLevel3List',
          'platformList',
          'countryList',
          'spuNameList',
          'vocLevel1List',
          'vocLevel2List',
          'vocLevel3List',
          'vocLevel4List',
          'dataCaliber',
          'vocTypeList',
          'dataSourceList'
        )
      );
      if (transformQueryToArray) {
        Object.assign(searchParams, {
          periodType:
            (transformQueryToArray.dateType === 'day' ? 'month' : transformQueryToArray.dateType) ||
            'month',
          weekList: transformQueryToArray.week ? [transformQueryToArray.week] : undefined,
          monthList: transformQueryToArray.monthList || [defaultMonth, defaultMonth],
          productLineMarketGroupList: transformQueryToArray.gtmProductLineList,
          categoryNameLevel3List: transformQueryToArray.category3List,
          platformList: transformQueryToArray.platformList,
          countryList: transformQueryToArray.countryList,
        });
      }
      searchCondition.defaultVocTagList &&
        (defaultVocTagList.value = searchCondition.defaultVocTagList);
      searchCondition.defaultDataSource &&
        (defaultDataSource.value = searchCondition.defaultDataSource);
    }
  });
  const handleReset = () => {
    searchParams.productLineList = ['吸奶器'];
    searchParams.productLineMarketGroupList = undefined;
    searchParams.categoryNameLevel3List = undefined;
    searchParams.platformList = undefined;
    searchParams.countryList = undefined;
    searchParams.spuNameList = undefined;
    searchParams.vocLevel1List = ['产品问题'];
    searchParams.vocLevel2List = undefined;
    searchParams.vocLevel3List = undefined;
    searchParams.vocLevel4List = undefined;
    searchParams.vocTypeList = ['客服工单', '商品评论'];
    searchParams.dataCaliber = ['反馈/结算口径'];
    defaultVocTagList.value = [['产品问题']];
    defaultDataSource.value = [['客服工单'], ['商品评论']];
  };
  provide('searchParams', searchParams);
  const updateDate = ref('');
  biApi.biVocMaxEndDate().then((res) => {
    updateDate.value = dayjs(res.endDate).format('YYYY-MM-DD');
  });
  const contentRef = ref([]);
  const setRef = (el) => {
    if (el) {
      contentRef.value.push(el);
    }
  };
  const loading = ref(false);
  const trendList = shallowRef<BiContracts.VocRateTrendBean[]>([]);
  const data = shallowRef<Omit<BiContracts.VocCoreIndicatorResp, 'trendList'>>({});
  const initCoreIndicator = async () => {
    loading.value = true;
    const res = await biApi.biVocCoreIndicator(searchParams).finally(() => {
      loading.value = false;
    });
    const { trendList: list, ...coreIndicator } = res;
    trendList.value = list || [];
    data.value = coreIndicator!;
  };
  watch(
    () => searchParams,
    async () => {
      initCoreIndicator();
      nextTick(async () => {
        conditionCode && deleteConditions(conditionCode);
        conditionCode = await saveConditions(
          MODUEL_NAME,
          Object.assign(reactiveOmit(searchParams, 'periodType', 'weekList', 'monthList'), {
            defaultDataSource: defaultDataSource.value,
            defaultVocTagList: defaultVocTagList.value,
          })
        );
      });
    },
    { deep: 1 }
  );
  const initData = async () => {
    initCoreIndicator();
    contentRef.value.forEach((item) => {
      item.initData && item.initData();
    });
  };

  const catelogList = [
    { label: 'VOC核心指标', id: 'corePoint', icon: 'icon-shujutongji' },
    { label: '整体VOC趋势分析', id: 'vocTrend', icon: 'icon-shujutongji' },
    { label: 'VOC品类分析', id: 'tagDistribution', icon: 'icon-chanpinyongyan' },
    {
      label: '商品评分和评论',
      id: 'productVocDetail',
      icon: 'Root-tyicon icon-Root-tyfb-messanger',
    },
  ];
  const onTabClick = (id: string) => {
    activeTab.value = id;
    const targetElement = document.getElementById(id);
    if (targetElement) {
      // 安卓不支持behavior: 'smooth'
      targetElement.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
  };

  const activeTab = ref(catelogList[0].id);
  const onIntersectionObserver = (entry: IntersectionObserverEntry[]) => {
    if (entry[0].isIntersecting) {
      // 处理进入视口的逻辑
      activeTab.value = entry[0].target.id;
    }
  };
  const observer = new IntersectionObserver(onIntersectionObserver, {
    rootMargin: '0px 0px -50% 0px',
  });
  onBeforeUnmount(() => {
    observer.disconnect();
  });
  onMounted(() => {
    catelogList
      .map((item) => document.getElementById(item.id))
      .forEach((el) => {
        if (el) {
          observer.observe(el);
        }
      });
  });
  const router = useRouter();
  const finBiUrl = {
    week: {
      menuCode: 'M2025122316153393651265',
      finBiId: '561bc36a67804b78b05cced3edbd0123',
    },
    month: {
      menuCode: 'M2025122316140570421128',
      finBiId: '955237cd7cd143aa87cc240a78ebec5b',
    },
  };
  const handleSkipDetail = async (row) => {
    const fields = {
      平台: 'platformList',
      GTM组: 'productLineMarketGroupList',
      区域: 'areaList',
      国家: 'countryList',
      产品品线: 'productLineList',
      三级类目: 'categoryNameLevel3List',
      SPU名称: 'spuNameList',
      标签一级分类: 'vocLevel1List',
      标签二级分类: 'vocLevel2List',
      标签三级分类: 'vocLevel3List',
      VOC标签: 'vocLevel4List',
      数据口径: 'dataCaliber',
      VOC来源: 'vocTypeList',
      数据来源: 'dataSourceList',
    };
    const params = new URLSearchParams();
    const vocTypeList = filterTree(row.vocTypeList, 0, defaultDataSource.value);

    const mergeSearchParams = {
      ...searchParams,
      date: searchParams.periodType === 'month' ? searchParams.monthList : searchParams.weekList,
      categoryNameLevel3List: row.categoryNameLevel3List || searchParams.categoryNameLevel3List,
      vocLevel1List: row.vocLevel1List || searchParams.vocLevel1List,
      vocLevel2List: row.vocLevel2List || searchParams.vocLevel2List,
      vocLevel3List: row.vocLevel3List || searchParams.vocLevel3List,
      vocLevel4List: row.vocLevel4List,
      vocTypeList: vocTypeList?.[0] || searchParams.vocTypeList,
      dataSourceList: vocTypeList?.[1] || searchParams.dataSourceList,
      spuNameList: row.spuNameList || searchParams.spuNameList,
      productLineList: row.productLineList || searchParams.productLineList,
    };
    if (searchParams.periodType === 'week') {
      const weekStr = mergeSearchParams.date!.join(',');
      params.append('年周', weekStr);
    } else if (searchParams.periodType === 'month') {
      params.append('年月区间_s', mergeSearchParams.date![0]);
      params.append('年月区间_e', mergeSearchParams.date![1]);
    }
    Object.keys(fields).forEach((key: string) => {
      const value = (mergeSearchParams as any)[fields[key]];
      if (Array.isArray(value) && value.length > 0) {
        const arrStr = value.join(',');
        arrStr && params.append(key, arrStr);
      } else if (value !== undefined && value !== null) {
        params.append(key, value);
      }
    });
    // 要对空格转加号做特殊处理
    const biUrl = `https://finebi.luteos.com/webroot/decision/v5/design/report/${
      finBiUrl[searchParams.periodType!].finBiId
    }/view?${params.toString().replace(/\+/g, '%20')}`;
    const url = router.resolve({
      name: 'frame',
      params: {
        menuCode: finBiUrl[searchParams.periodType!].menuCode,
        frameUrl: encryptByBase64(biUrl),
      },
    });
    const win = window.open(`https://erp.luteos.com${url.href}`, 'voc');
  };
  /**
   *
   * @param selectedKeys 选择的key
   * @param level key对应树的层级/深度
   * @param allKeys 选择树的结构，二维数组
   */
  const filterTree = (
    selectedKeys: string[] | null,
    level: number,
    allKeys: Array<string | string[]>
  ) => {
    let result: Array<string | string[]> = [];
    if (!selectedKeys || selectedKeys.length === 0) {
      result = allKeys;
    } else {
      result = allKeys.filter((item) => {
        if (Array.isArray(item)) {
          return item[level] && selectedKeys.includes(item[level]);
        }
        return level === 0 && selectedKeys.includes(item);
      });
    }
    const list = result.reduce(
      (resultList, item) => {
        if (Array.isArray(item)) {
          item.forEach((subItem, idx) => {
            if (resultList[idx] === undefined) {
              resultList[idx] = new Set<string>();
            }
            resultList[idx].add(subItem);
          });
        } else {
          resultList[0].add(item);
        }
        return resultList;
      },
      [new Set<string>()]
    );
    return list.map((set) => Array.from(set));
  };
</script>

<style lang="scss" scoped>
  .bi-voc-dashboard {
    min-width: 1440px;
    height: 100%;
    display: flex;
    flex-direction: column;
    :deep(.font-din) {
      font-family: DIN;
    }
  }
  .more-filter-tags {
    display: flex;
    column-gap: 10px;
    .el-tag {
      border-width: 0;
    }
    :deep(.el-tag__close) {
      --el-tag-text-color: #999999;
    }
    .btn-clear {
      color: var(---N6, var(---N6, #999));
      font-family: 'PingFang SC';
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px; /* 166.667% */
    }
  }
  .catalog-wrapper {
    display: flex;
    column-gap: 10px;
    background-color: #fff;
    padding: 10px 16px;
    .catalog-tag {
      padding: 4px 10px;
      display: flex;
      align-items: center;
      column-gap: 8px;
      border-radius: 6px;
      cursor: pointer;
      &.is-active {
        background: var(---P1, #f0fff6);
        color: var(---P6, var(---P6, #02b96b));
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
  :deep(.el-pagination__jump) {
    font-size: 0;
    --el-pagination-item-gap: 0;
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
    }
    .el-radio-button__inner {
      padding: 4px 10px;
      line-height: 20px;
      min-width: 70px;
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
  :deep(.el-pagination) {
    --el-pagination-item-gap: 0;
    .el-select {
      width: 98px;
    }
  }
</style>
