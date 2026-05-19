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
  ActiveDiscountPlanAddQueryResp,
  ActiveDiscountPlanAddReq,
  ActiveDiscountPlanBatchAddReq,
  ActiveDiscountPlanBatchEditQueryReq,
  ActiveDiscountPlanBatchEditQueryResp,
  ActiveDiscountPlanListResp,
  ActiveDiscountPlanReq,
  AmazonListingParentResp,
  AmazonListingReq,
  AmazonListingResp,
  AmazonProductListingReq,
  AmazonProductListingResp,
  AmazonProductOperatorCheckDetailReq,
  AmazonProductOperatorCheckReq,
  AmazonProductOperatorListResp,
  AmazonRankingListBatchOperationReq,
  AmazonRankingListOperationReq,
  AmazonRankingListQueryListReq,
  AmazonRankingListSaveReq,
  AttrCategoryConnectReq,
  AttrDetailResp,
  AttrListQueryReq,
  AttrListQueryResp,
  AttrOperateReq,
  AttrSaveReq,
  AttrSaveResp,
  AttrValSaveReq,
  AttrValSaveResp,
  B2CChannelResp,
  B2CListingProductReq,
  B2CProductListingResp,
  BatchOperatorReq,
  BrandDetailResp,
  BrandListQueryAllResp,
  BrandListQueryReq,
  BrandListQueryResp,
  BrandOperateReq,
  BrandProductConnectReq,
  BrandSaveReq,
  BrandSaveResp,
  CategoryAttrConnectReq,
  CategoryChildrenQueryResp,
  CategoryDetailResp,
  CategoryLevelQueryInAttrResp,
  CategoryLevelQueryResp,
  CategoryListQueryReq,
  CategoryListQueryResp,
  CategoryOperateReq,
  CategorySaveReq,
  CategorySaveResp,
  CategoryTreeResp,
  CommonExportResp,
  CommonRespAddActivityDetailResp,
  CommonRespAmazonRankingListQueryListResp,
  CommonRespBoolean,
  CommonRespCommonExportResp,
  CommonRespListAmazonOperatorCheckDetailBean,
  CommonRespListMultiPriceDetailResp,
  CommonRespListProductLineSaveResp,
  CommonRespListString,
  CommonRespMacSupplierQueryResp,
  CommonRespMapStringOdsFinanceCurrency,
  CommonRespMsrpCalculateBaseDataResp,
  CommonRespMsrpCalculatePriceDetailResp,
  CommonRespMsrpOnlinePromotionResp,
  CommonRespMsrpQueryChannelBatchListResp,
  CommonRespMsrpSkuDetailBean,
  CommonRespMsrpSkuDetailResp,
  CommonRespMsrpSkuListResp,
  CommonRespMsrpSpuDetailResp,
  CommonRespMultiPriceQueryListResp,
  CommonRespObject,
  CommonRespOperatorQueryResp,
  CommonRespPlanCreateCheckResp,
  CommonRespProductListQueryResp,
  CommonRespProductShadowDetailStatisticsResp,
  CommonRespProductShadowSearchResp,
  CommonRespProductShowDetailSearchResp,
  CommonRespProductShowDetailStatisticsResp,
  CommonRespProductShowSearchResp,
  CommonRespProductSkuMappingQueryResp,
  CommonRespPromotionPlanDeleteResp,
  CommonRespPromotionPlanDetailResp,
  CommonRespPromotionPlanReviewListResp,
  CommonRespString,
  CommonRespVoid,
  CountryAreaListResp,
  CreateCategoryReq,
  CreateCategoryResp,
  DeptMemberListQueryResp,
  DeriveListParamResp,
  DeriveQueryResp,
  DictSalesChannelResp,
  DiscountPlanWeekApproveReq,
  DiscountPlanWeekCancelReq,
  DiscountPlanWeekEditReq,
  EccangSkuFullQueryResp,
  EccangSkuQueryReq,
  EccangSkuQueryResp,
  EccangSkuQueryV2Resp,
  FinanceProductLineListResp,
  ListingBatchModifyPlanReq,
  ListingBatchModifyTagReq,
  ListingBatchModifyTagV2Req,
  ListingQueryTagReq,
  ListingQueryTagV2Req,
  ListingTagResp,
  LuteConditionResp,
  MacAddrOperateReq,
  MacAddrQueryReq,
  MacAddrQueryResp,
  MacAddrSaveReq,
  MacFactoryDetailResp,
  MacFactoryOperateReq,
  MacFactoryOperateResp,
  MacFactoryQueryResp,
  MacFactorySaveReq,
  MacFactorySaveResp,
  MacProductCodeDetailResp,
  MacProductCodeOperateReq,
  MacProductCodeOperateResp,
  MacProductCodeQueryResp,
  MacProductCodeSaveReq,
  MacProductCodeSaveResp,
  MacRelSupplyCheckReq,
  MallClientOrderOperateReq,
  MallOrderDetailResp,
  MallOrderListReq,
  MallOrderListResp,
  MallOrderOperateReq,
  MallOrderStatusResp,
  MallOrderSubmitReq,
  MallOrderSubmitResp,
  MallProductClientListReq,
  MallProductClientListResp,
  MallProductDetailResp,
  MallProductListReq,
  MallProductListResp,
  MallProductOperateReq,
  MallProductSaveReq,
  MallProductSaveResp,
  MallShopCartCountResp,
  MallShopCartListResp,
  MallShopCartOperateReq,
  MallShopCartOperateResp,
  MallUserAddrListResp,
  MallUserAddrSaveReq,
  MallUserAddrSaveResp,
  MallUserDefaultAddrResp,
  MallUserDeleteReq,
  MemberCenterStatsQueryResp,
  MetaTiktokReportSumQueryReq,
  MetaTiktokReportSumQueryResp,
  ModelDetailResp,
  ModelListQueryReq,
  ModelListQueryResp,
  ModelOperateReq,
  ModelProductConnectReq,
  ModelSaveReq,
  ModelSaveResp,
  MSkuRelationListResp,
  MsrpBatchQueryReq,
  MsrpBatchSaveResp,
  MsrpCalculateBaseReq,
  MsrpCalculatePriceDetailSaveReq,
  MsrpCalculatePriceQueryListResp,
  MsrpQueryChannelListResp,
  MsrpQueryListReq,
  MsrpQueryListResp,
  MsrpSaveReq,
  MsrpSaveSkuReq,
  MsrpSaveSkuResp,
  MsrpSaveSpuReq,
  MsrpSaveSpuResp,
  MsrpSkuListQueryReq,
  MsrpSpuDetailReq,
  MultiPriceQueryListReq,
  OfflineListingProductReq,
  OfflineProductListingResp,
  OnlineProductChartReq,
  OnlineProductChartResp,
  OnlineProductMonitorReq,
  OnlineProductMonitorResp,
  OnlineProductQueryReq,
  OnlineProductQueryResp,
  OnlineProductSaveReq,
  OperatorCommonSaveReq,
  OperatorSaveReq,
  PerformanceProductReq,
  ProductAttrListQueryResp,
  ProductBarCodeCancelReq,
  ProductBarCodeQueryReq,
  ProductBarCodeQueryResp,
  ProductBarCodeSaveUpdateReq,
  ProductBatchOperateReq,
  ProductCategoryReq,
  ProductCategoryResp,
  ProductCheckRepeatReq,
  ProductConnectCategoryReq,
  ProductDetailQueryResp,
  ProductGroupDetailResp,
  ProductGroupListResp,
  ProductGroupSaveReq,
  ProductGroupSaveResp,
  ProductGroupSkuDetailResp,
  ProductGroupSkuListResp,
  ProductGroupSkuSaveReq,
  ProductGroupSkuSaveResp,
  ProductInfoResp,
  ProductLineDetailResp,
  ProductLineListQueryReq,
  ProductLineListResp,
  ProductLineSaveReq,
  ProductLinkCommonSaveReq,
  ProductLinkSaveReq,
  ProductListQueryReq,
  ProductListQueryResp,
  ProductOperateReq,
  ProductPerfectionQueryResp,
  ProductPerformanceDetailResp,
  ProductPerformanceResp,
  ProductRelationListResp,
  ProductSaveReq,
  ProductSaveResp,
  ProductSellerSkuQueryResp,
  ProductShadowDetailStaticsSearchReq,
  ProductShadowSearchReq,
  ProductShowDetailSearchReq,
  ProductShowDetailStaticsSearchReq,
  ProductShowSearchReq,
  ProductSkuBatchOpeReq,
  ProductSkuCertificationListReq,
  ProductSkuCertificationListResp,
  ProductSkuDetailResp,
  ProductSkuInfoResp,
  ProductSkuListQueryReq,
  ProductSkuListQueryResp,
  ProductSkuMappingClearReq,
  ProductSkuMappingQueryReq,
  ProductSkuMappingUpdateReq,
  ProductSkuNotifyReq,
  ProductSkuOldNewListQueryReq,
  ProductSkuOldNewMappingResp,
  ProductSkuOldNewSaveOrUpdReq,
  ProductSkuOperateReq,
  ProductSkuPerfectionQueryResp,
  ProductSkuSaveReq,
  ProductSkuSaveResp,
  PromotionPlanApplyListResp,
  PromotionPlanCreateReq,
  PromotionPlanListQueryReq,
  PromotionPlanListQuerySkuResp,
  PromotionPlanListQuerySpuResp,
  PromotionPlanReviewListReq,
  PromotionPlanReviewReq,
  PurchaseOperatorQueryResp,
  PurchaseOrderQueryResp,
  SaleSkuDetailQueryResp,
  SaleSkuLogDetailQueryResp,
  SaleSkuQueryReq,
  SaleSkuQueryResp,
  SaleSkuRelationMissQueryReq,
  SaleSkuRelationMissQueryResp,
  SaleSkuSaveReq,
  SaleSkuSaveResp,
  SaleSkuSourcelQueryResp,
  SensitiveTypeDetailResp,
  SensitiveTypeListQueryReq,
  SensitiveTypeListQueryResp,
  SensitiveTypeOperateReq,
  SensitiveTypeProductConnectReq,
  SensitiveTypeSaveReq,
  SensitiveTypeSaveResp,
  SeriesDetailResp,
  SeriesListQueryReq,
  SeriesListQueryResp,
  SeriesOperateReq,
  SeriesProductConnectReq,
  SeriesSaveReq,
  SeriesSaveResp,
  ShopifyBatchOperatorSaveReq,
  ShopifyListingParentResp,
  ShopifyListingReq,
  ShopifyOperatorSaveReq,
  ShopifyProductListingReq,
  ShopifyProductListingResp,
  ShopifySonListingResp,
  ShopUserAccountListResp,
  ShopUserAccountResp,
  SkuActiveDiscountPlanAddReq,
  SkuActiveDiscountPlanQueryResp,
  SkuSnQueryReq,
  SkuSnQueryResp,
  SkuSnSaveReq,
  SmaSkuQueryListReq,
  SmaSkuQueryListResp,
  SupplierSkuListQueryResp,
  SupplyPurchaserResp,
  SupplySkuCommonResp,
  SupplySkuDetailResp,
  SupplySkuListQueryReq,
  SupplySkuListQueryResp,
  SupplySkuOperateReq,
  SupplySkuPerfectionQueryResp,
  SupplySkuQueryResp,
  SupplySkuSaveReq,
  SupplySkuSpecResp,
  TagDetailResp,
  TagListQueryReq,
  TagListQueryResp,
  TagOperateReq,
  TagProductConnectReq,
  TagProductResp,
  TagSaveReq,
  TagSaveResp,
  TiktokAdsPlatformSkuQueryResp,
  TiktokAdsQueryReq,
  TiktokAdsQueryResp,
  TiktokAdsSkuSaveReq,
  TiktokAdsSkuSaveResp,
  TiktokAffiliateAccountsSpuQueryReq,
  TiktokAffiliateAccountsSpuQueryResp,
  TikTokListingProductReq,
  TikTokProductListingResp,
  TiktokWeekReportQueryReq,
  TiktokWeekReportQueryResp,
  UpdateCategoryReq,
  UpdateCategoryResp,
  WalmartListingProductReq,
  WalmartListingReq,
  WalmartListingResp,
  WalmartProductListingResp,
  WeekApproveLogResp,
  WorkflowSubmitResp,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags 亚马逊-在线商品
   * @name LuteosProductAmazonListingBatchModifyPlan
   * @summary 亚马逊-在线商父ASIN批量添加/更新计划人员
   * @request POST:/api/luteos/product/amazon/listing/batchModifyPlan
   * @deprecated
   * @response `200` `CommonRespObject` OK
   */
  luteosProductAmazonListingBatchModifyPlan = (
    req: ListingBatchModifyPlanReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/product/amazon/listing/batchModifyPlan`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 亚马逊-在线商品
   * @name LuteosProductAmazonListingBatchUpdateOperator
   * @summary 在线商品新增/更新运营人员
   * @request POST:/api/luteos/product/amazon/listing/batchUpdateOperator
   * @response `200` `CommonRespObject` OK
   */
  luteosProductAmazonListingBatchUpdateOperator = (
    req: BatchOperatorReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/product/amazon/listing/batchUpdateOperator`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 亚马逊-在线商品
   * @name LuteosProductAmazonListingDownload
   * @summary 亚马逊父子维度导出-V2
   * @request POST:/api/luteos/product/amazon/listing/download
   * @response `200` `CommonExportResp` OK
   */
  luteosProductAmazonListingDownload = (req: AmazonProductListingReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/product/amazon/listing/download`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 亚马逊-在线商品
   * @name LuteosProductAmazonListingListingDownload
   * @summary 亚马逊父子维度导出
   * @request POST:/api/luteos/product/amazon/listing/listing/download
   * @deprecated
   * @response `200` `CommonExportResp` OK
   */
  luteosProductAmazonListingListingDownload = (req: AmazonListingReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/product/amazon/listing/listing/download`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 亚马逊-在线商品
   * @name LuteosProductAmazonListingListingQueryTag
   * @summary 亚马逊在线商品父维度标签查询
   * @request POST:/api/luteos/product/amazon/listing/listing/queryTag
   * @deprecated
   * @response `200` `ListingTagResp` OK
   */
  luteosProductAmazonListingListingQueryTag = (
    req: ListingQueryTagReq,
    params: RequestParams = {},
  ) =>
    this.request<ListingTagResp, any>({
      path: `/api/luteos/product/amazon/listing/listing/queryTag`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 亚马逊-在线商品
   * @name LuteosProductAmazonListingListingUpdateTag
   * @summary 亚马逊在线商品父维度标签保存更新
   * @request POST:/api/luteos/product/amazon/listing/listing/updateTag
   * @deprecated
   * @response `200` `CommonRespObject` OK
   */
  luteosProductAmazonListingListingUpdateTag = (
    req: ListingBatchModifyTagReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/product/amazon/listing/listing/updateTag`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 亚马逊-在线商品
   * @name LuteosProductAmazonListingListingUpdateTagV2
   * @summary 在线商品标签保存更新
   * @request POST:/api/luteos/product/amazon/listing/listing/updateTagV2
   * @response `200` `CommonRespObject` OK
   */
  luteosProductAmazonListingListingUpdateTagV2 = (
    req: ListingBatchModifyTagV2Req,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/product/amazon/listing/listing/updateTagV2`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 亚马逊-在线商品
   * @name LuteosProductAmazonListingQueryAsinPage
   * @summary 亚马逊-在线商品分页查询-V2
   * @request POST:/api/luteos/product/amazon/listing/queryAsinPage
   * @response `200` `AmazonProductListingResp` OK
   */
  luteosProductAmazonListingQueryAsinPage = (
    req: AmazonProductListingReq,
    params: RequestParams = {},
  ) =>
    this.request<AmazonProductListingResp, any>({
      path: `/api/luteos/product/amazon/listing/queryAsinPage`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 亚马逊-在线商品
   * @name LuteosProductAmazonListingQueryParentAsinPage
   * @summary 亚马逊-在线商品父ASIN分页查询
   * @request POST:/api/luteos/product/amazon/listing/queryParentAsinPage
   * @deprecated
   * @response `200` `AmazonListingParentResp` OK
   */
  luteosProductAmazonListingQueryParentAsinPage = (
    req: AmazonListingReq,
    params: RequestParams = {},
  ) =>
    this.request<AmazonListingParentResp, any>({
      path: `/api/luteos/product/amazon/listing/queryParentAsinPage`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 亚马逊-在线商品
   * @name LuteosProductAmazonListingQueryParentSonPage
   * @summary 亚马逊-在线商品子ASIN分页查询
   * @request POST:/api/luteos/product/amazon/listing/queryParentSonPage
   * @deprecated
   * @response `200` `AmazonListingResp` OK
   */
  luteosProductAmazonListingQueryParentSonPage = (
    req: AmazonListingReq,
    params: RequestParams = {},
  ) =>
    this.request<AmazonListingResp, any>({
      path: `/api/luteos/product/amazon/listing/queryParentSonPage`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 亚马逊-在线商品
   * @name LuteosProductAmazonListingQueryTagV2
   * @summary 在线商品标签查询
   * @request POST:/api/luteos/product/amazon/listing/queryTagV2
   * @response `200` `ListingTagResp` OK
   */
  luteosProductAmazonListingQueryTagV2 = (req: ListingQueryTagV2Req, params: RequestParams = {}) =>
    this.request<ListingTagResp, any>({
      path: `/api/luteos/product/amazon/listing/queryTagV2`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 亚马逊-在线商品
   * @name LuteosProductAmazonListingSaveOperatorV2
   * @summary 在线商品保存运营人员
   * @request POST:/api/luteos/product/amazon/listing/saveOperatorV2
   * @response `200` `CommonRespObject` OK
   */
  luteosProductAmazonListingSaveOperatorV2 = (
    req: OperatorCommonSaveReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/product/amazon/listing/saveOperatorV2`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 亚马逊-在线商品
   * @name LuteosProductAmazonListingSaveProductLinkV2
   * @summary 在线商品保存商品链接
   * @request POST:/api/luteos/product/amazon/listing/saveProductLinkV2
   * @response `200` `CommonRespObject` OK
   */
  luteosProductAmazonListingSaveProductLinkV2 = (
    req: ProductLinkCommonSaveReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/product/amazon/listing/saveProductLinkV2`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 亚马逊运营人员稽查
   * @name LuteosProductAmazonOperatorCheckDownload
   * @summary 导出
   * @request POST:/api/luteos/product/amazon/operatorCheck/download
   * @response `200` `CommonExportResp` OK
   */
  luteosProductAmazonOperatorCheckDownload = (
    req: AmazonProductOperatorCheckReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/product/amazon/operatorCheck/download`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 亚马逊运营人员稽查
   * @name LuteosProductAmazonOperatorCheckQueryDetail
   * @summary 详情查询
   * @request POST:/api/luteos/product/amazon/operatorCheck/queryDetail
   * @response `200` `CommonRespListAmazonOperatorCheckDetailBean` OK
   */
  luteosProductAmazonOperatorCheckQueryDetail = (
    req: AmazonProductOperatorCheckDetailReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespListAmazonOperatorCheckDetailBean, any>({
      path: `/api/luteos/product/amazon/operatorCheck/queryDetail`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 亚马逊运营人员稽查
   * @name LuteosProductAmazonOperatorCheckQueryList
   * @summary 列表查询
   * @request POST:/api/luteos/product/amazon/operatorCheck/queryList
   * @response `200` `AmazonProductOperatorListResp` OK
   */
  luteosProductAmazonOperatorCheckQueryList = (
    req: AmazonProductOperatorCheckReq,
    params: RequestParams = {},
  ) =>
    this.request<AmazonProductOperatorListResp, any>({
      path: `/api/luteos/product/amazon/operatorCheck/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 亚马逊运营人员稽查
   * @name LuteosProductAmazonOperatorCheckQuerySpuGtmList
   * @summary 查询GTM小组列表
   * @request GET:/api/luteos/product/amazon/operatorCheck/querySpuGtmList
   * @response `200` `CommonRespListString` OK
   */
  luteosProductAmazonOperatorCheckQuerySpuGtmList = (params: RequestParams = {}) =>
    this.request<CommonRespListString, any>({
      path: `/api/luteos/product/amazon/operatorCheck/querySpuGtmList`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 属性管理
   * @name LuteosProductAttrConnectCategory
   * @summary 属性关联分类
   * @request POST:/api/luteos/product/attr/connectCategory
   * @response `200` `CommonRespBoolean` OK
   */
  luteosProductAttrConnectCategory = (req: AttrCategoryConnectReq, params: RequestParams = {}) =>
    this.request<CommonRespBoolean, any>({
      path: `/api/luteos/product/attr/connectCategory`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 属性管理
   * @name LuteosProductAttrExportAttr
   * @summary 属性信息导出
   * @request POST:/api/luteos/product/attr/exportAttr
   * @response `200` `CommonExportResp` OK
   */
  luteosProductAttrExportAttr = (req: AttrListQueryReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/product/attr/exportAttr`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 属性管理
   * @name LuteosProductAttrOperateAttr
   * @summary 属性操作
   * @request POST:/api/luteos/product/attr/operateAttr
   * @response `200` `CommonRespBoolean` OK
   */
  luteosProductAttrOperateAttr = (req: AttrOperateReq, params: RequestParams = {}) =>
    this.request<CommonRespBoolean, any>({
      path: `/api/luteos/product/attr/operateAttr`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 属性管理
   * @name LuteosProductAttrQueryAttrDetail
   * @summary 属性详情查询
   * @request GET:/api/luteos/product/attr/queryAttrDetail
   * @response `200` `AttrDetailResp` OK
   */
  luteosProductAttrQueryAttrDetail = (
    query: {
      /** 属性编码,必填 */
      attrCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<AttrDetailResp, any>({
      path: `/api/luteos/product/attr/queryAttrDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 属性管理
   * @name LuteosProductAttrQueryAttrList
   * @summary 属性列表查询
   * @request GET:/api/luteos/product/attr/queryAttrList
   * @response `200` `AttrListQueryResp` OK
   */
  luteosProductAttrQueryAttrList = (
    query: {
      /** 属性Id */
      attrCode?: string;
      /** 属性名称 */
      attrName?: string;
      /** 属性值名称 */
      attrValueName?: string;
      /** 勾选导出的编码 */
      codeList?: string[];
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
    this.request<AttrListQueryResp, any>({
      path: `/api/luteos/product/attr/queryAttrList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 属性管理
   * @name LuteosProductAttrQueryCategoryLevelList
   * @summary 分类列表查询
   * @request GET:/api/luteos/product/attr/queryCategoryLevelList
   * @response `200` `CategoryLevelQueryInAttrResp` OK
   */
  luteosProductAttrQueryCategoryLevelList = (
    query: {
      /** 分类id */
      categoryCode?: string;
      /** 分类名称 */
      categoryName?: string;
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
      /** 分类等级编码 */
      parentCategoryCode?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CategoryLevelQueryInAttrResp, any>({
      path: `/api/luteos/product/attr/queryCategoryLevelList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品管理, 属性管理
   * @name LuteosProductAttrQueryProductAttrList
   * @summary 商品属性列表查询
   * @request GET:/api/luteos/product/attr/queryProductAttrList
   * @response `200` `ProductAttrListQueryResp` OK
   */
  luteosProductAttrQueryProductAttrList = (
    query?: {
      /** 五级分类编码 */
      categoryCode?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<ProductAttrListQueryResp, any>({
      path: `/api/luteos/product/attr/queryProductAttrList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 属性管理
   * @name LuteosProductAttrSaveOrUpdateAttr
   * @summary 属性信息保存
   * @request POST:/api/luteos/product/attr/saveOrUpdateAttr
   * @response `200` `AttrSaveResp` OK
   */
  luteosProductAttrSaveOrUpdateAttr = (req: AttrSaveReq, params: RequestParams = {}) =>
    this.request<AttrSaveResp, any>({
      path: `/api/luteos/product/attr/saveOrUpdateAttr`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 属性管理
   * @name LuteosProductAttrSaveOrUpdateAttrVal
   * @summary 属性值信息保存
   * @request POST:/api/luteos/product/attr/saveOrUpdateAttrVal
   * @response `200` `AttrValSaveResp` OK
   */
  luteosProductAttrSaveOrUpdateAttrVal = (req: AttrValSaveReq, params: RequestParams = {}) =>
    this.request<AttrValSaveResp, any>({
      path: `/api/luteos/product/attr/saveOrUpdateAttrVal`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags B2C-在线商品
   * @name LuteosProductB2CListingQueryChannelList
   * @summary b2c-渠道列表
   * @request GET:/api/luteos/product/b2c/listing/queryChannelList
   * @response `200` `B2CChannelResp` OK
   */
  luteosProductB2CListingQueryChannelList = (params: RequestParams = {}) =>
    this.request<B2CChannelResp, any>({
      path: `/api/luteos/product/b2c/listing/queryChannelList`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags B2C-在线商品
   * @name LuteosProductB2CListingQueryProductListingPage
   * @summary b2c-在线商品分页查询-V2
   * @request POST:/api/luteos/product/b2c/listing/queryProductListingPage
   * @response `200` `B2CProductListingResp` OK
   */
  luteosProductB2CListingQueryProductListingPage = (
    req: B2CListingProductReq,
    params: RequestParams = {},
  ) =>
    this.request<B2CProductListingResp, any>({
      path: `/api/luteos/product/b2c/listing/queryProductListingPage`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 产品条形码
   * @name LuteosProductBarcodeCancel
   * @summary 产品条形码取消
   * @request POST:/api/luteos/product/barcode/cancel
   * @response `200` `CommonRespObject` OK
   */
  luteosProductBarcodeCancel = (req: ProductBarCodeCancelReq, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/product/barcode/cancel`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 产品条形码, 红人管理
   * @name LuteosProductBarcodeDownLoadBarCodeTemplate
   * @summary 下载导入条形码模板
   * @request POST:/api/luteos/product/barcode/downLoadBarCodeTemplate
   * @response `200` `CommonRespString` OK
   */
  luteosProductBarcodeDownLoadBarCodeTemplate = (params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/product/barcode/downLoadBarCodeTemplate`,
      method: 'POST',
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 产品条形码
   * @name LuteosProductBarcodeExport
   * @summary 产品条形码导出信息
   * @request POST:/api/luteos/product/barcode/export
   * @response `200` `CommonExportResp` OK
   */
  luteosProductBarcodeExport = (req: ProductBarCodeQueryReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/product/barcode/export`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 产品条形码
   * @name LuteosProductBarcodeQueryList
   * @summary 产品条形码查询
   * @request POST:/api/luteos/product/barcode/queryList
   * @response `200` `ProductBarCodeQueryResp` OK
   */
  luteosProductBarcodeQueryList = (req: ProductBarCodeQueryReq, params: RequestParams = {}) =>
    this.request<ProductBarCodeQueryResp, any>({
      path: `/api/luteos/product/barcode/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 产品条形码
   * @name LuteosProductBarcodeSaveOrUpdate
   * @summary 商品条形码保存
   * @request POST:/api/luteos/product/barcode/saveOrUpdate
   * @response `200` `CommonRespObject` OK
   */
  luteosProductBarcodeSaveOrUpdate = (
    req: ProductBarCodeSaveUpdateReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/product/barcode/saveOrUpdate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品管理
   * @name LuteosProductBatchOperateProduct
   * @summary 商品信息批量操作
   * @request POST:/api/luteos/product/batchOperateProduct
   * @response `200` `CommonRespBoolean` OK
   */
  luteosProductBatchOperateProduct = (req: ProductBatchOperateReq, params: RequestParams = {}) =>
    this.request<CommonRespBoolean, any>({
      path: `/api/luteos/product/batchOperateProduct`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 品牌管理
   * @name LuteosProductBrandConnectProduct
   * @summary 品牌关联商品
   * @request POST:/api/luteos/product/brand/connectProduct
   * @response `200` `CommonRespString` OK
   */
  luteosProductBrandConnectProduct = (req: BrandProductConnectReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/product/brand/connectProduct`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 品牌管理
   * @name LuteosProductBrandExportBrand
   * @summary 品牌信息导出
   * @request POST:/api/luteos/product/brand/exportBrand
   * @response `200` `CommonExportResp` OK
   */
  luteosProductBrandExportBrand = (req: BrandListQueryReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/product/brand/exportBrand`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 品牌管理
   * @name LuteosProductBrandOperateBrand
   * @summary 品牌操作
   * @request POST:/api/luteos/product/brand/operateBrand
   * @response `200` `CommonRespString` OK
   */
  luteosProductBrandOperateBrand = (req: BrandOperateReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/product/brand/operateBrand`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 品牌管理
   * @name LuteosProductBrandQueryBrandAll
   * @summary 获取所有品牌
   * @request GET:/api/luteos/product/brand/queryBrandAll
   * @response `200` `BrandListQueryAllResp` OK
   */
  luteosProductBrandQueryBrandAll = (params: RequestParams = {}) =>
    this.request<BrandListQueryAllResp, any>({
      path: `/api/luteos/product/brand/queryBrandAll`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 品牌管理
   * @name LuteosProductBrandQueryBrandDetail
   * @summary 品牌详情查询
   * @request GET:/api/luteos/product/brand/queryBrandDetail
   * @response `200` `BrandDetailResp` OK
   */
  luteosProductBrandQueryBrandDetail = (
    query: {
      /** 品牌编码 */
      brandCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<BrandDetailResp, any>({
      path: `/api/luteos/product/brand/queryBrandDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 品牌管理
   * @name LuteosProductBrandQueryBrandList
   * @summary 品牌列表查询
   * @request GET:/api/luteos/product/brand/queryBrandList
   * @response `200` `BrandListQueryResp` OK
   */
  luteosProductBrandQueryBrandList = (
    query: {
      /** 品牌编号 */
      brandCode?: string;
      /** 品牌名称 */
      brandName?: string;
      /** 英文名称 */
      brandNameEn?: string;
      /** 勾选导出的编码 */
      codeList?: string[];
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
    this.request<BrandListQueryResp, any>({
      path: `/api/luteos/product/brand/queryBrandList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 品牌管理
   * @name LuteosProductBrandSaveOrUpdateBrand
   * @summary 品牌信息保存
   * @request POST:/api/luteos/product/brand/saveOrUpdateBrand
   * @response `200` `BrandSaveResp` OK
   */
  luteosProductBrandSaveOrUpdateBrand = (req: BrandSaveReq, params: RequestParams = {}) =>
    this.request<BrandSaveResp, any>({
      path: `/api/luteos/product/brand/saveOrUpdateBrand`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品分类管理
   * @name LuteosProductCategoryConnectAttr
   * @summary 分类关联属性
   * @request POST:/api/luteos/product/category/connectAttr
   * @response `200` `CommonRespBoolean` OK
   */
  luteosProductCategoryConnectAttr = (req: CategoryAttrConnectReq, params: RequestParams = {}) =>
    this.request<CommonRespBoolean, any>({
      path: `/api/luteos/product/category/connectAttr`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品分类管理
   * @name LuteosProductCategoryExportCategory
   * @summary 分类信息导出
   * @request POST:/api/luteos/product/category/exportCategory
   * @response `200` `CommonExportResp` OK
   */
  luteosProductCategoryExportCategory = (req: CategoryListQueryReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/product/category/exportCategory`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品分类管理
   * @name LuteosProductCategoryOperateCategory
   * @summary 分类操作
   * @request POST:/api/luteos/product/category/operateCategory
   * @response `200` `CommonRespBoolean` OK
   */
  luteosProductCategoryOperateCategory = (req: CategoryOperateReq, params: RequestParams = {}) =>
    this.request<CommonRespBoolean, any>({
      path: `/api/luteos/product/category/operateCategory`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品分类管理
   * @name LuteosProductCategoryQueryCategoryDetail
   * @summary 分类详情查询
   * @request GET:/api/luteos/product/category/queryCategoryDetail
   * @response `200` `CategoryDetailResp` OK
   */
  luteosProductCategoryQueryCategoryDetail = (
    query: {
      /** 分类编码 */
      categoryCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CategoryDetailResp, any>({
      path: `/api/luteos/product/category/queryCategoryDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品分类管理
   * @name LuteosProductCategoryQueryCategoryLevelList
   * @summary 分类下级查询
   * @request GET:/api/luteos/product/category/queryCategoryLevelList
   * @response `200` `CategoryLevelQueryResp` OK
   */
  luteosProductCategoryQueryCategoryLevelList = (
    query: {
      /** 分类编码 */
      categoryCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CategoryLevelQueryResp, any>({
      path: `/api/luteos/product/category/queryCategoryLevelList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品分类管理
   * @name LuteosProductCategoryQueryCategoryList
   * @summary 分类列表查询
   * @request GET:/api/luteos/product/category/queryCategoryList
   * @response `200` `CategoryListQueryResp` OK
   */
  luteosProductCategoryQueryCategoryList = (
    query: {
      /** 分类id */
      categoryCode?: string;
      /** 分类名称 */
      categoryName?: string;
      /** 勾选导出的编码 */
      codeList?: string[];
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
      /**
       * 状态
       * @format int32
       */
      status?: number;
      /** 标签编码 */
      tagCode?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CategoryListQueryResp, any>({
      path: `/api/luteos/product/category/queryCategoryList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品分类管理
   * @name LuteosProductCategoryQueryCategoryListByParam
   * @summary 查询分类列表-不含层级
   * @request GET:/api/luteos/product/category/queryCategoryListByParam
   * @response `200` `CategoryListQueryResp` OK
   */
  luteosProductCategoryQueryCategoryListByParam = (
    query: {
      /** 分类编码 */
      categoryCode?: string;
      /** 分类名称 */
      categoryName?: string;
      /**
       * 分类级别, 1-一级分类 2-二级分类 3-三级分类 4-四级分类 5-五级分类
       * @format int32
       */
      level?: number;
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
      /**
       * 状态
       * @format int32
       */
      status?: number;
      /** 标签编码 */
      tagCode?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CategoryListQueryResp, any>({
      path: `/api/luteos/product/category/queryCategoryListByParam`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品分类管理
   * @name LuteosProductCategoryQueryCategoryTopAndLeafLevelList
   * @summary 分类一级/五级查询
   * @request GET:/api/luteos/product/category/queryCategoryTopAndLeafLevelList
   * @response `200` `CategoryLevelQueryResp` OK
   */
  luteosProductCategoryQueryCategoryTopAndLeafLevelList = (
    query: {
      /** 分类编码 */
      categoryCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CategoryLevelQueryResp, any>({
      path: `/api/luteos/product/category/queryCategoryTopAndLeafLevelList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品分类管理
   * @name LuteosProductCategoryQueryCategoryTree
   * @summary 获取分类树
   * @request GET:/api/luteos/product/category/queryCategoryTree
   * @response `200` `CategoryTreeResp` OK
   */
  luteosProductCategoryQueryCategoryTree = (
    query?: {
      /** 分类编码, 不传则查询整棵分类树 */
      categoryCode?: string;
      /** 分类名称 */
      categoryName?: string;
      /**
       * 是否过滤掉未包含五级节点的分类 0-不过滤 1-过滤
       * @format int32
       */
      filterFlag?: number;
      /**
       * 过滤分类级别, 1-一级分类 2-二级分类 3-三级分类 4-四级分类 5-五级分类
       * @format int32
       */
      filterLevel?: number;
      /**
       * 分类级别, 1-一级分类 2-二级分类 3-三级分类 4-四级分类 5-五级分类
       * @format int32
       */
      level?: number;
      /** 标签编码 */
      tagCode?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CategoryTreeResp, any>({
      path: `/api/luteos/product/category/queryCategoryTree`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品分类管理
   * @name LuteosProductCategoryQuerySubCategoryList
   * @summary 下级分类列表查询
   * @request GET:/api/luteos/product/category/querySubCategoryList
   * @response `200` `CategoryListQueryResp` OK
   */
  luteosProductCategoryQuerySubCategoryList = (
    query: {
      /** 分类编码 */
      categoryCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CategoryListQueryResp, any>({
      path: `/api/luteos/product/category/querySubCategoryList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品分类管理
   * @name LuteosProductCategorySaveOrUpdateCategory
   * @summary 分类信息保存
   * @request POST:/api/luteos/product/category/saveOrUpdateCategory
   * @response `200` `CategorySaveResp` OK
   */
  luteosProductCategorySaveOrUpdateCategory = (req: CategorySaveReq, params: RequestParams = {}) =>
    this.request<CategorySaveResp, any>({
      path: `/api/luteos/product/category/saveOrUpdateCategory`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品管理
   * @name LuteosProductCheckRepeatProduct
   * @summary 商品编码重复校验
   * @request POST:/api/luteos/product/checkRepeatProduct
   * @response `200` `CommonRespBoolean` OK
   */
  luteosProductCheckRepeatProduct = (req: ProductCheckRepeatReq, params: RequestParams = {}) =>
    this.request<CommonRespBoolean, any>({
      path: `/api/luteos/product/checkRepeatProduct`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 在线商品标签
   * @name LuteosProductCommonListingListingUpdateTag
   * @summary 在线商品标签保存更新
   * @request POST:/api/luteos/product/common/listing/listing/updateTag
   * @response `200` `CommonRespObject` OK
   */
  luteosProductCommonListingListingUpdateTag = (
    req: ListingBatchModifyTagV2Req,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/product/common/listing/listing/updateTag`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 在线商品标签
   * @name LuteosProductCommonListingQueryTag
   * @summary 在线商品标签查询
   * @request POST:/api/luteos/product/common/listing/queryTag
   * @response `200` `ListingTagResp` OK
   */
  luteosProductCommonListingQueryTag = (req: ListingQueryTagV2Req, params: RequestParams = {}) =>
    this.request<ListingTagResp, any>({
      path: `/api/luteos/product/common/listing/queryTag`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 在线商品标签
   * @name LuteosProductCommonListingSaveOperator
   * @summary 在线商品保存运营人员
   * @request POST:/api/luteos/product/common/listing/saveOperator
   * @response `200` `CommonRespObject` OK
   */
  luteosProductCommonListingSaveOperator = (
    req: OperatorCommonSaveReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/product/common/listing/saveOperator`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 在线商品标签
   * @name LuteosProductCommonListingSaveProductLink
   * @summary 在线商品保存商品链接
   * @request POST:/api/luteos/product/common/listing/saveProductLink
   * @response `200` `CommonRespObject` OK
   */
  luteosProductCommonListingSaveProductLink = (
    req: ProductLinkCommonSaveReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/product/common/listing/saveProductLink`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品管理
   * @name LuteosProductConnectCategory
   * @summary 商品关联分类
   * @request POST:/api/luteos/product/connectCategory
   * @response `200` `CommonRespBoolean` OK
   */
  luteosProductConnectCategory = (req: ProductConnectCategoryReq, params: RequestParams = {}) =>
    this.request<CommonRespBoolean, any>({
      path: `/api/luteos/product/connectCategory`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 衍生项目管理
   * @name LuteosProductDeriveDownload
   * @summary 衍生项目列表导出
   * @request GET:/api/luteos/product/derive/download
   * @response `200` `CommonExportResp` OK
   */
  luteosProductDeriveDownload = (
    query: {
      /** 申请原因 */
      applyReason?: string;
      /** 变更领域 */
      changeField?: string;
      /** 国家/地区 */
      country?: string;
      /** 创建人 */
      creator?: string;
      /** GTM负责人 */
      gtmCode?: string;
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
      /** 项目经理 */
      pmCode?: string;
      /** 优先级 */
      priority?: string;
      /** 品线 */
      productLine?: string;
      /** 基准sku */
      standardSku?: string;
      /**
       * 验证项目状态 1-取消 2-进行中 3-已完成
       * @format int32
       */
      status?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/product/derive/download`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 衍生项目管理
   * @name LuteosProductDeriveQueryDeriveList
   * @summary 衍生项目列表查询
   * @request GET:/api/luteos/product/derive/queryDeriveList
   * @response `200` `DeriveQueryResp` OK
   */
  luteosProductDeriveQueryDeriveList = (
    query: {
      /** 申请原因 */
      applyReason?: string;
      /** 变更领域 */
      changeField?: string;
      /** 国家/地区 */
      country?: string;
      /** 创建人 */
      creator?: string;
      /** GTM负责人 */
      gtmCode?: string;
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
      /** 项目经理 */
      pmCode?: string;
      /** 优先级 */
      priority?: string;
      /** 品线 */
      productLine?: string;
      /** 基准sku */
      standardSku?: string;
      /**
       * 验证项目状态 1-取消 2-进行中 3-已完成
       * @format int32
       */
      status?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<DeriveQueryResp, any>({
      path: `/api/luteos/product/derive/queryDeriveList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 衍生项目管理
   * @name LuteosProductDeriveQueryDeriveListParam
   * @summary 衍生项目列表查询参数
   * @request GET:/api/luteos/product/derive/queryDeriveListParam
   * @response `200` `DeriveListParamResp` OK
   */
  luteosProductDeriveQueryDeriveListParam = (params: RequestParams = {}) =>
    this.request<DeriveListParamResp, any>({
      path: `/api/luteos/product/derive/queryDeriveListParam`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 易仓SKU管理
   * @name LuteosProductEccangSkuExportEccangSku
   * @summary 导出供应链SKU
   * @request POST:/api/luteos/product/eccangSku/exportEccangSku
   * @response `200` `CommonExportResp` OK
   */
  luteosProductEccangSkuExportEccangSku = (req: EccangSkuQueryReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/product/eccangSku/exportEccangSku`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 易仓SKU管理
   * @name LuteosProductEccangSkuQueryEccangSkuFullList
   * @summary 供应链SKU列表全字段查询
   * @request GET:/api/luteos/product/eccangSku/queryEccangSkuFullList
   * @response `200` `EccangSkuFullQueryResp` OK
   */
  luteosProductEccangSkuQueryEccangSkuFullList = (
    query: {
      /** 关键字 名称/供应链sku */
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
    },
    params: RequestParams = {},
  ) =>
    this.request<EccangSkuFullQueryResp, any>({
      path: `/api/luteos/product/eccangSku/queryEccangSkuFullList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 易仓SKU管理
   * @name LuteosProductEccangSkuQueryEccangSkuList
   * @summary 供应链SKU列表查询
   * @request GET:/api/luteos/product/eccangSku/queryEccangSkuList
   * @response `200` `EccangSkuQueryResp` OK
   */
  luteosProductEccangSkuQueryEccangSkuList = (
    query: {
      /**
       * 导出类型 1:导出界面信息，2：导出销售映射全表
       * @format int32
       */
      exportType?: number;
      /** 是否过滤物料 */
      filterProductMateriel?: boolean;
      /** 关键字 */
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
      /** 供应链SKU集合（同步易仓使用） */
      productSkuList?: string[];
      /** SKU编码/供应链SKU */
      skuCode?: string;
      /** 产品sku状态 1:待上架 2:在销售 3:清仓中 4:已退市 0:已取消 */
      skuStateList?: number[];
      /** 供应商 */
      supplierName?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<EccangSkuQueryResp, any>({
      path: `/api/luteos/product/eccangSku/queryEccangSkuList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 易仓SKU管理
   * @name LuteosProductEccangSkuSyncEccang
   * @summary 同步易仓
   * @request POST:/api/luteos/product/eccangSku/syncEccang
   * @response `200` `CommonRespObject` OK
   */
  luteosProductEccangSkuSyncEccang = (req: EccangSkuQueryReq, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/product/eccangSku/syncEccang`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 易仓SKU管理
   * @name LuteosProductEccangSkuV2ExportEccangSku
   * @summary 导出供应链SKU-v2
   * @request POST:/api/luteos/product/eccangSku/v2/exportEccangSku
   * @response `200` `CommonExportResp` OK
   */
  luteosProductEccangSkuV2ExportEccangSku = (req: EccangSkuQueryReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/product/eccangSku/v2/exportEccangSku`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 易仓SKU管理
   * @name LuteosProductEccangSkuV2QueryEccangSkuList
   * @summary 供应链SKU列表查询-v2
   * @request GET:/api/luteos/product/eccangSku/v2/queryEccangSkuList
   * @response `200` `EccangSkuQueryV2Resp` OK
   */
  luteosProductEccangSkuV2QueryEccangSkuList = (
    query: {
      /**
       * 导出类型 1:导出界面信息，2：导出销售映射全表
       * @format int32
       */
      exportType?: number;
      /** 是否过滤物料 */
      filterProductMateriel?: boolean;
      /** 关键字 */
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
      /** 供应链SKU集合（同步易仓使用） */
      productSkuList?: string[];
      /** SKU编码/供应链SKU */
      skuCode?: string;
      /** 产品sku状态 1:待上架 2:在销售 3:清仓中 4:已退市 0:已取消 */
      skuStateList?: number[];
      /** 供应商 */
      supplierName?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<EccangSkuQueryV2Resp, any>({
      path: `/api/luteos/product/eccangSku/v2/queryEccangSkuList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品到期推荐策略管理
   * @name LuteosProductExpireConfigInfo
   * @summary 获取商品到期配置详情
   * @request GET:/api/luteos/product/expire-config/info
   * @response `200` `void` OK
   */
  luteosProductExpireConfigInfo = (
    query?: {
      /** recordCode */
      recordCode?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/luteos/product/expire-config/info`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品到期推荐策略管理
   * @name LuteosProductExpireConfigList
   * @summary 获取商品到期配置列表
   * @request GET:/api/luteos/product/expire-config/list
   * @response `200` `void` OK
   */
  luteosProductExpireConfigList = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/luteos/product/expire-config/list`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品到期推荐策略管理
   * @name LuteosProductExpireConfigSave
   * @summary 新增商品到期配置
   * @request POST:/api/luteos/product/expire-config/save
   * @response `200` `void` OK
   */
  luteosProductExpireConfigSave = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/luteos/product/expire-config/save`,
      method: 'POST',
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品到期推荐策略管理
   * @name LuteosProductExpireConfigUpdate
   * @summary 更新商品到期配置
   * @request POST:/api/luteos/product/expire-config/update
   * @response `200` `void` OK
   */
  luteosProductExpireConfigUpdate = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/luteos/product/expire-config/update`,
      method: 'POST',
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品管理
   * @name LuteosProductExportProduct
   * @summary 商品导出信息
   * @request POST:/api/luteos/product/exportProduct
   * @response `200` `CommonExportResp` OK
   */
  luteosProductExportProduct = (req: ProductListQueryReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/product/exportProduct`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 组合产品管理
   * @name LuteosProductGroupQueryGroupDetail
   * @summary 组合产品详情查询
   * @request GET:/api/luteos/product/group/queryGroupDetail
   * @response `200` `ProductGroupDetailResp` OK
   */
  luteosProductGroupQueryGroupDetail = (
    query: {
      /** 组合产品SPU */
      groupProductSpu: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<ProductGroupDetailResp, any>({
      path: `/api/luteos/product/group/queryGroupDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 组合产品管理
   * @name LuteosProductGroupQueryProductGroupList
   * @summary 组合产品列表查询
   * @request GET:/api/luteos/product/group/queryProductGroupList
   * @response `200` `ProductGroupListResp` OK
   */
  luteosProductGroupQueryProductGroupList = (
    query: {
      /** 分类编码，如果传分类编码，分类等级一定要赋值 */
      categoryCode?: string;
      /** 产品经理 */
      developLuteId?: string;
      /** 商品名称/spu */
      keyWord?: string;
      /**
       * 分类等级，如果传分类编码，分类等级一定要赋值
       * @format int32
       * @min 1
       * @exclusiveMin false
       * @max 5
       * @exclusiveMax false
       */
      level?: number;
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
    this.request<ProductGroupListResp, any>({
      path: `/api/luteos/product/group/queryProductGroupList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 组合产品管理
   * @name LuteosProductGroupSaveProductGroup
   * @summary 组合产品信息保存
   * @request POST:/api/luteos/product/group/saveProductGroup
   * @response `200` `ProductGroupSaveResp` OK
   */
  luteosProductGroupSaveProductGroup = (req: ProductGroupSaveReq, params: RequestParams = {}) =>
    this.request<ProductGroupSaveResp, any>({
      path: `/api/luteos/product/group/saveProductGroup`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 组合SKU管理
   * @name LuteosProductGroupSkuQueryGroupSkuDetail
   * @summary 组合SKU详情查询
   * @request GET:/api/luteos/product/group/sku/queryGroupSkuDetail
   * @response `200` `ProductGroupSkuDetailResp` OK
   */
  luteosProductGroupSkuQueryGroupSkuDetail = (
    query: {
      /** 组合SKU编码 */
      groupSkuCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<ProductGroupSkuDetailResp, any>({
      path: `/api/luteos/product/group/sku/queryGroupSkuDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 组合SKU管理
   * @name LuteosProductGroupSkuQueryProductGroupSkuList
   * @summary 组合SKU列表查询
   * @request GET:/api/luteos/product/group/sku/queryProductGroupSkuList
   * @response `200` `ProductGroupSkuListResp` OK
   */
  luteosProductGroupSkuQueryProductGroupSkuList = (
    query: {
      /** 分类编码，如果传分类编码，分类等级一定要赋值 */
      categoryCode?: string;
      /** 产品经理 */
      developLuteId?: string;
      /** 商品名称/SKU/SPU */
      keyWord?: string;
      /**
       * 分类等级，如果传分类编码，分类等级一定要赋值
       * @format int32
       * @min 1
       * @exclusiveMin false
       * @max 5
       * @exclusiveMax false
       */
      level?: number;
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
    this.request<ProductGroupSkuListResp, any>({
      path: `/api/luteos/product/group/sku/queryProductGroupSkuList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 组合SKU管理
   * @name LuteosProductGroupSkuSaveProductGroupSku
   * @summary 组合SKU信息保存
   * @request POST:/api/luteos/product/group/sku/saveProductGroupSku
   * @response `200` `ProductGroupSkuSaveResp` OK
   */
  luteosProductGroupSkuSaveProductGroupSku = (
    req: ProductGroupSkuSaveReq,
    params: RequestParams = {},
  ) =>
    this.request<ProductGroupSkuSaveResp, any>({
      path: `/api/luteos/product/group/sku/saveProductGroupSku`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 产品品线管理
   * @name LuteosProductLineQueryDetail
   * @summary 查询详情
   * @request GET:/api/luteos/product/line/queryDetail
   * @response `200` `ProductLineDetailResp` OK
   */
  luteosProductLineQueryDetail = (
    query: {
      /** code */
      code: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<ProductLineDetailResp, any>({
      path: `/api/luteos/product/line/queryDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 产品品线管理
   * @name LuteosProductLineQueryList
   * @summary 列表查询
   * @request POST:/api/luteos/product/line/queryList
   * @response `200` `ProductLineListResp` OK
   */
  luteosProductLineQueryList = (req: ProductLineListQueryReq, params: RequestParams = {}) =>
    this.request<ProductLineListResp, any>({
      path: `/api/luteos/product/line/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 产品品线管理
   * @name LuteosProductLineSaveOrUpdate
   * @summary 新增或者编辑品线
   * @request POST:/api/luteos/product/line/saveOrUpdate
   * @response `200` `CommonRespListProductLineSaveResp` OK
   */
  luteosProductLineSaveOrUpdate = (req: ProductLineSaveReq, params: RequestParams = {}) =>
    this.request<CommonRespListProductLineSaveResp, any>({
      path: `/api/luteos/product/line/saveOrUpdate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags MAC地址管理
   * @name LuteosProductMacBatchOperateMacAddr
   * @summary 批量操作MAC地址
   * @request POST:/api/luteos/product/mac/batchOperateMacAddr
   * @response `200` `CommonRespVoid` OK
   */
  luteosProductMacBatchOperateMacAddr = (req: MacAddrOperateReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/product/mac/batchOperateMacAddr`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags MAC地址管理
   * @name LuteosProductMacCheckRelSupplySku
   * @summary 关联供应链产品sku校验
   * @request POST:/api/luteos/product/mac/checkRelSupplySku
   * @response `200` `CommonRespVoid` OK
   */
  luteosProductMacCheckRelSupplySku = (req: MacRelSupplyCheckReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/product/mac/checkRelSupplySku`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags MAC地址管理
   * @name LuteosProductMacExportMacAddr
   * @summary MAC地址导出
   * @request POST:/api/luteos/product/mac/exportMacAddr
   * @response `200` `CommonExportResp` OK
   */
  luteosProductMacExportMacAddr = (req: MacAddrQueryReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/product/mac/exportMacAddr`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags MAC地址管理
   * @name LuteosProductMacOperate
   * @summary 贴片工厂操作
   * @request POST:/api/luteos/product/mac/operate
   * @response `200` `MacFactoryOperateResp` OK
   */
  luteosProductMacOperate = (req: MacFactoryOperateReq, params: RequestParams = {}) =>
    this.request<MacFactoryOperateResp, any>({
      path: `/api/luteos/product/mac/operate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags MAC地址管理
   * @name LuteosProductMacOperateProductCode
   * @summary 产品代码操作
   * @request POST:/api/luteos/product/mac/operateProductCode
   * @response `200` `MacProductCodeOperateResp` OK
   */
  luteosProductMacOperateProductCode = (
    req: MacProductCodeOperateReq,
    params: RequestParams = {},
  ) =>
    this.request<MacProductCodeOperateResp, any>({
      path: `/api/luteos/product/mac/operateProductCode`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags MAC地址管理
   * @name LuteosProductMacQueryDetail
   * @summary 贴片工厂详情查询
   * @request GET:/api/luteos/product/mac/queryDetail
   * @response `200` `MacFactoryDetailResp` OK
   */
  luteosProductMacQueryDetail = (
    query: {
      /** 工厂编码 */
      factoryCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<MacFactoryDetailResp, any>({
      path: `/api/luteos/product/mac/queryDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags MAC地址管理
   * @name LuteosProductMacQueryList
   * @summary 贴片工厂列表查询
   * @request GET:/api/luteos/product/mac/queryList
   * @response `200` `MacFactoryQueryResp` OK
   */
  luteosProductMacQueryList = (
    query: {
      /** 供应商名称/工厂名称/工厂代码 */
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
    },
    params: RequestParams = {},
  ) =>
    this.request<MacFactoryQueryResp, any>({
      path: `/api/luteos/product/mac/queryList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags MAC地址管理
   * @name LuteosProductMacQueryMacAddressList
   * @summary MAC地址列表查询
   * @request POST:/api/luteos/product/mac/queryMacAddressList
   * @response `200` `MacAddrQueryResp` OK
   */
  luteosProductMacQueryMacAddressList = (req: MacAddrQueryReq, params: RequestParams = {}) =>
    this.request<MacAddrQueryResp, any>({
      path: `/api/luteos/product/mac/queryMacAddressList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags MAC地址管理
   * @name LuteosProductMacQueryProductCodeDetail
   * @summary 产品代码详情查询
   * @request GET:/api/luteos/product/mac/queryProductCodeDetail
   * @response `200` `MacProductCodeDetailResp` OK
   */
  luteosProductMacQueryProductCodeDetail = (
    query?: {
      /** 产品代码 */
      productCode?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<MacProductCodeDetailResp, any>({
      path: `/api/luteos/product/mac/queryProductCodeDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags MAC地址管理
   * @name LuteosProductMacQueryProductCodeList
   * @summary 产品代码列表查询
   * @request GET:/api/luteos/product/mac/queryProductCodeList
   * @response `200` `MacProductCodeQueryResp` OK
   */
  luteosProductMacQueryProductCodeList = (
    query: {
      /** 产品代码/系列/关联项目 */
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
    },
    params: RequestParams = {},
  ) =>
    this.request<MacProductCodeQueryResp, any>({
      path: `/api/luteos/product/mac/queryProductCodeList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags MAC地址管理
   * @name LuteosProductMacQueryPurchaseOrderList
   * @summary PO采购订单查询
   * @request POST:/api/luteos/product/mac/queryPurchaseOrderList
   * @response `200` `PurchaseOrderQueryResp` OK
   */
  luteosProductMacQueryPurchaseOrderList = (
    query: {
      /** 工厂代码 */
      factoryCode?: string;
      /** PO单号/产品名称/供应链SKU */
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
      /** 产品代码 */
      productCode?: string;
      /** 供应商编码 */
      supplierCode?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<PurchaseOrderQueryResp, any>({
      path: `/api/luteos/product/mac/queryPurchaseOrderList`,
      method: 'POST',
      query: query,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags MAC地址管理
   * @name LuteosProductMacQuerySupplierList
   * @summary 供应商列表查询
   * @request GET:/api/luteos/product/mac/querySupplierList
   * @response `200` `CommonRespMacSupplierQueryResp` OK
   */
  luteosProductMacQuerySupplierList = (params: RequestParams = {}) =>
    this.request<CommonRespMacSupplierQueryResp, any>({
      path: `/api/luteos/product/mac/querySupplierList`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags MAC地址管理
   * @name LuteosProductMacSaveFactory
   * @summary 贴片工厂新增
   * @request POST:/api/luteos/product/mac/saveFactory
   * @response `200` `MacFactorySaveResp` OK
   */
  luteosProductMacSaveFactory = (req: MacFactorySaveReq, params: RequestParams = {}) =>
    this.request<MacFactorySaveResp, any>({
      path: `/api/luteos/product/mac/saveFactory`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags MAC地址管理
   * @name LuteosProductMacSaveMacAddress
   * @summary MAC地址保存
   * @request POST:/api/luteos/product/mac/saveMacAddress
   * @response `200` `CommonRespVoid` OK
   */
  luteosProductMacSaveMacAddress = (req: MacAddrSaveReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/product/mac/saveMacAddress`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags MAC地址管理
   * @name LuteosProductMacSaveProductCode
   * @summary 产品代码保存
   * @request POST:/api/luteos/product/mac/saveProductCode
   * @response `200` `MacProductCodeSaveResp` OK
   */
  luteosProductMacSaveProductCode = (req: MacProductCodeSaveReq, params: RequestParams = {}) =>
    this.request<MacProductCodeSaveResp, any>({
      path: `/api/luteos/product/mac/saveProductCode`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 内购用户地址管理
   * @name LuteosProductMallAddrDeleteUserAddr
   * @summary 删除用户地址
   * @request POST:/api/luteos/product/mall/addr/deleteUserAddr
   * @response `200` `CommonRespObject` OK
   */
  luteosProductMallAddrDeleteUserAddr = (req: MallUserDeleteReq, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/product/mall/addr/deleteUserAddr`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 内购用户地址管理
   * @name LuteosProductMallAddrQueryDefaultAddr
   * @summary 查询用户默认地址
   * @request GET:/api/luteos/product/mall/addr/queryDefaultAddr
   * @response `200` `MallUserDefaultAddrResp` OK
   */
  luteosProductMallAddrQueryDefaultAddr = (params: RequestParams = {}) =>
    this.request<MallUserDefaultAddrResp, any>({
      path: `/api/luteos/product/mall/addr/queryDefaultAddr`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 内购用户地址管理
   * @name LuteosProductMallAddrQueryUserAddr
   * @summary 查询用户地址详情
   * @request GET:/api/luteos/product/mall/addr/queryUserAddr
   * @response `200` `MallUserDefaultAddrResp` OK
   */
  luteosProductMallAddrQueryUserAddr = (
    query?: {
      /** 地址编码 */
      addressCode?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<MallUserDefaultAddrResp, any>({
      path: `/api/luteos/product/mall/addr/queryUserAddr`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 内购用户地址管理
   * @name LuteosProductMallAddrQueryUserAddrList
   * @summary 查询地址管理列表
   * @request GET:/api/luteos/product/mall/addr/queryUserAddrList
   * @response `200` `MallUserAddrListResp` OK
   */
  luteosProductMallAddrQueryUserAddrList = (params: RequestParams = {}) =>
    this.request<MallUserAddrListResp, any>({
      path: `/api/luteos/product/mall/addr/queryUserAddrList`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 内购用户地址管理
   * @name LuteosProductMallAddrSaveUserAddr
   * @summary 保存用户地址
   * @request POST:/api/luteos/product/mall/addr/saveUserAddr
   * @response `200` `MallUserAddrSaveResp` OK
   */
  luteosProductMallAddrSaveUserAddr = (req: MallUserAddrSaveReq, params: RequestParams = {}) =>
    this.request<MallUserAddrSaveResp, any>({
      path: `/api/luteos/product/mall/addr/saveUserAddr`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 内购商城管理
   * @name LuteosProductMallConfirmReceive
   * @summary 确认收货
   * @request POST:/api/luteos/product/mall/confirmReceive
   * @response `200` `CommonRespVoid` OK
   */
  luteosProductMallConfirmReceive = (
    query: {
      /** orderCode */
      orderCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/product/mall/confirmReceive`,
      method: 'POST',
      query: query,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 内购商城管理
   * @name LuteosProductMallExportOrder
   * @summary 导出内购订单
   * @request POST:/api/luteos/product/mall/exportOrder
   * @response `200` `CommonExportResp` OK
   */
  luteosProductMallExportOrder = (req: MallOrderListReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/product/mall/exportOrder`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 内购商城管理
   * @name LuteosProductMallExportProductList
   * @summary 导出内购产品清单
   * @request POST:/api/luteos/product/mall/exportProductList
   * @response `200` `CommonExportResp` OK
   */
  luteosProductMallExportProductList = (req: MallProductListReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/product/mall/exportProductList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 内购商城管理
   * @name LuteosProductMallOperateOrder
   * @summary 操作内购订单
   * @request POST:/api/luteos/product/mall/operateOrder
   * @response `200` `CommonRespObject` OK
   */
  luteosProductMallOperateOrder = (req: MallOrderOperateReq, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/product/mall/operateOrder`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 内购商城管理
   * @name LuteosProductMallOperateProduct
   * @summary 操作内购商品
   * @request POST:/api/luteos/product/mall/operateProduct
   * @response `200` `MallProductSaveResp` OK
   */
  luteosProductMallOperateProduct = (req: MallProductOperateReq, params: RequestParams = {}) =>
    this.request<MallProductSaveResp, any>({
      path: `/api/luteos/product/mall/operateProduct`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 内购商城管理
   * @name LuteosProductMallQueryOrderDetail
   * @summary 查询内购订单详情-管理端
   * @request GET:/api/luteos/product/mall/queryOrderDetail
   * @response `200` `MallOrderDetailResp` OK
   */
  luteosProductMallQueryOrderDetail = (
    query: {
      /**
       * 操作类型 0-管理端 1-用户端
       * @format int32
       */
      operateType?: number;
      /** 订单号 */
      orderCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<MallOrderDetailResp, any>({
      path: `/api/luteos/product/mall/queryOrderDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 内购商城管理
   * @name LuteosProductMallQueryOrderList
   * @summary 查询内购订单列表-管理端
   * @request GET:/api/luteos/product/mall/queryOrderList
   * @response `200` `MallOrderListResp` OK
   */
  luteosProductMallQueryOrderList = (
    query: {
      /** 创建人 */
      creator?: string;
      /**
       * 结束日期
       * @format date
       */
      endDate?: string;
      /**
       * 0-管理端 1-用户端
       * @format int32
       */
      operateType?: number;
      /** 系统订单号 */
      orderCode?: string;
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
      /** 供应链sku */
      productSku?: string;
      /** 商品名称 */
      productTitle?: string;
      /**
       * 开始日期
       * @format date
       */
      startDate?: string;
      /** 状态 */
      status?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<MallOrderListResp, any>({
      path: `/api/luteos/product/mall/queryOrderList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 内购商城管理
   * @name LuteosProductMallQueryOrderStatus
   * @summary 查询内购订单支付状态
   * @request GET:/api/luteos/product/mall/queryOrderStatus
   * @response `200` `MallOrderStatusResp` OK
   */
  luteosProductMallQueryOrderStatus = (
    query: {
      /** 订单编码 */
      orderCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<MallOrderStatusResp, any>({
      path: `/api/luteos/product/mall/queryOrderStatus`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 内购商城管理
   * @name LuteosProductMallQueryProductDetail
   * @summary 查询内购商品详情
   * @request GET:/api/luteos/product/mall/queryProductDetail
   * @response `200` `MallProductDetailResp` OK
   */
  luteosProductMallQueryProductDetail = (
    query: {
      /** 供应链sku */
      productSku: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<MallProductDetailResp, any>({
      path: `/api/luteos/product/mall/queryProductDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 内购商城管理
   * @name LuteosProductMallQueryProductList
   * @summary 查询内购商品列表
   * @request POST:/api/luteos/product/mall/queryProductList
   * @response `200` `MallProductListResp` OK
   */
  luteosProductMallQueryProductList = (req: MallProductListReq, params: RequestParams = {}) =>
    this.request<MallProductListResp, any>({
      path: `/api/luteos/product/mall/queryProductList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 内购商城管理
   * @name LuteosProductMallSaveProduct
   * @summary 保存内购商品
   * @request POST:/api/luteos/product/mall/saveProduct
   * @response `200` `MallProductSaveResp` OK
   */
  luteosProductMallSaveProduct = (req: MallProductSaveReq, params: RequestParams = {}) =>
    this.request<MallProductSaveResp, any>({
      path: `/api/luteos/product/mall/saveProduct`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 内购商城管理
   * @name LuteosProductMallSyncErp
   * @summary 同步易仓
   * @request GET:/api/luteos/product/mall/syncErp
   * @response `200` `CommonRespVoid` OK
   */
  luteosProductMallSyncErp = (
    query: {
      /** orderCode */
      orderCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/product/mall/syncErp`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 内购商城用户端管理
   * @name LuteosProductMallUserOperateOrder
   * @summary 操作订单
   * @request POST:/api/luteos/product/mall/user/operateOrder
   * @response `200` `CommonRespVoid` OK
   */
  luteosProductMallUserOperateOrder = (
    req: MallClientOrderOperateReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/product/mall/user/operateOrder`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 内购商城用户端管理
   * @name LuteosProductMallUserOperateShoppingCart
   * @summary 操作购物车
   * @request POST:/api/luteos/product/mall/user/operateShoppingCart
   * @response `200` `MallShopCartOperateResp` OK
   */
  luteosProductMallUserOperateShoppingCart = (
    req: MallShopCartOperateReq,
    params: RequestParams = {},
  ) =>
    this.request<MallShopCartOperateResp, any>({
      path: `/api/luteos/product/mall/user/operateShoppingCart`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 内购商城用户端管理
   * @name LuteosProductMallUserPreTrade
   * @summary 测试生成二维码
   * @request GET:/api/luteos/product/mall/user/preTrade
   * @response `200` `CommonRespString` OK
   */
  luteosProductMallUserPreTrade = (
    query: {
      /** orderCode */
      orderCode: string;
      /** subject */
      subject: string;
      /** totalAmount */
      totalAmount: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/product/mall/user/preTrade`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 内购商城用户端管理
   * @name LuteosProductMallUserQueryCartCount
   * @summary 查询购物车清单数量
   * @request POST:/api/luteos/product/mall/user/queryCartCount
   * @response `200` `MallShopCartCountResp` OK
   */
  luteosProductMallUserQueryCartCount = (params: RequestParams = {}) =>
    this.request<MallShopCartCountResp, any>({
      path: `/api/luteos/product/mall/user/queryCartCount`,
      method: 'POST',
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 内购商城用户端管理
   * @name LuteosProductMallUserQueryProductList
   * @summary 查询商品首页列表
   * @request POST:/api/luteos/product/mall/user/queryProductList
   * @response `200` `MallProductClientListResp` OK
   */
  luteosProductMallUserQueryProductList = (
    req: MallProductClientListReq,
    params: RequestParams = {},
  ) =>
    this.request<MallProductClientListResp, any>({
      path: `/api/luteos/product/mall/user/queryProductList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 内购商城用户端管理
   * @name LuteosProductMallUserQueryShoppingCartList
   * @summary 查询购物车列表
   * @request GET:/api/luteos/product/mall/user/queryShoppingCartList
   * @response `200` `MallShopCartListResp` OK
   */
  luteosProductMallUserQueryShoppingCartList = (
    query: {
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
    this.request<MallShopCartListResp, any>({
      path: `/api/luteos/product/mall/user/queryShoppingCartList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 内购商城用户端管理
   * @name LuteosProductMallUserSubmitOrder
   * @summary 提交订单
   * @request POST:/api/luteos/product/mall/user/submitOrder
   * @response `200` `MallOrderSubmitResp` OK
   */
  luteosProductMallUserSubmitOrder = (req: MallOrderSubmitReq, params: RequestParams = {}) =>
    this.request<MallOrderSubmitResp, any>({
      path: `/api/luteos/product/mall/user/submitOrder`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 型号管理
   * @name LuteosProductModelConnectProduct
   * @summary 型号关联商品
   * @request POST:/api/luteos/product/model/connectProduct
   * @response `200` `CommonRespString` OK
   */
  luteosProductModelConnectProduct = (req: ModelProductConnectReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/product/model/connectProduct`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 型号管理
   * @name LuteosProductModelExportModel
   * @summary 型号信息导出
   * @request POST:/api/luteos/product/model/exportModel
   * @response `200` `CommonExportResp` OK
   */
  luteosProductModelExportModel = (req: ModelListQueryReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/product/model/exportModel`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 型号管理
   * @name LuteosProductModelOperateModel
   * @summary 型号操作
   * @request POST:/api/luteos/product/model/operateModel
   * @response `200` `CommonRespString` OK
   */
  luteosProductModelOperateModel = (req: ModelOperateReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/product/model/operateModel`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 型号管理
   * @name LuteosProductModelQueryModelDetail
   * @summary 型号详情查询
   * @request GET:/api/luteos/product/model/queryModelDetail
   * @response `200` `ModelDetailResp` OK
   */
  luteosProductModelQueryModelDetail = (
    query: {
      /** 型号编码 */
      modelCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<ModelDetailResp, any>({
      path: `/api/luteos/product/model/queryModelDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 型号管理
   * @name LuteosProductModelQueryModelList
   * @summary 型号列表查询
   * @request GET:/api/luteos/product/model/queryModelList
   * @response `200` `ModelListQueryResp` OK
   */
  luteosProductModelQueryModelList = (
    query: {
      /** 勾选导出的编码 */
      codeList?: string[];
      /** 型号编号 */
      modelCode?: string;
      /** 型号名称 */
      modelName?: string;
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
    this.request<ModelListQueryResp, any>({
      path: `/api/luteos/product/model/queryModelList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 型号管理
   * @name LuteosProductModelSaveOrUpdateModel
   * @summary 型号信息保存
   * @request POST:/api/luteos/product/model/saveOrUpdateModel
   * @response `200` `ModelSaveResp` OK
   */
  luteosProductModelSaveOrUpdateModel = (req: ModelSaveReq, params: RequestParams = {}) =>
    this.request<ModelSaveResp, any>({
      path: `/api/luteos/product/model/saveOrUpdateModel`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 在线商品跟卖监控
   * @name LuteosProductMonitorQueryChartData
   * @summary 趋势图数据
   * @request POST:/api/luteos/product/monitor/queryChartData
   * @response `200` `OnlineProductChartResp` OK
   */
  luteosProductMonitorQueryChartData = (req: OnlineProductChartReq, params: RequestParams = {}) =>
    this.request<OnlineProductChartResp, any>({
      path: `/api/luteos/product/monitor/queryChartData`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 在线商品跟卖监控
   * @name LuteosProductMonitorQueryList
   * @summary 列表查询
   * @request POST:/api/luteos/product/monitor/queryList
   * @response `200` `OnlineProductMonitorResp` OK
   */
  luteosProductMonitorQueryList = (req: OnlineProductMonitorReq, params: RequestParams = {}) =>
    this.request<OnlineProductMonitorResp, any>({
      path: `/api/luteos/product/monitor/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags msrp管理
   * @name LuteosProductMsrpAddActive
   * @summary 活动折扣计划表-SPU新增编辑
   * @request POST:/api/luteos/product/msrp/addActive
   * @response `200` `CommonRespObject` OK
   */
  luteosProductMsrpAddActive = (req: ActiveDiscountPlanAddReq, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/product/msrp/addActive`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags msrp管理
   * @name LuteosProductMsrpAddSkuActive
   * @summary 活动折扣计划表-SKU新增编辑
   * @request POST:/api/luteos/product/msrp/addSkuActive
   * @response `200` `CommonRespObject` OK
   */
  luteosProductMsrpAddSkuActive = (req: SkuActiveDiscountPlanAddReq, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/product/msrp/addSkuActive`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags msrp管理
   * @name LuteosProductMsrpApproveActive
   * @summary 活动折扣计划表-提交审批
   * @request POST:/api/luteos/product/msrp/approveActive
   * @response `200` `CommonRespObject` OK
   */
  luteosProductMsrpApproveActive = (req: DiscountPlanWeekApproveReq, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/product/msrp/approveActive`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags msrp管理
   * @name LuteosProductMsrpBatchAddActive
   * @summary 活动折扣计划表-批量保存
   * @request POST:/api/luteos/product/msrp/batchAddActive
   * @response `200` `CommonRespObject` OK
   */
  luteosProductMsrpBatchAddActive = (
    req: ActiveDiscountPlanBatchAddReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/product/msrp/batchAddActive`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags msrp管理
   * @name LuteosProductMsrpBatchSave
   * @summary msrp管理-批量编辑保存
   * @request POST:/api/luteos/product/msrp/batchSave
   * @response `200` `MsrpBatchSaveResp` OK
   */
  luteosProductMsrpBatchSave = (req: MsrpSaveReq, params: RequestParams = {}) =>
    this.request<MsrpBatchSaveResp, any>({
      path: `/api/luteos/product/msrp/batchSave`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags msrp定价测算管理
   * @name LuteosProductMsrpCalculationGetOnlinePromotionRate
   * @summary 定价测算-线上促销率查询
   * @request GET:/api/luteos/product/msrp/calculation/getOnlinePromotionRate
   * @response `200` `CommonRespMsrpOnlinePromotionResp` OK
   */
  luteosProductMsrpCalculationGetOnlinePromotionRate = (
    query: {
      /** channel */
      channel: string;
      /** countryCode */
      countryCode: string;
      /** skuCode */
      skuCode: string;
      /** spuCode */
      spuCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespMsrpOnlinePromotionResp, any>({
      path: `/api/luteos/product/msrp/calculation/getOnlinePromotionRate`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags msrp定价测算管理
   * @name LuteosProductMsrpCalculationQueryAllEuSite
   * @summary 定价测算-EU范围站点
   * @request GET:/api/luteos/product/msrp/calculation/queryAllEuSite
   * @response `200` `CommonRespListString` OK
   */
  luteosProductMsrpCalculationQueryAllEuSite = (params: RequestParams = {}) =>
    this.request<CommonRespListString, any>({
      path: `/api/luteos/product/msrp/calculation/queryAllEuSite`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags msrp定价测算管理
   * @name LuteosProductMsrpCalculationQueryCalculateBaseData
   * @summary 定价测算-BI数据查询
   * @request POST:/api/luteos/product/msrp/calculation/queryCalculateBaseData
   * @response `200` `CommonRespMsrpCalculateBaseDataResp` OK
   */
  luteosProductMsrpCalculationQueryCalculateBaseData = (
    req: MsrpCalculateBaseReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespMsrpCalculateBaseDataResp, any>({
      path: `/api/luteos/product/msrp/calculation/queryCalculateBaseData`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags msrp定价测算管理
   * @name LuteosProductMsrpCalculationQueryChannel
   * @summary 定价测算-渠道下拉框
   * @request GET:/api/luteos/product/msrp/calculation/queryChannel
   * @response `200` `CommonRespListString` OK
   */
  luteosProductMsrpCalculationQueryChannel = (params: RequestParams = {}) =>
    this.request<CommonRespListString, any>({
      path: `/api/luteos/product/msrp/calculation/queryChannel`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags msrp定价测算管理
   * @name LuteosProductMsrpCalculationQueryCurrency
   * @summary 定价测算-汇率查询
   * @request GET:/api/luteos/product/msrp/calculation/queryCurrency
   * @response `200` `CommonRespMapStringOdsFinanceCurrency` OK
   */
  luteosProductMsrpCalculationQueryCurrency = (params: RequestParams = {}) =>
    this.request<CommonRespMapStringOdsFinanceCurrency, any>({
      path: `/api/luteos/product/msrp/calculation/queryCurrency`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags msrp定价测算管理
   * @name LuteosProductMsrpCalculationQueryDetail
   * @summary msrp定价测算-详情
   * @request POST:/api/luteos/product/msrp/calculation/queryDetail
   * @response `200` `CommonRespMsrpCalculatePriceDetailResp` OK
   */
  luteosProductMsrpCalculationQueryDetail = (
    query: {
      /**
       * id
       * @format int64
       */
      id: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespMsrpCalculatePriceDetailResp, any>({
      path: `/api/luteos/product/msrp/calculation/queryDetail`,
      method: 'POST',
      query: query,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags msrp定价测算管理
   * @name LuteosProductMsrpCalculationQueryList
   * @summary msrp定价测算列表查询
   * @request POST:/api/luteos/product/msrp/calculation/queryList
   * @response `200` `MsrpCalculatePriceQueryListResp` OK
   */
  luteosProductMsrpCalculationQueryList = (req: MsrpQueryListReq, params: RequestParams = {}) =>
    this.request<MsrpCalculatePriceQueryListResp, any>({
      path: `/api/luteos/product/msrp/calculation/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags msrp定价测算管理
   * @name LuteosProductMsrpCalculationSave
   * @summary msrp定价测算-新增
   * @request POST:/api/luteos/product/msrp/calculation/save
   * @response `200` `CommonRespObject` OK
   */
  luteosProductMsrpCalculationSave = (
    req: MsrpCalculatePriceDetailSaveReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/product/msrp/calculation/save`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags msrp定价测算管理
   * @name LuteosProductMsrpCalculationSubmit
   * @summary msrp定价测算-确定
   * @request POST:/api/luteos/product/msrp/calculation/submit
   * @response `200` `CommonRespObject` OK
   */
  luteosProductMsrpCalculationSubmit = (
    query: {
      /**
       * id
       * @format int64
       */
      id: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/product/msrp/calculation/submit`,
      method: 'POST',
      query: query,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags msrp管理
   * @name LuteosProductMsrpCancelApproveActive
   * @summary 活动折扣计划表-撤销审批
   * @request POST:/api/luteos/product/msrp/cancelApproveActive
   * @response `200` `CommonRespObject` OK
   */
  luteosProductMsrpCancelApproveActive = (
    req: DiscountPlanWeekCancelReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/product/msrp/cancelApproveActive`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags msrp管理
   * @name LuteosProductMsrpDeleteSkuDetail
   * @summary msrp管理-删除sku
   * @request POST:/api/luteos/product/msrp/deleteSkuDetail
   * @response `200` `CommonRespVoid` OK
   */
  luteosProductMsrpDeleteSkuDetail = (req: MsrpSpuDetailReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/product/msrp/deleteSkuDetail`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags msrp管理
   * @name LuteosProductMsrpEditActive
   * @summary 活动折扣计划表-点击触笔进入编辑
   * @request POST:/api/luteos/product/msrp/editActive
   * @response `200` `CommonRespObject` OK
   */
  luteosProductMsrpEditActive = (req: DiscountPlanWeekEditReq, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/product/msrp/editActive`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags msrp管理
   * @name LuteosProductMsrpExportMsrp
   * @summary MSRP管理导出
   * @request POST:/api/luteos/product/msrp/exportMsrp
   * @response `200` `CommonExportResp` OK
   */
  luteosProductMsrpExportMsrp = (req: MsrpQueryListReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/product/msrp/exportMsrp`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags msrp管理
   * @name LuteosProductMsrpQueryApproveLog
   * @summary 活动折扣计划表-审批记录
   * @request GET:/api/luteos/product/msrp/queryApproveLog
   * @response `200` `WeekApproveLogResp` OK
   */
  luteosProductMsrpQueryApproveLog = (
    query?: {
      /** 记录编码 */
      code?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<WeekApproveLogResp, any>({
      path: `/api/luteos/product/msrp/queryApproveLog`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags msrp管理
   * @name LuteosProductMsrpQueryBatchActive
   * @summary 活动折扣计划表-批量编辑查询
   * @request POST:/api/luteos/product/msrp/queryBatchActive
   * @response `200` `ActiveDiscountPlanBatchEditQueryResp` OK
   */
  luteosProductMsrpQueryBatchActive = (
    req: ActiveDiscountPlanBatchEditQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<ActiveDiscountPlanBatchEditQueryResp, any>({
      path: `/api/luteos/product/msrp/queryBatchActive`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags msrp管理
   * @name LuteosProductMsrpQueryBatchEditList
   * @summary msrp管理-批量编辑查询
   * @request POST:/api/luteos/product/msrp/queryBatchEditList
   * @response `200` `CommonRespMsrpQueryChannelBatchListResp` OK
   */
  luteosProductMsrpQueryBatchEditList = (req: MsrpBatchQueryReq, params: RequestParams = {}) =>
    this.request<CommonRespMsrpQueryChannelBatchListResp, any>({
      path: `/api/luteos/product/msrp/queryBatchEditList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags msrp管理
   * @name LuteosProductMsrpQueryEditActive
   * @summary 活动折扣计划表-SPU列表编辑查询&详情查询
   * @request GET:/api/luteos/product/msrp/queryEditActive
   * @response `200` `ActiveDiscountPlanAddQueryResp` OK
   */
  luteosProductMsrpQueryEditActive = (
    query?: {
      /** 渠道编码 */
      channel?: string;
      /** code编码 */
      code?: string;
      /** 国家编码 */
      countryCode?: string;
      /** spu编码 */
      dimensionCode?: string;
      /** sku列表 */
      skuCodeList?: string[];
      /** spu编码 */
      spuCode?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<ActiveDiscountPlanAddQueryResp, any>({
      path: `/api/luteos/product/msrp/queryEditActive`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags msrp管理
   * @name LuteosProductMsrpQueryList
   * @summary msrp列表查询
   * @request POST:/api/luteos/product/msrp/queryList
   * @response `200` `MsrpQueryListResp` OK
   */
  luteosProductMsrpQueryList = (req: MsrpQueryListReq, params: RequestParams = {}) =>
    this.request<MsrpQueryListResp, any>({
      path: `/api/luteos/product/msrp/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags msrp管理
   * @name LuteosProductMsrpQueryOneSkuDetail
   * @summary msrp管理-查询sku详情
   * @request GET:/api/luteos/product/msrp/queryOneSkuDetail
   * @response `200` `CommonRespMsrpSkuDetailBean` OK
   */
  luteosProductMsrpQueryOneSkuDetail = (
    query: {
      /** countryCode */
      countryCode: string;
      /** skuCode */
      skuCode: string;
      /** spuCode */
      spuCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespMsrpSkuDetailBean, any>({
      path: `/api/luteos/product/msrp/queryOneSkuDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags msrp管理
   * @name LuteosProductMsrpQueryOneSpuDetail
   * @summary msrp管理-促销查spu详情
   * @request GET:/api/luteos/product/msrp/queryOneSpuDetail
   * @response `200` `CommonRespMsrpSpuDetailResp` OK
   */
  luteosProductMsrpQueryOneSpuDetail = (
    query: {
      /** channel */
      channel: string;
      /** countryCode */
      countryCode: string;
      /** spuCode */
      spuCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespMsrpSpuDetailResp, any>({
      path: `/api/luteos/product/msrp/queryOneSpuDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags msrp管理
   * @name LuteosProductMsrpQueryOperatorBySpuAndCountryAndChannel
   * @summary 根据spu,国家，渠道获取运营人员
   * @request GET:/api/luteos/product/msrp/queryOperatorBySpuAndCountryAndChannel
   * @response `200` `CommonRespOperatorQueryResp` OK
   */
  luteosProductMsrpQueryOperatorBySpuAndCountryAndChannel = (
    query: {
      /** channel */
      channel: string;
      /** countryCode */
      countryCode: string;
      /** spuCode */
      spuCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespOperatorQueryResp, any>({
      path: `/api/luteos/product/msrp/queryOperatorBySpuAndCountryAndChannel`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags msrp管理
   * @name LuteosProductMsrpQueryPlanList
   * @summary 活动折扣计划表-列表查询
   * @request POST:/api/luteos/product/msrp/queryPlanList
   * @response `200` `ActiveDiscountPlanListResp` OK
   */
  luteosProductMsrpQueryPlanList = (req: ActiveDiscountPlanReq, params: RequestParams = {}) =>
    this.request<ActiveDiscountPlanListResp, any>({
      path: `/api/luteos/product/msrp/queryPlanList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags msrp管理
   * @name LuteosProductMsrpQueryRelationLog
   * @summary msrp日志详情查询
   * @request GET:/api/luteos/product/msrp/queryRelationLog
   * @response `200` `SaleSkuLogDetailQueryResp` OK
   */
  luteosProductMsrpQueryRelationLog = (
    query: {
      /**
       * 是否统计分页总数量 1-是 0-否 默认否
       * @format int32
       */
      countFlag?: number;
      /**
       * 结束时间
       * @format date-time
       */
      endTime?: string;
      /** 项目编码 */
      itemCode?: string;
      /** 项目类型 在线课程-study_course */
      itemType?: string;
      /** 模型类型 在线课程-study_course */
      moduleType?: string;
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
      /**
       * 开始时间
       * @format date-time
       */
      startTime?: string;
      /** 是否转换客服操作人 */
      transferKfOperator?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<SaleSkuLogDetailQueryResp, any>({
      path: `/api/luteos/product/msrp/queryRelationLog`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags msrp管理
   * @name LuteosProductMsrpQuerySkuDetail
   * @summary msrp管理-查询sku详情
   * @request POST:/api/luteos/product/msrp/querySkuDetail
   * @response `200` `CommonRespMsrpSkuDetailResp` OK
   */
  luteosProductMsrpQuerySkuDetail = (req: MsrpSpuDetailReq, params: RequestParams = {}) =>
    this.request<CommonRespMsrpSkuDetailResp, any>({
      path: `/api/luteos/product/msrp/querySkuDetail`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags msrp管理
   * @name LuteosProductMsrpQuerySkuEditActive
   * @summary 活动折扣计划表-SKU列表编辑查询&详情查询
   * @request GET:/api/luteos/product/msrp/querySkuEditActive
   * @response `200` `SkuActiveDiscountPlanQueryResp` OK
   */
  luteosProductMsrpQuerySkuEditActive = (
    query: {
      /** 记录编码 */
      code: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<SkuActiveDiscountPlanQueryResp, any>({
      path: `/api/luteos/product/msrp/querySkuEditActive`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags msrp管理
   * @name LuteosProductMsrpQuerySkuList
   * @summary msrp管理新增-查询
   * @request POST:/api/luteos/product/msrp/querySkuList
   * @response `200` `MsrpQueryChannelListResp` OK
   */
  luteosProductMsrpQuerySkuList = (req: MsrpSkuListQueryReq, params: RequestParams = {}) =>
    this.request<MsrpQueryChannelListResp, any>({
      path: `/api/luteos/product/msrp/querySkuList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags msrp管理
   * @name LuteosProductMsrpQuerySpuDetail
   * @summary msrp管理-查询spu详情
   * @request POST:/api/luteos/product/msrp/querySpuDetail
   * @response `200` `CommonRespMsrpSpuDetailResp` OK
   */
  luteosProductMsrpQuerySpuDetail = (req: MsrpSpuDetailReq, params: RequestParams = {}) =>
    this.request<CommonRespMsrpSpuDetailResp, any>({
      path: `/api/luteos/product/msrp/querySpuDetail`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags msrp管理
   * @name LuteosProductMsrpSave
   * @summary msrp管理-新增
   * @request POST:/api/luteos/product/msrp/save
   * @response `200` `CommonRespObject` OK
   */
  luteosProductMsrpSave = (req: MsrpSaveReq, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/product/msrp/save`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags msrp管理
   * @name LuteosProductMsrpSaveSku
   * @summary msrp管理-sku编辑
   * @request POST:/api/luteos/product/msrp/saveSku
   * @response `200` `MsrpSaveSkuResp` OK
   */
  luteosProductMsrpSaveSku = (req: MsrpSaveSkuReq, params: RequestParams = {}) =>
    this.request<MsrpSaveSkuResp, any>({
      path: `/api/luteos/product/msrp/saveSku`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags msrp管理
   * @name LuteosProductMsrpSaveSpu
   * @summary msrp管理-spu编辑
   * @request POST:/api/luteos/product/msrp/saveSpu
   * @response `200` `MsrpSaveSpuResp` OK
   */
  luteosProductMsrpSaveSpu = (req: MsrpSaveSpuReq, params: RequestParams = {}) =>
    this.request<MsrpSaveSpuResp, any>({
      path: `/api/luteos/product/msrp/saveSpu`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 多平台价格监控
   * @name LuteosProductMultiPriceQueryList
   * @summary 多平台价格列表查询
   * @request POST:/api/luteos/product/multi-price/queryList
   * @response `200` `CommonRespMultiPriceQueryListResp` OK
   */
  luteosProductMultiPriceQueryList = (req: MultiPriceQueryListReq, params: RequestParams = {}) =>
    this.request<CommonRespMultiPriceQueryListResp, any>({
      path: `/api/luteos/product/multi-price/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 多平台价格监控
   * @name LuteosProductMultiPriceQueryPriceDetail
   * @summary 查询价格详情
   * @request GET:/api/luteos/product/multi-price/queryPriceDetail
   * @response `200` `CommonRespListMultiPriceDetailResp` OK
   */
  luteosProductMultiPriceQueryPriceDetail = (
    query: {
      /** code */
      code: string;
      /** platform */
      platform: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespListMultiPriceDetailResp, any>({
      path: `/api/luteos/product/multi-price/queryPriceDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 线下渠道-在线商品
   * @name LuteosProductOfflineListingQueryProductListingPage
   * @summary 线下渠道-在线商品分页查询-V2
   * @request POST:/api/luteos/product/offline/listing/queryProductListingPage
   * @response `200` `OfflineProductListingResp` OK
   */
  luteosProductOfflineListingQueryProductListingPage = (
    req: OfflineListingProductReq,
    params: RequestParams = {},
  ) =>
    this.request<OfflineProductListingResp, any>({
      path: `/api/luteos/product/offline/listing/queryProductListingPage`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品SKU新旧产品映射管理
   * @name LuteosProductOldNewMappingExport
   * @summary 导出
   * @request POST:/api/luteos/product/oldNewMapping/export
   * @response `200` `CommonExportResp` OK
   */
  luteosProductOldNewMappingExport = (
    req: ProductSkuOldNewListQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/product/oldNewMapping/export`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品SKU新旧产品映射管理
   * @name LuteosProductOldNewMappingQueryList
   * @summary 列表查询
   * @request GET:/api/luteos/product/oldNewMapping/queryList
   * @response `200` `ProductSkuOldNewMappingResp` OK
   */
  luteosProductOldNewMappingQueryList = (
    query: {
      /**
       * gtm组Id
       * @format int64
       */
      gtmDeptId?: number;
      /** 关键词 */
      keyWord?: string;
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
      /** 品线 */
      productLine?: string;
      /**
       * 商品sku状态 1-未上架 2-在销售 3-清仓中 4-已退市
       * @format int32
       */
      state?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<ProductSkuOldNewMappingResp, any>({
      path: `/api/luteos/product/oldNewMapping/queryList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品SKU新旧产品映射管理
   * @name LuteosProductOldNewMappingSaveOrUpdate
   * @summary 商品sku新旧保存
   * @request POST:/api/luteos/product/oldNewMapping/saveOrUpdate
   * @response `200` `CommonRespString` OK
   */
  luteosProductOldNewMappingSaveOrUpdate = (
    req: ProductSkuOldNewSaveOrUpdReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/product/oldNewMapping/saveOrUpdate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 新平台-在线商品
   * @name LuteosProductOnlineExport
   * @summary 导出
   * @request GET:/api/luteos/product/online/export
   * @response `200` `CommonExportResp` OK
   */
  luteosProductOnlineExport = (
    query: {
      /** 渠道 */
      channel?: string;
      /** 渠道列表 */
      channelList?: string[];
      /** ITEM_ID/MSKU */
      keyword?: string;
      /** 运营人员列表 */
      operatorList?: string[];
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
      /** 销售SKU集合 */
      saleSkuCodeList?: string[];
      /** 店铺 */
      shop?: string;
      /** 店铺列表 */
      shopList?: string[];
      /** 标签列表 */
      tagList?: string[];
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/product/online/export`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 新平台-在线商品
   * @name LuteosProductOnlineListingQueryTag
   * @summary 标签查询
   * @request POST:/api/luteos/product/online/listing/queryTag
   * @response `200` `ListingTagResp` OK
   */
  luteosProductOnlineListingQueryTag = (req: ListingQueryTagReq, params: RequestParams = {}) =>
    this.request<ListingTagResp, any>({
      path: `/api/luteos/product/online/listing/queryTag`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 新平台-在线商品
   * @name LuteosProductOnlineQueryList
   * @summary 列表查询
   * @request POST:/api/luteos/product/online/queryList
   * @response `200` `OnlineProductQueryResp` OK
   */
  luteosProductOnlineQueryList = (req: OnlineProductQueryReq, params: RequestParams = {}) =>
    this.request<OnlineProductQueryResp, any>({
      path: `/api/luteos/product/online/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 新平台-在线商品
   * @name LuteosProductOnlineSave
   * @summary 保存在线商品
   * @request POST:/api/luteos/product/online/save
   * @response `200` `CommonRespObject` OK
   */
  luteosProductOnlineSave = (req: OnlineProductSaveReq, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/product/online/save`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 新平台-在线商品
   * @name LuteosProductOnlineSaveOperator
   * @summary 保存运营人员
   * @request POST:/api/luteos/product/online/saveOperator
   * @response `200` `CommonRespObject` OK
   */
  luteosProductOnlineSaveOperator = (req: OperatorSaveReq, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/product/online/saveOperator`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 新平台-在线商品
   * @name LuteosProductOnlineSaveProductLink
   * @summary 保存商品链接
   * @request POST:/api/luteos/product/online/saveProductLink
   * @response `200` `CommonRespObject` OK
   */
  luteosProductOnlineSaveProductLink = (req: ProductLinkSaveReq, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/product/online/saveProductLink`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 新平台-在线商品
   * @name LuteosProductOnlineSaveTag
   * @summary 保存标签
   * @request POST:/api/luteos/product/online/saveTag
   * @response `200` `CommonRespObject` OK
   */
  luteosProductOnlineSaveTag = (req: ListingBatchModifyTagReq, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/product/online/saveTag`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品管理
   * @name LuteosProductOperateProduct
   * @summary 商品信息操作
   * @request POST:/api/luteos/product/operateProduct
   * @response `200` `CommonRespBoolean` OK
   */
  luteosProductOperateProduct = (req: ProductOperateReq, params: RequestParams = {}) =>
    this.request<CommonRespBoolean, any>({
      path: `/api/luteos/product/operateProduct`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 在线商品-产品表现
   * @name LuteosProductPerformanceQueryPerformance
   * @summary 在线商品-商品表现-V2
   * @request POST:/api/luteos/product/performance/queryPerformance
   * @response `200` `WalmartProductListingResp` OK
   */
  luteosProductPerformanceQueryPerformance = (
    req: PerformanceProductReq,
    params: RequestParams = {},
  ) =>
    this.request<WalmartProductListingResp, any>({
      path: `/api/luteos/product/performance/queryPerformance`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 产品表现
   * @name LuteosProductPerformanceQuerySkuList
   * @summary SKU列表查询
   * @request GET:/api/luteos/product/performance/querySkuList
   * @response `200` `ProductPerformanceResp` OK
   */
  luteosProductPerformanceQuerySkuList = (
    query: {
      /** 渠道 */
      channel?: string;
      /** 关键字 */
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
      /**
       * 查询类型：1-SKU 2-MSKU
       * @format int32
       */
      queryType: number;
      /** 店铺 */
      shop?: string;
      /** 店铺集合 */
      shopList?: string[];
      /** 站点 */
      site?: string;
      /** SKU集合 */
      skuCodeList?: string[];
    },
    params: RequestParams = {},
  ) =>
    this.request<ProductPerformanceResp, any>({
      path: `/api/luteos/product/performance/querySkuList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 产品表现
   * @name LuteosProductPerformanceQuerySkuPerformance
   * @summary SKU产品表现
   * @request GET:/api/luteos/product/performance/querySkuPerformance
   * @response `200` `ProductPerformanceDetailResp` OK
   */
  luteosProductPerformanceQuerySkuPerformance = (
    query: {
      /** 渠道 */
      channel?: string;
      /** 结束时间 */
      endDate?: string;
      /** MSKU */
      msku?: string;
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
      /** 店铺 */
      shop?: string;
      /** 站点 */
      site?: string;
      /** SKU */
      skuCode?: string;
      /** 开始时间 */
      startDate?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<ProductPerformanceDetailResp, any>({
      path: `/api/luteos/product/performance/querySkuPerformance`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 促销计划
   * @name LuteosProductPromotionPlanApplyList
   * @summary 促销计划申请列表
   * @request POST:/api/luteos/product/promotion-plan/applyList
   * @response `200` `PromotionPlanApplyListResp` OK
   */
  luteosProductPromotionPlanApplyList = (
    req: PromotionPlanListQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<PromotionPlanApplyListResp, any>({
      path: `/api/luteos/product/promotion-plan/applyList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 促销计划
   * @name LuteosProductPromotionPlanCreate
   * @summary 促销计划-新增
   * @request POST:/api/luteos/product/promotion-plan/create
   * @response `200` `CommonRespVoid` OK
   */
  luteosProductPromotionPlanCreate = (req: PromotionPlanCreateReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/product/promotion-plan/create`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 促销计划
   * @name LuteosProductPromotionPlanCreateCheck
   * @summary 促销计划-新增校验
   * @request POST:/api/luteos/product/promotion-plan/createCheck
   * @response `200` `CommonRespPlanCreateCheckResp` OK
   */
  luteosProductPromotionPlanCreateCheck = (
    req: PromotionPlanCreateReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespPlanCreateCheckResp, any>({
      path: `/api/luteos/product/promotion-plan/createCheck`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 促销计划
   * @name LuteosProductPromotionPlanDelete
   * @summary 促销计划-删除
   * @request POST:/api/luteos/product/promotion-plan/delete
   * @response `200` `CommonRespPromotionPlanDeleteResp` OK
   */
  luteosProductPromotionPlanDelete = (
    query: {
      /** confirm */
      confirm: boolean;
      /** planCode */
      planCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespPromotionPlanDeleteResp, any>({
      path: `/api/luteos/product/promotion-plan/delete`,
      method: 'POST',
      query: query,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 促销计划
   * @name LuteosProductPromotionPlanDetail
   * @summary 促销计划-详情
   * @request GET:/api/luteos/product/promotion-plan/detail
   * @response `200` `CommonRespPromotionPlanDetailResp` OK
   */
  luteosProductPromotionPlanDetail = (
    query: {
      /** planCode */
      planCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespPromotionPlanDetailResp, any>({
      path: `/api/luteos/product/promotion-plan/detail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 促销计划
   * @name LuteosProductPromotionPlanExportPromotionPlan
   * @summary 促销计划导出
   * @request POST:/api/luteos/product/promotion-plan/exportPromotionPlan
   * @response `200` `CommonExportResp` OK
   */
  luteosProductPromotionPlanExportPromotionPlan = (
    req: PromotionPlanListQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/product/promotion-plan/exportPromotionPlan`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 促销计划
   * @name LuteosProductPromotionPlanGetAddActivityDetail
   * @summary 添加活动详情列表
   * @request GET:/api/luteos/product/promotion-plan/getAddActivityDetail
   * @response `200` `CommonRespAddActivityDetailResp` OK
   */
  luteosProductPromotionPlanGetAddActivityDetail = (
    query: {
      /** planCodeList */
      planCodeList: string[];
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespAddActivityDetailResp, any>({
      path: `/api/luteos/product/promotion-plan/getAddActivityDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 促销计划
   * @name LuteosProductPromotionPlanListBySku
   * @summary 促销计划-SKU维度分页列表
   * @request POST:/api/luteos/product/promotion-plan/listBySku
   * @response `200` `PromotionPlanListQuerySkuResp` OK
   */
  luteosProductPromotionPlanListBySku = (
    req: PromotionPlanListQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<PromotionPlanListQuerySkuResp, any>({
      path: `/api/luteos/product/promotion-plan/listBySku`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 促销计划
   * @name LuteosProductPromotionPlanListBySpu
   * @summary 促销计划-SPU维度分页列表
   * @request POST:/api/luteos/product/promotion-plan/listBySpu
   * @response `200` `PromotionPlanListQuerySpuResp` OK
   */
  luteosProductPromotionPlanListBySpu = (
    req: PromotionPlanListQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<PromotionPlanListQuerySpuResp, any>({
      path: `/api/luteos/product/promotion-plan/listBySpu`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 促销计划
   * @name LuteosProductPromotionPlanQuerySkuList
   * @summary 查询sku列表
   * @request GET:/api/luteos/product/promotion-plan/querySkuList
   * @response `200` `CommonRespMsrpSkuListResp` OK
   */
  luteosProductPromotionPlanQuerySkuList = (
    query: {
      /** countryCode */
      countryCode: string;
      /** spuCode */
      spuCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespMsrpSkuListResp, any>({
      path: `/api/luteos/product/promotion-plan/querySkuList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 促销计划
   * @name LuteosProductPromotionPlanQuerySpuList
   * @summary 查询spu列表
   * @request GET:/api/luteos/product/promotion-plan/querySpuList
   * @response `200` `CommonRespProductListQueryResp` OK
   */
  luteosProductPromotionPlanQuerySpuList = (
    query: {
      /** 时间排序,默认false */
      asc?: boolean;
      /** 品牌编码 */
      brandCode?: string;
      /** 分类编码，如果传分类编码，分类等级一定要赋值 */
      categoryCode?: string;
      /** 产品分类批量 */
      categoryListWeb?: string[];
      /** 勾选导出的编码 */
      codeList?: string[];
      /** 国家编码 */
      countryCode?: string;
      /**
       * 创建时间-结束
       * @format date-time
       */
      createTimeEnd?: string;
      /**
       * 创建时间-开始
       * @format date-time
       */
      createTimeStart?: string;
      /** GTM经理 */
      gtm?: string;
      /** GTM经理批量 */
      gtmListWeb?: string[];
      /** GTM品线批量 */
      gtmProductLineListWeb?: string[];
      /**
       * 缺失信息 0-卖点 1-上架时间
       * @format int32
       */
      hasMissing?: number;
      /** 对象编码 */
      itemCode?: string;
      /**
       * 对象类型 1-品牌 2-型号 3-系列 4-敏感类型 5-标签
       * @format int32
       */
      itemType?: number;
      /** 商品名称/spu */
      keyWord?: string;
      /**
       * 分类等级，如果传分类编码，分类等级一定要赋值
       * @format int32
       * @min 1
       * @exclusiveMin false
       * @max 5
       * @exclusiveMax false
       */
      level?: number;
      /** 排序字段,默认updateTime,createTime */
      orderBy?: string;
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
      /** 品线 */
      productLine?: string;
      /** 产品品线批量 */
      productLineListWeb?: string[];
      /** 产品经理编码 */
      productManagerCode?: string;
      /** 产品经理批量 */
      productManagerListWeb?: string[];
      /** 商品名称 */
      productName?: string;
      /** 商品spu编码 */
      productSpu?: string;
      /** 商品spu编码列表 */
      productSpuList?: string[];
      /**
       * 状态
       * @format int32
       */
      state?: number;
      /** 状态批量 */
      stateListWeb?: number[];
      /** 标签编码 */
      tagCode?: string;
      /** 产品分类标签批量 */
      tagListWeb?: string[];
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespProductListQueryResp, any>({
      path: `/api/luteos/product/promotion-plan/querySpuList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 促销计划
   * @name LuteosProductPromotionPlanReview
   * @summary 促销计划-审核
   * @request POST:/api/luteos/product/promotion-plan/review
   * @response `200` `CommonRespVoid` OK
   */
  luteosProductPromotionPlanReview = (req: PromotionPlanReviewReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/product/promotion-plan/review`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 促销计划
   * @name LuteosProductPromotionPlanReviewList
   * @summary 促销计划-审核列表
   * @request POST:/api/luteos/product/promotion-plan/reviewList
   * @response `200` `CommonRespPromotionPlanReviewListResp` OK
   */
  luteosProductPromotionPlanReviewList = (
    req: PromotionPlanReviewListReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespPromotionPlanReviewListResp, any>({
      path: `/api/luteos/product/promotion-plan/reviewList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 促销计划
   * @name LuteosProductPromotionPlanUpdate
   * @summary 促销计划-更新
   * @request POST:/api/luteos/product/promotion-plan/update
   * @response `200` `CommonRespVoid` OK
   */
  luteosProductPromotionPlanUpdate = (req: PromotionPlanCreateReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/product/promotion-plan/update`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品管理
   * @name LuteosProductQueryDetail
   * @summary 商品详情查询
   * @request GET:/api/luteos/product/queryDetail
   * @response `200` `ProductDetailQueryResp` OK
   */
  luteosProductQueryDetail = (
    query: {
      /** 操作类型。detail:详情，update:编辑，delete：删除 */
      operationType: string;
      /** 商品编码 */
      productSpu: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<ProductDetailQueryResp, any>({
      path: `/api/luteos/product/queryDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品管理
   * @name LuteosProductQueryOperatorList
   * @summary 获取采购员列表
   * @request GET:/api/luteos/product/queryOperatorList
   * @response `200` `PurchaseOperatorQueryResp` OK
   */
  luteosProductQueryOperatorList = (
    query: {
      /** 产品经理编码 */
      productManagerCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<PurchaseOperatorQueryResp, any>({
      path: `/api/luteos/product/queryOperatorList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品管理
   * @name LuteosProductQueryPlatfromSkuIdentify
   * @summary 原平台标识查询
   * @request GET:/api/luteos/product/queryPlatfromSkuIdentify
   * @response `200` `CommonRespListString` OK
   */
  luteosProductQueryPlatfromSkuIdentify = (
    query: {
      /** 渠道 */
      channel: string;
      /** 国家 */
      country: string;
      /** 供应链SKU */
      supplySku: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespListString, any>({
      path: `/api/luteos/product/queryPlatfromSkuIdentify`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品管理
   * @name LuteosProductQueryProductPerfection
   * @summary 获取商品列表信息完善度
   * @request GET:/api/luteos/product/queryProduct/perfection
   * @response `200` `ProductPerfectionQueryResp` OK
   */
  luteosProductQueryProductPerfection = (params: RequestParams = {}) =>
    this.request<ProductPerfectionQueryResp, any>({
      path: `/api/luteos/product/queryProduct/perfection`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品管理
   * @name LuteosProductQueryProductByCategory
   * @summary 根据分类查询商品
   * @request POST:/api/luteos/product/queryProductByCategory
   * @response `200` `ProductCategoryResp` OK
   */
  luteosProductQueryProductByCategory = (req: ProductCategoryReq, params: RequestParams = {}) =>
    this.request<ProductCategoryResp, any>({
      path: `/api/luteos/product/queryProductByCategory`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品管理
   * @name LuteosProductQueryProductInfo
   * @summary 商品信息查询
   * @request GET:/api/luteos/product/queryProductInfo
   * @response `200` `ProductInfoResp` OK
   */
  luteosProductQueryProductInfo = (
    query: {
      /** 商品spu编码 */
      productSpu: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<ProductInfoResp, any>({
      path: `/api/luteos/product/queryProductInfo`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品管理
   * @name LuteosProductQueryProductList
   * @summary 商品列表查询
   * @request GET:/api/luteos/product/queryProductList
   * @response `200` `ProductListQueryResp` OK
   */
  luteosProductQueryProductList = (
    query: {
      /** 时间排序,默认false */
      asc?: boolean;
      /** 品牌编码 */
      brandCode?: string;
      /** 分类编码，如果传分类编码，分类等级一定要赋值 */
      categoryCode?: string;
      /** 产品分类批量 */
      categoryListWeb?: string[];
      /** 勾选导出的编码 */
      codeList?: string[];
      /** 国家编码 */
      countryCode?: string;
      /**
       * 创建时间-结束
       * @format date-time
       */
      createTimeEnd?: string;
      /**
       * 创建时间-开始
       * @format date-time
       */
      createTimeStart?: string;
      /** GTM经理 */
      gtm?: string;
      /** GTM经理批量 */
      gtmListWeb?: string[];
      /** GTM品线批量 */
      gtmProductLineListWeb?: string[];
      /**
       * 缺失信息 0-卖点 1-上架时间
       * @format int32
       */
      hasMissing?: number;
      /** 对象编码 */
      itemCode?: string;
      /**
       * 对象类型 1-品牌 2-型号 3-系列 4-敏感类型 5-标签
       * @format int32
       */
      itemType?: number;
      /** 商品名称/spu */
      keyWord?: string;
      /**
       * 分类等级，如果传分类编码，分类等级一定要赋值
       * @format int32
       * @min 1
       * @exclusiveMin false
       * @max 5
       * @exclusiveMax false
       */
      level?: number;
      /** 排序字段,默认updateTime,createTime */
      orderBy?: string;
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
      /** 品线 */
      productLine?: string;
      /** 产品品线批量 */
      productLineListWeb?: string[];
      /** 产品经理编码 */
      productManagerCode?: string;
      /** 产品经理批量 */
      productManagerListWeb?: string[];
      /** 商品名称 */
      productName?: string;
      /** 商品spu编码 */
      productSpu?: string;
      /** 商品spu编码列表 */
      productSpuList?: string[];
      /**
       * 状态
       * @format int32
       */
      state?: number;
      /** 状态批量 */
      stateListWeb?: number[];
      /** 标签编码 */
      tagCode?: string;
      /** 产品分类标签批量 */
      tagListWeb?: string[];
    },
    params: RequestParams = {},
  ) =>
    this.request<ProductListQueryResp, any>({
      path: `/api/luteos/product/queryProductList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品管理
   * @name LuteosProductQueryProductRelationList
   * @summary 商品关联信息列表查询
   * @request GET:/api/luteos/product/queryProductRelationList
   * @response `200` `ProductRelationListResp` OK
   */
  luteosProductQueryProductRelationList = (params: RequestParams = {}) =>
    this.request<ProductRelationListResp, any>({
      path: `/api/luteos/product/queryProductRelationList`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品管理
   * @name LuteosProductQuerySupplySku
   * @summary 供应链SKU查询
   * @request GET:/api/luteos/product/querySupplySku
   * @response `200` `CommonRespListString` OK
   */
  luteosProductQuerySupplySku = (params: RequestParams = {}) =>
    this.request<CommonRespListString, any>({
      path: `/api/luteos/product/querySupplySku`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 批量删除, 竞品监控
   * @name LuteosProductRankingListBatchDeleted
   * @summary 批量删除
   * @request POST:/api/luteos/product/rankingList/batchDeleted
   * @response `200` `CommonRespString` OK
   */
  luteosProductRankingListBatchDeleted = (
    req: AmazonRankingListBatchOperationReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/product/rankingList/batchDeleted`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 批量编辑, 竞品监控
   * @name LuteosProductRankingListBatchOperation
   * @summary 批量编辑
   * @request POST:/api/luteos/product/rankingList/batchOperation
   * @response `200` `CommonRespString` OK
   */
  luteosProductRankingListBatchOperation = (
    req: AmazonRankingListBatchOperationReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/product/rankingList/batchOperation`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 竞品监控
   * @name LuteosProductRankingListDownTemplate
   * @summary 下载-竞品监控导入模板
   * @request POST:/api/luteos/product/rankingList/downTemplate
   * @response `200` `CommonRespString` OK
   */
  luteosProductRankingListDownTemplate = (params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/product/rankingList/downTemplate`,
      method: 'POST',
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 竞品监控, 编辑
   * @name LuteosProductRankingListOperation
   * @summary 编辑运营/组长/备注
   * @request POST:/api/luteos/product/rankingList/operation
   * @response `200` `CommonRespString` OK
   */
  luteosProductRankingListOperation = (
    req: AmazonRankingListOperationReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/product/rankingList/operation`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 竞品监控
   * @name LuteosProductRankingListQueryList
   * @summary 竞品监控列表查询
   * @request POST:/api/luteos/product/rankingList/queryList
   * @response `200` `CommonRespAmazonRankingListQueryListResp` OK
   */
  luteosProductRankingListQueryList = (
    req: AmazonRankingListQueryListReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespAmazonRankingListQueryListResp, any>({
      path: `/api/luteos/product/rankingList/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 竞品监控
   * @name LuteosProductRankingListSave
   * @summary 新增/编辑
   * @request POST:/api/luteos/product/rankingList/save
   * @response `200` `CommonRespVoid` OK
   */
  luteosProductRankingListSave = (req: AmazonRankingListSaveReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/product/rankingList/save`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品管理
   * @name LuteosProductRemoveProduct
   * @summary 删除商品
   * @request GET:/api/luteos/product/removeProduct
   * @response `200` `CommonRespBoolean` OK
   */
  luteosProductRemoveProduct = (
    query: {
      /** 商品编码 */
      productSpu: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespBoolean, any>({
      path: `/api/luteos/product/removeProduct`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销售映射管理
   * @name LuteosProductSaleSkuExportSaleSku
   * @summary 导出销售映射
   * @request POST:/api/luteos/product/saleSku/exportSaleSku
   * @response `200` `CommonExportResp` OK
   */
  luteosProductSaleSkuExportSaleSku = (req: SaleSkuQueryReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/product/saleSku/exportSaleSku`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销售映射管理
   * @name LuteosProductSaleSkuQueryDictSalesChannelList
   * @summary 查询销售渠道字典表
   * @request POST:/api/luteos/product/saleSku/queryDictSalesChannelList
   * @response `200` `DictSalesChannelResp` OK
   */
  luteosProductSaleSkuQueryDictSalesChannelList = (
    query: {
      /** 关键词 */
      keyword?: string;
      /** 路特渠道 */
      luteChannel?: string;
      /** 路特平台 */
      lutePlatform?: string;
      /** 运营部门 */
      operateDept?: string;
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
    this.request<DictSalesChannelResp, any>({
      path: `/api/luteos/product/saleSku/queryDictSalesChannelList`,
      method: 'POST',
      query: query,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销售映射管理
   * @name LuteosProductSaleSkuQueryLuteChannelList
   * @summary 查询路特筛选条件
   * @request POST:/api/luteos/product/saleSku/queryLuteChannelList
   * @response `200` `LuteConditionResp` OK
   */
  luteosProductSaleSkuQueryLuteChannelList = (params: RequestParams = {}) =>
    this.request<LuteConditionResp, any>({
      path: `/api/luteos/product/saleSku/queryLuteChannelList`,
      method: 'POST',
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销售映射管理
   * @name LuteosProductSaleSkuQueryRelationLog
   * @summary 日志详情查询
   * @request GET:/api/luteos/product/saleSku/queryRelationLog
   * @response `200` `SaleSkuLogDetailQueryResp` OK
   */
  luteosProductSaleSkuQueryRelationLog = (
    query: {
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
      /** 唯一键 */
      uniqueCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<SaleSkuLogDetailQueryResp, any>({
      path: `/api/luteos/product/saleSku/queryRelationLog`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销售映射管理
   * @name LuteosProductSaleSkuQuerySaleSkuDetail
   * @summary 销售映射详情查询
   * @request GET:/api/luteos/product/saleSku/querySaleSkuDetail
   * @response `200` `SaleSkuDetailQueryResp` OK
   */
  luteosProductSaleSkuQuerySaleSkuDetail = (
    query: {
      /** 唯一键 */
      uniqueCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<SaleSkuDetailQueryResp, any>({
      path: `/api/luteos/product/saleSku/querySaleSkuDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销售映射管理
   * @name LuteosProductSaleSkuQuerySaleSkuList
   * @summary 销售映射列表查询
   * @request GET:/api/luteos/product/saleSku/querySaleSkuList
   * @response `200` `SaleSkuQueryResp` OK
   */
  luteosProductSaleSkuQuerySaleSkuList = (
    query: {
      /** 渠道 */
      channel?: string;
      /**
       * 导出类型 1:导出界面信息，2：导出销售映射全表
       * @format int32
       */
      exportType?: number;
      /** 运营人编码 */
      operator?: string;
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
      /** 渠道唯一标识/商品sku/供应链sku */
      saleSkuCode?: string;
      /** 站点 */
      site?: string;
      /** 来源，枚举值：JJ - 积加；ORDER - 订单；手工 - MANUAL */
      source?: string;
      /**
       * 状态 全部-null  0-正常 1-缺失映射 2-忽略 3-已废弃
       * @format int32
       */
      status?: number;
      /** 类型 */
      type?: string;
      /** 唯一键集合 */
      uniqueCodeList?: string[];
      /** 店铺账号 */
      userAccount?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<SaleSkuQueryResp, any>({
      path: `/api/luteos/product/saleSku/querySaleSkuList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销售映射管理
   * @name LuteosProductSaleSkuQuerySource
   * @summary 获取数据来源
   * @request GET:/api/luteos/product/saleSku/querySource
   * @response `200` `SaleSkuSourcelQueryResp` OK
   */
  luteosProductSaleSkuQuerySource = (params: RequestParams = {}) =>
    this.request<SaleSkuSourcelQueryResp, any>({
      path: `/api/luteos/product/saleSku/querySource`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 销售映射管理
   * @name LuteosProductSaleSkuRemoveSaleSkuRelation
   * @summary 删除销售映射关系
   * @request POST:/api/luteos/product/saleSku/removeSaleSkuRelation
   * @response `200` `CommonRespBoolean` OK
   */
  luteosProductSaleSkuRemoveSaleSkuRelation = (
    query?: {
      /** uniqueCode */
      uniqueCode?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespBoolean, any>({
      path: `/api/luteos/product/saleSku/removeSaleSkuRelation`,
      method: 'POST',
      query: query,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销售映射管理
   * @name LuteosProductSaleSkuSaveSaleSkuRelation
   * @summary 保存销售映射关系
   * @request POST:/api/luteos/product/saleSku/saveSaleSkuRelation
   * @response `200` `SaleSkuSaveResp` OK
   */
  luteosProductSaleSkuSaveSaleSkuRelation = (req: SaleSkuSaveReq, params: RequestParams = {}) =>
    this.request<SaleSkuSaveResp, any>({
      path: `/api/luteos/product/saleSku/saveSaleSkuRelation`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销售映射缺失管理
   * @name LuteosProductSaleSkuRelationMissExport
   * @summary 导出销售映射缺失
   * @request POST:/api/luteos/product/saleSkuRelationMiss/export
   * @response `200` `CommonExportResp` OK
   */
  luteosProductSaleSkuRelationMissExport = (
    req: SaleSkuRelationMissQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/product/saleSkuRelationMiss/export`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销售映射缺失管理
   * @name LuteosProductSaleSkuRelationMissQueryList
   * @summary 销售映射缺失列表查询
   * @request GET:/api/luteos/product/saleSkuRelationMiss/queryList
   * @response `200` `SaleSkuRelationMissQueryResp` OK
   */
  luteosProductSaleSkuRelationMissQueryList = (
    query: {
      /** 渠道 */
      channel?: string;
      /**
       * 是否查询当前运营：0：否 1：是
       * @format int32
       */
      currOperator?: number;
      /** 运营 */
      operator?: string;
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
      /** 渠道唯一标识 */
      saleSkuCode?: string;
      /** 站点 */
      site?: string;
      /**
       * 是否同步下载：0：否 1：是
       * @format int32
       */
      syncExport?: number;
      /** 类型 */
      type?: string;
      /** 唯一键集合 */
      uniqueCodeList?: string[];
      /** 店铺账号 */
      userAccount?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<SaleSkuRelationMissQueryResp, any>({
      path: `/api/luteos/product/saleSkuRelationMiss/queryList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品管理
   * @name LuteosProductSaveProduct
   * @summary 商品信息保存
   * @request POST:/api/luteos/product/saveProduct
   * @response `200` `ProductSaveResp` OK
   */
  luteosProductSaveProduct = (req: ProductSaveReq, params: RequestParams = {}) =>
    this.request<ProductSaveResp, any>({
      path: `/api/luteos/product/saveProduct`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags RPA在线商品
   * @name LuteosProductSellerSkuExportSellerSkuUnusualList
   * @summary 导出销售异常
   * @request GET:/api/luteos/product/seller/sku/exportSellerSkuUnusualList
   * @response `200` `CommonExportResp` OK
   */
  luteosProductSellerSkuExportSellerSkuUnusualList = (
    query: {
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
    this.request<CommonExportResp, any>({
      path: `/api/luteos/product/seller/sku/exportSellerSkuUnusualList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags RPA在线商品
   * @name LuteosProductSellerSkuOperateSellerSkuStatus
   * @summary 变更商品提醒状态
   * @request GET:/api/luteos/product/seller/sku/operateSellerSkuStatus
   * @response `200` `void` OK
   */
  luteosProductSellerSkuOperateSellerSkuStatus = (
    query: {
      /** 店铺渠道 */
      channel: string;
      /** 店铺sku */
      msku: string;
      /** 店铺账号 */
      shop: string;
      /**
       * 1-激活 0-关闭
       * @format int32
       */
      status: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/luteos/product/seller/sku/operateSellerSkuStatus`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags RPA在线商品
   * @name LuteosProductSellerSkuQuerySellerSkuUnusualList
   * @summary 查询销售异常
   * @request GET:/api/luteos/product/seller/sku/querySellerSkuUnusualList
   * @response `200` `ProductSellerSkuQueryResp` OK
   */
  luteosProductSellerSkuQuerySellerSkuUnusualList = (
    query: {
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
    this.request<ProductSellerSkuQueryResp, any>({
      path: `/api/luteos/product/seller/sku/querySellerSkuUnusualList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 敏感类型管理
   * @name LuteosProductSensitiveTypeConnectProduct
   * @summary 敏感类型关联商品
   * @request POST:/api/luteos/product/sensitiveType/connectProduct
   * @response `200` `CommonRespString` OK
   */
  luteosProductSensitiveTypeConnectProduct = (
    req: SensitiveTypeProductConnectReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/product/sensitiveType/connectProduct`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 敏感类型管理
   * @name LuteosProductSensitiveTypeExportSensitiveType
   * @summary 敏感类型信息导出
   * @request POST:/api/luteos/product/sensitiveType/exportSensitiveType
   * @response `200` `CommonExportResp` OK
   */
  luteosProductSensitiveTypeExportSensitiveType = (
    req: SensitiveTypeListQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/product/sensitiveType/exportSensitiveType`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 敏感类型管理
   * @name LuteosProductSensitiveTypeOperateSensitiveType
   * @summary 敏感类型操作
   * @request POST:/api/luteos/product/sensitiveType/operateSensitiveType
   * @response `200` `CommonRespString` OK
   */
  luteosProductSensitiveTypeOperateSensitiveType = (
    req: SensitiveTypeOperateReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/product/sensitiveType/operateSensitiveType`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 敏感类型管理
   * @name LuteosProductSensitiveTypeQuerySensitiveTypeDetail
   * @summary 敏感类型详情查询
   * @request GET:/api/luteos/product/sensitiveType/querySensitiveTypeDetail
   * @response `200` `SensitiveTypeDetailResp` OK
   */
  luteosProductSensitiveTypeQuerySensitiveTypeDetail = (
    query: {
      /** 敏感类型编码 */
      sensitiveTypeCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<SensitiveTypeDetailResp, any>({
      path: `/api/luteos/product/sensitiveType/querySensitiveTypeDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 敏感类型管理
   * @name LuteosProductSensitiveTypeQuerySensitiveTypeList
   * @summary 敏感类型列表查询
   * @request GET:/api/luteos/product/sensitiveType/querySensitiveTypeList
   * @response `200` `SensitiveTypeListQueryResp` OK
   */
  luteosProductSensitiveTypeQuerySensitiveTypeList = (
    query: {
      /** 勾选导出的编码 */
      codeList?: string[];
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
      /** 敏感类型编号 */
      sensitiveTypeCode?: string;
      /** 敏感类型名称 */
      sensitiveTypeName?: string;
      /** 敏感类型简码 */
      sensitiveTypeSimpleCode?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<SensitiveTypeListQueryResp, any>({
      path: `/api/luteos/product/sensitiveType/querySensitiveTypeList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 敏感类型管理
   * @name LuteosProductSensitiveTypeSaveOrUpdateSensitiveType
   * @summary 敏感类型信息保存
   * @request POST:/api/luteos/product/sensitiveType/saveOrUpdateSensitiveType
   * @response `200` `SensitiveTypeSaveResp` OK
   */
  luteosProductSensitiveTypeSaveOrUpdateSensitiveType = (
    req: SensitiveTypeSaveReq,
    params: RequestParams = {},
  ) =>
    this.request<SensitiveTypeSaveResp, any>({
      path: `/api/luteos/product/sensitiveType/saveOrUpdateSensitiveType`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 系列管理
   * @name LuteosProductSeriesConnectProduct
   * @summary 系列关联商品
   * @request POST:/api/luteos/product/series/connectProduct
   * @response `200` `CommonRespString` OK
   */
  luteosProductSeriesConnectProduct = (req: SeriesProductConnectReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/product/series/connectProduct`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 系列管理
   * @name LuteosProductSeriesExportSeries
   * @summary 系列信息导出
   * @request POST:/api/luteos/product/series/exportSeries
   * @response `200` `CommonExportResp` OK
   */
  luteosProductSeriesExportSeries = (req: SeriesListQueryReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/product/series/exportSeries`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 系列管理
   * @name LuteosProductSeriesOperateSeries
   * @summary 系列操作
   * @request POST:/api/luteos/product/series/operateSeries
   * @response `200` `CommonRespString` OK
   */
  luteosProductSeriesOperateSeries = (req: SeriesOperateReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/product/series/operateSeries`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 系列管理
   * @name LuteosProductSeriesQuerySeriesDetail
   * @summary 系列详情查询
   * @request GET:/api/luteos/product/series/querySeriesDetail
   * @response `200` `SeriesDetailResp` OK
   */
  luteosProductSeriesQuerySeriesDetail = (
    query: {
      /** 系列编码 */
      seriesCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<SeriesDetailResp, any>({
      path: `/api/luteos/product/series/querySeriesDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 系列管理
   * @name LuteosProductSeriesQuerySeriesList
   * @summary 系列列表查询
   * @request GET:/api/luteos/product/series/querySeriesList
   * @response `200` `SeriesListQueryResp` OK
   */
  luteosProductSeriesQuerySeriesList = (
    query: {
      /** 勾选导出的编码 */
      codeList?: string[];
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
      /** 系列编号 */
      seriesCode?: string;
      /** 系列名称 */
      seriesName?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<SeriesListQueryResp, any>({
      path: `/api/luteos/product/series/querySeriesList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 系列管理
   * @name LuteosProductSeriesSaveOrUpdateSeries
   * @summary 系列信息保存
   * @request POST:/api/luteos/product/series/saveOrUpdateSeries
   * @response `200` `SeriesSaveResp` OK
   */
  luteosProductSeriesSaveOrUpdateSeries = (req: SeriesSaveReq, params: RequestParams = {}) =>
    this.request<SeriesSaveResp, any>({
      path: `/api/luteos/product/series/saveOrUpdateSeries`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品管理
   * @name LuteosProductShadowSearch
   * @summary 产品影子查询
   * @request POST:/api/luteos/product/shadowSearch
   * @response `200` `CommonRespProductShadowSearchResp` OK
   */
  luteosProductShadowSearch = (req: ProductShadowSearchReq, params: RequestParams = {}) =>
    this.request<CommonRespProductShadowSearchResp, any>({
      path: `/api/luteos/product/shadowSearch`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品管理
   * @name LuteosProductShadowSearchStatisticsDetail
   * @summary 产品影子统计信息详情
   * @request POST:/api/luteos/product/shadowSearchStatisticsDetail
   * @response `200` `CommonRespProductShadowDetailStatisticsResp` OK
   */
  luteosProductShadowSearchStatisticsDetail = (
    req: ProductShadowDetailStaticsSearchReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespProductShadowDetailStatisticsResp, any>({
      path: `/api/luteos/product/shadowSearchStatisticsDetail`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 独立站在线商品
   * @name LuteosProductShopifyListingBatchModifyPlan
   * @summary 独立站-在线商父ASIN批量添加/更新计划人员
   * @request POST:/api/luteos/product/shopify/listing/batchModifyPlan
   * @deprecated
   * @response `200` `CommonRespObject` OK
   */
  luteosProductShopifyListingBatchModifyPlan = (
    req: ListingBatchModifyPlanReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/product/shopify/listing/batchModifyPlan`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 独立站在线商品
   * @name LuteosProductShopifyListingBatchSaveOperator
   * @summary 独立站-批量保存运营人员
   * @request POST:/api/luteos/product/shopify/listing/batchSaveOperator
   * @response `200` `CommonRespObject` OK
   */
  luteosProductShopifyListingBatchSaveOperator = (
    req: ShopifyBatchOperatorSaveReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/product/shopify/listing/batchSaveOperator`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 独立站在线商品
   * @name LuteosProductShopifyListingDownload
   * @summary 独立站-在线商品导出-V2
   * @request POST:/api/luteos/product/shopify/listing/download
   * @response `200` `CommonExportResp` OK
   */
  luteosProductShopifyListingDownload = (
    req: ShopifyProductListingReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/product/shopify/listing/download`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 独立站在线商品
   * @name LuteosProductShopifyListingListingDownload
   * @summary 独立站父子维度导出
   * @request POST:/api/luteos/product/shopify/listing/listing/download
   * @deprecated
   * @response `200` `CommonExportResp` OK
   */
  luteosProductShopifyListingListingDownload = (
    req: ShopifyListingReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/product/shopify/listing/listing/download`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 独立站在线商品
   * @name LuteosProductShopifyListingListingQueryTag
   * @summary 亚马逊在线商品父维度标签查询
   * @request POST:/api/luteos/product/shopify/listing/listing/queryTag
   * @deprecated
   * @response `200` `ListingTagResp` OK
   */
  luteosProductShopifyListingListingQueryTag = (
    req: ListingQueryTagReq,
    params: RequestParams = {},
  ) =>
    this.request<ListingTagResp, any>({
      path: `/api/luteos/product/shopify/listing/listing/queryTag`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 独立站在线商品
   * @name LuteosProductShopifyListingListingUpdateTag
   * @summary 独立站商品父子维度标签保存更新
   * @request POST:/api/luteos/product/shopify/listing/listing/updateTag
   * @deprecated
   * @response `200` `CommonRespObject` OK
   */
  luteosProductShopifyListingListingUpdateTag = (
    req: ListingBatchModifyTagReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/product/shopify/listing/listing/updateTag`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 独立站在线商品
   * @name LuteosProductShopifyListingQueryParentProductIdPage
   * @summary 独立站-在线商品ProductId分页查询
   * @request POST:/api/luteos/product/shopify/listing/queryParentProductIdPage
   * @deprecated
   * @response `200` `ShopifyListingParentResp` OK
   */
  luteosProductShopifyListingQueryParentProductIdPage = (
    req: ShopifyListingReq,
    params: RequestParams = {},
  ) =>
    this.request<ShopifyListingParentResp, any>({
      path: `/api/luteos/product/shopify/listing/queryParentProductIdPage`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 独立站在线商品
   * @name LuteosProductShopifyListingQueryProductListingPage
   * @summary 独立站-在线商品分页查询-V2
   * @request POST:/api/luteos/product/shopify/listing/queryProductListingPage
   * @response `200` `ShopifyProductListingResp` OK
   */
  luteosProductShopifyListingQueryProductListingPage = (
    req: ShopifyProductListingReq,
    params: RequestParams = {},
  ) =>
    this.request<ShopifyProductListingResp, any>({
      path: `/api/luteos/product/shopify/listing/queryProductListingPage`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 独立站在线商品
   * @name LuteosProductShopifyListingQuerySonVariantIdPage
   * @summary 独立站-在线商品子维度分页查询
   * @request POST:/api/luteos/product/shopify/listing/querySonVariantIdPage
   * @deprecated
   * @response `200` `ShopifySonListingResp` OK
   */
  luteosProductShopifyListingQuerySonVariantIdPage = (
    req: ShopifyListingReq,
    params: RequestParams = {},
  ) =>
    this.request<ShopifySonListingResp, any>({
      path: `/api/luteos/product/shopify/listing/querySonVariantIdPage`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 独立站在线商品
   * @name LuteosProductShopifyListingSaveOperator
   * @summary 独立站-在线商品保存运营人员
   * @request POST:/api/luteos/product/shopify/listing/saveOperator
   * @response `200` `CommonRespObject` OK
   */
  luteosProductShopifyListingSaveOperator = (
    req: ShopifyOperatorSaveReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/product/shopify/listing/saveOperator`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 独立站在线商品
   * @name LuteosProductShopifyListingSaveProductLink
   * @summary 独立站-在线商品保存商品链接
   * @request POST:/api/luteos/product/shopify/listing/saveProductLink
   * @deprecated
   * @response `200` `CommonRespObject` OK
   */
  luteosProductShopifyListingSaveProductLink = (
    req: ProductLinkSaveReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/product/shopify/listing/saveProductLink`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品管理
   * @name LuteosProductShowSearch
   * @summary 产品表现查询
   * @request POST:/api/luteos/product/showSearch
   * @response `200` `CommonRespProductShowSearchResp` OK
   */
  luteosProductShowSearch = (req: ProductShowSearchReq, params: RequestParams = {}) =>
    this.request<CommonRespProductShowSearchResp, any>({
      path: `/api/luteos/product/showSearch`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品管理
   * @name LuteosProductShowSearchDetail
   * @summary 产品表现详情
   * @request POST:/api/luteos/product/showSearchDetail
   * @response `200` `CommonRespProductShowDetailSearchResp` OK
   */
  luteosProductShowSearchDetail = (req: ProductShowDetailSearchReq, params: RequestParams = {}) =>
    this.request<CommonRespProductShowDetailSearchResp, any>({
      path: `/api/luteos/product/showSearchDetail`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品管理
   * @name LuteosProductShowSearchStatisticsDetail
   * @summary 产品表现统计信息详情
   * @request POST:/api/luteos/product/showSearchStatisticsDetail
   * @response `200` `CommonRespProductShowDetailStatisticsResp` OK
   */
  luteosProductShowSearchStatisticsDetail = (
    req: ProductShowDetailStaticsSearchReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespProductShowDetailStatisticsResp, any>({
      path: `/api/luteos/product/showSearchStatisticsDetail`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品SKU管理
   * @name LuteosProductSkuBatchOperate
   * @summary 商品sku批量操作
   * @request POST:/api/luteos/product/sku/batchOperate
   * @response `200` `CommonRespBoolean` OK
   */
  luteosProductSkuBatchOperate = (req: ProductSkuBatchOpeReq, params: RequestParams = {}) =>
    this.request<CommonRespBoolean, any>({
      path: `/api/luteos/product/sku/batchOperate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 店铺SKU管理
   * @name LuteosProductSkuExportPlatformSku
   * @summary 导出店铺SKU
   * @request POST:/api/luteos/product/sku/exportPlatformSku
   * @response `200` `void` OK
   */
  luteosProductSkuExportPlatformSku = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/luteos/product/sku/exportPlatformSku`,
      method: 'POST',
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品SKU管理
   * @name LuteosProductSkuExportProduct
   * @summary 商品Sku导出信息
   * @request POST:/api/luteos/product/sku/exportProduct
   * @response `200` `CommonExportResp` OK
   */
  luteosProductSkuExportProduct = (req: ProductSkuListQueryReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/product/sku/exportProduct`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品SKU管理
   * @name LuteosProductSkuExportProductSkuCertification
   * @summary 商品Sku证信息导出
   * @request POST:/api/luteos/product/sku/exportProductSkuCertification
   * @response `200` `CommonExportResp` OK
   */
  luteosProductSkuExportProductSkuCertification = (
    req: ProductSkuCertificationListReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/product/sku/exportProductSkuCertification`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品映射
   * @name LuteosProductSkuMappingClear
   * @summary 清除映射
   * @request POST:/api/luteos/product/sku/mapping/clear
   * @response `200` `CommonRespVoid` OK
   */
  luteosProductSkuMappingClear = (req: ProductSkuMappingClearReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/product/sku/mapping/clear`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品映射
   * @name LuteosProductSkuMappingExportList
   * @summary 导出列表
   * @request POST:/api/luteos/product/sku/mapping/exportList
   * @response `200` `CommonRespCommonExportResp` OK
   */
  luteosProductSkuMappingExportList = (
    req: ProductSkuMappingQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/luteos/product/sku/mapping/exportList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品映射
   * @name LuteosProductSkuMappingQueryList
   * @summary 列表查询
   * @request POST:/api/luteos/product/sku/mapping/queryList
   * @response `200` `CommonRespProductSkuMappingQueryResp` OK
   */
  luteosProductSkuMappingQueryList = (req: ProductSkuMappingQueryReq, params: RequestParams = {}) =>
    this.request<CommonRespProductSkuMappingQueryResp, any>({
      path: `/api/luteos/product/sku/mapping/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品映射
   * @name LuteosProductSkuMappingUpdate
   * @summary 编辑
   * @request POST:/api/luteos/product/sku/mapping/update
   * @response `200` `CommonRespVoid` OK
   */
  luteosProductSkuMappingUpdate = (req: ProductSkuMappingUpdateReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/product/sku/mapping/update`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品SKU管理
   * @name LuteosProductSkuProductSkuCertificationSyncJob
   * @summary 商品Sku证信息同步
   * @request GET:/api/luteos/product/sku/productSkuCertificationSyncJob
   * @response `200` `void` OK
   */
  luteosProductSkuProductSkuCertificationSyncJob = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/luteos/product/sku/productSkuCertificationSyncJob`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品SKU管理
   * @name LuteosProductSkuProductSkuOperate
   * @summary 商品sku操作
   * @request POST:/api/luteos/product/sku/productSkuOperate
   * @response `200` `CommonRespBoolean` OK
   */
  luteosProductSkuProductSkuOperate = (req: ProductSkuOperateReq, params: RequestParams = {}) =>
    this.request<CommonRespBoolean, any>({
      path: `/api/luteos/product/sku/productSkuOperate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品SKU管理
   * @name LuteosProductSkuProductSkuSyncCrm
   * @summary 测试接口-产品信息同步CRM
   * @request POST:/api/luteos/product/sku/productSkuSyncCrm
   * @response `200` `CommonRespObject` OK
   */
  luteosProductSkuProductSkuSyncCrm = (
    query: {
      /** skuCodeList */
      skuCodeList: string[];
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/product/sku/productSkuSyncCrm`,
      method: 'POST',
      query: query,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品SKU管理
   * @name LuteosProductSkuQueryCountry
   * @summary 销售区域查询
   * @request GET:/api/luteos/product/sku/queryCountry
   * @response `200` `(CountryAreaListResp)[]` OK
   */
  luteosProductSkuQueryCountry = (params: RequestParams = {}) =>
    this.request<CountryAreaListResp[], any>({
      path: `/api/luteos/product/sku/queryCountry`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品SKU管理
   * @name LuteosProductSkuQueryDeptOrMember
   * @summary SKU提醒部门或人员查询
   * @request GET:/api/luteos/product/sku/queryDeptOrMember
   * @response `200` `Record<string,string>` OK
   */
  luteosProductSkuQueryDeptOrMember = (
    query: {
      /** 部门或人员名称 */
      name?: string;
      /**
       * 通知类型：1：采购，2：报关，3：清关
       * @format int32
       */
      noticeType?: number;
      /** SKU名称集合 */
      skuCodeNames?: string[];
      /** SKU编码集合 */
      skuCodes?: string[];
      /**
       * 通知类型：1：部门，2：人员
       * @format int32
       */
      type: number;
      /** 部门或人员ID */
      userIdList?: string[];
    },
    params: RequestParams = {},
  ) =>
    this.request<Record<string, string>, any>({
      path: `/api/luteos/product/sku/queryDeptOrMember`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品SKU管理
   * @name LuteosProductSkuQueryMSkuRelationList
   * @summary 商品sku详情-店铺sku映射查询
   * @request GET:/api/luteos/product/sku/queryMSkuRelationList
   * @response `200` `MSkuRelationListResp` OK
   */
  luteosProductSkuQueryMSkuRelationList = (
    query: {
      /** 操作类型。detail:详情，update:编辑，delete：删除 */
      operationType: string;
      /** sku编码 */
      skuCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<MSkuRelationListResp, any>({
      path: `/api/luteos/product/sku/queryMSkuRelationList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 店铺SKU管理
   * @name LuteosProductSkuQueryPlatformSkuDetail
   * @summary 店铺SKU详情查询
   * @request GET:/api/luteos/product/sku/queryPlatformSkuDetail
   * @response `200` `void` OK
   */
  luteosProductSkuQueryPlatformSkuDetail = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/luteos/product/sku/queryPlatformSkuDetail`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 店铺SKU管理
   * @name LuteosProductSkuQueryPlatformSkuList
   * @summary 店铺SKU列表查询
   * @request GET:/api/luteos/product/sku/queryPlatformSkuList
   * @response `200` `void` OK
   */
  luteosProductSkuQueryPlatformSkuList = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/luteos/product/sku/queryPlatformSkuList`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品SKU管理
   * @name LuteosProductSkuQueryProductSkuPerfection
   * @summary 获取商品sku列表信息完善度
   * @request GET:/api/luteos/product/sku/queryProductSku/perfection
   * @response `200` `ProductSkuPerfectionQueryResp` OK
   */
  luteosProductSkuQueryProductSkuPerfection = (params: RequestParams = {}) =>
    this.request<ProductSkuPerfectionQueryResp, any>({
      path: `/api/luteos/product/sku/queryProductSku/perfection`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品SKU管理
   * @name LuteosProductSkuQueryProductSkuDetail
   * @summary 商品sku详情查询
   * @request GET:/api/luteos/product/sku/queryProductSkuDetail
   * @response `200` `ProductSkuDetailResp` OK
   */
  luteosProductSkuQueryProductSkuDetail = (
    query: {
      /** 操作类型。detail:详情，update:编辑，delete：删除 */
      operationType: string;
      /** sku编码 */
      skuCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<ProductSkuDetailResp, any>({
      path: `/api/luteos/product/sku/queryProductSkuDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品SKU管理
   * @name LuteosProductSkuQueryProductSkuList
   * @summary 商品sku列表查询
   * @request GET:/api/luteos/product/sku/queryProductSkuList
   * @response `200` `ProductSkuListQueryResp` OK
   */
  luteosProductSkuQueryProductSkuList = (
    query: {
      /** 创建时间排序,默认false */
      asc?: boolean;
      /** 品牌code */
      brandCode?: string;
      /** 品牌-批量 */
      brandListWeb?: string[];
      /** 分类编码，如果传分类编码，分类等级一定要赋值 */
      categoryCode?: string;
      /** 产品分类-批量 */
      categoryListWeb?: string[];
      /** 勾选导出的编码 */
      codeList?: string[];
      /** 查询库存用的countryCode */
      countryCode?: string;
      /**
       * 创建时间-结束
       * @format date-time
       */
      createTimeEnd?: string;
      /**
       * 创建时间-开始
       * @format date-time
       */
      createTimeStart?: string;
      /** currencyCode */
      currencyCode?: string;
      /** 客户编码 */
      customerCode?: string;
      /** 发货方法 1-FBA 2-中仓直发 3-海外仓直发 */
      deliveryCode?: string;
      /** 通过易仓SKU查出来的SkuCode */
      eccangSkuCodeList?: string[];
      /**
       * 导出文件类型。1： 所有信息；2： 采购信息；3： 报关/清关信息；4： 供应链SKU信息
       * @format int32
       */
      exportType?: number;
      /** SKU缺失信息 0-缺失图片,1-是否含有电池为空 */
      hasMissing?: number[];
      /** 关键词 */
      keyWord?: string;
      /**
       * 分类等级，如果传分类编码，分类等级一定要赋值
       * @format int32
       * @min 1
       * @exclusiveMin false
       * @max 5
       * @exclusiveMax false
       */
      level?: number;
      /** 排序字段,默认updateTime,createTime */
      orderBy?: string;
      orderByClause?: string;
      /**
       * 0-红人发样 1-线下订单
       * @format int32
       */
      orderType?: number;
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
      /** 品线 */
      productLine?: string;
      /** 产品品线-批量 */
      productLineListWeb?: string[];
      /** 产品经理编码 */
      productManagerCode?: string;
      /** 产品经理-批量 */
      productManagerListWeb?: string[];
      /** 商品spu或者物料编码 */
      productSpu?: string;
      /** 商品spu或者物料编码 */
      productSpus?: string[];
      /**
       * 商品类型1：产品；2：物料 3-用研产品 12-配件 13-组合产品 14-虚拟产品
       * @format int32
       */
      productType?: number;
      /** 销售区域 */
      saleRegionList?: string[];
      /** 查询erp报价定价 */
      searchErpQuotation?: boolean;
      /** 查询库存 */
      searchInventory?: boolean;
      /**
       * 商品sku状态 0-未上架 1-在销售 2-清仓中 3-待报废 4-已退市
       * @format int32
       */
      status?: number;
      /** 商品sku状态 0-未上架 1-在销售 2-清仓中 3-待报废 4-已退市 */
      statuses?: string;
      statusList?: number[];
      /** 状态-批量 */
      statusListWeb?: string[];
      /** 标签编码 */
      tagCode?: string;
      /** sku/产品分类标签-批量 */
      tagListWeb?: string[];
    },
    params: RequestParams = {},
  ) =>
    this.request<ProductSkuListQueryResp, any>({
      path: `/api/luteos/product/sku/queryProductSkuList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品SKU管理
   * @name LuteosProductSkuQuerySkuCertificationList
   * @summary 商品Sku认证信息查询
   * @request POST:/api/luteos/product/sku/querySkuCertificationList
   * @response `200` `ProductSkuCertificationListResp` OK
   */
  luteosProductSkuQuerySkuCertificationList = (
    req: ProductSkuCertificationListReq,
    params: RequestParams = {},
  ) =>
    this.request<ProductSkuCertificationListResp, any>({
      path: `/api/luteos/product/sku/querySkuCertificationList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品SKU管理
   * @name LuteosProductSkuQuerySkuDefaultSpec
   * @summary 商品sku默认供应链规格查询
   * @request GET:/api/luteos/product/sku/querySkuDefaultSpec
   * @response `200` `SupplySkuSpecResp` OK
   */
  luteosProductSkuQuerySkuDefaultSpec = (
    query: {
      /** 操作类型。detail:详情，update:编辑，delete：删除 */
      operationType: string;
      /** sku编码 */
      skuCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<SupplySkuSpecResp, any>({
      path: `/api/luteos/product/sku/querySkuDefaultSpec`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品SKU管理
   * @name LuteosProductSkuQuerySkuInfo
   * @summary 商品sku信息查询
   * @request GET:/api/luteos/product/sku/querySkuInfo
   * @response `200` `ProductSkuInfoResp` OK
   */
  luteosProductSkuQuerySkuInfo = (
    query: {
      /** 商品sku编码 */
      skuCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<ProductSkuInfoResp, any>({
      path: `/api/luteos/product/sku/querySkuInfo`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品SKU管理
   * @name LuteosProductSkuQuerySupplierSkuList
   * @summary 供应链sku列表查询
   * @request GET:/api/luteos/product/sku/querySupplierSkuList
   * @response `200` `SupplierSkuListQueryResp` OK
   */
  luteosProductSkuQuerySupplierSkuList = (
    query: {
      /** 分类编码，如果传分类编码，分类等级一定要赋值 */
      categoryCode?: string;
      /** 关键词 */
      keyWord?: string;
      /**
       * 分类等级，如果传分类编码，分类等级一定要赋值
       * @format int32
       * @min 1
       * @exclusiveMin false
       * @max 5
       * @exclusiveMax false
       */
      level?: number;
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
    this.request<SupplierSkuListQueryResp, any>({
      path: `/api/luteos/product/sku/querySupplierSkuList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品SKU管理
   * @name LuteosProductSkuQuerySupplySkuList
   * @summary 商品Sku 关联供应链SKU查询并返回库存
   * @request GET:/api/luteos/product/sku/querySupplySkuList
   * @response `200` `SupplySkuQueryResp` OK
   */
  luteosProductSkuQuerySupplySkuList = (
    query: {
      /**
       * deliverType
       * @format int32
       */
      deliverType: number;
      /** skuCode */
      skuCode: string;
      /** warehouseCode */
      warehouseCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<SupplySkuQueryResp, any>({
      path: `/api/luteos/product/sku/querySupplySkuList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 店铺SKU管理
   * @name LuteosProductSkuQueryUserAccount
   * @summary 查询店铺账户
   * @request GET:/api/luteos/product/sku/queryUserAccount
   * @response `200` `ShopUserAccountResp` OK
   */
  luteosProductSkuQueryUserAccount = (
    query: {
      /** 渠道 */
      channel: string;
      /** 店铺 */
      shop: string;
      /** 站点 */
      site?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<ShopUserAccountResp, any>({
      path: `/api/luteos/product/sku/queryUserAccount`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 店铺SKU管理
   * @name LuteosProductSkuQueryUserAccountList
   * @summary 查询店铺账户集合
   * @request GET:/api/luteos/product/sku/queryUserAccountList
   * @response `200` `ShopUserAccountListResp` OK
   */
  luteosProductSkuQueryUserAccountList = (
    query: {
      /** 渠道 */
      channel: string;
      /** 站点 */
      site: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<ShopUserAccountListResp, any>({
      path: `/api/luteos/product/sku/queryUserAccountList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 店铺SKU管理
   * @name LuteosProductSkuSavePlatformSkuRelation
   * @summary 保存店铺SKU关系
   * @request POST:/api/luteos/product/sku/savePlatformSkuRelation
   * @response `200` `void` OK
   */
  luteosProductSkuSavePlatformSkuRelation = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/luteos/product/sku/savePlatformSkuRelation`,
      method: 'POST',
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品SKU管理
   * @name LuteosProductSkuSaveSku
   * @summary 商品sku保存
   * @request POST:/api/luteos/product/sku/saveSku
   * @response `200` `ProductSkuSaveResp` OK
   */
  luteosProductSkuSaveSku = (req: ProductSkuSaveReq, params: RequestParams = {}) =>
    this.request<ProductSkuSaveResp, any>({
      path: `/api/luteos/product/sku/saveSku`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品SKU管理
   * @name LuteosProductSkuSaveWorkflowRecord
   * @summary 生成SKU信息补充提醒工单
   * @request POST:/api/luteos/product/sku/saveWorkflowRecord
   * @response `200` `WorkflowSubmitResp` OK
   */
  luteosProductSkuSaveWorkflowRecord = (req: ProductSkuNotifyReq, params: RequestParams = {}) =>
    this.request<WorkflowSubmitResp, any>({
      path: `/api/luteos/product/sku/saveWorkflowRecord`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品SKU管理
   * @name LuteosProductSkuSmaSkuQueryList
   * @summary 查询预测SKU维度添加商品
   * @request POST:/api/luteos/product/sku/smaSkuQueryList
   * @response `200` `SmaSkuQueryListResp` OK
   */
  luteosProductSkuSmaSkuQueryList = (req: SmaSkuQueryListReq, params: RequestParams = {}) =>
    this.request<SmaSkuQueryListResp, any>({
      path: `/api/luteos/product/sku/smaSkuQueryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品供应商管理
   * @name LuteosProductSkuSnExportSkuSn
   * @summary 商品供应商导出信息
   * @request POST:/api/luteos/product/sku/sn/exportSkuSn
   * @response `200` `CommonExportResp` OK
   */
  luteosProductSkuSnExportSkuSn = (req: SkuSnQueryReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/product/sku/sn/exportSkuSn`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品供应商管理
   * @name LuteosProductSkuSnQuerySkuSnList
   * @summary 商品供应商列表查询
   * @request GET:/api/luteos/product/sku/sn/querySkuSnList
   * @response `200` `SkuSnQueryResp` OK
   */
  luteosProductSkuSnQuerySkuSnList = (
    query: {
      /** 产品SKU名称/产品SKU/产品SPU */
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
      /** SN码 */
      snCode?: string;
      supplierCode?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<SkuSnQueryResp, any>({
      path: `/api/luteos/product/sku/sn/querySkuSnList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品供应商管理
   * @name LuteosProductSkuSnSaveSkuSn
   * @summary SN码创建
   * @request POST:/api/luteos/product/sku/sn/saveSkuSn
   * @response `200` `CommonRespObject` OK
   */
  luteosProductSkuSnSaveSkuSn = (req: SkuSnSaveReq, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/product/sku/sn/saveSkuSn`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品SKU管理
   * @name LuteosProductSkuUploadSkuImg
   * @summary 上传sku图片
   * @request POST:/api/luteos/product/sku/uploadSkuImg
   * @response `200` `CommonRespObject` OK
   */
  luteosProductSkuUploadSkuImg = (
    query: {
      /** fileName */
      fileName: string;
      /** fileUrl */
      fileUrl: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/product/sku/uploadSkuImg`,
      method: 'POST',
      query: query,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品中心数据统计
   * @name LuteosProductStatsQueryMemberCenterStats
   * @summary 个人中心数据统计
   * @request GET:/api/luteos/product/stats/queryMemberCenterStats
   * @response `200` `MemberCenterStatsQueryResp` OK
   */
  luteosProductStatsQueryMemberCenterStats = (params: RequestParams = {}) =>
    this.request<MemberCenterStatsQueryResp, any>({
      path: `/api/luteos/product/stats/queryMemberCenterStats`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 供应链SKU管理
   * @name LuteosProductSupplySkuExportSupplySku
   * @summary 供应链sku导出
   * @request POST:/api/luteos/product/supplySku/exportSupplySku
   * @response `200` `CommonExportResp` OK
   */
  luteosProductSupplySkuExportSupplySku = (
    req: SupplySkuListQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/product/supplySku/exportSupplySku`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 供应链SKU管理
   * @name LuteosProductSupplySkuExportSupplySkuList
   * @summary 供应链sku列表导出
   * @request POST:/api/luteos/product/supplySku/exportSupplySkuList
   * @response `200` `CommonExportResp` OK
   */
  luteosProductSupplySkuExportSupplySkuList = (
    req: SupplySkuListQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/product/supplySku/exportSupplySkuList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 供应链SKU管理
   * @name LuteosProductSupplySkuOperateSupplySku
   * @summary 供应链sku操作
   * @request POST:/api/luteos/product/supplySku/operateSupplySku
   * @response `200` `SupplySkuCommonResp` OK
   */
  luteosProductSupplySkuOperateSupplySku = (req: SupplySkuOperateReq, params: RequestParams = {}) =>
    this.request<SupplySkuCommonResp, any>({
      path: `/api/luteos/product/supplySku/operateSupplySku`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 供应链SKU管理
   * @name LuteosProductSupplySkuQueryGtmMemberList
   * @summary 费用归属人列表
   * @request GET:/api/luteos/product/supplySku/queryGtmMemberList
   * @response `200` `DeptMemberListQueryResp` OK
   */
  luteosProductSupplySkuQueryGtmMemberList = (params: RequestParams = {}) =>
    this.request<DeptMemberListQueryResp, any>({
      path: `/api/luteos/product/supplySku/queryGtmMemberList`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 供应链SKU管理
   * @name LuteosProductSupplySkuQueryProductLineList
   * @summary 费用归属品线列表
   * @request GET:/api/luteos/product/supplySku/queryProductLineList
   * @response `200` `FinanceProductLineListResp` OK
   */
  luteosProductSupplySkuQueryProductLineList = (params: RequestParams = {}) =>
    this.request<FinanceProductLineListResp, any>({
      path: `/api/luteos/product/supplySku/queryProductLineList`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 供应链SKU管理
   * @name LuteosProductSupplySkuQuerySupplyPurchaserList
   * @summary 采购员信息查询
   * @request GET:/api/luteos/product/supplySku/querySupplyPurchaserList
   * @response `200` `SupplyPurchaserResp` OK
   */
  luteosProductSupplySkuQuerySupplyPurchaserList = (params: RequestParams = {}) =>
    this.request<SupplyPurchaserResp, any>({
      path: `/api/luteos/product/supplySku/querySupplyPurchaserList`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 供应链SKU管理
   * @name LuteosProductSupplySkuQuerySupplySkuPerfection
   * @summary 获取供应链sku信息完整度
   * @request GET:/api/luteos/product/supplySku/querySupplySku/perfection
   * @response `200` `SupplySkuPerfectionQueryResp` OK
   */
  luteosProductSupplySkuQuerySupplySkuPerfection = (params: RequestParams = {}) =>
    this.request<SupplySkuPerfectionQueryResp, any>({
      path: `/api/luteos/product/supplySku/querySupplySku/perfection`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 供应链SKU管理
   * @name LuteosProductSupplySkuQuerySupplySkuDetail
   * @summary 供应链sku详情
   * @request GET:/api/luteos/product/supplySku/querySupplySkuDetail
   * @response `200` `SupplySkuDetailResp` OK
   */
  luteosProductSupplySkuQuerySupplySkuDetail = (
    query: {
      /** 供应链SKU */
      productSku: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<SupplySkuDetailResp, any>({
      path: `/api/luteos/product/supplySku/querySupplySkuDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 供应链SKU管理
   * @name LuteosProductSupplySkuQuerySupplySkuList
   * @summary 供应链sku列表查询
   * @request GET:/api/luteos/product/supplySku/querySupplySkuList
   * @response `200` `SupplySkuListQueryResp` OK
   */
  luteosProductSupplySkuQuerySupplySkuList = (
    query: {
      /** 国家编码 */
      countryCode?: string;
      /** 发货方法 1-FBA 2-中仓直发 3-海外仓直发 */
      deliveryCode?: string;
      /**
       * 导出文件类型。1： 供应链SKU产品类型所有信息；2：其他类型供应链SKU信息导出
       * @format int32
       */
      exportType?: number;
      /** 关键字 供应链产品名称/SKU */
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
      /** 排除供应链sku */
      productSkuList?: string[];
      /**
       * 产品状态: 0:不可用,1:可用,2:开发产品
       * @format int32
       */
      productStatus?: number;
      /**
       * 产品类型 1：产品；2：物料 3：用研产品
       * @format int32
       */
      productType?: number;
      /** 产品类型集合 */
      productTypeList?: number[];
      /** 采购人 */
      purchaser?: string;
      /**
       * 销售状态
       * @format int32
       */
      saleStatus?: number;
      /** 是否查询库存 */
      searchInventory?: boolean;
      /** 供应商代码 */
      supplierCode?: string;
      /** 供应商代码集合 */
      supplierCodeList?: string[];
      /** 排除产品类型 */
      unProductTypeList?: number[];
    },
    params: RequestParams = {},
  ) =>
    this.request<SupplySkuListQueryResp, any>({
      path: `/api/luteos/product/supplySku/querySupplySkuList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 供应链SKU管理
   * @name LuteosProductSupplySkuSaveSupplySku
   * @summary 供应链sku保存
   * @request POST:/api/luteos/product/supplySku/saveSupplySku
   * @response `200` `SupplySkuCommonResp` OK
   */
  luteosProductSupplySkuSaveSupplySku = (req: SupplySkuSaveReq, params: RequestParams = {}) =>
    this.request<SupplySkuCommonResp, any>({
      path: `/api/luteos/product/supplySku/saveSupplySku`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 标签分类管理
   * @name LuteosProductTagCategoryCreateCategory
   * @summary 创建标签分类
   * @request POST:/api/luteos/product/tag/category/createCategory
   * @response `200` `CreateCategoryResp` OK
   */
  luteosProductTagCategoryCreateCategory = (req: CreateCategoryReq, params: RequestParams = {}) =>
    this.request<CreateCategoryResp, any>({
      path: `/api/luteos/product/tag/category/createCategory`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description codeList为空时按照categoryName进行查询，codeList不为空时按照codeList查询
   *
   * @tags 标签分类管理
   * @name LuteosProductTagCategoryExport
   * @summary 导出标签分类
   * @request POST:/api/luteos/product/tag/category/export
   * @response `200` `CommonExportResp` OK
   */
  luteosProductTagCategoryExport = (req: CategoryListQueryReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/product/tag/category/export`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 传入categoryCode，返回其下一级分类节点列表
   *
   * @tags 标签分类管理
   * @name LuteosProductTagCategoryQueryChildren
   * @summary 根据分类编码查询下一级子节点
   * @request GET:/api/luteos/product/tag/category/queryChildren
   * @response `200` `CategoryChildrenQueryResp` OK
   */
  luteosProductTagCategoryQueryChildren = (
    query: {
      /** categoryCode */
      categoryCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CategoryChildrenQueryResp, any>({
      path: `/api/luteos/product/tag/category/queryChildren`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * @description 无参时返回整个树结构；传入categoryName时，根据分类名称模糊查询，返回匹配的分类及其所有父级分类的树结构
   *
   * @tags 标签分类管理
   * @name LuteosProductTagCategoryQueryTree
   * @summary 查询标签分类树
   * @request GET:/api/luteos/product/tag/category/queryTree
   * @response `200` `CategoryTreeResp` OK
   */
  luteosProductTagCategoryQueryTree = (
    query?: {
      /** categoryName */
      categoryName?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CategoryTreeResp, any>({
      path: `/api/luteos/product/tag/category/queryTree`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 标签分类管理
   * @name LuteosProductTagCategoryQueyCategoryList
   * @summary 查询标签分类列表
   * @request GET:/api/luteos/product/tag/category/queyCategoryList
   * @response `200` `CategoryListQueryResp` OK
   */
  luteosProductTagCategoryQueyCategoryList = (
    query: {
      /** 分类名称 */
      categoryName?: string;
      /** 标签组编码 */
      codeList?: string[];
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
    this.request<CategoryListQueryResp, any>({
      path: `/api/luteos/product/tag/category/queyCategoryList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 标签分类管理
   * @name LuteosProductTagCategoryUpdateCategory
   * @summary 更新标签分类
   * @request POST:/api/luteos/product/tag/category/updateCategory
   * @response `200` `UpdateCategoryResp` OK
   */
  luteosProductTagCategoryUpdateCategory = (req: UpdateCategoryReq, params: RequestParams = {}) =>
    this.request<UpdateCategoryResp, any>({
      path: `/api/luteos/product/tag/category/updateCategory`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 标签管理
   * @name LuteosProductTagConnectProduct
   * @summary 标签关联商品
   * @request POST:/api/luteos/product/tag/connectProduct
   * @response `200` `CommonRespBoolean` OK
   */
  luteosProductTagConnectProduct = (req: TagProductConnectReq, params: RequestParams = {}) =>
    this.request<CommonRespBoolean, any>({
      path: `/api/luteos/product/tag/connectProduct`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 标签管理
   * @name LuteosProductTagExportTag
   * @summary 标签信息导出
   * @request POST:/api/luteos/product/tag/exportTag
   * @response `200` `CommonExportResp` OK
   */
  luteosProductTagExportTag = (req: TagListQueryReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/product/tag/exportTag`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 标签管理
   * @name LuteosProductTagOperateTag
   * @summary 标签操作
   * @request POST:/api/luteos/product/tag/operateTag
   * @response `200` `CommonRespBoolean` OK
   */
  luteosProductTagOperateTag = (req: TagOperateReq, params: RequestParams = {}) =>
    this.request<CommonRespBoolean, any>({
      path: `/api/luteos/product/tag/operateTag`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 标签管理
   * @name LuteosProductTagQueryTagDetail
   * @summary 标签详情查询
   * @request GET:/api/luteos/product/tag/queryTagDetail
   * @response `200` `TagDetailResp` OK
   */
  luteosProductTagQueryTagDetail = (
    query: {
      /** 标签编码 */
      tagCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<TagDetailResp, any>({
      path: `/api/luteos/product/tag/queryTagDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 标签管理
   * @name LuteosProductTagQueryTagList
   * @summary 标签列表查询
   * @request GET:/api/luteos/product/tag/queryTagList
   * @response `200` `TagListQueryResp` OK
   */
  luteosProductTagQueryTagList = (
    query: {
      /** 标签分组码 */
      categoryCode?: string;
      /** 标签分组名 */
      categoryName?: string;
      /** 勾选导出的编码 */
      codeList?: string[];
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
      /** 标签编号 */
      tagCode?: string;
      /** 标签名称 */
      tagName?: string;
      /** 标签类型: 不传是spu, sku, category */
      tagType?: string;
      /** 标签类型列表 */
      tagTypeList?: string[];
    },
    params: RequestParams = {},
  ) =>
    this.request<TagListQueryResp, any>({
      path: `/api/luteos/product/tag/queryTagList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 标签管理
   * @name LuteosProductTagQueryTagProduct
   * @summary 查询标签关联商品
   * @request GET:/api/luteos/product/tag/queryTagProduct
   * @response `200` `TagProductResp` OK
   */
  luteosProductTagQueryTagProduct = (
    query: {
      /** 商品spu 名称 */
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
      /** 标签编码 */
      tagCode?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<TagProductResp, any>({
      path: `/api/luteos/product/tag/queryTagProduct`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 标签管理
   * @name LuteosProductTagSaveOrUpdateTag
   * @summary 标签信息保存
   * @request POST:/api/luteos/product/tag/saveOrUpdateTag
   * @response `200` `TagSaveResp` OK
   */
  luteosProductTagSaveOrUpdateTag = (req: TagSaveReq, params: RequestParams = {}) =>
    this.request<TagSaveResp, any>({
      path: `/api/luteos/product/tag/saveOrUpdateTag`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags TK周报模块
   * @name LuteosProductTiktokExportMetaTiktokSumList
   * @summary tiktok-机构达人汇总导出
   * @request POST:/api/luteos/product/tiktok/exportMetaTiktokSumList
   * @response `200` `CommonExportResp` OK
   */
  luteosProductTiktokExportMetaTiktokSumList = (
    req: MetaTiktokReportSumQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/product/tiktok/exportMetaTiktokSumList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags TK周报模块
   * @name LuteosProductTiktokExportTiktokAdsList
   * @summary tiktok-广告明细表现导出
   * @request POST:/api/luteos/product/tiktok/exportTiktokAdsList
   * @response `200` `CommonExportResp` OK
   */
  luteosProductTiktokExportTiktokAdsList = (req: TiktokAdsQueryReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/product/tiktok/exportTiktokAdsList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags TK周报模块
   * @name LuteosProductTiktokExportTiktokAffiliateAccountsSpuList
   * @summary tiktok-机构达人表现导出
   * @request POST:/api/luteos/product/tiktok/exportTiktokAffiliateAccountsSpuList
   * @response `200` `CommonExportResp` OK
   */
  luteosProductTiktokExportTiktokAffiliateAccountsSpuList = (
    req: TiktokAffiliateAccountsSpuQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/product/tiktok/exportTiktokAffiliateAccountsSpuList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags TK周报模块
   * @name LuteosProductTiktokExportTiktokWeekReportList
   * @summary tiktok-小店周报SPU导出
   * @request POST:/api/luteos/product/tiktok/exportTiktokWeekReportList
   * @response `200` `CommonExportResp` OK
   */
  luteosProductTiktokExportTiktokWeekReportList = (
    req: TiktokWeekReportQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/product/tiktok/exportTiktokWeekReportList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags tiktok-在线商品
   * @name LuteosProductTiktokListingDownload
   * @summary tiktok-在线商品导出-V2
   * @request POST:/api/luteos/product/tiktok/listing/download
   * @response `200` `CommonExportResp` OK
   */
  luteosProductTiktokListingDownload = (req: TikTokListingProductReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/product/tiktok/listing/download`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags tiktok-在线商品
   * @name LuteosProductTiktokListingQueryProductListingPage
   * @summary tiktok-在线商品分页查询-V2
   * @request POST:/api/luteos/product/tiktok/listing/queryProductListingPage
   * @response `200` `TikTokProductListingResp` OK
   */
  luteosProductTiktokListingQueryProductListingPage = (
    req: TikTokListingProductReq,
    params: RequestParams = {},
  ) =>
    this.request<TikTokProductListingResp, any>({
      path: `/api/luteos/product/tiktok/listing/queryProductListingPage`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags TK周报模块
   * @name LuteosProductTiktokQueryMetaTiktokSumList
   * @summary tiktok-机构达人表现-汇总查询
   * @request POST:/api/luteos/product/tiktok/queryMetaTiktokSumList
   * @response `200` `MetaTiktokReportSumQueryResp` OK
   */
  luteosProductTiktokQueryMetaTiktokSumList = (
    req: MetaTiktokReportSumQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<MetaTiktokReportSumQueryResp, any>({
      path: `/api/luteos/product/tiktok/queryMetaTiktokSumList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags TK周报模块
   * @name LuteosProductTiktokQueryTiktokAdsList
   * @summary tiktok-广告明细表现查询
   * @request GET:/api/luteos/product/tiktok/queryTiktokAdsList
   * @response `200` `TiktokAdsQueryResp` OK
   */
  luteosProductTiktokQueryTiktokAdsList = (
    query: {
      /** 活动名称/广告组名称/店铺sku */
      keyword?: string;
      /**
       * 月
       * @format int32
       */
      month?: number;
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
      /**
       * 季
       * @format int32
       */
      quarter?: number;
      /**
       * 周
       * @format int32
       */
      week?: number;
      /**
       * 年
       * @format int32
       */
      year?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<TiktokAdsQueryResp, any>({
      path: `/api/luteos/product/tiktok/queryTiktokAdsList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags TK周报模块
   * @name LuteosProductTiktokQueryTiktokAdsPlatformSkuList
   * @summary tiktok-广告映射店铺sku查询
   * @request GET:/api/luteos/product/tiktok/queryTiktokAdsPlatformSkuList
   * @response `200` `TiktokAdsPlatformSkuQueryResp` OK
   */
  luteosProductTiktokQueryTiktokAdsPlatformSkuList = (
    query: {
      /** 广告名称/店铺sku */
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
      /**
       * 店铺SKU映射状态 1-正常 0-异常
       * @format int32
       */
      status?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<TiktokAdsPlatformSkuQueryResp, any>({
      path: `/api/luteos/product/tiktok/queryTiktokAdsPlatformSkuList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags TK周报模块
   * @name LuteosProductTiktokQueryTiktokAffiliateAccountsSpuList
   * @summary tiktok-机构达人表现-周维度查询
   * @request POST:/api/luteos/product/tiktok/queryTiktokAffiliateAccountsSpuList
   * @response `200` `TiktokAffiliateAccountsSpuQueryResp` OK
   */
  luteosProductTiktokQueryTiktokAffiliateAccountsSpuList = (
    req: TiktokAffiliateAccountsSpuQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<TiktokAffiliateAccountsSpuQueryResp, any>({
      path: `/api/luteos/product/tiktok/queryTiktokAffiliateAccountsSpuList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags TK周报模块
   * @name LuteosProductTiktokQueryTiktokWeekReportList
   * @summary tiktok-小店周报SPU查询
   * @request GET:/api/luteos/product/tiktok/queryTiktokWeekReportList
   * @response `200` `TiktokWeekReportQueryResp` OK
   */
  luteosProductTiktokQueryTiktokWeekReportList = (
    query: {
      /** 产品名称 */
      keyword?: string;
      /**
       * 月份
       * @format int32
       */
      month?: number;
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
      /**
       * 季度
       * @format int32
       */
      quarter?: number;
      /**
       * 周期
       * @format int32
       */
      week?: number;
      /**
       * 年份
       * @format int32
       */
      year?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<TiktokWeekReportQueryResp, any>({
      path: `/api/luteos/product/tiktok/queryTiktokWeekReportList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags TK周报模块
   * @name LuteosProductTiktokSaveTiktokAdsSku
   * @summary tiktok-广告店铺SKU映射保存
   * @request POST:/api/luteos/product/tiktok/saveTiktokAdsSku
   * @response `200` `TiktokAdsSkuSaveResp` OK
   */
  luteosProductTiktokSaveTiktokAdsSku = (req: TiktokAdsSkuSaveReq, params: RequestParams = {}) =>
    this.request<TiktokAdsSkuSaveResp, any>({
      path: `/api/luteos/product/tiktok/saveTiktokAdsSku`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 沃尔玛-在线商品
   * @name LuteosProductWalmartListingDownload
   * @summary 沃尔玛-在线商品导出-V2
   * @request POST:/api/luteos/product/walmart/listing/download
   * @response `200` `CommonExportResp` OK
   */
  luteosProductWalmartListingDownload = (
    req: WalmartListingProductReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/product/walmart/listing/download`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 沃尔玛-在线商品
   * @name LuteosProductWalmartListingListingDownload
   * @summary 沃尔玛在线商品导出
   * @request POST:/api/luteos/product/walmart/listing/listing/download
   * @deprecated
   * @response `200` `CommonExportResp` OK
   */
  luteosProductWalmartListingListingDownload = (
    req: WalmartListingReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/product/walmart/listing/listing/download`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 沃尔玛-在线商品
   * @name LuteosProductWalmartListingListingQueryTag
   * @summary 沃尔玛在线商品父维度标签查询
   * @request POST:/api/luteos/product/walmart/listing/listing/queryTag
   * @deprecated
   * @response `200` `ListingTagResp` OK
   */
  luteosProductWalmartListingListingQueryTag = (
    req: ListingQueryTagReq,
    params: RequestParams = {},
  ) =>
    this.request<ListingTagResp, any>({
      path: `/api/luteos/product/walmart/listing/listing/queryTag`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 沃尔玛-在线商品
   * @name LuteosProductWalmartListingListingUpdateTag
   * @summary 沃尔玛在线商品标签保存更新
   * @request POST:/api/luteos/product/walmart/listing/listing/updateTag
   * @deprecated
   * @response `200` `CommonRespObject` OK
   */
  luteosProductWalmartListingListingUpdateTag = (
    req: ListingBatchModifyTagReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/product/walmart/listing/listing/updateTag`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 沃尔玛-在线商品
   * @name LuteosProductWalmartListingQueryPage
   * @summary 沃尔玛-在线商品分页查询
   * @request POST:/api/luteos/product/walmart/listing/queryPage
   * @deprecated
   * @response `200` `WalmartListingResp` OK
   */
  luteosProductWalmartListingQueryPage = (req: WalmartListingReq, params: RequestParams = {}) =>
    this.request<WalmartListingResp, any>({
      path: `/api/luteos/product/walmart/listing/queryPage`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 沃尔玛-在线商品
   * @name LuteosProductWalmartListingQueryProductListingPage
   * @summary 沃尔玛-在线商品分页查询-V2
   * @request POST:/api/luteos/product/walmart/listing/queryProductListingPage
   * @response `200` `WalmartProductListingResp` OK
   */
  luteosProductWalmartListingQueryProductListingPage = (
    req: WalmartListingProductReq,
    params: RequestParams = {},
  ) =>
    this.request<WalmartProductListingResp, any>({
      path: `/api/luteos/product/walmart/listing/queryProductListingPage`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 沃尔玛-在线商品
   * @name LuteosProductWalmartListingSaveOperator
   * @summary 沃尔玛-在线商品保存运营人员
   * @request POST:/api/luteos/product/walmart/listing/saveOperator
   * @deprecated
   * @response `200` `CommonRespObject` OK
   */
  luteosProductWalmartListingSaveOperator = (req: OperatorSaveReq, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/product/walmart/listing/saveOperator`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 沃尔玛-在线商品
   * @name LuteosProductWalmartListingSaveProductLink
   * @summary 沃尔玛-在线商品保存商品链接
   * @request POST:/api/luteos/product/walmart/listing/saveProductLink
   * @deprecated
   * @response `200` `CommonRespObject` OK
   */
  luteosProductWalmartListingSaveProductLink = (
    req: ProductLinkSaveReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/product/walmart/listing/saveProductLink`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
}
