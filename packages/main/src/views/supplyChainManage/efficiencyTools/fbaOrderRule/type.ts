// 订单状态
const statusList = [
  'WORKING',
  'SHIPPED',
  'IN_TRANSIT',
  'DELIVERED',
  'CHECKED_IN',
  'RECEIVING',
  'READY_TO_SHIP',
  'CLOSED',
  'CANCELLED',
  'DELETED',
  'ERROR',
];

// 通知人
const notifyType = {
  SKU_SALES: 'SKU销售负责人',
};

// 订单类型
const orderType = {
  0: 'FBA货件',
};

// 消息推送
const messagePushType = {
  DING_TALK: '钉钉',
};

// 关联订单状态
const relateOrderStatus = [
  { value: '1', label: '待确认' },
  { value: '2', label: '待发货' },
  { value: '3', label: '已发货' },
  { value: '4', label: '已作废' },
];

// 物流方式
const logisticsMethodList = [
  { value: 'SEA_EXPRESS', label: '海运快船' },
  { value: 'SEA_NORMAL', label: '海运普船' },
  { value: 'AIR_FREIGHT', label: '空运' },
  { value: 'EXPRESS', label: '快递' },
  { value: 'CARGO_AIRLINES', label: '卡航' },
  { value: 'RAILWAY', label: '铁路' },
  { value: 'EURO_SEA', label: '欧洲海运' },
  { value: 'UNKNOWN', label: '未知' },
];

// 通知周期
const cycleList = [
  { value: 'MONDAY', label: '星期一' },
  { value: 'TUESDAY', label: '星期二' },
  { value: 'WEDNESDAY', label: '星期三' },
  { value: 'THURSDAY', label: '星期四' },
  { value: 'FRIDAY', label: '星期五' },
  { value: 'SATURDAY', label: '星期六' },
  { value: 'SUNDAY', label: '星期日' },
  { value: 'UNKNOWN', label: '无' },
];

// 通知信息
const notifyInfoList = [
  { value: 'SHIPMENT_CODE', label: '货件号', key: 1 },
  { value: 'FBA_CREATE_TIME', label: '创建日期（FBA货件）', key: 2 },
  { value: 'WAREHOUSE', label: '发货仓', key: 3 },
  { value: 'SKU', label: 'SKU', key: 4 },
  { value: 'MSKU', label: 'MSKU', key: 5 },
  { value: 'PRODUCT_NAME', label: '产品名称', key: 6 },
];

export interface ruleForm {
  ruleName?: string;
  pushType?: string;
  status?: number;
  orderType?: number;
  platformStatus?: string | Array<string>;
  targetWarehouse?: string | Array<string>;
  timeParam?: string;
  timeoutDay?: number;
  notificationDeadline?: number;
  relationOrderType?: number;
  relationOrderStatus?: string | null | Array<string>;
  relationLogisticsMethod?: string | Array<string>;
  notifierType?: string;
  notificationMessageType?: string | Array<string>;
  notificationTime?: string | Array<string>;
  notificationCycle?: string;
  notificationMessage?: string;
  ruleId?: string;
}

export interface targetType {
  desc?: string;
  value?: string;
}

export interface notifyInfoType {
  label?: string;
  value?: string;
  key?: number;
}

export {
  statusList,
  relateOrderStatus,
  cycleList,
  logisticsMethodList,
  notifyInfoList,
  notifyType,
  orderType,
  messagePushType,
};
