<template>
  <BiCard title="全产品整体趋势分析">
    <template v-if="searchParams.dateType === 'month'" #actions>
      <el-radio-group v-model="yearAccumulate" text-color="#fff" fill="#02b96b" @change="init">
        <el-radio-button label="月累" :value="false" />
        <el-radio-button label="年累" :value="true" />
      </el-radio-group>
    </template>
    <div class="chart-container" ref="chartWrapper"></div>
  </BiCard>
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
  import { useResizeObserver } from '@vueuse/core';

  import { type BiContracts } from '@/api';
  import BiCard from '../../components/BiCard.vue';
  import { formatNumberObj, formatRate } from '../../utils/utils';

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

  const props = defineProps<{
    // 详情数据
    trendList?: BiContracts.ProductManagerTrendDO[];
  }>();

  const searchParams = inject<BiContracts.CommonAnalysisReq>('searchParams')!;
  const yearAccumulate = ref<boolean>(false);
  const chartLegends = computed(() => {
    const isYear = searchParams.dateType === 'year';
    const isWeek = searchParams.dateType === 'week';
    const isYearAcc = yearAccumulate.value && !isWeek;
    let salesLabel = '销售额';
    let vocLabel = 'VOC率';
    let returnLabel = '退货率';
    let refundLabel = '退款率';
    if (isYearAcc || isYear) {
      salesLabel = '销售额（年累）';
      vocLabel = 'VOC率（年累）';
      returnLabel = '退货率（年累）';
      refundLabel = '退款率（年累）';
    } else if (isWeek) {
      salesLabel = '销售额';
      vocLabel = 'VOC率';
      returnLabel = '退货率';
      refundLabel = '退款率';
    } else {
      salesLabel = '销售额（月累）';
      vocLabel = 'VOC率（月累）';
      returnLabel = '退货率（月累）';
      refundLabel = '退款率（月累）';
    }
    return [
      {
        label: salesLabel,
        value: isYearAcc ? 'salesAmountCumulative' : 'salesAmount',
        isRate: false,
      },
      {
        label: vocLabel,
        value: isYearAcc ? 'cumulativeVocProp' : 'vocProp',
        isRate: true,
      },
      {
        label: returnLabel,
        value: isYearAcc ? 'returnRateCumulative' : 'returnRate',
        isRate: true,
      },
      {
        label: refundLabel,
        value: isYearAcc ? 'refundAmountRateCumulative' : 'refundAmountRate',
        isRate: true,
      },
    ];
  });

  let chart: any = null;
  const initEcharts = (el: HTMLElement) => {
    if (!chart) {
      chart = echarts.init(el);
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
          const content = params.reduce((html, p, idx) => {
            const { isRate } = p.data;
            const newHtml = `${html}<div style="display: flex; align-items: center;">
          <div style="background: ${
            p.color
          }; border-radius: 50%; width: 6px; height: 6px; margin-right: 8px;"></div>
          <div style="color: #666; font-size: 12px">${p.seriesName}</div>
          </div>
          <div style="font-family: DIN; color: #1f1f1f; text-align: right">${
            isRate ? `${formatRate(p.value)}` : formatNumberObj(p.value).toString()
          }</div>`;
            return newHtml;
          }, '');
          return `
        <div style="color: #666; font-size: 12px; margin-bottom: 6px">${name}</div>
        <div style="display: grid; grid-template-columns: repeat(2, auto); column-gap: 10px; row-gap: 3px">${content}</div>
        `;
        },
      },
      legend: {
        bottom: 0,
        textStyle: {
          fontSize: 12,
          color: '#999',
        },
        data: chartLegends.value.map((legend) => {
          return {
            name: legend.label,
            icon: legend.isRate
              ? 'path://M921.13851 0a511.743616 511.743616 0 0 1 511.743616 511.743616h409.394893v102.348724h-419.629765a511.845965 511.845965 0 0 1-1003.017489 0H0V511.743616h409.394893a511.743616 511.743616 0 0 1 511.743617-511.743616zM524.639556 614.09234a409.599591 409.599591 0 0 0 792.997908 0H1098.201801A204.492749 204.492749 0 0 1 744.075218 614.09234H524.741904zM921.13851 102.348723a409.394893 409.394893 0 0 0-409.394894 409.394893h204.697447a204.697447 204.697447 0 1 1 409.394893 0h204.697447a409.394893 409.394893 0 0 0-409.394893-409.394893z'
              : 'path://M282.537577 94.179192m188.358385 0l753.43354 0q188.358385 0 188.358385 188.358385l0 376.71677q0 188.358385-188.358385 188.358385l-753.43354 0q-188.358385 0-188.358385-188.358385l0-376.71677q0-188.358385 188.358385-188.358385Z',
          };
        }),
        itemWidth: 18,
        itemHeight: 10,
        itemGap: 26,
      },
      grid: {
        top: 10,
        left: 10,
        right: 10,
        bottom: 44,
        height: 'auto', // 根据数据长度动态设置高度
        containLabel: true,
      },
      color: ['#02B96B', '#258DFF', '#FF9F22', '#FF663E'],
      yAxis: [
        {
          type: 'value',
          name: '金额',
          alignTicks: true,
          axisLabel: {
            formatter(value) {
              const { value: amount, unit } = formatNumberObj(value);
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
            show: true,
            lineStyle: {
              color: '#E6E6E6',
              type: 'dashed',
            },
          },
        },
        {
          type: 'value',
          name: '百分比',
          axisLabel: {
            formatter(value) {
              return `${formatRate(value)}`;
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
              color: '999',
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
        data: props.trendList?.map((item) => item.period) || [],
        axisLabel: {
          show: true,
          color: '#999',
          fontSize: 11,
          fontFamily: 'PingFang SC',
        },
        axisLine: {
          show: true,
          onZero: false,
          lineStyle: {
            color: '#E6E6E6',
          },
        },
        axisTick: {
          show: true, // 隐藏x轴刻度线
          alignWithLabel: true,
          lineStyle: {
            color: '#E6E6E6',
          },
        },
        splitLine: {
          show: false, // 隐藏x轴分割线
        },
      },
      series: chartLegends.value.map((legend: any, index: number) => {
        const { isRate } = legend;
        return {
          id: index,
          name: legend.label,
          type: isRate ? 'line' : 'bar',
          yAxisIndex: isRate ? 1 : 0,
          data: props.trendList?.map((item) => {
            const val = (item as any)[legend.value];
            return {
              value: val,
              isRate,
            };
          }),
          symbol: 'circle',
          symbolSize: 7,
          showSymbol: false,
          barWidth: 21,
          itemStyle: isRate
            ? { borderColor: '#fff' }
            : {
                borderRadius: [5, 5, 0, 0],
              },
        };
      }),
    };
    chart.setOption(option, true);
  };
  const chartWrapperRef = useTemplateRef('chartWrapper');
  const init = () => {
    initEcharts(chartWrapperRef.value as HTMLElement);
  };
  watch(
    () => props.trendList,
    () => {
      nextTick(() => {
        init();
      });
    },
    {
      immediate: true,
    }
  );
</script>

<style scoped lang="scss">
  .chart-container {
    width: 100%;
    height: 260px;
  }
</style>
