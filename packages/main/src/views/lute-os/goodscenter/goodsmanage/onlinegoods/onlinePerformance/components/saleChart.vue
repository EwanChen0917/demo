<template>
  <div ref="saleChart" class="saleChart"></div>
</template>

<script setup lang="ts">
  import * as echarts from 'echarts';

  const props = defineProps<{
    data: any;
  }>();

  const saleChart = ref();

  const init = () => {
    const myChart = echarts.init(saleChart.value);
    const option = {
      legend: {
        // right: 0,
        // bottom: 10,
        // orient: 'vertical',
        // align: 'right',
        // itemWidth: 13,
      },
      /* xAxis: {
        type: 'category',
        data: props.data?.map((item) => item.time),
        axisTick: false,
        axisLine: {
          show: false,
          lineStyle: {
            color: '#63666A',
          },
        },
      }, */
      toolbox: {
        feature: {
          dataZoom: {
            yAxisIndex: 'none',
          },
          restore: {},
          saveAsImage: {},
        },
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          axisLine: { onZero: true },
          data: props.data?.map((item) => item.time),
          axisLabel: {
            margin: 25,
          },
        },
        {
          gridIndex: 1,
          type: 'category',
          boundaryGap: false,
          axisLine: { onZero: true },
          data: props.data?.map((item) => item.time),
          position: 'top',
          axisLabel: {
            show: false,
          },
        },
      ],
      /* yAxis: {
        type: 'value',
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
          },
        },
      }, */
      yAxis: [
        {
          type: 'value',
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
            },
          },
        },
        {
          gridIndex: 1,
          type: 'value',
          inverse: true,
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
            },
          },
        },
      ],
      tooltip: {
        trigger: 'axis',
        formatter(params) {
          const paramsSort = params?.sort((a, b) => b.axisIndex - a.axisIndex);
          // params 是一个数组，包含了所有触发Tooltip的数据项
          let result = `<div>${paramsSort[0]?.axisValue}<br>` ?? '';
          for (let i = paramsSort.length - 1; i >= 0; i--) {
            // 如果需要倒序
            const item = paramsSort[i];
            result += `<div style="display: flex; align-items: center"><div style="width: 10px;height: 10px;border-radius: 50%;margin-right: 5px;background: ${item.color};"></div>${item.seriesName}：${item.data}</div>`;
          }
          result += `</div>`;
          return result;
        },
      },
      axisPointer: {
        link: [
          {
            xAxisIndex: 'all',
          },
        ],
      },
      series: [
        /* {
          name: '销售额',
          data: props.data?.map((item) => item.amount),
          type: 'line',
          showSymbol: 'none',
          lineStyle: {
            color: '#5B8FF9',
          },
        },
        {
          name: '销量',
          data: props.data?.map((item) => item.num),
          type: 'line',
          showSymbol: 'none',
        }, */

        {
          name: '销售额',
          type: 'line',
          symbolSize: 8,
          smooth: true,
          // prettier-ignore
          data: props.data?.map((item) => item.amount),
          lineStyle: {
            color: '#883145',
          },
          itemStyle: {
            color: '#883145',
          },
        },
        {
          name: '销量',
          type: 'line',
          xAxisIndex: 1,
          yAxisIndex: 1,
          symbolSize: 8,
          smooth: true,
          // prettier-ignore
          data: props.data?.map((item) => item.num),
        },
      ],
      /* grid: {
        left: 0,
        right: 40,
        bottom: 0,
        top: 40,
        containLabel: true, // 确保标签不超出边界
      }, */
      grid: [
        {
          left: 60,
          right: 50,
          height: '35%',
        },
        {
          left: 60,
          right: 50,
          top: '55%',
          height: '35%',
        },
      ],
      /* dataZoom: [
        {
          type: 'inside',
          show: true,
          start: 0,
          end: 100,
        },
      ], */
      dataZoom: [
        {
          show: true,
          realtime: true,
          xAxisIndex: [0, 1],
        },
        {
          type: 'inside',
          realtime: true,
          xAxisIndex: [0, 1],
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
  .saleChart {
    margin-top: 20px;
    width: 100%;
    height: 600px;
  }
</style>
