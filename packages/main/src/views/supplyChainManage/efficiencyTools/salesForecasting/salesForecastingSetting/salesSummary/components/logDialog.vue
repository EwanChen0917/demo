<template>
  <el-dialog width="850" title="日志" v-model="visible" @close="visible = false" align-center>
    <el-table :data="logData" max-height="60vh">
      <el-table-column label="日志名称" prop="operationTypeDesc" />
      <el-table-column label="操作时间" prop="updateTime" />
      <el-table-column label="操作人" prop="operator" />
      <el-table-column label="备注" prop="itemContent" min-width="200px" />
    </el-table>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">关闭</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  const visible = ref(false);
  const logData = ref([]);

  const open = (operationLogBeanList) => {
    visible.value = true;
    logData.value = operationLogBeanList;
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
