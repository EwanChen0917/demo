<template>
  <div ref="categoryChart" class="categoryChart"></div>
</template>

<script setup lang="ts">
  import * as echarts from 'echarts';
  import { ProductSkuCategoryCountBean } from '@/api/product/data-contracts';

  const props = defineProps<{
    data: ProductSkuCategoryCountBean;
  }>();

  const categoryChart = ref();

  const init = () => {
    const myChart = echarts.init(categoryChart.value);
    const option = {
      tooltip: {
        trigger: 'item',
      },
      legend: {
        right: 0,
        bottom: 10,
        orient: 'vertical',
        align: 'right',
        itemWidth: 13,
      },
      series: [
        {
          type: 'pie',
          radius: ['40%', '80%'],
          right: '30%',
          top: 10,
          avoidLabelOverlap: false,
          label: {
            formatter: `{d}%`,
          },
          emphasis: {
            label: {
              show: true,
            },
          },
          // labelLayout(params) {
          //   const isLeft = params.labelRect.x < myChart.getWidth() / 2;
          //   const points = params.labelLinePoints;
          //   // Update the end point.
          //   points[2][0] = isLeft
          //     ? params.labelRect.x
          //     : params.labelRect.x + params.labelRect.width;
          //   return {
          //     labelLinePoints: points,
          //     verticalAlign: 'bottom',
          //   };
          // },
          data: props.data?.map((item) => {
            return { value: item?.productSkuNumber, name: item?.categoryName };
          }),
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
  .categoryChart {
    width: 100%;
    height: 210px;
  }
</style>
