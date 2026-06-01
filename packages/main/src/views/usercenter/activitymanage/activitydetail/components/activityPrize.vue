<template>
  <div class="card card-flush py-4">
    <div class="card-header">
      <div class="card-title">
        <h2>抽奖商品</h2>
      </div>
    </div>
    <div class="card-body pt-0 px-20">
      <KeenFlex>
        <PrizeItem
          v-for="(_, idx) in form?.activityPrizeList"
          :key="idx"
          :idx="idx"
          :handle-pick-product="handlePickProduct"
        />
      </KeenFlex>
    </div>
  </div>

  <!--  <BizProductPicker
      :picked-key="form?.activityPrizeList[productPickerIdx]?.productSpu"
      :visible="productPickerVisible"
      @close="handleProductPickerClose"
    />-->
  <BindSku
    v-if="productPickerVisible"
    :visible="productPickerVisible"
    @close="handleProductPickerClose"
    confirm-text="确认"
    :select-one="true"
    type="shopify"
  />
</template>

<script lang="ts" setup>
  import { ActivityContracts, ProductContracts } from '@/api/index';

  import BindSku from '@/views/goodscenter/bindGoods/Modal/bindSku.vue';
  import PrizeItem from './activityPrizeItem.vue';

  const form = inject<ActivityContracts.ActivitySaveReq>('form');

  // 选择商品
  const productPickerIdx = ref();
  const productPickerVisible = ref(false);
  const handlePickProduct = (idx: number) => {
    productPickerIdx.value = idx;
    productPickerVisible.value = true;
  };
  const handleProductPickerClose = (reload = false, product) => {
    console.log(product);
    if (reload) {
      const idx = productPickerIdx.value;
      if (product && form?.activityPrizeList[idx]) {
        const { sku, title: productName, productId, variantsId, price, image } = product;
        form.activityPrizeList[idx].skuCode = sku;
        // form.activityPrizeList[idx].productSpu = productSpu;
        form.activityPrizeList[idx].prizeName = productName;
        form.activityPrizeList[idx].productId = productId;
        form.activityPrizeList[idx].variantsId = variantsId;
        form.activityPrizeList[idx].price = price;
        form.activityPrizeList[idx].prizeImg = image;
        // form.activityPrizeList[idx].productImageNew = productImageNew;
      }
      productPickerVisible.value = false;
      productPickerIdx.value = null;
    } else {
      productPickerVisible.value = false;
    }
  };
</script>
