<template>
  <el-dialog title="日志记录" width="50%" :model-value="visible" @close="visible = false">
    <el-table :data="logList" v-loading="loading">
      <el-table-column prop="itemContent" label="日志名称" />
      <el-table-column prop="createTime" label="操作时间" />
      <el-table-column prop="operatorName" label="操作人" />
      <el-table-column prop="remark" label="备注" />
    </el-table>
  </el-dialog>
</template>

<script setup lang="ts">
  import { erpApi } from '@/api';

  const visible = ref(false);
  const logList = ref<any[]>([]);
  const loading = ref(false);

  const open = async (transferId) => {
    visible.value = true;
    if (!transferId) {
      return;
    }
    loading.value = true;
    const res = await erpApi.luteosErpOrderTransferQueryLogList({ transferId });
    logList.value = res?.recordList || [];
    loading.value = false;
  };

  defineExpose({ open });
</script>
