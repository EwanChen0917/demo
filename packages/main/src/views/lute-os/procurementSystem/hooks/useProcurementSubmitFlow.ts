import { ElMessage } from 'element-plus';
import { isNil, omitBy } from 'lodash-es';
import { platformApi } from '@/api';
import { PROCUREMENT_DEMAND_MODULE } from '../constant';
import { useProcurementSubmit } from './useProcurementSubmit';
import { PURCHASE_PROGRESS_MAX, usePurchaseProgress } from './usePurchaseProgress';
import type { DemandSaveReq, DemandSaveResp } from '@/api/platform/data-contracts';

type SubmitDialogStatus = 'confirm' | 'checking' | 'success' | 'failure';

interface UseProcurementSubmitFlowOptions {
  buildPayload: () => DemandSaveReq;
  resolveDemandCode: () => string | undefined;
  extractErrorMessage: (error: unknown, fallback: string) => string;
  formatSuccessTips?: (value?: string | null) => string;
  onDemandCodeChange?: (code: string) => void;
  onPushSuccess?: (response: DemandSaveResp | null) => void | Promise<void>;
  onPushFailure?: (message: string) => void | Promise<void>;
  onPendingNavigate?: () => void;
  onFailureNavigate?: () => void;
  onSuccessNavigate?: () => void;
  onAfterSuccessClosed?: () => void;
  onClearDraft?: () => void;
}

const PROGRESS_PENDING_DURATION = 3000;

export const useProcurementSubmitFlow = ({
  buildPayload,
  resolveDemandCode,
  extractErrorMessage,
  formatSuccessTips,
  onDemandCodeChange,
  onPushSuccess,
  onPushFailure,
  onPendingNavigate,
  onFailureNavigate,
  onSuccessNavigate,
  onAfterSuccessClosed,
  onClearDraft,
}: UseProcurementSubmitFlowOptions) => {
  const submitSaver = useProcurementSubmit({
    buildPayload,
  });

  const {
    progressPercent: submitDialogPercent,
    startTimedProgress,
    clearProgress: clearSubmitProgress,
    completeProgress,
    resetProgress,
    setProgress,
  } = usePurchaseProgress();

  const submitDialogVisible = ref(false);
  const submitDialogStatus = ref<SubmitDialogStatus>('checking');
  const submitSuccessTips = ref('');
  const submitFailureTips = ref('');
  const pendingResult = ref<'success' | 'failure' | null>(null);
  const submitProcessRunning = ref(false);
  const shouldResetAfterSuccess = ref(false);

  const formatApproverTips = (value?: string | null) => {
    if (!value) return '';
    const names = value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
    if (!names.length) return '';
    return `需求审批人：${names.join('、')}`;
  };

  const handleSubmitNotify = async (navigateOnPending = true, noticeFlag?: number) => {
    const demandCode = resolveDemandCode()?.trim();
    if (!demandCode) {
      return null;
    }
    const result = await platformApi.request({
      path: '/api/platform/demand/purchaseNotice',
      method: 'POST',
      body: omitBy({
        demandCode,
        demandModule: PROCUREMENT_DEMAND_MODULE,
        noticeFlag,
      }, isNil),
    });
    if (navigateOnPending && submitDialogStatus.value === 'checking') {
      onPendingNavigate?.();
    }
    return result;
  };

  const handleSubmitDismiss = () => {
    if (submitDialogStatus.value === 'checking') {
      onPendingNavigate?.();
    } else if (submitDialogStatus.value === 'failure') {
      onFailureNavigate?.();
    }
    submitDialogVisible.value = false;
  };

  const handleSubmitConfirm = () => {
    if (submitDialogStatus.value !== 'success') return;
    submitDialogVisible.value = false;
    onSuccessNavigate?.();
  };

  const openSubmitConfirm = () => {
    submitDialogStatus.value = 'confirm';
    submitSuccessTips.value = '';
    submitFailureTips.value = '';
    submitDialogVisible.value = true;
    shouldResetAfterSuccess.value = false;
  };

  const resetSubmitState = () => {
    submitDialogVisible.value = false;
    submitDialogStatus.value = 'checking';
    submitSuccessTips.value = '';
    submitFailureTips.value = '';
    pendingResult.value = null;
    submitProcessRunning.value = false;
    shouldResetAfterSuccess.value = false;
    resetProgress();
  };

  const runSubmitFlow = async (notifyAfterSubmit = true) => {
    if (submitProcessRunning.value) return;
    submitProcessRunning.value = true;
    submitDialogStatus.value = 'checking';
    submitSuccessTips.value = '';
    submitFailureTips.value = '';
    resetProgress();
    pendingResult.value = null;
    const progressDone = startTimedProgress({
      duration: PROGRESS_PENDING_DURATION,
      max: PURCHASE_PROGRESS_MAX - 1,
    });

    let response: DemandSaveResp | null = null;
    let submitError: unknown = null;

    try {
      response = await submitSaver.run();
      if (response?.demandCode) {
        onDemandCodeChange?.(response.demandCode);
      }
    } catch (error) {
      submitError = error;
    } finally {
      await progressDone;
    }

    if (!submitError) {
      pendingResult.value = null;
      submitDialogStatus.value = 'checking';
      submitSuccessTips.value = '';
      submitFailureTips.value = '';
      const latestDemandCode = resolveDemandCode()?.trim();
      if (latestDemandCode) {
        try {
          const noticeResponse = await handleSubmitNotify(false, notifyAfterSubmit ? 1 : undefined);
          const resultPayload = (noticeResponse as Record<string, any>)?.result ?? noticeResponse;
          const successFlag = (resultPayload as Record<string, any>)?.successFlag;
          const approverStr =
            (resultPayload as Record<string, any>)?.approverStr ??
            (noticeResponse as Record<string, any>)?.approverStr;
          if (successFlag === true) {
            submitDialogStatus.value = 'success';
            submitSuccessTips.value =
              formatSuccessTips?.(approverStr) || formatApproverTips(approverStr) || '提交成功';
            pendingResult.value = 'success';
            completeProgress();
            shouldResetAfterSuccess.value = true;
            await onPushSuccess?.(response);
            ElMessage.success('提交成功');
          } else {
            pendingResult.value = 'failure';
            submitDialogStatus.value = 'failure';
            const failureMessage =
              ((resultPayload as Record<string, any>)?.errorMsg as string) ||
              ((resultPayload as Record<string, any>)?.message as string) ||
              ((noticeResponse as Record<string, any>)?.message as string) ||
              '推送失败，请稍后重试';
            submitFailureTips.value = failureMessage;
            setProgress(PURCHASE_PROGRESS_MAX - 1);
            await onPushFailure?.(failureMessage);
            ElMessage.error(failureMessage);
          }
        } catch (error) {
          pendingResult.value = 'failure';
          submitDialogStatus.value = 'failure';
          submitFailureTips.value = extractErrorMessage(error, '推送失败，请稍后重试');
          setProgress(PURCHASE_PROGRESS_MAX - 1);
          await onPushFailure?.(submitFailureTips.value);
          ElMessage.error(submitFailureTips.value);
        }
      } else {
        pendingResult.value = 'failure';
        submitDialogStatus.value = 'failure';
        submitFailureTips.value = '未获取到需求编码，推送失败';
        setProgress(PURCHASE_PROGRESS_MAX - 1);
        await onPushFailure?.(submitFailureTips.value);
        ElMessage.error(submitFailureTips.value);
      }
      onClearDraft?.();
    } else {
      pendingResult.value = 'failure';
      submitDialogStatus.value = 'failure';
      setProgress(PURCHASE_PROGRESS_MAX - 1);
      submitFailureTips.value = extractErrorMessage(submitError, '提交失败，请稍后重试');
      await onPushFailure?.(submitFailureTips.value);
      ElMessage.error(submitFailureTips.value);
    }

    submitProcessRunning.value = false;
  };

  const handleSubmitConfirmChoice = async (agree = true) => {
    if (submitDialogStatus.value !== 'confirm' || submitProcessRunning.value) return;
    await runSubmitFlow(agree);
  };

  const handleSubmitRetry = async () => {
    if (submitProcessRunning.value) return;
    const demandCode = resolveDemandCode()?.trim();
    if (!demandCode) {
      submitDialogVisible.value = true;
      submitDialogStatus.value = 'failure';
      submitSuccessTips.value = '';
      submitFailureTips.value = '未获取到需求编码，无法重新推送';
      pendingResult.value = 'failure';
      setProgress(PURCHASE_PROGRESS_MAX - 1);
      await onPushFailure?.(submitFailureTips.value);
      ElMessage.error(submitFailureTips.value);
      return;
    }
    submitDialogVisible.value = true;
    submitProcessRunning.value = true;
    submitDialogStatus.value = 'checking';
    submitSuccessTips.value = '';
    submitFailureTips.value = '';
    pendingResult.value = null;
    resetProgress();
    const progressDone = startTimedProgress({ duration: PROGRESS_PENDING_DURATION });
    try {
      const payload = buildPayload();
      const response = await platformApi.platformDemandPurchaseSync({
        ...payload,
        demandCode,
        demandModule: payload.demandModule || PROCUREMENT_DEMAND_MODULE,
        operateType: 1,
      });
      await progressDone;
      const syncSuccess = response?.syncResult === true;
      pendingResult.value = syncSuccess ? 'success' : 'failure';
      submitDialogStatus.value = syncSuccess ? 'success' : 'failure';
      if (syncSuccess) {
        submitSuccessTips.value = '重新推送成功，可在提交管理中查看审批进度';
        completeProgress();
        shouldResetAfterSuccess.value = true;
        onClearDraft?.();
        await onPushSuccess?.(null);
      } else {
        submitFailureTips.value = '重新推送失败，请稍后重试';
        setProgress(PURCHASE_PROGRESS_MAX - 1);
        shouldResetAfterSuccess.value = false;
        await onPushFailure?.(submitFailureTips.value);
      }
    } catch (error) {
      await progressDone;
      pendingResult.value = 'failure';
      submitDialogStatus.value = 'failure';
      submitFailureTips.value = extractErrorMessage(error, '重新推送失败，请稍后重试');
      setProgress(PURCHASE_PROGRESS_MAX - 1);
      shouldResetAfterSuccess.value = false;
      await onPushFailure?.(submitFailureTips.value);
    } finally {
      submitProcessRunning.value = false;
    }
  };

  watch(
    submitDialogVisible,
    (visible) => {
      if (!visible && shouldResetAfterSuccess.value && submitDialogStatus.value === 'success') {
        shouldResetAfterSuccess.value = false;
        onAfterSuccessClosed?.();
      }
    },
    { flush: 'post' }
  );

  return {
    submitDialogVisible,
    submitDialogStatus,
    submitDialogPercent,
    pendingResult,
    submitSuccessTips,
    submitFailureTips,
    submitProcessRunning,
    shouldResetAfterSuccess,
    openSubmitConfirm,
    resetSubmitState,
    handleSubmitConfirmChoice,
    handleSubmitNotify,
    handleSubmitDismiss,
    handleSubmitConfirm,
    handleSubmitRetry,
    clearSubmitProgress,
  };
};

export type UseProcurementSubmitFlowReturn = ReturnType<typeof useProcurementSubmitFlow>;
