<template>
  <el-dialog
    v-model="visible"
    width="420px"
    :show-close="false"
    destroy-on-close
    class="submit-progress-dialog"
    align-center
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <div class="dialog-body">
      <template v-if="status === 'confirm'">
        <div class="status-icon confirm">
          <BellFilled class="icon" />
        </div>
        <p class="message">
          {{ checkingText }}
        </p>
        <div v-if="showNotifyPrompt" class="actions checking">
          <el-button type="primary" @click="handleInitialConfirm(true)">
            {{ notifyLabel }}
          </el-button>
          <el-button @click="handleInitialConfirm(false)">{{ dismissLabel }}</el-button>
        </div>
        <div v-else class="actions single">
          <el-button type="primary" @click="handleInitialConfirm(true)">{{ confirmLabel }}</el-button>
        </div>
      </template>
      <template v-else>
        <div class="status-icon" :class="status">
          <component :is="statusIcon" :class="['icon', { spinning: status === 'checking' }]" />
        </div>
        <div class="percent" :class="[status, pendingResultClass]">
          {{ formattedPercent }}
        </div>
        <p v-if="status === 'checking'" class="message">正在推送中...</p>
        <template v-else>
          <p class="message">{{ resultMessage }}</p>
          <p v-if="resultTips" class="sub-message">
            {{ resultTips }}
          </p>
        </template>
        <div v-if="showFailureActions && status === 'failure'" class="actions failure">
          <!-- <el-button @click="handleSaveDraft">存为草稿</el-button> -->
          <el-button type="primary" @click="handleRetry">重新推送</el-button>
          <el-button @click="handleDismiss">取消</el-button>
        </div>
        <div v-else-if="status !== 'checking'" class="actions single">
          <el-button type="primary" @click="handleConfirm">{{ confirmLabel }}</el-button>
        </div>
      </template>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
  import {
    Refresh,
    CircleCheckFilled,
    CircleCloseFilled,
    BellFilled,
  } from '@element-plus/icons-vue';

  type SubmitStatus = 'confirm' | 'checking' | 'success' | 'failure';

  const visible = defineModel<boolean>('visible', { default: false });
  const status = defineModel<SubmitStatus>('status', { default: 'checking' });
  const percent = defineModel<number>('percent', { default: 0 });

  const props = withDefaults(
    defineProps<{
      notifyTarget?: string;
      notifyLabel?: string;
      dismissLabel?: string;
      confirmLabel?: string;
      showNotifyPrompt?: boolean;
      showCheckingMessage?: boolean;
      successText?: string;
      failureText?: string;
      checkingTip?: string;
      successTips?: string;
      failureTips?: string;
      pendingResult?: 'success' | 'failure' | null;
      showFailureActions?: boolean;
    }>(),
    {
      notifyTarget: '采购人',
      notifyLabel: '通知我',
      dismissLabel: '算了',
      confirmLabel: '好的',
      showNotifyPrompt: true,
      showCheckingMessage: true,
      successText: '推送成功',
      failureText: '推送失败',
      pendingResult: null,
      showFailureActions: false,
    }
  );

  const emit = defineEmits<{
    (event: 'notify'): void;
    (event: 'dismiss'): void;
    (event: 'confirm'): void;
    (event: 'confirmChoice', agree: boolean): void;
    (event: 'retry'): void;
    (event: 'saveDraft'): void;
  }>();

  const checkingText = computed(() => {
    if (!props.showNotifyPrompt) {
      return props.checkingTip ?? '正在校验采购系统数据一致性，请稍等…';
    }
    return (
      props.checkingTip ??
      `正在校验采购系统数据一致性，推送失败则会将失败信息推送给【${props.notifyTarget}】；是否同步通知给你？`
    );
  });

  const resultMessage = computed(() =>
    status.value === 'success' ? props.successText : props.failureText
  );

  const resultTips = computed(() =>
    status.value === 'success' ? props.successTips : props.failureTips
  );

  const statusIcon = computed(() => {
    if (status.value === 'confirm') return BellFilled;
    if (status.value === 'success') return CircleCheckFilled;
    if (status.value === 'failure') return CircleCloseFilled;
    return Refresh;
  });

  const formattedPercent = computed(() => `${percent.value ?? 0}%`);
  const pendingResultClass = computed(() => {
    if (status.value !== 'checking') return '';
    if (props.pendingResult === 'success') return 'tendSuccess';
    if (props.pendingResult === 'failure') return 'tendFailure';
    return '';
  });

  function handleInitialConfirm(agree: boolean) {
    emit('confirmChoice', agree);
  }

  function handleNotify() {
    emit('notify');
    visible.value = false;
  }

  function handleDismiss() {
    emit('dismiss');
    visible.value = false;
  }

  function handleConfirm() {
    emit('confirm');
    visible.value = false;
  }

  function handleRetry() {
    emit('retry');
  }

  function handleSaveDraft() {
    emit('saveDraft');
  }
</script>

<style scoped>
  .submit-progress-dialog :deep(.el-dialog__header) {
    display: none;
  }

  .dialog-body {
    padding: 24px 16px 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    color: #303133;
  }

  .status-icon {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 12px;
    background-color: #eef5ff;
  }

  .status-icon.checking {
    background-color: #e8f8ff;
  }

  .status-icon.success {
    background-color: #f0fff4;
  }

  .status-icon.failure {
    background-color: #fff5f5;
  }

  .icon {
    width: 32px;
    height: 32px;
  }

  .icon.spinning {
    animation: submit-rotate 1.2s linear infinite;
  }

  @keyframes submit-rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .percent {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 12px;
    color: #02b96b;
    transition: color 0.6s linear;
  }

  .percent.tendSuccess {
    color: #7bcf96;
  }

  .percent.tendFailure {
    color: #e78484;
  }

  .percent.checking {
    color: #02b96b;
  }

  .percent.success {
    color: #02b96b;
  }

  .percent.failure {
    color: #f53f3f;
  }

  .message {
    font-size: 14px;
    line-height: 22px;
    color: #303133;
    margin-bottom: 16px;
  }

  .sub-message {
    font-size: 13px;
    color: #909399;
    margin-bottom: 16px;
  }

  .actions {
    display: flex;
    justify-content: center;
    gap: 12px;
    width: 100%;
    margin-top: 12px;
    margin-bottom: 8px;
  }

  .actions.single {
    gap: 0;
  }

  .actions.failure {
    justify-content: center;
  }
</style>
