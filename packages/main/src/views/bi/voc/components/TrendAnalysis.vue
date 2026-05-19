<template>
  <ChartCard :isFullscreen="false" title="趋势分析" @mode-change="handleModeChange">
    <template #chart>
      <div class="trend-chart" ref="trendChartRef"></div>
    </template>
    <template #table>
      <vxe-grid :columns="columns" :data="trendTableData" />
    </template>
  </ChartCard>
</template>

<script lang="ts" setup>
  import * as echarts from 'echarts';
  import { BiContracts } from '@/api';
  import { useResizeObserver } from '@vueuse/core';
  import ChartCard from '../../components/ChartCard.vue';
  import {
    formatNumberObj,
    formatRate,
    generateTooltip,
    generateXAxis,
    generateYAxis,
  } from '../../utils/utils';

  const props = defineProps<{
    isDialog?: boolean;
    data: BiContracts.VocRateTrendBean[];
  }>();

  const searchParams = inject<BiContracts.BaseVocQueryReq>('searchParams')!;
  const showDataFlat = inject('showDataFlat') as Ref<boolean>;
  watch(
    () => showDataFlat.value,
    () => {
      if (trendChart) {
        trendChart.setOption({
          series: seriesList.map((series) => ({
            name: series.name,
            data:
              props.data?.map((d) => ({
                value: d[series.key as keyof BiContracts.VocRateTrendBean],
                label: {
                  show: showDataFlat.value,
                },
              })) || [],
            showSymbol: showDataFlat.value,
          })),
        });
      }
    }
  );

  const seriesStrategy = {
    salesQty: {
      name: '销量',
      key: 'salesQty',
      show: () => true,
    },
    vocCnt: {
      name: 'VOC量',
      key: 'vocCnt',
      show: () => true,
    },
    vocRate: {
      name: 'VOC率',
      key: 'vocRate',
      isRate: true,
      show: () => true,
    },
    vocGrandTotalRate: {
      name: '年累计VOC率',
      key: 'vocGrandTotalRate',
      isRate: true,
      show: () => {
        return searchParams.periodType === 'month';
      },
    },
    productVocRate: {
      name: '产品问题VOC率',
      key: 'productVocRate',
      isRate: true,
      show: () => {
        return (
          !searchParams.vocLevel1List?.length &&
          !searchParams.vocLevel2List?.length &&
          !searchParams.vocLevel3List?.length
        );
      },
    },
    nonProductVocRate: {
      name: '非产品问题VOC率',
      key: 'nonProductVocRate',
      isRate: true,
      show: () => {
        return (
          !searchParams.vocLevel1List?.length &&
          !searchParams.vocLevel2List?.length &&
          !searchParams.vocLevel3List?.length
        );
      },
    },
    productVocGrandTotalRate: {
      name: '产品问题年累计VOC率',
      key: 'productVocGrandTotalRate',
      isRate: true,
      show: () => {
        return (
          searchParams.periodType === 'month' &&
          !searchParams.vocLevel1List?.length &&
          !searchParams.vocLevel2List?.length &&
          !searchParams.vocLevel3List?.length
        );
      },
    },
    nonProductVocGrandTotalRate: {
      name: '非产品问题年累计VOC率',
      key: 'nonProductVocGrandTotalRate',
      isRate: true,
      show: () => {
        return (
          searchParams.periodType === 'month' &&
          !searchParams.vocLevel1List?.length &&
          !searchParams.vocLevel2List?.length &&
          !searchParams.vocLevel3List?.length
        );
      },
    },
  };
  let seriesList: any[] = [];
  const generateSeriesList = () => {
    const list: any[] = [];
    Object.keys(seriesStrategy).forEach((key) => {
      const strategy = seriesStrategy[key as keyof typeof seriesStrategy];
      if (strategy.show()) {
        list.push(strategy);
      }
    });
    return list;
  };

  const trendChartRef = useTemplateRef<HTMLDivElement>('trendChartRef');
  let trendChart: echarts.ECharts | null = null;
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
        data: seriesList.map((series) => ({
          name: series.name,
          icon: series.isRate
            ? 'path://M921.13851 0a511.743616 511.743616 0 0 1 511.743616 511.743616h409.394893v102.348724h-419.629765a511.845965 511.845965 0 0 1-1003.017489 0H0V511.743616h409.394893a511.743616 511.743616 0 0 1 511.743617-511.743616zM524.639556 614.09234a409.599591 409.599591 0 0 0 792.997908 0H1098.201801A204.492749 204.492749 0 0 1 744.075218 614.09234H524.741904zM921.13851 102.348723a409.394893 409.394893 0 0 0-409.394894 409.394893h204.697447a204.697447 204.697447 0 1 1 409.394893 0h204.697447a409.394893 409.394893 0 0 0-409.394893-409.394893z'
            : 'path://M282.537577 94.179192m188.358385 0l753.43354 0q188.358385 0 188.358385 188.358385l0 376.71677q0 188.358385-188.358385 188.358385l-753.43354 0q-188.358385 0-188.358385-188.358385l0-376.71677q0-188.358385 188.358385-188.358385Z',
        })),
      },
      tooltip: generateTooltip(),
      color: ['#02B96B', '#258DFF', '#FF9F22', '#FFBF1F', '#FF663E', '#FF4EAF', '#A55BF5'],
      grid: {
        top: 36,
        left: 10,
        right: 5,
        bottom: 5,
        height: 'auto', // 根据数据长度动态设置高度
        containLabel: true,
      },
      xAxis: generateXAxis({
        type: 'category',
        data: props.data?.map((d) => d.period) || [],
      }),
      yAxis: [
        generateYAxis({
          name: '销量 / VOC量',
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
        generateYAxis({
          name: 'VOC率',
          type: 'value',
          splitNumber: 4,
          nameTextStyle: {
            color: '#999',
            align: 'center',
            padding: [0, 0, 0, 12],
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: '#EDEDED',
              type: 'dashed',
            },
          },
          axisLabel: {
            formatter(value) {
              return formatRate(value).toString();
            },
          },
        }),
      ],
      series: seriesList.map((series) => {
        const yAxisIndex = series.isRate ? 1 : 0;
        return {
          name: series.name,
          type: series.isRate ? 'line' : 'bar',
          yAxisIndex,
          data:
            props.data?.map((d) => ({
              value: d[series.key as keyof BiContracts.VocRateTrendBean],
              label: {
                show: showDataFlat.value,
              },
            })) || [],
          label: {
            show: showDataFlat.value,
            position: 'top',
            color: '#333',
            fontFamily: 'DIN',
            fontSize: 11,
            formatter(params: any) {
              if (series.isRate) {
                return formatRate(params.data.value).toString();
              }
              return formatNumberObj(params.data.value).toString();
            },
          },
          select: {
            label: { show: false },
          },
          barWidth: 16,
          itemStyle: {
            borderRadius: [4, 4, 0, 0],
          },
          showSymbol: showDataFlat.value,
        };
      }),
    };
    trendChart.setOption(options, { replaceMerge: 'series' });
  };
  const trendTableData = shallowRef<BiContracts.VocRateTrendBean[]>([]);
  const columnsMap = {
    period: {
      title: '周期',
      field: 'period',
    },
    salesQty: {
      title: '销量',
      field: 'salesQty',
      align: 'right',
      sortable: true,
    },
    vocCnt: {
      title: 'VOC量',
      field: 'vocCnt',
      align: 'right',
      sortable: true,
    },
    vocRate: {
      title: 'VOC率',
      field: 'vocRate',
      align: 'right',
      sortable: true,
      formatter: ({ cellValue }: { cellValue: number }) =>
        formatRate(cellValue, { maximumFractionDigits: 2 }).toString(),
    },
    vocGrandTotalRate: {
      title: '年累计VOC率',
      field: 'vocGrandTotalRate',
      align: 'right',
      sortable: true,
      formatter: ({ cellValue }: { cellValue: number }) =>
        formatRate(cellValue, { maximumFractionDigits: 2 }).toString(),
    },
    productVocRate: {
      title: '产品VOC率',
      field: 'productVocRate',
      align: 'right',
      sortable: true,
      formatter: ({ cellValue }: { cellValue: number }) =>
        formatRate(cellValue, { maximumFractionDigits: 2 }).toString(),
    },
    nonProductVocRate: {
      title: '非产品VOC率',
      field: 'nonProductVocRate',
      align: 'right',
      sortable: true,
      formatter: ({ cellValue }: { cellValue: number }) =>
        formatRate(cellValue, { maximumFractionDigits: 2 }).toString(),
    },
    productVocGrandTotalRate: {
      title: '产品年累计VOC率',
      field: 'productVocGrandTotalRate',
      align: 'right',
      sortable: true,
      formatter: ({ cellValue }: { cellValue: number }) =>
        formatRate(cellValue, { maximumFractionDigits: 2 }).toString(),
    },
    nonProductVocGrandTotalRate: {
      title: '非产品年累计VOC率',
      field: 'nonProductVocGrandTotalRate',
      align: 'right',
      sortable: true,
      formatter: ({ cellValue }: { cellValue: number }) =>
        formatRate(cellValue, { maximumFractionDigits: 2 }).toString(),
    },
  };
  const columns = shallowRef<any[]>([]);
  watch(
    () => props.data,
    () => {
      seriesList = generateSeriesList();
      trendTableData.value = props.data;
      columns.value = [columnsMap.period, ...seriesList.map((series) => columnsMap[series.key])];
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
</script>

<style lang="scss" scoped>
  .trend-chart {
    width: 100%;
    height: 224px;
  }
</style>
