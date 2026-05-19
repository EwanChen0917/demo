<template>
  <div class="sales-data">
    <div class="sales-data__title">独立站整体表现趋势</div>
    <div class="chart-container">
      <div class="chart-area" id="stationTrend"></div>
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
  import { formatMoneyObj } from '../../utils/utils';

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
  const props = defineProps({
    stationCountry: {
      type: String,
      default: '美国',
    },
  });
  const detailData = inject('detailData', ref<any>({}));
  const data = computed(() => {
    return detailData.value.trafficAnalysis.countryRankingTrendMap[props.stationCountry] || [];
  });
  let chart: echarts.ECharts | null = null;
  const initEcharts = (el: HTMLElement) => {
    if (!chart) {
      chart = echarts.init(el);
      window.addEventListener('resize', () => {
        chart?.resize();
      });
    }
    const salesAmountList = data.value.map((item: any) => item.salesAmount) || [];
    const maxSalesAmount = Math.max(...salesAmountList);
    const minSalesAmount = Math.min(...salesAmountList);
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      legend: {
        data: ['品类排名', '月销售额'],
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
        left: '68px',
        right: '24px',
        height: 'auto',
      },
      yAxis: [
        {
          type: 'value',
          name: '月销售额',
          axisLabel: {
            formatter(value) {
              const { value: amount, unit } = formatMoneyObj(value);
              return `${Number(amount.replace(',', ''))} ${unit}`;
            },
          },
          nameTextStyle: {
            fontSize: 12,
            fontWeight: 400,
            color: '#999',
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
          name: '排名',
          axisLabel: {
            formatter: '{value}',
          },
          nameTextStyle: {
            fontSize: 12,
            fontWeight: 400,
            color: '#999',
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
              color: '#999',
              type: 'dashed',
            },
          },
          inverse: true, // 反转y轴，使排名从上到下
        },
      ],
      xAxis: {
        type: 'category',
        position: 'bottom',
        data: data.value.map((item: any) => item.month) || [],
        axisLine: {
          show: true, // 隐藏y轴刻度线
          position: 'bottom',
          onZero: false,
          lineStyle: {
            color: '#999',
            // type: 'dashed',
          },
        },
      },
      series: [
        {
          name: '月销售额',
          type: 'bar',
          barWidth: 19,
          data: data.value.map((item) => item.salesAmount) || [],
          itemStyle: {
            borderRadius: [4, 4, 0, 0],
            color: '#258DFF',
          },
          tooltip: {
            valueFormatter(value) {
              const { value: amount, unit } = formatMoneyObj(value);
              return `${amount} ${unit}`;
            },
          },
        },
        {
          name: '品类排名',
          type: 'line',
          yAxisIndex: 1,
          data: data.value.map((item: any) => item.categoryRankNew),
          itemStyle: {
            borderRadius: [4, 4, 0, 0],
            color: '#02B96B',
          },
          label: {
            show: false,
            position: 'top',
            fontSize: 12,
            fontFamily: 'DIN Blod',
            color: '#1F1F1F',
          },
        },
      ],
    };
    chart.setOption(option);
  };
  watch(data, (newData) => {
    init();
  });
  const init = () => {
    initEcharts(document.getElementById('stationTrend') as HTMLElement);
  };
  // onMounted(() => {
  //   init();
  // });
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
        height: 303px;
      }
    }
  }
</style>
