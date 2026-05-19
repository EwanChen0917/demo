export const RuleTypes = [
  { label: '收入结算单', value: 'income_rule' },
  { label: '收款单', value: 'payment_confirm_rule' },
  { label: '平台入库明细', value: 'instock-detail' },
  { label: '平台出库明细', value: 'outstock-detail' },
  { label: '平台期末库存', value: 'ending-inventory' },
  { label: '平台库存差异', value: 'diff-inventory' },
  { label: '海外AMOS出库', value: 'overseas_amos_outbound' },
  { label: '海外谷仓出库', value: 'overseas_gc_outbound' },
  { label: '海外元仓出库', value: 'overseas_yc_outbound' },
  { label: 'FBA多渠道发货', value: 'fba_multi_channel_deliver' },
  { label: '移除订单退货', value: 'fba_remove_order_sales_return' },
];

export enum PreRuleStatus {
  Enable = 1,
  Disable = 0,
}

export enum FileType {
  所有文件类型 = 0,
  结算文件 = 1,
  信息数据一 = 2,
  信息数据二 = 3,
}

export const FileTypeList = [
  {
    label: '所有文件类型',
    value: FileType.所有文件类型,
  },
  {
    label: '结算文件',
    value: FileType.结算文件,
  },
  {
    label: '信息数据一',
    value: FileType.信息数据一,
  },
  {
    label: '信息数据二',
    value: FileType.信息数据二,
  },
];

export const fileTypeMap = {
  [FileType.所有文件类型]: '所有文件类型',
  [FileType.结算文件]: '结算文件',
  [FileType.信息数据一]: '信息数据一',
  [FileType.信息数据二]: '信息数据二',
};

export enum DataSourceType {
  共享盘 = '0',
  库表 = '1', // 数据库
}

export enum logicType {
  或者 = 'OR',
  并且 = 'AND',
}

export const logicTypeMap = {
  [logicType.并且]: '并且',
  [logicType.或者]: '或者',
};

export const operators = [
  '包含',
  '不包含',
  '等于',
  '不等于',
  '为空',
  '不为空',
  '大于',
  '小于',
  '大于等于',
  '小于等于',
  'IN',
  'NOT IN',
  '以...开始',
  '以...结束',
  '属于当月',
  '不属于当月',
];

export const cutTypes = {
  位数截取: 11,
  字符截断: 12,
};
