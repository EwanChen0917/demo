<template>
  <KeenFlex>
    <div class="good-info">
      <GoodsInfo
        :src="skuInfo.productImageUrl"
        :title="skuInfo.productTitle"
        :subtitle="skuInfo.skuCode"
        copy-subtitle
        :openNewPage="true"
        :url="`/skulist/detail?code=${skuInfo.skuCode}`"
      />
      <div class="other-info">
        <div class="detail">
          <p class="label">渠道</p>
          <p>{{ skuInfo.channel }}</p>
        </div>
        <div class="detail">
          <p class="label">站点</p>
          <p>{{ skuInfo.site }}</p>
        </div>
        <div class="detail detail-sku">
          <p class="label">店铺</p>
          <p>{{ skuInfo.shop }}</p>
        </div>
        <div class="detail detail-sku">
          <p class="label">店铺SKU</p>
          <p>{{ skuInfo.msku }}</p>
        </div>
        <div class="detail">
          <p class="label">链接</p>
          <p class="link" @click="openUrl(skuInfo.productLink)">
            {{ skuInfo.productLink }}
          </p>
        </div>
      </div>
    </div>
  </KeenFlex>
  <MskuPerformance class="sku-performance" :skuInfo="skuInfo" />
</template>

<script lang="ts" setup name="mskuperformance">
import { decryptByBase64 } from '@/utils/aesTils';
  import { openWindow } from '@/utils';
  import MskuPerformance from './components/performance.vue';

  const route = useRoute();
  const skuInfo = ref({});
  if (route?.query?.row) {
    skuInfo.value = JSON.parse(decryptByBase64(route.query.row as string)) || '';
  }

  const openUrl = (url) => {
    if (url) {
      openWindow(url);
    }
  };
</script>

<style scoped lang="scss">
  .good-info {
    display: flex;
    flex-direction: row;
    padding: 30px 0 20px 25px;
    background: #fff;
    overflow-x: scroll;
  }
  .sku-performance {
    margin-top: -10px;
  }
  .other-info {
    display: flex;
    flex-direction: row;
    // justify-content: space-between;
    // align-items: stretch;
    margin-left: 20px;
    .detail {
      min-width: 120px;
    }
    .detail-sku {
      margin-right: 80px;
    }
    .label {
      font-weight: 600;
      margin-bottom: 20px;
    }
    .link {
      width: 200px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #1989fa;
      cursor: pointer;
    }
  }
</style>
