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
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags AI广告生图-图片管理
   * @name LuteosAiAdImageBatchUploadFinishedImage
   * @summary 批量上传编码组成品图
   * @request POST:/api/luteos/ai/ad/image/batchUploadFinishedImage
   * @response `200` `BatchNoResp` OK
   */
  luteosAiAdImageBatchUploadFinishedImage = (
    req: UploadFinishedImageBatchReq,
    params: RequestParams = {},
  ) =>
    this.request<BatchNoResp, any>({
      path: `/api/luteos/ai/ad/image/batchUploadFinishedImage`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags AI广告生图-图片管理
   * @name LuteosAiAdImageDownExpandImage
   * @summary 下载扩图
   * @request POST:/api/luteos/ai/ad/image/downExpandImage
   * @response `200` `void` OK
   */
  luteosAiAdImageDownExpandImage = (req: DownExpendImageReq, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/luteos/ai/ad/image/downExpandImage`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags AI广告生图-图片管理
   * @name LuteosAiAdImageExpandImage
   * @summary 触发扩图
   * @request POST:/api/luteos/ai/ad/image/expandImage
   * @response `200` `BatchNoResp` OK
   */
  luteosAiAdImageExpandImage = (req: ExpandImageReq, params: RequestParams = {}) =>
    this.request<BatchNoResp, any>({
      path: `/api/luteos/ai/ad/image/expandImage`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags AI广告生图-图片管理
   * @name LuteosAiAdImageGenerateImage
   * @summary 触发生图
   * @request POST:/api/luteos/ai/ad/image/generateImage
   * @response `200` `BatchNoResp` OK
   */
  luteosAiAdImageGenerateImage = (req: GenerateImageReq, params: RequestParams = {}) =>
    this.request<BatchNoResp, any>({
      path: `/api/luteos/ai/ad/image/generateImage`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags AI广告生图-图片管理
   * @name LuteosAiAdImageQueryAiJobStatus
   * @summary 查询AI任务状态
   * @request GET:/api/luteos/ai/ad/image/queryAiJobStatus
   * @response `200` `QueryAiJobStatusResp` OK
   */
  luteosAiAdImageQueryAiJobStatus = (
    query: {
      /**
       * 任务类型 1-提示词优化 2-原图生成 3-扩图 4-批量上传 5-推送广告平台
       * @format int32
       */
      jobType: number;
      /** 任务编码 */
      taskCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<QueryAiJobStatusResp, any>({
      path: `/api/luteos/ai/ad/image/queryAiJobStatus`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags AI广告生图-图片管理
   * @name LuteosAiAdImageReExpandImage
   * @summary 重复触发扩图
   * @request POST:/api/luteos/ai/ad/image/reExpandImage
   * @response `200` `BatchNoResp` OK
   */
  luteosAiAdImageReExpandImage = (req: ReExpandImageReq, params: RequestParams = {}) =>
    this.request<BatchNoResp, any>({
      path: `/api/luteos/ai/ad/image/reExpandImage`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags AI广告生图-图片管理
   * @name LuteosAiAdImageRefinePrompt
   * @summary 提示词优化
   * @request POST:/api/luteos/ai/ad/image/refinePrompt
   * @response `200` `BatchNoResp` OK
   */
  luteosAiAdImageRefinePrompt = (req: RefinePromptReq, params: RequestParams = {}) =>
    this.request<BatchNoResp, any>({
      path: `/api/luteos/ai/ad/image/refinePrompt`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags AI广告生图-图片管理
   * @name LuteosAiAdImageUploadFinishedImage
   * @summary 上传编码组成品图
   * @request POST:/api/luteos/ai/ad/image/uploadFinishedImage
   * @response `200` `UploadFinishedImageResp` OK
   */
  luteosAiAdImageUploadFinishedImage = (req: UploadFinishedImageReq, params: RequestParams = {}) =>
    this.request<UploadFinishedImageResp, any>({
      path: `/api/luteos/ai/ad/image/uploadFinishedImage`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags AI广告生图-图片管理
   * @name LuteosAiAdImageUploadImage
   * @summary 统一上传图片
   * @request POST:/api/luteos/ai/ad/image/uploadImage
   * @response `200` `UploadImageResp` OK
   */
  luteosAiAdImageUploadImage = (req: UploadImageReq, params: RequestParams = {}) =>
    this.request<UploadImageResp, any>({
      path: `/api/luteos/ai/ad/image/uploadImage`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags AI广告生图-图片管理
   * @name LuteosAiAdImageUploadToAdPlatform
   * @summary 推送广告平台
   * @request POST:/api/luteos/ai/ad/image/uploadToAdPlatform
   * @response `200` `BatchNoResp` OK
   */
  luteosAiAdImageUploadToAdPlatform = (req: UploadToAdPlatformReq, params: RequestParams = {}) =>
    this.request<BatchNoResp, any>({
      path: `/api/luteos/ai/ad/image/uploadToAdPlatform`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags AI广告生图-任务管理
   * @name LuteosAiAdTaskOperateTask
   * @summary 操作任务
   * @request POST:/api/luteos/ai/ad/task/operateTask
   * @response `200` `CommonRespVoid` OK
   */
  luteosAiAdTaskOperateTask = (req: OperateTaskReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/ai/ad/task/operateTask`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags AI广告生图-任务管理
   * @name LuteosAiAdTaskQueryDetail
   * @summary 任务详情
   * @request GET:/api/luteos/ai/ad/task/queryDetail
   * @response `200` `TaskDetailResp` OK
   */
  luteosAiAdTaskQueryDetail = (
    query: {
      /** 任务编码 */
      taskCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<TaskDetailResp, any>({
      path: `/api/luteos/ai/ad/task/queryDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags AI广告生图-任务管理
   * @name LuteosAiAdTaskQueryFormOptions
   * @summary 表单选项
   * @request GET:/api/luteos/ai/ad/task/queryFormOptions
   * @response `200` `QueryFormOptionsResp` OK
   */
  luteosAiAdTaskQueryFormOptions = (params: RequestParams = {}) =>
    this.request<QueryFormOptionsResp, any>({
      path: `/api/luteos/ai/ad/task/queryFormOptions`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags AI广告生图-任务管理
   * @name LuteosAiAdTaskQueryTaskList
   * @summary 任务列表
   * @request POST:/api/luteos/ai/ad/task/queryTaskList
   * @response `200` `QueryTaskListResp` OK
   */
  luteosAiAdTaskQueryTaskList = (req: QueryTaskListReq, params: RequestParams = {}) =>
    this.request<QueryTaskListResp, any>({
      path: `/api/luteos/ai/ad/task/queryTaskList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags AI广告生图-任务管理
   * @name LuteosAiAdTaskQueryTaskProgress
   * @summary 任务状态进度条
   * @request GET:/api/luteos/ai/ad/task/queryTaskProgress
   * @response `200` `QueryTaskProgressResp` OK
   */
  luteosAiAdTaskQueryTaskProgress = (
    query: {
      /** 任务编码 */
      taskCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<QueryTaskProgressResp, any>({
      path: `/api/luteos/ai/ad/task/queryTaskProgress`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags AI广告生图-任务管理
   * @name LuteosAiAdTaskSaveTask
   * @summary 创建任务
   * @request POST:/api/luteos/ai/ad/task/saveTask
   * @response `200` `SaveTaskResp` OK
   */
  luteosAiAdTaskSaveTask = (req: SaveTaskReq, params: RequestParams = {}) =>
    this.request<SaveTaskResp, any>({
      path: `/api/luteos/ai/ad/task/saveTask`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
}
