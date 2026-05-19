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
  CommonExportResp,
  CommonRespBoolean,
  CommonRespImportDataResp,
  CommonRespString,
  VideoAnalysisDetailResp,
  VideoAnalysisOverviewResp,
  VideoAnalysisPageReq,
  VideoAnalysisPageResp,
  VideoAnalysisParamResp,
  VideoDownReq,
  VideoImportDataReq,
  VideoSplitCandidateResp,
  VideoSplitCandidateUpdateReq,
  VideoSplitDetailResp,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags 广告系统-视频解析
   * @name LuteosAiVideoAnalysisAnalysisImportFile
   * @summary 解析导入文件
   * @request POST:/api/luteos/ai/video/analysis/analysisImportFile
   * @response `200` `CommonRespImportDataResp` OK
   */
  luteosAiVideoAnalysisAnalysisImportFile = (req: VideoImportDataReq, params: RequestParams = {}) =>
    this.request<CommonRespImportDataResp, any>({
      path: `/api/luteos/ai/video/analysis/analysisImportFile`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 广告系统-视频解析
   * @name LuteosAiVideoAnalysisCleanDuplicateSplitData
   * @summary 清理重复拆分数据
   * @request GET:/api/luteos/ai/video/analysis/cleanDuplicateSplitData
   * @response `200` `CommonRespString` OK
   */
  luteosAiVideoAnalysisCleanDuplicateSplitData = (params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/ai/video/analysis/cleanDuplicateSplitData`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 广告系统-视频解析
   * @name LuteosAiVideoAnalysisDownFile
   * @summary 批量下载文件
   * @request POST:/api/luteos/ai/video/analysis/downFile
   * @response `200` `CommonExportResp` OK
   */
  luteosAiVideoAnalysisDownFile = (req: VideoDownReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/ai/video/analysis/downFile`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 广告系统-视频解析
   * @name LuteosAiVideoAnalysisGetImportLable
   * @summary 获取导入标签
   * @request GET:/api/luteos/ai/video/analysis/getImportLable
   * @response `200` `VideoAnalysisParamResp` OK
   */
  luteosAiVideoAnalysisGetImportLable = (params: RequestParams = {}) =>
    this.request<VideoAnalysisParamResp, any>({
      path: `/api/luteos/ai/video/analysis/getImportLable`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 广告系统-视频解析
   * @name LuteosAiVideoAnalysisGetRequestParameters
   * @summary 获取请求参数
   * @request GET:/api/luteos/ai/video/analysis/getRequestParameters
   * @response `200` `VideoAnalysisParamResp` OK
   */
  luteosAiVideoAnalysisGetRequestParameters = (params: RequestParams = {}) =>
    this.request<VideoAnalysisParamResp, any>({
      path: `/api/luteos/ai/video/analysis/getRequestParameters`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 广告系统-视频解析
   * @name LuteosAiVideoAnalysisGetVideoAnalysisOverview
   * @summary 获取总览统计
   * @request GET:/api/luteos/ai/video/analysis/getVideoAnalysisOverview
   * @response `200` `VideoAnalysisOverviewResp` OK
   */
  luteosAiVideoAnalysisGetVideoAnalysisOverview = (params: RequestParams = {}) =>
    this.request<VideoAnalysisOverviewResp, any>({
      path: `/api/luteos/ai/video/analysis/getVideoAnalysisOverview`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 广告系统-视频解析
   * @name LuteosAiVideoAnalysisNormalizeHistoricalData
   * @summary 历史数据规范化处理
   * @request GET:/api/luteos/ai/video/analysis/normalizeHistoricalData
   * @response `200` `CommonRespString` OK
   */
  luteosAiVideoAnalysisNormalizeHistoricalData = (params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/ai/video/analysis/normalizeHistoricalData`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 广告系统-视频解析
   * @name LuteosAiVideoAnalysisRetryAnalysis
   * @summary 重试解析
   * @request GET:/api/luteos/ai/video/analysis/retryAnalysis
   * @response `200` `CommonRespBoolean` OK
   */
  luteosAiVideoAnalysisRetryAnalysis = (
    query?: {
      /**
       * 视频id
       * @format int64
       */
      videoId?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespBoolean, any>({
      path: `/api/luteos/ai/video/analysis/retryAnalysis`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 广告系统-视频解析
   * @name LuteosAiVideoAnalysisStartImportFile
   * @summary 开始导入文件数据
   * @request POST:/api/luteos/ai/video/analysis/startImportFile
   * @response `200` `CommonRespImportDataResp` OK
   */
  luteosAiVideoAnalysisStartImportFile = (req: VideoImportDataReq, params: RequestParams = {}) =>
    this.request<CommonRespImportDataResp, any>({
      path: `/api/luteos/ai/video/analysis/startImportFile`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 广告系统-视频解析
   * @name LuteosAiVideoAnalysisUpdateVideoItem
   * @summary 更新itemId
   * @request GET:/api/luteos/ai/video/analysis/updateVideoItem
   * @response `200` `CommonRespBoolean` OK
   */
  luteosAiVideoAnalysisUpdateVideoItem = (params: RequestParams = {}) =>
    this.request<CommonRespBoolean, any>({
      path: `/api/luteos/ai/video/analysis/updateVideoItem`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 广告系统-视频解析
   * @name LuteosAiVideoAnalysisVideoDetail
   * @summary 主视频详情
   * @request GET:/api/luteos/ai/video/analysis/videoDetail
   * @response `200` `VideoAnalysisDetailResp` OK
   */
  luteosAiVideoAnalysisVideoDetail = (
    query?: {
      /**
       * 视频id
       * @format int64
       */
      videoId?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<VideoAnalysisDetailResp, any>({
      path: `/api/luteos/ai/video/analysis/videoDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 广告系统-视频解析
   * @name LuteosAiVideoAnalysisVideoPage
   * @summary 主视频分页
   * @request POST:/api/luteos/ai/video/analysis/videoPage
   * @response `200` `VideoAnalysisPageResp` OK
   */
  luteosAiVideoAnalysisVideoPage = (req: VideoAnalysisPageReq, params: RequestParams = {}) =>
    this.request<VideoAnalysisPageResp, any>({
      path: `/api/luteos/ai/video/analysis/videoPage`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 广告系统-视频解析
   * @name LuteosAiVideoAnalysisVideoSplitDetail
   * @summary 分镜视频详情
   * @request GET:/api/luteos/ai/video/analysis/videoSplitDetail
   * @response `200` `VideoSplitDetailResp` OK
   */
  luteosAiVideoAnalysisVideoSplitDetail = (
    query?: {
      /**
       * 视频id
       * @format int64
       */
      videoId?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<VideoSplitDetailResp, any>({
      path: `/api/luteos/ai/video/analysis/videoSplitDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 广告系统-视频解析
   * @name LuteosAiVideoAnalysisVideoSplitPage
   * @summary 分镜视频分页
   * @request POST:/api/luteos/ai/video/analysis/videoSplitPage
   * @response `200` `VideoAnalysisPageResp` OK
   */
  luteosAiVideoAnalysisVideoSplitPage = (req: VideoAnalysisPageReq, params: RequestParams = {}) =>
    this.request<VideoAnalysisPageResp, any>({
      path: `/api/luteos/ai/video/analysis/videoSplitPage`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 广告系统-视频候选
   * @name LuteosAiVideoCandidateQueryList
   * @summary 获取列表
   * @request GET:/api/luteos/ai/video/candidate/queryList
   * @response `200` `VideoSplitCandidateResp` OK
   */
  luteosAiVideoCandidateQueryList = (
    query?: {
      /** 创建者 */
      creator?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<VideoSplitCandidateResp, any>({
      path: `/api/luteos/ai/video/candidate/queryList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 广告系统-视频候选
   * @name LuteosAiVideoCandidateUpdate
   * @summary 添加、移除候选
   * @request POST:/api/luteos/ai/video/candidate/update
   * @response `200` `CommonRespBoolean` OK
   */
  luteosAiVideoCandidateUpdate = (req: VideoSplitCandidateUpdateReq, params: RequestParams = {}) =>
    this.request<CommonRespBoolean, any>({
      path: `/api/luteos/ai/video/candidate/update`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
}
