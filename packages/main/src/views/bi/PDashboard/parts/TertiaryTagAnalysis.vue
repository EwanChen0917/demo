<template>
  <div class="tertiary-tag-analysis">
    <BiCard v-for="tab in tabList" :key="tab.title" :title="tab.title">
      <template v-if="tab.dataKey === 'spuLevel3MapList'" #actions>
        <el-tag>{{ spuName }}</el-tag>
      </template>
      <StackBarChart
        v-loading="tab.loading || false"
        :data="tab.data"
        :color="tab.color"
        :type="type"
        @click-bar="skipParticulars"
      />
    </BiCard>
  </div>
</template>

<script setup lang="ts">
  import { type BiContracts } from '@/api';
  import BiCard from '../../components/BiCard.vue';
  import StackBarChart from '../../components/StackBarChart.vue';

  const props = defineProps<{
    spuLevel3MapList?: BiContracts.ProductManagerLevelDO;
    level3MapList?: BiContracts.ProductManagerLevelDO;
    spuName: string;
    type: 'voc' | 'return';
  }>();

  const emit = defineEmits<{
    skipParticulars: [payload: Record<string, any>];
  }>();

  const loading = ref(false);
  const tabList = computed(() => [
    {
      title: props.type === 'voc' ? '整体产品问题VOC标签分析' : '整体产品退货标签分析',
      color: ['#019E5F', '#02B96B', '#26C77C', '#4FD592', '#B0F1CC'],
      dataKey: 'level3MapList',
      data: props.level3MapList,
      loading: false,
    },
    // {
    //   title: `产品三级标签分析 - ${props.spuName} VOC数量分析`,
    //   color: ['#258DFF', '#4CA8FF', '#73C0FF', '#9AD5FF', '#C1E7FF'],
    //   dataKey: 'spuLevel3MapList',
    //   data: data.value,
    //   loading: loading.value,
    // },
  ]);
  const searchParams = inject<any>('searchParams');
  const controller = new AbortController();
  const data = ref<BiContracts.ProductManagerLevelDO>();
  // watch(
  //   () => [props.spuName, props.spuLevel3MapList],
  //   async () => {
  //     controller.abort();
  //     if (props.spuName === DEFAULT_SPU_NAME) {
  //       data.value = props.spuLevel3MapList;
  //       return;
  //     }
  //     loading.value = true;
  //     // 当 spuName 变化时，tabList 会重新计算，从而更新图表数据
  //     const res = await biApi
  //       .biProductManagerQuerySpuLevel3MapList({
  //         ...searchParams,
  //         signal: controller.signal,
  //         spuName: props.spuName,
  //       })
  //       .finally(() => {
  //         loading.value = false;
  //       });
  //     data.value = res.spuLevel3MapList;
  //   }
  // );

  const skipParticulars = (payload: Record<string, any>) => {
    emit('skipParticulars', {
      levlel2: payload.level2,
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
