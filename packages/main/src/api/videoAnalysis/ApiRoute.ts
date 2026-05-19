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

export namespace Api {
  /**
   * No description
   * @tags 广告系统-视频解析
   * @name LuteosAiVideoAnalysisAnalysisImportFile
   * @summary 解析导入文件
   * @request POST:/api/luteos/ai/video/analysis/analysisImportFile
   * @response `200` `CommonRespImportDataResp` OK
   */
  export namespace LuteosAiVideoAnalysisAnalysisImportFile {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = VideoImportDataReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespImportDataResp;
  }

  /**
   * No description
   * @tags 广告系统-视频解析
   * @name LuteosAiVideoAnalysisCleanDuplicateSplitData
   * @summary 清理重复拆分数据
   * @request GET:/api/luteos/ai/video/analysis/cleanDuplicateSplitData
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosAiVideoAnalysisCleanDuplicateSplitData {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespString;
  }

  /**
   * No description
   * @tags 广告系统-视频解析
   * @name LuteosAiVideoAnalysisDownFile
   * @summary 批量下载文件
   * @request POST:/api/luteos/ai/video/analysis/downFile
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosAiVideoAnalysisDownFile {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = VideoDownReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonExportResp;
  }

  /**
   * No description
   * @tags 广告系统-视频解析
   * @name LuteosAiVideoAnalysisGetImportLable
   * @summary 获取导入标签
   * @request GET:/api/luteos/ai/video/analysis/getImportLable
   * @response `200` `VideoAnalysisParamResp` OK
   */
  export namespace LuteosAiVideoAnalysisGetImportLable {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = VideoAnalysisParamResp;
  }

  /**
   * No description
   * @tags 广告系统-视频解析
   * @name LuteosAiVideoAnalysisGetRequestParameters
   * @summary 获取请求参数
   * @request GET:/api/luteos/ai/video/analysis/getRequestParameters
   * @response `200` `VideoAnalysisParamResp` OK
   */
  export namespace LuteosAiVideoAnalysisGetRequestParameters {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = VideoAnalysisParamResp;
  }

  /**
   * No description
   * @tags 广告系统-视频解析
   * @name LuteosAiVideoAnalysisGetVideoAnalysisOverview
   * @summary 获取总览统计
   * @request GET:/api/luteos/ai/video/analysis/getVideoAnalysisOverview
   * @response `200` `VideoAnalysisOverviewResp` OK
   */
  export namespace LuteosAiVideoAnalysisGetVideoAnalysisOverview {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = VideoAnalysisOverviewResp;
  }

  /**
   * No description
   * @tags 广告系统-视频解析
   * @name LuteosAiVideoAnalysisNormalizeHistoricalData
   * @summary 历史数据规范化处理
   * @request GET:/api/luteos/ai/video/analysis/normalizeHistoricalData
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosAiVideoAnalysisNormalizeHistoricalData {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespString;
  }

  /**
   * No description
   * @tags 广告系统-视频解析
   * @name LuteosAiVideoAnalysisRetryAnalysis
   * @summary 重试解析
   * @request GET:/api/luteos/ai/video/analysis/retryAnalysis
   * @response `200` `CommonRespBoolean` OK
   */
  export namespace LuteosAiVideoAnalysisRetryAnalysis {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * 视频id
       * @format int64
       */
      videoId?: number;
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
   * @tags 广告系统-视频解析
   * @name LuteosAiVideoAnalysisStartImportFile
   * @summary 开始导入文件数据
   * @request POST:/api/luteos/ai/video/analysis/startImportFile
   * @response `200` `CommonRespImportDataResp` OK
   */
  export namespace LuteosAiVideoAnalysisStartImportFile {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = VideoImportDataReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespImportDataResp;
  }

  /**
   * No description
   * @tags 广告系统-视频解析
   * @name LuteosAiVideoAnalysisUpdateVideoItem
   * @summary 更新itemId
   * @request GET:/api/luteos/ai/video/analysis/updateVideoItem
   * @response `200` `CommonRespBoolean` OK
   */
  export namespace LuteosAiVideoAnalysisUpdateVideoItem {
    export type RequestParams = {};
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
   * @tags 广告系统-视频解析
   * @name LuteosAiVideoAnalysisVideoDetail
   * @summary 主视频详情
   * @request GET:/api/luteos/ai/video/analysis/videoDetail
   * @response `200` `VideoAnalysisDetailResp` OK
   */
  export namespace LuteosAiVideoAnalysisVideoDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * 视频id
       * @format int64
       */
      videoId?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = VideoAnalysisDetailResp;
  }

  /**
   * No description
   * @tags 广告系统-视频解析
   * @name LuteosAiVideoAnalysisVideoPage
   * @summary 主视频分页
   * @request POST:/api/luteos/ai/video/analysis/videoPage
   * @response `200` `VideoAnalysisPageResp` OK
   */
  export namespace LuteosAiVideoAnalysisVideoPage {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = VideoAnalysisPageReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = VideoAnalysisPageResp;
  }

  /**
   * No description
   * @tags 广告系统-视频解析
   * @name LuteosAiVideoAnalysisVideoSplitDetail
   * @summary 分镜视频详情
   * @request GET:/api/luteos/ai/video/analysis/videoSplitDetail
   * @response `200` `VideoSplitDetailResp` OK
   */
  export namespace LuteosAiVideoAnalysisVideoSplitDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * 视频id
       * @format int64
       */
      videoId?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = VideoSplitDetailResp;
  }

  /**
   * No description
   * @tags 广告系统-视频解析
   * @name LuteosAiVideoAnalysisVideoSplitPage
   * @summary 分镜视频分页
   * @request POST:/api/luteos/ai/video/analysis/videoSplitPage
   * @response `200` `VideoAnalysisPageResp` OK
   */
  export namespace LuteosAiVideoAnalysisVideoSplitPage {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = VideoAnalysisPageReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = VideoAnalysisPageResp;
  }

  /**
   * No description
   * @tags 广告系统-视频候选
   * @name LuteosAiVideoCandidateQueryList
   * @summary 获取列表
   * @request GET:/api/luteos/ai/video/candidate/queryList
   * @response `200` `VideoSplitCandidateResp` OK
   */
  export namespace LuteosAiVideoCandidateQueryList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 创建者 */
      creator?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = VideoSplitCandidateResp;
  }

  /**
   * No description
   * @tags 广告系统-视频候选
   * @name LuteosAiVideoCandidateUpdate
   * @summary 添加、移除候选
   * @request POST:/api/luteos/ai/video/candidate/update
   * @response `200` `CommonRespBoolean` OK
   */
  export namespace LuteosAiVideoCandidateUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = VideoSplitCandidateUpdateReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespBoolean;
  }
}
