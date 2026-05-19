import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { PROCUREMENT_FLOW_STEPS, type ProcurementFlowStep } from '../constant';
import { platformApi } from '@/api';
import type {
  DemandPurchaseProcessStepBean,
  DemandPurchaseProcessStepResp,
} from '@/api/platform/data-contracts';

export interface UseProcessStepsOptions {
  shouldNotifyError?: boolean | ((code?: string) => boolean);
  resolveErrorMessage?: (error: unknown, code?: string) => string;
}

const DEFAULT_ERROR_MESSAGE = '获取流程步骤失败，请稍后重试';
const resolveDefaultErrorMessage = (error: unknown) => {
  const maybe =
    (error as any)?.response?.data?.message ??
    (error as any)?.message ??
    (error instanceof Error ? error.message : '');
  return maybe || DEFAULT_ERROR_MESSAGE;
};

const shouldNotifyByDefault = (code?: string) => !!code;
const STEP_STATUS_MAP: Record<string, ProcurementFlowStep['status']> = {
  completed: 'success',
  in_progress: 'process',
  pending: 'wait',
  rejected: 'error',
};

const mapStepStatus = (status?: string): ProcurementFlowStep['status'] => {
  if (!status) return undefined;
  return STEP_STATUS_MAP[status] ?? undefined;
};

const deriveCurrentStepKey = (steps: ProcurementFlowStep[]): string => {
  if (!steps.length) return '';
  const inProgress = steps.find((step) => step.status === 'process');
  if (inProgress) return inProgress.key;
  const rejected = steps.find((step) => step.status === 'error');
  if (rejected) return rejected.key;
  const completed = steps.filter((step) => step.status === 'success');
  if (completed.length) return completed[completed.length - 1].key;
  return steps[0].key;
};

export const useProcessSteps = (options: UseProcessStepsOptions = {}) => {
  const flowSteps = ref<ProcurementFlowStep[]>([]);
  const currentStep = ref('');
  const flowRemark = ref('');

  const mapProcessSteps = (list?: DemandPurchaseProcessStepBean[]): ProcurementFlowStep[] => {
    if (!list?.length) return [];
    return [...list]
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      .map((item, index) => ({
        key: item.stepName?.trim() || `step_${item.order ?? index}`,
        title: item.stepName ?? `步骤${index + 1}`,
        description: item.desc ?? item.statusDesc ?? '',
        status: mapStepStatus(item.status),
      }));
  };

  const applyProcessStepResponse = (
    data?: DemandPurchaseProcessStepResp,
    overrides?: { forceFirstStepProcess?: boolean }
  ) => {
    if (!data) return;
    flowRemark.value = data.remark ?? '';
    const hasSteps = Array.isArray(data.processList) && data.processList.length > 0;
    flowSteps.value = hasSteps ? mapProcessSteps(data.processList) : [...PROCUREMENT_FLOW_STEPS];
    if (overrides?.forceFirstStepProcess && flowSteps.value.length) {
      flowSteps.value = [{ ...flowSteps.value[0], status: 'process' }, ...flowSteps.value.slice(1)];
    }
    currentStep.value = deriveCurrentStepKey(flowSteps.value);
  };

  const fetchProcessSteps = async (
    code?: string,
    fetchOptions?: { forceFirstStepProcess?: boolean }
  ) => {
    try {
      const response = await platformApi.platformDemandPurchaseProcessStep({
        demandCode: code || undefined,
      });
      applyProcessStepResponse(response, fetchOptions);
    } catch (error) {
      console.error('Failed to fetch process steps', error);
      const shouldNotify = options.shouldNotifyError ?? shouldNotifyByDefault;
      const notify =
        typeof shouldNotify === 'function' ? shouldNotify(code) : Boolean(shouldNotify);
      if (notify) {
        const resolveMessage = options.resolveErrorMessage ?? resolveDefaultErrorMessage;
        ElMessage.error(resolveMessage(error, code));
      }
    }
  };

  return {
    flowSteps,
    currentStep,
    flowRemark,
    fetchProcessSteps,
    applyProcessStepResponse,
    mapProcessSteps,
  };
};
