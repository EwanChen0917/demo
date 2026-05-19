<template>
  <el-drawer :model-value="visible" title="操作日志" @close="visible = false">
    <div class="mb-5 log-item" v-for="(item, index) in logList" :key="index">
      <div class="d-flex justify-content-between text-primary">
        <div>{{ item?.updateTime }}</div>
        <div>{{ item?.operator }}</div>
      </div>

      <div>{{ JSON.parse(item?.itemContent) }}</div>
    </div>
  </el-drawer>
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

<style scoped lang="scss">
  .log-item {
    padding: 10px;
  }
</style>
