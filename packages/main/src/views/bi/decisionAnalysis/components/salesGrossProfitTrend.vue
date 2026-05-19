<template>
  <div class="sales-data" v-loading="loading">
    <div class="sales-data__title">
      销售额&毛利额趋势
      <span class="operation">
        <el-radio-group v-model="type" @change="init">
          <el-radio-button value="last12MonthTrends">近12个月</el-radio-button>
          <el-radio-button value="currentYearTrends">本年度</el-radio-button>
          <el-radio-button value="lastYearTrends">上年度</el-radio-button>
        </el-radio-group>
      </span>
    </div>
    <div class="chart-container">
      <div class="chart-area" id="salesGrossProfitTrend"></div>
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
  import { formatMoneyObj, formatPercent } from '../../utils/utils';

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
    timeType: {
      type: String,
      default: 'last12MonthTrends',
    },
  });
  const type = computed({
    get: () => props.timeType,
    set: (value) => {
      emit('update:timeType', value);
    },
  });
  const emit = defineEmits(['update:timeType']);
  const detailData = inject('detailData', ref<any>({}));
  const data = computed(() => {
    return detailData.value.trendAnalysis?.salesTrend[type.value] || [];
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
        data: ['销售额', '毛利额', '毛利率'],
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
        left: '85px',
        right: '85px',
        height: 'auto',
      },
      yAxis: [
        {
          type: 'value',
          name: '金额',
          axisLabel: {
            formatter(value) {
              const { value: amount, unit } = formatMoneyObj(value);
              return `${amount} ${unit}`;
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
          name: '百分比',
          max: Math.max(50, ...data.value.map((item) => Math.ceil(item.grossProfitRate * 120))),
          axisLabel: {
            formatter: '{value}%',
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
        data: data.value.map((item) => item.month),
        axisLabel: {
          show: true,
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
          name: '销售额',
          type: 'bar',
          barWidth: 19,
          data: data.value.map((item) => item.salesAmount) || [],
          itemStyle: {
            borderRadius: [4, 4, 0, 0],
            color: '#02B96B',
          },
          tooltip: {
            valueFormatter(value) {
              const { value: amount, unit } = formatMoneyObj(value);
              return `${amount} ${unit}`;
            },
          },
        },
        {
          name: '毛利额',
          type: 'bar',
          barWidth: 19,
          data: data.value.map((item) => item.grossProfitAmount) || [],
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
          name: '毛利率',
          type: 'line',
          yAxisIndex: 1,
          data: data.value.map((item) => (item.grossProfitRate || 0) * 100) || [],
          itemStyle: {
            color: '#FF9F22',
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
    initEcharts(document.getElementById('salesGrossProfitTrend') as HTMLElement);
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
        height: 325px;
      }
    }
  }
</style>
