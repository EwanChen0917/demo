<template>
  <div class="sales-data" v-loading="loading">
    <div class="sales-data__title">独立站购买用户数和复购率</div>
    <div class="chart-container" ref="chartContainer">
      <div class="chart-area" id="trendAnalysis"></div>
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
  import { toThousands } from '@/utils/toThousands';

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
    trendAnalysis: BiContracts.BrandAnalysisTrendBean[];
  }>();
  const type = ref('fullChainInventoryTrend');
  const data = computed(() => {
    return props.trendAnalysis;
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
      legend: {
        data: ['购买人数', '复购率'],
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
          name: '购买人数',
          min: 0,
          max: data.value.length ? null : 100,
          axisLabel: {
            formatter(value) {
              return toThousands(value);
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
          name: '复购率',
          min: 0,
          max: data.value.length ? null : 100,
          nameTextStyle: {
            fontSize: 12,
            fontWeight: 400,
            color: '#999',
            align: 'center',
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '999',
            },
          },
          axisLabel: {
            formatter(value: number) {
              return value.toLocaleString('zh-CN', {
                style: 'percent',
                minimumFractionDigits: 0,
              });
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
          name: '购买人数',
          type: 'bar',
          barWidth: 19,
          data: data.value?.map((item) => item.count) || [],
          itemStyle: {
            borderRadius: [4, 4, 0, 0],
            color: '#02B96B',
          },
          tooltip: {
            valueFormatter(value) {
              return toThousands(value);
            },
          },
        },
        {
          name: '复购率',
          type: 'line',
          yAxisIndex: 1,
          data: data.value?.map((item) => (item.rate ? item.rate : null)) || [],
          label: {
            show: true,
            position: 'top',
            color: '#1f1f1f',
            fontFamily: 'DIN Blod, "PingFang SC", sans-serif',
            formatter: (params) => {
              return params.value
                ? params.value.toLocaleString('zh-CN', {
                    style: 'percent',
                    minimumFractionDigits: 2,
                  })
                : '-';
            },
          },
          itemStyle: {
            color: '#FF9F22',
          },
          tooltip: {
            valueFormatter(value) {
              return value
                ? value.toLocaleString('zh-CN', {
                    style: 'percent',
                    minimumFractionDigits: 2,
                  })
                : '-';
            },
          },
        },
      ],
    };
    chart.setOption(option);
  };
  const init = () => {
    initEcharts(document.getElementById('trendAnalysis') as HTMLElement);
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
