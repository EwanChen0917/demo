<template>
  <BiCard :title="vocData.title">
    <template v-if="vocData.dataKey === 'spuLevel3MapList'" #actions>
      <el-tag>{{ spuName }}{{ type === 'voc' ? 'VOC数量分析' : '退货数量分析' }}</el-tag>
    </template>
    <StackBarChart
      v-loading="vocData.loading || false"
      :isSingleProduct="true"
      :data="vocData.data"
      :color="vocData.color"
      :type="type"
      :periodType="periodType"
      @click-bar="skipParticulars"
    />
  </BiCard>
</template>

<script setup lang="ts">
  import { biApi, BiContracts } from '@/api';
  import BiCard from '../../components/BiCard.vue';
  import StackBarChart from '../../components/StackBarChart.vue';
  import { DEFAULT_SPU_NAME } from '../constant';

  const props = defineProps<{
    spuLevel3MapList?: BiContracts.ProductManagerLevelDO;
    spuLevel3LaunchCycleMapList?: BiContracts.ProductManagerLevelDO;
    periodType: 'yearAccumulate' | 'monthAccumulate' | 'weekNaturalCompare' | 'launchCycleCompare';
    spuName: string;
    type: 'voc' | 'return';
  }>();

  const emit = defineEmits<{
    skipParticulars: [payload: Record<string, any>];
  }>();

  const loading = ref(false);
  const searchParams = inject<any>('searchParams');
  const controller = new AbortController();
  const data = ref<BiContracts.ProductManagerLevelDO>();
  watch(
    () => [props.spuName, props.spuLevel3MapList, props.spuLevel3LaunchCycleMapList, props.periodType],
    async () => {
      controller.abort();
      if (props.spuName === DEFAULT_SPU_NAME) {
        data.value = props.periodType === 'launchCycleCompare' ? props.spuLevel3LaunchCycleMapList : props.spuLevel3MapList;
        return;
      }
      loading.value = true;
      // 当 spuName 变化时，tabList 会重新计算，从而更新图表数据
      const apiFn =
        props.type === 'voc'
          ? biApi.biProductManagerQuerySpuLevel3MapList
          : biApi.biProductManagerQuerySpuReturnLevel3MapList;
      const res = await apiFn({
        ...searchParams,
        signal: controller.signal,
        spuName: props.spuName,
      }).finally(() => {
        loading.value = false;
      });

      if (props.type === 'voc') {
        data.value = props.periodType === 'launchCycleCompare' ? res.spuLevel3LaunchCycleMapList : res.spuLevel3MapList;
      } else {
        data.value = props.periodType === 'launchCycleCompare' ? res.spuReturnLevel3LaunchCycleMapList : res.spuReturnLevel3MapList;
      }
    }
  );
  const vocData = computed(() => ({
    title: (props.type === 'voc' ? '单产品VOC标签分析 ' : '单产品退货标签分析 ') + props.spuName,
    color: ['#258DFF', '#4CA8FF', '#73C0FF', '#9AD5FF', '#C1E7FF'],
    dataKey: 'spuLevel3MapList',
    data: data.value,
    loading: loading.value,
  }));
  const skipParticulars = (payload: Record<string, any>) => {
    emit('skipParticulars', {
      moduleType: 'spuTagAnalysis',
      spuNameList: [props.spuName],
      level2: payload.level2,
      level3: payload.level3,
    });
  };
</script>

<style lang="scss" scoped>
  .tertiary-tag-analysis {
    display: flex;
    column-gap: 16px;
    .data-card {
      width: 0;
      flex: 1;
    }
  }
</style>
