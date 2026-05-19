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

/** ClassificationBean */
export interface ClassificationBean {
  /** 分类 */
  classification?: string;
  /**
   * 数量
   * @format int64
   */
  classificationCount?: number;
  /** 占比 */
  rate?: number;
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

/** CountryBean */
export interface CountryBean {
  /** 国家 */
  country?: string;
  /**
   * 数量
   * @format int64
   */
  num?: number;
  /** 占比 */
  rate?: string;
}

/** ExecutorBeanListResp */
export interface ExecutorBeanListResp {
  /** 执行者列表 */
  executorBeanList?: MemberBean[];
}

/** MemberBean */
export interface MemberBean {
  /** 账号编码 */
  accountCode?: string;
  /** 头像 */
  avatar?: string;
  /** 市 */
  cityName?: string;
  /**
   * 是否删除 1-是 离职 0-否 在职
   * @format int32
   */
  deleted?: number;
  /**
   * 部门id
   * @format int64
   */
  deptId?: number;
  /** 员工所属最高级部门信息 */
  deptInfo?: MemberDeptInfoBean;
  /** 部门名称 */
  deptName?: string;
  /** 邮箱 */
  email?: string;
  /** ip */
  ipAddr?: string;
  /** 工号 */
  jobNumber?: string;
  /**
   * 是否主账号 1-是 0-否
   * @format int32
   */
  master?: number;
  /** 成员Code source=0 则是userCode, =1 则是supplierCode */
  memberCode?: string;
  /** 手机号 */
  mobile?: string;
  /** 成员名称 */
  name?: string;
  /** 昵称 */
  nickname?: string;
  /** 省 */
  provinceName?: string;
  /** 角色列表 */
  roleCodeList?: string[];
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

/** MemberDeptInfoBean */
export interface MemberDeptInfoBean {
  /**
   * 部门id
   * @format int64
   */
  deptId?: number;
  /** 部门名称 */
  deptName?: string;
  /** 员工编码 */
  memberCode?: string;
  /**
   * 父级部门id
   * @format int64
   */
  parentId?: number;
  /** 父级部门名称 */
  parentName?: string;
}

/** OpinionClassificationBeanResp */
export interface OpinionClassificationBeanResp {
  /** 舆情来源类型 新闻、社媒 */
  classificationList?: ClassificationBean[];
}

/** OpinionCountryResp */
export interface OpinionCountryResp {
  /** 国家分布 */
  countryList?: CountryBean[];
}

/** OpinionDataBean */
export interface OpinionDataBean {
  /** 发帖人 */
  author?: string;
  /** 内容分类: 客服、社群、新闻、社媒 */
  classification?: string;
  /** 内容 */
  content?: string;
  /**
   * 浏览数
   * @format int32
   */
  coveredNum?: number;
  /**
   * 创建时间
   * @format date-time
   */
  dataCreateTime?: string;
  /** 来源 */
  dataSource?: string;
  /** 执行人信息 */
  executorBeans?: MemberBean[];
  /** 法务标签 */
  fwTag?: string;
  /**
   * id
   * @format int64
   */
  id?: number;
  /**
   * 互动数
   * @format int32
   */
  interactionNum?: number;
  /**
   * 上次舆情处理结果（状态码）
   * @format int32
   */
  lastHandleStatus?: number;
  /** 上次舆情处理结果文案 */
  lastHandleStatusName?: string;
  /** 负向关键字 */
  negativeKeywords?: string;
  /**
   * 工单级别
   * @format int32
   */
  orderLevel?: number;
  /** 工单级别描述 */
  orderLevelDesc?: string;
  /** 正向关键字 */
  positiveKeywords?: string;
  /** pr标签 */
  prTag?: string;
  /** 工单状态文案（与 status 枚举一致） */
  processStatusName?: string;
  /** 产品分类 */
  productTag?: string;
  /**
   * 发布时间
   * @format date-time
   */
  publishTime?: string;
  /** 地区 */
  region?: string;
  /**
   * 工单重开次数
   * @format int32
   */
  reopenCount?: number;
  /** 情感得分 */
  score?: number;
  /** 情感 */
  sentiment?: string;
  /**
   * 工单状态
   * @format int32
   */
  status?: number;
  /** 标签 */
  tag?: string;
  /** 工单id */
  ticketId?: string;
  /** 标题 */
  title?: string;
  /** 舆情数据唯一标识 */
  uniqueCode?: string;
  /** 链接 */
  url?: string;
  /** 应用库同步的 Zendesk 状态 */
  zendeskStatus?: string;
  /** Zendesk Agent 工单链接 */
  zendeskTicketUrl?: string;
}

/** OpinionDataCenterBean */
export interface OpinionDataCenterBean {
  /** 发帖人 */
  author?: string;
  /** 内容分类: 客服、社群、新闻、社媒 */
  classification?: string;
  /**
   * 评论数量
   * @format int64
   */
  comments?: number;
  /** 内容概要 */
  contentSummary?: string;
  /** 内容类型 */
  contentType?: string;
  /**
   * 浏览量
   * @format int32
   */
  coveredNum?: number;
  /** 浏览量环比 */
  coveredNumPercent?: number;
  /** 来源 */
  dataSource?: string;
  /**
   * 工单完成数量
   * @format int32
   */
  finishNum?: number;
  /**
   * 粉丝数量
   * @format int64
   */
  followers?: number;
  /** 转赞评数量环比 */
  lcrPercent?: number;
  /**
   * 舆情等级 0=p0,1=p1,2=p2 3=p3 -1-无等级
   * @format int32
   */
  level?: number;
  /** `level_desc` */
  levelDesc?: string;
  /**
   * 转赞评数量
   * @format int64
   */
  likeCommentReposts?: number;
  /**
   * 点赞数量
   * @format int64
   */
  likes?: number;
  /** pr标签 */
  prTagStr?: string;
  /** 产品分类 */
  productTag?: string;
  /**
   * 发布时间
   * @format date-time
   */
  publishTime?: string;
  /** 国家 */
  region?: string;
  /** 相关性 */
  relevance?: string;
  /**
   * 转发数量
   * @format int64
   */
  reposts?: number;
  /** 情感 */
  sentiment?: string;
  /** 情感描述 */
  sentimentDesc?: string;
  /** 舆情ID */
  sourceCode?: string;
  /** 状态 */
  statusDesc?: string;
  /**
   * 是否超时 1-是 0-否
   * @format int32
   */
  timeLimitFlag?: number;
  /** 标题 */
  title?: string;
  /** 舆情数据唯一标识 */
  uniqueCode?: string;
  /** 链接 */
  url?: string;
  /**
   * 是否认证 1-是
   * @format int32
   */
  verified?: number;
  /** 工单信息集合 包含工单状态 前端处理状态统计 如： 已处理6/6 */
  workOrderList?: WorkOrderInfoBean[];
}

/** OpinionDataCenterListReq */
export interface OpinionDataCenterListReq {
  /** 分类 */
  classification?: string;
  /** 分类 */
  classificationList?: string[];
  /** 内容类型 */
  contentTypeList?: string[];
  /** 国家集合 */
  countryList?: string[];
  /** 数据来源 */
  dataSourceList?: string[];
  /** 执行者 */
  executorList?: string[];
  /**
   * 互动量末尾数
   * @format int32
   */
  interactionEnd?: number;
  /** 互动量 0-4;5-50;51 */
  interactionRange?: string;
  /**
   * 互动量起始数
   * @format int32
   */
  interactionStart?: number;
  /** 等级 */
  levelList?: number[];
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
  /** PR标签（问题类别） */
  prTagList?: string[];
  /** 产品类型-一级 */
  productLevel1?: string[];
  /** 产品类型-二级 */
  productLevel2?: string[];
  /** 产品类型-三级 */
  productLevel3?: string[];
  /** 产品类型-四级 */
  productLevel4?: string[];
  /** 产品类型-五级 */
  productLevel5?: string[];
  /**
   * 是否有筛选产品分类
   * @format int32
   */
  productLevelFlag?: number;
  /**
   * 发布截止时间
   * @format date
   */
  publishEndDate?: string;
  /**
   * 发布开始时间
   * @format date
   */
  publishStartDate?: string;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 相关性 */
  relevanceList?: string[];
  /** 情感 */
  sentimentList?: string[];
  /**
   * 工单状态 0-处理中 1-已处理 4-无需处理 -1为未创建工单
   * @format int32
   */
  status?: number;
  /** 内容标题 */
  title?: string;
  /** 舆情ID */
  uniqueCode?: string;
  /**
   * 是否创建工单 1-是 0-否
   * @format int32
   */
  workOrderFlag?: number;
}

/** OpinionDataCenterListResp */
export interface OpinionDataCenterListResp {
  code?: string;
  message?: string;
  /** 舆情数据 */
  opinionDataList?: OpinionDataCenterBean[];
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

/** OpinionDataListReq */
export interface OpinionDataListReq {
  /** 分类 */
  classification?: string;
  /** 数据来源 */
  dataSource?: string[];
  /** 执行人 */
  executor?: string[];
  /**
   * 问题紧急等级
   * @format int32
   */
  isEmergency?: number;
  /** 工单等级 */
  orderLevel?: number[];
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
   * 创建时间结束
   * @format date
   */
  publishTimeEnd?: string;
  /**
   * 创建时间开始
   * @format date
   */
  publishTimeStart?: string;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 搜索关键字 */
  search?: string;
  /** 情感类型 negative-负向 positive-正向 neutral-中立 */
  sentiment?: string;
  /**
   * 标签严重程度 0 严重 1不严重
   * @format int32
   */
  severityLevel?: number;
  /** 来源类型 */
  sourceType?: string[];
  /** 状态 */
  status?: number[];
  /** ai话题 */
  topic?: string;
}

/** OpinionDataListResp */
export interface OpinionDataListResp {
  code?: string;
  message?: string;
  /** 舆情数据列表 */
  opinionDataList?: OpinionDataBean[];
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

/** OpinionDataResp */
export interface OpinionDataResp {
  /** 内容 */
  content?: string;
  /**
   * 发布时间
   * @format date-time
   */
  publishTime?: string;
  /** 情感 */
  sentiment?: string;
  /** 标题 */
  title?: string;
  /** 链接 */
  url?: string;
}

/** OpinionDataStatusReq */
export interface OpinionDataStatusReq {
  /** 舆情数据唯一标识 */
  opinionUniqueCode?: string;
  /**
   * 状态: -1待处理 0进行中 1已解决 4无需处理 5钓鱼/垃圾内容 6舆情升级
   * @format int32
   */
  status?: number;
}

/** OpinionLevelResp */
export interface OpinionLevelResp {
  /** 舆情等级 */
  priorityList?: PriorityBean[];
}

/** OpinionMonitoringReq */
export interface OpinionMonitoringReq {
  /** 来源 */
  classification?: string;
  /** 国家集合 */
  countryList?: string[];
  /**
   * 创建截止时间
   * @format date
   */
  createTimeEnd?: string;
  /**
   * 创建开始时间
   * @format date
   */
  createTimeStart?: string;
  /** 舆情等级 */
  levelList?: number[];
  /** 问题分布-问题分类 */
  prTag?: string;
  /**
   * 问题分布-问题分类等级
   * @format int32
   */
  prTagLevel?: number;
  /** PR标签（问题类别） */
  prTagList?: string[];
  /** 产品类型-一级 */
  productLevel1?: string[];
  /** 产品类型-二级 */
  productLevel2?: string[];
  /** 产品类型-三级 */
  productLevel3?: string[];
  /** 产品类型-四级 */
  productLevel4?: string[];
  /** 产品类型-五级 */
  productLevel5?: string[];
  /**
   * 是否有筛选产品分类
   * @format int32
   */
  productLevelFlag?: number;
  /** 产品分布-产品标签 */
  productTag?: string;
  /**
   * 产品分布-产品标签等级
   * @format int32
   */
  productTagLevel?: number;
  /** 产品类别 */
  productTagList?: string[];
  /** 情感 */
  sentimentList?: string[];
}

/** OpinionMonitoringResp */
export interface OpinionMonitoringResp {
  /**
   * 工单数量
   * @format int64
   */
  count?: number;
  /** 工单处理率 工单状态（已完成+无需处理）的比率 */
  finishRate?: number;
  /**
   * 待处理工单数量
   * @format int64
   */
  pendingCount?: number;
  /** 处理及时率：及时处理工单/解决+无需解决工单总数 */
  processTimelinessRate?: number;
}

/** OpinionParamListResp */
export interface OpinionParamListResp {
  /** 舆情工单分类列表数量统计 舆情2.0 */
  classificationList?: ClassificationBean[];
  /** 内容类型列表 */
  contentTypeList?: string[];
  /** 国家列表 */
  countryList?: string[];
  /** 数据来源列表 */
  dataSourceList?: string[];
  /** 相关性列表 */
  relevanceList?: string[];
  /** 来源类型列表 */
  sourceTypeList?: string[];
  /** 工单状态 */
  statusMap?: Record<string, string>;
}

/** OpinionParamReq */
export interface OpinionParamReq {
  /** 舆情类型 */
  classification?: string;
  classificationList?: string[];
}

/** OpinionPrTagResp */
export interface OpinionPrTagResp {
  /**
   * 等级
   * @format int32
   */
  level?: number;
  /** 问题分类 */
  prTagList?: PrTagBean[];
}

/** OpinionSmPlatformBean */
export interface OpinionSmPlatformBean {
  /**
   * 数量
   * @format int64
   */
  num?: number;
  /** 来源平台（展示名或原始来源，Top10 以外汇总为「其他」） */
  platform?: string;
  /** 占比（%） */
  rate?: string;
}

/** OpinionSmPlatformResp */
export interface OpinionSmPlatformResp {
  /** 社媒来源平台分布（至多 10 项 + 其他） */
  platformList?: OpinionSmPlatformBean[];
}

/** OpinionSpuCateResp */
export interface OpinionSpuCateResp {
  /**
   * 等级
   * @format int32
   */
  level?: number;
  /** 产品分类 */
  spuCateList?: SpuCateBean[];
}

/** OpinionStatisticsResp */
export interface OpinionStatisticsResp {
  /**
   * 工单数量
   * @format int64
   */
  count?: number;
  /**
   * 待处理工单数量
   * @format int64
   */
  pendingCount?: number;
  /** 工单处理率 */
  pendingRate?: number;
  /** 标签集合 */
  tagList?: OpinionTagStatisticsResp[];
  /** 趋势统计 */
  trendList?: OpinionTrendStatisticsResp[];
}

/** OpinionTagStatisticsResp */
export interface OpinionTagStatisticsResp {
  /**
   * 工单数量
   * @format int64
   */
  count?: number;
  /** 标签分类 */
  tertiaryTag?: string;
}

/** OpinionTagTreeNodeBean */
export interface OpinionTagTreeNodeBean {
  /** 子节点列表 */
  children?: OpinionTagTreeNodeBean[];
  /** 子标签说明 */
  explanation?: string;
  /** 标签名称 */
  label?: string;
  /**
   * 标签级别 1-主标签 2-二级标签 3-三级标签
   * @format int32
   */
  level?: number;
  /** 标签值 */
  value?: string;
}

/** OpinionTagTreeReq */
export interface OpinionTagTreeReq {
  /** 来源类型 */
  source: string;
}

/** OpinionTagTreeResp */
export interface OpinionTagTreeResp {
  /** 标签树列表 */
  tagTreeList?: OpinionTagTreeNodeBean[];
}

/** OpinionTranslationResp */
export interface OpinionTranslationResp {
  /** 正文签名（opinionUniqueCode + 待译正文 的 SHA-256 十六进制）；提交成功或命中缓存时返回，供 translation/query 查询 */
  contentSignature?: string;
  /** 识别源语种，工作流未返回时可能为空 */
  sourceLang?: string;
  /** 中文译文；提交接口成功时表示本次或缓存的译文；查询接口无记录时为空 */
  translatedText?: string;
}

/** OpinionTranslationSubmitReq */
export interface OpinionTranslationSubmitReq {
  /** 待译正文，以前端传入为准 */
  content: string;
  /** 舆情唯一键，对应 t_opinion_data.unique_code */
  opinionUniqueCode: string;
}

/** OpinionTrendResp */
export interface OpinionTrendResp {
  /** 工单数量趋势 */
  priorityTrendList?: PriorityTrendBean[];
}

/** OpinionTrendStatisticsResp */
export interface OpinionTrendStatisticsResp {
  /**
   * 工单数量
   * @format int64
   */
  count?: number;
  /**
   * 日期
   * @format date
   */
  trendDate?: string;
}

/** PrTagBean */
export interface PrTagBean {
  /**
   * 等级
   * @format int32
   */
  level?: number;
  /**
   * 数量
   * @format int64
   */
  num?: number;
  /** pr标签 */
  prTag?: string;
  /** 占比 */
  rate?: number;
}

/** PriorityBean */
export interface PriorityBean {
  /**
   * 等级数量
   * @format int32
   */
  num?: number;
  /** 舆情等级 */
  priority?: string;
  rate?: number;
}

/** PriorityTrendBean */
export interface PriorityTrendBean {
  /**
   * 舆情等级
   * @format int32
   */
  priority?: number;
  /** 趋势 */
  trendList?: TrendBean[];
}

/** SpuCateBean */
export interface SpuCateBean {
  /**
   * 等级
   * @format int32
   */
  level?: number;
  /**
   * 数量
   * @format int64
   */
  num?: number;
  /** 占比 */
  rate?: number;
  /** spu分类 */
  spuCate?: string;
}

/** TrendBean */
export interface TrendBean {
  /**
   * 工单数量
   * @format int64
   */
  count?: number;
  /** 舆情等级 */
  priority?: string;
  /**
   * 日期
   * @format date
   */
  trendDate?: string;
}

/** WorkOrderInfoBean */
export interface WorkOrderInfoBean {
  /** 创建人 */
  creator?: string;
  /** 创建人头像 */
  creatorAvatar?: string;
  /** 创建人 */
  creatorName?: string;
  /**
   * 处理时限
   * @format date-time
   */
  deadlineTime?: string;
  /** 处理时限描述 例如：上周五 18:00 */
  deadlineTimeDesc?: string;
  /** 执行人 */
  executor?: string;
  /** 执行人头像 */
  executorAvatar?: string;
  /** 执行人 */
  executorName?: string;
  /**
   * 完成时间
   * @format date-time
   */
  finishTime?: string;
  /** 舆情数据唯一标识 */
  opinionUniqueCode?: string;
  /** 备注 */
  remark?: string;
  /** 处理方案集合 */
  solutionList?: WorkOrderSolutionBean[];
  /**
   * 状态
   * @format int32
   */
  status?: number;
  /** 状态描述 */
  statusDesc?: string;
  /**
   * 是否超时 1-是 0-否
   * @format int32
   */
  timeLimitFlag?: number;
  /** 工单唯一记录编码 */
  workOrderCode?: string;
}

/** WorkOrderListBean */
export interface WorkOrderListBean {
  /** 发帖人 */
  author?: string;
  /** 内容分类: 客服、社群、新闻、社媒 */
  classification?: string;
  /**
   * 评论数量
   * @format int64
   */
  comments?: number;
  /** 内容概要 */
  contentSummary?: string;
  /**
   * 浏览量
   * @format int32
   */
  coveredNum?: number;
  /** 浏览量环比 */
  coveredNumPercent?: number;
  /** 来源 */
  dataSource?: string;
  /**
   * 工单信息-处理时限
   * @format date-time
   */
  deadlineTime?: string;
  /** 工单信息-处理时限描述 例如：上周五 18:00 */
  deadlineTimeDesc?: string;
  /** 工单信息-执行人 */
  executor?: string;
  /** 工单信息-执行人头像 */
  executorAvatar?: string;
  /** 工单信息-执行人 */
  executorName?: string;
  /**
   * 粉丝数量
   * @format int64
   */
  followers?: number;
  /** 转赞评数量环比 */
  lcrPercent?: number;
  /**
   * 舆情等级 0=p0,1=p1,2=p2 3=p3 -1-无等级
   * @format int32
   */
  level?: number;
  /** `level_desc` */
  levelDesc?: string;
  /**
   * 转赞评数量
   * @format int64
   */
  likeCommentReposts?: number;
  /**
   * 点赞数量
   * @format int64
   */
  likes?: number;
  /**
   * 是否舆情管理员角色
   * @format int32
   */
  manageRoleFlag?: number;
  /** pr标签 */
  prTagStr?: string;
  /** 产品分类 */
  productTag?: string;
  /**
   * 发布时间
   * @format date-time
   */
  publishTime?: string;
  /** 国家 */
  region?: string;
  /** 工单信息-备注 */
  remark?: string;
  /**
   * 转发数量
   * @format int64
   */
  reposts?: number;
  /** 情感 */
  sentiment?: string;
  /** 情感描述 */
  sentimentDesc?: string;
  /** 工单信息-处理方案集合 */
  solutionList?: WorkOrderSolutionBean[];
  /** 工单信息-处理方案 */
  solutionStr?: string;
  /**
   * 工单信息-状态
   * @format int32
   */
  status?: number;
  /** 工单信息-状态描述 */
  statusDesc?: string;
  /**
   * 是否超时 1-是 0-否
   * @format int32
   */
  timeLimitFlag?: number;
  /** 标题 */
  title?: string;
  /** 舆情唯一编码 */
  uniqueCode?: string;
  /** 链接 */
  url?: string;
  /**
   * 是否认证 1-是
   * @format int32
   */
  verified?: number;
  /** 工单记录编码 */
  workOrderCode?: string;
}

/** WorkOrderListReq */
export interface WorkOrderListReq {
  /** 产品类别 */
  categoryList?: string[];
  classification?: string;
  /**
   * 创建日期截止
   * @format date
   */
  createDateEnd?: string;
  /**
   * 创建日期开始
   * @format date
   */
  createDateStart?: string;
  /**
   * 处理时限日期截止
   * @format date
   */
  deadLineDateEnd?: string;
  /**
   * 处理时限日期开始
   * @format date
   */
  deadLineDateStart?: string;
  /** 执行人 */
  executorList?: string[];
  /** 舆情等级 */
  levelList?: number[];
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
  /** 问题类别 */
  prTagList?: string[];
  /** 产品类型-一级 */
  productLevel1?: string[];
  /** 产品类型-二级 */
  productLevel2?: string[];
  /** 产品类型-三级 */
  productLevel3?: string[];
  /** 产品类型-四级 */
  productLevel4?: string[];
  /** 产品类型-五级 */
  productLevel5?: string[];
  /**
   * 是否有筛选产品分类
   * @format int32
   */
  productLevelFlag?: number;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 工单状态 0-处理中 1-已处理 4-无需处理 */
  status?: number[];
  /** 工单编码 */
  workOrderCode?: string;
}

/** WorkOrderListResp */
export interface WorkOrderListResp {
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
  /** 工单信息 */
  workOrderList?: WorkOrderListBean[];
}

/** WorkOrderLogBean */
export interface WorkOrderLogBean {
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 拓展信息 */
  extraInfo?: string;
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
  /** 操作人头像 */
  operatorAvatar?: string;
  /** 操作人编码 */
  operatorCode?: string;
  /** 备注 */
  remark?: string;
  /** 流水编号 */
  serialCode?: string;
  /** 处理人tip */
  tip?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /** 拆单后的工单ID */
  workOrderCode?: string;
}

/** WorkOrderLogResp */
export interface WorkOrderLogResp {
  /** 工单日志 */
  logList?: WorkOrderLogBean[];
}

/** WorkOrderOperateReq */
export interface WorkOrderOperateReq {
  /** 执行人 */
  executor?: string;
  /** 操作类型 finish-已解决 undo-无需解决 change-解决 split-拆单 */
  operateType?: string;
  /** 备注 */
  remark?: string;
  /** 工单编码 */
  workOrderCode?: string;
}

/** WorkOrderOperateResp */
export interface WorkOrderOperateResp {
  /** 工单记录编码 */
  workOrderCode?: string;
}

/** WorkOrderSaveReq */
export interface WorkOrderSaveReq {
  /** 执行人 */
  executor: string;
  /**
   * 处理时限
   * @format int32
   */
  processDeadline?: number;
  /** 备注 */
  remark?: string;
  /** 处理建议 */
  solutionList?: number[];
  /** 舆情记录编码 */
  uniqueCode?: string;
}

/** WorkOrderSaveResp */
export interface WorkOrderSaveResp {
  /** 唯一记录编码 */
  workOrderCode?: string;
}

/** WorkOrderSolutionBean */
export interface WorkOrderSolutionBean {
  /**
   * 时限
   * @format int32
   */
  deadline?: number;
  /**
   * 处理方案
   * @format int32
   */
  solution?: number;
  /** 处理方案描述 */
  solutionDesc?: string;
  /** 工单唯一记录编码 */
  workOrderCode?: string;
}

/** CommonResp«boolean» */
export interface CommonRespBoolean {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: boolean;
  traceId?: string;
}
