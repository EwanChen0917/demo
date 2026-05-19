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

export namespace Api {
  /**
   * No description
   * @tags 业务字典
   * @name LuteosFinanceBusinessDictItemBatchQuery
   * @summary 业务字典详情批量查询
   * @request GET:/api/luteos/finance/business/dict/item/batchQuery
   * @response `200` `BusinessDictItemBatchQueryResp` OK
   */
  export namespace LuteosFinanceBusinessDictItemBatchQuery {
    export type RequestParams = {};
    export type RequestQuery = {
      /** dictCodes */
      dictCodes: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = BusinessDictItemBatchQueryResp;
  }

  /**
   * No description
   * @tags 业务字典
   * @name LuteosFinanceBusinessDictItemList
   * @summary 业务字典详情列表
   * @request GET:/api/luteos/finance/business/dict/item/list
   * @response `200` `BusinessDictItemListResp` OK
   */
  export namespace LuteosFinanceBusinessDictItemList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = BusinessDictItemListResp;
  }

  /**
   * No description
   * @tags 业务字典
   * @name LuteosFinanceBusinessDictItemRemove
   * @summary 删除业务字典详情
   * @request POST:/api/luteos/finance/business/dict/item/remove
   * @response `200` `BusinessDictItemSaveResp` OK
   */
  export namespace LuteosFinanceBusinessDictItemRemove {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BusinessDictItemRemoveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = BusinessDictItemSaveResp;
  }

  /**
   * No description
   * @tags 业务字典
   * @name LuteosFinanceBusinessDictItemSave
   * @summary 保存业务字典详情
   * @request POST:/api/luteos/finance/business/dict/item/save
   * @response `200` `BusinessDictItemSaveResp` OK
   */
  export namespace LuteosFinanceBusinessDictItemSave {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BusinessDictItemSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = BusinessDictItemSaveResp;
  }

  /**
   * No description
   * @tags 业务字典
   * @name LuteosFinanceBusinessDictList
   * @summary 业务字典列表
   * @request GET:/api/luteos/finance/business/dict/list
   * @response `200` `BusinessDictListResp` OK
   */
  export namespace LuteosFinanceBusinessDictList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = BusinessDictListResp;
  }

  /**
   * No description
   * @tags 业务字典
   * @name LuteosFinanceBusinessDictSave
   * @summary 保存业务字典
   * @request POST:/api/luteos/finance/business/dict/save
   * @response `200` `BusinessDictSaveResp` OK
   */
  export namespace LuteosFinanceBusinessDictSave {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BusinessDictSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = BusinessDictSaveResp;
  }

  /**
   * No description
   * @tags 结算组织
   * @name LuteosFinanceSettlementOrganizationList
   * @summary 结算组织列表
   * @request GET:/api/luteos/finance/settlement/organization/list
   * @response `200` `SettlementOrganizationListResp` OK
   */
  export namespace LuteosFinanceSettlementOrganizationList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SettlementOrganizationListResp;
  }

  /**
   * No description
   * @tags 结算组织
   * @name LuteosFinanceSettlementOrganizationSave
   * @summary 保存结算组织
   * @request POST:/api/luteos/finance/settlement/organization/save
   * @response `200` `SettlementOrganizationSaveResp` OK
   */
  export namespace LuteosFinanceSettlementOrganizationSave {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SettlementOrganizationSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SettlementOrganizationSaveResp;
  }
}
