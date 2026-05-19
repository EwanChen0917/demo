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

export namespace Api {
  /**
   * No description
   * @tags PR邮箱分析
   * @name LuteosAiStatisticsPrEmailLabelSummary
   * @summary 分类标签统计数据
   * @request POST:/api/luteos/ai/statistics/prEmail/labelSummary
   * @response `200` `LabelSummaryResp` OK
   */
  export namespace LuteosAiStatisticsPrEmailLabelSummary {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LabelSummaryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = LabelSummaryResp;
  }

  /**
   * No description
   * @tags PR邮箱分析
   * @name LuteosAiStatisticsPrEmailTotalSummary
   * @summary 面板统计数据
   * @request POST:/api/luteos/ai/statistics/prEmail/totalSummary
   * @response `200` `TotalSummaryResp` OK
   */
  export namespace LuteosAiStatisticsPrEmailTotalSummary {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TotalSummaryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = TotalSummaryResp;
  }
}
