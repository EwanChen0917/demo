<template>
  <el-dialog
    v-model="visible"
    :show-close="false"
    width="480px"
    class="create-ticket-dialog"
    :close-on-click-modal="false"
  >
    <template #header>
      <div class="dialog-header">
        <div class="title">创建工单</div>
        <el-icon class="close-icon" @click="handleCancelClick"><Close /></el-icon>
      </div>
    </template>
    <el-form ref="formRef" :model="form" label-width="96px" label-position="left">
      <el-form-item label="执行人：" required>
        <DeptMember
          v-model="form.executorCode"
          placeholder="请选择"
          style="width: 224px"
          teleported
        />
      </el-form-item>
      <el-form-item label="处理方案：" required>
        <el-select
          v-model="form.solutions"
          filterable
          clearable
          multiple
          collapse-tags
          collapse-tags-tooltip
          :max-collapse-tags="1"
          style="width: 224px"
          placeholder="请选择"
        >
          <el-option
            v-for="item in solutionOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item v-if="showDeadline" label="处理时限：" required>
        <el-radio-group v-model="form.deadlineHours" @change="handleDeadlineChange">
          <el-radio :label="4">4小时</el-radio>
          <el-radio :label="8">8小时</el-radio>
          <el-radio :label="16">16小时</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注：" class="remark-item">
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
    <template #footer>
      <el-popover
        placement="top-end"
        trigger="manual"
        :visible="cancelPopoverVisible"
        width="342"
        popper-class="save-draft-popover"
        teleported
      >
        <div class="popover-content">
          <div class="popover-title">
            <el-icon class="popover-icon" size="18"><WarningFilled /></el-icon>
            是否保存草稿
          </div>
          <div class="popover-desc">退出后之前填写的信息将清空</div>
          <div class="popover-actions">
            <el-button @click="cancelPopoverVisible = false">取消</el-button>
            <el-button @click="handleDiscardDraft">不保存</el-button>
            <el-button type="primary" @click="handleSaveDraft">保存</el-button>
          </div>
        </div>
        <template #reference>
          <el-button class="cancel-btn" @click="handleCancelClick">取消</el-button>
        </template>
      </el-popover>
      <el-button
        class="submit-btn"
        type="success"
        :disabled="!canSubmit || submitLoading"
        :loading="submitLoading"
        @click="handleSubmit"
      >
        提交
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup name="CreateTicketDialog">
  import { cloneDeep, isEmpty, isEqual, isNil, merge, omitBy } from 'lodash-es';
  import { useStorage } from '@vueuse/core';
  import dayjs from 'dayjs';
  import { Close, WarningFilled } from '@element-plus/icons-vue';
  import { ElMessage } from 'element-plus';
  import { SOLUTION_OPTIONS, SOLUTION_LABEL_MAP } from '../../constants';
  import { createTicket } from '../../api';
  import { calculateDeadline } from '../../utils/ticketUtils';

  const visible = defineModel({ type: Boolean, default: false });
  const emit = defineEmits(['success']);

  const props = defineProps({
    sentimentData: {
      type: Object,
      default: () => ({}),
    },
    executorOptions: {
      type: Array,
      default: () => [],
    },
  });

  const draftStorage = useStorage('publicSentiment.createTicketDraft', {});
  const cancelPopoverVisible = ref(false);
  const solutionOptions = computed(() =>
    SOLUTION_OPTIONS.filter((option) => option.label !== '转评赞')
  );
  const submitLoading = ref(false);
  const selectedSolutionLabels = computed(() =>
    (form.value.solutions || []).map((value) => SOLUTION_LABEL_MAP[value] || value)
  );
  const showDeadline = computed(() => !isEmpty(form.value.solutions));

  const defaultForm = {
    executorCode: '',
    solutions: [],
    deadlineHours: '',
    remark: '',
  };

  const form = ref(cloneDeep(defaultForm));
  const lastCalculatedDeadlineHours = ref('');
  const deadlineTouched = ref(false);

  const draftKey = computed(() => props.sentimentData?.uniqueCode || '');

  const interactionData = computed(() => ({
    likeCommentReposts: props.sentimentData?.likeCommentReposts || 0,
  }));

  const canSubmit = computed(() => {
    return (
      !isEmpty(form.value.executorCode) &&
      !isEmpty(form.value.solutions) &&
      !isNil(form.value.deadlineHours) &&
      form.value.deadlineHours !== ''
    );
  });

  const hasContent = computed(() => {
    return !isEqual(form.value, defaultForm);
  });

  const loadDraft = () => {
    const draft = draftStorage.value?.[draftKey.value];
    form.value = merge(cloneDeep(defaultForm), draft || {});
    if (!isNil(form.value.deadlineHours) && form.value.deadlineHours !== '') {
      form.value.deadlineHours = Number(form.value.deadlineHours);
    }
    if (!isEmpty(form.value.solutions)) {
      const calculated = calculateDeadline(selectedSolutionLabels.value, interactionData.value);
      if (isNil(form.value.deadlineHours) || form.value.deadlineHours === '') {
        form.value.deadlineHours = calculated;
      }
      lastCalculatedDeadlineHours.value = calculated;
      deadlineTouched.value = form.value.deadlineHours !== calculated;
      return;
    }
    lastCalculatedDeadlineHours.value = '';
    deadlineTouched.value = !isNil(form.value.deadlineHours) && form.value.deadlineHours !== '';
  };

  const handleCancelClick = () => {
    if (!hasContent.value) {
      visible.value = false;
      return;
    }
    cancelPopoverVisible.value = true;
  };

  const handleDiscardDraft = () => {
    const nextStorage = cloneDeep(draftStorage.value || {});
    if (draftKey.value) {
      delete nextStorage[draftKey.value];
    }
    draftStorage.value = nextStorage;
    cancelPopoverVisible.value = false;
    visible.value = false;
  };

  const handleSaveDraft = () => {
    const cleaned = omitBy(form.value, (value) => {
      if (Array.isArray(value)) {
        return isEmpty(value);
      }
      return isNil(value) || value === '';
    });
    if (draftKey.value) {
      draftStorage.value = merge({}, draftStorage.value || {}, {
        [draftKey.value]: cleaned,
      });
    }
    cancelPopoverVisible.value = false;
    visible.value = false;
    ElMessage.success('已保存');
  };

  const handleSubmit = async () => {
    if (!canSubmit.value) {
      return;
    }
    const executor = Array.isArray(props.executorOptions)
      ? props.executorOptions.find((item) => item.memberCode === form.value.executorCode)
      : null;
    const deadline = dayjs().add(form.value.deadlineHours, 'hour').format('YYYY-MM-DD HH:mm');
    const requestPayload = {
      uniqueCode: props.sentimentData?.uniqueCode,
      executor: form.value.executorCode,
      solutionList: form.value.solutions,
      processDeadline: form.value.deadlineHours,
      remark: form.value.remark,
    };
    submitLoading.value = true;
    try {
      const result = await createTicket(requestPayload);
      if (result) {
        const nextStorage = cloneDeep(draftStorage.value || {});
        if (draftKey.value) {
          delete nextStorage[draftKey.value];
        }
        draftStorage.value = nextStorage;
        ElMessage.success('工单创建成功');
        emit('success', {
          executorName: executor?.name || '',
          executorCode: form.value.executorCode,
          solutions: form.value.solutions,
          deadline,
          remark: form.value.remark,
        });
        visible.value = false;
      }
    } finally {
      submitLoading.value = false;
    }
  };

  const handleDeadlineChange = () => {
    deadlineTouched.value = true;
  };

  watch(selectedSolutionLabels, (solutions) => {
    if (isEmpty(solutions)) {
      form.value.deadlineHours = '';
      lastCalculatedDeadlineHours.value = '';
      deadlineTouched.value = false;
      return;
    }
    const calculated = calculateDeadline(solutions, interactionData.value);
    if (
      isNil(form.value.deadlineHours) ||
      form.value.deadlineHours === '' ||
      form.value.deadlineHours === lastCalculatedDeadlineHours.value ||
      !deadlineTouched.value
    ) {
      form.value.deadlineHours = calculated;
    }
    lastCalculatedDeadlineHours.value = calculated;
  });

  watch(visible, (val) => {
    if (val) {
      loadDraft();
      cancelPopoverVisible.value = false;
    }
  });
</script>

<style scoped lang="scss">
  .dialog-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  :global(.save-draft-popover) {
    width: 342px;
    height: 148px;
  }
  .title {
    color: #262626;
    font-family: 'PingFang SC Medium';
    font-size: 16px;
    font-weight: 500;
    line-height: 26px;
  }

  .close-icon {
    cursor: pointer;
    color: var(--el-text-color-secondary);
  }

  .full-width {
    width: 100%;
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

  .popover-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    gap: 10px;
    padding: 4px 0;
  }

  .popover-title {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;
    font-weight: 500;
    color: #1e2226;
  }

  .popover-icon {
    color: var(--el-color-warning);
  }

  .popover-desc {
    font-size: 14px;
    padding-left: 24px;
    margin-top: -16px;
    color: #585a5a;
  }
  .popover-actions {
    display: flex;
    gap: 12px;
    align-self: flex-end;
  }

  :deep(.el-form-item__label) {
    font-size: 12px;
    font-weight: 500;
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
  .el-button :deep(span) {
    font-size: 12px;
  }
</style>
