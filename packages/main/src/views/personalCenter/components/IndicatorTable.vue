<template>
  <div class="have-before-split" v-if="isSplit"></div>
  <div class="indicator-table">
    <div class="indicator-table__title">{{ config.title }}</div>
    <div class="indicator-table__data">
      <span class="indicator-table__num">{{ config.data.current ?? '-' }}</span>
      <span class="indicator-table__unit" v-if="config.data.current && config.data.current !== '-'">
        {{ config.unit }}
      </span>
    </div>
    <div class="indicator-table__indicator">
      <span>环比</span>
      <arrow-icon :is-up="config.data.last >= 0" />
      <span class="rate" :class="[config.data.last >= 0 ? 'up' : 'down']">
        {{ formatPercent(Math.abs(config.data.last)) }}%
      </span>
      <span class="divider"></span>
      <span>同比</span>
      <arrow-icon :is-up="config.data.yoy >= 0" />
      <span class="rate" :class="[config.data.yoy >= 0 ? 'up' : 'down']">
        {{ formatPercent(Math.abs(config.data.yoy)) }}%
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import ArrowIcon from '@/views/personalCenter/components/arrowIcon.vue';
  import { formatPercent } from '@/views/bi/utils/utils';
  import { IndicatorType } from '../types';
  import IndicatorValue from './IndicatorValue.vue';

  defineProps<{
    config: IndicatorType;
    isSplit: boolean;
  }>();
</script>

<style lang="scss" scoped>
  .have-before-split {
    position: relative;

    &:before {
      content: '';
      position: absolute;
      top: 33px;
      left: 0;
      width: 1px;
      height: 28px;
      flex-shrink: 0;
      background: var(---N3, #ededed);
    }
  }

  .indicator-table {
    padding-left: 10px;
    margin-left: 10px;
    height: 94px;

    .indicator-table__title {
      margin-bottom: 8px;
      color: var(---N8, #666);
      /* 常规/Regular 13 */
      font-family: 'PingFang SC';
      font-size: 13px;
      font-style: normal;
      font-weight: 400;
      line-height: 22px; /* 169.231% */
    }

    .indicator-table__data {
      margin-bottom: 16px;
    }

    .indicator-table__num {
      color: var(---N9, #1f1f1f);
      font-family: DIN Blod;
      font-size: 24px;
      font-style: normal;
      font-weight: 400;
      line-height: 28px; /* 140% */
    }

    .indicator-table__unit {
      margin-left: 4px;
      color: var(---N9, #1f1f1f);
      /* 常规/Medium 14 */
      font-family: 'PingFang SC Medium';
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 22px; /* 157.143% */
    }

    .indicator-table__indicator {
      display: flex;
      align-items: center;
      font-size: 12px;
      line-height: 20px;
      font-weight: 400;
      color: #666;
      white-space: nowrap;

      .arrow-icon {
        margin: 0 2px;
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
</style>
