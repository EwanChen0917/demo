import type { DemandWorkbenchBizTab } from './workbench';

export interface DetailContext {
  bizTab: DemandWorkbenchBizTab;
  mode?: string;
  status: number;
  currentStepCode?: string;
  canApproveCurrentStep: boolean;
  auditFlag: number;
  cancelFlag: boolean;
  canWithdrawExecuteByStep?: boolean;
  isFirstApproveNode?: boolean;
  isCreator?: boolean;
  canModifyExecutorByStep?: boolean;
  canOperateExecuteByStep?: boolean;
}

export interface DetailViewState {
  showExecuteTab: boolean;
  executeTabLabel: string;
  executeTabIsEditMode: boolean;
  showEditTab: boolean;
  showResubmitTab: boolean;
  showApproveActions: boolean;
  showEditApproveSubmitAction: boolean;
  showResubmitAction: boolean;
  showExecuteOperateActions: boolean;
  showExecuteWithdrawAction: boolean;
  showExecuteSubmitAuditAction: boolean;
  showInnerAuditActions: boolean;
  showModifyExecutorAction: boolean;
  showLogCommentAction: boolean;
}
