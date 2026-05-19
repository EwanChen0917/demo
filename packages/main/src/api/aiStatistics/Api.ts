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
  LabelSummaryReq,
  LabelSummaryResp,
  TotalSummaryReq,
  TotalSummaryResp,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags PR邮箱分析
   * @name LuteosAiStatisticsPrEmailLabelSummary
   * @summary 分类标签统计数据
   * @request POST:/api/luteos/ai/statistics/prEmail/labelSummary
   * @response `200` `LabelSummaryResp` OK
   */
  luteosAiStatisticsPrEmailLabelSummary = (req: LabelSummaryReq, params: RequestParams = {}) =>
    this.request<LabelSummaryResp, any>({
      path: `/api/luteos/ai/statistics/prEmail/labelSummary`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags PR邮箱分析
   * @name LuteosAiStatisticsPrEmailTotalSummary
   * @summary 面板统计数据
   * @request POST:/api/luteos/ai/statistics/prEmail/totalSummary
   * @response `200` `TotalSummaryResp` OK
   */
  luteosAiStatisticsPrEmailTotalSummary = (req: TotalSummaryReq, params: RequestParams = {}) =>
    this.request<TotalSummaryResp, any>({
      path: `/api/luteos/ai/statistics/prEmail/totalSummary`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
}
