<template>
  <div class="sales-data">
    <div v-if="title" class="data-title">
      {{ title }}
      <span v-if="props.option.title">-{{ props.option.title }}</span>
    </div>
    <div v-if="empty" class="conclusions-empty">
      <EmptyAnimation name="listEmpty" :width="128" :height="128" />
      <span>暂无数据~</span>
    </div>
    <div class="chart-container" v-else>
      <div class="chart-area" ref="salesGrossProfitTrend"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useTemplateRef } from 'vue';
  import * as echarts from 'echarts/core';
  import { BarChart, LineChart, PieChart, ScatterChart, RadarChart } from 'echarts/charts';
  import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
  } from 'echarts/components';
  // 标签自动布局、全局过渡动画等特性
  import { LabelLayout, UniversalTransition } from 'echarts/features';
  // 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
  import { CanvasRenderer } from 'echarts/renderers';
  import { useResizeObserver } from '@vueuse/core';
  import { getEchartsData } from './utils/echartsOption';

  echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    BarChart,
    LineChart,
    LabelLayout,
    UniversalTransition,
    CanvasRenderer,
    PieChart,
    ScatterChart,
    RadarChart,
  ]);
  let chart: any = null;
  const initEcharts = (el: HTMLElement, option) => {
    if (!chart) {
      chart = echarts.init(el);
      useResizeObserver(el, () => {
        chart?.resize();
      });
    }
    option && chart.setOption(option);
  };
  const salesGrossProfitTrendRef = useTemplateRef('salesGrossProfitTrend');
  const init = (option) => {
    initEcharts(salesGrossProfitTrendRef.value as HTMLElement, option);
  };

  const props = withDefaults(
    defineProps<{
      option?: object;
      title?: string;
      emptyDataClick?: boolean;
    }>(),
    {
      option: () => {
        return {};
      },
      title: '',
      emptyDataClick: false,
    }
  );

  const empty = ref(false);

  watch(
    () => props.option,
    (newVal) => {
      empty.value = newVal.data.length == 0;
      if (newVal.data.length == 0) return;
      const newOption = getEchartsData(newVal);
      nextTick(() => {
        init(newOption);
      });
    },
    {
      deep: true,
      immediate: true,
    }
  );

  watch(() => props.emptyDataClick, (newVal) => {
    if(!newVal) {
      nextTick(() => {
        chart?.resize();
      });
    }
  }, { immediate: true })
</script>

<style scoped lang="scss">
  .sales-data {
    background: #fff;
    border-radius: 10px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 12px 16px;
    border-radius: 8px;
    border: 1px solid var(---N2, #f5f5f5);
    .chart-container {
      width: 100%;
      height: 368px;
      .chart-area {
        width: 100%;
        height: 368px;
      }
    }
    .data-title {
      overflow: hidden;
      color: var(---N9, var(---N9, #262626));
      text-overflow: ellipsis;
      font-family: 'PingFang SC Medium';
      font-size: 12px;
      font-style: normal;
      font-weight: 500;
      line-height: 20px;
    }
    .conclusions-empty {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: var(---N6, var(---N6, #8a8f8d));
      font-size: 14px;
    }
  }
</style>
