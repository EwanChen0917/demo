<template>
  <el-dialog title="拒绝原因" v-model="visible" @close="visible = false">
    <template #header>
      <div class="title">拒绝原因</div>
    </template>
    <el-input
      v-model="reason"
      type="textarea"
      :rows="4"
      placeholder="请输入拒绝原因"
      maxlength="500"
      show-word-limit
    />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="reject" v-loading="loading">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { ElMessage } from 'element-plus';
  import { platformApi } from '@/api';

  const emit = defineEmits(['reject']);

  const visible = ref(false);
  const reason = ref('');
  const taskCode = ref('');
  const operateType = ref('');

  const loading = ref(false);
  const reject = async () => {
    if (!reason.value) return ElMessage.warning('请输入拒绝原因');
    try {
      loading.value = true;
      await platformApi.platformTaskOperate({
        taskCode: taskCode.value,
        operateType: operateType.value,
        type: 0,
        reason: reason.value,
      });
      ElMessage.success('拒绝成功');
      emit('reject');
      visible.value = false;
    } finally {
      loading.value = false;
    }
  };

  const open = (code, type) => {
    taskCode.value = code;
    operateType.value = type;
    reason.value = '';
    visible.value = true;
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss">
  .title {
    font-family: PingFang SC;
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
    color: #000000d9;
    &:before {
      content: '*';
      color: var(--el-color-danger);
      margin-right: 4px;
    }
  }
</style>
