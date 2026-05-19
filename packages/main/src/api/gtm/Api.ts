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
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags gtm品线
   * @name LuteosGtmPlGetGtmModels
   * @summary 查询GTM经理关联品线型号(可能有多个)
   * @request GET:/api/luteos/gtm/pl/getGtmModels
   * @response `200` `(GtmPlBean)[]` OK
   */
  luteosGtmPlGetGtmModels = (
    query: {
      /** gtmCode */
      gtmCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<GtmPlBean[], any>({
      path: `/api/luteos/gtm/pl/getGtmModels`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags gtm品线
   * @name LuteosGtmPlQueryDetail
   * @summary gtm品线详情查询
   * @request GET:/api/luteos/gtm/pl/queryDetail
   * @response `200` `GtmPlDetailResp` OK
   */
  luteosGtmPlQueryDetail = (
    query: {
      /** gtmPlCode */
      gtmPlCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<GtmPlDetailResp, any>({
      path: `/api/luteos/gtm/pl/queryDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags gtm品线
   * @name LuteosGtmPlQueryList
   * @summary gtm品线列表查询
   * @request GET:/api/luteos/gtm/pl/queryList
   * @response `200` `GtmPlListResp` OK
   */
  luteosGtmPlQueryList = (
    query: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<GtmPlListResp, any>({
      path: `/api/luteos/gtm/pl/queryList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags gtm品线
   * @name LuteosGtmPlQueryRelationGtmAssistantDetail
   * @summary 关联gtm助理详情查询
   * @request GET:/api/luteos/gtm/pl/queryRelationGtmAssistantDetail
   * @response `200` `RelationGtmMemberDetailResp` OK
   */
  luteosGtmPlQueryRelationGtmAssistantDetail = (
    query: {
      /** gtmPlCode */
      gtmPlCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<RelationGtmMemberDetailResp, any>({
      path: `/api/luteos/gtm/pl/queryRelationGtmAssistantDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags gtm品线
   * @name LuteosGtmPlQueryRelationGtmMemberDetail
   * @summary 关联gtm经理详情查询
   * @request GET:/api/luteos/gtm/pl/queryRelationGtmMemberDetail
   * @response `200` `RelationGtmMemberDetailResp` OK
   */
  luteosGtmPlQueryRelationGtmMemberDetail = (
    query: {
      /** gtmPlCode */
      gtmPlCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<RelationGtmMemberDetailResp, any>({
      path: `/api/luteos/gtm/pl/queryRelationGtmMemberDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags gtm品线
   * @name LuteosGtmPlRelationGtmAssistant
   * @summary 关联gtm助理
   * @request POST:/api/luteos/gtm/pl/relationGtmAssistant
   * @response `200` `CommonResp` OK
   */
  luteosGtmPlRelationGtmAssistant = (req: RelationGtmMemberDetailReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/gtm/pl/relationGtmAssistant`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags gtm品线
   * @name LuteosGtmPlRelationGtmMember
   * @summary 关联gtm经理
   * @request POST:/api/luteos/gtm/pl/relationGtmMember
   * @response `200` `CommonResp` OK
   */
  luteosGtmPlRelationGtmMember = (req: RelationGtmMemberDetailReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/gtm/pl/relationGtmMember`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags gtm品线
   * @name LuteosGtmPlSaveOrUpdate
   * @summary 保存或修改gtm品线
   * @request POST:/api/luteos/gtm/pl/saveOrUpdate
   * @response `200` `CommonResp` OK
   */
  luteosGtmPlSaveOrUpdate = (req: GtmPlDetailReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/gtm/pl/saveOrUpdate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
}
