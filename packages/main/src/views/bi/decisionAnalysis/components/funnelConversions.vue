<template>
  <div class="sales-data" v-loading="loading">
    <div class="sales-data__title">转化漏斗分析</div>
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
              <div class="funnel-label">访问人数</div>
              <div class="funnel-value">{{ formatNumber(data.visitSession) }}</div>
            </div>
            <!-- <div class="funnel-item">
            <div class="funnel-label">浏览商品</div>
            <div class="funnel-value">{{ data.visitSession }}</div>
          </div> -->
            <div class="funnel-item">
              <div class="funnel-label">添加购物车</div>
              <div class="funnel-value">{{ formatNumber(data.addToCartSession) }}</div>
            </div>
            <!-- <div class="funnel-item">
            <div class="funnel-label">开始结账</div>
            <div class="funnel-value">{{ data.visitSession }}</div>
          </div> -->
            <div class="funnel-item">
              <div class="funnel-label">完成支付</div>
              <div class="funnel-value">{{ formatNumber(data.completedPaymentSession) }}</div>
            </div>
          </div>
          <div class="funnel-analysis">
            <div class="analysis-item">
              <div class="analysis-label">访问-加购</div>
              <div class="analysis-value">{{ formatPercent(data.visitToAddToCartRate) }}%</div>
            </div>
            <div class="analysis-item">
              <div class="analysis-label">加购-支付</div>
              <div class="analysis-value">
                {{ formatPercent(data.addToCartToCompletedPaymentRate) }}%
              </div>
            </div>
            <div class="analysis-item analysis-total">
              <div class="analysis-label">总体转化率</div>
              <div class="analysis-value">{{ formatPercent(data.conversionRate) }}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { formatPercent } from '../../utils/utils';

  const loading = inject('loading', ref(false));
  const detailData = inject('detailData', ref<any>({}));
  const data = computed(() => {
    return detailData.value.trafficAnalysis?.conversionFunnel || [];
  });
  const formatNumber = (value: number | string) => {
    if (typeof value === 'string') {
      value = Number(value);
    }
    return value != null ? value.toLocaleString('zh-CN') : 0;
  };
</script>

<style scoped lang="scss">
  .sales-data {
    background: #fff;
    border-radius: 10px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    .sales-data__title {
      font-family: 'PingFang SC Medium', sans-serif;
      font-size: 16px;
      font-weight: 500;
      color: #1f1f1f;
      margin-bottom: 24px;
      padding-left: 8px;
      display: flex;
      align-items: center;
      &::before {
        content: '';
        display: inline-block;
        width: 4px;
        height: 16px;
        background-color: #02b96b;
        margin-right: 8px;
        border-radius: 15px;
      }
      .operation {
        margin-left: auto;
        display: flex;
        align-items: center;
        font-size: 14px;
        color: #1f1f1f;
      }
    }
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
            background: url('../image/funnel1.svg') no-repeat left center;
            background-size: contain;
            background-color: #fff;
            width: 103px;
            box-sizing: content-box;
          }
          &:nth-child(2) {
            background: url('../image/funnel2.svg') no-repeat left center;
            background-size: contain;
            background-color: #fff;
            width: 90px;
            box-sizing: content-box;
          }
          &:nth-child(3) {
            background: url('../image/funnel3.svg') no-repeat left center;
            background-size: contain;
            background-color: #fff;
            width: 80px;
            box-sizing: content-box;
          }
          &:nth-child(4) {
            background: url('../image/funnel4.svg') no-repeat left center;
            background-size: contain;
            background-color: #fff;
          }
          &:nth-child(5) {
            background: url('../image/funnel5.svg') no-repeat left center;
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
          background: url('../image/funnel-arrow.svg') no-repeat right top;
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
            background: url('../image/funnel-arrow.svg') no-repeat right top;
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
  }
</style>
