<template>
  <div class="sales-data">
    <div class="sales-data__title">设备端访问占比</div>
    <div class="chart-container">
      <div class="chart-area" id="deviceViewChart"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import * as echarts from 'echarts/core';
  import { PieChart } from 'echarts/charts';
  import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
  } from 'echarts/components';
  // 标签自动布局、全局过渡动画等特性
  import { LabelLayout, UniversalTransition } from 'echarts/features';
  // 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
  import { CanvasRenderer } from 'echarts/renderers';

  echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    PieChart,
    LabelLayout,
    UniversalTransition,
    CanvasRenderer,
  ]);
  const initEcharts = (el: HTMLElement) => {
    const chart = echarts.init(el);
    window.addEventListener('resize', () => {
      chart.resize();
    });
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      color: ['#02b96b', '#258DFF', '#FF9F22'],
      legend: {
        data: ['移动端', '桌面端', '平板端'],
        bottom: 0,
        textStyle: {
          fontSize: 12,
          color: '#999',
        },
        // itemWidth: 22,
        // itemHeight: 12,
        itemGap: 20,
      },
      grid: {
        // top: '40px',
        // width: '85%',
        height: 'auto',
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          // radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            // borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2,
          },
          label: {
            show: true,
            // position: 'center',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 20,
              fontWeight: 'bold',
            },
          },
          // labelLine: {
          //   show: true,
          // },
          data: [
            { value: 1048, name: '移动端' },
            { value: 735, name: '桌面端' },
            { value: 580, name: '平板端' },
          ],
        },
      ],
    };
    chart.setOption(option);
    return chart;
  };
  const init = () => {
    initEcharts(document.getElementById('deviceViewChart') as HTMLElement);
  };
  onMounted(() => {
    init();
  });
</script>

<style scoped lang="scss">
  .sales-data {
    background: #fff;
    border-radius: 10px;
    padding: 24px;
    .sales-data__title {
      font-size: 16px;
      font-weight: 500;
      color: #1f1f1f;
      margin-bottom: 24px;
      padding-left: 8px;
      display: flex;
      align-items: center;
      &::before {
        content: '';
        display: inline-block;
        width: 4px;
        height: 16px;
        background-color: #02b96b;
        margin-right: 8px;
        border-radius: 15px;
      }
      .operation {
        margin-left: auto;
        display: flex;
        align-items: center;
        font-size: 14px;
        color: #1f1f1f;
      }
    }
    .chart-container {
      width: 100%;
      .chart-area {
        width: 100%;
        height: 390px;
      }
    }
  }
</style>
