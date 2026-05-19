<template>
  <div class="sales-data" v-loading="loading">
    <div class="sales-data__title">
      趋势分析
      <span class="operation">
        <el-radio-group v-model="type" @change="init">
          <el-radio-button value="salesAmountTrends">销售额</el-radio-button>
          <el-radio-button value="mainBusinessIncomeTrends">营业收入</el-radio-button>
          <el-radio-button value="grossProfitAmountTrends">毛利额</el-radio-button>
          <el-radio-button value="grossProfitRateTrends">毛利率</el-radio-button>
        </el-radio-group>
      </span>
    </div>
    <div class="chart-container" ref="chartContainer">
      <div class="chart-area" ref="trendAnalysis"></div>
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
    trendAnalysis: Omit<BiContracts.SalesAnalysisResp, 'analysisResults' | 'drillDownAnalysis'>;
    type: string;
  }>();
  const type = ref(props.type);
  const data = computed(() => {
    return props.trendAnalysis[type.value] || [];
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
      color: ['#02B96B', '#258DFF', '#FF9F22'],
      legend: {
        data:
          type.value === 'grossProfitRateTrends'
            ? ['目标值', '实际值', '差值']
            : ['目标值', '实际值', '目标达成率'],
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
          name: type.value === 'grossProfitRateTrends' ? '毛利率 (%)' : '金额',
          max: data.value.length ? null : 100,
          axisLabel: {
            formatter(value) {
              if (type.value === 'grossProfitRateTrends') {
                return (value * 1).toLocaleString('zh-CN', {
                  style: 'percent',
                  minimumFractionDigits: 1,
                  maximumFractionDigits: 1,
                });
              }
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
          name: type.value === 'grossProfitRateTrends' ? '差值' : '达成率(%)',
          nameTextStyle: {
            fontSize: 12,
            fontWeight: 400,
            color: '#999',
            align: 'center',
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
        data: data.value.map((item) => item.month),
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
          show: false, // 隐藏y轴刻度线
        },
        splitLine: {
          show: false, // 隐藏x轴分割线
        },
      },
      series: [
        {
          name: '目标值',
          type: 'bar',
          barWidth: 19,
          data: data.value.map((item) => item.budgetAmount) || [],
          itemStyle: {
            color: '#02B96B',
          },
          tooltip: {
            valueFormatter(value) {
              if (type.value === 'grossProfitRateTrends') {
                return value.toLocaleString('zh-CN', {
                  style: 'percent',
                  minimumFractionDigits: 1,
                  maximumFractionDigits: 1,
                });
              }
              const { value: amount, unit } = formatMoneyObj(value);
              return `${amount} ${unit}`;
            },
          },
        },
        {
          name: '实际值',
          type: 'bar',
          barWidth: 19,
          data: data.value.map((item) => item.actualAmount) || [],
          itemStyle: {
            color: '#258DFF',
          },
          tooltip: {
            valueFormatter(value) {
              if (type.value === 'grossProfitRateTrends') {
                return (
                  value?.toLocaleString('zh-CN', {
                    style: 'percent',
                    minimumFractionDigits: 1,
                    maximumFractionDigits: 1,
                  }) || '-'
                );
              }
              const { value: amount, unit } = formatMoneyObj(value);
              return `${amount} ${unit}`;
            },
          },
        },
        {
          name: type.value === 'grossProfitRateTrends' ? '差值' : '目标达成率',
          type: 'line',
          yAxisIndex: 1,
          data:
            data.value.map((item) => {
              if (type.value === 'grossProfitRateTrends') {
                return (item.completionRate * 100).toLocaleString('zh-CN', {
                  minimumFractionDigits: 1,
                  maximumFractionDigits: 1,
                }); // 转换为百分比
              }

              return (item.completionRate * 100).toLocaleString('zh-CN', {
                minimumFractionDigits: 1,
                maximumFractionDigits: 1,
              });
            }) || [],
          label: {
            show: true,
            position: 'top',
            color: '#1f1f1f',
            fontFamily: 'DIN Blod, "PingFang SC", sans-serif',
            formatter: (params) => {
              return `${params.value}%`;
            },
          },
          itemStyle: {
            color: '#FF9F22',
          },
          tooltip: {
            valueFormatter(value) {
              return `${value}%`;
            },
          },
        },
      ],
    };
    chart.setOption(option, { notMerge: true, lazyUpdate: true });
  };
  const trendAnalysisRef = useTemplateRef<HTMLElement>('trendAnalysis');
  const init = () => {
    trendAnalysisRef.value && initEcharts(trendAnalysisRef.value);
  };
  watch(
    data,
    (newData) => {
      loading.value = true;
      setTimeout(() => {
        loading.value = false;
      }, 500);
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
  const chartContainerRef = useTemplateRef<HTMLDivElement>('chartContainer');
  onMounted(() => {
    resizeObserver.observe(chartContainerRef.value as HTMLDivElement);
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
