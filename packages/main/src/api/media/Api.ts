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
  MediaOperateLogResp,
  MediaOperateTypeReq,
  MediaOperateTypeResp,
  MediaResourcesContactListResp,
  MediaResourcesDetailResp,
  MediaResourcesReq,
  MediaResourcesResp,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags 媒体资源
   * @name LuteosMediaExport
   * @summary 媒体资源列表导出
   * @request POST:/api/luteos/media/export
   * @response `200` `CommonExportResp` OK
   */
  luteosMediaExport = (req: MediaResourcesReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/media/export`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 媒体资源
   * @name LuteosMediaOperateMedia
   * @summary 媒体详情-操作
   * @request POST:/api/luteos/media/operateMedia
   * @response `200` `MediaOperateTypeResp` OK
   */
  luteosMediaOperateMedia = (req: MediaOperateTypeReq, params: RequestParams = {}) =>
    this.request<MediaOperateTypeResp, any>({
      path: `/api/luteos/media/operateMedia`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 媒体资源
   * @name LuteosMediaQueryMediaContactList
   * @summary 媒体资源联系
   * @request GET:/api/luteos/media/queryMediaContactList
   * @response `200` `MediaResourcesContactListResp` OK
   */
  luteosMediaQueryMediaContactList = (
    query: {
      /** 媒体资源编码 */
      mediaCode: string;
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
    },
    params: RequestParams = {},
  ) =>
    this.request<MediaResourcesContactListResp, any>({
      path: `/api/luteos/media/queryMediaContactList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 媒体资源
   * @name LuteosMediaQueryMediaDetail
   * @summary 媒体资源详情
   * @request GET:/api/luteos/media/queryMediaDetail
   * @response `200` `MediaResourcesDetailResp` OK
   */
  luteosMediaQueryMediaDetail = (
    query: {
      /** 媒体编码 */
      mediaCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<MediaResourcesDetailResp, any>({
      path: `/api/luteos/media/queryMediaDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 媒体资源
   * @name LuteosMediaQueryMediaOperateLog
   * @summary 媒体操作日志
   * @request GET:/api/luteos/media/queryMediaOperateLog
   * @response `200` `MediaOperateLogResp` OK
   */
  luteosMediaQueryMediaOperateLog = (
    query: {
      /** 媒体编码 */
      mediaCode: string;
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
    },
    params: RequestParams = {},
  ) =>
    this.request<MediaOperateLogResp, any>({
      path: `/api/luteos/media/queryMediaOperateLog`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 媒体资源
   * @name LuteosMediaQueryMediaResourcesList
   * @summary 媒体资源查询
   * @request GET:/api/luteos/media/queryMediaResourcesList
   * @response `200` `MediaResourcesResp` OK
   */
  luteosMediaQueryMediaResourcesList = (
    query: {
      /** 选择内容类型 */
      contentTypeList?: string[];
      /** 录入人列表 */
      creatorList?: string[];
      /**
       * 录入结束时间
       * @format date-time
       */
      endTime?: string;
      /**
       * 是否有联系方式 1:有 0:无
       * @format int32
       */
      hasContact?: number;
      /** 媒体名称/媒体关键词/rpa关键词 */
      keyword?: string;
      /** 媒体量级列表 */
      levelList?: string[];
      /** 主要流量国家列表 */
      mainCountryList?: string[];
      /** 媒体编码集合 导出勾选时使用 */
      mediaCodeList?: string[];
      /** 媒体类型列表 */
      mediaTypeList?: string[];
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
      /**
       * 录入开始时间
       * @format date-time
       */
      startTime?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<MediaResourcesResp, any>({
      path: `/api/luteos/media/queryMediaResourcesList`,
      method: 'GET',
      query: query,
      ...params,
    });
}
