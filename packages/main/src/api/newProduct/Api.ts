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

import {
  ApiPptBean,
  AutoRunningWorkflowInstanceReq,
  CommonRespBoolean,
  CommonRespWorkflowSummaryResp,
  ConclusionResultReq,
  PhasedResultDetailResp,
  WorkflowBean,
  WorkflowGeneratePptReq,
  WorkflowGeneratePptResp,
  WorkflowInstanceDetailBean,
  WorkflowInstanceListBean,
  WorkflowListResp,
  WorkflowNodeAvgRunTimeResp,
  WorkflowProjectListReq,
  WorkflowProjectListResp,
  WorkflowRunNodeStateResp,
  WorkflowRunReq,
  WorkflowRunStateResp,
  WorkflowUpdateReq,
  WorkflowVariablesResp,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags 新品机会项目
   * @name LuteosAiNpoProjectConfirmConclusion
   * @summary 确认结论
   * @request POST:/api/luteos/ai/npo/project/confirmConclusion
   * @response `200` `CommonRespBoolean` OK
   */
  luteosAiNpoProjectConfirmConclusion = (req: ConclusionResultReq, params: RequestParams = {}) =>
    this.request<CommonRespBoolean, any>({
      path: `/api/luteos/ai/npo/project/confirmConclusion`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 新品机会项目
   * @name LuteosAiNpoProjectDeleteProject
   * @summary 删除项目
   * @request DELETE:/api/luteos/ai/npo/project/deleteProject/{instanceCode}
   * @response `200` `CommonRespBoolean` OK
   */
  luteosAiNpoProjectDeleteProject = (instanceCode: string, params: RequestParams = {}) =>
    this.request<CommonRespBoolean, any>({
      path: `/api/luteos/ai/npo/project/deleteProject/${instanceCode}`,
      method: 'DELETE',
      ...params,
    });
  /**
   * No description
   *
   * @tags 新品机会项目
   * @name LuteosAiNpoProjectDetail
   * @summary 项目详情
   * @request GET:/api/luteos/ai/npo/project/detail
   * @response `200` `WorkflowInstanceDetailBean` OK
   */
  luteosAiNpoProjectDetail = (
    query: {
      /** 工作流实例编码 */
      instanceCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<WorkflowInstanceDetailBean, any>({
      path: `/api/luteos/ai/npo/project/detail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 新品机会项目
   * @name LuteosAiNpoProjectGenerateExcel
   * @summary 导出excle
   * @request GET:/api/luteos/ai/npo/project/generateExcel
   * @response `200` `void` OK
   */
  luteosAiNpoProjectGenerateExcel = (
    query: {
      /** dify节点执行id */
      difyNodeExecutionId: string;
      /** 实例编码 */
      instanceCode?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/luteos/ai/npo/project/generateExcel`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 新品机会项目
   * @name LuteosAiNpoProjectGetPptInfo
   * @summary 获取ppt
   * @request GET:/api/luteos/ai/npo/project/getPptInfo
   * @response `200` `ApiPptBean` OK
   */
  luteosAiNpoProjectGetPptInfo = (
    query?: {
      data?: object;
      projectId?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<ApiPptBean, any>({
      path: `/api/luteos/ai/npo/project/getPptInfo`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 新品机会项目
   * @name LuteosAiNpoProjectGettingDataState
   * @summary 查看项目数据获取情况
   * @request GET:/api/luteos/ai/npo/project/gettingDataState
   * @response `200` `WorkflowRunStateResp` OK
   */
  luteosAiNpoProjectGettingDataState = (
    query: {
      /** 工作流实例编码 */
      instanceCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<WorkflowRunStateResp, any>({
      path: `/api/luteos/ai/npo/project/gettingDataState`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 新品机会项目
   * @name LuteosAiNpoProjectList
   * @summary 项目运行列表
   * @request POST:/api/luteos/ai/npo/project/list
   * @response `200` `WorkflowProjectListResp` OK
   */
  luteosAiNpoProjectList = (req: WorkflowProjectListReq, params: RequestParams = {}) =>
    this.request<WorkflowProjectListResp, any>({
      path: `/api/luteos/ai/npo/project/list`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 新品机会项目
   * @name LuteosAiNpoProjectModifyName
   * @summary 修改项目名称
   * @request POST:/api/luteos/ai/npo/project/modifyName
   * @response `200` `CommonRespBoolean` OK
   */
  luteosAiNpoProjectModifyName = (
    query: {
      /** 工作流实例编码 */
      instanceCode: string;
      /** 项目名称 */
      name?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespBoolean, any>({
      path: `/api/luteos/ai/npo/project/modifyName`,
      method: 'POST',
      query: query,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 新品机会项目
   * @name LuteosAiNpoProjectNodeAvgRunTime
   * @summary 节点平均执行时间
   * @request GET:/api/luteos/ai/npo/project/nodeAvgRunTime
   * @response `200` `WorkflowNodeAvgRunTimeResp` OK
   */
  luteosAiNpoProjectNodeAvgRunTime = (
    query: {
      /** 工作流实例编码 */
      instanceCode: string;
      /** 运行节点ID */
      nodeId: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<WorkflowNodeAvgRunTimeResp, any>({
      path: `/api/luteos/ai/npo/project/nodeAvgRunTime`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 新品机会项目
   * @name LuteosAiNpoProjectNodeState
   * @summary 查看项目节点运行情况
   * @request GET:/api/luteos/ai/npo/project/nodeState
   * @response `200` `WorkflowRunNodeStateResp` OK
   */
  luteosAiNpoProjectNodeState = (
    query: {
      /** 工作流实例编码 */
      instanceCode: string;
      /** 节点标识 */
      nodeTitlePrefix: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<WorkflowRunNodeStateResp, any>({
      path: `/api/luteos/ai/npo/project/nodeState`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 新品机会项目
   * @name LuteosAiNpoProjectPhasedResultDetail
   * @summary 阶段性文件详情
   * @request GET:/api/luteos/ai/npo/project/phasedResultDetail
   * @response `200` `PhasedResultDetailResp` OK
   */
  luteosAiNpoProjectPhasedResultDetail = (
    query: {
      /** dify节点执行id */
      difyNodeExecutionId: string;
      /** 实例编码 */
      instanceCode?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<PhasedResultDetailResp, any>({
      path: `/api/luteos/ai/npo/project/phasedResultDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 新品机会项目
   * @name LuteosAiNpoProjectPptResult
   * @summary ppt结果
   * @request POST:/api/luteos/ai/npo/project/pptResult
   * @response `200` `WorkflowGeneratePptResp` OK
   */
  luteosAiNpoProjectPptResult = (req: WorkflowGeneratePptReq, params: RequestParams = {}) =>
    this.request<WorkflowGeneratePptResp, any>({
      path: `/api/luteos/ai/npo/project/pptResult`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 新品机会项目
   * @name LuteosAiNpoProjectState
   * @summary 查看项目运行情况
   * @request GET:/api/luteos/ai/npo/project/state
   * @response `200` `WorkflowRunStateResp` OK
   */
  luteosAiNpoProjectState = (
    query: {
      /** 工作流实例编码 */
      instanceCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<WorkflowRunStateResp, any>({
      path: `/api/luteos/ai/npo/project/state`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 新品机会项目
   * @name LuteosAiNpoProjectStatistics
   * @summary 项目运行统计
   * @request POST:/api/luteos/ai/npo/project/statistics
   * @response `200` `CommonRespWorkflowSummaryResp` OK
   */
  luteosAiNpoProjectStatistics = (
    query?: {
      /**
       * 结束日期
       * @format date
       * @example "2025-03-11"
       */
      endTime?: string;
      /**
       * 开始日期
       * @format date
       * @example "2025-03-04"
       */
      startTime?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespWorkflowSummaryResp, any>({
      path: `/api/luteos/ai/npo/project/statistics`,
      method: 'POST',
      query: query,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 新品机会项目
   * @name LuteosAiNpoProjectUpdatePpt
   * @summary 修改ppt
   * @request POST:/api/luteos/ai/npo/project/updatePpt
   * @response `200` `void` OK
   */
  luteosAiNpoProjectUpdatePpt = (req: ApiPptBean, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/luteos/ai/npo/project/updatePpt`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 新品机会工作流
   * @name LuteosAiNpoWorkflowBatchRun
   * @summary 批量运行工作流
   * @request POST:/api/luteos/ai/npo/workflow/batchRun
   * @response `200` `CommonRespBoolean` OK
   */
  luteosAiNpoWorkflowBatchRun = (req: AutoRunningWorkflowInstanceReq, params: RequestParams = {}) =>
    this.request<CommonRespBoolean, any>({
      path: `/api/luteos/ai/npo/workflow/batchRun`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 新品机会工作流
   * @name LuteosAiNpoWorkflowList
   * @summary 工作流列表
   * @request GET:/api/luteos/ai/npo/workflow/list
   * @response `200` `WorkflowListResp` OK
   */
  luteosAiNpoWorkflowList = (
    query: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<WorkflowListResp, any>({
      path: `/api/luteos/ai/npo/workflow/list`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 新品机会工作流
   * @name LuteosAiNpoWorkflowRun
   * @summary 运行工作流
   * @request POST:/api/luteos/ai/npo/workflow/run
   * @response `200` `WorkflowInstanceListBean` OK
   */
  luteosAiNpoWorkflowRun = (req: WorkflowRunReq, params: RequestParams = {}) =>
    this.request<WorkflowInstanceListBean, any>({
      path: `/api/luteos/ai/npo/workflow/run`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 新品机会工作流
   * @name LuteosAiNpoWorkflowUpdate
   * @summary 编辑工作流
   * @request POST:/api/luteos/ai/npo/workflow/update
   * @response `200` `WorkflowBean` OK
   */
  luteosAiNpoWorkflowUpdate = (req: WorkflowUpdateReq, params: RequestParams = {}) =>
    this.request<WorkflowBean, any>({
      path: `/api/luteos/ai/npo/workflow/update`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 新品机会工作流
   * @name LuteosAiNpoWorkflowVariables
   * @summary 工作流变量信息
   * @request GET:/api/luteos/ai/npo/workflow/variables
   * @response `200` `WorkflowVariablesResp` OK
   */
  luteosAiNpoWorkflowVariables = (
    query: {
      /** 工作流编码 */
      workflowCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<WorkflowVariablesResp, any>({
      path: `/api/luteos/ai/npo/workflow/variables`,
      method: 'GET',
      query: query,
      ...params,
    });
}
