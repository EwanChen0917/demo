<template>
  <div class="station-container">
    <div class="left">
      <section ref="stationWordCloudRef" class="word-cloud-chart"></section>
    </div>
    <div class="right">
      <section ref="afterSaleBarLineChartRef" class="after-sale-bar-chart">
        <div></div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useStationWordCloud } from '@/views/personalCenter/hooks/useWordCloud';
  import * as echarts from 'echarts';
  import { OtherAfterSalesAnalysisBean } from '@/api/bi/data-contracts';
  import { useChartResized } from '@/views/personalCenter/hooks/useChartResized';
  import { formatNumberObj, formatRate } from '@/views/bi/utils/utils';
  import { legendGray, legendOrange } from '@/views/personalCenter/util/icon-base64';

  const { addChartResized } = useChartResized();

  const props = withDefaults(
    defineProps<{
      data: OtherAfterSalesAnalysisBean;
    }>(),
    {
      data: {},
    }
  );
  const wordCloudData = computed(() => {
    return (props.data?.tagCloudList || []).map((x) => {
      return {
        name: x.tagName,
        qty: x.qty || 0,
        value: x.weight || 0,
      };
    });
  });

  const { domRef: stationWordCloudRef, initChart: initStationWordCloudChart } =
    useStationWordCloud();

  watch(
    () => wordCloudData.value,
    () => {
      initStationWordCloudChart(wordCloudData.value);
    }
  );

  onMounted(() => {
    initStationWordCloudChart(wordCloudData.value);
  });

  const afterSaleBarLineMockData = computed(() => {
    return (props.data?.refundTrandList || []).map((x) => {
      return {
        time: x.period,
        returnOrderCount: x.refundAmount,
        returnRate: x.refundAmountRate,
      };
    });
  });

  const afterSaleBarLineChartRef = ref();
  let afterSaleBarLineChartInstance: echarts.ECharts | null = null;
  const initAfterSaleBarLineChart = (data) => {
    if (!afterSaleBarLineChartRef.value) return;

    afterSaleBarLineChartInstance = echarts.init(afterSaleBarLineChartRef.value);

    const returnOrderCountList = data.map((x) => x.returnOrderCount);
    const returnRateList = data.map((x) => x.returnRate);

    const option = {
      grid: {
        left: 70,
        right: 50,
        top: 15,
        bottom: 65,
      },
      tooltip: {
        trigger: 'axis',
        extraCssText: 'border-radius: 10px;',
        // 第[1]个tooltip 显示加上%
        formatter(params) {
          let tooltipText = `<div  style="color: #666; font-family: 'PingFang SC';">${params[0].name}</div>`;
          params.forEach((item, index) => {
            tooltipText += `
            <div  style="margin-top: 6px; color: #666; font-size: 12px; font-family: 'PingFang SC';">
                ${item.marker} ${item.seriesName}:
                ${
                  index === 0
                    ? `<strong  style="color: #1F1F1F;">${formatNumberObj(
                        item.value
                      ).toString()}</strong>`
                    : `<strong  style="color: #1F1F1F;">${formatRate(
                        item.value
                      ).toString()}</strong>`
                }

            </div>
           `;
          });
          return tooltipText;
        },
      },
      legend: {
        data: [{ name: '退款额' }, { name: '退款率', icon: legendOrange }],
        bottom: 0,
        itemGap: 26,
      },
      xAxis: [
        {
          type: 'category',
          data: data.map((x) => x.time),
          axisTick: {
            lineStyle: {
              color: '#e6e6e6',
            },
          },
          axisLine: {
            lineStyle: {
              color: '#e6e6e6',
            },
          },
          axisLabel: {
            color: '#999',
          },
          axisPointer: {
            type: 'shadow',
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          position: 'left',
          axisLabel: {
            formatter(value) {
              const r = formatNumberObj(value);
              return `${r.value}${r.unit}`;
            },
          },
          splitLine: {
            lineStyle: {
              type: [3, 4],
              color: '#e6e6e6',
            },
          },
        },
        {
          type: 'value',
          position: 'right',
          alignTicks: true,
          axisLabel: {
            formatter(value) {
              return formatRate(value).toString();
            },
          },
          splitLine: {
            lineStyle: {
              type: [3, 4],
              color: '#e6e6e6',
            },
          },
        },
      ],
      series: [
        {
          name: '退款额',
          type: 'bar',
          data: returnOrderCountList,
          barWidth: 15,
          itemStyle: {
            color: '#02B96B',
            borderRadius: [4, 4, 0, 0],
          },
        },
        {
          name: '退款率',
          type: 'line',
          yAxisIndex: 1,
          data: returnRateList,
          smooth: false,
          symbolSize: 0,
          itemStyle: {
            color: '#FF9F22',
          },
          lineStyle: {
            width: 2,
          },
        },
      ],
    };
    afterSaleBarLineChartInstance.setOption(option);

    afterSaleBarLineChartInstance.on('legendselectchanged', function (params) {
      const option = afterSaleBarLineChartInstance.getOption();
      option.legend[0].data.forEach((item) => {
        // console.log(params.selected)
        if (item.name === '退款率') {
          item.icon = params.selected[item.name] ? legendOrange : legendGray;
        }
      });

      afterSaleBarLineChartInstance.setOption(option);
    });
  };

  watch(
    () => afterSaleBarLineMockData.value,
    () => {
      initAfterSaleBarLineChart(afterSaleBarLineMockData.value);
    }
  );
  onMounted(() => {
    initAfterSaleBarLineChart(afterSaleBarLineMockData.value);
    addChartResized(afterSaleBarLineChartInstance);
  });
</script>

<style scoped lang="scss">
  .station-container {
    display: flex;
    align-items: stretch;
    width: 100%;
    gap: 16px;

    section {
      width: 100%;
      height: 100%;
    }

    .left {
      flex: 1;
      height: 385px;
      min-width: 250px;
      border-radius: 10px;
      border: 1px solid var(---N3, #ededed);
    }

    .right {
      flex: 3;
      border: 1px solid transparent;
    }
  }
</style>
