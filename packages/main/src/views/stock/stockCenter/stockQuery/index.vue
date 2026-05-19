<template>
  <!-- <OrderTabs
    v-model="currentTabs"
    :tab-status-list="tabStatusList"
    @tab-change="handleInventoryQueryChange"
  /> -->
  <!-- 仓库库存查询 -->
  <WarehouseStockPage />
  <!-- 逻辑库存查询 -->
  <!-- <AvailableStockPage v-else-if="currentTabs === '1'" /> -->
  <!-- 库存记账表 -->
  <!-- <InventoryBookPage v-else-if="currentTabs === '2'" /> -->
  <!-- SN库存码查询 -->
  <!-- <SNStockPage v-else-if="currentTabs === '3'" /> -->
</template>

<script lang="ts" setup name="stockQuery">
  import { ref } from 'vue';
  import WarehouseStockPage from '../pages/WarehouseStockPage.vue';
  // import AvailableStockPage from '../pages/AvailableStockPage.vue';
  // import InventoryBookPage from '../pages/InventoryBookPage.vue';
  // import SNStockPage from '../pages/SNStockPage.vue';

  // ==================== 响应式状态 ====================
  // const currentTabs = ref('0');

  // ==================== 配置数据 ====================
  // const tabStatusList = [
  //   { stauts: '1', code: '0', statusName: '仓库库存查询' },
  //   { stauts: '2', code: '1', statusName: '逻辑库存查询' },
  //   // { stauts: '3', code: '2', statusName: '库存记账表' },
  //   // { stauts: '4', code: '3', statusName: 'SN库存码查询' },
  // ];

  // // ==================== 事件处理 ====================
  // const handleInventoryQueryChange = () => {
  //   console.log('标签页切换:', currentTabs.value);
  // };
</script>

<style scoped lang="scss"></style>
