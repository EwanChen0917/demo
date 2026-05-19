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

export namespace Api {
  /**
   * No description
   * @tags 供应商管理
   * @name LuteosSupplierPurchaseQueryList
   * @summary 采购未交列表查询
   * @request POST:/api/luteos/supplier/purchase/queryList
   * @response `200` `SupplierPurchaseListQueryResp` OK
   */
  export namespace LuteosSupplierPurchaseQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SupplierPurchaseListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SupplierPurchaseListQueryResp;
  }

  /**
   * No description
   * @tags 供应商管理
   * @name LuteosSupplierQueryList
   * @summary 供应商列表查询
   * @request POST:/api/luteos/supplier/queryList
   * @response `200` `SupplierListQueryResp` OK
   */
  export namespace LuteosSupplierQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SupplierListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SupplierListQueryResp;
  }

  /**
   * No description
   * @tags 供应商管理
   * @name LuteosSupplierQuerySupplierList
   * @summary 供应商加密列表查询
   * @request GET:/api/luteos/supplier/querySupplierList
   * @response `200` `EncryptSupplierResp` OK
   */
  export namespace LuteosSupplierQuerySupplierList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = EncryptSupplierResp;
  }
}
