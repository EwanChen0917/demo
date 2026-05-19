<template>
  <div class="tag-chart" ref="lineChart"></div>
</template>

<script lang="ts" setup>
  import * as echarts from 'echarts';
  import { useResizeObserver } from '@vueuse/core';
  import { type BiContracts } from '@/api';
  import {
    formatNumberObj,
    formatRate,
    generateTooltip,
    generateXAxis,
    generateYAxis,
  } from '../../utils/utils';

  const props = withDefaults(
    defineProps<{
      isDialog?: boolean;
      transpose?: boolean;
      data?: BiContracts.TagDistributionItem[];
      clickMaxLevel?: number[];
      tagLevel?: number;
    }>(),
    {
      isDialog: false,
      transpose: false,
      data: () => [],
      clickMaxLevel: () => [],
      tagLevel: 0,
    }
  );

  const emit = defineEmits<{
    clickTag: [payload: { tagName?: string }];
  }>();

  watch(
    () => props.clickMaxLevel?.length,
    () => {
      const maxLevel = Math.max(...(props.clickMaxLevel || []));
      // 重置当前高亮索引
      if (maxLevel && maxLevel > props.tagLevel!) {
        // 不可点击
        tagEcharts?.setOption({
          series: [
            {
              name: 'VOC量',
              silent: true,
            },
          ],
        });
      } else {
        // 可点击
        tagEcharts?.setOption({
          series: [
            {
              name: 'VOC量',
              silent: false,
            },
          ],
        });
      }
    }
  );

  const showDataFlat = inject('showDataFlat') as Ref<boolean>;
  watch(
    () => showDataFlat.value,
    () => {
      if (tagEcharts) {
        let { data } = props;
        if (props.transpose) {
          data = props.data.toReversed();
        }
        tagEcharts.setOption({
          grid: {
            right: 48,
          },
          series: [
            {
              name: 'VOC量',
              data: data.map((item) => {
                return {
                  value: item.count,
                  prop: item.proportion,
                  label: {
                    show: showDataFlat.value,
                  },
                };
              }),
              label: {
                show: showDataFlat.value,
              },
            },
          ],
        });
      }
    }
  );
  watch(
    () => props.transpose,
    () => {
      if (tagEcharts) {
        let { data } = props;
        if (props.transpose) {
          data = props.data.toReversed();
        }
        tagEcharts.setOption(
          {
            xAxis: props.transpose ? categoryAxis() : valueAxis(),
            yAxis: props.transpose ? valueAxis() : categoryAxis(),
            series: [
              {
                name: 'VOC量',
                data: data.map((item) => {
                  return {
                    value: item.count,
                    prop: item.proportion,
                  };
                }),
                itemStyle: {
                  borderRadius: props.transpose ? [4, 4, 0, 0] : [0, 4, 4, 0],
                },
                label: {
                  position: props.transpose ? 'top' : 'right',
                },
              },
              {
                name: '累计占比',
                data: data.map((item) => item.accumulatedRatio),
                yAxisIndex: props.transpose ? 1 : 0,
                xAxisIndex: props.transpose ? 0 : 1,
              },
            ],
          },
          {
            replaceMerge: ['xAxis', 'yAxis'],
          }
        );
      }
    }
  );

  let currentHighlightName: string | null = null; // 记录当前高亮的柱子索引
  const lineChartRef = useTemplateRef<HTMLDivElement>('lineChart');
  let tagEcharts: echarts.ECharts | null = null;
  const initEcharts = (container: HTMLDivElement) => {
    if (!tagEcharts) {
      tagEcharts = echarts.init(container);
      tagEcharts.on('click', (params) => {
        if (props.isDialog) return;
        if (params.componentType === 'series' && params.seriesType === 'bar') {
          // 记录当前高亮索引
          if (currentHighlightName === params.name) {
            currentHighlightName = null;
            emit('clickTag', { tagName: undefined });
          } else {
            currentHighlightName = params.name;
            emit('clickTag', { tagName: params.name });
          }
          tagEcharts!.setOption({
            series: [
              {
                name: 'VOC量',
                itemStyle: {
                  color: (p) => {
                    if (currentHighlightName === null) {
                      return '#02B96B';
                    }
                    return p.name === currentHighlightName ? '#02B96B' : '#D7FFEE';
                  },
                },
              },
            ],
          });
        }
      });
      useResizeObserver(container, () => {
        tagEcharts!.resize();
      });
    }
    let { data } = props;
    if (props.transpose) {
      data = props.data.toReversed();
    }
    const options: echarts.EChartsOption = {
      tooltip: generateTooltip(),
      legend: {
        show: true,
        bottom: 0,
        left: 'center',
        itemWidth: 18,
        itemHeight: 10,
        itemGap: 16,
        textStyle: {
          fontSize: 12,
          height: 12,
          color: '#999',
          borderWidth: 1,
          borderColor: 'transparent',
        },
        data: [
          {
            name: 'VOC量',
            icon: 'path://M282.537577 94.179192m188.358385 0l753.43354 0q188.358385 0 188.358385 188.358385l0 376.71677q0 188.358385-188.358385 188.358385l-753.43354 0q-188.358385 0-188.358385-188.358385l0-376.71677q0-188.358385 188.358385-188.358385Z',
          },
          {
            name: '累计占比',
            icon: 'path://M921.13851 0a511.743616 511.743616 0 0 1 511.743616 511.743616h409.394893v102.348724h-419.629765a511.845965 511.845965 0 0 1-1003.017489 0H0V511.743616h409.394893a511.743616 511.743616 0 0 1 511.743617-511.743616zM524.639556 614.09234a409.599591 409.599591 0 0 0 792.997908 0H1098.201801A204.492749 204.492749 0 0 1 744.075218 614.09234H524.741904zM921.13851 102.348723a409.394893 409.394893 0 0 0-409.394894 409.394893h204.697447a204.697447 204.697447 0 1 1 409.394893 0h204.697447a409.394893 409.394893 0 0 0-409.394893-409.394893z',
          },
        ],
      },
      grid: {
        top: 10,
        left: 10,
        right: 48,
        bottom: 30,
        height: 'auto', // 根据数据长度动态设置高度
        containLabel: true,
      },
      color: ['#02B96B', '#FF9F22'],
      xAxis: props.transpose ? categoryAxis() : valueAxis(),
      yAxis: props.transpose ? valueAxis() : categoryAxis(),
      series: [
        {
          name: 'VOC量',
          data: data.map((item) => {
            return {
              value: item.count,
              prop: item.proportion,
            };
          }),
          type: 'bar',
          barWidth: 14,
          yAxisIndex: 0,
          xAxisIndex: 0,
          label: {
            show: showDataFlat.value,
            position: 'right',
            color: '#333',
            fontFamily: 'DIN',
            fontSize: 11,
            formatter(params) {
              return `${formatNumberObj(params.value).toString()} | ${formatRate(params.data.prop, {
                maximumFractionDigits: 2,
              }).toString()}`;
            },
          },
          labelLayout(params) {
            const { x, width, height } = params.labelRect;
            if (x + width > container.offsetWidth) {
              return {
                x: x + x - container.offsetWidth,
                dy: -height / 4,
              };
            }
            return {
              hideOverlap: true,
            };
          },
          itemStyle: {
            color: (params) => {
              if (currentHighlightName === null) {
                return '#02B96B';
              }
              return params.name === currentHighlightName ? '#02B96B' : '#D7FFEE';
            },
            borderRadius: [0, 4, 4, 0],
          },
        },
        {
          name: '累计占比',
          data: data.map((item) => item.accumulatedRatio),
          type: 'line',
          yAxisIndex: props.transpose ? 1 : 0,
          xAxisIndex: props.transpose ? 0 : 1,
          smooth: true,
          symbol: 'circle',
          symbolSize: 7,
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
      ],
    };
    tagEcharts.setOption(options);
  };
  onMounted(() => {
    nextTick(() => {
      props.data && initEcharts(lineChartRef.value!);
    });
  });
  watch(
    () => props.data,
    () => {
      nextTick(() => {
        currentHighlightName = null;
        initEcharts(lineChartRef.value!);
      });
    }
  );
  const valueAxis = () => [
    generateXAxis({
      id: 0,
      type: 'value',
      alignTicks: true,
      axisLine: {
        show: false,
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#EDEDED',
          type: 'dashed',
        },
      },
      axisLabel: {
        fontSize: 12,
        color: '#999',
        formatter(value) {
          return formatNumberObj(value).toString();
        },
        hideOverlap: true,
      },
    }),
    generateXAxis({
      id: 1,
      type: 'value',
      max: 1,
      alignTicks: true,
      axisLine: {
        show: false,
      },

      splitLine: {
        show: true,
        lineStyle: {
          color: '#EDEDED',
          type: 'dashed',
        },
      },

      axisLabel: {
        fontSize: 12,
        color: '#999',
        formatter(value) {
          return formatRate(value, { maximumFractionDigits: 2 }).toString();
        },
        hideOverlap: true,
      },
    }),
  ];
  const categoryAxis = () => {
    let { data } = props;
    if (props.transpose) {
      data = props.data.toReversed();
    }
    return generateYAxis({
      id: 0,
      type: 'category',
      data: data.map((item) => item.tagName),
      axisLabel: {
        color: '#999',
        fontSize: 12,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#EDEDED',
        },
      },
    });
  };
</script>

<style lang="scss" scoped>
  .tag-chart {
    width: 100%;
    height: 298px;
  }
</style>
