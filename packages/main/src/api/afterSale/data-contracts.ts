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

/** CommonExportResp */
export interface CommonExportResp {
  /** app标识 */
  appCode?: string;
  /** 下载链接 */
  downloadUrl?: string;
  /** 模块标识 */
  moduleCode?: string;
}

/** ItemResp */
export interface ItemResp {
  /** 标签组编码 */
  categoryCode?: string;
  /** 分类编码 */
  classification?: string;
  /** AI分类 */
  classificationAi?: string;
  /** classification中文映射 */
  classificationName?: string;
  /** classification原始值 */
  classificationValue?: string;
  /** 客服组 */
  customerGroup?: string;
  /** 客服组名称 */
  customerGroupDesc?: string;
  /** 一级标签 */
  firstLevel?: string;
  /** 一级标签名称 */
  firstLevelName?: string;
  /** 四级标签名称 */
  fourthLevelName?: string;
  /**
   * 重要等级
   * @format int32
   */
  importantLevel?: number;
  /**
   * 是否AI
   * @format int32
   */
  isAi?: number;
  /** 标签编码 */
  labelCode?: string;
  /** 标签来源 */
  labelSource?: string;
  /** 标签类型 */
  labelType?: string;
  /** 标签类型名称 */
  labelTypeDesc?: string;
  /** 人员 */
  owner?: string;
  /** 配件中文映射 */
  partsName?: string;
  /** 配件Tag */
  partsTag?: string;
  /** 配件VALUE */
  partsValue?: string;
  /** 产品品类 */
  productCategory?: string;
  /** 品线 */
  productLine?: string;
  /** 品线名称 */
  productLineName?: string;
  /** Redline等级 */
  redlineLevel?: string;
  /** 二级标签 */
  secondLevel?: string;
  /** 二级标签名称 */
  secondLevelName?: string;
  /** 三级标签 */
  thirdLevel?: string;
  /** 三级标签名称 */
  thirdLevelName?: string;
  /**
   * 是否现在正在使用
   * @format int32
   */
  useFlag?: number;
}

/** OptionResp */
export interface OptionResp {
  /** 名称 */
  label?: string;
  /** 值 */
  value?: string;
}

/** RefundAuditReq */
export interface RefundAuditReq {
  /** 审核状态 */
  approvalStatusCode: string;
  /** id集合 */
  idList: number[];
}

/** RefundBatchDeletedReq */
export interface RefundBatchDeletedReq {
  /** 集合ID */
  idList?: number[];
}

/** RefundBatchRePushReq */
export interface RefundBatchRePushReq {
  /** 集合ID */
  idList?: number[];
}

/** RefundEditRemarkReq */
export interface RefundEditRemarkReq {
  /**
   * id
   * @format int64
   */
  id: number;
  /** 备注 */
  remark: string;
}

/** RefundQueryListBean */
export interface RefundQueryListBean {
  /** 审核状态转义 */
  approvalStatus?: string;
  /** 审核状态code */
  approvalStatusCode?: string;
  /** 渠道 */
  channel?: string;
  /** classification */
  classification?: string;
  /** 客户邮箱 */
  customerEmail?: string;
  /** 客服员工 */
  customerServiceStaff?: string;
  /** first_level */
  firstLevel?: string;
  /**
   * id
   * @format int64
   */
  id?: number;
  /** 退款单状态转义 */
  jjRefundStatus?: string;
  /** 退款单状态code */
  jjRefundStatusCode?: string;
  /** Product Sku */
  msku?: string;
  /** Sku退款金额 */
  mskuRefundAmountStr?: string;
  /** 订单号 */
  orderCode?: string;
  /** pump part */
  pumpPart?: string;
  /** 原订单订购时间(北京) */
  purchaseTimeBeijing?: string;
  /** 推送失败原因 */
  pushErrorMsg?: string;
  /**
   * 推送状态
   * @format int32
   */
  pushStatus?: number;
  /** 推送状态转义 */
  pushStatusDesc?: string;
  /**
   * 是否重推: 0-否 1-是
   * @format int32
   */
  rePush?: number;
  /** 是否重推 */
  rePushDesc?: string;
  /** 原订单收件国家 */
  receiverAddressCountry?: string;
  /** 原订单收件州省 */
  receiverAddressState?: string;
  /** 退款金额 */
  refundAmount?: number;
  /** 退款单号 */
  refundCode?: string;
  /** 退款币种 */
  refundCurrency?: string;
  /**
   * 退款时间
   * @format date
   */
  refundDate?: string;
  /** 退款详情 */
  refundDetails?: string;
  /** 退款方式 */
  refundMethod?: string;
  /** 退款方式描述 */
  refundMethodDesc?: string;
  /** 退款原因 */
  refundReason?: string;
  /** 退款类型转义 */
  refundType?: string;
  /** 退款类型code */
  refundTypeCode?: string;
  /** 备注 */
  remark?: string;
  /** second_level */
  secondLevel?: string;
  /** 店铺 */
  shopName?: string;
  /** 后台退款状态转义 */
  shopifyRefundStatus?: string;
  /** 后台退款状态code */
  shopifyRefundStatusCode?: string;
  /** 站点 */
  site?: string;
  /** VOC产品型号 */
  vocModel?: string;
  /** 工单号 */
  zendeskId?: string;
}

/** RefundQueryListReq */
export interface RefundQueryListReq {
  /** 审核状态 */
  approvalStatusCode?: string;
  /** 渠道 */
  channel?: string;
  /** 客户邮箱 */
  customerEmail?: string;
  /** 退款单状态 */
  jjRefundStatusCode?: string;
  /** msku */
  mskuList?: string[];
  /** 订单号 */
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
  /** 推送状态 */
  pushStatusList?: number[];
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /**
   * 是否已重推: 0-否 1-是
   * @format int32
   */
  rePush?: number;
  /**
   * 退款时间结束时间
   * @format date
   */
  refundDateEnd?: string;
  /**
   * 退款时间开始时间
   * @format date
   */
  refundDateStart?: string;
  /** 退款方式 */
  refundMethod?: string;
  /** 退款类型 */
  refundTypeCodeList?: string[];
  /** 后台退款状态 */
  shopifyRefundStatusCode?: string;
  /**
   * 原单订购结束时间(北京)
   * @format date-time
   */
  srcDateEnd?: string;
  /**
   * 原单订购开始时间(北京)
   * @format date-time
   */
  srcDateStart?: string;
  /** 工单号 */
  zendeskIdList?: string[];
}

/** RefundQueryListResp */
export interface RefundQueryListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 结果 */
  recordList?: RefundQueryListBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** ReplacemenetShopQueryReq */
export interface ReplacemenetShopQueryReq {
  /** 渠道 */
  channel?: string;
  /** 店铺 */
  shopName?: string;
}

/** ReplacementBatchDeletedReq */
export interface ReplacementBatchDeletedReq {
  /** 集合ID */
  idList?: number[];
}

/** ReplacementEditAddressReq */
export interface ReplacementEditAddressReq {
  /** apartment_suite_etc */
  apartmentSuiteEtc?: string;
  /** city */
  city: string;
  /** country */
  country: string;
  /**
   * 主表id
   * @format int64
   */
  id?: number;
  /** postal_code */
  postalCode: string;
  /** province */
  province?: string;
  /** street addressStreet address */
  streetAddress: string;
}

/** ReplacementEditRemarkReq */
export interface ReplacementEditRemarkReq {
  /**
   * id
   * @format int64
   */
  id: number;
  /** 备注 */
  systemRemark?: string;
}

/** ReplacementQueryListBean */
export interface ReplacementQueryListBean {
  /** address */
  address?: string;
  /** 渠道 */
  channel?: string;
  /** city */
  city?: string;
  /** classification */
  classification?: string;
  /** country */
  country?: string;
  /** 客服员工号 */
  creator?: string;
  /** 客户编码 */
  customerCode?: string;
  /** 客户名称 */
  customerName?: string;
  /** b2b补发备注 */
  customerRemark?: string;
  /** 客服人员 */
  customerServiceStaff?: string;
  /** email */
  email?: string;
  /** first_level */
  firstLevel?: string;
  /**
   * 主表id
   * @format int64
   */
  id?: number;
  /**
   * 明细id
   * @format int64
   */
  itemId?: number;
  /** 补发Product Sku */
  msku?: string;
  /** 收件人 */
  name?: string;
  /** Replacement order */
  orderCode?: string;
  /**
   * 订单状态
   * @format int32
   */
  orderStatus?: number;
  /** 订单状态转义 */
  orderStatusDesc?: string;
  /** phone */
  phone?: string;
  /** postal_code */
  postalCode?: string;
  /** Replacement Value */
  price?: number;
  /** province */
  province?: string;
  /** pump part */
  pumpPart?: string;
  /** 原单订购时间(北京) */
  purchaseTimeBeijing?: string;
  /** 推送失败原因 */
  pushErrorMsg?: string;
  /**
   * 推送状态
   * @format int32
   */
  pushStatus?: number;
  /** 推送状态转义 */
  pushStatusDesc?: string;
  /**
   * 补发sku数量
   * @format int32
   */
  quantity?: number;
  /**
   * 是否重推
   * @format int32
   */
  rePush?: number;
  /** 是否重推 */
  rePushDesc?: string;
  /** 原订单收件国家 */
  receiverAddressCountry?: string;
  /** 原订单收件州省 */
  receiverAddressState?: string;
  /**
   * data
   * @format date
   */
  refundDate?: string;
  /** TS备注 */
  remark?: string;
  /** replacementCode */
  replacementCode?: string;
  /** 问题Product Sku */
  replacementMsku?: string;
  /** second_level */
  secondLevel?: string;
  /** 物流 */
  shippingCode?: string;
  /** 物流 */
  shippingDesc?: string;
  /** 店铺 */
  shopName?: string;
  /** 站点 */
  site?: string;
  /** Original Order */
  srcOrderCode?: string;
  /** street_address */
  streetAddress?: string;
  /** ERP备注 */
  systemRemark?: string;
  /** VOC产品型号 */
  vocModel?: string;
  /** 仓库 */
  warehouseCode?: string;
  /** 仓库 */
  warehouseDesc?: string;
  /** 工单号 */
  zendeskId?: string;
}

/** ReplacementQueryListReq */
export interface ReplacementQueryListReq {
  /** 渠道-shopify amazon offlinechannel */
  channel?: string;
  /** 客户编码列表 */
  customerCodeList?: string[];
  /** 邮箱 */
  email?: string;
  /** msku集合 */
  mskuList?: string[];
  /** 收件人 */
  name?: string;
  /** 补发单号 */
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
  /** 推送状态 */
  pushStatusList?: number[];
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /**
   * 是否已重推: 0-否 1-是
   * @format int32
   */
  rePush?: number;
  /**
   * date结束时间
   * @format date
   */
  refundDateEnd?: string;
  /**
   * date开始时间
   * @format date
   */
  refundDateStart?: string;
  /** 补发Sku集合 */
  replacementMskuList?: string[];
  /** 物流 */
  shippingCode?: string;
  /**
   * 原单订购结束时间(北京)
   * @format date-time
   */
  srcDateEnd?: string;
  /**
   * 原单订购开始时间(北京)
   * @format date-time
   */
  srcDateStart?: string;
  /** 原订单号 */
  srcOrderCode?: string;
  /** 原订单号 */
  srcOrderCodeList?: string[];
  /** 仓库 */
  warehouseCode?: string;
  /** 工单号 */
  zendeskIdList?: string[];
}

/** ReplacementQueryListResp */
export interface ReplacementQueryListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 结果 */
  recordList?: ReplacementQueryListBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** ReplacementShopBean */
export interface ReplacementShopBean {
  /** 店铺 */
  shopName?: string;
}

/** ReplacementShopQueryResp */
export interface ReplacementShopQueryResp {
  /** 结果 */
  result?: ReplacementShopBean[];
}

/** ReplacementShopReq */
export interface ReplacementShopReq {
  /**
   * 主表id
   * @format int64
   */
  id?: number;
  /** 店铺 */
  shopName?: string;
}

/** ReplacementSkuReq */
export interface ReplacementSkuReq {
  /** 子ASIN */
  asin?: string;
  /**
   * 主表id
   * @format int64
   */
  id?: number;
  /**
   * 明细itemId
   * @format int64
   */
  itemId?: number;
  /** msku */
  msku?: string;
  /** price */
  price?: number;
  /** sellerSku */
  sellerSku?: string;
}

/** ServiceLabelQueryDetailReq */
export interface ServiceLabelQueryDetailReq {
  /** 分类编码 */
  classification: string;
  /** 配件Tag */
  partsTag?: string;
  /** 产品品类 */
  productCategory?: string;
  /** 品线 */
  productLine?: string;
}

/** ServiceLabelQueryDetailResp */
export interface ServiceLabelQueryDetailResp {
  /** 标签组编码 */
  categoryCode?: string;
  /** 分类编码 */
  classification?: string;
  /** AI分类 */
  classificationAi?: string;
  /** classification中文映射 */
  classificationName?: string;
  /** classification原始值 */
  classificationValue?: string;
  /** 客服组 */
  customerGroup?: string;
  /** 一级标签 */
  firstLevel?: string;
  /** 一级标签名称 */
  firstLevelName?: string;
  /** 四级标签名称 */
  fourthLevelName?: string;
  /**
   * 重要等级
   * @format int32
   */
  importantLevel?: number;
  /**
   * 是否AI
   * @format int32
   */
  isAi?: number;
  /** 标签编码 */
  labelCode?: string;
  /** 标签来源 */
  labelSource?: string;
  /** 标签类型 */
  labelType?: string;
  /** 人员 */
  owner?: string;
  /** 配件中文映射 */
  partsName?: string;
  /** 配件Tag */
  partsTag?: string;
  /** 配件VALUE */
  partsValue?: string;
  /** 产品品类 */
  productCategory?: string;
  /** 品线 */
  productLine?: string;
  /** Redline等级 */
  redlineLevel?: string;
  /** 二级标签 */
  secondLevel?: string;
  /** 二级标签名称 */
  secondLevelName?: string;
  /** 三级标签 */
  thirdLevel?: string;
  /** 三级标签名称 */
  thirdLevelName?: string;
  /**
   * 是否现在正在使用
   * @format int32
   */
  useFlag?: number;
}

/** ServiceLabelQueryListReq */
export interface ServiceLabelQueryListReq {
  /** 分类编码 */
  classification?: string;
  /** AI分类 */
  classificationAi?: string;
  /** 客服组 */
  customerGroup?: string;
  /** 一级标签 */
  firstLevel?: string;
  /** 四级标签名称 */
  fourthLevelName?: string;
  /** 标签类型 */
  labelType?: string;
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
  /** 配件Tag */
  partsTag?: string;
  /** 产品品类 */
  productCategory?: string;
  /** 品线 */
  productLine?: string;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 二级标签 */
  secondLevel?: string;
  /** 三级标签 */
  thirdLevel?: string;
}

/** ServiceLabelQueryListResp */
export interface ServiceLabelQueryListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 结果 */
  recordList?: ItemResp[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** ServiceLabelQueryOptionReq */
export type ServiceLabelQueryOptionReq = object;

/** ServiceLabelQueryOptionResp */
export interface ServiceLabelQueryOptionResp {
  /** 客服组选项 */
  customerGroupList?: OptionResp[];
  /** 标签类型选项 */
  labelTypeList?: OptionResp[];
  /** 品线选项 */
  productLineList?: OptionResp[];
}

/** ServiceLabelSaveReq */
export interface ServiceLabelSaveReq {
  /** 标签组编码 */
  categoryCode?: string;
  /** 分类编码 */
  classification: string;
  /** AI分类 */
  classificationAi?: string;
  /** classification中文映射 */
  classificationName?: string;
  /** classification原始值 */
  classificationValue?: string;
  /** 客服组 */
  customerGroup?: string;
  /** 一级标签 */
  firstLevel?: string;
  /**
   * 重要等级
   * @format int32
   */
  importantLevel?: number;
  /**
   * 是否AI
   * @format int32
   */
  isAi?: number;
  /** 标签来源 */
  labelSource?: string;
  /** 标签类型 */
  labelType?: string;
  /** 人员 */
  owner?: string;
  /** 配件中文映射 */
  partsName?: string;
  /** 配件Tag */
  partsTag?: string;
  /** 配件VALUE */
  partsValue?: string;
  /** 产品品类 */
  productCategory?: string;
  /** 品线 */
  productLine?: string;
  /** Redline等级 */
  redlineLevel?: string;
  /** 二级标签 */
  secondLevel?: string;
  /** 三级标签 */
  thirdLevel?: string;
  /**
   * 是否现在正在使用
   * @format int32
   */
  useFlag?: number;
}

/** ServiceLabelSaveResp */
export interface ServiceLabelSaveResp {
  /** 分类编码 */
  classification?: string;
  /** AI分类 */
  classificationAi?: string;
  /** 配件Tag */
  partsTag?: string;
  /** 产品品类 */
  productCategory?: string;
  /** 品线 */
  productLine?: string;
}

/** CommonResp«ReplacementShopQueryResp» */
export interface CommonRespReplacementShopQueryResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: ReplacementShopQueryResp;
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
