<template>
  <div class="statistics-bar">
    <template v-for="(item, key, index) in statistics" :key="key">
      <div class="statistics-card" @click="$emit('itemClick', { item, index })">
        <div class="card-content">
          <div class="icon-wrapper" :style="{ backgroundColor: item.iconBgColor }">
            <i :class="`iconfont icon-${item.icon}`" class="icon"></i>
          </div>
          <div class="content">
            <div class="label">{{ item.label }}</div>
            <div class="value-wrapper">
              <span class="value">{{ item.value }}</span>
              <span v-if="item.unit" class="unit">{{ item.unit }}</span>
              <div v-if="item.trend" class="trend" :class="{ positive: item.trend.isPositive }">
                <i
                  :class="`iconfont icon-sanjiaojiantou-${item.trend.isPositive ? 'shang' : 'xia'}`"
                ></i>
                <span class="trend-value">{{ item.trend.value }}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="index < 3" class="divider"></div>
    </template>
  </div>
</template>

<script setup lang="ts">
  interface TrendData {
    value: string;
    isPositive: boolean;
  }

  interface StatisticsItem {
    label: string;
    value: string;
    unit?: string;
    icon: string;
    iconBgColor: string;
    trend?: TrendData;
  }

  interface StatisticsData {
    completedTotal: StatisticsItem;
    inProgressTotal: StatisticsItem;
    analyzeAverageTime: StatisticsItem;
    analyzeSuccessRate: StatisticsItem;
  }

  interface Props {
    statistics: StatisticsData;
  }

  defineProps<Props>();

  defineEmits(['itemClick']);
</script>

<style scoped lang="scss">
  .statistics-bar {
    display: flex;
    align-items: center;
    background: #f9f9f9;
    border-radius: 10px;
    height: 110px;
    //margin: 16px 0;
    overflow: hidden;
  }

  .statistics-card {
    flex: 1;
    display: flex;
    align-items: center;

    .card-content {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 0 40px;
      width: 100%;
    }

    .icon-wrapper {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;

      .icon {
        font-size: 20px;
        color: white;
        margin-bottom: 1px;
      }
    }

    .content {
      flex: 1;
      min-width: 0;

      .label {
        font-family: 'PingFang SC', sans-serif;
        font-size: 13px;
        font-weight: 400;
        line-height: 22px;
        color: #666666;
        margin-bottom: 8px;
      }

      .value-wrapper {
        display: flex;
        align-items: flex-end;
        gap: 4px;

        .value {
          font-family: 'DIN', sans-serif;
          font-size: 24px;
          font-weight: bold;
          line-height: 26px;
          color: #1f1f1f;
        }

        .unit {
          font-family: 'PingFang SC', sans-serif;
          font-size: 14px;
          font-weight: 500;
          line-height: 22px;
          color: #1f1f1f;
        }

        .trend {
          display: flex;
          align-items: center;
          gap: 2px;
          margin-left: 8px;

          &.positive {
            color: #f53f3f;
          }

          .trend-value {
            font-family: 'PingFang SC', sans-serif;
            font-size: 12px;
            font-weight: 400;
            line-height: 20px;
          }

          :deep(.svg-icon) {
            width: 16px;
            height: 16px;
          }
        }
      }
    }
  }

  .divider {
    width: 1px;
    height: 40px;
    background-color: #ededed;
    flex-shrink: 0;
  }

  // 第一个卡片无左边距
  .statistics-card:first-child .card-content {
    padding-left: 20px;
  }

  // 最后一个卡片无右边距
  .statistics-card:last-child .card-content {
    padding-right: 20px;
  }
</style>
