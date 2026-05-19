export const billTypes = {
  调拨入库单: 40,
  调拨出库单: 41,
};

export const operationTypes = {
  中仓: 'CN_WAREHOUSE',
  工厂直发: 'FACTORY_DIRECT',
  虚仓调拨: 'VIRTUAL_TRANSFER',
};

export const pushStatus = {
  未推送: 0,
  推送失败: 2,
  推送成功: 1,
  推送中: 3,
};

export const markStatus = {
  标记: 1,
  取消标记: 0,
};
