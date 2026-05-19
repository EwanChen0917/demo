<template>
  <DataCard title="销售分析">
    <template #title>
      <label class="link-label" @click="onDetail">
        <span>销售分析</span>
        <i class="iconfont icon-jiantouxiangyou"></i>
      </label>
    </template>
    <template #actions></template>

    <div class="content">
      <HorizontalScrollContainer>
        <div class="core-indicators__cards">
          <div
            v-for="(card, index) in cardDatas"
            :key="index"
            class="core-indicators__card"
            :class="{ current: card.code === currentCard }"
            @click="handlerSelectCard(card)"
          >
            <div class="card-header-content">
              <div class="card-header">
                <span class="card-title">{{ card.title }}</span>
              </div>
              <div class="card-value">
                {{ card.value === undefined || card.value === null ? '-' : card.value }}
                <span v-if="card.unit" class="card-unit">{{ card.unit }}</span>
              </div>
            </div>
            <div class="card-compare">
              <div class="card-compare-item" v-if="card.target !== undefined">
                <div class="key">目标</div>
                <div class="value">
                  {{ card.target }}
                </div>
              </div>
              <div class="card-compare-item" v-if="card.completionRate">
                <div class="key">达成率</div>
                <div class="value">
                  {{ formatRate(+card.completionRate) }}
                </div>
              </div>
              <div class="card-compare-item">
                <div class="key">环比</div>
                <div class="value">
                  <arrow-icon :is-up="card.monthlyGrowth >= 0" />
                  <span class="rate" :class="[card.monthlyGrowth >= 0 ? 'up' : 'down']">
                    {{ formatRate(Math.abs(card.monthlyGrowth)) }}
                  </span>
                </div>
              </div>
              <div class="card-compare-item" v-if="card.monthlyGrowthDiff">
                <div class="key">环比差值</div>
                <div class="value">
                  <arrow-icon :is-up="!card.monthlyGrowthDiff?.startsWith('-')" />
                  <span
                    class="rate"
                    :class="[!card.monthlyGrowthDiff?.startsWith('-') ? 'up' : 'down']"
                  >
                    {{
                      card.monthlyGrowthDiff?.startsWith('-')
                        ? card.monthlyGrowthDiff.slice(1)
                        : card.monthlyGrowthDiff
                    }}
                    <span v-if="card.monthlyGrowthDiffUnit" class="card-unit">
                      {{ card.monthlyGrowthDiffUnit }}
                    </span>
                  </span>
                </div>
              </div>

              <div class="card-compare-item">
                <div class="key">同比</div>
                <div class="value">
                  <arrow-icon :is-up="card.yearlyGrowth >= 0" />
                  <span class="rate" :class="[card.yearlyGrowth >= 0 ? 'up' : 'down']">
                    {{ formatPercent(Math.abs(card.yearlyGrowth)) }}%
                  </span>
                </div>
              </div>

              <div class="card-compare-item" v-if="card.yearlyGrowthDiff">
                <div class="key">同比差值</div>
                <div class="value">
                  <arrow-icon :is-up="!card.yearlyGrowthDiff?.startsWith('-')" />
                  <span
                    class="rate"
                    :class="[!card.yearlyGrowthDiff?.startsWith('-') ? 'up' : 'down']"
                  >
                    {{
                      card.yearlyGrowthDiff?.startsWith('-')
                        ? card.yearlyGrowthDiff.slice(1)
                        : card.yearlyGrowthDiff
                    }}
                    <span v-if="card.yearlyGrowthDiffUnit" class="card-unit">
                      {{ card.yearlyGrowthDiffUnit }}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </HorizontalScrollContainer>

      <div class="content-detail">
        <SaleCharts
          v-if="currentChartData?.data?.length"
          :key="currentCard"
          :card="currentChartData"
          :data="currentChartData?.data"
        />
      </div>
    </div>
  </DataCard>
</template>

<script setup lang="ts">
  import { formatPercent, formatNumberObj, formatRate } from '@/views/bi/utils/utils';
  import ArrowIcon from '@/views/personalCenter/components/arrowIcon.vue';
  import SaleCharts from '@/views/personalCenter/part/saleAnalysis/saleCharts.vue';
  import { FrontSalesAnalysisBean } from '@/api/bi/data-contracts';
  import HorizontalScrollContainer from '@/views/personalCenter/components/HorizontalScrollContainer.vue';
  import { decryptByBase64, encryptByBase64 } from '@/utils/aesTils';
  import { biApi } from '@/api';
  import dayjs from 'dayjs';
  import DataCard from '../../components/DataCard.vue';
  import { useReport } from '../../hooks/useReport';

  const router = useRouter();

  const props = withDefaults(
    defineProps<{
      salesAnalysis: FrontSalesAnalysisBean;
    }>(),
    {
      salesAnalysis: {},
    }
  );
  const isWeek = computed(() => {
    return ['day', 'week'].includes(props.salesAnalysis.dateType);
  });

  const currentCard = ref('');

  onMounted(() => {
    handlerSelectCard(cardDatas.value[0]);
  });

  const handlerSelectCard = (card) => {
    currentCard.value = card?.code;
    report('click', {
      special_topic_title: '销售分析',
      button_name: cardDatas.value.find((x) => x.code === currentCard.value)?.title,
    });
  };
  const currentChartData = computed(() => {
    return cardDatas.value.find((x) => x.code === currentCard.value);
  });

  const generateTrendList = (list) => {
    return [
      {
        name: '本期',
        color: '#02B96B',
        iconName: 'legendGreen',
        data: list.map((x) => {
          return {
            date: x.date,
            value: x.currentValue,
          };
        }),
      },
      {
        name: '环比',
        color: '#258DFF',
        iconName: 'legendBlue',
        data: list.map((x) => {
          return {
            date: x.date,
            value: x.momValue && x.momValue * 100,
          };
        }),
      },
      {
        name: '同比',
        color: '#FF9F22',
        iconName: 'legendOrange',
        data: list.map((x) => {
          return {
            date: x.date,
            value: x.yoyValue && x.yoyValue * 100,
          };
        }),
      },
    ];
  };

  const cardDatas = computed(() => {
    const salesAnalysis = props.salesAnalysis || {};
    return [
      {
        title: '销量',
        code: 'SalesVolume',
        ...formatNumberObj(salesAnalysis.saleQty),
        monthlyGrowth: salesAnalysis.saleQtyMom,
        yearlyGrowth: salesAnalysis.saleQtyYoy,
        target: isWeek.value
          ? undefined
          : `${formatNumberObj(salesAnalysis.saleQtyTarget).toString()}`,
        completionRate: isWeek.value
          ? undefined
          : `${formatNumberObj(salesAnalysis.saleQtyCompletionRate).toString()}`,
        data: generateTrendList(salesAnalysis.saleQtyTrendList || []),
        dateType: salesAnalysis.dateType,
      },
      {
        title: '销售额',
        code: 'SalesAmount',
        ...formatNumberObj(salesAnalysis.salesAmount),
        target: isWeek.value
          ? undefined
          : `${formatNumberObj(salesAnalysis.salesAmountTarget).toString()}`,
        completionRate: isWeek.value
          ? undefined
          : `${formatNumberObj(salesAnalysis.salesAmountCompletionRate).toString()}`,
        monthlyGrowth: salesAnalysis.salesAmountMom,
        yearlyGrowth: salesAnalysis.salesAmountYoy,
        data: generateTrendList(salesAnalysis.salesAmountTrendList || []),
        dateType: salesAnalysis.dateType,
      },
      {
        title: '成交均价',
        code: 'AdSales',
        ...formatNumberObj(salesAnalysis.avgSalesAmount),
        valueUnit: '元',
        monthlyGrowth: salesAnalysis.avgSalesAmountMom,
        monthlyGrowthDiff: isWeek.value
          ? undefined
          : formatNumberObj(salesAnalysis.avgSalesAmountMomDiff).value,
        monthlyGrowthDiffUnit: isWeek.value
          ? undefined
          : formatNumberObj(salesAnalysis.avgSalesAmountMomDiff).unit,
        yearlyGrowth: salesAnalysis.avgSalesAmountYoy,
        yearlyGrowthDiff: isWeek.value
          ? undefined
          : formatNumberObj(salesAnalysis.avgSalesAmountYoyDiff).value,
        yearlyGrowthDiffUnit: isWeek.value
          ? undefined
          : formatNumberObj(salesAnalysis.avgSalesAmountYoyDiff).unit,
        data: generateTrendList(salesAnalysis.avgSalesAmountTrendList || []),
        dateType: salesAnalysis.dateType,
      },
      {
        title: '广告花费',
        code: 'AdCost',
        ...formatNumberObj(salesAnalysis.adCost),
        monthlyGrowth: salesAnalysis.adCostMom,
        monthlyGrowthDiff: isWeek.value
          ? undefined
          : formatNumberObj(salesAnalysis.adCostMomDiff).value,
        monthlyGrowthDiffUnit: isWeek.value
          ? undefined
          : formatNumberObj(salesAnalysis.adCostMomDiff).unit,
        yearlyGrowth: salesAnalysis.adCostYoy,
        yearlyGrowthDiff: isWeek.value
          ? undefined
          : formatNumberObj(salesAnalysis.adCostYoyDiff).value,
        yearlyGrowthDiffUnit: isWeek.value
          ? undefined
          : formatNumberObj(salesAnalysis.adCostYoyDiff).unit,
        data: generateTrendList(salesAnalysis.adCostTrendList || []),
        dateType: salesAnalysis.dateType,
      },
      {
        title: '促销折扣',
        code: 'PromotionDiscount',
        ...formatNumberObj(salesAnalysis.discountAmount),
        monthlyGrowth: salesAnalysis.discountAmountMom,
        monthlyGrowthDiff: isWeek.value
          ? undefined
          : formatNumberObj(salesAnalysis.discountAmountMomDiff).value,
        monthlyGrowthDiffUnit: isWeek.value
          ? undefined
          : formatNumberObj(salesAnalysis.discountAmountMomDiff).unit,
        yearlyGrowth: salesAnalysis.discountAmountYoy,
        yearlyGrowthDiff: isWeek.value
          ? undefined
          : formatNumberObj(salesAnalysis.discountAmountYoyDiff).value,
        yearlyGrowthDiffUnit: isWeek.value
          ? undefined
          : formatNumberObj(salesAnalysis.discountAmountYoyDiff).unit,
        data: generateTrendList(salesAnalysis.discountAmountTrendList || []),
        dateType: salesAnalysis.dateType,
      },
      {
        title: '退款额',
        code: 'RefundAmount',
        ...formatNumberObj(salesAnalysis.refundAmount),
        monthlyGrowth: salesAnalysis.refundAmountMom,
        monthlyGrowthDiff: isWeek.value
          ? undefined
          : formatNumberObj(salesAnalysis.refundAmountMomDiff).value,
        monthlyGrowthDiffUnit: isWeek.value
          ? undefined
          : formatNumberObj(salesAnalysis.refundAmountMomDiff).unit,
        yearlyGrowth: salesAnalysis.refundAmountYoy,
        yearlyGrowthDiff: isWeek.value
          ? undefined
          : formatNumberObj(salesAnalysis.refundAmountYoyDiff).value,
        yearlyGrowthDiffUnit: isWeek.value
          ? undefined
          : formatNumberObj(salesAnalysis.refundAmountYoyDiff).unit,
        data: generateTrendList(salesAnalysis.refundAmountTrendList || []),
        dateType: salesAnalysis.dateType,
      },
    ];
  });
  const { report } = useReport();
  const buildQuery = inject<any>('buildQuery')!;
  const onDetail = async () => {
    const info = {
      title: '销售分析',
      menuCode: 'M2025051418073230197678',
      frameUrl:
        'https://finebi.luteos.com/webroot/decision/v5/design/report/8d648abd2db34c12a9f239928b7f47d7/view',
    };
    report('drill_down_page', {
      special_topic_title: '销售分析',
      button_name: '销售分析',
      drill_down_page_name: '销售分析',
      drill_down_page_url: info.frameUrl,
    });
    // const query = buildQuery();
    // const filteredQuery = Object.keys(query).reduce((acc, key) => {
    //   let temp = query[key];
    //   if (isRef(query[key])) {
    //     temp = query[key].value;
    //   }
    //   if (
    //     (Array.isArray(temp) && temp.length > 0) ||
    //     (typeof temp !== 'object' && temp !== undefined && temp !== null && temp !== '')
    //   ) {
    //     acc[key] = temp;
    //     return acc;
    //   }
    //   return acc;
    // }, {});
    // if (filteredQuery.dateType === 'week') {
    //   const res = await biApi.biCommonQueryWeek({ weekStrEnd: filteredQuery.week });
    //   filteredQuery.startDate = res.weekList[0].startDate;
    //   filteredQuery.endDate = res.weekList[0].endDate;
    // } else if (filteredQuery.dateType === 'month') {
    //   const dateObj = dayjs(filteredQuery.month);
    //   filteredQuery.startDate = dateObj.startOf('month').format('YYYY-MM-DD');
    //   const endDate = dateObj.endOf('month').format('YYYY-MM-DD');
    //   filteredQuery.endDate = dayjs().isAfter(endDate) ? endDate : dayjs().format('YYYY-MM-DD');
    // }
    const params = new URLSearchParams();
    params.append('entryType', '7');
    // params.append('*订单下单时间_s', filteredQuery.startDate);
    // params.append('*订单下单时间_e', filteredQuery.endDate);
    // 要对空格转加号做特殊处理
    const biUrl = `${info.frameUrl}?${params.toString().replace(/\+/g, '%20')}`;
    router.push({
      name: 'frame',
      params: {
        menuCode: info.menuCode,
        frameUrl: encryptByBase64(biUrl),
      },
    });
  };
</script>

<style lang="scss" scoped>
  .content {
    display: flex;
    flex-direction: column;
    gap: 16px;

    .core-indicators__cards {
      display: flex;
      min-width: 100%;
      gap: 12px;
    }

    .core-indicators__card {
      flex: 1;
      min-width: 200px;
      padding: 14px 20px;
      justify-content: space-between;
      box-sizing: border-box;
      position: relative;
      border-radius: 10px;
      border: 1px solid var(--N3, #ededed);
      background: #fff;
      cursor: pointer;
      overflow: hidden;

      &:hover {
        box-shadow: 0 6px 36px 0 rgba(6, 8, 27, 0.08);
      }

      &.current {
        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: var(--P6, #02b96b);
          border-radius: 10px;
        }
      }

      .card-header-content {
        border-bottom: 1px solid var(---N3, #ededed);
        padding-bottom: 12px;
      }

      .card-header {
        display: flex;
        align-items: center;

        .card-title {
          font-size: 13px;
          color: #666;
          margin-right: 8px;
          line-height: 22px;
          word-break: keep-all;
        }
      }

      .card-value {
        font-family: DIN Blod;
        font-size: 24px;
        line-height: 26px;
        font-weight: 400;
        color: var(--N9, #1f1f1f);
        margin-top: 8px;
        word-break: keep-all;
        white-space: nowrap;

        .card-unit {
          font-family: 'PingFang SC Medium';
          font-size: 14px;
          line-height: 22px;
          color: var(--N9, #1f1f1f);
          font-weight: 500;
        }
      }

      .card-compare {
        font-size: 12px;
        line-height: 20px;
        font-weight: 400;
        color: #666;
        white-space: nowrap;

        .card-compare-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 10px;
          color: var(---N8, #666);
          /* 较弱/Regular 12 */
          font-family: 'PingFang SC';
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: 20px;
        }

        .arrow {
          margin: 0 2px;

          &.up {
            margin-top: 2px;
            color: #f53f3f;
          }

          &.down {
            color: #02b96b;
            transform: rotate(180deg);
          }
        }

        .rate {
          &.up {
            color: #f53f3f;
          }

          &.down {
            color: #02b96b;
          }
        }
      }
    }

    .content-detail {
      .chart-container {
        width: 100%;
        height: 300px;
      }
    }
  }
</style>
