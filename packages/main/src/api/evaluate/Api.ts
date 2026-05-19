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
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags 评价管理模块
   * @name LuteosEvaluateDownload
   * @summary 导出列表
   * @request POST:/api/luteos/evaluate/download
   * @response `200` `CommonExportResp` OK
   */
  luteosEvaluateDownload = (req: EvaluateListExportReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/evaluate/download`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 评价管理模块
   * @name LuteosEvaluateQueryEvaluateDetail
   * @summary 评价详情查询
   * @request GET:/api/luteos/evaluate/queryEvaluateDetail
   * @response `200` `EvaluateDetailQueryResp` OK
   */
  luteosEvaluateQueryEvaluateDetail = (
    query: {
      /** calendarId */
      calendarId: string;
      /**
       * type
       * @format int32
       */
      type: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<EvaluateDetailQueryResp, any>({
      path: `/api/luteos/evaluate/queryEvaluateDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 评价管理模块
   * @name LuteosEvaluateQueryEvaluateList
   * @summary 会议评价管理列表查询
   * @request GET:/api/luteos/evaluate/queryEvaluateList
   * @response `200` `EvaluateListQueryResp` OK
   */
  luteosEvaluateQueryEvaluateList = (
    query: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<EvaluateListQueryResp, any>({
      path: `/api/luteos/evaluate/queryEvaluateList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 评价管理模块
   * @name LuteosEvaluateSubmitEvaluate
   * @summary 提交问卷
   * @request POST:/api/luteos/evaluate/submitEvaluate
   * @response `200` `CommonResp` OK
   */
  luteosEvaluateSubmitEvaluate = (req: EvaluateSubmitReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/evaluate/submitEvaluate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
}
