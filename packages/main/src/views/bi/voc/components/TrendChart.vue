<template>
  <div class="trend-chart" ref="trendChartRef"></div>
</template>

<script lang="ts" setup>
  import * as echarts from 'echarts';
  import { useResizeObserver } from '@vueuse/core';
  import { type BiContracts } from '@/api';
  import {
    formatNumberObj,
    formatRate,
    generateLegend,
    generateTooltip,
    generateXAxis,
    generateYAxis,
  } from '../../utils/utils';

  const props = defineProps<{
    isDialog?: boolean;
    data: BiContracts.VocRateTrendBean[];
  }>();

  const showDataFlat = inject('showDataFlat') as Ref<boolean>;
  watch(
    () => showDataFlat.value,
    () => {
      if (trendChart) {
        trendChart.setOption({
          series: [
            {
              name: '销量',
              label: {
                show: showDataFlat.value,
              },
            },
            {
              name: 'VOC量',
              label: {
                show: showDataFlat.value,
              },
            },
            {
              name: 'VOC率',
              showSymbol: showDataFlat.value,
              label: {
                show: showDataFlat.value,
              },
            },
            {
              name: '年累计VOC率',
              showSymbol: showDataFlat.value,
              label: {
                show: showDataFlat.value,
              },
            },
          ],
        });
      }
    }
  );

  const trendChartRef = useTemplateRef<HTMLDivElement>('trendChartRef');
  let trendChart: echarts.ECharts | null = null;
  const initTrendChart = () => {
    if (!trendChartRef.value) return;
    if (!trendChart) {
      trendChart = echarts.init(trendChartRef.value);
      useResizeObserver(trendChartRef.value, () => {
        trendChart!.resize();
      });
    }
    const options: echarts.EChartsOption = {
      legend: generateLegend({
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
        data: [
          {
            name: '销量',
            icon: 'path://M282.537577 94.179192m188.358385 0l753.43354 0q188.358385 0 188.358385 188.358385l0 376.71677q0 188.358385-188.358385 188.358385l-753.43354 0q-188.358385 0-188.358385-188.358385l0-376.71677q0-188.358385 188.358385-188.358385Z',
          },
          {
            name: 'VOC量',
            icon: 'path://M282.537577 94.179192m188.358385 0l753.43354 0q188.358385 0 188.358385 188.358385l0 376.71677q0 188.358385-188.358385 188.358385l-753.43354 0q-188.358385 0-188.358385-188.358385l0-376.71677q0-188.358385 188.358385-188.358385Z',
          },
          {
            name: 'VOC率',
            icon: 'path://M921.13851 0a511.743616 511.743616 0 0 1 511.743616 511.743616h409.394893v102.348724h-419.629765a511.845965 511.845965 0 0 1-1003.017489 0H0V511.743616h409.394893a511.743616 511.743616 0 0 1 511.743617-511.743616zM524.639556 614.09234a409.599591 409.599591 0 0 0 792.997908 0H1098.201801A204.492749 204.492749 0 0 1 744.075218 614.09234H524.741904zM921.13851 102.348723a409.394893 409.394893 0 0 0-409.394894 409.394893h204.697447a204.697447 204.697447 0 1 1 409.394893 0h204.697447a409.394893 409.394893 0 0 0-409.394893-409.394893z',
          },
          {
            name: '年累计VOC率',
            icon: 'path://M921.13851 0a511.743616 511.743616 0 0 1 511.743616 511.743616h409.394893v102.348724h-419.629765a511.845965 511.845965 0 0 1-1003.017489 0H0V511.743616h409.394893a511.743616 511.743616 0 0 1 511.743617-511.743616zM524.639556 614.09234a409.599591 409.599591 0 0 0 792.997908 0H1098.201801A204.492749 204.492749 0 0 1 744.075218 614.09234H524.741904zM921.13851 102.348723a409.394893 409.394893 0 0 0-409.394894 409.394893h204.697447a204.697447 204.697447 0 1 1 409.394893 0h204.697447a409.394893 409.394893 0 0 0-409.394893-409.394893z',
          },
        ],
      }),
      tooltip: generateTooltip(),
      color: ['#02B96B', '#258DFF', '#FF9F22', '#FF663E'],
      grid: {
        top: 46,
        left: 5,
        right: 5,
        bottom: 10,
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
          nameTextStyle: {
            color: '#999',
            align: 'left',
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
              return formatRate(value / 100).toString();
            },
          },
        }),
      ],
      series: [
        {
          data: props.data.map((d) => d.salesQty) || [],
          name: '销量',
          type: 'bar',
          barWidth: 16,
          label: {
            show: showDataFlat.value,
            position: 'top',
            color: '#333',
            fontFamily: 'DIN',
            fontSize: 11,
            formatter(params) {
              return formatNumberObj(params.value).toString();
            },
          },
          itemStyle: {
            color: '#02B96B',
            borderRadius: [4, 4, 0, 0],
          },
        },
        {
          data: props.data.map((d) => d.vocCount) || [],
          name: 'VOC量',
          type: 'bar',
          barWidth: 16,
          label: {
            show: showDataFlat.value,
            position: 'top',
            color: '#333',
            fontFamily: 'DIN',
            fontSize: 11,
            formatter(params) {
              return `${formatNumberObj(params.value).toString()}`;
            },
          },
          itemStyle: {
            color: '#258DFF',
            borderRadius: [4, 4, 0, 0],
          },
        },
        {
          data: props.data.map((d) => d.vocRate) || [],
          name: 'VOC率',
          type: 'line',
          yAxisIndex: 1,
          symbol: 'circle',
          symbolSize: 7,
          showSymbol: showDataFlat.value,
          smooth: true,
          label: {
            show: showDataFlat.value,
            position: 'insideRight',
            color: '#333',
            fontFamily: 'DIN',
            fontSize: 11,
            formatter(params) {
              return `${formatRate(params.value, { maximumFractionDigits: 2 }).toString()}`;
            },
          },
          itemStyle: {
            color: '#FF9F22',
            borderColor: '#fff',
          },
          tooltip: {
            valueFormatter(value) {
              return formatRate(value, { maximumFractionDigits: 2 }).toString();
            },
          },
        },
        {
          data: props.data.map((d) => d.vocGrandTotalRate) || [],
          name: '年累计VOC率',
          type: 'line',
          yAxisIndex: 1,
          symbol: 'circle',
          symbolSize: 7,
          showSymbol: showDataFlat.value,
          smooth: true,
          label: {
            show: showDataFlat.value,
            position: 'insideLeft',
            color: '#333',
            fontFamily: 'DIN',
            fontSize: 11,
            formatter(params) {
              return `${formatRate(params.value, { maximumFractionDigits: 2 }).toString()}`;
            },
          },
          itemStyle: {
            color: '#FF663E',
            borderColor: '#fff',
          },
          tooltip: {
            valueFormatter(value) {
              return formatRate(value, { maximumFractionDigits: 2 }).toString();
            },
          },
        },
      ],
    };
    trendChart.setOption(options);
  };
  onMounted(() => {
    props.data && initTrendChart();
  });
  watch(
    () => [props.data],
    () => {
      nextTick(() => {
        initTrendChart();
      });
    }
  );
</script>

<style lang="scss" scoped>
  .trend-chart {
    width: 100%;
    height: 270px;
  }
</style>
