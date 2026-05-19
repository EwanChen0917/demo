<template>
  <el-dialog
    v-model="visible"
    :show-close="false"
    width="480px"
    class="handle-ticket-dialog"
    @open="handleOpen"
    append-to-body
    :close-on-click-modal="false"
  >
    <template #header>
      <div class="dialog-header">
        <div class="title">工单处理</div>
        <el-icon class="close-icon" @click="visible = false"><Close /></el-icon>
      </div>
    </template>
    <div class="dialog-body">
      <el-form ref="formRef" :model="form" label-width="76px" label-position="left">
        <el-form-item label="解决状态">
          <div class="status-row">
            <el-select v-model="form.action" placeholder="请选择" style="width: 136px">
              <el-option
                v-for="item in actionOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <DeptMember
              v-if="showExecutor"
              v-model="form.executorCode"
              placeholder="执行人"
              class="status-select-action"
              teleported
            />
          </div>
        </el-form-item>
        <el-form-item label="备注" class="remark-item">
          <el-input
            v-model="form.remark"
            type="textarea"
            :rows="4"
            maxlength="100"
            show-word-limit
            placeholder="请输入"
          />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <el-button class="cancel-btn" @click="visible = false">取消</el-button>
      <el-button
        class="submit-btn"
        type="success"
        :loading="isSubmitting"
        :disabled="isSubmitDisabled || isSubmitting"
        @click="handleSubmit"
      >
        提交
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup name="HandleTicketDialog">
  import { Close } from '@element-plus/icons-vue';

  const visible = defineModel({ type: Boolean, default: false });
  const emit = defineEmits(['submit']);

  const props = defineProps({
    ticketId: {
      type: String,
      default: '',
    },
    executorCode: {
      type: String,
      default: '',
    },
  });

  const formRef = ref();
  const form = ref({
    action: '',
    executorCode: '',
    remark: '',
  });
  const isSubmitting = ref(false);

  const actionOptions = [
    { label: '已解决', value: 'finish' },
    { label: '无需解决', value: 'undo' },
    { label: '转交', value: 'change_executor' },
    { label: '拆单', value: 'split' },
  ];

  const showExecutor = computed(
    () => form.value.action === 'change_executor' || form.value.action === 'split'
  );
  const isSubmitDisabled = computed(() => {
    if (!form.value.action) return true;
    if (form.value.action === 'finish' || form.value.action === 'undo') {
      return !form.value.remark?.trim();
    }
    if (form.value.action === 'change_executor' || form.value.action === 'split') {
      return !form.value.executorCode;
    }
    return false;
  });

  const handleOpen = () => {
    form.value = {
      action: '',
      executorCode: props.executorCode,
      remark: '',
    };
    isSubmitting.value = false;
  };

  const handleSubmit = () => {
    if (isSubmitting.value) return;
    if (isSubmitDisabled.value) return;
    isSubmitting.value = true;
    emit('submit', {
      workOrderCode: props.ticketId,
      operateType: form.value.action,
      executor: form.value.executorCode,
      remark: form.value.remark,
    });
  };

  watch(
    () => visible.value,
    (val) => {
      if (!val) {
        isSubmitting.value = false;
      }
    }
  );
</script>

<style scoped lang="scss">
  .dialog-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .title {
    color: var(--el-text-color-primary);
    font-family: 'PingFang SC Medium';
    font-size: 16px;
    font-weight: 500;
    line-height: 26px;
  }

  .close-icon {
    cursor: pointer;
    color: var(--el-text-color-secondary);
  }

  .status-row {
    display: flex;
    gap: 12px;
    width: 100%;
  }

  .status-select {
    flex: 1;
  }
  .status-select-action {
    flex: 1 1 136px;
  }
  .cancel-btn {
    height: 32px;
    padding: 0 16px;
  }

  .submit-btn {
    height: 32px;
    padding: 0 16px;
    margin-left: 12px;
  }

  :deep(.el-form-item__label) {
    font-size: 12px;
    font-weight: 500;
  }
  .el-button :deep(span) {
    font-size: 12px;
  }
  :deep(.remark-item .el-form-item__label) {
    align-items: flex-start !important;
    padding-top: 4px;
  }
  :deep(.el-input__inner::placeholder),
  :deep(.el-textarea__inner::placeholder),
  :deep(.el-select__placeholder) {
    font-size: 12px !important;
  }
</style>
