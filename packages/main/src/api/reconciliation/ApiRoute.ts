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
  CommonRespCommonExportResp,
  CommonRespObject,
  MonitorCfgResp,
  MonitorDataSummaryResp,
  MonitorDetailQueryResp,
  MonitorListQueryReq,
  MonitorListQueryResp,
} from './data-contracts';

export namespace Api {
  /**
   * No description
   * @tags 监控看板
   * @name ReconciliationMonitorDownloadDetail
   * @summary 下载详情
   * @request POST:/api/reconciliation/monitor/downloadDetail
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace ReconciliationMonitorDownloadDetail {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MonitorListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespCommonExportResp;
  }

  /**
   * No description
   * @tags 监控看板
   * @name ReconciliationMonitorDownloadList
   * @summary 下载列表
   * @request POST:/api/reconciliation/monitor/downloadList
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace ReconciliationMonitorDownloadList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MonitorListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespCommonExportResp;
  }

  /**
   * No description
   * @tags 监控看板
   * @name ReconciliationMonitorQueryCfgMap
   * @summary 配置查询
   * @request GET:/api/reconciliation/monitor/queryCfgMap
   * @response `200` `MonitorCfgResp` OK
   */
  export namespace ReconciliationMonitorQueryCfgMap {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 财务平台-finance */
      supportPlatform: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MonitorCfgResp;
  }

  /**
   * No description
   * @tags 监控看板
   * @name ReconciliationMonitorQueryDataSummary
   * @summary 数据汇总
   * @request POST:/api/reconciliation/monitor/queryDataSummary
   * @response `200` `MonitorDataSummaryResp` OK
   */
  export namespace ReconciliationMonitorQueryDataSummary {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MonitorListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MonitorDataSummaryResp;
  }

  /**
   * No description
   * @tags 监控看板
   * @name ReconciliationMonitorQueryDetail
   * @summary 详情查询
   * @request GET:/api/reconciliation/monitor/queryDetail
   * @response `200` `MonitorDetailQueryResp` OK
   */
  export namespace ReconciliationMonitorQueryDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** code */
      code: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MonitorDetailQueryResp;
  }

  /**
   * No description
   * @tags 监控看板
   * @name ReconciliationMonitorQueryList
   * @summary 列表查询
   * @request POST:/api/reconciliation/monitor/queryList
   * @response `200` `MonitorListQueryResp` OK
   */
  export namespace ReconciliationMonitorQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MonitorListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MonitorListQueryResp;
  }

  /**
   * No description
   * @tags 监控看板
   * @name ReconciliationMonitorReLoad
   * @summary 根据查询条件执行重新获取
   * @request POST:/api/reconciliation/monitor/reLoad
   * @response `200` `CommonRespObject` OK
   */
  export namespace ReconciliationMonitorReLoad {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MonitorListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespObject;
  }
}
