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

export namespace Api {
  /**
   * No description
   * @tags 亚马逊-在线商品
   * @name BatchModifyPlanUsingPost2
   * @summary 亚马逊-在线商父ASIN批量添加/更新计划人员
   * @request POST:/api/luteos/product/amazon/listing/batchModifyPlan
   * @deprecated
   */
  export namespace BatchModifyPlanUsingPost2 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ListingBatchModifyPlanReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags 亚马逊-在线商品
   * @name BatchUpdateOperatorUsingPost1
   * @summary 在线商品新增/更新运营人员
   * @request POST:/api/luteos/product/amazon/listing/batchUpdateOperator
   */
  export namespace BatchUpdateOperatorUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BatchOperatorReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags 亚马逊-在线商品
   * @name DownloadUsingPost10
   * @summary 亚马逊父子维度导出-V2
   * @request POST:/api/luteos/product/amazon/listing/download
   */
  export namespace DownloadUsingPost10 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AmazonProductListingReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonExportResp;
  }

  /**
   * No description
   * @tags 亚马逊-在线商品
   * @name DownloadUsingPost9
   * @summary 亚马逊父子维度导出
   * @request POST:/api/luteos/product/amazon/listing/listing/download
   * @deprecated
   */
  export namespace DownloadUsingPost9 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AmazonListingReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonExportResp;
  }

  /**
   * No description
   * @tags 亚马逊-在线商品
   * @name QueryListingTagUsingPost5
   * @summary 亚马逊在线商品父维度标签查询
   * @request POST:/api/luteos/product/amazon/listing/listing/queryTag
   * @deprecated
   */
  export namespace QueryListingTagUsingPost5 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ListingQueryTagReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = ListingTagResp;
  }

  /**
   * No description
   * @tags 亚马逊-在线商品
   * @name UpdateTagUsingPost5
   * @summary 亚马逊在线商品父维度标签保存更新
   * @request POST:/api/luteos/product/amazon/listing/listing/updateTag
   * @deprecated
   */
  export namespace UpdateTagUsingPost5 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ListingBatchModifyTagReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags 亚马逊-在线商品
   * @name UpdateTagV2UsingPost1
   * @summary 在线商品标签保存更新
   * @request POST:/api/luteos/product/amazon/listing/listing/updateTagV2
   */
  export namespace UpdateTagV2UsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ListingBatchModifyTagV2Req;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags 亚马逊-在线商品
   * @name QueryListUsingPost31
   * @summary 亚马逊-在线商品分页查询-V2
   * @request POST:/api/luteos/product/amazon/listing/queryAsinPage
   */
  export namespace QueryListUsingPost31 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AmazonProductListingReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = AmazonProductListingResp;
  }

  /**
   * No description
   * @tags 亚马逊-在线商品
   * @name QueryParentAsinUsingPost1
   * @summary 亚马逊-在线商品父ASIN分页查询
   * @request POST:/api/luteos/product/amazon/listing/queryParentAsinPage
   * @deprecated
   */
  export namespace QueryParentAsinUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AmazonListingReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = AmazonListingParentResp;
  }

  /**
   * No description
   * @tags 亚马逊-在线商品
   * @name QueryAsinUsingPost1
   * @summary 亚马逊-在线商品子ASIN分页查询
   * @request POST:/api/luteos/product/amazon/listing/queryParentSonPage
   * @deprecated
   */
  export namespace QueryAsinUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AmazonListingReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = AmazonListingResp;
  }

  /**
   * No description
   * @tags 亚马逊-在线商品
   * @name QueryListingTagV2UsingPost1
   * @summary 在线商品标签查询
   * @request POST:/api/luteos/product/amazon/listing/queryTagV2
   */
  export namespace QueryListingTagV2UsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ListingQueryTagV2Req;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = ListingTagResp;
  }

  /**
   * No description
   * @tags 亚马逊-在线商品
   * @name SaveOperatorV2UsingPost1
   * @summary 在线商品保存运营人员
   * @request POST:/api/luteos/product/amazon/listing/saveOperatorV2
   */
  export namespace SaveOperatorV2UsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OperatorCommonSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags 亚马逊-在线商品
   * @name SaveProductLinkV2UsingPost1
   * @summary 在线商品保存商品链接
   * @request POST:/api/luteos/product/amazon/listing/saveProductLinkV2
   */
  export namespace SaveProductLinkV2UsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductLinkCommonSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags 亚马逊运营人员稽查
   * @name DownloadUsingPost11
   * @summary 导出
   * @request POST:/api/luteos/product/amazon/operatorCheck/download
   */
  export namespace DownloadUsingPost11 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AmazonProductOperatorCheckReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonExportResp;
  }

  /**
   * No description
   * @tags 亚马逊运营人员稽查
   * @name QueryDetailUsingPost7
   * @summary 详情查询
   * @request POST:/api/luteos/product/amazon/operatorCheck/queryDetail
   */
  export namespace QueryDetailUsingPost7 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AmazonProductOperatorCheckDetailReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespListAmazonOperatorCheckDetailBean;
  }

  /**
   * No description
   * @tags 亚马逊运营人员稽查
   * @name QueryListUsingPost32
   * @summary 列表查询
   * @request POST:/api/luteos/product/amazon/operatorCheck/queryList
   */
  export namespace QueryListUsingPost32 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AmazonProductOperatorCheckReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = AmazonProductOperatorListResp;
  }

  /**
   * No description
   * @tags 亚马逊运营人员稽查
   * @name QuerySpuGtmListUsingGet1
   * @summary 查询GTM小组列表
   * @request GET:/api/luteos/product/amazon/operatorCheck/querySpuGtmList
   */
  export namespace QuerySpuGtmListUsingGet1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespListString;
  }

  /**
   * No description
   * @tags 属性管理
   * @name ConnectCategoryUsingPost2
   * @summary 属性关联分类
   * @request POST:/api/luteos/product/attr/connectCategory
   */
  export namespace ConnectCategoryUsingPost2 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AttrCategoryConnectReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespBoolean;
  }

  /**
   * No description
   * @tags 属性管理
   * @name ExportAttrUsingPost1
   * @summary 属性信息导出
   * @request POST:/api/luteos/product/attr/exportAttr
   */
  export namespace ExportAttrUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AttrListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonExportResp;
  }

  /**
   * No description
   * @tags 属性管理
   * @name OperateAttrUsingPost1
   * @summary 属性操作
   * @request POST:/api/luteos/product/attr/operateAttr
   */
  export namespace OperateAttrUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AttrOperateReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespBoolean;
  }

  /**
   * No description
   * @tags 属性管理
   * @name QueryAttrDetailUsingGet1
   * @summary 属性详情查询
   * @request GET:/api/luteos/product/attr/queryAttrDetail
   */
  export namespace QueryAttrDetailUsingGet1 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = AttrDetailResp;
  }

  /**
   * No description
   * @tags 属性管理
   * @name QueryAttrListUsingGet1
   * @summary 属性列表查询
   * @request GET:/api/luteos/product/attr/queryAttrList
   */
  export namespace QueryAttrListUsingGet1 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = AttrListQueryResp;
  }

  /**
   * No description
   * @tags 属性管理
   * @name QueryCategoryLeveListUsingGet1
   * @summary 分类列表查询
   * @request GET:/api/luteos/product/attr/queryCategoryLevelList
   */
  export namespace QueryCategoryLeveListUsingGet1 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = CategoryLevelQueryInAttrResp;
  }

  /**
   * No description
   * @tags 商品管理, 属性管理
   * @name QueryProductAttrListUsingGet1
   * @summary 商品属性列表查询
   * @request GET:/api/luteos/product/attr/queryProductAttrList
   */
  export namespace QueryProductAttrListUsingGet1 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = ProductAttrListQueryResp;
  }

  /**
   * No description
   * @tags 属性管理
   * @name SaveOrUpdateAttrUsingPost1
   * @summary 属性信息保存
   * @request POST:/api/luteos/product/attr/saveOrUpdateAttr
   */
  export namespace SaveOrUpdateAttrUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AttrSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = AttrSaveResp;
  }

  /**
   * No description
   * @tags 属性管理
   * @name SaveOrUpdateAttrValUsingPost1
   * @summary 属性值信息保存
   * @request POST:/api/luteos/product/attr/saveOrUpdateAttrVal
   */
  export namespace SaveOrUpdateAttrValUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AttrValSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = AttrValSaveResp;
  }

  /**
   * No description
   * @tags B2C-在线商品
   * @name QueryProductListingPageUsingGet1
   * @summary b2c-渠道列表
   * @request GET:/api/luteos/product/b2c/listing/queryChannelList
   */
  export namespace QueryProductListingPageUsingGet1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = B2CChannelResp;
  }

  /**
   * No description
   * @tags B2C-在线商品
   * @name QueryProductListingPageUsingPost5
   * @summary b2c-在线商品分页查询-V2
   * @request POST:/api/luteos/product/b2c/listing/queryProductListingPage
   */
  export namespace QueryProductListingPageUsingPost5 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = B2CListingProductReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = B2CProductListingResp;
  }

  /**
   * No description
   * @tags 产品条形码
   * @name CancelUsingPost1
   * @summary 产品条形码取消
   * @request POST:/api/luteos/product/barcode/cancel
   */
  export namespace CancelUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductBarCodeCancelReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags 产品条形码, 红人管理
   * @name DownLoadMetaOrderTemplateUsingPost2
   * @summary 下载导入条形码模板
   * @request POST:/api/luteos/product/barcode/downLoadBarCodeTemplate
   */
  export namespace DownLoadMetaOrderTemplateUsingPost2 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespString;
  }

  /**
   * No description
   * @tags 产品条形码
   * @name ExportUsingPost11
   * @summary 产品条形码导出信息
   * @request POST:/api/luteos/product/barcode/export
   */
  export namespace ExportUsingPost11 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductBarCodeQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonExportResp;
  }

  /**
   * No description
   * @tags 产品条形码
   * @name QueryListUsingPost39
   * @summary 产品条形码查询
   * @request POST:/api/luteos/product/barcode/queryList
   */
  export namespace QueryListUsingPost39 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductBarCodeQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = ProductBarCodeQueryResp;
  }

  /**
   * No description
   * @tags 产品条形码
   * @name SaveOrUpdateUsingPost14
   * @summary 商品条形码保存
   * @request POST:/api/luteos/product/barcode/saveOrUpdate
   */
  export namespace SaveOrUpdateUsingPost14 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductBarCodeSaveUpdateReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags 商品管理
   * @name BatchOperateProductUsingPost1
   * @summary 商品信息批量操作
   * @request POST:/api/luteos/product/batchOperateProduct
   */
  export namespace BatchOperateProductUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductBatchOperateReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespBoolean;
  }

  /**
   * No description
   * @tags 品牌管理
   * @name ConnectProductUsingPost5
   * @summary 品牌关联商品
   * @request POST:/api/luteos/product/brand/connectProduct
   */
  export namespace ConnectProductUsingPost5 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BrandProductConnectReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespString;
  }

  /**
   * No description
   * @tags 品牌管理
   * @name ExportBrandUsingPost1
   * @summary 品牌信息导出
   * @request POST:/api/luteos/product/brand/exportBrand
   */
  export namespace ExportBrandUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BrandListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonExportResp;
  }

  /**
   * No description
   * @tags 品牌管理
   * @name OperateBrandUsingPost1
   * @summary 品牌操作
   * @request POST:/api/luteos/product/brand/operateBrand
   */
  export namespace OperateBrandUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BrandOperateReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespString;
  }

  /**
   * No description
   * @tags 品牌管理
   * @name QueryBrandDetailUsingGet1
   * @summary 品牌详情查询
   * @request GET:/api/luteos/product/brand/queryBrandDetail
   */
  export namespace QueryBrandDetailUsingGet1 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = BrandDetailResp;
  }

  /**
   * No description
   * @tags 品牌管理
   * @name QueryBrandListUsingGet1
   * @summary 品牌列表查询
   * @request GET:/api/luteos/product/brand/queryBrandList
   */
  export namespace QueryBrandListUsingGet1 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = BrandListQueryResp;
  }

  /**
   * No description
   * @tags 品牌管理
   * @name SaveOrUpdateBrandUsingPost1
   * @summary 品牌信息保存
   * @request POST:/api/luteos/product/brand/saveOrUpdateBrand
   */
  export namespace SaveOrUpdateBrandUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BrandSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = BrandSaveResp;
  }

  /**
   * No description
   * @tags 商品分类管理
   * @name ConnectAttrUsingPost1
   * @summary 分类关联属性
   * @request POST:/api/luteos/product/category/connectAttr
   */
  export namespace ConnectAttrUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CategoryAttrConnectReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespBoolean;
  }

  /**
   * No description
   * @tags 商品分类管理
   * @name ExportCategoryUsingPost1
   * @summary 分类信息导出
   * @request POST:/api/luteos/product/category/exportCategory
   */
  export namespace ExportCategoryUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CategoryListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonExportResp;
  }

  /**
   * No description
   * @tags 商品分类管理
   * @name OperateModelUsingPost2
   * @summary 分类操作
   * @request POST:/api/luteos/product/category/operateCategory
   */
  export namespace OperateModelUsingPost2 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CategoryOperateReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespBoolean;
  }

  /**
   * No description
   * @tags 商品分类管理
   * @name QueryCategoryDetailUsingGet1
   * @summary 分类详情查询
   * @request GET:/api/luteos/product/category/queryCategoryDetail
   */
  export namespace QueryCategoryDetailUsingGet1 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = CategoryDetailResp;
  }

  /**
   * No description
   * @tags 商品分类管理
   * @name QueryCategoryLevelListUsingGet1
   * @summary 分类下级查询
   * @request GET:/api/luteos/product/category/queryCategoryLevelList
   */
  export namespace QueryCategoryLevelListUsingGet1 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = CategoryLevelQueryResp;
  }

  /**
   * No description
   * @tags 商品分类管理
   * @name QueryCategoryListUsingGet2
   * @summary 分类列表查询
   * @request GET:/api/luteos/product/category/queryCategoryList
   */
  export namespace QueryCategoryListUsingGet2 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = CategoryListQueryResp;
  }

  /**
   * No description
   * @tags 商品分类管理
   * @name QueryCategoryListByParamUsingGet1
   * @summary 查询分类列表-不含层级
   * @request GET:/api/luteos/product/category/queryCategoryListByParam
   */
  export namespace QueryCategoryListByParamUsingGet1 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = CategoryListQueryResp;
  }

  /**
   * No description
   * @tags 商品分类管理
   * @name QueryCategoryTopAndLeafLevelListUsingGet1
   * @summary 分类一级/五级查询
   * @request GET:/api/luteos/product/category/queryCategoryTopAndLeafLevelList
   */
  export namespace QueryCategoryTopAndLeafLevelListUsingGet1 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = CategoryLevelQueryResp;
  }

  /**
   * No description
   * @tags 商品分类管理
   * @name GetCategoryTreeUsingGet2
   * @summary 获取分类树
   * @request GET:/api/luteos/product/category/queryCategoryTree
   */
  export namespace GetCategoryTreeUsingGet2 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = CategoryTreeResp;
  }

  /**
   * No description
   * @tags 商品分类管理
   * @name QuerySubCategoryListUsingGet1
   * @summary 下级分类列表查询
   * @request GET:/api/luteos/product/category/querySubCategoryList
   */
  export namespace QuerySubCategoryListUsingGet1 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = CategoryListQueryResp;
  }

  /**
   * No description
   * @tags 商品分类管理
   * @name QueryThreeCategoryUsingGet1
   * @summary 查询三级分类
   * @request GET:/api/luteos/product/category/queryThreeCategory
   */
  export namespace QueryThreeCategoryUsingGet1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CategoryListQueryResp;
  }

  /**
   * No description
   * @tags 商品分类管理
   * @name SaveCategoryUsingPost2
   * @summary 分类信息保存
   * @request POST:/api/luteos/product/category/saveOrUpdateCategory
   */
  export namespace SaveCategoryUsingPost2 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CategorySaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CategorySaveResp;
  }

  /**
   * No description
   * @tags 商品管理
   * @name CheckRepeatProductUsingPost1
   * @summary 商品编码重复校验
   * @request POST:/api/luteos/product/checkRepeatProduct
   */
  export namespace CheckRepeatProductUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductCheckRepeatReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespBoolean;
  }

  /**
   * No description
   * @tags 在线商品标签
   * @name UpdateTagUsingPost6
   * @summary 在线商品标签保存更新
   * @request POST:/api/luteos/product/common/listing/listing/updateTag
   */
  export namespace UpdateTagUsingPost6 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ListingBatchModifyTagV2Req;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags 在线商品标签
   * @name QueryListingTagUsingPost6
   * @summary 在线商品标签查询
   * @request POST:/api/luteos/product/common/listing/queryTag
   */
  export namespace QueryListingTagUsingPost6 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ListingQueryTagV2Req;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = ListingTagResp;
  }

  /**
   * No description
   * @tags 在线商品标签
   * @name SaveOperatorUsingPost4
   * @summary 在线商品保存运营人员
   * @request POST:/api/luteos/product/common/listing/saveOperator
   */
  export namespace SaveOperatorUsingPost4 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OperatorCommonSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags 在线商品标签
   * @name SaveProductLinkUsingPost4
   * @summary 在线商品保存商品链接
   * @request POST:/api/luteos/product/common/listing/saveProductLink
   */
  export namespace SaveProductLinkUsingPost4 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductLinkCommonSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags 商品管理
   * @name ConnectCategoryUsingPost3
   * @summary 商品关联分类
   * @request POST:/api/luteos/product/connectCategory
   */
  export namespace ConnectCategoryUsingPost3 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductConnectCategoryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespBoolean;
  }

  /**
   * No description
   * @tags 衍生项目管理
   * @name DownloadUsingGet1
   * @summary 衍生项目列表导出
   * @request GET:/api/luteos/product/derive/download
   */
  export namespace DownloadUsingGet1 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonExportResp;
  }

  /**
   * No description
   * @tags 衍生项目管理
   * @name QueryDeriveListUsingGet1
   * @summary 衍生项目列表查询
   * @request GET:/api/luteos/product/derive/queryDeriveList
   */
  export namespace QueryDeriveListUsingGet1 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = DeriveQueryResp;
  }

  /**
   * No description
   * @tags 衍生项目管理
   * @name QueryDeriveListParamUsingGet1
   * @summary 衍生项目列表查询参数
   * @request GET:/api/luteos/product/derive/queryDeriveListParam
   */
  export namespace QueryDeriveListParamUsingGet1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = DeriveListParamResp;
  }

  /**
   * No description
   * @tags 易仓SKU管理
   * @name ExportEccangSkuUsingPost1
   * @summary 导出供应链SKU
   * @request POST:/api/luteos/product/eccangSku/exportEccangSku
   */
  export namespace ExportEccangSkuUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = EccangSkuQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonExportResp;
  }

  /**
   * No description
   * @tags 易仓SKU管理
   * @name QueryEccangSkuFullListUsingGet1
   * @summary 供应链SKU列表全字段查询
   * @request GET:/api/luteos/product/eccangSku/queryEccangSkuFullList
   */
  export namespace QueryEccangSkuFullListUsingGet1 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = EccangSkuFullQueryResp;
  }

  /**
   * No description
   * @tags 易仓SKU管理
   * @name QueryEccangSkuListUsingGet1
   * @summary 供应链SKU列表查询
   * @request GET:/api/luteos/product/eccangSku/queryEccangSkuList
   */
  export namespace QueryEccangSkuListUsingGet1 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = EccangSkuQueryResp;
  }

  /**
   * No description
   * @tags 易仓SKU管理
   * @name SyncEccangUsingPost1
   * @summary 同步易仓
   * @request POST:/api/luteos/product/eccangSku/syncEccang
   */
  export namespace SyncEccangUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = EccangSkuQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags 易仓SKU管理
   * @name ExportEccangSkuV2UsingPost1
   * @summary 导出供应链SKU-v2
   * @request POST:/api/luteos/product/eccangSku/v2/exportEccangSku
   */
  export namespace ExportEccangSkuV2UsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = EccangSkuQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonExportResp;
  }

  /**
   * No description
   * @tags 易仓SKU管理
   * @name QueryEccangSkuListV2UsingGet1
   * @summary 供应链SKU列表查询-v2
   * @request GET:/api/luteos/product/eccangSku/v2/queryEccangSkuList
   */
  export namespace QueryEccangSkuListV2UsingGet1 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = EccangSkuQueryV2Resp;
  }

  /**
   * No description
   * @tags 商品到期推荐策略管理
   * @name InfoUsingGet2
   * @summary 获取商品到期配置详情
   * @request GET:/api/luteos/product/expire-config/info
   */
  export namespace InfoUsingGet2 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags 商品到期推荐策略管理
   * @name ListUsingGet15
   * @summary 获取商品到期配置列表
   * @request GET:/api/luteos/product/expire-config/list
   */
  export namespace ListUsingGet15 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags 商品到期推荐策略管理
   * @name SaveUsingPost20
   * @summary 新增商品到期配置
   * @request POST:/api/luteos/product/expire-config/save
   */
  export namespace SaveUsingPost20 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags 商品到期推荐策略管理
   * @name UpdateUsingPost7
   * @summary 更新商品到期配置
   * @request POST:/api/luteos/product/expire-config/update
   */
  export namespace UpdateUsingPost7 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags 商品管理
   * @name ExportProductUsingPost5
   * @summary 商品导出信息
   * @request POST:/api/luteos/product/exportProduct
   */
  export namespace ExportProductUsingPost5 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonExportResp;
  }

  /**
   * No description
   * @tags 组合产品管理
   * @name QueryGroupDetailUsingGet2
   * @summary 组合产品详情查询
   * @request GET:/api/luteos/product/group/queryGroupDetail
   */
  export namespace QueryGroupDetailUsingGet2 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = ProductGroupDetailResp;
  }

  /**
   * No description
   * @tags 组合产品管理
   * @name QueryProductGroupListUsingGet2
   * @summary 组合产品列表查询
   * @request GET:/api/luteos/product/group/queryProductGroupList
   */
  export namespace QueryProductGroupListUsingGet2 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = ProductGroupListResp;
  }

  /**
   * No description
   * @tags 组合产品管理
   * @name SaveProductGroupUsingPost2
   * @summary 组合产品信息保存
   * @request POST:/api/luteos/product/group/saveProductGroup
   */
  export namespace SaveProductGroupUsingPost2 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductGroupSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = ProductGroupSaveResp;
  }

  /**
   * No description
   * @tags 组合SKU管理
   * @name QueryGroupDetailUsingGet3
   * @summary 组合SKU详情查询
   * @request GET:/api/luteos/product/group/sku/queryGroupSkuDetail
   */
  export namespace QueryGroupDetailUsingGet3 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = ProductGroupSkuDetailResp;
  }

  /**
   * No description
   * @tags 组合SKU管理
   * @name QueryProductGroupListUsingGet3
   * @summary 组合SKU列表查询
   * @request GET:/api/luteos/product/group/sku/queryProductGroupSkuList
   */
  export namespace QueryProductGroupListUsingGet3 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = ProductGroupSkuListResp;
  }

  /**
   * No description
   * @tags 组合SKU管理
   * @name SaveProductGroupUsingPost3
   * @summary 组合SKU信息保存
   * @request POST:/api/luteos/product/group/sku/saveProductGroupSku
   */
  export namespace SaveProductGroupUsingPost3 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductGroupSkuSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = ProductGroupSkuSaveResp;
  }

  /**
   * No description
   * @tags 产品品线管理
   * @name QueryDetailUsingGet10
   * @summary 查询详情
   * @request GET:/api/luteos/product/line/queryDetail
   */
  export namespace QueryDetailUsingGet10 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = ProductLineDetailResp;
  }

  /**
   * No description
   * @tags 产品品线管理
   * @name QueryListUsingPost40
   * @summary 列表查询
   * @request POST:/api/luteos/product/line/queryList
   */
  export namespace QueryListUsingPost40 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductLineListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = ProductLineListResp;
  }

  /**
   * No description
   * @tags 产品品线管理
   * @name SaveOrUpdateUsingPost15
   * @summary 新增或者编辑品线
   * @request POST:/api/luteos/product/line/saveOrUpdate
   */
  export namespace SaveOrUpdateUsingPost15 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductLineSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespListProductLineSaveResp;
  }

  /**
   * No description
   * @tags MAC地址管理
   * @name BatchOperateMacAddrUsingPost1
   * @summary 批量操作MAC地址
   * @request POST:/api/luteos/product/mac/batchOperateMacAddr
   */
  export namespace BatchOperateMacAddrUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MacAddrOperateReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespVoid;
  }

  /**
   * No description
   * @tags MAC地址管理
   * @name CheckRelSupplySkuUsingPost1
   * @summary 关联供应链产品sku校验
   * @request POST:/api/luteos/product/mac/checkRelSupplySku
   */
  export namespace CheckRelSupplySkuUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MacRelSupplyCheckReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespVoid;
  }

  /**
   * No description
   * @tags MAC地址管理
   * @name ExportMacAddrUsingPost1
   * @summary MAC地址导出
   * @request POST:/api/luteos/product/mac/exportMacAddr
   */
  export namespace ExportMacAddrUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MacAddrQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonExportResp;
  }

  /**
   * No description
   * @tags MAC地址管理
   * @name OperateUsingPost4
   * @summary 贴片工厂操作
   * @request POST:/api/luteos/product/mac/operate
   */
  export namespace OperateUsingPost4 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MacFactoryOperateReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = MacFactoryOperateResp;
  }

  /**
   * No description
   * @tags MAC地址管理
   * @name OperateProductCodeUsingPost1
   * @summary 产品代码操作
   * @request POST:/api/luteos/product/mac/operateProductCode
   */
  export namespace OperateProductCodeUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MacProductCodeOperateReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = MacProductCodeOperateResp;
  }

  /**
   * No description
   * @tags MAC地址管理
   * @name QueryDetailUsingGet8
   * @summary 贴片工厂详情查询
   * @request GET:/api/luteos/product/mac/queryDetail
   */
  export namespace QueryDetailUsingGet8 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = MacFactoryDetailResp;
  }

  /**
   * No description
   * @tags MAC地址管理
   * @name QueryListUsingGet6
   * @summary 贴片工厂列表查询
   * @request GET:/api/luteos/product/mac/queryList
   */
  export namespace QueryListUsingGet6 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = MacFactoryQueryResp;
  }

  /**
   * No description
   * @tags MAC地址管理
   * @name QueryMacAddressListUsingPost4
   * @summary MAC地址列表查询
   * @request POST:/api/luteos/product/mac/queryMacAddressList
   */
  export namespace QueryMacAddressListUsingPost4 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MacAddrQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = MacAddrQueryResp;
  }

  /**
   * No description
   * @tags MAC地址管理
   * @name QueryProductCodeDetailUsingGet1
   * @summary 产品代码详情查询
   * @request GET:/api/luteos/product/mac/queryProductCodeDetail
   */
  export namespace QueryProductCodeDetailUsingGet1 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = MacProductCodeDetailResp;
  }

  /**
   * No description
   * @tags MAC地址管理
   * @name QueryProductCodeListUsingGet1
   * @summary 产品代码列表查询
   * @request GET:/api/luteos/product/mac/queryProductCodeList
   */
  export namespace QueryProductCodeListUsingGet1 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = MacProductCodeQueryResp;
  }

  /**
   * No description
   * @tags MAC地址管理
   * @name QueryPurchaseOrderListUsingPost1
   * @summary PO采购订单查询
   * @request POST:/api/luteos/product/mac/queryPurchaseOrderList
   */
  export namespace QueryPurchaseOrderListUsingPost1 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = PurchaseOrderQueryResp;
  }

  /**
   * No description
   * @tags MAC地址管理
   * @name QuerySupplierCodeListUsingGet1
   * @summary 供应商列表查询
   * @request GET:/api/luteos/product/mac/querySupplierList
   */
  export namespace QuerySupplierCodeListUsingGet1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespMacSupplierQueryResp;
  }

  /**
   * No description
   * @tags MAC地址管理
   * @name SaveFactoryUsingPost1
   * @summary 贴片工厂新增
   * @request POST:/api/luteos/product/mac/saveFactory
   */
  export namespace SaveFactoryUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MacFactorySaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = MacFactorySaveResp;
  }

  /**
   * No description
   * @tags MAC地址管理
   * @name SaveMacAddressUsingPost1
   * @summary MAC地址保存
   * @request POST:/api/luteos/product/mac/saveMacAddress
   */
  export namespace SaveMacAddressUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MacAddrSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespVoid;
  }

  /**
   * No description
   * @tags MAC地址管理
   * @name SaveProductCodeUsingPost1
   * @summary 产品代码保存
   * @request POST:/api/luteos/product/mac/saveProductCode
   */
  export namespace SaveProductCodeUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MacProductCodeSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = MacProductCodeSaveResp;
  }

  /**
   * No description
   * @tags 内购用户地址管理
   * @name DeleteUserAddrUsingPost1
   * @summary 删除用户地址
   * @request POST:/api/luteos/product/mall/addr/deleteUserAddr
   */
  export namespace DeleteUserAddrUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MallUserDeleteReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags 内购用户地址管理
   * @name QueryDefaultAddrUsingGet1
   * @summary 查询用户默认地址
   * @request GET:/api/luteos/product/mall/addr/queryDefaultAddr
   */
  export namespace QueryDefaultAddrUsingGet1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = MallUserDefaultAddrResp;
  }

  /**
   * No description
   * @tags 内购用户地址管理
   * @name QueryUserAddrUsingGet1
   * @summary 查询用户地址详情
   * @request GET:/api/luteos/product/mall/addr/queryUserAddr
   */
  export namespace QueryUserAddrUsingGet1 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = MallUserDefaultAddrResp;
  }

  /**
   * No description
   * @tags 内购用户地址管理
   * @name QueryUserAddrListUsingGet1
   * @summary 查询地址管理列表
   * @request GET:/api/luteos/product/mall/addr/queryUserAddrList
   */
  export namespace QueryUserAddrListUsingGet1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = MallUserAddrListResp;
  }

  /**
   * No description
   * @tags 内购用户地址管理
   * @name SaveUserAddrUsingPost1
   * @summary 保存用户地址
   * @request POST:/api/luteos/product/mall/addr/saveUserAddr
   */
  export namespace SaveUserAddrUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MallUserAddrSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = MallUserAddrSaveResp;
  }

  /**
   * No description
   * @tags 内购商城管理
   * @name ConfirmReceiveUsingPost1
   * @summary 确认收货
   * @request POST:/api/luteos/product/mall/confirmReceive
   */
  export namespace ConfirmReceiveUsingPost1 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespVoid;
  }

  /**
   * No description
   * @tags 内购商城管理
   * @name ExportOrderUsingPost1
   * @summary 导出内购订单
   * @request POST:/api/luteos/product/mall/exportOrder
   */
  export namespace ExportOrderUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MallOrderListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonExportResp;
  }

  /**
   * No description
   * @tags 内购商城管理
   * @name ExportProductListUsingPost1
   * @summary 导出内购产品清单
   * @request POST:/api/luteos/product/mall/exportProductList
   */
  export namespace ExportProductListUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MallProductListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonExportResp;
  }

  /**
   * No description
   * @tags 内购商城管理
   * @name OperateOrderUsingPost3
   * @summary 操作内购订单
   * @request POST:/api/luteos/product/mall/operateOrder
   */
  export namespace OperateOrderUsingPost3 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MallOrderOperateReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags 内购商城管理
   * @name OperateProductUsingPost2
   * @summary 操作内购商品
   * @request POST:/api/luteos/product/mall/operateProduct
   */
  export namespace OperateProductUsingPost2 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MallProductOperateReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = MallProductSaveResp;
  }

  /**
   * No description
   * @tags 内购商城管理
   * @name QueryOrderDetailUsingGet1
   * @summary 查询内购订单详情-管理端
   * @request GET:/api/luteos/product/mall/queryOrderDetail
   */
  export namespace QueryOrderDetailUsingGet1 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = MallOrderDetailResp;
  }

  /**
   * No description
   * @tags 内购商城管理
   * @name QueryOrderListUsingGet1
   * @summary 查询内购订单列表-管理端
   * @request GET:/api/luteos/product/mall/queryOrderList
   */
  export namespace QueryOrderListUsingGet1 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = MallOrderListResp;
  }

  /**
   * No description
   * @tags 内购商城管理
   * @name QueryOrderStatusUsingGet1
   * @summary 查询内购订单支付状态
   * @request GET:/api/luteos/product/mall/queryOrderStatus
   */
  export namespace QueryOrderStatusUsingGet1 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = MallOrderStatusResp;
  }

  /**
   * No description
   * @tags 内购商城管理
   * @name QueryProductDetailUsingGet1
   * @summary 查询内购商品详情
   * @request GET:/api/luteos/product/mall/queryProductDetail
   */
  export namespace QueryProductDetailUsingGet1 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = MallProductDetailResp;
  }

  /**
   * No description
   * @tags 内购商城管理
   * @name QueryProductListUsingPost3
   * @summary 查询内购商品列表
   * @request POST:/api/luteos/product/mall/queryProductList
   */
  export namespace QueryProductListUsingPost3 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MallProductListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = MallProductListResp;
  }

  /**
   * No description
   * @tags 内购商城管理
   * @name SaveProductUsingPost2
   * @summary 保存内购商品
   * @request POST:/api/luteos/product/mall/saveProduct
   */
  export namespace SaveProductUsingPost2 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MallProductSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = MallProductSaveResp;
  }

  /**
   * No description
   * @tags 内购商城管理
   * @name SyncErpUsingGet1
   * @summary 同步易仓
   * @request GET:/api/luteos/product/mall/syncErp
   */
  export namespace SyncErpUsingGet1 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespVoid;
  }

  /**
   * No description
   * @tags 内购商城用户端管理
   * @name OperateOrderUsingPost2
   * @summary 操作订单
   * @request POST:/api/luteos/product/mall/user/operateOrder
   */
  export namespace OperateOrderUsingPost2 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MallClientOrderOperateReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespVoid;
  }

  /**
   * No description
   * @tags 内购商城用户端管理
   * @name OperateShoppingCartUsingPost1
   * @summary 操作购物车
   * @request POST:/api/luteos/product/mall/user/operateShoppingCart
   */
  export namespace OperateShoppingCartUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MallShopCartOperateReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = MallShopCartOperateResp;
  }

  /**
   * No description
   * @tags 内购商城用户端管理
   * @name PreTradeUsingGet1
   * @summary 测试生成二维码
   * @request GET:/api/luteos/product/mall/user/preTrade
   */
  export namespace PreTradeUsingGet1 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespString;
  }

  /**
   * No description
   * @tags 内购商城用户端管理
   * @name QueryCartCountUsingPost1
   * @summary 查询购物车清单数量
   * @request POST:/api/luteos/product/mall/user/queryCartCount
   */
  export namespace QueryCartCountUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = MallShopCartCountResp;
  }

  /**
   * No description
   * @tags 内购商城用户端管理
   * @name QueryProductClientListUsingPost1
   * @summary 查询商品首页列表
   * @request POST:/api/luteos/product/mall/user/queryProductList
   */
  export namespace QueryProductClientListUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MallProductClientListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = MallProductClientListResp;
  }

  /**
   * No description
   * @tags 内购商城用户端管理
   * @name QueryShoppingCartListUsingGet1
   * @summary 查询购物车列表
   * @request GET:/api/luteos/product/mall/user/queryShoppingCartList
   */
  export namespace QueryShoppingCartListUsingGet1 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = MallShopCartListResp;
  }

  /**
   * No description
   * @tags 内购商城用户端管理
   * @name SubmitOrderUsingPost1
   * @summary 提交订单
   * @request POST:/api/luteos/product/mall/user/submitOrder
   */
  export namespace SubmitOrderUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MallOrderSubmitReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = MallOrderSubmitResp;
  }

  /**
   * No description
   * @tags 型号管理
   * @name ConnectProductUsingPost6
   * @summary 型号关联商品
   * @request POST:/api/luteos/product/model/connectProduct
   */
  export namespace ConnectProductUsingPost6 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ModelProductConnectReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespString;
  }

  /**
   * No description
   * @tags 型号管理
   * @name ExportModelUsingPost1
   * @summary 型号信息导出
   * @request POST:/api/luteos/product/model/exportModel
   */
  export namespace ExportModelUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ModelListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonExportResp;
  }

  /**
   * No description
   * @tags 型号管理
   * @name OperateModelUsingPost3
   * @summary 型号操作
   * @request POST:/api/luteos/product/model/operateModel
   */
  export namespace OperateModelUsingPost3 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ModelOperateReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespString;
  }

  /**
   * No description
   * @tags 型号管理
   * @name QueryModelDetailUsingGet1
   * @summary 型号详情查询
   * @request GET:/api/luteos/product/model/queryModelDetail
   */
  export namespace QueryModelDetailUsingGet1 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = ModelDetailResp;
  }

  /**
   * No description
   * @tags 型号管理
   * @name QueryModelListUsingGet1
   * @summary 型号列表查询
   * @request GET:/api/luteos/product/model/queryModelList
   */
  export namespace QueryModelListUsingGet1 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = ModelListQueryResp;
  }

  /**
   * No description
   * @tags 型号管理
   * @name SaveOrUpdateModelUsingPost1
   * @summary 型号信息保存
   * @request POST:/api/luteos/product/model/saveOrUpdateModel
   */
  export namespace SaveOrUpdateModelUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ModelSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = ModelSaveResp;
  }

  /**
   * No description
   * @tags 在线商品跟卖监控
   * @name QueryChartDataUsingPost1
   * @summary 趋势图数据
   * @request POST:/api/luteos/product/monitor/queryChartData
   */
  export namespace QueryChartDataUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OnlineProductChartReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = OnlineProductChartResp;
  }

  /**
   * No description
   * @tags 在线商品跟卖监控
   * @name QueryListUsingPost38
   * @summary 列表查询
   * @request POST:/api/luteos/product/monitor/queryList
   */
  export namespace QueryListUsingPost38 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OnlineProductMonitorReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = OnlineProductMonitorResp;
  }

  /**
   * No description
   * @tags msrp管理
   * @name AddActiveUsingPost2
   * @summary 活动折扣计划表-SPU新增编辑
   * @request POST:/api/luteos/product/msrp/addActive
   */
  export namespace AddActiveUsingPost2 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ActiveDiscountPlanAddReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags msrp管理
   * @name AddSkuActiveUsingPost2
   * @summary 活动折扣计划表-SKU新增编辑
   * @request POST:/api/luteos/product/msrp/addSkuActive
   */
  export namespace AddSkuActiveUsingPost2 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SkuActiveDiscountPlanAddReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags msrp管理
   * @name ApproveActiveUsingPost2
   * @summary 活动折扣计划表-提交审批
   * @request POST:/api/luteos/product/msrp/approveActive
   */
  export namespace ApproveActiveUsingPost2 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DiscountPlanWeekApproveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags msrp管理
   * @name BatchAddActiveUsingPost2
   * @summary 活动折扣计划表-批量保存
   * @request POST:/api/luteos/product/msrp/batchAddActive
   */
  export namespace BatchAddActiveUsingPost2 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ActiveDiscountPlanBatchAddReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags msrp管理
   * @name BatchSaveUsingPost2
   * @summary msrp管理-批量编辑保存
   * @request POST:/api/luteos/product/msrp/batchSave
   */
  export namespace BatchSaveUsingPost2 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MsrpSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = MsrpBatchSaveResp;
  }

  /**
   * No description
   * @tags msrp定价测算管理
   * @name GetOnlinePromotionRateUsingGet2
   * @summary 定价测算-线上促销率查询
   * @request GET:/api/luteos/product/msrp/calculation/getOnlinePromotionRate
   */
  export namespace GetOnlinePromotionRateUsingGet2 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespMsrpOnlinePromotionResp;
  }

  /**
   * No description
   * @tags msrp定价测算管理
   * @name QueryAllEuSiteUsingGet2
   * @summary 定价测算-EU范围站点
   * @request GET:/api/luteos/product/msrp/calculation/queryAllEuSite
   */
  export namespace QueryAllEuSiteUsingGet2 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespListString;
  }

  /**
   * No description
   * @tags msrp定价测算管理
   * @name QueryCalculateBaseDataUsingPost2
   * @summary 定价测算-BI数据查询
   * @request POST:/api/luteos/product/msrp/calculation/queryCalculateBaseData
   */
  export namespace QueryCalculateBaseDataUsingPost2 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MsrpCalculateBaseReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespMsrpCalculateBaseDataResp;
  }

  /**
   * No description
   * @tags msrp定价测算管理
   * @name QueryChannelUsingGet2
   * @summary 定价测算-渠道下拉框
   * @request GET:/api/luteos/product/msrp/calculation/queryChannel
   */
  export namespace QueryChannelUsingGet2 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespListString;
  }

  /**
   * No description
   * @tags msrp定价测算管理
   * @name QueryCurrencyUsingGet2
   * @summary 定价测算-汇率查询
   * @request GET:/api/luteos/product/msrp/calculation/queryCurrency
   */
  export namespace QueryCurrencyUsingGet2 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespMapStringOdsFinanceCurrency;
  }

  /**
   * No description
   * @tags msrp定价测算管理
   * @name QueryDetailUsingPost8
   * @summary msrp定价测算-详情
   * @request POST:/api/luteos/product/msrp/calculation/queryDetail
   */
  export namespace QueryDetailUsingPost8 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespMsrpCalculatePriceDetailResp;
  }

  /**
   * No description
   * @tags msrp定价测算管理
   * @name QueryListUsingPost34
   * @summary msrp定价测算列表查询
   * @request POST:/api/luteos/product/msrp/calculation/queryList
   */
  export namespace QueryListUsingPost34 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MsrpQueryListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = MsrpCalculatePriceQueryListResp;
  }

  /**
   * No description
   * @tags msrp定价测算管理
   * @name SaveCalculateMsrpUsingPost2
   * @summary msrp定价测算-新增
   * @request POST:/api/luteos/product/msrp/calculation/save
   */
  export namespace SaveCalculateMsrpUsingPost2 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MsrpCalculatePriceDetailSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags msrp定价测算管理
   * @name SubmitCalculateMsrpUsingPost2
   * @summary msrp定价测算-确定
   * @request POST:/api/luteos/product/msrp/calculation/submit
   */
  export namespace SubmitCalculateMsrpUsingPost2 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags msrp管理
   * @name CancelApproveActiveUsingPost2
   * @summary 活动折扣计划表-撤销审批
   * @request POST:/api/luteos/product/msrp/cancelApproveActive
   */
  export namespace CancelApproveActiveUsingPost2 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DiscountPlanWeekCancelReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags msrp管理
   * @name DeleteSkuDetailUsingPost2
   * @summary msrp管理-删除sku
   * @request POST:/api/luteos/product/msrp/deleteSkuDetail
   */
  export namespace DeleteSkuDetailUsingPost2 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MsrpSpuDetailReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespVoid;
  }

  /**
   * No description
   * @tags msrp管理
   * @name EditActiveUsingPost2
   * @summary 活动折扣计划表-点击触笔进入编辑
   * @request POST:/api/luteos/product/msrp/editActive
   */
  export namespace EditActiveUsingPost2 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DiscountPlanWeekEditReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags msrp管理
   * @name ExportMsrpUsingPost2
   * @summary MSRP管理导出
   * @request POST:/api/luteos/product/msrp/exportMsrp
   */
  export namespace ExportMsrpUsingPost2 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MsrpQueryListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonExportResp;
  }

  /**
   * No description
   * @tags msrp管理
   * @name QueryApproveLogUsingGet2
   * @summary 活动折扣计划表-审批记录
   * @request GET:/api/luteos/product/msrp/queryApproveLog
   */
  export namespace QueryApproveLogUsingGet2 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = WeekApproveLogResp;
  }

  /**
   * No description
   * @tags msrp管理
   * @name QueryBatchActiveUsingPost2
   * @summary 活动折扣计划表-批量编辑查询
   * @request POST:/api/luteos/product/msrp/queryBatchActive
   */
  export namespace QueryBatchActiveUsingPost2 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ActiveDiscountPlanBatchEditQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = ActiveDiscountPlanBatchEditQueryResp;
  }

  /**
   * No description
   * @tags msrp管理
   * @name QueryBatchEditListUsingPost2
   * @summary msrp管理-批量编辑查询
   * @request POST:/api/luteos/product/msrp/queryBatchEditList
   */
  export namespace QueryBatchEditListUsingPost2 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MsrpBatchQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespMsrpQueryChannelBatchListResp;
  }

  /**
   * No description
   * @tags msrp管理
   * @name QueryEditActiveUsingGet2
   * @summary 活动折扣计划表-SPU列表编辑查询&详情查询
   * @request GET:/api/luteos/product/msrp/queryEditActive
   */
  export namespace QueryEditActiveUsingGet2 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = ActiveDiscountPlanAddQueryResp;
  }

  /**
   * No description
   * @tags msrp管理
   * @name QueryListUsingPost35
   * @summary msrp列表查询
   * @request POST:/api/luteos/product/msrp/queryList
   */
  export namespace QueryListUsingPost35 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MsrpQueryListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = MsrpQueryListResp;
  }

  /**
   * No description
   * @tags msrp管理
   * @name QueryOneSkuDetailUsingGet2
   * @summary msrp管理-查询sku详情
   * @request GET:/api/luteos/product/msrp/queryOneSkuDetail
   */
  export namespace QueryOneSkuDetailUsingGet2 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespMsrpSkuDetailBean;
  }

  /**
   * No description
   * @tags msrp管理
   * @name QueryOneSpuDetailUsingGet2
   * @summary msrp管理-促销查spu详情
   * @request GET:/api/luteos/product/msrp/queryOneSpuDetail
   */
  export namespace QueryOneSpuDetailUsingGet2 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespMsrpSpuDetailResp;
  }

  /**
   * No description
   * @tags msrp管理
   * @name QueryOperatorBySpuAndCountryAndChannelUsingGet2
   * @summary 根据spu,国家，渠道获取运营人员
   * @request GET:/api/luteos/product/msrp/queryOperatorBySpuAndCountryAndChannel
   */
  export namespace QueryOperatorBySpuAndCountryAndChannelUsingGet2 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespOperatorQueryResp;
  }

  /**
   * No description
   * @tags msrp管理
   * @name QueryPlanListUsingPost2
   * @summary 活动折扣计划表-列表查询
   * @request POST:/api/luteos/product/msrp/queryPlanList
   */
  export namespace QueryPlanListUsingPost2 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ActiveDiscountPlanReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = ActiveDiscountPlanListResp;
  }

  /**
   * No description
   * @tags msrp管理
   * @name QueryRelationLogUsingGet3
   * @summary msrp日志详情查询
   * @request GET:/api/luteos/product/msrp/queryRelationLog
   */
  export namespace QueryRelationLogUsingGet3 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = SaleSkuLogDetailQueryResp;
  }

  /**
   * No description
   * @tags msrp管理
   * @name QuerySkuDetailUsingPost2
   * @summary msrp管理-查询sku详情
   * @request POST:/api/luteos/product/msrp/querySkuDetail
   */
  export namespace QuerySkuDetailUsingPost2 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MsrpSpuDetailReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespMsrpSkuDetailResp;
  }

  /**
   * No description
   * @tags msrp管理
   * @name QuerySkuEditActiveUsingGet2
   * @summary 活动折扣计划表-SKU列表编辑查询&详情查询
   * @request GET:/api/luteos/product/msrp/querySkuEditActive
   */
  export namespace QuerySkuEditActiveUsingGet2 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = SkuActiveDiscountPlanQueryResp;
  }

  /**
   * No description
   * @tags msrp管理
   * @name QuerySkuListUsingPost2
   * @summary msrp管理新增-查询
   * @request POST:/api/luteos/product/msrp/querySkuList
   */
  export namespace QuerySkuListUsingPost2 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MsrpSkuListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = MsrpQueryChannelListResp;
  }

  /**
   * No description
   * @tags msrp管理
   * @name QuerySpuDetailUsingPost2
   * @summary msrp管理-查询spu详情
   * @request POST:/api/luteos/product/msrp/querySpuDetail
   */
  export namespace QuerySpuDetailUsingPost2 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MsrpSpuDetailReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespMsrpSpuDetailResp;
  }

  /**
   * No description
   * @tags msrp管理
   * @name SaveMsrpUsingPost2
   * @summary msrp管理-新增
   * @request POST:/api/luteos/product/msrp/save
   */
  export namespace SaveMsrpUsingPost2 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MsrpSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags msrp管理
   * @name SaveSkuUsingPost3
   * @summary msrp管理-sku编辑
   * @request POST:/api/luteos/product/msrp/saveSku
   */
  export namespace SaveSkuUsingPost3 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MsrpSaveSkuReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = MsrpSaveSkuResp;
  }

  /**
   * No description
   * @tags msrp管理
   * @name SaveSpuUsingPost2
   * @summary msrp管理-spu编辑
   * @request POST:/api/luteos/product/msrp/saveSpu
   */
  export namespace SaveSpuUsingPost2 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MsrpSaveSpuReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = MsrpSaveSpuResp;
  }

  /**
   * No description
   * @tags 多平台价格监控
   * @name QueryListUsingPost36
   * @summary 多平台价格列表查询
   * @request POST:/api/luteos/product/multi-price/queryList
   */
  export namespace QueryListUsingPost36 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MultiPriceQueryListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespMultiPriceQueryListResp;
  }

  /**
   * No description
   * @tags 多平台价格监控
   * @name QueryPriceDetailUsingGet1
   * @summary 查询价格详情
   * @request GET:/api/luteos/product/multi-price/queryPriceDetail
   */
  export namespace QueryPriceDetailUsingGet1 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespListMultiPriceDetailResp;
  }

  /**
   * No description
   * @tags 线下渠道-在线商品
   * @name QueryProductListingPageUsingPost6
   * @summary 线下渠道-在线商品分页查询-V2
   * @request POST:/api/luteos/product/offline/listing/queryProductListingPage
   */
  export namespace QueryProductListingPageUsingPost6 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OfflineListingProductReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = OfflineProductListingResp;
  }

  /**
   * No description
   * @tags 商品SKU新旧产品映射管理
   * @name ExportUsingPost12
   * @summary 导出
   * @request POST:/api/luteos/product/oldNewMapping/export
   */
  export namespace ExportUsingPost12 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductSkuOldNewListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonExportResp;
  }

  /**
   * No description
   * @tags 商品SKU新旧产品映射管理
   * @name QueryListUsingGet7
   * @summary 列表查询
   * @request GET:/api/luteos/product/oldNewMapping/queryList
   */
  export namespace QueryListUsingGet7 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = ProductSkuOldNewMappingResp;
  }

  /**
   * No description
   * @tags 商品SKU新旧产品映射管理
   * @name SaveOrUpdateSkuOldNewUsingPost1
   * @summary 商品sku新旧保存
   * @request POST:/api/luteos/product/oldNewMapping/saveOrUpdate
   */
  export namespace SaveOrUpdateSkuOldNewUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductSkuOldNewSaveOrUpdReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespString;
  }

  /**
   * No description
   * @tags 新平台-在线商品
   * @name ExportUsingGet1
   * @summary 导出
   * @request GET:/api/luteos/product/online/export
   */
  export namespace ExportUsingGet1 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonExportResp;
  }

  /**
   * No description
   * @tags 新平台-在线商品
   * @name QueryListingTagUsingPost7
   * @summary 标签查询
   * @request POST:/api/luteos/product/online/listing/queryTag
   */
  export namespace QueryListingTagUsingPost7 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ListingQueryTagReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = ListingTagResp;
  }

  /**
   * No description
   * @tags 新平台-在线商品
   * @name QueryListUsingPost37
   * @summary 列表查询
   * @request POST:/api/luteos/product/online/queryList
   */
  export namespace QueryListUsingPost37 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OnlineProductQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = OnlineProductQueryResp;
  }

  /**
   * No description
   * @tags 新平台-在线商品
   * @name SaveUsingPost19
   * @summary 保存在线商品
   * @request POST:/api/luteos/product/online/save
   */
  export namespace SaveUsingPost19 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OnlineProductSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags 新平台-在线商品
   * @name SaveOperatorUsingPost5
   * @summary 保存运营人员
   * @request POST:/api/luteos/product/online/saveOperator
   */
  export namespace SaveOperatorUsingPost5 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OperatorSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags 新平台-在线商品
   * @name SaveProductLinkUsingPost5
   * @summary 保存商品链接
   * @request POST:/api/luteos/product/online/saveProductLink
   */
  export namespace SaveProductLinkUsingPost5 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductLinkSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags 新平台-在线商品
   * @name SaveTagUsingPost1
   * @summary 保存标签
   * @request POST:/api/luteos/product/online/saveTag
   */
  export namespace SaveTagUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ListingBatchModifyTagReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags 商品管理
   * @name OperateProductUsingPost3
   * @summary 商品信息操作
   * @request POST:/api/luteos/product/operateProduct
   */
  export namespace OperateProductUsingPost3 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductOperateReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespBoolean;
  }

  /**
   * No description
   * @tags 在线商品-产品表现
   * @name QueryPerformanceUsingPost1
   * @summary 在线商品-商品表现-V2
   * @request POST:/api/luteos/product/performance/queryPerformance
   */
  export namespace QueryPerformanceUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PerformanceProductReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = WalmartProductListingResp;
  }

  /**
   * No description
   * @tags 产品表现
   * @name QuerySkuListUsingGet3
   * @summary SKU列表查询
   * @request GET:/api/luteos/product/performance/querySkuList
   */
  export namespace QuerySkuListUsingGet3 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = ProductPerformanceResp;
  }

  /**
   * No description
   * @tags 产品表现
   * @name QuerySkuPerformanceUsingGet1
   * @summary SKU产品表现
   * @request GET:/api/luteos/product/performance/querySkuPerformance
   */
  export namespace QuerySkuPerformanceUsingGet1 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = ProductPerformanceDetailResp;
  }

  /**
   * No description
   * @tags 促销计划
   * @name ApplyListUsingPost1
   * @summary 促销计划申请列表
   * @request POST:/api/luteos/product/promotion-plan/applyList
   */
  export namespace ApplyListUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PromotionPlanListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = PromotionPlanApplyListResp;
  }

  /**
   * No description
   * @tags 促销计划
   * @name CreateUsingPost1
   * @summary 促销计划-新增
   * @request POST:/api/luteos/product/promotion-plan/create
   */
  export namespace CreateUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PromotionPlanCreateReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespVoid;
  }

  /**
   * No description
   * @tags 促销计划
   * @name CreateCheckUsingPost1
   * @summary 促销计划-新增校验
   * @request POST:/api/luteos/product/promotion-plan/createCheck
   */
  export namespace CreateCheckUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PromotionPlanCreateReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespPlanCreateCheckResp;
  }

  /**
   * No description
   * @tags 促销计划
   * @name DeleteUsingPost8
   * @summary 促销计划-删除
   * @request POST:/api/luteos/product/promotion-plan/delete
   */
  export namespace DeleteUsingPost8 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespPromotionPlanDeleteResp;
  }

  /**
   * No description
   * @tags 促销计划
   * @name DetailUsingGet6
   * @summary 促销计划-详情
   * @request GET:/api/luteos/product/promotion-plan/detail
   */
  export namespace DetailUsingGet6 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespPromotionPlanDetailResp;
  }

  /**
   * No description
   * @tags 促销计划
   * @name ExportPromotionPlanUsingPost1
   * @summary 促销计划导出
   * @request POST:/api/luteos/product/promotion-plan/exportPromotionPlan
   */
  export namespace ExportPromotionPlanUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PromotionPlanListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonExportResp;
  }

  /**
   * No description
   * @tags 促销计划
   * @name GetAddActivityDetailUsingGet1
   * @summary 添加活动详情列表
   * @request GET:/api/luteos/product/promotion-plan/getAddActivityDetail
   */
  export namespace GetAddActivityDetailUsingGet1 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespAddActivityDetailResp;
  }

  /**
   * No description
   * @tags 促销计划
   * @name ListBySkuUsingPost1
   * @summary 促销计划-SKU维度分页列表
   * @request POST:/api/luteos/product/promotion-plan/listBySku
   */
  export namespace ListBySkuUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PromotionPlanListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = PromotionPlanListQuerySkuResp;
  }

  /**
   * No description
   * @tags 促销计划
   * @name ListBySpuUsingPost1
   * @summary 促销计划-SPU维度分页列表
   * @request POST:/api/luteos/product/promotion-plan/listBySpu
   */
  export namespace ListBySpuUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PromotionPlanListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = PromotionPlanListQuerySpuResp;
  }

  /**
   * No description
   * @tags 促销计划
   * @name QuerySkuListUsingGet4
   * @summary 查询sku列表
   * @request GET:/api/luteos/product/promotion-plan/querySkuList
   */
  export namespace QuerySkuListUsingGet4 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespMsrpSkuListResp;
  }

  /**
   * No description
   * @tags 促销计划
   * @name QuerySpuListUsingGet1
   * @summary 查询spu列表
   * @request GET:/api/luteos/product/promotion-plan/querySpuList
   */
  export namespace QuerySpuListUsingGet1 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespProductListQueryResp;
  }

  /**
   * No description
   * @tags 促销计划
   * @name ReviewUsingPost1
   * @summary 促销计划-审核
   * @request POST:/api/luteos/product/promotion-plan/review
   */
  export namespace ReviewUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PromotionPlanReviewReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespVoid;
  }

  /**
   * No description
   * @tags 促销计划
   * @name ReviewListUsingPost1
   * @summary 促销计划-审核列表
   * @request POST:/api/luteos/product/promotion-plan/reviewList
   */
  export namespace ReviewListUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PromotionPlanReviewListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespPromotionPlanReviewListResp;
  }

  /**
   * No description
   * @tags 促销计划
   * @name UpdateUsingPost9
   * @summary 促销计划-更新
   * @request POST:/api/luteos/product/promotion-plan/update
   */
  export namespace UpdateUsingPost9 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PromotionPlanCreateReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespVoid;
  }

  /**
   * No description
   * @tags 商品管理
   * @name QueryDetailUsingGet9
   * @summary 商品详情查询
   * @request GET:/api/luteos/product/queryDetail
   */
  export namespace QueryDetailUsingGet9 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = ProductDetailQueryResp;
  }

  /**
   * No description
   * @tags 商品管理
   * @name QueryOperatorListUsingGet4
   * @summary 获取采购员列表
   * @request GET:/api/luteos/product/queryOperatorList
   */
  export namespace QueryOperatorListUsingGet4 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = PurchaseOperatorQueryResp;
  }

  /**
   * No description
   * @tags 商品管理
   * @name QueryPlatfromSkuIdentifyUsingGet1
   * @summary 原平台标识查询
   * @request GET:/api/luteos/product/queryPlatfromSkuIdentify
   */
  export namespace QueryPlatfromSkuIdentifyUsingGet1 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespListString;
  }

  /**
   * No description
   * @tags 商品管理
   * @name QueryProductPerfectionUsingGet1
   * @summary 获取商品列表信息完善度
   * @request GET:/api/luteos/product/queryProduct/perfection
   */
  export namespace QueryProductPerfectionUsingGet1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = ProductPerfectionQueryResp;
  }

  /**
   * No description
   * @tags 商品管理
   * @name QueryProductAllModelListUsingPost1
   * @summary 产品型号列表查询
   * @request POST:/api/luteos/product/queryProductAllModelList
   */
  export namespace QueryProductAllModelListUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespString;
  }

  /**
   * No description
   * @tags 商品管理
   * @name QueryProductByCategoryUsingPost1
   * @summary 根据分类查询商品
   * @request POST:/api/luteos/product/queryProductByCategory
   */
  export namespace QueryProductByCategoryUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductCategoryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = ProductCategoryResp;
  }

  /**
   * No description
   * @tags 商品管理
   * @name QueryProductInfoUsingGet1
   * @summary 商品信息查询
   * @request GET:/api/luteos/product/queryProductInfo
   */
  export namespace QueryProductInfoUsingGet1 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = ProductInfoResp;
  }

  /**
   * No description
   * @tags 商品管理
   * @name QueryProductListUsingGet3
   * @summary 商品列表查询
   * @request GET:/api/luteos/product/queryProductList
   */
  export namespace QueryProductListUsingGet3 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = ProductListQueryResp;
  }

  /**
   * No description
   * @tags 商品管理
   * @name QueryProductRelationListUsingGet1
   * @summary 商品关联信息列表查询
   * @request GET:/api/luteos/product/queryProductRelationList
   */
  export namespace QueryProductRelationListUsingGet1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = ProductRelationListResp;
  }

  /**
   * No description
   * @tags 商品管理
   * @name QuerySupplySkuUsingGet1
   * @summary 供应链SKU查询
   * @request GET:/api/luteos/product/querySupplySku
   */
  export namespace QuerySupplySkuUsingGet1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespListString;
  }

  /**
   * No description
   * @tags 批量删除, 竞品监控
   * @name BatchDeletedUsingPost5
   * @summary 批量删除
   * @request POST:/api/luteos/product/rankingList/batchDeleted
   */
  export namespace BatchDeletedUsingPost5 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AmazonRankingListBatchOperationReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespString;
  }

  /**
   * No description
   * @tags 批量编辑, 竞品监控
   * @name BatchOperationUsingPost1
   * @summary 批量编辑
   * @request POST:/api/luteos/product/rankingList/batchOperation
   */
  export namespace BatchOperationUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AmazonRankingListBatchOperationReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespString;
  }

  /**
   * No description
   * @tags 竞品监控
   * @name DownTemplateUsingPost3
   * @summary 下载-竞品监控导入模板
   * @request POST:/api/luteos/product/rankingList/downTemplate
   */
  export namespace DownTemplateUsingPost3 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespString;
  }

  /**
   * No description
   * @tags 竞品监控, 编辑
   * @name OperationUsingPost1
   * @summary 编辑运营/组长/备注
   * @request POST:/api/luteos/product/rankingList/operation
   */
  export namespace OperationUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AmazonRankingListOperationReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespString;
  }

  /**
   * No description
   * @tags 竞品监控
   * @name QueryListUsingPost33
   * @summary 竞品监控列表查询
   * @request POST:/api/luteos/product/rankingList/queryList
   */
  export namespace QueryListUsingPost33 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AmazonRankingListQueryListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespAmazonRankingListQueryListResp;
  }

  /**
   * No description
   * @tags 竞品监控
   * @name SaveUsingPost18
   * @summary 新增/编辑
   * @request POST:/api/luteos/product/rankingList/save
   */
  export namespace SaveUsingPost18 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AmazonRankingListSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespVoid;
  }

  /**
   * No description
   * @tags 商品管理
   * @name RemoveProductUsingGet1
   * @summary 删除商品
   * @request GET:/api/luteos/product/removeProduct
   */
  export namespace RemoveProductUsingGet1 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespBoolean;
  }

  /**
   * No description
   * @tags 销售映射管理
   * @name ExportSaleSkuUsingPost1
   * @summary 导出销售映射
   * @request POST:/api/luteos/product/saleSku/exportSaleSku
   */
  export namespace ExportSaleSkuUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SaleSkuQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonExportResp;
  }

  /**
   * No description
   * @tags 销售映射管理
   * @name QueryDictSalesChannelListUsingPost1
   * @summary 查询销售渠道字典表
   * @request POST:/api/luteos/product/saleSku/queryDictSalesChannelList
   */
  export namespace QueryDictSalesChannelListUsingPost1 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = DictSalesChannelResp;
  }

  /**
   * No description
   * @tags 销售映射管理
   * @name QueryLuteChannelListUsingPost1
   * @summary 查询路特筛选条件
   * @request POST:/api/luteos/product/saleSku/queryLuteChannelList
   */
  export namespace QueryLuteChannelListUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = LuteConditionResp;
  }

  /**
   * No description
   * @tags 销售映射管理
   * @name QueryRelationLogUsingGet4
   * @summary 日志详情查询
   * @request GET:/api/luteos/product/saleSku/queryRelationLog
   */
  export namespace QueryRelationLogUsingGet4 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = SaleSkuLogDetailQueryResp;
  }

  /**
   * No description
   * @tags 销售映射管理
   * @name QuerySaleSkuDetailUsingGet1
   * @summary 销售映射详情查询
   * @request GET:/api/luteos/product/saleSku/querySaleSkuDetail
   */
  export namespace QuerySaleSkuDetailUsingGet1 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = SaleSkuDetailQueryResp;
  }

  /**
   * No description
   * @tags 销售映射管理
   * @name QuerySaleSkuListUsingGet1
   * @summary 销售映射列表查询
   * @request GET:/api/luteos/product/saleSku/querySaleSkuList
   */
  export namespace QuerySaleSkuListUsingGet1 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = SaleSkuQueryResp;
  }

  /**
   * No description
   * @tags 销售映射管理
   * @name QuerySourceUsingGet1
   * @summary 获取数据来源
   * @request GET:/api/luteos/product/saleSku/querySource
   */
  export namespace QuerySourceUsingGet1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = SaleSkuSourcelQueryResp;
  }

  /**
   * No description
   * @tags 销售映射管理
   * @name RemoveSaleSkuRelationUsingPost1
   * @summary 删除销售映射关系
   * @request POST:/api/luteos/product/saleSku/removeSaleSkuRelation
   */
  export namespace RemoveSaleSkuRelationUsingPost1 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespBoolean;
  }

  /**
   * No description
   * @tags 销售映射管理
   * @name SaveSaleSkuRelationUsingPost1
   * @summary 保存销售映射关系
   * @request POST:/api/luteos/product/saleSku/saveSaleSkuRelation
   */
  export namespace SaveSaleSkuRelationUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SaleSkuSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = SaleSkuSaveResp;
  }

  /**
   * No description
   * @tags 销售映射缺失管理
   * @name ExportSaleSkuRelationMissUsingPost1
   * @summary 导出销售映射缺失
   * @request POST:/api/luteos/product/saleSkuRelationMiss/export
   */
  export namespace ExportSaleSkuRelationMissUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SaleSkuRelationMissQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonExportResp;
  }

  /**
   * No description
   * @tags 销售映射缺失管理
   * @name QuerySaleSkuRelationMissListUsingGet1
   * @summary 销售映射缺失列表查询
   * @request GET:/api/luteos/product/saleSkuRelationMiss/queryList
   */
  export namespace QuerySaleSkuRelationMissListUsingGet1 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = SaleSkuRelationMissQueryResp;
  }

  /**
   * No description
   * @tags 商品管理
   * @name SaveProductUsingPost3
   * @summary 商品信息保存
   * @request POST:/api/luteos/product/saveProduct
   */
  export namespace SaveProductUsingPost3 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = _;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = ProductSaveResp;
  }

  /**
   * No description
   * @tags RPA在线商品
   * @name ExportSellerSkuUnusualListUsingGet1
   * @summary 导出销售异常
   * @request GET:/api/luteos/product/seller/sku/exportSellerSkuUnusualList
   */
  export namespace ExportSellerSkuUnusualListUsingGet1 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonExportResp;
  }

  /**
   * No description
   * @tags RPA在线商品
   * @name OperateSellerSkuStatusUsingGet1
   * @summary 变更商品提醒状态
   * @request GET:/api/luteos/product/seller/sku/operateSellerSkuStatus
   */
  export namespace OperateSellerSkuStatusUsingGet1 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags RPA在线商品
   * @name QuerySellerSkuUnusualListUsingGet1
   * @summary 查询销售异常
   * @request GET:/api/luteos/product/seller/sku/querySellerSkuUnusualList
   */
  export namespace QuerySellerSkuUnusualListUsingGet1 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = ProductSellerSkuQueryResp;
  }

  /**
   * No description
   * @tags 敏感类型管理
   * @name ConnectProductUsingPost7
   * @summary 敏感类型关联商品
   * @request POST:/api/luteos/product/sensitiveType/connectProduct
   */
  export namespace ConnectProductUsingPost7 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SensitiveTypeProductConnectReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespString;
  }

  /**
   * No description
   * @tags 敏感类型管理
   * @name ExportSensitiveTypeUsingPost1
   * @summary 敏感类型信息导出
   * @request POST:/api/luteos/product/sensitiveType/exportSensitiveType
   */
  export namespace ExportSensitiveTypeUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SensitiveTypeListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonExportResp;
  }

  /**
   * No description
   * @tags 敏感类型管理
   * @name OperateSensitiveTypeUsingPost1
   * @summary 敏感类型操作
   * @request POST:/api/luteos/product/sensitiveType/operateSensitiveType
   */
  export namespace OperateSensitiveTypeUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SensitiveTypeOperateReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespString;
  }

  /**
   * No description
   * @tags 敏感类型管理
   * @name QuerySensitiveTypeDetailUsingGet1
   * @summary 敏感类型详情查询
   * @request GET:/api/luteos/product/sensitiveType/querySensitiveTypeDetail
   */
  export namespace QuerySensitiveTypeDetailUsingGet1 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = SensitiveTypeDetailResp;
  }

  /**
   * No description
   * @tags 敏感类型管理
   * @name QuerySensitiveTypeListUsingGet1
   * @summary 敏感类型列表查询
   * @request GET:/api/luteos/product/sensitiveType/querySensitiveTypeList
   */
  export namespace QuerySensitiveTypeListUsingGet1 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = SensitiveTypeListQueryResp;
  }

  /**
   * No description
   * @tags 敏感类型管理
   * @name SaveOrUpdateSensitiveTypeUsingPost1
   * @summary 敏感类型信息保存
   * @request POST:/api/luteos/product/sensitiveType/saveOrUpdateSensitiveType
   */
  export namespace SaveOrUpdateSensitiveTypeUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SensitiveTypeSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = SensitiveTypeSaveResp;
  }

  /**
   * No description
   * @tags 系列管理
   * @name ConnectProductUsingPost8
   * @summary 系列关联商品
   * @request POST:/api/luteos/product/series/connectProduct
   */
  export namespace ConnectProductUsingPost8 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SeriesProductConnectReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespString;
  }

  /**
   * No description
   * @tags 系列管理
   * @name ExportSeriesUsingPost1
   * @summary 系列信息导出
   * @request POST:/api/luteos/product/series/exportSeries
   */
  export namespace ExportSeriesUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SeriesListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonExportResp;
  }

  /**
   * No description
   * @tags 系列管理
   * @name OperateSeriesUsingPost1
   * @summary 系列操作
   * @request POST:/api/luteos/product/series/operateSeries
   */
  export namespace OperateSeriesUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SeriesOperateReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespString;
  }

  /**
   * No description
   * @tags 系列管理
   * @name QuerySeriesDetailUsingGet1
   * @summary 系列详情查询
   * @request GET:/api/luteos/product/series/querySeriesDetail
   */
  export namespace QuerySeriesDetailUsingGet1 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = SeriesDetailResp;
  }

  /**
   * No description
   * @tags 系列管理
   * @name QuerySeriesListUsingGet1
   * @summary 系列列表查询
   * @request GET:/api/luteos/product/series/querySeriesList
   */
  export namespace QuerySeriesListUsingGet1 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = SeriesListQueryResp;
  }

  /**
   * No description
   * @tags 系列管理
   * @name SaveOrUpdateSeriesUsingPost1
   * @summary 系列信息保存
   * @request POST:/api/luteos/product/series/saveOrUpdateSeries
   */
  export namespace SaveOrUpdateSeriesUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SeriesSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = SeriesSaveResp;
  }

  /**
   * No description
   * @tags 商品管理
   * @name ShadowSearchUsingPost1
   * @summary 产品影子查询
   * @request POST:/api/luteos/product/shadowSearch
   */
  export namespace ShadowSearchUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductShadowSearchReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespProductShadowSearchResp;
  }

  /**
   * No description
   * @tags 商品管理
   * @name ShadowSearchStatisticsDetailUsingPost1
   * @summary 产品影子统计信息详情
   * @request POST:/api/luteos/product/shadowSearchStatisticsDetail
   */
  export namespace ShadowSearchStatisticsDetailUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductShadowDetailStaticsSearchReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespProductShadowDetailStatisticsResp;
  }

  /**
   * No description
   * @tags 独立站在线商品
   * @name BatchModifyPlanUsingPost3
   * @summary 独立站-在线商父ASIN批量添加/更新计划人员
   * @request POST:/api/luteos/product/shopify/listing/batchModifyPlan
   * @deprecated
   */
  export namespace BatchModifyPlanUsingPost3 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ListingBatchModifyPlanReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags 独立站在线商品
   * @name BatchSaveOperatorUsingPost1
   * @summary 独立站-批量保存运营人员
   * @request POST:/api/luteos/product/shopify/listing/batchSaveOperator
   */
  export namespace BatchSaveOperatorUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ShopifyBatchOperatorSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags 独立站在线商品
   * @name DownloadUsingPost13
   * @summary 独立站-在线商品导出-V2
   * @request POST:/api/luteos/product/shopify/listing/download
   */
  export namespace DownloadUsingPost13 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ShopifyProductListingReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonExportResp;
  }

  /**
   * No description
   * @tags 独立站在线商品
   * @name DownloadUsingPost12
   * @summary 独立站父子维度导出
   * @request POST:/api/luteos/product/shopify/listing/listing/download
   * @deprecated
   */
  export namespace DownloadUsingPost12 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ShopifyListingReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonExportResp;
  }

  /**
   * No description
   * @tags 独立站在线商品
   * @name QueryListingTagUsingPost8
   * @summary 亚马逊在线商品父维度标签查询
   * @request POST:/api/luteos/product/shopify/listing/listing/queryTag
   * @deprecated
   */
  export namespace QueryListingTagUsingPost8 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ListingQueryTagReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = ListingTagResp;
  }

  /**
   * No description
   * @tags 独立站在线商品
   * @name UpdateTagUsingPost7
   * @summary 独立站商品父子维度标签保存更新
   * @request POST:/api/luteos/product/shopify/listing/listing/updateTag
   * @deprecated
   */
  export namespace UpdateTagUsingPost7 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ListingBatchModifyTagReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags 独立站在线商品
   * @name QueryParentProductIdPageUsingPost1
   * @summary 独立站-在线商品ProductId分页查询
   * @request POST:/api/luteos/product/shopify/listing/queryParentProductIdPage
   * @deprecated
   */
  export namespace QueryParentProductIdPageUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ShopifyListingReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = ShopifyListingParentResp;
  }

  /**
   * No description
   * @tags 独立站在线商品
   * @name QueryProductListingPageUsingPost7
   * @summary 独立站-在线商品分页查询-V2
   * @request POST:/api/luteos/product/shopify/listing/queryProductListingPage
   */
  export namespace QueryProductListingPageUsingPost7 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ShopifyProductListingReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = ShopifyProductListingResp;
  }

  /**
   * No description
   * @tags 独立站在线商品
   * @name QuerySonVariantIdPageUsingPost1
   * @summary 独立站-在线商品子维度分页查询
   * @request POST:/api/luteos/product/shopify/listing/querySonVariantIdPage
   * @deprecated
   */
  export namespace QuerySonVariantIdPageUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ShopifyListingReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = ShopifySonListingResp;
  }

  /**
   * No description
   * @tags 独立站在线商品
   * @name SaveOperatorUsingPost6
   * @summary 独立站-在线商品保存运营人员
   * @request POST:/api/luteos/product/shopify/listing/saveOperator
   */
  export namespace SaveOperatorUsingPost6 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ShopifyOperatorSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags 独立站在线商品
   * @name SaveProductLinkUsingPost6
   * @summary 独立站-在线商品保存商品链接
   * @request POST:/api/luteos/product/shopify/listing/saveProductLink
   * @deprecated
   */
  export namespace SaveProductLinkUsingPost6 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductLinkSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags 独立站在线商品
   * @name SyncShopifyListingInventoryChangeNoticeJobUsingPost1
   * @summary 独立站-SKU库存到货通知-发钉钉消息测试接口
   * @request POST:/api/luteos/product/shopify/listing/syncShopifyListingInventoryChangeNoticeJob
   */
  export namespace SyncShopifyListingInventoryChangeNoticeJobUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags 独立站在线商品
   * @name SyncShopifyListingNoInventoryRecordJobUsingPost1
   * @summary 独立站-SKU库存到货通知-记录SKU零库存测试接口
   * @request POST:/api/luteos/product/shopify/listing/syncShopifyListingNoInventoryRecordJob
   */
  export namespace SyncShopifyListingNoInventoryRecordJobUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags 商品管理
   * @name ShowSearchUsingPost1
   * @summary 产品表现查询
   * @request POST:/api/luteos/product/showSearch
   */
  export namespace ShowSearchUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductShowSearchReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespProductShowSearchResp;
  }

  /**
   * No description
   * @tags 商品管理
   * @name ShowSearchDetailUsingPost1
   * @summary 产品表现详情
   * @request POST:/api/luteos/product/showSearchDetail
   */
  export namespace ShowSearchDetailUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductShowDetailSearchReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespProductShowDetailSearchResp;
  }

  /**
   * No description
   * @tags 商品管理
   * @name ShowSearchStatisticsDetailUsingPost1
   * @summary 产品表现统计信息详情
   * @request POST:/api/luteos/product/showSearchStatisticsDetail
   */
  export namespace ShowSearchStatisticsDetailUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductShowDetailStaticsSearchReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespProductShowDetailStatisticsResp;
  }

  /**
   * No description
   * @tags 商品SKU管理
   * @name BatchOperateUsingPost1
   * @summary 商品sku批量操作
   * @request POST:/api/luteos/product/sku/batchOperate
   */
  export namespace BatchOperateUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductSkuBatchOpeReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespBoolean;
  }

  /**
   * No description
   * @tags 店铺SKU管理
   * @name ExportPlatformSkuUsingPost1
   * @summary 导出店铺SKU
   * @request POST:/api/luteos/product/sku/exportPlatformSku
   */
  export namespace ExportPlatformSkuUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags 商品SKU管理
   * @name ExportProductUsingPost6
   * @summary 商品Sku导出信息
   * @request POST:/api/luteos/product/sku/exportProduct
   */
  export namespace ExportProductUsingPost6 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductSkuListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonExportResp;
  }

  /**
   * No description
   * @tags 商品SKU管理
   * @name ExportProductSkuCertificationUsingPost1
   * @summary 商品Sku证信息导出
   * @request POST:/api/luteos/product/sku/exportProductSkuCertification
   */
  export namespace ExportProductSkuCertificationUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductSkuCertificationListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonExportResp;
  }

  /**
   * No description
   * @tags 商品映射
   * @name ClearUsingPost1
   * @summary 清除映射
   * @request POST:/api/luteos/product/sku/mapping/clear
   */
  export namespace ClearUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductSkuMappingClearReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespVoid;
  }

  /**
   * No description
   * @tags 商品映射
   * @name ExportListUsingPost3
   * @summary 导出列表
   * @request POST:/api/luteos/product/sku/mapping/exportList
   */
  export namespace ExportListUsingPost3 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductSkuMappingQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespCommonExportResp;
  }

  /**
   * No description
   * @tags 商品映射
   * @name QueryListUsingPost41
   * @summary 列表查询
   * @request POST:/api/luteos/product/sku/mapping/queryList
   */
  export namespace QueryListUsingPost41 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductSkuMappingQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespProductSkuMappingQueryResp;
  }

  /**
   * No description
   * @tags 商品映射
   * @name UpdateUsingPost8
   * @summary 编辑
   * @request POST:/api/luteos/product/sku/mapping/update
   */
  export namespace UpdateUsingPost8 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductSkuMappingUpdateReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespVoid;
  }

  /**
   * No description
   * @tags 商品SKU管理
   * @name ProductSkuCertificationSyncJobUsingGet1
   * @summary 商品Sku证信息同步
   * @request GET:/api/luteos/product/sku/productSkuCertificationSyncJob
   */
  export namespace ProductSkuCertificationSyncJobUsingGet1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags 商品SKU管理
   * @name ProductSkuOperateUsingPost1
   * @summary 商品sku操作
   * @request POST:/api/luteos/product/sku/productSkuOperate
   */
  export namespace ProductSkuOperateUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductSkuOperateReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespBoolean;
  }

  /**
   * No description
   * @tags 商品SKU管理
   * @name ProductSkuSyncCrmUsingPost1
   * @summary 测试接口-产品信息同步CRM
   * @request POST:/api/luteos/product/sku/productSkuSyncCrm
   */
  export namespace ProductSkuSyncCrmUsingPost1 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags 商品SKU管理
   * @name QueryCountryUsingGet1
   * @summary 销售区域查询
   * @request GET:/api/luteos/product/sku/queryCountry
   */
  export namespace QueryCountryUsingGet1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CountryAreaListResp[];
  }

  /**
   * No description
   * @tags 商品SKU管理
   * @name QueryDeptOrMemberUsingGet1
   * @summary SKU提醒部门或人员查询
   * @request GET:/api/luteos/product/sku/queryDeptOrMember
   */
  export namespace QueryDeptOrMemberUsingGet1 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = Record<string, string>;
  }

  /**
   * No description
   * @tags 商品SKU管理
   * @name QueryMSkuRelationListUsingGet1
   * @summary 商品sku详情-店铺sku映射查询
   * @request GET:/api/luteos/product/sku/queryMSkuRelationList
   */
  export namespace QueryMSkuRelationListUsingGet1 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = MSkuRelationListResp;
  }

  /**
   * No description
   * @tags 店铺SKU管理
   * @name QueryPlatformSkuDetailUsingGet1
   * @summary 店铺SKU详情查询
   * @request GET:/api/luteos/product/sku/queryPlatformSkuDetail
   */
  export namespace QueryPlatformSkuDetailUsingGet1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags 店铺SKU管理
   * @name QueryPlatformSkuListUsingGet1
   * @summary 店铺SKU列表查询
   * @request GET:/api/luteos/product/sku/queryPlatformSkuList
   */
  export namespace QueryPlatformSkuListUsingGet1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags 商品SKU管理
   * @name QueryProductSkuPerfectionUsingGet1
   * @summary 获取商品sku列表信息完善度
   * @request GET:/api/luteos/product/sku/queryProductSku/perfection
   */
  export namespace QueryProductSkuPerfectionUsingGet1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = ProductSkuPerfectionQueryResp;
  }

  /**
   * No description
   * @tags 商品SKU管理
   * @name QueryProductSkuDetailUsingGet1
   * @summary 商品sku详情查询
   * @request GET:/api/luteos/product/sku/queryProductSkuDetail
   */
  export namespace QueryProductSkuDetailUsingGet1 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = ProductSkuDetailResp;
  }

  /**
   * No description
   * @tags 商品SKU管理
   * @name QueryProductSkuListUsingGet1
   * @summary 商品sku列表查询
   * @request GET:/api/luteos/product/sku/queryProductSkuList
   */
  export namespace QueryProductSkuListUsingGet1 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = ProductSkuListQueryResp;
  }

  /**
   * No description
   * @tags 商品SKU管理
   * @name QuerySkuCertificationListUsingPost1
   * @summary 商品Sku认证信息查询
   * @request POST:/api/luteos/product/sku/querySkuCertificationList
   */
  export namespace QuerySkuCertificationListUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductSkuCertificationListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = ProductSkuCertificationListResp;
  }

  /**
   * No description
   * @tags 商品SKU管理
   * @name QuerySkuDefaultSpecUsingGet1
   * @summary 商品sku默认供应链规格查询
   * @request GET:/api/luteos/product/sku/querySkuDefaultSpec
   */
  export namespace QuerySkuDefaultSpecUsingGet1 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = SupplySkuSpecResp;
  }

  /**
   * No description
   * @tags 商品SKU管理
   * @name QuerySkuInfoUsingGet1
   * @summary 商品sku信息查询
   * @request GET:/api/luteos/product/sku/querySkuInfo
   */
  export namespace QuerySkuInfoUsingGet1 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = ProductSkuInfoResp;
  }

  /**
   * No description
   * @tags 商品SKU管理
   * @name QuerySupplierSkuListUsingGet1
   * @summary 供应链sku列表查询
   * @request GET:/api/luteos/product/sku/querySupplierSkuList
   */
  export namespace QuerySupplierSkuListUsingGet1 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = SupplierSkuListQueryResp;
  }

  /**
   * No description
   * @tags 商品SKU管理
   * @name QuerySupplySkuListUsingGet2
   * @summary 商品Sku 关联供应链SKU查询并返回库存
   * @request GET:/api/luteos/product/sku/querySupplySkuList
   */
  export namespace QuerySupplySkuListUsingGet2 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = SupplySkuQueryResp;
  }

  /**
   * No description
   * @tags 店铺SKU管理
   * @name QueryUserAccountUsingGet1
   * @summary 查询店铺账户
   * @request GET:/api/luteos/product/sku/queryUserAccount
   */
  export namespace QueryUserAccountUsingGet1 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = ShopUserAccountResp;
  }

  /**
   * No description
   * @tags 店铺SKU管理
   * @name QueryUserAccountListUsingGet1
   * @summary 查询店铺账户集合
   * @request GET:/api/luteos/product/sku/queryUserAccountList
   */
  export namespace QueryUserAccountListUsingGet1 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = ShopUserAccountListResp;
  }

  /**
   * No description
   * @tags 店铺SKU管理
   * @name SavePlatformSkuRelationUsingPost1
   * @summary 保存店铺SKU关系
   * @request POST:/api/luteos/product/sku/savePlatformSkuRelation
   */
  export namespace SavePlatformSkuRelationUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags 商品SKU管理
   * @name SaveSkuUsingPost4
   * @summary 商品sku保存
   * @request POST:/api/luteos/product/sku/saveSku
   */
  export namespace SaveSkuUsingPost4 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductSkuSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = ProductSkuSaveResp;
  }

  /**
   * No description
   * @tags 商品SKU管理
   * @name SaveWorkflowRecordUsingPost1
   * @summary 生成SKU信息补充提醒工单
   * @request POST:/api/luteos/product/sku/saveWorkflowRecord
   */
  export namespace SaveWorkflowRecordUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductSkuNotifyReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = WorkflowSubmitResp;
  }

  /**
   * No description
   * @tags 商品SKU管理
   * @name SmaSkuQueryListUsingPost1
   * @summary 查询预测SKU维度添加商品
   * @request POST:/api/luteos/product/sku/smaSkuQueryList
   */
  export namespace SmaSkuQueryListUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SmaSkuQueryListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = SmaSkuQueryListResp;
  }

  /**
   * No description
   * @tags 商品供应商管理
   * @name ExportSkuSnUsingPost1
   * @summary 商品供应商导出信息
   * @request POST:/api/luteos/product/sku/sn/exportSkuSn
   */
  export namespace ExportSkuSnUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SkuSnQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonExportResp;
  }

  /**
   * No description
   * @tags 商品供应商管理
   * @name QuerySkuSnListUsingGet1
   * @summary 商品供应商列表查询
   * @request GET:/api/luteos/product/sku/sn/querySkuSnList
   */
  export namespace QuerySkuSnListUsingGet1 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = SkuSnQueryResp;
  }

  /**
   * No description
   * @tags 商品供应商管理
   * @name SaveSkuSnUsingPost1
   * @summary SN码创建
   * @request POST:/api/luteos/product/sku/sn/saveSkuSn
   */
  export namespace SaveSkuSnUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SkuSnSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags 商品SKU管理
   * @name UploadSkuImgUsingPost1
   * @summary 上传sku图片
   * @request POST:/api/luteos/product/sku/uploadSkuImg
   */
  export namespace UploadSkuImgUsingPost1 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags 商品中心数据统计
   * @name QueryMemberCenterStatsUsingGet1
   * @summary 个人中心数据统计
   * @request GET:/api/luteos/product/stats/queryMemberCenterStats
   */
  export namespace QueryMemberCenterStatsUsingGet1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = MemberCenterStatsQueryResp;
  }

  /**
   * No description
   * @tags 供应链SKU管理
   * @name ExportSupplySkuUsingPost1
   * @summary 供应链sku导出
   * @request POST:/api/luteos/product/supplySku/exportSupplySku
   */
  export namespace ExportSupplySkuUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SupplySkuListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonExportResp;
  }

  /**
   * No description
   * @tags 供应链SKU管理
   * @name ExportSupplySkuListUsingPost1
   * @summary 供应链sku列表导出
   * @request POST:/api/luteos/product/supplySku/exportSupplySkuList
   */
  export namespace ExportSupplySkuListUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SupplySkuListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonExportResp;
  }

  /**
   * No description
   * @tags 供应链SKU管理
   * @name OperateSupplySkuUsingPost1
   * @summary 供应链sku操作
   * @request POST:/api/luteos/product/supplySku/operateSupplySku
   */
  export namespace OperateSupplySkuUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SupplySkuOperateReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = SupplySkuCommonResp;
  }

  /**
   * No description
   * @tags 供应链SKU管理
   * @name QueryGtmMemberListUsingGet3
   * @summary 费用归属人列表
   * @request GET:/api/luteos/product/supplySku/queryGtmMemberList
   */
  export namespace QueryGtmMemberListUsingGet3 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = DeptMemberListQueryResp;
  }

  /**
   * No description
   * @tags 供应链SKU管理
   * @name QueryProductLineListUsingGet2
   * @summary 费用归属品线列表
   * @request GET:/api/luteos/product/supplySku/queryProductLineList
   */
  export namespace QueryProductLineListUsingGet2 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = FinanceProductLineListResp;
  }

  /**
   * No description
   * @tags 供应链SKU管理
   * @name QuerySupplyPurchaserListUsingGet1
   * @summary 采购员信息查询
   * @request GET:/api/luteos/product/supplySku/querySupplyPurchaserList
   */
  export namespace QuerySupplyPurchaserListUsingGet1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = SupplyPurchaserResp;
  }

  /**
   * No description
   * @tags 供应链SKU管理
   * @name QuerySupplySkuPerfectionUsingGet1
   * @summary 获取供应链sku信息完整度
   * @request GET:/api/luteos/product/supplySku/querySupplySku/perfection
   */
  export namespace QuerySupplySkuPerfectionUsingGet1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = SupplySkuPerfectionQueryResp;
  }

  /**
   * No description
   * @tags 供应链SKU管理
   * @name QuerySupplySkuDetailUsingGet1
   * @summary 供应链sku详情
   * @request GET:/api/luteos/product/supplySku/querySupplySkuDetail
   */
  export namespace QuerySupplySkuDetailUsingGet1 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = SupplySkuDetailResp;
  }

  /**
   * No description
   * @tags 供应链SKU管理
   * @name QuerySupplySkuListUsingGet3
   * @summary 供应链sku列表查询
   * @request GET:/api/luteos/product/supplySku/querySupplySkuList
   */
  export namespace QuerySupplySkuListUsingGet3 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = SupplySkuListQueryResp;
  }

  /**
   * No description
   * @tags 供应链SKU管理
   * @name SaveSupplySkuUsingPost1
   * @summary 供应链sku保存
   * @request POST:/api/luteos/product/supplySku/saveSupplySku
   */
  export namespace SaveSupplySkuUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SupplySkuSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = SupplySkuCommonResp;
  }

  /**
   * No description
   * @tags 标签分类管理
   * @name CreateCategoryUsingPost1
   * @summary 创建标签分类
   * @request POST:/api/luteos/product/tag/category/createCategory
   */
  export namespace CreateCategoryUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateCategoryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CreateCategoryResp;
  }

  /**
   * @description codeList为空时按照categoryName进行查询，codeList不为空时按照codeList查询
   * @tags 标签分类管理
   * @name ExportUsingPost13
   * @summary 导出标签分类
   * @request POST:/api/luteos/product/tag/category/export
   */
  export namespace ExportUsingPost13 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CategoryListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonExportResp;
  }

  /**
   * @description 传入categoryCode，返回其下一级分类节点列表
   * @tags 标签分类管理
   * @name QueryChildrenUsingGet1
   * @summary 根据分类编码查询下一级子节点
   * @request GET:/api/luteos/product/tag/category/queryChildren
   */
  export namespace QueryChildrenUsingGet1 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = CategoryChildrenQueryResp;
  }

  /**
   * @description 无参时返回整个树结构；传入categoryName时，根据分类名称模糊查询，返回匹配的分类及其所有父级分类的树结构
   * @tags 标签分类管理
   * @name QueryTreeUsingGet1
   * @summary 查询标签分类树
   * @request GET:/api/luteos/product/tag/category/queryTree
   */
  export namespace QueryTreeUsingGet1 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = CategoryTreeResp;
  }

  /**
   * No description
   * @tags 标签分类管理
   * @name QueyCategoryListUsingGet1
   * @summary 查询标签分类列表
   * @request GET:/api/luteos/product/tag/category/queyCategoryList
   */
  export namespace QueyCategoryListUsingGet1 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = CategoryListQueryResp;
  }

  /**
   * No description
   * @tags 标签分类管理
   * @name UpdateCategoryUsingPost1
   * @summary 更新标签分类
   * @request POST:/api/luteos/product/tag/category/updateCategory
   */
  export namespace UpdateCategoryUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UpdateCategoryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = UpdateCategoryResp;
  }

  /**
   * No description
   * @tags 标签管理
   * @name ConnectProductUsingPost9
   * @summary 标签关联商品
   * @request POST:/api/luteos/product/tag/connectProduct
   */
  export namespace ConnectProductUsingPost9 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TagProductConnectReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespBoolean;
  }

  /**
   * No description
   * @tags 标签管理
   * @name ExportTagUsingPost1
   * @summary 标签信息导出
   * @request POST:/api/luteos/product/tag/exportTag
   */
  export namespace ExportTagUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TagListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonExportResp;
  }

  /**
   * No description
   * @tags 标签管理
   * @name OperateTagUsingPost1
   * @summary 标签操作
   * @request POST:/api/luteos/product/tag/operateTag
   */
  export namespace OperateTagUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TagOperateReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespBoolean;
  }

  /**
   * No description
   * @tags 标签管理
   * @name QueryTagDetailUsingGet1
   * @summary 标签详情查询
   * @request GET:/api/luteos/product/tag/queryTagDetail
   */
  export namespace QueryTagDetailUsingGet1 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = TagDetailResp;
  }

  /**
   * No description
   * @tags 标签管理
   * @name QueryTagListUsingGet1
   * @summary 标签列表查询
   * @request GET:/api/luteos/product/tag/queryTagList
   */
  export namespace QueryTagListUsingGet1 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = TagListQueryResp;
  }

  /**
   * No description
   * @tags 标签管理
   * @name QueryTagProductUsingGet1
   * @summary 查询标签关联商品
   * @request GET:/api/luteos/product/tag/queryTagProduct
   */
  export namespace QueryTagProductUsingGet1 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = TagProductResp;
  }

  /**
   * No description
   * @tags 标签管理
   * @name SaveOrUpdateTagUsingPost1
   * @summary 标签信息保存
   * @request POST:/api/luteos/product/tag/saveOrUpdateTag
   */
  export namespace SaveOrUpdateTagUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TagSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = TagSaveResp;
  }

  /**
   * No description
   * @tags TK周报模块
   * @name ExportMetaTiktokSumListUsingPost1
   * @summary tiktok-机构达人汇总导出
   * @request POST:/api/luteos/product/tiktok/exportMetaTiktokSumList
   */
  export namespace ExportMetaTiktokSumListUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MetaTiktokReportSumQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonExportResp;
  }

  /**
   * No description
   * @tags TK周报模块
   * @name ExportTiktokAdsListUsingPost1
   * @summary tiktok-广告明细表现导出
   * @request POST:/api/luteos/product/tiktok/exportTiktokAdsList
   */
  export namespace ExportTiktokAdsListUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TiktokAdsQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonExportResp;
  }

  /**
   * No description
   * @tags TK周报模块
   * @name ExportTiktokAffiliateAccountsSpuListUsingPost1
   * @summary tiktok-机构达人表现导出
   * @request POST:/api/luteos/product/tiktok/exportTiktokAffiliateAccountsSpuList
   */
  export namespace ExportTiktokAffiliateAccountsSpuListUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TiktokAffiliateAccountsSpuQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonExportResp;
  }

  /**
   * No description
   * @tags TK周报模块
   * @name ExportTiktokWeekReportListUsingPost1
   * @summary tiktok-小店周报SPU导出
   * @request POST:/api/luteos/product/tiktok/exportTiktokWeekReportList
   */
  export namespace ExportTiktokWeekReportListUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TiktokWeekReportQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonExportResp;
  }

  /**
   * No description
   * @tags tiktok-在线商品
   * @name DownloadUsingPost14
   * @summary tiktok-在线商品导出-V2
   * @request POST:/api/luteos/product/tiktok/listing/download
   */
  export namespace DownloadUsingPost14 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TikTokListingProductReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonExportResp;
  }

  /**
   * No description
   * @tags tiktok-在线商品
   * @name QueryProductListingPageUsingPost8
   * @summary tiktok-在线商品分页查询-V2
   * @request POST:/api/luteos/product/tiktok/listing/queryProductListingPage
   */
  export namespace QueryProductListingPageUsingPost8 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TikTokListingProductReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = TikTokProductListingResp;
  }

  /**
   * No description
   * @tags TK周报模块
   * @name QueryMetaTiktokSumListUsingPost1
   * @summary tiktok-机构达人表现-汇总查询
   * @request POST:/api/luteos/product/tiktok/queryMetaTiktokSumList
   */
  export namespace QueryMetaTiktokSumListUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MetaTiktokReportSumQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = MetaTiktokReportSumQueryResp;
  }

  /**
   * No description
   * @tags TK周报模块
   * @name QueryTiktokAdsListUsingGet1
   * @summary tiktok-广告明细表现查询
   * @request GET:/api/luteos/product/tiktok/queryTiktokAdsList
   */
  export namespace QueryTiktokAdsListUsingGet1 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = TiktokAdsQueryResp;
  }

  /**
   * No description
   * @tags TK周报模块
   * @name QueryTiktokAdsPlatformSkuListUsingGet1
   * @summary tiktok-广告映射店铺sku查询
   * @request GET:/api/luteos/product/tiktok/queryTiktokAdsPlatformSkuList
   */
  export namespace QueryTiktokAdsPlatformSkuListUsingGet1 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = TiktokAdsPlatformSkuQueryResp;
  }

  /**
   * No description
   * @tags TK周报模块
   * @name QueryTiktokAffiliateAccountsSpuListUsingPost1
   * @summary tiktok-机构达人表现-周维度查询
   * @request POST:/api/luteos/product/tiktok/queryTiktokAffiliateAccountsSpuList
   */
  export namespace QueryTiktokAffiliateAccountsSpuListUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TiktokAffiliateAccountsSpuQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = TiktokAffiliateAccountsSpuQueryResp;
  }

  /**
   * No description
   * @tags TK周报模块
   * @name QueryTiktokWeekReportListUsingGet1
   * @summary tiktok-小店周报SPU查询
   * @request GET:/api/luteos/product/tiktok/queryTiktokWeekReportList
   */
  export namespace QueryTiktokWeekReportListUsingGet1 {
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
      "lute-account-str"?: any;
    };
    export type ResponseBody = TiktokWeekReportQueryResp;
  }

  /**
   * No description
   * @tags TK周报模块
   * @name SaveTiktokAdsSkuUsingPost1
   * @summary tiktok-广告店铺SKU映射保存
   * @request POST:/api/luteos/product/tiktok/saveTiktokAdsSku
   */
  export namespace SaveTiktokAdsSkuUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TiktokAdsSkuSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = TiktokAdsSkuSaveResp;
  }

  /**
   * No description
   * @tags 沃尔玛-在线商品
   * @name DownloadUsingPost15
   * @summary 沃尔玛-在线商品导出-V2
   * @request POST:/api/luteos/product/walmart/listing/download
   */
  export namespace DownloadUsingPost15 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = WalmartListingProductReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonExportResp;
  }

  /**
   * No description
   * @tags 沃尔玛-在线商品
   * @name DownloadUsingPost16
   * @summary 沃尔玛在线商品导出
   * @request POST:/api/luteos/product/walmart/listing/listing/download
   * @deprecated
   */
  export namespace DownloadUsingPost16 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = WalmartListingReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonExportResp;
  }

  /**
   * No description
   * @tags 沃尔玛-在线商品
   * @name QueryListingTagUsingPost9
   * @summary 沃尔玛在线商品父维度标签查询
   * @request POST:/api/luteos/product/walmart/listing/listing/queryTag
   * @deprecated
   */
  export namespace QueryListingTagUsingPost9 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ListingQueryTagReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = ListingTagResp;
  }

  /**
   * No description
   * @tags 沃尔玛-在线商品
   * @name UpdateTagUsingPost8
   * @summary 沃尔玛在线商品标签保存更新
   * @request POST:/api/luteos/product/walmart/listing/listing/updateTag
   * @deprecated
   */
  export namespace UpdateTagUsingPost8 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ListingBatchModifyTagReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags 沃尔玛-在线商品
   * @name QueryPageUsingPost1
   * @summary 沃尔玛-在线商品分页查询
   * @request POST:/api/luteos/product/walmart/listing/queryPage
   * @deprecated
   */
  export namespace QueryPageUsingPost1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = WalmartListingReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = WalmartListingResp;
  }

  /**
   * No description
   * @tags 沃尔玛-在线商品
   * @name QueryProductListingPageUsingPost9
   * @summary 沃尔玛-在线商品分页查询-V2
   * @request POST:/api/luteos/product/walmart/listing/queryProductListingPage
   */
  export namespace QueryProductListingPageUsingPost9 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = WalmartListingProductReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = WalmartProductListingResp;
  }

  /**
   * No description
   * @tags 沃尔玛-在线商品
   * @name SaveOperatorUsingPost7
   * @summary 沃尔玛-在线商品保存运营人员
   * @request POST:/api/luteos/product/walmart/listing/saveOperator
   * @deprecated
   */
  export namespace SaveOperatorUsingPost7 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OperatorSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags 沃尔玛-在线商品
   * @name SaveProductLinkUsingPost7
   * @summary 沃尔玛-在线商品保存商品链接
   * @request POST:/api/luteos/product/walmart/listing/saveProductLink
   * @deprecated
   */
  export namespace SaveProductLinkUsingPost7 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductLinkSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      "lute-account-str"?: any;
    };
    export type ResponseBody = CommonRespObject;
  }
}
