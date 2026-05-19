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

/** ApiPptBean */
export interface ApiPptBean {
  data?: object;
  projectId?: string;
}

/** AutoRunningWorkflowInstanceReq */
export interface AutoRunningWorkflowInstanceReq {
  /** 创建人编码 */
  creatorCode?: string;
  /** 参数 */
  data?: Record<string, object>[];
  /** 工作流编码 */
  workflowCode?: string;
}

/** BrowserPhasedResultBean */
export interface BrowserPhasedResultBean {
  /** 链接 */
  link?: string;
  /** 摘要 */
  snippet?: string;
  /** 标题 */
  title?: string;
}

/**
 * ChainOfEvidenceReportResp
 * 证据链报告
 */
export interface ChainOfEvidenceReportResp {
  /** 证据链内容列表 */
  content?: ReportSectionBean[];
  /** 节点结论结果工作流id */
  nodeExecutionId?: string;
  /**
   * 节点结论结果id
   * @format int64
   */
  resultId?: number;
  /** 证据链标题 */
  title?: string;
}

/** ConclusionResultReq */
export interface ConclusionResultReq {
  /** 证据链结果 */
  conclusionResult?: ChainOfEvidenceReportResp;
  /**
   * 节点结论结果id
   * @format int64
   */
  resultId: number;
}

/** FilePhasedResultBean */
export interface FilePhasedResultBean {
  /**
   * 时间
   * @format date-time
   */
  datetime?: string;
  /** 文件后缀 */
  ext?: string;
  /** 成果名称 */
  name?: string;
  /** 节点执行id */
  nodeExecutionId?: string;
  /** 预览url */
  previewUrl?: string;
  /** 成果类型: 文件-file */
  type?: string;
}

/** MemberSimpleBean */
export interface MemberSimpleBean {
  /** 成员头像 */
  avatar?: string;
  /** 成员编码 */
  memberCode?: string;
  /** 成员名称 */
  name?: string;
}

/** NodeDataBean */
export interface NodeDataBean {
  desc?: string;
  title?: string;
  type?: string;
  variables?: VariableBean[];
}

/** PhasedResultDetailResp */
export interface PhasedResultDetailResp {
  /** 文本内容 */
  text?: string;
}

/**
 * ReportSectionBean
 * 证据链
 */
export interface ReportSectionBean {
  /** 子项列表 */
  children?: Record<string, object>[];
  /** 标题 */
  module_name?: string;
}

/** VariableBean */
export interface VariableBean {
  label?: string;
  /** @format int32 */
  maxLength?: number;
  /** @format int32 */
  num?: number;
  options?: object[];
  required?: boolean;
  type?: string;
  variable?: string;
}

/** WorkflowBean */
export interface WorkflowBean {
  /**
   * 工作流运行时间：秒
   * @format int32
   */
  avgRunTime?: number;
  /** 创建人 */
  creators?: MemberSimpleBean[];
  /** 工作流描述 */
  description?: string;
  /** dify应用id */
  difyAppId?: string;
  /** 工作流图标 */
  icon?: string;
  /** 工作流名称 */
  name?: string;
  /**
   * 工作流运行次数
   * @format int32
   */
  runNum?: number;
  /** 工作流变量(JSON字符串) */
  variables?: string;
  /** 工作流版本 */
  version?: string;
  /** 工作流编码 */
  workflowCode?: string;
}

/** WorkflowGeneratePptReq */
export interface WorkflowGeneratePptReq {
  /** dify节点执行id */
  difyNodeExecutionId: string;
  /** 实例编码 */
  instanceCode: string;
}

/** WorkflowGeneratePptResp */
export interface WorkflowGeneratePptResp {
  /** ppt预览url */
  pptPreviewUrl?: string;
}

/** WorkflowInstanceDetailBean */
export interface WorkflowInstanceDetailBean {
  /**
   * 开始时间
   * @format date-time
   */
  beginTime?: string;
  /** 品类 */
  category?: string;
  /** 创建人 */
  creator?: string;
  /** 创建人头像 */
  creatorAvatar?: string;
  /** 创建人名字 */
  creatorName?: string;
  /** 数据任务编码 */
  dataTaskCode?: string;
  /** 数据获取任务状态 */
  dataTaskStatus?: string;
  /**
   * 结束时间
   * @format date-time
   */
  endTime?: string;
  /** 输入参数 */
  inputVariables?: object;
  /** 实例编码 */
  instanceCode?: string;
  /** 名称 */
  name?: string;
  /**
   * 状态 0-未开始 1-进行中 2-已完成 3-失败
   * @format int32
   */
  status?: number;
  /** 状态描述 */
  statusDesc?: string;
  /**
   * 工作流平均执行时间：秒
   * @format int32
   */
  workflowAvgRunTime?: number;
  /** 工作流编码 */
  workflowCode?: string;
}

/** WorkflowInstanceListBean */
export interface WorkflowInstanceListBean {
  /**
   * 开始时间
   * @format date-time
   */
  beginTime?: string;
  /** 品类 */
  category?: string;
  /** 创建人 */
  creator?: string;
  /** 创建人头像 */
  creatorAvatar?: string;
  /** 创建人名字 */
  creatorName?: string;
  /** 数据任务编码 */
  dataTaskCode?: string;
  /** 数据获取任务状态 */
  dataTaskStatus?: string;
  /**
   * 结束时间
   * @format date-time
   */
  endTime?: string;
  /** 输入参数 */
  inputVariables?: object;
  /** 实例编码 */
  instanceCode?: string;
  /** 名称 */
  name?: string;
  /**
   * 状态 0-未开始 1-进行中 2-已完成 3-失败
   * @format int32
   */
  status?: number;
  /** 状态描述 */
  statusDesc?: string;
  /**
   * 工作流平均执行时间：秒
   * @format int32
   */
  workflowAvgRunTime?: number;
}

/** WorkflowListResp */
export interface WorkflowListResp {
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
  /** 工作流列表 */
  workflowList?: WorkflowBean[];
}

/** WorkflowNodeAvgRunTimeResp */
export interface WorkflowNodeAvgRunTimeResp {
  /** 节点平均执行时间 */
  avgRunTime: number;
}

/** WorkflowNodeBean */
export interface WorkflowNodeBean {
  children?: WorkflowNodeBean[];
  data?: NodeDataBean;
  id?: string;
  type?: string;
}

/** WorkflowNodeExecutionBean */
export interface WorkflowNodeExecutionBean {
  /**
   * 创建时间
   * @format date-time
   */
  createdAt?: string;
  /** 耗时 */
  elapsedTime?: number;
  /** 错误信息 */
  error?: string;
  /**
   * 完成时间
   * @format date-time
   */
  finishedAt?: string;
  /** dify节点执行id */
  id?: string;
  /** 工作流输入 */
  inputs?: object;
  /** 节点名称 */
  name?: string;
  /** dify节点id */
  nodeId?: string;
  /** 节点类型 */
  nodeType?: string;
  /** 工作流输出 */
  outputs?: object;
  /** 工作流状态 */
  status?: string;
  /** 工作流状态 */
  statusDesc?: string;
}

/** WorkflowProjectListReq */
export interface WorkflowProjectListReq {
  /** 品类 */
  category?: string;
  /**
   * 结束日期
   * @format date
   * @example "2025-03-11"
   */
  endTime?: string;
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
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /**
   * 开始日期
   * @format date
   * @example "2025-03-04"
   */
  startTime?: string;
  /** 状态(多选) */
  status?: number[];
}

/** WorkflowProjectListResp */
export interface WorkflowProjectListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  projectList?: WorkflowInstanceListBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** WorkflowRunNodeStateResp */
export interface WorkflowRunNodeStateResp {
  /** 节点分析结论 */
  conclusionResult?: ChainOfEvidenceReportResp;
  /** 节点执行状态 */
  nodeExecutions?: WorkflowNodeExecutionBean[];
  /** 节点思考过程图 */
  processJson?: string;
}

/** WorkflowRunReq */
export interface WorkflowRunReq {
  /** 创建人编码 */
  creatorCode?: string;
  /** 输入参数 */
  inputs: object;
  /** 工作流实例编码。与工作流编码二选一传入 */
  instanceCode?: string;
  /**
   * 运行模式 0保存 1立即运行
   * @format int32
   * @example 1
   */
  mode: number;
  /** 工作流编码。与工作流实例编码二选一传入 */
  workflowCode?: string;
}

/** WorkflowRunStateBean */
export interface WorkflowRunStateBean {
  /**
   * 创建时间
   * @format date-time
   */
  createdAt?: string;
  /** 耗时 */
  elapsedTime?: number;
  /** 错误信息 */
  error?: string;
  /**
   * 完成时间
   * @format date-time
   */
  finishedAt?: string;
  /** 工作流输入 */
  inputs?: object;
  /** 工作流输出 */
  outputs?: object;
  /** 工作流状态 */
  status?: string;
  /** 工作流状态 */
  statusDesc?: string;
  /**
   * 总步骤数
   * @format int32
   */
  totalSteps?: number;
}

/** WorkflowRunStateResp */
export interface WorkflowRunStateResp {
  /** 浏览器阶段性成果 */
  browserPhasedResults?: BrowserPhasedResultBean[];
  /** 节点分析证据链结论 */
  chainOfEvidenceReports?: ChainOfEvidenceReportResp[];
  /** 工作流实例详情 */
  detail?: WorkflowInstanceDetailBean;
  /** 文件阶段性成果 */
  filePhasedResults?: FilePhasedResultBean[];
  /** 节点执行状态 */
  nodeExecutions?: WorkflowNodeExecutionBean[];
  /** 工作流运行状态 */
  state?: WorkflowRunStateBean;
  /** 工作流节点列表 */
  workflowNodes?: WorkflowNodeBean[];
}

/** WorkflowSummaryBean */
export interface WorkflowSummaryBean {
  /**
   * 新品分析平均完成时间(单位：秒)
   * @format double
   */
  analyzeAverageTime?: number;
  /**
   * 分析任务成功率
   * @format double
   */
  analyzeSuccessRate?: number;
  /**
   * 同一时间内任务成功变化率
   * @format double
   */
  analyzeSuccessRateChange?: number;
  /**
   * 已完成分析总数
   * @format int32
   */
  completedTotal?: number;
  /**
   * 同一时间内任务成功变化率
   * @format double
   */
  completedTotalRateChange?: number;
  /**
   * 进行中分析总数
   * @format int32
   */
  inProgressTotal?: number;
}

/** WorkflowSummaryResp */
export interface WorkflowSummaryResp {
  data?: WorkflowSummaryBean;
}

/** WorkflowUpdateReq */
export interface WorkflowUpdateReq {
  /** 工作流描述 */
  description: string;
  /** 图片地址path */
  icon?: string;
  /** 工作流名称 */
  name: string;
  /** 工作流编码 */
  workflowCode: string;
}

/** WorkflowVariablesResp */
export interface WorkflowVariablesResp {
  variables?: VariableBean[];
}

/** CommonResp«WorkflowSummaryResp» */
export interface CommonRespWorkflowSummaryResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: WorkflowSummaryResp;
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
