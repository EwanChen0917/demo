<template>
  <div class="review-analysis" v-loading="loading">
    <div class="chart-container">
      <div class="sales-data__title">Review 异常分析</div>
      <div class="chart-area" ref="salesGrossProfitTrend"></div>
    </div>
    <div class="table-container">
      <div class="sales-data__subtitle">异常列表</div>
      <vxe-grid ref="gridRef" v-bind="gridOptions" :data="dataList">
        <template #spuName="{ row }">
          <div class="d-flex items-center">
            <img class="spu-img" :src="row.spuImg" alt="产品图片" />
            <div>{{ row.spuName }}</div>
          </div>
        </template>
        <template #score="{ row, column }">
          <span>
            {{
              Intl.NumberFormat('zh-CN', {
                minimumFractionDigits: 1,
                maximumFractionDigits: 1,
              }).format(row[column.field])
            }}分
          </span>
        </template>
        <template #percent="{ row, column }">
          <span>
            {{
              Intl.NumberFormat('zh-CN', {
                style: 'percent',
                minimumFractionDigits: 1,
                maximumFractionDigits: 1,
              }).format(row[column.field])
            }}
          </span>
        </template>
      </vxe-grid>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useTemplateRef, type Reactive } from 'vue';
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
  import { biApi, BiContracts } from '@/api';
  import { formatMoneyObj, formatPercent } from '../../utils/utils';

  const props = defineProps<{
    searchParams: BiContracts.CommonAnalysisReq;
  }>();
  const emit = defineEmits<{
    'update:reviewUnusualDataList': [BiContracts.ReviewUnusualDataBean[]];
  }>();
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
  const detailData = inject<Reactive<any>>('detailData', {});
  const dataList = computed({
    get: () => {
      return detailData.reviewUnusual?.reviewUnusualDataList || [];
    },
    set: (val) => {
      emit('update:reviewUnusualDataList', val);
    },
  });
  const gridOptions = reactive({
    border: false,
    showOverflow: true,
    height: 325,
    virtualYConfig: {
      enabled: true,
      gt: 2,
    },
    cellConfig: {
      height: 48,
    },
    columns: [
      {
        field: 'spuName',
        title: 'SPU名称',
        slots: { default: 'spuName' },
      },
      {
        field: 'modelName',
        title: '产品型号',
        align: 'right',
      },
      {
        field: 'date',
        title: '周期',
        align: 'right',
      },
      {
        field: 'score',
        title: '评分',
        slots: { default: 'score' },
        align: 'right',
      },
      {
        field: 'benchmarkScore',
        title: '标杆评分',
        align: 'right',
        slots: { default: 'score' },
      },
      {
        field: 'top3AvgScore',
        title: 'Top3 平均评分',
        align: 'right',
        slots: { default: 'score' },
      },
    ],
  });
  const data = computed(() => {
    return detailData.reviewUnusual?.reviewUnusualTrendList || [];
  });
  const handleEchartsClick = async (params: any) => {
    const { name } = params;
    const { dateType } = props.searchParams;
    const search = {};
    if (dateType === 'month') {
      search.startMonth = name;
      search.endMonth = name;
    } else if (dateType === 'week') {
      search.startWeek = name;
      search.endWeek = name;
    } else if (dateType === 'year') {
      search.startYear = name;
      search.endYear = name;
    }
    // 触发表格数据更新
    const res = await biApi.biDeveloperQueryReviewUnusual({
      ...props.searchParams,
      ...search,
    });
    dataList.value = res.reviewUnusual!.reviewUnusualDataList;
  };
  let chart: any = null;
  const initEcharts = (el: HTMLElement) => {
    if (!chart) {
      chart = echarts.init(el);
      chart.on('click', 'series.line', handleEchartsClick);
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
      },
      legend: {
        show: false,
        data: ['review'],
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
        bottom: 0,
        height: 'auto', // 根据数据长度动态设置高度
        containLabel: true,
      },
      yAxis: [
        {
          type: 'value',
          name: '金额',
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
      ],
      xAxis: {
        type: 'category',
        data: data.value.map((item) => item.date),
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
      series: [
        {
          name: 'review',
          type: 'line',
          data: data.value.map((item) => item.count || 0 || []),
          itemStyle: {
            color: '#FF9F22',
          },
          tooltip: {
            valueFormatter(value) {
              return value;
            },
          },
        },
      ],
    };
    chart.setOption(option);
  };
  const salesGrossProfitTrendRef = useTemplateRef('salesGrossProfitTrend');
  const init = () => {
    initEcharts(salesGrossProfitTrendRef.value as HTMLElement);
  };
  watch(
    () => data.value,
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

<style lang="scss" scoped>
  .review-analysis {
    background: #fff;
    border-radius: 10px;
    padding: 24px;
    display: flex;
    column-gap: 36px;
    .chart-container {
      width: 50%;
    }
    .table-container {
      width: 50%;
    }
    .sales-data__title {
      margin-bottom: 24px;
      font-family: 'PingFang SC Medium', sans-serif;
      font-size: 16px;
      font-weight: 500;
      color: #1f1f1f;
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
    }
    .sales-data__subtitle {
      margin-bottom: 24px;
      color: var(---N9, #1f1f1f);

      /* 常规/Medium 14 */
      font-family: 'PingFang SC';
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 22px; /* 157.143% */
    }
  }
  .chart-area {
    width: 100%;
    height: 325px;
  }
  .table-container {
    width: 100%;
  }
  .spu-img {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    object-fit: contain;
    margin-right: 12px;
  }
</style>
