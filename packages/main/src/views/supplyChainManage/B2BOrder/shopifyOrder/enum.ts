export enum OrderStatus {
  全部 = '',
  待审核 = 200,
  待系统内审核 = 202,
  待发货 = 300,
  已发货 = 400,
  异常订单 = 500,
  订单标发 = 800,
  废弃 = 600,
}

export enum ErrorStatus {
  禁止处理 = 536,
  MSKU未配对 = 538,
  未匹配仓库物流 = 532,
  缺货 = 506,
  三方仓SKU未配对 = 531,
  转FBA创建失败 = 534,
  转FBA配送异常 = 535,
  物流下单失败 = 537,
  预占失败 = 516,
  提交出库失败 = 517,
  仓库出库失败 = 518,
  取消预占失败 = 530,
}

export enum MarkShipedStatus {
  待标发 = 'WAIT',
  标发成功 = 'SUCCESS',
  标发失败 = 'FAILED',
}
