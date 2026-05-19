<template>
  <div class="sales-data" v-loading="loading">
    <div class="sales-data__title">流量来源分布</div>
    <div class="chart-container">
      <div class="chart-area" id="trafficSourceChart"></div>
      <div class="table-chart">
        <el-table :data="data" size="small" max-height="256px">
          <el-table-column prop="trafficSource" label="来源" align="center">
            <template #default="scope">
              <div
                :style="{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  columnGap: '6px',
                }"
              >
                <div
                  class="circle"
                  :style="{
                    width: '7px',
                    height: '7px',
                    backgroundColor: colorList[scope.$index],
                    borderRadius: '50%',
                  }"
                ></div>
                <span>{{ scope.row.trafficSource || '未知' }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            :prop="'sessionsTotalRate'"
            label="占比"
            class-name="text-din"
            align="center"
            :formatter="
              (row) => {
                return row.sessionsTotalRate.toLocaleString('en-US', {
                  style: 'percent',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                });
              }
            "
          />
        </el-table>
      </div>
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
  import { formatPercent } from '../../utils/utils';

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
  const loading = inject('loading', ref(false));
  const detailData = inject('detailData', ref<any>({}));
  const data = computed(() => {
    return detailData.value.trafficAnalysis?.trafficSourceDists || [];
  });
  const colorList = [
    '#02B96B',
    '#4E68FF',
    '#258DFF',
    '#0CC1E2',
    '#FF9F22',
    '#A55BF5',
    '#FF7956',
    '#FFB922 ',
    '#F5F5F5',
    '#F7F7F7',
  ];
  let chart: any = null;
  const initEcharts = (el: HTMLElement) => {
    if (!chart) {
      chart = echarts.init(el);
      window.addEventListener('resize', () => {
        chart.resize();
      });
    }
    const option = {
      tooltip: {
        trigger: 'item',
      },
      // 2. 调整图表主体区域（为图例留出空间）
      grid: {
        right: '60px', // 右侧留出20%空间给图例
        left: '60px',
        containLabel: true,
      },
      color: colorList,
      legend: {
        show: false,
        data: data.value.map((item: any) => item.trafficSource),
        orient: 'vertical', // 图例纵向排列
        right: 10, // 距离右侧容器的距离（单位px或百分比）
        top: 'center', // 垂直居中
        align: 'left', // 图例文本左对齐
        textStyle: {
          fontSize: 12,
          color: '#999',
        },
        itemGap: 20,
      },
      series: [
        {
          name: '流量来源',
          type: 'pie',
          center: ['50%', '50%'],
          radius: ['45%', '65%'],
          avoidLabelOverlap: false,
          itemStyle: {
            // borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2,
          },
          emphasis: {
            label: {
              show: false,
              fontSize: 20,
              fontWeight: 'bold',
            },
          },
          label: {
            // alignTo: 'edge',
            show: false,
            formatter: '{name|{c}%}\n{name|{b}}',
            minMargin: 5,
            edgeDistance: 10,
            lineHeight: 15,
            rich: {
              name: {
                fontSize: 12,
                color: '#1f1f1f',
                lineHeight: 20,
              },
            },
          },
          // labelLine: {
          //   length: 15,
          //   length2: 0,
          //   maxSurfaceAngle: 80,
          // },
          data:
            data.value.map((item: any) => ({
              value: formatPercent(item.sessionsTotalRate),
              total: item.sessionsTotal,
              name: item.trafficSource,
            })) || [],
        },
      ],
    };
    chart.setOption(option);
  };
  const init = () => {
    initEcharts(document.getElementById('trafficSourceChart') as HTMLElement);
  };
  watch(data, (newVal) => {
    if (newVal) {
      init();
    }
  });
</script>

<style scoped lang="scss">
  .sales-data {
    background: #fff;
    border-radius: 10px;
    padding: 24px;
    .sales-data__title {
      font-family: 'PingFang SC Medium', sans-serif;
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
      display: flex;
      width: 100%;
      .chart-area {
        width: 0;
        flex: 1;
        height: 189px;
      }
      .table-chart {
        transform: translateY(-37px);
        flex: none;
        width: 216px;
        height: 100%;
        :deep(.el-table__header-wrapper) {
          margin-bottom: 4px;
        }
        :deep(.el-table thead tr) {
          background-color: transparent;
        }
        :deep(.el-table th) {
          padding: 3px 0;
          background-color: transparent;
          color: var(---N8, #666);
          /* 较弱/Regular 12 */
          font-family: 'PingFang SC';
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: 20px; /* 166.667% */
        }
        :deep(.el-table td) {
          padding: 3px 0;
          color: var(---N9, #1f1f1f);

          /* 较弱/Regular 12 */
          font-family: 'PingFang SC';
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: 20px; /* 166.667% */
        }
        :deep(.el-table td.el-table__cell) {
          border-bottom: none;
        }
      }
    }
  }
</style>
