<template>
  <div class="in-stock-total-amount">
    <!-- 饼图容器 -->
    <div class="pie-chart-wrap">
      <div class="title">周转分类分析（件数）</div>
      <div class="pie-chart" ref="pieChartRef"></div>
      <div class="current-tag">
        <el-tag :closable="tagName !== '全部'" type="primary" @close="handlerClose">
          {{ tagName }}
        </el-tag>
      </div>
    </div>
    <!-- 折线图容器 -->
    <div class="line-chart" ref="lineChartRef"></div>
  </div>
</template>

<script setup lang="ts">
  import * as echarts from 'echarts';
  import { LabelTrendAnalysisBean, SupplyChainLabelAnalysisBean } from '@/api/bi/data-contracts';
  import { formatNumber, formatRate, formatNumberObj } from '@/views/bi/utils/utils';
  import { legendBlue, legendGray, legendGreen } from '@/views/personalCenter/util/icon-base64';
  import { useResizeObserver } from '@vueuse/core';

  const props = withDefaults(
    defineProps<{
      labelList?: SupplyChainLabelAnalysisBean[];
      labelTrendList?: LabelTrendAnalysisBean[];
    }>(),
    {
      labelList: Array,
      labelTrendList: Array,
    }
  );

  const pieChartRef = ref(null);
  const lineChartRef = ref(null);
  const colors = [
    '#258DFF', // 蓝色
    '#02B96B', // 绿色
    '#FF9F22', // 橙色
    '#FF4D4D', // 红色
    '#FFEB3B', // 黄色
    '#9C27B0', // 紫色
    '#3F51B5', // 靛蓝色
    '#00BCD4', // 青色
    '#4CAF50', // 草绿色
    '#FF5722', // 深橙色
  ];

  // 饼图数据
  const pieChartData = computed(() => {
    return props.labelList.map((x, i) => {
      return {
        value: x.totalStockQty,
        name: x.inventoryLabel,
        percent: formatRate(x.totalStockQtyRate).toString(),
        color: colors[i],
      };
    });
  });

  const xAxisData = computed(() => {
    return props.labelTrendList.map((x) => x.period);
  });

  const buildData = () => {
    const obj = {};
    obj.total = {
      orderData: props.labelTrendList.map((x) => {
        return x.labelList.map((x) => x.saleQty).reduce((p, c) => p + c, 0);
      }),
      stockData: props.labelTrendList.map((x) => {
        return x.labelList.map((x) => x.totalStockQty).reduce((p, c) => p + c, 0);
      }),
      xAxisData: xAxisData.value,
    };
    props.labelList.forEach((label) => {
      const labelName = label.inventoryLabel;
      obj[labelName] = {
        orderData: props.labelTrendList.map((x) => {
          return x.labelList.find((x) => x.inventoryLabel === labelName)?.saleQty || 0;
        }),
        stockData: props.labelTrendList.map((x) => {
          return x.labelList.find((x) => x.inventoryLabel === labelName)?.totalStockQty || 0;
        }),
        xAxisData: xAxisData.value,
      };
    });
    return obj;
  };

  const currentSeries = ref('total'); // 默认显示总量曲线图
  const tagName = computed(() => {
    return currentSeries.value === 'total' || !currentSeries.value ? '全部' : currentSeries.value;
  });

  const handlerClose = () => {
    handlePieClick('total');
  };

  let pieChart: echarts.ECharts | null = null;

  // 初始化饼图
  const initPieChart = () => {
    if (!pieChart) {
      pieChart = echarts.init(pieChartRef.value);

      pieChart.on('click', (params) => {
        handlePieClick(params.name);
      });
      useResizeObserver(pieChartRef, () => {
        pieChart!.resize();
      });
    }

    pieChart.setOption({
      tooltip: {
        trigger: 'item',
        formatter: (params) => {
          const item = pieChartData.value.find((x) => x.name === params.name);
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
            percent: {
              color: '#999',
            },
          },
        },
      },
      series: [
        {
          center: ['50%', '40%'],
          name: '库存金额',
          type: 'pie',
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center',
          },
          labelLine: {
            show: false,
          },
          radius: [100, 140].map((x) => x / 2),
          data: pieChartData.value.map((x) => {
            return {
              value: x.value,
              name: x.name,
              itemStyle: {
                color: x.color,
                borderWidth: 3,
                borderColor: '#fff',
              },
            };
          }),
        },
      ],
    });
  };

  const handlePieClick = (name) => {
    currentSeries.value = name;
    updateLineChartData(name);
  };

  let lineChart: echarts.ECharts | null = null;
  const updateLineChartData = (series: string) => {
    const data = buildData();
    const currentData = data[series] || data.total;
    if (!currentData) {
      return;
    }
    const { orderData, stockData, xAxisData } = currentData;
    if (!lineChart) {
      lineChart = echarts.init(lineChartRef.value);
      useResizeObserver(lineChartRef, () => {
        lineChart!.resize();
      });
      lineChart.on('legendselectchanged', function (params) {
        const option = lineChart!.getOption();
        option.legend[0].data.forEach((item) => {
          if (item.name === orderName) {
            item.icon = params.selected[orderName] ? legendGreen : legendGray;
          } else if (item.name === stockName) {
            item.icon = params.selected[stockName] ? legendBlue : legendGray;
          }
        });

        lineChart!.setOption(option);
      });
    }
    // console.log(orderData, stockData);

    const minOrderValue = Math.min(...orderData);
    const minStockValue = Math.min(...stockData);

    const transformOrderDate = orderData.map((item) => item - minOrderValue);
    // console.log('transformOrderDate=', transformOrderDate);
    const transformStockDate = stockData.map((item) => item - minStockValue);
    // console.log('transformStockDate=', transformStockDate);

    const orderName = '订单量';
    const stockName = '库存件数';

    const option = {
      tooltip: {
        trigger: 'axis',
        extraCssText: 'border-radius: 10px;',
        formatter: (params) => {
          // console.log(params);
          let tooltipText = `<div style="color: #666; font-family: 'PingFang SC';">${params[0].name}</div>`;
          params.forEach((item) => {
            let realValue = item.value;
            if (item.seriesName === orderName) {
              realValue += minOrderValue;
            } else if (item.seriesName === stockName) {
              realValue += minStockValue;
            }
            const valueInWan = formatNumber(realValue / 1_0000, 2);
            tooltipText += `
            <div  style="margin-top: 6px; color: #666; font-size: 12px; font-family: 'PingFang SC';">
                ${item.marker} ${item.seriesName}:  <strong style="color: #1F1F1F;">${valueInWan}${
              valueInWan && valueInWan !== '-' ? 'W' : ''
            } </strong>
            </div>
           `;
          });
          return tooltipText;
        },
      },
      grid: {
        top: 10,
        left: 10,
        right: 10,
        bottom: 34,
        containLabel: true,
      },
      legend: {
        data: [
          {
            name: orderName,
            icon: legendGreen,
          },
          {
            name: stockName,
            icon: legendBlue,
          },
        ],
        bottom: 0,
        itemGap: 26,
        left: 'center',
        textStyle: {
          color: '#999',
        },
      },
      xAxis: {
        type: 'category',
        data: xAxisData,
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
          alignTicks: true,
          // min: 'dataMin',
          // min: Math.min(...orderData) * 0.9,
          axisLine: {
            lineStyle: {
              color: '#999',
            },
          },
          axisLabel: {
            color: '#999', // 坐标文字颜色
            formatter: (value: number) => {
              return `${formatNumber((value + minOrderValue) / 1_0000, 2)}W`;
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: [3, 6], // 虚线
              color: '#ececec', // 分割线颜色
            },
          },
          axisTick: {
            show: false, // 不显示坐标圆点
          },
        },
        {
          type: 'value',
          position: 'right',
          // min: Math.min(...stockData) * 0.9,
          // min: 'dataMin',
          alignTicks: true,
          axisLine: {
            lineStyle: {
              color: '#999',
            },
          },
          axisLabel: {
            color: '#999', // 坐标文字颜色
            formatter: (value: number) => {
              return `${formatNumber((value + minStockValue) / 1_0000, 0)}W`;
            },
          },
          splitLine: {
            show: false,
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
          name: orderName,
          type: 'line',
          yAxisIndex: 0, // 使用左侧坐标轴
          // data: orderData,
          data: transformOrderDate,
          smooth: true,
          itemStyle: {
            color: '#02B96B', // 设置颜色
          },
          lineStyle: {
            color: '#02B96B', // 设置线条颜色
          },
          symbol: 'none', // 不显示数据点圆点
        },
        {
          name: stockName,
          type: 'line',
          smooth: true,
          yAxisIndex: 1, // 使用右侧坐标轴
          // data: stockData,
          data: transformStockDate,
          itemStyle: {
            color: '#258DFF', // 设置颜色
          },
          lineStyle: {
            color: '#258DFF', // 设置线条颜色
          },
          symbol: 'none', // 不显示数据点圆点
        },
      ],
    };
    // console.log(option);
    lineChart.setOption(option);
  };

  // 初始化折线图，默认显示总量曲线图
  const initLineChart = () => {
    updateLineChartData('total');
  };

  watch(
    () => [pieChartData.value],
    () => {
      initPieChart();
    }
  );
  watch(
    () => [buildData()],
    () => {
      updateLineChartData(currentSeries.value);
    }
  );

  // 挂载时初始化图表
  onMounted(() => {
    initPieChart();
    initLineChart();
  });
</script>

<style scoped lang="scss">
  .in-stock-total-amount {
    display: flex;
    box-sizing: border-box;
    position: relative;
    border-radius: 10px;
    border: 1px solid var(---N3, #ededed);
    padding: 20px;
    height: 290px;
    gap: 20px;

    .pie-chart-wrap {
      width: 400px;
      height: 100%;
      display: flex;
      flex-direction: column;
      position: relative;

      .current-tag {
        position: absolute;
        top: 0;
        right: 0px;

        :deep(.el-tag) {
          height: 20px;
          font-size: 12px;
          border-color: transparent;
          padding: 0 4px;
        }
      }

      .title {
        color: var(---N9, #1f1f1f);
        font-size: 14px;
        font-weight: 500;
        line-height: 22px;
        font-family: 'PingFang SC Medium';
      }

      .pie-chart {
        width: 100%;
        min-height: 0;
        flex: 1;
      }
    }

    .line-chart {
      min-width: 0;
      flex: 1;
      height: 100%;
    }
  }
</style>
