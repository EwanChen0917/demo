<template>
  <el-dialog
    :title="`出库单详情 #${orderCode}`"
    :model-value="visible"
    @close="visible = false"
    width="65%"
  >
    <el-table :data="listData">
      <el-table-column label="供应链SKU" prop="productSku" min-width="140" />
      <el-table-column label="供应链SKU数量" prop="productSkuQty" min-width="140" />
      <el-table-column label="产品SKU" prop="skuCode" min-width="140" />
      <el-table-column label="采购单价" prop="purchasePrice" />
      <el-table-column label="头程单价" prop="firstPrice" />
      <el-table-column label="采购总价" prop="purchaseTotalPrice" />
      <el-table-column label="头程总价" prop="firstTotalPrice" />
    </el-table>
  </el-dialog>
</template>

<script setup lang="ts">
  import { erpApi } from '@/api';

  const visible = ref(false);
  const orderCode = ref({});
  const listData = ref([]);

  const queryInfo = async () => {
    if (!orderCode.value) return;
    const res = await erpApi.luteosErpOutboundQueryDetail({
      orderId: orderCode.value,
    });
    listData.value = res?.detailList || [];
  };

  const open = (data) => {
    orderCode.value = data;
    queryInfo();
    visible.value = true;
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
