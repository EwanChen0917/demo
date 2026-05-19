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
  EncryptSupplierResp,
  SupplierListQueryReq,
  SupplierListQueryResp,
  SupplierPurchaseListQueryReq,
  SupplierPurchaseListQueryResp,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags 供应商管理
   * @name LuteosSupplierPurchaseQueryList
   * @summary 采购未交列表查询
   * @request POST:/api/luteos/supplier/purchase/queryList
   * @response `200` `SupplierPurchaseListQueryResp` OK
   */
  luteosSupplierPurchaseQueryList = (
    req: SupplierPurchaseListQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<SupplierPurchaseListQueryResp, any>({
      path: `/api/luteos/supplier/purchase/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 供应商管理
   * @name LuteosSupplierQueryList
   * @summary 供应商列表查询
   * @request POST:/api/luteos/supplier/queryList
   * @response `200` `SupplierListQueryResp` OK
   */
  luteosSupplierQueryList = (req: SupplierListQueryReq, params: RequestParams = {}) =>
    this.request<SupplierListQueryResp, any>({
      path: `/api/luteos/supplier/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 供应商管理
   * @name LuteosSupplierQuerySupplierList
   * @summary 供应商加密列表查询
   * @request GET:/api/luteos/supplier/querySupplierList
   * @response `200` `EncryptSupplierResp` OK
   */
  luteosSupplierQuerySupplierList = (params: RequestParams = {}) =>
    this.request<EncryptSupplierResp, any>({
      path: `/api/luteos/supplier/querySupplierList`,
      method: 'GET',
      ...params,
    });
}
