<template>
  <el-tabs v-model="curTab">
    <el-tab-pane label="店铺映射" name="shopMap">
      <ShopMap />
    </el-tab-pane>
    <el-tab-pane label="仓库映射" name="warehouseMap">
      <WarehouseMap />
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts" name="organizationMap">
import ShopMap from '@/views/finance/organizationMap/shopMap.vue';
  import WarehouseMap from '@/views/finance/organizationMap/warehouseMap.vue';

  const curTab = ref('shopMap');
</script>

<style scoped lang="scss"></style>
