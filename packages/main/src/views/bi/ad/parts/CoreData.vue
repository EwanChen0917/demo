<template>
  <div class="core-data">
    <div class="core-data--item" v-for="data in dataList" :key="data.label">
      <div class="core-data--item-header">
        <img class="core-data--item-logo" :src="data.logo" alt="" />
        <div class="core-data--data">
          <div class="core-data--label">{{ data.label }}</div>
          <div class="core-data--value">
            <div>
              <span>{{ data.value }}</span>
              <span class="core-data--unit">{{ data.unit }}</span>
            </div>
            <div class="mom">
              <span class="mom-label">环比</span>
              <svg
                :class="data.mom > 0 ? 'up' : 'down'"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M11.5221 8.76948C11.9747 9.28675 11.6074 10.0963 10.92 10.0963H4.80156C4.11423 10.0963 3.74689 9.28674 4.1995 8.76948L7.25874 5.2732C7.57747 4.90893 8.14414 4.90894 8.46286 5.2732L11.5221 8.76948Z"
                  fill="currentColor"
                />
              </svg>
              <span :class="data.mom > 0 ? 'up' : 'down'" class="mom-value">
                {{ data.mom ? formatRate(Math.abs(data.mom)) : '-' }}
              </span>
            </div>
          </div>
        </div>
        <div class="trend-thumbnail">
          <TrendEcharts :data="data.trendData" color="#02B96B" />
        </div>
      </div>
      <div class="hr"></div>
      <div class="core-data--footer">
        <template v-for="item in data.footer" :key="item.label">
          <div class="core-data--footer-item">
            <div>
              <div class="label">{{ item.label }}</div>
              <div class="value">
                <span>{{ item.value }}</span>
                <span class="unit">{{ item.unit }}</span>
              </div>
              <div class="mom">
                <span>环比</span>
                <span :class="item.mom > 0 ? 'positive' : 'negative'">
                  {{ formatRate(item.mom) }}
                </span>
              </div>
            </div>
          </div>
          <div class="gap"></div>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { BiContracts } from '@/api';
  import { formatNumberObj, formatRate } from '../../utils/utils';
  import TrendEcharts from '../../components/trendEcharts.vue';

  const props = defineProps<{
    total?: BiContracts.AdBaseMetricDO;
    trendList?: BiContracts.AdBaseMetricTrendDO[];
  }>();

  const dataList = computed(() => {
    return [
      {
        label: '总销售额',
        logo: getImg('saleAmount.png'),
        ...formatNumberObj(props.total?.totalSalesAmount),
        mom: props.total?.totalSalesAmountMom,
        trendData: props.trendList?.map((item) => ({
          date: item.date,
          value: item.totalSalesAmount,
        })),
        footer: [
          {
            label: '广告总销售额',
            ...formatNumberObj(props.total?.adSalesAmount),
            mom: props.total?.adSalesAmountMom,
          },
          {
            label: '广告花费',
            ...formatNumberObj(props.total?.cost),
            mom: props.total?.costMom,
          },
          {
            label: '总订单',
            ...formatNumberObj(props.total?.totalOrderQty),
            mom: props.total?.totalOrderQtyMom,
          },
          {
            label: '广告总订单',
            ...formatNumberObj(props.total?.adOrderQty),
            mom: props.total?.adOrderQtyMom,
          },
        ],
      },
      {
        label: '曝光量',
        logo: getImg('impressions.png'),
        ...formatNumberObj(props.total?.impressions),
        mom: props.total?.impressionsMom,
        trendData: props.trendList?.map((item) => ({
          date: item.date,
          value: item.impressions,
        })),
        footer: [
          {
            label: '点击量',
            ...formatNumberObj(props.total?.clicks),
            mom: props.total?.clicksMom,
          },
          {
            label: 'CTR',
            ...formatRate(props.total?.ctr, {
              minimumFractionDigits: 1,
              maximumFractionDigits: 1,
            }),
            mom: props.total?.ctrMom,
          },
          {
            label: 'CVR',
            ...formatRate(props.total?.cvr, {
              minimumFractionDigits: 1,
              maximumFractionDigits: 1,
            }),
            mom: props.total?.cvrMom,
          },
          {
            label: 'CPA ',
            ...formatNumberObj(props.total?.cpa),
            mom: props.total?.cpaMom,
          },
        ],
      },
      {
        label: 'ROAS',
        logo: getImg('roas.png'),
        ...formatNumberObj(props.total?.roas),
        mom: props.total?.roasMom,
        trendData: props.trendList?.map((item) => ({
          date: item.date,
          value: item.roas,
        })),
        footer: [
          {
            label: 'CPM',
            ...formatNumberObj(props.total?.cpm),
            mom: props.total?.cpmMom,
          },
          {
            label: 'CPC',
            ...formatNumberObj(props.total?.cpc),
            mom: props.total?.cpcMom,
          },
          {
            label: 'ATV',
            value: formatNumberObj(props.total?.atv || 0),
            mom: props.total?.atvMom,
          },
          {
            label: '广告费比',
            ...formatRate(props.total?.costProp, {
              minimumFractionDigits: 1,
              maximumFractionDigits: 1,
            }),
            mom: props.total?.costPropMom,
          },
        ],
      },
    ];
  });

  const getImg = (name: string) => {
    return new URL(`../images/${name}`, import.meta.url).href;
  };
</script>

<style scoped lang="scss">
  .core-data {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 16px;
    .core-data--item {
      border-radius: 10px;
      background: #fff;
      padding: 20px 24px;
    }
    .core-data--item-header {
      display: flex;
      align-items: center;
      column-gap: 20px;
    }
    .core-data--item-logo {
      width: 38px;
      height: 38px;
    }
    .core-data--data {
      flex: 1;
    }
    .core-data--label {
      margin-bottom: 8px;
      color: var(---N8, #666);

      /* 常规/Regular 14 */
      font-family: 'PingFang SC';
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 22px; /* 157.143% */
    }
    .core-data--value {
      display: flex;
      align-items: end;
      column-gap: 20px;
      color: var(---N9, #1f1f1f);
      font-family: DIN;
      font-size: 24px;
      font-style: normal;
      font-weight: 700;
      line-height: 28px; /* 116.667% */
      .mom {
        display: inline-flex;
        align-items: center;
        column-gap: 2px;
        .down {
          color: var(---C4, #02b96b);
        }
        .up {
          color: var(---C5, #f44336);
        }
        .down:not(.mom-value) {
          transform: rotate(180deg);
        }
      }
      .mom-label {
        color: var(---N8, #666);

        /* 较弱/Regular 12 */
        font-family: 'PingFang SC';
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px; /* 166.667% */
      }
      .mom-value {
        /* 较弱/Regular 12 */
        font-family: 'PingFang SC';
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px; /* 166.667% */
      }
    }
    .core-data--unit {
      margin-left: 4px;
      color: var(---N9, #1f1f1f);

      /* 常规/Medium 14 */
      font-family: 'PingFang SC';
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 22px; /* 157.143% */
    }
    .core-data--footer {
      display: flex;
      align-items: center;
      & .gap:last-of-type {
        display: none;
      }
      .core-data--footer-item {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: left;
        &:first-child {
          align-items: flex-start;
        }
      }
      .label {
        margin-bottom: 7px;
        color: var(---N8, #666);

        /* 常规/Regular 13 */
        font-family: 'PingFang SC';
        font-size: 13px;
        font-style: normal;
        font-weight: 400;
        line-height: 22px; /* 169.231% */
      }
      .value {
        margin-bottom: 7px;
        color: var(---N9, #1f1f1f);
        font-family: DIN;
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: 20px; /* 125% */
      }
      .unit {
        margin-left: 4px;
        color: #000;

        /* 常规/Medium 14 */
        font-family: 'PingFang SC';
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 22px; /* 157.143% */
      }
      .mom {
        display: flex;
        align-items: center;
        column-gap: 6px;
        color: var(---N6, #999);

        /* 较弱/Regular 12 */
        font-family: 'PingFang SC';
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px; /* 166.667% */
        .negative {
          color: var(---C4, #02b96b);
        }
        .positive {
          color: var(---C5, #f44336);
          &::before {
            content: '+';
          }
        }
      }
    }
  }
  .hr {
    background: var(---N2, #f5f5f5);
    height: 1px;
    margin: 16px 0;
  }
  .gap {
    display: block;
    width: 1px;
    height: 20px;
    background: var(---N3, #ededed);
  }
  .trend-thumbnail {
    width: 74px;
    height: 45px;
  }
</style>
