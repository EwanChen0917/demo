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

export namespace Api {
  /**
   * No description
   * @tags 亚马逊-在线商品
   * @name LuteosProductAmazonListingBatchModifyPlan
   * @summary 亚马逊-在线商父ASIN批量添加/更新计划人员
   * @request POST:/api/luteos/product/amazon/listing/batchModifyPlan
   * @deprecated
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosProductAmazonListingBatchModifyPlan {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ListingBatchModifyPlanReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags 亚马逊-在线商品
   * @name LuteosProductAmazonListingBatchUpdateOperator
   * @summary 在线商品新增/更新运营人员
   * @request POST:/api/luteos/product/amazon/listing/batchUpdateOperator
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosProductAmazonListingBatchUpdateOperator {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BatchOperatorReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags 亚马逊-在线商品
   * @name LuteosProductAmazonListingDownload
   * @summary 亚马逊父子维度导出-V2
   * @request POST:/api/luteos/product/amazon/listing/download
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosProductAmazonListingDownload {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AmazonProductListingReq;
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
   * @tags 亚马逊-在线商品
   * @name LuteosProductAmazonListingListingDownload
   * @summary 亚马逊父子维度导出
   * @request POST:/api/luteos/product/amazon/listing/listing/download
   * @deprecated
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosProductAmazonListingListingDownload {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AmazonListingReq;
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
   * @tags 亚马逊-在线商品
   * @name LuteosProductAmazonListingListingQueryTag
   * @summary 亚马逊在线商品父维度标签查询
   * @request POST:/api/luteos/product/amazon/listing/listing/queryTag
   * @deprecated
   * @response `200` `ListingTagResp` OK
   */
  export namespace LuteosProductAmazonListingListingQueryTag {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ListingQueryTagReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ListingTagResp;
  }

  /**
   * No description
   * @tags 亚马逊-在线商品
   * @name LuteosProductAmazonListingListingUpdateTag
   * @summary 亚马逊在线商品父维度标签保存更新
   * @request POST:/api/luteos/product/amazon/listing/listing/updateTag
   * @deprecated
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosProductAmazonListingListingUpdateTag {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ListingBatchModifyTagReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags 亚马逊-在线商品
   * @name LuteosProductAmazonListingListingUpdateTagV2
   * @summary 在线商品标签保存更新
   * @request POST:/api/luteos/product/amazon/listing/listing/updateTagV2
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosProductAmazonListingListingUpdateTagV2 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ListingBatchModifyTagV2Req;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags 亚马逊-在线商品
   * @name LuteosProductAmazonListingQueryAsinPage
   * @summary 亚马逊-在线商品分页查询-V2
   * @request POST:/api/luteos/product/amazon/listing/queryAsinPage
   * @response `200` `AmazonProductListingResp` OK
   */
  export namespace LuteosProductAmazonListingQueryAsinPage {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AmazonProductListingReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = AmazonProductListingResp;
  }

  /**
   * No description
   * @tags 亚马逊-在线商品
   * @name LuteosProductAmazonListingQueryParentAsinPage
   * @summary 亚马逊-在线商品父ASIN分页查询
   * @request POST:/api/luteos/product/amazon/listing/queryParentAsinPage
   * @deprecated
   * @response `200` `AmazonListingParentResp` OK
   */
  export namespace LuteosProductAmazonListingQueryParentAsinPage {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AmazonListingReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = AmazonListingParentResp;
  }

  /**
   * No description
   * @tags 亚马逊-在线商品
   * @name LuteosProductAmazonListingQueryParentSonPage
   * @summary 亚马逊-在线商品子ASIN分页查询
   * @request POST:/api/luteos/product/amazon/listing/queryParentSonPage
   * @deprecated
   * @response `200` `AmazonListingResp` OK
   */
  export namespace LuteosProductAmazonListingQueryParentSonPage {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AmazonListingReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = AmazonListingResp;
  }

  /**
   * No description
   * @tags 亚马逊-在线商品
   * @name LuteosProductAmazonListingQueryTagV2
   * @summary 在线商品标签查询
   * @request POST:/api/luteos/product/amazon/listing/queryTagV2
   * @response `200` `ListingTagResp` OK
   */
  export namespace LuteosProductAmazonListingQueryTagV2 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ListingQueryTagV2Req;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ListingTagResp;
  }

  /**
   * No description
   * @tags 亚马逊-在线商品
   * @name LuteosProductAmazonListingSaveOperatorV2
   * @summary 在线商品保存运营人员
   * @request POST:/api/luteos/product/amazon/listing/saveOperatorV2
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosProductAmazonListingSaveOperatorV2 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OperatorCommonSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags 亚马逊-在线商品
   * @name LuteosProductAmazonListingSaveProductLinkV2
   * @summary 在线商品保存商品链接
   * @request POST:/api/luteos/product/amazon/listing/saveProductLinkV2
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosProductAmazonListingSaveProductLinkV2 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductLinkCommonSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags 亚马逊运营人员稽查
   * @name LuteosProductAmazonOperatorCheckDownload
   * @summary 导出
   * @request POST:/api/luteos/product/amazon/operatorCheck/download
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosProductAmazonOperatorCheckDownload {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AmazonProductOperatorCheckReq;
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
   * @tags 亚马逊运营人员稽查
   * @name LuteosProductAmazonOperatorCheckQueryDetail
   * @summary 详情查询
   * @request POST:/api/luteos/product/amazon/operatorCheck/queryDetail
   * @response `200` `CommonRespListAmazonOperatorCheckDetailBean` OK
   */
  export namespace LuteosProductAmazonOperatorCheckQueryDetail {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AmazonProductOperatorCheckDetailReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespListAmazonOperatorCheckDetailBean;
  }

  /**
   * No description
   * @tags 亚马逊运营人员稽查
   * @name LuteosProductAmazonOperatorCheckQueryList
   * @summary 列表查询
   * @request POST:/api/luteos/product/amazon/operatorCheck/queryList
   * @response `200` `AmazonProductOperatorListResp` OK
   */
  export namespace LuteosProductAmazonOperatorCheckQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AmazonProductOperatorCheckReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = AmazonProductOperatorListResp;
  }

  /**
   * No description
   * @tags 亚马逊运营人员稽查
   * @name LuteosProductAmazonOperatorCheckQuerySpuGtmList
   * @summary 查询GTM小组列表
   * @request GET:/api/luteos/product/amazon/operatorCheck/querySpuGtmList
   * @response `200` `CommonRespListString` OK
   */
  export namespace LuteosProductAmazonOperatorCheckQuerySpuGtmList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespListString;
  }

  /**
   * No description
   * @tags 属性管理
   * @name LuteosProductAttrConnectCategory
   * @summary 属性关联分类
   * @request POST:/api/luteos/product/attr/connectCategory
   * @response `200` `CommonRespBoolean` OK
   */
  export namespace LuteosProductAttrConnectCategory {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AttrCategoryConnectReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespBoolean;
  }

  /**
   * No description
   * @tags 属性管理
   * @name LuteosProductAttrExportAttr
   * @summary 属性信息导出
   * @request POST:/api/luteos/product/attr/exportAttr
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosProductAttrExportAttr {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AttrListQueryReq;
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
   * @tags 属性管理
   * @name LuteosProductAttrOperateAttr
   * @summary 属性操作
   * @request POST:/api/luteos/product/attr/operateAttr
   * @response `200` `CommonRespBoolean` OK
   */
  export namespace LuteosProductAttrOperateAttr {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AttrOperateReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespBoolean;
  }

  /**
   * No description
   * @tags 属性管理
   * @name LuteosProductAttrQueryAttrDetail
   * @summary 属性详情查询
   * @request GET:/api/luteos/product/attr/queryAttrDetail
   * @response `200` `AttrDetailResp` OK
   */
  export namespace LuteosProductAttrQueryAttrDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 属性编码,必填 */
      attrCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = AttrDetailResp;
  }

  /**
   * No description
   * @tags 属性管理
   * @name LuteosProductAttrQueryAttrList
   * @summary 属性列表查询
   * @request GET:/api/luteos/product/attr/queryAttrList
   * @response `200` `AttrListQueryResp` OK
   */
  export namespace LuteosProductAttrQueryAttrList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = AttrListQueryResp;
  }

  /**
   * No description
   * @tags 属性管理
   * @name LuteosProductAttrQueryCategoryLevelList
   * @summary 分类列表查询
   * @request GET:/api/luteos/product/attr/queryCategoryLevelList
   * @response `200` `CategoryLevelQueryInAttrResp` OK
   */
  export namespace LuteosProductAttrQueryCategoryLevelList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CategoryLevelQueryInAttrResp;
  }

  /**
   * No description
   * @tags 商品管理, 属性管理
   * @name LuteosProductAttrQueryProductAttrList
   * @summary 商品属性列表查询
   * @request GET:/api/luteos/product/attr/queryProductAttrList
   * @response `200` `ProductAttrListQueryResp` OK
   */
  export namespace LuteosProductAttrQueryProductAttrList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 五级分类编码 */
      categoryCode?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ProductAttrListQueryResp;
  }

  /**
   * No description
   * @tags 属性管理
   * @name LuteosProductAttrSaveOrUpdateAttr
   * @summary 属性信息保存
   * @request POST:/api/luteos/product/attr/saveOrUpdateAttr
   * @response `200` `AttrSaveResp` OK
   */
  export namespace LuteosProductAttrSaveOrUpdateAttr {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AttrSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = AttrSaveResp;
  }

  /**
   * No description
   * @tags 属性管理
   * @name LuteosProductAttrSaveOrUpdateAttrVal
   * @summary 属性值信息保存
   * @request POST:/api/luteos/product/attr/saveOrUpdateAttrVal
   * @response `200` `AttrValSaveResp` OK
   */
  export namespace LuteosProductAttrSaveOrUpdateAttrVal {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AttrValSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = AttrValSaveResp;
  }

  /**
   * No description
   * @tags B2C-在线商品
   * @name LuteosProductB2CListingQueryChannelList
   * @summary b2c-渠道列表
   * @request GET:/api/luteos/product/b2c/listing/queryChannelList
   * @response `200` `B2CChannelResp` OK
   */
  export namespace LuteosProductB2CListingQueryChannelList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = B2CChannelResp;
  }

  /**
   * No description
   * @tags B2C-在线商品
   * @name LuteosProductB2CListingQueryProductListingPage
   * @summary b2c-在线商品分页查询-V2
   * @request POST:/api/luteos/product/b2c/listing/queryProductListingPage
   * @response `200` `B2CProductListingResp` OK
   */
  export namespace LuteosProductB2CListingQueryProductListingPage {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = B2CListingProductReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = B2CProductListingResp;
  }

  /**
   * No description
   * @tags 产品条形码
   * @name LuteosProductBarcodeCancel
   * @summary 产品条形码取消
   * @request POST:/api/luteos/product/barcode/cancel
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosProductBarcodeCancel {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductBarCodeCancelReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags 产品条形码, 红人管理
   * @name LuteosProductBarcodeDownLoadBarCodeTemplate
   * @summary 下载导入条形码模板
   * @request POST:/api/luteos/product/barcode/downLoadBarCodeTemplate
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosProductBarcodeDownLoadBarCodeTemplate {
    export type RequestParams = {};
    export type RequestQuery = {};
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
   * @tags 产品条形码
   * @name LuteosProductBarcodeExport
   * @summary 产品条形码导出信息
   * @request POST:/api/luteos/product/barcode/export
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosProductBarcodeExport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductBarCodeQueryReq;
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
   * @tags 产品条形码
   * @name LuteosProductBarcodeQueryList
   * @summary 产品条形码查询
   * @request POST:/api/luteos/product/barcode/queryList
   * @response `200` `ProductBarCodeQueryResp` OK
   */
  export namespace LuteosProductBarcodeQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductBarCodeQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ProductBarCodeQueryResp;
  }

  /**
   * No description
   * @tags 产品条形码
   * @name LuteosProductBarcodeSaveOrUpdate
   * @summary 商品条形码保存
   * @request POST:/api/luteos/product/barcode/saveOrUpdate
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosProductBarcodeSaveOrUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductBarCodeSaveUpdateReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags 商品管理
   * @name LuteosProductBatchOperateProduct
   * @summary 商品信息批量操作
   * @request POST:/api/luteos/product/batchOperateProduct
   * @response `200` `CommonRespBoolean` OK
   */
  export namespace LuteosProductBatchOperateProduct {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductBatchOperateReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespBoolean;
  }

  /**
   * No description
   * @tags 品牌管理
   * @name LuteosProductBrandConnectProduct
   * @summary 品牌关联商品
   * @request POST:/api/luteos/product/brand/connectProduct
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosProductBrandConnectProduct {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BrandProductConnectReq;
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
   * @tags 品牌管理
   * @name LuteosProductBrandExportBrand
   * @summary 品牌信息导出
   * @request POST:/api/luteos/product/brand/exportBrand
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosProductBrandExportBrand {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BrandListQueryReq;
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
   * @tags 品牌管理
   * @name LuteosProductBrandOperateBrand
   * @summary 品牌操作
   * @request POST:/api/luteos/product/brand/operateBrand
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosProductBrandOperateBrand {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BrandOperateReq;
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
   * @tags 品牌管理
   * @name LuteosProductBrandQueryBrandAll
   * @summary 获取所有品牌
   * @request GET:/api/luteos/product/brand/queryBrandAll
   * @response `200` `BrandListQueryAllResp` OK
   */
  export namespace LuteosProductBrandQueryBrandAll {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = BrandListQueryAllResp;
  }

  /**
   * No description
   * @tags 品牌管理
   * @name LuteosProductBrandQueryBrandDetail
   * @summary 品牌详情查询
   * @request GET:/api/luteos/product/brand/queryBrandDetail
   * @response `200` `BrandDetailResp` OK
   */
  export namespace LuteosProductBrandQueryBrandDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 品牌编码 */
      brandCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = BrandDetailResp;
  }

  /**
   * No description
   * @tags 品牌管理
   * @name LuteosProductBrandQueryBrandList
   * @summary 品牌列表查询
   * @request GET:/api/luteos/product/brand/queryBrandList
   * @response `200` `BrandListQueryResp` OK
   */
  export namespace LuteosProductBrandQueryBrandList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = BrandListQueryResp;
  }

  /**
   * No description
   * @tags 品牌管理
   * @name LuteosProductBrandSaveOrUpdateBrand
   * @summary 品牌信息保存
   * @request POST:/api/luteos/product/brand/saveOrUpdateBrand
   * @response `200` `BrandSaveResp` OK
   */
  export namespace LuteosProductBrandSaveOrUpdateBrand {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BrandSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = BrandSaveResp;
  }

  /**
   * No description
   * @tags 商品分类管理
   * @name LuteosProductCategoryConnectAttr
   * @summary 分类关联属性
   * @request POST:/api/luteos/product/category/connectAttr
   * @response `200` `CommonRespBoolean` OK
   */
  export namespace LuteosProductCategoryConnectAttr {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CategoryAttrConnectReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespBoolean;
  }

  /**
   * No description
   * @tags 商品分类管理
   * @name LuteosProductCategoryExportCategory
   * @summary 分类信息导出
   * @request POST:/api/luteos/product/category/exportCategory
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosProductCategoryExportCategory {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CategoryListQueryReq;
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
   * @tags 商品分类管理
   * @name LuteosProductCategoryOperateCategory
   * @summary 分类操作
   * @request POST:/api/luteos/product/category/operateCategory
   * @response `200` `CommonRespBoolean` OK
   */
  export namespace LuteosProductCategoryOperateCategory {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CategoryOperateReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespBoolean;
  }

  /**
   * No description
   * @tags 商品分类管理
   * @name LuteosProductCategoryQueryCategoryDetail
   * @summary 分类详情查询
   * @request GET:/api/luteos/product/category/queryCategoryDetail
   * @response `200` `CategoryDetailResp` OK
   */
  export namespace LuteosProductCategoryQueryCategoryDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 分类编码 */
      categoryCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CategoryDetailResp;
  }

  /**
   * No description
   * @tags 商品分类管理
   * @name LuteosProductCategoryQueryCategoryLevelList
   * @summary 分类下级查询
   * @request GET:/api/luteos/product/category/queryCategoryLevelList
   * @response `200` `CategoryLevelQueryResp` OK
   */
  export namespace LuteosProductCategoryQueryCategoryLevelList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 分类编码 */
      categoryCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CategoryLevelQueryResp;
  }

  /**
   * No description
   * @tags 商品分类管理
   * @name LuteosProductCategoryQueryCategoryList
   * @summary 分类列表查询
   * @request GET:/api/luteos/product/category/queryCategoryList
   * @response `200` `CategoryListQueryResp` OK
   */
  export namespace LuteosProductCategoryQueryCategoryList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CategoryListQueryResp;
  }

  /**
   * No description
   * @tags 商品分类管理
   * @name LuteosProductCategoryQueryCategoryListByParam
   * @summary 查询分类列表-不含层级
   * @request GET:/api/luteos/product/category/queryCategoryListByParam
   * @response `200` `CategoryListQueryResp` OK
   */
  export namespace LuteosProductCategoryQueryCategoryListByParam {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CategoryListQueryResp;
  }

  /**
   * No description
   * @tags 商品分类管理
   * @name LuteosProductCategoryQueryCategoryTopAndLeafLevelList
   * @summary 分类一级/五级查询
   * @request GET:/api/luteos/product/category/queryCategoryTopAndLeafLevelList
   * @response `200` `CategoryLevelQueryResp` OK
   */
  export namespace LuteosProductCategoryQueryCategoryTopAndLeafLevelList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 分类编码 */
      categoryCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CategoryLevelQueryResp;
  }

  /**
   * No description
   * @tags 商品分类管理
   * @name LuteosProductCategoryQueryCategoryTree
   * @summary 获取分类树
   * @request GET:/api/luteos/product/category/queryCategoryTree
   * @response `200` `CategoryTreeResp` OK
   */
  export namespace LuteosProductCategoryQueryCategoryTree {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CategoryTreeResp;
  }

  /**
   * No description
   * @tags 商品分类管理
   * @name LuteosProductCategoryQuerySubCategoryList
   * @summary 下级分类列表查询
   * @request GET:/api/luteos/product/category/querySubCategoryList
   * @response `200` `CategoryListQueryResp` OK
   */
  export namespace LuteosProductCategoryQuerySubCategoryList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 分类编码 */
      categoryCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CategoryListQueryResp;
  }

  /**
   * No description
   * @tags 商品分类管理
   * @name LuteosProductCategorySaveOrUpdateCategory
   * @summary 分类信息保存
   * @request POST:/api/luteos/product/category/saveOrUpdateCategory
   * @response `200` `CategorySaveResp` OK
   */
  export namespace LuteosProductCategorySaveOrUpdateCategory {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CategorySaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CategorySaveResp;
  }

  /**
   * No description
   * @tags 商品管理
   * @name LuteosProductCheckRepeatProduct
   * @summary 商品编码重复校验
   * @request POST:/api/luteos/product/checkRepeatProduct
   * @response `200` `CommonRespBoolean` OK
   */
  export namespace LuteosProductCheckRepeatProduct {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductCheckRepeatReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespBoolean;
  }

  /**
   * No description
   * @tags 在线商品标签
   * @name LuteosProductCommonListingListingUpdateTag
   * @summary 在线商品标签保存更新
   * @request POST:/api/luteos/product/common/listing/listing/updateTag
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosProductCommonListingListingUpdateTag {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ListingBatchModifyTagV2Req;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags 在线商品标签
   * @name LuteosProductCommonListingQueryTag
   * @summary 在线商品标签查询
   * @request POST:/api/luteos/product/common/listing/queryTag
   * @response `200` `ListingTagResp` OK
   */
  export namespace LuteosProductCommonListingQueryTag {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ListingQueryTagV2Req;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ListingTagResp;
  }

  /**
   * No description
   * @tags 在线商品标签
   * @name LuteosProductCommonListingSaveOperator
   * @summary 在线商品保存运营人员
   * @request POST:/api/luteos/product/common/listing/saveOperator
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosProductCommonListingSaveOperator {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OperatorCommonSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags 在线商品标签
   * @name LuteosProductCommonListingSaveProductLink
   * @summary 在线商品保存商品链接
   * @request POST:/api/luteos/product/common/listing/saveProductLink
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosProductCommonListingSaveProductLink {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductLinkCommonSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags 商品管理
   * @name LuteosProductConnectCategory
   * @summary 商品关联分类
   * @request POST:/api/luteos/product/connectCategory
   * @response `200` `CommonRespBoolean` OK
   */
  export namespace LuteosProductConnectCategory {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductConnectCategoryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespBoolean;
  }

  /**
   * No description
   * @tags 衍生项目管理
   * @name LuteosProductDeriveDownload
   * @summary 衍生项目列表导出
   * @request GET:/api/luteos/product/derive/download
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosProductDeriveDownload {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
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
   * @tags 衍生项目管理
   * @name LuteosProductDeriveQueryDeriveList
   * @summary 衍生项目列表查询
   * @request GET:/api/luteos/product/derive/queryDeriveList
   * @response `200` `DeriveQueryResp` OK
   */
  export namespace LuteosProductDeriveQueryDeriveList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DeriveQueryResp;
  }

  /**
   * No description
   * @tags 衍生项目管理
   * @name LuteosProductDeriveQueryDeriveListParam
   * @summary 衍生项目列表查询参数
   * @request GET:/api/luteos/product/derive/queryDeriveListParam
   * @response `200` `DeriveListParamResp` OK
   */
  export namespace LuteosProductDeriveQueryDeriveListParam {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DeriveListParamResp;
  }

  /**
   * No description
   * @tags 易仓SKU管理
   * @name LuteosProductEccangSkuExportEccangSku
   * @summary 导出供应链SKU
   * @request POST:/api/luteos/product/eccangSku/exportEccangSku
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosProductEccangSkuExportEccangSku {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = EccangSkuQueryReq;
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
   * @tags 易仓SKU管理
   * @name LuteosProductEccangSkuQueryEccangSkuFullList
   * @summary 供应链SKU列表全字段查询
   * @request GET:/api/luteos/product/eccangSku/queryEccangSkuFullList
   * @response `200` `EccangSkuFullQueryResp` OK
   */
  export namespace LuteosProductEccangSkuQueryEccangSkuFullList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = EccangSkuFullQueryResp;
  }

  /**
   * No description
   * @tags 易仓SKU管理
   * @name LuteosProductEccangSkuQueryEccangSkuList
   * @summary 供应链SKU列表查询
   * @request GET:/api/luteos/product/eccangSku/queryEccangSkuList
   * @response `200` `EccangSkuQueryResp` OK
   */
  export namespace LuteosProductEccangSkuQueryEccangSkuList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = EccangSkuQueryResp;
  }

  /**
   * No description
   * @tags 易仓SKU管理
   * @name LuteosProductEccangSkuSyncEccang
   * @summary 同步易仓
   * @request POST:/api/luteos/product/eccangSku/syncEccang
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosProductEccangSkuSyncEccang {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = EccangSkuQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags 易仓SKU管理
   * @name LuteosProductEccangSkuV2ExportEccangSku
   * @summary 导出供应链SKU-v2
   * @request POST:/api/luteos/product/eccangSku/v2/exportEccangSku
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosProductEccangSkuV2ExportEccangSku {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = EccangSkuQueryReq;
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
   * @tags 易仓SKU管理
   * @name LuteosProductEccangSkuV2QueryEccangSkuList
   * @summary 供应链SKU列表查询-v2
   * @request GET:/api/luteos/product/eccangSku/v2/queryEccangSkuList
   * @response `200` `EccangSkuQueryV2Resp` OK
   */
  export namespace LuteosProductEccangSkuV2QueryEccangSkuList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = EccangSkuQueryV2Resp;
  }

  /**
   * No description
   * @tags 商品到期推荐策略管理
   * @name LuteosProductExpireConfigInfo
   * @summary 获取商品到期配置详情
   * @request GET:/api/luteos/product/expire-config/info
   * @response `200` `void` OK
   */
  export namespace LuteosProductExpireConfigInfo {
    export type RequestParams = {};
    export type RequestQuery = {
      /** recordCode */
      recordCode?: string;
    };
    export type RequestBody = never;
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
   * @tags 商品到期推荐策略管理
   * @name LuteosProductExpireConfigList
   * @summary 获取商品到期配置列表
   * @request GET:/api/luteos/product/expire-config/list
   * @response `200` `void` OK
   */
  export namespace LuteosProductExpireConfigList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
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
   * @tags 商品到期推荐策略管理
   * @name LuteosProductExpireConfigSave
   * @summary 新增商品到期配置
   * @request POST:/api/luteos/product/expire-config/save
   * @response `200` `void` OK
   */
  export namespace LuteosProductExpireConfigSave {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
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
   * @tags 商品到期推荐策略管理
   * @name LuteosProductExpireConfigUpdate
   * @summary 更新商品到期配置
   * @request POST:/api/luteos/product/expire-config/update
   * @response `200` `void` OK
   */
  export namespace LuteosProductExpireConfigUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
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
   * @tags 商品管理
   * @name LuteosProductExportProduct
   * @summary 商品导出信息
   * @request POST:/api/luteos/product/exportProduct
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosProductExportProduct {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductListQueryReq;
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
   * @tags 组合产品管理
   * @name LuteosProductGroupQueryGroupDetail
   * @summary 组合产品详情查询
   * @request GET:/api/luteos/product/group/queryGroupDetail
   * @response `200` `ProductGroupDetailResp` OK
   */
  export namespace LuteosProductGroupQueryGroupDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 组合产品SPU */
      groupProductSpu: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ProductGroupDetailResp;
  }

  /**
   * No description
   * @tags 组合产品管理
   * @name LuteosProductGroupQueryProductGroupList
   * @summary 组合产品列表查询
   * @request GET:/api/luteos/product/group/queryProductGroupList
   * @response `200` `ProductGroupListResp` OK
   */
  export namespace LuteosProductGroupQueryProductGroupList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ProductGroupListResp;
  }

  /**
   * No description
   * @tags 组合产品管理
   * @name LuteosProductGroupSaveProductGroup
   * @summary 组合产品信息保存
   * @request POST:/api/luteos/product/group/saveProductGroup
   * @response `200` `ProductGroupSaveResp` OK
   */
  export namespace LuteosProductGroupSaveProductGroup {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductGroupSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ProductGroupSaveResp;
  }

  /**
   * No description
   * @tags 组合SKU管理
   * @name LuteosProductGroupSkuQueryGroupSkuDetail
   * @summary 组合SKU详情查询
   * @request GET:/api/luteos/product/group/sku/queryGroupSkuDetail
   * @response `200` `ProductGroupSkuDetailResp` OK
   */
  export namespace LuteosProductGroupSkuQueryGroupSkuDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 组合SKU编码 */
      groupSkuCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ProductGroupSkuDetailResp;
  }

  /**
   * No description
   * @tags 组合SKU管理
   * @name LuteosProductGroupSkuQueryProductGroupSkuList
   * @summary 组合SKU列表查询
   * @request GET:/api/luteos/product/group/sku/queryProductGroupSkuList
   * @response `200` `ProductGroupSkuListResp` OK
   */
  export namespace LuteosProductGroupSkuQueryProductGroupSkuList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ProductGroupSkuListResp;
  }

  /**
   * No description
   * @tags 组合SKU管理
   * @name LuteosProductGroupSkuSaveProductGroupSku
   * @summary 组合SKU信息保存
   * @request POST:/api/luteos/product/group/sku/saveProductGroupSku
   * @response `200` `ProductGroupSkuSaveResp` OK
   */
  export namespace LuteosProductGroupSkuSaveProductGroupSku {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductGroupSkuSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ProductGroupSkuSaveResp;
  }

  /**
   * No description
   * @tags 产品品线管理
   * @name LuteosProductLineQueryDetail
   * @summary 查询详情
   * @request GET:/api/luteos/product/line/queryDetail
   * @response `200` `ProductLineDetailResp` OK
   */
  export namespace LuteosProductLineQueryDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** code */
      code: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ProductLineDetailResp;
  }

  /**
   * No description
   * @tags 产品品线管理
   * @name LuteosProductLineQueryList
   * @summary 列表查询
   * @request POST:/api/luteos/product/line/queryList
   * @response `200` `ProductLineListResp` OK
   */
  export namespace LuteosProductLineQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductLineListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ProductLineListResp;
  }

  /**
   * No description
   * @tags 产品品线管理
   * @name LuteosProductLineSaveOrUpdate
   * @summary 新增或者编辑品线
   * @request POST:/api/luteos/product/line/saveOrUpdate
   * @response `200` `CommonRespListProductLineSaveResp` OK
   */
  export namespace LuteosProductLineSaveOrUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductLineSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespListProductLineSaveResp;
  }

  /**
   * No description
   * @tags MAC地址管理
   * @name LuteosProductMacBatchOperateMacAddr
   * @summary 批量操作MAC地址
   * @request POST:/api/luteos/product/mac/batchOperateMacAddr
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosProductMacBatchOperateMacAddr {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MacAddrOperateReq;
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
   * @tags MAC地址管理
   * @name LuteosProductMacCheckRelSupplySku
   * @summary 关联供应链产品sku校验
   * @request POST:/api/luteos/product/mac/checkRelSupplySku
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosProductMacCheckRelSupplySku {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MacRelSupplyCheckReq;
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
   * @tags MAC地址管理
   * @name LuteosProductMacExportMacAddr
   * @summary MAC地址导出
   * @request POST:/api/luteos/product/mac/exportMacAddr
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosProductMacExportMacAddr {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MacAddrQueryReq;
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
   * @tags MAC地址管理
   * @name LuteosProductMacOperate
   * @summary 贴片工厂操作
   * @request POST:/api/luteos/product/mac/operate
   * @response `200` `MacFactoryOperateResp` OK
   */
  export namespace LuteosProductMacOperate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MacFactoryOperateReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MacFactoryOperateResp;
  }

  /**
   * No description
   * @tags MAC地址管理
   * @name LuteosProductMacOperateProductCode
   * @summary 产品代码操作
   * @request POST:/api/luteos/product/mac/operateProductCode
   * @response `200` `MacProductCodeOperateResp` OK
   */
  export namespace LuteosProductMacOperateProductCode {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MacProductCodeOperateReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MacProductCodeOperateResp;
  }

  /**
   * No description
   * @tags MAC地址管理
   * @name LuteosProductMacQueryDetail
   * @summary 贴片工厂详情查询
   * @request GET:/api/luteos/product/mac/queryDetail
   * @response `200` `MacFactoryDetailResp` OK
   */
  export namespace LuteosProductMacQueryDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 工厂编码 */
      factoryCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MacFactoryDetailResp;
  }

  /**
   * No description
   * @tags MAC地址管理
   * @name LuteosProductMacQueryList
   * @summary 贴片工厂列表查询
   * @request GET:/api/luteos/product/mac/queryList
   * @response `200` `MacFactoryQueryResp` OK
   */
  export namespace LuteosProductMacQueryList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MacFactoryQueryResp;
  }

  /**
   * No description
   * @tags MAC地址管理
   * @name LuteosProductMacQueryMacAddressList
   * @summary MAC地址列表查询
   * @request POST:/api/luteos/product/mac/queryMacAddressList
   * @response `200` `MacAddrQueryResp` OK
   */
  export namespace LuteosProductMacQueryMacAddressList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MacAddrQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MacAddrQueryResp;
  }

  /**
   * No description
   * @tags MAC地址管理
   * @name LuteosProductMacQueryProductCodeDetail
   * @summary 产品代码详情查询
   * @request GET:/api/luteos/product/mac/queryProductCodeDetail
   * @response `200` `MacProductCodeDetailResp` OK
   */
  export namespace LuteosProductMacQueryProductCodeDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 产品代码 */
      productCode?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MacProductCodeDetailResp;
  }

  /**
   * No description
   * @tags MAC地址管理
   * @name LuteosProductMacQueryProductCodeList
   * @summary 产品代码列表查询
   * @request GET:/api/luteos/product/mac/queryProductCodeList
   * @response `200` `MacProductCodeQueryResp` OK
   */
  export namespace LuteosProductMacQueryProductCodeList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MacProductCodeQueryResp;
  }

  /**
   * No description
   * @tags MAC地址管理
   * @name LuteosProductMacQueryPurchaseOrderList
   * @summary PO采购订单查询
   * @request POST:/api/luteos/product/mac/queryPurchaseOrderList
   * @response `200` `PurchaseOrderQueryResp` OK
   */
  export namespace LuteosProductMacQueryPurchaseOrderList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PurchaseOrderQueryResp;
  }

  /**
   * No description
   * @tags MAC地址管理
   * @name LuteosProductMacQuerySupplierList
   * @summary 供应商列表查询
   * @request GET:/api/luteos/product/mac/querySupplierList
   * @response `200` `CommonRespMacSupplierQueryResp` OK
   */
  export namespace LuteosProductMacQuerySupplierList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespMacSupplierQueryResp;
  }

  /**
   * No description
   * @tags MAC地址管理
   * @name LuteosProductMacSaveFactory
   * @summary 贴片工厂新增
   * @request POST:/api/luteos/product/mac/saveFactory
   * @response `200` `MacFactorySaveResp` OK
   */
  export namespace LuteosProductMacSaveFactory {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MacFactorySaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MacFactorySaveResp;
  }

  /**
   * No description
   * @tags MAC地址管理
   * @name LuteosProductMacSaveMacAddress
   * @summary MAC地址保存
   * @request POST:/api/luteos/product/mac/saveMacAddress
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosProductMacSaveMacAddress {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MacAddrSaveReq;
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
   * @tags MAC地址管理
   * @name LuteosProductMacSaveProductCode
   * @summary 产品代码保存
   * @request POST:/api/luteos/product/mac/saveProductCode
   * @response `200` `MacProductCodeSaveResp` OK
   */
  export namespace LuteosProductMacSaveProductCode {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MacProductCodeSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MacProductCodeSaveResp;
  }

  /**
   * No description
   * @tags 内购用户地址管理
   * @name LuteosProductMallAddrDeleteUserAddr
   * @summary 删除用户地址
   * @request POST:/api/luteos/product/mall/addr/deleteUserAddr
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosProductMallAddrDeleteUserAddr {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MallUserDeleteReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags 内购用户地址管理
   * @name LuteosProductMallAddrQueryDefaultAddr
   * @summary 查询用户默认地址
   * @request GET:/api/luteos/product/mall/addr/queryDefaultAddr
   * @response `200` `MallUserDefaultAddrResp` OK
   */
  export namespace LuteosProductMallAddrQueryDefaultAddr {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MallUserDefaultAddrResp;
  }

  /**
   * No description
   * @tags 内购用户地址管理
   * @name LuteosProductMallAddrQueryUserAddr
   * @summary 查询用户地址详情
   * @request GET:/api/luteos/product/mall/addr/queryUserAddr
   * @response `200` `MallUserDefaultAddrResp` OK
   */
  export namespace LuteosProductMallAddrQueryUserAddr {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 地址编码 */
      addressCode?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MallUserDefaultAddrResp;
  }

  /**
   * No description
   * @tags 内购用户地址管理
   * @name LuteosProductMallAddrQueryUserAddrList
   * @summary 查询地址管理列表
   * @request GET:/api/luteos/product/mall/addr/queryUserAddrList
   * @response `200` `MallUserAddrListResp` OK
   */
  export namespace LuteosProductMallAddrQueryUserAddrList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MallUserAddrListResp;
  }

  /**
   * No description
   * @tags 内购用户地址管理
   * @name LuteosProductMallAddrSaveUserAddr
   * @summary 保存用户地址
   * @request POST:/api/luteos/product/mall/addr/saveUserAddr
   * @response `200` `MallUserAddrSaveResp` OK
   */
  export namespace LuteosProductMallAddrSaveUserAddr {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MallUserAddrSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MallUserAddrSaveResp;
  }

  /**
   * No description
   * @tags 内购商城管理
   * @name LuteosProductMallConfirmReceive
   * @summary 确认收货
   * @request POST:/api/luteos/product/mall/confirmReceive
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosProductMallConfirmReceive {
    export type RequestParams = {};
    export type RequestQuery = {
      /** orderCode */
      orderCode: string;
    };
    export type RequestBody = never;
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
   * @tags 内购商城管理
   * @name LuteosProductMallExportOrder
   * @summary 导出内购订单
   * @request POST:/api/luteos/product/mall/exportOrder
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosProductMallExportOrder {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MallOrderListReq;
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
   * @tags 内购商城管理
   * @name LuteosProductMallExportProductList
   * @summary 导出内购产品清单
   * @request POST:/api/luteos/product/mall/exportProductList
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosProductMallExportProductList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MallProductListReq;
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
   * @tags 内购商城管理
   * @name LuteosProductMallOperateOrder
   * @summary 操作内购订单
   * @request POST:/api/luteos/product/mall/operateOrder
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosProductMallOperateOrder {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MallOrderOperateReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags 内购商城管理
   * @name LuteosProductMallOperateProduct
   * @summary 操作内购商品
   * @request POST:/api/luteos/product/mall/operateProduct
   * @response `200` `MallProductSaveResp` OK
   */
  export namespace LuteosProductMallOperateProduct {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MallProductOperateReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MallProductSaveResp;
  }

  /**
   * No description
   * @tags 内购商城管理
   * @name LuteosProductMallQueryOrderDetail
   * @summary 查询内购订单详情-管理端
   * @request GET:/api/luteos/product/mall/queryOrderDetail
   * @response `200` `MallOrderDetailResp` OK
   */
  export namespace LuteosProductMallQueryOrderDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * 操作类型 0-管理端 1-用户端
       * @format int32
       */
      operateType?: number;
      /** 订单号 */
      orderCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MallOrderDetailResp;
  }

  /**
   * No description
   * @tags 内购商城管理
   * @name LuteosProductMallQueryOrderList
   * @summary 查询内购订单列表-管理端
   * @request GET:/api/luteos/product/mall/queryOrderList
   * @response `200` `MallOrderListResp` OK
   */
  export namespace LuteosProductMallQueryOrderList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MallOrderListResp;
  }

  /**
   * No description
   * @tags 内购商城管理
   * @name LuteosProductMallQueryOrderStatus
   * @summary 查询内购订单支付状态
   * @request GET:/api/luteos/product/mall/queryOrderStatus
   * @response `200` `MallOrderStatusResp` OK
   */
  export namespace LuteosProductMallQueryOrderStatus {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 订单编码 */
      orderCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MallOrderStatusResp;
  }

  /**
   * No description
   * @tags 内购商城管理
   * @name LuteosProductMallQueryProductDetail
   * @summary 查询内购商品详情
   * @request GET:/api/luteos/product/mall/queryProductDetail
   * @response `200` `MallProductDetailResp` OK
   */
  export namespace LuteosProductMallQueryProductDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 供应链sku */
      productSku: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MallProductDetailResp;
  }

  /**
   * No description
   * @tags 内购商城管理
   * @name LuteosProductMallQueryProductList
   * @summary 查询内购商品列表
   * @request POST:/api/luteos/product/mall/queryProductList
   * @response `200` `MallProductListResp` OK
   */
  export namespace LuteosProductMallQueryProductList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MallProductListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MallProductListResp;
  }

  /**
   * No description
   * @tags 内购商城管理
   * @name LuteosProductMallSaveProduct
   * @summary 保存内购商品
   * @request POST:/api/luteos/product/mall/saveProduct
   * @response `200` `MallProductSaveResp` OK
   */
  export namespace LuteosProductMallSaveProduct {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MallProductSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MallProductSaveResp;
  }

  /**
   * No description
   * @tags 内购商城管理
   * @name LuteosProductMallSyncErp
   * @summary 同步易仓
   * @request GET:/api/luteos/product/mall/syncErp
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosProductMallSyncErp {
    export type RequestParams = {};
    export type RequestQuery = {
      /** orderCode */
      orderCode: string;
    };
    export type RequestBody = never;
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
   * @tags 内购商城用户端管理
   * @name LuteosProductMallUserOperateOrder
   * @summary 操作订单
   * @request POST:/api/luteos/product/mall/user/operateOrder
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosProductMallUserOperateOrder {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MallClientOrderOperateReq;
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
   * @tags 内购商城用户端管理
   * @name LuteosProductMallUserOperateShoppingCart
   * @summary 操作购物车
   * @request POST:/api/luteos/product/mall/user/operateShoppingCart
   * @response `200` `MallShopCartOperateResp` OK
   */
  export namespace LuteosProductMallUserOperateShoppingCart {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MallShopCartOperateReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MallShopCartOperateResp;
  }

  /**
   * No description
   * @tags 内购商城用户端管理
   * @name LuteosProductMallUserPreTrade
   * @summary 测试生成二维码
   * @request GET:/api/luteos/product/mall/user/preTrade
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosProductMallUserPreTrade {
    export type RequestParams = {};
    export type RequestQuery = {
      /** orderCode */
      orderCode: string;
      /** subject */
      subject: string;
      /** totalAmount */
      totalAmount: number;
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
   * @tags 内购商城用户端管理
   * @name LuteosProductMallUserQueryCartCount
   * @summary 查询购物车清单数量
   * @request POST:/api/luteos/product/mall/user/queryCartCount
   * @response `200` `MallShopCartCountResp` OK
   */
  export namespace LuteosProductMallUserQueryCartCount {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MallShopCartCountResp;
  }

  /**
   * No description
   * @tags 内购商城用户端管理
   * @name LuteosProductMallUserQueryProductList
   * @summary 查询商品首页列表
   * @request POST:/api/luteos/product/mall/user/queryProductList
   * @response `200` `MallProductClientListResp` OK
   */
  export namespace LuteosProductMallUserQueryProductList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MallProductClientListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MallProductClientListResp;
  }

  /**
   * No description
   * @tags 内购商城用户端管理
   * @name LuteosProductMallUserQueryShoppingCartList
   * @summary 查询购物车列表
   * @request GET:/api/luteos/product/mall/user/queryShoppingCartList
   * @response `200` `MallShopCartListResp` OK
   */
  export namespace LuteosProductMallUserQueryShoppingCartList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    export type ResponseBody = MallShopCartListResp;
  }

  /**
   * No description
   * @tags 内购商城用户端管理
   * @name LuteosProductMallUserSubmitOrder
   * @summary 提交订单
   * @request POST:/api/luteos/product/mall/user/submitOrder
   * @response `200` `MallOrderSubmitResp` OK
   */
  export namespace LuteosProductMallUserSubmitOrder {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MallOrderSubmitReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MallOrderSubmitResp;
  }

  /**
   * No description
   * @tags 型号管理
   * @name LuteosProductModelConnectProduct
   * @summary 型号关联商品
   * @request POST:/api/luteos/product/model/connectProduct
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosProductModelConnectProduct {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ModelProductConnectReq;
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
   * @tags 型号管理
   * @name LuteosProductModelExportModel
   * @summary 型号信息导出
   * @request POST:/api/luteos/product/model/exportModel
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosProductModelExportModel {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ModelListQueryReq;
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
   * @tags 型号管理
   * @name LuteosProductModelOperateModel
   * @summary 型号操作
   * @request POST:/api/luteos/product/model/operateModel
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosProductModelOperateModel {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ModelOperateReq;
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
   * @tags 型号管理
   * @name LuteosProductModelQueryModelDetail
   * @summary 型号详情查询
   * @request GET:/api/luteos/product/model/queryModelDetail
   * @response `200` `ModelDetailResp` OK
   */
  export namespace LuteosProductModelQueryModelDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 型号编码 */
      modelCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ModelDetailResp;
  }

  /**
   * No description
   * @tags 型号管理
   * @name LuteosProductModelQueryModelList
   * @summary 型号列表查询
   * @request GET:/api/luteos/product/model/queryModelList
   * @response `200` `ModelListQueryResp` OK
   */
  export namespace LuteosProductModelQueryModelList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ModelListQueryResp;
  }

  /**
   * No description
   * @tags 型号管理
   * @name LuteosProductModelSaveOrUpdateModel
   * @summary 型号信息保存
   * @request POST:/api/luteos/product/model/saveOrUpdateModel
   * @response `200` `ModelSaveResp` OK
   */
  export namespace LuteosProductModelSaveOrUpdateModel {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ModelSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ModelSaveResp;
  }

  /**
   * No description
   * @tags 在线商品跟卖监控
   * @name LuteosProductMonitorQueryChartData
   * @summary 趋势图数据
   * @request POST:/api/luteos/product/monitor/queryChartData
   * @response `200` `OnlineProductChartResp` OK
   */
  export namespace LuteosProductMonitorQueryChartData {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OnlineProductChartReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = OnlineProductChartResp;
  }

  /**
   * No description
   * @tags 在线商品跟卖监控
   * @name LuteosProductMonitorQueryList
   * @summary 列表查询
   * @request POST:/api/luteos/product/monitor/queryList
   * @response `200` `OnlineProductMonitorResp` OK
   */
  export namespace LuteosProductMonitorQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OnlineProductMonitorReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = OnlineProductMonitorResp;
  }

  /**
   * No description
   * @tags msrp管理
   * @name LuteosProductMsrpAddActive
   * @summary 活动折扣计划表-SPU新增编辑
   * @request POST:/api/luteos/product/msrp/addActive
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosProductMsrpAddActive {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ActiveDiscountPlanAddReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags msrp管理
   * @name LuteosProductMsrpAddSkuActive
   * @summary 活动折扣计划表-SKU新增编辑
   * @request POST:/api/luteos/product/msrp/addSkuActive
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosProductMsrpAddSkuActive {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SkuActiveDiscountPlanAddReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags msrp管理
   * @name LuteosProductMsrpApproveActive
   * @summary 活动折扣计划表-提交审批
   * @request POST:/api/luteos/product/msrp/approveActive
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosProductMsrpApproveActive {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DiscountPlanWeekApproveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags msrp管理
   * @name LuteosProductMsrpBatchAddActive
   * @summary 活动折扣计划表-批量保存
   * @request POST:/api/luteos/product/msrp/batchAddActive
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosProductMsrpBatchAddActive {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ActiveDiscountPlanBatchAddReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags msrp管理
   * @name LuteosProductMsrpBatchSave
   * @summary msrp管理-批量编辑保存
   * @request POST:/api/luteos/product/msrp/batchSave
   * @response `200` `MsrpBatchSaveResp` OK
   */
  export namespace LuteosProductMsrpBatchSave {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MsrpSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MsrpBatchSaveResp;
  }

  /**
   * No description
   * @tags msrp定价测算管理
   * @name LuteosProductMsrpCalculationGetOnlinePromotionRate
   * @summary 定价测算-线上促销率查询
   * @request GET:/api/luteos/product/msrp/calculation/getOnlinePromotionRate
   * @response `200` `CommonRespMsrpOnlinePromotionResp` OK
   */
  export namespace LuteosProductMsrpCalculationGetOnlinePromotionRate {
    export type RequestParams = {};
    export type RequestQuery = {
      /** channel */
      channel: string;
      /** countryCode */
      countryCode: string;
      /** skuCode */
      skuCode: string;
      /** spuCode */
      spuCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespMsrpOnlinePromotionResp;
  }

  /**
   * No description
   * @tags msrp定价测算管理
   * @name LuteosProductMsrpCalculationQueryAllEuSite
   * @summary 定价测算-EU范围站点
   * @request GET:/api/luteos/product/msrp/calculation/queryAllEuSite
   * @response `200` `CommonRespListString` OK
   */
  export namespace LuteosProductMsrpCalculationQueryAllEuSite {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespListString;
  }

  /**
   * No description
   * @tags msrp定价测算管理
   * @name LuteosProductMsrpCalculationQueryCalculateBaseData
   * @summary 定价测算-BI数据查询
   * @request POST:/api/luteos/product/msrp/calculation/queryCalculateBaseData
   * @response `200` `CommonRespMsrpCalculateBaseDataResp` OK
   */
  export namespace LuteosProductMsrpCalculationQueryCalculateBaseData {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MsrpCalculateBaseReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespMsrpCalculateBaseDataResp;
  }

  /**
   * No description
   * @tags msrp定价测算管理
   * @name LuteosProductMsrpCalculationQueryChannel
   * @summary 定价测算-渠道下拉框
   * @request GET:/api/luteos/product/msrp/calculation/queryChannel
   * @response `200` `CommonRespListString` OK
   */
  export namespace LuteosProductMsrpCalculationQueryChannel {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespListString;
  }

  /**
   * No description
   * @tags msrp定价测算管理
   * @name LuteosProductMsrpCalculationQueryCurrency
   * @summary 定价测算-汇率查询
   * @request GET:/api/luteos/product/msrp/calculation/queryCurrency
   * @response `200` `CommonRespMapStringOdsFinanceCurrency` OK
   */
  export namespace LuteosProductMsrpCalculationQueryCurrency {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespMapStringOdsFinanceCurrency;
  }

  /**
   * No description
   * @tags msrp定价测算管理
   * @name LuteosProductMsrpCalculationQueryDetail
   * @summary msrp定价测算-详情
   * @request POST:/api/luteos/product/msrp/calculation/queryDetail
   * @response `200` `CommonRespMsrpCalculatePriceDetailResp` OK
   */
  export namespace LuteosProductMsrpCalculationQueryDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * id
       * @format int64
       */
      id: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespMsrpCalculatePriceDetailResp;
  }

  /**
   * No description
   * @tags msrp定价测算管理
   * @name LuteosProductMsrpCalculationQueryList
   * @summary msrp定价测算列表查询
   * @request POST:/api/luteos/product/msrp/calculation/queryList
   * @response `200` `MsrpCalculatePriceQueryListResp` OK
   */
  export namespace LuteosProductMsrpCalculationQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MsrpQueryListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MsrpCalculatePriceQueryListResp;
  }

  /**
   * No description
   * @tags msrp定价测算管理
   * @name LuteosProductMsrpCalculationSave
   * @summary msrp定价测算-新增
   * @request POST:/api/luteos/product/msrp/calculation/save
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosProductMsrpCalculationSave {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MsrpCalculatePriceDetailSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags msrp定价测算管理
   * @name LuteosProductMsrpCalculationSubmit
   * @summary msrp定价测算-确定
   * @request POST:/api/luteos/product/msrp/calculation/submit
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosProductMsrpCalculationSubmit {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * id
       * @format int64
       */
      id: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags msrp管理
   * @name LuteosProductMsrpCancelApproveActive
   * @summary 活动折扣计划表-撤销审批
   * @request POST:/api/luteos/product/msrp/cancelApproveActive
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosProductMsrpCancelApproveActive {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DiscountPlanWeekCancelReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags msrp管理
   * @name LuteosProductMsrpDeleteSkuDetail
   * @summary msrp管理-删除sku
   * @request POST:/api/luteos/product/msrp/deleteSkuDetail
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosProductMsrpDeleteSkuDetail {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MsrpSpuDetailReq;
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
   * @tags msrp管理
   * @name LuteosProductMsrpEditActive
   * @summary 活动折扣计划表-点击触笔进入编辑
   * @request POST:/api/luteos/product/msrp/editActive
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosProductMsrpEditActive {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DiscountPlanWeekEditReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags msrp管理
   * @name LuteosProductMsrpExportMsrp
   * @summary MSRP管理导出
   * @request POST:/api/luteos/product/msrp/exportMsrp
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosProductMsrpExportMsrp {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MsrpQueryListReq;
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
   * @tags msrp管理
   * @name LuteosProductMsrpQueryApproveLog
   * @summary 活动折扣计划表-审批记录
   * @request GET:/api/luteos/product/msrp/queryApproveLog
   * @response `200` `WeekApproveLogResp` OK
   */
  export namespace LuteosProductMsrpQueryApproveLog {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 记录编码 */
      code?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = WeekApproveLogResp;
  }

  /**
   * No description
   * @tags msrp管理
   * @name LuteosProductMsrpQueryBatchActive
   * @summary 活动折扣计划表-批量编辑查询
   * @request POST:/api/luteos/product/msrp/queryBatchActive
   * @response `200` `ActiveDiscountPlanBatchEditQueryResp` OK
   */
  export namespace LuteosProductMsrpQueryBatchActive {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ActiveDiscountPlanBatchEditQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ActiveDiscountPlanBatchEditQueryResp;
  }

  /**
   * No description
   * @tags msrp管理
   * @name LuteosProductMsrpQueryBatchEditList
   * @summary msrp管理-批量编辑查询
   * @request POST:/api/luteos/product/msrp/queryBatchEditList
   * @response `200` `CommonRespMsrpQueryChannelBatchListResp` OK
   */
  export namespace LuteosProductMsrpQueryBatchEditList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MsrpBatchQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespMsrpQueryChannelBatchListResp;
  }

  /**
   * No description
   * @tags msrp管理
   * @name LuteosProductMsrpQueryEditActive
   * @summary 活动折扣计划表-SPU列表编辑查询&详情查询
   * @request GET:/api/luteos/product/msrp/queryEditActive
   * @response `200` `ActiveDiscountPlanAddQueryResp` OK
   */
  export namespace LuteosProductMsrpQueryEditActive {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ActiveDiscountPlanAddQueryResp;
  }

  /**
   * No description
   * @tags msrp管理
   * @name LuteosProductMsrpQueryList
   * @summary msrp列表查询
   * @request POST:/api/luteos/product/msrp/queryList
   * @response `200` `MsrpQueryListResp` OK
   */
  export namespace LuteosProductMsrpQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MsrpQueryListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MsrpQueryListResp;
  }

  /**
   * No description
   * @tags msrp管理
   * @name LuteosProductMsrpQueryOneSkuDetail
   * @summary msrp管理-查询sku详情
   * @request GET:/api/luteos/product/msrp/queryOneSkuDetail
   * @response `200` `CommonRespMsrpSkuDetailBean` OK
   */
  export namespace LuteosProductMsrpQueryOneSkuDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** countryCode */
      countryCode: string;
      /** skuCode */
      skuCode: string;
      /** spuCode */
      spuCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespMsrpSkuDetailBean;
  }

  /**
   * No description
   * @tags msrp管理
   * @name LuteosProductMsrpQueryOneSpuDetail
   * @summary msrp管理-促销查spu详情
   * @request GET:/api/luteos/product/msrp/queryOneSpuDetail
   * @response `200` `CommonRespMsrpSpuDetailResp` OK
   */
  export namespace LuteosProductMsrpQueryOneSpuDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** channel */
      channel: string;
      /** countryCode */
      countryCode: string;
      /** spuCode */
      spuCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespMsrpSpuDetailResp;
  }

  /**
   * No description
   * @tags msrp管理
   * @name LuteosProductMsrpQueryOperatorBySpuAndCountryAndChannel
   * @summary 根据spu,国家，渠道获取运营人员
   * @request GET:/api/luteos/product/msrp/queryOperatorBySpuAndCountryAndChannel
   * @response `200` `CommonRespOperatorQueryResp` OK
   */
  export namespace LuteosProductMsrpQueryOperatorBySpuAndCountryAndChannel {
    export type RequestParams = {};
    export type RequestQuery = {
      /** channel */
      channel: string;
      /** countryCode */
      countryCode: string;
      /** spuCode */
      spuCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespOperatorQueryResp;
  }

  /**
   * No description
   * @tags msrp管理
   * @name LuteosProductMsrpQueryPlanList
   * @summary 活动折扣计划表-列表查询
   * @request POST:/api/luteos/product/msrp/queryPlanList
   * @response `200` `ActiveDiscountPlanListResp` OK
   */
  export namespace LuteosProductMsrpQueryPlanList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ActiveDiscountPlanReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ActiveDiscountPlanListResp;
  }

  /**
   * No description
   * @tags msrp管理
   * @name LuteosProductMsrpQueryRelationLog
   * @summary msrp日志详情查询
   * @request GET:/api/luteos/product/msrp/queryRelationLog
   * @response `200` `SaleSkuLogDetailQueryResp` OK
   */
  export namespace LuteosProductMsrpQueryRelationLog {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SaleSkuLogDetailQueryResp;
  }

  /**
   * No description
   * @tags msrp管理
   * @name LuteosProductMsrpQuerySkuDetail
   * @summary msrp管理-查询sku详情
   * @request POST:/api/luteos/product/msrp/querySkuDetail
   * @response `200` `CommonRespMsrpSkuDetailResp` OK
   */
  export namespace LuteosProductMsrpQuerySkuDetail {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MsrpSpuDetailReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespMsrpSkuDetailResp;
  }

  /**
   * No description
   * @tags msrp管理
   * @name LuteosProductMsrpQuerySkuEditActive
   * @summary 活动折扣计划表-SKU列表编辑查询&详情查询
   * @request GET:/api/luteos/product/msrp/querySkuEditActive
   * @response `200` `SkuActiveDiscountPlanQueryResp` OK
   */
  export namespace LuteosProductMsrpQuerySkuEditActive {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 记录编码 */
      code: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SkuActiveDiscountPlanQueryResp;
  }

  /**
   * No description
   * @tags msrp管理
   * @name LuteosProductMsrpQuerySkuList
   * @summary msrp管理新增-查询
   * @request POST:/api/luteos/product/msrp/querySkuList
   * @response `200` `MsrpQueryChannelListResp` OK
   */
  export namespace LuteosProductMsrpQuerySkuList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MsrpSkuListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MsrpQueryChannelListResp;
  }

  /**
   * No description
   * @tags msrp管理
   * @name LuteosProductMsrpQuerySpuDetail
   * @summary msrp管理-查询spu详情
   * @request POST:/api/luteos/product/msrp/querySpuDetail
   * @response `200` `CommonRespMsrpSpuDetailResp` OK
   */
  export namespace LuteosProductMsrpQuerySpuDetail {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MsrpSpuDetailReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespMsrpSpuDetailResp;
  }

  /**
   * No description
   * @tags msrp管理
   * @name LuteosProductMsrpSave
   * @summary msrp管理-新增
   * @request POST:/api/luteos/product/msrp/save
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosProductMsrpSave {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MsrpSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags msrp管理
   * @name LuteosProductMsrpSaveSku
   * @summary msrp管理-sku编辑
   * @request POST:/api/luteos/product/msrp/saveSku
   * @response `200` `MsrpSaveSkuResp` OK
   */
  export namespace LuteosProductMsrpSaveSku {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MsrpSaveSkuReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MsrpSaveSkuResp;
  }

  /**
   * No description
   * @tags msrp管理
   * @name LuteosProductMsrpSaveSpu
   * @summary msrp管理-spu编辑
   * @request POST:/api/luteos/product/msrp/saveSpu
   * @response `200` `MsrpSaveSpuResp` OK
   */
  export namespace LuteosProductMsrpSaveSpu {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MsrpSaveSpuReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MsrpSaveSpuResp;
  }

  /**
   * No description
   * @tags 多平台价格监控
   * @name LuteosProductMultiPriceQueryList
   * @summary 多平台价格列表查询
   * @request POST:/api/luteos/product/multi-price/queryList
   * @response `200` `CommonRespMultiPriceQueryListResp` OK
   */
  export namespace LuteosProductMultiPriceQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MultiPriceQueryListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespMultiPriceQueryListResp;
  }

  /**
   * No description
   * @tags 多平台价格监控
   * @name LuteosProductMultiPriceQueryPriceDetail
   * @summary 查询价格详情
   * @request GET:/api/luteos/product/multi-price/queryPriceDetail
   * @response `200` `CommonRespListMultiPriceDetailResp` OK
   */
  export namespace LuteosProductMultiPriceQueryPriceDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** code */
      code: string;
      /** platform */
      platform: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespListMultiPriceDetailResp;
  }

  /**
   * No description
   * @tags 线下渠道-在线商品
   * @name LuteosProductOfflineListingQueryProductListingPage
   * @summary 线下渠道-在线商品分页查询-V2
   * @request POST:/api/luteos/product/offline/listing/queryProductListingPage
   * @response `200` `OfflineProductListingResp` OK
   */
  export namespace LuteosProductOfflineListingQueryProductListingPage {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OfflineListingProductReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = OfflineProductListingResp;
  }

  /**
   * No description
   * @tags 商品SKU新旧产品映射管理
   * @name LuteosProductOldNewMappingExport
   * @summary 导出
   * @request POST:/api/luteos/product/oldNewMapping/export
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosProductOldNewMappingExport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductSkuOldNewListQueryReq;
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
   * @tags 商品SKU新旧产品映射管理
   * @name LuteosProductOldNewMappingQueryList
   * @summary 列表查询
   * @request GET:/api/luteos/product/oldNewMapping/queryList
   * @response `200` `ProductSkuOldNewMappingResp` OK
   */
  export namespace LuteosProductOldNewMappingQueryList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ProductSkuOldNewMappingResp;
  }

  /**
   * No description
   * @tags 商品SKU新旧产品映射管理
   * @name LuteosProductOldNewMappingSaveOrUpdate
   * @summary 商品sku新旧保存
   * @request POST:/api/luteos/product/oldNewMapping/saveOrUpdate
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosProductOldNewMappingSaveOrUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductSkuOldNewSaveOrUpdReq;
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
   * @tags 新平台-在线商品
   * @name LuteosProductOnlineExport
   * @summary 导出
   * @request GET:/api/luteos/product/online/export
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosProductOnlineExport {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
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
   * @tags 新平台-在线商品
   * @name LuteosProductOnlineListingQueryTag
   * @summary 标签查询
   * @request POST:/api/luteos/product/online/listing/queryTag
   * @response `200` `ListingTagResp` OK
   */
  export namespace LuteosProductOnlineListingQueryTag {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ListingQueryTagReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ListingTagResp;
  }

  /**
   * No description
   * @tags 新平台-在线商品
   * @name LuteosProductOnlineQueryList
   * @summary 列表查询
   * @request POST:/api/luteos/product/online/queryList
   * @response `200` `OnlineProductQueryResp` OK
   */
  export namespace LuteosProductOnlineQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OnlineProductQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = OnlineProductQueryResp;
  }

  /**
   * No description
   * @tags 新平台-在线商品
   * @name LuteosProductOnlineSave
   * @summary 保存在线商品
   * @request POST:/api/luteos/product/online/save
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosProductOnlineSave {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OnlineProductSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags 新平台-在线商品
   * @name LuteosProductOnlineSaveOperator
   * @summary 保存运营人员
   * @request POST:/api/luteos/product/online/saveOperator
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosProductOnlineSaveOperator {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OperatorSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags 新平台-在线商品
   * @name LuteosProductOnlineSaveProductLink
   * @summary 保存商品链接
   * @request POST:/api/luteos/product/online/saveProductLink
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosProductOnlineSaveProductLink {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductLinkSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags 新平台-在线商品
   * @name LuteosProductOnlineSaveTag
   * @summary 保存标签
   * @request POST:/api/luteos/product/online/saveTag
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosProductOnlineSaveTag {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ListingBatchModifyTagReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags 商品管理
   * @name LuteosProductOperateProduct
   * @summary 商品信息操作
   * @request POST:/api/luteos/product/operateProduct
   * @response `200` `CommonRespBoolean` OK
   */
  export namespace LuteosProductOperateProduct {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductOperateReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespBoolean;
  }

  /**
   * No description
   * @tags 在线商品-产品表现
   * @name LuteosProductPerformanceQueryPerformance
   * @summary 在线商品-商品表现-V2
   * @request POST:/api/luteos/product/performance/queryPerformance
   * @response `200` `WalmartProductListingResp` OK
   */
  export namespace LuteosProductPerformanceQueryPerformance {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PerformanceProductReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = WalmartProductListingResp;
  }

  /**
   * No description
   * @tags 产品表现
   * @name LuteosProductPerformanceQuerySkuList
   * @summary SKU列表查询
   * @request GET:/api/luteos/product/performance/querySkuList
   * @response `200` `ProductPerformanceResp` OK
   */
  export namespace LuteosProductPerformanceQuerySkuList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ProductPerformanceResp;
  }

  /**
   * No description
   * @tags 产品表现
   * @name LuteosProductPerformanceQuerySkuPerformance
   * @summary SKU产品表现
   * @request GET:/api/luteos/product/performance/querySkuPerformance
   * @response `200` `ProductPerformanceDetailResp` OK
   */
  export namespace LuteosProductPerformanceQuerySkuPerformance {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ProductPerformanceDetailResp;
  }

  /**
   * No description
   * @tags 促销计划
   * @name LuteosProductPromotionPlanApplyList
   * @summary 促销计划申请列表
   * @request POST:/api/luteos/product/promotion-plan/applyList
   * @response `200` `PromotionPlanApplyListResp` OK
   */
  export namespace LuteosProductPromotionPlanApplyList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PromotionPlanListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PromotionPlanApplyListResp;
  }

  /**
   * No description
   * @tags 促销计划
   * @name LuteosProductPromotionPlanCreate
   * @summary 促销计划-新增
   * @request POST:/api/luteos/product/promotion-plan/create
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosProductPromotionPlanCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PromotionPlanCreateReq;
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
   * @tags 促销计划
   * @name LuteosProductPromotionPlanCreateCheck
   * @summary 促销计划-新增校验
   * @request POST:/api/luteos/product/promotion-plan/createCheck
   * @response `200` `CommonRespPlanCreateCheckResp` OK
   */
  export namespace LuteosProductPromotionPlanCreateCheck {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PromotionPlanCreateReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespPlanCreateCheckResp;
  }

  /**
   * No description
   * @tags 促销计划
   * @name LuteosProductPromotionPlanDelete
   * @summary 促销计划-删除
   * @request POST:/api/luteos/product/promotion-plan/delete
   * @response `200` `CommonRespPromotionPlanDeleteResp` OK
   */
  export namespace LuteosProductPromotionPlanDelete {
    export type RequestParams = {};
    export type RequestQuery = {
      /** confirm */
      confirm: boolean;
      /** planCode */
      planCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespPromotionPlanDeleteResp;
  }

  /**
   * No description
   * @tags 促销计划
   * @name LuteosProductPromotionPlanDetail
   * @summary 促销计划-详情
   * @request GET:/api/luteos/product/promotion-plan/detail
   * @response `200` `CommonRespPromotionPlanDetailResp` OK
   */
  export namespace LuteosProductPromotionPlanDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** planCode */
      planCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespPromotionPlanDetailResp;
  }

  /**
   * No description
   * @tags 促销计划
   * @name LuteosProductPromotionPlanExportPromotionPlan
   * @summary 促销计划导出
   * @request POST:/api/luteos/product/promotion-plan/exportPromotionPlan
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosProductPromotionPlanExportPromotionPlan {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PromotionPlanListQueryReq;
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
   * @tags 促销计划
   * @name LuteosProductPromotionPlanGetAddActivityDetail
   * @summary 添加活动详情列表
   * @request GET:/api/luteos/product/promotion-plan/getAddActivityDetail
   * @response `200` `CommonRespAddActivityDetailResp` OK
   */
  export namespace LuteosProductPromotionPlanGetAddActivityDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** planCodeList */
      planCodeList: string[];
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespAddActivityDetailResp;
  }

  /**
   * No description
   * @tags 促销计划
   * @name LuteosProductPromotionPlanListBySku
   * @summary 促销计划-SKU维度分页列表
   * @request POST:/api/luteos/product/promotion-plan/listBySku
   * @response `200` `PromotionPlanListQuerySkuResp` OK
   */
  export namespace LuteosProductPromotionPlanListBySku {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PromotionPlanListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PromotionPlanListQuerySkuResp;
  }

  /**
   * No description
   * @tags 促销计划
   * @name LuteosProductPromotionPlanListBySpu
   * @summary 促销计划-SPU维度分页列表
   * @request POST:/api/luteos/product/promotion-plan/listBySpu
   * @response `200` `PromotionPlanListQuerySpuResp` OK
   */
  export namespace LuteosProductPromotionPlanListBySpu {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PromotionPlanListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PromotionPlanListQuerySpuResp;
  }

  /**
   * No description
   * @tags 促销计划
   * @name LuteosProductPromotionPlanQuerySkuList
   * @summary 查询sku列表
   * @request GET:/api/luteos/product/promotion-plan/querySkuList
   * @response `200` `CommonRespMsrpSkuListResp` OK
   */
  export namespace LuteosProductPromotionPlanQuerySkuList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** countryCode */
      countryCode: string;
      /** spuCode */
      spuCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespMsrpSkuListResp;
  }

  /**
   * No description
   * @tags 促销计划
   * @name LuteosProductPromotionPlanQuerySpuList
   * @summary 查询spu列表
   * @request GET:/api/luteos/product/promotion-plan/querySpuList
   * @response `200` `CommonRespProductListQueryResp` OK
   */
  export namespace LuteosProductPromotionPlanQuerySpuList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespProductListQueryResp;
  }

  /**
   * No description
   * @tags 促销计划
   * @name LuteosProductPromotionPlanReview
   * @summary 促销计划-审核
   * @request POST:/api/luteos/product/promotion-plan/review
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosProductPromotionPlanReview {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PromotionPlanReviewReq;
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
   * @tags 促销计划
   * @name LuteosProductPromotionPlanReviewList
   * @summary 促销计划-审核列表
   * @request POST:/api/luteos/product/promotion-plan/reviewList
   * @response `200` `CommonRespPromotionPlanReviewListResp` OK
   */
  export namespace LuteosProductPromotionPlanReviewList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PromotionPlanReviewListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespPromotionPlanReviewListResp;
  }

  /**
   * No description
   * @tags 促销计划
   * @name LuteosProductPromotionPlanUpdate
   * @summary 促销计划-更新
   * @request POST:/api/luteos/product/promotion-plan/update
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosProductPromotionPlanUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PromotionPlanCreateReq;
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
   * @tags 商品管理
   * @name LuteosProductQueryDetail
   * @summary 商品详情查询
   * @request GET:/api/luteos/product/queryDetail
   * @response `200` `ProductDetailQueryResp` OK
   */
  export namespace LuteosProductQueryDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 操作类型。detail:详情，update:编辑，delete：删除 */
      operationType: string;
      /** 商品编码 */
      productSpu: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ProductDetailQueryResp;
  }

  /**
   * No description
   * @tags 商品管理
   * @name LuteosProductQueryOperatorList
   * @summary 获取采购员列表
   * @request GET:/api/luteos/product/queryOperatorList
   * @response `200` `PurchaseOperatorQueryResp` OK
   */
  export namespace LuteosProductQueryOperatorList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 产品经理编码 */
      productManagerCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PurchaseOperatorQueryResp;
  }

  /**
   * No description
   * @tags 商品管理
   * @name LuteosProductQueryPlatfromSkuIdentify
   * @summary 原平台标识查询
   * @request GET:/api/luteos/product/queryPlatfromSkuIdentify
   * @response `200` `CommonRespListString` OK
   */
  export namespace LuteosProductQueryPlatfromSkuIdentify {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 渠道 */
      channel: string;
      /** 国家 */
      country: string;
      /** 供应链SKU */
      supplySku: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespListString;
  }

  /**
   * No description
   * @tags 商品管理
   * @name LuteosProductQueryProductPerfection
   * @summary 获取商品列表信息完善度
   * @request GET:/api/luteos/product/queryProduct/perfection
   * @response `200` `ProductPerfectionQueryResp` OK
   */
  export namespace LuteosProductQueryProductPerfection {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ProductPerfectionQueryResp;
  }

  /**
   * No description
   * @tags 商品管理
   * @name LuteosProductQueryProductByCategory
   * @summary 根据分类查询商品
   * @request POST:/api/luteos/product/queryProductByCategory
   * @response `200` `ProductCategoryResp` OK
   */
  export namespace LuteosProductQueryProductByCategory {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductCategoryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ProductCategoryResp;
  }

  /**
   * No description
   * @tags 商品管理
   * @name LuteosProductQueryProductInfo
   * @summary 商品信息查询
   * @request GET:/api/luteos/product/queryProductInfo
   * @response `200` `ProductInfoResp` OK
   */
  export namespace LuteosProductQueryProductInfo {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 商品spu编码 */
      productSpu: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ProductInfoResp;
  }

  /**
   * No description
   * @tags 商品管理
   * @name LuteosProductQueryProductList
   * @summary 商品列表查询
   * @request GET:/api/luteos/product/queryProductList
   * @response `200` `ProductListQueryResp` OK
   */
  export namespace LuteosProductQueryProductList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ProductListQueryResp;
  }

  /**
   * No description
   * @tags 商品管理
   * @name LuteosProductQueryProductRelationList
   * @summary 商品关联信息列表查询
   * @request GET:/api/luteos/product/queryProductRelationList
   * @response `200` `ProductRelationListResp` OK
   */
  export namespace LuteosProductQueryProductRelationList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ProductRelationListResp;
  }

  /**
   * No description
   * @tags 商品管理
   * @name LuteosProductQuerySupplySku
   * @summary 供应链SKU查询
   * @request GET:/api/luteos/product/querySupplySku
   * @response `200` `CommonRespListString` OK
   */
  export namespace LuteosProductQuerySupplySku {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespListString;
  }

  /**
   * No description
   * @tags 批量删除, 竞品监控
   * @name LuteosProductRankingListBatchDeleted
   * @summary 批量删除
   * @request POST:/api/luteos/product/rankingList/batchDeleted
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosProductRankingListBatchDeleted {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AmazonRankingListBatchOperationReq;
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
   * @tags 批量编辑, 竞品监控
   * @name LuteosProductRankingListBatchOperation
   * @summary 批量编辑
   * @request POST:/api/luteos/product/rankingList/batchOperation
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosProductRankingListBatchOperation {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AmazonRankingListBatchOperationReq;
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
   * @tags 竞品监控
   * @name LuteosProductRankingListDownTemplate
   * @summary 下载-竞品监控导入模板
   * @request POST:/api/luteos/product/rankingList/downTemplate
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosProductRankingListDownTemplate {
    export type RequestParams = {};
    export type RequestQuery = {};
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
   * @tags 竞品监控, 编辑
   * @name LuteosProductRankingListOperation
   * @summary 编辑运营/组长/备注
   * @request POST:/api/luteos/product/rankingList/operation
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosProductRankingListOperation {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AmazonRankingListOperationReq;
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
   * @tags 竞品监控
   * @name LuteosProductRankingListQueryList
   * @summary 竞品监控列表查询
   * @request POST:/api/luteos/product/rankingList/queryList
   * @response `200` `CommonRespAmazonRankingListQueryListResp` OK
   */
  export namespace LuteosProductRankingListQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AmazonRankingListQueryListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespAmazonRankingListQueryListResp;
  }

  /**
   * No description
   * @tags 竞品监控
   * @name LuteosProductRankingListSave
   * @summary 新增/编辑
   * @request POST:/api/luteos/product/rankingList/save
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosProductRankingListSave {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AmazonRankingListSaveReq;
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
   * @tags 商品管理
   * @name LuteosProductRemoveProduct
   * @summary 删除商品
   * @request GET:/api/luteos/product/removeProduct
   * @response `200` `CommonRespBoolean` OK
   */
  export namespace LuteosProductRemoveProduct {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 商品编码 */
      productSpu: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespBoolean;
  }

  /**
   * No description
   * @tags 销售映射管理
   * @name LuteosProductSaleSkuExportSaleSku
   * @summary 导出销售映射
   * @request POST:/api/luteos/product/saleSku/exportSaleSku
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosProductSaleSkuExportSaleSku {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SaleSkuQueryReq;
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
   * @tags 销售映射管理
   * @name LuteosProductSaleSkuQueryDictSalesChannelList
   * @summary 查询销售渠道字典表
   * @request POST:/api/luteos/product/saleSku/queryDictSalesChannelList
   * @response `200` `DictSalesChannelResp` OK
   */
  export namespace LuteosProductSaleSkuQueryDictSalesChannelList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DictSalesChannelResp;
  }

  /**
   * No description
   * @tags 销售映射管理
   * @name LuteosProductSaleSkuQueryLuteChannelList
   * @summary 查询路特筛选条件
   * @request POST:/api/luteos/product/saleSku/queryLuteChannelList
   * @response `200` `LuteConditionResp` OK
   */
  export namespace LuteosProductSaleSkuQueryLuteChannelList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = LuteConditionResp;
  }

  /**
   * No description
   * @tags 销售映射管理
   * @name LuteosProductSaleSkuQueryRelationLog
   * @summary 日志详情查询
   * @request GET:/api/luteos/product/saleSku/queryRelationLog
   * @response `200` `SaleSkuLogDetailQueryResp` OK
   */
  export namespace LuteosProductSaleSkuQueryRelationLog {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SaleSkuLogDetailQueryResp;
  }

  /**
   * No description
   * @tags 销售映射管理
   * @name LuteosProductSaleSkuQuerySaleSkuDetail
   * @summary 销售映射详情查询
   * @request GET:/api/luteos/product/saleSku/querySaleSkuDetail
   * @response `200` `SaleSkuDetailQueryResp` OK
   */
  export namespace LuteosProductSaleSkuQuerySaleSkuDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 唯一键 */
      uniqueCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SaleSkuDetailQueryResp;
  }

  /**
   * No description
   * @tags 销售映射管理
   * @name LuteosProductSaleSkuQuerySaleSkuList
   * @summary 销售映射列表查询
   * @request GET:/api/luteos/product/saleSku/querySaleSkuList
   * @response `200` `SaleSkuQueryResp` OK
   */
  export namespace LuteosProductSaleSkuQuerySaleSkuList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SaleSkuQueryResp;
  }

  /**
   * No description
   * @tags 销售映射管理
   * @name LuteosProductSaleSkuQuerySource
   * @summary 获取数据来源
   * @request GET:/api/luteos/product/saleSku/querySource
   * @response `200` `SaleSkuSourcelQueryResp` OK
   */
  export namespace LuteosProductSaleSkuQuerySource {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SaleSkuSourcelQueryResp;
  }

  /**
   * No description
   * @tags 销售映射管理
   * @name LuteosProductSaleSkuRemoveSaleSkuRelation
   * @summary 删除销售映射关系
   * @request POST:/api/luteos/product/saleSku/removeSaleSkuRelation
   * @response `200` `CommonRespBoolean` OK
   */
  export namespace LuteosProductSaleSkuRemoveSaleSkuRelation {
    export type RequestParams = {};
    export type RequestQuery = {
      /** uniqueCode */
      uniqueCode?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespBoolean;
  }

  /**
   * No description
   * @tags 销售映射管理
   * @name LuteosProductSaleSkuSaveSaleSkuRelation
   * @summary 保存销售映射关系
   * @request POST:/api/luteos/product/saleSku/saveSaleSkuRelation
   * @response `200` `SaleSkuSaveResp` OK
   */
  export namespace LuteosProductSaleSkuSaveSaleSkuRelation {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SaleSkuSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SaleSkuSaveResp;
  }

  /**
   * No description
   * @tags 销售映射缺失管理
   * @name LuteosProductSaleSkuRelationMissExport
   * @summary 导出销售映射缺失
   * @request POST:/api/luteos/product/saleSkuRelationMiss/export
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosProductSaleSkuRelationMissExport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SaleSkuRelationMissQueryReq;
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
   * @tags 销售映射缺失管理
   * @name LuteosProductSaleSkuRelationMissQueryList
   * @summary 销售映射缺失列表查询
   * @request GET:/api/luteos/product/saleSkuRelationMiss/queryList
   * @response `200` `SaleSkuRelationMissQueryResp` OK
   */
  export namespace LuteosProductSaleSkuRelationMissQueryList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SaleSkuRelationMissQueryResp;
  }

  /**
   * No description
   * @tags 商品管理
   * @name LuteosProductSaveProduct
   * @summary 商品信息保存
   * @request POST:/api/luteos/product/saveProduct
   * @response `200` `ProductSaveResp` OK
   */
  export namespace LuteosProductSaveProduct {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ProductSaveResp;
  }

  /**
   * No description
   * @tags RPA在线商品
   * @name LuteosProductSellerSkuExportSellerSkuUnusualList
   * @summary 导出销售异常
   * @request GET:/api/luteos/product/seller/sku/exportSellerSkuUnusualList
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosProductSellerSkuExportSellerSkuUnusualList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    export type ResponseBody = CommonExportResp;
  }

  /**
   * No description
   * @tags RPA在线商品
   * @name LuteosProductSellerSkuOperateSellerSkuStatus
   * @summary 变更商品提醒状态
   * @request GET:/api/luteos/product/seller/sku/operateSellerSkuStatus
   * @response `200` `void` OK
   */
  export namespace LuteosProductSellerSkuOperateSellerSkuStatus {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
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
   * @tags RPA在线商品
   * @name LuteosProductSellerSkuQuerySellerSkuUnusualList
   * @summary 查询销售异常
   * @request GET:/api/luteos/product/seller/sku/querySellerSkuUnusualList
   * @response `200` `ProductSellerSkuQueryResp` OK
   */
  export namespace LuteosProductSellerSkuQuerySellerSkuUnusualList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    export type ResponseBody = ProductSellerSkuQueryResp;
  }

  /**
   * No description
   * @tags 敏感类型管理
   * @name LuteosProductSensitiveTypeConnectProduct
   * @summary 敏感类型关联商品
   * @request POST:/api/luteos/product/sensitiveType/connectProduct
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosProductSensitiveTypeConnectProduct {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SensitiveTypeProductConnectReq;
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
   * @tags 敏感类型管理
   * @name LuteosProductSensitiveTypeExportSensitiveType
   * @summary 敏感类型信息导出
   * @request POST:/api/luteos/product/sensitiveType/exportSensitiveType
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosProductSensitiveTypeExportSensitiveType {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SensitiveTypeListQueryReq;
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
   * @tags 敏感类型管理
   * @name LuteosProductSensitiveTypeOperateSensitiveType
   * @summary 敏感类型操作
   * @request POST:/api/luteos/product/sensitiveType/operateSensitiveType
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosProductSensitiveTypeOperateSensitiveType {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SensitiveTypeOperateReq;
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
   * @tags 敏感类型管理
   * @name LuteosProductSensitiveTypeQuerySensitiveTypeDetail
   * @summary 敏感类型详情查询
   * @request GET:/api/luteos/product/sensitiveType/querySensitiveTypeDetail
   * @response `200` `SensitiveTypeDetailResp` OK
   */
  export namespace LuteosProductSensitiveTypeQuerySensitiveTypeDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 敏感类型编码 */
      sensitiveTypeCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SensitiveTypeDetailResp;
  }

  /**
   * No description
   * @tags 敏感类型管理
   * @name LuteosProductSensitiveTypeQuerySensitiveTypeList
   * @summary 敏感类型列表查询
   * @request GET:/api/luteos/product/sensitiveType/querySensitiveTypeList
   * @response `200` `SensitiveTypeListQueryResp` OK
   */
  export namespace LuteosProductSensitiveTypeQuerySensitiveTypeList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SensitiveTypeListQueryResp;
  }

  /**
   * No description
   * @tags 敏感类型管理
   * @name LuteosProductSensitiveTypeSaveOrUpdateSensitiveType
   * @summary 敏感类型信息保存
   * @request POST:/api/luteos/product/sensitiveType/saveOrUpdateSensitiveType
   * @response `200` `SensitiveTypeSaveResp` OK
   */
  export namespace LuteosProductSensitiveTypeSaveOrUpdateSensitiveType {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SensitiveTypeSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SensitiveTypeSaveResp;
  }

  /**
   * No description
   * @tags 系列管理
   * @name LuteosProductSeriesConnectProduct
   * @summary 系列关联商品
   * @request POST:/api/luteos/product/series/connectProduct
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosProductSeriesConnectProduct {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SeriesProductConnectReq;
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
   * @tags 系列管理
   * @name LuteosProductSeriesExportSeries
   * @summary 系列信息导出
   * @request POST:/api/luteos/product/series/exportSeries
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosProductSeriesExportSeries {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SeriesListQueryReq;
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
   * @tags 系列管理
   * @name LuteosProductSeriesOperateSeries
   * @summary 系列操作
   * @request POST:/api/luteos/product/series/operateSeries
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosProductSeriesOperateSeries {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SeriesOperateReq;
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
   * @tags 系列管理
   * @name LuteosProductSeriesQuerySeriesDetail
   * @summary 系列详情查询
   * @request GET:/api/luteos/product/series/querySeriesDetail
   * @response `200` `SeriesDetailResp` OK
   */
  export namespace LuteosProductSeriesQuerySeriesDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 系列编码 */
      seriesCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SeriesDetailResp;
  }

  /**
   * No description
   * @tags 系列管理
   * @name LuteosProductSeriesQuerySeriesList
   * @summary 系列列表查询
   * @request GET:/api/luteos/product/series/querySeriesList
   * @response `200` `SeriesListQueryResp` OK
   */
  export namespace LuteosProductSeriesQuerySeriesList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SeriesListQueryResp;
  }

  /**
   * No description
   * @tags 系列管理
   * @name LuteosProductSeriesSaveOrUpdateSeries
   * @summary 系列信息保存
   * @request POST:/api/luteos/product/series/saveOrUpdateSeries
   * @response `200` `SeriesSaveResp` OK
   */
  export namespace LuteosProductSeriesSaveOrUpdateSeries {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SeriesSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SeriesSaveResp;
  }

  /**
   * No description
   * @tags 商品管理
   * @name LuteosProductShadowSearch
   * @summary 产品影子查询
   * @request POST:/api/luteos/product/shadowSearch
   * @response `200` `CommonRespProductShadowSearchResp` OK
   */
  export namespace LuteosProductShadowSearch {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductShadowSearchReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespProductShadowSearchResp;
  }

  /**
   * No description
   * @tags 商品管理
   * @name LuteosProductShadowSearchStatisticsDetail
   * @summary 产品影子统计信息详情
   * @request POST:/api/luteos/product/shadowSearchStatisticsDetail
   * @response `200` `CommonRespProductShadowDetailStatisticsResp` OK
   */
  export namespace LuteosProductShadowSearchStatisticsDetail {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductShadowDetailStaticsSearchReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespProductShadowDetailStatisticsResp;
  }

  /**
   * No description
   * @tags 独立站在线商品
   * @name LuteosProductShopifyListingBatchModifyPlan
   * @summary 独立站-在线商父ASIN批量添加/更新计划人员
   * @request POST:/api/luteos/product/shopify/listing/batchModifyPlan
   * @deprecated
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosProductShopifyListingBatchModifyPlan {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ListingBatchModifyPlanReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags 独立站在线商品
   * @name LuteosProductShopifyListingBatchSaveOperator
   * @summary 独立站-批量保存运营人员
   * @request POST:/api/luteos/product/shopify/listing/batchSaveOperator
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosProductShopifyListingBatchSaveOperator {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ShopifyBatchOperatorSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags 独立站在线商品
   * @name LuteosProductShopifyListingDownload
   * @summary 独立站-在线商品导出-V2
   * @request POST:/api/luteos/product/shopify/listing/download
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosProductShopifyListingDownload {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ShopifyProductListingReq;
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
   * @tags 独立站在线商品
   * @name LuteosProductShopifyListingListingDownload
   * @summary 独立站父子维度导出
   * @request POST:/api/luteos/product/shopify/listing/listing/download
   * @deprecated
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosProductShopifyListingListingDownload {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ShopifyListingReq;
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
   * @tags 独立站在线商品
   * @name LuteosProductShopifyListingListingQueryTag
   * @summary 亚马逊在线商品父维度标签查询
   * @request POST:/api/luteos/product/shopify/listing/listing/queryTag
   * @deprecated
   * @response `200` `ListingTagResp` OK
   */
  export namespace LuteosProductShopifyListingListingQueryTag {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ListingQueryTagReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ListingTagResp;
  }

  /**
   * No description
   * @tags 独立站在线商品
   * @name LuteosProductShopifyListingListingUpdateTag
   * @summary 独立站商品父子维度标签保存更新
   * @request POST:/api/luteos/product/shopify/listing/listing/updateTag
   * @deprecated
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosProductShopifyListingListingUpdateTag {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ListingBatchModifyTagReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags 独立站在线商品
   * @name LuteosProductShopifyListingQueryParentProductIdPage
   * @summary 独立站-在线商品ProductId分页查询
   * @request POST:/api/luteos/product/shopify/listing/queryParentProductIdPage
   * @deprecated
   * @response `200` `ShopifyListingParentResp` OK
   */
  export namespace LuteosProductShopifyListingQueryParentProductIdPage {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ShopifyListingReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ShopifyListingParentResp;
  }

  /**
   * No description
   * @tags 独立站在线商品
   * @name LuteosProductShopifyListingQueryProductListingPage
   * @summary 独立站-在线商品分页查询-V2
   * @request POST:/api/luteos/product/shopify/listing/queryProductListingPage
   * @response `200` `ShopifyProductListingResp` OK
   */
  export namespace LuteosProductShopifyListingQueryProductListingPage {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ShopifyProductListingReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ShopifyProductListingResp;
  }

  /**
   * No description
   * @tags 独立站在线商品
   * @name LuteosProductShopifyListingQuerySonVariantIdPage
   * @summary 独立站-在线商品子维度分页查询
   * @request POST:/api/luteos/product/shopify/listing/querySonVariantIdPage
   * @deprecated
   * @response `200` `ShopifySonListingResp` OK
   */
  export namespace LuteosProductShopifyListingQuerySonVariantIdPage {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ShopifyListingReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ShopifySonListingResp;
  }

  /**
   * No description
   * @tags 独立站在线商品
   * @name LuteosProductShopifyListingSaveOperator
   * @summary 独立站-在线商品保存运营人员
   * @request POST:/api/luteos/product/shopify/listing/saveOperator
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosProductShopifyListingSaveOperator {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ShopifyOperatorSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags 独立站在线商品
   * @name LuteosProductShopifyListingSaveProductLink
   * @summary 独立站-在线商品保存商品链接
   * @request POST:/api/luteos/product/shopify/listing/saveProductLink
   * @deprecated
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosProductShopifyListingSaveProductLink {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductLinkSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags 商品管理
   * @name LuteosProductShowSearch
   * @summary 产品表现查询
   * @request POST:/api/luteos/product/showSearch
   * @response `200` `CommonRespProductShowSearchResp` OK
   */
  export namespace LuteosProductShowSearch {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductShowSearchReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespProductShowSearchResp;
  }

  /**
   * No description
   * @tags 商品管理
   * @name LuteosProductShowSearchDetail
   * @summary 产品表现详情
   * @request POST:/api/luteos/product/showSearchDetail
   * @response `200` `CommonRespProductShowDetailSearchResp` OK
   */
  export namespace LuteosProductShowSearchDetail {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductShowDetailSearchReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespProductShowDetailSearchResp;
  }

  /**
   * No description
   * @tags 商品管理
   * @name LuteosProductShowSearchStatisticsDetail
   * @summary 产品表现统计信息详情
   * @request POST:/api/luteos/product/showSearchStatisticsDetail
   * @response `200` `CommonRespProductShowDetailStatisticsResp` OK
   */
  export namespace LuteosProductShowSearchStatisticsDetail {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductShowDetailStaticsSearchReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespProductShowDetailStatisticsResp;
  }

  /**
   * No description
   * @tags 商品SKU管理
   * @name LuteosProductSkuBatchOperate
   * @summary 商品sku批量操作
   * @request POST:/api/luteos/product/sku/batchOperate
   * @response `200` `CommonRespBoolean` OK
   */
  export namespace LuteosProductSkuBatchOperate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductSkuBatchOpeReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespBoolean;
  }

  /**
   * No description
   * @tags 店铺SKU管理
   * @name LuteosProductSkuExportPlatformSku
   * @summary 导出店铺SKU
   * @request POST:/api/luteos/product/sku/exportPlatformSku
   * @response `200` `void` OK
   */
  export namespace LuteosProductSkuExportPlatformSku {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
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
   * @tags 商品SKU管理
   * @name LuteosProductSkuExportProduct
   * @summary 商品Sku导出信息
   * @request POST:/api/luteos/product/sku/exportProduct
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosProductSkuExportProduct {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductSkuListQueryReq;
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
   * @tags 商品SKU管理
   * @name LuteosProductSkuExportProductSkuCertification
   * @summary 商品Sku证信息导出
   * @request POST:/api/luteos/product/sku/exportProductSkuCertification
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosProductSkuExportProductSkuCertification {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductSkuCertificationListReq;
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
   * @tags 商品映射
   * @name LuteosProductSkuMappingClear
   * @summary 清除映射
   * @request POST:/api/luteos/product/sku/mapping/clear
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosProductSkuMappingClear {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductSkuMappingClearReq;
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
   * @tags 商品映射
   * @name LuteosProductSkuMappingExportList
   * @summary 导出列表
   * @request POST:/api/luteos/product/sku/mapping/exportList
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace LuteosProductSkuMappingExportList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductSkuMappingQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespCommonExportResp;
  }

  /**
   * No description
   * @tags 商品映射
   * @name LuteosProductSkuMappingQueryList
   * @summary 列表查询
   * @request POST:/api/luteos/product/sku/mapping/queryList
   * @response `200` `CommonRespProductSkuMappingQueryResp` OK
   */
  export namespace LuteosProductSkuMappingQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductSkuMappingQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespProductSkuMappingQueryResp;
  }

  /**
   * No description
   * @tags 商品映射
   * @name LuteosProductSkuMappingUpdate
   * @summary 编辑
   * @request POST:/api/luteos/product/sku/mapping/update
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosProductSkuMappingUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductSkuMappingUpdateReq;
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
   * @tags 商品SKU管理
   * @name LuteosProductSkuProductSkuCertificationSyncJob
   * @summary 商品Sku证信息同步
   * @request GET:/api/luteos/product/sku/productSkuCertificationSyncJob
   * @response `200` `void` OK
   */
  export namespace LuteosProductSkuProductSkuCertificationSyncJob {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
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
   * @tags 商品SKU管理
   * @name LuteosProductSkuProductSkuOperate
   * @summary 商品sku操作
   * @request POST:/api/luteos/product/sku/productSkuOperate
   * @response `200` `CommonRespBoolean` OK
   */
  export namespace LuteosProductSkuProductSkuOperate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductSkuOperateReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespBoolean;
  }

  /**
   * No description
   * @tags 商品SKU管理
   * @name LuteosProductSkuProductSkuSyncCrm
   * @summary 测试接口-产品信息同步CRM
   * @request POST:/api/luteos/product/sku/productSkuSyncCrm
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosProductSkuProductSkuSyncCrm {
    export type RequestParams = {};
    export type RequestQuery = {
      /** skuCodeList */
      skuCodeList: string[];
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags 商品SKU管理
   * @name LuteosProductSkuQueryCountry
   * @summary 销售区域查询
   * @request GET:/api/luteos/product/sku/queryCountry
   * @response `200` `(CountryAreaListResp)[]` OK
   */
  export namespace LuteosProductSkuQueryCountry {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CountryAreaListResp[];
  }

  /**
   * No description
   * @tags 商品SKU管理
   * @name LuteosProductSkuQueryDeptOrMember
   * @summary SKU提醒部门或人员查询
   * @request GET:/api/luteos/product/sku/queryDeptOrMember
   * @response `200` `Record<string,string>` OK
   */
  export namespace LuteosProductSkuQueryDeptOrMember {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = Record<string, string>;
  }

  /**
   * No description
   * @tags 商品SKU管理
   * @name LuteosProductSkuQueryMSkuRelationList
   * @summary 商品sku详情-店铺sku映射查询
   * @request GET:/api/luteos/product/sku/queryMSkuRelationList
   * @response `200` `MSkuRelationListResp` OK
   */
  export namespace LuteosProductSkuQueryMSkuRelationList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 操作类型。detail:详情，update:编辑，delete：删除 */
      operationType: string;
      /** sku编码 */
      skuCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MSkuRelationListResp;
  }

  /**
   * No description
   * @tags 店铺SKU管理
   * @name LuteosProductSkuQueryPlatformSkuDetail
   * @summary 店铺SKU详情查询
   * @request GET:/api/luteos/product/sku/queryPlatformSkuDetail
   * @response `200` `void` OK
   */
  export namespace LuteosProductSkuQueryPlatformSkuDetail {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
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
   * @tags 店铺SKU管理
   * @name LuteosProductSkuQueryPlatformSkuList
   * @summary 店铺SKU列表查询
   * @request GET:/api/luteos/product/sku/queryPlatformSkuList
   * @response `200` `void` OK
   */
  export namespace LuteosProductSkuQueryPlatformSkuList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
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
   * @tags 商品SKU管理
   * @name LuteosProductSkuQueryProductSkuPerfection
   * @summary 获取商品sku列表信息完善度
   * @request GET:/api/luteos/product/sku/queryProductSku/perfection
   * @response `200` `ProductSkuPerfectionQueryResp` OK
   */
  export namespace LuteosProductSkuQueryProductSkuPerfection {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ProductSkuPerfectionQueryResp;
  }

  /**
   * No description
   * @tags 商品SKU管理
   * @name LuteosProductSkuQueryProductSkuDetail
   * @summary 商品sku详情查询
   * @request GET:/api/luteos/product/sku/queryProductSkuDetail
   * @response `200` `ProductSkuDetailResp` OK
   */
  export namespace LuteosProductSkuQueryProductSkuDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 操作类型。detail:详情，update:编辑，delete：删除 */
      operationType: string;
      /** sku编码 */
      skuCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ProductSkuDetailResp;
  }

  /**
   * No description
   * @tags 商品SKU管理
   * @name LuteosProductSkuQueryProductSkuList
   * @summary 商品sku列表查询
   * @request GET:/api/luteos/product/sku/queryProductSkuList
   * @response `200` `ProductSkuListQueryResp` OK
   */
  export namespace LuteosProductSkuQueryProductSkuList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ProductSkuListQueryResp;
  }

  /**
   * No description
   * @tags 商品SKU管理
   * @name LuteosProductSkuQuerySkuCertificationList
   * @summary 商品Sku认证信息查询
   * @request POST:/api/luteos/product/sku/querySkuCertificationList
   * @response `200` `ProductSkuCertificationListResp` OK
   */
  export namespace LuteosProductSkuQuerySkuCertificationList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductSkuCertificationListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ProductSkuCertificationListResp;
  }

  /**
   * No description
   * @tags 商品SKU管理
   * @name LuteosProductSkuQuerySkuDefaultSpec
   * @summary 商品sku默认供应链规格查询
   * @request GET:/api/luteos/product/sku/querySkuDefaultSpec
   * @response `200` `SupplySkuSpecResp` OK
   */
  export namespace LuteosProductSkuQuerySkuDefaultSpec {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 操作类型。detail:详情，update:编辑，delete：删除 */
      operationType: string;
      /** sku编码 */
      skuCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SupplySkuSpecResp;
  }

  /**
   * No description
   * @tags 商品SKU管理
   * @name LuteosProductSkuQuerySkuInfo
   * @summary 商品sku信息查询
   * @request GET:/api/luteos/product/sku/querySkuInfo
   * @response `200` `ProductSkuInfoResp` OK
   */
  export namespace LuteosProductSkuQuerySkuInfo {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 商品sku编码 */
      skuCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ProductSkuInfoResp;
  }

  /**
   * No description
   * @tags 商品SKU管理
   * @name LuteosProductSkuQuerySupplierSkuList
   * @summary 供应链sku列表查询
   * @request GET:/api/luteos/product/sku/querySupplierSkuList
   * @response `200` `SupplierSkuListQueryResp` OK
   */
  export namespace LuteosProductSkuQuerySupplierSkuList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SupplierSkuListQueryResp;
  }

  /**
   * No description
   * @tags 商品SKU管理
   * @name LuteosProductSkuQuerySupplySkuList
   * @summary 商品Sku 关联供应链SKU查询并返回库存
   * @request GET:/api/luteos/product/sku/querySupplySkuList
   * @response `200` `SupplySkuQueryResp` OK
   */
  export namespace LuteosProductSkuQuerySupplySkuList {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * deliverType
       * @format int32
       */
      deliverType: number;
      /** skuCode */
      skuCode: string;
      /** warehouseCode */
      warehouseCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SupplySkuQueryResp;
  }

  /**
   * No description
   * @tags 店铺SKU管理
   * @name LuteosProductSkuQueryUserAccount
   * @summary 查询店铺账户
   * @request GET:/api/luteos/product/sku/queryUserAccount
   * @response `200` `ShopUserAccountResp` OK
   */
  export namespace LuteosProductSkuQueryUserAccount {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 渠道 */
      channel: string;
      /** 店铺 */
      shop: string;
      /** 站点 */
      site?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ShopUserAccountResp;
  }

  /**
   * No description
   * @tags 店铺SKU管理
   * @name LuteosProductSkuQueryUserAccountList
   * @summary 查询店铺账户集合
   * @request GET:/api/luteos/product/sku/queryUserAccountList
   * @response `200` `ShopUserAccountListResp` OK
   */
  export namespace LuteosProductSkuQueryUserAccountList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 渠道 */
      channel: string;
      /** 站点 */
      site: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ShopUserAccountListResp;
  }

  /**
   * No description
   * @tags 店铺SKU管理
   * @name LuteosProductSkuSavePlatformSkuRelation
   * @summary 保存店铺SKU关系
   * @request POST:/api/luteos/product/sku/savePlatformSkuRelation
   * @response `200` `void` OK
   */
  export namespace LuteosProductSkuSavePlatformSkuRelation {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
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
   * @tags 商品SKU管理
   * @name LuteosProductSkuSaveSku
   * @summary 商品sku保存
   * @request POST:/api/luteos/product/sku/saveSku
   * @response `200` `ProductSkuSaveResp` OK
   */
  export namespace LuteosProductSkuSaveSku {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductSkuSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ProductSkuSaveResp;
  }

  /**
   * No description
   * @tags 商品SKU管理
   * @name LuteosProductSkuSaveWorkflowRecord
   * @summary 生成SKU信息补充提醒工单
   * @request POST:/api/luteos/product/sku/saveWorkflowRecord
   * @response `200` `WorkflowSubmitResp` OK
   */
  export namespace LuteosProductSkuSaveWorkflowRecord {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductSkuNotifyReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = WorkflowSubmitResp;
  }

  /**
   * No description
   * @tags 商品SKU管理
   * @name LuteosProductSkuSmaSkuQueryList
   * @summary 查询预测SKU维度添加商品
   * @request POST:/api/luteos/product/sku/smaSkuQueryList
   * @response `200` `SmaSkuQueryListResp` OK
   */
  export namespace LuteosProductSkuSmaSkuQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SmaSkuQueryListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SmaSkuQueryListResp;
  }

  /**
   * No description
   * @tags 商品供应商管理
   * @name LuteosProductSkuSnExportSkuSn
   * @summary 商品供应商导出信息
   * @request POST:/api/luteos/product/sku/sn/exportSkuSn
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosProductSkuSnExportSkuSn {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SkuSnQueryReq;
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
   * @tags 商品供应商管理
   * @name LuteosProductSkuSnQuerySkuSnList
   * @summary 商品供应商列表查询
   * @request GET:/api/luteos/product/sku/sn/querySkuSnList
   * @response `200` `SkuSnQueryResp` OK
   */
  export namespace LuteosProductSkuSnQuerySkuSnList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SkuSnQueryResp;
  }

  /**
   * No description
   * @tags 商品供应商管理
   * @name LuteosProductSkuSnSaveSkuSn
   * @summary SN码创建
   * @request POST:/api/luteos/product/sku/sn/saveSkuSn
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosProductSkuSnSaveSkuSn {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SkuSnSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags 商品SKU管理
   * @name LuteosProductSkuUploadSkuImg
   * @summary 上传sku图片
   * @request POST:/api/luteos/product/sku/uploadSkuImg
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosProductSkuUploadSkuImg {
    export type RequestParams = {};
    export type RequestQuery = {
      /** fileName */
      fileName: string;
      /** fileUrl */
      fileUrl: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags 商品中心数据统计
   * @name LuteosProductStatsQueryMemberCenterStats
   * @summary 个人中心数据统计
   * @request GET:/api/luteos/product/stats/queryMemberCenterStats
   * @response `200` `MemberCenterStatsQueryResp` OK
   */
  export namespace LuteosProductStatsQueryMemberCenterStats {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MemberCenterStatsQueryResp;
  }

  /**
   * No description
   * @tags 供应链SKU管理
   * @name LuteosProductSupplySkuExportSupplySku
   * @summary 供应链sku导出
   * @request POST:/api/luteos/product/supplySku/exportSupplySku
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosProductSupplySkuExportSupplySku {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SupplySkuListQueryReq;
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
   * @tags 供应链SKU管理
   * @name LuteosProductSupplySkuExportSupplySkuList
   * @summary 供应链sku列表导出
   * @request POST:/api/luteos/product/supplySku/exportSupplySkuList
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosProductSupplySkuExportSupplySkuList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SupplySkuListQueryReq;
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
   * @tags 供应链SKU管理
   * @name LuteosProductSupplySkuOperateSupplySku
   * @summary 供应链sku操作
   * @request POST:/api/luteos/product/supplySku/operateSupplySku
   * @response `200` `SupplySkuCommonResp` OK
   */
  export namespace LuteosProductSupplySkuOperateSupplySku {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SupplySkuOperateReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SupplySkuCommonResp;
  }

  /**
   * No description
   * @tags 供应链SKU管理
   * @name LuteosProductSupplySkuQueryGtmMemberList
   * @summary 费用归属人列表
   * @request GET:/api/luteos/product/supplySku/queryGtmMemberList
   * @response `200` `DeptMemberListQueryResp` OK
   */
  export namespace LuteosProductSupplySkuQueryGtmMemberList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DeptMemberListQueryResp;
  }

  /**
   * No description
   * @tags 供应链SKU管理
   * @name LuteosProductSupplySkuQueryProductLineList
   * @summary 费用归属品线列表
   * @request GET:/api/luteos/product/supplySku/queryProductLineList
   * @response `200` `FinanceProductLineListResp` OK
   */
  export namespace LuteosProductSupplySkuQueryProductLineList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = FinanceProductLineListResp;
  }

  /**
   * No description
   * @tags 供应链SKU管理
   * @name LuteosProductSupplySkuQuerySupplyPurchaserList
   * @summary 采购员信息查询
   * @request GET:/api/luteos/product/supplySku/querySupplyPurchaserList
   * @response `200` `SupplyPurchaserResp` OK
   */
  export namespace LuteosProductSupplySkuQuerySupplyPurchaserList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SupplyPurchaserResp;
  }

  /**
   * No description
   * @tags 供应链SKU管理
   * @name LuteosProductSupplySkuQuerySupplySkuPerfection
   * @summary 获取供应链sku信息完整度
   * @request GET:/api/luteos/product/supplySku/querySupplySku/perfection
   * @response `200` `SupplySkuPerfectionQueryResp` OK
   */
  export namespace LuteosProductSupplySkuQuerySupplySkuPerfection {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SupplySkuPerfectionQueryResp;
  }

  /**
   * No description
   * @tags 供应链SKU管理
   * @name LuteosProductSupplySkuQuerySupplySkuDetail
   * @summary 供应链sku详情
   * @request GET:/api/luteos/product/supplySku/querySupplySkuDetail
   * @response `200` `SupplySkuDetailResp` OK
   */
  export namespace LuteosProductSupplySkuQuerySupplySkuDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 供应链SKU */
      productSku: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SupplySkuDetailResp;
  }

  /**
   * No description
   * @tags 供应链SKU管理
   * @name LuteosProductSupplySkuQuerySupplySkuList
   * @summary 供应链sku列表查询
   * @request GET:/api/luteos/product/supplySku/querySupplySkuList
   * @response `200` `SupplySkuListQueryResp` OK
   */
  export namespace LuteosProductSupplySkuQuerySupplySkuList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SupplySkuListQueryResp;
  }

  /**
   * No description
   * @tags 供应链SKU管理
   * @name LuteosProductSupplySkuSaveSupplySku
   * @summary 供应链sku保存
   * @request POST:/api/luteos/product/supplySku/saveSupplySku
   * @response `200` `SupplySkuCommonResp` OK
   */
  export namespace LuteosProductSupplySkuSaveSupplySku {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SupplySkuSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SupplySkuCommonResp;
  }

  /**
   * No description
   * @tags 标签分类管理
   * @name LuteosProductTagCategoryCreateCategory
   * @summary 创建标签分类
   * @request POST:/api/luteos/product/tag/category/createCategory
   * @response `200` `CreateCategoryResp` OK
   */
  export namespace LuteosProductTagCategoryCreateCategory {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateCategoryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CreateCategoryResp;
  }

  /**
   * @description codeList为空时按照categoryName进行查询，codeList不为空时按照codeList查询
   * @tags 标签分类管理
   * @name LuteosProductTagCategoryExport
   * @summary 导出标签分类
   * @request POST:/api/luteos/product/tag/category/export
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosProductTagCategoryExport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CategoryListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonExportResp;
  }

  /**
   * @description 传入categoryCode，返回其下一级分类节点列表
   * @tags 标签分类管理
   * @name LuteosProductTagCategoryQueryChildren
   * @summary 根据分类编码查询下一级子节点
   * @request GET:/api/luteos/product/tag/category/queryChildren
   * @response `200` `CategoryChildrenQueryResp` OK
   */
  export namespace LuteosProductTagCategoryQueryChildren {
    export type RequestParams = {};
    export type RequestQuery = {
      /** categoryCode */
      categoryCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CategoryChildrenQueryResp;
  }

  /**
   * @description 无参时返回整个树结构；传入categoryName时，根据分类名称模糊查询，返回匹配的分类及其所有父级分类的树结构
   * @tags 标签分类管理
   * @name LuteosProductTagCategoryQueryTree
   * @summary 查询标签分类树
   * @request GET:/api/luteos/product/tag/category/queryTree
   * @response `200` `CategoryTreeResp` OK
   */
  export namespace LuteosProductTagCategoryQueryTree {
    export type RequestParams = {};
    export type RequestQuery = {
      /** categoryName */
      categoryName?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CategoryTreeResp;
  }

  /**
   * No description
   * @tags 标签分类管理
   * @name LuteosProductTagCategoryQueyCategoryList
   * @summary 查询标签分类列表
   * @request GET:/api/luteos/product/tag/category/queyCategoryList
   * @response `200` `CategoryListQueryResp` OK
   */
  export namespace LuteosProductTagCategoryQueyCategoryList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CategoryListQueryResp;
  }

  /**
   * No description
   * @tags 标签分类管理
   * @name LuteosProductTagCategoryUpdateCategory
   * @summary 更新标签分类
   * @request POST:/api/luteos/product/tag/category/updateCategory
   * @response `200` `UpdateCategoryResp` OK
   */
  export namespace LuteosProductTagCategoryUpdateCategory {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UpdateCategoryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = UpdateCategoryResp;
  }

  /**
   * No description
   * @tags 标签管理
   * @name LuteosProductTagConnectProduct
   * @summary 标签关联商品
   * @request POST:/api/luteos/product/tag/connectProduct
   * @response `200` `CommonRespBoolean` OK
   */
  export namespace LuteosProductTagConnectProduct {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TagProductConnectReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespBoolean;
  }

  /**
   * No description
   * @tags 标签管理
   * @name LuteosProductTagExportTag
   * @summary 标签信息导出
   * @request POST:/api/luteos/product/tag/exportTag
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosProductTagExportTag {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TagListQueryReq;
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
   * @tags 标签管理
   * @name LuteosProductTagOperateTag
   * @summary 标签操作
   * @request POST:/api/luteos/product/tag/operateTag
   * @response `200` `CommonRespBoolean` OK
   */
  export namespace LuteosProductTagOperateTag {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TagOperateReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespBoolean;
  }

  /**
   * No description
   * @tags 标签管理
   * @name LuteosProductTagQueryTagDetail
   * @summary 标签详情查询
   * @request GET:/api/luteos/product/tag/queryTagDetail
   * @response `200` `TagDetailResp` OK
   */
  export namespace LuteosProductTagQueryTagDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 标签编码 */
      tagCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = TagDetailResp;
  }

  /**
   * No description
   * @tags 标签管理
   * @name LuteosProductTagQueryTagList
   * @summary 标签列表查询
   * @request GET:/api/luteos/product/tag/queryTagList
   * @response `200` `TagListQueryResp` OK
   */
  export namespace LuteosProductTagQueryTagList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = TagListQueryResp;
  }

  /**
   * No description
   * @tags 标签管理
   * @name LuteosProductTagQueryTagProduct
   * @summary 查询标签关联商品
   * @request GET:/api/luteos/product/tag/queryTagProduct
   * @response `200` `TagProductResp` OK
   */
  export namespace LuteosProductTagQueryTagProduct {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = TagProductResp;
  }

  /**
   * No description
   * @tags 标签管理
   * @name LuteosProductTagSaveOrUpdateTag
   * @summary 标签信息保存
   * @request POST:/api/luteos/product/tag/saveOrUpdateTag
   * @response `200` `TagSaveResp` OK
   */
  export namespace LuteosProductTagSaveOrUpdateTag {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TagSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = TagSaveResp;
  }

  /**
   * No description
   * @tags TK周报模块
   * @name LuteosProductTiktokExportMetaTiktokSumList
   * @summary tiktok-机构达人汇总导出
   * @request POST:/api/luteos/product/tiktok/exportMetaTiktokSumList
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosProductTiktokExportMetaTiktokSumList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MetaTiktokReportSumQueryReq;
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
   * @tags TK周报模块
   * @name LuteosProductTiktokExportTiktokAdsList
   * @summary tiktok-广告明细表现导出
   * @request POST:/api/luteos/product/tiktok/exportTiktokAdsList
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosProductTiktokExportTiktokAdsList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TiktokAdsQueryReq;
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
   * @tags TK周报模块
   * @name LuteosProductTiktokExportTiktokAffiliateAccountsSpuList
   * @summary tiktok-机构达人表现导出
   * @request POST:/api/luteos/product/tiktok/exportTiktokAffiliateAccountsSpuList
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosProductTiktokExportTiktokAffiliateAccountsSpuList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TiktokAffiliateAccountsSpuQueryReq;
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
   * @tags TK周报模块
   * @name LuteosProductTiktokExportTiktokWeekReportList
   * @summary tiktok-小店周报SPU导出
   * @request POST:/api/luteos/product/tiktok/exportTiktokWeekReportList
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosProductTiktokExportTiktokWeekReportList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TiktokWeekReportQueryReq;
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
   * @tags tiktok-在线商品
   * @name LuteosProductTiktokListingDownload
   * @summary tiktok-在线商品导出-V2
   * @request POST:/api/luteos/product/tiktok/listing/download
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosProductTiktokListingDownload {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TikTokListingProductReq;
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
   * @tags tiktok-在线商品
   * @name LuteosProductTiktokListingQueryProductListingPage
   * @summary tiktok-在线商品分页查询-V2
   * @request POST:/api/luteos/product/tiktok/listing/queryProductListingPage
   * @response `200` `TikTokProductListingResp` OK
   */
  export namespace LuteosProductTiktokListingQueryProductListingPage {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TikTokListingProductReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = TikTokProductListingResp;
  }

  /**
   * No description
   * @tags TK周报模块
   * @name LuteosProductTiktokQueryMetaTiktokSumList
   * @summary tiktok-机构达人表现-汇总查询
   * @request POST:/api/luteos/product/tiktok/queryMetaTiktokSumList
   * @response `200` `MetaTiktokReportSumQueryResp` OK
   */
  export namespace LuteosProductTiktokQueryMetaTiktokSumList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MetaTiktokReportSumQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MetaTiktokReportSumQueryResp;
  }

  /**
   * No description
   * @tags TK周报模块
   * @name LuteosProductTiktokQueryTiktokAdsList
   * @summary tiktok-广告明细表现查询
   * @request GET:/api/luteos/product/tiktok/queryTiktokAdsList
   * @response `200` `TiktokAdsQueryResp` OK
   */
  export namespace LuteosProductTiktokQueryTiktokAdsList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = TiktokAdsQueryResp;
  }

  /**
   * No description
   * @tags TK周报模块
   * @name LuteosProductTiktokQueryTiktokAdsPlatformSkuList
   * @summary tiktok-广告映射店铺sku查询
   * @request GET:/api/luteos/product/tiktok/queryTiktokAdsPlatformSkuList
   * @response `200` `TiktokAdsPlatformSkuQueryResp` OK
   */
  export namespace LuteosProductTiktokQueryTiktokAdsPlatformSkuList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = TiktokAdsPlatformSkuQueryResp;
  }

  /**
   * No description
   * @tags TK周报模块
   * @name LuteosProductTiktokQueryTiktokAffiliateAccountsSpuList
   * @summary tiktok-机构达人表现-周维度查询
   * @request POST:/api/luteos/product/tiktok/queryTiktokAffiliateAccountsSpuList
   * @response `200` `TiktokAffiliateAccountsSpuQueryResp` OK
   */
  export namespace LuteosProductTiktokQueryTiktokAffiliateAccountsSpuList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TiktokAffiliateAccountsSpuQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = TiktokAffiliateAccountsSpuQueryResp;
  }

  /**
   * No description
   * @tags TK周报模块
   * @name LuteosProductTiktokQueryTiktokWeekReportList
   * @summary tiktok-小店周报SPU查询
   * @request GET:/api/luteos/product/tiktok/queryTiktokWeekReportList
   * @response `200` `TiktokWeekReportQueryResp` OK
   */
  export namespace LuteosProductTiktokQueryTiktokWeekReportList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = TiktokWeekReportQueryResp;
  }

  /**
   * No description
   * @tags TK周报模块
   * @name LuteosProductTiktokSaveTiktokAdsSku
   * @summary tiktok-广告店铺SKU映射保存
   * @request POST:/api/luteos/product/tiktok/saveTiktokAdsSku
   * @response `200` `TiktokAdsSkuSaveResp` OK
   */
  export namespace LuteosProductTiktokSaveTiktokAdsSku {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TiktokAdsSkuSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = TiktokAdsSkuSaveResp;
  }

  /**
   * No description
   * @tags 沃尔玛-在线商品
   * @name LuteosProductWalmartListingDownload
   * @summary 沃尔玛-在线商品导出-V2
   * @request POST:/api/luteos/product/walmart/listing/download
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosProductWalmartListingDownload {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = WalmartListingProductReq;
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
   * @tags 沃尔玛-在线商品
   * @name LuteosProductWalmartListingListingDownload
   * @summary 沃尔玛在线商品导出
   * @request POST:/api/luteos/product/walmart/listing/listing/download
   * @deprecated
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosProductWalmartListingListingDownload {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = WalmartListingReq;
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
   * @tags 沃尔玛-在线商品
   * @name LuteosProductWalmartListingListingQueryTag
   * @summary 沃尔玛在线商品父维度标签查询
   * @request POST:/api/luteos/product/walmart/listing/listing/queryTag
   * @deprecated
   * @response `200` `ListingTagResp` OK
   */
  export namespace LuteosProductWalmartListingListingQueryTag {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ListingQueryTagReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ListingTagResp;
  }

  /**
   * No description
   * @tags 沃尔玛-在线商品
   * @name LuteosProductWalmartListingListingUpdateTag
   * @summary 沃尔玛在线商品标签保存更新
   * @request POST:/api/luteos/product/walmart/listing/listing/updateTag
   * @deprecated
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosProductWalmartListingListingUpdateTag {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ListingBatchModifyTagReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags 沃尔玛-在线商品
   * @name LuteosProductWalmartListingQueryPage
   * @summary 沃尔玛-在线商品分页查询
   * @request POST:/api/luteos/product/walmart/listing/queryPage
   * @deprecated
   * @response `200` `WalmartListingResp` OK
   */
  export namespace LuteosProductWalmartListingQueryPage {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = WalmartListingReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = WalmartListingResp;
  }

  /**
   * No description
   * @tags 沃尔玛-在线商品
   * @name LuteosProductWalmartListingQueryProductListingPage
   * @summary 沃尔玛-在线商品分页查询-V2
   * @request POST:/api/luteos/product/walmart/listing/queryProductListingPage
   * @response `200` `WalmartProductListingResp` OK
   */
  export namespace LuteosProductWalmartListingQueryProductListingPage {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = WalmartListingProductReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = WalmartProductListingResp;
  }

  /**
   * No description
   * @tags 沃尔玛-在线商品
   * @name LuteosProductWalmartListingSaveOperator
   * @summary 沃尔玛-在线商品保存运营人员
   * @request POST:/api/luteos/product/walmart/listing/saveOperator
   * @deprecated
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosProductWalmartListingSaveOperator {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OperatorSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags 沃尔玛-在线商品
   * @name LuteosProductWalmartListingSaveProductLink
   * @summary 沃尔玛-在线商品保存商品链接
   * @request POST:/api/luteos/product/walmart/listing/saveProductLink
   * @deprecated
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosProductWalmartListingSaveProductLink {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductLinkSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespObject;
  }
}
