/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** AmazonStockMatchBean */
export interface AmazonStockMatchBean {
  /** ASIN */
  asin?: string;
  /** FNSKU */
  fnsku?: string;
  /** 仓库ID */
  jjWarehouseId?: string;
  /** Lute仓库编码 */
  luteWarehouseCode?: string;
  /** 商品图片 */
  productImageUrl?: string;
  /** 商品名称 */
  productName?: string;
  /** SKU */
  sellerSku?: string;
  /**
   * 库存数量
   * @format int32
   */
  stockQuantity?: number;
  /** 供应商SKU */
  supplySku?: string;
  /** 老仓库编码 */
  warehouseCode?: string;
}

/** AmazonStockMskuBean */
export interface AmazonStockMskuBean {
  /** ASIN */
  asin?: string;
  /** 商品图片 */
  productImageUrl?: string;
  /** 商品名称 */
  productName?: string;
  /** SKU */
  sellerSku?: string;
  /**
   * 库存数量
   * @format int32
   */
  stockQuantity?: number;
}

/** AmazonStockMskuReq */
export interface AmazonStockMskuReq {
  /** sku/msku */
  keyword?: string;
  /** 店铺对应仓库编码 */
  luteWarehouseCode?: string;
}

/** AmazonStockMskuResp */
export interface AmazonStockMskuResp {
  mskuList?: AmazonStockMskuBean[];
}

/** AmazonStockReq */
export interface AmazonStockReq {
  /** 积加仓库ID */
  luteWarehouseCode?: string;
  /** 供应商SKU列表 */
  supplySkuList?: string[];
}

/** AmazonStockResp */
export interface AmazonStockResp {
  skuList?: AmazonStockMatchBean[];
}

/** AuthLogBean */
export interface AuthLogBean {
  /**
   * 审核状态
   * @format int32
   */
  authStatus?: number;
  authTag?: string;
  /** 头像 */
  avatar?: string;
  /** 日志名称 */
  name?: string;
  /** 节点编码 */
  nodeCode?: string;
  /** 操作类型 */
  operationType?: string;
  /** 操作人 */
  operator?: string;
  /** 操作人 */
  operatorName?: string;
  /** 备注 */
  remark?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** AuthNodeBean */
export interface AuthNodeBean {
  /**
   * 自动审核 0-否 1-是
   * @format int32
   */
  auto?: number;
  /** 节点编码 */
  code?: string;
  /**
   * 处理时间
   * @format date-time
   */
  handleTime?: string;
  /**
   * ID
   * @format int32
   */
  id?: number;
  /** 审核名称 */
  name?: string;
  /** 审核人 */
  operatorNames?: string[];
  /** 审核人 */
  operators?: string[];
  /** 审核通过人员 */
  passAuthOperatorNames?: string[];
  /** 审核通过人员 */
  passAuthOperators?: string[];
  /** @format int32 */
  sort?: number;
  /**
   * 状态: 0-通过 1-不通过 2-审核中 3-待开始 4-审核中（不通过）
   * @format int32
   */
  status?: number;
  /** 状态: 0-通过 1-不通过 2-审核中 3-待开始 4-审核中（不通过） */
  statusDesc?: string;
  /**
   * 类型：0-and 1-or
   * @format int32
   */
  type?: number;
  /** 待审核人员 */
  waitAuthOperatorNames?: string[];
  /** 待审核人员 */
  waitAuthOperators?: string[];
}

/** B2bOutboundSync */
export interface B2BOutboundSync {
  bizType?: string;
  /** @format date-time */
  confirmTime?: string;
  /** @format date-time */
  createTime?: string;
  /**
   * `deleted`
   * @format int64
   */
  deleted?: number;
  erpCode?: string;
  /** @format int64 */
  id?: number;
  jjOrderCode?: string;
  numList?: string;
  result?: string;
  retryPayload?: string;
  skuList?: string;
  status?: string;
  /** @format date-time */
  updateTime?: string;
  warehouseCode?: string;
  /** @format int32 */
  warehouseId?: number;
  warehouseName?: string;
}

/** BaseInfo */
export interface BaseInfo {
  /** 平台 */
  channel: string;
  /** 币种 */
  currencyCode?: string;
  /**
   * 订购时间
   * @format date-time
   */
  orderingTime: string;
  /**
   * 付款时间
   * @format date-time
   */
  payTime: string;
  /** 平台单号 */
  refNo: string;
  /** 物流渠道 */
  shippingCode?: string;
  /** 店铺 */
  shopAccount: string;
  /** 站点 */
  site: string;
  /** 物流承运商 */
  spCode?: string;
  /**
   * 订单类型
   * @format int32
   */
  type: number;
  /** 发货仓库 */
  warehouseCode?: string;
}

/** BatchAuthResult */
export interface BatchAuthResult {
  message?: string;
  orderCode?: string;
}

/** BatchResult */
export interface BatchResult {
  message?: string;
  orderCode?: string;
}

/** BatchUpdateMskuResult */
export interface BatchUpdateMskuResult {
  message?: string;
  orderCode?: string;
}

/** BoxSku */
export interface BoxSku {
  /** @format int32 */
  qty?: number;
  supplySku?: string;
}

/** Button */
export interface Button {
  /** 是否可编辑 */
  canEdit?: boolean;
  /** 谷仓是否推送中 */
  pushingGc?: boolean;
  /** 是否显示审核按钮 */
  showAuthButton?: boolean;
  /** 是否显示编辑按钮 */
  showEdit?: boolean;
  /** 是否显示转FBA */
  showFba?: boolean;
  /** 是否显示推送谷仓按钮 */
  showPushGc?: boolean;
  /** 是否显示重推积加 */
  showRePushJijia?: boolean;
  /** 是否显示重推fba */
  showRetrtFba?: boolean;
}

/** CommonAttachmentBean */
export interface CommonAttachmentBean {
  /** 文件名称 */
  fileName?: string;
  /** 文件地址 */
  fileUrl?: string;
}

/** CommonExportResp */
export interface CommonExportResp {
  /** app标识 */
  appCode?: string;
  /** 下载链接 */
  downloadUrl?: string;
  /** 模块标识 */
  moduleCode?: string;
}

/** CommonPageReq */
export interface CommonPageReq {
  /**
   * 页数
   * @format int32
   * @min 1
   * @exclusiveMin false
   */
  pageNum: number;
  /**
   * 每页数量
   * @format int32
   * @max 100
   * @exclusiveMax false
   */
  pageSize: number;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
}

/** CommonResp */
export interface CommonResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: object;
  traceId?: string;
}

/** ComplexCondition */
export interface ComplexCondition {
  conditions?: RuleCondition[];
  desc?: string;
  exp?: string;
  type?: string;
}

/** CreditLimitLockRetryReq */
export interface CreditLimitLockRetryReq {
  /** erp订单号 */
  erpCodeList?: string[];
}

/** CustomerInfoBean */
export interface CustomerInfoBean {
  /** 联系方式 */
  contactWay?: string;
  /** 联系人 */
  contacts?: string;
  /** 合同签约主体 */
  contractSubject?: string;
  /** 客户编码 */
  customerCode?: string;
  /** 客户名称 */
  customerName?: string;
  /** 开发人员编码 */
  developCode?: string;
  /** 开发人员 */
  developer?: string;
  /** 邮箱 */
  email?: string;
  /** 等级编号 */
  levelCode?: string;
  /** 等级编号 */
  levelDesc?: string;
  /** 维护人员编码 */
  maintainCode?: string;
  /** 维护人员 */
  maintainter?: string;
  /** 归属部门 */
  organizationDeptId?: string;
  /** 归属部门 */
  organizationDeptName?: string;
  /** 结算账号 */
  settlementAccount?: string;
  /** 结算周期 0-30天 1-60天 2-90天 */
  settlementInterval?: string;
  /** 结算周期 0-30天 1-60天 2-90天 */
  settlementIntervalDesc?: string;
  /**
   * 结算方式: 0-账期 1-款到发货 2-货到付款 3-阿里结算
   * @format int32
   */
  settlementType?: number;
  /** 结算方式: 0-账期 1-款到发货 2-货到付款 3-阿里结算 */
  settlementTypeDesc?: string;
  /**
   * 状态 0-合作 1-终止
   * @format int32
   */
  status?: number;
  /** 状态 0-合作 1-终止 */
  statusDesc?: string;
  /** 主体收款账号 */
  subjectAccount?: string;
  /** 客户类型 */
  type?: string;
  /** 客户类型 */
  typeDesc?: string;
}

/** DbBaseInfo */
export interface DbBaseInfo {
  /** 送货单号 */
  code?: string;
  /** 预约入库单号 */
  prebookCode?: string;
  /** 收货时间 */
  receiveTime?: string;
  /** 收货人 */
  receiver?: string;
  /**
   * 发货时间
   * @format date-time
   */
  sendTime?: string;
  /**
   * 状态 0-待收货 1-已收货
   * @format int32
   */
  status?: number;
  /** 状态 0-待收货 1-已收货 */
  statusDesc?: string;
}

/** DbItemInfo */
export interface DbItemInfo {
  /**
   * id
   * @format int64
   */
  id?: number;
  /** 产品名称 */
  productName?: string;
  /** po单信息 */
  purchaseInfoList?: DbItemPurchaseInfo[];
  /**
   * 收货箱数
   * @format int32
   */
  receiveBoxQty?: number;
  /**
   * 发货箱数
   * @format int32
   */
  sendBoxQty?: number;
  /** 供应链SKU */
  supplySku?: string;
}

/** DbItemPurchaseInfo */
export interface DbItemPurchaseInfo {
  /**
   * id
   * @format int64
   */
  id?: number;
  /** jj采购单号 */
  jjPoCode?: string;
  /** jj入库单号 */
  jjWarehouseEntryCode?: string;
  /** 交货单号 */
  lotNoCode?: string;
  /** 易仓采购单号 */
  poCode?: string;
  /** 质检单号 */
  qcCode?: string;
  /**
   * 收货数量
   * @format int32
   */
  receiveQty?: number;
  /** 备注 */
  remark?: string;
  /**
   * 发货数量
   * @format int32
   */
  sendQty?: number;
  /** SRM采购单号 */
  srmPoCode?: string;
  /** 易仓入库单号 */
  warehouseEntryCode?: string;
}

/** DeliveryBillAddress */
export interface DeliveryBillAddress {
  address?: string;
  companyName?: string;
  contactWay?: string;
  contacts?: string;
  createBy?: string;
  /** @format date-time */
  createTime?: string;
  /** @format int32 */
  deleted?: number;
  deliveryBillCode?: string;
  extraInfo?: string;
  /** @format int64 */
  id?: number;
  /** @format int32 */
  type?: number;
  updateBy?: string;
  /** @format date-time */
  updateTime?: string;
}

/** DeliveryBillListReq */
export interface DeliveryBillListReq {
  /**
   * 是否工厂直发 0-否 1-是
   * @format int32
   */
  isFactoryDirect?: number;
  /** 送货单号/预约入库单号/商品名称/供应链sku */
  keyword?: string;
  /**
   * 页数
   * @format int32
   * @min 1
   * @exclusiveMin false
   */
  pageNum: number;
  /**
   * 每页数量
   * @format int32
   * @max 100
   * @exclusiveMax false
   */
  pageSize: number;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /**
   * 状态 0-待收货 1-已收货 2-异常
   * @format int32
   */
  status?: number;
  /** 供应商编码 */
  supplierCode?: string;
}

/** DeliveryBillListResp */
export interface DeliveryBillListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  recordList?: DeliveryBillResp[];
  /** 订单状态统计 */
  statusStatistics?: StatusStatistics;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** DeliveryBillReq */
export interface DeliveryBillReq {
  addrList?: DeliveryBillAddress[];
  /** 送货单号不能为空 */
  code: string;
  /** 创建人 */
  createBy?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /**
   * 送货时间
   * @format date-time
   */
  deliveryTime?: string;
  /** 明细 */
  detail: DeliveryBillReqItem[];
  /**
   * 预计到货时间
   * @format date-time
   */
  estimatedArrivalTime?: string;
  /**
   * 是否工厂直发 0-否 1-是
   * @format int32
   */
  isFactoryDirect?: number;
  /** 提货单号 */
  prebookCode?: string;
  /** 计划负责人 */
  projectLeader?: string;
  /** 采购组织 */
  purchaseOrg?: string;
  /**
   * 收货时间
   * @format date-time
   */
  receiveTime?: string;
  /** 收货人 */
  receiver?: string;
  /**
   * 状态 0-新建 1-发货在途 2-已到货 3-部分收货 4-全部收货 5-已关闭 6-废弃
   * @format int32
   */
  status?: number;
  /** 库存地点 */
  storageLocation?: string;
  /** 库存地点 */
  storageLocationName?: string;
  /** 供应商编码 */
  supplierCode?: string;
  /** 供应商名称 */
  supplierName?: string;
  /** 供方备注 */
  supplierRemark?: string;
  /** 更新者 */
  updateBy?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** DeliveryBillReqItem */
export interface DeliveryBillReqItem {
  /** 公司编码 */
  companyCode?: string;
  /** 创建人 */
  createBy?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 送货单号 */
  deliveryBillCode?: string;
  /**
   * 订单行号
   * @format int32
   */
  itemNumber?: number;
  /** 物料名称 */
  materialName?: string;
  orderItemNumber?: string;
  /** 采购单号 */
  poCode?: string;
  /**
   * 收货箱数(按sku冗余，例如一个sku下多个采购单，则这个字段数量都一样)
   * @format int32
   */
  receiveBoxQty?: number;
  /**
   * 收货数量
   * @format int32
   */
  receiveQty?: number;
  /** 备注 */
  remark?: string;
  /**
   * 发货箱数(按sku冗余，例如一个sku下多个采购单，则这个字段数量都一样)
   * @format int32
   */
  sendBoxQty?: number;
  /**
   * 发货数量
   * @format int32
   */
  sendQty?: number;
  /** 产品sku=物料编码 */
  skuCode?: string;
  /** 供应链sku */
  supplySku?: string;
  /** 更新者 */
  updateBy?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** DeliveryBillResp */
export interface DeliveryBillResp {
  /** 送货单号 */
  code?: string;
  /** 异常日志 */
  errorRemark?: string;
  /**
   * 是否工厂直发 0-否 1-是
   * @format int32
   */
  isFactoryDirect?: number;
  /** 是否工厂直发 0-否 1-是 */
  isFactoryDirectName?: string;
  /** 预约入库单号 */
  prebookCode?: string;
  /**
   * 收货箱数
   * @format int32
   */
  receiveBoxQty?: number;
  /**
   * 收货数量
   * @format int32
   */
  receiveQty?: number;
  /** 收货时间 */
  receiveTime?: string;
  /** 收货人 */
  receiver?: string;
  /**
   * 发货箱数
   * @format int32
   */
  sendBoxQty?: number;
  /**
   * 发货数量
   * @format int32
   */
  sendQty?: number;
  /** 发货时间 */
  sendTime?: string;
  /**
   * 状态 0-待收货 1-已收货
   * @format int32
   */
  status?: number;
  /** 状态 0-待收货 1-已收货 */
  statusDesc?: string;
  /** 供应商编码 */
  supplierCode?: string;
  /** 供应商名称 */
  supplierName?: string;
}

/** Detail */
export interface Detail {
  /** 基本信息 */
  baseInfo?: OrderBaseInfo;
  /** 商品信息 */
  itemInfoList?: ItemInfo[];
  /** 收货物信息 */
  receiveInfo?: ReceiveInfo;
  /** 店铺参数 */
  shopParamList?: ShopParam[];
}

/** DictCommonBean */
export interface DictCommonBean {
  desc?: string;
  /** 过滤关键字 */
  filterKeyWord?: string;
  value?: string;
}

/** DimensionItem */
export interface DimensionItem {
  /** 维度名称(大区名称/客户类型) */
  name?: string;
  /**
   * 数量
   * @format int64
   */
  qty?: number;
}

/** DirectFactoryWorkOrderAddReq */
export interface DirectFactoryWorkOrderAddReq {
  /** 调拨单附件 */
  attachmentList?: CommonAttachmentBean[];
  /** 是否需要商检：Y=是 ，N=否 */
  businessInspection?: string;
  /** 头程工单编号 */
  code?: string;
  /** 提货日期 */
  deliveryDate?: string;
  /** 送货单列表 */
  directFactoryWorkOrderDeliveryList?: DirectFactoryWorkOrderDeliveryReq[];
  /** 调拨单列表 */
  directFactoryWorkOrderTransferList?: DirectFactoryWorkOrderTransferReq[];
  /** 是否需要出口退税 Y=正式报关 (需要出口退税)  ，N=买单出口 (不需要退税) */
  exportTaxRebate?: string;
  /** @format int64 */
  id?: number;
  /** 日志 */
  logList?: DirectFactoryWorkOrderLogReq[];
  /** 物流是否提货：Y=是  ，N=否 */
  logisticsPickup?: string;
  /** 提货地址 */
  pickupAddress?: string;
  /** 提货方式 logistics=需要物流安排提货 ,factory=工厂自送货,factory_self_logistics=工厂自送物流商仓 */
  pickupMethod?: string;
  /** 发货仓库 */
  srmWarehouseCode?: string;
  /** 状态：0待质检、1待收货、2待出库、3已出库、4异常、5废弃 */
  status?: string;
  statusName?: string;
  /** 供应商编码 */
  supplierCode?: string;
  /** 供应商联系人 */
  supplierContact?: string;
  /** 供应商联系人电话 */
  supplierContactPhone?: string;
  /** 供应商名称 */
  supplierName?: string;
  /** 发货仓库 */
  warehouseCode?: string;
}

/** DirectFactoryWorkOrderBatchReq */
export interface DirectFactoryWorkOrderBatchReq {
  /** 主表id */
  ids?: number[];
  /** 操作类型：QUALITYINSPECTIONCOMPLETED=质检完成，QUALITYINSPECTIONABNORMALITIES=质检异常，RECEIVCOMPLETED=收货完成，RECEIVABNORMALITIES=收货异常 */
  operationType?: string;
}

/** DirectFactoryWorkOrderDeliveryListReq */
export interface DirectFactoryWorkOrderDeliveryListReq {
  /** 创建结束时间 */
  createTimeEnd?: string;
  /** 创建开始时间 */
  createTimeStart?: string;
  /** 送货单号 */
  deliveryBillCode?: string;
  /**
   * 页数
   * @format int32
   * @min 1
   * @exclusiveMin false
   */
  pageNum: number;
  /**
   * 每页数量
   * @format int32
   * @max 100
   * @exclusiveMax false
   */
  pageSize: number;
  /** 计划负责人 */
  projectLeader?: string;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 状态：0待质检、1待入库、2待出库、3已出库、4废弃 */
  status?: string;
  /** 供应商编码 */
  supplierCode?: string;
}

/** DirectFactoryWorkOrderDeliveryListResp */
export interface DirectFactoryWorkOrderDeliveryListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  recordList?: DirectFactoryWorkOrderDeliveryReq[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** DirectFactoryWorkOrderDeliveryReq */
export interface DirectFactoryWorkOrderDeliveryReq {
  /** 创建时间 */
  createTime?: string;
  /** 送货单号 */
  deliveryBillCode?: string;
  /**
   * 送货单行号
   * @format int32
   */
  deliveryBillItemNumber?: number;
  /** 送货时间 */
  deliveryTime?: string;
  /** 预计到货时间 */
  estimatedArrivalTime?: string;
  factoryWorkCode?: string;
  /** @format int64 */
  id?: number;
  /**
   * 是否工厂直发 0-否 1-是
   * @format int32
   */
  isFactoryDirect?: number;
  /** 是否工厂直发 0-否 1-是 */
  isFactoryDirectName?: string;
  /** 物料名称 */
  materialName?: string;
  /** 订单行号 */
  orderItemNumber?: string;
  /** 采购单号 */
  poCode?: string;
  /** 计划负责人 */
  projectLeader?: string;
  /**
   * 发货箱数
   * @format int32
   */
  sendBoxQty?: number;
  /**
   * 发货数量
   * @format int32
   */
  sendQty?: number;
  /** 物料编号 */
  skuCode?: string;
  /**
   * 状态 0-新建 1-发货在途 2-已到货 3-部分收货 4-全部收货 5-已关闭 6-废弃
   * @format int32
   */
  status?: number;
  /** 状态 */
  statusName?: string;
  /** 库存地点 */
  storageLocation?: string;
  /** 库存地点 */
  storageLocationName?: string;
  /** 供应商编码 */
  supplierCode?: string;
  /** 供应商名称 */
  supplierName?: string;
  /** 供方备注 */
  supplierRemark?: string;
  /** 采购仓库 */
  warehouseCode?: string;
}

/** DirectFactoryWorkOrderExportReq */
export interface DirectFactoryWorkOrderExportReq {
  /** 主表id */
  ids?: number[];
}

/** DirectFactoryWorkOrderListReq */
export interface DirectFactoryWorkOrderListReq {
  /** 工单编号 */
  code?: string;
  /** 工单编号 */
  codes?: string[];
  /** 创建人账号 */
  createBy?: string;
  /** 送货单号 */
  deliveryBillCodes?: string[];
  /** 提货时间结束 */
  deliveryDateEnd?: string;
  /** 提货时间开始 */
  deliveryDateStart?: string;
  /** 主表id */
  ids?: number[];
  /** 物流是否提货：Y=是  ，N=否 */
  logisticsPickup?: string;
  /**
   * 页数
   * @format int32
   * @min 1
   * @exclusiveMin false
   */
  pageNum: number;
  /**
   * 每页数量
   * @format int32
   * @max 100
   * @exclusiveMax false
   */
  pageSize: number;
  /** 提货方式 logistics=需要物流安排提货 ,factory=工厂自送货 */
  pickupMethod?: string;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 状态：0待质检、1待收货、2待出库、3已出库、4异常、5废弃 */
  status?: string;
  /** 供应商编码 */
  supplierCode?: string;
  /** 调拨单号 */
  transferOrderCodes?: string[];
  /** 发货仓库 */
  warehouseCode?: string;
}

/** DirectFactoryWorkOrderListResp */
export interface DirectFactoryWorkOrderListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  recordList?: DirectFactoryWorkOrderRespList[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** DirectFactoryWorkOrderLogReq */
export interface DirectFactoryWorkOrderLogReq {
  /** 创建人账号 */
  createBy?: string;
  /** 创建人账号 */
  createByName?: string;
  /** 创建时间 */
  createTime?: string;
  /** 操作内容 */
  operationContent?: string;
}

/** DirectFactoryWorkOrderRespList */
export interface DirectFactoryWorkOrderRespList {
  /** 工单编号 */
  code?: string;
  /** 创建人账号 */
  createBy?: string;
  /** 创建人账号 */
  createName?: string;
  /** 创建时间 */
  createTime?: string;
  /** 提货日期 */
  deliveryDate?: string;
  /** 是否需要出口退税 Y=正式报关 (需要出口退税)  ，N=买单出口 (不需要退税) */
  exportTaxRebate?: string;
  /**
   * id
   * @format int64
   */
  id?: number;
  /** 物流是否提货：Y=是  ，N=否 */
  logisticsPickup?: string;
  /** 提货方式 logistics=需要物流安排提货 ,factory=工厂自送货,factory_self_logistics=工厂自送物流商仓 */
  pickupMethod?: string;
  /** 状态：0待质检、1待收货、2待出库、3已出库、4异常、5废弃 */
  status?: string;
  /** 状态：0待质检、1待收货、2待出库、3已出库、4异常、5废弃 */
  statusName?: string;
  /** 供应商编码 */
  supplierCode?: string;
  /** 供应商名称 */
  supplierName?: string;
  /** 更新时间 */
  updateTime?: string;
  /** 发货仓库 */
  warehouseCode?: string;
  /** 发货仓库 */
  warehouseName?: string;
}

/** DirectFactoryWorkOrderSupplierListReq */
export interface DirectFactoryWorkOrderSupplierListReq {
  /** 供应商名称 */
  supplierName?: string;
}

/** DirectFactoryWorkOrderSupplierListResp */
export interface DirectFactoryWorkOrderSupplierListResp {
  /** 供应商编码 */
  supplierCode?: string;
  /** 供应商名称 */
  supplierName?: string;
  /** 供应商编码 */
  toElsAccount?: string;
}

/** DirectFactoryWorkOrderTransferReq */
export interface DirectFactoryWorkOrderTransferReq {
  /** 调入仓库名称 */
  arrivalWarehouseName?: string;
  /** 创建人账号 */
  createBy?: string;
  /** 创建时间 */
  createTime?: string;
  /** 预计出库日期 */
  executorDate?: string;
  /** 预计出运日期 */
  expectShipmentDate?: string;
  factoryWorkCode?: string;
  /** @format int64 */
  id?: number;
  /**
   * 调拨量
   * @format int32
   */
  quantity?: number;
  /** 原因 */
  result?: string;
  /** 产品名称 */
  skuName?: string;
  /** 状态 [audit-审核中，wait_audit-审核驳回，approve-审核通过，on_the_way-调拨在途，finish-已完成，cancelled-已作废，processingStatus-进行中，draft-草稿] */
  status?: string;
  /** 产品编码 */
  supplySku?: string;
  /** 调拨单号 */
  transferOrderCode?: string;
  /** @format int64 */
  transferOrderItemId?: number;
  /** 物流方式 */
  transport?: string;
  /** 调出仓库名称 */
  warehouseName?: string;
}

/** DownloadOrderAttachmentUrlReq */
export interface DownloadOrderAttachmentUrlReq {
  /** 附件类型列表 */
  attachmentTypeList?: string[];
  /** 订单号列表 */
  erpCodeList?: string[];
}

/** EdiOrderListQueryResp */
export interface EdiOrderListQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  recordList?: Header850[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** EdiOrderQueryReq */
export interface EdiOrderQueryReq {
  /** 结束时间 格式：yyyy-MM-dd HH:mm:ss */
  endTime?: string;
  /**
   * 页数
   * @format int32
   * @min 1
   * @exclusiveMin false
   */
  pageNum: number;
  /**
   * 每页数量
   * @format int32
   * @max 100
   * @exclusiveMax false
   */
  pageSize: number;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 开始时间 格式：yyyy-MM-dd HH:mm:ss */
  startTime?: string;
}

/**
 * ErpDictBean
 * 字典
 */
export interface ErpDictBean {
  /** 字典描述 */
  desc?: string;
  /** 过滤条件1 */
  filter1List?: string[];
  /** 过滤条件2 */
  filter2List?: string[];
  params?: object;
  /** 字典值 */
  value?: string;
}

/** ErpFlowBean */
export interface ErpFlowBean {
  /**
   * 审核方式: 1-系统审核 2-钉钉审核
   * @format int32
   */
  auditType?: number;
  /** 审核编码 */
  code?: string;
  /** 创建人编码 */
  creator?: string;
  /** 创建人名称 */
  creatorDesc?: string;
  /** 日志列表 */
  logList?: LogBean[];
  /** 审核名称 */
  name?: string;
  /**
   * 审核节点个数
   * @format int32
   */
  nodeNums?: number;
  /** 输出信息 */
  outInfo?: string;
  pcode?: string;
  /**
   * 优先级
   * @format int32
   */
  priority?: number;
  /** 规则描述 */
  ruleDesc?: string;
  /** spel 表达式 */
  spelExpression?: string;
  /**
   * 状态: 0-启用 1-禁用
   * @format int32
   */
  status?: number;
  /** 状态: 0-启用 1-禁用 */
  statusDesc?: string;
  /**
   * 类型：0-报价单 1-线下订单 2-申购单 3-销售预测 4-分仓规则
   * @format int32
   */
  type?: number;
  /** 类型：0-报价单 1-线下订单 2-申购单 3-销售预测 4-分仓规则 */
  typeDesc?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** ErpFlowConditionBean */
export interface ErpFlowConditionBean {
  /** 是否父子关联 */
  checkStrictly?: boolean;
  /**
   * 比较类型: 0-等于 1-属于 2-大于等于 3-小于等于 4-大于 5-等于 6-自定义Spel(多条件OR拼接) 7-区间 8-不属于 9-包含 10-不包含
   * @format int32
   */
  compareType?: number;
  /** 比较类型: 0-等于 1-属于 2-大于等于 3-小于等于 4-大于 5-等于 6-自定义Spel(多条件OR拼接) 7-区间 8-不属于 9-包含 10-不包含 */
  compareTypes?: number[];
  /** 自定义Spel */
  customerSpel?: Record<string, string>;
  /** 条件名 */
  name?: string;
  /** 条件code */
  nameCode?: string;
  /** 是否必填 */
  required?: boolean;
  /** 单选多选下拉框值 */
  selectValueList?: ErpFlowDictBean[];
  /** 选择值是否树形结构 */
  selectValueListIsTree?: boolean;
  /** 选择值共享字典key */
  selectValueShareDictKey?: string;
  /**
   * 排序
   * @format int32
   */
  sort?: number;
  /**
   * 状态: 0-启用 1-禁用
   * @format int32
   */
  status?: number;
  /**
   * 类型: 0-单选 1-多选
   * @format int32
   */
  type?: number;
  /** 值  type如果是单选则是具体值，多选的话则是数组 */
  value?: object;
}

/** ErpFlowDetailQueryResp */
export interface ErpFlowDetailQueryResp {
  /** 基本信息 */
  baseInfo?: ErpFlowBean;
  /** 子流程列表 */
  childList?: ErpFlowDetailQueryResp[];
  /** 条件列表 */
  conditionList?: ErpFlowConditionBean[];
  /** 节点列表 */
  nodeList?: ErpFlowNodeBean[];
  /** 输出 */
  outParamList?: ErpFlowOutBean[];
  /** 共享参数 */
  shareDictMap?: Record<string, ErpFlowDictBean[]>;
}

/**
 * ErpFlowDictBean
 * 流程字典
 */
export interface ErpFlowDictBean {
  /** 输出子条件 */
  childrenOutTemplateList?: ErpFlowOutBean[];
  /** 字典描述 */
  desc?: string;
  /** 过滤条件1 */
  filter1List?: string[];
  /** 过滤条件2 */
  filter2List?: string[];
  params?: object;
  /** 字典值 */
  value?: string;
}

/** ErpFlowNodeBean */
export interface ErpFlowNodeBean {
  /**
   * 自动审核 0-否 1-是
   * @format int32
   */
  auto?: number;
  /** 审核编码 */
  code?: string;
  /** 节点名称 */
  name?: string;
  /** 审核人 */
  operatorNames?: string[];
  /** 审核人 */
  operators?: string[];
  /**
   * 排序
   * @format int32
   */
  sort?: number;
  /**
   * 类型：0-and 1-or
   * @format int32
   */
  type?: number;
}

/** ErpFlowOutBean */
export interface ErpFlowOutBean {
  /** 是否必选 */
  mustSelect?: boolean;
  /** 条件名 */
  name?: string;
  /** 条件code */
  nameCode?: string;
  /** 关联条件NameCode */
  relevanceNameCode?: string;
  /** 是否必填 */
  required?: boolean;
  /** 单选多选下拉框值 */
  selectValueList?: ErpFlowDictBean[];
  /** 选择值是否树形结构 */
  selectValueListIsTree?: boolean;
  /** 选择值共享字典key */
  selectValueShareDictKey?: string;
  /**
   * 排序
   * @format int32
   */
  sort?: number;
  /**
   * 类型: 0-单选 1-多选
   * @format int32
   */
  type?: number;
  /** 值  type如果是单选则是具体值，多选的话则是数组 */
  value?: object;
}

/** ErpOrderFreightRuleBean */
export interface ErpOrderFreightRuleBean {
  /** 订单金额 */
  amount?: number;
  /** 品牌 */
  brandCode?: string;
  /** 送货方式1-自提 2-快递 */
  deliveryType?: string;
  /** 产品类型: 1-在售品 2-清仓品 */
  productType?: string;
  /** 省份 */
  province?: string;
  /** 0-广东省内 1-广东省外 */
  provinceIn?: string;
  /**
   * 订单数量
   * @format int32
   */
  skuCount?: number;
}

/** ErpOrderLabelBean */
export interface ErpOrderLabelBean {
  /** 标签编码 */
  labelCode?: string;
  /** 标签名称 */
  labelName?: string;
}

/** ErpOrderPreCheckInventoryReq */
export interface ErpOrderPreCheckInventoryReq {
  /** erp订单号 */
  erpCodeList?: string[];
}

/**
 * ErpOrderPreCheckInventoryResp
 * ERP订单预检库存响应
 */
export interface ErpOrderPreCheckInventoryResp {
  /** 订单列表 */
  orderList?: Order[];
}

/** ErpOrderReferenceParamsResp */
export interface ErpOrderReferenceParamsResp {
  /** 交互参数 */
  navigationParamList?: NavigationParam[];
  /** Reference No */
  referenceNo?: string;
  /** 店铺账号 */
  shopAccount?: string;
}

/** ErpOrderStockQueryResp */
export interface ErpOrderStockQueryResp {
  /** 单号 */
  erpCode?: string;
  /** 是否有库存 */
  isOutStock?: boolean;
  /** sku库存列表 */
  skuStockInfoList?: SkuStockInfo[];
}

/** ErpOrderWarehouseRuleBean */
export interface ErpOrderWarehouseRuleBean {
  /** 详细地址1 */
  address1?: string;
  /** 详细地址2 */
  address2?: string;
  /** 品牌 */
  brandCode?: string;
  /** 城市 */
  city?: string;
  /** 收件人国家 */
  country?: string;
  /** 客户编码 */
  customerCode?: string;
  /** 登记编号 */
  customerLevelCode?: string;
  /** 客户名称 */
  customerName?: string;
  /** 结算周期 0-30天 1-60天 2-90天 */
  customerSettlementInterval?: string;
  /** 结算方式: 0-账期 1-款到发货 2-货到付款 */
  customerSettlementType?: string;
  /** 类型：0-经销商 1-商超 */
  customerType?: string;
  /** 交货方式 */
  deliveryCode?: string;
  /** 发货方式 */
  deliveryType?: string;
  /** 内购商品类型 */
  mallProductType?: string;
  /** 订单渠道 */
  orderSaleType?: string;
  /** 区间值 */
  rangeValue?: number;
  /** 区间值单位 */
  rangeValueUnit?: string;
  /** SKU编码,这个不是分仓条件，这个是方便查这个sku下的供应啦sku */
  skuCode?: string;
  /** 订单来源: 0-手动新增 1-表格导入 2-EDI新增 */
  source?: string;
  /** 缺货 0-否 1-是 */
  stockout?: string;
  /** 订单类型: 0-红人发样单 1-线下订单 2-TT订单 */
  type?: string;
}

/** ErpOrderWpQueryListReq */
export interface ErpOrderWpQueryListReq {
  /**
   * 页数
   * @format int32
   * @min 1
   * @exclusiveMin false
   */
  pageNum: number;
  /**
   * 每页数量
   * @format int32
   * @max 100
   * @exclusiveMax false
   */
  pageSize: number;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
}

/** ErpOrderWpQueryListResp */
export interface ErpOrderWpQueryListResp {
  /** 支持中仓仓库列表 */
  centerWarehouseEnumList?: DictCommonBean[];
  code?: string;
  /** 发货方式列表 */
  deliveryEnumList?: ('FBA' | 'HW' | 'UNKNOW' | 'ZC')[];
  message?: string;
  /** 订单类型列表 */
  orderTypeEnumList?: (
    | 'FULFILLMENT_ORDER'
    | 'IN_PURCHASE_ORDER'
    | 'ODO_RECEIVE_ORDER'
    | 'OFFLINE_ORDER'
    | 'ONLINE_ORDER'
    | 'SAMPLE_ORDER'
    | 'TT'
    | 'UNKNOW'
  )[];
  /** 支持海外仓库列表 */
  overSeaWarehouseEnumList?: DictCommonBean[];
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 记录列表 */
  recordList?: ErpOrderWpQueryListRespItem[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** ErpOrderWpQueryListRespItem */
export interface ErpOrderWpQueryListRespItem {
  button?: Button;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /** 创建人 */
  creatorCode?: string;
  /**
   * 发货方法 1-FBA 2-中仓直发 3-海外仓直发
   * @format int32
   */
  deliveryType?: number;
  /** 发货方法 1-FBA 2-中仓直发 3-海外仓直发 */
  deliveryTypeDesc?: string;
  /** 更新人 */
  operator?: string;
  /** 更新人 */
  operatorCode?: string;
  /**
   * 订单类型: 0-红人发样单 1-线下订单 2-TT订单
   * @format int32
   */
  orderType?: number;
  /** 订单类型: 0-红人发样单 1-线下订单 2-TT订单 */
  orderTypeDesc?: string;
  /** 是否正在刷新 */
  refreshing?: boolean;
  /** 配送方式列表 */
  shippingCodeNameList?: string[];
  /**
   * 状态：0-正常 1-禁用
   * @format int32
   */
  status?: number;
  /** 状态：0-正常 1-禁用 */
  statusDesc?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /** 列表展示发货仓库文案 */
  warehouseDesc?: string;
  /** 发货仓库列表 */
  warehouseList?: DictCommonBean[];
}

/** ErpOrderWpUpdateStatusReq */
export interface ErpOrderWpUpdateStatusReq {
  /**
   * 发货方法 1-FBA 2-中仓直发 3-海外仓直发
   * @format int32
   */
  deliveryType?: number;
  /**
   * 订单类型: 0-红人发样单 1-线下订单 2-TT订单
   * @format int32
   */
  orderType?: number;
  /**
   * 状态：0-正常 1-禁用
   * @format int32
   */
  status?: number;
}

/** FoOrderDetailBean */
export interface FoOrderDetailBean {
  /** asin */
  asin?: string;
  /** 客服备注 */
  customerRemark?: string;
  /** itemid */
  itemId?: string;
  /** msku */
  msku?: string;
  /** 产品名称 */
  productName?: string;
  /**
   * 数量
   * @format int32
   */
  quantity?: number;
  /** sku */
  sku?: string;
}

/** FoOrderListBean */
export interface FoOrderListBean {
  /** 订单明细 */
  detailList?: FoOrderDetailBean[];
  /** 异常信息 */
  exceptionInfo?: string;
  /**
   * 主键ID
   * @format int64
   */
  id?: number;
  /** 物流渠道名称 */
  logisticsChannelName?: string;
  /** 订单号 */
  orderCode?: string;
  /** 预占状态 */
  outboundStatus?: string;
  /** 预占状态 */
  outboundStatusName?: string;
  /**
   * 付款时间
   * @format date-time
   */
  paymentTime?: string;
  /** 平台单号 */
  platformOrderNo?: string;
  /** 收件人国家 */
  receiverCountry?: string;
  /** 收件人国家 */
  receiverCountryDesc?: string;
  /** 收件人姓名 */
  receiverName?: string;
  /** 店铺 */
  shop?: string;
  /** 发货仓库名称 */
  warehouseName?: string;
}

/** FoOrderListQueryResp */
export interface FoOrderListQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 记录列表 */
  recordList?: FoOrderListBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** FoOrderQueryReq */
export interface FoOrderQueryReq {
  /** 平台 */
  channelList?: string[];
  /** 收件人国家 */
  countryCodeList?: string[];
  /** 批量搜索关键字-精准 */
  itemSearchKey?: string;
  /**
   * 搜索类型 1-SKU 2-MSKU
   * @format int32
   */
  itemSearchType?: number;
  /** 单个搜索关键字 */
  itemSingleSearchKey?: string;
  /** 单选 1-订单号 2-参考单号  */
  orderCode?: string;
  /** 预占状态 */
  outboundStatus?: string;
  /**
   * 页数
   * @format int32
   * @min 1
   * @exclusiveMin false
   */
  pageNum: number;
  /**
   * 每页数量
   * @format int32
   * @max 100
   * @exclusiveMax false
   */
  pageSize: number;
  /**
   * 付款时间-结束
   * @format date-time
   */
  payTimeEnd?: string;
  /**
   * 付款时间-开始
   * @format date-time
   */
  payTimeStart?: string;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 批量搜索关键字 */
  searchKey?: string;
  /**
   * 搜索类型 1-订单号 2-参考单号(平台单号)
   * @format int32
   */
  searchType?: number;
  /** 物流渠道 */
  shippingCodeList?: string[];
  /** 店铺 */
  shopCodeList?: string[];
  /** 站点 */
  siteList?: string[];
  /** 发货仓库 */
  warehouseCodeList?: string[];
}

/** FulfillmentBiAttachmentResp */
export interface FulfillmentBiAttachmentResp {
  /**
   * 附件类型
   * @format int32
   */
  attachmentType?: number;
  /** 附件类型描述 */
  attachmentTypeDec?: string;
  /** 文件名称 */
  fileName?: string;
  /** 文件地址 */
  fileUrl?: string;
  /**
   * 附件id
   * @format int64
   */
  id?: number;
  /** 操作人 */
  operator?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** FulfillmentBiDashboardDistributionResp */
export interface FulfillmentBiDashboardDistributionResp {
  /** 维度明细列表 */
  dimension?: DimensionItem[];
  /** 状态(履约状态或异常类型) */
  status?: string;
}

/** FulfillmentBiDashboardSummaryResp */
export interface FulfillmentBiDashboardSummaryResp {
  /**
   * 已交付订单数
   * @format int64
   */
  deliveredOrders?: number;
  /**
   * 订单总数
   * @format int64
   */
  totalOrders?: number;
  /**
   * 未交付订单数
   * @format int64
   */
  undeliveredOrders?: number;
  /**
   * 年份
   * @format int32
   */
  year?: number;
}

/** FulfillmentBiEditReq */
export interface FulfillmentBiEditReq {
  /**
   * ATA实际到货/签收日期
   * @format date
   */
  actualArrivalTime?: string;
  /**
   * 实际齐套日期
   * @format date
   */
  actualKitDate?: string;
  /**
   * 实际打包完成时间
   * @format date
   */
  actualPackCompleteTime?: string;
  /**
   * 预计到货日期
   * @format date
   */
  expectedArrivalTime?: string;
  /**
   * 预计齐套日期
   * @format date
   */
  expectedKitDate?: string;
  /**
   * 预计打包完成时间
   * @format date
   */
  expectedPackCompleteTime?: string;
  /**
   * ESD预计发货时间
   * @format date
   */
  expectedShipTime?: string;
  /**
   * 宽表记录ID
   * @format int64
   */
  id?: number;
  /** 齐套号 */
  kitNo?: string;
  /** 打托信息 */
  palletInfo?: string;
}

/** FulfillmentBiPageQueryReq */
export interface FulfillmentBiPageQueryReq {
  /**
   * 实际到货/签收日期-结束
   * @format date
   */
  actualArrivalDateEnd?: string;
  /**
   * 实际到货/签收日期-开始
   * @format date
   */
  actualArrivalDateStart?: string;
  /**
   * 实际发货日期-结束
   * @format date
   */
  actualShipDateEnd?: string;
  /**
   * 实际发货日期-开始
   * @format date
   */
  actualShipDateStart?: string;
  /**
   * 创建日期-结束
   * @format date
   */
  createTimeEnd?: string;
  /**
   * 创建日期-开始(默认最近一个月)
   * @format date
   */
  createTimeStart?: string;
  /** 客户名称(模糊) */
  customerName?: string;
  /** 客户类型，支持多个，精确匹配 */
  customerTypes?: string[];
  /** 部门ID，支持多个，精确匹配 */
  deptIds?: string[];
  /** 订单号(模糊) */
  erpCode?: string;
  /**
   * 预计到货日期-结束
   * @format date
   */
  expectedArrivalDateEnd?: string;
  /**
   * 预计到货日期-开始
   * @format date
   */
  expectedArrivalDateStart?: string;
  /** 订单状态(履约状态编码)，支持多个，精确匹配 */
  fulfillmentStatuses?: string[];
  /** 模块类型: plan/order/logistics */
  moduleType?: string;
  /** 订单员(工号)，支持多个，精确匹配 */
  orderClerks?: string[];
  /**
   * 页数
   * @format int32
   * @min 1
   * @exclusiveMin false
   */
  pageNum: number;
  /**
   * 每页数量
   * @format int32
   * @max 100
   * @exclusiveMax false
   */
  pageSize: number;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /**
   * 要求发货日期-结束
   * @format date
   */
  requiredShipDateEnd?: string;
  /**
   * 要求发货日期-开始
   * @format date
   */
  requiredShipDateStart?: string;
  /** 销售运营(工号)，支持多个，精确匹配 */
  salesOperations?: string[];
  /** 销售(工号)，支持多个，精确匹配 */
  salesPerson?: string[];
  /**
   * 年份
   * @format int32
   */
  year?: number;
}

/** FulfillmentBiPageQueryResp */
export interface FulfillmentBiPageQueryResp {
  /**
   * 会计审核时间
   * @format date-time
   */
  accountantAuditTime?: string;
  /** 会计审核人 */
  accountantAuditor?: string;
  /**
   * ATA实际到货/签收日期
   * @format date
   */
  actualArrivalTime?: string;
  /**
   * 实际齐套日期
   * @format date
   */
  actualKitDate?: string;
  /**
   * 实际打包完成时间
   * @format date-time
   */
  actualPackCompleteTime?: string;
  /**
   * 实际发货时间
   * @format date-time
   */
  actualShipTime?: string;
  /** 附件1(运营上传)-列表 */
  attachment1List?: FulfillmentBiAttachmentResp[];
  /** 附件2(物流上传)-列表 */
  attachment2List?: FulfillmentBiAttachmentResp[];
  /** 客户编码 */
  customerCode?: string;
  /** 客户名称 */
  customerName?: string;
  /** 客户类型 */
  customerType?: string;
  /** 配送方式 */
  deliveryMethod?: string;
  /** 交货方式 */
  deliveryType?: string;
  /** 部门 */
  deptName?: string;
  /** 订单号 */
  erpCode?: string;
  /** 异常状态 */
  exceptionStatus?: string;
  /**
   * 预计到货日期
   * @format date
   */
  expectedArrivalTime?: string;
  /**
   * 预计齐套日期
   * @format date
   */
  expectedKitDate?: string;
  /**
   * 预计打包完成时间
   * @format date
   */
  expectedPackCompleteTime?: string;
  /**
   * 期望发货日期
   * @format date
   */
  expectedShipDate?: string;
  /**
   * ESD预计发货时间
   * @format date
   */
  expectedShipTime?: string;
  /** 履约状态 */
  fulfillmentStatus?: string;
  /** @format int64 */
  id?: number;
  /** 齐套号 */
  kitNo?: string;
  /** 物流专员 */
  logisticsSpecialist?: string;
  /** 订单渠道 */
  orderChannel?: string;
  /** 订单员 */
  orderClerk?: string;
  /**
   * 订单创建时间
   * @format date-time
   */
  orderCreateTime?: string;
  /** 订单创建人 */
  orderCreator?: string;
  /**
   * 订单管理审批时间
   * @format date-time
   */
  orderMgmtAuditTime?: string;
  /** 订单管理审核人 */
  orderMgmtAuditor?: string;
  /**
   * 订单数量
   * @format int32
   */
  orderQuantity?: number;
  /** 订单来源 */
  orderSource?: string;
  /** 打托信息 */
  palletInfo?: string;
  /** 品线计划员 */
  productLinePlanner?: string;
  /** 产品名称 */
  productName?: string;
  /** 产品SKU */
  productSku?: string;
  /**
   * 推送仓库时间
   * @format date-time
   */
  pushWarehouseTime?: string;
  /** 收件人国家 */
  receiverCountry?: string;
  /** 收件人省/州 */
  receiverProvince?: string;
  /** 参考单号 */
  refNo?: string;
  /**
   * 要求发货日期
   * @format date
   */
  requiredShipDate?: string;
  /** 销售运营 */
  salesOperations?: string;
  /** 销售出库单号 */
  salesOutboundNos?: string;
  /** 销售 */
  salesPerson?: string;
  /** 发货仓库 */
  shipWarehouse?: string;
  /**
   * 上级审核时间
   * @format date-time
   */
  superiorAuditTime?: string;
  /** 上级审核人 */
  superiorAuditor?: string;
  /** 三方出库单号 */
  thirdOutboundNos?: string;
  /** 快递单号 */
  trackingNos?: string;
  /**
   * 仓库签出倒计时(天)
   * @format int32
   */
  warehouseSignoutCountdown?: number;
}

/** FulfillmentBiPageResp */
export interface FulfillmentBiPageResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 记录列表 */
  recordList?: FulfillmentBiPageQueryResp[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** FulfillmentOrderBatchChangeSkuReq */
export interface FulfillmentOrderBatchChangeSkuReq {
  /** 订单明细列表 */
  orderChangeDetailList?: OrderChangeDetail0[];
}

/** FulfillmentOrderBatchChangeSkuResp */
export interface FulfillmentOrderBatchChangeSkuResp {
  /** 订单明细列表 */
  orderChangeDetailList?: OrderChangeDetail[];
}

/** FulfillmentOrderUploadTrackingNoReq */
export interface FulfillmentOrderUploadTrackingNoReq {
  /** 订单号 */
  code?: string;
  /**
   * 操作类型: 1-确认；2-确认并标发
   * @format int32
   */
  operationType?: number;
  /** 物流单号 */
  trackingNo?: string;
}

/** GcUploadReq */
export interface GcUploadReq {
  /** 上传地址名字 */
  fileName?: string;
  /** 绝对路径 */
  fileUrl?: string;
  /** 谷仓文件类型: 货件标签-SHIPMENT_LABEL_ATTACHMENT 物流面单-BOX_LOGISTIC_LABEL_ATTACHMENT  SKU换标标签-REBRAND_SKU_ATTACHMENT, 装箱清单-ORDER_PACKING_ATTACHMENT */
  gcFileType?: string;
  /** 上传地址 */
  ossKey?: string;
  /** 仓库编码 */
  warehouseCode?: string;
}

/** GcUploadResp */
export interface GcUploadResp {
  /**
   * 上传地址
   * @format int32
   */
  fileId?: number;
  /** 上传地址名字 */
  fileName?: string;
  /** 绝对路径 */
  fileUrl?: string;
  /** 上传地址 */
  ossKey?: string;
}

/** GenerateResult */
export interface GenerateResult {
  /** 上传的文件 */
  file?: UploadReq;
  /** 关联sku */
  productSku?: string;
  /**
   * sku数量
   * @format int32
   */
  quantity?: number;
  /** 箱唛号 */
  ssc?: string;
}

/** GuCangTransferSlipOrderBean */
export interface GuCangTransferSlipOrderBean {
  /** 仓配订单编码 */
  code?: string;
  /** 配送服务 */
  deliveryService?: GuCangTransferSlipOrderBeanDeliveryService;
  /** 是否草稿 */
  draft?: boolean;
  /** 其他信息 */
  otherInfo?: GuCangTransferSlipOrderBeanOtherInfo;
  /**
   * 装箱类型 0
   * 仓库自主装箱
   * 1
   * 客户指定装箱
   * 2
   * 已暂存箱发货
   * @format int32
   */
  packingType?: number;
  /** 收货信息 */
  recipientInfo?: GuCangTransferSlipOrderBeanReceiveInfo;
  /** 参考号 */
  referenceNo?: string;
  /**
   * 类型 1-FBA 2-其他调拨单
   * @format int32
   */
  type?: number;
  /** 国际件信息 */
  vatChangeInfo?: GuCangTransferSlipOrderBeanVatChangeInfo;
  /** 发货仓库编码 */
  warehouseCode?: string;
  /** 发货仓库名称 */
  warehouseDesc?: string;
  /** 库内服务 */
  warehouseService?: GuCangTransferSlipOrderBeanWarehouseService;
  /** 发货物理仓库编码 */
  wpCode?: string;
  /** 发货物理仓库名称 */
  wpName?: string;
}

/** GuCangTransferSlipOrderBeanDeliveryService */
export interface GuCangTransferSlipOrderBeanDeliveryService {
  /**
   * 年龄检测服务
   * @format int32
   */
  ageDetection?: number;
  /**
   * 配送商0
   * 谷仓合作物流
   * 1
   * 客户物流（谷仓交运）
   * 2
   * 客户物流（自提）
   */
  distributionDesc?: string;
  /**
   * 配送商0
   * 谷仓合作物流
   * 1
   * 客户物流（谷仓交运）
   * 2
   * 客户物流（自提）
   * @format int32
   */
  distributionType?: number;
  /** 平台仓库代码 */
  fbaWarehouseCode?: string;
  /** 保险金额 */
  insuranceValue?: number;
  /**
   * 保险服务 0：不需要 1：需要
   * @format int32
   */
  isInsurance?: number;
  /** 保险服务 0：不需要 1：需要 */
  isInsuranceDesc?: string;
  /**
   * 是否打板 0 否 1是
   * @format int32
   */
  isOptionalBoard?: number;
  /** 是否打板 0 否 1是 */
  isOptionalBoardDesc?: string;
  /**
   * 签名服务 0：不选择签名服务 1：签名服务
   * @format int32
   */
  isSignature?: number;
  /** 签名服务 */
  isSignatureDesc?: string;
  /**
   * 配送方式 0-快递 1-卡车
   * @format int32
   */
  isTruck?: number;
  /**
   * 升降服务 0 否 1是
   * @format int32
   */
  liftGate?: number;
  /** 升降服务 0 否 1是 */
  liftGateDesc?: string;
  /** 货件号 */
  referenceId?: string;
  /** Seller ID */
  sellerName?: string;
  /** 配送方式 */
  smCode?: string;
  /** 配送方式名称 */
  smName?: string;
  /** 配送方式 */
  truckDesc?: string;
}

/** GuCangTransferSlipOrderBeanOtherInfo */
export interface GuCangTransferSlipOrderBeanOtherInfo {
  /** 期望到货日期，格式例如：2021-03-01 */
  estimatedArrivalDate?: string;
  /**
   * 到货时间段，物流产品支持则可填写，否则无效
   * @format int32
   */
  estimatedArrivalTime?: number;
  /** 附件列表 */
  fileList?: UploadReq[];
  /** 寄件人姓名 */
  name?: string;
  /** 订单备注 */
  orderDesc?: string;
  /** 装箱清单附件 */
  packingFile?: UploadReq[];
  /**
   * 装箱清单ID
   * @format int32
   */
  packingFileId?: number;
  /** 寄件人电话 */
  phone?: string;
}

/** GuCangTransferSlipOrderBeanReceiveInfo */
export interface GuCangTransferSlipOrderBeanReceiveInfo {
  /**
   * 地址1
   * @example "One Microsoft Way"
   */
  address1: string;
  /**
   * 地址2
   * @example "创汇国际2"
   */
  address2?: string;
  /** 电话区号 */
  areaCode?: string;
  /**
   * 城市
   * @example "Miami"
   */
  city: string;
  /** 公司名称 */
  company?: string;
  /**
   * 国家/地区
   * @example "US"
   */
  countryCode: string;
  /**
   * 门牌号
   * @example 35
   */
  doorplate?: string;
  /** 邮箱 */
  email?: string;
  /** 分机号 */
  ext?: string;
  /**
   * 收件人姓
   * @example "fake"
   */
  lastName?: string;
  /**
   * 收件人名
   * @example "samuel"
   */
  name: string;
  /** 电话号码 */
  phone?: string;
  /**
   * 省/州
   * @example "FL"
   */
  province?: string;
  /**
   * 收货平台
   * @example "MKD"
   */
  receivingPlatform?: string;
  /**
   * 邮编
   * @example 33178
   */
  zipcode: string;
}

/** GuCangTransferSlipOrderBeanVatChangeInfo */
export interface GuCangTransferSlipOrderBeanVatChangeInfo {
  /** IOSS号码 */
  iossNumber?: string;
  /** PID号码 */
  pidNumber?: string;
  /** 收件人EORI */
  recipientEori?: string;
  /** 收件人EORI注册国/地区 */
  recipientEoriCountry?: string;
  /** 收件人VAT */
  recipientVat?: string;
  /** 收件人VAT注册国/地区 */
  recipientVatCountry?: string;
  /** 发件人公司名称 */
  shipperCompanyName?: string;
  /** 发件人EORI */
  shipperEori?: string;
  /** 发件人VAT */
  shipperVat?: string;
  /** 发件人VAT注册城市 */
  shipperVatCity?: string;
  /** 发件人VAT注册公司名称 */
  shipperVatCompanyName?: string;
  /** 发件人VAT注册国/地区 */
  shipperVatCountry?: string;
  /** 发件人VAT注册地址1 */
  shipperVatStreetAddress1?: string;
  /** 发件人VAT注册地址2 */
  shipperVatStreetAddress2?: string;
  /** 发件人VAT注册地邮编 */
  shipperVatZipCode?: string;
}

/** GuCangTransferSlipOrderBeanWarehouseService */
export interface GuCangTransferSlipOrderBeanWarehouseService {
  /**
   * 每箱张贴货件标签数
   * @format int32
   */
  boxMarkNum?: number;
  /**
   * 每单件换标数量
   * @format int32
   */
  changeLabelQtyPiece?: number;
  /**
   * 包材要求
   * @format int32
   */
  customerPackageRequirement?: number;
  /**
   * 包材要求
   * @format int32
   */
  customerPackageRequirementDesc?: number;
  /** 包材归属 */
  customerPackageType?: string;
  /** 包材归属 */
  customerPackageTypeDesc?: string;
  /**
   * 必填SKU换标服务
   * @format int32
   */
  isChangeLabel?: number;
  /** 必填SKU换标服务 0-否 1-是 */
  isChangeLabelDesc?: string;
  /**
   * 欧代/英代合规负责人标签
   * @format int32
   */
  isEuroLabel?: number;
  /** 商品明细 */
  itemList?: WsProductInfo[];
  /**
   * SKU换标要求 1-外箱 2-内箱
   * @format int32
   */
  labelReplacementOption?: number;
  /** SKU换标要求 */
  labelReplacementOptionDesc?: string;
  /** 装箱明细 */
  packingList?: WsPackageInfo[];
}

/** GucangPackageListReq */
export interface GucangPackageListReq {
  /** 仓配单号或销售订单号 */
  code?: string;
}

/** GucangPackageListResp */
export interface GucangPackageListResp {
  /** 仓配单号 */
  code?: string;
  /** 关联单号 */
  erpCode?: string;
  /** 装箱sku列表 */
  packageLineList?: PackageLineRes[];
  /** 参考单号 */
  refNo?: string;
  /** 发货人信息 */
  shipFrom?: string;
  /** 收货人信息 */
  shipTo?: ShipAddressRes;
}

/** Header850 */
export interface Header850 {
  allowanceChargeAmount?: string;
  allowanceChargeCode?: string;
  allowanceChargeIndicator?: string;
  billToAddress?: string;
  billToCity?: string;
  billToContactName?: string;
  billToCountry?: string;
  billToEmail?: string;
  billToFirstName?: string;
  billToLastName?: string;
  billToName?: string;
  billToNo?: string;
  billToPostal?: string;
  billToProvince?: string;
  billToTelephone?: string;
  carrierCode?: string;
  classCode?: string;
  /** @format date-time */
  customerOrderDate?: string;
  customerOrderNo?: string;
  /** @format date-time */
  deliveryRequestedDate?: string;
  eccangOrderNo?: string;
  giftWrap?: string;
  id?: string;
  internalControlNo?: string;
  internalCustomerNo?: string;
  internalVendorNo?: string;
  notesCode?: string;
  notesMessage?: string;
  orderedByAddress?: string;
  orderedByCity?: string;
  orderedByContactName?: string;
  orderedByCountry?: string;
  orderedByEmail?: string;
  orderedByFirstName?: string;
  orderedByLastName?: string;
  orderedByName?: string;
  orderedByNo?: string;
  orderedByPostal?: string;
  orderedByProvince?: string;
  orderedByTelephone?: string;
  /** @format int32 */
  packingSlipSyncStatus?: number;
  /** @example "yyyy-MM-dd HH:mm:ss" */
  poDate?: string;
  poNo?: string;
  promotionNo?: string;
  /** @format date-time */
  requestedShipDate?: string;
  serviceLevelCode?: string;
  shipToAddress?: string;
  shipToCity?: string;
  shipToContactName?: string;
  shipToCountry?: string;
  shipToEmail?: string;
  shipToFirstName?: string;
  shipToLastName?: string;
  shipToName?: string;
  shipToNo?: string;
  shipToPostal?: string;
  shipToProvince?: string;
  shipToTelephone?: string;
  /** @format int32 */
  status?: number;
  storeNo?: string;
  termsDiscountAmount?: string;
  termsDiscountDaysDue?: string;
  termsDiscountPercent?: string;
  termsNetDays?: string;
}

/** ImportDataReq */
export interface ImportDataReq {
  async?: boolean;
  /** 文件名称 */
  fileName?: string;
  /** 导入场景 例如线下渠道商品：channel_product */
  importScene?: string;
  /** 上传文件的key或者完整路径 */
  key?: string;
  /** 产品运营项目编码  导入产品运营项目周期数据时，必传 */
  projectCode?: string;
}

/** ImportDataResp */
export interface ImportDataResp {
  /** 业务编码 */
  businessData?: object;
  /**
   * 失败数量
   * @format int32
   */
  failedCount?: number;
  /** 导入记录code */
  recordCode?: string;
  /**
   * 成功数量
   * @format int32
   */
  succeededCount?: number;
}

/** ImportTemplateQueryResp */
export interface ImportTemplateQueryResp {
  /** 下载地址 */
  templateUrl?: string;
}

/** InventoryAllotAddBean */
export interface InventoryAllotAddBean {
  /** 调入分配池编码 */
  inPoolCode?: string;
  /** 调入分配池名称 */
  inPoolName?: string;
  /** 调出分配池编码 */
  outPoolCode?: string;
  /** 调出分配池名称 */
  outPoolName?: string;
  /**
   * 备注
   * @minLength 0
   * @maxLength 500
   */
  remark?: string;
  /** 仓库编码 */
  warehouseCode?: string;
}

/** InventoryAllotAddReq */
export interface InventoryAllotAddReq {
  /** 库存分配单 */
  inventoryAllot?: InventoryAllotAddBean;
  /** 库存分配明细列表 */
  itemList?: InventoryAllotItemAddBean[];
  /**
   * 页数
   * @format int32
   * @min 1
   * @exclusiveMin false
   */
  pageNum: number;
  /**
   * 每页数量
   * @format int32
   * @max 100
   * @exclusiveMax false
   */
  pageSize: number;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
}

/** InventoryAllotBean */
export interface InventoryAllotBean {
  /** 库存分配单号 */
  allotCode?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /** 创建人名称 */
  creatorName?: string;
  /**
   * 主键
   * @format int64
   */
  id?: number;
  /** 调入分配池编码 */
  inPoolCode?: string;
  /** 调入分配池名称 */
  inPoolName?: string;
  /** 调出分配池编码 */
  outPoolCode?: string;
  /** 调出分配池名称 */
  outPoolName?: string;
  /** 备注 */
  remark?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /** 仓库编码 */
  warehouseCode?: string;
  /** 仓库名称 */
  warehouseName?: string;
}

/** InventoryAllotItemAddBean */
export interface InventoryAllotItemAddBean {
  /**
   * 分配数量
   * @format int32
   * @min 1
   * @exclusiveMin false
   */
  allotQty?: number;
  /**
   * 可用数量
   * @format int32
   */
  availableQty?: number;
  /**
   * 备注
   * @minLength 0
   * @maxLength 200
   */
  remark?: string;
  /** 产品SKU */
  skuCode?: string;
  /** 供应链SKU */
  supplySku?: string;
}

/** InventoryAllotItemBean */
export interface InventoryAllotItemBean {
  /** 库存分配单号 */
  allotCode?: string;
  /**
   * 分配数量
   * @format int32
   */
  allotQty?: number;
  /**
   * 可用数量
   * @format int32
   */
  availableQty?: number;
  /**
   * 主键
   * @format int64
   */
  id?: number;
  /** 产品名称 */
  productName?: string;
  /** 备注 */
  remark?: string;
  /** 产品SKU */
  skuCode?: string;
  /** 供应链SKU */
  supplySku?: string;
}

/** InventoryAllotItemResp */
export interface InventoryAllotItemResp {
  /** 库存分配单 */
  inventoryAllot?: InventoryAllotBean;
  /** 库存分配明细列表 */
  itemList?: InventoryAllotItemBean[];
}

/** InventoryAllotListReq */
export interface InventoryAllotListReq {
  /** 库存分配单号 */
  allotCode?: string;
  /**
   * 创建结束时间
   * @format date
   */
  createTimeEnd?: string;
  /**
   * 创建开始时间
   * @format date
   */
  createTimeStart?: string;
  /** 创建人 */
  creators?: string[];
  /** 调入分配池 */
  inPoolCode?: string;
  /** 调出分配池 */
  outPoolCode?: string;
  /**
   * 页数
   * @format int32
   * @min 1
   * @exclusiveMin false
   */
  pageNum: number;
  /**
   * 每页数量
   * @format int32
   * @max 100
   * @exclusiveMax false
   */
  pageSize: number;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 仓库 */
  warehouseCodes?: string[];
}

/** InventoryAllotListResp */
export interface InventoryAllotListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 库存分配单列表 */
  recordList?: InventoryAllotBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** InventoryPoolReq */
export interface InventoryPoolReq {
  keyword?: string;
  /** @format int32 */
  level?: number;
  /** @format int32 */
  status?: number;
  warehouseCode?: string;
}

/** InventoryPoolResp */
export interface InventoryPoolResp {
  /** @format int32 */
  level?: number;
  parentCode?: string;
  poolCode?: string;
  poolName?: string;
  /** @format int32 */
  priority?: number;
  /** @format int32 */
  status?: number;
  type?: string;
}

/** Item */
export interface Item {
  /**
   * 申请数量
   * @format int32
   */
  applyQty?: number;
  /**
   * 审核数量（已创建保存时忽略，以数据库为准）
   * @format int32
   */
  auditQty?: number;
  /** 调入仓编码 */
  inWarehouseCode?: string;
  /**
   * 明细主键：新增明细不传；已创建状态下编辑时必传以定位原行
   * @format int64
   */
  itemId?: number;
  /** MSKU */
  msku?: string;
  /** 调出仓编码（已创建保存时忽略，以数据库为准；新增明细可为空，待审核时填写） */
  outWarehouseCode?: string;
  /** 产品名称 */
  productName?: string;
  /** 产品 SKU */
  productSku?: string;
  /** 供应链 SKU */
  supplySku?: string;
  /** 未满足原因（≤50 字） */
  unsatisfiedReason?: string;
}

/** Item0 */
export interface Item0 {
  /**
   * 发货方式
   * @format int32
   */
  deliverType?: number;
  /**
   * 库存数
   * @format int32
   */
  inventory?: number;
  /** 商品编码 */
  skuCode?: string;
  /** 供应链SKU */
  supplySku?: string;
  /** 仓库编码 */
  warehouseCode?: string;
}

/** ItemBean */
export interface ItemBean {
  /** 对象编码 */
  itemCode?: string;
  /** 对象名称 */
  itemName?: string;
}

/** ItemInfo */
export interface ItemInfo {
  /**
   * 捆绑产品id
   * @format int64
   */
  bindingId?: number;
  /** 客选物流 */
  buyerChooseLogistics?: string;
  /** 佣金 */
  commission?: string;
  /** 发货方式code */
  deliveryCode?: string;
  /** 发货方式 */
  deliveryDesc?: string;
  /** 发货方式 - 交互可选 */
  deliveryList?: NavigationDeliveryParam[];
  /** 折扣金额 */
  discountAmount?: number;
  /** ean编码 */
  eanCode?: string;
  /** fn_sku */
  fnSku?: string;
  /** 运费 */
  freightAmount?: number;
  /**
   * 是否是赠品，0是否，1=是
   * @format int32
   */
  gift?: number;
  /**
   * id
   * @format int64
   */
  id?: number;
  /** 商品积分 */
  integral?: number;
  /**
   * 库存数
   * @format int32
   */
  inventory?: number;
  /** item_id */
  itemId?: string;
  /**
   * 换标数量
   * @format int32
   */
  labelNum?: number;
  /**
   * 内件货物总数量
   * @format int32
   */
  labelReplacementQty?: number;
  /**
   * 发货数量
   * @format int32
   */
  num?: number;
  /** 商品其他费用 */
  otherAmount?: number;
  /** 是否缺货 */
  outOfStockFlag?: string;
  /** 报价 */
  postalPrice?: number;
  /** 单价(不含税) */
  price?: string;
  /** 单价税额 */
  priceTaxAmount?: number;
  /** 商品图片 */
  productImageUrl?: string;
  /** 商品名称 */
  productName?: string;
  /** 备注 */
  remark?: string;
  /** 买家运费 */
  salesFreightAmount?: number;
  /** sellerSku */
  sellerSku?: string;
  /** 配送方式code */
  shippingCode?: string;
  /** 配送方式 */
  shippingDesc?: string;
  /** 商品SKUcode */
  skuCode?: string;
  /**
   * sku类型 0-单商品 1-组合商品 3套装
   * @format int32
   */
  skuType?: number;
  /** sourceItemId */
  sourceItemId?: string;
  /** 占比数量情况，如组合品，每个明细的数量情况 */
  sourceProportion?: string;
  /** 承运商 */
  spCode?: string;
  /** 承运商列表 - 交互可选 */
  spList?: NavigationSpListParam[];
  /** 承运商名称 */
  spName?: string;
  /** 建议售价 */
  suggestPrice?: number;
  /** 供应链SKU */
  supplySku?: string;
  /** 供应链SKU - 交互可选 */
  supplySkuItemList?: Item0[];
  /** 含税单价 */
  taxPrice?: number;
  /** 税率 */
  taxRate?: number;
  /** 税率 */
  taxRateDesc?: string;
  /** 税 */
  taxes?: number;
  /** 预估时效 */
  timeLines?: string;
  /** 时效 */
  timeliness?: string;
  /** 分摊总小费 */
  tipAmount?: number;
  /** 总价 */
  totalPrice?: string;
  /** TTsellerSku */
  ttSellerSku?: string;
  /**
   * 单位: 0-件 1-箱
   * @format int32
   */
  unit?: number;
  /** 单位编码 */
  unitCode?: string;
  /** 单位描述 */
  unitDesc?: string;
  /** UPC编码-bean copy使用 */
  upc?: string;
  /** UPC编码 */
  upcCode?: string;
  /** 体积 */
  volume?: number;
  /** 仓库编码 */
  warehouseCode?: string;
  /** 仓库 */
  warehouseDesc?: string;
  /** 仓库列表 - 交互可选 */
  warehouseList?: NavigationWarehouseListParam[];
  /** 重量 */
  weight?: number;
}

/** JjPickTaskSync */
export interface JjPickTaskSync {
  /** @format date-time */
  createTime?: string;
  deliveryCode?: string;
  /** @format int64 */
  deliveryId?: number;
  /** @format int64 */
  id?: number;
  /** @format date-time */
  pickConfirmTime?: string;
  /** @format date-time */
  pickCreateTime?: string;
  pickTaskCode?: string;
  /** @format int64 */
  pickTaskId?: number;
  result?: string;
  status?: string;
  /** @format date-time */
  updateTime?: string;
  /** @format int32 */
  warehouseId?: number;
}

/** LabelDeleteReq */
export interface LabelDeleteReq {
  /** 标签编码 */
  labelCode?: string;
}

/** LabelInfoBean */
export interface LabelInfoBean {
  /** 子标签集合 */
  childInfoList?: LabelInfoBean[];
  /** 公司名称 */
  companyCode?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /** 创建人名称 */
  creatorName?: string;
  /** 标签描述 */
  desc?: string;
  /** 标签code */
  labelCode?: string;
  /**
   * 标签类型 1-系统标签 2-自定义标签
   * @format int32
   */
  labelType?: number;
  /** 标签类型描述 */
  labelTypeDesc?: string;
  /**
   * 等级
   * @format int32
   */
  level?: number;
  /** 等级描述 */
  levelDesc?: string;
  /** 模块 */
  module?: string;
  /** 模块描述 */
  moduleDesc?: string;
  /** 标签名称 */
  name?: string;
  /** 父级标签code */
  parentLabelCode?: string;
  /** 父级标签名称 */
  parentName?: string;
  /**
   * 标签顺序
   * @format int32
   */
  sort?: number;
  /**
   * 状态
   * @format int32
   */
  status?: number;
  /** 状态描述 */
  statusDesc?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** LabelListQueryReq */
export interface LabelListQueryReq {
  /** 标签编码 （红人模块：不传查一级标签，传查二级标签） */
  labelCode?: string;
  /** 标签模块 ：oms_order */
  module?: string;
  /** 标签名称 */
  name?: string;
  /** 不显示名称 */
  noShowNames?: string[];
  /**
   * 页数
   * @format int32
   * @min 1
   * @exclusiveMin false
   */
  pageNum: number;
  /**
   * 每页数量
   * @format int32
   * @max 100
   * @exclusiveMax false
   */
  pageSize: number;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
}

/** ListOrderRemark */
export interface ListOrderRemark {
  /**
   * id
   * @format int64
   */
  id?: number;
  /** 操作人 */
  operator?: string;
  /** 备注 */
  remark?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** LogBean */
export interface LogBean {
  /** 日志名称 */
  name?: string;
  /** 操作人 */
  operator?: string;
  /** 操作人 */
  operatorName?: string;
  /** 备注 */
  remark?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** LogisticsOrderPushReq */
export interface LogisticsOrderPushReq {
  /** 买家邮箱 */
  buyerEmail?: string;
  /** 买家姓名 */
  buyerName?: string;
  /** 申报明细 */
  declareItemList?: ProductInfoBean[];
  /** 预估运费 */
  estimatedShippingCost?: number;
  /** 附件url */
  extraInfo?: string;
  /** 文件名称 */
  fileName?: string;
  /** 自发货物流单号 */
  logisticsNo?: string;
  /** 上游出库单号 */
  outboundNo?: string;
  /** 实际运费 */
  realShippingCost?: number;
  /** 收件人 */
  receiver?: ReceiverBean;
  /** 来源单号，上游单号 */
  refNo?: string;
  /** 备注 */
  remark?: string;
  /** 发件人 */
  sender?: ReceiverBean;
  /** 物流产品编码 */
  shippingMethodCode?: string;
  /** 物流产品名称 */
  shippingMethodName?: string;
  /** 店铺 */
  shop?: string;
  /** 来源平台 */
  sourcePlatform?: string;
  /** 物流服务商编码 */
  spCode?: string;
  /** 税号 */
  taxId?: string;
  /**
   * 总件数
   * @format int32
   */
  totalPieces?: number;
  /** 总价值 */
  totalPrice?: number;
  /** 总体积 */
  totalVolume?: number;
  /** 总重量 */
  totalWeight?: number;
  /** 跟踪号 */
  trackNo?: string;
  /** 发货仓 */
  warehouseCode?: string;
  /** 运单号 */
  waybillNo?: string;
}

/** LogisticsWarehouseVatQueryListResp */
export interface LogisticsWarehouseVatQueryListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  recordList?: WarehouseVatBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** LogisticsWarehouseVatQueryReq */
export interface LogisticsWarehouseVatQueryReq {
  /**
   * 页数
   * @format int32
   * @min 1
   * @exclusiveMin false
   */
  pageNum: number;
  /**
   * 每页数量
   * @format int32
   * @max 100
   * @exclusiveMax false
   */
  pageSize: number;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
}

/** MarkShippedStatusStatistics */
export interface MarkShippedStatusStatistics {
  /** @format int32 */
  failed?: number;
  /** @format int32 */
  success?: number;
  /** @format int32 */
  wait?: number;
}

/** MetaSampleOrderV3ItemBean */
export interface MetaSampleOrderV3ItemBean {
  /**
   * 捆绑产品id
   * @format int64
   */
  bindingId?: number;
  /** 客选物流 */
  buyerChooseLogistics?: string;
  /** 佣金 */
  commission?: number;
  /** 发货方式 */
  deliveryCode?: string;
  /** 发货方式 */
  deliveryDesc?: string;
  /** 折扣金额 */
  discountAmount?: number;
  /** 运费 */
  freightAmount?: number;
  /**
   * 是否是赠品，0是否，1=是
   * @format int32
   */
  gift?: number;
  /**
   * id
   * @format int64
   */
  id?: number;
  /**
   * 库存
   * @format int32
   */
  inventory?: number;
  /** item_id */
  itemId?: string;
  /** 数量 */
  num?: string;
  /**
   * 数量
   * @format int32
   */
  numInt?: number;
  /** 发货单号 易仓返回 */
  orderCode?: string;
  /** 其他费用 */
  otherAmount?: number;
  /** 是否缺货：N-否；Y-是 */
  outOfStockFlag?: string;
  /** 是否缺货：N-否；Y-是 */
  outOfStockFlagDesc?: string;
  /** 单价(查商品中心建议售价) */
  price?: string;
  /** 单价税额 */
  priceTaxAmount?: number;
  /** 商品图片 */
  productImageUrl?: string;
  /** 商品名称 */
  productName?: string;
  /** 商品名称-英文 */
  productNameEn?: string;
  /** 买家运费 */
  salesFreightAmount?: number;
  /** 填写销售单价 */
  salesPrice?: number;
  /** 发货单号 路特生成 */
  sampleCode?: string;
  /** 卖家SKU */
  sellerSku?: string;
  /** 配送方式 */
  shippingCode?: string;
  /** 配送方式 */
  shippingDesc?: string;
  /** 配送方式2 */
  shippingDesc2?: string;
  /** 商品SKU */
  skuCode?: string;
  /** 承运商 */
  spCode?: string;
  /** 承运商名称 */
  spName?: string;
  /** 供应链SKU */
  supplySku?: string;
  /** 含税单价 */
  taxPrice?: number;
  /** 税率 */
  taxRate?: number;
  /** 税率 */
  taxRateDesc?: string;
  /** 税 */
  taxes?: number;
  /** 分摊总小费 */
  tipAmount?: number;
  /** 总价 */
  totalPrice?: string;
  upc?: string;
  /** 体积 */
  volume?: number;
  /** 仓库 */
  warehouseCode?: string;
  /** 仓库 */
  warehouseDesc?: string;
  /** 重量 */
  weight?: number;
}

/** ModifyWarehouseLogisticsReq */
export interface ModifyWarehouseLogisticsReq {
  /** 发货方式 */
  deliveryCode?: string;
  /** erp订单号 */
  erpCodeList?: string[];
  /** 物流渠道 */
  shippingCode?: string;
  /** 承运商 */
  spCode?: string;
  /** 发货仓库 */
  warehouseCode?: string;
}

/** MonitorB2bOutboundOrderBean */
export interface MonitorB2BOutboundOrderBean {
  /** 批次号 */
  batchNo?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** ERP订单编码 */
  erpCode?: string;
  /**
   * ERP创建时间
   * @format date-time
   */
  erpCreateTime?: string;
  /**
   * ERP订单状态
   * @format int32
   */
  erpStatus?: number;
  /** ERP状态名称 */
  erpStatusName?: string;
  /** 异常原因 */
  exceptionReason?: string;
  /** Flux状态 */
  fluxStatus?: string;
  /** Flux状态名称 */
  fluxStatusName?: string;
  /**
   * 主键
   * @format int64
   */
  id?: number;
  /** 积加订单编码 */
  jjOrderCode?: string;
  /** 积加状态 */
  jjStatus?: string;
  /** 积加状态名称 */
  jjStatusName?: string;
  /** OMS编码 */
  omsCode?: string;
  /** OMS错误备注 */
  omsErrorRemark?: string;
  /**
   * OMS状态
   * @format int32
   */
  omsStatus?: number;
  /** OMS状态名称 */
  omsStatusName?: string;
  /**
   * 预占状态
   * @format int32
   */
  reserveStatus?: number;
  /** 预占状态名称 */
  reserveStatusName?: string;
  /**
   * 同步确认时间
   * @format date-time
   */
  syncConfirmTime?: string;
  /**
   * 同步创建时间
   * @format date-time
   */
  syncCreateTime?: string;
  /** 同步结果 */
  syncResult?: string;
  /** 同步状态 */
  syncStatus?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /** 仓库编码 */
  warehouseCode?: string;
}

/** MonitorB2bOutboundQueryListReq */
export interface MonitorB2BOutboundQueryListReq {
  /** 批次号列表 */
  batchNoList?: string[];
  /**
   * 创建时间-结束
   * @format date-time
   */
  createTimeEnd?: string;
  /**
   * 创建时间-开始
   * @format date-time
   */
  createTimeStart?: string;
  /** ERP订单编码列表 */
  erpCodeList?: string[];
  /**
   * ERP创建时间-结束
   * @format date-time
   */
  erpCreateTimeEnd?: string;
  /**
   * ERP创建时间-开始
   * @format date-time
   */
  erpCreateTimeStart?: string;
  /** Flux状态 */
  fluxStatus?: string;
  /** 积加订单编码 */
  jjOrderCode?: string;
  /** 积加状态 */
  jjStatus?: string;
  /** OMS编码列表 */
  omsCodeList?: string[];
  /**
   * OMS状态
   * @format int32
   */
  omsStatus?: number;
  /** @format int32 */
  pageNum?: number;
  /** @format int32 */
  pageSize?: number;
  /**
   * 预占状态
   * @format int32
   */
  reserveStatus?: number;
  /** 仓库编码 */
  warehouseCode?: string;
}

/** MonitorB2bOutboundQueryListResp */
export interface MonitorB2BOutboundQueryListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** B2B订单全链路监控日志表集合 */
  resultList?: MonitorB2BOutboundOrderBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** MonitorCisStorageBean */
export interface MonitorCisStorageBean {
  /** 批次号 */
  batchNo?: string;
  /**
   * CIS可用数量
   * @format int32
   */
  cisAvailable?: number;
  /**
   * CIS预占数量
   * @format int32
   */
  cisReserved?: number;
  /**
   * CIS总数量
   * @format int32
   */
  cisTotal?: number;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /**
   * 可用数量差异
   * @format int32
   */
  diffAvailable?: number;
  /**
   * 预占数量差异
   * @format int32
   */
  diffReserved?: number;
  /**
   * 总数量差异
   * @format int32
   */
  diffTotal?: number;
  /** 异常类型 */
  exceptionType?: string;
  /**
   * 主键
   * @format int64
   */
  id?: number;
  /**
   * 积加可用数量
   * @format int32
   */
  jjAvailable?: number;
  /**
   * 积加预占数量
   * @format int32
   */
  jjReserved?: number;
  /**
   * 积加总数量
   * @format int32
   */
  jjTotal?: number;
  /** SKU编码 */
  supplySku?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /** 仓库编码 */
  warehouseCode?: string;
  /** 积加仓库ID */
  warehouseId?: string;
  /** 仓库名称 */
  warehouseName?: string;
}

/** MonitorCisStorageQueryListReq */
export interface MonitorCisStorageQueryListReq {
  /** 批次号列表 */
  batchNoList?: string[];
  /**
   * 创建时间-结束
   * @format date-time
   */
  createTimeEnd?: string;
  /**
   * 创建时间-开始
   * @format date-time
   */
  createTimeStart?: string;
  /** 异常类型 */
  exceptionType?: string;
  /**
   * 积加可用数量-最大值
   * @format int32
   */
  jjAvailableMax?: number;
  /**
   * 积加可用数量-最小值
   * @format int32
   */
  jjAvailableMin?: number;
  /** @format int32 */
  pageNum?: number;
  /** @format int32 */
  pageSize?: number;
  /** SKU编码列表 */
  supplySkuList?: string[];
  /** 仓库编码 */
  warehouseCode?: string;
}

/** MonitorCisStorageQueryListResp */
export interface MonitorCisStorageQueryListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 积加CIS库存监控日志表集合 */
  resultList?: MonitorCisStorageBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** MonitorSalesOrderBean */
export interface MonitorSalesOrderBean {
  /** 批次号 */
  batchNo?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** '出库单号' */
  deliveryCode?: string;
  /** 异常原因 */
  exceptionReason?: string;
  /**
   * Flux状态
   * @format int32
   */
  fluxStatus?: number;
  /** Flux状态名称 */
  fluxStatusName?: string;
  /**
   * 主键
   * @format int64
   */
  id?: number;
  /** 积加异常原因 */
  jjExceptionReason?: string;
  /** 积加状态 */
  jjStatus?: string;
  /** 积加状态名称 */
  jjStatusName?: string;
  /** OMS编码 */
  omsCode?: string;
  /**
   * OMS创建时间
   * @format date-time
   */
  omsCreateTime?: string;
  /** OMS错误备注 */
  omsErrorRemark?: string;
  /**
   * OMS状态
   * @format int32
   */
  omsStatus?: number;
  /** OMS状态名称 */
  omsStatusName?: string;
  /**
   * 预占状态
   * @format int32
   */
  reserveStatus?: number;
  /** 预占状态名称 */
  reserveStatusName?: string;
  /** 同步状态结果 */
  syncResult?: string;
  /** 同步状态 */
  syncStatus?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /** 仓库编码 */
  warehouseCode?: string;
  /** 仓库名称 */
  warehouseCodeDesc?: string;
}

/** MonitorSalesQueryListReq */
export interface MonitorSalesQueryListReq {
  /** 批次号列表 */
  batchNoList?: string[];
  /**
   * 创建时间-结束
   * @format date-time
   */
  createTimeEnd?: string;
  /**
   * 创建时间-开始
   * @format date-time
   */
  createTimeStart?: string;
  /** 出库单号列表 */
  deliveryCodeList?: string[];
  /**
   * Flux状态
   * @format int32
   */
  fluxStatus?: number;
  /** 积加异常原因 */
  jjExceptionReason?: string;
  /** 积加状态 */
  jjStatus?: string;
  /** OMS编码 */
  omsCode?: string;
  /**
   * OMS状态
   * @format int32
   */
  omsStatus?: number;
  /** @format int32 */
  pageNum?: number;
  /** @format int32 */
  pageSize?: number;
  /**
   * 预占状态
   * @format int32
   */
  reserveStatus?: number;
  /** 仓库编码 */
  warehouseCode?: string;
}

/** MonitorSalesQueryListResp */
export interface MonitorSalesQueryListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 积加销售单全链路监控日志表集合 */
  resultList?: MonitorSalesOrderBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** MonitorTransferOrderBean */
export interface MonitorTransferOrderBean {
  /** 调入仓库编码 */
  arrivalWarehouseCode?: string;
  /** 调入仓库名称 */
  arrivalWarehouseName?: string;
  /** 批次号 */
  batchNo?: string;
  /** ERP调拨单编码 */
  code?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 异常原因 */
  exceptionReason?: string;
  /** Flux状态 */
  fluxStatus?: string;
  /** Flux状态名称 */
  fluxStatusName?: string;
  /**
   * 主键
   * @format int64
   */
  id?: number;
  /** 是否虚拟出库 */
  isVirtual?: string;
  /**
   * 积家实际发货日期
   * @format date-time
   */
  jjActualDeliveryDate?: string;
  /** 积家调拨单编码 */
  jjCode?: string;
  /** 积家状态 */
  jjStatus?: string;
  /** 积家状态名称 */
  jjStatusName?: string;
  /** 积家调拨单ID */
  jjTransferId?: string;
  /**
   * 订单创建时间
   * @format date-time
   */
  orderCreateTime?: string;
  /** 出库状态 */
  outboundStatus?: string;
  /** 出库状态名称 */
  outboundStatusName?: string;
  /**
   * 预占状态
   * @format int32
   */
  reserveStatus?: number;
  /** 预占状态名称 */
  reserveStatusName?: string;
  /** ERP调拨状态 */
  transferStatus?: string;
  /** ERP调拨状态名称 */
  transferStatusName?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /** 调出仓库编码 */
  warehouseCode?: string;
  /** 调出仓库名称 */
  warehouseName?: string;
}

/** MonitorTransferQueryListReq */
export interface MonitorTransferQueryListReq {
  /** 调入仓库编码 */
  arrivalWarehouseCode?: string;
  /** 批次号列表 */
  batchNoList?: string[];
  /** ERP调拨单编码列表 */
  codeList?: string[];
  /**
   * 创建时间-结束
   * @format date-time
   */
  createTimeEnd?: string;
  /**
   * 创建时间-开始
   * @format date-time
   */
  createTimeStart?: string;
  /** Flux状态 */
  fluxStatus?: string;
  /** 积家调拨单编码 */
  jjCode?: string;
  /** 积家状态 */
  jjStatus?: string;
  /**
   * 订单创建时间-结束
   * @format date-time
   */
  orderCreateTimeEnd?: string;
  /**
   * 订单创建时间-开始
   * @format date-time
   */
  orderCreateTimeStart?: string;
  /** 出库状态 */
  outboundStatus?: string;
  /**
   * 页数
   * @format int32
   */
  pageNum?: number;
  /**
   * 每页数量
   * @format int32
   */
  pageSize?: number;
  /** 预占状态 */
  reserveStatus?: string;
  /** ERP调拨状态 */
  transferStatus?: string;
  /** 调出仓库编码 */
  warehouseCode?: string;
}

/** MonitorTransferQueryListResp */
export interface MonitorTransferQueryListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 积家调拨单全链路监控日志表集合 */
  resultList?: MonitorTransferOrderBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** NavigationDeliveryParam */
export interface NavigationDeliveryParam {
  /** 发货方法 1-FBA 2-中仓直发 3-海外仓直发 */
  deliveryCode?: string;
  /** 发货方法 1-FBA 2-中仓直发 3-海外仓直发 */
  deliveryName?: string;
  /** 仓库列表 */
  warehouseList?: NavigationWarehouseListParam[];
}

/** NavigationParam */
export interface NavigationParam {
  /** 国家编码 */
  countryCode?: string;
  /** 国家名称 */
  countryName?: string;
  /** 发货方式 */
  deliveryList?: NavigationDeliveryParam[];
}

/** NavigationSpListParam */
export interface NavigationSpListParam {
  /** 配送方式列表-天 */
  shippingDayMap?: Record<string, number>;
  /** 配送方式列表 */
  shippingList?: ErpDictBean[];
  /** 服务商代码 */
  spCode?: string;
  /** 服务商名称 */
  spName?: string;
}

/** NavigationWarehouseListParam */
export interface NavigationWarehouseListParam {
  /** 服务商列表 */
  spList?: NavigationSpListParam[];
  /** 仓库代码 */
  warehouseCode?: string;
  /** 仓库名称 */
  warehouseName?: string;
}

/** OdoDetailResp */
export interface OdoDetailResp {
  /** 基本信息 */
  baseInfo?: OdoDetailRespBaseInfo;
  /** 客户信息 */
  customerInfo?: OdoDetailRespCustomerInfo;
  /** 商品信息 */
  itemInfoList?: OdoDetailRespItemInfo[];
  /** 订单额外信息 */
  odoExtraInfo?: OdoExtraInfo;
  /** 附件信息 */
  orderAttachmentList?: OrderAttachmentInfoRes[];
  /** 收货信息 */
  receiveInfo?: ReceiveInfo;
}

/** OdoDetailRespBaseInfo */
export interface OdoDetailRespBaseInfo {
  /** 申请人 */
  applicantCode?: string;
  /** 申请人部门 */
  applicantDept?: string;
  /** 申请人 */
  applicantName?: string;
  /** 渠道审批人 */
  channelApprove?: string;
  /** 渠道审批人 */
  channelApproveName?: string;
  /** 自发货单号 */
  code?: string;
  /** 创建时间 */
  createTime?: string;
  /** B2B客户 */
  customer?: string;
  /** B2B客户 */
  customerName?: string;
  /** 发货方法 */
  deliveryCode?: string;
  /** 发货方法 1-FBA 2-中仓直发 3-海外仓直发 */
  deliveryName?: string;
  /** PRE销售单号 */
  erpCode?: string;
  /** 已出库时间(完成时间) */
  finishTime?: string;
  /** 货代 */
  freightForwarding?: string;
  /** 渠道 */
  freightForwardingChannelCode?: string;
  /** 渠道描述 */
  freightForwardingChannelDesc?: string;
  /** GTM审批人 */
  gtmApprove?: string;
  /** GTM审批人 */
  gtmApproveName?: string;
  /**
   * 谷仓是否贴标(0-否 1-是)
   * @format int32
   */
  guChangeLabel?: number;
  /**
   * 谷仓换标要求:1-外箱 2-内箱
   * @format int32
   */
  guChangeLabelReplacementOption?: number;
  /** 待处理时间 */
  handleTime?: string;
  /**
   * 是否周边产品
   * @format int32
   */
  isOutSide?: number;
  /** 是否周边产品 */
  isOutSideDesc?: string;
  /**
   * 产品项数
   * @format int32
   */
  itemCount?: number;
  /** 物流附件 */
  logisticsAtt?: OrderAttachment[];
  /** 物流附件名称 */
  logisticsAttNames?: string;
  /** 物流费用 */
  logisticsFee?: number;
  /** 承运商 */
  logisticsName?: string;
  /** 市场大区 */
  marketRegion?: string;
  /**
   * 是否钉钉通知 0-否 1-是
   * @format int32
   */
  noticeFlag?: number;
  /** 第三方系统订单号 */
  orderCode?: string;
  /** 领用订单备注 */
  orderRemark?: string;
  /** 待出库时间 */
  outTime?: string;
  /** 装箱附件 */
  packingAtt?: OrderAttachment[];
  /** 装箱附件名称 */
  packingAttNames?: string;
  /** 计划员编码 */
  planner?: string;
  /** 计划员 */
  plannerName?: string;
  /** 参考单号 */
  refCode?: string;
  /** 备注 */
  remark?: string;
  /** 扩展备注1 */
  remark1?: string;
  /** 扩展备注2 */
  remark2?: string;
  /** 领用人部门 */
  requisitionDept?: string;
  /** 领用场景 */
  requisitionScene?: string;
  /** 领用类型 */
  requisitionType?: string;
  /** 领用用途 */
  requisitionUse?: string;
  /** 领用人 */
  requisitioner?: string;
  /** 领用人 */
  requisitionerCode?: string;
  /** 销售订单创建时间 */
  saleOrderCreateTime?: string;
  /** 发货要求 */
  sendDemand?: string;
  /** 配送方式 */
  shippingCode?: string;
  /** 配送方式 */
  shippingDesc?: string;
  /** 唛头 */
  shippingMark?: string;
  /**
   * sku个数
   * @format int32
   */
  skuCount?: number;
  /** 用户CRM来源ID */
  sourceCode?: string;
  /**
   * 状态
   * @format int32
   */
  status?: number;
  /** 状态描述 */
  statusDesc?: string;
  /** 仓配系统订单号 */
  systemCode?: string;
  /** 系统备注 */
  systemRemark?: string;
  /** 仓配系统销售订单号 */
  systemSaleCode?: string;
  /** 仓配系统 */
  thirdSytem?: string;
  /** 跟踪单号 */
  trackingNum?: string;
  /**
   * 出库单类型: 1-领用订单 0-自发货单
   * @format int32
   */
  type?: number;
  /** 仓库编号 */
  warehouseCode?: string;
  /** 仓库名称 */
  warehouseDesc?: string;
  /** 运单号 */
  waybillNo?: string;
  /** 仓配单号 */
  woCode?: string;
}

/** OdoDetailRespCustomerInfo */
export interface OdoDetailRespCustomerInfo {
  /** 国家 */
  countryCode?: string;
  /** 国家描述 */
  countryDesc?: string;
  /** 客户编码 */
  customerCode?: string;
  /** 客户名称 */
  customerName?: string;
  /** 收货地址 */
  receiveAddress?: string;
  /** 收货人手机 */
  receiveMobile?: string;
  /** 收货人 */
  receiveName?: string;
  /** 收货人电话 */
  receivePhone?: string;
  /** 收货地址邮编 */
  receiveZipCode?: string;
}

/** OdoDetailRespItemInfo */
export interface OdoDetailRespItemInfo {
  /** 发货方式 */
  deliveryCode?: string;
  /** 发货方式 */
  deliveryDesc?: string;
  /** EAN编码 */
  ean?: string;
  /** EAN附件 */
  eanAttachment?: OrderAttachment;
  /** EAN描述 */
  eanDesc?: string;
  /** fn_sku */
  fnSku?: string;
  /**
   * 主键
   * @format int64
   */
  id?: number;
  /** 物品名称 */
  itemName?: string;
  /** 物料属性 */
  itemProperties?: string;
  /**
   * 换标数量
   * @format int32
   */
  labelNum?: number;
  /**
   * 内件货物总数量
   * @format int32
   */
  labelReplacementQty?: number;
  /**
   * 序号
   * @format int32
   */
  no?: number;
  /** 商品名称 */
  productName?: string;
  /** 供应链SKU */
  productSku?: string;
  /**
   * 数量
   * @format int32
   */
  qty?: number;
  /** 商品价格 */
  salePrice?: number;
  /** 配送方式 */
  shippingCode?: string;
  /** 配送方式 */
  shippingDesc?: string;
  /** 配送方式2 */
  shippingDesc2?: string;
  /** 供应链SKU */
  skuCode?: string;
  /** UPC编码 */
  upc?: string;
  /** EAN附件 */
  upcAttachment?: OrderAttachment;
  /** UPC描述 */
  upcDesc?: string;
  /** 仓库 */
  warehouseCode?: string;
  /** 仓库 */
  warehouseDesc?: string;
}

/** OdoExtraInfo */
export interface OdoExtraInfo {
  /** 实际交易费用 */
  actualAmount?: number;
  /** 币种 */
  currencyCode?: string;
  /** 运费 */
  shipAmount?: number;
  /** 卖家账号 */
  shopCode?: string;
}

/** OmsBusinessTriggerTaskBatchRetryReq */
export interface OmsBusinessTriggerTaskBatchRetryReq {
  /** 任务编码列表 */
  taskCodeList: string[];
}

/** OmsBusinessTriggerTaskPageQueryReq */
export interface OmsBusinessTriggerTaskPageQueryReq {
  /** 业务编码 */
  businessCode?: string;
  /**
   * 结束时间
   * @format date-time
   */
  endTime?: string;
  /** 操作人员：传入则只查该用户任务；不传则查当日全部（与列表筛选一致时可传当前用户） */
  operator?: string;
  /**
   * 页数
   * @format int32
   * @min 1
   * @exclusiveMin false
   */
  pageNum: number;
  /**
   * 每页数量
   * @format int32
   * @max 100
   * @exclusiveMax false
   */
  pageSize: number;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /**
   * 开始时间
   * @format date-time
   */
  startTime?: string;
  /** 状态 wait-待处理，processing-处理中，success-成功，failed-失败 ignore-不处理 */
  status?: string;
  /** 任务编码 */
  taskCode?: string;
  /** 任务类型  transfer_fba */
  taskType?: string;
}

/** OmsBusinessTriggerTaskPageResp */
export interface OmsBusinessTriggerTaskPageResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 记录列表 */
  recordList?: TaskBusinessTaskBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** OmsBusinessTriggerTaskRetryReq */
export interface OmsBusinessTriggerTaskRetryReq {
  /** 任务编码，与列表中的任务编号一致，例如 TASK000001 */
  taskCode: string;
}

/** OperateTypeItemBean */
export interface OperateTypeItemBean {
  /** 对象信息集合 */
  itemList?: ItemBean[];
  operateTypeDesc?: string;
}

/** OperationLogBean */
export interface OperationLogBean {
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 对象编码 */
  itemCode?: string;
  /** 对象内容 */
  itemContent?: string;
  /** 对象类型 */
  itemType?: string;
  /** 模块类型 */
  moduleType?: string;
  /** 操作类型 */
  operationType?: string;
  /** 操作类型 */
  operationTypeDesc?: string;
  /** 操作人 */
  operator?: string;
  /** 流水编号 */
  serialCode?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** OperationLogQueryBean */
export interface OperationLogQueryBean {
  /** 头像 */
  avatar?: string;
  /** 项目编码 */
  itemCode?: string;
  /** 项目类型 */
  itemType?: string;
  /** 子操作明细日志 */
  operateTypeItemList?: OperateTypeItemBean[];
  /** 更新内容(操作内容) */
  operationContent?: string;
  /**
   * 更新时间(操作时间)
   * @format date-time
   */
  operationTime?: string;
  /** 操作类型 */
  operationType?: string;
  /** 操作类型 */
  operationTypeDesc?: string;
  /** 操作人 */
  operator?: string;
  /** 更新人(操作人) */
  operatorName?: string;
  /** 备注 */
  remark?: string;
}

/** OperationLogReq */
export interface OperationLogReq {
  /**
   * 结束时间
   * @format date-time
   */
  endTime?: string;
  /** 项目编码 */
  itemCode?: string;
  /** 项目类型 在线课程-study_course */
  itemType?: string;
  /** 模型类型 在线课程-study_course */
  moduleType?: string;
  /**
   * 页数
   * @format int32
   * @min 1
   * @exclusiveMin false
   */
  pageNum: number;
  /**
   * 每页数量
   * @format int32
   * @max 100
   * @exclusiveMax false
   */
  pageSize: number;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /**
   * 开始时间
   * @format date-time
   */
  startTime?: string;
}

/** OperationLogResp */
export interface OperationLogResp {
  code?: string;
  /** 日志集合 */
  logList?: OperationLogQueryBean[];
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** OrdeAddOrDelTabelReq */
export interface OrdeAddOrDelTabelReq {
  /** 编码 */
  erpCodes?: string[];
  /** 标签 */
  tabelList?: ErpOrderLabelBean[];
}

/**
 * Order
 * SPS-EDI预校验库存订单数据
 */
export interface Order {
  /** erp订单号 */
  erpCode?: string;
  /** 明细 */
  itemList?: Item0[];
}

/** OrderAddItemGiftReq */
export interface OrderAddItemGiftReq {
  /** 赠品信息 */
  giftOrderList?: GiftOrder[];
}

/** OrderAttachment */
export interface OrderAttachment {
  /**
   * 附件类型（空值为普通附件；1,装箱附件; 2, 订单详情附件）
   * @format int32
   */
  attachmentType?: number;
  /** 附件类型（空值；装箱附件; 订单详情附件） */
  attachmentTypeDec?: string;
  /** 头像 */
  avatar?: string;
  /** 是否可剪切 */
  canCut?: boolean;
  /** 文件名称 */
  fileName?: string;
  /** 文件地址 */
  fileUrl?: string;
  /**
   * 附件id
   * @format int64
   */
  id?: number;
  /** 操作人 */
  operator?: string;
  /** OSS Key */
  ossKey?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** OrderAttachmentInfo */
export interface OrderAttachmentInfo {
  /**
   * 附件类型（空为普通附件；1、装箱附件；2、订单详情附件）
   * @format int32
   */
  attachmentType?: number;
  /** 文件名称 */
  fileName?: string;
  /** 文件地址 */
  fileUrl?: string;
}

/** OrderAttachmentInfoReq */
export interface OrderAttachmentInfoReq {
  /**
   * 附件类型（空为普通附件；1、装箱附件；2、订单详情附件）
   * @format int32
   */
  attachmentType?: number;
  /** 文件名称 */
  fileName?: string;
  /** 文件地址 */
  fileUrl?: string;
}

/** OrderAttachmentInfoRes */
export interface OrderAttachmentInfoRes {
  /**
   * 附件类型（空为普通附件；1、装箱附件；2、订单详情附件;3-领用装箱单附件 4-领用拣货单附件）
   * @format int32
   */
  attachmentType?: number;
  /** 是否可剪切 */
  canCut?: boolean;
  /** 文件名称 */
  fileName?: string;
  /** 文件地址 */
  fileUrl?: string;
  /**
   * 附件id
   * @format int64
   */
  id?: number;
  /** 操作人 */
  operator?: string;
  /** OSS Key */
  ossKey?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** OrderAuthSaveReq */
export interface OrderAuthSaveReq {
  /** 基本信息 */
  baseInfo?: OrderSaveBaseInfo;
  /** 商品信息 */
  itemInfoList?: OrderSaveItemInfo[];
  /** 附件信息(附件) */
  orderAttachmentList?: OrderAttachmentInfo[];
  /**
   * 是否指定装箱（附件） - 0-否 1-是
   * @format int32
   */
  packingAttachmentStatus?: number;
  /** 通过不通过 */
  pass?: boolean;
  /** 结算信息 */
  paymentTermsInfo?: PaymentTermsInfo;
  /** 收获信息 */
  receiveInfo?: OrderSaveReceiveInfo;
  /** 备注 */
  remark?: string;
  /** 是否提交 */
  submit?: boolean;
}

/** OrderB2bOutboundReq */
export interface OrderB2BOutboundReq {
  erpCode?: string;
  jjOrderCode?: string;
  /**
   * 页数
   * @format int32
   * @min 1
   * @exclusiveMin false
   */
  pageNum: number;
  /**
   * 每页数量
   * @format int32
   * @max 100
   * @exclusiveMax false
   */
  pageSize: number;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
}

/** OrderB2bOutboundResp */
export interface OrderB2BOutboundResp {
  code?: string;
  list?: B2BOutboundSync[];
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** OrderBaseInfo */
export interface OrderBaseInfo {
  /** 总金额(不含税) */
  amount?: string;
  /**
   * 钉钉-审核时间
   * @format date-time
   */
  authTime?: string;
  /**
   * 是否自动拆单 0-否 1-是
   * @format int32
   */
  autoSubOrder?: number;
  /** 渠道 */
  channel?: string;
  /**
   * 是否COD 0-否 1-是
   * @format int32
   */
  cod?: number;
  /** 是否COD 0-否 1-是 */
  codDesc?: string;
  /** 佣金 */
  commission?: string;
  /** 商品贴标url */
  commodityLabelingUrl?: string;
  /**
   * 第三方-创建时间
   * @format date-time
   */
  createAt?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 信用额度偏移量
   * @format int32
   */
  creditLimitOffset?: number;
  /** 币种编码 */
  currencyCode?: string;
  /** 币种 */
  currencyDesc?: string;
  /** 客服备注 */
  customRemark?: string;
  /** 客户编码 */
  customerCode?: string;
  /** 客户名称 */
  customerDesc?: string;
  /** 交货方式 交货方式 0-FOB 1-DDP 2-ESW 3-DAP */
  deliverType?: string;
  /** 交货方式 交货方式 0-FOB 1-DDP 2-ESW 3-DAP */
  deliverTypeDesc?: string;
  /**
   * 送达时间
   * @format date-time
   */
  deliveryTime?: string;
  /** 折扣金额 */
  discountAmount?: string;
  /**
   * 易仓审核时间
   * @format date-time
   */
  ecAuthTime?: string;
  /** Reference No */
  erpCode?: string;
  /** 异常分类 */
  errTypeDesc?: string;
  /** 异常备注 */
  errorRemark?: string;
  /**
   * 预计到货时间
   * @format date-time
   */
  expectedArrivalTime?: string;
  /** 客户快递付款账号 */
  expressDeliveryPaymentAccount?: string;
  /** 执行流程编码 */
  flowCode?: string;
  /** 执行流程名称 */
  flowName?: string;
  /** 运费 */
  freightAmount?: string;
  /**
   * 谷仓是否贴标(0-否 1-是)
   * @format int32
   */
  guChangeLabel?: number;
  /**
   * 谷仓换标要求:1-外箱 2-内箱
   * @format int32
   */
  guChangeLabelReplacementOption?: number;
  /** 订单积分 */
  integral?: number;
  /** 物流URL */
  logisticsUrl?: string;
  /** 标发状态 */
  markShippedStatus?: string;
  /** 标发状态 */
  markShippedStatusDesc?: string;
  /**
   * 运营期望到货时间
   * @format date-time
   */
  operationExpectedArrivalTime?: string;
  /**
   * 运营期望到货时间-结束
   * @format date-time
   */
  operationExpectedArrivalTimeEnd?: string;
  /** 订单号 易仓返回 */
  orderCode?: string;
  /** 订单标签 */
  orderLabelList?: OrderLabelBean[];
  /** 订单销售类型选择，见枚举b2b_client_order_sale_type */
  orderSaleType?: string;
  /** 订单销售类型选择，见枚举b2b_client_order_sale_type */
  orderSaleTypeDesc?: string;
  /**
   * 订单状态 101-草稿 102-待拆单 200-待发货审核 201-待钉钉审核,300-待发货,400-已发货 500-EC异常 501-钉钉审核失败异常 600-废弃
   * @format int32
   */
  orderStatus?: number;
  /** 订单状态 101-草稿 102-待拆单 200-待发货审核 201-待钉钉审核,300-待发货,400-已发货 500-EC异常 501-钉钉审核失败异常 600-废弃 */
  orderStatusDesc?: string;
  /**
   * 订购时间
   * @format date-time
   */
  orderingTime?: string;
  /**
   * os审核时间
   * @format date-time
   */
  osAuthTime?: string;
  /** 订单其他费用 */
  otherAmount?: number;
  /** 出库单号 */
  outboundCode?: string;
  /**
   * 付款时间
   * @format date-time
   */
  payTime?: string;
  /** 付款方式 */
  paymentMethod?: string;
  pcode?: string;
  /**
   * 期望发货时间
   * @format date-time
   */
  platformExpectedSendTime?: string;
  /** 商品税额 */
  productTaxAmount?: number;
  /** 是否禁止处理 */
  prohibitedProcessing?: string;
  /** 禁止处理原因 */
  prohibitedProcessingReason?: string;
  /** 项目编码 */
  projectCode?: string;
  /** 实际交易额(不含税) */
  realTransactionAmount?: string;
  /** 参考单号 */
  refNo?: string;
  /** 销售运费 */
  salesFreightAmount?: string;
  /**
   * 发货时间
   * @format date-time
   */
  sendTime?: string;
  /** 服务号 */
  serviceCode?: string;
  /** 配送方式 */
  shippingCode?: string;
  /** 配送方式 */
  shippingDesc?: string;
  /** 唛头 */
  shippingMark?: string;
  /** 店铺账号 */
  shopAccount?: string;
  /** 站点 */
  site?: string;
  /**
   * 来源: 0-手动新增 1-模板导入 2-EDI生成
   * @format int32
   */
  source?: number;
  /** 来源: 0-手动新增 1-模板导入 2-EDI生成 */
  sourceDesc?: string;
  sourceId?: string;
  /** 承运商 */
  spCode?: string;
  /** 承运商名称 */
  spName?: string;
  /** 状态 */
  statusInfoList?: Record<string, object>[];
  /** 订单售价(不含税) */
  sumTotalPrice?: number;
  /** 总金额(含税) */
  taxAmount?: number;
  /** 实际交易额(含税) */
  taxRealTransactionAmount?: number;
  /** 交易额(含税) */
  taxTransactionAmount?: number;
  /** 总税费 */
  taxes?: number;
  /** 第三方出库单号 */
  thirdWarehouseCode?: string;
  /** 分摊总小费 */
  tipAmount?: number;
  /** 总体积 */
  totalVolume?: number;
  /** 总重量 */
  totalWeight?: number;
  /** 跟踪单号 */
  trackOrderCode?: string;
  /** 交易额(不含税) */
  transactionAmount?: string;
  /**
   * 0-红人发样 1-线下订单
   * @format int32
   */
  type?: number;
  /** @format date-time */
  updateAt?: string;
  /** 仓库编码 */
  warehouseCode?: string;
  /** 仓配系统仓配单号字段 */
  warehouseDeliveryCode?: string;
  /** 仓库 */
  warehouseDesc?: string;
  /** 运单号 */
  waybillNo?: string;
}

/** OrderBatchAuthReq */
export interface OrderBatchAuthReq {
  /**
   * 是否自动拆单 0-否 1-是
   * @format int32
   */
  autoSubOrder?: number;
  /** 附件列表 */
  orderAttachmentList?: OrderAttachmentInfo[];
  /** 订单号列表 */
  orderCodeList?: string[];
  /** 通过不通过 */
  pass?: boolean;
  /** 备注 */
  remark?: string;
}

/** OrderBatchAuthResp */
export interface OrderBatchAuthResp {
  /** 失败列表 */
  failList?: BatchAuthResult[];
  /** 成功列表 */
  successList?: BatchAuthResult[];
}

/** OrderBatchCommonReq */
export interface OrderBatchCommonReq {
  /** 编码集合 */
  codes?: string[];
}

/** OrderBatchCommonResp */
export interface OrderBatchCommonResp {
  /** 失败列表 */
  failList?: BatchResult[];
  /** 成功列表 */
  successList?: BatchResult[];
}

/** OrderBatchConfirmSendReq */
export interface OrderBatchConfirmSendReq {
  /** 订单号列表 */
  erpCodeList?: string[];
  /**
   * 订单类型: 0-红人发样单 1-线下订单 2-TT订单 3-内购 4-shopify
   * @format int32
   */
  type?: number;
}

/** OrderBatchFbaDetailResp */
export interface OrderBatchFbaDetailResp {
  /** 明细信息 */
  detailList?: Detail[];
}

/** OrderBatchFreezeReq */
export interface OrderBatchFreezeReq {
  /** ERP订单编码 */
  erpCodeList?: string[];
  /** 禁止原因 */
  reason?: string;
}

/** OrderBatchSendNoticeReq */
export interface OrderBatchSendNoticeReq {
  /** 提货单号 */
  billOfLadingNumber?: string;
  /** 订单号列表 */
  orderCodeList?: string[];
}

/** OrderBatchSendNoticeResp */
export interface OrderBatchSendNoticeResp {
  /** 失败列表 */
  failList?: BatchAuthResult[];
  /** 成功列表 */
  successList?: BatchAuthResult[];
}

/** OrderBatchSubReq */
export interface OrderBatchSubReq {
  /** Reference No */
  erpCodeList?: string[];
  /** 拆分类型 split_by_product-按产品拆分 split_by_out_of_stock */
  splitType?: string;
  /** 子拆分类型 按产品拆分子类型 each_product_num_split:每件产品拆分为一单（一单一件一个）相同产品拆为一单（一单一件多个） same_product_split每行产品拆为一单 per_line_one_order按照缺货拆分-缺货sku发货 oos_split_ship按照缺货拆分-缺货sku不发货 oos_split_not_ship */
  subSplitType?: string;
}

/** OrderBatchToAbondReq */
export interface OrderBatchToAbondReq {
  /** 订单号列表 */
  orderCodeList?: string[];
}

/** OrderBatchToAuditReq */
export interface OrderBatchToAuditReq {
  /** 订单号列表 */
  orderCodeList?: string[];
}

/** OrderBatchToFbaReq */
export interface OrderBatchToFbaReq {
  /** 详情 */
  detailList?: OrderBatchToFbaReqItemDetail[];
}

/** OrderBatchToFbaReqItem */
export interface OrderBatchToFbaReqItem {
  /**
   * id
   * @format int64
   */
  id?: number;
  /** sellerSku */
  sellerSku?: string;
}

/** OrderBatchToFbaReqItemDetail */
export interface OrderBatchToFbaReqItemDetail {
  /** erp订单号 */
  erpCode?: string;
  /** 明细 */
  itemList?: OrderBatchToFbaReqItem[];
  /** 买家省份 */
  province?: string;
  /** 服务等级 Standard-标准配送   Expedited-加急配送   Priority-优先配送 */
  serivceLevel?: string;
  /** 仓库编码 */
  warehouseCode?: string;
}

/** OrderBatchToWaitSendReq */
export interface OrderBatchToWaitSendReq {
  /** 订单号列表 */
  orderCodeList?: string[];
}

/** OrderBatchToWaitSendResp */
export interface OrderBatchToWaitSendResp {
  /** 失败列表 */
  failList?: BatchAuthResult[];
  /** 成功列表 */
  successList?: BatchAuthResult[];
}

/** OrderBatchTransferSelfReq */
export interface OrderBatchTransferSelfReq {
  /** erp订单编号 */
  erpCodeList?: string[];
  /**
   * 是否取消FBA配送 0-未取消转自配送 1-已取消转自配送
   * @format int32
   */
  isCancelShipped?: number;
  /** 物流方式 */
  shippingCode?: string;
  /** sp编码 */
  spCode?: string;
  /** 仓库编号 */
  warehouseCode?: string;
}

/** OrderBatchUpdateAuthReq */
export interface OrderBatchUpdateAuthReq {
  /**
   * 是否自动拆单 0-否 1-是
   * @format int32
   */
  autoSubOrder?: number;
  /** 上传地址名字 */
  fileName?: string;
  /** 绝对路径 */
  fileUrl?: string;
  /** 附件列表 */
  orderAttachmentList?: OrderAttachmentInfo[];
  /** 上传地址 */
  ossKey?: string;
  /** 通过不通过 */
  pass?: boolean;
  /** 备注 */
  remark?: string;
}

/** OrderBindingWarehouseAndShipReq */
export interface OrderBindingWarehouseAndShipReq {
  /**
   * 发货方法 1-FBA 2-中仓直发 3-海外仓直发
   * @format int32
   */
  deliveryType?: number;
  /**
   * 订单类型 0-红人发样单 1-线下订单 2-TT订单
   * @format int32
   */
  orderType?: number;
  warehouseShipList?: WarehouseShip[];
}

/** OrderChangeDetail */
export interface OrderChangeDetail {
  /** 国家编码 */
  countryCode?: string;
  /** 订单号 */
  erpCode?: string;
  /** 商品信息 */
  itemInfoList?: ItemInfo[];
  /** 维护人员 */
  maintainCode?: string;
}

/** OrderChangeDetail0 */
export interface OrderChangeDetail0 {
  /** 订单号 */
  erpCode?: string;
  /** 商品信息 */
  itemInfoList?: ItemInfo[];
}

/** OrderChangeSkuBatchToAuditResp */
export interface OrderChangeSkuBatchToAuditResp {
  /** 订单明细列表 */
  orderChangeDetailList?: OrderChangeDetail[];
}

/** OrderChangeSkuReq */
export interface OrderChangeSkuReq {
  /** 订单号 */
  code?: string;
  /** 商品明细 */
  itemBeanList?: MetaSampleOrderV3ItemBean[];
}

/** OrderCutAttBatchReq */
export interface OrderCutAttBatchReq {
  /** 仓配订单列表 */
  codeList?: string[];
}

/** OrderCutAttReq */
export interface OrderCutAttReq {
  /** 附件信息 */
  attachmentInfoList?: OrderAttachmentInfoReq[];
  /** 仓配订单号 */
  code?: string;
}

/** OrderDetailResp */
export interface OrderDetailResp {
  /** 审核日志 */
  authLogList?: AuthLogBean[];
  /** 审核信息 */
  authNodeList?: AuthNodeBean[];
  /** 基本信息 */
  baseInfo?: OrderBaseInfo;
  /** 客户信息 */
  customerInfoBean?: CustomerInfoBean;
  /** 基本信息 */
  flowBaseInfo?: ErpFlowBean;
  /** 商品信息 */
  itemInfoList?: ItemInfo[];
  /** 下一个审核节点 */
  nextAuthNode?: AuthNodeBean;
  /** 附件信息 */
  orderAttachmentList?: OrderAttachment[];
  orderCustomsRemarkList?: OrderRemark[];
  orderRemarkList?: OrderRemark[];
  /**
   * 是否指定装箱（附件），默认0 - 0-否 1-是
   * @format int32
   */
  packingAttachmentStatus?: number;
  /** 结算信息 */
  paymentTermsInfo?: PaymentTermsInfo;
  /** 原平台商品信息 */
  platformItemInfoList?: PlatformItemInfo[];
  /** 收货物信息 */
  receiveInfo?: ReceiveInfo;
}

/** OrderFreezeReq */
export interface OrderFreezeReq {
  /** ERP订单编码 */
  erpCode?: string;
  /** 禁止原因 */
  reason?: string;
}

/** OrderJjPickTaskReq */
export interface OrderJjPickTaskReq {
  deliveryCode?: string;
  /**
   * 页数
   * @format int32
   * @min 1
   * @exclusiveMin false
   */
  pageNum: number;
  /**
   * 每页数量
   * @format int32
   * @max 100
   * @exclusiveMax false
   */
  pageSize: number;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
}

/** OrderJjPickTaskResp */
export interface OrderJjPickTaskResp {
  code?: string;
  list?: JjPickTaskSync[];
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** OrderLabelBean */
export interface OrderLabelBean {
  /** 订单单号 */
  erpCode?: string;
  /** 标签编码 */
  labelCode?: string;
  /** 标签名称 */
  labelName?: string;
}

/** OrderListItem */
export interface OrderListItem {
  /** 总金额 */
  amount?: string;
  /** 区域 */
  area?: string;
  button?: Button;
  /** 买家地址 */
  buyerAddress?: string;
  /** 买家地址2 */
  buyerAddress2?: string;
  /** 买家自选物流 */
  buyerChooseLogistics?: string;
  /** 买家城市 */
  buyerCity?: string;
  /** 买家国家编码 */
  buyerCountryCode?: string;
  /** 买家国家 */
  buyerCountryDesc?: string;
  /** 买家邮箱 */
  buyerEmail?: string;
  /** 门牌号 */
  buyerHouseNumber?: string;
  /** 买家id */
  buyerId?: string;
  /** 买家手机 */
  buyerMobile?: string;
  /** 买家姓名 */
  buyerName?: string;
  /** 买家电话 */
  buyerPhone?: string;
  /** 买家省份 */
  buyerProvince?: string;
  /** 买家备注 */
  buyerRemark?: string;
  /** 买家街道 */
  buyerStreet?: string;
  /** 买家邮编 */
  buyerZipcode?: string;
  /** 渠道 */
  channel?: string;
  /** 佣金 */
  commission?: string;
  /**
   * 第三方-创建时间
   * @format date-time
   */
  createAt?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /** 创建人-编码 */
  creatorCode?: string;
  /** 币种 */
  currencyCode?: string;
  /** 客户编码 */
  customerCode?: string;
  /** 客户名称 */
  customerDesc?: string;
  /** 客服备注 */
  customerRemark?: string;
  /** 发货方法 */
  deliveryCode?: string;
  /** 发货方法 */
  deliveryDesc?: string;
  /**
   * 钉钉审核时间
   * @format date-time
   */
  dingAuthTime?: string;
  /** 钉钉备注 */
  dingRemark?: string;
  /** 折扣金额 */
  discountAmount?: string;
  /**
   * 易仓审核时间
   * @format date-time
   */
  ecAuthTime?: string;
  /** 订单号 路特生成 */
  erpCode?: string;
  /** 异常备注 */
  errorRemark?: string;
  /**
   * 预计到货时间
   * @format date-time
   */
  expectedArrivalTime?: string;
  /** 运费 */
  freightAmount?: string;
  /**
   * id
   * @format int64
   */
  id?: number;
  /** 商品明细 */
  itemBeanList?: MetaSampleOrderV3ItemBean[];
  /** 积加异常备注 */
  jjErrorRemark?: string;
  /** 标发状态 */
  markShippedStatus?: string;
  /** 标发状态名称 */
  markShippedStatusDesc?: string;
  /**
   * 标发时间
   * @format date-time
   */
  markShippedTime?: string;
  /** 红人账号 */
  metaAccount?: string;
  /**
   * 运营期望到货时间
   * @format date-time
   */
  operationExpectedArrivalTime?: string;
  /**
   * 运营期望到货时间-结束
   * @format date-time
   */
  operationExpectedArrivalTimeEnd?: string;
  /** 订单号 易仓 */
  orderCode?: string;
  /** 订单标签 */
  orderLabelList?: OrderLabelBean[];
  /** 订单销售类型选择，见枚举b2b_client_order_sale_type */
  orderSaleType?: string;
  /** 订单销售类型选择，见枚举b2b_client_order_sale_type */
  orderSaleTypeDesc?: string;
  /**
   * 订单状态 200-待发货审核 201-待钉钉审核,300-待发货,400-已发货 500-EC异常 501-钉钉审核失败异常 600-废弃
   * @format int32
   */
  orderSecondStatus?: number;
  /** 订单状态 200-待发货审核 201-待钉钉审核,300-待发货,400-已发货,600-废弃, 800-积加推送异常，900，积加异常 */
  orderSecondStatusDesc?: string;
  /**
   * 订单状态 200-待发货审核 201-待钉钉审核,300-待发货,400-已发货 500-EC异常 501-钉钉审核失败异常 600-废弃
   * @format int32
   */
  orderStatus?: number;
  /** 订单状态 200-待发货审核 201-待钉钉审核,300-待发货,400-已发货 500-EC异常 501-钉钉审核失败异常 600-废弃 */
  orderStatusDesc?: string;
  /**
   * os审核时间
   * @format date-time
   */
  osAuthTime?: string;
  /** 其他费用 */
  otherAmount?: number;
  /** 出库单号 */
  outboundCode?: string;
  /**
   * 付款时间
   * @format date-time
   */
  payTime?: string;
  pcode?: string;
  /**
   * 期望发货时间
   * @format date-time
   */
  platformExpectedSendTime?: string;
  /** 商品税额 */
  productTaxAmount?: number;
  /** 实际交易额 */
  realTransactionAmount?: string;
  /** 参考单号 */
  refNo?: string;
  /** 备注 */
  remark?: string;
  /** 订单备注 */
  remarkList?: ListOrderRemark[];
  /** 是否能重推fba */
  retrtFba?: boolean;
  /** 销售运费 */
  salesFreightAmount?: string;
  /**
   * 发货时间
   * @format date-time
   */
  sendTime?: string;
  /** 配送方式 */
  shippingCode?: string;
  /** 配送方式 */
  shippingDesc?: string;
  /** 卖家账号 */
  shopAccount?: string;
  /** 短地址 沙特阿拉伯使用 */
  shortAddress?: string;
  /** 签收时间 */
  signTime?: string;
  /** 站点 */
  site?: string;
  /**
   * 来源: 0-手动新增 1-模板导入 2-EDI生成
   * @format int32
   */
  source?: number;
  /** 来源: 0-手动新增 1-模板导入 2-EDI生成 */
  sourceDesc?: string;
  /** 承运商 */
  spCode?: string;
  /** 承运商名称 */
  spName?: string;
  /** 是否SPS EDI WM客户（SPS EDI WM单有效） */
  spsSendNoticeCustomer?: boolean;
  /** 配送方式是否快递（SPS EDI WM单有效） */
  spsShipCodeExpress?: boolean;
  /** 订单售价(不含税) */
  sumTotalPrice?: number;
  /** 系统备注 */
  systemRemark?: string;
  /** 总金额(含税) */
  taxAmount?: number;
  /** 税号 */
  taxId?: string;
  /** 实际交易额(含税) */
  taxRealTransactionAmount?: number;
  /** 交易额(含税) */
  taxTransactionAmount?: number;
  /** 总税费 */
  taxes?: number;
  /** 分摊总小费 */
  tipAmount?: number;
  /** 总体积 */
  totalVolume?: number;
  /** 总重量 */
  totalWeight?: number;
  /** 跟踪单号 */
  trackOrderCode?: string;
  /** 跟踪单号 */
  trackOrderCodeUrl?: string;
  /** 交易额 */
  transactionAmount?: string;
  /** @format date-time */
  updateAt?: string;
  /**
   * 标发更新状态：空为未更新，1为已更新
   * @format int32
   */
  updateMarkShipped?: number;
  /** 修改人 */
  updator?: string;
  /** 修改人-编码 */
  updatorCode?: string;
  /** 待审核人 */
  waitAuditOperatorList?: string[];
  /** 仓库编号 */
  warehouseCode?: string;
  /** 仓配系统仓配单号字段 */
  warehouseDeliveryCode?: string;
  /** 仓库 */
  warehouseDesc?: string;
  /** 运单号 */
  waybillNo?: string;
}

/** OrderListQueryResp */
export interface OrderListQueryResp {
  code?: string;
  errorStatusCountMap?: Record<string, number>;
  markShippedStatusStatistics?: MarkShippedStatusStatistics;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  recordList?: OrderListItem[];
  statusStatistics?: OrderListStatusStatistics;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** OrderListStatusStatistics */
export interface OrderListStatusStatistics {
  /** @format int32 */
  abandon?: number;
  /** @format int32 */
  all?: number;
  /** @format int32 */
  completed?: number;
  /** @format int32 */
  confirmed?: number;
  /** @format int32 */
  error?: number;
  /** @format int32 */
  pendingConfirm?: number;
  /** @format int32 */
  pendingPickOutbound?: number;
  /** @format int32 */
  transferInTransit?: number;
}

/** OrderMarkDeliveryReq */
export interface OrderMarkDeliveryReq {
  /** 销售出库单号 */
  code: string;
  /** 三方仓单号 */
  outboundCode: string;
}

/** OrderPreCheckStock */
export interface OrderPreCheckStock {
  /**
   * 可用库存-ERP
   * @format int32
   */
  availableStock?: number;
  /**
   * 订单创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /** 创建人名称 */
  creatorName?: string;
  /** 客户编码 */
  customerCode?: string;
  /** 客户名称 */
  customerName?: string;
  /** 订单号 */
  erpCode?: string;
  /** 是否超出可用量 */
  exceedAvailable?: boolean;
  /**
   * 积加可用库存
   * @format int32
   */
  jijiaAvailableStock?: number;
  /**
   * 数量
   * @format int32
   */
  num?: number;
  /**
   * 已提交
   * @format int32
   */
  submittedQty?: number;
  /** 供应链SKU */
  supplySku?: string;
  /**
   * 未提交
   * @format int32
   */
  unSubmittedQty?: number;
  /** 发货仓 */
  warehouseCode?: string;
  /** 发货仓描述 */
  warehouseDesc?: string;
}

/** OrderPreCheckStockReq */
export interface OrderPreCheckStockReq {
  /** 订单号列表 */
  orderCodeList?: string[];
}

/** OrderPreCheckStockResp */
export interface OrderPreCheckStockResp {
  /** 订单详情 */
  recordList?: OrderPreCheckStock[];
}

/** OrderPushGuBaseInfo */
export interface OrderPushGuBaseInfo {
  /** 仓配订单编码 */
  code?: string;
  /** 销售订单编码 */
  erpCode?: string;
  /**
   * 谷仓是否贴标(0-否 1-是)
   * @format int32
   */
  guChangeLabel?: number;
  /**
   * 谷仓换标要求:1-外箱 2-内箱
   * @format int32
   */
  guChangeLabelReplacementOption?: number;
  /** 商品信息 */
  itemInfoList?: OrderPushGuItem[];
}

/** OrderPushGuItem */
export interface OrderPushGuItem {
  /** fn_sku */
  fnSku?: string;
  /**
   * id
   * @format int64
   */
  id?: number;
  /**
   * 换标数量
   * @format int32
   */
  labelNum?: number;
  /**
   * 内件货物总数量
   * @format int32
   */
  labelReplacementQty?: number;
}

/** OrderPushGuReq */
export interface OrderPushGuReq {
  /** 仓配订单推送谷仓列表 */
  pushDetailList?: OrderPushGuBaseInfo[];
}

/** OrderQueryStockAvailable */
export interface OrderQueryStockAvailable {
  /**
   * 可用库存-ERP
   * @format int32
   */
  availableStock?: number;
  /**
   * 积加可用库存
   * @format int32
   */
  jijiaAvailableStock?: number;
  /**
   * 已提交
   * @format int32
   */
  submittedQty?: number;
  /** 供应链SKU */
  supplySku?: string;
  /** 发货仓 */
  warehouseCode?: string;
  /** 发货仓描述 */
  warehouseDesc?: string;
}

/** OrderQueryStockAvailableReq */
export interface OrderQueryStockAvailableReq {
  /** 供应链SKU */
  supplySkuList?: string[];
  /** 仓库编码 */
  warehouseCode?: string;
}

/** OrderQueryStockAvailableResp */
export interface OrderQueryStockAvailableResp {
  /** 可用库存量 */
  recordList?: OrderQueryStockAvailable[];
}

/** OrderReceiveInfoSaveReq */
export interface OrderReceiveInfoSaveReq {
  /** 买家地址 */
  address?: string;
  /** 买家地址2 */
  address2?: string;
  /** 区域 */
  area?: string;
  /** 买家城市 */
  city?: string;
  /** 买家国家编码 */
  countryCode?: string;
  /** 买家国家 */
  countryDesc?: string;
  /** 买家邮箱 */
  email?: string;
  /** erp订单号 */
  erpCode?: string;
  /** 门牌号 */
  houseNumber?: string;
  /** 手机号 */
  mobilePhone?: string;
  /** 买家姓名 */
  name?: string;
  /** 买家电话 */
  phone?: string;
  /** 买家省份 */
  province?: string;
  /** 短地址 沙特阿拉伯使用 */
  shortAddress?: string;
  /** 街道 */
  street?: string;
  /** 税号 */
  taxId?: string;
  /** 买家邮编 */
  zipcode?: string;
}

/** OrderRemark */
export interface OrderRemark {
  /** 头像 */
  avatar?: string;
  /**
   * id
   * @format int64
   */
  id?: number;
  /** 操作人 */
  operator?: string;
  /** 备注 */
  remark?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** OrderRemarkReq */
export interface OrderRemarkReq {
  /** 客服备注 */
  customRemark?: string;
  /** erp订单号 */
  erpCode?: string;
  /** 是否shopify订单 */
  isShopify?: boolean;
}

/** OrderRemarkSaveReq */
export interface OrderRemarkSaveReq {
  /** 批量备注erpCode */
  erpCodes?: string[];
  /** 备注 */
  remark: string;
}

/** OrderSalesOutboundReq */
export interface OrderSalesOutboundReq {
  deliveryCode?: string;
  orderCode?: string;
  /**
   * 页数
   * @format int32
   * @min 1
   * @exclusiveMin false
   */
  pageNum: number;
  /**
   * 每页数量
   * @format int32
   * @max 100
   * @exclusiveMax false
   */
  pageSize: number;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
}

/** OrderSalesOutboundResp */
export interface OrderSalesOutboundResp {
  code?: string;
  list?: SalesOutboundOrder[];
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** OrderSaveBaseInfo */
export interface OrderSaveBaseInfo {
  /**
   * 是否自动拆单 0-否 1-是
   * @format int32
   */
  autoSubOrder?: number;
  /** 渠道 */
  channel?: string;
  /**
   * 是否COD 0-否 1-是
   * @format int32
   */
  cod?: number;
  /** 商品贴标url */
  commodityLabelingUrl?: string;
  /**
   * 平台-创建时间
   * @format date-time
   */
  createAt?: string;
  /** 订单创建人 */
  creator?: string;
  /** 币种编码 */
  currencyCode?: string;
  /** 客服备注 */
  customRemark?: string;
  /**
   * 交货方式 0-FOB 1-DDB
   * @format int32
   */
  deliverType?: number;
  /** 钉钉审核备注 */
  dingRemark?: string;
  /** 折扣金额 */
  discountAmount?: number;
  /** Reference No */
  erpCode?: string;
  /** 运费 */
  freightAmount?: number;
  /** 运费规则code */
  freightAmountRuleCode?: string;
  /** 物流URL */
  logisticsUrl?: string;
  /** 标发状态 */
  markShippedStatus?: string;
  /**
   * 运营期望到货时间-开始
   * @format date-time
   */
  operationExpectedArrivalTime?: string;
  /**
   * 运营期望到货时间-结束
   * @format date-time
   */
  operationExpectedArrivalTimeEnd?: string;
  /** 订单销售类型选择，见枚举b2b_client_order_sale_type */
  orderSaleType?: string;
  /**
   * 付款时间
   * @format date-time
   */
  payTime?: string;
  /**
   * 期望发货时间
   * @format date-time
   */
  platformExpectedSendTime?: string;
  /** 合作项目编码 */
  projectCode?: string;
  /** 参考单号 */
  refNo?: string;
  /** 备注不能为空 */
  remark?: string;
  /** 销售运费 */
  salesFreightAmount?: number;
  /** 配送方式code */
  shippingCode?: string;
  /** 唛头 */
  shippingMark?: string;
  /** 店铺账号 */
  shopAccount?: string;
  /**
   * 来源: 0-手动新增 1-模板导入 2-EDI生成
   * @format int32
   */
  source?: number;
  sourceId?: string;
  /** 来源订单信息 */
  sourceOrderInfo?: string;
  /** 承运商 */
  spCode?: string;
  /** 商品税费 */
  taxes?: number;
  /** 小费 */
  tipAmount?: number;
  /** 订单总重量 */
  totalAmount?: number;
  /**
   * 订单类型: 1-线下订单
   * @format int32
   */
  type?: number;
  /**
   * 平台-更新时间
   * @format date-time
   */
  updateAt?: string;
  /** 仓库编码 */
  warehouseCode?: string;
  /** 新仓库编码 */
  warehouseCodeNew?: string;
}

/** OrderSaveItemInfo */
export interface OrderSaveItemInfo {
  /** 佣金 */
  commission?: number;
  /** 发货方式code 发货方法 1-FBA 2-中仓直发 3-海外仓直发 */
  deliveryCode?: string;
  /** 折扣金额 */
  discountAmount?: number;
  /** 额外信息 */
  extraInfo?: string;
  /** 运费 */
  freightAmount?: number;
  /**
   * 是否是赠品，0是否，1=是
   * @format int32
   */
  gift?: number;
  /**
   * 商品ID
   * @format int64
   */
  id?: number;
  /**
   * 库存数
   * @format int32
   */
  inventory?: number;
  /** 商品ID */
  itemId?: string;
  /**
   * 发货数量
   * @format int32
   */
  num?: number;
  /** 单价 */
  price?: number;
  /** 买家运费 */
  salesFreightAmount?: number;
  /** 卖家SKU */
  sellerSku?: string;
  /** 配送方式code */
  shippingCode?: string;
  /** 商品SKUcode */
  skuCode?: string;
  /**
   * sku类型 0-单商品 1-组合商品 3套装
   * @format int32
   */
  skuType?: number;
  /** sourceItemId */
  sourceItemId?: string;
  /** 占比数量情况，如组合品，每个明细的数量情况 */
  sourceProportion?: string;
  /** spCode */
  spCode?: string;
  /** 供应链SKU */
  supplySku?: string;
  /** 商品税费 */
  taxes?: number;
  /** 分摊总小费 */
  tipAmount?: number;
  /**
   * 单位: 0-件 1-箱
   * @format int32
   */
  unit?: number;
  /** 单位编码 */
  unitCode?: string;
  /** upc */
  upc?: string;
  /** 仓库编码 */
  warehouseCode?: string;
  /** 新仓库编码 */
  warehouseCodeNew?: string;
}

/** OrderSaveReceiveInfo */
export interface OrderSaveReceiveInfo {
  /** 买家地址 */
  address?: string;
  /** 买家地址2 */
  address2?: string;
  /** 区域 */
  area?: string;
  /** 买家备注 */
  buyerRemark?: string;
  /** 买家城市 */
  city?: string;
  /** 合同签约主体 */
  contractSubject?: string;
  /** 买家国家编码 */
  countryCode?: string;
  /** 客户编码 */
  customerCode?: string;
  /** 买家邮箱 */
  email?: string;
  /** 门牌号 */
  houseNumber?: string;
  /** 买家姓名 */
  name?: string;
  /** 买家电话 */
  phone?: string;
  /** 买家省份 */
  province?: string;
  /** 红人账号 */
  userCode?: string;
  /** 买家邮编 */
  zipcode?: string;
}

/** OrderSaveReq */
export interface OrderSaveReq {
  /** 基本信息 */
  baseInfo?: OrderSaveBaseInfo;
  /** 商品信息 */
  itemInfoList?: OrderSaveItemInfo[];
  /** 附件信息(附件) */
  orderAttachmentList?: OrderAttachmentInfo[];
  /**
   * 是否指定装箱（附件） - 0-否 1-是
   * @format int32
   */
  packingAttachmentStatus?: number;
  /** 结算信息 */
  paymentTermsInfo?: PaymentTermsInfo;
  /** 收获信息 */
  receiveInfo?: OrderSaveReceiveInfo;
  /** 是否提交 */
  submit?: boolean;
}

/** OrderSubItemInfo */
export interface OrderSubItemInfo {
  /** @format int64 */
  bindingId?: number;
  /** 佣金 */
  commission?: number;
  /** 发货方式code */
  deliveryCode?: string;
  /** 折扣金额 */
  discountAmount?: number;
  ean?: string;
  /** 扩展信息 */
  extraInfo?: string;
  /** 运费 */
  freightAmount?: number;
  /** @format int32 */
  gift?: number;
  /**
   * 商品ID
   * @format int64
   */
  id?: number;
  /**
   * 库存数
   * @format int32
   */
  inventory?: number;
  itemId?: string;
  /**
   * 发货数量
   * @format int32
   */
  num?: number;
  /** 单价 */
  price?: number;
  /** 买家运费 */
  salesFreightAmount?: number;
  /** 销售SKU */
  sellerSku?: string;
  /** 配送方式code */
  shippingCode?: string;
  /** 商品SKUcode */
  skuCode?: string;
  /**
   * sku类型 0-单商品 1-组合商品 3套装
   * @format int32
   */
  skuType?: number;
  sourceItemId?: string;
  /** 占比数量情况，如组合品，每个明细的数量情况 */
  sourceProportion?: string;
  /** spCode */
  spCode?: string;
  /** 供应链SKU */
  supplySku?: string;
  /** 税率 */
  taxRate?: number;
  /** 商品税费 */
  taxes?: number;
  /** 分摊总小费 */
  tipAmount?: number;
  upc?: string;
  volume?: number;
  /** 仓库编码 */
  warehouseCode?: string;
  weight?: number;
}

/** OrderSubReq */
export interface OrderSubReq {
  /** Reference No */
  erpCode?: string;
  /** 商品信息 */
  itemInfoList?: OrderSubItemInfo[][];
}

/** OrderTransferFbaBatchV2Req */
export interface OrderTransferFbaBatchV2Req {
  /** erp订单编号 */
  erpCodeList?: string[];
  /** 转商品明细 */
  items?: OrderTransferFbaItemV2Req[];
  /** 配送速度  standard  expedited priority */
  serviceLevel?: string;
  /** 店铺账号 */
  shopAccount?: string;
  /** 仓库编码 */
  warehouseCode?: string;
}

/** OrderTransferFbaItemReq */
export interface OrderTransferFbaItemReq {
  /** asin */
  asin?: string;
  /** erp商品编号 */
  erpCode?: string;
  /** msku */
  msku?: string;
  /**
   * erp订单明细编号,不能为空
   * @format int64
   */
  orderItemId?: number;
  /**
   * 数量
   * @format int32
   */
  quantity?: number;
  /** 供应商sku */
  supplySku?: string;
}

/** OrderTransferFbaItemV2Req */
export interface OrderTransferFbaItemV2Req {
  /** asin */
  asin?: string;
  /** msku */
  msku?: string;
  /**
   * 数量
   * @format int32
   */
  quantity?: number;
  /** 供应商sku */
  supplySku?: string;
}

/** OrderTransferFbaReq */
export interface OrderTransferFbaReq {
  /** 详细地址1 */
  address1?: string;
  /** 详细地址2 */
  address2?: string;
  /** 区域 */
  area?: string;
  /** 城市 */
  city?: string;
  /** 国家代码 */
  countryCode?: string;
  /** 收货人邮箱 */
  email?: string;
  /** erp订单编号 */
  erpCode?: string;
  /** 转商品明细 */
  items?: OrderTransferFbaItemReq[];
  /** 收货人信息 */
  name?: string;
  /** 收货人电话 */
  phone?: string;
  /** 省份 */
  province?: string;
  /** 配送速度  standard  expedited priority */
  serviceLevel?: string;
  /** 店铺账号 */
  shopAccount?: string;
  /** 仓库编号 */
  warehouseCode?: string;
  /** 邮编 */
  zipCode?: string;
}

/** OrderTransferSelfReq */
export interface OrderTransferSelfReq {
  /** erp订单编号 */
  erpCode?: string;
  /**
   * 是否取消FBA配送 0-未取消转自配送 1-已取消转自配送
   * @format int32
   */
  isCancelShipped?: number;
  /** 物流方式 */
  shippingCode?: string;
  /** sp编码 */
  spCode?: string;
  /** 仓库编号 */
  warehouseCode?: string;
}

/** OrderUpdateMskuResp */
export interface OrderUpdateMskuResp {
  /** 失败列表 */
  failList?: BatchUpdateMskuResult[];
  /** 成功列表 */
  successList?: BatchUpdateMskuResult[];
}

/** OrderUpdateTabelReq */
export interface OrderUpdateTabelReq {
  /** 编码 */
  erpCode?: string;
  /** module */
  module?: string;
  /** 标签 */
  tabelList?: ErpOrderLabelBean[];
}

/** OrderUpdateUploadReq */
export interface OrderUpdateUploadReq {
  /** 附件信息 */
  attachmentInfoList?: OrderAttachmentInfoReq[];
  /** 订单号列表 */
  orderCodeList?: string[];
}

/** OrderUploadAttachmentReq */
export interface OrderUploadAttachmentReq {
  /** 附件信息 */
  attachmentList?: UploadAttachmentBean[];
  /** 单号 */
  code?: string;
}

/** OrderWarehouseLogisticsUpdateReq */
export interface OrderWarehouseLogisticsUpdateReq {
  /** erp订单号 */
  erpCodeList?: string[];
  /** 物流渠道 */
  shippingCode?: string;
  /** 物流商 */
  spCode?: string;
  /** 发货仓库 */
  warehouseCode?: string;
}

/** OtherInboundOrderAddReq */
export interface OtherInboundOrderAddReq {
  /** 创建人账号 */
  createBy?: string;
  /** 库存类型：良品出库、次品出库 */
  inventoryType?: string;
  /** 明细 */
  itemList: OtherInboundOrderItemAddReq[];
  /** 操作类型 */
  operationType?: string;
  /**
   * 是否需要质检，1=是，0=否
   * @format int32
   */
  qualityInspection?: number;
  /** 备注 */
  remark?: string;
  /** 来源单号 */
  sourceCode?: string;
  /** 仓库 */
  warehouseCode?: string;
}

/** OtherInboundOrderDetailItemReq */
export interface OtherInboundOrderDetailItemReq {
  /**
   * 箱数
   * @format int32
   */
  boxes?: number;
  /**
   * id
   * @format int64
   */
  id?: number;
  /**
   * 入库次品量
   * @format int32
   */
  inboundDefectiveQuantity?: number;
  /**
   * 入库良品量
   * @format int32
   */
  inboundGoodQuantity?: number;
  /** 出库单单号 */
  inboundOrderCode?: string;
  /** 序号 */
  lineNumber?: string;
  /** 库存池编号 */
  poolCode?: string;
  /** 产品名称 */
  productName?: string;
  /** 备注 */
  remark?: string;
  /** sku编号 */
  skuCode?: string;
  /** 供应链SKU */
  supplySku?: string;
}

/** OtherInboundOrderDetailReq */
export interface OtherInboundOrderDetailReq {
  /** 入库单号 */
  code?: string;
  createBy?: string;
  createName?: string;
  /**
   * id
   * @format int64
   */
  id?: number;
  /** 入库人 */
  inboundOperator?: string;
  /**
   * 入库时间
   * @format date-time
   */
  inboundTime?: string;
  /** 库存类型：良品出库、次品出库 */
  inventoryType?: string;
  inventoryTypeName?: string;
  /** 明细 */
  itemList: OtherInboundOrderDetailItemReq[];
  /** 操作类型 */
  operationType?: string;
  operationTypeName?: string;
  /**
   * 是否需要质检，1=是，0=否
   * @format int32
   */
  qualityInspection?: number;
  /** 备注 */
  remark?: string;
  /** 来源单号 */
  sourceCode?: string;
  /** 状态：待出库、已完成、异常、废弃 */
  status?: string;
  statusName?: string;
  /** 仓库 */
  warehouseCode?: string;
  warehouseName?: string;
}

/** OtherInboundOrderItemAddReq */
export interface OtherInboundOrderItemAddReq {
  /**
   * 箱数
   * @format int32
   */
  boxes?: number;
  /**
   * 入库次品量
   * @format int32
   */
  inboundDefectiveQuantity?: number;
  /**
   * 入库良品量
   * @format int32
   */
  inboundGoodQuantity?: number;
  /** 库存池编号 */
  poolCode?: string;
  /** 产品名称 */
  productName?: string;
  /** 备注 */
  remark?: string;
  /** sku编号 */
  skuCode?: string;
  /** 供应链SKU */
  supplySku?: string;
}

/** OtherInboundOrderListBean */
export interface OtherInboundOrderListBean {
  code?: string;
  createBy?: string;
  createName?: string;
  createTime?: string;
  /** @format int64 */
  id?: number;
  inboundOperatorId?: string;
  inboundOperatorName?: string;
  inboundTime?: string;
  inventoryType?: string;
  inventoryTypeName?: string;
  jjPushFailureReason?: string;
  jjPushStatusDesc?: string;
  operationType?: string;
  operationTypeName?: string;
  pushFailureReason?: string;
  pushStatusDesc?: string;
  status?: string;
  statusName?: string;
  warehouseCode?: string;
  warehouseName?: string;
}

/** OtherInboundOrderListReq */
export interface OtherInboundOrderListReq {
  /** 入库单单号 */
  code?: string;
  /** 创建人账号 */
  createBy?: string;
  /** 创建结束时间 */
  createTimeEnd?: string;
  /** 创建开始时间 */
  createTimeStart?: string;
  /** 入库结束时间 */
  inboundTimeEnd?: string;
  /** 入库开始时间 */
  inboundTimeStart?: string;
  /** 操作类型 */
  operationType?: string;
  /**
   * 页数
   * @format int32
   * @min 1
   * @exclusiveMin false
   */
  pageNum: number;
  /**
   * 每页数量
   * @format int32
   * @max 100
   * @exclusiveMax false
   */
  pageSize: number;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 状态：0待出库、1已完成、2异常、3废弃 */
  status?: string;
  /** 仓库 */
  warehouseCode?: string;
}

/** OtherInboundOrderListResp */
export interface OtherInboundOrderListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  recordList?: OtherInboundOrderListBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** OtherOutboundOrderAddReq */
export interface OtherOutboundOrderAddReq {
  /** 创建人账号 */
  createBy?: string;
  /** 库存类型：良品出库、次品出库 */
  inventoryType?: string;
  /** 明细 */
  itemList: OtherOutboundOrderItemAddReq[];
  /** 操作类型：  a. 透明标等物料类（无成本）   b. 赠送 */
  operationType?: string;
  /** 出库方式：默认:先进先出 */
  outboundMethod?: string;
  /** 备注 */
  remark?: string;
  /** 仓库 */
  warehouseCode?: string;
}

/** OtherOutboundOrderDetailItemReq */
export interface OtherOutboundOrderDetailItemReq {
  /**
   * 可用次品量
   * @format int32
   */
  defectiveQuantity?: number;
  /**
   * 可用良品量
   * @format int32
   */
  goodQuantity?: number;
  /**
   * id
   * @format int64
   */
  id?: number;
  /** 序号 */
  lineNumber?: string;
  /**
   * 出库次品量
   * @format int32
   */
  outboundDefectiveQuantity?: number;
  /**
   * 出库良品量
   * @format int32
   */
  outboundGoodQuantity?: number;
  /** 出库单单号 */
  outboundOrderCode?: string;
  /** 库存池编号 */
  poolCode?: string;
  /** 产品名称 */
  productName?: string;
  /** 备注 */
  remark?: string;
  /** sku编号 */
  skuCode?: string;
  /** 供应链SKU */
  supplySku?: string;
}

/** OtherOutboundOrderDetailReq */
export interface OtherOutboundOrderDetailReq {
  /** 入库单号 */
  code?: string;
  createBy?: string;
  createName?: string;
  /**
   * id
   * @format int64
   */
  id?: number;
  /** 库存类型：良品出库、次品出库 */
  inventoryType?: string;
  inventoryTypeName?: string;
  /** 明细 */
  itemList: OtherOutboundOrderDetailItemReq[];
  /** 操作类型：  a. 透明标等物料类（无成本）   b. 赠送 */
  operationType?: string;
  operationTypeName?: string;
  /** 出库方式：默认:先进先出 */
  outboundMethod?: string;
  outboundMethodName?: string;
  /** 出库人 */
  outboundOperator?: string;
  /**
   * 出库时间
   * @format date-time
   */
  outboundTime?: string;
  /** 备注 */
  remark?: string;
  /** 状态：待出库、已完成、异常、废弃 */
  status?: string;
  statusName?: string;
  /** 仓库 */
  warehouseCode?: string;
  warehouseName?: string;
}

/** OtherOutboundOrderItemAddReq */
export interface OtherOutboundOrderItemAddReq {
  /**
   * 可用次品量
   * @format int32
   */
  defectiveQuantity?: number;
  /**
   * 可用良品量
   * @format int32
   */
  goodQuantity?: number;
  /**
   * 出库次品量
   * @format int32
   */
  outboundDefectiveQuantity?: number;
  /**
   * 出库良品量
   * @format int32
   */
  outboundGoodQuantity?: number;
  /** 库存池编号 */
  poolCode?: string;
  /** 产品名称 */
  productName?: string;
  /** 备注 */
  remark?: string;
  /** sku编号 */
  skuCode?: string;
  /** 供应链SKU */
  supplySku?: string;
}

/** OtherOutboundOrderListBean */
export interface OtherOutboundOrderListBean {
  code?: string;
  createBy?: string;
  createName?: string;
  createTime?: string;
  /** @format int64 */
  id?: number;
  inventoryType?: string;
  inventoryTypeName?: string;
  jjPushFailureReason?: string;
  jjPushStatusDesc?: string;
  operationType?: string;
  operationTypeName?: string;
  outboundMethod?: string;
  outboundMethodName?: string;
  outboundOperatorId?: string;
  outboundOperatorName?: string;
  outboundTime?: string;
  pushFailureReason?: string;
  pushStatusDesc?: string;
  status?: string;
  statusName?: string;
  warehouseCode?: string;
  warehouseName?: string;
}

/** OtherOutboundOrderListReq */
export interface OtherOutboundOrderListReq {
  /** 出库单单号 */
  code?: string;
  /** 创建人账号 */
  createBy?: string;
  /** 创建结束时间 */
  createTimeEnd?: string;
  /** 创建开始时间 */
  createTimeStart?: string;
  /** 操作类型 */
  operationType?: string;
  /** 出库结束时间 */
  outboundTimeEnd?: string;
  /** 出库开始时间 */
  outboundTimeStart?: string;
  /**
   * 页数
   * @format int32
   * @min 1
   * @exclusiveMin false
   */
  pageNum: number;
  /**
   * 每页数量
   * @format int32
   * @max 100
   * @exclusiveMax false
   */
  pageSize: number;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 状态 1-启用 0-禁用 */
  status?: string;
  /** 仓库 */
  warehouseCode?: string;
}

/** OtherOutboundOrderListResp */
export interface OtherOutboundOrderListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  recordList?: OtherOutboundOrderListBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** PackageLineReq */
export interface PackageLineReq {
  /** 客户sku编码 */
  customerSkuCode?: string;
  /** 是否混箱 */
  mixBox?: 'N' | 'Y';
  /** 客户sku(英文) */
  productNameEn?: string;
  /** 供应链SKU */
  productSku: string;
  /**
   * 数量
   * @format int32
   */
  quantity?: number;
}

/** PackageLineRes */
export interface PackageLineRes {
  /** 客户sku编码 */
  customerSkuCode?: string;
  /** 产品名称 */
  productName?: string;
  /** 客户sku名称（英文） */
  productNameEn?: string;
  /** 商品SKU */
  productSku?: string;
  /**
   * 整箱数，为0表示没有配置整箱数
   * @format int32
   */
  qtyBox?: number;
  /**
   * 数量
   * @format int32
   */
  quantity?: number;
}

/** PackingLineList */
export interface PackingLineList {
  /** 商品SKU */
  productSku?: string;
  /**
   * 数量
   * @format int32
   */
  quantity?: number;
}

/** ParseResult */
export interface ParseResult {
  /** 错误信息 */
  errorMsg?: string;
  /** 上传的文件 */
  file?: UploadReq;
  /** 关联sku */
  productSku?: string;
  /**
   * sku数量
   * @format int32
   */
  qty?: number;
  /** 箱唛号 */
  ssc?: string;
}

/** PaymentTermsInfo */
export interface PaymentTermsInfo {
  /** 合同签约主体 */
  contractSubject?: string;
  /** 付款条款编码 */
  paymentTermsCode?: string;
  /** 付款条款名称 */
  paymentTermsDesc?: string;
  /**
   * 结算方式
   * @format int32
   */
  settlementMethod?: number;
  /** 结算方式名称 */
  settlementMethodDesc?: string;
  /**
   * 结算周期
   * @format int32
   */
  settlementPeriod?: number;
}

/** PlanDeliveryBillAddressBean */
export interface PlanDeliveryBillAddressBean {
  /** 地址 */
  address?: string;
  /** 公司名称 */
  companyName?: string;
  /** 联系方式 */
  contactWay?: string;
  /** 联系人 */
  contacts?: string;
  /**
   * 类型：0-送货信息 1-收货信息
   * @format int32
   */
  type?: number;
}

/** PlanDeliveryBillDetailResp */
export interface PlanDeliveryBillDetailResp {
  /** 基本信息 */
  baseInfo?: DbBaseInfo;
  /** 送货信息 */
  fromInfo?: PlanDeliveryBillAddressBean;
  /** 明细 */
  itemInfoList?: DbItemInfo[];
  /** 收货信息 */
  toInfo?: PlanDeliveryBillAddressBean;
}

/** PlatformItemInfo */
export interface PlatformItemInfo {
  /** msku */
  msku?: string;
  /**
   * num
   * @format int32
   */
  num?: number;
  /** 采购单位 */
  purchasePrice?: number;
  /** 单位 */
  unit?: string;
  /** UPC编码 */
  upcCode?: string;
}

/** ProductInfoBean */
export interface ProductInfoBean {
  /** 币种 */
  currency?: string;
  /** 中文品名 */
  declareCnName?: string;
  /** 英文品名 */
  declareEnName?: string;
  /** 价格 */
  declarePrice?: number;
  /**
   * 数量
   * @format int32
   */
  declareQuantity?: number;
  /** 附件url */
  extraInfo?: string;
  /** 文件名称 */
  fileName?: string;
  /** 产品高度cm */
  height?: number;
  /** 海关编码 */
  hsCode?: string;
  /** 清关税率 */
  hsTariffRate?: number;
  /**
   * 申报信息主键id
   * @format int64
   */
  id?: number;
  /** 产品长度cm */
  length?: number;
  /** 产品名称 */
  productName?: string;
  /** 备注 */
  remark?: string;
  /** 产品sku */
  skuCode?: string;
  /** 特殊属性 */
  specialAttributes?: string;
  /** 特殊属性-文本描述 */
  specialAttributesName?: string;
  /** 净重 */
  weight?: number;
  /** 产品宽度cm */
  width?: number;
}

/** ProductSkuStockBean */
export interface ProductSkuStockBean {
  /**
   * 海外仓可用库存
   * @format int32
   */
  overseasInventory?: number;
  /** 图片 */
  productImageUrl?: string;
  /** 商品名称中文 */
  productTitle?: string;
  /** 商品名称英文 */
  productTitleEn?: string;
  /** 报价 */
  quotePrice?: number;
  /**
   * 自营仓可用库存
   * @format int32
   */
  selfInventory?: number;
  /** 产品sku */
  skuCode?: string;
  /** 建议售价 */
  suggestPrice?: number;
}

/** ProductSkuStockQueryReq */
export interface ProductSkuStockQueryReq {
  /** 客户编码 */
  customerCode?: string;
  /** 关键词 */
  keyWord?: string;
  /**
   * 页数
   * @format int32
   * @min 1
   * @exclusiveMin false
   */
  pageNum: number;
  /**
   * 每页数量
   * @format int32
   * @max 100
   * @exclusiveMax false
   */
  pageSize: number;
  /** 商品名称 */
  productName?: string;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 业务人员编码 */
  salesmanCode?: string;
  /**
   * 共享（0-全部（个人+共享） 1-共享 2-个人，默认0）
   * @format int32
   */
  share?: number;
  /** sku列表 */
  skuCodes?: string;
  /** 供应链sku列表 */
  supplySkuCodes?: string;
}

/** ProductSkuStockQueryResp */
export interface ProductSkuStockQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 列表 */
  skuStockList?: ProductSkuStockBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** PurchaseOrderReq */
export interface PurchaseOrderReq {
  /** @format int32 */
  accountType?: number;
  auditStatus?: string;
  code: string;
  company?: string;
  companyCode?: string;
  companyName?: string;
  createBy?: string;
  /** @format date-time */
  createTime?: string;
  currency?: string;
  /** @format int32 */
  deliveryStatus?: number;
  /** @format int32 */
  deliveryType?: number;
  /** 明细 */
  detail: PurchaseOrderReqItem[];
  ecEntryCode?: string;
  ecPoCode?: string;
  esignFinalStatus?: string;
  esignStartStatus?: string;
  /** @format date-time */
  estimatedArrivalTime?: string;
  freight?: number;
  isEsign?: string;
  jjEntryCode?: string;
  jjPoCode?: string;
  logicalWarehouse?: string;
  merchandiser?: string;
  /** @format date */
  orderDate: string;
  /** @format int32 */
  orderStatus?: number;
  orderType?: string;
  /** @format int32 */
  payType?: number;
  paymentClause?: string;
  purchaseOrg?: string;
  purchaseOrgName?: string;
  purchaser?: string;
  pushFailureReason?: string;
  pushStatus?: string;
  remark?: string;
  /** @format int32 */
  replenishmentType?: number;
  requesterUser?: string;
  /** @format int32 */
  sendStatus?: number;
  /** @format int32 */
  shippingMethod?: number;
  sourceType?: string;
  /** @format int32 */
  status?: number;
  /** @format int32 */
  supplierCarrier?: number;
  supplierCode: string;
  supplierName?: string;
  /** @format int32 */
  supplierPayType?: number;
  supplierPrincipal?: string;
  toElsAccount?: string;
  toWarehouseCode?: string;
  updateBy?: string;
  /** @format date-time */
  updateTime?: string;
  warehouseCode: string;
}

/** PurchaseOrderReqItem */
export interface PurchaseOrderReqItem {
  cateCode?: string;
  cateName?: string;
  close?: string;
  companyCode?: string;
  createBy?: string;
  /** @format date-time */
  createTime?: string;
  currency?: string;
  deliveryArrangement?: string;
  /** @format int32 */
  deliveryQuantity?: number;
  factory?: string;
  /** @format int32 */
  free?: number;
  freeze?: string;
  /** @format int32 */
  isQalityTest?: number;
  /** @format int32 */
  itemNumber: number;
  itemStatus?: string;
  materialGroupName?: string;
  materialName?: string;
  materialNumber?: string;
  netAmount?: number;
  netPrice?: number;
  /** @format int32 */
  notDeliveryQuantity?: number;
  /** @format int32 */
  onWayQuantity?: number;
  poCode: string;
  price?: number;
  productSku?: string;
  purchaseIsFirst?: string;
  purchaseRemark?: string;
  purchaseType?: string;
  purchaseUnit?: string;
  /** @format int32 */
  qty: number;
  /** @format int32 */
  receiveQuantity?: number;
  rejectReason?: string;
  /** @format date */
  requireDate?: string;
  responsibleReason?: string;
  sendStatus?: string;
  /** @format int32 */
  sourceItemNumber?: number;
  sourceNumber?: string;
  /** @format int32 */
  sourceType?: number;
  storageLocation?: string;
  supplierRemark?: string;
  supplySku: string;
  taxAmount?: number;
  taxCode?: string;
  taxRate?: number;
  toElsAccount?: string;
  updateBy?: string;
  /** @format date-time */
  updateTime?: string;
}

/** PurchaseReturnOrderReq */
export interface PurchaseReturnOrderReq {
  /** 采购退货单 */
  returnOrder?: ReturnOrderBean;
  /** 采购退货单明细 */
  returnOrderItems?: ReturnOrderItemBean[];
}

/** QueryOrderBatchToFbaReq */
export interface QueryOrderBatchToFbaReq {
  /** 订单号列表 */
  orderCodeList?: string[];
}

/** QueryPushGcTransferSlipOrderEnumsResp */
export interface QueryPushGcTransferSlipOrderEnumsResp {
  /** 字典结果Map, key = 发货仓库,发货物理仓,国家,配送方式(配送商,物流产品),包材归属，包材要求,SKU换标要求, value = 具体值集合 */
  dictMap?: Record<string, ErpDictBean[]>;
}

/** QuerySkuStockDetailReq */
export interface QuerySkuStockDetailReq {
  /** 平台/渠道 */
  channelCode?: string;
  /** 国家 */
  countryCode?: string;
  /** 是否只查可用库存大于0的记录 */
  hasStock?: boolean;
  /** 下一页标识 */
  nextCursor?: string;
  /**
   * 每页数量
   * @format int32
   */
  pageSize?: number;
  /** 库存池编码 */
  poolCodes?: string[];
  /** 区域编码 */
  regionCode?: string;
  /** 业务人员编码 */
  salesmanCode?: string;
  /**
   * 共享（0-全部（个人+共享） 1-共享 2-个人，默认0）
   * @format int32
   */
  share?: number;
  /** 站点 */
  siteCode?: string;
  /** sku编码列表 */
  skuCodes?: string[];
  /** 排序规则，格式：[{"name":"字段名","sort":"asc/desc"}] */
  sortList?: Record<string, string>[];
  /** 店铺 */
  store?: string;
  /** 供应链sku列表 */
  supplySkus?: string[];
  /** 仓库编码 */
  warehouseCodes?: string[];
}

/** QuerySkuStockDetailResp */
export interface QuerySkuStockDetailResp {
  /** 是否有下一页 */
  hasNext?: boolean;
  /** 库存记录列表 */
  items?: StockItemBean[];
  /** 下一页游标标识 */
  nextCursor?: string;
  /**
   * 每页大小
   * @format int32
   */
  pageSize?: number;
}

/** QueryStockQueryReq */
export interface QueryStockQueryReq {
  /** 平台/渠道 */
  channelCode?: string;
  /** 国家 */
  countryCode?: string;
  /** 是否只查可用库存大于0的记录 */
  hasStock?: boolean;
  /** 关键字 供应链产品名称/SKU */
  keyword?: string;
  /** 下一页标识 */
  nextCursor?: string;
  /**
   * 每页数量
   * @format int32
   */
  pageSize?: number;
  /** 库存池编码 */
  poolCodes?: string[];
  /** 区域编码 */
  regionCode?: string;
  /** 业务人员编码 */
  salesmanCode?: string;
  /**
   * 共享（1-共享 0-全部）
   * @format int32
   */
  share?: number;
  /** 站点 */
  siteCode?: string;
  /** sku编码列表 */
  skuCodes?: string[];
  /** 店铺 */
  store?: string;
  /** 供应链sku列表 */
  supplySkus?: string[];
  /** 仓库 */
  warehouseCode?: string;
  /** 仓库编码 */
  warehouseCodes?: string[];
}

/** QueryStockQueryResp */
export interface QueryStockQueryResp {
  /** 是否有下一页 */
  hasNext?: boolean;
  /** 库存记录列表 */
  items?: StockItem[];
  /** 下一页游标标识（最后一条记录的ID） */
  nextCursor?: string;
  /**
   * 每页大小
   * @format int32
   */
  pageSize?: number;
}

/** QueryWarehouseLogisticsReq */
export interface QueryWarehouseLogisticsReq {
  /** erp订单号 */
  erpCodeList?: string[];
}

/** ReceiveInfo */
export interface ReceiveInfo {
  /** 买家地址 */
  address?: string;
  /** 买家地址2 */
  address2?: string;
  /** 区域 */
  area?: string;
  /** 买家id */
  buyerId?: string;
  /** 买家备注 */
  buyerRemark?: string;
  /** 买家城市 */
  city?: string;
  /** 合同签约主体 */
  contractSubject?: string;
  /** 买家国家编码 */
  countryCode?: string;
  /** 买家国家 */
  countryDesc?: string;
  /** 客户名称 */
  customerCode?: string;
  /** 客户名称 */
  customerDesc?: string;
  /** 买家邮箱 */
  email?: string;
  /** 门牌号 */
  houseNumber?: string;
  /** 手机号 */
  mobilePhone?: string;
  /** 买家姓名 */
  name?: string;
  /** 归属组织id */
  organizationDeptId?: string;
  /** 归属组织名称 */
  organizationDeptName?: string;
  /** 买家电话 */
  phone?: string;
  /** 买家省份 */
  province?: string;
  /** 短地址 沙特阿拉伯使用 */
  shortAddress?: string;
  /** 街道 */
  street?: string;
  /** 税号 */
  taxId?: string;
  /** 跟踪单号 */
  trackOrderCode?: string;
  /** 卖家账号 */
  userChannel?: string;
  /** 卖家邮箱 */
  userChannelEmail?: string;
  /** 红人code */
  userCode?: string;
  /** 买家邮编 */
  zipcode?: string;
}

/** ReceiverBean */
export interface ReceiverBean {
  /** 收件人地址1 */
  address1?: string;
  /** 收件人地址2 */
  address2?: string;
  /** 地址类别：R 收货，S发货 */
  addressType?: string;
  /** 收件人城市 */
  city?: string;
  /** 公司名 */
  company?: string;
  /** 收件人国家代码 */
  countryCode?: string;
  /** 收件人区县 */
  county?: string;
  /** 客户名称 */
  customerName?: string;
  /** 收件人邮箱 */
  email?: string;
  /** 门牌号 */
  houseNumber?: string;
  /** 物流单号 */
  logisticsNo?: string;
  /** 收件人电话 */
  phone?: string;
  /** 收件人州/省 */
  province?: string;
  /** 收件人名称 */
  receiverName?: string;
  /** 收件人税号 */
  receiverTaxId?: string;
  /** 寄件人税号 */
  senderTaxId?: string;
  /** 沙特短地址 */
  shortAddress?: string;
  /** 收件人邮编 */
  zipcode?: string;
}

/** ReferenceParamsDeliveryReq */
export interface ReferenceParamsDeliveryReq {
  /** 国家编码 */
  countryCode?: string;
  /** 业务员编码 */
  salesmanCode?: string;
  /** 商品编码 */
  skuCodeList?: string[];
  /**
   * 类型：0-红人发样单 1-线下订单 2-TT订单
   * @format int32
   */
  type?: number;
}

/** ReplenishOrderItemInfo */
export interface ReplenishOrderItemInfo {
  /** 商品折扣 */
  discountAmount?: number;
  /** 商品积分 */
  integral?: number;
  /**
   * 数量
   * @format int32
   */
  num: number;
  /** 商品其他费用 */
  otherAmount?: number;
  /** 商品单价(不含税) */
  price?: number;
  /** 商品买家支付运费 */
  salesFreightAmount?: number;
  /** MSKU */
  sellerSku: string;
  /** skuCode */
  skuCode: string;
  /** 供应链SKU */
  supplySku: string;
  /** 商品税金 */
  taxes?: number;
}

/** ReplenishOrderSaveReq */
export interface ReplenishOrderSaveReq {
  baseInfo?: BaseInfo;
  itemInfoList?: ReplenishOrderItemInfo[];
  receiveInfo?: ReceiveInfo;
}

/** ReplenishProductInfoResp */
export interface ReplenishProductInfoResp {
  mskus?: string[];
  /** 供应链SKU */
  supplySku?: string;
  /** 体积 */
  volume?: number;
  /** 重量 */
  weight?: number;
}

/** ReplenishProductReq */
export interface ReplenishProductReq {
  /** 平台 */
  channel?: string;
  /** 国家编码 */
  countryCode?: string;
  /** 店铺 */
  shop?: string;
  /** 站点 */
  site?: string;
  /** 供应链SKU */
  supplySkus?: string[];
}

/** ReturnOrderBean */
export interface ReturnOrderBean {
  /** 采购公司 */
  companyCode?: string;
  /** 操作人 */
  createBy?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /**
   * 是否需要供应商确认 0-不需要 1-需要
   * @format int32
   */
  isSaleConfirm?: number;
  /**
   * 计划到货日期
   * @format date
   */
  planReturnDate?: string;
  /** 采购单号 */
  poCode?: string;
  /** 采购组 */
  purchaseGroup?: string;
  /** 采购方名称 */
  purchaseName?: string;
  /** 采购组织 */
  purchaseOrg?: string;
  /** 需方备注 */
  purchaseRemark?: string;
  /** 退货地址 */
  refundsAddress?: string;
  /** 单据描述 */
  refundsDeliveryDesc?: string;
  /** 退货单号 */
  refundsDeliveryNumber?: string;
  /**
   * 单据状态0-新建　1－待确认　2－已确认　3－已退回　4－已关闭　5，部分退货　6－全部退货　7－作废　8－无需确认
   * @format int32
   */
  refundsDeliveryStatus?: number;
  /**
   * 退货时间
   * @format date-time
   */
  refundsDeliveryTime?: string;
  /** 单据类型 正常-NORMAL */
  refundsDeliveryType?: string;
  /**
   * 退货方式：0：自提、1：物流
   * @format int32
   */
  refundsDeliveryWay?: number;
  /** 退货负责人 */
  refundsPrincipal?: string;
  /** 退货原因 */
  refundsReason?: string;
  /**
   * 0-退货 1-换货
   * @format int32
   */
  refundsType?: number;
  /** 供应商ERP编码 */
  supplierCode?: string;
  /** 供应商名称 */
  supplierName?: string;
  /** 供方备注 */
  supplierRemark?: string;
  /** 供应商ELS账号 */
  toElsAccount?: string;
  /** 更新人 */
  updateBy?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /** 仓库编码 */
  warehouseCode?: string;
}

/** ReturnOrderItemBean */
export interface ReturnOrderItemBean {
  /** 创建人 */
  createBy?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 币别 */
  currency?: string;
  /** 送货安排 */
  deliveryArrangement?: string;
  /** 对方ELS账号 */
  elsAccount?: string;
  /** 工厂代码 */
  factory?: string;
  /**
   * 是否首单：0：否，1：是
   * @format int32
   */
  isFirstOrder?: number;
  /**
   * 行号
   * @format int32
   */
  itemNumber?: number;
  /**
   * 行状态：0：待退货、1：部分退货、2：全部退货
   * @format int32
   */
  itemStatus?: number;
  /** 物料描述 */
  materialDesc?: string;
  /** 物料组 */
  materialGroup?: string;
  /** 物料组名称 */
  materialGroupName?: string;
  /** 物料id */
  materialId?: string;
  /** 物料名称 */
  materialName?: string;
  /** 物料编码 */
  materialNumber?: string;
  /** 物料规格 */
  materialSpec?: string;
  /** 净价 */
  netPrice?: number;
  /** 订单id */
  orderId?: string;
  /** 订单行id */
  orderItemId?: string;
  /** 订单行号 */
  orderItemNumber?: string;
  /** 订单号 */
  orderNumber?: string;
  /** 含税价 */
  price?: number;
  /** 产品名称 */
  productName?: string;
  /** 产品SKU */
  productSku?: string;
  /** 需方备注 */
  purchaseRemark?: string;
  /**
   * 订单数量
   * @format int32
   */
  quantity?: number;
  /**
   * 收货数量
   * @format int32
   */
  receiveQuantity?: number;
  /**
   * 退货日期
   * @format date
   */
  refundsDate?: string;
  /** 退货单号 */
  refundsDeliveryCode?: string;
  /** 头表id */
  refundsDeliveryId?: string;
  /** 退货方式：0：自提、1：物流 */
  refundsDeliveryWay?: string;
  /**
   * 退货良品数量
   * @format int32
   */
  refundsGoodQuantity?: number;
  /**
   * 退货次品数量
   * @format int32
   */
  refundsQuantity?: number;
  /**
   * 已出库数量
   * @format int32
   */
  refundsQuantityAlready?: number;
  /** 拒绝原因 */
  refuseReason?: string;
  /** 发布状态 */
  releaseStatus?: string;
  /** 责任方原因 */
  responsiblePartyReason?: string;
  /** 来源单id */
  sourceId?: string;
  /** 来源单行id */
  sourceItemId?: string;
  /** 来源单行号 */
  sourceItemNumber?: string;
  /** 来源单号 */
  sourceNumber?: string;
  /** 来源类型 */
  sourceType?: string;
  /** 来源Id */
  sourceTypeId?: string;
  /** 库存地点代码 */
  storageLocation?: string;
  /** 供方备注 */
  supplierRemark?: string;
  /** 退货金额 */
  taxAmount?: number;
  /** 税码 */
  taxCode?: string;
  /** 税率 */
  taxRate?: string;
  /** 最后修改人 */
  updateBy?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /** 收货凭证单id */
  voucherId?: string;
  /** 收货凭证行id */
  voucherItemId?: string;
  /** 收货凭证行号 */
  voucherItemNumber?: string;
  /** 收货凭证单号 */
  voucherNumber?: string;
}

/** RuleAddReq */
export interface RuleAddReq {
  /** 动作参数 JSON（如仓库/物流/拆单参数等） */
  actionParams?: object;
  /** 动作参数 JSON（拆单） */
  actionParamsList?: Record<string, object>[];
  /** 原始条件 JSON */
  conditions?: RuleCondition[];
  /** 规则描述 */
  description?: string;
  /**
   * 生效开始时间
   * @format date-time
   */
  effectiveTimeBegin?: string;
  /**
   * 生效结束时间，NULL 表示长期有效
   * @format date-time
   */
  effectiveTimeEnd?: string;
  /**
   * 自增ID
   * @format int64
   */
  id?: number;
  /** 规则名称 */
  name?: string;
  /**
   * 优先级，数字越小优先级越高
   * @format int32
   */
  priority?: number;
  /** 规则编号 */
  ruleNo?: string;
  /** 场景编码（如接单/拆单/仓库/赠品等） */
  sceneCode?: string;
  /**
   * 状态：0-禁用 1-启用
   * @format int32
   */
  status?: number;
  /** 状态名称 */
  statusDesc?: string;
}

/** RuleBatchCommonReq */
export interface RuleBatchCommonReq {
  /** 规则ID */
  ruleNos?: string[];
}

/** RuleBlacklistAddReq */
export interface RuleBlacklistAddReq {
  /** 拉黑原因 */
  blockedReason?: string;
  /** 内容 */
  content?: string;
  /**
   * 自增ID
   * @format int64
   */
  id?: number;
  /** 匹配方式：精确 EXACT，模糊 LIKE， “%”通配符匹配  WILDCARD */
  matchMethod?: string;
  /** 匹配方式：精确 EXACT，模糊 LIKE */
  matchMethodName?: string;
  /** 单号 */
  ruleNo?: string;
  /**
   * 状态：0-禁用 1-启用
   * @format int32
   */
  status?: number;
  /** 类型：姓名、邮箱、电话、地址 */
  type?: string;
}

/** RuleBlacklistEnableDisableReq */
export interface RuleBlacklistEnableDisableReq {
  /** IDs */
  ruleNos?: string[];
  /**
   * 状态：0-禁用 1-启用
   * @format int32
   */
  status?: number;
}

/** RuleBlacklistListBean */
export interface RuleBlacklistListBean {
  /** 拉黑原因 */
  blockedReason?: string;
  /** 内容 */
  content?: string;
  /** 创建人 */
  createdName?: string;
  /** 创建时间 */
  createdTime?: string;
  /**
   * ID
   * @format int64
   */
  id?: number;
  /** 匹配方式：精确 EXACT，模糊 LIKE ， “%”通配符匹配  WILDCARD */
  matchMethod?: string;
  /** 匹配方式：精确 EXACT，模糊 LIKE */
  matchMethodName?: string;
  /** 单号 */
  ruleNo?: string;
  /**
   * 状态：0-禁用 1-启用
   * @format int32
   */
  status?: number;
  statusDesc?: string;
  /** 类型：姓名、邮箱、电话、地址 */
  type?: string;
  /** 更新人 */
  updatedName?: string;
  /** 更新时间 */
  updatedTime?: string;
}

/** RuleBlacklistListReq */
export interface RuleBlacklistListReq {
  /** 拉黑原因 */
  blockedReason?: string;
  /** 黑名单内容 */
  content?: string;
  /** 匹配方式：精确 EXACT，模糊 LIKE， “%”通配符匹配  WILDCARD */
  matchMethod?: string;
  /**
   * 页数
   * @format int32
   * @min 1
   * @exclusiveMin false
   */
  pageNum: number;
  /**
   * 每页数量
   * @format int32
   * @max 100
   * @exclusiveMax false
   */
  pageSize: number;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /**
   * 状态：0-禁用 1-启用
   * @format int32
   */
  status?: number;
}

/** RuleBlacklistListResp */
export interface RuleBlacklistListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  recordList?: RuleBlacklistListBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** RuleCondition */
export interface RuleCondition {
  complexCondition?: ComplexCondition;
  exp?: string;
  leftSide?: RuleLeftSide;
  operator?: string;
  rightSides?: RuleRightSide[];
}

/** RuleDetailResp */
export interface RuleDetailResp {
  /** 动作参数 JSON（如仓库/物流/拆单参数等） */
  actionParams?: object;
  /** 动作参数 JSON（拆单） */
  actionParamsList?: Record<string, object>[];
  /** 原始条件 JSON */
  conditions?: RuleCondition[];
  /** 规则描述 */
  description?: string;
  /**
   * 生效开始时间
   * @format date-time
   */
  effectiveTimeBegin?: string;
  /**
   * 生效结束时间，NULL 表示长期有效
   * @format date-time
   */
  effectiveTimeEnd?: string;
  /**
   * 自增ID
   * @format int64
   */
  id?: number;
  /** 规则名称 */
  name?: string;
  /**
   * 优先级，数字越小优先级越高
   * @format int32
   */
  priority?: number;
  /** 规则编号 */
  ruleNo?: string;
  /** 场景编码（如接单/拆单/仓库/赠品等） */
  sceneCode?: string;
  /**
   * 状态：0-禁用 1-启用
   * @format int32
   */
  status?: number;
  /** 状态名称 */
  statusDesc?: string;
}

/** RuleEnableDisableReq */
export interface RuleEnableDisableReq {
  /** 规则ID */
  ruleNos?: string[];
  /**
   * 状态：0-禁用 1-启用
   * @format int32
   */
  status?: number;
}

/** RuleLeftSide */
export interface RuleLeftSide {
  innerType?: string;
  name?: string;
  ref?: string;
}

/** RuleListBean */
export interface RuleListBean {
  /** 创建人 */
  createdName?: string;
  /** 创建时间 */
  createdTime?: string;
  /** 规则描述 */
  description?: string;
  /** 生效开始时间 */
  effectiveTimeBegin?: string;
  /** 生效结束时间 */
  effectiveTimeEnd?: string;
  /**
   * ID
   * @format int64
   */
  id?: number;
  /** 规则名称 */
  name?: string;
  /**
   * 优先级
   * @format int32
   */
  priority?: number;
  /** 规则编号 */
  ruleNo?: string;
  /** 场景编码（如接单/拆单/仓库/赠品等） */
  sceneCode?: string;
  /**
   * 状态：0-禁用 1-启用
   * @format int32
   */
  status?: number;
  /** 状态名称 */
  statusDesc?: string;
  /** 更新人 */
  updatedName?: string;
  /** 更新时间 */
  updatedTime?: string;
}

/** RuleListReq */
export interface RuleListReq {
  /** 规则描述 */
  description?: string;
  /** 规则名称 */
  name?: string;
  /**
   * 页数
   * @format int32
   * @min 1
   * @exclusiveMin false
   */
  pageNum: number;
  /**
   * 每页数量
   * @format int32
   * @max 100
   * @exclusiveMax false
   */
  pageSize: number;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 规则ID */
  ruleNo?: string;
  /** 场景编码（如接单/拆单/仓库/赠品等）：收件信息--recipient，黑名单 -- blacklist */
  sceneCode?: string;
  /**
   * 状态：0-禁用 1-启用
   * @format int32
   */
  status?: number;
}

/** RuleListResp */
export interface RuleListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  recordList?: RuleListBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** RuleLogListReq */
export interface RuleLogListReq {
  /** 规则编号 */
  ruleNo?: string;
  /** 场景编码（如接单/拆单/仓库/赠品等） */
  sceneCode?: string;
}

/** RuleLogListResp */
export interface RuleLogListResp {
  /** 操作用户 */
  createByName?: string;
  /** 操作时间 */
  createTime?: string;
  /**
   * ID
   * @format int64
   */
  id?: number;
  /** 操作内容 */
  operationContent?: string;
  /** 操作类型 */
  operationType?: string;
  /** 规则编号 */
  ruleNo?: string;
  /** 场景编码（如接单/拆单/仓库/赠品等） */
  sceneCode?: string;
}

/** RuleMultipleSuppliesAddListBean */
export interface RuleMultipleSuppliesAddListBean {
  /** 序号 */
  lineNumber?: string;
  /** 供应链SKU名称 */
  prodName?: string;
  /** 图片 */
  productImageUrl?: string;
  /** 供应链SKU */
  supplySku?: string;
}

/** RuleMultipleSuppliesAddReq */
export interface RuleMultipleSuppliesAddReq {
  /**
   * 自增ID
   * @format int64
   */
  id?: number;
  /** sku产品集合 */
  itemList?: RuleMultipleSuppliesAddListBean[];
  /** 名称 */
  name?: string;
  /** 单号 */
  ruleNo?: string;
  /**
   * 状态：0-禁用 1-启用
   * @format int32
   */
  status?: number;
}

/** RuleMultipleSuppliesListBean */
export interface RuleMultipleSuppliesListBean {
  /** 创建人 */
  createdName?: string;
  /** 创建时间 */
  createdTime?: string;
  /**
   * ID
   * @format int64
   */
  id?: number;
  /** 名称 */
  name?: string;
  /** 产品集ID */
  ruleNo?: string;
  /**
   * 状态：0-禁用 1-启用
   * @format int32
   */
  status?: number;
  statusDesc?: string;
  /**
   * sku数量
   * @format int32
   */
  supplySkuCount?: number;
  /** sku列表 */
  supplySkus?: string[];
  /** 更新人 */
  updatedName?: string;
  /** 更新时间 */
  updatedTime?: string;
}

/** RuleMultipleSuppliesListReq */
export interface RuleMultipleSuppliesListReq {
  /** 名称 */
  name?: string;
  /**
   * 页数
   * @format int32
   * @min 1
   * @exclusiveMin false
   */
  pageNum: number;
  /**
   * 每页数量
   * @format int32
   * @max 100
   * @exclusiveMax false
   */
  pageSize: number;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 产品集ID */
  ruleNo?: string;
  /**
   * 状态：0-禁用 1-启用
   * @format int32
   */
  status?: number;
  /** supplySku */
  supplySku?: string;
}

/** RuleMultipleSuppliesListResp */
export interface RuleMultipleSuppliesListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  recordList?: RuleMultipleSuppliesListBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** RuleRightSide */
export interface RuleRightSide {
  desc?: string;
  subOp?: string;
  value?: string;
}

/** RuleTaxBean */
export interface RuleTaxBean {
  /** 平台 */
  channel?: string;
  /** 平台描述 */
  channelDesc?: string;
  /** 国家 */
  countryCode?: string;
  /** 国家描述 */
  countryDesc?: string;
  /**
   * ID
   * @format int64
   */
  id?: number;
  /** IOSS */
  iossNumber?: string;
  /** 店铺 */
  shopCode?: string;
  /** 店铺描述 */
  shopDesc?: string;
}

/** RuleTaxListBatchUpdateReq */
export interface RuleTaxListBatchUpdateReq {
  /** 更新列表 */
  updateList?: RuleTaxUpdateBean[];
}

/** RuleTaxListReq */
export interface RuleTaxListReq {
  /** 渠道列表 */
  channelList?: string[];
  /** 国家列表 */
  countryCodeList?: string[];
  /**
   * 页数
   * @format int32
   * @min 1
   * @exclusiveMin false
   */
  pageNum: number;
  /**
   * 每页数量
   * @format int32
   * @max 100
   * @exclusiveMax false
   */
  pageSize: number;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 店铺列表 */
  shopCodeList?: string[];
}

/** RuleTaxListResp */
export interface RuleTaxListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 税务规则 */
  recordList?: RuleTaxBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** RuleTaxUpdateBean */
export interface RuleTaxUpdateBean {
  /** 渠道 */
  channel?: string;
  /** 国家 */
  countryCode?: string;
  /** ioss税号 */
  iossNumber?: string;
  /** 店铺 */
  shopCode?: string;
}

/** SalesOutboundOrder */
export interface SalesOutboundOrder {
  appointmentPickupFlag?: string;
  area?: string;
  buyerRemark?: string;
  cancelFlag?: string;
  cancelReason?: string;
  /** @format date-time */
  cancelledTime?: string;
  carrierCode?: string;
  city?: string;
  company?: string;
  country?: string;
  createName?: string;
  /** @format date-time */
  createTime?: string;
  /** @format int32 */
  deleted?: number;
  deliveryCode?: string;
  /** @format date-time */
  deliveryPreparationTime?: string;
  deliveryType?: string;
  docType?: string;
  extendInfo?: string;
  grossWeight?: number;
  hasException?: string;
  houseNumber?: string;
  /** @format int64 */
  id?: number;
  initFlag?: string;
  jjPushErrMsg?: string;
  jjPushStatus?: string;
  labelInfo?: string;
  /** @format date-time */
  lastDeliveryTime?: string;
  latestOperatingType?: string;
  /** @format date-time */
  latestPickupTime?: string;
  logisticsChannel?: string;
  logisticsChannelName?: string;
  logisticsName?: string;
  logisticsNo?: string;
  logisticsOrderNo?: string;
  orderCode?: string;
  orderDesc?: string;
  orderSource?: string;
  orderStatus?: string;
  /** @format date-time */
  orderTime?: string;
  orderType?: string;
  outboundOperatorId?: string;
  outboundOperatorName?: string;
  outboundStatus?: string;
  /** @format date-time */
  outboundTime?: string;
  /** @format date-time */
  packedTime?: string;
  packerName?: string;
  /** @format int32 */
  pickCellNum?: number;
  pickCode?: string;
  pickPrintData?: string;
  pickPrintStatus?: string;
  /** @format int32 */
  pickTaskNo?: number;
  /** @format date-time */
  pickedTime?: string;
  pickerName?: string;
  pickupNo?: string;
  platformOrderCode?: string;
  /** @format int32 */
  productCategoryNum?: number;
  /** @format int32 */
  productNum?: number;
  province?: string;
  provinceCode?: string;
  pushErrMsg?: string;
  pushStatus?: string;
  receiveAddress?: string;
  receiveEmail?: string;
  receiveName?: string;
  receivePhoneNumber?: string;
  receivePostcode?: string;
  sellerRemark?: string;
  shipFromCode?: string;
  shipLevel?: string;
  /** @format date-time */
  shipmentTime?: string;
  shipmenterName?: string;
  /** @format int64 */
  shopId?: number;
  shopName?: string;
  soOrderCode?: string;
  sourceOrderCreateType?: string;
  sourceOrderType?: string;
  street?: string;
  totalNum?: number;
  totalVolume?: number;
  totalWeight?: number;
  trackingNo?: string;
  updateAddressFlag?: string;
  /** @format date-time */
  updateTime?: string;
  volumeWeight?: number;
  warehouseCode?: string;
  warehouseCountry?: string;
  warehouseDesc?: string;
  /** @format int32 */
  warehouseId?: number;
  warehouseOrderCode?: string;
  warehouseType?: string;
  waybillFile?: string;
  waybillNo?: string;
  waybillPrintData?: string;
  waybillPrintStatus?: string;
  /** @format int32 */
  ztFlag?: number;
}

/** SampleOrderV3ListQueryReq */
export interface SampleOrderV3ListQueryReq {
  /** 总金额 */
  amountMax?: string;
  /** 总金额最小值 */
  amountMin?: string;
  /** 待审核人编码 */
  auditCode?: string;
  /** 买家ID */
  buyerId?: string;
  /** 买家账号 */
  buyerName?: string;
  /**
   * 买家备注是否为空
   * @format int32
   */
  buyerRemarkNotNull?: number;
  /** 渠道 */
  channelList?: string[];
  /** 订单号列表 */
  codeList?: string[];
  /** 国家 */
  countryCode?: string;
  /** 国家 */
  countryCodeList?: string[];
  /**
   * 创建时间-结束
   * @format date-time
   */
  createTimeEnd?: string;
  /**
   * 创建时间-开始
   * @format date-time
   */
  createTimeStart?: string;
  /** 创建人-编码 */
  creator?: string;
  /** 创建人-编码 */
  creatorList?: string[];
  /** 客户编码 */
  customerName?: string;
  /**
   * 客服备注是否为空
   * @format int32
   */
  customerRemarkNotNull?: number;
  /** 客户类型 */
  customerType?: string;
  /** 客户类型 */
  customerTypeList?: string[];
  /** 异常备注 */
  errorRemark?: string;
  /** 自定义条件导出编码 */
  exportConditionCode?: string;
  /** shopify导出维度：header=表头 */
  exportDimension?: string;
  /** 导出模板 default-默认导出模板 finance-财务导出模板 */
  exportTemplate?: string;
  /** 批量搜索关键字-精准 */
  itemSearchKey?: string;
  /**
   * 搜索类型 1-SKU 2-MSKU 3-ASIN/itemId 4-产品名称
   * @format int32
   */
  itemSearchType?: number;
  /** 单个搜索关键字 */
  itemSingleSearchKey?: string;
  /** 关键字 红人账号/订单号/产品名称/商品SKU/供应链SKU/客户编码/客户邮箱 */
  keyword?: string;
  /**
   * 物流审核时间-结束
   * @format date-time
   */
  logisticsAuditTimeEnd?: string;
  /**
   * 物流审核时间-开始
   * @format date-time
   */
  logisticsAuditTimeStart?: string;
  /** 标发状态 */
  markShippedStatus?: string;
  /** 待我审核 */
  meReview?: boolean;
  /** 客户名称/产品名称 */
  nameKey?: string;
  /**
   * 订单状态 100-草稿 200-待审核 300-待发货 301- 400-已发货 500-异常 600-废弃
   * @format int32
   */
  neOrderBigStatus?: number;
  /**
   * 运营期望到货时间-结束
   * @format date-time
   */
  operationExpectedArrivalTimeEnd?: string;
  /**
   * 运营期望到货时间-开始
   * @format date-time
   */
  operationExpectedArrivalTimeStart?: string;
  /**
   * 订单状态 100-草稿 200-待审核 300-待发货 301- 400-已发货 500-异常 600-废弃
   * @format int32
   */
  orderBigStatus?: number;
  /** 单选 1-订单号 2-参考单号 3-运单号 4-跟踪单号 5-出库单号 */
  orderCode?: string;
  /** 订单标签 */
  orderLabelCodeList?: string[];
  /** 订单销售类型选择，见枚举b2b_client_order_sale_type */
  orderSaleType?: string;
  /** 订单渠道，见枚举b2b_client_order_sale_type */
  orderSaleTypeList?: string[];
  /**
   * 订单状态 500-ec推送异常	501-钉钉审核失败异常	502-ec冻结	503-第三方系统内缺货	506-缺货(OS)	504-ec问题件	505-系统内部审核失败	507-积加推送异常	508-积加内部异常	509-积加取消异常
   * @format int32
   */
  orderStatus?: number;
  /**
   * 审核时间-结束
   * @format date-time
   */
  osAuthTimeEnd?: string;
  /**
   * 审核时间-开始
   * @format date-time
   */
  osAuthTimeStart?: string;
  /**
   * 页数
   * @format int32
   * @min 1
   * @exclusiveMin false
   */
  pageNum: number;
  /**
   * 每页数量
   * @format int32
   * @max 100
   * @exclusiveMax false
   */
  pageSize: number;
  /**
   * 付款时间-结束
   * @format date-time
   */
  payTimeEnd?: string;
  /**
   * 付款时间-结束
   * @format date-time
   */
  payTimeStart?: string;
  /**
   * 期望发货时间-结束
   * @format date-time
   */
  platformExpectedSendTimeEnd?: string;
  /**
   * 期望发货时间-开始
   * @format date-time
   */
  platformExpectedSendTimeStart?: string;
  /** 产品名称 */
  productName?: string;
  /** 合作事项编码 合作项目寄样模块查询必传 */
  projectCode?: string;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  refCode?: string;
  /** 批量搜索关键字 */
  searchKey?: string;
  /**
   * 搜索类型 1-订单号 2-参考单号(平台单号) 3-运单号 4-跟踪单号 5-出库单号
   * @format int32
   */
  searchType?: number;
  /**
   * 发货时间-结束
   * @format date-time
   */
  sendTimeEnd?: string;
  /**
   * 发货时间-开始
   * @format date-time
   */
  sendTimeStart?: string;
  /** 配送方式 */
  shippingCode?: string;
  /** 配送方式 */
  shippingCodeList?: string[];
  /** 店铺 */
  shop?: string;
  /** 店铺 */
  shopCodeList?: string[];
  /**
   * 签收时间-结束
   * @format date-time
   */
  signInTimeEnd?: string;
  /**
   * 签收时间-开始
   * @format date-time
   */
  signInTimeStart?: string;
  /** 站点 */
  siteList?: string[];
  /** 商品SKU */
  skuCode?: string;
  /** 商品sku/供应链sku */
  skuKey?: string;
  /** 批量商品sku/供应链sku */
  skuKeys?: string[];
  /** 排序规则，格式：[{"name":"字段名","sort":"asc/desc"}] */
  sortParam?: Record<string, string>;
  /** 订单状态 */
  statusList?: number[];
  /** 供应链SKU */
  supplySku?: string;
  /**
   * 是否禁止处理：1-是；0-否
   * @format int32
   */
  suspendStatus?: number;
  /**
   * 类型：0-红人发样单 1-线下订单 2-TT订单
   * @format int32
   */
  type?: number;
  /** 发货仓库 */
  warehouseCode?: string;
  /** 发货仓库 */
  warehouseCodeList?: string[];
}

/** ShipAddressReq */
export interface ShipAddressReq {
  /** 地址 */
  address?: string;
  /** 地址2 */
  address2?: string;
  /** 区域 */
  area?: string;
  /**
   * 纸箱
   * @format int32
   */
  cartons?: number;
  /** 城市 */
  city?: string;
  /** 国家编码 */
  countryCode?: string;
  /** 国家 */
  countryDesc?: string;
  /** 邮箱 */
  email?: string;
  /** 门牌号 */
  houseNumber?: string;
  /** 姓名 */
  name?: string;
  /** 电话 */
  phone?: string;
  /** 省份 */
  province?: string;
  /** 邮编 */
  zipcode?: string;
}

/** ShipAddressRes */
export interface ShipAddressRes {
  /** 地址 */
  address?: string;
  /** 地址2 */
  address2?: string;
  /** 区域 */
  area?: string;
  /**
   * cartons
   * @format int32
   */
  cartons?: number;
  /** 城市 */
  city?: string;
  /** 国家编码 */
  countryCode?: string;
  /** 国家 */
  countryDesc?: string;
  /** 邮箱 */
  email?: string;
  /** 门牌号 */
  houseNumber?: string;
  /** 姓名 */
  name?: string;
  /** 电话 */
  phone?: string;
  /** 省份 */
  province?: string;
  /** 邮编 */
  zipcode?: string;
}

/** ShipInfo */
export interface ShipInfo {
  /** 是否选中 */
  checked?: boolean;
  /** 国家列表 */
  countryList?: DictCommonBean[];
  /** 配送方式 */
  smCode?: string;
  /** 配送方式名称 */
  smNameCn?: string;
  /** 承运商编码 */
  spCode?: string;
  /** 承运商名称 */
  spName?: string;
}

/** ShippingInfo */
export interface ShippingInfo {
  /** 配送方式信息 */
  smInfos?: SmInfo[];
  /** 承运商编码 */
  spCode?: string;
  /** 承运商名称 */
  spName?: string;
}

/** ShippingMethodReq */
export interface ShippingMethodReq {
  /** 配送方式 */
  smCode?: string;
  /** 承运商 */
  spCode?: string;
}

/** ShippingMethodResp */
export interface ShippingMethodResp {
  shippingList?: ShippingInfo[];
}

/** ShopParam */
export interface ShopParam {
  /** sellerSKU信息 */
  supplySkuList?: SkuParam[];
  /** 仓库编码-即Amazon店铺账号 */
  warehouseCode?: string;
  /** 仓库名称 */
  warehouseName?: string;
}

/** ShopWarehouseBean */
export interface ShopWarehouseBean {
  /** 店铺账号 */
  countryCode?: string;
  /** 兼容旧仓库编码 */
  oldWarehouseCode?: string;
  /** 店铺账号 */
  shopAccount?: string;
  /** 店铺账号名称 */
  shopNameDesc?: string;
  /** 店铺账号 */
  warehouseCode?: string;
}

/** ShopWarehousePageResp */
export interface ShopWarehousePageResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  shopWarehouseList?: ShopWarehouseBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** ShopifyOrderBaseBean */
export interface ShopifyOrderBaseBean {
  /** 订单商品信息列表 */
  itemList?: ShopifyOrderItemBean[];
  /** 订单信息 */
  order?: ShopifyOrderBean0;
}

/** ShopifyOrderBean */
export interface ShopifyOrderBean {
  /** 平台单号 */
  code?: string;
  /** 店铺 */
  shop?: string;
}

/** ShopifyOrderBean0 */
export interface ShopifyOrderBean0 {
  /** 买家邮箱 */
  buyerAccountEmail?: string;
  /**
   * 买家账号ID
   * @format int64
   */
  buyerAccountId?: number;
  /** 买家账号名 */
  buyerAccountName?: string;
  /** 指定物流 */
  buyerChooseLogistics?: string;
  /** 买家留言 */
  buyerMessage?: string;
  /** 买家实付金额 */
  buyerPayAmount?: number;
  /** 买家运费 */
  buyerPayShipAmount?: number;
  /** 买家备注 */
  buyerRemark?: string;
  /** 取消原因 */
  cancelReason?: string;
  /** 优惠券 */
  coupons?: string;
  /** 销售额币种 */
  currency?: string;
  /** 客服备注 */
  customerRemark?: string;
  /** 优惠金额 */
  discountAmount?: number;
  /** 订单付款状态 */
  financialStatus?: string;
  /** 订单付款状态名称 */
  financialStatusName?: string;
  /** 订单发货状态 */
  fulfillmentStatus?: string;
  /** 订单发货状态名称 */
  fulfillmentStatusName?: string;
  /** 订单号 */
  orderCode?: string;
  /**
   * 发货时间(北京)
   * @format date-time
   */
  orderDeliveryTime?: string;
  /**
   * orderId
   * @format int64
   */
  orderId?: number;
  /** 风险标识 */
  orderRisk?: string;
  /**
   * 订购时间（北京时区）
   * @format date-time
   */
  orderingTime?: string;
  /**
   * 付款时间（北京时区）
   * @format date-time
   */
  paymentTime?: string;
  /** 平台订单标签 */
  platformOrderTags?: string;
  /** 推送状态 */
  pushStatus?: string;
  /** 推送状态名称 */
  pushStatusName?: string;
  /** 收件人区/县 */
  receiverAddressArea?: string;
  /** 收件人城市 */
  receiverAddressCity?: string;
  /** 收件人国家 */
  receiverAddressCountry?: string;
  /** 收件人国家编码 */
  receiverAddressCountryCode?: string;
  /** 收件人地址详情1 */
  receiverAddressDetail1?: string;
  /** 收件人地址详情2 */
  receiverAddressDetail2?: string;
  /** 收件人门牌号 */
  receiverAddressHouseNumber?: string;
  /** 收件人邮编 */
  receiverAddressPostCode?: string;
  /** 收件人省份 */
  receiverAddressState?: string;
  /** 收件人省份编码 */
  receiverAddressStateCode?: string;
  /** 收件人街道 */
  receiverAddressStreet?: string;
  /** 收件人邮箱 */
  receiverEmail?: string;
  /** 收件人手机 */
  receiverMobilePhone?: string;
  /** 收件人姓名 */
  receiverName?: string;
  /** 收件人电话 */
  receiverPhone?: string;
  /** 退款总额 */
  refundedTotalAmount?: number;
  /**
   * 订单自发货状态
   * @format int32
   */
  selfDeliveryStatus?: number;
  /** 订单自发货状态名称 */
  selfDeliveryStatusName?: string;
  /** 店铺名称 */
  shopName?: string;
  /** 站点 */
  site?: string;
  /** 订单总额（消费额） */
  totalAmount?: number;
  /** 订单总额（不含税） */
  totalExcludingTaxAmount?: number;
  /** 订单税费 */
  totalTaxAmount?: number;
}

/** ShopifyOrderCommonReq */
export interface ShopifyOrderCommonReq {
  /** 平台单号 */
  orderBeanList?: ShopifyOrderBean[];
}

/** ShopifyOrderDetailResp */
export interface ShopifyOrderDetailResp {
  /** 订单商品信息列表 */
  itemList?: ShopifyOrderItemBean[];
  /** 日志 */
  operationLogBeans?: OperationLogBean[];
  /** 订单信息 */
  order?: ShopifyOrderBean0;
}

/** ShopifyOrderEditItemRemarkReq */
export interface ShopifyOrderEditItemRemarkReq {
  /**
   * 订单行号
   * @format int64
   */
  lineItemId?: number;
  /** 平台单号 */
  orderCode?: string;
  /** 备注 */
  remark?: string;
  /** 店铺 */
  shop?: string;
}

/** ShopifyOrderEditRemarkReq */
export interface ShopifyOrderEditRemarkReq {
  /** 平台单号 */
  orderCode?: string;
  /** 备注 */
  remark?: string;
  /** 店铺 */
  shop?: string;
}

/** ShopifyOrderFetchOrderReq */
export type ShopifyOrderFetchOrderReq = object;

/** ShopifyOrderItemBean */
export interface ShopifyOrderItemBean {
  /**
   * 购买数量
   * @format int32
   */
  buyQuantity?: number;
  /** 币种 */
  currency?: string;
  /** 物品地 */
  goodsLocation?: string;
  /** 组合品多行sku数据 */
  itemSkuBeanList?: ShopifyOrderItemSkuBean[];
  /**
   * lineItemId
   * @format int64
   */
  lineItemId?: number;
  /** MSKU */
  msku?: string;
  /**
   * orderId
   * @format int64
   */
  orderId?: number;
  /** 平台商品图片URL */
  platformProductImageUrl?: string;
  /** 平台商品名称 */
  platformProductName?: string;
  /**
   * productId--itemId
   * @format int64
   */
  productId?: number;
  /** 商品链接 */
  productLink?: string;
  /** 商品名称 */
  productName?: string;
  /** 商品单价 */
  productPrice?: number;
  /** 备注 */
  remark?: string;
  /** skuCode */
  skuCode?: string;
  /** supplySku */
  supplySku?: string;
  /** 跟踪号 */
  trackingNumber?: string;
}

/** ShopifyOrderItemSkuBean */
export interface ShopifyOrderItemSkuBean {
  /** 商品名称 */
  productName?: string;
  /** skuCode */
  skuCode?: string;
  /** supplySku */
  supplySku?: string;
}

/** ShopifyOrderQueryListReq */
export interface ShopifyOrderQueryListReq {
  /** 币种 */
  currency?: string;
  /** 订单付款状态 */
  financialStatusList?: string[];
  /** 订单发货状态 */
  fulfillmentStatusList?: string[];
  /** MSKU */
  msku?: string;
  /**
   * MSKU为空:1-是；0-否
   * @format int32
   */
  mskuIsNull?: number;
  /** 平台单号 */
  orderCodes?: string[];
  /** 订单风险标识 */
  orderRisks?: string[];
  /**
   * 页数
   * @format int32
   * @min 1
   * @exclusiveMin false
   */
  pageNum: number;
  /**
   * 每页数量
   * @format int32
   * @max 100
   * @exclusiveMax false
   */
  pageSize: number;
  /**
   * 付款时间-结束
   * @format date
   */
  paymentTimeEnd?: string;
  /**
   * 付款时间-开始
   * @format date
   */
  paymentTimeStart?: string;
  /** 推送状态 */
  pushStatus?: string;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 店铺 */
  shopNames?: string[];
  /** 站点 */
  sites?: string[];
  /** SKU */
  supplySku?: string;
}

/** ShopifyOrderQueryListResp */
export interface ShopifyOrderQueryListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 结果集 */
  records?: ShopifyOrderBaseBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** SkuParam */
export interface SkuParam {
  /**
   * 库存数
   * @format int32
   */
  inventory?: number;
  /** 销售SKU */
  sellerSku?: string;
  /** 供应链SKU */
  supplySku?: string;
}

/** SkuStockInfo */
export interface SkuStockInfo {
  /**
   * 现有库存
   * @format int32
   */
  inventory?: number;
  /** 供应链sku编码 */
  productSku?: string;
  /**
   * 单据数量
   * @format int32
   */
  qty?: number;
}

/** SmInfo */
export interface SmInfo {
  /** 配送方式 */
  smCode?: string;
  /** 配送方式名称 */
  smNameCn?: string;
}

/** SpInfo */
export interface SpInfo {
  /** 是否选中 */
  checked?: boolean;
  /** 配送方式信息 */
  shipInfos?: ShipInfo[];
  /** 承运商编码 */
  spCode?: string;
  /** 承运商名称 */
  spName?: string;
}

/** StatusStatistics */
export interface StatusStatistics {
  /**
   * 废弃
   * @format int32
   */
  abandon?: number;
  /**
   * 全部
   * @format int32
   */
  all?: number;
  /**
   * 异常
   * @format int32
   */
  error?: number;
  /**
   * 已收货
   * @format int32
   */
  receive?: number;
  /**
   * 待收货
   * @format int32
   */
  waitReceive?: number;
}

/** StockItem */
export interface StockItem {
  /**
   * 可用库存数量
   * @format int32
   */
  availableQuantity?: number;
  /** 分配池编码 */
  poolCode?: string;
  /** 分配池名称 */
  poolName?: string;
  /** SKU编码 */
  skuCode?: string;
  /** SKU名称 */
  skuName?: string;
  /** 供应链SKU编码 */
  supplySku?: string;
  /**
   * 次品数量
   * @format int32
   */
  unsellableQuantity?: number;
  /** 仓库编码 */
  warehouseCode?: string;
}

/** StockItemBean */
export interface StockItemBean {
  /**
   * 可用库存数量
   * @format int32
   */
  availableQuantity?: number;
  /**
   * 锁定库存数量
   * @format int32
   */
  lockedQuantity?: number;
  /** 库存池编码 */
  poolCode?: string;
  /** 库存池名称 */
  poolName?: string;
  /**
   * 预占库存数量
   * @format int32
   */
  reservedQuantity?: number;
  /** SKU编码 */
  skuCode?: string;
  /** SKU名称 */
  skuName?: string;
  /** supplySku编码 */
  supplySku?: string;
  /**
   * 总库存数量
   * @format int32
   */
  totalQuantity?: number;
  /**
   * 在库未上架数量
   * @format int32
   */
  unShelveQuantity?: number;
  /**
   * 不可售数量
   * @format int32
   */
  unsellableQuantity?: number;
  /** 仓库编码 */
  warehouseCode?: string;
  /** 仓库名称 */
  warehouseName?: string;
}

/** SupplySkuListBean */
export interface SupplySkuListBean {
  /**
   * 可用库存
   * @format int32
   */
  availableInventory?: number;
  /** 箱规-高(外箱) */
  cartonHeight?: number;
  /** 箱规-长(外箱) */
  cartonLength?: number;
  /**
   * 箱规-单箱数量
   * @format int32
   */
  cartonNum?: number;
  /** 箱规-单箱重量-外箱 */
  cartonWeight?: number;
  /** 箱规-宽(外箱) */
  cartonWidth?: number;
  /** 中文报关品名（必填） */
  declareName?: string;
  /** 英文报关品名（必填） */
  declareNameEn?: string;
  /** 产品高度cm-包装 */
  productHeight?: number;
  /** 图片 */
  productImageUrl?: string;
  /** 产品长度cm-包装 */
  productLength?: number;
  /**
   * 产品状态: 0:不可用,1:可用,2:开发产品
   * @format int32
   */
  productStatus?: number;
  /** 名称CN */
  productTitle?: string;
  /** 名称CN */
  productTitleEn?: string;
  /**
   * 商品类型 1：产品；2：物料
   * @format int32
   */
  productType?: number;
  /** 商品类型名称 1：产品；2：物料 */
  productTypeDesc?: string;
  /** 毛重 */
  productWeight?: number;
  /** 产品宽度cm-包装 */
  productWidth?: number;
  /**
   * 销售状态: 1-不在售 2-在售
   * @format int32
   */
  saleStatus?: number;
  /** msku */
  sellerSku?: string;
  /** 商品中心 唯一编码 */
  skuCode?: string;
  /** 供应链SKU */
  supplySku?: string;
}

/** SupplySkuListQueryReq */
export interface SupplySkuListQueryReq {
  /** 收件人国家 */
  buyerCountryCode?: string;
  /** 关键字 供应链产品名称/SKU */
  keyword?: string;
  /**
   * 页数
   * @format int32
   * @min 1
   * @exclusiveMin false
   */
  pageNum: number;
  /**
   * 每页数量
   * @format int32
   * @max 100
   * @exclusiveMax false
   */
  pageSize: number;
  /** 库存池 */
  poolCodes?: string[];
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 是否查询库存 */
  searchInventory?: boolean;
  /** 关联keyword，空为全部；1-产品SKU；2-供应链SKU；3-产品名称 */
  searchType?: string;
  /**
   * 共享（0-全部（个人+共享） 1-共享 2-个人，默认0）
   * @format int32
   */
  share?: number;
  /** 店铺 */
  shop?: string;
  /** 站点 */
  site?: string;
  /** 供应链SKU/SKU 查询 */
  skuList?: string[];
  /** 仓库编码 */
  warehouseCode?: string;
}

/** SupplySkuListQueryResp */
export interface SupplySkuListQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 列表 */
  records?: SupplySkuListBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** SupplySkuQueryResp */
export interface SupplySkuQueryResp {
  supplySkuItemList?: Item[];
}

/** SupplySkuWarehouseReq */
export interface SupplySkuWarehouseReq {
  /**
   * 页数
   * @format int32
   * @min 1
   * @exclusiveMin false
   */
  pageNum: number;
  /**
   * 每页数量
   * @format int32
   * @max 100
   * @exclusiveMax false
   */
  pageSize: number;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 是否查询库存 */
  searchInventory?: boolean;
  /**
   * 共享（0-全部（个人+共享） 1-共享 2-个人，默认1）
   * @format int32
   */
  share?: number;
  /** 供应链SKU/SKU 查询 */
  supplySkuList?: string[];
  /** 仓库编码 */
  warehouseCode?: string;
}

/** SyncGcOrderInfoReq */
export interface SyncGcOrderInfoReq {
  /** 客户编码 */
  customerCode: string;
  /** 订单编码 */
  orderCode: string;
}

/** TaskBusinessTaskBean */
export interface TaskBusinessTaskBean {
  /** 订单号/业务单号 */
  businessCode?: string;
  /**
   * 补偿执行时间
   * @format date-time
   */
  compensateTime?: string;
  /**
   * 完成时间，处理中为空
   * @format date-time
   */
  completeTime?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 错误信息 */
  errorMsg?: string;
  /** 执行结果（成功说明、失败原因、处理中等） */
  executeResult?: string;
  /**
   * 主键ID
   * @format int64
   */
  id?: number;
  /** 模块 */
  module?: string;
  /**
   * 是否需要补偿：0-不需要，1-需要
   * @format int32
   */
  needCompensate?: number;
  /** 操作人员 */
  operator?: string;
  /** 操作人员 */
  operatorName?: string;
  /** 处理内容 */
  processContent?: string;
  /** 备注 */
  remark?: string;
  /**
   * 重试次数
   * @format int32
   */
  retryCount?: number;
  /** 任务状态：0-待处理，1-处理中，2-成功，3-失败 */
  status?: string;
  /** 任务状态：0-待处理，1-处理中，2-成功，3-失败 */
  statusDesc?: string;
  /** 任务编号，如 TASK000001 */
  taskCode?: string;
  /** 操作类型编码 */
  taskType?: string;
  /** 任务类型（展示名，由操作类型映射） */
  taskTypeDesc?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** TransferOrderAttachmentBean */
export interface TransferOrderAttachmentBean {
  /** 文件名称 */
  fileName?: string;
  /** 文件地址 */
  fileUrl?: string;
}

/** TransferOrderBatchAbandonReq */
export interface TransferOrderBatchAbandonReq {
  /** 调拨单号列表 */
  codes: string[];
}

/** TransferOrderBatchSubmitReq */
export interface TransferOrderBatchSubmitReq {
  /** 提交项列表，每项与单条 /submit 入参一致 */
  items: TransferOrderSubmitReq[];
}

/** TransferOrderCartonBean */
export interface TransferOrderCartonBean {
  /** 箱号 */
  boxNo?: string;
  /**
   * 装箱数量
   * @format int32
   */
  boxNum?: number;
  /** 高 */
  high?: number;
  /**
   * 主键
   * @format int64
   */
  id?: number;
  /** 长 */
  length?: number;
  /** 毛重 */
  roughWeight?: number;
  /** 产品sku */
  skuCode?: string;
  /** 供应链SKU */
  supplySku?: string;
  /** 宽 */
  wide?: number;
}

/** TransferOrderCartonBean0 */
export interface TransferOrderCartonBean0 {
  /** 箱号 */
  boxNo?: string;
  /**
   * 装箱数量
   * @format int32
   */
  boxNum?: number;
  /** 高 */
  high?: number;
  /**
   * 主键
   * @format int64
   */
  id?: number;
  /** 长 */
  length?: number;
  /** 毛重 */
  roughWeight?: number;
  /** 产品sku */
  skuCode?: string;
  /** 供应链SKU */
  supplySku?: string;
  /** 宽 */
  wide?: number;
}

/** TransferOrderCommonReq */
export interface TransferOrderCommonReq {
  /** 调拨单号 */
  code?: string;
}

/** TransferOrderConfirmReq */
export interface TransferOrderConfirmReq {
  /** 调拨单主键 id 列表 */
  ids: number[];
}

/** TransferOrderDetailQueryResp */
export interface TransferOrderDetailQueryResp {
  /**
   * 实际出库日期
   * @format date
   */
  actualDeliveryDate?: string;
  /** 调入仓 */
  arrivalWarehouseCode?: string;
  /** 调入仓名称 */
  arrivalWarehouseName?: string;
  /** 附件信息 */
  attachmentList?: TransferOrderAttachmentBean[];
  /** 承运商编码 */
  carrierCode?: string;
  /** 承运商名称 */
  carrierName?: string;
  /** 调拨单号 */
  code?: string;
  /** 创建人 */
  createBy?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人名称 */
  creatorName?: string;
  /**
   * 预计抵达日期
   * @format date
   */
  deliveryDate?: string;
  /**
   * 装箱类型  [1-每箱一个SKU (原厂包装)，2-每箱不止一个SKU (混装)，3-所有商品装于一个箱子]
   * @format int32
   */
  encaseType?: number;
  /**
   * 预计出库日期
   * @format date
   */
  executorDate?: string;
  /**
   * 预计出运日期
   * @format date
   */
  expectShipmentDate?: string;
  /**
   * 主键
   * @format int64
   */
  id?: number;
  /** 入库单箱唛附件 */
  inboundBoxAttachments?: TransferOrderAttachmentBean[];
  /** 调入仓入库单号 */
  inboundNo?: string;
  /** 调入仓入库单状态 */
  inboundStatus?: string;
  /** 调入仓入库单状态名称 */
  inboundStatusDesc?: string;
  /** 调拨单明细 */
  itemList?: TransferOrderItemBean[];
  /** 拣货失败说明 */
  jjPickErrMsg?: string;
  /** 日志 */
  operationLogBeans?: OperationLogBean[];
  /** 调出仓库出库单号 */
  outboundNo?: string;
  /** 调出仓库出库单状态 */
  outboundStatus?: string;
  /** 调出仓库出库单状态名称 */
  outboundStatusDesc?: string;
  /** 锁库状态 */
  pickDesc?: string;
  /** 推送失败原因 */
  pushFailureReason?: string;
  /** 推送状态  0和空和null=未推送、1=推送中、2=推送成功、3=推送失败 */
  pushStatus?: string;
  /** 推送状态  0和空和null=未推送、1=推送中、2=推送成功、3=推送失败 */
  pushStatusDesc?: string;
  /** 备注 */
  remark?: string;
  /** 物流方式 */
  shippingMethod?: string;
  /** 物流跟踪号 */
  trackingNo?: string;
  /**
   * 调拨单大状态
   * @format int32
   */
  transferBigStatus?: number;
  /** 调拨单大状态名称 */
  transferBigStatusDesc?: string;
  /**
   * 调拨单状态
   * @format int32
   */
  transferStatus?: number;
  /** 调拨单状态名称 */
  transferStatusDesc?: string;
  /** 调拨单类型：ONLINE -- 线上；OFFLINE -- 线下 */
  transferType?: string;
  /** 调出仓 */
  warehouseCode?: string;
  /** 调出仓名称 */
  warehouseName?: string;
}

/** TransferOrderExportReq */
export interface TransferOrderExportReq {
  /** 调拨单号 */
  code?: string;
  /** 调拨单号 */
  codeKeyWord?: string;
  /**
   * 导出类型 1-调拨单装箱明细 2-线下渠道调拨单列表
   * @format int32
   */
  exportType?: number;
}

/** TransferOrderInboundReq */
export interface TransferOrderInboundReq {
  /** 附件信息 */
  attachmentList?: TransferOrderAttachmentBean[];
  /** 调拨单号 */
  code?: string;
}

/** TransferOrderItemBean */
export interface TransferOrderItemBean {
  /**
   * 可调拨量
   * @format int32
   */
  availableQuantity?: number;
  /** 外箱高 */
  cartonHeight?: number;
  /** 外箱长 */
  cartonLength?: number;
  /** 装箱明细 */
  cartonList?: TransferOrderCartonBean[];
  /**
   * 单箱数量
   * @format int32
   */
  cartonNum?: number;
  /** 单箱重量-外箱毛重 */
  cartonWeight?: number;
  /** 外箱宽 */
  cartonWidth?: number;
  /** 英文报关名 */
  declareNameEn?: string;
  /**
   * 主键
   * @format int64
   */
  id?: number;
  /** 产品高度cm-包装 */
  productHeight?: number;
  /** 产品图片 */
  productImageUrl?: string;
  /** 产品长度cm-包装 */
  productLength?: number;
  /** 产品名称 */
  productName?: string;
  /**
   * 商品类型 1：产品；2：物料
   * @format int32
   */
  productType?: number;
  /** 商品类型名称 1：产品；2：物料 */
  productTypeDesc?: string;
  /** 产品毛重 */
  productWeight?: number;
  /** 产品宽度cm-包装 */
  productWidth?: number;
  /**
   * 调拨数量
   * @format int32
   */
  quantity?: number;
  /**
   * 备注
   * @minLength 0
   * @maxLength 100
   */
  remark?: string;
  /** SKU */
  skuCode?: string;
  /** 供应链SKU */
  supplySku?: string;
  /** 总体积 */
  volumeTotal?: number;
  /** 总体积重 */
  volumeWeightTotal?: number;
  /** 总实物重(kg) */
  weightTotal?: number;
}

/** TransferOrderListBean */
export interface TransferOrderListBean {
  /**
   * 实际出库日期
   * @format date
   */
  actualDeliveryDate?: string;
  /** 调入仓 */
  arrivalWarehouseCode?: string;
  /** 调入仓名称 */
  arrivalWarehouseName?: string;
  /** 承运商编码 */
  carrierCode?: string;
  /** 承运商名称 */
  carrierName?: string;
  /** 调拨单号 */
  code?: string;
  /** 创建人 */
  createBy?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人名称 */
  creatorName?: string;
  /**
   * 预计出库日期
   * @format date
   */
  executorDate?: string;
  /**
   * 预计出运日期
   * @format date
   */
  expectShipmentDate?: string;
  /**
   * 主键
   * @format int64
   */
  id?: number;
  /** 调入仓入库单号 */
  inboundNo?: string;
  /** 调入仓入库单状态 */
  inboundStatus?: string;
  /** 调入仓入库单状态名称 */
  inboundStatusDesc?: string;
  /** 调拨单明细 */
  itemList?: TransferOrderItemBean[];
  /** 拣货失败说明 */
  jjPickErrMsg?: string;
  /** 调出仓库出库单号 */
  outboundNo?: string;
  /** 调出仓库出库单状态 */
  outboundStatus?: string;
  /** 调出仓库出库单状态名称 */
  outboundStatusDesc?: string;
  /** 拣货状态 */
  pickDesc?: string;
  /** 推送失败原因 */
  pushFailureReason?: string;
  /** 推送状态  0和空和null=未推送、1=推送中、2=推送成功、3=推送失败 */
  pushStatus?: string;
  /** 推送状态  0和空和null=未推送、1=推送中、2=推送成功、3=推送失败 */
  pushStatusDesc?: string;
  /** 备注 */
  remark?: string;
  /** 发货标识 */
  sendIdentifier?: string;
  sendIdentifierDesc?: string;
  /** 物流方式 */
  shippingMethod?: string;
  /** 物流方式名称 */
  shippingMethodName?: string;
  /** 物流跟踪号 */
  trackingNo?: string;
  /**
   * 调拨单大状态
   * @format int32
   */
  transferBigStatus?: number;
  /** 调拨单大状态名称 */
  transferBigStatusDesc?: string;
  /**
   * 调拨单状态
   * @format int32
   */
  transferStatus?: number;
  /** 调拨单状态名称 */
  transferStatusDesc?: string;
  /** 调拨单类型：ONLINE -- 线上；OFFLINE -- 线下 */
  transferType?: string;
  /** 调出仓 */
  warehouseCode?: string;
  /** 调出仓名称 */
  warehouseName?: string;
}

/** TransferOrderListQueryReq */
export interface TransferOrderListQueryReq {
  /** 调入仓 */
  arrivalWarehouseCode?: string;
  /**
   * 大状态
   * @format int32
   */
  bigTransferStatus?: number;
  /** 调拨单号 */
  code?: string;
  codeList?: string[];
  /** 创建人 */
  createBy?: string;
  /**
   * 创建时间结束
   * @format date-time
   */
  createTimeEnd?: string;
  /**
   * 创建时间开始
   * @format date-time
   */
  createTimeStart?: string;
  /** 调入仓入库单号 */
  inboundNo?: string;
  /** 调出仓库出库单号 */
  outboundNo?: string;
  /**
   * 页数
   * @format int32
   * @min 1
   * @exclusiveMin false
   */
  pageNum: number;
  /**
   * 每页数量
   * @format int32
   * @max 100
   * @exclusiveMax false
   */
  pageSize: number;
  /**
   * 拣货状态
   * @format int32
   */
  pick?: number;
  /** 推送状态 0未推送 1推送中 2 推送成功 3推送失败 */
  pushStatus?: string;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /**
   * 发货标识 CN_WAREHOUSE 中仓
   * FACTORY_DIRECT 工厂直发
   * VIRTUAL_TRANSFER 虚仓调拨
   */
  sendIdentifier?: string;
  /** 物流方式 */
  shippingMethod?: string;
  /** 物流跟踪号 */
  trackingNo?: string;
  /**
   * 状态
   * @format int32
   */
  transferStatus?: number;
  /** 调拨单类型：ONLINE -- 线上；OFFLINE -- 线下 */
  transferType?: string;
  /** 调出仓 */
  warehouseCode?: string;
}

/** TransferOrderListQueryResp */
export interface TransferOrderListQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 列表 */
  recordList?: TransferOrderListBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** TransferOrderPushReq */
export interface TransferOrderPushReq {
  /** 备注信息 */
  codeList?: string[];
}

/** TransferOrderRemarkReq */
export interface TransferOrderRemarkReq {
  /** 调拨单号 */
  code?: string;
  /** 备注信息 */
  remark?: string;
}

/** TransferOrderSaveItem */
export interface TransferOrderSaveItem {
  /** ASIN/Item ID */
  asin?: string;
  /**
   * 可调拨量
   * @format int32
   */
  availableQuantity?: number;
  /** 外箱高 */
  cartonHeight?: number;
  /** 外箱长 */
  cartonLength?: number;
  /**
   * 单箱数量
   * @format int32
   */
  cartonNum?: number;
  /** 单箱重量 */
  cartonWeight?: number;
  /** 外箱宽 */
  cartonWidth?: number;
  /** 英文报关名 */
  declareNameEn?: string;
  /** FNSKU/UPC */
  fnsku?: string;
  /** 产品图片 */
  productImageUrl?: string;
  /** 产品名称 */
  productName?: string;
  /**
   * 调拨数量
   * @format int32
   */
  quantity?: number;
  /**
   * 备注
   * @minLength 0
   * @maxLength 100
   */
  remark?: string;
  /** SKU */
  skuCode?: string;
  /** 供应链SKU */
  supplySku?: string;
  /** 总体积 */
  volumeTotal?: number;
  /** 总体积重 */
  volumeWeightTotal?: number;
  /** 总实物重(kg) */
  weightTotal?: number;
}

/** TransferOrderSaveReq */
export interface TransferOrderSaveReq {
  /** 调入仓库 */
  arrivalWarehouseCode?: string;
  /** 附件信息 */
  attachmentList?: TransferOrderAttachmentBean[];
  /**
   * 预计抵达日期
   * @format date
   */
  deliveryDate?: string;
  /**
   * 预计出库日期
   * @format date
   */
  executorDate?: string;
  /**
   * 预计出运日期
   * @format date
   */
  expectShipmentDate?: string;
  /** 调拨单明细 */
  itemList?: TransferOrderSaveItem[];
  /**
   * 备注
   * @minLength 0
   * @maxLength 500
   */
  remark?: string;
  /** 发货标识 */
  sendIdentifier?: string;
  /** 物流方式 */
  shippingMethod?: string;
  /** 调出仓库 */
  warehouseCode?: string;
}

/** TransferOrderStatusStatisticsResp */
export interface TransferOrderStatusStatisticsResp {
  errorStatusCountMap?: Record<string, number>;
  statusStatistics?: OrderListStatusStatistics;
}

/** TransferOrderSubmitReq */
export interface TransferOrderSubmitReq {
  /** 装箱信息 */
  cartonList?: TransferOrderCartonBean0[];
  /** 调出单号 */
  code?: string;
  /**
   * 装箱类型  [1-每箱一个SKU (原厂包装)，2-每箱不止一个SKU (混装)，3-所有商品装于一个箱子]
   * @format int32
   */
  encaseType?: number;
  /**
   * id
   * @format int64
   */
  id?: number;
  /**
   * 备注
   * @minLength 0
   * @maxLength 500
   */
  remark?: string;
}

/** TransferOrderUploadAttachmentReq */
export interface TransferOrderUploadAttachmentReq {
  /** 附件信息 */
  attachmentList?: TransferOrderAttachmentBean[];
  /** 调拨单号 */
  code?: string;
}

/** TransferPlanOrderAuditReq */
export interface TransferPlanOrderAuditReq {
  /** 计划单单号 */
  code?: string;
  /** 待审核明细：须与当前单据行一一对应，可修改审核数量、调出仓 */
  items?: Item[];
}

/** TransferPlanOrderBatchCodeReq */
export interface TransferPlanOrderBatchCodeReq {
  /** 计划单号列表 */
  codes?: string[];
}

/** TransferPlanOrderCodeReq */
export interface TransferPlanOrderCodeReq {
  /** 计划单号 */
  code?: string;
}

/** TransferPlanOrderDetailResp */
export interface TransferPlanOrderDetailResp {
  /** 审核人（姓名；member_code 为 system 时展示为「系统」） */
  auditBy?: string;
  /**
   * 审核时间
   * @format date-time
   */
  auditTime?: string;
  /** 单据编码 */
  code?: string;
  /** 创建人（姓名；member_code 为 system 时展示为「系统」） */
  createBy?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /**
   * 主键
   * @format int64
   */
  id?: number;
  /** 计划专员 member_code */
  productPlannerCode?: string;
  /** 计划专员姓名（有则展示，否则回退为 code） */
  productPlannerName?: string;
  /**
   * SKU数量
   * @format int32
   */
  skuLineCount?: number;
  /** 单据状态 */
  status?: string;
  /** 单据状态中文 */
  statusLabel?: string;
  /** 提交人（姓名；member_code 为 system 时展示为「系统」） */
  submitBy?: string;
  /**
   * 提交时间
   * @format date-time
   */
  submitTime?: string;
  /**
   * 申请数量
   * @format int32
   */
  totalApplyQty?: number;
  /**
   * 审核数量
   * @format int32
   */
  totalAuditQty?: number;
  /** 修改人（姓名；member_code 为 system 时展示为「系统」） */
  updateBy?: string;
  /**
   * 修改时间
   * @format date-time
   */
  updateTime?: string;
}

/** TransferPlanOrderExportReq */
export interface TransferPlanOrderExportReq {
  /** 勾选的计划单号（exportType=1 优先） */
  codes?: string[];
  /**
   * 1 列表头+明细 2 当前单据明细表
   * @format int32
   */
  exportType?: number;
  /** 列表导出筛选（exportType=1 且无 codes 时使用） */
  listQuery?: TransferPlanOrderListQueryReq;
  /** 详情导出：计划单号（exportType=2 必填） */
  planCode?: string;
}

/** TransferPlanOrderItemListResp */
export interface TransferPlanOrderItemListResp {
  /** 明细行 */
  items?: _[];
}

/** TransferPlanOrderItemReq */
export interface TransferPlanOrderItemReq {
  /** 计划单号 */
  code?: string;
}

/** TransferPlanOrderListBean */
export interface TransferPlanOrderListBean {
  /** 审核人（姓名；member_code 为 system 时展示为「系统」） */
  auditBy?: string;
  /**
   * 审核时间
   * @format date-time
   */
  auditTime?: string;
  /** 单据编码 */
  code?: string;
  /** 创建人（姓名；member_code 为 system 时展示为「系统」） */
  createBy?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /**
   * 主键
   * @format int64
   */
  id?: number;
  /** 计划专员 member_code */
  productPlannerCode?: string;
  /** 计划专员姓名（有则展示，否则回退为 code） */
  productPlannerName?: string;
  /**
   * SKU数量
   * @format int32
   */
  skuLineCount?: number;
  /** 单据状态 code */
  status?: string;
  /** 单据状态中文 */
  statusLabel?: string;
  /** 提交人（姓名；member_code 为 system 时展示为「系统」） */
  submitBy?: string;
  /**
   * 提交时间
   * @format date-time
   */
  submitTime?: string;
  /**
   * 申请数量
   * @format int32
   */
  totalApplyQty?: number;
  /**
   * 审核数量
   * @format int32
   */
  totalAuditQty?: number;
  /** 修改人（姓名；member_code 为 system 时展示为「系统」） */
  updateBy?: string;
  /**
   * 修改时间
   * @format date-time
   */
  updateTime?: string;
}

/** TransferPlanOrderListQueryReq */
export interface TransferPlanOrderListQueryReq {
  /** 单据编码，模糊 */
  codeKeyword?: string;
  /**
   * 页数
   * @format int32
   * @min 1
   * @exclusiveMin false
   */
  pageNum: number;
  /**
   * 每页数量
   * @format int32
   * @max 100
   * @exclusiveMax false
   */
  pageSize: number;
  /** 计划专员 member_code */
  productPlannerCode?: string;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 单据状态 TransferPlanOrderStatusEnum.code */
  status?: string;
}

/** TransferPlanOrderListQueryResp */
export interface TransferPlanOrderListQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 列表 */
  recordList?: TransferPlanOrderListBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** TransferPlanOrderOutStockReq */
export interface TransferPlanOrderOutStockReq {
  /** 调出仓编码 */
  outWarehouseCode?: string;
  /** 供应链 SKU */
  supplySku?: string;
}

/** TransferPlanOrderOutStockResp */
export interface TransferPlanOrderOutStockResp {
  /**
   * 调出仓可用库存（供应链 SKU）
   * @format int32
   */
  availableQty?: number;
}

/** TransferPlanOrderSaveReq */
export interface TransferPlanOrderSaveReq {
  /** 计划单单号：新增留空由服务端生成；修改必填（主单统一以 code 定位） */
  code?: string;
  /** 明细 */
  items?: Item[];
  /** 计划专员 member_code */
  productPlannerCode?: string;
}

/** UpdateMskuMatchInfoReq */
export interface UpdateMskuMatchInfoReq {
  /** erp订单编号列表 */
  erpCodeList: string[];
}

/** UploadAttachmentBean */
export interface UploadAttachmentBean {
  /**
   * 附件类型（空为普通附件；1 - 指定装箱附件；2 - 订单详情附件； 3 - 领用装箱单附件；4 - 领用拣货单附件；5 - 面单
   * @format int32
   */
  attachmentType?: number;
  /** 文件名称 */
  fileName?: string;
  /** 文件地址 */
  fileUrl?: string;
}

/** UploadReq */
export interface UploadReq {
  /** 上传地址名字 */
  fileName?: string;
  /** 绝对路径 */
  fileUrl?: string;
  /** 上传地址 */
  ossKey?: string;
}

/** WarehouseBean */
export interface WarehouseBean {
  /** 仓库编码 */
  warehouseCode?: string;
  /** 仓库名称 */
  warehouseName?: string;
}

/** WarehouseBumperBean */
export interface WarehouseBumperBean {
  /** 订单编号 */
  orderCode?: string;
  /** 包装号集合 */
  packageNoList?: string;
  /**
   * 箱数量
   * @format int32
   */
  packageQty?: number;
  /** 托盘编号 */
  palletNo?: string;
  /** 尺寸 */
  size?: string;
  /** 重量 */
  weight?: number;
}

/** WarehouseBumperPageResp */
export interface WarehouseBumperPageResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 笼装板记录列表 */
  recordList?: WarehouseBumperBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** WarehouseBumperQueryReq */
export interface WarehouseBumperQueryReq {
  /** 订单编码 */
  orderCode?: string;
  /**
   * 页数
   * @format int32
   * @min 1
   * @exclusiveMin false
   */
  pageNum: number;
  /**
   * 每页数量
   * @format int32
   * @max 100
   * @exclusiveMax false
   */
  pageSize: number;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
}

/** WarehouseCommonQueryReq */
export interface WarehouseCommonQueryReq {
  /**
   * 是否中仓 0-否 1-是
   * @format int32
   */
  centerWarehouse?: number;
  /**
   * 启用状态 0-禁用 1-启用
   * @format int32
   */
  status?: number;
  /** 仓库编号 */
  warehouseCode?: string;
  /** 仓库类型 PLATFORM-平台仓 THIRD-三方仓 SELF-自营仓 SUPPLIER-供应商仓 */
  warehouseType?: string;
}

/** WarehouseDeliveryFileBean */
export interface WarehouseDeliveryFileBean {
  /** 附件名称 */
  attachmentName?: string;
  /** 下载路径 */
  fileUrl?: string;
  /** 更新时间 */
  updateTimeStr?: string;
}

/** WarehouseDeliveryMapResp */
export interface WarehouseDeliveryMapResp {
  /** 发货方式 */
  paramMap?: Record<string, NavigationDeliveryParam[]>;
}

/** WarehouseDeliveryOrderResp */
export interface WarehouseDeliveryOrderResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 提货单记录列表 */
  recordList?: WarehouseDeliveryFileBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** WarehouseLogisticsTrajectoryBean */
export interface WarehouseLogisticsTrajectoryBean {
  /** 物流轨迹记录详细列表 */
  itemList?: Item[];
  /** 最新状态 */
  latestCodeInfo?: string;
  /** 最新位置 */
  latestLocation?: string;
  /** 跟踪号 */
  trackingNumber?: string;
}

/** WarehouseLogisticsTrajectoryResp */
export interface WarehouseLogisticsTrajectoryResp {
  /** 物流轨迹记录列表 */
  recordList?: WarehouseLogisticsTrajectoryBean[];
}

/** WarehouseOrderBaseInfoBean */
export interface WarehouseOrderBaseInfoBean {
  /**
   * 状态: 100-待出库 300-已出库 500-异常 600-作废
   * @format int32
   */
  bigStatus?: number;
  /** 状态: 100-待出库 300-已出库 500-异常 600-作废 */
  bigStatusDesc?: string;
  button?: Button;
  /** 仓配订单号 */
  code?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** ERP订单号 */
  erpCode?: string;
  /** 错误原因 */
  errorRemark?: string;
  /**
   * 是否拆分附件
   * @format int32
   */
  isCutAtt?: number;
  /** 是否拆分附件 */
  isCutAttDesc?: string;
  /** 销售订单追踪单号 */
  moreSaleCodeTrackNum?: boolean;
  /**
   * 出库时间
   * @format date-time
   */
  outTime?: string;
  /** 备注 */
  remark?: string;
  /** 销售订单号 */
  saleCode?: string;
  /** 销售订单参考单号 */
  saleCodeRefNum?: string;
  /** 销售订单追踪单号 */
  saleCodeTrackNum?: string;
  /** 销售订单备注 */
  saleRemarkList?: ListOrderRemark[];
  /** 服务单号 */
  serviceCode?: string;
  /** 配送方式 */
  shippingCode?: string;
  /** 配送方式 */
  shippingDesc?: string;
  /** 来源单据类型：JJ / ERP */
  sourceType?: string;
  /**
   * 状态: 100-待确认 200-已确认 300-已出库 500-异常 600-作废
   * @format int32
   */
  status?: number;
  /** 状态: 100-待确认 200-已确认 300-已出库 500-异常 600-作废 */
  statusDesc?: string;
  /** 仓配系统仓配单号 */
  systemCode?: string;
  /** 仓配系统销售订单号 */
  systemSaleCode?: string;
  /**
   * 仓配系统: 1-易仓 2-谷仓
   * @format int32
   */
  systemType?: number;
  /** 仓配系统: 1-易仓 2-谷仓 */
  systemTypeDesc?: string;
  /**
   * 仓配类型: 1-销售仓配 2-领用仓配'
   * @format int32
   */
  type?: number;
  /** 仓配类型: 1-销售仓配 2-领用仓配' */
  typeDesc?: string;
  /** 仓库编码 */
  warehouseCode?: string;
  /** 仓库描述 */
  warehouseDesc?: string;
  /** 运单号 */
  waybillNo?: string;
  /** 重量 */
  weight?: number;
}

/** WarehouseOrderDetailResp */
export interface WarehouseOrderDetailResp {
  /** 附件信息 */
  attachmentList?: OrderAttachment[];
  /** 仓库订单基本信息 */
  baseInfo?: WarehouseOrderBaseInfoBean;
  /** 费用明细 */
  feeDetail?: WoFeeDetail;
  /** 谷仓转单信息 */
  guCangTransferSlipOrderBean?: GuCangTransferSlipOrderBean;
  /** 日志信息 */
  logBeanList?: OperationLogBean[];
  /** 出库单信息 */
  odoDetailResp?: OdoDetailResp;
  /** 销售订单基本信息 */
  orderDetailResp?: OrderDetailResp;
  /** 装箱信息 */
  packInfoList?: WoPackInfo[];
}

/** WarehouseOrderListQueryReq */
export interface WarehouseOrderListQueryReq {
  /**
   * 创建时间-结束
   * @format date-time
   */
  createTimeEnd?: string;
  /**
   * 创建时间-开始
   * @format date-time
   */
  createTimeStart?: string;
  /**
   * 是否剪裁了附件: 0-否 1-是
   * @format int32
   */
  isCutAtt?: number;
  /** 关键字 仓配订单/销售订单号/销售参考号/仓配系统销售单号/服务单号 */
  keyword?: string;
  /**
   * 大状态: 100-待出库 300-已出库 500-异常 600-作废
   * @format int32
   */
  orderBigStatus?: number;
  /**
   * 订单类型: 0-红人发样单 1-线下订单 2-TT订单
   * @format int32
   */
  orderType?: number;
  /**
   * 是否指定装箱附件附件: 0-否 1-是
   * @format int32
   */
  packingAttachmentStatus?: number;
  /**
   * 页数
   * @format int32
   * @min 1
   * @exclusiveMin false
   */
  pageNum: number;
  /**
   * 每页数量
   * @format int32
   * @max 100
   * @exclusiveMax false
   */
  pageSize: number;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 单号列表 */
  searchCodeList?: string[];
  /**
   * 仓配类型: 1-销售出库单 2-销售订单号 3-销售参考号 4-第三方销售订单号 5-第三方出库单号 6-服务号 7-OA单号 8-领用单号 9-跟踪号 10-运单号
   * @format int32
   */
  searchType?: number;
  /** 订单状态 */
  statusList?: number[];
  /**
   * 仓配系统: 1-易仓 2-谷仓
   * @format int32
   */
  systemType?: number;
  /**
   * 仓配类型: 1-销售仓配 2-领用仓配'
   * @format int32
   */
  type?: number;
  /** 发货仓库 */
  warehouseCode?: string;
}

/** WarehouseOrderListQueryResp */
export interface WarehouseOrderListQueryResp {
  code?: string;
  errorStatusCountMap?: Record<string, number>;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  recordList?: WarehouseOrderBaseInfoBean[];
  statusStatistics?: WarehouseOrderListStatusStatistics;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** WarehouseOrderListStatusStatistics */
export interface WarehouseOrderListStatusStatistics {
  /** @format int32 */
  abandon?: number;
  /** @format int32 */
  all?: number;
  /** @format int32 */
  confirm?: number;
  /** @format int32 */
  error?: number;
  /** @format int32 */
  outWarehouse?: number;
  /** @format int32 */
  processing?: number;
  /** @format int32 */
  waitOut?: number;
}

/** WarehouseRuleOutBean */
export interface WarehouseRuleOutBean {
  /** 承运商 */
  carrier?: string;
  /** 发货方法 1-FBA 2-中仓直发 3-海外仓直发 */
  deliveryCode?: string;
  /** 流程编码 */
  flowCode?: string;
  /** 物流编码 */
  shippingCode?: string;
  /** 供应链SKU */
  supplySkuList?: string[];
  /** 仓库编码 */
  warehouseCode?: string;
}

/** WarehouseShip */
export interface WarehouseShip {
  /** 是否选中 */
  checked?: boolean;
  /** 承运商信息 */
  spInfos?: SpInfo[];
  /** 仓库编码 */
  warehouseCode?: string;
  /** 仓库名称 */
  warehouseName?: string;
}

/** WarehouseShipListQueryReq */
export interface WarehouseShipListQueryReq {
  /** 是否选中 */
  checkEd?: boolean;
  /**
   * 发货方法 1-FBA 2-中仓直发 3-海外仓直发
   * @format int32
   */
  deliveryType?: number;
  /**
   * 订单类型 0-红人发样单 1-线下订单 2-TT订单 3-内购订单 4-shopify
   * @format int32
   */
  orderType?: number;
  /** 配送方式 */
  smCode?: string;
  /** 承运商 */
  spCode?: string;
  /** 仓库编码 */
  warehouseCode?: string;
}

/** WarehouseShipResp */
export interface WarehouseShipResp {
  warehouseShipList?: WarehouseShip[];
}

/** WarehouseVatBean */
export interface WarehouseVatBean {
  /**
   * 生效时间
   * @format date-time
   */
  effectiveTime?: string;
  /** eori */
  eori?: string;
  /**
   * 失效时间
   * @format date-time
   */
  expirationTime?: string;
  /**
   * 状态
   * @format int32
   */
  status?: number;
  /** vat */
  vat?: string;
}

/** WmsOutboundBackItem */
export interface WmsOutboundBackItem {
  batchNo?: string;
  /** @format int32 */
  emitQuantity?: number;
  exceptionFlag?: string;
  exceptionMessage?: string;
  operatorId?: string;
  operatorName?: string;
  qualityStatus?: string;
  supplySku?: string;
  warehouseCode?: string;
}

/** WmsOutboundBackMessageBean */
export interface WmsOutboundBackMessageBean {
  abnormalReason?: string;
  address1?: string;
  address2?: string;
  address3?: string;
  area?: string;
  carrier?: string;
  city?: string;
  company?: string;
  country?: string;
  countryCode?: string;
  /** @format date-time */
  createTime?: string;
  /** @format date-time */
  deliveryTime?: string;
  description?: string;
  destinationWarehouse?: string;
  exceptionFlag?: string;
  exceptionMessage?: string;
  houseNumber?: string;
  itemList?: WmsOutboundBackItem[];
  key?: string;
  orderStatus?: string;
  outboundNo?: string;
  /** @format int32 */
  outboundType?: number;
  packages?: WmsOutboundBackPackage[];
  platform?: string;
  province?: string;
  recipientEmail?: string;
  recipientName?: string;
  recipientPhone?: string;
  /** @format int32 */
  retryTimes?: number;
  /** @format date-time */
  sendTime?: string;
  shippingMethod?: string;
  shippingWarehouseCode?: string;
  source?: string;
  sourceSystem?: string;
  status?: string;
  store?: string;
  traceId?: string;
  trackingNumber?: string;
  weight?: string;
  wmsOrderCode?: string;
  zipcode?: string;
}

/** WmsOutboundBackPackage */
export interface WmsOutboundBackPackage {
  boxHeight?: number;
  boxLength?: number;
  boxMarkNo?: string;
  boxNo?: string;
  boxWidth?: number;
  fbaBoxMarkNo?: string;
  /** @format int32 */
  productVarietyCount?: number;
  sku?: BoxSku[];
  trackingNumber?: string;
  weight?: number;
}

/** WoCommonExpenses */
export interface WoCommonExpenses {
  /** 金额 */
  fee?: string;
  /** 费用类型 */
  feeType?: string;
  /** 计费时间 */
  time?: string;
  /** 单位 */
  unit?: string;
}

/** WoFeeDetail */
export interface WoFeeDetail {
  /** 尾程费用 */
  finalChargeList?: WoCommonExpenses[];
  /** 其他费用 */
  otherChargeList?: WoCommonExpenses[];
  /** 库内费用 */
  warehouseExpensesList?: WoCommonExpenses[];
  /** 箱唛费 */
  woPackCharge?: WoPackCharge;
}

/** WoOrderRemarkSaveReq */
export interface WoOrderRemarkSaveReq {
  /** 仓配订单codeList */
  codeList: string[];
  /** 备注 */
  remark: string;
}

/** WoPackCharge */
export interface WoPackCharge {
  /** 物流忘收附加费用 */
  logisticsForgetSurcharge?: string;
  /** 箱号 */
  number?: string;
  /** 箱唛费 */
  packageMaiCharge?: string;
  /** 箱规描述 */
  packageSpec?: string;
  /** 跟踪单号 */
  trackingNum?: string;
  /** 重量 */
  weight?: string;
}

/** WoPackInfo */
export interface WoPackInfo {
  /** FBA箱唛号 */
  fbaPackageMaiNum?: string;
  /**
   * 序号
   * @format int32
   */
  no?: number;
  /** 序列号数量 */
  noQty?: string;
  /** 箱号 */
  number?: string;
  /** 箱唛号 */
  packageMaiNum?: string;
  /** 箱规描述 */
  packageSpec?: string;
  /** 商品编码 */
  productSku?: string;
  /**
   * 数量
   * @format int32
   */
  qty?: number;
  /** 跟踪单号 */
  trackingNum?: string;
  /** 重量 */
  weight?: number;
}

/** WoPlaceOrderReq */
export interface WoPlaceOrderReq {
  /** `地址1` */
  address?: string;
  /** `地址2` */
  address2?: string;
  /** `县、区` */
  area?: string;
  /**
   * 买家指定配送结束时间
   * @format date-time
   */
  buyerDeliveryEndTime?: string;
  /**
   * 买家指定配送开始时间
   * @format date-time
   */
  buyerDeliveryStartTime?: string;
  /** `城市` */
  city?: string;
  /** 出库单号 */
  code?: string;
  /** `公司` */
  company?: string;
  /** `国家` */
  country?: string;
  /** `邮箱` */
  email?: string;
  /** eori */
  eori?: string;
  /** `门牌号` */
  houseNumber?: string;
  /** `收件人信姓名` */
  name?: string;
  /** `电话` */
  phone?: string;
  /** `省份` */
  province?: string;
  /** `税号` */
  taxNumber?: string;
  /** VAT */
  vat?: string;
  /** `邮编` */
  zipcode?: string;
}

/** WoPlaceOrderResp */
export interface WoPlaceOrderResp {
  /** `地址1` */
  address?: string;
  /** `地址2` */
  address2?: string;
  /** `县、区` */
  area?: string;
  /**
   * 买家指定配送结束时间
   * @format date-time
   */
  buyerDeliveryEndTime?: string;
  /**
   * 买家指定配送开始时间
   * @format date-time
   */
  buyerDeliveryStartTime?: string;
  /** 渠道 */
  channel?: string;
  /** `城市` */
  city?: string;
  /** 出库单号 */
  code?: string;
  /** `公司` */
  company?: string;
  /** `国家` */
  country?: string;
  /** `邮箱` */
  email?: string;
  /** eori */
  eori?: string;
  /** 销售订单号 */
  erpCode?: string;
  /** `门牌号` */
  houseNumber?: string;
  /** `收件人信姓名` */
  name?: string;
  /** `电话` */
  phone?: string;
  /** `省份` */
  province?: string;
  /** 参考单号 */
  refNo?: string;
  /** `收件人税号` */
  taxNumber?: string;
  /** VAT */
  vat?: string;
  /** 仓库编码 */
  warehouseCode?: string;
  /** 仓库名称 */
  warehouseName?: string;
  /** `邮编` */
  zipcode?: string;
}

/** WoShippingMarkGenerateReq */
export interface WoShippingMarkGenerateReq {
  /** 仓配订单号 */
  code: string;
  /** 订单号 */
  erpCode?: string;
  /** 装箱明细 */
  packageLineList: PackageLineReq[];
  /** 参考单号 */
  refNo: string;
  /**
   * shipFrom
   * @minLength 0
   * @maxLength 200
   */
  shipFrom?: string;
  /** 收货地址 */
  shipTo: ShipAddressReq;
}

/** WoShippingMarkGenerateResp */
export interface WoShippingMarkGenerateResp {
  /** 仓配订单号 */
  code?: string;
  /** 生成结果 */
  result?: GenerateResult[];
}

/** WoShippingMarkParseReq */
export interface WoShippingMarkParseReq {
  /** 仓配订单号 */
  code: string;
  /** 箱唛pdf文件 */
  shippingMarkList: UploadReq[];
  /** 箱唛类型 */
  shippingMarkType?: 'WM-CA' | 'WM-US';
}

/** WoShippingMarkParseResp */
export interface WoShippingMarkParseResp {
  /** 仓配订单号 */
  code?: string;
  /** 解析结果 */
  result?: ParseResult[];
}

/** WoUpdateTrackingNumReq */
export interface WoUpdateTrackingNumReq {
  /** 仓配订单号 */
  code: string;
  /** 物流跟踪号 */
  trackingNum: string;
}

/** WsPackageInfo */
export interface WsPackageInfo {
  /** 箱唛号 */
  boxMark?: string;
  /**
   * 必填序号
   * @format int32
   */
  boxNo?: number;
  /** 报关面单附件 */
  customsFile?: UploadReq[];
  /**
   * 报关面单ID
   * @format int32
   */
  customsFileId?: number;
  /** 物流面单附件 */
  logisticsFile?: UploadReq[];
  /**
   * 物流面单附件ID
   * @format int32
   */
  logisticsFileId?: number;
  /** 装箱商品列表 */
  packingLineList?: PackingLineList[];
  /** 货件标签附件 */
  shipmentFile?: UploadReq[];
  /**
   * 货件标签ID
   * @format int32
   */
  shipmentFileId?: number;
}

/** WsProductInfo */
export interface WsProductInfo {
  /** 合规负责人编码 */
  euroTermsCode?: string;
  /** FNSKU */
  fnSku?: string;
  /** 海关编码 */
  hsCode?: string;
  /**
   * 换标数量
   * @format int32
   */
  labelNum?: number;
  /**
   * 内件货物总数量
   * @format int32
   */
  labelReplacementQty?: number;
  /** 报价 */
  postalPrice?: number;
  /** 单价 */
  price?: string;
  /** SKU换标编码 */
  productCode?: string;
  /** 申报价值 (USD) */
  productDeclaredValue?: string;
  /** 商品名称 */
  productName?: string;
  /** 必填商品编码 */
  productSku?: string;
  /**
   * 商品数量
   * @format int32
   */
  quantity?: number;
  /** SKU换标标签附件 */
  rebrandSkuFile?: UploadReq[];
  /**
   * SKU换标标签ID
   * @format int32
   */
  rebrandSkuFileId?: number;
  /** 商品SKU */
  skuCode?: string;
  /** 建议售价 */
  suggestPrice?: number;
}

/** giftOrder */
export interface GiftOrder {
  /** erpCode */
  erpCode?: string;
  /** 商品信息 */
  itemInfoList?: OrderSaveItemInfo[];
}

/** CisResult«QuerySkuStockDetailResp» */
export interface CisResultQuerySkuStockDetailResp {
  code?: string;
  message?: string;
  result?: QuerySkuStockDetailResp;
  success?: boolean;
  traceId?: string;
}

/** CommonResp«CommonExportResp» */
export interface CommonRespCommonExportResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: CommonExportResp;
  traceId?: string;
}

/** CommonResp«DirectFactoryWorkOrderAddReq» */
export interface CommonRespDirectFactoryWorkOrderAddReq {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: DirectFactoryWorkOrderAddReq;
  traceId?: string;
}

/** CommonResp«ErpFlowDetailQueryResp» */
export interface CommonRespErpFlowDetailQueryResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: ErpFlowDetailQueryResp;
  traceId?: string;
}

/** CommonResp«ErpOrderPreCheckInventoryResp» */
export interface CommonRespErpOrderPreCheckInventoryResp {
  code?: string;
  enMessage?: string;
  message?: string;
  /** ERP订单预检库存响应 */
  result?: ErpOrderPreCheckInventoryResp;
  traceId?: string;
}

/** CommonResp«FulfillmentBiPageResp» */
export interface CommonRespFulfillmentBiPageResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: FulfillmentBiPageResp;
  traceId?: string;
}

/** CommonResp«GucangPackageListResp» */
export interface CommonRespGucangPackageListResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: GucangPackageListResp;
  traceId?: string;
}

/** CommonResp«ImportDataResp» */
export interface CommonRespImportDataResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: ImportDataResp;
  traceId?: string;
}

/** CommonResp«ImportTemplateQueryResp» */
export interface CommonRespImportTemplateQueryResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: ImportTemplateQueryResp;
  traceId?: string;
}

/** CommonResp«InventoryAllotItemResp» */
export interface CommonRespInventoryAllotItemResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: InventoryAllotItemResp;
  traceId?: string;
}

/** CommonResp«List«DirectFactoryWorkOrderDeliveryReq»» */
export interface CommonRespListDirectFactoryWorkOrderDeliveryReq {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: DirectFactoryWorkOrderDeliveryReq[];
  traceId?: string;
}

/** CommonResp«List«DirectFactoryWorkOrderSupplierListResp»» */
export interface CommonRespListDirectFactoryWorkOrderSupplierListResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: DirectFactoryWorkOrderSupplierListResp[];
  traceId?: string;
}

/** CommonResp«List«EnumDictItemResp请求参数对象»» */
export interface CommonRespListEnumDictItemResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: EnumDictItemResp[];
  traceId?: string;
}

/** CommonResp«List«ErpDictBean»» */
export interface CommonRespListErpDictBean {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: ErpDictBean[];
  traceId?: string;
}

/** CommonResp«List«ErpOrderStockQueryResp»» */
export interface CommonRespListErpOrderStockQueryResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: ErpOrderStockQueryResp[];
  traceId?: string;
}

/** CommonResp«List«FulfillmentBiDashboardDistributionResp»» */
export interface CommonRespListFulfillmentBiDashboardDistributionResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: FulfillmentBiDashboardDistributionResp[];
  traceId?: string;
}

/** CommonResp«List«FulfillmentBiDashboardSummaryResp»» */
export interface CommonRespListFulfillmentBiDashboardSummaryResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: FulfillmentBiDashboardSummaryResp[];
  traceId?: string;
}

/** CommonResp«List«InventoryPoolResp»» */
export interface CommonRespListInventoryPoolResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: InventoryPoolResp[];
  traceId?: string;
}

/** CommonResp«List«LabelInfoBean»» */
export interface CommonRespListLabelInfoBean {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: LabelInfoBean[];
  traceId?: string;
}

/** CommonResp«List«Map«string,object»»» */
export interface CommonRespListMapStringObject {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: Record<string, object>[];
  traceId?: string;
}

/** CommonResp«List«RuleLogListResp»» */
export interface CommonRespListRuleLogListResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: RuleLogListResp[];
  traceId?: string;
}

/** CommonResp«List«WarehouseBean»» */
export interface CommonRespListWarehouseBean {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: WarehouseBean[];
  traceId?: string;
}

/** CommonResp«List«WarehouseRuleOutBean»» */
export interface CommonRespListWarehouseRuleOutBean {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: WarehouseRuleOutBean[];
  traceId?: string;
}

/** CommonResp«LogisticsWarehouseVatQueryListResp» */
export interface CommonRespLogisticsWarehouseVatQueryListResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: LogisticsWarehouseVatQueryListResp;
  traceId?: string;
}

/** CommonResp«OrderBatchAuthResp» */
export interface CommonRespOrderBatchAuthResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: OrderBatchAuthResp;
  traceId?: string;
}

/** CommonResp«OrderBatchCommonResp» */
export interface CommonRespOrderBatchCommonResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: OrderBatchCommonResp;
  traceId?: string;
}

/** CommonResp«OrderBatchSendNoticeResp» */
export interface CommonRespOrderBatchSendNoticeResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: OrderBatchSendNoticeResp;
  traceId?: string;
}

/** CommonResp«OrderBatchToWaitSendResp» */
export interface CommonRespOrderBatchToWaitSendResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: OrderBatchToWaitSendResp;
  traceId?: string;
}

/** CommonResp«OrderPreCheckStockResp» */
export interface CommonRespOrderPreCheckStockResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: OrderPreCheckStockResp;
  traceId?: string;
}

/** CommonResp«OrderQueryStockAvailableResp» */
export interface CommonRespOrderQueryStockAvailableResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: OrderQueryStockAvailableResp;
  traceId?: string;
}

/** CommonResp«OrderUpdateMskuResp» */
export interface CommonRespOrderUpdateMskuResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: OrderUpdateMskuResp;
  traceId?: string;
}

/** CommonResp«OtherInboundOrderDetailReq» */
export interface CommonRespOtherInboundOrderDetailReq {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: OtherInboundOrderDetailReq;
  traceId?: string;
}

/** CommonResp«OtherOutboundOrderDetailReq» */
export interface CommonRespOtherOutboundOrderDetailReq {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: OtherOutboundOrderDetailReq;
  traceId?: string;
}

/** CommonResp«QueryStockQueryResp» */
export interface CommonRespQueryStockQueryResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: QueryStockQueryResp;
  traceId?: string;
}

/** CommonResp«RuleBlacklistAddReq» */
export interface CommonRespRuleBlacklistAddReq {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: RuleBlacklistAddReq;
  traceId?: string;
}

/** CommonResp«RuleDetailResp» */
export interface CommonRespRuleDetailResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: RuleDetailResp;
  traceId?: string;
}

/** CommonResp«RuleListResp» */
export interface CommonRespRuleListResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: RuleListResp;
  traceId?: string;
}

/** CommonResp«RuleMultipleSuppliesAddReq» */
export interface CommonRespRuleMultipleSuppliesAddReq {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: RuleMultipleSuppliesAddReq;
  traceId?: string;
}

/** CommonResp«ShippingMethodResp» */
export interface CommonRespShippingMethodResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: ShippingMethodResp;
  traceId?: string;
}

/** CommonResp«ShopWarehousePageResp» */
export interface CommonRespShopWarehousePageResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: ShopWarehousePageResp;
  traceId?: string;
}

/** CommonResp«TransferPlanOrderOutStockResp» */
export interface CommonRespTransferPlanOrderOutStockResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: TransferPlanOrderOutStockResp;
  traceId?: string;
}

/** CommonResp«Void» */
export interface CommonRespVoid {
  code?: string;
  enMessage?: string;
  message?: string;
  traceId?: string;
}

/** CommonResp«WarehouseBumperPageResp» */
export interface CommonRespWarehouseBumperPageResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: WarehouseBumperPageResp;
  traceId?: string;
}

/** CommonResp«WarehouseDeliveryOrderResp» */
export interface CommonRespWarehouseDeliveryOrderResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: WarehouseDeliveryOrderResp;
  traceId?: string;
}

/** CommonResp«WarehouseLogisticsTrajectoryResp» */
export interface CommonRespWarehouseLogisticsTrajectoryResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: WarehouseLogisticsTrajectoryResp;
  traceId?: string;
}

/** CommonResp«WarehouseShipResp» */
export interface CommonRespWarehouseShipResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: WarehouseShipResp;
  traceId?: string;
}

/** CommonResp«WoPlaceOrderResp» */
export interface CommonRespWoPlaceOrderResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: WoPlaceOrderResp;
  traceId?: string;
}

/** CommonResp«WoShippingMarkGenerateResp» */
export interface CommonRespWoShippingMarkGenerateResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: WoShippingMarkGenerateResp;
  traceId?: string;
}

/** CommonResp«WoShippingMarkParseResp» */
export interface CommonRespWoShippingMarkParseResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: WoShippingMarkParseResp;
  traceId?: string;
}

/** CommonResp«boolean» */
export interface CommonRespBoolean {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: boolean;
  traceId?: string;
}

/** CommonResp«object» */
export interface CommonRespObject {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: object;
  traceId?: string;
}

/** CommonResp«string» */
export interface CommonRespString {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: string;
  traceId?: string;
}

/**
 * EnumDictItemResp请求参数对象
 * 枚举字典下拉参数
 */
export interface EnumDictItemResp {
  /** 枚举字典文本 */
  label?: string;
  /** 枚举字典值 */
  value?: object;
}

/** 调拨计划单明细行 */
export interface _ {
  /**
   * 申请数量
   * @format int32
   */
  applyQty?: number;
  /**
   * 审核数量
   * @format int32
   */
  auditQty?: number;
  /** 调入仓库编码（与落库 in_warehouse_code 一致） */
  inWarehouseCode?: string;
  /** 调入仓库名称 */
  inWarehouseDesc?: string;
  /**
   * 明细主键
   * @format int64
   */
  itemId?: number;
  /** 积加下推状态：not_pushed/success/fail 等 */
  jjPushStatus?: string;
  /** 积加调拨单号 */
  jjTransferCode?: string;
  /** 积加调拨单状态 */
  jjTransferStatus?: string;
  /**
   * 行号
   * @format int32
   */
  lineNo?: number;
  /** MSKU */
  msku?: string;
  /**
   * 调出仓可用库存（按明细调出仓编码计算）
   * @format int32
   */
  outStockQty?: number;
  /** 调出仓库编码（与落库 t_transfer_plan_order_item.out_warehouse_code 一致） */
  outWarehouseCode?: string;
  /** 调出仓库名称 */
  outWarehouseDesc?: string;
  /** 产品名称 */
  productName?: string;
  /** 产品SKU */
  productSku?: string;
  /** 供应链SKU */
  supplySku?: string;
  /** 未满足原因 */
  unsatisfiedReason?: string;
}
