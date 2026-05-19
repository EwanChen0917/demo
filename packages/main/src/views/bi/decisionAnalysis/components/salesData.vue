<template>
  <div class="sales-data" v-loading="loading">
    <div class="sales-data__title">
      销售数据分布分析
      <span class="operation">
        <el-radio-group v-model="type" @change="init">
          <el-radio-button value="1">销售额</el-radio-button>
          <el-radio-button value="2">毛利额</el-radio-button>
        </el-radio-group>
      </span>
    </div>
    <div class="chart-container">
      <div class="chart-area">
        <div class="chart-warpper">
          <div class="pie-chart" id="sales-area"></div>
          <div class="total" v-if="data1Total.money">
            <div class="total-title">{{ type === '1' ? '销售额' : '毛利额' }}</div>
            <div class="total-value">
              {{ data1Total.money }}
              <span class="unit">{{ data1Total.unit }}</span>
            </div>
          </div>
        </div>
        <div class="table-chart">
          <el-table :data="data1" size="small" max-height="256px">
            <el-table-column prop="area" label="来源分布">
              <template #default="scope">
                <div :style="{ display: 'flex', alignItems: 'center', columnGap: '6px' }">
                  <div
                    class="circle"
                    :style="{
                      width: '7px',
                      height: '7px',
                      backgroundColor: colorList[scope.$index],
                      borderRadius: '50%',
                    }"
                  ></div>
                  <span>{{ scope.row.area || '未知' }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="salesAmount"
              :label="type === '1' ? '销售额' : '毛利额'"
              class-name="text-din"
              :formatter="
                (row) => {
                  return `${
                    formatMoneyObj(type === '1' ? row.salesAmount : row.grossProfitAmount).value
                  } ${formatMoneyObj(type === '1' ? row.salesAmount : row.grossProfitAmount).unit}`;
                }
              "
            />
            <el-table-column
              :prop="type === '1' ? 'salesAmountRate' : 'grossProfitAmountRate'"
              label="占比"
              class-name="text-din"
              :formatter="
                (row) => {
                  return (
                    formatPercent(type === '1' ? row.salesAmountRate : row.grossProfitAmountRate) +
                    '%'
                  );
                }
              "
            />
          </el-table>
        </div>
      </div>
      <div class="chart-area">
        <div class="chart-warpper">
          <div class="pie-chart" id="sales-counrty"></div>
          <div class="total" v-if="data2Total.money">
            <div class="total-title">{{ type === '1' ? '销售额' : '毛利额' }}</div>
            <div class="total-value">
              {{ data2Total.money }}
              <span class="unit">{{ data2Total.unit }}</span>
            </div>
          </div>
        </div>
        <div class="table-chart">
          <el-table :data="data2" size="small" max-height="256px">
            <el-table-column prop="country" label="来源分布">
              <template #default="scope">
                <div :style="{ display: 'flex', alignItems: 'center', columnGap: '6px' }">
                  <div
                    class="circle"
                    :style="{
                      width: '7px',
                      height: '7px',
                      backgroundColor: colorList[scope.$index],
                      borderRadius: '50%',
                    }"
                  ></div>
                  <span>{{ scope.row.country || '未知' }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="salesAmount"
              :label="type === '1' ? '销售额' : '毛利额'"
              class-name="text-din"
              :formatter="
                (row) => {
                  return `${
                    formatMoneyObj(type === '1' ? row.salesAmount : row.grossProfitAmount).value
                  } ${formatMoneyObj(type === '1' ? row.salesAmount : row.grossProfitAmount).unit}`;
                }
              "
            />
            <el-table-column
              :prop="type === '1' ? 'salesAmountRate' : 'grossProfitAmountRate'"
              label="占比"
              class-name="text-din"
              :formatter="
                (row) => {
                  return (
                    formatPercent(type === '1' ? row.salesAmountRate : row.grossProfitAmountRate) +
                    '%'
                  );
                }
              "
            />
          </el-table>
        </div>
      </div>
      <div class="chart-area">
        <div class="chart-warpper">
          <div class="pie-chart" id="sales-platform"></div>
          <div class="total" v-if="data3Total.money">
            <div class="total-title">{{ type === '1' ? '销售额' : '毛利额' }}</div>
            <div class="total-value">
              {{ data3Total.money }}
              <span class="unit">{{ data3Total.unit }}</span>
            </div>
          </div>
        </div>
        <div class="table-chart">
          <el-table :data="data3" size="small" max-height="256px">
            <el-table-column prop="platform" label="来源分布">
              <template #default="scope">
                <div :style="{ display: 'flex', alignItems: 'center', columnGap: '6px' }">
                  <div
                    class="circle"
                    :style="{
                      width: '7px',
                      height: '7px',
                      backgroundColor: colorList[scope.$index],
                      borderRadius: '50%',
                    }"
                  ></div>
                  <span>{{ scope.row.platform || '未知' }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="salesAmount"
              :label="type === '1' ? '销售额' : '毛利额'"
              class-name="text-din"
              :formatter="
                (row) => {
                  return `${
                    formatMoneyObj(type === '1' ? row.salesAmount : row.grossProfitAmount).value
                  } ${formatMoneyObj(type === '1' ? row.salesAmount : row.grossProfitAmount).unit}`;
                }
              "
            />
            <el-table-column
              :prop="type === '1' ? 'salesAmountRate' : 'grossProfitAmountRate'"
              label="占比"
              class-name="text-din"
              :formatter="
                (row) => {
                  return (
                    formatPercent(type === '1' ? row.salesAmountRate : row.grossProfitAmountRate) +
                    '%'
                  );
                }
              "
            />
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import * as echarts from 'echarts/core';
  import { PieChart } from 'echarts/charts';
  import { TitleComponent, TooltipComponent } from 'echarts/components';
  // 标签自动布局、全局过渡动画等特性
  import { LabelLayout, UniversalTransition } from 'echarts/features';
  // 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
  import { CanvasRenderer } from 'echarts/renderers';
  import { formatMoneyObj, formatPercent } from '../../utils/utils';

  const loading = inject('loading', ref(false));
  const detailData = inject('detailData', ref<any>({}));
  const data1 = computed(() => {
    return detailData.value.proportionAnalysis.areaProportions || [];
  });
  const data1Total: any = computed(() => {
    const total = data1.value.reduce((sum, item) => {
      return sum + (type.value === '1' ? item.salesAmount : item.grossProfitAmount || 0);
    }, 0);
    return {
      money: formatMoneyObj(total).value,
      unit: formatMoneyObj(total).unit,
    };
  });
  const data2 = computed(() => {
    return detailData.value.proportionAnalysis.countryProportions || [];
  });
  const data2Total: any = computed(() => {
    const total = data2.value.reduce((sum, item) => {
      return sum + (type.value === '1' ? item.salesAmount : item.grossProfitAmount || 0);
    }, 0);
    return {
      money: formatMoneyObj(total).value,
      unit: formatMoneyObj(total).unit,
    };
  });
  const data3 = computed(() => {
    return detailData.value.proportionAnalysis.platformProportions || [];
  });
  const data3Total: any = computed(() => {
    const total = data3.value.reduce((sum, item) => {
      return sum + (type.value === '1' ? item.salesAmount : item.grossProfitAmount || 0);
    }, 0);
    return {
      money: formatMoneyObj(total).value,
      unit: formatMoneyObj(total).unit,
    };
  });
  echarts.use([
    TitleComponent,
    TooltipComponent,
    PieChart,
    LabelLayout,
    UniversalTransition,
    CanvasRenderer,
  ]);
  watch(
    () => {
      return detailData.value.proportionAnalysis;
    },
    (newData) => {
      init();
    }
  );
  const type = ref('1');
  const chatSet = {
    chart1: null,
    chart2: null,
    chart3: null,
  };
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
  const initEcharts = (el: HTMLElement, key: string, option: echarts.EChartsCoreOption) => {
    if (!chatSet[key]) {
      chatSet[key] = echarts.init(el);
      window.addEventListener('resize', () => {
        chatSet[key].resize();
      });
    }
    chatSet[key].setOption(option);
  };
  const init = () => {
    initEcharts(document.getElementById('sales-area') as HTMLElement, 'chart1', {
      title: {
        text: '销售额区域占比',
        left: 'left',
        textStyle: {
          color: '#1F1F1F',
          fontSize: 13,
          fontWeight: 600,
          lineHeight: 22,
        },
      },
      tooltip: {
        trigger: 'item',
      },
      color: colorList,
      series: [
        {
          top: 18,
          name: '销售额',
          type: 'pie',
          radius: ['47%', '70%'], // 环形图
          avoidLabelOverlap: false,
          data: data1.value.map((item) => ({
            value: type.value === '1' ? item.salesAmount : item.grossProfitAmount,
            name: item.area,
          })),
          label: {
            show: false,
            position: 'center',
          },
          labelLine: {
            show: false,
          },
          emphasis: {
            itemStyle: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: 'bold',
              },
            },
          },
          tooltip: {
            valueFormatter(value) {
              const { value: amount, unit } = formatMoneyObj(value);
              return `${amount} ${unit}`;
            },
          },
        },
      ],
    });
    initEcharts(document.getElementById('sales-counrty') as HTMLElement, 'chart2', {
      title: {
        text: '销售额国家占比 Top10',
        left: 'left',
        textStyle: {
          color: '#1F1F1F',
          fontSize: 13,
          fontWeight: 600,
          lineHeight: 22,
        },
      },
      tooltip: {
        trigger: 'item',
      },
      color: colorList,
      series: [
        {
          top: 18,
          name: '销售额',
          type: 'pie',
          radius: ['47%', '70%'], // 环形图
          avoidLabelOverlap: false,
          data: data2.value.map((item) => ({
            value: type.value === '1' ? item.salesAmount : item.grossProfitAmount,
            name: item.country,
          })),
          label: {
            show: false,
            position: 'center',
          },
          labelLine: {
            show: false,
          },
          emphasis: {
            itemStyle: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: 'bold',
              },
            },
          },
          tooltip: {
            valueFormatter(value) {
              const { value: amount, unit } = formatMoneyObj(value);
              return `${amount} ${unit}`;
            },
          },
        },
      ],
    });
    initEcharts(document.getElementById('sales-platform') as HTMLElement, 'chart3', {
      title: {
        text: '销售额平台占比',
        left: 'left',
        textStyle: {
          color: '#1F1F1F',
          fontSize: 13,
          fontWeight: 600,
          lineHeight: 22,
        },
      },
      tooltip: {
        trigger: 'item',
      },
      color: colorList,
      series: [
        {
          top: 18,
          name: type.value === '1' ? '销售额' : '毛利额',
          type: 'pie',
          radius: ['47%', '70%'], // 环形图
          avoidLabelOverlap: false,
          data: data3.value.map((item) => ({
            value: type.value === '1' ? item.salesAmount : item.grossProfitAmount,
            name: item.platform,
          })),
          label: {
            show: false,
            position: 'center',
          },
          labelLine: {
            show: false,
          },
          emphasis: {
            itemStyle: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: 'bold',
              },
            },
          },
          tooltip: {
            valueFormatter(value) {
              const { value: amount, unit } = formatMoneyObj(value);
              return `${amount} ${unit}`;
            },
          },
        },
      ],
    });
  };
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
      width: 100%;
      display: flex;
      gap: 20px;
      .chart-area {
        width: 0;
        flex: 1;
        .chart-warpper {
          position: relative;
        }
        .pie-chart {
          width: 100%;
          height: 200px;
        }
        .total {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          padding-top: 10px;
          .total-title {
            color: #666666;
            font-size: 12px;
            line-height: 20px;
            font-weight: 400;
          }
          .total-value {
            font-family: 'DIN Blod';
            font-size: 14px;
            font-weight: 400;
            line-height: 20px;
            .unit {
              font-family: sans-serif;
              font-size: 12px;
              font-weight: 500;
            }
          }
        }
        .table-chart {
          :deep(.el-table) {
            width: 100%;
            td.el-table__cell {
              border-bottom: none;
            }
            thead th {
              background-color: transparent;
            }
          }
        }
      }
      :deep(.el-table) {
        thead tr {
          background-color: transparent;
        }
      }
    }
  }
</style>
