<template>
  <div class="sales-data" v-loading="loading">
    <div class="sales-data__title">
      品牌注册用户数
      <span class="operation">
        <el-radio-group v-model="type" @change="init">
          <el-radio-button value="last12MonthTrends">近12个月</el-radio-button>
          <el-radio-button value="yoyTrends">同比</el-radio-button>
        </el-radio-group>
      </span>
    </div>
    <div class="chart-container" ref="chartContainer">
      <div class="chart-area" ref="chartArea"></div>
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
  import { useResizeObserver } from '@vueuse/core';
  import { toThousands } from '@/utils/toThousands';
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
  const loading = ref(false);
  const props = defineProps<{
    trendAnalysis: {
      last12MonthTrends: BiContracts.BrandAnalysisTrendBean[];
      currentYearTrends: BiContracts.BrandAnalysisTrendBean[];
      lastYearTrends: BiContracts.BrandAnalysisTrendBean[];
    };
  }>();
  const type = ref('last12MonthTrends');
  let chart: any = null;
  const initEcharts = (el: HTMLElement) => {
    if (!chart) {
      chart = echarts.init(el);
    }
    const seriesMap = {
      last12MonthTrends: {
        xAxis: {
          type: 'category',
          data: props.trendAnalysis.last12MonthTrends.map((item) => item.month),
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
            name: '注册数量',
            type: 'line',
            data: props.trendAnalysis.last12MonthTrends.map((item) => item.count) || [],
            label: {
              show: true,
              position: 'top',
              color: '#1f1f1f',
              fontFamily: 'DIN Blod, "PingFang SC", sans-serif',
              formatter: (params) => {
                return toThousands(params.value);
              },
            },
            itemStyle: {
              color: '#258DFF',
            },
            tooltip: {
              valueFormatter(value) {
                return toThousands(value);
              },
            },
          },
        ],
      },
      yoyTrends: {
        xAxis: {
          type: 'category',
          data: props.trendAnalysis.lastYearTrends.map((item) => item.month),
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
            name: '去年',
            type: 'line',
            data: props.trendAnalysis.lastYearTrends.map((item) => item.count),
            label: {
              show: false,
              position: 'top',
              color: '#1f1f1f',
              fontFamily: 'DIN Blod, "PingFang SC", sans-serif',
            },
            itemStyle: {
              color: '#258DFF',
            },
            tooltip: {
              valueFormatter(value: number) {
                return toThousands(value);
              },
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(2, 185, 107, 0.06)',
                },
                {
                  offset: 1,
                  color: 'rgba(2, 185, 107, 0)',
                },
              ]),
            },
          },
          {
            name: '今年',
            type: 'line',
            data: props.trendAnalysis.currentYearTrends.map((item) => item.count),
            label: {
              show: false,
              position: 'top',
              color: '#1f1f1f',
              fontFamily: 'DIN Blod, "PingFang SC", sans-serif',
            },
            itemStyle: {
              color: '#02B96B',
            },
            tooltip: {
              valueFormatter(value: number) {
                return toThousands(value);
              },
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(37, 141, 255, 0.06)',
                },
                {
                  offset: 1,
                  color: 'rgba(37, 141, 255, 0)',
                },
              ]),
            },
          },
        ],
      },
    };
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      legend: {
        data: type.value === 'last12MonthTrends' ? ['注册数量'] : ['去年', '今年'],
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
        left: '24px',
        right: '20px',
        bottom: '60px',
        height: 'auto',
        containLabel: true,
      },
      yAxis: [
        {
          type: 'value',
          min: 0,
          max: props.trendAnalysis.last12MonthTrends.length ? null : 100,
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
            show: true,
            lineStyle: {
              color: '#E6E6E6',
              type: 'dashed',
            },
          },
        },
      ],
      ...seriesMap[type.value],
    };
    chart.setOption(option, { replaceMerge: ['series', 'xAxis'] });
  };
  const chartAreaRef = useTemplateRef<HTMLDivElement>('chartArea');
  const init = () => {
    initEcharts(chartAreaRef.value as HTMLElement);
  };
  watch(
    () => props.trendAnalysis,
    () => {
      // 给一个交互反馈
      loading.value = true;
      setTimeout(() => {
        loading.value = false;
      }, 500);
      nextTick(() => {
        init();
      });
    },
    {
      immediate: true,
    }
  );
  const chartContainerRef = useTemplateRef<HTMLDivElement>('chartContainer');
  useResizeObserver(chartContainerRef, (entries) => {
    entries.forEach((entry) => {
      if (chart) {
        chart.resize();
      }
    });
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
