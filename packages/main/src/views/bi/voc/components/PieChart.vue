<template>
  <div class="pie-chart-section">
    <div class="pie-chart" ref="pieChartRef"></div>

    <div class="pie-title">
      <div class="pie-title-text">{{ currentData.label }}</div>
      <div>
        <span class="pie-title-value">{{ currentData.value.value }}</span>
        <span class="pie-title-unit">{{ currentData.value.unit }}</span>
      </div>
    </div>
  </div>
  <div class="pie-legend-wrapper">
    <div
      class="pie-legend"
      v-for="(item, idx) in props.data"
      :key="item.vocType"
      @click.stop="
        handlePieClick({
          componentType: 'series',
          seriesType: 'pie',
          dataIndex: idx,
          name: item.vocType,
          data: {
            value: item.count,
            name: item.vocType,
          },
        })
      "
    >
      <div class="icon" :style="{ backgroundColor: pieColorList[idx] }"></div>
      <div class="label">{{ item.vocType }}&nbsp;&nbsp;</div>
      <div class="count">
        {{ formatNumberObj(item.count) }} |
        {{ formatRate(item.proportion, { maximumFractionDigits: 2 }) }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import * as echarts from 'echarts';
  import { useResizeObserver } from '@vueuse/core';
  import { formatNumberObj, formatRate } from '../../utils/utils';

  const props = defineProps<{
    isDialog?: boolean;
    clickMaxLevel?: number[];
    tagLevel?: number;
    data?: {
      vocType: string;
      count: number;
      proportion: number;
    }[];
  }>();
  const emit = defineEmits<{
    clickPie: [payload: { vocType?: string }];
  }>();

  watch(
    () => props.clickMaxLevel?.length,
    () => {
      const maxLevel = Math.max(...(props.clickMaxLevel || []));
      // 重置当前高亮索引
      if (maxLevel && maxLevel > props.tagLevel!) {
        // 不可点击
        pieChart?.setOption({
          series: [
            {
              name: 'VOC来源',
              silent: true,
            },
          ],
        });
      } else {
        // 可点击
        pieChart?.setOption({
          series: [
            {
              name: 'VOC来源',
              silent: false,
            },
          ],
        });
      }
    }
  );

  const currentData = ref<{
    label: string;
    value: { value: string; unit: string; [key: string]: any };
  }>({
    label: 'VOC量',
    value: formatNumberObj(
      props.data?.reduce((acc, item) => {
        acc += item.count;
        return acc;
      }, 0)
    ),
  });
  watch(
    () => props.data,
    () => {
      if (currentHighlightLabel !== null) {
        pieChart?.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          name: currentHighlightLabel,
        });
        currentHighlightLabel = null;
      }
      if (props.data?.length) {
        currentData.value = {
          label: 'VOC量',
          value: formatNumberObj(
            props.data.reduce((acc, item) => {
              acc += item.count;
              return acc;
            }, 0)
          ),
        };
      } else {
        currentData.value = {
          label: 'VOC量',
          value: formatNumberObj(0),
        };
      }
    }
  );

  const pieChartRef = useTemplateRef<HTMLDivElement>('pieChartRef');
  let pieChart: echarts.ECharts | null = null;
  let currentHighlightLabel: string | null = null;
  const pieColorList = ['#02B96B', '#258DFF', '#0CC1E2', '#FF9F22'];
  const initPieChart = () => {
    if (!pieChartRef.value) return;
    if (!pieChart) {
      pieChart = echarts.init(pieChartRef.value);
      pieChart.on('click', 'series.pie', handlePieClick);
      useResizeObserver(pieChartRef, () => {
        pieChart!.resize();
      });
    }
    const option = {
      tooltip: {
        trigger: 'item',
      },
      // 2. 调整图表主体区域（为图例留出空间）
      grid: {
        right: 0,
        left: 0,
        bottom: 0,
        containLabel: true,
      },
      color: pieColorList,
      legend: {
        show: false,
        selectedMode: false,
        bottom: 0, // 距离右侧容器的距离（单位px或百分比）
        left: 'left', // 垂直居中
        align: 'left', // 图例文本左对齐
        icon: 'circle',
        itemWidth: 8,
        itemHeight: 8,
        borderRadius: 8,
        textStyle: {
          fontSize: 12,
          color: '#999',
          rich: {
            a: {
              color: '#999',
            },
            b: {
              color: '#1F1F1F',
            },
          },
        },
        formatter: (name: string) => {
          const item = props.data?.find((i) => i.vocType === name);
          if (!item) return name;
          return `{a|${name}}  {b|${formatNumberObj(item.count)} | ${item.proportion?.toFixed(
            2
          )}%}`;
        },
        itemGap: 10,
      },
      series: [
        {
          name: 'VOC来源',
          type: 'pie',
          center: ['50%', '50%'],
          radius: ['65%', '90%'],
          itemStyle: {
            // borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2,
          },
          emphasis: {
            focus: 'series',
            label: {
              show: false,
              fontSize: 20,
              fontWeight: 'bold',
            },
          },
          label: {
            show: false,
            formatter: '{name|{c}%}\n{name|{b}}',
            minMargin: 5,
            edgeDistance: 10,
            lineHeight: 15,
            rich: {
              name: {
                fontSize: 12,
                color: '#1f1f1f',
                lineHeight: 20,
              },
            },
          },
          data:
            props.data?.map((item) => ({
              value: item.count,
              name: item.vocType,
            })) || [],
        },
      ],
    };
    pieChart.setOption(option);
  };
  onMounted(() => {
    // 还要再套一层，确保dom渲染完成
    nextTick(() => {
      props.data && initPieChart();
    });
  });
  watch(
    () => props.data,
    () => {
      nextTick(() => {
        initPieChart();
      });
    }
  );

  const handlePieClick = (params) => {
    if (params.componentType === 'series' && params.seriesType === 'pie') {
      if (currentHighlightLabel !== null) {
        pieChart?.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          name: currentHighlightLabel,
        });
      }
      if (currentHighlightLabel === params.name) {
        currentHighlightLabel = null;
        currentData.value = {
          label: 'VOC量',
          value: formatNumberObj(
            props.data?.reduce((acc, item) => {
              acc += item.count;
              return acc;
            }, 0)
          ),
        };
        if (props.isDialog) return;
        emit('clickPie', { vocType: undefined });
      } else {
        pieChart?.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          name: params.name,
        });
        currentData.value = {
          label: 'VOC量' || params.name,
          value: formatNumberObj(params.data.value),
        };
        currentHighlightLabel = params.name;
        if (props.isDialog) return;
        emit('clickPie', { vocType: params.name });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .pie-chart-section {
    position: relative;
    width: 210px;
    height: 210px;
    margin: 0 auto;
    .pie-title {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      cursor: pointer;
      .pie-title-text {
        color: var(---N8, var(---N8, #666));

        /* 13/CN-Regular */
        font-family: 'PingFang SC';
        font-size: 13px;
        font-style: normal;
        font-weight: 400;
        line-height: 22px; /* 169.231% */
      }
      .pie-title-value {
        color: var(---N9, var(---N9, #1f1f1f));
        font-family: DIN;
        font-size: 20px;
        font-style: normal;
        font-weight: 700;
        line-height: 28px; /* 140% */
      }
      .pie-title-unit {
        font-size: 12px;
        color: var(---N7, #595959);
        margin-left: 2px;
      }
    }
  }
  .pie-chart {
    width: 210px;
    height: 210px;
  }
  .pie-legend-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 10px;
    gap: 8px;
    .pie-legend {
      display: flex;
      align-items: center;
      cursor: pointer;
      .icon {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        margin-right: 8px;
      }
      .label {
        color: var(---N6, #999);

        /* 较弱/Regular 12 */
        font-family: 'PingFang SC';
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px; /* 166.667% */
      }
      .count {
        color: var(---N9, #1f1f1f);

        /* 较弱/Regular 12 */
        font-family: 'PingFang SC';
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px;
      }
    }
  }
</style>
