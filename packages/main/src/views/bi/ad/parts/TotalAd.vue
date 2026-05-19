<template>
  <BiCard title="总销售与广告销量对比分析">
    <div class="point-section">
      <div class="point-card" v-for="item of list" :key="item.label">
        <div class="label">{{ item.label }}</div>
        <div class="content">
          <span class="value">{{ item.value }}</span>
          <span class="unit">{{ item.unit }}</span>
        </div>
        <div class="footer">
          <div class="footer-item" v-for="foot in item.footer" :key="foot.label">
            <span class="label">{{ foot.label }}</span>
            <svg
              :class="foot.value > 0 ? 'up' : 'down'"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M11.5221 8.76948C11.9747 9.28675 11.6074 10.0963 10.92 10.0963H4.80156C4.11423 10.0963 3.74689 9.28674 4.1995 8.76948L7.25874 5.2732C7.57747 4.90893 8.14414 4.90894 8.46286 5.2732L11.5221 8.76948Z"
                fill="currentColor"
              />
            </svg>
            <span class="value" :class="foot.value > 0 ? 'up' : 'down'">
              {{ foot.value ? formatRate(Math.abs(foot.value)) : '-' }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="chart-wrapper">
      <div>
        <div class="label">总订单量</div>
        <div class="chart-container" ref="totalChartRef"></div>
      </div>
      <div>
        <div class="label">总销售额</div>
        <div class="chart-container" ref="adChartRef"></div>
      </div>
    </div>
  </BiCard>
</template>

<script setup lang="ts">
  import BiCard from '@/views/bi/components/BiCard.vue';
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
  import dayjs from 'dayjs';
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
    total?: BiContracts.AdBaseMetricDO;
    // 详情数据
    trendList?: BiContracts.AdBaseMetricTrendDO[];
  }>();

  const list = computed(() => [
    {
      label: '总订单量',
      ...formatNumberObj(props.total?.totalOrderQty),
      footer: [
        { label: '环比', value: props.total?.totalOrderQtyMom },
        { label: '同比', value: props.total?.totalOrderQtyYoy },
      ],
    },
    {
      label: '广告订单量',
      ...formatNumberObj(props.total?.adOrderQty),
      footer: [
        { label: '环比', value: props.total?.adOrderQtyMom },
        { label: '同比', value: props.total?.adOrderQtyYoy },
      ],
    },
    {
      label: '广告订单占比',
      ...formatRate(props.total?.adOrderQtyProp, {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }),
      footer: [
        { label: '环比', value: props.total?.adOrderQtyPropMom },
        { label: '同比', value: props.total?.adOrderQtyPropYoy },
      ],
    },
    {
      label: '总销售额',
      ...formatNumberObj(props.total?.totalSalesAmount),
      footer: [
        { label: '环比', value: props.total?.totalSalesAmountMom },
        { label: '同比', value: props.total?.totalSalesAmountYoy },
      ],
    },
    {
      label: '广告销售额',
      ...formatNumberObj(props.total?.adSalesAmount),
      footer: [
        { label: '环比', value: props.total?.adSalesAmountMom },
        { label: '同比', value: props.total?.adSalesAmountYoy },
      ],
    },
    {
      label: '广告销售额占比',
      ...formatRate(props.total?.adSalesAmountProp, {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }),
      footer: [
        { label: '环比', value: props.total?.adSalesAmountPropMom },
        { label: '同比', value: props.total?.adSalesAmountPropYoy },
      ],
    },
  ]);
  const loading = inject('loading', ref(false));
  const commomOptions = computed(() => ({
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      formatter(params: any) {
        const { date: name } = params[0].data;
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
    color: ['#02B96B', '#FFBF1F', '#258DFF'],
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
      data: props.trendList?.map((item) => dayjs(item.date).format('MM-DD')),
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
  }));
  let totalChart: any = null;
  const totalOptions = [
    {
      label: '总订单量',
      value: 'totalOrderQty',
      isRate: false,
    },
    {
      label: '广告订单量',
      value: 'adOrderQty',
      isRate: false,
    },
    {
      label: '广告订单占比',
      value: 'adOrderQtyProp',
      isRate: true,
    },
  ];
  const initTotalEcharts = (el: HTMLElement) => {
    if (!totalChart) {
      totalChart = echarts.init(el);
      useResizeObserver(el, () => {
        totalChart?.resize();
      });
    }
    const option = {
      ...commomOptions.value,
      series: totalOptions.map((legend: any, index: number) => {
        const { isRate } = legend;
        return {
          id: index,
          name: legend.label,
          type: isRate ? 'line' : 'bar',
          stack: isRate ? undefined : 'total',
          yAxisIndex: isRate ? 1 : 0,
          data: props.trendList?.map((item) => {
            const val = (item as any)[legend.value];
            return {
              value: val,
              isRate,
              date: item.date,
            };
          }),
          barWidth: 15,
          itemStyle: {
            borderRadius: isRate || index === 0 ? 0 : [3, 3, 0, 0],
          },
        };
      }),
    };
    totalChart.setOption(option);
  };

  let adChart: any = null;
  const adOptions = [
    {
      label: '总销售额',
      value: 'totalSalesAmount',
      isRate: false,
    },
    {
      label: '广告销售额',
      value: 'adSalesAmount',
      isRate: false,
    },
    {
      label: '广告销售额占比',
      value: 'adSalesAmountProp',
      isRate: true,
    },
  ];
  const initAdEcharts = (el: HTMLElement) => {
    if (!adChart) {
      adChart = echarts.init(el);
      useResizeObserver(el, () => {
        adChart?.resize();
      });
    }
    const option = {
      ...commomOptions.value,
      series: adOptions.map((legend: any, index: number) => {
        const { isRate } = legend;
        return {
          id: index,
          name: legend.label,
          type: isRate ? 'line' : 'bar',
          stack: isRate ? undefined : 'total',
          yAxisIndex: isRate ? 1 : 0,
          data: props.trendList?.map((item) => {
            const val = (item as any)[legend.value];
            return {
              value: val,
              isRate,
              date: item.date,
            };
          }),
          barWidth: 15,
          itemStyle: {
            borderRadius: isRate || index === 0 ? 0 : [3, 3, 0, 0],
          },
        };
      }),
    };
    adChart.setOption(option);
  };
  const totalChartRef = useTemplateRef('totalChartRef');
  const adChartRef = useTemplateRef('adChartRef');

  const init = () => {
    initTotalEcharts(totalChartRef.value as HTMLElement);
    initAdEcharts(adChartRef.value as HTMLElement);
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
  .point-section {
    display: flex;
    gap: 8px;
    margin-bottom: 24px;
  }
  .point-card {
    flex: 1;
    border-radius: 10px;
    border: 1px solid var(---N3, #ededed);
    background: #fff;
    padding: 12px 16px;
    .label {
      color: var(---N8, #666);

      /* 常规/Regular 13 */
      font-family: 'PingFang SC';
      font-size: 13px;
      font-style: normal;
      font-weight: 400;
      line-height: 22px; /* 169.231% */
    }
    .content {
      display: flex;
      align-items: baseline;
      margin: 8px 0 16px 0;
      .value {
        color: #1f1f1f;

        /* 中等/Medium 20 */
        font-family: DIN;
        font-size: 24px;
        font-style: normal;
        font-weight: 700;
        line-height: 28px; /* 140% */
      }
      .unit {
        margin-left: 4px;
        color: #1f1f1f;

        /* 常规/Regular 13 */
        font-family: 'PingFang SC';
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 22px; /* 169.231% */
      }
    }
    .footer {
      display: flex;
      gap: 16px;
      color: var(---N6, #999);
      .footer-item {
        display: flex;
        align-items: center;
        column-gap: 2px;
        &:nth-child(1) {
          &::after {
            content: '';
            display: inline-block;
            width: 1px;
            height: 12px;
            background: #d9d9d9;
            margin-left: 8px;
            vertical-align: middle;
          }
        }
      }
      .label {
        color: var(---N8, #666);

        /* 较弱/Regular 12 */
        font-family: 'PingFang SC';
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px; /* 166.667% */
      }
      .down {
        color: var(---C4, #02b96b);
      }
      .up {
        color: var(---C5, #f44336);
      }
      .down:not(.value) {
        transform: rotate(180deg);
      }
    }
  }
  .chart-wrapper {
    display: flex;
    column-gap: 26px;
    & > div {
      width: 0;
      flex: 1;
    }
    .label {
      color: #000;

      /* 常规/Medium 14 */
      font-family: 'PingFang SC Medium';
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 22px; /* 157.143% */
      margin-bottom: 16px;
    }
  }
  .chart-container {
    width: 100%;
    height: 325px;
  }
</style>
