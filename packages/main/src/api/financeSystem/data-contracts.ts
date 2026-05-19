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

/** AccountAgingDetailStatisticsBean */
export interface AccountAgingDetailStatisticsBean {
  /** 银行到账金额 */
  bankReceiptAmount?: number;
  /** 银行到账时间 */
  bankReceiptTimes?: string[];
  /** Commission */
  cnCommission?: number;
  /** 佣金 */
  commission?: number;
  /** 币别 */
  currency?: string;
  /** 客户编码 */
  customerCode?: string;
  /** 客户返点 */
  customerCommission?: number;
  /** 客户名称 */
  customerName?: string;
  /** 客户PO */
  customerPo?: string;
  /** 客户退款 */
  customerServiceRefund?: number;
  /** 客户补贴 */
  customerSubsidy?: number;
  /**
   * 发货时间
   * @format date-time
   */
  deliveryTime?: string;
  /** 汇率 */
  exchangeRate?: number;
  /**
   * 到期日
   * @format date-time
   */
  expiryDate?: string;
  /** 手续费 */
  fee?: number;
  /** 收入结算单号 */
  incomeStatementNo?: string;
  /** 月份 */
  month?: string;
  /** 线下损耗 */
  offlineLoss?: number;
  /** 线下推广费 */
  offlinePromotionFee?: number;
  /** 线下签收差异 */
  offlineSignDifference?: number;
  /** 订单金额 */
  orderAmount?: number;
  /** 订单号 */
  orderNo?: string;
  /** 原币 */
  originalCurrency?: string;
  /**
   * 逾期天数
   * @format int64
   */
  overdueDays?: number;
  /** 价格保护 */
  priceProtection?: number;
  /** 促销折扣 */
  promotionDiscount?: number;
  /** 应收余额 */
  receivableBalance?: number;
  /** 退款额 */
  refundAmount?: number;
  /** RMA allowance */
  rmaAllowance?: number;
  /** 销售运费 */
  salesFreight?: number;
  /** 状态 */
  status?: string;
}

/** AccountAgingDetailStatisticsResp */
export interface AccountAgingDetailStatisticsResp {
  code?: string;
  /** 表头信息 */
  headerBean?: AccountAgingHeaderBean;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 数据列表 */
  recordList?: AccountAgingDetailStatisticsBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** AccountAgingHeaderBean */
export interface AccountAgingHeaderBean {
  /** 单据表头列表 */
  headers?: Header[];
  /**
   * 类型 1-统计汇总  2-明细
   * @format int32
   */
  type?: number;
}

/** AccountAgingSummaryStatisticsBean */
export interface AccountAgingSummaryStatisticsBean {
  /** 银行到账金额 */
  bankReceiptAmount?: number;
  /** Commission */
  cnCommission?: number;
  /** 佣金 */
  commission?: number;
  /** 币别 */
  currency?: string;
  /** 客户编码 */
  customerCode?: string;
  /** 客户返点 */
  customerCommission?: number;
  /** 客户名称 */
  customerName?: string;
  /** 客户退款 */
  customerServiceRefund?: number;
  /** 客户补贴 */
  customerSubsidy?: number;
  /** 部门 */
  department?: string;
  /** 汇率 */
  exchangeRate?: number;
  /** 手续费 */
  fee?: number;
  /** 唯一键key */
  key?: string;
  /** 91-180天 */
  ninetyOneToOneEightyDays?: number;
  /** 未逾期 */
  notOverdue?: number;
  /** 线下损耗 */
  offlineLoss?: number;
  /** 线下推广费 */
  offlinePromotionFee?: number;
  /** 线下签收差异 */
  offlineSignDifference?: number;
  /** 181天及以上 */
  oneEightyOneDays?: number;
  /** 1-30天 */
  oneToThirtyDays?: number;
  /** 订单金额 */
  orderAmount?: number;
  /** 原币 */
  originalCurrency?: string;
  /** 收款条件 */
  paymentCondition?: string;
  /** 价格保护 */
  priceProtection?: number;
  /** 促销折扣 */
  promotionDiscount?: number;
  /** 应收余额 */
  receivableBalance?: number;
  /** 退款额 */
  refundAmount?: number;
  /** RMA allowance */
  rmaAllowance?: number;
  /** 销售渠道 */
  saleChannel?: string;
  /** 销售运费 */
  salesFreight?: number;
  /** 结算组织 */
  settlementOrganization?: string;
  /** 61-90天 */
  sixtyOneToNinetyDays?: number;
  /** 31-60天 */
  thirtyOneToSixtyDays?: number;
}

/** AccountAgingSummaryStatisticsResp */
export interface AccountAgingSummaryStatisticsResp {
  code?: string;
  /** 表头信息 */
  headerBean?: AccountAgingHeaderBean;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 数据列表 */
  recordList?: AccountAgingSummaryStatisticsBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** AgingDetailStatisticsReq */
export interface AgingDetailStatisticsReq {
  /** 结算单号/订单号/客户PO */
  code?: string;
  /**
   * 币别 1-原币  2-人民币
   * @format int32
   */
  currencyCode?: number;
  /** 客户 */
  customerCode?: string;
  /** 无数据费用不展示 */
  noDataFeeColumnNotDisplay?: boolean;
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
   * 统计时间
   * @format date-time
   */
  statisticsTime?: string;
  /** 应收余额为0不展示 */
  zeroBalanceNotDisplay?: boolean;
  /**
   * 零应收起始日期
   * @format date-time
   */
  zeroBalanceStartDate?: string;
}

/** AgingSummaryStatisticsReq */
export interface AgingSummaryStatisticsReq {
  /**
   * 币别 1-原币  2-人民币
   * @format int32
   */
  currencyCode?: number;
  /** 客户 */
  customerCodes?: string[];
  /** 无数据费用列不展示 */
  noDataFeeColumnNotDisplay?: boolean;
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
  /** 收款条件 */
  paymentConditions?: string[];
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /**
   * 统计时间
   * @format date-time
   */
  statisticsTime?: string;
  /** 应收余额为0不展示 */
  zeroBalanceNotDisplay?: boolean;
  /**
   * 零应收起始日期
   * @format date-time
   */
  zeroBalanceStartDate?: string;
}

/** ApplyInfo */
export interface ApplyInfo {
  code?: string;
  id?: string;
  type?: string;
}

/** AttachmentInfo */
export interface AttachmentInfo {
  businessCode?: string;
  companyCode?: string;
  /** @format date-time */
  createTime?: string;
  creator?: string;
  creatorName?: string;
  /** @format int64 */
  deleted?: number;
  fileName?: string;
  /** @format int64 */
  fileSize?: number;
  fileType?: string;
  fileUrl?: string;
  /** @format int64 */
  id?: number;
  name?: string;
  /** @format int32 */
  sort?: number;
}

/** AttachmentInfoBean */
export interface AttachmentInfoBean {
  /** 文件名称 */
  fileName?: string;
  /**
   * 文件大小
   * @format int64
   */
  fileSize?: number;
  /** 文件类型 */
  fileType?: string;
  /** 文件地址 */
  fileUrl?: string;
  /** 名称 */
  name?: string;
}

/** AttachmentInfoUploadReq */
export interface AttachmentInfoUploadReq {
  /** 业务编码 */
  businessCode?: string;
  /** 文件名称 */
  fileName?: string;
  /**
   * 文件大小
   * @format int64
   */
  fileSize?: number;
  /** 文件类型 */
  fileType?: string;
  /** 文件地址 */
  fileUrl?: string;
  /** 名称 */
  name?: string;
  /** ossKey */
  ossKey?: string;
}

/** BankAccountListReq */
export interface BankAccountListReq {
  /** @format int32 */
  billType?: number;
  /**
   * 分贝通推送状态: 0-未推送 1-推送成功 2-推送失败
   * @format int32
   */
  fbtPushStatus?: number;
  /**
   * 分贝通关联状态: 0-未关联 1-已关联
   * @format int32
   */
  fbtRelateStatus?: number;
  /** 关键字 */
  keyword?: string;
  /** 开户组织 */
  openOrgList?: string[];
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
  /**
   * 金蝶推送状态: 0-未推送 1-推送成功 2-推送失败
   * @format int32
   */
  pushStatus?: number;
  /**
   * 金蝶关联状态: 0-未关联 1-已关联
   * @format int32
   */
  relateStatus?: number;
}

/** BankAccountListResp */
export interface BankAccountListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 开户组织列表 */
  recordList?: BasicBankAccountBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** BaseInfo */
export interface BaseInfo {
  /**
   * 单据类型: 43-其他入库单 42-其他出库单
   * @format int32
   */
  billType?: number;
  /** 单据类型描述 */
  billTypeDesc?: string;
  /** 出库单号 */
  code?: string;
  /** 创建人账号 */
  createBy?: string;
  /** 创建人名称 */
  createDesc?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /**
   * 主键ID
   * @format int64
   */
  id?: number;
  /** 其他出库库存类型：normal-良品、bad-次品 */
  inventoryType?: string;
  /** 积加出库单号 */
  jjCode?: string;
  /** 推送jj失败原因 */
  jjPushFailureReason?: string;
  /** kingdee仓库编号 */
  kingdeeWarehouseNumber?: string;
  /** 其他出库操作类型：a. 透明标等物料类（无成本）b. 赠送 */
  operationType?: string;
  /** 操作类型 */
  operationTypeDesc?: string;
  /** 组织 */
  orgNumberCode?: string;
  /** 组织 */
  orgNumberName?: string;
  /** 其他出库方式：默认先进先出 */
  outboundMethod?: string;
  /** 出库人ID */
  outboundOperatorId?: string;
  /** 出库人名称 */
  outboundOperatorName?: string;
  /**
   * 出库时间
   * @format date-time
   */
  outboundTime?: string;
  /** 推送失败原因 */
  pushFailureReason?: string;
  /** 备注 */
  remark?: string;
  /**
   * 状态：待出库、已完成、异常、废弃
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
  /** 仓库编号 */
  warehouseCode?: string;
  /** 仓库名称 */
  warehouseDesc?: string;
}

/** BasicBankAccountBean */
export interface BasicBankAccountBean {
  /** 银行账号 */
  bankAccount?: string;
  /** 银行类别 */
  bankTypeName?: string;
  /** 币别范围 */
  currencyRange?: string;
  /** 开户组织 */
  openOrg?: string;
  /** 开户组织 */
  openOrgDesc?: string;
  /** 账户简称 */
  shortName?: string;
}

/** BasicCategoryBean */
export interface BasicCategoryBean {
  /** 名称 */
  categoryName?: string;
  /** 分类编码 */
  catrgoryCode?: string;
  /** fbt推送信息 */
  fbtPushInfo?: BasicPushBean;
  /** kingdee推送信息 */
  kingdeePushInfo?: BasicPushBean;
  /**
   * 分类级别
   * @format int32
   */
  level?: number;
  /** 父级编码 */
  parentCode?: string;
  /** 父级名称 */
  parentName?: string;
}

/** BasicCustomerBean */
export interface BasicCustomerBean {
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 客户编码 */
  customerCode?: string;
  /** 客户名称 */
  customerName?: string;
  /** 客户来源 01-店铺 02-B2B客户 */
  customerSource?: string;
  /** 客户来源 01-店铺 02-B2B客户 */
  customerSourceName?: string;
  /** 失败原因 */
  failReason?: string;
  /** 积加同步到金蝶的客户id */
  jijiaCustomerId?: string;
  /** 金蝶编码 */
  kingdeeNumber?: string;
  /** 站点名称 */
  marketName?: string;
  /** 平台编码 */
  platformCode?: string;
  /** 平台名称 */
  platformName?: string;
  /**
   * 推送状态: 0-未推送 1-推送成功 2-推送失败
   * @format int32
   */
  pushStatus?: number;
  /** 推送状态描述 */
  pushStatusDesc?: string;
  /**
   * 推送时间
   * @format date-time
   */
  pushTime?: string;
  /** 店铺名称 */
  shopName?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** BasicCustomsDeclarationPlanBean */
export interface BasicCustomsDeclarationPlanBean {
  /** 推送用的单据编码 */
  billNo?: string;
  /** @format int32 */
  customsDeclarationMaintainStatus?: number;
  /** 报关维护 */
  customsDeclarationMaintainStatusDesc?: string;
  /** @format int32 */
  customsDeclarationStatus?: number;
  /** 是否需报关 */
  customsDeclarationStatusDesc?: string;
  /**
   * 发货时间
   * @format date-time
   */
  deliveryTime?: string;
  /** 订单号 */
  erpCode?: string;
  /**
   * 主键id
   * @format int64
   */
  id?: number;
  /** 积加推送信息 */
  jiJiaPushInfo?: BasicPushBean;
  logisticsAuditor?: string;
  /** 物流审核人 */
  logisticsAuditorName?: string;
  /** SKU编码 */
  supplySku?: string;
  /** SKU名称 */
  supplySkuName?: string;
}

/** BasicDepartmentBean */
export interface BasicDepartmentBean {
  /**
   * 部门状态， 禁用时传入0
   * @format int32
   */
  active?: number;
  /**
   * 预算部门id
   * @format int64
   */
  budgetDeptId?: number;
  /** 预算部门名称 */
  budgetDeptName?: string;
  /**
   * 预算状态：0-普通部门 1-预算部门
   * @format int32
   */
  budgetStatus?: number;
  /** 预算状态描述 */
  budgetStatusDesc?: string;
  /** Comfelie不算在渠道的站外推广费-OA：Y=是，N=否，待分配=待分配 */
  comfelieOutsideFee?: string;
  /** Comfelie不算在渠道的站外推广费-OA：Y=是，N=否，待分配=待分配 */
  comfelieOutsideFeeDesc?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 数据来源 */
  dataSourceDesc?: string;
  /**
   * 是否删除：0-否，非0-是
   * @format int64
   */
  deleted?: number;
  /**
   * 部门id
   * @format int64
   */
  deptId?: number;
  /** 部门的主管userId列表 多个逗号分割 */
  deptManagerName?: string;
  /** 部门的主管userId列表 [int] */
  deptManagerUseridList?: string;
  /** 部门名称 */
  deptName?: string;
  /** 部门状态 */
  deptStatus?: string;
  /** fbt推送信息 */
  fbtPushInfo?: BasicPushBean;
  /** GTM推广费（其中素材制作费）：Y=是，N=否，待分配=待分配 */
  gtmMaterialFee?: string;
  /** GTM推广费（其中素材制作费）：Y=是，N=否，待分配=待分配 */
  gtmMaterialFeeDesc?: string;
  /** GTM推广费-OA：Y=是，N=否，待分配=待分配 */
  gtmPromotionFee?: string;
  /** GTM推广费-OA：Y=是，N=否，待分配=待分配 */
  gtmPromotionFeeDesc?: string;
  /** kingdee推送信息 */
  kingdeePushInfo?: BasicPushBean;
  /**
   * 部门层级
   * @format int32
   */
  level?: number;
  /** 部门层级描述 */
  levelDesc?: string;
  /** 站外推广费-OA：Y=是，N=否，待分配=待分配 */
  outsidePromotionFee?: string;
  /** 站外推广费-OA：Y=是，N=否，待分配=待分配 */
  outsidePromotionFeeDesc?: string;
  /**
   * 父部门id
   * @format int64
   */
  parentId?: number;
  /** 父部门名称 */
  parentName?: string;
  /** 区域推广费-OA：Y=是，N=否，待分配=待分配 */
  regionPromotionFee?: string;
  /** 区域推广费-OA：Y=是，N=否，待分配=待分配 */
  regionPromotionFeeDesc?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** BasicGtmGroupMappingBean */
export interface BasicGtmGroupMappingBean {
  /** fbt推送信息 */
  fbtPushInfo?: BasicPushBean;
  /** GTM品线编码 */
  gtmPlCode?: string;
  /** GTM品线名称 */
  gtmPlName?: string;
  /**
   * 主键id
   * @format int64
   */
  id?: number;
  /** 产品spu */
  productSpu?: string;
  /** 商品名称 */
  productSpuName?: string;
  /** 三级类目编码 */
  thirdCategoryCode?: string;
  /** 三级类目名称 */
  thirdCategoryName?: string;
}

/** BasicMemberAccountBean */
export interface BasicMemberAccountBean {
  /**
   * 银行联行号
   * @example 102100099996
   */
  accountsBankId?: string;
  /**
   * 开户行
   * @example "中国工商银行"
   */
  accountsBankName?: string;
  /**
   * 银行卡号
   * @example 6222021234567890000
   */
  accountsCode?: string;
  /**
   * 账户名称
   * @example "张三"
   */
  accountsName?: string;
  /**
   * 支行联行号
   * @example 102100000017
   */
  accountsSubbranchId?: string;
  /**
   * 支行
   * @example "中国工商银行北京分行"
   */
  accountsSubbranchName?: string;
  /**
   * 账户类型(1-银行卡 2-支付宝 3-微信)
   * @format int32
   * @example 1
   */
  accountsType?: number;
  /**
   * 账户类型(1-银行卡 2-支付宝 3-微信)
   * @example "张三"
   */
  accountsTypeDesc?: string;
  /**
   * 主键ID
   * @format int64
   * @example 1
   */
  id?: number;
  /**
   * 会员编码
   * @example "M2025001"
   */
  memberCode?: string;
  /** 金蝶账户推送信息 */
  memberKingdeeAccountPushInfo?: BasicPushBean;
}

/** BasicMemberBean */
export interface BasicMemberBean {
  /**
   * 是否激活
   * @format int32
   */
  active?: number;
  /** 是否激活描述 */
  activeDesc?: string;
  /**
   * 职员法人公司ID
   * @format int64
   */
  corporationId?: number;
  /** 职员法人公司名称 */
  corporationName?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /**
   * 职员部门id
   * @format int64
   */
  deptId?: number;
  /** 职员部门名称 */
  deptName?: string;
  /** 失败原因 */
  failReason?: string;
  /** fbt推送信息 */
  fbtPushInfo?: BasicPushBean;
  /** 工号 */
  jobNumber?: string;
  /** 金蝶编码 */
  kingdeeNumber?: string;
  /** kingdee推送信息 */
  kingdeePushInfo?: BasicPushBean;
  /** 直属上级名称 */
  managerName?: string;
  /** 直属userid */
  managerUserid?: string;
  /** 用户编码 */
  memberCode?: string;
  /** 手机号 */
  mobile?: string;
  /** 姓名 */
  name?: string;
  /**
   * 推送状态: 0-未推送 1-推送成功 2-推送失败
   * @format int32
   */
  pushStatus?: number;
  /** 推送状态描述 */
  pushStatusDesc?: string;
  /**
   * 推送时间
   * @format date-time
   */
  pushTime?: string;
  /** 职员id(钉钉 user id) */
  userId?: string;
}

/** BasicNewProductBean */
export interface BasicNewProductBean {
  /** 数据源 */
  dataSource?: string;
  /** fbt推送信息 */
  fbtPushInfo?: BasicPushBean;
  /** kingdee推送信息 */
  kingdeePushInfo?: BasicPushBean;
  /** 编码 */
  productCode?: string;
  /** 名称 */
  productName?: string;
}

/** BasicProductBean */
export interface BasicProductBean {
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 失败原因 */
  failReason?: string;
  /** 金蝶编码 */
  kingdeeNumber?: string;
  /** 产品编码 */
  productCode?: string;
  /** 产品名称 */
  productName?: string;
  /** 产品来源 01-SKU列表 02-供应链产品-物料 03-供应链产品-配件 */
  productSource?: string;
  /** 产品来源 01-SKU列表 02-供应链产品-物料 03-供应链产品-配件 */
  productSourceName?: string;
  /**
   * 推送状态: 0-未推送 1-推送成功 2-推送失败
   * @format int32
   */
  pushStatus?: number;
  /** 推送状态描述 */
  pushStatusDesc?: string;
  /**
   * 推送时间
   * @format date-time
   */
  pushTime?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** BasicPushBean */
export interface BasicPushBean {
  /**
   * 单据类型
   * @format int32
   */
  billType?: number;
  /** 单据类型描述 */
  billTypeDesc?: string;
  excelTest?: string;
  /** 失败原因 */
  failReason?: string;
  /** 编码 */
  number?: string;
  /**
   * 推送状态: 0-未推送 1-推送成功 2-推送失败
   * @format int32
   */
  pushStatus?: number;
  /** 推送状态描述 */
  pushStatusDesc?: string;
  /**
   * 推送时间
   * @format date-time
   */
  pushTime?: string;
}

/** BasicRecOrderBean */
export interface BasicRecOrderBean {
  /** 公司代码 */
  companyCode?: string;
  /** 公司名称 */
  companyName?: string;
  /** 成本调整单编号 */
  costAdjustBillNo?: string;
  /** 未税差异(发票未税金额-上架未税金额-附加费未税金额+票扣未税金额) */
  diffNetAmount?: number;
  /** 税额差异(发票税额-对账单税额) */
  diffTaxAmount?: number;
  /** 失败原因 */
  failReason?: string;
  /** 采购发票编号 */
  invoiceBillNo?: string;
  /**
   * 发票确认时间
   * @format date-time
   */
  invoiceConfirmTime?: string;
  /** 发票未税金额 */
  invoiceNetAmount?: number;
  /** 发票税额 */
  invoiceTaxAmount?: number;
  /** 金蝶编码 */
  kingdeeNumber?: string;
  /** 应付调整单编号 */
  payableAdjustBillNo?: string;
  /**
   * 付款申请通过时间
   * @format date-time
   */
  paymentApprovaledTime?: string;
  /**
   * 推送状态: 0-未推送 1-推送成功 2-推送失败
   * @format int32
   */
  pushStatus?: number;
  /** 推送状态描述 */
  pushStatusDesc?: string;
  /**
   * 推送时间
   * @format date-time
   */
  pushTime?: string;
  /** 对账单未税金额(上架未税金额+附加费未税金额-票扣未税金额) */
  recNetAmount?: number;
  /** 对账单税额(上架未税税额+附加费税额-票扣税额) */
  recTaxAmount?: number;
  /** SRM对账单号 */
  srmRecBillNo?: string;
  /** 供应商编码 */
  supplierCode?: string;
  /** 供应商名称 */
  supplierName?: string;
}

/** BasicSpuBean */
export interface BasicSpuBean {
  /** fbt推送信息 */
  fbtPushInfo?: BasicPushBean;
  /** kingdee推送信息 */
  kingdeePushInfo?: BasicPushBean;
  /** 名称 */
  name?: string;
  /** spu */
  productSpu?: string;
}

/** BasicSupplierAccountBean */
export interface BasicSupplierAccountBean {
  /**
   * 银行联行号
   * @example 102100099996
   */
  accountsBankId?: string;
  /**
   * 开户行
   * @example "中国工商银行"
   */
  accountsBankName?: string;
  /**
   * 银行卡号
   * @example 6222021234567890000
   */
  accountsCode?: string;
  /**
   * 账户名称
   * @example "张三"
   */
  accountsName?: string;
  /**
   * 支行联行号
   * @example 102100000017
   */
  accountsSubbranchId?: string;
  /**
   * 支行
   * @example "中国工商银行北京分行"
   */
  accountsSubbranchName?: string;
  /**
   * 账户类型(2-国内银行卡)
   * @format int32
   * @example 1
   */
  accountsType?: number;
  /**
   * 账户类型(2-国内银行卡)
   * @example "张三"
   */
  accountsTypeDesc?: string;
  /**
   * 编号
   * @example "M2025001"
   */
  code?: string;
  /**
   * 主键ID
   * @format int64
   * @example 1
   */
  id?: number;
  /** 金蝶账户推送信息 */
  kingdeeAccountPushInfo?: BasicPushBean;
}

/** BasicSupplierBean */
export interface BasicSupplierBean {
  /** 编码 */
  code?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 失败原因 */
  failReason?: string;
  /** 金蝶编码 */
  kingdeeNumber?: string;
  /** 金蝶推送信息 */
  kingdeePushInfo?: BasicPushBean;
  /**
   * 推送状态: 0-未推送 1-推送成功 2-推送失败
   * @format int32
   */
  pushStatus?: number;
  /** 推送状态描述 */
  pushStatusDesc?: string;
  /**
   * 推送时间
   * @format date-time
   */
  pushTime?: string;
  /** 供应商编码-来源 */
  supplierCode?: string;
  /** 供应商名称-来源 */
  supplierName?: string;
  /** 供应商来源 01-SRM供应商 fbt-分贝通 */
  supplierSource?: string;
  /** 供应商来源 01-SRM供应商 fbt-分贝通 */
  supplierSourceName?: string;
  /**
   * 类型 1-采购 2-物流 3-广告服务
   * @format int32
   */
  type?: number;
  /** 类型名称 */
  typeName?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** BasicWarehouse */
export interface BasicWarehouse {
  companyCode?: string;
  countryCode?: string;
  /** @format date-time */
  createTime?: string;
  /** @format int64 */
  deleted?: number;
  /** @format int64 */
  id?: number;
  inputSource?: string;
  jjWarehouseDesc?: string;
  jjWarehouseId?: string;
  platformCode?: string;
  /** @format int32 */
  providerType?: number;
  serviceProviderCode?: string;
  serviceProviderName?: string;
  /** @format int32 */
  status?: number;
  /** @format date-time */
  updateTime?: string;
  warehouseCode?: string;
  warehouseDesc?: string;
  /** @format int32 */
  warehouseId?: number;
  warehouseType?: string;
}

/** BasicWarehouseBean */
export interface BasicWarehouseBean {
  /** 地区 */
  countryCode?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 失败原因 */
  failReason?: string;
  /** 录入来源 */
  inputSource?: string;
  /** 录入来源描述 */
  inputSourceDesc?: string;
  /** 积家仓库id */
  jjWarehouseId?: string;
  /** 积家仓库名称 */
  jjWarehouseName?: string;
  /** 金蝶编码 */
  kingdeeNumber?: string;
  /**
   * 推送状态: 0-未推送 1-推送成功 2-推送失败
   * @format int32
   */
  pushStatus?: number;
  /** 推送状态描述 */
  pushStatusDesc?: string;
  /**
   * 推送时间
   * @format date-time
   */
  pushTime?: string;
  /** 服务商 */
  serviceProviderName?: string;
  /**
   * 启用状态 0-禁用 1-启用
   * @format int32
   */
  status?: number;
  /** 启用状态描述 */
  statusDesc?: string;
  /** 仓库编码 */
  warehouseCode?: string;
  /**
   * 仓库id
   * @format int32
   */
  warehouseId?: number;
  /** 仓库名称 */
  warehouseName?: string;
  /** 仓库类型 */
  warehouseType?: string;
  /** 仓库类型描述 */
  warehouseTypeDesc?: string;
}

/** BatchSetBudgetDeptReq */
export interface BatchSetBudgetDeptReq {
  /**
   * 预算状态：0-普通部门 1-预算部门
   * @format int32
   */
  budgetStatus?: number;
  /** 部门id */
  listDeptId?: string[];
}

/** BatchUpdateCustomsDeclarationStatusReq */
export interface BatchUpdateCustomsDeclarationStatusReq {
  /**
   * 报关状态：0-未确认 1-是 2-否
   * @format int32
   */
  customsDeclarationStatus?: number;
  /** 单据编码 */
  listBillNo?: string[];
}

/** BillPushRecord */
export interface BillPushRecord {
  billNo?: string;
  /** @format int32 */
  billStatus?: number;
  /** @format int32 */
  billType?: number;
  /** @format date-time */
  createTime?: string;
  errorInfo?: string;
  extraInfo?: string;
  /** @format int64 */
  id?: number;
  kingdeeId?: string;
  kingdeeNumber?: string;
  parentBillNo?: string;
  /** @format int32 */
  parentBillType?: number;
  pushInfo?: string;
  success?: boolean;
  systemCode?: string;
  /** @format date-time */
  updateTime?: string;
  url?: string;
}

/** BillTypeUniqueBean */
export interface BillTypeUniqueBean {
  /** 编码列表 */
  code?: string;
  /**
   * 类型: 40-调拨入 41-调拨出
   * @format int32
   */
  type?: number;
}

/** BillingBaseBean */
export interface BillingBaseBean {
  /** 金额 */
  amount?: number;
  /** 发票号 */
  code?: string;
  /** 佣金 */
  commission?: number;
  /** 币别 */
  currency?: string;
  /** 客户编码 */
  customerCode?: string;
  /** 客户名称 */
  customerName?: string;
  /** 客户PO */
  customerPo?: string;
  /**
   * 日期
   * @format date
   */
  invoiceDate?: string;
  /** 发票净额 */
  invoiceNetAmount?: number;
  /** 订单号 */
  orderNumber?: string;
  /** 销售运费 */
  shippingFee?: number;
  /**
   * 数据来源
   * @format int32
   */
  sourceType?: number;
  /** 数据来源 */
  sourceTypeDesc?: string;
  /**
   * 发票状态
   * @format int32
   */
  status?: number;
  /** 发票状态描述 */
  statusDesc?: string;
  /** 税额 */
  taxAmount?: number;
  /** 价税合计 */
  totalAmountTax?: number;
  /** 未核销金额 */
  unWriteOffAmount?: number;
  /** 核销金额 */
  writeOffAmount?: number;
  /**
   * 核销状态
   * @format int32
   */
  writeOffStatus?: number;
  /** 核销状态描述 */
  writeOffStatusDesc?: string;
}

/** BillingInfoReq */
export interface BillingInfoReq {
  /** 结算单号 */
  codes: string[];
}

/** BillingInfoResp */
export interface BillingInfoResp {
  /** 开票基本信息 */
  baseBean?: BillingBaseBean;
  /** 开票商品明细 */
  productBeans?: BillingProductBean[];
}

/** BillingProductBean */
export interface BillingProductBean {
  /** 金额 */
  amount?: number;
  /** 结算单号 */
  associateSettlementCode?: string;
  /** 佣金 */
  commission?: number;
  /** 客户PO */
  customerPo?: string;
  /**
   * 商品明细ID
   * @format int64
   */
  id?: number;
  /** 订单号 */
  orderNumber?: string;
  /** 商品名称 */
  productName?: string;
  /** 商品编码 */
  productSku?: string;
  /**
   * 数量
   * @format int32
   */
  qty?: number;
  /** 税额 */
  taxAmount?: number;
  /** 价税合计 */
  totalAmountTax?: number;
  /** 单价 */
  unitPrice?: number;
  /** 含税单价 */
  unitPriceIncludingTax?: number;
}

/** BillingWriteOffBean */
export interface BillingWriteOffBean {
  /** 币别 */
  currency?: string;
  /**
   * 核销明细ID
   * @format int64
   */
  id?: number;
  /** 核销单号 */
  orderCode?: string;
  /**
   * 回款单/CN单日期
   * @format date
   */
  orderDate?: string;
  /** 单据类型 */
  orderType?: string;
  /**
   * 单据类型编码
   * @format int32
   */
  orderTypeCode?: number;
  /** 金额 */
  writeOffAmount?: number;
  /**
   * 核销时间
   * @format date-time
   */
  writeOffTime?: string;
}

/** BorrowOrderDetailResp */
export interface BorrowOrderDetailResp {
  /** 基本信息 */
  baseInfo?: BorrowOrderDetailRespBaseInfo;
  /** fbt推送信息 */
  fbtPushInfo?: BasicPushBean;
  /** kingdee推送信息 */
  kingdeePushInfo?: BasicPushBean;
  /** 付款信息 */
  payInfo?: BorrowOrderDetailRespPayInfo;
  /** 还款信息 */
  refundItemList?: BorrowOrderDetailRespItemInfo[];
}

/** BorrowOrderDetailRespBaseInfo */
export interface BorrowOrderDetailRespBaseInfo {
  /** 申请员编码 */
  applyMemberCode?: string;
  /** 申请人签约主体 */
  applyMemberCorporationName?: string;
  /** 申请部门名称 */
  applyMemberDeptDesc?: string;
  /** 申请部门编码 */
  applyMemberDeptId?: string;
  /** 申请员名称 */
  applyMemberDesc?: string;
  /** 申请原因 */
  applyReason?: string;
  /**
   * 审核时间
   * @format date-time
   */
  applyTime?: string;
  /**
   * 审核时间
   * @format date-time
   */
  auditTime?: string;
  /** 单据编码 */
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
  /** 支付人员编码 */
  payMemberCode?: string;
  /** 支付人员签约主体 */
  payMemberCorporationName?: string;
  /** 支付人员名称 */
  payMemberDesc?: string;
  /** 付款组织 */
  payOrg?: string;
  /** 付款组织 */
  payOrgDesc?: string;
  /**
   * 付款单状态:0-已审核、1-付款中、2-已付款
   * @format int32
   */
  payStatus?: number;
  /** 付款单状态描述 */
  payStatusDesc?: string;
  /** 还款银行名称 */
  refundAccountsBankName?: string;
  /** 还款账号 */
  refundAccountsCode?: string;
  /**
   * 还款状态: 1-未还清、2-已还清
   * @format int32
   */
  refundStatus?: number;
  /** 还款状态描述 */
  refundStatusDesc?: string;
  /**
   * 归还日期
   * @format date-time
   */
  refundTime?: string;
  /** 结算组织 */
  settlementOrg?: string;
  /** 结算组织描述 */
  settlementOrgDesc?: string;
  /** 来源单号 */
  sourceCode?: string;
  /** 来源系统: fbt */
  sourceSystemCode?: string;
  /** 来源系统描述 */
  sourceSystemDesc?: string;
  /** 总已还款金额 */
  totalRefundAmount?: number;
  /** 总待还款金额 */
  totalWaitRefundAmount?: number;
  /**
   * 使用日期
   * @format date-time
   */
  useTime?: string;
}

/** BorrowOrderDetailRespItemInfo */
export interface BorrowOrderDetailRespItemInfo {
  /** 还款金额 */
  refundAmount?: number;
  /** 还款单号 */
  refundCode?: string;
  /**
   * 单据类型: 1-还款单 2-报销单
   * @format int32
   */
  refundOrderType?: number;
  /** 单据类型描述 */
  refundOrderTypeDesc?: string;
  /**
   * 还款日期
   * @format date-time
   */
  refundTime?: string;
  /**
   * 还款方式: 1-手动还款 2-借款核销
   * @format int32
   */
  refundType?: number;
  /** 还款方式描述 */
  refundTypeDesc?: string;
}

/** BorrowOrderDetailRespPayInfo */
export interface BorrowOrderDetailRespPayInfo {
  /** 申请金额 */
  applyAmount?: number;
  /** 申请币种 */
  applyPayCurrencyCode?: string;
  /**
   * 1-CBS 0-非CBS
   * @format int32
   */
  cbs?: number;
  /** 1-CBS 0-非CBS */
  cbsDesc?: string;
  /** 付款单号 */
  payCode?: string;
  /** 支付方式 */
  payType?: string;
  /**
   * 收款账户类型: 1-支付宝 2-银行卡 3-其他
   * @format int32
   */
  receiveAccountType?: number;
  /** 收款账户类型描述 */
  receiveAccountTypeDesc?: string;
  /** 收款账户银行联行号 */
  receiveAccountsBankId?: string;
  /** 收款账户开户行 */
  receiveAccountsBankName?: string;
  /** 收款账户 */
  receiveAccountsCode?: string;
  /** 收款账户名称 */
  receiveAccountsName?: string;
  /** 收款账户支行联行号 */
  receiveAccountsSubbranchId?: string;
  /** 收款账户支行 */
  receiveAccountsSubbranchName?: string;
}

/** BorrowOrderListQueryReq */
export interface BorrowOrderListQueryReq {
  /**
   * 审核时间-开始
   * @format date-time
   */
  auditDateBegin?: string;
  /**
   * 审核时间-结束
   * @format date-time
   */
  auditDateEnd?: string;
  /** @format int32 */
  billType?: number;
  /**
   * 分贝通推送状态: 0-未推送 1-推送成功 2-推送失败
   * @format int32
   */
  fbtPushStatus?: number;
  /**
   * 分贝通关联状态: 0-未关联 1-已关联
   * @format int32
   */
  fbtRelateStatus?: number;
  /** 关键字 */
  keyword?: string;
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
  /**
   * 付款单状态:0-已审核、1-付款中、2-已付款
   * @format int32
   */
  payStatus?: number;
  /**
   * 金蝶推送状态: 0-未推送 1-推送成功 2-推送失败
   * @format int32
   */
  pushStatus?: number;
  /**
   * 还款状态: 1-未还清、2-已还清
   * @format int32
   */
  refundStatus?: number;
  /**
   * 金蝶关联状态: 0-未关联 1-已关联
   * @format int32
   */
  relateStatus?: number;
}

/** BorrowOrderListQueryResp */
export interface BorrowOrderListQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 列表 */
  recordList?: BorrowOrderListQueryRespItem[];
  /** 关联系统统计 */
  relateSystemStatics?: RelateSystemStaticsResp;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** BorrowOrderListQueryRespItem */
export interface BorrowOrderListQueryRespItem {
  /** 申请金额 */
  applyAmount?: number;
  /** 申请员编码 */
  applyMemberCode?: string;
  /** 申请员名称 */
  applyMemberDesc?: string;
  /**
   * 审核时间
   * @format date-time
   */
  auditTime?: string;
  /** 单据编码 */
  code?: string;
  /** kingdee推送信息 */
  kingdeePushInfo?: BasicPushBean;
  /** 支付人员编码 */
  payMemberCode?: string;
  /** 支付人员名称 */
  payMemberDesc?: string;
  /**
   * 付款单状态:0-已审核、1-付款中、2-已付款
   * @format int32
   */
  payStatus?: number;
  /** 付款单状态描述 */
  payStatusDesc?: string;
  /**
   * 还款状态: 1-未还清、2-已还清
   * @format int32
   */
  refundStatus?: number;
  /** 还款状态描述 */
  refundStatusDesc?: string;
  /** 来源单号 */
  sourceCode?: string;
  /** 来源系统: fbt */
  sourceSystemCode?: string;
  /** 来源系统描述 */
  sourceSystemDesc?: string;
  /** 总已还款金额 */
  totalRefundAmount?: number;
  /** 总待还款金额 */
  totalWaitRefundAmount?: number;
}

/** BorrowOrderListRefuncQueryRespItem */
export interface BorrowOrderListRefuncQueryRespItem {
  /** 借款单号 */
  code?: string;
  /** kingdee推送信息 */
  kingdeePushInfo?: BasicPushBean;
  /** 还款金额 */
  refundAmount?: number;
  /** 还款单号 */
  refundCode?: string;
  /** 还款人 */
  refundMemberCode?: string;
  /** 还款人名称 */
  refundMemberDesc?: string;
  /**
   * 还款时间
   * @format date-time
   */
  refundTime?: string;
  /**
   * 还款方式: 1-手动还款 2-借款核销
   * @format int32
   */
  refundType?: number;
}

/** BorrowOrderRefundDetailResp */
export interface BorrowOrderRefundDetailResp {
  /** 基本信息 */
  baseInfo?: BorrowOrderRefundDetailRespBaseInfo;
  /** fbt推送信息 */
  fbtPushInfo?: BasicPushBean;
  /** kingdee推送信息 */
  kingdeePushInfo?: BasicPushBean;
}

/** BorrowOrderRefundDetailRespBaseInfo */
export interface BorrowOrderRefundDetailRespBaseInfo {
  /**
   * 审核时间
   * @format date-time
   */
  auditTime?: string;
  /** 单据编码 */
  code?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /** 还款银行名称 */
  refundAccountsBankName?: string;
  /** 还款账号 */
  refundAccountsCode?: string;
  /** 还款金额 */
  refundAmount?: number;
  /** 还款人员编码 */
  refundApplyMemberCode?: string;
  /** 还款单号 */
  refundCode?: string;
  /** 还款人员名称 */
  refundMemberDesc?: string;
  /**
   * 还款日期
   * @format date-time
   */
  refundTime?: string;
  /**
   * 还款方式: 1-手动还款 2-借款核销
   * @format int32
   */
  refundType?: number;
  /** 结算组织 */
  settlementOrg?: string;
  /** 结算组织描述 */
  settlementOrgDesc?: string;
  /** 来源单号 */
  sourceCode?: string;
  /** 来源系统: fbt */
  sourceSystemCode?: string;
  /** 来源系统描述 */
  sourceSystemDesc?: string;
}

/** BorrowOrderRefundListQueryReq */
export interface BorrowOrderRefundListQueryReq {
  /** @format int32 */
  billType?: number;
  /**
   * 分贝通推送状态: 0-未推送 1-推送成功 2-推送失败
   * @format int32
   */
  fbtPushStatus?: number;
  /**
   * 分贝通关联状态: 0-未关联 1-已关联
   * @format int32
   */
  fbtRelateStatus?: number;
  /** 关键字 */
  keyword?: string;
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
  /**
   * 金蝶推送状态: 0-未推送 1-推送成功 2-推送失败
   * @format int32
   */
  pushStatus?: number;
  /**
   * 还款日期-开始
   * @format date-time
   */
  refundDateBegin?: string;
  /**
   * 还款日期-结束
   * @format date-time
   */
  refundDateEnd?: string;
  /**
   * 金蝶关联状态: 0-未关联 1-已关联
   * @format int32
   */
  relateStatus?: number;
}

/** BorrowOrderRefundListQueryResp */
export interface BorrowOrderRefundListQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 列表 */
  recordList?: BorrowOrderListRefuncQueryRespItem[];
  /** 关联系统统计 */
  relateSystemStatics?: RelateSystemStaticsResp;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** BudgetAssetInfoListReq */
export interface BudgetAssetInfoListReq {
  /** 资产大类名称/项目名称/资产名称/细项名称/预算费用科目 */
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
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
}

/** BudgetAssetInfoListResp */
export interface BudgetAssetInfoListResp {
  /** 资产信息列表 */
  assetInfoList?: BudgetBasicAssetInfoBean[];
  code?: string;
  /**
   * 更新时间
   * @format date-time
   */
  lastUpdateTime?: string;
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

/** BudgetBasicAssetInfoBean */
export interface BudgetBasicAssetInfoBean {
  /** 资产大类编码/项目编码 */
  assetCategoryCode?: string;
  /** 资产大类名称/项目名称 */
  assetCategoryName?: string;
  /** 资产编码/细项编码 */
  assetCode?: string;
  /** 资产名称/细项名称 */
  assetName?: string;
  /** 预算费用科目 */
  budgetExpenseItem?: string;
  /** 数据来源 */
  dataSource?: string;
  /**
   * 主键
   * @format int64
   */
  id?: number;
  /** 新项目/跨年旧项目 */
  newProject?: string;
}

/** BudgetBasicChannelBean */
export interface BudgetBasicChannelBean {
  /** 渠道编码 */
  channelCode?: string;
  /** 渠道名称 */
  channelName?: string;
  /** 数据来源 */
  dataSourceDesc?: string;
  /** 部门 */
  operateDept?: string;
  /** 平台 */
  platform?: string;
  /** 店铺渠道 */
  shopChannel?: string;
  /** 店铺渠道编码 */
  shopChannelCode?: string;
  /** 唯一键 */
  uniqueCode?: string;
}

/** BudgetBasicChannelListResp */
export interface BudgetBasicChannelListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 渠道信息列表 */
  recordList?: BudgetBasicChannelBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** BudgetBasicChannelReq */
export interface BudgetBasicChannelReq {
  /** 渠道 */
  channelNames?: string[];
  /** 关键字 */
  keyword?: string;
  /**
   * 页数
   * @format int32
   * @min 1
   * @exclusiveMin false
   */
  pageNum?: number;
  /**
   * 每页数量
   * @format int32
   * @max 1000
   * @exclusiveMax false
   */
  pageSize?: number;
  /** 平台 */
  platformNames?: string[];
}

/** BudgetBasicConsultingProjectBean */
export interface BudgetBasicConsultingProjectBean {
  /** 项目编码 */
  code?: string;
  /** 数据来源 */
  dataSource?: string;
  /** 咨询项目名称 */
  name?: string;
}

/** BudgetBasicCountryBean */
export interface BudgetBasicCountryBean {
  /** 业务地区(线上) */
  businessArea?: string;
  /** 国家地区编码 */
  country?: string;
  /** 国家地区中文简称 */
  countryAdCh?: string;
  /** 国家地区所在洲中文名称 */
  countryLocateState?: string;
  /** 币种编码 */
  currency?: string;
  /** 币种名称 */
  currencyName?: string;
  /** 数据来源 */
  dataSourceDesc?: string;
  /** 业务地区(线下) */
  offlineArea?: string;
  /** 生效状态 */
  status?: string;
}

/** BudgetBasicCountryListResp */
export interface BudgetBasicCountryListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 国家信息列表 */
  recordList?: BudgetBasicCountryBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** BudgetBasicCountryReq */
export interface BudgetBasicCountryReq {
  /** 业务地区(线上) */
  businessAreas?: string[];
  /** 币种 */
  currencyCodes?: string[];
  /** 关键字 */
  keyword?: string;
  /** 业务地区(线下) */
  offlineArea?: string[];
  /**
   * 页数
   * @format int32
   * @min 1
   * @exclusiveMin false
   */
  pageNum?: number;
  /**
   * 每页数量
   * @format int32
   * @max 1000
   * @exclusiveMax false
   */
  pageSize?: number;
}

/** BudgetBasicCurrencyBean */
export interface BudgetBasicCurrencyBean {
  /** 数据来源 */
  dataSourceDesc?: string;
  /** 汇率日期 */
  exchangeRateDate?: string;
  /** 原币 */
  originalCurrency?: string;
  /** 货币代码 */
  originalCurrencyCode?: string;
  /** 人民币汇率 */
  rateCny?: number;
  /** 美元汇率 */
  rateUsd?: number;
  /** 唯一键 */
  uniqueCode?: string;
}

/** BudgetBasicCurrencyListResp */
export interface BudgetBasicCurrencyListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 汇率信息列表 */
  recordList?: BudgetBasicCurrencyBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** BudgetBasicCurrentExpenseBean */
export interface BudgetBasicCurrentExpenseBean {
  /** 预算费用科目代码 */
  budgetExpenseAccountCode?: string;
  /** 预算费用科目 */
  budgetExpenseCategory?: string;
  /** 费用场景 */
  costScenario?: string;
  /** 数据来源 */
  dataSource?: string;
  /**
   * 主键
   * @format int64
   */
  id?: number;
}

/** BudgetBasicExchangeRateReq */
export interface BudgetBasicExchangeRateReq {
  /** 汇率日期 */
  exchangeRateDate?: string;
  /** 关键字 */
  keyword?: string;
  /**
   * 页数
   * @format int32
   * @min 1
   * @exclusiveMin false
   */
  pageNum?: number;
  /**
   * 每页数量
   * @format int32
   * @max 1000
   * @exclusiveMax false
   */
  pageSize?: number;
}

/** BudgetBasicGtmPlBean */
export interface BudgetBasicGtmPlBean {
  /** 数据来源 */
  dataSourceDesc?: string;
  /** GTM经理用户编码 */
  gtmMemberCode?: string;
  /** GTM经理名称 */
  gtmMemberName?: string;
  /** GTM品线编码 */
  gtmPlCode?: string;
  /** GTM品线名称 */
  name?: string;
  /** 唯一键 */
  uniqueCode?: string;
}

/** BudgetBasicGtmPlListResp */
export interface BudgetBasicGtmPlListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** GTM品线列表 */
  recordList?: BudgetBasicGtmPlBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** BudgetBasicMarketingCampaignBean */
export interface BudgetBasicMarketingCampaignBean {
  /** 活动区域 */
  activityArea?: string;
  /** 活动涉及的渠道 */
  activityChannel?: string;
  /** 活动周期 */
  activityCycle?: string;
  /** 活动涉及的产品 */
  activityProduct?: string;
  /** 数据来源 */
  dataSource?: string;
  /**
   * 主键
   * @format int64
   */
  id?: number;
  /** 营销活动代码 */
  marketingCampaignCode?: string;
  /** 营销活动名称 */
  marketingCampaignName?: string;
  /** 备注 */
  remark?: string;
}

/** BudgetBasicMarketingCostBean */
export interface BudgetBasicMarketingCostBean {
  /** 全部经济事项 */
  allEconomicMatter?: string;
  /** 简要说明 */
  briefDescription?: string;
  /** 预算费用科目 */
  budgetExpenseItem?: string;
  /** 费用项目-业务场景 */
  costItem?: string;
  /** 数据来源 */
  dataSource?: string;
  /** 部门 */
  deptName?: string;
  /**
   * 主键
   * @format int64
   */
  id?: number;
  /** LV1 */
  lv1?: string;
  /** LV2 */
  lv2?: string;
  /** LV3 */
  lv3?: string;
  /** LV4 */
  lv4?: string;
  /** 品线利润表表头(下) */
  statementHeaderBelow?: string;
  /** 品线利润表表头(上) */
  statementHeaderTop?: string;
}

/** BudgetBasicMsrpPriceBean */
export interface BudgetBasicMsrpPriceBean {
  /** 产品分类 */
  categoryShow?: string;
  /** 国家编码 */
  countryCode?: string;
  /** MSRP(全渠道)币种编码 */
  currencyCode?: string;
  /** 数据来源 */
  dataSourceDesc?: string;
  /**
   * 主键id
   * @format int64
   */
  id?: number;
  /** MSRP(全渠道)价格 */
  salePrice?: number;
  /** SKU编码 */
  skuCode?: string;
  /** SKU名称 */
  skuName?: string;
  /** SPU编码 */
  spuCode?: string;
  /** SPU名称 */
  spuName?: string;
  /** MSRP(VC)币种编码 */
  vcCurrencyCode?: string;
  /** MSRP(VC)价格 */
  vcSalePrice?: number;
}

/** BudgetBasicMsrpPriceListReq */
export interface BudgetBasicMsrpPriceListReq {
  /** 产品分类编码 */
  categoryCode?: string;
  /** 国家 */
  countryCodes?: string[];
  /** 关键字 */
  keyword?: string;
  /**
   * 页数
   * @format int32
   * @min 1
   * @exclusiveMin false
   */
  pageNum?: number;
  /**
   * 每页数量
   * @format int32
   * @max 1000
   * @exclusiveMax false
   */
  pageSize?: number;
}

/** BudgetBasicMsrpPriceListResp */
export interface BudgetBasicMsrpPriceListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 售价信息列表 */
  recordList?: BudgetBasicMsrpPriceBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** BudgetBasicNewProductBean */
export interface BudgetBasicNewProductBean {
  /** 一级类目名称 */
  categoryNameLevel1?: string;
  /** 二级类目名称 */
  categoryNameLevel2?: string;
  /** 三级类目名称 */
  categoryNameLevel3?: string;
  /** 数据来源 */
  dataSourceDesc?: string;
  /** gtm品线 */
  gtmPlName?: string;
  /**
   * 预计上市时间
   * @format date
   */
  listingTime?: string;
  listingTimeStr?: string;
  /**
   * 所属年份
   * @format int32
   */
  planYear?: number;
  /** 产品编码 */
  productCode?: string;
  /** 产品品线 */
  productLine?: string;
  /** 研发项目 */
  productName?: string;
  /** 产品状态描述 */
  productStatusDesc?: string;
  /** 产品名 */
  spuName?: string;
}

/** BudgetBasicNewProductListResp */
export interface BudgetBasicNewProductListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 预算研发项目列表 */
  recordList?: BudgetBasicNewProductBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** BudgetBasicNewProductReq */
export interface BudgetBasicNewProductReq {
  /** 关键字 */
  keyword?: string;
  /**
   * 页数
   * @format int32
   * @min 1
   * @exclusiveMin false
   */
  pageNum?: number;
  /**
   * 每页数量
   * @format int32
   * @max 1000
   * @exclusiveMax false
   */
  pageSize?: number;
  /** 产品品线 */
  productLineCode?: string;
}

/** BudgetBasicOperatorInfoBean */
export interface BudgetBasicOperatorInfoBean {
  /** 渠道 */
  channel?: string;
  /** 数据来源 */
  dataSourceDesc?: string;
  /** 运营部门名称 */
  operatorDept?: string;
  /** 运营人名称 */
  operatorName?: string;
  /** 国家 */
  site?: string;
  /** 产品SKU编码 */
  skuCode?: string;
  /** 产品SKU名称 */
  skuName?: string;
  /** 唯一键 */
  uniqueCode?: string;
}

/** BudgetBasicOperatorInfoListResp */
export interface BudgetBasicOperatorInfoListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 运营人员信息列表 */
  recordList?: BudgetBasicOperatorInfoBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** BudgetBasicOperatorInfoReq */
export interface BudgetBasicOperatorInfoReq {
  /** 渠道 */
  channelNames?: string[];
  /** 关键字 */
  keyword?: string;
  /**
   * 页数
   * @format int32
   * @min 1
   * @exclusiveMin false
   */
  pageNum?: number;
  /**
   * 每页数量
   * @format int32
   * @max 1000
   * @exclusiveMax false
   */
  pageSize?: number;
}

/** BudgetBasicProductBean */
export interface BudgetBasicProductBean {
  /** 数据来源 */
  dataSourceDesc?: string;
  /** 产品品线 */
  productLine?: string;
  /** GTM分组 */
  productLineMarketGroup?: string;
  /** 产品SKU品牌 */
  skuBrand?: string;
  /** 产品SKU编码 */
  skuCode?: string;
  /** 产品SKU名称 */
  skuName?: string;
  /** 产品SKU状态描述 */
  skuStateDesc?: string;
  /** 产品SPU编码 */
  spuCode?: string;
  /** 产品SPU名称 */
  spuName?: string;
}

/** BudgetBasicProductListReq */
export interface BudgetBasicProductListReq {
  /** 品牌 */
  brandCodes?: string[];
  /** gtm分组 */
  gtmNames?: string[];
  /** 关键字 */
  keyword?: string;
  /**
   * 页数
   * @format int32
   * @min 1
   * @exclusiveMin false
   */
  pageNum?: number;
  /**
   * 每页数量
   * @format int32
   * @max 1000
   * @exclusiveMax false
   */
  pageSize?: number;
  /** 产品品线 */
  productLineCode?: string;
  /** 产品状态 */
  productStatusList?: number[];
}

/** BudgetBasicProductListResp */
export interface BudgetBasicProductListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 产品列表 */
  recordList?: BudgetBasicProductBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** BudgetBasicProductResp */
export interface BudgetBasicProductResp {
  /** 产品品牌名称 */
  brandName?: string;
  /** 一级类目名称 */
  categoryNameLevel1?: string;
  /** 二级类目名称 */
  categoryNameLevel2?: string;
  /** 三级类目名称 */
  categoryNameLevel3?: string;
  /** 四级类目名称 */
  categoryNameLevel4?: string;
  /** 五级类目名称 */
  categoryNameLevel5?: string;
  /** 数据源描述 */
  dataSourceDesc?: string;
  /** 产品品线 */
  productLine?: string;
  /** GTM品线 */
  productLineMarketGroup?: string;
  /** GTM名称 */
  productLineMarketName?: string;
  /** 产品SKU编码 */
  skuCode?: string;
  /** 产品经理名称 */
  skuDeveloperName?: string;
  /**
   * 产品SKU上架时间
   * @format date-time
   */
  skuListingTime?: string;
  /** 产品SKU名称 */
  skuName?: string;
  /** 产品SKU状态描述 */
  skuStateDesc?: string;
  /** 产品SKU建议销售价格 */
  skuSuggestPrice?: number;
  /** 产品SPU编码 */
  spuCode?: string;
  /**
   * 产品SPU上架时间
   * @format date-time
   */
  spuListingTime?: string;
  /** 产品SPU名称 */
  spuName?: string;
}

/** BudgetBasicPurCostPriceBean */
export interface BudgetBasicPurCostPriceBean {
  /** 数据来源 */
  dataSourceDesc?: string;
  /** 近1年采购单价 */
  last1yAvgPrice?: number;
  /** 近2年采购单价 */
  last2yAvgPrice?: number;
  /** 近6个月采购单价 */
  last6mAvgPrice?: number;
  /** SKU编码 */
  skuCode?: string;
}

/** BudgetBasicPurCostPriceListResp */
export interface BudgetBasicPurCostPriceListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 采购成本价列表 */
  recordList?: BudgetBasicPurCostPriceBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** BudgetBasicPurchasePriceBean */
export interface BudgetBasicPurchasePriceBean {
  /** 数据来源 */
  dataSource?: string;
  /** 最终单价 */
  finalUnitPrice?: number;
  /**
   * 主键
   * @format int64
   */
  id?: number;
  /** 产品名称 */
  productName?: string;
  /** 产品SKU */
  productSku?: string;
}

/** BudgetBasicQueryReq */
export interface BudgetBasicQueryReq {
  /** 关键字 */
  keyword?: string;
  /**
   * 页数
   * @format int32
   * @min 1
   * @exclusiveMin false
   */
  pageNum?: number;
  /**
   * 每页数量
   * @format int32
   * @max 1000
   * @exclusiveMax false
   */
  pageSize?: number;
}

/** BudgetBasicSelectResp */
export interface BudgetBasicSelectResp {
  /** 编码 */
  code?: string;
  /** 名称 */
  name?: string;
}

/** BudgetBasicSkuSaleDateBean */
export interface BudgetBasicSkuSaleDateBean {
  /** 数据来源 */
  dataSourceDesc?: string;
  /**
   * 开卖时间
   * @format date
   */
  firstOrderTime?: string;
  /** 站点 */
  site?: string;
  /** SKU编码 */
  skuCode?: string;
  /** 唯一值 */
  unique_code?: string;
}

/** BudgetBasicSkuSaleDateListResp */
export interface BudgetBasicSkuSaleDateListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** SKU开卖列表 */
  recordList?: BudgetBasicSkuSaleDateBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** BudgetBasicUnitPriceForFirstMileBean */
export interface BudgetBasicUnitPriceForFirstMileBean {
  /** all(全渠道) */
  all?: number;
  /** amazon */
  amazonPrice?: number;
  /** 国家 */
  country?: string;
  /** 数据来源 */
  dataSource?: string;
  /**
   * 主键
   * @format int64
   */
  id?: number;
  /** offline */
  offlinePrice?: number;
  /** shopify */
  shopifyPrice?: number;
  /** 产品SKU */
  sku?: string;
  /** SKU名称 */
  skuName?: string;
  /** tiktok */
  tiktokPrice?: number;
  /** walmart */
  walmartPrice?: number;
}

/** BudgetBasicUnitPriceForSellInBean */
export interface BudgetBasicUnitPriceForSellInBean {
  /** 国家名称 */
  country?: string;
  /** 国家编码 */
  countryCode?: string;
  /** 币种 */
  currency?: string;
  /** 店铺渠道 */
  customerName?: string;
  /** 渠道 */
  customerType?: string;
  /** 数据来源 */
  dataSource?: string;
  /**
   * 主键
   * @format int64
   */
  id?: number;
  /** Sell In单价 */
  sellInUnitPrice?: number;
  /** SKU */
  sku?: string;
}

/** BudgetConsultingProjectListReq */
export interface BudgetConsultingProjectListReq {
  /** 项目编码/咨询项目名称 */
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
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
}

/** BudgetConsultingProjectListResp */
export interface BudgetConsultingProjectListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 咨询项目列表 */
  recordList?: BudgetBasicConsultingProjectBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** BudgetCurrentExpenseListReq */
export interface BudgetCurrentExpenseListReq {
  /** 预算费用科目/费用场景 */
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
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
}

/** BudgetCurrentExpenseListResp */
export interface BudgetCurrentExpenseListResp {
  code?: string;
  /** 日常费用列表 */
  currentExpenseList?: BudgetBasicCurrentExpenseBean[];
  /**
   * 更新时间
   * @format date-time
   */
  lastUpdateTime?: string;
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

/** BudgetFirstMileListReq */
export interface BudgetFirstMileListReq {
  /** 产品SKU/国家 */
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
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
}

/** BudgetFirstMileListResp */
export interface BudgetFirstMileListResp {
  code?: string;
  /** 头程单价列表 */
  firstMileList?: BudgetBasicUnitPriceForFirstMileBean[];
  /**
   * 更新时间
   * @format date-time
   */
  lastUpdateTime?: string;
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

/** BudgetMarketingCampaignListReq */
export interface BudgetMarketingCampaignListReq {
  /** 营销活动代码/名称 */
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
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
}

/** BudgetMarketingCampaignListResp */
export interface BudgetMarketingCampaignListResp {
  code?: string;
  /**
   * 更新时间
   * @format date-time
   */
  lastUpdateTime?: string;
  /** 营销活动列表 */
  marketingCampaignList?: BudgetBasicMarketingCampaignBean[];
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

/** BudgetMarketingCostListReq */
export interface BudgetMarketingCostListReq {
  /** 费用项目-业务场景/预算费用科目 */
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
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
}

/** BudgetMarketingCostListResp */
export interface BudgetMarketingCostListResp {
  code?: string;
  /**
   * 更新时间
   * @format date-time
   */
  lastUpdateTime?: string;
  /** 营销费用列表 */
  marketingCostList?: BudgetBasicMarketingCostBean[];
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

/** BudgetPurchaseListReq */
export interface BudgetPurchaseListReq {
  /** SKU/产品名称 */
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
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
}

/** BudgetPurchaseListResp */
export interface BudgetPurchaseListResp {
  code?: string;
  /**
   * 更新时间
   * @format date-time
   */
  lastUpdateTime?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 进销存-采购单价列表 */
  purchasePriceList?: BudgetBasicPurchasePriceBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** BudgetSellInListReq */
export interface BudgetSellInListReq {
  /** 国家编码列表 */
  countryCodeList?: string[];
  /** 渠道列表 */
  customerTypeList?: string[];
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

/** BudgetSellInListResp */
export interface BudgetSellInListResp {
  code?: string;
  /**
   * 更新时间
   * @format date-time
   */
  lastUpdateTime?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** Sell In 单价列表 */
  sellInList?: BudgetBasicUnitPriceForSellInBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** BudgetSummaryInfoBean */
export interface BudgetSummaryInfoBean {
  /** 预算模板列信息 */
  budgetSummaryInfoColumnList?: BudgetSummaryInfoColumnBean[];
  /** 预算模板子月信息 */
  budgetSummaryRuleSubMonthBean?: BudgetSummaryRuleSubMonthBean;
  /** 预算模板编码 */
  budgetTemplateCode?: string;
  /** 预算模板名称 */
  budgetTemplateName?: string;
  /**
   * 选择月份类型: 0-月字段 1-拆分月
   * @format int32
   */
  chooseMonthType?: number;
  /** 选择月份类型: 0-月字段 1-拆分月 */
  chooseMonthTypeDesc?: string;
  /** 行编码 */
  code?: string;
  /** 数据类型: master-主数据 salver-从数据 db-库表 */
  dataType: string;
  /** 数据字段 */
  dataTypeDesc?: string;
  /** 规则编码 */
  ruleCode?: string;
  /**
   * 排序
   * @format int32
   */
  sort: number;
  /** 表名 */
  tableName?: string;
}

/** BudgetSummaryInfoColumnBean */
export interface BudgetSummaryInfoColumnBean {
  /** 唯一编码 */
  budgetInfoCode?: string;
  /** 字段编码 */
  columnCode?: string;
  /** 字段名 */
  columnName?: string;
  /**
   * 顺序
   * @format int32
   */
  sort: number;
}

/** BudgetSummaryRuleApportionPickValueBean */
export interface BudgetSummaryRuleApportionPickValueBean {
  /** 条件公式 */
  conditionFormula?: string;
  /** 条件组编码 */
  conditionGroupCode?: string;
  /** 同上层 */
  fieldCode?: string;
  /**
   * 主键
   * @format int64
   */
  id?: number;
  /** 条件组 */
  incomeRuleConditionBeans?: IncomeRuleConditionBean[];
  /** 此表唯一值 */
  pickValueCode?: string;
  /** 所属规则编码 */
  ruleCode?: string;
  /** 来源字段 */
  sourceColumnCode: string;
  /** 来源字段-名字 */
  sourceColumnName: string;
  /**
   * 拆分成一年12个月 0-否 1-是
   * @format int32
   */
  subYearmonth?: number;
  /** 执行串 */
  subYearmonthColumns?: string;
  /** 目标值字段，允许多个 */
  targetColums?: ColumnBean[];
}

/** BudgetSummaryRuleChangeStatusReq */
export interface BudgetSummaryRuleChangeStatusReq {
  /** 规则编码 */
  ruleCode?: string;
  /**
   * 状态: 0-禁用 1-启用
   * @format int32
   */
  status?: number;
}

/** BudgetSummaryRuleDetailBean */
export interface BudgetSummaryRuleDetailBean {
  /** 数据源配置 */
  budgetSummaryInfoList?: BudgetSummaryInfoBean[];
  /** 附表分摊详情 */
  budgetSummaryRuleApportionMappingBeans?: BudgetSummaryRuleFiledMappingBaseBean[];
  /** 数据映射规则 */
  budgetSummaryRuleFiledMappingBaseBeans?: BudgetSummaryRuleFiledMappingBaseBean[];
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 字典关联规则 */
  dictRuleRelevanceBeans?: IncomeRuleRelevanceBean[];
  /**
   * 主键
   * @format int64
   */
  id?: number;
  /** 备注 */
  remark?: string;
  /** 规则编码 */
  ruleCode?: string;
  /** 规则名称 */
  ruleName: string;
  /**
   * 状态: 0-禁用 1-启用
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

/** BudgetSummaryRuleFiledMappingBaseBean */
export interface BudgetSummaryRuleFiledMappingBaseBean {
  /** 字段映射关系 */
  budgetSummaryRuleConditionBeanList?: BudgetSummaryRuleFiledMappingBean[];
  /** 月份拆分信息 */
  budgetSummaryRuleSubMonthBean?: BudgetSummaryRuleSubMonthBean;
  /** 字段编码, 主表的给编码, 附表的话给templateCode */
  fieldCode?: string;
  /** 字段名称, 主表的给名称, 附表的话给templateCode */
  fieldName: string;
  /**
   * 给budgetSummaryInfoList 数据源层级的sort, 汇总表字段取值映射 固定1, 勾选分摊后固定给0
   * @format int32
   */
  fileType?: number;
  /** 备注 */
  remark?: string;
  /** 分摊边界 before-分摊前 after-分摊后 */
  sharedBoundary?: string;
  /** 分摊边界描述 */
  sharedBoundaryDesc?: string;
  /**
   * 排序
   * @format int32
   */
  sort?: number;
  /** 模板编码 */
  templateCode?: string;
}

/** BudgetSummaryRuleFiledMappingBean */
export interface BudgetSummaryRuleFiledMappingBean {
  /** 分摊取值设置 */
  budgetSummaryRuleApportionPickValueBeans?: BudgetSummaryRuleApportionPickValueBean[];
  /** 月份拆分信息 */
  budgetSummaryRuleSubMonthBean?: BudgetSummaryRuleSubMonthBean;
  /** 列编码 */
  columnCode?: string;
  /** 列名称 */
  columnName?: string;
  /** 条件公式 */
  conditionFormula?: string;
  /** 条件组编码 */
  conditionGroupCode?: string;
  /**
   * 数据来源 0-共享盘 1-数据库
   * @format int32
   */
  dataSource?: number;
  /** 字典编码 */
  dictCode?: string;
  /** 字段编码, 主数据的话和上层一样, 附表的话给templateCode */
  fieldCode?: string;
  /** 字段名称,主数据的话和上层一样, 附表的话给templateCode */
  fieldName: string;
  /**
   * 给budgetSummaryInfoList层级的sort, 主表固定1, 分摊后主表固定给0
   * @format int32
   */
  fileType?: number;
  /**
   * 主键
   * @format int64
   */
  id?: number;
  /** 条件组 */
  incomeRuleConditionBeans?: IncomeRuleConditionBean[];
  /** 备注 */
  remark?: string;
  /** 值 */
  value: string;
  /** 值公式(给前端) */
  valueFormula?: string;
  /** 值公式(给后端) */
  valueFormula2?: string;
  /**
   * 值类型 10-取文件-字段名 11-取文件-字段名位数截取 12-文件字段名字符截断 2-取业务字典 3-固定值 4-计算公式 13-取占比额
   * @format int32
   */
  valueType: number;
  /** 值用到的列 */
  valueUsedColumns?: string[];
}

/** BudgetSummaryRuleListReq */
export interface BudgetSummaryRuleListReq {
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
  /** 规则编码 */
  ruleCode?: string;
  /** 规则名称 */
  ruleName?: string;
  /** 规则状态:0-禁用 1-启用 */
  statusList?: number[];
}

/** BudgetSummaryRuleListResp */
export interface BudgetSummaryRuleListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 记录列表 */
  recordList?: BudgetSummaryRuleListRespItem[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** BudgetSummaryRuleListRespItem */
export interface BudgetSummaryRuleListRespItem {
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 规则编码 */
  ruleCode?: string;
  /** 执行规则名称 */
  ruleName?: string;
  /**
   * 状态: 0-禁用 1-启用
   * @format int32
   */
  status?: number;
  /** 状态描述 */
  statusDesc?: string;
  /** 规则类型 */
  type?: string;
  /** 规则类型描述 */
  typeDesc?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** BudgetSummaryRuleResultExeSignleReq */
export interface BudgetSummaryRuleResultExeSignleReq {
  /**
   * 预算方案层级
   * @format int32
   */
  budgetSchemeLevel: number;
  /** 预算方案名称 */
  budgetSchemeName: string;
  /**
   * 预算方案年度
   * @format int32
   */
  budgetSchemeYear: number;
  /** 是否强制执行 */
  forceExe?: boolean;
  /** 规则编码 */
  ruleCode: string;
}

/** BudgetSummaryRuleResultExportListReq */
export interface BudgetSummaryRuleResultExportListReq {
  /** 任务编号 */
  code: string;
}

/** BudgetSummaryRuleResultQueryListReq */
export interface BudgetSummaryRuleResultQueryListReq {
  /** 预算方案编码 */
  budgetSchemeCodes?: string[];
  /** 预算方案层级 */
  budgetSchemeLevels?: string[];
  /** 预算方案名称 */
  budgetSchemeNames?: string[];
  /** 预算方案年度 */
  budgetSchemeYears?: string[];
  /** 任务编号 */
  codes?: string[];
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

/** BudgetSummaryRuleResultQueryListResp */
export interface BudgetSummaryRuleResultQueryListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 记录列表 */
  recordList?: BudgetSummaryRuleResultQueryListRespItem[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** BudgetSummaryRuleResultQueryListRespItem */
export interface BudgetSummaryRuleResultQueryListRespItem {
  /** 预算方案编码 */
  budgetSchemeCode?: string;
  /**
   * 预算方案层级
   * @format int32
   */
  budgetSchemeLevel?: number;
  /** 预算方案层级-描述 */
  budgetSchemeLevelDesc?: string;
  /** 预算方案名称 */
  budgetSchemeName?: string;
  /** 预算方案年度 */
  budgetSchemeYear?: string;
  /** 任务编号 */
  code?: string;
  /** 失败原因 */
  failedReason?: string;
  /**
   * 进度 0-100
   * @format int32
   */
  generateProgress?: number;
  /** 生成结果文件地址 */
  generateResultUrl?: string;
  /**
   * 生成状态: 0-未开始 1-生成中 2-生成成功 3-生成失败
   * @format int32
   */
  generateStatus?: number;
  /** 生成状态: 0-未开始 1-生成中 2-生成成功 3-生成失败 */
  generateStatusDesc?: string;
  /**
   * 当前任务id
   * @format int64
   */
  nowJobId?: number;
  /** 执行规则编码 */
  ruleCode?: string;
  /** 执行规则名称 */
  ruleName?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** BudgetSummaryRuleSubMonthBean */
export interface BudgetSummaryRuleSubMonthBean {
  /** 月份取值字段 */
  monthColumn?: string;
  /** 月份取值字段名称 */
  monthColumnName?: string;
  /** 月份格式 */
  monthFormat?: string;
  /**
   * 拆分成一年12个月 0-否 1-是
   * @format int32
   */
  subYearmonth?: number;
  /** 执行串 */
  subYearmonthColumns?: string;
}

/** ButtonBean */
export interface ButtonBean {
  /** 是否可编辑 */
  canEdit?: boolean;
  /** 是否可推送金蝶 */
  canPushKingdee?: boolean;
}

/** CategoryListQueryResp */
export interface CategoryListQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 列表 */
  recordList?: BasicCategoryBean[];
  /** 关联系统统计 */
  relateSystemStatics?: RelateSystemStaticsResp;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** CnOrderAnalysisResp */
export interface CnOrderAnalysisResp {
  /**
   * 未核销数量
   * @format int32
   */
  notWriteOffAmount?: number;
  /**
   * 部分核销数量
   * @format int32
   */
  partWriteOffAmount?: number;
  /**
   * 总记录数
   * @format int32
   */
  totalCount?: number;
  /**
   * 总核销数量
   * @format int32
   */
  totalWriteOffAmount?: number;
}

/** CnOrderBean */
export interface CnOrderBean {
  /** 金额 */
  amount?: number;
  /**
   * 申请日期
   * @format date
   */
  applyTime?: string;
  /** 费用预算管理大区 */
  budgetRegion?: string;
  /** CN单号 */
  code?: string;
  /** 币别 */
  currency?: string;
  /** 币别 */
  currencyName?: string;
  /** 客户编码 */
  customerCode?: string;
  /** 客户名称 */
  customerName?: string;
  /** 费用详情 */
  feeDetails?: string;
  /** 费用L1 */
  feeL1?: string;
  /** 费用L2 */
  feeL2?: string;
  /** 费用L3 */
  feeL3?: string;
  /** 费用L4 */
  feeL4?: string;
  /**
   * 是否抵扣货款
   * @format int32
   */
  isDeductPayment?: number;
  /** 是否抵扣货款 */
  isDeductPaymentDesc?: string;
  /** 剩余金额 */
  remainingAmount?: number;
  /** 核销金额 */
  writeOffAmount?: number;
  /**
   * 核销状态 0-未核销 1-部分核销 2-已核销
   * @format int32
   */
  writeOffStatus?: number;
  /** 核销状态 0-未核销 1-部分核销 2-已核销 */
  writeOffStatusDesc?: string;
}

/** CnOrderDetailResp */
export interface CnOrderDetailResp {
  /** 基本信息 */
  cnOrderBean?: CnOrderBean;
  /** 开票明细 */
  invoiceItemBeans?: CnOrderInvoiceItemBean[];
}

/** CnOrderInvoiceItemBean */
export interface CnOrderInvoiceItemBean {
  /** 发票号 */
  invoiceCode?: string;
  /** 发票净额 */
  invoiceNetAmount?: number;
  /** 核销金额 */
  writeOffAmount?: number;
}

/** CnOrderListReq */
export interface CnOrderListReq {
  /** 客户编码 */
  customerCodes?: string[];
  /**
   * 结束时间
   * @format date
   */
  endTime?: string;
  /**
   * 金额类型 0-金额 1-已核销金额 2-剩余金额
   * @format int32
   */
  filterAmountType?: number;
  /** 关键字 */
  keyword?: string;
  /** 最大金额 */
  maxAmount?: number;
  /** 最小金额 */
  minAmount?: number;
  /**
   * 页数
   * @format int32
   * @min 1
   * @exclusiveMin false
   */
  pageNum?: number;
  /**
   * 每页数量
   * @format int32
   * @max 1000
   * @exclusiveMax false
   */
  pageSize?: number;
  /**
   * 开始时间
   * @format date
   */
  startTime?: string;
  /**
   * 核销状态 1-全部核销 2-部分核销 3-未核销
   * @format int32
   */
  writeOffStatus?: number;
}

/** CnOrderListResp */
export interface CnOrderListResp {
  /** 分析结果 */
  analysisResp?: CnOrderAnalysisResp;
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 记录列表 */
  recordList?: CnOrderBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** CnOrderRelatedInvoiceReq */
export interface CnOrderRelatedInvoiceReq {
  /**
   * 是否操作信用额度 0-不调整  1-调整
   * @format int32
   */
  adjustCreditLimit: number;
  /** 核销信息列表 */
  writeOffBeans?: CnOrderWriteOffBean[];
}

/** CnOrderWriteOffBean */
export interface CnOrderWriteOffBean {
  /** 金额 */
  amount?: number;
  /** CN单号 */
  code?: string;
  /** 币别 */
  currency?: string;
  /** 客户编码 */
  customerCode?: string;
  /** 客户名称 */
  customerName?: string;
  /** 费用 */
  feeDetail?: string;
  /** 关联发票信息列表 */
  relatedInvoiceList?: RelatedInvoice[];
  /** 已核销金额 */
  writeOffAmount?: number;
}

/** ColumnBean */
export interface ColumnBean {
  /** 列编码 */
  columnCode: string;
  /** 列名称 */
  columnName: string;
}

/** CommonBatchResp */
export interface CommonBatchResp {
  /** 失败列表 */
  failList?: CommonBatchRespBatchResult[];
  /** 成功列表 */
  successList?: CommonBatchRespBatchResult[];
}

/** CommonBatchRespBatchResult */
export interface CommonBatchRespBatchResult {
  code?: string;
  message?: string;
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

/** CustomerCreditLimitBean */
export interface CustomerCreditLimitBean {
  /** 可用额度 */
  availableLimit?: number;
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

/** CustomerCreditLimitReq */
export interface CustomerCreditLimitReq {
  /** 客户编码列表 */
  customerCodeList: string[];
}

/** CustomerCreditLimitResp */
export interface CustomerCreditLimitResp {
  /** 客户信用额度列表 */
  creditLimitBeans?: CustomerCreditLimitBean[];
}

/** CustomerListQueryReq */
export interface CustomerListQueryReq {
  /** @format int32 */
  billType?: number;
  /** 客户来源 */
  customerSources?: string[];
  /**
   * 分贝通推送状态: 0-未推送 1-推送成功 2-推送失败
   * @format int32
   */
  fbtPushStatus?: number;
  /**
   * 分贝通关联状态: 0-未关联 1-已关联
   * @format int32
   */
  fbtRelateStatus?: number;
  /** 关键字 */
  keyword?: string;
  /** 站点名称 */
  marketNames?: string[];
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
  /**
   * 金蝶推送状态: 0-未推送 1-推送成功 2-推送失败
   * @format int32
   */
  pushStatus?: number;
  /**
   * 金蝶关联状态: 0-未关联 1-已关联
   * @format int32
   */
  relateStatus?: number;
}

/** CustomerListQueryResp */
export interface CustomerListQueryResp {
  code?: string;
  /** 客户列表 */
  customerList?: BasicCustomerBean[];
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
  /**
   * 总的未关联金蝶编码数量
   * @format int32
   */
  totalNotRelateNum?: number;
  /**
   * 总的关联金蝶编码数量
   * @format int32
   */
  totalRelateNum?: number;
}

/** CustomsDeclarationPlanListReq */
export interface CustomsDeclarationPlanListReq {
  /** @format int32 */
  billType?: number;
  /** 编码模糊查询 */
  codeKeywords?: string[];
  /** 订单编码 */
  codes?: string[];
  /**
   * 报关维护状态
   * @format int32
   */
  customsDeclarationMaintainStatus?: number;
  /**
   * 报关状态
   * @format int32
   */
  customsDeclarationStatus?: number;
  /**
   * 发货结束时间
   * @format date
   */
  deliveryEndTime?: string;
  /**
   * 发货开始时间
   * @format date
   */
  deliveryStartTime?: string;
  /**
   * 分贝通推送状态: 0-未推送 1-推送成功 2-推送失败
   * @format int32
   */
  fbtPushStatus?: number;
  /**
   * 分贝通关联状态: 0-未关联 1-已关联
   * @format int32
   */
  fbtRelateStatus?: number;
  /** 列表关键字 */
  keyWords?: string[];
  /** 关键字 */
  keyword?: string;
  /** 物流审核人 */
  logisticsAuditors?: string[];
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
  /**
   * 金蝶推送状态: 0-未推送 1-推送成功 2-推送失败
   * @format int32
   */
  pushStatus?: number;
  /**
   * 金蝶关联状态: 0-未关联 1-已关联
   * @format int32
   */
  relateStatus?: number;
  /** SKU模糊查询 */
  skuKeyword?: string;
}

/** CustomsDeclarationPlanListResp */
export interface CustomsDeclarationPlanListResp {
  code?: string;
  /** 报关计划列表 */
  customsDeclarationPlanList?: BasicCustomsDeclarationPlanBean[];
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 部门关联系统统计 */
  relateSystemStatics?: RelateSystemStaticsResp;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** DatabatchConfigReq */
export interface DatabatchConfigReq {
  /** @format int64 */
  id?: number;
  jsonCfg?: Record<string, object>;
}

/** DefaultApportionSelectedInvoiceReq */
export interface DefaultApportionSelectedInvoiceReq {
  /** 认领信息列表 */
  claimBeans?: PaymentCollectionClaimBaseBean[];
  /** 已选择的发票信息 */
  selectedInvoices?: SelectedInvoice[];
  /** 可关联发票金额 */
  unWriteOffAmount?: number;
}

/** DepartmentDetailQueryResp */
export interface DepartmentDetailQueryResp {
  /** 预算状态描述 */
  budgetStatusDesc?: string;
  /**
   * 部门id
   * @format int64
   */
  deptId?: number;
  /** 部门主管名称 */
  deptManagerUserName?: string;
  /** 部门名称 */
  deptName?: string;
  /** fbt预算部门映射关系推送信息 */
  fbtBudgetDeptMappingPushInfo?: BasicPushBean;
  /** fbt预算部门推送信息 */
  fbtBudgetDeptPushInfo?: BasicPushBean;
  /** fbt部门推送信息 */
  fbtDeptPushInfo?: BasicPushBean;
  /** 层级描述 */
  levelDesc?: string;
  /**
   * 父级部门id
   * @format int64
   */
  parentDeptId?: number;
  /** 父级部门名称 */
  parentDeptName?: string;
}

/** DepartmentListQueryReq */
export interface DepartmentListQueryReq {
  /** @format int32 */
  billType?: number;
  /** Comfelie不算在渠道的站外推广费-OA：Y=是，N=否，待分配=待分配 */
  comfelieOutsideFeeList?: string[];
  /**
   * 分贝通推送状态: 0-未推送 1-推送成功 2-推送失败
   * @format int32
   */
  fbtPushStatus?: number;
  /**
   * 分贝通关联状态: 0-未关联 1-已关联
   * @format int32
   */
  fbtRelateStatus?: number;
  /** 是否过滤金蝶部门编号为空 */
  filterNullKingdeeNumber?: boolean;
  /** GTM推广费（其中素材制作费）-OA：Y=是，N=否，待分配=待分配 */
  gtmMaterialFeeList?: string[];
  /** GTM推广费-OA：Y=是，N=否，待分配=待分配 */
  gtmPromotionFeeList?: string[];
  /** 关键字 */
  keyword?: string;
  /**
   * 层级
   * @format int32
   */
  level?: number;
  /** 站外推广费-OA：Y=是，N=否，待分配=待分配 */
  outsidePromotionFeeList?: string[];
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
  /**
   * 金蝶推送状态: 0-未推送 1-推送成功 2-推送失败
   * @format int32
   */
  pushStatus?: number;
  /** 区域推广费-OA：Y=是，N=否，待分配=待分配 */
  regionPromotionFeeList?: string[];
  /**
   * 金蝶关联状态: 0-未关联 1-已关联
   * @format int32
   */
  relateStatus?: number;
}

/** DepartmentListQueryResp */
export interface DepartmentListQueryResp {
  code?: string;
  /** 部门列表 */
  departmentList?: BasicDepartmentBean[];
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 部门关联系统统计 */
  relateSystemStatics?: RelateSystemStaticsResp;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** DeptBean */
export interface DeptBean {
  /**
   * 部门id
   * @format int64
   */
  deptId?: number;
  /** 部门名称 */
  deptName?: string;
}

/** DeptListResp */
export interface DeptListResp {
  /** 部门列表 */
  deptList?: DeptBean[];
}

/** DetailHeader */
export interface DetailHeader {
  /** 字段描述 */
  desc?: string;
  /** 字段 */
  field?: string;
}

/** ErpOtherInStockDetailResp */
export interface ErpOtherInStockDetailResp {
  /** 基本信息 */
  baseInfo?: ErpOtherInStockDetailRespBaseInfo;
  /** 采购入库单信息 */
  itemInfoList?: ErpOtherInStockDetailRespItemInfo[];
  /** kingdee推送信息 */
  kingdeePushInfo?: BasicPushBean;
}

/** ErpOtherInStockDetailRespBaseInfo */
export interface ErpOtherInStockDetailRespBaseInfo {
  /**
   * 单据类型: 43-其他入库单 42-其他出库单
   * @format int32
   */
  billType?: number;
  /** 单据类型描述 */
  billTypeDesc?: string;
  /** 入库单号 */
  code?: string;
  /** 创建人账号 */
  createBy?: string;
  /** 创建人名称 */
  createDesc?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /**
   * id
   * @format int64
   */
  id?: number;
  /** 入库人 */
  inboundOperatorId?: string;
  /** 入库人 */
  inboundOperatorName?: string;
  /**
   * 入库时间
   * @format date-time
   */
  inboundTime?: string;
  /** 库存类型：normal-良品、bad-次品 */
  inventoryType?: string;
  /** 积加入库单号 */
  jjCode?: string;
  /** 推送jj失败原因 */
  jjPushFailureReason?: string;
  /** kingdee仓库编号 */
  kingdeeWarehouseNumber?: string;
  /** 其他入库操作类型描述 */
  operationType?: string;
  /** 其他入库操作类型描述 */
  operationTypeDesc?: string;
  /** 组织 */
  orgNumberCode?: string;
  /** 组织 */
  orgNumberName?: string;
  /** 推送失败原因 */
  pushFailureReason?: string;
  /** 备注 */
  remark?: string;
  /**
   * 状态：待出库、已完成、异常、废弃
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
  /** 仓库编号 */
  warehouseCode?: string;
  /** 仓库名称 */
  warehouseDesc?: string;
}

/** ErpOtherInStockDetailRespItemInfo */
export interface ErpOtherInStockDetailRespItemInfo {
  /** 创建人 */
  createBy?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /**
   * 主键ID
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
  /** 入库单单号 */
  inboundOrderCode?: string;
  /**
   * 入库数量
   * @format int32
   */
  inboundQuantity?: number;
  /** 金蝶仓库编码 */
  kingdeeWarehouseNumber?: string;
  /** 序号 */
  lineNumber?: string;
  /** 库存池编码 */
  poolCode?: string;
  /** 产品名称 */
  productName?: string;
  /** 备注 */
  remark?: string;
  /** SKU编号 */
  skuCode?: string;
  /** 供应链SKU */
  supplySku?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /** 仓库编号 */
  warehouseCode?: string;
  /** 仓库名称 */
  warehouseDesc?: string;
}

/** ErpOtherOutStockDetailResp */
export interface ErpOtherOutStockDetailResp {
  /** 基本信息 */
  baseInfo?: BaseInfo;
  /** 其他出库单明细信息 */
  itemInfoList?: ItemInfo[];
  /** kingdee推送信息 */
  kingdeePushInfo?: BasicPushBean;
}

/** ExpenseReportDetailResp */
export interface ExpenseReportDetailResp {
  /** 基本信息 */
  baseInfo?: ExpenseReportDetailRespBaseInfo;
  /** 明细信息 */
  itemInfoList?: ExpenseReportDetailRespItemInfo[];
  /** kingdee推送信息 */
  kingdeePushInfo?: BasicPushBean;
  /** 付款信息 */
  payInfo?: ExpenseReportDetailRespPayInfo;
  /** 核销信息 */
  verificationInfoList?: ExpenseReportDetailRespVerificationInfo[];
}

/** ExpenseReportDetailRespBaseInfo */
export interface ExpenseReportDetailRespBaseInfo {
  /** 广告账户 */
  advertisingChannel?: string;
  /** 申请人 */
  applyMemberCode?: string;
  /** 部门名称 */
  applyMemberDeptDesc?: string;
  /** 部门编码 */
  applyMemberDeptId?: string;
  /** 申请人名称 */
  applyMemberDesc?: string;
  /**
   * 申请日期
   * @format date-time
   */
  applyTime?: string;
  /**
   * 审核时间
   * @format date-time
   */
  auditTime?: string;
  /** 品牌 */
  brand?: string;
  /** 单据编码 */
  code?: string;
  /** 合作事项id */
  cooperationProjectId?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /** 创建人描述 */
  creatorDesc?: string;
  /** kol推广渠道 */
  kolPromotionChannel?: string;
  /** kol上线链接 */
  kolUpLink?: string;
  /** 营销项目名称 */
  marketingProject?: string;
  /** 红人账号id */
  mateAccountId?: string;
  /** 支付对象 */
  payMemberCode?: string;
  /** 支付对象名称 */
  payMemberDesc?: string;
  /** 付款组织 */
  payOrg?: string;
  /** 付款组织 */
  payOrgDesc?: string;
  /**
   * 单状态:0-已审核、1-付款中、2-已付款
   * @format int32
   */
  payStatus?: number;
  /** 单状态描述 */
  payStatusDesc?: string;
  /** 备注 */
  remark?: string;
  /** 来源单号 */
  sourceCode?: string;
  /** 来源系统: fbt */
  sourceSystemCode?: string;
  /** 来源系统描述 */
  sourceSystemDesc?: string;
  /** 来源类型:  1.日常报销 2-下午茶&季度团队经费 3-营销费用，详见字典 fbt_expense_report_type */
  sourceType?: string;
  /** 来源类型:  1.日常报销 2-下午茶&季度团队经费 3-营销费用，详见字典 fbt_expense_report_type */
  sourceTypeDesc?: string;
}

/** ExpenseReportDetailRespItemInfo */
export interface ExpenseReportDetailRespItemInfo {
  /** 归属推广 */
  attributionPromotion?: string;
  /** 归属推广编码 */
  attributionPromotionCode?: string;
  /** 预算部门 */
  budgetDepartmentDesc?: string;
  /** 预算部门id */
  budgetDepartmentId?: string;
  /** 国家 */
  country?: string;
  /** 国家编码 */
  countryCode?: string;
  /** 研发项目 */
  developmentProject?: string;
  /** 费用说明 */
  feeDesc?: string;
  /** 费用类型 */
  feeType?: string;
  /** 费用类型 */
  feeTypeDesc?: string;
  /** 所属分组 */
  groupAffiliation?: string;
  /** gtm品线编号 */
  gtmPtlCode?: string;
  /** gtm品线 */
  gtmPtlDesc?: string;
  /**
   * 是否研发项目 0-否 1-是
   * @format int32
   */
  isDevelopmentProject?: number;
  /** 是否研发项目 0-否 1-是 */
  isDevelopmentProjectDesc?: string;
  /** 所属月份或者季度 */
  monthAffiliation?: string;
  /** 线下客户 */
  offlineCustomer?: string;
  /**
   * 报销人数
   * @format int32
   */
  peopleNumber?: number;
  /** 平台 */
  platfrom?: string;
  /** 平台编号 */
  platfromCode?: string;
  /** 店铺 */
  shop?: string;
  /** 店铺编码 */
  shopCode?: string;
  /** spu */
  spuCode?: string;
  /** spu */
  spuDesc?: string;
  /** 税额 */
  taxAmount?: number;
  /** 未税金额 */
  taxExclusiveAmount?: number;
  /** 含税金额 */
  taxIncludedAmount?: number;
  /** 三级分类编码 */
  thirdCategoryCode?: string;
  /** 三级分类 */
  thirdCategoryDesc?: string;
}

/** ExpenseReportDetailRespPayInfo */
export interface ExpenseReportDetailRespPayInfo {
  /** 申请金额 */
  applyAmount?: number;
  /** 申请币种 */
  applyPayCurrencyCode?: string;
  /**
   * 申请支付日期
   * @format date-time
   */
  applyPayTime?: string;
  /** 申请原因 */
  applyReason?: string;
  /**
   * 1-CBS 0-非CBS
   * @format int32
   */
  cbs?: number;
  /** 1-CBS 0-非CBS */
  cbsDesc?: string;
  /**
   * 月结方式
   * @format date-time
   */
  monthlyStatementDate?: string;
  /** 付款单号 */
  payCode?: string;
  /** 支付方式 */
  payType?: string;
  /**
   * 实际支付日期
   * @format date-time
   */
  realPayTime?: string;
  /**
   * 收款账户类型: 1-支付宝 2-银行卡 3-其他
   * @format int32
   */
  receiveAccountType?: number;
  /** 收款账户类型描述 */
  receiveAccountTypeDesc?: string;
  /** 对方开户行支行 */
  receiveAccountsCode?: string;
  /** 收款账户名称 */
  receiveAccountsName?: string;
  /** 对方开户行支行 */
  receiveAccountsSubbranchId?: string;
  /** 对方收款支行名 */
  receiveAccountsSubbranchName?: string;
  /** 流水号 */
  serialNumber?: string;
  /** swift_code */
  swiftCode?: string;
}

/** ExpenseReportDetailRespVerificationInfo */
export interface ExpenseReportDetailRespVerificationInfo {
  /** 借款单编码 */
  borrowMoneyCode?: string;
  /**
   * 还款日期
   * @format date-time
   */
  refundTime?: string;
  /** 核销金额 */
  verificationAmount?: number;
}

/** ExpenseReportListQueryReq */
export interface ExpenseReportListQueryReq {
  /**
   * 审核时间-开始
   * @format date-time
   */
  auditDateBegin?: string;
  /**
   * 审核时间-结束
   * @format date-time
   */
  auditDateEnd?: string;
  /** @format int32 */
  billType?: number;
  /**
   * 分贝通推送状态: 0-未推送 1-推送成功 2-推送失败
   * @format int32
   */
  fbtPushStatus?: number;
  /**
   * 分贝通关联状态: 0-未关联 1-已关联
   * @format int32
   */
  fbtRelateStatus?: number;
  /** 关键字 */
  keyword?: string;
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
  /**
   * 付款单状态:0-已审核、1-付款中、2-已付款
   * @format int32
   */
  payStatus?: number;
  /**
   * 金蝶推送状态: 0-未推送 1-推送成功 2-推送失败
   * @format int32
   */
  pushStatus?: number;
  /**
   * 金蝶关联状态: 0-未关联 1-已关联
   * @format int32
   */
  relateStatus?: number;
}

/** ExpenseReportListQueryResp */
export interface ExpenseReportListQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 列表 */
  recordList?: ExpenseReportListQueryRespItem[];
  /** 关联系统统计 */
  relateSystemStatics?: RelateSystemStaticsResp;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** ExpenseReportListQueryRespItem */
export interface ExpenseReportListQueryRespItem {
  /** 申请金额 */
  applyAmount?: number;
  /** 申请员编码 */
  applyMemberCode?: string;
  /** 申请员名称 */
  applyMemberDesc?: string;
  /**
   * 审核时间
   * @format date-time
   */
  auditTime?: string;
  /** 单据编码 */
  code?: string;
  /** kingdee推送信息 */
  kingdeePushInfo?: BasicPushBean;
  /** 支付人员编码 */
  payMemberCode?: string;
  /** 支付人员名称 */
  payMemberDesc?: string;
  /**
   * 付款单状态:0-已审核、1-付款中、2-已付款
   * @format int32
   */
  payStatus?: number;
  /** 单状态描述 */
  payStatusDesc?: string;
  /** 来源单号 */
  sourceCode?: string;
  /** 来源系统: fbt */
  sourceSystemCode?: string;
  /** 来源系统描述 */
  sourceSystemDesc?: string;
  /** 来源类型:  1.日常报销 2-下午茶&季度团队经费 3-营销费用，详见字典 fbt_expense_report_type */
  sourceType?: string;
  /** 来源类型:  1.日常报销 2-下午茶&季度团队经费 3-营销费用，详见字典 fbt_expense_report_type */
  sourceTypeDesc?: string;
}

/** FbtApplyStatusChangeReq */
export interface FbtApplyStatusChangeReq {
  /** 申请单ID */
  apply_id?: string;
  /** 4、申请单终审通过/占用预算成功,7、申请单变更,8、申请单作废,16、申请单终审驳回,64、申请发起人撤回 */
  apply_state?: string;
  /** 24：自定义差旅申请单 44-借款单 29-付款申请单 */
  apply_type?: string;
  /** 原申请单ID,审批单状态为变更时有值 */
  root_apply_id?: string;
  /** 申请单三方ID */
  third_apply_id?: string;
  /** 原申请单三方ID,审批单状态为变更时有值 */
  third_root_apply_id?: string;
}

/** FbtBillStatusChangeEventReq */
export interface FbtBillStatusChangeEventReq {
  bill_code?: string;
  /** @format int32 */
  bill_state: number;
}

/** FbtBorrowRefundEventReq */
export interface FbtBorrowRefundEventReq {
  amount?: number;
  company_id?: string;
  meaning_no?: string;
  msg_type?: string;
  payer_id?: string;
  payment_back_status?: string;
  repayment_time?: string;
  repayment_type?: string;
}

/** FbtPayOrderEventReq */
export interface FbtPayOrderEventReq {
  id?: string;
  state?: string;
  third_id?: string;
}

/** FbtPayVerificationEventReq */
export interface FbtPayVerificationEventReq {
  commit_employee_id?: string;
  company_id?: string;
  confirm_employee_id?: string;
  is_finish?: boolean;
  payment_id?: string;
  third_commit_employee_id?: string;
  third_confirm_employee_id?: string;
  third_payment_id?: string;
  verification_id?: string;
  /** @format int32 */
  verification_status?: number;
}

/** FbtPrivatePayCreateEventReq */
export interface FbtPrivatePayCreateEventReq {
  amount?: string;
  applies?: ApplyInfo[];
  batch_code?: string;
  channel_code?: string;
  channel_name?: string;
  channel_type?: string;
  creator_id?: string;
  order_id?: string;
  payee_account_code?: string;
  payee_account_name?: string;
  payee_bank_id?: string;
  payee_bank_name?: string;
  payee_subbranch_id?: string;
  payee_subbranch_name?: string;
  payment_account_code?: string;
  payment_bank_name?: string;
  reimbursements?: ReimbursementOrLoan[];
  third_creator_id?: string;
}

/** FbtPublicPayCreateEventReq */
export interface FbtPublicPayCreateEventReq {
  amount?: number;
  channel_code?: string;
  channel_name?: string;
  channel_type?: string;
  company_id?: string;
  creator_id?: string;
  currency?: string;
  order_id?: string;
  pay_record_order_id?: string;
  payee_account_code?: string;
  payee_account_name?: string;
  payee_bank_id?: string;
  payee_bank_name?: string;
  payee_main_bank_id?: string;
  payee_main_bank_name?: string;
  payment_account_code?: string;
  payment_account_name?: string;
  payment_bank_name?: string;
  third_creator_id?: string;
}

/** FieldCombiBean */
export interface FieldCombiBean {
  /** 列名称 */
  columnName?: string;
  /**
   * 文件类型，1-结算文件 2-信息文件1 3-信息文件2 4-业务字典
   * @format int32
   */
  fileType?: number;
}

/** FieldNameToCodesReq */
export interface FieldNameToCodesReq {
  /** 字段值 */
  fieldCode?: string;
  /** 字段名 */
  fieldName?: string;
}

/** GtmGroupMappingDetailResp */
export interface GtmGroupMappingDetailResp {
  /** 三级分类和GTM品线映射关系推送信息 */
  categoryGtmPlPushInfo?: BasicPushBean;
  /** GTM品线编码 */
  gtmPlCode?: string;
  /** GTM品线名称 */
  gtmPlName?: string;
  /**
   * 主键id
   * @format int64
   */
  id?: number;
  /** 产品spu */
  productSpu?: string;
  /** 商品名称 */
  productSpuName?: string;
  /** spu和三级分类映射关系推送信息 */
  spuCategoryPushInfo?: BasicPushBean;
  /** spu和GTM品线映射关系推送信息 */
  spuGtmPlPushInfo?: BasicPushBean;
  /** 三级类目编码 */
  thirdCategoryCode?: string;
  /** 三级类目名称 */
  thirdCategoryName?: string;
}

/** GtmGroupMappingListResp */
export interface GtmGroupMappingListResp {
  code?: string;
  /** GTM映射列表 */
  gtmGroupMappingList?: BasicGtmGroupMappingBean[];
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 部门关联系统统计 */
  relateSystemStatics?: RelateSystemStaticsResp;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** GtmPlBean */
export interface GtmPlBean {
  /** GTM品线编码 */
  gtmPlCode?: string;
  /** GTM品线名称 */
  gtmPlName?: string;
}

/** GtmPlDetailResp */
export interface GtmPlDetailResp {
  /** 默认回显GTM品线编码 */
  gtmPlCode?: string;
  /** GTM品线集合 */
  gtmPlList?: GtmPlBean[];
  /** 默认回显GTM品线名称 */
  gtmPlName?: string;
  /** 三级类目编码 */
  thirdCategoryCode?: string;
  /** 三级类目名称 */
  thirdCategoryName?: string;
}

/** Header */
export interface Header {
  /** 字段描述 */
  desc?: string;
  /** 字段 */
  field?: string;
}

/** IncomeIncomeRuleAnalysisDetailResp */
export interface IncomeIncomeRuleAnalysisDetailResp {
  /** 任务编号 */
  code?: string;
  /** 国家编码 */
  countryCode?: string;
  /** 创建人名称 */
  creator?: string;
  /** 创建人编码 */
  creatorCode?: string;
  /**
   * 进度 0-100
   * @format int32
   */
  generateFinalStatementProgress?: number;
  /**
   * 生成结算单状态: 0-未开始 1-生成中 2-生成成功 3-生成失败
   * @format int32
   */
  generateFinalStatementStatus?: number;
  /** 生成结算单状态描述 */
  generateFinalStatementStatusDesc?: string;
  /**
   * 主键
   * @format int64
   */
  id?: number;
  incomeRuleAnalysisRecordInfoBeans?: IncomeRuleAnalysisRecordInfoBean[];
  /** 当前期间 */
  nowTime?: string;
  /** 结算组织 */
  orgName?: string;
  /** 平台 */
  platform?: string;
  /** 店铺编码 */
  shop?: string;
  /** 单据类型 */
  type?: string;
  /** 单据类型描述 */
  typeDesc?: string;
  /** 更新人名称 */
  updater?: string;
  /** 更新人编码 */
  updaterCode?: string;
  /**
   * 进度 0-100
   * @format int32
   */
  uploadProgress?: number;
  /**
   * 上传状态: 0-未开始 1-上传中 2-上传成功 3-上传失败 4-异常确认
   * @format int32
   */
  uploadStatus?: number;
  /** 上传状态描述 */
  uploadStatusDesc?: string;
}

/** IncomeIncomeRuleAnalysisListRespItem */
export interface IncomeIncomeRuleAnalysisListRespItem {
  /** 任务编号 */
  code?: string;
  /** 国家编码 */
  countryCode?: string;
  /** 创建人名称 */
  creator?: string;
  /** 创建人编码 */
  creatorCode?: string;
  /**
   * 进度 0-100
   * @format int32
   */
  generateFinalStatementProgress?: number;
  /**
   * 生成结算单状态: 0-未开始 1-生成中 2-生成成功 3-生成失败
   * @format int32
   */
  generateFinalStatementStatus?: number;
  /** 生成结算单状态描述 */
  generateFinalStatementStatusDesc?: string;
  /**
   * 主键
   * @format int64
   */
  id?: number;
  /** 当前期间 */
  nowTime?: string;
  /** 结算组织 */
  orgName?: string;
  /** 平台 */
  platform?: string;
  /** 店铺编码 */
  shop?: string;
  /** 单据类型 */
  type?: string;
  /** 单据类型描述 */
  typeDesc?: string;
  /** 更新人名称 */
  updater?: string;
  /** 更新人编码 */
  updaterCode?: string;
  /**
   * 进度 0-100
   * @format int32
   */
  uploadProgress?: number;
  /**
   * 上传状态: 0-未开始 1-上传中 2-上传成功 3-上传失败 4-异常确认
   * @format int32
   */
  uploadStatus?: number;
  /** 上传状态描述 */
  uploadStatusDesc?: string;
}

/** IncomeIncomeRuleDetailShopBean */
export interface IncomeIncomeRuleDetailShopBean {
  /** 条件组编码 关联多个条件 */
  conditionGroupCode?: string;
  /** 国家 */
  country?: string;
  /** 剔除数据条件 */
  filterDataConditions?: IncomeRuleConditionBean[];
  /** 数据剔除规则 */
  filterDataFormula?: string;
  /** 信息数据1 */
  infoFile1?: IncomeRuleFileBean;
  /** 信息数据2 */
  infoFile2?: IncomeRuleFileBean;
  /**
   * 行号
   * @format int32
   */
  lineNum?: number;
  /** 平台 */
  platform?: string;
  /** 备注 */
  remark?: string;
  /** 店铺规则行code */
  ruleShopCode?: string;
  /** 结算数据 */
  settleFile?: IncomeRuleFileBean;
  /** 结算组织 */
  settlementOrganization?: string;
  /** 店铺 */
  shop?: string;
}

/** IncomePaymentConfirmationOrderBatchChangePushStatusReq */
export interface IncomePaymentConfirmationOrderBatchChangePushStatusReq {
  /** 解析记录编码 */
  analysisCode?: string;
  /** 解析记录编码列表 */
  analysisCodeList?: string[];
  /** 回款单号列表 */
  codes?: string[];
  /** 国家 */
  country?: string;
  /** 关键字 回款单号 */
  keyword?: string;
  /** 是否标记推送成功 */
  markPushSuccess: boolean;
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
  /**
   * 推送状态: 0-未推送 1-上传中 2-已推送 3-推送失败
   * @format int32
   */
  pushStatus?: number;
  /** 推送状态列表 */
  pushStatusList?: number[];
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /**
   * 时间类型 1：回款时间 2：创建时间 3-推送时间
   * @format int32
   */
  searchTimeType?: number;
  /** 结算组织 */
  settlementOrganization?: string;
  /** 结算组织列表 */
  settlementOrganizationList?: string[];
  /** 店铺 */
  shop?: string;
  /** 店铺列表 */
  shopList?: string[];
  /**
   * 结束时间
   * @format date-time
   */
  typeEndTime?: string;
  /**
   * 开始时间
   * @format date-time
   */
  typeStartTime?: string;
}

/** IncomePaymentConfirmationOrderBatchDeleteReq */
export interface IncomePaymentConfirmationOrderBatchDeleteReq {
  /** 解析记录编码 */
  analysisCode?: string;
  /** 解析记录编码列表 */
  analysisCodeList?: string[];
  /** 编码列表 */
  codeList?: string[];
  /** 回款单号列表 */
  codes?: string[];
  /** 国家 */
  country?: string;
  /** 关键字 回款单号 */
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
  /** 平台 */
  platform?: string;
  /**
   * 推送状态: 0-未推送 1-上传中 2-已推送 3-推送失败
   * @format int32
   */
  pushStatus?: number;
  /** 推送状态列表 */
  pushStatusList?: number[];
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /**
   * 时间类型 1：回款时间 2：创建时间 3-推送时间
   * @format int32
   */
  searchTimeType?: number;
  /** 结算组织 */
  settlementOrganization?: string;
  /** 结算组织列表 */
  settlementOrganizationList?: string[];
  /** 店铺 */
  shop?: string;
  /** 店铺列表 */
  shopList?: string[];
  /**
   * 结束时间
   * @format date-time
   */
  typeEndTime?: string;
  /**
   * 开始时间
   * @format date-time
   */
  typeStartTime?: string;
}

/** IncomePaymentConfirmationOrderBatchPushReq */
export interface IncomePaymentConfirmationOrderBatchPushReq {
  /** 解析记录编码 */
  analysisCode?: string;
  /** 解析记录编码列表 */
  analysisCodeList?: string[];
  /** 编码列表 */
  codeList?: string[];
  /** 回款单号列表 */
  codes?: string[];
  /** 国家 */
  country?: string;
  /** 关键字 回款单号 */
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
  /** 平台 */
  platform?: string;
  /**
   * 推送状态: 0-未推送 1-上传中 2-已推送 3-推送失败
   * @format int32
   */
  pushStatus?: number;
  /** 推送状态列表 */
  pushStatusList?: number[];
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /**
   * 时间类型 1：回款时间 2：创建时间 3-推送时间
   * @format int32
   */
  searchTimeType?: number;
  /** 结算组织 */
  settlementOrganization?: string;
  /** 结算组织列表 */
  settlementOrganizationList?: string[];
  /** 店铺 */
  shop?: string;
  /** 店铺列表 */
  shopList?: string[];
  /**
   * 推送类型 0-推送所有 1-按筛选条件推送 2-推送失败数据 3-推送未推送数据 4-推送失败+未推送
   * @format int32
   */
  type?: number;
  /**
   * 结束时间
   * @format date-time
   */
  typeEndTime?: string;
  /**
   * 开始时间
   * @format date-time
   */
  typeStartTime?: string;
}

/** IncomePaymentConfirmationOrderListReq */
export interface IncomePaymentConfirmationOrderListReq {
  /** 解析记录编码 */
  analysisCode?: string;
  /** 解析记录编码列表 */
  analysisCodeList?: string[];
  /** 回款单号列表 */
  codes?: string[];
  /** 国家 */
  country?: string;
  /** 关键字 回款单号 */
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
  /** 平台 */
  platform?: string;
  /**
   * 推送状态: 0-未推送 1-上传中 2-已推送 3-推送失败
   * @format int32
   */
  pushStatus?: number;
  /** 推送状态列表 */
  pushStatusList?: number[];
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /**
   * 时间类型 1：回款时间 2：创建时间 3-推送时间
   * @format int32
   */
  searchTimeType?: number;
  /** 结算组织 */
  settlementOrganization?: string;
  /** 结算组织列表 */
  settlementOrganizationList?: string[];
  /** 店铺 */
  shop?: string;
  /** 店铺列表 */
  shopList?: string[];
  /**
   * 结束时间
   * @format date-time
   */
  typeEndTime?: string;
  /**
   * 开始时间
   * @format date-time
   */
  typeStartTime?: string;
}

/** IncomePaymentConfirmationOrderListResp */
export interface IncomePaymentConfirmationOrderListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  recordList?: IncomePaymentConfirmationOrderListRespItem[];
  statistics?: IncomePaymentConfirmationOrderListStatistics;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** IncomePaymentConfirmationOrderListRespItem */
export interface IncomePaymentConfirmationOrderListRespItem {
  /** 金额 */
  amount?: number;
  /** 解析任务编号 */
  analysisCode?: string;
  /** 推送批次号，如果不为空则为批次推送快照，如果为空则是列表展示的最新数据 */
  batchNo?: string;
  /** 回款单号 */
  code?: string;
  /** 国家 */
  country?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /** 创建人编码 */
  creatorDesc?: string;
  /** 币别 */
  currency?: string;
  /** 失败信息 */
  errorRemark?: string;
  /** 金蝶同名转账单号 */
  kingdeeTransferOrderCode?: string;
  /** 结算组织 */
  orgName?: string;
  /**
   * 回款时间
   * @format date-time
   */
  paymentConfirmationTime?: string;
  /** 平台 */
  platform?: string;
  /** 推送信息 */
  pushInfo?: string;
  /**
   * 推送状态: 0-未推送 1-上传中 2-已推送 3-推送失败
   * @format int32
   */
  pushStatus?: number;
  /** 推送状态描述 */
  pushStatusDesc?: string;
  /**
   * 推送时间
   * @format date-time
   */
  pushTime?: string;
  /** 备注 */
  remark?: string;
  /** 执行的规则编码 */
  ruleCode?: string;
  /** 执行规则店铺号 */
  ruleShopCode?: string;
  /** 店铺 */
  shop?: string;
  /** 原始数据 */
  sourceJson?: Record<string, object>;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /** 更新者 */
  updater?: string;
  /** 更新人编码 */
  updaterDesc?: string;
}

/** IncomePaymentConfirmationOrderListStatistics */
export interface IncomePaymentConfirmationOrderListStatistics {
  /** @format int32 */
  allCount?: number;
  /** @format int32 */
  pushFailCount?: number;
  /** @format int32 */
  pushIngCount?: number;
  /** @format int32 */
  pushSuccessCount?: number;
  /** @format int32 */
  waitPushCount?: number;
}

/** IncomePaymentConfirmationOrderPushBatchListResp */
export interface IncomePaymentConfirmationOrderPushBatchListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  recordList?: IncomePaymentConfirmationOrderPushBatchListRespItem[];
  statistics?: IncomeRuleStatementOrderPushBatchListRespStatistics;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** IncomePaymentConfirmationOrderPushBatchListRespItem */
export interface IncomePaymentConfirmationOrderPushBatchListRespItem {
  /** 推送批次号，如果不为空则为批次推送快照，如果为空则是列表展示的最新数据 */
  batchNo?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /** 创建人编码 */
  creatorDesc?: string;
  /**
   * 失败数量
   * @format int32
   */
  failCount?: number;
  /**
   * 完成时间
   * @format date-time
   */
  finishTime?: string;
  /**
   * 已处理数量
   * @format int32
   */
  pushCount?: number;
  /** 推送备注 */
  pushRemark?: string;
  /** 剩余时间 */
  remainingTime?: string;
  /**
   * 状态 1-进行中 2-已完成 3-失败
   * @format int32
   */
  status?: number;
  /**
   * 成功数量
   * @format int32
   */
  successCount?: number;
  /**
   * 总数量
   * @format int32
   */
  totalCount?: number;
  /**
   * 推送类型 0-推送所有 1-按筛选条件推送 2-推送失败数据 3-推送未推送数据 4-推送失败+未推送
   * @format int32
   */
  type?: number;
  /** 推送类型 0-推送所有 1-按筛选条件推送 2-推送失败数据 3-推送未推送数据 4-推送失败+未推送 */
  typeDesc?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /** 更新者 */
  updater?: string;
  /** 更新人编码 */
  updaterDesc?: string;
  /** 推送耗时 */
  useTime?: string;
}

/** IncomePaymentConfirmationOrderPushReq */
export interface IncomePaymentConfirmationOrderPushReq {
  /** 回款单号 */
  code: string;
  /**
   * 推送类型 0-推送所有 1-按筛选条件推送 2-推送失败数据 3-推送未推送数据 4-推送失败+未推送
   * @format int32
   */
  type: number;
}

/** IncomeRuleAnalysisConfirmFileReq */
export interface IncomeRuleAnalysisConfirmFileReq {
  /**
   * 收入规则解析记录信息id
   * @format int64
   */
  id?: number;
  /** ossKey */
  ossKey?: string;
}

/** IncomeRuleAnalysisExecuteBatchReq */
export interface IncomeRuleAnalysisExecuteBatchReq {
  /** 国家 */
  country?: string;
  /** 国家列表 */
  countrys?: string[];
  /**
   * 生成最终结算单状态 0-未开始 1-生成中 2-生成成功 3-生成失败
   * @format int32
   */
  generateFinalStatementStatus?: number;
  /** 生成最终结算单状态列表 */
  generateFinalStatementStatusList?: number[];
  /** id */
  ids?: number[];
  /** 当前时间 */
  nowTime?: string;
  /** 是否覆盖 */
  override?: boolean;
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
  /** 平台列表 */
  platforms?: string[];
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 单据类型: instock-detail-平台入库明细 outstock-detail-平台出库明细 ending-inventory-平台期末库存 diff-inventory-平台库存差异 */
  ruleTypeList: string[];
  /** 结算组织 */
  settlementOrganization?: string;
  /** 结算组织列表 */
  settlementOrganizations?: string[];
  /** 店铺 */
  shop?: string;
  /** 店铺列表 */
  shops?: string[];
  /**
   * 上传状态 0-未开始 1-上传中 2-上传成功 3-上传失败
   * @format int32
   */
  uploadStatus?: number;
  /** 上传状态列表 */
  uploadStatusList?: number[];
}

/** IncomeRuleAnalysisExecuteReq */
export interface IncomeRuleAnalysisExecuteReq {
  /** 当前时间 */
  nowTime?: string;
  /** 是否覆盖 */
  override?: boolean;
  /** 单据类型: income_rule-结算单规则 payment_confirm_rule-回款单规则 instock-detail-平台入库明细 outstock-detail-平台出库明细 ending-inventory-平台期末库存 diff-inventory-平台库存差异 */
  ruleType: string;
  /** 店铺 */
  shop?: string;
}

/** IncomeRuleAnalysisListIdsReq */
export interface IncomeRuleAnalysisListIdsReq {
  /** id */
  ids?: number[];
}

/** IncomeRuleAnalysisListReq */
export interface IncomeRuleAnalysisListReq {
  /** 国家 */
  country?: string;
  /** 国家列表 */
  countrys?: string[];
  /**
   * 生成最终结算单状态 0-未开始 1-生成中 2-生成成功 3-生成失败
   * @format int32
   */
  generateFinalStatementStatus?: number;
  /** 生成最终结算单状态列表 */
  generateFinalStatementStatusList?: number[];
  /** id */
  ids?: number[];
  /** 当前时间 */
  nowTime?: string;
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
  /** 平台列表 */
  platforms?: string[];
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 单据类型: instock-detail-平台入库明细 outstock-detail-平台出库明细 ending-inventory-平台期末库存 diff-inventory-平台库存差异 */
  ruleTypeList: string[];
  /** 结算组织 */
  settlementOrganization?: string;
  /** 结算组织列表 */
  settlementOrganizations?: string[];
  /** 店铺 */
  shop?: string;
  /** 店铺列表 */
  shops?: string[];
  /**
   * 上传状态 0-未开始 1-上传中 2-上传成功 3-上传失败
   * @format int32
   */
  uploadStatus?: number;
  /** 上传状态列表 */
  uploadStatusList?: number[];
}

/** IncomeRuleAnalysisListResp */
export interface IncomeRuleAnalysisListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 任务列表 */
  recordList?: IncomeIncomeRuleAnalysisListRespItem[];
  /** 统计信息 */
  staticsInfo?: IncomeRuleAnalysisListRespStatics;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** IncomeRuleAnalysisListRespStatics */
export interface IncomeRuleAnalysisListRespStatics {
  /**
   * 异常确认
   * @format int32
   */
  abnormalConfirm?: number;
  /**
   * 总数
   * @format int32
   */
  all?: number;
  /**
   * 生成失败
   * @format int32
   */
  generalFail?: number;
  /**
   * 生成中
   * @format int32
   */
  generaling?: number;
  /**
   * 生成成功
   * @format int32
   */
  generateSuccess?: number;
  /**
   * 上传失败
   * @format int32
   */
  uploadFail?: number;
  /**
   * 上传中
   * @format int32
   */
  uploading?: number;
  /**
   * 待上传
   * @format int32
   */
  waitUpload?: number;
}

/** IncomeRuleAnalysisRecordBean */
export interface IncomeRuleAnalysisRecordBean {
  /** 任务编号 */
  code?: string;
  /** 国家编码 */
  countryCode?: string;
  /** 创建人名称 */
  creator?: string;
  /** 创建人编码 */
  creatorCode?: string;
  /**
   * 进度 0-100
   * @format int32
   */
  generateFinalStatementProgress?: number;
  /**
   * 生成结算单状态: 0-未开始 1-生成中 2-生成成功 3-生成失败
   * @format int32
   */
  generateFinalStatementStatus?: number;
  /** 生成结算单状态描述 */
  generateFinalStatementStatusDesc?: string;
  /**
   * 主键
   * @format int64
   */
  id?: number;
  /** 当前期间 */
  nowTime?: string;
  /** 结算组织 */
  orgName?: string;
  /** 平台 */
  platform?: string;
  /** 店铺编码 */
  shop?: string;
  /** 单据类型 */
  type?: string;
  /** 单据类型描述 */
  typeDesc?: string;
  /** 更新人名称 */
  updater?: string;
  /** 更新人编码 */
  updaterCode?: string;
  /**
   * 进度 0-100
   * @format int32
   */
  uploadProgress?: number;
  /**
   * 上传状态: 0-未开始 1-上传中 2-上传成功 3-上传失败 4-异常确认
   * @format int32
   */
  uploadStatus?: number;
  /** 上传状态描述 */
  uploadStatusDesc?: string;
}

/** IncomeRuleAnalysisRecordInfoBean */
export interface IncomeRuleAnalysisRecordInfoBean {
  /** 任务编号 */
  code?: string;
  /**
   * 确认状态描述
   * @format int32
   */
  confirmStatus?: number;
  /** 确认状态描述 */
  confirmStatusDesc?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 压缩结果url */
  fileUrl?: string;
  /**
   * 收入规则分析记录id
   * @format int64
   */
  id?: number;
  /**
   * 信息文件1个数
   * @format int32
   */
  infoFileCount1?: number;
  /**
   * 信息文件2个数
   * @format int32
   */
  infoFileCount2?: number;
  /** 信息文件1情况 */
  infoFileRemark1?: string;
  /** 信息文件2情况 */
  infoFlieRemark2?: string;
  /**
   * 行号
   * @format int32
   */
  lineNum?: number;
  /** 执行的规则编码 */
  ruleCode?: string;
  /** 执行规则店铺号 */
  ruleShopCode?: string;
  /**
   * 结算文件个数
   * @format int32
   */
  settlementFileCount?: number;
  /** 结算文件情况 */
  settlementFileRemark?: string;
  /** 结算文件情况 */
  settlementFileRemark2?: string;
  /** 结算单生成情况 */
  settlementStatementRemark?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** IncomeRuleAssembleAvScriptKeyReq */
export interface IncomeRuleAssembleAvScriptKeyReq {
  /** 字典编码 */
  dictCode?: string;
  /** 字典类型 */
  dictType?: string;
  /** 字段名称 */
  fieldName?: string;
  /**
   * 数据类型1-结算数据 2-信息数据1 3-信息数据2 4-业务字典
   * @format int32
   */
  fileType?: number;
  /**
   * 类型1-结算数据 2-信息数据1 3-信息数据2 4-业务字典 11-取文件 位数截取 12-取文件 字符截取
   * @format int32
   */
  type?: number;
}

/** IncomeRuleChangeStatusReq */
export interface IncomeRuleChangeStatusReq {
  /** 规则编码 */
  ruleCode?: string;
  /**
   * 状态: 0-禁用 1-启用
   * @format int32
   */
  status?: number;
}

/** IncomeRuleConditionBean */
export interface IncomeRuleConditionBean {
  /** 列编码 */
  columnCode?: string;
  /** 列名称 */
  columnName?: string;
  /**
   * 数据来源 0-共享盘 1-数据库
   * @format int32
   */
  dataSource?: number;
  /**
   * 文件类型，1-结算文件 2-信息文件1 3-信息文件2 4-业务字典  如果是预算汇总规则:(给budgetSummaryInfoList层级的sort, 主表固定1, 分摊后主表固定给0)
   * @format int32
   */
  fileType?: number;
  /** 整个条件组比倒是 */
  groupExp?: string;
  /** 左括号 ( ，((，(((的数量 */
  leftParenthesis?: string;
  /** 逻辑符，如 AND, OR，最后一条可为空 */
  logic?: string;
  /** 比较符 比较符，包含、不包含、等于、不等于、为空、不为空、大于、小于、大于等于、小于等于、IN、NOT IN、以...开始、以...结束 */
  operator?: string;
  /** 右括号 ) ，))，)))的数量 */
  rightParenthesis?: string;
  /**
   * 排序字段，保证条件顺序
   * @format int32
   */
  sort?: number;
  /** 比较的值 */
  value?: string;
}

/** IncomeRuleCopyReq */
export interface IncomeRuleCopyReq {
  /** 规则编码 */
  ruleCode?: string;
}

/** IncomeRuleDetailBean */
export interface IncomeRuleDetailBean {
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 字典关联规则 */
  dictIncomeRuleRelevanceBeans?: IncomeRuleRelevanceBean[];
  /** 一级关联规则 */
  firstIncomeRuleRelevanceBean?: IncomeRuleRelevanceBean;
  /**
   * 主键
   * @format int64
   */
  id?: number;
  /** 规则店铺明细 */
  incomeRuleDetailShopBeans?: IncomeIncomeRuleDetailShopBean[];
  /** 数据映射规则 */
  incomeRuleFiledMappingBaseBeans?: IncomeRuleFiledMappingBaseBean[];
  /** 备注 */
  remark?: string;
  /** 规则编码 */
  ruleCode?: string;
  /** 单据类型: income_rule-结算单规则 payment_confirm_rule-回款单规则 instock-detail-平台入库明细 outstock-detail-平台出库明细 ending-inventory-平台期末库存 diff-inventory-平台库存差异 overseas_amos_outbound-海外AMOS出库 overseas_gc_outbound-海外谷仓出库 overseas_yc_outbound-海外元仓出库 fba_multi_channel_deliver-FBA多渠道发货 fba_remove_order_sales_return-FBA移除订单(退货) */
  ruleType: string;
  /** 二级关联规则 */
  secondIncomeRuleRelevanceBean?: IncomeRuleRelevanceBean;
  /** 店铺数据映射规则 */
  shopIncomeRuleFiledMappingBaseBeans?: IncomeRuleFiledMappingBaseBean[];
  /**
   * 状态: 0-禁用 1-启用
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

/** IncomeRuleEnableCheckReq */
export interface IncomeRuleEnableCheckReq {
  /** 规则编码 */
  ruleCode: string;
  /** 单据类型: income_rule-结算单规则 payment_confirm_rule-回款单规则 instock-detail-平台入库明细 outstock-detail-平台出库明细 ending-inventory-平台期末库存 diff-inventory-平台库存差异 */
  ruleType: string;
  /** 店铺名称 */
  shop: string;
}

/** IncomeRuleEnableCheckResp */
export interface IncomeRuleEnableCheckResp {
  /** 是否启用校验结果 */
  result?: boolean;
}

/** IncomeRuleExpGroupBean */
export interface IncomeRuleExpGroupBean {
  /** 取数字段 */
  fetchField?: FieldCombiBean;
  /** 分组字段 */
  groupFields?: FieldCombiBean[];
  /** 结果唯一编码 */
  resultUniqueCode?: string;
  /** 结果唯一名称(描述) */
  resultUniqueName?: string;
  /** 权重字段 */
  weightField?: FieldCombiBean;
}

/** IncomeRuleFileBean */
export interface IncomeRuleFileBean {
  /**
   * 数据来源 0-共享盘 1-数据库
   * @format int32
   */
  dataSource?: number;
  /** excel表头规则, 每个元素是 A=Data 这种数据 */
  excelHeadRules?: string[];
  /** 数据类型 */
  extType?: string;
  /** 数据路径 */
  filePath?: string;
  /** 页签名称 */
  sheetName?: string;
}

/** IncomeRuleFiledMappingBaseBean */
export interface IncomeRuleFiledMappingBaseBean {
  /** 字段编码 */
  fieldCode?: string;
  /** 字段名称 */
  fieldName?: string;
  /** 字段映射关系 */
  incomeRuleConditionBeanList?: IncomeRuleFiledMappingBean[];
}

/** IncomeRuleFiledMappingBean */
export interface IncomeRuleFiledMappingBean {
  /** 列名称 */
  columnName?: string;
  /** 条件公式 */
  conditionFormula?: string;
  /** 条件组编码 */
  conditionGroupCode?: string;
  /**
   * 数据来源 0-共享盘 1-数据库
   * @format int32
   */
  dataSource?: number;
  /** 字典编码 */
  dictCode?: string;
  /** 值公式里面的表达式如果用到分组占比,这里存具体的分组占比详情 */
  expGroupDetails?: IncomeRuleExpGroupBean[];
  /** 字段编码 */
  fieldCode?: string;
  /** 字段名称 */
  fieldName?: string;
  /**
   * 文件类型 1-主文件(结算文件)；2-信息文件一；3-信息文件二
   * @format int32
   */
  fileType?: number;
  /**
   * 主键
   * @format int64
   */
  id?: number;
  /** 条件组 */
  incomeRuleConditionBeans?: IncomeRuleConditionBean[];
  /** 值 */
  value?: string;
  /** 值公式(给前端) */
  valueFormula?: string;
  /** 值公式(给后端) */
  valueFormula2?: string;
  /**
   * 值类型 10-取文件-字段名 11-取文件-字段名位数截取 12-文件字段名字符截断 2-取业务字典 3-固定值 4-计算公式 13-取占比额
   * @format int32
   */
  valueType?: number;
}

/** IncomeRuleListReq */
export interface IncomeRuleListReq {
  /** 国家 */
  country?: string;
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
  /** 单据类型: income_rule-结算单规则 payment_confirm_rule-回款单规则 instock-detail-平台入库明细 outstock-detail-平台出库明细 ending-inventory-平台期末库存 diff-inventory-平台库存差异 */
  ruleTypeList?: string[];
  /** 结算组织 */
  settlementOrganization?: string;
  /** 结算组织列表 */
  settlementOrganizationList?: string[];
  /** 店铺 */
  shop?: string;
  /** 店铺列表 */
  shopList?: string[];
  /**
   * 状态: 0-禁用 1-启用
   * @format int32
   */
  status?: number;
}

/** IncomeRuleListResp */
export interface IncomeRuleListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  recordList?: IncomeRuleListRespItem[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** IncomeRuleListRespItem */
export interface IncomeRuleListRespItem {
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人名称 */
  creator?: string;
  /** 创建人编码 */
  creatorDesc?: string;
  /** 规则编码 */
  ruleCode?: string;
  /** 店铺信息 */
  ruleShopBean?: IncomeRuleShopBean;
  /** 店铺列表 */
  ruleShopList?: IncomeRuleShopBean[];
  /**
   * 状态: 0-禁用 1-启用
   * @format int32
   */
  status?: number;
  /** 状态描述 */
  statusDesc?: string;
  /** 规则类型 */
  type?: string;
  /** 规则类型描述 */
  typeDesc?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /** 更新人名称 */
  updater?: string;
  /** 更新人编码 */
  updaterDesc?: string;
}

/** IncomeRuleRelevanceBean */
export interface IncomeRuleRelevanceBean {
  /**
   * 是否优先匹配 0-否 1-是
   * @format int32
   */
  firstMatch?: number;
  /** 优先列名 */
  firstMatchColumnName?: string[];
  /** 左文件编码 */
  leftFileCode?: string;
  /** 左文件类型 1-结算文件、2-信息文件一、3-信息文件二、4-业务字典 */
  leftFileType?: string;
  /** 左文件值 */
  leftFileValue?: string[];
  /**
   * 是否匹配多条 0-匹配一条 1-匹配多条
   * @format int32
   */
  matchMore?: number;
  /** 右文件编码 */
  rightFileCode?: string;
  /** 右文件类型 1-结算文件、2-信息文件一、3-信息文件二、4-业务字典 */
  rightFileType?: string;
  /** 右文件值 */
  rightFileValue?: string[];
}

/** IncomeRuleShopBean */
export interface IncomeRuleShopBean {
  /** 国家 */
  country?: string;
  /**
   * 行号
   * @format int32
   */
  lineNum?: number;
  /** 平台 */
  platform?: string;
  /** 备注 */
  remark?: string;
  /** 店铺规则行code */
  ruleShopCode?: string;
  /** 结算组织 */
  settlementOrganization?: string;
  /** 店铺 */
  shop?: string;
}

/** IncomeRuleShopCheckListReq */
export interface IncomeRuleShopCheckListReq {
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
  /** 单据类型: income_rule-结算单规则 payment_confirm_rule-回款单规则 instock-detail-平台入库明细 outstock-detail-平台出库明细 ending-inventory-平台期末库存 diff-inventory-平台库存差异 */
  ruleTypeList?: string[];
  /**
   * 状态: 0-禁用 1-启用 -1-不存在
   * @format int32
   */
  status?: number;
  /** 状态列表 */
  statusList?: number[];
}

/** IncomeRuleShopCheckListResp */
export interface IncomeRuleShopCheckListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  recordList?: IncomeRuleListRespItem[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** IncomeRuleStatementOrderBatchChangePushStatuReq */
export interface IncomeRuleStatementOrderBatchChangePushStatuReq {
  /** 解析记录编码 */
  analysisCode?: string;
  /** 解析记录编码列表 */
  analysisCodeList?: string[];
  /** 结算单号列表 */
  codes?: string[];
  /** 国家 */
  country?: string;
  /** 关键字 结算单号、网上订单号 */
  keyword?: string;
  /** 是否标记推送成功 */
  markPushSuccess: boolean;
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
  /**
   * 推送状态: 0-未推送 1-上传中 2-已推送 3-推送失败
   * @format int32
   */
  pushStatus?: number;
  /** 推送状态列表 */
  pushStatusList?: number[];
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /**
   * 时间类型 1：结算时间 2：创建时间 3-推送时间
   * @format int32
   */
  searchTimeType?: number;
  /** 结算组织 */
  settlementOrganization?: string;
  /** 结算组织列表 */
  settlementOrganizationList?: string[];
  /** 店铺 */
  shop?: string;
  /** 店铺列表 */
  shopList?: string[];
  /**
   * 结束时间
   * @format date-time
   */
  typeEndTime?: string;
  /**
   * 开始时间
   * @format date-time
   */
  typeStartTime?: string;
}

/** IncomeRuleStatementOrderBatchDeletedReq */
export interface IncomeRuleStatementOrderBatchDeletedReq {
  /** 解析记录编码 */
  analysisCode?: string;
  /** 解析记录编码列表 */
  analysisCodeList?: string[];
  /** 编码列表 */
  codeList?: string[];
  /** 结算单号列表 */
  codes?: string[];
  /** 国家 */
  country?: string;
  /** 关键字 结算单号、网上订单号 */
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
  /** 平台 */
  platform?: string;
  /**
   * 推送状态: 0-未推送 1-上传中 2-已推送 3-推送失败
   * @format int32
   */
  pushStatus?: number;
  /** 推送状态列表 */
  pushStatusList?: number[];
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /**
   * 时间类型 1：结算时间 2：创建时间 3-推送时间
   * @format int32
   */
  searchTimeType?: number;
  /** 结算组织 */
  settlementOrganization?: string;
  /** 结算组织列表 */
  settlementOrganizationList?: string[];
  /** 店铺 */
  shop?: string;
  /** 店铺列表 */
  shopList?: string[];
  /**
   * 结束时间
   * @format date-time
   */
  typeEndTime?: string;
  /**
   * 开始时间
   * @format date-time
   */
  typeStartTime?: string;
}

/** IncomeRuleStatementOrderBatchPushReq */
export interface IncomeRuleStatementOrderBatchPushReq {
  /** 解析记录编码 */
  analysisCode?: string;
  /** 解析记录编码列表 */
  analysisCodeList?: string[];
  /** 编码列表 */
  codeList?: string[];
  /** 结算单号列表 */
  codes?: string[];
  /** 国家 */
  country?: string;
  /** 关键字 结算单号、网上订单号 */
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
  /** 平台 */
  platform?: string;
  /**
   * 推送状态: 0-未推送 1-上传中 2-已推送 3-推送失败
   * @format int32
   */
  pushStatus?: number;
  /** 推送状态列表 */
  pushStatusList?: number[];
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /**
   * 时间类型 1：结算时间 2：创建时间 3-推送时间
   * @format int32
   */
  searchTimeType?: number;
  /** 结算组织 */
  settlementOrganization?: string;
  /** 结算组织列表 */
  settlementOrganizationList?: string[];
  /** 店铺 */
  shop?: string;
  /** 店铺列表 */
  shopList?: string[];
  /**
   * 推送类型 0-推送所有 1-按筛选条件推送 2-推送失败数据 3-推送未推送数据 4-推送失败+未推送
   * @format int32
   */
  type?: number;
  /**
   * 结束时间
   * @format date-time
   */
  typeEndTime?: string;
  /**
   * 开始时间
   * @format date-time
   */
  typeStartTime?: string;
}

/** IncomeRuleStatementOrderListReq */
export interface IncomeRuleStatementOrderListReq {
  /** 解析记录编码 */
  analysisCode?: string;
  /** 解析记录编码列表 */
  analysisCodeList?: string[];
  /** 结算单号列表 */
  codes?: string[];
  /** 国家 */
  country?: string;
  /** 关键字 结算单号、网上订单号 */
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
  /** 平台 */
  platform?: string;
  /**
   * 推送状态: 0-未推送 1-上传中 2-已推送 3-推送失败
   * @format int32
   */
  pushStatus?: number;
  /** 推送状态列表 */
  pushStatusList?: number[];
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /**
   * 时间类型 1：结算时间 2：创建时间 3-推送时间
   * @format int32
   */
  searchTimeType?: number;
  /** 结算组织 */
  settlementOrganization?: string;
  /** 结算组织列表 */
  settlementOrganizationList?: string[];
  /** 店铺 */
  shop?: string;
  /** 店铺列表 */
  shopList?: string[];
  /**
   * 结束时间
   * @format date-time
   */
  typeEndTime?: string;
  /**
   * 开始时间
   * @format date-time
   */
  typeStartTime?: string;
}

/** IncomeRuleStatementOrderListResp */
export interface IncomeRuleStatementOrderListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  recordList?: IncomeRuleStatementOrderListRespItem[];
  statistics?: IncomeRuleStatementOrderListRespStatistics;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** IncomeRuleStatementOrderListRespDetail */
export interface IncomeRuleStatementOrderListRespDetail {
  /** 调整费 */
  adjustmentCharge?: number;
  /** 金额 */
  amount?: number;
  /** 买家运费 */
  buyerFreightAmount?: number;
  /** 币种 */
  currencyCode?: string;
  /** 折扣额 */
  discountAmount?: number;
  /** 配送费 */
  distributionAmount?: number;
  /** @format int64 */
  id?: number;
  /** 收入 */
  incomeAmount?: number;
  lineItemId?: string;
  /** msku */
  msku?: string;
  /** 其他应付款 */
  otherPayAmount?: number;
  /**
   * 出库数量
   * @format int32
   */
  outStockQty?: number;
  /** 平台保险费 */
  platformInsuranceCharge?: number;
  /** 平台其他费 */
  platformOtherCharge?: number;
  /** 平台其他收入 */
  platformOtherIncomeAmount?: number;
  /** 平台推广费 */
  platformPromotionCharge?: number;
  /** 平台仓储费 */
  platformStorageCharge?: number;
  /** 平台代缴税 */
  platformWithholdingTaxCharge?: number;
  /** 供应链sku */
  productSku?: string;
  /**
   * 数量
   * @format int32
   */
  qty?: number;
  /**
   * 数差
   * @format int32
   */
  qtyDiff?: number;
  /** 备注 */
  remark?: string;
  /** 移除弃置费 */
  removalDisposalCharge?: number;
  /** 销售佣金 */
  salesCommissionAmount?: number;
  /** 手续费 */
  serviceCharge?: number;
  /** sku */
  sku?: string;
  /** 产品SKU */
  skuCode?: string;
  /**
   * 商品类型
   * @format int32
   */
  skuType?: number;
  /** 商品类型 */
  skuTypeDesc?: string;
  /** 原始数据 */
  sourceJson?: Record<string, object>;
  /** 站内广告费 */
  stationAdvertisingCharge?: number;
  /** 税额 */
  taxAmount?: number;
}

/** IncomeRuleStatementOrderListRespItem */
export interface IncomeRuleStatementOrderListRespItem {
  /** 解析任务编号 */
  analysisCode?: string;
  /** 推送批次号，如果不为空则为批次推送快照，如果为空则是列表展示的最新数据 */
  batchNo?: string;
  /** 结算单号 */
  code?: string;
  /** 国家 */
  country?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /** 创建人编码 */
  creatorDesc?: string;
  /** 明细 */
  detailList?: IncomeRuleStatementOrderListRespDetail[];
  /** 失败信息 */
  errorRemark?: string;
  /** 金蝶应收单号 */
  kingdeeBillReceivableCode?: string;
  /** 金蝶出库单号 */
  kingdeeOutStockCode?: string;
  /** 结算组织 */
  orgName?: string;
  /** 平台 */
  platform?: string;
  /** 平台单号 */
  platformCode?: string;
  /**
   * 平台结算时间
   * @format date-time
   */
  platformSettlementTime?: string;
  /** 推送信息 */
  pushInfo?: string;
  /**
   * 推送状态: 0-未推送 1-上传中 2-已推送 3-推送失败
   * @format int32
   */
  pushStatus?: number;
  /** 推送状态描述 */
  pushStatusDesc?: string;
  /**
   * 推送时间
   * @format date-time
   */
  pushTime?: string;
  /** 执行的规则编码 */
  ruleCode?: string;
  /** 执行规则店铺号 */
  ruleShopCode?: string;
  /** 店铺 */
  shop?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /** 更新者 */
  updater?: string;
  /** 更新人编码 */
  updaterDesc?: string;
}

/** IncomeRuleStatementOrderListRespStatistics */
export interface IncomeRuleStatementOrderListRespStatistics {
  /** @format int32 */
  allCount?: number;
  /** @format int32 */
  pushFailCount?: number;
  /** @format int32 */
  pushIngCount?: number;
  /** @format int32 */
  pushSuccessCount?: number;
  /** @format int32 */
  waitPushCount?: number;
}

/** IncomeRuleStatementOrderPushBatchListResp */
export interface IncomeRuleStatementOrderPushBatchListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  recordList?: IncomeRuleStatementOrderPushBatchListRespItem[];
  statistics?: IncomeRuleStatementOrderPushBatchListRespStatistics;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** IncomeRuleStatementOrderPushBatchListRespItem */
export interface IncomeRuleStatementOrderPushBatchListRespItem {
  /** 推送批次号，如果不为空则为批次推送快照，如果为空则是列表展示的最新数据 */
  batchNo?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /** 创建人编码 */
  creatorDesc?: string;
  /**
   * 失败数量
   * @format int32
   */
  failCount?: number;
  /**
   * 完成时间
   * @format date-time
   */
  finishTime?: string;
  /**
   * 已处理数量
   * @format int32
   */
  pushCount?: number;
  /** 推送备注 */
  pushRemark?: string;
  /** 剩余时间 */
  remainingTime?: string;
  /**
   * 状态 1-进行中 2-已完成 3-失败
   * @format int32
   */
  status?: number;
  /**
   * 成功数量
   * @format int32
   */
  successCount?: number;
  /**
   * 总数量
   * @format int32
   */
  totalCount?: number;
  /**
   * 推送类型 0-推送所有 1-按筛选条件推送 2-推送失败数据 3-推送未推送数据 4-推送失败+未推送
   * @format int32
   */
  type?: number;
  /** 推送类型 0-推送所有 1-按筛选条件推送 2-推送失败数据 3-推送未推送数据 4-推送失败+未推送 */
  typeDesc?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /** 更新者 */
  updater?: string;
  /** 更新人编码 */
  updaterDesc?: string;
  /** 推送耗时 */
  useTime?: string;
}

/** IncomeRuleStatementOrderPushBatchListRespStatistics */
export interface IncomeRuleStatementOrderPushBatchListRespStatistics {
  /** @format int32 */
  allCount?: number;
  /** @format int32 */
  pushFailCount?: number;
  /** @format int32 */
  pushIngCount?: number;
  /** @format int32 */
  pushSuccessCount?: number;
  /** @format int32 */
  waitPushCount?: number;
}

/** IncomeRuleStatementOrderPushReq */
export interface IncomeRuleStatementOrderPushReq {
  /** 结算单号 */
  code?: string;
  /**
   * 推送类型 0-推送所有 1-按筛选条件推送 2-推送失败数据 3-推送未推送数据 4-推送失败+未推送
   * @format int32
   */
  type?: number;
}

/** InvoiceDetail */
export interface InvoiceDetail {
  /** 开票金额 */
  invoiceAmount?: number;
  /** 发票号 */
  invoiceCode?: string;
}

/** InvoiceDetailResp */
export interface InvoiceDetailResp {
  /** 发票基本信息 */
  baseBean?: BillingBaseBean;
  /** 发票核销明细 */
  invoiceBeans?: BillingWriteOffBean[];
  /** 发票商品明细 */
  productBeans?: BillingProductBean[];
}

/** InvoiceListReq */
export interface InvoiceListReq {
  /**
   * 金额类型：1-核销金额 2-金额 3-税额 4-价税合计 8-未核销金额 9-发票净额
   * @format int32
   */
  amountType?: number;
  /** 发票号/订单号/客户PO */
  code?: string;
  /** 发票号/订单号/客户PO列表 */
  codes?: string[];
  /** 币种 */
  currency?: string;
  /** 客户 */
  customerCodes?: string[];
  /**
   * 结束时间
   * @format date
   */
  endTime?: string;
  /** 最大金额 */
  maxAmount?: number;
  /** 最小金额 */
  minAmount?: number;
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
   * @format date
   */
  startTime?: string;
  /**
   * 单据状态 1-暂存 2-已审核
   * @format int32
   */
  status?: number;
  /**
   * 类型：0-列表页面 1-认领页面
   * @format int32
   */
  type?: number;
  /**
   * 核销状态 1-全部核销 2-部分核销 3-未核销
   * @format int32
   */
  writeOffStatus?: number;
}

/** InvoiceListResp */
export interface InvoiceListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 发票列表 */
  recordList?: SaleInvoiceListBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** InvoiceReverseWriteOffReq */
export interface InvoiceReverseWriteOffReq {
  /**
   * 是否操作信用额度 0-不调整  1-调整
   * @format int32
   */
  adjustCreditLimit: number;
  /**
   * 核销明细ID
   * @format int64
   */
  id: number;
  /** 发票单号 */
  invoiceCode: string;
  /** 核销关联单据编号 */
  orderCode: string;
  /**
   * 核销关联单据类型
   * @format int32
   */
  orderTypeCode: number;
  /** 核销金额 */
  writeOffAmount: number;
}

/** InvoiceReviewReq */
export interface InvoiceReviewReq {
  /** 发票编码 */
  codes?: string[];
  /**
   * 审核状态 1.暂存 2.已审核
   * @format int32
   */
  status?: number;
}

/** InvoiceSaveReq */
export interface InvoiceSaveReq {
  /** 发票基本信息 */
  baseBean?: BillingBaseBean;
  /** 发票商品明细 */
  productBeans?: BillingProductBean[];
  /**
   * 是否审核： 0 仅保存  1 保存并审核
   * @format int32
   */
  review?: number;
}

/** ItemInfo */
export interface ItemInfo {
  /** 创建人 */
  createBy?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
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
   * 主键ID
   * @format int64
   */
  id?: number;
  /** kingdee仓库编码 */
  kingdeeWarehouseNumber?: string;
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
  /**
   * 出库数量
   * @format int32
   */
  outboundQuantity?: number;
  /** 库存池编码 */
  poolCode?: string;
  /** 产品名称 */
  productName?: string;
  /** 备注 */
  remark?: string;
  /** SKU编号 */
  skuCode?: string;
  /** 供应链SKU */
  supplySku?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /** 仓库编号 */
  warehouseCode?: string;
  /** 仓库名称 */
  warehouseDesc?: string;
}

/** MatchThirdSystemNumberReq */
export interface MatchThirdSystemNumberReq {
  /**
   * 单据类型
   * @format int32
   */
  billType?: number;
  /** 系统编码, kingdee ->金蝶 fbt->分贝通 jijia->积加 */
  systemCode?: string;
}

/** MemberDetailQueryResp */
export interface MemberDetailQueryResp {
  /** 账户信息 */
  accountBeanList?: BasicMemberAccountBean[];
  /** 基础信息 */
  basic?: BasicMemberBean;
  /** 分贝通员工推送信息 */
  memberFbtPushInfo?: BasicPushBean;
  /** 金蝶账户推送信息 */
  memberKingdeeAccountPushInfo?: BasicPushBean;
  /** 金蝶员工推送信息 */
  memberKingdeePushInfo?: BasicPushBean;
}

/** MemberListQueryResp */
export interface MemberListQueryResp {
  code?: string;
  /** 用户列表 */
  memberList?: BasicMemberBean[];
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 关联系统统计 */
  relateSystemStatics?: RelateSystemStaticsResp;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** ModelRefreshReq */
export interface ModelRefreshReq {
  /** 是否异步 */
  async?: boolean;
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

/** NewProductListResp */
export interface NewProductListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 新品年规列表 */
  recordList?: BasicNewProductBean[];
  /** 部门关联系统统计 */
  relateSystemStatics?: RelateSystemStaticsResp;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** OAInvoiceListResp */
export interface OAInvoiceListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 发票列表 */
  recordList?: OaInvoiceListBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** OaInvoiceListBean */
export interface OaInvoiceListBean {
  /** 数电发票号码 */
  digitalInvoiceNumber?: string;
  /** 发票文件名 */
  fileName?: string;
  /** 发票文件链接 */
  fileUrl?: string;
  /** 审批编码 */
  flowDesc?: string;
  /**
   * 发票主键ID
   * @format int64
   */
  id?: number;
  /**
   * 开票日期
   * @format date
   */
  invoiceDate?: string;
  /** 申请人 */
  processApplyCode?: string;
  /** 流程申请人 */
  processApplyName?: string;
  /**
   * 流程申请时间
   * @format date-time
   */
  processApplyTime?: string;
  /** 流程编号 */
  processCode?: string;
  /** 流程表单类型 */
  processName?: string;
  /** 销方名称 */
  sellerName?: string;
  /** 销方识别号 */
  sellerTaxNo?: string;
  /** 价税合计 */
  totalAmount?: number;
  /** @format date-time */
  updateTime?: string;
  /** 更新人 */
  updater?: string;
  /** 更新人 */
  updaterName?: string;
}

/** OaInvoiceListReq */
export interface OaInvoiceListReq {
  /**
   * 结束时间
   * @format date-time
   */
  endTime?: string;
  /** 所选发票 */
  idList?: number[];
  /** 关键字 */
  keyword?: string;
  /** 成员编码列表 */
  memberCodeList?: string[];
  /**
   * 页数
   * @format int32
   * @min 1
   * @exclusiveMin false
   */
  pageNum?: number;
  /**
   * 每页数量
   * @format int32
   * @max 1000
   * @exclusiveMax false
   */
  pageSize?: number;
  /** 流程编码列表 */
  processCodeList?: string[];
  /**
   * 查询时间类型 0-流程申请时间 1-开票日期 2-更新时间
   * @format int32
   */
  queryDateType?: number;
  /**
   * 查询成员类型 0-流程申请人 1-更新人
   * @format int32
   */
  queryMemberType?: number;
  /**
   * 开始时间
   * @format date-time
   */
  startTime?: string;
}

/** OaPaymentBudgetInfoBean */
export interface OaPaymentBudgetInfoBean {
  /** 金额 */
  amount?: number;
  /** 预算部门 */
  budgetDept?: string;
  /** 预算部门ID */
  budgetDeptId?: string;
  /** 三级类目 */
  categoryLevel3?: string;
  /** 国家 */
  country?: string;
  /** GTM品线 */
  gtmLine?: string;
  /** 编码（业务唯一标识） */
  orderCode?: string;
  /** 平台 */
  platform?: string;
  /**
   * 序号
   * @format int32
   */
  seq?: number;
  /** 店铺 */
  shop?: string;
  /** SPU名称 */
  spuName?: string;
}

/** OaPaymentDetailBean */
export interface OaPaymentDetailBean {
  /** 按钮信息 */
  button?: ButtonBean;
  /** kingdee推送信息 */
  kingdeePushInfo?: BasicPushBean;
  /** 付款预算信息 */
  oaPaymentBudgetInfoList?: OaPaymentBudgetInfoBean[];
  /** 付款单信息 */
  oaPaymentInfo?: OaPaymentInfoBean;
  /** 付款单行信息 */
  oaPaymentItemInfoList?: OaPaymentItemInfoBean[];
}

/** OaPaymentInfoBean */
export interface OaPaymentInfoBean {
  /** 记账日期 */
  accountDate?: string;
  /** 申请人编码 */
  applicantCode?: string;
  /** 申请人名称 */
  applicantName?: string;
  /** 审批单号 */
  approvalNo?: string;
  /** 完成日期 */
  completeDate?: string;
  /** 结算币别编码 */
  currencyCode?: string;
  /** 结算币别名称 */
  currencyName?: string;
  /** 申请部门(多个逗号隔开) */
  departmentCodes?: string;
  /** 申请部门名称(多个逗号隔开) */
  departmentNames?: string;
  /**
   * 主键
   * @format int64
   */
  id?: number;
  /** 金蝶单据状态 */
  kingdeeStatus?: string;
  /** 金蝶单据状态枚举 */
  kingdeeStatusTitle?: string;
  /** 编码（业务唯一标识）paid-已付 partially_paid-部分已付 no_payment_required-无需支付 no_payment_info-无支付信息 no_supplier-无供应商 no_payment_account-无付款账号 overpaid_and_prepaid-多付多预 bulk_after_sales-售后批量 cross_period-跨期 */
  orderCode?: string;
  /** 付款币别编码 */
  payCurrencyCode?: string;
  /** 付款币别名称 */
  payCurrencyName?: string;
  /** 支付单位 */
  payUnit?: string;
  /** 支付单位编码 */
  payUnitCode?: string;
  /** 支付对象 */
  payee?: string;
  /** 收款单位编码 */
  payeeNumber?: string;
  /** 收款单位类型 */
  payeeType?: string;
  /** 收款单位类型描述 */
  payeeTypeDesc?: string;
  /** 付款账号 */
  paymentAccount?: string;
  /** 审批流程编码 */
  processCode?: string;
  /** 审批流程名称 */
  processName?: string;
  /** 备注 */
  remark?: string;
  /** 研发项目 */
  researchProject?: string;
  /** 标识(枚举值) */
  tags?: string;
  /** 标识(枚举值名称) */
  tagsNames?: string;
  /** 总应付金额 */
  totalAmount?: number;
  /** 总手续费 */
  totalFee?: number;
  /** 总税额 */
  totalTax?: number;
}

/** OaPaymentItemInfoBean */
export interface OaPaymentItemInfoBean {
  /** 应付金额 */
  amount?: number;
  /** 费用类型描述 */
  expenseDesc?: string;
  /** 费用类型 */
  expenseType?: string;
  /** 手续费 */
  fee?: number;
  /** 费用说明 */
  feeDesc?: string;
  /** 编码（业务唯一标识） */
  orderCode?: string;
  /**
   * 序号
   * @format int32
   */
  seq?: number;
  /** 税额 */
  tax?: number;
}

/** OaPaymentOrderBatchChangePushStatusReq */
export interface OaPaymentOrderBatchChangePushStatusReq {
  /**
   * 记账结束时间
   * @format date
   */
  accountEndDate?: string;
  /**
   * 记账开始时间
   * @format date
   */
  accountStartDate?: string;
  /**
   * 应付金额-大于等于
   * @format int32
   */
  amountGe?: number;
  /**
   * 应付金额-小于等于
   * @format int32
   */
  amountLe?: number;
  /** 单号 */
  codes?: string[];
  /** 完成时间-结束 */
  completeDateEnd?: string;
  /** 完成时间-开始 */
  completeDateStart?: string;
  /** 关键字: 审核单号、流程名称、申请人、异常信息 */
  keyword?: string;
  /** kingdee推送状态 状态: 0-未推送 1-推送成功 2-推送失败 3-推送中 4-无需推送 */
  kingdeePushStatus?: number[];
  /** kingdee oa单据状态 */
  kingdeeStatus?: string[];
  /** 是否标记推送成功 */
  markPushSuccess?: boolean;
  /** 批量查询审批单号 */
  orderCodes?: string[];
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
  /** 支付单位编码 */
  payUnitCodes?: string[];
  /** 查询需要刷新金蝶状态 */
  queryNeedRefreshKingdeeeStatus?: boolean;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 标签:paid-已付 partially_paid-部分已付 no_payment_required-无需支付 no_payment_info-无支付信息 no_supplier-无供应商 no_payment_account-无付款账号 overpaid_and_prepaid-多付多预 bulk_after_sales-售后批量 cross_period-跨期 */
  tags?: string[];
}

/** OaPaymentOrderCodeUpdateReq */
export interface OaPaymentOrderCodeUpdateReq {
  /** 记账日期 */
  accountDate?: string;
  /** 编码（业务唯一标识） */
  orderCode?: string;
  /** 付款账号 */
  paymentAccount?: string;
  /** 推送kingdee */
  pushKingdee?: boolean;
  /** 标识(枚举值) */
  tags?: string[];
}

/** OaPaymentOrderListUpdateReq */
export interface OaPaymentOrderListUpdateReq {
  /** 编码（业务唯一标识） */
  orderCode?: string;
  /** 备注信息 */
  remark?: string;
}

/** OaPaymentOrderQueryListReq */
export interface OaPaymentOrderQueryListReq {
  /**
   * 记账结束时间
   * @format date
   */
  accountEndDate?: string;
  /**
   * 记账开始时间
   * @format date
   */
  accountStartDate?: string;
  /**
   * 应付金额-大于等于
   * @format int32
   */
  amountGe?: number;
  /**
   * 应付金额-小于等于
   * @format int32
   */
  amountLe?: number;
  /** 单号 */
  codes?: string[];
  /** 完成时间-结束 */
  completeDateEnd?: string;
  /** 完成时间-开始 */
  completeDateStart?: string;
  /** 关键字: 审核单号、流程名称、申请人、异常信息 */
  keyword?: string;
  /** kingdee推送状态 状态: 0-未推送 1-推送成功 2-推送失败 3-推送中 4-无需推送 */
  kingdeePushStatus?: number[];
  /** kingdee oa单据状态 */
  kingdeeStatus?: string[];
  /** 批量查询审批单号 */
  orderCodes?: string[];
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
  /** 支付单位编码 */
  payUnitCodes?: string[];
  /** 查询需要刷新金蝶状态 */
  queryNeedRefreshKingdeeeStatus?: boolean;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 标签:paid-已付 partially_paid-部分已付 no_payment_required-无需支付 no_payment_info-无支付信息 no_supplier-无供应商 no_payment_account-无付款账号 overpaid_and_prepaid-多付多预 bulk_after_sales-售后批量 cross_period-跨期 */
  tags?: string[];
}

/** OaPaymentOrderQueryListResp */
export interface OaPaymentOrderQueryListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 数据列表 */
  records?: OaPaymentQueryListRespItem[];
  /** 金蝶统计 */
  relateSystemStatics?: RelateSystemStaticsResp;
  /** 统计信息 */
  statistics?: OaPaymentQueryListRespStatistics;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** OaPaymentQueryListRespItem */
export interface OaPaymentQueryListRespItem {
  /** 记账日期 */
  accountDate?: string;
  /** 申请人编码 */
  applicantCode?: string;
  /** 申请人名称 */
  applicantName?: string;
  /** 审批单号 */
  approvalNo?: string;
  /** 按钮 */
  button?: ButtonBean;
  /** 完成日期 */
  completeDate?: string;
  /** 结算币别编码 */
  currencyCode?: string;
  /** 结算币别名称 */
  currencyName?: string;
  /** 申请部门(多个逗号隔开) */
  departmentCodes?: string;
  /** 申请部门名称(多个逗号隔开) */
  departmentNames?: string;
  /**
   * 主键
   * @format int64
   */
  id?: number;
  /** kingdee推送信息 */
  kingdeePushBean?: BasicPushBean;
  /** 金蝶单据状态 */
  kingdeeStatus?: string;
  /** 金蝶单据状态枚举 */
  kingdeeStatusTitle?: string;
  /** 编码（业务唯一标识）paid-已付 partially_paid-部分已付 no_payment_required-无需支付 no_payment_info-无支付信息 no_supplier-无供应商 no_payment_account-无付款账号 overpaid_and_prepaid-多付多预 bulk_after_sales-售后批量 cross_period-跨期 */
  orderCode?: string;
  /** 付款币别编码 */
  payCurrencyCode?: string;
  /** 付款币别名称 */
  payCurrencyName?: string;
  /** 支付单位 */
  payUnit?: string;
  /** 支付单位编码 */
  payUnitCode?: string;
  /** 支付对象 */
  payee?: string;
  /** 付款账号 */
  paymentAccount?: string;
  /** 审批流程编码 */
  processCode?: string;
  /** 审批流程名称 */
  processName?: string;
  /** 备注 */
  remark?: string;
  /** 研发项目 */
  researchProject?: string;
  /** 标识(枚举值) */
  tags?: string;
  /** 标识(枚举值名称) */
  tagsNames?: string;
  /** 总应付金额 */
  totalAmount?: number;
  /** 总手续费 */
  totalFee?: number;
  /** 总税额 */
  totalTax?: number;
}

/** OaPaymentQueryListRespStatistics */
export interface OaPaymentQueryListRespStatistics {
  /**
   * 售后批量数量
   * @format int32
   */
  bulkAfterSalesNum?: number;
  /**
   * 跨币种数量
   * @format int32
   */
  crossCurrencyNum?: number;
  /**
   * 跨期数量
   * @format int32
   */
  crossPeriodNum?: number;
  /**
   * 金蝶已审核数量
   * @format int32
   */
  kingdeeAuditedNum?: number;
  /**
   * 金蝶不存在数量
   * @format int32
   */
  kingdeeNotExitsNum?: number;
  /**
   * 金蝶其他数量
   * @format int32
   */
  kingdeeOtherNum?: number;
  /**
   * 金蝶已付款数量
   * @format int32
   */
  kingdeePaymentProcessedNum?: number;
  /**
   * 金蝶已提交数量
   * @format int32
   */
  kingdeeSubmittedNum?: number;
  /**
   * 金蝶暂存数量
   * @format int32
   */
  kingdeeTemporarySaveNum?: number;
  /**
   * 无付款账号数量
   * @format int32
   */
  noPaymentAccountNum?: number;
  /**
   * 无付款信息数量
   * @format int32
   */
  noPaymentInfoNum?: number;
  /**
   * 无需支付数量
   * @format int32
   */
  noPaymentRequiredNum?: number;
  /**
   * 无供应商数量
   * @format int32
   */
  noSupplierNum?: number;
  /**
   * 多付多预数量
   * @format int32
   */
  overpaidAndPrepaidNum?: number;
  /**
   * 已付数量
   * @format int32
   */
  paidNum?: number;
  /**
   * 部分已付数量
   * @format int32
   */
  partiallyPaidNum?: number;
}

/** OfflineTransferBatchChangePushStatusReq */
export interface OfflineTransferBatchChangePushStatusReq {
  /** 编码列表 */
  billTypeUniqueBeans?: BillTypeUniqueBean[];
  /** 是否标记推送成功 */
  markPushSuccess?: boolean;
}

/** OfflineTransferOrderDetailResp */
export interface OfflineTransferOrderDetailResp {
  /** 基本信息 */
  baseInfo?: OfflineTransferOrderDetailRespBaseInfo;
  /** 调拨单明细信息 */
  itemInfoList?: OfflineTransferOrderDetailRespItemInfo[];
  /** kingdee推送信息 */
  kingdeePushInfo?: BasicPushBean;
}

/** OfflineTransferOrderDetailRespBaseInfo */
export interface OfflineTransferOrderDetailRespBaseInfo {
  /**
   * 实际出库日期
   * @format date-time
   */
  actualDeliveryDate?: string;
  /** 站点名称 */
  arrivalMarketName?: string;
  /** 调入仓库 */
  arrivalWarehouseBean?: BasicWarehouse;
  /** 调入仓库编码 */
  arrivalWarehouseCode?: string;
  /** 调入仓库国家 */
  arrivalWarehouseCountry?: string;
  /** 调入仓库名称 */
  arrivalWarehouseName?: string;
  /** 调入仓库类型 */
  arrivalWarehouseType?: string;
  /**
   * 单据类型: 40-标准直接调拨单 41-报关调拨单
   * @format int32
   */
  billType?: number;
  /** 单据类型描述 */
  billTypeDesc?: string;
  /** 承运商 */
  carrierCode?: string;
  /** 调拨单号 */
  code?: string;
  /** 创建人账号 */
  createBy?: string;
  /** 创建人名称 */
  createDesc?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /**
   * 预计到货日期
   * @format date-time
   */
  deliveryDate?: string;
  /**
   * 预计出库日期
   * @format date-time
   */
  executorDate?: string;
  /**
   * 预计出运日期
   * @format date-time
   */
  expectShipmentDate?: string;
  /**
   * 出库状态
   * @format int32
   */
  flag?: number;
  /**
   * 主键ID
   * @format int64
   */
  id?: number;
  /**
   * 实际入库日期
   * @format date-time
   */
  inboundDate?: string;
  /** 调入仓入库单号 */
  inboundNo?: string;
  /** 入库人ID */
  inboundOperatorId?: string;
  /** 入库人名称 */
  inboundOperatorName?: string;
  /** 调入仓入库单状态：PENDING-入库中，SUCCESS-入库成功，FAILED-入库失败 */
  inboundStatus?: string;
  /** 调入仓入库单状态描述 */
  inboundStatusDesc?: string;
  /**
   * 积加调拨单ID
   * @format int32
   */
  jjTransferId?: number;
  /** kingdee调入仓库编码 */
  kingdeeArrivalWarehouseNumber?: string;
  /** kingdee仓库编码 */
  kingdeeWarehouseNumber?: string;
  /** 备注 */
  memo?: string;
  /** 调拨类型: CN_WAREHOUSE-中仓 FACTORY_DIRECT-工厂直发 VIRTUAL_TRANSFER-虚仓调拨 */
  operationType?: string;
  /** 调拨类型描述 */
  operationTypeDesc?: string;
  /** 调出仓库出库单号 */
  outboundNo?: string;
  /** 出库人ID */
  outboundOperatorId?: string;
  /** 出库人名称 */
  outboundOperatorName?: string;
  /** 调出仓出库单状态：PENDING-出库中，SUCCESS-出库成功，FAILED-出库失败 */
  outboundStatus?: string;
  /** 调出仓出库单状态描述 */
  outboundStatusDesc?: string;
  /**
   * 拣货状态
   * @format int32
   */
  pick?: number;
  /** 渠道 */
  platform?: string;
  /** 推送失败原因 */
  pushFailureReason?: string;
  /** 关联货件单 */
  shipmentId?: string;
  /**
   * 产品种类
   * @format int32
   */
  skuSpecies?: number;
  /** 状态：audit-审核中，wait_audit-审核驳回，approve-审核通过，on_the_way-调拨在途，finish-已完成，cancelled-已作废，processingStatus-进行中，draft-草稿 */
  status?: string;
  /** 状态描述 */
  statusDesc?: string;
  /** 店铺 */
  store?: string;
  /** 积加调拨单号 */
  tfCode?: string;
  /** 总货值 */
  totalPrice?: number;
  /** 物流跟踪号 */
  trackingNo?: string;
  /** 调入组织编码 */
  transferInOrgCode?: string;
  /** 调入组织名称 */
  transferInOrgName?: string;
  /** 调出组织编码 */
  transferOutOrgCode?: string;
  /** 调出组织名称 */
  transferOutOrgName?: string;
  /**
   * 调拨场景 1-头程调拨 2- 中仓间调拨 3-海外仓间调拨
   * @format int32
   */
  transferScene?: number;
  /** 运输方式（物流方式） */
  transport?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  warehouseBean?: BasicWarehouse;
  /** 调出仓库编码 */
  warehouseCode?: string;
  /** 调出仓库国家 */
  warehouseCountry?: string;
  /** 调出仓库名称 */
  warehouseName?: string;
  /** 调出仓库类型 */
  warehouseType?: string;
}

/** OfflineTransferOrderDetailRespItemInfo */
export interface OfflineTransferOrderDetailRespItemInfo {
  /** 调入仓库编码 */
  arrivalWarehouseCode?: string;
  /** 调入仓库名称 */
  arrivalWarehouseName?: string;
  /** ASIN */
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
  /** 类别（产品品类） */
  category?: string;
  /** 币种 */
  currency?: string;
  /** 英文报关名 */
  customsDeclarationName?: string;
  /** FNSKU */
  fnsku?: string;
  /**
   * 主键ID
   * @format int64
   */
  id?: number;
  /** 在途仓编码 */
  inTransitWarehouseCode?: string;
  /** 在途仓名称 */
  inTransitWarehouseName?: string;
  /**
   * 积加调拨单明细ID
   * @format int32
   */
  jjTransferItemId?: number;
  /** 明细备注 */
  memo?: string;
  /** Msku */
  msku?: string;
  /** 采购成本（SKU单价） */
  price?: number;
  /** 产品SKU */
  product?: string;
  /** 产品图片 */
  productImageUrl?: string;
  /**
   * 产品类型
   * @format int32
   */
  productType?: number;
  /** 质量状态 */
  qualityStatus?: string;
  /**
   * 调拨量
   * @format int32
   */
  quantity?: number;
  /** MSKU */
  sellerSku?: string;
  /** 产品名称 */
  skuName?: string;
  /** 供应链SKU */
  supplySku?: string;
  /** 调拨单号 */
  transferOrderCode?: string;
  /** 总体积 */
  volumeTotal?: number;
  /** 总体积重 */
  volumeWeightTotal?: number;
  /** 调出仓库编码 */
  warehouseCode?: string;
  /** 调出仓库名称 */
  warehouseName?: string;
  /** 总实物重(kg) */
  weightTotal?: number;
}

/** OfflineTransferOrderListQueryReq */
export interface OfflineTransferOrderListQueryReq {
  /** 单据类型: 40-标准直接调拨单 41-报关调拨单  */
  billTypes?: number[];
  /** 单据编号关键字 */
  codeKeyword?: string;
  /** 单据编号 */
  codeList?: string[];
  /** 创建时间结束 */
  createTimeEnd?: string;
  /** 创建时间开始 */
  createTimeStart?: string;
  /** 创建人 */
  creators?: string[];
  /** kingdee单据编号 */
  kingdeeOrderCode?: string;
  /** kingdee推送状态 状态: 0-未推送 1-推送成功 2-推送失败 3-推送中 */
  kingdeePushStatus?: number[];
  /** 调拨类型: CN_WAREHOUSE-中仓 FACTORY_DIRECT-工厂直发 VIRTUAL_TRANSFER-虚仓调拨 */
  operationTypes?: string[];
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
  /** 调入组织名称 */
  transferInOrgNames?: string[];
  /** 调出组织名称 */
  transferOutOrgNames?: string[];
  /** 调拨单号关键字查询 */
  wmsTfCodeKeyword?: string;
}

/** OfflineTransferOrderQueryListItem */
export interface OfflineTransferOrderQueryListItem {
  /** 调入仓库编码 */
  arrivalWarehouseCode?: string;
  /** 调入仓库名称 */
  arrivalWarehouseName?: string;
  /**
   * 单据类型: 40-标准直接调拨单 41-报关调拨单
   * @format int32
   */
  billType?: number;
  /** 单据类型描述 */
  billTypeDesc?: string;
  /** 单据编号 */
  code?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /** 创建人 */
  creatorName?: string;
  /** kingdee推送信息 */
  kingdeePushBean?: BasicPushBean;
  /** 调拨类型: CN_WAREHOUSE-中仓 FACTORY_DIRECT-工厂直发 VIRTUAL_TRANSFER-虚仓调拨 */
  operationType?: string;
  /** 调拨类型描述 */
  operationTypeDesc?: string;
  /** 调入组织编码 */
  transferInOrgCode?: string;
  /** 调入组织名称 */
  transferInOrgName?: string;
  /** 调出组织编码 */
  transferOutOrgCode?: string;
  /** 调出组织名称 */
  transferOutOrgName?: string;
  /** 调出仓库编码 */
  warehouseCode?: string;
  /** 调出仓库名称 */
  warehouseName?: string;
  /** 调拨单号 */
  wmsTfCode?: string;
}

/** OfflineTransferOrderQueryListResp */
export interface OfflineTransferOrderQueryListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 列表 */
  recordList?: OfflineTransferOrderQueryListItem[];
  /** 金蝶统计 */
  relateSystemStatics?: RelateSystemStaticsResp;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** OtherBusinessPartnersQueryListReq */
export interface OtherBusinessPartnersQueryListReq {
  /** 关键字 */
  keyword?: string;
  /** 金蝶使用状态 */
  kingdeeEnables?: string[];
  /** 金蝶数据状态 */
  kingdeeStatuses?: string[];
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

/** OtherBusinessPartnersQueryListResp */
export interface OtherBusinessPartnersQueryListResp {
  code?: string;
  /** 金蝶使用状态统计 */
  enableStatusCountMap?: Record<string, number>;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  recordList?: OtherBusinessPartnersQueryListRespData[];
  /** 金蝶数据状态统计 */
  statusCountMap?: Record<string, number>;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** OtherBusinessPartnersQueryListRespData */
export interface OtherBusinessPartnersQueryListRespData {
  /** 编码 */
  code?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /**
   * 主键ID
   * @format int64
   */
  id?: number;
  /** 金蝶使用状态 */
  kingdeeEnable?: string;
  /** 金蝶使用状态 */
  kingdeeEnableTitle?: string;
  /** 金蝶编码 */
  kingdeeNumber?: string;
  /** 金蝶数据状态 */
  kingdeeStatus?: string;
  /** 金蝶数据状态 */
  kingdeeStatusTitle?: string;
  /** 名称 */
  name?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** OtherInOutStockBatchChangePushStatusReq */
export interface OtherInOutStockBatchChangePushStatusReq {
  /** 入库单编码 */
  inStockCodeList?: string[];
  /** 是否标记推送成功 */
  markPushSuccess?: boolean;
  /** 出库单编码 */
  outStockCodeList?: string[];
}

/** OtherInOutStockQueryListItem */
export interface OtherInOutStockQueryListItem {
  /**
   * 单据类型: 43-其他入库单 42-其他出库单
   * @format int32
   */
  billType?: number;
  /** 单据类型描述 */
  billTypeDesc?: string;
  /** 单据编号 */
  code?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /** 创建人 */
  creatorName?: string;
  /** kingdee推送信息 */
  kingdeePushBean?: BasicPushBean;
  /** 场景类型 */
  operationType?: string;
  /** 组织编号 */
  orgCode?: string;
  /** 组织名称 */
  orgName?: string;
  /** 仓库编号 */
  warehouseCode?: string;
  /** 仓库名称 */
  warehouseDesc?: string;
}

/** OtherInOutStockQueryListResp */
export interface OtherInOutStockQueryListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 列表 */
  recordList?: OtherInOutStockQueryListItem[];
  /** 关联系统统计 */
  relateSystemStatics?: RelateSystemStaticsResp;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** OtherInOutStockQueryReq */
export interface OtherInOutStockQueryReq {
  /** 单据类型: 43-其他入库单 42-其他出库单 */
  billTypes?: number[];
  /** 单据编号关键字 */
  codeKeyword?: string;
  /** 单据编号 */
  codeList?: string[];
  /** 创建时间结束 */
  createTimeEnd?: string;
  /** 创建时间开始 */
  createTimeStart?: string;
  /** 创建人 */
  creators?: string[];
  /** kingdee单据编号 */
  kingdeeOrderCode?: string;
  /** kingdee推送状态 状态: 0-未推送 1-推送成功 2-推送失败 3-推送中 */
  kingdeePushStatus?: number[];
  /** 场景类型 */
  operationTypes?: string[];
  /** 组织名称 */
  orgNames?: string[];
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

/** PayApplyAccountInfoBean */
export interface PayApplyAccountInfoBean {
  /** 银行联行号 */
  accountsBankId?: string;
  /** 开户行 */
  accountsBankName?: string;
  /** 账号 */
  accountsCode?: string;
  /** 账户名称 */
  accountsName?: string;
  /** 支行联行号 */
  accountsSubbranchId?: string;
  /** 支行 */
  accountsSubbranchName?: string;
  /**
   * 账户类型
   * @format int32
   */
  accountsType?: number;
  /** 账户类型描述 */
  accountsTypeDesc?: string;
}

/** PayApplyExtraInfoBean */
export interface PayApplyExtraInfoBean {
  /** 第三方系统账户id */
  accountId?: string;
  /** 广告账户 */
  advertAccount?: string;
  /** 广告账户编码 */
  advertAccountCode?: string;
  /** 品牌编码 */
  brandCode?: string;
  /** 品牌名称 */
  brandName?: string;
  /** 合作事项id */
  matterId?: string;
  /** 月结方式 */
  monthPayMode?: string;
  /** 上线链接 */
  onlineLink?: string;
  /** 实付金额 */
  paidAmount?: number;
  /** 实付币别 */
  paidCurrencyCode?: string;
  /** 实付币别描述 */
  paidCurrencyDesc?: string;
  /** 实付币别名称 */
  paidCurrencyName?: string;
  /** 支付方式 */
  payType?: string;
  /** 支付方式编码 */
  payTypeCode?: string;
  paymentAccountCode?: string;
  paymentAccountName?: string;
  /** 平台编码 */
  platformCode?: string;
  /** 平台名称 */
  platformName?: string;
  /** po号 */
  poBillNo?: string;
  /** 项目编码 */
  projectCode?: string;
  /** 项目名称 */
  projectName?: string;
  /** 推广渠道 */
  promoteChannel?: string;
  /** 推广渠道编码 */
  promoteChannelCode?: string;
  /**
   * 数量
   * @format int32
   */
  quantity?: number;
  /** 退款类型 */
  refundType?: string;
  /** sku名称 */
  skuName?: string;
  /** swiftcode/sortcode */
  swiftCode?: string;
  thirdCreatorId?: string;
  /** 总合同金额 */
  totalContractAmount?: number;
}

/** PayApplyOrderBean */
export interface PayApplyOrderBean {
  /** 申请人 */
  applyMemberName?: string;
  /**
   * 审核时间
   * @format date-time
   */
  auditTime?: string;
  /** @format int32 */
  billStatus?: number;
  /** 单据状态 */
  billStatusDesc?: string;
  /** 单据类型 */
  billTypeDesc?: string;
  /** fbt推送信息 */
  fbtPushInfo?: BasicPushBean;
  /** @format int32 */
  invoiceStatus?: number;
  /** 发票状态 */
  invoiceStatusDesc?: string;
  /** kingdee推送信息 */
  kingdeePushInfo?: BasicPushBean;
  /** 单据编号 */
  payApplyBillNo?: string;
  /** 支付对象 */
  payObject?: string;
  /** @format int32 */
  reconciliationStatus?: number;
  /** 核销状态 */
  reconciliationStatusDesc?: string;
  /** 来源单号 */
  sourceBillNo?: string;
  systemCode?: string;
  /** 来源系统 */
  systemCodeDesc?: string;
  thirdFormId?: string;
  /** 申请支付金额 */
  totalPayApplyAmount?: number;
}

/** PayApplyOrderContractBean */
export interface PayApplyOrderContractBean {
  /** @format int32 */
  amortizationFlag?: number;
  /** 是否摊销 */
  amortizationFlagDesc?: string;
  /** 合同金额 */
  contractAmount?: number;
  /** 合同编码 */
  contractCode?: string;
  /**
   * 合同结束时间
   * @format date-time
   */
  contractEndTime?: string;
  /** 合同进项税额 */
  contractInputTax?: number;
  /**
   * 合同开始时间
   * @format date-time
   */
  contractStartTime?: string;
  /** @format int32 */
  firstPaymentFlag?: number;
  /** 是否首款 */
  firstPaymentFlagDesc?: string;
  /** 推送状态 */
  pushStatusDesc?: string;
  /**
   * 推送时间
   * @format date-time
   */
  pushTime?: string;
  /**
   * 使用期限,多少个月
   * @format int32
   */
  useDuration?: number;
}

/** PayApplyOrderDetailResp */
export interface PayApplyOrderDetailResp {
  /** 账户信息 */
  accountInfo?: PayApplyAccountInfoBean;
  /** 申请人部门名称 */
  applyMemberDeptName?: string;
  /** 申请人 */
  applyMemberName?: string;
  /** 申请事由 */
  applyReason?: string;
  /**
   * 申请时间
   * @format date-time
   */
  applyTime?: string;
  /**
   * 审核时间
   * @format date-time
   */
  auditTime?: string;
  /** 银行流水号 */
  bankSerialNumber?: string;
  /** 单据状态 */
  billStatusDesc?: string;
  /** 单据类型 */
  billTypeDesc?: string;
  /** 是否CBS付款 */
  cbsPayDesc?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creatorName?: string;
  /** 币别 */
  currencyName?: string;
  /** 扩展信息 */
  extraInfo?: PayApplyExtraInfoBean;
  /** 分贝通付款申请单推送信息 */
  fbtPayAppllyPushInfo?: BasicPushBean;
  /** 发票状态 */
  invoiceStatusDesc?: string;
  /** 金蝶付款申请单推送信息 */
  kingdeePayAppllyPushInfo?: BasicPushBean;
  /** 附件信息 */
  listAttachmentInfo?: AttachmentInfoBean[];
  /** 合同明细 */
  listContractItem?: PayApplyOrderContractBean[];
  /** 金蝶资产卡片推送信息 */
  listKingdeeAssetCardPushInfo?: BasicPushBean[];
  /** 金蝶付款退款单推送信息 */
  listKingdeeRefundPushInfo?: BasicPushBean[];
  /** 金额明细 */
  listMoneyItem?: PayApplyOrderMoneyBean[];
  /** 子表明细 */
  listSubFormItem?: PayApplyOrderSubFormBean[];
  /** 单据编号 */
  payApplyBillNo?: string;
  /**
   * 申请支付日期
   * @format date
   */
  payApplyDate?: string;
  /** 付款id */
  payId?: string;
  /** 支付对象 */
  payObject?: string;
  /** 付款组织 */
  payOrgName?: string;
  /**
   * 支付日期
   * @format date
   */
  payTime?: string;
  /**
   * 核销状态： 0-无需核销 1-待核销 2-已核销
   * @format int32
   */
  reconciliationStatus?: number;
  /** 核销状态 */
  reconciliationStatusDesc?: string;
  /** 备注 */
  remark?: string;
  /** 来源单号 */
  sourceBillNo?: string;
  /** 来源系统 */
  systemCodeDesc?: string;
  /** 申请支付金额 */
  totalPayApplyAmount?: number;
}

/** PayApplyOrderListReq */
export interface PayApplyOrderListReq {
  /**
   * 审核结束时间
   * @format date
   */
  auditEndTime?: string;
  /**
   * 审核开始时间
   * @format date
   */
  auditStartTime?: string;
  /**
   * 单据状态
   * @format int32
   */
  billStatus?: number;
  /** @format int32 */
  billType?: number;
  /**
   * 分贝通推送状态: 0-未推送 1-推送成功 2-推送失败
   * @format int32
   */
  fbtPushStatus?: number;
  /**
   * 分贝通关联状态: 0-未关联 1-已关联
   * @format int32
   */
  fbtRelateStatus?: number;
  /**
   * 发票状态
   * @format int32
   */
  invoiceStatus?: number;
  /** 关键字 */
  keyword?: string;
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
  /**
   * 金蝶推送状态: 0-未推送 1-推送成功 2-推送失败
   * @format int32
   */
  pushStatus?: number;
  /**
   * 核销状态
   * @format int32
   */
  reconciliationStatus?: number;
  /**
   * 金蝶关联状态: 0-未关联 1-已关联
   * @format int32
   */
  relateStatus?: number;
  /** 来源系统 */
  systemCode?: string;
}

/** PayApplyOrderListResp */
export interface PayApplyOrderListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 付款申请单列表 */
  payApplyOrderList?: PayApplyOrderBean[];
  /** 付款申请单关联系统统计 */
  relateSystemStatics?: RelateSystemStaticsResp;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** PayApplyOrderMoneyBean */
export interface PayApplyOrderMoneyBean {
  /** 归属推广名称 */
  affiPromoteName?: string;
  /** 预算部门名称 */
  budgetDeptName?: string;
  /** 三级分类名称 */
  categoryName?: string;
  /** 国家名称 */
  countryName?: string;
  /** 币别名称 */
  currencyName?: string;
  /** 研发项目名称 */
  developTeamName?: string;
  /** 扩展字段 */
  extraInfoBean?: PayApplyOrderMoneyExtraInfoBean;
  /** 费用说明 */
  feeDesc?: string;
  /** 费用项目名称 */
  feeTeamName?: string;
  /** gtm品线名称 */
  gtmPxName?: string;
  /** 申请支付金额 */
  payApplyAmount?: number;
  /** 申请支付含税金额 */
  payApplyIncludeTaxAmount?: number;
  /** 申请支付未税金额 */
  payApplyNetAmount?: number;
  /** 申请支付税额 */
  payApplyTaxAmount?: number;
  /** 平台名称 */
  platformName?: string;
  /** 产品spu编码 */
  productSpu?: string;
  /** 产品spu名称 */
  productSpuName?: string;
  /** 退款金额 */
  refundAmount?: number;
  /** 手续费 */
  serviceFee?: number;
  /** 分摊比例 */
  shareRatio?: number;
  /** 店铺名称 */
  shopName?: string;
}

/** PayApplyOrderMoneyExtraInfoBean */
export interface PayApplyOrderMoneyExtraInfoBean {
  /** 区域编码 */
  areaCode?: string;
  /** 区域 */
  areaName?: string;
  /** 预算费用编码 */
  budgetFeeCode?: string;
  /** 预算费用 */
  budgetFeeName?: string;
  costId?: string;
  /**
   * 是否开发项目
   * @format int32
   */
  developTeamFlag?: number;
  /** 是否研发项目描述 */
  developTeamFlagDesc?: string;
  feeControlId?: string;
  /** 发票税率 */
  invoiceTax?: number;
  /** 发票税率展示 */
  invoiceTaxDesc?: string;
  /** 线下客户编码 */
  offlineCustomerCode?: string;
  /** 线下客户名称 */
  offlineCustomerName?: string;
}

/** PayApplyOrderSubFormBean */
export interface PayApplyOrderSubFormBean {
  /** 扩展字段 */
  extraInfoBean?: PayApplyOrderSubFormExtraInfoBean;
  /** 含税金额 */
  payApplyAmount?: number;
  /** 未税金额 */
  payApplyNetAmount?: number;
  /** 税额 */
  payApplyTaxAmount?: number;
  /** 推送状态 */
  pushStatusDesc?: string;
  /**
   * 推送时间
   * @format date-time
   */
  pushTime?: string;
}

/** PayApplyOrderSubFormExtraInfoBean */
export interface PayApplyOrderSubFormExtraInfoBean {
  /** 类别 */
  category?: string;
  /** 类别编码 */
  categoryCode?: string;
  costId?: string;
  /** 币别编码 */
  currencyCode?: string;
  /** 币别名称 */
  currencyName?: string;
  /** 费用项目编码 */
  feeTeamCode?: string;
  /** 费用项目名称 */
  feeTeamName?: string;
  /** 是否固定资产 */
  fixedAssetDesc?: string;
  /** 发票税率 */
  invoiceTax?: number;
  /** 发票税率描述 */
  invoiceTaxDesc?: string;
  /** 未税差额 */
  netDifference?: number;
  /** 实际未税金额 */
  netPaymentAmount?: number;
  /** 商品原值 */
  originalPrice?: number;
  /** po号 */
  poBillNo?: string;
  /** 资产未税金额 */
  preTaxAssetAmount?: number;
  /** 商品编码 */
  productCode?: string;
  /** 商品名称 */
  productName?: string;
  /** 数量 */
  quantity?: number;
  /** 客户收款账号 */
  receiveAccount?: string;
  /** 是否收到固定资产 */
  receiveFixedAssetDesc?: string;
  /** 退款金额 */
  refundAmount?: number;
  /** 手续费 */
  serviceFee?: number;
  /** 店铺编码 */
  shopCode?: string;
  /** 店铺名称 */
  shopName?: string;
  /** sku名称 */
  skuName?: string;
}

/** PayableBillDetailQueryResp */
export interface PayableBillDetailQueryResp {
  /** 基础信息 */
  baseInfo?: PayableBillListBean;
  /** 明细信息 */
  itemList?: PayableBillDetailQueryRespItemBean[];
  /** kingdee推送信息 */
  kingdeePushInfo?: BasicPushBean;
}

/** PayableBillDetailQueryRespItemBean */
export interface PayableBillDetailQueryRespItemBean {
  /** 预算部门描述 */
  budgetDeptDesc?: string;
  /** 预算部门 */
  budgetDeptId?: string;
  /** 费用项目 */
  feeType?: string;
  /** 费用类型 */
  feeTypeDesc?: string;
  /** GTM品线 */
  gtmProductLineCode?: string;
  /** GTM品线描述 */
  gtmProductLineDesc?: string;
  /** 备注 */
  remark?: string;
  /** 场景 */
  scene?: string;
  /** 税额 */
  taxAmount?: number;
  /** 不含税金额 */
  taxExcludeAmount?: number;
  /** 含税金额 */
  taxIncludedAmount?: number;
  /** 三级分类 */
  thirdCategoryCode?: string;
  /** 三级分类描述 */
  thirdCategoryDesc?: string;
}

/** PayableBillListBean */
export interface PayableBillListBean {
  /** 申请员编码 */
  applyMemberCode?: string;
  /** 申请员名称 */
  applyMemberDesc?: string;
  /**
   * 审核时间
   * @format date-time
   */
  auditTime?: string;
  /**
   * 业务日期
   * @format date-time
   */
  businessDate?: string;
  /** 单据编码 */
  code?: string;
  /** 往来对象 */
  concatObject?: string;
  /** 往来对象描述 */
  concatObjectDesc?: string;
  /**
   * 往来类型 1-供应商
   * @format int32
   */
  concatType?: number;
  /** 往来类型描述 */
  concatTypeDesc?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /** 创建人描述 */
  creatorDesc?: string;
  /** 币别 */
  currencyCode?: string;
  /** 币别描述 */
  currencyDesc?: string;
  /** 结算组织 */
  settlementOrg?: string;
  /** 结算组织描述 */
  settlementOrgDesc?: string;
  /** 来源单号 */
  sourceCode?: string;
  /** 来源系统: fbt */
  sourceSystemCode?: string;
  /** 来源系统描述 */
  sourceSystemDesc?: string;
  /**
   * 来源单据类型: 1.分贝通月度对账单
   * @format int32
   */
  sourceType?: number;
  /** 来源单据类型描述 */
  sourceTypeDesc?: string;
  /**
   * 状态: 1-已审核
   * @format int32
   */
  status?: number;
  /** 状态描述 */
  statusDesc?: string;
  /** 总税额 */
  totalTaxAmount?: number;
  /** 不含税总金额 */
  totalTaxExcludeAmount?: number;
  /** 含税总金额 */
  totalTaxIncludedAmount?: number;
}

/** PayableBillListBeanExt */
export interface PayableBillListBeanExt {
  /** 申请员编码 */
  applyMemberCode?: string;
  /** 申请员名称 */
  applyMemberDesc?: string;
  /**
   * 审核时间
   * @format date-time
   */
  auditTime?: string;
  /**
   * 业务日期
   * @format date-time
   */
  businessDate?: string;
  /** 单据编码 */
  code?: string;
  /** 往来对象 */
  concatObject?: string;
  /** 往来对象描述 */
  concatObjectDesc?: string;
  /**
   * 往来类型 1-供应商
   * @format int32
   */
  concatType?: number;
  /** 往来类型描述 */
  concatTypeDesc?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /** 创建人描述 */
  creatorDesc?: string;
  /** 币别 */
  currencyCode?: string;
  /** 币别描述 */
  currencyDesc?: string;
  /** kingdee推送信息 */
  kingdeePushInfo?: BasicPushBean;
  /** 结算组织 */
  settlementOrg?: string;
  /** 结算组织描述 */
  settlementOrgDesc?: string;
  /** 来源单号 */
  sourceCode?: string;
  /** 来源系统: fbt */
  sourceSystemCode?: string;
  /** 来源系统描述 */
  sourceSystemDesc?: string;
  /**
   * 来源单据类型: 1.分贝通月度对账单
   * @format int32
   */
  sourceType?: number;
  /** 来源单据类型描述 */
  sourceTypeDesc?: string;
  /**
   * 状态: 1-已审核
   * @format int32
   */
  status?: number;
  /** 状态描述 */
  statusDesc?: string;
  /** 总税额 */
  totalTaxAmount?: number;
  /** 不含税总金额 */
  totalTaxExcludeAmount?: number;
  /** 含税总金额 */
  totalTaxIncludedAmount?: number;
}

/** PayableBillListQueryReq */
export interface PayableBillListQueryReq {
  /** @format int32 */
  billType?: number;
  /**
   * 业务日期-开始
   * @format date-time
   */
  businessDateBegin?: string;
  /**
   * 业务日期-结束
   * @format date-time
   */
  businessDateEnd?: string;
  /**
   * 分贝通推送状态: 0-未推送 1-推送成功 2-推送失败
   * @format int32
   */
  fbtPushStatus?: number;
  /**
   * 分贝通关联状态: 0-未关联 1-已关联
   * @format int32
   */
  fbtRelateStatus?: number;
  /** 关键字 */
  keyword?: string;
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
  /**
   * 金蝶推送状态: 0-未推送 1-推送成功 2-推送失败
   * @format int32
   */
  pushStatus?: number;
  /**
   * 金蝶关联状态: 0-未关联 1-已关联
   * @format int32
   */
  relateStatus?: number;
}

/** PayableBillListQueryResp */
export interface PayableBillListQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 列表 */
  recordList?: PayableBillListBeanExt[];
  /** 关联系统统计 */
  relateSystemStatics?: RelateSystemStaticsResp;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** PaymentCollectionAddReq */
export interface PaymentCollectionAddReq {
  /** 金额 */
  amount?: number;
  /** 单据编号 */
  code?: string;
  /**
   * 收款日期
   * @format date
   */
  collectionDate?: string;
  /** 开户组织 */
  collectionOrg?: string;
  /** 币种 */
  currency?: string;
  /** 对方账户名 */
  customerAccountName?: string;
  /** 对方银行 */
  customerBank?: string;
  /** 对方银行账号 */
  customerBankAccount?: string;
  /** 我方银行 */
  ourBank?: string;
  /** 我方银行账号 */
  ourBankAccount?: string;
  /** 到账金额 */
  receivedAmount?: number;
  /** 手续费 */
  serviceCharge?: number;
}

/** PaymentCollectionCancelClaimReq */
export interface PaymentCollectionCancelClaimReq {
  /**
   * 是否操作信用额度 0-不调整  1-调整
   * @format int32
   */
  adjustCreditLimit: number;
  /** 回款单编号 */
  code?: string;
}

/** PaymentCollectionClaimBaseBean */
export interface PaymentCollectionClaimBaseBean {
  /** 金额 */
  amount?: number;
  /** 回款单号 */
  code?: string;
  /** 币别 */
  currency?: string;
  /** 对方账户名 */
  customerAccountName?: string;
  /** 关联客户编码 */
  customerCode?: string;
  /** 关联客户名称 */
  customerName?: string;
  /** 发票号,多个单号之间逗号隔开 */
  invoiceNo?: string;
  /** 到账金额 */
  receivedAmount?: number;
  /** 已关联发票金额 */
  relatedInvoiceAmount?: number;
  /** 关联发票信息列表 */
  relatedInvoiceList?: RelatedInvoice[];
  /** 手续费 */
  serviceCharge?: number;
}

/** PaymentCollectionClaimReq */
export interface PaymentCollectionClaimReq {
  /** 认领的回款单编号列表 */
  codes?: string[];
}

/** PaymentCollectionClaimResp */
export interface PaymentCollectionClaimResp {
  /** 回款单信息列表 */
  baseBeanList?: PaymentCollectionClaimBaseBean[];
  /** 可关联发票金额 */
  unWriteOffAmount?: number;
}

/** PaymentCollectionDetailResp */
export interface PaymentCollectionDetailResp {
  /** 金额 */
  amount?: number;
  /** 单据编号 */
  code?: string;
  /**
   * 收款日期
   * @format date
   */
  collectionDate?: string;
  /** 开户组织 */
  collectionOrg?: string;
  /** 开户组织 */
  collectionOrgDesc?: string;
  /** 币别 */
  currency?: string;
  /** 对方账户名 */
  customerAccountName?: string;
  /** 对方银行 */
  customerBank?: string;
  /** 对方银行账号 */
  customerBankAccount?: string;
  /** 客户名称 */
  customerName?: string;
  /** 发票号 */
  invoiceNo?: string;
  /** 未关联发票金额 */
  notRelatedInvoiceAmount?: number;
  /** 我方银行 */
  ourBank?: string;
  /** 我方银行账号 */
  ourBankAccount?: string;
  /** 到账金额 */
  receivedAmount?: number;
  /** 已关联发票金额 */
  relatedInvoiceAmount?: number;
  /** 手续费 */
  serviceCharge?: number;
  /**
   * 状态: 0-待发布 1-待认领 2-认领客户 3-部分认领 4-全部认领
   * @format int32
   */
  status?: number;
  /** 状态: 0-待发布 1-待认领 2-认领客户 3-部分认领 4-全部认领 */
  statusDesc?: string;
}

/** PaymentCollectionLinkCustomerReq */
export interface PaymentCollectionLinkCustomerReq {
  /** 回款单信息列表 */
  claimBeans?: PaymentCollectionClaimBaseBean[];
}

/** PaymentCollectionListBean */
export interface PaymentCollectionListBean {
  /** 金额 */
  amount?: number;
  /** 单据编号 */
  code?: string;
  /**
   * 收款日期
   * @format date
   */
  collectionDate?: string;
  /** 收款组织 */
  collectionOrgDesc?: string;
  /** 币别 */
  currency?: string;
  /** 对方账户名 */
  customerAccountName?: string;
  /** 对方银行 */
  customerBank?: string;
  /** 对方银行账号 */
  customerBankAccount?: string;
  /** 客户编码 */
  customerCode?: string;
  /** 客户名称 */
  customerName?: string;
  /** 发票号 */
  invoiceNo?: string;
  /** 我方银行 */
  ourBank?: string;
  /** 我方银行账号 */
  ourBankAccount?: string;
  /** 到账金额 */
  receivedAmount?: number;
  /** 关联发票金额 */
  relatedInvoiceAmount?: number;
  /** 手续费 */
  serviceCharge?: number;
  /**
   * 状态: 0-待发布 1-待认领 2-认领客户 3-部分认领 4-全部认领
   * @format int32
   */
  status?: number;
  /** 状态: 0-待发布 1-待认领 2-认领客户 3-部分认领 4-全部认领 */
  statusDesc?: string;
}

/** PaymentCollectionListReq */
export interface PaymentCollectionListReq {
  /** 收款组织列表 */
  collectionOrgList?: string[];
  /** 币别 */
  currency?: string;
  /** 客户编码列表 */
  customerCodeList?: string[];
  /**
   * 收款日期结束时间
   * @format date
   */
  endDate?: string;
  /**
   * 金额过滤类型: 0-金额 1-已关联发票金额 2-未关联发票金额
   * @format int32
   */
  filterAmountType?: number;
  /** 关键字 */
  keyword?: string;
  /** 金额最大值 */
  maxAmount?: number;
  /** 金额最小值 */
  minAmount?: number;
  /** 我方银行账号列表 */
  ourBankAccountList?: string[];
  /**
   * 页数
   * @format int32
   * @min 1
   * @exclusiveMin false
   */
  pageNum?: number;
  /**
   * 每页数量
   * @format int32
   * @max 1000
   * @exclusiveMax false
   */
  pageSize?: number;
  /**
   * 收款日期开始时间
   * @format date
   */
  startDate?: string;
  /**
   * 状态: 0-待发布 1-待认领 2-认领客户 3-部分认领 4-全部认领
   * @format int32
   */
  status?: number;
}

/** PaymentCollectionListResp */
export interface PaymentCollectionListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 回款列表 */
  recordList?: PaymentCollectionListBean[];
  /** 关联发票统计 */
  relateInvoiceStatics?: RelateInvoiceStaticsResp;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** PaymentCollectionPublishReq */
export interface PaymentCollectionPublishReq {
  /** 单据编号 */
  code: string;
}

/** PaymentCollectionRelatedInvoiceReq */
export interface PaymentCollectionRelatedInvoiceReq {
  /**
   * 是否操作信用额度 0-不调整  1-调整
   * @format int32
   */
  adjustCreditLimit: number;
  /** 认领信息列表 */
  claimBeans?: PaymentCollectionClaimBaseBean[];
  /** 可关联发票金额 */
  unWriteOffAmount?: number;
}

/** PaymentCollectionSaveFeeReq */
export interface PaymentCollectionSaveFeeReq {
  /** 回款编号 */
  code?: string;
  /** 手续费 */
  fee?: number;
}

/** PaymentOrderBean */
export interface PaymentOrderBean {
  /** OA审批单号 */
  approvalCode?: string;
  /**
   * 完成审批日期
   * @format date
   */
  approvalDate?: string;
  /**
   * OA审批状态:0-已通过 1-未通过
   * @format int32
   */
  approvalStatus?: number;
  /** OA审批状态:0-已通过 1-未通过 */
  approvalStatusDesc?: string;
  /** 付款单号 */
  code?: string;
  /**
   * 主键
   * @format int64
   */
  id?: number;
  /**
   * 是否CBS付款:0-是 1-否
   * @format int32
   */
  isCbs?: number;
  /** 是否CBS付款:0-是 1-否 */
  isCbsDesc?: string;
  /**
   * 是否推送金蝶:0-未推送 1-推送成功 2-推送失败
   * @format int32
   */
  isPush?: number;
  /** 是否推送金蝶:0-未推送 1-推送成功 2-推送失败 */
  isPushDesc?: string;
  /** kingdee推送信息 */
  kingdeePushInfo?: BasicPushBean;
  /** 付款水单截图oss_key */
  ossKey?: string;
  /** 收款账户名称 */
  payeeAccountName?: string;
  /** 付款金额 */
  paymentAmount?: number;
  /** 付款币种 */
  paymentCurrency?: string;
  /**
   * 完成付款日期
   * @format date
   */
  paymentDate?: string;
  /** 付款组织 */
  paymentOrg?: string;
  /** 付款组织名称 */
  paymentOrgName?: string;
  /** 银行流水单号 */
  paymentSlipCode?: string;
  /** 付款水单截图 */
  paymentSlipUrl?: string;
  /** 申请人姓名 */
  proposer?: string;
  /** 申请人编码 */
  proposerCode?: string;
  /**
   * 付款状态:0-付款中 1-已付款 2-已作废
   * @format int32
   */
  status?: number;
  /** 付款状态:0-付款中 1-已付款 2-已作废 */
  statusDesc?: string;
  /**
   * 更新时间/单据更新日期
   * @format date-time
   */
  updateTime?: string;
  /** 审批单号 */
  workflowCode?: string;
}

/** PaymentOrderCodeReq */
export interface PaymentOrderCodeReq {
  /** 付款单号列表 */
  codeList: string[];
}

/** PaymentOrderDetailBean */
export interface PaymentOrderDetailBean {
  /** 广告账户 */
  advertisingAccount?: string;
  /**
   * 是否摊销:0-是 1-否
   * @format int32
   */
  amortized?: number;
  /** 是否摊销:0-是 1-否 */
  amortizedDesc?: string;
  /** OA审批单号 */
  approvalCode?: string;
  /**
   * 完成审批日期
   * @format date
   */
  approvalDate?: string;
  /**
   * OA审批状态:0-已通过 1-未通过
   * @format int32
   */
  approvalStatus?: number;
  /** OA审批状态:0-已通过 1-未通过 */
  approvalStatusDesc?: string;
  /** 单据类型 */
  billType?: string;
  /** 费用预算管理部门 */
  budgetDept?: string;
  /** 往来单位编码 */
  businessUnitCode?: string;
  /** 往来单位类型 */
  businessUnitType?: string;
  /** 付款单号 */
  code?: string;
  /** 企业编码 */
  companyCode?: string;
  /** 合同金额 */
  contractAmount?: number;
  /**
   * 合同结束时间
   * @format date
   */
  contractEndTime?: string;
  /**
   * 合同开始日期
   * @format date
   */
  contractStartDate?: string;
  /** 费用承担部门 */
  costBearingDept?: string;
  /** 国家 */
  country?: string;
  /** 摘要 */
  description?: string;
  /** 费用项目 */
  expenseItem?: string;
  /**
   * 是否首款:0-是 1-否
   * @format int32
   */
  firstPayment?: number;
  /** 是否首款:0-是 1-否 */
  firstPaymentDesc?: string;
  /** 资金用途 */
  fundUtilization?: string;
  /** 费用GTM归属品线 */
  gtm?: string;
  /**
   * 主键
   * @format int64
   */
  id?: number;
  /**
   * 是否CBS付款:0-是 1-否
   * @format int32
   */
  isCbs?: number;
  /** 是否CBS付款:0-是 1-否 */
  isCbsDesc?: string;
  /**
   * 是否推送金蝶:0-未推送 1-推送成功 2-推送失败
   * @format int32
   */
  isPush?: number;
  /** 是否推送金蝶:0-未推送 1-推送成功 2-推送失败 */
  isPushDesc?: string;
  /** 营销费用类型 */
  marketExpenseType?: string;
  /** 月结方式 */
  monthlySettlement?: string;
  /** 订单号 */
  orderNumber?: string;
  /** 付款水单截图oss_key */
  ossKey?: string;
  /** 收款账号 */
  payeeAccount?: string;
  /** 收款账户开户行 */
  payeeAccountBank?: string;
  /** 收款账户名称 */
  payeeAccountName?: string;
  /** 收款账户联行号 */
  payeeAccountNumber?: string;
  /** 收款单位编码 */
  payeeCode?: string;
  /** 收款单位类型 */
  payeeType?: string;
  /** 付款账号 */
  paymentAccount?: string;
  /** 付款金额 */
  paymentAmount?: number;
  /** 付款币种 */
  paymentCurrency?: string;
  /**
   * 完成付款日期
   * @format date
   */
  paymentDate?: string;
  /** 付款组织 */
  paymentOrg?: string;
  /** 付款组织名称 */
  paymentOrgName?: string;
  /** 银行流水单号 */
  paymentSlipCode?: string;
  /** 付款水单截图 */
  paymentSlipUrl?: string;
  /** 平台 */
  platform?: string;
  /** 推广产品 */
  promotionProduct?: string;
  /** 申请人 */
  proposer?: string;
  /** 申请人编码 */
  proposerCode?: string;
  /**
   * 数量
   * @format int32
   */
  quantity?: number;
  /** 发起退款类型 */
  refundType?: string;
  /** 备注 */
  remark?: string;
  /** 结算币种 */
  settlementCurrency?: string;
  /** 结算方式 */
  settlementMode?: string;
  /** 结算组织 */
  settlementOrg?: string;
  /** SPU名称 */
  spuName?: string;
  /**
   * 付款状态:0-付款中 1-已付款 2-已作废
   * @format int32
   */
  status?: number;
  /** 付款状态:0-付款中 1-已付款 2-已作废 */
  statusDesc?: string;
  /** 供应链SKU */
  supplyChainSku?: string;
  /** 三级类目 */
  thirdLevel?: string;
  /**
   * 更新时间/单据更新日期
   * @format date-time
   */
  updateTime?: string;
  /** 审批单号 */
  workflowCode?: string;
}

/** PaymentOrderDetailReq */
export interface PaymentOrderDetailReq {
  /** 付款单号 */
  code: string;
}

/** PaymentOrderDetailResp */
export interface PaymentOrderDetailResp {
  /** 付款单详情 */
  detailBean?: PaymentOrderDetailBean;
  /** 付款单操作日志 */
  logBeanList?: PaymentOrderLogBean[];
}

/** PaymentOrderListReq */
export interface PaymentOrderListReq {
  /** OA审批编号 */
  approvalCode?: string;
  /** 付款单号 */
  code?: string;
  /**
   * 日期类型:1-单据更新日期 2-完成审批日期 3-完成付款日期
   * @format int32
   */
  dateType?: number;
  /**
   * 结束时间
   * @format date
   */
  endTime?: string;
  /**
   * 是否CBS付款：0-是 1-否
   * @format int32
   */
  isCbs?: number;
  /** 搜索关键字 */
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
  /** 付款组织 */
  paymentOrg?: string[];
  /**
   * 推送金蝶状态：0-未推送 1-推送成功 2-推送失败
   * @format int32
   */
  pushStatus?: number;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /**
   * 搜索类型：1-申请人 2-收款账户名称
   * @format int32
   */
  searchType?: number;
  /**
   * 开始时间
   * @format date
   */
  startTime?: string;
  /**
   * 付款单状态：0-付款中 1-已付款 2-已作废
   * @format int32
   */
  status?: number;
}

/** PaymentOrderListResp */
export interface PaymentOrderListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 付款单列表 */
  recordList?: PaymentOrderBean[];
  /** 付款单统计信息 */
  statisticsInfo?: Statistics[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** PaymentOrderLogBean */
export interface PaymentOrderLogBean {
  /** 附件信息 */
  attachmentInfoList?: AttachmentInfo[];
  /** 头像 */
  avatar?: string;
  /** 企业编码 */
  companyCode?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 扩展信息 */
  extraInfo?: string;
  /**
   * 主键
   * @format int64
   */
  id?: number;
  /** 对象编码 */
  itemCode?: string;
  /** 对象内容 */
  itemContent?: string;
  /**
   * 对象状态
   * @format int32
   */
  itemStatus?: number;
  /** 对象类型 */
  itemType?: string;
  /** 模块类型 */
  moduleType?: string;
  /** 操作类型 */
  operationType?: string;
  /** 操作类型描述 */
  operationTypeDesc?: string;
  /** 操作人 */
  operator?: string;
  /** 操作人 */
  operatorName?: string;
  /** 备注 */
  remark?: string;
  /** 流水编号 */
  serialCode?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** PaymentOrderObsoleteResp */
export interface PaymentOrderObsoleteResp {
  /** 不能作废付款单号列表 */
  canntObsoleteCodeList?: string[];
  /** 作废付款单号列表 */
  obsoleteCodeList?: string[];
}

/** PlatformCompareBean */
export interface PlatformCompareBean {
  /** 平台 */
  platform?: string;
  /** 店铺对比列表 */
  shopCompareList?: ShopCompareBean[];
}

/** PlatformOrderBatchChangePushStatuReq */
export interface PlatformOrderBatchChangePushStatuReq {
  /** 解析记录编码 */
  analysisCodeList?: string[];
  /** 结算单号列表 */
  codes?: string[];
  /** 国家 */
  countryList?: string[];
  /** 关键字 结算单号、网上订单号 */
  keyword?: string;
  /** 是否标记推送成功 */
  markPushSuccess?: boolean;
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
  platformList?: string[];
  /** 推送状态: 0-未推送 1-上传中 2-已推送 3-推送失败 */
  pushStatusList?: number[];
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 单据类型: income_rule-结算单规则 payment_confirm_rule-回款单规则 instock-detail-平台入库明细 outstock-detail-平台出库明细 ending-inventory-平台期末库存 diff-inventory-平台库存差异 */
  ruleTypeList: string[];
  /**
   * 时间类型 1：结算时间 2：创建时间 3-推送时间
   * @format int32
   */
  searchTimeType?: number;
  /** 结算组织列表 */
  settlementOrganizationList?: string[];
  /** 店铺 */
  shopList?: string[];
  /**
   * 结束时间
   * @format date-time
   */
  typeEndTime?: string;
  /**
   * 开始时间
   * @format date-time
   */
  typeStartTime?: string;
}

/** PlatformOrderBatchDeletedReq */
export interface PlatformOrderBatchDeletedReq {
  /** 解析记录编码 */
  analysisCodeList?: string[];
  /** 编码列表 */
  codeList?: string[];
  /** 结算单号列表 */
  codes?: string[];
  /** 国家 */
  countryList?: string[];
  /** 关键字 结算单号、网上订单号 */
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
  /** 平台 */
  platformList?: string[];
  /** 推送状态: 0-未推送 1-上传中 2-已推送 3-推送失败 */
  pushStatusList?: number[];
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 单据类型: income_rule-结算单规则 payment_confirm_rule-回款单规则 instock-detail-平台入库明细 outstock-detail-平台出库明细 ending-inventory-平台期末库存 diff-inventory-平台库存差异 */
  ruleTypeList: string[];
  /**
   * 时间类型 1：结算时间 2：创建时间 3-推送时间
   * @format int32
   */
  searchTimeType?: number;
  /** 结算组织列表 */
  settlementOrganizationList?: string[];
  /** 店铺 */
  shopList?: string[];
  /**
   * 结束时间
   * @format date-time
   */
  typeEndTime?: string;
  /**
   * 开始时间
   * @format date-time
   */
  typeStartTime?: string;
}

/** PlatformOrderBatchPushReq */
export interface PlatformOrderBatchPushReq {
  /** 解析记录编码 */
  analysisCodeList?: string[];
  /** 结算单号列表 */
  codes?: string[];
  /** 国家 */
  countryList?: string[];
  /** 关键字 结算单号、网上订单号 */
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
  /** 平台 */
  platformList?: string[];
  /** 推送状态: 0-未推送 1-上传中 2-已推送 3-推送失败 */
  pushStatusList?: number[];
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 单据类型: income_rule-结算单规则 payment_confirm_rule-回款单规则 instock-detail-平台入库明细 outstock-detail-平台出库明细 ending-inventory-平台期末库存 diff-inventory-平台库存差异 */
  ruleTypeList: string[];
  /**
   * 时间类型 1：结算时间 2：创建时间 3-推送时间
   * @format int32
   */
  searchTimeType?: number;
  /** 结算组织列表 */
  settlementOrganizationList?: string[];
  /** 店铺 */
  shopList?: string[];
  /**
   * 推送类型 0-推送所有 1-按筛选条件推送 2-推送失败数据 3-推送未推送数据 4-推送失败+未推送
   * @format int32
   */
  type?: number;
  /**
   * 结束时间
   * @format date-time
   */
  typeEndTime?: string;
  /**
   * 开始时间
   * @format date-time
   */
  typeStartTime?: string;
}

/** PlatformOrderDetailHeaderReq */
export interface PlatformOrderDetailHeaderReq {
  /** 单据类型: instock-detail(平台入库明细) outstock-detail(平台出库明细) ending-inventory(平台期末库存) diff-inventory(平台库存差异) */
  type: string;
}

/** PlatformOrderDetailHeaderResp */
export interface PlatformOrderDetailHeaderResp {
  /** 单据明细头列表 */
  detailHeaders?: DetailHeader[];
  /** 单据类型 */
  orderType?: string;
}

/** PlatformOrderItemListReq */
export interface PlatformOrderItemListReq {
  /** 单号 */
  codeList?: string[];
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

/** PlatformOrderItemListResp */
export interface PlatformOrderItemListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 记录列表 */
  recordList?: PlatformOrderItemResp[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** PlatformOrderItemResp */
export interface PlatformOrderItemResp {
  /** 结算单号 */
  code?: string;
  /** 国家 */
  country?: string;
  /** @format int64 */
  id?: number;
  /** 明细备注 */
  itemRemark?: string;
  /** msku */
  msku?: string;
  /**
   * 单据时间
   * @format date
   */
  orderTime?: string;
  /** 结算组织 */
  orgName?: string;
  /** 平台 */
  platform?: string;
  /** 平台单号 */
  platformCode?: string;
  /** 供应链SKU */
  productSku?: string;
  /**
   * 数量
   * @format int32
   */
  qty?: number;
  /** 备注 */
  remark?: string;
  /** 店铺 */
  shop?: string;
  /** SKU */
  sku?: string;
  /** 产品SKU */
  skuCode?: string;
  /** 单据类型 */
  type?: string;
  /** 单据类型描述 */
  typeDesc?: string;
}

/** PlatformOrderListReq */
export interface PlatformOrderListReq {
  /** 解析记录编码 */
  analysisCodeList?: string[];
  /** 结算单号列表 */
  codes?: string[];
  /** 国家 */
  countryList?: string[];
  /** 关键字 结算单号、网上订单号 */
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
  /** 平台 */
  platformList?: string[];
  /** 推送状态: 0-未推送 1-上传中 2-已推送 3-推送失败 */
  pushStatusList?: number[];
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 单据类型: income_rule-结算单规则 payment_confirm_rule-回款单规则 instock-detail-平台入库明细 outstock-detail-平台出库明细 ending-inventory-平台期末库存 diff-inventory-平台库存差异 */
  ruleTypeList: string[];
  /**
   * 时间类型 1：结算时间 2：创建时间 3-推送时间
   * @format int32
   */
  searchTimeType?: number;
  /** 结算组织列表 */
  settlementOrganizationList?: string[];
  /** 店铺 */
  shopList?: string[];
  /**
   * 结束时间
   * @format date-time
   */
  typeEndTime?: string;
  /**
   * 开始时间
   * @format date-time
   */
  typeStartTime?: string;
}

/** PlatformOrderListResp */
export interface PlatformOrderListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  recordList?: PlatformOrderListRespItem[];
  statistics?: PlatformOrderListRespStatistics;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** PlatformOrderListRespItem */
export interface PlatformOrderListRespItem {
  /** 解析任务编号 */
  analysisCode?: string;
  /** 推送批次号，如果不为空则为批次推送快照，如果为空则是列表展示的最新数据 */
  batchNo?: string;
  /** 结算单号 */
  code?: string;
  /** 国家 */
  country?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /** 创建人编码 */
  creatorDesc?: string;
  /** 失败信息 */
  errorRemark?: string;
  /**
   * 单据时间
   * @format date
   */
  orderTime?: string;
  /** 结算组织 */
  orgName?: string;
  /** 平台 */
  platform?: string;
  /** 平台单号 */
  platformCode?: string;
  /** 推送信息 */
  pushInfo?: string;
  /**
   * 推送状态: 0-未推送 1-上传中 2-已推送 3-推送失败
   * @format int32
   */
  pushStatus?: number;
  /** 推送状态描述 */
  pushStatusDesc?: string;
  /**
   * 推送时间
   * @format date-time
   */
  pushTime?: string;
  /** 备注 */
  remark?: string;
  /** 执行的规则编码 */
  ruleCode?: string;
  /** 执行规则店铺号 */
  ruleShopCode?: string;
  /** 店铺 */
  shop?: string;
  /** 单据类型 */
  type?: string;
  /** 单据类型描述 */
  typeDesc?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /** 更新者 */
  updater?: string;
  /** 更新人编码 */
  updaterDesc?: string;
}

/** PlatformOrderListRespStatistics */
export interface PlatformOrderListRespStatistics {
  /** @format int32 */
  allCount?: number;
  /** @format int32 */
  pushFailCount?: number;
  /** @format int32 */
  pushIngCount?: number;
  /** @format int32 */
  pushSuccessCount?: number;
  /** @format int32 */
  waitPushCount?: number;
}

/** PlatformOrderPushBatchListResp */
export interface PlatformOrderPushBatchListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  recordList?: PlatformOrderPushBatchListRespItem[];
  statistics?: PlatformOrderPushBatchListRespStatistics;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** PlatformOrderPushBatchListRespItem */
export interface PlatformOrderPushBatchListRespItem {
  /** 推送批次号，如果不为空则为批次推送快照，如果为空则是列表展示的最新数据 */
  batchNo?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /** 创建人编码 */
  creatorDesc?: string;
  /**
   * 失败数量
   * @format int32
   */
  failCount?: number;
  /**
   * 完成时间
   * @format date-time
   */
  finishTime?: string;
  /**
   * 已处理数量
   * @format int32
   */
  pushCount?: number;
  /** 推送备注 */
  pushRemark?: string;
  /** 剩余时间 */
  remainingTime?: string;
  /**
   * 状态 1-进行中 2-已完成 3-失败
   * @format int32
   */
  status?: number;
  /**
   * 成功数量
   * @format int32
   */
  successCount?: number;
  /**
   * 总数量
   * @format int32
   */
  totalCount?: number;
  /**
   * 推送类型 0-推送所有 1-按筛选条件推送 2-推送失败数据 3-推送未推送数据 4-推送失败+未推送
   * @format int32
   */
  type?: number;
  /** 推送类型 0-推送所有 1-按筛选条件推送 2-推送失败数据 3-推送未推送数据 4-推送失败+未推送 */
  typeDesc?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /** 更新者 */
  updater?: string;
  /** 更新人编码 */
  updaterDesc?: string;
  /** 推送耗时 */
  useTime?: string;
}

/** PlatformOrderPushBatchListRespStatistics */
export interface PlatformOrderPushBatchListRespStatistics {
  /** @format int32 */
  allCount?: number;
  /** @format int32 */
  pushFailCount?: number;
  /** @format int32 */
  pushIngCount?: number;
  /** @format int32 */
  pushSuccessCount?: number;
  /** @format int32 */
  waitPushCount?: number;
}

/** PlatformOrderResultMappingBean */
export interface PlatformOrderResultMappingBean {
  /** 编码 */
  code?: string;
  /** 字段编码 */
  fieldCode?: string;
  /** 字段名称 */
  fieldName?: string;
  /** 名称 */
  name?: string;
  /**
   * 排序
   * @format int32
   */
  sort?: number;
}

/** PlatformOrderResultMappingResp */
export interface PlatformOrderResultMappingResp {
  /** 结果映射列表 */
  resultMappingList?: Record<string, PlatformOrderResultMappingBean[]>;
}

/** PretreatmentRuleAllDetailBean */
export interface PretreatmentRuleAllDetailBean {
  /** 解析规则编码列表 */
  analysisRuleCodeList?: string[];
  /** 条件公式 */
  conditionFormula?: string;
  /** 条件组编码 */
  conditionGroupCode?: string;
  /**
   * 数据来源 0-共享盘 1-数据库
   * @format int32
   */
  dataSource?: number;
  /** 数据来源描述 */
  dataSourceDesc?: string;
  /** 文件类型 1-主文件(结算文件)；2-信息文件一；3-信息文件二 0-全部文件类型 */
  fileType?: number[];
  /** 文件类型描述 */
  fileTypeDesc?: string;
  /**
   * 主键
   * @format int64
   */
  id?: number;
  /** 条件组 */
  incomeRuleConditionBeans?: IncomeRuleConditionBean[];
  /**
   * 行号
   * @format int32
   */
  lineNum?: number;
  /** 平台 */
  platform?: string;
  /** 执行步骤 */
  pretreatmentRuleDbDetailExeBeans?: PretreatmentRuleDbDetailExeBean[];
  /** 规则编码 */
  ruleCode?: string;
  /** 行编码 */
  ruleDetailCode?: string;
  /** 店铺 */
  shop?: string;
}

/** PretreatmentRuleDbDetailBean */
export interface PretreatmentRuleDbDetailBean {
  /**
   * id
   * @format int64
   */
  id?: number;
  /** 行明细 */
  pretreatmentRuleAllDetailBeans?: PretreatmentRuleAllDetailBean[];
  /** 备注 */
  remark?: string;
  /** 规则编码 */
  ruleCode?: string;
  /** 规则类型 1-收入规则  */
  type?: string;
}

/** PretreatmentRuleDbDetailExeBean */
export interface PretreatmentRuleDbDetailExeBean {
  /** 字符截断-字符 */
  cutChar?: string;
  /** 字符截断-序号 */
  cutIndex?: string;
  /**
   * 裁剪类型:11-位数截取  12-字符截断
   * @format int32
   */
  cutType?: number;
  /** 执行表达式 */
  exeFormula?: string;
  /** 执行表达式(前端展示) */
  exeFormulaShow?: string;
  /**
   * 主键
   * @format int64
   */
  id?: number;
  /**
   * 行号
   * @format int32
   */
  lineNum?: number;
  /** 新列名 */
  newColumn?: string;
  /** 替换列 */
  replaceColumn?: string;
  /** 替换内容 */
  replaceContent?: string;
  /** 替换范围:全文替换-all 按列字段-column */
  replaceRange?: string;
  /** 替换范围描述 */
  replaceRangeDesc?: string;
  /** 查找内容 */
  replaceSearchContent?: string;
  /** 汇总列 */
  rowSumFields?: string[];
  /** 汇总依据列 */
  rowSumGroupFields?: string[];
  /** 规则编码 */
  ruleCode?: string;
  /** 规则店铺记录编码 */
  ruleDetailCode?: string;
  /** 存储方式: new-column-新列 overwrite-column-覆盖列 */
  storageMode?: string;
  /** 存储方式描述 */
  storageModeDesc?: string;
  /** 截取字段 */
  subColumn?: string;
  /** 截取字段结束位置 */
  subColumnEndIndex?: string;
  /** 截取字段开始位置 */
  subColumnStartIndex?: string;
  /** 执行类型: REPLACE-替换 CUT-裁剪 ROW-SUM-行汇总 */
  type?: string;
  /** 执行类型描述 */
  typeDesc?: string;
}

/** PretreatmentRuleDetailBean */
export interface PretreatmentRuleDetailBean {
  /** 解析规则编码列表 */
  analysisRuleCodeList?: string[];
  /** 条件公式 */
  conditionFormula?: string;
  /** 条件组编码 */
  conditionGroupCode?: string;
  /**
   * 数据来源 0-共享盘 1-数据库
   * @format int32
   */
  dataSource?: number;
  /** 数据来源描述 */
  dataSourceDesc?: string;
  /** 文件类型 1-主文件(结算文件)；2-信息文件一；3-信息文件二 0-全部文件类型 */
  fileType?: number[];
  /** 文件类型描述 */
  fileTypeDesc?: string;
  /**
   * 主键
   * @format int64
   */
  id?: number;
  /**
   * 行号
   * @format int32
   */
  lineNum?: number;
  /** 平台 */
  platform?: string;
  /** 规则编码 */
  ruleCode?: string;
  /** 行编码 */
  ruleDetailCode?: string;
  /** 店铺 */
  shop?: string;
}

/** PretreatmentRuleExeReq */
export interface PretreatmentRuleExeReq {
  /** 当前时间 */
  nowTime?: string;
  /** 规则编码 */
  ruleDetailCode?: string;
}

/** PretreatmentRuleListItem */
export interface PretreatmentRuleListItem {
  /** 子项列表 */
  detailList?: PretreatmentRuleDetailBean[];
  /** 平台 */
  platform?: string;
  /** 备注 */
  remark?: string;
  /** 规则编码 */
  ruleCode?: string;
  /**
   * 状态: 0-禁用 1-启用
   * @format int32
   */
  status?: number;
  /** 状态描述 */
  statusDesc?: string;
  /** 规则类型 */
  type?: string;
  /** 规则类型描述 */
  typeDesc?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /** 更新人 */
  updateUser?: string;
}

/** PretreatmentRuleListReq */
export interface PretreatmentRuleListReq {
  /**
   * 更新时间-结束时间(yyyy-MM-dd)
   * @format date
   */
  endDate?: string;
  /** 关键词: 规则识别码,备注 */
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
  /** 平台 */
  platformList?: string[];
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 规则类型: income_rule-收入结算单 payment_confirm_rule-回款单 instock-detail-平台入库明细 outstock-detail-平台出库明细 ending-inventory-平台期末库存 diff-inventory-平台库存差异 overseas_amos_outbound-海外AMOS出库 overseas_gc_outbound-海外谷仓出库 overseas_yc_outbound-海外元仓出库 fba_multi_channel_deliver-FBA多渠道发货 fba_remove_order_sales_return-移除订单退货 */
  ruleTypes: string[];
  /** 店铺列表 */
  shopList?: string[];
  /**
   * 更新时间-开始时间(yyyy-MM-dd)
   * @format date
   */
  startDate?: string;
  /** 状态 */
  statusList?: number[];
  /** 更新人 */
  updater?: string[];
}

/** PretreatmentRuleListResp */
export interface PretreatmentRuleListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 数据列表 */
  recordList?: PretreatmentRuleListItem[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** ProductListQueryResp */
export interface ProductListQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 产品列表 */
  productList?: BasicProductBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
  /**
   * 总的未关联金蝶编码数量
   * @format int32
   */
  totalNotRelateNum?: number;
  /**
   * 总的关联金蝶编码数量
   * @format int32
   */
  totalRelateNum?: number;
}

/** PurchaseInStockDetailInfo */
export interface PurchaseInStockDetailInfo {
  /**
   * 创建时间
   * @format date-time
   * @example "2025-11-16T10:00:00"
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /** 创建人 */
  creatorCode?: string;
  /** 是否赠品 */
  freeDesc?: string;
  /** @format int64 */
  id?: number;
  /**
   * 采购入库单号
   * @example "INB20251116001"
   */
  inboundCode?: string;
  /**
   * 行号
   * @example 1
   */
  lineNumber?: string;
  /**
   * 未税金额
   * @example 45000
   */
  netAmount?: number;
  /**
   * 未税单价
   * @example 4500
   */
  netPrice?: number;
  /**
   * 采购订单行号
   * @example 1
   */
  poLineNumber?: string;
  /**
   * 含税单价
   * @example 5175
   */
  price?: number;
  /**
   * 产品名称
   * @example "台式电脑"
   */
  productName?: string;
  /**
   * 采购入库量（入库良品+入库次品）
   * @example 22
   */
  purchaseInboundQuantity?: number;
  /**
   * 入库次品数量
   * @example 2
   */
  shelvedDefectiveQuantity?: number;
  /**
   * 入库良品数量
   * @example 20
   */
  shelvedGoodQuantity?: number;
  /**
   * 上架时间
   * @example "2025-11-16T14:30:00"
   */
  shelvingTime?: string;
  /**
   * 产品SKU
   * @example "SKU-002"
   */
  skuCode?: string;
  /**
   * 供应链SKU
   * @example "SUP-SKU-002"
   */
  supplySku?: string;
  /**
   * 含税金额
   * @example 51750
   */
  taxAmount?: number;
  /**
   * 税率
   * @example 13
   */
  taxRate?: number;
}

/** PurchaseInStockDetailResp */
export interface PurchaseInStockDetailResp {
  /** kingdee推送信息 */
  kingdeePushInfo?: BasicPushBean;
  /** 采购入库单信息 */
  purchaseInStockDetailInfos?: PurchaseInStockDetailInfo[];
  /** 采购订单信息 */
  purchaseOrderBaseInfo?: PurchaseOrderBaseInfo;
  /** 采购订单信息 */
  purchaseOrderDetailResp?: PurchaseOrderDetailResp;
}

/** PurchaseListReq */
export interface PurchaseListReq {
  /** 创建时间 */
  createEndDate?: string;
  /** 创建时间 */
  createStartDate?: string;
  /** 创建人 */
  creatorName?: string;
  /** kingdee推送状态 状态: 0-未推送 1-推送成功 2-推送失败 3-推送中 */
  kingdeePushStatus?: number[];
  /** 订单编号 */
  orderCodes?: string[];
  /** 订单状态 */
  orderStatuss?: string[];
  /** 类型:purchase_order-采购订单 purchase_in_stock-采购入库单 purchase_return-采购退货单 */
  orderTypes?: string[];
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
  /** 采购组织 */
  purchaseOrgName?: string;
  /** 采购仓库 */
  purchaseWarehouseName?: string;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 产品sku */
  skuCode?: string;
  /** 供应商 */
  supplierName?: string;
}

/** PurchaseListResp */
export interface PurchaseListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 采购列表 */
  recordList?: PurchaseListRespItem[];
  /** 关联系统统计 */
  relateSystemStatics?: RelateSystemStaticsResp;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** PurchaseListRespItem */
export interface PurchaseListRespItem {
  /** 创建人 */
  creator?: string;
  /** 创建人 */
  creatorCode?: string;
  /** kingdee推送信息 */
  kingdeePushBean?: BasicPushBean;
  /** 订单编号 */
  orderCode?: string;
  /** 创建时间 */
  orderDate?: string;
  /**
   * 订单状态
   * @format int32
   * @example "已审核"
   */
  orderStatus?: number;
  /** 订单状态 */
  orderStatusDesc?: string;
  /** 类型:purchase_order-采购订单 purchase_in_stock-采购入库单 purchase_return-采购退货单 */
  orderType?: string;
  /** 类型描述 */
  orderTypeDesc?: string;
  /** 采购组织 */
  purchaseOrgCode?: string;
  /** 采购组织 */
  purchaseOrgName?: string;
  /** 采购仓库 */
  purchaseWarehouseCode?: string;
  /** 采购仓库 */
  purchaseWarehouseName?: string;
  /** SKU列表 */
  skuList?: PurchaseListRespSkuItem[];
  /** 供应商 */
  supplierCode?: string;
  /** 供应商 */
  supplierName?: string;
}

/** PurchaseListRespSkuItem */
export interface PurchaseListRespSkuItem {
  /** 行号 */
  lineNumber?: string;
  /** 供应链SKU */
  productSku?: string;
  /** 供应链SKU名称 */
  productSkuName?: string;
  /** 产品SKU */
  skuCode?: string;
  /** 产品SKU名称 */
  skuName?: string;
}

/** PurchaseOrderBaseInfo */
export interface PurchaseOrderBaseInfo {
  /**
   * 结算方式
   * @format int32
   * @example "电汇"
   */
  accountType?: number;
  /** 结算方式 */
  accountTypeDesc?: string;
  /** 创建人 */
  creator?: string;
  /** 创建人 */
  creatorCode?: string;
  /** 币种 */
  currency?: string;
  /** 送货单号 */
  deliveryCode?: string;
  /**
   * 发货类型
   * @format int32
   * @example "快递"
   */
  deliveryType?: number;
  /** 发货类型 */
  deliveryTypeDesc?: string;
  /** kingdee推送信息 */
  kingdeeWarehousePushRecord?: BillPushRecord;
  /** 订单编号 */
  orderCode?: string;
  /**
   * 订单日期
   * @example "2025-11-16T10:00:00"
   */
  orderDate?: string;
  /**
   * 订单状态
   * @format int32
   * @example "已审核"
   */
  orderStatus?: number;
  /** 订单状态 */
  orderStatusDesc?: string;
  /** 类型:purchase_order-采购订单 purchase_in_stock-采购入库单 purchase_return-采购退货单 */
  orderType?: string;
  /** 类型描述 */
  orderTypeDesc?: string;
  /** 出库单号 */
  outStockCode?: string;
  /**
   * 付款条件
   * @example "月结30天"
   */
  paymentClause?: string;
  /** 付款条件 */
  paymentClauseDesc?: string;
  /** 采购订单编号 */
  poCode?: string;
  /** 采购方名称 */
  purchaseName?: string;
  /** 采购组织 */
  purchaseOrgCode?: string;
  /** 采购组织 */
  purchaseOrgName?: string;
  /** 需方备注 */
  purchaseRemark?: string;
  /** 采购仓库 */
  purchaseWarehouseCode?: string;
  /** 采购仓库 */
  purchaseWarehouseName?: string;
  /** 收货单号 */
  receiveCode?: string;
  /**
   * 退货时间
   * @format date-time
   * @example "2025-11-16T10:00:00"
   */
  refundsDeliveryTime?: string;
  /** 退货原因 */
  refundsReason?: string;
  /**
   * 来源单类型
   * @example "purchase_order-采购订单"
   */
  sourceOrderType?: string;
  /** 来源单类型 */
  sourceOrderTypeDesc?: string;
  /** 供应商 */
  supplierCode?: string;
  /** 供应商 */
  supplierName?: string;
  /** 供方备注 */
  supplierRemark?: string;
}

/** PurchaseOrderBatchChangePushStatusReq */
export interface PurchaseOrderBatchChangePushStatusReq {
  /** 编码列表 */
  codeList?: string[];
  /** 是否标记推送成功 */
  markPushSuccess?: boolean;
}

/** PurchaseOrderDetailInfo */
export interface PurchaseOrderDetailInfo {
  /**
   * 创建时间
   * @format date-time
   * @example "2025-11-16T10:00:00"
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /** 创建人 */
  creatorCode?: string;
  /**
   * 币种
   * @example "CNY"
   */
  currency?: string;
  /** 是否赠品 */
  freeDesc?: string;
  /**
   * 订单行号
   * @format int32
   * @example 1
   */
  itemNumber?: number;
  /**
   * 物料名称
   * @example "笔记本电脑"
   */
  materialName?: string;
  /**
   * 未税金额
   * @example 45000
   */
  netAmount?: number;
  /**
   * 未税单价
   * @example 4500
   */
  netPrice?: number;
  /**
   * 订单号
   * @example "PO20251116001"
   */
  poCode?: string;
  /**
   * 含税单价
   * @example 5175
   */
  price?: number;
  /**
   * 产品SKU
   * @example "SKU-001"
   */
  productSku?: string;
  /**
   * 采购单位
   * @example "台"
   */
  purchaseUnit?: string;
  /**
   * 采购单位名称
   * @example "台"
   */
  purchaseUnitName?: string;
  /**
   * 数量
   * @format int32
   * @example 10
   */
  qty?: number;
  /**
   * 交期
   * @format date-time
   * @example "2025-11-30T00:00:00"
   */
  requireDate?: string;
  /**
   * 供应链SKU
   * @example "SUP-SKU-001"
   */
  supplySku?: string;
  /**
   * 含税金额
   * @example 51750
   */
  taxAmount?: number;
  /**
   * 税率
   * @example 15
   */
  taxRate?: number;
}

/** PurchaseOrderDetailResp */
export interface PurchaseOrderDetailResp {
  /** kingdee推送信息 */
  kingdeePushInfo?: BasicPushBean;
  /** 采购订单信息 */
  purchaseOrderBaseInfo?: PurchaseOrderBaseInfo;
  /** 采购订单行信息 */
  purchaseOrderDetailInfos?: PurchaseOrderDetailInfo[];
}

/** PurchaseRefundDetailInfo */
export interface PurchaseRefundDetailInfo {
  /**
   * 创建时间
   * @format date-time
   * @example "2025-11-16T10:00:00"
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /** 创建人 */
  creatorCode?: string;
  /**
   * 币别
   * @example "CNY"
   */
  currency?: string;
  /** 是否赠品 */
  freeDesc?: string;
  /** @format int64 */
  id?: number;
  /**
   * 行号
   * @format int32
   * @example 1
   */
  itemNumber?: number;
  /**
   * 行状态
   * @example "已确认"
   */
  itemStatus?: string;
  /**
   * 物料名称
   * @example "激光打印机"
   */
  materialName?: string;
  /**
   * 物料编码
   * @example "MAT003"
   */
  materialNumber?: string;
  /**
   * 净价（未税单价）
   * @example 1061.95
   */
  netPrice?: number;
  /**
   * 采购单行号
   * @format int32
   * @example 2
   */
  orderItemNumber?: number;
  /**
   * 采购单号
   * @example "PO20251115002"
   */
  orderNumber?: string;
  /**
   * 含税单价
   * @example 1200
   */
  price?: number;
  /**
   * 产品名称
   * @example "打印机"
   */
  productName?: string;
  /**
   * 产品SKU
   * @example "SKU-003"
   */
  productSku?: string;
  /**
   * 未税金额
   * @example 45000
   */
  purchaseNetAmount?: number;
  /**
   * 未税单价
   * @example 4500
   */
  purchaseNetPrice?: number;
  /**
   * 含税金额
   * @example 51750
   */
  purchaseTaxAmount?: number;
  /**
   * 订单数量
   * @example 5
   */
  quantity?: number;
  /**
   * 收货数量
   * @example 5
   */
  receiveQuantity?: number;
  /**
   * 退货日期
   * @format date-time
   * @example "2025-11-16T16:00:00"
   */
  refundsDate?: string;
  /**
   * 退货次品数量
   * @example 5
   */
  refundsDefectiveQuantity?: number;
  /**
   * 退货单号
   * @example "REF20251116001"
   */
  refundsDeliveryCode?: string;
  /**
   * 退货方式
   * @example "物流自提"
   */
  refundsDeliveryWay?: string;
  refundsDeliveryWayDesc?: string;
  /**
   * 退货良品数量
   * @example 5
   */
  refundsGoodQuantity?: number;
  /**
   * 退货数量
   * @example 5
   */
  refundsQuantity?: number;
  /**
   * 库存地点代码
   * @example "LOC001"
   */
  storageLocation?: string;
  /**
   * 供应链SKU
   * @example "SUP-SKU-003"
   */
  supplySku?: string;
  /**
   * 退货金额（含税）
   * @example 6780
   */
  taxAmount?: number;
  /**
   * 税率
   * @example 13
   */
  taxRate?: number;
  /**
   * 收货凭证行号
   * @example 1
   */
  voucherItemNumber?: string;
  /**
   * 收货凭证单号
   * @example "RECV20251116001"
   */
  voucherNumber?: string;
}

/** PurchaseRefundDetailResp */
export interface PurchaseRefundDetailResp {
  /** kingdee推送信息 */
  kingdeePushInfo?: BasicPushBean;
  /** 采购订单信息 */
  purchaseOrderBaseInfo?: PurchaseOrderBaseInfo;
  /** 采购退货单信息 */
  purchaseRefundDetailInfos?: PurchaseRefundDetailInfo[];
}

/** RecOrderListQueryReq */
export interface RecOrderListQueryReq {
  /** @format int32 */
  billType?: number;
  /**
   * 比较符: 0-不等于 1-大于 2-等于 3-小于 4-大于等于 5-小于等于
   * @format int32
   */
  compareType?: number;
  /** 比较值 */
  compareValue?: number;
  /**
   * 差异类型: 0-未税差异 1-税额差异
   * @format int32
   */
  diffType?: number;
  /**
   * 分贝通推送状态: 0-未推送 1-推送成功 2-推送失败
   * @format int32
   */
  fbtPushStatus?: number;
  /**
   * 分贝通关联状态: 0-未关联 1-已关联
   * @format int32
   */
  fbtRelateStatus?: number;
  /** 关键字 */
  keyword?: string;
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
  /**
   * 金蝶推送状态: 0-未推送 1-推送成功 2-推送失败
   * @format int32
   */
  pushStatus?: number;
  /**
   * 金蝶关联状态: 0-未关联 1-已关联
   * @format int32
   */
  relateStatus?: number;
  /**
   * 时间类型 1：付款申请通过时间 2：发票确认时间;默认1
   * @format int32
   */
  searchTimeType?: number;
  /**
   * 结束时间
   * @format date-time
   */
  typeEndTime?: string;
  /**
   * 开始时间
   * @format date-time
   */
  typeStartTime?: string;
}

/** RecOrderListQueryResp */
export interface RecOrderListQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 对账单列表 */
  recOrderList?: BasicRecOrderBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
  /**
   * 总的未推送数量
   * @format int32
   */
  totalNotPushNum?: number;
  /**
   * 总的推送失败数量
   * @format int32
   */
  totalPushFailNum?: number;
  /**
   * 总的推送成功数量
   * @format int32
   */
  totalPushSuccessNum?: number;
}

/** RecOrderListUpdateTimeReq */
export interface RecOrderListUpdateTimeReq {
  /** 发票确认时间 */
  approveTime?: string;
  /** 发票代码 */
  codes?: string[];
}

/** RecOrderQueryResp */
export interface RecOrderQueryResp {
  /** 公司代码 */
  companyCode?: string;
  /** 公司名称 */
  companyName?: string;
  /** 成本调整单编号 */
  costAdjustBillNo?: string;
  /** 币别 */
  currencyCode?: string;
  /** 未税差异(发票未税金额-上架未税金额-附加费未税金额+票扣未税金额) */
  diffNetAmount?: number;
  /** 税额差异(发票税额-对账单税额) */
  diffTaxAmount?: number;
  /** 失败原因 */
  failReason?: string;
  /** 采购发票编号 */
  invoiceBillNo?: string;
  /**
   * 发票确认时间
   * @format date-time
   */
  invoiceConfirmTime?: string;
  /** 发票含税金额 */
  invoiceIncludeTaxAmount?: number;
  /** 发票未税金额 */
  invoiceNetAmount?: number;
  /** 发票税额 */
  invoiceTaxAmount?: number;
  /** 附加费用未税金额 */
  kingdeeAdditionFeeNetAmount?: number;
  /** 附加费用税额 */
  kingdeeAdditionFeeTaxAmount?: number;
  /** 票扣未税金额 */
  kingdeePkNetAmount?: number;
  /** 票扣费用税额 */
  kingdeePkTaxAmount?: number;
  /** 上架未税金额 */
  kingdeeShelfNetAmount?: number;
  /** 上架税额 */
  kingdeeShelfTaxAmount?: number;
  /** 账扣未税金额 */
  kingdeeZkNetAmount?: number;
  /** 账扣费用税额 */
  kingdeeZkTaxAmount?: number;
  /** 应付调整单编号 */
  payableAdjustBillNo?: string;
  /**
   * 付款申请通过时间
   * @format date-time
   */
  paymentApprovaledTime?: string;
  /**
   * 推送状态
   * @format int32
   */
  pushStatus?: number;
  /** 推送状态描述 */
  pushStatusDesc?: string;
  /** 对账单含税金额 */
  recIncludeTaxAmount?: number;
  /** 对账单未税金额(上架未税金额+附加费未税金额-票扣未税金额) */
  recNetAmount?: number;
  /** 对账单税额(上架未税税额+附加费税额-票扣税额) */
  recTaxAmount?: number;
  /** SRM对账单号 */
  srmRecBillNo?: string;
  /** 供应商编码 */
  supplierCode?: string;
  /** 供应商名称 */
  supplierName?: string;
}

/** ReceiptConditionBean */
export interface ReceiptConditionBean {
  /** 收款条件编码 */
  code?: string;
  /**
   * 主键id
   * @format int64
   */
  id?: number;
  /** 收款条件名称 */
  name?: string;
  /**
   * 结算方式: 0-账期 1-款到发货 2-货到付款 3-阿里结算
   * @format int32
   */
  settlementMethod?: number;
  /** 结算方式描述 */
  settlementMethodDesc?: string;
  /**
   * 结算周期（天）
   * @format int32
   */
  settlementPeriod?: number;
  /**
   * 状态: 0-禁用 1-启用
   * @format int32
   */
  status?: number;
  /** 状态描述 */
  statusDesc?: string;
}

/** ReceiptConditionDetailReq */
export interface ReceiptConditionDetailReq {
  /**
   * 结算方式: 0-账期 1-款到发货 2-货到付款 3-阿里结算
   * @format int32
   */
  settlementMethod?: number;
  /**
   * 结算周期（天）
   * @format int32
   */
  settlementPeriod?: number;
}

/** ReceiptConditionListReq */
export interface ReceiptConditionListReq {
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
  /**
   * 状态: 0-禁用 1-启用
   * @format int32
   */
  status?: number;
}

/** ReceiptConditionListResp */
export interface ReceiptConditionListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 收款条件列表 */
  receiptConditionList?: ReceiptConditionBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** ReceiptConditionUpdateStatusReq */
export interface ReceiptConditionUpdateStatusReq {
  /** 收款条件编码 */
  code?: string;
  /**
   * 状态: 0-禁用 1-启用
   * @format int32
   */
  status?: number;
}

/** ReimbursementOrLoan */
export interface ReimbursementOrLoan {
  code?: string;
  id?: string;
}

/** RelateInvoiceStaticsResp */
export interface RelateInvoiceStaticsResp {
  /**
   * 总的未关联发票数量
   * @format int32
   */
  totalNotRelateInvoiceNum?: number;
  /**
   * 总的仅关联客户数量
   * @format int32
   */
  totalOnlyRelateCustomerNum?: number;
  /**
   * 总的关联发票数量
   * @format int32
   */
  totalRelateInvoiceNum?: number;
}

/** RelateSystemStaticsResp */
export interface RelateSystemStaticsResp {
  /**
   * 总的失败关联FBT编码数量
   * @format int64
   */
  totalFailRelatedNumFbt?: number;
  /**
   * 总的失败关联金蝶编码数量
   * @format int64
   */
  totalFailRelatedNumKingdee?: number;
  /**
   * 总的不需要推送金蝶编码数量
   * @format int64
   */
  totalNotNeedPushingNumKingdee?: number;
  /**
   * 总的未关联FBT编码数量
   * @format int64
   */
  totalNotRelateNumFbt?: number;
  /**
   * 总的未关联金蝶编码数量
   * @format int64
   */
  totalNotRelateNumKingdee?: number;
  /**
   * 总推送中FBT编码数量
   * @format int64
   */
  totalPushingNumFbt?: number;
  /**
   * 总推送中金蝶编码数量
   * @format int64
   */
  totalPushingNumKingdee?: number;
  /**
   * 总的关联FBT编码数量
   * @format int64
   */
  totalRelateNumFbt?: number;
  /**
   * 总的关联金蝶编码数量
   * @format int64
   */
  totalRelateNumKingdee?: number;
}

/** RelatedInvoice */
export interface RelatedInvoice {
  /** 发票金额 */
  invoiceAmount?: number;
  /** 发票号 */
  invoiceNo?: string;
}

/** SaleInvoiceListBean */
export interface SaleInvoiceListBean {
  /** 金额 */
  amount?: number;
  /** 发票号 */
  code?: string;
  /** 佣金 */
  commission?: number;
  /** 币别 */
  currency?: string;
  /** 客户 */
  customerCode?: string;
  /** 客户名称 */
  customerName?: string;
  /** 客户PO */
  customerPo?: string;
  /**
   * 日期
   * @format date
   */
  invoiceDate?: string;
  /** 发票净额 */
  invoiceNetAmount?: number;
  /** 订单号 */
  orderNumber?: string;
  /** 销售运费 */
  shippingFee?: number;
  /** 单据状态 */
  status?: string;
  /** 单据状态 */
  statusDesc?: string;
  /** 税额 */
  taxAmount?: number;
  /** 价税合计 */
  totalAmountTax?: number;
  /** 未核销金额 */
  unWriteOffAmount?: number;
  /** 核销金额 */
  writeOffAmount?: number;
}

/** SalesOutStockOrderBatchChangePushStatusReq */
export interface SalesOutStockOrderBatchChangePushStatusReq {
  /** 单据编号 出库单号、销售订单号 */
  codeKeyword?: string;
  /** 单号 */
  codeList?: string[];
  /** 客户编码s */
  customerCodes?: string[];
  /** 销售订单号 */
  erpCode?: string;
  /** kingdee单据编号 */
  kingdeeOrderCode?: string;
  /** kingdee推送状态 状态: 0-未推送 1-推送成功 2-推送失败 3-推送中 */
  kingdeePushStatus?: number[];
  /** 是否标记推送成功 */
  markPushSuccess?: boolean;
  /** 订单号-多输入模糊 */
  orderCodeKeyword?: string;
  /** 出库单号-多输入模糊 */
  outStockCodeKeyword?: string;
  /** 出库时间结束 */
  outTimeEnd?: string;
  /** 出库时间开始 */
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
  /** 销售订单号-多输入模糊 */
  saleOrderCodesKeyword?: string;
  /**
   * 订单类型: 1-B2B订单  4-shopify
   * @format int32
   */
  type?: number;
  /** 0-红人发样订单 1-线下订单 2-TT 3-内购 4-shopify -1-领用订单 */
  typeList?: number[];
}

/** SalesOutStockOrderListQueryReq */
export interface SalesOutStockOrderListQueryReq {
  /** 单据编号 出库单号、销售订单号 */
  codeKeyword?: string;
  /** 单据编号-多输入 */
  codeList?: string[];
  /** 客户编码s */
  customerCodes?: string[];
  /** 销售订单号 */
  erpCode?: string;
  /** kingdee单据编号 */
  kingdeeOrderCode?: string;
  /** kingdee推送状态 状态: 0-未推送 1-推送成功 2-推送失败 3-推送中 */
  kingdeePushStatus?: number[];
  /** 订单号-多输入模糊 */
  orderCodeKeyword?: string;
  /** 出库单号-多输入模糊 */
  outStockCodeKeyword?: string;
  /** 出库时间结束 */
  outTimeEnd?: string;
  /** 出库时间开始 */
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
  /** 销售订单号-多输入模糊 */
  saleOrderCodesKeyword?: string;
  /**
   * 订单类型: 1-B2B订单  4-shopify
   * @format int32
   */
  type?: number;
  /** 0-红人发样订单 1-线下订单 2-TT 3-内购 4-shopify -1-领用订单 */
  typeList?: number[];
}

/** SalesOutStockOrderQueryListItem */
export interface SalesOutStockOrderQueryListItem {
  /**
   * 单据类型
   * @format int32
   */
  billType?: number;
  /** 单据类型描述 */
  billTypeDesc?: string;
  /** 编码（格式：仓库编码-行号） */
  code?: string;
  /**
   * 合并推送金蝶状态: 0-未推送 1-推送成功 2-推送失败
   * @format int32
   */
  combinePushKingdeeStatus?: number;
  /** 佣金 */
  commission?: number;
  /** 企业编码 */
  companyCode?: string;
  /** @format date-time */
  createAt?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /** 创建人名称 */
  creatorName?: string;
  /** 币种编码 */
  currencyCode?: string;
  /** 币种名称 */
  currencyName?: string;
  /** 客服备注 */
  customRemark?: string;
  /** 客户编码 */
  customerCode?: string;
  /** 客户名称 */
  customerName?: string;
  /** 发货方法 */
  deliveryCode?: string;
  /** 发货方法名称 */
  deliveryCodeDesc?: string;
  /** 折扣金额 */
  discountAmount?: number;
  /** 订单号 */
  erpCode?: string;
  /** 运费 */
  freightAmount?: number;
  /** 分组 */
  groupCode?: string;
  /** 分组1 */
  groupCode1?: string;
  /** 分组2 */
  groupCode2?: string;
  /**
   * 分组类型:推送组类型: 1-跨组织-报关-国内发海外 2-跨组织-报关-国内发香港 3-跨组织-不报关-国内发海外 4-跨组织-不报关-国内发香港 5-同组织 -1-未知 6-跨组织-不报关-香港发海外
   * @format int32
   */
  groupType?: number;
  groupTypeDesc?: string;
  /**
   * 主键
   * @format int64
   */
  id?: number;
  /**
   * 是否报关 0-未确认 1-是 2-否
   * @format int32
   */
  isCustoms?: number;
  /** 是否报关 0-未确认 1-是 2-否 */
  isCustomsDesc?: string;
  /** 商品ID */
  itemId?: string;
  /** kingdee推送信息-销售出库单/直接调拨单 */
  kingdeePushInfo1?: BasicPushBean;
  /** kingdee推送信息-其他出库单 */
  kingdeePushInfo2?: BasicPushBean;
  /** kingdee仓库编码 */
  kingdeeWarehouseNumber?: string;
  /** 不含税金额 */
  notTaxAmount?: number;
  /**
   * 数量
   * @format int32
   */
  num?: number;
  /** 订单备注 */
  orderRemark?: string;
  /** 归属组织id */
  organizationDeptId?: string;
  /** 归属组织kingdee编码 */
  organizationDeptKingdeeCode?: string;
  /** 归属组织名称 */
  organizationDeptName?: string;
  /** 出库单号 */
  outStockCode?: string;
  /**
   * 出库时间
   * @format date-time
   */
  outTime?: string;
  /** 收款条件 */
  paymentTermsCode?: string;
  /** 收款条件描述 */
  paymentTermsDesc?: string;
  platformCode?: string;
  /** 单价 */
  price?: number;
  /** 商品名称 */
  productName?: string;
  /**
   * 推送状态: 0-未推送 1-推送成功 2-推送失败
   * @format int32
   */
  pushStatus?: number;
  /** 推送状态描述 */
  pushStatusDesc?: string;
  /**
   * 收货区域 1-国内 2-海外 3-香港
   * @format int32
   */
  receiveArea?: number;
  /** 参考单号 */
  refNo?: string;
  /** 领用类型 */
  requisitionType?: string;
  /**
   * 行号（分区序号）
   * @format int32
   */
  rowNum?: number;
  /** 销售运费 */
  salesFreightAmount?: number;
  /** 销售组织编码 */
  salesOrgCode?: string;
  /** 销售组织名称 */
  salesOrgName?: string;
  /** 是否同组织 */
  sameOrg?: boolean;
  /** MSKU */
  sellerSku?: string;
  /**
   * 发货区域 1-国内 2-海外 3-香港
   * @format int32
   */
  sendArea?: number;
  /**
   * 是否分摊 0-否 1-是
   * @format int32
   */
  shared?: number;
  /** 分摊佣金 */
  sharedCommission?: number;
  /** 分摊折扣金额 */
  sharedDiscountAmount?: number;
  /** 分摊运费 */
  sharedFreightAmount?: number;
  /** 分摊销售运费 */
  sharedSalesFreightAmount?: number;
  /** 配送方式 */
  shippingCode?: string;
  /** 配送方式名称 */
  shippingName?: string;
  /** 店铺账号 */
  shopAccount?: string;
  /** SKU编码 */
  skuCode?: string;
  /** 库存组织编码 */
  stockOrgCode?: string;
  /** 库存组织名称 */
  stockOrgName?: string;
  /** 供应商SKU */
  supplySku?: string;
  /** 税额 */
  tax?: number;
  /** 含税金额 */
  taxAmount?: number;
  /** 含税单价 */
  taxPrice?: number;
  /** 税率（百分比） */
  taxRate?: number;
  /**
   * 订单类型: 0-红人发样订单 1-线下订单 2-TT 3-内购 4-shopify
   * @format int32
   */
  type?: number;
  /** 订单类型: 0-红人发样订单 1-线下订单 2-TT 3-内购 4-shopify */
  typeDesc?: string;
  /**
   * 单位: 0-件 1-箱
   * @format int32
   */
  unit?: number;
  /** @format date-time */
  updateAt?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /** 更新者 */
  updater?: string;
  /** 更新者名称 */
  updaterName?: string;
  /** 仓库信息 */
  warehouseBean?: BasicWarehouse;
  /** 仓库编号 */
  warehouseCode?: string;
  /** 仓库名称 */
  warehouseName?: string;
}

/** SalesOutStockOrderQueryListResp */
export interface SalesOutStockOrderQueryListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 列表 */
  recordList?: SalesOutStockOrderQueryListItem[];
  /** 关联系统统计 */
  relateSystemStatics?: RelateSystemStaticsResp;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** SalesOutStockOrderUpdateOutTimeReq */
export interface SalesOutStockOrderUpdateOutTimeReq {
  /** 单据编号-多输入 */
  codeList?: string[];
  /** 出库时间 */
  outTime?: string;
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

/** SelectedInvoice */
export interface SelectedInvoice {
  /** 发票净额 */
  invoiceNetAmount?: number;
  /** 发票号 */
  invoiceNumber?: string;
  /** 关联金额 */
  relatedAmount?: number;
  /** 未核销金额 */
  unWriteOffAmount?: number;
}

/** SettlementFormBean */
export interface SettlementFormBean {
  /** 金额 */
  amount?: number;
  /** 应收净额 */
  amountReceivable?: number;
  /**
   * 开票状态
   * @format int32
   */
  billingStatus?: number;
  /** 开票状态 */
  billingStatusDesc?: string;
  /** 结算单号 */
  code?: string;
  /** 佣金 */
  commission?: number;
  /** 币别 */
  currency?: string;
  /** 客户编码 */
  customerCode?: string;
  /** 客户名称 */
  customerName?: string;
  /** 客户PO */
  customerPo?: string;
  /**
   * 到期日
   * @format date-time
   */
  expirationDate?: string;
  /** 开票金额 */
  invoiceAmount?: number;
  /** 订单号 */
  orderNumber?: string;
  /**
   * 日期
   * @format date-time
   */
  outboundTime?: string;
  /** 收款条件 */
  paymentTerm?: string;
  /** 结算组织编码 */
  settlementOrgCode?: string;
  /** 结算组织名称 */
  settlementOrgName?: string;
  /** 销售运费 */
  shippingFee?: number;
  /** 税额 */
  taxAmount?: number;
  /** 价税合计 */
  totalAmountTax?: number;
  /** 核销金额 */
  writeOffAmount?: number;
  /**
   * 核销状态
   * @format int32
   */
  writeOffStatus?: number;
  /** 核销状态 */
  writeOffStatusDesc?: string;
}

/** SettlementFormDetailResp */
export interface SettlementFormDetailResp {
  /** 结算单开票明细 */
  invoiceBeans?: SettlementFormInvoiceItemBean[];
  /** 结算单基本信息 */
  settlementFormBean?: SettlementFormBean;
  /** 结算单商品明细 */
  settlementFormItemBeans?: SettlementFormProductItemBean[];
  /** 结算单核销明细 */
  writeOffBeans?: BillingWriteOffBean[];
}

/** SettlementFormInvoiceItemBean */
export interface SettlementFormInvoiceItemBean {
  /** 金额 */
  amount?: number;
  /** 发票号 */
  code?: string;
  /** 佣金 */
  commission?: number;
  /** 币别 */
  currency?: string;
  /**
   * 日期
   * @format date
   */
  invoiceDate?: string;
  /** 发票净额 */
  invoiceNetAmount?: string;
  /** 销售运费 */
  shippingFee?: number;
  /** 发票状态 */
  status?: string;
  /** 发票状态 */
  statusDesc?: string;
  /** 税额 */
  taxAmount?: number;
  /** 价税合计 */
  totalAmountTax?: number;
  /** 未核销金额 */
  unWriteOffAmount?: number;
  /** 核销金额 */
  writeOffAmount?: number;
}

/** SettlementFormListReq */
export interface SettlementFormListReq {
  /**
   * 金额类型：1-核销金额 2-金额 3-税额 4-价税合计 5-销售运费 6-佣金 7-应收净额
   * @format int32
   */
  amountType?: number;
  /** 结算单号/订单号/客户PO */
  code?: string;
  /** 客户 */
  customerCodes?: string[];
  /**
   * 结束时间
   * @format date-time
   */
  endTime?: string;
  /** 开票状态：1-全部开票 2-部分开票 3-未开票 */
  invoiceStatusCodes?: number[];
  /** 最大金额 */
  maxAmount?: number;
  /** 最小金额 */
  minAmount?: number;
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
  /** 结算组织 */
  settlementOrgCodes?: string[];
  /**
   * 开始时间
   * @format date-time
   */
  startTime?: string;
  /** 核销状态：1-全部核销 2-部分核销 3-未核销 */
  writeOffStatusCodes?: number[];
}

/** SettlementFormListResp */
export interface SettlementFormListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 结算单列表 */
  recordList?: SettlementFormBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** SettlementFormProductItemBean */
export interface SettlementFormProductItemBean {
  /** 金额 */
  amount?: number;
  /** 佣金 */
  commission?: number;
  /** 客户PO */
  customerPo?: string;
  /** 开票金额 */
  invoiceDetails?: InvoiceDetail[];
  /**
   * 开票数量
   * @format int32
   */
  invoiceQty?: number;
  /** 订单号 */
  orderNumber?: string;
  /** 商品名称 */
  productName?: string;
  /** 商品编码 */
  productSku?: string;
  /**
   * 数量
   * @format int32
   */
  qty?: number;
  /** 发货单号 */
  shippingOrderNumber?: string;
  /** 税额 */
  taxAmount?: number;
  /** 税率 */
  taxRate?: number;
  /** 价税合计 */
  totalAmountTax?: number;
  /** 单价 */
  unitPrice?: number;
  /** 含税单价 */
  unitPriceIncludingTax?: number;
}

/** ShopCompareBean */
export interface ShopCompareBean {
  /** 币别编码 */
  currencyCode?: string;
  /** 差异金额 */
  differAmount?: number;
  /** 是否正常 */
  normal?: boolean;
  /** 店铺 */
  shop?: string;
  /** 总明细金额 */
  totalItemAmount?: number;
  /** 总结算金额 */
  totalSettlementAmount?: number;
}

/** ShopCompareListReq */
export interface ShopCompareListReq {
  /** 关键字 */
  keyword?: string;
  /** 月份时间 */
  monthTime?: string;
  /**
   * 正常店铺状态: 0-正常 1-异常
   * @format int32
   */
  normalStatus?: number;
}

/** ShopCompareListResp */
export interface ShopCompareListResp {
  /** 平台店铺对比列表 */
  recordList?: PlatformCompareBean[];
}

/** ShopCompareSumDataResp */
export interface ShopCompareSumDataResp {
  /**
   * 总异常店铺数
   * @format int32
   */
  abnormalShopNum?: number;
  /**
   * 店铺对比时间
   * @format date-time
   */
  compareTime?: string;
  /**
   * 总正常店铺数
   * @format int32
   */
  normalShopNum?: number;
  /**
   * 总店铺数
   * @format int32
   */
  totalShopNum?: number;
}

/** SpuListQueryResp */
export interface SpuListQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** SPU列表 */
  recordList?: BasicSpuBean[];
  /** SPU关联系统统计 */
  relateSystemStatics?: RelateSystemStaticsResp;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** Statistics */
export interface Statistics {
  /**
   * 付款单数量
   * @format int32
   */
  count?: number;
  /** 付款单状态：0-付款中 1-已付款 2-已作废 */
  status?: string;
}

/** SupplierDetailQueryResp */
export interface SupplierDetailQueryResp {
  /** 账号信息 */
  basicSupplierAccountBeans?: BasicSupplierAccountBean[];
  /** 基础信息 */
  basicSupplierBean?: BasicSupplierBean;
}

/** SupplierListQueryResp */
export interface SupplierListQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 供应商列表 */
  supplierList?: BasicSupplierBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
  /**
   * 总的未关联金蝶编码数量
   * @format int32
   */
  totalNotRelateNum?: number;
  /**
   * 总的关联金蝶编码数量
   * @format int32
   */
  totalRelateNum?: number;
}

/** SyncKingdeeBillReq */
export interface SyncKingdeeBillReq {
  /** 单据编号 */
  billNo?: string;
  /**
   * 单据类型
   * @format int32
   */
  billType?: number;
}

/** SyncThirdSystemBillReq */
export interface SyncThirdSystemBillReq {
  /** 单据编号 */
  billNo?: string;
  /** 单据类型 */
  billTypes?: number[];
  /** 第三方系统类型 kingdee->金蝶 fbt->分贝通 jijia->积加 */
  systemCode?: string;
}

/** TableConfigResp */
export interface TableConfigResp {
  /** 编码 */
  code?: string;
  /** 名称 */
  name?: string;
  /** 数据源的key */
  sourceKey?: string;
}

/** TableFieldListResp */
export interface TableFieldListResp {
  /** 字段列表 */
  recordList?: TableFieldListRespItem[];
}

/** TableFieldListRespItem */
export interface TableFieldListRespItem {
  /** 字段 */
  key?: string;
  /** 字段描述 */
  name?: string;
}

/** TransferListQueryRespItem */
export interface TransferListQueryRespItem {
  /** 申请员编码 */
  applyMemberCode?: string;
  /** 申请员名称 */
  applyMemberDesc?: string;
  /**
   * 业务日期
   * @format date-time
   */
  businessDate?: string;
  /** 单据编码 */
  code?: string;
  /** kingdee推送信息 */
  kingdeePushInfo?: BasicPushBean;
  /** 备注 */
  remark?: string;
  /** 来源单号 */
  sourceCode?: string;
  /** 来源系统: fbt */
  sourceSystemCode?: string;
  /** 来源系统描述 */
  sourceSystemDesc?: string;
  /**
   * 状态
   * @format int32
   */
  status?: number;
  /** 状态描述 */
  statusDesc?: string;
  /** 转账出账组织 */
  transferOutOrg?: string;
  /** 转账出账组织描述 */
  transferOutOrgDesc?: string;
}

/** TransferSlipDetailQueryResp */
export interface TransferSlipDetailQueryResp {
  /** 基础信息 */
  baseInfo?: TransferSlipDetailQueryRespBaseInfo;
  /** 明细信息 */
  itemList?: TransferSlipDetailQueryRespItemInfo[];
  /** kingdee推送信息 */
  kingdeePushInfo?: BasicPushBean;
}

/** TransferSlipDetailQueryRespBaseInfo */
export interface TransferSlipDetailQueryRespBaseInfo {
  /** 申请员编码 */
  applyMemberCode?: string;
  /** 申请部门描述 */
  applyMemberDeptDesc?: string;
  /** 申请部门编码 */
  applyMemberDeptId?: string;
  /** 申请员名称 */
  applyMemberDesc?: string;
  /**
   * 申请日期
   * @format date-time
   */
  applyTime?: string;
  /**
   * 审核时间
   * @format date-time
   */
  auditTime?: string;
  /** 银行流水号 */
  bankSerialNumber?: string;
  /**
   * 业务日期
   * @format date-time
   */
  businessDate?: string;
  /**
   * 1-CBS 0-非CBS
   * @format int32
   */
  cbs?: number;
  /** 1-CBS 0-非CBS */
  cbsDesc?: string;
  /** 单据编码 */
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
  /**
   * kingdee推送类型
   * @format int32
   */
  kingdeeType?: number;
  /** 备注 */
  remark?: string;
  /** 来源单号 */
  sourceCode?: string;
  /** 来源系统: fbt */
  sourceSystemCode?: string;
  /** 来源系统描述 */
  sourceSystemDesc?: string;
  /** 结算组织 */
  statementOrg?: string;
  /** 结算组织描述 */
  statementOrgDesc?: string;
  /**
   * 状态
   * @format int32
   */
  status?: number;
  /** 状态描述 */
  statusDesc?: string;
  /** 转账出账组织 */
  transferOutOrg?: string;
  /** 转账出账组织描述 */
  transferOutOrgDesc?: string;
}

/** TransferSlipDetailQueryRespItemInfo */
export interface TransferSlipDetailQueryRespItemInfo {
  /** 转入账号 */
  transferInAccountsCode?: string;
  /** 转入支行联行号 */
  transferInAccountsSubbranchId?: string;
  /** 转入支行联行名字 */
  transferInAccountsSubbranchName?: string;
  /** 转入金额 */
  transferInAmount?: number;
  /** 转入币种 */
  transferInCurrency?: string;
  /** 转入组织 */
  transferInOrg?: string;
  /** 转入组织 */
  transferInOrgDesc?: string;
  /** 转出账号 */
  transferOutAccountsCode?: string;
  /** 转出支行联行号 */
  transferOutAccountsSubbranchId?: string;
  /** 转出支行联行名字 */
  transferOutAccountsSubbranchName?: string;
  /** 转出金额 */
  transferOutAmount?: number;
  /** 转出币种 */
  transferOutCurrency?: string;
  /** 单据编码 */
  transferSlipCode?: string;
}

/** TransferSlipListQueryReq */
export interface TransferSlipListQueryReq {
  /** @format int32 */
  billType?: number;
  /**
   * 业务日期-开始
   * @format date-time
   */
  businessDateBegin?: string;
  /**
   * 业务日期-结束
   * @format date-time
   */
  businessDateEnd?: string;
  /**
   * 分贝通推送状态: 0-未推送 1-推送成功 2-推送失败
   * @format int32
   */
  fbtPushStatus?: number;
  /**
   * 分贝通关联状态: 0-未关联 1-已关联
   * @format int32
   */
  fbtRelateStatus?: number;
  /** 关键字 */
  keyword?: string;
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
  /**
   * 金蝶推送状态: 0-未推送 1-推送成功 2-推送失败
   * @format int32
   */
  pushStatus?: number;
  /**
   * 金蝶关联状态: 0-未关联 1-已关联
   * @format int32
   */
  relateStatus?: number;
}

/** TransferSlipListQueryResp */
export interface TransferSlipListQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 列表 */
  recordList?: TransferListQueryRespItem[];
  /** 关联系统统计 */
  relateSystemStatics?: RelateSystemStaticsResp;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** UpdateBudgetDeptReq */
export interface UpdateBudgetDeptReq {
  /**
   * 预算管理部门ID
   * @format int64
   */
  budgetDeptId?: number;
  /**
   * 部门ID
   * @format int64
   */
  deptId?: number;
}

/** UpdateDeptFeeReq */
export interface UpdateDeptFeeReq {
  /** Comfelie不算在渠道的站外推广费-OA：Y=是，N=否，待分配=待分配 */
  comfelieOutsideFee?: string;
  /**
   * 部门ID
   * @format int64
   */
  deptId?: number;
  /** GTM推广费（其中素材制作费）：Y=是，N=否，待分配=待分配 */
  gtmMaterialFee?: string;
  /** GTM推广费-OA：Y=是，N=否，待分配=待分配 */
  gtmPromotionFee?: string;
  /** 站外推广费-OA：Y=是，N=否，待分配=待分配 */
  outsidePromotionFee?: string;
  /** 区域推广费-OA：Y=是，N=否，待分配=待分配 */
  regionPromotionFee?: string;
}

/** UpdateKingdeeNumberReq */
export interface UpdateKingdeeNumberReq {
  /** 单据编号 */
  billNo?: string;
  /**
   * 单据类型
   * @format int32
   */
  billType?: number;
  /** 金蝶编码 */
  kingdeeNumber?: string;
}

/** UpdateOldShopSaveReq */
export interface UpdateOldShopSaveReq {
  /** 客户编码 */
  customerCode?: string;
  /** 老店铺 */
  oldShopName?: string;
}

/** UpdateThirdSystemNumberReq */
export interface UpdateThirdSystemNumberReq {
  /** 单据编号 */
  billNo?: string;
  /**
   * 单据类型
   * @format int32
   */
  billType?: number;
  /** 三方编码 */
  number?: string;
  /** 系统编码, kingdee ->金蝶 fbt->分贝通 jijia->积加 */
  systemCode?: string;
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

/** WarehouseListQueryResp */
export interface WarehouseListQueryResp {
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
  /**
   * 总的未关联金蝶编码数量
   * @format int32
   */
  totalNotRelateNum?: number;
  /**
   * 总的关联金蝶编码数量
   * @format int32
   */
  totalRelateNum?: number;
  /** 仓库列表 */
  warehouseList?: BasicWarehouseBean[];
}

/** WriteOffDetailResp */
export interface WriteOffDetailResp {
  /** 可关联发票金额 */
  unWriteOffAmount?: number;
  /** 核销信息列表 */
  writeOffBeans?: CnOrderWriteOffBean[];
}

/** CommonResp«CommonBatchResp» */
export interface CommonRespCommonBatchResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: CommonBatchResp;
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

/** CommonResp«OtherBusinessPartnersQueryListResp» */
export interface CommonRespOtherBusinessPartnersQueryListResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: OtherBusinessPartnersQueryListResp;
  traceId?: string;
}

/** CommonResp«PaymentOrderDetailResp» */
export interface CommonRespPaymentOrderDetailResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: PaymentOrderDetailResp;
  traceId?: string;
}

/** CommonResp«PaymentOrderObsoleteResp» */
export interface CommonRespPaymentOrderObsoleteResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: PaymentOrderObsoleteResp;
  traceId?: string;
}

/** CommonResp«Void» */
export interface CommonRespVoid {
  code?: string;
  enMessage?: string;
  message?: string;
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
