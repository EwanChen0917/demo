import type { DetailContext, DetailViewState } from '../types/detailViewState';
import type { Ref } from 'vue';

/**
 * 5.0 详情页可见性映射（事实字段驱动）
 *
 * 当前后端未提供 auth，采用保守白名单：
 * - 仅用 step/status/flag 判定按钮
 * - 不确定场景不展示动作
 */
const toBoolFlag = (value: number | string | boolean | null | undefined) => {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'number') return value === 1;
  if (typeof value === 'string') return value === '1';
  return false;
};

const normalizeStatus = (status: number | string | null | undefined) => Number(status ?? 0);
const submitStepCodeSet = new Set(['submit', 'approve_1', 'approve_2', 'approve_3']);
const executeStepCodeSet = new Set(['execute', 'internal_audit', 'review', 'feedback', 'complete']);

export const resolveDetailViewState = (context: DetailContext): DetailViewState => {
  const status = normalizeStatus(context.status);
  const currentStepCode = `${context.currentStepCode || ''}`;
  const isSubmitStage = submitStepCodeSet.has(currentStepCode);
  const isExecuteStage = executeStepCodeSet.has(currentStepCode);
  const isApprovingStatus = status === 1;
  const isInternalAuditRejected = currentStepCode === 'internal_audit' && status === 5;
  const isApprover = context.canApproveCurrentStep || toBoolFlag(context.auditFlag);
  const showExecuteTab = isExecuteStage && [3, 4, 5, 6, 7, 8].includes(status);
  const showEditTab = false;
  const showResubmitTab = isSubmitStage && [2, 5].includes(status) && context.isCreator === true;
  const showApproveActions = isSubmitStage && isApprover && isApprovingStatus;
  // 临时关闭“同意并提交”对应编辑态：遗留问题，接口尚未支持
  // const showEditApproveSubmitAction =
  //   showApproveActions && context.isFirstApproveNode === true;
  const showEditApproveSubmitAction = false;
  const showResubmitAction =
    context.mode === 'resubmit' && isSubmitStage && [2, 5].includes(status) && context.isCreator === true;
  const showExecuteOperateActions = context.canOperateExecuteByStep === true;
  const showExecuteWithdrawAction =
    currentStepCode === 'internal_audit' &&
    context.canWithdrawExecuteByStep === true &&
    !isInternalAuditRejected;
  const showExecuteSubmitAuditAction = context.canOperateExecuteByStep === true;
  const showInnerAuditActions =
    [4, 5].includes(status) &&
    isApprover &&
    currentStepCode === 'internal_audit' &&
    !isInternalAuditRejected;
  const showModifyExecutorAction =
    context.canModifyExecutorByStep === true && !isInternalAuditRejected;
  const showLogCommentAction = ![8, 101].includes(status);
  const executeTabIsEditMode =
    (status === 5 && context.canOperateExecuteByStep === true) ||
    (currentStepCode === 'execute' && status === 3 && context.canOperateExecuteByStep === true);

  return {
    showExecuteTab,
    executeTabLabel: executeTabIsEditMode ? '执行编辑' : '执行详情',
    executeTabIsEditMode,
    showEditTab,
    showResubmitTab,
    showApproveActions,
    showEditApproveSubmitAction,
    showResubmitAction,
    showExecuteOperateActions,
    showExecuteWithdrawAction,
    showExecuteSubmitAuditAction,
    showInnerAuditActions,
    showModifyExecutorAction,
    showLogCommentAction,
  };
};

export const useDemandDetailViewState = (context: Ref<DetailContext>) => {
  return computed(() => resolveDetailViewState(context.value));
};
