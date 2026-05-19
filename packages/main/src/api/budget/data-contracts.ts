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

/** AttachmentBatchUploadReq */
export interface AttachmentBatchUploadReq {
  /** 附件列表 */
  attachmentUploadItemList?: AttachmentUploadItem[];
  /** 业务编码 */
  businessCode?: string;
}

/** AttachmentDetailResp */
export interface AttachmentDetailResp {
  /** 业务编码 */
  businessCode?: string;
  /** 创建人 */
  creatorName?: string;
  /** 下载地址 */
  downloadUrl?: string;
  /** 文件名 */
  fileName?: string;
  /**
   * 文件大小，字节
   * @format int64
   */
  fileSize?: number;
  /** 文件类型（后缀） */
  fileType?: string;
  /**
   * 附件ID
   * @format int64
   */
  id?: number;
  /**
   * 上传时间
   * @format date-time
   */
  uploadTime?: string;
}

/** AttachmentItemBean */
export interface AttachmentItemBean {
  /** 业务编码 */
  businessCode?: string;
  /** 创建人 */
  creatorName?: string;
  /** 下载地址 */
  downloadUrl?: string;
  /** 文件名 */
  fileName?: string;
  /**
   * 文件大小，字节
   * @format int64
   */
  fileSize?: number;
  /** 文件类型（后缀） */
  fileType?: string;
  /**
   * 附件ID
   * @format int64
   */
  id?: number;
  /**
   * 上传时间
   * @format date-time
   */
  uploadTime?: string;
}

/** AttachmentListResp */
export interface AttachmentListResp {
  /** 附件列表 */
  recordList?: AttachmentItemBean[];
}

/** AttachmentUploadItem */
export interface AttachmentUploadItem {
  /** 文件名 */
  fileName?: string;
  /**
   * 文件大小，字节
   * @format int64
   */
  fileSize?: number;
  /** 文件类型（后缀） */
  fileType?: string;
  /** ossKey */
  ossKey?: string;
}

/** AttachmentUploadReq */
export interface AttachmentUploadReq {
  /** 业务编码 */
  businessCode?: string;
  /** 文件名 */
  fileName?: string;
  /**
   * 文件大小，字节
   * @format int64
   */
  fileSize?: number;
  /** 文件类型（后缀） */
  fileType?: string;
  /** ossKey */
  ossKey?: string;
}

/** BasicDataRpcResp */
export interface BasicDataRpcResp {
  /** 编码 */
  code?: string;
  /** 详情 */
  detail?: Record<string, object>;
  /** 名称 */
  name?: string;
}

/** BatchUpdateStatusReq */
export interface BatchUpdateStatusReq {
  /** 编码列表 */
  codeList?: string[];
  /**
   * 状态 0-禁用 1-启用
   * @format int32
   */
  status?: number;
}

/** BudgetAdjustOrderListBean */
export interface BudgetAdjustOrderListBean {
  /** 调整金额 */
  adjustAmount?: number;
  /** 调整类型 */
  adjustTypeDesc?: string;
  /** 申请人 */
  applyMember?: string;
  /**
   * 申请时间
   * @format date-time
   */
  applyTime?: string;
  /** 区域 */
  area?: string;
  /**
   * 审核状态
   * @format int32
   */
  authStatus?: number;
  /** 审核状态 */
  authStatusDesc?: string;
  /** 预算部门 */
  budgetDept?: string;
  /** 预算周期 */
  budgetMonthDesc?: string;
  /** 编码 */
  code?: string;
  /** 费用科目 */
  expenseAccount?: string;
  /** 调整单编码 */
  flowCode?: string;
  /** OA审批单号 */
  flowDesc?: string;
  /** GTM品线 */
  gtmPl?: string;
  /** 营销活动 */
  marketingCampaign?: string;
  /** 研发项目 */
  newProduct?: string;
  /** 平台 */
  platform?: string;
}

/** BudgetAdjustOrderListReq */
export interface BudgetAdjustOrderListReq {
  /** 调整类型：budgetInternalAdjust-预算内调整 budgetExternalAdjust-预算外调整 */
  adjustType?: string;
  /** 申请部门 */
  applyDeptList?: number[];
  /**
   * 申请时间止
   * @format date-time
   */
  applyTimeEnd?: string;
  /**
   * 申请时间起
   * @format date-time
   */
  applyTimeStart?: string;
  /** 区域 */
  areaList?: string[];
  /** 状态 -1-创建失败 0-初始化(未推送) 10-审批中 11-已通过 12-已驳回 13-已撤销 20-待办中 21-已完成 22-已删除 */
  authStatusList?: number[];
  /** 费用科目 */
  expenseAccountList?: string[];
  /** GTM品线 */
  gtmPlList?: string[];
  /** 关键字 */
  keyword?: string;
  /** 营销活动 */
  marketingCampaignList?: string[];
  /** 研发项目 */
  newProductList?: string[];
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
  platformList?: string[];
}

/** BudgetAdjustOrderListResp */
export interface BudgetAdjustOrderListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 预算调整单列表 */
  recordList?: BudgetAdjustOrderListBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** BudgetBasicSelectResp */
export interface BudgetBasicSelectResp {
  /** 编码 */
  code?: string;
  /** 名称 */
  name?: string;
}

/** BudgetExeDetailResp */
export interface BudgetExeDetailResp {
  /** 申请金额 */
  applyAmount?: number;
  /**
   * 申请时间
   * @format date-time
   */
  applyTime?: string;
  exeItems?: BudgetExeItem[];
  /** 单据名称 */
  processName?: string;
  /** 单据类型 类型: before-事前  after-事后 */
  processType?: string;
  /** 单据类型 类型: before-事前  after-事后 */
  processTypeDesc?: string;
  /** 剩余金额 */
  remainingAmount?: number;
}

/** BudgetExeItem */
export interface BudgetExeItem {
  /** 申请金额 */
  applyAmount?: number;
  /**
   * 执行时间
   * @format date-time
   */
  businessTime?: string;
  /** 执行后金额 */
  exeAfterAmount?: number;
  /** 执行金额 */
  exeAmount?: number;
  /** 执行方式 */
  exeOperateType?: string;
  /** 执行方式 */
  exeOperateTypeDesc?: string;
  /** 作废金额 */
  invalidatedAmount?: number;
  /** 关联单据 */
  relevanceCode?: string;
}

/** BudgetPoolInitReq */
export interface BudgetPoolInitReq {
  /**
   * 预算年份
   * @format int32
   */
  budgetYear?: number;
  /** 预算方案编码列表 */
  schemeCodeList?: string[];
}

/** BudgetPoolInitResp */
export interface BudgetPoolInitResp {
  /** 预算方案列表 */
  schemeList?: BudgetSchemeResp[];
  /** 模板编码 */
  templateCode?: string;
  /** 模板名称 */
  templateName?: string;
}

/** BudgetPoolListBean */
export interface BudgetPoolListBean {
  /** 区域 */
  area?: string;
  /** 预算分类 */
  budgetCategory?: string;
  /** 预算部门 */
  budgetDept?: string;
  /** 单据编号 */
  code?: string;
  /** 费用科目 */
  expenseAccount?: string;
  /** 扩展字段1 */
  ext1?: string;
  /** 扩展字段2 */
  ext2?: string;
  /** 扩展字段3 */
  ext3?: string;
  /** 分组编码 */
  groupCode?: string;
  /** GTM品线 */
  gtmPl?: string;
  /** 营销活动 */
  marketingCampaign?: string;
  /** 预算月份金额 */
  monthAmountList?: BudgetPoolMonthAmountBean[];
  /** 研发项目 */
  newProduct?: string;
  /** 平台 */
  platform?: string;
  /**
   * 状态
   * @format int32
   */
  status?: number;
  /** 状态 */
  statusDesc?: string;
}

/** BudgetPoolListReq */
export interface BudgetPoolListReq {
  /** 区域 */
  areaList?: string[];
  /** 预算分类 */
  budgetCategoryList?: number[];
  /** 预算部门 */
  budgetDeptIdList?: number[];
  /**
   * 期间止
   * @format int32
   */
  budgetMonthEnd?: number;
  /**
   * 期间起
   * @format int32
   */
  budgetMonthStart?: number;
  /**
   * 预算年份
   * @format int32
   */
  budgetYear?: number;
  /** 费用科目 */
  expenseAccountList?: string[];
  /** GTM品线 */
  gtmPlList?: string[];
  /** 关键字 */
  keyword?: string;
  /** 营销活动 */
  marketingCampaignList?: string[];
  /** 研发项目 */
  newProductList?: string[];
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
  platformList?: string[];
  /**
   * 状态 0-草稿 1-已发布
   * @format int32
   */
  status?: number;
}

/** BudgetPoolListResp */
export interface BudgetPoolListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 预算池列表 */
  recordList?: BudgetPoolListBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** BudgetPoolMonthAmountBean */
export interface BudgetPoolMonthAmountBean {
  /**
   * 预算月份
   * @format int32
   */
  budgetMonth?: number;
  /** 预算月份 */
  budgetMonthDesc?: string;
  /** 上期结转金额 */
  carryForwardAmount?: number;
  /** 已执行金额 */
  executedAmount?: number;
  /** 预算外调整金额 */
  externalAdjustAmount?: number;
  /** 预算初期金额 */
  initBudgetAmount?: number;
  /** 预算内调整金额 */
  internalAdjustAmount?: number;
  /** 已锁定金额 */
  lockedAmount?: number;
  /** 已占用金额 */
  occupiedAmount?: number;
  /** 剩余金额 */
  remainingAmount?: number;
}

/** BudgetPoolOperationBeanRpc */
export interface BudgetPoolOperationBeanRpc {
  /**
   * 申请时间
   * @format date-time
   */
  applyTime?: string;
  /**
   * 业务发生时间 比如支付时间,支付单作废时间
   * @format date-time
   */
  businessTime?: string;
  /** 详情 */
  details?: Record<string, object>;
  /** 流程编码 */
  flowCode: string;
  /** 工单描述 */
  flowDesc?: string;
  /** 流程实例ID */
  instanceId?: string;
  /** oa提交编码,用来公共处理OA提交校验 */
  oaSubmitCode?: string;
  /** 操作类型：budgetInternalAdjust-预算内调整 budgetExternalAdjust-预算外调整 oaSubmit-OA提交 oaApproved-OA审核通过 oaWithdrawInApproval-OA审核中撤回 oaWithdrawAfterApproval-OA审核通过撤回 oaAfterSubmit-OA事后单提交 oaAfterApproved-OA事后单审核通过oaAfterWithdrawInApproval-OA事后单审核中撤回 oaAfterWithdrawAfterApproval-OA事后单审核通过撤回 cancelPay-取消付款 paySuccess-付款成功com.lute.finance.budget.common.rpc.enums.OperateTypeEnum */
  operateType?: string;
  /** 操作人编码(M开头员工号例如 M123218367219i46387) */
  operatorCode?: string;
  /** 流程类型 */
  processCode: string;
  /** 关联编码 */
  relevanceCode?: string;
  /** 行号 */
  rowNumber?: string;
  /**
   * 流程状态
   * @format int32
   */
  status?: number;
}

/** BudgetPoolStatusResp */
export interface BudgetPoolStatusResp {
  /**
   * 完成时间
   * @format date-time
   */
  finishTime?: string;
  /**
   * 进度 100-已完成
   * @format int32
   */
  progress?: number;
  /**
   * 执行状态: 0-未开始 1-生成中 2-生成成功 3-生成失败
   * @format int32
   */
  status?: number;
  /** 推送耗时 */
  useTime?: string;
}

/** BudgetQueryListReq */
export interface BudgetQueryListReq {
  /**
   * 申请时间-结束
   * @format date-time
   */
  applyTimeEnd?: string;
  /**
   * 申请时间-开始
   * @format date-time
   */
  applyTimeStart?: string;
  /** 区域 */
  areaList?: string[];
  /** 状态 -1-创建失败 0-初始化(未推送) 10-审批中 11-已通过 12-已驳回 13-已撤销 20-待办中 21-已完成 22-已删除 200-已支付 */
  authStatus?: number[];
  /** 预算状态: 锁定 - locked, 占用 - occupied, 待执行 - pending, 执行中 - executing, 完成 - completed, 取消 - cancelled */
  budgetStatus?: string[];
  /** 费用科目 */
  expenseAccounts?: string[];
  /** GTM品线 */
  gtmPlList?: string[];
  /** 关键字 单据号、申请人 */
  keyword?: string;
  /** 营销活动 */
  marketingCampaignList?: string[];
  /** 研发项目 */
  newProductList?: string[];
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
  /** 流程编号 */
  processCodes?: string[];
  /** 单据类型 */
  processTypeList?: string[];
  /** 申请部门 */
  proposerDepts?: number[];
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
}

/** BudgetQueryListResp */
export interface BudgetQueryListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  records?: BudgetQueryListRespItem[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** BudgetQueryListRespItem */
export interface BudgetQueryListRespItem {
  /** 申请金额 */
  applyAmount?: number;
  /**
   * 申请时间
   * @format date-time
   */
  applyTime?: string;
  /** 区域 */
  area?: string;
  /**
   * 状态 -1-创建失败 0-初始化(未推送) 10-审批中 11-已通过 12-已驳回 13-已撤销 20-待办中 21-已完成 22-已删除 200-已支付
   * @format int32
   */
  authStatus?: number;
  /** 状态描述 */
  authStatusDesc?: string;
  /** 预算分类 */
  budgetCategory?: string;
  /** 预算分类描述 */
  budgetCategoryDesc?: string;
  /** 预算部门 */
  budgetDept?: string;
  /** 预算状态: 锁定 - locked, 占用 - occupied, 待执行 - pending, 执行中 - executing, 完成 - completed, 取消 - cancelled */
  budgetStatus?: string;
  /** 预算状态描述 */
  budgetStatusDesc?: string;
  /** 预算池唯一值 */
  budgetUniqueCode?: string;
  /** 单据编号 */
  code?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 费用科目 */
  expenseAccount?: string;
  ext1?: string;
  ext2?: string;
  ext3?: string;
  extraInfo?: string;
  /** 流程编号 */
  flowCode?: string;
  /** OA审批单号 */
  flowDesc?: string;
  /** GTM品线 */
  gtmPl?: string;
  /**
   * 主键ID
   * @format int64
   */
  id?: number;
  /** 营销活动 */
  marketingCampaign?: string;
  /** 研发项目 */
  newProduct?: string;
  /** 平台 */
  platform?: string;
  /** 流程类型 */
  processCode?: string;
  /** 流程名称 */
  processName?: string;
  /** 流程类型 类型: before-事前  after-事后 */
  processType?: string;
  /** 流程类型 类型: before-事前  after-事后 */
  processTypeDesc?: string;
  /** 申请人编码 */
  proposer?: string;
  /** 申请人名称 */
  proposerName?: string;
  /** 关联单据号，如事后关联事前 */
  relevanceCode?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** BudgetRuleControlEnableSaveReq */
export interface BudgetRuleControlEnableSaveReq {
  /** 规则编码 */
  ruleCodes: string[];
  /**
   * 状态: 0-正常 1-禁用
   * @format int32
   */
  status: number;
}

/** BudgetRuleControlQueryListReq */
export interface BudgetRuleControlQueryListReq {
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
  /** 流程码 */
  processCodes?: string[];
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /**
   * 状态: 0-正常 1-禁用
   * @format int32
   */
  status?: number;
}

/** BudgetRuleControlQueryListResp */
export interface BudgetRuleControlQueryListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  records?: BudgetRuleControlQueryListRespItem[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** BudgetRuleControlQueryListRespItem */
export interface BudgetRuleControlQueryListRespItem {
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 适用维度,可以多个 */
  dimensionalityCodes?: DictCommonBean[];
  /** 多选，下拉选项：所有的预算费用科目 */
  feeSubjects?: DictCommonBean[];
  /**
   * 主键ID
   * @format int64
   */
  id?: number;
  /**
   * 是否默认 0-否 1-是
   * @format int32
   */
  isSystemDefault?: number;
  /** 通过，小于x值 */
  passLeUsageRate?: number;
  /**
   * 优先级
   * @format int32
   */
  priority?: number;
  /** 流程编码,可以多个 */
  processCodes?: DictCommonBean[];
  /** 流程类型 类型: before-事前  after-事后 */
  processType?: string;
  /** 流程类型 类型: before-事前  after-事后 */
  processTypeDesc?: string;
  /** 规则编码 */
  ruleCode?: string;
  /** 规则名称 */
  ruleName?: string;
  /** 来源系统 */
  sourceSystems?: DictCommonBean[];
  /**
   * 状态: 0-正常 1-禁用
   * @format int32
   */
  status?: number;
  /** 状态: 0-正常 1-禁用 */
  statusDesc?: string;
  /** 控制类型: weak-弱控制 strong-强控制 no-不控制 */
  type?: string;
  /** 控制类型: weak-弱控制 strong-强控制 no-不控制 */
  typeDesc?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /** 告警提示，大于x值 */
  warnGtUsageRate?: number;
}

/** BudgetRuleControlSaveReq */
export interface BudgetRuleControlSaveReq {
  /** 适用维度,可以多个 */
  dimensionalityCodes: DictCommonBean[];
  /** 多选，下拉选项：所有的预算费用科目 */
  feeSubjects: DictCommonBean[];
  /** 通过，小于x值 */
  passLeUsageRate?: number;
  /**
   * 优先级
   * @format int32
   * @min 1
   * @exclusiveMin false
   */
  priority?: number;
  /** 流程编码 */
  processCodes: DictCommonBean[];
  /** 流程类型 类型: before-事前  after-事后 */
  processType?: string;
  /** 规则编码 */
  ruleCode?: string;
  /** 规则名称 */
  ruleName: string;
  /** 多选，下拉选项：所有的来源系统 */
  sourceSystems: DictCommonBean[];
  /** 控制类型: weak-弱控制 strong-强控制 no-不控制 */
  type?: string;
  /** 告警提示，大于x值 */
  warnGtUsageRate?: number;
}

/** BudgetSchemeResp */
export interface BudgetSchemeResp {
  historySelect?: boolean;
  /** 预算方案编码 */
  schemeCode?: string;
  /** 预算方案名称 */
  schemeName?: string;
}

/** BudgetTemplate */
export interface BudgetTemplate {
  /** @format int32 */
  canAddLine?: number;
  code?: string;
  companyCode?: string;
  /** @format date-time */
  createTime?: string;
  /** @format int32 */
  dataRow?: number;
  /** @format int64 */
  deleted?: number;
  extraInfo?: string;
  /** @format int64 */
  id?: number;
  name?: string;
  /** @format int32 */
  newst?: number;
  /** @format int32 */
  supportImport?: number;
  /** @format int32 */
  type?: number;
  /** @format date-time */
  updateTime?: string;
  url?: string;
  version?: string;
}

/** BudgetYearSettingReq */
export interface BudgetYearSettingReq {
  /** 预算币种 */
  budgetCurrency: string;
  /** 预算周期(年度/季度/月度) */
  budgetCycle: string;
  /** 预算期间 */
  budgetPeriod: string;
  /**
   * 预算年度
   * @format int32
   */
  budgetYear: number;
  /**
   * 预算年度ID,新增时为空,修改时不为空
   * @format int64
   */
  id?: number;
}

/** BudgetYearSettingResp */
export interface BudgetYearSettingResp {
  /** 预算币种 */
  budgetCurrency?: string;
  /** 预算周期 */
  budgetCycle?: string;
  /**
   * 预算周期编码1.年度 2.季度  3.月度
   * @format int32
   */
  budgetCycleCode?: number;
  /** 预算期间 */
  budgetPeriod?: string;
  /**
   * 预算年度
   * @format int32
   */
  budgetYear?: number;
  /**
   * 年度设置id
   * @format int64
   */
  id?: number;
  /**
   * 状态(0-未启用 1-已启用 2-已归档)
   * @format int32
   */
  status?: number;
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

/** DepartmentReportTime */
export interface DepartmentReportTime {
  /**
   * 部门稿的上报截止时间
   * @format date
   */
  draftDeadline: string;
  /**
   * 部门稿的上报天数
   * @format int32
   */
  draftReportDays: number;
  /**
   * 部门稿阶段(1.一稿 2.二稿 ...)
   * @format int32
   */
  level: number;
}

/** DictCommonBean */
export interface DictCommonBean {
  desc?: string;
  value?: string;
}

/** DistributedDeptListBean */
export interface DistributedDeptListBean {
  /** 部门id */
  deptId?: string;
  /** 部门名称 */
  deptName?: string;
  /** 是否在制 */
  fill?: boolean;
  /** 上级部门id */
  parentDeptId?: string;
}

/** DistributedDeptReq */
export interface DistributedDeptReq {
  /** 编码,预算方案入口传预算方案编码,预算编制入口传预算编制编码 */
  code?: string;
  /**
   * 请求入口 0-预算方案 1-预算编制
   * @format int32
   */
  requestEntrance?: number;
}

/** DistributedDeptResp */
export interface DistributedDeptResp {
  /** 已分发部门列表 */
  recordList?: DistributedDeptListBean[];
}

/** DistributedMemberListBean */
export interface DistributedMemberListBean {
  /** 部门id */
  deptId?: string;
  /** 是否在制 */
  fill?: boolean;
  /** memberCode */
  memberCode?: string;
  /** 名称 */
  name?: string;
}

/** DistributedMemberResp */
export interface DistributedMemberResp {
  /** 已分发员工列表 */
  recordList?: DistributedMemberListBean[];
}

/** DistributionDeptReq */
export interface DistributionDeptReq {
  /** 新增分发部门列表 */
  addDeptIdList?: string[];
  /** 删除分发部门列表 */
  deleteDeptIdList?: string[];
  /**
   * 请求入口 0-预算方案 1-预算编制
   * @format int32
   */
  requestEntrance?: number;
  /** 预算方案编码 */
  schemeCode?: string;
}

/** DistributionMemberReq */
export interface DistributionMemberReq {
  /** 新增分发执行人列表 */
  addMemberCodeList?: string[];
  /** 预算编制编码 */
  code?: string;
  /** 删除分发执行人列表 */
  deleteMemberCodeList?: string[];
}

/** DraftBean */
export interface DraftBean {
  /**
   * 稿的上报截止时间
   * @format date
   */
  draftDeadline?: string;
  /** 稿的状态文本 */
  draftStatus?: string;
  /**
   * 稿的状态编号
   * @format int32
   */
  draftStatusNo?: number;
  /**
   * 是否已分发(1.已分发 0.未分发)
   * @format int32
   */
  isDispatch?: number;
  /**
   * 稿的阶段
   * @format int32
   */
  level?: number;
}

/** DwdChannelSkuInventoryListBean */
export interface DwdChannelSkuInventoryListBean {
  /** skuCode */
  skuCode: string;
}

/** DwdChannelSkuInventoryReq */
export interface DwdChannelSkuInventoryReq {
  /**
   * 月(根据当前分发时间,取上月)
   * @format int32
   */
  month: number;
  /** skuList */
  paramList: DwdChannelSkuInventoryListBean[];
  /**
   * 年(根据当前分发时间,取上个月所属的年)
   * @format int32
   */
  year: number;
}

/** DwdChannelSkuInventoryResp */
export interface DwdChannelSkuInventoryResp {
  /**
   * 实际期末库存
   * @format int64
   */
  actualEndingInventory?: number;
  /** skuCode */
  skuCode?: string;
}

/** DwsFinMultiPlatformMonthFinalListReq */
export interface DwsFinMultiPlatformMonthFinalListReq {
  /**
   * 结束月份(例:当前分发时间为2025年10月5日,时间范围就是2025年1月-2025年9月的数据,结束月份值为202509)
   * @format int64
   */
  endMonth: number;
  /** 渠道、国家、spuCode参数列表 */
  paramList: MultiPlatformMonthFinalListBean[];
  /**
   * 开始月份(例:当前分发时间为2025年10月5日,时间范围就是2025年1月-2025年9月的数据,开始月份值为202501)
   * @format int64
   */
  startMonth: number;
}

/** DwsFinMultiPlatformMonthFinalResp */
export interface DwsFinMultiPlatformMonthFinalResp {
  /** 预算表1-服务商广告费佣金率 */
  advertisingAgentFeeCommissionRate?: number;
  /** 预算表1-运费折扣率 */
  buyerShippingDiscountRate?: number;
  /** 渠道 */
  channel?: string;
  /** 国家 */
  countryCode?: string;
  /** 预算表1-平台销毁和报废率 */
  destroyAmountRate?: number;
  /** 预算表1-站内广告费率（DSP） */
  dspAdCostRate?: number;
  /** 预算表1-站外广告费率 */
  externalAdCostRate?: number;
  /** 预算表1-手续费率 */
  handingFeeRate?: number;
  /** 预算表1-线下佣金费用率 */
  offlineCommissionRate?: number;
  /** 预算表1-线下固定退款率 */
  offlineFixedRefundRate?: number;
  /** 预算表1-线下损耗费率 */
  offlineLossRate?: number;
  /** 预算表1-线下推广费率 */
  offlinePromotionFeeRate?: number;
  /** 线下签收差异费用率 */
  offlineReceiptDifferenceRate?: number;
  /** 预算表1-站外推广费率 */
  offsitePromotionFeeRate?: number;
  /** 预算表1-其他站内广告费率 */
  otherInternalAdCostRate?: number;
  /** 预算表1-平台其他收入率 */
  platformIncomeRate?: number;
  /** 预算表1-平台其他费用率 */
  platformOtherFeeRate?: number;
  /** 预算表1-退款率 */
  refundAmountRate?: number;
  /** 预算表1-售后补发率 */
  reissueCostRate?: number;
  /** 预算表2-总销售额 */
  salesAmountSum?: number;
  /** 预算表1-站内广告费率（SB） */
  sbCostRate?: number;
  /** 预算表1-站内广告费率（SBV） */
  sbvAdCostRate?: number;
  /** 预算表1-运费折扣率 */
  sdCostRate?: number;
  /** 预算表1-站内广告费率（SOV） */
  sovAdCostRate?: number;
  /** 预算表1-站内广告费率（SP） */
  spCostRate?: number;
  /** spu */
  spuCode?: string;
  /** 预算表1-广告汇总费率 */
  totalAdCostRate?: number;
  /** 预算表1-促销折扣率 */
  totalDiscountAmountRate?: number;
}

/** ExecutorReportTime */
export interface ExecutorReportTime {
  /**
   * 执行人稿的上报截止时间(二稿/三稿上报截止时间默认和部门二稿/三稿上报截止时间相同)
   * @format date
   */
  draftDeadline: string;
  /**
   * 执行人稿的上报天数
   * @format int32
   */
  draftReportDays: number;
  /**
   * 执行人稿的阶段(1.一稿 2.二稿 ...)
   * @format int32
   */
  level: number;
}

/** FillDetailByDeptReq */
export interface FillDetailByDeptReq {
  /** 导出空模版 */
  blank: boolean;
  /**
   * 预算组(0.否 1.是)
   * @format int32
   */
  budgetGroup: number;
  /** 编制code */
  code: string;
  /**
   * 当前阶段编码
   * @format int32
   */
  nowStepCode: number;
  /**
   * 页码
   * @format int32
   */
  pageNum: number;
  /**
   * 页大小
   * @format int32
   */
  pageSize: number;
  /** 预算方案编码 */
  schemeCode: string;
}

/** ImportDataReq */
export interface ImportDataReq {
  /** 文件名称 */
  fileName?: string;
  /** 上传文件的key或者完整路径 */
  key?: string;
}

/** MultiPlatformMonthFinalListBean */
export interface MultiPlatformMonthFinalListBean {
  /** 渠道 */
  channel: string;
  /** 国家 */
  countryCode: string;
  /** spu */
  spuCode: string;
}

/** PresentationBean */
export interface PresentationBean {
  /** 周期：1-年度 2-季度 3-月度 */
  budgetCycleDesc?: string;
  /** 预算部门id */
  budgetDeptId?: string;
  /** 预算部门名称 */
  budgetDeptName?: string;
  /** 预算期间，示例：2026-01至2026-12 */
  budgetPeriod?: string;
  /**
   * 预算年度
   * @format int32
   */
  budgetYear?: number;
  /** 预算表编码 */
  code?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 分发人 */
  distributorName?: string;
  /** 执行人 */
  executorName?: string;
  /**
   * 预算编制id
   * @format int64
   */
  id?: number;
  /**
   * 是否共享(1.是 0.否)
   * @format int32
   */
  isShare?: number;
  /** 负责人 */
  managerName?: string;
  /** 预算表名称 */
  name?: string;
  /**
   * 当前阶段编码
   * @format int32
   */
  nowStepCode?: number;
  /** 稿状态 */
  presentationDrafts?: PresentationDraftBean[];
  /** 预算方案编码 */
  schemeCode?: string;
  /** 预算表方案 */
  schemeName?: string;
  /** 上报失败原因 */
  submitFailReasons?: string[];
}

/** PresentationChangeToInProgressReq */
export interface PresentationChangeToInProgressReq {
  /** 编制编码 */
  presentationCode: string;
}

/** PresentationDraftBean */
export interface PresentationDraftBean {
  /**
   * 稿上报截止时间
   * @format date-time
   */
  draftDeadline?: string;
  /** 稿状态 */
  draftStatusDesc?: string;
  /**
   * 稿的状态编号
   * @format int32
   */
  draftStatusNo?: number;
  /**
   * 是否已分发(1.已分发 0.未分发)
   * @format int32
   */
  isDispatch?: number;
}

/** PresentationFillQueryByDeptResp */
export interface PresentationFillQueryByDeptResp {
  /** 列详情 */
  columnBeanList?: SchemeTemplateDetailColumnBean[];
  /**
   * 数据哪一行开始
   * @format int32
   */
  dataRow?: number;
  /** 行数据 */
  rows?: PresentationFillRowBean[];
  /** 表头 */
  tableHeader?: string;
  /** 模板 */
  template?: BudgetTemplate;
}

/** PresentationFillQueryDetailResp */
export interface PresentationFillQueryDetailResp {
  /**
   * 预算年度
   * @format int32
   */
  budgetYear?: number;
  /**
   * 是否可以添加行 0-否  1-是
   * @format int32
   */
  canAddLine?: number;
  /** 填报单编码 */
  code?: string;
  /** 创建人 */
  creator?: string;
  /** 创建人编码 */
  creatorDesc?: string;
  /** 分发月份 */
  distributeMonth?: string;
  /** 分发月份-1 */
  distributeMonthSub1?: string;
  /**
   * 最新填报时间
   * @format date-time
   */
  latestFillTime?: string;
  /** 更新者 */
  operator?: string;
  /** 关联编码 */
  relevanceCode?: string;
  /** 行数据 */
  rows?: PresentationFillRowBean[];
  /** 表头 */
  tableHeader?: string;
  /** 模板编码 */
  templateCode?: string;
  /** 模板名称 */
  templateName?: string;
  /** 模板版本 */
  templateVersion?: string;
  /** 更新人编码 */
  updaterDesc?: string;
}

/** PresentationFillQueryEnumsLastRefreshTimeResp */
export interface PresentationFillQueryEnumsLastRefreshTimeResp {
  /** 最后更新时间 */
  lastRefreshTime?: Record<string, string>;
}

/** PresentationFillQueryEnumsReq */
export interface PresentationFillQueryEnumsReq {
  /** 枚举信息 */
  enums?: string[];
  /**
   * 计划年
   * @format int32
   */
  planYear?: number;
}

/** PresentationFillQueryEnumsResp */
export interface PresentationFillQueryEnumsResp {
  /** 枚举信息 */
  columnEnums?: Record<string, Record<string, BasicDataRpcResp>>;
  /** 最后更新时间 */
  lastRefreshTime?: Record<string, string>;
}

/** PresentationFillQueryParamResp */
export interface PresentationFillQueryParamResp {
  arrayCellDropDownEnum?: Record<string, string>;
  /** 列详情 */
  columnBeans?: SchemeTemplateDetailColumnBean[];
  /**
   * 需要下拉枚举字段编码
   * @uniqueItems true
   */
  needCellDropDownEnum?: string[];
  /** 模板信息 */
  schemeTemplate?: SchemeTemplateBean;
}

/** PresentationFillRowBean */
export interface PresentationFillRowBean {
  /**
   * 单元格行号，标识在模板中的行位置
   * @format int32
   */
  cellRowNum?: number;
  /** 行唯一编码 */
  code?: string;
  /** 创建人 */
  creator?: string;
  /** 创建人编码 */
  creatorDesc?: string;
  /** 修改 */
  edited?: boolean;
  /** 扩展信息 */
  extInfo?: string;
  /** 填报记录编码，关联t_budget_fill表的code字段 */
  fillRecordCode?: string;
  /** 更新者 */
  operator?: string;
  /**
   * 记录版本，用于版本控制
   * @format int32
   */
  recordVersion?: number;
  /** 该行全部单元格，template_filed_code.fill_value */
  rowJson?: Record<string, object>;
  /** 模板编码，关联t_budget_template表的code字段 */
  templateCode?: string;
  /** 更新人编码 */
  updaterDesc?: string;
}

/** PresentationFillSaveDetailReq */
export interface PresentationFillSaveDetailReq {
  /** 是否管理员刷新 */
  adminRefresh?: boolean;
  /** 填报单编码 */
  code?: string;
  /** 关联编码 */
  relevanceCode?: string;
  /** 行数据 */
  rows?: PresentationFillRowBean[];
  /** 模板编码 */
  templateCode?: string;
  /** 模板版本 */
  templateVersion?: string;
}

/** PresentationListReq */
export interface PresentationListReq {
  /** 预算部门id */
  budgetDeptId?: string;
  /** 预算部门id */
  budgetDeptIds?: string[];
  /**
   * 预算年度
   * @format int32
   */
  budgetYear?: number;
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
   * 请求入口 1-预算编制管理 2-预算编制台
   * @format int32
   */
  requestEntrance: number;
  /** 预算方案编码 */
  schemeCode?: string;
  /** 预算表名称(编码查询) */
  templateCode?: string;
  /** 预算表名称(编码查询) */
  templateCodes?: string[];
}

/** PresentationListResp */
export interface PresentationListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 编制列表 */
  recordList?: PresentationBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** PresentationProgressBean */
export interface PresentationProgressBean {
  /** 预算节点 */
  budgetNode?: string;
  /** 预算节点Id */
  budgetNodeId?: string;
  /** 子节点 */
  childNodes?: PresentationProgressBean[];
  /** 预算表编码 */
  code?: string;
  /** 分发状态 */
  dispatchStatusDesc?: string;
  /**
   * 分发时间
   * @format date-time
   */
  dispatchTime?: string;
  /** 分发人 */
  distributorName?: string;
  /** 执行人 */
  executorName?: string;
  /** 上报失败原因 */
  failReason?: string;
  /**
   * 预算编制id
   * @format int64
   */
  id?: number;
  /** 负责人 */
  managerName?: string;
  /** 预算表名称 */
  name?: string;
  /**
   * 当前阶段编码
   * @format int32
   */
  nowStepCode?: number;
  /** 父节点 */
  parentNodeCode?: string;
  /**
   * 计划年
   * @format int32
   */
  planYear?: number;
  /** 稿状态 */
  presentationDrafts?: PresentationDraftBean[];
}

/** PresentationRepulseReq */
export interface PresentationRepulseReq {
  /**
   * 编码列表
   * @uniqueItems true
   */
  codeList?: string[];
  /** 打回原因 */
  repulseReason?: string;
  /**
   * 请求入口 0-预算方案 1-预算编制
   * @format int32
   */
  requestEntrance?: number;
}

/** PresentationSubmitReq */
export interface PresentationSubmitReq {
  /**
   * 编码列表
   * @uniqueItems true
   */
  codeList?: string[];
  continueSubmit?: boolean;
  /** 备注 */
  remark?: string;
  /**
   * 请求入口 0-预算方案 1-预算编制 2-预算编制台
   * @format int32
   */
  requestEntrance?: number;
}

/** PresentationTableTransferReq */
export interface PresentationTableTransferReq {
  /** 编制台code */
  code: string;
  /** 移交目标员工编码 */
  targetMemberCode: string;
}

/** ProgressListResp */
export interface ProgressListResp {
  /** 部门编制进度列表 */
  recordList?: PresentationProgressBean[];
}

/** PurchaseCostPriceListBean */
export interface PurchaseCostPriceListBean {
  /** 单元字段 */
  cellFiled?: string;
  /**
   * 采购数量
   * @format int32
   */
  count: number;
  /**
   * 与采购数量的月份对应(1~12)
   * @format int32
   */
  month: number;
  /** skuCode */
  skuCode: string;
}

/** PurchaseCostPriceReq */
export interface PurchaseCostPriceReq {
  /** 参数列表 */
  paramList: PurchaseCostPriceListBean[];
  /** 编制关联编码 */
  relevanceCode?: string;
}

/** PurchaseCostPriceResp */
export interface PurchaseCostPriceResp {
  /** 单元字段 */
  cellFiled?: string;
  /**
   * 采购数量
   * @format int32
   */
  count?: number;
  /**
   * 与采购数量的月份对应(1~12)
   * @format int32
   */
  month?: number;
  /**
   * 采购金额
   * @format double
   */
  purchaseAmount?: number;
  /** SKU */
  sku?: string;
}

/** ReportLogBean */
export interface ReportLogBean {
  /** 预算节点(人/部门) */
  budgetNode?: string;
  /** 下载路径 */
  downPath?: string;
  /** 稿件 */
  draftName?: string;
  /**
   * 主键
   * @format int64
   */
  id?: number;
  /**
   * 当前阶段编码
   * @format int32
   */
  nowStepCode?: number;
  /** 当前阶段名称 */
  nowStepName?: string;
  /**
   * 上报时间
   * @format date-time
   */
  reportTime?: string;
  /** 操作人 */
  reporter?: string;
  /** 操作人名称 */
  reporterDesc?: string;
}

/** ReportLogListReq */
export interface ReportLogListReq {
  /** 预算节点(部门上报赋值此字段) */
  budgetNode?: string;
  /** 执行人(执行人上报赋值此字段) */
  executorName?: string;
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
  /** 编制编码 */
  presentationCode?: string;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
}

/** ReportLogListResp */
export interface ReportLogListResp {
  code?: string;
  /** 上报日志列表 */
  logBeanList?: ReportLogBean[];
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

/** SchemeBean */
export interface SchemeBean {
  /**
   * 周期编码
   * @format byte
   */
  budgetCycle?: string;
  /** 周期描述 */
  budgetCycleDesc?: string;
  /** 预算期间 */
  budgetPeriod?: string;
  /**
   * 预算年度
   * @format int32
   */
  budgetYear?: number;
  /**
   * 是否可以添加行 0-否  1-是
   * @format int32
   */
  canAddLine?: number;
  /** 预算方案编码 */
  code?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /** 创建人姓名 */
  creatorName?: string;
  /**
   * 分发时间
   * @format date
   */
  dispatchTime?: string;
  /** 稿信息列表 */
  draftList?: DraftBean[];
  /**
   * 预算方案ID
   * @format int64
   */
  id?: number;
  /**
   * 是否共享(1.是 0.否)
   * @format int32
   */
  isShare?: number;
  /** 预算方案名称 */
  name?: string;
  /**
   * 当前阶段编码
   * @format int32
   */
  nowStepCode?: number;
  /** 上报失败原因 */
  submitFailReasons?: string[];
  /** 预算模板编码 */
  templateCode?: string;
  /** 预算模板名称 */
  templateName?: string;
}

/** SchemeCopyBean */
export interface SchemeCopyBean {
  /** 失败原因 */
  failReason?: string;
  /**
   * 结束时间
   * @format date-time
   */
  finishTime?: string;
  /** 新记录编码 */
  newSchemeCode?: string;
  /** 原记录编码 */
  oldSchemeCode?: string;
  /** 原记录名称 */
  oldSchemeName?: string;
  /**
   * 进度
   * @format int32
   */
  processBar?: number;
  /**
   * 开始时间
   * @format date-time
   */
  startTime?: string;
  /**
   * 0-失败 1-成功 2-进行中
   * @format int32
   */
  status?: number;
  /** 预算模板编码 */
  templateCode?: string;
  /** 预算模板名称 */
  templateName?: string;
}

/** SchemeCopyReq */
export interface SchemeCopyReq {
  /**
   * 预算周期(1.年度、2.季度、3.月度)
   * @format int32
   */
  budgetCycleCode: number;
  /** 预算期间 */
  budgetPeriod: string;
  /**
   * 预算年度
   * @format int32
   */
  budgetYear: number;
  /**
   * 推迟天数
   * @format int32
   */
  delayDays: number;
  /** 部门上报时间信息列表 */
  departmentReportTimeList: DepartmentReportTime[];
  /**
   * 分发时间
   * @format date
   */
  dispatchTime: string;
  /** 执行人上报时间信息列表 */
  executorReportTimeList: ExecutorReportTime[];
  /** 预算方案名称 */
  name: string;
  /** 方案编号 */
  schemeCode: string;
  /**
   * 稿件阶段
   * @format int32
   */
  stepLevel?: number;
  /** 预算方案模板 */
  templateCode: string;
}

/** SchemeDeleteReq */
export interface SchemeDeleteReq {
  /** 预算方案ID列表 */
  schemeIdList: number[];
}

/** SchemeFinishDateReq */
export interface SchemeFinishDateReq {
  /**
   * 上报天数
   * @format int32
   */
  days: number;
  /**
   * 分发日期
   * @format date
   */
  dispatchDay: string;
}

/** SchemeFinishDateResp */
export interface SchemeFinishDateResp {
  /**
   * 截止时间
   * @format date
   */
  finishDate?: string;
}

/** SchemeListQueryReq */
export interface SchemeListQueryReq {
  /**
   * 预算年度
   * @format int32
   */
  budgetYear?: number;
  /** 预算方案编码列表 */
  codes?: string[];
  /** 预算方案名称 */
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
  /** 模板编码 */
  templateCode?: string;
  /** 预算表名称(编码查询) */
  templateCodes?: string[];
}

/** SchemeListQueryResp */
export interface SchemeListQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 预算方案列表 */
  schemeList?: SchemeBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** SchemeRefreshLogQueryReq */
export interface SchemeRefreshLogQueryReq {
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
  schemeCode: string;
}

/** SchemeRefreshLogQueryResp */
export interface SchemeRefreshLogQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 记录列表 */
  recordList?: SchemeRefreshLogQueryRespItem[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** SchemeRefreshLogQueryRespItem */
export interface SchemeRefreshLogQueryRespItem {
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /** 失败编码 */
  failCodes?: string;
  /**
   * 失败个数
   * @format int32
   */
  failNum?: number;
  /** @format date-time */
  finishTime?: string;
  /**
   * 记录ID
   * @format int64
   */
  id?: number;
  /** 方案编码 */
  schemeCode?: string;
  /** 方案名称 */
  schemeName?: string;
  /**
   * 状态: 0-刷新失败 1-刷新成功 2-刷新中
   * @format int32
   */
  status?: number;
  /** 状态描述 */
  statusDesc?: string;
  /** 成功编码 */
  successCodes?: string;
  /**
   * 成功个数
   * @format int32
   */
  successNum?: number;
  /** 模板编码 */
  templateCode?: string;
  /** 模板名称 */
  templateName?: string;
  /** 总编制台编码 */
  totalCodes?: string;
  /**
   * 总个数
   * @format int32
   */
  totalNum?: number;
}

/** SchemeRefreshLogRefreshReq */
export interface SchemeRefreshLogRefreshReq {
  /** 失败的code */
  failCode?: string;
  /**
   * 方案编码
   * @format int64
   */
  id?: number;
  /** 成功的code */
  successCode?: string;
}

/** SchemeRefreshLogStartReq */
export interface SchemeRefreshLogStartReq {
  /** 方案编码 */
  schemeCode?: string;
  /** 模板编码 */
  templateCode?: string;
  /** 总记录编码 */
  totalCodes?: string[];
  /**
   * 总记录数
   * @format int32
   */
  totalNum?: number;
}

/** SchemeSaveReq */
export interface SchemeSaveReq {
  /**
   * 预算周期(1.年度、2.季度、3.月度)
   * @format int32
   */
  budgetCycleCode: number;
  /** 预算期间 */
  budgetPeriod: string;
  /**
   * 预算年度
   * @format int32
   */
  budgetYear: number;
  /**
   * 推迟天数
   * @format int32
   */
  delayDays: number;
  /** 部门上报时间信息列表 */
  departmentReportTimeList: DepartmentReportTime[];
  /**
   * 分发时间
   * @format date
   */
  dispatchTime: string;
  /** 执行人上报时间信息列表 */
  executorReportTimeList: ExecutorReportTime[];
  /** 预算方案名称 */
  name: string;
  /** 预算方案模板 */
  templateCode: string;
}

/** SchemeSaveResp */
export interface SchemeSaveResp {
  /** 预算方案编码 */
  code?: string;
}

/** SchemeTemplateBean */
export interface SchemeTemplateBean {
  /** 是否可以添加行 0-否  1-是 */
  canAddLine?: string;
  /** 模板编码 */
  code?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人名称 */
  creator?: string;
  /** 创建人编码 */
  creatorDesc?: string;
  /**
   * 数据哪一行开始
   * @format int32
   */
  dataRow?: number;
  /**
   * 主键
   * @format int64
   */
  id?: number;
  /** 模板名称 */
  name?: string;
  /**
   * 是否支持导入 0-否  1-是
   * @format int32
   */
  supportImport?: number;
  /**
   * 类型: 0-预算 1-实际
   * @format int32
   */
  type?: number;
  /** 类型描述 */
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
  /** 模版链接 */
  url?: string;
  /** 模板版本 */
  version?: string;
}

/** SchemeTemplateDetailColumnBean */
export interface SchemeTemplateDetailColumnBean {
  /**
   * 是否可添加行 0-否 1-是
   * @format int32
   */
  canAddLine?: number;
  /** 是否可以编辑 0-否 1-是 表格级别需合并数据权限 */
  canEdit?: string;
  /** 内容是否可见 0-否 1-是 */
  canView?: string;
  /** 单元格中文名 */
  cellCnName?: string;
  /** 单元格显示格式 */
  cellDisplayFormat?: string;
  /** 下拉枚举字段编码 */
  cellDropDownEnum?: string;
  /** 单元格公式 */
  cellFieldFormula?: string;
  /** 单元格公式维度: 1-整表、2-行表、3-跨表、4-级联 */
  cellFieldFormulaType?: string;
  /** 单元格公式维度描述 */
  cellFieldFormulaTypeDesc?: string;
  /** 单元格字段名（数据库或业务模型字段名） */
  cellFieldName?: string;
  /** 单元格标签 */
  cellTag?: string;
  /**
   * 单元格类型: 单元格类型: 1-数字 2-文本 3-单选框 4-多选框 5-下拉加输入 6-百分比 7-级联下拉框 8-级联下拉框加输入
   * @format int32
   */
  cellType?: number;
  /** 单元格类型描述 */
  cellTypeDesc?: string;
  /** 单元格校验提示信息 */
  cellValidationMessage?: string;
  /** 单元格校验表达式 */
  cellValidationRule?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 默认值 */
  defaultValue?: string;
  /** 描述 */
  desc?: string;
  /** 枚举过滤条件 */
  enumsFilter?: string;
  /** 扩展信息 */
  extraInfo?: string;
  /**
   * 是否能够过滤 0-否 1-是
   * @format int32
   */
  filter?: number;
  /**
   * 是否固定 0-否 1-是
   * @format int32
   */
  fixation?: number;
  /** 是否必填 0-否 1-是 */
  mustFill?: string;
  /** 父级单元格字段名, 级联过滤用 */
  parentCellFieldName?: string;
  /**
   * 显示顺序，数值越小越靠前
   * @format int32
   */
  sort?: number;
  /** 统计类型: sum-求和 */
  statistics?: string;
  /** 模板编码，关联t_budget_template表的code字段 */
  templateCode?: string;
  /** 模板字段编码 */
  templateFiledCode?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /** 模板版本 */
  version?: string;
}

/** SchemeTemplateQueryListReq */
export interface SchemeTemplateQueryListReq {
  /** 方案模版编码 */
  templateCode?: string;
}

/** SchemeTemplateQueryListResp */
export interface SchemeTemplateQueryListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  recordList?: SchemeTemplateQueryListRespItem[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** SchemeTemplateQueryListRespItem */
export interface SchemeTemplateQueryListRespItem {
  /** 模板编码 */
  code?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人名称 */
  creator?: string;
  /** 创建人编码 */
  creatorDesc?: string;
  /**
   * 数据哪一行开始
   * @format int32
   */
  dataRow?: number;
  /**
   * 主键
   * @format int64
   */
  id?: number;
  /** 模板名称 */
  name?: string;
  /**
   * 类型: 0-预算 1-实际
   * @format int32
   */
  type?: number;
  /** 类型描述 */
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
  /** 模版链接 */
  url?: string;
  /** 模板版本 */
  version?: string;
}

/** SchemeUpdateReportTimeReq */
export interface SchemeUpdateReportTimeReq {
  /** 变更原因 */
  changeReason?: string;
  /**
   * 推迟天数
   * @format int32
   */
  delayDays: number;
  /** 预算方案编码 */
  schemeCodeList: string[];
}

/** SharedUserBean */
export interface SharedUserBean {
  /**
   * 共享人所属部门Id
   * @format int64
   */
  deptId?: number;
  /** 共享人编码 */
  memberCode?: string;
  /** 共享人名称 */
  memberName?: string;
}

/** SharedUserListResp */
export interface SharedUserListResp {
  /** 共享人列表 */
  sharedUserList?: SharedUserBean[];
}

/** SharedUserQueryReq */
export interface SharedUserQueryReq {
  /** 编码(预算方案入口传预算方案编码,预算编制入口传预算编制编码) */
  code: string;
  /**
   * 请求入口 0-预算方案 1-预算编制
   * @format int32
   */
  requestEntrance: number;
}

/** SharedUserSaveReq */
export interface SharedUserSaveReq {
  /** 新增共享人编码列表 */
  addMemberCode?: string[];
  /** 编码(预算方案入口传预算方案编码,预算编制入口传预算编制编码) */
  code: string;
  /** 删除共享人编码列表 */
  delMemberCode?: string[];
  /**
   * 请求入口 0-预算方案 1-预算编制
   * @format int32
   */
  requestEntrance: number;
}

/** SubmitValidationResp */
export interface SubmitValidationResp {
  /** 编码 */
  code?: string;
  /** 校验失败原因 */
  submitFailReasons?: string[];
}

/** TrusteeMemberResp */
export interface TrusteeMemberResp {
  /**
   * 委托人所属部门Id
   * @format int64
   */
  deptId?: number;
  /** 委托人编码 */
  memberCode?: string;
  /** 委托人名称 */
  memberName?: string;
}

/** TrusteeQueryReq */
export interface TrusteeQueryReq {
  /** 编制编码 */
  code: string;
  /**
   * 1-预算编制
   * @format int32
   */
  requestEntrance: number;
}

/** TrusteeSaveReq */
export interface TrusteeSaveReq {
  /** 新增委托人编码 */
  addMemberCode?: string;
  /** 预算编制编码 */
  code: string;
}

/** UploadReq */
export interface UploadReq {
  /** 文件名 */
  fileName?: string;
  /** 文件类型（后缀） */
  fileType?: string;
  /** ossKey */
  ossKey?: string;
}

/** ValidationRuleDetailReq */
export interface ValidationRuleDetailReq {
  /**
   * 所属年度
   * @format int32
   */
  budgetYear?: number;
  /** 校验维度key */
  checkKey?: string;
  /** 校验维度名称 */
  checkName?: string;
  /** 数据key */
  checkValueKey?: string;
  /** 数据名称 */
  checkValueName?: string;
  /** 编码 */
  code?: string;
  /**
   * 比较类型 0-小于等于 1-大于等于 2-大于 3-小于 4-等于
   * @format int32
   */
  compareType?: number;
  /**
   * 预算部门id
   * @format int64
   */
  deptId?: number;
  /**
   * 是否使用默认错误提示 0-是 1-否
   * @format int32
   */
  isDefaultMessage?: number;
  /**
   * 目标值校验规则类型 0-销售明细表 1-费用明细目标值
   * @format int32
   */
  ruleType?: number;
  /**
   * 状态 0-启用 1-禁用
   * @format int32
   */
  status?: number;
  /** 数据汇总key */
  sumKey?: string;
  /** 数据汇总名称 */
  sumName?: string;
  /** 目标值 */
  targetValue?: number;
  /**
   * 指标类型 0-金额 1-百分比
   * @format int32
   */
  targetValueType?: number;
  /** 模板编码 */
  templateCode?: string;
  /** 错误提示信息 */
  validationMessage?: string;
}

/** ValidationRuleDetailResp */
export interface ValidationRuleDetailResp {
  /**
   * 所属年度
   * @format int32
   */
  budgetYear?: number;
  /** 校验维度key */
  checkKey?: string;
  /** 校验维度名称 */
  checkName?: string;
  /** 数据key */
  checkValueKey?: string;
  /** 数据名称 */
  checkValueName?: string;
  /** 编码 */
  code?: string;
  /**
   * 比较类型 0-小于等于 1-大于等于 2-大于 3-小于 4-等于
   * @format int32
   */
  compareType?: number;
  /**
   * 预算部门id
   * @format int32
   */
  deptId?: number;
  /**
   * 是否使用默认错误提示 0-是 1-否
   * @format int32
   */
  isDefaultMessage?: number;
  /**
   * 目标值校验规则类型 0-销售明细表 1-费用明细目标值
   * @format int32
   */
  ruleType?: number;
  /**
   * 状态 0-禁用 1-启用
   * @format int32
   */
  status?: number;
  /** 数据汇总key */
  sumKey?: string;
  /** 数据汇总名称 */
  sumName?: string;
  /** 目标值 */
  targetValue?: number;
  /**
   * 指标类型 0-金额 1-百分比
   * @format int32
   */
  targetValueType?: number;
  /** 表单编码 */
  templateCode?: string;
  /** 表单名称 */
  templateName?: string;
  /** 错误提示信息 */
  validationMessage?: string;
}

/** ValidationRuleListBean */
export interface ValidationRuleListBean {
  /**
   * 所属年度
   * @format int32
   */
  budgetYear?: number;
  /** 校验维度key */
  checkKey?: string;
  /** 校验维度名称 */
  checkName?: string;
  /** 校验维度值key */
  checkValueKey?: string;
  /** 校验维度值名称 */
  checkValueName?: string;
  /** 编码 */
  code?: string;
  /**
   * 规则 0-小于等于 1-大于等于 2-大于 3-小于 4-等于
   * @format int32
   */
  compareType?: number;
  /** 规则 0-小于等于 1-大于等于 2-大于 3-小于 4-等于 */
  compareTypeDesc?: string;
  /** 适用部门名称 */
  deptName?: string;
  /**
   * 目标值校验规则类型 0-销售明细表 1-费用明细目标值
   * @format int32
   */
  ruleType?: number;
  /**
   * 状态 0-禁用 1-启用
   * @format int32
   */
  status?: number;
  /** 状态 0-禁用 1-启用 */
  statusDesc?: string;
  /** 数据汇总key */
  sumKey?: string;
  /** 数据汇总名称 */
  sumName?: string;
  /** 目标值 */
  targetValue?: number;
  /**
   * 指标类型 0-金额 1-百分比
   * @format int32
   */
  targetValueType?: number;
  /** 指标类型 0-金额 1-百分比 */
  targetValueTypeDesc?: string;
  /** 模板名称 */
  templateName?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /** 更新人 */
  updater?: string;
  /** 错误提示 */
  validationMessage?: string;
}

/** ValidationRuleListReq */
export interface ValidationRuleListReq {
  /**
   * 预算年度
   * @format int32
   */
  budgetYear?: number;
  /** 校验维度名称 */
  checkName?: string;
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
   * 目标值校验规则类型 0-销售明细表 1-费用明细目标值
   * @format int32
   */
  ruleType?: number;
  /**
   * 状态 0-启用 1-禁用
   * @format int32
   */
  status?: number;
}

/** ValidationRuleListResp */
export interface ValidationRuleListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 目标值设置列表 */
  recordList?: ValidationRuleListBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** CommonResp«AttachmentDetailResp» */
export interface CommonRespAttachmentDetailResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: AttachmentDetailResp;
  traceId?: string;
}

/** CommonResp«AttachmentListResp» */
export interface CommonRespAttachmentListResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: AttachmentListResp;
  traceId?: string;
}

/** CommonResp«BudgetQueryListResp» */
export interface CommonRespBudgetQueryListResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: BudgetQueryListResp;
  traceId?: string;
}

/** CommonResp«BudgetRuleControlQueryListResp» */
export interface CommonRespBudgetRuleControlQueryListResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: BudgetRuleControlQueryListResp;
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

/** CommonResp«DistributedDeptResp» */
export interface CommonRespDistributedDeptResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: DistributedDeptResp;
  traceId?: string;
}

/** CommonResp«DistributedMemberResp» */
export interface CommonRespDistributedMemberResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: DistributedMemberResp;
  traceId?: string;
}

/** CommonResp«List«AttachmentDetailResp»» */
export interface CommonRespListAttachmentDetailResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: AttachmentDetailResp[];
  traceId?: string;
}

/** CommonResp«List«BudgetYearSettingResp»» */
export interface CommonRespListBudgetYearSettingResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: BudgetYearSettingResp[];
  traceId?: string;
}

/** CommonResp«List«DictCommonBean»» */
export interface CommonRespListDictCommonBean {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: DictCommonBean[];
  traceId?: string;
}

/** CommonResp«List«DwdChannelSkuInventoryResp»» */
export interface CommonRespListDwdChannelSkuInventoryResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: DwdChannelSkuInventoryResp[];
  traceId?: string;
}

/** CommonResp«List«DwsFinMultiPlatformMonthFinalResp»» */
export interface CommonRespListDwsFinMultiPlatformMonthFinalResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: DwsFinMultiPlatformMonthFinalResp[];
  traceId?: string;
}

/** CommonResp«List«PurchaseCostPriceResp»» */
export interface CommonRespListPurchaseCostPriceResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: PurchaseCostPriceResp[];
  traceId?: string;
}

/** CommonResp«List«SchemeCopyBean»» */
export interface CommonRespListSchemeCopyBean {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: SchemeCopyBean[];
  traceId?: string;
}

/** CommonResp«List«SubmitValidationResp»» */
export interface CommonRespListSubmitValidationResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: SubmitValidationResp[];
  traceId?: string;
}

/** CommonResp«PresentationFillQueryByDeptResp» */
export interface CommonRespPresentationFillQueryByDeptResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: PresentationFillQueryByDeptResp;
  traceId?: string;
}

/** CommonResp«PresentationFillQueryDetailResp» */
export interface CommonRespPresentationFillQueryDetailResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: PresentationFillQueryDetailResp;
  traceId?: string;
}

/** CommonResp«PresentationFillQueryEnumsLastRefreshTimeResp» */
export interface CommonRespPresentationFillQueryEnumsLastRefreshTimeResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: PresentationFillQueryEnumsLastRefreshTimeResp;
  traceId?: string;
}

/** CommonResp«PresentationFillQueryEnumsResp» */
export interface CommonRespPresentationFillQueryEnumsResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: PresentationFillQueryEnumsResp;
  traceId?: string;
}

/** CommonResp«PresentationFillQueryParamResp» */
export interface CommonRespPresentationFillQueryParamResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: PresentationFillQueryParamResp;
  traceId?: string;
}

/** CommonResp«PresentationListResp» */
export interface CommonRespPresentationListResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: PresentationListResp;
  traceId?: string;
}

/** CommonResp«ProgressListResp» */
export interface CommonRespProgressListResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: ProgressListResp;
  traceId?: string;
}

/** CommonResp«ReportLogListResp» */
export interface CommonRespReportLogListResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: ReportLogListResp;
  traceId?: string;
}

/** CommonResp«SchemeSaveResp» */
export interface CommonRespSchemeSaveResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: SchemeSaveResp;
  traceId?: string;
}

/** CommonResp«SchemeTemplateQueryListResp» */
export interface CommonRespSchemeTemplateQueryListResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: SchemeTemplateQueryListResp;
  traceId?: string;
}

/** CommonResp«SharedUserListResp» */
export interface CommonRespSharedUserListResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: SharedUserListResp;
  traceId?: string;
}

/** CommonResp«TrusteeMemberResp» */
export interface CommonRespTrusteeMemberResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: TrusteeMemberResp;
  traceId?: string;
}

/** CommonResp«Void» */
export interface CommonRespVoid {
  code?: string;
  enMessage?: string;
  message?: string;
  traceId?: string;
}

/** CommonResp«long» */
export interface CommonRespLong {
  code?: string;
  enMessage?: string;
  message?: string;
  /** @format int64 */
  result?: number;
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
