<template>
  <el-dialog
    title="日志"
    v-model="visible"
    @close="visible = false"
    width="60%"
    :close-on-click-modal="false"
  >
    <el-table :data="logList" v-loading="listLoading" max-height="500">
      <el-table-column label="操作类型" prop="operationType" />
      <el-table-column label="操作员" prop="operator" />
      <el-table-column label="操作时间" prop="createTime" />
      <el-table-column label="操作内容" prop="content" min-width="200" />
    </el-table>
  </el-dialog>
</template>

<script setup lang="ts">
  import { erpApi } from '@/api';

  const visible = ref(false);
  const logList = ref();
  const listLoading = ref(false);
  const open = async (channelId) => {
    visible.value = true;
    try {
      listLoading.value = true;
      const res = await erpApi.luteosErpLogisticsChannelQueryLog({
        channelId,
      });
      logList.value = res || [];
    } catch (error) {
    } finally {
      listLoading.value = false;
    }
  };

  defineExpose({
    open,
  });
</script>
