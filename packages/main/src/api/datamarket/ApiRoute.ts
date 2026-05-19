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
  CommonRespObject,
  DataMakertReportTagPageResp,
  DataMarketReportAuthReq,
  DataMarketReportPageResp,
  DataMarketReportRequireReq,
  DataMarketReportTagAddReq,
  DataMarketReportTagReq,
} from './data-contracts';

export namespace Api {
  /**
   * No description
   * @tags 数据集市
   * @name LuteosDatamarketReportApplyForAuth
   * @summary 数据市集-数据权限申请
   * @request POST:/api/luteos/datamarket/report/applyForAuth
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosDatamarketReportApplyForAuth {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DataMarketReportAuthReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags 数据集市
   * @name LuteosDatamarketReportApplyForReport
   * @summary 数据市集-自定义报表申请
   * @request POST:/api/luteos/datamarket/report/applyForReport
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosDatamarketReportApplyForReport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DataMarketReportRequireReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags 数据集市
   * @name LuteosDatamarketReportQueryDataMarketPage
   * @summary 数据集市-数据报表页面查询
   * @request GET:/api/luteos/datamarket/report/queryDataMarketPage
   * @response `200` `DataMarketReportPageResp` OK
   */
  export namespace LuteosDatamarketReportQueryDataMarketPage {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 标签编码 */
      labelCode?: string;
      /**
       * 页数
       * @format int32
       * @min 1
       * @exclusiveMin false
       */
      pageNum: number;
      /** @format int32 */
      pageSize?: number;
      /**
       * 素材状态 1-有效 0-失效 2-全部
       * @format int32
       */
      reportStatus?: number;
      /** 报表主题编码 */
      reportTopicCode?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DataMarketReportPageResp;
  }

  /**
   * No description
   * @tags 数据集市
   * @name LuteosDatamarketTagDeleteTag
   * @summary 数据集市-删除数据集标签
   * @request POST:/api/luteos/datamarket/tag/deleteTag
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosDatamarketTagDeleteTag {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DataMarketReportTagReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags 数据集市
   * @name LuteosDatamarketTagOperationTag
   * @summary 数据集市-数据报表标签操作
   * @request POST:/api/luteos/datamarket/tag/operationTag
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosDatamarketTagOperationTag {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DataMarketReportTagAddReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags 数据集市
   * @name LuteosDatamarketTagQueryReportLabelList
   * @summary 数据集市-数据报表标签查询
   * @request GET:/api/luteos/datamarket/tag/queryReportLabelList
   * @response `200` `DataMakertReportTagPageResp` OK
   */
  export namespace LuteosDatamarketTagQueryReportLabelList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 标签模块-固定传：data_market */
      module?: string;
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
      /** 标签名称 */
      tagName?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DataMakertReportTagPageResp;
  }
}
