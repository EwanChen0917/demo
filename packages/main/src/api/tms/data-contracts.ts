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

/** Basic */
export interface Basic {
  /** 不良记录说明 */
  badRecordDesc?: string;
  /** 服务商分类（存储码/值，与库一致） */
  category?: string;
  /** 服务商分类描述 */
  categoryDesc?: string;
  /** 公司地址 */
  companyAddress?: string;
  /** 企业规模（存储码/值） */
  enterpriseScale?: string;
  /** 企业规模描述 */
  enterpriseScaleDesc?: string;
  /**
   * 成立日期
   * @format date
   */
  establishedDate?: string;
  /**
   * 有不良记录 0-否 1-是
   * @format int32
   */
  hasBadRecord?: number;
  /** 有不良记录描述 */
  hasBadRecordDesc?: string;
  /** 法人 */
  legalPerson?: string;
  /** 生命周期状态（存储码/值） */
  lifecycleStatus?: string;
  /** 生命周期状态描述 */
  lifecycleStatusDesc?: string;
  /** 服务商性质（存储码/值） */
  nature?: string;
  /** 服务商性质描述 */
  natureDesc?: string;
  /** 注册资本(万元) */
  registeredCapitalWan?: number;
  /** 代表性客户 */
  representativeClients?: string;
  /** 服务范围（库 JSON 原文） */
  scope?: string;
  /** 服务范围（码+描述，由 scope 解析） */
  serviceScope?: LogisticsSupplierScopeItem[];
  /** 服务商简称 */
  shortName?: string;
  /** 服务商编码 */
  supplierCode?: string;
  /** 服务商名称 */
  supplierName?: string;
  /** 系统对接能力（存储码/值） */
  systemIntegrationAbility?: string;
  /** 系统对接能力描述 */
  systemIntegrationAbilityDesc?: string;
  /** 仓库地址 */
  warehouseAddress?: string;
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

/** CommonResp */
export interface CommonResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: object;
  traceId?: string;
}

/** ContactItem */
export interface ContactItem {
  /** 部门 */
  contactDepartment?: string;
  /** 邮箱 */
  contactEmail?: string;
  /**
   * 性别 0-未知 1-男 2-女
   * @format int32
   */
  contactGender?: number;
  /** 性别描述 */
  contactGenderDesc?: string;
  /** 联系人 */
  contactName?: string;
  /** 联系电话 */
  contactPhone?: string;
  /** 职位 */
  contactPosition?: string;
  /**
   * 联系人主键
   * @format int64
   */
  id?: number;
  /**
   * 默认联系人 1-是 0-否
   * @format int32
   */
  isDefault?: number;
  /** 默认联系人描述 */
  isDefaultDesc?: string;
  /** 备注 */
  remark?: string;
}

/** ExtHeadBean */
export interface ExtHeadBean {
  /** 项数据 */
  items?: ExtHeadBeanItem[];
}

/** ExtHeadBeanItem */
export interface ExtHeadBeanItem {
  /** @format int32 */
  color?: number;
  /** 是否可编辑 */
  edit?: boolean;
  extMap?: object;
  /** 具体值 */
  value?: object;
  /**
   * 值类型 字符串-0 数字无小数点-1
   * @format int32
   */
  valueType?: number;
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

/** ImportTemplateQueryReq */
export interface ImportTemplateQueryReq {
  /** 场景  amazon_ticket-亚马逊券码导入 product_spu-商品spu导入 product_sku-商品sku导入 platform_sku-映射sku导入 ly_order-领用订单导入 */
  importScene?: string;
}

/** ImportTemplateQueryResp */
export interface ImportTemplateQueryResp {
  /** 下载地址 */
  templateUrl?: string;
}

/** LogisticsChannelNotifyConfigExportReq */
export interface LogisticsChannelNotifyConfigExportReq {
  /**
   * 使用状态：0-未启用 1-启用
   * @format int32
   */
  status?: number;
  /** 物流商编码 */
  supplierCode?: string;
  /** 物流商名称（模糊匹配 t_logistics_supplier 头程物流商） */
  supplierName?: string;
  /** 物流商类型编码，如 first_leg、last_mile */
  supplierType?: string;
  /** 运输方式 */
  transportType?: string;
}

/** LogisticsChannelNotifyConfigExportResp */
export interface LogisticsChannelNotifyConfigExportResp {
  /** 导出文件下载地址（临时链接，与导入模板一致格式，可直接用于再次导入） */
  fileUrl?: string;
}

/** LogisticsChannelNotifyConfigListItem */
export interface LogisticsChannelNotifyConfigListItem {
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /** 预警配额比例（展示文本，如 70%，存库为小数） */
  notifyRadio?: string;
  /** 配额比例（展示文本，如 70%，存库为小数） */
  quoteRadio?: string;
  /** 使用状态（枚举描述） */
  statusDesc?: string;
  /** 物流商编码 */
  supplierCode?: string;
  /** 物流商名称 */
  supplierName?: string;
  /** 物流商类型（枚举描述） */
  supplierTypeDesc?: string;
  /** 运输方式 */
  transportType?: string;
  /**
   * 修改时间
   * @format date-time
   */
  updateTime?: string;
  /** 修改人 */
  updator?: string;
}

/** LogisticsChannelNotifyConfigListReq */
export interface LogisticsChannelNotifyConfigListReq {
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
   * 使用状态：0-未启用 1-启用
   * @format int32
   */
  status?: number;
  /** 物流商编码 */
  supplierCode?: string;
  /** 物流商名称（模糊匹配 t_logistics_supplier 头程物流商） */
  supplierName?: string;
  /** 物流商类型编码，如 first_leg、last_mile */
  supplierType?: string;
  /** 运输方式 */
  transportType?: string;
}

/** LogisticsChannelNotifyConfigListResp */
export interface LogisticsChannelNotifyConfigListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  recordList?: LogisticsChannelNotifyConfigListItem[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** LogisticsLastmileChannelBean */
export interface LogisticsLastmileChannelBean {
  /** 渠道编码 */
  channelCode?: string;
  /** 渠道名称 */
  channelName?: string;
  /** 渠道类型 */
  channelType?: 'express' | 'freight' | 'packet' | 'registered' | 'surface';
  /** 渠道类型描述 */
  channelTypeDesc?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /**
   * ID
   * @format int32
   */
  id?: number;
  /**
   * 是否COD 0-否 1-是
   * @format int32
   */
  isCod?: number;
  /**
   * 是否对接：0-否 1-是
   * @format int32
   */
  isConnectApi?: number;
  /**
   * 是否计算材积重 0-否 1-是
   * @format int32
   */
  isVolumeWeight?: number;
  /**
   * 状态：0-未启用 1-启用
   * @format int32
   */
  status?: number;
  /** 状态描述 */
  statusDesc?: string;
  /** 服务商代码 */
  supplierCode?: string;
  /** 轨迹查询网站 */
  trackingWebsite?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /** 修改人 */
  updator?: string;
  /**
   * 材积系数
   * @format int32
   */
  volumeWeightCoefficient?: number;
  /** 发货仓库编码 */
  warehouseCode?: string;
  /** 发货仓库名称 */
  warehouseName?: string;
  /** 限重上限(kg) */
  weightLimitMax?: number;
  /** 限重下限(kg) */
  weightLimitMin?: number;
}

/** LogisticsLastmileChannelBillingAgreementConfigResp */
export interface LogisticsLastmileChannelBillingAgreementConfigResp {
  /** 计费标准 */
  billingBasis?: string;
  /** 计费标准描述 */
  billingBasisDesc?: string;
  /** 物流渠道编码 */
  channelCode?: string;
  /**
   * 物流渠道ID
   * @format int32
   */
  channelId?: number;
  /** 费用类别 */
  feeCategory?: string;
  /** 费用名称 */
  feeName?: string;
  /**
   * ID
   * @format int64
   */
  id?: number;
  /** 备注 */
  remark?: string;
  /** 价格处理方式 */
  weightProcessMethod?: string;
}

/** LogisticsLastmileChannelBillingAgreementResp */
export interface LogisticsLastmileChannelBillingAgreementResp {
  /** 费用配置列表 */
  billingAgreementConfigList?: LogisticsLastmileChannelBillingAgreementConfigResp[];
  /** 渠道编码 */
  channelCode?: string;
  /** 渠道名称 */
  channelName?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /** 币种 */
  currency?: string;
  /**
   * 生效日期-结束
   * @format date-time
   */
  effectiveDateEnd?: string;
  /**
   * 生效日期-开始
   * @format date-time
   */
  effectiveDateStart?: string;
  /**
   * ID
   * @format int32
   */
  id?: number;
  /**
   * 是否充值预付
   * @format int32
   */
  isPrepaid?: number;
  isPrepaidDesc?: string;
  /** 协议名称 */
  name?: string;
  /**
   * 0待生效,1已生效
   * @format int32
   */
  status?: number;
  /** 状态描述 */
  statusDesc?: string;
  /**
   * 修改时间
   * @format date-time
   */
  updateTime?: string;
  /** 修改人 */
  updator?: string;
}

/** LogisticsLastmileChannelBillingReq */
export interface LogisticsLastmileChannelBillingReq {
  /** 渠道编码（非必填） */
  channelCode?: string;
  /** 国家 */
  countryName: string;
  /** 高(cm) */
  height: number;
  /** 长(cm) */
  length: number;
  /** 商品价格(元) */
  productPrice: number;
  /** 重量(kg) */
  weight: number;
  /** 宽(cm) */
  width: number;
}

/** LogisticsLastmileChannelBillingResp */
export interface LogisticsLastmileChannelBillingResp {
  /** 测算价格 */
  calculatedPrice?: number;
  /** 计算表达式 */
  compute?: string;
  /** 输入参数拼接 */
  input?: string;
  /** 来源配置（包含渠道编码） */
  source?: SourceInfo;
}

/** LogisticsLastmileChannelDetailResp */
export interface LogisticsLastmileChannelDetailResp {
  /** 计费协议列表 */
  billingAgreementList?: LogisticsLastmileChannelBillingAgreementResp[];
  /** 渠道编码 */
  channelCode?: string;
  /** 渠道名称 */
  channelName?: string;
  /** 渠道类型 */
  channelType?: 'express' | 'freight' | 'packet' | 'registered' | 'surface';
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /** 围长范围(长+2*宽+2*高)-最大值 */
  girthMax?: number;
  /** 围长范围(长+2*宽+2*高)-最小值 */
  girthMin?: number;
  /** 产品属性限制 */
  goodsAttributeLimit?: string[];
  /** 尺寸范围/高-最大值 */
  heightMax?: number;
  /** 尺寸范围/高-最小值 */
  heightMin?: number;
  /**
   * 渠道ID
   * @format int32
   */
  id?: number;
  /**
   * 是否COD 0-否 1-是
   * @format int32
   */
  isCod?: number;
  /**
   * 是否对接：0-否 1-是
   * @format int32
   */
  isConnectApi?: number;
  /**
   * 是否计算材积重 0-否 1-是
   * @format int32
   */
  isVolumeWeight?: number;
  /** 尺寸范围/长-最大值 */
  lengthMax?: number;
  /** 尺寸范围/长-最小值 */
  lengthMin?: number;
  /** 周长范围(长+宽+高)-最大值 */
  perimeterMax?: number;
  /** 周长范围(长+宽+高)-最小值 */
  perimeterMin?: number;
  /** 服务水平 */
  serviceLevel?: string;
  /**
   * 状态：0-未启用 1-启用
   * @format int32
   */
  status?: number;
  /** 服务商代码 */
  supplierCode?: string;
  /** 轨迹查询网站 */
  trackingWebsite?: string;
  /**
   * 修改时间
   * @format date-time
   */
  updateTime?: string;
  /** 修改人 */
  updator?: string;
  /**
   * 材积系数
   * @format int32
   */
  volumeWeightCoefficient?: number;
  /** 发货仓库编码 */
  warehouseCode?: string;
  /** 发货仓库名称 */
  warehouseName?: string;
  /** 限重上限(kg) */
  weightLimitMax?: number;
  /** 限重下限(kg) */
  weightLimitMin?: number;
  /** 称重差异合理区间-最大值 */
  weightToleranceMax?: number;
  /** 称重差异合理区间-最小值 */
  weightToleranceMin?: number;
  /** 尺寸范围/宽-最大值 */
  widthMax?: number;
  /** 尺寸范围/宽-最小值 */
  widthMin?: number;
}

/** LogisticsLastmileChannelListReq */
export interface LogisticsLastmileChannelListReq {
  /** 渠道编码 */
  channelCode?: string;
  /** 渠道名称 */
  channelName?: string;
  /** 渠道类型 */
  channelType?: 'express' | 'freight' | 'packet' | 'registered' | 'surface';
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
   * 状态：0-未启用 1-启用
   * @format int32
   */
  status?: number;
  /** 服务商代码 */
  supplierCode?: string;
}

/** LogisticsLastmileChannelListResp */
export interface LogisticsLastmileChannelListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  recordList?: LogisticsLastmileChannelBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** LogisticsLastmileChannelRateConfigQueryBean */
export interface LogisticsLastmileChannelRateConfigQueryBean {
  /** 类别 */
  billingMethod?: string;
  billingMethodDesc?: string;
  /** 扩展表行 */
  detailList?: ExtHeadBean[];
  /** 扩展表头 */
  extHeadList?: ExtHeadBean;
  /** 包裹类型（长x宽x高范围） */
  packageType?: string;
  /** 产品价格最大值(元) */
  priceEnd?: number;
  priceMap?: Record<string, number>;
  /** 产品价格最小值(元) */
  priceStart?: number;
  /** 结止重量(kg) */
  weightEnd?: string;
  /** 开始重量(kg) */
  weightStart?: string;
}

/** LogisticsLastmileChannelRateConfigQueryReq */
export interface LogisticsLastmileChannelRateConfigQueryReq {
  /**
   * 费用配置ID
   * @format int64
   */
  configId: number;
}

/** LogisticsLastmileChannelRateConfigQueryResp */
export interface LogisticsLastmileChannelRateConfigQueryResp {
  recordList?: LogisticsLastmileChannelRateConfigQueryBean[];
}

/** LogisticsLastmileChannelSaveReq */
export interface LogisticsLastmileChannelSaveReq {
  /** 渠道编码 */
  channelCode?: string;
  /** 渠道名称 */
  channelName?: string;
  /** 可选值：express(快递)、registered(挂号)、surface(平邮)、freight(货运)、packet(小包) */
  channelType?: 'express' | 'freight' | 'packet' | 'registered' | 'surface';
  /** 围长范围(长+2*宽+2*高)-最大值 */
  girthMax?: number;
  /** 围长范围(长+2*宽+2*高)-最小值 */
  girthMin?: number;
  /** 产品属性限制 */
  goodsAttributeLimit?: string[];
  /** 尺寸范围/高-最大值 */
  heightMax?: number;
  /** 尺寸范围/高-最小值 */
  heightMin?: number;
  /**
   * ID，更新时必填
   * @format int32
   */
  id?: number;
  /**
   * 是否COD 0-否 1-是
   * @format int32
   */
  isCod?: number;
  /**
   * 是否对接：0-否 1-是
   * @format int32
   */
  isConnectApi?: number;
  /**
   * 是否计算材积重 0-否 1-是
   * @format int32
   */
  isVolumeWeight?: number;
  /** 尺寸范围/长-最大值 */
  lengthMax?: number;
  /** 尺寸范围/长-最小值 */
  lengthMin?: number;
  /** 周长范围(长+宽+高)-最大值 */
  perimeterMax?: number;
  /** 周长范围(长+宽+高)-最小值 */
  perimeterMin?: number;
  /** 服务水平 */
  serviceLevel?: string;
  /**
   * 状态：0-未启用 1-启用
   * @format int32
   */
  status?: number;
  /** 服务商代码 */
  supplierCode?: string;
  /** 轨迹查询网站 */
  trackingWebsite?: string;
  /**
   * 材积系数
   * @format int32
   */
  volumeWeightCoefficient?: number;
  /** 发货仓库编码 */
  warehouseCode?: string;
  /** 发货仓库名称 */
  warehouseName?: string;
  /** 限重上限(kg) */
  weightLimitMax?: number;
  /** 限重下限(kg) */
  weightLimitMin?: number;
  /** 称重差异合理区间-最大值 */
  weightToleranceMax?: number;
  /** 称重差异合理区间-最小值 */
  weightToleranceMin?: number;
  /** 尺寸范围/宽-最大值 */
  widthMax?: number;
  /** 尺寸范围/宽-最小值 */
  widthMin?: number;
}

/** LogisticsOrderAddResp */
export interface LogisticsOrderAddResp {
  /** 物流单号 */
  logisticsNo?: string;
  /** 结果消息 */
  message?: string;
  /** @format int32 */
  status?: number;
  /** 成功标识 */
  success?: boolean;
  /** 跟踪单号 */
  trackingNo?: string;
  /** 运单号 */
  waybillNo?: string;
}

/** LogisticsOrderBean */
export interface LogisticsOrderBean {
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** @format int64 */
  id?: number;
  /**
   * 拦截时间
   * @format date-time
   */
  interceptTime?: string;
  /**
   * 作废时间
   * @format date-time
   */
  invalidationTime?: string;
  /** 物流单号 */
  logisticsNo?: string;
  /** 来源单号，上游单号 */
  refNo?: string;
  /**
   * 发货时间
   * @format date-time
   */
  shippingTime?: string;
  spCode?: string;
  /**
   * 订单状态：10 待推送，30 推送中，50 作废，70 已发货，90 已拦截，110 异常，130 推送完成, 200 已签收
   * @format int32
   */
  status?: number;
  /** 跟踪号 */
  trackNo?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /** 运单号 */
  waybillNo?: string;
}

/** LogisticsOrderDetail */
export interface LogisticsOrderDetail {
  /** 买家邮箱 */
  buyerEmail?: string;
  /** 买家姓名 */
  buyerName?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 申报明细 */
  declareItemList?: ProductInfoBean[];
  /** 预估运费 */
  estimatedShippingCost?: number;
  /** 拓展信息（附件url） */
  extraInfo?: string;
  /** 文件名称 */
  fileName?: string;
  /**
   * 订单主键id
   * @format int64
   */
  id?: number;
  /**
   * 拦截时间
   * @format date-time
   */
  interceptTime?: string;
  /**
   * 作废时间
   * @format date-time
   */
  invalidationTime?: string;
  /** 自发货物流单号 */
  logisticsNo?: string;
  /** 出库单号 */
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
  /**
   * 发货时间
   * @format date-time
   */
  shippingTime?: string;
  /** 店铺 */
  shop?: string;
  /** 来源平台 */
  sourcePlatform?: string;
  /** 物流服务商编码 */
  spCode?: string;
  spCodeDesc?: string;
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
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /** 发货仓 */
  warehouseCode?: string;
  warehouseDesc?: string;
  /** 运单号 */
  waybillNo?: string;
}

/** LogisticsOrderEditReq */
export interface LogisticsOrderEditReq {
  /**
   * 买家邮箱
   * @minLength 0
   * @maxLength 64
   */
  buyerEmail?: string;
  /**
   * 买家姓名
   * @minLength 0
   * @maxLength 64
   */
  buyerName?: string;
  /** 申报明细 */
  declareItemList?: ProductInfoBean[];
  /** 预估运费 */
  estimatedShippingCost?: number;
  /** 拓展信息（附件url） */
  extraInfo?: string;
  /** 文件名称 */
  fileName?: string;
  /** 拦截原因 */
  interceptReason?: string;
  /** 物流单号 */
  logisticsNo: string;
  /** 出库单号 */
  outboundNo?: string;
  /** 收件人 */
  receiver?: ReceiverBean;
  /**
   * 来源单号，上游单号
   * @minLength 0
   * @maxLength 64
   */
  refNo: string;
  /** 备注 */
  remark?: string;
  /** 发件人 */
  sender?: ReceiverBean;
  /**
   * 物流产品编码
   * @minLength 0
   * @maxLength 32
   */
  shippingMethodCode: string;
  /**
   * 物流产品名称
   * @minLength 0
   * @maxLength 64
   */
  shippingMethodName: string;
  /**
   * 店铺
   * @minLength 0
   * @maxLength 64
   */
  shop?: string;
  /**
   * 来源平台
   * @minLength 0
   * @maxLength 64
   */
  sourcePlatform?: string;
  /**
   * 物流服务商编码
   * @minLength 0
   * @maxLength 32
   */
  spCode: string;
  /**
   * 税号
   * @minLength 0
   * @maxLength 32
   */
  taxId?: string;
  /**
   * 发货仓
   * @minLength 0
   * @maxLength 32
   */
  warehouseCode: string;
}

/** LogisticsOrderListResp */
export interface LogisticsOrderListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 列表记录 */
  recordList?: LogisticsOrderBean[];
  /** 状态统计 */
  statusCount?: LogisticsOrderStatusCountBean;
  /**
   * 总数
   * @format int64
   */
  total?: number;
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

/** LogisticsOrderStatusCountBean */
export interface LogisticsOrderStatusCountBean {
  /**
   * 所有
   * @format int64
   */
  all?: number;
  /**
   * 已作废
   * @format int64
   */
  canceled?: number;
  /**
   * 异常
   * @format int64
   */
  exception?: number;
  /**
   * 已拦截
   * @format int64
   */
  intercepted?: number;
  /**
   * 待推送
   * @format int64
   */
  pendingPush?: number;
  /**
   * 推送完成
   * @format int64
   */
  pushCompleted?: number;
  /**
   * 推送中
   * @format int64
   */
  pushing?: number;
  /**
   * 已签收
   * @format int64
   */
  received?: number;
  /**
   * 已发货
   * @format int64
   */
  shipped?: number;
}

/** LogisticsSupplierDetailResp */
export interface LogisticsSupplierDetailResp {
  /** 基础信息 */
  basic?: Basic;
  /** 联系人信息 */
  contacts?: ContactItem[];
  /** 资质信息 */
  qualification?: Qualification;
  /** 结算信息 */
  settlement?: Settlement;
}

/** LogisticsSupplierListReq */
export interface LogisticsSupplierListReq {
  /** 服务商分类（码）多选，命中任一 */
  categories?: string[];
  /**
   * 创建时间-止
   * @format date-time
   */
  createTimeEnd?: string;
  /**
   * 创建时间-起
   * @format date-time
   */
  createTimeStart?: string;
  /** 服务商开发状态 lifecycle_status（码）多选，命中任一 */
  lifecycleStatuses?: string[];
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
  /** 服务范围 scope 元素（码）多选，命中任一 */
  scopeCodes?: string[];
  /** 服务商编码（精确） */
  supplierCode?: string;
  /** 服务商名称（模糊） */
  supplierName?: string;
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
  recordList?: LogisticsSupplierListRow[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** LogisticsSupplierListRow */
export interface LogisticsSupplierListRow {
  /** 不良记录说明 */
  badRecordDesc?: string;
  /** 服务商分类（码） */
  category?: string;
  /** 服务商分类描述 */
  categoryDesc?: string;
  /** 公司地址 */
  companyAddress?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /** 企业规模（码） */
  enterpriseScale?: string;
  /** 企业规模描述 */
  enterpriseScaleDesc?: string;
  /**
   * 成立日期
   * @format date
   */
  establishedDate?: string;
  /**
   * 有不良记录 0-否 1-是
   * @format int32
   */
  hasBadRecord?: number;
  /** 有不良记录描述 */
  hasBadRecordDesc?: string;
  /**
   * 主键
   * @format int32
   */
  id?: number;
  /** 法人 */
  legalPerson?: string;
  /** 生命周期状态（存储码/值） */
  lifecycleStatus?: string;
  /** 生命周期状态描述 */
  lifecycleStatusDesc?: string;
  /** 服务商性质（码） */
  nature?: string;
  /** 服务商性质描述 */
  natureDesc?: string;
  /** 注册资本(万元) */
  registeredCapitalWan?: number;
  /** 代表性客户 */
  representativeClients?: string;
  scopeDesc?: string;
  /** 服务范围 */
  serviceScope?: LogisticsSupplierScopeItem[];
  /** 服务商简称 */
  shortName?: string;
  /** 服务商编码 */
  supplierCode?: string;
  /** 服务商名称 */
  supplierName?: string;
  /** 系统对接能力（码） */
  systemIntegrationAbility?: string;
  /** 系统对接能力描述 */
  systemIntegrationAbilityDesc?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /** 更新操作人 */
  updator?: string;
  /** 仓库地址 */
  warehouseAddress?: string;
}

/** LogisticsSupplierScopeItem */
export interface LogisticsSupplierScopeItem {
  /** 范围码 */
  code?: string;
  /** 范围描述 */
  desc?: string;
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

/** Qualification */
export interface Qualification {
  /** 空运代理等级（存储码/值） */
  airFreightAgentLevel?: string;
  /** 空运代理等级描述 */
  airFreightAgentLevelDesc?: string;
  /**
   * 直接订舱权 0-否 1-是
   * @format int32
   */
  directBookingRight?: number;
  /** 直接订舱权描述 */
  directBookingRightDesc?: string;
  /** 货运代理等级（存储码/值） */
  freightForwardingLevel?: string;
  /** 货运代理等级描述 */
  freightForwardingLevelDesc?: string;
  /** 一般经营项目 */
  generalBusinessScope?: string;
  /** 持牌资质 */
  licensedQualification?: string;
  /** 统一社会信用代码 */
  unifiedSocialCreditCode?: string;
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

/** Settlement */
export interface Settlement {
  /** 开户名 */
  accountName?: string;
  /** 银行代码 */
  bankCode?: string;
  /** 开户行 */
  bankName?: string;
  /** 账单币种 */
  billingCurrency?: string;
  /** 账单周期（存储码/值） */
  billingCycle?: string;
  /** 账单周期描述 */
  billingCycleDesc?: string;
  /** 发票类型（存储码/值） */
  invoiceType?: string;
  /** 发票类型描述 */
  invoiceTypeDesc?: string;
  /** 结算币种 */
  settlementCurrency?: string;
}

/** SourceInfo */
export interface SourceInfo {
  /** 续重价格(元) */
  additionalPrice?: number;
  /** 续重(KG) */
  additionalWeight?: number;
  /** 计费方式：1-按重量 2-按件数 3-按金额 */
  billingMethod?: string;
  /** 物流渠道编码 */
  channelCode?: string;
  /**
   * 物流渠道ID
   * @format int32
   */
  channelId?: number;
  /** 费用配置id */
  configId?: string;
  /** 国家编码 */
  countryCode?: string;
  /** 国家名称 */
  countryName?: string;
  /** @format date */
  effectiveDateEnd?: string;
  /** @format date */
  effectiveDateStart?: string;
  /** 首重价格(元) */
  firstPrice?: number;
  /** 首重(KG) */
  firstWeight?: number;
  /** 尺寸范围/高-最大值 */
  heightMax?: number;
  /** 尺寸范围/高-最小值 */
  heightMin?: number;
  /**
   * 配置ID
   * @format int64
   */
  id?: number;
  /** 尺寸范围/长-最大值 */
  lengthMax?: number;
  /** 尺寸范围/长-最小值 */
  lengthMin?: number;
  /** 价格(元) */
  price?: number;
  /** 商品价格结束值(元) */
  priceEnd?: number;
  /** 商品价格起始值(元) */
  priceStart?: number;
  /** 重量结束值(KG) */
  weightEnd?: number;
  /** 重量起始值(KG) */
  weightStart?: number;
  /** 重量类型：1-实重 2-材积重 3-计费重 */
  weightType?: string;
  /** 尺寸范围/宽-最大值 */
  widthMax?: number;
  /** 尺寸范围/宽-最小值 */
  widthMin?: number;
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

/** UserBean */
export type UserBean = object;

/** UserListQueryResp */
export interface UserListQueryResp {
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
  /** 用户列表 */
  userList: UserBean[];
}

/** UserSaveReq */
export type UserSaveReq = object;

/** UserSaveResp */
export interface UserSaveResp {
  /** @format int64 */
  id?: number;
}

/** CommonResp«ImportDataResp» */
export interface CommonRespImportDataResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: ImportDataResp;
  traceId?: string;
}

/** CommonResp«List«LogisticsLastmileChannelBillingResp»» */
export interface CommonRespListLogisticsLastmileChannelBillingResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: LogisticsLastmileChannelBillingResp[];
  traceId?: string;
}

/** CommonResp«LogisticsLastmileChannelDetailResp» */
export interface CommonRespLogisticsLastmileChannelDetailResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: LogisticsLastmileChannelDetailResp;
  traceId?: string;
}

/** CommonResp«LogisticsLastmileChannelRateConfigQueryResp» */
export interface CommonRespLogisticsLastmileChannelRateConfigQueryResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: LogisticsLastmileChannelRateConfigQueryResp;
  traceId?: string;
}

/** CommonResp«LogisticsOrderAddResp» */
export interface CommonRespLogisticsOrderAddResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: LogisticsOrderAddResp;
  traceId?: string;
}

/** CommonResp«LogisticsOrderDetail» */
export interface CommonRespLogisticsOrderDetail {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: LogisticsOrderDetail;
  traceId?: string;
}

/** CommonResp«LogisticsSupplierDetailResp» */
export interface CommonRespLogisticsSupplierDetailResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: LogisticsSupplierDetailResp;
  traceId?: string;
}

/** CommonResp«Void» */
export interface CommonRespVoid {
  code?: string;
  enMessage?: string;
  message?: string;
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
