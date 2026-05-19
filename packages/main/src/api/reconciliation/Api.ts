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
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags 监控看板
   * @name ReconciliationMonitorDownloadDetail
   * @summary 下载详情
   * @request POST:/api/reconciliation/monitor/downloadDetail
   * @response `200` `CommonRespCommonExportResp` OK
   */
  reconciliationMonitorDownloadDetail = (req: MonitorListQueryReq, params: RequestParams = {}) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/reconciliation/monitor/downloadDetail`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 监控看板
   * @name ReconciliationMonitorDownloadList
   * @summary 下载列表
   * @request POST:/api/reconciliation/monitor/downloadList
   * @response `200` `CommonRespCommonExportResp` OK
   */
  reconciliationMonitorDownloadList = (req: MonitorListQueryReq, params: RequestParams = {}) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/reconciliation/monitor/downloadList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 监控看板
   * @name ReconciliationMonitorQueryCfgMap
   * @summary 配置查询
   * @request GET:/api/reconciliation/monitor/queryCfgMap
   * @response `200` `MonitorCfgResp` OK
   */
  reconciliationMonitorQueryCfgMap = (
    query: {
      /** 财务平台-finance */
      supportPlatform: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<MonitorCfgResp, any>({
      path: `/api/reconciliation/monitor/queryCfgMap`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 监控看板
   * @name ReconciliationMonitorQueryDataSummary
   * @summary 数据汇总
   * @request POST:/api/reconciliation/monitor/queryDataSummary
   * @response `200` `MonitorDataSummaryResp` OK
   */
  reconciliationMonitorQueryDataSummary = (req: MonitorListQueryReq, params: RequestParams = {}) =>
    this.request<MonitorDataSummaryResp, any>({
      path: `/api/reconciliation/monitor/queryDataSummary`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 监控看板
   * @name ReconciliationMonitorQueryDetail
   * @summary 详情查询
   * @request GET:/api/reconciliation/monitor/queryDetail
   * @response `200` `MonitorDetailQueryResp` OK
   */
  reconciliationMonitorQueryDetail = (
    query: {
      /** code */
      code: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<MonitorDetailQueryResp, any>({
      path: `/api/reconciliation/monitor/queryDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 监控看板
   * @name ReconciliationMonitorQueryList
   * @summary 列表查询
   * @request POST:/api/reconciliation/monitor/queryList
   * @response `200` `MonitorListQueryResp` OK
   */
  reconciliationMonitorQueryList = (req: MonitorListQueryReq, params: RequestParams = {}) =>
    this.request<MonitorListQueryResp, any>({
      path: `/api/reconciliation/monitor/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 监控看板
   * @name ReconciliationMonitorReLoad
   * @summary 根据查询条件执行重新获取
   * @request POST:/api/reconciliation/monitor/reLoad
   * @response `200` `CommonRespObject` OK
   */
  reconciliationMonitorReLoad = (req: MonitorListQueryReq, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/reconciliation/monitor/reLoad`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
}
