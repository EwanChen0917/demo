/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
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
  MSkuRelationListResp,
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
  ShopUserAccountListResp,
  ShopUserAccountResp,
  ShopifyBatchOperatorSaveReq,
  ShopifyListingParentResp,
  ShopifyListingReq,
  ShopifyOperatorSaveReq,
  ShopifyProductListingReq,
  ShopifyProductListingResp,
  ShopifySonListingResp,
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
  TikTokListingProductReq,
  TikTokProductListingResp,
  TiktokAdsPlatformSkuQueryResp,
  TiktokAdsQueryReq,
  TiktokAdsQueryResp,
  TiktokAdsSkuSaveReq,
  TiktokAdsSkuSaveResp,
  TiktokAffiliateAccountsSpuQueryReq,
  TiktokAffiliateAccountsSpuQueryResp,
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
  _,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Api<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags 亚马逊-在线商品
   * @name BatchModifyPlanUsingPost2
   * @summary 亚马逊-在线商父ASIN批量添加/更新计划人员
   * @request POST:/api/luteos/product/amazon/listing/batchModifyPlan
   * @deprecated
   */
  batchModifyPlanUsingPost2 = (
    req: ListingBatchModifyPlanReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/product/amazon/listing/batchModifyPlan`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 亚马逊-在线商品
   * @name BatchUpdateOperatorUsingPost1
   * @summary 在线商品新增/更新运营人员
   * @request POST:/api/luteos/product/amazon/listing/batchUpdateOperator
   */
  batchUpdateOperatorUsingPost1 = (
    req: BatchOperatorReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/product/amazon/listing/batchUpdateOperator`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 亚马逊-在线商品
   * @name DownloadUsingPost10
   * @summary 亚马逊父子维度导出-V2
   * @request POST:/api/luteos/product/amazon/listing/download
   */
  downloadUsingPost10 = (
    req: AmazonProductListingReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/product/amazon/listing/download`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 亚马逊-在线商品
   * @name DownloadUsingPost9
   * @summary 亚马逊父子维度导出
   * @request POST:/api/luteos/product/amazon/listing/listing/download
   * @deprecated
   */
  downloadUsingPost9 = (req: AmazonListingReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/product/amazon/listing/listing/download`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 亚马逊-在线商品
   * @name QueryListingTagUsingPost5
   * @summary 亚马逊在线商品父维度标签查询
   * @request POST:/api/luteos/product/amazon/listing/listing/queryTag
   * @deprecated
   */
  queryListingTagUsingPost5 = (
    req: ListingQueryTagReq,
    params: RequestParams = {},
  ) =>
    this.request<ListingTagResp, any>({
      path: `/api/luteos/product/amazon/listing/listing/queryTag`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 亚马逊-在线商品
   * @name UpdateTagUsingPost5
   * @summary 亚马逊在线商品父维度标签保存更新
   * @request POST:/api/luteos/product/amazon/listing/listing/updateTag
   * @deprecated
   */
  updateTagUsingPost5 = (
    req: ListingBatchModifyTagReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/product/amazon/listing/listing/updateTag`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 亚马逊-在线商品
   * @name UpdateTagV2UsingPost1
   * @summary 在线商品标签保存更新
   * @request POST:/api/luteos/product/amazon/listing/listing/updateTagV2
   */
  updateTagV2UsingPost1 = (
    req: ListingBatchModifyTagV2Req,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/product/amazon/listing/listing/updateTagV2`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 亚马逊-在线商品
   * @name QueryListUsingPost31
   * @summary 亚马逊-在线商品分页查询-V2
   * @request POST:/api/luteos/product/amazon/listing/queryAsinPage
   */
  queryListUsingPost31 = (
    req: AmazonProductListingReq,
    params: RequestParams = {},
  ) =>
    this.request<AmazonProductListingResp, any>({
      path: `/api/luteos/product/amazon/listing/queryAsinPage`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 亚马逊-在线商品
   * @name QueryParentAsinUsingPost1
   * @summary 亚马逊-在线商品父ASIN分页查询
   * @request POST:/api/luteos/product/amazon/listing/queryParentAsinPage
   * @deprecated
   */
  queryParentAsinUsingPost1 = (
    req: AmazonListingReq,
    params: RequestParams = {},
  ) =>
    this.request<AmazonListingParentResp, any>({
      path: `/api/luteos/product/amazon/listing/queryParentAsinPage`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 亚马逊-在线商品
   * @name QueryAsinUsingPost1
   * @summary 亚马逊-在线商品子ASIN分页查询
   * @request POST:/api/luteos/product/amazon/listing/queryParentSonPage
   * @deprecated
   */
  queryAsinUsingPost1 = (req: AmazonListingReq, params: RequestParams = {}) =>
    this.request<AmazonListingResp, any>({
      path: `/api/luteos/product/amazon/listing/queryParentSonPage`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 亚马逊-在线商品
   * @name QueryListingTagV2UsingPost1
   * @summary 在线商品标签查询
   * @request POST:/api/luteos/product/amazon/listing/queryTagV2
   */
  queryListingTagV2UsingPost1 = (
    req: ListingQueryTagV2Req,
    params: RequestParams = {},
  ) =>
    this.request<ListingTagResp, any>({
      path: `/api/luteos/product/amazon/listing/queryTagV2`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 亚马逊-在线商品
   * @name SaveOperatorV2UsingPost1
   * @summary 在线商品保存运营人员
   * @request POST:/api/luteos/product/amazon/listing/saveOperatorV2
   */
  saveOperatorV2UsingPost1 = (
    req: OperatorCommonSaveReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/product/amazon/listing/saveOperatorV2`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 亚马逊-在线商品
   * @name SaveProductLinkV2UsingPost1
   * @summary 在线商品保存商品链接
   * @request POST:/api/luteos/product/amazon/listing/saveProductLinkV2
   */
  saveProductLinkV2UsingPost1 = (
    req: ProductLinkCommonSaveReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/product/amazon/listing/saveProductLinkV2`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 亚马逊运营人员稽查
   * @name DownloadUsingPost11
   * @summary 导出
   * @request POST:/api/luteos/product/amazon/operatorCheck/download
   */
  downloadUsingPost11 = (
    req: AmazonProductOperatorCheckReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/product/amazon/operatorCheck/download`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 亚马逊运营人员稽查
   * @name QueryDetailUsingPost7
   * @summary 详情查询
   * @request POST:/api/luteos/product/amazon/operatorCheck/queryDetail
   */
  queryDetailUsingPost7 = (
    req: AmazonProductOperatorCheckDetailReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespListAmazonOperatorCheckDetailBean, any>({
      path: `/api/luteos/product/amazon/operatorCheck/queryDetail`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 亚马逊运营人员稽查
   * @name QueryListUsingPost32
   * @summary 列表查询
   * @request POST:/api/luteos/product/amazon/operatorCheck/queryList
   */
  queryListUsingPost32 = (
    req: AmazonProductOperatorCheckReq,
    params: RequestParams = {},
  ) =>
    this.request<AmazonProductOperatorListResp, any>({
      path: `/api/luteos/product/amazon/operatorCheck/queryList`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 亚马逊运营人员稽查
   * @name QuerySpuGtmListUsingGet1
   * @summary 查询GTM小组列表
   * @request GET:/api/luteos/product/amazon/operatorCheck/querySpuGtmList
   */
  querySpuGtmListUsingGet1 = (params: RequestParams = {}) =>
    this.request<CommonRespListString, any>({
      path: `/api/luteos/product/amazon/operatorCheck/querySpuGtmList`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags 属性管理
   * @name ConnectCategoryUsingPost2
   * @summary 属性关联分类
   * @request POST:/api/luteos/product/attr/connectCategory
   */
  connectCategoryUsingPost2 = (
    req: AttrCategoryConnectReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespBoolean, any>({
      path: `/api/luteos/product/attr/connectCategory`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 属性管理
   * @name ExportAttrUsingPost1
   * @summary 属性信息导出
   * @request POST:/api/luteos/product/attr/exportAttr
   */
  exportAttrUsingPost1 = (req: AttrListQueryReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/product/attr/exportAttr`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 属性管理
   * @name OperateAttrUsingPost1
   * @summary 属性操作
   * @request POST:/api/luteos/product/attr/operateAttr
   */
  operateAttrUsingPost1 = (req: AttrOperateReq, params: RequestParams = {}) =>
    this.request<CommonRespBoolean, any>({
      path: `/api/luteos/product/attr/operateAttr`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 属性管理
   * @name QueryAttrDetailUsingGet1
   * @summary 属性详情查询
   * @request GET:/api/luteos/product/attr/queryAttrDetail
   */
  queryAttrDetailUsingGet1 = (
    query: {
      /** 属性编码,必填 */
      attrCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<AttrDetailResp, any>({
      path: `/api/luteos/product/attr/queryAttrDetail`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 属性管理
   * @name QueryAttrListUsingGet1
   * @summary 属性列表查询
   * @request GET:/api/luteos/product/attr/queryAttrList
   */
  queryAttrListUsingGet1 = (
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
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 属性管理
   * @name QueryCategoryLeveListUsingGet1
   * @summary 分类列表查询
   * @request GET:/api/luteos/product/attr/queryCategoryLevelList
   */
  queryCategoryLeveListUsingGet1 = (
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
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品管理, 属性管理
   * @name QueryProductAttrListUsingGet1
   * @summary 商品属性列表查询
   * @request GET:/api/luteos/product/attr/queryProductAttrList
   */
  queryProductAttrListUsingGet1 = (
    query?: {
      /** 五级分类编码 */
      categoryCode?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<ProductAttrListQueryResp, any>({
      path: `/api/luteos/product/attr/queryProductAttrList`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 属性管理
   * @name SaveOrUpdateAttrUsingPost1
   * @summary 属性信息保存
   * @request POST:/api/luteos/product/attr/saveOrUpdateAttr
   */
  saveOrUpdateAttrUsingPost1 = (req: AttrSaveReq, params: RequestParams = {}) =>
    this.request<AttrSaveResp, any>({
      path: `/api/luteos/product/attr/saveOrUpdateAttr`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 属性管理
   * @name SaveOrUpdateAttrValUsingPost1
   * @summary 属性值信息保存
   * @request POST:/api/luteos/product/attr/saveOrUpdateAttrVal
   */
  saveOrUpdateAttrValUsingPost1 = (
    req: AttrValSaveReq,
    params: RequestParams = {},
  ) =>
    this.request<AttrValSaveResp, any>({
      path: `/api/luteos/product/attr/saveOrUpdateAttrVal`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags B2C-在线商品
   * @name QueryProductListingPageUsingGet1
   * @summary b2c-渠道列表
   * @request GET:/api/luteos/product/b2c/listing/queryChannelList
   */
  queryProductListingPageUsingGet1 = (params: RequestParams = {}) =>
    this.request<B2CChannelResp, any>({
      path: `/api/luteos/product/b2c/listing/queryChannelList`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags B2C-在线商品
   * @name QueryProductListingPageUsingPost5
   * @summary b2c-在线商品分页查询-V2
   * @request POST:/api/luteos/product/b2c/listing/queryProductListingPage
   */
  queryProductListingPageUsingPost5 = (
    req: B2CListingProductReq,
    params: RequestParams = {},
  ) =>
    this.request<B2CProductListingResp, any>({
      path: `/api/luteos/product/b2c/listing/queryProductListingPage`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 产品条形码
   * @name CancelUsingPost1
   * @summary 产品条形码取消
   * @request POST:/api/luteos/product/barcode/cancel
   */
  cancelUsingPost1 = (
    req: ProductBarCodeCancelReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/product/barcode/cancel`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 产品条形码, 红人管理
   * @name DownLoadMetaOrderTemplateUsingPost2
   * @summary 下载导入条形码模板
   * @request POST:/api/luteos/product/barcode/downLoadBarCodeTemplate
   */
  downLoadMetaOrderTemplateUsingPost2 = (params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/product/barcode/downLoadBarCodeTemplate`,
      method: "POST",
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 产品条形码
   * @name ExportUsingPost11
   * @summary 产品条形码导出信息
   * @request POST:/api/luteos/product/barcode/export
   */
  exportUsingPost11 = (
    req: ProductBarCodeQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/product/barcode/export`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 产品条形码
   * @name QueryListUsingPost39
   * @summary 产品条形码查询
   * @request POST:/api/luteos/product/barcode/queryList
   */
  queryListUsingPost39 = (
    req: ProductBarCodeQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<ProductBarCodeQueryResp, any>({
      path: `/api/luteos/product/barcode/queryList`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 产品条形码
   * @name SaveOrUpdateUsingPost14
   * @summary 商品条形码保存
   * @request POST:/api/luteos/product/barcode/saveOrUpdate
   */
  saveOrUpdateUsingPost14 = (
    req: ProductBarCodeSaveUpdateReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/product/barcode/saveOrUpdate`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品管理
   * @name BatchOperateProductUsingPost1
   * @summary 商品信息批量操作
   * @request POST:/api/luteos/product/batchOperateProduct
   */
  batchOperateProductUsingPost1 = (
    req: ProductBatchOperateReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespBoolean, any>({
      path: `/api/luteos/product/batchOperateProduct`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 品牌管理
   * @name ConnectProductUsingPost5
   * @summary 品牌关联商品
   * @request POST:/api/luteos/product/brand/connectProduct
   */
  connectProductUsingPost5 = (
    req: BrandProductConnectReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/product/brand/connectProduct`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 品牌管理
   * @name ExportBrandUsingPost1
   * @summary 品牌信息导出
   * @request POST:/api/luteos/product/brand/exportBrand
   */
  exportBrandUsingPost1 = (
    req: BrandListQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/product/brand/exportBrand`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 品牌管理
   * @name OperateBrandUsingPost1
   * @summary 品牌操作
   * @request POST:/api/luteos/product/brand/operateBrand
   */
  operateBrandUsingPost1 = (req: BrandOperateReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/product/brand/operateBrand`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 品牌管理
   * @name QueryBrandDetailUsingGet1
   * @summary 品牌详情查询
   * @request GET:/api/luteos/product/brand/queryBrandDetail
   */
  queryBrandDetailUsingGet1 = (
    query: {
      /** 品牌编码 */
      brandCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<BrandDetailResp, any>({
      path: `/api/luteos/product/brand/queryBrandDetail`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 品牌管理
   * @name QueryBrandListUsingGet1
   * @summary 品牌列表查询
   * @request GET:/api/luteos/product/brand/queryBrandList
   */
  queryBrandListUsingGet1 = (
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
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 品牌管理
   * @name SaveOrUpdateBrandUsingPost1
   * @summary 品牌信息保存
   * @request POST:/api/luteos/product/brand/saveOrUpdateBrand
   */
  saveOrUpdateBrandUsingPost1 = (
    req: BrandSaveReq,
    params: RequestParams = {},
  ) =>
    this.request<BrandSaveResp, any>({
      path: `/api/luteos/product/brand/saveOrUpdateBrand`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品分类管理
   * @name ConnectAttrUsingPost1
   * @summary 分类关联属性
   * @request POST:/api/luteos/product/category/connectAttr
   */
  connectAttrUsingPost1 = (
    req: CategoryAttrConnectReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespBoolean, any>({
      path: `/api/luteos/product/category/connectAttr`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品分类管理
   * @name ExportCategoryUsingPost1
   * @summary 分类信息导出
   * @request POST:/api/luteos/product/category/exportCategory
   */
  exportCategoryUsingPost1 = (
    req: CategoryListQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/product/category/exportCategory`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品分类管理
   * @name OperateModelUsingPost2
   * @summary 分类操作
   * @request POST:/api/luteos/product/category/operateCategory
   */
  operateModelUsingPost2 = (
    req: CategoryOperateReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespBoolean, any>({
      path: `/api/luteos/product/category/operateCategory`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品分类管理
   * @name QueryCategoryDetailUsingGet1
   * @summary 分类详情查询
   * @request GET:/api/luteos/product/category/queryCategoryDetail
   */
  queryCategoryDetailUsingGet1 = (
    query: {
      /** 分类编码 */
      categoryCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CategoryDetailResp, any>({
      path: `/api/luteos/product/category/queryCategoryDetail`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品分类管理
   * @name QueryCategoryLevelListUsingGet1
   * @summary 分类下级查询
   * @request GET:/api/luteos/product/category/queryCategoryLevelList
   */
  queryCategoryLevelListUsingGet1 = (
    query: {
      /** 分类编码 */
      categoryCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CategoryLevelQueryResp, any>({
      path: `/api/luteos/product/category/queryCategoryLevelList`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品分类管理
   * @name QueryCategoryListUsingGet2
   * @summary 分类列表查询
   * @request GET:/api/luteos/product/category/queryCategoryList
   */
  queryCategoryListUsingGet2 = (
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
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品分类管理
   * @name QueryCategoryListByParamUsingGet1
   * @summary 查询分类列表-不含层级
   * @request GET:/api/luteos/product/category/queryCategoryListByParam
   */
  queryCategoryListByParamUsingGet1 = (
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
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品分类管理
   * @name QueryCategoryTopAndLeafLevelListUsingGet1
   * @summary 分类一级/五级查询
   * @request GET:/api/luteos/product/category/queryCategoryTopAndLeafLevelList
   */
  queryCategoryTopAndLeafLevelListUsingGet1 = (
    query: {
      /** 分类编码 */
      categoryCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CategoryLevelQueryResp, any>({
      path: `/api/luteos/product/category/queryCategoryTopAndLeafLevelList`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品分类管理
   * @name GetCategoryTreeUsingGet2
   * @summary 获取分类树
   * @request GET:/api/luteos/product/category/queryCategoryTree
   */
  getCategoryTreeUsingGet2 = (
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
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品分类管理
   * @name QuerySubCategoryListUsingGet1
   * @summary 下级分类列表查询
   * @request GET:/api/luteos/product/category/querySubCategoryList
   */
  querySubCategoryListUsingGet1 = (
    query: {
      /** 分类编码 */
      categoryCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CategoryListQueryResp, any>({
      path: `/api/luteos/product/category/querySubCategoryList`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品分类管理
   * @name QueryThreeCategoryUsingGet1
   * @summary 查询三级分类
   * @request GET:/api/luteos/product/category/queryThreeCategory
   */
  queryThreeCategoryUsingGet1 = (params: RequestParams = {}) =>
    this.request<CategoryListQueryResp, any>({
      path: `/api/luteos/product/category/queryThreeCategory`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品分类管理
   * @name SaveCategoryUsingPost2
   * @summary 分类信息保存
   * @request POST:/api/luteos/product/category/saveOrUpdateCategory
   */
  saveCategoryUsingPost2 = (req: CategorySaveReq, params: RequestParams = {}) =>
    this.request<CategorySaveResp, any>({
      path: `/api/luteos/product/category/saveOrUpdateCategory`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品管理
   * @name CheckRepeatProductUsingPost1
   * @summary 商品编码重复校验
   * @request POST:/api/luteos/product/checkRepeatProduct
   */
  checkRepeatProductUsingPost1 = (
    req: ProductCheckRepeatReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespBoolean, any>({
      path: `/api/luteos/product/checkRepeatProduct`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 在线商品标签
   * @name UpdateTagUsingPost6
   * @summary 在线商品标签保存更新
   * @request POST:/api/luteos/product/common/listing/listing/updateTag
   */
  updateTagUsingPost6 = (
    req: ListingBatchModifyTagV2Req,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/product/common/listing/listing/updateTag`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 在线商品标签
   * @name QueryListingTagUsingPost6
   * @summary 在线商品标签查询
   * @request POST:/api/luteos/product/common/listing/queryTag
   */
  queryListingTagUsingPost6 = (
    req: ListingQueryTagV2Req,
    params: RequestParams = {},
  ) =>
    this.request<ListingTagResp, any>({
      path: `/api/luteos/product/common/listing/queryTag`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 在线商品标签
   * @name SaveOperatorUsingPost4
   * @summary 在线商品保存运营人员
   * @request POST:/api/luteos/product/common/listing/saveOperator
   */
  saveOperatorUsingPost4 = (
    req: OperatorCommonSaveReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/product/common/listing/saveOperator`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 在线商品标签
   * @name SaveProductLinkUsingPost4
   * @summary 在线商品保存商品链接
   * @request POST:/api/luteos/product/common/listing/saveProductLink
   */
  saveProductLinkUsingPost4 = (
    req: ProductLinkCommonSaveReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/product/common/listing/saveProductLink`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品管理
   * @name ConnectCategoryUsingPost3
   * @summary 商品关联分类
   * @request POST:/api/luteos/product/connectCategory
   */
  connectCategoryUsingPost3 = (
    req: ProductConnectCategoryReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespBoolean, any>({
      path: `/api/luteos/product/connectCategory`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 衍生项目管理
   * @name DownloadUsingGet1
   * @summary 衍生项目列表导出
   * @request GET:/api/luteos/product/derive/download
   */
  downloadUsingGet1 = (
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
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 衍生项目管理
   * @name QueryDeriveListUsingGet1
   * @summary 衍生项目列表查询
   * @request GET:/api/luteos/product/derive/queryDeriveList
   */
  queryDeriveListUsingGet1 = (
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
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 衍生项目管理
   * @name QueryDeriveListParamUsingGet1
   * @summary 衍生项目列表查询参数
   * @request GET:/api/luteos/product/derive/queryDeriveListParam
   */
  queryDeriveListParamUsingGet1 = (params: RequestParams = {}) =>
    this.request<DeriveListParamResp, any>({
      path: `/api/luteos/product/derive/queryDeriveListParam`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags 易仓SKU管理
   * @name ExportEccangSkuUsingPost1
   * @summary 导出供应链SKU
   * @request POST:/api/luteos/product/eccangSku/exportEccangSku
   */
  exportEccangSkuUsingPost1 = (
    req: EccangSkuQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/product/eccangSku/exportEccangSku`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 易仓SKU管理
   * @name QueryEccangSkuFullListUsingGet1
   * @summary 供应链SKU列表全字段查询
   * @request GET:/api/luteos/product/eccangSku/queryEccangSkuFullList
   */
  queryEccangSkuFullListUsingGet1 = (
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
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 易仓SKU管理
   * @name QueryEccangSkuListUsingGet1
   * @summary 供应链SKU列表查询
   * @request GET:/api/luteos/product/eccangSku/queryEccangSkuList
   */
  queryEccangSkuListUsingGet1 = (
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
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 易仓SKU管理
   * @name SyncEccangUsingPost1
   * @summary 同步易仓
   * @request POST:/api/luteos/product/eccangSku/syncEccang
   */
  syncEccangUsingPost1 = (req: EccangSkuQueryReq, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/product/eccangSku/syncEccang`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 易仓SKU管理
   * @name ExportEccangSkuV2UsingPost1
   * @summary 导出供应链SKU-v2
   * @request POST:/api/luteos/product/eccangSku/v2/exportEccangSku
   */
  exportEccangSkuV2UsingPost1 = (
    req: EccangSkuQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/product/eccangSku/v2/exportEccangSku`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 易仓SKU管理
   * @name QueryEccangSkuListV2UsingGet1
   * @summary 供应链SKU列表查询-v2
   * @request GET:/api/luteos/product/eccangSku/v2/queryEccangSkuList
   */
  queryEccangSkuListV2UsingGet1 = (
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
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品到期推荐策略管理
   * @name InfoUsingGet2
   * @summary 获取商品到期配置详情
   * @request GET:/api/luteos/product/expire-config/info
   */
  infoUsingGet2 = (
    query?: {
      /** recordCode */
      recordCode?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/luteos/product/expire-config/info`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品到期推荐策略管理
   * @name ListUsingGet15
   * @summary 获取商品到期配置列表
   * @request GET:/api/luteos/product/expire-config/list
   */
  listUsingGet15 = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/luteos/product/expire-config/list`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品到期推荐策略管理
   * @name SaveUsingPost20
   * @summary 新增商品到期配置
   * @request POST:/api/luteos/product/expire-config/save
   */
  saveUsingPost20 = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/luteos/product/expire-config/save`,
      method: "POST",
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品到期推荐策略管理
   * @name UpdateUsingPost7
   * @summary 更新商品到期配置
   * @request POST:/api/luteos/product/expire-config/update
   */
  updateUsingPost7 = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/luteos/product/expire-config/update`,
      method: "POST",
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品管理
   * @name ExportProductUsingPost5
   * @summary 商品导出信息
   * @request POST:/api/luteos/product/exportProduct
   */
  exportProductUsingPost5 = (
    req: ProductListQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/product/exportProduct`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 组合产品管理
   * @name QueryGroupDetailUsingGet2
   * @summary 组合产品详情查询
   * @request GET:/api/luteos/product/group/queryGroupDetail
   */
  queryGroupDetailUsingGet2 = (
    query: {
      /** 组合产品SPU */
      groupProductSpu: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<ProductGroupDetailResp, any>({
      path: `/api/luteos/product/group/queryGroupDetail`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 组合产品管理
   * @name QueryProductGroupListUsingGet2
   * @summary 组合产品列表查询
   * @request GET:/api/luteos/product/group/queryProductGroupList
   */
  queryProductGroupListUsingGet2 = (
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
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 组合产品管理
   * @name SaveProductGroupUsingPost2
   * @summary 组合产品信息保存
   * @request POST:/api/luteos/product/group/saveProductGroup
   */
  saveProductGroupUsingPost2 = (
    req: ProductGroupSaveReq,
    params: RequestParams = {},
  ) =>
    this.request<ProductGroupSaveResp, any>({
      path: `/api/luteos/product/group/saveProductGroup`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 组合SKU管理
   * @name QueryGroupDetailUsingGet3
   * @summary 组合SKU详情查询
   * @request GET:/api/luteos/product/group/sku/queryGroupSkuDetail
   */
  queryGroupDetailUsingGet3 = (
    query: {
      /** 组合SKU编码 */
      groupSkuCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<ProductGroupSkuDetailResp, any>({
      path: `/api/luteos/product/group/sku/queryGroupSkuDetail`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 组合SKU管理
   * @name QueryProductGroupListUsingGet3
   * @summary 组合SKU列表查询
   * @request GET:/api/luteos/product/group/sku/queryProductGroupSkuList
   */
  queryProductGroupListUsingGet3 = (
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
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 组合SKU管理
   * @name SaveProductGroupUsingPost3
   * @summary 组合SKU信息保存
   * @request POST:/api/luteos/product/group/sku/saveProductGroupSku
   */
  saveProductGroupUsingPost3 = (
    req: ProductGroupSkuSaveReq,
    params: RequestParams = {},
  ) =>
    this.request<ProductGroupSkuSaveResp, any>({
      path: `/api/luteos/product/group/sku/saveProductGroupSku`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 产品品线管理
   * @name QueryDetailUsingGet10
   * @summary 查询详情
   * @request GET:/api/luteos/product/line/queryDetail
   */
  queryDetailUsingGet10 = (
    query: {
      /** code */
      code: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<ProductLineDetailResp, any>({
      path: `/api/luteos/product/line/queryDetail`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 产品品线管理
   * @name QueryListUsingPost40
   * @summary 列表查询
   * @request POST:/api/luteos/product/line/queryList
   */
  queryListUsingPost40 = (
    req: ProductLineListQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<ProductLineListResp, any>({
      path: `/api/luteos/product/line/queryList`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 产品品线管理
   * @name SaveOrUpdateUsingPost15
   * @summary 新增或者编辑品线
   * @request POST:/api/luteos/product/line/saveOrUpdate
   */
  saveOrUpdateUsingPost15 = (
    req: ProductLineSaveReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespListProductLineSaveResp, any>({
      path: `/api/luteos/product/line/saveOrUpdate`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags MAC地址管理
   * @name BatchOperateMacAddrUsingPost1
   * @summary 批量操作MAC地址
   * @request POST:/api/luteos/product/mac/batchOperateMacAddr
   */
  batchOperateMacAddrUsingPost1 = (
    req: MacAddrOperateReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/product/mac/batchOperateMacAddr`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags MAC地址管理
   * @name CheckRelSupplySkuUsingPost1
   * @summary 关联供应链产品sku校验
   * @request POST:/api/luteos/product/mac/checkRelSupplySku
   */
  checkRelSupplySkuUsingPost1 = (
    req: MacRelSupplyCheckReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/product/mac/checkRelSupplySku`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags MAC地址管理
   * @name ExportMacAddrUsingPost1
   * @summary MAC地址导出
   * @request POST:/api/luteos/product/mac/exportMacAddr
   */
  exportMacAddrUsingPost1 = (
    req: MacAddrQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/product/mac/exportMacAddr`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags MAC地址管理
   * @name OperateUsingPost4
   * @summary 贴片工厂操作
   * @request POST:/api/luteos/product/mac/operate
   */
  operateUsingPost4 = (req: MacFactoryOperateReq, params: RequestParams = {}) =>
    this.request<MacFactoryOperateResp, any>({
      path: `/api/luteos/product/mac/operate`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags MAC地址管理
   * @name OperateProductCodeUsingPost1
   * @summary 产品代码操作
   * @request POST:/api/luteos/product/mac/operateProductCode
   */
  operateProductCodeUsingPost1 = (
    req: MacProductCodeOperateReq,
    params: RequestParams = {},
  ) =>
    this.request<MacProductCodeOperateResp, any>({
      path: `/api/luteos/product/mac/operateProductCode`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags MAC地址管理
   * @name QueryDetailUsingGet8
   * @summary 贴片工厂详情查询
   * @request GET:/api/luteos/product/mac/queryDetail
   */
  queryDetailUsingGet8 = (
    query: {
      /** 工厂编码 */
      factoryCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<MacFactoryDetailResp, any>({
      path: `/api/luteos/product/mac/queryDetail`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags MAC地址管理
   * @name QueryListUsingGet6
   * @summary 贴片工厂列表查询
   * @request GET:/api/luteos/product/mac/queryList
   */
  queryListUsingGet6 = (
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
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags MAC地址管理
   * @name QueryMacAddressListUsingPost4
   * @summary MAC地址列表查询
   * @request POST:/api/luteos/product/mac/queryMacAddressList
   */
  queryMacAddressListUsingPost4 = (
    req: MacAddrQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<MacAddrQueryResp, any>({
      path: `/api/luteos/product/mac/queryMacAddressList`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags MAC地址管理
   * @name QueryProductCodeDetailUsingGet1
   * @summary 产品代码详情查询
   * @request GET:/api/luteos/product/mac/queryProductCodeDetail
   */
  queryProductCodeDetailUsingGet1 = (
    query?: {
      /** 产品代码 */
      productCode?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<MacProductCodeDetailResp, any>({
      path: `/api/luteos/product/mac/queryProductCodeDetail`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags MAC地址管理
   * @name QueryProductCodeListUsingGet1
   * @summary 产品代码列表查询
   * @request GET:/api/luteos/product/mac/queryProductCodeList
   */
  queryProductCodeListUsingGet1 = (
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
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags MAC地址管理
   * @name QueryPurchaseOrderListUsingPost1
   * @summary PO采购订单查询
   * @request POST:/api/luteos/product/mac/queryPurchaseOrderList
   */
  queryPurchaseOrderListUsingPost1 = (
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
      method: "POST",
      query: query,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags MAC地址管理
   * @name QuerySupplierCodeListUsingGet1
   * @summary 供应商列表查询
   * @request GET:/api/luteos/product/mac/querySupplierList
   */
  querySupplierCodeListUsingGet1 = (params: RequestParams = {}) =>
    this.request<CommonRespMacSupplierQueryResp, any>({
      path: `/api/luteos/product/mac/querySupplierList`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags MAC地址管理
   * @name SaveFactoryUsingPost1
   * @summary 贴片工厂新增
   * @request POST:/api/luteos/product/mac/saveFactory
   */
  saveFactoryUsingPost1 = (
    req: MacFactorySaveReq,
    params: RequestParams = {},
  ) =>
    this.request<MacFactorySaveResp, any>({
      path: `/api/luteos/product/mac/saveFactory`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags MAC地址管理
   * @name SaveMacAddressUsingPost1
   * @summary MAC地址保存
   * @request POST:/api/luteos/product/mac/saveMacAddress
   */
  saveMacAddressUsingPost1 = (
    req: MacAddrSaveReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/product/mac/saveMacAddress`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags MAC地址管理
   * @name SaveProductCodeUsingPost1
   * @summary 产品代码保存
   * @request POST:/api/luteos/product/mac/saveProductCode
   */
  saveProductCodeUsingPost1 = (
    req: MacProductCodeSaveReq,
    params: RequestParams = {},
  ) =>
    this.request<MacProductCodeSaveResp, any>({
      path: `/api/luteos/product/mac/saveProductCode`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 内购用户地址管理
   * @name DeleteUserAddrUsingPost1
   * @summary 删除用户地址
   * @request POST:/api/luteos/product/mall/addr/deleteUserAddr
   */
  deleteUserAddrUsingPost1 = (
    req: MallUserDeleteReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/product/mall/addr/deleteUserAddr`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 内购用户地址管理
   * @name QueryDefaultAddrUsingGet1
   * @summary 查询用户默认地址
   * @request GET:/api/luteos/product/mall/addr/queryDefaultAddr
   */
  queryDefaultAddrUsingGet1 = (params: RequestParams = {}) =>
    this.request<MallUserDefaultAddrResp, any>({
      path: `/api/luteos/product/mall/addr/queryDefaultAddr`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags 内购用户地址管理
   * @name QueryUserAddrUsingGet1
   * @summary 查询用户地址详情
   * @request GET:/api/luteos/product/mall/addr/queryUserAddr
   */
  queryUserAddrUsingGet1 = (
    query?: {
      /** 地址编码 */
      addressCode?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<MallUserDefaultAddrResp, any>({
      path: `/api/luteos/product/mall/addr/queryUserAddr`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 内购用户地址管理
   * @name QueryUserAddrListUsingGet1
   * @summary 查询地址管理列表
   * @request GET:/api/luteos/product/mall/addr/queryUserAddrList
   */
  queryUserAddrListUsingGet1 = (params: RequestParams = {}) =>
    this.request<MallUserAddrListResp, any>({
      path: `/api/luteos/product/mall/addr/queryUserAddrList`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags 内购用户地址管理
   * @name SaveUserAddrUsingPost1
   * @summary 保存用户地址
   * @request POST:/api/luteos/product/mall/addr/saveUserAddr
   */
  saveUserAddrUsingPost1 = (
    req: MallUserAddrSaveReq,
    params: RequestParams = {},
  ) =>
    this.request<MallUserAddrSaveResp, any>({
      path: `/api/luteos/product/mall/addr/saveUserAddr`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 内购商城管理
   * @name ConfirmReceiveUsingPost1
   * @summary 确认收货
   * @request POST:/api/luteos/product/mall/confirmReceive
   */
  confirmReceiveUsingPost1 = (
    query: {
      /** orderCode */
      orderCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/product/mall/confirmReceive`,
      method: "POST",
      query: query,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 内购商城管理
   * @name ExportOrderUsingPost1
   * @summary 导出内购订单
   * @request POST:/api/luteos/product/mall/exportOrder
   */
  exportOrderUsingPost1 = (req: MallOrderListReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/product/mall/exportOrder`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 内购商城管理
   * @name ExportProductListUsingPost1
   * @summary 导出内购产品清单
   * @request POST:/api/luteos/product/mall/exportProductList
   */
  exportProductListUsingPost1 = (
    req: MallProductListReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/product/mall/exportProductList`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 内购商城管理
   * @name OperateOrderUsingPost3
   * @summary 操作内购订单
   * @request POST:/api/luteos/product/mall/operateOrder
   */
  operateOrderUsingPost3 = (
    req: MallOrderOperateReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/product/mall/operateOrder`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 内购商城管理
   * @name OperateProductUsingPost2
   * @summary 操作内购商品
   * @request POST:/api/luteos/product/mall/operateProduct
   */
  operateProductUsingPost2 = (
    req: MallProductOperateReq,
    params: RequestParams = {},
  ) =>
    this.request<MallProductSaveResp, any>({
      path: `/api/luteos/product/mall/operateProduct`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 内购商城管理
   * @name QueryOrderDetailUsingGet1
   * @summary 查询内购订单详情-管理端
   * @request GET:/api/luteos/product/mall/queryOrderDetail
   */
  queryOrderDetailUsingGet1 = (
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
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 内购商城管理
   * @name QueryOrderListUsingGet1
   * @summary 查询内购订单列表-管理端
   * @request GET:/api/luteos/product/mall/queryOrderList
   */
  queryOrderListUsingGet1 = (
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
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 内购商城管理
   * @name QueryOrderStatusUsingGet1
   * @summary 查询内购订单支付状态
   * @request GET:/api/luteos/product/mall/queryOrderStatus
   */
  queryOrderStatusUsingGet1 = (
    query: {
      /** 订单编码 */
      orderCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<MallOrderStatusResp, any>({
      path: `/api/luteos/product/mall/queryOrderStatus`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 内购商城管理
   * @name QueryProductDetailUsingGet1
   * @summary 查询内购商品详情
   * @request GET:/api/luteos/product/mall/queryProductDetail
   */
  queryProductDetailUsingGet1 = (
    query: {
      /** 供应链sku */
      productSku: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<MallProductDetailResp, any>({
      path: `/api/luteos/product/mall/queryProductDetail`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 内购商城管理
   * @name QueryProductListUsingPost3
   * @summary 查询内购商品列表
   * @request POST:/api/luteos/product/mall/queryProductList
   */
  queryProductListUsingPost3 = (
    req: MallProductListReq,
    params: RequestParams = {},
  ) =>
    this.request<MallProductListResp, any>({
      path: `/api/luteos/product/mall/queryProductList`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 内购商城管理
   * @name SaveProductUsingPost2
   * @summary 保存内购商品
   * @request POST:/api/luteos/product/mall/saveProduct
   */
  saveProductUsingPost2 = (
    req: MallProductSaveReq,
    params: RequestParams = {},
  ) =>
    this.request<MallProductSaveResp, any>({
      path: `/api/luteos/product/mall/saveProduct`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 内购商城管理
   * @name SyncErpUsingGet1
   * @summary 同步易仓
   * @request GET:/api/luteos/product/mall/syncErp
   */
  syncErpUsingGet1 = (
    query: {
      /** orderCode */
      orderCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/product/mall/syncErp`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 内购商城用户端管理
   * @name OperateOrderUsingPost2
   * @summary 操作订单
   * @request POST:/api/luteos/product/mall/user/operateOrder
   */
  operateOrderUsingPost2 = (
    req: MallClientOrderOperateReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/product/mall/user/operateOrder`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 内购商城用户端管理
   * @name OperateShoppingCartUsingPost1
   * @summary 操作购物车
   * @request POST:/api/luteos/product/mall/user/operateShoppingCart
   */
  operateShoppingCartUsingPost1 = (
    req: MallShopCartOperateReq,
    params: RequestParams = {},
  ) =>
    this.request<MallShopCartOperateResp, any>({
      path: `/api/luteos/product/mall/user/operateShoppingCart`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 内购商城用户端管理
   * @name PreTradeUsingGet1
   * @summary 测试生成二维码
   * @request GET:/api/luteos/product/mall/user/preTrade
   */
  preTradeUsingGet1 = (
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
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 内购商城用户端管理
   * @name QueryCartCountUsingPost1
   * @summary 查询购物车清单数量
   * @request POST:/api/luteos/product/mall/user/queryCartCount
   */
  queryCartCountUsingPost1 = (params: RequestParams = {}) =>
    this.request<MallShopCartCountResp, any>({
      path: `/api/luteos/product/mall/user/queryCartCount`,
      method: "POST",
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 内购商城用户端管理
   * @name QueryProductClientListUsingPost1
   * @summary 查询商品首页列表
   * @request POST:/api/luteos/product/mall/user/queryProductList
   */
  queryProductClientListUsingPost1 = (
    req: MallProductClientListReq,
    params: RequestParams = {},
  ) =>
    this.request<MallProductClientListResp, any>({
      path: `/api/luteos/product/mall/user/queryProductList`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 内购商城用户端管理
   * @name QueryShoppingCartListUsingGet1
   * @summary 查询购物车列表
   * @request GET:/api/luteos/product/mall/user/queryShoppingCartList
   */
  queryShoppingCartListUsingGet1 = (
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
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 内购商城用户端管理
   * @name SubmitOrderUsingPost1
   * @summary 提交订单
   * @request POST:/api/luteos/product/mall/user/submitOrder
   */
  submitOrderUsingPost1 = (
    req: MallOrderSubmitReq,
    params: RequestParams = {},
  ) =>
    this.request<MallOrderSubmitResp, any>({
      path: `/api/luteos/product/mall/user/submitOrder`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 型号管理
   * @name ConnectProductUsingPost6
   * @summary 型号关联商品
   * @request POST:/api/luteos/product/model/connectProduct
   */
  connectProductUsingPost6 = (
    req: ModelProductConnectReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/product/model/connectProduct`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 型号管理
   * @name ExportModelUsingPost1
   * @summary 型号信息导出
   * @request POST:/api/luteos/product/model/exportModel
   */
  exportModelUsingPost1 = (
    req: ModelListQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/product/model/exportModel`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 型号管理
   * @name OperateModelUsingPost3
   * @summary 型号操作
   * @request POST:/api/luteos/product/model/operateModel
   */
  operateModelUsingPost3 = (req: ModelOperateReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/product/model/operateModel`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 型号管理
   * @name QueryModelDetailUsingGet1
   * @summary 型号详情查询
   * @request GET:/api/luteos/product/model/queryModelDetail
   */
  queryModelDetailUsingGet1 = (
    query: {
      /** 型号编码 */
      modelCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<ModelDetailResp, any>({
      path: `/api/luteos/product/model/queryModelDetail`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 型号管理
   * @name QueryModelListUsingGet1
   * @summary 型号列表查询
   * @request GET:/api/luteos/product/model/queryModelList
   */
  queryModelListUsingGet1 = (
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
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 型号管理
   * @name SaveOrUpdateModelUsingPost1
   * @summary 型号信息保存
   * @request POST:/api/luteos/product/model/saveOrUpdateModel
   */
  saveOrUpdateModelUsingPost1 = (
    req: ModelSaveReq,
    params: RequestParams = {},
  ) =>
    this.request<ModelSaveResp, any>({
      path: `/api/luteos/product/model/saveOrUpdateModel`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 在线商品跟卖监控
   * @name QueryChartDataUsingPost1
   * @summary 趋势图数据
   * @request POST:/api/luteos/product/monitor/queryChartData
   */
  queryChartDataUsingPost1 = (
    req: OnlineProductChartReq,
    params: RequestParams = {},
  ) =>
    this.request<OnlineProductChartResp, any>({
      path: `/api/luteos/product/monitor/queryChartData`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 在线商品跟卖监控
   * @name QueryListUsingPost38
   * @summary 列表查询
   * @request POST:/api/luteos/product/monitor/queryList
   */
  queryListUsingPost38 = (
    req: OnlineProductMonitorReq,
    params: RequestParams = {},
  ) =>
    this.request<OnlineProductMonitorResp, any>({
      path: `/api/luteos/product/monitor/queryList`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags msrp管理
   * @name AddActiveUsingPost2
   * @summary 活动折扣计划表-SPU新增编辑
   * @request POST:/api/luteos/product/msrp/addActive
   */
  addActiveUsingPost2 = (
    req: ActiveDiscountPlanAddReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/product/msrp/addActive`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags msrp管理
   * @name AddSkuActiveUsingPost2
   * @summary 活动折扣计划表-SKU新增编辑
   * @request POST:/api/luteos/product/msrp/addSkuActive
   */
  addSkuActiveUsingPost2 = (
    req: SkuActiveDiscountPlanAddReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/product/msrp/addSkuActive`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags msrp管理
   * @name ApproveActiveUsingPost2
   * @summary 活动折扣计划表-提交审批
   * @request POST:/api/luteos/product/msrp/approveActive
   */
  approveActiveUsingPost2 = (
    req: DiscountPlanWeekApproveReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/product/msrp/approveActive`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags msrp管理
   * @name BatchAddActiveUsingPost2
   * @summary 活动折扣计划表-批量保存
   * @request POST:/api/luteos/product/msrp/batchAddActive
   */
  batchAddActiveUsingPost2 = (
    req: ActiveDiscountPlanBatchAddReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/product/msrp/batchAddActive`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags msrp管理
   * @name BatchSaveUsingPost2
   * @summary msrp管理-批量编辑保存
   * @request POST:/api/luteos/product/msrp/batchSave
   */
  batchSaveUsingPost2 = (req: MsrpSaveReq, params: RequestParams = {}) =>
    this.request<MsrpBatchSaveResp, any>({
      path: `/api/luteos/product/msrp/batchSave`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags msrp定价测算管理
   * @name GetOnlinePromotionRateUsingGet2
   * @summary 定价测算-线上促销率查询
   * @request GET:/api/luteos/product/msrp/calculation/getOnlinePromotionRate
   */
  getOnlinePromotionRateUsingGet2 = (
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
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags msrp定价测算管理
   * @name QueryAllEuSiteUsingGet2
   * @summary 定价测算-EU范围站点
   * @request GET:/api/luteos/product/msrp/calculation/queryAllEuSite
   */
  queryAllEuSiteUsingGet2 = (params: RequestParams = {}) =>
    this.request<CommonRespListString, any>({
      path: `/api/luteos/product/msrp/calculation/queryAllEuSite`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags msrp定价测算管理
   * @name QueryCalculateBaseDataUsingPost2
   * @summary 定价测算-BI数据查询
   * @request POST:/api/luteos/product/msrp/calculation/queryCalculateBaseData
   */
  queryCalculateBaseDataUsingPost2 = (
    req: MsrpCalculateBaseReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespMsrpCalculateBaseDataResp, any>({
      path: `/api/luteos/product/msrp/calculation/queryCalculateBaseData`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags msrp定价测算管理
   * @name QueryChannelUsingGet2
   * @summary 定价测算-渠道下拉框
   * @request GET:/api/luteos/product/msrp/calculation/queryChannel
   */
  queryChannelUsingGet2 = (params: RequestParams = {}) =>
    this.request<CommonRespListString, any>({
      path: `/api/luteos/product/msrp/calculation/queryChannel`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags msrp定价测算管理
   * @name QueryCurrencyUsingGet2
   * @summary 定价测算-汇率查询
   * @request GET:/api/luteos/product/msrp/calculation/queryCurrency
   */
  queryCurrencyUsingGet2 = (params: RequestParams = {}) =>
    this.request<CommonRespMapStringOdsFinanceCurrency, any>({
      path: `/api/luteos/product/msrp/calculation/queryCurrency`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags msrp定价测算管理
   * @name QueryDetailUsingPost8
   * @summary msrp定价测算-详情
   * @request POST:/api/luteos/product/msrp/calculation/queryDetail
   */
  queryDetailUsingPost8 = (
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
      method: "POST",
      query: query,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags msrp定价测算管理
   * @name QueryListUsingPost34
   * @summary msrp定价测算列表查询
   * @request POST:/api/luteos/product/msrp/calculation/queryList
   */
  queryListUsingPost34 = (req: MsrpQueryListReq, params: RequestParams = {}) =>
    this.request<MsrpCalculatePriceQueryListResp, any>({
      path: `/api/luteos/product/msrp/calculation/queryList`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags msrp定价测算管理
   * @name SaveCalculateMsrpUsingPost2
   * @summary msrp定价测算-新增
   * @request POST:/api/luteos/product/msrp/calculation/save
   */
  saveCalculateMsrpUsingPost2 = (
    req: MsrpCalculatePriceDetailSaveReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/product/msrp/calculation/save`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags msrp定价测算管理
   * @name SubmitCalculateMsrpUsingPost2
   * @summary msrp定价测算-确定
   * @request POST:/api/luteos/product/msrp/calculation/submit
   */
  submitCalculateMsrpUsingPost2 = (
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
      method: "POST",
      query: query,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags msrp管理
   * @name CancelApproveActiveUsingPost2
   * @summary 活动折扣计划表-撤销审批
   * @request POST:/api/luteos/product/msrp/cancelApproveActive
   */
  cancelApproveActiveUsingPost2 = (
    req: DiscountPlanWeekCancelReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/product/msrp/cancelApproveActive`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags msrp管理
   * @name DeleteSkuDetailUsingPost2
   * @summary msrp管理-删除sku
   * @request POST:/api/luteos/product/msrp/deleteSkuDetail
   */
  deleteSkuDetailUsingPost2 = (
    req: MsrpSpuDetailReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/product/msrp/deleteSkuDetail`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags msrp管理
   * @name EditActiveUsingPost2
   * @summary 活动折扣计划表-点击触笔进入编辑
   * @request POST:/api/luteos/product/msrp/editActive
   */
  editActiveUsingPost2 = (
    req: DiscountPlanWeekEditReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/product/msrp/editActive`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags msrp管理
   * @name ExportMsrpUsingPost2
   * @summary MSRP管理导出
   * @request POST:/api/luteos/product/msrp/exportMsrp
   */
  exportMsrpUsingPost2 = (req: MsrpQueryListReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/product/msrp/exportMsrp`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags msrp管理
   * @name QueryApproveLogUsingGet2
   * @summary 活动折扣计划表-审批记录
   * @request GET:/api/luteos/product/msrp/queryApproveLog
   */
  queryApproveLogUsingGet2 = (
    query?: {
      /** 记录编码 */
      code?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<WeekApproveLogResp, any>({
      path: `/api/luteos/product/msrp/queryApproveLog`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags msrp管理
   * @name QueryBatchActiveUsingPost2
   * @summary 活动折扣计划表-批量编辑查询
   * @request POST:/api/luteos/product/msrp/queryBatchActive
   */
  queryBatchActiveUsingPost2 = (
    req: ActiveDiscountPlanBatchEditQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<ActiveDiscountPlanBatchEditQueryResp, any>({
      path: `/api/luteos/product/msrp/queryBatchActive`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags msrp管理
   * @name QueryBatchEditListUsingPost2
   * @summary msrp管理-批量编辑查询
   * @request POST:/api/luteos/product/msrp/queryBatchEditList
   */
  queryBatchEditListUsingPost2 = (
    req: MsrpBatchQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespMsrpQueryChannelBatchListResp, any>({
      path: `/api/luteos/product/msrp/queryBatchEditList`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags msrp管理
   * @name QueryEditActiveUsingGet2
   * @summary 活动折扣计划表-SPU列表编辑查询&详情查询
   * @request GET:/api/luteos/product/msrp/queryEditActive
   */
  queryEditActiveUsingGet2 = (
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
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags msrp管理
   * @name QueryListUsingPost35
   * @summary msrp列表查询
   * @request POST:/api/luteos/product/msrp/queryList
   */
  queryListUsingPost35 = (req: MsrpQueryListReq, params: RequestParams = {}) =>
    this.request<MsrpQueryListResp, any>({
      path: `/api/luteos/product/msrp/queryList`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags msrp管理
   * @name QueryOneSkuDetailUsingGet2
   * @summary msrp管理-查询sku详情
   * @request GET:/api/luteos/product/msrp/queryOneSkuDetail
   */
  queryOneSkuDetailUsingGet2 = (
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
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags msrp管理
   * @name QueryOneSpuDetailUsingGet2
   * @summary msrp管理-促销查spu详情
   * @request GET:/api/luteos/product/msrp/queryOneSpuDetail
   */
  queryOneSpuDetailUsingGet2 = (
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
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags msrp管理
   * @name QueryOperatorBySpuAndCountryAndChannelUsingGet2
   * @summary 根据spu,国家，渠道获取运营人员
   * @request GET:/api/luteos/product/msrp/queryOperatorBySpuAndCountryAndChannel
   */
  queryOperatorBySpuAndCountryAndChannelUsingGet2 = (
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
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags msrp管理
   * @name QueryPlanListUsingPost2
   * @summary 活动折扣计划表-列表查询
   * @request POST:/api/luteos/product/msrp/queryPlanList
   */
  queryPlanListUsingPost2 = (
    req: ActiveDiscountPlanReq,
    params: RequestParams = {},
  ) =>
    this.request<ActiveDiscountPlanListResp, any>({
      path: `/api/luteos/product/msrp/queryPlanList`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags msrp管理
   * @name QueryRelationLogUsingGet3
   * @summary msrp日志详情查询
   * @request GET:/api/luteos/product/msrp/queryRelationLog
   */
  queryRelationLogUsingGet3 = (
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
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags msrp管理
   * @name QuerySkuDetailUsingPost2
   * @summary msrp管理-查询sku详情
   * @request POST:/api/luteos/product/msrp/querySkuDetail
   */
  querySkuDetailUsingPost2 = (
    req: MsrpSpuDetailReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespMsrpSkuDetailResp, any>({
      path: `/api/luteos/product/msrp/querySkuDetail`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags msrp管理
   * @name QuerySkuEditActiveUsingGet2
   * @summary 活动折扣计划表-SKU列表编辑查询&详情查询
   * @request GET:/api/luteos/product/msrp/querySkuEditActive
   */
  querySkuEditActiveUsingGet2 = (
    query: {
      /** 记录编码 */
      code: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<SkuActiveDiscountPlanQueryResp, any>({
      path: `/api/luteos/product/msrp/querySkuEditActive`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags msrp管理
   * @name QuerySkuListUsingPost2
   * @summary msrp管理新增-查询
   * @request POST:/api/luteos/product/msrp/querySkuList
   */
  querySkuListUsingPost2 = (
    req: MsrpSkuListQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<MsrpQueryChannelListResp, any>({
      path: `/api/luteos/product/msrp/querySkuList`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags msrp管理
   * @name QuerySpuDetailUsingPost2
   * @summary msrp管理-查询spu详情
   * @request POST:/api/luteos/product/msrp/querySpuDetail
   */
  querySpuDetailUsingPost2 = (
    req: MsrpSpuDetailReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespMsrpSpuDetailResp, any>({
      path: `/api/luteos/product/msrp/querySpuDetail`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags msrp管理
   * @name SaveMsrpUsingPost2
   * @summary msrp管理-新增
   * @request POST:/api/luteos/product/msrp/save
   */
  saveMsrpUsingPost2 = (req: MsrpSaveReq, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/product/msrp/save`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags msrp管理
   * @name SaveSkuUsingPost3
   * @summary msrp管理-sku编辑
   * @request POST:/api/luteos/product/msrp/saveSku
   */
  saveSkuUsingPost3 = (req: MsrpSaveSkuReq, params: RequestParams = {}) =>
    this.request<MsrpSaveSkuResp, any>({
      path: `/api/luteos/product/msrp/saveSku`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags msrp管理
   * @name SaveSpuUsingPost2
   * @summary msrp管理-spu编辑
   * @request POST:/api/luteos/product/msrp/saveSpu
   */
  saveSpuUsingPost2 = (req: MsrpSaveSpuReq, params: RequestParams = {}) =>
    this.request<MsrpSaveSpuResp, any>({
      path: `/api/luteos/product/msrp/saveSpu`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 多平台价格监控
   * @name QueryListUsingPost36
   * @summary 多平台价格列表查询
   * @request POST:/api/luteos/product/multi-price/queryList
   */
  queryListUsingPost36 = (
    req: MultiPriceQueryListReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespMultiPriceQueryListResp, any>({
      path: `/api/luteos/product/multi-price/queryList`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 多平台价格监控
   * @name QueryPriceDetailUsingGet1
   * @summary 查询价格详情
   * @request GET:/api/luteos/product/multi-price/queryPriceDetail
   */
  queryPriceDetailUsingGet1 = (
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
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 线下渠道-在线商品
   * @name QueryProductListingPageUsingPost6
   * @summary 线下渠道-在线商品分页查询-V2
   * @request POST:/api/luteos/product/offline/listing/queryProductListingPage
   */
  queryProductListingPageUsingPost6 = (
    req: OfflineListingProductReq,
    params: RequestParams = {},
  ) =>
    this.request<OfflineProductListingResp, any>({
      path: `/api/luteos/product/offline/listing/queryProductListingPage`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品SKU新旧产品映射管理
   * @name ExportUsingPost12
   * @summary 导出
   * @request POST:/api/luteos/product/oldNewMapping/export
   */
  exportUsingPost12 = (
    req: ProductSkuOldNewListQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/product/oldNewMapping/export`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品SKU新旧产品映射管理
   * @name QueryListUsingGet7
   * @summary 列表查询
   * @request GET:/api/luteos/product/oldNewMapping/queryList
   */
  queryListUsingGet7 = (
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
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品SKU新旧产品映射管理
   * @name SaveOrUpdateSkuOldNewUsingPost1
   * @summary 商品sku新旧保存
   * @request POST:/api/luteos/product/oldNewMapping/saveOrUpdate
   */
  saveOrUpdateSkuOldNewUsingPost1 = (
    req: ProductSkuOldNewSaveOrUpdReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/product/oldNewMapping/saveOrUpdate`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 新平台-在线商品
   * @name ExportUsingGet1
   * @summary 导出
   * @request GET:/api/luteos/product/online/export
   */
  exportUsingGet1 = (
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
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 新平台-在线商品
   * @name QueryListingTagUsingPost7
   * @summary 标签查询
   * @request POST:/api/luteos/product/online/listing/queryTag
   */
  queryListingTagUsingPost7 = (
    req: ListingQueryTagReq,
    params: RequestParams = {},
  ) =>
    this.request<ListingTagResp, any>({
      path: `/api/luteos/product/online/listing/queryTag`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 新平台-在线商品
   * @name QueryListUsingPost37
   * @summary 列表查询
   * @request POST:/api/luteos/product/online/queryList
   */
  queryListUsingPost37 = (
    req: OnlineProductQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<OnlineProductQueryResp, any>({
      path: `/api/luteos/product/online/queryList`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 新平台-在线商品
   * @name SaveUsingPost19
   * @summary 保存在线商品
   * @request POST:/api/luteos/product/online/save
   */
  saveUsingPost19 = (req: OnlineProductSaveReq, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/product/online/save`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 新平台-在线商品
   * @name SaveOperatorUsingPost5
   * @summary 保存运营人员
   * @request POST:/api/luteos/product/online/saveOperator
   */
  saveOperatorUsingPost5 = (req: OperatorSaveReq, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/product/online/saveOperator`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 新平台-在线商品
   * @name SaveProductLinkUsingPost5
   * @summary 保存商品链接
   * @request POST:/api/luteos/product/online/saveProductLink
   */
  saveProductLinkUsingPost5 = (
    req: ProductLinkSaveReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/product/online/saveProductLink`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 新平台-在线商品
   * @name SaveTagUsingPost1
   * @summary 保存标签
   * @request POST:/api/luteos/product/online/saveTag
   */
  saveTagUsingPost1 = (
    req: ListingBatchModifyTagReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/product/online/saveTag`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品管理
   * @name OperateProductUsingPost3
   * @summary 商品信息操作
   * @request POST:/api/luteos/product/operateProduct
   */
  operateProductUsingPost3 = (
    req: ProductOperateReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespBoolean, any>({
      path: `/api/luteos/product/operateProduct`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 在线商品-产品表现
   * @name QueryPerformanceUsingPost1
   * @summary 在线商品-商品表现-V2
   * @request POST:/api/luteos/product/performance/queryPerformance
   */
  queryPerformanceUsingPost1 = (
    req: PerformanceProductReq,
    params: RequestParams = {},
  ) =>
    this.request<WalmartProductListingResp, any>({
      path: `/api/luteos/product/performance/queryPerformance`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 产品表现
   * @name QuerySkuListUsingGet3
   * @summary SKU列表查询
   * @request GET:/api/luteos/product/performance/querySkuList
   */
  querySkuListUsingGet3 = (
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
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 产品表现
   * @name QuerySkuPerformanceUsingGet1
   * @summary SKU产品表现
   * @request GET:/api/luteos/product/performance/querySkuPerformance
   */
  querySkuPerformanceUsingGet1 = (
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
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 促销计划
   * @name ApplyListUsingPost1
   * @summary 促销计划申请列表
   * @request POST:/api/luteos/product/promotion-plan/applyList
   */
  applyListUsingPost1 = (
    req: PromotionPlanListQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<PromotionPlanApplyListResp, any>({
      path: `/api/luteos/product/promotion-plan/applyList`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 促销计划
   * @name CreateUsingPost1
   * @summary 促销计划-新增
   * @request POST:/api/luteos/product/promotion-plan/create
   */
  createUsingPost1 = (
    req: PromotionPlanCreateReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/product/promotion-plan/create`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 促销计划
   * @name CreateCheckUsingPost1
   * @summary 促销计划-新增校验
   * @request POST:/api/luteos/product/promotion-plan/createCheck
   */
  createCheckUsingPost1 = (
    req: PromotionPlanCreateReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespPlanCreateCheckResp, any>({
      path: `/api/luteos/product/promotion-plan/createCheck`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 促销计划
   * @name DeleteUsingPost8
   * @summary 促销计划-删除
   * @request POST:/api/luteos/product/promotion-plan/delete
   */
  deleteUsingPost8 = (
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
      method: "POST",
      query: query,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 促销计划
   * @name DetailUsingGet6
   * @summary 促销计划-详情
   * @request GET:/api/luteos/product/promotion-plan/detail
   */
  detailUsingGet6 = (
    query: {
      /** planCode */
      planCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespPromotionPlanDetailResp, any>({
      path: `/api/luteos/product/promotion-plan/detail`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 促销计划
   * @name ExportPromotionPlanUsingPost1
   * @summary 促销计划导出
   * @request POST:/api/luteos/product/promotion-plan/exportPromotionPlan
   */
  exportPromotionPlanUsingPost1 = (
    req: PromotionPlanListQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/product/promotion-plan/exportPromotionPlan`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 促销计划
   * @name GetAddActivityDetailUsingGet1
   * @summary 添加活动详情列表
   * @request GET:/api/luteos/product/promotion-plan/getAddActivityDetail
   */
  getAddActivityDetailUsingGet1 = (
    query: {
      /** planCodeList */
      planCodeList: string[];
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespAddActivityDetailResp, any>({
      path: `/api/luteos/product/promotion-plan/getAddActivityDetail`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 促销计划
   * @name ListBySkuUsingPost1
   * @summary 促销计划-SKU维度分页列表
   * @request POST:/api/luteos/product/promotion-plan/listBySku
   */
  listBySkuUsingPost1 = (
    req: PromotionPlanListQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<PromotionPlanListQuerySkuResp, any>({
      path: `/api/luteos/product/promotion-plan/listBySku`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 促销计划
   * @name ListBySpuUsingPost1
   * @summary 促销计划-SPU维度分页列表
   * @request POST:/api/luteos/product/promotion-plan/listBySpu
   */
  listBySpuUsingPost1 = (
    req: PromotionPlanListQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<PromotionPlanListQuerySpuResp, any>({
      path: `/api/luteos/product/promotion-plan/listBySpu`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 促销计划
   * @name QuerySkuListUsingGet4
   * @summary 查询sku列表
   * @request GET:/api/luteos/product/promotion-plan/querySkuList
   */
  querySkuListUsingGet4 = (
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
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 促销计划
   * @name QuerySpuListUsingGet1
   * @summary 查询spu列表
   * @request GET:/api/luteos/product/promotion-plan/querySpuList
   */
  querySpuListUsingGet1 = (
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
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 促销计划
   * @name ReviewUsingPost1
   * @summary 促销计划-审核
   * @request POST:/api/luteos/product/promotion-plan/review
   */
  reviewUsingPost1 = (
    req: PromotionPlanReviewReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/product/promotion-plan/review`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 促销计划
   * @name ReviewListUsingPost1
   * @summary 促销计划-审核列表
   * @request POST:/api/luteos/product/promotion-plan/reviewList
   */
  reviewListUsingPost1 = (
    req: PromotionPlanReviewListReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespPromotionPlanReviewListResp, any>({
      path: `/api/luteos/product/promotion-plan/reviewList`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 促销计划
   * @name UpdateUsingPost9
   * @summary 促销计划-更新
   * @request POST:/api/luteos/product/promotion-plan/update
   */
  updateUsingPost9 = (
    req: PromotionPlanCreateReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/product/promotion-plan/update`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品管理
   * @name QueryDetailUsingGet9
   * @summary 商品详情查询
   * @request GET:/api/luteos/product/queryDetail
   */
  queryDetailUsingGet9 = (
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
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品管理
   * @name QueryOperatorListUsingGet4
   * @summary 获取采购员列表
   * @request GET:/api/luteos/product/queryOperatorList
   */
  queryOperatorListUsingGet4 = (
    query: {
      /** 产品经理编码 */
      productManagerCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<PurchaseOperatorQueryResp, any>({
      path: `/api/luteos/product/queryOperatorList`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品管理
   * @name QueryPlatfromSkuIdentifyUsingGet1
   * @summary 原平台标识查询
   * @request GET:/api/luteos/product/queryPlatfromSkuIdentify
   */
  queryPlatfromSkuIdentifyUsingGet1 = (
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
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品管理
   * @name QueryProductPerfectionUsingGet1
   * @summary 获取商品列表信息完善度
   * @request GET:/api/luteos/product/queryProduct/perfection
   */
  queryProductPerfectionUsingGet1 = (params: RequestParams = {}) =>
    this.request<ProductPerfectionQueryResp, any>({
      path: `/api/luteos/product/queryProduct/perfection`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品管理
   * @name QueryProductAllModelListUsingPost1
   * @summary 产品型号列表查询
   * @request POST:/api/luteos/product/queryProductAllModelList
   */
  queryProductAllModelListUsingPost1 = (params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/product/queryProductAllModelList`,
      method: "POST",
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品管理
   * @name QueryProductByCategoryUsingPost1
   * @summary 根据分类查询商品
   * @request POST:/api/luteos/product/queryProductByCategory
   */
  queryProductByCategoryUsingPost1 = (
    req: ProductCategoryReq,
    params: RequestParams = {},
  ) =>
    this.request<ProductCategoryResp, any>({
      path: `/api/luteos/product/queryProductByCategory`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品管理
   * @name QueryProductInfoUsingGet1
   * @summary 商品信息查询
   * @request GET:/api/luteos/product/queryProductInfo
   */
  queryProductInfoUsingGet1 = (
    query: {
      /** 商品spu编码 */
      productSpu: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<ProductInfoResp, any>({
      path: `/api/luteos/product/queryProductInfo`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品管理
   * @name QueryProductListUsingGet3
   * @summary 商品列表查询
   * @request GET:/api/luteos/product/queryProductList
   */
  queryProductListUsingGet3 = (
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
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品管理
   * @name QueryProductRelationListUsingGet1
   * @summary 商品关联信息列表查询
   * @request GET:/api/luteos/product/queryProductRelationList
   */
  queryProductRelationListUsingGet1 = (params: RequestParams = {}) =>
    this.request<ProductRelationListResp, any>({
      path: `/api/luteos/product/queryProductRelationList`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品管理
   * @name QuerySupplySkuUsingGet1
   * @summary 供应链SKU查询
   * @request GET:/api/luteos/product/querySupplySku
   */
  querySupplySkuUsingGet1 = (params: RequestParams = {}) =>
    this.request<CommonRespListString, any>({
      path: `/api/luteos/product/querySupplySku`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags 批量删除, 竞品监控
   * @name BatchDeletedUsingPost5
   * @summary 批量删除
   * @request POST:/api/luteos/product/rankingList/batchDeleted
   */
  batchDeletedUsingPost5 = (
    req: AmazonRankingListBatchOperationReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/product/rankingList/batchDeleted`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 批量编辑, 竞品监控
   * @name BatchOperationUsingPost1
   * @summary 批量编辑
   * @request POST:/api/luteos/product/rankingList/batchOperation
   */
  batchOperationUsingPost1 = (
    req: AmazonRankingListBatchOperationReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/product/rankingList/batchOperation`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 竞品监控
   * @name DownTemplateUsingPost3
   * @summary 下载-竞品监控导入模板
   * @request POST:/api/luteos/product/rankingList/downTemplate
   */
  downTemplateUsingPost3 = (params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/product/rankingList/downTemplate`,
      method: "POST",
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 竞品监控, 编辑
   * @name OperationUsingPost1
   * @summary 编辑运营/组长/备注
   * @request POST:/api/luteos/product/rankingList/operation
   */
  operationUsingPost1 = (
    req: AmazonRankingListOperationReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/product/rankingList/operation`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 竞品监控
   * @name QueryListUsingPost33
   * @summary 竞品监控列表查询
   * @request POST:/api/luteos/product/rankingList/queryList
   */
  queryListUsingPost33 = (
    req: AmazonRankingListQueryListReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespAmazonRankingListQueryListResp, any>({
      path: `/api/luteos/product/rankingList/queryList`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 竞品监控
   * @name SaveUsingPost18
   * @summary 新增/编辑
   * @request POST:/api/luteos/product/rankingList/save
   */
  saveUsingPost18 = (
    req: AmazonRankingListSaveReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/product/rankingList/save`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品管理
   * @name RemoveProductUsingGet1
   * @summary 删除商品
   * @request GET:/api/luteos/product/removeProduct
   */
  removeProductUsingGet1 = (
    query: {
      /** 商品编码 */
      productSpu: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespBoolean, any>({
      path: `/api/luteos/product/removeProduct`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销售映射管理
   * @name ExportSaleSkuUsingPost1
   * @summary 导出销售映射
   * @request POST:/api/luteos/product/saleSku/exportSaleSku
   */
  exportSaleSkuUsingPost1 = (
    req: SaleSkuQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/product/saleSku/exportSaleSku`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销售映射管理
   * @name QueryDictSalesChannelListUsingPost1
   * @summary 查询销售渠道字典表
   * @request POST:/api/luteos/product/saleSku/queryDictSalesChannelList
   */
  queryDictSalesChannelListUsingPost1 = (
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
      method: "POST",
      query: query,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销售映射管理
   * @name QueryLuteChannelListUsingPost1
   * @summary 查询路特筛选条件
   * @request POST:/api/luteos/product/saleSku/queryLuteChannelList
   */
  queryLuteChannelListUsingPost1 = (params: RequestParams = {}) =>
    this.request<LuteConditionResp, any>({
      path: `/api/luteos/product/saleSku/queryLuteChannelList`,
      method: "POST",
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销售映射管理
   * @name QueryRelationLogUsingGet4
   * @summary 日志详情查询
   * @request GET:/api/luteos/product/saleSku/queryRelationLog
   */
  queryRelationLogUsingGet4 = (
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
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销售映射管理
   * @name QuerySaleSkuDetailUsingGet1
   * @summary 销售映射详情查询
   * @request GET:/api/luteos/product/saleSku/querySaleSkuDetail
   */
  querySaleSkuDetailUsingGet1 = (
    query: {
      /** 唯一键 */
      uniqueCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<SaleSkuDetailQueryResp, any>({
      path: `/api/luteos/product/saleSku/querySaleSkuDetail`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销售映射管理
   * @name QuerySaleSkuListUsingGet1
   * @summary 销售映射列表查询
   * @request GET:/api/luteos/product/saleSku/querySaleSkuList
   */
  querySaleSkuListUsingGet1 = (
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
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销售映射管理
   * @name QuerySourceUsingGet1
   * @summary 获取数据来源
   * @request GET:/api/luteos/product/saleSku/querySource
   */
  querySourceUsingGet1 = (params: RequestParams = {}) =>
    this.request<SaleSkuSourcelQueryResp, any>({
      path: `/api/luteos/product/saleSku/querySource`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags 销售映射管理
   * @name RemoveSaleSkuRelationUsingPost1
   * @summary 删除销售映射关系
   * @request POST:/api/luteos/product/saleSku/removeSaleSkuRelation
   */
  removeSaleSkuRelationUsingPost1 = (
    query?: {
      /** uniqueCode */
      uniqueCode?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespBoolean, any>({
      path: `/api/luteos/product/saleSku/removeSaleSkuRelation`,
      method: "POST",
      query: query,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销售映射管理
   * @name SaveSaleSkuRelationUsingPost1
   * @summary 保存销售映射关系
   * @request POST:/api/luteos/product/saleSku/saveSaleSkuRelation
   */
  saveSaleSkuRelationUsingPost1 = (
    req: SaleSkuSaveReq,
    params: RequestParams = {},
  ) =>
    this.request<SaleSkuSaveResp, any>({
      path: `/api/luteos/product/saleSku/saveSaleSkuRelation`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销售映射缺失管理
   * @name ExportSaleSkuRelationMissUsingPost1
   * @summary 导出销售映射缺失
   * @request POST:/api/luteos/product/saleSkuRelationMiss/export
   */
  exportSaleSkuRelationMissUsingPost1 = (
    req: SaleSkuRelationMissQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/product/saleSkuRelationMiss/export`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销售映射缺失管理
   * @name QuerySaleSkuRelationMissListUsingGet1
   * @summary 销售映射缺失列表查询
   * @request GET:/api/luteos/product/saleSkuRelationMiss/queryList
   */
  querySaleSkuRelationMissListUsingGet1 = (
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
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品管理
   * @name SaveProductUsingPost3
   * @summary 商品信息保存
   * @request POST:/api/luteos/product/saveProduct
   */
  saveProductUsingPost3 = (req: _, params: RequestParams = {}) =>
    this.request<ProductSaveResp, any>({
      path: `/api/luteos/product/saveProduct`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags RPA在线商品
   * @name ExportSellerSkuUnusualListUsingGet1
   * @summary 导出销售异常
   * @request GET:/api/luteos/product/seller/sku/exportSellerSkuUnusualList
   */
  exportSellerSkuUnusualListUsingGet1 = (
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
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags RPA在线商品
   * @name OperateSellerSkuStatusUsingGet1
   * @summary 变更商品提醒状态
   * @request GET:/api/luteos/product/seller/sku/operateSellerSkuStatus
   */
  operateSellerSkuStatusUsingGet1 = (
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
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags RPA在线商品
   * @name QuerySellerSkuUnusualListUsingGet1
   * @summary 查询销售异常
   * @request GET:/api/luteos/product/seller/sku/querySellerSkuUnusualList
   */
  querySellerSkuUnusualListUsingGet1 = (
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
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 敏感类型管理
   * @name ConnectProductUsingPost7
   * @summary 敏感类型关联商品
   * @request POST:/api/luteos/product/sensitiveType/connectProduct
   */
  connectProductUsingPost7 = (
    req: SensitiveTypeProductConnectReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/product/sensitiveType/connectProduct`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 敏感类型管理
   * @name ExportSensitiveTypeUsingPost1
   * @summary 敏感类型信息导出
   * @request POST:/api/luteos/product/sensitiveType/exportSensitiveType
   */
  exportSensitiveTypeUsingPost1 = (
    req: SensitiveTypeListQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/product/sensitiveType/exportSensitiveType`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 敏感类型管理
   * @name OperateSensitiveTypeUsingPost1
   * @summary 敏感类型操作
   * @request POST:/api/luteos/product/sensitiveType/operateSensitiveType
   */
  operateSensitiveTypeUsingPost1 = (
    req: SensitiveTypeOperateReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/product/sensitiveType/operateSensitiveType`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 敏感类型管理
   * @name QuerySensitiveTypeDetailUsingGet1
   * @summary 敏感类型详情查询
   * @request GET:/api/luteos/product/sensitiveType/querySensitiveTypeDetail
   */
  querySensitiveTypeDetailUsingGet1 = (
    query: {
      /** 敏感类型编码 */
      sensitiveTypeCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<SensitiveTypeDetailResp, any>({
      path: `/api/luteos/product/sensitiveType/querySensitiveTypeDetail`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 敏感类型管理
   * @name QuerySensitiveTypeListUsingGet1
   * @summary 敏感类型列表查询
   * @request GET:/api/luteos/product/sensitiveType/querySensitiveTypeList
   */
  querySensitiveTypeListUsingGet1 = (
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
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 敏感类型管理
   * @name SaveOrUpdateSensitiveTypeUsingPost1
   * @summary 敏感类型信息保存
   * @request POST:/api/luteos/product/sensitiveType/saveOrUpdateSensitiveType
   */
  saveOrUpdateSensitiveTypeUsingPost1 = (
    req: SensitiveTypeSaveReq,
    params: RequestParams = {},
  ) =>
    this.request<SensitiveTypeSaveResp, any>({
      path: `/api/luteos/product/sensitiveType/saveOrUpdateSensitiveType`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 系列管理
   * @name ConnectProductUsingPost8
   * @summary 系列关联商品
   * @request POST:/api/luteos/product/series/connectProduct
   */
  connectProductUsingPost8 = (
    req: SeriesProductConnectReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/product/series/connectProduct`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 系列管理
   * @name ExportSeriesUsingPost1
   * @summary 系列信息导出
   * @request POST:/api/luteos/product/series/exportSeries
   */
  exportSeriesUsingPost1 = (
    req: SeriesListQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/product/series/exportSeries`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 系列管理
   * @name OperateSeriesUsingPost1
   * @summary 系列操作
   * @request POST:/api/luteos/product/series/operateSeries
   */
  operateSeriesUsingPost1 = (
    req: SeriesOperateReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/product/series/operateSeries`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 系列管理
   * @name QuerySeriesDetailUsingGet1
   * @summary 系列详情查询
   * @request GET:/api/luteos/product/series/querySeriesDetail
   */
  querySeriesDetailUsingGet1 = (
    query: {
      /** 系列编码 */
      seriesCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<SeriesDetailResp, any>({
      path: `/api/luteos/product/series/querySeriesDetail`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 系列管理
   * @name QuerySeriesListUsingGet1
   * @summary 系列列表查询
   * @request GET:/api/luteos/product/series/querySeriesList
   */
  querySeriesListUsingGet1 = (
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
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 系列管理
   * @name SaveOrUpdateSeriesUsingPost1
   * @summary 系列信息保存
   * @request POST:/api/luteos/product/series/saveOrUpdateSeries
   */
  saveOrUpdateSeriesUsingPost1 = (
    req: SeriesSaveReq,
    params: RequestParams = {},
  ) =>
    this.request<SeriesSaveResp, any>({
      path: `/api/luteos/product/series/saveOrUpdateSeries`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品管理
   * @name ShadowSearchUsingPost1
   * @summary 产品影子查询
   * @request POST:/api/luteos/product/shadowSearch
   */
  shadowSearchUsingPost1 = (
    req: ProductShadowSearchReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespProductShadowSearchResp, any>({
      path: `/api/luteos/product/shadowSearch`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品管理
   * @name ShadowSearchStatisticsDetailUsingPost1
   * @summary 产品影子统计信息详情
   * @request POST:/api/luteos/product/shadowSearchStatisticsDetail
   */
  shadowSearchStatisticsDetailUsingPost1 = (
    req: ProductShadowDetailStaticsSearchReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespProductShadowDetailStatisticsResp, any>({
      path: `/api/luteos/product/shadowSearchStatisticsDetail`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 独立站在线商品
   * @name BatchModifyPlanUsingPost3
   * @summary 独立站-在线商父ASIN批量添加/更新计划人员
   * @request POST:/api/luteos/product/shopify/listing/batchModifyPlan
   * @deprecated
   */
  batchModifyPlanUsingPost3 = (
    req: ListingBatchModifyPlanReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/product/shopify/listing/batchModifyPlan`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 独立站在线商品
   * @name BatchSaveOperatorUsingPost1
   * @summary 独立站-批量保存运营人员
   * @request POST:/api/luteos/product/shopify/listing/batchSaveOperator
   */
  batchSaveOperatorUsingPost1 = (
    req: ShopifyBatchOperatorSaveReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/product/shopify/listing/batchSaveOperator`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 独立站在线商品
   * @name DownloadUsingPost13
   * @summary 独立站-在线商品导出-V2
   * @request POST:/api/luteos/product/shopify/listing/download
   */
  downloadUsingPost13 = (
    req: ShopifyProductListingReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/product/shopify/listing/download`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 独立站在线商品
   * @name DownloadUsingPost12
   * @summary 独立站父子维度导出
   * @request POST:/api/luteos/product/shopify/listing/listing/download
   * @deprecated
   */
  downloadUsingPost12 = (req: ShopifyListingReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/product/shopify/listing/listing/download`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 独立站在线商品
   * @name QueryListingTagUsingPost8
   * @summary 亚马逊在线商品父维度标签查询
   * @request POST:/api/luteos/product/shopify/listing/listing/queryTag
   * @deprecated
   */
  queryListingTagUsingPost8 = (
    req: ListingQueryTagReq,
    params: RequestParams = {},
  ) =>
    this.request<ListingTagResp, any>({
      path: `/api/luteos/product/shopify/listing/listing/queryTag`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 独立站在线商品
   * @name UpdateTagUsingPost7
   * @summary 独立站商品父子维度标签保存更新
   * @request POST:/api/luteos/product/shopify/listing/listing/updateTag
   * @deprecated
   */
  updateTagUsingPost7 = (
    req: ListingBatchModifyTagReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/product/shopify/listing/listing/updateTag`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 独立站在线商品
   * @name QueryParentProductIdPageUsingPost1
   * @summary 独立站-在线商品ProductId分页查询
   * @request POST:/api/luteos/product/shopify/listing/queryParentProductIdPage
   * @deprecated
   */
  queryParentProductIdPageUsingPost1 = (
    req: ShopifyListingReq,
    params: RequestParams = {},
  ) =>
    this.request<ShopifyListingParentResp, any>({
      path: `/api/luteos/product/shopify/listing/queryParentProductIdPage`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 独立站在线商品
   * @name QueryProductListingPageUsingPost7
   * @summary 独立站-在线商品分页查询-V2
   * @request POST:/api/luteos/product/shopify/listing/queryProductListingPage
   */
  queryProductListingPageUsingPost7 = (
    req: ShopifyProductListingReq,
    params: RequestParams = {},
  ) =>
    this.request<ShopifyProductListingResp, any>({
      path: `/api/luteos/product/shopify/listing/queryProductListingPage`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 独立站在线商品
   * @name QuerySonVariantIdPageUsingPost1
   * @summary 独立站-在线商品子维度分页查询
   * @request POST:/api/luteos/product/shopify/listing/querySonVariantIdPage
   * @deprecated
   */
  querySonVariantIdPageUsingPost1 = (
    req: ShopifyListingReq,
    params: RequestParams = {},
  ) =>
    this.request<ShopifySonListingResp, any>({
      path: `/api/luteos/product/shopify/listing/querySonVariantIdPage`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 独立站在线商品
   * @name SaveOperatorUsingPost6
   * @summary 独立站-在线商品保存运营人员
   * @request POST:/api/luteos/product/shopify/listing/saveOperator
   */
  saveOperatorUsingPost6 = (
    req: ShopifyOperatorSaveReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/product/shopify/listing/saveOperator`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 独立站在线商品
   * @name SaveProductLinkUsingPost6
   * @summary 独立站-在线商品保存商品链接
   * @request POST:/api/luteos/product/shopify/listing/saveProductLink
   * @deprecated
   */
  saveProductLinkUsingPost6 = (
    req: ProductLinkSaveReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/product/shopify/listing/saveProductLink`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 独立站在线商品
   * @name SyncShopifyListingInventoryChangeNoticeJobUsingPost1
   * @summary 独立站-SKU库存到货通知-发钉钉消息测试接口
   * @request POST:/api/luteos/product/shopify/listing/syncShopifyListingInventoryChangeNoticeJob
   */
  syncShopifyListingInventoryChangeNoticeJobUsingPost1 = (
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/product/shopify/listing/syncShopifyListingInventoryChangeNoticeJob`,
      method: "POST",
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 独立站在线商品
   * @name SyncShopifyListingNoInventoryRecordJobUsingPost1
   * @summary 独立站-SKU库存到货通知-记录SKU零库存测试接口
   * @request POST:/api/luteos/product/shopify/listing/syncShopifyListingNoInventoryRecordJob
   */
  syncShopifyListingNoInventoryRecordJobUsingPost1 = (
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/product/shopify/listing/syncShopifyListingNoInventoryRecordJob`,
      method: "POST",
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品管理
   * @name ShowSearchUsingPost1
   * @summary 产品表现查询
   * @request POST:/api/luteos/product/showSearch
   */
  showSearchUsingPost1 = (
    req: ProductShowSearchReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespProductShowSearchResp, any>({
      path: `/api/luteos/product/showSearch`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品管理
   * @name ShowSearchDetailUsingPost1
   * @summary 产品表现详情
   * @request POST:/api/luteos/product/showSearchDetail
   */
  showSearchDetailUsingPost1 = (
    req: ProductShowDetailSearchReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespProductShowDetailSearchResp, any>({
      path: `/api/luteos/product/showSearchDetail`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品管理
   * @name ShowSearchStatisticsDetailUsingPost1
   * @summary 产品表现统计信息详情
   * @request POST:/api/luteos/product/showSearchStatisticsDetail
   */
  showSearchStatisticsDetailUsingPost1 = (
    req: ProductShowDetailStaticsSearchReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespProductShowDetailStatisticsResp, any>({
      path: `/api/luteos/product/showSearchStatisticsDetail`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品SKU管理
   * @name BatchOperateUsingPost1
   * @summary 商品sku批量操作
   * @request POST:/api/luteos/product/sku/batchOperate
   */
  batchOperateUsingPost1 = (
    req: ProductSkuBatchOpeReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespBoolean, any>({
      path: `/api/luteos/product/sku/batchOperate`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 店铺SKU管理
   * @name ExportPlatformSkuUsingPost1
   * @summary 导出店铺SKU
   * @request POST:/api/luteos/product/sku/exportPlatformSku
   */
  exportPlatformSkuUsingPost1 = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/luteos/product/sku/exportPlatformSku`,
      method: "POST",
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品SKU管理
   * @name ExportProductUsingPost6
   * @summary 商品Sku导出信息
   * @request POST:/api/luteos/product/sku/exportProduct
   */
  exportProductUsingPost6 = (
    req: ProductSkuListQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/product/sku/exportProduct`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品SKU管理
   * @name ExportProductSkuCertificationUsingPost1
   * @summary 商品Sku证信息导出
   * @request POST:/api/luteos/product/sku/exportProductSkuCertification
   */
  exportProductSkuCertificationUsingPost1 = (
    req: ProductSkuCertificationListReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/product/sku/exportProductSkuCertification`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品映射
   * @name ClearUsingPost1
   * @summary 清除映射
   * @request POST:/api/luteos/product/sku/mapping/clear
   */
  clearUsingPost1 = (
    req: ProductSkuMappingClearReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/product/sku/mapping/clear`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品映射
   * @name ExportListUsingPost3
   * @summary 导出列表
   * @request POST:/api/luteos/product/sku/mapping/exportList
   */
  exportListUsingPost3 = (
    req: ProductSkuMappingQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/luteos/product/sku/mapping/exportList`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品映射
   * @name QueryListUsingPost41
   * @summary 列表查询
   * @request POST:/api/luteos/product/sku/mapping/queryList
   */
  queryListUsingPost41 = (
    req: ProductSkuMappingQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespProductSkuMappingQueryResp, any>({
      path: `/api/luteos/product/sku/mapping/queryList`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品映射
   * @name UpdateUsingPost8
   * @summary 编辑
   * @request POST:/api/luteos/product/sku/mapping/update
   */
  updateUsingPost8 = (
    req: ProductSkuMappingUpdateReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/product/sku/mapping/update`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品SKU管理
   * @name ProductSkuCertificationSyncJobUsingGet1
   * @summary 商品Sku证信息同步
   * @request GET:/api/luteos/product/sku/productSkuCertificationSyncJob
   */
  productSkuCertificationSyncJobUsingGet1 = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/luteos/product/sku/productSkuCertificationSyncJob`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品SKU管理
   * @name ProductSkuOperateUsingPost1
   * @summary 商品sku操作
   * @request POST:/api/luteos/product/sku/productSkuOperate
   */
  productSkuOperateUsingPost1 = (
    req: ProductSkuOperateReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespBoolean, any>({
      path: `/api/luteos/product/sku/productSkuOperate`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品SKU管理
   * @name ProductSkuSyncCrmUsingPost1
   * @summary 测试接口-产品信息同步CRM
   * @request POST:/api/luteos/product/sku/productSkuSyncCrm
   */
  productSkuSyncCrmUsingPost1 = (
    query: {
      /** skuCodeList */
      skuCodeList: string[];
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/product/sku/productSkuSyncCrm`,
      method: "POST",
      query: query,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品SKU管理
   * @name QueryCountryUsingGet1
   * @summary 销售区域查询
   * @request GET:/api/luteos/product/sku/queryCountry
   */
  queryCountryUsingGet1 = (params: RequestParams = {}) =>
    this.request<CountryAreaListResp[], any>({
      path: `/api/luteos/product/sku/queryCountry`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品SKU管理
   * @name QueryDeptOrMemberUsingGet1
   * @summary SKU提醒部门或人员查询
   * @request GET:/api/luteos/product/sku/queryDeptOrMember
   */
  queryDeptOrMemberUsingGet1 = (
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
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品SKU管理
   * @name QueryMSkuRelationListUsingGet1
   * @summary 商品sku详情-店铺sku映射查询
   * @request GET:/api/luteos/product/sku/queryMSkuRelationList
   */
  queryMSkuRelationListUsingGet1 = (
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
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 店铺SKU管理
   * @name QueryPlatformSkuDetailUsingGet1
   * @summary 店铺SKU详情查询
   * @request GET:/api/luteos/product/sku/queryPlatformSkuDetail
   */
  queryPlatformSkuDetailUsingGet1 = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/luteos/product/sku/queryPlatformSkuDetail`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags 店铺SKU管理
   * @name QueryPlatformSkuListUsingGet1
   * @summary 店铺SKU列表查询
   * @request GET:/api/luteos/product/sku/queryPlatformSkuList
   */
  queryPlatformSkuListUsingGet1 = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/luteos/product/sku/queryPlatformSkuList`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品SKU管理
   * @name QueryProductSkuPerfectionUsingGet1
   * @summary 获取商品sku列表信息完善度
   * @request GET:/api/luteos/product/sku/queryProductSku/perfection
   */
  queryProductSkuPerfectionUsingGet1 = (params: RequestParams = {}) =>
    this.request<ProductSkuPerfectionQueryResp, any>({
      path: `/api/luteos/product/sku/queryProductSku/perfection`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品SKU管理
   * @name QueryProductSkuDetailUsingGet1
   * @summary 商品sku详情查询
   * @request GET:/api/luteos/product/sku/queryProductSkuDetail
   */
  queryProductSkuDetailUsingGet1 = (
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
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品SKU管理
   * @name QueryProductSkuListUsingGet1
   * @summary 商品sku列表查询
   * @request GET:/api/luteos/product/sku/queryProductSkuList
   */
  queryProductSkuListUsingGet1 = (
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
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品SKU管理
   * @name QuerySkuCertificationListUsingPost1
   * @summary 商品Sku认证信息查询
   * @request POST:/api/luteos/product/sku/querySkuCertificationList
   */
  querySkuCertificationListUsingPost1 = (
    req: ProductSkuCertificationListReq,
    params: RequestParams = {},
  ) =>
    this.request<ProductSkuCertificationListResp, any>({
      path: `/api/luteos/product/sku/querySkuCertificationList`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品SKU管理
   * @name QuerySkuDefaultSpecUsingGet1
   * @summary 商品sku默认供应链规格查询
   * @request GET:/api/luteos/product/sku/querySkuDefaultSpec
   */
  querySkuDefaultSpecUsingGet1 = (
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
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品SKU管理
   * @name QuerySkuInfoUsingGet1
   * @summary 商品sku信息查询
   * @request GET:/api/luteos/product/sku/querySkuInfo
   */
  querySkuInfoUsingGet1 = (
    query: {
      /** 商品sku编码 */
      skuCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<ProductSkuInfoResp, any>({
      path: `/api/luteos/product/sku/querySkuInfo`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品SKU管理
   * @name QuerySupplierSkuListUsingGet1
   * @summary 供应链sku列表查询
   * @request GET:/api/luteos/product/sku/querySupplierSkuList
   */
  querySupplierSkuListUsingGet1 = (
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
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品SKU管理
   * @name QuerySupplySkuListUsingGet2
   * @summary 商品Sku 关联供应链SKU查询并返回库存
   * @request GET:/api/luteos/product/sku/querySupplySkuList
   */
  querySupplySkuListUsingGet2 = (
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
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 店铺SKU管理
   * @name QueryUserAccountUsingGet1
   * @summary 查询店铺账户
   * @request GET:/api/luteos/product/sku/queryUserAccount
   */
  queryUserAccountUsingGet1 = (
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
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 店铺SKU管理
   * @name QueryUserAccountListUsingGet1
   * @summary 查询店铺账户集合
   * @request GET:/api/luteos/product/sku/queryUserAccountList
   */
  queryUserAccountListUsingGet1 = (
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
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 店铺SKU管理
   * @name SavePlatformSkuRelationUsingPost1
   * @summary 保存店铺SKU关系
   * @request POST:/api/luteos/product/sku/savePlatformSkuRelation
   */
  savePlatformSkuRelationUsingPost1 = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/luteos/product/sku/savePlatformSkuRelation`,
      method: "POST",
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品SKU管理
   * @name SaveSkuUsingPost4
   * @summary 商品sku保存
   * @request POST:/api/luteos/product/sku/saveSku
   */
  saveSkuUsingPost4 = (req: ProductSkuSaveReq, params: RequestParams = {}) =>
    this.request<ProductSkuSaveResp, any>({
      path: `/api/luteos/product/sku/saveSku`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品SKU管理
   * @name SaveWorkflowRecordUsingPost1
   * @summary 生成SKU信息补充提醒工单
   * @request POST:/api/luteos/product/sku/saveWorkflowRecord
   */
  saveWorkflowRecordUsingPost1 = (
    req: ProductSkuNotifyReq,
    params: RequestParams = {},
  ) =>
    this.request<WorkflowSubmitResp, any>({
      path: `/api/luteos/product/sku/saveWorkflowRecord`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品SKU管理
   * @name SmaSkuQueryListUsingPost1
   * @summary 查询预测SKU维度添加商品
   * @request POST:/api/luteos/product/sku/smaSkuQueryList
   */
  smaSkuQueryListUsingPost1 = (
    req: SmaSkuQueryListReq,
    params: RequestParams = {},
  ) =>
    this.request<SmaSkuQueryListResp, any>({
      path: `/api/luteos/product/sku/smaSkuQueryList`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品供应商管理
   * @name ExportSkuSnUsingPost1
   * @summary 商品供应商导出信息
   * @request POST:/api/luteos/product/sku/sn/exportSkuSn
   */
  exportSkuSnUsingPost1 = (req: SkuSnQueryReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/product/sku/sn/exportSkuSn`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品供应商管理
   * @name QuerySkuSnListUsingGet1
   * @summary 商品供应商列表查询
   * @request GET:/api/luteos/product/sku/sn/querySkuSnList
   */
  querySkuSnListUsingGet1 = (
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
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品供应商管理
   * @name SaveSkuSnUsingPost1
   * @summary SN码创建
   * @request POST:/api/luteos/product/sku/sn/saveSkuSn
   */
  saveSkuSnUsingPost1 = (req: SkuSnSaveReq, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/product/sku/sn/saveSkuSn`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品SKU管理
   * @name UploadSkuImgUsingPost1
   * @summary 上传sku图片
   * @request POST:/api/luteos/product/sku/uploadSkuImg
   */
  uploadSkuImgUsingPost1 = (
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
      method: "POST",
      query: query,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 商品中心数据统计
   * @name QueryMemberCenterStatsUsingGet1
   * @summary 个人中心数据统计
   * @request GET:/api/luteos/product/stats/queryMemberCenterStats
   */
  queryMemberCenterStatsUsingGet1 = (params: RequestParams = {}) =>
    this.request<MemberCenterStatsQueryResp, any>({
      path: `/api/luteos/product/stats/queryMemberCenterStats`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags 供应链SKU管理
   * @name ExportSupplySkuUsingPost1
   * @summary 供应链sku导出
   * @request POST:/api/luteos/product/supplySku/exportSupplySku
   */
  exportSupplySkuUsingPost1 = (
    req: SupplySkuListQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/product/supplySku/exportSupplySku`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 供应链SKU管理
   * @name ExportSupplySkuListUsingPost1
   * @summary 供应链sku列表导出
   * @request POST:/api/luteos/product/supplySku/exportSupplySkuList
   */
  exportSupplySkuListUsingPost1 = (
    req: SupplySkuListQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/product/supplySku/exportSupplySkuList`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 供应链SKU管理
   * @name OperateSupplySkuUsingPost1
   * @summary 供应链sku操作
   * @request POST:/api/luteos/product/supplySku/operateSupplySku
   */
  operateSupplySkuUsingPost1 = (
    req: SupplySkuOperateReq,
    params: RequestParams = {},
  ) =>
    this.request<SupplySkuCommonResp, any>({
      path: `/api/luteos/product/supplySku/operateSupplySku`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 供应链SKU管理
   * @name QueryGtmMemberListUsingGet3
   * @summary 费用归属人列表
   * @request GET:/api/luteos/product/supplySku/queryGtmMemberList
   */
  queryGtmMemberListUsingGet3 = (params: RequestParams = {}) =>
    this.request<DeptMemberListQueryResp, any>({
      path: `/api/luteos/product/supplySku/queryGtmMemberList`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags 供应链SKU管理
   * @name QueryProductLineListUsingGet2
   * @summary 费用归属品线列表
   * @request GET:/api/luteos/product/supplySku/queryProductLineList
   */
  queryProductLineListUsingGet2 = (params: RequestParams = {}) =>
    this.request<FinanceProductLineListResp, any>({
      path: `/api/luteos/product/supplySku/queryProductLineList`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags 供应链SKU管理
   * @name QuerySupplyPurchaserListUsingGet1
   * @summary 采购员信息查询
   * @request GET:/api/luteos/product/supplySku/querySupplyPurchaserList
   */
  querySupplyPurchaserListUsingGet1 = (params: RequestParams = {}) =>
    this.request<SupplyPurchaserResp, any>({
      path: `/api/luteos/product/supplySku/querySupplyPurchaserList`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags 供应链SKU管理
   * @name QuerySupplySkuPerfectionUsingGet1
   * @summary 获取供应链sku信息完整度
   * @request GET:/api/luteos/product/supplySku/querySupplySku/perfection
   */
  querySupplySkuPerfectionUsingGet1 = (params: RequestParams = {}) =>
    this.request<SupplySkuPerfectionQueryResp, any>({
      path: `/api/luteos/product/supplySku/querySupplySku/perfection`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags 供应链SKU管理
   * @name QuerySupplySkuDetailUsingGet1
   * @summary 供应链sku详情
   * @request GET:/api/luteos/product/supplySku/querySupplySkuDetail
   */
  querySupplySkuDetailUsingGet1 = (
    query: {
      /** 供应链SKU */
      productSku: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<SupplySkuDetailResp, any>({
      path: `/api/luteos/product/supplySku/querySupplySkuDetail`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 供应链SKU管理
   * @name QuerySupplySkuListUsingGet3
   * @summary 供应链sku列表查询
   * @request GET:/api/luteos/product/supplySku/querySupplySkuList
   */
  querySupplySkuListUsingGet3 = (
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
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 供应链SKU管理
   * @name SaveSupplySkuUsingPost1
   * @summary 供应链sku保存
   * @request POST:/api/luteos/product/supplySku/saveSupplySku
   */
  saveSupplySkuUsingPost1 = (
    req: SupplySkuSaveReq,
    params: RequestParams = {},
  ) =>
    this.request<SupplySkuCommonResp, any>({
      path: `/api/luteos/product/supplySku/saveSupplySku`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 标签分类管理
   * @name CreateCategoryUsingPost1
   * @summary 创建标签分类
   * @request POST:/api/luteos/product/tag/category/createCategory
   */
  createCategoryUsingPost1 = (
    req: CreateCategoryReq,
    params: RequestParams = {},
  ) =>
    this.request<CreateCategoryResp, any>({
      path: `/api/luteos/product/tag/category/createCategory`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description codeList为空时按照categoryName进行查询，codeList不为空时按照codeList查询
   *
   * @tags 标签分类管理
   * @name ExportUsingPost13
   * @summary 导出标签分类
   * @request POST:/api/luteos/product/tag/category/export
   */
  exportUsingPost13 = (req: CategoryListQueryReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/product/tag/category/export`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 传入categoryCode，返回其下一级分类节点列表
   *
   * @tags 标签分类管理
   * @name QueryChildrenUsingGet1
   * @summary 根据分类编码查询下一级子节点
   * @request GET:/api/luteos/product/tag/category/queryChildren
   */
  queryChildrenUsingGet1 = (
    query: {
      /** categoryCode */
      categoryCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CategoryChildrenQueryResp, any>({
      path: `/api/luteos/product/tag/category/queryChildren`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * @description 无参时返回整个树结构；传入categoryName时，根据分类名称模糊查询，返回匹配的分类及其所有父级分类的树结构
   *
   * @tags 标签分类管理
   * @name QueryTreeUsingGet1
   * @summary 查询标签分类树
   * @request GET:/api/luteos/product/tag/category/queryTree
   */
  queryTreeUsingGet1 = (
    query?: {
      /** categoryName */
      categoryName?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CategoryTreeResp, any>({
      path: `/api/luteos/product/tag/category/queryTree`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 标签分类管理
   * @name QueyCategoryListUsingGet1
   * @summary 查询标签分类列表
   * @request GET:/api/luteos/product/tag/category/queyCategoryList
   */
  queyCategoryListUsingGet1 = (
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
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 标签分类管理
   * @name UpdateCategoryUsingPost1
   * @summary 更新标签分类
   * @request POST:/api/luteos/product/tag/category/updateCategory
   */
  updateCategoryUsingPost1 = (
    req: UpdateCategoryReq,
    params: RequestParams = {},
  ) =>
    this.request<UpdateCategoryResp, any>({
      path: `/api/luteos/product/tag/category/updateCategory`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 标签管理
   * @name ConnectProductUsingPost9
   * @summary 标签关联商品
   * @request POST:/api/luteos/product/tag/connectProduct
   */
  connectProductUsingPost9 = (
    req: TagProductConnectReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespBoolean, any>({
      path: `/api/luteos/product/tag/connectProduct`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 标签管理
   * @name ExportTagUsingPost1
   * @summary 标签信息导出
   * @request POST:/api/luteos/product/tag/exportTag
   */
  exportTagUsingPost1 = (req: TagListQueryReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/product/tag/exportTag`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 标签管理
   * @name OperateTagUsingPost1
   * @summary 标签操作
   * @request POST:/api/luteos/product/tag/operateTag
   */
  operateTagUsingPost1 = (req: TagOperateReq, params: RequestParams = {}) =>
    this.request<CommonRespBoolean, any>({
      path: `/api/luteos/product/tag/operateTag`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 标签管理
   * @name QueryTagDetailUsingGet1
   * @summary 标签详情查询
   * @request GET:/api/luteos/product/tag/queryTagDetail
   */
  queryTagDetailUsingGet1 = (
    query: {
      /** 标签编码 */
      tagCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<TagDetailResp, any>({
      path: `/api/luteos/product/tag/queryTagDetail`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 标签管理
   * @name QueryTagListUsingGet1
   * @summary 标签列表查询
   * @request GET:/api/luteos/product/tag/queryTagList
   */
  queryTagListUsingGet1 = (
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
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 标签管理
   * @name QueryTagProductUsingGet1
   * @summary 查询标签关联商品
   * @request GET:/api/luteos/product/tag/queryTagProduct
   */
  queryTagProductUsingGet1 = (
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
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 标签管理
   * @name SaveOrUpdateTagUsingPost1
   * @summary 标签信息保存
   * @request POST:/api/luteos/product/tag/saveOrUpdateTag
   */
  saveOrUpdateTagUsingPost1 = (req: TagSaveReq, params: RequestParams = {}) =>
    this.request<TagSaveResp, any>({
      path: `/api/luteos/product/tag/saveOrUpdateTag`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags TK周报模块
   * @name ExportMetaTiktokSumListUsingPost1
   * @summary tiktok-机构达人汇总导出
   * @request POST:/api/luteos/product/tiktok/exportMetaTiktokSumList
   */
  exportMetaTiktokSumListUsingPost1 = (
    req: MetaTiktokReportSumQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/product/tiktok/exportMetaTiktokSumList`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags TK周报模块
   * @name ExportTiktokAdsListUsingPost1
   * @summary tiktok-广告明细表现导出
   * @request POST:/api/luteos/product/tiktok/exportTiktokAdsList
   */
  exportTiktokAdsListUsingPost1 = (
    req: TiktokAdsQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/product/tiktok/exportTiktokAdsList`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags TK周报模块
   * @name ExportTiktokAffiliateAccountsSpuListUsingPost1
   * @summary tiktok-机构达人表现导出
   * @request POST:/api/luteos/product/tiktok/exportTiktokAffiliateAccountsSpuList
   */
  exportTiktokAffiliateAccountsSpuListUsingPost1 = (
    req: TiktokAffiliateAccountsSpuQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/product/tiktok/exportTiktokAffiliateAccountsSpuList`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags TK周报模块
   * @name ExportTiktokWeekReportListUsingPost1
   * @summary tiktok-小店周报SPU导出
   * @request POST:/api/luteos/product/tiktok/exportTiktokWeekReportList
   */
  exportTiktokWeekReportListUsingPost1 = (
    req: TiktokWeekReportQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/product/tiktok/exportTiktokWeekReportList`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags tiktok-在线商品
   * @name DownloadUsingPost14
   * @summary tiktok-在线商品导出-V2
   * @request POST:/api/luteos/product/tiktok/listing/download
   */
  downloadUsingPost14 = (
    req: TikTokListingProductReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/product/tiktok/listing/download`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags tiktok-在线商品
   * @name QueryProductListingPageUsingPost8
   * @summary tiktok-在线商品分页查询-V2
   * @request POST:/api/luteos/product/tiktok/listing/queryProductListingPage
   */
  queryProductListingPageUsingPost8 = (
    req: TikTokListingProductReq,
    params: RequestParams = {},
  ) =>
    this.request<TikTokProductListingResp, any>({
      path: `/api/luteos/product/tiktok/listing/queryProductListingPage`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags TK周报模块
   * @name QueryMetaTiktokSumListUsingPost1
   * @summary tiktok-机构达人表现-汇总查询
   * @request POST:/api/luteos/product/tiktok/queryMetaTiktokSumList
   */
  queryMetaTiktokSumListUsingPost1 = (
    req: MetaTiktokReportSumQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<MetaTiktokReportSumQueryResp, any>({
      path: `/api/luteos/product/tiktok/queryMetaTiktokSumList`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags TK周报模块
   * @name QueryTiktokAdsListUsingGet1
   * @summary tiktok-广告明细表现查询
   * @request GET:/api/luteos/product/tiktok/queryTiktokAdsList
   */
  queryTiktokAdsListUsingGet1 = (
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
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags TK周报模块
   * @name QueryTiktokAdsPlatformSkuListUsingGet1
   * @summary tiktok-广告映射店铺sku查询
   * @request GET:/api/luteos/product/tiktok/queryTiktokAdsPlatformSkuList
   */
  queryTiktokAdsPlatformSkuListUsingGet1 = (
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
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags TK周报模块
   * @name QueryTiktokAffiliateAccountsSpuListUsingPost1
   * @summary tiktok-机构达人表现-周维度查询
   * @request POST:/api/luteos/product/tiktok/queryTiktokAffiliateAccountsSpuList
   */
  queryTiktokAffiliateAccountsSpuListUsingPost1 = (
    req: TiktokAffiliateAccountsSpuQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<TiktokAffiliateAccountsSpuQueryResp, any>({
      path: `/api/luteos/product/tiktok/queryTiktokAffiliateAccountsSpuList`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags TK周报模块
   * @name QueryTiktokWeekReportListUsingGet1
   * @summary tiktok-小店周报SPU查询
   * @request GET:/api/luteos/product/tiktok/queryTiktokWeekReportList
   */
  queryTiktokWeekReportListUsingGet1 = (
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
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags TK周报模块
   * @name SaveTiktokAdsSkuUsingPost1
   * @summary tiktok-广告店铺SKU映射保存
   * @request POST:/api/luteos/product/tiktok/saveTiktokAdsSku
   */
  saveTiktokAdsSkuUsingPost1 = (
    req: TiktokAdsSkuSaveReq,
    params: RequestParams = {},
  ) =>
    this.request<TiktokAdsSkuSaveResp, any>({
      path: `/api/luteos/product/tiktok/saveTiktokAdsSku`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 沃尔玛-在线商品
   * @name DownloadUsingPost15
   * @summary 沃尔玛-在线商品导出-V2
   * @request POST:/api/luteos/product/walmart/listing/download
   */
  downloadUsingPost15 = (
    req: WalmartListingProductReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/product/walmart/listing/download`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 沃尔玛-在线商品
   * @name DownloadUsingPost16
   * @summary 沃尔玛在线商品导出
   * @request POST:/api/luteos/product/walmart/listing/listing/download
   * @deprecated
   */
  downloadUsingPost16 = (req: WalmartListingReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/product/walmart/listing/listing/download`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 沃尔玛-在线商品
   * @name QueryListingTagUsingPost9
   * @summary 沃尔玛在线商品父维度标签查询
   * @request POST:/api/luteos/product/walmart/listing/listing/queryTag
   * @deprecated
   */
  queryListingTagUsingPost9 = (
    req: ListingQueryTagReq,
    params: RequestParams = {},
  ) =>
    this.request<ListingTagResp, any>({
      path: `/api/luteos/product/walmart/listing/listing/queryTag`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 沃尔玛-在线商品
   * @name UpdateTagUsingPost8
   * @summary 沃尔玛在线商品标签保存更新
   * @request POST:/api/luteos/product/walmart/listing/listing/updateTag
   * @deprecated
   */
  updateTagUsingPost8 = (
    req: ListingBatchModifyTagReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/product/walmart/listing/listing/updateTag`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 沃尔玛-在线商品
   * @name QueryPageUsingPost1
   * @summary 沃尔玛-在线商品分页查询
   * @request POST:/api/luteos/product/walmart/listing/queryPage
   * @deprecated
   */
  queryPageUsingPost1 = (req: WalmartListingReq, params: RequestParams = {}) =>
    this.request<WalmartListingResp, any>({
      path: `/api/luteos/product/walmart/listing/queryPage`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 沃尔玛-在线商品
   * @name QueryProductListingPageUsingPost9
   * @summary 沃尔玛-在线商品分页查询-V2
   * @request POST:/api/luteos/product/walmart/listing/queryProductListingPage
   */
  queryProductListingPageUsingPost9 = (
    req: WalmartListingProductReq,
    params: RequestParams = {},
  ) =>
    this.request<WalmartProductListingResp, any>({
      path: `/api/luteos/product/walmart/listing/queryProductListingPage`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 沃尔玛-在线商品
   * @name SaveOperatorUsingPost7
   * @summary 沃尔玛-在线商品保存运营人员
   * @request POST:/api/luteos/product/walmart/listing/saveOperator
   * @deprecated
   */
  saveOperatorUsingPost7 = (req: OperatorSaveReq, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/product/walmart/listing/saveOperator`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 沃尔玛-在线商品
   * @name SaveProductLinkUsingPost7
   * @summary 沃尔玛-在线商品保存商品链接
   * @request POST:/api/luteos/product/walmart/listing/saveProductLink
   * @deprecated
   */
  saveProductLinkUsingPost7 = (
    req: ProductLinkSaveReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/product/walmart/listing/saveProductLink`,
      method: "POST",
      body: req,
      type: ContentType.Json,
      ...params,
    });
}
