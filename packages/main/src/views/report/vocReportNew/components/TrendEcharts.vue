<template>
  <div ref="chartContainer" class="echart-container"></div>
</template>

<script lang="ts" setup>
  import { useTemplateRef } from 'vue';
  import * as echarts from 'echarts/core';
  import { LineChart } from 'echarts/charts';
  import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
  } from 'echarts/components';
  import { LabelLayout, UniversalTransition } from 'echarts/features';
  import { CanvasRenderer } from 'echarts/renderers';

  const props = withDefaults(
    defineProps<{
      data: { month: string; value?: number }[];
      color?: string;
    }>(),
    {
      data: () => [],
      color: '#409eff',
    }
  );
  echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    LineChart,
    LabelLayout,
    UniversalTransition,
    CanvasRenderer,
  ]);
  let chart: any = null;
  const initEcharts = (el: HTMLElement) => {
    const values = props.data.map((item) => item.value ?? 0);
    const maxValue = Math.max(...values);
    const minValue = Math.min(...values);
    if (!chart) {
      chart = echarts.init(el);
    }
    const option = {
      tooltip: {
        show: false,
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      legend: {
        show: false,
      },
      grid: {
        height: 'auto',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
      },
      color: props.color || '#409eff',
      yAxis: {
        type: 'value',
        name: '数值',
        max: maxValue * 1.2,
        min: minValue * 0.8,
        interval: (maxValue - minValue) / 5,
        nameTextStyle: {
          fontSize: 12,
          fontWeight: 400,
          color: '#999',
          align: 'right',
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#999',
          }, // 隐藏y轴刻度线
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: '#ededed',
            type: 'dashed',
          },
        },
      },
      xAxis: {
        type: 'category',
        data: props.data.map((item) => item.month),
        axisLabel: {
          show: false, // 隐藏x轴刻度标签
        },
        axisLine: {
          show: false, // 隐藏y轴刻度线
          lineStyle: {
            color: '#999',
            // type: 'dashed',
          },
        },
        axisTick: {
          show: false, // 隐藏y轴刻度线
        },
        splitLine: {
          show: false, // 隐藏x轴分割线
        },
      },
      series: {
        name: '数值',
        type: 'line',
        smooth: true,
        symbol: 'none',
        data: props.data.map((item) => item.value) || [],
        itemStyle: {
          borderWidth: 0,
        },
        lineStyle: {
          width: 0.9,
          color: props.color || '#409eff',
        },
        areaStyle: {
          // 渐变色
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: `${props.color}28` || '#409eff',
            },
            {
              offset: 1,
              color: `${props.color}00`, // 渐变色结束颜色
            },
          ]),
        },
      },
    };
    chart.setOption(option);
  };
  const chartContainer = useTemplateRef<HTMLElement>('chartContainer');
  const init = () => {
    initEcharts(chartContainer.value! as HTMLElement);
  };
  watch(
    () => props.data,
    () => {
      nextTick(() => {
        if (chartContainer.value) {
          initEcharts(chartContainer.value! as HTMLElement);
        }
      });
    }
  );
  onMounted(() => {
    if (chartContainer.value) {
      init();
    }
  });
</script>

<style lang="scss" scoped>
  .echart-container {
    width: 100%;
    height: 100%;
    position: relative;
    background-color: transparent;
    border-radius: 4px;
    overflow: hidden;
  }
</style>
