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
  CommonResp,
  EvaluateDetailQueryResp,
  EvaluateListExportReq,
  EvaluateListQueryResp,
  EvaluateSubmitReq,
} from './data-contracts';

export namespace Api {
  /**
   * No description
   * @tags 评价管理模块
   * @name LuteosEvaluateDownload
   * @summary 导出列表
   * @request POST:/api/luteos/evaluate/download
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosEvaluateDownload {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = EvaluateListExportReq;
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
   * @tags 评价管理模块
   * @name LuteosEvaluateQueryEvaluateDetail
   * @summary 评价详情查询
   * @request GET:/api/luteos/evaluate/queryEvaluateDetail
   * @response `200` `EvaluateDetailQueryResp` OK
   */
  export namespace LuteosEvaluateQueryEvaluateDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** calendarId */
      calendarId: string;
      /**
       * type
       * @format int32
       */
      type: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = EvaluateDetailQueryResp;
  }

  /**
   * No description
   * @tags 评价管理模块
   * @name LuteosEvaluateQueryEvaluateList
   * @summary 会议评价管理列表查询
   * @request GET:/api/luteos/evaluate/queryEvaluateList
   * @response `200` `EvaluateListQueryResp` OK
   */
  export namespace LuteosEvaluateQueryEvaluateList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 预订人memberCode */
      bookerList?: string[];
      /** 预订人部门deptId */
      departIdList?: number[];
      /**
       * 会议结束时间
       * @format date-time
       */
      endTime?: string;
      /**
       * 页数
       * @format int32
       * @min 1
       * @exclusiveMin false
       */
      pageNum: number;
      /**
       * 每页数量
       * @format int32
       * @max 100
       * @exclusiveMax false
       */
      pageSize: number;
      /** 参会人memberCode */
      participantList?: string[];
      /**
       * 会议开始时间
       * @format date-time
       */
      startTime?: string;
      /** 会议主题 */
      summary?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = EvaluateListQueryResp;
  }

  /**
   * No description
   * @tags 评价管理模块
   * @name LuteosEvaluateSubmitEvaluate
   * @summary 提交问卷
   * @request POST:/api/luteos/evaluate/submitEvaluate
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosEvaluateSubmitEvaluate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = EvaluateSubmitReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonResp;
  }
}
