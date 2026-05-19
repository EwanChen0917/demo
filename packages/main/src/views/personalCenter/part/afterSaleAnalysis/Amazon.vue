<template>
  <div class="amazon-container">
    <div class="left">
      <section ref="amazonWordCloudRef" class="word-cloud-chart"></section>
    </div>
    <div class="right">
      <div class="right-top">
        <section class="after-sale-indicator">
          <HorizontalScrollContainer>
            <div class="indicator-list">
              <div
                v-for="(item, index) in afterSaleIndicatorData"
                :key="index"
                class="indicator-item"
              >
                <div class="label">{{ item.label }}</div>
                <div class="value">
                  <span class="number">{{ item.value }}</span>
                  <span class="unit">{{ item.unit }}</span>
                </div>
                <div class="change">
                  <div class="rate">
                    <div class="rate-name">环比</div>
                    <div class="rate-value" :class="{ up: item.ringbi > 0 }">
                      <arrow-icon v-if="typeof item.ringbi === 'number'" :is-up="item.ringbi > 0" />
                      <span>
                        {{ formatRate(Math.abs(item.ringbi)).toString() }}
                      </span>
                    </div>
                  </div>
                  <div class="rate">
                    <div class="rate-name">同比</div>
                    <div class="rate-value" :class="{ up: item.tongbi > 0 }">
                      <arrow-icon v-if="typeof item.tongbi === 'number'" :is-up="item.tongbi > 0" />
                      <span>
                        {{ formatRate(Math.abs(item.tongbi)).toString() }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </HorizontalScrollContainer>
        </section>
      </div>
      <div class="right-bottom">
        <section class="star-bar-chart">
          <div class="star-bar-chart-title">Review星级统计</div>
          <section ref="starBarChartRef" class="star-bar-chart-container"></section>
        </section>
        <section class="star-summary">
          <table class="star-summary-table">
            <thead>
              <tr>
                <th class="star">星级</th>
                <th class="revcount">Review数量</th>
                <th class="rate">占比</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, index) in starSummaryData" :key="index">
                <td class="star">
                  <el-rate
                    v-model="row.level"
                    disabled
                    size="large"
                    :colors="new Array(5).fill('#FF9F22')"
                    disabled-void-color="#EDEDED"
                  />
                </td>
                <td class="revcount">{{ toThousands(row.value) || '-' }}</td>
                <td class="rate">{{ formatRate(row.percentage).toString() }}</td>
              </tr>
            </tbody>
          </table>
        </section>
        <section class="review-summary" v-if="false">
          <div class="title">Review类型统计</div>
          <div class="desc">todo---VINE评论：数量为0，占比总评论数为 -%</div>
          <div ref="reviewSummaryChartRef" class="review-summary-chart"></div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import * as echarts from 'echarts';
  import { AmazonAfterSalesAnalysisBean } from '@/api/bi/data-contracts';
  import HorizontalScrollContainer from '@/views/personalCenter/components/HorizontalScrollContainer.vue';
  import { useResizeObserver } from '@vueuse/core';
  import { formatRate, formatNumberObj } from '@/views/bi/utils/utils';
  import { useStationWordCloud } from '../../hooks/useWordCloud';
  import ArrowIcon from '../../components/arrowIcon.vue';

  import { toThousands } from '../../../../utils/toThousands';

  const props = withDefaults(
    defineProps<{
      amazonAfterSalesAnalysis: AmazonAfterSalesAnalysisBean;
    }>(),
    {
      amazonAfterSalesAnalysis: () => ({}),
    }
  );

  // 指标
  const afterSaleIndicatorData = computed(() => {
    const { amazonAfterSalesAnalysis } = props;
    return [
      {
        label: '评论数',
        value: amazonAfterSalesAnalysis.reviewCount,
        unit: '',
        ringbi: amazonAfterSalesAnalysis.reviewCountMom ?? '-',
        tongbi: amazonAfterSalesAnalysis.reviewCountYoy ?? '-',
      },
      {
        label: '好评数',
        value: amazonAfterSalesAnalysis.positiveReviewCount,
        unit: '',
        ringbi: amazonAfterSalesAnalysis.positiveReviewCountMom ?? '-',
        tongbi: amazonAfterSalesAnalysis.positiveReviewCountYoy ?? '-',
      },
      {
        label: '中差评数',
        value: amazonAfterSalesAnalysis.negativeReviewCount,
        unit: '',
        ringbi: amazonAfterSalesAnalysis.negativeReviewCountMom ?? '-',
        tongbi: amazonAfterSalesAnalysis.negativeReviewCountYoy ?? '-',
      },
      // {
      //   label: '留评率',
      //   value: formatRate(amazonAfterSalesAnalysis.reviewRate).toString() ?? '-',
      //   unit: '',
      //   ringbi: amazonAfterSalesAnalysis.reviewRateMom ?? '-',
      //   tongbi: amazonAfterSalesAnalysis.reviewRateYoy ?? '-',
      // },
      {
        label: '退货量',
        ...formatNumberObj(amazonAfterSalesAnalysis.returnQuantity),
        ringbi: amazonAfterSalesAnalysis.returnQuantityMom ?? '-',
        tongbi: amazonAfterSalesAnalysis.returnQuantityYoy ?? '-',
      },
      {
        label: '退货率',
        ...formatRate(amazonAfterSalesAnalysis.returnRate),
        ringbi: amazonAfterSalesAnalysis.returnRateMom ?? '-',
        tongbi: amazonAfterSalesAnalysis.returnRateYoy ?? '-',
      },
    ];
  });

  const wordCloudData = computed(() => {
    return (props.amazonAfterSalesAnalysis?.tagCloudList || []).map((x) => {
      return {
        name: x.tagName,
        qty: x.qty || 0,
        value: x.weight || 0,
      };
    });
  });

  // 星级统计

  const getStarNameFromLevel = (level) => {
    return (
      {
        1: '1星',
        2: '2星',
        3: '3星',
        4: '4星',
        5: '5星',
      }[level] || ''
    );
  };
  const starData = computed(() => {
    return [5, 4, 3, 2, 1].map((level) => {
      const name = getStarNameFromLevel(level);
      const item =
        (props.amazonAfterSalesAnalysis?.reviewStarStatList || []).find(
          (x) => x.starLevel === name
        ) || {};
      const value = item.reviewCount || 0;
      const percentage = item.percentage || 0;
      return {
        level,
        name,
        value,
        percentage,
      };
    });
  });
  // 词云图
  const { domRef: amazonWordCloudRef, initChart: initAmazonWordCloudChart } = useStationWordCloud();

  // Review星级统计
  const starBarChartRef = ref();
  let starBarChartInstance: echarts.ECharts | null = null;
  const initStarBarChart = () => {
    if (!starBarChartRef.value) return;
    if (!starBarChartInstance) {
      starBarChartInstance = echarts.init(starBarChartRef.value);
      useResizeObserver(starBarChartRef, () => {
        starBarChartInstance!.resize();
      });
    }
    const isEmpty = starData.value.every((x) => !x.value);
    const option = {
      grid: {
        left: 30,
        right: 20,
        bottom: 18,
        top: 10,
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        textStyle: {
          color: '#fff',
        },
      },
      xAxis: {
        type: 'value',
        axisLabel: {
          color: '#999',
          fontSize: 12,
          formatter: (value: number) => `${value / 10000}W`,
        },
        splitLine: {
          lineStyle: {
            type: [3, 6],
            color: '#ececec',
          },
        },
        axisLine: {
          lineStyle: {
            color: 'blue',
          },
        },
      },
      yAxis: {
        type: 'category',
        data: starData.value.map((x) => x.name),
        inverse: true,
        axisLabel: {
          color: '#999',
          fontSize: 12,
        },
        axisTick: { show: false },
        axisLine: {
          lineStyle: {
            color: '#e6e6e6',
          },
        },
      },
      series: [
        {
          name: '数量',
          type: 'bar',
          data: isEmpty ? [] : starData.value.map((x) => x.value),
          barWidth: 11,
          itemStyle: {
            color: '#02b96b',
          },
          emphasis: {
            focus: 'series',
          },
        },
      ],
    };

    starBarChartInstance.setOption(option);
  };

  // Review类型统计
  const reviewSummaryData = computed(() => {
    const reviewTypeStatList = props.amazonAfterSalesAnalysis.reviewTypeStatList || [];
    return [
      {
        name: 'VP评论',
        value: reviewTypeStatList?.[0]?.vpReviewCount || 0,
        percentage: reviewTypeStatList?.[0]?.vpReviewRatio || 0,
        color: '#02B96B',
      },
      {
        name: '非VP评论',
        value: reviewTypeStatList?.[0]?.nonVpReviewCount || 0,
        percentage: reviewTypeStatList?.[0]?.nonVpReviewRatio || 0,
        color: '#258DFF',
      },
    ];
  });

  const reviewSummaryChartRef = ref();
  let reviewSummaryChartInstance: echarts.ECharts | null = null;
  const initReviewSummaryChart = () => {
    if (!reviewSummaryChartRef.value) return;
    if (!reviewSummaryChartInstance) {
      reviewSummaryChartInstance = echarts.init(reviewSummaryChartRef.value);
      useResizeObserver(reviewSummaryChartRef, () => {
        reviewSummaryChartInstance!.resize();
      });
    }
    const isEmpty = reviewSummaryData.value.every((x) => !x.value);
    const option = {
      tooltip: {
        trigger: 'item',
        textStyle: {
          fontSize: 12,
        },
      },
      legend: {
        show: true,
        left: 'center',
        bottom: '0',
        orient: 'vertical',
        formatter: (name) => {
          const item = reviewSummaryData.value.find((item) => item.name === name) || {};
          return `{name|${name}: }{value|${item.value || 0}} {percentage|${item.percentage || 0}%}`;
        },
        textStyle: {
          rich: {
            name: {
              color: '#666',
              fontSize: 12,
            },
            value: {
              color: '#333',
              fontSize: 12,
              fontWeight: 'bold',
            },
            percentage: {
              color: '#999',
              fontSize: 12,
            },
          },
        },
      },
      series: isEmpty
        ? []
        : [
            {
              top: 40,
              bottom: 85,
              name: 'Review类型',
              type: 'pie',
              radius: [30, 50],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: 'center',
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '20',
                  fontWeight: 'bold',
                },
              },
              labelLine: {
                show: false,
              },
              itemStyle: {
                borderWidth: 2,
                borderColor: '#fff',
              },
              data: reviewSummaryData.value.map((item) => ({
                value: item.value,
                name: item.name,
                itemStyle: {
                  color: item.color,
                },
              })),
            },
          ],
    };

    reviewSummaryChartInstance.setOption(option);
  };

  // 计算 star-summary 数据
  const starSummaryData = computed(() => {
    return [...starData.value];
  });

  watch(
    () => wordCloudData.value,
    () => {
      initAmazonWordCloudChart(wordCloudData.value);
    }
  );

  watch(
    () => reviewSummaryData.value,
    () => {
      initReviewSummaryChart();
    }
  );

  watch(
    () => starData.value,
    () => {
      initStarBarChart();
    }
  );

  onMounted(() => {
    nextTick(() => {
      initAmazonWordCloudChart(wordCloudData.value);
      initStarBarChart();
      initReviewSummaryChart();
    });
  });
</script>

<style scoped lang="scss">
  .amazon-container {
    display: flex;
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
      display: flex;
      flex-direction: column;
      gap: 16px;

      .right-top {
        height: 137px;
        padding: 12px 16px;
        border-radius: 10px;
        border: 1px solid var(---N3, #ededed);

        .indicator-list {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          min-width: 100%;

          .indicator-item {
            flex: 1;
            max-width: 110px;

            .label {
              color: var(---N8, #666);
              font-size: 12px;
              font-weight: 400;
              word-break: keep-all;
            }

            .value {
              display: flex;
              align-items: flex-end;
              gap: 4px;
              padding-top: 4px;
              padding-bottom: 10px;

              .number {
                color: var(---N9, #1f1f1f);
                font-family: DIN Blod;
                font-size: 20px;
                font-style: normal;
                font-weight: 400;
                line-height: 24px; /* 120% */
              }

              .unit {
                display: flex;
                width: 14px;
                height: 16px;
                flex-direction: column;
                justify-content: center;
                flex-shrink: 0;
              }
            }

            .change {
              font-size: 12px;
              border-top: 1px solid var(---N3, #ededed);
              padding-top: 10px;

              .rate {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-top: 4px;

                &:first-child {
                  margin-top: 0;
                }

                .rate-name {
                  color: var(---N8, #666);
                  /* 较弱/Regular 12 */
                  font-family: 'PingFang SC';
                  font-size: 12px;
                  font-style: normal;
                  font-weight: 400;
                  line-height: 20px; /* 166.667% */
                  word-break: keep-all;
                }

                .rate-value {
                  color: var(---C4, #02b96b);
                  font-size: 12px;
                  line-height: 20px; /* 166.667% */
                  word-break: keep-all;
                  white-space: nowrap;

                  svg {
                    margin-left: 15px;
                  }

                  &.up {
                    color: var(---C7, #f53f3f);
                  }
                }
              }
            }
          }
        }
      }

      .right-bottom {
        flex: 1;
        display: flex;
        gap: 16px;
        height: 228px;
        align-items: stretch;

        section {
          flex: 1;
        }

        .star-bar-chart {
          min-width: 0;
          flex: 1;
          border: 1px solid transparent;
          display: flex;
          flex-direction: column;

          .star-bar-chart-title {
            color: var(---N9, #1f1f1f);

            /* 较弱/Medium 12 */
            font-family: 'PingFang SC Medium';
            font-size: 12px;
            font-style: normal;
            font-weight: 500;
            line-height: 20px; /* 166.667% */
          }

          .star-bar-chart-container {
            min-height: 0;
            flex: 1;
          }
        }

        .star-summary {
          min-width: 0;
          flex: 1;
          border-radius: 10px;
          border: 1px solid var(---N3, #ededed);

          .star-summary-table {
            max-width: 100%;
            width: 100%;
            min-width: 100%;
          }

          thead {
            background: var(---N1, #f7f7f7);
            color: var(---N8, #666);
            font-size: 12px;
            line-height: 20px;
            font-weight: 400;

            th {
              color: var(---N8, #666);
              /* 较弱/Regular 12 */
              font-family: 'PingFang SC Medium';
              font-size: 12px;
              font-style: normal;
              font-weight: 400;
              line-height: 20px; /* 166.667% */
            }
          }

          tbody {
            tr {
              border-top: 1px solid var(---N3, #ededed);
            }
          }

          $cell-padding-side: 5px;

          .star {
            padding: $cell-padding-side 0 $cell-padding-side 12px;

            :deep(.el-rate) {
              height: 28px;

              .el-rate__item {
                .el-icon {
                  margin: 0;
                }
              }
            }
          }

          .revcount {
            padding: $cell-padding-side 12px $cell-padding-side 0;
            text-align: right;
          }

          .rate {
            padding: $cell-padding-side 12px $cell-padding-side 0;
            text-align: right;
          }
        }

        .review-summary {
          min-width: 0;
          flex: 1;
          border-radius: 10px;
          border: 1px solid var(---N3, #ededed);
          display: flex;
          padding: 9px 16px;
          flex-direction: column;

          .title {
            font-size: 14px;
            font-weight: bold;
            line-height: 20px;
          }

          .desc {
            color: var(---N6, #999);
            font-size: 12px;
            font-weight: 400;
            line-height: 18px;
            margin-top: 4px;
          }

          .review-summary-chart {
            flex: 1;
          }
        }
      }
    }
  }
</style>
