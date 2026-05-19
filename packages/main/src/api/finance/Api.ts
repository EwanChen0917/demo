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
  BusinessDictItemBatchQueryResp,
  BusinessDictItemListResp,
  BusinessDictItemRemoveReq,
  BusinessDictItemSaveReq,
  BusinessDictItemSaveResp,
  BusinessDictListResp,
  BusinessDictSaveReq,
  BusinessDictSaveResp,
  SettlementOrganizationListResp,
  SettlementOrganizationSaveReq,
  SettlementOrganizationSaveResp,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags 业务字典
   * @name LuteosFinanceBusinessDictItemBatchQuery
   * @summary 业务字典详情批量查询
   * @request GET:/api/luteos/finance/business/dict/item/batchQuery
   * @response `200` `BusinessDictItemBatchQueryResp` OK
   */
  luteosFinanceBusinessDictItemBatchQuery = (
    query: {
      /** dictCodes */
      dictCodes: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<BusinessDictItemBatchQueryResp, any>({
      path: `/api/luteos/finance/business/dict/item/batchQuery`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 业务字典
   * @name LuteosFinanceBusinessDictItemList
   * @summary 业务字典详情列表
   * @request GET:/api/luteos/finance/business/dict/item/list
   * @response `200` `BusinessDictItemListResp` OK
   */
  luteosFinanceBusinessDictItemList = (
    query: {
      /** 编码 */
      code?: string;
      /**
       * 业务字典ID
       * @format int64
       */
      dictId: number;
      /** 名称 */
      name?: string;
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
    this.request<BusinessDictItemListResp, any>({
      path: `/api/luteos/finance/business/dict/item/list`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 业务字典
   * @name LuteosFinanceBusinessDictItemRemove
   * @summary 删除业务字典详情
   * @request POST:/api/luteos/finance/business/dict/item/remove
   * @response `200` `BusinessDictItemSaveResp` OK
   */
  luteosFinanceBusinessDictItemRemove = (
    req: BusinessDictItemRemoveReq,
    params: RequestParams = {},
  ) =>
    this.request<BusinessDictItemSaveResp, any>({
      path: `/api/luteos/finance/business/dict/item/remove`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 业务字典
   * @name LuteosFinanceBusinessDictItemSave
   * @summary 保存业务字典详情
   * @request POST:/api/luteos/finance/business/dict/item/save
   * @response `200` `BusinessDictItemSaveResp` OK
   */
  luteosFinanceBusinessDictItemSave = (req: BusinessDictItemSaveReq, params: RequestParams = {}) =>
    this.request<BusinessDictItemSaveResp, any>({
      path: `/api/luteos/finance/business/dict/item/save`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 业务字典
   * @name LuteosFinanceBusinessDictList
   * @summary 业务字典列表
   * @request GET:/api/luteos/finance/business/dict/list
   * @response `200` `BusinessDictListResp` OK
   */
  luteosFinanceBusinessDictList = (
    query: {
      /** 编码 */
      code?: string;
      /** 名称 */
      name?: string;
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
    this.request<BusinessDictListResp, any>({
      path: `/api/luteos/finance/business/dict/list`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 业务字典
   * @name LuteosFinanceBusinessDictSave
   * @summary 保存业务字典
   * @request POST:/api/luteos/finance/business/dict/save
   * @response `200` `BusinessDictSaveResp` OK
   */
  luteosFinanceBusinessDictSave = (req: BusinessDictSaveReq, params: RequestParams = {}) =>
    this.request<BusinessDictSaveResp, any>({
      path: `/api/luteos/finance/business/dict/save`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 结算组织
   * @name LuteosFinanceSettlementOrganizationList
   * @summary 结算组织列表
   * @request GET:/api/luteos/finance/settlement/organization/list
   * @response `200` `SettlementOrganizationListResp` OK
   */
  luteosFinanceSettlementOrganizationList = (
    query: {
      /** 编码 */
      code?: string;
      /** 名称 */
      name?: string;
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
    this.request<SettlementOrganizationListResp, any>({
      path: `/api/luteos/finance/settlement/organization/list`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 结算组织
   * @name LuteosFinanceSettlementOrganizationSave
   * @summary 保存结算组织
   * @request POST:/api/luteos/finance/settlement/organization/save
   * @response `200` `SettlementOrganizationSaveResp` OK
   */
  luteosFinanceSettlementOrganizationSave = (
    req: SettlementOrganizationSaveReq,
    params: RequestParams = {},
  ) =>
    this.request<SettlementOrganizationSaveResp, any>({
      path: `/api/luteos/finance/settlement/organization/save`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
}
