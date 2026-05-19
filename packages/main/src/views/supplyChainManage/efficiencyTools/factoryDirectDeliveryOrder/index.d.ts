/**
 * 上传调拨单后的返回数据模型
 */
export type DirectFactoryWorkOrderTransfer = {
  id: string; // 调拨单id
  transferOrderCode: string; // 调拨单号
  status: string; // 状态
  warehouseName: string; // 调出仓库
  arrivalWarehouseName: string; // 调入仓库
  transport: string; // 物流方式
  executorDate: string; // 预计出库日期
  expectShipmentDate: string; // 预计出运日期
  createBy: string; // 创建人
  createTime: string; // 创建时间
  skuName: string; // 产品名称
  skuCode: string; // 产品编码
};
export type DirectFactoryWorkOrderDelivery = {
  deliveryBillCode: string; // 送货单号
  supplierName: string; // 供应商名称
  storageLocationName: string; // 库存地点
  deliveryTime: string; // 发货时间
  estimatedArrivalTime: string; // 计划到货日期
  status: string; // 单据状态
  projectLeader: string; // 计划负责人
  createTime: string; // 创建时间
  poCode: string; // 订单号
  orderItemNumber: string; // 订单行号
  skuCode: string; // 物料编码
  materialName: string; // 物料名称
  sendQty: number; // 发货数量
  deliveryOrderAttachments: string; // 送货单附件
};
