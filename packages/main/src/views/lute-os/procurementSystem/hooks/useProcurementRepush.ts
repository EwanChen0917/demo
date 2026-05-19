import { ElMessage } from 'element-plus';
import { computed, ref, type ComputedRef } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { platformApi } from '@/api';
import type { DemandPurchaseSyncReq } from '@/api/platform/data-contracts';
import { PURCHASE_STATUS, PROCUREMENT_DEMAND_MODULE, type PurchaseStatus } from '../constant';
import {
  PURCHASE_PROGRESS_MAX,
  usePurchaseProgress,
} from './usePurchaseProgress';

export type SubmitDialogStatus = 'checking' | 'success' | 'failure';

type RepushResult = {
  status: SubmitDialogStatus;
  tips?: string;
};

interface UseProcurementRepushOptions {
  pushFailReason: ComputedRef<string>;
  updateStatus: (status: PurchaseStatus) => void;
  buildRepushPayload: () => DemandPurchaseSyncReq | null;
  formatSuccessTips?: (value?: string | null) => string;
  onSuccess?: () => Promise<void> | void;
}

const PROGRESS_SEQUENCE = [18, 36, 57, 78, 92, 100];

export const useProcurementRepush = ({
  pushFailReason,
  updateStatus,
  buildRepushPayload,
  formatSuccessTips,
  onSuccess,
}: UseProcurementRepushOptions) => {
  const route = useRoute();
  const router = useRouter();

  const repushDialogVisible = ref(false);
  const repushDialogStatus = ref<SubmitDialogStatus>('checking');
  const repushSuccessTips = ref('');
  const repushFailureTips = ref('');
  const repushProcessing = ref(false);

  const {
    progressPercent: repushDialogPercent,
    startSequenceProgress,
    setProgress,
    resetProgress,
  } = usePurchaseProgress();

  const repushCheckingTip = computed(
    () => '正在重新推送采购申请至SRM...'
  );

  const formatApproverTips = (value?: string | null) => {
    if (!value) return '';
    const names = value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
    if (!names.length) return '';
    return `需求审批人：${names.join('、')}`;
  };

  let repushTaskId = 0;

  const handleRepush = () => {
    if (repushProcessing.value) return;

    repushProcessing.value = true;
    const currentTask = ++repushTaskId;
    repushDialogStatus.value = 'checking';
    repushSuccessTips.value = '';
    repushFailureTips.value = '';
    repushDialogVisible.value = true;

    resetProgress();

    simulateRepushProcess(currentTask)
      .then(async (result) => {
        if (currentTask !== repushTaskId) return;

        repushDialogStatus.value = result.status;
        if (result.status === 'success') {
          repushSuccessTips.value =
            formatSuccessTips?.(result.tips) ||
            result.tips ||
            '推送完成，请稍后刷新列表确认最新状态';
          updateStatus(PURCHASE_STATUS.PURCHASE_EXECUTION_ING);
          await onSuccess?.();
        } else {
          repushFailureTips.value =
            result.tips ?? '推送失败，请检查SRM返回的异常信息后重试';
          setProgress(PURCHASE_PROGRESS_MAX - 1);
        }
      })
      .catch(() => {
        if (currentTask !== repushTaskId) return;

        repushDialogStatus.value = 'failure';
        setProgress(PURCHASE_PROGRESS_MAX - 1);
        repushFailureTips.value = '重新推送异常，请检查网络后重试';
      })
      .finally(() => {
        if (currentTask === repushTaskId) {
          repushProcessing.value = false;
        }
      });
  };

  const handleRepushNotify = async () => {
    const payload = buildRepushPayload();
    const demandCode = payload?.demandCode;
    if (!demandCode) {
      router.back();
      return;
    }
    try {
      await platformApi.request({
        path: '/api/platform/demand/purchaseNotice',
        method: 'POST',
        body: {
          demandCode,
          demandModule: PROCUREMENT_DEMAND_MODULE,
        },
      });
      ElMessage.success('已记录，将在推送完成后通过钉钉同步结果');
    } catch (error: any) {
      ElMessage.error(error?.message || '推送通知发送失败，请稍后重试');
    } finally {
      router.back();
    }
  };

  const handleRepushDismiss = () => {
    // ElMessage.info('已取消本次推送结果通知');
    router.back();
  };

  const simulateRepushProcess = (taskKey: number): Promise<RepushResult> => {
    const payload = buildRepushPayload();
    if (!payload) {
      return Promise.resolve({
        status: 'failure',
        tips: '未获取到采购需求信息，无法重新推送',
      });
    }

    const apiPromise = platformApi
      .platformDemandPurchaseSync(payload)
      .then((response) => {
        const success = response?.syncResult === true;
        const approverStr = (response as Record<string, any>)?.approverStr;
        const tips = success
          ? formatSuccessTips?.(approverStr) ||
            formatApproverTips(approverStr) ||
            '推送成功'
          : '推送失败，请核对采购行信息后重新尝试';
        return {
          success,
          tips,
        };
      })
      .catch((error) => {
        console.error('Failed to repush procurement demand', error);
        return {
          success: false,
          tips: '重新推送失败，请稍后重试',
        };
      });

    return startSequenceProgress({
      sequence: PROGRESS_SEQUENCE,
      interval: 600,
      shouldContinue: () => taskKey === repushTaskId,
    }).then((progressResult) => {
      if (progressResult === 'cancelled') {
        return { status: 'failure', tips: '任务已取消' };
      }
      return apiPromise.then((apiResult) => ({
        status: apiResult.success ? 'success' : 'failure',
        tips: apiResult.tips,
      }));
    });
  };

  const handleRepushConfirm = () => {
    router.back();
  };

  return {
    repushDialogVisible,
    repushDialogStatus,
    repushDialogPercent,
    repushSuccessTips,
    repushFailureTips,
    repushProcessing,
    repushCheckingTip,
    handleRepush,
    handleRepushNotify,
    handleRepushDismiss,
    handleRepushConfirm,
  };
};

export type UseProcurementRepushReturn = ReturnType<typeof useProcurementRepush>;
