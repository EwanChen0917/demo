<template>
  <div class="sale-charts">
    <div class="charts-container" ref="saleChartsContainer"></div>
  </div>
</template>

<script setup lang="ts">
  import * as echarts from 'echarts';
  import { formatNumberObj, formatRate } from '@/views/bi/utils/utils';
  import { useResizeObserver } from '@vueuse/core';

  const props = withDefaults(
    defineProps<{
      card: any;
      data: any[];
    }>(),
    {
      data: () => [],
    }
  );

  const saleChartsContainer = ref(null);
  let lineChart: echarts.ECharts | null = null;
  const unit = computed(() => {
    let unitName = '';
    let unitNumber = 1;
    const { data } = props;
    const maxValue = Math.max(...data.map((item) => item.data.map((x) => x.value)).flat(Infinity));
    if (maxValue > 1e9) {
      unitName = '亿';
      unitNumber = 1e8;
    } else if (maxValue > 1e5) {
      unitName = '万';
      unitNumber = 1e4;
    }
    return { unitName, unitNumber };
  });
  const yName = computed(() => {
    return `${
      unit.value.unitName || props.card?.valueUnit
        ? `${unit.value.unitName || ''}${props.card?.valueUnit || ''}`
        : ''
    }`;
  });
  const updateLineChartData = () => {
    const { data } = props;
    if (!lineChart) {
      lineChart = echarts.init(saleChartsContainer.value);
      useResizeObserver(saleChartsContainer.value, () => {
        lineChart?.resize();
      });
    }

    lineChart.setOption(
      {
        title: {
          text: props.card?.title || '',
          textStyle: {
            fontSize: 13,
            fontWeight: 600,
            color: '#1f1f1f',
            fontFamily: 'PingFang SC',
          },
          left: 'center',
          top: 0,
        },
        tooltip: {
          trigger: 'axis',
          extraCssText: 'border-radius: 10px;',
          textStyle: {
            fontSize: 12,
          },
          formatter: (params) => {
            const { name } = params[0];
            const content = params.reduce((html, p, idx) => {
              const formatFn = p.data.isRate ? formatRate : formatNumberObj;
              const power = p.data.isRate ? 100 : 1;
              const newHtml = `${html}<div style="display: flex; align-items: center;">
          <div style="background: ${
            p.color
          }; border-radius: 50%; width: 6px; height: 6px; margin-right: 8px;"></div>
          <div style="color: #666; font-size: 12px">${p.seriesName}</div>
          </div>
          <div class="font-din" style="font-size: 12px; font-weight: 700; color: #1f1f1f;text-align: right">${formatFn(
            p.value / power
          ).toString()}</div>`;
              return newHtml;
            }, '');
            return `
        <div style="color: #999; font-size: 12px; margin-bottom: 4px">${name}</div>
        <div style="display: grid; grid-template-columns: repeat(2, auto); column-gap: 10px; row-gap: 4px">${content}</div>
          `;
          },
        },
        grid: {
          top: 36,
          left: 5,
          right: 10,
          bottom: 40,
          containLabel: true,
        },
        legend: {
          data: data.map((x, i) => {
            // console.log(x.iconName);
            return {
              name: x.name,
              icon: 'path://M921.13851 0a511.743616 511.743616 0 0 1 511.743616 511.743616h409.394893v102.348724h-419.629765a511.845965 511.845965 0 0 1-1003.017489 0H0V511.743616h409.394893a511.743616 511.743616 0 0 1 511.743617-511.743616zM524.639556 614.09234a409.599591 409.599591 0 0 0 792.997908 0H1098.201801A204.492749 204.492749 0 0 1 744.075218 614.09234H524.741904zM921.13851 102.348723a409.394893 409.394893 0 0 0-409.394894 409.394893h204.697447a204.697447 204.697447 0 1 1 409.394893 0h204.697447a409.394893 409.394893 0 0 0-409.394893-409.394893z',
            };
          }),
          bottom: 0,
          itemGap: 16,
          left: 'center',
          itemWidth: 18,
          itemHeight: 10,
          textStyle: {
            color: '#999',
            borderColor: 'transparent',
            borderWidth: 1,
          },
        },
        xAxis: {
          type: 'category',
          data: data[0].data.map((x) => x.date),
          axisLine: {
            lineStyle: {
              color: '#e6e6e6', // 横坐标颜色
            },
          },
          axisLabel: {
            color: '#999', // 坐标文字颜色
          },
          axisTick: {
            show: false, // 不显示坐标圆点
          },
        },
        yAxis: [
          {
            type: 'value',
            name: yName.value,
            position: 'left',
            nameLocation: 'end', // 将名称放置在轴的末端（顶部）
            nameGap: 10, // 调整名称与轴的距离
            nameTextStyle: {
              fontSize: 12,
              color: '#999',
              fontWeight: 500,
            },
            splitNumber: 5,
            axisLine: {
              lineStyle: {
                color: '#999',
              },
            },
            axisLabel: {
              color: '#999', // 坐标文字颜色
              formatter: (value: number) => {
                // 将 value 转为 万，保留两位
                return formatNumberObj(value / unit.value.unitNumber).toString();
              },
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed', // 虚线
                color: '#e6e6e6', // 分割线颜色
              },
            },
            axisTick: {
              show: false, // 不显示坐标圆点
            },
          },
          {
            type: 'value',
            position: 'right',
            alignTicks: true,
            axisLine: {
              lineStyle: {
                color: '#999',
              },
            },
            axisLabel: {
              color: '#999',
              formatter: (value: number) => {
                return `${value}%`;
              },
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed', // 虚线
                color: '#e6e6e6', // 分割线颜色
              },
            },
            axisTick: {
              show: false, // 不显示坐标圆点
            },
          },
        ],
        series: [
          {
            name: data[0].name,
            type: 'line',
            yAxisIndex: 0,
            smooth: true,
            data: data[0].data.map((x) => ({ value: x.value })),

            itemStyle: {
              color: data[0].color,
              borderColor: '#fff',
            },
            lineStyle: {
              color: data[0].color,
            },
            symbol: 'circle',
            symbolSize: 7,
            showSymbol: false,
          },
          {
            name: data[1].name,
            type: 'line',
            smooth: true,
            yAxisIndex: 1,
            data: data[1].data.map((x) => ({ value: x.value, isRate: true })),
            itemStyle: {
              color: data[1].color,
              borderColor: '#fff',
            },
            lineStyle: {
              color: data[1].color,
            },
            symbol: 'circle',
            symbolSize: 7,
            showSymbol: false,
          },
          {
            name: data[2].name,
            type: 'line',
            smooth: true,
            yAxisIndex: 1,
            data: data[2].data.map((x) => ({ value: x.value, isRate: true })),
            itemStyle: {
              color: data[2].color,
              borderColor: '#fff',
            },
            lineStyle: {
              color: data[2].color,
            },
            symbol: 'circle',
            symbolSize: 7,
            showSymbol: false,
          },
        ],
      },
      { replaceMerge: ['series'] }
    );
  };

  // 初始化折线图，默认显示总量曲线图
  const initLineChart = () => {
    updateLineChartData();
  };

  watch(
    () => props.data,
    () => {
      updateLineChartData();
    }
  );

  // 挂载时初始化图表
  onMounted(() => {
    initLineChart();
  });

  onUnmounted(() => {
    lineChart?.dispose();
  });
</script>

<style scoped lang="scss">
  .sale-charts {
    height: 400px;
    .charts-container {
      height: 100%;
    }
  }
</style>
