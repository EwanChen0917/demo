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

export namespace Api {
  /**
   * No description
   * @tags 新品机会项目
   * @name LuteosAiNpoProjectConfirmConclusion
   * @summary 确认结论
   * @request POST:/api/luteos/ai/npo/project/confirmConclusion
   * @response `200` `CommonRespBoolean` OK
   */
  export namespace LuteosAiNpoProjectConfirmConclusion {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ConclusionResultReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespBoolean;
  }

  /**
   * No description
   * @tags 新品机会项目
   * @name LuteosAiNpoProjectDeleteProject
   * @summary 删除项目
   * @request DELETE:/api/luteos/ai/npo/project/deleteProject/{instanceCode}
   * @response `200` `CommonRespBoolean` OK
   */
  export namespace LuteosAiNpoProjectDeleteProject {
    export type RequestParams = {
      /** instanceCode */
      instanceCode: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespBoolean;
  }

  /**
   * No description
   * @tags 新品机会项目
   * @name LuteosAiNpoProjectDetail
   * @summary 项目详情
   * @request GET:/api/luteos/ai/npo/project/detail
   * @response `200` `WorkflowInstanceDetailBean` OK
   */
  export namespace LuteosAiNpoProjectDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 工作流实例编码 */
      instanceCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = WorkflowInstanceDetailBean;
  }

  /**
   * No description
   * @tags 新品机会项目
   * @name LuteosAiNpoProjectGenerateExcel
   * @summary 导出excle
   * @request GET:/api/luteos/ai/npo/project/generateExcel
   * @response `200` `void` OK
   */
  export namespace LuteosAiNpoProjectGenerateExcel {
    export type RequestParams = {};
    export type RequestQuery = {
      /** dify节点执行id */
      difyNodeExecutionId: string;
      /** 实例编码 */
      instanceCode?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags 新品机会项目
   * @name LuteosAiNpoProjectGetPptInfo
   * @summary 获取ppt
   * @request GET:/api/luteos/ai/npo/project/getPptInfo
   * @response `200` `ApiPptBean` OK
   */
  export namespace LuteosAiNpoProjectGetPptInfo {
    export type RequestParams = {};
    export type RequestQuery = {
      data?: object;
      projectId?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ApiPptBean;
  }

  /**
   * No description
   * @tags 新品机会项目
   * @name LuteosAiNpoProjectGettingDataState
   * @summary 查看项目数据获取情况
   * @request GET:/api/luteos/ai/npo/project/gettingDataState
   * @response `200` `WorkflowRunStateResp` OK
   */
  export namespace LuteosAiNpoProjectGettingDataState {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 工作流实例编码 */
      instanceCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = WorkflowRunStateResp;
  }

  /**
   * No description
   * @tags 新品机会项目
   * @name LuteosAiNpoProjectList
   * @summary 项目运行列表
   * @request POST:/api/luteos/ai/npo/project/list
   * @response `200` `WorkflowProjectListResp` OK
   */
  export namespace LuteosAiNpoProjectList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = WorkflowProjectListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = WorkflowProjectListResp;
  }

  /**
   * No description
   * @tags 新品机会项目
   * @name LuteosAiNpoProjectModifyName
   * @summary 修改项目名称
   * @request POST:/api/luteos/ai/npo/project/modifyName
   * @response `200` `CommonRespBoolean` OK
   */
  export namespace LuteosAiNpoProjectModifyName {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 工作流实例编码 */
      instanceCode: string;
      /** 项目名称 */
      name?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespBoolean;
  }

  /**
   * No description
   * @tags 新品机会项目
   * @name LuteosAiNpoProjectNodeAvgRunTime
   * @summary 节点平均执行时间
   * @request GET:/api/luteos/ai/npo/project/nodeAvgRunTime
   * @response `200` `WorkflowNodeAvgRunTimeResp` OK
   */
  export namespace LuteosAiNpoProjectNodeAvgRunTime {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 工作流实例编码 */
      instanceCode: string;
      /** 运行节点ID */
      nodeId: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = WorkflowNodeAvgRunTimeResp;
  }

  /**
   * No description
   * @tags 新品机会项目
   * @name LuteosAiNpoProjectNodeState
   * @summary 查看项目节点运行情况
   * @request GET:/api/luteos/ai/npo/project/nodeState
   * @response `200` `WorkflowRunNodeStateResp` OK
   */
  export namespace LuteosAiNpoProjectNodeState {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 工作流实例编码 */
      instanceCode: string;
      /** 节点标识 */
      nodeTitlePrefix: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = WorkflowRunNodeStateResp;
  }

  /**
   * No description
   * @tags 新品机会项目
   * @name LuteosAiNpoProjectPhasedResultDetail
   * @summary 阶段性文件详情
   * @request GET:/api/luteos/ai/npo/project/phasedResultDetail
   * @response `200` `PhasedResultDetailResp` OK
   */
  export namespace LuteosAiNpoProjectPhasedResultDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** dify节点执行id */
      difyNodeExecutionId: string;
      /** 实例编码 */
      instanceCode?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PhasedResultDetailResp;
  }

  /**
   * No description
   * @tags 新品机会项目
   * @name LuteosAiNpoProjectPptResult
   * @summary ppt结果
   * @request POST:/api/luteos/ai/npo/project/pptResult
   * @response `200` `WorkflowGeneratePptResp` OK
   */
  export namespace LuteosAiNpoProjectPptResult {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = WorkflowGeneratePptReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = WorkflowGeneratePptResp;
  }

  /**
   * No description
   * @tags 新品机会项目
   * @name LuteosAiNpoProjectState
   * @summary 查看项目运行情况
   * @request GET:/api/luteos/ai/npo/project/state
   * @response `200` `WorkflowRunStateResp` OK
   */
  export namespace LuteosAiNpoProjectState {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 工作流实例编码 */
      instanceCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = WorkflowRunStateResp;
  }

  /**
   * No description
   * @tags 新品机会项目
   * @name LuteosAiNpoProjectStatistics
   * @summary 项目运行统计
   * @request POST:/api/luteos/ai/npo/project/statistics
   * @response `200` `CommonRespWorkflowSummaryResp` OK
   */
  export namespace LuteosAiNpoProjectStatistics {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespWorkflowSummaryResp;
  }

  /**
   * No description
   * @tags 新品机会项目
   * @name LuteosAiNpoProjectUpdatePpt
   * @summary 修改ppt
   * @request POST:/api/luteos/ai/npo/project/updatePpt
   * @response `200` `void` OK
   */
  export namespace LuteosAiNpoProjectUpdatePpt {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ApiPptBean;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags 新品机会工作流
   * @name LuteosAiNpoWorkflowBatchRun
   * @summary 批量运行工作流
   * @request POST:/api/luteos/ai/npo/workflow/batchRun
   * @response `200` `CommonRespBoolean` OK
   */
  export namespace LuteosAiNpoWorkflowBatchRun {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AutoRunningWorkflowInstanceReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespBoolean;
  }

  /**
   * No description
   * @tags 新品机会工作流
   * @name LuteosAiNpoWorkflowList
   * @summary 工作流列表
   * @request GET:/api/luteos/ai/npo/workflow/list
   * @response `200` `WorkflowListResp` OK
   */
  export namespace LuteosAiNpoWorkflowList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = WorkflowListResp;
  }

  /**
   * No description
   * @tags 新品机会工作流
   * @name LuteosAiNpoWorkflowRun
   * @summary 运行工作流
   * @request POST:/api/luteos/ai/npo/workflow/run
   * @response `200` `WorkflowInstanceListBean` OK
   */
  export namespace LuteosAiNpoWorkflowRun {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = WorkflowRunReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = WorkflowInstanceListBean;
  }

  /**
   * No description
   * @tags 新品机会工作流
   * @name LuteosAiNpoWorkflowUpdate
   * @summary 编辑工作流
   * @request POST:/api/luteos/ai/npo/workflow/update
   * @response `200` `WorkflowBean` OK
   */
  export namespace LuteosAiNpoWorkflowUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = WorkflowUpdateReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = WorkflowBean;
  }

  /**
   * No description
   * @tags 新品机会工作流
   * @name LuteosAiNpoWorkflowVariables
   * @summary 工作流变量信息
   * @request GET:/api/luteos/ai/npo/workflow/variables
   * @response `200` `WorkflowVariablesResp` OK
   */
  export namespace LuteosAiNpoWorkflowVariables {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 工作流编码 */
      workflowCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = WorkflowVariablesResp;
  }
}
