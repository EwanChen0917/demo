<template>
  <div class="sales-data" v-loading="loading">
    <div class="sales-data__title">客单价&订单量趋势</div>
    <div class="chart-container">
      <div class="chart-area" id="averageOrderAndTrend"></div>
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
  const loading = inject('loading', ref(false));
  const props = defineProps({
    averageOrderAndTrendData: {
      type: Array,
      default: () => {
        return [];
      },
    },
  });
  let chart: any = null;
  const initEcharts = (el: HTMLElement) => {
    if (!chart) {
      chart = echarts.init(el);
      window.addEventListener('resize', () => {
        chart.resize();
      });
    }
    const dataset = props.averageOrderAndTrendData.map((item: any) => item.averageOrderAmount);
    const minValue = Math.min(...dataset);
    const maxValue = Math.max(...dataset);
    const lineData = props.averageOrderAndTrendData.map((item: any) => item.totalOrders / 10000);
    // 计算折线图的最大值
    const maxLineValue = Math.max(...lineData);
    const minLineValue = Math.min(...lineData);
    // 确保y轴的范围足够容纳折线图的最大值

    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      legend: {
        data: ['客单价', '订单量'],
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
        left: '65px',
        right: '65px',
        height: 'auto',
      },
      yAxis: [
        {
          type: 'value',
          min: Math.floor(minValue * 0.9), // 从最小值的 90% 开始（留出空白）
          max: Math.ceil(maxValue * 1.1), // 到最大值的 110% 结束
          name: '客单价（元）',
          // axisLabel: {
          //   axisLabel: {
          //     formatter(value) {
          //       const { value: amount, unit } = formatMoneyObj(value);
          //       return `${amount} ${unit}`;
          //     },
          //   },
          // },
          nameTextStyle: {
            fontSize: 12,
            fontWeight: 400,
            color: '#999',
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '999',
            }, // 隐藏y轴刻度线
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: 'red',
              type: 'dashed',
            },
          },
        },
        {
          type: 'value',
          name: '订单量（万）',
          min: Math.floor(minLineValue * 0.9),
          max: Math.ceil(maxLineValue * 1.1),
          // interval: 5,
          // axisLabel: {
          //   formatter: '{value}',
          // },
          nameTextStyle: {
            fontSize: 12,
            fontWeight: 400,
            color: '#999',
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '999',
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
        data: props.averageOrderAndTrendData.map((item: any) => item.month),
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
          name: '客单价',
          type: 'bar',
          barWidth: 19,
          data: dataset,
          itemStyle: {
            borderRadius: [4, 4, 0, 0],
            color: '#258DFF',
          },
          tooltip: {
            valueFormatter(value) {
              return `${value.toLocaleString('zh-CN', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })} 元`;
            },
          },
        },
        {
          name: '订单量',
          type: 'line',
          barWidth: 19,
          yAxisIndex: 1,
          data: props.averageOrderAndTrendData.map((item: any) => item.totalOrders / 10000),
          itemStyle: {
            borderRadius: [4, 4, 0, 0],
            color: '#02B96B',
          },
          tooltip: {
            valueFormatter(value) {
              return `${(value * 10000).toLocaleString('zh-CN', { maximumFractionDigits: 0 })}`;
            },
          },
        },
      ],
    };
    chart.setOption(option);
  };
  const init = () => {
    initEcharts(document.getElementById('averageOrderAndTrend') as HTMLElement);
  };
  watch(
    () => props.averageOrderAndTrendData,
    () => {
      init();
    }
  );
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
