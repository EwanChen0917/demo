<template>
  <el-dialog :title="`转运信息#${info.fbaId}`" :model-value="visible" @close="visible = false">
    <el-form label-width="120" label-position="left">
      <el-form-item label="查验信息">{{ info?.inspectionDelayReason }}</el-form-item>
      <el-form-item label="转运详情">{{ info?.transitDetails }}</el-form-item>
      <el-form-item label="跟踪号">{{ info?.trackingNumber }}</el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
  const visible = ref(false);

  const info = ref({});

  const open = (data) => {
    info.value = data;
    visible.value = true;
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
