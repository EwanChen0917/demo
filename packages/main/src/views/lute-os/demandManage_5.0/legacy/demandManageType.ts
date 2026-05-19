// 定义审批步骤类型
export interface ApprovalStep {
  stepCode: string;
  stepName: string;
  order: number;
  operator?: string | null;
  operatorDesc?: string | null;
  operatorTime?: string | null;
  status: 'completed' | 'in_progress' | 'pending' | 'rejected';
  statusDesc: string;
}

export interface ApprovalStepObj {
  currentStep: string;
  currentStepDsc: string;
  demandCode: string;
  demandProcessStepList: Array<ApprovalStep>[];
}

export const approvalStepsInitial = [
  {
    stepCode: 'submit',
    stepName: '需求提交',
    order: 1,
    status: 'completed',
    statusDesc: '已完成',
    operatorDesc: '--',
  },
  {
    stepCode: 'approve_1',
    stepName: '需求审批',
    order: 2,
    status: 'completed',
    statusDesc: '已完成',
    operatorDesc: '--',
  },
  {
    stepCode: 'approve_2',
    stepName: '需求审批',
    order: 3,
    status: 'completed',
    statusDesc: '已完成',
    operatorDesc: '--',
  },
  {
    stepCode: 'approve_3',
    stepName: '需求审批',
    order: 4,
    status: 'completed',
    statusDesc: '已完成',
    operatorDesc: '--',
  },
  {
    stepCode: 'execute',
    stepName: '开始执行',
    order: 5,
    status: 'completed',
    statusDesc: '已完成',
    operatorDesc: '--',
  },
  {
    stepCode: 'internal_audit',
    stepName: '用研内审',
    order: 6,
    status: 'completed',
    statusDesc: '已完成',
    operatorDesc: '--',
  },
  {
    stepCode: 'review',
    stepName: '需求查收',
    order: 7,
    status: 'completed',
    statusDesc: '已完成',
    operatorDesc: '--',
  },
  {
    stepCode: 'feedback',
    stepName: '需求反馈',
    order: 8,
    status: 'in_progress',
    statusDesc: '进行中',
    operatorDesc: '--',
  },
  {
    stepCode: 'complete',
    stepName: '需求完结',
    order: 9,
    status: 'pending',
    statusDesc: '未开始',
    operatorDesc: '--',
  },
];
