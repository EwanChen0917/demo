<template>
  <div class="sales-data">
    <div class="sales-data__title">
      VOC占比走势
      <span class="operation">
        <el-radio-group v-model="type" @change="init">
          <el-radio-button value="last12MonthTrends">按月</el-radio-button>
          <el-radio-button value="last13WeekTrends">按周</el-radio-button>
          <el-radio-button value="last30DayTrends">按天</el-radio-button>
        </el-radio-group>
      </span>
    </div>
    <div class="chart-container">
      <el-scrollbar
        ref="scrollbarRef"
        :style="{ height: 'auto' }"
        :wrap-style="{
          overflowX: 'auto',
          overflowY: 'hidden',
          width: '100%',
          height: 'auto',
        }"
        :view-style="{
          minWidth: `${itemLength * 75}px`,
          width: '100%',
          height: 'auto',
          overflow: 'hidden',
        }"
      >
        <div ref="echartsRef" class="chart-area"></div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useTemplateRef } from 'vue';
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
  import { useResizeObserver } from '@vueuse/core';
  import { formatNumberToUnit } from '@/utils/formatNumberToUnit';
  import { formatMoneyObj, formatPercent } from '../utils';

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
  const type = ref('last12MonthTrends');
  const detailData = inject('dataDetail');
  const scrollbarRef = useTemplateRef('scrollbarRef');

  const data = computed(() => {
    const chartData = detailData.value?.trendAnalysis?.[type.value] || [];
    return chartData || [];
  });
  const itemLength = computed(() => {
    return data.value.length;
  });
  let chart: any = null;
  watch([data, type], (newData) => {
    if (newData) {
      init();
      if (scrollbarRef.value) {
        scrollbarRef.value.setScrollLeft(0);
        nextTick(() => {
          scrollbarRef.value.setScrollLeft(1000);
        });
      }
    }
  });
  const xMap = {
    last12MonthTrends: 'month',
    last13WeekTrends: 'week',
    last30DayTrends: 'date',
  };
  const initEcharts = (el: HTMLElement) => {
    if (!chart) {
      chart = echarts.init(el);
      useResizeObserver(el, () => {
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
        data: ['销量', 'VOC量', 'VOC占比率', '累计VOC占比率'],
        bottom: '0',
        textStyle: {
          fontSize: 12,
          color: '#999',
        },
        itemWidth: 18,
        itemHeight: 10,
        itemGap: 20,
      },
      grid: {
        top: '10px',
        left: '0',
        right: '0',
        bottom: '38px',
        height: 'auto',
        containLabel: true,
      },
      yAxis: [
        {
          type: 'value',
          name: 'VOC量&销量',
          axisLabel: {
            formatter(value) {
              return formatNumberToUnit(value);
            },
          },
          nameTextStyle: {
            show: false,
            fontSize: 12,
            fontWeight: 400,
            color: 'transparent',
            align: 'center',
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
              color: 'red',
              type: 'dashed',
            },
          },
        },
        {
          type: 'value',
          name: 'VOC占比率&累计VOC占比率',
          axisLabel: {
            formatter: '{value}%',
          },
          nameTextStyle: {
            show: false,
            fontSize: 12,
            fontWeight: 400,
            color: 'transparent',
            align: 'right',
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
        data: data.value.map((item) => item[xMap[type.value]]) || [],
        axisLabel: {
          show: true,
          color: '#999',
        },
        axisLine: {
          show: true, // 隐藏y轴刻度线
          lineStyle: {
            color: '#E6E6E6',
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
          name: '销量',
          type: 'bar',
          barWidth: 19,
          data: data.value.map((item) => item.salesQty) || [],
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
          name: 'VOC量',
          type: 'bar',
          barWidth: 19,
          data: data.value.map((item) => item.vocCnt) || [],
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
          name: 'VOC占比率',
          type: 'line',
          yAxisIndex: 1,
          data: data.value.map((item) => (item.vocRate || 0) * 100) || [],
          itemStyle: {
            color: '#0CC1E2',
          },
          tooltip: {
            valueFormatter(value) {
              return `${formatPercent(value / 100)}%`;
            },
          },
        },
        {
          name: '累计VOC占比率',
          type: 'line',
          yAxisIndex: 1,
          data: data.value.map((item) => (item.vocGrandTotalRate || 0) * 100) || [],
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
  const echartsRef = useTemplateRef('echartsRef');
  const init = () => {
    if (echartsRef.value) {
      initEcharts(echartsRef.value);
    }
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
      display: flex;
      align-items: center;
      margin-bottom: 25px;
      &::before {
        content: '';
        display: inline-block;
        width: 3px;
        height: 14px;
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
      overflow: hidden;
      .chart-area {
        width: 100%;
        height: 254px;
      }
    }
  }
  .sale-line {
    float: right;
  }
</style>
