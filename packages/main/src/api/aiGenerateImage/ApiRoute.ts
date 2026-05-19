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
  BatchNoResp,
  CommonRespVoid,
  DownExpendImageReq,
  ExpandImageReq,
  GenerateImageReq,
  OperateTaskReq,
  QueryAiJobStatusResp,
  QueryFormOptionsResp,
  QueryTaskListReq,
  QueryTaskListResp,
  QueryTaskProgressResp,
  ReExpandImageReq,
  RefinePromptReq,
  SaveTaskReq,
  SaveTaskResp,
  TaskDetailResp,
  UploadFinishedImageBatchReq,
  UploadFinishedImageReq,
  UploadFinishedImageResp,
  UploadImageReq,
  UploadImageResp,
  UploadToAdPlatformReq,
} from './data-contracts';

export namespace Api {
  /**
   * No description
   * @tags AI广告生图-图片管理
   * @name LuteosAiAdImageBatchUploadFinishedImage
   * @summary 批量上传编码组成品图
   * @request POST:/api/luteos/ai/ad/image/batchUploadFinishedImage
   * @response `200` `BatchNoResp` OK
   */
  export namespace LuteosAiAdImageBatchUploadFinishedImage {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UploadFinishedImageBatchReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = BatchNoResp;
  }

  /**
   * No description
   * @tags AI广告生图-图片管理
   * @name LuteosAiAdImageDownExpandImage
   * @summary 下载扩图
   * @request POST:/api/luteos/ai/ad/image/downExpandImage
   * @response `200` `void` OK
   */
  export namespace LuteosAiAdImageDownExpandImage {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DownExpendImageReq;
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
   * @tags AI广告生图-图片管理
   * @name LuteosAiAdImageExpandImage
   * @summary 触发扩图
   * @request POST:/api/luteos/ai/ad/image/expandImage
   * @response `200` `BatchNoResp` OK
   */
  export namespace LuteosAiAdImageExpandImage {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ExpandImageReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = BatchNoResp;
  }

  /**
   * No description
   * @tags AI广告生图-图片管理
   * @name LuteosAiAdImageGenerateImage
   * @summary 触发生图
   * @request POST:/api/luteos/ai/ad/image/generateImage
   * @response `200` `BatchNoResp` OK
   */
  export namespace LuteosAiAdImageGenerateImage {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = GenerateImageReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = BatchNoResp;
  }

  /**
   * No description
   * @tags AI广告生图-图片管理
   * @name LuteosAiAdImageQueryAiJobStatus
   * @summary 查询AI任务状态
   * @request GET:/api/luteos/ai/ad/image/queryAiJobStatus
   * @response `200` `QueryAiJobStatusResp` OK
   */
  export namespace LuteosAiAdImageQueryAiJobStatus {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * 任务类型 1-提示词优化 2-原图生成 3-扩图 4-批量上传 5-推送广告平台
       * @format int32
       */
      jobType: number;
      /** 任务编码 */
      taskCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = QueryAiJobStatusResp;
  }

  /**
   * No description
   * @tags AI广告生图-图片管理
   * @name LuteosAiAdImageReExpandImage
   * @summary 重复触发扩图
   * @request POST:/api/luteos/ai/ad/image/reExpandImage
   * @response `200` `BatchNoResp` OK
   */
  export namespace LuteosAiAdImageReExpandImage {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ReExpandImageReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = BatchNoResp;
  }

  /**
   * No description
   * @tags AI广告生图-图片管理
   * @name LuteosAiAdImageRefinePrompt
   * @summary 提示词优化
   * @request POST:/api/luteos/ai/ad/image/refinePrompt
   * @response `200` `BatchNoResp` OK
   */
  export namespace LuteosAiAdImageRefinePrompt {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = RefinePromptReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = BatchNoResp;
  }

  /**
   * No description
   * @tags AI广告生图-图片管理
   * @name LuteosAiAdImageUploadFinishedImage
   * @summary 上传编码组成品图
   * @request POST:/api/luteos/ai/ad/image/uploadFinishedImage
   * @response `200` `UploadFinishedImageResp` OK
   */
  export namespace LuteosAiAdImageUploadFinishedImage {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UploadFinishedImageReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = UploadFinishedImageResp;
  }

  /**
   * No description
   * @tags AI广告生图-图片管理
   * @name LuteosAiAdImageUploadImage
   * @summary 统一上传图片
   * @request POST:/api/luteos/ai/ad/image/uploadImage
   * @response `200` `UploadImageResp` OK
   */
  export namespace LuteosAiAdImageUploadImage {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UploadImageReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = UploadImageResp;
  }

  /**
   * No description
   * @tags AI广告生图-图片管理
   * @name LuteosAiAdImageUploadToAdPlatform
   * @summary 推送广告平台
   * @request POST:/api/luteos/ai/ad/image/uploadToAdPlatform
   * @response `200` `BatchNoResp` OK
   */
  export namespace LuteosAiAdImageUploadToAdPlatform {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UploadToAdPlatformReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = BatchNoResp;
  }

  /**
   * No description
   * @tags AI广告生图-任务管理
   * @name LuteosAiAdTaskOperateTask
   * @summary 操作任务
   * @request POST:/api/luteos/ai/ad/task/operateTask
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosAiAdTaskOperateTask {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OperateTaskReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespVoid;
  }

  /**
   * No description
   * @tags AI广告生图-任务管理
   * @name LuteosAiAdTaskQueryDetail
   * @summary 任务详情
   * @request GET:/api/luteos/ai/ad/task/queryDetail
   * @response `200` `TaskDetailResp` OK
   */
  export namespace LuteosAiAdTaskQueryDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 任务编码 */
      taskCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = TaskDetailResp;
  }

  /**
   * No description
   * @tags AI广告生图-任务管理
   * @name LuteosAiAdTaskQueryFormOptions
   * @summary 表单选项
   * @request GET:/api/luteos/ai/ad/task/queryFormOptions
   * @response `200` `QueryFormOptionsResp` OK
   */
  export namespace LuteosAiAdTaskQueryFormOptions {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = QueryFormOptionsResp;
  }

  /**
   * No description
   * @tags AI广告生图-任务管理
   * @name LuteosAiAdTaskQueryTaskList
   * @summary 任务列表
   * @request POST:/api/luteos/ai/ad/task/queryTaskList
   * @response `200` `QueryTaskListResp` OK
   */
  export namespace LuteosAiAdTaskQueryTaskList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = QueryTaskListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = QueryTaskListResp;
  }

  /**
   * No description
   * @tags AI广告生图-任务管理
   * @name LuteosAiAdTaskQueryTaskProgress
   * @summary 任务状态进度条
   * @request GET:/api/luteos/ai/ad/task/queryTaskProgress
   * @response `200` `QueryTaskProgressResp` OK
   */
  export namespace LuteosAiAdTaskQueryTaskProgress {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 任务编码 */
      taskCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = QueryTaskProgressResp;
  }

  /**
   * No description
   * @tags AI广告生图-任务管理
   * @name LuteosAiAdTaskSaveTask
   * @summary 创建任务
   * @request POST:/api/luteos/ai/ad/task/saveTask
   * @response `200` `SaveTaskResp` OK
   */
  export namespace LuteosAiAdTaskSaveTask {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SaveTaskReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SaveTaskResp;
  }
}
