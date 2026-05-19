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
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags 数据集市
   * @name LuteosDatamarketReportApplyForAuth
   * @summary 数据市集-数据权限申请
   * @request POST:/api/luteos/datamarket/report/applyForAuth
   * @response `200` `CommonRespObject` OK
   */
  luteosDatamarketReportApplyForAuth = (req: DataMarketReportAuthReq, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/datamarket/report/applyForAuth`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 数据集市
   * @name LuteosDatamarketReportApplyForReport
   * @summary 数据市集-自定义报表申请
   * @request POST:/api/luteos/datamarket/report/applyForReport
   * @response `200` `CommonRespObject` OK
   */
  luteosDatamarketReportApplyForReport = (
    req: DataMarketReportRequireReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/datamarket/report/applyForReport`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 数据集市
   * @name LuteosDatamarketReportQueryDataMarketPage
   * @summary 数据集市-数据报表页面查询
   * @request GET:/api/luteos/datamarket/report/queryDataMarketPage
   * @response `200` `DataMarketReportPageResp` OK
   */
  luteosDatamarketReportQueryDataMarketPage = (
    query: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<DataMarketReportPageResp, any>({
      path: `/api/luteos/datamarket/report/queryDataMarketPage`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 数据集市
   * @name LuteosDatamarketTagDeleteTag
   * @summary 数据集市-删除数据集标签
   * @request POST:/api/luteos/datamarket/tag/deleteTag
   * @response `200` `CommonRespObject` OK
   */
  luteosDatamarketTagDeleteTag = (req: DataMarketReportTagReq, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/datamarket/tag/deleteTag`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 数据集市
   * @name LuteosDatamarketTagOperationTag
   * @summary 数据集市-数据报表标签操作
   * @request POST:/api/luteos/datamarket/tag/operationTag
   * @response `200` `CommonRespObject` OK
   */
  luteosDatamarketTagOperationTag = (req: DataMarketReportTagAddReq, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/datamarket/tag/operationTag`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 数据集市
   * @name LuteosDatamarketTagQueryReportLabelList
   * @summary 数据集市-数据报表标签查询
   * @request GET:/api/luteos/datamarket/tag/queryReportLabelList
   * @response `200` `DataMakertReportTagPageResp` OK
   */
  luteosDatamarketTagQueryReportLabelList = (
    query: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<DataMakertReportTagPageResp, any>({
      path: `/api/luteos/datamarket/tag/queryReportLabelList`,
      method: 'GET',
      query: query,
      ...params,
    });
}
