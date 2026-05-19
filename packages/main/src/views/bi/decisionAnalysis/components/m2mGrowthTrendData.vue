<template>
  <div class="sales-data" v-loading="loading">
    <div class="sales-data__title">环比增长率趋势</div>
    <div class="chart-container">
      <div class="chart-area" id="m2mGrowthTrendData"></div>
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
  import { formatPercent } from '../../utils/utils';

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
  const porps = defineProps({
    timeType: {
      type: String,
      default: 'currentYearTrends',
    },
  });
  const loading = inject('loading', ref(false));
  const detailData = inject('detailData', ref<any>({}));
  const data = computed(() => {
    return detailData.value.trendAnalysis?.salesTrend[porps.timeType] || [];
  });
  let chart: any = null;
  watch(data, (newData) => {
    if (newData) {
      init();
    }
  });
  const initEcharts = (el: HTMLElement) => {
    if (!chart) {
      chart = echarts.init(el);
      window.addEventListener('resize', () => {
        chart.resize();
      });
    }
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      legend: {
        data: ['销售额环比', '毛利额环比'],
        bottom: 0,
        textStyle: {
          fontSize: 12,
          color: '#999',
        },
        itemWidth: 22,
        itemHeight: 12,
        itemGap: 20,
      },
      grid: {
        // top: '40px',
        // width: '85%',
        left: '65px',
        right: '65px',
        height: 'auto',
      },
      yAxis: [
        {
          type: 'value',
          name: '增长率',
          axisLabel: {
            formatter: '{value}%',
          },
          nameTextStyle: {
            fontSize: 12,
            fontWeight: 400,
            color: '#999',
            align: 'right',
            padding: [0, 8, 0, 0],
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#999',
            },
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
        data: data.value.map((item: any) => item.month),
        // axisLine: {
        //   show: false, // 隐藏y轴刻度线
        //   lineStyle: {
        //     color: '#999',
        //     // type: 'dashed',
        //   },
        // },
        // axisTick: {
        //   show: false, // 隐藏y轴刻度线
        // },
        // splitLine: {
        //   show: false, // 隐藏x轴分割线
        // },
      },
      series: [
        {
          name: '销售额环比',
          type: 'line',
          barWidth: 19,
          data: data.value.map((item: any) => (item.salesAmountMom || 0) * 100),
          itemStyle: {
            borderRadius: [4, 4, 0, 0],
            color: '#02B96B',
          },
          tooltip: {
            valueFormatter(value) {
              return `${formatPercent(value / 100)}%`;
            },
          },
        },
        {
          name: '毛利额环比',
          type: 'line',
          barWidth: 19,
          data: data.value.map((item: any) => (item.grossProfitAmountMom || 0) * 100),
          itemStyle: {
            borderRadius: [4, 4, 0, 0],
            color: '#258DFF',
          },
          tooltip: {
            valueFormatter(value) {
              return `${formatPercent(value / 100)}%`;
            },
          },
        },
      ],
    };
    chart.setOption(option);
  };
  const init = () => {
    initEcharts(document.getElementById('m2mGrowthTrendData') as HTMLElement);
  };
</script>

<style scoped lang="scss">
  .sales-data {
    background: #fff;
    border-radius: 10px;
    padding: 24px;
    .sales-data__title {
      font-family: 'PingFang SC Medium', sans-serif;
      font-size: 16px;
      font-weight: 500;
      color: #1f1f1f;
      padding-left: 8px;
      display: flex;
      align-items: center;
      &::before {
        content: '';
        display: inline-block;
        width: 4px;
        height: 16px;
        background-color: #02b96b;
        margin-right: 8px;
        border-radius: 15px;
      }
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
        height: 308px;
      }
    }
  }
</style>
