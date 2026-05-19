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

/** AfterSalesStatisticsReq */
export interface AfterSalesStatisticsReq {
  /** 是否缓存 */
  cache?: boolean;
  /** 渠道 */
  channel?: string;
  /**
   * 结束时间
   * @format date-time
   */
  endTime?: string;
  /** 关键字（换行符号进行切割） */
  keyword?: string;
  /**
   * 关键字类型 1:产品sku 2:在线商品编码 3:seller sku 4:产品名称（支持模糊）
   * @format int32
   */
  keywordType?: number;
  /** 运营人 */
  operatorCodeList?: string[];
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
  /** 店铺账号 */
  shopCodeList?: string[];
  /** 站点 */
  site?: string;
  /**
   * 开始时间
   * @format date-time
   */
  startTime?: string;
}

/** AllChannelOrderListItem */
export interface AllChannelOrderListItem {
  /** ASIN */
  asin?: string;
  /** 买家城市 */
  buyerCity?: string;
  /** 买家国家编码 */
  buyerCountryCode?: string;
  /** 买家国家 */
  buyerCountryDesc?: string;
  /** 买家邮箱 */
  buyerEmail?: string;
  /** 买家姓名 */
  buyerName?: string;
  /** 买家电话 */
  buyerPhone?: string;
  /** 买家省份 */
  buyerProvince?: string;
  /** 买家邮编 */
  buyerZipcode?: string;
  /** 渠道 */
  channel?: string;
  /** 渠道desc */
  channelDesc?: string;
  /** 人民币交易额 */
  cnyCurrencyAmount?: number;
  /**
   * 北京创建时间
   * @format date-time
   */
  createTime?: string;
  /** 币种 */
  currency?: string;
  /** 币种desc */
  currencyDesc?: string;
  /** id */
  id?: string;
  /**
   * 原地区创建时间
   * @format date-time
   */
  localCreateTime?: string;
  /**
   * 数量
   * @format int32
   */
  numInt?: number;
  /** 订单号 */
  orderCode?: string;
  /** 订单状态 */
  orderStatus?: string;
  /** 订单状态desc */
  orderStatusDesc?: string;
  /** 原币交易额 */
  originalCurrencyAmount?: number;
  /** 父ASIN */
  parentAsin?: string;
  /**
   * 支付时间
   * @format date-time
   */
  paymentTime?: string;
  /** 单价 */
  price?: number;
  /** 商品名称 */
  productName?: string;
  /** 参考单号 */
  refNo?: string;
  /** 销售sku */
  sellerSku?: string;
  /** 配送方式 */
  shippingCode?: string;
  /** 配送方式 */
  shippingDesc?: string;
  /** 店铺 */
  shop?: string;
  /** 站点 */
  site?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /** 美元交易额 */
  usdCurrencyAmount?: number;
}

/** AllChannelOrderListQueryResp */
export interface AllChannelOrderListQueryResp {
  /** 渠道枚举 */
  channelEnums?: DictCommonBean[];
  code?: string;
  /** 国家枚举 */
  countryEnums?: DictCommonBean[];
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 记录 */
  recordList?: AllChannelOrderListItem[];
  /** 店铺枚举 */
  shopEnums?: DictCommonBean[];
  /** 站点枚举 */
  siteEnums?: DictCommonBean[];
  /** 状态枚举 */
  statusEnums?: DictCommonBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** AllInventoryAmountListReq */
export interface AllInventoryAmountListReq {
  /** 是否升序 */
  asc?: boolean;
  /** 供应链SKU/商品SKU/产品名称 */
  keyword?: string;
  /** 排序字段 */
  orderBy?: string;
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

/** AllInventoryAmountListResp */
export interface AllInventoryAmountListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  recordList?: AllInventoryAmountListRespItem[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** AllInventoryAmountListRespItem */
export interface AllInventoryAmountListRespItem {
  /**
   * 中仓库存
   * @format int32
   */
  centerInventory?: number;
  /** 中仓库存总金额 */
  centerInventoryAmount?: number;
  /**
   * 中仓在途库存
   * @format int32
   */
  centerWayInventory?: number;
  /** 中仓在途库存总金额 */
  centerWayInventoryAmount?: number;
  /**
   * 统计时间
   * @format date-time
   */
  date?: string;
  /** 图片 */
  imageUrl?: string;
  /**
   * 总库存
   * @format int32
   */
  inventory?: number;
  /** 总金额 */
  inventoryAmount?: number;
  /**
   * 平台库存
   * @format int32
   */
  platformInventory?: number;
  /** 平台库存总金额 */
  platformInventoryAmount?: number;
  /**
   * 平台在途库存
   * @format int32
   */
  platformWayInventory?: number;
  /** 平台在途库存总金额 */
  platformWayInventoryAmount?: number;
  /** 采购单价 */
  price?: number;
  /** 产品名称 */
  productName?: string;
  /** 旧易仓SKU编码 */
  productSku?: string;
  /**
   * 最近15天商品销量
   * @format int32
   */
  salesQty?: number;
  /** 商品SKU */
  skuCode?: string;
}

/** AmountSet */
export interface AmountSet {
  presentment_money?: Money;
  shop_money?: Money;
}

/** AuditHistoryItem */
export interface AuditHistoryItem {
  /** 存档编号 */
  code?: string;
  /** 下载链接 */
  downloadUrl?: string;
  /**
   * id
   * @format int64
   */
  id?: number;
  /** 操作人 */
  operatorCode?: string;
  /** 操作人 */
  optrator?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** AuditRecordBean */
export interface AuditRecordBean {
  /**
   * 推荐供应商-推荐人编号
   * @example "测试"
   */
  auditCode?: string;
  /**
   * 推荐供应商-推荐人名称
   * @example "测试"
   */
  auditStage?: string;
  /**
   * 审核状态
   * @example "PASS"
   */
  auditStatus?: string;
  /**
   * 审核时间
   * @format date-time
   * @example "2024-01-16T14:30:00"
   */
  auditTime?: string;
  /**
   * 审核备注
   * @example 111
   */
  auditorRemark?: string;
}

/** AuthItem */
export interface AuthItem {
  /**
   * 审核时间
   * @format date-time
   */
  authTime?: string;
  /** 备注 */
  remark?: string;
  /**
   * 审核结果 0-通过 1-不通过
   * @format int32
   */
  status?: number;
  /** 审核结果 0-通过 1-不通过 */
  statusDesc?: string;
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

/** BalanceTransactionBean */
export interface BalanceTransactionBean {
  exchange_rate?: number;
  id?: string;
  object?: string;
}

/** BaseInfo */
export interface BaseInfo {
  /** 备注 */
  auditRemark?: string;
  /** 审核结果 */
  auditResult?: string;
  /** 审核单号 */
  code?: string;
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
   * 部门
   * @format int64
   */
  deptId?: number;
  /** 部门名称 */
  deptName?: string;
  /** 异常原因 */
  errorRemark?: string;
  /** 审核不用过型号 */
  noPassModelList?: string[];
  /** 审核通过型号 */
  passModelList?: string[];
  /**
   * 状态: 0-待审核 1-审核通过 2-审核不通过 3-废弃 4-异常
   * @format int32
   */
  status?: number;
  /** 状态: 0-待审核 1-审核通过 2-审核不通过 3-废弃 4-异常 */
  statusDesc?: string;
  /**
   * 预测类型 1-按商品SKU预测 2-按在线商品预测
   * @format int32
   */
  type?: number;
}

/** BaseInfoReq */
export interface BaseInfoReq {
  /** 编码 */
  commandCode?: string;
  /**
   * 预计发货数量
   * @format int32
   * @min 1
   * @exclusiveMin false
   */
  estimateQty?: number;
  /** 物流方式 */
  logisticMethod?: string;
  /** 发货方式 1-中仓直发  2-工厂直发 */
  shipMethod?: string;
}

/** BaseInfoRes */
export interface BaseInfoRes {
  /** 渠道 */
  channel?: string;
  /** 渠道Desc */
  channelDesc?: string;
  /** 编码 */
  commandCode?: string;
  /**
   * 指令状态 0-代发货 1-已发货 2-作废 3-锁定 4-刷新中
   * @format int32
   */
  commandStatus?: number;
  /** 指令状态 0-代发货 1-已发货 2-作废 3-锁定 4-刷新中 */
  commandStatusDesc?: string;
  /** 默认商品SKU */
  defaultProductSku?: string;
  /**
   * 预计到货时间
   * @format date-time
   */
  estimateArriveDate?: string;
  /**
   * 预计发货数量
   * @format int32
   */
  estimateQty?: number;
  /**
   * 预计发货时间
   * @format date-time
   */
  estimateShipDate?: string;
  /** 物流方式 */
  logisticMethod?: string;
  /** 物流方式Desc */
  logisticMethodDesc?: string;
  /** 运营人员 */
  operator?: string;
  /** 原平台标识 */
  originalPlatformMark?: string;
  /** 计划人员 */
  planer?: string;
  /** 产品名称 */
  productName?: string;
  /** 发货方式 1-中仓直发  2-工厂直发 */
  shipMethod?: string;
  /** 发货方式Desc */
  shipMethodDesc?: string;
  /** 货件计划单号 */
  shipmentPlanCode?: string;
  /** 站点 */
  site?: string;
  /** 站点Desc */
  siteDesc?: string;
  skuCode?: string;
}

/** BaseIno */
export interface BaseIno {
  /** 提货单号 */
  code?: string;
  /**
   * 提货时间
   * @format date-time
   */
  pickTime?: string;
  /**
   * 提货方式: 0-中仓提货 1-物流提货
   * @format int32
   */
  pickType?: number;
  /** 提货方式: 0-中仓提货 1-物流提货 */
  pickTypeDesc?: string;
  /** 提货仓库 */
  pickWarehouseCode?: string;
  /** 提货仓库名称 */
  pickWarehouseCodeDesc?: string;
  /** 供应商编号 */
  supplierCode?: string;
  /** 供应商展示名称 */
  supplierDesc?: string;
}

/** BatchAuthResult */
export interface BatchAuthResult {
  message?: string;
  orderCode?: string;
  success?: boolean;
  thirdCode?: string;
}

/** BatchInventoryLogQueryListReq */
export interface BatchInventoryLogQueryListReq {
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

/** BatchInventoryLogQueryListReqItem */
export interface BatchInventoryLogQueryListReqItem {
  /** 操作类型 */
  applicationCode?: string;
  /** 操作时间 */
  iblAddTime?: string;
  /**
   * 批次当前库存
   * @format int32
   */
  iblQuantityAfter?: number;
  /**
   * 可用库存
   * @format int32
   */
  iblQuantityBefore?: number;
  /**
   * 库存变更
   * @format int32
   */
  iblQuantityChange?: number;
  /** 是否需报关 */
  isNeedDeclare?: string;
  /** 库位 */
  lcCode?: string;
  /**
   * 可用库存
   * @format int32
   */
  piInUsed?: number;
  /**
   * 仓库可售
   * @format int32
   */
  piSellable?: number;
  /** 产品条码 */
  productBarcode?: string;
  /** 品线 */
  productLine?: string;
  /** 产品名称 */
  productName?: string;
  /** 供应链SKU */
  productSku?: string;
  /** 入库单号 */
  receivingCode?: string;
  /** 操作单号 */
  refNo?: string;
  /** SKU编码 */
  skuCode?: string;
  /** SPU编码 */
  spuCode?: string;
  /**
   * 仓库当前库存
   * @format int32
   */
  stock?: number;
  /** 操作人 */
  userName?: string;
  /** 仓库 */
  warehouseDesc?: string;
}

/** BatchInventoryLogQueryListResp */
export interface BatchInventoryLogQueryListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  recordList?: BatchInventoryLogQueryListReqItem[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** BatchInventoryQueryListReq */
export interface BatchInventoryQueryListReq {
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

/** BatchInventoryQueryListResp */
export interface BatchInventoryQueryListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  recordList?: BatchInventoryQueryListRespItem[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** BatchInventoryQueryListRespItem */
export interface BatchInventoryQueryListRespItem {
  /**
   * 库龄
   * @format int32
   */
  age?: number;
  /** 上架时间 */
  fifoTime?: string;
  /** 锁状态 */
  holdStatus?: string;
  /**
   * 数量
   * @format int32
   */
  iblQuantity?: number;
  /**
   * 总库存
   * @format int32
   */
  inUsed?: number;
  /** 是否需报关 */
  isNeedDeclare?: string;
  /** 库位 */
  lcCode?: string;
  /**
   * 待出数量
   * @format int32
   */
  outQuantity?: number;
  /** 采购单号 */
  poCode?: string;
  /** 产品代码 */
  productBarcode?: string;
  /** 品线 */
  productLine?: string;
  /** 产品名称 */
  productName?: string;
  /** 供应链SKU */
  productSku?: string;
  /** 参考单号 */
  referenceNo?: string;
  /** 入库单号 */
  roCode?: string;
  /** SKU编码 */
  skuCode?: string;
  /** SPU编码 */
  spuCode?: string;
  /** 状态 */
  status?: string;
  /** 存货类型 */
  type?: string;
  /** 更新时间 */
  updateTime?: string;
  /** 仓库 */
  warehouseDesc?: string;
}

/** BatchSalesForecastWeekChangeStatusReq */
export interface BatchSalesForecastWeekChangeStatusReq {
  /** id列表 */
  idList: number[];
  /**
   * 状态 0-开启 1-停用
   * @format int32
   */
  status: number;
}

/** BatchUpdateAddressReq */
export interface BatchUpdateAddressReq {
  /** 箱托编码 */
  recordCode?: string;
  /** 发货地址 */
  shiFromAddress?: string;
  /** 收货地址 */
  shipToAddress?: string;
}

/** BilStatisticsInfo */
export interface BilStatisticsInfo {
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
   * 审核不通过
   * @format int32
   */
  authNoPass?: number;
  /**
   * 已预约
   * @format int32
   */
  reserved?: number;
  /**
   * 待审核
   * @format int32
   */
  waitAuth?: number;
  /**
   * 待提货
   * @format int32
   */
  waitPick?: number;
}

/** BolCarrierInfo */
export interface BolCarrierInfo {
  /** 描述 */
  description?: string;
  /** 尺寸 */
  hmx?: string;
  /** ltlClass */
  ltlClass?: string;
  nmfcNo?: string;
  /**
   * 包裹量
   * @format int32
   */
  packageCount?: number;
  /** 包裹类型 */
  packageType?: string;
  /**
   * 托盘量
   * @format int32
   */
  palletCount?: number;
  /** 托盘类型 */
  palletType?: string;
  /** 重量 */
  weight?: number;
}

/** BolDetailCarrierInfo */
export interface BolDetailCarrierInfo {
  /**
   * @minLength 0
   * @maxLength 500
   */
  description?: string;
  /**
   * @minLength 0
   * @maxLength 128
   */
  hmx?: string;
  /**
   * @minLength 0
   * @maxLength 128
   */
  ltlClass?: string;
  /**
   * @minLength 0
   * @maxLength 128
   */
  nmfc?: string;
  /**
   * @format int32
   * @max 99999999
   * @exclusiveMax false
   */
  palletQty?: number;
  ptype?: string;
  /**
   * @format int32
   * @max 99999999
   * @exclusiveMax false
   */
  totalQty?: number;
  /**
   * @max 99999999
   * @exclusiveMax false
   */
  totalWeight?: number;
  /**
   * @minLength 0
   * @maxLength 64
   */
  type?: string;
}

/** BolLadingBillBean */
export interface BolLadingBillBean {
  /**
   * Date
   * @minLength 0
   * @maxLength 64
   */
  billTime?: string;
  /** Carrier Information */
  carrierInfoList?: BolCarrierInfo[];
  /**
   * Carrier Name
   * @minLength 0
   * @maxLength 255
   */
  carrierName?: string;
  /**
   * CID#
   * @minLength 0
   * @maxLength 255
   */
  cid?: string;
  /** Cod Amount */
  codAmount?: number;
  /**
   * Customer Check Acceptable
   * @format int32
   */
  customerCheckAcceptable?: number;
  /**
   * Fee Terms
   * @minLength 0
   * @maxLength 255
   */
  feeTerms?: string;
  /**
   * Freight Charge Terms ：'3rd Party','Prepaid','Collect'
   * @minLength 0
   * @maxLength 255
   */
  freightChargeTerms?: string;
  /**
   * Freight Counted
   * @minLength 0
   * @maxLength 255
   */
  freightCounted?: string;
  /**
   * Ship To 对应的FOB 0-代表不勾选 1-代表勾选
   * @format int32
   */
  isFromFob?: number;
  /**
   * CID# 对应的FOB 0-代表不勾选 1-代表勾选
   * @format int32
   */
  isToFob?: number;
  /** bol单文件key */
  key?: string;
  /** Location No */
  locationNo?: string;
  /**
   * Master BOL:wlattached underlying BOLs
   * @format int32
   */
  materBol?: number;
  /** Customer Order Information */
  orderInfoList?: BolOrderInfo[];
  /**
   * Pro No
   * @minLength 0
   * @maxLength 255
   */
  proNo?: string;
  /** 箱托编码 */
  recordCode?: string;
  /**
   * Reference Code
   * @minLength 0
   * @maxLength 255
   */
  referenceCode?: string;
  /**
   * SCAC
   * @minLength 0
   * @maxLength 255
   */
  scac?: string;
  /**
   * Seal Number(s)
   * @minLength 0
   * @maxLength 255
   */
  sealNumber?: string;
  /**
   * Ship To
   * @minLength 0
   * @maxLength 255
   */
  shipToAddress?: string;
  /**
   * Ship From
   * @minLength 0
   * @maxLength 255
   */
  shippingAddress?: string;
  /**
   * SID#
   * @minLength 0
   * @maxLength 255
   */
  sid?: string;
  /**
   * SpecialInstructions
   * @minLength 0
   * @maxLength 255
   */
  specialInstructions?: string;
  /**
   * Third Party Freight Charges - Bill To
   * @minLength 0
   * @maxLength 255
   */
  thirdPartyBillTo?: string;
  /**
   * totals box
   * @format int32
   */
  totalBoxCount?: number;
  /** totals weight */
  totalOrderWeight?: number;
  /**
   * totals #pkgs
   * @format int32
   */
  totalPackages?: number;
  /**
   * totals pallet
   * @format int32
   */
  totalPalletNumber?: number;
  /** totals pallet weight */
  totalPalletWeight?: number;
  /**
   * Trailer No
   * @minLength 0
   * @maxLength 255
   */
  trailerNo?: string;
  /**
   * Transport Loaded
   * @minLength 0
   * @maxLength 255
   */
  tranletLoaded?: string;
}

/** BolLadingBillDetailBean */
export interface BolLadingBillDetailBean {
  /**
   * 合并数量
   * @format int32
   * @max 99999999
   * @exclusiveMax false
   */
  count?: number;
  /**
   * 混装编码
   * @minLength 0
   * @maxLength 255
   */
  mixPalletNumber?: string;
  /**
   * 参考单号
   * @minLength 0
   * @maxLength 255
   */
  referenceCode?: string;
  /**
   * 订单总箱数
   * @format int32
   * @max 99999999
   * @exclusiveMax false
   */
  totalPackageCount?: number;
  /**
   * 订单中重量
   * @max 99999999
   * @exclusiveMax false
   */
  totalWeight?: number;
  /**
   * 类型
   * @minLength 0
   * @maxLength 64
   */
  type?: string;
  /**
   * 体积
   * @max 99999999
   * @exclusiveMax false
   */
  volume?: number;
}

/** BolLadingBillItemBean */
export interface BolLadingBillItemBean {
  /** 子提单 carrier信息 */
  bolDetailCarrierInfoList?: BolDetailCarrierInfo[];
  /** 子提单明细 */
  detailList?: BolLadingBillDetailBean[];
  /**
   * bill of lading no
   * @minLength 0
   * @maxLength 64
   */
  referenceCode2?: string;
}

/** BolOrderInfo */
export interface BolOrderInfo {
  /** 订单备注 */
  additionalInfo?: string;
  /** 订单编码 */
  orderCode?: string;
  /** 托盘类型 */
  palletType?: string;
  /**
   * 订单数量
   * @format int32
   */
  totalBoxCount?: number;
  /** 订单重量 */
  totalWeight?: number;
}

/** BoxDescItem */
export interface BoxDescItem {
  /**
   * 箱号
   * @format int32
   */
  boxNumber?: number;
  /**
   * 装箱数量
   * @format int32
   */
  boxPackageQty?: number;
}

/** BoxPropertyItem */
export interface BoxPropertyItem {
  /**
   * 箱数
   * @format int32
   */
  boxNumber?: number;
  /** 毛重 */
  grossWeight?: number;
  /** 高 */
  height?: number;
  /** 长 */
  length?: number;
  /**
   * 托盘号
   * @format int32
   */
  palletNumber?: number;
  /** 宽 */
  width?: number;
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

/** CartonBean */
export interface CartonBean {
  /** 箱号 */
  cartonNo?: number[];
  /** 预计计费重 */
  expectedBillingWeight?: number;
  /** 高 */
  height?: number;
  /** 长 */
  length?: number;
  /**
   * 单个箱规箱子数
   * @format int32
   */
  oneCartonNum?: number;
  /**
   * 数量
   * @format int32
   */
  quantity?: number;
  /** 材积 */
  volume?: number;
  /** 体积 */
  volumeInCubicMeter?: number;
  /** 材积重 */
  volumeWeight?: number;
  /** 实重 */
  weight?: number;
  /** 宽 */
  width?: number;
}

/** CartonSizeBean */
export interface CartonSizeBean {
  /** 整箱规则编码 */
  code?: string;
  /** 客户名称 */
  customerCode?: string;
  /** 高 */
  height?: number;
  /** 长 */
  length?: number;
  /**
   * 出库类型(0-按件发货;1-按箱发货)
   * @format int32
   */
  outStockType?: number;
  /**
   * 数量
   * @format int32
   */
  qty?: number;
  /** 产品SKU */
  skuCode?: string;
  /** 宽 */
  width?: number;
}

/** CartonSizeDeleteReq */
export interface CartonSizeDeleteReq {
  /** 编码 */
  codeList?: string[];
}

/** CartonSizeListQueryReq */
export interface CartonSizeListQueryReq {
  /** 客户名称 */
  customerCode?: string;
  /** 关键字 商品sku/供应链sku/产品名称 */
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
  /** 商品sku编码 */
  skuCodeList?: string[];
}

/** CartonSizeListQueryResp */
export interface CartonSizeListQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  recordList?: CartonSizeListQueryRespItem[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** CartonSizeListQueryRespItem */
export interface CartonSizeListQueryRespItem {
  /** 编码 */
  code?: string;
  /** 创建人编码 */
  creatorCode?: string;
  /** 创建人编码名称 */
  creatorName?: string;
  /** 客户编码 */
  customerCode?: string;
  /** 客户名称 */
  customerName?: string;
  /** 高 */
  height?: number;
  /**
   * id
   * @format int64
   */
  id?: number;
  /** 长 */
  length?: number;
  /**
   * 出库类型(0-按件发货;1-按箱发货)
   * @format int32
   */
  outStockType?: number;
  /** 出库类型转义 */
  outStockTypeDesc?: string;
  /** 产品名称 */
  productName?: string;
  /**
   * 数量
   * @format int32
   */
  qty?: number;
  /** 箱规（cm） */
  sizeDesc?: string;
  /** 商品sku */
  skuCode?: string;
  /** 供应商sku列表 */
  supplySkuList?: string[];
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /** 更新人编码 */
  updaterCode?: string;
  /** 更新人编码名称 */
  updaterName?: string;
  /** 宽 */
  width?: number;
}

/** CartonSizeListQueryRespItemItem */
export interface CartonSizeListQueryRespItemItem {
  /** API服务商代码 */
  apsCode?: string;
  extInfoList?: ErpOrderShippingExtInfoBean[];
  /**
   * id
   * @format int64
   */
  id?: number;
  /**
   * 订单类型: 0-红人发样单 1-线下订单 2-TT订单
   * @format int32
   */
  orderType?: number;
  /** 配送方式代码 */
  shippingCode?: string;
  /** 配送方式名称 */
  shippingName?: string;
  /** 承运商编码 */
  spCode?: string;
  /** 承运商名称 */
  spName?: string;
  /**
   * 状态，0：停用，1：可用
   * @format int32
   */
  status?: number;
  /** 状态，0：停用，1：可用 */
  statusDesc?: string;
  /** 仓库编码 */
  warehouseCode?: string;
  /** 仓库名称 */
  warehouseName?: string;
}

/** CartonSizeListSaveReq */
export interface CartonSizeListSaveReq {
  /** 整箱规则列表 */
  cartonSizeList?: CartonSizeBean[];
}

/** CenterInventoryQueryListReq */
export interface CenterInventoryQueryListReq {
  /** 是否升序 */
  asc?: boolean;
  /** 品线 */
  bigCategoryName?: string;
  /** 供应链sku/商品sku/产品名称 */
  keyword?: string;
  /** 排序字段 */
  orderBy?: string;
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
  /** 仓库编码 */
  warehouseCode?: string;
  /** 仓库名称 */
  warehouseName?: string;
}

/** CenterInventoryQueryListResp */
export interface CenterInventoryQueryListResp {
  /** 品线列表 */
  bigCategoryNameList?: string[];
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  recordList?: CenterInventoryQueryListRespItem[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /** 仓库编码列表 */
  warehousCodeList?: string[];
  /** 仓库名称列表 */
  warehouseNameList?: string[];
}

/** CenterInventoryQueryListRespItem */
export interface CenterInventoryQueryListRespItem {
  /** 品线 */
  bigCategoryName?: string;
  /**
   * 可售库存
   * @format int32
   */
  canSaleInventory?: number;
  /**
   * 可用库存
   * @format int32
   */
  canUseInventory?: number;
  /**
   * 中仓库存
   * @format int32
   */
  centerInventory?: number;
  /** 图片 */
  imageUrl?: string;
  /**
   * 在途库存
   * @format int32
   */
  inWayInventory?: number;
  /** 产品名称 */
  productName?: string;
  /**
   * 采购未交数量
   * @format int32
   */
  purchaseInWayInventory?: number;
  /** 商品SKU */
  skuCode?: string;
  /** 供应链SKU */
  supplySku?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /**
   * 待出库
   * @format int32
   */
  waitOutInventory?: number;
  /**
   * 待上架
   * @format int32
   */
  waitUpInventory?: number;
  /** 仓库编码 */
  warehouseCode?: string;
  /** 仓库名称 */
  warehouseName?: string;
}

/** CentreInventoryItemResp */
export interface CentreInventoryItemResp {
  /**
   * 中仓库存
   * @format int32
   */
  inventory?: number;
  /** 供应链SKU */
  supplySku?: string;
  /**
   * 在途库存
   * @format int32
   */
  transitInventory?: number;
  /** 仓库代码 */
  warehouseCode?: string;
  /** 仓库名称 */
  warehouseName?: string;
}

/** CertificationInfoBean */
export interface CertificationInfoBean {
  /**
   * 认证证书
   * @example "ISO9001质量管理体系认证"
   */
  certificateName?: string;
  /**
   * 认证编号
   * @example "CNAS-2024-001"
   */
  certificateNumber?: string;
  /**
   * 有效期结束时间
   * @format date-time
   * @example "2020-01-01"
   */
  expDateEnd: string;
  /**
   * 有效期开始时间
   * @format date-time
   * @example "2020-01-01"
   */
  expDateStart: string;
  /**
   * 认证情况
   * @example true
   */
  isCertified?: boolean;
}

/** ClientDetailChangeStatusReq */
export interface ClientDetailChangeStatusReq {
  /** 客户编码 */
  code?: string;
  /**
   * 状态 0-合作 1-终止
   * @format int32
   */
  status?: number;
}

/** ClientDetailQueryResp */
export interface ClientDetailQueryResp {
  /**
   * 是否现金额度管理 0-否 1-是
   * @format int32
   */
  cashCreditFlag?: number;
  /** 是否现金额度管理 0-否 1-是 */
  cashCreditFlagDesc?: string;
  /** ERP客户编码 */
  code?: string;
  /** 联系方式 */
  contactWay?: string;
  /** 联系人 */
  contacts?: string;
  /** 合同签约主体 */
  contractSubject?: string;
  /** 国家编码 */
  countryCode?: string;
  /** 国家 */
  countryDesc?: string;
  /**
   * 是否信用额度管理 0-否 1-是
   * @format int32
   */
  creditFlag?: number;
  /** 是否信用额度管理 0-否 1-是 */
  creditFlagDesc?: string;
  /** CRM客户编码 */
  crmCustomerCode?: string;
  /** 贴标列表 */
  customSkuLabelBeanList?: CustomSkuLabelBean[];
  /** 交货方式 交货方式 0-FOB 1-DDP 2-ESW 3-DAP */
  deliverType?: string;
  /** 交货方式 交货方式 0-FOB 1-DDP 2-ESW 3-DAP */
  deliverTypeDesc?: string;
  /** 开发人员编码 */
  developCode?: string;
  /** 开发人员 */
  developer?: string;
  /** 邮箱 */
  email?: string;
  /**
   * 是否反向征税 0-否 1-是
   * @format int32
   */
  isReverseTax?: number;
  /** 是否反向征税 0-否 1-是 */
  isReverseTaxDesc?: string;
  /** 等级编号 */
  levelCode?: string;
  /** 等级编号 */
  levelDesc?: string;
  /** 维护人员编码 */
  maintainCode?: string;
  /** 维护人员 */
  maintainter?: string;
  /** 客户名称 */
  name?: string;
  /** 操作日志 */
  operationLogBeanList?: OperationLogBean[];
  /** 订单销售类型选择，见枚举b2b_client_order_sale_type */
  orderSaleType?: string[];
  /** 订单销售类型选择，见枚举b2b_client_order_sale_type */
  orderSaleTypeDesc?: string[];
  /**
   * 归属部门id
   * @format int64
   */
  organizationDeptId?: number;
  /** 归属部门名称 */
  organizationDeptName?: string;
  /** 客户快递付款账号列表 */
  paymentAccountBeanList?: ClientExpressPaymentAccountBean[];
  /** 收款条件编码 */
  paymentTermsCode?: string;
  /** 收款条件描述 */
  paymentTermsDesc?: string;
  /** 定价信息列表 */
  quotationPriceInfoBeanList?: QuotationPriceInfoBean[];
  /** 收件人 */
  recevicer?: string;
  /** 收件人地址 */
  recevicerAddress?: string;
  /** 收件人区域 */
  recevicerArea?: string;
  /** 收件人城市 */
  recevicerCity?: string;
  /** 收件人国家 */
  recevicerCountry?: string;
  /** 收件人国家描述 */
  recevicerCountryDesc?: string;
  /** 收件人门牌 */
  recevicerDoorplate?: string;
  /** 收件人email */
  recevicerEmail?: string;
  /** 收件人号码 */
  recevicerPhone?: string;
  /** 收件人省份 */
  recevicerProvince?: string;
  /** 收件人邮编 */
  recevicerZipCode?: string;
  /** 注册国家 */
  registeredCountry?: string;
  /** 注册国家 */
  registeredCountryDesc?: string;
  /** 销售国家 */
  saleCountry?: string;
  /** 销售国家 */
  saleCountryDesc?: string;
  /** 结算账号 */
  settlementAccount?: string;
  /** 已废弃 */
  settlementInterval?: string;
  /** 已废弃 */
  settlementIntervalDesc?: string;
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
  /**
   * 已废弃
   * @format int32
   */
  settlementType?: number;
  /** 已废弃 */
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

/** ClientDetailSaveReq */
export interface ClientDetailSaveReq {
  /**
   * 是否现金额度管理 0-否 1-是
   * @format int32
   */
  cashCreditFlag?: number;
  /** 客户编码 */
  code?: string;
  /** 联系方式 */
  contactWay?: string;
  /** 联系人 */
  contacts?: string;
  /** 合同签约主体 */
  contractSubject?: string;
  /** 国家编码 */
  countryCode?: string;
  /**
   * 是否信用额度管理 0-否 1-是
   * @format int32
   */
  creditFlag?: number;
  /** 交货方式 交货方式 0-FOB 1-DDP 2-ESW 3-DAP */
  deliverType?: string;
  /** 交货方式 交货方式 0-FOB 1-DDP 2-ESW 3-DAP */
  deliverTypeDesc?: string;
  /** 开发人员编码 */
  developCode?: string;
  /** 邮箱 */
  email?: string;
  /**
   * 是否反向征税 0-否 1-是
   * @format int32
   */
  isReverseTax?: number;
  /** 等级编号 见字典b2b_client_level */
  levelCode?: string;
  /** 维护人员编码 */
  maintainCode?: string;
  /** 客户名称 */
  name?: string;
  /** 订单销售类型选择，见枚举b2b_client_order_sale_type */
  orderSaleType?: string[];
  /** 归属部门id */
  organizationDeptId?: string;
  /** 客户快递付款账号列表 */
  paymentAccountBeanList?: DeliveryPaymentAccountBean[];
  /** 收款条件编码 */
  paymentTermsCode?: string;
  /** 收件人 */
  recevicer?: string;
  /** 收件人地址 */
  recevicerAddress?: string;
  /** 收件人区域 */
  recevicerArea?: string;
  /** 收件人城市 */
  recevicerCity?: string;
  /** 收件人国家 */
  recevicerCountry?: string;
  /** 收件人门牌 */
  recevicerDoorplate?: string;
  /** 收件人email */
  recevicerEmail?: string;
  /** 收件人号码 */
  recevicerPhone?: string;
  /** 收件人省份 */
  recevicerProvince?: string;
  /** 收件人邮编 */
  recevicerZipCode?: string;
  /** 销售国家 */
  saleCountry?: string;
  /** 销售国家 */
  saleCountryDesc?: string;
  /** 结算账号 */
  settlementAccount?: string;
  /**
   * 状态 0-合作 1-终止
   * @format int32
   */
  status?: number;
  /** 主体收款账号 */
  subjectAccount?: string;
  /** 客户类型 见字典b2b_client_type */
  type?: string;
}

/** ClientExpressPaymentAccountBean */
export interface ClientExpressPaymentAccountBean {
  /** 账单地址-国家(地区)二字码 */
  billingAddressCountry?: string;
  /** 账单地址-邮编 */
  billingAddressPostCode?: string;
  /** 客户快递付款账号 */
  expressDeliveryPaymentAccount?: string;
  /** 物流渠道 */
  logisticsChannel?: string;
  /** 支付方式 */
  paymentMethod?: string;
}

/** ClientListItem */
export interface ClientListItem {
  /**
   * 是否现金额度管理 0-否 1-是
   * @format int32
   */
  cashCreditFlag?: number;
  /** 是否现金额度管理 0-否 1-是 */
  cashCreditFlagDesc?: string;
  /** 客户编码 */
  code?: string;
  /** 联系方式 */
  contactWay?: string;
  /** 联系人 */
  contacts?: string;
  /** 合同签约主体 */
  contractSubject?: string;
  /** 国家编码 */
  countryCode?: string;
  /** 国家 */
  countryDesc?: string;
  /**
   * 是否信用额度管理 0-否 1-是
   * @format int32
   */
  creditFlag?: number;
  /** 是否信用额度管理 0-否 1-是 */
  creditFlagDesc?: string;
  /** CRM客户编码 */
  crmCustomerCode?: string;
  /** 交货方式 交货方式 0-FOB 1-DDP 2-ESW 3-DAP */
  deliverType?: string;
  /** 交货方式 交货方式 0-FOB 1-DDP 2-ESW 3-DAP */
  deliverTypeDesc?: string;
  /** 开发人员编码 */
  developCode?: string;
  /** 开发人员 */
  developer?: string;
  /** 邮箱 */
  email?: string;
  /**
   * 是否反向征税 0-否 1-是
   * @format int32
   */
  isReverseTax?: number;
  /** 是否反向征税 0-否 1-是 */
  isReverseTaxDesc?: string;
  /** 等级编号 */
  levelCode?: string;
  /** 等级编号 */
  levelDesc?: string;
  /** 维护人员编码 */
  maintainCode?: string;
  /** 维护人员 */
  maintainter?: string;
  /** 客户名称 */
  name?: string;
  /** 订单销售类型选择，见枚举b2b_client_order_sale_type */
  orderSaleType?: string[];
  /** 订单销售类型选择，见枚举b2b_client_order_sale_type */
  orderSaleTypeDesc?: string[];
  /** 归属部门id */
  organizationDeptId?: string;
  /** 归属部门名称 */
  organizationDeptName?: string;
  /** 收款条件编码 */
  paymentTermsCode?: string;
  /** 收款条件描述 */
  paymentTermsDesc?: string;
  /** 收件人 */
  recevicer?: string;
  /** 收件人地址 */
  recevicerAddress?: string;
  /** 收件人区域 */
  recevicerArea?: string;
  /** 收件人城市 */
  recevicerCity?: string;
  /** 收件人国家 */
  recevicerCountry?: string;
  /** 收件人门牌 */
  recevicerDoorplate?: string;
  /** 收件人email */
  recevicerEmail?: string;
  /** 收件人号码 */
  recevicerPhone?: string;
  /** 收件人省份 */
  recevicerProvince?: string;
  /** 收件人邮编 */
  recevicerZipCode?: string;
  /** 注册国家 */
  registeredCountry?: string;
  /** 注册国家 */
  registeredCountryDesc?: string;
  /** 销售国家 */
  saleCountry?: string;
  /** 销售国家 */
  saleCountryDesc?: string;
  /** 结算账号 */
  settlementAccount?: string;
  /** 已废弃 */
  settlementInterval?: string;
  /** 已废弃 */
  settlementIntervalDesc?: string;
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
  /**
   * 已废弃
   * @format int32
   */
  settlementType?: number;
  /** 已废弃 */
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

/** ClientListQueryReq */
export interface ClientListQueryReq {
  /**
   * 操作类型 1-新增 2-编辑
   * @format int32
   */
  actionType?: number;
  /**
   * 是否现金额度管理 0-否 1-是
   * @format int32
   */
  cashCreditFlag?: number;
  /**
   * 是否信用额度管理 0-否 1-是
   * @format int32
   */
  creditFlag?: number;
  /** 客户名称/ERP客户编码/CRM客户编码；数组多选 */
  customerKeys?: string[];
  /** 开发人员编码 */
  developCode?: string[];
  /**
   * 是否反向征税 0-否 1-是
   * @format int32
   */
  isReverseTax?: number;
  /** 客户名称/ERP客户编码/CRM客户编码 */
  keyword?: string;
  /** 维护人员编码 */
  maintainCode?: string[];
  /** 订单销售类型选择，见枚举b2b_client_order_type */
  orderSaleType?: string[];
  /** 归属部门id */
  organizationDeptId?: string;
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
   * 状态 0-合作 1-终止
   * @format int32
   */
  status?: number;
  /** 客户类型 取字典 */
  type?: string[];
}

/** ClientListQueryResp */
export interface ClientListQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 记录列表 */
  recordList?: ClientListItem[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
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

/** CommonOrderItemBean */
export interface CommonOrderItemBean {
  /** 单号 */
  code?: string;
  /** 佣金 */
  commission?: number;
  /** 发货方式 */
  deliveryCode?: string;
  /** 发货方式 */
  deliveryDesc?: string;
  /** 物品名称 */
  itemName?: string;
  /** 物料属性 */
  itemProperties?: string;
  /** 单价(查商品中心建议售价) */
  price?: string;
  /** 商品名称 */
  productName?: string;
  /** 供应链SKU */
  productSku?: string;
  /** 数量 */
  qty?: string;
  /**
   * 数量
   * @format int32
   */
  qtyInt?: number;
  /** 填写销售单价 */
  salesPrice?: number;
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
  /** 仓库 */
  warehouseCode?: string;
  /** 仓库 */
  warehouseDesc?: string;
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

/** CompetitorInfoBean */
export interface CompetitorInfoBean {
  /**
   * 公司名（全称）
   * @example "XYZ电子科技有限公司"
   */
  companyName?: string;
  /**
   * 所属国家或地区
   * @example "中国"
   */
  countryRegion?: string;
  /**
   * 市场占有率（%）
   * @example 15.5
   */
  marketShare?: number;
}

/** ConcatItem */
export interface ConcatItem {
  /** 联系地址 */
  address?: string;
  /** 英文联系地址 */
  addressEn?: string;
  /** 邮箱 */
  email?: string;
  /** 联系人 */
  name: string;
  /** 联系电话 */
  telphone: string;
}

/** CurrencyBean */
export interface CurrencyBean {
  /** 币种编码 */
  currencyCode?: string;
  /** 币种名称 */
  currencyName?: string;
  /** 币种英文名称 */
  currencyNameEn?: string;
  /** 汇率 */
  currencyRate?: number;
  /** 币种符号 */
  currencySymbol?: string;
  /**
   * 记录创建时间
   * @format date-time
   */
  recordCreateTime?: string;
  /**
   * 记录修改时间
   * @format date-time
   */
  recordUpdateTime?: string;
  /** 店铺 */
  store?: string;
}

/** CurrencyQueryResp */
export interface CurrencyQueryResp {
  /** 货币列表 */
  currencyList?: CurrencyBean[];
}

/** CustomSkuLabelBean */
export interface CustomSkuLabelBean {
  /** 五级分类编码 */
  categoryCode?: string;
  /** 五级分类 */
  categoryDesc?: string;
  /** 客户sku编码 */
  customerSkuCode?: string;
  /** ean编码 */
  eanCode?: string;
  /** gtin */
  gtin?: string;
  /** 客户产品描述 */
  productDesc?: string;
  /** 商品名称 */
  productName?: string;
  /** 客户产品名称（英文） */
  productNameEn?: string;
  /** 商品SKU */
  skuCode?: string;
  /** 客户唯一码 */
  uniqueCode?: string;
  /** upc编码 */
  upcCode?: string;
}

/** CustomTransferQueryReq */
export interface CustomTransferQueryReq {
  /** 调拨单号 */
  codeKeyWord?: string;
  /** 公司主体 */
  companyName?: string;
  /** 物流商 */
  logisticsProvider?: string;
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
  /** 查询类型(transferNO: 输入调拨单号,fbaId: 输入FBAID) */
  searchType?: 'FBA_ID' | 'TRANSFER_NO';
}

/** CustomerCreditLimitBeanRpc */
export interface CustomerCreditLimitBeanRpc {
  /** 可用额度 */
  availableLimit?: number;
  /** ERP客户编码 */
  code?: string;
  /** 币种 */
  currencyCode?: string;
  /** 客户编码 */
  customerCode?: string;
  /** 锁定额度 */
  lockedLimit?: number;
  /** 总额度 */
  totalLimit?: number;
  /** 已用额度 */
  usedLimit?: number;
  /** 已用额度比例 */
  usedRatio?: number;
  /** 用户额度比例描述 */
  userRatioDesc?: string;
}

/** CustomerCreditLimitLogBeanRpc */
export interface CustomerCreditLimitLogBeanRpc {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 记录 */
  records?: CustomerCreditLimitLogBeanRpcItem[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** CustomerCreditLimitLogBeanRpcItem */
export interface CustomerCreditLimitLogBeanRpcItem {
  /** 调整金额 */
  adjustAmount?: number;
  /** 调整小类：total_limit-总额度，used_limit-已用额度，locked_limit-锁定额度，available_limit-可用额度 */
  adjustSubtype?: string;
  /** 调整小类描述 */
  adjustSubtypeDesc?: string;
  /** 调增大类：increase-增加，decrease-扣减 */
  adjustType?: string;
  /** 调整类型描述 */
  adjustTypeDesc?: string;
  /** 调增大类源：increase-增加，decrease-扣减 */
  adjustTypeSource?: string;
  /** 调整后金额 */
  amountAfter?: number;
  /** 调整前金额 */
  amountBefore?: number;
  /** 调整后可用额度 */
  availableLimitAfter?: number;
  /** 冲销单号 */
  chargeAgainst?: string;
  /** 创建时间 */
  createTime?: string;
  /** 操作人 */
  creator?: string;
  /** 币种 */
  currencyCode?: string;
  /** 客户编码 */
  customerCode?: string;
  /**
   * 主键
   * @format int64
   */
  id?: number;
  /** 调整场景编码 */
  operation?: string;
  /** 操作描述 */
  operationDesc?: string;
  /** 关联单据号 */
  referenceNo?: string;
  /** 备注 */
  remark?: string;
  /** 来源系统如ERP、CRM */
  sourceSystem?: string;
}

/** CustomerCreditLimitLogPageReq */
export interface CustomerCreditLimitLogPageReq {
  /** 调整类型 increase-增加，decrease-扣减 */
  adjustType?: string;
  /** 客户编号 */
  customerCode?: string;
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

/** CustomerCreditLimitLogPageResp */
export interface CustomerCreditLimitLogPageResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 记录 */
  records?: CustomerCreditLimitLogBeanRpcItem[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** CustomerCreditLimitLogQueryReq */
export interface CustomerCreditLimitLogQueryReq {
  /** 冲销单号 */
  chargeAgainst?: string;
  /** 客户编码 */
  customerCode?: string;
  /** 操作类型 */
  operation?: string;
  /** 唯一编号 */
  referenceNo?: string;
}

/** CustomerCreditLimitOperationBeanRpc */
export interface CustomerCreditLimitOperationBeanRpc {
  /** 调整金额 */
  adjustAmount: number;
  /** 冲销单据(如果是 释放锁定额度 或者 增加已用额度 或 减少已用额度, 此字段必填,且必须传其关联的单据) */
  chargeAgainst?: string;
  /** 币种(全局唯一,一个客户只能有一个币种) */
  currencyCode: string;
  /** 客户编码 */
  customerCode: string;
  /** 批量调用时用于判断是否需要加/释放锁 */
  locked?: boolean;
  /**
   * 调整场景编码
   *     add_whole_credit-增加整体额度, deduct_whole_credit-扣减整体额度, add_used_credit-增加已用额度, deduct_used_credit-减少已用额度,lock_credit-锁定额度,release_lock_credit-释放锁定额度
   */
  operation: string;
  /** 调整场景描述 */
  operationDesc: string;
  /** 操作人编码(M开头员工号例如 M123218367219i46387) */
  operatorCode: string;
  /** 关联唯一值(会拿此字段做 客户编码+此字段做幂等和数据唯一校验) */
  referenceNo: string;
  /** 备注 */
  remark?: string;
  /** 来源系统如ERP、CRM */
  sourceSystem: string;
}

/** CustomerCreditLimitQueryListReq */
export interface CustomerCreditLimitQueryListReq {
  /** 关键字 */
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
}

/** CustomerCreditLimitQueryListResp */
export interface CustomerCreditLimitQueryListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 记录 */
  records?: CustomerCreditLimitQueryListRespItem[];
  /** 统计 */
  statistics?: CustomerCreditLimitQueryListRespItem;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** CustomerCreditLimitQueryListRespItem */
export interface CustomerCreditLimitQueryListRespItem {
  /** 可用额度 */
  availableLimit?: number;
  /** 币种 */
  currencyCode?: string;
  /** 客户编码 */
  customerCode?: string;
  /** 客户名称 */
  customerName?: string;
  /** 锁定额度 */
  lockedLimit?: number;
  /** 总额度 */
  totalLimit?: number;
  /** 已用额度 */
  usedLimit?: number;
  /** 已用额度比例 */
  usedRatio?: number;
  /** 用户额度比例描述 */
  userRatioDesc?: string;
}

/** CustomerDockingRelationBean */
export interface CustomerDockingRelationBean {
  /** 客户编码 */
  customerCode?: string;
  /** 客户名称 */
  customerName?: string;
  /** 客户状态描述 */
  customerStatusDesc?: string;
  /**
   * 主键
   * @format int64
   */
  id?: number;
  /** 物流专员成员编码 */
  logisticsSpecialistCode?: string;
  /** 物流专员姓名 */
  logisticsSpecialistName?: string;
  /** 订单员成员编码 */
  orderClerkCode?: string;
  /** 订单员姓名 */
  orderClerkName?: string;
  /** 销售成员编码 */
  salesCode?: string;
  /** 销售姓名 */
  salesName?: string;
  /** 销售运营成员编码 */
  salesOperationsCode?: string;
  /** 销售运营姓名 */
  salesOperationsName?: string;
}

/** CustomerDockingRelationDeleteReq */
export interface CustomerDockingRelationDeleteReq {
  /** 主键列表 */
  idList: number[];
}

/** CustomerDockingRelationQueryListReq */
export interface CustomerDockingRelationQueryListReq {
  /** 客户编码，多选 */
  customerCodeList?: string[];
  /** 是否同步下载 */
  downLoadSync?: boolean;
  /** 物流专员成员编码，多选 */
  logisticsSpecialistCodeList?: string[];
  /** 订单员成员编码，多选 */
  orderClerkCodeList?: string[];
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
  /** 销售成员编码，多选 */
  salesCodeList?: string[];
  /** 销售运营成员编码，多选 */
  salesOperationsCodeList?: string[];
}

/** CustomerDockingRelationQueryListResp */
export interface CustomerDockingRelationQueryListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 记录列表 */
  recordList?: CustomerDockingRelationBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** CustomerDockingRelationSaveReq */
export interface CustomerDockingRelationSaveReq {
  /** 客户编码 */
  customerCode: string;
  /**
   * 主键，更新时必填
   * @format int64
   */
  id?: number;
  /** 物流专员成员编码 */
  logisticsSpecialistCode?: string;
  /** 订单员成员编码 */
  orderClerkCode?: string;
  /** 销售成员编码 */
  salesCode?: string;
  /** 销售运营成员编码 */
  salesOperationsCode?: string;
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

/** CustomerProductTagUploadReq */
export interface CustomerProductTagUploadReq {
  /**
   * 操作类型 1：新增，2：修改
   * @format int32
   */
  actionType?: number;
  /** 上传地址名字 */
  fileName?: string;
  /** 绝对路径 */
  fileUrl?: string;
  /** 上传地址 */
  ossKey?: string;
}

/** CustomerSaveBean */
export interface CustomerSaveBean {
  /** 授权品牌 */
  authorizedBrands?: string;
  /** 授权区域 */
  authorizedRegion?: string;
  /** 银行账号信息-银行账号 */
  bankAccountNumber?: string;
  /** 银行账号信息-银行地址 */
  bankAddress?: string;
  /** 银行账号信息-银行名称 */
  bankName?: string;
  /** 银行账号信息-Swift Code */
  bankSwiftCode?: string;
  /** 联系方式 */
  contactWay?: string;
  /** 联系人 */
  contacts?: string;
  /** 合同签约主体 */
  contractSubject?: string;
  /** 国家编码 */
  countryCode?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /** 客户币种 */
  currencyCode?: string;
  /** 客户编码id */
  customerId?: string;
  /** 交货方式 交货方式 0-FOB 1-DDP 2-ESW 3-DAP */
  deliverType?: string;
  /** 客户快递付款账号 */
  deliveryPaymentAccountBeanList?: DeliveryPaymentAccountBean0[];
  /** 开发人员编码 */
  developCode?: string;
  /** 邮箱 */
  email?: string;
  /** 履约信息-目的国 */
  fulfillmentDestinationCountry?: string;
  /** 履约信息-交接国 */
  fulfillmentHandoverCountry?: string;
  /** 履约信息-发货要求 */
  fulfillmentShippingRequirements?: string;
  /** 履约信息-运输方式 */
  fulfillmentTransportMethod?: string;
  /** 是否一件代发 0-否 1-是 */
  isDropShipping?: string;
  /** 是否反向征税 0-否 1-是 */
  isReverseTax?: string;
  /** 等级编号 见字典b2b_client_level */
  levelCode?: string;
  /** 维护人员编码 */
  maintainCode?: string;
  /** 客户名称 */
  name?: string;
  /** 更新人 */
  operator?: string;
  /** 客户渠道类型选择，多个用英文逗号隔开，To B, To C */
  orderSaleType?: string;
  /** 归属部门id */
  organizationDeptId?: string;
  /** 收款条件 */
  paymentTermsCode?: string;
  /** 收件人信息 */
  recevicerInfo?: ReceiverInfo[];
  /** 客户地址 */
  registeredAddress?: string;
  /** 注册国家 */
  registeredCountry?: string;
  /** 注册号码 */
  registeredNo?: string;
  /** 销售国家 */
  saleCountry?: string;
  /** 销售国家描述 */
  saleCountryDesc?: string;
  /** 结算账号 */
  settlementAccount?: string;
  /** 状态 0-合作 1-终止 */
  status?: string;
  /** 客户子类型 */
  subType?: string;
  /** 主体收款账号 */
  subjectAccount?: string;
  /** 税号 */
  taxNo?: string;
  /** 客户类型 见字典b2b_client_type */
  type?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** CustomerSaveResult */
export interface CustomerSaveResult {
  /** code */
  code?: string;
  /** 客户ID */
  customerId?: string;
  /** 返回信息 */
  msg?: string;
}

/** CustomerSkuLabelListQueryBean */
export interface CustomerSkuLabelListQueryBean {
  /** 客户编码 */
  customerCode?: string;
  /** ean编码 */
  eanCode?: string;
  /** gtin */
  gtin?: string;
  /**
   * 主键
   * @format int64
   */
  id?: number;
  /** sku编码 */
  skuCode?: string;
  /** sku名称 */
  skuName?: string;
  /** 客户唯一码 */
  uniqueCode?: string;
  /** upc编码 */
  upcCode?: string;
}

/** CustomerSkuLabelListQueryResp */
export interface CustomerSkuLabelListQueryResp {
  /** 贴标列表 */
  resultList?: CustomerSkuLabelListQueryBean[];
}

/** CustomerSkuLabelQueryReq */
export interface CustomerSkuLabelQueryReq {
  /** 客户编码 */
  customerCode?: string;
}

/** CustomerSkuLabelUpdateBean */
export interface CustomerSkuLabelUpdateBean {
  /** 用户编码 */
  customerCode?: string;
  /** 客户sku编码 */
  customerSkuCode?: string;
  /** EAN编码 */
  eanCode?: string;
  /** gtin */
  gtin?: string;
  /**
   * ID
   * @format int64
   */
  id?: number;
  /** 客户产品描述 */
  productDesc?: string;
  /** 客户产品名称（英文） */
  productNameEn?: string;
  /** sku编码 */
  skuCode?: string;
  /** 客户唯一码 */
  uniqueCode?: string;
  /** UPC编码 */
  upcCode?: string;
}

/** CustomerSkuLabelUpdateReq */
export interface CustomerSkuLabelUpdateReq {
  /** 更新列表 */
  reqList?: CustomerSkuLabelUpdateBean[];
}

/** CustomsBatchDownloadReq */
export interface CustomsBatchDownloadReq {
  /** 合同协议号 */
  contractNoList?: string[];
  /**
   * 创建时间 -结束
   * @format date
   */
  createDateEnd?: string;
  /**
   * 创建时间 -开始
   * @format date
   */
  createDateStart?: string;
  /** 勾选id列表 */
  idList?: number[];
  /**
   * 类型 1-明细 2-主体
   * @format int32
   */
  type?: number;
}

/** CustomsDeclarationEntityBean */
export interface CustomsDeclarationEntityBean {
  /** 地址 */
  address?: string;
  /** 唯一编码 */
  code?: string;
  /** 公司名称 */
  companyName?: string;
  /** 海关编码 */
  customsCode?: string;
  /** 境内发货人 */
  domesticConsignor?: string;
  /** 境内发货人代码 */
  domesticConsignorCode?: string;
  /** 文件key */
  fileKey?: string;
  /** 印章文件名 */
  fileName?: string;
  /** 境外收货人 */
  foreignConsignee?: string;
  /**
   * 是否默认
   * @format int32
   */
  isDefault?: number;
  /** 是否默认 */
  isDefaultDesc?: string;
  /** 联系方式 */
  phone?: string;
  /** 生产销售单位 */
  producerSeller?: string;
  /** 生产销售单位代码 */
  producerSellerCode?: string;
  /** 交易币种 */
  transactionCurrency?: string;
  /** 印章链接 */
  url?: string;
}

/** CustomsDeclarationEntityDefaultReq */
export interface CustomsDeclarationEntityDefaultReq {
  /** 唯一编码 */
  code?: string;
}

/** CustomsDeclarationEntityDetailQueryResp */
export interface CustomsDeclarationEntityDetailQueryResp {
  /** 报关主体明细 */
  result?: CustomsDeclarationEntityBean;
}

/** CustomsDeclarationEntityListQueryResp */
export interface CustomsDeclarationEntityListQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 报关主体列表 */
  resultList?: CustomsDeclarationEntityBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** CustomsDeclarationEntitySelectBean */
export interface CustomsDeclarationEntitySelectBean {
  /** 唯一编码 */
  code?: string;
  /** 公司名称 */
  companyName?: string;
  /**
   * 是否默认 1-默认 0-非默认
   * @format int32
   */
  isDefault?: number;
}

/** CustomsDeclarationEntitySelectListQueryResp */
export interface CustomsDeclarationEntitySelectListQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 报关主体列表 */
  selectList?: CustomsDeclarationEntitySelectBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** CustomsDeclarationEntityUpdateReq */
export interface CustomsDeclarationEntityUpdateReq {
  /** 主体地址 */
  address?: string;
  /** 唯一编码 */
  code?: string;
  /** 公司名称 */
  companyName?: string;
  /** 海关编码 */
  customsCode?: string;
  /** 境内发货人 */
  domesticConsignor?: string;
  /** 境内发货人代码 */
  domesticConsignorCode?: string;
  /** 主体印章 */
  fileKey?: string;
  /** 主体印章文件名 */
  fileName?: string;
  /** 境外收货人 */
  foreignConsignee?: string;
  /** 联系方式 */
  phone?: string;
  /** 生产销售单位 */
  producerSeller?: string;
  /** 生产销售单位代码 */
  producerSellerCode?: string;
  /** 监管方式 */
  supervisionMethod?: string;
  /** 交易币种 */
  transactionCurrency?: string;
}

/** CustomsDeclarationInboundOrder */
export interface CustomsDeclarationInboundOrder {
  companyCode?: string;
  contractNo?: string;
  /** @format date-time */
  createTime?: string;
  creator?: string;
  customsEntityCode?: string;
  /** @format int64 */
  deleted?: number;
  fileKey?: string;
  /** @format int32 */
  hasDownload?: number;
  /** @format int64 */
  id?: number;
  /** @format int32 */
  isGenerated?: number;
  receiptDocument?: string;
  receiptDocumentName?: string;
  remark?: string;
  /** @format date-time */
  updateTime?: string;
  updater?: string;
}

/** CustomsDetailBean */
export interface CustomsDetailBean {
  /** 合同协议号 */
  contractNo?: string;
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
   * 申报数量
   * @format int32
   */
  declaredQuantity?: number;
  /** 目的地 */
  destination?: string;
  /**
   * id
   * @format int64
   */
  id?: number;
  /** 是否下载 0-未下载 1-已下载 */
  isDownLoadDesc?: string;
  /**
   * 是否下载 0-未下载 1-已下载
   * @format int32
   */
  isDownload?: number;
  /** 物流渠道 */
  logisticsChannel?: string;
  /** 物流商 */
  logisticsProvider?: string;
  /**
   * 件数
   * @format int32
   */
  packageCount?: number;
  /** 报关单品名 */
  productName?: string;
  /** sku */
  productSku?: string;
  /** 货件号 */
  shipmentId?: string;
}

/** CustomsElementBean */
export interface CustomsElementBean {
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /** 创建人名称 */
  creatorName?: string;
  /** 海关编码 */
  declarationCode?: string;
  /** 要素名称 */
  declarationElement?: string;
  /**
   * id
   * @format int64
   */
  id?: number;
  /** 备注 */
  remark?: string;
  /**
   * 修改时间
   * @format date-time
   */
  updateTime?: string;
  /** 修改人 */
  updator?: string;
  /** 修改人名称 */
  updatorName?: string;
}

/** CustomsElementDetailBean */
export interface CustomsElementDetailBean {
  /** 海关编码 */
  declarationCode?: string;
  /** 要素名称 */
  declarationElement?: string;
  /**
   * id
   * @format int64
   */
  id?: number;
  /** 备注 */
  remark?: string;
}

/** CustomsElementDetailQueryResp */
export interface CustomsElementDetailQueryResp {
  /** 明细数据 */
  detailBean?: CustomsElementDetailBean;
}

/** CustomsElementListQueryResp */
export interface CustomsElementListQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 报关要素列表 */
  resultList?: CustomsElementBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** CustomsElementUpdateReq */
export interface CustomsElementUpdateReq {
  /** 海关编码 */
  declarationCode?: string;
  /** 报关要素 */
  declarationElement?: string;
  /**
   * ID 存在更新，不存在保存
   * @format int64
   */
  id?: number;
  /** 备注 */
  remark?: string;
}

/** CustomsGenerateBean */
export interface CustomsGenerateBean {
  /** 合同协议号 */
  contractNo?: string;
  /**
   * 创建时间
   * @format date
   */
  createDate?: string;
  /** 创建人 */
  creator?: string;
  /** 创建人名称 */
  creatorName?: string;
  /**
   * id
   * @format int64
   */
  id?: number;
  /** 回执文件列表 */
  receiptFileList?: ReceiptFileBeanRes[];
}

/** CustomsGenerateRecordQueryResp */
export interface CustomsGenerateRecordQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 下载记录 */
  resultList?: CustomsGenerateBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** CustomsListQueryReq */
export interface CustomsListQueryReq {
  /** 合同协议号 */
  contractNo?: string;
  /**
   * 创建时间 -结束
   * @format date
   */
  createDateEnd?: string;
  /**
   * 创建时间 -开始
   * @format date
   */
  createDateStart?: string;
  /** 创建人 */
  creator?: string;
  /** 公司主体 */
  declarationEntity?: string;
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
  /** 货件号 */
  shipmentId?: string;
  /** 货件号 */
  shipmentIds?: string[];
  /** skuCode */
  skuCode?: string;
}

/** CustomsListQueryResp */
export interface CustomsListQueryResp {
  code?: string;
  /** 报关订单列表 */
  list?: CustomsDeclarationInboundOrder[];
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 报关明细列表 */
  resultList?: CustomsDetailBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** CustomsProductBean */
export interface CustomsProductBean {
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /** 创建人名称 */
  creatorName?: string;
  /** 海关编码 */
  declarationCode?: string;
  /** 申报要素 */
  declarationElement?: string;
  /** 海关品名 */
  declarationName?: string;
  /** 申报价值 */
  declaredValue?: number;
  /** 境内货源地 */
  domesticSource?: string;
  /** 产品毛重 */
  grossWeight?: number;
  /** @format int64 */
  id?: number;
  /**
   * 是否商检
   * @format int32
   */
  isNeedInspection?: number;
  /** 产品名称 */
  productName?: string;
  /** 产品sku */
  productSku?: string;
  /** 备案币种 */
  recordCurrency?: string;
  /** 备注 */
  remark?: string;
  /** 监管方式 */
  supervisionMethod?: string;
  /** 供应商 */
  supplier?: string;
  /** 成交单位 */
  transactionUnit?: string;
  /**
   * 修改时间
   * @format date-time
   */
  updateTime?: string;
  /** 修改人 */
  updater?: string;
  /** 修改人名称 */
  updatorName?: string;
}

/** CustomsProductEntityDeleteReq */
export interface CustomsProductEntityDeleteReq {
  /**
   * ID
   * @format int64
   */
  id?: number;
}

/** CustomsProductEntityUpdateReq */
export interface CustomsProductEntityUpdateReq {
  /**
   * 海关编码（必填）
   * @minLength 1
   * @maxLength 32
   */
  declarationCode?: string;
  /**
   * 申报要素（必填）
   * @minLength 0
   * @maxLength 255
   */
  declarationElement?: string;
  /**
   * 海关品名（必填）
   * @minLength 1
   * @maxLength 255
   */
  declarationName?: string;
  /** 申报价值（必填） */
  declaredValue?: number;
  /**
   * 境内资源地
   * @minLength 0
   * @maxLength 255
   */
  domesticSource?: string;
  /** 产品毛重（必填） */
  grossWeight?: number;
  /**
   * ID 存在更新，不存在保存
   * @format int64
   */
  id?: number;
  /**
   * 是否商检
   * @format int32
   */
  isNeedInspection?: number;
  /**
   * 产品SKU（必填）
   * @minLength 1
   * @maxLength 64
   */
  productSku?: string;
  /** 备案币种 */
  recordCurrency?: string;
  /**
   * 备注
   * @minLength 0
   * @maxLength 255
   */
  remark?: string;
  /**
   * 监管方式
   * @minLength 0
   * @maxLength 20
   */
  supervisionMethod?: string;
  /**
   * 供应商
   * @minLength 0
   * @maxLength 255
   */
  supplier?: string;
  /**
   * 成交单位（必填）
   * @minLength 1
   * @maxLength 32
   */
  transactionUnit?: string;
}

/** CustomsProductListQueryResp */
export interface CustomsProductListQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 报关产品列表 */
  resultList?: CustomsProductBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** CustomsReceiptUploadReq */
export interface CustomsReceiptUploadReq {
  /** 合同号 */
  contractNo?: string;
  /** 回执文件列表 */
  receiptKeyList?: ReceiptFileBeanReq[];
}

/** CustomsSingDownloadReq */
export interface CustomsSingDownloadReq {
  /** 合同协议号 */
  contractNo?: string;
}

/** CustomsUploadReq */
export interface CustomsUploadReq {
  /** 报关主体编码 */
  declarationEntity?: string;
  /** 上传地址名字 */
  fileName?: string;
  /** 绝对路径 */
  fileUrl?: string;
  /** 上传地址 */
  ossKey?: string;
}

/** DbBaseInfo */
export interface DbBaseInfo {
  /** 送货单号 */
  code?: string;
  /** 预约入库单号 */
  prebookCode?: string;
  /**
   * 收货时间
   * @format date-time
   */
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

/** DeliveryOrderListQueryResp */
export interface DeliveryOrderListQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 记录 */
  recordList?: DeliveryOrderListQueryRespItem[];
  /** 统计 */
  statistics?: DeliveryOrderListQueryRespStatistics;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** DeliveryOrderListQueryRespItem */
export interface DeliveryOrderListQueryRespItem {
  /** 调入仓 */
  arrivalWarehouseName?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creatorName?: string;
  /** 发货单号 */
  dlCode?: string;
  /** 调拨单号 */
  erpCode?: string;
  /**
   * 操作出库时间
   * @format date-time
   */
  executorDate?: string;
  /**
   * 预计发运时间
   * @format date-time
   */
  expectShipmentDate?: string;
  /**
   * 主键
   * @format int64
   */
  id?: number;
  /**
   * 出库状态
   * @format int32
   */
  outFlag?: number;
  /** 出库状态描述 */
  outFlagDesc?: string;
  /**
   * 拣货状态
   * @format int32
   */
  pickFlag?: number;
  /** 拣货状态描述 */
  pickFlagDesc?: string;
  /**
   * 拣货时间
   * @format date-time
   */
  pickTime?: string;
  /**
   * 调拨量
   * @format int32
   */
  quantity?: number;
  /** 货件号 */
  shipmentId?: string;
  /**
   * 已出运
   * @format int32
   */
  shipmentQuantity?: number;
  /** 产品明细 */
  skuList?: DeliveryOrderListQueryRespItemSku[];
  /**
   * 产品种类，对应供应链sku数量
   * @format int32
   */
  skuSpecies?: number;
  /** 单据状态 */
  status?: string;
  /** 单据状态描述 */
  statusDesc?: string;
  /** 物流方式 */
  transport?: string;
  /**
   * 已调入
   * @format int32
   */
  viewLotNoQuantity?: number;
  /** 调出仓 */
  warehouseName?: string;
  /** 兴运计划单号 */
  xyPlanCode?: string;
  /** 兴运推送信息 */
  xySyncDesc?: string;
}

/** DeliveryOrderListQueryRespItemSku */
export interface DeliveryOrderListQueryRespItemSku {
  /**
   * 已调入
   * @format int32
   */
  inboundQuantity?: number;
  /** 供应链sku */
  productSku?: string;
  /** 产品名称 */
  productTitle?: string;
  /**
   * 数量
   * @format int32
   */
  quantity?: number;
  /**
   * 已出运
   * @format int32
   */
  shipmentQuantity?: number;
  /** 产品sku */
  skuCode?: string;
}

/** DeliveryOrderListQueryRespStatistics */
export interface DeliveryOrderListQueryRespStatistics {
  /**
   * 全部
   * @format int32
   */
  all?: number;
  /**
   * 待拣货
   * @format int32
   */
  auditPass?: number;
  /**
   * 已作废
   * @format int32
   */
  cancelled?: number;
  /**
   * 已完成
   * @format int32
   */
  finish?: number;
  /**
   * 待提交
   * @format int32
   */
  notAudit?: number;
  /**
   * 调拨在途
   * @format int32
   */
  outbound?: number;
  /**
   * 审核中
   * @format int32
   */
  waitAudit?: number;
  /**
   * 待出库
   * @format int32
   */
  waitOutbound?: number;
}

/** DeliveryOrderQueryReq */
export interface DeliveryOrderQueryReq {
  /** 调入仓 编码 */
  arrivalWarehouseCodeList?: string[];
  /** 创建人 */
  creatorList?: string[];
  /** 发货单号。 多个以逗号分隔，单个支持模糊搜索，多个支持精确匹配 */
  dlCode?: string;
  /** 调拨单号。 多个以逗号分隔，单个支持模糊搜索，多个支持精确匹配 */
  erpCode?: string;
  /** 出库标记 0-未出库 1-已出库 */
  outFlagList?: number[];
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
  /** 拣货状态 0-未拣货 1-已拣货 2-拣货中 */
  pickFlagList?: number[];
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 货件单号。 多个以逗号分隔，单个支持模糊搜索，多个支持精确匹配 */
  shipmentId?: string;
  /** tabStatus 状态, 不传默认全部， notAudit-待提交， waitAudit-审核中， auditPass-待拣货， waitOutbound-待出库， outbound-调拨在途， finish-已完成， cancelled-已作废 */
  tabStatus?: string;
  /** 调出仓 编码 */
  warehouseCodeList?: string[];
}

/** DeliveryPaymentAccountBean */
export interface DeliveryPaymentAccountBean {
  /** 账单地址-国家(地区)二字码 */
  billingAddressCountry?: string;
  /** 账单地址-邮编 */
  billingAddressPostCode?: string;
  /** 客户快递付款账号 */
  expressDeliveryPaymentAccount?: string;
  /** 物流渠道 */
  logisticsChannel?: string;
  /** 支付方式 */
  paymentMethod?: string;
}

/** DeliveryPaymentAccountBean0 */
export interface DeliveryPaymentAccountBean0 {
  /** 账单地址-国家(地区)二字码 */
  billingAddressCountry?: string;
  /** 账单地址-邮编 */
  billingAddressPostCode?: string;
  /** 客户快递付款账号 */
  expressDeliveryPaymentAccount?: string;
  /** 物流渠道 */
  logisticsChannel?: string;
  /** 支付方式 */
  paymentMethod?: string;
}

/** DeptInfoBean */
export interface DeptInfoBean {
  /** 是否勾选 使用处：在线知识库 */
  check?: boolean;
  /** 子部门列表 */
  children?: DeptInfoBean[];
  /**
   * 部门id
   * @format int64
   */
  deptId?: number;
  /** 部门名称 */
  deptName?: string;
  /**
   * 父部门id
   * @format int64
   */
  parentId?: number;
  /**
   * 排序
   * @format int64
   */
  sort?: number;
  /** 部门来源标识 */
  sourceIdentifier?: string;
}

/** DeptMemberListQueryResp */
export interface DeptMemberListQueryResp {
  /** 成员列表 */
  memberList?: MemberBean[];
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

/** DictQueryReq */
export interface DictQueryReq {
  /** 字典编码集合 */
  dictCodes?: string[];
}

/** DiffIgnoreBean */
export interface DiffIgnoreBean {
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /** 发货单号 */
  shippingOrderNo?: string;
}

/** DiscountAllocation */
export interface DiscountAllocation {
  amount?: number;
  amount_set?: AmountSet;
  /** @format int32 */
  discount_application_index?: number;
}

/** DownloadOrderAttachmentUrlReq */
export interface DownloadOrderAttachmentUrlReq {
  /** 附件类型列表 */
  attachmentTypeList?: string[];
  /** 订单号列表 */
  erpCodeList?: string[];
}

/** EcWarehouseBean */
export interface EcWarehouseBean {
  /** 仓库编码 */
  warehouseCode?: string;
  /** 仓库名称 */
  warehouseDesc?: string;
  /**
   * 仓库ID
   * @format int64
   */
  warehouseId?: number;
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

/** ElsSubaccountInfo */
export interface ElsSubaccountInfo {
  /** @format date-time */
  accountValidityDate?: string;
  /** @format int32 */
  activitiSync?: number;
  address?: string;
  avatar?: string;
  /** @format date-time */
  birthday?: string;
  createBy?: string;
  createById?: string;
  /** @format date-time */
  createTime?: string;
  /** @format int32 */
  deleted?: number;
  elsAccount?: string;
  email?: string;
  fbk1?: string;
  fbk10?: string;
  fbk2?: string;
  fbk3?: string;
  fbk4?: string;
  fbk5?: string;
  fbk6?: string;
  fbk7?: string;
  fbk8?: string;
  fbk9?: string;
  id?: string;
  interfaceMessage?: string;
  interfaceMsg?: string;
  interfaceStatus?: string;
  orgCode?: string;
  password?: string;
  phone?: string;
  post?: string;
  postcode?: string;
  realname?: string;
  returnState?: string;
  salt?: string;
  secret?: string;
  sensitiveFieldGroups?: string;
  /** @format byte */
  sex?: string;
  sourceId?: string;
  sourceSystem?: string;
  sourceType?: string;
  /** @format int32 */
  status?: number;
  subAccount?: string;
  superiorLeader?: string;
  telephone?: string;
  updateBy?: string;
  updateById?: string;
  /** @format date-time */
  updateTime?: string;
  workNo?: string;
}

/** EquityStructureBean */
export interface EquityStructureBean {
  /**
   * id
   * @format int64
   */
  id?: number;
  /**
   * 出资额
   * @example 500
   */
  investmentAmount: number;
  /**
   * 占总股本比例
   * @example 50
   */
  shareRatio: number;
  /**
   * 股东名称
   * @example "张三"
   */
  shareholderName: string;
  /** 供应商code */
  supplierCode?: string;
  /**
   * 表决比例
   * @example 50
   */
  votingRatio: number;
}

/** EquityStructureBean0 */
export interface EquityStructureBean0 {
  /**
   * 出资额（万元）
   * @example 1000
   */
  investmentAmount?: number;
  /**
   * 占总股本比例
   * @example 20
   */
  shareRatio?: number;
  /**
   * 股东名称
   * @example "张三"
   */
  shareholderName?: string;
  /**
   * 表决比例
   * @example 25
   */
  votingRatio?: number;
}

/** ErpAuditReq */
export interface ErpAuditReq {
  /** 审核单号 */
  code: string;
  /** 允许部分通过，这里传部分通过的型号 */
  modelList?: string[];
  /** 通过不通过 */
  pass?: boolean;
  /** 备注 */
  remark?: string;
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

/** ErpFbaSendListQueryReq */
export interface ErpFbaSendListQueryReq {
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
  /** 目的仓编码 */
  destinationWarehouseCode?: string;
  /** 货件单号/发货单号/计划单号 */
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
  /** 发货仓编码 */
  sendWarehouseCode?: string;
  /** 店铺编码 */
  shopCode?: string;
  /**
   * 状态 1:"待确认",2:"待发货",3:"已发货",4:"作废"
   * @format int32
   */
  status?: number;
}

/** ErpFbaSendListQueryResp */
export interface ErpFbaSendListQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  recordList?: ErpFbaSendListQueryRespItem[];
  /** 统计信息 */
  statisticsInfo?: ErpFbaSendShipmentListQueryRespStatisticsInfo;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** ErpFbaSendListQueryRespItem */
export interface ErpFbaSendListQueryRespItem {
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 配送地址 */
  deliveryAddress?: string;
  /** 目的仓 */
  destinationWarehouseDesc?: string;
  /** 发货单号 */
  doCode?: string;
  /** 装箱信息 */
  packageItems?: ErpFbaShipmentListQueryRespPackageItem[];
  /** 包装类型 */
  packageTypeDesc?: string;
  /** 计划单号 */
  planCode?: string;
  /**
   * 计划量
   * @format int32
   */
  planQty?: number;
  /** 发货仓 */
  sendWarehouseDesc?: string;
  /** 货件单号 */
  shipmentCode?: string;
  /** 货件名称 */
  shipmentName?: string;
  /** 物流方式 */
  shippingMethod?: string;
  /** 店铺名称 */
  shopName?: string;
  /**
   * SKU种类
   * @format int64
   */
  skuCount?: number;
  /**
   * 状态 状态（1待确认  2待发货  3已发货  4已作废）
   * @format int32
   */
  status?: number;
  /** 状态 */
  statusDesc?: string;
  /**
   * 总箱数
   * @format int32
   */
  totalBoxQty?: number;
  /**
   * SKU总数量
   * @format int32
   */
  totalSkuQty?: number;
  /** 总体积 */
  totalVolume?: string;
  /** 总重量 */
  totalWeight?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /** 兴运计划单号 */
  xingyunPlanCode?: string;
  /** 接口信息 */
  xingyunSyncDesc?: string;
}

/** ErpFbaSendShipmentListQueryRespStatisticsInfo */
export interface ErpFbaSendShipmentListQueryRespStatisticsInfo {
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
   * 已发货
   * @format int32
   */
  send?: number;
  /**
   * 待发货
   * @format int32
   */
  waitSend?: number;
  /**
   * 待确认
   * @format int32
   */
  waitingConfirm?: number;
}

/** ErpFbaShipmentListProducts */
export interface ErpFbaShipmentListProducts {
  asin?: string;
  boxProductAmount?: string;
  deliverAmount?: string;
  fnsku?: string;
  hadReceivedAmount?: string;
  productName?: string;
  quantity?: string;
  sellerSku?: string;
  shipmentId?: string;
  warehouseSku?: string;
}

/** ErpFbaShipmentListQueryReq */
export interface ErpFbaShipmentListQueryReq {
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
  /** 目的仓编码 */
  destinationWarehouseCode?: string;
  /** 货件单号/发货单号/计划单号/货件名称 */
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
  /** 发货仓编码 */
  sendWarehouseCode?: string;
  /**
   * 发货时间-结束
   * @format date-time
   */
  shipTimeEnd?: string;
  /**
   * 发货时间-开始
   * @format date-time
   */
  shipTimeStart?: string;
  /** 店铺编码 */
  shopCode?: string;
  /** 来源: 易仓/积加 */
  source?: string;
  /** 状态 CANCELLED-已取消,CLOSED-全部收货,DELETED-删除货件,DELIVERED-已到达,OTHER-其他,RECEIVING-部分收货,SHIPPED-已发货,WORKING-已创建 */
  status?: string;
  /** 状态列表 */
  statusList?: string[];
  /**
   * 调拨单出库状态: 0: 未出库,1：已出库
   * @format int32
   */
  transferFlag?: number;
  /**
   * 更新时间-结束
   * @format date-time
   */
  updateTimeEnd?: string;
  /**
   * 更新时间-开始
   * @format date-time
   */
  updateTimeStart?: string;
}

/** ErpFbaShipmentListQueryResp */
export interface ErpFbaShipmentListQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  recordList?: ErpFbaShipmentListQueryRespItem[];
  /** 统计信息 */
  statisticsInfo?: ErpFbaShipmentListQueryRespStatisticsInfo;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** ErpFbaShipmentListQueryRespItem */
export interface ErpFbaShipmentListQueryRespItem {
  /** 详细地址 */
  addressDetail?: string;
  /** 中心ID */
  centerId?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /** 配送地址 */
  deliveryAddress?: string;
  /** 目的仓 */
  destinationWarehouseDesc?: string;
  /**
   * 差异量
   * @format int32
   */
  diffQty?: number;
  /** DO号 */
  doCode?: string;
  /** 装箱信息 */
  packageItems?: ErpFbaShipmentListQueryRespPackageItem[];
  /** 计划单号 */
  planCode?: string;
  /**
   * 计划量
   * @format int32
   */
  planQty?: number;
  products?: ErpFbaShipmentListProducts[];
  /**
   * 已收量
   * @format int32
   */
  receivedQty?: number;
  /** 发货仓 */
  sendWarehouseDesc?: string;
  /** 发货单号 */
  shipCode?: string;
  /**
   * 发货量
   * @format int32
   */
  shipQty?: number;
  /**
   * 发货时间
   * @format date-time
   */
  shipTime?: string;
  /** 货件单号 */
  shipmentCode?: string;
  /** 货件名称 */
  shipmentName?: string;
  /** 物流方式 */
  shippingMethod?: string;
  /** 店铺名称 */
  shopName?: string;
  /** 站点 */
  site?: string;
  /**
   * SKU种类
   * @format int64
   */
  skuCount?: number;
  /** 来源: 易仓/积加 */
  source?: string;
  /** 状态 */
  status?: string;
  /**
   * 总箱数
   * @format int32
   */
  totalBoxQty?: number;
  /**
   * SKU总数量
   * @format int32
   */
  totalSkuQty?: number;
  /** 体积 */
  totalVolume?: string;
  /** 重量 */
  totalWeight?: string;
  /**
   * 调拨单出库状态: 0: 未出库,1：已出库
   * @format int32
   */
  transferFlag?: number;
  /** 更新时间 */
  updateTime?: string;
}

/** ErpFbaShipmentListQueryRespPackItem */
export interface ErpFbaShipmentListQueryRespPackItem {
  /** 参考号 */
  referenceNo?: string;
  /** 装箱单号 */
  tppCode?: string;
  /**
   * 产品数量
   * @format int32
   */
  tppQuantity?: number;
  /** 体积（cm³） */
  tppVolume?: string;
  /**
   * 重量（kg）
   * @format int64
   */
  tppWeight?: number;
}

/** ErpFbaShipmentListQueryRespPackageItem */
export interface ErpFbaShipmentListQueryRespPackageItem {
  /** asin */
  asin?: string;
  /** 箱号 */
  boxNumber?: string;
  /** 箱规尺寸（长*宽*高）cm */
  boxSize?: string;
  /** FNSKU */
  fnsku?: string;
  /** 箱子总重量 */
  perBoxWeight?: string;
  /** sellerSku */
  sellerSku?: string;
  /** 产品名称 */
  title?: string;
  /** 体积m2 */
  volume?: string;
  /**
   * SKU数量
   * @format int32
   */
  warehouseQty?: number;
  /** SKU */
  warehouseSku?: string;
}

/** ErpFbaShipmentListQueryRespPackageItemStatisticsInfo */
export interface ErpFbaShipmentListQueryRespPackageItemStatisticsInfo {
  /**
   * 废弃
   * @format int32
   */
  abandoned?: number;
  /**
   * 全部
   * @format int32
   */
  all?: number;
  /**
   * 已完成
   * @format int32
   */
  completed?: number;
  /**
   * 草稿
   * @format int32
   */
  draft?: number;
  /**
   * 装箱已确认
   * @format int32
   */
  packConfirm?: number;
  /**
   * 已提交装箱
   * @format int32
   */
  packed?: number;
  /**
   * 未确认发货
   * @format int32
   */
  unConfirmedSend?: number;
  /**
   * 未提交装箱
   * @format int32
   */
  unboxed?: number;
  /**
   * 待审核
   * @format int32
   */
  waitAudit?: number;
}

/** ErpFbaShipmentListQueryRespStatisticsInfo */
export interface ErpFbaShipmentListQueryRespStatisticsInfo {
  /**
   * 全部
   * @format int32
   */
  all?: number;
  /**
   * 已取消
   * @format int32
   */
  cancelled?: number;
  /**
   * 全部收货
   * @format int32
   */
  closed?: number;
  /**
   * 删除货件
   * @format int32
   */
  deleted?: number;
  /**
   * 已到达
   * @format int32
   */
  delivered?: number;
  /**
   * 其他
   * @format int32
   */
  other?: number;
  /**
   * 部分收货
   * @format int32
   */
  receiving?: number;
  /**
   * 已发货
   * @format int32
   */
  shipped?: number;
  /**
   * 已创建
   * @format int32
   */
  working?: number;
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

/** ErpFlowChangeStatusReq */
export interface ErpFlowChangeStatusReq {
  /** 审核编码 */
  code?: string;
  /**
   * 状态: 0-启用 1-禁用
   * @format int32
   */
  status?: number;
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

/** ErpFlowConditionTemplateBean */
export interface ErpFlowConditionTemplateBean {
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
   * 类型: 0-单选 1-多选 2-单值数字输入 3-区间数字输入 4-多选-输入框 5-单选-并输入整数框 6-多选-并输入整数框(要求 value = "%s[%s],%s[%s]" 数组 例如 ['SKU-A[1]','SKU-B[2]'])
   * @format int32
   */
  type?: number;
}

/** ErpFlowCreatorBean */
export interface ErpFlowCreatorBean {
  /** 创建人编码 */
  creatorCode?: string;
  /** 创建人编码 */
  creatorName?: string;
}

/** ErpFlowCreatorListResp */
export interface ErpFlowCreatorListResp {
  /** 创建人列表 */
  creatorList?: ErpFlowCreatorBean[];
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

/** ErpFlowListQueryReq */
export interface ErpFlowListQueryReq {
  /** 创建人Code */
  creatorCodes?: string[];
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
  /** 规则名称 */
  ruleName?: string;
  /**
   * 状态筛选：0-启用 1-禁用
   * @format int32
   */
  status?: number;
  /**
   * 类型：0-报价单 1-线下订单 2-申购单 3-销售预测 4-分仓规则
   * @format int32
   */
  type?: number;
}

/** ErpFlowListQueryResp */
export interface ErpFlowListQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 记录列表 */
  recordList?: ErpFlowBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
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

/** ErpFlowOutTemplateBean */
export interface ErpFlowOutTemplateBean {
  /** 是否必选 */
  mustSelect?: boolean;
  /** 条件名 */
  name?: string;
  /** 条件code */
  nameCode?: string;
  /** 关联条件NameCode */
  relevanceNameCode?: string;
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
}

/** ErpFlowSaveBaseInfo */
export interface ErpFlowSaveBaseInfo {
  /**
   * 审核方式: 1-系统审核 2-钉钉审核
   * @format int32
   */
  auditType?: number;
  /** 审核编码 */
  code?: string;
  /** 审核名称 */
  name?: string;
  /** 输出信息 */
  outInfo?: string;
  pcode?: string;
  /**
   * 优先级
   * @format int32
   */
  priority?: number;
  /**
   * 状态: 0-启用 1-禁用
   * @format int32
   */
  status?: number;
  /**
   * 类型：0-报价单 1-线下订单 2-申购单 3-销售预测 4-分仓规则
   * @format int32
   */
  type?: number;
}

/** ErpFlowSaveCondition */
export interface ErpFlowSaveCondition {
  /**
   * 比较类型: 0-等于 1-含于
   * @format int32
   */
  compareType?: number;
  /** 条件名 */
  name?: string;
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
  /** 值  type如果是单选则是具体值，多选的话则是数组, 区间数字值则类似1-9 */
  value?: object;
}

/** ErpFlowSaveNode */
export interface ErpFlowSaveNode {
  /**
   * 自动审核 0-否 1-是
   * @format int32
   */
  auto?: number;
  /** 节点名称 */
  name?: string;
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

/** ErpFlowSaveReq */
export interface ErpFlowSaveReq {
  /** 基本信息 */
  baseInfo?: ErpFlowSaveBaseInfo;
  /** 子流程列表 */
  childList?: ErpFlowSaveReq[];
  /** 条件列表 */
  conditionList?: ErpFlowSaveCondition[];
  /** 节点列表 */
  nodeList?: ErpFlowSaveNode[];
  /** 输出列表 */
  outParamList?: ErpFlowOutBean[];
}

/** ErpFlowTemplateResp */
export interface ErpFlowTemplateResp {
  /** 子流程列表 */
  childList?: ErpFlowTemplateResp[];
  /** 条件列表 */
  conditionList?: ErpFlowConditionTemplateBean[];
  /** 输出参数 */
  outParamList?: ErpFlowOutTemplateBean[];
  /** 共享参数 */
  shareDictMap?: Record<string, ErpFlowDictBean[]>;
}

/** ErpJjTransfeQueryReq */
export interface ErpJjTransfeQueryReq {
  /** 调拨单号 */
  codeKeyWord?: string;
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
  /** fbaIds */
  shipmentIdWord?: string;
}

/** ErpLogisticsConfigBean */
export interface ErpLogisticsConfigBean {
  /** `company_code` */
  companyCode?: string;
  /** `config_code` */
  configCode?: string;
  /**
   * `create_time`
   * @format date-time
   */
  createTime?: string;
  /** `creator` */
  creator?: string;
  /** `declare_name_cn` */
  declareNameCn?: string;
  /** `declare_name_en` */
  declareNameEn?: string;
  /**
   * `deleted`
   * @format int64
   */
  deleted?: number;
  /** `extra_info` */
  extraInfo?: string;
  /** `gross_weight` */
  grossWeight?: number;
  /**
   * 主键
   * @format int64
   */
  id?: number;
  /** `operator` */
  operator?: string;
  /** `product_name_cn` */
  productNameCn?: string;
  /** `product_name_en` */
  productNameEn?: string;
  /** `product_sku` */
  productSku?: string;
  /** `unit_container_height` */
  unitContainerHeight?: number;
  /** `unit_container_long` */
  unitContainerLong?: number;
  /**
   * `unit_container_num`
   * @format int32
   */
  unitContainerNum?: number;
  /** `unit_container_weight` */
  unitContainerWeight?: number;
  /** `unit_container_width` */
  unitContainerWidth?: number;
  /**
   * `update_time`
   * @format date-time
   */
  updateTime?: string;
}

/** ErpOdoBaseReq */
export interface ErpOdoBaseReq {
  /** code */
  code: string;
  /**
   * 类型 1-领用单 2-自发货单
   * @format int32
   */
  type: number;
}

/** ErpOdoRemarkSaveReq */
export interface ErpOdoRemarkSaveReq {
  /** code */
  code: string;
  remark?: string;
  /**
   * 类型 1-领用单 2-自发货单
   * @format int32
   */
  type: number;
}

/** ErpOrderAllChannelQueryListReq */
export interface ErpOrderAllChannelQueryListReq {
  /** ASIN */
  asin?: string;
  /**
   * 大状态
   * @format int32
   */
  bigStatus?: number;
  /** 渠道 */
  channel?: string;
  /** 国家 */
  country?: string;
  /**
   * 北京时间创建时间-结束
   * @format date-time
   */
  createTimeEnd?: string;
  /**
   * 北京时间创建时间-开始
   * @format date-time
   */
  createTimeStart?: string;
  /** 是否超时未发货 */
  hasTimeoutNotShipped?: string;
  /**
   * 当地创建时间-结束
   * @format date-time
   */
  localCreateTimeEnd?: string;
  /**
   * 当地创建时间-开始
   * @format date-time
   */
  localCreateTimeStart?: string;
  /** 订单号 */
  orderCode?: string;
  /** 订单号列表 */
  orderCodeList?: string[];
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
  /** 产品名称 */
  prodcutName?: string;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 是否查询状态数量 */
  searchStatusCount?: boolean;
  /** sellerSku */
  sellerSku?: string;
  /** 店铺 */
  shop?: string;
  /** 站点 */
  site?: string;
  /** 状态 */
  status?: string;
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

/** ErpOrderRateCfgChangeStatusReq */
export interface ErpOrderRateCfgChangeStatusReq {
  /**
   * id
   * @format int64
   */
  id?: number;
  /**
   * 状态 0-失效 1-生效
   * @format int32
   */
  status?: number;
}

/** ErpOrderRateCfgChooseBean */
export interface ErpOrderRateCfgChooseBean {
  /** 税种 */
  area?: string;
  /** 国家简称 */
  city?: string;
  /** 国家 */
  countryCode?: string;
  /** 客户 */
  customerCode?: string;
  /**
   * 交货方式
   * @format int32
   */
  deliverType?: number;
  /** 订单渠道 */
  orderSaleType?: string;
  /** 省/州 */
  province?: string;
}

/** ErpOrderRateCfgListQueryReq */
export interface ErpOrderRateCfgListQueryReq {
  /** 国家 */
  countryCode?: string;
  /** 国家集合 */
  countryCodeList?: string[];
  /**
   * 是否欧盟 0-否 1-是
   * @format int32
   */
  isEu?: number;
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
  /** 税类型 */
  taxType?: string;
}

/** ErpOrderRateCfgListQueryResp */
export interface ErpOrderRateCfgListQueryResp {
  code?: string;
  enumsList?: Record<string, DictCommonBean[]>;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  recordList?: ErpOrderRateCfgListQueryRespItem[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** ErpOrderRateCfgListQueryRespItem */
export interface ErpOrderRateCfgListQueryRespItem {
  /** 区域 */
  area?: string;
  /** 市 */
  city?: string;
  /** 国家编码 */
  countryCode?: string;
  /** 国家名称 */
  countryName?: string;
  /** 创建人编码 */
  creatorCode?: string;
  /** 创建人编码名称 */
  creatorName?: string;
  /** 客户编码 */
  customerCode?: string;
  /** 客户名称 */
  customerName?: string;
  /**
   * id
   * @format int64
   */
  id?: number;
  /**
   * 是否EU国家
   * @format int32
   */
  isEu?: number;
  /** 是否EU国家 */
  isEuDesc?: string;
  /** 省 */
  province?: string;
  /**
   * 状态 0-失效 1-生效
   * @format int32
   */
  status?: number;
  /** 状态 0-失效 1-生效 */
  statusDesc?: string;
  /** 税率 */
  taxRate?: number;
  /** 税率 */
  taxRateDesc?: string;
  /** 税种 */
  taxType?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /** 更新人编码 */
  updaterCode?: string;
  /** 更新人编码名称 */
  updaterName?: string;
  /** VAT税率 */
  vatTaxRate?: number;
  /** VAT税率 */
  vatTaxRateDesc?: string;
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

/** ErpOrderShippingExtInfoBean */
export interface ErpOrderShippingExtInfoBean {
  /** 国家编码 */
  countryCode?: string;
  /** 国家名称 */
  countryName?: string;
  /** 时效 */
  timeliness?: string;
  /** 时效列表 */
  timelinessTuple?: number[];
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

/** ErpOrderTransferApprovalStatusReq */
export interface ErpOrderTransferApprovalStatusReq {
  /**
   * 审核状态（0：未审核，1：已审核）
   * @format int32
   */
  approvalStatus?: number;
  /** 渠道 */
  channel?: string;
  /**
   * 创建状态（null，0：创建失败，1：创建成功）
   * @format int32
   */
  createStatus?: number;
  /** 调拨单唯一id */
  transferId?: string;
}

/** ErpOrderTransferCopySaveReq */
export interface ErpOrderTransferCopySaveReq {
  parentTransferId?: string;
  /**
   * 调拨数量
   * @format int32
   */
  quantity?: number;
  /**
   * 调入仓
   * @format int32
   */
  toWarehouseId?: number;
  /** 调拨单唯一id */
  transferId?: string;
  /**
   * 确认物流id
   * @format int32
   */
  transportId?: number;
  /** 确认物流方式 */
  transportName?: string;
}

/** ErpOrderTransferDeleteReq */
export interface ErpOrderTransferDeleteReq {
  /** 调拨单唯一id */
  transferIdList?: string[];
}

/** ErpOrderTransferDetailChildrenQueryResp */
export interface ErpOrderTransferDetailChildrenQueryResp {
  /**
   * 0：未审核，1：已审核
   * @format int32
   */
  approvalStatus?: number;
  /** 渠道 */
  channel?: string;
  /** 国家 */
  country?: string;
  /**
   * 创建状态（null，0：创建失败，1：创建成功）
   * @format int32
   */
  createStatus?: number;
  /**
   * 单日预测量
   * @format int32
   */
  dailyForecast?: number;
  /**
   * 单日销量
   * @format int32
   */
  dailySales?: number;
  /**
   * eta(目的仓的预计到达时间)
   * @format date
   */
  eta?: string;
  /**
   * etd(国内最晚发货时间)
   * @format date
   */
  etd?: string;
  /**
   * 预计出库日期
   * @format date
   */
  expectDeliveryDate?: string;
  /**
   * 预计出运日期
   * @format date
   */
  expectShipmentDate?: string;
  /**
   * 12周预测量
   * @format int32
   */
  forecast12w?: number;
  /**
   * 预测可售天数
   * @format int32
   */
  forecastCoverDays?: number;
  /** 调拨分组号 */
  groupCode?: string;
  /** @format int64 */
  id?: number;
  /**
   * 在途库存数量
   * @format int32
   */
  inTransitQuantity?: number;
  /**
   * 初始调拨数量
   * @format int32
   */
  initialQuantity?: number;
  /**
   * 库存可售天数
   * @format int32
   */
  inventoryCoverDays?: number;
  /**
   * 库存数量
   * @format int32
   */
  inventoryQuantity?: number;
  /**
   * 数据是否被修改(0：未修改，1：已修改)
   * @format int32
   */
  isEdit?: number;
  /** 运营员 */
  operator?: string;
  /**
   * 调出仓
   * @format int32
   */
  outWarehouseId?: number;
  /** 关联主调拨单 */
  parentTransferId?: string;
  /** 计划员 */
  planner?: string;
  /**
   * 调拨数量
   * @format int32
   */
  quantity?: number;
  /** 备注 */
  remark?: string;
  /**
   * 28天销量
   * @format int32
   */
  sales28d?: number;
  /** 供应链sku */
  supplySku?: string;
  /** 第三方调拨单号 */
  thirdCode?: string;
  /**
   * 调入仓
   * @format int32
   */
  toWarehouseId?: number;
  /** 调拨单唯一id */
  transferId?: string;
  /** 物流方式id */
  transportId?: string;
  /** 物流方式 */
  transportName?: string;
}

/** ErpOrderTransferDetailQueryResp */
export interface ErpOrderTransferDetailQueryResp {
  /**
   * 0：未审核，1：已审核
   * @format int32
   */
  approvalStatus?: number;
  /** 渠道 */
  channel?: string;
  /** 子列表 */
  childrenList?: ErpOrderTransferDetailChildrenQueryResp[];
  /** 国家 */
  country?: string;
  /**
   * 创建状态（null，0：创建失败，1：创建成功）
   * @format int32
   */
  createStatus?: number;
  /**
   * 单日预测量
   * @format int32
   */
  dailyForecast?: number;
  /**
   * 单日销量
   * @format int32
   */
  dailySales?: number;
  /**
   * 直发标识（0：工厂直发、1：中仓）
   * @format int32
   */
  directDelivery?: number;
  /**
   * eta(目的仓的预计到达时间)
   * @format date
   */
  eta?: string;
  /**
   * etd(国内最晚发货时间)
   * @format date
   */
  etd?: string;
  /**
   * 预计出库日期
   * @format date
   */
  expectDeliveryDate?: string;
  /**
   * 预计出运日期
   * @format date
   */
  expectShipmentDate?: string;
  /**
   * 12周预测量
   * @format int32
   */
  forecast12w?: number;
  /**
   * 预测可售天数
   * @format int32
   */
  forecastCoverDays?: number;
  /** 调拨分组号 */
  groupCode?: string;
  /** @format int64 */
  id?: number;
  /**
   * 在途库存数量
   * @format int32
   */
  inTransitQuantity?: number;
  /**
   * 初始调拨数量
   * @format int32
   */
  initialQuantity?: number;
  /**
   * 库存可售天数
   * @format int32
   */
  inventoryCoverDays?: number;
  /**
   * 库存数量
   * @format int32
   */
  inventoryQuantity?: number;
  /**
   * `数据是否被修改(0：未编辑，1：已编辑)`
   * @format int32
   */
  isEdit?: number;
  /** 运营员 */
  operator?: string;
  /**
   * 调出仓
   * @format int32
   */
  outWarehouseId?: number;
  /** 关联主调拨单 */
  parentTransferId?: string;
  /** 计划员 */
  planner?: string;
  /**
   * 调拨数量
   * @format int32
   */
  quantity?: number;
  /** 备注 */
  remark?: string;
  /**
   * 28天销量
   * @format int32
   */
  sales28d?: number;
  /** 供应链sku */
  supplySku?: string;
  /** 第三方调拨单号 */
  thirdCode?: string;
  /**
   * 调入仓
   * @format int32
   */
  toWarehouseId?: number;
  /** 调拨单唯一id */
  transferId?: string;
  /**
   * 物流方式id
   * @format int32
   */
  transportId?: number;
  /** 物流方式 */
  transportName?: string;
}

/** ErpOrderTransferGroupCodeReq */
export interface ErpOrderTransferGroupCodeReq {
  /**
   * 审核状态（0：未审核，1：已审核）
   * @format int32
   */
  approvalStatus?: number;
  /** 渠道 */
  channel?: string;
  /** 国家 */
  country?: string;
  /**
   * 创建状态（null，0：创建失败，1：创建成功）
   * @format int32
   */
  createStatus?: number;
  /** 调拨分组号 */
  groupCode?: string;
  /**
   * 调出仓
   * @format int32
   */
  outWarehouseId?: number;
  /**
   * 调入仓
   * @format int32
   */
  toWarehouseId?: number;
  /** 调拨单唯一id */
  transferId?: string;
  /**
   * 物流id
   * @format int32
   */
  transportId?: number;
}

/** ErpOrderTransferListBean */
export interface ErpOrderTransferListBean {
  /** 空派原因 */
  airborneReasons?: string;
  /**
   * 0：未审核，1：已审核
   * @format int32
   */
  approvalStatus?: number;
  /** ASIN / Item ID */
  asin?: string;
  /** 箱规 */
  boxSpecifications?: string;
  /** 渠道 */
  channel?: string;
  /** 国家 */
  country?: string;
  /**
   * 创建状态（null，0：创建失败，1：创建成功）
   * @format int32
   */
  createStatus?: number;
  /** 创建状态（null，0：创建失败，1：创建成功） */
  createStatusDesc?: string;
  /**
   * 导入时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人code */
  creator?: string;
  /** 导入人 */
  creatorName?: string;
  /**
   * 单日预测量
   * @format int32
   */
  dailyForecast?: number;
  /**
   * 单日销量
   * @format int32
   */
  dailySales?: number;
  /**
   * 直发标识（0：工厂直发、1：中仓）
   * @format int32
   */
  directDelivery?: number;
  /**
   * eta(目的仓的预计到达时间)
   * @format date
   */
  eta?: string;
  /**
   * etd(国内最晚发货时间)
   * @format date
   */
  etd?: string;
  /**
   * 预计出库日期
   * @format date
   */
  expectDeliveryDate?: string;
  /**
   * 预计出运日期
   * @format date
   */
  expectShipmentDate?: string;
  /**
   * 过期时间
   * @format date
   */
  expirationDate?: string;
  /** FNSKU / UPC */
  fnsku?: string;
  /**
   * 12周预测量
   * @format int32
   */
  forecast12w?: number;
  /** 预测可售天数 */
  forecastCoverDays?: number;
  /** 调拨分组号 */
  groupCode?: string;
  /** @format int64 */
  id?: number;
  /**
   * 在途库存数量
   * @format int32
   */
  inTransitQuantity?: number;
  /**
   * 初始调拨数量
   * @format int32
   */
  initialQuantity?: number;
  /**
   * 初始物流id
   * @format int32
   */
  initialTransportId?: number;
  /** 初始物流方式 */
  initialTransportName?: string;
  /** 库存可售天数 */
  inventoryCoverDays?: number;
  /**
   * 库存数量
   * @format int32
   */
  inventoryQuantity?: number;
  /**
   * `数据是否被修改(0：未编辑，1：已编辑)`
   * @format int32
   */
  isEdit?: number;
  /** 运营员 */
  operator?: string;
  /** 运营员姓名 */
  operatorName?: string;
  /** 调出仓名称 */
  outWarehouseDesc?: string;
  /**
   * 调出仓
   * @format int32
   */
  outWarehouseId?: number;
  /** 关联主调拨单 */
  parentTransferId?: string;
  /** 计划员 */
  planner?: string;
  /** 计划员姓名 */
  plannerName?: string;
  /** 产品名称 */
  prodName?: string;
  /**
   * 调拨数量
   * @format int32
   */
  quantity?: number;
  /** 备注 */
  remark?: string;
  /** 审核人code */
  reviewer?: string;
  /** 审核人 */
  reviewerName?: string;
  /**
   * 28天销量
   * @format int32
   */
  sales28d?: number;
  /** 货件号 */
  shipmentId?: string;
  /** 供应链sku */
  supplySku?: string;
  /** 第三方调拨单号 */
  thirdCode?: string;
  /** 调入仓名称 */
  toWarehouseDesc?: string;
  /**
   * 调入仓
   * @format int32
   */
  toWarehouseId?: number;
  /** 调拨单唯一id */
  transferId?: string;
  /**
   * 物流id
   * @format int32
   */
  transportId?: number;
  /** 物流方式 */
  transportName?: string;
}

/** ErpOrderTransferListQueryReq */
export interface ErpOrderTransferListQueryReq {
  /**
   * 0：未审核，1：已审核
   * @format int32
   */
  approvalStatus?: number;
  /** 渠道 */
  channel?: string;
  /** 国家 */
  country?: string;
  /** 创建状态（null，0：创建失败，1：创建成功） */
  createStatus?: string;
  /** 导入结束时间 */
  createTimeEnd?: string;
  /** 导入开始时间 */
  createTimeStart?: string;
  /** 导入人code列表 */
  creatorList?: string[];
  /**
   * 直发标识（0：工厂直发、1：中仓）
   * @format int32
   */
  directDelivery?: number;
  /** 调拨分组号 */
  groupCodes?: string;
  /** 运营员 */
  operator?: string;
  /** 调出仓id */
  outWarehouseId?: string;
  /** 调出仓id列表 */
  outWarehouseIdList?: string[];
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
  /** 计划员 */
  planner?: string;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 备注（输入5个字符以后才开始模糊匹配） */
  remark?: string;
  /** 审核人code列表 */
  reviewerList?: string[];
  /** 货件号 */
  shipmentId?: string;
  /** 货件号,多个逗号空格隔开 */
  shipmentIds?: string;
  /** 供应链sku */
  supplySkus?: string;
  /** 积加调拨单号 */
  thirdCodes?: string;
  /** 调入仓id */
  toWarehouseId?: string;
  /** 调入仓id列表 */
  toWarehouseList?: string[];
  /** 调拨单唯一id list */
  transferIdList?: string[];
  /**
   * 确认物流id
   * @format int32
   */
  transportId?: number;
}

/** ErpOrderTransferListQueryResp */
export interface ErpOrderTransferListQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 列表 */
  recordList?: ErpOrderTransferListBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** ErpOrderTransferLogBean */
export interface ErpOrderTransferLogBean {
  /**
   * 操作时间
   * @format date-time
   */
  createTime?: string;
  /** 操作内容 */
  itemContent?: string;
  /** 操作人 */
  operator?: string;
  /** 操作人名称 */
  operatorName?: string;
  /** 备注 */
  remark?: string;
}

/** ErpOrderTransferLogQueryResp */
export interface ErpOrderTransferLogQueryResp {
  /** 日志列表 */
  recordList?: ErpOrderTransferLogBean[];
}

/** ErpOrderTransferSaveReq */
export interface ErpOrderTransferSaveReq {
  /**
   * 调拨数量
   * @format int32
   */
  quantity?: number;
  /**
   * @minLength 0
   * @maxLength 255
   */
  remark?: string;
  /**
   * 调入仓
   * @format int32
   */
  toWarehouseId?: number;
  /** 调拨单唯一id */
  transferId?: string;
  /**
   * 确认物流id
   * @format int32
   */
  transportId?: number;
  /** 确认物流方式 */
  transportName?: string;
}

/** ErpOrderTransferThirdCodeReq */
export interface ErpOrderTransferThirdCodeReq {
  /**
   * 审核状态（0：未审核，1：已审核）
   * @format int32
   */
  approvalStatus?: number;
  /** 渠道 */
  channel?: string;
  /** 国家 */
  country?: string;
  /**
   * 创建状态（null，0：创建失败，1：创建成功）
   * @format int32
   */
  createStatus?: number;
  /**
   * 预计出库日期[yyyy-MM-dd]
   * @format date
   */
  expectDeliveryDate?: string;
  /**
   * 预计出运日期[yyyy-MM-dd]
   * @format date
   */
  expectShipmentDate?: string;
  /** 调拨分组号 */
  groupCode?: string;
  /**
   * 调出仓
   * @format int64
   */
  outWarehouseId?: number;
  /**
   * 调拨数量
   * @format int32
   */
  quantity?: number;
  /** 备注 */
  remark?: string;
  /** 供应链sku */
  supplySku?: string;
  /**
   * 调入仓
   * @format int64
   */
  toWarehouseId?: number;
  /** 调拨单唯一id */
  transferId?: string;
  /**
   * 物流id
   * @format int32
   */
  transportId?: number;
  /** 物流方式 */
  transportName?: string;
}

/** ErpOrderTransferTransportReq */
export interface ErpOrderTransferTransportReq {
  /** 调拨单唯一id */
  transferId?: string;
  /**
   * 物流id
   * @format int32
   */
  transportId?: number;
  /** 物流方式 */
  transportName?: string;
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
    | 'IN_PURCHASE_ORDER'
    | 'ODO_RECEIVE_ORDER'
    | 'OFFLINE_ORDER'
    | 'SAMPLE_ORDER'
    | 'SHOPIFY_ORDER'
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

/** ErpOrderWpUpdateReq */
export interface ErpOrderWpUpdateReq {
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

/** ErpOverSeaShipmentListQueryReq */
export interface ErpOverSeaShipmentListQueryReq {
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
  /** 头程计划单号/订单号/参考号 */
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
  /** 发货仓编码 */
  sendWarehouseCode?: string;
  /**
   * 状态 -3:草稿, -2:待审核, 0:未提交装箱, 1:已提交装箱, 2:装箱已确认, 3:未确认发货, 4:已完成, -1:作废
   * @format int32
   */
  status?: number;
  /** 目的仓编码 */
  toWarehouseCode?: string;
}

/** ErpOverSeaShipmentListQueryResp */
export interface ErpOverSeaShipmentListQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  recordList?: ErpOverSeaShipmentListQueryRespItem[];
  /** 统计信息 */
  statisticsInfo?: ErpFbaShipmentListQueryRespPackageItemStatisticsInfo;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** ErpOverSeaShipmentListQueryRespItem */
export interface ErpOverSeaShipmentListQueryRespItem {
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 订单号 */
  orderCode?: string;
  /** 装箱信息 */
  packList?: ErpFbaShipmentListQueryRespPackItem[];
  /** 计划单号 */
  planCode?: string;
  /** 参考单号 */
  referenceCode?: string;
  /** 发货仓 */
  sendWarehouseDesc?: string;
  /** 下架单号 */
  shelfCode?: string;
  /** 运输方式 */
  shippingMethod?: string;
  /**
   * 状态 -3:草稿, -2:待审核, 0:未提交装箱, 1:已提交装箱, 2:装箱已确认, 3:未确认发货, 4:已完成, -1:作废
   * @format int32
   */
  status?: number;
  /** 状态 */
  statusDesc?: string;
  /** 目的仓 */
  toWarehouseDesc?: string;
  /**
   * 总箱数
   * @format int32
   */
  totalBoxQty?: number;
  /**
   * 总数量
   * @format int32
   */
  totalQty?: number;
  /** 体积 */
  totalVolume?: string;
  /**
   * 重量
   * @format int64
   */
  totalWeight?: number;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** ErpPoCloseReq */
export interface ErpPoCloseReq {
  /**
   * 关闭类型：0-全部关闭 1-部分关闭
   * @format int32
   */
  closeType: number;
  /** 订单号 */
  orderNumber: string;
}

/** ErpPoSyncReq */
export interface ErpPoSyncReq {
  /** 基础信息 */
  baseInfo?: PoBaseInfo;
  /** 明细 */
  poItemList?: PoItem[];
}

/** ErpReoSyncReq */
export interface ErpReoSyncReq {
  /** 基础信息 */
  baseInfo?: ReoBaseInfo;
  /** 明细 */
  reoItemList?: ReoItem[];
}

/** ErpShipmentListPushXyReq */
export interface ErpShipmentListPushXyReq {
  /** 单号 */
  codeList?: string[];
  /**
   * 类型 1-FBA 3-海外仓
   * @format int32
   */
  type?: number;
}

/** ErpSiteQueryListReq */
export interface ErpSiteQueryListReq {
  /** 品牌编码 */
  brandCodeList?: string[];
  /** 渠道 */
  channel?: string;
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
  /** 站点 */
  site?: string;
  /** 备货站点 */
  stockSite?: string;
}

/** ErpSiteQueryListResp */
export interface ErpSiteQueryListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 记录集合 */
  recordList?: PsfsQueryListReqItem[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** ErpSiteSaveReq */
export interface ErpSiteSaveReq {
  /** 品牌编码 */
  brandCode?: string;
  /** 品牌名称 */
  brandName?: string;
  /** 品牌英文名称 */
  brandNameEn?: string;
  /** 渠道 */
  channel?: string;
  /** 国家 */
  country?: string[];
  /**
   * id
   * @format int64
   */
  id?: number;
  /** 站点 */
  site?: string;
  /** 备货站点 */
  stockSite?: string;
}

/** ErpSupplierBean */
export interface ErpSupplierBean {
  /**
   * 结算方式：1货到付款、2款到发货、3帐期
   * @format int32
   */
  accountType?: number;
  /** 默认采购员 */
  buyerCode?: string;
  /** 唯一编码 */
  code?: string;
  /** 企业编码 */
  companyCode?: string;
  /** 开发人员 */
  developerCode?: string;
  /**
   * 主键
   * @format int64
   */
  id?: number;
  /** 等级：A、B、C、D */
  level?: string;
  /** 主营品类 */
  mainCategory?: string;
  /** 企业名称 */
  name?: string;
  /** 企业名称英文 */
  nameEn?: string;
  /**
   * 结算周期：1月结、2隔月结、3日结、4周结、5半月结
   * @format int32
   */
  pcId?: number;
  /**
   * 合作类型: 0正常、1临时、2备用
   * @format int32
   */
  teamworkType?: number;
  /** 默认跟单员 */
  trackerCode?: string;
  /**
   * 供应商类型：1零售、2批发、3生产商、4通用虚拟、5显示、6市场
   * @format int32
   */
  type?: number;
}

/** ExhibitionOrderAbandonReq */
export interface ExhibitionOrderAbandonReq {
  /** 展销会单号 */
  exhibitionCode?: string;
}

/** ExhibitionOrderAddReq */
export interface ExhibitionOrderAddReq {
  /** 申请信息 */
  approvalInfo?: ExhibitionOrderApprovalAddBean;
  /** 附件 */
  attachmentList?: ExhibitionOrderAttachmentFile[];
  /** 新增/编辑保存 - 是否发起审批 */
  isPush?: boolean;
  /** 商品信息 */
  itemList?: ExhibitionOrderItemBean[];
  /** 单据信息 -新增不传改参数 */
  orderInfo?: ExhibitionOrderInfoAddBean;
  /** 收获信息 */
  receiveInfo?: ExhibitionReceiveInfo;
}

/** ExhibitionOrderApprovalAddBean */
export interface ExhibitionOrderApprovalAddBean {
  /**
   * '出国时间'
   * @format date
   */
  abroadDate?: string;
  /** 申请人 */
  applicator?: string;
  /**
   * 展会结束日期
   * @format date
   */
  exhibitionEndDate?: string;
  /**
   * 展会开始日期
   * @format date
   */
  exhibitionStartDate?: string;
  /** 申请说明/申请用途 */
  purpose?: string;
  /** 备注 */
  remark?: string;
}

/** ExhibitionOrderApprovalShowBean */
export interface ExhibitionOrderApprovalShowBean {
  /**
   * 出国时间
   * @format date
   */
  abroadDate?: string;
  /** 申请人 */
  applicator?: string;
  /** 申请人名称 */
  applicatorName?: string;
  /**
   * 展销会结束时间
   * @format date
   */
  exhibitionEndDate?: string;
  /**
   * 展销会开始时间
   * @format date
   */
  exhibitionStartDate?: string;
  /** 申请说明 */
  purpose?: string;
  /** 备注 */
  remark?: string;
}

/** ExhibitionOrderAttachmentFile */
export interface ExhibitionOrderAttachmentFile {
  /** 附件名称 */
  attachmentName?: string;
  /** 附件key */
  key?: string;
  /** url */
  url?: string;
}

/** ExhibitionOrderBean */
export interface ExhibitionOrderBean {
  /**
   * 出国时间
   * @format date
   */
  abroadDate?: string;
  /**
   * 申请人部门
   * @format int64
   */
  applicationDeptId?: number;
  /** 申请人部门名称 */
  applicationDeptName?: string;
  /** 申请人 */
  applicator?: string;
  /** 申请人姓名 */
  applicatorName?: string;
  /** B2B单号 */
  b2bOrderCode?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 展销会单号 */
  exhibitionCode?: string;
  /**
   * 展会结束时间
   * @format date
   */
  exhibitionEndDate?: string;
  /**
   * 展会开始时间
   * @format date
   */
  exhibitionStartDate?: string;
  /** 海外仓入库单号 */
  inboundCode?: string;
  /** 明细sku */
  itemList?: ExhibitionOrderItemBean[];
  /** oa申请单号 */
  oaCode?: string;
  /** 其他单号 */
  otherOrderCode?: string;
  /** 海外仓出库单号 */
  outboundCode?: string;
  /** 申请用途 */
  purpose?: string;
  /** 收获信息 */
  receiveInfo?: ExhibitionReceiveInfo;
  /** 备注 */
  remark?: string;
  /**
   * 状态 100:待确认,200:审核中,300:待调拨,400:已完成,500:异常,600:作废
   * @format int32
   */
  status?: number;
  /** 状态描述  100:待确认,200:审核中,300:待调拨,400:已完成,500:异常,600:作废 */
  statusDesc?: string;
  /** 调拨单号 */
  transferOrderCode?: string;
}

/** ExhibitionOrderDetailResp */
export interface ExhibitionOrderDetailResp {
  /** 申请信息 */
  approvalInfo?: ExhibitionOrderApprovalShowBean;
  /** 附件信息 */
  attachmentList?: ExhibitionOrderAttachmentFile[];
  /** 商品信息 */
  itemList?: ExhibitionOrderItemBean[];
  /** 单据数据 */
  orderInfo?: ExhibitionOrderInfoShowBean;
  /** 收获信息 */
  receiveInfo?: ExhibitionReceiveInfo;
}

/** ExhibitionOrderInfoAddBean */
export interface ExhibitionOrderInfoAddBean {
  /** B2B单号 */
  b2bOrderCode?: string;
  /** 展销会单号 */
  exhibitionCode?: string;
  /** 海外仓入库单号 */
  inboundCode?: string;
  /** oa申请单号 */
  oaCode?: string;
  /** 其他单号 */
  otherOrderCode?: string;
  /** 海外仓出库单号 */
  outboundCode?: string;
  /**
   * 状态 100:待确认,200:审核中,300:待调拨,400:已完成,500:异常,600:作废
   * @format int32
   */
  status?: number;
  /** 调拨单号 */
  transferOrderCode?: string;
}

/** ExhibitionOrderInfoShowBean */
export interface ExhibitionOrderInfoShowBean {
  /** B2B单号 */
  b2bOrderCode?: string;
  /** 展销会单号 */
  exhibitionCode?: string;
  /** 海外仓入库单号 */
  inboundCode?: string;
  /** oa申请单号 */
  oaCode?: string;
  /** 其他单号 */
  otherOrderCode?: string;
  /** 海外仓出库单号 */
  outboundCode?: string;
  /**
   * 状态 100:待确认,200:审核中,300:待调拨,400:已完成,500:异常,600:作废
   * @format int32
   */
  status?: number;
  /** 状态 100:待确认,200:审核中,300:待调拨,400:已完成,500:异常,600:作废 */
  statusDesc?: string;
  /** 调拨单号 */
  transferOrderCode?: string;
}

/** ExhibitionOrderItemBean */
export interface ExhibitionOrderItemBean {
  /** 产品名称 */
  productName?: string;
  /** 供应链产品SKU */
  productSku?: string;
  /**
   * 数量
   * @format int32
   */
  qty?: number;
  /** sku编码 */
  skuCode?: string;
}

/** ExhibitionOrderMappingReq */
export interface ExhibitionOrderMappingReq {
  /**
   * 操作类型 1-暂存 2-完成所有单据 3-保存
   * @format int32
   */
  actionType?: number;
  /** 单据信息 */
  exhibitionOrderInfoaddBean?: ExhibitionOrderInfoAddBean;
}

/** ExhibitionOrderQueryListResp */
export interface ExhibitionOrderQueryListResp {
  code?: string;
  /** 查询列表 */
  list?: ExhibitionOrderBean[];
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 状态 */
  statusBean?: StatusBeanStatistics;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** ExhibitionOrderRePushReq */
export interface ExhibitionOrderRePushReq {
  /** 展销会单号 */
  exhibitionCode?: string;
}

/** ExhibitionReceiveInfo */
export interface ExhibitionReceiveInfo {
  /** 城市 */
  city?: string;
  /** 国家/地区 */
  country?: string;
  /** 详细地址 */
  detailedAddress?: string;
  /** 区/县 */
  district?: string;
  /**
   * 邮箱
   * @pattern ^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$
   */
  email?: string;
  /** 门牌号 */
  houseNumber?: string;
  /**
   * 手机号
   * @pattern ^\+(?:[0-9] ?){6,14}[0-9]$
   */
  mobile?: string;
  /**
   * 电话
   * @pattern ^\+(?:[0-9] ?){6,14}[0-9]$
   */
  phone?: string;
  /** 邮编 */
  postalCode?: string;
  /** 省/州 */
  province?: string;
  /** 收件人 */
  receiverName?: string;
  /** 街道 */
  street?: string;
}

/** FbaDeliverBatchQueryListResp */
export interface FbaDeliverBatchQueryListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  recordList?: FbaDeliverBatchQueryListRespItem[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** FbaDeliverBatchQueryListRespItem */
export interface FbaDeliverBatchQueryListRespItem {
  /** 目的仓库代码 */
  aimWarehouseCode?: string;
  /** 目的国 */
  aimWarehouseCountry?: string;
  /** 目的仓库 */
  aimWarehouseName?: string;
  /** 箱号 */
  boxNumber?: string;
  /** 箱规尺寸（长宽*高） */
  boxSize?: string;
  /** 创建人 */
  createUser?: string;
  /** 单据创建时间 */
  createdAt?: string;
  /** 批次币种 */
  currencyCode?: string;
  /** 发货单号 */
  doCode?: string;
  /** 预计到货时间 */
  expectArrivalTime?: string;
  /** FNSKU */
  fnsku?: string;
  /** 目的地 */
  fulfillmentCenterId?: string;
  /** 批次PO单 */
  ibPoCode?: string;
  /** 批次入库单号 */
  ibReceivingCode?: string;
  /** 是否组合产品（是，否） */
  isCombine?: string;
  /** 箱子总重量 */
  perBoxWeight?: string;
  /** 收货日期 */
  rdbAddTime?: string;
  /** 入库单号 */
  receivingCode?: string;
  /** 出库时间 */
  shipTime?: string;
  /** 服务商单号 */
  shipmentId?: string;
  /** 分摊运费 */
  shippingFee?: number;
  /** 运输代码 */
  smCode?: string;
  /** 运输方式 */
  smName?: string;
  /** 子产品SKU（非组合时为空） */
  sonWarehouseSku?: string;
  /** 服务商 */
  spName?: string;
  /**
   * 状态
   * @format int32
   */
  status?: number;
  /** 状态名称 */
  statusName?: string;
  /** 店铺名称 */
  storeName?: string;
  /** 分摊关税 */
  tariffFee?: number;
  /** 产品名称 */
  title?: string;
  /** 总金额 */
  totalFee?: number;
  /** 成本小计 */
  totalUnitPrice?: number;
  /**
   * 子SKU总数量
   * @format int32
   */
  tppdmQuantity?: number;
  /** 发货仓库代码 */
  tranWarehouseCode?: string;
  /** 发货仓库 */
  tranWarehouseName?: string;
  /** 批次采购单价 */
  unitPrice?: number;
  /** 批次头程运费 */
  unitShippingFee?: number;
  /** 批次头程关税 */
  unitTariffFee?: number;
  /** 店铺账号 */
  userAccount?: string;
  /**
   * SKU数量
   * @format int32
   */
  warehouseQty?: number;
  /** SKU */
  warehouseSku?: string;
}

/** FbaInventoryQueryListReq */
export interface FbaInventoryQueryListReq {
  /** 是否升序 */
  asc?: boolean;
  /** asins */
  asins?: string;
  /** fnskus */
  fnskus?: string;
  /** mskuList */
  mskus?: string;
  /** 排序字段 */
  orderBy?: string;
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
  /** 产品名称 */
  productName?: string;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 供应链sku列表 */
  skus?: string;
  /** 仓库code列表 */
  warehouseCodes?: string[];
}

/** FbaInventoryQueryListResp */
export interface FbaInventoryQueryListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** FBA库存信息列表 */
  recordList?: FbaInventoryQueryListRespItem[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** FbaInventoryQueryListRespItem */
export interface FbaInventoryQueryListRespItem {
  /**
   * 可售
   * @format int32
   */
  afnFulfillableQuantity?: number;
  /**
   * 本地可售
   * @format int32
   */
  afnFulfillableQuantityLocal?: number;
  /**
   * 远程可售
   * @format int32
   */
  afnFulfillableQuantityRemote?: number;
  /** asin */
  asin?: string;
  /**
   * 可用量(良品量 - 已处理预占量)
   * @format int32
   */
  availableQty?: number;
  /**
   * 次品量
   * @format int32
   */
  defectiveQty?: number;
  /**
   * 待入库量
   * @format int32
   */
  erpPendingInventoryQty?: number;
  /**
   * 已发货量
   * @format int32
   */
  erpShippedQty?: number;
  /** fnsku */
  fnsku?: string;
  /** 配送渠道 */
  fulfillmentChannelName?: string;
  /**
   * 良品量
   * @format int32
   */
  goodQty?: number;
  /**
   * 在途量(在途量 = 已发货量 + 待入库量)
   * @format int32
   */
  inTransitQty?: number;
  /**
   * 货件在途量(货件在途量= 货件处理中 + 货件已发货 + 货件正在接收)
   * @format int32
   */
  inboundTotal?: number;
  /**
   * 0~30(0-1个月库龄)
   * @format int32
   */
  invAge0To30Days?: number;
  /**
   * 181~270(6-9个月库龄)
   * @format int32
   */
  invAge181To270Days?: number;
  /**
   * 271~330(9-11个月库龄)
   * @format int32
   */
  invAge271To330Days?: number;
  /**
   * 31~60(1-2个月库龄)
   * @format int32
   */
  invAge31To60Days?: number;
  /**
   * 331~365(11-12个月库龄)
   * @format int32
   */
  invAge331To365Days?: number;
  /**
   * 365+(12个月以上库龄)
   * @format int32
   */
  invAge365PlusDays?: number;
  /**
   * 61~90(2-3个月库龄)
   * @format int32
   */
  invAge61To90Days?: number;
  /**
   * 91~180(3-6个月库龄)
   * @format int32
   */
  invAge91To180Days?: number;
  /**
   * FBM可售
   * @format int32
   */
  mfnFulfillableQuantity?: number;
  /** asin */
  msku?: string;
  /**
   * 在库量(良品量 + 次品量)
   * @format int32
   */
  onHandQty?: number;
  /**
   * 已处理预占
   * @format int32
   */
  processedReservationQty?: number;
  /** 产品名称 */
  productName?: string;
  /**
   * 货件正在接收
   * @format int32
   */
  receivingQuantity?: number;
  /**
   * 调查中
   * @format int32
   */
  researchingQuantity?: number;
  /**
   * 预留数量(预留数量 = 预留-买家订单 + 预留-运营中心转运 + 预留-运营中心正在处理)
   * @format int32
   */
  reserved?: number;
  /**
   * 预留-买家订单
   * @format int32
   */
  reservedCustomerOrders?: number;
  /**
   * 预留-运营中心正在处理
   * @format int32
   */
  reservedProcessing?: number;
  /**
   * 预留-运营中心转运
   * @format int32
   */
  reservedTransfers?: number;
  /**
   * 货件已发货
   * @format int32
   */
  shippedQuantity?: number;
  /** 供应链SKU */
  sku?: string;
  /**
   * 产品状态0-正常 1-停用
   * @format int32
   */
  state?: number;
  /**
   * 同步时间
   * @format date-time
   */
  syncTime?: string;
  /**
   * 总数量
   * @format int32
   */
  totalQuantity?: number;
  /**
   * 未处理预占
   * @format int32
   */
  unprocessedReservationQty?: number;
  /**
   * 不可售（次品量）
   * @format int32
   */
  unsellableQuantity?: number;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /**
   * 仓库id
   * @format int64
   */
  warehouseId?: number;
  /** 仓库名称 */
  warehouseName?: string;
  /**
   * 货件处理中
   * @format int32
   */
  workingQuantity?: number;
}

/** FbaSendQueryListReq */
export interface FbaSendQueryListReq {
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

/** FbaShipmentMonitorChangeStatusReq */
export interface FbaShipmentMonitorChangeStatusReq {
  /** 规则id */
  ruleId?: string;
  /**
   * 状态（0：禁用，1：启用）
   * @format int32
   */
  status?: number;
}

/** FbaShipmentMonitorDetailQueryResp */
export interface FbaShipmentMonitorDetailQueryResp {
  /** 通知详情 */
  monitorNotification?: FbaShipmentMonitorNotificationBean;
  /** 规则详情 */
  monitorRule?: FbaShipmentMonitorRuleBean;
  /** 推送类型 */
  pushType?: string;
  /** 规则id */
  ruleId?: string;
  /** 规则名称 */
  ruleName?: string;
  /**
   * 状态（0：禁用，1：启用）
   * @format int32
   */
  status?: number;
}

/** FbaShipmentMonitorListQueryResp */
export interface FbaShipmentMonitorListQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 详细数据 */
  result?: FbaShipmentMonitorDetailQueryResp[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** FbaShipmentMonitorNotificationBean */
export interface FbaShipmentMonitorNotificationBean {
  /** 通知周期 */
  notificationCycle?: string;
  /** 通知消息 */
  notificationMessage?: string;
  /** 通知消息类型，多项英文逗号分割 */
  notificationMessageType?: string;
  /** 通知时间(几点) */
  notificationTime?: string;
  /** 通知人类型 */
  notifierType?: string;
}

/** FbaShipmentMonitorRuleBean */
export interface FbaShipmentMonitorRuleBean {
  /**
   * 通知时限天数
   * @format int32
   */
  notificationDeadline?: number;
  /**
   * 订单类型 (0:FBA)
   * @format int32
   */
  orderType?: number;
  /** 货件状态 (状态包含：CANCELLED,CHECKED_IN,CLOSED,DELETED,DELIVERED,IN_TRANSIT,RECEIVING,SHIPPED,WORKING,READY_TO_SHIP) */
  platformStatus?: string;
  /** 物流方式 */
  relationLogisticsMethod?: string;
  /** 关联单据状态 */
  relationOrderStatus?: string;
  /**
   * 关联单据类型（1：发货单）
   * @format int32
   */
  relationOrderType?: number;
  /** 目的仓 */
  targetWarehouse?: string;
  /** 时间参数 */
  timeParam?: string;
  /**
   * 超期时间天数
   * @format int32
   */
  timeoutDay?: number;
}

/** FbaShipmentMonitorSaveReq */
export interface FbaShipmentMonitorSaveReq {
  /** 通知周期 星期 */
  notificationCycle?: string;
  /**
   * 通知时限天数
   * @format int32
   */
  notificationDeadline?: number;
  /** 通知消息 */
  notificationMessage?: string;
  /** 通知消息类型，多项英文逗号分割 */
  notificationMessageType?: string;
  /** 通知时间(几点) */
  notificationTime?: string;
  /** 通知人类型 */
  notifierType?: string;
  /**
   * 订单类型 (0:FBA)
   * @format int32
   */
  orderType?: number;
  /** 货件状态 (状态包含：CANCELLED,CHECKED_IN,CLOSED,DELETED,DELIVERED,IN_TRANSIT,RECEIVING,SHIPPED,WORKING,READY_TO_SHIP) */
  platformStatus?: string;
  /** 推送类型 */
  pushType?: string;
  /** 物流方式 */
  relationLogisticsMethod?: string;
  /** 关联单据状态  1:待确认,2:待发货,3:已发货,4:作废 */
  relationOrderStatus?: string;
  /**
   * 关联单据类型（1：发货单）
   * @format int32
   */
  relationOrderType?: number;
  /** 规则id （区分新增还是保存） */
  ruleId?: string;
  /** 规则名称 */
  ruleName?: string;
  /**
   * 状态（0：禁用，1：启用）
   * @format byte
   */
  status?: string;
  /** 目的仓 */
  targetWarehouse?: string;
  /** 时间参数 默认：createTime */
  timeParam?: string;
  /**
   * 超期时间天数
   * @format int32
   */
  timeoutDay?: number;
}

/** FbaShipmentMonitorTransportQueryResp */
export interface FbaShipmentMonitorTransportQueryResp {
  /** 运输方式code */
  smCode?: string;
  /** 运输方式名称 */
  smName?: string;
}

/** FbaShipmentQueryListReq */
export interface FbaShipmentQueryListReq {
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

/** FirstLogAttachmentUploadReq */
export interface FirstLogAttachmentUploadReq {
  attachmentName: string;
  attachmentUrl: string;
  fbaId: string;
}

/** FirstLogDiffIgnoreListReq */
export interface FirstLogDiffIgnoreListReq {
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
  /** 发货单号 */
  shippingOrderNo?: string;
}

/** FirstLogDiffIgnoreListResp */
export interface FirstLogDiffIgnoreListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 记录列表 */
  recordList?: DiffIgnoreBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** FirstLogDiffIgnoreReq */
export interface FirstLogDiffIgnoreReq {
  /** 发货单号 */
  shippingNoList?: string[];
}

/** FirstLogDiffQueryReq */
export interface FirstLogDiffQueryReq {
  /**
   * 结束时间
   * @format date-time
   */
  endTime?: string;
  /** FBA ID */
  fbaId?: string;
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
  /** 发货单号 */
  shippingOrderNo?: string;
  /**
   * 开始时间
   * @format date-time
   */
  startTime?: string;
}

/** FirstLogisticsCommonV2Req */
export interface FirstLogisticsCommonV2Req {
  /** FBA ID号 */
  fbaId?: string[];
}

/** FirstLogisticsDiffQueryBean */
export interface FirstLogisticsDiffQueryBean {
  /** 计费重 */
  billingWeight?: string;
  /** 查验类型、延误原因 */
  delayReason?: string;
  /** 目的地国家 */
  destinationCountry?: string;
  /** FBAID号 */
  fbaId?: string;
  /** IEN */
  ienNo?: string;
  /** 是否查验 */
  inspected?: string;
  /** 是否延误 */
  isDelayed?: string;
  /** 是否递延 */
  isDeliveryDelayed?: string;
  /** 物流商 */
  logisticsProvider?: string;
  /** 签收日期 */
  receiptDate?: string;
  /** 参考时效（天） */
  referenceDuration?: string;
  /** 物流状态 */
  shipStatus?: string;
  /** 发货日期 */
  shippingDate?: string;
  /** 发货单号 */
  shippingOrderNo?: string;
  /** 物流跟踪单号 */
  trackingNo?: string;
  /** 转运详情 */
  transferInfo?: string;
  /** 物流渠道 */
  transportChannel?: string;
  /** 运输方式 */
  transportType?: string;
  /** 运费单价 */
  unitPrice?: string;
  /** VAT号 */
  vatNo?: string;
}

/** FirstLogisticsDiffQueryListV2Resp */
export interface FirstLogisticsDiffQueryListV2Resp {
  code?: string;
  /** 差异记录信息 */
  diffList?: FirstLogisticsDiffQueryBean[];
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

/** FirstLogisticsOperateLogBean */
export interface FirstLogisticsOperateLogBean {
  /** 操作内容 */
  content?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 操作类型 */
  operationType?: string;
  /** 操作人 */
  operator?: string;
}

/** FirstLogisticsQueryListRespItemV2 */
export interface FirstLogisticsQueryListRespItemV2 {
  /** 箱子明细 */
  cartonList?: CartonBean[];
  /**
   * 箱数
   * @format int32
   */
  cartonNum?: number;
  /** 产品线名称 */
  productLineName?: string;
  /** 产品名称 */
  productName?: string;
  /** 供应链产品SKU */
  productSku?: string;
  /**
   * 签收日期
   * @format date-time
   */
  receiptDate?: string;
  /**
   * 收货数量
   * @format int32
   */
  receiptQuantity?: number;
  /** 单箱重量 */
  singleCartonWeight?: number;
  /** 手动更新的记录 */
  upLoadBeanList?: UpLoadBean[];
}

/** FirstLogisticsQueryListRespItemV2Info */
export interface FirstLogisticsQueryListRespItemV2Info {
  /**
   * 实际时效(天)
   * @format int32
   */
  actualDuration?: number;
  /** 目的仓编码 */
  arrivalWarehouseCode?: string;
  /** 目的仓名称, 取这个 */
  arrivalWarehouseName?: string;
  /** 附件名称 */
  attachmentName?: string;
  /** 附件url */
  attachmentUrl?: string;
  /** 计费重量 */
  billingWeight?: number;
  /** 渠道 */
  channel?: string;
  /** 跟踪流水号 */
  code?: string;
  /** 合同编号 */
  contractNo?: string;
  /** 关税 */
  customsDuty?: number;
  /** 查验类型或延误原因 */
  delayReason?: string;
  /** 目的地国家 */
  destinationCountry?: string;
  /** 货件创建人 */
  fbaCreator?: string;
  /** FBA ID号 */
  fbaId?: string;
  /** 货代公司 */
  freightCompany?: string;
  /** @format int64 */
  id?: number;
  /** IEN号 */
  ienNo?: string;
  /**
   * 是否延误(0-否,1-是)
   * @format int32
   */
  isDelay?: number;
  /** 是否延误(0-否,1-是) */
  isDelayDesc?: string;
  /**
   * 是否延递(0-否,1-是)
   * @format int32
   */
  isDeliveryDelay?: number;
  /** 是否延递(0-否,1-是) */
  isDeliveryDelayDesc?: string;
  /**
   * 是否查验(0-否,1-是)
   * @format int32
   */
  isInspected?: number;
  /** 是否查验(0-否,1-是) */
  isInspectedDesc?: string;
  /** 明细 */
  itemList?: FirstLogisticsQueryListRespItemV2[];
  /**
   * 平台签收日期
   * @format date-time
   */
  latestReceiptDate?: string;
  /**
   * 运营最新收货量
   * @format int32
   */
  latestReceiptQuantity?: number;
  /** 物流最新收货备注 */
  latestReceiptRemark?: string;
  /** 兴运物流单号 */
  logisticsOrderNo?: string;
  /** 兴运计划单号 */
  logisticsPlanNo?: string;
  /** 物流商 */
  logisticsProvider?: string;
  /** 平台 */
  platform?: string;
  /**
   * 签收日期
   * @format date
   */
  receiptDate?: string;
  /**
   * 签收周
   * @format int32
   */
  receiptWeek?: number;
  /**
   * 参考时效(天)
   * @format int32
   */
  referenceDuration?: number;
  /**
   * 状态
   * @format int32
   */
  shipStatus?: number;
  /** 状态描述 */
  shipStatusDesc?: string;
  /** 发运国家，对应发货仓所在国 */
  shipperCountry?: string;
  /**
   * 发货日期
   * @format date
   */
  shippingDate?: string;
  /** 运费 */
  shippingFee?: number;
  /** 发货单号 */
  shippingOrderNo?: string;
  /**
   * 发货周
   * @format int32
   */
  shippingWeek?: number;
  /** 店铺 */
  shopCode?: string;
  /** 店铺名称 */
  shopName?: string;
  /** 物流跟踪单号 */
  trackingNo?: string;
  /** 转运详情 */
  transferInfo?: string;
  /** 调拨单号 */
  transferOrderNo?: string;
  /** 运输渠道 */
  transportChannel?: string;
  /** 运输方式 */
  transportType?: string;
  /** 运输方式 */
  transportTypeDesc?: string;
  /** 单价 */
  unitPrice?: number;
  /** 增值税 */
  valueAddedTax?: number;
  /** VAT号 */
  vatNo?: string;
}

/** FirstLogisticsQueryListRespStatisticsV2Info */
export interface FirstLogisticsQueryListRespStatisticsV2Info {
  /**
   * 实际延误数量
   * @format int32
   */
  actualDelayCount?: number;
  /**
   * 延误风险数量
   * @format int32
   */
  delayRiskCount?: number;
  /** 延误风险数量描述 */
  delayRiskDesc?: string;
  /** 延误风险占比 */
  delayRiskRatio?: number;
  /**
   * 正常在途-数量
   * @format int32
   */
  inWayCount?: number;
  /** 正常在途数量描述 */
  inWayDesc?: string;
  /** 正常在途-占比 */
  inWayRatio?: number;
  /**
   * 延误风险数量
   * @format int32
   */
  loseCount?: number;
  /** 延误风险数量描述 */
  loseDesc?: string;
  /** 延误风险占比 */
  loseRatio?: number;
  /**
   * 已签收数量
   * @format int32
   */
  receiveCount?: number;
  /** 已签收量描述 */
  receiveDesc?: string;
  /** 已签收数量占比 */
  receiveRatio?: number;
  /**
   * 总计
   * @format int32
   */
  totalCount?: number;
  /**
   *  进口检查-未放行数量
   * @format int32
   */
  unInPassCount?: number;
  /**  进口检查-未放行数量描述 */
  unInPassDesc?: string;
  /**  进口检查-未放行占比 */
  unInPassRatio?: number;
  /**
   * 出口查验-未放行数量
   * @format int32
   */
  unOutPassCount?: number;
  /** 出口查验-未放行描述 */
  unOutPassDesc?: string;
  /** 出口查验-未放行占比 */
  unOutPassRatio?: number;
}

/** FirstLogisticsQueryListV2Req */
export interface FirstLogisticsQueryListV2Req {
  /** 目的仓 */
  arrivalWarehouse?: string;
  /** 渠道 */
  channel?: string;
  /** 国家 */
  countryCode?: string;
  /** 勾选id列表 */
  idList?: number[];
  /** 关键字:发货ID/调拨单号/发货单号/跟踪单号/合同编码/计划单号/物流单号 */
  keyword?: string;
  /** 物流渠道 */
  logisticsChannel?: string;
  /** 物流商 */
  logisticsProvider?: string;
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
  /** 品线 */
  productLine?: string;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 物流状态 */
  shipStatus?: string;
  /**
   * 发货时间-结束
   * @format date-time
   */
  shipTimeEnd?: string;
  /**
   * 发货时间-开始
   * @format date-time
   */
  shipTimeStart?: string;
  /** 店铺 */
  shopName?: string;
  /**
   * 签收时间-结束
   * @format date-time
   */
  signTimeEnd?: string;
  /**
   * 签收时间-开始
   * @format date-time
   */
  signTimeStart?: string;
  splitKeywords?: string[];
  /** 运输方式 */
  transportType?: string;
}

/** FirstLogisticsQueryListV2Resp */
export interface FirstLogisticsQueryListV2Resp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 记录信息 */
  recordList?: FirstLogisticsQueryListRespItemV2Info[];
  /** 运输方式枚举 */
  shippingTypeBeanList?: ShippingTypeBean[];
  /** 统计信息 */
  statisticsInfo?: FirstLogisticsQueryListRespStatisticsV2Info;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** FirstLogisticsQueryV2Req */
export interface FirstLogisticsQueryV2Req {
  /** FbaId号 */
  fbaId?: string;
}

/** FirstLogisticsQueryV2Resp */
export interface FirstLogisticsQueryV2Resp {
  /** 明细信息 */
  detailInfo?: FirstLogisticsQueryListRespItemV2Info;
  /** 运输方式枚举 */
  shippingTypeBeanList?: ShippingTypeBean[];
}

/** FirstLogisticsSaveV2Req */
export interface FirstLogisticsSaveV2Req {
  /**
   * 查验类型或延误原因
   * @minLength 0
   * @maxLength 255
   */
  delayReason?: string;
  /** 目的地国家 */
  destinationCountry?: string;
  /**
   * FBA ID号
   * @minLength 0
   * @maxLength 64
   */
  fbaId?: string;
  /**
   * IEN号
   * @minLength 0
   * @maxLength 64
   */
  ienNo?: string;
  /**
   * 是否延误(0-否,1-是)
   * @format int32
   */
  isDelay?: number;
  /**
   * 是否延递(0-否,1-是)
   * @format int32
   */
  isDeliveryDelay?: number;
  /**
   * 是否查验(0-否,1-是)
   * @format int32
   */
  isInspected?: number;
  /**
   * 平台签收日期
   * @format date-time
   */
  latestReceiptDate?: string;
  /**
   * 物流商
   * @minLength 0
   * @maxLength 64
   */
  logisticsProvider?: string;
  /**
   * 签收日期
   * @format date
   */
  receiptDate?: string;
  /**
   * 物流状态
   * @format int32
   */
  shipStatus?: number;
  /**
   * 发货日期
   * @format date
   */
  shippingDate?: string;
  /**
   * 发货单号
   * @minLength 0
   * @maxLength 64
   */
  shippingOrderNo?: string;
  /**
   * 物流跟踪单号
   * @minLength 0
   * @maxLength 1000
   */
  trackingNo?: string;
  /**
   * 转运详情
   * @minLength 0
   * @maxLength 1000
   */
  transferInfo?: string;
  /**
   * 运输渠道
   * @minLength 0
   * @maxLength 64
   */
  transportChannel?: string;
  /**
   * 运输方式
   * @minLength 0
   * @maxLength 64
   */
  transportType?: string;
}

/** FirstLogisticsSkuQueryV2Resp */
export interface FirstLogisticsSkuQueryV2Resp {
  /** sku明细信息 */
  skuDetailList?: FirstLogisticsQueryListRespItemV2[];
}

/** FirstLogisticsSkuSaveV2Req */
export interface FirstLogisticsSkuSaveV2Req {
  /** FBA ID号 */
  fbaId?: string;
  /** 添加sku明细 */
  saveBeanList?: SkuDetailSaveBean[];
}

/** FirstLogisticsUpdateV2Req */
export interface FirstLogisticsUpdateV2Req {
  /**
   * 查验类型或延误原因
   * @minLength 0
   * @maxLength 255
   */
  delayReason?: string;
  /** 目的地国家 */
  destinationCountry?: string;
  /**
   * FBA ID号
   * @minLength 0
   * @maxLength 64
   */
  fbaId?: string;
  /**
   * IEN号
   * @minLength 0
   * @maxLength 64
   */
  ienNo?: string;
  /**
   * 是否延误(0-否,1-是)
   * @format int32
   */
  isDelay?: number;
  /**
   * 是否延递(0-否,1-是)
   * @format int32
   */
  isDeliveryDelay?: number;
  /**
   * 是否查验(0-否,1-是)
   * @format int32
   */
  isInspected?: number;
  /**
   * 平台签收日期
   * @format date-time
   */
  latestReceiptDate?: string;
  /**
   * 物流商
   * @minLength 0
   * @maxLength 64
   */
  logisticsProvider?: string;
  /**
   * 签收日期
   * @format date
   */
  receiptDate?: string;
  /**
   * 物流状态
   * @format int32
   */
  shipStatus?: number;
  /**
   * 发货日期
   * @format date
   */
  shippingDate?: string;
  /**
   * 发货单号
   * @minLength 0
   * @maxLength 64
   */
  shippingOrderNo?: string;
  /**
   * 物流跟踪单号
   * @minLength 0
   * @maxLength 1000
   */
  trackingNo?: string;
  /**
   * 转运详情
   * @minLength 0
   * @maxLength 1000
   */
  transferInfo?: string;
  /**
   * 调拨单号
   * @minLength 0
   * @maxLength 64
   */
  transferOrderNo?: string;
  /**
   * 运输渠道
   * @minLength 0
   * @maxLength 64
   */
  transportChannel?: string;
  /**
   * 运输方式
   * @minLength 0
   * @maxLength 64
   */
  transportType?: string;
}

/** FirstVesselTimelinessQueryListReq */
export interface FirstVesselTimelinessQueryListReq {
  /** 货件单号/海外仓头程计划单号 */
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
  /** 是否同步下载 */
  downLoadSync?: boolean;
  /** 关键字:货件单号/海外仓头程计划单号 */
  keyword?: string;
  /**
   * 超时时间类型: 0 - 小于等于0   1-(1-3) 2-(4-7) 3->7  4-其他
   * @format int32
   */
  overTimeType?: number;
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
  /** 配送时效-具体小时如: 24h */
  shpiingTimeliness?: string;
  /**
   * 状态:1-正常未发 2-全部超时未发 3-部分超时未发 4-全部正常已发 5-全部超时已发 6-部分已发 7-其他
   * @format int32
   */
  status?: number;
}

/** FirstVesselTimelinessQueryListResp */
export interface FirstVesselTimelinessQueryListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 记录信息 */
  recordList?: FirstVesselTimelinessQueryListRespItemInfo[];
  /** 统计信息 */
  statisticsInfo?: FirstVesselTimelinessQueryListRespStatisticsInfo;
  /**
   * 总数
   * @format int64
   */
  total?: number;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** FirstVesselTimelinessQueryListRespItemInfo */
export interface FirstVesselTimelinessQueryListRespItemInfo {
  /** 货件单号/海外仓头程计划单号 */
  code?: string;
  /** 创建时间 */
  codeCreateTime?: string;
  /** 出库时间 */
  codeOutTime?: string;
  /** 原单状态 */
  codeStatusDesc?: string;
  /** 更新时间 */
  date?: string;
  /** 预计出库时间 */
  expectedOutTime?: string;
  /**
   * 主键
   * @format int64
   */
  id?: number;
  /** 超时时间 */
  overTime?: string;
  /**
   * 超时时间类型: 0 - 小于等于0   1-(1-3) 2-(4-7) 3->7 4-其他
   * @format int32
   */
  overTimeType?: number;
  /**
   * 计划数量
   * @format int32
   */
  planQty?: number;
  /**
   * 发货数量
   * @format int32
   */
  sendQty?: number;
  /** 配送方式 */
  shippingCode?: string;
  /** 配送方式描述 */
  shippingDesc?: string;
  /** 配送时效 */
  shpiingTimeliness?: string;
  /**
   * 状态:1-正常未发 2-全部超时未发 3-部分超时未发 4-全部正常已发 5-全部超时已发 6-部分已发 7-其他
   * @format int32
   */
  status?: number;
  /** 状态描述 */
  statusDesc?: string;
}

/** FirstVesselTimelinessQueryListRespStatisticsInfo */
export interface FirstVesselTimelinessQueryListRespStatisticsInfo {
  /**
   * 全部数量
   * @format int32
   */
  allCount?: number;
  /** 全部数量占比 */
  allCountRatio?: number;
  /** 全部数量描述 */
  allDesc?: string;
  /**
   * 全部正常已发数量
   * @format int32
   */
  allNormalSendCount?: number;
  /** 全部正常已发占比 */
  allNormalSendCountRatio?: number;
  /** 全部正常已发描述 */
  allNormalSendSendDesc?: string;
  /**
   * 全部超时数量
   * @format int32
   */
  allTimeoutSendCount?: number;
  /** 全部超时占比 */
  allTimeoutSendCountRatio?: number;
  /** 全部超时描述 */
  allTimeoutSendDesc?: string;
  /**
   * 全部超时未发数量
   * @format int32
   */
  allTimeoutUnSendCount?: number;
  /** 全部超时未发占比 */
  allTimeoutUnSendCountRatio?: number;
  /** 全部超时未发描述 */
  allTimeoutUnSendDesc?: string;
  /**
   * 其他数量
   * @format int32
   */
  otherCount?: number;
  /** 其他占比 */
  otherCountRatio?: number;
  /** 其他描述 */
  otherDesc?: string;
  /**
   * 部分已发数量
   * @format int32
   */
  partSendCount?: number;
  /** 部分已发占比 */
  partSendCountRatio?: number;
  /** 部分已发描述 */
  partSendDesc?: string;
  /**
   * 部分超时未发数量
   * @format int32
   */
  partTimeoutUnSendCount?: number;
  /** 部分超时未发占比 */
  partTimeoutUnSendCountRatio?: number;
  /** 部分超时未发描述 */
  partTimeoutUnSendDesc?: string;
  /**
   * 正常未发数量
   * @format int32
   */
  unSendCount?: number;
  /** 正常未发数量占比 */
  unSendCountRatio?: number;
  /** 正常未发数量描述 */
  unSendDesc?: string;
}

/** FirstVesselTimelinessQuerySendLogListResp */
export interface FirstVesselTimelinessQuerySendLogListResp {
  recordList?: FirstVesselTimelinessQuerySendLogListRespItemInfo[];
}

/** FirstVesselTimelinessQuerySendLogListRespItemInfo */
export interface FirstVesselTimelinessQuerySendLogListRespItemInfo {
  /** 发货单号 */
  code?: string;
  /**
   * 创建时间
   * @format date-time
   */
  codeCreateTime?: string;
  /**
   * 出库时间
   * @format date-time
   */
  codeOutTime?: string;
  /**
   * 预计到货时间
   * @format date-time
   */
  expectedReceiveTime?: string;
  rcode?: string;
  /**
   * 发货数量
   * @format int32
   */
  sendNum?: number;
}

/** FirstVesselTimelinessSendNoticeReq */
export interface FirstVesselTimelinessSendNoticeReq {
  /** 通知列表 */
  noticeList?: FirstVesselTimelinessSendNoticeReqItem[];
}

/** FirstVesselTimelinessSendNoticeReqItem */
export interface FirstVesselTimelinessSendNoticeReqItem {
  /** 单号 */
  code?: string;
  /** 通知人编码 */
  noticeMemberCode?: string[];
}

/** FirstVtQueryListResp */
export interface FirstVtQueryListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  recordList?: FirstVtQueryListRespItem[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** FirstVtQueryListRespItem */
export interface FirstVtQueryListRespItem {
  /** 创建时间 */
  addTime?: string;
  /** 金额 */
  amount?: number;
  /** 三方仓库产品代码 */
  barcodeCode?: string;
  /**
   * 数量（箱）
   * @format int32
   */
  boxCount?: number;
  /** 头程费用币种 */
  costCurrencyCode?: string;
  /** 目的地 */
  destination?: string;
  /** 更新时间 */
  ecUpdateTime?: string;
  /** 预计到货时间 */
  expectedDate?: string;
  /** 头程运费 */
  headFreight?: number;
  /** 头程关税 */
  headTariff?: number;
  /** 收件人城市 */
  oabCity?: string;
  /** 收件人公司 */
  oabCompany?: string;
  /** 收件人州/区域 */
  oabCounty?: string;
  /** 收件人门牌号 */
  oabDoorplate?: string;
  /** 收件人邮编 */
  oabEmail?: string;
  /** 传真 */
  oabFax?: string;
  /** 收件人 */
  oabName?: string;
  /** 联系电话 */
  oabPhone?: string;
  /** 收件人国家 */
  oabPostcode?: string;
  /** 收件人州/区域 */
  oabState?: string;
  /** 收件人地址1 */
  oabStreetAddress1?: string;
  /** 收件人地址2 */
  oabStreetAddress2?: string;
  /**
   * 产品数量
   * @format int32
   */
  opQuantity?: number;
  /** 产品付款时间 */
  opRefPaydate?: string;
  /** 订单号 */
  orderCode?: string;
  /** 内件数 */
  parcelQuantity?: string;
  /** 产品代码 */
  productBarcode?: string;
  /** 产品名称 */
  productTitle?: string;
  /**
   * 产品单重（kg）
   * @format int64
   */
  productWeight?: number;
  /** 收货状态 */
  receivingStatus?: string;
  /** 参考号 */
  refNo?: string;
  /** 入库单号 */
  referenceNo?: string;
  /** 备注 */
  remark?: string;
  /** 出库时间 */
  shipTime?: string;
  /** 运输方式代码 */
  smCode?: string;
  /** 运输方式代码中文名称 */
  smNameCn?: string;
  /** 包裹重量（kg） */
  soWeight?: number;
  /** 头程计划单号 */
  stpoCode?: string;
  /**
   * 单据状态
   * @format int32
   */
  stpoStatus?: number;
  /** 单据状态名称 */
  stpoStatusName?: string;
  /** 系统重量（kg） */
  systemWeight?: number;
  /** 头程关税币种 */
  tariffCurrencyCode?: string;
  /** 目的仓库 */
  toWarehouse?: string;
  /**
   * 目的仓库id
   * @format int64
   */
  toWarehouseId?: number;
  /**
   * 产品总重量（kg，产品单重*产品数量）
   * @format int64
   */
  totalWeight?: number;
  /** 下架单号 */
  tpCode?: string;
  /** 跟踪号 */
  trackingNumber?: string;
  /** 平台账号 */
  userAccount?: string;
  /** 产品体积（cm³） */
  volume?: string;
  /** 发运仓库 */
  warehouse?: string;
  /**
   * 发运仓库id
   * @format int64
   */
  warehouseId?: number;
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

/** GeneratePayableReq */
export interface GeneratePayableReq {
  /**
   * 兴运物流单添加时间范围
   * @format date
   */
  createDateEnd?: string;
  /**
   * 兴运物流单添加时间范围
   * @format date
   */
  createDateStart?: string;
  /** 物流商 */
  logisticsSupplier?: string;
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

/** GoodInQueryListReq */
export interface GoodInQueryListReq {
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

/** GoodInQueryListResp */
export interface GoodInQueryListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  recordList?: GoodInQueryListRespItem[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** GoodInQueryListRespItem */
export interface GoodInQueryListRespItem {
  /** 创建时间 */
  createTime?: string;
  /**
   * 差异数量
   * @format int32
   */
  differentialQuantity?: number;
  /** 预计到货时间 */
  expectedArrivalTime?: string;
  /**
   * 预报数量
   * @format int32
   */
  forecastQuantity?: number;
  /**
   * 上架数量
   * @format int32
   */
  onShelfQuantity?: number;
  /** 上架时间 */
  onShelfTime?: string;
  /** 海外仓产品编码 */
  overseasProductCode?: string;
  /** 产品名称 */
  productName?: string;
  rcode?: string;
  /** 入库单参考号 */
  referenceCode?: string;
  /** 运输方式 */
  shippingMethod?: string;
  /** 商品SKU */
  skuCode?: string;
  /** 状态 */
  status?: string;
  /** 供应链SKU */
  supplySku?: string;
  /** 跟踪号 */
  trackingNumber?: string;
  /** 更新时间 */
  updateTime?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTimeDb?: string;
  /** 仓库 */
  warehouseDesc?: string;
  /** 入库类型 */
  warehousingType?: string;
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

/** InventoryInDetailQueryListReq */
export interface InventoryInDetailQueryListReq {
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

/** InventoryInDetailQueryListResp */
export interface InventoryInDetailQueryListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  recordList?: InventoryInQueryListRespItem[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** InventoryInQueryListRespItem */
export interface InventoryInQueryListRespItem {
  /** 操作类型 */
  applicationCode?: string;
  /** 目标采购价(RMB) */
  orgUnitPrice?: number;
  /** 上架时间 */
  pdPutawayTime?: string;
  /** 采购单 */
  poCode?: string;
  /** 产品条码 */
  productBarcode?: string;
  /** 品线 */
  productLine?: string;
  /** 产品名称 */
  productName?: string;
  /** 供应链SKU */
  productSku?: string;
  /**
   * 已上架数量
   * @format int32
   */
  rdPutawayQty?: number;
  /** 收货流水号 */
  rdbSerialNumber?: string;
  /**
   * 收货数量
   * @format int32
   */
  receivedQty?: number;
  /** 入库单号 */
  receivingCode?: string;
  /**
   * 取消收货数量
   * @format int32
   */
  receivingReturnedQty?: number;
  /** 入库单类型 */
  receivingType?: string;
  /** SKU编码 */
  skuCode?: string;
  /** SPU编码 */
  spuCode?: string;
  /** 供应商 */
  supplierCode?: string;
  /** 供应商 */
  supplierName?: string;
  /** 单价(RMB) */
  unitPrice?: number;
  /** 仓库 */
  warehouseDesc?: string;
  /** 仓库条码 */
  warehouseProductBarcode?: string;
}

/** InventorySnaoshotReq */
export interface InventorySnaoshotReq {
  /** 库存节点编码 */
  inventoryNodeCode?: string;
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

/** InventorySnapQueryResp */
export interface InventorySnapQueryResp {
  /**
   * 库存快照编码描述
   * @format date-time
   */
  snapshotDate?: string;
}

/** InventoryV2QueryListReq */
export interface InventoryV2QueryListReq {
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
  /** 平台 */
  platform?: string;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /**
   * 类型 1-自有仓 2-三方仓 3-FBA平台仓 4-沃尔玛仓 5-tt仓
   * @format int32
   */
  type?: number;
  /** 仓库编码 */
  warehouseCodes?: string[];
}

/** InventoryVcQueryListReq */
export interface InventoryVcQueryListReq {
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

/** InviteRecordBean */
export interface InviteRecordBean {
  /**
   * 审核备注
   * @example "测试"
   */
  auditOpinion?: string;
  /**
   * 当前状态
   * @example "COMPLETED"
   */
  currentStatus?: string;
  /**
   * 状态显示名称
   * @example "已完成"
   */
  currentStatusName?: string;
  /**
   * 邀请码
   * @example "INV20240115001"
   */
  inviteCode?: string;
  /** 邀请人用户ID */
  inviterMemberCode?: string;
  /** 邀请人姓名 */
  inviterName?: string;
  /**
   * 注册时间
   * @format date-time
   * @example "2024-01-15T10:00:00"
   */
  registerTime?: string;
  /**
   * 供应商邮箱
   * @example "contact@abc-tech.com"
   */
  supplierEmail?: string;
  /**
   * 供应商名称
   * @example "ABC科技有限公司"
   */
  supplierName?: string;
}

/** Item */
export interface Item {
  /** 产品五级分类编码 */
  categoryCode?: string;
  /** 产品五级分类名称 */
  categoryName?: string;
  /** 物流方式 */
  logisticMethod?: string;
  /** 物流方式 */
  logisticMethodDesc?: string;
  /** 计划 */
  planner?: string;
  /** 计划 */
  plannerCode?: string;
  /** 产品名称 */
  productName?: string;
  /**
   * 整箱数量
   * @format int32
   */
  qtyBox?: number;
  /** 商品sku */
  skuCode?: string;
  /** 供应sku */
  supplySkuList?: string[];
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
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

/** Item1 */
export interface Item1 {
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
  /** 活动增量-固定三周(3列) */
  activeIncrList?: PsfaiShowWeekBean[];
  /** 品牌编码 */
  brandCode?: string;
  /** 品牌名称 */
  brandName?: string;
  /** 分类名称 */
  categoryName?: string;
  /** 渠道 */
  channel?: string;
  /** 渠道 */
  channelDesc?: string;
  /** 销售预测编码 */
  code?: string;
  /** 国家 */
  country?: string;
  /**
   * 部门id
   * @format int64
   */
  deptId?: number;
  /** 部门 */
  deptName?: string;
  /**
   * 主键ID
   * @format int64
   */
  id?: number;
  /**
   * 上次活动销量
   * @format int32
   */
  lastActivitySales?: number;
  /** 上周销量 */
  lastWeekSales?: string;
  /** 型号 */
  modelCode?: string;
  /** 型号 */
  modelName?: string;
  /**
   * 未映射 0-否 1-是
   * @format int32
   */
  noMapping?: number;
  /** 在线商品标签 */
  onlineSkuCode?: string;
  /** 运营 */
  operator?: string;
  /** 运营 */
  operatorName?: string;
  /** 原平台标识 */
  originalPlatformMark?: string;
  /** 计划人 */
  planner?: string;
  /** 计划人 */
  plannerName?: string;
  /** 产品线 */
  productLineCode?: string;
  /** 产品线 */
  productLineName?: string;
  /** SKU名称 */
  productName?: string;
  /** 销售预测列表 */
  salesForecastItemWeekBeanList?: OdsLuteSalesForecastItemWeekBean[];
  /** 销量列表 */
  salesList?: SalesForecastWeekItemBean[];
  /**
   * 销售状态状态 1-在售 2-不在售
   * @format int32
   */
  salesStatus?: number;
  /** 销售状态状态 1-在售 2-不在售 */
  salesStatusDesc?: string;
  /** 店铺 */
  shop?: string;
  /** SKU名称 */
  skuCode?: string;
  /** SKU标签 */
  skuLabels?: string;
  /** SKU标签 */
  skuLabelsDesc?: string;
  /** spu名称 */
  spuCode?: string;
  /**
   * 预测状态: 1-未上架 2-在销售 3-清仓中 4-已退市
   * @format int32
   */
  status?: number;
  /** 预测状态: 1-未上架 2-在销售 3-清仓中 4-已退市 */
  statusDesc?: string;
  /** 供应链SKU */
  supplySku?: string;
  /** 标签集合 */
  tagItemList?: PsftQueryListRespTagItem[];
  /** 三级分类 */
  thirdCategoryCode?: string;
  /** 三级分类 */
  thirdCategoryName?: string;
  /**
   * 预测类型 1-按商品SKU预测 2-按在线商品预测
   * @format int32
   */
  type?: number;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** ItemInfo */
export interface ItemInfo {
  /**
   * 捆绑产品id
   * @format int64
   */
  bindingId?: number;
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
   * id
   * @format int64
   */
  id?: number;
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
  /** sellerSku */
  sellerSku?: string;
  /** 配送方式code */
  shippingCode?: string;
  /** 配送方式 */
  shippingDesc?: string;
  /** 配送方式列表 - 交互可选 */
  shippingList?: ErpDictBean[];
  /** 商品SKUcode */
  skuCode?: string;
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

/** ItemInfoReq */
export interface ItemInfoReq {
  /**
   * 预计发货数量
   * @format int32
   * @min 1
   * @exclusiveMin false
   */
  estimateQty?: number;
  /** 供应链SKU */
  supplySku?: string;
}

/** ItemInfoRes */
export interface ItemInfoRes {
  /**
   * 预计发货数量
   * @format int32
   */
  estimateQty?: number;
  /**
   * 中仓库存
   * @format int32
   */
  inventory?: number;
  /**
   * 最大发货数量
   * @format int32
   */
  maxEstimateQty?: number;
  /** 产品名称 */
  productName?: string;
  /** 发货方式 1-中仓直发  2-工厂直发 */
  shipMethod?: string;
  /** 发货方式 1-中仓直发  2-工厂直发 */
  shipMethodDesc?: string;
  /** 商品SKU */
  skuCode?: string;
  /** 供应链SKU */
  supplySku?: string;
}

/** LadingBillFileUpdateReq */
export interface LadingBillFileUpdateReq {
  /** 文件key */
  key?: string;
  /** 箱托工具 */
  recordCode?: string;
}

/** LadingBillReq */
export interface LadingBillReq {
  /** 箱托工具编码 */
  recordCode?: string;
}

/** LadingBillResp */
export interface LadingBillResp {
  /** 子提单 */
  bolLadingBillItemBean?: BolLadingBillItemBean;
  /**
   * 是否生成BOL数据 0-未生成 1-已生成
   * @format int32
   */
  isGenerateBolData?: number;
  /**
   * 是否生成BOL文件 0-未生成 1-已生成
   * @format int32
   */
  isGenerateBolFile?: number;
  /** 主提单 */
  ladingBillBean?: BolLadingBillBean;
  /**
   * 箱托类型
   * @format int32
   */
  packageType?: number;
  /** 箱托工具 */
  recordCode?: string;
}

/** LadingBillUpdateReq */
export interface LadingBillUpdateReq {
  /** 子提单 */
  bolLadingBillItemBean?: BolLadingBillItemBean;
  /** 主提单 */
  ladingBillBean?: BolLadingBillBean;
  /** 箱托工具 */
  recordCode?: string;
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

/** LogisticMethodSoftDayTuple */
export interface LogisticMethodSoftDayTuple {
  /** 物流方式编码 */
  code?: string;
  /** 物流方式名称 */
  name?: string;
  /** 物流方式站点 */
  site?: string;
  /**
   * 安全最小周转天数
   * @format int32
   */
  softDay?: number;
}

/** LogisticsChannelAddReq */
export interface LogisticsChannelAddReq {
  /** 物流商对应渠道名称 */
  aliasChannelName?: string;
  /**
   * 带电带磁收费标准(元)
   * @min 0
   * @exclusiveMin false
   */
  batteryFee?: number;
  /** 物流渠道代码 */
  channelCode?: string;
  /** 物流渠道名字 */
  channelName?: string;
  /** 计费类型 */
  chargeType?: string;
  /**
   * 化妆品收费标准(元)
   * @min 0
   * @exclusiveMin false
   */
  cosmeticFee?: number;
  /**
   * 清关费(元/票)
   * @min 0
   * @exclusiveMin false
   */
  customsClearanceFee?: number;
  /**
   * 报关费(元/票)
   * @min 0
   * @exclusiveMin false
   */
  customsDeclarationFee?: number;
  /**
   * 危险品收费标准(元)
   * @min 0
   * @exclusiveMin false
   */
  dangerousFee?: number;
  /** 目的国家 */
  destinationCountry?: string;
  /**
   * 预估时效(天)-结束
   * @format int32
   * @min 0
   * @exclusiveMin false
   */
  estimatedDaysMax?: number;
  /**
   * 预估时效(天)-开始
   * @format int32
   * @min 0
   * @exclusiveMin false
   */
  estimatedDaysMin?: number;
  /** 物流方式 可选值 海运加班船/海运快船/海运普船/卡航/空派/快递/欧洲海运 */
  firstLogTransport?: string;
  /**
   * 食品收费标准(元)
   * @min 0
   * @exclusiveMin false
   */
  foodFee?: number;
  /**
   * 是否加急
   * @format int32
   * @min 0
   * @exclusiveMin false
   * @max 9223372036854776000
   * @exclusiveMax false
   */
  isExpress?: number;
  /**
   * 是否包税
   * @format int32
   * @min 0
   * @exclusiveMin false
   * @max 9223372036854776000
   * @exclusiveMax false
   */
  isTaxIncluded?: number;
  /**
   * 贴标收费标准(元)
   * @min 0
   * @exclusiveMin false
   */
  labelFee?: number;
  /**
   * 皮具收费标准(元)
   * @min 0
   * @exclusiveMin false
   */
  leatherFee?: number;
  /**
   * 带液体收费标准(元)
   * @min 0
   * @exclusiveMin false
   */
  liquidFee?: number;
  /**
   * 最低计费重(kg)
   * @min 0
   * @exclusiveMin false
   */
  minChargeWeight?: number;
  /**
   * 最低计费体积
   * @min 0
   * @exclusiveMin false
   */
  minVolumeThreshold?: number;
  /**
   * 膏体收费标准(元)
   * @min 0
   * @exclusiveMin false
   */
  pasteFee?: number;
  /**
   * 邮编
   * @minLength 0
   * @maxLength 50
   */
  postalCode?: string;
  /**
   * 粉末收费标准(元)
   * @min 0
   * @exclusiveMin false
   */
  powderFee?: number;
  /** 产品属性 general_goods:普货 electric:带电 non_electric:不带电 magnetic_or_electric:带磁/带电 textile:纺织品 food:食品 */
  productAttributes?: string;
  /** 产品类型 ecommerce_general:电商杂货 single_category:单一品类 baby_category:母婴类 cosmetics_category:化妆品类 */
  productType?: string;
  /**
   * 纯液体收费标准(元)
   * @min 0
   * @exclusiveMin false
   */
  pureLiquidFee?: number;
  /** 收货地区 */
  receivingArea?: string;
  /**
   * 预留字段1收费标准(元)
   * @min 0
   * @exclusiveMin false
   */
  reservedOneFee?: number;
  /**
   * 预留字段2收费标准(元)
   * @min 0
   * @exclusiveMin false
   */
  reservedTwoFee?: number;
  /**
   * 敏感货收费标准(元)
   * @min 0
   * @exclusiveMin false
   */
  sensitiveFee?: number;
  /** 发货地 */
  shipFrom?: string;
  /**
   * 启用：0-未启用 1：启用
   * @format int32
   */
  status?: number;
  /** 物流商代码 */
  supplierCode?: string;
  /**
   * 纺织品收费标准(元)
   * @min 0
   * @exclusiveMin false
   */
  textileFee?: number;
  /** 物流渠道 可选值 海运加班船卡派/海运加班船快递派/每运快船/每运快船卡派/海运快船快递派/海运普船/海运普船卡派/海运普船快递派/卡航/卡航卡派/卡航快递派/空派/空运卡派/空运快递派/快递 */
  transportChannel?: string;
  /**
   * 体积重计算系数
   * @format int32
   */
  volumeWeightCoefficient?: number;
  /**
   * 木制品收费标准(元)
   * @min 0
   * @exclusiveMin false
   */
  woodenFee?: number;
}

/** LogisticsChannelBean */
export interface LogisticsChannelBean {
  /** 物流商对应渠道名称 */
  aliasChannelName?: string;
  /**
   * 基础信息更新时间
   * @format date-time
   */
  basicInfoUpdateTime?: string;
  /** 绑定仓库 */
  bindWarehouseList?: LogisticsChannelWarehouseBean[];
  /** 物流渠道代码 */
  channelCode?: string;
  /** 物流渠道名字 */
  channelName?: string;
  /** 计费类型 */
  chargeType?: string;
  /** 计费类型描述 */
  chargeTypeDesc?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 头程物流方式
   * @format int32
   */
  firstLogTransportId?: number;
  /** 头程物流方式-名称 */
  firstLogTransportName?: string;
  /**
   * ID
   * @format int32
   */
  id?: number;
  /** 时效列表 */
  prescriptionList?: LogisticsChannelPrescriptionBean[];
  /**
   * 报价更新时间
   * @format date-time
   */
  priceUpdateTime?: string;
  /**
   * 启用：0-未启用 1：启用
   * @format int32
   */
  status?: number;
  /** 物流商代码 */
  supplierCode?: string;
  /** 物流商名称 */
  supplierName?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /** 更新人 */
  updator?: string;
  /**
   * 体积重计算系数
   * @format int32
   */
  volumeWeightCoefficient?: number;
}

/** LogisticsChannelChangeReq */
export interface LogisticsChannelChangeReq {
  /** @format int32 */
  id: number;
  /**
   * 启用：0-未启用 1：启用
   * @format int32
   */
  status?: number;
}

/** LogisticsChannelDetailResp */
export interface LogisticsChannelDetailResp {
  /** 物流商对应渠道名称 */
  aliasChannelName?: string;
  /**
   * 基础信息更新时间
   * @format date-time
   */
  basicInfoUpdateTime?: string;
  /** 带电带磁收费标准(元) */
  batteryFee?: number;
  /** 物流渠道代码 */
  channelCode?: string;
  /** 物流渠道名称 */
  channelName?: string;
  /** 计费类型 */
  chargeType?: string;
  /** 计费类型描述 */
  chargeTypeDesc?: string;
  /** 化妆品收费标准(元) */
  cosmeticFee?: number;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /** 清关费(元/票) */
  customsClearanceFee?: number;
  /** 报关费(元/票) */
  customsDeclarationFee?: number;
  /** 危险品收费标准(元) */
  dangerousFee?: number;
  /** 递延类型 */
  deferredType?: string;
  /** 递延类型描述 */
  deferredTypeDesc?: string;
  /** 目的国家 */
  destinationCountry?: string;
  /** 目的国家描述 */
  destinationCountryDesc?: string;
  /**
   * 预估时效(天)-结束
   * @format int32
   */
  estimatedDaysMax?: number;
  /**
   * 预估时效(天)-开始
   * @format int32
   */
  estimatedDaysMin?: number;
  /** 物流方式 */
  firstLogTransport?: string;
  /** 食品收费标准(元) */
  foodFee?: number;
  /**
   * 物流渠道ID
   * @format int32
   */
  id?: number;
  /**
   * 是否加急
   * @format int32
   */
  isExpress?: number;
  /** 是否贴标 */
  isLabeled?: string;
  /** 是否贴标描述 */
  isLabeledDesc?: string;
  /**
   * 是否包税
   * @format int32
   */
  isTaxIncluded?: number;
  /** 贴标收费标准(元) */
  labelFee?: number;
  /** 皮具收费标准(元) */
  leatherFee?: number;
  /** 带液体收费标准(元) */
  liquidFee?: number;
  /** 最低计费重(kg) */
  minChargeWeight?: number;
  /** 最低计费体积 */
  minVolumeThreshold?: number;
  /** 膏体收费标准(元) */
  pasteFee?: number;
  /** 邮编 */
  postalCode?: string;
  /** 粉末收费标准(元) */
  powderFee?: number;
  /** 动态报价表头 */
  priceHeader?: PriceHeader[];
  /** 报价列表 */
  priceList?: LogisticsChannelPriceBean[];
  /**
   * 报价更新时间
   * @format date-time
   */
  priceUpdateTime?: string;
  /** 动态报价内容 */
  prices?: object[];
  /** 历史报价 */
  pricesHistory?: object[];
  /** 产品属性 */
  productAttributes?: string;
  /** 产品属性描述 */
  productAttributesDesc?: string;
  /** 产品类型 */
  productType?: string;
  /** 产品类型描述 */
  productTypeDesc?: string;
  /** 纯液体收费标准(元) */
  pureLiquidFee?: number;
  /** 收货地区 */
  receivingArea?: string;
  /** 预留字段1收费标准(元) */
  reservedOneFee?: number;
  /** 预留字段2收费标准(元) */
  reservedTwoFee?: number;
  /** 敏感货收费标准(元) */
  sensitiveFee?: number;
  /** 发货地 */
  shipFrom?: string;
  /**
   * 启用：0-未启用 1：启用
   * @format int32
   */
  status?: number;
  /** 物流商编码 */
  supplierCode?: string;
  /** 物流商名称 */
  supplierName?: string;
  /** 纺织品收费标准(元) */
  textileFee?: number;
  /** 物流渠道 */
  transportChannel?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /** 更新人 */
  updator?: string;
  /** 体积报价列表 */
  volumePriceList?: LogisticsChannelVolumePriceBean[];
  /**
   * 体积重计算系数
   * @format int32
   */
  volumeWeightCoefficient?: number;
  /** 木制品收费标准(元) */
  woodenFee?: number;
}

/** LogisticsChannelListReq */
export interface LogisticsChannelListReq {
  /** 物流渠道代码 */
  channelCode?: string;
  /** 物流渠道名称 */
  channelName?: string;
  /** 目的国家 */
  destCountry?: string;
  /** 物流方式 */
  firstLogTransport?: string;
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
   * 状态
   * @format int32
   */
  status?: number;
  /** 物流商对应渠道名称 */
  supplierChannelName?: string;
  /** 物流商代码 */
  supplierCode?: string;
}

/** LogisticsChannelListResp */
export interface LogisticsChannelListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  recordList?: LogisticsChannelBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** LogisticsChannelPrescriptionBean */
export interface LogisticsChannelPrescriptionBean {
  /** 目的国 */
  destinationCountry?: string;
  /**
   * 时效（天）
   * @format int32
   */
  prescription?: number;
  /**
   * 参考时效最大值
   * @format int32
   */
  prescriptionMax?: number;
}

/** LogisticsChannelPriceBean */
export interface LogisticsChannelPriceBean {
  /**
   * 物流渠道ID
   * @format int32
   */
  channelId?: number;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 生效日期
   * @format date-time
   */
  effectiveDate?: string;
  /** @format int32 */
  id?: number;
  matchContent?: string;
  matchType?: string;
  /** 1000kg+报价(元/kg) */
  price1000kgPlus?: number;
  /** 100kg+报价(元/kg) */
  price100kgPlus?: number;
  /** 1kg+报价(元/kg) */
  price1kgPlus?: number;
  /** 20kg+报价(元/kg) */
  price20kgPlus?: number;
  /** 500kg+报价(元/kg) */
  price500kgPlus?: number;
  /** 50kg+报价(元/kg) */
  price50kgPlus?: number;
}

/** LogisticsChannelPriceUpdateReq */
export interface LogisticsChannelPriceUpdateReq {
  /**
   * 物流渠道ID
   * @format int32
   */
  channelId?: number;
  /**
   * 生效时间
   * @format date-time
   * @example "2023-10-01 12:00:00"
   */
  effectiveDate?: string;
  /** 1000kg+报价(元/kg) */
  price1000kgPlus?: number;
  /** 100kg+报价(元/kg) */
  price100kgPlus?: number;
  /** 1kg+报价(元/kg) */
  price1kgPlus?: number;
  /** 20kg+报价(元/kg) */
  price20kgPlus?: number;
  /** 500kg+报价(元/kg) */
  price500kgPlus?: number;
  /** 50kg+报价(元/kg) */
  price50kgPlus?: number;
}

/** LogisticsChannelSelectDownloadReq */
export interface LogisticsChannelSelectDownloadReq {
  /** 物流渠道ID列表 */
  channelIds?: number[];
  /** 物流商代码 */
  supplierCode?: string;
}

/** LogisticsChannelUpdateReq */
export interface LogisticsChannelUpdateReq {
  /** 物流商对应渠道名称 */
  aliasChannelName?: string;
  /**
   * 带电带磁收费标准(元)
   * @min 0
   * @exclusiveMin false
   */
  batteryFee?: number;
  /** 物流渠道代码 */
  channelCode?: string;
  /** 物流渠道名字 */
  channelName?: string;
  /** 计费类型 */
  chargeType?: string;
  /**
   * 化妆品收费标准(元)
   * @min 0
   * @exclusiveMin false
   */
  cosmeticFee?: number;
  /**
   * 清关费(元/票)
   * @min 0
   * @exclusiveMin false
   */
  customsClearanceFee?: number;
  /**
   * 报关费(元/票)
   * @min 0
   * @exclusiveMin false
   */
  customsDeclarationFee?: number;
  /**
   * 危险品收费标准(元)
   * @min 0
   * @exclusiveMin false
   */
  dangerousFee?: number;
  /** 目的国家 */
  destinationCountry?: string;
  /**
   * 预估时效(天)-结束
   * @format int32
   * @min 0
   * @exclusiveMin false
   */
  estimatedDaysMax?: number;
  /**
   * 预估时效(天)-开始
   * @format int32
   * @min 0
   * @exclusiveMin false
   */
  estimatedDaysMin?: number;
  /** 物流方式 可选值：海运加班船/海运快船/海运普船/卡航/空派/快递/欧洲海运 */
  firstLogTransport?: string;
  /**
   * 食品收费标准(元)
   * @min 0
   * @exclusiveMin false
   */
  foodFee?: number;
  /**
   * 物流渠道ID
   * @format int32
   */
  id?: number;
  /**
   * 是否加急
   * @format int32
   * @min 0
   * @exclusiveMin false
   * @max 9223372036854776000
   * @exclusiveMax false
   */
  isExpress?: number;
  /**
   * 是否包税
   * @format int32
   * @min 0
   * @exclusiveMin false
   * @max 9223372036854776000
   * @exclusiveMax false
   */
  isTaxIncluded?: number;
  /**
   * 贴标收费标准(元)
   * @min 0
   * @exclusiveMin false
   */
  labelFee?: number;
  /**
   * 皮具收费标准(元)
   * @min 0
   * @exclusiveMin false
   */
  leatherFee?: number;
  /**
   * 带液体收费标准(元)
   * @min 0
   * @exclusiveMin false
   */
  liquidFee?: number;
  /**
   * 最低计费重(kg)
   * @min 0
   * @exclusiveMin false
   */
  minChargeWeight?: number;
  /**
   * 最低计费体积
   * @min 0
   * @exclusiveMin false
   */
  minVolumeThreshold?: number;
  /**
   * 膏体收费标准(元)
   * @min 0
   * @exclusiveMin false
   */
  pasteFee?: number;
  /**
   * 邮编
   * @minLength 0
   * @maxLength 50
   */
  postalCode?: string;
  /**
   * 粉末收费标准(元)
   * @min 0
   * @exclusiveMin false
   */
  powderFee?: number;
  /** 产品属性 general_goods:普货 electric:带电 non_electric:不带电 magnetic_or_electric:带磁/带电 textile:纺织品 food:食品 */
  productAttributes?: string;
  /** 产品类型 ecommerce_general:电商杂货 single_category:单一品类 baby_category:母婴类 cosmetics_category:化妆品类 */
  productType?: string;
  /**
   * 纯液体收费标准(元)
   * @min 0
   * @exclusiveMin false
   */
  pureLiquidFee?: number;
  /** 收货地区 */
  receivingArea?: string;
  /**
   * 预留字段1收费标准(元)
   * @min 0
   * @exclusiveMin false
   */
  reservedOneFee?: number;
  /**
   * 预留字段2收费标准(元)
   * @min 0
   * @exclusiveMin false
   */
  reservedTwoFee?: number;
  /**
   * 敏感货收费标准(元)
   * @min 0
   * @exclusiveMin false
   */
  sensitiveFee?: number;
  /** 发货地 */
  shipFrom?: string;
  /**
   * 启用：0-未启用 1：启用
   * @format int32
   */
  status?: number;
  /** 物流商代码 */
  supplierCode?: string;
  /**
   * 纺织品收费标准(元)
   * @min 0
   * @exclusiveMin false
   */
  textileFee?: number;
  /** 物流渠道 可选值：海运加班船卡派/海运加班船快递派/每运快船/每运快船卡派/海运快船快递派/海运普船/海运普船卡派/海运普船快递派/卡航/卡航卡派/卡航快递派/空派/空运卡派/空运快递派/快递 */
  transportChannel?: string;
  /**
   * 体积重计算系数
   * @format int32
   */
  volumeWeightCoefficient?: number;
  /**
   * 木制品收费标准(元)
   * @min 0
   * @exclusiveMin false
   */
  woodenFee?: number;
}

/** LogisticsChannelUploadReq */
export interface LogisticsChannelUploadReq {
  /** 上传地址名字 */
  fileName?: string;
  /** 绝对路径 */
  fileUrl?: string;
  /** 上传地址 */
  ossKey?: string;
  /** 物流商编码 */
  supplierCode?: string;
}

/** LogisticsChannelVolumePriceBean */
export interface LogisticsChannelVolumePriceBean {
  /**
   * 物流渠道ID
   * @format int32
   */
  channelId?: number;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 生效日期
   * @format date-time
   */
  effectiveDate?: string;
  /** @format int32 */
  id?: number;
  matchContent?: string;
  matchType?: string;
  /** 10CBM+ */
  price10cbmPlus?: number;
  /** 1CBM+ */
  price1cbmPlus?: number;
  /** 2CBM+ */
  price2cbmPlus?: number;
  /** 3CBM+ */
  price3cbmPlus?: number;
  /** 4CBM+ */
  price4cbmPlus?: number;
  /** 5CBM+ */
  price5cbmPlus?: number;
  /** 0.5CBM+ */
  priceHalfCbmPlus?: number;
}

/** LogisticsChannelVolumePriceUpdateReq */
export interface LogisticsChannelVolumePriceUpdateReq {
  /**
   * 物流渠道ID
   * @format int32
   */
  channelId?: number;
  /**
   * 生效时间
   * @format date-time
   * @example "2023-10-01 12:00:00"
   */
  effectiveDate?: string;
  /** 10CBM+ */
  price10cbmPlus?: number;
  /** 1CBM+ */
  price1cbmPlus?: number;
  /** 2CBM+ */
  price2cbmPlus?: number;
  /** 3CBM+ */
  price3cbmPlus?: number;
  /** 4CBM+ */
  price4cbmPlus?: number;
  /** 5CBM+ */
  price5cbmPlus?: number;
  /** 0.5CBM+ */
  priceHalfCbmPlus?: number;
}

/** LogisticsChannelWarehouseBean */
export interface LogisticsChannelWarehouseBean {
  /** 仓库编码 */
  warehouseCode?: string;
  /** 仓库名称 */
  warehouseName?: string;
}

/** LogisticsClaimAddReq */
export interface LogisticsClaimAddReq {
  /**
   * 异常数量
   * @format int32
   */
  abnormalQuantity?: number;
  /**
   * 异常分类（1=丢件赔偿，2=货损，3=海关扣件，4=运输时效延误）
   * @format int32
   */
  abnormalType?: number;
  /** 业务单号 */
  businessNo?: string;
  /**
   * 索赔标准（1=按货值+运费赔偿，2=减免运费）
   * @format int32
   */
  claimStandard?: number;
  /** 索赔金额 */
  compensationAmount?: number;
  /** 创建人 */
  creator?: string;
  /** 物流公司 */
  logisticsCompany?: string;
  /** 举证 */
  proofDesc?: string;
  /** 备注 */
  remark?: string;
  /**
   * 索赔类型（1=头程，2=尾程配送，3=退货到海外仓）
   * @format int32
   */
  type?: number;
  /** 单位 */
  unit?: string;
}

/**
 * LogisticsClaimBean
 * 物流索赔单数据实体
 */
export interface LogisticsClaimBean {
  /**
   * 异常数量
   * @format int32
   */
  abnormalQuantity?: number;
  /**
   * 异常分类
   * @format int32
   */
  abnormalType?: number;
  /** 业务单号 */
  businessNo?: string;
  /** 索赔单号 */
  claimNo?: string;
  /**
   * 索赔标准
   * @format int32
   */
  claimStandard?: number;
  /** 赔偿金额 */
  compensationAmount?: number;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 主键ID
   * @format int64
   */
  id?: number;
  /** 证明描述 */
  proofDesc?: string;
  /** 备注 */
  remark?: string;
  /**
   * 状态
   * @format int32
   */
  status?: number;
  /**
   * 物流类型
   * @format int32
   */
  type?: number;
  /** 单位 */
  unit?: string;
}

/** LogisticsClaimInvalidateReq */
export interface LogisticsClaimInvalidateReq {
  /**
   * 索赔单ID
   * @format int64
   */
  id?: number;
}

/** LogisticsClaimPageResp */
export interface LogisticsClaimPageResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 索赔单列表 */
  recordList?: LogisticsClaimBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** LogisticsClaimQueryReq */
export interface LogisticsClaimQueryReq {
  /**
   * 异常分类（1=丢件赔偿，2=货损，3=海关扣件，4=运输时效延误）
   * @format int32
   * @example 1
   */
  abnormalType?: number;
  /**
   * 业务单号（精确匹配，如FBA123456）
   * @example "FBA123456"
   */
  businessNo?: string;
  /**
   * 索赔单号（精确匹配，如C2511001）
   * @example "C2511001"
   */
  claimNo?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /**
   * 结束时间
   * @format date-time
   */
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
  /**
   * 开始时间
   * @format date-time
   */
  startTime?: string;
  /**
   * 状态（1=已生效，2=已废弃）
   * @format int32
   * @example 1
   */
  status?: number;
  /**
   * 索赔类型（1=头程，2=尾程配送，3=退货到海外仓）
   * @format int32
   * @example 1
   */
  type?: number;
}

/** LogisticsClaimUpdateReq */
export interface LogisticsClaimUpdateReq {
  /**
   * 异常数量
   * @format int32
   */
  abnormalQuantity?: number;
  /**
   * 异常分类
   * @format int32
   */
  abnormalType?: number;
  /** 业务编号 */
  businessNo?: string;
  /**
   * 索赔标准
   * @format int32
   */
  claimStandard?: number;
  /** 赔偿金额(RMB) */
  compensationAmount?: number;
  /**
   * 索赔单ID
   * @format int64
   */
  id?: number;
  /** 证明描述 */
  proofDesc?: string;
  /** 备注 */
  remark?: string;
  /**
   * 类型
   * @format int32
   */
  type?: number;
  /** 单位 */
  unit?: string;
}

/** LogisticsConfigBean */
export interface LogisticsConfigBean {
  /** 配置编码 */
  configCode?: string;
  /** 申报中文名称 */
  declareNameCn?: string;
  /** 申报英文名称 */
  declareNameEn?: string;
  /** 产品毛重（kg） */
  grossWeight?: number;
  /** 产品名称（中文） */
  productNameCn?: string;
  /** 产品名称（英文） */
  productNameEn?: string;
  /** 供应链sku */
  productSku?: string;
  /** 单箱的高（cm） */
  unitContainerHeight?: number;
  /** 单箱的长（cm） */
  unitContainerLong?: number;
  /**
   * 单箱数量
   * @format int32
   */
  unitContainerNum?: number;
  /** 单箱重量（kg） */
  unitContainerWeight?: number;
  /** 单箱的宽（cm） */
  unitContainerWidth?: number;
}

/** LogisticsConfigDeleteReq */
export interface LogisticsConfigDeleteReq {
  /** 配置编码 */
  configCodeList?: string[];
}

/** LogisticsConfigQueryListReq */
export interface LogisticsConfigQueryListReq {
  /** 是否同步下载 */
  downLoadSync?: boolean;
  /** 供应链sku/产品名称 */
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
}

/** LogisticsConfigQueryListResp */
export interface LogisticsConfigQueryListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 物流配置 */
  recordList?: LogisticsConfigBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** LogisticsConfigSaveReq */
export interface LogisticsConfigSaveReq {
  /** 配置编码 */
  configCode?: string;
  /** 申报中文名称 */
  declareNameCn?: string;
  /** 申报英文名称 */
  declareNameEn?: string;
  /**
   * 产品毛重（kg）
   * @min 0
   * @exclusiveMin false
   * @max 10000000
   * @exclusiveMax false
   */
  grossWeight?: number;
  /** 产品名称（中文） */
  productNameCn?: string;
  /** 产品名称（英文） */
  productNameEn?: string;
  /** 供应链sku */
  productSku?: string;
  /**
   * 单箱的高（cm）
   * @min 0
   * @exclusiveMin false
   * @max 10000000
   * @exclusiveMax false
   */
  unitContainerHeight?: number;
  /**
   * 单箱的长（cm）
   * @min 0
   * @exclusiveMin false
   * @max 10000000
   * @exclusiveMax false
   */
  unitContainerLong?: number;
  /**
   * 单箱数量
   * @format int32
   * @max 10000000
   * @exclusiveMax false
   */
  unitContainerNum?: number;
  /**
   * 单箱重量（kg）
   * @min 0
   * @exclusiveMin false
   * @max 10000000
   * @exclusiveMax false
   */
  unitContainerWeight?: number;
  /**
   * 单箱的宽（cm）
   * @min 0
   * @exclusiveMin false
   * @max 10000000
   * @exclusiveMax false
   */
  unitContainerWidth?: number;
}

/** LogisticsOpLog */
export interface LogisticsOpLog {
  /** 操作内容 */
  content?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 操作类型 */
  operationType?: string;
  /** 操作人 */
  operator?: string;
}

/** LogisticsReconciliationBean */
export interface LogisticsReconciliationBean {
  /** 实际费用 */
  actualFee?: LogisticsReconciliationFeeBean;
  /**
   * 添加时间
   * @format date-time
   */
  addTime?: string;
  /** 账单号 */
  billNo?: string;
  /**
   * 计费状态 1.待计费2.计费失败3.计费成功4.已出账单
   * @format int32
   */
  calculateFeeStatus?: number;
  /** 计费状态 */
  calculateFeeStatusDesc?: string;
  /** 合同号 */
  contractNo?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /** 目的地国家 */
  destinationCountry?: string;
  /** 目的地国家名称 */
  destinationCountryName?: string;
  /** 预估费用 */
  estimatedFee?: LogisticsReconciliationFeeBean;
  /** FBA ID */
  fbaId?: string;
  /** FBA仓库代码 */
  fbaWarehouseCode?: string;
  /** 货代运单号 */
  freightForwarderNo?: string;
  /**
   * 主键
   * @format int64
   */
  id?: number;
  /** 物流渠道名称 */
  logisticsChannel?: string;
  /** 物流方式 */
  logisticsMethod?: string;
  /** 物流商 */
  logisticsProvider?: string;
  /** 更新者 */
  operator?: string;
  /** 应付账单号 */
  payableNo?: string;
  /**
   * 状态 -1-未知 0-未确认 1-已确认
   * @format int32
   */
  status?: number;
  /** 状态描述 */
  statusDesc?: string;
  /** 税金单号 */
  taxId?: string;
  /** 总体积 */
  totalVolume?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /** 物流单单号 */
  xyLogisticsNo?: string;
}

/** LogisticsReconciliationCommonReq */
export interface LogisticsReconciliationCommonReq {
  billNoList?: string[];
}

/** LogisticsReconciliationFeeBean */
export interface LogisticsReconciliationFeeBean {
  /** 产品附加费 */
  additionalFee?: number;
  /** 计费单价（元/kg） */
  billingUnitPrice?: number;
  /** 计费重（kg） */
  billingWeight?: number;
  /** 赔付金额 */
  compensationAmount?: number;
  /** 清关费 */
  customsClearanceFee?: number;
  /** 报关续页费 */
  customsContinuationFee?: number;
  /** 报关费 */
  customsFee?: number;
  /** 关税 */
  dutyFee?: number;
  /** 关税预付手续费 */
  dutyPrepaymentFee?: number;
  /**
   * 费用币种
   * @minLength 0
   * @maxLength 20
   */
  feeCurrency?: string;
  /**
   * 费用描述
   * @minLength 0
   * @maxLength 400
   */
  feeDescription?: string;
  /**
   * 费用说明备注
   * @minLength 0
   * @maxLength 100
   */
  feeRemark?: string;
  /** 运费 */
  freightFee?: number;
  /** 操作费 */
  handlingFee?: number;
  /** 其他费用 */
  otherFee?: number;
  /** 私人/商业地址附加费 */
  personalAddrFee?: number;
  /** 过港费 */
  portCrossingFee?: number;
  /** 品名附加费 */
  productAdditionalFee?: number;
  /** 偏远附加费 */
  remoteAdditionalFee?: number;
  /**
   * 总箱数
   * @format int32
   */
  totalBoxes?: number;
  /** 总费用 */
  totalFee?: number;
}

/** LogisticsReconciliationPageResp */
export interface LogisticsReconciliationPageResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 记录列表 */
  recordList?: LogisticsReconciliationBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** LogisticsReconciliationQueryReq */
export interface LogisticsReconciliationQueryReq {
  /**
   * 添加时间-结束
   * @format date-time
   */
  addTimeEnd?: string;
  /**
   * 添加时间-开始
   * @format date-time
   */
  addTimeStart?: string;
  /** 账单号 */
  billNo?: string;
  /**
   * 计费状态 1.待计费2.计费失败3.计费成功4.已出账单
   * @format int32
   */
  calculateFeeStatus?: number;
  /** 合同协议号 */
  contractNo?: number;
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
  /** 目的地国家 */
  destinationCountry?: string;
  /** FBA ID */
  fbaId?: string;
  /** FBA仓库代码 */
  fbaWarehouseCode?: string;
  /** 费用描述, 可能有性能问题 */
  feeRemark?: string;
  /** 货代运单号 */
  freightForwarderNo?: string;
  /** 物流渠道名称 */
  logisticsChannel?: string;
  /** 物流商 */
  logisticsProvider?: string;
  /** 物流方式 */
  logisticsTransport?: string;
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
   * 状态 -1-未知 0-未确认 1-已确认
   * @format int32
   */
  status?: number;
  /** 税金单号 */
  taxBill?: number;
  /** 总体积值 */
  totalVolume?: number;
  /** 物流单单号 */
  xyLogisticsNo?: string;
}

/** LogisticsReconciliationUpdateReq */
export interface LogisticsReconciliationUpdateReq {
  actualFee: LogisticsReconciliationFeeBean;
  /** 对账单号 */
  billNo?: string;
}

/** LogisticsSupplierAccountTokenResp */
export interface LogisticsSupplierAccountTokenResp {
  /** token */
  accessToken?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createAt?: string;
  /**
   * 过期时间
   * @format date-time
   */
  expiresIn?: string;
  /** 通知邮箱 */
  relNoticeEmail?: string;
}

/** LogisticsSupplierAddReq */
export interface LogisticsSupplierAddReq {
  /**
   * 状态 0:禁用 1:启用
   * @format int32
   * @min 0
   * @exclusiveMin false
   * @max 9223372036854776000
   * @exclusiveMax false
   */
  status?: number;
  /** 服务商编码 */
  supplierCode?: string;
  /** 服务商名称 */
  supplierName?: string;
  /** 服务商类型 supplier_first:头程服务商 supplier_tail:尾程服务商 */
  supplierType?: string;
}

/** LogisticsSupplierBean */
export interface LogisticsSupplierBean {
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 主键id
   * @format int64
   */
  id?: number;
  /** 关联用户code，对应绑定登录账户 */
  relAccountCode?: string;
  /** 通知邮箱 */
  relNoticeEmail?: string;
  /**
   * 状态 1-启用 0-禁用
   * @format int32
   */
  status?: number;
  /** 供应商编码 */
  supplierCode?: string;
  /** 供应商名 */
  supplierName?: string;
  /** 物流商类型 */
  supplierType?: string;
  /** 物流商类型描述 */
  supplierTypeDesc?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /** 更新操作人 */
  updator?: string;
}

/** LogisticsSupplierChangeReq */
export interface LogisticsSupplierChangeReq {
  /**
   * 状态
   * @format int32
   * @min 0
   * @exclusiveMin false
   * @max 9223372036854776000
   * @exclusiveMax false
   */
  status: number;
  /** 供应商编码 */
  supplierCode: string;
}

/** LogisticsSupplierListReq */
export interface LogisticsSupplierListReq {
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
   * 状态 1-启用 0-禁用
   * @format int32
   */
  status?: number;
  /** 供应商编码 */
  supplierCode?: string;
  /** 供应商名称 */
  supplierName?: string;
  /** 物流商类型 */
  supplierType?: string;
}

/** LogisticsSupplierListResp */
export interface LogisticsSupplierListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  recordList?: LogisticsSupplierBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** LogisticsSupplierRefreshTokenReq */
export interface LogisticsSupplierRefreshTokenReq {
  /** 登录链接发送email，需要更新邮箱时传值 */
  relNoticeEmail?: string;
  /** 供应商编码 */
  supplierCode?: string;
}

/** LogisticsSupplierUpdateReq */
export interface LogisticsSupplierUpdateReq {
  /**
   * 服务商状态 1-启用 0-禁用
   * @format int32
   * @min 0
   * @exclusiveMin false
   * @max 9223372036854776000
   * @exclusiveMax false
   */
  status?: number;
  /** 服务商编码 */
  supplierCode?: string;
  /** 服务商名称 */
  supplierName?: string;
  /** 服务商类型 supplier_first:头程服务商 supplier_tail:尾程服务商 */
  supplierType?: string;
}

/** LogisticsTransportAddReq */
export interface LogisticsTransportAddReq {
  /** 计费方式 volume-体积重量计费 weight-重量计费 max_weight-最大重量计费 */
  chargeType?: string;
  /**
   * 积加运输方式
   * @minLength 0
   * @maxLength 100
   */
  jijiaTransport?: string;
  prescriptionList?: LogisticsTransportPrescriptionBean[];
  /** 发运国 */
  shipperCountry?: string;
  /**
   * 状态：0-禁用 1-启用
   * @format int32
   * @min 0
   * @exclusiveMin false
   * @max 9223372036854776000
   * @exclusiveMax false
   */
  status?: number;
  /** 物流方式简称 */
  transportCode?: string;
  /** 物流方式名称 */
  transportName?: string;
  /**
   * 体积重系数
   * @format int32
   */
  volumeWeightCoefficient?: number;
}

/** LogisticsTransportBean */
export interface LogisticsTransportBean {
  /** 计费方式 */
  chargeType?: string;
  /** 计费方式描述 */
  chargeTypeDesc?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 物流方式ID
   * @format int64
   */
  id?: number;
  /** 积加运输方式 */
  jijiaTransport?: string;
  /** 时效列表 */
  prescriptionList?: LogisticsTransportPrescriptionBean[];
  /** 发运国 */
  shipperCountry?: string;
  /** 发运国描述 */
  shipperCountryDesc?: string;
  /**
   * 状态：0-禁用 1-启用
   * @format int32
   */
  status?: number;
  /** 物流方式编码 */
  transportCode?: string;
  /** 物流方式名称 */
  transportName?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /** 更新人 */
  updator?: string;
  /**
   * 体积重系数
   * @format int32
   */
  volumeWeightCoefficient?: number;
}

/** LogisticsTransportChangeReq */
export interface LogisticsTransportChangeReq {
  /**
   * 物流方式ID
   * @format int64
   */
  id?: number;
  /**
   * 状态：0-禁用 1-启用
   * @format int32
   * @min 0
   * @exclusiveMin false
   * @max 9223372036854776000
   * @exclusiveMax false
   */
  status?: number;
}

/** LogisticsTransportListReq */
export interface LogisticsTransportListReq {
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
  /** 发运国 */
  shipperCountry?: string[];
  /**
   * 状态
   * @format int32
   * @min 0
   * @exclusiveMin false
   * @max 9223372036854776000
   * @exclusiveMax false
   */
  status?: number;
  /** 物流方式编码 */
  transportCode?: string;
  /** 物流方式名称 */
  transportName?: string;
}

/** LogisticsTransportListResp */
export interface LogisticsTransportListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  recordList?: LogisticsTransportBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** LogisticsTransportListV2Req */
export interface LogisticsTransportListV2Req {
  /** 备货站点 */
  stockSite?: string;
}

/** LogisticsTransportListV2Resp */
export interface LogisticsTransportListV2Resp {
  recordList?: LogisticsTransportBean[];
}

/** LogisticsTransportPrescriptionBean */
export interface LogisticsTransportPrescriptionBean {
  /** 目的国 */
  destinationCountry?: string;
  /** 目的国描述 */
  destinationCountryDesc?: string;
  /**
   * 时效（天）
   * @format int32
   */
  prescription?: number;
  /**
   * 时效最大值（天）
   * @format int32
   */
  prescriptionMax?: number;
}

/** LogisticsTransportUpdateReq */
export interface LogisticsTransportUpdateReq {
  /** 计费方式 volume-体积重量计费 weight-重量计费 max_weight-最大重量计费 */
  chargeType?: string;
  /** @format int64 */
  id: number;
  /** 积加运输方式 */
  jijiaTransport?: string;
  prescriptionList?: LogisticsTransportPrescriptionBean[];
  /** 发运国 */
  shipperCountry?: string;
  /**
   * 状态：0-禁用 1-启用
   * @format int32
   * @min 0
   * @exclusiveMin false
   * @max 9223372036854776000
   * @exclusiveMax false
   */
  status?: number;
  /** 物流方式简称 */
  transportCode?: string;
  /** 物流方式名称 */
  transportName?: string;
  /**
   * 体积重系数
   * @format int32
   */
  volumeWeightCoefficient?: number;
}

/** MajorCustomerInfoBean */
export interface MajorCustomerInfoBean {
  /**
   * 币种
   * @example "CNY"
   */
  currency?: string;
  /**
   * 币种名称
   * @example "人民币"
   */
  currencyName?: string;
  /**
   * 客户名
   * @example "华为技术有限公司"
   */
  customerName?: string;
  /**
   * 销售金额
   * @example 5000
   */
  salesAmount?: number;
  /**
   * 交易产品
   * @example "智能手机主板"
   */
  transactionProduct?: string;
  /**
   * 年份
   * @format int32
   * @example 2023
   */
  year?: number;
  /**
   * 月出货量
   * @format int32
   * @example 50000
   */
  yearShipment?: number;
}

/** MappingBean */
export interface MappingBean {
  /**
   * 易仓映射仓库ID
   * @format int64
   */
  ecWarehouseMapping?: number;
  /** 易仓映射仓库名称 */
  ecWarehouseMappingDesc?: string;
}

/** MarkKeyBean */
export interface MarkKeyBean {
  /** 箱唛文件key */
  fileKey?: string;
  /** 订单编码 */
  orderCode?: string;
}

/** MemberBean */
export interface MemberBean {
  /** 账号编码 */
  accountCode?: string;
  /** 头像 */
  avatar?: string;
  /**
   * 部门id
   * @format int64
   */
  deptId?: number;
  /** 部门名称 */
  deptName?: string;
  /** 邮箱 */
  email?: string;
  /** 工号 */
  jobNumber?: string;
  /** 成员Code source=0 则是userCode, =1 则是supplierCode */
  memberCode?: string;
  /** 手机号 */
  mobile?: string;
  /** 成员名称 */
  name?: string;
  /** 昵称 */
  nickname?: string;
  /**
   * 用户所属一级部门id
   * @format int64
   */
  rootDeptId?: number;
  /**
   * 来源: 0-员工 1-供应商
   * @format int32
   */
  source?: number;
  /** 国家 */
  stateCode?: string;
  /**
   * 是否超级管理员 1-是 0-否
   * @format int32
   */
  superAdmin?: number;
  /**
   * 是否角色管理菜单的超级管理员 1-是 0-否
   * @format int32
   */
  superAdminInRoleManagerMenu?: number;
  /** 职称 */
  title?: string;
}

/** MemberListMapQueryResp */
export interface MemberListMapQueryResp {
  /** 成员列表 */
  memberListMap?: Record<string, MemberBean[]>;
}

/** MetaSampleOrderV3ItemBean */
export interface MetaSampleOrderV3ItemBean {
  /**
   * 捆绑产品id
   * @format int64
   */
  bindingId?: number;
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
  /** 单价(查商品中心建议售价) */
  price?: string;
  /** 单价税额 */
  priceTaxAmount?: number;
  /** 商品图片 */
  productImageUrl?: string;
  /** 商品名称 */
  productName?: string;
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

/** ModelRefreshReq */
export interface ModelRefreshReq {
  /** 强制刷新 */
  forceRefresh?: boolean;
  /** 模块编码 */
  modelCode?: string;
  /** 参数 */
  param?: Record<string, object>;
  /**
   * 多少时间后开始实际执行 单位毫秒
   * @format int32
   */
  sleepTime?: number;
}

/** ModifyBaseIno */
export interface ModifyBaseIno {
  /** 提货单号 */
  code?: string;
  /**
   * 提货时间
   * @format date-time
   */
  pickTime?: string;
  /**
   * 提货方式: 0-中仓提货 1-海外仓提货 2-FBA提货
   * @format int32
   */
  pickType?: number;
  /** 提货仓库 */
  pickWarehouseCode?: string;
}

/** ModifyItem */
export interface ModifyItem {
  /**
   * 提货量
   * @format int32
   */
  pickQty?: number;
  /** 关联发货指令编号 */
  shipCommandCodeList?: string[];
  /** 商品SKUcode */
  skuCode?: string;
  /** 供应链SKU */
  supplySku?: string;
}

/** ModifyWarehouseLogisticsReq */
export interface ModifyWarehouseLogisticsReq {
  /** 发货方式 */
  deliveryCode?: string;
  /** erp订单号 */
  erpCodeList?: string[];
  /** 物流渠道 */
  shippingCode?: string;
  /** 发货仓库 */
  warehouseCode?: string;
}

/** Money */
export interface Money {
  amount?: number;
  currency_code?: string;
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

/** NavigationWarehouseListParam */
export interface NavigationWarehouseListParam {
  /** 配送方式列表-天 */
  shippingDayMap?: Record<string, number>;
  /** 配送方式列表 */
  shippingList?: ErpDictBean[];
  /** 仓库代码 */
  warehouseCode?: string;
  /** 仓库名称 */
  warehouseName?: string;
}

/** OdoAbondonReq */
export interface OdoAbondonReq {
  /** 编码 */
  code?: string;
  /**
   * 类型: 1-领用订单 0-自发货单
   * @format int32
   */
  type?: number;
}

/** OdoBatchReq */
export interface OdoBatchReq {
  /** 订单号列表 */
  orderCodeList?: string[];
}

/** OdoDetailAndDraftResp */
export interface OdoDetailAndDraftResp {
  /** 详情 */
  detailResp?: OdoDetailResp;
  /** 草稿详情 */
  draftDetailResp?: OdoDetailResp;
}

/** OdoDetailBaseInfo */
export interface OdoDetailBaseInfo {
  /** 申请人 */
  applicantCode?: string;
  /** 申请人部门 */
  applicantDept?: string;
  /** 申请人 */
  applicantName?: string;
  /** 渠道审批人 */
  channelApprove?: string;
  /** 自发货单号 */
  code: string;
  /** 创建时间 */
  createTime?: string;
  /** B2B客户 */
  customer?: string;
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
  /** 待处理时间 */
  handleTime?: string;
  /**
   * 是否周边产品 0-否 1-是
   * @format int32
   */
  isOutSide?: number;
  /**
   * 产品项数
   * @format int32
   */
  itemCount?: number;
  /** 物流附件 */
  logisticsAtt?: OrderAttachment[];
  /** 物流附件名称 */
  logisticsAttNames?: string;
  /** 市场大区 */
  marketRegion?: string;
  /**
   * 是否钉钉通知 0-否 1-是
   * @format int32
   */
  noticeFlag?: number;
  /** 待出库时间 */
  outTime?: string;
  /** 装箱附件 */
  packingAtt?: OrderAttachment[];
  /** 装箱附件名称 */
  packingAttNames?: string;
  /** 计划员 */
  planner?: string;
  /** PRE销售单号 */
  preSaleCode?: string;
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
  /** 领用场景0-市场 1-渠道 */
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
  /** 承运商 */
  spCode?: string;
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
  /** 仓配单号 */
  woCode?: string;
}

/** OdoDetailItemInfo */
export interface OdoDetailItemInfo {
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
  /**
   * 主键
   * @format int64
   */
  id?: number;
  /**
   * 物品名称
   * @minLength 0
   * @maxLength 20
   */
  itemName?: string;
  /** 物料属性 */
  itemProperties?: string;
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
  /** 销售价格 */
  salePrice?: number;
  /** 配送方式 */
  shippingCode?: string;
  /** 配送方式 */
  shippingDesc?: string;
  /** 配送方式2 */
  shippingDesc2?: string;
  /** 供应链SKU */
  skuCode?: string;
  /** 承运商 */
  spCode?: string;
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
  /** 承运商 */
  spCode?: string;
  /** 承运商名称 */
  spName?: string;
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
  /** 物流查询网址 */
  trackMainUrl?: string;
  /** 物流跟踪号 */
  trackNumList?: string[];
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
  /** 承运商 */
  spCode?: string;
  /** 承运商名称 */
  spName?: string;
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

/** OdoDetailSaveReq */
export interface OdoDetailSaveReq {
  /** 基本信息 */
  baseInfo?: OdoOrderBaseInfo;
  /** 是否自动提交，默认否 true-是 false-否 */
  isAutoSubmit?: boolean;
  /** 是否草稿 是: true  否：false */
  isDaft?: boolean;
  /** 商品信息 */
  itemInfoList?: OdoOrderItemInfo[];
  /** 附件信息 */
  orderAttachmentList?: OrderAttachmentInfoReq[];
  /** 收货信息 */
  receiveInfo?: ReceiveInfoReq;
  /** 领用信息 */
  requisitionInfo?: RequisitionInfo;
}

/** OdoDetailUpdateReq */
export interface OdoDetailUpdateReq {
  /** 基本信息 */
  baseInfo?: OdoDetailBaseInfo;
  /** 是否自动提交,默认否 true-是 false-否 */
  isAutoSubmit?: boolean;
  /** 商品信息 */
  itemInfoList?: OdoDetailItemInfo[];
  /** 订单信息 */
  odoExtraInfo?: OrderExtraInfo;
  /** 附件信息 */
  orderAttachmentList?: OrderAttachmentInfoReq[];
  /** 收货信息 */
  receiveInfo?: ReceiveInfoReq;
}

/** OdoDraftSaveReq */
export interface OdoDraftSaveReq {
  /** 基本信息 */
  baseInfo?: OdoOrderBaseInfo;
  /** 是否自动提交，默认否 true-是 false-否 */
  isAutoSubmit?: boolean;
  /** 是否草稿 是: true  否：false */
  isDaft?: boolean;
  /** 商品信息 */
  itemInfoList?: OdoOrderItemInfo[];
  /** 附件信息 */
  orderAttachmentList?: OrderAttachmentInfoReq[];
  /** 收货信息 */
  receiveInfo?: ReceiveInfoReq;
  /** 领用信息 */
  requisitionInfo?: RequisitionInfo;
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

/** OdoOrderBaseInfo */
export interface OdoOrderBaseInfo {
  /** 实际交易金额 */
  actualAmount?: number;
  /** 渠道审批人 */
  channelApprove?: string;
  /** 订单号 */
  code?: string;
  /** 币种 */
  currencyCode?: string;
  /** B2B客户 */
  customer?: string;
  /** 扩展信息 */
  extraInfo?: string;
  /** GTM审批人 */
  gtmApprove?: string;
  /** 订单备注 */
  orderRemark?: string;
  /** 计划员 */
  planner?: string;
  /** Reference No */
  referenceNo?: string;
  /** 运费 */
  shipAmount?: number;
  /** 唛头 */
  shippingMark?: string;
  /** 卖家账号 */
  shopAccount?: string;
  /** 来源 */
  source?: string;
  /** 用户CRM来源ID */
  sourceCode?: string;
  /**
   * 订单类型 1-领用
   * @format int32
   */
  type?: number;
}

/** OdoOrderItemInfo */
export interface OdoOrderItemInfo {
  /** 发货方式 */
  deliveryCode?: string;
  /** 发货方式 */
  deliveryDesc?: string;
  /** 扩展信息 */
  extraInfo?: string;
  /**
   * 主键
   * @format int64
   */
  id?: number;
  /**
   * 物品名称
   * @minLength 0
   * @maxLength 20
   */
  itemName?: string;
  /** 物料属性 */
  itemProperties?: string;
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
   * 发货数量
   * @format int32
   * @max 99999
   * @exclusiveMax false
   */
  qty?: number;
  /** sale_price */
  salePrice?: number;
  /** 配送方式 */
  shippingCode?: string;
  /** 配送方式 */
  shippingDesc?: string;
  /** 配送方式2 */
  shippingDesc2?: string;
  /** 供应链SKU */
  skuCode?: string;
  /** 承运商 */
  spCode?: string;
  /** 仓库 */
  warehouseCode?: string;
}

/** OdoSaveDraftReqBaseInfo */
export interface OdoSaveDraftReqBaseInfo {
  /** 自发货单号 */
  code?: string;
  /** 销售订单号 */
  erpCode?: string;
  /** 货代 */
  freightForwarding?: string;
  /** 渠道 */
  freightForwardingChannelCode?: string;
  /** 物流附件 */
  logisticsAtt?: UploadReq[];
  /** 装箱附件 */
  packingAtt?: UploadReq[];
  /** 备注 */
  remark?: string;
  /** 发货要求 */
  sendDemand?: string;
  /** 跟踪单号 */
  trackingNum?: string;
}

/** OdoSaveDraftReqItemInfo */
export interface OdoSaveDraftReqItemInfo {
  /** EAN附件 */
  eanAttachment?: UploadReq;
  /**
   * 主键
   * @format int64
   */
  id?: number;
  /** 供应链SKU */
  productSku?: string;
  /** EAN附件 */
  upcAttachment?: UploadReq;
}

/** OdoStatusReverseReq */
export interface OdoStatusReverseReq {
  /** 基本信息 */
  baseInfo?: OdoSaveDraftReqBaseInfo;
  /** 是否草稿 */
  draft?: boolean;
  /** 明细信息 */
  itemInfoList?: OdoSaveDraftReqItemInfo[];
}

/** OdoUploadPackReq */
export interface OdoUploadPackReq {
  /** 自发货单号 */
  code?: string;
  /** 上传列表 */
  uploadReqList?: UploadReq[];
}

/** OdoUploadTrackNumReq */
export interface OdoUploadTrackNumReq {
  /** erpCode单号 */
  erpCode?: string;
  /** 跟踪单号列表 */
  trackNumList?: string[];
}

/** OdoUploadTrackNumReq2 */
export interface OdoUploadTrackNumReq2 {
  /** code */
  code: string;
  /** 跟踪单号列表 */
  trackList: TrackBean[];
  /**
   * 类型 1-领用单 2-自发货单
   * @format int32
   */
  type: number;
  /** 运单号 */
  waybillNo?: string;
}

/** OdsListQueryReq */
export interface OdsListQueryReq {
  /** 出库单号集合 */
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
  /** 创建人 */
  creator?: string;
  /** 发货方式 */
  deliveryCode?: string;
  /** 货代 */
  freightForwarding?: string;
  /** 货代-渠道 */
  freightForwardingChannelCode?: string;
  /** 关键字 出库单号/仓配订单/销售订单号/跟踪单号易仓参考单号/易仓订单号 */
  keyword?: string;
  /** 领用单号/oa单号/仓配订单/自发货订单/跟踪号 */
  keywords?: string;
  /**
   * 出库时间-结束
   * @format date-time
   */
  outTimeEnd?: string;
  /**
   * 出库时间-结束
   * @format date-time
   */
  outTimeStart?: string;
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
  /** 申请人领用人部门 */
  requisitionDept?: string;
  /** 申请人/领用人 */
  requisitioner?: string;
  /** sku */
  sku?: string;
  /**
   * 状态 0-草稿 100-创建 200-待处理 300-待出库 400-已出库 600-废弃
   * @format int32
   */
  status?: number;
  /** 跟踪单号 */
  trackingNum?: string;
  /**
   * 类型 1-领用单 2-自发货单
   * @format int32
   */
  type?: number;
  /** 仓库编码 */
  warehouseCode?: string;
}

/** OdsListQueryResp */
export interface OdsListQueryResp {
  code?: string;
  /** 统计异常 */
  errorStatusCountMap?: Record<string, number>;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 记录 */
  recordList?: OdsListQueryRespItem[];
  /** 统计 */
  statistics?: OdsListQueryRespStatistics;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** OdsListQueryRespItem */
export interface OdsListQueryRespItem {
  /** 交易额 */
  actualAmount?: number;
  /** 申请人 */
  applicantCode?: string;
  /** 申请人部门 */
  applicantDept?: string;
  /** 申请人 */
  applicantName?: string;
  /** 区域 */
  area?: string;
  /** 买家地址 */
  buyerAddress?: string;
  /** 买家地址2 */
  buyerAddress2?: string;
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
  /** 买家手机 */
  buyerMobile?: string;
  /** 买家姓名 */
  buyerName?: string;
  /** 买家电话 */
  buyerPhone?: string;
  /** 买家省份 */
  buyerProvince?: string;
  /** 买家邮编 */
  buyerZipcode?: string;
  /** 渠道审批人 */
  channelApproveName?: string;
  /** 渠道编码 */
  channelCode?: string;
  /** 渠道名称 */
  channelDesc?: string;
  /** 领用订单/出库单 */
  code?: string;
  /** 明细 */
  commonOrderItemBeanList?: CommonOrderItemBean[];
  /** 国家 */
  countryCode?: string;
  /** 国家描述 */
  countryDesc?: string;
  /** 创建时间 */
  createTime?: string;
  /** 币种 */
  currencyCode?: string;
  /** 客户名称 */
  customerName?: string;
  /** 发货方法 */
  deliveryCode?: string;
  /** 发货方法 1-FBA 2-中仓直发 3-海外仓直发 */
  deliveryName?: string;
  /** PRE销售订单号 */
  erpCode?: string;
  /** 异常备注 */
  errorRemark?: string;
  /**
   * 完成时间
   * @format date-time
   */
  finishTime?: string;
  /** 货代 */
  freightForwarding?: string;
  /** 渠道 */
  freightForwardingChannelCode?: string;
  /** 渠道描述 */
  freightForwardingChannelDesc?: string;
  /** 明细描述 */
  itemDesc?: string;
  /** 物流费用 */
  logisticsFees?: number;
  /** 市场大区 */
  marketRegion?: string;
  /** 第三方系统订单号 */
  orderCode?: string;
  /**
   * 出库时间
   * @format date-time
   */
  outTime?: string;
  /** 计划员 */
  planner?: string;
  /** 收货人 */
  receiveName?: string;
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
  /** 发货要求 */
  sendDemand?: string;
  /** 卖家运费 */
  shipAmount?: number;
  /** 配送方式 */
  shippingCode?: string;
  /** 配送方式 */
  shippingDesc?: string;
  /** 卖家账号 */
  shopCode?: string;
  /**
   * sku个数
   * @format int32
   */
  skuCount?: number;
  /** 供应链sku信息 */
  skuDescList?: OwnDeliverySkuBean[];
  /** 来源 */
  source?: string;
  /** 来源单号 */
  sourceCode?: string;
  /** 承运商 */
  spCode?: string;
  /** 承运商名称 */
  spName?: string;
  /**
   * 状态
   * @format int32
   */
  status?: number;
  /** 状态描述 */
  statusDesc?: string;
  /** 仓配系统仓配单号 */
  systemCode?: string;
  /** 系统备注 */
  systemRemark?: string;
  /** 仓配系统销售单号 */
  systemSaleCode?: string;
  /** 仓配系统 */
  thirdSytem?: string;
  /** 物流查询网址 */
  trackMainUrl?: string;
  /** 物流跟踪号 */
  trackNum?: string;
  /** 物流跟踪号 */
  trackNumList?: string[];
  /** 跟踪单号  */
  trackingNumList?: string[];
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
  /** PRE仓配单号 */
  woCode?: string;
  /**
   * 仓配单状态
   * @format int32
   */
  woStatus?: number;
  /** 仓配单状态描述 */
  woStatusDesc?: string;
}

/** OdsListQueryRespStatistics */
export interface OdsListQueryRespStatistics {
  /**
   * *废弃
   * @format int32
   */
  abandon?: number;
  /**
   * 全部
   * @format int32
   */
  all?: number;
  /**
   * 创建
   * @format int32
   */
  create?: number;
  /**
   * *截单
   * @format int32
   */
  cut?: number;
  /**
   * *已发货
   * @format int32
   */
  delivery?: number;
  /**
   * 草稿
   * @format int32
   */
  draft?: number;
  /**
   * *异常
   * @format int32
   */
  error?: number;
  /**
   * *已完成
   * @format int32
   */
  finish?: number;
  /**
   * 已出库
   * @format int32
   */
  out?: number;
  /**
   * *审核中
   * @format int32
   */
  waitAuth?: number;
  /**
   * *待出库
   * @format int32
   */
  waitDelivery?: number;
  /**
   * *待处理
   * @format int32
   */
  waitHandle?: number;
  /**
   * 待出库
   * @format int32
   */
  waitOut?: number;
}

/** OdsLuteSalesForecastItemInventoryMonthBean */
export interface OdsLuteSalesForecastItemInventoryMonthBean {
  /**
   * id
   * @format int64
   */
  id?: number;
  /**
   * itemId
   * @format int64
   */
  itemId?: number;
  /** 月度 */
  month?: string;
  /** 月度值(数据库) */
  monthValue?: string;
  /**
   * 值
   * @format int32
   */
  value?: number;
}

/** OdsLuteSalesForecastItemWeekBean */
export interface OdsLuteSalesForecastItemWeekBean {
  /**
   * id
   * @format int64
   */
  id?: number;
  /**
   * itemId
   * @format int64
   */
  itemId?: number;
  /**
   * 实际预测值
   * @format int32
   */
  realValue?: number;
  /** 展示周期描述 */
  showWeekDesc?: string;
  /**
   * 预测值
   * @format int32
   */
  value?: number;
  /** 周期 */
  week?: string;
  /** 周期描述 */
  weekDesc?: string;
}

/** OnWayInventoryVcQueryListReq */
export interface OnWayInventoryVcQueryListReq {
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

/** OpenApiCustomerSaveReq */
export interface OpenApiCustomerSaveReq {
  /** 客户信息保存 */
  customerSaveBeanList?: CustomerSaveBean[];
}

/** OpenApiCustomerSaveResp */
export interface OpenApiCustomerSaveResp {
  /** 返回结果 */
  result?: CustomerSaveResult[];
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

/** OperationMemberListQueryReq */
export interface OperationMemberListQueryReq {
  /** 成员Code */
  memberCodeList?: string[];
  /** 操作业务成员编码-字典映射 */
  operatorMemberCodeList?: string[];
  /** 是否通过操作业务编码查询 */
  searchOperatorCode?: boolean;
}

/** OperationPackageOrderDetailBean */
export interface OperationPackageOrderDetailBean {
  /** 箱号 */
  boxArea?: string;
  /** 货品 */
  description?: string;
  /** ean/upc */
  eanUpc?: string;
  /** 毛重 */
  grossWeight?: number;
  /** 高度 */
  height?: string;
  /** 海关编码-报关 */
  hsCode?: string;
  /**
   * 明细ID
   * @format int64
   */
  id?: number;
  /** 长度 */
  length?: string;
  /** 立方数 */
  measurement?: number;
  /**
   * 混装合并行数 包括本行
   * @format int32
   */
  mergeCount?: number;
  /** 净重 */
  netWeight?: number;
  /** 箱托编码 */
  recordCode?: string;
  /**
   * 单箱数量
   * @format int32
   */
  singleBoxCount?: number;
  /** 型号 */
  sku?: string;
  /** 总毛重 */
  totalGrossWeight?: number;
  /**
   * 装箱数
   * @format int32
   */
  totalPackageQty?: number;
  /**
   * 总数量
   * @format int32
   */
  totalQty?: number;
  /** 宽度 */
  width?: string;
}

/** OperationPackageOrderInvoiceBean */
export interface OperationPackageOrderInvoiceBean {
  /** 创建日期 */
  createDateStr?: string;
  /** 币种 */
  currency?: string;
  /** 客户地址 */
  customerAddress?: string;
  /** 客户名称 */
  customerName?: string;
  /** 运营主体 */
  exportor?: string;
  /** 海关编码 */
  hsCode?: string;
  /**
   * 发票ID
   * @format int64
   */
  id?: number;
  /** 运营装箱单发票明细 */
  invoiceDetailList?: OperationPackageOrderInvoiceDetailBean[];
  /** 发票号 */
  invoiceNo?: string;
  /** lcCode */
  lcCode?: string;
  /** 其他费用 */
  other?: number;
  /** 付款方式 */
  paymentMethod?: string;
  /** 付款描述 */
  paymentTerm?: string;
  /** 交付地点 */
  placeOfDelivery?: string;
  /** po单号 */
  poCode?: string;
  /** 目的地 */
  portOfDischarge?: string;
  /** 起运地 */
  portOfLading?: string;
  /** 相托工具编码 */
  recordCode?: string;
  /** 销售方 */
  seller?: string;
  /** 销售方地址 */
  sellerAddress?: string;
  /**
   * 运费
   * @format int32
   */
  shippingCharge?: number;
  /** 物流方式 */
  shippingMethod?: string;
  /** 签收时间 */
  signDate?: string;
  /**
   * 小计
   * @format int32
   */
  subTotal?: number;
  /** 总计(英文) */
  totalAmountEn?: string;
  /** 总毛重 */
  totalGrossWeight?: number;
  /**
   * 总装箱数量
   * @format int32
   */
  totalPackageQty?: number;
  /**
   * 总数量
   * @format int32
   */
  totalQty?: number;
  /** 总计 */
  totalValue?: number;
  /** 交易描述 */
  tradeTerm?: string;
}

/** OperationPackageOrderInvoiceDetailBean */
export interface OperationPackageOrderInvoiceDetailBean {
  /** marksNo */
  code?: string;
  /**
   * 发票ID
   * @format int64
   */
  id?: number;
  /** 商品名称 */
  productName?: string;
  /**
   * 数量
   * @format int32
   */
  qty?: number;
  /** 箱托编码 */
  recordCode?: string;
  /** 商品编码 */
  sku?: string;
  /** 总价 */
  totalAmount?: number;
  /** 单价 */
  unitPrice?: number;
}

/** OperationPackageOrderQueryReq */
export interface OperationPackageOrderQueryReq {
  /** 箱托编码 */
  recordCode?: string;
}

/** OperationPackageOrderResp */
export interface OperationPackageOrderResp {
  /**
   * 是否生成数据
   * @format int32
   */
  isGenerateOperateData?: number;
  /**
   * 是否生成文件
   * @format int32
   */
  isGenerateOperateFile?: number;
  /** 运营装箱单 */
  operationPackageOrderBean?: OperationPackageOrderV2Bean;
  /** 运营装箱单发票 */
  operationPackageOrderInvoiceBean?: OperationPackageOrderInvoiceBean;
}

/** OperationPackageOrderTotalBean */
export interface OperationPackageOrderTotalBean {
  /** 总毛重 */
  totalGrossWeight?: number;
  /**
   * 总箱数
   * @format int32
   */
  totalPackageQty?: number;
  /**
   * 总数量
   * @format int32
   */
  totalQty?: number;
  /** 总体积 */
  totalVolumes?: number;
}

/** OperationPackageOrderUpdateFileReq */
export interface OperationPackageOrderUpdateFileReq {
  /** 文件key */
  key?: string;
  /** 记录编码 */
  recordCode?: string;
}

/** OperationPackageOrderUpdateReq */
export interface OperationPackageOrderUpdateReq {
  /** 运营装箱单 */
  operationPackageOrderBean?: OperationPackageOrderV2Bean;
  /** 运营装箱单发票 */
  operationPackageOrderInvoiceBean?: OperationPackageOrderInvoiceBean;
  /** 箱托编码 */
  recordCode?: string;
}

/** OperationPackageOrderV2Bean */
export interface OperationPackageOrderV2Bean {
  /** 公司名称 */
  companyName?: string;
  /** email */
  email?: string;
  /**
   * ID
   * @format int64
   */
  id?: number;
  /** 运营装箱单地址 */
  packageAddress?: string;
  /** 箱单号 */
  plNo?: string;
  /** 箱托编码 */
  recordCode?: string;
  /** 发货信息 */
  shipFromAddressBean?: ShipAddressBean;
  /** 收货信息 */
  shipToAddressBean?: ShipAddressBean;
  /**
   * 签收时间
   * @format date
   */
  signTime?: string;
  /** 签发人 */
  signer?: string;
  /** 运营装箱单明细 */
  skuDetailList?: OperationPackageOrderDetailBean[];
  /** Mobile/Wechat/Whatsapp */
  tel?: string;
  /** 运营装箱单明细合计 */
  totalBean?: OperationPackageOrderTotalBean;
}

/**
 * Order
 * SPS-EDI预校验库存订单数据
 */
export interface Order {
  /** erp订单号 */
  erpCode?: string;
  /** 明细 */
  itemList?: Item[];
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
  /** 折扣金额 */
  discountAmount?: string;
  /**
   * 易仓审核时间
   * @format date-time
   */
  ecAuthTime?: string;
  /** Reference No */
  erpCode?: string;
  /** 异常备注 */
  errorRemark?: string;
  /**
   * 预计到货时间
   * @format date-time
   */
  expectedArrivalTime?: string;
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
  /** 物流URL */
  logisticsUrl?: string;
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
   * os审核时间
   * @format date-time
   */
  osAuthTime?: string;
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
  /** 配送方式 */
  shippingCode?: string;
  /** 配送方式 */
  shippingDesc?: string;
  /** 唛头 */
  shippingMark?: string;
  /** 店铺账号 */
  shopAccount?: string;
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
  spCodeDesc?: string;
  /** 总金额(含税) */
  taxAmount?: number;
  /** 实际交易额(含税) */
  taxRealTransactionAmount?: number;
  /** 交易额(含税) */
  taxTransactionAmount?: number;
  /** 总税费 */
  taxes?: number;
  /** 三方仓出库单号 */
  thirdOutboundNo?: string;
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

/** OrderExtraInfo */
export interface OrderExtraInfo {
  /** 实际交易额 */
  actualAmount?: number;
  /** 币种 */
  currencyCode?: string;
  /** 备注 */
  orderRemark?: string;
  /** 参考单号 */
  refNo?: string;
  /** 运费 */
  shipAmount?: number;
  /** 唛头 */
  shippingMark?: string;
  /** 卖家账号 */
  shopCode?: string;
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
  /** 买家姓名 */
  buyerName?: string;
  /** 买家电话 */
  buyerPhone?: string;
  /** 买家省份 */
  buyerProvince?: string;
  /** 买家备注 */
  buyerRemark?: string;
  /** 买家邮编 */
  buyerZipcode?: string;
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
  /** 签收时间 */
  signTime?: string;
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
  spCodeDesc?: string;
  /** 是否SPS EDI WM客户（SPS EDI WM单有效） */
  spsSendNoticeCustomer?: boolean;
  /** 配送方式是否快递（SPS EDI WM单有效） */
  spsShipCodeExpress?: boolean;
  /** 系统备注 */
  systemRemark?: string;
  /** 总金额(含税) */
  taxAmount?: number;
  /** 实际交易额(含税) */
  taxRealTransactionAmount?: number;
  /** 交易额(含税) */
  taxTransactionAmount?: number;
  /** 总税费 */
  taxes?: number;
  /** 三方仓出库单号 */
  thirdOutboundNo?: string;
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
  error?: number;
  /** @format int32 */
  send?: number;
  /** @format int32 */
  waitAuth?: number;
  /** @format int32 */
  waitConfirm?: number;
  /** @format int32 */
  waitSend?: number;
}

/** OrderMarkDeliveryReq */
export interface OrderMarkDeliveryReq {
  /** 仓配订单编号 */
  code: string;
  /** 服务号 谷仓订单编号 */
  serviceCode: string;
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
}

/** OrderRemarkSaveReq */
export interface OrderRemarkSaveReq {
  /** 批量备注erpCode */
  erpCodes?: string[];
  /** 备注 */
  remark: string;
}

/** OrderSaveBaseInfo */
export interface OrderSaveBaseInfo {
  /**
   * 是否自动拆单 0-否 1-是
   * @format int32
   */
  autoSubOrder?: number;
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
  /** 来源订单信息 */
  sourceOrderInfo?: string;
  /** 承运商 */
  spCode?: string;
  /** 商品税费 */
  taxes?: number;
  /** 小费 */
  tipAmount?: number;
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
  /** 卖家SKU */
  sellerSku?: string;
  /** 配送方式code */
  shippingCode?: string;
  /** 商品SKUcode */
  skuCode?: string;
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
  /** 销售SKU */
  sellerSku?: string;
  /** 配送方式code */
  shippingCode?: string;
  /** 商品SKUcode */
  skuCode?: string;
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

/** OrderUpdateUploadReq */
export interface OrderUpdateUploadReq {
  /** 附件信息 */
  attachmentInfoList?: OrderAttachmentInfoReq[];
  /** 订单号列表 */
  orderCodeList?: string[];
}

/** OsLogisticsClaim */
export interface OsLogisticsClaim {
  /** @format int32 */
  abnormalQuantity?: number;
  /** @format int32 */
  abnormalType?: number;
  businessNo?: string;
  claimNo?: string;
  /** @format int32 */
  claimStandard?: number;
  companyCode?: string;
  compensationAmount?: number;
  /** @format date-time */
  createTime?: string;
  creator?: string;
  /** @format byte */
  deleted?: string;
  extraInfo?: string;
  /** @format int64 */
  id?: number;
  proofDesc?: string;
  remark?: string;
  /** @format int32 */
  type?: number;
  unit?: string;
  /** @format date-time */
  updateTime?: string;
}

/** OsLogisticsClaimLog */
export interface OsLogisticsClaimLog {
  /** @format int64 */
  claimId?: number;
  claimNo?: string;
  companyCode?: string;
  /** @format byte */
  deleted?: string;
  extraInfo?: string;
  /** @format int64 */
  id?: number;
  operateContent?: string;
  /** @format date-time */
  operateTime?: string;
  operateType?: string;
  operator?: string;
}

/** OverseaFirstVesselQueryListReq */
export interface OverseaFirstVesselQueryListReq {
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

/** OverseaSendQueryListReq */
export interface OverseaSendQueryListReq {
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

/** OverseaSendQueryListResp */
export interface OverseaSendQueryListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  recordList?: OverseaSendQueryListRespItem[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** OverseaSendQueryListRespItem */
export interface OverseaSendQueryListRespItem {
  /** 创建时间 */
  addTime?: string;
  /** 金额 */
  amount?: number;
  /** 三方仓库产品代码 */
  barcodeCode?: string;
  /** 数量（箱） */
  boxCount?: string;
  /** 头程费用币种 */
  costCurrencyCode?: string;
  /** 目的地 */
  destination?: string;
  /** 预计到货时间 */
  expectedDate?: string;
  /** 头程费用 */
  headFreight?: number;
  /** 头程关税 */
  headTariff?: number;
  /** 收件人城市 */
  oabCity?: string;
  /** 收件人公司 */
  oabCompany?: string;
  /** 收件人邮编 */
  oabCounty?: string;
  /** 收件人门牌号 */
  oabDoorplate?: string;
  /** 收件人电子邮件 */
  oabEmail?: string;
  /** 传真 */
  oabFax?: string;
  /** 收件人 */
  oabName?: string;
  /** 联系电话 */
  oabPhone?: string;
  /** 收件人邮编 */
  oabPostcode?: string;
  /** 收件人州/区域 */
  oabState?: string;
  /** 收件人地址1 */
  oabStreetAddress1?: string;
  /** 收件人地址2 */
  oabStreetAddress2?: string;
  /** 产品数量 */
  opQuantity?: string;
  /**
   * 产品付款时间
   * @format date-time
   */
  opRefPaydate?: string;
  /** 订单号 */
  orderCode?: string;
  /** 内件数 */
  parcelQuantity?: string;
  /** 产品代码 */
  productBarcode?: string;
  /** 产品名称 */
  productTitle?: string;
  /** 产品单重（kg） */
  productWeight?: number;
  /** 收货状态0删除,1草稿,2确认,3待审核,4审核,5在途,6收货中,7收货完成 */
  receivingStatus?: string;
  /** 参考号 */
  refNo?: string;
  /** 入库单号 */
  referenceNo?: string;
  /** 备注 */
  remark?: string;
  /** 出库时间 */
  shipTime?: string;
  /** 运输方式代码 */
  smCode?: string;
  /** 运输方式代码中文名称 */
  smNameCn?: string;
  /** 包裹重量（kg） */
  soWeight?: string;
  /** 系统重量（kg） */
  systemWeight?: string;
  /** 头程关税币种 */
  tariffCurrencyCode?: string;
  /** 目的仓库 */
  toWarehouse?: string;
  /**
   * 目的仓库id
   * @format int32
   */
  toWarehouseId?: number;
  /** 产品总重量（kg，产品单重*产品数量） */
  totalWeight?: number;
  /** 下架单号 */
  tpCode?: string;
  /** 跟踪号 */
  trackingNumber?: string;
  /** 更新时间 */
  updatedTime?: string;
  /** 平台账号 */
  userAccount?: string;
  /** 产品体积（cm³） */
  volume?: string;
  /** 发运仓库 */
  warehouse?: string;
  /**
   * 发运仓库id
   * @format int32
   */
  warehouseId?: number;
}

/** OwnDeliverySkuBean */
export interface OwnDeliverySkuBean {
  /**
   * sku数量
   * @format int32
   */
  count?: number;
  /** sku价格 */
  price?: number;
  /** sku */
  sku?: string;
  /** sku名称 */
  skuName?: string;
}

/** PackageChooseOrderListCheckReq */
export interface PackageChooseOrderListCheckReq {
  /** 订单数据源列表 */
  orderIdList?: number[];
  /**
   * 装箱类型 1-单独装箱 2-合并装箱
   * @format int32
   */
  packageType?: number;
}

/** PackageChooseOrderListReq */
export interface PackageChooseOrderListReq {
  /** 选择数据源ID列表 */
  orderIdList?: number[];
}

/** PackageChooseOrderListResp */
export interface PackageChooseOrderListResp {
  /** 订单列表 */
  orderList?: SourceOrderBean[];
}

/** PackageChooseSourceOrderListReq */
export interface PackageChooseSourceOrderListReq {
  /**
   * 创建时间-结束
   * @format date
   */
  createTimeEnd?: string;
  /**
   * 创建时间-开始
   * @format date
   */
  createTimeStart?: string;
  /** 创建人编码 */
  creator?: string;
  /** 客户名称 */
  customerName?: string;
  /**
   * 物流审核时间-结束
   * @format date
   */
  logisticsAuditTimeEnd?: string;
  /**
   * 物流审核时间-开始
   * @format date
   */
  logisticsAuditTimeStart?: string;
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
  /** 参考单号 */
  referenceCode?: string;
  /** 发货仓库 */
  warehouseCode?: string;
}

/** PackageChooseSourceOrderListResp */
export interface PackageChooseSourceOrderListResp {
  code?: string;
  message?: string;
  /** 订单列表 */
  orderList?: SourceOrderBean[];
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

/** PackageGeneratePackageMarkDataReq */
export interface PackageGeneratePackageMarkDataReq {
  /** 装箱单号列表 */
  billCodeList?: string[];
}

/** PackageGeneratePalletMarkDataReq */
export interface PackageGeneratePalletMarkDataReq {
  /** 装箱单号列表 */
  recordCode?: string;
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

/** PackageMarkConfirmReq */
export interface PackageMarkConfirmReq {
  /** 箱唛文件Key列表 */
  fileKeyList?: MarkKeyBean[];
  /**
   * 文件方式 1-全部订单生成一份箱唛文件 2-根据订单号生成想想买文件
   * @format int32
   */
  fileType?: number;
  /** 箱唛数据列表 */
  markDataList?: PackageMarkData[];
  /** 装箱模板 -前端自定义模板编码，对应上就好，后端只保存 */
  packageModuleType?: string;
  /** 箱唛文件 */
  recordCode?: string;
}

/** PackageMarkConfirmV2Req */
export interface PackageMarkConfirmV2Req {
  /** 箱唛文件Key列表 */
  fileKeyList?: MarkKeyBean[];
  /**
   * 文件方式 1-全部订单生成一份箱唛文件 2-根据订单号生成想想买文件
   * @format int32
   */
  fileType?: number;
  /** 装箱模板 -前端自定义模板编码，对应上就好，后端只保存 */
  packageModuleType?: string;
  /** 箱唛文件 */
  recordCode?: string;
}

/** PackageMarkData */
export interface PackageMarkData {
  /** 装箱单号 */
  bilCode?: string;
  /**
   * 箱数
   * @format int32
   */
  boxNumber?: number;
  /** 二维码类型 upc/ean */
  codeType?: string;
  /** 客户产品编码 */
  customerSku?: string;
  /** 描述 */
  description?: string;
  /** 二维码 - upc/ean */
  eanCode?: string;
  /** 箱唛文件keys */
  fileKey?: string;
  /**
   * 箱唛记录id
   * @format int64
   */
  id?: number;
  /** 是否混箱 Y/N */
  mixedCarton?: string;
  /** 订单号 */
  orderCode?: string;
  /** 参考单号 */
  poCode?: string;
  /**
   * 数量
   * @format int32
   */
  qty?: number;
  /** 箱唛记录编码 */
  recordCode?: string;
  /** 送货地址 */
  shipFromAddress?: string;
  /** 收货地址 */
  shipToAddress?: string;
  /**
   * 总箱数
   * @format int32
   */
  totalBoxQty?: number;
  /** 产品编码 */
  vendorSku?: string;
}

/** PackageMarkDataPageReq */
export interface PackageMarkDataPageReq {
  /** 装箱单号列表 */
  billCodeList?: string[];
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

/** PackageMarkDataPageResp */
export interface PackageMarkDataPageResp {
  code?: string;
  /**
   * 是否生成箱唛 0-未生成 1-已生成
   * @format int32
   */
  isGenerateMark?: number;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 箱唛信息 */
  respList?: PackageMarkData[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** PackageMarkDataReq */
export interface PackageMarkDataReq {
  /** 装箱单号列表 */
  billCodeList?: string[];
}

/** PackageMarkDataResp */
export interface PackageMarkDataResp {
  /**
   * 是否生成箱唛 0-未生成 1-已生成
   * @format int32
   */
  isGenerateMark?: number;
  /** 箱唛信息 */
  respList?: PackageMarkData[];
}

/** PackageMarkDownLoadReq */
export interface PackageMarkDownLoadReq {
  /** 记录编码 */
  recordCode?: string;
}

/** PackageMarkGeneratorFileReq */
export interface PackageMarkGeneratorFileReq {
  /** 箱唛文件模板列表 */
  fileDataList?: MarkKeyBean[];
  /**
   * 文件方式 1-全部订单生成一份箱唛文件 2-根据订单号生成文件
   * @format int32
   */
  fileType?: number;
  /** 装箱模板 -前端自定义模板编码，对应上就好，后端只保存 */
  packageModuleType?: string;
  /** 箱唛文件 */
  recordCode?: string;
}

/** PackageMarkListQueryReq */
export interface PackageMarkListQueryReq {
  /** 装箱单信息 */
  recordCode?: string;
}

/** PackageMarkListQueryResp */
export interface PackageMarkListQueryResp {
  /**
   * 文件类型 1.全部订单生成一份箱唛文件 2.根据订单号生成箱唛文件
   * @format int32
   */
  fileType?: number;
  /** 文件类型  1.全部订单生成一份箱唛文件 2.根据订单号生成箱唛文件 */
  fileTypeDesc?: string;
  /** 装箱单、打托单是否生成状态 */
  generateStatusBean?: PalletGenerateStatusBean;
  /** 模板 */
  packageModuleType?: string;
  /** 模块类型--作废 */
  packageModuleTypeDesc?: string;
  /**
   * 1.单独 2.合并
   * @format int32
   */
  packageType?: number;
  /** 装箱单 */
  palletPackageDetailList?: PackageOrderInfo[];
}

/** PackageOrderDownLoadReq */
export interface PackageOrderDownLoadReq {
  /** 箱托编码 */
  recordCode?: string;
}

/** PackageOrderInfo */
export interface PackageOrderInfo {
  /** 装箱单号 */
  billCode?: string;
  /** 高列表 */
  boxHeightList?: BoxPropertyItem[];
  /** 长列表 */
  boxLengthList?: BoxPropertyItem[];
  /** 毛重 */
  boxWeightList?: BoxPropertyItem[];
  /** 宽列表 */
  boxWidthList?: BoxPropertyItem[];
  /** 装箱单明细 */
  itemList?: PackageOrderItem[];
  /** 托盘号 */
  palletNumberList?: BoxPropertyItem[];
  /** 单独装箱 itle属性 装箱单号 参考单号 客户名称 装箱数量 */
  titleProperty?: PackageOrderTitle;
}

/** PackageOrderItem */
export interface PackageOrderItem {
  /** 装箱单号 */
  billCode?: string;
  /** 装箱单明细-所在箱数量 */
  boxItemList?: BoxDescItem[];
  /** 客户名称 */
  customerName?: string;
  /** 订单号 */
  orderCode?: string;
  /** 产品名称 */
  productName?: string;
  /**
   * 数量
   * @format int32
   */
  qty?: number;
  /** 箱托编码 */
  recordCode?: string;
  /** 参考单号 */
  referenceCode?: string;
  /** 产品 */
  sku?: string;
}

/** PackageOrderTitle */
export interface PackageOrderTitle {
  /** 客户名称 */
  customerName?: string;
  /** 订单号 */
  orderCode?: string;
  /** 参考单号 */
  referenceCode?: string;
  /**
   * 总箱数
   * @format int32
   */
  totalBox?: number;
}

/** PackageOrderUpdateReq */
export interface PackageOrderUpdateReq {
  /** 装箱单明细 */
  packageDetailList?: PackageOrderInfo[];
  /**
   * 装箱类型 1-单独装箱 2-合并装箱
   * @format int32
   */
  packageType?: number;
  /** 箱托编码 编辑时候不为空 */
  recordCode?: string;
  /**
   * 来源类型 1-选择装箱 2-上传订单装箱
   * @format int32
   */
  sourceType?: number;
}

/** PackageOrderUploadReq */
export interface PackageOrderUploadReq {
  /** 上传地址名字 */
  fileName?: string;
  /** 绝对路径 */
  fileUrl?: string;
  /** 上传地址 */
  ossKey?: string;
  /**
   * 装箱单类型 1-单独装箱 2-合并装箱
   * @format int32
   */
  packageType?: number;
  /** 记录编码 */
  recordCode?: string;
}

/** PackageOrderUploadWithOutOrderReq */
export interface PackageOrderUploadWithOutOrderReq {
  /** 当前操作人 */
  creator?: string;
  /** 上传地址名字 */
  fileName?: string;
  /** 绝对路径 */
  fileUrl?: string;
  /** 上传地址 */
  ossKey?: string;
}

/** PackageSingleMarkConfirmReq */
export interface PackageSingleMarkConfirmReq {
  /** 箱唛数据 */
  markData?: PackageMarkData;
  /** 箱唛文件 */
  recordCode?: string;
}

/** PackageStatusReq */
export interface PackageStatusReq {
  /** 箱托工具编码 */
  recordCode?: string;
}

/** PackageTemplateReq */
export interface PackageTemplateReq {
  /**
   * 箱数
   * @format int32
   */
  boxCount?: number;
  /** 订单号列表 */
  orderCodeList?: string[];
  /**
   * 装箱类型 1-单独装箱 2-合装箱
   * @format int32
   */
  packageType?: number;
  /** 参考单号 */
  referenceCodeList?: string[];
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

/** PalletBean */
export interface PalletBean {
  /** 装箱单号 */
  billCode?: string;
  /** 托盘箱号 */
  palletBoxList?: PalletBoxBean[];
}

/** PalletBoxBean */
export interface PalletBoxBean {
  /**
   * 箱号
   * @format int32
   */
  boxNumber?: number;
  /**
   * 托盘号
   * @format int32
   */
  palletNumber?: number;
}

/** PalletDataPageReq */
export interface PalletDataPageReq {
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
  /** 箱托编码 */
  recordCode?: string;
}

/** PalletDataPageResp */
export interface PalletDataPageResp {
  code?: string;
  /**
   * 是否生成托唛 0-未生成 1-已生成
   * @format int32
   */
  generatePalletMark?: number;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 托唛数据 */
  respList?: PalletMarkDataBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** PalletDataReq */
export interface PalletDataReq {
  /** 箱托编码 */
  recordCode?: string;
}

/** PalletDataResp */
export interface PalletDataResp {
  /**
   * 是否生成托唛 0-未生成 1-已生成
   * @format int32
   */
  generatePalletMark?: number;
  /** 托唛数据 */
  respList?: PalletMarkDataBean[];
}

/** PalletDetailDownLoadReq */
export interface PalletDetailDownLoadReq {
  code?: string;
  message?: string;
  /**
   * 箱托类型 1-单独装箱 2-合装箱
   * @format int32
   */
  packageType?: number;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 箱托编码 */
  recordCode?: string;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** PalletGenerateStatusBean */
export interface PalletGenerateStatusBean {
  /**
   * 是否生成装箱单 0-未生成 1-已成成
   * @format int32
   */
  isGeneratePackageOrder?: number;
  /**
   * 是否生成托唛文件  0-未生成 1-已成成
   * @format int32
   */
  isGeneratePalletMark?: number;
  /**
   * 是否生成打托单  0-未生成 1-已成成
   * @format int32
   */
  isGeneratePalletOrder?: number;
}

/** PalletInboundBean */
export interface PalletInboundBean {
  /**
   * 申报数量
   * @format int32
   */
  applyQty?: number;
  /** 目的地 */
  destination?: string;
  /** 高 */
  height?: number;
  /** 入库单的key */
  key?: string;
  /** 长 */
  length?: number;
  /** 物流渠道 */
  logisticChannel?: string;
  /** 物流商 */
  logisticsProvider?: string;
  /**
   * 箱数
   * @format int32
   */
  piece?: number;
  /** 品名 */
  productName?: string;
  /** 箱托编码 */
  recordCode?: string;
  /** 货件号 */
  shipmentNo?: string;
  /** sku */
  sku?: string;
  /** 卡板高度 */
  weight?: number;
  /** 宽 */
  width?: number;
}

/** PalletInboundReq */
export interface PalletInboundReq {
  /** 箱托记录编码 */
  recordCode?: string;
}

/** PalletInboundResp */
export interface PalletInboundResp {
  /** 入库单数量 */
  inboundList?: PalletInboundBean[];
}

/** PalletInboundUpdateFileReq */
export interface PalletInboundUpdateFileReq {
  /** 文件key */
  key?: string;
  /** 箱托记录编码 */
  recordCode?: string;
}

/** PalletInboundUpdateReq */
export interface PalletInboundUpdateReq {
  inboundList?: PalletInboundBean[];
  /** 箱托记录编码 */
  recordCode?: string;
}

/** PalletMarkConfirmReq */
export interface PalletMarkConfirmReq {
  /** 托唛数据 */
  palletMarkDataBeanList?: PalletMarkDataBean[];
  /** 箱唛文件 */
  recordCode?: string;
}

/** PalletMarkDataBean */
export interface PalletMarkDataBean {
  /** 托唛单号 */
  code?: string;
  /** 发货地址 */
  fromAddress?: string;
  /**
   * 托唛id
   * @format int64
   */
  id?: number;
  /** 箱唛文件key */
  key?: string;
  /** 总件数 */
  mixPallet?: string;
  /** 订单号 */
  orderCode?: string;
  /**
   * 托唛数量
   * @format int32
   */
  palletNumber?: number;
  /** 参考号1 */
  refNo1?: string;
  /** 参考号2 */
  refNo2?: string;
  /** 参考单号 */
  referenceCode?: string;
  /** 收货地址 */
  shipAddress?: string;
  /** sku列表 */
  skuDetailList?: PalletSkuDetail[];
  /**
   * 总箱数
   * @format int32
   */
  totalBoxQty?: number;
  /**
   * 托唛总数量
   * @format int32
   */
  totalPalletNumber?: number;
}

/** PalletMarkFileConfirmReq */
export interface PalletMarkFileConfirmReq {
  /** 托唛文件Key */
  key?: string;
  /** 箱托编码 */
  recordCode?: string;
}

/** PalletMarkSingleConfirmReq */
export interface PalletMarkSingleConfirmReq {
  /** 托唛数据 */
  markData?: PalletMarkDataBean;
  /** 箱唛文件 */
  recordCode?: string;
}

/** PalletOrderUpdateReq */
export interface PalletOrderUpdateReq {
  /** 托盘箱号列表 */
  palletList?: PalletBean[];
  /** 箱托编码 编辑时候不为空 */
  recordCode?: string;
}

/** PalletOrderUploadReq */
export interface PalletOrderUploadReq {
  /** 上传地址名字 */
  fileName?: string;
  /** 绝对路径 */
  fileUrl?: string;
  /** 上传地址 */
  ossKey?: string;
  /**
   * 装箱单类型 1-单独装箱 2-合并装箱
   * @format int32
   */
  packageType?: number;
  /** 箱托编码 */
  recordCode?: string;
}

/** PalletPackageDeleteReq */
export interface PalletPackageDeleteReq {
  /** 编码 */
  recordCode?: string;
}

/** PalletPackageDetailReq */
export interface PalletPackageDetailReq {
  /** 箱唛托唛记录编码 */
  recordCode?: string;
}

/** PalletPackageDetailResp */
export interface PalletPackageDetailResp {
  /** 选择订单列表 合并装箱返回的list只有有一个元素 */
  chooseOrderInfoList?: SourceOrderBean[];
  /**
   * 文件类型
   * @format int32
   */
  fileType?: number;
  /** 箱唛 */
  markList?: string[];
  /**
   * 模板类型
   * @format int32
   */
  packageModuleType?: number;
  /**
   * 装箱类型 1-单独装箱 2-合并装箱
   * @format int32
   */
  packageType?: number;
  /** 装箱单 */
  palletPackageDetailList?: PackageOrderInfo[];
}

/** PalletPackageNameUpdateReq */
export interface PalletPackageNameUpdateReq {
  /** 记录编码 */
  recordCode: string;
  /** 记录名称 */
  recordName: string;
}

/** PalletPackageQueryReq */
export interface PalletPackageQueryReq {
  /** 创建人 */
  creator?: string;
  /** 编码/订单号/客户名称 */
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
  /** 更新人 */
  updator?: string;
}

/** PalletPackageQueryResp */
export interface PalletPackageQueryResp {
  code?: string;
  message?: string;
  /** 订单列表 */
  orderList?: PalletPackageRecord[];
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

/** PalletPackageRecord */
export interface PalletPackageRecord {
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /** 创建人名称 */
  creatorName?: string;
  /** 客户名称 */
  customerName?: string;
  /**
   * BOL（提单）文件  0-未生成 1-已生成
   * @format int32
   */
  hasBolFile?: number;
  /** BOL（提单）文件  0-未生成 1-已生成 */
  hasBolFileDesc?: string;
  /**
   * 入库单  0-未生成 1-已生成
   * @format int32
   */
  hasInbound?: number;
  /** 入库单  0-未生成 1-已生成 */
  hasInboundDesc?: string;
  /**
   * 运营装箱单  0-未生成 1-已生成
   * @format int32
   */
  hasOperationPackage?: number;
  /** 运营装箱单  0-未生成 1-已生成 */
  hasOperationPackageDesc?: string;
  /**
   * 装箱单文件 0-未生成 1-已生成
   * @format int32
   */
  hasPackageFile?: number;
  /** 装箱单文件 0-未生成 1-已生成 */
  hasPackageFileDesc?: string;
  /**
   * 箱唛文件 0-未生成 1-已生成
   * @format int32
   */
  hasPackageMark?: number;
  /** 箱唛文件 0-未生成 1-已生成 */
  hasPackageMarkDesc?: string;
  /**
   * 打托文件 0-未生成 1-已生成
   * @format int32
   */
  hasPalletFile?: number;
  /** 打托文件 0-未生成 1-已生成 */
  hasPalletFileDesc?: string;
  /**
   * 托唛文件 0-未生成 1-已生成
   * @format int32
   */
  hasPalletMark?: number;
  /** 托唛文件 0-未生成 1-已生成 */
  hasPalletMarkDesc?: string;
  /**
   * 记录ID
   * @format int64
   */
  id?: number;
  /** 订单列表 */
  orderCodeList?: string[];
  /** 编码 */
  recordCode?: string;
  /** 名称 */
  recordName?: string;
  /** 参考单号 */
  referenceCode?: string;
  /**
   * 类型
   * @format int32
   */
  sourceType?: number;
  /** 类型 */
  sourceTypeDesc?: string;
  /**
   * 装箱类型
   * @format int32
   */
  type?: number;
  /** 装箱类型描述 */
  typeDesc?: string;
  /**
   * 修改时间
   * @format date-time
   */
  updateTime?: string;
  /** 更新人 */
  updator?: string;
  /** 更新人名称 */
  updatorName?: string;
}

/** PalletPackageZipDownLoadReq */
export interface PalletPackageZipDownLoadReq {
  /** 箱托编码 */
  recordCode?: string;
}

/** PalletSkuDetail */
export interface PalletSkuDetail {
  /**
   * id
   * @format int64
   */
  id?: number;
  /**
   * 托盘号
   * @format int32
   */
  palletNumber?: number;
  /** sku */
  sku?: string;
  /**
   * sku对应箱数
   * @format int32
   */
  totalBoxCount?: number;
}

/** PalletStatusBean */
export interface PalletStatusBean {
  /**
   * 是否完成 0-未完成 1-已完成
   * @format int32
   */
  isFinish?: number;
  /**
   * 是否生成BOL（提单）数据 0-未生成 1-已生成
   * @format int32
   */
  isGenerateBolMark?: number;
  /**
   * 是否生成BOL（提单）文件 0-未生成 1-已生成
   * @format int32
   */
  isGenerateBolMarkFile?: number;
  /**
   * 是否生成入库单数据 0-未生成 1-已生成
   * @format int32
   */
  isGenerateInboundMark?: number;
  /**
   * 是否生成入库单文件 0-未生成 1-已生成
   * @format int32
   */
  isGenerateInboundMarkFile?: number;
  /**
   * 是否生成装箱单&发票数据 0-未生成 1-已生成
   * @format int32
   */
  isGenerateOperationMark?: number;
  /**
   * 是否生成装箱单&发票文件 0-未生成 1-已生成
   * @format int32
   */
  isGenerateOperationMarkFile?: number;
  /**
   * 是否装箱唛数据 0-未生成 1-已生成
   * @format int32
   */
  isGeneratePackageMark?: number;
  /**
   * 是否生成箱唛文件 0-未生成 1-已生成
   * @format int32
   */
  isGeneratePackageMarkFile?: number;
  /**
   * 是否生成装箱单 0-未生成 1-已生成
   * @format int32
   */
  isGeneratePackageOrder?: number;
  /**
   * 是否生成托唛文件 0-未生成 1-已生成
   * @format int32
   */
  isGeneratePalletFile?: number;
  /**
   * 是否生成托唛数据 0-未生成 1-已生成
   * @format int32
   */
  isGeneratePalletMark?: number;
  /**
   * 是否生成打托单 0-未生成 1-已生成
   * @format int32
   */
  isGeneratePalletOrder?: number;
}

/** PalletTemplateReq */
export interface PalletTemplateReq {
  /**
   * 装箱类型 1-单独装箱 2-合装箱
   * @format int32
   */
  packageType?: number;
  /** 箱托编码 */
  recordCode?: string;
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

/** PaymentItem */
export interface PaymentItem {
  /** 银行账号 */
  bankAccount?: string;
  /** 银行账号名称 */
  bankAccountName?: string;
  /** 开户行名称 */
  bankBranchName?: string;
  /** 银行国家 */
  bankCountry?: string;
  /** 开户行地址 */
  openAddressRec?: string;
  /**
   * 支付方式 1:现金; 2:在线; 3:银行卡
   * @format int32
   */
  paymentMethod: number;
  /**
   * 支付平台 1:paypal; 2:财付通; 3:支付宝; 4:块钱; 5:网银; 6:微信; 7:诚e赊
   * @format int32
   */
  platformType?: number;
  /**
   * 状态：0:停用、1:可用 ，默认：可用
   * @format int32
   */
  status: number;
  /** SWIFT代码 */
  swiftCode?: string;
  /** 税码 */
  taxCode?: string;
  /** 税率 */
  taxRate?: number;
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

/** PeakSeasonTimeBean */
export interface PeakSeasonTimeBean {
  /**
   * 旺季结束时间
   * @format date
   */
  endTime?: string;
  /**
   * 旺季开始时间
   * @format date
   */
  startTime?: string;
}

/** PickTypeItem */
export interface PickTypeItem {
  /**
   * 提货方式: 0-中仓提货 1-海外仓提货 2-FBA提货
   * @format int32
   */
  pickType?: number;
  /** 提货方式: 0-中仓提货 1-海外仓提货 2-FBA提货 */
  pickTypeDesc?: string;
  /** 仓库列表 */
  warehouseItemList?: WarehouseItem[];
}

/** PlanBillLadingAuthReq */
export interface PlanBillLadingAuthReq {
  /** 编码 */
  code?: string;
  /** 备注 */
  remark?: string;
  /**
   * 审核结果 0-通过 1-不通过
   * @format int32
   */
  status?: number;
}

/** PlanBillLadingDetailQueryResp */
export interface PlanBillLadingDetailQueryResp {
  /** 审核历史 */
  authList?: AuthItem[];
  /** 基本信息 */
  baseInfo?: BaseIno;
  /** 明细 */
  itemList?: Item[];
  /** 发货指令明细 */
  planCommandItemList?: PlanCommandItem[];
}

/** PlanBillLadingListQueryReq */
export interface PlanBillLadingListQueryReq {
  /** 创建人编码 */
  creator?: string;
  /** 跟进人编码 */
  followerCode?: string;
  /** 提货单号/商品名称/供应链SKU */
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
   * 发货状态 NULL-全部 0-待审核 1-审核不通过 2-待提货 3-已预约 4-废弃
   * @format int32
   */
  status?: number;
  /** 供应商编码 */
  supplierCode?: string;
}

/** PlanBillLadingListQueryResp */
export interface PlanBillLadingListQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  recordList?: PlanBillLadingListQueryRespItem[];
  /** 统计信息 */
  statisticsInfo?: BilStatisticsInfo;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** PlanBillLadingListQueryRespItem */
export interface PlanBillLadingListQueryRespItem {
  /** 提货单号 */
  code?: string;
  /** 创建人编码 */
  creator?: string;
  /** 创建人名称 */
  creatorDesc?: string;
  /**
   * 总提货量
   * @format int32
   */
  pickQtySum?: number;
  /**
   * 提货时间
   * @format date-time
   */
  pickTime?: string;
  /**
   * 提货方式: 0-中仓自提 1-物流提货
   * @format int32
   */
  pickType?: number;
  /** 提货方式: 0-中仓自提 1-物流提货 */
  pickTypeDesc?: string;
  /** 提货仓库 */
  pickWarehouseCode?: string;
  /** 提货仓库名称 */
  pickWarehouseCodeDesc?: string;
  /** 发货指令列表 */
  planCommandCodeList?: string[];
  /** 关联预约入库单 */
  reserveStorageCode?: string;
  /**
   * SKU种类
   * @format int32
   */
  skuTypeCount?: number;
  /**
   * 发货状态 0-待审核 1-审核不通过 2-待提货 3-已预约 4-废弃
   * @format int32
   */
  status?: number;
  /** 发货状态 0-待审核 1-审核不通过 2-待提货 3-已预约 4-废弃 */
  statusDesc?: string;
  /** 供应商编号 */
  supplierCode?: string;
  /** 供应商展示名称 */
  supplierDesc?: string;
}

/** PlanBillLadingModifyReq */
export interface PlanBillLadingModifyReq {
  /** 基本信息 */
  baseInfo?: ModifyBaseIno;
  /** 明细 */
  itemList?: ModifyItem[];
}

/** PlanBillLadingPickListQueryResp */
export interface PlanBillLadingPickListQueryResp {
  pickTypeItemList?: PickTypeItem[];
}

/** PlanBillLadingProductListQueryReq */
export interface PlanBillLadingProductListQueryReq {
  /** 产品名称/商品SKU/供应链SKU/供应商名称/供应商编码 */
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
  /** 供应商SKU列表 */
  productSkuList?: string[];
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 发货指令编号 */
  shipCommandCodeList?: string[];
  /** 供应商编码 */
  supplierCode?: string;
}

/** PlanBillLadingProductListQueryResp */
export interface PlanBillLadingProductListQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  recordList?: PlanBillLadingProductListQueryRespItem[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** PlanBillLadingProductListQueryRespItem */
export interface PlanBillLadingProductListQueryRespItem {
  /**
   * 提货数量
   * @format int32
   */
  pickQty?: number;
  /** 商品名称 */
  productName?: string;
  /**
   * 采购未交量
   * @format int32
   */
  purchaseWaitPickQty?: number;
  /** 关联发货指令编号 */
  shipCommandCodeList?: string[];
  /** 商品SKU */
  skuCode?: string;
  /** 供应商编号 */
  supplierCode?: string;
  /** 供应商展示名称 */
  supplierDesc?: string;
  /** 供应链SKU */
  supplySku?: string;
}

/** PlanBillLadingSaveReq */
export interface PlanBillLadingSaveReq {
  /** 基本信息 */
  baseInfo?: SaveBaseIno;
  /** 明细 */
  itemList?: SaveItem[];
}

/** PlanCommandItem */
export interface PlanCommandItem {
  /** 发货指令单号 */
  commandCode?: string;
  /**
   * 预计发货数量
   * @format int32
   */
  estimateQty?: number;
  /**
   * 预计发货时间
   * @format date-time
   */
  estimateShipDate?: string;
  /** 计划人员 */
  planer?: string;
  /** 商品名称 */
  productName?: string;
  /** 发货方式 1-中仓直发  2-工厂直发 */
  shipMethod?: string;
  /** 发货方式Desc */
  shipMethodDesc?: string;
  /** 商品SKU */
  skuCode?: string;
}

/** PlanCommandShipUploadReq */
export interface PlanCommandShipUploadReq {
  /** 上传地址名字 */
  fileName?: string;
  /** 上传地址 */
  ossKey?: string;
  /**
   * 上传类型 1-批量发货 2-批量更新
   * @format int32
   */
  type?: number;
}

/** PlanDeliveryBillAbandonReq */
export interface PlanDeliveryBillAbandonReq {
  /** 送货单号不能为空 */
  code?: string;
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

/** PlanDeliveryBillConfirmQueryReq */
export interface PlanDeliveryBillConfirmQueryReq {
  /** 送货单号不能为空 */
  code?: string;
  /** 明细 */
  itemInfoList?: SaveItemInfo[];
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

/** PlanDeliveryBillListItem */
export interface PlanDeliveryBillListItem {
  /** 送货单号 */
  code?: string;
  /** 异常日志 */
  errorRemark?: string;
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
  /**
   * 收货时间
   * @format date-time
   */
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
  /**
   * 状态 0-未推送 1-已推送
   * @format int32
   */
  sendStatus?: number;
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
  /** 供应商编码 */
  supplierCode?: string;
  /** 供应商名称 */
  supplierName?: string;
}

/** PlanDeliveryBillListQueryReq */
export interface PlanDeliveryBillListQueryReq {
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

/** PlanDeliveryBillListQueryResp */
export interface PlanDeliveryBillListQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 预约入库单列表 */
  recordList?: PlanDeliveryBillListItem[];
  /** 订单状态统计 */
  statusStatistics?: StatusStatistics;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** PlanDeliveryBillRetryEcQueryReq */
export interface PlanDeliveryBillRetryEcQueryReq {
  /** 送货单号不能为空 */
  code?: string;
}

/** PlanDeliveryBillSyncReq */
export interface PlanDeliveryBillSyncReq {
  /** 发货地址 */
  deliveryAddress: string;
  /** 发货公司 */
  deliveryCompany?: string;
  /** 发货联系人 */
  deliveryContact: string;
  /** 送货单号不能为空 */
  deliveryNumber: string;
  /** 发货联系人电话 */
  deliveryPhone: string;
  /**
   * 送货时间
   * @format date-time
   */
  deliveryTime: string;
  /** 明细 */
  itemInfoList: SyncItemInfo[];
  /** 收货地址 */
  receiveAddress: string;
  /** 收货公司 */
  receiveCompany?: string;
  /** 收货联系人 */
  receiveContact: string;
  /** 收货联系人电话 */
  receivePhone: string;
  /** 供应商编码 */
  supplierCode: string;
}

/** PlanInventoryFbaBean */
export interface PlanInventoryFbaBean {
  /** asin */
  asin?: string;
  /**
   * 可用数量
   * @format int32
   */
  availableQuantity?: number;
  /** fnsku */
  fnsku?: string;
  /**
   * 冻结数量
   * @format int32
   */
  frozenQuantity?: number;
  /**
   * 在库良品数量
   * @format int32
   */
  inStockGoodQuantity?: number;
  /**
   * 在库数量
   * @format int32
   */
  inStockQuantity?: number;
  /**
   * 在途数量
   * @format int32
   */
  inTransitQuantity?: number;
  /** msku */
  msku?: string;
  /**
   * 计划数量
   * @format int32
   */
  planQuantity?: number;
  /**
   * 预分配数量
   * @format int32
   */
  preAllocateQuantity?: number;
  /** 产品名 */
  productName?: string;
  /** sku编码 */
  skuCode?: string;
  /** 供应链sku */
  supplySku?: string;
  /**
   * 不良品数量
   * @format int32
   */
  unsellableQuantity?: number;
  /**
   * 仓库id
   * @format int64
   */
  warehouseId?: number;
  /** 仓库名称 */
  warehouseName?: string;
}

/** PlanInventoryFbaPageResp */
export interface PlanInventoryFbaPageResp {
  code?: string;
  /**
   * 最后同步时间
   * @format date-time
   */
  lastSyncTime?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 计划库存记录列表 */
  recordList?: PlanInventoryFbaBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** PlanInventoryFbaQueryReq */
export interface PlanInventoryFbaQueryReq {
  asc?: boolean;
  /** asin */
  asin?: string;
  /** fnsku */
  fnsku?: string;
  /** msku */
  msku?: string;
  /** 排序字段 */
  orderBy?:
    | 'availableQuantity'
    | 'frozenQuantity'
    | 'inStockGoodQuantity'
    | 'inStockQuantity'
    | 'inTransitQuantity'
    | 'planQuantity'
    | 'preAllocateQuantity'
    | 'unsellableQuantity';
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
  /** 产品名 */
  productName?: string;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** skuCode */
  skuCode?: string;
  /** 供应链sku */
  supplySku?: string;
  /** 仓库编码 */
  warehouseCodeList?: string[];
}

/** PlanInventorySelfBean */
export interface PlanInventorySelfBean {
  /**
   * 可用库存
   * @format int32
   */
  availableQuantity?: number;
  /**
   * 冻结库存
   * @format int32
   */
  frozenQuantity?: number;
  /**
   * 在库良品库存
   * @format int32
   */
  inStockGoodQuantity?: number;
  /**
   * 在库库存
   * @format int32
   */
  inStockQuantity?: number;
  /**
   * 最后更新时间
   * @format date-time
   */
  lastUpdateTime?: string;
  /**
   * 计划库存
   * @format int32
   */
  planQuantity?: number;
  /**
   * 采购未交库存
   * @format int32
   */
  poUnDeliveryQuantity?: number;
  /**
   * 预占库存
   * @format int32
   */
  preAllocateQuantity?: number;
  /** 产品名称 */
  productName?: string;
  /** 产品SKU */
  skuCode?: string;
  /** 供应链SKU */
  supplySku?: string;
  /**
   * 不良品库存
   * @format int32
   */
  unsellableQuantity?: number;
  /** 仓库 */
  warehouse?: string;
}

/** PlanInventorySelfPageResp */
export interface PlanInventorySelfPageResp {
  code?: string;
  /**
   * 最后同步时间
   * @format date-time
   */
  lastSyncTime?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 计划库存记录列表 */
  recordList?: PlanInventorySelfBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** PlanInventorySelfQueryReq */
export interface PlanInventorySelfQueryReq {
  asc?: boolean;
  /** 排序字段 */
  orderBy?:
    | 'availableQuantity'
    | 'frozenQuantity'
    | 'inStockGoodQuantity'
    | 'inStockQuantity'
    | 'planQuantity'
    | 'poUnDeliveryQuantity'
    | 'preAllocateQuantity'
    | 'unsellableQuantity';
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
  /** 产品名称 */
  productName?: string;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 产品SKU */
  skuCode?: string;
  /** 供应链SKU */
  supplySku?: string;
  /** 仓库代码列表 */
  warehouseCodeList?: string[];
}

/** PlanInventoryTiktokBean */
export interface PlanInventoryTiktokBean {
  /**
   * 可用数量
   * @format int32
   */
  availableQuantity?: number;
  brandCode?: string;
  /** 国家代码 */
  countryCode?: string;
  /**
   * 冻结数量
   * @format int32
   */
  frozenQuantity?: number;
  /**
   * 在库良品数量
   * @format int32
   */
  inStockGoodQuantity?: number;
  /**
   * 在库数量
   * @format int32
   */
  inStockQuantity?: number;
  /**
   * 在途数量
   * @format int32
   */
  inTransitQuantity?: number;
  /** msku */
  msku?: string;
  /**
   * 计划数量
   * @format int32
   */
  planQuantity?: number;
  /**
   * 预分配数量
   * @format int32
   */
  preAllocateQuantity?: number;
  /** 产品名称 */
  productName?: string;
  /** 站点 */
  site?: string;
  /** 商品sku */
  skuCode?: string;
  /** 供应商sku */
  supplySku?: string;
  /**
   * 不可售数量
   * @format int32
   */
  unsellableQuantity?: number;
  /** 仓库 */
  warehouse?: string;
}

/** PlanInventoryTiktokPageResp */
export interface PlanInventoryTiktokPageResp {
  code?: string;
  /**
   * 最后同步时间
   * @format date-time
   * @example "2025-01-27 00:00:00"
   */
  lastSyncTime?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 计划库存记录列表 */
  recordList?: PlanInventoryTiktokBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** PlanInventoryTiktokQueryReq */
export interface PlanInventoryTiktokQueryReq {
  asc?: boolean;
  /** msku */
  msku?: string;
  /** 排序字段 */
  orderBy?:
    | 'availableQuantity'
    | 'frozenQuantity'
    | 'inStockGoodQuantity'
    | 'inStockQuantity'
    | 'inTransitQuantity'
    | 'planQuantity'
    | 'preAllocateQuantity'
    | 'unsellableQuantity';
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
  /** 产品名称 */
  productName?: string;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 站点 */
  site?: string;
  /** 站点列表 */
  sites?: string[];
  /** 商品sku */
  skuCode?: string;
  /** 供应链sku */
  supplySku?: string;
  /** 仓库代码列表 */
  warehouseCodeList?: string[];
}

/** PlanInventoryWalmartBean */
export interface PlanInventoryWalmartBean {
  /**
   * 可用数量
   * @format int32
   */
  availableQuantity?: number;
  /** 国家代码 */
  countryCode?: string;
  /**
   * 冻结数量
   * @format int32
   */
  frozenQuantity?: number;
  /** gtin */
  gtin?: string;
  /**
   * 在库良品数量
   * @format int32
   */
  inStockGoodQuantity?: number;
  /**
   * 在库数量
   * @format int32
   */
  inStockQuantity?: number;
  /**
   * 在途数量
   * @format int32
   */
  inTransitQuantity?: number;
  /** itemId */
  itemId?: string;
  /** msku */
  msku?: string;
  /**
   * 计划数量
   * @format int32
   */
  planQuantity?: number;
  /**
   * 预分配数量
   * @format int32
   */
  preAllocateQuantity?: number;
  /** 产品名称 */
  productName?: string;
  /** 商品sku */
  skuCode?: string;
  /** 供应商sku */
  supplySku?: string;
  /**
   * 不可售数量
   * @format int32
   */
  unsellableQuantity?: number;
  /** 仓库 */
  warehouse?: string;
}

/** PlanInventoryWalmartPageResp */
export interface PlanInventoryWalmartPageResp {
  code?: string;
  /**
   * 最后同步时间
   * @format date-time
   */
  lastSyncTime?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 计划库存记录列表 */
  recordList?: PlanInventoryWalmartBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** PlanInventoryWalmartQueryReq */
export interface PlanInventoryWalmartQueryReq {
  asc?: boolean;
  /** gtin */
  gtin?: string;
  /** itemId */
  itemId?: string;
  /** msku */
  msku?: string;
  /** 排序字段 */
  orderBy?:
    | 'availableQuantity'
    | 'frozenQuantity'
    | 'inStockGoodQuantity'
    | 'inStockQuantity'
    | 'inTransitQuantity'
    | 'planQuantity'
    | 'preAllocateQuantity'
    | 'unsellableQuantity';
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
  /** 产品名称 */
  productName?: string;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 商品sku */
  skuCode?: string;
  /** 供应链sku */
  supplySku?: string;
  /** 仓库代码列表 */
  warehouseCodeList?: string[];
}

/** PlanPickupBatchDetailQueryResp */
export interface PlanPickupBatchDetailQueryResp {
  /** 计划提货批号 */
  code?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建者name */
  creatorName?: string;
  /** 是否展示: (true: 展示，false：隐藏)） */
  display?: boolean;
  /** 提货列表 */
  planPickupList?: PlanPickupBean[];
}

/** PlanPickupBatchSaveReq */
export interface PlanPickupBatchSaveReq {
  /** 计划提货批号 */
  code?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建者name */
  creatorName?: string;
  /** 提货列表 */
  planPickupList?: PlanPickupBean[];
}

/** PlanPickupBean */
export interface PlanPickupBean {
  /** 计划提货批号 */
  code?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建者 */
  creator?: string;
  /**
   * 删除状态 0-未删除 主键id-已删除
   * @format int32
   */
  deleted?: number;
  /**
   * id
   * @format int32
   */
  id?: number;
  /** 需求关联PO */
  orderNumber?: string;
  /** 计划提货列表 */
  pickupFormatList?: PlanPickupFormatBean[];
  /**
   * 回复未发总数量
   * @format int32
   */
  replyNotSentQuantity?: number;
  /**
   * 回复总数量
   * @format int32
   */
  replyQuantity?: number;
  /**
   * 回复已发总数量
   * @format int32
   */
  replySentQuantity?: number;
  /**
   * 需求总数量
   * @format int32
   */
  requireQuantity?: number;
  /** 产品SKU */
  skuCode?: string;
  /**
   * 提货状态：新建、待供应商确认、供应商拒绝、待计划确认、计划拒绝、部分确认、全部确认、已完成
   * @example "new"
   */
  status?:
    | 'completed'
    | 'fully_confirmed'
    | 'new'
    | 'partially_confirmed'
    | 'pending_plan_confirm'
    | 'pending_supplier_confirm'
    | 'plan_rejected'
    | 'supplier_rejected'
    | 'unknown';
  /** 供应商编码 */
  supplierCode?: string;
  /** 供应商名称 */
  supplierName?: string;
  /** 供应商提货批号 */
  supplierPickupCode?: string;
  /** 唯一键id */
  uniqueId?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /** 修改者 */
  updater?: string;
}

/** PlanPickupDeleteReq */
export interface PlanPickupDeleteReq {
  /** item */
  itemId?: string;
}

/** PlanPickupDetailQueryResp */
export interface PlanPickupDetailQueryResp {
  /** 计划提货批号 */
  code?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建者 */
  creator?: string;
  /** 创建者name */
  creatorName?: string;
  /** @format int32 */
  id?: number;
  /** 需求关联PO */
  orderNumber?: string;
  /** 计划提货列表 */
  pickupFormatList?: PlanPickupFormatBean[];
  /**
   * 回复未发总数量
   * @format int32
   */
  replyNotSentQuantity?: number;
  /**
   * 回复总数量
   * @format int32
   */
  replyQuantity?: number;
  /**
   * 回复已发总数量
   * @format int32
   */
  replySentQuantity?: number;
  /**
   * 需求总数量
   * @format int32
   */
  requireQuantity?: number;
  /** 产品SKU */
  skuCode?: string;
  /**
   * 提货状态：新建、待供应商确认、供应商拒绝、待计划确认、计划拒绝、部分确认、全部确认、已完成
   * @example "new"
   */
  status?:
    | 'completed'
    | 'fully_confirmed'
    | 'new'
    | 'partially_confirmed'
    | 'pending_plan_confirm'
    | 'pending_supplier_confirm'
    | 'plan_rejected'
    | 'supplier_rejected'
    | 'unknown';
  /** 供应商编码 */
  supplierCode?: string;
  /** 供应商名称 */
  supplierName?: string;
  /** 供应商提货批号 */
  supplierPickupCode?: string;
  /** 唯一键id（提货唯一键） */
  uniqueId?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /** 修改者 */
  updater?: string;
  /** 修改者name */
  updaterName?: string;
}

/** PlanPickupFormatBean */
export interface PlanPickupFormatBean {
  /**
   * 要求交期
   * @format date
   */
  deliveryDate?: string;
  /** 计划id（唯一键id） */
  formatId?: string;
  /**
   * id
   * @format int32
   */
  id?: number;
  /** 物料编码 */
  materialNumber?: string;
  /**
   * 可发数量
   * @format int32
   */
  notDeliveryQuantity?: number;
  /** 计划提货明细列表 */
  pickupItemList?: PlanPickupItemBean[];
  /**
   * 提货总数量
   * @format int32
   */
  pickupQuantity?: number;
  /**
   * 回复总数量
   * @format int32
   */
  replyQuantity?: number;
  /** 唯一键id（提货唯一键） */
  uniqueId?: string;
}

/** PlanPickupItemBean */
export interface PlanPickupItemBean {
  /** 物料分类名称 */
  cateName?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建者 */
  creator?: string;
  /**
   * 删除状态 0-未删除 主键id-已删除
   * @format int32
   */
  deleted?: number;
  /** 计划id（关联t_plan_pick_up_format中的format_id） */
  formatId?: string;
  /** headId */
  headId?: string;
  /**
   * id
   * @format int32
   */
  id?: number;
  /** 订单行号 */
  itemNumber?: string;
  /** 行状态：SRM中供应商行数据的状态 */
  itemStatus?: string;
  /** 行状态描述：SRM中供应商行数据的状态 */
  itemStatusDesc?: string;
  /** 物料名称 */
  materialName?: string;
  /** 物料编码 */
  materialNumber?: string;
  /** PO单号 */
  orderNumber?: string;
  /**
   * 原始要求交期
   * @format date
   */
  originalRequireDate?: string;
  /** 计划确认状态：待处理、无需处理、已处理 */
  planHandleStatus?: string;
  /** 采购周期 */
  purchaseCycle?: string;
  /** 采购订单id */
  purchaseOrderItemId?: string;
  /** 需方备注 */
  purchaseRemark?: string;
  /** 采购类型 */
  purchaseType?: string;
  /** 采购单位 */
  purchaseUnit?: string;
  /**
   * 回复日期
   * @format date
   */
  replyDate?: string;
  /**
   * 回复未发总数量
   * @format int32
   */
  replyNotSentQuantity?: number;
  /**
   * 回复总数量
   * @format int32
   */
  replyQuantity?: number;
  /**
   * 回复已发总数量
   * @format int32
   */
  replySentQuantity?: number;
  /**
   * 要求交期
   * @format date
   */
  requireDate?: string;
  /**
   * 本次要求数量
   * @format int32
   */
  requireQuantity?: number;
  /** 供应商确认状态，枚举值：unknow-未知，pending_confirm-待确认，fully_confirmed-全部确认，partially_rejected-部分拒绝，fully_rejected-全部拒绝 */
  status?: string;
  /** 供应商确认状态描述，枚举值：unknow-未知，pending_confirm-待确认，fully_confirmed-全部确认，partially_rejected-部分拒绝，fully_rejected-全部拒绝 */
  statusDesc?: string;
  /** 供方备注 */
  supplierRemark?: string;
  /** 供应链sku编码 */
  supplySku?: string;
  /** 唯一键id（提货唯一键） */
  uniqueId?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /** 修改者 */
  updater?: string;
}

/** PlanPickupItemQueryReq */
export interface PlanPickupItemQueryReq {
  /**
   * 要求交期
   * @format date
   */
  deliveryDate?: string;
  /** 物料编码 */
  materialNumber?: string;
  /**
   * 需求总数量
   * @format int32
   */
  requireQuantity?: number;
  /** 供应商编码 */
  supplierCode?: string;
}

/** PlanPickupItemQueryResp */
export interface PlanPickupItemQueryResp {
  /** 计划-提货明细 */
  recordList?: PlanPickupItemBean[];
}

/** PlanPickupListBean */
export interface PlanPickupListBean {
  /** 计划提货批号 */
  code?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建者 */
  creator?: string;
  /** 创建者name */
  creatorName?: string;
  /** @format int32 */
  id?: number;
  /** itemId */
  itemId?: string;
  /** 需求关联PO */
  orderNumber?: string;
  /**
   * 回复未发总数量
   * @format int32
   */
  replyNotSentQuantity?: number;
  /**
   * 回复总数量
   * @format int32
   */
  replyQuantity?: number;
  /**
   * 回复已发总数量
   * @format int32
   */
  replySentQuantity?: number;
  /**
   * 需求总数量
   * @format int32
   */
  requireQuantity?: number;
  /** 产品SKU */
  skuCode?: string;
  /** 提货状态 */
  status?: string;
  /** 提货状态 */
  statusDesc?: string;
  /** 供应商编码 */
  supplierCode?: string;
  /** 供应商名称 */
  supplierName?: string;
  /** 供应商提货批号 */
  supplierPickupCode?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /** 修改者 */
  updater?: string;
  /** 修改者name */
  updaterName?: string;
}

/** PlanPickupListQueryReq */
export interface PlanPickupListQueryReq {
  /** 结束创建时间 */
  endCreateTime?: string;
  /** 关键词供应商名称、供应商编号、SKU、PO单、需求提货批号、供应商提货批号 */
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
  /** 开始创建时间 */
  startCreateTime?: string;
  /**
   * 提货状态：新建、待供应商确认、供应商拒绝、待计划确认、计划拒绝、部分确认、全部确认、已完成
   * @example "new"
   */
  status?:
    | 'completed'
    | 'fully_confirmed'
    | 'new'
    | 'partially_confirmed'
    | 'pending_plan_confirm'
    | 'pending_supplier_confirm'
    | 'plan_rejected'
    | 'supplier_rejected'
    | 'unknown';
}

/** PlanPickupListQueryResp */
export interface PlanPickupListQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 列表 */
  recordList?: PlanPickupListBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** PlanPickupMaterialPurchaseSummaryBean */
export interface PlanPickupMaterialPurchaseSummaryBean {
  /** 物料名称 */
  materialName?: string;
  /** 物料编码 */
  materialNumber?: string;
  /**
   * 可发总量（未交货数量）
   * @format int32
   */
  notDeliveryQuantity?: number;
  /** 关联PO */
  orderNumber?: string;
}

/** PlanPickupMaterialPurchaseSummaryQueryResp */
export interface PlanPickupMaterialPurchaseSummaryQueryResp {
  /** 物料采购汇总 */
  recordList?: PlanPickupMaterialPurchaseSummaryBean[];
}

/** PlanPickupPlantOperationReq */
export interface PlanPickupPlantOperationReq {
  /** item */
  itemId?: string;
  /** 业务主键唯一id */
  uniqueId?: string;
}

/** PlanPickupPushReq */
export interface PlanPickupPushReq {
  /** 是否推送关联PO单 */
  isSendRelation?: boolean;
  /** item */
  itemId?: string;
  /** 操作类型：（拒绝-reject、确认-confirm） */
  operationType?: string;
  /** 供应商提货批号 */
  supplierPickupCodeList?: string[];
}

/** PlanPickupSaveReq */
export interface PlanPickupSaveReq {
  /** @format int32 */
  id?: number;
  /** 需求关联PO */
  orderNumber?: string;
  /** 计划提货列表 */
  pickupFormatList?: PlanPickupFormatBean[];
  /**
   * 回复未发总数量
   * @format int32
   */
  replyNotSentQuantity?: number;
  /**
   * 回复总数量
   * @format int32
   */
  replyQuantity?: number;
  /**
   * 回复已发总数量
   * @format int32
   */
  replySentQuantity?: number;
  /**
   * 需求总数量
   * @format int32
   */
  requireQuantity?: number;
  /** 产品SKU */
  skuCode?: string;
  /** 供应商编码 */
  supplierCode?: string;
  /** 供应商名称 */
  supplierName?: string;
  uniqueId?: string;
}

/** PlanPickupSupplierQueryReq */
export interface PlanPickupSupplierQueryReq {
  /** 供应商编码 */
  supplierCodeList?: string[];
}

/** PlanPickupSupplierQueryResp */
export interface PlanPickupSupplierQueryResp {
  /** 供应商列表 */
  supplierList?: ErpSupplierBean[];
}

/** PlanPreBookInBoundDeleteReq */
export interface PlanPreBookInBoundDeleteReq {
  /** 预约入库 */
  prebookCode?: string;
}

/** PlanPreBookInboudDetailReq */
export interface PlanPreBookInboudDetailReq {
  /** 预约入库单号 */
  prebookCode?: string;
  /** 提货单号 */
  submitOrderCode?: string;
}

/** PlanPreBookInboundBean */
export interface PlanPreBookInboundBean {
  /**
   * 状态 1-待审核 2-审核不通过 3待送货  4-已送货 5-废弃
   * @format int32
   */
  bookStatus?: number;
  /** 状态描述 1-待审核 2-审核不通过 3待送货  4-已送货 5-废弃 */
  bookStatusDesc?: string;
  /** 审核人编码 */
  checkerCode?: string;
  /** 审核人名称 */
  checkerName?: string;
  /**
   * 预计到货时间
   * @format date
   */
  estimateArriveDate?: string;
  /**
   * 预计箱数
   * @format int32
   */
  estimateBoxCount?: number;
  /**
   * 预计送货时间
   * @format date
   */
  estimateShipDate?: string;
  /**
   * 预计送货数量
   * @format int32
   */
  estimateShipQty?: number;
  /** 预约入库单号 */
  prebookCode?: string;
  /**
   * 预约入库单id
   * @format int64
   */
  prebookId?: number;
  /** 提货单号 */
  sendOrderCode?: string;
  /** 发货人员 */
  shipperCode?: string;
  /** 发货人员名称 */
  shipperName?: string;
  /** 提货单号 */
  submitOrderCode?: string;
  /** 供应商编码 */
  supplierCode?: string;
  /** 供应商名称 */
  supplierName?: string;
}

/** PlanPreBookInboundDetailResp */
export interface PlanPreBookInboundDetailResp {
  /**
   * 状态 1-待审核 2-审核不通过 3待送货  4-已送货 5-废弃
   * @format int32
   */
  bookStatus?: number;
  /** 状态描述 1-待审核 2-审核不通过 3待送货  4-已送货 5-废弃 */
  bookStatusDesc?: string;
  /**
   * 预计到货时间
   * @format date
   */
  estimateArriveDate?: string;
  /** 审核历史 */
  logList?: PlanPrebookInboundLog[];
  /** 预约单 */
  prebookCode?: string;
  /** 产品信息 */
  purchaseOrder?: PurchaseOrderRes;
  /**
   * 发货时间
   * @format date-time
   */
  realShipDate?: string;
  /** 发货信息 */
  shipFromInfo?: ShipFromInfo;
  /** 收货信息 */
  shipToInfo?: ShipToInfo;
  /** 提货单 */
  submitOrderCode?: string;
}

/** PlanPreBookInboundShipReq */
export interface PlanPreBookInboundShipReq {
  /** 预约入库单号 */
  prebookCode?: string;
}

/** PlanPrebookInboundAddReq */
export interface PlanPrebookInboundAddReq {
  /**
   * 预计到货时间
   * @format date
   */
  estimateArriveDate?: string;
  /** 产品明细 */
  purchaseOrder?: PurchaseOrderReq;
  /** 发货信息 */
  shipFromInfo?: ShipFromInfo;
  /** 收货信息 */
  shipToInfo?: ShipToInfo;
  /** 提货单 */
  submitOrderCode?: string;
}

/** PlanPrebookInboundDetail */
export interface PlanPrebookInboundDetail {
  /**
   * 预计发货箱数
   * @format int32
   */
  estimateBoxCount?: number;
  /**
   * 预计发货数量
   * @format int32
   */
  estimateShipQty?: number;
  /**
   * 采购未交数量
   * @format int32
   */
  futureArriveQty?: number;
  /** 采购单明细 */
  planPurchaseDetailList?: PlanPurchaseDetailRes[];
  /** 预约入库单号 */
  prebookCode?: string;
  /** 预约入库单明细单号 */
  prebookItemCode?: string;
  /** 产品名称 */
  productName?: string;
  /** 可选采购单明细 */
  selectList?: PlanPurchaseSelect[];
  /** 产品编码 */
  supplySku?: string;
}

/** PlanPrebookInboundLog */
export interface PlanPrebookInboundLog {
  /**
   * 审核时间
   * @format date-time
   */
  processTime?: string;
  /** 审核人编码 */
  processUser?: string;
  /** 审核人名称 */
  processUserName?: string;
  /** 备注 */
  remark?: string;
  /** 审核结果 */
  resultDesc?: string;
}

/** PlanPrebookInboundModifyReq */
export interface PlanPrebookInboundModifyReq {
  /**
   * 预计到货时间
   * @format date
   */
  estimateArriveDate?: string;
  /** 预约入库单号 */
  prebookCode?: string;
  /** 产品明细 */
  purchaseOrder?: PurchaseOrderReq;
  /** 发货信息 */
  shipFromInfo?: ShipFromInfo;
  /** 收货信息 */
  shipToInfo?: ShipToInfo;
  /** 提货单 */
  submitOrderCode?: string;
}

/** PlanPrebookInboundQueryReq */
export interface PlanPrebookInboundQueryReq {
  /**
   * 预约入库单状态 状态 1-待审核 2-审核不通过 3待送货  4-已送货 5-废弃
   * @format int32
   */
  bookStatus?: number;
  /** 审核人编码 */
  checkerCode?: string;
  /** 预约入库单/商品名称/供应量sku */
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
  /** 供应商编码 */
  supplierCode?: string;
}

/** PlanPrebookInboundQueryResp */
export interface PlanPrebookInboundQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 预约入库单列表 */
  recordList?: PlanPreBookInboundBean[];
  /** 订单状态统计 */
  statusStatistics?: StatusStatistics;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** PlanPurchaseDetailReq */
export interface PlanPurchaseDetailReq {
  /** 采购单号 */
  poCode?: string;
  /**
   * 发货数量
   * @format int32
   */
  realShipQty?: number;
  /** 备注 */
  remark?: string;
}

/** PlanPurchaseDetailRes */
export interface PlanPurchaseDetailRes {
  /** 采购单号 */
  poCode?: string;
  /**
   * 发货数量
   * @format int32
   */
  realShipQty?: number;
  /** 入库单号 */
  receivingCode?: string;
  /** 备注 */
  remark?: string;
}

/** PlanPurchaseSelect */
export interface PlanPurchaseSelect {
  /**
   * 入库单号
   * @format int32
   */
  checkQty?: number;
  /** 采购单号 */
  poCode?: string;
}

/** PlanShipCommandDetailQueryV2Resp */
export interface PlanShipCommandDetailQueryV2Resp {
  /** 基本信息 */
  baseInfo?: BaseInfoRes;
  /** 产品明细 */
  itemInfoList?: ItemInfoRes[];
  /** 货件信息 */
  shippingInfoList?: ShippingInfo[];
}

/** PlanShipCommandDetailResp */
export interface PlanShipCommandDetailResp {
  /**
   * 实际发货数量
   * @format int32
   */
  actualShipQty?: number;
  /** 渠道 */
  channel?: string;
  /** 发货命令编码 */
  commandCode?: string;
  /** 目的仓代码 */
  destinationCode?: string;
  /**
   * 预计到货时间
   * @format date
   */
  estimateArriveDate?: string;
  /**
   * 预计发货数量
   * @format int32
   */
  estimateQty?: number;
  /**
   * 预计发货时间
   * @format date
   */
  estimateShipDate?: string;
  /**
   * 是否贴透明计划标签 0-否 1-是
   * @format int32
   */
  isTransport?: number;
  /** 物流方式 */
  logisticMethod?: string;
  /** 运营 */
  operator?: string;
  /** 原平台标识 */
  originalPlatformMark?: string;
  /** 易仓头程计划单号 */
  planCode?: string;
  /** 计划 */
  planner?: string;
  /** 产品名称 */
  productName?: string;
  /** 备注 */
  remark?: string;
  /** 配送地址/收货人信息 */
  shipAddress?: string;
  /** 发货方式 1-中仓直发  2-工厂直发 */
  shipMethod?: string;
  /** 货件编号 */
  shipmentId?: string;
  /** 站点 */
  site?: string;
  /** 商品SKU */
  skuCode?: string;
  /** 供应链SKU */
  supplySku?: string;
  /** 货件追踪编号 */
  trackingCode?: string;
}

/** PlanShipCommandItem */
export interface PlanShipCommandItem {
  /** 品类编码 */
  categoryCode?: string;
  /** 品类名称 */
  categoryName?: string;
  /** 渠道 */
  channel?: string;
  /** 渠道Desc */
  channelDesc?: string;
  /** 编码 */
  commandCode?: string;
  /**
   * 指令状态 0-代发货 1-已发货 2-作废 3-锁定 4-刷新中
   * @format int32
   */
  commandStatus?: number;
  /** 指令状态 0-代发货 1-已发货 2-作废 3-锁定 4-刷新中 */
  commandStatusDesc?: string;
  /** 默认商品SKU */
  defaultProductSku?: string;
  /**
   * 预计到货时间
   * @format date-time
   */
  estimateArriveDate?: string;
  /**
   * 预计发货数量
   * @format int32
   */
  estimateQty?: number;
  /**
   * 预计发货时间
   * @format date-time
   */
  estimateShipDate?: string;
  /** 物流方式 */
  logisticMethod?: string;
  /** 物流方式Desc */
  logisticMethodDesc?: string;
  moreSupplySku?: boolean;
  /** 运营人员 */
  operator?: string;
  /** 原平台标识 */
  originalPlatformMark?: string;
  /** 计划人员 */
  planer?: string;
  /** 品线 */
  productLine?: string;
  /** 产品名称 */
  productName?: string;
  /** 预测编码 */
  salesforecastCode?: string;
  /** sellerSkuList */
  sellerSku?: string[];
  /**
   * 发货时间
   * @format date-time
   */
  shipDate?: string;
  /** 发货方式 1-中仓直发  2-工厂直发 */
  shipMethod?: string;
  /** 发货方式Desc */
  shipMethodDesc?: string;
  /** 货件计划单号 */
  shipmentPlanCode?: string;
  /** 店铺列表 */
  shopList?: string[];
  /** 站点 */
  site?: string;
  /** 站点Desc */
  siteDesc?: string;
  skuCode?: string;
  /** 供应链SKU */
  supplySku?: string;
  /** 三级分类编码 */
  thirdCategoryCode?: string;
  /** 三级分类描述 */
  thirdCategoryDesc?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** PlanShipCommandItemBean */
export interface PlanShipCommandItemBean {
  /**
   * 到货时间
   * @format date-time
   */
  arriveDate?: string;
  /** 发货指令单号 */
  commandCode?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 目的仓代码 */
  destinationCode?: string;
  /**
   * 差异量
   * @format int32
   */
  differenceQty?: number;
  /**
   * 已收量
   * @format int32
   */
  receivedQty?: number;
  /**
   * 发货量
   * @format int32
   */
  sendQty?: number;
  /** 海外仓服务商 */
  serviceProvider?: string;
  /** 海外仓服务商展示 */
  serviceProviderShow?: string;
  /**
   * 发货时间
   * @format date-time
   */
  shipDate?: string;
  /** 货件单号 */
  shippingCode?: string;
  /** sku种类详情 */
  shippingInfoItemList?: ShippingInfoItem[];
  /** 货件计划单号 */
  shippingPlanCode?: string;
  /** 跳转链接 */
  shippingPlanCodeJumpUrl?: string;
  /**
   * sku种类
   * @format int32
   */
  skuTypeCount?: number;
  /** 状态 */
  status?: string;
  /** 状态描述 */
  statusDesc?: string;
  /** 发货仓代码 */
  warehouseCode?: string;
  /** 发货仓展示 */
  warehouseShow?: string;
}

/** PlanShipCommandListQueryResp */
export interface PlanShipCommandListQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  recordList?: PlanShipCommandItem[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** PlanShipCommandListQueryV2Resp */
export interface PlanShipCommandListQueryV2Resp {
  code?: string;
  message?: string;
  /** 通知标记列表 */
  noteList?: string[];
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  recordList?: PlanShipCommandItem[];
  /** 统计信息 */
  statisticsInfo?: StatisticsInfo;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** PlanShipCommandSaveReq */
export interface PlanShipCommandSaveReq {
  /** 渠道 */
  channel?: string;
  /**
   * 以及到货时间
   * @format date
   */
  estimateArriveDate?: string;
  /**
   * 预计发货数量
   * @format int32
   */
  estimateQty?: number;
  /**
   * 预计发货时间
   * @format date
   */
  estimateShipDate?: string;
  /**
   * 操作类型 0-确认 3-锁定
   * @format int32
   */
  handleType?: number;
  /** 物流方式 */
  logisticMethod?: string;
  /** 运营人员 */
  operator?: string;
  /** 原平台唯一标识 */
  originalPlatformMark?: string;
  /** 计划人员 */
  planer?: string;
  /** 发货方式 1-中仓直发  2-工厂直发 */
  shipMethod?: string;
  /** 站点 */
  site?: string;
  /** 商品SKU */
  skuCode?: string;
  /** 供应链SKU */
  supplySku?: string;
  /** 周转编码 */
  turnoverCode?: string;
}

/** PlanShipCommandSaveV2Req */
export interface PlanShipCommandSaveV2Req {
  /**
   * 预计到货时间
   * @format date
   */
  estimateArriveDate?: string;
  /**
   * 预计发货数量
   * @format int32
   * @min 1
   * @exclusiveMin false
   */
  estimateQty?: number;
  /**
   * 预计发货时间
   * @format date
   */
  estimateShipDate?: string;
  /**
   * 操作类型 0-确认 3-锁定
   * @format int32
   */
  handleType?: number;
  /** 物流方式 */
  logisticMethod?: string;
  /** 发货方式 1-中仓直发  2-工厂直发 */
  shipMethod?: string;
  /** 周转编码 */
  turnoverCode?: string;
}

/** PlanShipCommandSelectPlanListQueryResp */
export interface PlanShipCommandSelectPlanListQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  recordList?: PlanShipCommandItem[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** PlanShipCommandShipReq */
export interface PlanShipCommandShipReq {
  /**
   * 实际发货数量
   * @format int32
   */
  actualQty?: number;
  /** 发货指令编码 */
  commandCode?: string;
  /** 目的仓仓库代码 */
  destinationWarehouse?: string;
  /**
   * 是否贴透明计划标签
   * @format int32
   */
  isTransport?: number;
  /** 物流方式 */
  logisticMethod?: string;
  /** 易仓头程计划单号 */
  planCode?: string;
  /** 备注 */
  remark?: string;
  /** 配送地址/收货人信息 */
  shipAddress?: string;
  /** 货件编号 */
  shipmentId?: string;
  /** 货件追踪编号 */
  trackingCode?: string;
}

/** PlanShipCommandSupplyQtyResp */
export interface PlanShipCommandSupplyQtyResp {
  /**
   * 最大发货数量
   * @format int32
   */
  maxQty?: number;
  /**
   * 在途数量
   * @format int32
   */
  onWayQty?: number;
  /**
   * 在库数量
   * @format int32
   */
  qty?: number;
}

/** PlanShipCommandSupplyQueryResp */
export interface PlanShipCommandSupplyQueryResp {
  supplySkuList?: string[];
}

/** PlanShipCommandSupplyQueryV2Resp */
export interface PlanShipCommandSupplyQueryV2Resp {
  /** 供应链SKU列表 */
  itemInfoList?: ItemInfoRes[];
}

/** PlanShipCommandUpdateStatusReq */
export interface PlanShipCommandUpdateStatusReq {
  /** 发货指令编码 */
  commandCode?: string;
  /**
   * 状态改变 3-锁定 0-解锁 2-作废
   * @format int32
   */
  type?: number;
}

/** PlanShipCommandUpdateV2Req */
export interface PlanShipCommandUpdateV2Req {
  /** 基本信息 */
  baseInfo?: BaseInfoReq;
  /** 产品明细 */
  itemInfoList?: ItemInfoReq[];
}

/** PlanShipmentItem */
export interface PlanShipmentItem {
  /** 货件计划单号 */
  shippingPlanCode?: string;
}

/** PlanShipmentListQueryReq */
export interface PlanShipmentListQueryReq {
  /**
   * 创建时间
   * @format date-time
   */
  createTimeEnd?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTimeStart?: string;
  /** 计划单号/货件单号/跟踪单号/发货仓/目的仓代码 */
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
  /** 海外仓服务商code */
  serviceProviderCode?: string;
  /**
   * 发货状态 NULL-全部 100-待发货 200-已收货
   * @format int32
   */
  status?: number;
}

/** PlanShipmentListQueryResp */
export interface PlanShipmentListQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  recordList?: PlanShipCommandItemBean[];
  /** 统计信息 */
  statisticsInfo?: StatisticsInfo;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** PlanShipmentSaveV2Req */
export interface PlanShipmentSaveV2Req {
  /** 发货指令编码 */
  planCommandCode?: string;
  /** 发货不能为空 */
  shippingPlanCodeList?: string[];
}

/** PlanShipmentSelectPlanListQueryResp */
export interface PlanShipmentSelectPlanListQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  recordList?: PlanShipmentItem[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** PlanSuppluCycleSaveReq */
export interface PlanSuppluCycleSaveReq {
  /** 渠道编码 */
  channel?: string;
  /** 供应周期编码 */
  code?: string;
  /** 国家编码 */
  country?: string;
  /**
   * 国内运输天数（天）
   * @format int32
   */
  domesticShipDay?: number;
  /**
   * 订单处理天数（天）
   * @format int32
   */
  orderHandleOverDay?: number;
  /** 原平台标识 */
  originalPlatformMark?: string;
  /**
   * QC入库天数（天）
   * @format int32
   */
  qcHandleDay?: number;
  /**
   * 接收上架天数（天）
   * @format int32
   */
  receiveListingDay?: number;
  /**
   * 海外物流天数（天）
   * @format int32
   */
  seaOverDay?: number;
  /**
   * 供应商交期（天）
   * @format int32
   */
  supplierHandleOverDay?: number;
  /** 供应链SKU */
  supplySku?: string;
  /**
   * 周转安库天数（天）
   * @format int32
   */
  trunOverDay?: number;
}

/** PlanSupplyCycleBean */
export interface PlanSupplyCycleBean {
  /**
   * 国内运输天数
   * @format int32
   */
  domesticShipDay?: number;
  /**
   * 订单处理天数
   * @format int32
   */
  orderHandleOverDay?: number;
  /**
   * 验货+入库天数
   * @format int32
   */
  qcHandleDay?: number;
  /**
   * 接收上架天数
   * @format int32
   */
  receiveListingDay?: number;
  /**
   * 海外物流天数
   * @format int32
   */
  seaOverDay?: number;
  /**
   * 供应商交期（天）
   * @format int32
   */
  supplierHandleOverDay?: number;
  /**
   * 总供应商周期(D)
   * @format int32
   */
  totalCycle?: number;
  /** @format int32 */
  trunOverDay?: number;
}

/** PlanSupplyCycleListQueryReq */
export interface PlanSupplyCycleListQueryReq {
  /** 分类 */
  categoryCode?: string;
  /** 渠道 */
  channel?: string;
  /** 国家 */
  country?: string;
  /** 供应链SKU/商品SKU/产品名称 */
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
  /** 计划人员编码 */
  plannerCode?: string;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 三级分类编码 */
  thirdCategoryCode?: string;
}

/** PlanSupplyCycleListQueryResp */
export interface PlanSupplyCycleListQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  recordList?: PlanSupplyCycleListQueryRespItem[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** PlanSupplyCycleListQueryRespItem */
export interface PlanSupplyCycleListQueryRespItem {
  /**
   * 所需预测周期（W）
   * @format int32
   */
  avgCycle?: number;
  /** 五级分类code */
  categoryCode?: string;
  /** 五级分类名字 */
  categoryName?: string;
  /** 渠道 */
  channel?: string;
  /** 渠道 */
  channelDesc?: string;
  /** 编码 */
  code?: string;
  /** 国家 */
  country?: string;
  /** 国家 */
  countryDesc?: string;
  /**
   * 国内运输天数（天）
   * @format int32
   */
  domesticShipDay?: number;
  /**
   * 订单处理天数（天）
   * @format int32
   */
  orderHandleOverDay?: number;
  /** 原平台标识 */
  originalPlatformMark?: string;
  /** 计划人员 */
  plannerCode?: string;
  /** 计划人员 */
  plannerName?: string;
  /** 店铺SKU */
  platformSku?: string;
  /**
   * QC入库天数（天）
   * @format int32
   */
  qcHandleDay?: number;
  /**
   * 接收上架天数（天）
   * @format int32
   */
  receiveListingDay?: number;
  /**
   * 海外物流天数（天）
   * @format int32
   */
  seaOverDay?: number;
  /** 商品SKU */
  skuCode?: string;
  /** 商品名称 */
  skuName?: string;
  /** 供应商编码 */
  supplierCode?: string;
  /**
   * 供应商交期（天）
   * @format int32
   */
  supplierHandleOverDay?: number;
  /** 供应商名称 */
  supplierName?: string;
  /** 供应链SKU */
  supplySku?: string;
  /** 三级分类编码 */
  thirdCategoryCode?: string;
  /** 三级分类描述 */
  thirdCategoryDesc?: string;
  /**
   * 总供应商周期(D)
   * @format int32
   */
  totalCycle?: number;
  /**
   * 周转安库天数（天）
   * @format int32
   */
  trunOverDay?: number;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** PlanTurnOverBean */
export interface PlanTurnOverBean {
  /**
   * 供应周（W）
   * @format int32
   */
  avgSupplyCycle?: number;
  /** 渠道 */
  channel?: string;
  /** 渠道 */
  channelDesc?: string;
  /** 编码 */
  code?: string;
  /**
   * 确认状态; 0-待完成,1-已完成
   * @format int32
   */
  confirmStatus?: number;
  /** 国家 */
  country?: string;
  /** 国家 */
  countryDesc?: string;
  /** 当前 */
  currentWeek?: string;
  /** 默认供应链SKU */
  defaultProductSku?: string;
  /**
   * 预测状态: 0-正常 1-关闭
   * @format int32
   */
  forecastStatus?: number;
  /** 预测状态: 0-正常 1-关闭 */
  forecastStatusDesc?: string;
  /** 是否有权操作 */
  hasOpPermission?: boolean;
  /**
   * id
   * @format int64
   */
  id?: number;
  /** 物流方式 */
  logisticMethod?: string;
  /** 运营人 */
  operator?: string;
  /** 原平台标识 */
  originalPlatformMark?: string;
  /** 供应商周期, 总供应周期在这里 */
  planCycle?: PlanSupplyCycleBean;
  /** 扩展bean字段 */
  planTurnOverCacuBean?: PlanTurnOverCacuBean;
  /** 计划 */
  planer?: string;
  /**
   * 平台期初库存
   * @format int32
   */
  platformInitialInventory?: number;
  /** 最近五周销量 */
  recentWeeklySales?: Record<string, number>;
  /** 预测编码 */
  salesforecastCode?: string;
  /** 商品SKU */
  skuCode?: string;
  /** 商品名称 */
  skuName?: string;
  /**
   * 周转状态：0-安全 1-呆滞 2-预警
   * @format int32
   */
  status?: number;
  /** 周转状态：0-安全 1-呆滞 2-预警 */
  statusDesc?: string;
  /** 周转策略 */
  strategy?: PlanTurnoverStrategyBean;
  /** 关联策略模板 */
  strategyTemplateCode?: string;
  /** 供应商 */
  supplier?: string;
  /** 总供应周期 */
  supplyCycle?: string;
  /** 三级分类编码 */
  thirdCategoryCode?: string;
  /** 三级分类描述 */
  thirdCategoryDesc?: string;
  /**
   * 预测类型 1-按商品SKU预测 2-按在线商品预测
   * @format int32
   */
  type?: number;
  /** 预警范围 */
  warningRange?: string;
}

/** PlanTurnOverCacuBean */
export interface PlanTurnOverCacuBean {
  /** 编码 */
  code?: string;
  /** 周数 */
  defaultProductSku?: string;
  /** 扩展表行 */
  detailList?: PlanTurnOverCacuBeanDetailListBean[];
  /** 扩展表头 */
  extHeadList?: PlanTurnOverCacuBeanDetailListBean;
  /**
   * 最大库存值
   * @format int32
   */
  maxQty?: number;
  /**
   * 在途库存
   * @format int32
   */
  onWayQty?: number;
  /** 供应链SKU列表 */
  productSkuList?: string[];
  /**
   * 中仓库存
   * @format int32
   */
  qty?: number;
  /**
   * 安全周转最小天数
   * @format int32
   */
  softDay?: number;
}

/** PlanTurnOverCacuBeanDetailListBean */
export interface PlanTurnOverCacuBeanDetailListBean {
  /** 项数据 */
  items?: PlanTurnOverCacuBeanItemBean[];
}

/** PlanTurnOverCacuBeanItemBean */
export interface PlanTurnOverCacuBeanItemBean {
  /**
   * 周转天数颜色 0-黑色 1-红色 2-黄色 3-绿色
   * @format int32
   */
  color?: number;
  /** 是否可编辑 */
  edit?: boolean;
  extMap?: object;
  /**
   * 唯一值
   * @format int64
   */
  id?: number;
  /** 具体值 */
  value?: object;
  /**
   * 值类型 字符串-0 数字无小数点-1
   * @format int32
   */
  valueType?: number;
}

/** PlanTurnOverDetailQueryResp */
export interface PlanTurnOverDetailQueryResp {
  /** 中仓库存 */
  centreInventoryItemList?: CentreInventoryItemResp[];
  /** 基本信息 */
  planTurnOver?: PlanTurnOverBean;
  /** 物流信息 */
  planTurnoverLogistics?: PlanTurnoverLogistics[];
  /** 近期销量 key-文案 value具体值 */
  recentlySalesVolumeList?: object[][];
  /** 周转天数 */
  weekItemList?: WeekItemResp[];
}

/** PlanTurnOverListImportReq */
export interface PlanTurnOverListImportReq {
  /** 周转编码 */
  code?: string;
  /** 上传地址名字 */
  fileName?: string;
  /** 绝对路径 */
  fileUrl?: string;
  /** 上传地址 */
  ossKey?: string;
}

/** PlanTurnOverListQueryReq */
export interface PlanTurnOverListQueryReq {
  /** 渠道 */
  channel?: string;
  /**
   * 确认状态
   * @format int32
   */
  confirmStatus?: number;
  /** 国家 */
  country?: string;
  /**
   * 预测状态: 0-正常 1-关闭
   * @format int32
   */
  forecastStatus?: number;
  /** 原平台标识/产品名称/商品SKU */
  keyword?: string;
  /** 运营 */
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
  /** 计划 */
  planerList?: string[];
  /** 渠道唯一标识 */
  platformSkuIdentify?: string;
  /** 产品名 */
  productName?: string;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 产品编码 */
  skuCodeList?: string[];
  /**
   * 周转状态：0-安全 1-呆滞 2-预警
   * @format int32
   */
  status?: number;
  /** 供应商 */
  supplierCodeList?: string[];
  /** 三级分类编码 */
  thirdLevelCategoryCodeList?: string[];
  /** 预测编码 */
  uniqueCode?: string;
}

/** PlanTurnOverListQueryResp */
export interface PlanTurnOverListQueryResp {
  code?: string;
  message?: string;
  /** 通知 */
  noteList?: string[];
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 最近五周产品销量keymap. 2025.3.10-3.16销量, 用于从记录的recentWeeklySales按key取出销量 */
  recentFiveWeekSalesMap?: string[];
  recordList?: PlanTurnOverBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** PlanTurnOverLogisticsBean */
export interface PlanTurnOverLogisticsBean {
  /** 渠道 */
  channel?: string;
  /** 物流方式编码 */
  code?: string;
  /**
   * 物流天数
   * @format int32
   */
  day?: number;
  /** 物流方式名字 */
  name?: string;
  /** 旺季时间 */
  peakSeasonTime?: PeakSeasonTimeBean[];
  /** 时效列表(已根据国家匹配好) */
  prescriptionList?: LogisticsChannelPrescriptionBean[];
  /** 站点 */
  site?: string;
  /** 备货站点 */
  stockSite?: string;
}

/** PlanTurnOverLogisticsQueryResp */
export interface PlanTurnOverLogisticsQueryResp {
  planTurnOverLogisticsList?: PlanTurnOverLogisticsBean[];
}

/** PlanTurnOverLogisticsSaveReq */
export interface PlanTurnOverLogisticsSaveReq {
  planTurnOverLogisticsList: PlanTurnOverLogisticsBean[];
}

/** PlanTurnOverStrategyTemplateListQueryResp */
export interface PlanTurnOverStrategyTemplateListQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  recordList?: PlanTurnoverStrategyTemplateBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** PlanTurnoverConfirmStatusReq */
export interface PlanTurnoverConfirmStatusReq {
  /** 周转编码， Z开头的编码 */
  code?: string;
  /**
   * 确认状态，0:未确认，1:已确认
   * @format int32
   */
  confirmStatus?: number;
}

/** PlanTurnoverLogistics */
export interface PlanTurnoverLogistics {
  channel?: string;
  code?: string;
  companyCode?: string;
  /** @format date-time */
  createTime?: string;
  creator?: string;
  /** @format int32 */
  day?: number;
  /** @format int64 */
  deleted?: number;
  extraInfo?: string;
  /** @format int64 */
  id?: number;
  /** @format int32 */
  logisticsTransportId?: number;
  name?: string;
  peakSeasonTime?: string;
  site?: string;
  /** @format int32 */
  status?: number;
  stockSite?: string;
  /** @format date-time */
  updateTime?: string;
  updater?: string;
}

/** PlanTurnoverRefreshReq */
export interface PlanTurnoverRefreshReq {
  /** 周转编码， Z开头的编码 */
  code?: string;
}

/** PlanTurnoverStrategyBean */
export interface PlanTurnoverStrategyBean {
  /**
   * 是否自动调整整箱: 0-否 1-是
   * @format int32
   */
  autoChangeBox?: number;
  /**
   * 自动调整：0-按到到货时间自动调整 1-按默认
   * @format int32
   */
  autoChangeLogistics?: number;
  /** 国家 */
  channel?: string[];
  /** 生成方式 */
  generationType?: string;
  /**
   * 限制数量 0-否 1-是
   * @format int32
   */
  limitQty?: number;
  /**
   * '1-本周预测 2-未来2周预测均值 3-未来3周均值 4-未来4周预测均值 5-未来5周预测均值 6-未来6周预测 7-未来7周预测 8-未来8周预测'
   * @format int32
   */
  limitQtyType?: number;
  /** 限制数量选择值 */
  limitQtyTypeValue?: number;
  /** 安全最小周转天数 数组，key 物流方式 value 安全最小周转天数 */
  logisticMethodSoftDayTuple?: LogisticMethodSoftDayTuple[];
  /**
   * 优先级
   * @format int32
   */
  priority?: number;
  /** 品线编码 */
  productLine?: string[];
  /**
   * 发货指令生成周数 -1: 总供应周期  >=0 具体自定义天数
   * @format int32
   */
  shippingCommandWeek?: number;
  /**
   * 发货指令生成周数总供应周期  0-否 1-是
   * @format int32
   */
  shippingCommandWeekFlag?: number;
  /**
   * 安全周转最小天数，必须在soft_min_day，soft_max_day区间
   * @format int32
   */
  softDay?: number;
  /**
   * 安全周转天数最大值
   * @format int32
   */
  softMaxDay?: number;
  /**
   * 安全周转天数最小值
   * @format int32
   */
  softMinDay?: number;
  /**
   * 状态: 0-启用 1-禁用
   * @format int32
   */
  status?: number;
  /** 策略模板code 不为空时说明是引用的模板，为空则为独立的数据 */
  strategyTemplateCode?: string;
  /** 策略模板名称 */
  strategyTemplateName?: string;
  /** 周转编码 */
  turnoverCode?: string;
  /**
   * 周转预警周数
   * @format int32
   */
  warningWeek?: number;
}

/** PlanTurnoverStrategySaveReq */
export interface PlanTurnoverStrategySaveReq {
  /**
   * 是否自动调整整箱: 0-否 1-是
   * @format int32
   */
  autoChangeBox?: number;
  /**
   * 自动调整：0-按到到货时间自动调整 1-按默认
   * @format int32
   */
  autoChangeLogistics?: number;
  /** 国家 */
  channel?: string[];
  /** 生成方式 */
  generationType?: string;
  /**
   * 限制数量 0-否 1-是
   * @format int32
   */
  limitQty?: number;
  /**
   * '1-本周预测 2-未来2周预测均值 3-未来3周均值 4-未来4周预测均值 5-未来5周预测均值 6-未来6周预测 7-未来7周预测 8-未来8周预测'
   * @format int32
   */
  limitQtyType?: number;
  /** 限制数量选择值 */
  limitQtyTypeValue?: number;
  /** 安全最小周转天数 数组，key 物流方式 value 安全最小周转天数 */
  logisticMethodSoftDayTuple?: LogisticMethodSoftDayTuple[];
  /**
   * 优先级
   * @format int32
   */
  priority?: number;
  /** 品线编码 */
  productLine?: string[];
  /**
   * 发货指令生成周数 -1: 总供应周期  >=0 具体自定义天数
   * @format int32
   */
  shippingCommandWeek?: number;
  /**
   * 发货指令生成周数总供应周期  0-否 1-是
   * @format int32
   */
  shippingCommandWeekFlag?: number;
  /**
   * 安全周转最小天数，必须在soft_min_day，soft_max_day区间
   * @format int32
   */
  softDay?: number;
  /**
   * 安全周转天数最大值
   * @format int32
   */
  softMaxDay?: number;
  /**
   * 安全周转天数最小值
   * @format int32
   */
  softMinDay?: number;
  /**
   * 状态: 0-启用 1-禁用
   * @format int32
   */
  status?: number;
  /** 关联策略模板 */
  strategyTemplateCode?: string;
  /** 策略模板名称 */
  strategyTemplateName?: string;
  /** 周转编码 */
  turnoverCode?: string;
  /**
   * 周转预警周数
   * @format int32
   */
  warningWeek?: number;
}

/** PlanTurnoverStrategyTemplateBean */
export interface PlanTurnoverStrategyTemplateBean {
  /**
   * 是否自动调整整箱: 0-否 1-是
   * @format int32
   */
  autoChangeBox?: number;
  /**
   * 自动调整：0-按到到货时间自动调整 1-按默认
   * @format int32
   */
  autoChangeLogistics?: number;
  /** 渠道 */
  channel?: string[];
  /** 策略code */
  code?: string;
  /** 描述 */
  desc?: string;
  /** 生成方式 */
  generationType?: string;
  /**
   * 是否默认模板 0-否 1-是
   * @format int32
   */
  isDefault?: number;
  /**
   * 限制数量 0-否 1-是
   * @format int32
   */
  limitQty?: number;
  /**
   * '1-本周预测 2-未来2周预测均值 3-未来3周均值 4-未来4周预测均值 5-未来5周预测均值 6-未来6周预测 7-未来7周预测 8-未来8周预测'
   * @format int32
   */
  limitQtyType?: number;
  /** 限制数量选择值 */
  limitQtyTypeValue?: number;
  /** 安全最小周转天数 数组，key 物流方式 value 安全最小周转天数 */
  logisticMethodSoftDayTuple?: LogisticMethodSoftDayTuple[];
  /** 模板名 */
  name?: string;
  /**
   * 优先级
   * @format int32
   */
  priority?: number;
  /** 品线编码 */
  productLine?: string[];
  /**
   *  发货指令生成周数 -1: 总供应周期  >=0 具体自定义天数
   * @format int32
   */
  shippingCommandWeek?: number;
  /**
   * 发货指令生成周数总供应周期  0-否 1-是
   * @format int32
   */
  shippingCommandWeekFlag?: number;
  /**
   * 安全周转最小天数，必须在soft_min_day，soft_max_day区间
   * @format int32
   */
  softDay?: number;
  /**
   * 安全周转天数最大值
   * @format int32
   */
  softMaxDay?: number;
  /**
   * 安全周转天数最小值
   * @format int32
   */
  softMinDay?: number;
  /**
   * 状态: 0-启用 1-禁用
   * @format int32
   */
  status?: number;
  /**
   * 周转预警周数
   * @format int32
   */
  warningWeek?: number;
}

/** PlanTurnoverStrategyTemplateSaveReq */
export interface PlanTurnoverStrategyTemplateSaveReq {
  /**
   * 是否自动调整整箱: 0-否 1-是
   * @format int32
   */
  autoChangeBox?: number;
  /**
   * 自动调整：0-按到到货时间自动调整 1-按默认
   * @format int32
   */
  autoChangeLogistics?: number;
  /** 渠道 */
  channel?: string[];
  /** 策略code */
  code?: string;
  /** 描述 */
  desc?: string;
  /** 生成方式 */
  generationType?: string;
  /**
   * 是否默认模板 0-否 1-是
   * @format int32
   */
  isDefault?: number;
  /**
   * 限制数量 0-否 1-是
   * @format int32
   */
  limitQty?: number;
  /**
   * '1-本周预测 2-未来2周预测均值 3-未来3周均值 4-未来4周预测均值 5-未来5周预测均值 6-未来6周预测 7-未来7周预测 8-未来8周预测'
   * @format int32
   */
  limitQtyType?: number;
  /** 限制数量选择值 */
  limitQtyTypeValue?: number;
  /** 安全最小周转天数 数组，key 物流方式 value 安全最小周转天数 */
  logisticMethodSoftDayTuple?: LogisticMethodSoftDayTuple[];
  /** 模板名 */
  name?: string;
  /**
   * 优先级
   * @format int32
   */
  priority?: number;
  /** 品线编码 */
  productLine?: string[];
  /**
   *  发货指令生成周数 -1: 总供应周期  >=0 具体自定义天数
   * @format int32
   */
  shippingCommandWeek?: number;
  /**
   * 发货指令生成周数总供应周期  0-否 1-是
   * @format int32
   */
  shippingCommandWeekFlag?: number;
  /**
   * 安全周转最小天数，必须在soft_min_day，soft_max_day区间
   * @format int32
   */
  softDay?: number;
  /**
   * 安全周转天数最大值
   * @format int32
   */
  softMaxDay?: number;
  /**
   * 安全周转天数最小值
   * @format int32
   */
  softMinDay?: number;
  /**
   * 状态: 0-启用 1-禁用
   * @format int32
   */
  status?: number;
  /**
   * 周转预警周数
   * @format int32
   */
  warningWeek?: number;
}

/** PlatformInventoryBean */
export interface PlatformInventoryBean {
  /** 大类 */
  bigCategory?: string;
  /**
   * 可用库存
   * @format int32
   */
  canUseInventory?: number;
  /** 渠道 */
  channel?: string;
  /** 渠道唯一标识 */
  channelIdentifier?: string;
  /** 国家 */
  country?: string;
  /**
   * 谷仓在途库存
   * @format int32
   */
  goodTransitQty?: number;
  /** 图片 */
  imageUrl?: string;
  /**
   * 平台库存
   * @format int32
   */
  platformInventory?: number;
  /**
   * 平台在途库存
   * @format int32
   */
  platformOnRouteInventory?: number;
  /** 产品型号 */
  productModel?: string;
  /** 产品名称 */
  productName?: string;
  /**
   * 不良品
   * @format int32
   */
  rejectsInventory?: number;
  /** 站点 */
  site?: string;
  /** 商品SKU */
  skuCode?: string;
  /** 小类 */
  smallCategory?: string;
  /** 店铺SKU */
  storeSKU?: string;
  /** 供应链SKU */
  supplySku?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /** 店铺账号 */
  userAccount?: string;
  /**
   * 未上架
   * @format int32
   */
  waitUpInventory?: number;
  /**
   * 沃尔玛在途库存
   * @format int32
   */
  walmartTransitQty?: number;
}

/** PlatformInventoryQueryListReq */
export interface PlatformInventoryQueryListReq {
  /** 亚马逊店铺名称 */
  amazonShopCode?: string;
  /** 是否升序 */
  asc?: boolean;
  /** 大类 */
  bigCategory?: string;
  /** 国家 */
  countryCode?: string;
  /** 关键字 */
  keyword?: string;
  /** 型号 */
  model?: string;
  /** 排序字段 */
  orderBy?: string;
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
  /** 平台 */
  platform?: string;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 小类 */
  samllCategory?: string;
  /** Tt店铺名称 */
  ttShopCode?: string;
  /** 沃尔玛店铺名称 */
  walmartShopCode?: string;
  /** 仓库名称 */
  warehouseName?: string;
}

/** PlatformInventoryQueryListResp */
export interface PlatformInventoryQueryListResp {
  /** 大类列表 */
  bigCategoryList?: string[];
  code?: string;
  /** 国家列表 */
  countryList?: string[];
  message?: string;
  /** 模型列表 */
  modelList?: string[];
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  recordList?: PlatformInventoryBean[];
  /** 店铺名称列表 */
  shopList?: string[];
  /** 小类列表 */
  smallCategoryList?: string[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /** 仓库名称列表 */
  warehouseNameList?: string[];
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

/** PoBaseInfo */
export interface PoBaseInfo {
  /**
   * 结算方式：1货到付款、2款到发货、3帐期
   * @format int32
   */
  accountType: number;
  /** 采购公司 */
  company?: string;
  /** 币别 */
  currency?: string;
  /**
   * 创建时间
   * @format date-time
   */
  dateCreate?: string;
  /**
   * 采购单预计到货时间
   * @format date-time
   */
  dateEta: string;
  /**
   * 中转 或 直发 0-中转 1-直发
   * @format int32
   */
  deliveryType?: number;
  /** 采购员 */
  operatorPurchase: string;
  /** 订单号 */
  orderNumber: string;
  /** 运费 */
  payShipAmount?: number;
  /**
   * 支付方式 1:现金; 2:在线; 3:银行卡
   * @format int32
   */
  payType: number;
  /** 付款条件 */
  paymentClause: string;
  /** 采购单备注 */
  poRemark?: string;
  /**
   * 补货方式：1-缺货入库 2-警报入库 3-特采入库 4-正常入库 5-样品采购入库 6-备货采购 7-试销采购 8-返修入库
   * @format int32
   */
  poType: number;
  /** 跟单员 */
  ptsOprater?: string;
  /**
   * 供应商运输方式：1自提,2快递,3物流,4送货
   * @format int32
   */
  shippingMethodIdHead: number;
  /**
   * 运输承担方 1、供应商；2、采购方
   * @format int32
   */
  supplierCarrier?: number;
  /** 供应商编码 */
  supplierCode: string;
  /**
   * 供应商收款方式 1:现金; 2:在线; 3:银行卡
   * @format int32
   */
  supplierPayType: number;
  /** 中转仓 */
  toWarehouseCode?: string;
  /** 采购仓库 */
  warehouseCode: string;
}

/** PoDetailItem */
export interface PoDetailItem {
  /** Ec采购单号 */
  ecPoCode?: string;
  /** 商品名称 */
  productName?: string;
  /** 商品SKU */
  productSku?: string;
  /** 商品SKU */
  skuCode?: string;
  /** Srm采购单号 */
  srmPoCode?: string;
  /** 供应商编码 */
  supplierCode?: string;
  /** 供应商名称 */
  supplierName?: string;
}

/** PoItem */
export interface PoItem {
  /**
   * 是否质检 0-否 1-是
   * @format int32
   */
  checkQuality?: number;
  /** 关闭标识 */
  close?: string;
  /** 币种 */
  currency: string;
  /** 工厂代码 */
  factory?: string;
  /** 冻结标识 */
  freeze?: string;
  /**
   * 是否赠品，0否 1为赠品
   * @format int32
   */
  isFree?: number;
  /**
   * 订单行号
   * @format int32
   */
  itemNumber?: number;
  /** 未税金额 */
  netAmount?: number;
  /** 未税单价 */
  netPrice: number;
  /** 外部单号 */
  popExternalNumber?: string;
  /** 含税单价 */
  price: number;
  /** 产品代码 */
  productSku: string;
  /** 采购单位 */
  purchaseUnit?: string;
  /**
   * 数量
   * @format int32
   */
  quantity: number;
  /** 采购原因 */
  reason?: string;
  /**
   * 要求交期
   * @format date-time
   */
  requireDate?: string;
  /** 商品SKU */
  skuCode?: string;
  /**
   * 来源单行号
   * @format int32
   */
  sourceItemNumber?: number;
  /** 采购申请单号 */
  sourceNumber?: string;
  /**
   * 来源类型
   * @format int32
   */
  sourceType?: number;
  /** 库存地点代码 */
  storageLocation?: string;
  /** 含税金额 */
  taxAmount?: number;
  /** 税码 */
  taxCode?: string;
  /** 税率 */
  taxRate?: number;
}

/** PrAuthReq */
export interface PrAuthReq {
  /** 申购单号 */
  code: string;
  /** 通过不通过 */
  pass?: boolean;
  /** 备注 */
  remark?: string;
  /** 钉钉审核的用户ID */
  userId?: string;
}

/** PrDetailBaseInfoReq */
export interface PrDetailBaseInfoReq {
  /** 申购单号 */
  code: string;
  /** 币种 */
  currency?: string;
  /** 采购负责人 */
  purchaser: string;
  /** 备注 */
  remark?: string;
  /**
   * 申购时间
   * @format date-time
   */
  submitTime?: string;
  /**
   * 申购单类型：物资材料-4原料采购-1备品备件采购申请-2维修服务类采购申请-3成品采购-5
   * @format int32
   */
  type: number;
  /** 仓库编码 */
  warehouseCode: string;
}

/** PrDetailBaseInfoRes */
export interface PrDetailBaseInfoRes {
  /** 是否可编辑表头 */
  canEditHead?: boolean;
  /** 申购单号 */
  code?: string;
  /** 申购人 */
  creator?: string;
  /** 申购人 */
  creatorDesc?: string;
  /** 币种 */
  currency?: string;
  /** 币种DESC */
  currencyDesc?: string;
  /** 易仓采购单号 */
  ecPoCode?: string;
  /** 采购负责人 */
  purchaser?: string;
  /** 采购负责人 */
  purchaserDesc?: string;
  /** 备注 */
  remark?: string;
  /** 企企通采购单号 */
  srmPoCode?: string;
  /**
   * 状态: 0-待审核 1-待处理 2-审核不通过 3-废弃 4-已 处 理
   * @format int32
   */
  status?: number;
  /** 状态: 0-待审核 1-待处理 2-审核不通过 3-废弃 4-已 处 理 */
  statusDesc?: string;
  /** 已处理的第二状态，是待订单还是已全部转订单 */
  statusDesc2?: string;
  /**
   * 申购时间
   * @format date-time
   */
  submitTime?: string;
  /**
   * 申购单类型：物资材料-4原料采购-1备品备件采购申请-2维修服务类采购申请-3成品采购-5
   * @format int32
   */
  type?: number;
  /** 申购单类型：物资材料-4原料采购-1备品备件采购申请-2维修服务类采购申请-3成品采购-5 */
  typeDesc?: string;
  /** 仓库编码 */
  warehouseCode?: string;
  /** 仓库 */
  warehouseDesc?: string;
}

/** PrDetailItemReq */
export interface PrDetailItemReq {
  /**
   * 交付时间
   * @format date-time
   */
  deliveryTime: string;
  /** 产品SKU */
  productSku: string;
  /** 需求建议单号 */
  prsCode?: string;
  /**
   * 采购是否收单：0-新单，1-试产单，2-翻单 3-样品订单
   * @format int32
   */
  purchaseIsFirst?: number;
  /**
   * 申购数量
   * @format int32
   */
  qty: number;
  /** 备注 */
  remark?: string;
  /** 商品SKU */
  skuCode: string;
  /**
   * 建议需求数量
   * @format int32
   */
  suggestQty?: number;
  /**
   * 类型 1-产品 2-物料
   * @format int32
   */
  type?: number;
}

/** PrDetailItemRes */
export interface PrDetailItemRes {
  /**
   * 交付时间
   * @format date-time
   */
  deliveryTime?: string;
  /** Els编码 */
  elsCode?: string;
  /** 商品名称 */
  productName?: string;
  /** 商品SKU */
  productSku?: string;
  /** 需求建议单号 */
  prsCode?: string;
  /**
   * 采购是否收单：0-新单，1-试产单，2-翻单 3-样品订单
   * @format int32
   */
  purchaseIsFirst?: number;
  /** 采购是否收单：0-新单，1-试产单，2-翻单 3-样品订单 */
  purchaseIsFisrtDesc?: string;
  /**
   * 申购数量
   * @format int32
   */
  qty?: number;
  /** 备注 */
  remark?: string;
  /** 商品SKU */
  skuCode?: string;
  /** 已处理的第二状态，是待订单还是已全部转订单 */
  statusDesc2?: string;
  /**
   * 建议需求数量
   * @format int32
   */
  suggestQty?: number;
  /** 供应商编码 */
  supplierCode?: string;
  /** 供应商名称 */
  supplierName?: string;
  /**
   * 类型 1-产品 2-物料
   * @format int32
   */
  type?: number;
  /** 类型 1-产品 2-物料 */
  typeDesc?: string;
}

/** PrDetailQueryResp */
export interface PrDetailQueryResp {
  /** 审核日志 */
  authLogList?: AuthLogBean[];
  /** 审核信息 */
  authNodeList?: AuthNodeBean[];
  /** 基础信息 */
  baseInfo?: PrDetailBaseInfoRes;
  /** 基本信息 */
  flowBaseInfo?: ErpFlowBean;
  /** 商品信息 */
  itemList?: PrDetailItemRes[];
  /** 下一个审核节点 */
  nextAuthNode?: AuthNodeBean;
  /** 采购订单 */
  poDetailItems?: PoDetailItem[];
}

/** PrDownDetailItemReq */
export interface PrDownDetailItemReq {
  /** 交付时间 */
  deliveryTime?: string;
  /** 错误信息 */
  errorMessage?: string;
  /** 商品名称 */
  productName?: string;
  productSku?: string;
  /** 需求建议单号 */
  prsCode?: string;
  /**
   * 采购是否收单：0-新单，1-试产单，2-翻单 3-样品订单
   * @format int32
   */
  purchaseIsFirst?: number;
  /** 采购是否收单：0-新单，1-试产单，2-翻单 3-样品订单 */
  purchaseIsFisrtDesc?: string;
  /**
   * 申购数量
   * @format int32
   */
  qty?: number;
  /** 备注 */
  remark?: string;
  /** 商品SKU */
  skuCode?: string;
  /** 产品sku状态 */
  skuStateDesc?: string;
  /**
   * 建议需求数量
   * @format int32
   */
  suggestQty?: number;
  /** 供应商编码 */
  supplierCode?: string;
  /** 供应商名称 */
  supplierName?: string;
  /** 类型 1-产品 2-物料 */
  typeDesc?: string;
}

/** PrItem */
export interface PrItem {
  button?: Button;
  /** 申购单号 */
  code?: string;
  /** 申购人 */
  creator?: string;
  /** 申购人 */
  creatorDesc?: string;
  currency?: string;
  /** 第三方采购单号 */
  ecPoCode?: string;
  extraInfo3?: string;
  /** 采购负责人 */
  purchaser?: string;
  /** 采购负责人 */
  purchaserDesc?: string;
  /** 备注 */
  remark?: string;
  /** 企企通采购单号 */
  srmPoCode?: string;
  /**
   * 状态: 0-待审核 1-审核通过 2-审核不通过 3-废弃
   * @format int32
   */
  status?: number;
  /** 状态: 0-待审核 1-审核通过 2-审核不通过 3-废弃 */
  statusDesc?: string;
  /** 已处理的第二状态，是待订单还是已全部转订单 */
  statusDesc2?: string;
  /**
   * 申购时间
   * @format date-time
   */
  submitTime?: string;
  /** 第三方系统转义 */
  thirdSystemDesc?: string;
  /**
   * 申购类型
   * @format int32
   */
  type?: number;
  /** 申购仓库 */
  warehouseCode?: string;
}

/** PrListQueryReq */
export interface PrListQueryReq {
  /** 申购人 */
  creator?: string;
  /** 关键字 申购单号/采购单号 */
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
   * 状态: 0-待审核 1-审核通过 2-审核不通过 3-废弃
   * @format int32
   */
  status?: number;
  /**
   * 申购时间结束
   * @format date-time
   */
  submitTimeEnd?: string;
  /**
   * 申购时间开始
   * @format date-time
   */
  submitTimeStart?: string;
}

/** PrListQueryResp */
export interface PrListQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 状态统计 */
  prListStatusStatistics?: PrListStatusStatistics;
  recordList?: PrItem[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** PrListStatusStatistics */
export interface PrListStatusStatistics {
  /**
   * 废弃
   * @format int32
   */
  abandon?: number;
  /**
   * 总数
   * @format int32
   */
  all?: number;
  /**
   * 审核不通过
   * @format int32
   */
  noPassAuth?: number;
  /**
   * 待处理
   * @format int32
   */
  passAuth?: number;
  /**
   * 已处理
   * @format int32
   */
  processed?: number;
  /**
   * 待审核
   * @format int32
   */
  waitAuth?: number;
}

/** PrSaveResp */
export interface PrSaveResp {
  /** 基础信息 */
  baseInfo?: PrDetailBaseInfoReq;
  /** 商品信息 */
  itemList?: PrDetailItemReq[];
}

/** PriceHeader */
export interface PriceHeader {
  /** 表头列的键，如 priceHalfCbmPlus */
  columnKey?: string;
  /** 表头列的名，如 0.5cbm+ */
  columnName?: string;
}

/** PriceRecordSyncReq */
export interface PriceRecordSyncReq {
  /** 价格记录列表-最大一次同步1000条 */
  priceRecordList?: PriceRecordSyncReqItem[];
}

/** PriceRecordSyncReqItem */
export interface PriceRecordSyncReqItem {
  /**
   * 实际产能（天）
   * @format int32
   */
  actualCapacity?: number;
  /** 创建人 */
  createBy?: string;
  /** 创建时间 */
  createTime?: string;
  /** 币别 */
  currencyCode?: string;
  /** 价格记录有效起始日期 */
  effectiveDate?: string;
  /** 价格记录有效截止日期 */
  expiryDate?: string;
  /**
   * 整箱数
   * @format int32
   */
  fullQuantity?: number;
  /** 价格记录号 */
  infoRecordNumber?: string;
  /** 物料组 */
  materialGroup?: string;
  /** 物料名称 */
  materialName?: string;
  /** 物料编码 */
  materialNumber?: string;
  /**
   * 最小订单数量
   * @format int32
   */
  minQuantity?: number;
  /** 未税单价 */
  netPrice?: number;
  /**
   * 非预测LT
   * @format int32
   */
  nonPredictiveLt?: number;
  /** 含税单价 */
  price?: number;
  /** 价格类型 */
  priceType?: string;
  /** 采购组 */
  purchaseGroup?: string;
  /** 采购组织 */
  purchaseOrg?: string;
  /** 采购单位 */
  purchaseUnit?: string;
  /** 报价日期 */
  quoteDate?: string;
  /** 状态 */
  recordStatus?: string;
  /** 价格记录类型 */
  recordType?: string;
  /** 备注 */
  remark?: string;
  /**
   * 标准LT
   * @format int32
   */
  standardLt?: number;
  /** 供应商公司代码 */
  supplierCode?: string;
  /** 供应商名称 */
  supplierName?: string;
  /** 税率 */
  taxRate?: number;
  /** 对方ELS账号 */
  toElsAccount?: string;
}

/** PriceSet */
export interface PriceSet {
  presentment_money?: Money;
  shop_money?: Money;
}

/** ProductConfigPropertyReq */
export interface ProductConfigPropertyReq {
  /** 客户编码产品列表 */
  productList?: string[];
}

/** ProductConfigPropertyResp */
export interface ProductConfigPropertyResp {
  /** sku物流配置属性 */
  logisticsConfigMap?: Record<string, ErpLogisticsConfigBean>;
}

/** ProductDetail */
export interface ProductDetail {
  /**
   * 预计发货箱数
   * @format int32
   */
  estimateBoxCount?: number;
  /**
   * 预计发货数量
   * @format int32
   */
  estimateShipQty?: number;
  /**
   * 采购未交数量
   * @format int32
   */
  futureArriveQty?: number;
  /** 采购单明细 */
  planPurchaseDetailList?: PlanPurchaseDetailReq[];
  /** 产品名称 */
  productName?: string;
  /** 供应链SKU */
  supplySku?: string;
}

/** ProductInventoryQueryListReq */
export interface ProductInventoryQueryListReq {
  /** 是否升序 */
  asc?: boolean;
  /** 排序字段 */
  orderBy?: string;
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
  /** 产品名称 */
  productName?: string;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 供应链sku列表 */
  skus?: string;
  /** 仓库code列表 */
  warehouseCodes?: string[];
}

/** ProductInventoryQueryListResp */
export interface ProductInventoryQueryListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 产品库存信息列表 */
  recordList?: ProductInventoryQueryListRespItem[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** ProductInventoryQueryListRespItem */
export interface ProductInventoryQueryListRespItem {
  /**
   * 良品量
   * @format int32
   */
  availableQuantity?: number;
  /** 品牌 */
  brand?: string;
  /**
   * 次品量
   * @format int32
   */
  defectiveQuantity?: number;
  /**
   * 待入库量
   * @format int32
   */
  erpInboundReceiving?: number;
  /**
   * 已发货量
   * @format int32
   */
  erpInboundShipped?: number;
  /**
   * 待出运量
   * @format int32
   */
  erpInboundWaitShipped?: number;
  /**
   * 计划入库
   * @format int32
   */
  erpInboundWorking?: number;
  /**
   * 入库数量
   * @format int32
   */
  fbaInboundQuantity?: number;
  /**
   * 可用量
   * @format int32
   */
  goodAvailableQuantity?: number;
  /**
   * 在途量
   * @format int32
   */
  inboundQuantity?: number;
  /**
   * 正在接收(FBA)
   * @format int32
   */
  inboundReceiving?: number;
  /**
   * 已发货(FBA)
   * @format int32
   */
  inboundShipped?: number;
  /**
   * 处理中(FBA)
   * @format int32
   */
  inboundWorking?: number;
  /**
   * 0~30(0-1个月库龄)
   * @format int32
   */
  inventoryAge0to1Month?: number;
  /**
   * 331~365(11-12个月库龄)
   * @format int32
   */
  inventoryAge11to12Month?: number;
  /**
   * 365+(12个月以上库龄)
   * @format int32
   */
  inventoryAge12MonthUp?: number;
  /**
   * 31~60(1-2个月库龄)
   * @format int32
   */
  inventoryAge1to2Month?: number;
  /**
   * 61~90(2-3个月库龄)
   * @format int32
   */
  inventoryAge2to3Month?: number;
  /**
   * 91~180(3-6个月库龄)
   * @format int32
   */
  inventoryAge3to6Month?: number;
  /**
   * 181~270(6-9个月库龄)
   * @format int32
   */
  inventoryAge6to9Month?: number;
  /**
   * 271~330(9-11个月库龄)
   * @format int32
   */
  inventoryAge9to11Month?: number;
  /**
   * 在库量
   * @format int32
   */
  inventoryQuantity?: number;
  /**
   * 交货量
   * @format int32
   */
  lnQuantity?: number;
  /**
   * 海外仓在途量
   * @format int32
   */
  overseasQuantity?: number;
  /**
   * 计划量
   * @format int32
   */
  plQuantity?: number;
  /**
   * 采购量
   * @format int32
   */
  poQuantity?: number;
  /** 产品名称 */
  productName?: string;
  /**
   * 产品状态(产品状态 [0-正常，1-停用])
   * @format int32
   */
  productState?: number;
  /**
   * 已下单量
   * @format int32
   */
  purchaseQuantity?: number;
  /**
   * 已处理预占
   * @format int32
   */
  reservedProcessed?: number;
  /**
   * 预留: 处理中
   * @format int32
   */
  reservedProcessing?: number;
  /**
   * 预占量
   * @format int32
   */
  reservedQuantity?: number;
  /**
   * 预留: 调拨中
   * @format int32
   */
  reservedTransfers?: number;
  /**
   * 未处理预占
   * @format int32
   */
  reservedUntreated?: number;
  /** 供应链SKU */
  sku?: string;
  /** SPU */
  spu?: string;
  /**
   * 产品状态0-正常 1-停用
   * @format int32
   */
  state?: number;
  /**
   * 同步时间
   * @format date-time
   */
  syncTime?: string;
  /**
   * 总库存
   * @format int32
   */
  totalInventory?: number;
  /** 单位 */
  unit?: string;
  /** 仓库code */
  warehouseCode?: string;
  /**
   * 仓库id
   * @format int64
   */
  warehouseId?: number;
  /** 仓库名称 */
  warehouseName?: string;
}

/** ProductSnInboundQueryListReq */
export interface ProductSnInboundQueryListReq {
  /** SRM发货单号 */
  deliveryNumber?: string;
  /** 积加采购单号 */
  jjPoCode?: string;
  /** 积加交货单号 */
  lotNoCode?: string;
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
  /** 采购订单号 */
  poNumber?: string;
  /** 供应链sku */
  productSku?: string;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 产品SN码 */
  snCode?: string;
  /** uid */
  uid?: string;
  /** 积加入库单号 */
  wmsInboundCode?: string;
}

/** ProductSnInboundQueryListResp */
export interface ProductSnInboundQueryListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 记录信息 */
  recordList?: ProductSnInboundQueryListRespItemInfo[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** ProductSnInboundQueryListRespItemInfo */
export interface ProductSnInboundQueryListRespItemInfo {
  /** 供应商批次号 */
  batchNo?: string;
  /** 中箱码 */
  centerBoxCode?: string;
  /** 数量 */
  deliveryItemNumber?: string;
  /** SRM发货单号 */
  deliveryNumber?: string;
  /** 彩盒码 */
  graphicCartonCode?: string;
  /** 积加采购单号 */
  jjPoCode?: string;
  /** 积加交货单号 */
  lotNoCode?: string;
  /**
   * 生产日期
   * @format date-time
   */
  manufactureDate?: string;
  /** 外箱码 */
  outerBoxCode?: string;
  /** 采购订单号 */
  poNumber?: string;
  /** 产品名称 */
  productName?: string;
  /** 供应链sku */
  productSku?: string;
  /**
   * 数量
   * @format int32
   */
  receiveQty?: number;
  /** sid */
  sid?: string;
  /** 产品SN码 */
  snCode?: string;
  /** uid */
  uid?: string;
  /** 积加入库单号 */
  wmsInboundCode?: string;
}

/** ProductSnOutboundAppSaveReq */
export interface ProductSnOutboundAppSaveReq {
  /** 扫码列表 */
  keywordList?: ScanCodeBean[];
  /** 出库单/调拨单 */
  outBoundCode?: string;
  /**
   * 箱数
   * @format int32
   */
  packageQty?: number;
  /** 供应链sku */
  productSku?: string;
  /**
   * 数量
   * @format int32
   */
  qty?: number;
  /**
   * 编码类型 1-外箱 2-中箱 3-彩盒
   * @format int32
   */
  type?: number;
}

/** ProductSnOutboundDeletedListReq */
export interface ProductSnOutboundDeletedListReq {
  /** ID集合 */
  idList?: string[];
}

/** ProductSnOutboundQueryListReq */
export interface ProductSnOutboundQueryListReq {
  /**
   * 系统订单号system_code/平台订单号类型platform_code
   * @example "system_code"
   */
  keyType?: string;
  /** 系统订单号/平台订单号 */
  keyword?: string;
  /** 出库单号 */
  outBoundCode?: string;
  /**
   * 出库日期-结束
   * @format date-time
   */
  outBoundDateEnd?: string;
  /**
   * 出库日期-开始
   * @format date-time
   */
  outBoundDateStart?: string;
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
  /** 供应链sku */
  productSku?: string;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 产品SN码 */
  snCode?: string;
}

/** ProductSnOutboundQueryListResp */
export interface ProductSnOutboundQueryListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 记录信息 */
  recordList?: ProductSnOutboundQueryListRespItemInfo[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** ProductSnOutboundQueryListRespItemInfo */
export interface ProductSnOutboundQueryListRespItemInfo {
  /** 中箱码 */
  centerBoxCode?: string;
  /** 彩盒码 */
  graphicCartonCode?: string;
  /**
   * 主键
   * @format int64
   */
  id?: number;
  /** 出库单号/调拨单号 */
  outBoundCode?: string;
  /**
   * 出库日期
   * @format date-time
   */
  outBoundDate?: string;
  /** 外箱码 */
  outerBoxCode?: string;
  /** 平台订单号 */
  platformCode?: string;
  /** 产品名称 */
  productName?: string;
  /** 供应链sku */
  productSku?: string;
  /**
   * 数量
   * @format int32
   */
  qty?: number;
  /** sid */
  sid?: string;
  /** 产品SN码 */
  snCode?: string;
  /** 系统订单号 */
  systemCode?: string;
  /** uid */
  uid?: string;
}

/** ProductSnOutboundScanCheckReq */
export interface ProductSnOutboundScanCheckReq {
  /** 对应的编码 */
  keyword?: string;
  /**
   * 类型 1-外箱 2-中箱 3-彩盒
   * @format int32
   */
  type?: number;
}

/** ProductSnOutboundScanCheckResp */
export interface ProductSnOutboundScanCheckResp {
  /**
   * 记录信息
   * @format int32
   */
  existsFlag?: number;
}

/** ProductSnOutboundScanQueryReq */
export interface ProductSnOutboundScanQueryReq {
  /**
   * 结束日期
   * @format date
   */
  endDate?: string;
  /** 出库单号/调拨单号 */
  outboundCode?: string;
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
  /** 供应链SKU */
  productSku?: string;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /**
   * 开始日期
   * @format date
   */
  startDate?: string;
}

/** ProductSnOutboundScanQueryResp */
export interface ProductSnOutboundScanQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 箱码记录信息 */
  recordList?: ScanRecordBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** ProductionLineInfoBean */
export interface ProductionLineInfoBean {
  /**
   * 拟合作产品线
   * @format int32
   * @example 0
   */
  cooperationProductLine?: number;
  /**
   * 主要客户
   * @example "华为、小米、OPPO"
   */
  majorCustomers?: string;
  /**
   * 月产能/单位
   * @example 100000
   */
  monthlyCapacity?: number;
  /**
   * 月出货量/单位
   * @example 80000
   */
  monthlyShipment?: number;
  /**
   * 产品线
   * @example "智能手机生产线"
   */
  productLine?: string;
}

/** PrsfssChangeStatusReq */
export interface PrsfssChangeStatusReq {
  /**
   * id
   * @format int64
   */
  id?: number;
  /**
   * 状态: 0-启用 1-禁用
   * @format int32
   */
  status?: number;
}

/** PrsfssQueryListReq */
export interface PrsfssQueryListReq {
  /** 选择关键字 */
  chooseKeyword?: string;
  /**
   * 选择关键字类型 1-汇总SKU 2-关联SKU 3-产品名称
   * @format int32
   */
  chooseKeywordType?: number;
  /** 客户编码 */
  customerCode?: string;
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
   * 状态: 0-启用 1-禁用
   * @format int32
   */
  status?: number;
  /** 仓库编码 */
  warehouseCode?: string;
}

/** PrsfssQueryListResp */
export interface PrsfssQueryListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 记录集合 */
  records?: PrsfssQueryListRespItem[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** PrsfssQueryListRespItem */
export interface PrsfssQueryListRespItem {
  /** 子SKU */
  childSkuCode?: string[];
  /** 子SKU */
  childSkuList?: DictCommonBean[];
  /** 子SKU名称 */
  childSkuName?: string[];
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /** 创建人 */
  creatorName?: string;
  /** 客户编码 */
  customerCode?: string;
  /** 客户名称 */
  customerDesc?: string;
  /**
   * id
   * @format int64
   */
  id?: number;
  /** 操作日志集合 */
  operationLogBeanList?: OperationLogBean[];
  /** 编码 */
  skuCode?: string;
  /** SKU名称 */
  skuName?: string;
  /**
   * 状态: 0-启用 1-禁用
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
  /** 仓库编码 */
  warehouseCode?: string;
  /** 仓库名称 */
  warehouseDesc?: string;
}

/** PrsfssSaveOrUpdateReq */
export interface PrsfssSaveOrUpdateReq {
  /** 子SKU */
  childSkuCode?: string[];
  /** 客户编码 */
  customerCode?: string;
  /**
   * id
   * @format int64
   */
  id?: number;
  /** 汇总SKU */
  skuCode?: string;
  /** 仓库编码 */
  warehouseCode?: string;
}

/** PsfaiChangeStatusReq */
export interface PsfaiChangeStatusReq {
  /** 增量活动编码 */
  activityCode?: string;
  /**
   * 状态: 0-启用 1-禁用
   * @format int32
   */
  status?: number;
}

/** PsfaiQueryListReq */
export interface PsfaiQueryListReq {
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

/** PsfaiQueryListResp */
export interface PsfaiQueryListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 记录集合 */
  recordList?: PsfaiQueryListRespItem[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** PsfaiQueryListRespItem */
export interface PsfaiQueryListRespItem {
  /**
   * 活动结束日期
   * @format date
   */
  actEndDate?: string;
  /**
   * 活动开始日期
   * @format date
   */
  actStartDate?: string;
  /** 活动编码 */
  activityCode?: string;
  button?: Button;
  /** 渠道 */
  channel?: string[];
  /** 渠道描述 */
  channelDesc?: string[];
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /** 创建人编码 */
  creatorCode?: string;
  /** 填写日期 */
  dateRange?: string;
  /**
   * id
   * @format int64
   */
  id?: number;
  /** 名称 */
  name?: string;
  /** 操作人 */
  operator?: string;
  /** 操作人 */
  operatorCode?: string;
  /**
   * 状态: 0-启用 1-禁用
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
  /** 对应周 */
  week?: string;
  /** 对应周 */
  weekDesc?: string;
}

/** PsfaiSaveReq */
export interface PsfaiSaveReq {
  /**
   * 活动结束日期
   * @format date
   */
  actEndDate?: string;
  /**
   * 活动开始日期
   * @format date
   */
  actStartDate?: string;
  /** 活动编码 */
  activityCode?: string;
  /** 渠道 */
  channel?: string[];
  /** 填写日期 */
  dateRange?: string;
  /** 名称 */
  name?: string;
  /**
   * 状态: 0-启用 1-禁用
   * @format int32
   */
  status?: number;
  /** 对应周 */
  week?: string;
}

/** PsfaiShowWeekBean */
export interface PsfaiShowWeekBean {
  /**
   * 对应id
   * @format int64
   */
  id?: number;
  /**
   * 对应填写增量的id
   * @format int64
   */
  incrId?: number;
  /** 增量名字 */
  incrName?: string;
  /**
   * 值
   * @format int32
   */
  incrValue?: number;
  /**
   * 关联的表单id项
   * @format int64
   */
  itemId?: number;
  /** 对应周 */
  week?: string;
}

/** PsfatChangeStatusReq */
export interface PsfatChangeStatusReq {
  /** code */
  code?: string;
  /**
   * 状态: 0-启用 1-禁用
   * @format int32
   */
  status?: number;
}

/** PsfatQueryListReq */
export interface PsfatQueryListReq {
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
   * 预测类型  1-销量 2-预测
   * @format int32
   */
  type?: number;
}

/** PsfatQueryListResp */
export interface PsfatQueryListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 记录集合 */
  recordList?: PsfatQueryListRespItem[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** PsfatQueryListRespItem */
export interface PsfatQueryListRespItem {
  /** 渠道 */
  channel?: string[];
  /** code */
  code?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /** 创建人编码 */
  creatorCode?: string;
  /**
   * id
   * @format int64
   */
  id?: number;
  /** 名称 */
  name?: string;
  /** 操作人 */
  operator?: string;
  /** 操作人 */
  operatorCode?: string;
  /** 规则描述 */
  ruleDesc?: string;
  /** 规则列表 */
  ruleList?: PsfsQueryListRespRuleItem[];
  /**
   * 规则条件 0-全部满足 1-部分满足
   * @format int32
   */
  ruleType?: number;
  /** 规则条件描述 */
  ruleTypeDesc?: string;
  /**
   * 状态: 0-启用 1-禁用
   * @format int32
   */
  status?: number;
  /** 状态描述 */
  statusDesc?: string;
  /** 标签编码 */
  tagItemCode?: string;
  /** 标签名字 */
  tagItemName?: string;
  /** 标签路径 */
  tagItemUrl?: string;
  /**
   * 预测类型  1-销量 2-预测
   * @format int32
   */
  type?: number;
  /** 预测类型描述 */
  typeDesc?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** PsfatSaveReq */
export interface PsfatSaveReq {
  /** 渠道 */
  channel?: string[];
  /** code */
  code?: string;
  /**
   * id
   * @format int64
   */
  id?: number;
  /** 名称 */
  name?: string;
  /** 规则列表 */
  ruleList?: PsfatSaveReqItem[];
  /**
   * 规则条件 0-全部满足 1-部分满足
   * @format int32
   */
  ruleType?: number;
  /**
   * 状态: 0-启用 1-禁用
   * @format int32
   */
  status?: number;
  /** 标签编码 */
  tagItemCode?: string;
  /**
   * 预测类型  1-销量 2-预测
   * @format int32
   */
  type?: number;
}

/** PsfatSaveReqItem */
export interface PsfatSaveReqItem {
  /** 自动打标编码 */
  code?: string;
  /** 名称 */
  name?: string;
  /** 100-较昨日 101-较3日前 102-较7日前 103-较15日前 104-较30日前 105-较60日前 106-较90日前     101avg-较3日前 102avg-较7日前 103avg-较15日前 104avg-较30日前 105avg-较60日前 106avg-较90日前\r\n200-较上周 201-较二周 202-较三周 204-较四周 205-较五周 206-较六周 207-较七周 208-较八周 200avg-较上周 201avg-较二周 202avg-较三周 204avg-较四周 205avg-较五周 206avg-较六周 207avg-较七周 208avg-较八周 */
  type1?: string;
  /**
   * 1-加 2-减 3-乘 4-除
   * @format int32
   */
  type2?: number;
  /**
   * 1-数量 2-百分比
   * @format int32
   */
  type3?: number;
  /** 明细下拉3具体值 */
  type3Value?: number;
}

/** PsfccChangeStatusReq */
export interface PsfccChangeStatusReq {
  /**
   * id
   * @format int64
   */
  id?: number;
  /**
   * 状态: 0-启用 1-禁用
   * @format int32
   */
  status?: number;
}

/** PsfccQueryListReq */
export interface PsfccQueryListReq {
  /** 客户编码 */
  customerCode?: string;
  /** 客户汇总编码 */
  customerCollectCode?: string;
  /** 客户汇总名称 */
  customerCollectName?: string;
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
   * 状态: 0-启用 1-禁用
   * @format int32
   */
  status?: number;
}

/** PsfccQueryListResp */
export interface PsfccQueryListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 记录集合 */
  recordList?: PsfccQueryListRespItem[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** PsfccQueryListRespItem */
export interface PsfccQueryListRespItem {
  /** 客户汇总编码 */
  code?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /** 创建人描述 */
  creatorDesc?: string;
  /** 客户集合 */
  customerCollectList?: DictCommonBean[];
  /**
   * id
   * @format int64
   */
  id?: number;
  /** 名称 */
  name?: string;
  /** 操作日志集合 */
  operationLogBeanList?: OperationLogBean[];
  /**
   * 状态: 0-启用 1-禁用
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

/** PsfccSaveReq */
export interface PsfccSaveReq {
  /** 客户集合 */
  customerCollectList?: DictCommonBean[];
  /**
   * id
   * @format int64
   */
  id?: number;
  /** 名称 */
  name?: string;
}

/** PsfpcChangeStatusReq */
export interface PsfpcChangeStatusReq {
  /**
   * id
   * @format int64
   */
  id?: number;
  /**
   * 状态: 0-启用 1-禁用
   * @format int32
   */
  status?: number;
}

/** PsfpcQueryListReq */
export interface PsfpcQueryListReq {
  /** 渠道 */
  channel?: string;
  /** 关键字 商品SKU/产品名称/ASIN/店铺SKU */
  keyword?: string;
  /** 型号编码 */
  modelCode?: string;
  /** 型号编码 */
  modelCodeList?: string[];
  noMapping?: boolean;
  /** 运营人 */
  operatorList?: string[];
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
  /** 产品线 */
  productLine?: string;
  /** 产品线 */
  productLineList?: string[];
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 店铺 */
  shop?: string;
  /** 店铺 */
  shopList?: string[];
  /** 站点 */
  site?: string;
  /** 站点 */
  siteList?: string[];
  /** 三级分类编码 */
  thirdCategoryCode?: string;
}

/** PsfpcQueryListResp */
export interface PsfpcQueryListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 记录集合 */
  recordList?: PsfpcQueryListResppItem[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** PsfpcQueryListResppItem */
export interface PsfpcQueryListResppItem {
  /** ASIN */
  asin?: string;
  /** 渠道 */
  channel?: string;
  /** 渠道描述 */
  channelDesc?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /** 创建人编码 */
  creatorCode?: string;
  /** 五级分类编码 */
  fiveCategoryCode?: string;
  /** 五级分类描述 */
  fiveCategoryDesc?: string;
  /**
   * id
   * @format int64
   */
  id?: number;
  /** 型号编码 */
  modelCode?: string;
  /** 型号描述 */
  modelDesc?: string;
  /**
   * 未映射 0-否 1-是
   * @format int32
   */
  noMapping?: number;
  /** 操作人 */
  operator?: string;
  /** 操作人 */
  operatorCode?: string;
  /** 产品线 */
  productLine?: string;
  /** 产品线描述 */
  productLineDesc?: string;
  /** 商品名称 */
  productName?: string;
  /** 店铺SKU */
  sellerSku?: string;
  /** 店铺 */
  shop?: string;
  /** 站点 */
  site?: string;
  /** 商品编码 */
  skuCode?: string;
  /** sku店铺下拉集合 */
  skuShopList?: SkuShopItem[];
  /**
   * 状态: 0-启用 1-禁用
   * @format int32
   */
  status?: number;
  /** 状态描述 */
  statusDesc?: string;
  /** 三级分类编码 */
  thirdCategoryCode?: string;
  /** 三级分类描述 */
  thirdCategoryDesc?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** PsfpcSaveReq */
export interface PsfpcSaveReq {
  /** ASIN */
  asin?: string;
  /** 渠道 */
  channel?: string;
  /**
   * id
   * @format int64
   */
  id?: number;
  /** 店铺SKU */
  sellerSku?: string;
  /** 店铺 */
  shop?: string;
  /** 站点 */
  site?: string;
  /** 编码 */
  skuCode?: string;
}

/** PsfsChangeStatusReq */
export interface PsfsChangeStatusReq {
  /**
   * id
   * @format int64
   */
  id?: number;
  /**
   * 状态: 0-启用 1-禁用
   * @format int32
   */
  status?: number;
}

/** PsfsQueryListReq */
export interface PsfsQueryListReq {
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

/** PsfsQueryListReqItem */
export interface PsfsQueryListReqItem {
  /** 品牌编码 */
  brandCode?: string;
  /** 品牌名称 */
  brandName?: string;
  /** 品牌英文名称 */
  brandNameEn?: string;
  /** 渠道 */
  channel?: string;
  /** 渠道描述 */
  channelDesc?: string;
  /** 国家 */
  country?: string[];
  /** 国家描述 */
  countryDesc?: string[];
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /** 创建人编码 */
  creatorCode?: string;
  /**
   * id
   * @format int64
   */
  id?: number;
  /** 操作人 */
  operator?: string;
  /** 操作人 */
  operatorCode?: string;
  /** 站点 */
  site?: string;
  /** 备货站点 */
  stockSite?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** PsfsQueryListResp */
export interface PsfsQueryListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 记录集合 */
  recordList?: PsfsQueryListRespItem[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** PsfsQueryListRespItem */
export interface PsfsQueryListRespItem {
  /** 渠道 */
  channel?: string;
  /** 渠道描述 */
  channelDesc?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /** 创建人编码 */
  creatorCode?: string;
  /**
   * id
   * @format int64
   */
  id?: number;
  /** 名称 */
  name?: string;
  /** 操作人 */
  operator?: string;
  /** 操作人 */
  operatorCode?: string;
  /** 站点集合 */
  siteList?: string[];
  /**
   * 状态: 0-启用 1-禁用
   * @format int32
   */
  status?: number;
  /** 状态描述 */
  statusDesc?: string;
  /**
   * 预测类型 1-按商品SKU预测 2-按在线商品预测
   * @format int32
   */
  type?: number;
  /** 预测类型描述 */
  typeDesc?: string;
  /** 唯一类型 */
  uniqueType?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** PsfsQueryListRespRuleItem */
export interface PsfsQueryListRespRuleItem {
  /** 自动打标编码 */
  code?: string;
  /** 名称 */
  name?: string;
  /** 100-较昨日 101-较3日前 102-较7日前 103-较15日前 104-较30日前 105-较60日前 106-较90日前     101avg-较3日前 102avg-较7日前 103avg-较15日前 104avg-较30日前 105avg-较60日前 106avg-较90日前\r\n200-较上周 201-较二周 202-较三周 204-较四周 205-较五周 206-较六周 207-较七周 208-较八周 200avg-较上周 201avg-较二周 202avg-较三周 204avg-较四周 205avg-较五周 206avg-较六周 207avg-较七周 208avg-较八周 */
  type1?: string;
  /**
   * 1-加 2-减 3-乘 4-除
   * @format int32
   */
  type2?: number;
  /**
   * 1-数量 2-百分比
   * @format int32
   */
  type3?: number;
  /** 明细下拉3具体值 */
  type3Value?: number;
}

/** PsfsSaveReq */
export interface PsfsSaveReq {
  /** 渠道 */
  channel?: string;
  /**
   * id
   * @format int64
   */
  id?: number;
  /** 名称 */
  name?: string;
  /**
   * 状态: 0-启用 1-禁用
   * @format int32
   */
  status?: number;
  /**
   * 预测类型 1-按商品SKU预测 2-按在线商品预测
   * @format int32
   */
  type?: number;
}

/** PsfssChangeStatusReq */
export interface PsfssChangeStatusReq {
  /**
   * id
   * @format int64
   */
  id?: number;
  /**
   * 状态: 0-启用 1-禁用
   * @format int32
   */
  status?: number;
}

/** PsfssQueryListReq */
export interface PsfssQueryListReq {
  /** 渠道 */
  channel?: string;
  /** 选择关键字 */
  chooseKeyword?: string;
  /**
   * 选择关键字类型 1-汇总SKU 2-关联SKU 3-产品名称
   * @format int32
   */
  chooseKeywordType?: number;
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
  /** 站点 */
  site?: string;
}

/** PsfssQueryListResp */
export interface PsfssQueryListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 记录集合 */
  records?: PsfssQueryListRespItem[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** PsfssQueryListRespItem */
export interface PsfssQueryListRespItem {
  /** 渠道 */
  channel?: string;
  /** 子SKU */
  childSkuCode?: string;
  /** 子SKU名称 */
  childSkuName?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /** 创建人编码 */
  creatorCode?: string;
  /**
   * id
   * @format int64
   */
  id?: number;
  /** 操作日志集合 */
  operationLogBeanList?: OperationLogBean[];
  /** 站点 */
  site?: string;
  /** 编码 */
  skuCode?: string;
  /** SKU名称 */
  skuName?: string;
  /**
   * 状态: 0-启用 1-禁用
   * @format int32
   */
  status?: number;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /** 操作人 */
  updater?: string;
  /** 操作人 */
  updaterCode?: string;
}

/** PsfssSaveOrUpdateReq */
export interface PsfssSaveOrUpdateReq {
  /** 渠道 */
  channel?: string;
  /** 子SKU */
  childSkuCode?: string;
  /**
   * id
   * @format int64
   */
  id?: number;
  /** 站点 */
  site?: string;
  /** 汇总SKU */
  skuCode?: string;
}

/** PsftChangeStatusReq */
export interface PsftChangeStatusReq {
  /**
   * id
   * @format int64
   */
  id?: number;
  /**
   * 状态: 0-启用 1-禁用
   * @format int32
   */
  status?: number;
}

/** PsftOptionReq */
export interface PsftOptionReq {
  /**
   * 1-销量 2-预测
   * @format int32
   */
  type?: number;
}

/** PsftQueryListReq */
export interface PsftQueryListReq {
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
   * 预测类型  1-销量 2-预测
   * @format int32
   */
  type?: number;
}

/** PsftQueryListResp */
export interface PsftQueryListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 记录集合 */
  recordList?: PsftQueryListRespItem[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** PsftQueryListRespItem */
export interface PsftQueryListRespItem {
  /** 编码 */
  code?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /** 创建人编码 */
  creatorCode?: string;
  /**
   * id
   * @format int64
   */
  id?: number;
  /** 名称 */
  name?: string;
  /** 操作日志集合 */
  operationLogBeanList?: OperationLogBean[];
  /** 操作人 */
  operator?: string;
  /** 操作人 */
  operatorCode?: string;
  /**
   * 状态: 0-启用 1-禁用
   * @format int32
   */
  status?: number;
  /** 状态描述 */
  statusDesc?: string;
  /** 标签集合 */
  tagItemList?: PsftQueryListRespTagItem[];
  /**
   * 预测类型  1-销量 2-预测
   * @format int32
   */
  type?: number;
  /** 预测类型描述 */
  typeDesc?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** PsftQueryListRespTagItem */
export interface PsftQueryListRespTagItem {
  /** 完整图标路径 */
  fullIconUrl?: string;
  /** 图标相对路径 */
  iconUrl?: string;
  /**
   * id
   * @format int64
   */
  id?: number;
  /** 编码 */
  itemCode?: string;
  /** 名称 */
  name?: string;
}

/** PsftQueryOptionListResp */
export interface PsftQueryOptionListResp {
  /** 记录集合 */
  recordList?: PsftQueryOptionListRespItem[];
}

/** PsftQueryOptionListRespItem */
export interface PsftQueryOptionListRespItem {
  /** 完整图标路径 */
  fullIconUrl?: string;
  /** 图标相对路径 */
  iconUrl?: string;
  /** 编码 */
  itemCode?: string;
  /** 名称 */
  name?: string;
}

/** PsftSaveReq */
export interface PsftSaveReq {
  /** 编码，修改时候不能为空 */
  code?: string;
  /** 名称 */
  name?: string;
  /** 标签集合 */
  tagItemList?: PsftSaveRespItem[];
  /**
   * 预测类型  1-销量 2-预测
   * @format int32
   */
  type?: number;
}

/** PsftSaveRespItem */
export interface PsftSaveRespItem {
  /** 完整图标路径 */
  fullIconUrl?: string;
  /** 图标相对路径 */
  iconUrl?: string;
  /**
   * id
   * @format int64
   */
  id?: number;
  /** 名称 */
  name?: string;
}

/** PurchaseOrderHeadItem */
export interface PurchaseOrderHeadItem {
  /** 审批状态 */
  auditStatus?: string;
  /** 本位币 */
  chargeCurrency?: string;
  /** 公司代码 */
  company?: string;
  /** 公司名称 */
  companyName?: string;
  /** 合同名称 */
  contractName?: string;
  /** 合同编号 */
  contractNumber?: string;
  /** 创建人 */
  createBy?: string;
  /** 创建时间 */
  createTime?: string;
  /** 币别 */
  currency?: string;
  /** 交货状态 */
  deliveryStatus?: string;
  /** 中转或直发 */
  deliveryType?: string;
  /** 租户ELS账号 */
  elsAccount?: string;
  /** 签署完成状态 */
  esignFinalStatus?: string;
  /** 签署发起状态 */
  esignStartStatus?: string;
  /** 汇率 */
  exchange?: string;
  /** 易仓订单号 */
  fbk1?: string;
  /** 审批人 */
  fbk8?: string;
  /** 审批备注 */
  fbk9?: string;
  /** id */
  id?: string;
  /** 接口返回信息 */
  interfaceMsg?: string;
  /** 是否启用电签 */
  isEsign?: string;
  /** 是否冻结/暂挂 */
  isFreeze?: string;
  /** 订单日期 */
  orderDate?: string;
  /** 订单号 */
  orderNumber?: string;
  /** 订单状态 */
  orderStatus?: string;
  /** 订单类型 */
  orderType?: string;
  /** 订单版本 */
  orderVersion?: string;
  /** 补货方式 */
  poType?: string;
  /** 跟单员 */
  ptsOprater?: string;
  /** 采购组 */
  purchaseGroup?: string;
  /** 采购组名称 */
  purchaseGroupName?: string;
  /** 采购订单行信息 */
  purchaseOrderItemList?: PurchaseOrderItem[];
  /** 采购组织 */
  purchaseOrg?: string;
  /** 采购组织名称 */
  purchaseOrgName?: string;
  /** 需方负责人 */
  purchasePrincipal?: string;
  /** 接口状态 */
  returnState?: string;
  /** 发布状态 */
  sendStatus?: string;
  /** 供应商运输方式 */
  shippingMethodIdHead?: string;
  /** 来源类型 */
  sourceType?: string;
  /** 供应商ERP编码 */
  supplierCode?: string;
  /** 供应商名称 */
  supplierName?: string;
  /** 供方负责人 */
  supplierPrincipal?: string;
  /** 供应商ELS账号 */
  toElsAccount?: string;
  /** 未税总金额 */
  totalNetAmount?: number;
  /** 含税总金额 */
  totalTaxAmount?: number;
  /** 修改人 */
  updateBy?: string;
  /** 修改时间 */
  updateTime?: string;
  /** 采购仓库 */
  warehouseCode?: string;
}

/** PurchaseOrderHeadListQueryResp */
export interface PurchaseOrderHeadListQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 记录 */
  recordList?: PurchaseOrderHeadItem[];
  /** 统计 */
  statistics?: PurchaseOrderRespStatistics;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** PurchaseOrderItem */
export interface PurchaseOrderItem {
  /** 物料分类编码 */
  cateCode?: string;
  /** 物料分类名称 */
  cateName?: string;
  /** 币别 */
  currency?: string;
  /**
   * 交货数量
   * @format int32
   */
  deliveryQuantity?: number;
  /** 工厂代码 */
  factory?: string;
  /** 供应链SKU编码 */
  fbk1?: string;
  /** 头表id */
  headId?: string;
  /** 是否质检 */
  isCheckQuality?: string;
  /** 删除标识 */
  isDeleteOrder?: string;
  /** 临时定价 */
  isEstimate?: string;
  /** 是否赠品 */
  isFree?: string;
  /** 送货安排 */
  isJit?: string;
  /** 订单行号 */
  itemNumber?: string;
  /** 行状态 */
  itemStatus?: string;
  /** 物料描述 */
  materialDesc?: string;
  /** 物料组 */
  materialGroup?: string;
  /** 物料组名称 */
  materialGroupName?: string;
  /** 物料名称 */
  materialName?: string;
  /** 物料编码 */
  materialNumber?: string;
  /** 物料规格 */
  materialSpec?: string;
  /** 未税金额 */
  netAmount?: number;
  /** 未税单价 */
  netPrice?: number;
  /**
   * 未交货数量
   * @format int32
   */
  notDeliveryQuantity?: number;
  /**
   * 在途数量
   * @format int32
   */
  onWayQuantity?: number;
  /** 订单号 */
  orderNumber?: string;
  /** 含税单价 */
  price?: number;
  /** 采购周期 */
  purchaseCycle?: string;
  /** 是否首单 */
  purchaseIsFirst?: string;
  /** 需方备注 */
  purchaseRemark?: string;
  /** 采购类型 */
  purchaseType?: string;
  /** 采购单位 */
  purchaseUnit?: string;
  /** 数量 */
  quantity?: number;
  /**
   * 收货数量
   * @format int32
   */
  receiveQuantity?: number;
  /** 拒绝原因 */
  rejectReason?: string;
  /** 要求交期 */
  requireDate?: string;
  /** 责任方 */
  responsibleParty?: string;
  /** 责任方原因 */
  responsibleReason?: string;
  /** 发布状态 */
  sendStatus?: string;
  /** 来源单号 */
  sourceNumber?: string;
  /** 来源类型 */
  sourceType?: string;
  /** 库存地点代码 */
  storageLocation?: string;
  /** 供方备注 */
  supplierRemark?: string;
  /** 含税金额 */
  taxAmount?: number;
  /** 税码 */
  taxCode?: string;
  /** 税率 */
  taxRate?: string;
  /** 对方ELS账号 */
  toElsAccount?: string;
}

/** PurchaseOrderItemBean */
export interface PurchaseOrderItemBean {
  /** 公司代码 */
  companyCode?: string;
  /** 创建时间 */
  creationTime?: string;
  /**
   * 交货数量
   * @format int32
   */
  deliveryQuantity?: number;
  /** 是否关闭 */
  isClosed?: string;
  /** 是否首单 */
  isFirstOrder?: string;
  /** 订单行号 */
  itemNumber?: string;
  /** 物料组 */
  materialGroup?: string;
  /**
   * 未交货数量
   * @format int32
   */
  notDeliveryQuantity?: number;
  /**
   * 订单数量
   * @format int32
   */
  orderQuantity?: number;
  /** 计划负责人 */
  planManager?: string;
  /** 产品名称 */
  productName?: string;
  /** 产品SKU */
  productSku?: string;
  /** 发布状态 */
  publishStatus?: string;
  /** 采购组 */
  purchaseGroup?: string;
  /** 采购负责人 */
  purchaseManager?: string;
  /** 采购订单号 */
  purchaseOrderNumber?: string;
  /** 采购单位 */
  purchaseUnit?: string;
  /**
   * 收货数量
   * @format int32
   */
  receiveQuantity?: number;
  /** 要求交期 */
  requireDate?: string;
  /** 来源单号 */
  sourceNumber?: string;
  /** 供应商ELS账号 */
  supplierElsAccount?: string;
  /** 供应商ERP编码 */
  supplierErpCode?: string;
  /** 供应商名称 */
  supplierName?: string;
  /** 供应链SKU */
  supplyChainSku?: string;
}

/** PurchaseOrderItemListQueryReq */
export interface PurchaseOrderItemListQueryReq {
  /**
   * 创建时间-结束
   * @format date-time
   */
  creationTimeEnd?: string;
  /**
   * 创建时间-开始
   * @format date-time
   */
  creationTimeStart?: string;
  /**
   * 是否关闭--0-未关闭 1-已关闭
   * @format int32
   */
  isClosed?: number;
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
  /** 计划负责人--给编码 */
  planManager?: string[];
  /** 产品名称 */
  productName?: string;
  /** 采购负责人--给名字 */
  purchaseManager?: string[];
  /** 采购订单号 */
  purchaseOrderNumber?: string;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 来源单号 */
  sourceNumber?: string;
  /** 供应商编码 */
  supplierCodes?: string[];
}

/** PurchaseOrderItemListQueryResp */
export interface PurchaseOrderItemListQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 采购订单行列表 */
  recordList?: PurchaseOrderItemBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** PurchaseOrderListQueryReq */
export interface PurchaseOrderListQueryReq {
  /** 审批状态-待添加 */
  auditStatus?: string;
  /** 创建人 */
  createBy?: string;
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
  /** 交货状态-待添加 */
  deliveryStatus?: string;
  /** 签署完成状态-待添加 */
  esignFinalStatus?: string;
  /** 签署发起状态-待添加 */
  esignStartStatus?: string;
  /** 易仓订单号 */
  fbk1?: string;
  /** 关键字 PO号或者供应商名称 */
  keyword?: string;
  /** 订单号列表 */
  orderNumberList?: string[];
  /** 订单状态-待添加 */
  orderStatus?: string;
  /**
   * 订单时间-结束
   * @format date-time
   */
  orderTimeEnd?: string;
  /**
   * 订单时间-开始
   * @format date-time
   */
  orderTimeStart?: string;
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
  /** 发布状态-待添加 */
  sendStatus?: string;
  /** 供应商ELS账号 */
  toElsAccount?: string;
}

/** PurchaseOrderReq */
export interface PurchaseOrderReq {
  /** 产品明细 */
  planPrebookInboundDetailList?: ProductDetail[];
}

/** PurchaseOrderRes */
export interface PurchaseOrderRes {
  /** 产品明细列表 */
  planPrebookInboundDetailList?: PlanPrebookInboundDetail[];
}

/** PurchaseOrderRespStatistics */
export interface PurchaseOrderRespStatistics {
  /**
   * 全部
   * @format int32
   */
  all?: number;
  /**
   * 已关闭
   * @format int32
   */
  closed?: number;
  /** @format int32 */
  confirmed?: number;
  /**
   * 新建
   * @format int32
   */
  create?: number;
  /**
   * 易仓处理中
   * @format int32
   */
  ecangProcessing?: number;
  /**
   * 变更中
   * @format int32
   */
  modifying?: number;
  /**
   * 部分确认
   * @format int32
   */
  partiallyConfirmed?: number;
  /**
   * 待供应商确认
   * @format int32
   */
  supplierConfirming?: number;
  /**
   * 供应商已拒绝
   * @format int32
   */
  supplierRejected?: number;
}

/** PurchaseQueryListReq */
export interface PurchaseQueryListReq {
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

/** PurchaseQueryListResp */
export interface PurchaseQueryListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  recordList?: PurchaseQueryListRespPurchaseOrder[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** PurchaseQueryListRespPurchaseOrder */
export interface PurchaseQueryListRespPurchaseOrder {
  /** 品线 */
  bigCategoryName?: string;
  /** 创建时间 */
  creationTime?: string;
  /** 创建人 */
  creator?: string;
  /** 跟单人 */
  documentController?: string;
  /** 预计到货时间 */
  expectedArrivalTime?: string;
  /**
   * 预期数量
   * @format int32
   */
  expectedQuantity?: number;
  /** 头程运输方式 */
  firstMileTransportation?: string;
  /** 入库单号 */
  inboundOrderNumber?: string;
  /** 产品名称 */
  productName?: string;
  /** 供应链SKU */
  productSku?: string;
  /** 采购单号 */
  purchaseOrderNumber?: string;
  /** 采购单状态 */
  purchaseOrderStatus?: string;
  /**
   * 实收数量
   * @format int32
   */
  receivedQuantity?: number;
  /** 商品SKU */
  skuCode?: string;
  /** SRM采购单号 */
  srmPurchaseOrderNumber?: string;
  /** 供应商名称 */
  supplierName?: string;
  /**
   * 未到数量
   * @format int32
   */
  undeliveredQuantity?: number;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /** 仓库代码 */
  warehouseCode?: string;
  /** 仓库名称 */
  warehouseName?: string;
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

/** QueryRemovalReq */
export interface QueryRemovalReq {
  /** 国家代码 */
  countryCode?: string[];
  /**
   * 创建时间-结束
   * @format date-time
   * @example "2022-01-01 00:00:00"
   */
  createTimeEnd?: string;
  /**
   * 创建时间-开始
   * @format date-time
   * @example "2022-01-01 00:00:00"
   */
  createTimeStart?: string;
  /** 移仓单号 */
  orderId?: string;
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
   * 收货仓库
   * @format int64
   */
  receiveWarehouseId?: number;
  /** 店铺账号 */
  shopAccount?: string[];
  /** 状态：Draft-草稿，PendingAudit-待提交审批，Auditing-审核中，AuditApproved-审核通过，Pushing-推送中，Pending-待处理，Completed-已完成，Cancelled-已作废，Pushing-推送中，PushFailed-异常 */
  status?: string;
}

/** QueryWarehouseBumperReq */
export interface QueryWarehouseBumperReq {
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

/** QueryWarehouseLogisticsReq */
export interface QueryWarehouseLogisticsReq {
  /** erp订单号 */
  erpCodeList?: string[];
}

/** QuotationOrderAbandonReq */
export interface QuotationOrderAbandonReq {
  /** 报价单号 */
  code?: string;
}

/** QuotationOrderAuthReq */
export interface QuotationOrderAuthReq {
  /** 报价单号 */
  code?: string;
  /** 通过不通过 */
  pass?: boolean;
  /** 备注 */
  remark?: string;
}

/** QuotationOrderBean */
export interface QuotationOrderBean {
  button?: Button;
  /**
   * 产品种类
   * @format int64
   */
  categoryQty?: number;
  /** 报价单号 */
  code?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人编码 */
  creator?: string;
  /** 创建人名称 */
  creatorName?: string;
  /** 客户编码 */
  customerCode?: string;
  /** 客户名称 */
  customerName?: string;
  /**
   * 报价单状态0-未知 1-待审核 2-已通过 3-作废 4-异常
   * @format int32
   */
  status?: number;
  /** 报价单状态0-未知 1-待审核 2-已通过 3-作废 4-异常 */
  statusDesc?: string;
}

/** QuotationOrderDetailResp */
export interface QuotationOrderDetailResp {
  /** 审核日志 */
  authLogList?: AuthLogBean[];
  /** 审核信息 */
  authNodeList?: AuthNodeBean[];
  /** 报价单号 */
  code?: string;
  /** 客户编码 */
  customerCode?: string;
  /** 客户信息 */
  customerInfo?: CustomerInfoBean;
  /** 基本信息 */
  flowBaseInfo?: ErpFlowBean;
  /** 触发审核策略code */
  flowCode?: string;
  /** 执行流程名称 */
  flowName?: string;
  /** 报价单产品明细 */
  itemList?: QuotationOrderItemBean[];
  /** 下一个审核节点 */
  nextAuthNode?: AuthNodeBean;
  /**
   * 报价单状态0-未知 1-待审核 2-已通过 3-作废 4-异常
   * @format int32
   */
  status?: number;
  /** 报价单状态0-未知 1-待审核 2-已通过 3-作废 4-异常 */
  statusDesc?: string;
}

/** QuotationOrderItemBean */
export interface QuotationOrderItemBean {
  /** 币种 */
  currencyCode?: string;
  /** 币种名称 */
  currencyName?: string;
  /** 折扣 */
  discount?: string;
  /** 最低价 */
  minPrice?: number;
  /** 报价 */
  postalPrice?: string;
  /** 报价最大值 */
  postalPriceMax?: number;
  /** 报价最小值 */
  postalPriceMin?: number;
  /** 产品名称 */
  productName?: string;
  /** 产品编码 */
  skuCode?: string;
  /** 建议售价 */
  suggestPrice?: number;
}

/** QuotationOrderListReq */
export interface QuotationOrderListReq {
  /**
   * 创建时间
   * @format date-time
   */
  createTimeEnd?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTimeStart?: string;
  /** 创建人编码 */
  creator?: string;
  /** 客户名称/客户编码/报价单 */
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
   * 报价单状态 报价单状态null-全部 0-未知 1-待审核 2-已通过 3-作废 4-异常
   * @format int32
   */
  status?: number;
}

/** QuotationOrderListResp */
export interface QuotationOrderListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 报价单列表 */
  recordList?: QuotationOrderBean[];
  /** 报价单状态统计 */
  statusStatistics?: StatusStatistics;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** QuotationOrderSaveReq */
export interface QuotationOrderSaveReq {
  /** 报价单号 */
  code?: string;
  /** 客户编码 */
  customerCode?: string;
  /** 报价单产品明细 */
  itemList?: SaveItemBean[];
}

/** QuotationPriceInfoBean */
export interface QuotationPriceInfoBean {
  /** 报价单 */
  code?: string;
  /** 币种编码 */
  currency?: string;
  /** 币种名称 */
  currencyName?: string;
  /** 折扣 */
  discount?: string;
  /** 报价 */
  postalPrice?: string;
  /** 报价最大值 */
  postalPriceMax?: number;
  /** 报价最小值 */
  postalPriceMin?: number;
  /** 商品名称 */
  productName?: string;
  /** 商品SKU */
  skuCode?: string;
  /** 建议售价 */
  suggestPrice?: number;
}

/** QuotationPriceItem */
export interface QuotationPriceItem {
  /** 五级分类编码 */
  categoryCode?: string;
  /** 五级分类 */
  categoryDesc?: string;
  /** 编码 */
  code?: string;
  /** 币种编码 */
  currency?: string;
  /** 币种名称 */
  currencyName?: string;
  /** 一级分类编码 */
  firstCategoryCode?: string;
  /** 一级分类 */
  firstCategoryDesc?: string;
  /** 最低价 */
  minPrice?: number;
  /** 商品名称 */
  productName?: string;
  /** 商品SKU */
  skuCode?: string;
  /** 建议售价 */
  suggestPrice?: number;
}

/** QuotationPriceListReq */
export interface QuotationPriceListReq {
  /** 产品名称/商品sku/供应链sku */
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
}

/** QuotationPriceListResp */
export interface QuotationPriceListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 定价列表列表 */
  recordList?: QuotationPriceItem[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** QuotationPriceSaveReq */
export interface QuotationPriceSaveReq {
  /** 编码 */
  code?: string;
  /** 币种编码 */
  currency?: string;
  /** 最低价 */
  minPrice?: number;
  /** 商品SKU */
  skuCode?: string;
}

/** ReceiptFileBeanReq */
export interface ReceiptFileBeanReq {
  /** 文件名 */
  fileName?: string;
  /** 文件Key */
  receiptKey?: string;
}

/** ReceiptFileBeanRes */
export interface ReceiptFileBeanRes {
  /** 回执文件名称 */
  name?: string;
  /** 回执文件Key */
  ossKey?: string;
  /** 回执文件路径 */
  receiptFilePath?: string;
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

/** ReceiveInfoReq */
export interface ReceiveInfoReq {
  /** 街道 */
  address?: string;
  /** 详细地址 */
  address2?: string;
  /** 区/县 */
  area?: string;
  /** 城市 */
  city?: string;
  /** 国家/地区 */
  countryCode?: string;
  /** 邮箱 */
  email?: string;
  /** 门牌号 */
  houseNumber?: string;
  /** 手机 */
  mobile?: string;
  /** 收件人 */
  name?: string;
  /** 电话 */
  phone?: string;
  /** 省/周 */
  province?: string;
  /** 买家邮编 */
  zipcode?: string;
}

/** ReceiveInfoRes */
export interface ReceiveInfoRes {
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
  /** 客户名称 */
  customerName?: string;
  /** 买家邮箱 */
  email?: string;
  /** 门牌号 */
  houseNumber?: string;
  /** 买家手机 */
  mobile?: string;
  /** 买家姓名 */
  name?: string;
  /** 买家电话 */
  phone?: string;
  /** 买家省份 */
  province?: string;
  /** 跟踪单号 */
  trackOrderCode?: string;
  /** 买家邮编 */
  zipcode?: string;
}

/** ReceiverInfo */
export interface ReceiverInfo {
  /** 收件人信息id */
  receiverId?: string;
  /** 收件人 */
  recevicer?: string;
  /** 收件人地址 */
  recevicerAddress?: string;
  /** 收件人区域 */
  recevicerArea?: string;
  /** 收件人城市 */
  recevicerCity?: string;
  /** 收件人国家 */
  recevicerCountry?: string;
  /** 收件人门牌 */
  recevicerDoorplate?: string;
  /** 收件人email */
  recevicerEmail?: string;
  /** 收件人号码 */
  recevicerPhone?: string;
  /** 收件人省份 */
  recevicerProvince?: string;
  /** 收件人邮编 */
  recevicerZipCode?: string;
}

/** RecomputeFeeReq */
export interface RecomputeFeeReq {
  /** 兴运物流单 */
  xyLogisticsNo?: string;
}

/** ReferenceParamsDeliveryMapResp */
export interface ReferenceParamsDeliveryMapResp {
  /** 发货方式 */
  paramMap?: Record<string, NavigationDeliveryParam[]>;
}

/** ReferenceParamsDeliveryReq */
export interface ReferenceParamsDeliveryReq {
  /** 国家编码 */
  countryCode?: string;
  /** 商品编码 */
  skuCodeList?: string[];
  /**
   * 类型：0-红人发样单 1-线下订单 2-TT订单
   * @format int32
   */
  type?: number;
}

/** RemovalBatchReq */
export interface RemovalBatchReq {
  /** 移仓单号 */
  orderIdList?: string[];
}

/** RemovalBean */
export interface RemovalBean {
  /** 地址1 */
  address1?: string;
  /** 地址2 */
  address2?: string;
  /** 城市 */
  city?: string;
  /** 国家代码 */
  country?: string;
  /** 国家名称 */
  countryName?: string;
  /**
   * 创建时间
   * @format date-time
   * @example "2025-01-01 12:00:00"
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /** 错误信息 */
  errorMessage?: string;
  /**
   * 海外仓预计存放时长
   * @minLength 0
   * @maxLength 200
   */
  expectedStorageTime?: string;
  /**
   * ID
   * @format int64
   */
  id?: number;
  /**
   * 是否需要贴透明或者标签出货
   * @minLength 0
   * @maxLength 200
   */
  isTransparentOrLabel?: string;
  /**
   * 海外仓操作指令
   * @minLength 0
   * @maxLength 200
   */
  operationInstruction?: string;
  /** 移仓单号 */
  orderId?: string;
  /** 电话 */
  phone?: string;
  /** 邮政编码 */
  postcode?: string;
  /**
   * 收货仓库代码
   * @format int64
   */
  receiveWarehouseId?: number;
  /** 收货仓库名称 */
  receiveWarehouseName?: string;
  /** 收货人 */
  receiverName?: string;
  /** 区域/省份 */
  region?: string;
  /**
   * 备注
   * @minLength 0
   * @maxLength 200
   */
  remark?: string;
  /**
   * 移仓原因
   * @minLength 0
   * @maxLength 200
   */
  removalReason?: string;
  /** 移回店铺 */
  returnShop?: string;
  /**
   * 发货仓库代码
   * @format int64
   */
  shipWarehouseId?: number;
  /** 发货仓库名称 */
  shipWarehouseName?: string;
  /**
   * 发货日期
   * @format date-time
   * @example "2025-01-01 12:00:00"
   */
  shipmentDate?: string;
  /** 店铺账号 */
  shopAccount?: string;
  /** 店铺名称 */
  shopName?: string;
  /** 状态 */
  status?: string;
  /** 状态描述 */
  statusDesc?: string;
  taxIdentifier?: string;
}

/** RemovalDetailBean */
export interface RemovalDetailBean {
  /** 移仓单基本信息 */
  baseInfo?: RemovalBean;
  /** 移仓单商品列表 */
  itemList?: RemovalItemBean[];
  /** 移仓单物流列表 */
  shipmentLogList?: RemovalShipmentBean[];
}

/** RemovalItemBean */
export interface RemovalItemBean {
  /** ASIN */
  asin?: string;
  /**
   * 已取消数量
   * @format int32
   */
  cancelledQuantity?: number;
  /**
   * 销毁成本预估
   * @minLength 0
   * @maxLength 200
   */
  destructionCostEstimate?: string;
  /**
   * 首次收货时间
   * @format date-time
   * @example "2025-01-01 12:00:00"
   */
  firstReceiptTime?: string;
  /** FNSKU */
  fnsku?: string;
  /**
   * ID
   * @format int64
   */
  id?: number;
  /**
   * 等待中
   * @format int32
   */
  inProcessQuantity?: number;
  /**
   * 在途数量
   * @format int32
   */
  inTransitQuantity?: number;
  /** msku */
  msku?: string;
  /** 移仓单ID */
  orderId?: string;
  /** 平台 */
  platform?: string;
  /**
   * 移仓后毛利预估
   * @min 0
   * @exclusiveMin false
   */
  postRemovalProfitEstimate?: number;
  /** 产品图片 */
  productImage?: string;
  /** 产品名称 */
  productName?: string;
  /** 供应链sku */
  productSku?: string;
  /**
   * 已入库数量
   * @format int32
   */
  receivedQuantity?: number;
  /**
   * 可售数量
   * @format int32
   * @min 0
   * @exclusiveMin false
   */
  sellableQuantity?: number;
  /**
   * 已发货数量
   * @format int32
   */
  shippedQuantity?: number;
  /**
   * 不可售数量
   * @format int32
   * @min 0
   * @exclusiveMin false
   */
  unsellableQuantity?: number;
}

/** RemovalPageResp */
export interface RemovalPageResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 移仓单列表 */
  recordList?: RemovalBean[];
  /** 统计信息 */
  statistics?: RemovalStatistics;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** RemovalSaveReq */
export interface RemovalSaveReq {
  baseInfo: RemovalBean;
  itemList?: RemovalItemBean[];
}

/** RemovalShipmentBean */
export interface RemovalShipmentBean {
  /** 承运商 */
  carrier?: string;
  /** FNSKU */
  fnsku?: string;
  /** 物流状态 */
  logisticsStatus?: string;
  /** 产品信息 */
  productName?: string;
  /**
   * 数量
   * @format int32
   */
  quantity?: number;
  /**
   * 收货日期
   * @format date-time
   * @example "2025-01-01 12:00:00"
   */
  receiptDate?: string;
  /**
   * 发货日期
   * @format date-time
   * @example "2025-01-01 12:00:00"
   */
  shipmentDate?: string;
  /** SKU信息 */
  sku?: string;
  /** 亚马逊包裹移除跟踪号 */
  trackingNumber?: string;
}

/** RemovalStatistics */
export interface RemovalStatistics {
  /**
   * 审批完成
   * @format int32
   */
  auditApproved?: number;
  /**
   * 审核中
   * @format int32
   */
  auditing?: number;
  /**
   * 已作废
   * @format int32
   */
  cancelled?: number;
  /**
   * 已完成
   * @format int32
   */
  completed?: number;
  /**
   * 草稿
   * @format int32
   */
  draft?: number;
  /**
   * 处理中
   * @format int32
   */
  pending?: number;
  /**
   * 待提交审批
   * @format int32
   */
  pendingAudit?: number;
  /**
   * 异常
   * @format int32
   */
  pushFailed?: number;
  /**
   * 推送中
   * @format int32
   */
  pushing?: number;
  /**
   * 总数
   * @format int32
   */
  total?: number;
}

/** ReoBaseInfo */
export interface ReoBaseInfo {
  /** 额外信息 */
  extraInfo?: Record<string, object>;
  /** 操作人 */
  operator: string;
  /** 退货单描述 */
  refundsDeliveryDesc?: string;
  /** SRM退货单号 */
  refundsDeliveryNumber: string;
  /** 退货原因 */
  refundsReason: string;
  /** 运单号 */
  shippingNumber?: string;
  /** 仓库 */
  warehouseCode: string;
}

/** ReoItem */
export interface ReoItem {
  /** 额外信息 */
  extraInfo?: Record<string, object>;
  /** 批次ID */
  ibId?: string;
  /** 库位编码 */
  icCode?: string;
  /** 产品代码 */
  materialNumber: string;
  /** po单号 */
  poCode: string;
  /**
   * 数量
   * @format int32
   */
  receiveQuantity: number;
  /** 备注 */
  remark?: string;
}

/** RequirementSugguestCurrentQueryReq */
export interface RequirementSugguestCurrentQueryReq {
  /** 关键字 */
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
  /** 计划员 */
  planerList?: string[];
  /**
   * 1-正数 0-负数 -1-0
   * @format int32
   */
  plus?: number;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 三级分类 */
  thirdLevelCategory?: string[];
}

/** RequirementSugguestCurrentQueryResp */
export interface RequirementSugguestCurrentQueryResp {
  code?: string;
  /** 表头-因为表头动态所以要给这个字段 */
  colNameList?: string[];
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** row集合 */
  recordList?: Record<string, object>[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** RequirementSugguestDetailQueryResp */
export interface RequirementSugguestDetailQueryResp {
  /** 需求建议code */
  code?: string;
  /** 表头-因为表头动态所以要给这个字段 */
  colNameList?: string[];
  /** row集合 */
  rowList?: Record<string, object>[];
}

/** RequirementSugguestExportResp */
export interface RequirementSugguestExportResp {
  /** 需求建议编码 */
  code?: string;
}

/** RequirementSugguestListQueryResp */
export interface RequirementSugguestListQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  recordList?: RequirementSugguestListQueryRespRespItem[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** RequirementSugguestListQueryRespRespItem */
export interface RequirementSugguestListQueryRespRespItem {
  /** 需求建议编码 */
  code?: string;
  /**
   * 生成时间
   * @format date-time
   */
  createTime?: string;
  /** 当前周展示 */
  currentWeekShowDesc?: string;
  /** 上传失败原因文件 */
  failFileUrl?: string;
  /** 预测销量 */
  forecastSaleCode?: string;
  /** 库存节点 */
  inventoryNodeCode?: string;
  /** 需求建议名称 */
  name?: string;
  /** 操作人 */
  operator?: string;
  /**
   * 上传状态：0-生成失败 1-生成中 2-生成成功
   * @format int32
   */
  status?: number;
  /** 上传状态：0-生成失败 1-生成中 2-生成成功 */
  statusDesc?: string;
}

/** RequirementSugguestSaveReq */
export interface RequirementSugguestSaveReq {
  /** 库存节点编码 */
  inventoryNodeCode?: string;
  /** 需求建议名称 */
  name?: string;
}

/** RequisitionInfo */
export interface RequisitionInfo {
  /**
   * 是否周边产品 0-否 1-是
   * @format int32
   */
  isOutSide?: number;
  /** 市场大区 */
  marketRegion?: string;
  /**
   * 是否钉钉通知 0-否 1-是
   * @format int32
   */
  noticeFlag?: number;
  /** 领用场景0-市场 1-渠道 */
  requisitionScene?: string;
  /** 领用类型 */
  requisitionType?: string;
  /** 领用用途 */
  requisitionUse?: string;
  /** 领用人 */
  requisitioner?: string;
}

/** RetailPlanInventoryBean */
export interface RetailPlanInventoryBean {
  /**
   * 可用库存
   * @format int32
   */
  availableQuantity?: number;
  /**
   * 冻结库存
   * @format int32
   */
  frozenQuantity?: number;
  /**
   * 在库良品库存
   * @format int32
   */
  inStockGoodQuantity?: number;
  /**
   * 在库库存
   * @format int32
   */
  inStockQuantity?: number;
  /**
   * 在途库存
   * @format int32
   */
  inTransitQuantity?: number;
  /**
   * 计划库存
   * @format int32
   */
  planQuantity?: number;
  /**
   * 预留库存
   * @format int32
   */
  preAllocateQuantity?: number;
  /** 产品名称 */
  productName?: string;
  /** 产品SKU */
  skuCode?: string;
  /** 供应链SKU */
  supplySku?: string;
  /**
   * 不可售库存
   * @format int32
   */
  unsellableQuantity?: number;
  /** 仓库名称 */
  warehouse?: string;
}

/** RetailPlanInventoryPageResp */
export interface RetailPlanInventoryPageResp {
  code?: string;
  /**
   * 最后同步时间
   * @format date-time
   */
  lastSyncTime?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 计划库存记录列表 */
  recordList?: RetailPlanInventoryBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** RetailPlanInventoryQueryReq */
export interface RetailPlanInventoryQueryReq {
  asc?: boolean;
  /** 排序字段 */
  orderBy?:
    | 'availableQuantity'
    | 'frozenQuantity'
    | 'inStockGoodQuantity'
    | 'inStockQuantity'
    | 'inTransitQuantity'
    | 'planQuantity'
    | 'preAllocateQuantity'
    | 'unsellableQuantity';
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
  /** 产品名称 */
  productName?: string;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 产品SKU */
  skuCode?: string;
  /** 供应链SKU */
  supplySku?: string;
  /** 仓库代码列表 */
  warehouseCodeList?: string[];
}

/** RetailSalesForecastAuditDetailV2Resp */
export interface RetailSalesForecastAuditDetailV2Resp {
  /** 审核日志 */
  authLogList?: AuthLogBean[];
  /** 审核信息 */
  authNodeList?: AuthNodeBean[];
  /** 基本原因 */
  baseInfo?: RetailSalesForecastAuditDetailV2RespBaseInfo;
  /** 基本信息 */
  flowBaseInfo?: ErpFlowBean;
  /** 数据map列表 */
  itemList?: RetailSalesForecastListQueryV2RespItemBean[];
  /** 下一个审核节点 */
  nextAuthNode?: AuthNodeBean;
}

/** RetailSalesForecastAuditDetailV2RespBaseInfo */
export interface RetailSalesForecastAuditDetailV2RespBaseInfo {
  /** 备注 */
  auditRemark?: string;
  /** 审核结果 */
  auditResult?: string;
  /** 审核单号 */
  code?: string;
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
   * 部门
   * @format int64
   */
  deptId?: number;
  /** 部门名称 */
  deptName?: string;
  /** 异常原因 */
  errorRemark?: string;
  /** 审核不用过型号 */
  noPassModelList?: string[];
  /** 审核通过型号 */
  passModelList?: string[];
  /**
   * 状态: 0-待审核 1-审核通过 2-审核不通过 3-废弃 4-异常
   * @format int32
   */
  status?: number;
  /** 状态: 0-待审核 1-审核通过 2-审核不通过 3-废弃 4-异常 */
  statusDesc?: string;
}

/** RetailSalesForecastAuditHistoryQueryReq */
export interface RetailSalesForecastAuditHistoryQueryReq {
  /**
   * 结束时间
   * @format date-time
   */
  endTime?: string;
  /**
   * 行id
   * @format int64
   */
  id?: number;
  /** 快照单号 */
  keyword?: string;
  /**
   * 开始时间
   * @format date-time
   */
  startTime?: string;
}

/** RetailSalesForecastListQueryV2Req */
export interface RetailSalesForecastListQueryV2Req {
  /** 客户编码 */
  customerCodeList?: string[];
  /** 客户集合编码 */
  customerCollectCodeList?: string[];
  /** 关键字 */
  keyword?: string;
  /**
   * 关键字类型 1-商品SKU 4-商品名称
   * @format int32
   */
  keywordType?: number;
  /**
   * 预测状态:  0-正常 1-关闭 2-锁定
   * @format int32
   */
  neStatus?: number;
  /** 运营人 */
  operatorList?: string[];
  /**
   * 所属组织:  美洲大区/欧洲大区/中东非大区/亚太大区
   * @format int64
   */
  organizationDeptId?: number;
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
  /** 计划 */
  planerList?: string[];
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 销售状态:  1-在售 2-不在售  or  1-未上架 2-在销售 3-清仓中 4-已退市 */
  saleStatusList?: number[];
  /** 销售 */
  saler?: string;
  /** 预测状态:  0-正常 1-关闭 2-锁定 */
  statusList?: number[];
  /** 仓库编码 */
  warehouseCodeList?: string[];
}

/** RetailSalesForecastListQueryV2Resp */
export interface RetailSalesForecastListQueryV2Resp {
  /** 销售预测编码 */
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 数据map列表 */
  recordList?: RetailSalesForecastListQueryV2RespItemBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** RetailSalesForecastListQueryV2RespItemBean */
export interface RetailSalesForecastListQueryV2RespItemBean {
  /** 销售预测编码 */
  code?: string;
  /** 创建人 */
  creator?: string;
  /** 创建人 */
  creatorName?: string;
  /** 客户编码 */
  customerCode?: string;
  /** 客户名称 */
  customerDesc?: string;
  /**
   * 主键ID
   * @format int64
   */
  id?: number;
  /** 运营 */
  operator?: string;
  /** 运营 */
  operatorName?: string;
  /**
   * 所属组织
   * @format int64
   */
  organizationDeptId?: number;
  /** 所属组织 */
  organizationDeptIdDesc?: string;
  /** 计划人 */
  planner?: string;
  /** 计划人 */
  plannerName?: string;
  /** SKU名称 */
  productName?: string;
  /** 销售 */
  saler?: string;
  /** 销售 */
  salerName?: string;
  /** 库存水位列表 */
  salesForecastItemInventoryMonthBeanList?: OdsLuteSalesForecastItemInventoryMonthBean[];
  /** 销售预测列表 */
  salesForecastItemWeekBeanList?: OdsLuteSalesForecastItemWeekBean[];
  /** 销量列表 */
  salesList?: DictCommonBean[];
  /**
   * 销售状态状态 1-未上架 2-在销售 3-清仓中 4-已退市
   * @format int32
   */
  salesStatus?: number;
  /** 销售状态状态 1-未上架 2-在销售 3-清仓中 4-已退市 */
  salesStatusDesc?: string;
  /** SKU名称 */
  skuCode?: string;
  /**
   * 预测状态
   * @format int32
   */
  status?: number;
  /** 预测状态 */
  statusDesc?: string;
  /** 唯一编码 */
  uniqueCode?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /** 仓库编码 */
  warehouseCode?: string;
  /** 仓库名称 */
  warehouseDesc?: string;
}

/** RetailSalesForecastSaveSkuReq */
export interface RetailSalesForecastSaveSkuReq {
  /** 列表 */
  itemList: RetailSalesForecastSaveSkuReqItem[];
}

/** RetailSalesForecastSaveSkuReqItem */
export interface RetailSalesForecastSaveSkuReqItem {
  /** 客户编码 */
  customerCode?: string;
  /** 客户集合编码 */
  customerCollectCode?: string;
  customerCollectDesc?: string;
  customerDesc?: string;
  /** sku编码 */
  skuCode: string;
  /** 仓库编码 */
  warehouseCode: string;
  warehouseDesc?: string;
}

/** RetailSalesForecastUpdateSubmitReq */
export interface RetailSalesForecastUpdateSubmitReq {
  /** 销售预测编码 */
  code: string;
  /** 列表 */
  itemList: RetailSalesForecastUpdateSubmitReqSubmitItem[];
}

/** RetailSalesForecastUpdateSubmitReqSubmitItem */
export interface RetailSalesForecastUpdateSubmitReqSubmitItem {
  /**
   * 主键ID
   * @format int64
   */
  id: number;
  /** 库存水位列表 */
  salesForecastItemInventoryMonthBeanList?: OdsLuteSalesForecastItemInventoryMonthBean[];
  /** 预测列表 */
  weekBeanList: OdsLuteSalesForecastItemWeekBean[];
}

/** RetailSalesStatisticsReq */
export interface RetailSalesStatisticsReq {
  /** 客户编码 */
  customerCode?: string;
  /**
   * 结束时间
   * @format date-time
   */
  endTime?: string;
  /** 关键字 */
  keyword?: string;
  /**
   * 关键字类型 1-商品SKU 4-商品名称
   * @format int32
   */
  keywordType?: number;
  /** 运营人 */
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
  /** 仓库编码 */
  warehouseCode?: string;
}

/** RetailSalesStatisticsResp */
export interface RetailSalesStatisticsResp {
  code?: string;
  /** 表头列表 */
  headerList?: string[];
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 明细数据列表--下标定位 */
  rowList?: object[][];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** SaleClearSortReq */
export interface SaleClearSortReq {
  /**
   * 预测类型 1-按商品SKU预测 2-按在线商品预测
   * @format int32
   */
  type?: number;
}

/** SaleDeliveryNoticeAcceptBean */
export interface SaleDeliveryNoticeAcceptBean {
  /** 交货数量 */
  deliveryQuantity?: number;
  /** 交货情况（待确认、全部确认、部分拒绝、全部拒绝） */
  deliveryStatus?: string;
  /** 单据状态 */
  noticeStatus?: string;
  /**
   * 回复日期
   * @format date-time
   */
  replyDate?: string;
  /** 回复数量 */
  replyQuantity?: number;
  /** 来源单id */
  sourceId?: string;
  /** 供方备注 */
  supplierRemark?: string;
}

/** SaleDeliveryNoticeAcceptReq */
export interface SaleDeliveryNoticeAcceptReq {
  noticeStatus: string;
  saleDeliveryNoticeList?: SaleDeliveryNoticeAcceptBean[];
}

/** SaleForecastUploadReq */
export interface SaleForecastUploadReq {
  /** 上传地址名字 */
  fileName?: string;
  /** 绝对路径 */
  fileUrl?: string;
  /** 上传地址 */
  ossKey?: string;
  /**
   * 预测类型 1-按商品SKU预测 2-按在线商品预测
   * @format int32
   */
  type?: number;
}

/** SaleOutboundOrderBean */
export interface SaleOutboundOrderBean {
  /**
   * 妥投时间
   * @format date-time
   */
  deliveryTime?: string;
  /** 发货方式 */
  deliveryType?: string;
  /** 物流费用（USD） */
  fee?: number;
  /** 物流费原币种 */
  feeCurSrc?: string;
  /** 实际物流费用来源 */
  feeSourceActual?: string;
  /** 实际物流费用来源名称 */
  feeSourceActualName?: string;
  /** 预计物流费用来源 */
  feeSourceEstimate?: string;
  /**
   * 费用状态
   * @format int32
   */
  feeStatus?: number;
  /** 费用状态描述 */
  feeStatusDesc?: string;
  /**
   * 费用类型
   * @format int32
   */
  feeType?: number;
  /** 费用类型 */
  feeTypeDesc?: string;
  /** 仓库订单编码/订单ID */
  orderCode?: string;
  /** 订单类型 */
  orderType?: string;
  /** 平台 */
  platform?: string;
  /** 易仓参考号 */
  platformRefNo?: string;
  /** 易仓订单号 */
  refrenceNo?: string;
  /** 备注 */
  remark?: string;
  /** 平台销售单号 */
  saleOrderId?: string;
  /**
   * 仓库发货时间
   * @format date-time
   */
  shipTime?: string;
  /** 物流方式 */
  shippingMethod?: string;
  /** 物流方式编码 */
  shippingMethodNo?: string;
  /** 店铺 */
  shop?: string;
  /** 站点 */
  site?: string;
  /**
   * 订单状态 0:已废弃,1:付款未完成,2:待发货审核,3:待发货,4:已发货,5:冻结中,6:缺货,7:问题件,8:未付款（线下订单-》审核订单 中的状态 100：未审核 ，101：审核不通过，102：废弃订单
   * @format int32
   */
  status?: number;
  /** 订单状态描述 */
  statusDesc?: string;
}

/** SaleOutboundOrderDetailBean */
export interface SaleOutboundOrderDetailBean {
  /** 头程单价 */
  firstPrice?: number;
  /** 头程总价 */
  firstTotalPrice?: number;
  /** 仓库订单编码/订单ID */
  orderCode?: string;
  /** 平台SKU */
  platformSku?: string;
  /** 供应链SKU */
  productSku?: string;
  /**
   * 供应链SKU数量
   * @format int32
   */
  productSkuQty?: number;
  /** 采购单价 */
  purchasePrice?: number;
  /** 采购总价 */
  purchaseTotalPrice?: number;
  /** 商品SKU */
  skuCode?: string;
}

/** SaleOutboundOrderDetailReq */
export interface SaleOutboundOrderDetailReq {
  /** 订单ID */
  orderId?: string;
}

/** SaleOutboundOrderDetailResp */
export interface SaleOutboundOrderDetailResp {
  /** 详情数据 */
  detailList?: SaleOutboundOrderDetailBean[];
}

/** SaleOutboundOrderReq */
export interface SaleOutboundOrderReq {
  /** 发货方式 */
  deliveryType?: string;
  /** 订单号/参考单号 */
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
  /** 渠道 */
  platform?: string;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /**
   * 发货创建日期结束
   * @format date-time
   */
  shipTimeEnd?: string;
  /**
   * 发货日期开始
   * @format date-time
   */
  shipTimeStart?: string;
  /** 店铺 */
  shop?: string;
  /**
   * 订单状态 0:已废弃,1:付款未完成,2:待发货审核,3:待发货,4:已发货,5:冻结中,6:缺货,7:问题件,8:未付款（线下订单-》审核订单 中的状态 100：未审核 ，101：审核不通过，102：废弃订单
   * @format int32
   */
  status?: number;
}

/** SaleOutboundOrderResp */
export interface SaleOutboundOrderResp {
  code?: string;
  message?: string;
  /** 列表数据 */
  orderList?: SaleOutboundOrderBean[];
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

/** SalesForecastAllListQueryResp */
export interface SalesForecastAllListQueryResp {
  /** 销量预测code */
  code?: string;
}

/** SalesForecastAuditDetailV2Resp */
export interface SalesForecastAuditDetailV2Resp {
  /** 审核日志 */
  authLogList?: AuthLogBean[];
  /** 审核信息 */
  authNodeList?: AuthNodeBean[];
  /** 基本原因 */
  baseInfo?: BaseInfo;
  /** 基本信息 */
  flowBaseInfo?: ErpFlowBean;
  /** 分组数据 */
  groupItemBeanLinkedList?: SalesForecastAuditDetailV2RespGroupItemBean[];
  /** 当前部分审核通过的模型 */
  modelList?: string[];
  /** 下一个审核节点 */
  nextAuthNode?: AuthNodeBean;
}

/** SalesForecastAuditDetailV2RespGroupItemBean */
export interface SalesForecastAuditDetailV2RespGroupItemBean {
  /** 活动增量-固定三周(3列) */
  activeIncrList?: PsfaiShowWeekBean[];
  /** 近4周销量均值 */
  avg4ItemValue?: number;
  /** 八周预测均值 */
  avg4WeekSalesForcast?: number;
  /** 总量均值 */
  avgTotal?: number;
  /** 型号 */
  model?: string;
  /** 型号名称 */
  modelName?: string;
  /** 数据map列表 */
  recordList?: ItemBean[];
  /** 销售预测列表 */
  salesForecastItemWeekBeanList?: OdsLuteSalesForecastItemWeekBean[];
  /**
   * 预测总数量
   * @format int32
   */
  total?: number;
}

/** SalesForecastAuditHistoryQueryReq */
export interface SalesForecastAuditHistoryQueryReq {
  /** 渠道 */
  channel?: string;
  /** 站点 */
  country?: string;
  /**
   * 结束时间
   * @format date-time
   */
  endTime?: string;
  /** 预测审核单号 */
  keyword?: string;
  /** 在售sku编码 */
  onlineSkuCode: string;
  /**
   * 开始时间
   * @format date-time
   */
  startTime?: string;
  /** 预测类型 1-按商品SKU预测 2-按在线商品预测 */
  type?: string;
}

/** SalesForecastAuditHistoryQueryResp */
export interface SalesForecastAuditHistoryQueryResp {
  /** 审核历史列表 */
  auditHistoryList?: AuditHistoryItem[];
}

/** SalesForecastAuditQueryReq */
export interface SalesForecastAuditQueryReq {
  /** 渠道 */
  channel?: string;
  /** 站点 */
  country?: string;
  /** 创建人 */
  creator?: string;
  /** 部门 */
  deptId?: string;
  /**
   * 结束时间
   * @format date-time
   */
  endTime?: string;
  /** 预测单号 */
  keyword?: string;
  /** 待我审核 */
  meReview?: boolean;
  /** 唯一值查询 */
  onlineSkuCode?: string;
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
  sourceType?: string;
  /**
   * 开始时间
   * @format date-time
   */
  startTime?: string;
  /**
   * 状态: 0-待审核 1-审核通过 2-审核不通过 3-废弃 4-异常 5-部分审核通过
   * @format int32
   */
  status?: number;
  /**
   * 类型: 1-平台预测 2-零售预测
   * @format int32
   */
  type?: number;
}

/** SalesForecastAuditQueryResp */
export interface SalesForecastAuditQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  recordList?: SalesForecastAuditQueryRespItem[];
  /** 审核状态统计 */
  statusStatistics?: StatusStatistics;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** SalesForecastAuditQueryRespItem */
export interface SalesForecastAuditQueryRespItem {
  button?: Button;
  /** 审核单号 */
  code?: string;
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
   * 部门
   * @format int64
   */
  deptId?: number;
  /** 部门名称 */
  deptName?: string;
  /** 下载地址 */
  downloadUrl?: string;
  /**
   * 状态: 0-待审核 1-审核通过 2-审核不通过 3-废弃 4-异常
   * @format int32
   */
  status?: number;
  /** 状态: 0-待审核 1-审核通过 2-审核不通过 3-废弃 4-异常 */
  statusDesc?: string;
  /**
   * 1-电商渠道预测 2-零售渠道预测
   * @format int32
   */
  type?: number;
  /** 1-电商渠道预测 2-零售渠道预测 */
  typeDesc?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** SalesForecastListQueryResp */
export interface SalesForecastListQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  recordList?: SalesForecastListQueryRespItem[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** SalesForecastListQueryRespItem */
export interface SalesForecastListQueryRespItem {
  /** 五级分类名称 */
  categoryName?: string;
  /** 渠道 */
  channel?: string;
  /** 国家 */
  country?: string;
  /** 易仓SKU */
  ecSku?: string;
  /**
   * id
   * @format int64
   */
  id?: number;
  /** 运营人 */
  operator?: string;
  /** 原平台标识 */
  originalPlatformMark?: string;
  /** 计划 */
  planer?: string;
  /** 店铺SKU */
  platformSku?: string;
  /** 产品名称 */
  skuName?: string;
  /**
   * 状态 0-开启 1-停用
   * @format int32
   */
  status?: number;
  /** 状态 0-开启 1-停用 */
  statusDesc?: string;
  /** 详细周期 */
  weekBeanList?: OdsLuteSalesForecastItemWeekBean[];
}

/** SalesForecastListQueryV2Req */
export interface SalesForecastListQueryV2Req {
  /** 产品五级分类编码 */
  categoryCode?: string;
  /** 渠道 */
  channel?: string;
  /** 销售预测编码 */
  code?: string;
  /** 站点 */
  country?: string;
  /**
   * 下载排序 0-否 1-是
   * @format int32
   */
  downloadSort?: number;
  /** 在线商品编码/产品名称/商品SKU/SPU */
  keyword?: string;
  /** 关键字2 */
  keyword2?: string;
  /**
   * 关键字类型 1-商品SKU 2-渠道唯一标识 3-sellerSku 4-商品名称
   * @format int32
   */
  keyword2Type?: number;
  /** 型号 */
  modelCode?: string;
  /** 型号编码列表 */
  modelCodes?: string[];
  /**
   * 预测状态:  0-正常 1-关闭 2-锁定
   * @format int32
   */
  neStatus?: number;
  noMapping?: boolean;
  /** 运营人 */
  operator?: string;
  /** 运营人部门 */
  operatorDepts?: number[];
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
  /** 计划 */
  planer?: string;
  /** 产品线 */
  productLineCode?: string;
  /** 品线编码列表 */
  productLineCodes?: string[];
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 销售状态:  1-在售 2-不在售  or  1-未上架 2-在销售 3-清仓中 4-已退市 */
  saleStatusList?: number[];
  /** 店铺 */
  shop?: string;
  /** 店铺列表 */
  shops?: string[];
  /** SPU编码 */
  spuCode?: string;
  /** 预测状态:  0-正常 1-关闭 2-锁定 */
  statusList?: number[];
  /** 标签 */
  tag?: string;
  /** 标签编码列表 */
  tags?: string[];
  template?: boolean;
  /** 三级分类 */
  thirdCategoryCode?: string;
  /**
   * 预测类型 1-按商品SKU预测 2-按在线商品预测
   * @format int32
   */
  type?: number;
}

/** SalesForecastListQueryV2Resp */
export interface SalesForecastListQueryV2Resp {
  /** 销售预测编码 */
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 数据map列表 */
  recordList?: ItemBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** SalesForecastLogDetailQueryResp */
export interface SalesForecastLogDetailQueryResp {
  /** 销量预测code */
  code?: string;
  /**
   * 表头-因为表头动态所以要给这个字段
   * @uniqueItems true
   */
  colNameList?: string[];
  /** 当前周展示 */
  currentWeekShowDesc?: string;
  /** row集合 */
  rowList?: Record<string, string>[];
}

/** SalesForecastLogListQueryResp */
export interface SalesForecastLogListQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  recordList?: SalesForecastQueryRespItem[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** SalesForecastQueryRespItem */
export interface SalesForecastQueryRespItem {
  /** 销量预测code */
  code?: string;
  /**
   * 上传时间
   * @format date-time
   */
  createTime?: string;
  /** 上传人 */
  creator?: string;
  /** 上传失败原因文件 */
  failFileUrl?: string;
  /** 上传文件名称 */
  fileName?: string;
  /** 详情文件地址 */
  fileUrl?: string;
  /**
   * 上传状态：0-上传失败 1-处理中 2-上传成功
   * @format int32
   */
  status?: number;
  /** 上传状态：0-上传失败 1-处理中 2-上传成功 */
  statusDesc?: string;
}

/** SalesForecastSaveReq */
export interface SalesForecastSaveReq {
  /** 渠道 */
  channel: string;
  /** 站点 */
  country: string;
  /** 未映射 */
  noMapping?: boolean;
  /** 在售sku编码 */
  onlineSkuCode: string;
  /** sku编码 */
  skuCode: string;
  /**
   * 预测类型 1-按商品SKU预测 2-按在线商品预测
   * @format int32
   */
  type?: number;
}

/** SalesForecastSnapHistoryQueryReq */
export interface SalesForecastSnapHistoryQueryReq {
  /**
   * 结束时间
   * @format date-time
   */
  endTime?: string;
  /** 快照单号 */
  keyword?: string;
  /**
   * 开始时间
   * @format date-time
   */
  startTime?: string;
  /** 预测类型 1-按商品SKU预测 2-按在线商品预测 */
  type?: string;
}

/** SalesForecastSnapHistoryQueryResp */
export interface SalesForecastSnapHistoryQueryResp {
  itemList?: SalesForecastSnapHistoryQueryRespItem[];
}

/** SalesForecastSnapHistoryQueryRespItem */
export interface SalesForecastSnapHistoryQueryRespItem {
  /** 存档编号 */
  code?: string;
  /** 下载链接 */
  downUrl?: string;
  /**
   * 存档时间
   * @format date-time
   */
  snapTime?: string;
}

/** SalesForecastUpdateSubmitReq */
export interface SalesForecastUpdateSubmitReq {
  /** 销售预测编码 */
  code: string;
  /** 列表 */
  itemList: SubmitItem[];
  /**
   * 预测类型 1-按商品SKU预测 2-按在线商品预测
   * @format int32
   */
  type?: number;
}

/** SalesForecastWeekChangeStatusReq */
export interface SalesForecastWeekChangeStatusReq {
  /** 渠道 */
  channel: string;
  /** 站点 */
  country: string;
  /**
   * 主键id
   * @format int64
   */
  id?: number;
  /** 在售sku编码 */
  onlineSkuCode: string;
  /**
   * 状态 0-开启 1-停用
   * @format int32
   */
  status?: number;
}

/** SalesForecastWeekItemBean */
export interface SalesForecastWeekItemBean {
  /** @format int32 */
  afterSaleReplacementQty?: number;
  desc?: string;
  /** @format int32 */
  saleQty?: number;
  /** @format int32 */
  value?: number;
}

/** SalesForecastWeekSaveReq */
export interface SalesForecastWeekSaveReq {
  /** 详细周期 */
  weekBeanList?: OdsLuteSalesForecastItemWeekBean[];
}

/** SalesOrderStaticsResp */
export interface SalesOrderStaticsResp {
  code?: string;
  /** 表头列表 */
  headerList?: string[];
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 明细数据列表--下标定位 */
  rowList?: object[][];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** SalesOrderStatisticsReq */
export interface SalesOrderStatisticsReq {
  /** 是否缓存 */
  cache?: boolean;
  /** 渠道 */
  channel?: string;
  /** 国家 */
  countryCode?: string;
  /**
   * 结束时间
   * @format date-time
   */
  endTime?: string;
  /** 关键字:在线商品编码/产品名称/商品sku */
  keyword?: string;
  /** 运营人 */
  operatorCode?: string;
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
  /** 品线 */
  productLineCode?: string;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 店铺账号 */
  shopCode?: string;
  /** 站点 */
  site?: string;
  /**
   * 开始时间
   * @format date-time
   */
  startTime?: string;
}

/** SalesStatisticsReq */
export interface SalesStatisticsReq {
  /** 是否缓存 */
  cache?: boolean;
  /** 渠道 */
  channel?: string;
  /**
   * 结束时间
   * @format date-time
   */
  endTime?: string;
  /** 关键字:在线商品编码/产品名称/商品sku */
  keyword?: string;
  /** 运营人 */
  operatorCode?: string;
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
  /** 店铺账号 */
  shopCode?: string;
  /** 站点 */
  site?: string;
  /**
   * 开始时间
   * @format date-time
   */
  startTime?: string;
}

/** SalesStatisticsResp */
export interface SalesStatisticsResp {
  code?: string;
  /** 表头列表 */
  headerList?: string[];
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 明细数据列表--下标定位 */
  rowList?: object[][];
  /**
   * 总数
   * @format int64
   */
  total?: number;
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
  /** 客户类型 */
  customerType?: string;
  /** 客户类型 */
  customerTypeList?: string[];
  /** 异常备注 */
  errorRemark?: string;
  /** 自定义条件导出编码 */
  exportConditionCode?: string;
  /** 导出模板 default-默认导出模板 finance-财务导出模板 */
  exportTemplate?: string;
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
  /** 单选 1-订单号 2-参考单号 3-运单号 4-跟踪单号 */
  orderCode?: string;
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
   * 搜索类型 1-订单号 2-参考单号 3-运单号 4-跟踪单号
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
  /** 店铺 */
  shop?: string;
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
  /** 商品SKU */
  skuCode?: string;
  /** 商品sku/供应链sku */
  skuKey?: string;
  /** 批量商品sku/供应链sku */
  skuKeys?: string[];
  /** 订单状态 */
  statusList?: number[];
  /** 供应链SKU */
  supplySku?: string;
  /**
   * 类型：0-红人发样单 1-线下订单 2-TT订单
   * @format int32
   */
  type?: number;
  /** 发货仓库 */
  warehouseCode?: string;
}

/** SaveBaseIno */
export interface SaveBaseIno {
  /**
   * 提货时间
   * @format date-time
   */
  pickTime?: string;
  /**
   * 提货方式: 0-中仓自提 1-物流提货
   * @format int32
   */
  pickType?: number;
  /** 提货仓库 */
  pickWarehouseCode?: string;
}

/** SaveItem */
export interface SaveItem {
  /**
   * 提货量
   * @format int32
   */
  pickQty?: number;
  /** 关联发货指令编号 */
  shipCommandCodeList?: string[];
  /** 商品SKUcode */
  skuCode?: string;
  /** 供应链SKU */
  supplySku?: string;
}

/** SaveItemBean */
export interface SaveItemBean {
  /** 币种 */
  currencyCode?: string;
  /** 报价最大值 */
  postalPriceMax?: number;
  /** 报价最小值 */
  postalPriceMin?: number;
  /** 产品编码 */
  skuCode?: string;
}

/** SaveItemInfo */
export interface SaveItemInfo {
  /** @format int64 */
  id: number;
  /** 收货数 */
  purchaseInfoList?: SaveItemPurchaseInfo[];
  /**
   * 收货箱数
   * @format int32
   */
  receiveBoxQty?: number;
  /** 供应链SKU */
  supplySku?: string;
}

/** SaveItemPurchaseInfo */
export interface SaveItemPurchaseInfo {
  /** @format int64 */
  id: number;
  /** 采购单号 */
  poCode?: string;
  /**
   * 收货数量
   * @format int32
   * @min 1
   * @exclusiveMin false
   */
  receiveQty?: number;
}

/** ScanCodeBean */
export interface ScanCodeBean {
  /** 扫描 */
  key?: string;
  /**
   * 扫描时间
   * @format date-time
   */
  scanTime?: string;
}

/** ScanRecordBean */
export interface ScanRecordBean {
  /** 箱码 */
  boxCode?: string;
  /** 创建人编码 */
  creator?: string;
  /** 创建人名称 */
  creatorName?: string;
  /**
   * 扫描时间
   * @format date-time
   */
  scanTime?: string;
}

/** ShipAddressBean */
export interface ShipAddressBean {
  /** 收件人 */
  address?: string;
  /** 公司 */
  company?: string;
  /** 联系人 */
  name?: string;
  /** 发件人/收件人 */
  sendTor?: string;
  /** 电话 */
  tel?: string;
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

/** ShipFromInfo */
export interface ShipFromInfo {
  /** 送货地址 */
  shipFromAddress?: string;
  /** 送货公司名称 */
  shipFromCompany?: string;
  /** 送货-联系人 */
  shipFromCotacter?: string;
  /** 送货-联系方式 */
  shipFromPhone?: string;
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

/** ShipToInfo */
export interface ShipToInfo {
  /** 收货地址 */
  shipToAddress?: string;
  /** 收货公司名称 */
  shipToCompany?: string;
  /** 联系人 */
  shipToCotacter?: string;
  /** 联系方式 */
  shipToPhone?: string;
}

/** ShippingInfo */
export interface ShippingInfo {
  /**
   * 实际发货数量
   * @format int32
   */
  actualShipQty?: number;
  /**
   * 到货时间
   * @format date-time
   */
  arriveDate?: string;
  /** 目的仓代码 */
  destinationCode?: string;
  /**
   * 是否贴透明计划标签 0-否 1-是
   * @format int32
   */
  isTransport?: number;
  /** 是否贴透明计划标签 0-否 1-是 */
  isTransportDesc?: string;
  /** 物流方式 */
  logisticMethod?: string;
  /** 物流方式-Desc */
  logisticMethodDesc?: string;
  /** 配送地址/收货人信息 */
  shipAddress?: string;
  /** 货件单号 */
  shippingCode?: string;
  /** sku种类详情 */
  shippingInfoItemList?: ShippingInfoItem[];
  /** 货件计划单号 */
  shippingPlanCode?: string;
  /** 跳转链接 */
  shippingPlanCodeJumpUrl?: string;
  /**
   * sku种类
   * @format int32
   */
  skuTypeCount?: number;
  /** 货件追踪编号 */
  trackingCode?: string;
}

/** ShippingInfoItem */
export interface ShippingInfoItem {
  /**
   * 差异量
   * @format int32
   */
  differenceQty?: number;
  /** 海外仓产品代码/FNSKU */
  productBarcode?: string;
  /**
   * 已收量
   * @format int32
   */
  receivedQty?: number;
  /**
   * 发货量
   * @format int32
   */
  sendQty?: number;
  /** 供应链SKU */
  supplySku?: string;
}

/** ShippingMethodListQueryReq */
export interface ShippingMethodListQueryReq {
  /** 关键字 配送方式代码/配送方式名称/API服务商代码 */
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
  /** 承运商 */
  spCode?: string;
  /** 仓库编码 */
  warehouseCode?: string;
}

/** ShippingMethodListQueryResp */
export interface ShippingMethodListQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  recordList?: CartonSizeListQueryRespItemItem[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** ShippingMethodSaveReq */
export interface ShippingMethodSaveReq {
  /** 扩展信息列表 */
  extInfoList?: ErpOrderShippingExtInfoBean[];
  /**
   * id
   * @format int64
   */
  id?: number;
  /**
   * 订单类型: 0-红人发样单 1-线下订单 2-TT订单
   * @format int32
   */
  orderType?: number;
}

/** ShippingTypeBean */
export interface ShippingTypeBean {
  /** 运输方式 */
  transportType?: string;
  /** 运输方式 */
  transportTypeDesc?: string;
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

/** ShopifyAttributeRpcReq */
export interface ShopifyAttributeRpcReq {
  name?: string;
  value?: string;
}

/** ShopifyClientReq */
export interface ShopifyClientReq {
  accept_language?: string;
  /** @format int32 */
  browser_height?: number;
  browser_ip?: string;
  /** @format int32 */
  browser_width?: number;
  session_hash?: string;
  user_agent?: string;
}

/** ShopifyDefaultAddressBean */
export interface ShopifyDefaultAddressBean {
  address1?: string;
  address2?: string;
  city?: string;
  company?: string;
  country?: string;
  country_code?: string;
  country_name?: string;
  /** @format int64 */
  customer_id?: number;
  default?: boolean;
  first_name?: string;
  /** @format int64 */
  id?: number;
  last_name?: string;
  name?: string;
  phone?: string;
  province?: string;
  province_code?: string;
  zip?: string;
}

/** ShopifyMarketingConsentReq */
export interface ShopifyMarketingConsentReq {
  consent_collected_from?: string;
  consent_updated_at?: string;
  opt_in_level?: string;
  state?: string;
}

/** ShopifyMoneyReq */
export interface ShopifyMoneyReq {
  amount?: number;
  currency_code?: string;
}

/** ShopifyOrderAddressReq */
export interface ShopifyOrderAddressReq {
  address1?: string;
  address2?: string;
  city?: string;
  company?: string;
  country?: string;
  country_code?: string;
  create_at?: string;
  first_name?: string;
  last_name?: string;
  latitude?: number;
  longitude?: number;
  name?: string;
  phone?: string;
  province?: string;
  province_code?: string;
  zip?: string;
}

/** ShopifyOrderAdjustmentReq */
export interface ShopifyOrderAdjustmentReq {
  amount?: number;
  amount_set?: ShopifyPriceSetReq;
  /** @format int64 */
  id?: number;
  kind?: string;
  /** @format int64 */
  order_id?: number;
  reason?: string;
  /** @format int64 */
  refund_id?: number;
  tax_amount?: number;
  tax_amount_set?: ShopifyPriceSetReq;
}

/** ShopifyOrderCustomerReq */
export interface ShopifyOrderCustomerReq {
  accepts_marketing?: boolean;
  accepts_marketing_updated_at?: string;
  admin_graphql_api_id?: string;
  created_at?: string;
  currency?: string;
  default_address?: ShopifyDefaultAddressBean;
  email?: string;
  email_marketing_consent?: ShopifyMarketingConsentReq;
  first_name?: string;
  /** @format int64 */
  id?: number;
  last_name?: string;
  marketing_opt_in_level?: string;
  multipass_identifier?: string;
  note?: string;
  phone?: string;
  sms_marketing_consent?: ShopifyMarketingConsentReq;
  state?: string;
  tags?: string;
  tax_exempt?: boolean;
  tax_exemptions?: object[];
  updated_at?: string;
  verified_email?: boolean;
}

/** ShopifyOrderDiscountAllocationReq */
export interface ShopifyOrderDiscountAllocationReq {
  amount?: number;
  amount_set?: ShopifyPriceSetReq;
  /** @format int32 */
  discount_application_index?: number;
}

/** ShopifyOrderDiscountApplicationReq */
export interface ShopifyOrderDiscountApplicationReq {
  allocation_method?: string;
  code?: string;
  target_selection?: string;
  target_type?: string;
  type?: string;
  value?: number;
  value_type?: string;
}

/** ShopifyOrderDiscountReq */
export interface ShopifyOrderDiscountReq {
  amount?: number;
  code?: string;
  type?: string;
}

/** ShopifyOrderDutyReq */
export interface ShopifyOrderDutyReq {
  amount_set?: ShopifyPriceSetReq;
  /** @format int64 */
  duty_id?: number;
}

/** ShopifyOrderFulfillmentLineItemReq */
export interface ShopifyOrderFulfillmentLineItemReq {
  admin_graphql_api_id?: string;
  discount_allocations?: ShopifyOrderDiscountAllocationReq[];
  duties?: object[];
  /** @format int32 */
  fulfillable_quantity?: number;
  fulfillment_service?: string;
  fulfillment_status?: string;
  gift_card?: boolean;
  /** @format int32 */
  grams?: number;
  /** @format int64 */
  id?: number;
  name?: string;
  price?: number;
  price_set?: ShopifyPriceSetReq;
  product_exists?: boolean;
  /** @format int64 */
  product_id?: number;
  properties?: ShopifyAttributeRpcReq[];
  /** @format int32 */
  quantity?: number;
  requires_shipping?: boolean;
  sku?: string;
  tax_lines?: ShopifyOrderTaxLineReq[];
  taxable?: boolean;
  title?: string;
  total_discount?: number;
  total_discount_set?: ShopifyPriceSetReq;
  /** @format int64 */
  variant_id?: number;
  variant_inventory_management?: string;
  variant_title?: string;
  vendor?: string;
}

/** ShopifyOrderFulfillmentReceiptReq */
export interface ShopifyOrderFulfillmentReceiptReq {
  authorization?: string;
  testcase?: boolean;
}

/** ShopifyOrderFulfillmentReq */
export interface ShopifyOrderFulfillmentReq {
  admin_graphql_api_id?: string;
  created_at?: string;
  /** @format int64 */
  id?: number;
  line_items?: ShopifyOrderFulfillmentLineItemReq[];
  /** @format int64 */
  location_id?: number;
  name?: string;
  /** @format int64 */
  order_id?: number;
  origin_address?: ShopifyOrderAddressReq;
  receipt?: ShopifyOrderFulfillmentReceiptReq;
  service?: string;
  shipment_status?: string;
  status?: string;
  tracking_company?: string;
  tracking_number?: string;
  tracking_numbers?: string[];
  tracking_url?: string;
  tracking_urls?: string[];
  updated_at?: string;
}

/** ShopifyOrderItemReq */
export interface ShopifyOrderItemReq {
  admin_graphql_api_id?: string;
  discount_allocations?: ShopifyOrderDiscountAllocationReq[];
  duties?: string[];
  /** @format int32 */
  fulfillable_quantity?: number;
  fulfillment_service?: string;
  fulfillment_status?: string;
  gift_card?: boolean;
  /** @format int32 */
  grams?: number;
  /** @format int64 */
  id?: number;
  name?: string;
  pre_tax_price?: number;
  pre_tax_price_set?: ShopifyPriceSetReq;
  price?: number;
  price_set?: ShopifyPriceSetReq;
  product_exists?: boolean;
  /** @format int64 */
  product_id?: number;
  properties?: string[];
  /** @format int32 */
  quantity?: number;
  requires_shipping?: boolean;
  sku?: string;
  tax_lines?: ShopifyOrderTaxLineReq[];
  taxable?: boolean;
  title?: string;
  total_discount?: number;
  total_discount_set?: ShopifyPriceSetReq;
  /** @format int64 */
  variant_id?: number;
  variant_inventory_management?: string;
  variant_title?: string;
  vendor?: string;
}

/** ShopifyOrderPaymentDetailReq */
export interface ShopifyOrderPaymentDetailReq {
  avs_result_code?: string;
  buyer_action_info?: object;
  credit_card_bin?: string;
  credit_card_company?: string;
  /** @format int32 */
  credit_card_expiration_month?: number;
  /** @format int32 */
  credit_card_expiration_year?: number;
  credit_card_name?: string;
  credit_card_number?: string;
  credit_card_wallet?: string;
  cvv_result_code?: string;
}

/** ShopifyOrderPaymentScheduleReq */
export interface ShopifyOrderPaymentScheduleReq {
  amount?: number;
  completed_at?: string;
  currency?: string;
  due_at?: string;
  expected_payment_method?: string;
  issued_at?: string;
}

/** ShopifyOrderPaymentTermReq */
export interface ShopifyOrderPaymentTermReq {
  amount?: number;
  currency?: string;
  /** @format int32 */
  due_in_days?: number;
  payment_schedules?: ShopifyOrderPaymentScheduleReq[];
  payment_terms_name?: string;
  payment_terms_type?: string;
}

/** ShopifyOrderRefundAttrReq */
export interface ShopifyOrderRefundAttrReq {
  acquirer_reference_number?: string;
  status?: string;
}

/** ShopifyOrderRefundItemReq */
export interface ShopifyOrderRefundItemReq {
  /** @format int64 */
  id?: number;
  line_item?: ShopifyOrderRefundLineItemReq;
  /** @format int64 */
  line_item_id?: number;
  /** @format int64 */
  location_id?: number;
  /** @format int32 */
  quantity?: number;
  restock_type?: string;
  subtotal?: number;
  subtotal_set?: ShopifyPriceSetReq;
  total_tax?: number;
  total_tax_set?: ShopifyPriceSetReq;
}

/** ShopifyOrderRefundLineItemReq */
export interface ShopifyOrderRefundLineItemReq {
  admin_graphql_api_id?: string;
  discount_allocations?: DiscountAllocation[];
  duties?: object[];
  /** @format int32 */
  fulfillable_quantity?: number;
  fulfillment_service?: string;
  fulfillment_status?: string;
  gift_card?: boolean;
  /** @format int32 */
  grams?: number;
  /** @format int32 */
  id?: number;
  name?: string;
  price?: number;
  price_set?: PriceSet;
  product_exists?: boolean;
  /** @format int32 */
  product_id?: number;
  properties?: object[];
  /** @format int32 */
  quantity?: number;
  requires_shipping?: boolean;
  sku?: string;
  tax_lines?: TaxLine[];
  taxable?: boolean;
  title?: string;
  total_discount?: number;
  total_discount_set?: PriceSet;
  /** @format int32 */
  variant_id?: number;
  variant_inventory_management?: string;
  variant_title?: string;
  vendor?: string;
}

/** ShopifyOrderRefundReq */
export interface ShopifyOrderRefundReq {
  admin_graphql_api_id?: string;
  created_at?: string;
  duties?: ShopifyOrderDutyReq[];
  /** @format int64 */
  id?: number;
  note?: string;
  order_adjustments?: ShopifyOrderAdjustmentReq[];
  /** @format int64 */
  order_id?: number;
  processed_at?: string;
  refund_line_items?: ShopifyOrderRefundItemReq[];
  restock?: boolean;
  return?: string;
  total_duties_set?: ShopifyPriceSetReq;
  transactions?: ShopifyOrderRefundTransReq[];
  /** @format int64 */
  user_id?: number;
}

/** ShopifyOrderRefundTransReceiptReq */
export interface ShopifyOrderRefundTransReceiptReq {
  amount?: number;
  balance_transaction?: BalanceTransactionBean;
  /** @format int64 */
  created?: number;
  currency?: string;
  id?: string;
  metadata?: Record<string, string>;
  mit_params?: Record<string, string>;
  object?: string;
  payment_method_details?: Record<string, object>;
  reason?: string;
  status?: string;
}

/** ShopifyOrderRefundTransReq */
export interface ShopifyOrderRefundTransReq {
  admin_graphql_api_id?: string;
  amount?: number;
  authorization?: string;
  created_at?: string;
  currency?: string;
  device_id?: string;
  error_code?: string;
  gateway?: string;
  /** @format int64 */
  id?: number;
  kind?: string;
  /** @format int64 */
  location_id?: number;
  message?: string;
  /** @format int64 */
  order_id?: number;
  /** @format int64 */
  parent_id?: number;
  payment_details?: ShopifyOrderPaymentDetailReq;
  payment_id?: string;
  payments_refund_attributes?: ShopifyOrderRefundAttrReq;
  processed_at?: string;
  receipt?: ShopifyOrderRefundTransReceiptReq;
  source_name?: string;
  status?: string;
  test?: boolean;
  total_unsettled_set?: ShopifyPriceSetReq;
  /** @format int64 */
  user_id?: number;
}

/** ShopifyOrderReq */
export interface ShopifyOrderReq {
  admin_graphql_api_id?: string;
  /** @format int64 */
  app_id?: number;
  billing_address?: ShopifyOrderAddressReq;
  browser_ip?: string;
  buyer_accepts_marketing?: boolean;
  cancel_reason?: string;
  cancelled_at?: string;
  cart_token?: string;
  /** @format int64 */
  checkout_id?: number;
  checkout_token?: string;
  client_details?: ShopifyClientReq;
  closed_at?: string;
  company?: string;
  confirmation_number?: string;
  confirmed?: boolean;
  contact_email?: string;
  created_at?: string;
  currency?: string;
  current_subtotal_price?: number;
  current_subtotal_price_set?: ShopifyPriceSetReq;
  current_total_additional_fees_set?: ShopifyPriceSetReq;
  current_total_discounts?: number;
  current_total_discounts_set?: ShopifyPriceSetReq;
  current_total_duties_set?: ShopifyPriceSetReq;
  current_total_price?: number;
  current_total_price_set?: ShopifyPriceSetReq;
  current_total_tax?: number;
  current_total_tax_set?: ShopifyPriceSetReq;
  customer?: ShopifyOrderCustomerReq;
  customer_locale?: string;
  device_id?: string;
  discount_applications?: ShopifyOrderDiscountApplicationReq[];
  discount_codes?: ShopifyOrderDiscountReq[];
  email?: string;
  estimated_taxes?: boolean;
  financial_status?: string;
  fulfillment_status?: string;
  fulfillments?: ShopifyOrderFulfillmentReq[];
  /** @format int64 */
  id?: number;
  landing_site?: string;
  landing_site_ref?: string;
  line_items?: ShopifyOrderItemReq[];
  location_id?: string;
  merchant_of_record_app_id?: string;
  name?: string;
  note?: string;
  note_attributes?: ShopifyAttributeRpcReq[];
  /** @format int32 */
  number?: number;
  /** @format int64 */
  order_number?: number;
  order_status_url?: string;
  /** 原始请求体 */
  originalBody?: string;
  original_total_additional_fees_set?: ShopifyPriceSetReq;
  original_total_duties_set?: ShopifyPriceSetReq;
  payment_gateway_names?: string[];
  payment_terms?: ShopifyOrderPaymentTermReq;
  phone?: string;
  po_number?: string;
  presentment_currency?: string;
  processed_at?: string;
  reference?: string;
  referring_site?: string;
  refunds?: ShopifyOrderRefundReq[];
  shipping_address?: ShopifyOrderAddressReq;
  shipping_lines?: ShopifyOrderShippingLineReq[];
  shop?: string;
  source_identifier?: string;
  source_name?: string;
  source_url?: string;
  subtotal_price?: number;
  subtotal_price_set?: ShopifyPriceSetReq;
  tags?: string;
  tax_exempt?: boolean;
  tax_lines?: ShopifyOrderTaxLineReq[];
  taxes_included?: boolean;
  test?: boolean;
  token?: string;
  total_discounts?: number;
  total_discounts_set?: ShopifyPriceSetReq;
  total_line_items_price?: number;
  total_line_items_price_set?: ShopifyPriceSetReq;
  total_outstanding?: number;
  total_price?: number;
  total_price_set?: ShopifyPriceSetReq;
  total_shipping_price_set?: ShopifyPriceSetReq;
  total_tax?: number;
  total_tax_set?: ShopifyPriceSetReq;
  total_tip_received?: number;
  total_weight?: number;
  updated_at?: string;
  /** @format int64 */
  user_id?: number;
}

/** ShopifyOrderShippingLineReq */
export interface ShopifyOrderShippingLineReq {
  carrier_identifier?: string;
  code?: string;
  discount_allocations?: ShopifyOrderDiscountAllocationReq[];
  discounted_price?: string;
  discounted_price_set?: ShopifyPriceSetReq;
  /** @format int64 */
  id?: number;
  phone?: string;
  price?: string;
  price_set?: ShopifyPriceSetReq;
  /** @format int64 */
  requested_fulfillment_service_id?: number;
  source?: string;
  tax_lines?: ShopifyOrderTaxLineReq[];
  title?: string;
}

/** ShopifyOrderTaxLineReq */
export interface ShopifyOrderTaxLineReq {
  channel_liable?: boolean;
  price?: number;
  price_set?: ShopifyPriceSetReq;
  rate?: number;
  title?: string;
}

/** ShopifyPlanInventoryBean */
export interface ShopifyPlanInventoryBean {
  /**
   * 可用库存
   * @format int32
   */
  availableQuantity?: number;
  /** 品牌代码 */
  brandCode?: string;
  /** 国家代码 */
  countryCode?: string;
  /**
   * 冻结库存
   * @format int32
   */
  frozenQuantity?: number;
  /**
   * 在库良品库存
   * @format int32
   */
  inStockGoodQuantity?: number;
  /**
   * 在库库存
   * @format int32
   */
  inStockQuantity?: number;
  /**
   * 在途库存
   * @format int32
   */
  inTransitQuantity?: number;
  /**
   * 计划库存
   * @format int32
   */
  planQuantity?: number;
  /**
   * 预留库存
   * @format int32
   */
  preAllocateQuantity?: number;
  /** 品类 */
  productCategory?: string;
  /** 品线 */
  productLine?: string;
  /** 产品名称 */
  productName?: string;
  /** 运营 */
  productOperatorName?: string;
  /** 站点 */
  site?: string;
  /** 产品SKU */
  skuCode?: string;
  /** 供应链SKU */
  supplySku?: string;
  /**
   * 不可售库存
   * @format int32
   */
  unsellableQuantity?: number;
  /** 仓库名称 */
  warehouse?: string;
}

/** ShopifyPlanInventoryPageResp */
export interface ShopifyPlanInventoryPageResp {
  code?: string;
  /**
   * 最后同步时间
   * @format date-time
   */
  lastSyncTime?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 计划库存记录列表 */
  recordList?: ShopifyPlanInventoryBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** ShopifyPlanInventoryQueryReq */
export interface ShopifyPlanInventoryQueryReq {
  asc?: boolean;
  /** 排序字段 */
  orderBy?:
    | 'availableQuantity'
    | 'frozenQuantity'
    | 'inStockGoodQuantity'
    | 'inStockQuantity'
    | 'inTransitQuantity'
    | 'planQuantity'
    | 'preAllocateQuantity'
    | 'unsellableQuantity';
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
  /** 分类 */
  productCategoryList?: string[];
  /** 品线 */
  productLineList?: string[];
  /** 产品名称 */
  productName?: string;
  /** 运营 */
  productOperatorList?: string[];
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 站点 */
  site?: string;
  /** 站点列表 */
  sites?: string[];
  /** 产品SKU */
  skuCode?: string;
  /** 供应链SKU */
  supplySku?: string;
  /** 仓库代码列表 */
  warehouseCodeList?: string[];
}

/** ShopifyPriceSetReq */
export interface ShopifyPriceSetReq {
  presentment_money?: ShopifyMoneyReq;
  shop_money?: ShopifyMoneyReq;
}

/** SkuDescBean */
export interface SkuDescBean {
  /** 产品名称 */
  productName?: string;
  /**
   * 数量
   * @format int32
   */
  qty?: number;
  /** 配送方式编码 */
  shippingCode?: string;
  /** 配送方式名称 */
  shippingDesc?: string;
  /** sku编码 */
  sku?: string;
  /** sku展示名称 */
  skuShowDesc?: string;
}

/** SkuDetailSaveBean */
export interface SkuDetailSaveBean {
  /** fbaId号 */
  fbaId?: string;
  /**
   * 已上传数量
   * @format int32
   */
  oldUploadQty?: number;
  /** sku */
  sku?: string;
  /**
   * 总数量
   * @format int32
   */
  totalQty?: number;
  /**
   * 新上传数量
   * @format int32
   */
  uploadQty?: number;
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

/** SkuShopAsinItem */
export interface SkuShopAsinItem {
  /** asin */
  asin?: string;
  /** 店铺sku */
  sellerSkuList?: string[];
}

/** SkuShopItem */
export interface SkuShopItem {
  /** 店铺asin */
  asin?: SkuShopAsinItem[];
  /** 店铺 */
  shop?: string;
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

/** SmWarehouseParamBean */
export interface SmWarehouseParamBean {
  /** 绑定国家列表 */
  countryList?: DictCommonBean[];
  /** 是否正在刷新 */
  refreshing?: boolean;
  /**
   * 序号
   * @format int32
   */
  rowNum?: number;
  /** 配送方式代码 */
  smCode?: string;
  /** 配送方式名称 */
  smName?: string;
  /**
   * 状态，0：停用，1：可用
   * @format int32
   */
  smStatus?: number;
  /** 状态，0：停用，1：可用 */
  smStatusDesc?: string;
  /**
   * 时效最大值
   * @format int32
   */
  timelinessMax?: number;
  /**
   * 时效最小值
   * @format int32
   */
  timelinessMin?: number;
  /** 绑定仓库列表 */
  warehouseList?: DictCommonBean[];
}

/** SmwpUpdateReq */
export interface SmwpUpdateReq {
  /** 绑定国家列表 */
  countryList?: DictCommonBean[];
  /** 配送方式代码 */
  smCode?: string;
  /**
   * 时效最大值
   * @format int32
   */
  timelinessMax?: number;
  /**
   * 时效最小值
   * @format int32
   */
  timelinessMin?: number;
  /** 绑定仓库列表 */
  warehouseList?: DictCommonBean[];
}

/** SourceOrderBean */
export interface SourceOrderBean {
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人编码 */
  creator?: string;
  /** 创建人名称 */
  creatorName?: string;
  /** 客户名称 */
  customerName?: string;
  /**
   * 订单ID
   * @format int64
   */
  id?: number;
  /**
   * 物流审核时间
   * @format date-time
   */
  logisticsAuditTime?: string;
  /** 订单号 */
  orderCode?: string;
  /** 参考单号 */
  referenceCode?: string;
  /** sku*数量和仓库配送的list */
  skuDescList?: SkuDescBean[];
  /** 仓库编码 */
  warehouseCode?: string;
  /** 仓库名称 */
  warehouseDesc?: string;
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

/** SpListQueryReq */
export interface SpListQueryReq {
  /** 关键字 配送方式代码/配送方式/API服务商代码 */
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
   */
  pageSize: number;
  /**
   * 状态，0：停用，1：可用
   * @format int32
   */
  smStatus?: number;
  /** 承运商 */
  spCode?: string;
  /** 仓库编码 */
  warehouseCode?: string;
}

/** SpListQueryResp */
export interface SpListQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  recordList?: SpListQueryRespItem[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** SpListQueryRespItem */
export interface SpListQueryRespItem {
  /**
   * id
   * @format int64
   */
  id?: number;
  /** 配送信息 */
  smWarehouseParamBeanList?: SmWarehouseParamBean[];
  /** 承运商编码 */
  spCode?: string;
  /** 承运商名称 */
  spName?: string;
}

/** SpSkuConfigQueryReq */
export interface SpSkuConfigQueryReq {
  /** 商品sku/供应链sku/产品名称 */
  keyword?: string;
  /** 物流方式 */
  logisticMethod?: string;
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
  plannerCode?: string;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
}

/** SpSkuConfigQueryResp */
export interface SpSkuConfigQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 记录列表 */
  recordList?: Item[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** SpSkuConfigSaveReq */
export interface SpSkuConfigSaveReq {
  /** 物流方式 */
  logisticMethod: string;
  /** 计划 */
  plannerCode?: string;
  /**
   * 整箱数量
   * @format int32
   */
  qtyBox?: number;
  /** 商品sku */
  skuCode: string;
}

/** SrmSyncKingdeeReq */
export interface SrmSyncKingdeeReq {
  /** 单号,多个单号逗号隔开 */
  code: string;
  /**
   * 订单类型 1-付款申请单 2-库存对账单
   * @format int32
   */
  orderType: number;
}

/** StatisticsInfo */
export interface StatisticsInfo {
  /**
   * 全部
   * @format int32
   */
  all?: number;
  /**
   * 已收货
   * @format int32
   */
  received?: number;
  /**
   * 待发货
   * @format int32
   */
  waitReceived?: number;
}

/** StatusBeanStatistics */
export interface StatusBeanStatistics {
  /**
   * 作废
   * @format int32
   */
  abandonCount?: number;
  /**
   * 全部
   * @format int32
   */
  allCount?: number;
  /**
   * 已完成
   * @format int32
   */
  completeCount?: number;
  /**
   * 异常
   * @format int32
   */
  errorCount?: number;
  /**
   * 审核中
   * @format int32
   */
  waitAuthCount?: number;
  /**
   * 待确认
   * @format int32
   */
  waitConfirmCount?: number;
  /**
   * 待调拨
   * @format int32
   */
  waitTransferCount?: number;
}

/** StatusStatistics */
export interface StatusStatistics {
  /**
   * 全部
   * @format int32
   */
  all?: number;
  /**
   * 审核通过
   * @format int32
   */
  approved?: number;
  /**
   * 审核失败
   * @format int32
   */
  rejected?: number;
  /**
   * 待注册
   * @format int32
   */
  waitInvite?: number;
  /**
   * 待审核
   * @format int32
   */
  waitRegistered?: number;
}

/** StockingTimeBean */
export interface StockingTimeBean {
  /** 渠道 */
  channel?: string;
  /** 物流方式code */
  code?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creatorName?: string;
  /**
   * id
   * @format int64
   */
  id?: number;
  /**
   * 物流方式id
   * @format int32
   */
  logisticsTransportId?: number;
  /** 物流方式名称 */
  name?: string;
  /**
   * 状态
   * @format int32
   */
  status?: number;
  /** 状态描述 */
  statusDesc?: string;
  /** 备货站点 */
  stockSite?: string;
  /** 备货时效 */
  stockTime?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** StockingTimeDetailsQueryReq */
export interface StockingTimeDetailsQueryReq {
  /**
   * id
   * @format int64
   */
  id?: number;
}

/** StockingTimeDetailsQueryResp */
export interface StockingTimeDetailsQueryResp {
  /** 渠道 */
  channel?: string;
  /** 物流方式code */
  code?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creatorName?: string;
  /**
   * id
   * @format int64
   */
  id?: number;
  /**
   * 物流方式id
   * @format int32
   */
  logisticsTransportId?: number;
  /** 物流方式名称 */
  name?: string;
  /** 旺季时间 */
  peakSeasonTime?: PeakSeasonTimeBean[];
  /**
   * 状态
   * @format int32
   */
  status?: number;
  /** 状态描述 */
  statusDesc?: string;
  /** 备货站点 */
  stockSite?: string;
  /** 备货时效 */
  stockTime?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** StockingTimeListQueryReq */
export interface StockingTimeListQueryReq {
  /** 渠道 */
  channel?: string;
  /** 物流方式 */
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
  /**
   * 状态
   * @format int32
   */
  status?: number;
  /** 备货站点 */
  stockSite?: string;
}

/** StockingTimeListQueryResp */
export interface StockingTimeListQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 备货时效列表 */
  stockingTimeList?: StockingTimeBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** StockingTimeSaveReq */
export interface StockingTimeSaveReq {
  /** 渠道 */
  channel?: string;
  /** 创建人 */
  creator?: string;
  /**
   * id
   * @format int64
   */
  id?: number;
  /**
   * 物流方式id
   * @format int32
   */
  logisticsTransportId?: number;
  /** 物流方式名称 */
  name?: string;
  /** 旺季时间 */
  peakSeasonTime?: PeakSeasonTimeBean[];
  /**
   * 状态
   * @format int32
   */
  status?: number;
  /** 备货站点 */
  stockSite?: string;
  /** 更新人 */
  updater?: string;
}

/** SubDeptListQueryReq */
export interface SubDeptListQueryReq {
  /** 子级部门id列表 */
  deptIdList?: number[];
  /**
   * 父级部门 id, 为空时查询跟级部门下的子部门
   * @format int64
   */
  parentId?: number;
  searchChildDept?: boolean;
}

/** SubDeptListQueryResp */
export interface SubDeptListQueryResp {
  /** 部门信息列表 */
  deptInfoList?: DeptInfoBean[];
}

/** SubmitItem */
export interface SubmitItem {
  /** 活动增量-固定三周(3列) */
  activeIncrList?: PsfaiShowWeekBean[];
  /** 渠道 */
  channel: string;
  /** 站点 */
  country: string;
  /**
   * 主键ID
   * @format int64
   */
  id?: number;
  /** 在售sku编码 */
  onlineSkuCode: string;
  /** sku编码 */
  skuCode: string;
  /** 预测列表 */
  weekBeanList: OdsLuteSalesForecastItemWeekBean[];
}

/** SuggestPriceReq */
export interface SuggestPriceReq {
  /** 币种编码 */
  currencyCode?: string;
  /** 客户编码 */
  customerCode?: string;
  /** 商品编码 */
  skuCodeList?: string[];
}

/** SuggestPriceResp */
export interface SuggestPriceResp {
  /** 报价 */
  postalPrice?: number;
  /** 建议售价 */
  suggestPrice?: number;
}

/** SupplierBasicInfoBean */
export interface SupplierBasicInfoBean {
  /** 营业执照号码 */
  businessLicenseNumber?: string;
  /**
   * 经营模式
   * @example "生产制造型"
   */
  businessModel?: string;
  /** 业务代表名称 */
  businessRepresentative?: string;
  /**
   * 供应商名称
   * @example "ABC科技有限公司"
   */
  companyName?: string;
  /**
   * 实缴资本(万)
   * @example 1000
   */
  contributedCapital: number;
  /**
   * 企业性质
   * @example "国有企业"
   */
  enterpriseNature?: string;
  /**
   * 成立时间
   * @format date-time
   * @example "2010-05-20"
   */
  establishmentDate?: string;
  /** 总经理名称 */
  generalManager?: string;
  /** 一般纳税人企业 */
  generalTaxpayer?: boolean;
  /**
   * 总部地址
   * @example "北京市朝阳区望京SOHO"
   */
  headquartersAddress?: string;
  /** 所属行业 */
  industry?: string;
  /**
   * 邀请码
   * @example "INV20240115001"
   */
  inviteCode?: string;
  /**
   * 是否上市
   * @example true
   */
  isListed?: boolean;
  /**
   * 管理员工人数
   * @format int32
   */
  managementStaffCount?: number;
  /** 总经理邮箱 */
  managerEmail?: string;
  /** 总经理手机号 */
  managerPhone?: string;
  /** 总经理座机 */
  managerTelephone?: string;
  /**
   * 生产方式
   * @format int32
   * @example 0
   */
  productionMethod?: number;
  /**
   * 注册地址
   * @example "北京市海淀区中关村大街1号"
   */
  registeredAddress?: string;
  /**
   * 注册资本（万）
   * @example 5000
   */
  registeredCapital?: number;
  /** 业务代表邮箱 */
  representativeEmail?: string;
  /** 业务代表手机号 */
  representativePhone?: string;
  /** 业务代表座机 */
  representativeTelephone?: string;
  /**
   * 厂家自评
   * @example "本公司专注于高端制造..."
   */
  selfEvaluation?: string;
  /**
   * 一线员工人数
   * @format int32
   */
  staffCount?: number;
  /** 供应商编号 */
  supplierCode?: string;
  /**
   * 供应商网址
   * @example "https://www.abc-tech.com"
   */
  website?: string;
}

/** SupplierBasicInfoBean0 */
export interface SupplierBasicInfoBean0 {
  /**
   * 营业执照号码
   * @example "91110000123456789X"
   */
  businessLicenseNumber: string;
  /**
   * 经营模式
   * @example "MANUFACTURER"
   */
  businessModel: string;
  /**
   * 业务代表
   * @example "张业务"
   */
  businessRepresentative: string;
  /**
   * 公司注册名称
   * @example "XX科技有限公司"
   */
  companyName: string;
  /**
   * 实缴资本(万)
   * @example 1000
   */
  contributedCapital: number;
  /**
   * 企业性质
   * @example "PRIVATE"
   */
  enterpriseNature?: string;
  /**
   * 成立时间
   * @format date-time
   * @example "2020-01-01"
   */
  establishmentDate: string;
  /**
   * 总经理
   * @example "王总"
   */
  generalManager: string;
  /**
   * 一般纳税人企业
   * @example true
   */
  generalTaxpayer: boolean;
  /**
   * 总部地址
   * @example "上海市浦东新区xxx路xxx号"
   */
  headquartersAddress?: string;
  /**
   * 所属行业
   * @example "电子制造"
   */
  industry: string;
  /** 邀请唯一code */
  inviteCode?: string;
  /**
   * 是否上市
   * @example false
   */
  isListed: boolean;
  /**
   * 管理员工人数
   * @format int32
   * @example 50
   */
  managementStaffCount: number;
  /**
   * 总经理邮箱
   * @example "ceo@example.com"
   */
  managerEmail: string;
  /**
   * 总经理手机号
   * @example 13800138000
   */
  managerPhone: string;
  /**
   * 总经理座机
   * @example "010-12345678"
   */
  managerTelephone?: string;
  /**
   * 生产方式
   * @format int32
   * @example 1
   */
  productionMethod: number;
  /**
   * 注册地址
   * @example "北京市朝阳区xxx路xxx号"
   */
  registeredAddress?: string;
  /**
   * 注册资本(万)
   * @example 1000
   */
  registeredCapital: number;
  /**
   * 业务代表邮箱
   * @example "sales@example.com"
   */
  representativeEmail: string;
  /**
   * 业务代表手机号
   * @example 13900139000
   */
  representativePhone: string;
  /**
   * 业务代表座机
   * @example "010-87654321"
   */
  representativeTelephone?: string;
  /** 厂家自评 */
  selfEvaluation?: string;
  /**
   * 一线员工人数
   * @format int32
   * @example 200
   */
  staffCount: number;
  /**
   * 供应商网址
   * @example "https://www.example.com"
   */
  website?: string;
}

/** SupplierCertificationBean */
export interface SupplierCertificationBean {
  /**
   * 认证证书
   * @example "ISO9001质量管理体系认证"
   */
  certificateName: string;
  /**
   * 认证编号
   * @example "ISO9001-2023001"
   */
  certificateNumber: string;
  /**
   * 有效期结束时间
   * @format date-time
   * @example "2020-01-01"
   */
  expDateEnd: string;
  /**
   * 有效期开始时间
   * @format date-time
   * @example "2020-01-01"
   */
  expDateStart: string;
  /**
   * id
   * @format int64
   */
  id?: number;
  /**
   * 认证情况
   * @example true
   */
  isCertified: boolean;
  /** 供应商code */
  supplierCode?: string;
}

/** SupplierCompetitorBean */
export interface SupplierCompetitorBean {
  /**
   * 公司名(全称)
   * @example "ABC科技有限公司"
   */
  companyName: string;
  /**
   * 所属国家或地区
   * @example "中国"
   */
  countryRegion: string;
  /**
   * id
   * @format int64
   */
  id?: number;
  /**
   * 市场占有率(%)
   * @example 15.5
   */
  marketShare: number;
  /** 供应商code */
  supplierCode?: string;
}

/** SupplierInviteBean */
export interface SupplierInviteBean {
  /**
   * 审核备注
   * @example "资料完整，符合要求"
   */
  auditRemark?: string;
  /**
   * 审核状态
   * @example "APPROVED"
   */
  auditStatus?: string;
  /**
   * 审核状态显示名称
   * @example "已审核通过"
   */
  auditStatusDesc?: string;
  /**
   * 经营模式
   * @example "生产制造型"
   */
  businessModel?: string;
  /**
   * 公司注册名称
   * @example "ABC科技有限公司"
   */
  companyName?: string;
  /**
   * 创建时间
   * @format date-time
   * @example "2024-01-15 10:00:00"
   */
  createTime?: string;
  /**
   * 企业性质
   * @example "私营企业"
   */
  enterpriseNature?: string;
  /**
   * 成立时间
   * @format date-time
   * @example "2010-05-20"
   */
  establishmentDate?: string;
  /**
   * 总部地址
   * @example "北京市朝阳区望京SOHO"
   */
  headquartersAddress?: string;
  /** 邀请唯一code */
  inviteCode?: string;
  /**
   * 是否上市
   * @example true
   */
  isListed?: boolean;
  /**
   * 是否注册为供应商
   * @example true
   */
  isRegisteredSupplier?: boolean;
  /**
   * 生产方式
   * @example "自主生产"
   */
  productionMethod?: string;
  /**
   * 推荐人
   * @example "张三"
   */
  recommender?: string;
  /**
   * 推荐公司名称
   * @example "XYZ集团"
   */
  recommenderCompany?: string;
  /**
   * 推荐邮箱
   * @example "zhangsan@xyz.com"
   */
  recommenderEmail?: string;
  /**
   * 公司注册地址
   * @example "北京市海淀区中关村大街1号"
   */
  registeredAddress?: string;
  /**
   * 注册资本（万）
   * @example 5000
   */
  registeredCapital?: number;
  /**
   * 提交审核时间
   * @format date-time
   * @example "2024-01-16 14:30:00"
   */
  submitAuditTime?: string;
  /**
   * 推荐公司编号
   * @example "SUP20240115001"
   */
  supplierCode?: string;
  /**
   * 修改时间
   * @format date-time
   * @example "2024-01-17 09:20:00"
   */
  updateTime?: string;
  /**
   * 修改人
   * @example "李四"
   */
  updater?: string;
  /**
   * 供应商网址
   * @example "https://www.abc-tech.com"
   */
  website?: string;
}

/** SupplierInviteDetailResp */
export interface SupplierInviteDetailResp {
  /** 审核记录 */
  auditRecords?: AuditRecordBean[];
  /** 供应商基本信息 */
  basicInfo?: SupplierBasicInfoBean;
  /** 体系认证信息 */
  certifications?: CertificationInfoBean[];
  /** 竞争对手信息 */
  competitors?: CompetitorInfoBean[];
  /** 股权架构信息 */
  equityStructures?: EquityStructureBean0[];
  /** 关联的邀请记录 */
  inviteRecord?: InviteRecordBean;
  /** 近三年主要客户 */
  majorCustomers?: MajorCustomerInfoBean[];
  /** 生产线信息 */
  productionLines?: ProductionLineInfoBean[];
  /** 近三年营业额 */
  turnovers?: TurnoverInfoBean[];
}

/** SupplierInviteInitSaveReq */
export interface SupplierInviteInitSaveReq {
  /** 供应商邮箱 */
  supplierEmail?: string;
  /** 供应商名称 */
  supplierName?: string;
}

/** SupplierInviteListReq */
export interface SupplierInviteListReq {
  /**
   * 结束时间
   * @format date-time
   */
  endTime?: string;
  /** 搜索框 */
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
  /** 选中行 */
  selectInviteList?: string[];
  /**
   * 开始时间
   * @format date-time
   */
  startTime?: string;
  /** 状态 */
  status?: string;
  /**
   * 时间类型 0=创建时间 1=提交审核时间
   * @format int32
   */
  timeType?: number;
}

/** SupplierInviteListResp */
export interface SupplierInviteListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 列表数据 */
  result?: SupplierInviteBean[];
  /** 邀请状态统计 */
  statusStatistics?: StatusStatistics;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** SupplierInviteSaveReq */
export interface SupplierInviteSaveReq {
  /** 供应商基本信息 */
  basicInfo?: SupplierBasicInfoBean0;
  /** 体系认证列表 */
  certifications?: SupplierCertificationBean[];
  /** 竞争对手列表 */
  competitors?: SupplierCompetitorBean[];
  /** 股权架构列表 */
  equityStructures?: EquityStructureBean[];
  /** 主要客户列表 */
  majorCustomers?: SupplierMajorCustomerBean[];
  /** 生产线列表 */
  productionLines?: SupplierProductionLineBean[];
  /** 财务数据列表 */
  turnovers?: SupplierTurnoverBean[];
}

/** SupplierMajorCustomerBean */
export interface SupplierMajorCustomerBean {
  /**
   * 币种
   * @example "CNY"
   */
  currency?: string;
  /**
   * 客户名
   * @example "华为技术有限公司"
   */
  customerName: string;
  /**
   * id
   * @format int64
   */
  id?: number;
  /**
   * 销售金额
   * @example 5000000
   */
  salesAmount: number;
  /** 供应商code */
  supplierCode?: string;
  /**
   * 交易产品
   * @example "智能手机"
   */
  transactionProduct: string;
  /**
   * 年出货量
   * @format int32
   * @example 10000
   */
  yearShipment: number;
}

/** SupplierMasterDataExportReq */
export interface SupplierMasterDataExportReq {
  /** 关键字：供应商 ELS 账号(to_els_account) 或 供应商名称 模糊匹配 */
  keyword?: string;
  /** 供应商状态：0陌生、1潜在、2合格、3淘汰等，与库中 supplier_status 一致 */
  supplierStatus?: string;
}

/** SupplierMasterDataQueryReq */
export interface SupplierMasterDataQueryReq {
  /** 关键字：供应商 ELS 账号(to_els_account) 或 供应商名称 模糊匹配 */
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
  /** 供应商状态：0陌生、1潜在、2合格、3淘汰等，与库中 supplier_status 一致 */
  supplierStatus?: string;
}

/** SupplierMasterDataQueryResp */
export interface SupplierMasterDataQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 记录列表 */
  recordList?: SupplierMasterDataRow[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** SupplierMasterDataRow */
export interface SupplierMasterDataRow {
  /** 准入品类 */
  accessCategory?: string;
  /** 供应商账户组 */
  accountGroup_dictText?: string;
  /** 拓展信息审批状态 */
  auditStatus_dictText?: string;
  /** 授权代理品牌 */
  authorizedBrand?: string;
  /** 客户指定 */
  client_dictText?: string;
  /** 创建时间 */
  createTime?: string;
  /** 币别 */
  currency_dictText?: string;
  /** 结算方式 */
  fbk2_dictText?: string;
  /** 结算周期 */
  fbk3_dictText?: string;
  /** 付款条件 */
  fbk8_dictText?: string;
  /** 冻结功能 */
  frozenFunction?: string;
  /** 是否非工商注册 */
  isPerson_dictText?: string;
  /** 供应商协同方式 */
  needCoordination_dictText?: string;
  /** 绩效评级 */
  performanceLevel_dictText?: string;
  /** SRM注册手机号 */
  personPhone?: string;
  /** 采购负责人 */
  principal?: string;
  /** 采购类型 */
  purchaseType_dictText?: string;
  /** 接口状态 */
  returnState_dictText?: string;
  /** 来源类型 */
  sourceType_dictText?: string;
  /** 供应商ERP编码 */
  supplierCode?: string;
  /** 供应商级别 */
  supplierLevel_dictText?: string;
  /** 供应商名称 */
  supplierName?: string;
  /** 拼音首字母缩写（倒序） */
  supplierSimpleAbbrPyReverse?: string;
  /** 供应商四字简称 */
  supplierSimpleName?: string;
  /** 供应商状态 */
  supplierStatus_dictText?: string;
  /** 供应商类型 */
  supplierType?: string;
  /** 模板名称 */
  templateName?: string;
  /** 模板编号 */
  templateNumber?: string;
  /** 供应商ELS账号 */
  toElsAccount?: string;
}

/** SupplierProductionLineBean */
export interface SupplierProductionLineBean {
  /**
   * 拟合作产品线
   * @format int32
   * @example 1
   */
  cooperationProductLine: number;
  /**
   * id
   * @format int64
   */
  id?: number;
  /**
   * 主要客户
   * @example "华为,小米,OPPO"
   */
  majorCustomers: string;
  /**
   * 月产能/单位
   * @example 100000
   */
  monthlyCapacity: number;
  /**
   * 月出货量/单位
   * @example 80000
   */
  monthlyShipment: number;
  /**
   * 产品线
   * @example "智能手机生产线"
   */
  productLine: string;
  /** 供应商code */
  supplierCode?: string;
}

/** SupplierStatusCountItem */
export interface SupplierStatusCountItem {
  /** 筛选字段名 */
  fileName?: string;
  /** 拒绝原因等扩展，默认 null */
  rejectReason?: string;
  /** 展示标题 */
  title?: string;
  /**
   * 数量
   * @format int32
   */
  total?: number;
  /** 状态值，全部时为 null */
  value?: string;
}

/** SupplierTurnoverBean */
export interface SupplierTurnoverBean {
  /**
   * 币种
   * @example "CNY"
   */
  currency?: string;
  /**
   * 内销比例
   * @example 60
   */
  domesticSalesRatio: number;
  /**
   * 外销比例
   * @example 40
   */
  exportSalesRatio: number;
  /**
   * id
   * @format int64
   */
  id?: number;
  /** 供应商code */
  supplierCode?: string;
  /**
   * 营业额
   * @example 10000000
   */
  turnover: number;
  /**
   * 年份
   * @format int32
   * @example 2023
   */
  year: number;
}

/** SyncGcOrderInfoReq */
export interface SyncGcOrderInfoReq {
  /** 客户编码 */
  customerCode: string;
  /** 订单编码 */
  orderCode: string;
}

/** SyncItemInfo */
export interface SyncItemInfo {
  /**
   * 发货箱数
   * @format int32
   */
  deliveryBox: number;
  /**
   * 发货数量
   * @format int32
   */
  deliveryQuantity: number;
  /** 额外信息 */
  extraInfo?: Record<string, object>;
  /** 物料编码(供应链SKU) */
  materialNumber: string;
  /** 采购订单号 */
  orderNumber: string;
}

/** SyncSupplierReq */
export interface SyncSupplierReq {
  /** 供应商基本信息 */
  baseInfo: BaseInfo;
  /** 联系人信息 */
  concatItemList?: ConcatItem[];
  /** 支付信息 */
  paymentItemList?: PaymentItem[];
}

/** TaxLine */
export interface TaxLine {
  channel_liable?: string;
  price?: number;
  price_set?: PriceSet;
  rate?: number;
  title?: string;
}

/** ThirdInventoryQueryListReq */
export interface ThirdInventoryQueryListReq {
  /** 是否升序 */
  asc?: boolean;
  /** 排序字段 */
  orderBy?: string;
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
  /** 三方仓产品中文名称 */
  productCnName?: string[];
  /** 产品名称 */
  productName?: string;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 供应链sku列表 */
  skuList?: string[];
  /** 供应链sku列表 */
  skus?: string;
  /** thirdSkuList */
  thirdSkuList?: string[];
  /** thirdSkus */
  thirdSkus?: string;
  /** 店铺id列表 */
  warehouseCodes?: string[];
}

/** ThirdInventoryQueryListResp */
export interface ThirdInventoryQueryListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** third库存信息列表 */
  recordList?: ThirdInventoryQueryListRespItem[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** ThirdInventoryQueryListRespItem */
export interface ThirdInventoryQueryListRespItem {
  /**
   * 在途量
   * @format int32
   */
  onwayQuantity?: number;
  /** 三方仓产品中文名称 */
  productCnName?: string;
  /** 产品名称 */
  productName?: string;
  /**
   * 预占量
   * @format int32
   */
  reservedQuantity?: number;
  /**
   * 可用量
   * @format int32
   */
  sellableQuantity?: number;
  /**
   * 历史出库量
   * @format int32
   */
  shippedQuantity?: number;
  /** sku */
  sku?: string;
  /** 三方仓产品状态, Deleted-废弃  Temporary-草稿  Enable-可用 Examining-审核中 NotApprove-审核不通过 */
  status?: string;
  /** 状态名称 */
  statusName?: string;
  /**
   * 同步时间
   * @format date-time
   */
  syncTime?: string;
  /**
   * 同步时间
   * @format date-time
   */
  synchronizeTime?: string;
  /** thirdSku */
  thirdSku?: string;
  /**
   * 次品量
   * @format int32
   */
  unsellableQuantity?: number;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /**
   * 仓库id
   * @format int64
   */
  warehouseId?: number;
  /** 仓库名称 */
  warehouseName?: string;
}

/** TiktokInventoryQueryListReq */
export interface TiktokInventoryQueryListReq {
  /** 是否升序 */
  asc?: boolean;
  /** itemIdList */
  itemIds?: string;
  /** mskuList */
  mskus?: string;
  /** 排序字段 */
  orderBy?: string;
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
  /** 产品名称 */
  productName?: string;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 供应链sku列表 */
  skus?: string;
  /** 店铺id列表 */
  userAccounts?: string[];
}

/** TiktokInventoryQueryListResp */
export interface TiktokInventoryQueryListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** tiktok库存信息列表 */
  recordList?: TiktokInventoryQueryListRespItem[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** TiktokInventoryQueryListRespItem */
export interface TiktokInventoryQueryListRespItem {
  /**
   * 可用量
   * @format int32
   */
  availableQuantity?: number;
  /**
   * 在途量
   * @format int32
   */
  inTransitQuantity?: number;
  /** itemId */
  itemId?: string;
  /** msku */
  msku?: string;
  onHandDetail?: string;
  /** 产品名称 */
  productName?: string;
  /**
   * 预占量
   * @format int32
   */
  reservedQuantity?: number;
  /** 供应链sku */
  sku?: string;
  /**
   * 同步时间
   * @format date-time
   */
  syncTime?: string;
  /**
   * 历史出库量
   * @format int32
   */
  totalQuantity?: number;
  /**
   * 次品量
   * @format int32
   */
  unfulfillableQuantity?: number;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /**
   * 仓库id
   * @format int64
   */
  warehouseId?: number;
  /** 仓库名称 */
  warehouseName?: string;
}

/** TiktokInventoryShopQueryListResp */
export interface TiktokInventoryShopQueryListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 店铺信息列表 */
  recordList?: TiktokInventoryShopQueryListRespItem[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** TiktokInventoryShopQueryListRespItem */
export interface TiktokInventoryShopQueryListRespItem {
  code?: string;
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
  /** 店铺账户 */
  userAccount?: string;
  /** 店铺名称 */
  userAccountName?: string;
}

/** TiktokStockAdjustmentQueryListReq */
export interface TiktokStockAdjustmentQueryListReq {
  /** 单据编号 */
  adjustmentCode?: string;
  /**
   * 创建时间-end
   * @format date-time
   */
  createTimeEnd?: string;
  /**
   * 创建时间-start
   * @format date-time
   */
  createTimeStart?: string;
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
   * 同步状态(0-草稿；10-同步中；20-已同步；30-同步失败；40-部分同步成功)
   * @format int32
   */
  syncStatus?: number;
  /** 仓库编码 */
  warehouseCode?: string;
}

/** TiktokStockAdjustmentQuerySkuIdInfoReq */
export interface TiktokStockAdjustmentQuerySkuIdInfoReq {
  /** seller sku */
  sellerSku?: string;
  /** 店铺 */
  shopNameList?: string[];
  /** 供应链SKU */
  supplySku?: string;
  /** 仓库编码 */
  warehouseCode?: string;
}

/** TiktokStockAdjustmentQuerySkuIdInfoResp */
export interface TiktokStockAdjustmentQuerySkuIdInfoResp {
  /** 结果集 */
  recordList?: TkStockAdjustmentQuerySkuIdInfoBean[];
}

/** TiktokStockAdjustmentQuerySkuInfoBean */
export interface TiktokStockAdjustmentQuerySkuInfoBean {
  /** sellerSku */
  sellerSku?: string;
  /** 供应链SKU */
  supplySku?: string;
  /**
   * 库存数量
   * @format int32
   */
  totalStock?: number;
  /** 仓库编码 */
  warehouseCode?: string;
  /** 仓库名称 */
  warehouseName?: string;
}

/** TiktokStockAdjustmentQuerySkuInfoReq */
export interface TiktokStockAdjustmentQuerySkuInfoReq {
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
  /** 供应链SKU */
  supplySku?: string;
  /** 仓库编码 */
  warehouseCode?: string;
}

/** TiktokStockAdjustmentQuerySkuInfoResp */
export interface TiktokStockAdjustmentQuerySkuInfoResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 结果集 */
  recordList?: TiktokStockAdjustmentQuerySkuInfoBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** TiktokStockAdjustmentQuerySkuShopInfoReq */
export interface TiktokStockAdjustmentQuerySkuShopInfoReq {
  /** seller sku */
  sellerSku?: string;
  /** 供应链SKU */
  supplySku?: string;
}

/** TiktokStockAdjustmentQuerySkuShopInfoResp */
export interface TiktokStockAdjustmentQuerySkuShopInfoResp {
  /** 结果集 */
  recordList?: TkStockAdjustmentQuerySkuShopInfoBean[];
}

/** TiktokStockAdjustmentQueryStockBean */
export interface TiktokStockAdjustmentQueryStockBean {
  /**
   * 可用库存
   * @format int32
   */
  availableStock?: number;
  /**
   * 占用库存
   * @format int32
   */
  committedStock?: number;
  /** 店铺 */
  shopName?: string;
  /** SKU ID */
  skuId?: string;
  /** tk仓库Id */
  warehouseId?: string;
}

/** TiktokStockAdjustmentQueryStockReq */
export interface TiktokStockAdjustmentQueryStockReq {
  /** 查询参数 */
  queryList?: TkQueryStockBean[];
}

/** TiktokStockAdjustmentQueryStockResp */
export interface TiktokStockAdjustmentQueryStockResp {
  /** 结果集 */
  recordList?: TiktokStockAdjustmentQueryStockBean[];
}

/** TiktokStockAdjustmentSaveReq */
export interface TiktokStockAdjustmentSaveReq {
  /** 单据编号 */
  adjustmentCode?: string;
  /**
   * id
   * @format int64
   */
  id?: number;
  /**
   * 0 -- 保存草稿；1--确认调整
   * @format int32
   */
  operationType?: number;
  /** 备注 */
  remark?: string;
  /** 仓库编码 */
  warehouseCode?: string;
  /** 调整明细 */
  wrapperDetailList?: TkDetailWrapperBean[];
}

/** TiktokStockAdjustmentSyncStatusBean */
export interface TiktokStockAdjustmentSyncStatusBean {
  /**
   * 状态
   * @format int32
   */
  status?: number;
  /** 状态值 */
  statusDesc?: string;
}

/** TiktokStockAdjustmentSyncStatusResp */
export interface TiktokStockAdjustmentSyncStatusResp {
  /** 结果集 */
  recordList?: TiktokStockAdjustmentSyncStatusBean[];
}

/** TkDetailBean */
export interface TkDetailBean {
  /** 单据编号 */
  adjustmentCode?: string;
  /**
   * 调整数量
   * @format int32
   */
  adjustmentQty?: number;
  /**
   * 调整后库存
   * @format int32
   */
  afterAdjustmentStock?: number;
  /**
   * 当前库存
   * @format int32
   */
  availableStock?: number;
  /**
   * 占用库存
   * @format int32
   */
  committedStock?: number;
  /**
   * id
   * @format int64
   */
  id?: number;
  /** productId */
  productId?: string;
  /** 商品名称 */
  productName?: string;
  /** seller_sku */
  sellerSku?: string;
  /** 店铺名称 */
  shopName?: string;
  /** sku_id */
  skuId?: string;
  /** 供应链SKU */
  supplySku?: string;
  /**
   * 库存总量
   * @format int32
   */
  totalStock?: number;
  /** tk仓库id */
  warehouseId?: string;
  /** 仓库名称 */
  warehouseName?: string;
}

/** TkDetailWrapperBean */
export interface TkDetailWrapperBean {
  /** 明细列表 */
  detailList?: TkDetailBean[];
  /** seller_sku */
  sellerSku?: string;
  /** 店铺名称 */
  shopNameList?: string[];
  /** 供应链SKU */
  supplySku?: string;
  /**
   * 总库存
   * @format int32
   */
  totalStock?: number;
}

/** TkQueryStockBean */
export interface TkQueryStockBean {
  /** 店铺 */
  shopName?: string;
  /** sku id不能为空 */
  skuId?: string;
}

/** TkStockAdjustmentDetail */
export interface TkStockAdjustmentDetail {
  /** 单据编号 */
  adjustmentCode?: string;
  /**
   * 调整数量
   * @format int32
   */
  adjustmentQty?: number;
  /**
   * 调整后库存
   * @format int32
   */
  afterAdjustmentStock?: number;
  /**
   * 当前库存
   * @format int32
   */
  availableStock?: number;
  /**
   * 占用库存
   * @format int32
   */
  committedStock?: number;
  /**
   * id
   * @format int64
   */
  id?: number;
  /** productId */
  productId?: string;
  /** 商品名称 */
  productName?: string;
  /** seller_sku */
  sellerSku?: string;
  /** 店铺名称 */
  shopName?: string;
  /** sku_id */
  skuId?: string;
  /** 供应链SKU */
  supplySku?: string;
  /**
   * 同步状态(0-草稿；10-已同步；20-同步失败)
   * @format int32
   */
  syncStatus?: number;
  /** 同步状态(0-草稿；10-已同步；20-同步失败) */
  syncStatusDesc?: string;
  /** 同步异常信息 */
  sysErrorMsg?: string;
  /**
   * 总库存
   * @format int32
   */
  totalStock?: number;
  /** tk仓库id */
  warehouseId?: string;
  /** 仓库名称 */
  warehouseName?: string;
}

/** TkStockAdjustmentDetailQueryBean */
export interface TkStockAdjustmentDetailQueryBean {
  /** 库存调整单-明细 */
  detailList?: TkStockAdjustmentDetail[];
  /** seller_sku */
  sellerSku?: string;
  /** 店铺名称 */
  shopNameList?: string[];
  /** 供应链SKU */
  supplySku?: string;
  /**
   * 总库存
   * @format int32
   */
  totalStock?: number;
}

/** TkStockAdjustmentDetailQueryResp */
export interface TkStockAdjustmentDetailQueryResp {
  /** 库存调整单-主 */
  adjustmentBean?: TkStockAdjustmentQueryBean;
  code?: string;
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
  /** 库存调整单-明细 */
  wrapperDetailList?: TkStockAdjustmentDetailQueryBean[];
}

/** TkStockAdjustmentQueryBean */
export interface TkStockAdjustmentQueryBean {
  /** 单据编号 */
  adjustmentCode?: string;
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
   * id
   * @format int64
   */
  id?: number;
  /** 更新人 */
  operator?: string;
  /** 更新人名称 */
  operatorName?: string;
  /** 备注 */
  remark?: string;
  /**
   * 同步状态(0-草稿；10-同步中；20-已同步；30-同步失败；40-部分同步成功)
   * @format int32
   */
  syncStatus?: number;
  /** 同步状态(0-草稿；10-同步中；20-已同步；30-同步失败；40-部分同步成功) */
  syncStatusDesc?: string;
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

/** TkStockAdjustmentQueryListResp */
export interface TkStockAdjustmentQueryListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 结果集 */
  recordList?: TkStockAdjustmentQueryBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** TkStockAdjustmentQuerySkuIdInfoBean */
export interface TkStockAdjustmentQuerySkuIdInfoBean {
  /**
   * 当前库存
   * @format int32
   */
  availableStock?: number;
  /**
   * 占用库存
   * @format int32
   */
  committedStock?: number;
  /** productId */
  productId?: string;
  /** 商品名称 */
  productName?: string;
  /** seller_sku */
  sellerSku?: string;
  /** 店铺名称 */
  shopName?: string;
  /** sku_id */
  skuId?: string;
  /** 供应链SKU */
  supplySku?: string;
  /** tk仓库id */
  warehouseId?: string;
  /** 仓库名称 */
  warehouseName?: string;
}

/** TkStockAdjustmentQuerySkuShopInfoBean */
export interface TkStockAdjustmentQuerySkuShopInfoBean {
  /** 店铺名称 */
  shopName?: string;
}

/** TrackBean */
export interface TrackBean {
  /** 渠道 */
  freightForwardingChannelCode?: string;
  /** 跟踪单号 */
  trackingNum?: string;
}

/** TransferOrder */
export interface TransferOrder {
  /**
   * 调拨数量
   * @format int32
   */
  quantity?: number;
  /** 发货单号 */
  shippingOrderCode?: string;
  /** 调拨单号 */
  transferOrderCode?: string;
}

/** TurnoverInfoBean */
export interface TurnoverInfoBean {
  /**
   * 币种
   * @example "CNY"
   */
  currency?: string;
  /**
   * 币种名称
   * @example "人民币"
   */
  currencyName?: string;
  /**
   * 内销比例
   * @example 60
   */
  domesticSalesRatio?: number;
  /**
   * 外销比例
   * @example 40
   */
  exportSalesRatio?: number;
  /**
   * 营业额
   * @example 150000
   */
  turnover?: number;
  /**
   * 年份
   * @format int32
   * @example 2023
   */
  year?: number;
}

/** UnBindOrderCodeReq */
export interface UnBindOrderCodeReq {
  /** 销售订单号 */
  erpCode?: string;
  /** 源仓配单号 */
  sourceOrderCode?: string;
  /**
   * 仓配系统
   * @format int32
   */
  systemType?: number;
  /**
   * 目标仓配单号
   * @minLength 0
   * @maxLength 100
   */
  targetOrderCode?: string;
}

/** UpLoadBean */
export interface UpLoadBean {
  /**
   * 上传时间
   * @format date
   */
  uploadDate?: string;
  /**
   * 上传数量
   * @format int32
   */
  uploadQty?: number;
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

/** VcOrderListQueryBean */
export interface VcOrderListQueryBean {
  /** 异常问题原因 */
  abnormalProblemReason?: string;
  /** 承运商 */
  carrierName?: string;
  /**
   * 订单日期
   * @format date-time
   */
  dateCreate?: string;
  /**
   * 更新日期
   * @format date-time
   */
  dateModify?: string;
  /**
   * 出库日期
   * @format date-time
   */
  dateShipping?: string;
  /**
   * 提货日期
   * @format date-time
   */
  estimatedArrivalDate?: string;
  /** 收货仓 */
  fbaWarehouseCode?: string;
  /** item列表 */
  itemBeanList?: VcOrderListQueryItemBean[];
  /** 订单编号 */
  orderCode?: string;
  /** 订单描述 */
  orderDesc?: string;
  /** 订单状态:W 待发货 D 已发货 N 异常订单 P 问题件 X 已删除 */
  orderStatus?: string;
  /** 订单状态:C 草稿 H 暂存 W 待发货 D 已发货 N 异常订单 P 问题件 X 已删除 */
  orderStatusDesc?: string;
  /** 订单类型(ordinary:标准订单,fba:FBA订单,discard:弃货处置订单,self-pick:自提订单,vc:VC订单,wfs:WFS订单,other:其他调拨订单) */
  orderType?: string;
  /** 平台 */
  platform?: string;
  /** PO订单 */
  platformOrderCode?: string;
  /** 参考编号 */
  referenceNo?: string;
  /**
   * 发货状态 0：全部，1：已打板待提货，2：已提货
   * @format int32
   */
  shipStatus?: number;
  /** 发货状态 0：全部，1：已打板待提货，2：已提货 */
  shipStatusDesc?: string;
  /**
   * 出库时间
   * @format date-time
   */
  shipperTime?: string;
  /** 物流产品代码 */
  shippingMethod?: string;
  /** 跟踪号 */
  trackingNo?: string;
  /** 仓库代码 */
  warehouseCode?: string;
  /** 发货仓（WP代码） */
  wpCode?: string;
}

/** VcOrderListQueryItemBean */
export interface VcOrderListQueryItemBean {
  /** 订单编号 */
  orderCode?: string;
  /**
   * 箱规（配对数量）
   * @format int32
   */
  pairQuantity?: number;
  /** 产品中文名称 */
  productName?: string;
  /** UPC */
  productSku?: string;
  /**
   * 箱数
   * @format int32
   */
  quantity?: number;
  /**
   * 数量
   * @format int32
   */
  quantityConfirmed?: number;
  /** 供应链sku */
  supplySku?: string;
}

/** VcOrderListQueryReq */
export interface VcOrderListQueryReq {
  /** 订单结束时间 */
  enTime?: string;
  /** 订单编号 */
  orderCodes?: string;
  /** 订单状态 */
  orderStatus?: string;
  /** 订单类型(ordinary:标准订单,fba:FBA订单,discard:弃货处置订单,self-pick:自提订单,vc:VC订单,wfs:WFS订单,other:其他调拨订单) */
  orderType?: string;
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
  /** PO单号 */
  platformOrderCodes?: string;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 参考编号 */
  referenceNos?: string;
  /**
   * 发货状态 0：全部，1：已打板待提货，2：已提货
   * @format int32
   */
  shipStatus?: number;
  /** 订单开始时间 */
  starTime?: string;
}

/** VcOrderListQueryResp */
export interface VcOrderListQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 记录列表 */
  recordList?: VcOrderListQueryBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** WalmartInventoryQueryListReq */
export interface WalmartInventoryQueryListReq {
  /** 是否升序 */
  asc?: boolean;
  /** gtinList */
  gtins?: string;
  /** itemIdList */
  itemIds?: string;
  /** mskuList */
  mskus?: string;
  /** 排序字段 */
  orderBy?: string;
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
  /** 产品名称 */
  skuName?: string;
  /** 供应链sku列表 */
  skus?: string;
  /** 仓库id列表(warehouseCodes) */
  warehouseCodes?: string[];
}

/** WalmartInventoryQueryListResp */
export interface WalmartInventoryQueryListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** walmart库存信息列表 */
  recordList?: WalmartInventoryQueryListRespItem[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** WalmartInventoryQueryListRespItem */
export interface WalmartInventoryQueryListRespItem {
  /**
   * 可售量
   * @format int32
   */
  availableQuantity?: number;
  /** 品牌 */
  brandName?: string;
  /**
   * 拒收（损坏）量
   * @format int32
   */
  damagedQuantity?: number;
  /** 全球贸易标识号 */
  gtin?: string;
  /**
   * 入库量
   * @format int32
   */
  inboundQuantity?: number;
  /** ItemID */
  itemId?: string;
  /** asin */
  msku?: string;
  /** 销售负责人 */
  sellingManagerNameList?: string;
  /** sku */
  sku?: string;
  /** 产品名称 */
  skuName?: string;
  /** 状态(产品状态 [0-异常，1-正常]) */
  status?: string;
  /**
   * 同步时间
   * @format date-time
   */
  syncTime?: string;
  /**
   * 仓库id
   * @format int64
   */
  warehouseId?: number;
  /** 仓库名称 */
  warehouseName?: string;
}

/** WarehouseAffiliationChangeStatusReq */
export interface WarehouseAffiliationChangeStatusReq {
  /**
   * 归属状态: 0-开启 1-关闭
   * @format int32
   */
  status?: number;
  /** 仓库编码 */
  warehouseCode?: string;
}

/** WarehouseAffiliationListQueryResp */
export interface WarehouseAffiliationListQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  recordList?: WarehouseAffiliationListQueryRespItem[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** WarehouseAffiliationListQueryRespItem */
export interface WarehouseAffiliationListQueryRespItem {
  /** 归属渠道 */
  channel?: string;
  /** 归属渠道 */
  channelDesc?: string;
  /** 归属国家 */
  country?: string;
  /** 归属国家 */
  countryDesc?: string;
  /**
   * 归属状态: 0-开启 1-关闭
   * @format int32
   */
  status?: number;
  /** 归属状态: 0-开启 1-关闭 */
  statusDesc?: string;
  /** 仓库编码 */
  warehouseCode?: string;
  /** 仓库名称 */
  warehouseName?: string;
  /**
   * 仓库类型: 本地产-2、海外仓-3、FBA-1
   * @format int32
   */
  warehouseType?: number;
}

/** WarehouseAffiliationSaveReq */
export interface WarehouseAffiliationSaveReq {
  /** 渠道编码 */
  channel?: string;
  /** 国家编码 */
  country?: string;
  /** 仓库编码 */
  warehouseCode?: string;
  /**
   * 仓库类型: 本地产-2、海外仓-3、FBA-1
   * @format int32
   */
  warehouseType?: number;
}

/** WarehouseAffiliationWarehouseListQueryResp */
export interface WarehouseAffiliationWarehouseListQueryResp {
  /** 仓库编码 */
  warehouseCode?: string;
  /** 仓库名称 */
  warehouseName?: string;
}

/** WarehouseBaseBean */
export interface WarehouseBaseBean {
  /** 国家 */
  country?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /**
   * 是否中仓
   * @format int32
   */
  isCenterWarehouse?: number;
  /** 是否中仓 */
  isCenterWarehouseDesc?: string;
  /**
   * 是否组合品出库扣减包材
   * @format int32
   */
  isGroupProduct?: number;
  /** 是否组合品出库扣减包材 */
  isGroupProductDesc?: string;
  /**
   * 是否成品出库扣减包材
   * @format int32
   */
  isProduct?: number;
  /** 是否成品出库扣减包材 */
  isProductDesc?: string;
  /**
   * 是否中转仓
   * @format int32
   */
  isTransitWarehouse?: number;
  /** 是否中转仓 */
  isTransitWarehouseDesc?: string;
  /**
   * 积加仓库ID
   * @format int64
   */
  jjWarehouseId?: number;
  /** 积加仓库名称 */
  jjWarehouseName?: string;
  /** 映射关系列表 */
  mappingList?: MappingBean[];
  /** 服务商 */
  providerService?: string;
  /** 服务商名称 */
  providerServiceDesc?: string;
  /** 省份 */
  province?: string;
  /**
   * 采购方式
   * @format int32
   */
  purchaseMethod?: number;
  /** 采购方式描述 */
  purchaseMethodDesc?: string;
  /**
   * 启用状态 0-禁用 1-启用
   * @format int32
   */
  status?: number;
  /** 启用状态 0-禁用 1-启用 */
  statusDesc?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /** 仓库编码 */
  warehouseCode?: string;
  /** 仓库名称 */
  warehouseDesc?: string;
  /**
   * 仓库ID
   * @format int64
   */
  warehouseId?: number;
  /** 仓库类型 */
  warehouseType?: string;
  /** 仓库类型编码 */
  warehouseTypeDesc?: string;
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

/** WarehouseCascadeTreeNodeResp */
export interface WarehouseCascadeTreeNodeResp {
  /** 子节点；分类为非 null 列表（可为空），叶子为空列表 */
  children?: WarehouseCascadeTreeNodeResp[];
  /** 业务编码：分类与级联查询入参一致；叶子为 warehouseId 字符串 */
  code?: string;
  /**
   * 树深度：1-大类 2-细分/平台 3-仓库
   * @format int32
   */
  depth?: number;
  /** 展示文案 */
  label?: string;
  /** 仓库编码，仅叶子 */
  warehouseCode?: string;
  /**
   * 仓库主键，仅叶子
   * @format int64
   */
  warehouseId?: number;
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

/** WarehouseEcBeanPageResp */
export interface WarehouseEcBeanPageResp {
  code?: string;
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
  /** 仓库列表 */
  warehouseList?: EcWarehouseBean[];
}

/** WarehouseEcBeanResp */
export interface WarehouseEcBeanResp {
  /** 仓库列表 */
  warehouseList?: EcWarehouseBean[];
}

/** WarehouseInventoryQueryListReq */
export interface WarehouseInventoryQueryListReq {
  /** 是否升序 */
  asc?: boolean;
  /** 品线 */
  bigCategoryName?: string;
  /** 关键字 */
  keyword?: string;
  /** 排序字段 */
  orderBy?: string;
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
  /** 仓库编码 */
  warehouseCode?: string;
  /** 仓库名称 */
  warehouseName?: string;
}

/** WarehouseInventoryQueryListResp */
export interface WarehouseInventoryQueryListResp {
  /** 品线列表 */
  bigCategoryNameList?: string[];
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  recordList?: WarehouseInventoryQueryListRespItem[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
  /** 更新时间 */
  updateTime?: string;
  /** 仓库编码列表 */
  warehousCodeList?: string[];
  /** 仓库名称列表 */
  warehouseNameList?: string[];
}

/** WarehouseInventoryQueryListRespItem */
export interface WarehouseInventoryQueryListRespItem {
  /**
   * 实际可用库存
   * @format int32
   */
  actualAvailableInventory?: number;
  /**
   * 可用数量
   * @format int32
   */
  availableQuantity?: number;
  /** 品线 */
  bigCategoryName?: string;
  /**
   * 不良品数量
   * @format int32
   */
  defectiveQuantity?: number;
  /**
   * 分销数量
   * @format int32
   */
  distributionQuantity?: number;
  /** 图片 */
  imageUrl?: string;
  /** 最后更新时间 */
  lastUpdateTime?: string;
  /**
   * 缺货天数
   * @format int32
   */
  outOfStockDays?: number;
  /**
   * 缺货数量
   * @format int32
   */
  outOfStockQuantity?: number;
  /**
   * 待出不良品数量
   * @format int32
   */
  pendingDefectiveQuantity?: number;
  /**
   * 待出数量
   * @format int32
   */
  pendingOutQuantity?: number;
  /**
   * 待质检
   * @format int32
   */
  pendingQualityInspection?: number;
  /**
   * 待上架数量
   * @format int32
   */
  pendingShelfQuantity?: number;
  /**
   * 计划库存
   * @format int32
   */
  plannedInventory?: number;
  /** 名称 */
  productName?: string;
  /**
   * 采购在途数量
   * @format int32
   */
  purchaseInTransitQuantity?: number;
  /**
   * 采购库存
   * @format int32
   */
  purchaseInventory?: number;
  /**
   * 退件在途数量
   * @format int32
   */
  returnInTransitQuantity?: number;
  /**
   * 可销数量
   * @format int32
   */
  saleableQuantity?: number;
  /** 销售状态 */
  salesStatus?: string;
  /** 供应链SKU */
  supplyChainSKU?: string;
  /** 仓库代码 */
  warehouseCode?: string;
  /** 仓库名称 */
  warehouseName?: string;
  /**
   * 预警数量
   * @format int32
   */
  warningQuantity?: number;
}

/** WarehouseItem */
export interface WarehouseItem {
  /** 仓库编码 */
  warehouseCode?: string;
  /** 仓库名称 */
  warehouseName?: string;
}

/** WarehouseLogBean */
export interface WarehouseLogBean {
  /** 操作内容 */
  content?: string;
  /**
   * 操作时间
   * @format date-time
   */
  createTime?: string;
  /** 操作人 */
  handler?: string;
  /** 操作人名称 */
  handlerName?: string;
  /** 仓库名称 */
  warehouseDesc?: string;
  /**
   * 仓库ID
   * @format int64
   */
  warehouseId?: number;
}

/** WarehouseLogReq */
export interface WarehouseLogReq {
  /**
   * 仓库ID
   * @format int64
   */
  warehouseId?: number;
}

/** WarehouseLogResp */
export interface WarehouseLogResp {
  /** 日志列表 */
  logsList?: WarehouseLogBean[];
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

/** WarehouseMappingReq */
export interface WarehouseMappingReq {
  /** 映射仓库ID */
  mappingWarehouseId?: number[];
  /**
   * 仓库ID
   * @format int64
   */
  warehouseId?: number;
}

/** WarehouseOrderBaseInfoBean */
export interface WarehouseOrderBaseInfoBean {
  button?: Button;
  /** 仓配订单号 */
  code?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  customerCode?: string;
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
  /**
   * 大状态: 100-待确认 200-已确认 300-已出库 500-异常 600-作废
   * @format int32
   */
  status?: number;
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
  waitConfirm?: number;
}

/** WarehouseQueryReq */
export interface WarehouseQueryReq {
  /** 关键字 仓库ID、仓库名称、积加仓库名称 易仓名称 */
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
  /** 平台Code: WALMART, AMAZON */
  platformCode?: string;
  /**
   * 服务商 1-谷仓 2-amos
   * @format int32
   */
  providerType?: number;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /**
   * 启用状态 0-禁用 1-启用
   * @format int32
   */
  status?: number;
  /**
   * 仓库类型 1-自营仓库 2-供应商仓 3-三方仓 4-平台仓
   * @format int32
   */
  warehouseType?: number;
  /** 仓库类型 1-自营仓库 2-供应商仓 3-三方仓 4-平台仓 */
  warehouseTypes?: string[];
}

/** WarehouseQueryResp */
export interface WarehouseQueryResp {
  code?: string;
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
  /** 仓库列表 */
  warehouseList?: WarehouseBaseBean[];
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
  /**
   * 状态 0-失效 1-处理中 2-完成
   * @format int32
   */
  status?: number;
  /** 仓库编码 */
  warehouseCode?: string;
}

/** WarehouseShipResp */
export interface WarehouseShipResp {
  warehouseShipList?: WarehouseShip[];
}

/** WarehouseSimpleQueryReq */
export interface WarehouseSimpleQueryReq {
  /** 平台Code: WALMART, AMAZON */
  platformCode?: string;
  /**
   * 启用状态 0-禁用 1-启用
   * @format int32
   */
  status?: number;
  /** 仓库类型 1-自营仓库 2-供应商仓 3-三方仓 4-平台仓 */
  warehouseTypes?: number[];
}

/** WarehouseSyncReq */
export interface WarehouseSyncReq {
  /**
   * 仓库ID -单个刷新填写，不填写批量刷新
   * @format int64
   */
  warehouseId?: number;
}

/** WarehouseUpdateReq */
export interface WarehouseUpdateReq {
  /**
   * 是否中仓 0-否 1-是
   * @format int32
   */
  isCenterWarehouse?: number;
  /**
   * 仓库ID
   * @format int64
   */
  warehouseId?: number;
}

/** WarehouseVatAddReq */
export interface WarehouseVatAddReq {
  /**
   * vat编号
   * @minLength 0
   * @maxLength 200
   */
  vat?: string;
  /** 仓库编码 */
  warehouseCode?: string;
}

/** WarehouseVatBean */
export interface WarehouseVatBean {
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 生效时间
   * @format date-time
   */
  effectiveTime?: string;
  /**
   * 失效时间
   * @format date-time
   */
  expirationTime?: string;
  /**
   * id
   * @format int32
   */
  id?: number;
  /**
   * 状态
   * @format int32
   */
  status?: number;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /** vat */
  vat?: string;
  /** 仓库编码 */
  warehouseCode?: string;
  /** 仓库名称 */
  warehouseName?: string;
}

/** WarehouseVatQueryListResp */
export interface WarehouseVatQueryListResp {
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

/** WarehouseVatQueryReq */
export interface WarehouseVatQueryReq {
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
}

/** WarehouseVatStatusReq */
export interface WarehouseVatStatusReq {
  /**
   * id
   * @format int32
   */
  id: number;
  /**
   * 状态 0-禁用 1-启用
   * @format int32
   * @min 0
   * @exclusiveMin false
   * @max 9223372036854776000
   * @exclusiveMax false
   */
  status: number;
}

/** WarehouseVatUpdateReq */
export interface WarehouseVatUpdateReq {
  /**
   * 生效时间
   * @format date-time
   */
  effectiveTime?: string;
  /**
   * 失效时间
   * @format date-time
   */
  expirationTime?: string;
  /**
   * id
   * @format int32
   */
  id?: number;
  /** vat编号 */
  vat?: string;
  /** 仓库编码 */
  warehouseCode?: string;
}

/** WeekItemResp */
export interface WeekItemResp {
  /**
   * 未来四周销量预测平均值
   * @format int32
   */
  avg4ForecastNum?: number;
  /** 数据来源:系统建议, xxx手动修改 */
  dataSource?: string;
  /**
   * 预测数量
   * @format int32
   */
  forecastNum?: number;
  /** 在制单据 */
  inProcessOrderList?: TransferOrder[];
  /** 在途单据 */
  inTransitOrderList?: TransferOrder[];
  /**
   * 平台期初库存
   * @format int32
   */
  platformBeginInventory?: number;
  /**
   * 平台期末库存
   * @format int32
   */
  platformEndInventory?: number;
  /**
   * 货件在途延期
   * @format int32
   */
  shipmentDelayedTransitNum?: number;
  /**
   * 在制库存数量
   * @format int32
   */
  shipmentInProcessInventory?: number;
  /**
   * 货件到货数量
   * @format int32
   */
  shipmentNum?: number;
  /**
   * 货件在途库存
   * @format int32
   */
  shipmentTransitInventory?: number;
  /**
   * 发货指令待发数量
   * @format int32
   */
  shippingCommondWaitSendNum?: number;
  /** 发货指令待发数量 是不是锁定 */
  shippingCommondWaitSendNumLock?: boolean;
  /**
   * 周转天数
   * @format int32
   */
  turnoverDay?: number;
  /**
   * 周转天数颜色 0-黑色 1-红色 2-黄色 3-绿色
   * @format int32
   */
  turnoverDayColorCode?: number;
  /** 周数 */
  week?: string;
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

/** CommonResp«CommonExportResp» */
export interface CommonRespCommonExportResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: CommonExportResp;
  traceId?: string;
}

/** CommonResp«CustomerCreditLimitQueryListResp» */
export interface CommonRespCustomerCreditLimitQueryListResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: CustomerCreditLimitQueryListResp;
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

/** CommonResp«GucangPackageListResp» */
export interface CommonRespGucangPackageListResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: GucangPackageListResp;
  traceId?: string;
}

/** CommonResp«LadingBillResp» */
export interface CommonRespLadingBillResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: LadingBillResp;
  traceId?: string;
}

/** CommonResp«List«CustomerCreditLimitBeanRpc»» */
export interface CommonRespListCustomerCreditLimitBeanRpc {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: CustomerCreditLimitBeanRpc[];
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

/** CommonResp«List«FirstLogisticsOperateLogBean»» */
export interface CommonRespListFirstLogisticsOperateLogBean {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: FirstLogisticsOperateLogBean[];
  traceId?: string;
}

/** CommonResp«List«InventorySnapQueryResp»» */
export interface CommonRespListInventorySnapQueryResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: InventorySnapQueryResp[];
  traceId?: string;
}

/** CommonResp«List«LogisticsOpLog»» */
export interface CommonRespListLogisticsOpLog {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: LogisticsOpLog[];
  traceId?: string;
}

/** CommonResp«List«OperationLogBean»» */
export interface CommonRespListOperationLogBean {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: OperationLogBean[];
  traceId?: string;
}

/** CommonResp«List«OsLogisticsClaimLog»» */
export interface CommonRespListOsLogisticsClaimLog {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: OsLogisticsClaimLog[];
  traceId?: string;
}

/** CommonResp«List«OsLogisticsClaim»» */
export interface CommonRespListOsLogisticsClaim {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: OsLogisticsClaim[];
  traceId?: string;
}

/** CommonResp«List«PlanTurnoverStrategyTemplateBean»» */
export interface CommonRespListPlanTurnoverStrategyTemplateBean {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: PlanTurnoverStrategyTemplateBean[];
  traceId?: string;
}

/** CommonResp«List«PrDownDetailItemReq»» */
export interface CommonRespListPrDownDetailItemReq {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: PrDownDetailItemReq[];
  traceId?: string;
}

/** CommonResp«List«WarehouseCascadeTreeNodeResp»» */
export interface CommonRespListWarehouseCascadeTreeNodeResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: WarehouseCascadeTreeNodeResp[];
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

/** CommonResp«List«string»» */
export interface CommonRespListString {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: string[];
  traceId?: string;
}

/** CommonResp«LogisticsChannelDetailResp» */
export interface CommonRespLogisticsChannelDetailResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: LogisticsChannelDetailResp;
  traceId?: string;
}

/** CommonResp«LogisticsSupplierAccountTokenResp» */
export interface CommonRespLogisticsSupplierAccountTokenResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: LogisticsSupplierAccountTokenResp;
  traceId?: string;
}

/** CommonResp«OperationPackageOrderResp» */
export interface CommonRespOperationPackageOrderResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: OperationPackageOrderResp;
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

/** CommonResp«OsLogisticsClaim» */
export interface CommonRespOsLogisticsClaim {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: OsLogisticsClaim;
  traceId?: string;
}

/** CommonResp«PackageChooseSourceOrderListResp» */
export interface CommonRespPackageChooseSourceOrderListResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: PackageChooseSourceOrderListResp;
  traceId?: string;
}

/** CommonResp«PackageMarkDataPageResp» */
export interface CommonRespPackageMarkDataPageResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: PackageMarkDataPageResp;
  traceId?: string;
}

/** CommonResp«PackageMarkDataResp» */
export interface CommonRespPackageMarkDataResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: PackageMarkDataResp;
  traceId?: string;
}

/** CommonResp«PackageMarkListQueryResp» */
export interface CommonRespPackageMarkListQueryResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: PackageMarkListQueryResp;
  traceId?: string;
}

/** CommonResp«PalletDataPageResp» */
export interface CommonRespPalletDataPageResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: PalletDataPageResp;
  traceId?: string;
}

/** CommonResp«PalletDataResp» */
export interface CommonRespPalletDataResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: PalletDataResp;
  traceId?: string;
}

/** CommonResp«PalletInboundResp» */
export interface CommonRespPalletInboundResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: PalletInboundResp;
  traceId?: string;
}

/** CommonResp«PalletStatusBean» */
export interface CommonRespPalletStatusBean {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: PalletStatusBean;
  traceId?: string;
}

/** CommonResp«PlanTurnOverCacuBean» */
export interface CommonRespPlanTurnOverCacuBean {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: PlanTurnOverCacuBean;
  traceId?: string;
}

/** CommonResp«ProductConfigPropertyResp» */
export interface CommonRespProductConfigPropertyResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: ProductConfigPropertyResp;
  traceId?: string;
}

/** CommonResp«RemovalDetailBean» */
export interface CommonRespRemovalDetailBean {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: RemovalDetailBean;
  traceId?: string;
}

/** CommonResp«TiktokStockAdjustmentQuerySkuIdInfoResp» */
export interface CommonRespTiktokStockAdjustmentQuerySkuIdInfoResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: TiktokStockAdjustmentQuerySkuIdInfoResp;
  traceId?: string;
}

/** CommonResp«TiktokStockAdjustmentQuerySkuInfoResp» */
export interface CommonRespTiktokStockAdjustmentQuerySkuInfoResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: TiktokStockAdjustmentQuerySkuInfoResp;
  traceId?: string;
}

/** CommonResp«TiktokStockAdjustmentQuerySkuShopInfoResp» */
export interface CommonRespTiktokStockAdjustmentQuerySkuShopInfoResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: TiktokStockAdjustmentQuerySkuShopInfoResp;
  traceId?: string;
}

/** CommonResp«TiktokStockAdjustmentQueryStockResp» */
export interface CommonRespTiktokStockAdjustmentQueryStockResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: TiktokStockAdjustmentQueryStockResp;
  traceId?: string;
}

/** CommonResp«TiktokStockAdjustmentSyncStatusResp» */
export interface CommonRespTiktokStockAdjustmentSyncStatusResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: TiktokStockAdjustmentSyncStatusResp;
  traceId?: string;
}

/** CommonResp«TkStockAdjustmentDetailQueryResp» */
export interface CommonRespTkStockAdjustmentDetailQueryResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: TkStockAdjustmentDetailQueryResp;
  traceId?: string;
}

/** CommonResp«TkStockAdjustmentQueryListResp» */
export interface CommonRespTkStockAdjustmentQueryListResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: TkStockAdjustmentQueryListResp;
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

/** DubboCommonResp«string» */
export interface DubboCommonRespString {
  code?: string;
  message?: string;
  result?: string;
  traceId?: string;
}
