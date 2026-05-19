<template>
  <BiCard title="占比分析">
    <template #actions>
      <span class="operation">
        <el-radio-group v-model="type">
          <el-radio-button value="gtmProductLinePropList">GTM品线</el-radio-button>
          <el-radio-button value="countryPropList">国家</el-radio-button>
          <el-radio-button value="brandPropList">品牌</el-radio-button>
          <el-radio-button value="adsTypePropList">广告类型</el-radio-button>
        </el-radio-group>
      </span>
    </template>
    <div class="chart-area" ref="chartRef"></div>
  </BiCard>
</template>

<script setup lang="ts">
  import * as echarts from 'echarts/core';
  import { TreemapChart } from 'echarts/charts';
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
  import { type BiContracts } from '@/api';
  import { useResizeObserver } from '@vueuse/core';
  import BiCard from '@/views/bi/components/BiCard.vue';
  import { formatNumberObj, formatRate } from '../../utils/utils';

  echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    TreemapChart,
    LabelLayout,
    UniversalTransition,
    CanvasRenderer,
  ]);
  const props = defineProps<{
    countryPropList?: BiContracts.AdDetailDO[];
    gtmProductLinePropList?: BiContracts.AdDetailDO[];
    brandPropList?: BiContracts.AdDetailDO[];
    adsTypePropList?: BiContracts.AdDetailDO[];
  }>();
  const type = ref<string>('gtmProductLinePropList');
  const color = [
    ['#FFFAF3', '#FF9F22'],
    ['#F2F9FF', '#258DFF'],
    ['#EFF9F6', '#02B96B'],
    ['#FCF9FF', '#A55BF5'],
  ];
  const nameMap: Record<string, string> = {
    countryPropList: 'countryName',
    gtmProductLinePropList: 'gtmProductLine',
    brandPropList: 'brand',
    adsTypePropList: 'adsType',
  };
  const treemapData = computed(() => {
    return props[type.value]?.map((item, index) => {
      return {
        value: item.cost,
        name: item[nameMap[type.value]],
        itemStyle: {
          color: color[index % color.length][0],
        },
        emphasis: {
          itemStyle: {
            color: color[index % color.length][0],
            borderColor: color[index % color.length][1],
          },
        },
        ext: {
          costProp: item.costProp,
          adSalesAmount: item.adSalesAmount,
          adSalesAmountProp: item.adSalesAmountProp,
          roas: item.roas,
        },
      };
    });
  });
  let chart: any = null;

  const initEcharts = (el: HTMLElement) => {
    if (!chart) {
      chart = echarts.init(el);
      useResizeObserver(el, () => {
        chart.resize();
      });
    }
    const option = {
      tooltip: {
        trigger: 'item',
        lineStyle: {
          type: 'dashed',
          width: 1,
        },
        formatter: (params: any) => {
          const data = params.data?.ext || {};
          return `
          <div style="color: #1F1F1F; font-size: 12px;">${params.name}</div>
          <div style="display: flex; justify-content: space-between; font-size: 12px; margin-top: 4px;">
            <span style="color: #666; font-size: 12px;">广告花费：</span>
            <span style="color: #1F1F1F; font-size: 12px;">${formatNumberObj(
              params.value
            ).toString()}</span>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 12px; margin-top: 4px;">
            <span style="color: #666; font-size: 12px;">占比：</span>
            <span style="color: #1F1F1F; font-size: 12px;">${formatRate(data.costProp)}</span>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 12px; margin-top: 4px;">
            <span style="color: #666; font-size: 12px;">广告销售额：</span>
            <span style="color: #1F1F1F; font-size: 12px;">${formatNumberObj(
              data.adSalesAmount
            ).toString()}</span>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 12px; margin-top: 4px;">
            <span style="color: #666; font-size: 12px;">占比：</span>
            <span style="color: #1F1F1F; font-size: 12px;">${formatRate(
              data.adSalesAmountProp
            )}</span>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 12px; margin-top: 4px;">
            <span style="color: #666; font-size: 12px;">ROAS：</span>
            <span style="color: #1F1F1F; font-size: 12px;">${formatNumberObj(
              data.roas
            ).toString()}</span>
          </div>
          `;
        },
      },

      grid: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        height: 'auto',
        containLabel: true,
      },
      series: [
        {
          type: 'treemap',
          data: treemapData.value || [],
          width: '100%',
          height: '100%',
          nodeClick: false, // 点击无反应
          roam: false, // 禁止缩放
          label: {
            padding: [10, 12],
            formatter(a) {
              const propDom =
                a.data.ext.costProp > 0
                  ? `{d|+${formatRate(a.data.ext.costProp)}}`
                  : `{e|${formatRate(a.data.ext.costProp)}}`;
              const adSalesAmountDom =
                a.data.ext.adSalesAmountProp > 0
                  ? `{d|+${formatRate(a.data.ext.adSalesAmountProp)}}`
                  : `{e|${formatRate(a.data.ext.adSalesAmountProp)}}`;
              return `{a|${a.name}}\n{b|广告花费: ${formatNumberObj(
                a.data.value
              ).toString()}}\n{c|占比:}${propDom}\n{b|广告销售额: ${formatNumberObj(
                a.data.ext.adSalesAmount
              ).toString()}}\n{c|占比:}${adSalesAmountDom}\n{b|ROAS: ${formatNumberObj(
                a.data.ext.roas
              ).toString()}}`;
            },
            rich: {
              a: {
                fontSize: 13,
                color: '#1F1F1F',
                fontWeight: 600,
                lineHeight: 20,
                padding: [0, 0, 6, 0],
              },
              b: {
                fontSize: 12,
                color: '#1f1f1f',
                lineHeight: 20,
                padding: [0, 0, 6, 0],
              },
              c: {
                fontSize: 12,
                color: '#1F1F1F',
                padding: [0, 0, 10, 0],
              },
              d: {
                fontSize: 12,
                color: '#F53F3F',
                padding: [0, 0, 10, 0],
              },
              e: {
                fontSize: 12,
                color: '#02B96B',
                padding: [0, 0, 10, 0],
              },
            },
          },
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 2,
            borderRadius: 4,
          },
          breadcrumb: {
            show: false,
          },
        },
      ],
    };
    chart.setOption(option);
  };
  const chartRef = ref<HTMLElement | null>();
  const init = () => {
    initEcharts(chartRef.value!);
  };
  watch(treemapData, () => {
    if (treemapData.value) {
      nextTick(() => {
        init();
      });
    }
  });
</script>

<style scoped lang="scss">
  .operation {
    margin-left: auto;
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #1f1f1f;
  }
  .chart-area {
    width: 100%;
    height: 325px;
  }
</style>
