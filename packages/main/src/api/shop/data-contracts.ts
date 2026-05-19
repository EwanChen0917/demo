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

/** BusinessDetailResp */
export interface BusinessDetailResp {
  /**
   * 经营状态大类
   * @format int32
   */
  bigStatus?: number;
  /** 经营范围 */
  businessScope?: string;
  /**
   * 企业性质 0-自由 1-购买
   * @format int32
   */
  character?: number;
  /** 企业性质 0-自由 1-购买 */
  characterDesc?: string;
  /** 经营信息code */
  code?: string;
  /**
   * 章数
   * @format int32
   */
  commonSealNum?: number;
  /** 法人 */
  companyLegalPerson?: string;
  /** 法人身份证 */
  companyLegalPersonCard?: string;
  /**
   * 成立时间
   * @format date
   */
  establishedTime?: string;
  /**
   * 是否有营业执照 0-有 1-无
   * @format int32
   */
  hasBusinessLicense?: number;
  /** 是否有营业执照 0-有 1-无 */
  hasBusinessLicenseDesc?: string;
  /**
   * 是否财务公章 0-有 1-无
   * @format int32
   */
  hasCommonSeal?: number;
  /** 是否财务公章 0-有 1-无 */
  hasCommonSealDesc?: string;
  /**
   * 是否财务公章 0-有 1-无
   * @format int32
   */
  hasFinanceSeal?: number;
  /** 是否财务公章 0-有 1-无 */
  hasFinanceSealDesc?: string;
  /**
   * 是否有营业执照 0-有 1-无
   * @format int32
   */
  hasInvoiceSeal?: number;
  /** 是否有营业执照 0-有 1-无 */
  hasInvoiceSealDesc?: string;
  /**
   * 是否法人公章 0-有 1-无
   * @format int32
   */
  hasLegalPersonSeal?: number;
  /** 是否法人公章 0-有 1-无 */
  hasLegalPersonSealDesc?: string;
  /** 企业名称 */
  name?: string;
  /**
   * 属性 0-主号 1-小号 2-备用号
   * @format int32
   */
  property?: number;
  /** 属性 0-主号 1-小号 2-备用号 */
  propertyDesc?: string;
  /** 注册地址 */
  registeredAddress?: string;
  /** 注册资本 */
  registeredCapital?: string;
  /**
   * 经营状态: 1-开业 2-停业 3-清算 4-存续 5-在业 6-吊销 7-注销 8-迁出 9-迁入
   * @format int32
   */
  status?: number;
  /** 状态 */
  statusDesc?: string;
  /** 统一信用代码 */
  unifiedSocialCreditCode?: string;
}

/** BusinessListQueryReq */
export interface BusinessListQueryReq {
  /**
   * 经营状态 1:正常 2:异常
   * @format int32
   */
  bigStatus?: number;
  /**
   * 企业性质 0-自由 1-购买
   * @format int32
   */
  character?: number;
  /** 关键字：公司名称/企业统一信用代码/法人 */
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
  /**
   * 属性 0-主号 1-小号 2-备用号
   * @format int32
   */
  property?: number;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
}

/** BusinessListResp */
export interface BusinessListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 列表项 */
  recordList?: ItemResp[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** BusinessSaveOrUpdateReq */
export interface BusinessSaveOrUpdateReq {
  /** 经营范围 */
  businessScope?: string;
  /**
   * 企业性质 0-自由 1-购买
   * @format int32
   */
  character?: number;
  /** 经营信息code */
  code?: string;
  /**
   * 章数
   * @format int32
   */
  commonSealNum?: number;
  /** 法人 */
  companyLegalPerson?: string;
  /** 法人身份证 */
  companyLegalPersonCard?: string;
  /**
   * 成立时间
   * @format date-time
   */
  establishedTime?: string;
  /**
   * 是否有营业执照 0-有 1-无
   * @format int32
   */
  hasBusinessLicense?: number;
  /**
   * 是否财务公章 0-有 1-无
   * @format int32
   */
  hasCommonSeal?: number;
  /**
   * 是否财务公章 0-有 1-无
   * @format int32
   */
  hasFinanceSeal?: number;
  /**
   * 是否有营业执照 0-有 1-无
   * @format int32
   */
  hasInvoiceSeal?: number;
  /**
   * 是否法人公章 0-有 1-无
   * @format int32
   */
  hasLegalPersonSeal?: number;
  /** 企业名称 */
  name?: string;
  /**
   * 属性 0-主号 1-小号 2-备用号
   * @format int32
   */
  property?: number;
  /** 注册地址 */
  registeredAddress?: string;
  /** 注册资本 */
  registeredCapital?: string;
  /**
   * 经营状态: 1-开业 2-停业 3-清算 4-存续 5-在业 6-吊销 7-注销 8-迁出 9-迁入
   * @format int32
   */
  status?: number;
  /** 统一信用代码 */
  unifiedSocialCreditCode?: string;
}

/** CommonResp */
export interface CommonResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: object;
  traceId?: string;
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

/** ItemResp */
export interface ItemResp {
  /** 注册地址 */
  address?: string;
  /**
   * 企业性质 0-自由 1-购买
   * @format int32
   */
  character?: number;
  /** 企业性质 0-自由 1-购买 */
  characterDesc?: string;
  /** 编码 */
  code?: string;
  /** 法人 */
  companyLegalPerson?: string;
  /** 法人身份证 */
  companyLegalPersonCard?: string;
  /** 企业名称 */
  name?: string;
  /**
   * 属性 0-主号 1-小号 2-备用号
   * @format int32
   */
  property?: number;
  /** 属性 0-主号 1-小号 2-备用号 */
  propertyDesc?: string;
  /** 店铺列表 */
  shopItemList?: ShopItem[];
  /**
   * 关联店铺数
   * @format int32
   */
  shopNum?: number;
  /**
   * 经营状态 1:正常 2:异常
   * @format int32
   */
  status?: number;
  /** 经营状态 */
  statusDesc?: string;
  /** 统一信用代码 */
  unifiedSocialCreditCode?: string;
}

/** ShopAccountInfo */
export interface ShopAccountInfo {
  /** 注册公司地址 */
  registerCompanyAddress?: string;
  /** 注册公司名字 */
  registerCompanyName?: string;
  /** 注册邮箱 */
  registerEmail?: string;
  /** 注册手机号 */
  registerPhoneNumber?: string;
  /** 卖家ID */
  sellerId?: string;
}

/** ShopAccountInfoResp */
export interface ShopAccountInfoResp {
  /** 注册公司地址 */
  registerCompanyAddress?: string;
  /** 注册公司名字 */
  registerCompanyName?: string;
  /** 注册邮箱 */
  registerEmail?: string;
  /** 注册手机号 */
  registerPhoneNumber?: string;
  /** 卖家ID */
  sellerId?: string;
}

/** ShopBusinessInfoResp */
export interface ShopBusinessInfoResp {
  /** 经营地址 */
  address?: string;
  /** 公司法人 */
  companyLegalPerson?: string;
  /** 公司名字 */
  companyName?: string;
  /**
   * 1-正常 2-异常
   * @format int32
   */
  status?: number;
  /** 1-开业 2-仍注册 3-注销 */
  statusDesc?: string;
  /** 统一信用代码 */
  unifiedSocialCreditCode?: string;
}

/** ShopCommonInfo */
export interface ShopCommonInfo {
  /**
   * 授权状态 0-未授权 1-已经授权 2-异常
   * @format int32
   */
  authStatus?: number;
  /** 船长店铺账号 */
  captainShopAccount?: string;
  /** ec店铺账号 */
  ecShopAccount?: string;
  /**
   * 店铺异常状态 1：正常，2：异常
   * @format int32
   */
  errorStatus?: number;
  /**
   * 主键
   * @format int32
   */
  id?: number;
  /** 店铺名称 */
  name?: string;
  /** 平台 */
  platform?: string;
  /** 备注 */
  remark?: string;
  /** 店铺编号 */
  shopCode?: string;
  /**
   * 店铺属性 0-主号 1-小号 2-备用号
   * @format int32
   */
  shopProperty?: number;
  /** 站点 */
  site?: string;
}

/** ShopCommonInfoResp */
export interface ShopCommonInfoResp {
  /**
   * 授权状态 0-未授权 1-已经授权 2-异常
   * @format int32
   */
  authStatus?: number;
  /** 授权状态 0-未授权 1-已经授权 2-异常 */
  authStatusDesc?: string;
  /** 船长店铺账号 */
  captainShopAccount?: string;
  /** 船长店铺状态 */
  captainStatusDesc?: string;
  /** 客服邮箱，按","隔开 */
  customerSupportEmail?: string;
  /** ec店铺账号 */
  ecShopAccount?: string;
  /** 易仓店铺状态 */
  ecStatusDesc?: string;
  /**
   * 店铺异常状态 1:正常 2:异常
   * @format int32
   */
  errorStatus?: number;
  /** 店铺异常状态 1:正常 2:异常 */
  errorStatusDesc?: string;
  /**
   * 店铺Id
   * @format int32
   */
  id?: number;
  /** 店铺名称 */
  name?: string;
  /** 平台 */
  platform?: string;
  /** 平台desc */
  platformDesc?: string;
  /**
   * 回收标签
   * @format int32
   */
  recycleLabel?: number;
  /** 回收标签 */
  recycleLabelDesc?: string;
  /** 备注 */
  remark?: string;
  /** 店铺账号 */
  shopAccount?: string;
  /** 店铺Code */
  shopCode?: string;
  /**
   * 店铺属性
   * @format int32
   */
  shopProperty?: number;
  /** 店铺属性 */
  shopPropertyDesc?: string;
  /** 站点 */
  site?: string;
}

/** ShopDetailResp */
export interface ShopDetailResp {
  /** 经营店铺code */
  businessCode?: string;
  /** 店铺账号信息 */
  shopAccountInfo?: ShopAccountInfoResp;
  /** 店铺经营信息 */
  shopBusinessInfo?: ShopBusinessInfoResp;
  /** 店铺基本信息 */
  shopCommonInfo?: ShopCommonInfoResp;
  /** 店铺财务信息 */
  shopFinanceInfo?: ShopFinanceInfoResp;
}

/** ShopFinanceInfo */
export interface ShopFinanceInfo {
  /** 信用卡持卡人姓名 */
  creditCardHolder?: string;
  /** 信用卡号 */
  creditCardNumber?: string;
  /** 收款账号 */
  receivingAccount?: string;
  /** 收款账号银行识别码 */
  receivingAccountBankIdentificationCode?: string;
}

/** ShopFinanceInfoResp */
export interface ShopFinanceInfoResp {
  /** 信用卡持卡人姓名 */
  creditCardHolder?: string;
  /** 信用卡号 */
  creditCardNumber?: string;
  /** 收款账号 */
  receivingAccount?: string;
  /** 收款账号银行识别码 */
  receivingAccountBankIdentificationCode?: string;
}

/** ShopItem */
export interface ShopItem {
  /** 店铺名称 */
  name?: string;
  /** 平台 */
  platform?: string;
  /** 平台desc */
  platformDesc?: string;
  /** 店铺账号 */
  shopAccount?: string;
  /** 店铺Code */
  shopCode?: string;
  /** 站点 */
  site?: string;
  /**
   * 店铺异常状态 1:正常 0:异常
   * @format int32
   */
  status?: number;
  /** 店铺异常状态 1:正常 0:异常 */
  statusDesc?: string;
}

/** ShopList2Resp */
export interface ShopList2Resp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 店铺明细 */
  shopListDetailResps?: ShopListDetailResp[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** ShopListBaseResp */
export interface ShopListBaseResp {
  /** 公司法人 */
  companyLegalPerson?: string;
  /** 公司名称 */
  companyName?: string;
  /** 卖家ID */
  sellerId?: string;
  /** 店铺明细 */
  shopListDetailResps?: ShopListDetailResp[];
}

/** ShopListDetailResp */
export interface ShopListDetailResp {
  /**
   * 授权状态 0-未授权 1-已经授权 2-异常
   * @format int32
   */
  authStatus?: number;
  /** 授权状态 0-未授权 1-已经授权 2-异常 */
  authStatusDesc?: string;
  /** 船长店铺账号 */
  captainShopAccount?: string;
  /** 船长店铺状态 */
  captainStatusDesc?: string;
  /** ec店铺账号 */
  ecShopAccount?: string;
  /** 易仓店铺状态 */
  ecStatusDesc?: string;
  /**
   * 店铺异常状态 1:正常 0:异常
   * @format int32
   */
  errorStatus?: number;
  /** 店铺异常状态 1:正常 0:异常 */
  errorStatusDesc?: string;
  /**
   * 预计回收时间
   * @format date-time
   */
  expectedRecoveryTime?: string;
  /** 店铺名称 */
  name?: string;
  /** 平台 */
  platform?: string;
  /** 平台desc */
  platformDesc?: string;
  /**
   * 实际回收时间
   * @format date-time
   */
  realRecoveryTime?: string;
  /** 回收标签备注 */
  recoveryRemark?: string;
  /**
   * 回收标签
   * @format int32
   */
  recycleLabel?: number;
  /** 回收标签 */
  recycleLabelDesc?: string;
  /** 备注 */
  remark?: string;
  /** 卖家ID */
  sellerId?: string;
  /** 店铺账号 */
  shopAccount?: string;
  /** 店铺Code */
  shopCode?: string;
  /**
   * 店铺属性
   * @format int32
   */
  shopProperty?: number;
  /** 店铺属性 */
  shopPropertyDesc?: string;
  /** 站点 */
  site?: string;
  /**
   * 状态 1：启用，0：停用，2：授权中（次状态很少出现）3-关店
   * @format int32
   */
  status?: number;
}

/** ShopListQueryReq */
export interface ShopListQueryReq {
  /**
   * 授权状态 0-未授权 1-已经授权 2-异常
   * @format int32
   */
  authStatus?: number;
  /**
   * 店铺异常状态 1:正常 2:异常
   * @format int32
   */
  errorStatus?: number;
  /** 关键字：店铺名称/店铺账号 */
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
  /** 平台代码 */
  platformCode?: string;
  /** 平台代码(多选) */
  platformCodes?: string[];
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 回收标签 */
  recycleLabel?: string;
  /** 店铺列表 */
  shopCodeList?: string[];
  /** 店铺属性 */
  shopProperty?: string;
}

/** ShopListResp */
export interface ShopListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 列表项 */
  shopListResps?: ShopListBaseResp[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** ShopPerformanceEditReq */
export interface ShopPerformanceEditReq {
  /** 编码 */
  code?: string;
  /** 无需处理原因：无需处理时填写 */
  noHandlerReason?: string;
  /** 运营 */
  operatorCode?: string;
  /** 备注 */
  remark?: string;
  /**
   * 店铺绩效状态：0-待处理 1-处理中 2-已处理 3-无需处理
   * @format int32
   */
  status?: number;
}

/** ShopPerformanceListBean */
export interface ShopPerformanceListBean {
  /** ASIN */
  asin?: string;
  /** 编码 */
  code?: string;
  /**
   * 截止时间
   * @format date
   */
  deadlineTime?: string;
  /** 无需处理原因 */
  noHandlerReason?: string;
  /**
   * 出现时间
   * @format date
   */
  occurrenceTime?: string;
  /** 运营 */
  operatorCode?: string;
  /** 运营 */
  operatorName?: string;
  /** 备注 */
  remark?: string;
  /** 风险大类 */
  riskCategory?: string;
  /** 店铺 */
  shopCode?: string;
  /** 站点 */
  site?: string;
  /** 具体原因 */
  specificReason?: string;
  /**
   * 处理状态
   * @format int32
   */
  status?: number;
  /** 处理状态 */
  statusName?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** ShopPerformanceListReq */
export interface ShopPerformanceListReq {
  /** code */
  code?: string;
  /**
   * 结束时间
   * @format date
   */
  endTime?: string;
  /** 搜索内容 */
  keyWord?: string;
  /** 运营 */
  operatorCodes?: string[];
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
  /** 风险大类：0-政策合规性 1-业绩通知 */
  riskCategories?: number[];
  /**
   * 搜索框类型：0-ASIN 1-具体原因
   * @format int32
   */
  searchType?: number;
  /** 店铺 */
  shopCodes?: string[];
  /** 站点 */
  sites?: string[];
  /**
   * 开始时间
   * @format date
   */
  startTime?: string;
  /**
   * 店铺绩效状态：0-待处理 1-处理中 2-已处理
   * @format int32
   */
  status?: number;
  /**
   * 时间类型：0-出现时间 1-截止时间 2-更新时间
   * @format int32
   */
  timeType?: number;
  /** 即将到期: true */
  willExpire?: boolean;
}

/** ShopPerformanceListResp */
export interface ShopPerformanceListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 列表项 */
  recordList?: ShopPerformanceListBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** ShopPerformanceMarkStatusReq */
export interface ShopPerformanceMarkStatusReq {
  /** 编码 */
  codes?: string[];
  /**
   * 状态: 1-处理中 2-已处理
   * @format int32
   */
  status?: number;
}

/** ShopPerformanceStateStatisticsResp */
export interface ShopPerformanceStateStatisticsResp {
  /**
   * 已处理数量
   * @format int64
   */
  handleCompletedCount?: number;
  /**
   * 即将到期数量
   * @format int64
   */
  noNeedHandleCount?: number;
  /**
   * 处理中数量
   * @format int64
   */
  processingCount?: number;
  /**
   * 待处理数量
   * @format int64
   */
  waitHandleCount?: number;
}

/** ShopRecycleLabelSaveReq */
export interface ShopRecycleLabelSaveReq {
  /**
   * 预计回收时间
   * @format date-time
   */
  expectedRecoveryTime?: string;
  /**
   * 实际回收时间
   * @format date-time
   */
  realRecoveryTime?: string;
  /**
   * 回收标签：0-预计回收 1-回收中 2-已回收
   * @format int32
   */
  recoveryLabel?: number;
  /** 备注 */
  remark?: string;
  /** 店铺code */
  shopCode: string;
}

/** ShopRemarkSaveReq */
export interface ShopRemarkSaveReq {
  /** 备注 */
  remark: string;
  /** 店铺code */
  shopCode: string;
}

/** ShopSaveReq */
export interface ShopSaveReq {
  /** 经营店铺code */
  businessCode?: string;
  /** 店铺账号信息 */
  shopAccountInfo?: ShopAccountInfo;
  /** 店铺基本信息 */
  shopCommonInfo?: ShopCommonInfo;
  /** 店铺财务信息 */
  shopFinanceInfo?: ShopFinanceInfo;
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
