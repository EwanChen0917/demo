<template>
  <div class="level-analysis">
    <div class="level-analysis__title">
      <span>标签分析 - VOC标签占比表现</span>
      <span
        class="back-btn"
        v-if="!!parentLevel"
        @click="
          () => {
            parentLevel = null;
            emit('back');
          }
        "
      >
        <i class="iconfont icon-jiantouxiangzuo"></i>
        返回
      </span>
    </div>
    <el-scrollbar
      :style="{ height: 'auto' }"
      :wrap-style="{
        overflowX: 'auto',
        overflowY: 'hidden',
        width: '100%',
        height: '275px',
      }"
      :view-style="{
        height: 'auto',
        overflow: 'hidden',
        minWidth: parentLevel ? `${40 * sonLabelLength}px` : 'auto',
      }"
    >
      <div class="chart-container" v-loading="toggleLoading">
        <div v-show="!parentLevel" ref="echartsRef" class="chart-area"></div>
        <div v-show="parentLevel" ref="sonEchartsRef" class="chart-area"></div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
  import { biApi, type BiContracts } from '@/api';
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

  const emit = defineEmits<{
    downhole: [name: string];
    back: [];
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
  const detailData = inject<Ref<BiContracts.VocAnalysisResp>>('dataDetail');

  const data = computed(() => {
    return detailData?.value.levelPropList || [];
  });
  let chart: any = null;
  watch(data, (newData) => {
    if (newData) {
      parentLevel.value = null;
      init();
    }
  });
  const initEcharts = (el: HTMLElement) => {
    if (!chart) {
      chart = echarts.init(el);
      useResizeObserver(el, () => {
        chart?.resize();
      });
      chart.on('click', 'series.bar', sonEcharts);
    }
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      legend: {
        data: ['VOC量', 'VOC标签累计占比'],
        bottom: '0',
        textStyle: {
          fontSize: 12,
          color: '#999',
        },
        itemWidth: 22,
        itemHeight: 12,
        itemGap: 20,
      },
      grid: {
        top: '40px',
        left: '1px',
        right: '1px',
        bottom: '38px',
        height: 'auto',
        containLabel: true,
      },
      yAxis: [
        {
          type: 'value',
          name: 'VOC量',
          nameTextStyle: {
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
          name: 'VOC标签累计占比',
          axisLabel: {
            formatter: '{value}%',
          },
          nameTextStyle: {
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
        data: data.value.map((item) => item.level1) || [],
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
          name: 'VOC量',
          type: 'bar',
          barWidth: 19,
          data: data.value.map((item) => item.vocCnt) || [],
          itemStyle: {
            borderRadius: [4, 4, 0, 0],
            color: '#02B96B',
          },
        },
        {
          name: 'VOC标签累计占比',
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
  onBeforeUnmount(() => {
    if (chart) {
      chart.dispose();
      chart = null;
    }
    if (sonChart) {
      sonChart.dispose();
      sonChart = null;
    }
  });
  const echartsRef = useTemplateRef('echartsRef');
  const init = () => {
    if (echartsRef.value) {
      initEcharts(echartsRef.value);
    }
  };
  const search = inject<Ref<BiContracts.VocAnalysisReq>>('search');

  const toggleLoading = ref(false);
  const parentLevel = ref<string | null>(null);
  const sonLabelLength = ref<number>(1);
  const sonEcharts = async (params) => {
    if (params.componentType === 'series' && params.seriesType === 'bar') {
      toggleLoading.value = true;
      setTimeout(() => {
        toggleLoading.value = false;
      }, 250);
      emit('downhole', params.name);
      // 获取子级数据
      const res = await biApi.biVocQueryVocLevel2Analysis({
        ...search!.value,
        level1: params.name,
        dimensionList: [
          {
            dimensionValue: params.name,
            dimension: 'level1',
          },
        ],
      });
      const level1 = res.levelPropList?.find(
        (l: BiContracts.LevelPropBean) => l.level1 === params.name
      ) || { level2ProportionList: [], vocCnt: 0 };
      const level2List = level1.level2ProportionList || [];
      sonLabelLength.value = level2List.length || 1;
      // 渲染子级图表
      nextTick(() => {
        parentLevel.value = params.name;
        renderSonEcharts(level2List);
      });
    }
  };

  let sonChart: echarts.ECharts | null = null;
  const sonEchartsRef = useTemplateRef('sonEchartsRef');
  const renderSonEcharts = (level2List: BiContracts.PeriodVocCntBean[]) => {
    if (!sonChart) {
      sonChart = echarts.init(sonEchartsRef.value!);
      useResizeObserver(sonEchartsRef, () => {
        sonChart?.resize();
      });
    }
    sonChart?.resize();
    sonChart?.setOption(getSonChartOption(level2List));
  };
  const getSonChartOption = (level2List: BiContracts.PeriodVocCntBean[]) => {
    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      legend: {
        data: ['VOC量', 'VOC标签累计占比'],
        bottom: '0',
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
        left: '15px',
        right: '15px',
        bottom: '38px',
        height: 'auto',
        containLabel: true,
      },
      yAxis: [
        {
          type: 'value',
          name: 'VOC量',
          axisLabel: {
            formatter(value) {
              return formatNumberToUnit(value);
            },
          },
          nameTextStyle: {
            fontSize: 12,
            fontWeight: 400,
            color: 'transparent',
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
          name: 'VOC标签累计占比',
          axisLabel: {
            formatter: '{value}%',
          },
          nameTextStyle: {
            fontSize: 12,
            fontWeight: 400,
            color: 'transparent',
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
        data: level2List.map((item) => item.level2) || [],
        axisLabel: {
          show: true,
          color: '#999',
          rotate: 30,
        },
        axisLine: {
          show: true, // 隐藏y轴刻度线
          lineStyle: {
            color: '#E6E6E6',
          },
        },
        axisTick: {
          show: true, // 隐藏x轴刻度线
        },
        splitLine: {
          show: false, // 隐藏x轴分割线
        },
      },
      series: [
        {
          name: 'VOC量',
          type: 'bar',
          barWidth: 19,
          data: level2List.map((item) => item.vocCnt) || [],
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
          name: 'VOC标签累计占比',
          type: 'line',
          yAxisIndex: 1,
          data: level2List.map((item) => (item.vocGrandTotalRate || 0) * 100) || [],
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
  };
</script>

<style scoped lang="scss">
  .level-analysis {
    border-radius: 0;
    padding: 24px;
    padding-bottom: 0;
    .level-analysis__title {
      font-family: 'PingFang SC Medium', sans-serif;
      font-size: 16px;
      font-weight: 500;
      color: #1f1f1f;
      display: flex;
      align-items: center;
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
        min-width: 980px;
        width: 100%;
        height: 275px;
      }
    }
  }
  .back-btn {
    margin-left: 12px;
    color: var(---N9, #1f1f1f);

    /* 较弱/Regular 12 */
    font-family: 'PingFang SC';
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 166.667% */
    display: flex;
    align-items: center;
    cursor: pointer;
    &:hover {
      color: #02b96b;
    }
    &::before {
      content: '';
      width: 1px;
      height: 12px;
      background: var(---N4, #dedede);
      margin-right: 8px;
    }
  }
</style>
