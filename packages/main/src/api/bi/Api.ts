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
  AdAnalysisResp,
  AdCategoryAnalysisResp,
  AdCountryAnalysisResp,
  AdNameAnalysisResp,
  AfterSalesAnalysisResp,
  AnalysisResultResp,
  AverageOrderAmountTrendResp,
  BaseVocQueryReq,
  BiDimension,
  BiDimensionAddReq,
  BiDimensionListReq,
  BiDimensionUpdateReq,
  BiMetric,
  BiMetricAddReq,
  BiMetricListReq,
  BiMetricUpdateReq,
  BiReportAddReq,
  BiReportConfig,
  BiReportConfigAddReq,
  BiReportConfigListReq,
  BiReportConfigUpdateReq,
  BiReportDimension,
  BiReportDimensionAddReq,
  BiReportDimensionListReq,
  BiReportDimensionUpdateReq,
  BiReportListReq,
  BiReportListResp,
  BiReportUpdateReq,
  BiTableAddReq,
  BiTableListReq,
  BiTableListResp,
  BiTableUpdateReq,
  BrandAnalysisResp,
  ClicksScopeSaveReq,
  CommonAnalysisPageReq,
  CommonAnalysisReq,
  CommonReq,
  CommonRespBoolean,
  CommonRespString,
  CommonRespVoid,
  CompetitiveInsightResp,
  CustomerVoiceResp,
  DeveloperResp,
  DynamicDataPageResp,
  DynamicExcelImportOssReq,
  DynamicExcelImportResult,
  DynamicTableCreateReq,
  DynamicTableDetailResp,
  DynamicTableImportFromDdlReq,
  DynamicTableImportFromDdlResp,
  DynamicTablePageResp,
  DynamicTableUpdateReq,
  EnumsReq,
  EnumsResp,
  FrontPageReq,
  FrontPageResp,
  IndustryTrendResp,
  InventoryTurnoverResp,
  LogisticsChannelReq,
  LogisticsChannelResp,
  ManageAnalysisEnumsResp,
  ManageAnalysisResp,
  MetricResp,
  MpcSpuAnalysisEnumsResp,
  MpcSpuAnalysisReq,
  MpcSpuAnalysisResp,
  PriceConfigSaveReq,
  ProductManagerResp,
  QueryReq,
  QueryResp,
  RealTimeSaleAnalysisResp,
  ReportConfigReq,
  ReportConfigResp,
  ReturnRateResp,
  SalesAnalysisResp,
  SalesDayAnalysisResp,
  SalesMonthAnalysisResp,
  SalesWeekAnalysisResp,
  SalesYearAnalysisResp,
  SaveAnalysisResultReq,
  TimeZoneResp,
  VocAnalysisEnumsResp,
  VocAnalysisReq,
  VocAnalysisResp,
  VocConditionQueryResp,
  VocCoreIndicatorReq,
  VocCoreIndicatorResp,
  VocEndDateResp,
  VocProductAnalysisReq,
  VocProductAnalysisResp,
  VocProductLineResp,
  VocProductRatingReq,
  VocProductRatingResp,
  VocProductRatingSpuDetailReq,
  VocProductRatingSpuDetailResp,
  VocTagDistributionReq,
  VocTagDistributionResp,
  VocTagLevelDetailReq,
  VocTagLevelDetailResp,
  VocTagListReq,
  VocTagListResp,
  VocTvNewProductReturnRateResp,
  VocTvNewProductSpuResp,
  VocTvNewProductTagTrendResp,
  VocTvProductLineReturnRateResp,
  VocTvReturnTagTopResp,
  VocTvTagTrendResp,
  WeekReq,
  WeekResp,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags 广告分析
   * @name BiAdQueryAdAnalysis
   * @summary 广告分析数据查询
   * @request POST:/api/bi/ad/queryAdAnalysis
   * @response `200` `AdAnalysisResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biAdQueryAdAnalysis = (req: CommonAnalysisReq, params: RequestParams = {}) =>
    this.request<AdAnalysisResp, void>({
      path: `/api/bi/ad/queryAdAnalysis`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 广告分析
   * @name BiAdQueryAdCategory4ByCategory
   * @summary 广告分析品类下钻四级品类
   * @request POST:/api/bi/ad/queryAdCategory4ByCategory
   * @response `200` `AdCategoryAnalysisResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biAdQueryAdCategory4ByCategory = (req: CommonAnalysisPageReq, params: RequestParams = {}) =>
    this.request<AdCategoryAnalysisResp, void>({
      path: `/api/bi/ad/queryAdCategory4ByCategory`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 广告分析
   * @name BiAdQueryAdCategoryPage
   * @summary 广告分析品类数据分页查询
   * @request POST:/api/bi/ad/queryAdCategoryPage
   * @response `200` `AdCategoryAnalysisResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biAdQueryAdCategoryPage = (req: CommonAnalysisPageReq, params: RequestParams = {}) =>
    this.request<AdCategoryAnalysisResp, void>({
      path: `/api/bi/ad/queryAdCategoryPage`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 广告分析
   * @name BiAdQueryAdCountryPage
   * @summary 广告分析国家数据分页查询
   * @request POST:/api/bi/ad/queryAdCountryPage
   * @response `200` `AdCountryAnalysisResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biAdQueryAdCountryPage = (req: CommonAnalysisPageReq, params: RequestParams = {}) =>
    this.request<AdCountryAnalysisResp, void>({
      path: `/api/bi/ad/queryAdCountryPage`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 广告分析
   * @name BiAdQueryAdNamePage
   * @summary 广告分析广告活动数据分页查询
   * @request POST:/api/bi/ad/queryAdNamePage
   * @response `200` `AdNameAnalysisResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biAdQueryAdNamePage = (req: CommonAnalysisPageReq, params: RequestParams = {}) =>
    this.request<AdNameAnalysisResp, void>({
      path: `/api/bi/ad/queryAdNamePage`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 广告分析
   * @name BiAdQueryAdQuadrantAnalysis
   * @summary 广告分析象限数据查询
   * @request POST:/api/bi/ad/queryAdQuadrantAnalysis
   * @response `200` `AdAnalysisResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biAdQueryAdQuadrantAnalysis = (req: CommonAnalysisReq, params: RequestParams = {}) =>
    this.request<AdAnalysisResp, void>({
      path: `/api/bi/ad/queryAdQuadrantAnalysis`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 广告分析
   * @name BiAdQueryAdSpuByCategory4
   * @summary 广告分析品类下钻SPU
   * @request POST:/api/bi/ad/queryAdSpuByCategory4
   * @response `200` `AdCategoryAnalysisResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biAdQueryAdSpuByCategory4 = (req: CommonAnalysisPageReq, params: RequestParams = {}) =>
    this.request<AdCategoryAnalysisResp, void>({
      path: `/api/bi/ad/queryAdSpuByCategory4`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 广告分析
   * @name BiAdSaveClicksScope
   * @summary 保存点击量范围
   * @request POST:/api/bi/ad/saveClicksScope
   * @response `200` `CommonRespString` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biAdSaveClicksScope = (req: ClicksScopeSaveReq, params: RequestParams = {}) =>
    this.request<CommonRespString, void>({
      path: `/api/bi/ad/saveClicksScope`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 售后&VOC专题
   * @name BiAfterSalesQueryAfterSalesAnalysis
   * @summary 查询售后&VOC专题
   * @request POST:/api/bi/afterSales/queryAfterSalesAnalysis
   * @response `200` `AfterSalesAnalysisResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biAfterSalesQueryAfterSalesAnalysis = (req: CommonAnalysisReq, params: RequestParams = {}) =>
    this.request<AfterSalesAnalysisResp, void>({
      path: `/api/bi/afterSales/queryAfterSalesAnalysis`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 售后&VOC专题
   * @name BiAfterSalesQueryDimensionAnalysis
   * @summary 查询下钻维度分析
   * @request POST:/api/bi/afterSales/queryDimensionAnalysis
   * @response `200` `AfterSalesAnalysisResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biAfterSalesQueryDimensionAnalysis = (req: CommonAnalysisReq, params: RequestParams = {}) =>
    this.request<AfterSalesAnalysisResp, void>({
      path: `/api/bi/afterSales/queryDimensionAnalysis`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 售后&VOC专题
   * @name BiAfterSalesQueryEnums
   * @summary 查询经营分析枚举
   * @request POST:/api/bi/afterSales/queryEnums
   * @response `200` `ManageAnalysisEnumsResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biAfterSalesQueryEnums = (req: CommonAnalysisReq, params: RequestParams = {}) =>
    this.request<ManageAnalysisEnumsResp, void>({
      path: `/api/bi/afterSales/queryEnums`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 经营分析
   * @name BiAnalysisAppQueryManageAnalysis
   * @summary 查询星图指挥舱首页
   * @request POST:/api/bi/analysis/app/queryManageAnalysis
   * @response `200` `ManageAnalysisResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biAnalysisAppQueryManageAnalysis = (req: CommonAnalysisReq, params: RequestParams = {}) =>
    this.request<ManageAnalysisResp, void>({
      path: `/api/bi/analysis/app/queryManageAnalysis`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 经营分析
   * @name BiAnalysisAppQueryTrendAnalysis
   * @summary 查询星图指挥舱首页趋势分析
   * @request POST:/api/bi/analysis/app/queryTrendAnalysis
   * @response `200` `ManageAnalysisResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biAnalysisAppQueryTrendAnalysis = (req: CommonAnalysisReq, params: RequestParams = {}) =>
    this.request<ManageAnalysisResp, void>({
      path: `/api/bi/analysis/app/queryTrendAnalysis`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 经营分析
   * @name BiAnalysisQueryAiAnalysisResult
   * @summary 查询AI分析结果
   * @request POST:/api/bi/analysis/queryAiAnalysisResult
   * @response `200` `ManageAnalysisResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biAnalysisQueryAiAnalysisResult = (req: CommonAnalysisReq, params: RequestParams = {}) =>
    this.request<ManageAnalysisResp, void>({
      path: `/api/bi/analysis/queryAiAnalysisResult`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 经营分析
   * @name BiAnalysisQueryAverageOrderAmountTrends
   * @summary 查询客单价趋势
   * @request POST:/api/bi/analysis/queryAverageOrderAmountTrends
   * @response `200` `AverageOrderAmountTrendResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biAnalysisQueryAverageOrderAmountTrends = (req: CommonAnalysisReq, params: RequestParams = {}) =>
    this.request<AverageOrderAmountTrendResp, void>({
      path: `/api/bi/analysis/queryAverageOrderAmountTrends`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 经营分析
   * @name BiAnalysisQueryDimensionAnalysis
   * @summary 查询下钻维度分析
   * @request POST:/api/bi/analysis/queryDimensionAnalysis
   * @response `200` `ManageAnalysisResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biAnalysisQueryDimensionAnalysis = (req: CommonAnalysisReq, params: RequestParams = {}) =>
    this.request<ManageAnalysisResp, void>({
      path: `/api/bi/analysis/queryDimensionAnalysis`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 经营分析
   * @name BiAnalysisQueryEnums
   * @summary 查询经营分析枚举
   * @request POST:/api/bi/analysis/queryEnums
   * @response `200` `ManageAnalysisEnumsResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biAnalysisQueryEnums = (req: CommonAnalysisReq, params: RequestParams = {}) =>
    this.request<ManageAnalysisEnumsResp, void>({
      path: `/api/bi/analysis/queryEnums`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 经营分析
   * @name BiAnalysisQueryLastDate
   * @summary 查询截止时间
   * @request GET:/api/bi/analysis/queryLastDate
   * @response `200` `CommonRespString` OK
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biAnalysisQueryLastDate = (params: RequestParams = {}) =>
    this.request<CommonRespString, void>({
      path: `/api/bi/analysis/queryLastDate`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 经营分析
   * @name BiAnalysisQueryManageAnalysis
   * @summary 查询经营分析
   * @request POST:/api/bi/analysis/queryManageAnalysis
   * @response `200` `ManageAnalysisResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biAnalysisQueryManageAnalysis = (req: CommonAnalysisReq, params: RequestParams = {}) =>
    this.request<ManageAnalysisResp, void>({
      path: `/api/bi/analysis/queryManageAnalysis`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 品牌分析
   * @name BiBrandQueryBrandAnalysis
   * @summary 查询品牌分析
   * @request POST:/api/bi/brand/queryBrandAnalysis
   * @response `200` `BrandAnalysisResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biBrandQueryBrandAnalysis = (req: CommonAnalysisReq, params: RequestParams = {}) =>
    this.request<BrandAnalysisResp, void>({
      path: `/api/bi/brand/queryBrandAnalysis`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 品牌分析
   * @name BiBrandQueryDimensionAnalysis
   * @summary 查询下钻维度分析
   * @request POST:/api/bi/brand/queryDimensionAnalysis
   * @response `200` `BrandAnalysisResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biBrandQueryDimensionAnalysis = (req: CommonAnalysisReq, params: RequestParams = {}) =>
    this.request<BrandAnalysisResp, void>({
      path: `/api/bi/brand/queryDimensionAnalysis`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 品牌分析
   * @name BiBrandQueryEnums
   * @summary 查询品牌分析枚举
   * @request POST:/api/bi/brand/queryEnums
   * @response `200` `ManageAnalysisEnumsResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biBrandQueryEnums = (req: CommonAnalysisReq, params: RequestParams = {}) =>
    this.request<ManageAnalysisEnumsResp, void>({
      path: `/api/bi/brand/queryEnums`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 通用接口
   * @name BiCommonQueryDataByConfigId
   * @summary 根据配置ID查询数据
   * @request POST:/api/bi/common/queryDataByConfigId
   * @response `200` `QueryResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biCommonQueryDataByConfigId = (req: CommonReq, params: RequestParams = {}) =>
    this.request<QueryResp, void>({
      path: `/api/bi/common/queryDataByConfigId`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 通用接口
   * @name BiCommonQueryEnums
   * @summary 查询枚举
   * @request POST:/api/bi/common/queryEnums
   * @response `200` `EnumsResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biCommonQueryEnums = (req: EnumsReq, params: RequestParams = {}) =>
    this.request<EnumsResp, void>({
      path: `/api/bi/common/queryEnums`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 通用接口
   * @name BiCommonQueryMetric
   * @summary 查询指标说明
   * @request GET:/api/bi/common/queryMetric
   * @response `200` `MetricResp` OK
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biCommonQueryMetric = (
    query?: {
      /** page */
      page?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<MetricResp, void>({
      path: `/api/bi/common/queryMetric`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 通用接口
   * @name BiCommonQueryReportConfig
   * @summary 查询看板配置
   * @request POST:/api/bi/common/queryReportConfig
   * @response `200` `ReportConfigResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biCommonQueryReportConfig = (req: ReportConfigReq, params: RequestParams = {}) =>
    this.request<ReportConfigResp, void>({
      path: `/api/bi/common/queryReportConfig`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 通用接口
   * @name BiCommonQueryWeek
   * @summary 查询周
   * @request POST:/api/bi/common/queryWeek
   * @response `200` `WeekResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biCommonQueryWeek = (req: WeekReq, params: RequestParams = {}) =>
    this.request<WeekResp, void>({
      path: `/api/bi/common/queryWeek`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP首页 - 产品经理看板
   * @name BiDeveloperQuery
   * @summary 查询首页数据
   * @request POST:/api/bi/developer/query
   * @response `200` `DeveloperResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biDeveloperQuery = (req: CommonAnalysisReq, params: RequestParams = {}) =>
    this.request<DeveloperResp, void>({
      path: `/api/bi/developer/query`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP首页 - 产品经理看板
   * @name BiDeveloperQueryReviewUnusual
   * @summary 查询Review异常
   * @request POST:/api/bi/developer/queryReviewUnusual
   * @response `200` `DeveloperResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biDeveloperQueryReviewUnusual = (req: CommonAnalysisReq, params: RequestParams = {}) =>
    this.request<DeveloperResp, void>({
      path: `/api/bi/developer/queryReviewUnusual`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP首页 - 产品经理看板
   * @name BiDeveloperSalesQueryDimensionAnalysis
   * @summary 查询下钻维度分析
   * @request POST:/api/bi/developer/sales/queryDimensionAnalysis
   * @response `200` `DeveloperResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biDeveloperSalesQueryDimensionAnalysis = (req: CommonAnalysisReq, params: RequestParams = {}) =>
    this.request<DeveloperResp, void>({
      path: `/api/bi/developer/sales/queryDimensionAnalysis`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP首页
   * @name BiFrontpageQueryAdAnalysis
   * @summary 查询广告分析
   * @request POST:/api/bi/frontpage/queryAdAnalysis
   * @response `200` `FrontPageResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biFrontpageQueryAdAnalysis = (req: FrontPageReq, params: RequestParams = {}) =>
    this.request<FrontPageResp, void>({
      path: `/api/bi/frontpage/queryAdAnalysis`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP首页
   * @name BiFrontpageQueryAfterSalesAnalysis
   * @summary 查询售后分析
   * @request POST:/api/bi/frontpage/queryAfterSalesAnalysis
   * @response `200` `FrontPageResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biFrontpageQueryAfterSalesAnalysis = (req: FrontPageReq, params: RequestParams = {}) =>
    this.request<FrontPageResp, void>({
      path: `/api/bi/frontpage/queryAfterSalesAnalysis`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP首页
   * @name BiFrontpageQueryAreaSalesAnalysisList
   * @summary 查询区域 SPU 排行
   * @request POST:/api/bi/frontpage/queryAreaSalesAnalysisList
   * @response `200` `FrontPageResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biFrontpageQueryAreaSalesAnalysisList = (req: FrontPageReq, params: RequestParams = {}) =>
    this.request<FrontPageResp, void>({
      path: `/api/bi/frontpage/queryAreaSalesAnalysisList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP首页
   * @name BiFrontpageQueryEnums
   * @summary 查询首页枚举
   * @request POST:/api/bi/frontpage/queryEnums
   * @response `200` `ManageAnalysisEnumsResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biFrontpageQueryEnums = (req: FrontPageReq, params: RequestParams = {}) =>
    this.request<ManageAnalysisEnumsResp, void>({
      path: `/api/bi/frontpage/queryEnums`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP首页
   * @name BiFrontpageQueryFrontPage
   * @summary 查询首页数据
   * @request POST:/api/bi/frontpage/queryFrontPage
   * @response `200` `FrontPageResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biFrontpageQueryFrontPage = (req: FrontPageReq, params: RequestParams = {}) =>
    this.request<FrontPageResp, void>({
      path: `/api/bi/frontpage/queryFrontPage`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP首页
   * @name BiFrontpageQueryGtmSalesAnalysisList
   * @summary 查询 GTM 组 SPU 排行
   * @request POST:/api/bi/frontpage/queryGtmSalesAnalysisList
   * @response `200` `FrontPageResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biFrontpageQueryGtmSalesAnalysisList = (req: FrontPageReq, params: RequestParams = {}) =>
    this.request<FrontPageResp, void>({
      path: `/api/bi/frontpage/queryGtmSalesAnalysisList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP首页
   * @name BiFrontpageQueryLastDate
   * @summary 查询截止时间
   * @request GET:/api/bi/frontpage/queryLastDate
   * @response `200` `CommonRespString` OK
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biFrontpageQueryLastDate = (
    query?: {
      /** dateType */
      dateType?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespString, void>({
      path: `/api/bi/frontpage/queryLastDate`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP首页
   * @name BiFrontpageQueryMetricOverview
   * @summary 查询指标总览及趋势
   * @request POST:/api/bi/frontpage/queryMetricOverview
   * @response `200` `FrontPageResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biFrontpageQueryMetricOverview = (req: FrontPageReq, params: RequestParams = {}) =>
    this.request<FrontPageResp, void>({
      path: `/api/bi/frontpage/queryMetricOverview`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP首页
   * @name BiFrontpageQuerySalesAnalysis
   * @summary 查询销售分析
   * @request POST:/api/bi/frontpage/querySalesAnalysis
   * @response `200` `FrontPageResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biFrontpageQuerySalesAnalysis = (req: FrontPageReq, params: RequestParams = {}) =>
    this.request<FrontPageResp, void>({
      path: `/api/bi/frontpage/querySalesAnalysis`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP首页
   * @name BiFrontpageQuerySpuSalesAnalysisList
   * @summary 查询 SPU 排行
   * @request POST:/api/bi/frontpage/querySpuSalesAnalysisList
   * @response `200` `FrontPageResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biFrontpageQuerySpuSalesAnalysisList = (req: FrontPageReq, params: RequestParams = {}) =>
    this.request<FrontPageResp, void>({
      path: `/api/bi/frontpage/querySpuSalesAnalysisList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP首页
   * @name BiFrontpageQuerySupplyChainAnalysis
   * @summary 查询库存分析
   * @request POST:/api/bi/frontpage/querySupplyChainAnalysis
   * @response `200` `FrontPageResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biFrontpageQuerySupplyChainAnalysis = (req: FrontPageReq, params: RequestParams = {}) =>
    this.request<FrontPageResp, void>({
      path: `/api/bi/frontpage/querySupplyChainAnalysis`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP首页
   * @name BiFrontpageQueryTimeZone
   * @summary 查询时区
   * @request GET:/api/bi/frontpage/queryTimeZone
   * @response `200` `TimeZoneResp` OK
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biFrontpageQueryTimeZone = (params: RequestParams = {}) =>
    this.request<TimeZoneResp, void>({
      path: `/api/bi/frontpage/queryTimeZone`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP首页
   * @name BiFrontpageQueryTrafficAnalysis
   * @summary 查询流量分析
   * @request POST:/api/bi/frontpage/queryTrafficAnalysis
   * @response `200` `FrontPageResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biFrontpageQueryTrafficAnalysis = (req: FrontPageReq, params: RequestParams = {}) =>
    this.request<FrontPageResp, void>({
      path: `/api/bi/frontpage/queryTrafficAnalysis`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP首页
   * @name BiFrontpageSalesQueryDimensionAnalysis
   * @summary 查询下钻维度分析
   * @request POST:/api/bi/frontpage/sales/queryDimensionAnalysis
   * @response `200` `FrontPageResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biFrontpageSalesQueryDimensionAnalysis = (req: FrontPageReq, params: RequestParams = {}) =>
    this.request<FrontPageResp, void>({
      path: `/api/bi/frontpage/sales/queryDimensionAnalysis`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存周转分析
   * @name BiInventoryQueryDimensionAnalysis
   * @summary 查询下钻维度分析
   * @request POST:/api/bi/inventory/queryDimensionAnalysis
   * @response `200` `InventoryTurnoverResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biInventoryQueryDimensionAnalysis = (req: CommonAnalysisReq, params: RequestParams = {}) =>
    this.request<InventoryTurnoverResp, void>({
      path: `/api/bi/inventory/queryDimensionAnalysis`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存周转分析
   * @name BiInventoryQueryEnums
   * @summary 查询库存周转分析枚举
   * @request POST:/api/bi/inventory/queryEnums
   * @response `200` `ManageAnalysisEnumsResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biInventoryQueryEnums = (req: CommonAnalysisReq, params: RequestParams = {}) =>
    this.request<ManageAnalysisEnumsResp, void>({
      path: `/api/bi/inventory/queryEnums`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存周转分析
   * @name BiInventoryQueryInventoryTurnover
   * @summary 查询库存周转分析
   * @request POST:/api/bi/inventory/queryInventoryTurnover
   * @response `200` `InventoryTurnoverResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biInventoryQueryInventoryTurnover = (req: CommonAnalysisReq, params: RequestParams = {}) =>
    this.request<InventoryTurnoverResp, void>({
      path: `/api/bi/inventory/queryInventoryTurnover`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存周转分析
   * @name BiInventorySaveAnalysisResult
   * @summary 保存分析结果
   * @request POST:/api/bi/inventory/saveAnalysisResult
   * @response `200` `CommonRespBoolean` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biInventorySaveAnalysisResult = (req: SaveAnalysisResultReq, params: RequestParams = {}) =>
    this.request<CommonRespBoolean, void>({
      path: `/api/bi/inventory/saveAnalysisResult`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 物流渠道查询
   * @name BiLogisticsChannelQuery
   * @summary 查询物流渠道
   * @request POST:/api/bi/logisticsChannel/query
   * @response `200` `LogisticsChannelResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biLogisticsChannelQuery = (req: LogisticsChannelReq, params: RequestParams = {}) =>
    this.request<LogisticsChannelResp, void>({
      path: `/api/bi/logisticsChannel/query`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 市场分析
   * @name BiMarketExportCustomerVoice
   * @summary 客户之声 - 导出VOC明细
   * @request POST:/api/bi/market/exportCustomerVoice
   * @response `200` `CommonRespString` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biMarketExportCustomerVoice = (req: CommonAnalysisReq, params: RequestParams = {}) =>
    this.request<CommonRespString, void>({
      path: `/api/bi/market/exportCustomerVoice`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 市场分析
   * @name BiMarketQueryCategory4Review
   * @summary 客户之声 - 四级品类评论分析
   * @request POST:/api/bi/market/queryCategory4Review
   * @response `200` `CustomerVoiceResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biMarketQueryCategory4Review = (req: CommonAnalysisReq, params: RequestParams = {}) =>
    this.request<CustomerVoiceResp, void>({
      path: `/api/bi/market/queryCategory4Review`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 市场分析
   * @name BiMarketQueryCategoryKeyword
   * @summary 行业趋势 - 查询关键词
   * @request POST:/api/bi/market/queryCategoryKeyword
   * @response `200` `Record<string,Record<string,number>>` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biMarketQueryCategoryKeyword = (req: CommonAnalysisReq, params: RequestParams = {}) =>
    this.request<Record<string, Record<string, number>>, void>({
      path: `/api/bi/market/queryCategoryKeyword`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 市场分析
   * @name BiMarketQueryCompetitiveInsight
   * @summary 竞品洞察
   * @request POST:/api/bi/market/queryCompetitiveInsight
   * @response `200` `CompetitiveInsightResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biMarketQueryCompetitiveInsight = (req: CommonAnalysisReq, params: RequestParams = {}) =>
    this.request<CompetitiveInsightResp, void>({
      path: `/api/bi/market/queryCompetitiveInsight`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 市场分析
   * @name BiMarketQueryCountryBrandList
   * @summary 竞品洞察 - 国家品牌业绩对比
   * @request POST:/api/bi/market/queryCountryBrandList
   * @response `200` `CompetitiveInsightResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biMarketQueryCountryBrandList = (req: CommonAnalysisReq, params: RequestParams = {}) =>
    this.request<CompetitiveInsightResp, void>({
      path: `/api/bi/market/queryCountryBrandList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 市场分析
   * @name BiMarketQueryCustomerVoice
   * @summary 客户之声
   * @request POST:/api/bi/market/queryCustomerVoice
   * @response `200` `CustomerVoiceResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biMarketQueryCustomerVoice = (req: CommonAnalysisReq, params: RequestParams = {}) =>
    this.request<CustomerVoiceResp, void>({
      path: `/api/bi/market/queryCustomerVoice`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 市场分析
   * @name BiMarketQueryIndustryTrend
   * @summary 行业趋势
   * @request POST:/api/bi/market/queryIndustryTrend
   * @response `200` `IndustryTrendResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biMarketQueryIndustryTrend = (req: CommonAnalysisReq, params: RequestParams = {}) =>
    this.request<IndustryTrendResp, void>({
      path: `/api/bi/market/queryIndustryTrend`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 市场分析
   * @name BiMarketQueryLastDate
   * @summary 截止日期
   * @request POST:/api/bi/market/queryLastDate
   * @response `200` `CommonRespString` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biMarketQueryLastDate = (req: CommonAnalysisReq, params: RequestParams = {}) =>
    this.request<CommonRespString, void>({
      path: `/api/bi/market/queryLastDate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 市场分析
   * @name BiMarketQueryPriceConfig
   * @summary 竞品洞察 - 价格带配置查询
   * @request GET:/api/bi/market/queryPriceConfig
   * @response `200` `CompetitiveInsightResp` OK
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biMarketQueryPriceConfig = (params: RequestParams = {}) =>
    this.request<CompetitiveInsightResp, void>({
      path: `/api/bi/market/queryPriceConfig`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 市场分析
   * @name BiMarketQueryPriceQuartile
   * @summary 竞品洞察 - 价格带查询
   * @request POST:/api/bi/market/queryPriceQuartile
   * @response `200` `CompetitiveInsightResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biMarketQueryPriceQuartile = (req: CommonAnalysisReq, params: RequestParams = {}) =>
    this.request<CompetitiveInsightResp, void>({
      path: `/api/bi/market/queryPriceQuartile`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 市场分析
   * @name BiMarketQuerySpuReturnReasonAndTag
   * @summary 客户之声 - SPU退款原因及标签
   * @request POST:/api/bi/market/querySpuReturnReasonAndTag
   * @response `200` `AfterSalesAnalysisResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biMarketQuerySpuReturnReasonAndTag = (req: CommonAnalysisReq, params: RequestParams = {}) =>
    this.request<AfterSalesAnalysisResp, void>({
      path: `/api/bi/market/querySpuReturnReasonAndTag`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 市场分析
   * @name BiMarketQuerySpuReview
   * @summary 客户之声 - SPU评论分析
   * @request POST:/api/bi/market/querySpuReview
   * @response `200` `CustomerVoiceResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biMarketQuerySpuReview = (req: CommonAnalysisReq, params: RequestParams = {}) =>
    this.request<CustomerVoiceResp, void>({
      path: `/api/bi/market/querySpuReview`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 市场分析
   * @name BiMarketQueryVocLastDate
   * @summary 客户之声截止日期
   * @request POST:/api/bi/market/queryVocLastDate
   * @response `200` `CommonRespString` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biMarketQueryVocLastDate = (req: CommonAnalysisReq, params: RequestParams = {}) =>
    this.request<CommonRespString, void>({
      path: `/api/bi/market/queryVocLastDate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 市场分析
   * @name BiMarketSavePriceConfig
   * @summary 竞品洞察 - 保存价格带配置
   * @request POST:/api/bi/market/savePriceConfig
   * @response `200` `CommonRespString` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biMarketSavePriceConfig = (req: PriceConfigSaveReq, params: RequestParams = {}) =>
    this.request<CommonRespString, void>({
      path: `/api/bi/market/savePriceConfig`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags MPC SPU分析
   * @name BiMpcQuerySpuAnalysis
   * @summary 查询SPU分析结果
   * @request GET:/api/bi/mpc/querySpuAnalysis
   * @response `200` `MpcSpuAnalysisResp` OK
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biMpcQuerySpuAnalysis = (
    query?: {
      /** 月份 */
      month?: string;
      /** 评分 */
      score?: number;
      /** 评分分析内容 */
      scoreAnalysis?: string;
      /** 卖点分析内容 */
      sellingPointsAnalysis?: string;
      /** SPU编码 */
      spuCode?: string;
      /** SPU名称 */
      spuName?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<MpcSpuAnalysisResp, void>({
      path: `/api/bi/mpc/querySpuAnalysis`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags MPC SPU分析
   * @name BiMpcQuerySpuAnalysisEnums
   * @summary 查询SPU枚举
   * @request POST:/api/bi/mpc/querySpuAnalysisEnums
   * @response `200` `MpcSpuAnalysisEnumsResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biMpcQuerySpuAnalysisEnums = (params: RequestParams = {}) =>
    this.request<MpcSpuAnalysisEnumsResp, void>({
      path: `/api/bi/mpc/querySpuAnalysisEnums`,
      method: 'POST',
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags MPC SPU分析
   * @name BiMpcSaveSpuAnalysis
   * @summary 保存SPU分析结果
   * @request POST:/api/bi/mpc/saveSpuAnalysis
   * @response `200` `CommonRespBoolean` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biMpcSaveSpuAnalysis = (req: MpcSpuAnalysisReq, params: RequestParams = {}) =>
    this.request<CommonRespBoolean, void>({
      path: `/api/bi/mpc/saveSpuAnalysis`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 产品经理驾驶舱
   * @name BiProductManagerQueryLastDate
   * @summary 查询截止时间
   * @request GET:/api/bi/product/manager/queryLastDate
   * @response `200` `CommonRespString` OK
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biProductManagerQueryLastDate = (params: RequestParams = {}) =>
    this.request<CommonRespString, void>({
      path: `/api/bi/product/manager/queryLastDate`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 产品经理驾驶舱
   * @name BiProductManagerQueryLevel3ByLevel2
   * @summary 二级标签下钻到三级标签
   * @request POST:/api/bi/product/manager/queryLevel3ByLevel2
   * @response `200` `ProductManagerResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biProductManagerQueryLevel3ByLevel2 = (req: CommonAnalysisReq, params: RequestParams = {}) =>
    this.request<ProductManagerResp, void>({
      path: `/api/bi/product/manager/queryLevel3ByLevel2`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 产品经理驾驶舱
   * @name BiProductManagerQueryProductManager
   * @summary 主页数据查询
   * @request POST:/api/bi/product/manager/queryProductManager
   * @response `200` `ProductManagerResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biProductManagerQueryProductManager = (req: CommonAnalysisReq, params: RequestParams = {}) =>
    this.request<ProductManagerResp, void>({
      path: `/api/bi/product/manager/queryProductManager`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 产品经理驾驶舱
   * @name BiProductManagerQueryReturnLevel3ByLevel2
   * @summary 退货二级标签下钻到三级标签
   * @request POST:/api/bi/product/manager/queryReturnLevel3ByLevel2
   * @response `200` `ProductManagerResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biProductManagerQueryReturnLevel3ByLevel2 = (
    req: CommonAnalysisReq,
    params: RequestParams = {},
  ) =>
    this.request<ProductManagerResp, void>({
      path: `/api/bi/product/manager/queryReturnLevel3ByLevel2`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 产品经理驾驶舱
   * @name BiProductManagerQuerySpuLevel3MapList
   * @summary 查询SPU的三级标签
   * @request POST:/api/bi/product/manager/querySpuLevel3MapList
   * @response `200` `ProductManagerResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biProductManagerQuerySpuLevel3MapList = (req: CommonAnalysisReq, params: RequestParams = {}) =>
    this.request<ProductManagerResp, void>({
      path: `/api/bi/product/manager/querySpuLevel3MapList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 产品经理驾驶舱
   * @name BiProductManagerQuerySpuReturnLevel3MapList
   * @summary 查询SPU的退货留言三级标签
   * @request POST:/api/bi/product/manager/querySpuReturnLevel3MapList
   * @response `200` `ProductManagerResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biProductManagerQuerySpuReturnLevel3MapList = (
    req: CommonAnalysisReq,
    params: RequestParams = {},
  ) =>
    this.request<ProductManagerResp, void>({
      path: `/api/bi/product/manager/querySpuReturnLevel3MapList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 多维分析查询
   * @name BiQuery
   * @summary 查询
   * @request POST:/api/bi/query
   * @response `200` `QueryResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biQuery = (req: QueryReq, params: RequestParams = {}) =>
    this.request<QueryResp, void>({
      path: `/api/bi/query`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 多维分析查询
   * @name BiQueryEnums
   * @summary 查询枚举
   * @request GET:/api/bi/queryEnums
   * @response `200` `QueryResp` OK
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biQueryEnums = (req: QueryReq, params: RequestParams = {}) =>
    this.request<QueryResp, void>({
      path: `/api/bi/queryEnums`,
      method: 'GET',
      body: req,
      ...params,
    });
  /**
   * No description
   *
   * @tags 实时销售数据
   * @name BiRealTimeSaleQueryCurrentTime
   * @summary 查询当前时间
   * @request GET:/api/bi/realTimeSale/queryCurrentTime
   * @response `200` `RealTimeSaleAnalysisResp` OK
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biRealTimeSaleQueryCurrentTime = (params: RequestParams = {}) =>
    this.request<RealTimeSaleAnalysisResp, void>({
      path: `/api/bi/realTimeSale/queryCurrentTime`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 实时销售数据
   * @name BiRealTimeSaleQueryYoy
   * @summary 同比数据查询
   * @request POST:/api/bi/realTimeSale/queryYoy
   * @response `200` `RealTimeSaleAnalysisResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biRealTimeSaleQueryYoy = (req: CommonAnalysisReq, params: RequestParams = {}) =>
    this.request<RealTimeSaleAnalysisResp, void>({
      path: `/api/bi/realTimeSale/queryYoy`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags BI看板管理
   * @name BiReportAdd
   * @summary 新增看板
   * @request POST:/api/bi/report/add
   * @response `200` `CommonRespVoid` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biReportAdd = (req: BiReportAddReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, void>({
      path: `/api/bi/report/add`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags BI看板管理
   * @name BiReportConfigAdd
   * @summary 新增看板配置
   * @request POST:/api/bi/report/config/add
   * @response `200` `CommonRespVoid` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biReportConfigAdd = (req: BiReportConfigAddReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, void>({
      path: `/api/bi/report/config/add`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags BI看板管理
   * @name BiReportConfigDelete
   * @summary 删除看板配置
   * @request DELETE:/api/bi/report/config/delete/{id}
   * @response `200` `CommonRespVoid` OK
   * @response `204` `void` No Content
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   */
  biReportConfigDelete = (id: number, params: RequestParams = {}) =>
    this.request<CommonRespVoid, void>({
      path: `/api/bi/report/config/delete/${id}`,
      method: 'DELETE',
      ...params,
    });
  /**
   * No description
   *
   * @tags BI看板管理
   * @name BiReportConfigUpdate
   * @summary 更新看板配置
   * @request PUT:/api/bi/report/config/update
   * @response `200` `CommonRespVoid` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biReportConfigUpdate = (req: BiReportConfigUpdateReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, void>({
      path: `/api/bi/report/config/update`,
      method: 'PUT',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags BI看板管理
   * @name BiReportConfigs
   * @summary 查询看板配置列表
   * @request POST:/api/bi/report/configs
   * @response `200` `(BiReportConfig)[]` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biReportConfigs = (req: BiReportConfigListReq, params: RequestParams = {}) =>
    this.request<BiReportConfig[], void>({
      path: `/api/bi/report/configs`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags BI看板管理
   * @name BiReportDelete
   * @summary 删除看板
   * @request DELETE:/api/bi/report/delete/{id}
   * @response `200` `CommonRespVoid` OK
   * @response `204` `void` No Content
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   */
  biReportDelete = (id: number, params: RequestParams = {}) =>
    this.request<CommonRespVoid, void>({
      path: `/api/bi/report/delete/${id}`,
      method: 'DELETE',
      ...params,
    });
  /**
   * No description
   *
   * @tags BI看板管理
   * @name BiReportDimensionAdd
   * @summary 新增看板维度
   * @request POST:/api/bi/report/dimension/add
   * @response `200` `CommonRespVoid` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biReportDimensionAdd = (req: BiReportDimensionAddReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, void>({
      path: `/api/bi/report/dimension/add`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags BI看板管理
   * @name BiReportDimensionDelete
   * @summary 删除看板维度
   * @request DELETE:/api/bi/report/dimension/delete/{id}
   * @response `200` `CommonRespVoid` OK
   * @response `204` `void` No Content
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   */
  biReportDimensionDelete = (id: number, params: RequestParams = {}) =>
    this.request<CommonRespVoid, void>({
      path: `/api/bi/report/dimension/delete/${id}`,
      method: 'DELETE',
      ...params,
    });
  /**
   * No description
   *
   * @tags BI看板管理
   * @name BiReportDimensionUpdate
   * @summary 更新看板维度
   * @request PUT:/api/bi/report/dimension/update
   * @response `200` `CommonRespVoid` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biReportDimensionUpdate = (req: BiReportDimensionUpdateReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, void>({
      path: `/api/bi/report/dimension/update`,
      method: 'PUT',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags BI看板管理
   * @name BiReportDimensions
   * @summary 查询看板维度列表
   * @request POST:/api/bi/report/dimensions
   * @response `200` `(BiReportDimension)[]` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biReportDimensions = (req: BiReportDimensionListReq, params: RequestParams = {}) =>
    this.request<BiReportDimension[], void>({
      path: `/api/bi/report/dimensions`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags BI看板管理
   * @name BiReportList
   * @summary 查询看板列表
   * @request POST:/api/bi/report/list
   * @response `200` `BiReportListResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biReportList = (req: BiReportListReq, params: RequestParams = {}) =>
    this.request<BiReportListResp, void>({
      path: `/api/bi/report/list`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags BI看板管理
   * @name BiReportUpdate
   * @summary 更新看板
   * @request PUT:/api/bi/report/update
   * @response `200` `CommonRespVoid` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biReportUpdate = (req: BiReportUpdateReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, void>({
      path: `/api/bi/report/update`,
      method: 'PUT',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 退货率分析
   * @name BiReturnRateQueryEnums
   * @summary 查询退货率分析枚举
   * @request POST:/api/bi/returnRate/queryEnums
   * @response `200` `ManageAnalysisEnumsResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biReturnRateQueryEnums = (req: CommonAnalysisReq, params: RequestParams = {}) =>
    this.request<ManageAnalysisEnumsResp, void>({
      path: `/api/bi/returnRate/queryEnums`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 退货率分析
   * @name BiReturnRateQueryReturnRate
   * @summary 查询退货率分析
   * @request POST:/api/bi/returnRate/queryReturnRate
   * @response `200` `ReturnRateResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biReturnRateQueryReturnRate = (req: CommonAnalysisReq, params: RequestParams = {}) =>
    this.request<ReturnRateResp, void>({
      path: `/api/bi/returnRate/queryReturnRate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销售分析 - 日
   * @name BiSalesDayQueryDimensionAnalysis
   * @summary 查询下钻维度分析 - 日
   * @request POST:/api/bi/sales/day/queryDimensionAnalysis
   * @response `200` `SalesDayAnalysisResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biSalesDayQueryDimensionAnalysis = (req: CommonAnalysisReq, params: RequestParams = {}) =>
    this.request<SalesDayAnalysisResp, void>({
      path: `/api/bi/sales/day/queryDimensionAnalysis`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销售分析 - 日
   * @name BiSalesDayQueryEnums
   * @summary 查询销售分析枚举 - 日
   * @request POST:/api/bi/sales/day/queryEnums
   * @response `200` `ManageAnalysisEnumsResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biSalesDayQueryEnums = (req: CommonAnalysisReq, params: RequestParams = {}) =>
    this.request<ManageAnalysisEnumsResp, void>({
      path: `/api/bi/sales/day/queryEnums`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销售分析 - 日
   * @name BiSalesDayQueryLastDate
   * @summary 查询截止时间
   * @request GET:/api/bi/sales/day/queryLastDate
   * @response `200` `CommonRespString` OK
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biSalesDayQueryLastDate = (params: RequestParams = {}) =>
    this.request<CommonRespString, void>({
      path: `/api/bi/sales/day/queryLastDate`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 销售分析 - 日
   * @name BiSalesDayQuerySalesAnalysis
   * @summary 查询销售分析 - 日
   * @request POST:/api/bi/sales/day/querySalesAnalysis
   * @response `200` `SalesDayAnalysisResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biSalesDayQuerySalesAnalysis = (req: CommonAnalysisReq, params: RequestParams = {}) =>
    this.request<SalesDayAnalysisResp, void>({
      path: `/api/bi/sales/day/querySalesAnalysis`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销售分析 - 月
   * @name BiSalesMonthQueryDimensionAnalysis
   * @summary 查询下钻维度分析 - 月
   * @request POST:/api/bi/sales/month/queryDimensionAnalysis
   * @response `200` `SalesMonthAnalysisResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biSalesMonthQueryDimensionAnalysis = (req: CommonAnalysisReq, params: RequestParams = {}) =>
    this.request<SalesMonthAnalysisResp, void>({
      path: `/api/bi/sales/month/queryDimensionAnalysis`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销售分析 - 月
   * @name BiSalesMonthQueryEnums
   * @summary 查询销售分析枚举 - 月
   * @request POST:/api/bi/sales/month/queryEnums
   * @response `200` `ManageAnalysisEnumsResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biSalesMonthQueryEnums = (req: CommonAnalysisReq, params: RequestParams = {}) =>
    this.request<ManageAnalysisEnumsResp, void>({
      path: `/api/bi/sales/month/queryEnums`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销售分析 - 月
   * @name BiSalesMonthQueryLastDate
   * @summary 查询截止时间
   * @request GET:/api/bi/sales/month/queryLastDate
   * @response `200` `CommonRespString` OK
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biSalesMonthQueryLastDate = (params: RequestParams = {}) =>
    this.request<CommonRespString, void>({
      path: `/api/bi/sales/month/queryLastDate`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 销售分析 - 月
   * @name BiSalesMonthQuerySalesAnalysis
   * @summary 查询销售分析 - 月
   * @request POST:/api/bi/sales/month/querySalesAnalysis
   * @response `200` `SalesMonthAnalysisResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biSalesMonthQuerySalesAnalysis = (req: CommonAnalysisReq, params: RequestParams = {}) =>
    this.request<SalesMonthAnalysisResp, void>({
      path: `/api/bi/sales/month/querySalesAnalysis`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销售分析
   * @name BiSalesQueryCurrMonthAnalysisResult
   * @summary 查询当月的分析结果
   * @request POST:/api/bi/sales/queryCurrMonthAnalysisResult
   * @response `200` `AnalysisResultResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biSalesQueryCurrMonthAnalysisResult = (req: CommonAnalysisReq, params: RequestParams = {}) =>
    this.request<AnalysisResultResp, void>({
      path: `/api/bi/sales/queryCurrMonthAnalysisResult`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销售分析
   * @name BiSalesQueryDimensionAnalysis
   * @summary 查询下钻维度分析
   * @request POST:/api/bi/sales/queryDimensionAnalysis
   * @response `200` `SalesAnalysisResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biSalesQueryDimensionAnalysis = (req: CommonAnalysisReq, params: RequestParams = {}) =>
    this.request<SalesAnalysisResp, void>({
      path: `/api/bi/sales/queryDimensionAnalysis`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销售分析
   * @name BiSalesQuerySalesAnalysis
   * @summary 查询销售分析
   * @request POST:/api/bi/sales/querySalesAnalysis
   * @response `200` `SalesAnalysisResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biSalesQuerySalesAnalysis = (req: CommonAnalysisReq, params: RequestParams = {}) =>
    this.request<SalesAnalysisResp, void>({
      path: `/api/bi/sales/querySalesAnalysis`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销售分析 - 周
   * @name BiSalesWeekQueryDimensionAnalysis
   * @summary 查询下钻维度分析 - 周
   * @request POST:/api/bi/sales/week/queryDimensionAnalysis
   * @response `200` `SalesWeekAnalysisResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biSalesWeekQueryDimensionAnalysis = (req: CommonAnalysisReq, params: RequestParams = {}) =>
    this.request<SalesWeekAnalysisResp, void>({
      path: `/api/bi/sales/week/queryDimensionAnalysis`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销售分析 - 周
   * @name BiSalesWeekQueryEnums
   * @summary 查询销售分析枚举 - 周
   * @request POST:/api/bi/sales/week/queryEnums
   * @response `200` `ManageAnalysisEnumsResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biSalesWeekQueryEnums = (req: CommonAnalysisReq, params: RequestParams = {}) =>
    this.request<ManageAnalysisEnumsResp, void>({
      path: `/api/bi/sales/week/queryEnums`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销售分析 - 周
   * @name BiSalesWeekQueryLastDate
   * @summary 查询截止时间
   * @request GET:/api/bi/sales/week/queryLastDate
   * @response `200` `CommonRespString` OK
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biSalesWeekQueryLastDate = (params: RequestParams = {}) =>
    this.request<CommonRespString, void>({
      path: `/api/bi/sales/week/queryLastDate`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 销售分析 - 周
   * @name BiSalesWeekQuerySalesAnalysis
   * @summary 查询销售分析 - 周
   * @request POST:/api/bi/sales/week/querySalesAnalysis
   * @response `200` `SalesWeekAnalysisResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biSalesWeekQuerySalesAnalysis = (req: CommonAnalysisReq, params: RequestParams = {}) =>
    this.request<SalesWeekAnalysisResp, void>({
      path: `/api/bi/sales/week/querySalesAnalysis`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销售分析 - 年
   * @name BiSalesYearQueryDimensionAnalysis
   * @summary 查询下钻维度分析 - 年
   * @request POST:/api/bi/sales/year/queryDimensionAnalysis
   * @response `200` `SalesYearAnalysisResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biSalesYearQueryDimensionAnalysis = (req: CommonAnalysisReq, params: RequestParams = {}) =>
    this.request<SalesYearAnalysisResp, void>({
      path: `/api/bi/sales/year/queryDimensionAnalysis`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销售分析 - 年
   * @name BiSalesYearQueryEnums
   * @summary 查询销售分析枚举 - 年
   * @request POST:/api/bi/sales/year/queryEnums
   * @response `200` `ManageAnalysisEnumsResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biSalesYearQueryEnums = (req: CommonAnalysisReq, params: RequestParams = {}) =>
    this.request<ManageAnalysisEnumsResp, void>({
      path: `/api/bi/sales/year/queryEnums`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销售分析 - 年
   * @name BiSalesYearQueryLastDate
   * @summary 查询截止时间
   * @request GET:/api/bi/sales/year/queryLastDate
   * @response `200` `CommonRespString` OK
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biSalesYearQueryLastDate = (params: RequestParams = {}) =>
    this.request<CommonRespString, void>({
      path: `/api/bi/sales/year/queryLastDate`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 销售分析 - 年
   * @name BiSalesYearQuerySalesAnalysis
   * @summary 查询销售分析 - 年
   * @request POST:/api/bi/sales/year/querySalesAnalysis
   * @response `200` `SalesYearAnalysisResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biSalesYearQuerySalesAnalysis = (req: CommonAnalysisReq, params: RequestParams = {}) =>
    this.request<SalesYearAnalysisResp, void>({
      path: `/api/bi/sales/year/querySalesAnalysis`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags BI数据表管理
   * @name BiTableAdd
   * @summary 新增数据表
   * @request POST:/api/bi/table/add
   * @response `200` `CommonRespVoid` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biTableAdd = (req: BiTableAddReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, void>({
      path: `/api/bi/table/add`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags BI数据表管理
   * @name BiTableDelete
   * @summary 删除数据表
   * @request DELETE:/api/bi/table/delete/{id}
   * @response `200` `CommonRespVoid` OK
   * @response `204` `void` No Content
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   */
  biTableDelete = (id: number, params: RequestParams = {}) =>
    this.request<CommonRespVoid, void>({
      path: `/api/bi/table/delete/${id}`,
      method: 'DELETE',
      ...params,
    });
  /**
   * No description
   *
   * @tags BI数据表管理
   * @name BiTableDimensionAdd
   * @summary 新增维度
   * @request POST:/api/bi/table/dimension/add
   * @response `200` `CommonRespVoid` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biTableDimensionAdd = (req: BiDimensionAddReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, void>({
      path: `/api/bi/table/dimension/add`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags BI数据表管理
   * @name BiTableDimensionDelete
   * @summary 删除维度
   * @request DELETE:/api/bi/table/dimension/delete/{id}
   * @response `200` `CommonRespVoid` OK
   * @response `204` `void` No Content
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   */
  biTableDimensionDelete = (id: number, params: RequestParams = {}) =>
    this.request<CommonRespVoid, void>({
      path: `/api/bi/table/dimension/delete/${id}`,
      method: 'DELETE',
      ...params,
    });
  /**
   * No description
   *
   * @tags BI数据表管理
   * @name BiTableDimensionUpdate
   * @summary 更新维度
   * @request PUT:/api/bi/table/dimension/update
   * @response `200` `CommonRespVoid` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biTableDimensionUpdate = (req: BiDimensionUpdateReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, void>({
      path: `/api/bi/table/dimension/update`,
      method: 'PUT',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags BI数据表管理
   * @name BiTableDimensions
   * @summary 查询维度列表
   * @request POST:/api/bi/table/dimensions
   * @response `200` `(BiDimension)[]` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biTableDimensions = (req: BiDimensionListReq, params: RequestParams = {}) =>
    this.request<BiDimension[], void>({
      path: `/api/bi/table/dimensions`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags BI数据表管理
   * @name BiTableList
   * @summary 查询数据表列表
   * @request POST:/api/bi/table/list
   * @response `200` `BiTableListResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biTableList = (req: BiTableListReq, params: RequestParams = {}) =>
    this.request<BiTableListResp, void>({
      path: `/api/bi/table/list`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags BI数据表管理
   * @name BiTableMetricAdd
   * @summary 新增指标
   * @request POST:/api/bi/table/metric/add
   * @response `200` `CommonRespVoid` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biTableMetricAdd = (req: BiMetricAddReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, void>({
      path: `/api/bi/table/metric/add`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags BI数据表管理
   * @name BiTableMetricDelete
   * @summary 删除指标
   * @request DELETE:/api/bi/table/metric/delete/{id}
   * @response `200` `CommonRespVoid` OK
   * @response `204` `void` No Content
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   */
  biTableMetricDelete = (id: number, params: RequestParams = {}) =>
    this.request<CommonRespVoid, void>({
      path: `/api/bi/table/metric/delete/${id}`,
      method: 'DELETE',
      ...params,
    });
  /**
   * No description
   *
   * @tags BI数据表管理
   * @name BiTableMetricUpdate
   * @summary 更新指标
   * @request PUT:/api/bi/table/metric/update
   * @response `200` `CommonRespVoid` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biTableMetricUpdate = (req: BiMetricUpdateReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, void>({
      path: `/api/bi/table/metric/update`,
      method: 'PUT',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags BI数据表管理
   * @name BiTableMetrics
   * @summary 查询指标列表
   * @request POST:/api/bi/table/metrics
   * @response `200` `(BiMetric)[]` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biTableMetrics = (req: BiMetricListReq, params: RequestParams = {}) =>
    this.request<BiMetric[], void>({
      path: `/api/bi/table/metrics`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags BI数据表管理
   * @name BiTableUpdate
   * @summary 更新数据表
   * @request PUT:/api/bi/table/update
   * @response `200` `CommonRespVoid` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biTableUpdate = (req: BiTableUpdateReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, void>({
      path: `/api/bi/table/update`,
      method: 'PUT',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags VOC看板
   * @name BiVocCondition
   * @summary 查询VOC参数列表
   * @request POST:/api/bi/voc/condition
   * @response `200` `VocConditionQueryResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biVocCondition = (req: BaseVocQueryReq, params: RequestParams = {}) =>
    this.request<VocConditionQueryResp, void>({
      path: `/api/bi/voc/condition`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags VOC看板
   * @name BiVocCoreIndicator
   * @summary 查询VOC核心指标
   * @request POST:/api/bi/voc/coreIndicator
   * @response `200` `VocCoreIndicatorResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biVocCoreIndicator = (req: VocCoreIndicatorReq, params: RequestParams = {}) =>
    this.request<VocCoreIndicatorResp, void>({
      path: `/api/bi/voc/coreIndicator`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags VOC看板
   * @name BiVocMaxEndDate
   * @summary 查询最大的endDate
   * @request POST:/api/bi/voc/maxEndDate
   * @response `200` `VocEndDateResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biVocMaxEndDate = (params: RequestParams = {}) =>
    this.request<VocEndDateResp, void>({
      path: `/api/bi/voc/maxEndDate`,
      method: 'POST',
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags VOC看板
   * @name BiVocProductRating
   * @summary 查询商品评分和评论
   * @request POST:/api/bi/voc/productRating
   * @response `200` `VocProductRatingResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biVocProductRating = (req: VocProductRatingReq, params: RequestParams = {}) =>
    this.request<VocProductRatingResp, void>({
      path: `/api/bi/voc/productRating`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags VOC看板
   * @name BiVocProductRatingSpu
   * @summary 查询商品评分和评论SPU详情（查看星级和标签）
   * @request POST:/api/bi/voc/productRating/spu
   * @response `200` `VocProductRatingSpuDetailResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biVocProductRatingSpu = (req: VocProductRatingSpuDetailReq, params: RequestParams = {}) =>
    this.request<VocProductRatingSpuDetailResp, void>({
      path: `/api/bi/voc/productRating/spu`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags VOC看板分析
   * @name BiVocQueryEnums
   * @summary 查询Voc分析枚举
   * @request POST:/api/bi/voc/queryEnums
   * @response `200` `VocAnalysisEnumsResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biVocQueryEnums = (req: VocAnalysisReq, params: RequestParams = {}) =>
    this.request<VocAnalysisEnumsResp, void>({
      path: `/api/bi/voc/queryEnums`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags VOC看板分析
   * @name BiVocQueryLastDay
   * @summary 查询截止时间
   * @request POST:/api/bi/voc/queryLastDay
   * @response `200` `CommonRespString` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biVocQueryLastDay = (params: RequestParams = {}) =>
    this.request<CommonRespString, void>({
      path: `/api/bi/voc/queryLastDay`,
      method: 'POST',
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags VOC看板
   * @name BiVocQueryProductLine
   * @summary 查询产品线趋势
   * @request POST:/api/bi/voc/queryProductLine
   * @response `200` `VocProductLineResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biVocQueryProductLine = (req: VocCoreIndicatorReq, params: RequestParams = {}) =>
    this.request<VocProductLineResp, void>({
      path: `/api/bi/voc/queryProductLine`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags VOC看板分析
   * @name BiVocQueryVocAnalysis
   * @summary 查询Voc分析
   * @request POST:/api/bi/voc/queryVocAnalysis
   * @response `200` `VocAnalysisResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biVocQueryVocAnalysis = (req: VocAnalysisReq, params: RequestParams = {}) =>
    this.request<VocAnalysisResp, void>({
      path: `/api/bi/voc/queryVocAnalysis`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags VOC看板分析
   * @name BiVocQueryVocLevel2Analysis
   * @summary 查询Voc二级标签
   * @request POST:/api/bi/voc/queryVocLevel2Analysis
   * @response `200` `VocAnalysisResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biVocQueryVocLevel2Analysis = (req: VocAnalysisReq, params: RequestParams = {}) =>
    this.request<VocAnalysisResp, void>({
      path: `/api/bi/voc/queryVocLevel2Analysis`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags VOC看板分析
   * @name BiVocQueryVocLevelDrillDown
   * @summary 查询标签分析下钻
   * @request POST:/api/bi/voc/queryVocLevelDrillDown
   * @response `200` `VocAnalysisResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biVocQueryVocLevelDrillDown = (req: VocAnalysisReq, params: RequestParams = {}) =>
    this.request<VocAnalysisResp, void>({
      path: `/api/bi/voc/queryVocLevelDrillDown`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags VOC看板分析
   * @name BiVocQueryVocPlatformDrillDown
   * @summary 查询平台分析下钻
   * @request POST:/api/bi/voc/queryVocPlatformDrillDown
   * @response `200` `VocAnalysisResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biVocQueryVocPlatformDrillDown = (req: VocAnalysisReq, params: RequestParams = {}) =>
    this.request<VocAnalysisResp, void>({
      path: `/api/bi/voc/queryVocPlatformDrillDown`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags VOC看板分析
   * @name BiVocQueryVocProductAnalysis
   * @summary 查询Voc商品维度分析
   * @request POST:/api/bi/voc/queryVocProductAnalysis
   * @response `200` `VocProductAnalysisResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biVocQueryVocProductAnalysis = (req: VocProductAnalysisReq, params: RequestParams = {}) =>
    this.request<VocProductAnalysisResp, void>({
      path: `/api/bi/voc/queryVocProductAnalysis`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags VOC看板
   * @name BiVocTagDistribution
   * @summary 查询标签分布和趋势分析
   * @request POST:/api/bi/voc/tagDistribution
   * @response `200` `VocTagDistributionResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biVocTagDistribution = (req: VocTagDistributionReq, params: RequestParams = {}) =>
    this.request<VocTagDistributionResp, void>({
      path: `/api/bi/voc/tagDistribution`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags VOC看板
   * @name BiVocTagLevelDetail
   * @summary 查询标签分类详情（更多功能）
   * @request POST:/api/bi/voc/tagLevelDetail
   * @response `200` `VocTagLevelDetailResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biVocTagLevelDetail = (req: VocTagLevelDetailReq, params: RequestParams = {}) =>
    this.request<VocTagLevelDetailResp, void>({
      path: `/api/bi/voc/tagLevelDetail`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags VOC看板
   * @name BiVocTagList
   * @summary 查询VOC标签列表
   * @request POST:/api/bi/voc/tagList
   * @response `200` `VocTagListResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biVocTagList = (req: VocTagListReq, params: RequestParams = {}) =>
    this.request<VocTagListResp, void>({
      path: `/api/bi/voc/tagList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags VOC电视看板
   * @name BiVocTvNewProductSpu
   * @summary 查询新品SPU列表
   * @request POST:/api/bi/voc/tv/newProduct/spu
   * @response `200` `VocTvNewProductSpuResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biVocTvNewProductSpu = (params: RequestParams = {}) =>
    this.request<VocTvNewProductSpuResp, void>({
      path: `/api/bi/voc/tv/newProduct/spu`,
      method: 'POST',
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags VOC电视看板
   * @name BiVocTvNewProductVocRatePerformance
   * @summary SPU 新品上市VOC率
   * @request POST:/api/bi/voc/tv/newProduct/vocRate/performance
   * @response `200` `VocTvNewProductReturnRateResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biVocTvNewProductVocRatePerformance = (params: RequestParams = {}) =>
    this.request<VocTvNewProductReturnRateResp, void>({
      path: `/api/bi/voc/tv/newProduct/vocRate/performance`,
      method: 'POST',
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags VOC电视看板
   * @name BiVocTvNewProductVocTagTop3
   * @summary SPU 新品VOC标签TOP3
   * @request POST:/api/bi/voc/tv/newProduct/vocTag/top3
   * @response `200` `VocTvReturnTagTopResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biVocTvNewProductVocTagTop3 = (params: RequestParams = {}) =>
    this.request<VocTvReturnTagTopResp, void>({
      path: `/api/bi/voc/tv/newProduct/vocTag/top3`,
      method: 'POST',
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags VOC电视看板
   * @name BiVocTvNewProductVocTagTop3TrendLast6Month
   * @summary SPU 新品TOP3问题变化趋势
   * @request POST:/api/bi/voc/tv/newProduct/vocTag/top3/trend/last6Month
   * @response `200` `VocTvNewProductTagTrendResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biVocTvNewProductVocTagTop3TrendLast6Month = (params: RequestParams = {}) =>
    this.request<VocTvNewProductTagTrendResp, void>({
      path: `/api/bi/voc/tv/newProduct/vocTag/top3/trend/last6Month`,
      method: 'POST',
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags VOC电视看板
   * @name BiVocTvProductLineVocRateLast30Days
   * @summary 全品线（近30天）VOC率排行
   * @request POST:/api/bi/voc/tv/productLine/vocRate/last30Days
   * @response `200` `VocTvProductLineReturnRateResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biVocTvProductLineVocRateLast30Days = (params: RequestParams = {}) =>
    this.request<VocTvProductLineReturnRateResp, void>({
      path: `/api/bi/voc/tv/productLine/vocRate/last30Days`,
      method: 'POST',
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags VOC电视看板
   * @name BiVocTvProductLineVocRateLast6Month
   * @summary 全品线（近6个月）VOC率排行
   * @request POST:/api/bi/voc/tv/productLine/vocRate/last6Month
   * @response `200` `VocTvProductLineReturnRateResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biVocTvProductLineVocRateLast6Month = (params: RequestParams = {}) =>
    this.request<VocTvProductLineReturnRateResp, void>({
      path: `/api/bi/voc/tv/productLine/vocRate/last6Month`,
      method: 'POST',
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags VOC电视看板
   * @name BiVocTvVocTagTop3Last30Days
   * @summary 全品线（近30天）VOC标签TOP3
   * @request POST:/api/bi/voc/tv/vocTag/top3/last30Days
   * @response `200` `VocTvReturnTagTopResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biVocTvVocTagTop3Last30Days = (params: RequestParams = {}) =>
    this.request<VocTvReturnTagTopResp, void>({
      path: `/api/bi/voc/tv/vocTag/top3/last30Days`,
      method: 'POST',
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags VOC电视看板
   * @name BiVocTvVocTagTop3Last6Month
   * @summary 全品线（近6个月）VOC标签TOP3
   * @request POST:/api/bi/voc/tv/vocTag/top3/last6Month
   * @response `200` `VocTvReturnTagTopResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biVocTvVocTagTop3Last6Month = (params: RequestParams = {}) =>
    this.request<VocTvReturnTagTopResp, void>({
      path: `/api/bi/voc/tv/vocTag/top3/last6Month`,
      method: 'POST',
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags VOC电视看板
   * @name BiVocTvVocTagTop3TrendLast6Month
   * @summary 全品线TOP3问题变化趋势
   * @request POST:/api/bi/voc/tv/vocTag/top3/trend/last6Month
   * @response `200` `VocTvTagTrendResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  biVocTvVocTagTop3TrendLast6Month = (params: RequestParams = {}) =>
    this.request<VocTvTagTrendResp, void>({
      path: `/api/bi/voc/tv/vocTag/top3/trend/last6Month`,
      method: 'POST',
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 动态表-数据管理
   * @name DynamicData
   * @summary 分页查询表数据
   * @request GET:/api/dynamic/data/{tableName}
   * @response `200` `DynamicDataPageResp` OK
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  dynamicData = (
    tableName: string,
    query: {
      /** database */
      database: string;
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
    this.request<DynamicDataPageResp, void>({
      path: `/api/dynamic/data/${tableName}`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 动态表-数据管理
   * @name DynamicDataDelete
   * @summary 删除一行
   * @request POST:/api/dynamic/data/{tableName}/delete/{id}
   * @response `200` `number` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  dynamicDataDelete = (
    id: object,
    tableName: string,
    query: {
      /** database */
      database: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<number, void>({
      path: `/api/dynamic/data/${tableName}/delete/${id}`,
      method: 'POST',
      query: query,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 动态表-数据管理
   * @name DynamicDataExcelExport
   * @summary 导出全表数据
   * @request GET:/api/dynamic/data/{tableName}/excel/export
   * @response `200` `void` OK
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  dynamicDataExcelExport = (
    tableName: string,
    query: {
      /** database */
      database: string;
      /**
       * maxRows
       * @format int64
       */
      maxRows?: number;
      /**
       * shardSize
       * @format int32
       */
      shardSize?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/api/dynamic/data/${tableName}/excel/export`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 动态表-数据管理
   * @name DynamicDataExcelImport
   * @summary 按模板批量导入
   * @request POST:/api/dynamic/data/{tableName}/excel/import
   * @response `200` `DynamicExcelImportResult` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  dynamicDataExcelImport = (
    tableName: string,
    query: {
      /** database */
      database: string;
    },
    req: DynamicExcelImportOssReq,
    params: RequestParams = {},
  ) =>
    this.request<DynamicExcelImportResult, void>({
      path: `/api/dynamic/data/${tableName}/excel/import`,
      method: 'POST',
      query: query,
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 动态表-数据管理
   * @name DynamicDataExcelImportTemplate
   * @summary 导出 Excel 导入模板
   * @request GET:/api/dynamic/data/{tableName}/excel/import-template
   * @response `200` `void` OK
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  dynamicDataExcelImportTemplate = (
    tableName: string,
    query: {
      /** database */
      database: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/api/dynamic/data/${tableName}/excel/import-template`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 动态表-数据管理
   * @name DynamicDataInsert
   * @summary 新增一行
   * @request POST:/api/dynamic/data/{tableName}/insert
   * @response `200` `object` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  dynamicDataInsert = (
    tableName: string,
    query: {
      /** database */
      database: string;
    },
    row: object,
    params: RequestParams = {},
  ) =>
    this.request<object, void>({
      path: `/api/dynamic/data/${tableName}/insert`,
      method: 'POST',
      query: query,
      body: row,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 动态表-数据管理
   * @name DynamicDataUpdate
   * @summary 修改一行
   * @request POST:/api/dynamic/data/{tableName}/update/{id}
   * @response `200` `number` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  dynamicDataUpdate = (
    id: object,
    tableName: string,
    query: {
      /** database */
      database: string;
    },
    row: object,
    params: RequestParams = {},
  ) =>
    this.request<number, void>({
      path: `/api/dynamic/data/${tableName}/update/${id}`,
      method: 'POST',
      query: query,
      body: row,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 动态表-数据管理
   * @name DynamicData2
   * @summary 查询单条
   * @request GET:/api/dynamic/data/{tableName}/{id}
   * @originalName dynamicData
   * @duplicate
   * @response `200` `object` OK
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  dynamicData2 = (
    id: object,
    tableName: string,
    query: {
      /** database */
      database: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<object, void>({
      path: `/api/dynamic/data/${tableName}/${id}`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 动态表-表管理
   * @name DynamicTableCreate
   * @summary 创建表
   * @request POST:/api/dynamic/table/create
   * @response `200` `void` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  dynamicTableCreate = (req: DynamicTableCreateReq, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/dynamic/table/create`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 动态表-表管理
   * @name DynamicTableDelete
   * @summary 删除表
   * @request POST:/api/dynamic/table/delete/{tableName}
   * @response `200` `void` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  dynamicTableDelete = (
    tableName: string,
    query: {
      /** database */
      database: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/api/dynamic/table/delete/${tableName}`,
      method: 'POST',
      query: query,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 动态表-表管理
   * @name DynamicTableImportFromDdl
   * @summary 从 CREATE TABLE
   * @request POST:/api/dynamic/table/import-from-ddl
   * @response `200` `DynamicTableImportFromDdlResp` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  dynamicTableImportFromDdl = (req: DynamicTableImportFromDdlReq, params: RequestParams = {}) =>
    this.request<DynamicTableImportFromDdlResp, void>({
      path: `/api/dynamic/table/import-from-ddl`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 动态表-表管理
   * @name DynamicTableList
   * @summary 表列表
   * @request GET:/api/dynamic/table/list
   * @response `200` `DynamicTablePageResp` OK
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  dynamicTableList = (
    query: {
      /** database */
      database: string;
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
    this.request<DynamicTablePageResp, void>({
      path: `/api/dynamic/table/list`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 动态表-表管理
   * @name DynamicTableUpdate
   * @summary 修改表结构
   * @request POST:/api/dynamic/table/update/{tableName}
   * @response `200` `void` OK
   * @response `201` `void` Created
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  dynamicTableUpdate = (
    tableName: string,
    query: {
      /** database */
      database: string;
    },
    req: DynamicTableUpdateReq,
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/api/dynamic/table/update/${tableName}`,
      method: 'POST',
      query: query,
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 动态表-表管理
   * @name DynamicTable
   * @summary 表详情
   * @request GET:/api/dynamic/table/{tableName}
   * @response `200` `DynamicTableDetailResp` OK
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  dynamicTable = (
    tableName: string,
    query: {
      /** database */
      database: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<DynamicTableDetailResp, void>({
      path: `/api/dynamic/table/${tableName}`,
      method: 'GET',
      query: query,
      ...params,
    });
}
