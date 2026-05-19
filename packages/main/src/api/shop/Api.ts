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
  BusinessDetailResp,
  BusinessListQueryReq,
  BusinessListResp,
  BusinessSaveOrUpdateReq,
  CommonResp,
  CommonRespString,
  CommonRespVoid,
  DictBean,
  ShopDetailResp,
  ShopList2Resp,
  ShopListQueryReq,
  ShopListResp,
  ShopPerformanceEditReq,
  ShopPerformanceListReq,
  ShopPerformanceListResp,
  ShopPerformanceMarkStatusReq,
  ShopPerformanceStateStatisticsResp,
  ShopRecycleLabelSaveReq,
  ShopRemarkSaveReq,
  ShopSaveReq,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags 经营管理
   * @name LuteosShopBusinessQueryDetail
   * @summary 经营信息详情查询
   * @request GET:/api/luteos/shop/business/queryDetail
   * @response `200` `BusinessDetailResp` OK
   */
  luteosShopBusinessQueryDetail = (
    query: {
      /** 经营信息code */
      code: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<BusinessDetailResp, any>({
      path: `/api/luteos/shop/business/queryDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 经营管理
   * @name LuteosShopBusinessQueryList
   * @summary 经营信息列表查询
   * @request POST:/api/luteos/shop/business/queryList
   * @response `200` `BusinessListResp` OK
   */
  luteosShopBusinessQueryList = (req: BusinessListQueryReq, params: RequestParams = {}) =>
    this.request<BusinessListResp, any>({
      path: `/api/luteos/shop/business/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 经营管理
   * @name LuteosShopBusinessSaveOrUpdate
   * @summary 经营信息保存
   * @request POST:/api/luteos/shop/business/saveOrUpdate
   * @response `200` `CommonResp` OK
   */
  luteosShopBusinessSaveOrUpdate = (req: BusinessSaveOrUpdateReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/shop/business/saveOrUpdate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 店铺管理
   * @name LuteosShopClose
   * @summary 关店、开店
   * @request POST:/api/luteos/shop/close
   * @response `200` `CommonRespString` OK
   */
  luteosShopClose = (
    query: {
      /** 关店开店 */
      open: boolean;
      /** 店铺code */
      shopCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/shop/close`,
      method: 'POST',
      query: query,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 店铺绩效
   * @name LuteosShopPerformanceEdit
   * @summary 店铺绩效编辑
   * @request POST:/api/luteos/shop/performance/edit
   * @response `200` `CommonRespVoid` OK
   */
  luteosShopPerformanceEdit = (req: ShopPerformanceEditReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/shop/performance/edit`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 店铺绩效
   * @name LuteosShopPerformanceMarkStatus
   * @summary 店铺绩效状态批量标记
   * @request POST:/api/luteos/shop/performance/markStatus
   * @response `200` `CommonRespVoid` OK
   */
  luteosShopPerformanceMarkStatus = (
    req: ShopPerformanceMarkStatusReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/shop/performance/markStatus`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 店铺绩效
   * @name LuteosShopPerformanceQueryList
   * @summary 店铺绩效列表查询
   * @request POST:/api/luteos/shop/performance/queryList
   * @response `200` `ShopPerformanceListResp` OK
   */
  luteosShopPerformanceQueryList = (req: ShopPerformanceListReq, params: RequestParams = {}) =>
    this.request<ShopPerformanceListResp, any>({
      path: `/api/luteos/shop/performance/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 店铺绩效
   * @name LuteosShopPerformanceStateStatistics
   * @summary 店铺绩效状态统计
   * @request POST:/api/luteos/shop/performance/stateStatistics
   * @response `200` `ShopPerformanceStateStatisticsResp` OK
   */
  luteosShopPerformanceStateStatistics = (params: RequestParams = {}) =>
    this.request<ShopPerformanceStateStatisticsResp, any>({
      path: `/api/luteos/shop/performance/stateStatistics`,
      method: 'POST',
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 店铺管理
   * @name LuteosShopQueryShopCommonList
   * @summary 店铺列表查询2
   * @request POST:/api/luteos/shop/queryShopCommonList
   * @response `200` `ShopList2Resp` OK
   */
  luteosShopQueryShopCommonList = (
    shopListQueryReq: ShopListQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<ShopList2Resp, any>({
      path: `/api/luteos/shop/queryShopCommonList`,
      method: 'POST',
      body: shopListQueryReq,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 店铺管理
   * @name LuteosShopQueryShopDetail
   * @summary 店铺详情查询
   * @request GET:/api/luteos/shop/queryShopDetail
   * @response `200` `ShopDetailResp` OK
   */
  luteosShopQueryShopDetail = (
    query: {
      /** 店铺code */
      shopCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<ShopDetailResp, any>({
      path: `/api/luteos/shop/queryShopDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 店铺管理
   * @name LuteosShopQueryShopList
   * @summary 店铺列表查询
   * @request POST:/api/luteos/shop/queryShopList
   * @response `200` `ShopListResp` OK
   */
  luteosShopQueryShopList = (shopListQueryReq: ShopListQueryReq, params: RequestParams = {}) =>
    this.request<ShopListResp, any>({
      path: `/api/luteos/shop/queryShopList`,
      method: 'POST',
      body: shopListQueryReq,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 店铺管理
   * @name LuteosShopRecycleLabel
   * @summary 回收标签设置
   * @request POST:/api/luteos/shop/recycleLabel
   * @response `200` `CommonRespString` OK
   */
  luteosShopRecycleLabel = (req: ShopRecycleLabelSaveReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/shop/recycleLabel`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 店铺管理
   * @name LuteosShopSaveOrUpdate
   * @summary 新增或者编辑
   * @request POST:/api/luteos/shop/saveOrUpdate
   * @response `200` `CommonRespString` OK
   */
  luteosShopSaveOrUpdate = (req: ShopSaveReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/shop/saveOrUpdate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 店铺管理
   * @name LuteosShopSaveRemark
   * @summary 店铺备注
   * @request POST:/api/luteos/shop/saveRemark
   * @response `200` `CommonRespString` OK
   */
  luteosShopSaveRemark = (shopRemarkSaveReq: ShopRemarkSaveReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/shop/saveRemark`,
      method: 'POST',
      body: shopRemarkSaveReq,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 店铺管理
   * @name LuteosShopSelectEcShopList
   * @summary 查询店铺列表-易仓店铺账号
   * @request GET:/api/luteos/shop/selectEcShopList
   * @response `200` `(DictBean)[]` OK
   */
  luteosShopSelectEcShopList = (params: RequestParams = {}) =>
    this.request<DictBean[], any>({
      path: `/api/luteos/shop/selectEcShopList`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 店铺管理
   * @name LuteosShopSelectShopList
   * @summary 查询店铺列表
   * @request GET:/api/luteos/shop/selectShopList
   * @response `200` `(DictBean)[]` OK
   */
  luteosShopSelectShopList = (
    query?: {
      /** 平台 amazon shopify walmart ... */
      platform?: string;
      /** 站点 */
      site?: string;
      /** 站点 可多选 */
      siteList?: string[];
    },
    params: RequestParams = {},
  ) =>
    this.request<DictBean[], any>({
      path: `/api/luteos/shop/selectShopList`,
      method: 'GET',
      query: query,
      ...params,
    });
}
