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
  CommonExportResp,
  CommonRespBoolean,
  CommonRespObject,
  MetaOperatorQueryResp,
  PdtProductAnalysisResponse,
  PdtProductCancelReq,
  PdtProductComplianceRateTrendencyResponse,
  PdtProductCurrentMonthHandleReq,
  PdtProductCurrentMontyHandleResp,
  PdtProductDeleteReq,
  PdtProductManagerReq,
  PdtProductOperateReq,
  PdtProductOperationResponse,
  PdtProductPageResponse,
  PdtProductReq,
  PdtProductStarAndDelayAnalysisResponse,
  PdtProductStarReq,
  PdtProductStartAndDelayReq,
  PdtProductSummaryBean,
  PdtProductTableReq,
  PdtProductUpdateListingTimeReq,
  PdtProductUpdateReq,
  PdtProductYearLineAnalysisReq,
  PdtProductYearLineAnalysisResponse,
  PdtProductYearReq,
  PdtSpuCombineReq,
  ProductLineResponse,
  SpuYearTargetSummaryResp,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags 产品管理
   * @name LuteosPdtCancelPdtProduct
   * @summary 取消产品
   * @request POST:/api/luteos/pdt/cancelPdtProduct
   * @response `200` `CommonRespObject` OK
   */
  luteosPdtCancelPdtProduct = (req: PdtProductCancelReq, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/pdt/cancelPdtProduct`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 产品管理
   * @name LuteosPdtCombineSpu
   * @summary 年规产品关联SPU
   * @request POST:/api/luteos/pdt/combineSpu
   * @deprecated
   * @response `200` `CommonRespObject` OK
   */
  luteosPdtCombineSpu = (req: PdtSpuCombineReq, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/pdt/combineSpu`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 产品管理
   * @name LuteosPdtDeletePdtProduct
   * @summary 删除产品
   * @request POST:/api/luteos/pdt/deletePdtProduct
   * @response `200` `CommonRespBoolean` OK
   */
  luteosPdtDeletePdtProduct = (req: PdtProductDeleteReq, params: RequestParams = {}) =>
    this.request<CommonRespBoolean, any>({
      path: `/api/luteos/pdt/deletePdtProduct`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 产品管理
   * @name LuteosPdtExportProduct
   * @summary 年规商品导出
   * @request POST:/api/luteos/pdt/exportProduct
   * @response `200` `CommonExportResp` OK
   */
  luteosPdtExportProduct = (req: PdtProductTableReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/pdt/exportProduct`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 首页看板
   * @name LuteosPdtGetComplianceTrendency
   * @summary 全年产品达标率趋势图
   * @request POST:/api/luteos/pdt/getComplianceTrendency
   * @response `200` `PdtProductComplianceRateTrendencyResponse` OK
   */
  luteosPdtGetComplianceTrendency = (req: PdtProductYearReq, params: RequestParams = {}) =>
    this.request<PdtProductComplianceRateTrendencyResponse, any>({
      path: `/api/luteos/pdt/getComplianceTrendency`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 首页看板
   * @name LuteosPdtGetMonthHandleAnalysis
   * @summary 当月交付新品
   * @request POST:/api/luteos/pdt/getMonthHandleAnalysis
   * @response `200` `PdtProductCurrentMontyHandleResp` OK
   */
  luteosPdtGetMonthHandleAnalysis = (
    req: PdtProductCurrentMonthHandleReq,
    params: RequestParams = {},
  ) =>
    this.request<PdtProductCurrentMontyHandleResp, any>({
      path: `/api/luteos/pdt/getMonthHandleAnalysis`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 首页看板
   * @name LuteosPdtGetPdtProductAvgStartAndDealyCount
   * @summary 年度分值
   * @request POST:/api/luteos/pdt/getPdtProductAvgStartAndDealyCount
   * @response `200` `PdtProductStarAndDelayAnalysisResponse` OK
   */
  luteosPdtGetPdtProductAvgStartAndDealyCount = (
    req: PdtProductStartAndDelayReq,
    params: RequestParams = {},
  ) =>
    this.request<PdtProductStarAndDelayAnalysisResponse, any>({
      path: `/api/luteos/pdt/getPdtProductAvgStartAndDealyCount`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 首页看板
   * @name LuteosPdtGetYearProductLineAnalysis
   * @summary 全年新品分类
   * @request POST:/api/luteos/pdt/getYearProductLineAnalysis
   * @response `200` `PdtProductYearLineAnalysisResponse` OK
   */
  luteosPdtGetYearProductLineAnalysis = (
    req: PdtProductYearLineAnalysisReq,
    params: RequestParams = {},
  ) =>
    this.request<PdtProductYearLineAnalysisResponse, any>({
      path: `/api/luteos/pdt/getYearProductLineAnalysis`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 首页看板
   * @name LuteosPdtGetYearProductManagerAnalysis
   * @summary 全年新品上线总数-产品经理列表
   * @request POST:/api/luteos/pdt/getYearProductManagerAnalysis
   * @response `200` `PdtProductAnalysisResponse` OK
   */
  luteosPdtGetYearProductManagerAnalysis = (
    req: PdtProductManagerReq,
    params: RequestParams = {},
  ) =>
    this.request<PdtProductAnalysisResponse, any>({
      path: `/api/luteos/pdt/getYearProductManagerAnalysis`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 产品管理
   * @name LuteosPdtOperatePdt
   * @summary 操作新品年规
   * @request POST:/api/luteos/pdt/operatePdt
   * @response `200` `CommonRespObject` OK
   */
  luteosPdtOperatePdt = (req: PdtProductOperateReq, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/pdt/operatePdt`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 产品管理
   * @name LuteosPdtQueryOperationLog
   * @summary 查询操作日志
   * @request POST:/api/luteos/pdt/queryOperationLog
   * @response `200` `PdtProductOperationResponse` OK
   */
  luteosPdtQueryOperationLog = (req: PdtProductTableReq, params: RequestParams = {}) =>
    this.request<PdtProductOperationResponse, any>({
      path: `/api/luteos/pdt/queryOperationLog`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 产品管理
   * @name LuteosPdtQueryOperatorList
   * @summary 获取产品/项目经理列表
   * @request GET:/api/luteos/pdt/queryOperatorList
   * @response `200` `MetaOperatorQueryResp` OK
   */
  luteosPdtQueryOperatorList = (
    query: {
      /**
       * 员工类型 1-产品经理 2-项目经理
       * @format int32
       */
      operatorType: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<MetaOperatorQueryResp, any>({
      path: `/api/luteos/pdt/queryOperatorList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 产品管理
   * @name LuteosPdtQueryPdtProductLine
   * @summary 查询产品线
   * @request POST:/api/luteos/pdt/queryPdtProductLine
   * @response `200` `ProductLineResponse` OK
   */
  luteosPdtQueryPdtProductLine = (params: RequestParams = {}) =>
    this.request<ProductLineResponse, any>({
      path: `/api/luteos/pdt/queryPdtProductLine`,
      method: 'POST',
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 产品管理
   * @name LuteosPdtQueryPdtProductSummary
   * @summary 年度年规产品统计
   * @request POST:/api/luteos/pdt/queryPdtProductSummary
   * @response `200` `PdtProductSummaryBean` OK
   */
  luteosPdtQueryPdtProductSummary = (req: PdtProductReq, params: RequestParams = {}) =>
    this.request<PdtProductSummaryBean, any>({
      path: `/api/luteos/pdt/queryPdtProductSummary`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 产品管理
   * @name LuteosPdtQueryPdtProductTableList
   * @summary 查询年度新品数据-表格
   * @request POST:/api/luteos/pdt/queryPdtProductTableList
   * @response `200` `PdtProductPageResponse` OK
   */
  luteosPdtQueryPdtProductTableList = (req: PdtProductTableReq, params: RequestParams = {}) =>
    this.request<PdtProductPageResponse, any>({
      path: `/api/luteos/pdt/queryPdtProductTableList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 产品管理
   * @name LuteosPdtQuerySpuYearTargetSummary
   * @summary SPU年度销售目标统计
   * @request GET:/api/luteos/pdt/querySpuYearTargetSummary
   * @response `200` `SpuYearTargetSummaryResp` OK
   */
  luteosPdtQuerySpuYearTargetSummary = (
    query: {
      /** SPU */
      spuCode: string;
      /**
       * 年份
       * @format int32
       */
      year?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<SpuYearTargetSummaryResp, any>({
      path: `/api/luteos/pdt/querySpuYearTargetSummary`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 产品管理
   * @name LuteosPdtReviewStar
   * @summary 更新评分
   * @request POST:/api/luteos/pdt/reviewStar
   * @response `200` `CommonRespObject` OK
   */
  luteosPdtReviewStar = (req: PdtProductStarReq, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/pdt/reviewStar`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 产品管理
   * @name LuteosPdtUpdateListingTime
   * @summary 更新上架时间
   * @request POST:/api/luteos/pdt/updateListingTime
   * @response `200` `CommonRespBoolean` OK
   */
  luteosPdtUpdateListingTime = (req: PdtProductUpdateListingTimeReq, params: RequestParams = {}) =>
    this.request<CommonRespBoolean, any>({
      path: `/api/luteos/pdt/updateListingTime`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 产品管理
   * @name LuteosPdtUpdatePdtProduct
   * @summary 编辑产品信息
   * @request POST:/api/luteos/pdt/updatePdtProduct
   * @response `200` `CommonRespBoolean` OK
   */
  luteosPdtUpdatePdtProduct = (req: PdtProductUpdateReq, params: RequestParams = {}) =>
    this.request<CommonRespBoolean, any>({
      path: `/api/luteos/pdt/updatePdtProduct`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
}
