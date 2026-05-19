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
  ChannelProductDeleteReq,
  ChannelProductListQueryReq,
  ChannelProductListQueryResp,
  CommonExportResp,
  ImportDataReq,
  ImportDataResp,
} from './data-contracts';

export namespace Api {
  /**
   * No description
   * @tags 线下渠道商品管理
   * @name LuteosChannelProductDelete
   * @summary 商品删除信息
   * @request POST:/api/luteos/channel/product/delete
   * @response `200` `void` OK
   */
  export namespace LuteosChannelProductDelete {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ChannelProductDeleteReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags 线下渠道商品管理
   * @name LuteosChannelProductExportProduct
   * @summary 商品导出信息
   * @request POST:/api/luteos/channel/product/exportProduct
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosChannelProductExportProduct {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ChannelProductListQueryReq;
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
   * @tags 线下渠道商品管理
   * @name LuteosChannelProductImportData
   * @summary 商品导入信息
   * @request POST:/api/luteos/channel/product/importData
   * @response `200` `ImportDataResp` OK
   */
  export namespace LuteosChannelProductImportData {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ImportDataReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ImportDataResp;
  }

  /**
   * No description
   * @tags 线下渠道商品管理
   * @name LuteosChannelProductQueryProductList
   * @summary 商品列表查询
   * @request GET:/api/luteos/channel/product/queryProductList
   * @response `200` `ChannelProductListQueryResp` OK
   */
  export namespace LuteosChannelProductQueryProductList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 关键词 */
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
      /** 料号/SKU集合 唯一编码 */
      productSkuList?: string[];
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ChannelProductListQueryResp;
  }
}
