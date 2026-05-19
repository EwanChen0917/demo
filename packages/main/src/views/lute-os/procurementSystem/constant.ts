export interface ProcurementFlowStep {
  key: string;
  title: string;
  description: string;
  status?: 'wait' | 'process' | 'success' | 'error';
}

export const PROCUREMENT_FLOW_STEPS: ProcurementFlowStep[] = [
  { key: 'draft', title: '需求提交', description: '创建人' },
  { key: 'budgetReview', title: '预算校验', description: '预算审批人校验预算额度' },
  { key: 'secondApprove', title: '审批人2', description: '第二节点审批人确认需求' },
  { key: 'thirdApprove', title: '审批人3', description: '第三节点审批人确认需求' },
  { key: 'execution', title: '执行采购', description: '采购人执行采购任务' },
  { key: 'receiving', title: '查收', description: '创建人确认收货并反馈结果' },
  { key: 'complete', title: '需求完结', description: '流程结束' },
];

export const PROCUREMENT_DEMAND_MODULE = 'purchase';

export const PURCHASE_STATUS = {
  PURCHASE_DRAFT: 0,
  PURCHASE_APPROVAL_ING: 61,
  PURCHASE_APPROVAL_NOT_PASS: 62,
  PURCHASE_EXECUTION_ING: 63,
  PURCHASE_SRM_CLOSED: 64,
  PURCHASE_WAIT_FOR_RECEIPT: 65,
  PURCHASE_FINISHED: 66,
  PURCHASE_PUSH_FAILED: 100,
} as const;

export type PurchaseStatusKey = keyof typeof PURCHASE_STATUS;
export type PurchaseStatus = (typeof PURCHASE_STATUS)[PurchaseStatusKey];

export interface PurchaseStatusItem {
  key: PurchaseStatusKey;
  value: PurchaseStatus;
  label: string;
}

export const PURCHASE_STATUS_ITEMS: PurchaseStatusItem[] = [
  { key: 'PURCHASE_DRAFT', value: PURCHASE_STATUS.PURCHASE_DRAFT, label: '草稿' },
  { key: 'PURCHASE_APPROVAL_ING', value: PURCHASE_STATUS.PURCHASE_APPROVAL_ING, label: '审批中' },
  {
    key: 'PURCHASE_APPROVAL_NOT_PASS',
    value: PURCHASE_STATUS.PURCHASE_APPROVAL_NOT_PASS,
    label: '审批未通过',
  },
  { key: 'PURCHASE_EXECUTION_ING', value: PURCHASE_STATUS.PURCHASE_EXECUTION_ING, label: '执行中' },
  { key: 'PURCHASE_SRM_CLOSED', value: PURCHASE_STATUS.PURCHASE_SRM_CLOSED, label: 'SRM已关闭' },
  {
    key: 'PURCHASE_WAIT_FOR_RECEIPT',
    value: PURCHASE_STATUS.PURCHASE_WAIT_FOR_RECEIPT,
    label: '待查收',
  },
  { key: 'PURCHASE_FINISHED', value: PURCHASE_STATUS.PURCHASE_FINISHED, label: '已完结' },
  { key: 'PURCHASE_PUSH_FAILED', value: PURCHASE_STATUS.PURCHASE_PUSH_FAILED, label: '推送失败' },
];

export const PURCHASE_STATUS_LABEL_MAP = PURCHASE_STATUS_ITEMS.reduce<
  Record<PurchaseStatus, string>
>((acc, cur) => {
  acc[cur.value] = cur.label;
  return acc;
}, {} as Record<PurchaseStatus, string>);

export interface ProcurementTabItem {
  label: string;
  key: string | number;
}

export const SUBMIT_TABS: ProcurementTabItem[] = [
  { label: '已完结', key: PURCHASE_STATUS.PURCHASE_FINISHED },
  { label: '待查收', key: PURCHASE_STATUS.PURCHASE_WAIT_FOR_RECEIPT },
  { label: '执行中', key: PURCHASE_STATUS.PURCHASE_EXECUTION_ING },
  { label: '审批中', key: PURCHASE_STATUS.PURCHASE_APPROVAL_ING },
  { label: '审批未通过', key: PURCHASE_STATUS.PURCHASE_APPROVAL_NOT_PASS },
  { label: '草稿', key: PURCHASE_STATUS.PURCHASE_DRAFT },
  { label: 'SRM已关闭', key: PURCHASE_STATUS.PURCHASE_SRM_CLOSED },
];

export const EXECUTE_TABS: ProcurementTabItem[] = [
  { label: '已完结', key: PURCHASE_STATUS.PURCHASE_FINISHED },
  { label: '待查收', key: PURCHASE_STATUS.PURCHASE_WAIT_FOR_RECEIPT },
  { label: '执行中', key: PURCHASE_STATUS.PURCHASE_EXECUTION_ING },
  { label: '审批中', key: PURCHASE_STATUS.PURCHASE_APPROVAL_ING },
  { label: '推送失败', key: PURCHASE_STATUS.PURCHASE_PUSH_FAILED },
  { label: 'SRM已关闭', key: PURCHASE_STATUS.PURCHASE_SRM_CLOSED },
];

export const VIEW_MODES = [
  { label: '需求视图', value: 'demand' },
  { label: '产品视图', value: 'product' },
];

export const MAX_PRODUCT_LINES = 10;

export interface ProductLineModel {
  infoSourceType: 'srm' | 'custom';
  productType: string;
  productTypeCode?: string;
  categoryMemberCode?: string;
  purchaseGroup?: string;
  purchaseGroupName?: string;
  productInfo: string;
  productInfoCode?: string;
  unitPrice: number | null;
  currency: string;
  quantity: number | null;
  totalPrice: number | null;
  supplier: string;
  supplierReason: string;
  remark: string;
  purchaseLineStatus?: string | number | null;
  purchaseLineStatusDesc?: string;
}

export const DEFAULT_PRODUCT_LINE: ProductLineModel = {
  infoSourceType: 'srm',
  productType: '',
  productTypeCode: '',
  categoryMemberCode: '',
  purchaseGroup: '',
  purchaseGroupName: '',
  productInfo: '',
  productInfoCode: '',
  unitPrice: null,
  currency: 'CNY',
  quantity: null,
  totalPrice: null,
  supplier: '',
  supplierReason: '',
  remark: '',
  purchaseLineStatus: null,
  purchaseLineStatusDesc: '',
};

export const PURCHASE_LINE_STATUS = {
  UN_CONFIRM: '0',
  CONFIRM: '1',
  REFUSE: '2',
  WAIT_SALE_CONFIRM: '5',
  CLOSED: '99',
} as const;

export type PurchaseLineStatusKey = keyof typeof PURCHASE_LINE_STATUS;
export type PurchaseLineStatus = (typeof PURCHASE_LINE_STATUS)[PurchaseLineStatusKey];

export interface PurchaseLineStatusItem {
  key: PurchaseLineStatusKey;
  value: PurchaseLineStatus;
  label: string;
}

export const PURCHASE_LINE_STATUS_ITEMS: PurchaseLineStatusItem[] = [
  { key: 'UN_CONFIRM', value: PURCHASE_LINE_STATUS.UN_CONFIRM, label: '未确认' },
  { key: 'CONFIRM', value: PURCHASE_LINE_STATUS.CONFIRM, label: '已确认' },
  { key: 'CLOSED', value: PURCHASE_LINE_STATUS.CLOSED, label: '已关闭' },
  { key: 'REFUSE', value: PURCHASE_LINE_STATUS.REFUSE, label: '供应商已拒绝' },
  { key: 'WAIT_SALE_CONFIRM', value: PURCHASE_LINE_STATUS.WAIT_SALE_CONFIRM, label: '待供应商确认' },
];
