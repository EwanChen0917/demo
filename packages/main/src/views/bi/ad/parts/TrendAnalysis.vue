<template>
  <BiCard title="趋势分析">
    <template #actions>
      <span class="operation">
        <el-select v-model="pointList.a" placeholder="选择指标">
          <el-option
            v-for="option in pointOptions1"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          />
        </el-select>
        <el-select v-model="pointList.b" placeholder="选择指标">
          <el-option
            v-for="option in pointOptions1"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          />
        </el-select>
        <el-select v-model="pointList.c" placeholder="选择指标">
          <el-option
            v-for="option in pointOptions1"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          />
        </el-select>
        <el-select v-model="pointList.d" placeholder="选择指标">
          <el-option
            v-for="option in pointOptions2"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          />
        </el-select>
        <el-select v-model="pointList.e" placeholder="选择指标">
          <el-option
            v-for="option in pointOptions2"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          />
        </el-select>
      </span>
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
  import { useReport } from '@/hooks/event/useReport';
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
    trendList?: BiContracts.AdBaseMetricTrendDO[];
  }>();

  const pointOptions1 = [
    { label: '广告花费', value: 'cost' },
    { label: '曝光量', value: 'impressions' },
    { label: '点击量', value: 'clicks' },
    { label: '广告总订单量', value: 'adOrderQty' },
    { label: '广告总销售额', value: 'adSalesAmount' },
    { label: '总订单量', value: 'totalOrderQty' },
    { label: '总销售额', value: 'totalSalesAmount' },
    { label: 'CPC', value: 'cpc' },
    { label: 'ROAS', value: 'roas' },
    { label: 'CPM', value: 'cpm' },
    { label: 'CPA', value: 'cpa' },
    { label: 'ATV', value: 'atv' },
  ];
  const pointOptions2 = [
    { label: 'ACOS', value: 'acos', isRate: true },
    { label: 'CTR', value: 'ctr', isRate: true },
    { label: 'CVR', value: 'cvr', isRate: true },
    { label: '广告订单占比', value: 'adOrderQtyProp', isRate: true },
    { label: '广告销售额占比', value: 'adSalesAmountProp', isRate: true },
    { label: '广告费比', value: 'costProp', isRate: true },
  ];
  const pointList = reactive<Record<string, string>>({
    a: 'cost',
    b: 'clicks',
    c: 'adOrderQty',
    d: 'acos',
    e: 'costProp',
  });
  const chartLegends = computed(() => {
    // pointList去重，根据pointList生成图例名称
    return Array.from(new Set(Object.values(pointList)))
      .filter((item) => item)
      .map((point) => {
        const option =
          pointOptions1.find((opt) => opt.value === point) ||
          pointOptions2.find((opt) => opt.value === point);
        return option;
      });
  });

  const loading = inject('loading', ref(false));
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
        itemWidth: 22,
        itemHeight: 12,
        itemGap: 20,
      },
      grid: {
        top: '10px',
        left: '1px',
        right: '1px',
        bottom: 37,
        height: 'auto', // 根据数据长度动态设置高度
        containLabel: true,
      },
      color: ['#02B96B', '#258DFF', '#0CC1E2', '#FF9F22', '#FF663E'],
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
              color: '999',
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
        data: props.trendList?.map((item) => item.date),
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
          barWidth: 9,
          itemStyle: {
            borderRadius: isRate ? 0 : [3, 3, 0, 0],
          },
        };
      }),
    };
    chart.setOption(option, { replaceMerge: 'series' });
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

  const { report } = useReport();
  watch(
    () => pointList,
    () => {
      report('TrendAnalysis', {
        ...pointList,
      });
      nextTick(() => {
        init();
      });
    },
    {
      deep: true,
    }
  );
  report('TrendAnalysis', {
    ...pointList,
  });
</script>

<style scoped lang="scss">
  .operation {
    margin-left: auto;
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #1f1f1f;
    .el-select {
      width: unset;
      min-width: 100px;
      &:focus-within {
        z-index: 1;
      }
      &:first-child {
        :deep(.el-select__wrapper) {
          border-radius: 6px 0 0 6px;
        }
      }
      &:last-child {
        :deep(.el-select__wrapper) {
          border-radius: 0 6px 6px 0;
        }
      }
      @for $i from 1 through 5 {
        &:nth-child(#{$i}) {
          transform: translateX(5px - $i);
        }
      }
    }
    :deep(.el-select__wrapper) {
      --el-border-color: #dedede;
      border-radius: 0;
    }
  }
  .chart-container {
    width: 100%;
    height: 325px;
  }
</style>
