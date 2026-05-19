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
  CommonResp,
  DailyBean,
  DailyQueryReq,
  DailySaveReq,
  DailySumQueryReq,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags 经营日报管理
   * @name LuteosDailyQuery
   * @summary 查看日报
   * @request POST:/api/luteos/daily/query
   * @response `200` `DailyBean` OK
   */
  luteosDailyQuery = (req: DailyQueryReq, params: RequestParams = {}) =>
    this.request<DailyBean, any>({
      path: `/api/luteos/daily/query`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 经营日报管理
   * @name LuteosDailyQuerySum
   * @summary 汇总日报
   * @request POST:/api/luteos/daily/querySum
   * @response `200` `DailyBean` OK
   */
  luteosDailyQuerySum = (req: DailySumQueryReq, params: RequestParams = {}) =>
    this.request<DailyBean, any>({
      path: `/api/luteos/daily/querySum`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 经营日报管理
   * @name LuteosDailySave
   * @summary 日报保存
   * @request POST:/api/luteos/daily/save
   * @response `200` `CommonResp` OK
   */
  luteosDailySave = (req: DailySaveReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/daily/save`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
}
