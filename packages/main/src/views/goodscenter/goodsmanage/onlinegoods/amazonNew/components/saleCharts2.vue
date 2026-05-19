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
    <!-- <div class="dashed-hollow-circle common"></div> -->
    <!-- 虚线空心表示无数据 -->
    空白 表示无数据
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
    // console.log('data', data);
    if (!lineChart) {
      lineChart = echarts.init(saleChartsContainer.value);
    }
    // 跟卖异常
    const line1Data = data.map((item) => {
      const tmp = { ...item };
      // console.log(tmp);
      tmp.value = 1;
      // tmp.symbol = 'emptyCircle';
      // 正常
      if (tmp.hasHijackErr === 0) {
        tmp.symbol = 'emptyCircle';
      }
      // 异常
      if (tmp.hasHijackErr === 1) {
        tmp.symbol = 'circle';
      }
      if (tmp.hasHijackErr === null) {
        tmp.symbol = 'none';
      }
      return tmp;
    });
    // console.log(line1Data, '跟卖异常');
    // 丢失购物车
    const line3Data = data.map((item) => {
      const tmp = { ...item };
      tmp.value = 3;
      // 正常
      if (tmp.hasMissingShopCart === 0) {
        tmp.symbol = 'emptyCircle';
      }
      // 异常
      if (tmp.hasMissingShopCart === 1) {
        tmp.symbol = 'circle';
      }
      if (tmp.hasMissingShopCart === null) {
        tmp.symbol = 'none';
      }
      return tmp;
    });
    const line2Data = data.map((item) => {
      const tmp = { ...item };
      tmp.value = 2;
      // 高退货正常
      if (tmp.hasReturnRisk === 0) {
        tmp.symbol = 'emptyCircle';
      }
      // 异常
      if (tmp.hasReturnRisk === 1) {
        tmp.symbol = 'circle';
      }
      if (tmp.hasReturnRisk === null) {
        tmp.symbol = 'none';
      }
      return tmp;
    });
    // console.log(line2Data, 'line2Data');
    lineChart.setOption(
      {
        animation: false,
        tooltip: {
          trigger: 'axis',
          extraCssText: 'border-radius: 10px;pointer-events: auto;',
          confine: true,
          enterable: true,
          hideDelay: 200,
          // showDelay: 500,
          // 稳定位置
          position: (point, params, dom, rect, size) => {
            // 固定在鼠标右下方
            return [point[0] - 3, point[1] - 3];
          },
          // 不使用内置动画
          formatter: (params) => {
            // const obj = params[0].data;
            // console.log('formatter', obj);
            const [item] = params;
            // console.log('formatter', params);
            const itemData = item.data;
            // console.log(itemData);
            let fmtStr = `
            ${params[0].name} 异常趋势 <br/> 
               <div style="margin-top: 6px; color: #666; font-family: 'PingFang SC';">
                ${params[2].marker} 丢失购物车:  <span style="color: ${
              itemData.hasMissingShopCart === 1 ? 'red' : '#666'
            };"> ${itemData.hasMissingShopCartDesc ?? ''}</span>
            </div>
            <div style="margin-top: 6px; color: #666; font-family: 'PingFang SC';">
                ${params[1].marker} 退货标识: <span style="color: ${
              itemData.hasReturnRisk === 1 ? 'red' : '#666'
            };">${itemData.hasReturnRiskDesc ?? ''}</span>
            </div>
            <div style="margin-top: 6px; color: #666; font-family: 'PingFang SC';">
                ${params[0].marker} 跟卖异常:  <span style="color: ${
              itemData.hasHijackErr === 1 ? 'red' : '#666'
            };">${itemData.hasHijackErrDesc ?? ''}</span>
            </div>
            `;
            if (itemData.shopNum > 0) {
              fmtStr += `<div style="margin-top: 12px; color: #666; font-family: 'PingFang SC';">
                   跟卖店铺数量:  ${itemData.shopNum ?? ''}
              </div>`;
              const entries = Object.entries(itemData.shopMap);
              for (let i = 0; i < entries.length; i += 1) {
                const [key, value] = entries[i];
                // console.log(key, value);
                fmtStr += `<div style="margin-top: 6px; color: #666; font-family: 'PingFang SC';cursor:'pointer'">
                  <a href=${value}" target="_blank" >
                    ${key}
                  </a>
              </div>`;
              }
            }
            return fmtStr;
          },
        },
        grid: {
          top: 30,
          left: 13,
          right: 21,
          bottom: 20,
          containLabel: true,
        },
        legend: {
          show: true,
          // data: ['丢失购物车', '退货标识', '跟卖异常'],
        },
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
            max: 3.5,
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
            name: '跟卖异常',
            type: 'line',
            yAxisIndex: 0,
            // data: data.map((x) => x.num),
            data: line1Data,
            itemStyle: {
              color: '#02B96B',
              // color: (params) => {
              //   console.log('color', params.data);
              //   // console.log(params.data.hasCompetitivenessPrice);
              //   return params.data.hasCompetitivenessPrice ? '#02B96B' : 'red';
              // },
            },
            lineStyle: {
              color: '#02B96B',
            },
            // symbol: 'none',
            // symbol: props.search.type === 1 ? 'emptyCircle' : 'circle',
            symbolSize: 12,
            smooth: true,
          },
          {
            name: '退货标识',
            type: 'line',
            yAxisIndex: 0,
            // data: data.map((x) => x.num),
            data: line2Data,
            itemStyle: {
              color: '#e74c3c',
              // color: (params) => {
              //   // console.log(params, params.data);
              //   // console.log(params.data.hasCompetitivenessPrice);
              //   return params.data.hasCompetitivenessPrice ? '#02B96B' : 'red';
              // },
            },
            lineStyle: {
              color: '#e74c3c',
            },
            // symbol: 'none',
            // symbol: props.search.type === 4 ? 'emptyCircle' : 'circle',
            symbolSize: 12,
            smooth: true,
          },
          {
            name: '丢失购物车',
            type: 'line',
            yAxisIndex: 0,
            // data: data.map((x) => x.num),
            data: line3Data,
            itemStyle: {
              color: '#5271d6',
              // color: (params) => {
              //   // console.log(params, params.data);
              //   // console.log(params.data.hasCompetitivenessPrice);
              //   return params.data.hasCompetitivenessPrice ? '#02B96B' : 'red';
              // },
            },
            lineStyle: {
              color: '#5271d6',
            },
            // symbol: 'none',
            symbolSize: 12,
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
      pointer-events: auto;
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
