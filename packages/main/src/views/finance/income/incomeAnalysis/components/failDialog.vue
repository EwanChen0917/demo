<template>
  <el-dialog width="900px" title="执行结果" v-model="visible" @close="visible = false">
    <el-table :data="failList" max-height="60vh">
      <el-table-column prop="code" label="店铺" width="220" />
      <el-table-column prop="message" label="失败原因" />
    </el-table>
  </el-dialog>
</template>

<script setup lang="ts">
  const visible = ref(false);

  const failList = ref([]);
  const open = (list) => {
    failList.value = list;
    visible.value = true;
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
