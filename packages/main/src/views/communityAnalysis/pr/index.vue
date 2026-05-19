<template>
  <div class="pr-analysis">
    <section class="filter-card">
      <div class="filter-form">
        <el-date-picker
          :model-value="[search.startDate, search.endDate]"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="small"
          class="custom-date-picker"
          value-format="YYYY-MM-DD"
          :disabled-date="disabledDate"
          @update:model-value="
            (dateArr) => {
              search.startDate = dateArr?.[0];
              search.endDate = dateArr?.[1];
            }
          "
        />
      </div>
      <div class="filter-actions">
        <el-button @click="resetSearch" type="info" class="new-custom" size="small">重置</el-button>
      </div>
    </section>
    <!-- 内容区域 -->
    <div class="dashboard" v-loading="loading">
      <section class="email-stats-section">
        <header class="email-stats-title">邮箱分析统计</header>
        <div class="email-stats-content">
          <!-- 总邮件数  -->
          <div class="stat-card">
            <div class="stat-card-body">
              <div class="stat-title">
                <span>总邮件数</span>
                <el-tooltip placement="top" content="PR邮箱中处理过的总邮件数量">
                  <el-icon><Warning /></el-icon>
                </el-tooltip>
              </div>
              <div class="stat-value">{{ toThousands(stats.labelEmails) }}</div>
              <div class="stat-change">
                <span v-if="!stats.labelEmailsChange">--</span>
                <span v-else>
                  环比：{{
                    stats.labelEmailsChange
                  }}%
                </span>
                <el-icon v-if="stats.labelEmailsChange > 0"><Top /></el-icon>
                <el-icon v-if="stats.labelEmailsChange < 0"><Bottom /></el-icon>
              </div>
            </div>
          </div>
          <!-- 自动回复草稿生成 -->
          <div class="stat-card">
            <div class="stat-card-body">
              <div class="stat-title">
                <span>自动回复草稿生成</span>
                <el-tooltip placement="top" content="AI自动生成的邮件回复草稿内容">
                  <el-icon><Warning /></el-icon>
                </el-tooltip>
              </div>
              <div class="stat-value">{{ toThousands(stats.replyDrafts) }}</div>
              <div class="stat-change">
                <span v-if="!stats.replyDraftsChange">--</span>
                <span v-else>
                  环比：{{
                    stats.replyDraftsChange
                  }}%
                </span>
                <el-icon v-if="stats.replyDraftsChange > 0"><Top /></el-icon>
                <el-icon v-if="stats.replyDraftsChange < 0"><Bottom /></el-icon>
              </div>
            </div>
          </div>
          <!-- 成功回复数 -->
          <div class="stat-card">
            <div class="stat-card-body">
              <div class="stat-title">
                <span>成功回复数</span>
                <el-tooltip placement="top" content="AI生成后人工确认发送的邮件数量">
                  <el-icon><Warning /></el-icon>
                </el-tooltip>
              </div>
              <div class="stat-value">{{ toThousands(stats.replySuccessEmails) }}</div>
              <div class="stat-change">
                <span v-if="!stats.replySuccessEmailsChange">--</span>
                <span v-else>
                  环比：{{
                    stats.replySuccessEmailsChange
                  }}%
                </span>
                <el-icon v-if="stats.replySuccessEmailsChange > 0"><Top /></el-icon>
                <el-icon v-if="stats.replySuccessEmailsChange < 0"><Bottom /></el-icon>
              </div>
            </div>
          </div>
          <!-- 邮件分发数 -->
          <div class="stat-card">
            <div class="stat-card-body">
              <div class="stat-title">
                <span>邮件分发数</span>
                <el-tooltip
                  placement="top"
                  content="经AI判断后需要转发至对应邮箱进行后续处理的内容"
                >
                  <el-icon><Warning /></el-icon>
                </el-tooltip>
              </div>
              <div class="stat-value">{{ toThousands(stats.forwardEmails) }}</div>
              <div class="stat-change">
                <span v-if="!stats.forwardEmailsChange">--</span>
                <span v-else>
                  环比：{{
                    stats.forwardEmailsChange
                  }}%
                </span>
                <el-icon v-if="stats.forwardEmailsChange > 0"><Top /></el-icon>
                <el-icon v-if="stats.forwardEmailsChange < 0"><Bottom /></el-icon>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div ref="dropdown">
        <!-- 邮件分类统计 -->
        <section class="email-stats-section">
          <header class="email-stats-title">邮件分类统计</header>
          <div class="label-analysis-group" v-for="label in labelStats" :key="label.labelId">
            <div class="label-stat-card">
              <div class="stat-card-body">
                <div class="stat-title label-stat">
                  <span class="label-name">{{ label.labelName }}</span>
                  <el-tooltip placement="top" :content="label.explain || '暂无说明'">
                    <el-icon><Warning /></el-icon>
                  </el-tooltip>
                </div>
                <div class="stat-value">
                  <span class="text-num">{{ toThousands(label.labelNum) }}</span>
                </div>
                <span class="radio-num">
                  占比：{{
                    stats.labelEmails === 0
                      ? '0.00%'
                      : (label.labelNum! / stats.labelEmails!).toLocaleString('zh-CN', {
                          style: 'percent',
                          maximumFractionDigits: 2,
                          minimumFractionDigits: 2,
                        })
                  }}
                </span>
                <div class="stat-change">
                  <span v-if="!label.labelNumChange">--</span>
                  <span v-else>
                    环比：{{
                      label.labelNumChange
                    }}%
                  </span>
                  <el-icon v-if="label.labelNumChange! > 0"><Top /></el-icon>
                  <el-icon v-if="label.labelNumChange! < 0"><Bottom /></el-icon>
                </div>
              </div>
              <!-- 饼图 -->
              <div class="pie-chart-wrapper">
                <div :ref="(el) => setPieChartRef(el, label.labelId!)" class="sub-pie-chart"></div>
              </div>
            </div>
            <!-- PR工作二级分类 -->
            <div class="children-analysis-container" v-if="label.children && label.children.length">
              <div class="children-grid">
                  <div v-for="(child, index) in label.children" :key="child.labelId" class="child-grid-item">
                        <div class="stat-title">
                          <span class="label-color" :style="{ backgroundColor: themeColor[index] }"></span>
                          <span class="label-name">{{ child.labelName }}</span>
                        </div>
                        <div :class="{'stat-value': label.children.length > 4, 'stat-value-sm': label.children.length <= 4}">
                          <span class="text-num">{{ toThousands(child.labelNum) }}</span>
                          <div>
                            <span class="radio-num">
                              占比：{{
                                label.labelNum === 0
                                  ? '0.00%'
                                  : (child.labelNum! / label.labelNum!).toLocaleString('zh-CN', {
                                      style: 'percent',
                                      maximumFractionDigits: 2,
                                      minimumFractionDigits: 2,
                                    })
                              }}
                            </span>
                            <div class="stat-change">
                              <span v-if="!child.labelNumChange">--</span>
                              <span v-else>
                                环比：{{
                                  child.labelNumChange
                                }}%
                              </span>
                              <el-icon v-if="child.labelNumChange! > 0"><Top /></el-icon>
                              <el-icon v-if="child.labelNumChange! < 0"><Bottom /></el-icon>
                            </div>
                          </div>
                        </div>
                        
                  </div>
                </div>
            </div>
          </div>
        </section>
      </div>
      <!-- 总邮件处理趋势 -->
      <div class="email-stats-section">
        <header class="email-stats-title">总邮件处理趋势</header>
        <div ref="disposeChart" class="chart urgent-chart"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup name="taskPr">
  import { ref, onMounted, useTemplateRef, onBeforeUnmount, nextTick, reactive, watch } from 'vue';
  import { toThousands } from '@/utils/toThousands';
  import { aiStatisticsApi, AiStatisticsContracts } from '@/api';
  import * as echarts from 'echarts';
  import { useAutoAnimate } from '@formkit/auto-animate/vue';
  import autoAnimate from '@formkit/auto-animate';
  // useDropdown('dropdown');
  interface ExtendedLabelItem extends AiStatisticsContracts.LabelSummaryItemBean {
    children?: AiStatisticsContracts.LabelSummaryItemBean[];
    loading?: boolean;
  }
  const [parent] = useAutoAnimate({
    duration: 3000,
    easing: 'ease-in-out',
  });
  const dropdown = useTemplateRef('dropdown');
  onMounted(() => {
    autoAnimate(dropdown.value!, {
      duration: 300,
      easing: 'ease-in-out',
    }); // thats it!
  });
  const stats = reactive<AiStatisticsContracts.TotalSummaryItemBean>({
    // 根据类型，生成默认值
    totalEmails: 0,
    totalEmailsChange: 0,
    replyDrafts: 0,
    replyDraftsChange: 0,
    prevReplySuccessEmails: 0,
    replySuccessEmailsChange: 0,
    prevForwardEmails: 0,
    forwardEmailsChange: 0,
    labelEmails: 0,
  });
  const setStats = async () => {
    const response = await aiStatisticsApi.luteosAiStatisticsPrEmailTotalSummary(search);
    Object.assign(stats, response.stats);
    // 更新图表
    updateCharts(response);
  };
  const labelStats = reactive<ExtendedLabelItem[]>([]);
  const setLabelStats = async () => {
    const response = await aiStatisticsApi.luteosAiStatisticsPrEmailLabelSummary(search);
    const parentLabels = response.childLabelStats || [];

    // Fetch children for each parent label in parallel
    const labelsWithChildren = await Promise.all(
      parentLabels.map(async (label) => {
        const childResponse = await aiStatisticsApi.luteosAiStatisticsPrEmailLabelSummary({
          ...search,
          parentLabelIds: [label.labelId!],
        });
        return {
          ...label,
          children: childResponse.childLabelStats || [],
          loading: false,
        };
      })
    );

    labelStats.length = 0;
    labelStats.push(...labelsWithChildren);

    // Trigger chart updates after DOM is ready
    nextTick(() => {
      Object.values(pieCharts).forEach((chart, index) => {
        const label = labelStats.find((l) => l.labelId === Number(Object.keys(pieCharts)[index]));
        if (label) updatePieChart(label);
      });
    });
  };

  const loading = ref(false);
  const pieCharts: Record<number, echarts.ECharts | null> = {};
  const themeColor = [
    '#02B96B',
    '#258DFF',
    '#0CC1E2',
    '#FFBF1F',
    '#FF9F22',
    '#FF663E',
    '#F53F3F',
    '#FF4EAF',
  ];
  const setPieChartRef = (el: any, labelId: number) => {
    if (el) {
      // 使用 nextTick 确保 DOM 已渲染且具有尺寸
      nextTick(() => {
        if (!el.clientWidth || !el.clientHeight) return;

        if (!pieCharts[labelId]) {
          pieCharts[labelId] = echarts.init(el);
        }
        const label = labelStats.find((l) => l.labelId === labelId);
        if (label) updatePieChart(label);
      });
    } else {
      if (pieCharts[labelId]) {
        pieCharts[labelId]?.dispose();
        delete pieCharts[labelId];
      }
    }
  };

  const updatePieChart = (label: ExtendedLabelItem) => {
    const chart = pieCharts[label.labelId!];
    if (!chart) return;

    if (!label.children || label.children.length === 0) {
      chart.clear();
      return;
    }

    const chartData = label.children.map((child) => ({
      name: child.labelName,
      value: child.labelNum,
    }));

    const isAllZero = chartData.every((item) => item.value === 0);

    chart.setOption({
      color: themeColor,
      tooltip: {
        show: !isAllZero,
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)',
        backgroundColor: '#fff',
        borderColor: '#fff',
        textStyle: {
          color: '#262626',
          fontSize: 12,
        },
        padding: [4, 8],
      },
      series: [
        {
          type: 'pie',
          avoidLabelOverlap: true,
          hoverAnimation: !isAllZero,
          label: {
            show: false,
          },
          itemStyle: {
            borderWidth: 0,
          },
          emphasis: {
            disabled: isAllZero, // 禁用高亮
            itemStyle: {
              shadowBlur: 0,
              shadowOffsetX: 0,
              shadowOffsetY: 0,
            },
            label: {
              show: false,
            },
          },
          data: isAllZero ? [{ value: 1, itemStyle: { color: '#DFE2E6' } }] : chartData,
        },
      ],
    });
  };

  onBeforeUnmount(() => {
    Object.values(pieCharts).forEach((chart) => {
      chart?.dispose();
    });
  });

  const fetchData = async () => {
    await Promise.all([setStats(), setLabelStats()]);
    loading.value = false;
  };
  // 筛选条件
  const search = reactive(
    JSON.parse(
      sessionStorage.getItem('prEmailSearch') ||
        JSON.stringify({
          startDate: '',
          endDate: '',
        })
    )
  );

  const disabledDate = (time: Date) => {
    return time.getTime() > Date.now();
  };

  watch(
    search,
    () => {
      loading.value = true;
      fetchData();
      sessionStorage.setItem('prEmailSearch', JSON.stringify(search));
    },
    {
      immediate: true,
    }
  );

  onMounted(() => {
    initCharts();
  });
  // const acceptChartRef = useTemplateRef('acceptChart');
  const disposeChartRef = useTemplateRef('disposeChart');
  const charts: Record<string, echarts.ECharts | null> = {
    accept: null, // 总邮件接受趋势
    dispose: null, // 总邮件处理趋势
  };
  const initCharts = () => {
    // 确保在DOM元素准备好后再初始化词云图
    nextTick(() => {
      // charts.accept = echarts.init(acceptChartRef.value);
      charts.dispose = echarts.init(disposeChartRef.value);
      window.addEventListener('resize', () => {
        Object.values(charts).forEach((chart) => {
          if (chart) {
            chart.resize();
          }
        });
      });
    });
  };
  const updateCharts = (data) => {
    // 确保 data.charts 存在
    const chartData = data.charts || {
      dates: [],
      processedEmails: [],
    };
    // 总邮件处理趋势
    charts.dispose?.setOption({
      color: themeColor,
      tooltip: {
        trigger: 'axis',
        enterable: false,
        confine: true,
        backgroundColor: '#fff',
        borderColor: '#fff',
        formatter: `
          <div style="height:32px">{b}</div>
          <div style="height:32px">{a}:&nbsp;&nbsp;{c}</div>
        `,
        textStyle: {
          fontSize: 14,
          color: '#262626',
          fontWeight: 400,
        },
        padding: [8, 16],
        extraCssText: 'border-radius: 8px',
      },
      grid: {
        left: 0,
        right: 0,
        bottom: '5%',
        top: '5%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: chartData.dates || [],
        axisLabel: {
          rotate: 45,
        },
      },
      yAxis: { type: 'value' },
      series: [
        {
          name: '邮件处理数',
          data: chartData.processedEmails || [],
          type: 'line',
          smooth: true,
          showSymbol: false,
          symbol: 'circle',
          symbolSize: 6,
          lineStyle: {
            width: 2,
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: 'rgba(67, 114, 255, 0.00)' }, // 渐变起始颜色
              { offset: 0.202979, color: '#02B96B' }, // 渐变中间颜色
              { offset: 0.510443, color: '#02B96B' }, // 渐变中间颜色
              { offset: 0.772389, color: '#02B96B' }, // 渐变中间颜色
              { offset: 1, color: 'rgba(67, 114, 255, 0.00)' }, // 渐变结束颜色
            ]),
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0.1767, color: '#e2f3ecff' }, // 渐变起始颜色
              { offset: 0.9763, color: '#e4f8efff' }, // 渐变结束颜色
            ]),
          },
        },
      ],
    });
  };
  const resetSearch = () => {
    search.startDate = '';
    search.endDate = '';
  };
</script>

<style lang="scss" scoped>
  .filter-card {
    --el-primary-color: #02b96b;
    padding: 12px 5%;
    background: #fff;
    display: flex;
    gap: 8px;
    .filter-actions {
      :deep(.new-custom) {
        border-radius: 4px;
        background: var(---N3, #eff0f0);
        color: var(--Grey-grey-9, #1e2226);
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px;
        border: 1px solid var(---N3, #eff0f0);
        &:hover {
          background-color: var(---N4);
        }
      }
    }
  }
  .dashboard {
    padding: 20px 5%;
    margin: 0 auto;
    background: #E9ECF0;
    display: flex;
    flex-direction: column;
    gap: 40px;
    height: calc(100vh - 90px - 52px);
    min-width: 580px;
    overflow: auto;
    :deep(.el-card__body) {
      display: flex;
    }

    .dashboard-card {
      --el-card-border-radius: 8px;
    }
    .section-card-header {
      color: rgba(0, 0, 0, 0.85);
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: 1.5;
      margin-right: 10px;
      display: flex;
      align-items: center;
    }

    .last-update {
      color: rgba(0, 0, 0, 0.45);
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 1.71; /* 171.429% */
    }
  }
  .stat-card {
    padding: 16px 20px;
    box-sizing: border-box;
    border-radius: 16px;
    border: 1px solid var(---N3, #e9ecf0);
    background: var(---N0, #fff);
    width: 25%;
    ::v-deep(.el-card__body) {
      height: 100%;
      box-sizing: border-box;
    }
    .stat-card-body {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
    .stat-title {
      color: var(---N9, var(---N9, #1e2226));
      font-family: 'PingFang SC Medium';
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 22px;
      display: flex;
      align-items: center;
      gap: 8px;
      .el-icon {
        font-size: 16px;
        color: #8A9099;
      }
    }
    .label-stat {
      gap: 4px;
    }
    .stat-value {
      display: flex;
      align-items: center;
      gap: 8px;
      color: var(---N9, var(---N9, #1e2226));
      font-family: 'DIN Alternate';
      font-size: 40px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }
    .stat-change {
      color: var(---N6, var(---N6, #8a9099));
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px;
    }
  }
  .label-analysis-group {
    display: flex;
    align-items: center;
    padding: 20px;
    background: #fff;
    border-radius: 8px;
    gap: 40px;
    .label-stat-card {
      display: flex;
      align-items: center;
      gap: 12px;
      min-width: 270px;
      padding-right: 20px;
      border-right: 1px solid var(---N3, #E9ECF0);
      .stat-card-body {
        display: flex;
        flex-direction: column;
        gap: 12px;
        flex: 1;
        .stat-title {
          display: flex;
          align-items: center;
          gap: 4px;
          color: var(---N6, #8A9099);
          .label-name {
            color: var(---N9, var(---N9, #1E2226));
            font-family: "PingFang SC Medium";
            font-size: 14px;
            font-style: normal;
            font-weight: 500;
            line-height: 22px;
          }
        }
        .stat-value {
          color: var(---N9, var(---N9, #1E2226));
          font-family: "DIN Alternate";
          font-size: 40px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
        }
        .radio-num, .stat-change {
          color: var(---N6, var(---N6, #8A9099));
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: 20px;
        }
      }
    }
  }
  .parent-stat-card {
    display: flex;
    width: 100%;
    margin-bottom: 24px;
    background-color: #f8faff !important;
  }
  .children-analysis-container {
    width: 100%;
    display: flex;
    align-items: flex-start;
  }
  .pie-chart-wrapper {
    flex-shrink: 0;
    width: 110px;
    height: 112px;
  }
  .sub-pie-chart {
    width: 100%;
    height: 100%;
  }
  .children-grid {
    flex: 1;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 40px 20px;
    .child-grid-item {
      display: flex;
      flex-direction: column;
      gap: 4px;
      .stat-title {
        display: flex;
        align-items: center;
        gap: 8px;
        .label-name {
          color: var(---N9, var(---N9, #1E2226));
          font-family: "PingFang SC Medium";
          font-size: 14px;
          font-style: normal;
          font-weight: 500;
          line-height: 22px;
        }
      }
      .stat-value {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .stat-value-sm {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .radio-num, .stat-change {
        color: var(---N6, var(---N6, #8A9099));
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px;
      }
      .text-num {
        color: var(---N9, var(---N9, #1E2226));
        font-family: "DIN Alternate";
        font-size: 24px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
      }
    }
    .label-color {
      width: 12px;
      height: 12px;
      display: inline-block;
      border-radius: 50%;
    }
  }
  .child-stat-card {
    width: 100% !important;
    padding: 16px !important;
  }
  .pr-stats-section {
    background: #fff;
    color: rgba(0, 0, 0, 0.85);
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    height: 54px;
    display: flex;
    align-items: center;
    gap: 2px;
    .svg-icon {
      color: #ec221f;
    }
  }
  .text-num {
    display: inline-block;
    min-width: 1.25em;
  }
  .radio-num {
    font-family: Microsoft YaHei;
    font-weight: 400;
    font-size: 12px;
    line-height: 22px;
  }
  .email-stats-section {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    .email-stats-title {
      color: var(---N9, var(---N9, #1e2226));
      font-family: 'PingFang SC Medium';
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: 24px;
    }
    .urgent-chart {
      display: flex;
      padding: 20px 16px 24px 16px;
      flex-direction: column;
      border-radius: 10px;
      background: var(---N0, #FFF);
    }
    .email-stats-content {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      .stat-card {
        min-width: 230px;
        flex: 1;
      }
    }
  }
  .chart {
    height: 360px;
    width: 100%;
    padding: 0;
  }


  @media screen and (max-width: 1200px) {
    
    .children-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    .child-grid-item {
      .stat-value {
        flex-direction: column;
        align-items: flex-start !important;
        gap: 4px !important;
      }
    }
  }

   @media screen and (max-width: 650px) {
    
    .children-grid {
      grid-template-columns: repeat(1, 1fr);
    }
    .child-grid-item {
      .stat-value {
        flex-direction: column;
        align-items: flex-start !important;
        gap: 4px !important;
      }
    }
  }


</style>
