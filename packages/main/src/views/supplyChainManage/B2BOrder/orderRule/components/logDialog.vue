<template>
  <el-dialog title="日志" v-model="visibility" @close="visibility = false" width="60%">
    <el-table :data="logList" height="500px">
      <el-table-column prop="name" label="日志名称" />
      <el-table-column prop="updateTime" label="更新时间" />
      <el-table-column prop="operatorName" label="操作人" />
      <el-table-column prop="remark" label="备注" min-width="200" />
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
