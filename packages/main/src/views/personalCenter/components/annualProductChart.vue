<template>
  <div ref="annualProductChart" class="annualProductChart"></div>
</template>

<script setup lang="ts">
  import * as echarts from 'echarts';

  import { ProductSkuCategoryCountBean } from '@/api/product/data-contracts';

  const props = defineProps<{
    data: ProductSkuCategoryCountBean;
  }>();
  const annualProductChart = ref();
  const colorList = [
    '#3F97FF',
    '#B87D81',
    '#36CBC9',
    '#975EE4',
    '#FBD337',
    '#73B3FF',
    '#EB9FA4',
    '#7DB8B4',
    '#B18BE4',
    '#DCB481',
    '#7D81B8',
    '#88D9BD',
    '#E070B0',
    '#FFCF73',
    '#EB7179',
    '#87D6F8',
  ];
  const init = () => {
    const myChart = echarts.init(annualProductChart.value);
    const option = {
      xAxis: {
        type: 'category',
        data: props.data?.map((item) => item.lineName),
        axisTick: false,
        axisLine: {
          show: false,
          lineStyle: {
            color: '#63666A',
          },
        },
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
      label: {
        show: true,
        position: 'top',
      },
      series: [
        {
          data: props.data?.map((item, index) => {
            return {
              value: item.productNumber,
              itemStyle: {
                color: colorList[index],
              },
            };
          }),
          type: 'bar',
          barMaxWidth: 18,
        },
      ],
    };
    myChart.setOption(option);
  };
  watch(
    () => props.data,
    () => {
      init();
    }
  );
</script>

<style scoped lang="scss">
  .annualProductChart {
    width: 100%;
    height: 100%;
  }
</style>
