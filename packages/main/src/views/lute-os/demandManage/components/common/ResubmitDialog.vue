<template>
  <el-dialog
    v-model="visible"
    title="重新提交"
    width="400px"
    :close-on-click-modal="false"
    :before-close="handleClose"
    destroy-on-close
    append-to-body
  >
    <div class="text-center">
      <p>是否重新提交需求进行{{ props.isInterAudit ? '内审' : '审批' }}？</p>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="danger" @click="onSubmit" :loading="props.loading">直接提交</el-button>
        <el-button type="primary" @click="onModify">修改一下</el-button>
        <el-button @click="onCancel">取消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">

const visible = ref(false);
const currentRow = ref<any>(null);
const props = defineProps<{
  isInterAudit: boolean;
  loading: boolean;
}>();
// 公开给父组件调用的 open 方法
function open(rowData: any) {
  currentRow.value = rowData;
  visible.value = true;
}

function close() {
  visible.value = false;
}
defineExpose({ open, close });
const emit = defineEmits(['submit', 'modify', 'cancel']);

function onSubmit() {
  emit('submit', currentRow.value);
  close();
}

function onModify() {
  emit('modify', currentRow.value);
  close();
}

function onCancel() {
  emit('cancel');
  close();
}

function handleClose(done: () => void) {
  done();
}
</script>

<style scoped>
.text-center {
  text-align: center;
  margin: 64px 0;
}
.dialog-footer {
  display: flex;
  justify-content: center;
  gap: 10px;
}
</style>
