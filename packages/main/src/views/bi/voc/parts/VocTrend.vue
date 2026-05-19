<template>
  <BiCard v-bind="$attrs" title="整体VOC趋势分析" v-loading="loading">
    <div class="tag-distribution">
      <div class="part1">
        <TrendAnalysis :data="trendList" />
      </div>
      <div class="part2">
        <CategoryAnalysis :data="categoryData" @update:spu="handleSpuSelect" />
      </div>
      <div class="part3">
        <TagClassic
          :state="state"
          @update:selected-voc-type="handleVocSource"
          @update:selected-tag="handleTag"
        />
      </div>
      <div class="part4">
        <TagTrend :data="state.levelTagTrend" @skip-particulars="handleSkipParticulars" />
      </div>
    </div>
  </BiCard>
</template>

<script lang="ts" setup>
  import { biApi, type BiContracts } from '@/api';
  import BiCard from '../../components/BiCard.vue';
  import TagClassic from '../components/TagClassic.vue';
  import CategoryAnalysis from '../components/CategoryAnalysis.vue';
  import TrendAnalysis from '../components/TrendAnalysis.vue';
  import TagTrend from '../components/TagTrend.vue';

  defineProps<{
    trendList: BiContracts.VocRateTrendBean[];
  }>();

  const emit = defineEmits<{
    (
      e: 'skipParticulars',
      params: {
        moduleId: string;
        spuNameList?: string[];
        productLineList?: string[];
        vocTypeList: string[] | undefined;
      } & typeof tagsParams
    ): void;
  }>();

  const searchParams = inject<BiContracts.BaseVocQueryReq>('searchParams')!;

  const state = reactive<BiContracts.VocTagDistributionResp>({
    vocTypeSummaryList: [],
    level1TagTop5: [],
    level2TagTop5: [],
    vocTagTop5: [],
    levelTagTrend: {},
  });
  const categoryData = ref<BiContracts.ProductManagerLevelTrendVO>(Object.create(null));

  const loading = ref(false);
  let selectedVocType: string | undefined;
  const clickMaxLevel = ref<number[]>([]);
  const selctedSpuNameList = {
    spuNameList: undefined as string[] | undefined,
    productLineList: undefined as string[] | undefined,
  };
  const hashMap = {
    1: 'vocLevel1List',
    2: 'vocLevel2List',
    3: 'vocLevel3List',
    4: 'vocLevel4List',
  };
  const tagsParams = {
    vocLevel2List: [] as [string] | [],
    vocLevel3List: [] as [string] | [],
    vocLevel4List: [] as [string] | [],
  };

  const initData = async (isRefresh = true) => {
    loading.value = isRefresh;
    if (isRefresh) {
      selctedSpuNameList.spuNameList = undefined;
      selctedSpuNameList.productLineList = undefined;
      selectedVocType = undefined;
      Object.keys(tagsParams).forEach((key) => {
        tagsParams[key as keyof typeof tagsParams] = [];
      });
      clickMaxLevel.value = [];
    }
    const tagTrendData = await Promise.all([
      biApi.biVocTagDistribution({
        ...searchParams,
        selectedVocType,
      }),
      biApi.biVocQueryProductLine({ ...searchParams }),
    ]).finally(() => {
      loading.value = false;
    });
    tagTrendData[0].vocTypeSummaryList?.sort((a, b) => b.count - a.count);
    Object.assign(state, tagTrendData[0]);
    categoryData.value = tagTrendData[1].productLineTrend || null;
  };
  defineExpose({ initData });
  watch(
    () => searchParams,
    () => {
      initData();
    },
    { deep: 1 }
  );

  const handleSpuSelect = async (payload: {
    productLineList?: string[];
    spuNameList?: string[];
  }) => {
    Object.assign(selctedSpuNameList, payload);
    const tagTrendData = await biApi.biVocTagDistribution({
      ...searchParams,
      productLineList: payload.productLineList || searchParams.productLineList,
      spuNameList: payload.spuNameList || searchParams.spuNameList,
    });
    clickMaxLevel.value = [];
    Object.assign(state, tagTrendData);
  };
  const handleVocSource = async (payload: { vocType: string }, originData: Record<string, any>) => {
    selectedVocType = payload.vocType;
    const tagTrendData = await biApi.biVocTagDistribution({
      ...searchParams,
      selectedVocType,
    });
    Object.assign(state, tagTrendData, originData);
  };

  const handleTag = async (
    payload: { tagName: string },
    level: number,
    originData: Record<string, any>
  ) => {
    if (payload.tagName === undefined) {
      clickMaxLevel.value = clickMaxLevel.value.filter((item) => item !== level);
    } else {
      clickMaxLevel.value.push(level);
    }
    const maxLevel = clickMaxLevel.value.sort((a, b) => b - a)[0];
    tagsParams[hashMap[level]] = payload.tagName ? [payload.tagName] : [];
    const tagTrendData = await biApi.biVocTagDistribution({
      ...searchParams,
      ...tagsParams,
      vocLevel: maxLevel,
      selectedVocType,
    });
    tagTrendData.vocTypeSummaryList?.sort((a, b) => b.count - a.count);
    Object.assign(state, tagTrendData, originData);
  };

  const handleSkipParticulars = (tag: string) => {
    const level = clickMaxLevel.value.sort((a, b) => b - a)[0] || 4;
    const params = Object.keys(tagsParams).reduce((acc, key) => {
      const value = tagsParams[key as keyof typeof tagsParams];
      acc[key] = value.length ? value : undefined;
      return acc;
    }, {} as typeof tagsParams);
    params[hashMap[level]] = tag ? [tag] : [];
    emit('skipParticulars', {
      moduleId: 'vocTrend',
      spuNameList: selctedSpuNameList.spuNameList,
      productLineList: selctedSpuNameList.productLineList,
      vocTypeList: selectedVocType ? [selectedVocType] : undefined,
      ...params,
    });
  };
</script>

<style lang="scss" scoped>
  .tag-distribution {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .part2 {
    border-radius: 10px;
    border: 1px solid var(---N2, #f4f5f5);
    background: var(---N0, #fff);
    padding: 16px;
    .header-section {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      .title {
        overflow: hidden;
        color: var(---N9, #262626);
        text-overflow: ellipsis;

        /* 常规/Medium 14 */
        font-family: 'PingFang SC';
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 22px; /* 157.143% */
      }
    }
    .el-pagination {
      box-shadow: none;
    }
  }
</style>
