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
  AccountAgingDetailStatisticsResp,
  AccountAgingSummaryStatisticsResp,
  AgingDetailStatisticsReq,
  AgingSummaryStatisticsReq,
  AttachmentInfoUploadReq,
  BankAccountListReq,
  BankAccountListResp,
  BatchSetBudgetDeptReq,
  BatchUpdateCustomsDeclarationStatusReq,
  BillingInfoReq,
  BillingInfoResp,
  BorrowOrderDetailResp,
  BorrowOrderListQueryReq,
  BorrowOrderListQueryResp,
  BorrowOrderRefundDetailResp,
  BorrowOrderRefundListQueryReq,
  BorrowOrderRefundListQueryResp,
  BudgetAssetInfoListReq,
  BudgetAssetInfoListResp,
  BudgetBasicChannelListResp,
  BudgetBasicChannelReq,
  BudgetBasicCountryListResp,
  BudgetBasicCountryReq,
  BudgetBasicCurrencyListResp,
  BudgetBasicExchangeRateReq,
  BudgetBasicGtmPlListResp,
  BudgetBasicMsrpPriceListReq,
  BudgetBasicMsrpPriceListResp,
  BudgetBasicNewProductListResp,
  BudgetBasicNewProductReq,
  BudgetBasicOperatorInfoListResp,
  BudgetBasicOperatorInfoReq,
  BudgetBasicProductListReq,
  BudgetBasicProductListResp,
  BudgetBasicProductResp,
  BudgetBasicPurCostPriceListResp,
  BudgetBasicQueryReq,
  BudgetBasicSelectResp,
  BudgetBasicSkuSaleDateListResp,
  BudgetConsultingProjectListReq,
  BudgetConsultingProjectListResp,
  BudgetCurrentExpenseListReq,
  BudgetCurrentExpenseListResp,
  BudgetFirstMileListReq,
  BudgetFirstMileListResp,
  BudgetMarketingCampaignListReq,
  BudgetMarketingCampaignListResp,
  BudgetMarketingCostListReq,
  BudgetMarketingCostListResp,
  BudgetPurchaseListReq,
  BudgetPurchaseListResp,
  BudgetSellInListReq,
  BudgetSellInListResp,
  BudgetSummaryRuleChangeStatusReq,
  BudgetSummaryRuleDetailBean,
  BudgetSummaryRuleListReq,
  BudgetSummaryRuleListResp,
  BudgetSummaryRuleResultExeSignleReq,
  BudgetSummaryRuleResultExportListReq,
  BudgetSummaryRuleResultQueryListReq,
  BudgetSummaryRuleResultQueryListResp,
  CategoryListQueryResp,
  CnOrderDetailResp,
  CnOrderListReq,
  CnOrderListResp,
  CnOrderRelatedInvoiceReq,
  ColumnBean,
  CommonExportResp,
  CommonResp,
  CommonRespBoolean,
  CommonRespCommonBatchResp,
  CommonRespCommonExportResp,
  CommonRespObject,
  CommonRespOtherBusinessPartnersQueryListResp,
  CommonRespPaymentOrderDetailResp,
  CommonRespPaymentOrderObsoleteResp,
  CommonRespString,
  CommonRespVoid,
  CustomerCreditLimitReq,
  CustomerCreditLimitResp,
  CustomerListQueryReq,
  CustomerListQueryResp,
  CustomsDeclarationPlanListReq,
  CustomsDeclarationPlanListResp,
  DatabatchConfigReq,
  DefaultApportionSelectedInvoiceReq,
  DepartmentDetailQueryResp,
  DepartmentListQueryReq,
  DepartmentListQueryResp,
  DeptListResp,
  ErpOtherInStockDetailResp,
  ErpOtherOutStockDetailResp,
  ExpenseReportDetailResp,
  ExpenseReportListQueryReq,
  ExpenseReportListQueryResp,
  FbtApplyStatusChangeReq,
  FbtBillStatusChangeEventReq,
  FbtBorrowRefundEventReq,
  FbtPayOrderEventReq,
  FbtPayVerificationEventReq,
  FbtPrivatePayCreateEventReq,
  FbtPublicPayCreateEventReq,
  FieldNameToCodesReq,
  GtmGroupMappingDetailResp,
  GtmGroupMappingListResp,
  GtmPlDetailResp,
  IncomeIncomeRuleAnalysisDetailResp,
  IncomePaymentConfirmationOrderBatchChangePushStatusReq,
  IncomePaymentConfirmationOrderBatchDeleteReq,
  IncomePaymentConfirmationOrderBatchPushReq,
  IncomePaymentConfirmationOrderListReq,
  IncomePaymentConfirmationOrderListResp,
  IncomePaymentConfirmationOrderPushBatchListResp,
  IncomePaymentConfirmationOrderPushReq,
  IncomeRuleAnalysisConfirmFileReq,
  IncomeRuleAnalysisExecuteBatchReq,
  IncomeRuleAnalysisExecuteReq,
  IncomeRuleAnalysisListIdsReq,
  IncomeRuleAnalysisListReq,
  IncomeRuleAnalysisListResp,
  IncomeRuleAnalysisRecordBean,
  IncomeRuleAssembleAvScriptKeyReq,
  IncomeRuleChangeStatusReq,
  IncomeRuleCopyReq,
  IncomeRuleDetailBean,
  IncomeRuleEnableCheckReq,
  IncomeRuleEnableCheckResp,
  IncomeRuleListReq,
  IncomeRuleListResp,
  IncomeRuleShopCheckListReq,
  IncomeRuleShopCheckListResp,
  IncomeRuleStatementOrderBatchChangePushStatuReq,
  IncomeRuleStatementOrderBatchDeletedReq,
  IncomeRuleStatementOrderBatchPushReq,
  IncomeRuleStatementOrderListReq,
  IncomeRuleStatementOrderListResp,
  IncomeRuleStatementOrderPushBatchListResp,
  IncomeRuleStatementOrderPushReq,
  InvoiceDetailResp,
  InvoiceListReq,
  InvoiceListResp,
  InvoiceReverseWriteOffReq,
  InvoiceReviewReq,
  InvoiceSaveReq,
  MatchThirdSystemNumberReq,
  MemberDetailQueryResp,
  MemberListQueryResp,
  ModelRefreshReq,
  NewProductListResp,
  OaInvoiceListReq,
  OAInvoiceListResp,
  OaPaymentDetailBean,
  OaPaymentOrderBatchChangePushStatusReq,
  OaPaymentOrderCodeUpdateReq,
  OaPaymentOrderListUpdateReq,
  OaPaymentOrderQueryListReq,
  OaPaymentOrderQueryListResp,
  OfflineTransferBatchChangePushStatusReq,
  OfflineTransferOrderDetailResp,
  OfflineTransferOrderListQueryReq,
  OfflineTransferOrderQueryListResp,
  OtherBusinessPartnersQueryListReq,
  OtherInOutStockBatchChangePushStatusReq,
  OtherInOutStockQueryListResp,
  OtherInOutStockQueryReq,
  PayableBillDetailQueryResp,
  PayableBillListQueryReq,
  PayableBillListQueryResp,
  PayApplyOrderDetailResp,
  PayApplyOrderListReq,
  PayApplyOrderListResp,
  PaymentCollectionAddReq,
  PaymentCollectionCancelClaimReq,
  PaymentCollectionClaimReq,
  PaymentCollectionClaimResp,
  PaymentCollectionDetailResp,
  PaymentCollectionLinkCustomerReq,
  PaymentCollectionListReq,
  PaymentCollectionListResp,
  PaymentCollectionPublishReq,
  PaymentCollectionRelatedInvoiceReq,
  PaymentCollectionSaveFeeReq,
  PaymentOrderCodeReq,
  PaymentOrderDetailReq,
  PaymentOrderListReq,
  PaymentOrderListResp,
  PlatformOrderBatchChangePushStatuReq,
  PlatformOrderBatchDeletedReq,
  PlatformOrderBatchPushReq,
  PlatformOrderDetailHeaderReq,
  PlatformOrderDetailHeaderResp,
  PlatformOrderItemListReq,
  PlatformOrderItemListResp,
  PlatformOrderListReq,
  PlatformOrderListResp,
  PlatformOrderPushBatchListResp,
  PlatformOrderResultMappingResp,
  PretreatmentRuleDbDetailBean,
  PretreatmentRuleExeReq,
  PretreatmentRuleListReq,
  PretreatmentRuleListResp,
  ProductListQueryResp,
  PurchaseInStockDetailResp,
  PurchaseListReq,
  PurchaseListResp,
  PurchaseOrderBatchChangePushStatusReq,
  PurchaseOrderDetailResp,
  PurchaseRefundDetailResp,
  ReceiptConditionDetailReq,
  ReceiptConditionListReq,
  ReceiptConditionListResp,
  ReceiptConditionUpdateStatusReq,
  RecOrderListQueryReq,
  RecOrderListQueryResp,
  RecOrderListUpdateTimeReq,
  RecOrderQueryResp,
  SalesOutStockOrderBatchChangePushStatusReq,
  SalesOutStockOrderListQueryReq,
  SalesOutStockOrderQueryListResp,
  SalesOutStockOrderUpdateOutTimeReq,
  SettlementFormDetailResp,
  SettlementFormListReq,
  SettlementFormListResp,
  ShopCompareListReq,
  ShopCompareListResp,
  ShopCompareSumDataResp,
  SpuListQueryResp,
  SupplierDetailQueryResp,
  SupplierListQueryResp,
  SyncKingdeeBillReq,
  SyncThirdSystemBillReq,
  TableConfigResp,
  TableFieldListResp,
  TransferSlipDetailQueryResp,
  TransferSlipListQueryReq,
  TransferSlipListQueryResp,
  UpdateBudgetDeptReq,
  UpdateDeptFeeReq,
  UpdateKingdeeNumberReq,
  UpdateOldShopSaveReq,
  UpdateThirdSystemNumberReq,
  UploadReq,
  WarehouseListQueryResp,
  WriteOffDetailResp,
} from './data-contracts';

export namespace Api {
  /**
   * No description
   * @tags 应收账龄
   * @name FinanceAgingDetail
   * @summary 明细
   * @request POST:/api/finance/aging/detail
   * @response `200` `AccountAgingDetailStatisticsResp` OK
   */
  export namespace FinanceAgingDetail {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AgingDetailStatisticsReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = AccountAgingDetailStatisticsResp;
  }

  /**
   * No description
   * @tags 应收账龄
   * @name FinanceAgingDetailExport
   * @summary 明细导出
   * @request POST:/api/finance/aging/detail/export
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace FinanceAgingDetailExport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AgingDetailStatisticsReq;
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
   * @tags 应收账龄
   * @name FinanceAgingSummaryExport
   * @summary 汇总导出
   * @request POST:/api/finance/aging/summary/export
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace FinanceAgingSummaryExport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AgingSummaryStatisticsReq;
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
   * @tags 应收账龄
   * @name FinanceAgingSummaryStatistics
   * @summary 汇总统计
   * @request POST:/api/finance/aging/summary/statistics
   * @response `200` `AccountAgingSummaryStatisticsResp` OK
   */
  export namespace FinanceAgingSummaryStatistics {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AgingSummaryStatisticsReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = AccountAgingSummaryStatisticsResp;
  }

  /**
   * No description
   * @tags 基础资料-资产信息
   * @name FinanceAssetInfoDownLoadTemplate
   * @summary 下载批量新增模板
   * @request POST:/api/finance/asset/info/downLoadTemplate
   * @response `200` `CommonRespString` OK
   */
  export namespace FinanceAssetInfoDownLoadTemplate {
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
   * @tags 基础资料-资产信息
   * @name FinanceAssetInfoExport
   * @summary 资产信息列表导出
   * @request POST:/api/finance/asset/info/export
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace FinanceAssetInfoExport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BudgetAssetInfoListReq;
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
   * @tags 基础资料-资产信息
   * @name FinanceAssetInfoImportData
   * @summary 批量导入
   * @request POST:/api/finance/asset/info/importData
   * @response `200` `CommonRespVoid` OK
   */
  export namespace FinanceAssetInfoImportData {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UploadReq;
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
   * @tags 基础资料-资产信息
   * @name FinanceAssetInfoQueryList
   * @summary 资产信息列表查询
   * @request POST:/api/finance/asset/info/queryList
   * @response `200` `BudgetAssetInfoListResp` OK
   */
  export namespace FinanceAssetInfoQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BudgetAssetInfoListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = BudgetAssetInfoListResp;
  }

  /**
   * No description
   * @tags 基础查询
   * @name FinanceBasicBatchSetBudgetDept
   * @summary 批量设置预算部门
   * @request POST:/api/finance/basic/batchSetBudgetDept
   * @response `200` `CommonResp` OK
   */
  export namespace FinanceBasicBatchSetBudgetDept {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BatchSetBudgetDeptReq;
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
   * @tags 基础查询
   * @name FinanceBasicBatchSyncThirdSystemBill
   * @summary 批量同步第三方单据
   * @request POST:/api/finance/basic/batchSyncThirdSystemBill
   * @response `200` `CommonRespVoid` OK
   */
  export namespace FinanceBasicBatchSyncThirdSystemBill {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SyncThirdSystemBillReq[];
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
   * @tags 基础查询
   * @name FinanceBasicBatchUpdateCustomsDeclarationStatus
   * @summary 批量修改报关状态
   * @request POST:/api/finance/basic/batchUpdateCustomsDeclarationStatus
   * @response `200` `CommonResp` OK
   */
  export namespace FinanceBasicBatchUpdateCustomsDeclarationStatus {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BatchUpdateCustomsDeclarationStatusReq;
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
   * @tags 基础查询
   * @name FinanceBasicDeletePushKingdeeRecOrder
   * @summary 删除发票对账单推送金蝶信息
   * @request GET:/api/finance/basic/deletePushKingdeeRecOrder
   * @response `200` `CommonRespVoid` OK
   */
  export namespace FinanceBasicDeletePushKingdeeRecOrder {
    export type RequestParams = {};
    export type RequestQuery = {
      /** srmRecBillNo */
      srmRecBillNo: string;
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
   * @tags 预算-基础资料
   * @name FinanceBasicDownloadCurrencyTemplate
   * @summary 下载基准汇率模板
   * @request GET:/api/finance/basic/downloadCurrencyTemplate
   * @response `200` `CommonRespString` OK
   */
  export namespace FinanceBasicDownloadCurrencyTemplate {
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
   * @tags 基础查询
   * @name FinanceBasicExportQueryRecOrderList
   * @summary 对账单列表导出
   * @request POST:/api/finance/basic/export/queryRecOrderList
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace FinanceBasicExportQueryRecOrderList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = RecOrderListQueryReq;
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
   * @tags 基础查询
   * @name FinanceBasicExportBankAccountList
   * @summary 导出银行账号
   * @request POST:/api/finance/basic/exportBankAccountList
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace FinanceBasicExportBankAccountList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BankAccountListReq;
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
   * @tags 预算-基础资料
   * @name FinanceBasicExportBudgetNewProductList
   * @summary 导出预算研发项目列表
   * @request POST:/api/finance/basic/exportBudgetNewProductList
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace FinanceBasicExportBudgetNewProductList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BudgetBasicNewProductReq;
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
   * @tags 预算-基础资料
   * @name FinanceBasicExportChannelList
   * @summary 导出渠道信息列表
   * @request POST:/api/finance/basic/exportChannelList
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace FinanceBasicExportChannelList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BudgetBasicChannelReq;
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
   * @tags 预算-基础资料
   * @name FinanceBasicExportCountryList
   * @summary 导出国家信息列表
   * @request POST:/api/finance/basic/exportCountryList
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace FinanceBasicExportCountryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BudgetBasicCountryReq;
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
   * @tags 预算-基础资料
   * @name FinanceBasicExportCurrencyList
   * @summary 基准汇率信息列表
   * @request POST:/api/finance/basic/exportCurrencyList
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace FinanceBasicExportCurrencyList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BudgetBasicExchangeRateReq;
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
   * @tags 基础查询
   * @name FinanceBasicExportCustomsDeclarationPlanList
   * @summary 报关计划导出
   * @request POST:/api/finance/basic/exportCustomsDeclarationPlanList
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace FinanceBasicExportCustomsDeclarationPlanList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CustomsDeclarationPlanListReq;
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
   * @tags 基础查询
   * @name FinanceBasicExportDepartmentList
   * @summary 部门列表导出
   * @request POST:/api/finance/basic/exportDepartmentList
   * @response `200` `CommonExportResp` OK
   */
  export namespace FinanceBasicExportDepartmentList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DepartmentListQueryReq;
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
   * @tags 预算-基础资料
   * @name FinanceBasicExportGtmPlList
   * @summary 导出GTM品线列表
   * @request POST:/api/finance/basic/exportGtmPlList
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace FinanceBasicExportGtmPlList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
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
   * @tags 预算-基础资料
   * @name FinanceBasicExportMsrpPriceList
   * @summary 导出售价信息列表
   * @request POST:/api/finance/basic/exportMsrpPriceList
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace FinanceBasicExportMsrpPriceList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BudgetBasicMsrpPriceListReq;
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
   * @tags 预算-基础资料
   * @name FinanceBasicExportOperatorInfoList
   * @summary 导出运营人员信息列表
   * @request POST:/api/finance/basic/exportOperatorInfoList
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace FinanceBasicExportOperatorInfoList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BudgetBasicOperatorInfoReq;
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
   * @tags 预算-基础资料
   * @name FinanceBasicExportProductList
   * @summary 导出产品信息列表
   * @request POST:/api/finance/basic/exportProductList
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace FinanceBasicExportProductList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BudgetBasicProductListReq;
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
   * @tags 预算-基础资料
   * @name FinanceBasicExportPurCostPriceList
   * @summary 导出采购成本价列表
   * @request POST:/api/finance/basic/exportPurCostPriceList
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace FinanceBasicExportPurCostPriceList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BudgetBasicQueryReq;
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
   * @tags 预算-基础资料
   * @name FinanceBasicExportSkuSaleDateList
   * @summary 导出SKU开卖时间列表
   * @request POST:/api/finance/basic/exportSkuSaleDateList
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace FinanceBasicExportSkuSaleDateList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BudgetBasicQueryReq;
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
   * @tags 预算-基础资料
   * @name FinanceBasicImportCurrencyData
   * @summary 导入基准汇率数据
   * @request POST:/api/finance/basic/importCurrencyData
   * @response `200` `CommonRespVoid` OK
   */
  export namespace FinanceBasicImportCurrencyData {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UploadReq;
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
   * @tags 基础查询
   * @name FinanceBasicMatchThirdSystemNumber
   * @summary 匹配第三方系统编码
   * @request POST:/api/finance/basic/matchThirdSystemNumber
   * @response `200` `CommonRespString` OK
   */
  export namespace FinanceBasicMatchThirdSystemNumber {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MatchThirdSystemNumberReq;
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
   * @tags 其他往来单位管理
   * @name FinanceBasicOtherBusinessPartnersExportQueryList
   * @summary 导出-列表查询
   * @request POST:/api/finance/basic/otherBusinessPartners/exportQueryList
   * @response `200` `CommonExportResp` OK
   */
  export namespace FinanceBasicOtherBusinessPartnersExportQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OtherBusinessPartnersQueryListReq;
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
   * @tags 其他往来单位管理
   * @name FinanceBasicOtherBusinessPartnersQueryList
   * @summary 列表查询
   * @request POST:/api/finance/basic/otherBusinessPartners/queryList
   * @response `200` `CommonRespOtherBusinessPartnersQueryListResp` OK
   */
  export namespace FinanceBasicOtherBusinessPartnersQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OtherBusinessPartnersQueryListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespOtherBusinessPartnersQueryListResp;
  }

  /**
   * No description
   * @tags 基础功能
   * @name FinanceBasicPlatformRefresh
   * @summary 业务模块-手动刷新
   * @request POST:/api/finance/basic/platform/refresh
   * @response `200` `CommonRespBoolean` OK
   */
  export namespace FinanceBasicPlatformRefresh {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ModelRefreshReq;
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
   * @tags 预算-基础资料
   * @name FinanceBasicQueryAllAreaSelect
   * @summary 区域筛选查询
   * @request GET:/api/finance/basic/queryAllAreaSelect
   * @response `200` `(BudgetBasicSelectResp)[]` OK
   */
  export namespace FinanceBasicQueryAllAreaSelect {
    export type RequestParams = {};
    export type RequestQuery = {
      /** keyword */
      keyword?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = BudgetBasicSelectResp[];
  }

  /**
   * No description
   * @tags 基础查询
   * @name FinanceBasicQueryBankAccountList
   * @summary 银行账号查询
   * @request POST:/api/finance/basic/queryBankAccountList
   * @response `200` `BankAccountListResp` OK
   */
  export namespace FinanceBasicQueryBankAccountList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BankAccountListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = BankAccountListResp;
  }

  /**
   * No description
   * @tags 基础查询
   * @name FinanceBasicQueryBudgetDeptList
   * @summary 预算部门列表查询-OA出差审批表单筛选
   * @request GET:/api/finance/basic/queryBudgetDeptList
   * @response `200` `DeptListResp` OK
   */
  export namespace FinanceBasicQueryBudgetDeptList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DeptListResp;
  }

  /**
   * No description
   * @tags 预算-基础资料
   * @name FinanceBasicQueryBudgetNewProductList
   * @summary 预算研发项目列表查询
   * @request POST:/api/finance/basic/queryBudgetNewProductList
   * @response `200` `BudgetBasicNewProductListResp` OK
   */
  export namespace FinanceBasicQueryBudgetNewProductList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BudgetBasicNewProductReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = BudgetBasicNewProductListResp;
  }

  /**
   * No description
   * @tags 基础查询
   * @name FinanceBasicQueryCategoryList
   * @summary 分类列表查询
   * @request GET:/api/finance/basic/queryCategoryList
   * @response `200` `CategoryListQueryResp` OK
   */
  export namespace FinanceBasicQueryCategoryList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** @format int32 */
      billType?: number;
      /**
       * 分贝通推送状态: 0-未推送 1-推送成功 2-推送失败
       * @format int32
       */
      fbtPushStatus?: number;
      /**
       * 分贝通关联状态: 0-未关联 1-已关联
       * @format int32
       */
      fbtRelateStatus?: number;
      /** 关键字 */
      keyword?: string;
      /**
       * 分类级别
       * @format int32
       */
      level?: number;
      /**
       * 页数
       * @format int32
       */
      pageNum?: number;
      /**
       * 每页数量
       * @format int32
       */
      pageSize?: number;
      /**
       * 金蝶推送状态: 0-未推送 1-推送成功 2-推送失败
       * @format int32
       */
      pushStatus?: number;
      /**
       * 金蝶关联状态: 0-未关联 1-已关联
       * @format int32
       */
      relateStatus?: number;
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
   * @tags 预算-基础资料
   * @name FinanceBasicQueryChannelList
   * @summary 渠道信息列表查询
   * @request POST:/api/finance/basic/queryChannelList
   * @response `200` `BudgetBasicChannelListResp` OK
   */
  export namespace FinanceBasicQueryChannelList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BudgetBasicChannelReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = BudgetBasicChannelListResp;
  }

  /**
   * No description
   * @tags 预算-基础资料
   * @name FinanceBasicQueryChannelSelect
   * @summary 渠道筛选查询
   * @request GET:/api/finance/basic/queryChannelSelect
   * @response `200` `(BudgetBasicSelectResp)[]` OK
   */
  export namespace FinanceBasicQueryChannelSelect {
    export type RequestParams = {};
    export type RequestQuery = {
      /** keyword */
      keyword?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = BudgetBasicSelectResp[];
  }

  /**
   * No description
   * @tags 预算-基础资料
   * @name FinanceBasicQueryCountryList
   * @summary 国家信息列表查询
   * @request POST:/api/finance/basic/queryCountryList
   * @response `200` `BudgetBasicCountryListResp` OK
   */
  export namespace FinanceBasicQueryCountryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BudgetBasicCountryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = BudgetBasicCountryListResp;
  }

  /**
   * No description
   * @tags 预算-基础资料
   * @name FinanceBasicQueryCurrencyList
   * @summary 基准汇率列表查询
   * @request POST:/api/finance/basic/queryCurrencyList
   * @response `200` `BudgetBasicCurrencyListResp` OK
   */
  export namespace FinanceBasicQueryCurrencyList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BudgetBasicExchangeRateReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = BudgetBasicCurrencyListResp;
  }

  /**
   * No description
   * @tags 预算-基础资料
   * @name FinanceBasicQueryCurrencySelect
   * @summary 币种筛选查询
   * @request GET:/api/finance/basic/queryCurrencySelect
   * @response `200` `(BudgetBasicSelectResp)[]` OK
   */
  export namespace FinanceBasicQueryCurrencySelect {
    export type RequestParams = {};
    export type RequestQuery = {
      /** keyword */
      keyword?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = BudgetBasicSelectResp[];
  }

  /**
   * No description
   * @tags 基础查询
   * @name FinanceBasicQueryCustomerList
   * @summary 客户列表查询
   * @request POST:/api/finance/basic/queryCustomerList
   * @response `200` `CustomerListQueryResp` OK
   */
  export namespace FinanceBasicQueryCustomerList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CustomerListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CustomerListQueryResp;
  }

  /**
   * No description
   * @tags 基础查询
   * @name FinanceBasicQueryCustomsDeclarationPlanList
   * @summary 报关计划查询
   * @request POST:/api/finance/basic/queryCustomsDeclarationPlanList
   * @response `200` `CustomsDeclarationPlanListResp` OK
   */
  export namespace FinanceBasicQueryCustomsDeclarationPlanList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CustomsDeclarationPlanListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CustomsDeclarationPlanListResp;
  }

  /**
   * No description
   * @tags 基础查询
   * @name FinanceBasicQueryDepartmentDetail
   * @summary 部门详情查询
   * @request GET:/api/finance/basic/queryDepartmentDetail
   * @response `200` `DepartmentDetailQueryResp` OK
   */
  export namespace FinanceBasicQueryDepartmentDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** deptId */
      deptId: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DepartmentDetailQueryResp;
  }

  /**
   * No description
   * @tags 基础查询
   * @name FinanceBasicQueryDepartmentList
   * @summary 部门列表查询
   * @request POST:/api/finance/basic/queryDepartmentList
   * @response `200` `DepartmentListQueryResp` OK
   */
  export namespace FinanceBasicQueryDepartmentList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DepartmentListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DepartmentListQueryResp;
  }

  /**
   * No description
   * @tags 预算-基础资料
   * @name FinanceBasicQueryExchangeRateDateSelect
   * @summary 汇率日期筛选查询
   * @request GET:/api/finance/basic/queryExchangeRateDateSelect
   * @response `200` `(BudgetBasicSelectResp)[]` OK
   */
  export namespace FinanceBasicQueryExchangeRateDateSelect {
    export type RequestParams = {};
    export type RequestQuery = {
      /** keyword */
      keyword?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = BudgetBasicSelectResp[];
  }

  /**
   * No description
   * @tags 基础查询
   * @name FinanceBasicQueryGtmGroupMappingDetail
   * @summary Gtm分组映射详情查询
   * @request GET:/api/finance/basic/queryGtmGroupMappingDetail
   * @response `200` `GtmGroupMappingDetailResp` OK
   */
  export namespace FinanceBasicQueryGtmGroupMappingDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** productSpu */
      productSpu: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = GtmGroupMappingDetailResp;
  }

  /**
   * No description
   * @tags 基础查询
   * @name FinanceBasicQueryGtmGroupMappingList
   * @summary Gtm分组映射查询
   * @request GET:/api/finance/basic/queryGtmGroupMappingList
   * @response `200` `GtmGroupMappingListResp` OK
   */
  export namespace FinanceBasicQueryGtmGroupMappingList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** @format int32 */
      billType?: number;
      /**
       * 分贝通推送状态: 0-未推送 1-推送成功 2-推送失败
       * @format int32
       */
      fbtPushStatus?: number;
      /**
       * 分贝通关联状态: 0-未关联 1-已关联
       * @format int32
       */
      fbtRelateStatus?: number;
      /** 关键字 */
      keyword?: string;
      /**
       * 页数
       * @format int32
       */
      pageNum?: number;
      /**
       * 每页数量
       * @format int32
       */
      pageSize?: number;
      /**
       * 金蝶推送状态: 0-未推送 1-推送成功 2-推送失败
       * @format int32
       */
      pushStatus?: number;
      /**
       * 金蝶关联状态: 0-未关联 1-已关联
       * @format int32
       */
      relateStatus?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = GtmGroupMappingListResp;
  }

  /**
   * No description
   * @tags 基础查询
   * @name FinanceBasicQueryGtmPlDetail
   * @summary 根据三级分类编码编码查GMT品线
   * @request GET:/api/finance/basic/queryGtmPlDetail
   * @response `200` `GtmPlDetailResp` OK
   */
  export namespace FinanceBasicQueryGtmPlDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 三级类目编码 */
      thirdCategoryCode?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = GtmPlDetailResp;
  }

  /**
   * No description
   * @tags 预算-基础资料
   * @name FinanceBasicQueryGtmPlList
   * @summary GTM品线列表查询
   * @request POST:/api/finance/basic/queryGtmPlList
   * @response `200` `BudgetBasicGtmPlListResp` OK
   */
  export namespace FinanceBasicQueryGtmPlList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = BudgetBasicGtmPlListResp;
  }

  /**
   * No description
   * @tags 基础查询
   * @name FinanceBasicQueryMemberDetail
   * @summary 用户详情查询
   * @request GET:/api/finance/basic/queryMemberDetail
   * @response `200` `MemberDetailQueryResp` OK
   */
  export namespace FinanceBasicQueryMemberDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** memberCode */
      memberCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MemberDetailQueryResp;
  }

  /**
   * No description
   * @tags 基础查询
   * @name FinanceBasicQueryMemberList
   * @summary 用户列表查询
   * @request GET:/api/finance/basic/queryMemberList
   * @response `200` `MemberListQueryResp` OK
   */
  export namespace FinanceBasicQueryMemberList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** @format int32 */
      billType?: number;
      /**
       * 分贝通推送状态: 0-未推送 1-推送成功 2-推送失败
       * @format int32
       */
      fbtPushStatus?: number;
      /**
       * 分贝通关联状态: 0-未关联 1-已关联
       * @format int32
       */
      fbtRelateStatus?: number;
      /**
       * 是否删除: 0-未删除 1-包含已删除的员工
       * @format int32
       */
      hasDeleted?: number;
      /** 关键字 */
      keyword?: string;
      /**
       * 页数
       * @format int32
       */
      pageNum?: number;
      /**
       * 每页数量
       * @format int32
       */
      pageSize?: number;
      /**
       * 金蝶推送状态: 0-未推送 1-推送成功 2-推送失败
       * @format int32
       */
      pushStatus?: number;
      /**
       * 金蝶关联状态: 0-未关联 1-已关联
       * @format int32
       */
      relateStatus?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MemberListQueryResp;
  }

  /**
   * No description
   * @tags 预算-基础资料
   * @name FinanceBasicQueryMsrpPriceList
   * @summary 售价信息列表查询
   * @request POST:/api/finance/basic/queryMsrpPriceList
   * @response `200` `BudgetBasicMsrpPriceListResp` OK
   */
  export namespace FinanceBasicQueryMsrpPriceList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BudgetBasicMsrpPriceListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = BudgetBasicMsrpPriceListResp;
  }

  /**
   * No description
   * @tags 基础查询
   * @name FinanceBasicQueryNewProductList
   * @summary 新品年规查询
   * @request GET:/api/finance/basic/queryNewProductList
   * @response `200` `NewProductListResp` OK
   */
  export namespace FinanceBasicQueryNewProductList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** @format int32 */
      billType?: number;
      /**
       * 分贝通推送状态: 0-未推送 1-推送成功 2-推送失败
       * @format int32
       */
      fbtPushStatus?: number;
      /**
       * 分贝通关联状态: 0-未关联 1-已关联
       * @format int32
       */
      fbtRelateStatus?: number;
      /** 关键字 */
      keyword?: string;
      /**
       * 页数
       * @format int32
       */
      pageNum?: number;
      /**
       * 每页数量
       * @format int32
       */
      pageSize?: number;
      /**
       * 金蝶推送状态: 0-未推送 1-推送成功 2-推送失败
       * @format int32
       */
      pushStatus?: number;
      /**
       * 金蝶关联状态: 0-未关联 1-已关联
       * @format int32
       */
      relateStatus?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = NewProductListResp;
  }

  /**
   * No description
   * @tags 预算-基础资料
   * @name FinanceBasicQueryOfflineAreaSelect
   * @summary 线下区域筛选查询
   * @request GET:/api/finance/basic/queryOfflineAreaSelect
   * @response `200` `(BudgetBasicSelectResp)[]` OK
   */
  export namespace FinanceBasicQueryOfflineAreaSelect {
    export type RequestParams = {};
    export type RequestQuery = {
      /** keyword */
      keyword?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = BudgetBasicSelectResp[];
  }

  /**
   * No description
   * @tags 预算-基础资料
   * @name FinanceBasicQueryOnlineAreaSelect
   * @summary 线上区域筛选查询
   * @request GET:/api/finance/basic/queryOnlineAreaSelect
   * @response `200` `(BudgetBasicSelectResp)[]` OK
   */
  export namespace FinanceBasicQueryOnlineAreaSelect {
    export type RequestParams = {};
    export type RequestQuery = {
      /** keyword */
      keyword?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = BudgetBasicSelectResp[];
  }

  /**
   * No description
   * @tags 预算-基础资料
   * @name FinanceBasicQueryOperatorInfoList
   * @summary 运营人员信息列表查询
   * @request POST:/api/finance/basic/queryOperatorInfoList
   * @response `200` `BudgetBasicOperatorInfoListResp` OK
   */
  export namespace FinanceBasicQueryOperatorInfoList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BudgetBasicOperatorInfoReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = BudgetBasicOperatorInfoListResp;
  }

  /**
   * No description
   * @tags 预算-基础资料
   * @name FinanceBasicQueryPlatformSelect
   * @summary 平台筛选查询
   * @request GET:/api/finance/basic/queryPlatformSelect
   * @response `200` `(BudgetBasicSelectResp)[]` OK
   */
  export namespace FinanceBasicQueryPlatformSelect {
    export type RequestParams = {};
    export type RequestQuery = {
      /** keyword */
      keyword?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = BudgetBasicSelectResp[];
  }

  /**
   * No description
   * @tags 预算-基础资料
   * @name FinanceBasicQueryProductDetail
   * @summary 产品信息详情查询
   * @request GET:/api/finance/basic/queryProductDetail
   * @response `200` `BudgetBasicProductResp` OK
   */
  export namespace FinanceBasicQueryProductDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** skuCode */
      skuCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = BudgetBasicProductResp;
  }

  /**
   * No description
   * @tags 基础查询
   * @name FinanceBasicQueryProductList
   * @summary 产品列表查询
   * @request GET:/api/finance/basic/queryProductList
   * @response `200` `ProductListQueryResp` OK
   */
  export namespace FinanceBasicQueryProductList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** @format int32 */
      billType?: number;
      /**
       * 分贝通推送状态: 0-未推送 1-推送成功 2-推送失败
       * @format int32
       */
      fbtPushStatus?: number;
      /**
       * 分贝通关联状态: 0-未关联 1-已关联
       * @format int32
       */
      fbtRelateStatus?: number;
      /** 关键字 */
      keyword?: string;
      /**
       * 页数
       * @format int32
       */
      pageNum?: number;
      /**
       * 每页数量
       * @format int32
       */
      pageSize?: number;
      /**
       * 金蝶推送状态: 0-未推送 1-推送成功 2-推送失败
       * @format int32
       */
      pushStatus?: number;
      /**
       * 金蝶关联状态: 0-未关联 1-已关联
       * @format int32
       */
      relateStatus?: number;
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
   * @tags 预算-基础资料
   * @name FinanceBasicQueryProductList2
   * @summary 产品信息列表查询
   * @request POST:/api/finance/basic/queryProductList
   * @originalName financeBasicQueryProductList
   * @duplicate
   * @response `200` `BudgetBasicProductListResp` OK
   */
  export namespace FinanceBasicQueryProductList2 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BudgetBasicProductListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = BudgetBasicProductListResp;
  }

  /**
   * No description
   * @tags 预算-基础资料
   * @name FinanceBasicQueryPurCostPriceList
   * @summary 采购成本价列表查询
   * @request POST:/api/finance/basic/queryPurCostPriceList
   * @response `200` `BudgetBasicPurCostPriceListResp` OK
   */
  export namespace FinanceBasicQueryPurCostPriceList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BudgetBasicQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = BudgetBasicPurCostPriceListResp;
  }

  /**
   * No description
   * @tags 基础查询
   * @name FinanceBasicQueryRecOrderDetail
   * @summary 对账单详情查询
   * @request GET:/api/finance/basic/queryRecOrderDetail
   * @response `200` `RecOrderQueryResp` OK
   */
  export namespace FinanceBasicQueryRecOrderDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** srmRecBillNo */
      srmRecBillNo: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = RecOrderQueryResp;
  }

  /**
   * No description
   * @tags 基础查询
   * @name FinanceBasicQueryRecOrderList
   * @summary 对账单列表查询
   * @request POST:/api/finance/basic/queryRecOrderList
   * @response `200` `RecOrderListQueryResp` OK
   */
  export namespace FinanceBasicQueryRecOrderList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = RecOrderListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = RecOrderListQueryResp;
  }

  /**
   * No description
   * @tags 预算-基础资料
   * @name FinanceBasicQuerySkuSaleDateList
   * @summary SKU开卖时间列表查询
   * @request POST:/api/finance/basic/querySkuSaleDateList
   * @response `200` `BudgetBasicSkuSaleDateListResp` OK
   */
  export namespace FinanceBasicQuerySkuSaleDateList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BudgetBasicQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = BudgetBasicSkuSaleDateListResp;
  }

  /**
   * No description
   * @tags 基础查询
   * @name FinanceBasicQuerySpuList
   * @summary SPU列表查询
   * @request GET:/api/finance/basic/querySpuList
   * @response `200` `SpuListQueryResp` OK
   */
  export namespace FinanceBasicQuerySpuList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** @format int32 */
      billType?: number;
      /**
       * 分贝通推送状态: 0-未推送 1-推送成功 2-推送失败
       * @format int32
       */
      fbtPushStatus?: number;
      /**
       * 分贝通关联状态: 0-未关联 1-已关联
       * @format int32
       */
      fbtRelateStatus?: number;
      /** 关键字 */
      keyword?: string;
      /**
       * 页数
       * @format int32
       */
      pageNum?: number;
      /**
       * 每页数量
       * @format int32
       */
      pageSize?: number;
      /**
       * 金蝶推送状态: 0-未推送 1-推送成功 2-推送失败
       * @format int32
       */
      pushStatus?: number;
      /**
       * 金蝶关联状态: 0-未关联 1-已关联
       * @format int32
       */
      relateStatus?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SpuListQueryResp;
  }

  /**
   * No description
   * @tags 基础查询
   * @name FinanceBasicQuerySupplierDetail
   * @summary 供应商详情
   * @request GET:/api/finance/basic/querySupplierDetail
   * @response `200` `SupplierDetailQueryResp` OK
   */
  export namespace FinanceBasicQuerySupplierDetail {
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
    export type ResponseBody = SupplierDetailQueryResp;
  }

  /**
   * No description
   * @tags 基础查询
   * @name FinanceBasicQuerySupplierList
   * @summary 供应商列表查询
   * @request GET:/api/finance/basic/querySupplierList
   * @response `200` `SupplierListQueryResp` OK
   */
  export namespace FinanceBasicQuerySupplierList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** @format int32 */
      billType?: number;
      /**
       * 分贝通推送状态: 0-未推送 1-推送成功 2-推送失败
       * @format int32
       */
      fbtPushStatus?: number;
      /**
       * 分贝通关联状态: 0-未关联 1-已关联
       * @format int32
       */
      fbtRelateStatus?: number;
      /** 关键字 */
      keyword?: string;
      /**
       * 页数
       * @format int32
       */
      pageNum?: number;
      /**
       * 每页数量
       * @format int32
       */
      pageSize?: number;
      /**
       * 金蝶推送状态: 0-未推送 1-推送成功 2-推送失败
       * @format int32
       */
      pushStatus?: number;
      /**
       * 金蝶关联状态: 0-未关联 1-已关联
       * @format int32
       */
      relateStatus?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SupplierListQueryResp;
  }

  /**
   * No description
   * @tags 基础查询
   * @name FinanceBasicQueryWarehouseList
   * @summary 仓库列表查询
   * @request GET:/api/finance/basic/queryWarehouseList
   * @response `200` `WarehouseListQueryResp` OK
   */
  export namespace FinanceBasicQueryWarehouseList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** @format int32 */
      billType?: number;
      /** 关键字 */
      keyword?: string;
      /**
       * 当前页
       * @format int32
       */
      pageNum?: number;
      /**
       * 每页数量
       * @format int32
       */
      pageSize?: number;
      /**
       * 推送状态: 0-未推送 1-推送成功 2-推送失败
       * @format int32
       */
      pushStatus?: number;
      /**
       * 关联状态: 0-未关联 1-已关联
       * @format int32
       */
      relateStatus?: number;
      /**
       * 启用状态 0-禁用 1-启用
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
    export type ResponseBody = WarehouseListQueryResp;
  }

  /**
   * No description
   * @tags 预算-基础资料
   * @name FinanceBasicRefreshJobData
   * @summary 刷新数据
   * @request GET:/api/finance/basic/refreshJobData
   * @response `200` `CommonRespVoid` OK
   */
  export namespace FinanceBasicRefreshJobData {
    export type RequestParams = {};
    export type RequestQuery = {
      /** jobHandle */
      jobHandle: string;
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
   * @tags 基础查询
   * @name FinanceBasicSyncKingdeeBill
   * @summary 同步金蝶单据
   * @request POST:/api/finance/basic/syncKingdeeBill
   * @response `200` `CommonRespString` OK
   */
  export namespace FinanceBasicSyncKingdeeBill {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SyncKingdeeBillReq;
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
   * @tags 基础查询
   * @name FinanceBasicSyncThirdSystemBill
   * @summary 同步第三方单据
   * @request POST:/api/finance/basic/syncThirdSystemBill
   * @response `200` `CommonRespVoid` OK
   */
  export namespace FinanceBasicSyncThirdSystemBill {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SyncThirdSystemBillReq;
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
   * @tags 基础查询
   * @name FinanceBasicUpdateBudgetDept
   * @summary 修改预算部门
   * @request POST:/api/finance/basic/updateBudgetDept
   * @response `200` `void` OK
   */
  export namespace FinanceBasicUpdateBudgetDept {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UpdateBudgetDeptReq;
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
   * @tags 基础查询
   * @name FinanceBasicUpdateCustomerOldShopName
   * @summary 客户旧店铺变更
   * @request POST:/api/finance/basic/updateCustomerOldShopName
   * @response `200` `CommonResp` OK
   */
  export namespace FinanceBasicUpdateCustomerOldShopName {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UpdateOldShopSaveReq;
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
   * @tags 基础查询
   * @name FinanceBasicUpdateDeptFee
   * @summary 修改部门费用
   * @request POST:/api/finance/basic/updateDeptFee
   * @response `200` `void` OK
   */
  export namespace FinanceBasicUpdateDeptFee {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UpdateDeptFeeReq;
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
   * @tags 基础查询
   * @name FinanceBasicUpdateJsonConfig
   * @summary 更新jsonconfig
   * @request POST:/api/finance/basic/updateJsonConfig
   * @response `200` `CommonResp` OK
   */
  export namespace FinanceBasicUpdateJsonConfig {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DatabatchConfigReq;
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
   * @tags 基础查询
   * @name FinanceBasicUpdateKingdeeNumber
   * @summary 修改金蝶编码
   * @request POST:/api/finance/basic/updateKingdeeNumber
   * @response `200` `CommonRespString` OK
   */
  export namespace FinanceBasicUpdateKingdeeNumber {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UpdateKingdeeNumberReq;
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
   * @tags 基础查询
   * @name FinanceBasicUpdatePushKingdeeRecOrderTime
   * @summary 发票差异修改时间
   * @request POST:/api/finance/basic/updatePushKingdeeRecOrderTime
   * @response `200` `CommonRespVoid` OK
   */
  export namespace FinanceBasicUpdatePushKingdeeRecOrderTime {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = RecOrderListUpdateTimeReq;
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
   * @tags 基础查询
   * @name FinanceBasicUpdateThirdSystemNumber
   * @summary 修改三方系统编码
   * @request POST:/api/finance/basic/updateThirdSystemNumber
   * @response `200` `CommonRespVoid` OK
   */
  export namespace FinanceBasicUpdateThirdSystemNumber {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UpdateThirdSystemNumberReq;
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
   * @tags 借款单
   * @name FinanceBorrowOrderQueryDetail
   * @summary 详情查询
   * @request GET:/api/finance/borrow/order/queryDetail
   * @response `200` `BorrowOrderDetailResp` OK
   */
  export namespace FinanceBorrowOrderQueryDetail {
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
    export type ResponseBody = BorrowOrderDetailResp;
  }

  /**
   * No description
   * @tags 借款单
   * @name FinanceBorrowOrderQueryList
   * @summary 列表查询
   * @request POST:/api/finance/borrow/order/queryList
   * @response `200` `BorrowOrderListQueryResp` OK
   */
  export namespace FinanceBorrowOrderQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BorrowOrderListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = BorrowOrderListQueryResp;
  }

  /**
   * No description
   * @tags 借款单
   * @name FinanceBorrowOrderQueryRefundDetail
   * @summary 退款单详情查询
   * @request GET:/api/finance/borrow/order/queryRefundDetail
   * @response `200` `BorrowOrderRefundDetailResp` OK
   */
  export namespace FinanceBorrowOrderQueryRefundDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** refuncCode */
      refuncCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = BorrowOrderRefundDetailResp;
  }

  /**
   * No description
   * @tags 借款单
   * @name FinanceBorrowOrderQueryRefundList
   * @summary 退款单列表查询
   * @request POST:/api/finance/borrow/order/queryRefundList
   * @response `200` `BorrowOrderRefundListQueryResp` OK
   */
  export namespace FinanceBorrowOrderQueryRefundList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BorrowOrderRefundListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = BorrowOrderRefundListQueryResp;
  }

  /**
   * No description
   * @tags 预算汇总规则管理
   * @name FinanceBudgetRuleChangeStatus
   * @summary 变更状态
   * @request POST:/api/finance/budgetRule/changeStatus
   * @response `200` `void` OK
   */
  export namespace FinanceBudgetRuleChangeStatus {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BudgetSummaryRuleChangeStatusReq;
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
   * @tags 预算汇总规则管理
   * @name FinanceBudgetRuleFieldNameToCode
   * @summary 字段名转code
   * @request GET:/api/finance/budgetRule/fieldNameToCode
   * @response `200` `CommonRespString` OK
   */
  export namespace FinanceBudgetRuleFieldNameToCode {
    export type RequestParams = {};
    export type RequestQuery = {
      /** fieldName */
      fieldName: string;
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
   * @tags 预算汇总规则管理
   * @name FinanceBudgetRuleFieldNameToCodes
   * @summary 字段名转code
   * @request POST:/api/finance/budgetRule/fieldNameToCodes
   * @response `200` `(FieldNameToCodesReq)[]` OK
   */
  export namespace FinanceBudgetRuleFieldNameToCodes {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FieldNameToCodesReq[];
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = FieldNameToCodesReq[];
  }

  /**
   * No description
   * @tags 预算汇总规则管理
   * @name FinanceBudgetRuleQueryDetail
   * @summary 查询详情
   * @request GET:/api/finance/budgetRule/queryDetail
   * @response `200` `BudgetSummaryRuleDetailBean` OK
   */
  export namespace FinanceBudgetRuleQueryDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** ruleCode */
      ruleCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = BudgetSummaryRuleDetailBean;
  }

  /**
   * No description
   * @tags 预算汇总规则管理
   * @name FinanceBudgetRuleQueryFixedColumnList
   * @summary 获取固定列
   * @request GET:/api/finance/budgetRule/queryFixedColumnList
   * @response `200` `(ColumnBean)[]` OK
   */
  export namespace FinanceBudgetRuleQueryFixedColumnList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ColumnBean[];
  }

  /**
   * No description
   * @tags 预算汇总规则管理
   * @name FinanceBudgetRuleQueryList
   * @summary 列表查询
   * @request POST:/api/finance/budgetRule/queryList
   * @response `200` `BudgetSummaryRuleListResp` OK
   */
  export namespace FinanceBudgetRuleQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BudgetSummaryRuleListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = BudgetSummaryRuleListResp;
  }

  /**
   * No description
   * @tags 预算汇总规则管理
   * @name FinanceBudgetRuleSaveOrUpdate
   * @summary 保存
   * @request POST:/api/finance/budgetRule/saveOrUpdate
   * @response `200` `CommonRespString` OK
   */
  export namespace FinanceBudgetRuleSaveOrUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BudgetSummaryRuleDetailBean;
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
   * @tags 预算汇总规则管理
   * @name FinanceBudgetRuleSaveOrUpdateByOss
   * @summary 保存oss
   * @request POST:/api/finance/budgetRule/saveOrUpdateByOss
   * @response `200` `CommonRespString` OK
   */
  export namespace FinanceBudgetRuleSaveOrUpdateByOss {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UploadReq;
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
   * @tags 预算汇总规则结果管理
   * @name FinanceBudgetRuleSummaryResultExeSignle
   * @summary 更新
   * @request POST:/api/finance/budgetRuleSummary/result/exeSignle
   * @response `200` `void` OK
   */
  export namespace FinanceBudgetRuleSummaryResultExeSignle {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BudgetSummaryRuleResultExeSignleReq;
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
   * @tags 预算汇总规则结果管理
   * @name FinanceBudgetRuleSummaryResultExportList
   * @summary 导出
   * @request POST:/api/finance/budgetRuleSummary/result/exportList
   * @response `200` `CommonExportResp` OK
   */
  export namespace FinanceBudgetRuleSummaryResultExportList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BudgetSummaryRuleResultExportListReq;
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
   * @tags 预算汇总规则结果管理
   * @name FinanceBudgetRuleSummaryResultQueryList
   * @summary 列表查询
   * @request POST:/api/finance/budgetRuleSummary/result/queryList
   * @response `200` `BudgetSummaryRuleResultQueryListResp` OK
   */
  export namespace FinanceBudgetRuleSummaryResultQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BudgetSummaryRuleResultQueryListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = BudgetSummaryRuleResultQueryListResp;
  }

  /**
   * No description
   * @tags 提供给分贝通回调接口
   * @name FinanceCallbackFbtApplyStatusChange
   * @summary 申请单状态变更事件
   * @request POST:/api/finance/callback/fbt/applyStatusChange
   * @response `200` `CommonResp` OK
   */
  export namespace FinanceCallbackFbtApplyStatusChange {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FbtApplyStatusChangeReq;
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
   * @tags 提供给分贝通回调接口
   * @name FinanceCallbackFbtBillStatusChange
   * @summary 账单状态变更事件
   * @request POST:/api/finance/callback/fbt/billStatusChange
   * @response `200` `CommonResp` OK
   */
  export namespace FinanceCallbackFbtBillStatusChange {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FbtBillStatusChangeEventReq;
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
   * @tags 提供给分贝通回调接口
   * @name FinanceCallbackFbtBorrowRefundEvent
   * @summary 借款单还款事件
   * @request POST:/api/finance/callback/fbt/borrowRefundEvent
   * @response `200` `CommonResp` OK
   */
  export namespace FinanceCallbackFbtBorrowRefundEvent {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FbtBorrowRefundEventReq;
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
   * @tags 提供给分贝通回调接口
   * @name FinanceCallbackFbtPayOrderEvent
   * @summary 付款单事件
   * @request POST:/api/finance/callback/fbt/payOrderEvent
   * @response `200` `CommonResp` OK
   */
  export namespace FinanceCallbackFbtPayOrderEvent {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FbtPayOrderEventReq;
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
   * @tags 提供给分贝通回调接口
   * @name FinanceCallbackFbtPayVerificationEvent
   * @summary 付款核销事件
   * @request POST:/api/finance/callback/fbt/payVerificationEvent
   * @response `200` `CommonResp` OK
   */
  export namespace FinanceCallbackFbtPayVerificationEvent {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FbtPayVerificationEventReq;
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
   * @tags 提供给分贝通回调接口
   * @name FinanceCallbackFbtPrivatePayCreate
   * @summary 因私付款单创建事件
   * @request POST:/api/finance/callback/fbt/privatePayCreate
   * @response `200` `CommonResp` OK
   */
  export namespace FinanceCallbackFbtPrivatePayCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FbtPrivatePayCreateEventReq;
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
   * @tags 提供给分贝通回调接口
   * @name FinanceCallbackFbtPublicPayCreateEvent
   * @summary 对公付款单创建
   * @request POST:/api/finance/callback/fbt/publicPayCreateEvent
   * @response `200` `CommonResp` OK
   */
  export namespace FinanceCallbackFbtPublicPayCreateEvent {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FbtPublicPayCreateEventReq;
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
   * @tags CN单
   * @name FinanceCnOrderExportList
   * @summary 导出CN单列表
   * @request POST:/api/finance/cn/order/exportList
   * @response `200` `CommonExportResp` OK
   */
  export namespace FinanceCnOrderExportList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CnOrderListReq;
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
   * @tags CN单
   * @name FinanceCnOrderQueryDetail
   * @summary 详情查询
   * @request GET:/api/finance/cn/order/queryDetail
   * @response `200` `CnOrderDetailResp` OK
   */
  export namespace FinanceCnOrderQueryDetail {
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
    export type ResponseBody = CnOrderDetailResp;
  }

  /**
   * No description
   * @tags CN单
   * @name FinanceCnOrderQueryList
   * @summary CN单列表查询
   * @request POST:/api/finance/cn/order/queryList
   * @response `200` `CnOrderListResp` OK
   */
  export namespace FinanceCnOrderQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CnOrderListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CnOrderListResp;
  }

  /**
   * No description
   * @tags CN单
   * @name FinanceCnOrderQueryWriteOffDetail
   * @summary 核销详情
   * @request POST:/api/finance/cn/order/queryWriteOffDetail
   * @response `200` `WriteOffDetailResp` OK
   */
  export namespace FinanceCnOrderQueryWriteOffDetail {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = string[];
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = WriteOffDetailResp;
  }

  /**
   * No description
   * @tags CN单
   * @name FinanceCnOrderRelatedInvoice
   * @summary 关联发票
   * @request POST:/api/finance/cn/order/relatedInvoice
   * @response `200` `void` OK
   */
  export namespace FinanceCnOrderRelatedInvoice {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CnOrderRelatedInvoiceReq;
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
   * @tags 基础资料-资产信息
   * @name FinanceConsultingProjectDownLoadTemplate
   * @summary 下载批量新增模板
   * @request POST:/api/finance/consulting/project/downLoadTemplate
   * @response `200` `CommonRespString` OK
   */
  export namespace FinanceConsultingProjectDownLoadTemplate {
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
   * @tags 基础资料-资产信息
   * @name FinanceConsultingProjectExport
   * @summary 咨询项目列表导出
   * @request POST:/api/finance/consulting/project/export
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace FinanceConsultingProjectExport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BudgetConsultingProjectListReq;
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
   * @tags 基础资料-资产信息
   * @name FinanceConsultingProjectImportData
   * @summary 咨询项目批量导入
   * @request POST:/api/finance/consulting/project/importData
   * @response `200` `CommonRespVoid` OK
   */
  export namespace FinanceConsultingProjectImportData {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UploadReq;
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
   * @tags 基础资料-资产信息
   * @name FinanceConsultingProjectQueryList
   * @summary 咨询项目列表查询
   * @request POST:/api/finance/consulting/project/queryList
   * @response `200` `BudgetConsultingProjectListResp` OK
   */
  export namespace FinanceConsultingProjectQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BudgetConsultingProjectListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = BudgetConsultingProjectListResp;
  }

  /**
   * No description
   * @tags 基础资料-日常费用
   * @name FinanceCurrentExpenseDownLoadTemplate
   * @summary 下载批量新增模板
   * @request POST:/api/finance/current/expense/downLoadTemplate
   * @response `200` `CommonRespString` OK
   */
  export namespace FinanceCurrentExpenseDownLoadTemplate {
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
   * @tags 基础资料-日常费用
   * @name FinanceCurrentExpenseExport
   * @summary 日常费用列表导出
   * @request POST:/api/finance/current/expense/export
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace FinanceCurrentExpenseExport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BudgetCurrentExpenseListReq;
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
   * @tags 基础资料-日常费用
   * @name FinanceCurrentExpenseImportData
   * @summary 批量导入
   * @request POST:/api/finance/current/expense/importData
   * @response `200` `CommonRespVoid` OK
   */
  export namespace FinanceCurrentExpenseImportData {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UploadReq;
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
   * @tags 基础资料-日常费用
   * @name FinanceCurrentExpenseQueryList
   * @summary 日常费用列表查询
   * @request POST:/api/finance/current/expense/queryList
   * @response `200` `BudgetCurrentExpenseListResp` OK
   */
  export namespace FinanceCurrentExpenseQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BudgetCurrentExpenseListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = BudgetCurrentExpenseListResp;
  }

  /**
   * No description
   * @tags 费控-支付管理
   * @name FinanceExpensePaymentDetail
   * @summary 付款单详情
   * @request POST:/api/finance/expense/payment/detail
   * @response `200` `CommonRespPaymentOrderDetailResp` OK
   */
  export namespace FinanceExpensePaymentDetail {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PaymentOrderDetailReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespPaymentOrderDetailResp;
  }

  /**
   * No description
   * @tags 费控-支付管理
   * @name FinanceExpensePaymentDownload
   * @summary 下载非CBS付款导入模板
   * @request POST:/api/finance/expense/payment/download
   * @response `200` `CommonRespString` OK
   */
  export namespace FinanceExpensePaymentDownload {
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
   * @tags 费控-支付管理
   * @name FinanceExpensePaymentExport
   * @summary 付款单导出
   * @request POST:/api/finance/expense/payment/export
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace FinanceExpensePaymentExport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PaymentOrderListReq;
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
   * @tags 费控-支付管理
   * @name FinanceExpensePaymentImport
   * @summary 非CBS付款导入更新
   * @request POST:/api/finance/expense/payment/import
   * @response `200` `CommonRespVoid` OK
   */
  export namespace FinanceExpensePaymentImport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UploadReq;
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
   * @tags 费控-支付管理
   * @name FinanceExpensePaymentList
   * @summary 付款单列表
   * @request POST:/api/finance/expense/payment/list
   * @response `200` `PaymentOrderListResp` OK
   */
  export namespace FinanceExpensePaymentList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PaymentOrderListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PaymentOrderListResp;
  }

  /**
   * No description
   * @tags 费控-支付管理
   * @name FinanceExpensePaymentObsolete
   * @summary 付款单作废
   * @request POST:/api/finance/expense/payment/obsolete
   * @response `200` `CommonRespPaymentOrderObsoleteResp` OK
   */
  export namespace FinanceExpensePaymentObsolete {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PaymentOrderCodeReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespPaymentOrderObsoleteResp;
  }

  /**
   * No description
   * @tags 费控-支付管理
   * @name FinanceExpensePaymentSaveAttachment
   * @summary 非CBS付款水单截图附件保存
   * @request POST:/api/finance/expense/payment/save/attachment
   * @response `200` `CommonRespVoid` OK
   */
  export namespace FinanceExpensePaymentSaveAttachment {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AttachmentInfoUploadReq[];
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
   * @tags 报销单
   * @name FinanceExpenseReportQueryDetail
   * @summary 详情查询
   * @request GET:/api/finance/expense/report/queryDetail
   * @response `200` `ExpenseReportDetailResp` OK
   */
  export namespace FinanceExpenseReportQueryDetail {
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
    export type ResponseBody = ExpenseReportDetailResp;
  }

  /**
   * No description
   * @tags 报销单
   * @name FinanceExpenseReportQueryList
   * @summary 列表查询
   * @request POST:/api/finance/expense/report/queryList
   * @response `200` `ExpenseReportListQueryResp` OK
   */
  export namespace FinanceExpenseReportQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ExpenseReportListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ExpenseReportListQueryResp;
  }

  /**
   * No description
   * @tags 基础资料-头程单价
   * @name FinanceFirstMileDownLoadTemplate
   * @summary 下载批量新增模板
   * @request POST:/api/finance/first/mile/downLoadTemplate
   * @response `200` `CommonRespString` OK
   */
  export namespace FinanceFirstMileDownLoadTemplate {
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
   * @tags 基础资料-头程单价
   * @name FinanceFirstMileExport
   * @summary 头程单价列表导出
   * @request POST:/api/finance/first/mile/export
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace FinanceFirstMileExport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BudgetFirstMileListReq;
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
   * @tags 基础资料-头程单价
   * @name FinanceFirstMileImportData
   * @summary 批量导入
   * @request POST:/api/finance/first/mile/importData
   * @response `200` `CommonRespVoid` OK
   */
  export namespace FinanceFirstMileImportData {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UploadReq;
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
   * @tags 基础资料-头程单价
   * @name FinanceFirstMileQueryList
   * @summary 头程单价列表查询
   * @request POST:/api/finance/first/mile/queryList
   * @response `200` `BudgetFirstMileListResp` OK
   */
  export namespace FinanceFirstMileQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BudgetFirstMileListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = BudgetFirstMileListResp;
  }

  /**
   * No description
   * @tags 回款单
   * @name FinanceIncomePaymentConfirmationOrderDeletedBatch
   * @summary 批量删除
   * @request POST:/api/finance/income/paymentConfirmationOrder/deletedBatch
   * @response `200` `CommonRespVoid` OK
   */
  export namespace FinanceIncomePaymentConfirmationOrderDeletedBatch {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = IncomePaymentConfirmationOrderBatchDeleteReq;
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
   * @tags 回款单
   * @name FinanceIncomePaymentConfirmationOrderExportQueryList
   * @summary 导出
   * @request POST:/api/finance/income/paymentConfirmationOrder/export/queryList
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace FinanceIncomePaymentConfirmationOrderExportQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = IncomePaymentConfirmationOrderListReq;
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
   * @tags 回款单
   * @name FinanceIncomePaymentConfirmationOrderMarkPushStatus
   * @summary 标记推送状态
   * @request POST:/api/finance/income/paymentConfirmationOrder/markPushStatus
   * @response `200` `CommonRespCommonBatchResp` OK
   */
  export namespace FinanceIncomePaymentConfirmationOrderMarkPushStatus {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = IncomePaymentConfirmationOrderBatchChangePushStatusReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespCommonBatchResp;
  }

  /**
   * No description
   * @tags 回款单
   * @name FinanceIncomePaymentConfirmationOrderPush
   * @summary 推送
   * @request POST:/api/finance/income/paymentConfirmationOrder/push
   * @response `200` `CommonRespVoid` OK
   */
  export namespace FinanceIncomePaymentConfirmationOrderPush {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = IncomePaymentConfirmationOrderPushReq;
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
   * @tags 回款单
   * @name FinanceIncomePaymentConfirmationOrderPushBatch
   * @summary 批量推送
   * @request POST:/api/finance/income/paymentConfirmationOrder/pushBatch
   * @response `200` `CommonRespCommonBatchResp` OK
   */
  export namespace FinanceIncomePaymentConfirmationOrderPushBatch {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = IncomePaymentConfirmationOrderBatchPushReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespCommonBatchResp;
  }

  /**
   * No description
   * @tags 回款单
   * @name FinanceIncomePaymentConfirmationOrderQueryList
   * @summary 列表查询
   * @request POST:/api/finance/income/paymentConfirmationOrder/queryList
   * @response `200` `IncomePaymentConfirmationOrderListResp` OK
   */
  export namespace FinanceIncomePaymentConfirmationOrderQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = IncomePaymentConfirmationOrderListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = IncomePaymentConfirmationOrderListResp;
  }

  /**
   * No description
   * @tags 回款单
   * @name FinanceIncomePaymentConfirmationOrderQueryPushBatchList
   * @summary 列表推送批次
   * @request POST:/api/finance/income/paymentConfirmationOrder/queryPushBatchList
   * @response `200` `IncomePaymentConfirmationOrderPushBatchListResp` OK
   */
  export namespace FinanceIncomePaymentConfirmationOrderQueryPushBatchList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = IncomePaymentConfirmationOrderListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = IncomePaymentConfirmationOrderPushBatchListResp;
  }

  /**
   * No description
   * @tags 收入规则解析
   * @name FinanceIncomeRuleAnalysisExecute
   * @summary 执行
   * @request POST:/api/finance/income/rule/analysis/execute
   * @response `200` `CommonRespVoid` OK
   */
  export namespace FinanceIncomeRuleAnalysisExecute {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = IncomeRuleAnalysisExecuteReq;
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
   * @tags 收入规则解析
   * @name FinanceIncomeRuleAnalysisExecuteBatch
   * @summary 批量执行
   * @request POST:/api/finance/income/rule/analysis/executeBatch
   * @response `200` `CommonRespCommonBatchResp` OK
   */
  export namespace FinanceIncomeRuleAnalysisExecuteBatch {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = IncomeRuleAnalysisExecuteBatchReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespCommonBatchResp;
  }

  /**
   * No description
   * @tags 收入规则解析
   * @name FinanceIncomeRuleAnalysisExecuteMock
   * @summary 执行Mock
   * @request GET:/api/finance/income/rule/analysis/executeMock
   * @deprecated
   * @response `200` `CommonRespVoid` OK
   */
  export namespace FinanceIncomeRuleAnalysisExecuteMock {
    export type RequestParams = {};
    export type RequestQuery = {
      /** override */
      override: boolean;
      /**
       * startId
       * @format int64
       */
      startId: number;
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
   * @tags 收入规则解析
   * @name FinanceIncomeRuleAnalysisQueryByIds
   * @summary 查询主表进度信息
   * @request POST:/api/finance/income/rule/analysis/queryByIds
   * @response `200` `(IncomeRuleAnalysisRecordBean)[]` OK
   */
  export namespace FinanceIncomeRuleAnalysisQueryByIds {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = IncomeRuleAnalysisListIdsReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = IncomeRuleAnalysisRecordBean[];
  }

  /**
   * No description
   * @tags 收入规则解析
   * @name FinanceIncomeRuleAnalysisQueryDetail
   * @summary 查询详情
   * @request GET:/api/finance/income/rule/analysis/queryDetail
   * @response `200` `IncomeIncomeRuleAnalysisDetailResp` OK
   */
  export namespace FinanceIncomeRuleAnalysisQueryDetail {
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
    export type ResponseBody = IncomeIncomeRuleAnalysisDetailResp;
  }

  /**
   * No description
   * @tags 收入规则解析
   * @name FinanceIncomeRuleAnalysisQueryList
   * @summary 列表查询
   * @request POST:/api/finance/income/rule/analysis/queryList
   * @response `200` `IncomeRuleAnalysisListResp` OK
   */
  export namespace FinanceIncomeRuleAnalysisQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = IncomeRuleAnalysisListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = IncomeRuleAnalysisListResp;
  }

  /**
   * No description
   * @tags 收入规则解析
   * @name FinanceIncomeRuleAnalysisSaveConfirmFile
   * @summary 保存手工确认文件
   * @request POST:/api/finance/income/rule/analysis/saveConfirmFile
   * @response `200` `CommonRespVoid` OK
   */
  export namespace FinanceIncomeRuleAnalysisSaveConfirmFile {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = IncomeRuleAnalysisConfirmFileReq;
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
   * @tags 收入规则管理
   * @name FinanceIncomeRuleAssembleAvScriptKey
   * @summary 组装AV脚本key
   * @request POST:/api/finance/income/rule/assembleAvScriptKey
   * @response `200` `CommonRespString` OK
   */
  export namespace FinanceIncomeRuleAssembleAvScriptKey {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = IncomeRuleAssembleAvScriptKeyReq;
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
   * @tags 收入规则管理
   * @name FinanceIncomeRuleChangeStatus
   * @summary 变更状态
   * @request POST:/api/finance/income/rule/changeStatus
   * @response `200` `CommonRespVoid` OK
   */
  export namespace FinanceIncomeRuleChangeStatus {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = IncomeRuleChangeStatusReq;
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
   * @tags 收入规则管理
   * @name FinanceIncomeRuleCopy
   * @summary 复制规则
   * @request POST:/api/finance/income/rule/copy
   * @response `200` `CommonRespString` OK
   */
  export namespace FinanceIncomeRuleCopy {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = IncomeRuleCopyReq;
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
   * @tags 收入规则管理
   * @name FinanceIncomeRuleEnableCheck
   * @summary 规则启用校验,返回值为true给出提示
   * @request POST:/api/finance/income/rule/enable/check
   * @response `200` `IncomeRuleEnableCheckResp` OK
   */
  export namespace FinanceIncomeRuleEnableCheck {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = IncomeRuleEnableCheckReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = IncomeRuleEnableCheckResp;
  }

  /**
   * No description
   * @tags 收入规则管理
   * @name FinanceIncomeRuleJoinText
   * @summary 文本拼接
   * @request POST:/api/finance/income/rule/joinText
   * @response `200` `CommonRespString` OK
   */
  export namespace FinanceIncomeRuleJoinText {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = IncomeRuleAssembleAvScriptKeyReq;
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
   * @tags 收入规则管理
   * @name FinanceIncomeRuleQueryDetail
   * @summary 查询详情
   * @request GET:/api/finance/income/rule/queryDetail
   * @response `200` `IncomeRuleDetailBean` OK
   */
  export namespace FinanceIncomeRuleQueryDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** ruleCode */
      ruleCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = IncomeRuleDetailBean;
  }

  /**
   * No description
   * @tags 收入规则管理
   * @name FinanceIncomeRuleQueryList
   * @summary 列表查询
   * @request POST:/api/finance/income/rule/queryList
   * @response `200` `IncomeRuleListResp` OK
   */
  export namespace FinanceIncomeRuleQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = IncomeRuleListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = IncomeRuleListResp;
  }

  /**
   * No description
   * @tags 收入规则管理
   * @name FinanceIncomeRuleQueryShopCheckList
   * @summary 完成度检查
   * @request POST:/api/finance/income/rule/queryShopCheckList
   * @response `200` `IncomeRuleShopCheckListResp` OK
   */
  export namespace FinanceIncomeRuleQueryShopCheckList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = IncomeRuleShopCheckListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = IncomeRuleShopCheckListResp;
  }

  /**
   * No description
   * @tags 收入规则管理
   * @name FinanceIncomeRuleQueryTableFields
   * @summary 查询表字段
   * @request GET:/api/finance/income/rule/queryTableFields
   * @response `200` `TableFieldListResp` OK
   */
  export namespace FinanceIncomeRuleQueryTableFields {
    export type RequestParams = {};
    export type RequestQuery = {
      /** tableName */
      tableName: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = TableFieldListResp;
  }

  /**
   * No description
   * @tags 收入规则管理
   * @name FinanceIncomeRuleSaveOrUpdate
   * @summary 保存
   * @request POST:/api/finance/income/rule/saveOrUpdate
   * @response `200` `CommonRespString` OK
   */
  export namespace FinanceIncomeRuleSaveOrUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = IncomeRuleDetailBean;
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
   * @tags 收入结算单
   * @name FinanceIncomeStatementOrderDeletedBatch
   * @summary 批量删除
   * @request POST:/api/finance/income/statementOrder/deletedBatch
   * @response `200` `CommonRespVoid` OK
   */
  export namespace FinanceIncomeStatementOrderDeletedBatch {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = IncomeRuleStatementOrderBatchDeletedReq;
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
   * @tags 收入结算单
   * @name FinanceIncomeStatementOrderExportQueryList
   * @summary 导出
   * @request POST:/api/finance/income/statementOrder/export/queryList
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace FinanceIncomeStatementOrderExportQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = IncomeRuleStatementOrderListReq;
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
   * @tags 收入结算单
   * @name FinanceIncomeStatementOrderMarkPushStatus
   * @summary 标记推送状态
   * @request POST:/api/finance/income/statementOrder/markPushStatus
   * @response `200` `CommonRespCommonBatchResp` OK
   */
  export namespace FinanceIncomeStatementOrderMarkPushStatus {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = IncomeRuleStatementOrderBatchChangePushStatuReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespCommonBatchResp;
  }

  /**
   * No description
   * @tags 收入结算单
   * @name FinanceIncomeStatementOrderPush
   * @summary 推送
   * @request POST:/api/finance/income/statementOrder/push
   * @response `200` `CommonRespVoid` OK
   */
  export namespace FinanceIncomeStatementOrderPush {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = IncomeRuleStatementOrderPushReq;
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
   * @tags 收入结算单
   * @name FinanceIncomeStatementOrderPushBatch
   * @summary 批量推送
   * @request POST:/api/finance/income/statementOrder/pushBatch
   * @response `200` `CommonRespCommonBatchResp` OK
   */
  export namespace FinanceIncomeStatementOrderPushBatch {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = IncomeRuleStatementOrderBatchPushReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespCommonBatchResp;
  }

  /**
   * No description
   * @tags 收入结算单
   * @name FinanceIncomeStatementOrderQueryList
   * @summary 列表查询
   * @request POST:/api/finance/income/statementOrder/queryList
   * @response `200` `IncomeRuleStatementOrderListResp` OK
   */
  export namespace FinanceIncomeStatementOrderQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = IncomeRuleStatementOrderListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = IncomeRuleStatementOrderListResp;
  }

  /**
   * No description
   * @tags 收入结算单
   * @name FinanceIncomeStatementOrderQueryPushBatchList
   * @summary 列表推送批次
   * @request POST:/api/finance/income/statementOrder/queryPushBatchList
   * @response `200` `IncomeRuleStatementOrderPushBatchListResp` OK
   */
  export namespace FinanceIncomeStatementOrderQueryPushBatchList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = IncomeRuleStatementOrderListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = IncomeRuleStatementOrderPushBatchListResp;
  }

  /**
   * No description
   * @tags 收入结算单
   * @name FinanceIncomeStatementOrderQueryShopCompareList
   * @summary 查询店铺对比列表数据
   * @request POST:/api/finance/income/statementOrder/queryShopCompareList
   * @response `200` `ShopCompareListResp` OK
   */
  export namespace FinanceIncomeStatementOrderQueryShopCompareList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ShopCompareListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ShopCompareListResp;
  }

  /**
   * No description
   * @tags 收入结算单
   * @name FinanceIncomeStatementOrderQueryShopCompareSumData
   * @summary 查询店铺对比汇总数据
   * @request GET:/api/finance/income/statementOrder/queryShopCompareSumData
   * @response `200` `ShopCompareSumDataResp` OK
   */
  export namespace FinanceIncomeStatementOrderQueryShopCompareSumData {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ShopCompareSumDataResp;
  }

  /**
   * No description
   * @tags 收入结算单
   * @name FinanceIncomeStatementOrderUpdateSupplySku
   * @summary 修改供应链sku
   * @request POST:/api/finance/income/statementOrder/updateSupplySku
   * @response `200` `void` OK
   */
  export namespace FinanceIncomeStatementOrderUpdateSupplySku {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = IncomeRuleStatementOrderListReq;
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
   * @tags 发票
   * @name FinanceInvoiceDelete
   * @summary 删除
   * @request POST:/api/finance/invoice/delete
   * @response `200` `CommonRespVoid` OK
   */
  export namespace FinanceInvoiceDelete {
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
    export type ResponseBody = CommonRespVoid;
  }

  /**
   * No description
   * @tags 发票
   * @name FinanceInvoiceDownloadTemplate
   * @summary 下载导入发票模板
   * @request GET:/api/finance/invoice/downloadTemplate
   * @response `200` `CommonRespString` OK
   */
  export namespace FinanceInvoiceDownloadTemplate {
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
   * @tags 发票
   * @name FinanceInvoiceImportData
   * @summary 导入发票数据
   * @request POST:/api/finance/invoice/importData
   * @response `200` `CommonRespVoid` OK
   */
  export namespace FinanceInvoiceImportData {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UploadReq;
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
   * @tags 发票
   * @name FinanceInvoiceQueryDetail
   * @summary 详情查询
   * @request GET:/api/finance/invoice/queryDetail
   * @response `200` `InvoiceDetailResp` OK
   */
  export namespace FinanceInvoiceQueryDetail {
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
    export type ResponseBody = InvoiceDetailResp;
  }

  /**
   * No description
   * @tags 发票
   * @name FinanceInvoiceQueryList
   * @summary 列表查询
   * @request POST:/api/finance/invoice/queryList
   * @response `200` `InvoiceListResp` OK
   */
  export namespace FinanceInvoiceQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = InvoiceListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = InvoiceListResp;
  }

  /**
   * No description
   * @tags 发票
   * @name FinanceInvoiceReverseWriteOff
   * @summary 发票反核销
   * @request POST:/api/finance/invoice/reverseWriteOff
   * @response `200` `CommonRespVoid` OK
   */
  export namespace FinanceInvoiceReverseWriteOff {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = InvoiceReverseWriteOffReq;
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
   * @tags 发票
   * @name FinanceInvoiceReview
   * @summary 审核/反审核
   * @request POST:/api/finance/invoice/review
   * @response `200` `CommonRespVoid` OK
   */
  export namespace FinanceInvoiceReview {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = InvoiceReviewReq;
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
   * @tags 发票
   * @name FinanceInvoiceSave
   * @summary 保存
   * @request POST:/api/finance/invoice/save
   * @response `200` `CommonRespVoid` OK
   */
  export namespace FinanceInvoiceSave {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = InvoiceSaveReq;
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
   * @tags 基础资料-营销活动
   * @name FinanceMarketingCampaignDownLoadTemplate
   * @summary 下载批量新增模板
   * @request POST:/api/finance/marketing/campaign/downLoadTemplate
   * @response `200` `CommonRespString` OK
   */
  export namespace FinanceMarketingCampaignDownLoadTemplate {
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
   * @tags 基础资料-营销活动
   * @name FinanceMarketingCampaignExport
   * @summary 营销活动列表导出
   * @request POST:/api/finance/marketing/campaign/export
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace FinanceMarketingCampaignExport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BudgetMarketingCampaignListReq;
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
   * @tags 基础资料-营销活动
   * @name FinanceMarketingCampaignImportData
   * @summary 批量导入
   * @request POST:/api/finance/marketing/campaign/importData
   * @response `200` `CommonRespVoid` OK
   */
  export namespace FinanceMarketingCampaignImportData {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UploadReq;
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
   * @tags 基础资料-营销活动
   * @name FinanceMarketingCampaignQueryList
   * @summary 营销活动列表查询
   * @request POST:/api/finance/marketing/campaign/queryList
   * @response `200` `BudgetMarketingCampaignListResp` OK
   */
  export namespace FinanceMarketingCampaignQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BudgetMarketingCampaignListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = BudgetMarketingCampaignListResp;
  }

  /**
   * No description
   * @tags 基础资料-营销费用
   * @name FinanceMarketingCostDownLoadTemplate
   * @summary 下载批量新增模板
   * @request POST:/api/finance/marketing/cost/downLoadTemplate
   * @response `200` `CommonRespString` OK
   */
  export namespace FinanceMarketingCostDownLoadTemplate {
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
   * @tags 基础资料-营销费用
   * @name FinanceMarketingCostExport
   * @summary 营销费用列表导出
   * @request POST:/api/finance/marketing/cost/export
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace FinanceMarketingCostExport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BudgetMarketingCostListReq;
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
   * @tags 基础资料-营销费用
   * @name FinanceMarketingCostImportData
   * @summary 批量导入
   * @request POST:/api/finance/marketing/cost/importData
   * @response `200` `CommonRespVoid` OK
   */
  export namespace FinanceMarketingCostImportData {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UploadReq;
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
   * @tags 基础资料-营销费用
   * @name FinanceMarketingCostQueryList
   * @summary 营销费用列表查询
   * @request POST:/api/finance/marketing/cost/queryList
   * @response `200` `BudgetMarketingCostListResp` OK
   */
  export namespace FinanceMarketingCostQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BudgetMarketingCostListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = BudgetMarketingCostListResp;
  }

  /**
   * No description
   * @tags oa发票
   * @name FinanceOaInvoiceBatchRecognizeInvoice
   * @summary 批量识别发票
   * @request POST:/api/finance/oa/invoice/batchRecognizeInvoice
   * @response `200` `void` OK
   */
  export namespace FinanceOaInvoiceBatchRecognizeInvoice {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = number[];
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
   * @tags oa发票
   * @name FinanceOaInvoiceExportList
   * @summary oa发票列表导出
   * @request POST:/api/finance/oa/invoice/exportList
   * @response `200` `CommonExportResp` OK
   */
  export namespace FinanceOaInvoiceExportList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OaInvoiceListReq;
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
   * @tags oa发票
   * @name FinanceOaInvoiceQueryList
   * @summary oa发票列表查询
   * @request POST:/api/finance/oa/invoice/queryList
   * @response `200` `OAInvoiceListResp` OK
   */
  export namespace FinanceOaInvoiceQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OaInvoiceListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = OAInvoiceListResp;
  }

  /**
   * No description
   * @tags oa发票
   * @name FinanceOaInvoiceQueryProcessList
   * @summary 流程表单查询
   * @request GET:/api/finance/oa/invoice/queryProcessList
   * @response `200` `(BudgetBasicSelectResp)[]` OK
   */
  export namespace FinanceOaInvoiceQueryProcessList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = BudgetBasicSelectResp[];
  }

  /**
   * No description
   * @tags OA付款单
   * @name FinanceOaPaymentOrderExportList
   * @summary 导出列表
   * @request POST:/api/finance/oaPaymentOrder/exportList
   * @response `200` `CommonExportResp` OK
   */
  export namespace FinanceOaPaymentOrderExportList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OaPaymentOrderQueryListReq;
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
   * @tags OA付款单
   * @name FinanceOaPaymentOrderMarkPushStatus
   * @summary 标记推送状态
   * @request POST:/api/finance/oaPaymentOrder/markPushStatus
   * @response `200` `CommonRespVoid` OK
   */
  export namespace FinanceOaPaymentOrderMarkPushStatus {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OaPaymentOrderBatchChangePushStatusReq;
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
   * @tags OA付款单
   * @name FinanceOaPaymentOrderPushList
   * @summary 推送所选
   * @request POST:/api/finance/oaPaymentOrder/pushList
   * @response `200` `CommonRespVoid` OK
   */
  export namespace FinanceOaPaymentOrderPushList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OaPaymentOrderQueryListReq;
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
   * @tags OA付款单
   * @name FinanceOaPaymentOrderQueryDetail
   * @summary 订单详情
   * @request GET:/api/finance/oaPaymentOrder/queryDetail
   * @response `200` `OaPaymentDetailBean` OK
   */
  export namespace FinanceOaPaymentOrderQueryDetail {
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
    export type ResponseBody = OaPaymentDetailBean;
  }

  /**
   * No description
   * @tags OA付款单
   * @name FinanceOaPaymentOrderQueryList
   * @summary 列表查询
   * @request POST:/api/finance/oaPaymentOrder/queryList
   * @response `200` `OaPaymentOrderQueryListResp` OK
   */
  export namespace FinanceOaPaymentOrderQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OaPaymentOrderQueryListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = OaPaymentOrderQueryListResp;
  }

  /**
   * No description
   * @tags OA付款单
   * @name FinanceOaPaymentOrderUpdate
   * @summary 更新
   * @request POST:/api/finance/oaPaymentOrder/update
   * @response `200` `CommonRespVoid` OK
   */
  export namespace FinanceOaPaymentOrderUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OaPaymentOrderCodeUpdateReq;
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
   * @tags OA付款单
   * @name FinanceOaPaymentOrderUpdateListData
   * @summary 更新列表数据
   * @request POST:/api/finance/oaPaymentOrder/updateListData
   * @response `200` `CommonRespVoid` OK
   */
  export namespace FinanceOaPaymentOrderUpdateListData {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OaPaymentOrderListUpdateReq;
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
   * @tags 线下调拨单
   * @name FinanceOfflineTransferOrderExportDetailList
   * @summary 导出详情
   * @request POST:/api/finance/offline/transfer/order/exportDetailList
   * @response `200` `CommonExportResp` OK
   */
  export namespace FinanceOfflineTransferOrderExportDetailList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OfflineTransferOrderListQueryReq;
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
   * @tags 线下调拨单
   * @name FinanceOfflineTransferOrderMarkPushStatus
   * @summary 标记推送状态
   * @request POST:/api/finance/offline/transfer/order/markPushStatus
   * @response `200` `CommonRespObject` OK
   */
  export namespace FinanceOfflineTransferOrderMarkPushStatus {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OfflineTransferBatchChangePushStatusReq;
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
   * @tags 线下调拨单
   * @name FinanceOfflineTransferOrderQueryDetail
   * @summary 订单详情
   * @request GET:/api/finance/offline/transfer/order/queryDetail
   * @response `200` `OfflineTransferOrderDetailResp` OK
   */
  export namespace FinanceOfflineTransferOrderQueryDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * 订单类型: 40-调拨入库单 41-调拨出库单
       * @format int32
       */
      billType: number;
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
    export type ResponseBody = OfflineTransferOrderDetailResp;
  }

  /**
   * No description
   * @tags 线下调拨单
   * @name FinanceOfflineTransferOrderQueryList
   * @summary 列表查询
   * @request POST:/api/finance/offline/transfer/order/queryList
   * @response `200` `OfflineTransferOrderQueryListResp` OK
   */
  export namespace FinanceOfflineTransferOrderQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OfflineTransferOrderListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = OfflineTransferOrderQueryListResp;
  }

  /**
   * No description
   * @tags 其他出入库单模块
   * @name FinanceOtherInoutStockOrderExportDetailList
   * @summary 导出详情
   * @request POST:/api/finance/other/inout/stock/order/exportDetailList
   * @response `200` `CommonExportResp` OK
   */
  export namespace FinanceOtherInoutStockOrderExportDetailList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OtherInOutStockQueryReq;
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
   * @tags 其他出入库单模块
   * @name FinanceOtherInoutStockOrderMarkPushStatus
   * @summary 标记推送状态
   * @request POST:/api/finance/other/inout/stock/order/markPushStatus
   * @response `200` `CommonRespObject` OK
   */
  export namespace FinanceOtherInoutStockOrderMarkPushStatus {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OtherInOutStockBatchChangePushStatusReq;
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
   * @tags 其他出入库单模块
   * @name FinanceOtherInoutStockOrderQueryInStockDetail
   * @summary 入库单订单详情
   * @request GET:/api/finance/other/inout/stock/order/queryInStockDetail
   * @response `200` `ErpOtherInStockDetailResp` OK
   */
  export namespace FinanceOtherInoutStockOrderQueryInStockDetail {
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
    export type ResponseBody = ErpOtherInStockDetailResp;
  }

  /**
   * No description
   * @tags 其他出入库单模块
   * @name FinanceOtherInoutStockOrderQueryList
   * @summary 列表查询
   * @request POST:/api/finance/other/inout/stock/order/queryList
   * @response `200` `OtherInOutStockQueryListResp` OK
   */
  export namespace FinanceOtherInoutStockOrderQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OtherInOutStockQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = OtherInOutStockQueryListResp;
  }

  /**
   * No description
   * @tags 其他出入库单模块
   * @name FinanceOtherInoutStockOrderQueryOutStockDetail
   * @summary 出库单订单详情
   * @request GET:/api/finance/other/inout/stock/order/queryOutStockDetail
   * @response `200` `ErpOtherOutStockDetailResp` OK
   */
  export namespace FinanceOtherInoutStockOrderQueryOutStockDetail {
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
    export type ResponseBody = ErpOtherOutStockDetailResp;
  }

  /**
   * No description
   * @tags 付款申请单
   * @name FinancePayQueryApplyOrderDetail
   * @summary 付款申请单详情查询
   * @request GET:/api/finance/pay/queryApplyOrderDetail
   * @response `200` `PayApplyOrderDetailResp` OK
   */
  export namespace FinancePayQueryApplyOrderDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** payApplyBillNo */
      payApplyBillNo: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PayApplyOrderDetailResp;
  }

  /**
   * No description
   * @tags 付款申请单
   * @name FinancePayQueryApplyOrderList
   * @summary 付款申请单列表查询
   * @request POST:/api/finance/pay/queryApplyOrderList
   * @response `200` `PayApplyOrderListResp` OK
   */
  export namespace FinancePayQueryApplyOrderList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PayApplyOrderListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PayApplyOrderListResp;
  }

  /**
   * No description
   * @tags 应付单
   * @name FinancePayableBillQueryDetail
   * @summary 详情查询
   * @request GET:/api/finance/payable/bill/queryDetail
   * @response `200` `PayableBillDetailQueryResp` OK
   */
  export namespace FinancePayableBillQueryDetail {
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
    export type ResponseBody = PayableBillDetailQueryResp;
  }

  /**
   * No description
   * @tags 应付单
   * @name FinancePayableBillQueryList
   * @summary 列表查询
   * @request POST:/api/finance/payable/bill/queryList
   * @response `200` `PayableBillListQueryResp` OK
   */
  export namespace FinancePayableBillQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PayableBillListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PayableBillListQueryResp;
  }

  /**
   * No description
   * @tags 回款-toB
   * @name FinancePaymentCollectionBatchDelete
   * @summary 批量删除回款
   * @request POST:/api/finance/payment/collection/batchDelete
   * @response `200` `CommonRespVoid` OK
   */
  export namespace FinancePaymentCollectionBatchDelete {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = string[];
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
   * @tags 回款-toB
   * @name FinancePaymentCollectionCancelClaim
   * @summary 撤销认领
   * @request POST:/api/finance/payment/collection/cancel/claim
   * @response `200` `CommonRespVoid` OK
   */
  export namespace FinancePaymentCollectionCancelClaim {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PaymentCollectionCancelClaimReq;
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
   * @tags 回款-toB
   * @name FinancePaymentCollectionClaim
   * @summary 获取认领信息
   * @request POST:/api/finance/payment/collection/claim
   * @response `200` `PaymentCollectionClaimResp` OK
   */
  export namespace FinancePaymentCollectionClaim {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PaymentCollectionClaimReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PaymentCollectionClaimResp;
  }

  /**
   * No description
   * @tags 回款-toB
   * @name FinancePaymentCollectionDefaultApportion
   * @summary 选择发票默认分摊
   * @request POST:/api/finance/payment/collection/default/apportion
   * @response `200` `PaymentCollectionClaimResp` OK
   */
  export namespace FinancePaymentCollectionDefaultApportion {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DefaultApportionSelectedInvoiceReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PaymentCollectionClaimResp;
  }

  /**
   * No description
   * @tags 回款-toB
   * @name FinancePaymentCollectionDownloadTemplate
   * @summary 下载导入回款模板
   * @request GET:/api/finance/payment/collection/downloadTemplate
   * @response `200` `CommonRespString` OK
   */
  export namespace FinancePaymentCollectionDownloadTemplate {
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
   * @tags 回款-toB
   * @name FinancePaymentCollectionExportList
   * @summary 导出回款列表
   * @request POST:/api/finance/payment/collection/exportList
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace FinancePaymentCollectionExportList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PaymentCollectionListReq;
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
   * @tags 回款-toB
   * @name FinancePaymentCollectionImportData
   * @summary 导入回款数据
   * @request POST:/api/finance/payment/collection/importData
   * @response `200` `CommonRespVoid` OK
   */
  export namespace FinancePaymentCollectionImportData {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UploadReq;
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
   * @tags 回款-toB
   * @name FinancePaymentCollectionPublish
   * @summary 回款信息发布
   * @request POST:/api/finance/payment/collection/publish
   * @response `200` `CommonRespVoid` OK
   */
  export namespace FinancePaymentCollectionPublish {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PaymentCollectionPublishReq;
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
   * @tags 回款-toB
   * @name FinancePaymentCollectionQueryDetail
   * @summary 回款详情查询
   * @request GET:/api/finance/payment/collection/queryDetail
   * @response `200` `PaymentCollectionDetailResp` OK
   */
  export namespace FinancePaymentCollectionQueryDetail {
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
    export type ResponseBody = PaymentCollectionDetailResp;
  }

  /**
   * No description
   * @tags 回款-toB
   * @name FinancePaymentCollectionQueryList
   * @summary 回款列表查询
   * @request POST:/api/finance/payment/collection/queryList
   * @response `200` `PaymentCollectionListResp` OK
   */
  export namespace FinancePaymentCollectionQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PaymentCollectionListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PaymentCollectionListResp;
  }

  /**
   * No description
   * @tags 回款-toB
   * @name FinancePaymentCollectionRelatedCustomer
   * @summary 关联客户
   * @request POST:/api/finance/payment/collection/relatedCustomer
   * @response `200` `CommonRespVoid` OK
   */
  export namespace FinancePaymentCollectionRelatedCustomer {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PaymentCollectionLinkCustomerReq;
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
   * @tags 回款-toB
   * @name FinancePaymentCollectionRelatedInvoice
   * @summary 关联发票
   * @request POST:/api/finance/payment/collection/relatedInvoice
   * @response `200` `CommonRespVoid` OK
   */
  export namespace FinancePaymentCollectionRelatedInvoice {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PaymentCollectionRelatedInvoiceReq;
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
   * @tags 回款-toB
   * @name FinancePaymentCollectionRevocation
   * @summary 回款信息撤销发布
   * @request POST:/api/finance/payment/collection/revocation
   * @response `200` `CommonRespVoid` OK
   */
  export namespace FinancePaymentCollectionRevocation {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PaymentCollectionPublishReq;
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
   * @tags 回款-toB
   * @name FinancePaymentCollectionSaveFee
   * @summary 更新手续费
   * @request POST:/api/finance/payment/collection/save/fee
   * @response `200` `CommonRespVoid` OK
   */
  export namespace FinancePaymentCollectionSaveFee {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PaymentCollectionSaveFeeReq;
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
   * @tags 回款-toB
   * @name FinancePaymentCollectionSaveOrUpdate
   * @summary 新增或修改回款
   * @request POST:/api/finance/payment/collection/saveOrUpdate
   * @response `200` `CommonRespVoid` OK
   */
  export namespace FinancePaymentCollectionSaveOrUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PaymentCollectionAddReq;
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
   * @tags 平台订单
   * @name FinancePlatformOrderDeletedBatch
   * @summary 批量删除
   * @request POST:/api/finance/platform/order/deletedBatch
   * @response `200` `CommonRespVoid` OK
   */
  export namespace FinancePlatformOrderDeletedBatch {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlatformOrderBatchDeletedReq;
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
   * @tags 平台订单
   * @name FinancePlatformOrderExport
   * @summary 导出
   * @request POST:/api/finance/platform/order/export
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace FinancePlatformOrderExport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlatformOrderListReq;
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
   * @tags 平台订单
   * @name FinancePlatformOrderMarkPushStatus
   * @summary 标记推送状态
   * @request POST:/api/finance/platform/order/markPushStatus
   * @response `200` `CommonRespCommonBatchResp` OK
   */
  export namespace FinancePlatformOrderMarkPushStatus {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlatformOrderBatchChangePushStatuReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespCommonBatchResp;
  }

  /**
   * No description
   * @tags 平台订单
   * @name FinancePlatformOrderPushBatch
   * @summary 批量推送
   * @request POST:/api/finance/platform/order/pushBatch
   * @response `200` `CommonRespCommonBatchResp` OK
   */
  export namespace FinancePlatformOrderPushBatch {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlatformOrderBatchPushReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespCommonBatchResp;
  }

  /**
   * No description
   * @tags 平台订单
   * @name FinancePlatformOrderQueryDetailHeader
   * @summary 查询详情表头
   * @request POST:/api/finance/platform/order/queryDetailHeader
   * @response `200` `PlatformOrderDetailHeaderResp` OK
   */
  export namespace FinancePlatformOrderQueryDetailHeader {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlatformOrderDetailHeaderReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PlatformOrderDetailHeaderResp;
  }

  /**
   * No description
   * @tags 平台订单
   * @name FinancePlatformOrderQueryItemList
   * @summary 明细查询
   * @request POST:/api/finance/platform/order/queryItemList
   * @response `200` `PlatformOrderItemListResp` OK
   */
  export namespace FinancePlatformOrderQueryItemList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlatformOrderItemListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PlatformOrderItemListResp;
  }

  /**
   * No description
   * @tags 平台订单
   * @name FinancePlatformOrderQueryList
   * @summary 列表查询
   * @request POST:/api/finance/platform/order/queryList
   * @response `200` `PlatformOrderListResp` OK
   */
  export namespace FinancePlatformOrderQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlatformOrderListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PlatformOrderListResp;
  }

  /**
   * No description
   * @tags 平台订单
   * @name FinancePlatformOrderQueryPushBatchList
   * @summary 列表推送批次
   * @request POST:/api/finance/platform/order/queryPushBatchList
   * @response `200` `PlatformOrderPushBatchListResp` OK
   */
  export namespace FinancePlatformOrderQueryPushBatchList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlatformOrderListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PlatformOrderPushBatchListResp;
  }

  /**
   * No description
   * @tags 平台订单
   * @name FinancePlatformOrderQueryResultMapping
   * @summary 查询结果映射
   * @request POST:/api/finance/platform/order/queryResultMapping
   * @response `200` `PlatformOrderResultMappingResp` OK
   */
  export namespace FinancePlatformOrderQueryResultMapping {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = string[];
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PlatformOrderResultMappingResp;
  }

  /**
   * No description
   * @tags 平台订单
   * @name FinancePlatformOrderQueryTableConfigs
   * @summary 查询表配置
   * @request GET:/api/finance/platform/order/queryTableConfigs
   * @response `200` `(TableConfigResp)[]` OK
   */
  export namespace FinancePlatformOrderQueryTableConfigs {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = TableConfigResp[];
  }

  /**
   * No description
   * @tags 预处理规则管理
   * @name FinancePretreatmentRuleChangeStatus
   * @summary 变更状态
   * @request POST:/api/finance/pretreatment/rule/changeStatus
   * @response `200` `CommonRespVoid` OK
   */
  export namespace FinancePretreatmentRuleChangeStatus {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = IncomeRuleChangeStatusReq;
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
   * @tags 预处理规则管理
   * @name FinancePretreatmentRuleExe
   * @summary 规则执行
   * @request POST:/api/finance/pretreatment/rule/exe
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace FinancePretreatmentRuleExe {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PretreatmentRuleExeReq;
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
   * @tags 预处理规则管理
   * @name FinancePretreatmentRuleQueryDetail
   * @summary 查询详情
   * @request GET:/api/finance/pretreatment/rule/queryDetail
   * @response `200` `PretreatmentRuleDbDetailBean` OK
   */
  export namespace FinancePretreatmentRuleQueryDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** ruleCode */
      ruleCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PretreatmentRuleDbDetailBean;
  }

  /**
   * No description
   * @tags 预处理规则管理
   * @name FinancePretreatmentRuleQueryList
   * @summary 列表查询
   * @request POST:/api/finance/pretreatment/rule/queryList
   * @response `200` `PretreatmentRuleListResp` OK
   */
  export namespace FinancePretreatmentRuleQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PretreatmentRuleListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PretreatmentRuleListResp;
  }

  /**
   * No description
   * @tags 预处理规则管理
   * @name FinancePretreatmentRuleSaveOrUpdate
   * @summary 保存
   * @request POST:/api/finance/pretreatment/rule/saveOrUpdate
   * @response `200` `CommonRespString` OK
   */
  export namespace FinancePretreatmentRuleSaveOrUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PretreatmentRuleDbDetailBean;
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
   * @tags 基础资料-进销存(采购单价)
   * @name FinancePurchasePriceDownLoadTemplate
   * @summary 下载批量新增模板
   * @request POST:/api/finance/purchase/price/downLoadTemplate
   * @response `200` `CommonRespString` OK
   */
  export namespace FinancePurchasePriceDownLoadTemplate {
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
   * @tags 基础资料-进销存(采购单价)
   * @name FinancePurchasePriceExport
   * @summary 采购单价列表导出
   * @request POST:/api/finance/purchase/price/export
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace FinancePurchasePriceExport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BudgetPurchaseListReq;
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
   * @tags 基础资料-进销存(采购单价)
   * @name FinancePurchasePriceImportData
   * @summary 批量导入
   * @request POST:/api/finance/purchase/price/importData
   * @response `200` `CommonRespVoid` OK
   */
  export namespace FinancePurchasePriceImportData {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UploadReq;
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
   * @tags 基础资料-进销存(采购单价)
   * @name FinancePurchasePriceQueryList
   * @summary 采购单价列表查询
   * @request POST:/api/finance/purchase/price/queryList
   * @response `200` `BudgetPurchaseListResp` OK
   */
  export namespace FinancePurchasePriceQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BudgetPurchaseListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = BudgetPurchaseListResp;
  }

  /**
   * No description
   * @tags 采购管理模块
   * @name FinancePurhcaseExportDetailList
   * @summary 导出详情
   * @request POST:/api/finance/purhcase/exportDetailList
   * @response `200` `CommonExportResp` OK
   */
  export namespace FinancePurhcaseExportDetailList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PurchaseListReq;
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
   * @tags 采购管理模块
   * @name FinancePurhcaseMarkPushStatus
   * @summary 标记推送状态
   * @request POST:/api/finance/purhcase/markPushStatus
   * @response `200` `CommonRespObject` OK
   */
  export namespace FinancePurhcaseMarkPushStatus {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PurchaseOrderBatchChangePushStatusReq;
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
   * @tags 采购管理模块
   * @name FinancePurhcaseQueryList
   * @summary 列表查询
   * @request POST:/api/finance/purhcase/queryList
   * @response `200` `PurchaseListResp` OK
   */
  export namespace FinancePurhcaseQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PurchaseListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PurchaseListResp;
  }

  /**
   * No description
   * @tags 采购管理模块
   * @name FinancePurhcaseQueryPurchaseDetail
   * @summary 采购订单详情
   * @request GET:/api/finance/purhcase/queryPurchaseDetail
   * @response `200` `PurchaseOrderDetailResp` OK
   */
  export namespace FinancePurhcaseQueryPurchaseDetail {
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
    export type ResponseBody = PurchaseOrderDetailResp;
  }

  /**
   * No description
   * @tags 采购管理模块
   * @name FinancePurhcaseQueryPurchaseInStockDetail
   * @summary 采购入库单详情
   * @request GET:/api/finance/purhcase/queryPurchaseInStockDetail
   * @response `200` `PurchaseInStockDetailResp` OK
   */
  export namespace FinancePurhcaseQueryPurchaseInStockDetail {
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
    export type ResponseBody = PurchaseInStockDetailResp;
  }

  /**
   * No description
   * @tags 采购管理模块
   * @name FinancePurhcaseQueryPurchaseReturnDetail
   * @summary 采购退货单详情
   * @request GET:/api/finance/purhcase/queryPurchaseReturnDetail
   * @response `200` `PurchaseRefundDetailResp` OK
   */
  export namespace FinancePurhcaseQueryPurchaseReturnDetail {
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
    export type ResponseBody = PurchaseRefundDetailResp;
  }

  /**
   * No description
   * @tags 收款条件
   * @name FinanceReceiptConditionAdd
   * @summary 新增收款条件
   * @request POST:/api/finance/receipt/condition/add
   * @response `200` `CommonRespString` OK
   */
  export namespace FinanceReceiptConditionAdd {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ReceiptConditionDetailReq;
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
   * @tags 收款条件
   * @name FinanceReceiptConditionQueryList
   * @summary 收款条件列表查询
   * @request POST:/api/finance/receipt/condition/queryList
   * @response `200` `ReceiptConditionListResp` OK
   */
  export namespace FinanceReceiptConditionQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ReceiptConditionListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ReceiptConditionListResp;
  }

  /**
   * No description
   * @tags 收款条件
   * @name FinanceReceiptConditionUpdateStatus
   * @summary 修改状态
   * @request POST:/api/finance/receipt/condition/updateStatus
   * @response `200` `CommonRespString` OK
   */
  export namespace FinanceReceiptConditionUpdateStatus {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ReceiptConditionUpdateStatusReq;
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
   * @tags 销售出库单
   * @name FinanceSalesOutStockOrderExportList
   * @summary 导出列表
   * @request POST:/api/finance/sales/outStock/order/exportList
   * @response `200` `CommonExportResp` OK
   */
  export namespace FinanceSalesOutStockOrderExportList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SalesOutStockOrderListQueryReq;
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
   * @tags 销售出库单
   * @name FinanceSalesOutStockOrderMarkPushStatus
   * @summary 标记推送状态
   * @request POST:/api/finance/sales/outStock/order/markPushStatus
   * @response `200` `CommonRespObject` OK
   */
  export namespace FinanceSalesOutStockOrderMarkPushStatus {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SalesOutStockOrderBatchChangePushStatusReq;
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
   * @tags 销售出库单
   * @name FinanceSalesOutStockOrderPushByCondition
   * @summary 按条件推送
   * @request POST:/api/finance/sales/outStock/order/pushByCondition
   * @response `200` `CommonRespObject` OK
   */
  export namespace FinanceSalesOutStockOrderPushByCondition {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SalesOutStockOrderListQueryReq;
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
   * @tags 销售出库单
   * @name FinanceSalesOutStockOrderQueryList
   * @summary 列表查询
   * @request POST:/api/finance/sales/outStock/order/queryList
   * @response `200` `SalesOutStockOrderQueryListResp` OK
   */
  export namespace FinanceSalesOutStockOrderQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SalesOutStockOrderListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SalesOutStockOrderQueryListResp;
  }

  /**
   * No description
   * @tags 销售出库单
   * @name FinanceSalesOutStockOrderUpdateOutTime
   * @summary 更新单据的出库时间
   * @request POST:/api/finance/sales/outStock/order/updateOutTime
   * @response `200` `CommonRespObject` OK
   */
  export namespace FinanceSalesOutStockOrderUpdateOutTime {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SalesOutStockOrderUpdateOutTimeReq;
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
   * @tags 基础资料-Sell In单价
   * @name FinanceSellInDownLoadTemplate
   * @summary 下载批量新增模板
   * @request POST:/api/finance/sell/in/downLoadTemplate
   * @response `200` `CommonRespString` OK
   */
  export namespace FinanceSellInDownLoadTemplate {
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
   * @tags 基础资料-Sell In单价
   * @name FinanceSellInExport
   * @summary Sell In 单价列表导出
   * @request POST:/api/finance/sell/in/export
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace FinanceSellInExport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BudgetSellInListReq;
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
   * @tags 基础资料-Sell In单价
   * @name FinanceSellInImportData
   * @summary 批量导入
   * @request POST:/api/finance/sell/in/importData
   * @response `200` `CommonRespVoid` OK
   */
  export namespace FinanceSellInImportData {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UploadReq;
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
   * @tags 基础资料-Sell In单价
   * @name FinanceSellInQueryList
   * @summary Sell In 单价列表查询
   * @request POST:/api/finance/sell/in/queryList
   * @response `200` `BudgetSellInListResp` OK
   */
  export namespace FinanceSellInQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BudgetSellInListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = BudgetSellInListResp;
  }

  /**
   * No description
   * @tags toB结算单
   * @name FinanceStatementExportList
   * @summary 结算单导出
   * @request POST:/api/finance/statement/exportList
   * @response `200` `CommonExportResp` OK
   */
  export namespace FinanceStatementExportList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SettlementFormListReq;
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
   * @tags toB结算单
   * @name FinanceStatementQueryBillingInfo
   * @summary 获取开票信息
   * @request POST:/api/finance/statement/queryBillingInfo
   * @response `200` `BillingInfoResp` OK
   */
  export namespace FinanceStatementQueryBillingInfo {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BillingInfoReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = BillingInfoResp;
  }

  /**
   * No description
   * @tags toB结算单
   * @name FinanceStatementQueryCreditLimit
   * @summary 查询客户信用额度
   * @request POST:/api/finance/statement/queryCreditLimit
   * @response `200` `CustomerCreditLimitResp` OK
   */
  export namespace FinanceStatementQueryCreditLimit {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CustomerCreditLimitReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CustomerCreditLimitResp;
  }

  /**
   * No description
   * @tags toB结算单
   * @name FinanceStatementQueryDetail
   * @summary 详情查询
   * @request GET:/api/finance/statement/queryDetail
   * @response `200` `SettlementFormDetailResp` OK
   */
  export namespace FinanceStatementQueryDetail {
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
    export type ResponseBody = SettlementFormDetailResp;
  }

  /**
   * No description
   * @tags toB结算单
   * @name FinanceStatementQueryList
   * @summary 列表查询
   * @request POST:/api/finance/statement/queryList
   * @response `200` `SettlementFormListResp` OK
   */
  export namespace FinanceStatementQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SettlementFormListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SettlementFormListResp;
  }

  /**
   * No description
   * @tags 调拨单
   * @name FinanceTransferSlipQueryDetail
   * @summary 详情查询
   * @request GET:/api/finance/transfer/slip/queryDetail
   * @response `200` `TransferSlipDetailQueryResp` OK
   */
  export namespace FinanceTransferSlipQueryDetail {
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
    export type ResponseBody = TransferSlipDetailQueryResp;
  }

  /**
   * No description
   * @tags 调拨单
   * @name FinanceTransferSlipQueryList
   * @summary 列表查询
   * @request POST:/api/finance/transfer/slip/queryList
   * @response `200` `TransferSlipListQueryResp` OK
   */
  export namespace FinanceTransferSlipQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TransferSlipListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = TransferSlipListQueryResp;
  }
}
