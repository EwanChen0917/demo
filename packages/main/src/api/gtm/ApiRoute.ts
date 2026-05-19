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
  GtmPlBean,
  GtmPlDetailReq,
  GtmPlDetailResp,
  GtmPlListResp,
  RelationGtmMemberDetailReq,
  RelationGtmMemberDetailResp,
} from './data-contracts';

export namespace Api {
  /**
   * No description
   * @tags gtm品线
   * @name LuteosGtmPlGetGtmModels
   * @summary 查询GTM经理关联品线型号(可能有多个)
   * @request GET:/api/luteos/gtm/pl/getGtmModels
   * @response `200` `(GtmPlBean)[]` OK
   */
  export namespace LuteosGtmPlGetGtmModels {
    export type RequestParams = {};
    export type RequestQuery = {
      /** gtmCode */
      gtmCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = GtmPlBean[];
  }

  /**
   * No description
   * @tags gtm品线
   * @name LuteosGtmPlQueryDetail
   * @summary gtm品线详情查询
   * @request GET:/api/luteos/gtm/pl/queryDetail
   * @response `200` `GtmPlDetailResp` OK
   */
  export namespace LuteosGtmPlQueryDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** gtmPlCode */
      gtmPlCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = GtmPlDetailResp;
  }

  /**
   * No description
   * @tags gtm品线
   * @name LuteosGtmPlQueryList
   * @summary gtm品线列表查询
   * @request GET:/api/luteos/gtm/pl/queryList
   * @response `200` `GtmPlListResp` OK
   */
  export namespace LuteosGtmPlQueryList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 关键字 */
      keyword?: string;
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
    export type ResponseBody = GtmPlListResp;
  }

  /**
   * No description
   * @tags gtm品线
   * @name LuteosGtmPlQueryRelationGtmAssistantDetail
   * @summary 关联gtm助理详情查询
   * @request GET:/api/luteos/gtm/pl/queryRelationGtmAssistantDetail
   * @response `200` `RelationGtmMemberDetailResp` OK
   */
  export namespace LuteosGtmPlQueryRelationGtmAssistantDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** gtmPlCode */
      gtmPlCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = RelationGtmMemberDetailResp;
  }

  /**
   * No description
   * @tags gtm品线
   * @name LuteosGtmPlQueryRelationGtmMemberDetail
   * @summary 关联gtm经理详情查询
   * @request GET:/api/luteos/gtm/pl/queryRelationGtmMemberDetail
   * @response `200` `RelationGtmMemberDetailResp` OK
   */
  export namespace LuteosGtmPlQueryRelationGtmMemberDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** gtmPlCode */
      gtmPlCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = RelationGtmMemberDetailResp;
  }

  /**
   * No description
   * @tags gtm品线
   * @name LuteosGtmPlRelationGtmAssistant
   * @summary 关联gtm助理
   * @request POST:/api/luteos/gtm/pl/relationGtmAssistant
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosGtmPlRelationGtmAssistant {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = RelationGtmMemberDetailReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonResp;
  }

  /**
   * No description
   * @tags gtm品线
   * @name LuteosGtmPlRelationGtmMember
   * @summary 关联gtm经理
   * @request POST:/api/luteos/gtm/pl/relationGtmMember
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosGtmPlRelationGtmMember {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = RelationGtmMemberDetailReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonResp;
  }

  /**
   * No description
   * @tags gtm品线
   * @name LuteosGtmPlSaveOrUpdate
   * @summary 保存或修改gtm品线
   * @request POST:/api/luteos/gtm/pl/saveOrUpdate
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosGtmPlSaveOrUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = GtmPlDetailReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonResp;
  }
}
