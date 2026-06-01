<template>
  <el-dialog title="产品明细" width="75%" :model-value="visible" @close="visible = false">
    <el-table :data="logList">
      <el-table-column prop="skuCode" label="产品SKU" />
      <el-table-column prop="productTitle" label="产品名称" />
      <el-table-column prop="productSku" label="供应链SKU" />
      <el-table-column prop="quantity" label="调拨量" />
      <el-table-column prop="shipmentQuantity" label="已出运" />
      <el-table-column prop="inboundQuantity" label="调入量" />
    </el-table>
  </el-dialog>
</template>

<script setup lang="ts">
  const visible = ref(false);
  const logList = ref([]);

  const open = (operationLogList) => {
    logList.value = operationLogList;
    visible.value = true;
  };

  defineExpose({ open });
</script>

<style scoped lang="scss"></style>
