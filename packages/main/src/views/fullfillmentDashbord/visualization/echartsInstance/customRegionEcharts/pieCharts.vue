<template>
  <div ref="pieChartsRef" class="pie-charts"></div>
</template>

<script setup lang="ts">
  import * as echarts from 'echarts';
  import { useTemplateRef } from 'vue';
  import { useResizeObserver } from '@vueuse/core';
  import { formatNumberObj } from '@/views/bi/utils/utils';

  type PieDataItem = {
    name: string;
    value: number;
  };

  const props = withDefaults(
    defineProps<{
      data: PieDataItem[];
    }>(),
    {
      data: () => [],
    }
  );

  const pieChartsRef = useTemplateRef<HTMLDivElement>('pieChartsRef');
  const colors = [
    '#258DFF',
    '#02B96B',
    '#FF9F22',
    '#FF4D4D',
    '#FFEB3B',
    '#9C27B0',
    '#3F51B5',
    '#00BCD4',
    '#4CAF50',
    '#FF5722',
  ];

  let pieCharts: echarts.ECharts | null = null;

  const totalValue = computed(() => {
    if (!Array.isArray(props.data) || props.data.length === 0) {
      return 0;
    }
    return props.data.reduce((sum, item) => sum + (item?.value ?? 0), 0);
  });

  const pieChartData = computed(() => {
    if (!Array.isArray(props.data) || props.data.length === 0) {
      return [];
    }
    return props.data.map((item, index) => {
      const value = item?.value ?? 0;
      const percent = totalValue.value > 0 ? ((value / totalValue.value) * 100).toFixed(2) : '0.00';
      return {
        name: item?.name ?? '未知',
        value,
        percent: `${percent}%`,
        itemStyle: {
          color: colors[index % colors.length],
          borderWidth: 2,
          borderColor: '#fff',
        },
      };
    });
  });

  const initPieCharts = () => {
    if (!pieChartsRef.value) {
      return;
    }
    if (!pieCharts) {
      pieCharts = echarts.init(pieChartsRef.value);
    }
    const option = {
      tooltip: {
        trigger: 'item',
        formatter: (params: { name: string }) => {
          const item = pieChartData.value.find((x) => x.name === params.name);
          if (!item) {
            return `${params.name}: 0 (0.00%)`;
          }
          const fmt = formatNumberObj(item.value);
          return `${params.name}: ${fmt.toString()} (${item.percent})`;
        },
      },
      legend: {
        orient: 'horizontal',
        left: 'center',
        bottom: '0',
        icon: 'circle',
        itemWidth: 10,
        itemHeight: 10,
        itemGap: 8,
        formatter(name) {
          const item = pieChartData.value.find((x) => x.name === name);
          if (item) {
            const fmt = formatNumberObj(item.value);
            return `${name}：${fmt.toString()}  {percent|${item.percent}}`;
          }
          return name;
        },
        textStyle: {
          lineHeight: 12,
          padding: [4, 0, 0, 0],
          rich: {
            name: {
              width: 90, // 名称列宽（按你的中文长度再调）
              align: 'left',
              color: '#303133',
            },
            value: {
              width: 80, // 数值列宽
              align: 'right',
              color: '#606266',
            },
            percent: {
              width: 60, // 百分比列宽
              align: 'right',
              color: '#999',
            },
          },
        },
      },
      series: [
        {
          name: '区域分布',
          type: 'pie',
          radius: [90, 122],
          center: ['50%', '40%'],
          avoidLabelOverlap: true,
          label: {
            show: true,
            position: 'center',
            formatter: () => {
              const fmt = formatNumberObj(totalValue.value);
              return `{label|总量}\n{total|${fmt.toString()}}`;
            },
            rich: {
              total: {
                fontSize: 24,
                fontWeight: 'bold',
                color: '#333',
                lineHeight: 32,
              },
              label: {
                fontSize: 12,
                color: '#999',
                lineHeight: 20,
              },
            },
          },
          labelLine: {
            show: false,
          },
          data: pieChartData.value,
        },
      ],
    };
    pieCharts.setOption(option, true);
  };

  useResizeObserver(pieChartsRef, () => {
    pieCharts?.resize();
  });

  watch(
    () => props.data,
    () => {
      nextTick(() => {
        initPieCharts();
      });
    },
    { deep: true }
  );

  onMounted(() => {
    nextTick(() => {
      initPieCharts();
    });
  });

  onBeforeUnmount(() => {
    pieCharts?.dispose();
    pieCharts = null;
  });
</script>

<style scoped lang="scss">
  .pie-charts {
    width: 100%;
    height: 100%;
    min-height: 240px;
  }
</style>
