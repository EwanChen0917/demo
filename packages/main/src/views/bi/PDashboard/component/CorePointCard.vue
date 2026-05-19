<template>
  <div class="core-point-card">
    <div class="point-content">
      <div class="point-data">
        <div class="title">
          <span>{{ pointData.title }}</span>
          <slot name="action"></slot>
        </div>
        <div class="amount">
          <span class="value">{{ dataObj.value }}</span>
          <span class="unit">{{ dataObj.unit }}</span>
        </div>
      </div>
      <div class="point-thumbnail">
        <TrendEcharts :data="pointData.trendList" :color="pointData.color" />
      </div>
    </div>
    <div class="rate-section">
      <template v-if="searchParams.dateType !== 'year'">
        <div class="mom" :class="pointData.mom > 0 ? 'up' : 'down'">
          <span class="label">环比</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.5221 8.76948C11.9747 9.28675 11.6074 10.0963 10.92 10.0963H4.80156C4.11423 10.0963 3.74689 9.28674 4.1995 8.76948L7.25874 5.2732C7.57747 4.90893 8.14414 4.90894 8.46286 5.2732L11.5221 8.76948Z"
              fill="currentColor"
            />
          </svg>
          <span class="value">
            {{ pointData.mom !== null ? formatRate(Math.abs(pointData.mom)) : '-' }}
          </span>
        </div>
        <div class="gap"></div>
      </template>
      <div class="yoy" :class="pointData.yoy > 0 ? 'up' : 'down'">
        <span class="label">同比</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.5221 8.76948C11.9747 9.28675 11.6074 10.0963 10.92 10.0963H4.80156C4.11423 10.0963 3.74689 9.28674 4.1995 8.76948L7.25874 5.2732C7.57747 4.90893 8.14414 4.90894 8.46286 5.2732L11.5221 8.76948Z"
            fill="currentColor"
          />
        </svg>

        <span class="value">
          {{ pointData.yoy !== null ? formatRate(Math.abs(pointData.yoy)) : '-' }}
        </span>
      </div>
    </div>
    <el-tooltip v-if="pointData.completionRate !== undefined" placement="top">
      <template #content>
        <div>
          销售目标：{{ formatNumberObj(pointData.budget) }}，目标差值：{{
            formatNumberObj(pointData.diff)
          }}
        </div>
        <div>达成率：{{ formatRate(pointData.completionRate) }}</div>
      </template>

      <div class="progress">
        <div class="progress-bar" :style="{ width: formatRate(pointData.completionRate) }"></div>
      </div>
    </el-tooltip>
    <div class="point-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { type BiContracts } from '@/api';
  import TrendEcharts from '../../components/trendEcharts.vue';
  import { formatNumberObj, formatRate } from '../../utils/utils';

  const props = defineProps<{
    pointData: any;
  }>();
  const searchParams = inject<BiContracts.CommonAnalysisReq>('searchParams')!;
  const dataObj = computed(() => {
    return props.pointData.isRate
      ? formatRate(props.pointData.data)
      : formatNumberObj(props.pointData.data);
  });
</script>

<style lang="scss" scoped>
  .core-point-card {
    width: 229px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .point-content {
      display: flex;
      justify-content: space-between;
    }
    .point-data {
      .title {
        display: flex;
        align-items: center;
        column-gap: 6px;
        color: var(---N8, #666);

        /* 常规/Regular 13 */
        font-family: 'PingFang SC';
        font-size: 13px;
        font-style: normal;
        font-weight: 400;
        line-height: 22px; /* 169.231% */
      }
      .amount {
        margin-top: 8px;
        display: flex;
        align-items: baseline;
        column-gap: 4px;
        .value {
          color: var(---N9, #1f1f1f);
          font-family: DIN;
          font-size: 24px;
          font-style: normal;
          font-weight: 600;
          line-height: 28px; /* 116.667% */
        }
        .unit {
          color: var(---N9, #1f1f1f);

          /* 常规/Medium 14 */
          font-family: 'PingFang SC Medium';
          font-size: 14px;
          font-style: normal;
          font-weight: 500;
          line-height: 22px; /* 157.143% */
        }
      }
    }
    .point-thumbnail {
      flex: none;
      width: 74px;
      height: 45px;
    }
    .rate-section {
      margin-top: 18px;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      column-gap: 8px;
      .mom,
      .yoy {
        display: flex;
        align-items: center;
        column-gap: 2px;
        &.up {
          color: var(---C8, #f53f3f);
        }
        &.down {
          color: var(---C4, #02b96b);
          & > svg {
            transform: rotate(180deg);
          }
        }
        .label {
          color: var(---N8, #666);

          /* 较弱/Regular 12 */
          font-family: 'PingFang SC';
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: 20px; /* 166.667% */
        }
      }
    }
    .progress {
      width: 100%;
      height: 6px;
      border-radius: 3px;
      position: relative;
      .progress-bar {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 6px;
        background-color: var(---C4, #02b96b);
        border-radius: 3px;
      }
      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 50%;
        width: 1px;
        height: 6px;
        background-color: var(---N0, #fff);
        border-radius: 3px;
        z-index: 1;
      }
    }
  }
  .gap {
    width: 1px;
    height: 12px;
    background-color: var(---N3, #ededed);
  }
</style>
