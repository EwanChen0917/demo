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

/** AmazonFileBean */
export interface AmazonFileBean {
  /** 记录编号 */
  code?: string;
  /**
   * 生成时间
   * @format date-time
   */
  createTime?: string;
  /** 文件名称 */
  fileName?: string;
  /**
   * 文件大小
   * @format int64
   */
  fileSize?: number;
  /** 文件大小 */
  fileSizeDesc?: string;
  /** 文件类型 */
  fileType?: string;
  /** 操作人 */
  operatorCode?: string;
  /** 操作人 */
  operatorName?: string;
  /**
   * 上传时间
   * @format date-time
   */
  uploadTime?: string;
  /** 文件URL */
  url?: string;
}

/** AmazonFileDeleteReq */
export interface AmazonFileDeleteReq {
  /** 文件记录编码列表 */
  codes: string[];
}

/** AmazonFileFailBean */
export interface AmazonFileFailBean {
  errorMsg?: string;
  fileName?: string;
}

/** AmazonFileListReq */
export interface AmazonFileListReq {
  /** 文件名称 */
  fileName?: string;
  /** 文件类型(XML、PDF) */
  fileType?: string;
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
   * 上传结束时间
   * @format date
   */
  uploadEnd?: string;
  /**
   * 上传开始时间
   * @format date
   */
  uploadStart?: string;
}

/** AmazonFileListResp */
export interface AmazonFileListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 文件生成记录列表 */
  recordList?: AmazonFileBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** AmazonOrderDetailQueryReq */
export interface AmazonOrderDetailQueryReq {
  /** 订单号 */
  orderCode: string;
  /** 店铺 */
  shopName?: string;
  /** 站点 */
  site?: string;
}

/** AmazonOrderDetailResp */
export interface AmazonOrderDetailResp {
  /** 退款记录 */
  refundList?: RefundBean[];
  /** 补发记录 */
  replacementList?: ReplacementBean[];
}

/** AmazonOrderListReq */
export interface AmazonOrderListReq {
  /** 订单号/邮箱等 */
  keyword: string;
}

/** AmazonOrderListResp */
export interface AmazonOrderListResp {
  /** 订单数据 */
  orderList?: OrderBean[];
}

/** AmazonProductListingBean */
export interface AmazonProductListingBean {
  /** 子ASIN */
  asin?: string;
  /** msku-productSku（amazon） */
  msku?: string;
  /** 价格 */
  price?: number;
  /** 商品名称 */
  productName?: string;
  /** 商品url */
  productUrl?: string;
  /** sellerSku */
  sellerSku?: string;
  /** 店铺 */
  shopName?: string;
  /** spu */
  spuCode?: string;
  /**
   * 状态: 0为active, 非0为inactive
   * @format int32
   */
  state?: number;
  /**
   * 库存
   * @format int32
   */
  stockQty?: number;
}

/** AmazonRefundReasonBean */
export interface AmazonRefundReasonBean {
  /** 原因 */
  reasonEn?: string;
}

/** AmazonRefundReasonResp */
export interface AmazonRefundReasonResp {
  /** 结果 */
  result?: AmazonRefundReasonBean[];
}

/** BatchUploadReq */
export interface BatchUploadReq {
  /** 上传文件列表 */
  uploadReqs: UploadReq[];
}

/** BatchUploadResp */
export interface BatchUploadResp {
  failList?: AmazonFileFailBean[];
  /** 上传文件记录列表 */
  uploadList?: AmazonFileBean[];
}

/** OrderBean */
export interface OrderBean {
  /** 订单号 */
  orderNumber?: string;
  /** 店铺 */
  shopName?: string;
  /** 站点 */
  site?: string;
}

/** ProductSkuNumberOfReplacementBean */
export interface ProductSkuNumberOfReplacementBean {
  /** MSKU */
  msku?: string;
  /**
   * 商品数量
   * @format int32
   */
  quantity?: number;
}

/** RefundBean */
export interface RefundBean {
  /** 审核状态 */
  approvalStatusDesc?: string;
  /** Classification */
  classification?: string;
  /** email */
  email?: string;
  /** 操作人 */
  operatorName?: string;
  /** 订单号 */
  orderCode?: string;
  /** 退款金额 */
  refundAmount?: number;
  /** 退款方式 */
  refundMethod?: string;
  /** 退款状态 */
  refundStatusDesc?: string;
  /** 退款类型 */
  refundTypeDesc?: string;
  /**
   * 提交时间
   * @format date
   */
  submitTime?: string;
  /** ticketId */
  ticketId?: string;
}

/** ReplacementBean */
export interface ReplacementBean {
  /** 客户地址 */
  address?: string;
  /** Classification */
  classification?: string;
  /** 客户邮箱 */
  email?: string;
  /**
   * 积加订单状态
   * @format int32
   */
  jjStatus?: number;
  /** 积加订单状态转义 */
  jjStatusDesc?: string;
  /** 产品信息SKU */
  msku?: string;
  name?: string;
  /** 提交人 */
  operatorName?: string;
  /** 补发订单号 */
  orderCode?: string;
  /** 补发SKU&数量明细 */
  productSkuNumberOfReplacement?: ProductSkuNumberOfReplacementBean[];
  /** 产品信息名称 */
  productTitle?: string;
  /** 数量 */
  quantityStr?: string;
  /** 订单号 */
  srcOrderCode?: string;
  /**
   * 提交时间
   * @format date
   */
  submitTime?: string;
  /** 工单号ticketId */
  ticketId?: string;
  /** 物流查询网址 */
  trackMainUrl?: string;
  /** 补发跟踪号 */
  trackingNumber?: string;
  /** 补发跟踪号 */
  trackingNumberList?: string[];
}

/** UploadReq */
export interface UploadReq {
  /** 上传地址名字 */
  fileName: string;
  /** 绝对路径 */
  fileUrl?: string;
  /** 上传地址 */
  ossKey: string;
}

/** CommonResp«AmazonOrderListResp» */
export interface CommonRespAmazonOrderListResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: AmazonOrderListResp;
  traceId?: string;
}

/** CommonResp«AmazonRefundReasonResp» */
export interface CommonRespAmazonRefundReasonResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: AmazonRefundReasonResp;
  traceId?: string;
}

/** CommonResp«BatchUploadResp» */
export interface CommonRespBatchUploadResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: BatchUploadResp;
  traceId?: string;
}

/** CommonResp«Void» */
export interface CommonRespVoid {
  code?: string;
  enMessage?: string;
  message?: string;
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

/** ts-amazon补发1项 */
export interface TsAmazon1 {
  /** 操作人 */
  operatorName?: string;
  /**
   * 订单状态
   * @format int32
   */
  orderStatus?: number;
  /** 订单状态转义 */
  orderStatusDesc?: string;
  /**
   * 补发日期
   * @format date
   */
  replacementDate?: string;
  /** 补发订单号 */
  replacementOrderCode?: string;
}

/** ts-amazon补发2项 */
export interface TsAmazon2 {
  /**
   * 送达日期
   * @format date-time
   */
  deliveryDate?: string;
  /**
   * 发货日期
   * @format date-time
   */
  shippingDate?: string;
  /** 跟踪号 */
  trackingNumber?: string;
}

/**
 * ts-amazon订单查询响应
 * ts-amazon订单查询响应
 */
export interface TsAmazon {
  /** 已退总税额 */
  alreadyRefundTaxAmount?: number;
  /** 原币种 */
  currency?: string;
  /** 原币种符号 */
  currencySymbol?: string;
  /**
   * 已发货数量
   * @format int32
   */
  deliveredQty?: number;
  /** 折扣金额 */
  discount?: number;
  /** 邮箱 */
  emailAddress?: string;
  /** 店铺是否授权成功 */
  isAuth?: boolean;
  /** 提示信息 */
  msg?: string;
  /** 可退金额 */
  netPayment?: number;
  /** 订单号 */
  orderCode?: string;
  /** ts-amazon订单明细 */
  orderItemList?: TsAmazon7[];
  /** ts-amazon补发订单 */
  orderReplacementList?: TsAmazon1[];
  /** ts-amazon补发运单 */
  orderReplacementTrackingList?: TsAmazon2[];
  /**
   * 订单状态
   * @format int32
   */
  orderStatus?: number;
  /** 订单状态 */
  orderStatusDesc?: string;
  /**
   * 订单时间
   * @format date-time
   */
  orderTime?: string;
  /** 折后金额 */
  orderValue?: number;
  /** 手机号 */
  phoneNumber?: string;
  /** 平台 */
  platform?: string;
  /** 补发SKU&数量明细 */
  productSkuNumberOfReplacement?: ProductSkuNumberOfReplacementBean[];
  /**
   * 产品数量
   * @format int32
   */
  productsQuantity?: number;
  /** 退款记录 */
  refundAmountList?: TsAmazon8[];
  /** 运费 */
  shippingFee?: number;
  /** 运单号 */
  shippingNoList?: string[];
  /** 店铺 */
  shopName?: string;
  /** 站点 */
  site?: string;
  /** 折前金额 */
  subtotal?: number;
  /** 总税额 */
  taxes?: number;
  /** 物流查询网址 */
  trackMainUrl?: string;
  /**
   * 补发警告次数
   * @format int32
   */
  warnCount?: number;
}

/**
 * ts-amazon订单查询请求
 * ts-amazon订单查询请求
 */
export interface TsAmazon2 {
  /** 订单号 */
  orderCode: string;
  /** 店铺 */
  shopName?: string;
  /** 站点 */
  site?: string;
}

/** ts-amazon订单补发货明细 */
export interface TsAmazon3 {
  /** 子ASIN */
  asin?: string;
  /** msku */
  msku?: string;
  /** price */
  price?: number;
  /**
   * 数量
   * @format int32
   * @min 1
   * @exclusiveMin false
   */
  quantity?: number;
  /** sellerSku */
  sellerSku?: string;
}

/** ts-amazon订单补发货请求 */
export interface TsAmazon4 {
  /** apartmentSuiteEtc */
  apartmentSuiteEtc?: string;
  /** 城市 */
  city: string;
  /** Country */
  country?: string;
  /** first name */
  firstName?: string;
  /** last name */
  lastName: string;
  /** 订单编号 */
  orderCode?: string;
  /** 手机号 */
  phone?: string;
  /** PostalCode */
  postalCode: string;
  /** Province/State */
  provinceCode?: string;
  /** Zendesk上的Classification信息 */
  remark?: string;
  /** 补货商品信息 */
  replacementItemList?: TsAmazon3[];
  /** 被补发的msku */
  replacementMskuList?: string[];
  /** 店铺 */
  shopName: string;
  /** 站点 */
  site?: string;
  /** streetAddress */
  streetAddress?: string;
  /** 唯一编码--幂等 */
  uniqueCode?: string;
  /** zendeskId */
  zendeskId: string;
}

/** ts-amazon订单退款商品信息 */
export interface TsAmazon5 {
  /** asin */
  asin?: string;
  /** msku */
  msku?: string;
  /** orderItemId */
  orderItemId?: string;
  /**
   * 数量
   * @format int32
   */
  quantity?: number;
  /** sellerSku */
  sellerSku?: string;
}

/** ts-amazon订单退款请求 */
export interface TsAmazon6 {
  /** 可退金额 */
  netPayment: number;
  /** 订单号 */
  orderCode?: string;
  /**
   * 退款金额
   * @min 0
   * @exclusiveMin true
   */
  refundAmount: number;
  /** 退款详情 */
  refundDetails?: string;
  /** 退款商品信息 */
  refundItemList?: TsAmazon5[];
  /** 退款方式 */
  refundMethod?: string;
  /** amazon退款原因 */
  refundReason: string;
  /** 运费 */
  refundShippingCosts: number;
  /** 退款税额 */
  refundTaxAmount?: number;
  /** 店铺 */
  shopName?: string;
  /** 站点 */
  site?: string;
  /** 唯一编码--幂等 */
  uniqueCode?: string;
  /** zendeskId */
  zendeskId: string;
}

/** ts-amazon订单项 */
export interface TsAmazon7 {
  /** 子ASIN */
  asin?: string;
  /**
   * 已发货数量
   * @format int32
   */
  deliveredQty?: number;
  /** msku */
  msku?: string;
  /** 商品订单行 */
  orderItemId?: string;
  /** 价格 */
  price?: number;
  /** 价格币种 */
  priceCurrency?: string;
  /** 价格币种标识 */
  priceCurrencySymbol?: string;
  /** 商品名称 */
  productName?: string;
  /** 商品url */
  productUrl?: string;
  /**
   * 数量
   * @format int32
   */
  quantity?: number;
  /** sellerSku */
  sellerSku?: string;
  /**
   * 状态: 0为active, 非0为inactive
   * @format int32
   */
  state?: number;
  /**
   * 库存
   * @format int32
   */
  stockQty?: number;
}

/** ts-amazon退款项 */
export interface TsAmazon8 {
  /** 金额 */
  amount?: number;
  /** 币种 */
  amountCurrency?: string;
  /** 币种符号 */
  amountCurrencySymbol?: string;
  /** 操作人 */
  operatorName?: string;
  /** 退款方式 */
  refundMethod?: string;
  /** 退款状态 */
  refundStatus?: string;
  /**
   * 退款时间
   * @format date
   */
  refundTime?: string;
}

/** ts-获取amazon商品响应 */
export interface TsAmazon {
  /** 商品列表 */
  resultList?: AmazonProductListingBean[];
}

/** ts-获取amazon商品请求 */
export interface TsAmazon2 {
  /** supplySKu/名称模糊 */
  keyword?: string;
  /** 店铺 */
  shopName?: string;
}
