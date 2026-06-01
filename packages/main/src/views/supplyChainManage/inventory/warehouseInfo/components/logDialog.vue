<template>
    <el-dialog title="日志" v-model="visible" @close="visible = false">
      <el-table :data="listData" v-loading="loading">
        <el-table-column label="时间" prop="createTime" />
        <el-table-column label="操作内容" prop="content" />
        <el-table-column label="操作员" prop="handlerName" />
      </el-table>
    </el-dialog>
  </template>
  
  <script setup lang="ts">
    import { erpApi } from '@/api';
  
    const visible = ref(false);
    const listData = ref();

  
    const loading = ref(false);
  
    const open = async(id) => {
      visible.value = true;
      loading.value = true;
      try {
        const res = await erpApi.luteosErpWarehouseQueryLogs({warehouseId: id});
        listData.value = res?.logsList;
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
  