<template>
  <BiCard title="广告分析">
    <template #ext>
      <el-popover placement="top-start" :width="301" effect="dark">
        <div class="tip">
          <div>展示花费前100的广告，按流量和ROAS分四象限：</div>
          <ul>
            <li>高流量高ROAS：盈利明星，加大投入</li>
            <li>低流量高ROAS：潜力股，重点培育</li>
            <li>高流量低ROAS：消耗区，优化或削减</li>
            <li>
              低流量低ROAS：鸡助区，观察或放弃；流量阈值取广告设置中的点击量中位数（详见设置介绍），ROAS阈值取5
            </li>
          </ul>
        </div>
        <template #reference>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 1.75C9.8995 1.75 12.25 4.1005 12.25 7C12.25 9.8995 9.8995 12.25 7 12.25C4.1005 12.25 1.75 9.8995 1.75 7C1.75 4.1005 4.1005 1.75 7 1.75ZM7 8.83789C6.5651 8.83789 6.2129 9.19011 6.21289 9.625C6.21289 10.0599 6.5651 10.4121 7 10.4121C7.43487 10.4121 7.78711 10.0599 7.78711 9.625C7.7871 9.19013 7.43487 8.83792 7 8.83789ZM7 3.87891C6.08273 3.87891 5.33789 4.61008 5.33789 5.53027C5.33803 5.80391 5.55938 6.02525 5.83301 6.02539C6.10676 6.02539 6.32896 5.804 6.3291 5.53027C6.3291 5.16714 6.62099 4.87109 7 4.87109C7.37898 4.87112 7.6709 5.16715 7.6709 5.53027C7.67081 5.75311 7.55469 5.94384 7.29102 6.15625C6.95798 6.37959 6.73852 6.61944 6.61816 6.89746C6.50397 7.16136 6.50369 7.41057 6.50391 7.56445V7.58301C6.50391 7.85685 6.72616 8.0791 7 8.0791C7.27382 8.07907 7.49609 7.85683 7.49609 7.58301C7.4961 7.41431 7.50158 7.35278 7.52832 7.29102C7.55155 7.23747 7.61741 7.12848 7.85645 6.9707C7.86828 6.96289 7.87951 6.95411 7.89062 6.94531C8.26423 6.64944 8.66201 6.20127 8.66211 5.53027C8.66211 4.6101 7.91724 3.87894 7 3.87891Z"
              fill="#C5C5C5"
            />
          </svg>
        </template>
      </el-popover>
    </template>
    <template #actions>
      <span class="operation">
        <div :style="{ display: 'flex', alignItems: 'center' }" v-if="type === 'chartMode'">
          <span class="label setting-btn" @click="handleSetting">设置</span>
          <span class="label">花费:</span>
          <el-radio-group v-model="size">
            <el-radio-button value="100">前100</el-radio-button>
            <el-radio-button value="50">前50</el-radio-button>
            <el-radio-button value="20">前20</el-radio-button>
          </el-radio-group>
        </div>
        <el-radio-group v-model="type">
          <el-radio-button value="chartMode">图表模式</el-radio-button>
          <el-radio-button value="listMode">列表模式</el-radio-button>
        </el-radio-group>
      </span>
    </template>
    <div v-show="type === 'chartMode'" class="chart-container">
      <div class="chart-area" ref="scatterChartRef"></div>
    </div>
    <el-table v-show="type === 'listMode'" :data="tableData">
      <el-table-column prop="quadrant" label="象限名称" minWidth="86" />
      <el-table-column prop="adCount" label="投放数量" align="right" minWidth="86" />
      <el-table-column prop="adCountProp" label="数量占比" align="right" minWidth="86" />
      <el-table-column prop="clicks" label="点击量" align="right" minWidth="86" />
      <el-table-column prop="clicksProp" label="点击量占比" align="right" minWidth="86" />
      <el-table-column prop="cost" label="广告花费" align="right" minWidth="86" />
      <el-table-column prop="costProp" label="花费占比" align="right" minWidth="86" />
      <el-table-column prop="adSalesAmount" label="广告销售额" align="right" minWidth="86" />
      <el-table-column
        prop="adSalesAmountProp"
        label="广告销售额占比"
        align="right"
        minWidth="86"
      />
      <el-table-column prop="acos" label="ACOS" align="right" minWidth="86" />
      <el-table-column prop="cpc" label="CPC" align="right" minWidth="86" />
    </el-table>
    <AdSettingModal
      :maxClicks="props.maxClicks"
      :minClicks="props.minClicks"
      ref="adSettingRef"
      @confirm="handleRefreshData"
    />
  </BiCard>
</template>

<script setup lang="ts">
  import BiCard from '@/views/bi/components/BiCard.vue';
  import * as echarts from 'echarts/core';
  import { ScatterChart } from 'echarts/charts';
  import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    MarkAreaComponent,
    MarkLineComponent,
    DataZoomComponent,
    DataZoomInsideComponent,
    DataZoomSliderComponent,
  } from 'echarts/components';
  // 标签自动布局、全局过渡动画等特性
  import { LabelLayout, UniversalTransition } from 'echarts/features';
  // 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
  import { CanvasRenderer } from 'echarts/renderers';
  import { type BiContracts } from '@/api';
  import { useResizeObserver } from '@vueuse/core';
  import { cloneDeep } from 'lodash-es';
  import { formatNumberObj, formatRate } from '../../utils/utils';
  import AdSettingModal from '../components/AdSetting.vue';

  echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    MarkAreaComponent,
    MarkLineComponent,
    DataZoomComponent,
    DataZoomInsideComponent,
    DataZoomSliderComponent,
    ScatterChart,
    LabelLayout,
    UniversalTransition,
    CanvasRenderer,
  ]);
  const props = defineProps<{
    quadrantDetailList?: BiContracts.AdQuadrantDetailDO[];
    quadrantTotal?: BiContracts.AdQuadrantTotalDO;
    quadrantTotalList?: BiContracts.AdQuadrantTotalDO[];
    clicksStart?: number;
    clicksEnd?: number;
    maxClicks?: number;
    minClicks?: number;
  }>();
  const emit = defineEmits<{
    refreshData: [];
  }>();
  const size = ref<string>('100');
  const type = ref<string>('chartMode');
  const scatterData = computed(() => {
    const newList = cloneDeep(props.quadrantDetailList);
    newList?.sort((a, b) => b.cost! - a.cost!);
    return newList?.slice(0, Number(size.value)).map((item) => {
      return {
        value: [item.clicks, item.roas],
        ext: {
          campaignName: item.campaignName,
          adGroupName: item.adGroupName,
          adName: item.adName,
          clicks: formatNumberObj(item.clicks).toString(),
          roas: formatNumberObj(item.roas).toString(),
          cost: formatNumberObj(item.cost).toString(),
          _cost: item.cost,
          impressions: formatNumberObj(item.impressions).toString(),
          adOrderQty: formatNumberObj(item.adOrderQty).toString(),
          adSalesAmount: formatNumberObj(item.adSalesAmount).toString(),
          cvr: formatRate(item.cvr).toString(),
        },
      };
    });
  });
  const medianRoas = computed(() => {
    return props.quadrantTotal?.medianRoas || 0;
  });
  const medianClicks = computed(() => {
    return props.quadrantTotal?.medianClicks || 0;
  });
  let chart: any = null;
  const symbolSize = [0, 18, 24, 32, 38];
  const initEcharts = (el: HTMLElement) => {
    if (!chart) {
      chart = echarts.init(el);
      useResizeObserver(el, () => {
        chart.resize();
      });
    }
    const max = Math.max(...((props.quadrantDetailList || []).map((item) => item.cost || 0) || []));
    const option = {
      tooltip: {
        trigger: 'item',
        borderColor: '#fff',
        lineStyle: {
          type: 'dashed',
          width: 1,
        },
        axisPointer: {
          type: 'cross',
        },
        triggerOn: 'click',
        formatter: (params: any) => {
          const data = params.data?.ext || {};
          return `
          <div style="color: #1F1F1F; font-size: 12px;">${data.campaignName}</div>
          <div style="display: flex; justify-content: space-between; font-size: 12px; margin-top: 4px;">
            <span style="color: #666; font-size: 12px;">Ad Group：</span>
            <span style="color: #1F1F1F; font-size: 12px;">${data.adGroupName}</span>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 12px; margin-top: 4px;">
            <span style="color: #666; font-size: 12px;">Ads：</span>
            <span style="color: #1F1F1F; font-size: 12px;">${data.adName}</span>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 12px; margin-top: 4px;">
            <span style="color: #666; font-size: 12px;">点击量：</span>
            <span style="color: #1F1F1F; font-size: 12px; font-family: DIN">${data.clicks}</span>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 12px; margin-top: 4px;">
            <span style="color: #666; font-size: 12px;">ROAS:</span>
            <span style="color: #1F1F1F; font-size: 12px; font-family: DIN">${data.roas}</span>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 12px; margin-top: 4px;">
            <span style="color: #666; font-size: 12px;">广告花费：</span>
            <span style="color: #1F1F1F; font-size: 12px; font-family: DIN">${data.cost}</span>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 12px; margin-top: 4px;">
            <span style="color: #666; font-size: 12px;">曝光量：</span>
            <span style="color: #1F1F1F; font-size: 12px; font-family: DIN">${data.impressions}</span>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 12px; margin-top: 4px;">
            <span style="color: #666; font-size: 12px;">广告订单量：</span>
            <span style="color: #1F1F1F; font-size: 12px; font-family: DIN">${data.adOrderQty}</span>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 12px; margin-top: 4px;">
            <span style="color: #666; font-size: 12px;">广告销售额：</span>
            <span style="color: #1F1F1F; font-size: 12px; font-family: DIN">${data.adSalesAmount}</span>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 12px; margin-top: 4px;">
            <span style="color: #666; font-size: 12px;">转化率：</span>
            <span style="color: #1F1F1F; font-size: 12px; font-family: DIN">${data.cvr}</span>
          </div>
          `;
        },
      },

      grid: {
        left: 16,
        right: 16,
        top: 32,
        bottom: 75,
        height: 'auto',
        containLabel: true,
      },
      yAxis: {
        name: 'ROAS',
        scale: true,
        nameTextStyle: {
          fontSize: 12,
          fontWeight: 400,
          color: '#999',
          align: 'right',
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '999',
          }, // 隐藏y轴刻度线
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: 'red',
            type: 'dashed',
          },
        },
      },
      xAxis: {
        name: '点击量',
        scale: true,
        nameGap: 12,
        nameTextStyle: {
          fontSize: 12,
          lineHeight: 66,
          fontWeight: 400,
          color: '#999',
          align: 'right',
          verticalAlign: 'top',
        },
        axisLabel: {
          show: true,
          formatter: (value: number) => {
            return formatNumberObj(value).toString();
          },
        },
        axisLine: {
          show: false, // 隐藏y轴刻度线
          lineStyle: {
            color: '#999',
            // type: 'dashed',
          },
        },
        axisTick: {
          show: false, // 隐藏y轴刻度线
        },
        splitLine: {
          show: false, // 隐藏x轴分割线
        },
      },
      dataZoom: [
        {
          show: true,
          type: 'slider',
          height: 18,
          backgroundColor: '#F7F7F7',
          fillerColor: 'rgba(2, 185, 107, 0.16)',
          borderColor: 'transparent',
          dataBackground: {
            lineStyle: {
              color: '#EDEDED',
            },
            areaStyle: {
              color: '#EDEDED',
            },
          },
          selectedDataBackground: {
            lineStyle: {
              color: 'rgba(2, 185, 107, 0.16)',
            },
            areaStyle: {
              color: 'rgba(2, 185, 107, 0.16)',
            },
          },
        },
      ],
      series: [
        {
          type: 'scatter',
          data: scatterData.value || [],
          symbolSize: (value, params) => {
            const cost = params.data?.ext?._cost || 0;

            const ratio = Math.round((cost / max) * 4);
            return symbolSize[ratio] || 0;
          },
          itemStyle: {
            color(params) {
              if (params.value[0] < medianClicks.value && params.value[1] >= medianRoas.value) {
                return '#02B96B';
              }
              if (params.value[0] >= medianClicks.value && params.value[1] >= medianRoas.value) {
                return '#FFDD99';
              }
              return '#DEDEDE';
            },
          },
          markArea: {
            silent: true,
            data: [
              [
                {
                  name: '盈利明星 - 加大投入',
                  xAxis: medianClicks.value,
                  yAxis: 200,
                  itemStyle: {
                    color: '#FFFDF9',
                  },
                  label: {
                    position: 'insideTopRight',
                    color: '#FD9',
                    fontSize: 14,
                  },
                },
                {
                  yAxis: medianRoas.value,
                },
              ],
              [
                {
                  name: '潜力股 - 重点培育',
                  xAxis: 0,
                  yAxis: 200,
                  itemStyle: {
                    color: '#F9FFFC',
                  },
                  label: {
                    position: 'insideTopLeft',
                    color: '#93F2BF',
                    fontSize: 14,
                  },
                },
                {
                  xAxis: medianClicks.value,
                  yAxis: medianRoas.value,
                },
              ],
              [
                {
                  name: '消耗区 - 优化或削减',
                  xAxis: 0,
                  yAxis: medianRoas.value,
                  itemStyle: {
                    color: '#F7F7F7',
                  },
                  label: {
                    position: 'insideBottomLeft',
                    color: '#C5C5C5',
                    fontSize: 14,
                  },
                },
                {
                  xAxis: medianClicks.value,
                  yAxis: 0,
                },
              ],
              [
                {
                  name: '鸡肋区 - 观察或放弃',
                  xAxis: medianClicks.value,
                  yAxis: medianRoas.value,
                  itemStyle: {
                    color: '#F7F7F7',
                  },
                  label: {
                    position: 'insideBottomRight',
                    color: '#C5C5C5',
                    fontSize: 14,
                  },
                },
                {
                  yAxis: 0,
                },
              ],
            ],
          },
          // 中心点交集象限轴
          markLine: {
            silent: true, // 是否不响应鼠标事件
            precision: 2, // 精度
            symbolSize: 0, // 去掉箭头
            lineStyle: {
              type: 'dashed',
              color: '#02B96B',
            },
            label: {
              color: '#02B96B',
              position: 'end',
              formatter: '{b}',
            },
            data: [
              {
                name: '中位数',
                xAxis: medianClicks.value,
              },
              {
                name: '',
                yAxis: medianRoas.value,
              },
            ],
          },
        },
      ],
    };
    chart.setOption(option);
  };
  const scatterChartRef = ref<HTMLElement | null>();
  const init = () => {
    initEcharts(scatterChartRef.value!);
  };
  watch(
    scatterData,
    () => {
      if (scatterData.value) {
        nextTick(() => {
          init();
        });
      }
    },
    { immediate: true }
  );

  const tableData = computed(() => {
    if (!props.quadrantTotal || !props.quadrantTotalList) {
      return [];
    }
    return [{ ...props.quadrantTotal, quadrant: '总计' }, ...props.quadrantTotalList]?.map(
      (item) => {
        return {
          quadrant: item.quadrant,
          adCount: formatNumberObj(item.adCount),
          adCountProp: formatRate(item.adCountProp),
          clicks: formatNumberObj(item.clicks),
          clicksProp: formatRate(item.clicksProp),
          cost: formatNumberObj(item.cost),
          costProp: formatRate(item.costProp),
          adSalesAmount: formatNumberObj(item.adSalesAmount),
          adSalesAmountProp: formatRate(item.adSalesAmountProp),
          acos: formatRate(item.acos),
          cpc: formatNumberObj(item.cpc),
        };
      }
    );
  });

  const adSettingRef = useTemplateRef<InstanceType<typeof AdSettingModal>>('adSettingRef');
  const handleSetting = () => {
    // TODO 设置弹窗
    adSettingRef.value!.open({
      clicksStart: props.clicksStart,
      clicksEnd: props.clicksEnd,
    });
  };

  const handleRefreshData = () => {
    // TODO 数据刷新
    emit('refreshData');
  };
</script>

<style scoped lang="scss">
  .operation {
    margin-left: auto;
    display: flex;
    align-items: center;
    column-gap: 8px;
    font-size: 14px;
    color: #1f1f1f;
    .label {
      color: var(---N6, #999);

      /* 较弱/Regular 12 */
      font-family: 'PingFang SC';
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px; /* 166.667% */
      margin-right: 6px;
      &.setting-btn {
        margin-right: 22px;
        cursor: pointer;
        color: var(---P6);
      }
    }
  }
  .chart-container {
    width: 100%;
    .chart-area {
      width: 100%;
      height: 432px;
    }
  }
  .tip {
    padding: 4px 8px;
    max-width: 301px;
    color: #fff;

    /* 较弱/Regular 12 */
    font-family: 'PingFang SC';
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 166.667% */
  }
</style>
