<template>
  <BiCard title="广告转化漏斗分析">
    <div
      style="
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      "
    >
      <div class="chart-container">
        <div class="funnel-container">
          <div class="funnel-count">
            <div class="funnel-item">
              <div class="funnel-label">曝光量</div>
              <div class="funnel-value">{{ formatNumber(data.impressions) }}</div>
            </div>
            <div class="funnel-item">
              <div class="funnel-label">点击量</div>
              <div class="funnel-value">{{ formatNumber(data.clicks) }}</div>
            </div>
            <div class="funnel-item">
              <div class="funnel-label">订单量</div>
              <div class="funnel-value">{{ formatNumber(data.adOrderQty) }}</div>
            </div>
          </div>
          <div class="funnel-analysis">
            <div class="analysis-item">
              <div class="analysis-label">曝光-点击</div>
              <div class="analysis-value">{{ formatPercent(data.impressionsToClicksRate) }}%</div>
            </div>
            <div class="analysis-item">
              <div class="analysis-label">点击-订单</div>
              <div class="analysis-value">{{ formatPercent(data.clicksToOrdersRate) }}%</div>
            </div>
            <div class="analysis-item analysis-total">
              <div class="analysis-label">总体转化率</div>
              <div class="analysis-value">{{ formatPercent(data.conversionRate) }}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </BiCard>
</template>

<script setup lang="ts">
  import BiCard from '@/views/bi/components/BiCard.vue';
  import { BiContracts } from '@/api';
  import { formatPercent } from '../../utils/utils';

  const props = defineProps<{
    total?: BiContracts.AdBaseMetricDO;
  }>();

  const data = computed(() => {
    const impressionsToClicksRate = props.total?.impressions
      ? props.total.clicks! / props.total.impressions!
      : 0;
    const clicksToOrdersRate = props.total?.clicks
      ? props.total.adOrderQty! / props.total.clicks!
      : 0;
    const conversionRate = props.total?.adOrderQty
      ? props.total.adOrderQty! / props.total.impressions!
      : 0;
    return {
      ...props.total,
      impressionsToClicksRate,
      clicksToOrdersRate,
      conversionRate,
    };
  });
  const formatNumber = (value?: number | string) => {
    if (typeof value === 'string') {
      value = Number(value);
    }
    return value != null ? value.toLocaleString('zh-CN', { maximumFractionDigits: 2 }) : 0;
  };
</script>

<style scoped lang="scss">
  .funnel-container {
    display: flex;
    align-items: center;
    padding-right: 40px;
    .funnel-count {
      display: flex;
      flex-direction: column;
      gap: 8px;
      position: relative;
      z-index: 2;
      .funnel-item {
        padding: 9px 20px;
        line-height: 20px;
        width: 103px;
        &:nth-child(1) {
          background: url('../../decisionAnalysis/image/funnel1.svg') no-repeat left center;
          background-size: contain;
          background-color: #fff;
          width: 103px;
          box-sizing: content-box;
        }
        &:nth-child(2) {
          background: url('../../decisionAnalysis/image/funnel2.svg') no-repeat left center;
          background-size: contain;
          background-color: #fff;
          width: 90px;
          box-sizing: content-box;
        }
        &:nth-child(3) {
          background: url('../../decisionAnalysis/image/funnel3.svg') no-repeat left center;
          background-size: contain;
          background-color: #fff;
          width: 80px;
          box-sizing: content-box;
        }
        &:nth-child(4) {
          background: url('../../decisionAnalysis/image/funnel4.svg') no-repeat left center;
          background-size: contain;
          background-color: #fff;
        }
        &:nth-child(5) {
          background: url('../../decisionAnalysis/image/funnel5.svg') no-repeat left center;
          background-size: contain;
          background-color: #fff;
        }
        .funnel-label {
          font-size: 12px;
          color: #fff;
        }
        .funnel-value {
          font-size: 16px;
          color: #fff;
          font-weight: 700;
          font-family: 'DIN Blod';
        }
      }
    }
    .funnel-analysis {
      border: 1px solid #dedede;
      padding: 19px 71px 19px 50px;
      border-left: none;
      flex: 1;
      position: relative;
      margin-left: -12px;
      &::after {
        content: '';
        position: absolute;
        left: -6px;
        bottom: -10px;
        transform: translateY(-50%) rotate(180deg);
        width: 6px;
        height: 10px;
        background: url('@/views/bi/decisionAnalysis/image/funnel-arrow.svg') no-repeat right top;
        background-size: cover;
      }
      .analysis-item {
        padding: 5px 12px;
        background-color: #f5f5f5;
        margin-bottom: 16px;
        border-radius: 6px;
        width: 56px;
        position: relative;
        box-sizing: content-box;
        &::before {
          content: '';
          position: absolute;
          left: -6px;
          top: 50%;
          transform: translate3d(-100%, -50%, 0);
          background-color: #dedede;
          width: 40px;
          height: 2px;
        }
        &::after {
          content: '';
          position: absolute;
          left: -12px;
          top: 50%;
          transform: translateY(-50%);
          width: 6px;
          height: 10px;
          background: url('@/views/bi/decisionAnalysis/image/funnel-arrow.svg') no-repeat right top;
          background-size: cover;
        }
        &:nth-child(1) {
          &::before {
            width: 34px;
          }
        }
        &:nth-last-child(2) {
          margin-bottom: 0;
        }
        .analysis-label {
          font-size: 12px;
          line-height: 20px;
          font-weight: 400;
          color: #666666;
        }
        .analysis-value {
          font-size: 12px;
          line-height: 20px;
          color: #1f1f1f;
          font-weight: 400;
        }
      }
      .analysis-total {
        position: absolute;
        right: 0;
        top: 50%;
        width: 60px;
        transform: translate3d(50%, -50%, 0);
        &::before,
        &::after {
          display: none;
        }
      }
    }
  }
</style>
