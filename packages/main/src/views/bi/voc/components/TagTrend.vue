<template>
  <ChartCard :isFullscreen="false" title="标签趋势分析" @mode-change="handleModeChange">
    <template #chart>
      <div class="trend-chart" ref="trendChartRef"></div>
    </template>
    <template #table>
      <vxe-grid size="small" :columns="columns" :data="trendTableData" :round="true">
        <template #actions="{ row }">
          <span class="btn-skip" @click="handleSkipDetail(row)">下钻详情</span>
        </template>
      </vxe-grid>
    </template>
  </ChartCard>
</template>

<script lang="ts" setup>
  import * as echarts from 'echarts';
  import { BiContracts } from '@/api';
  import { useResizeObserver } from '@vueuse/core';
  import ChartCard from '../../components/ChartCard.vue';
  import { formatNumberObj, generateXAxis, generateYAxis } from '../../utils/utils';

  const props = defineProps<{
    isDialog?: boolean;
    data: BiContracts.ProductManagerLevelTrendVO;
  }>();

  const emit = defineEmits<{
    (e: 'skipParticulars', tagName: string): void;
  }>();

  const showDataFlat = inject('showDataFlat') as Ref<boolean>;
  watch(
    () => showDataFlat.value,
    () => {
      if (trendChart) {
        trendChart.setOption({
          series: chartData.map((series) => ({
            name: series.name,
            data:
              series.data.map((item) => ({
                ...item,
                label: {
                  show: showDataFlat.value,
                },
              })) || [],
            label: {
              show: showDataFlat.value,
            },
          })),
        });
      }
    }
  );
  const trendChartRef = useTemplateRef<HTMLDivElement>('trendChartRef');
  let trendChart: echarts.ECharts | null = null;
  let chartData: { name: object; data: { value: number }[] }[] = [];
  const initTrendChart = () => {
    if (!trendChartRef.value) return;
    if (!trendChart) {
      trendChart = echarts.init(trendChartRef.value);
      useResizeObserver(trendChartRef.value, () => {
        trendChart?.resize();
      });
    }
    const options: echarts.EChartsOption = {
      legend: {
        left: 'center',
        top: 'top',
        itemWidth: 18,
        itemHeight: 10,
        itemGap: 16,
        textStyle: {
          height: 12,
          fontSize: 12,
          color: '#999',
          borderWidth: 1,
          borderColor: 'transparent',
        },
        icon: 'path://M921.13851 0a511.743616 511.743616 0 0 1 511.743616 511.743616h409.394893v102.348724h-419.629765a511.845965 511.845965 0 0 1-1003.017489 0H0V511.743616h409.394893a511.743616 511.743616 0 0 1 511.743617-511.743616zM524.639556 614.09234a409.599591 409.599591 0 0 0 792.997908 0H1098.201801A204.492749 204.492749 0 0 1 744.075218 614.09234H524.741904zM921.13851 102.348723a409.394893 409.394893 0 0 0-409.394894 409.394893h204.697447a204.697447 204.697447 0 1 1 409.394893 0h204.697447a409.394893 409.394893 0 0 0-409.394893-409.394893z',
      },
      tooltip: {
        trigger: 'axis' as const,
        enterable: true,
        formatter: (params) => {
          const { name } = params[0];
          const content = params.reduce((html, p, idx) => {
            const formatFn = formatNumberObj;
            const newHtml = `${html}<div style="display: flex; align-items: center;">
          <div style="background: ${
            p.color
          }; border-radius: 50%; width: 6px; height: 6px; margin-right: 8px;"></div>
          <div style="color: #666; font-size: 12px">${p.seriesName}</div>
          </div>
          <div class="font-din" style="font-size: 12px; color: #1f1f1f;text-align: right">${formatFn(
            p.value
          ).toString()}</div>`;
            return newHtml;
          }, '');
          return `
        <div style="color: #999; font-size: 12px; margin-bottom: 4px">${name}</div>
        <div style="display: grid; grid-template-columns: repeat(2, auto); column-gap: 10px; row-gap: 4px">${content}</div>
        `;
        },
      },
      color: [
        '#02B96B',
        '#258DFF',
        '#FF9F22',
        '#FFBF1F',
        '#FF663E',
        '#FF4EAF',
        '#A55BF5',
        '#0CC1E2',
        '#F53F3F',
        '#6E7F9C',
      ],
      grid: {
        top: 36,
        left: 15,
        right: 15,
        bottom: 5,
        height: 'auto', // 根据数据长度动态设置高度
        containLabel: true,
      },
      xAxis: generateXAxis({
        type: 'category',
        data: props.data.columns || [],
      }),
      yAxis: [
        generateYAxis({
          name: 'VOC量',
          type: 'value',
          splitNumber: 4,
          nameTextStyle: {
            color: '#999',
            align: 'center',
            padding: [0, 0, 0, 0],
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#EDEDED',
              type: 'dashed',
            },
          },
          axisLabel: {
            formatter(value) {
              return formatNumberObj(value).toString();
            },
          },
        }),
      ],
      series: chartData.map((series) => {
        return {
          name: series.name!,
          type: 'line',
          data: series.data || [],
          label: {
            show: showDataFlat.value,
            position: 'top',
            color: '#333',
            fontFamily: 'DIN',
            fontSize: 11,
          },
          showSymbol: showDataFlat.value,
        };
      }),
    };
    trendChart.setOption(options, { replaceMerge: 'series' });
  };
  const trendTableData = shallowRef<
    {
      tag: string;
      [key: string]: string | number;
    }[]
  >([]);
  const columns = computed(() => {
    return [
      {
        title: '标签',
        field: 'tag',
        minWidth: 114,
        align: 'left',
      },
      ...props.data.columns!.map((col) => {
        return {
          title: col,
          field: col,
          align: 'right',
          sortable: true,
          formatter: ({ cellValue }) => formatNumberObj(cellValue).toString(),
        };
      }),
      {
        title: '操作',
        field: 'actions',
        width: 100,
        align: 'right',
        slots: {
          default: 'actions',
        },
      },
    ];
  });
  watch(
    () => props.data,
    (newVal) => {
      chartData =
        props.data?.rows?.map((row) => {
          return {
            name: row.vocLevel,
            data: newVal.columns!.map((col) => {
              return {
                value: (row[col] as { vocCount: number }).vocCount,
              };
            }),
          };
        }) || [];
      trendTableData.value =
        props.data.rows?.map((row) => {
          return {
            tag: row.vocLevel,
            ...newVal.columns!.reduce((acc, col) => {
              return {
                ...acc,
                [col]: (row[col] as { vocCount: number }).vocCount,
              };
            }, {}),
          };
        }) || [];
      nextTick(() => {
        initTrendChart();
      });
    },
    { immediate: true, deep: 1 }
  );
  const handleModeChange = (mode: 'chart' | 'table') => {
    if (mode === 'chart') {
      nextTick(() => {
        initTrendChart();
      });
    } else {
      trendChart?.dispose();
      trendChart = null;
    }
  };
  const handleSkipDetail = (row) => {
    // 这里可以添加下钻逻辑，比如路由跳转或者弹出详情对话框
    emit('skipParticulars', row.tag);
  };
</script>

<style lang="scss" scoped>
  .trend-chart {
    width: 100%;
    height: 300px;
  }
  .btn-skip {
    color: var(---P6, #02b96b);
    text-align: right;

    /* 较弱/Regular 12 */
    font-family: 'PingFang SC';
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 166.667% */
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
</style>
