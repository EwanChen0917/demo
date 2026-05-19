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

export namespace Api {
  /**
   * No description
   * @tags 经营日报管理
   * @name LuteosDailyQuery
   * @summary 查看日报
   * @request POST:/api/luteos/daily/query
   * @response `200` `DailyBean` OK
   */
  export namespace LuteosDailyQuery {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DailyQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DailyBean;
  }

  /**
   * No description
   * @tags 经营日报管理
   * @name LuteosDailyQuerySum
   * @summary 汇总日报
   * @request POST:/api/luteos/daily/querySum
   * @response `200` `DailyBean` OK
   */
  export namespace LuteosDailyQuerySum {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DailySumQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DailyBean;
  }

  /**
   * No description
   * @tags 经营日报管理
   * @name LuteosDailySave
   * @summary 日报保存
   * @request POST:/api/luteos/daily/save
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosDailySave {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DailySaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonResp;
  }
}
