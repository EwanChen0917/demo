<template>
  <el-dialog title="日志" v-model="visible" @close="visible = false">
    <el-table :data="listData" v-loading="loading" max-height="500">
      <el-table-column label="操作类型" prop="operationType" />
      <el-table-column label="操作员" prop="operator" />
      <el-table-column label="操作时间" prop="createTime" />
      <el-table-column label="操作内容" prop="content" />
    </el-table>
  </el-dialog>
</template>

<script setup lang="ts">
  import { erpApi } from '@/api';

  const visible = ref(false);
  const listData = ref();

  const loading = ref(false);

  const open = async (supplierCode) => {
    visible.value = true;
    loading.value = true;
    try {
      const res = await erpApi.luteosErpLogisticsSupplierQueryLog({ supplierCode: supplierCode });
      listData.value = res;
      loading.value = false;
    } finally {
      loading.value = false;
    }
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
