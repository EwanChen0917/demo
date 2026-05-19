<template>
  <el-tabs v-model="curTab">
    <el-tab-pane label="退款" name="refund">
      <Refund />
    </el-tab-pane>
    <el-tab-pane label="补发" name="replacement">
      <Replacement />
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts" name="afterSaleOrder">
  import Refund from '@/views/afterSale/order/refund.vue';
  import Replacement from '@/views/afterSale/order/replacement.vue';

  const curTab = ref('refund');
</script>

<style scoped lang="scss"></style>
