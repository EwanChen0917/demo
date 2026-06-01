<template>
  <el-dialog title="预测日志" v-model="visible" @close="visible = false">
    <el-table :data="listData" v-loading="loading" max-height="50vh" row-key="itemCode">
      <el-table-column label="操作类型" prop="operationTypeDesc" />
      <el-table-column label="操作员" prop="operator" />
      <el-table-column label="操作时间" prop="updateTime" />
      <el-table-column label="操作内容" prop="itemContent" min-width="200">
        <template #default="{ row }">
          <OverflowTooltip :content="row.itemContent" :line="3" />
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script setup lang="ts">
  import { erpApi } from '@/api';

  const visible = ref(false);
  const listData = ref();

  const loading = ref(false);

  const open = async (code) => {
    visible.value = true;
    loading.value = true;
    try {
      const res = await erpApi.luteosErpPlanTurnoverGetTurnOverLogList({ code });
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
