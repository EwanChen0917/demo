<template>
  <DashboardCard :data-dashboard-year="dashboardYear">
    <div class="base-order-echarts-wrapper" v-loading="loading">
      <div v-for="card in baseOrderCards" :key="card.key" class="card-item">
        <div class="card-top">
          <div class="card-top_title">{{ card.title }}</div>
          <span class="card-top_trend" :class="card.type">{{ formatYearTrend(card) }}</span>
        </div>
        <div class="card-num">
          {{ card.count }}
        </div>
      </div>
    </div>
  </DashboardCard>
</template>

<script setup lang="ts">
  import { computed, inject, ref, watch } from 'vue';
  import { omsApi } from '@/api';
  import { fulfillmentDashboardYearKey } from '../../injectionKeys';

  const dashboardYear = inject(fulfillmentDashboardYearKey, ref(new Date().getFullYear()));

  type orderSummaryType = {
    count: number;
    type: 'down' | 'up';
    rate: number;
  };
  type orderSummaryData = {
    totalOrders: orderSummaryType;
    deliveredOrders: orderSummaryType;
    undeliveredOrders: orderSummaryType;
  };
  const orderSummary = ref<orderSummaryData>({
    totalOrders: {
      count: 0,
      type: 'down',
      rate: 0,
    },
    deliveredOrders: {
      count: 0,
      type: 'down',
      rate: 0,
    },
    undeliveredOrders: {
      count: 0,
      type: 'down',
      rate: 0,
    },
  });
  type BaseOrderCardRow = orderSummaryType & {
    key: keyof orderSummaryData;
    title: string;
  };

  const baseOrderCards = computed<BaseOrderCardRow[]>(() => {
    const rows: { key: keyof orderSummaryData; title: string }[] = [
      { key: 'undeliveredOrders', title: '未交付订单' },
      { key: 'deliveredOrders', title: '已交付订单' },
      { key: 'totalOrders', title: '订单总数' },
    ];
    return rows.map(({ key, title }) => ({
      key,
      title,
      ...orderSummary.value[key],
    }));
  });

  const formatYearTrend = (row: orderSummaryType) => {
    const pct =
      Number.isFinite(row.rate) && row.rate !== Number.POSITIVE_INFINITY
        ? Math.abs(row.rate) * 100
        : 0;
    return row.type === 'up' ? `较去年+${pct.toFixed(0)}%` : `较去年-${pct.toFixed(0)}%`;
  };
  const loading = ref(false);
  const getData = async () => {
    try {
      if (loading.value) return;
      loading.value = true;
      const res = await omsApi.omsFulfillmentBiDashboardSummary({
        year: dashboardYear.value,
      });
      if (!res) return;
      const data = compareOrderSummary(res);
      if (data) {
        orderSummary.value = data;
      }
    } catch (error) {
      /** empty */
      // console.error(error);
    } finally {
      loading.value = false;
    }
  };

  /**
   * 后端格式为
   * {
   *   "year": 2025,
   *   "totalOrders": 2545,
   *   "deliveredOrders": 872,
   *   "undeliveredOrders": 1673
   * }
   * 将其组装成orderSummary的格式，并进行比较
   */
  const ORDER_SUMMARY_KEYS = [
    'totalOrders',
    'deliveredOrders',
    'undeliveredOrders',
  ] as const satisfies readonly (keyof orderSummaryData)[];

  const compareOrderSummary = (data: any): orderSummaryData | void => {
    if (!data || !Array.isArray(data) || data.length === 0 || data.length !== 2) return undefined;
    const currRow = data[1];
    const prevRow = data[0];

    const normalizeCount = (value: unknown) => {
      const num = Number(value);
      return Number.isFinite(num) ? num : 0;
    };

    const getRate = (curr: number, prev: number) => {
      if (curr === prev) return 0;
      if (prev === 0) return 1;
      return Math.abs((curr - prev) / prev);
    };

    return ORDER_SUMMARY_KEYS.reduce<orderSummaryData>((acc, key) => {
      const curr = normalizeCount(currRow?.[key]);
      const prev = normalizeCount(prevRow?.[key]);
      acc[key] = {
        count: curr,
        type: curr > prev ? 'up' : 'down',
        rate: getRate(curr, prev),
      };
      return acc;
    }, {} as orderSummaryData);
  };
  watch(
    dashboardYear,
    () => {
      getData();
    },
    { immediate: true }
  );
  defineExpose({
    getData,
  });
</script>

<style scoped lang="scss">
  .base-order-echarts-wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 50px;
    justify-content: space-between;
    .card-item {
      display: flex;
      flex-direction: column;
      flex: 1;
      max-width: 300px;
      height: 100px;
      border: 1px solid var(---N3, #ededed);
      padding: 10px 20px;
      border-radius: 10px;
      justify-content: center;
      .card-top {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
        &_title {
          font-size: 14px;
        }
        &_trend {
          font-size: 12px;
          &.up {
            color: var(--el-color-success, #67c23a);
          }
          &.down {
            color: var(--el-color-danger, #f56c6c);
          }
        }
      }
      .card-num {
        width: 100%;
        font-size: 24px;
        font-weight: 600;
        letter-spacing: 0.1em;
      }
      .card-echarts {
        width: 100%;
        flex: 1;
      }
    }
  }
</style>
