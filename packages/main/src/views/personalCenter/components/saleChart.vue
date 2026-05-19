<template>
  <div ref="saleChart" class="saleChart"></div>
</template>

<script setup lang="ts">
  import * as echarts from 'echarts';

  const props = defineProps<{
    data: any;
  }>();

  const scalingFactor = computed(() => {
    const totalAmountSalesCny = props.data?.amountSalesCnyList
      ?.map((item) => item.value)
      ?.reduce((acc, cur) => acc + cur, 0);
    const totalSales = props.data?.salesList
      ?.map((item) => item.value)
      ?.reduce((acc, cur) => acc + cur, 0);
    return Math.round(totalAmountSalesCny / totalSales) + 200;
  });

  const saleChart = ref();

  const init = () => {
    const myChart = echarts.init(saleChart.value);
    const option = {
      legend: {
        bottom: 0,
        // right: 0,
        // bottom: 10,
        // orient: 'vertical',
        // align: 'right',
        // itemWidth: 13,
      },
      /* toolbox: {
        feature: {
          dataZoom: {
            yAxisIndex: 'none',
          },
          restore: {},
          saveAsImage: {},
        },
      }, */
      xAxis: {
        type: 'category',
        boundaryGap: true,
        axisLine: {
          onZero: false,
          lineStyle: {
            color: '#a1a1a1',
          },
        },
        data: props.data?.salesList?.map((item) => item.day),
        axisLabel: {
          margin: 15,
        },
        axisTick: {
          alignWithLabel: true,
        },
      },

      yAxis: {
        type: 'value',
        splitNumber: 3,
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
          },
        },
        axisLine: {
          lineStyle: {
            color: '#a1a1a1',
          },
        },
      },
      tooltip: {
        trigger: 'axis',
        formatter(params) {
          const paramsSort = params?.sort((a, b) => b.axisIndex - a.axisIndex);
          // params 是一个数组，包含了所有触发Tooltip的数据项
          let result =
            `<div style="font-size: 12px;margin-bottom: 10px">${paramsSort[0]?.axisValue}<br>` ??
            '';
          for (let i = paramsSort.length - 1; i >= 0; i--) {
            // 如果需要倒序
            const item = paramsSort[i];
            result += `<div style="display: flex; align-items: center;justify-content: space-between; gap: 30px"><div style="display: flex;align-items: center;"><div style="width: 10px;height: 10px;border-radius: 50%;margin-right: 10px;background: ${
              item.color
            };"></div>${item.seriesName}</div>${
              item.seriesName === '商品销量'
                ? item.data / scalingFactor.value
                : (item.seriesName.includes('人民币') ? '¥ ' : '$') + item.data
            }</div>`;
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
        {
          name: '商品销量',
          data: props.data?.salesList?.map((item) => item.value * scalingFactor.value),
          type: 'bar',
          itemStyle: {
            color: '#579C30',
          },
          barMaxWidth: 30,
          label: {
            show: true,
            position: 'top',
            color: '#579C30',
            formatter(params) {
              return params.value / scalingFactor.value;
            },
          },
        },
        {
          name: '销售额（美元）',
          type: 'line',
          symbol: 'circle',
          symbolSize: 6,
          smooth: true,
          // prettier-ignore
          data: props.data?.amountSalesUsdList?.map((item) => item.value?.toFixed(2)),
          lineStyle: {
            color: '#ff6666',
          },
          itemStyle: {
            color: '#ff6666',
          },
          label: {
            show: true,
            color: '#ff6666',
            formatter: '${c}',
            textBorderColor: '#fff',
            textBorderWidth: 2,
            overflow: 'breakAll',
          },
        },
        {
          name: '销售额（人民币）',
          type: 'line',
          symbol: 'circle',
          symbolSize: 6,
          smooth: true,
          // prettier-ignore
          data: props.data?.amountSalesCnyList?.map((item) => item.value?.toFixed(2)),
          lineStyle: {
            color: '#ff6666',
          },
          itemStyle: {
            color: '#ff6666',
          },
          label: {
            show: true,
            color: '#ff6666',
            position: 'top',
            formatter: '¥ {c}',
            textBorderColor: '#fff',
            textBorderWidth: 2,
          },
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
          top: 20,
          left: 100,
          right: 0,
          bottom: 50,
          /* left: 60,
          right: 50, */
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
    width: 100%;
    min-width: 400px;
    height: 600px;
  }
</style>
