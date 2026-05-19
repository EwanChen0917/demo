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

export namespace Api {
  /**
   * No description
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
  export namespace BiAdQueryAdAnalysis {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CommonAnalysisReq;
    export type RequestHeaders = {};
    export type ResponseBody = AdAnalysisResp;
  }

  /**
   * No description
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
  export namespace BiAdQueryAdCategory4ByCategory {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CommonAnalysisPageReq;
    export type RequestHeaders = {};
    export type ResponseBody = AdCategoryAnalysisResp;
  }

  /**
   * No description
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
  export namespace BiAdQueryAdCategoryPage {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CommonAnalysisPageReq;
    export type RequestHeaders = {};
    export type ResponseBody = AdCategoryAnalysisResp;
  }

  /**
   * No description
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
  export namespace BiAdQueryAdCountryPage {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CommonAnalysisPageReq;
    export type RequestHeaders = {};
    export type ResponseBody = AdCountryAnalysisResp;
  }

  /**
   * No description
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
  export namespace BiAdQueryAdNamePage {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CommonAnalysisPageReq;
    export type RequestHeaders = {};
    export type ResponseBody = AdNameAnalysisResp;
  }

  /**
   * No description
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
  export namespace BiAdQueryAdQuadrantAnalysis {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CommonAnalysisReq;
    export type RequestHeaders = {};
    export type ResponseBody = AdAnalysisResp;
  }

  /**
   * No description
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
  export namespace BiAdQueryAdSpuByCategory4 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CommonAnalysisPageReq;
    export type RequestHeaders = {};
    export type ResponseBody = AdCategoryAnalysisResp;
  }

  /**
   * No description
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
  export namespace BiAdSaveClicksScope {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ClicksScopeSaveReq;
    export type RequestHeaders = {};
    export type ResponseBody = CommonRespString;
  }

  /**
   * No description
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
  export namespace BiAfterSalesQueryAfterSalesAnalysis {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CommonAnalysisReq;
    export type RequestHeaders = {};
    export type ResponseBody = AfterSalesAnalysisResp;
  }

  /**
   * No description
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
  export namespace BiAfterSalesQueryDimensionAnalysis {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CommonAnalysisReq;
    export type RequestHeaders = {};
    export type ResponseBody = AfterSalesAnalysisResp;
  }

  /**
   * No description
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
  export namespace BiAfterSalesQueryEnums {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CommonAnalysisReq;
    export type RequestHeaders = {};
    export type ResponseBody = ManageAnalysisEnumsResp;
  }

  /**
   * No description
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
  export namespace BiAnalysisAppQueryManageAnalysis {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CommonAnalysisReq;
    export type RequestHeaders = {};
    export type ResponseBody = ManageAnalysisResp;
  }

  /**
   * No description
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
  export namespace BiAnalysisAppQueryTrendAnalysis {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CommonAnalysisReq;
    export type RequestHeaders = {};
    export type ResponseBody = ManageAnalysisResp;
  }

  /**
   * No description
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
  export namespace BiAnalysisQueryAiAnalysisResult {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CommonAnalysisReq;
    export type RequestHeaders = {};
    export type ResponseBody = ManageAnalysisResp;
  }

  /**
   * No description
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
  export namespace BiAnalysisQueryAverageOrderAmountTrends {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CommonAnalysisReq;
    export type RequestHeaders = {};
    export type ResponseBody = AverageOrderAmountTrendResp;
  }

  /**
   * No description
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
  export namespace BiAnalysisQueryDimensionAnalysis {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CommonAnalysisReq;
    export type RequestHeaders = {};
    export type ResponseBody = ManageAnalysisResp;
  }

  /**
   * No description
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
  export namespace BiAnalysisQueryEnums {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CommonAnalysisReq;
    export type RequestHeaders = {};
    export type ResponseBody = ManageAnalysisEnumsResp;
  }

  /**
   * No description
   * @tags 经营分析
   * @name BiAnalysisQueryLastDate
   * @summary 查询截止时间
   * @request GET:/api/bi/analysis/queryLastDate
   * @response `200` `CommonRespString` OK
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  export namespace BiAnalysisQueryLastDate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = CommonRespString;
  }

  /**
   * No description
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
  export namespace BiAnalysisQueryManageAnalysis {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CommonAnalysisReq;
    export type RequestHeaders = {};
    export type ResponseBody = ManageAnalysisResp;
  }

  /**
   * No description
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
  export namespace BiBrandQueryBrandAnalysis {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CommonAnalysisReq;
    export type RequestHeaders = {};
    export type ResponseBody = BrandAnalysisResp;
  }

  /**
   * No description
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
  export namespace BiBrandQueryDimensionAnalysis {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CommonAnalysisReq;
    export type RequestHeaders = {};
    export type ResponseBody = BrandAnalysisResp;
  }

  /**
   * No description
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
  export namespace BiBrandQueryEnums {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CommonAnalysisReq;
    export type RequestHeaders = {};
    export type ResponseBody = ManageAnalysisEnumsResp;
  }

  /**
   * No description
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
  export namespace BiCommonQueryDataByConfigId {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CommonReq;
    export type RequestHeaders = {};
    export type ResponseBody = QueryResp;
  }

  /**
   * No description
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
  export namespace BiCommonQueryEnums {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = EnumsReq;
    export type RequestHeaders = {};
    export type ResponseBody = EnumsResp;
  }

  /**
   * No description
   * @tags 通用接口
   * @name BiCommonQueryMetric
   * @summary 查询指标说明
   * @request GET:/api/bi/common/queryMetric
   * @response `200` `MetricResp` OK
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  export namespace BiCommonQueryMetric {
    export type RequestParams = {};
    export type RequestQuery = {
      /** page */
      page?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = MetricResp;
  }

  /**
   * No description
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
  export namespace BiCommonQueryReportConfig {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ReportConfigReq;
    export type RequestHeaders = {};
    export type ResponseBody = ReportConfigResp;
  }

  /**
   * No description
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
  export namespace BiCommonQueryWeek {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = WeekReq;
    export type RequestHeaders = {};
    export type ResponseBody = WeekResp;
  }

  /**
   * No description
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
  export namespace BiDeveloperQuery {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CommonAnalysisReq;
    export type RequestHeaders = {};
    export type ResponseBody = DeveloperResp;
  }

  /**
   * No description
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
  export namespace BiDeveloperQueryReviewUnusual {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CommonAnalysisReq;
    export type RequestHeaders = {};
    export type ResponseBody = DeveloperResp;
  }

  /**
   * No description
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
  export namespace BiDeveloperSalesQueryDimensionAnalysis {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CommonAnalysisReq;
    export type RequestHeaders = {};
    export type ResponseBody = DeveloperResp;
  }

  /**
   * No description
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
  export namespace BiFrontpageQueryAdAnalysis {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FrontPageReq;
    export type RequestHeaders = {};
    export type ResponseBody = FrontPageResp;
  }

  /**
   * No description
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
  export namespace BiFrontpageQueryAfterSalesAnalysis {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FrontPageReq;
    export type RequestHeaders = {};
    export type ResponseBody = FrontPageResp;
  }

  /**
   * No description
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
  export namespace BiFrontpageQueryAreaSalesAnalysisList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FrontPageReq;
    export type RequestHeaders = {};
    export type ResponseBody = FrontPageResp;
  }

  /**
   * No description
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
  export namespace BiFrontpageQueryEnums {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FrontPageReq;
    export type RequestHeaders = {};
    export type ResponseBody = ManageAnalysisEnumsResp;
  }

  /**
   * No description
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
  export namespace BiFrontpageQueryFrontPage {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FrontPageReq;
    export type RequestHeaders = {};
    export type ResponseBody = FrontPageResp;
  }

  /**
   * No description
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
  export namespace BiFrontpageQueryGtmSalesAnalysisList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FrontPageReq;
    export type RequestHeaders = {};
    export type ResponseBody = FrontPageResp;
  }

  /**
   * No description
   * @tags ERP首页
   * @name BiFrontpageQueryLastDate
   * @summary 查询截止时间
   * @request GET:/api/bi/frontpage/queryLastDate
   * @response `200` `CommonRespString` OK
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  export namespace BiFrontpageQueryLastDate {
    export type RequestParams = {};
    export type RequestQuery = {
      /** dateType */
      dateType?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = CommonRespString;
  }

  /**
   * No description
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
  export namespace BiFrontpageQueryMetricOverview {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FrontPageReq;
    export type RequestHeaders = {};
    export type ResponseBody = FrontPageResp;
  }

  /**
   * No description
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
  export namespace BiFrontpageQuerySalesAnalysis {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FrontPageReq;
    export type RequestHeaders = {};
    export type ResponseBody = FrontPageResp;
  }

  /**
   * No description
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
  export namespace BiFrontpageQuerySpuSalesAnalysisList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FrontPageReq;
    export type RequestHeaders = {};
    export type ResponseBody = FrontPageResp;
  }

  /**
   * No description
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
  export namespace BiFrontpageQuerySupplyChainAnalysis {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FrontPageReq;
    export type RequestHeaders = {};
    export type ResponseBody = FrontPageResp;
  }

  /**
   * No description
   * @tags ERP首页
   * @name BiFrontpageQueryTimeZone
   * @summary 查询时区
   * @request GET:/api/bi/frontpage/queryTimeZone
   * @response `200` `TimeZoneResp` OK
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  export namespace BiFrontpageQueryTimeZone {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = TimeZoneResp;
  }

  /**
   * No description
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
  export namespace BiFrontpageQueryTrafficAnalysis {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FrontPageReq;
    export type RequestHeaders = {};
    export type ResponseBody = FrontPageResp;
  }

  /**
   * No description
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
  export namespace BiFrontpageSalesQueryDimensionAnalysis {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FrontPageReq;
    export type RequestHeaders = {};
    export type ResponseBody = FrontPageResp;
  }

  /**
   * No description
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
  export namespace BiInventoryQueryDimensionAnalysis {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CommonAnalysisReq;
    export type RequestHeaders = {};
    export type ResponseBody = InventoryTurnoverResp;
  }

  /**
   * No description
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
  export namespace BiInventoryQueryEnums {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CommonAnalysisReq;
    export type RequestHeaders = {};
    export type ResponseBody = ManageAnalysisEnumsResp;
  }

  /**
   * No description
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
  export namespace BiInventoryQueryInventoryTurnover {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CommonAnalysisReq;
    export type RequestHeaders = {};
    export type ResponseBody = InventoryTurnoverResp;
  }

  /**
   * No description
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
  export namespace BiInventorySaveAnalysisResult {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SaveAnalysisResultReq;
    export type RequestHeaders = {};
    export type ResponseBody = CommonRespBoolean;
  }

  /**
   * No description
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
  export namespace BiLogisticsChannelQuery {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LogisticsChannelReq;
    export type RequestHeaders = {};
    export type ResponseBody = LogisticsChannelResp;
  }

  /**
   * No description
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
  export namespace BiMarketExportCustomerVoice {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CommonAnalysisReq;
    export type RequestHeaders = {};
    export type ResponseBody = CommonRespString;
  }

  /**
   * No description
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
  export namespace BiMarketQueryCategory4Review {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CommonAnalysisReq;
    export type RequestHeaders = {};
    export type ResponseBody = CustomerVoiceResp;
  }

  /**
   * No description
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
  export namespace BiMarketQueryCategoryKeyword {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CommonAnalysisReq;
    export type RequestHeaders = {};
    export type ResponseBody = Record<string, Record<string, number>>;
  }

  /**
   * No description
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
  export namespace BiMarketQueryCompetitiveInsight {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CommonAnalysisReq;
    export type RequestHeaders = {};
    export type ResponseBody = CompetitiveInsightResp;
  }

  /**
   * No description
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
  export namespace BiMarketQueryCountryBrandList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CommonAnalysisReq;
    export type RequestHeaders = {};
    export type ResponseBody = CompetitiveInsightResp;
  }

  /**
   * No description
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
  export namespace BiMarketQueryCustomerVoice {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CommonAnalysisReq;
    export type RequestHeaders = {};
    export type ResponseBody = CustomerVoiceResp;
  }

  /**
   * No description
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
  export namespace BiMarketQueryIndustryTrend {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CommonAnalysisReq;
    export type RequestHeaders = {};
    export type ResponseBody = IndustryTrendResp;
  }

  /**
   * No description
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
  export namespace BiMarketQueryLastDate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CommonAnalysisReq;
    export type RequestHeaders = {};
    export type ResponseBody = CommonRespString;
  }

  /**
   * No description
   * @tags 市场分析
   * @name BiMarketQueryPriceConfig
   * @summary 竞品洞察 - 价格带配置查询
   * @request GET:/api/bi/market/queryPriceConfig
   * @response `200` `CompetitiveInsightResp` OK
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  export namespace BiMarketQueryPriceConfig {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = CompetitiveInsightResp;
  }

  /**
   * No description
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
  export namespace BiMarketQueryPriceQuartile {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CommonAnalysisReq;
    export type RequestHeaders = {};
    export type ResponseBody = CompetitiveInsightResp;
  }

  /**
   * No description
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
  export namespace BiMarketQuerySpuReturnReasonAndTag {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CommonAnalysisReq;
    export type RequestHeaders = {};
    export type ResponseBody = AfterSalesAnalysisResp;
  }

  /**
   * No description
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
  export namespace BiMarketQuerySpuReview {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CommonAnalysisReq;
    export type RequestHeaders = {};
    export type ResponseBody = CustomerVoiceResp;
  }

  /**
   * No description
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
  export namespace BiMarketQueryVocLastDate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CommonAnalysisReq;
    export type RequestHeaders = {};
    export type ResponseBody = CommonRespString;
  }

  /**
   * No description
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
  export namespace BiMarketSavePriceConfig {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PriceConfigSaveReq;
    export type RequestHeaders = {};
    export type ResponseBody = CommonRespString;
  }

  /**
   * No description
   * @tags MPC SPU分析
   * @name BiMpcQuerySpuAnalysis
   * @summary 查询SPU分析结果
   * @request GET:/api/bi/mpc/querySpuAnalysis
   * @response `200` `MpcSpuAnalysisResp` OK
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  export namespace BiMpcQuerySpuAnalysis {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = MpcSpuAnalysisResp;
  }

  /**
   * No description
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
  export namespace BiMpcQuerySpuAnalysisEnums {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = MpcSpuAnalysisEnumsResp;
  }

  /**
   * No description
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
  export namespace BiMpcSaveSpuAnalysis {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MpcSpuAnalysisReq;
    export type RequestHeaders = {};
    export type ResponseBody = CommonRespBoolean;
  }

  /**
   * No description
   * @tags 产品经理驾驶舱
   * @name BiProductManagerQueryLastDate
   * @summary 查询截止时间
   * @request GET:/api/bi/product/manager/queryLastDate
   * @response `200` `CommonRespString` OK
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  export namespace BiProductManagerQueryLastDate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = CommonRespString;
  }

  /**
   * No description
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
  export namespace BiProductManagerQueryLevel3ByLevel2 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CommonAnalysisReq;
    export type RequestHeaders = {};
    export type ResponseBody = ProductManagerResp;
  }

  /**
   * No description
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
  export namespace BiProductManagerQueryProductManager {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CommonAnalysisReq;
    export type RequestHeaders = {};
    export type ResponseBody = ProductManagerResp;
  }

  /**
   * No description
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
  export namespace BiProductManagerQueryReturnLevel3ByLevel2 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CommonAnalysisReq;
    export type RequestHeaders = {};
    export type ResponseBody = ProductManagerResp;
  }

  /**
   * No description
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
  export namespace BiProductManagerQuerySpuLevel3MapList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CommonAnalysisReq;
    export type RequestHeaders = {};
    export type ResponseBody = ProductManagerResp;
  }

  /**
   * No description
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
  export namespace BiProductManagerQuerySpuReturnLevel3MapList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CommonAnalysisReq;
    export type RequestHeaders = {};
    export type ResponseBody = ProductManagerResp;
  }

  /**
   * No description
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
  export namespace BiQuery {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = QueryReq;
    export type RequestHeaders = {};
    export type ResponseBody = QueryResp;
  }

  /**
   * No description
   * @tags 多维分析查询
   * @name BiQueryEnums
   * @summary 查询枚举
   * @request GET:/api/bi/queryEnums
   * @response `200` `QueryResp` OK
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  export namespace BiQueryEnums {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = QueryReq;
    export type RequestHeaders = {};
    export type ResponseBody = QueryResp;
  }

  /**
   * No description
   * @tags 实时销售数据
   * @name BiRealTimeSaleQueryCurrentTime
   * @summary 查询当前时间
   * @request GET:/api/bi/realTimeSale/queryCurrentTime
   * @response `200` `RealTimeSaleAnalysisResp` OK
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  export namespace BiRealTimeSaleQueryCurrentTime {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = RealTimeSaleAnalysisResp;
  }

  /**
   * No description
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
  export namespace BiRealTimeSaleQueryYoy {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CommonAnalysisReq;
    export type RequestHeaders = {};
    export type ResponseBody = RealTimeSaleAnalysisResp;
  }

  /**
   * No description
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
  export namespace BiReportAdd {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BiReportAddReq;
    export type RequestHeaders = {};
    export type ResponseBody = CommonRespVoid;
  }

  /**
   * No description
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
  export namespace BiReportConfigAdd {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BiReportConfigAddReq;
    export type RequestHeaders = {};
    export type ResponseBody = CommonRespVoid;
  }

  /**
   * No description
   * @tags BI看板管理
   * @name BiReportConfigDelete
   * @summary 删除看板配置
   * @request DELETE:/api/bi/report/config/delete/{id}
   * @response `200` `CommonRespVoid` OK
   * @response `204` `void` No Content
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   */
  export namespace BiReportConfigDelete {
    export type RequestParams = {
      /**
       * id
       * @format int64
       */
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = CommonRespVoid;
  }

  /**
   * No description
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
  export namespace BiReportConfigUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BiReportConfigUpdateReq;
    export type RequestHeaders = {};
    export type ResponseBody = CommonRespVoid;
  }

  /**
   * No description
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
  export namespace BiReportConfigs {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BiReportConfigListReq;
    export type RequestHeaders = {};
    export type ResponseBody = BiReportConfig[];
  }

  /**
   * No description
   * @tags BI看板管理
   * @name BiReportDelete
   * @summary 删除看板
   * @request DELETE:/api/bi/report/delete/{id}
   * @response `200` `CommonRespVoid` OK
   * @response `204` `void` No Content
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   */
  export namespace BiReportDelete {
    export type RequestParams = {
      /**
       * id
       * @format int64
       */
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = CommonRespVoid;
  }

  /**
   * No description
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
  export namespace BiReportDimensionAdd {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BiReportDimensionAddReq;
    export type RequestHeaders = {};
    export type ResponseBody = CommonRespVoid;
  }

  /**
   * No description
   * @tags BI看板管理
   * @name BiReportDimensionDelete
   * @summary 删除看板维度
   * @request DELETE:/api/bi/report/dimension/delete/{id}
   * @response `200` `CommonRespVoid` OK
   * @response `204` `void` No Content
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   */
  export namespace BiReportDimensionDelete {
    export type RequestParams = {
      /**
       * id
       * @format int64
       */
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = CommonRespVoid;
  }

  /**
   * No description
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
  export namespace BiReportDimensionUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BiReportDimensionUpdateReq;
    export type RequestHeaders = {};
    export type ResponseBody = CommonRespVoid;
  }

  /**
   * No description
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
  export namespace BiReportDimensions {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BiReportDimensionListReq;
    export type RequestHeaders = {};
    export type ResponseBody = BiReportDimension[];
  }

  /**
   * No description
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
  export namespace BiReportList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BiReportListReq;
    export type RequestHeaders = {};
    export type ResponseBody = BiReportListResp;
  }

  /**
   * No description
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
  export namespace BiReportUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BiReportUpdateReq;
    export type RequestHeaders = {};
    export type ResponseBody = CommonRespVoid;
  }

  /**
   * No description
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
  export namespace BiReturnRateQueryEnums {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CommonAnalysisReq;
    export type RequestHeaders = {};
    export type ResponseBody = ManageAnalysisEnumsResp;
  }

  /**
   * No description
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
  export namespace BiReturnRateQueryReturnRate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CommonAnalysisReq;
    export type RequestHeaders = {};
    export type ResponseBody = ReturnRateResp;
  }

  /**
   * No description
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
  export namespace BiSalesDayQueryDimensionAnalysis {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CommonAnalysisReq;
    export type RequestHeaders = {};
    export type ResponseBody = SalesDayAnalysisResp;
  }

  /**
   * No description
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
  export namespace BiSalesDayQueryEnums {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CommonAnalysisReq;
    export type RequestHeaders = {};
    export type ResponseBody = ManageAnalysisEnumsResp;
  }

  /**
   * No description
   * @tags 销售分析 - 日
   * @name BiSalesDayQueryLastDate
   * @summary 查询截止时间
   * @request GET:/api/bi/sales/day/queryLastDate
   * @response `200` `CommonRespString` OK
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  export namespace BiSalesDayQueryLastDate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = CommonRespString;
  }

  /**
   * No description
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
  export namespace BiSalesDayQuerySalesAnalysis {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CommonAnalysisReq;
    export type RequestHeaders = {};
    export type ResponseBody = SalesDayAnalysisResp;
  }

  /**
   * No description
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
  export namespace BiSalesMonthQueryDimensionAnalysis {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CommonAnalysisReq;
    export type RequestHeaders = {};
    export type ResponseBody = SalesMonthAnalysisResp;
  }

  /**
   * No description
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
  export namespace BiSalesMonthQueryEnums {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CommonAnalysisReq;
    export type RequestHeaders = {};
    export type ResponseBody = ManageAnalysisEnumsResp;
  }

  /**
   * No description
   * @tags 销售分析 - 月
   * @name BiSalesMonthQueryLastDate
   * @summary 查询截止时间
   * @request GET:/api/bi/sales/month/queryLastDate
   * @response `200` `CommonRespString` OK
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  export namespace BiSalesMonthQueryLastDate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = CommonRespString;
  }

  /**
   * No description
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
  export namespace BiSalesMonthQuerySalesAnalysis {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CommonAnalysisReq;
    export type RequestHeaders = {};
    export type ResponseBody = SalesMonthAnalysisResp;
  }

  /**
   * No description
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
  export namespace BiSalesQueryCurrMonthAnalysisResult {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CommonAnalysisReq;
    export type RequestHeaders = {};
    export type ResponseBody = AnalysisResultResp;
  }

  /**
   * No description
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
  export namespace BiSalesQueryDimensionAnalysis {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CommonAnalysisReq;
    export type RequestHeaders = {};
    export type ResponseBody = SalesAnalysisResp;
  }

  /**
   * No description
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
  export namespace BiSalesQuerySalesAnalysis {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CommonAnalysisReq;
    export type RequestHeaders = {};
    export type ResponseBody = SalesAnalysisResp;
  }

  /**
   * No description
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
  export namespace BiSalesWeekQueryDimensionAnalysis {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CommonAnalysisReq;
    export type RequestHeaders = {};
    export type ResponseBody = SalesWeekAnalysisResp;
  }

  /**
   * No description
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
  export namespace BiSalesWeekQueryEnums {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CommonAnalysisReq;
    export type RequestHeaders = {};
    export type ResponseBody = ManageAnalysisEnumsResp;
  }

  /**
   * No description
   * @tags 销售分析 - 周
   * @name BiSalesWeekQueryLastDate
   * @summary 查询截止时间
   * @request GET:/api/bi/sales/week/queryLastDate
   * @response `200` `CommonRespString` OK
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  export namespace BiSalesWeekQueryLastDate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = CommonRespString;
  }

  /**
   * No description
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
  export namespace BiSalesWeekQuerySalesAnalysis {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CommonAnalysisReq;
    export type RequestHeaders = {};
    export type ResponseBody = SalesWeekAnalysisResp;
  }

  /**
   * No description
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
  export namespace BiSalesYearQueryDimensionAnalysis {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CommonAnalysisReq;
    export type RequestHeaders = {};
    export type ResponseBody = SalesYearAnalysisResp;
  }

  /**
   * No description
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
  export namespace BiSalesYearQueryEnums {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CommonAnalysisReq;
    export type RequestHeaders = {};
    export type ResponseBody = ManageAnalysisEnumsResp;
  }

  /**
   * No description
   * @tags 销售分析 - 年
   * @name BiSalesYearQueryLastDate
   * @summary 查询截止时间
   * @request GET:/api/bi/sales/year/queryLastDate
   * @response `200` `CommonRespString` OK
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  export namespace BiSalesYearQueryLastDate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = CommonRespString;
  }

  /**
   * No description
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
  export namespace BiSalesYearQuerySalesAnalysis {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CommonAnalysisReq;
    export type RequestHeaders = {};
    export type ResponseBody = SalesYearAnalysisResp;
  }

  /**
   * No description
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
  export namespace BiTableAdd {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BiTableAddReq;
    export type RequestHeaders = {};
    export type ResponseBody = CommonRespVoid;
  }

  /**
   * No description
   * @tags BI数据表管理
   * @name BiTableDelete
   * @summary 删除数据表
   * @request DELETE:/api/bi/table/delete/{id}
   * @response `200` `CommonRespVoid` OK
   * @response `204` `void` No Content
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   */
  export namespace BiTableDelete {
    export type RequestParams = {
      /**
       * id
       * @format int64
       */
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = CommonRespVoid;
  }

  /**
   * No description
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
  export namespace BiTableDimensionAdd {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BiDimensionAddReq;
    export type RequestHeaders = {};
    export type ResponseBody = CommonRespVoid;
  }

  /**
   * No description
   * @tags BI数据表管理
   * @name BiTableDimensionDelete
   * @summary 删除维度
   * @request DELETE:/api/bi/table/dimension/delete/{id}
   * @response `200` `CommonRespVoid` OK
   * @response `204` `void` No Content
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   */
  export namespace BiTableDimensionDelete {
    export type RequestParams = {
      /**
       * id
       * @format int64
       */
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = CommonRespVoid;
  }

  /**
   * No description
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
  export namespace BiTableDimensionUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BiDimensionUpdateReq;
    export type RequestHeaders = {};
    export type ResponseBody = CommonRespVoid;
  }

  /**
   * No description
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
  export namespace BiTableDimensions {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BiDimensionListReq;
    export type RequestHeaders = {};
    export type ResponseBody = BiDimension[];
  }

  /**
   * No description
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
  export namespace BiTableList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BiTableListReq;
    export type RequestHeaders = {};
    export type ResponseBody = BiTableListResp;
  }

  /**
   * No description
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
  export namespace BiTableMetricAdd {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BiMetricAddReq;
    export type RequestHeaders = {};
    export type ResponseBody = CommonRespVoid;
  }

  /**
   * No description
   * @tags BI数据表管理
   * @name BiTableMetricDelete
   * @summary 删除指标
   * @request DELETE:/api/bi/table/metric/delete/{id}
   * @response `200` `CommonRespVoid` OK
   * @response `204` `void` No Content
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   */
  export namespace BiTableMetricDelete {
    export type RequestParams = {
      /**
       * id
       * @format int64
       */
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = CommonRespVoid;
  }

  /**
   * No description
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
  export namespace BiTableMetricUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BiMetricUpdateReq;
    export type RequestHeaders = {};
    export type ResponseBody = CommonRespVoid;
  }

  /**
   * No description
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
  export namespace BiTableMetrics {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BiMetricListReq;
    export type RequestHeaders = {};
    export type ResponseBody = BiMetric[];
  }

  /**
   * No description
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
  export namespace BiTableUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BiTableUpdateReq;
    export type RequestHeaders = {};
    export type ResponseBody = CommonRespVoid;
  }

  /**
   * No description
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
  export namespace BiVocCondition {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BaseVocQueryReq;
    export type RequestHeaders = {};
    export type ResponseBody = VocConditionQueryResp;
  }

  /**
   * No description
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
  export namespace BiVocCoreIndicator {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = VocCoreIndicatorReq;
    export type RequestHeaders = {};
    export type ResponseBody = VocCoreIndicatorResp;
  }

  /**
   * No description
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
  export namespace BiVocMaxEndDate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VocEndDateResp;
  }

  /**
   * No description
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
  export namespace BiVocProductRating {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = VocProductRatingReq;
    export type RequestHeaders = {};
    export type ResponseBody = VocProductRatingResp;
  }

  /**
   * No description
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
  export namespace BiVocProductRatingSpu {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = VocProductRatingSpuDetailReq;
    export type RequestHeaders = {};
    export type ResponseBody = VocProductRatingSpuDetailResp;
  }

  /**
   * No description
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
  export namespace BiVocQueryEnums {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = VocAnalysisReq;
    export type RequestHeaders = {};
    export type ResponseBody = VocAnalysisEnumsResp;
  }

  /**
   * No description
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
  export namespace BiVocQueryLastDay {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = CommonRespString;
  }

  /**
   * No description
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
  export namespace BiVocQueryProductLine {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = VocCoreIndicatorReq;
    export type RequestHeaders = {};
    export type ResponseBody = VocProductLineResp;
  }

  /**
   * No description
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
  export namespace BiVocQueryVocAnalysis {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = VocAnalysisReq;
    export type RequestHeaders = {};
    export type ResponseBody = VocAnalysisResp;
  }

  /**
   * No description
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
  export namespace BiVocQueryVocLevel2Analysis {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = VocAnalysisReq;
    export type RequestHeaders = {};
    export type ResponseBody = VocAnalysisResp;
  }

  /**
   * No description
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
  export namespace BiVocQueryVocLevelDrillDown {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = VocAnalysisReq;
    export type RequestHeaders = {};
    export type ResponseBody = VocAnalysisResp;
  }

  /**
   * No description
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
  export namespace BiVocQueryVocPlatformDrillDown {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = VocAnalysisReq;
    export type RequestHeaders = {};
    export type ResponseBody = VocAnalysisResp;
  }

  /**
   * No description
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
  export namespace BiVocQueryVocProductAnalysis {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = VocProductAnalysisReq;
    export type RequestHeaders = {};
    export type ResponseBody = VocProductAnalysisResp;
  }

  /**
   * No description
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
  export namespace BiVocTagDistribution {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = VocTagDistributionReq;
    export type RequestHeaders = {};
    export type ResponseBody = VocTagDistributionResp;
  }

  /**
   * No description
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
  export namespace BiVocTagLevelDetail {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = VocTagLevelDetailReq;
    export type RequestHeaders = {};
    export type ResponseBody = VocTagLevelDetailResp;
  }

  /**
   * No description
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
  export namespace BiVocTagList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = VocTagListReq;
    export type RequestHeaders = {};
    export type ResponseBody = VocTagListResp;
  }

  /**
   * No description
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
  export namespace BiVocTvNewProductSpu {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VocTvNewProductSpuResp;
  }

  /**
   * No description
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
  export namespace BiVocTvNewProductVocRatePerformance {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VocTvNewProductReturnRateResp;
  }

  /**
   * No description
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
  export namespace BiVocTvNewProductVocTagTop3 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VocTvReturnTagTopResp;
  }

  /**
   * No description
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
  export namespace BiVocTvNewProductVocTagTop3TrendLast6Month {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VocTvNewProductTagTrendResp;
  }

  /**
   * No description
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
  export namespace BiVocTvProductLineVocRateLast30Days {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VocTvProductLineReturnRateResp;
  }

  /**
   * No description
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
  export namespace BiVocTvProductLineVocRateLast6Month {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VocTvProductLineReturnRateResp;
  }

  /**
   * No description
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
  export namespace BiVocTvVocTagTop3Last30Days {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VocTvReturnTagTopResp;
  }

  /**
   * No description
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
  export namespace BiVocTvVocTagTop3Last6Month {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VocTvReturnTagTopResp;
  }

  /**
   * No description
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
  export namespace BiVocTvVocTagTop3TrendLast6Month {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VocTvTagTrendResp;
  }

  /**
   * No description
   * @tags 动态表-数据管理
   * @name DynamicData
   * @summary 分页查询表数据
   * @request GET:/api/dynamic/data/{tableName}
   * @response `200` `DynamicDataPageResp` OK
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  export namespace DynamicData {
    export type RequestParams = {
      /** tableName */
      tableName: string;
    };
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = DynamicDataPageResp;
  }

  /**
   * No description
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
  export namespace DynamicDataDelete {
    export type RequestParams = {
      /** id */
      id: object;
      /** tableName */
      tableName: string;
    };
    export type RequestQuery = {
      /** database */
      database: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = number;
  }

  /**
   * No description
   * @tags 动态表-数据管理
   * @name DynamicDataExcelExport
   * @summary 导出全表数据
   * @request GET:/api/dynamic/data/{tableName}/excel/export
   * @response `200` `void` OK
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  export namespace DynamicDataExcelExport {
    export type RequestParams = {
      /** tableName */
      tableName: string;
    };
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
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
  export namespace DynamicDataExcelImport {
    export type RequestParams = {
      /** tableName */
      tableName: string;
    };
    export type RequestQuery = {
      /** database */
      database: string;
    };
    export type RequestBody = DynamicExcelImportOssReq;
    export type RequestHeaders = {};
    export type ResponseBody = DynamicExcelImportResult;
  }

  /**
   * No description
   * @tags 动态表-数据管理
   * @name DynamicDataExcelImportTemplate
   * @summary 导出 Excel 导入模板
   * @request GET:/api/dynamic/data/{tableName}/excel/import-template
   * @response `200` `void` OK
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  export namespace DynamicDataExcelImportTemplate {
    export type RequestParams = {
      /** tableName */
      tableName: string;
    };
    export type RequestQuery = {
      /** database */
      database: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
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
  export namespace DynamicDataInsert {
    export type RequestParams = {
      /** tableName */
      tableName: string;
    };
    export type RequestQuery = {
      /** database */
      database: string;
    };
    export type RequestBody = object;
    export type RequestHeaders = {};
    export type ResponseBody = object;
  }

  /**
   * No description
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
  export namespace DynamicDataUpdate {
    export type RequestParams = {
      /** id */
      id: object;
      /** tableName */
      tableName: string;
    };
    export type RequestQuery = {
      /** database */
      database: string;
    };
    export type RequestBody = object;
    export type RequestHeaders = {};
    export type ResponseBody = number;
  }

  /**
   * No description
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
  export namespace DynamicData2 {
    export type RequestParams = {
      /** id */
      id: object;
      /** tableName */
      tableName: string;
    };
    export type RequestQuery = {
      /** database */
      database: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = object;
  }

  /**
   * No description
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
  export namespace DynamicTableCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DynamicTableCreateReq;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
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
  export namespace DynamicTableDelete {
    export type RequestParams = {
      /** tableName */
      tableName: string;
    };
    export type RequestQuery = {
      /** database */
      database: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
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
  export namespace DynamicTableImportFromDdl {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DynamicTableImportFromDdlReq;
    export type RequestHeaders = {};
    export type ResponseBody = DynamicTableImportFromDdlResp;
  }

  /**
   * No description
   * @tags 动态表-表管理
   * @name DynamicTableList
   * @summary 表列表
   * @request GET:/api/dynamic/table/list
   * @response `200` `DynamicTablePageResp` OK
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  export namespace DynamicTableList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = DynamicTablePageResp;
  }

  /**
   * No description
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
  export namespace DynamicTableUpdate {
    export type RequestParams = {
      /** tableName */
      tableName: string;
    };
    export type RequestQuery = {
      /** database */
      database: string;
    };
    export type RequestBody = DynamicTableUpdateReq;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags 动态表-表管理
   * @name DynamicTable
   * @summary 表详情
   * @request GET:/api/dynamic/table/{tableName}
   * @response `200` `DynamicTableDetailResp` OK
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `void` Not Found
   */
  export namespace DynamicTable {
    export type RequestParams = {
      /** tableName */
      tableName: string;
    };
    export type RequestQuery = {
      /** database */
      database: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = DynamicTableDetailResp;
  }
}
