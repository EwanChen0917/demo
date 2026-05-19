<template>
  <el-dialog
    title="内审撤回"
    width="30%"
    v-model="visible"
    destroy-on-close
    append-to-body
    :before-close="handleClose"
  >
    <div class="text-content">
      <span class="text-bold">确认撤回吗？</span>
      <span>撤回后此需求的状态将变更为执行中。</span>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="emit('confirm')" :loading="loading">确 认</el-button>
        <el-button @click="handleClose">取 消</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
});
const visible = defineModel('visible');
const emit = defineEmits(['confirm']);
const handleClose = () => {
  visible.value = false;
};
</script>
<style scoped>
.text-content {
  display: flex;
  margin-top: 50px;
  flex-direction: column;
  align-items: center;
}
.text-bold {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 6px;
}
</style>

