<template>
  <el-scrollbar
    :style="{ height: 'auto' }"
    :wrap-style="{
      overflowX: 'auto',
      overflowY: 'hidden',
      width: '100%',
      height: 'auto',
    }"
    :view-style="{ minWidth: '980px', height: 'auto' }"
  >
    <div class="core-data">
      <div v-for="(item, index) of coreData" :key="index" class="data-card">
        <div class="header">
          <div class="left">
            <h3 class="title">{{ item.value.title }}</h3>
            <p class="count">{{ item.value.count }}</p>
          </div>
          <div class="right">
            <TrendEcharts
              v-if="item.value.trendList?.length"
              :data="item.value.trendList"
              color="#02B96B"
            />
          </div>
        </div>
        <div class="footer">
          <span class="previous">
            <span class="label">上期</span>
            <span class="num">
              {{ item.value.preCount }}
            </span>
          </span>
          <div class="divider"></div>
          <div
            class="growth"
            :class="{ positive: item.value.growth >= 0, negative: item.value.growth < 0 }"
          >
            <span class="label">环比</span>
            <i
              class="arrow iconfont icon-sanjiaojiantouxiangxia"
              :class="[item.value.growth >= 0 ? 'up' : 'down']"
            ></i>
            <span class="growth-value">
              {{
                item.value.growth
                  ? item.value.growth.toLocaleString('zh-CN', {
                      style: 'percent',
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  : '-'
              }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </el-scrollbar>
</template>

<script setup lang="ts">
  import { type BiContracts } from '@/api';
  import { toThousands } from '@/utils/toThousands';
  import TrendEcharts from '../components/TrendEcharts.vue';

  const detailData = inject<Ref<BiContracts.VocAnalysisResp>>('dataDetail');
  const coreIndicator = computed(() => {
    return detailData?.value?.coreIndicator || {};
  });

  interface CoreData {
    title: string;
    count?: string;
    preCount?: string;
    growth?: number;
    trendList: { month: string; value?: number }[];
    trendColor?: string;
  }

  const lastWeekCountCard = computed<CoreData>(() => {
    const lastWeekCount = coreIndicator.value?.lastWeekCount || {};
    return {
      title: 'VOC量 - 上周',
      count: isNull(lastWeekCount.count) ? '-' : toThousands(lastWeekCount.count),
      preCount: isNull(lastWeekCount.preCount) ? '-' : toThousands(lastWeekCount.preCount),
      growth: lastWeekCount.growth,
      trendList:
        lastWeekCount.trendList?.map((item) => ({
          month: item.period!,
          value: item.count,
        })) || [],
    };
  });
  const lastWeekRateCard = computed<CoreData>(() => {
    const lastWeekCount = coreIndicator.value?.lastWeekCount || {};
    return {
      title: 'VOC占比 - 上周',
      count: isNull(lastWeekCount.vocRate) ? '-' : toPercent(lastWeekCount.vocRate!),
      preCount: isNull(lastWeekCount.vocPreRate) ? '-' : toPercent(lastWeekCount.vocPreRate!),
      growth: lastWeekCount.vocRateGrowth,
      trendList:
        lastWeekCount.trendList?.map((item) => ({
          month: item.period!,
          value: item.rate,
        })) || [],
    };
  });
  const last4WeekCountCard = computed<CoreData>(() => {
    const last4WeekCount = coreIndicator.value?.last4WeekCount || {};
    return {
      title: 'VOC量 - 近4周',
      count: isNull(last4WeekCount.count) ? '-' : toThousands(last4WeekCount.count),
      preCount: isNull(last4WeekCount.preCount) ? '-' : toThousands(last4WeekCount.preCount),
      growth: last4WeekCount.growth,
      trendList:
        last4WeekCount.trendList?.map((item) => ({
          month: item.period!,
          value: item.count,
        })) || [],
    };
  });
  const last4WeekRateCard = computed<CoreData>(() => {
    const last4WeekCount = coreIndicator.value?.last4WeekCount || {};
    return {
      title: 'VOC占比 - 近4周',
      count: isNull(last4WeekCount.vocRate) ? '-' : toPercent(last4WeekCount.vocRate!),
      preCount: isNull(last4WeekCount.vocPreRate) ? '-' : toPercent(last4WeekCount.vocPreRate!),
      growth: last4WeekCount.vocRateGrowth,
      trendList:
        last4WeekCount.trendList?.map((item) => ({
          month: item.period!,
          value: item.rate,
        })) || [],
    };
  });
  const last13WeekCountCard = computed<CoreData>(() => {
    const last13WeekCount = coreIndicator.value?.last13WeekCount || {};
    return {
      title: 'VOC量 - 近13周',
      count: isNull(last13WeekCount.count) ? '-' : toThousands(last13WeekCount.count),
      preCount: isNull(last13WeekCount.preCount) ? '-' : toThousands(last13WeekCount.preCount),
      growth: last13WeekCount.growth,
      trendList:
        last13WeekCount.trendList?.map((item) => ({
          month: item.period!,
          value: item.count,
        })) || [],
    };
  });
  const last13WeekRateCard = computed<CoreData>(() => {
    const last13WeekCount = coreIndicator.value?.last13WeekCount || {};
    return {
      title: 'VOC占比 - 近13周',
      count: isNull(last13WeekCount.vocRate) ? '-' : toPercent(last13WeekCount.vocRate!),
      preCount: isNull(last13WeekCount.vocPreRate) ? '-' : toPercent(last13WeekCount.vocPreRate!),
      growth: last13WeekCount.vocRateGrowth,
      trendList:
        last13WeekCount.trendList?.map((item) => ({
          month: item.period!,
          value: item.rate,
        })) || [],
    };
  });
  const currDateCountCard = computed<CoreData>(() => {
    const currDateCount = coreIndicator.value?.currDateCount || {};
    return {
      title: 'VOC量 - 筛选时间',
      count: isNull(currDateCount.count) ? '-' : toThousands(currDateCount.count!),
      preCount: isNull(currDateCount.preCount) ? '-' : toThousands(currDateCount.preCount!),
      growth: currDateCount.growth,
      trendList:
        currDateCount.trendList?.map((item) => ({
          month: item.period!,
          value: item.count,
        })) || [],
    };
  });
  const currDateRateCard = computed<CoreData>(() => {
    const currDateCount = coreIndicator.value?.currDateCount || {};
    return {
      title: 'VOC占比 - 筛选时间',
      count: isNull(currDateCount.vocRate) ? '-' : toPercent(currDateCount.vocRate!),
      preCount: isNull(currDateCount.vocPreRate) ? '-' : toPercent(currDateCount.vocPreRate!),
      growth: currDateCount.vocRateGrowth,
      trendList:
        currDateCount.trendList?.map((item) => ({
          month: item.period!,
          value: item.rate,
        })) || [],
    };
  });
  const coreData = computed(() => {
    return [
      lastWeekCountCard,
      last4WeekCountCard,
      last13WeekCountCard,
      currDateCountCard,
      lastWeekRateCard,
      last4WeekRateCard,
      last13WeekRateCard,
      currDateRateCard,
    ];
  });
  const isNull = (value: any) => {
    return value === null || value === undefined || value === '';
  };
  const toPercent = (value: number) => {
    return value.toLocaleString('zh-CN', {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };
</script>

<style lang="scss" scoped>
  .core-data {
    width: 100%;
    overflow: hidden;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }
  .data-card {
    border-radius: 10px;
    background: #fff;
    padding: 16px 20px;
    min-width: 233px;
    height: 130px;
    box-sizing: border-box;
    flex-shrink: 0;
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .left {
      display: flex;
      flex-direction: column;
      row-gap: 8px;
    }
    .title {
      color: var(---N8, #666);
      /* 常规/Regular 13 */
      font-family: 'PingFang SC';
      font-size: 13px;
      font-style: normal;
      font-weight: 400;
      line-height: 22px; /* 169.231% */
    }
    .count {
      color: var(---N9, #1f1f1f);
      font-family: 'DIN Blod';
      font-size: 24px;
      font-style: normal;
      font-weight: 600;
      line-height: 28px; /* 116.667% */
    }
    .right {
      width: 65px;
      height: 40px;
      flex-shrink: 0;
    }
    .footer {
      display: flex;
      justify-content: start;
      align-items: center;
      color: var(---N8, #666);

      /* 较弱/Regular 12 */
      font-family: 'PingFang SC';
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px; /* 166.667% */
      .previous {
        display: flex;
        align-items: center;
        column-gap: 4px;
      }
      .growth {
        display: flex;
        column-gap: 2px;
        align-items: center;
      }
      .up {
        transform: rotate(180deg);
      }
    }
  }
  .divider {
    width: 1px;
    height: 12px;
    background: #d9d9d9;
    margin: 0 8px;
  }
  .positive {
    color: #02b96b;
  }
  .negative {
    color: #f53f3f;
  }
  .label {
    color: var(---N8, #666);
  }
  .num {
    color: var(---N9, #1f1f1f);
    /* 较弱/Regular 12 */
    font-family: 'PingFang SC';
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 166.667% */
  }
</style>
