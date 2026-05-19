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

export namespace Api {
  /**
   * No description
   * @tags 媒体资源
   * @name LuteosMediaExport
   * @summary 媒体资源列表导出
   * @request POST:/api/luteos/media/export
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosMediaExport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MediaResourcesReq;
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
   * @tags 媒体资源
   * @name LuteosMediaOperateMedia
   * @summary 媒体详情-操作
   * @request POST:/api/luteos/media/operateMedia
   * @response `200` `MediaOperateTypeResp` OK
   */
  export namespace LuteosMediaOperateMedia {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MediaOperateTypeReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MediaOperateTypeResp;
  }

  /**
   * No description
   * @tags 媒体资源
   * @name LuteosMediaQueryMediaContactList
   * @summary 媒体资源联系
   * @request GET:/api/luteos/media/queryMediaContactList
   * @response `200` `MediaResourcesContactListResp` OK
   */
  export namespace LuteosMediaQueryMediaContactList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MediaResourcesContactListResp;
  }

  /**
   * No description
   * @tags 媒体资源
   * @name LuteosMediaQueryMediaDetail
   * @summary 媒体资源详情
   * @request GET:/api/luteos/media/queryMediaDetail
   * @response `200` `MediaResourcesDetailResp` OK
   */
  export namespace LuteosMediaQueryMediaDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 媒体编码 */
      mediaCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MediaResourcesDetailResp;
  }

  /**
   * No description
   * @tags 媒体资源
   * @name LuteosMediaQueryMediaOperateLog
   * @summary 媒体操作日志
   * @request GET:/api/luteos/media/queryMediaOperateLog
   * @response `200` `MediaOperateLogResp` OK
   */
  export namespace LuteosMediaQueryMediaOperateLog {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MediaOperateLogResp;
  }

  /**
   * No description
   * @tags 媒体资源
   * @name LuteosMediaQueryMediaResourcesList
   * @summary 媒体资源查询
   * @request GET:/api/luteos/media/queryMediaResourcesList
   * @response `200` `MediaResourcesResp` OK
   */
  export namespace LuteosMediaQueryMediaResourcesList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MediaResourcesResp;
  }
}
