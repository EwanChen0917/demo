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

export namespace Api {
  /**
   * No description
   * @tags 转换模块
   * @name LuteosAiAreaExchangeRate
   * @summary 获取实时汇率
   * @request GET:/api/luteos/ai/area/exchangeRate
   * @response `200` `CommonRespExchangeRateResp` OK
   */
  export namespace LuteosAiAreaExchangeRate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespExchangeRateResp;
  }

  /**
   * No description
   * @tags 转换模块
   * @name LuteosAiAreaSolarTerm
   * @summary 获取当日节气服务文案
   * @request GET:/api/luteos/ai/area/solarTerm
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosAiAreaSolarTerm {
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
   * @tags 转换模块
   * @name LuteosAiAreaSummary
   * @summary 写入区域摘要（含time、title、summary、link）
   * @request POST:/api/luteos/ai/area/summary
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosAiAreaSummary {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AreaSummarySaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespVoid;
  }

  /**
   * No description
   * @tags 转换模块
   * @name LuteosAiAreaSummaryList
   * @summary 分页查询区域摘要列表（创建时间倒序，含link）
   * @request POST:/api/luteos/ai/area/summary/list
   * @response `200` `CommonRespAreaSummaryPageResp` OK
   */
  export namespace LuteosAiAreaSummaryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AreaSummaryPageReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespAreaSummaryPageResp;
  }

  /**
   * No description
   * @tags 转换模块
   * @name LuteosAiAreaTime
   * @summary 获取多时区时间
   * @request GET:/api/luteos/ai/area/time
   * @response `200` `CommonRespTimeResp` OK
   */
  export namespace LuteosAiAreaTime {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespTimeResp;
  }
}
