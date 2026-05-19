<template>
  <div class="sales-data" v-loading="loading">
    <div class="sales-data__title">Top10销量品牌退货率</div>
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
  import { min } from 'lodash-es';

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
  const brandReturnRates = computed(() => {
    return props.state.brandReturnRates || [];
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
      color: ['#02B96B', '#FF9F22'],
      legend: {
        data: ['销售量', '退货率'],
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
        left: '48px',
        right: '24px',
        bottom: '60px',
        height: 'auto',
        containLabel: true,
      },
      yAxis: [
        {
          type: 'value',
          name: '销售量(件)',
          min: 0,
          max: brandReturnRates.value.length === 0 ? 100 : null,
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
        {
          type: 'value',
          name: '退货率',
          min: 0,
          max: brandReturnRates.value.length === 0 ? 1 : null,
          axisLabel: {
            formatter: (value: number) => {
              return (
                value?.toLocaleString('zh-CN', {
                  style: 'percent',
                  minimumFractionDigits: 1,
                  maximumFractionDigits: 1,
                }) || '-'
              );
            },
          },
          nameTextStyle: {
            fontSize: 12,
            fontWeight: 400,
            color: '#999',
            align: 'left',
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#999',
            },
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: '#E6E6E6',
              type: 'dashed',
            },
          },
        },
      ],
      xAxis: {
        type: 'category',
        data: brandReturnRates.value.map((item) => item.brand),
        axisLabel: {
          show: true,
          fontFamily: '"PingFang SC", sans-serif',
          color: '#999',
          interval: 0,
          rotate: 30,
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
      series: [
        {
          name: '销售量',
          type: 'bar',
          barWidth: 25,
          data: brandReturnRates.value.map((item) => item.saleQty || 0) || [],
          itemStyle: {
            borderRadius: [4, 4, 0, 0],
            color: '#02B96B',
          },
        },
        {
          name: '退货率',
          type: 'line',
          yAxisIndex: 1,
          data: brandReturnRates.value.map((item) => item.returnRate || 0) || [],
          label: {
            show: true,
            position: 'top',
            color: '#1f1f1f',
            fontFamily: 'DIN Blod, "PingFang SC", sans-serif',
            formatter: (params) => {
              return (
                params.value?.toLocaleString('zh-CN', {
                  style: 'percent',
                  minimumFractionDigits: 1,
                  maximumFractionDigits: 1,
                }) || '-'
              );
            },
          },
          itemStyle: {
            color: '#FF9F22',
          },
          tooltip: {
            valueFormatter(value) {
              return (
                value?.toLocaleString('zh-CN', {
                  style: 'percent',
                  minimumFractionDigits: 1,
                  maximumFractionDigits: 1,
                }) || '-'
              );
            },
          },
        },
      ],
    };
    chart.setOption(option);
  };
  const chartCanvasRef = useTemplateRef<HTMLDivElement>('chartCanvas');
  const init = () => {
    initEcharts(chartCanvasRef.value as HTMLElement);
  };
  watch(
    brandReturnRates,
    (newData) => {
      if (newData) {
        nextTick(() => {
          init();
        });
      }
    },
    { immediate: true }
  );
  const resizeObserver = new ResizeObserver(() => {
    if (chart) {
      chart.resize();
    }
  });
  const chartContainer = useTemplateRef<HTMLDivElement>('chartContainer');
  onMounted(() => {
    resizeObserver.observe(chartContainer.value as HTMLElement);
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
