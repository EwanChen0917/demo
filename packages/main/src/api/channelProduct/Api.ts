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
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags 线下渠道商品管理
   * @name LuteosChannelProductDelete
   * @summary 商品删除信息
   * @request POST:/api/luteos/channel/product/delete
   * @response `200` `void` OK
   */
  luteosChannelProductDelete = (req: ChannelProductDeleteReq, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/luteos/channel/product/delete`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 线下渠道商品管理
   * @name LuteosChannelProductExportProduct
   * @summary 商品导出信息
   * @request POST:/api/luteos/channel/product/exportProduct
   * @response `200` `CommonExportResp` OK
   */
  luteosChannelProductExportProduct = (
    req: ChannelProductListQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/channel/product/exportProduct`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 线下渠道商品管理
   * @name LuteosChannelProductImportData
   * @summary 商品导入信息
   * @request POST:/api/luteos/channel/product/importData
   * @response `200` `ImportDataResp` OK
   */
  luteosChannelProductImportData = (req: ImportDataReq, params: RequestParams = {}) =>
    this.request<ImportDataResp, any>({
      path: `/api/luteos/channel/product/importData`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 线下渠道商品管理
   * @name LuteosChannelProductQueryProductList
   * @summary 商品列表查询
   * @request GET:/api/luteos/channel/product/queryProductList
   * @response `200` `ChannelProductListQueryResp` OK
   */
  luteosChannelProductQueryProductList = (
    query: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<ChannelProductListQueryResp, any>({
      path: `/api/luteos/channel/product/queryProductList`,
      method: 'GET',
      query: query,
      ...params,
    });
}
