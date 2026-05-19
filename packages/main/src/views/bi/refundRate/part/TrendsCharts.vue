<template>
  <div ref="chartContainer"></div>
</template>

<script lang="ts" setup>
  import * as echarts from 'echarts';

  const chartContainer = ref<HTMLDivElement | null>(null);

  const createChart = (container: HTMLDivElement) => {
    const chart = echarts.init(container);
    const option = {
      title: {
        text: '趋势图示例',
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'line',
          smooth: true,
        },
      ],
    };
    chart.setOption(option);
  };

  onMounted(() => {
    if (chartContainer.value) {
      createChart(chartContainer.value);
    }
  });
</script>
