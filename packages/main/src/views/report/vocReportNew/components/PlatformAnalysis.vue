<template>
  <div class="platform-analysis">
    <div class="platform-analysis__title">
      <i
        class="iconfont icon-jiantouxiangzuo back-btn"
        v-if="parentPlatform"
        @click="parentPlatform = ''"
      ></i>
      <span>{{ parentPlatform }}销售平台表现 Top 5</span>
    </div>
    <div class="chart-container">
      <div v-show="!parentPlatform" class="chart-area" ref="platformChart"></div>
      <div v-show="parentPlatform" class="chart-area" ref="subPlatformChart"></div>
      <div class="table-chart">
        <el-table
          :data="parentPlatform ? formatData(sonData) : formatData(data)"
          size="small"
          max-height="200px"
        >
          <el-table-column
            header-align="left"
            label-class-name="th-center"
            :label="parentPlatform ? '渠道名称' : '平台名称'"
            align="center"
          >
            <template #default="scope">
              <div
                :style="{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'start',
                  columnGap: '6px',
                  width: '75px',
                  margin: 'auto',
                }"
              >
                <div
                  class="circle"
                  :style="{
                    width: '7px',
                    height: '7px',
                    backgroundColor: scope.row.isEmpty ? '#EDEDED' : colorList[scope.$index],
                    borderRadius: '50%',
                  }"
                ></div>
                <span>{{ parentPlatform ? scope.row.channel : scope.row.platform }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="vocCnt"
            label="VOC量"
            header-align="right"
            label-class-name="th-center"
            align="center"
          >
            <template #default="{ row }">
              <div :style="{ textAlign: 'right', width: '75px', margin: 'auto' }">
                <div class="text-din">{{ row.vocCnt ? toThousands(row.vocCnt) : '-' }}</div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useTemplateRef } from 'vue';
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
  import { toThousands } from '@/utils/toThousands';
  import { biApi, type BiContracts } from '@/api';

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
  const detailData = inject('dataDetail', ref<any>({}));
  const data = computed(() => {
    if (!detailData.value.platformPropList?.length) return [];
    // 处理数据，确保有 Top 5 和其他的合并
    const [top1, top2, top3, top4, top5, ...rest] = detailData.value.platformPropList || [];
    const topPlatforms = [top1, top2, top3, top4, top5].filter(Boolean);
    if (topPlatforms.length < 5) {
      return topPlatforms;
    }

    const otherTotal = rest.reduce((acc, item) => {
      acc += item.vocCnt || 0;
      return acc;
    }, 0);

    return [
      ...topPlatforms,
      {
        platform: '其他',
        vocCnt: otherTotal,
      },
    ];
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
      chart.on('click', 'series.pie', handleDownhole);
    }
    const option = {
      tooltip: {
        trigger: 'item',
        confine: false,
        appendTo: document.body,
        position: (point) => ({ left: point[0], bottom: point[1] }),
      },
      // 2. 调整图表主体区域（为图例留出空间）
      grid: {
        right: '60px', // 右侧留出20%空间给图例
        left: '60px',
      },
      color: colorList,
      legend: {
        show: false,
        data: data.value.map((item: any) => item.platform),
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
          name: '销售平台表现',
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
          data:
            data.value.map((item: any) => ({
              value: item.vocCnt,
              name: item.platform,
            })) || [],
        },
      ],
    };
    chart.setOption(option);
  };
  const platformChart = useTemplateRef<HTMLDivElement>('platformChart');
  const init = () => {
    if (!platformChart.value) return;
    initEcharts(platformChart.value);
  };
  watch(data, (newVal) => {
    if (newVal) {
      init();
    }
  });
  const search = inject<Ref<BiContracts.VocAnalysisReq>>('search');
  const parentPlatform = ref<string>('');
  const subPlatformChart = useTemplateRef<HTMLDivElement>('subPlatformChart');
  const sonData = ref<any[]>([]);
  const handleDownhole = async (params: any) => {
    if (params.componentType === 'series' && params.seriesType === 'pie') {
      parentPlatform.value = params.name;
      // 处理下钻逻辑
      const res = await biApi.biVocQueryVocPlatformDrillDown({
        ...search.value,
        platform: params.name,
      });
      const { platformPropList } = res;
      sonData.value = res.platformPropList || [];
      renderSonEcharts(platformPropList);
    }
  };

  let sonChart: echarts.EChartsType | null = null;
  const renderSonEcharts = (res: any) => {
    if (!sonChart) {
      sonChart = echarts.init(subPlatformChart.value!);
    }
    const option = {
      tooltip: {
        trigger: 'item',
        confine: false,
        appendTo: document.body,
        position: (point) => ({ left: point[0], bottom: point[1] }),
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
        data: res.map((item: any) => item.channel),
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
          name: `${parentPlatform.value}销售平台表现`,
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
          data:
            res.map((item: any) => ({
              value: item.vocCnt,
              name: item.channel,
            })) || [],
        },
      ],
    };
    sonChart.setOption(option);
  };
  const formatData = (d: any[]) => {
    if (!d || !d.length) {
      return new Array(5).fill({
        platform: '-',
        channel: '-',
        vocCnt: 0,
        isEmpty: true,
      });
    }
    return d;
  };
</script>

<style scoped lang="scss">
  .platform-analysis {
    flex: 1;
    flex-basis: 0;
  }
  .platform-analysis__title {
    display: flex;
    align-items: center;
    padding-left: 24px;
    color: var(---N9, #1f1f1f);

    /* 常规/Medium 13 */
    font-family: 'PingFang SC Medium', sans-serif;
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px; /* 169.231% */
  }
  .chart-container {
    display: flex;
    width: 100%;
    .chart-area {
      width: 205px;
      flex: none;
      height: 189px;
    }
    .table-chart {
      flex: 1;
      width: 216px;
      height: 200px;
      overflow: hidden;
      :deep(.el-table__header-wrapper) {
        margin-bottom: 4px;
      }
      :deep(.el-table th) {
        padding: 3px 0;
        color: var(---N8, #666);
        /* 较弱/Regular 12 */
        font-family: 'PingFang SC';
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px; /* 166.667% */
        border-bottom: 1px solid #f5f5f5;
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
      :deep(.th-center) {
        .cell {
          width: 75px;
          margin: auto;
        }
      }
    }
  }
  .back-btn {
    cursor: pointer;
    font-size: 16px;
    &:hover {
      color: #02b96b;
    }
  }
</style>
