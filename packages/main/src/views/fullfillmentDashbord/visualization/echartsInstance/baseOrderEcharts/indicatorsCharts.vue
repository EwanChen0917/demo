<template>
  <div ref="chartContainer" class="indicators-charts"></div>
</template>

<script setup lang="ts">
  import * as echarts from 'echarts';
  import { useTemplateRef } from 'vue';

  const props = withDefaults(
    defineProps<{
      data: any[];
      color?: string;
    }>(),
    {
      color: '#409eff',
    }
  );
  const chartContainer = useTemplateRef<HTMLElement>('chartContainer');
  let chart: any = null;
  const initCharts = (el: HTMLElement) => {
    const values = Array.isArray(props.data) ? props.data : [];
    if (!values.length) {
      return;
    }
    const maxValue = Math.max(...values);
    const minValue = Math.min(...values);
    const span = maxValue - minValue;
    if (!chart) {
      chart = echarts.init(el);
    }
    const option = {
      tooltip: {
        show: false,
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      legend: {
        show: false,
      },
      grid: {
        height: 'auto',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
      },
      color: props.color || '#409eff',
      yAxis: {
        type: 'value',
        name: '数值',
        max: maxValue * 1.2,
        min: minValue * 0.8,
        interval: span === 0 ? 1 : span / 5,
        nameTextStyle: {
          fontSize: 12,
          fontWeight: 400,
          color: '#999',
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
            color: '#ededed',
            type: 'dashed',
          },
        },
      },
      xAxis: {
        type: 'category',
        data: values.map((_, index) => `${index + 1}`),
        axisLabel: {
          show: false, // 隐藏x轴刻度标签
        },
        axisLine: {
          show: false, // 隐藏y轴刻度线
          lineStyle: {
            color: '#999',
            // type: 'dashed',
          },
        },
        axisTick: {
          show: false, // 隐藏y轴刻度线
        },
        splitLine: {
          show: false, // 隐藏x轴分割线
        },
      },
      series: {
        name: '数值',
        type: 'line',
        smooth: true,
        symbol: 'none',
        data: values,
        itemStyle: {
          borderWidth: 0,
        },
        lineStyle: {
          width: 0.9,
          color: props.color || '#409eff',
        },
        areaStyle: {
          // 渐变色
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: `${props.color || '#409eff'}28`,
            },
            {
              offset: 1,
              color: `${props.color || '#409eff'}00`, // 渐变色结束颜色
            },
          ]),
        },
      },
    };

    chart.setOption(option);
  };
  const init = () => {
    if (!chartContainer.value) {
      return;
    }
    initCharts(chartContainer.value);
  };
  watch(
    () => [props.data, chartContainer.value],
    () => {
      init();
    },
    {
      immediate: true,
    }
  );
</script>

<style scoped lang="scss">
  .indicators-charts {
    width: 100%;
    height: 100%;
    position: relative;
    background-color: transparent;
    border-radius: 4px;
    overflow: hidden;
  }
</style>
