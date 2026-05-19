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

/** AgencyAttachments */
export interface AgencyAttachments {
  /**
   * 文件ID
   * @format int64
   */
  fileId?: number;
  /** 附件名 */
  fileName?: string;
  /** 附件路径 */
  filePath?: string;
}

/** AgencyCategoryBean */
export interface AgencyCategoryBean {
  /** 分类code */
  categoryCode?: string;
  /**
   * 分类ID
   * @format int64
   */
  categoryId?: number;
  /** 分类名称 */
  categoryName?: string;
  /** 二级分类 */
  children?: AgencyCategoryBean[];
}

/** AgencyCategoryListResp */
export interface AgencyCategoryListResp {
  /** 分类列表 */
  list?: AgencyCategoryBean[];
}

/** AgencyCategorySaveReq */
export interface AgencyCategorySaveReq {
  /**
   * 分类ID
   * @format int64
   */
  categoryId?: number;
  /** 分类名称 */
  categoryName?: string;
  /** 上级分类code */
  parentCategoryCode?: string;
}

/** AgencyDeleteReq */
export interface AgencyDeleteReq {
  /** 资源code */
  categoryCode?: string;
}

/** AgencyInfoResp */
export interface AgencyInfoResp {
  /** 服务商code */
  agcCode?: string;
  /**
   * 服务商ID
   * @format int64
   */
  agcId?: number;
  /** 资源名称 */
  agcName?: string;
  /** 介绍附件 */
  attachments?: AgencyAttachments[];
  /** 联系邮箱 */
  contactEmail?: string;
  /** 联系方式 */
  contactPhone?: string;
  /** 联系人 */
  contactUsername?: string;
  /** 合作人 */
  cooperateBy?: string;
  /** 合作关系评估分数 */
  cooperateScore?: number;
  /** 合作关系评估 */
  cooperateScoreComment?: string;
  /** 国家 */
  cr?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 录入人 */
  createdBy?: string;
  /** 人群画像评估 */
  crowdPortraitComment?: string;
  /** 补充说明 */
  extExplain?: string;
  /** 一级分类code */
  firstCategoryCode?: string;
  /** 一级分类 */
  firstCategoryName?: string;
  /** 过往合作事项 */
  historyContent?: string;
  /** 一句话简介 */
  intro?: string;
  /** 专业度评估分数 */
  professionalScore?: number;
  /** 专业度评估 */
  professionalScoreComment?: string;
  /** 资源链接 */
  resourceLink?: string;
  /** 二级分类code */
  secondCategoryCode?: string;
  /** 二级分类 */
  secondCategoryName?: string;
  /** 服务响应评估分数 */
  serviceScore?: number;
  /** 服务响应评估 */
  serviceScoreComment?: string;
  /** 其他合作建议 */
  suggest?: string;
  /** 资源标签 */
  tags?: string[];
  /**
   * 更新
   * @format date-time
   */
  updateTime?: string;
  /** 更新人 */
  updatedBy?: string;
  /** 报价评估 */
  valuation?: string;
}

/** AgencyListBean */
export interface AgencyListBean {
  /** 服务商code */
  agcCode?: string;
  /**
   * 服务商ID
   * @format int64
   */
  agcId?: number;
  /** 资源名称 */
  agcName?: string;
  /** 联系邮箱 */
  contactEmail?: string;
  /** 联系人 */
  contactUsername?: string;
  /** 合作人 */
  cooperateBy?: string;
  /** 合作关系评估分数 */
  cooperateScore?: number;
  /** 国家 */
  cr?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 录入人 */
  createdBy?: string;
  /** 一级分类 */
  firstCategoryName?: string;
  /** 专业度评估分数 */
  professionalScore?: number;
  /** 二级分类 */
  secondCategoryName?: string;
  /** 服务响应评估分数 */
  serviceScore?: number;
  /** 资源标签 */
  tags?: string[];
  /**
   * 更新
   * @format date-time
   */
  updateTime?: string;
}

/** AgencyListReq */
export interface AgencyListReq {
  /** 企业编码 */
  companyCode?: string;
  /** 一级分类code */
  firstCategory?: string;
  /** 资源名称 */
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
  /** 二级分类code */
  secondCategory?: string;
  /** 标签code */
  tags?: string[];
}

/** AgencyListResp */
export interface AgencyListResp {
  /** 服务商资源列表 */
  agencyList?: AgencyListBean[];
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
}

/** AgencyOperationLog */
export interface AgencyOperationLog {
  /** 日志内容 */
  content?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 操作者 */
  operator?: string;
}

/** AgencySaveReq */
export interface AgencySaveReq {
  /** 服务商code，修改时此参数必传 */
  agcCode?: string;
  /**
   * 服务商ID，修改时此参数必传
   * @format int64
   */
  agcId?: number;
  /** 资源名称 */
  agcName?: string;
  /** 附件文件列表 */
  attachments?: AttachmentFile[];
  /** 联系邮箱 */
  contactEmail?: string;
  /** 联系电话 */
  contactPhone?: string;
  /** 联系人 */
  contactUsername?: string;
  /** 合作人 */
  cooperateBy?: string;
  /** 合作关系评估分数 */
  cooperateScore?: number;
  /** 合作关系评估 */
  cooperateScoreComment?: string;
  /** 所属国家地区 */
  cr?: string;
  /** 人群画像评估 */
  crowdPortraitComment?: string;
  /** 删除的附件文件ID列表 */
  deleteAttachmentsIds?: string[];
  /** 补充说明 */
  extExplain?: string;
  /** 资源一级分类 */
  firstCategoryCode?: string;
  /** 过往合作事项 */
  historyContent?: string;
  /** 一句话简介 */
  intro?: string;
  /** 专业度评估分数 */
  professionalScore?: number;
  /** 专业度评估 */
  professionalScoreComment?: string;
  /** 资源链接 */
  resourceLink?: string;
  /** 资源二级分类 */
  secondCategoryCode?: string;
  /** 服务响应评估分数 */
  serviceScore?: number;
  /** 服务响应评估 */
  serviceScoreComment?: string;
  /** 其他合作建议 */
  suggest?: string;
  /** 资源标签 */
  tagsList?: string[];
  /** 报价评估 */
  valuation?: string;
}

/** AttachmentFile */
export interface AttachmentFile {
  /** 附件文件Key */
  fileKey?: string;
  /** 附件文件名称 */
  fileName?: string;
}

/** BaseInfoReq */
export interface BaseInfoReq {
  /** 品牌编码 */
  brandCode?: string;
  /**
   * 是否COD 0-否 1-是
   * @format int32
   */
  cod?: number;
  /**
   * 是否第一次合作 1-是 0-否
   * @format int32
   */
  cooperationFirstFlag?: number;
  /** 币种编码 */
  currencyCode?: string;
  /** 客服备注 */
  customRemark?: string;
  /** 钉钉审核备注 */
  dingRemark?: string;
  /** 运费 */
  freightAmount?: number;
  /** 合作项目编码 */
  projectCode?: string;
  /** Reference No */
  sampleCode?: string;
  /** 店铺账号 */
  shopAccount?: string;
  /** 交易额 */
  transactionAmount?: number;
}

/** BaseInfoRes */
export interface BaseInfoRes {
  /** 总金额 */
  amount?: string;
  /**
   * 钉钉-审核时间
   * @format date-time
   */
  authTime?: string;
  /**
   * 是否COD 0-否 1-是
   * @format int32
   */
  cod?: number;
  /** 是否COD 0-否 1-是 */
  codDesc?: string;
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
  /**
   * 易仓审核时间
   * @format date-time
   */
  ecAuthTime?: string;
  /**
   * 预计到货时间
   * @format date-time
   */
  expectedArrivalTime?: string;
  /** 运费 */
  freightAmount?: string;
  /** 发货单号 易仓返回 */
  orderCode?: string;
  /**
   * 订单状态 200-待发货审核 201-待钉钉审核,300-待发货,400-已发货 500-EC异常 501-钉钉审核失败异常 600-废弃
   * @format int32
   */
  orderStatus?: number;
  /** 订单状态 200-待发货审核 201-待钉钉审核,300-待发货,400-已发货 500-EC异常 501-钉钉审核失败异常 600-废弃 */
  orderStatusDesc?: string;
  /**
   * 付款时间
   * @format date-time
   */
  payTime?: string;
  /** 项目编码 */
  projectCode?: string;
  psampleCode?: string;
  /** Reference No */
  sampleCode?: string;
  /**
   * 发货时间
   * @format date-time
   */
  sendTime?: string;
  /** 店铺账号 */
  shopAccount?: string;
  /** 跟踪单号 */
  trackOrderCode?: string;
  /** 交易额 */
  transactionAmount?: string;
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
  /** 是否显示重推fba */
  showRetrtFba?: boolean;
}

/** ChannelQueryResp */
export interface ChannelQueryResp {
  /** 渠道列表 */
  channelList?: MetaChannelBean[];
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
}

/** ChannelSaveReq */
export interface ChannelSaveReq {
  /** 渠道编码 */
  channelCode: string;
  /** 渠道链接 */
  channelLink?: string;
  /** 渠道描述 */
  desc?: string;
  /** 渠道名称 */
  name: string;
}

/** ChannelSaveResp */
export interface ChannelSaveResp {
  /** 渠道编码 */
  channelCode?: string;
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

/** CurrencyRateConvertResp */
export interface CurrencyRateConvertResp {
  /** 金额 */
  amount?: number;
  /** 原币种 */
  sourceCurrency?: string;
  /** 目标币种 */
  targetCurrency?: string;
}

/** DictBean */
export interface DictBean {
  childrenList?: FlowDictBean[];
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

/** DictCommonBean */
export interface DictCommonBean {
  desc?: string;
  /** 过滤关键字 */
  filterKeyWord?: string;
  value?: string;
}

/** DictResp */
export interface DictResp {
  /** 字典描述 */
  desc?: string;
  /** 字典编码 */
  dictCode?: string;
  /** 扩展信息 */
  extInfo?: Record<string, object>;
  /**
   * 字典ID
   * @format int64
   */
  id?: number;
  /** 字典名称 */
  name?: string;
  /** 备注 */
  remark?: string;
  /**
   * 排序
   * @format int32
   */
  sort?: number;
  /**
   * 字典类型 1-数字 2-字符串
   * @format int32
   */
  type?: number;
  /** 字典值 */
  value?: string;
}

/** EmailAppealOperateReq */
export interface EmailAppealOperateReq {
  /** 申诉编码 approve-审批/修改审批结果 */
  appealCode?: string;
  /** 消息id appeal-申诉 cancel_appeal-撤销申诉 必传 */
  messageId?: string;
  /** 操作类型 appeal-申诉 cancel_appeal-撤销申诉 approve-审批/修改审批结果 */
  operateType?: string;
  /** 申诉原因 appeal-申诉 必传 */
  reason?: string;
  /** 收件邮箱 appeal-申诉 cancel_appeal-撤销申诉 必传 */
  receiverEmail?: string;
  /**
   * 状态 1-通过 0-驳回 approve-审批/修改审批结果
   * @format int32
   */
  status?: number;
}

/** EmailAppealOperateResp */
export interface EmailAppealOperateResp {
  /** 消息id */
  messageId?: string;
}

/** EmailBatchBean */
export interface EmailBatchBean {
  /** @format int32 */
  count?: number;
  sendList?: string[];
}

/** EmailHistoryBean */
export interface EmailHistoryBean {
  /** 邮件内容 */
  content?: string;
  /** 收发邮件 */
  email?: string;
  /** 消息id */
  messageId?: string;
  /**
   * 发送日期
   * @format date-time
   */
  sendDate?: string;
}

/** EmailRecordBean */
export interface EmailRecordBean {
  /** 查询邮件 */
  email?: string;
  /** 查询人编码 */
  queryMemberCode?: string;
  /** 查询人名称 */
  queryMemberName?: string;
  /** @format date-time */
  queryTime?: string;
}

/** FlowDictBean */
export interface FlowDictBean {
  childrenList?: FlowDictBean[];
  /** 输出子条件 */
  childrenOutTemplateList?: FlowOutBean[];
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

/** FlowOutBean */
export interface FlowOutBean {
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
  selectValueList?: FlowDictBean[];
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

/** Item */
export interface Item {
  /** 总金额 */
  amount?: string;
  button?: Button;
  /** 买家地址 */
  buyerAddress?: string;
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
  /** 买家姓名 */
  buyerName?: string;
  /** 买家电话 */
  buyerPhone?: string;
  /** 买家省份 */
  buyerProvince?: string;
  /** 买家邮编 */
  buyerZipcode?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
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
  /**
   * 易仓审核时间
   * @format date-time
   */
  ecAuthTime?: string;
  /** 异常备注 */
  errorRemark?: string;
  /**
   * 预计到货时间
   * @format date-time
   */
  expectedArrivalTime?: string;
  /** 运费 */
  freightAmount?: string;
  /** 商品明细 */
  itemBeanList?: MetaSampleOrderV3ItemBean[];
  /** 红人账号 */
  metaAccount?: string;
  /** 发货单号 易仓 */
  orderCode?: string;
  /**
   * 订单状态 200-待发货审核 201-待钉钉审核,300-待发货,400-已发货 500-EC异常 501-钉钉审核失败异常 600-废弃
   * @format int32
   */
  orderStatus?: number;
  /** 订单状态 200-待发货审核 201-待钉钉审核,300-待发货,400-已发货 500-EC异常 501-钉钉审核失败异常 600-废弃 */
  orderStatusDesc?: string;
  /** 项目编码 */
  projectCode?: string;
  psampleCode?: string;
  /** 是否能重推fba */
  retrtFba?: boolean;
  /** 发货单号 路特生成 */
  sampleCode?: string;
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
  /**
   * 来源: 0-手动新增 1-模板导入 2-EDI生成
   * @format int32
   */
  source?: number;
  /** 来源: 0-手动新增 1-模板导入 2-EDI生成 */
  sourceDesc?: string;
  /** 系统备注 */
  systemRemark?: string;
  /** 跟踪单号 */
  trackOrderCode?: string;
  /** 跟踪单号 */
  trackOrderCodeUrl?: string;
  /** 交易额 */
  transactionAmount?: string;
  /** 修改人 */
  updator?: string;
  /** 仓库编号 */
  warehouseCode?: string;
  /** 仓库 */
  warehouseDesc?: string;
}

/** Item0 */
export interface Item0 {
  /**
   * 库存数
   * @format int32
   */
  inventory?: number;
  /** 商品编码 */
  skuCode?: string;
  /** 供应链SKU */
  supplySku?: string;
}

/** ItemInfoReq */
export interface ItemInfoReq {
  /** 发货方式code */
  deliveryCode?: string;
  /**
   * 发货数量
   * @format int32
   */
  num?: number;
  /** 配送方式code */
  shippingCode?: string;
  /** 商品SKUcode */
  skuCode?: string;
  /** 供应链SKU */
  supplySku?: string;
  /** 仓库编码 */
  warehouseCode?: string;
}

/** ItemInfoRes */
export interface ItemInfoRes {
  /** 发货方式code */
  deliveryCode?: string;
  /** 发货方式 */
  deliveryDesc?: string;
  /** 发货方式 - 交互可选 */
  deliveryList?: NavigationDeliveryParam[];
  /**
   * 商品名称
   * @format int64
   */
  id?: number;
  /**
   * 库存数
   * @format int32
   */
  inventory?: number;
  /**
   * 发货数量
   * @format int32
   */
  num?: number;
  /** 单价 */
  price?: string;
  /** 商品名称 */
  productName?: string;
  /** 店铺sku */
  sellerSku?: string;
  /** 配送方式code */
  shippingCode?: string;
  /** 配送方式 */
  shippingDesc?: string;
  /** 配送方式列表 - 交互可选 */
  shippingList?: DictBean[];
  /** 商品SKUcode */
  skuCode?: string;
  /** 供应链SKU */
  supplySku?: string;
  /** 供应链SKU - 交互可选 */
  supplySkuItemList?: Item0[];
  /** 仓库编码 */
  warehouseCode?: string;
  /** 仓库 */
  warehouseDesc?: string;
  /** 仓库列表 - 交互可选 */
  warehouseList?: NavigationWarehouseListParam[];
}

/** JoinMarkPromotionReq */
export interface JoinMarkPromotionReq {
  /** 折扣任务唯一编码集合 */
  taskCodeList: string[];
  /** 大促唯一编码 */
  taskPromotionCode: string;
  /** 大促后折扣力度 */
  taskPromotionEndDiscount: string;
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

/** LabelListQueryResp */
export interface LabelListQueryResp {
  code?: string;
  /** 标签列表 */
  labelInfoList?: LabelInfoBean[];
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

/** MarkTaskEditBean */
export interface MarkTaskEditBean {
  /** 折扣码code */
  markCode?: string;
  /** 失效时间 */
  markCodeEndTimeStr?: string;
  /** 生效时间 */
  markCodeStartTimeStr?: string;
  /** 运营备注 */
  remark?: string;
  /** Attribution链接 */
  taskAttributionLink?: string;
  /** 任务code */
  taskCode?: string;
  /** 折扣力度 */
  taskDiscount?: string;
  /** 大促折扣力度 */
  taskPromotionDiscount?: string;
  /** 大促后折扣力度 */
  taskPromotionEndDiscount?: string;
  /** 活动任务追踪码 */
  taskTrackingCode?: string;
  /** 亚马逊追踪码集合 */
  trackList?: TrackingInfoRequestBean[];
}

/** MarkTaskOperatorMappingBean */
export interface MarkTaskOperatorMappingBean {
  /** 运营人员集合 */
  operatorList?: string[];
  /** 商品spu */
  productSpu?: string;
  /** 站点 */
  site?: string;
}

/** MarkTaskOperatorMappingHandleBean */
export interface MarkTaskOperatorMappingHandleBean {
  /** 运营人员 */
  operatorList?: string[];
  /** 商品spu */
  productSpu?: string;
  /** 站点 */
  site?: string;
}

/** MarkTaskPromotionBean */
export interface MarkTaskPromotionBean {
  /** 折扣力度 */
  discount?: string;
  /** 大促主题 */
  name?: string;
  /** 大促相关运营人员 */
  operatorList?: string[];
  /**
   * 大促结束时间
   * @format date
   */
  promotionEndDate?: string;
  /**
   * 大促开始时间
   * @format date
   */
  promotionStartDate?: string;
  /**
   * 大促提交截止日期
   * @format date
   */
  submitEndDate?: string;
  /** 唯一编码 */
  taskPromotionCode?: string;
}

/** MarkTaskPromotionDetailResp */
export interface MarkTaskPromotionDetailResp {
  /** 折扣力度 */
  discount?: string;
  /** 大促主题 */
  name?: string;
  /** 大促相关运营人员 */
  operatorList?: string[];
  /**
   * 大促结束时间
   * @format date
   */
  promotionEndDate?: string;
  /**
   * 大促开始时间
   * @format date
   */
  promotionStartDate?: string;
  /** 唯一编码 */
  taskPromotionCode?: string;
}

/** MarkTaskPromotionListResp */
export interface MarkTaskPromotionListResp {
  /** 大促配置集合 */
  taskPromotionList?: MarkTaskPromotionBean[];
}

/** MarkTaskPromotionSaveReq */
export interface MarkTaskPromotionSaveReq {
  /** 折扣力度 */
  discount?: string;
  /** 大促主题 */
  name?: string;
  /** 大促相关运营人员 */
  operatorList?: string[];
  /**
   * 大促结束日期
   * @format date
   */
  promotionEndDate?: string;
  /**
   * 大促开始日期
   * @format date
   */
  promotionStartDate?: string;
  /**
   * 促销截止日期
   * @format date
   */
  submitEndDate?: string;
  /** 唯一编码 */
  taskPromotionCode?: string;
}

/** MarkTaskStationDetailResp */
export interface MarkTaskStationDetailResp {
  /** 渠道账号 */
  channelAccount?: string;
  /** 渠道链接 */
  channelHome?: string;
  /** 红人渠道 */
  channelName?: string;
}

/** MarkTaskStationResp */
export interface MarkTaskStationResp {
  /** 运营编码 */
  operator?: string;
  /** 运营名称 */
  operatorName?: string;
}

/** MemberBean */
export interface MemberBean {
  memberCode?: string;
  memberName?: string;
}

/** MemberDeptInfoBean */
export interface MemberDeptInfoBean {
  /**
   * 部门id
   * @format int64
   */
  deptId?: number;
  /** 部门名称 */
  deptName?: string;
  /**
   * 一级部门id
   * @format int64
   */
  firstDeptId?: number;
  /** 一级部门名称 */
  firstDeptName?: string;
  /** 员工编码 */
  memberCode?: string;
  /**
   * 父级部门id
   * @format int64
   */
  parentId?: number;
  /** 父级部门名称 */
  parentName?: string;
  /**
   * 二级部门id
   * @format int64
   */
  secondDeptId?: number;
  /** 二级部门名称 */
  secondDeptName?: string;
  /**
   * 三级部门id
   * @format int64
   */
  thirdDeptId?: number;
  /** 三级部门名称 */
  thirdDeptName?: string;
}

/** MetaApproveConfigReq */
export interface MetaApproveConfigReq {
  /** 审核人 */
  approveByList: string[];
}

/** MetaChannelBean */
export interface MetaChannelBean {
  /** 渠道 */
  channelCode?: string;
  /** 渠道链接 */
  channelLink?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 渠道描述 */
  desc?: string;
  /** 渠道名称 */
  name?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** MetaChannelSimpleBean */
export interface MetaChannelSimpleBean {
  /** 合作平台编码 */
  channelCode?: string;
  /** 合作平台名称 */
  channelName?: string;
}

/** MetaEmailAccountBean */
export interface MetaEmailAccountBean {
  /** 所属二级部门名称 */
  deptName?: string;
  /** 邮箱 */
  email?: string;
  /** 邮件分组 */
  emailGroup?: string;
  /** 邮件分组名称 */
  emailGroupName?: string;
  /**
   * 唯一id
   * @format int64
   */
  id?: number;
  /** 拥有者 */
  owner?: string;
  /** 拥有者名称 */
  ownerName?: string;
  /** 备注 */
  remark?: string;
}

/** MetaEmailAccountDetailResp */
export interface MetaEmailAccountDetailResp {
  /** 邮箱 */
  email?: string;
  /**
   * id
   * @format int64
   */
  id?: number;
  /** 员工 */
  member?: MemberBean;
  /** 备注 */
  remark?: string;
}

/** MetaEmailAccountQueryResp */
export interface MetaEmailAccountQueryResp {
  code?: string;
  /** 邮箱账号信息 */
  emailAccountList?: MetaEmailAccountBean[];
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

/** MetaEmailAccountSaveReq */
export interface MetaEmailAccountSaveReq {
  /** 推广邮箱 填了推广邮箱不要填唯一id */
  email?: string;
  /** 邮件分组 */
  emailGroup: string;
  /**
   * 唯一id 填了唯一id不要填推广邮箱
   * @format int64
   */
  id?: number;
  /** 拥有者 */
  owner: string;
  /** 备注 */
  remark?: string;
}

/** MetaEmailAccountSaveResp */
export interface MetaEmailAccountSaveResp {
  /**
   * id
   * @format int64
   */
  id?: number;
}

/** MetaEmailAppealBean */
export interface MetaEmailAppealBean {
  /** 申诉编码 */
  appealCode?: string;
  /** 审核意见 */
  approveReason?: string;
  /** 审批类型 approve-审批 change-修改审批结果 */
  approveType?: string;
  /**
   * 提交日期
   * @format date-time
   */
  createTime?: string;
  /** 提交人 */
  creator?: string;
  /** 提交人名称 */
  creatorName?: string;
  /** 消息id */
  messageId?: string;
  /** 申诉原因 */
  reason?: string;
  /** 收件人邮箱 */
  receiverEmail?: string;
  /**
   * 邮件发送时间
   * @format date-time
   */
  sendDate?: string;
  /** 发件人邮箱 */
  sendEmail?: string;
  /** 发件人名称 */
  senderName?: string;
  /**
   * 审核状态
   * @format int32
   */
  status?: number;
  /** 审核状态名称 */
  statusDesc?: string;
  /** 邮件主题 */
  subject?: string;
  /** 更新人 */
  updater?: string;
}

/** MetaEmailAppealResp */
export interface MetaEmailAppealResp {
  code?: string;
  /** 申诉记录 */
  emailAppealList?: MetaEmailAppealBean[];
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

/** MetaEmailBatchReq */
export interface MetaEmailBatchReq {
  /** 批量查询Email邮箱列表 */
  emailList?: string[];
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

/** MetaEmailBatchResp */
export interface MetaEmailBatchResp {
  /** 最近发送邮件列表 */
  lastSend?: EmailBatchBean;
  /** 最近未发送邮件列表 */
  lastUnSend?: EmailBatchBean;
  /** 查询记录 */
  recordList?: EmailRecordBean[];
  /** 白名单邮箱 */
  whiteEmail?: EmailBatchBean;
}

/** MetaEmailBean */
export interface MetaEmailBean {
  /**
   * 申诉状态 0-未申诉 1-待审核 2-通过 3-驳回 4-已撤销
   * @format int32
   */
  appealStatus?: number;
  /**
   * 是否有内容 0-无内容 1-有内容
   * @format int32
   */
  hasContent?: number;
  /**
   * 是否有使用人 1-有 0-无
   * @format int32
   */
  hasUser?: number;
  /**
   * 数据ID
   * @format int64
   */
  id?: number;
  /** 邮件ID */
  messageId?: string;
  /** 申诉原因 */
  reason?: string;
  /** 第一个的收件人邮箱 */
  receiverEmail?: string;
  /** 收件人邮箱列表 */
  receiverEmailList?: string[];
  /** 收件邮箱负责人 */
  receiverOwnerName?: string;
  /** 邮件备注 */
  remark?: string;
  /**
   * 邮件发送日期
   * @format date-time
   */
  sendDate?: string;
  /** 发件人邮箱 */
  sendEmail?: string;
  /** 发件邮箱负责人 */
  sendOwnerCode?: string;
  /** 发件邮箱负责人 */
  sendOwnerName?: string;
  /** 邮件摘要 */
  snippet?: string;
  /** 邮件主题 */
  subject?: string;
  /** 标签 */
  tagDesc?: string;
  /** 邮件标签 */
  tagList?: MetaEmailTagBean[];
}

/** MetaEmailBlackResp */
export interface MetaEmailBlackResp {
  /** 审核人集合 */
  approveByList?: string[];
  /** 黑名单邮箱集合 */
  emailList?: string[];
  /** 白名单邮箱集合 */
  whiteEmailList?: string[];
}

/** MetaEmailBlackSaveReq */
export interface MetaEmailBlackSaveReq {
  /** 邮箱集合 */
  emailList?: string[];
  /** 场景 邮箱：email */
  scene: string;
  /**
   * 名单类型 1-黑名单 2-白名单
   * @format int32
   */
  type?: number;
}

/** MetaEmailContentResp */
export interface MetaEmailContentResp {
  /** 邮件内容 */
  content?: string;
  /** 邮件ID */
  messageId?: string;
}

/** MetaEmailHistoryResp */
export interface MetaEmailHistoryResp {
  code?: string;
  /** 邮件来往历史记录 */
  emailHistoryList?: EmailHistoryBean[];
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

/** MetaEmailRecordReq */
export interface MetaEmailRecordReq {
  /** 使用人 */
  memberName?: string;
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
  /** 收件人邮箱 */
  receiverEmail?: string;
  /** 发件人邮箱 */
  sendEmail?: string;
  /**
   * 发送日期
   * @format date
   */
  sendTime?: string;
  /** 邮件标签 */
  tagCodeList?: string[];
}

/** MetaEmailRepeatBean */
export interface MetaEmailRepeatBean {
  /** 标签 */
  lableDescList?: string[];
  /** 收件人邮箱 */
  receiverEmail?: string;
  /**
   * 最近触达次数
   * @format int32
   */
  recentRepeatCount?: number;
  /**
   * 触达次数
   * @format int32
   */
  repeatCount?: number;
  /** 历史发件邮箱 */
  senderEmailList?: string[];
  /**
   * 最近发送日期
   * @format date-time
   */
  startDate?: string;
}

/** MetaEmailRepeatReq */
export interface MetaEmailRepeatReq {
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
  /** 收件人邮箱 */
  receiverEmail?: string;
  /** 发件人邮箱 */
  sendEmail?: string;
  /**
   * 最近发送日期
   * @format date
   */
  sendTime?: string;
  /** 邮件标签 */
  tagCodeList?: string[];
}

/** MetaEmailRepeatResp */
export interface MetaEmailRepeatResp {
  code?: string;
  /** 邮件触达信息 */
  emailRepeatList?: MetaEmailRepeatBean[];
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

/** MetaEmailRepeatSendExcelReq */
export interface MetaEmailRepeatSendExcelReq {
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
  /** 收件人邮箱 */
  receiverEmail?: string;
  /** 发件人邮箱 */
  sendEmail?: string;
}

/** MetaEmailResp */
export interface MetaEmailResp {
  code?: string;
  message?: string;
  /** 邮件列表 */
  metaEmailList?: MetaEmailBean[];
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

/** MetaEmailTagBean */
export interface MetaEmailTagBean {
  /**
   * 是否选中 0-未选中 1-选中
   * @format int32
   */
  hasChoose?: number;
  /** 收件邮箱 */
  receiverEmail?: string;
  /** 标签编码 */
  tagCode?: string;
  /** 标签描述 */
  tagDesc?: string;
}

/** MetaEmailTagQueryReq */
export interface MetaEmailTagQueryReq {
  /** 邮件消息id  1-邮箱记录必传 */
  messageId?: string;
  /** 红人邮件 2-邮箱触达必传 */
  receiverEmail?: string;
  /**
   * 标签类型模块 1-邮箱记录 2-邮箱触达
   * @format int32
   */
  tagType?: number;
}

/** MetaEmailTagRequestBean */
export interface MetaEmailTagRequestBean {
  /** 标签编码 */
  tagCode?: string;
  /** 标签描述 */
  tagDesc?: string;
}

/** MetaEmailTagResp */
export interface MetaEmailTagResp {
  /** 标签列表 */
  tagList?: MetaEmailTagBean[];
}

/** MetaFeatureBean */
export interface MetaFeatureBean {
  /** 特征描述 */
  desc?: string;
  /** 特征code */
  featureCode?: string;
  /** 特征名称 */
  name?: string;
}

/** MetaFeatureQueryResp */
export interface MetaFeatureQueryResp {
  code?: string;
  /** 红人特征集合 */
  featureList?: MetaFeatureBean[];
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

/** MetaFeatureSaveReq */
export interface MetaFeatureSaveReq {
  /** 描述 */
  desc?: string;
  /** 特征code */
  featureCode?: string;
  /** 特征名称 */
  name: string;
}

/** MetaFeatureSaveResp */
export interface MetaFeatureSaveResp {
  /** 特征编码 */
  featureCode?: string;
}

/** MetaInfoLastCacheResp */
export interface MetaInfoLastCacheResp {
  /** 红人链接 */
  attributeUrl?: string;
  /** 渠道账号 */
  channelAccount?: string;
  /** 渠道编码 */
  channelCode?: string;
  /** 渠道名称 */
  channelName?: string;
}

/** MetaMarkBean */
export interface MetaMarkBean {
  /** 红人编码北京有效失效时间 */
  bjMarkCodeEndTime?: string;
  /** 红人编码北京有效开始时间 */
  bjMarkCodeStartTime?: string;
  /** 品牌编码 Momcozy、Babycozy、Comfelie */
  brandCode?: string;
  /**
   * 是否可转移 1-可转移 0-不可转移
   * @format int32
   */
  canTransfer?: number;
  /**
   * 是否允许取消 1-允许 0-不允许
   * @format int32
   */
  cancelFlag?: number;
  /** 渠道账号 */
  channelAccount?: string;
  /** 渠道code */
  channelCode?: string;
  /** 渠道链接 */
  channelHome?: string;
  /** 渠道名称 */
  channelName?: string;
  /**
   * 提交日期
   * @format date-time
   */
  commitDate?: string;
  /**
   * 是否允许复制 1-允许 0-不允许
   * @format int32
   */
  copyFlag?: number;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人-推广员 */
  creator?: string;
  /** 创建人-推广员名称 */
  creatorName?: string;
  /**
   * 折扣类型
   * @format int32
   */
  discountType?: number;
  /** 红人编码有效结束时间 */
  endTime?: string;
  /**
   * 唯一id
   * @format int64
   */
  id?: number;
  /** 引入金额 */
  importAmount?: number;
  /** 进入金额币种 */
  importAmountCurrency?: string;
  /**
   * 引入金额时间
   * @format date-time
   */
  importAmountTime?: string;
  /** 标识码 */
  markCode?: string;
  /** 红人编码有效失效时间-太平洋格式时间 */
  markCodeEndTimeStr?: string;
  /** 红人编码有效开始时间-太平洋格式时间 */
  markCodeStartTimeStr?: string;
  /** 时区 */
  markCodeTimeZone?: string;
  /** 标识码描述备注 */
  markDesc?: string;
  /** 折扣码标识 */
  markTag?: string;
  /** 折扣码标识描述 */
  markTagDesc?: string;
  /** 唯一记录编码 */
  metaMarkCode?: string;
  /** 历史折扣码 */
  oldMarkCode?: string;
  /** 运营备注 */
  operateRemark?: string;
  /** 平台编码 amazon shopify walmart */
  platformCode?: string;
  /** 销售平台 */
  platformName?: string;
  /**
   * 是否允许申请延期 1-允许 0-不允许
   * @format int32
   */
  postPoneFlag?: number;
  /** 商品信息 */
  productInfoList?: ProductInfoBean[];
  /** 品线集合 */
  productLineList?: MetaProductLineBean[];
  /** 项目编码 */
  projectCode?: string;
  /** 大促后折扣力度 */
  promotionEndDiscount?: string;
  /** 推广备注 */
  remark?: string;
  /** 站点 */
  siteCode?: string;
  /** 站点列表 */
  siteCodeList?: string[];
  /** 站点产品编码 */
  siteProductCode?: string;
  /** 红人编码有效开始时间 */
  startTime?: string;
  /**
   * 状态 1-待校验 2-生效中 3-已到期 4-已取消
   * @format int32
   */
  status?: number;
  /** 状态 */
  statusDesc?: string;
  /** Attribution链接 */
  taskAttributionLink?: string;
  /** 当前任务编码 */
  taskCode?: string;
  /** 日常折扣力度 */
  taskDiscount?: string;
  /** 当前任务运营人员 */
  taskOperator?: string;
  /** 当前任务运营人员名称 */
  taskOperatorName?: string;
  /** 大促折扣力度 */
  taskPromotionDiscount?: string;
  /** 大促后折扣力度 */
  taskPromotionEndDiscount?: string;
  /**
   * 红人编码有效结束时间
   * @format date-time
   */
  tempEndTime?: string;
  /**
   * 红人编码有效开始时间
   * @format date-time
   */
  tempStartTime?: string;
  /** 追踪信息 */
  trackingList?: TrackingInfoBean[];
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /** 红人头像 */
  userAvatar?: string;
  /** 红人code */
  userCode?: string;
  /** 红人国家编码 */
  userCountry?: string;
  /** 红人邮箱 */
  userEmail?: string;
  /** 红人名称 */
  userName?: string;
}

/** MetaMarkHandleReq */
export interface MetaMarkHandleReq {
  /** 备注 1-取消时必填 */
  comment?: string;
  /**
   * 操作类型 1-取消 2-续期 4-加急 8-转移 9-重建
   * @format int32
   */
  handleType: number;
  /** 标识码 */
  markCode?: string;
  /** 唯一编码 */
  metaMarkCode: string;
  /** 运营人 2-续期时必填 */
  operator?: string;
  /** 转移人 8-时必填 */
  transfer?: string;
}

/** MetaMarkHandleResp */
export interface MetaMarkHandleResp {
  /** 标识码 */
  markCode?: string;
  /** 唯一编码 */
  metaMarkCode?: string;
}

/** MetaMarkListQueryReq */
export interface MetaMarkListQueryReq {
  /** 渠道平台 tiktok youtube instagram */
  channelCode?: string;
  /**
   * 折扣码创建日期
   * @format date
   */
  codeCreateTime?: string;
  /**
   * 折扣失效日期
   * @format date
   */
  codeDisableTime?: string;
  /** 创建人-推广人编码 */
  creatorCode?: string;
  /**
   * 结束时间
   * @format date
   */
  endTime?: string;
  /** 关键字查询, 红人名称/合作产品/品线 */
  keyword?: string;
  /** 品线 */
  lineCode?: string;
  /** 标识码 */
  markCode?: string;
  /**
   * 折扣码状态 1-待生效 2-生效中 3-已到期 4-已取消 5-关停中 6-已作废
   * @format int32
   */
  markStatus?: number;
  /** 折扣码标识 */
  markTag?: string;
  /** 运营负责人 */
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
  /** 平台编码  区分两个平台的数据，数据隔离 */
  platformCode: string;
  /** 合作项目编码 */
  projectCode?: string;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 产品编码 */
  spuCode?: string;
  /**
   * 开始时间
   * @format date
   */
  startTime?: string;
  /** 红人账号 */
  userCode?: string;
}

/** MetaMarkListQueryResp */
export interface MetaMarkListQueryResp {
  code?: string;
  message?: string;
  /** 标识码列表 */
  metaMarkList?: MetaMarkBean[];
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

/** MetaMarkMemberResp */
export interface MetaMarkMemberResp {
  /** 推广人员列表 */
  memberBeanList?: MemberBean[];
}

/** MetaMarkOperatorMappingReq */
export interface MetaMarkOperatorMappingReq {
  /** 映射配置一键编辑保存 */
  mappingBeanList?: MarkTaskOperatorMappingHandleBean[];
}

/** MetaMarkProductConfigQueryReq */
export interface MetaMarkProductConfigQueryReq {
  /** operator */
  operator?: string[];
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
  /** 商品编码 */
  productSpu: string;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 站点 */
  site: string;
}

/** MetaMarkProductConfigQueryResp */
export interface MetaMarkProductConfigQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  resultList?: MetaProductSiteConfigMappingBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** MetaMarkSaveReq */
export interface MetaMarkSaveReq {
  /** 渠道账号 */
  channelAccount: string;
  /** 红人渠道code */
  channelCode: string;
  /** 红人链接 独立站平台必填 */
  channelHome?: string;
  /** 运营人员 独立站平台必填 */
  operator?: string;
  /** 平台编码 amazon station */
  platformCode: string;
  /** 项目编码 */
  projectCode?: string;
  /** 折扣码集合-亚马逊新增保存使用 */
  saveMarkInfoList?: SaveMarkInfoBean[];
  /** 红人code */
  userCode?: string;
  /** 红人名称 */
  userName: string;
}

/** MetaMarkTaskHandleReq */
export interface MetaMarkTaskHandleReq {
  /**
   * 操作类型 1-取消 3-延期 5-批量生效 6-批量编辑 7-配置映射表 8-转办 10-批量关停 11-批量废弃
   * @format int32
   */
  handleType: number;
  /**
   * 红人编码有效结束时间 3-延期
   * @format date-time
   */
  markCodeEndTime?: string;
  /**
   * 红人编码有效开始时间 3-延期
   * @format date-time
   */
  markCodeStartTime?: string;
  /** 红人编码生效时区 +:东区 -:西区 3-延期 */
  markCodeTimeZone?: string;
  /** 批量编辑折扣码信息 6-批量编辑时，必传 */
  markTaskList?: MarkTaskEditBean[];
  /** 配置映射表 7-配置映射表时，必传 */
  markTaskOperatorMapping?: MarkTaskOperatorMappingBean;
  /** 唯一编码 */
  metaMarkCode?: string;
  /** 转移运营人员 8-转移时，必传 */
  operator?: string;
  /** 平台编码 amazon station */
  platformCode?: string;
  /** 备注 1-取消时必填 */
  remark?: string;
  /** 站点 */
  siteCode?: string;
  /** Attribution链接 3-延期 */
  taskAttributionLink?: string;
  /** 任务code */
  taskCode?: string;
  /** 任务编码集合 5-批量提交/10-批量关停/11-批量废弃，必传 */
  taskCodeList?: string[];
  /** 折扣力度 3-延期 */
  taskDiscount?: string;
  /** 折扣力度描述 3-延期 */
  taskDiscountDesc?: string;
  /** 活动任务追踪码 3-延期 */
  taskTrackingCode?: string;
}

/** MetaMarkTaskListBean */
export interface MetaMarkTaskListBean {
  /** 品牌编码 Momcozy、Babycozy、Comfelie */
  brandCode?: string;
  /** 渠道账号 */
  channelAccount?: string;
  /** 渠道code */
  channelCode?: string;
  /** 渠道链接 */
  channelHome?: string;
  /** 渠道名称 */
  channelName?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人-推广员 */
  creator?: string;
  /** 创建人姓名 */
  creatorName?: string;
  /**
   * 折扣类型
   * @format int32
   */
  discountType?: number;
  /** 折扣类型描述 */
  discountTypeDesc?: string;
  /**
   * 是否允许编辑 1-有 0-没有
   * @format int32
   */
  editFlag?: number;
  /** 标识码 */
  markCode?: string;
  /** 红人编码有效失效时间 */
  markCodeEndTime?: string;
  /** 红人编码有效失效时间-太平洋格式时间 */
  markCodeEndTimeStr?: string;
  /** 红人编码有效开始时间 */
  markCodeStartTime?: string;
  /** 红人编码有效开始时间-太平洋格式时间 */
  markCodeStartTimeStr?: string;
  /** 红人编码生效时区 +:东区 -:西区 */
  markCodeTimeZone?: string;
  /** 折扣标识 */
  markTag?: string;
  /** 折扣标识描述 */
  markTagDesc?: string;
  /** 唯一编码 */
  metaMarkCode: string;
  /** 原折扣码 */
  oldMarkCode?: string;
  /** 运营备注 */
  operateRemark?: string;
  /** 协作-运营人员 */
  operator?: string;
  /** 协作-运营人员姓名 */
  operatorName?: string;
  /** 平台编码 amazon shopify walmart */
  platformCode?: string;
  /**
   * 是否允许申请延期 1-有 0-没有
   * @format int32
   */
  postPoneFlag?: number;
  /** 合作产品 */
  productInfoList: ProductInfoBean[];
  /** 品线集合 */
  productLineList?: MetaProductLineBean[];
  /** 推广备注 */
  remark?: string;
  /** 店铺信息 */
  shopInfo?: string;
  /** 站点 */
  siteCode?: string;
  /**
   * 任务状态 1-新建 2-延期 3-重建
   * @format int32
   */
  status?: number;
  /** 状态描述 */
  statusDesc?: string;
  /** Attribution链接 */
  taskAttributionLink?: string;
  /** 任务code */
  taskCode?: string;
  /** 折扣力度 */
  taskDiscount?: string;
  /** 折扣力度描述 */
  taskDiscountDesc?: string;
  /** 大促折扣力度 */
  taskPromotionDiscount?: string;
  /** 大促后折扣力度 */
  taskPromotionEndDiscount?: string;
  /** 活动任务追踪码 */
  taskTrackingCode?: string;
  /**
   * 任务类型 1-新建 2-延期 3-重建 4-大促配置 5-大促后配置
   * @format int32
   */
  taskType?: number;
  /** 任务类型描述 */
  taskTypeDesc?: string;
  /**
   * 红人编码有效失效时间
   * @format date-time
   */
  tempMarkCodeEndTime?: string;
  /**
   * 红人编码有效开始时间
   * @format date-time
   */
  tempMarkCodeStartTime?: string;
  /** 亚马逊跟踪信息 */
  trackInfoList?: TrackingInfoBean[];
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /** 红人头像 */
  userAvatar?: string;
  /** 红人code */
  userCode?: string;
  /** 红人国家 */
  userCountry?: string;
  /** 红人邮箱 */
  userEmail?: string;
  /** 红人名称 */
  userName?: string;
}

/** MetaMarkTaskListQueryReq */
export interface MetaMarkTaskListQueryReq {
  /** 渠道平台 tiktok youtube instagram */
  channelCode?: string;
  /** 创建人-推广人编码 */
  creatorCode?: string;
  /**
   * 折扣类型  1-全站折扣 2-单品折扣 3-分类页折扣
   * @format int32
   */
  discountType?: number;
  /**
   * 结束时间
   * @format date
   */
  endTime?: string;
  /**
   * 是否导出操作 1-是 ，导出时必传
   * @format int32
   */
  exportFlag?: number;
  /** 关键字查询, 红人名称/合作产品/品线 */
  keyword?: string;
  /** 品线 */
  lineCode?: string;
  /** 标识码 */
  markCode?: string;
  /** 折扣码标识 */
  markTag?: string;
  /** 运营编码 */
  operateCode?: string;
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
  /** 平台编码 */
  platformCode: string;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /**
   * 开始时间
   * @format date
   */
  startTime?: string;
  /** 任务编码集合 勾选时传 */
  taskCodeList?: string[];
  /**
   * 任务状态 1-待办 2-已完成 3-取消
   * @format int32
   */
  taskStatus?: number;
  /**
   * 任务类型 1-新建 2-延期 3-重建 4-大促配置 5-大促后配置
   * @format int32
   */
  taskType?: number;
}

/** MetaMarkTaskListQueryResp */
export interface MetaMarkTaskListQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 任务列表 */
  taskList?: MetaMarkTaskListBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** MetaMarkTaskOperatorBean */
export interface MetaMarkTaskOperatorBean {
  /** 运营编码 */
  operator?: string;
  /** 运营名称 */
  operatorName?: string;
  /**
   * 是否选择 1-是 0-否
   * @format int32
   */
  selectFlag?: number;
}

/** MetaMarkTaskOperatorResp */
export interface MetaMarkTaskOperatorResp {
  /** 运营人员信息集合 */
  operatorList?: MetaMarkTaskOperatorBean[];
}

/** MetaMarkTaskOperatorV2Req */
export interface MetaMarkTaskOperatorV2Req {
  /** 商品编码列表 */
  productCodeList: string[];
  /** 站点 */
  siteList: string[];
}

/** MetaMarkTaskOperatorV2Resp */
export interface MetaMarkTaskOperatorV2Resp {
  /** 运营人员信息集合 */
  operatorCode?: string;
}

/** MetaMarkTaskSaveReq */
export interface MetaMarkTaskSaveReq {
  /** 折扣码 */
  markCode: string;
  /**
   * 红人编码有效结束时间
   * @format date-time
   */
  markCodeEndTime?: string;
  /**
   * 红人编码有效开始时间
   * @format date-time
   */
  markCodeStartTime?: string;
  /** 红人编码生效时区 +:东区 -:西区 */
  markCodeTimeZone?: string;
  /** 唯一编码 */
  metaMarkCode: string;
  /** 备注 */
  operateRemark?: string;
  /** 平台编码 amazon shopify walmart */
  platformCode: string;
  /** 站点 */
  siteCode?: string;
  /** Attribution链接 */
  taskAttributionLink?: string;
  /** 任务code */
  taskCode: string;
  /** 折扣力度 */
  taskDiscount?: string;
  /** 折扣力度描述 */
  taskDiscountDesc?: string;
  /** 活动任务追踪码 */
  taskTrackingCode?: string;
}

/** MetaMarkTaskSaveResp */
export interface MetaMarkTaskSaveResp {
  /** 任务code */
  taskCode?: string;
}

/** MetaMarkTrackingMappingBatchUpdateReq */
export interface MetaMarkTrackingMappingBatchUpdateReq {
  /** 更新映射列表 */
  updateMappingList?: MetaMarkTrackingMappingUpdateBean[];
}

/** MetaMarkTrackingMappingBean */
export interface MetaMarkTrackingMappingBean {
  /** 红人渠道账号 */
  channelAccount?: string;
  /** 红人渠道 */
  channelCode?: string;
  /** 推广人员 */
  creator?: string;
  /** 推广人员名称 */
  creatorName?: string;
  /**
   * 映射状态
   * @format int32
   */
  mappingStatus?: number;
  /** 映射状态描述 */
  mappingStatusDesc?: string;
  /** 折扣码 */
  markCode?: string;
  /**
   * 折扣码ID
   * @format int64
   */
  markId?: number;
  /** 操作人员 */
  operator?: string;
  /** 操作人员名称 */
  operatorName?: string;
  /** 平台 */
  platformCode?: string;
  /** 平台名称 */
  platformName?: string;
  /** 追踪码列表 */
  trackingCodeList?: TrackingInfoBean[];
  /**
   * 创建时间
   * @format date-time
   */
  updateTime?: string;
  /** 更新人员 */
  updator?: string;
  /** 更新人员名称 */
  updatorName?: string;
}

/** MetaMarkTrackingMappingResp */
export interface MetaMarkTrackingMappingResp {
  code?: string;
  /** 映射列表 */
  mappingList?: MetaMarkTrackingMappingBean[];
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

/** MetaMarkTrackingMappingUpdateBean */
export interface MetaMarkTrackingMappingUpdateBean {
  /** 渠道账号 */
  channelAccount?: string;
  /** 渠道编码 */
  channelCode?: string;
  /**
   * 映射状态
   * @format int32
   */
  mappingStatus?: number;
  /** 折扣码 */
  markCode?: string;
  /**
   * 折扣码ID
   * @format int64
   */
  markId?: number;
  /** 平台编码 */
  platformCode?: string;
  /** 追踪码列表 */
  trackingInfoBeanList?: TrackingInfoBean[];
}

/** MetaModifyTagReq */
export interface MetaModifyTagReq {
  /** 邮箱ID 1-邮箱记录 */
  messageId?: string;
  /** 红人邮箱 1-邮箱记录 2-邮箱触达 */
  receiverEmail?: string;
  /** 标签列表 */
  tagBeanList?: MetaEmailTagRequestBean[];
  /**
   * 标签类型模块 1-邮箱记录 2-邮箱触达
   * @format int32
   */
  tagType?: number;
}

/** MetaOperateLogResp */
export interface MetaOperateLogResp {
  code?: string;
  /** 日志集合 */
  logList?: OperationLogBean[];
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

/** MetaOperatorQueryResp */
export interface MetaOperatorQueryResp {
  /** 运营人员列表 */
  memberList?: MemberBean[];
}

/** MetaProductLineBean */
export interface MetaProductLineBean {
  /** 产线编码 */
  lineCode?: string;
  /** 产线名称 */
  lineName?: string;
}

/** MetaProductLineQueryResp */
export interface MetaProductLineQueryResp {
  /** 品线列表 */
  productLineList?: MetaProductLineBean[];
}

/** MetaProductListQueryV2Resp */
export interface MetaProductListQueryV2Resp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 商品列表 */
  productBeanList?: ProductBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** MetaProductSiteConfigMappingBean */
export interface MetaProductSiteConfigMappingBean {
  /** 站点国家编码 */
  countryCode?: string;
  /** 站点国家名称 */
  countryName?: string;
  /** 运营人列表 */
  operatorList?: OperatorBean[];
  /** spuCode */
  spuCode?: string;
  /** 产品名称 */
  spuName?: string;
  taskOperatorCode?: string;
}

/** MetaProjectAuthResp */
export interface MetaProjectAuthResp {
  /**
   * 查询筛选条件权限 1-有 0-无
   * @format int32
   */
  queryFilterAuth?: number;
}

/** MetaProjectBean */
export interface MetaProjectBean {
  /** 品牌编码 */
  brandCode?: string;
  /** 品牌名称 */
  brandName?: string;
  /** 预算 */
  budget?: number;
  /** 合作平台 */
  channel?: string;
  /** 红人渠道列表 */
  channelCodeList?: string[];
  /** 红人渠道链接列表 */
  channelHomeList?: string[];
  /** 渠道名称 */
  channelName?: string;
  /**
   * 合作方式
   * @format int32
   */
  cooperation?: number;
  /** 合作费用 */
  cooperationCosts?: number;
  /** 合作费用币种 */
  cooperationCostsCurrency?: string;
  /** 合作方式名称 */
  cooperationName?: string;
  /** 需求年份 */
  cooperationYear?: string;
  /** 国家 */
  country?: string;
  /** 推广人员 */
  creator?: string;
  /** 推广人员头像 */
  creatorAvatar?: string;
  /** 推广人员名称 */
  creatorName?: string;
  /** 推广人员职位 */
  creatorTitle?: string;
  /** 项目描述 */
  desc?: string;
  /**
   * 红人详情下，项目的所有操作权限
   * @format int32
   */
  detailAllOperateAuth?: number;
  /**
   * 结束时间
   * @format date-time
   */
  endTime?: string;
  /** 标签列表 */
  labelList?: LabelInfoBean[];
  /** 成员头像 */
  memberAvatar?: string;
  /** 项目成员 */
  memberCode?: string;
  /** 项目成员名称 */
  memberName?: string;
  /** 成员职位 */
  memberTitle?: string;
  /** 折扣码列表 */
  metaMarkList?: string[];
  /** 项目名称 */
  name?: string;
  /** 寄样单列表 */
  orderProductList?: string[];
  /**
   * 付款状态 0-未付款 1-已付款
   * @format int32
   */
  payStatus?: number;
  /** 付款状态 0-未付款 1-已付款 */
  payStatusDesc?: string;
  /** 商品编码 */
  productCode?: string;
  /** 商品列表 */
  productList?: ProductInfoBean[];
  /** 商品名称 */
  productName?: string;
  /** 项目编码 */
  projectCode?: string;
  /** 合作品线 */
  projectLine?: string;
  /**
   * 发布状态 0-未发布 1-已发布
   * @format int32
   */
  publishStatus?: number;
  /** 发布状态 0-未发布 1-已发布 */
  publishStatusDesc?: string;
  /**
   * 寄样状态 0-未寄样 1-已寄样
   * @format int32
   */
  shipStatus?: number;
  /** 寄样状态 0-未寄样 1-已寄样 */
  shipStatusDesc?: string;
  /** 合作月份 */
  startMonth?: string;
  /**
   * 开始时间
   * @format date-time
   */
  startTime?: string;
  /** 合作日期 */
  startTimeStr?: string;
  /**
   * 项目状态 1-初始化 2-进行中 3-已完成 4-已取消
   * @format int32
   */
  status?: number;
  /** 项目状态描述 */
  statusDesc?: string;
  /** 团队 */
  team?: string;
  /** 抖音导入金额 */
  tkImportAmount?: number;
  /** 红人头像 */
  userAvatar?: string;
  /** 红人code */
  userCode?: string;
  /** 红人名称 */
  userName?: string;
}

/** MetaProjectChannelUpdateReq */
export interface MetaProjectChannelUpdateReq {
  /** 合作渠道编码 */
  channelList: string[];
  /** 项目编码不能为空 */
  projectCode: string;
}

/** MetaProjectDetailResp */
export interface MetaProjectDetailResp {
  /** 合作品牌编码 */
  brandCode?: string;
  /** 合作品牌名称 */
  brandName?: string;
  /** 合作平台编码 */
  channelList?: MetaChannelSimpleBean[];
  /** 合作费用 */
  cooperationCosts?: number;
  /** 合作费用币种 */
  cooperationCostsCurrency?: string;
  /**
   * 是否为第一次合作
   * @format int32
   */
  cooperationFirstFlag?: number;
  /** 红人邮箱 */
  email?: string;
  /**
   * 结束时间
   * @format date-time
   */
  endTime?: string;
  /** 评估反馈 */
  feedBack?: string;
  /**
   * 完结操作权限 1-有，0-没有
   * @format int32
   */
  finishAuth?: number;
  /**
   * 完结原因
   * @format int32
   */
  finishReason?: number;
  /** kol 推广渠道 */
  kolChannelType?: string[];
  /** kol 推广渠道 */
  kolChannelTypeDesc?: string[];
  /** kol 上线渠道 */
  kolUpLink?: string;
  /** 标签列表 */
  labelList?: LabelInfoBean[];
  /** 成员头像 */
  memberAvatar?: string;
  /** 项目成员 */
  memberCode?: string;
  /** 项目成员名称 */
  memberName?: string;
  /** 项目名称 */
  name?: string;
  /** 合作数据 */
  partnerDataList?: MetaProjectPartnerDataBean[];
  /**
   * 付款状态 0-未付款 1-已付款
   * @format int32
   */
  payStatus?: number;
  /** 付款状态 0-未付款 1-已付款 */
  payStatusDesc?: string;
  /** 商品列表 */
  productList?: ProductInfoBean[];
  /** 项目编码 */
  projectCode?: string;
  /** 合作品线 */
  projectLineStr?: string;
  /**
   * 发布状态 0-未发布 1-已发布
   * @format int32
   */
  publishStatus?: number;
  /** 发布状态 0-未发布 1-已发布 */
  publishStatusDesc?: string;
  /**
   * 发布月份
   * @format int32
   */
  releaseMonth?: number;
  /** 备注 */
  remark?: string;
  /**
   * 寄样状态 0-未寄样 1-已寄样
   * @format int32
   */
  shipStatus?: number;
  /** 寄样状态 0-未寄样 1-已寄样 */
  shipStatusDesc?: string;
  /**
   * 星级评价
   * @format double
   */
  starRating?: number;
  /**
   * 开始时间
   * @format date-time
   */
  startTime?: string;
  /**
   * 项目状态 2-进行中 5-顺利完结 4-取消 41-跑单 42-需求变动 43-缺货 44-其他
   * @format int32
   */
  status?: number;
  /** 项目状态描述 */
  statusDesc?: string;
  /** 红人头像 */
  userAvatar?: string;
  /** 红人code */
  userCode?: string;
  /** 红人名称 */
  userName?: string;
  /**
   * 发布日期
   * @format date
   */
  videoReleaseDate?: string;
}

/** MetaProjectOperateReq */
export interface MetaProjectOperateReq {
  /** 品牌编码集合 5-合作品牌时必填 */
  brandCodeList: string[];
  /** 合作费用 操作6必填 */
  cooperationCosts?: number;
  /** 合作费用币种 操作6必填 */
  cooperationCostsCurrency?: string;
  /**
   * 结束时间 , 日志使用
   * @format date-time
   */
  endTime?: string;
  /** 评估反馈 操作3填写 */
  feedBack?: string;
  /**
   * 完结原因 操作4填写
   * @format int32
   */
  finishReason?: number;
  /** 完结原因 , 日志使用 */
  finishReasonDesc?: string;
  /** 合作标签 操作类型参数：7-合作标签 */
  labelCodeList?: string[];
  /**
   * 操作类型 1-添加产品 2-上线数据 3-合作反馈 4-完结操作 5-合作品牌 6-合作费用 7-合作标签 8-编辑合作事项状态
   * @format int32
   */
  operateType?: number;
  /** 上线数据 操作2必填 */
  partnerData?: MetaProjectPartnerDataBean;
  /** 项目编码 */
  projectCode: string;
  /** 备注 操作4填写 */
  remark?: string;
  /** spu商品集合 操作1必填 */
  spuCodeList?: string[];
  /**
   * 星级评价 操作3填写
   * @format double
   */
  starRating?: number;
  /**
   * 合作状态 2-进行中 4-取消 5-顺利完结 6-跑单 操作类型：8-编辑合作事项状态
   * @format int32
   */
  status?: number;
  /** 合作状态 , 日志使用 */
  statusDesc?: string;
}

/** MetaProjectOperateResp */
export interface MetaProjectOperateResp {
  /** 项目编码 */
  projectCode?: string;
}

/** MetaProjectPartnerDataBean */
export interface MetaProjectPartnerDataBean {
  /**
   * 授权方式 0-未授权 1-已授权 2-免费授权 3-付费授权
   * @format int32
   */
  authorization?: number;
  /**
   * 授权范围
   * @format int32
   */
  authorizationArea?: number;
  /**
   * 授权时间
   * @format int32
   */
  authorizationDate?: number;
  /** 上线平台 */
  channelCode?: string;
  /** 曝光量区间 */
  exposureLevel?: string;
  /** 曝光量区间 */
  exposureRange?: string;
  /** 互动率区间 */
  interactRateLevel?: string;
  /** 互动率区间 */
  interactRateRange?: string;
  /** 合作项目记录关联编码 */
  metaProjectCode?: string;
  /** 记录编码 */
  partnerDataCode?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /**
   * 点赞量
   * @format int32
   */
  videoClickNum?: number;
  /**
   * 评论量
   * @format int32
   */
  videoCommentNum?: number;
  /**
   * 合作视频转发量
   * @format int32
   */
  videoForwardNum?: number;
  /**
   * 互动量
   * @format int32
   */
  videoInteractNum?: number;
  /** 合作视频互动率 */
  videoInteractRate?: string;
  /** 视频语种 */
  videoLanguage?: string;
  /** 视频语种中文名 */
  videoLanguageDesc?: string;
  /**
   * 播放量
   * @format int32
   */
  videoLookNum?: number;
  /** 视频发布日期 */
  videoReleaseDateStr?: string;
  /**
   * 视频类型
   * @format int32
   */
  videoType?: number;
  /** 视频链接 */
  videoUrl?: string;
}

/** MetaProjectPartnerVideoReq */
export interface MetaProjectPartnerVideoReq {
  /** 项目数据编码 */
  partnerDataCode?: string;
  /** 项目数据编码 */
  projectCode?: string;
}

/** MetaProjectPlatformResp */
export interface MetaProjectPlatformResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  platformList?: MetaChannelSimpleBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** MetaProjectReq */
export interface MetaProjectReq {
  /** 信息维度 mark-折扣码 video-合作数据 order-寄样信息 */
  dimension?: string;
  /**
   * 结束时间
   * @format date
   */
  endTime?: string;
  /** 关键字 */
  keyword?: string;
  /** 合作标签集合 */
  labelCodeList?: string[];
  /** 项目成员编码 合伙人编码 */
  memberCode?: string;
  /** 合作事项创建人集合  红人详情查询合作事项列表使用 */
  memberCodeList?: string[];
  /** 项目名称 */
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
  /** 项目编码 */
  projectCode?: string;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** spu编码集合  -- 寄样产品多选 */
  sampleSpuCodeList?: string[];
  /** 场景 合作管理-manage 我的合作-mine */
  scene?: string;
  /** spu编码集合 */
  spuCodeList?: string[];
  /**
   * 开始时间
   * @format date
   */
  startTime?: string;
  /** 项目状态 2-进行中 21-进行中-已寄样 22-进行中-已付款 23-进行中-已发布 5-顺利完结 4-取消 41-取消-跑单 42-取消-需求变动 43-取消-缺货 44-取消-其他 */
  statusList?: number[];
  /**
   * 团队
   * @format int32
   */
  team?: number;
  /** 团队编码 */
  teamCode?: string;
  /** 红人编码 */
  userCode?: string;
  /** 红人名称 */
  userName?: string;
}

/** MetaProjectResp */
export interface MetaProjectResp {
  code?: string;
  /** 红人项目列表 */
  list?: MetaProjectBean[];
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

/** MetaProjectSaveReq */
export interface MetaProjectSaveReq {
  /** 合作渠道 */
  channelList?: string[];
  /**
   * 是否第一次合作 1-是 0-否
   * @format int32
   */
  cooperationFirstFlag?: number;
  /** 商品spu编码 */
  spuCodeList: string[];
  /** 红人编码 */
  userCode: string;
}

/** MetaProjectSaveResp */
export interface MetaProjectSaveResp {
  /** 项目编码 */
  projectCode?: string;
}

/** MetaProjectStatusReq */
export interface MetaProjectStatusReq {
  /** 合作项目编码 */
  projectCode: string;
  /**
   * 合作项目状态 2-进行中 5-顺利完结 4-取消 41-跑单 42-需求变动 43-缺货 44-其他
   * @format int32
   */
  status: number;
}

/** MetaProjectTkAmountReq */
export interface MetaProjectTkAmountReq {
  /** 项目编码 */
  projectCode: string;
  /** tk小店引入金额 */
  tkAmount: number;
}

/** MetaSampleOrderV3ItemBean */
export interface MetaSampleOrderV3ItemBean {
  /** 佣金 */
  commission?: number;
  /** 发货方式 */
  deliveryCode?: string;
  /** 发货方式 */
  deliveryDesc?: string;
  /** 数量 */
  num?: string;
  /**
   * 数量
   * @format int32
   */
  numInt?: number;
  /** 运营人员 */
  operator?: string;
  /** 运营人员名称 */
  operatorName?: string;
  /** 发货单号 易仓返回 */
  orderCode?: string;
  /** 单价(查商品中心建议售价) */
  price?: string;
  /** 商品名称 */
  productName?: string;
  /** 填写销售单价 */
  salesPrice?: number;
  /** 发货单号 路特生成 */
  sampleCode?: string;
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
  /** 仓库 */
  warehouseCode?: string;
  /** 仓库 */
  warehouseDesc?: string;
}

/** MetaTeamBean */
export interface MetaTeamBean {
  teamCode?: string;
  teamName?: string;
}

/** MetaTeamListResp */
export interface MetaTeamListResp {
  /** 红人推广团队列表 */
  teamList?: MetaTeamBean[];
}

/** MetaUserBean */
export interface MetaUserBean {
  /** 头像 */
  avatar?: string;
  /** 品牌 */
  brandName?: string;
  /** 品牌推广 */
  brandTeamStatus?: string;
  /** 账号名称 */
  channelAccount?: string;
  /** 渠道编码列表 */
  channelCodeList?: string[];
  /** 红人链接 */
  channelHome?: string;
  /** 渠道列表 */
  channelList?: MetaUserChannelBean[];
  /** Comfelie推广 */
  comfelieTeamStatus?: string;
  /** 联系方式 */
  contact?: string;
  /** 国家 */
  country?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人/录入人 */
  creator?: string;
  /** 创建人头像 */
  creatorAvatar?: string;
  /** 创建人名称 */
  creatorName?: string;
  /** 创建人职位 */
  creatorTitle?: string;
  /** 日常size */
  dailySize?: string;
  /**
   * 日常size更新时间
   * @format date-time
   */
  dailySizeUpdateTime?: string;
  /** 邮箱 */
  email?: string;
  /** 红人量级 */
  fansLevel?: string;
  /**
   * 粉丝数
   * @format int32
   */
  fansNum?: number;
  /** 特征列表 */
  featureList?: MetaUserFeatureBean[];
  /** GTM推广 */
  gtmTeamStatus?: string;
  /** 标签列表 */
  labelList?: LabelInfoBean[];
  /** 归属人 */
  owner?: string;
  /** 归属人名称 */
  ownerName?: string;
  /**
   * 录入时间
   * @format date
   */
  recordDate?: string;
  /** 备注 */
  remark?: string;
  /** 备注集合 */
  remarkList?: MetaUserRemarkBean[];
  /** 小店推广 */
  shopTeamStatus?: string;
  /**
   * 状态 1-潜在 2-发展中 3-合作中 4-已淘汰
   * @format int32
   */
  status?: number;
  statusDesc?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /** 用户code */
  userCode?: string;
}

/** MetaUserChannelBean */
export interface MetaUserChannelBean {
  /** 渠道账号 */
  channelAccount?: string;
  /** 渠道code */
  channelCode?: string;
  /** 渠道主页 */
  channelHome?: string;
  /** 红人账号 */
  curChannelAccount?: string;
  /**
   * 粉丝数
   * @format int32
   */
  fansNum?: number;
  /** 用户code */
  userCode?: string;
  /**
   * 观看量
   * @format int32
   */
  viewNum?: number;
}

/** MetaUserChannelCheckResp */
export interface MetaUserChannelCheckResp {
  /**
   * 0-数据不存在 1-存在，数据不一致 2-存在，数据一致
   * @format int32
   */
  addFlag?: number;
  /**
   * 最近更新时间
   * @format date-time
   */
  updateTime?: string;
  /** 最近更新人 */
  updater?: string;
}

/** MetaUserDetailBean */
export interface MetaUserDetailBean {
  /** 渠道账号 */
  channelAccount?: string;
  /** 渠道编码 */
  channelCode?: string;
  /** 红人渠道主页/链接 */
  channelHome?: string;
  /** 渠道名称 */
  channelName?: string;
  /**
   * 粉丝量
   * @format int32
   */
  fansNum?: number;
  /** 粉丝量区间 */
  fansNumRange?: string;
  /** 红人等级 */
  redLevel?: string;
}

/** MetaUserFeatureBean */
export interface MetaUserFeatureBean {
  /** 特征code */
  featureCode?: string;
  /** 特征名称 */
  featureName?: string;
  /** 用户code */
  userCode?: string;
}

/** MetaUserImportReq */
export interface MetaUserImportReq {
  /** 上传地址名字 */
  fileName?: string;
  /** 上传地址 */
  ossKey?: string;
}

/** MetaUserRemarkBean */
export interface MetaUserRemarkBean {
  /** 备注 */
  remark?: string;
  /** 备注编码 */
  userRemarkCode?: string;
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
  shippingList?: DictBean[];
  /** 仓库代码 */
  warehouseCode?: string;
  /** 仓库名称 */
  warehouseName?: string;
}

/** OperationLogBean */
export interface OperationLogBean {
  /** 更新内容(操作内容) */
  operationContent?: string;
  /**
   * 更新时间(操作时间)
   * @format date-time
   */
  operationTime?: string;
  /** 更新人(操作人) */
  operatorName?: string;
}

/** OperatorBean */
export interface OperatorBean {
  /** 运营人编码 */
  operator?: string;
  /** 运营人名称 */
  operatorName?: string;
}

/** PprDraftEnumsResp */
export interface PprDraftEnumsResp {
  /** 基础信息 */
  baseInfo?: PprDraftEnumsRespBaseInfo;
  /** 枚举信息 */
  enums?: PprDraftEnumsRespEnum;
  /** 明细信息 */
  itemList?: PprDraftEnumsRespItemInfo[];
  /** 项目基础信息 */
  projectBaseInfo?: ProjectBaseInfo;
}

/** PprDraftEnumsRespBaseInfo */
export interface PprDraftEnumsRespBaseInfo {
  /** 广告账户 */
  advertisingAccount?: string;
  /** 广告账户描述 */
  advertisingAccountDesc?: string;
  /** 附件 */
  attList?: UploadReq[];
  /** 品牌 */
  brand?: string;
  /** 品牌描述 */
  brandDesc?: string;
  /** 编码 */
  code?: string;
  /** 国家 */
  country?: string;
  /** 国家 */
  countryDesc?: string;
  /** 币种编码 */
  currencyCode?: string;
  /** 币种编码 */
  currencyDesc?: string;
  /** 汇率 */
  currencyRate?: number;
  /** 费用类型 */
  feeType?: string;
  /** 费用类型 */
  feeTypeDesc?: string;
  /** kol 推广渠道 */
  kolChannelType?: string[];
  /** kol 推广渠道 */
  kolChannelTypeDesc?: string[];
  /** kol 上线渠道 */
  kolUpLink?: string;
  /** 支付账户 */
  payAccount?: string;
  /** 支付银行 */
  payBank?: string;
  /** 我司付款单位 */
  payCompany?: string;
  /** 我司付款单位 */
  payCompanyDesc?: string;
  /** 支付对象 */
  payObj?: string;
  /**
   * 支付时间
   * @format date-time
   */
  payTime?: string;
  /** 支付类型 */
  payType?: string;
  /** 支付类型 */
  payTypeDesc?: string;
  /** 合作事项编码 */
  projectCode?: string;
  /** 所属项目类型 */
  projectType?: string;
  /** 所属项目类型 */
  projectTypeDesc?: string;
  /** 推广付款类型 */
  promotionPaymentType?: string;
  /** 推广付款类型 */
  promotionPaymentTypeDesc?: string;
  /** 付款事由 */
  reason?: string;
  /** 备注 */
  remark?: string;
  /** 人民币总金额 */
  rmbAmount?: number;
  /** 二级部门 */
  secondDept?: string;
  /** 二级部门 */
  secondDeptName?: string;
  /** 总金额 */
  totalAmount?: number;
  /** 图片 */
  urlList?: UploadReq[];
}

/** PprDraftEnumsRespEnum */
export interface PprDraftEnumsRespEnum {
  /** 广告账户枚举 */
  advertisingAccountEnumList?: DictResp[];
  /** 品牌枚举 */
  brandEnumList?: DictResp[];
  /** 费用归属部门 */
  feeAffiliationDeptEnumList?: DictResp[];
  /** 品线枚举 */
  feeProductLineEnumList?: DictResp[];
  /** 费用类型枚举 */
  feeTypeEnumList?: DictResp[];
  /** KOL渠道类型枚举 */
  kolChannelTypeEnumList?: DictResp[];
  /** 额外的产品(非产品列表里的数据) */
  otherProductEnumList?: DictCommonBean[];
  /** 我司付款单位枚举 */
  payCompanyEnumList?: DictResp[];
  /** 付款类型枚举 */
  payTypeEnumList?: DictResp[];
  /** 平台枚举 */
  platformEnumList?: DictResp[];
  /** 所属营销项目名称枚举 */
  projectTypeEnumList?: DictResp[];
  /** 推广付款类型 */
  promotionPaymentTypeEnumList?: DictResp[];
  /** 转人民币汇率 */
  rmbCurrencyEnumList?: DictResp[];
  /** 销售部门枚举 */
  saleDeptEnumList?: DictResp[];
  /** 二级部门枚举 */
  secondDeptNameEnumList?: DictResp[];
}

/** PprDraftEnumsRespItemInfo */
export interface PprDraftEnumsRespItemInfo {
  /** 金额 */
  amount?: number;
  /** 费用归属部门 */
  feeAffiliationDept?: string;
  /** 费用归属部门 */
  feeAffiliationDeptDesc?: string;
  /** 品线 */
  feeProductLine?: string;
  /** 品线 */
  feeProductLineDesc?: string;
  /** 平台 */
  platform?: string;
  /** 平台 */
  platformDesc?: string;
  /** 产品名称 */
  productName?: string;
  /** 销售人员 */
  saleCode?: string;
  /** 销售部门 */
  saleDept?: string;
  /** 销售部门 */
  saleDeptDesc?: string;
  /** 销售人员 */
  saler?: string;
  /** 店铺 */
  shop?: string;
  /** 产品编码 */
  spuCode?: string;
}

/** PprListQueryReq */
export interface PprListQueryReq {
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
  /** 合作事项编码 */
  projectCode?: string;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
}

/** PprListQueryResp */
export interface PprListQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 记录列表 */
  recordList?: PprListQueryRespItem[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** PprListQueryRespItem */
export interface PprListQueryRespItem {
  /** 广告账户 */
  advertisingAccount?: string;
  /** 广告账户描述 */
  advertisingAccountDesc?: string;
  /** 金额 */
  amount?: number;
  /** 品牌 */
  brand?: string;
  /** 品牌描述 */
  brandDesc?: string;
  /** 编码 */
  code?: string;
  /** 国家 */
  country?: string;
  /** 国家 */
  countryDesc?: string;
  /** 发起人 */
  creator?: string;
  /** 发起人编码 */
  creatorCode?: string;
  /** 币种编码 */
  currencyCode?: string;
  /** 币种编码 */
  currencyDesc?: string;
  /** 汇率 */
  currentRate?: number;
  /** 部门 */
  deptName?: string;
  /** 费用归属部门 */
  feeAffiliationDept?: string;
  /** 费用归属部门 */
  feeAffiliationDeptDesc?: string;
  /** 品线 */
  feeProductLine?: string;
  /** 品线 */
  feeProductLineDesc?: string;
  /** 费用类型 */
  feeType?: string;
  /** 费用类型 */
  feeTypeDesc?: string;
  /**
   * 完成时间
   * @format date-time
   */
  finishTime?: string;
  /** kol 推广渠道 */
  kolChannelType?: string;
  /** kol 推广渠道 */
  kolChannelTypeDesc?: string;
  /** kol 上线渠道 */
  kolUpLink?: string;
  /** 地区 */
  localArea?: string;
  /** 年月 */
  monOfyear?: string;
  /**
   * 排重
   * @format int32
   */
  num?: number;
  /** 支付账户 */
  payAccount?: string;
  /** 支付金额(人民币) */
  payAmountRmb?: number;
  /** 支付金额(美元) */
  payAmountUsd?: number;
  /** 支付银行 */
  payBank?: string;
  /** 我司付款单位 */
  payCompany?: string;
  /** 我司付款单位 */
  payCompanyDesc?: string;
  /** 支付对象 */
  payObj?: string;
  /**
   * 支付时间
   * @format date-time
   */
  payTime?: string;
  /** 支付类型 */
  payType?: string;
  /** 支付类型 */
  payTypeDesc?: string;
  /** 支付年月 */
  payYearMon?: string;
  /** 支付年月日 */
  payYearMonDay?: string;
  /** 平台 */
  platform?: string;
  /** 平台 */
  platformDesc?: string;
  /** 产品名称 */
  productName?: string;
  /** 合作事项编码 */
  projectCode?: string;
  /** 所属项目类型 */
  projectType?: string;
  /** 所属项目类型 */
  projectTypeDesc?: string;
  /** 推广付款类型 */
  promotionPaymentType?: string;
  /** 推广付款类型 */
  promotionPaymentTypeDesc?: string;
  /** 年季度 */
  quarterOfYear?: string;
  /** 付款事由 */
  reason?: string;
  /** 审批编码 */
  recordCode?: string;
  /** 备注 */
  remark?: string;
  /** 人民币总金额 */
  rmbAmount?: number;
  /** 人民币汇率 */
  rmbRate?: number;
  /** 销售人员 */
  saleCode?: string;
  /** 销售部门 */
  saleDept?: string;
  /** 销售部门 */
  saleDeptDesc?: string;
  /** 销售人员 */
  saler?: string;
  /** 二级部门 */
  secondDeptName?: string;
  /** 店铺 */
  shop?: string;
  /** 产品编码 */
  spuCode?: string;
  /**
   * 状态 -1-创建失败 0-初始化(未推送) 10-审批中 11-已通过 12-已驳回 13-已撤销 20-待办中 21-已完成 22-已删除
   * @format int32
   */
  status?: number;
  /** 状态描述 */
  statusDesc?: string;
  /** 主题 */
  subject?: string;
  /** 总金额 */
  totalAmount?: number;
  /** 美元汇率 */
  usdRate?: number;
  /** 年周 */
  weekOfYear?: string;
  /** 工单编码 */
  workFlowCode?: string;
}

/** PprSaveReq */
export interface PprSaveReq {
  /** 基础信息 */
  baseInfo?: PprSaveReqBaseInfo;
  /** 是否草稿 */
  isDraft?: boolean;
  /** 明细信息 */
  itemList?: PprSaveReqItemInfo[];
}

/** PprSaveReqBaseInfo */
export interface PprSaveReqBaseInfo {
  /** 广告账户 */
  advertisingAccount?: string;
  /** 附件 */
  attList?: UploadReq[];
  /** 品牌 */
  brand?: string;
  /** 编码 */
  code?: string;
  /** 国家 */
  country?: string;
  /** 币种编码 */
  currencyCode?: string;
  /** 费用类型 */
  feeType?: string;
  /** kol 推广渠道 */
  kolChannelType?: string[];
  /** kol 上线渠道 */
  kolUpLink?: string;
  /** 支付账户 */
  payAccount?: string;
  /** 支付银行 */
  payBank?: string;
  /** 我司付款单位 */
  payCompany?: string;
  /** 支付对象 */
  payObj?: string;
  /**
   * 支付时间
   * @format date-time
   */
  payTime?: string;
  /** 支付类型 */
  payType?: string;
  /** 合作事项编码 */
  projectCode?: string;
  /** 所属项目类型 */
  projectType?: string;
  /** 推广付款类型 */
  promotionPaymentType?: string;
  /** 付款事由 */
  reason?: string;
  /** 备注 */
  remark?: string;
  /** 二级部门 */
  secondDept?: string;
  /** 总付款金额 */
  totalAmount?: number;
  /** 图片 */
  urlList?: UploadReq[];
}

/** PprSaveReqItemInfo */
export interface PprSaveReqItemInfo {
  /** 金额 */
  amount?: number;
  /** 费用归属部门 */
  feeAffiliationDept?: string;
  /** 品线 */
  feeProductLine?: string;
  /** 平台 */
  platform?: string;
  /** 产品名称 */
  productName?: string;
  /** 销售人员 */
  saleCode?: string;
  /** 销售部门 */
  saleDept?: string;
  /** 店铺 */
  shop?: string;
  /** 产品编码 */
  spuCode?: string;
}

/** ProductBean */
export interface ProductBean {
  /** 商品别名 */
  aliasName?: string;
  /** 分类编码 */
  categoryCode?: string;
  /** 一级分类 */
  categoryCodeLevel1?: string;
  /** 二级分类 */
  categoryCodeLevel2?: string;
  /** 三级分类 */
  categoryCodeLevel3?: string;
  /** 四级分类 */
  categoryCodeLevel4?: string;
  /** 五级分类 */
  categoryCodeLevel5?: string;
  /** 产品标签 */
  categoryLabelName?: string;
  /** 分类名称 */
  categoryLevel?: string;
  /** 商品分类名称 */
  categoryNames?: string;
  /** 创建时间 */
  createTime?: string;
  /** 采购是否已填 */
  declareFlag?: boolean;
  /** 申报价格,默认美元USD */
  declarePriceStr?: string;
  /**
   * 申报状态
   * @format int32
   */
  declareStatus?: number;
  /** 申报状态名称 */
  declareStatusDesc?: string;
  /** 申报工单编码 */
  declareWorkflowCode?: string;
  /** GTM经理 */
  gtm?: string;
  /** GTM负责人 */
  gtmLeader?: string;
  /** GTM负责人 */
  gtmLeaderCode?: string;
  /** GTM经理型号 */
  gtmModel?: string;
  /** GTM经理名称 */
  gtmName?: string;
  /**
   * 商品等级 0-暂无 1-正常 2-淘汰 3-侵权
   * @format int32
   */
  level?: number;
  /** 商品等级名称 */
  levelDesc?: string;
  /** 等级是否已填 */
  levelFlag?: boolean;
  /** 上架时间 */
  listingTime?: string;
  /** 型号名称 */
  modelsNames?: string;
  /** 商品名称 */
  name?: string;
  /** 产品英文名称 */
  nameEn?: string;
  /** 规格信息：包装尺寸（长*宽*高）cm3 */
  packageSizeStr?: string;
  /** 计划专员 */
  planner?: string;
  /** 计划专员 */
  plannerName?: string;
  /** 商品图片 */
  productImage?: string;
  /** 品线负责人 */
  productLeader?: string;
  /** 品线负责人 */
  productLeaderCode?: string;
  productLevel?: string;
  productLevelDesc?: string;
  /** 品线 */
  productLine?: string;
  /** 品线名称 */
  productLineName?: string;
  /** 产品经理编码 */
  productManagerCode?: string;
  /** 产品经理名称 */
  productManagerName?: string;
  /**
   * 商品sku数量
   * @format int32
   */
  productSkuCount?: number;
  /** 产品Id,商品编码，商品spu/sku */
  productSpu?: string;
  /**
   * 商品类型
   * @format int32
   */
  productType?: number;
  /** 商品类型名称 */
  productTypeDesc?: string;
  /** 规格信息：毛重量kg */
  productWeightStr?: string;
  /** 采购是否已填 */
  purchaseFlag?: boolean;
  /** 采购信息：采购单价,带币种 */
  purchasePriceStr?: string;
  /**
   * 采购信息：采购审批状态 审批状态 0-未审批 1-审批中 2-审批通过 3-审批拒绝
   * @format int32
   */
  purchaseStatus?: number;
  /** 采购信息：采购审批状态名称 */
  purchaseStatusDesc?: string;
  /**
   * 产品等级：产品质检 0-不需要 1-需要
   * @format int32
   */
  qualityCheck?: number;
  /** 产品等级：产品质检名称 0-不需要 1-需要 */
  qualityCheckDesc?: string;
  /** 产品卖点 */
  sellingPoint?: string;
  /** 系列名称 */
  seriesNames?: string;
  /** sku */
  skuCode?: string;
  /** 规格是否已填 */
  specFlag?: boolean;
  /**
   * 商品状态
   * @format int32
   */
  state?: number;
  /** 商品状态名称 */
  stateDesc?: string;
  /** 建议销售价格,带币种 */
  suggestSellPriceStr?: string;
  /** 采购信息：供应商代码 */
  supplierCode?: string;
  /** 采购信息：供应商名称 */
  supplierName?: string;
  /** 产品标签名称 */
  tagsNames?: string;
  /** 更新时间 */
  updateTime?: string;
  /** voc型号 */
  vocModel?: string;
}

/** ProductInfoBean */
export interface ProductInfoBean {
  /** 商品spu编码 */
  productCode?: string;
  /** 商品spu名称 */
  productName?: string;
}

/** ProductInfoSaveBean */
export interface ProductInfoSaveBean {
  /** 商品spu/sku编码 */
  productCode: string;
  /** 商品spu/sku名称 */
  productName: string;
  /**
   * 商品类型 1-spu 2-sku
   * @format int32
   */
  productType: number;
}

/** ProjectBaseInfo */
export interface ProjectBaseInfo {
  /** 红人名称 */
  meteChannelAccount?: string;
}

/** ReceiveInfoReq */
export interface ReceiveInfoReq {
  /** 买家地址 */
  address?: string;
  /** 区域 */
  area?: string;
  /** 买家城市 */
  city?: string;
  /** 买家国家编码 */
  countryCode?: string;
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

/** ReceiveInfoRes */
export interface ReceiveInfoRes {
  /** 买家地址 */
  address?: string;
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
  /** 门牌号 */
  houseNumber?: string;
  /** 买家姓名 */
  name?: string;
  /** 买家电话 */
  phone?: string;
  /** 买家省份 */
  province?: string;
  /** 卖家账号 */
  userChannel?: string;
  /** 红人code */
  userCode?: string;
  /** 买家邮编 */
  zipcode?: string;
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

/** ReferenceParamsResp */
export interface ReferenceParamsResp {
  /** 币种编码 */
  currencyCode?: string;
  /** 币种 */
  currencyDesc?: string;
  /** 运费 */
  freightAmount?: string;
  /** 交互参数 */
  navigationParamList?: NavigationParam[];
  /**
   * 付款时间
   * @format date-time
   */
  payTime?: string;
  /** Reference No */
  referenceNo?: string;
  /** 店铺账号 */
  shopAccount?: string;
  /** 交易额 */
  transactionAmount?: string;
}

/** SampleOrderV3DetailResp */
export interface SampleOrderV3DetailResp {
  /** 基本信息 */
  baseInfo?: BaseInfoRes;
  /** 商品信息 */
  itemInfoList?: ItemInfoRes[];
  /** 收获信息 */
  receiveInfo?: ReceiveInfoRes;
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
  /** 关键字 红人账号/订单号/产品名称/商品SKU/供应链SKU/客户编码/客户邮箱 */
  keyword?: string;
  /** 待我审核 */
  meReview?: boolean;
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
  /** 订单号支持多个一起搜索，按空格或者,隔开 */
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

/** SampleOrderV3ListQueryResp */
export interface SampleOrderV3ListQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  recordList?: Item[];
  statusStatistics?: StatusStatistics;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** SampleOrderV3RefreshReq */
export interface SampleOrderV3RefreshReq {
  /** 强制刷新 */
  forceRefresh?: boolean;
  /** 刷新订单号，不传就是刷新全部 */
  orderNos?: string[];
  /**
   * 单据类型
   * @format int32
   */
  type?: number;
}

/** SampleOrderV3SaveReq */
export interface SampleOrderV3SaveReq {
  /** 基本信息 */
  baseInfo?: BaseInfoReq;
  /** 合作平台 */
  channelList?: string[];
  /** 商品信息 */
  itemInfoList?: ItemInfoReq[];
  /** 收获信息 */
  receiveInfo?: ReceiveInfoReq;
}

/** SaveCheckDingResp */
export interface SaveCheckDingResp {
  /** 是否需要钉钉审核 */
  needDingAuth?: boolean;
  /** 审核原因 */
  reasonList?: string[];
}

/** SaveMarkInfoBean */
export interface SaveMarkInfoBean {
  /**
   * 折扣类型  1-全站折扣 2-单品折扣 3-分类页折扣
   * @format int32
   */
  discountType?: number;
  /** 标识码 */
  markCode: string;
  /** 折扣码标识 */
  markTag?: string;
  /** 唯一编码, 更新时必传 */
  metaMarkCode?: string;
  /** 协作-运营人员 */
  operator?: string;
  /** 协作-运营人员 */
  operatorName?: string;
  /** 合作产品 */
  productInfoSaveList?: ProductInfoSaveBean[];
  /** 品线集合 */
  productLineCodeList?: string[];
  /** 合作产品编码列表 */
  productSpuCodeList?: string[];
  /** 备注 */
  remark?: string;
  /** 站点 */
  siteCode?: string;
  /** 折扣力度  独立站平台 */
  taskDiscount?: string;
  /** 大促后折扣力度 独立站平台 */
  taskPromotionEndDiscount?: string;
}

/** StatusStatistics */
export interface StatusStatistics {
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
  waitSend?: number;
}

/** TrackingInfoBean */
export interface TrackingInfoBean {
  /**
   * 主键id
   * @format int64
   */
  id?: number;
  /** 追踪码 */
  trackingCode?: string;
}

/** TrackingInfoRequestBean */
export interface TrackingInfoRequestBean {
  /**
   * 主键id
   * @format int64
   */
  id?: number;
  /** 追踪码 */
  taskTrackingCode?: string;
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

/** UserChannelCheckReq */
export interface UserChannelCheckReq {
  /** 渠道账号 */
  channelAccount?: string;
  /** 渠道 youtube tiktok instagram */
  channelCode?: string;
  /** 渠道主页 */
  channelHome?: string;
  /** 邮箱 */
  email?: string;
  /**
   * 粉丝数
   * @format int32
   */
  fansNum?: number;
  /** 标签编码 */
  labelCodeList?: string[];
  /** 备注 */
  remark?: string;
  /**
   * 观看量
   * @format int32
   */
  viewNum?: number;
}

/** UserChannelInfoDeleteReq */
export interface UserChannelInfoDeleteReq {
  /** 渠道编码 */
  channelCode: string;
  /** 用户编码 */
  userCode: string;
}

/** UserChannelInfoUpdateReq */
export interface UserChannelInfoUpdateReq {
  /** 用户编码 */
  updateBeanList: UserChannelUpdateBean[];
}

/** UserChannelListQueryResp */
export interface UserChannelListQueryResp {
  /** 红人渠道列表 */
  activeBeanList?: MetaUserDetailBean[];
}

/** UserChannelSaveReq */
export interface UserChannelSaveReq {
  /** 头像 */
  avatar?: string;
  /** 渠道账号 */
  channelAccount?: string;
  /** 渠道 youtube tiktok instagram */
  channelCode?: string;
  /** 渠道主页 */
  channelHome?: string;
  /** 联系方式 */
  contract?: string;
  /** 国家 */
  country?: string;
  /** 邮箱 */
  email?: string;
  /**
   * 粉丝数
   * @format int32
   */
  fansNum?: number;
  /** 类型code列表 */
  featureCodeList?: string[];
  /** 标签code列表 */
  labelCodeList?: string[];
  /** 成员名称 */
  memberName?: string;
  /** 备注 */
  remark?: string;
  /** 红人名称 */
  username?: string;
  /**
   * 观看量
   * @format int32
   */
  viewNum?: number;
}

/** UserChannelUpdateBean */
export interface UserChannelUpdateBean {
  /** 渠道编码 */
  channelCode: string;
  /** 渠道链接 */
  channelHome?: string;
  /**
   * 粉丝数量
   * @format int32
   */
  fansNum?: number;
  /** 用户编码 */
  userCode: string;
}

/** UserDetailQueryResp */
export interface UserDetailQueryResp {
  /** 头像 */
  avatar?: string;
  /** 品牌 */
  brandName?: string;
  /** 品牌推广 */
  brandTeamStatus?: string;
  /** 账号名称 */
  channelAccount?: string;
  /** 渠道编码列表 */
  channelCodeList?: string[];
  /** 红人链接 */
  channelHome?: string;
  /** 渠道列表 */
  channelList?: MetaUserChannelBean[];
  /** Comfelie推广 */
  comfelieTeamStatus?: string;
  /** 联系方式 */
  contact?: string;
  /** 国家 */
  country?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人/录入人 */
  creator?: string;
  /** 创建人头像 */
  creatorAvatar?: string;
  /** 创建人名称 */
  creatorName?: string;
  /** 创建人职位 */
  creatorTitle?: string;
  /** 日常size */
  dailySize?: string;
  /**
   * 日常size更新时间
   * @format date-time
   */
  dailySizeUpdateTime?: string;
  /** 邮箱 */
  email?: string;
  /** 红人量级 */
  fansLevel?: string;
  /**
   * 粉丝数
   * @format int32
   */
  fansNum?: number;
  /** 特征列表 */
  featureList?: MetaUserFeatureBean[];
  /** GTM推广 */
  gtmTeamStatus?: string;
  /** 标签列表 */
  labelList?: LabelInfoBean[];
  /** 归属人 */
  owner?: string;
  /** 归属人名称 */
  ownerName?: string;
  /**
   * 录入时间
   * @format date
   */
  recordDate?: string;
  /** 备注 */
  remark?: string;
  /** 备注集合 */
  remarkList?: MetaUserRemarkBean[];
  /** 备注集合 */
  remarks?: MetaUserRemarkBean[];
  /** 小店推广 */
  shopTeamStatus?: string;
  /**
   * 状态 1-潜在 2-发展中 3-合作中 4-已淘汰
   * @format int32
   */
  status?: number;
  statusDesc?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /** 用户code */
  userCode?: string;
}

/** UserListParamQueryResp */
export interface UserListParamQueryResp {
  /** 渠道列表 */
  channelList?: EnumBeanString[];
  /** 国家列表 */
  countryList?: EnumBeanString[];
  /** 特征列表 */
  featureList?: EnumBeanString[];
}

/** UserOperateReq */
export interface UserOperateReq {
  /** 标签编码列表, 当 operateType=4 时必填 */
  labelCodeList?: string[];
  /** 待合并红人编码 操作-5 */
  mergeUserCode?: string;
  /**
   * 操作类型 2-剔除 4-更新标签 5-合并红人
   * @format int32
   */
  operateType: number;
  /** 备注 */
  remark?: string;
  /** 红人编码 */
  userCode?: string;
  /** 红人编码集合  批量标签必传 操作-4 */
  userCodeList?: string[];
}

/** UserOperateResp */
export interface UserOperateResp {
  /** 项目编码 */
  projectCode?: string;
  /** 红人编码 */
  userCode?: string;
}

/** UserQueryReq */
export interface UserQueryReq {
  /** 渠道code列表 */
  channelCodeList?: string[];
  /** 合作产品 */
  cooperationProducts?: string[];
  /** 国家code列表 */
  countryList?: string[];
  /** 录入人 */
  creatorCode?: string;
  /**
   * 粉丝数
   * @format int32
   */
  fansNumEnd?: number;
  /**
   * 粉丝数
   * @format int32
   */
  fansNumStart?: number;
  /** 特征code列表 */
  featureCodeList?: string[];
  /** 关键字查询, 用户名称/邮箱 */
  keyword?: string;
  /** 标签code列表 */
  labelCodeList?: string[];
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
  /** 录入日期 yyyy-MM-dd */
  recordDate?: string;
  /** 录入日期 yyyy-MM-dd */
  recordDateEnd?: string;
  /** 录入日期 yyyy-MM-dd */
  recordDateStart?: string;
  /**
   * 状态 1-未合作 2-合作中 MetaUserStatusEnum
   * @format int32
   */
  status?: number;
  /**
   * 团队 1-品牌推广 2-GTM推广 3-小店推广 枚举 MetaUserTeamEnum
   * @format int32
   */
  team?: number;
  /** 团队编码 */
  teamCode?: string;
  /** 未合作产品 */
  unCooperationProducts?: string[];
}

/** UserQueryResp */
export interface UserQueryResp {
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
  /** 红人列表 */
  userList?: MetaUserBean[];
}

/** UserSaveReq */
export interface UserSaveReq {
  /** 红人名称 */
  channelAccount?: string;
  /** 渠道列表 */
  channelList?: MetaUserChannelBean[];
  /** 联系方式 */
  contact?: string;
  /** 国家 */
  country?: string;
  /** 日常size */
  dailySize?: string;
  /**
   * 日常size更新时间
   * @format date-time
   */
  dailySizeUpdateTime?: string;
  /** 邮箱 */
  email?: string;
  /** 特征列表 */
  featureCodeList?: string[];
  /** 标签列表 */
  labelCodeList?: string[];
  /** 备注 */
  remark?: string;
  /** 备注集合 */
  remarks?: MetaUserRemarkBean[];
  /** 红人编码 更新时必传 */
  userCode?: string;
}

/** UserSaveResp */
export interface UserSaveResp {
  /** 红人编码 */
  userCode?: string;
}

/** CommonResp«JSONObject» */
export interface CommonRespJSONObject {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: Record<string, object>;
  traceId?: string;
}

/** CommonResp«PprDraftEnumsResp» */
export interface CommonRespPprDraftEnumsResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: PprDraftEnumsResp;
  traceId?: string;
}

/** CommonResp«SaveCheckDingResp» */
export interface CommonRespSaveCheckDingResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: SaveCheckDingResp;
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

/** EnumBean«string» */
export interface EnumBeanString {
  /** 字段code */
  key?: string;
  /** 字段值, 用于前端展示 */
  value?: string;
}
