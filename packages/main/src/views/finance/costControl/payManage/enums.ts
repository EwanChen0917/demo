export enum payOrderPushBillType {
  付款单 = 401,
}

export const dateTypes = [
  { value: 1, label: '单据更新日期' },
  { value: 2, label: '完成审批日期' },
  { value: 3, label: '完成付款日期' },
];

export enum IsCbspaymentEnum {
  是 = 0,
  否 = 1,
}

export const CBSPayments = [
  { value: IsCbspaymentEnum.是, label: '是' },
  { value: IsCbspaymentEnum.否, label: '否' },
];

export enum pushKingdeeStatuseEnum {
  未推送 = 0,
  推送成功 = 1,
  推送失败 = 2,
}

export const pushKingdeeStatuses = [
  { value: pushKingdeeStatuseEnum.未推送, label: '未推送' },
  { value: pushKingdeeStatuseEnum.推送成功, label: '推送成功' },
  { value: pushKingdeeStatuseEnum.推送失败, label: '推送失败' },
];

export const searchTypes = [
  { value: 1, label: '申请人' },
  { value: 2, label: '收款账户名称' },
];

export enum payOrderStatusEnum {
  付款中 = 0,
  已付款 = 1,
  已作废 = 2,
}

export const payOrderStatuses = [
  { value: 0, label: '付款中' },
  { value: 1, label: '已付款' },
  { value: 2, label: '已作废' },
];
