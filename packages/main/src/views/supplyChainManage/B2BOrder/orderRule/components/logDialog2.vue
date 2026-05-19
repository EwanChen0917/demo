<template>
  <el-dialog title="日志" v-model="visibility" @close="visibility = false" width="60%">
    <el-table :data="logList" height="500px">
      <el-table-column prop="createTime" label="操作时间" width="180" />
      <el-table-column prop="operationType" label="操作类型" />
      <el-table-column prop="createByName" label="操作人" />
      <el-table-column prop="operationContent" label="操作内容" min-width="240" />
    </el-table>
  </el-dialog>
</template>

<script setup lang="ts">
  const visibility = ref(false);

  const logList = ref([]);
  const open = (data) => {
    logList.value = data;
    visibility.value = true;
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
