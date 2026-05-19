<template>
  <div ref="rankChart" class="rankChart"></div>
</template>

<script setup lang="ts">
  import * as echarts from 'echarts';

  const props = defineProps<{
    data: any;
  }>();

  const rankChart = ref();

  const init = () => {
    const myChart = echarts.init(rankChart.value);
    const option = {
      toolbox: {
        feature: {
          dataZoom: {
            yAxisIndex: 'none',
          },
          restore: {},
          saveAsImage: {},
        },
      },
      xAxis: {
        type: 'category',
        data: props.data?.map((item) => item.time),
        /* axisLabel: {
          showMaxLabel: true, // 显示最后一个标签
        }, */
      },
      yAxis: {
        type: 'value',
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
          },
        },
      },
      tooltip: {
        trigger: 'axis',
        style: {
          fontSize: '12px',
        },
      },
      series: [
        {
          smooth: true,
          data: props.data?.map((item) => item.topNum),
          type: 'line',
        },
      ],
      grid: {
        left: 0,
        right: 40,
        bottom: 0,
        top: 40,
        containLabel: true, // 确保标签不超出边界
      },
      dataZoom: [
        {
          type: 'inside',
          show: true,
          start: 0,
          end: 100,
        },
      ],
    };
    myChart.setOption(option);
    window.addEventListener('resize', () => {
      if (myChart) {
        myChart.resize();
      }
    });
  };

  onMounted(() => {
    init();
  });
  watch(
    () => props.data,
    () => {
      init();
    }
  );
</script>

<style scoped lang="scss">
  .rankChart {
    //width: 200px;
    //height: 200px;
    width: 100%;
    height: 300px;
  }
</style>
