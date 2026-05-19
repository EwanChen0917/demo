<template>
  <div ref="chartContainer" class="echart-container"></div>
</template>

<script lang="ts" setup>
  import { useTemplateRef } from 'vue';
  import * as echarts from 'echarts/core';
  import { useResizeObserver } from '@vueuse/core';
  import { BiContracts } from '@/api';
  import { BarChart, LineChart } from 'echarts/charts';
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
  import { formatNumberObj, formatRate } from '../utils/utils';

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
  ]);

  const props = withDefaults(
    defineProps<{
      data?: BiContracts.TrendBean[];
      color?: string;
      label?: string;
      isRate?: boolean;
    }>(),
    {
      data: () => [],
      color: '#409eff',
    }
  );

  let chart: any = null;
  const initEcharts = (el: HTMLElement) => {
    const values = props.data.map((item) => item.value ?? 0);
    const maxValue = Math.max(...values);
    const minValue = Math.min(...values);
    if (!chart) {
      chart = echarts.init(el);
      useResizeObserver(el, () => {
        chart?.resize();
      });
    }
    const option = {
      tooltip: {
        show: !!props.label,
        trigger: 'axis',
        confine: false,
        appendToBody: true,
        appendTo: 'body',
        position: 'bottom',
        axisPointer: {
          type: 'line',
          lineStyle: {
            color: '#C5C5C5',
            type: 'solid',
          },
        },

        formatter: (params: any) => {
          const { name } = params[0];
          const data = params[0].value;
          return `
            <div style="color: #666; font-size: 12px; margin-bottom: 4px">${name}</div>
            <div style="font-size: 12px;">
              <span style="color: #666;">${props.label}: </span>
              <span style="color: #1F1F1F; font-family: DIN; font-weight: 500">${
                props.isRate ? formatRate(data) : formatNumberObj(data)
              }</span>
            </div>`;
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
          alignWithLabel: true,
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
  // useResizeObserver(chartContainer.value, () => {
  //   chart.resize();
  // });
  const init = () => {
    initEcharts(chartContainer.value! as HTMLElement);
  };
  onMounted(() => {
    if (chartContainer.value) {
      init();
    }
  });
  watch(
    () => props.data,
    () => {
      nextTick(() => {
        init();
      });
    }
  );
</script>

<style lang="scss" scoped>
  .echart-container {
    width: 100%;
    height: 100%;
    position: relative;
    background-color: transparent;
    border-radius: 4px;
  }
</style>
