<template>
  <div class="good-info">
    <GoodsInfo
      :src="skuInfo.productImageUrl"
      :title="skuInfo.productTitle"
      :subtitle="skuInfo.skuCode"
      copy-subtitle
      :openNewPage="true"
      :url="`/skulist/detail?code=${skuInfo.skuCode}`"
    />
  </div>
  <SkuPerformance class="sku-performance" />
</template>

<script lang="ts" setup name="skuperformance">
  import { decryptByBase64 } from '@/utils/aesTils';
  import SkuPerformance from './components/performance.vue';

  const route = useRoute();
  const skuInfo = ref({});
  if (route?.query?.row) {
    skuInfo.value = JSON.parse(decryptByBase64(route.query.row as string)) || '';
  }
</script>

<style scoped lang="scss">
  .good-info {
    padding: 30px 0 20px 25px;
    background: #fff;
  }
  .sku-performance {
    margin-top: -10px;
  }
</style>
