// 任务状态对应关系
export const TASK_STATUS = {
  DRAFT: 1,
  APPROVING: 2,
  TO_ASSIGN: 3,
  TO_CLAIM: 4,
  DESIGNING: 5,
  INTERNAL_CHECK: 9,
  FINISHED: 6,
  ACCEPTED: 7,
  RECYCLE_BIN: 8,
} as const;

// 任务状态对应关系
export const taskStatusMap = {
  [TASK_STATUS.DRAFT]: '待提交',
  [TASK_STATUS.APPROVING]: '审批中',
  [TASK_STATUS.TO_ASSIGN]: '待指派',
  [TASK_STATUS.TO_CLAIM]: '待认领',
  [TASK_STATUS.DESIGNING]: '设计中',
  [TASK_STATUS.INTERNAL_CHECK]: '待内部验收',
  [TASK_STATUS.FINISHED]: '待需求方验收', // CREATOR_CHECK 与 FINISHED 都是 6，这里选择“已完成”
  [TASK_STATUS.ACCEPTED]: '已验收',
  [TASK_STATUS.RECYCLE_BIN]: '回收站',
} as const;
