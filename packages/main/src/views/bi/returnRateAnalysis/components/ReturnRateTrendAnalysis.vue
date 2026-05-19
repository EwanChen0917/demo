<template>
  <div class="sales-data">
    <div class="sales-data__title">退货率趋势</div>
    <div class="chart-container" ref="chartContainer">
      <div class="chart-area" ref="chartCanvas"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import * as echarts from 'echarts/core';
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
  import { BiContracts } from '@/api';
  import { useTemplateRef } from 'vue';
  import { formatMoneyObj } from '../../../utils/utils';

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
  const loading = inject('loading', ref(false));
  const props = defineProps<{
    state: BiContracts.ReturnRateResp;
  }>();
  const returnRateTrends = computed(() => {
    return props.state.returnRateTrendAnalysis?.returnRateTrends || [];
  });
  let chart: any = null;
  const initEcharts = (el: HTMLElement) => {
    if (!chart) {
      chart = echarts.init(el);
    }
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      color: ['#02B96B', '#258DFF'],
      legend: {
        data: ['Momcozy', '竞品'],
        bottom: '24px',
        textStyle: {
          fontSize: 12,
          color: '#999',
        },
        itemWidth: 22,
        itemHeight: 12,
        itemGap: 26,
      },
      grid: {
        left: '20px',
        right: '20px',
        bottom: '60px',
        height: 'auto',
        containLabel: true,
      },
      yAxis: [
        {
          type: 'value',
          name: '退货率',
          axisLabel: {
            formatter: (value: number) => {
              return value.toLocaleString('zh-CN', {
                style: 'percent',
                minimumFractionDigits: 1,
                maximumFractionDigits: 1,
              });
            },
          },
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
            show: true,
            lineStyle: {
              color: '#E6E6E6',
              type: 'dashed',
            },
          },
        },
      ],
      xAxis: {
        type: 'category',
        data: returnRateTrends.value?.map((item) => item.month),
        axisLabel: {
          show: true,
        },
        axisLine: {
          show: true, // 隐藏y轴刻度线
          lineStyle: {
            color: '#999',
            // type: 'dashed',
          },
        },
        axisTick: {
          show: true, // 隐藏y轴刻度线
        },
        splitLine: {
          show: false, // 隐藏x轴分割线
        },
      },
      series: [
        {
          name: 'Momcozy',
          type: 'line',
          data: returnRateTrends.value.map((item) => item.returnRate || 0),
          label: {
            show: false,
            position: 'top',
            color: '#1f1f1f',
            fontFamily: 'DIN Blod, "PingFang SC", sans-serif',
            formatter: (params) => {
              return params.value.toLocaleString('zh-CN', {
                style: 'percent',
                minimumFractionDigits: 1,
                maximumFractionDigits: 1,
              });
            },
          },
          tooltip: {
            valueFormatter(value) {
              return value.toLocaleString('zh-CN', {
                style: 'percent',
                minimumFractionDigits: 1,
                maximumFractionDigits: 1,
              });
            },
          },
        },
        {
          name: '竞品',
          type: 'line',
          data: returnRateTrends.value.map((item) => item.competitiveReturnRate || 0),
          label: {
            show: false,
            position: 'top',
            color: '#1f1f1f',
            fontFamily: 'DIN Blod, "PingFang SC", sans-serif',
            formatter: (params) => {
              return params.value.toLocaleString('zh-CN', {
                style: 'percent',
                minimumFractionDigits: 1,
                maximumFractionDigits: 1,
              });
            },
          },
          tooltip: {
            valueFormatter(value) {
              return value.toLocaleString('zh-CN', {
                style: 'percent',
                minimumFractionDigits: 1,
                maximumFractionDigits: 1,
              });
            },
          },
        },
      ],
    };
    chart.setOption(option);
  };
  const chartCanvasRef = useTemplateRef<HTMLElement | null>('chartCanvas');
  const init = () => {
    initEcharts(chartCanvasRef.value as HTMLElement);
  };
  const resizeObserver = new ResizeObserver(() => {
    if (chart) {
      chart.resize();
    }
  });
  const chartContainerRef = useTemplateRef<HTMLElement | null>('chartContainer');
  watch(returnRateTrends, () => {
    console.log('returnRateTrends changed', returnRateTrends);
    init();
  });
  onMounted(() => {
    init();
    resizeObserver.observe(chartContainerRef.value as HTMLElement);
  });
  onBeforeUnmount(() => {
    resizeObserver.disconnect();
  });
</script>

<style scoped lang="scss">
  .sales-data {
    background: #fff;
    border-radius: 10px;
    padding: 16px 20px 0 20px;
    .sales-data__title {
      font-family: 'PingFang SC Medium', sans-serif;
      font-size: 14px;
      font-weight: 500;
      line-height: 22px;
      color: #1f1f1f;
      display: flex;
      align-items: center;
      .operation {
        margin-left: auto;
        display: flex;
        align-items: center;
        font-size: 14px;
        color: #1f1f1f;
      }
    }
    .chart-container {
      width: 100%;
      .chart-area {
        width: 100%;
        height: 325px;
      }
    }
  }
</style>
