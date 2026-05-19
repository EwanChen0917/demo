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
    <div class="platform-country-container">
      <div class="platform-country__title">平台和国家维度分析</div>
      <div class="platform-country">
        <PlatformAnalysis />
        <CountryAnalysis />
      </div>
    </div>
  </el-scrollbar>
</template>

<script lang="ts" setup>
  import CountryAnalysis from '../components/CountryAnalysis.vue';
  import PlatformAnalysis from '../components/PlatformAnalysis.vue';
</script>

<style lang="scss" scoped>
  .platform-country-container {
    background-color: #fff;
    padding: 24px;
    border-radius: 10px;
  }
  .platform-country {
    display: flex;
    gap: 60px;
  }
  .platform-country__title {
    font-family: 'PingFang SC Medium', sans-serif;
    font-size: 16px;
    font-weight: 500;
    color: #1f1f1f;
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    &::before {
      content: '';
      display: inline-block;
      width: 3px;
      height: 14px;
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
</style>
