<template>
  <DataCard title="供应链分析">
    <template #title>
      <label class="link-label" @click="onDetail">
        <span>供应链分析</span>
        <i class="iconfont icon-jiantouxiangyou"></i>
      </label>
    </template>
    <template #actions></template>
    <div class="content">
      <HorizontalScrollContainer>
        <div class="core-indicators__cards">
          <div v-for="(card, index) in cardDatas" :key="index" class="core-indicators__card">
            <div class="card-header-content">
              <div>
                <div class="card-header">
                  <span class="card-title">{{ card.title }}</span>
                </div>
                <div class="card-value">
                  {{ card.value === undefined || card.value === null ? '-' : card.value }}
                  <span v-if="card.unit" class="card-unit">{{ card.unit }}</span>
                </div>
              </div>
              <div class="card-trend">
                <CoreDataEchart v-if="card.trendList" :data="card.trendList" color="#02B96B" />
              </div>
            </div>
            <div class="card-compare">
              <span>环比</span>
              <arrow-icon :is-up="card.monthlyGrowth >= 0" />
              <span class="rate" :class="[card.monthlyGrowth >= 0 ? 'up' : 'down']">
                {{ formatPercent(Math.abs(card.monthlyGrowth)) }}%
              </span>
              <span class="divider"></span>
              <span>同比</span>
              <arrow-icon :is-up="card.yearlyGrowth >= 0" />
              <span class="rate" :class="[card.yearlyGrowth >= 0 ? 'up' : 'down']">
                {{ formatPercent(Math.abs(card.yearlyGrowth)) }}%
              </span>
            </div>
          </div>
        </div>
      </HorizontalScrollContainer>
      <div class="content-detail">
        <TransType
          :labelList="supplyChainAnalysis?.labelList || []"
          :labelTrendList="supplyChainAnalysis?.labelTrendList || []"
        />
      </div>
    </div>
  </DataCard>
</template>

<script setup lang="ts">
  import { formatPercent, formatNumberObj } from '@/views/bi/utils/utils';
  import ArrowIcon from '@/views/personalCenter/components/arrowIcon.vue';
  import { SupplyChainAnalysisBean } from '@/api/bi/data-contracts';
  import { useRouter } from 'vue-router';
  import HorizontalScrollContainer from '@/views/personalCenter/components/HorizontalScrollContainer.vue';
  import { decryptByBase64 } from '@/utils/aesTils';
  import TransType from './transType.vue';
  import CoreDataEchart from './indicatorsChart.vue';
  import DataCard from '../../components/DataCard.vue';
  import { useReport } from '../../hooks/useReport';

  const router = useRouter();

  const props = withDefaults(
    defineProps<{
      supplyChainAnalysis: SupplyChainAnalysisBean;
    }>(),
    {
      supplyChainAnalysis: {},
    }
  );

  const cardDatas = computed(() => {
    const supplyChainAnalysis = props.supplyChainAnalysis || {};
    return [
      {
        title: '总库存件数',
        ...formatNumberObj(supplyChainAnalysis.totalStockQty),
        monthlyGrowth: supplyChainAnalysis.totalStockQtyMom,
        yearlyGrowth: supplyChainAnalysis.totalStockQtyYoy,
        trendList: (supplyChainAnalysis.trendList || []).map((x) => {
          return {
            date: x.period,
            value: x.totalStockQty,
          };
        }),
      },
      {
        title: '海外仓库存件数',
        ...formatNumberObj(supplyChainAnalysis.overseasWarehouseTotalStockQty),
        monthlyGrowth: supplyChainAnalysis.overseasWarehouseTotalStockQtyMom,
        yearlyGrowth: supplyChainAnalysis.overseasWarehouseTotalStockQtyYoy,
        trendList: (supplyChainAnalysis.trendList || []).map((x) => {
          return {
            date: x.period,
            value: x.overseasWarehouseTotalStockQty,
          };
        }),
      },
      {
        title: '平台仓库存件数',
        ...formatNumberObj(supplyChainAnalysis.platformWarehouseTotalStockQty),
        monthlyGrowth: supplyChainAnalysis.platformWarehouseTotalStockQtyMom,
        yearlyGrowth: supplyChainAnalysis.platformWarehouseTotalStockQtyYoy,
        trendList: (supplyChainAnalysis.trendList || []).map((x) => {
          return {
            date: x.period,
            value: x.platformWarehouseTotalStockQty,
          };
        }),
      },
      {
        title: '滞销库存件数',
        ...formatNumberObj(supplyChainAnalysis.unsalableInventoryStockQty),
        monthlyGrowth: supplyChainAnalysis.unsalableInventoryStockQtyMom,
        yearlyGrowth: supplyChainAnalysis.unsalableInventoryStockQtyYoy,
        trendList: (supplyChainAnalysis.trendList || []).map((x) => {
          return {
            date: x.period,
            value: x.unsalableInventoryStockQty,
          };
        }),
      },
      {
        title: '低库存件数',
        ...formatNumberObj(supplyChainAnalysis.lowInventoryStockQty),
        monthlyGrowth: supplyChainAnalysis.lowInventoryStockQtyMom,
        yearlyGrowth: supplyChainAnalysis.lowInventoryStockQtyYoy,
        trendList: (supplyChainAnalysis.trendList || []).map((x) => {
          return {
            date: x.period,
            value: x.lowInventoryStockQty,
          };
        }),
      },
      {
        title: '库存周转天数',
        value: supplyChainAnalysis.inventoryTurnoverDay,
        unit: '天',
        monthlyGrowth: supplyChainAnalysis.inventoryTurnoverDayMom,
        yearlyGrowth: supplyChainAnalysis.inventoryTurnoverDayYoy,
        trendList: (supplyChainAnalysis.trendList || []).map((x) => {
          return {
            date: x.period,
            value: x.inventoryTurnoverDay,
          };
        }),
      },
    ];
  });
  const { report } = useReport();
  const onDetail = () => {
    const info = {
      title: '供应链分析',
      menuCode: 'M2025041820512773237273',
      frameUrl:
        'aHR0cHM6Ly9maW5lYmkubHV0ZW9zLmNvbS93ZWJyb290L2RlY2lzaW9uL3Y1L2Rlc2lnbi9yZXBvcnQvNmRmM2Q1MWNjNzA5NGFiMmE4ZGJkYzQzODMwYWIzOGYvdmlldw==',
    };
    report('drill_down_page', {
      special_topic_title: '供应链分析',
      button_name: '供应链分析',
      drill_down_page_name: '供应链分析',
      drill_down_page_url: decryptByBase64(info.frameUrl),
    });
    router.push({
      name: 'frame',
      params: {
        menuCode: info.menuCode,
        frameUrl: info.frameUrl,
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
      justify-content: space-between;
      min-width: 100%;
      gap: 17px;
    }

    .core-indicators__card {
      flex: 1;
      padding: 14px 20px;
      //display: flex;
      //flex-direction: column;
      //justify-content: space-between;
      box-sizing: border-box;
      position: relative;
      border-radius: 10px;
      border: 1px solid var(---N3, #ededed);
      background: #fff;
      //cursor: pointer;

      //&:hover {
      //  box-shadow: 0 6px 36px 0 rgba(6, 8, 27, 0.08);
      //}

      .card-header-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
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

      .card-trend {
        flex: none;
        width: 83px;
        height: 51px;
        margin-left: 30px;
      }

      .card-value {
        font-family: DIN Blod;
        font-size: 24px;
        line-height: 26px;
        font-weight: 400;
        color: var(---N9, #1f1f1f);
        margin-top: 8px;
        word-break: keep-all;
        white-space: nowrap;

        .card-unit {
          font-family: 'PingFang SC Medium';
          font-size: 14px;
          line-height: 22px;
          color: var(---N9, #1f1f1f);
          font-weight: 500;
        }
      }

      .card-compare {
        display: flex;
        align-items: center;
        font-size: 12px;
        line-height: 20px;
        font-weight: 400;
        color: #666;
        white-space: nowrap;

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

        .divider {
          width: 1px;
          height: 12px;
          background: #d9d9d9;
          margin: 0 8px;
        }
      }
    }
  }
</style>
