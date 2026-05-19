export interface NodeOption {
  code: string;
  name: string;
  order: number;
}

export interface SubStatusOption {
  code: string;
  name: string;
}

export const LEAD_NODE_OPTIONS: NodeOption[] = [
  { code: 'submit', name: '用户需求提案', order: 0 },
  { code: 'review', name: '价值评估', order: 1 },
  { code: 'bp_review', name: '数字化BP承接', order: 2 },
  { code: 'pm_solution', name: '需求方案', order: 3 },
  { code: 'dev', name: '开发中', order: 4 },
  { code: 'biz_accept', name: '业务验收', order: 5 },
  { code: 'delivered', name: '已交付', order: 6 },
  { code: 'value_review', name: '价值复盘', order: 7 },
];

export const LEAD_NODE_FILTER_OPTIONS: NodeOption[] = LEAD_NODE_OPTIONS.filter((n) => n.code !== 'submit');

export const LEAD_NODE_NAME: Record<string, string> = Object.fromEntries(
  LEAD_NODE_OPTIONS.map((n) => [n.code, n.name])
);

export const LEAD_SUB_STATUS_OPTIONS: SubStatusOption[] = [
  { code: 'in_progress', name: '进行中' },
  { code: 'rejected', name: '驳回' },
  { code: 'cancelled', name: '取消' },
];

export const LEAD_SUB_STATUS_NAME: Record<string, string> = Object.fromEntries(
  LEAD_SUB_STATUS_OPTIONS.map((s) => [s.code, s.name])
);

export function nodeTagType(node?: string): '' | 'success' | 'warning' | 'danger' | 'info' | 'primary' {
  if (!node) return 'info';
  if (node === 'review') return 'info';
  if (node === 'bp_review') return 'warning';
  if (node === 'pm_solution' || node === 'dev' || node === 'biz_accept') return 'primary';
  if (node === 'delivered' || node === 'value_review') return 'success';
  return 'info';
}

export function subStatusTagType(sub?: string): '' | 'success' | 'warning' | 'danger' | 'info' | 'primary' {
  if (sub === 'rejected') return 'danger';
  if (sub === 'cancelled') return 'warning';
  if (sub === 'in_progress') return 'primary';
  return 'info';
}

export const DEMAND_TYPE_OPTIONS = [
  { label: '系统建设', value: 'new_system' },
  { label: '功能增强', value: 'feature_enhance' },
  { label: '数据建设', value: 'data_build' },
  { label: '流程改善', value: 'flow_optimize' },
  { label: '问题修复', value: 'bug_fix' },
  { label: 'AI建设', value: 'ai_build' },
];

export const DEMAND_TYPE_MAP: Record<string, string> = Object.fromEntries(
  DEMAND_TYPE_OPTIONS.map((o) => [o.value, o.label])
);

export const URGENCY_OPTIONS = [
  { label: '高', value: 'high' },
  { label: '中', value: 'medium' },
  { label: '低', value: 'low' },
];

export const URGENCY_MAP: Record<string, string> = Object.fromEntries(
  URGENCY_OPTIONS.map((o) => [o.value, o.label])
);

export const IMPACT_OPTIONS = [
  { label: '1-5 人', value: '1_5' },
  { label: '5-50 人', value: '5_50' },
  { label: '50-500 人', value: '50_500' },
  { label: '500 人以上', value: '500_plus' },
];

export const IMPACT_MAP: Record<string, string> = Object.fromEntries(
  IMPACT_OPTIONS.map((o) => [o.value, o.label])
);

export const REVIEW_CONCLUSION_MAP: Record<string, string> = {
  approve: '通过',
  reject: '驳回',
  cancel: '取消',
};

export function ratingTagType(rating?: string): '' | 'success' | 'warning' | 'danger' | 'info' | 'primary' {
  if (rating === 'S') return 'danger';
  if (rating === 'A') return 'warning';
  if (rating === 'B') return 'primary';
  return 'info';
}
