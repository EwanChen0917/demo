import type {
  DemandWorkbenchBizTab,
  DemandWorkbenchView,
  DemandWorkbenchWorkTab,
} from '../types/workbench';

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

export const AuditStatusClassMap = {
  0: 'status-draft',
  1: 'status-approving',
  2: 'status-rejected',
  3: 'status-executing',
  4: 'status-inner-check',
  5: 'status-inner-rejected',
  6: 'status-to-receive',
  7: 'status-to-feedback',
  8: 'status-complete',
} as const;

export const DemandTypeMap = {
  1: '调研类（无样品）',
  2: '体验类（有样品）',
  3: '测图测款',
  4: '市场调研类',
  5: '其他',
} as const;

export const DemandPropertyMap = {
  1: '十大重点品类',
  2: '九大新兴品类',
  3: '重点孵化品类',
  4: '其他',
} as const;

export const demandWorkbenchViewOptions: Array<{ key: DemandWorkbenchView; label: string }> = [
  { key: 'list', label: '需求列表' },
  { key: 'personalStats', label: '个人数据' },
  { key: 'deptStats', label: '部门数据' },
];

export const demandWorkbenchWorkTabOptions: Array<{ key: DemandWorkbenchWorkTab; label: string }> = [
  { key: 'list', label: '用研需求列表' },
  { key: 'submit', label: '用研需求提交' },
  { key: 'detail', label: '用研需求详情' },
];

export const demandWorkbenchBizTabOptions: Array<{ key: DemandWorkbenchBizTab; label: string }> = [
  { key: 'all', label: '全部' },
  { key: 'todo', label: '待我处理' },
  { key: 'mine', label: '我发起的' },
  { key: 'processed', label: '我已处理' },
];
