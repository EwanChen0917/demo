<template>
  <div class="w-100 justify-content-between align-items-center">
    <el-tabs v-model="activeName" tab-position="top">
      <el-tab-pane label="Amazon" name="Amazon" />
      <el-tab-pane label="Shopify" name="Shopify" />
      <el-tab-pane label="Walmart" name="Walmart" />
      <el-tab-pane label="TikTok" name="TikTok" />
    </el-tabs>
    <!--    <div class="text-gray-500" v-if="!store.taskMap.B2BOrderSync">
      <span>更新时间：{{ store.taskMap?.lastRefreshTime }}</span>
    </div>-->
  </div>
  <Amazon v-if="activeName === 'Amazon'" />
  <Shopify v-if="activeName === 'Shopify'" />
  <Walmart v-if="activeName === 'Walmart'" />
  <Tiktok v-if="activeName === 'TikTok'" />
</template>

<script setup lang="ts" name="platformInventory">
import Shopify from '@/views/supplyChainManage/inventory/platformInventory/components/shopify.vue';
  import Walmart from '@/views/supplyChainManage/inventory/platformInventory/components/walmart.vue';
  import Tiktok from '@/views/supplyChainManage/inventory/platformInventory/components/tiktok.vue';
  import Amazon from '@/views/supplyChainManage/inventory/platformInventory/components/amazon.vue';

  const activeName = ref('Amazon');
</script>

<style scoped lang="scss"></style>
