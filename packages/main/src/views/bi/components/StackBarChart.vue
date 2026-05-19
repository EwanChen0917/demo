<template>
  <div ref="chartRef" class="trend-analysis-content"></div>
</template>

<script setup lang="ts">
  import { useResizeObserver } from '@vueuse/core';
  import { BarChart } from 'echarts/charts';
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
  import * as echarts from 'echarts/core';
  import { type BiContracts } from '@/api';
  import { formatRate, formatNumberObj } from '../utils/utils';

  echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    BarChart,
    LabelLayout,
    UniversalTransition,
    CanvasRenderer,
  ]);

  const props = defineProps<{
    data?: BiContracts.ProductManagerLevelDO;
    color: string[];
    type: 'voc' | 'return';
    periodType?: 'yearAccumulate' | 'monthAccumulate' | 'weekNaturalCompare' | 'launchCycleCompare';
    isSingleProduct?: boolean;
  }>();
  const emit = defineEmits<{
    (e: 'clickBar', data: any): void;
  }>();

  const searchParams = inject<any>('searchParams');

  const chartRef = useTemplateRef('chartRef');
  const chartData = computed(() => Object.values(props.data || {}));
  let chart: echarts.ECharts | null = null;
  const initEcharts = (el: HTMLElement) => {
    if (!chart) {
      chart = echarts.init(el);
      chart.on('click', 'series.bar', (params) => {
        emit('clickBar', params.data);
      });
      useResizeObserver(el, () => {
        chart?.resize();
      });
    }
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
        formatter(params: any) {
          const { name } = params[0];
          let total = 0;
          let totalProp = 0;
          const content = params.reduce((html, p, idx) => {
            const { level3 } = p.data;
            if (!level3) {
              return html;
            }
            let itemProp;
            // 注：整体VOC标签和单个VOC标签参数取值不同导致
            if ((props.isSingleProduct && props.periodType === 'yearAccumulate') || (!props.isSingleProduct && searchParams.dateType === 'month')) {
              itemProp = p.data.cumulativeProp;
            } else {
              itemProp = p.data.prop;
            }
            total += p.data.value;
            totalProp += itemProp;
            const newHtml = `${html}<div style="display: flex; align-items: center;">
          <div style="background: ${
            p.color
          }; border-radius: 50%; width: 6px; height: 6px; margin-right: 8px;"></div>
          <div style="color: #666; font-size: 12px">${level3}</div>
          </div>
          <div style="font-family: DIN; color: #1f1f1f; text-align: right">${formatNumberObj(
            p.value
          ).toString()} | ${formatRate(itemProp)}</div>`;
            return newHtml;
          }, '');
          return `
        <div style="color: #666; font-size: 12px; margin-bottom: 3px">${
          searchParams[searchParams.dateType]
        } ${name}</div>
        <div style="color: #000; font-size: 12px;">总计：${formatNumberObj(
          total
        ).toString()} | ${formatRate(totalProp)}</div>
        <div style="height: 1px; background: #f5f5f5; margin: 8px 0"></div>
        <div style="display: grid; grid-template-columns: repeat(2, auto); column-gap: 10px; row-gap: 3px">${content}</div>
        `;
        },
      },
      legend: {
        show: false,
      },
      grid: {
        top: 0,
        left: 6,
        right: 6,
        bottom: 6,
        height: 'auto', // 根据数据长度动态设置高度
        containLabel: true,
      },
      color: props.color,
      yAxis: [
        {
          type: 'category',
          name: '三级标签',
          data: Object.keys(props.data || {}),
          alignTicks: true,
          nameTextStyle: {
            fontSize: 12,
            fontWeight: 400,
            color: '#666',
            align: 'right',
          },
          axisLabel: {
            show: true,
            color: '#999',
            fontSize: 11,
            fontFamily: 'PingFang SC',
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#E6E6E6',
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
        type: 'value',
        axisLabel: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false, // 隐藏x轴分割线
        },
      },
      series: new Array(5).fill(0).map((_, index) => {
        return {
          id: index,
          name: index,
          type: 'bar',
          yAxisIndex: 0,
          stack: 'level3',
          data:
            chartData.value.map((item: any, idx: number) => {
              if (!item) {
                return 0;
              }
              let value;
              let prop;
              let cumulativeProp;
              if (props.periodType === 'monthAccumulate' || props.periodType === 'launchCycleCompare' || props.periodType === 'weekNaturalCompare') {
                value = props.type === 'voc' ? item[index]?.vocCount : item[index]?.returnQty;
              } else if (props.periodType === 'yearAccumulate') {
                value = props.type === 'voc' ? item[index]?.vocCountCumulative : item[index]?.returnQtyCumulative;
              } else {
                value = props.type === 'voc' ? item[index]?.vocCount : item[index]?.returnQty;
              }
              prop = props.type === 'voc' ? item[index]?.vocProp : item[index]?.returnRate;
              cumulativeProp = props.type === 'voc' ? item[index]?.cumulativeVocProp : item[index]?.returnRateCumulative;
              return {
                level3: item[index]?.level3,
                level2: item[index]?.level2,
                value,
                prop,
                cumulativeProp,
                itemStyle: {
                  borderRadius: item.length === index + 1 ? [0, 3, 3, 0] : [0, 0, 0, 0],
                },
                label: {
                  show: index < 2,
                  distance: 16,
                  position: 'insideLeft',
                  color: '#F7F7F7',
                  formatter(params: any) {
                    const { data } = params;
                    return `${data.level3} ${formatNumberObj(data.value).toString()}`;
                  },
                },
              };
            }) || [],
          barWidth: 20,
        };
      }),
    };
    chart.setOption(option, { replaceMerge: 'series' });
  };
  watch(
    [chartData, () => props.periodType],
    () => {
      nextTick(() => {
        initEcharts(chartRef.value!);
      });
    },
    { immediate: true }
  );
</script>

<style lang="scss" scoped>
  .trend-analysis-content {
    width: 100%;
    height: 444px;
  }
</style>
