export const POOL_STATUS = {
  ENABLE: 1,
  DISABLE: 0,
};
export const poolStatusMap = [
  {
    label: '有效',
    value: POOL_STATUS.ENABLE,
  },
  {
    label: '无效',
    value: POOL_STATUS.DISABLE,
  },
];
export const poolLevelMap = [
  {
    label: '顶层',
    value: 0,
  },
  {
    label: '基础层',
    value: 1,
  },
  {
    label: '逻辑层',
    value: 2,
  },
];
export const isSharedMap = [
  {
    label: '是',
    value: 1,
  },
  {
    label: '否',
    value: 0,
  },
];
export const statusMap = [
  {
    label: '有效',
    value: 1,
  },
  {
    label: '失效',
    value: 0,
  },
];
export const supportLockMap = [
  {
    label: '是',
    value: 1,
  },
  {
    label: '否',
    value: 0,
  },
];
export const typeMap = [
  {
    label: '在途',
    value: 'IN_TRANSIT',
  },
  {
    label: '在制',
    value: 'IN_PRODUCTION',
  },
  {
    label: '在库',
    value: 'IN_STOCK',
  },
];

export const purchaseOrderTypeMap = [
  {
    label: '采购单创建',
    value: 'PO_CREATE',
  },
  {
    label: '采购单更新',
    value: 'PO_UPDATE',
  },
  {
    label: '采购单关闭',
    value: 'PO_CLOSE',
  },
  {
    label: '采购入库',
    value: 'PO_INBOUND',
  },
];
export const purchaseOrderStatusMap = [
  {
    label: '处理中',
    value: 0,
  },
  {
    label: '成功',
    value: 1,
  },
  {
    label: '失败',
    value: 2,
  },
  {
    label: '异常',
    value: 3,
  },
];
