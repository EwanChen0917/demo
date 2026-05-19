// 审核状态
export const AuditStatusMap = {
  0: '草稿',
  1: '审批中',
  2: '审批未通过',
  3: '执行中',
  4: '内审中',
  5: '内审未通过',
  6: '待查收',
  7: '待反馈',
  8: '已完结',
} as const;
export const AuditStatusColorMap = {
  0: 'primary',
  1: 'warning',
  2: 'danger',
  3: 'success',
  4: 'warning',
  5: 'danger',
  6: 'warning',
  7: 'warning',
  8: 'success',
  101: 'success',
} as const;
export const AuditStatusClassMap = {
  0: 'status-draft',        // 草稿
  1: 'status-approving',    // 审批中
  2: 'status-rejected',     // 审批未通过
  3: 'status-executing',    // 执行中
  4: 'status-inner-check',  // 内审中
  5: 'status-inner-rejected', // 内审未通过
  6: 'status-to-receive',   // 待查收
  7: 'status-to-feedback',  // 待反馈
  8: 'status-complete',     // 已完结
} as const;

export const BigAuditStatusMap = {
  101: '执行端 已完结',
} as const;

export const BigAuditStatusRelation = {
  101: [6, 7, 8],
} as const;

export const OperateTypeMap = {
  approved: '审批通过',
  rejected: '审批拒绝',
  save_and_approved: '同意并且提交',
  add_comment: '添加评论',
  feedback: '提交反馈',
  score: '评分',
  resubmit: '重新提交',
  inner_approved: '内审通过',
  inner_rejected: '内审拒绝',
} as const;

export const DemandTypeMap = {
  1: '调研类（无样品）',
  2: '体验类（有样品）',
  3: '测图测款',
  4: '市场调研类',
  5: '其他'
} as const;

export const DemandPropertyMap = {
  1: '十大重点品类',
  2: '九大新兴品类',
  3: '重点孵化品类',
  4: '其他'
} as const;


