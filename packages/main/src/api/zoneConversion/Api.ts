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
  AreaSummaryPageReq,
  AreaSummarySaveReq,
  CommonRespAreaSummaryPageResp,
  CommonRespExchangeRateResp,
  CommonRespString,
  CommonRespTimeResp,
  CommonRespVoid,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags 转换模块
   * @name LuteosAiAreaExchangeRate
   * @summary 获取实时汇率
   * @request GET:/api/luteos/ai/area/exchangeRate
   * @response `200` `CommonRespExchangeRateResp` OK
   */
  luteosAiAreaExchangeRate = (params: RequestParams = {}) =>
    this.request<CommonRespExchangeRateResp, any>({
      path: `/api/luteos/ai/area/exchangeRate`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 转换模块
   * @name LuteosAiAreaSolarTerm
   * @summary 获取当日节气服务文案
   * @request GET:/api/luteos/ai/area/solarTerm
   * @response `200` `CommonRespString` OK
   */
  luteosAiAreaSolarTerm = (params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/ai/area/solarTerm`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 转换模块
   * @name LuteosAiAreaSummary
   * @summary 写入区域摘要（含time、title、summary、link）
   * @request POST:/api/luteos/ai/area/summary
   * @response `200` `CommonRespVoid` OK
   */
  luteosAiAreaSummary = (req: AreaSummarySaveReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/ai/area/summary`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 转换模块
   * @name LuteosAiAreaSummaryList
   * @summary 分页查询区域摘要列表（创建时间倒序，含link）
   * @request POST:/api/luteos/ai/area/summary/list
   * @response `200` `CommonRespAreaSummaryPageResp` OK
   */
  luteosAiAreaSummaryList = (req: AreaSummaryPageReq, params: RequestParams = {}) =>
    this.request<CommonRespAreaSummaryPageResp, any>({
      path: `/api/luteos/ai/area/summary/list`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 转换模块
   * @name LuteosAiAreaTime
   * @summary 获取多时区时间
   * @request GET:/api/luteos/ai/area/time
   * @response `200` `CommonRespTimeResp` OK
   */
  luteosAiAreaTime = (params: RequestParams = {}) =>
    this.request<CommonRespTimeResp, any>({
      path: `/api/luteos/ai/area/time`,
      method: 'GET',
      ...params,
    });
}
