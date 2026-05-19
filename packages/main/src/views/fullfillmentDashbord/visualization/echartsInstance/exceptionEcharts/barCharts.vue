<template>
  <div ref="barChartsRef" class="bar-charts"></div>
</template>

<script setup lang="ts">
  import * as echarts from 'echarts';
  import { useTemplateRef } from 'vue';
  import { useResizeObserver } from '@vueuse/core';
  import { formatNumberObj } from '@/views/bi/utils/utils';

  type DimensionItem = {
    name?: string;
    value?: number;
  };

  type ChartRowItem = {
    name?: string;
    value?: DimensionItem[];
  };

  const props = defineProps<{
    data: ChartRowItem[];
  }>();

  const barChartsRef = useTemplateRef<HTMLDivElement>('barChartsRef');
  let barCharts: echarts.ECharts | null = null;

  const chartMeta = computed(() => {
    if (!Array.isArray(props.data) || props.data.length === 0) {
      return {
        xAxisData: [],
        seriesData: [],
        legendData: [],
      };
    }

    const xAxisData = props.data.map((item) => item?.name ?? '未知');
    const dimensionNameSet = new Set<string>();
    props.data.forEach((statusItem) => {
      (statusItem?.value ?? []).forEach((dimItem) => {
        if (!dimItem?.name) return;
        dimensionNameSet.add(dimItem.name);
      });
    });

    const dimensionNames = [...dimensionNameSet];
    const totalValue = props.data.reduce((sum, statusItem) => {
      return (
        sum +
        (statusItem?.value ?? []).reduce((innerSum, dimItem) => innerSum + (dimItem?.value ?? 0), 0)
      );
    }, 0);

    const seriesData = dimensionNames.map((dimensionName) => {
      const data = props.data.map((statusItem) => {
        const target = (statusItem?.value ?? []).find((dimItem) => dimItem?.name === dimensionName);
        return target?.value ?? 0;
      });
      const seriesTotal = data.reduce((sum, value) => sum + value, 0);
      const percent =
        totalValue > 0 ? `${((seriesTotal / totalValue) * 100).toFixed(2)}%` : '0.00%';
      return {
        name: dimensionName,
        type: 'bar',
        barWidth: 16,
        barGap: '-100%',
        itemStyle: {
          opacity: 0.7,
        },
        data,
        legendValue: seriesTotal,
        legendPercent: percent,
      };
    });

    const legendData = seriesData.map((item) => ({
      name: item.name,
      value: item.legendValue,
      percent: item.legendPercent,
    }));

    return {
      xAxisData,
      seriesData,
      legendData,
    };
  });

  const initBarCharts = () => {
    if (!barChartsRef.value || !chartMeta.value.xAxisData.length) return;
    if (!barCharts) {
      barCharts = echarts.init(barChartsRef.value);
    }
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      grid: {
        left: 40,
        right: 20,
        top: 20,
        bottom: 76,
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: chartMeta.value.xAxisData,
      },
      yAxis: {
        type: 'value',
      },
      legend: {
        orient: 'horizontal',
        left: 'center',
        bottom: '0',
        icon: 'circle',
        itemWidth: 10,
        itemHeight: 10,
        itemGap: 8,
        formatter(name: string) {
          const item = chartMeta.value.legendData.find((x) => x.name === name);
          if (!item) return name;
          const fmt = formatNumberObj(item.value);
          return `{name|${name}} {value|${fmt.toString()}}`;
        },
        textStyle: {
          lineHeight: 14,
          padding: [4, 0, 0, 0],
          rich: {
            name: {
              width: 80,
              align: 'left',
              color: '#303133',
            },
            value: {
              width: 72,
              align: 'right',
              color: '#606266',
            },
          },
        },
      },
      series: chartMeta.value.seriesData,
    };
    barCharts.setOption(option, true);
  };

  useResizeObserver(barChartsRef, () => {
    barCharts?.resize();
  });

  watch(
    chartMeta,
    () => {
      nextTick(() => {
        initBarCharts();
      });
    },
    { immediate: true }
  );

  onMounted(() => {
    nextTick(() => {
      initBarCharts();
    });
  });

  onBeforeUnmount(() => {
    barCharts?.dispose();
    barCharts = null;
  });
</script>

<style scoped lang="scss">
  .bar-charts {
    width: 100%;
    height: 100%;
  }
</style>
