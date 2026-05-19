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

export namespace Api {
  /**
   * No description
   * @tags 经营管理
   * @name LuteosShopBusinessQueryDetail
   * @summary 经营信息详情查询
   * @request GET:/api/luteos/shop/business/queryDetail
   * @response `200` `BusinessDetailResp` OK
   */
  export namespace LuteosShopBusinessQueryDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 经营信息code */
      code: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = BusinessDetailResp;
  }

  /**
   * No description
   * @tags 经营管理
   * @name LuteosShopBusinessQueryList
   * @summary 经营信息列表查询
   * @request POST:/api/luteos/shop/business/queryList
   * @response `200` `BusinessListResp` OK
   */
  export namespace LuteosShopBusinessQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BusinessListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = BusinessListResp;
  }

  /**
   * No description
   * @tags 经营管理
   * @name LuteosShopBusinessSaveOrUpdate
   * @summary 经营信息保存
   * @request POST:/api/luteos/shop/business/saveOrUpdate
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosShopBusinessSaveOrUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BusinessSaveOrUpdateReq;
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
   * @tags 店铺管理
   * @name LuteosShopClose
   * @summary 关店、开店
   * @request POST:/api/luteos/shop/close
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosShopClose {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 关店开店 */
      open: boolean;
      /** 店铺code */
      shopCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespString;
  }

  /**
   * No description
   * @tags 店铺绩效
   * @name LuteosShopPerformanceEdit
   * @summary 店铺绩效编辑
   * @request POST:/api/luteos/shop/performance/edit
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosShopPerformanceEdit {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ShopPerformanceEditReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespVoid;
  }

  /**
   * No description
   * @tags 店铺绩效
   * @name LuteosShopPerformanceMarkStatus
   * @summary 店铺绩效状态批量标记
   * @request POST:/api/luteos/shop/performance/markStatus
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosShopPerformanceMarkStatus {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ShopPerformanceMarkStatusReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespVoid;
  }

  /**
   * No description
   * @tags 店铺绩效
   * @name LuteosShopPerformanceQueryList
   * @summary 店铺绩效列表查询
   * @request POST:/api/luteos/shop/performance/queryList
   * @response `200` `ShopPerformanceListResp` OK
   */
  export namespace LuteosShopPerformanceQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ShopPerformanceListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ShopPerformanceListResp;
  }

  /**
   * No description
   * @tags 店铺绩效
   * @name LuteosShopPerformanceStateStatistics
   * @summary 店铺绩效状态统计
   * @request POST:/api/luteos/shop/performance/stateStatistics
   * @response `200` `ShopPerformanceStateStatisticsResp` OK
   */
  export namespace LuteosShopPerformanceStateStatistics {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ShopPerformanceStateStatisticsResp;
  }

  /**
   * No description
   * @tags 店铺管理
   * @name LuteosShopQueryShopCommonList
   * @summary 店铺列表查询2
   * @request POST:/api/luteos/shop/queryShopCommonList
   * @response `200` `ShopList2Resp` OK
   */
  export namespace LuteosShopQueryShopCommonList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ShopListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ShopList2Resp;
  }

  /**
   * No description
   * @tags 店铺管理
   * @name LuteosShopQueryShopDetail
   * @summary 店铺详情查询
   * @request GET:/api/luteos/shop/queryShopDetail
   * @response `200` `ShopDetailResp` OK
   */
  export namespace LuteosShopQueryShopDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 店铺code */
      shopCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ShopDetailResp;
  }

  /**
   * No description
   * @tags 店铺管理
   * @name LuteosShopQueryShopList
   * @summary 店铺列表查询
   * @request POST:/api/luteos/shop/queryShopList
   * @response `200` `ShopListResp` OK
   */
  export namespace LuteosShopQueryShopList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ShopListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ShopListResp;
  }

  /**
   * No description
   * @tags 店铺管理
   * @name LuteosShopRecycleLabel
   * @summary 回收标签设置
   * @request POST:/api/luteos/shop/recycleLabel
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosShopRecycleLabel {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ShopRecycleLabelSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespString;
  }

  /**
   * No description
   * @tags 店铺管理
   * @name LuteosShopSaveOrUpdate
   * @summary 新增或者编辑
   * @request POST:/api/luteos/shop/saveOrUpdate
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosShopSaveOrUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ShopSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespString;
  }

  /**
   * No description
   * @tags 店铺管理
   * @name LuteosShopSaveRemark
   * @summary 店铺备注
   * @request POST:/api/luteos/shop/saveRemark
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosShopSaveRemark {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ShopRemarkSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespString;
  }

  /**
   * No description
   * @tags 店铺管理
   * @name LuteosShopSelectEcShopList
   * @summary 查询店铺列表-易仓店铺账号
   * @request GET:/api/luteos/shop/selectEcShopList
   * @response `200` `(DictBean)[]` OK
   */
  export namespace LuteosShopSelectEcShopList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DictBean[];
  }

  /**
   * No description
   * @tags 店铺管理
   * @name LuteosShopSelectShopList
   * @summary 查询店铺列表
   * @request GET:/api/luteos/shop/selectShopList
   * @response `200` `(DictBean)[]` OK
   */
  export namespace LuteosShopSelectShopList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 平台 amazon shopify walmart ... */
      platform?: string;
      /** 站点 */
      site?: string;
      /** 站点 可多选 */
      siteList?: string[];
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DictBean[];
  }
}
