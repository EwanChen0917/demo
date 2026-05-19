export enum fileType {
  结算数据 = '1',
  信息数据一 = '2',
  信息数据二 = '3',
  业务字典 = '4',
  取文件位數截取 = '11',
  取文件字符截取 = '12',
  取占比额 = '13',
}

export const fileTypeMap = {
  [fileType.结算数据]: '结算数据',
  [fileType.信息数据一]: '信息数据一',
  [fileType.信息数据二]: '信息数据二',
};

export enum dataSourceType {
  共享盘 = '0',
  库表 = '1', // 数据库
}
export const dataTypeMap = {
  [dataSourceType.共享盘]: '共享盘',
  [dataSourceType.库表]: '库表',
};

export enum logicType {
  或者 = 'OR',
  并且 = 'AND',
}

export const logicTypeMap = {
  [logicType.并且]: '并且',
  [logicType.或者]: '或者',
};

export enum dictValueType {
  编码 = '1',
  名称 = '2',
  描述 = '3',
}

export const dictValueTypeMap = {
  [dictValueType.编码]: '编码',
  [dictValueType.名称]: '名称',
  [dictValueType.描述]: '描述',
};

export enum setValueType {
  未知 = -1,
  取文件 = 1, // 取数据
  取业务字典 = 2,
  固定值 = 3,
  计算 = 4,
  币别 = 5,
  取文件_字段名 = 10,
  取文件_字段名位数截取 = 11,
  文件字段名字符截断 = 12,
  取占比额 = 13,
  文本 = 6,
}
export enum ruleType {
  结算单规则 = 'income_rule',
  收款单规则 = 'payment_confirm_rule',
  平台入库明细 = 'instock-detail',
  平台出库明细 = 'outstock-detail',
  平台期末库存 = 'ending-inventory',
  平台库存差异 = 'diff-inventory',
  海外AMOS出库 = 'overseas_amos_outbound',
  海外谷仓出库 = 'overseas_gc_outbound',
  海外元仓出库 = 'overseas_yc_outbound',
  FBA多渠道发货 = 'fba_multi_channel_deliver',
  移除订单退货 = 'fba_remove_order_sales_return',
}
// 获取规则字典参数
export const dictRuleMap = {
  [ruleType.结算单规则]: ['income_rule_result_mapping', 'shop_income_rule_result_mapping'],
  [ruleType.收款单规则]: ['income_rule_payment_confirmation_result_mapping'],
  [ruleType.平台入库明细]: ['instock-detail_result_mapping'],
  [ruleType.平台出库明细]: ['outstock-detail_result_mapping'],
  [ruleType.平台期末库存]: ['ending-inventory_result_mapping'],
  [ruleType.平台库存差异]: ['diff-inventory_result_mapping'],
  [ruleType.海外AMOS出库]: ['overseas_amos_outbound_result_mapping'],
  [ruleType.海外谷仓出库]: ['overseas_gc_outbound_result_mapping'],
  [ruleType.海外元仓出库]: ['overseas_yc_outbound_result_mapping'],
  [ruleType.FBA多渠道发货]: ['fba_multi_channel_deliver_result_mapping'],
  [ruleType.移除订单退货]: ['fba_remove_order_sales_return_result_mapping'],
};

export const financeBillsRuleTypeMap = [
  { name: '平台入库明细', value: ruleType.平台入库明细 },
  { name: '平台出库明细', value: ruleType.平台出库明细 },
  { name: '平台期末库存', value: ruleType.平台期末库存 },
  { name: '平台库存差异', value: ruleType.平台库存差异 },
  { name: '海外AMOS出库', value: ruleType.海外AMOS出库 },
  { name: '海外谷仓出库', value: ruleType.海外谷仓出库 },
  { name: '海外元仓出库', value: ruleType.海外元仓出库 },
  { name: 'FBA多渠道发货', value: ruleType.FBA多渠道发货 },
  { name: '移除订单退货', value: ruleType.移除订单退货 },
];
export const billTypeMap = [
  { name: '收款单', value: ruleType.收款单规则 },
  { name: '收入结算单', value: ruleType.结算单规则 },
];
export const billTypeMapAll = financeBillsRuleTypeMap.concat(billTypeMap);
