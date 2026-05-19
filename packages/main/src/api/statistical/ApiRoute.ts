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
  ExecutorBeanListResp,
  OpinionClassificationBeanResp,
  OpinionCountryResp,
  OpinionDataCenterListReq,
  OpinionDataCenterListResp,
  OpinionDataListReq,
  OpinionDataListResp,
  OpinionDataResp,
  OpinionDataStatusReq,
  OpinionLevelResp,
  OpinionMonitoringReq,
  OpinionMonitoringResp,
  OpinionParamListResp,
  OpinionParamReq,
  OpinionPrTagResp,
  OpinionSmPlatformResp,
  OpinionSpuCateResp,
  OpinionStatisticsResp,
  OpinionTagTreeReq,
  OpinionTagTreeResp,
  OpinionTranslationResp,
  OpinionTranslationSubmitReq,
  OpinionTrendResp,
  WorkOrderListReq,
  WorkOrderListResp,
  WorkOrderLogResp,
  WorkOrderOperateReq,
  WorkOrderOperateResp,
  WorkOrderSaveReq,
  WorkOrderSaveResp,
} from './data-contracts';

export namespace Api {
  /**
   * No description
   * @tags 舆情系统-工单数据
   * @name LuteosAiAnalyzeOpinionExportOpinionData
   * @summary 舆情数据中心列表导出
   * @request POST:/api/luteos/ai/analyze/opinion/exportOpinionData
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosAiAnalyzeOpinionExportOpinionData {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OpinionDataCenterListReq;
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
   * @tags 舆情系统-工单数据
   * @name LuteosAiAnalyzeOpinionGetOpinionCount
   * @summary 工单数量统计
   * @request GET:/api/luteos/ai/analyze/opinion/getOpinionCount
   * @response `200` `OpinionStatisticsResp` OK
   */
  export namespace LuteosAiAnalyzeOpinionGetOpinionCount {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 分类 */
      classification?: string;
      /**
       * 创建时间结束
       * @format date
       */
      endTime?: string;
      /**
       * 创建时间开始
       * @format date
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
    export type ResponseBody = OpinionStatisticsResp;
  }

  /**
   * No description
   * @tags 舆情系统-工单数据
   * @name LuteosAiAnalyzeOpinionGetOpinionTagCount
   * @summary 工单标签数量统计
   * @request GET:/api/luteos/ai/analyze/opinion/getOpinionTagCount
   * @response `200` `OpinionStatisticsResp` OK
   */
  export namespace LuteosAiAnalyzeOpinionGetOpinionTagCount {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 分类 */
      classification?: string;
      /**
       * 创建时间结束
       * @format date
       */
      endTime?: string;
      /**
       * 创建时间开始
       * @format date
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
    export type ResponseBody = OpinionStatisticsResp;
  }

  /**
   * No description
   * @tags 舆情系统-工单数据
   * @name LuteosAiAnalyzeOpinionGetOpinionTrendCount
   * @summary 工单趋势数量统计
   * @request GET:/api/luteos/ai/analyze/opinion/getOpinionTrendCount
   * @response `200` `OpinionStatisticsResp` OK
   */
  export namespace LuteosAiAnalyzeOpinionGetOpinionTrendCount {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 分类 */
      classification?: string;
      /**
       * 创建时间结束
       * @format date
       */
      endTime?: string;
      /**
       * 创建时间开始
       * @format date
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
    export type ResponseBody = OpinionStatisticsResp;
  }

  /**
   * No description
   * @tags 舆情系统-工单数据
   * @name LuteosAiAnalyzeOpinionHotNews
   * @summary 首页-获取最新新闻
   * @request GET:/api/luteos/ai/analyze/opinion/hotNews
   * @response `200` `(OpinionDataResp)[]` OK
   */
  export namespace LuteosAiAnalyzeOpinionHotNews {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = OpinionDataResp[];
  }

  /**
   * No description
   * @tags 舆情系统-监控
   * @name LuteosAiAnalyzeOpinionMonitoringQueryOpinionClassificationMonitor
   * @summary 舆情来源分布-新闻/社媒
   * @request POST:/api/luteos/ai/analyze/opinion/monitoring/queryOpinionClassificationMonitor
   * @response `200` `OpinionClassificationBeanResp` OK
   */
  export namespace LuteosAiAnalyzeOpinionMonitoringQueryOpinionClassificationMonitor {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OpinionMonitoringReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = OpinionClassificationBeanResp;
  }

  /**
   * No description
   * @tags 舆情系统-监控
   * @name LuteosAiAnalyzeOpinionMonitoringQueryOpinionCountryMonitor
   * @summary 国家分布
   * @request POST:/api/luteos/ai/analyze/opinion/monitoring/queryOpinionCountryMonitor
   * @response `200` `OpinionCountryResp` OK
   */
  export namespace LuteosAiAnalyzeOpinionMonitoringQueryOpinionCountryMonitor {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OpinionMonitoringReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = OpinionCountryResp;
  }

  /**
   * No description
   * @tags 舆情系统-监控
   * @name LuteosAiAnalyzeOpinionMonitoringQueryOpinionLevelMonitor
   * @summary 舆情等级分布
   * @request POST:/api/luteos/ai/analyze/opinion/monitoring/queryOpinionLevelMonitor
   * @response `200` `OpinionLevelResp` OK
   */
  export namespace LuteosAiAnalyzeOpinionMonitoringQueryOpinionLevelMonitor {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OpinionMonitoringReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = OpinionLevelResp;
  }

  /**
   * No description
   * @tags 舆情系统-监控
   * @name LuteosAiAnalyzeOpinionMonitoringQueryOpinionMonitor
   * @summary 工单实时监测
   * @request POST:/api/luteos/ai/analyze/opinion/monitoring/queryOpinionMonitor
   * @response `200` `OpinionMonitoringResp` OK
   */
  export namespace LuteosAiAnalyzeOpinionMonitoringQueryOpinionMonitor {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OpinionMonitoringReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = OpinionMonitoringResp;
  }

  /**
   * No description
   * @tags 舆情系统-监控
   * @name LuteosAiAnalyzeOpinionMonitoringQueryOpinionPrTagMonitor
   * @summary 问题分布
   * @request POST:/api/luteos/ai/analyze/opinion/monitoring/queryOpinionPrTagMonitor
   * @response `200` `OpinionPrTagResp` OK
   */
  export namespace LuteosAiAnalyzeOpinionMonitoringQueryOpinionPrTagMonitor {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OpinionMonitoringReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = OpinionPrTagResp;
  }

  /**
   * No description
   * @tags 舆情系统-监控
   * @name LuteosAiAnalyzeOpinionMonitoringQueryOpinionSmPlatformMonitor
   * @summary 社媒来源平台分布（Top10+其他，饼图/柱状图共用）
   * @request POST:/api/luteos/ai/analyze/opinion/monitoring/queryOpinionSmPlatformMonitor
   * @response `200` `OpinionSmPlatformResp` OK
   */
  export namespace LuteosAiAnalyzeOpinionMonitoringQueryOpinionSmPlatformMonitor {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OpinionMonitoringReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = OpinionSmPlatformResp;
  }

  /**
   * No description
   * @tags 舆情系统-监控
   * @name LuteosAiAnalyzeOpinionMonitoringQueryOpinionSpuCateMonitor
   * @summary 产品分布
   * @request POST:/api/luteos/ai/analyze/opinion/monitoring/queryOpinionSpuCateMonitor
   * @response `200` `OpinionSpuCateResp` OK
   */
  export namespace LuteosAiAnalyzeOpinionMonitoringQueryOpinionSpuCateMonitor {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OpinionMonitoringReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = OpinionSpuCateResp;
  }

  /**
   * No description
   * @tags 舆情系统-监控
   * @name LuteosAiAnalyzeOpinionMonitoringQueryOpinionTrendMonitor
   * @summary 工单数量趋势
   * @request POST:/api/luteos/ai/analyze/opinion/monitoring/queryOpinionTrendMonitor
   * @response `200` `OpinionTrendResp` OK
   */
  export namespace LuteosAiAnalyzeOpinionMonitoringQueryOpinionTrendMonitor {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OpinionMonitoringReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = OpinionTrendResp;
  }

  /**
   * No description
   * @tags 舆情系统-工单数据
   * @name LuteosAiAnalyzeOpinionQueryExecutorList
   * @summary 查询执行者列表
   * @request POST:/api/luteos/ai/analyze/opinion/queryExecutorList
   * @response `200` `ExecutorBeanListResp` OK
   */
  export namespace LuteosAiAnalyzeOpinionQueryExecutorList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ExecutorBeanListResp;
  }

  /**
   * No description
   * @tags 舆情系统-工单数据
   * @name LuteosAiAnalyzeOpinionQueryJournalismList
   * @summary 新闻社媒数据列表
   * @request POST:/api/luteos/ai/analyze/opinion/queryJournalismList
   * @response `200` `OpinionDataListResp` OK
   */
  export namespace LuteosAiAnalyzeOpinionQueryJournalismList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OpinionDataListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = OpinionDataListResp;
  }

  /**
   * No description
   * @tags 舆情系统-工单数据
   * @name LuteosAiAnalyzeOpinionQueryList
   * @summary 舆情数据列表
   * @request POST:/api/luteos/ai/analyze/opinion/queryList
   * @response `200` `OpinionDataListResp` OK
   */
  export namespace LuteosAiAnalyzeOpinionQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OpinionDataListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = OpinionDataListResp;
  }

  /**
   * No description
   * @tags 舆情系统-工单数据
   * @name LuteosAiAnalyzeOpinionQueryOpinionDataCenterList
   * @summary 查询舆情数据中心列表
   * @request POST:/api/luteos/ai/analyze/opinion/queryOpinionDataCenterList
   * @response `200` `OpinionDataCenterListResp` OK
   */
  export namespace LuteosAiAnalyzeOpinionQueryOpinionDataCenterList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OpinionDataCenterListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = OpinionDataCenterListResp;
  }

  /**
   * No description
   * @tags 舆情系统-工单数据
   * @name LuteosAiAnalyzeOpinionQueryOpinionParamList
   * @summary 查询条件参数列表
   * @request POST:/api/luteos/ai/analyze/opinion/queryOpinionParamList
   * @response `200` `OpinionParamListResp` OK
   */
  export namespace LuteosAiAnalyzeOpinionQueryOpinionParamList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OpinionParamReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = OpinionParamListResp;
  }

  /**
   * No description
   * @tags 舆情系统-工单数据
   * @name LuteosAiAnalyzeOpinionQueryTagTree
   * @summary 查询标签树结构
   * @request POST:/api/luteos/ai/analyze/opinion/queryTagTree
   * @response `200` `OpinionTagTreeResp` OK
   */
  export namespace LuteosAiAnalyzeOpinionQueryTagTree {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OpinionTagTreeReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = OpinionTagTreeResp;
  }

  /**
   * @description 待译正文须由前端传入。成功则落库并返回译文与 contentSignature（SHA-256）；失败不建记录，返回 10002163。相同 opinionUniqueCode+正文 命中缓存直接返回。
   * @tags 舆情系统-工单数据
   * @name LuteosAiAnalyzeOpinionTranslationSubmit
   * @summary 提交舆情正文翻译
   * @request POST:/api/luteos/ai/analyze/opinion/translation/submit
   * @response `200` `OpinionTranslationResp` OK
   */
  export namespace LuteosAiAnalyzeOpinionTranslationSubmit {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OpinionTranslationSubmitReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = OpinionTranslationResp;
  }

  /**
   * No description
   * @tags 舆情系统-工单数据
   * @name LuteosAiAnalyzeOpinionUpdateStatus
   * @summary 修改舆情数据状态
   * @request POST:/api/luteos/ai/analyze/opinion/updateStatus
   * @response `200` `CommonRespBoolean` OK
   */
  export namespace LuteosAiAnalyzeOpinionUpdateStatus {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OpinionDataStatusReq;
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
   * @tags 舆情系统-工单数据
   * @name LuteosAiAnalyzeOpinionWorkOrderExportWorkOrder
   * @summary 导出工单
   * @request POST:/api/luteos/ai/analyze/opinion/workOrder/exportWorkOrder
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosAiAnalyzeOpinionWorkOrderExportWorkOrder {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = WorkOrderListReq;
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
   * @tags 舆情系统-工单数据
   * @name LuteosAiAnalyzeOpinionWorkOrderList
   * @summary 工单列表
   * @request POST:/api/luteos/ai/analyze/opinion/workOrder/list
   * @response `200` `WorkOrderListResp` OK
   */
  export namespace LuteosAiAnalyzeOpinionWorkOrderList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = WorkOrderListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = WorkOrderListResp;
  }

  /**
   * No description
   * @tags 舆情系统-工单数据
   * @name LuteosAiAnalyzeOpinionWorkOrderOperate
   * @summary 操作工单
   * @request POST:/api/luteos/ai/analyze/opinion/workOrder/operate
   * @response `200` `WorkOrderOperateResp` OK
   */
  export namespace LuteosAiAnalyzeOpinionWorkOrderOperate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = WorkOrderOperateReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = WorkOrderOperateResp;
  }

  /**
   * No description
   * @tags 舆情系统-工单数据
   * @name LuteosAiAnalyzeOpinionWorkOrderQueryLog
   * @summary 舆情工单日志
   * @request POST:/api/luteos/ai/analyze/opinion/workOrder/queryLog
   * @response `200` `WorkOrderLogResp` OK
   */
  export namespace LuteosAiAnalyzeOpinionWorkOrderQueryLog {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 工单编码 */
      workOrderCode?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = WorkOrderLogResp;
  }

  /**
   * No description
   * @tags 舆情系统-工单数据
   * @name LuteosAiAnalyzeOpinionWorkOrderSave
   * @summary 创建工单
   * @request POST:/api/luteos/ai/analyze/opinion/workOrder/save
   * @response `200` `WorkOrderSaveResp` OK
   */
  export namespace LuteosAiAnalyzeOpinionWorkOrderSave {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = WorkOrderSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = WorkOrderSaveResp;
  }
}
