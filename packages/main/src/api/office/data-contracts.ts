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

/** AutoTaskConfigQueryResp */
export interface AutoTaskConfigQueryResp {
  /** 执行动作配置 */
  executeActionList?: ExecuteActionBean[];
  /** 触发条件配置 */
  triggerConditionList?: TriggerConditionBean[];
}

/** AutoTaskDetailResp */
export interface AutoTaskDetailResp {
  /** 执行动作，如打开灯光、电视、空调 */
  executeActionList?: ExecuteActionBean[];
  /**
   * 是否常亮 1-是 0-否
   * @format int32
   */
  keepLightFlag?: number;
  /**
   * 常亮时长分钟
   * @format int32
   */
  keepMinutes?: number;
  /** 任务编码 */
  taskCode?: string;
  /** 任务名称 */
  taskName?: string;
  /**
   * 任务开始执行时间
   * @format date-time
   */
  taskStartTime?: string;
  /** 触发条件，会议开始前/会议开始后互斥仅选一个 */
  triggerConditionList?: TriggerConditionBean[];
}

/** AutoTaskListBean */
export interface AutoTaskListBean {
  /** 执行动作 */
  executeActionStr?: string;
  /** 拓展信息 */
  extraInfo?: string;
  /**
   * 最新运行时间
   * @format date-time
   */
  lastRunTime?: string;
  /** 运行状态: paused/running/toRunning/close */
  runStatus?: string;
  /** 运行状态描述 */
  runStatusDesc?: string;
  /** 任务编码 */
  taskCode?: string;
  /**
   * 任务执行时间(计划执行时间)
   * @format date-time
   */
  taskExecuteTime?: string;
  /**
   * 任务锁定时间(分钟)
   * @format int32
   */
  taskLockDelay?: number;
  /** 任务名称 */
  taskName?: string;
  /** 触发条件 */
  triggerConditionStr?: string;
  /** 触发条件表达式 */
  triggerExpression?: string;
}

/** AutoTaskListQueryReq */
export interface AutoTaskListQueryReq {
  /** 关键词 任务名称 */
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
  /** 运行状态 */
  status?: string;
  /** 运行状态集合 */
  statusList?: string[];
}

/** AutoTaskListQueryResp */
export interface AutoTaskListQueryResp {
  /** 自动任务集合 */
  autoTaskList?: AutoTaskListBean[];
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

/** AutoTaskLogBean */
export interface AutoTaskLogBean {
  /** 日程id */
  calendarId?: string;
  /** 日程title */
  calendarTitle?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 详情 */
  detail?: string;
  /** 失败原因 */
  errorMsg?: string;
  /** 执行动作配置 */
  executeActionStr?: string;
  /** 会议id */
  roomId?: string;
  /** 会议室信息 */
  roomStr?: string;
  /**
   * 运行时长
   * @format int64
   */
  runTime?: number;
  /** 流水编码 */
  serialCode?: string;
  /** 执行状态: success/fail/conflict */
  status?: string;
  /** 执行状态 */
  statusDesc?: string;
  /** 任务编码 */
  taskCode?: string;
  /**
   * 任务执行时间
   * @format date-time
   */
  taskExecuteTime?: string;
  /**
   * 任务锁定时间(分钟)
   * @format int32
   */
  taskLockDelay?: number;
  /** 任务名称 */
  taskName?: string;
  /** 触发条件配置 */
  triggerConditionStr?: string;
  /** 触发条件表达式 */
  triggerExpression?: string;
  /** 触发源 */
  triggerSourceStr?: string;
}

/** AutoTaskLogResp */
export interface AutoTaskLogResp {
  /** 自动化任务明细流水 */
  autoTaskLogList?: AutoTaskLogBean[];
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

/** AutoTaskOperateReq */
export interface AutoTaskOperateReq {
  /** 操作类型 stop-暂停 recovery-恢复 close-关闭 */
  operateType?: string;
  /** 任务编码 */
  taskCode?: string;
}

/** AutoTaskSaveReq */
export interface AutoTaskSaveReq {
  /** 执行动作，如打开灯光、电视、空调 */
  executeActionList?: ExecuteActionBean[];
  /**
   * 是否常亮 1-是 0-否
   * @format int32
   */
  keepLightFlag?: number;
  /**
   * 常亮时长分钟
   * @format int32
   */
  keepMinutes?: number;
  /** 任务编码 */
  taskCode?: string;
  /** 任务名称 */
  taskName?: string;
  /**
   * 任务开始执行时间
   * @format date-time
   */
  taskStartTime?: string;
  /** 触发条件，会议开始前/会议开始后互斥仅选一个。为空时表示无触发条件任务，按任务开始执行时间执行一次 */
  triggerConditionList?: TriggerConditionBean[];
}

/** AutoTaskSaveResp */
export interface AutoTaskSaveResp {
  /** 消息 */
  message?: string;
  /** 是否成功 */
  success?: boolean;
  /** 任务编码 */
  taskCode?: string;
}

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

/** CalendarDayListBean */
export interface CalendarDayListBean {
  /** 日程日期 */
  calendarDay?: string;
  /** 日程集合 */
  calendarList?: CalendarListBean[];
}

/** CalendarListBean */
export interface CalendarListBean {
  /** 日历ID */
  calendarId?: string;
  /**
   * 截止时间
   * @format date-time
   */
  endTime?: string;
  /** 闪记集合 */
  flashMinutesList?: FlashMinutesBean[];
  /**
   * 是否直属上级 1-是 0-否
   * @format int32
   */
  leaderFlag?: number;
  /** 直属领导名称 */
  leaderName?: string;
  /**
   * 会议纪要 1-有 0-无
   * @format int32
   */
  meetingSummaryFlag?: number;
  /**
   * 开始时间
   * @format date-time
   */
  startTime?: string;
  /** 标题 */
  title?: string;
}

/** CalendarListReq */
export interface CalendarListReq {
  /** 日维度-日程日期 */
  calendarDate?: string;
  /** 维度 day-日 week-周 month-月 */
  dimension?: string;
  /** 月纬度-月结束日期 */
  monthEndDate?: string;
  /** 月纬度-月开始日期 */
  monthStartDate?: string;
  /** 订阅类型 1-我的日历 2-上级 */
  subscribeTypeList?: number[];
  /** 周维度-周结束日期 */
  weekEndDate?: string;
  /** 周维度-周开始日期 */
  weekStartDate?: string;
}

/** CalendarListResp */
export interface CalendarListResp {
  /** 日程列表集合 */
  calendarDayList?: CalendarDayListBean[];
}

/** CalendarUserSubscribeBean */
export interface CalendarUserSubscribeBean {
  /** 员工编码 */
  memberCode?: string;
  /**
   * 订阅类型
   * @format int32
   */
  subscribeType?: number;
}

/** CalendarUserSubscribeReq */
export interface CalendarUserSubscribeReq {
  /** 员工编码 */
  memberCode?: string;
}

/** CalendarUserSubscribeResp */
export interface CalendarUserSubscribeResp {
  /** 日程用户订阅 */
  userSubscribeList?: CalendarUserSubscribeBean[];
}

/** CalendarUserSubscribeSaveReq */
export interface CalendarUserSubscribeSaveReq {
  /** 员工编码 */
  memberCode?: string;
  /**
   * 订阅类型 1-我的日历 2-上级
   * @format int32
   */
  subscribeType?: number;
}

/** CheckRejectRecordResp */
export interface CheckRejectRecordResp {
  /** 驳回记录 */
  checkRejectRecordList?: CheckRejectRecordBean[];
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

/** DesignBrandBean */
export interface DesignBrandBean {
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 品牌编码 */
  designBrandCode?: string;
  /** 品牌名称 */
  name?: string;
  /**
   * 状态 0-关闭 1-激活
   * @format int32
   */
  status?: number;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** DesignBrandDetailResp */
export interface DesignBrandDetailResp {
  /** 记录编码 */
  designBrandCode?: string;
  /** 品牌名称 */
  name?: string;
  /**
   * 状态 0-关闭 1-激活
   * @format int32
   */
  status?: number;
}

/** DesignBrandListQueryResp */
export interface DesignBrandListQueryResp {
  code?: string;
  /** 品牌集合 */
  designBrandList?: DesignBrandBean[];
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

/** DesignBrandSaveReq */
export interface DesignBrandSaveReq {
  /** 记录编码 */
  designBrandCode?: string;
  /** 品牌名称 */
  name: string;
  /**
   * 状态 0-关闭 1-激活
   * @format int32
   */
  status: number;
}

/** DesignDeptBean */
export interface DesignDeptBean {
  childDept?: DesignDeptBean;
  /** @format int64 */
  deptId?: number;
}

/** DesignDeptStatisticBean */
export interface DesignDeptStatisticBean {
  /** @format int32 */
  ataskNum?: number;
  /** @format int32 */
  btaskNum?: number;
  /** @format int32 */
  ctaskNum?: number;
  /** 部门编码 */
  deptCode?: string;
  /** 部门 */
  deptName?: string;
  /**
   * 综合好评度
   * @format double
   */
  evaluation?: number;
  /**
   * 准时率
   * @format double
   */
  punctualityRate?: number;
  /** @format int32 */
  staskNum?: number;
  /**
   * 总分
   * @format double
   */
  sumScore?: number;
  /**
   * 验收总任务数量
   * @format int32
   */
  taskNum?: number;
  /**
   * 非年归项目
   * @format int32
   */
  unYearProjectNum?: number;
}

/** DesignDeptStatisticResp */
export interface DesignDeptStatisticResp {
  /** 部门总统计集合 */
  designDeptStatisticList?: DesignDeptStatisticBean[];
}

/** DesignItemTypeAuthResp */
export interface DesignItemTypeAuthResp {
  /**
   * 二期项目类型设计任务查看权限 1-有 0-没有
   * @format int32
   */
  secondStageItemTypeAuth?: number;
}

/** DesignOperationGroupBean */
export interface DesignOperationGroupBean {
  /**
   * 部门id
   * @format int64
   */
  deptId?: number;
  /** 运营组名称 */
  name?: string;
  /** 运营组编码 */
  operatorGroupCode?: string;
  /** 运营组编码集合 */
  operatorGroupCodeList?: string[];
}

/** DesignOperationGroupDetailResp */
export interface DesignOperationGroupDetailResp {
  /**
   * 运营部门id
   * @format int64
   */
  deptId?: number;
  /** 运营部门父级结构树 */
  deptIdList?: number[];
  /** 设计师 */
  designerCodeList?: string[];
  /**
   * 项目类型
   * @format int32
   */
  itemType?: number;
  /** 分组 */
  name?: string;
  /** operator_group_code */
  operatorGroupCode?: string;
  /**
   * 状态 0-关闭 1-激活
   * @format int32
   */
  status?: number;
}

/** DesignOperationGroupListQueryResp */
export interface DesignOperationGroupListQueryResp {
  code?: string;
  /** 配置类型及通知集合 */
  designOperationGroupList?: DesignOperationGroupQueryBean[];
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

/** DesignOperationGroupQueryBean */
export interface DesignOperationGroupQueryBean {
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 运营部门父级结构树 */
  dept?: DesignDeptBean;
  /**
   * 运营部门id
   * @format int64
   */
  deptId?: number;
  /** 设计师 */
  designers?: string;
  /**
   * 项目类型
   * @format int32
   */
  itemType?: number;
  /** 分组 */
  name?: string;
  /** operator_group_code */
  operatorGroupCode?: string;
  /**
   * 状态 0-关闭 1-激活
   * @format int32
   */
  status?: number;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** DesignOperationGroupSaveReq */
export interface DesignOperationGroupSaveReq {
  /**
   * 运营部门
   * @format int64
   */
  deptId: number;
  /** 设计师  逗号分割 */
  designers: string;
  /**
   * 项目类型
   * @format int32
   */
  itemType: number;
  /** operator_group_code */
  operatorGroupCode?: string;
  /**
   * 状态 0-关闭 1-激活
   * @format int32
   */
  status: number;
}

/** DesignPdtLevelBean */
export interface DesignPdtLevelBean {
  /** 记录编码 */
  designPdtLevelCode?: string;
  /** 等级名称 */
  name?: string;
  /**
   * 序号
   * @format int32
   */
  sort?: number;
}

/** DesignPdtLevelListResp */
export interface DesignPdtLevelListResp {
  /** 产品等级集合 */
  designPdtLevelList?: DesignPdtLevelBean[];
}

/** DesignScoreBean */
export interface DesignScoreBean {
  /** 记录编码 */
  designScoreCode?: string;
  /** 名称 */
  name?: string;
  /**
   * 数量
   * @format int32
   */
  num?: number;
  /** 分数 */
  score?: number;
}

/** DesignScoreDetailResp */
export interface DesignScoreDetailResp {
  /** 设计周期 */
  designPeriod?: string;
  /** 记录编码 */
  designScoreCode?: string;
  /**
   * 项目类型
   * @format int32
   */
  itemType?: number;
  /** 名称 */
  name?: string;
  /** 项目等级 */
  projectLevel?: string;
  /** 项目等级名称 */
  projectLevelName?: string;
  /** 分数 */
  score?: number;
  /** 编号 */
  serialCode?: string;
  /**
   * status
   * @format int32
   */
  status?: number;
  /** 任务类别 */
  type?: string;
  /** 任务类别名称 */
  typeName?: string;
}

/** DesignScoreListQueryResp */
export interface DesignScoreListQueryResp {
  code?: string;
  /** 设计分数集合 */
  designScoreList?: DesignScoreQueryBean[];
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

/** DesignScoreQueryBean */
export interface DesignScoreQueryBean {
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 设计周期 */
  designPeriod?: string;
  /** 记录编码 */
  designScoreCode?: string;
  /**
   * 项目类型
   * @format int32
   */
  itemType?: number;
  /** 名称 */
  name?: string;
  /** 项目等级 */
  projectLevel?: string;
  /** 项目等级名称 */
  projectLevelName?: string;
  /**
   * 分数
   * @format double
   */
  score?: number;
  /** 编号 */
  serialCode?: string;
  /**
   * status
   * @format int32
   */
  status?: number;
  /** 任务类别 */
  type?: string;
  /** 任务类别名称 */
  typeName?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** DesignScoreSaveReq */
export interface DesignScoreSaveReq {
  /**
   * 设计周期
   * @minLength 0
   * @maxLength 225
   */
  designPeriod?: string;
  /** 记录编码 */
  designScoreCode?: string;
  /**
   * 项目类型
   * @format int32
   */
  itemType: number;
  /** 名称 */
  name: string;
  /** 项目等级 */
  projectLevel?: string;
  /** 分数 */
  score: number;
  /** 编号 */
  serialCode?: string;
  /**
   * 状态 0-关闭 1-激活
   * @format int32
   */
  status: number;
  /** 任务类别 */
  type?: string;
}

/** DesignScoreStatisticBean */
export interface DesignScoreStatisticBean {
  /** 任务评分 */
  acceptScore?: string;
  /** 品牌名称 */
  brandName?: string;
  /** 合同编码 */
  contractCodeList?: string[];
  /**
   * 创建时间
   * @format date
   */
  createDate?: string;
  /** 设计师 */
  designer?: string;
  /** 用户满意度得分 */
  designerScore?: number;
  /**
   * 能效
   * @format int32
   */
  efficient?: number;
  /**
   * 截止时间
   * @format date
   */
  endDate?: string;
  /**
   * 完成时间
   * @format date
   */
  finishDate?: string;
  /** 创建人 */
  initiator?: string;
  /** 项目标签 */
  itemTag?: string;
  /** 任务类型 */
  itemTypeDesc?: string;
  /** 项目等级 */
  levelDesc?: string;
  /** 任务名称 */
  name?: string;
  /** 得分 */
  score?: string;
  /** 二级部门名称 */
  secondDeptName?: string;
  /**
   * 开始时间
   * @format date
   */
  startDate?: string;
  /** 任务进度 */
  statusDesc?: string;
  /**
   * 提交时间
   * @format date
   */
  submitDate?: string;
  /** 任务内容 */
  taskInfo?: string;
  /** 项目类型 */
  taskTypeDesc?: string;
  /** 加急状态 */
  urgentDesc?: string;
}

/** DesignScoreStatisticReq */
export interface DesignScoreStatisticReq {
  /** 设计类型 brand_design-品牌设计部 experience_design-体验设计部 creative_design-创意设计部 industrial_design-工业设计部 old_design-一期任务 */
  designType?: string;
  /** 设计师编码 */
  designerCode?: string;
  /**
   * 结束日期
   * @format date
   */
  endDate?: string;
  /** 设计类型 brand_design-品牌设计部 experience_design-体验设计部 creative_design-创意设计部 industrial_design-工业设计部 old_design-一期任务 */
  itemType?: string;
  /** 关键词 任务名称/合同编码 */
  keyword?: string;
  /** 任务名称 */
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
  /** 选择日期 */
  selectDate?: string;
  /**
   * 开始日期
   * @format date
   */
  startDate?: string;
  /**
   * 状态
   * @format int32
   */
  status?: number;
}

/** DesignScoreStatisticResp */
export interface DesignScoreStatisticResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 分数统计集合 */
  scoreStatisticList?: DesignScoreStatisticBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** DesignTaskBean */
export interface DesignTaskBean {
  /** 设计任务名称 */
  names?: string[];
  /** 日期 */
  periodDate?: string;
  /**
   * 状态 1-已提交 2-设计中
   * @format int32
   */
  status?: number;
}

/** DesignTaskChangeReq */
export interface DesignTaskChangeReq {
  /** 变更原因 */
  changeRemark: string;
  /** 合同编码 */
  contractCodeList?: string[];
  /** 设计类型信息集合 认领/转让必填 */
  designScoreList?: DesignScoreBean[];
  /** 设计任务编码 */
  designTaskCode?: string;
  /**
   * 截止日期
   * @format date
   */
  endDate: string;
  /**
   * 项目类型
   * @format int32
   */
  itemType: number;
  /** 任务名称 */
  name: string;
  /** 上传文件ossKey */
  ossKeys?: UrlBean[];
  /** 产品/项目等级 */
  productLevel?: string;
  /** 任务清单 */
  productList: string;
  /** 商品spu编码集合 */
  productSpuList?: string[];
  /** 任务类型 */
  taskType?: string;
  /**
   * 是否紧急 0-否 1-是
   * @format int32
   */
  urgentFlag?: number;
}

/** DesignTaskDetailResp */
export interface DesignTaskDetailResp {
  /** 任务评价 */
  acceptEvaluate?: string;
  /** 任务评分 */
  acceptScore?: number;
  /** 审批原因  审批驳回必填 */
  approveReason?: string;
  /** 权限控制 */
  auth?: DesignTaskQueryAuthorityBean;
  /** 品牌 */
  brandCode?: string;
  /**
   * 变更时间
   * @format date
   */
  changeDate?: string;
  /**
   * 判断当前操作人是否转让设计师接收人本人，是则1，否则0
   * @format int32
   */
  changeTip?: number;
  /** 合同编码 */
  contractCodeList?: string[];
  /**
   * 创建时间
   * @format date
   */
  createDate?: string;
  /** 是否创建人 */
  creatorFlag?: boolean;
  /** 设计类型信息集合 认领/转让必填 */
  designScoreList?: DesignScoreBean[];
  /** 设计任务记录编码 */
  designTaskCode?: string;
  /** 设计师 */
  designerCode?: string;
  /** 设计师名称 */
  designerDesc?: string;
  /** 设计师集合 二期显示使用此参数-多个设计师 */
  designerInfoList?: DesignerInfoBean[];
  /** 对应设计师上传打分表后，在详情页展示附件并且可下载和预览 */
  designerScoreInfoList?: ScoreUrlBean[];
  /**
   * 截止时间
   * @format date
   */
  endDate?: string;
  /**
   * 完成日期
   * @format date
   */
  finishDate?: string;
  /** 创建人 */
  initiator?: string;
  /** 创建人名称 */
  initiatorDesc?: string;
  /** 任务标签 */
  itemTag?: string;
  /**
   * 项目类型
   * @format int32
   */
  itemType?: number;
  /** 项目类型名称 */
  itemTypeDesc?: string;
  /**
   * 最新提交时间
   * @format date
   */
  lastSubmitDate?: string;
  /** 任务名称 */
  name?: string;
  /** 角色 */
  operator?: DesignTaskOperatorBean;
  /** 运营组 */
  operatorGroupCode?: string;
  /** 附件ossKeys */
  ossKeys?: UrlBean[];
  /**
   * 产品分类
   * @format int32
   */
  productCategoryCode?: number;
  /** 商品信息 */
  productInfoList?: ProductBean[];
  /** 产品等级 */
  productLevel?: string;
  /** 任务清单 */
  productList?: string;
  /**
   * 认领日期
   * @format date
   */
  receiveDate?: string;
  /** 驳回原因  验收驳回必填 */
  rejectReason?: string;
  /**
   * 开始日期
   * @format date
   */
  startDate?: string;
  /**
   * 任务状态
   * @format int32
   */
  status?: number;
  /** 任务状态名称 */
  statusDesc?: string;
  /**
   * 提交时间
   * @format date
   */
  submitDate?: string;
  /** 任务类型 */
  taskType?: string;
  /**
   * 提示标签
   * @format int32
   */
  tip?: number;
  /** 转让设计师名称 */
  transferDesignerDesc?: string;
  /**
   * 是否紧急 0-否 1-是
   * @format int32
   */
  urgentFlag?: number;
}

/** DesignTaskFileUrlResp */
export interface DesignTaskFileUrlResp {
  /** 文件名称 */
  fileName?: string;
  /** 文件路径 */
  fileUrl?: string;
  /** 文件key */
  ossKey?: string;
}

/** DesignTaskListQueryResp */
export interface DesignTaskListQueryResp {
  /** 已提交/待认领任务集合 */
  acceptDesignTaskList?: DesignTaskQueryBean[];
  /**
   * 已提交/待认领数量
   * @format int64
   */
  acceptStatusNum?: number;
  /** 审批中任务集合 */
  approveDesignTaskList?: DesignTaskQueryBean[];
  /**
   * 审批中数量
   * @format int64
   */
  approveStatusNum?: number;
  /** 已验收任务集合 */
  checkedDesignTaskList?: DesignTaskQueryBean[];
  /**
   * 已验收数量
   * @format int64
   */
  checkedStatusNum?: number;
  code?: string;
  /**
   * 创建（提交）权限 0-无 1-有  -任务池
   * @format int32
   */
  createFlag?: number;
  /** 回收站任务集合 */
  deleteDesignTaskList?: DesignTaskQueryBean[];
  /**
   * 回收站数量
   * @format int64
   */
  deleteStatusNum?: number;
  /** 当前分类下设计师   -任务池 */
  designerList?: DesignerBean[];
  /** 设计中任务集合 */
  designingDesignTaskList?: DesignTaskQueryBean[];
  /**
   * 设计中数量
   * @format int64
   */
  designingStatusNum?: number;
  /** 待指派任务集合 */
  distributeDesignTaskList?: DesignTaskQueryBean[];
  /**
   * 待指派数量
   * @format int64
   */
  distributeStatusNum?: number;
  /** 已完成/待需求方验收任务集合 */
  finishedDesignTaskList?: DesignTaskQueryBean[];
  /**
   * 已完成数量
   * @format int64
   */
  finishedStatusNum?: number;
  message?: string;
  /** 当前员工 */
  operator?: string;
  /** 当前员工所属运营组 */
  operatorGroupCode?: string;
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
  /** 待提交任务集合 */
  unCommitDesignTaskList?: DesignTaskQueryBean[];
  /**
   * 待提交数量
   * @format int64
   */
  unCommitStatusNum?: number;
  /** 待内部验收任务集合 */
  waitInnerCheckedDesignTaskList?: DesignTaskQueryBean[];
  /**
   * 待内部验收数量
   * @format int64
   */
  waitInnerCheckedStatusNum?: number;
}

/** DesignTaskOperateReq */
export interface DesignTaskOperateReq {
  /** 任务评价 验收 */
  acceptEvaluate?: string;
  /** 任务评分 7-验收通过/12-评分 必填 */
  acceptScore?: number;
  /** 品牌 认领/转让必填 */
  brandCode?: string;
  /** 设计类型信息集合 转让必填 */
  designScoreList?: DesignScoreBean[];
  /** 设计任务编码 */
  designTaskCode: string;
  /** 设计师 指派必填 */
  designerCode?: string;
  /** 设计师编码集合 3-审批操作-必填（二期设计类型中使用）; 7-验收驳回设计任务-必填（二期的必填）; 13-内部验收驳回-必填，支持多个设计师 */
  designerCodeList?: string[];
  /**
   * 截止日期 认领/转让必填 3-审批（二期设计类型中使用）选填
   * @format date
   */
  endDate?: string;
  /** 附件 7-验收驳回附件 6-完成任务附件 6-ID、CMF设计打分文件 */
  fileList?: UrlBean[];
  /** 项目标签 3-审批操作选填 */
  itemTag?: string;
  /**
   * 项目类型 认领/转让必填 3-审批操作（二期设计类型中使用）选填
   * @format int32
   */
  itemType?: number;
  /** 任务名称 */
  name?: string;
  /**
   * 操作状态 0-审批/验收驳回/转让认领取消/内部验收驳回 1-审批/验收通过/转让认领通过/内部验收通过  审批/验收必填
   * @format int32
   */
  operateStatus?: number;
  /**
   * 操作类型 查看OperationTypeEnum 1-草稿 2-提交 3-审批 4-认领 5-转让 6-完成 7-验收 8-指派 9-删除 11-取消 12-评分 13-内部验收
   * @format int32
   */
  operateType: number;
  /** 附件ossKeys */
  ossKeys?: UrlBean[];
  /**
   * 产品分类 认领/转让必填
   * @format int32
   */
  productCategoryCode?: number;
  /** 产品等级 3-审批操作（二期设计类型中使用）选填 */
  productLevel?: string;
  /** 清单 */
  productList?: string;
  /** 商品spu编码集合 */
  productSpuList?: string[];
  /** 驳回原因  3-审批 7-验收驳回必填  13-内部验收驳回必填 */
  rejectReason?: string;
  /** 驳回原因类型 7-验收驳回必填; change-需求变更；optimize-设计优化； 参考枚举DesignTaskRejectTypeEnum */
  rejectReasonType?: string;
  /** 任务评分 6-完成操作：ID、CMF设计评分增加填写总分 */
  scoreSum?: number;
  /** 任务类型 */
  taskType?: string;
  /** 任务完成链接 6-完成 */
  taskUrl?: string;
  /** 被转让人   转让/必填 */
  transferDesignerCode?: string;
  /**
   * 加急
   * @format int32
   */
  urgentFlag?: number;
}

/** DesignTaskOperationGroupQueryResp */
export interface DesignTaskOperationGroupQueryResp {
  /** 运营组 */
  operationGroupList?: DesignOperationGroupBean[];
}

/** DesignTaskOperatorBean */
export interface DesignTaskOperatorBean {
  /** 审批人 */
  approverFlag?: boolean;
  /** 创建人 */
  creatorFlag?: boolean;
  /** 是否设计总监 */
  designDirectorFlag?: boolean;
  /** 是不是设计任务管理员 */
  designManagerFlag?: boolean;
  /** 是否设计师 */
  designerFlag?: boolean;
  /** 运营组长 */
  operateGroupLeaderFlag?: boolean;
  /** 运营经理 */
  operateManagerFlag?: boolean;
  /** 是否特定人群，暂时默认配置 文键、诗琪。(即设计组长) */
  specificEmployeesFlag?: boolean;
}

/** DesignTaskPeriodViewResp */
export interface DesignTaskPeriodViewResp {
  /** 周期设计任务 */
  designTaskPeriodList?: DesignTaskBean[];
}

/** DesignTaskQueryAuthorityBean */
export interface DesignTaskQueryAuthorityBean {
  /**
   * 审批权限 0-无 1-有
   * @format int32
   */
  approveFlag?: number;
  /**
   * 取消权限 0-无 1-有
   * @format int32
   */
  cancelFlag?: number;
  /**
   * 转让权限 0-无 1-有
   * @format int32
   */
  changeFlag?: number;
  /**
   * 变更按钮权限 0-无 1-有
   * @format int32
   */
  changeTaskFlag?: number;
  /**
   * 验收权限 0-无 1-有
   * @format int32
   */
  checkFlag?: number;
  /**
   * 验收驳回权限 0-无 1-有
   * @format int32
   */
  checkRejectFlag?: number;
  /**
   * 是否显示合同编码 0-不显示 1-显示
   * @format int32
   */
  contractShowFlag?: number;
  /**
   * 创建（提交）权限 0-无 1-有
   * @format int32
   */
  createFlag?: number;
  /**
   * 删除权限 0-无 1-有
   * @format int32
   */
  deleteFlag?: number;
  /**
   * 派发权限 0-无 1-有
   * @format int32
   */
  distributeFlag?: number;
  /**
   * 编辑权限 0-无 1-有
   * @format int32
   */
  editFlag?: number;
  /**
   * 文件访问权限 0-无 1-有
   * @format int32
   */
  fileAccessAuth?: number;
  /**
   * 完成权限 0-无 1-有
   * @format int32
   */
  finishFlag?: number;
  /**
   * 认领权限 0-无 1-有
   * @format int32
   */
  getFlag?: number;
  /**
   * 内部验收权限 0-无 1-有
   * @format int32
   */
  innerCheckFlag?: number;
  /**
   * 内部验收驳回权限 0-无 1-有
   * @format int32
   */
  innerCheckRejectFlag?: number;
  /**
   * 评分权限 0-无 1-有
   * @format int32
   */
  scoreFlag?: number;
}

/** DesignTaskQueryBean */
export interface DesignTaskQueryBean {
  /** 任务评分 */
  acceptScore?: number;
  /**
   * 变更次数
   * @format int64
   */
  changeNum?: number;
  /** 设计任务记录编码 */
  designTaskCode?: string;
  /** 设计师 */
  designerCode?: string;
  /** 设计师集合 */
  designerCodeList?: string[];
  /** 设计师名称 */
  designerDesc?: string;
  /**
   * 截止时间
   * @format date
   */
  endDate?: string;
  /** 创建人 */
  initiator?: string;
  /** 创建人名称 */
  initiatorDesc?: string;
  /** 任务标签 */
  itemTag?: string;
  /**
   * 项目类型
   * @format int32
   */
  itemType?: number;
  /** 项目类型名称 */
  itemTypeDesc?: string;
  /** 任务名称 */
  name?: string;
  /**
   * 是否旧任务 1-是 0-不是 这个目前是平面物料（新）详情页判断展示新旧详情页面使用
   * @format int32
   */
  oldTaskFlag?: number;
  /** 运营组 */
  operatorGroupCode?: string;
  /**
   * 任务状态
   * @format int32
   */
  status?: number;
  /** 任务状态名称 */
  statusDesc?: string;
  /**
   * 提示标签
   * @format int32
   */
  tip?: number;
}

/** DesignTaskSaveReq */
export interface DesignTaskSaveReq {
  /** 任务评价 验收 */
  acceptEvaluate?: string;
  /** 任务评分 验收通过必填 */
  acceptScore?: number;
  /** 品牌 */
  brandCode?: string;
  /** 合同编码集合 */
  contractCodeList?: string[];
  /** 设计类型信息集合 认领/转让必填 */
  designScoreList?: DesignScoreBean[];
  /** 设计任务编码 */
  designTaskCode?: string;
  /** 设计师 指派必填 */
  designerCode?: string;
  /**
   * 截止日期
   * @format date
   */
  endDate: string;
  /**
   * 完成时间
   * @format date-time
   */
  finishTime?: string;
  /** initiator */
  initiator?: string;
  /** 项目标签 */
  itemTag?: string;
  /**
   * 项目类型
   * @format int32
   */
  itemType: number;
  /** 任务名称 */
  name: string;
  /**
   * 操作类型 1-草稿 2-提交 10-编辑
   * @format int32
   */
  operateType: number;
  /** 运营组 */
  operatorGroupCode: string;
  /** 上传文件ossKey */
  ossKeys?: UrlBean[];
  /**
   * 产品分类
   * @format int32
   */
  productCategoryCode?: number;
  /** 产品/项目等级 */
  productLevel?: string;
  /** 任务清单 */
  productList: string;
  /** 商品spu编码集合 */
  productSpuList?: string[];
  /** 驳回原因  验收驳回必填 */
  rejectReason?: string;
  /**
   * 开始日期
   * @format date
   */
  startDate: string;
  /**
   * 任务状态
   * @format int32
   */
  status?: number;
  /** 任务类型 */
  taskType?: string;
  /** 被转让人   转让/必填 */
  transferDesignerCode?: string;
  /**
   * 是否紧急 0-否 1-是
   * @format int32
   */
  urgentFlag?: number;
}

/** DesignTaskSaveResp */
export interface DesignTaskSaveResp {
  /** 文本提示 */
  message?: string;
}

/** DesignTaskStatisticBean */
export interface DesignTaskStatisticBean {
  /**
   * 待认领
   * @format int32
   */
  accept?: number;
  /**
   * 审批中
   * @format int32
   */
  approving?: number;
  /**
   * 已检验
   * @format int32
   */
  check?: number;
  /**
   * 设计中
   * @format int32
   */
  design?: number;
  /**
   * 待需求方验收
   * @format int32
   */
  finish?: number;
  /**
   * 待内部验收
   * @format int32
   */
  innerCheck?: number;
  /**
   * 已提交
   * @format int32
   */
  submit?: number;
}

/** DesignTaskStatisticResp */
export interface DesignTaskStatisticResp {
  code?: string;
  /** 任务统计集合 */
  designTaskStatisticList?: DesignTaskStatisticBean[];
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

/** DesignTypeStatisticBean */
export interface DesignTypeStatisticBean {
  /** @format int32 */
  ataskNum?: number;
  /** @format int32 */
  btaskNum?: number;
  /** @format int32 */
  ctaskNum?: number;
  /**
   * 综合好评度
   * @format double
   */
  evaluation?: number;
  /**
   * 类型
   * @format int32
   */
  itemType?: number;
  /** 类型描述 */
  itemTypeDesc?: string;
  /**
   * 准时率
   * @format double
   */
  punctualityRate?: number;
  /** @format int32 */
  splusTaskNum?: number;
  /** @format int32 */
  staskNum?: number;
  /**
   * 总分
   * @format double
   */
  sumScore?: number;
  /**
   * 完成总任务数量
   * @format int32
   */
  taskNum?: number;
  /**
   * 非年规任务数
   * @format int32
   */
  unYearProjectNum?: number;
}

/** DesignTypeStatisticResp */
export interface DesignTypeStatisticResp {
  /** 类型统计数据集合 */
  designTypeStatisticList?: DesignTypeStatisticBean[];
}

/** DesignerBean */
export interface DesignerBean {
  /** 设计师编码 */
  designer?: string;
  /** 设计师名称 */
  designerDesc?: string;
}

/** DesignerListResp */
export interface DesignerListResp {
  /** 设计师集合 */
  designerList?: DesignerBean[];
}

/** DesignerStatisticBean */
export interface DesignerStatisticBean {
  /**
   * 团队贡献比率
   * @format double
   */
  contributionRate?: number;
  /** 设计师编码 */
  designTaskCode?: string;
  /** 设计师 */
  designer?: string;
  /** 设计师编码 */
  designerCode?: string;
  /** 综合好评度 */
  evaluation?: number;
  /**
   * 设计中任务数
   * @format int32
   */
  goingTaskNum?: number;
  /** 准确率 */
  punctualityRate?: number;
  /**
   * 个人任务负荷
   * @format double
   */
  selfRate?: number;
  /** 总分 */
  sumScore?: number;
  /**
   * 验收总任务数
   * @format int32
   */
  taskNum?: number;
}

/** DesignerStatisticReq */
export interface DesignerStatisticReq {
  /**
   * 结束日期
   * @format date
   */
  endDate?: string;
  /**
   * 项目类型
   * @format int32
   */
  itemType?: number;
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
   * 开始日期
   * @format date
   */
  startDate?: string;
}

/** DesignerStatisticResp */
export interface DesignerStatisticResp {
  code?: string;
  /** 设计师分析集合 */
  designerStatisticList?: DesignerStatisticBean[];
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

/** DeviceActionCapabilityConfigBean */
export interface DeviceActionCapabilityConfigBean {
  /** 配置值 */
  configValueList?: DeviceCapabilityConfigValueBean[];
  /** 参数说明 */
  paramDesc?: string;
  /** 参数key */
  paramKey?: string;
}

/** DeviceActionInfoBean */
export interface DeviceActionInfoBean {
  /** 动作 */
  action?: string;
  /** 动作描述 */
  actionName?: string;
  /** 参数配置 */
  capabilityConfigList?: DeviceActionCapabilityConfigBean[];
  /**
   * 排序
   * @format int32
   */
  sort?: number;
}

/** DeviceCapabilityConfigValueBean */
export interface DeviceCapabilityConfigValueBean {
  /** 取值key */
  key?: string;
  /** 取值描述 */
  value?: object;
}

/** DeviceControlReq */
export interface DeviceControlReq {
  /** 设备编码 */
  deviceCode: string;
  /** 执行命令 开关 开:turn_on 关：turn_off */
  operate?: string;
}

/** DeviceControlResp */
export interface DeviceControlResp {
  /** 消息 */
  message?: string;
  /** 是否成功 */
  success?: boolean;
}

/** DeviceCountBean */
export interface DeviceCountBean {
  /**
   * 设备数量
   * @format int64
   */
  deviceNum?: number;
  /** 设备在线率 */
  deviceOnlineRate?: number;
  /** 设备类型 */
  deviceType?: string;
  /**
   * 离线设备数量
   * @format int64
   */
  offlineNum?: number;
  /**
   * 在线设备数量
   * @format int64
   */
  onlineNum?: number;
}

/** DeviceCountResp */
export interface DeviceCountResp {
  /** 设备在线情况 */
  deviceCountList?: DeviceCountBean[];
  /**
   * 总设备数量
   * @format int64
   */
  deviceNum?: number;
  /**
   * 离线设备数量
   * @format int64
   */
  offlineNum?: number;
  /**
   * 在线设备数量
   * @format int64
   */
  onlineNum?: number;
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

/** DictQueryResp */
export interface DictQueryResp {
  /** 字典结果Map, key = 字典编码, value = 具体值集合 */
  dictMap?: Record<string, DictResp[]>;
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

/** ExecuteActionBean */
export interface ExecuteActionBean {
  /** 操作值: turn_on-打开, turn_off-关闭 */
  actionValue?: string;
  /** 设备类型: light-灯光, tv-电视, air_conditioner-空调 */
  deviceType?: string;
  /** 设备类型描述 */
  name?: string;
  /** 单选多选下拉框值 */
  selectValueList?: FlowDictBean[];
  /**
   * 排序
   * @format int32
   */
  sort?: number;
  /**
   * 类型: 0-单选 1-多选 -1-无
   * @format int32
   */
  type?: number;
}

/** ExecuteNumHourBean */
export interface ExecuteNumHourBean {
  /**
   * 执行数量
   * @format int32
   */
  executeNum?: number;
  /**
   * 执行时间
   * @format int32
   */
  hour?: number;
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

/** FortuneCardReq */
export interface FortuneCardReq {
  /** 员工编码 */
  memberCode?: string;
}

/** FortuneCardResp */
export interface FortuneCardResp {
  fortuneCardLink?: string;
}

/** GenerateAutoTaskCodeResp */
export interface GenerateAutoTaskCodeResp {
  /** 任务编码 */
  taskCode?: string;
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

/** MeetingDeviceBean */
export interface MeetingDeviceBean {
  /** 品牌 */
  brand?: string;
  /** 能力配置(JSON字符串) */
  capabilityConfig?: string;
  /** 支持的操作列表(JSON字符串) */
  capabilityList?: string;
  /** 设备唯一编码 */
  deviceCode?: string;
  /** 设备类型 */
  deviceType?: string;
  /** 设别描述 */
  deviceTypeDesc?: string;
  /**
   * 主键ID
   * @format int64
   */
  id?: number;
  /**
   * 最后在线时间
   * @format date-time
   */
  lastSeen?: string;
  /** 位置描述 */
  location?: string;
  /** MAC地址 */
  macAddress?: string;
  /** 所属会议室 */
  meetingRoomList?: MeetingRoomBean[];
  /** 型号 */
  model?: string;
  /** 设备名称 */
  name?: string;
  /** 在线状态：online/offline/unknown */
  onlineStatus?: string;
  /** 在线状态描述 */
  onlineStatusDesc?: string;
  /** 当前状态 on-开 off-关 */
  state?: string;
}

/** MeetingDeviceDetailResp */
export interface MeetingDeviceDetailResp {
  /** 支持的操作 当前默认支持开关 */
  actionList?: DeviceActionInfoBean[];
  /** 品牌 */
  brand?: string;
  /** 能力配置(JSON字符串) */
  capabilityConfig?: string;
  /** 支持的操作列表(JSON字符串) */
  capabilityList?: string;
  /** 公司编码 */
  companyCode?: string;
  /** 设备唯一编码 */
  deviceCode?: string;
  /** 设备类型 */
  deviceType?: string;
  /** 设备类型描述 */
  deviceTypeDesc?: string;
  /**
   * 主键ID
   * @format int64
   */
  id?: number;
  /**
   * 最后在线时间
   * @format date-time
   */
  lastSeen?: string;
  /** 位置描述 */
  location?: string;
  /** MAC地址 */
  macAddress?: string;
  /** 所属会议室 */
  meetingRoomList?: MeetingRoomBean[];
  /** 型号 */
  model?: string;
  /** 设备名称 */
  name?: string;
  /** 在线状态：online/offline/unknown */
  onlineStatus?: string;
  /** 在线状态描述 */
  onlineStatusDesc?: string;
  /** 当前状态 */
  state?: string;
}

/** MeetingDeviceListQueryReq */
export interface MeetingDeviceListQueryReq {
  /** 设备名称/设备编码 */
  keyword?: string;
  /** 在线状态 online/offline */
  onlineStatus?: string;
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
  /** 会议室id */
  roomId?: string;
}

/** MeetingDeviceListQueryResp */
export interface MeetingDeviceListQueryResp {
  code?: string;
  /** 设备列表 */
  meetingDeviceList?: MeetingDeviceBean[];
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

/** MeetingRoomBean */
export interface MeetingRoomBean {
  /** 会议室id */
  roomId?: string;
  /** 会议室名称 */
  roomName?: string;
}

/** ProductBean */
export interface ProductBean {
  /** 商品名称 */
  productName?: string;
  /** 商品spu */
  productSpu?: string;
}

/** RecentlyItemTypeResp */
export interface RecentlyItemTypeResp {
  /** 项目类型 */
  itemType?: string;
  /** 项目类型名称 */
  itemTypeName?: string;
}

/** ScoreUrlBean */
export interface ScoreUrlBean {
  /** 设计师编码 */
  designerCode?: string;
  /** 设计师名称 */
  designerDesc?: string;
  /** 任务总评分 */
  scoreSum?: number;
  /** 评分文件 */
  urlList?: ScoreUrlDetailBean[];
}

/** ScoreUrlDetailBean */
export interface ScoreUrlDetailBean {
  /** 分数附件名称 */
  name?: string;
  /** 分数附件ossKey */
  ossKey?: string;
  /** 评分附件完整url */
  scoreUrl?: string;
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

/** TaskExecuteCountResp */
export interface TaskExecuteCountResp {
  /**
   * 当日执行数量
   * @format int32
   */
  executeNum?: number;
  /** 按时间统计当日的执行数量 */
  executeNumHourList?: ExecuteNumHourBean[];
  /** 与昨日的执行数量环比 */
  executeRate?: number;
}

/** TaskSuccessRateResp */
export interface TaskSuccessRateResp {
  /**
   * 异常数量
   * @format int32
   */
  exceptionTaskNum?: number;
  /** 任务成功率 */
  successTaskRate?: number;
}

/** TodayInsightsResp */
export interface TodayInsightsResp {
  /** 工单编码 */
  workflowCode?: string;
  /** 工单内容 */
  workflowContent?: string;
  /** 标题 */
  workflowSubject?: string;
}

/** TriggerConditionBean */
export interface TriggerConditionBean {
  /** 条件key，如 BEFORE_MEETING_START、AFTER_MEETING_START、SENSOR，后续扩展其他 key */
  key?: string;
  /** 条件名称 会议开始前；会议开始后；传感器感应无人 */
  name?: string;
  /** 条件 value，类型依 key 而定，如分钟数为 Integer */
  value?: object;
}

/** UrlBean */
export interface UrlBean {
  /** 附件名称 */
  name?: string;
  /** 附件ossKey */
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

/** UserSatisfactionBean */
export interface UserSatisfactionBean {
  /**
   * 用户满意度平均分
   * @format double
   */
  acceptAvgScore?: number;
  /** 用户满意度等级 */
  acceptLevel?: string;
  /** 设计师 */
  designer?: string;
  /** 设计师编码 */
  designerCode?: string;
  /**
   * 准时率
   * @format double
   */
  punctualityRate?: number;
  /**
   * 评分次数
   * @format int32
   */
  scoreNum?: number;
}

/** UserSatisfactionReq */
export interface UserSatisfactionReq {
  /** 关键词 */
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
  /** 年份 */
  selectDate?: string;
}

/** UserSatisfactionResp */
export interface UserSatisfactionResp {
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
  /** 用户满意度评价集合 */
  userSatisfactionList?: UserSatisfactionBean[];
}

/** UserSaveReq */
export type UserSaveReq = object;

/** UserSaveResp */
export interface UserSaveResp {
  /** @format int64 */
  id?: number;
}

/** checkRejectRecordBean */
export interface CheckRejectRecordBean {
  /**
   * 驳回时间
   * @format date-time
   */
  createTime?: string;
  /** 设计师 */
  designers?: string;
  /** 附件 完整路径，调用查路径接口 */
  fileList?: UrlBean[];
  /** 驳回人 */
  operatorName?: string;
  /** 驳回意见 */
  reason?: string;
  /** 驳回原因 */
  reasonTypeDesc?: string;
  /** 被驳回前状态 */
  statusDesc?: string;
}

/** designerInfoBean */
export interface DesignerInfoBean {
  /** 合同编码 */
  contractCodeList?: string[];
  /** 设计师编码 */
  designerCode?: string;
  /** 设计师名称 */
  designerDesc?: string;
  /**
   * 状态
   * @format int32
   */
  status?: number;
  /** 状态描述 */
  statusDesc?: string;
  /** 任务完成附件 */
  taskFinishedFileList?: UrlBean[];
  /** 任务完成链接 */
  taskUrl?: string;
  /** 转让设计师编码 */
  transferDesignerCode?: string;
  /** 转让设计师名称 */
  transferDesignerDesc?: string;
}

/** flashMinutesBean */
export interface FlashMinutesBean {
  /** 闪记标题 */
  title?: string;
  /** 闪记链接 */
  url?: string;
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

/** CommonResp«string» */
export interface CommonRespString {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: string;
  traceId?: string;
}
