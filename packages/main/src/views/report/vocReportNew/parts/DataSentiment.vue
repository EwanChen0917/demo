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
    <div class="data-sentiment-container">
      <div class="data-sentiment__title">数据来源和情感标签</div>
      <div class="data-sentiment">
        <DataSourceAnalysis />
        <SentimentAnalysis />
      </div>
    </div>
  </el-scrollbar>
</template>

<script lang="ts" setup>
  import DataSourceAnalysis from '../components/DataSourceAnalysis.vue';
  import SentimentAnalysis from '../components/SentimentAnalysis.vue';
</script>

<style lang="scss" scoped>
  .data-sentiment-container {
    background-color: #fff;
    padding: 24px;
    border-radius: 10px;
  }
  .data-sentiment__title {
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
  .data-sentiment {
    display: flex;
    gap: 60px;
  }
</style>
