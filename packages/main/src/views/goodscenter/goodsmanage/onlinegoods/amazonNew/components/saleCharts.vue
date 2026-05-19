<template>
  <div class="sale-charts">
    <div class="charts-container" ref="saleChartsContainer"></div>
  </div>
  <div class="requirement-title" v-if="props.search.type === 1">
    <!-- 跟卖异常： 1：表示异常，0：表示正常 -->
    异常标识：
    <div class="solid-circle common"></div>
    实心表示异常，
    <div class="hollow-circle common"></div>
    空心表示正常，
    <div class="dashed-hollow-circle common"></div>
    虚线空心表示无数据
  </div>
  <div class="requirement-title" v-else-if="props.search.type === 2">
    高退货率标识： 1：表示有，0：表示无
  </div>
  <div class="requirement-title" v-else-if="props.search.type === 3">
    是否丢失购物车： 1：表示丢失，0：表示正常
  </div>
  <div class="requirement-title" v-else-if="props.search.type === 4">
    是否出现有竞争力价格： 红色，表示有竞争力价格；绿色，表示页面价格。
  </div>
</template>

<script setup lang="ts">
  import * as echarts from 'echarts';
  import { useChartResized } from '@/views/personalCenter/hooks/useChartResized';
  import { legendBlue, legendGreen, legendOrange } from '@/views/personalCenter/util/icon-base64';

  const { addChartResized } = useChartResized();

  const props = withDefaults(
    defineProps<{
      type: number;
      data: any[];
      search: any;
    }>(),
    {
      data: () => [],
    }
  );

  const saleChartsContainer = ref(null);
  let lineChart: any = null;
  const legendIcons = { legendGreen, legendOrange, legendBlue };
  const updateLineChartData = () => {
    // console.log('props.data ', props.data);
    const { data } = props;
    if (!lineChart) {
      lineChart = echarts.init(saleChartsContainer.value);
    }
    let typeName;
    if (props.search.type === 0) {
      typeName = '跟卖店铺数量';
    } else if (props.search.type === 1) {
      typeName = '跟卖店铺趋势';
    } else if (props.search.type === 2) {
      typeName = '高退货趋势';
    } else if (props.search.type === 3) {
      typeName = '丢购物车趋势';
    } else if (props.search.type === 4) {
      typeName = '价格';
    }
    lineChart.setOption(
      {
        animation: false,
        tooltip: {
          trigger: 'axis',
          extraCssText: 'border-radius: 10px;',
          formatter: (params) => {
            // console.log(params);
            const [item] = params;
            return `
            ${params[0].name} <br/>
            ${
              item
                ? `
            <div style="margin-top: 6px; color: #666; font-family: 'PingFang SC';">
                ${item.marker} ${item.seriesName}:  <strong style="color: #1F1F1F;">${
                    item.value ?? ''
                  }</strong>
              </div>`
                : ''
            }
            `;
          },
        },
        grid: {
          top: 20,
          left: 13,
          right: 13,
          bottom: 20,
          containLabel: true,
        },
        // legend: {
        //   data: data.map((x, i) => {
        //     console.log(x.name);
        //     return {
        //       name: "x.name",
        //       icon: legendIcons[x.iconName],
        //     };
        //   }),
        //   bottom: 0,
        //   itemGap: 26,
        //   left: 'center',
        //   textStyle: {
        //     color: '#999',
        //   },
        // },
        xAxis: {
          type: 'category',
          data: data.map((x) => x.dateTime),
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
            position: 'left',
            name: '',
            nameLocation: 'end', // 将名称放置在轴的末端（顶部）
            nameGap: 10, // 调整名称与轴的距离
            // splitNumber: 5,
            nameTextStyle: {
              padding: [0, 0, 10, -20],
              align: 'left', // 文字左对齐
            },
            axisLine: {
              lineStyle: {
                color: '#999',
              },
            },
            axisLabel: {
              color: '#999', // 坐标文字颜色
              formatter: (value: number) => {
                // 将 value 转为 万，保留两位
                return value;
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
                return value + '%';
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
            name: typeName,
            type: 'line',
            yAxisIndex: 0,
            // data: data.map((x) => x.num),
            data: data,
            itemStyle: {
              // color: '#02B96B',
              color: (params) => {
                // console.log(params, params.data);
                // console.log(params.data.hasCompetitivenessPrice);
                return params.data.hasCompetitivenessPrice ? '#02B96B' : 'red';
              },
            },
            lineStyle: {
              color: '#02B96B',
            },
            // symbol: 'none',
            symbol: props.search.type === 4 ? 'emptyCircle' : 'circle',
            smooth: true,
          },
        ],
      },
      true
    );

    addChartResized(lineChart);

    // lineChart.on('legendselectchanged', function (params) {
    const option = lineChart.getOption();
    lineChart?.setOption(option);
  };

  // 初始化折线图，默认显示总量曲线图
  const initLineChart = () => {
    updateLineChartData(null);
  };
  watch(
    () => props.data,
    () => {
      // console.log('数据变化 重新渲染');
      updateLineChartData();
    }
  );
  // 挂载时初始化图表
  onMounted(() => {
    // console.log('onMounted');
    initLineChart();
  });

  onUnmounted(() => {
    lineChart?.dispose();
  });
</script>

<style scoped lang="scss">
  .sale-charts {
    height: 380px;
    width: 99%;
    .charts-container {
      height: 380px;
    }
  }
  .requirement-title {
    padding-left: 5px;
    // margin-top: 30px;
    margin-bottom: 6px;
    color: var(---N9, #1f1f1f);
    /* 常规/Medium 13 */
    font-size: 13px;
    font-weight: 500;
    line-height: 22px; /* 169.231% */
    display: flex;
    align-items: center;
    &:before {
      content: '*';
      color: var(---C7, #f53f3f);
      /* 常规/Regular 13 */
      margin-right: 4px;
      font-size: 13px;
      line-height: 22px; /* 169.231% */
    }
  }
  .solid-circle {
    background-color: gray; /* 圆的颜色 */
    border-radius: 50%; /* 使元素成为圆形 */
  }
  .common {
    width: 10px; /* 圆的直径 */
    height: 10px; /* 圆的直径 */
    display: inline-block;
    margin-right: 6px;
  }
  .hollow-circle {
    border: 1px solid #1f1f1f; /* 边框的宽度和颜色 */
    border-radius: 50%; /* 使元素成为圆形 */
    background-color: transparent; /* 背景色设为透明 */
  }
  .dashed-hollow-circle {
    border: 1px dashed #1f1f1f; /* 边框的宽度、样式和颜色 */
    border-radius: 50%; /* 使元素成为圆形 */
    background-color: transparent; /* 背景色设为透明 */
  }
</style>
