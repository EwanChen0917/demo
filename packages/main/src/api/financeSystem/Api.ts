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
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags 应收账龄
   * @name FinanceAgingDetail
   * @summary 明细
   * @request POST:/api/finance/aging/detail
   * @response `200` `AccountAgingDetailStatisticsResp` OK
   */
  financeAgingDetail = (req: AgingDetailStatisticsReq, params: RequestParams = {}) =>
    this.request<AccountAgingDetailStatisticsResp, any>({
      path: `/api/finance/aging/detail`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 应收账龄
   * @name FinanceAgingDetailExport
   * @summary 明细导出
   * @request POST:/api/finance/aging/detail/export
   * @response `200` `CommonRespCommonExportResp` OK
   */
  financeAgingDetailExport = (req: AgingDetailStatisticsReq, params: RequestParams = {}) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/finance/aging/detail/export`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 应收账龄
   * @name FinanceAgingSummaryExport
   * @summary 汇总导出
   * @request POST:/api/finance/aging/summary/export
   * @response `200` `CommonRespCommonExportResp` OK
   */
  financeAgingSummaryExport = (req: AgingSummaryStatisticsReq, params: RequestParams = {}) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/finance/aging/summary/export`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 应收账龄
   * @name FinanceAgingSummaryStatistics
   * @summary 汇总统计
   * @request POST:/api/finance/aging/summary/statistics
   * @response `200` `AccountAgingSummaryStatisticsResp` OK
   */
  financeAgingSummaryStatistics = (req: AgingSummaryStatisticsReq, params: RequestParams = {}) =>
    this.request<AccountAgingSummaryStatisticsResp, any>({
      path: `/api/finance/aging/summary/statistics`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 基础资料-资产信息
   * @name FinanceAssetInfoDownLoadTemplate
   * @summary 下载批量新增模板
   * @request POST:/api/finance/asset/info/downLoadTemplate
   * @response `200` `CommonRespString` OK
   */
  financeAssetInfoDownLoadTemplate = (params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/finance/asset/info/downLoadTemplate`,
      method: 'POST',
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 基础资料-资产信息
   * @name FinanceAssetInfoExport
   * @summary 资产信息列表导出
   * @request POST:/api/finance/asset/info/export
   * @response `200` `CommonRespCommonExportResp` OK
   */
  financeAssetInfoExport = (req: BudgetAssetInfoListReq, params: RequestParams = {}) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/finance/asset/info/export`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 基础资料-资产信息
   * @name FinanceAssetInfoImportData
   * @summary 批量导入
   * @request POST:/api/finance/asset/info/importData
   * @response `200` `CommonRespVoid` OK
   */
  financeAssetInfoImportData = (req: UploadReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/finance/asset/info/importData`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 基础资料-资产信息
   * @name FinanceAssetInfoQueryList
   * @summary 资产信息列表查询
   * @request POST:/api/finance/asset/info/queryList
   * @response `200` `BudgetAssetInfoListResp` OK
   */
  financeAssetInfoQueryList = (req: BudgetAssetInfoListReq, params: RequestParams = {}) =>
    this.request<BudgetAssetInfoListResp, any>({
      path: `/api/finance/asset/info/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 基础查询
   * @name FinanceBasicBatchSetBudgetDept
   * @summary 批量设置预算部门
   * @request POST:/api/finance/basic/batchSetBudgetDept
   * @response `200` `CommonResp` OK
   */
  financeBasicBatchSetBudgetDept = (req: BatchSetBudgetDeptReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/finance/basic/batchSetBudgetDept`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 基础查询
   * @name FinanceBasicBatchSyncThirdSystemBill
   * @summary 批量同步第三方单据
   * @request POST:/api/finance/basic/batchSyncThirdSystemBill
   * @response `200` `CommonRespVoid` OK
   */
  financeBasicBatchSyncThirdSystemBill = (
    req: SyncThirdSystemBillReq[],
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/finance/basic/batchSyncThirdSystemBill`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 基础查询
   * @name FinanceBasicBatchUpdateCustomsDeclarationStatus
   * @summary 批量修改报关状态
   * @request POST:/api/finance/basic/batchUpdateCustomsDeclarationStatus
   * @response `200` `CommonResp` OK
   */
  financeBasicBatchUpdateCustomsDeclarationStatus = (
    req: BatchUpdateCustomsDeclarationStatusReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonResp, any>({
      path: `/api/finance/basic/batchUpdateCustomsDeclarationStatus`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 基础查询
   * @name FinanceBasicDeletePushKingdeeRecOrder
   * @summary 删除发票对账单推送金蝶信息
   * @request GET:/api/finance/basic/deletePushKingdeeRecOrder
   * @response `200` `CommonRespVoid` OK
   */
  financeBasicDeletePushKingdeeRecOrder = (
    query: {
      /** srmRecBillNo */
      srmRecBillNo: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/finance/basic/deletePushKingdeeRecOrder`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算-基础资料
   * @name FinanceBasicDownloadCurrencyTemplate
   * @summary 下载基准汇率模板
   * @request GET:/api/finance/basic/downloadCurrencyTemplate
   * @response `200` `CommonRespString` OK
   */
  financeBasicDownloadCurrencyTemplate = (params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/finance/basic/downloadCurrencyTemplate`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 基础查询
   * @name FinanceBasicExportQueryRecOrderList
   * @summary 对账单列表导出
   * @request POST:/api/finance/basic/export/queryRecOrderList
   * @response `200` `CommonRespCommonExportResp` OK
   */
  financeBasicExportQueryRecOrderList = (req: RecOrderListQueryReq, params: RequestParams = {}) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/finance/basic/export/queryRecOrderList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 基础查询
   * @name FinanceBasicExportBankAccountList
   * @summary 导出银行账号
   * @request POST:/api/finance/basic/exportBankAccountList
   * @response `200` `CommonRespCommonExportResp` OK
   */
  financeBasicExportBankAccountList = (req: BankAccountListReq, params: RequestParams = {}) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/finance/basic/exportBankAccountList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算-基础资料
   * @name FinanceBasicExportBudgetNewProductList
   * @summary 导出预算研发项目列表
   * @request POST:/api/finance/basic/exportBudgetNewProductList
   * @response `200` `CommonRespCommonExportResp` OK
   */
  financeBasicExportBudgetNewProductList = (
    req: BudgetBasicNewProductReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/finance/basic/exportBudgetNewProductList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算-基础资料
   * @name FinanceBasicExportChannelList
   * @summary 导出渠道信息列表
   * @request POST:/api/finance/basic/exportChannelList
   * @response `200` `CommonRespCommonExportResp` OK
   */
  financeBasicExportChannelList = (req: BudgetBasicChannelReq, params: RequestParams = {}) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/finance/basic/exportChannelList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算-基础资料
   * @name FinanceBasicExportCountryList
   * @summary 导出国家信息列表
   * @request POST:/api/finance/basic/exportCountryList
   * @response `200` `CommonRespCommonExportResp` OK
   */
  financeBasicExportCountryList = (req: BudgetBasicCountryReq, params: RequestParams = {}) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/finance/basic/exportCountryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算-基础资料
   * @name FinanceBasicExportCurrencyList
   * @summary 基准汇率信息列表
   * @request POST:/api/finance/basic/exportCurrencyList
   * @response `200` `CommonRespCommonExportResp` OK
   */
  financeBasicExportCurrencyList = (req: BudgetBasicExchangeRateReq, params: RequestParams = {}) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/finance/basic/exportCurrencyList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 基础查询
   * @name FinanceBasicExportCustomsDeclarationPlanList
   * @summary 报关计划导出
   * @request POST:/api/finance/basic/exportCustomsDeclarationPlanList
   * @response `200` `CommonRespCommonExportResp` OK
   */
  financeBasicExportCustomsDeclarationPlanList = (
    req: CustomsDeclarationPlanListReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/finance/basic/exportCustomsDeclarationPlanList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 基础查询
   * @name FinanceBasicExportDepartmentList
   * @summary 部门列表导出
   * @request POST:/api/finance/basic/exportDepartmentList
   * @response `200` `CommonExportResp` OK
   */
  financeBasicExportDepartmentList = (req: DepartmentListQueryReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/finance/basic/exportDepartmentList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算-基础资料
   * @name FinanceBasicExportGtmPlList
   * @summary 导出GTM品线列表
   * @request POST:/api/finance/basic/exportGtmPlList
   * @response `200` `CommonRespCommonExportResp` OK
   */
  financeBasicExportGtmPlList = (params: RequestParams = {}) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/finance/basic/exportGtmPlList`,
      method: 'POST',
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算-基础资料
   * @name FinanceBasicExportMsrpPriceList
   * @summary 导出售价信息列表
   * @request POST:/api/finance/basic/exportMsrpPriceList
   * @response `200` `CommonRespCommonExportResp` OK
   */
  financeBasicExportMsrpPriceList = (
    req: BudgetBasicMsrpPriceListReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/finance/basic/exportMsrpPriceList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算-基础资料
   * @name FinanceBasicExportOperatorInfoList
   * @summary 导出运营人员信息列表
   * @request POST:/api/finance/basic/exportOperatorInfoList
   * @response `200` `CommonRespCommonExportResp` OK
   */
  financeBasicExportOperatorInfoList = (
    req: BudgetBasicOperatorInfoReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/finance/basic/exportOperatorInfoList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算-基础资料
   * @name FinanceBasicExportProductList
   * @summary 导出产品信息列表
   * @request POST:/api/finance/basic/exportProductList
   * @response `200` `CommonRespCommonExportResp` OK
   */
  financeBasicExportProductList = (req: BudgetBasicProductListReq, params: RequestParams = {}) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/finance/basic/exportProductList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算-基础资料
   * @name FinanceBasicExportPurCostPriceList
   * @summary 导出采购成本价列表
   * @request POST:/api/finance/basic/exportPurCostPriceList
   * @response `200` `CommonRespCommonExportResp` OK
   */
  financeBasicExportPurCostPriceList = (req: BudgetBasicQueryReq, params: RequestParams = {}) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/finance/basic/exportPurCostPriceList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算-基础资料
   * @name FinanceBasicExportSkuSaleDateList
   * @summary 导出SKU开卖时间列表
   * @request POST:/api/finance/basic/exportSkuSaleDateList
   * @response `200` `CommonRespCommonExportResp` OK
   */
  financeBasicExportSkuSaleDateList = (req: BudgetBasicQueryReq, params: RequestParams = {}) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/finance/basic/exportSkuSaleDateList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算-基础资料
   * @name FinanceBasicImportCurrencyData
   * @summary 导入基准汇率数据
   * @request POST:/api/finance/basic/importCurrencyData
   * @response `200` `CommonRespVoid` OK
   */
  financeBasicImportCurrencyData = (req: UploadReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/finance/basic/importCurrencyData`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 基础查询
   * @name FinanceBasicMatchThirdSystemNumber
   * @summary 匹配第三方系统编码
   * @request POST:/api/finance/basic/matchThirdSystemNumber
   * @response `200` `CommonRespString` OK
   */
  financeBasicMatchThirdSystemNumber = (
    req: MatchThirdSystemNumberReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespString, any>({
      path: `/api/finance/basic/matchThirdSystemNumber`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 其他往来单位管理
   * @name FinanceBasicOtherBusinessPartnersExportQueryList
   * @summary 导出-列表查询
   * @request POST:/api/finance/basic/otherBusinessPartners/exportQueryList
   * @response `200` `CommonExportResp` OK
   */
  financeBasicOtherBusinessPartnersExportQueryList = (
    req: OtherBusinessPartnersQueryListReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/finance/basic/otherBusinessPartners/exportQueryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 其他往来单位管理
   * @name FinanceBasicOtherBusinessPartnersQueryList
   * @summary 列表查询
   * @request POST:/api/finance/basic/otherBusinessPartners/queryList
   * @response `200` `CommonRespOtherBusinessPartnersQueryListResp` OK
   */
  financeBasicOtherBusinessPartnersQueryList = (
    req: OtherBusinessPartnersQueryListReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespOtherBusinessPartnersQueryListResp, any>({
      path: `/api/finance/basic/otherBusinessPartners/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 基础功能
   * @name FinanceBasicPlatformRefresh
   * @summary 业务模块-手动刷新
   * @request POST:/api/finance/basic/platform/refresh
   * @response `200` `CommonRespBoolean` OK
   */
  financeBasicPlatformRefresh = (req: ModelRefreshReq, params: RequestParams = {}) =>
    this.request<CommonRespBoolean, any>({
      path: `/api/finance/basic/platform/refresh`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算-基础资料
   * @name FinanceBasicQueryAllAreaSelect
   * @summary 区域筛选查询
   * @request GET:/api/finance/basic/queryAllAreaSelect
   * @response `200` `(BudgetBasicSelectResp)[]` OK
   */
  financeBasicQueryAllAreaSelect = (
    query?: {
      /** keyword */
      keyword?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<BudgetBasicSelectResp[], any>({
      path: `/api/finance/basic/queryAllAreaSelect`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 基础查询
   * @name FinanceBasicQueryBankAccountList
   * @summary 银行账号查询
   * @request POST:/api/finance/basic/queryBankAccountList
   * @response `200` `BankAccountListResp` OK
   */
  financeBasicQueryBankAccountList = (req: BankAccountListReq, params: RequestParams = {}) =>
    this.request<BankAccountListResp, any>({
      path: `/api/finance/basic/queryBankAccountList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 基础查询
   * @name FinanceBasicQueryBudgetDeptList
   * @summary 预算部门列表查询-OA出差审批表单筛选
   * @request GET:/api/finance/basic/queryBudgetDeptList
   * @response `200` `DeptListResp` OK
   */
  financeBasicQueryBudgetDeptList = (params: RequestParams = {}) =>
    this.request<DeptListResp, any>({
      path: `/api/finance/basic/queryBudgetDeptList`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算-基础资料
   * @name FinanceBasicQueryBudgetNewProductList
   * @summary 预算研发项目列表查询
   * @request POST:/api/finance/basic/queryBudgetNewProductList
   * @response `200` `BudgetBasicNewProductListResp` OK
   */
  financeBasicQueryBudgetNewProductList = (
    req: BudgetBasicNewProductReq,
    params: RequestParams = {},
  ) =>
    this.request<BudgetBasicNewProductListResp, any>({
      path: `/api/finance/basic/queryBudgetNewProductList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 基础查询
   * @name FinanceBasicQueryCategoryList
   * @summary 分类列表查询
   * @request GET:/api/finance/basic/queryCategoryList
   * @response `200` `CategoryListQueryResp` OK
   */
  financeBasicQueryCategoryList = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<CategoryListQueryResp, any>({
      path: `/api/finance/basic/queryCategoryList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算-基础资料
   * @name FinanceBasicQueryChannelList
   * @summary 渠道信息列表查询
   * @request POST:/api/finance/basic/queryChannelList
   * @response `200` `BudgetBasicChannelListResp` OK
   */
  financeBasicQueryChannelList = (req: BudgetBasicChannelReq, params: RequestParams = {}) =>
    this.request<BudgetBasicChannelListResp, any>({
      path: `/api/finance/basic/queryChannelList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算-基础资料
   * @name FinanceBasicQueryChannelSelect
   * @summary 渠道筛选查询
   * @request GET:/api/finance/basic/queryChannelSelect
   * @response `200` `(BudgetBasicSelectResp)[]` OK
   */
  financeBasicQueryChannelSelect = (
    query?: {
      /** keyword */
      keyword?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<BudgetBasicSelectResp[], any>({
      path: `/api/finance/basic/queryChannelSelect`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算-基础资料
   * @name FinanceBasicQueryCountryList
   * @summary 国家信息列表查询
   * @request POST:/api/finance/basic/queryCountryList
   * @response `200` `BudgetBasicCountryListResp` OK
   */
  financeBasicQueryCountryList = (req: BudgetBasicCountryReq, params: RequestParams = {}) =>
    this.request<BudgetBasicCountryListResp, any>({
      path: `/api/finance/basic/queryCountryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算-基础资料
   * @name FinanceBasicQueryCurrencyList
   * @summary 基准汇率列表查询
   * @request POST:/api/finance/basic/queryCurrencyList
   * @response `200` `BudgetBasicCurrencyListResp` OK
   */
  financeBasicQueryCurrencyList = (req: BudgetBasicExchangeRateReq, params: RequestParams = {}) =>
    this.request<BudgetBasicCurrencyListResp, any>({
      path: `/api/finance/basic/queryCurrencyList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算-基础资料
   * @name FinanceBasicQueryCurrencySelect
   * @summary 币种筛选查询
   * @request GET:/api/finance/basic/queryCurrencySelect
   * @response `200` `(BudgetBasicSelectResp)[]` OK
   */
  financeBasicQueryCurrencySelect = (
    query?: {
      /** keyword */
      keyword?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<BudgetBasicSelectResp[], any>({
      path: `/api/finance/basic/queryCurrencySelect`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 基础查询
   * @name FinanceBasicQueryCustomerList
   * @summary 客户列表查询
   * @request POST:/api/finance/basic/queryCustomerList
   * @response `200` `CustomerListQueryResp` OK
   */
  financeBasicQueryCustomerList = (req: CustomerListQueryReq, params: RequestParams = {}) =>
    this.request<CustomerListQueryResp, any>({
      path: `/api/finance/basic/queryCustomerList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 基础查询
   * @name FinanceBasicQueryCustomsDeclarationPlanList
   * @summary 报关计划查询
   * @request POST:/api/finance/basic/queryCustomsDeclarationPlanList
   * @response `200` `CustomsDeclarationPlanListResp` OK
   */
  financeBasicQueryCustomsDeclarationPlanList = (
    req: CustomsDeclarationPlanListReq,
    params: RequestParams = {},
  ) =>
    this.request<CustomsDeclarationPlanListResp, any>({
      path: `/api/finance/basic/queryCustomsDeclarationPlanList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 基础查询
   * @name FinanceBasicQueryDepartmentDetail
   * @summary 部门详情查询
   * @request GET:/api/finance/basic/queryDepartmentDetail
   * @response `200` `DepartmentDetailQueryResp` OK
   */
  financeBasicQueryDepartmentDetail = (
    query: {
      /** deptId */
      deptId: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<DepartmentDetailQueryResp, any>({
      path: `/api/finance/basic/queryDepartmentDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 基础查询
   * @name FinanceBasicQueryDepartmentList
   * @summary 部门列表查询
   * @request POST:/api/finance/basic/queryDepartmentList
   * @response `200` `DepartmentListQueryResp` OK
   */
  financeBasicQueryDepartmentList = (req: DepartmentListQueryReq, params: RequestParams = {}) =>
    this.request<DepartmentListQueryResp, any>({
      path: `/api/finance/basic/queryDepartmentList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算-基础资料
   * @name FinanceBasicQueryExchangeRateDateSelect
   * @summary 汇率日期筛选查询
   * @request GET:/api/finance/basic/queryExchangeRateDateSelect
   * @response `200` `(BudgetBasicSelectResp)[]` OK
   */
  financeBasicQueryExchangeRateDateSelect = (
    query?: {
      /** keyword */
      keyword?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<BudgetBasicSelectResp[], any>({
      path: `/api/finance/basic/queryExchangeRateDateSelect`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 基础查询
   * @name FinanceBasicQueryGtmGroupMappingDetail
   * @summary Gtm分组映射详情查询
   * @request GET:/api/finance/basic/queryGtmGroupMappingDetail
   * @response `200` `GtmGroupMappingDetailResp` OK
   */
  financeBasicQueryGtmGroupMappingDetail = (
    query: {
      /** productSpu */
      productSpu: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<GtmGroupMappingDetailResp, any>({
      path: `/api/finance/basic/queryGtmGroupMappingDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 基础查询
   * @name FinanceBasicQueryGtmGroupMappingList
   * @summary Gtm分组映射查询
   * @request GET:/api/finance/basic/queryGtmGroupMappingList
   * @response `200` `GtmGroupMappingListResp` OK
   */
  financeBasicQueryGtmGroupMappingList = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<GtmGroupMappingListResp, any>({
      path: `/api/finance/basic/queryGtmGroupMappingList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 基础查询
   * @name FinanceBasicQueryGtmPlDetail
   * @summary 根据三级分类编码编码查GMT品线
   * @request GET:/api/finance/basic/queryGtmPlDetail
   * @response `200` `GtmPlDetailResp` OK
   */
  financeBasicQueryGtmPlDetail = (
    query?: {
      /** 三级类目编码 */
      thirdCategoryCode?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<GtmPlDetailResp, any>({
      path: `/api/finance/basic/queryGtmPlDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算-基础资料
   * @name FinanceBasicQueryGtmPlList
   * @summary GTM品线列表查询
   * @request POST:/api/finance/basic/queryGtmPlList
   * @response `200` `BudgetBasicGtmPlListResp` OK
   */
  financeBasicQueryGtmPlList = (params: RequestParams = {}) =>
    this.request<BudgetBasicGtmPlListResp, any>({
      path: `/api/finance/basic/queryGtmPlList`,
      method: 'POST',
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 基础查询
   * @name FinanceBasicQueryMemberDetail
   * @summary 用户详情查询
   * @request GET:/api/finance/basic/queryMemberDetail
   * @response `200` `MemberDetailQueryResp` OK
   */
  financeBasicQueryMemberDetail = (
    query: {
      /** memberCode */
      memberCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<MemberDetailQueryResp, any>({
      path: `/api/finance/basic/queryMemberDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 基础查询
   * @name FinanceBasicQueryMemberList
   * @summary 用户列表查询
   * @request GET:/api/finance/basic/queryMemberList
   * @response `200` `MemberListQueryResp` OK
   */
  financeBasicQueryMemberList = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<MemberListQueryResp, any>({
      path: `/api/finance/basic/queryMemberList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算-基础资料
   * @name FinanceBasicQueryMsrpPriceList
   * @summary 售价信息列表查询
   * @request POST:/api/finance/basic/queryMsrpPriceList
   * @response `200` `BudgetBasicMsrpPriceListResp` OK
   */
  financeBasicQueryMsrpPriceList = (req: BudgetBasicMsrpPriceListReq, params: RequestParams = {}) =>
    this.request<BudgetBasicMsrpPriceListResp, any>({
      path: `/api/finance/basic/queryMsrpPriceList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 基础查询
   * @name FinanceBasicQueryNewProductList
   * @summary 新品年规查询
   * @request GET:/api/finance/basic/queryNewProductList
   * @response `200` `NewProductListResp` OK
   */
  financeBasicQueryNewProductList = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<NewProductListResp, any>({
      path: `/api/finance/basic/queryNewProductList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算-基础资料
   * @name FinanceBasicQueryOfflineAreaSelect
   * @summary 线下区域筛选查询
   * @request GET:/api/finance/basic/queryOfflineAreaSelect
   * @response `200` `(BudgetBasicSelectResp)[]` OK
   */
  financeBasicQueryOfflineAreaSelect = (
    query?: {
      /** keyword */
      keyword?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<BudgetBasicSelectResp[], any>({
      path: `/api/finance/basic/queryOfflineAreaSelect`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算-基础资料
   * @name FinanceBasicQueryOnlineAreaSelect
   * @summary 线上区域筛选查询
   * @request GET:/api/finance/basic/queryOnlineAreaSelect
   * @response `200` `(BudgetBasicSelectResp)[]` OK
   */
  financeBasicQueryOnlineAreaSelect = (
    query?: {
      /** keyword */
      keyword?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<BudgetBasicSelectResp[], any>({
      path: `/api/finance/basic/queryOnlineAreaSelect`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算-基础资料
   * @name FinanceBasicQueryOperatorInfoList
   * @summary 运营人员信息列表查询
   * @request POST:/api/finance/basic/queryOperatorInfoList
   * @response `200` `BudgetBasicOperatorInfoListResp` OK
   */
  financeBasicQueryOperatorInfoList = (
    req: BudgetBasicOperatorInfoReq,
    params: RequestParams = {},
  ) =>
    this.request<BudgetBasicOperatorInfoListResp, any>({
      path: `/api/finance/basic/queryOperatorInfoList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算-基础资料
   * @name FinanceBasicQueryPlatformSelect
   * @summary 平台筛选查询
   * @request GET:/api/finance/basic/queryPlatformSelect
   * @response `200` `(BudgetBasicSelectResp)[]` OK
   */
  financeBasicQueryPlatformSelect = (
    query?: {
      /** keyword */
      keyword?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<BudgetBasicSelectResp[], any>({
      path: `/api/finance/basic/queryPlatformSelect`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算-基础资料
   * @name FinanceBasicQueryProductDetail
   * @summary 产品信息详情查询
   * @request GET:/api/finance/basic/queryProductDetail
   * @response `200` `BudgetBasicProductResp` OK
   */
  financeBasicQueryProductDetail = (
    query: {
      /** skuCode */
      skuCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<BudgetBasicProductResp, any>({
      path: `/api/finance/basic/queryProductDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 基础查询
   * @name FinanceBasicQueryProductList
   * @summary 产品列表查询
   * @request GET:/api/finance/basic/queryProductList
   * @response `200` `ProductListQueryResp` OK
   */
  financeBasicQueryProductList = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<ProductListQueryResp, any>({
      path: `/api/finance/basic/queryProductList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算-基础资料
   * @name FinanceBasicQueryProductList2
   * @summary 产品信息列表查询
   * @request POST:/api/finance/basic/queryProductList
   * @originalName financeBasicQueryProductList
   * @duplicate
   * @response `200` `BudgetBasicProductListResp` OK
   */
  financeBasicQueryProductList2 = (req: BudgetBasicProductListReq, params: RequestParams = {}) =>
    this.request<BudgetBasicProductListResp, any>({
      path: `/api/finance/basic/queryProductList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算-基础资料
   * @name FinanceBasicQueryPurCostPriceList
   * @summary 采购成本价列表查询
   * @request POST:/api/finance/basic/queryPurCostPriceList
   * @response `200` `BudgetBasicPurCostPriceListResp` OK
   */
  financeBasicQueryPurCostPriceList = (req: BudgetBasicQueryReq, params: RequestParams = {}) =>
    this.request<BudgetBasicPurCostPriceListResp, any>({
      path: `/api/finance/basic/queryPurCostPriceList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 基础查询
   * @name FinanceBasicQueryRecOrderDetail
   * @summary 对账单详情查询
   * @request GET:/api/finance/basic/queryRecOrderDetail
   * @response `200` `RecOrderQueryResp` OK
   */
  financeBasicQueryRecOrderDetail = (
    query: {
      /** srmRecBillNo */
      srmRecBillNo: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<RecOrderQueryResp, any>({
      path: `/api/finance/basic/queryRecOrderDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 基础查询
   * @name FinanceBasicQueryRecOrderList
   * @summary 对账单列表查询
   * @request POST:/api/finance/basic/queryRecOrderList
   * @response `200` `RecOrderListQueryResp` OK
   */
  financeBasicQueryRecOrderList = (req: RecOrderListQueryReq, params: RequestParams = {}) =>
    this.request<RecOrderListQueryResp, any>({
      path: `/api/finance/basic/queryRecOrderList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算-基础资料
   * @name FinanceBasicQuerySkuSaleDateList
   * @summary SKU开卖时间列表查询
   * @request POST:/api/finance/basic/querySkuSaleDateList
   * @response `200` `BudgetBasicSkuSaleDateListResp` OK
   */
  financeBasicQuerySkuSaleDateList = (req: BudgetBasicQueryReq, params: RequestParams = {}) =>
    this.request<BudgetBasicSkuSaleDateListResp, any>({
      path: `/api/finance/basic/querySkuSaleDateList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 基础查询
   * @name FinanceBasicQuerySpuList
   * @summary SPU列表查询
   * @request GET:/api/finance/basic/querySpuList
   * @response `200` `SpuListQueryResp` OK
   */
  financeBasicQuerySpuList = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<SpuListQueryResp, any>({
      path: `/api/finance/basic/querySpuList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 基础查询
   * @name FinanceBasicQuerySupplierDetail
   * @summary 供应商详情
   * @request GET:/api/finance/basic/querySupplierDetail
   * @response `200` `SupplierDetailQueryResp` OK
   */
  financeBasicQuerySupplierDetail = (
    query: {
      /** code */
      code: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<SupplierDetailQueryResp, any>({
      path: `/api/finance/basic/querySupplierDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 基础查询
   * @name FinanceBasicQuerySupplierList
   * @summary 供应商列表查询
   * @request GET:/api/finance/basic/querySupplierList
   * @response `200` `SupplierListQueryResp` OK
   */
  financeBasicQuerySupplierList = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<SupplierListQueryResp, any>({
      path: `/api/finance/basic/querySupplierList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 基础查询
   * @name FinanceBasicQueryWarehouseList
   * @summary 仓库列表查询
   * @request GET:/api/finance/basic/queryWarehouseList
   * @response `200` `WarehouseListQueryResp` OK
   */
  financeBasicQueryWarehouseList = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<WarehouseListQueryResp, any>({
      path: `/api/finance/basic/queryWarehouseList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算-基础资料
   * @name FinanceBasicRefreshJobData
   * @summary 刷新数据
   * @request GET:/api/finance/basic/refreshJobData
   * @response `200` `CommonRespVoid` OK
   */
  financeBasicRefreshJobData = (
    query: {
      /** jobHandle */
      jobHandle: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/finance/basic/refreshJobData`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 基础查询
   * @name FinanceBasicSyncKingdeeBill
   * @summary 同步金蝶单据
   * @request POST:/api/finance/basic/syncKingdeeBill
   * @response `200` `CommonRespString` OK
   */
  financeBasicSyncKingdeeBill = (req: SyncKingdeeBillReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/finance/basic/syncKingdeeBill`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 基础查询
   * @name FinanceBasicSyncThirdSystemBill
   * @summary 同步第三方单据
   * @request POST:/api/finance/basic/syncThirdSystemBill
   * @response `200` `CommonRespVoid` OK
   */
  financeBasicSyncThirdSystemBill = (req: SyncThirdSystemBillReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/finance/basic/syncThirdSystemBill`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 基础查询
   * @name FinanceBasicUpdateBudgetDept
   * @summary 修改预算部门
   * @request POST:/api/finance/basic/updateBudgetDept
   * @response `200` `void` OK
   */
  financeBasicUpdateBudgetDept = (req: UpdateBudgetDeptReq, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/finance/basic/updateBudgetDept`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 基础查询
   * @name FinanceBasicUpdateCustomerOldShopName
   * @summary 客户旧店铺变更
   * @request POST:/api/finance/basic/updateCustomerOldShopName
   * @response `200` `CommonResp` OK
   */
  financeBasicUpdateCustomerOldShopName = (req: UpdateOldShopSaveReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/finance/basic/updateCustomerOldShopName`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 基础查询
   * @name FinanceBasicUpdateDeptFee
   * @summary 修改部门费用
   * @request POST:/api/finance/basic/updateDeptFee
   * @response `200` `void` OK
   */
  financeBasicUpdateDeptFee = (req: UpdateDeptFeeReq, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/finance/basic/updateDeptFee`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 基础查询
   * @name FinanceBasicUpdateJsonConfig
   * @summary 更新jsonconfig
   * @request POST:/api/finance/basic/updateJsonConfig
   * @response `200` `CommonResp` OK
   */
  financeBasicUpdateJsonConfig = (req: DatabatchConfigReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/finance/basic/updateJsonConfig`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 基础查询
   * @name FinanceBasicUpdateKingdeeNumber
   * @summary 修改金蝶编码
   * @request POST:/api/finance/basic/updateKingdeeNumber
   * @response `200` `CommonRespString` OK
   */
  financeBasicUpdateKingdeeNumber = (req: UpdateKingdeeNumberReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/finance/basic/updateKingdeeNumber`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 基础查询
   * @name FinanceBasicUpdatePushKingdeeRecOrderTime
   * @summary 发票差异修改时间
   * @request POST:/api/finance/basic/updatePushKingdeeRecOrderTime
   * @response `200` `CommonRespVoid` OK
   */
  financeBasicUpdatePushKingdeeRecOrderTime = (
    req: RecOrderListUpdateTimeReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/finance/basic/updatePushKingdeeRecOrderTime`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 基础查询
   * @name FinanceBasicUpdateThirdSystemNumber
   * @summary 修改三方系统编码
   * @request POST:/api/finance/basic/updateThirdSystemNumber
   * @response `200` `CommonRespVoid` OK
   */
  financeBasicUpdateThirdSystemNumber = (
    req: UpdateThirdSystemNumberReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/finance/basic/updateThirdSystemNumber`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 借款单
   * @name FinanceBorrowOrderQueryDetail
   * @summary 详情查询
   * @request GET:/api/finance/borrow/order/queryDetail
   * @response `200` `BorrowOrderDetailResp` OK
   */
  financeBorrowOrderQueryDetail = (
    query: {
      /** code */
      code: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<BorrowOrderDetailResp, any>({
      path: `/api/finance/borrow/order/queryDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 借款单
   * @name FinanceBorrowOrderQueryList
   * @summary 列表查询
   * @request POST:/api/finance/borrow/order/queryList
   * @response `200` `BorrowOrderListQueryResp` OK
   */
  financeBorrowOrderQueryList = (req: BorrowOrderListQueryReq, params: RequestParams = {}) =>
    this.request<BorrowOrderListQueryResp, any>({
      path: `/api/finance/borrow/order/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 借款单
   * @name FinanceBorrowOrderQueryRefundDetail
   * @summary 退款单详情查询
   * @request GET:/api/finance/borrow/order/queryRefundDetail
   * @response `200` `BorrowOrderRefundDetailResp` OK
   */
  financeBorrowOrderQueryRefundDetail = (
    query: {
      /** refuncCode */
      refuncCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<BorrowOrderRefundDetailResp, any>({
      path: `/api/finance/borrow/order/queryRefundDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 借款单
   * @name FinanceBorrowOrderQueryRefundList
   * @summary 退款单列表查询
   * @request POST:/api/finance/borrow/order/queryRefundList
   * @response `200` `BorrowOrderRefundListQueryResp` OK
   */
  financeBorrowOrderQueryRefundList = (
    req: BorrowOrderRefundListQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<BorrowOrderRefundListQueryResp, any>({
      path: `/api/finance/borrow/order/queryRefundList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算汇总规则管理
   * @name FinanceBudgetRuleChangeStatus
   * @summary 变更状态
   * @request POST:/api/finance/budgetRule/changeStatus
   * @response `200` `void` OK
   */
  financeBudgetRuleChangeStatus = (
    req: BudgetSummaryRuleChangeStatusReq,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/finance/budgetRule/changeStatus`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算汇总规则管理
   * @name FinanceBudgetRuleFieldNameToCode
   * @summary 字段名转code
   * @request GET:/api/finance/budgetRule/fieldNameToCode
   * @response `200` `CommonRespString` OK
   */
  financeBudgetRuleFieldNameToCode = (
    query: {
      /** fieldName */
      fieldName: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespString, any>({
      path: `/api/finance/budgetRule/fieldNameToCode`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算汇总规则管理
   * @name FinanceBudgetRuleFieldNameToCodes
   * @summary 字段名转code
   * @request POST:/api/finance/budgetRule/fieldNameToCodes
   * @response `200` `(FieldNameToCodesReq)[]` OK
   */
  financeBudgetRuleFieldNameToCodes = (reqs: FieldNameToCodesReq[], params: RequestParams = {}) =>
    this.request<FieldNameToCodesReq[], any>({
      path: `/api/finance/budgetRule/fieldNameToCodes`,
      method: 'POST',
      body: reqs,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算汇总规则管理
   * @name FinanceBudgetRuleQueryDetail
   * @summary 查询详情
   * @request GET:/api/finance/budgetRule/queryDetail
   * @response `200` `BudgetSummaryRuleDetailBean` OK
   */
  financeBudgetRuleQueryDetail = (
    query: {
      /** ruleCode */
      ruleCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<BudgetSummaryRuleDetailBean, any>({
      path: `/api/finance/budgetRule/queryDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算汇总规则管理
   * @name FinanceBudgetRuleQueryFixedColumnList
   * @summary 获取固定列
   * @request GET:/api/finance/budgetRule/queryFixedColumnList
   * @response `200` `(ColumnBean)[]` OK
   */
  financeBudgetRuleQueryFixedColumnList = (params: RequestParams = {}) =>
    this.request<ColumnBean[], any>({
      path: `/api/finance/budgetRule/queryFixedColumnList`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算汇总规则管理
   * @name FinanceBudgetRuleQueryList
   * @summary 列表查询
   * @request POST:/api/finance/budgetRule/queryList
   * @response `200` `BudgetSummaryRuleListResp` OK
   */
  financeBudgetRuleQueryList = (req: BudgetSummaryRuleListReq, params: RequestParams = {}) =>
    this.request<BudgetSummaryRuleListResp, any>({
      path: `/api/finance/budgetRule/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算汇总规则管理
   * @name FinanceBudgetRuleSaveOrUpdate
   * @summary 保存
   * @request POST:/api/finance/budgetRule/saveOrUpdate
   * @response `200` `CommonRespString` OK
   */
  financeBudgetRuleSaveOrUpdate = (req: BudgetSummaryRuleDetailBean, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/finance/budgetRule/saveOrUpdate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算汇总规则管理
   * @name FinanceBudgetRuleSaveOrUpdateByOss
   * @summary 保存oss
   * @request POST:/api/finance/budgetRule/saveOrUpdateByOss
   * @response `200` `CommonRespString` OK
   */
  financeBudgetRuleSaveOrUpdateByOss = (uploadReq: UploadReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/finance/budgetRule/saveOrUpdateByOss`,
      method: 'POST',
      body: uploadReq,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算汇总规则结果管理
   * @name FinanceBudgetRuleSummaryResultExeSignle
   * @summary 更新
   * @request POST:/api/finance/budgetRuleSummary/result/exeSignle
   * @response `200` `void` OK
   */
  financeBudgetRuleSummaryResultExeSignle = (
    req: BudgetSummaryRuleResultExeSignleReq,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/finance/budgetRuleSummary/result/exeSignle`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算汇总规则结果管理
   * @name FinanceBudgetRuleSummaryResultExportList
   * @summary 导出
   * @request POST:/api/finance/budgetRuleSummary/result/exportList
   * @response `200` `CommonExportResp` OK
   */
  financeBudgetRuleSummaryResultExportList = (
    req: BudgetSummaryRuleResultExportListReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/finance/budgetRuleSummary/result/exportList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算汇总规则结果管理
   * @name FinanceBudgetRuleSummaryResultQueryList
   * @summary 列表查询
   * @request POST:/api/finance/budgetRuleSummary/result/queryList
   * @response `200` `BudgetSummaryRuleResultQueryListResp` OK
   */
  financeBudgetRuleSummaryResultQueryList = (
    req: BudgetSummaryRuleResultQueryListReq,
    params: RequestParams = {},
  ) =>
    this.request<BudgetSummaryRuleResultQueryListResp, any>({
      path: `/api/finance/budgetRuleSummary/result/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 提供给分贝通回调接口
   * @name FinanceCallbackFbtApplyStatusChange
   * @summary 申请单状态变更事件
   * @request POST:/api/finance/callback/fbt/applyStatusChange
   * @response `200` `CommonResp` OK
   */
  financeCallbackFbtApplyStatusChange = (
    req: FbtApplyStatusChangeReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonResp, any>({
      path: `/api/finance/callback/fbt/applyStatusChange`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 提供给分贝通回调接口
   * @name FinanceCallbackFbtBillStatusChange
   * @summary 账单状态变更事件
   * @request POST:/api/finance/callback/fbt/billStatusChange
   * @response `200` `CommonResp` OK
   */
  financeCallbackFbtBillStatusChange = (
    req: FbtBillStatusChangeEventReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonResp, any>({
      path: `/api/finance/callback/fbt/billStatusChange`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 提供给分贝通回调接口
   * @name FinanceCallbackFbtBorrowRefundEvent
   * @summary 借款单还款事件
   * @request POST:/api/finance/callback/fbt/borrowRefundEvent
   * @response `200` `CommonResp` OK
   */
  financeCallbackFbtBorrowRefundEvent = (
    req: FbtBorrowRefundEventReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonResp, any>({
      path: `/api/finance/callback/fbt/borrowRefundEvent`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 提供给分贝通回调接口
   * @name FinanceCallbackFbtPayOrderEvent
   * @summary 付款单事件
   * @request POST:/api/finance/callback/fbt/payOrderEvent
   * @response `200` `CommonResp` OK
   */
  financeCallbackFbtPayOrderEvent = (req: FbtPayOrderEventReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/finance/callback/fbt/payOrderEvent`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 提供给分贝通回调接口
   * @name FinanceCallbackFbtPayVerificationEvent
   * @summary 付款核销事件
   * @request POST:/api/finance/callback/fbt/payVerificationEvent
   * @response `200` `CommonResp` OK
   */
  financeCallbackFbtPayVerificationEvent = (
    req: FbtPayVerificationEventReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonResp, any>({
      path: `/api/finance/callback/fbt/payVerificationEvent`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 提供给分贝通回调接口
   * @name FinanceCallbackFbtPrivatePayCreate
   * @summary 因私付款单创建事件
   * @request POST:/api/finance/callback/fbt/privatePayCreate
   * @response `200` `CommonResp` OK
   */
  financeCallbackFbtPrivatePayCreate = (
    req: FbtPrivatePayCreateEventReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonResp, any>({
      path: `/api/finance/callback/fbt/privatePayCreate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 提供给分贝通回调接口
   * @name FinanceCallbackFbtPublicPayCreateEvent
   * @summary 对公付款单创建
   * @request POST:/api/finance/callback/fbt/publicPayCreateEvent
   * @response `200` `CommonResp` OK
   */
  financeCallbackFbtPublicPayCreateEvent = (
    req: FbtPublicPayCreateEventReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonResp, any>({
      path: `/api/finance/callback/fbt/publicPayCreateEvent`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags CN单
   * @name FinanceCnOrderExportList
   * @summary 导出CN单列表
   * @request POST:/api/finance/cn/order/exportList
   * @response `200` `CommonExportResp` OK
   */
  financeCnOrderExportList = (req: CnOrderListReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/finance/cn/order/exportList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags CN单
   * @name FinanceCnOrderQueryDetail
   * @summary 详情查询
   * @request GET:/api/finance/cn/order/queryDetail
   * @response `200` `CnOrderDetailResp` OK
   */
  financeCnOrderQueryDetail = (
    query: {
      /** code */
      code: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CnOrderDetailResp, any>({
      path: `/api/finance/cn/order/queryDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags CN单
   * @name FinanceCnOrderQueryList
   * @summary CN单列表查询
   * @request POST:/api/finance/cn/order/queryList
   * @response `200` `CnOrderListResp` OK
   */
  financeCnOrderQueryList = (req: CnOrderListReq, params: RequestParams = {}) =>
    this.request<CnOrderListResp, any>({
      path: `/api/finance/cn/order/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags CN单
   * @name FinanceCnOrderQueryWriteOffDetail
   * @summary 核销详情
   * @request POST:/api/finance/cn/order/queryWriteOffDetail
   * @response `200` `WriteOffDetailResp` OK
   */
  financeCnOrderQueryWriteOffDetail = (codes: string[], params: RequestParams = {}) =>
    this.request<WriteOffDetailResp, any>({
      path: `/api/finance/cn/order/queryWriteOffDetail`,
      method: 'POST',
      body: codes,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags CN单
   * @name FinanceCnOrderRelatedInvoice
   * @summary 关联发票
   * @request POST:/api/finance/cn/order/relatedInvoice
   * @response `200` `void` OK
   */
  financeCnOrderRelatedInvoice = (req: CnOrderRelatedInvoiceReq, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/finance/cn/order/relatedInvoice`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 基础资料-资产信息
   * @name FinanceConsultingProjectDownLoadTemplate
   * @summary 下载批量新增模板
   * @request POST:/api/finance/consulting/project/downLoadTemplate
   * @response `200` `CommonRespString` OK
   */
  financeConsultingProjectDownLoadTemplate = (params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/finance/consulting/project/downLoadTemplate`,
      method: 'POST',
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 基础资料-资产信息
   * @name FinanceConsultingProjectExport
   * @summary 咨询项目列表导出
   * @request POST:/api/finance/consulting/project/export
   * @response `200` `CommonRespCommonExportResp` OK
   */
  financeConsultingProjectExport = (
    req: BudgetConsultingProjectListReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/finance/consulting/project/export`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 基础资料-资产信息
   * @name FinanceConsultingProjectImportData
   * @summary 咨询项目批量导入
   * @request POST:/api/finance/consulting/project/importData
   * @response `200` `CommonRespVoid` OK
   */
  financeConsultingProjectImportData = (req: UploadReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/finance/consulting/project/importData`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 基础资料-资产信息
   * @name FinanceConsultingProjectQueryList
   * @summary 咨询项目列表查询
   * @request POST:/api/finance/consulting/project/queryList
   * @response `200` `BudgetConsultingProjectListResp` OK
   */
  financeConsultingProjectQueryList = (
    req: BudgetConsultingProjectListReq,
    params: RequestParams = {},
  ) =>
    this.request<BudgetConsultingProjectListResp, any>({
      path: `/api/finance/consulting/project/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 基础资料-日常费用
   * @name FinanceCurrentExpenseDownLoadTemplate
   * @summary 下载批量新增模板
   * @request POST:/api/finance/current/expense/downLoadTemplate
   * @response `200` `CommonRespString` OK
   */
  financeCurrentExpenseDownLoadTemplate = (params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/finance/current/expense/downLoadTemplate`,
      method: 'POST',
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 基础资料-日常费用
   * @name FinanceCurrentExpenseExport
   * @summary 日常费用列表导出
   * @request POST:/api/finance/current/expense/export
   * @response `200` `CommonRespCommonExportResp` OK
   */
  financeCurrentExpenseExport = (req: BudgetCurrentExpenseListReq, params: RequestParams = {}) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/finance/current/expense/export`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 基础资料-日常费用
   * @name FinanceCurrentExpenseImportData
   * @summary 批量导入
   * @request POST:/api/finance/current/expense/importData
   * @response `200` `CommonRespVoid` OK
   */
  financeCurrentExpenseImportData = (req: UploadReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/finance/current/expense/importData`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 基础资料-日常费用
   * @name FinanceCurrentExpenseQueryList
   * @summary 日常费用列表查询
   * @request POST:/api/finance/current/expense/queryList
   * @response `200` `BudgetCurrentExpenseListResp` OK
   */
  financeCurrentExpenseQueryList = (req: BudgetCurrentExpenseListReq, params: RequestParams = {}) =>
    this.request<BudgetCurrentExpenseListResp, any>({
      path: `/api/finance/current/expense/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 费控-支付管理
   * @name FinanceExpensePaymentDetail
   * @summary 付款单详情
   * @request POST:/api/finance/expense/payment/detail
   * @response `200` `CommonRespPaymentOrderDetailResp` OK
   */
  financeExpensePaymentDetail = (req: PaymentOrderDetailReq, params: RequestParams = {}) =>
    this.request<CommonRespPaymentOrderDetailResp, any>({
      path: `/api/finance/expense/payment/detail`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 费控-支付管理
   * @name FinanceExpensePaymentDownload
   * @summary 下载非CBS付款导入模板
   * @request POST:/api/finance/expense/payment/download
   * @response `200` `CommonRespString` OK
   */
  financeExpensePaymentDownload = (params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/finance/expense/payment/download`,
      method: 'POST',
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 费控-支付管理
   * @name FinanceExpensePaymentExport
   * @summary 付款单导出
   * @request POST:/api/finance/expense/payment/export
   * @response `200` `CommonRespCommonExportResp` OK
   */
  financeExpensePaymentExport = (req: PaymentOrderListReq, params: RequestParams = {}) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/finance/expense/payment/export`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 费控-支付管理
   * @name FinanceExpensePaymentImport
   * @summary 非CBS付款导入更新
   * @request POST:/api/finance/expense/payment/import
   * @response `200` `CommonRespVoid` OK
   */
  financeExpensePaymentImport = (req: UploadReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/finance/expense/payment/import`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 费控-支付管理
   * @name FinanceExpensePaymentList
   * @summary 付款单列表
   * @request POST:/api/finance/expense/payment/list
   * @response `200` `PaymentOrderListResp` OK
   */
  financeExpensePaymentList = (req: PaymentOrderListReq, params: RequestParams = {}) =>
    this.request<PaymentOrderListResp, any>({
      path: `/api/finance/expense/payment/list`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 费控-支付管理
   * @name FinanceExpensePaymentObsolete
   * @summary 付款单作废
   * @request POST:/api/finance/expense/payment/obsolete
   * @response `200` `CommonRespPaymentOrderObsoleteResp` OK
   */
  financeExpensePaymentObsolete = (req: PaymentOrderCodeReq, params: RequestParams = {}) =>
    this.request<CommonRespPaymentOrderObsoleteResp, any>({
      path: `/api/finance/expense/payment/obsolete`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 费控-支付管理
   * @name FinanceExpensePaymentSaveAttachment
   * @summary 非CBS付款水单截图附件保存
   * @request POST:/api/finance/expense/payment/save/attachment
   * @response `200` `CommonRespVoid` OK
   */
  financeExpensePaymentSaveAttachment = (
    req: AttachmentInfoUploadReq[],
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/finance/expense/payment/save/attachment`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 报销单
   * @name FinanceExpenseReportQueryDetail
   * @summary 详情查询
   * @request GET:/api/finance/expense/report/queryDetail
   * @response `200` `ExpenseReportDetailResp` OK
   */
  financeExpenseReportQueryDetail = (
    query: {
      /** code */
      code: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<ExpenseReportDetailResp, any>({
      path: `/api/finance/expense/report/queryDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 报销单
   * @name FinanceExpenseReportQueryList
   * @summary 列表查询
   * @request POST:/api/finance/expense/report/queryList
   * @response `200` `ExpenseReportListQueryResp` OK
   */
  financeExpenseReportQueryList = (req: ExpenseReportListQueryReq, params: RequestParams = {}) =>
    this.request<ExpenseReportListQueryResp, any>({
      path: `/api/finance/expense/report/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 基础资料-头程单价
   * @name FinanceFirstMileDownLoadTemplate
   * @summary 下载批量新增模板
   * @request POST:/api/finance/first/mile/downLoadTemplate
   * @response `200` `CommonRespString` OK
   */
  financeFirstMileDownLoadTemplate = (params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/finance/first/mile/downLoadTemplate`,
      method: 'POST',
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 基础资料-头程单价
   * @name FinanceFirstMileExport
   * @summary 头程单价列表导出
   * @request POST:/api/finance/first/mile/export
   * @response `200` `CommonRespCommonExportResp` OK
   */
  financeFirstMileExport = (req: BudgetFirstMileListReq, params: RequestParams = {}) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/finance/first/mile/export`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 基础资料-头程单价
   * @name FinanceFirstMileImportData
   * @summary 批量导入
   * @request POST:/api/finance/first/mile/importData
   * @response `200` `CommonRespVoid` OK
   */
  financeFirstMileImportData = (req: UploadReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/finance/first/mile/importData`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 基础资料-头程单价
   * @name FinanceFirstMileQueryList
   * @summary 头程单价列表查询
   * @request POST:/api/finance/first/mile/queryList
   * @response `200` `BudgetFirstMileListResp` OK
   */
  financeFirstMileQueryList = (req: BudgetFirstMileListReq, params: RequestParams = {}) =>
    this.request<BudgetFirstMileListResp, any>({
      path: `/api/finance/first/mile/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 回款单
   * @name FinanceIncomePaymentConfirmationOrderDeletedBatch
   * @summary 批量删除
   * @request POST:/api/finance/income/paymentConfirmationOrder/deletedBatch
   * @response `200` `CommonRespVoid` OK
   */
  financeIncomePaymentConfirmationOrderDeletedBatch = (
    req: IncomePaymentConfirmationOrderBatchDeleteReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/finance/income/paymentConfirmationOrder/deletedBatch`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 回款单
   * @name FinanceIncomePaymentConfirmationOrderExportQueryList
   * @summary 导出
   * @request POST:/api/finance/income/paymentConfirmationOrder/export/queryList
   * @response `200` `CommonRespCommonExportResp` OK
   */
  financeIncomePaymentConfirmationOrderExportQueryList = (
    req: IncomePaymentConfirmationOrderListReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/finance/income/paymentConfirmationOrder/export/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 回款单
   * @name FinanceIncomePaymentConfirmationOrderMarkPushStatus
   * @summary 标记推送状态
   * @request POST:/api/finance/income/paymentConfirmationOrder/markPushStatus
   * @response `200` `CommonRespCommonBatchResp` OK
   */
  financeIncomePaymentConfirmationOrderMarkPushStatus = (
    req: IncomePaymentConfirmationOrderBatchChangePushStatusReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespCommonBatchResp, any>({
      path: `/api/finance/income/paymentConfirmationOrder/markPushStatus`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 回款单
   * @name FinanceIncomePaymentConfirmationOrderPush
   * @summary 推送
   * @request POST:/api/finance/income/paymentConfirmationOrder/push
   * @response `200` `CommonRespVoid` OK
   */
  financeIncomePaymentConfirmationOrderPush = (
    req: IncomePaymentConfirmationOrderPushReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/finance/income/paymentConfirmationOrder/push`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 回款单
   * @name FinanceIncomePaymentConfirmationOrderPushBatch
   * @summary 批量推送
   * @request POST:/api/finance/income/paymentConfirmationOrder/pushBatch
   * @response `200` `CommonRespCommonBatchResp` OK
   */
  financeIncomePaymentConfirmationOrderPushBatch = (
    req: IncomePaymentConfirmationOrderBatchPushReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespCommonBatchResp, any>({
      path: `/api/finance/income/paymentConfirmationOrder/pushBatch`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 回款单
   * @name FinanceIncomePaymentConfirmationOrderQueryList
   * @summary 列表查询
   * @request POST:/api/finance/income/paymentConfirmationOrder/queryList
   * @response `200` `IncomePaymentConfirmationOrderListResp` OK
   */
  financeIncomePaymentConfirmationOrderQueryList = (
    req: IncomePaymentConfirmationOrderListReq,
    params: RequestParams = {},
  ) =>
    this.request<IncomePaymentConfirmationOrderListResp, any>({
      path: `/api/finance/income/paymentConfirmationOrder/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 回款单
   * @name FinanceIncomePaymentConfirmationOrderQueryPushBatchList
   * @summary 列表推送批次
   * @request POST:/api/finance/income/paymentConfirmationOrder/queryPushBatchList
   * @response `200` `IncomePaymentConfirmationOrderPushBatchListResp` OK
   */
  financeIncomePaymentConfirmationOrderQueryPushBatchList = (
    req: IncomePaymentConfirmationOrderListReq,
    params: RequestParams = {},
  ) =>
    this.request<IncomePaymentConfirmationOrderPushBatchListResp, any>({
      path: `/api/finance/income/paymentConfirmationOrder/queryPushBatchList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 收入规则解析
   * @name FinanceIncomeRuleAnalysisExecute
   * @summary 执行
   * @request POST:/api/finance/income/rule/analysis/execute
   * @response `200` `CommonRespVoid` OK
   */
  financeIncomeRuleAnalysisExecute = (
    req: IncomeRuleAnalysisExecuteReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/finance/income/rule/analysis/execute`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 收入规则解析
   * @name FinanceIncomeRuleAnalysisExecuteBatch
   * @summary 批量执行
   * @request POST:/api/finance/income/rule/analysis/executeBatch
   * @response `200` `CommonRespCommonBatchResp` OK
   */
  financeIncomeRuleAnalysisExecuteBatch = (
    req: IncomeRuleAnalysisExecuteBatchReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespCommonBatchResp, any>({
      path: `/api/finance/income/rule/analysis/executeBatch`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 收入规则解析
   * @name FinanceIncomeRuleAnalysisExecuteMock
   * @summary 执行Mock
   * @request GET:/api/finance/income/rule/analysis/executeMock
   * @deprecated
   * @response `200` `CommonRespVoid` OK
   */
  financeIncomeRuleAnalysisExecuteMock = (
    query: {
      /** override */
      override: boolean;
      /**
       * startId
       * @format int64
       */
      startId: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/finance/income/rule/analysis/executeMock`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 收入规则解析
   * @name FinanceIncomeRuleAnalysisQueryByIds
   * @summary 查询主表进度信息
   * @request POST:/api/finance/income/rule/analysis/queryByIds
   * @response `200` `(IncomeRuleAnalysisRecordBean)[]` OK
   */
  financeIncomeRuleAnalysisQueryByIds = (
    req: IncomeRuleAnalysisListIdsReq,
    params: RequestParams = {},
  ) =>
    this.request<IncomeRuleAnalysisRecordBean[], any>({
      path: `/api/finance/income/rule/analysis/queryByIds`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 收入规则解析
   * @name FinanceIncomeRuleAnalysisQueryDetail
   * @summary 查询详情
   * @request GET:/api/finance/income/rule/analysis/queryDetail
   * @response `200` `IncomeIncomeRuleAnalysisDetailResp` OK
   */
  financeIncomeRuleAnalysisQueryDetail = (
    query: {
      /** code */
      code: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<IncomeIncomeRuleAnalysisDetailResp, any>({
      path: `/api/finance/income/rule/analysis/queryDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 收入规则解析
   * @name FinanceIncomeRuleAnalysisQueryList
   * @summary 列表查询
   * @request POST:/api/finance/income/rule/analysis/queryList
   * @response `200` `IncomeRuleAnalysisListResp` OK
   */
  financeIncomeRuleAnalysisQueryList = (
    req: IncomeRuleAnalysisListReq,
    params: RequestParams = {},
  ) =>
    this.request<IncomeRuleAnalysisListResp, any>({
      path: `/api/finance/income/rule/analysis/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 收入规则解析
   * @name FinanceIncomeRuleAnalysisSaveConfirmFile
   * @summary 保存手工确认文件
   * @request POST:/api/finance/income/rule/analysis/saveConfirmFile
   * @response `200` `CommonRespVoid` OK
   */
  financeIncomeRuleAnalysisSaveConfirmFile = (
    req: IncomeRuleAnalysisConfirmFileReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/finance/income/rule/analysis/saveConfirmFile`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 收入规则管理
   * @name FinanceIncomeRuleAssembleAvScriptKey
   * @summary 组装AV脚本key
   * @request POST:/api/finance/income/rule/assembleAvScriptKey
   * @response `200` `CommonRespString` OK
   */
  financeIncomeRuleAssembleAvScriptKey = (
    req: IncomeRuleAssembleAvScriptKeyReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespString, any>({
      path: `/api/finance/income/rule/assembleAvScriptKey`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 收入规则管理
   * @name FinanceIncomeRuleChangeStatus
   * @summary 变更状态
   * @request POST:/api/finance/income/rule/changeStatus
   * @response `200` `CommonRespVoid` OK
   */
  financeIncomeRuleChangeStatus = (req: IncomeRuleChangeStatusReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/finance/income/rule/changeStatus`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 收入规则管理
   * @name FinanceIncomeRuleCopy
   * @summary 复制规则
   * @request POST:/api/finance/income/rule/copy
   * @response `200` `CommonRespString` OK
   */
  financeIncomeRuleCopy = (req: IncomeRuleCopyReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/finance/income/rule/copy`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 收入规则管理
   * @name FinanceIncomeRuleEnableCheck
   * @summary 规则启用校验,返回值为true给出提示
   * @request POST:/api/finance/income/rule/enable/check
   * @response `200` `IncomeRuleEnableCheckResp` OK
   */
  financeIncomeRuleEnableCheck = (req: IncomeRuleEnableCheckReq, params: RequestParams = {}) =>
    this.request<IncomeRuleEnableCheckResp, any>({
      path: `/api/finance/income/rule/enable/check`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 收入规则管理
   * @name FinanceIncomeRuleJoinText
   * @summary 文本拼接
   * @request POST:/api/finance/income/rule/joinText
   * @response `200` `CommonRespString` OK
   */
  financeIncomeRuleJoinText = (req: IncomeRuleAssembleAvScriptKeyReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/finance/income/rule/joinText`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 收入规则管理
   * @name FinanceIncomeRuleQueryDetail
   * @summary 查询详情
   * @request GET:/api/finance/income/rule/queryDetail
   * @response `200` `IncomeRuleDetailBean` OK
   */
  financeIncomeRuleQueryDetail = (
    query: {
      /** ruleCode */
      ruleCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<IncomeRuleDetailBean, any>({
      path: `/api/finance/income/rule/queryDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 收入规则管理
   * @name FinanceIncomeRuleQueryList
   * @summary 列表查询
   * @request POST:/api/finance/income/rule/queryList
   * @response `200` `IncomeRuleListResp` OK
   */
  financeIncomeRuleQueryList = (req: IncomeRuleListReq, params: RequestParams = {}) =>
    this.request<IncomeRuleListResp, any>({
      path: `/api/finance/income/rule/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 收入规则管理
   * @name FinanceIncomeRuleQueryShopCheckList
   * @summary 完成度检查
   * @request POST:/api/finance/income/rule/queryShopCheckList
   * @response `200` `IncomeRuleShopCheckListResp` OK
   */
  financeIncomeRuleQueryShopCheckList = (
    req: IncomeRuleShopCheckListReq,
    params: RequestParams = {},
  ) =>
    this.request<IncomeRuleShopCheckListResp, any>({
      path: `/api/finance/income/rule/queryShopCheckList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 收入规则管理
   * @name FinanceIncomeRuleQueryTableFields
   * @summary 查询表字段
   * @request GET:/api/finance/income/rule/queryTableFields
   * @response `200` `TableFieldListResp` OK
   */
  financeIncomeRuleQueryTableFields = (
    query: {
      /** tableName */
      tableName: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<TableFieldListResp, any>({
      path: `/api/finance/income/rule/queryTableFields`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 收入规则管理
   * @name FinanceIncomeRuleSaveOrUpdate
   * @summary 保存
   * @request POST:/api/finance/income/rule/saveOrUpdate
   * @response `200` `CommonRespString` OK
   */
  financeIncomeRuleSaveOrUpdate = (req: IncomeRuleDetailBean, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/finance/income/rule/saveOrUpdate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 收入结算单
   * @name FinanceIncomeStatementOrderDeletedBatch
   * @summary 批量删除
   * @request POST:/api/finance/income/statementOrder/deletedBatch
   * @response `200` `CommonRespVoid` OK
   */
  financeIncomeStatementOrderDeletedBatch = (
    req: IncomeRuleStatementOrderBatchDeletedReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/finance/income/statementOrder/deletedBatch`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 收入结算单
   * @name FinanceIncomeStatementOrderExportQueryList
   * @summary 导出
   * @request POST:/api/finance/income/statementOrder/export/queryList
   * @response `200` `CommonRespCommonExportResp` OK
   */
  financeIncomeStatementOrderExportQueryList = (
    req: IncomeRuleStatementOrderListReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/finance/income/statementOrder/export/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 收入结算单
   * @name FinanceIncomeStatementOrderMarkPushStatus
   * @summary 标记推送状态
   * @request POST:/api/finance/income/statementOrder/markPushStatus
   * @response `200` `CommonRespCommonBatchResp` OK
   */
  financeIncomeStatementOrderMarkPushStatus = (
    req: IncomeRuleStatementOrderBatchChangePushStatuReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespCommonBatchResp, any>({
      path: `/api/finance/income/statementOrder/markPushStatus`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 收入结算单
   * @name FinanceIncomeStatementOrderPush
   * @summary 推送
   * @request POST:/api/finance/income/statementOrder/push
   * @response `200` `CommonRespVoid` OK
   */
  financeIncomeStatementOrderPush = (
    req: IncomeRuleStatementOrderPushReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/finance/income/statementOrder/push`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 收入结算单
   * @name FinanceIncomeStatementOrderPushBatch
   * @summary 批量推送
   * @request POST:/api/finance/income/statementOrder/pushBatch
   * @response `200` `CommonRespCommonBatchResp` OK
   */
  financeIncomeStatementOrderPushBatch = (
    req: IncomeRuleStatementOrderBatchPushReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespCommonBatchResp, any>({
      path: `/api/finance/income/statementOrder/pushBatch`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 收入结算单
   * @name FinanceIncomeStatementOrderQueryList
   * @summary 列表查询
   * @request POST:/api/finance/income/statementOrder/queryList
   * @response `200` `IncomeRuleStatementOrderListResp` OK
   */
  financeIncomeStatementOrderQueryList = (
    req: IncomeRuleStatementOrderListReq,
    params: RequestParams = {},
  ) =>
    this.request<IncomeRuleStatementOrderListResp, any>({
      path: `/api/finance/income/statementOrder/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 收入结算单
   * @name FinanceIncomeStatementOrderQueryPushBatchList
   * @summary 列表推送批次
   * @request POST:/api/finance/income/statementOrder/queryPushBatchList
   * @response `200` `IncomeRuleStatementOrderPushBatchListResp` OK
   */
  financeIncomeStatementOrderQueryPushBatchList = (
    req: IncomeRuleStatementOrderListReq,
    params: RequestParams = {},
  ) =>
    this.request<IncomeRuleStatementOrderPushBatchListResp, any>({
      path: `/api/finance/income/statementOrder/queryPushBatchList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 收入结算单
   * @name FinanceIncomeStatementOrderQueryShopCompareList
   * @summary 查询店铺对比列表数据
   * @request POST:/api/finance/income/statementOrder/queryShopCompareList
   * @response `200` `ShopCompareListResp` OK
   */
  financeIncomeStatementOrderQueryShopCompareList = (
    req: ShopCompareListReq,
    params: RequestParams = {},
  ) =>
    this.request<ShopCompareListResp, any>({
      path: `/api/finance/income/statementOrder/queryShopCompareList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 收入结算单
   * @name FinanceIncomeStatementOrderQueryShopCompareSumData
   * @summary 查询店铺对比汇总数据
   * @request GET:/api/finance/income/statementOrder/queryShopCompareSumData
   * @response `200` `ShopCompareSumDataResp` OK
   */
  financeIncomeStatementOrderQueryShopCompareSumData = (params: RequestParams = {}) =>
    this.request<ShopCompareSumDataResp, any>({
      path: `/api/finance/income/statementOrder/queryShopCompareSumData`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 收入结算单
   * @name FinanceIncomeStatementOrderUpdateSupplySku
   * @summary 修改供应链sku
   * @request POST:/api/finance/income/statementOrder/updateSupplySku
   * @response `200` `void` OK
   */
  financeIncomeStatementOrderUpdateSupplySku = (
    req: IncomeRuleStatementOrderListReq,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/finance/income/statementOrder/updateSupplySku`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 发票
   * @name FinanceInvoiceDelete
   * @summary 删除
   * @request POST:/api/finance/invoice/delete
   * @response `200` `CommonRespVoid` OK
   */
  financeInvoiceDelete = (
    query: {
      /** code */
      code: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/finance/invoice/delete`,
      method: 'POST',
      query: query,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 发票
   * @name FinanceInvoiceDownloadTemplate
   * @summary 下载导入发票模板
   * @request GET:/api/finance/invoice/downloadTemplate
   * @response `200` `CommonRespString` OK
   */
  financeInvoiceDownloadTemplate = (params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/finance/invoice/downloadTemplate`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 发票
   * @name FinanceInvoiceImportData
   * @summary 导入发票数据
   * @request POST:/api/finance/invoice/importData
   * @response `200` `CommonRespVoid` OK
   */
  financeInvoiceImportData = (req: UploadReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/finance/invoice/importData`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 发票
   * @name FinanceInvoiceQueryDetail
   * @summary 详情查询
   * @request GET:/api/finance/invoice/queryDetail
   * @response `200` `InvoiceDetailResp` OK
   */
  financeInvoiceQueryDetail = (
    query: {
      /** code */
      code: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<InvoiceDetailResp, any>({
      path: `/api/finance/invoice/queryDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 发票
   * @name FinanceInvoiceQueryList
   * @summary 列表查询
   * @request POST:/api/finance/invoice/queryList
   * @response `200` `InvoiceListResp` OK
   */
  financeInvoiceQueryList = (req: InvoiceListReq, params: RequestParams = {}) =>
    this.request<InvoiceListResp, any>({
      path: `/api/finance/invoice/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 发票
   * @name FinanceInvoiceReverseWriteOff
   * @summary 发票反核销
   * @request POST:/api/finance/invoice/reverseWriteOff
   * @response `200` `CommonRespVoid` OK
   */
  financeInvoiceReverseWriteOff = (req: InvoiceReverseWriteOffReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/finance/invoice/reverseWriteOff`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 发票
   * @name FinanceInvoiceReview
   * @summary 审核/反审核
   * @request POST:/api/finance/invoice/review
   * @response `200` `CommonRespVoid` OK
   */
  financeInvoiceReview = (req: InvoiceReviewReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/finance/invoice/review`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 发票
   * @name FinanceInvoiceSave
   * @summary 保存
   * @request POST:/api/finance/invoice/save
   * @response `200` `CommonRespVoid` OK
   */
  financeInvoiceSave = (req: InvoiceSaveReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/finance/invoice/save`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 基础资料-营销活动
   * @name FinanceMarketingCampaignDownLoadTemplate
   * @summary 下载批量新增模板
   * @request POST:/api/finance/marketing/campaign/downLoadTemplate
   * @response `200` `CommonRespString` OK
   */
  financeMarketingCampaignDownLoadTemplate = (params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/finance/marketing/campaign/downLoadTemplate`,
      method: 'POST',
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 基础资料-营销活动
   * @name FinanceMarketingCampaignExport
   * @summary 营销活动列表导出
   * @request POST:/api/finance/marketing/campaign/export
   * @response `200` `CommonRespCommonExportResp` OK
   */
  financeMarketingCampaignExport = (
    req: BudgetMarketingCampaignListReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/finance/marketing/campaign/export`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 基础资料-营销活动
   * @name FinanceMarketingCampaignImportData
   * @summary 批量导入
   * @request POST:/api/finance/marketing/campaign/importData
   * @response `200` `CommonRespVoid` OK
   */
  financeMarketingCampaignImportData = (req: UploadReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/finance/marketing/campaign/importData`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 基础资料-营销活动
   * @name FinanceMarketingCampaignQueryList
   * @summary 营销活动列表查询
   * @request POST:/api/finance/marketing/campaign/queryList
   * @response `200` `BudgetMarketingCampaignListResp` OK
   */
  financeMarketingCampaignQueryList = (
    req: BudgetMarketingCampaignListReq,
    params: RequestParams = {},
  ) =>
    this.request<BudgetMarketingCampaignListResp, any>({
      path: `/api/finance/marketing/campaign/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 基础资料-营销费用
   * @name FinanceMarketingCostDownLoadTemplate
   * @summary 下载批量新增模板
   * @request POST:/api/finance/marketing/cost/downLoadTemplate
   * @response `200` `CommonRespString` OK
   */
  financeMarketingCostDownLoadTemplate = (params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/finance/marketing/cost/downLoadTemplate`,
      method: 'POST',
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 基础资料-营销费用
   * @name FinanceMarketingCostExport
   * @summary 营销费用列表导出
   * @request POST:/api/finance/marketing/cost/export
   * @response `200` `CommonRespCommonExportResp` OK
   */
  financeMarketingCostExport = (req: BudgetMarketingCostListReq, params: RequestParams = {}) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/finance/marketing/cost/export`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 基础资料-营销费用
   * @name FinanceMarketingCostImportData
   * @summary 批量导入
   * @request POST:/api/finance/marketing/cost/importData
   * @response `200` `CommonRespVoid` OK
   */
  financeMarketingCostImportData = (req: UploadReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/finance/marketing/cost/importData`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 基础资料-营销费用
   * @name FinanceMarketingCostQueryList
   * @summary 营销费用列表查询
   * @request POST:/api/finance/marketing/cost/queryList
   * @response `200` `BudgetMarketingCostListResp` OK
   */
  financeMarketingCostQueryList = (req: BudgetMarketingCostListReq, params: RequestParams = {}) =>
    this.request<BudgetMarketingCostListResp, any>({
      path: `/api/finance/marketing/cost/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags oa发票
   * @name FinanceOaInvoiceBatchRecognizeInvoice
   * @summary 批量识别发票
   * @request POST:/api/finance/oa/invoice/batchRecognizeInvoice
   * @response `200` `void` OK
   */
  financeOaInvoiceBatchRecognizeInvoice = (oaInvoiceIdList: number[], params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/finance/oa/invoice/batchRecognizeInvoice`,
      method: 'POST',
      body: oaInvoiceIdList,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags oa发票
   * @name FinanceOaInvoiceExportList
   * @summary oa发票列表导出
   * @request POST:/api/finance/oa/invoice/exportList
   * @response `200` `CommonExportResp` OK
   */
  financeOaInvoiceExportList = (req: OaInvoiceListReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/finance/oa/invoice/exportList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags oa发票
   * @name FinanceOaInvoiceQueryList
   * @summary oa发票列表查询
   * @request POST:/api/finance/oa/invoice/queryList
   * @response `200` `OAInvoiceListResp` OK
   */
  financeOaInvoiceQueryList = (req: OaInvoiceListReq, params: RequestParams = {}) =>
    this.request<OAInvoiceListResp, any>({
      path: `/api/finance/oa/invoice/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags oa发票
   * @name FinanceOaInvoiceQueryProcessList
   * @summary 流程表单查询
   * @request GET:/api/finance/oa/invoice/queryProcessList
   * @response `200` `(BudgetBasicSelectResp)[]` OK
   */
  financeOaInvoiceQueryProcessList = (params: RequestParams = {}) =>
    this.request<BudgetBasicSelectResp[], any>({
      path: `/api/finance/oa/invoice/queryProcessList`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags OA付款单
   * @name FinanceOaPaymentOrderExportList
   * @summary 导出列表
   * @request POST:/api/finance/oaPaymentOrder/exportList
   * @response `200` `CommonExportResp` OK
   */
  financeOaPaymentOrderExportList = (req: OaPaymentOrderQueryListReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/finance/oaPaymentOrder/exportList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags OA付款单
   * @name FinanceOaPaymentOrderMarkPushStatus
   * @summary 标记推送状态
   * @request POST:/api/finance/oaPaymentOrder/markPushStatus
   * @response `200` `CommonRespVoid` OK
   */
  financeOaPaymentOrderMarkPushStatus = (
    req: OaPaymentOrderBatchChangePushStatusReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/finance/oaPaymentOrder/markPushStatus`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags OA付款单
   * @name FinanceOaPaymentOrderPushList
   * @summary 推送所选
   * @request POST:/api/finance/oaPaymentOrder/pushList
   * @response `200` `CommonRespVoid` OK
   */
  financeOaPaymentOrderPushList = (req: OaPaymentOrderQueryListReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/finance/oaPaymentOrder/pushList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags OA付款单
   * @name FinanceOaPaymentOrderQueryDetail
   * @summary 订单详情
   * @request GET:/api/finance/oaPaymentOrder/queryDetail
   * @response `200` `OaPaymentDetailBean` OK
   */
  financeOaPaymentOrderQueryDetail = (
    query: {
      /** code */
      code: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<OaPaymentDetailBean, any>({
      path: `/api/finance/oaPaymentOrder/queryDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags OA付款单
   * @name FinanceOaPaymentOrderQueryList
   * @summary 列表查询
   * @request POST:/api/finance/oaPaymentOrder/queryList
   * @response `200` `OaPaymentOrderQueryListResp` OK
   */
  financeOaPaymentOrderQueryList = (req: OaPaymentOrderQueryListReq, params: RequestParams = {}) =>
    this.request<OaPaymentOrderQueryListResp, any>({
      path: `/api/finance/oaPaymentOrder/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags OA付款单
   * @name FinanceOaPaymentOrderUpdate
   * @summary 更新
   * @request POST:/api/finance/oaPaymentOrder/update
   * @response `200` `CommonRespVoid` OK
   */
  financeOaPaymentOrderUpdate = (req: OaPaymentOrderCodeUpdateReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/finance/oaPaymentOrder/update`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags OA付款单
   * @name FinanceOaPaymentOrderUpdateListData
   * @summary 更新列表数据
   * @request POST:/api/finance/oaPaymentOrder/updateListData
   * @response `200` `CommonRespVoid` OK
   */
  financeOaPaymentOrderUpdateListData = (
    req: OaPaymentOrderListUpdateReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/finance/oaPaymentOrder/updateListData`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 线下调拨单
   * @name FinanceOfflineTransferOrderExportDetailList
   * @summary 导出详情
   * @request POST:/api/finance/offline/transfer/order/exportDetailList
   * @response `200` `CommonExportResp` OK
   */
  financeOfflineTransferOrderExportDetailList = (
    req: OfflineTransferOrderListQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/finance/offline/transfer/order/exportDetailList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 线下调拨单
   * @name FinanceOfflineTransferOrderMarkPushStatus
   * @summary 标记推送状态
   * @request POST:/api/finance/offline/transfer/order/markPushStatus
   * @response `200` `CommonRespObject` OK
   */
  financeOfflineTransferOrderMarkPushStatus = (
    req: OfflineTransferBatchChangePushStatusReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/finance/offline/transfer/order/markPushStatus`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 线下调拨单
   * @name FinanceOfflineTransferOrderQueryDetail
   * @summary 订单详情
   * @request GET:/api/finance/offline/transfer/order/queryDetail
   * @response `200` `OfflineTransferOrderDetailResp` OK
   */
  financeOfflineTransferOrderQueryDetail = (
    query: {
      /**
       * 订单类型: 40-调拨入库单 41-调拨出库单
       * @format int32
       */
      billType: number;
      /** code */
      code: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<OfflineTransferOrderDetailResp, any>({
      path: `/api/finance/offline/transfer/order/queryDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 线下调拨单
   * @name FinanceOfflineTransferOrderQueryList
   * @summary 列表查询
   * @request POST:/api/finance/offline/transfer/order/queryList
   * @response `200` `OfflineTransferOrderQueryListResp` OK
   */
  financeOfflineTransferOrderQueryList = (
    req: OfflineTransferOrderListQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<OfflineTransferOrderQueryListResp, any>({
      path: `/api/finance/offline/transfer/order/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 其他出入库单模块
   * @name FinanceOtherInoutStockOrderExportDetailList
   * @summary 导出详情
   * @request POST:/api/finance/other/inout/stock/order/exportDetailList
   * @response `200` `CommonExportResp` OK
   */
  financeOtherInoutStockOrderExportDetailList = (
    req: OtherInOutStockQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/finance/other/inout/stock/order/exportDetailList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 其他出入库单模块
   * @name FinanceOtherInoutStockOrderMarkPushStatus
   * @summary 标记推送状态
   * @request POST:/api/finance/other/inout/stock/order/markPushStatus
   * @response `200` `CommonRespObject` OK
   */
  financeOtherInoutStockOrderMarkPushStatus = (
    req: OtherInOutStockBatchChangePushStatusReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/finance/other/inout/stock/order/markPushStatus`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 其他出入库单模块
   * @name FinanceOtherInoutStockOrderQueryInStockDetail
   * @summary 入库单订单详情
   * @request GET:/api/finance/other/inout/stock/order/queryInStockDetail
   * @response `200` `ErpOtherInStockDetailResp` OK
   */
  financeOtherInoutStockOrderQueryInStockDetail = (
    query: {
      /** code */
      code: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<ErpOtherInStockDetailResp, any>({
      path: `/api/finance/other/inout/stock/order/queryInStockDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 其他出入库单模块
   * @name FinanceOtherInoutStockOrderQueryList
   * @summary 列表查询
   * @request POST:/api/finance/other/inout/stock/order/queryList
   * @response `200` `OtherInOutStockQueryListResp` OK
   */
  financeOtherInoutStockOrderQueryList = (
    req: OtherInOutStockQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<OtherInOutStockQueryListResp, any>({
      path: `/api/finance/other/inout/stock/order/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 其他出入库单模块
   * @name FinanceOtherInoutStockOrderQueryOutStockDetail
   * @summary 出库单订单详情
   * @request GET:/api/finance/other/inout/stock/order/queryOutStockDetail
   * @response `200` `ErpOtherOutStockDetailResp` OK
   */
  financeOtherInoutStockOrderQueryOutStockDetail = (
    query: {
      /** code */
      code: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<ErpOtherOutStockDetailResp, any>({
      path: `/api/finance/other/inout/stock/order/queryOutStockDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 付款申请单
   * @name FinancePayQueryApplyOrderDetail
   * @summary 付款申请单详情查询
   * @request GET:/api/finance/pay/queryApplyOrderDetail
   * @response `200` `PayApplyOrderDetailResp` OK
   */
  financePayQueryApplyOrderDetail = (
    query: {
      /** payApplyBillNo */
      payApplyBillNo: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<PayApplyOrderDetailResp, any>({
      path: `/api/finance/pay/queryApplyOrderDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 付款申请单
   * @name FinancePayQueryApplyOrderList
   * @summary 付款申请单列表查询
   * @request POST:/api/finance/pay/queryApplyOrderList
   * @response `200` `PayApplyOrderListResp` OK
   */
  financePayQueryApplyOrderList = (req: PayApplyOrderListReq, params: RequestParams = {}) =>
    this.request<PayApplyOrderListResp, any>({
      path: `/api/finance/pay/queryApplyOrderList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 应付单
   * @name FinancePayableBillQueryDetail
   * @summary 详情查询
   * @request GET:/api/finance/payable/bill/queryDetail
   * @response `200` `PayableBillDetailQueryResp` OK
   */
  financePayableBillQueryDetail = (
    query: {
      /** code */
      code: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<PayableBillDetailQueryResp, any>({
      path: `/api/finance/payable/bill/queryDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 应付单
   * @name FinancePayableBillQueryList
   * @summary 列表查询
   * @request POST:/api/finance/payable/bill/queryList
   * @response `200` `PayableBillListQueryResp` OK
   */
  financePayableBillQueryList = (req: PayableBillListQueryReq, params: RequestParams = {}) =>
    this.request<PayableBillListQueryResp, any>({
      path: `/api/finance/payable/bill/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 回款-toB
   * @name FinancePaymentCollectionBatchDelete
   * @summary 批量删除回款
   * @request POST:/api/finance/payment/collection/batchDelete
   * @response `200` `CommonRespVoid` OK
   */
  financePaymentCollectionBatchDelete = (codeList: string[], params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/finance/payment/collection/batchDelete`,
      method: 'POST',
      body: codeList,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 回款-toB
   * @name FinancePaymentCollectionCancelClaim
   * @summary 撤销认领
   * @request POST:/api/finance/payment/collection/cancel/claim
   * @response `200` `CommonRespVoid` OK
   */
  financePaymentCollectionCancelClaim = (
    req: PaymentCollectionCancelClaimReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/finance/payment/collection/cancel/claim`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 回款-toB
   * @name FinancePaymentCollectionClaim
   * @summary 获取认领信息
   * @request POST:/api/finance/payment/collection/claim
   * @response `200` `PaymentCollectionClaimResp` OK
   */
  financePaymentCollectionClaim = (req: PaymentCollectionClaimReq, params: RequestParams = {}) =>
    this.request<PaymentCollectionClaimResp, any>({
      path: `/api/finance/payment/collection/claim`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 回款-toB
   * @name FinancePaymentCollectionDefaultApportion
   * @summary 选择发票默认分摊
   * @request POST:/api/finance/payment/collection/default/apportion
   * @response `200` `PaymentCollectionClaimResp` OK
   */
  financePaymentCollectionDefaultApportion = (
    req: DefaultApportionSelectedInvoiceReq,
    params: RequestParams = {},
  ) =>
    this.request<PaymentCollectionClaimResp, any>({
      path: `/api/finance/payment/collection/default/apportion`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 回款-toB
   * @name FinancePaymentCollectionDownloadTemplate
   * @summary 下载导入回款模板
   * @request GET:/api/finance/payment/collection/downloadTemplate
   * @response `200` `CommonRespString` OK
   */
  financePaymentCollectionDownloadTemplate = (params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/finance/payment/collection/downloadTemplate`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 回款-toB
   * @name FinancePaymentCollectionExportList
   * @summary 导出回款列表
   * @request POST:/api/finance/payment/collection/exportList
   * @response `200` `CommonRespCommonExportResp` OK
   */
  financePaymentCollectionExportList = (
    req: PaymentCollectionListReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/finance/payment/collection/exportList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 回款-toB
   * @name FinancePaymentCollectionImportData
   * @summary 导入回款数据
   * @request POST:/api/finance/payment/collection/importData
   * @response `200` `CommonRespVoid` OK
   */
  financePaymentCollectionImportData = (req: UploadReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/finance/payment/collection/importData`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 回款-toB
   * @name FinancePaymentCollectionPublish
   * @summary 回款信息发布
   * @request POST:/api/finance/payment/collection/publish
   * @response `200` `CommonRespVoid` OK
   */
  financePaymentCollectionPublish = (
    req: PaymentCollectionPublishReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/finance/payment/collection/publish`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 回款-toB
   * @name FinancePaymentCollectionQueryDetail
   * @summary 回款详情查询
   * @request GET:/api/finance/payment/collection/queryDetail
   * @response `200` `PaymentCollectionDetailResp` OK
   */
  financePaymentCollectionQueryDetail = (
    query: {
      /** code */
      code: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<PaymentCollectionDetailResp, any>({
      path: `/api/finance/payment/collection/queryDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 回款-toB
   * @name FinancePaymentCollectionQueryList
   * @summary 回款列表查询
   * @request POST:/api/finance/payment/collection/queryList
   * @response `200` `PaymentCollectionListResp` OK
   */
  financePaymentCollectionQueryList = (req: PaymentCollectionListReq, params: RequestParams = {}) =>
    this.request<PaymentCollectionListResp, any>({
      path: `/api/finance/payment/collection/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 回款-toB
   * @name FinancePaymentCollectionRelatedCustomer
   * @summary 关联客户
   * @request POST:/api/finance/payment/collection/relatedCustomer
   * @response `200` `CommonRespVoid` OK
   */
  financePaymentCollectionRelatedCustomer = (
    req: PaymentCollectionLinkCustomerReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/finance/payment/collection/relatedCustomer`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 回款-toB
   * @name FinancePaymentCollectionRelatedInvoice
   * @summary 关联发票
   * @request POST:/api/finance/payment/collection/relatedInvoice
   * @response `200` `CommonRespVoid` OK
   */
  financePaymentCollectionRelatedInvoice = (
    req: PaymentCollectionRelatedInvoiceReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/finance/payment/collection/relatedInvoice`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 回款-toB
   * @name FinancePaymentCollectionRevocation
   * @summary 回款信息撤销发布
   * @request POST:/api/finance/payment/collection/revocation
   * @response `200` `CommonRespVoid` OK
   */
  financePaymentCollectionRevocation = (
    req: PaymentCollectionPublishReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/finance/payment/collection/revocation`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 回款-toB
   * @name FinancePaymentCollectionSaveFee
   * @summary 更新手续费
   * @request POST:/api/finance/payment/collection/save/fee
   * @response `200` `CommonRespVoid` OK
   */
  financePaymentCollectionSaveFee = (
    req: PaymentCollectionSaveFeeReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/finance/payment/collection/save/fee`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 回款-toB
   * @name FinancePaymentCollectionSaveOrUpdate
   * @summary 新增或修改回款
   * @request POST:/api/finance/payment/collection/saveOrUpdate
   * @response `200` `CommonRespVoid` OK
   */
  financePaymentCollectionSaveOrUpdate = (
    req: PaymentCollectionAddReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/finance/payment/collection/saveOrUpdate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 平台订单
   * @name FinancePlatformOrderDeletedBatch
   * @summary 批量删除
   * @request POST:/api/finance/platform/order/deletedBatch
   * @response `200` `CommonRespVoid` OK
   */
  financePlatformOrderDeletedBatch = (
    req: PlatformOrderBatchDeletedReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/finance/platform/order/deletedBatch`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 平台订单
   * @name FinancePlatformOrderExport
   * @summary 导出
   * @request POST:/api/finance/platform/order/export
   * @response `200` `CommonRespCommonExportResp` OK
   */
  financePlatformOrderExport = (req: PlatformOrderListReq, params: RequestParams = {}) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/finance/platform/order/export`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 平台订单
   * @name FinancePlatformOrderMarkPushStatus
   * @summary 标记推送状态
   * @request POST:/api/finance/platform/order/markPushStatus
   * @response `200` `CommonRespCommonBatchResp` OK
   */
  financePlatformOrderMarkPushStatus = (
    req: PlatformOrderBatchChangePushStatuReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespCommonBatchResp, any>({
      path: `/api/finance/platform/order/markPushStatus`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 平台订单
   * @name FinancePlatformOrderPushBatch
   * @summary 批量推送
   * @request POST:/api/finance/platform/order/pushBatch
   * @response `200` `CommonRespCommonBatchResp` OK
   */
  financePlatformOrderPushBatch = (req: PlatformOrderBatchPushReq, params: RequestParams = {}) =>
    this.request<CommonRespCommonBatchResp, any>({
      path: `/api/finance/platform/order/pushBatch`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 平台订单
   * @name FinancePlatformOrderQueryDetailHeader
   * @summary 查询详情表头
   * @request POST:/api/finance/platform/order/queryDetailHeader
   * @response `200` `PlatformOrderDetailHeaderResp` OK
   */
  financePlatformOrderQueryDetailHeader = (
    req: PlatformOrderDetailHeaderReq,
    params: RequestParams = {},
  ) =>
    this.request<PlatformOrderDetailHeaderResp, any>({
      path: `/api/finance/platform/order/queryDetailHeader`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 平台订单
   * @name FinancePlatformOrderQueryItemList
   * @summary 明细查询
   * @request POST:/api/finance/platform/order/queryItemList
   * @response `200` `PlatformOrderItemListResp` OK
   */
  financePlatformOrderQueryItemList = (req: PlatformOrderItemListReq, params: RequestParams = {}) =>
    this.request<PlatformOrderItemListResp, any>({
      path: `/api/finance/platform/order/queryItemList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 平台订单
   * @name FinancePlatformOrderQueryList
   * @summary 列表查询
   * @request POST:/api/finance/platform/order/queryList
   * @response `200` `PlatformOrderListResp` OK
   */
  financePlatformOrderQueryList = (req: PlatformOrderListReq, params: RequestParams = {}) =>
    this.request<PlatformOrderListResp, any>({
      path: `/api/finance/platform/order/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 平台订单
   * @name FinancePlatformOrderQueryPushBatchList
   * @summary 列表推送批次
   * @request POST:/api/finance/platform/order/queryPushBatchList
   * @response `200` `PlatformOrderPushBatchListResp` OK
   */
  financePlatformOrderQueryPushBatchList = (
    req: PlatformOrderListReq,
    params: RequestParams = {},
  ) =>
    this.request<PlatformOrderPushBatchListResp, any>({
      path: `/api/finance/platform/order/queryPushBatchList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 平台订单
   * @name FinancePlatformOrderQueryResultMapping
   * @summary 查询结果映射
   * @request POST:/api/finance/platform/order/queryResultMapping
   * @response `200` `PlatformOrderResultMappingResp` OK
   */
  financePlatformOrderQueryResultMapping = (codes: string[], params: RequestParams = {}) =>
    this.request<PlatformOrderResultMappingResp, any>({
      path: `/api/finance/platform/order/queryResultMapping`,
      method: 'POST',
      body: codes,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 平台订单
   * @name FinancePlatformOrderQueryTableConfigs
   * @summary 查询表配置
   * @request GET:/api/finance/platform/order/queryTableConfigs
   * @response `200` `(TableConfigResp)[]` OK
   */
  financePlatformOrderQueryTableConfigs = (params: RequestParams = {}) =>
    this.request<TableConfigResp[], any>({
      path: `/api/finance/platform/order/queryTableConfigs`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 预处理规则管理
   * @name FinancePretreatmentRuleChangeStatus
   * @summary 变更状态
   * @request POST:/api/finance/pretreatment/rule/changeStatus
   * @response `200` `CommonRespVoid` OK
   */
  financePretreatmentRuleChangeStatus = (
    req: IncomeRuleChangeStatusReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/finance/pretreatment/rule/changeStatus`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预处理规则管理
   * @name FinancePretreatmentRuleExe
   * @summary 规则执行
   * @request POST:/api/finance/pretreatment/rule/exe
   * @response `200` `CommonRespCommonExportResp` OK
   */
  financePretreatmentRuleExe = (req: PretreatmentRuleExeReq, params: RequestParams = {}) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/finance/pretreatment/rule/exe`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预处理规则管理
   * @name FinancePretreatmentRuleQueryDetail
   * @summary 查询详情
   * @request GET:/api/finance/pretreatment/rule/queryDetail
   * @response `200` `PretreatmentRuleDbDetailBean` OK
   */
  financePretreatmentRuleQueryDetail = (
    query: {
      /** ruleCode */
      ruleCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<PretreatmentRuleDbDetailBean, any>({
      path: `/api/finance/pretreatment/rule/queryDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预处理规则管理
   * @name FinancePretreatmentRuleQueryList
   * @summary 列表查询
   * @request POST:/api/finance/pretreatment/rule/queryList
   * @response `200` `PretreatmentRuleListResp` OK
   */
  financePretreatmentRuleQueryList = (req: PretreatmentRuleListReq, params: RequestParams = {}) =>
    this.request<PretreatmentRuleListResp, any>({
      path: `/api/finance/pretreatment/rule/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预处理规则管理
   * @name FinancePretreatmentRuleSaveOrUpdate
   * @summary 保存
   * @request POST:/api/finance/pretreatment/rule/saveOrUpdate
   * @response `200` `CommonRespString` OK
   */
  financePretreatmentRuleSaveOrUpdate = (
    req: PretreatmentRuleDbDetailBean,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespString, any>({
      path: `/api/finance/pretreatment/rule/saveOrUpdate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 基础资料-进销存(采购单价)
   * @name FinancePurchasePriceDownLoadTemplate
   * @summary 下载批量新增模板
   * @request POST:/api/finance/purchase/price/downLoadTemplate
   * @response `200` `CommonRespString` OK
   */
  financePurchasePriceDownLoadTemplate = (params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/finance/purchase/price/downLoadTemplate`,
      method: 'POST',
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 基础资料-进销存(采购单价)
   * @name FinancePurchasePriceExport
   * @summary 采购单价列表导出
   * @request POST:/api/finance/purchase/price/export
   * @response `200` `CommonRespCommonExportResp` OK
   */
  financePurchasePriceExport = (req: BudgetPurchaseListReq, params: RequestParams = {}) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/finance/purchase/price/export`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 基础资料-进销存(采购单价)
   * @name FinancePurchasePriceImportData
   * @summary 批量导入
   * @request POST:/api/finance/purchase/price/importData
   * @response `200` `CommonRespVoid` OK
   */
  financePurchasePriceImportData = (req: UploadReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/finance/purchase/price/importData`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 基础资料-进销存(采购单价)
   * @name FinancePurchasePriceQueryList
   * @summary 采购单价列表查询
   * @request POST:/api/finance/purchase/price/queryList
   * @response `200` `BudgetPurchaseListResp` OK
   */
  financePurchasePriceQueryList = (req: BudgetPurchaseListReq, params: RequestParams = {}) =>
    this.request<BudgetPurchaseListResp, any>({
      path: `/api/finance/purchase/price/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 采购管理模块
   * @name FinancePurhcaseExportDetailList
   * @summary 导出详情
   * @request POST:/api/finance/purhcase/exportDetailList
   * @response `200` `CommonExportResp` OK
   */
  financePurhcaseExportDetailList = (req: PurchaseListReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/finance/purhcase/exportDetailList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 采购管理模块
   * @name FinancePurhcaseMarkPushStatus
   * @summary 标记推送状态
   * @request POST:/api/finance/purhcase/markPushStatus
   * @response `200` `CommonRespObject` OK
   */
  financePurhcaseMarkPushStatus = (
    req: PurchaseOrderBatchChangePushStatusReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/finance/purhcase/markPushStatus`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 采购管理模块
   * @name FinancePurhcaseQueryList
   * @summary 列表查询
   * @request POST:/api/finance/purhcase/queryList
   * @response `200` `PurchaseListResp` OK
   */
  financePurhcaseQueryList = (req: PurchaseListReq, params: RequestParams = {}) =>
    this.request<PurchaseListResp, any>({
      path: `/api/finance/purhcase/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 采购管理模块
   * @name FinancePurhcaseQueryPurchaseDetail
   * @summary 采购订单详情
   * @request GET:/api/finance/purhcase/queryPurchaseDetail
   * @response `200` `PurchaseOrderDetailResp` OK
   */
  financePurhcaseQueryPurchaseDetail = (
    query: {
      /** code */
      code: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<PurchaseOrderDetailResp, any>({
      path: `/api/finance/purhcase/queryPurchaseDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 采购管理模块
   * @name FinancePurhcaseQueryPurchaseInStockDetail
   * @summary 采购入库单详情
   * @request GET:/api/finance/purhcase/queryPurchaseInStockDetail
   * @response `200` `PurchaseInStockDetailResp` OK
   */
  financePurhcaseQueryPurchaseInStockDetail = (
    query: {
      /** code */
      code: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<PurchaseInStockDetailResp, any>({
      path: `/api/finance/purhcase/queryPurchaseInStockDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 采购管理模块
   * @name FinancePurhcaseQueryPurchaseReturnDetail
   * @summary 采购退货单详情
   * @request GET:/api/finance/purhcase/queryPurchaseReturnDetail
   * @response `200` `PurchaseRefundDetailResp` OK
   */
  financePurhcaseQueryPurchaseReturnDetail = (
    query: {
      /** code */
      code: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<PurchaseRefundDetailResp, any>({
      path: `/api/finance/purhcase/queryPurchaseReturnDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 收款条件
   * @name FinanceReceiptConditionAdd
   * @summary 新增收款条件
   * @request POST:/api/finance/receipt/condition/add
   * @response `200` `CommonRespString` OK
   */
  financeReceiptConditionAdd = (req: ReceiptConditionDetailReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/finance/receipt/condition/add`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 收款条件
   * @name FinanceReceiptConditionQueryList
   * @summary 收款条件列表查询
   * @request POST:/api/finance/receipt/condition/queryList
   * @response `200` `ReceiptConditionListResp` OK
   */
  financeReceiptConditionQueryList = (req: ReceiptConditionListReq, params: RequestParams = {}) =>
    this.request<ReceiptConditionListResp, any>({
      path: `/api/finance/receipt/condition/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 收款条件
   * @name FinanceReceiptConditionUpdateStatus
   * @summary 修改状态
   * @request POST:/api/finance/receipt/condition/updateStatus
   * @response `200` `CommonRespString` OK
   */
  financeReceiptConditionUpdateStatus = (
    req: ReceiptConditionUpdateStatusReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespString, any>({
      path: `/api/finance/receipt/condition/updateStatus`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销售出库单
   * @name FinanceSalesOutStockOrderExportList
   * @summary 导出列表
   * @request POST:/api/finance/sales/outStock/order/exportList
   * @response `200` `CommonExportResp` OK
   */
  financeSalesOutStockOrderExportList = (
    req: SalesOutStockOrderListQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/finance/sales/outStock/order/exportList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销售出库单
   * @name FinanceSalesOutStockOrderMarkPushStatus
   * @summary 标记推送状态
   * @request POST:/api/finance/sales/outStock/order/markPushStatus
   * @response `200` `CommonRespObject` OK
   */
  financeSalesOutStockOrderMarkPushStatus = (
    req: SalesOutStockOrderBatchChangePushStatusReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/finance/sales/outStock/order/markPushStatus`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销售出库单
   * @name FinanceSalesOutStockOrderPushByCondition
   * @summary 按条件推送
   * @request POST:/api/finance/sales/outStock/order/pushByCondition
   * @response `200` `CommonRespObject` OK
   */
  financeSalesOutStockOrderPushByCondition = (
    req: SalesOutStockOrderListQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/finance/sales/outStock/order/pushByCondition`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销售出库单
   * @name FinanceSalesOutStockOrderQueryList
   * @summary 列表查询
   * @request POST:/api/finance/sales/outStock/order/queryList
   * @response `200` `SalesOutStockOrderQueryListResp` OK
   */
  financeSalesOutStockOrderQueryList = (
    req: SalesOutStockOrderListQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<SalesOutStockOrderQueryListResp, any>({
      path: `/api/finance/sales/outStock/order/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销售出库单
   * @name FinanceSalesOutStockOrderUpdateOutTime
   * @summary 更新单据的出库时间
   * @request POST:/api/finance/sales/outStock/order/updateOutTime
   * @response `200` `CommonRespObject` OK
   */
  financeSalesOutStockOrderUpdateOutTime = (
    req: SalesOutStockOrderUpdateOutTimeReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/finance/sales/outStock/order/updateOutTime`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 基础资料-Sell In单价
   * @name FinanceSellInDownLoadTemplate
   * @summary 下载批量新增模板
   * @request POST:/api/finance/sell/in/downLoadTemplate
   * @response `200` `CommonRespString` OK
   */
  financeSellInDownLoadTemplate = (params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/finance/sell/in/downLoadTemplate`,
      method: 'POST',
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 基础资料-Sell In单价
   * @name FinanceSellInExport
   * @summary Sell In 单价列表导出
   * @request POST:/api/finance/sell/in/export
   * @response `200` `CommonRespCommonExportResp` OK
   */
  financeSellInExport = (req: BudgetSellInListReq, params: RequestParams = {}) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/finance/sell/in/export`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 基础资料-Sell In单价
   * @name FinanceSellInImportData
   * @summary 批量导入
   * @request POST:/api/finance/sell/in/importData
   * @response `200` `CommonRespVoid` OK
   */
  financeSellInImportData = (req: UploadReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/finance/sell/in/importData`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 基础资料-Sell In单价
   * @name FinanceSellInQueryList
   * @summary Sell In 单价列表查询
   * @request POST:/api/finance/sell/in/queryList
   * @response `200` `BudgetSellInListResp` OK
   */
  financeSellInQueryList = (req: BudgetSellInListReq, params: RequestParams = {}) =>
    this.request<BudgetSellInListResp, any>({
      path: `/api/finance/sell/in/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags toB结算单
   * @name FinanceStatementExportList
   * @summary 结算单导出
   * @request POST:/api/finance/statement/exportList
   * @response `200` `CommonExportResp` OK
   */
  financeStatementExportList = (req: SettlementFormListReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/finance/statement/exportList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags toB结算单
   * @name FinanceStatementQueryBillingInfo
   * @summary 获取开票信息
   * @request POST:/api/finance/statement/queryBillingInfo
   * @response `200` `BillingInfoResp` OK
   */
  financeStatementQueryBillingInfo = (req: BillingInfoReq, params: RequestParams = {}) =>
    this.request<BillingInfoResp, any>({
      path: `/api/finance/statement/queryBillingInfo`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags toB结算单
   * @name FinanceStatementQueryCreditLimit
   * @summary 查询客户信用额度
   * @request POST:/api/finance/statement/queryCreditLimit
   * @response `200` `CustomerCreditLimitResp` OK
   */
  financeStatementQueryCreditLimit = (req: CustomerCreditLimitReq, params: RequestParams = {}) =>
    this.request<CustomerCreditLimitResp, any>({
      path: `/api/finance/statement/queryCreditLimit`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags toB结算单
   * @name FinanceStatementQueryDetail
   * @summary 详情查询
   * @request GET:/api/finance/statement/queryDetail
   * @response `200` `SettlementFormDetailResp` OK
   */
  financeStatementQueryDetail = (
    query: {
      /** code */
      code: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<SettlementFormDetailResp, any>({
      path: `/api/finance/statement/queryDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags toB结算单
   * @name FinanceStatementQueryList
   * @summary 列表查询
   * @request POST:/api/finance/statement/queryList
   * @response `200` `SettlementFormListResp` OK
   */
  financeStatementQueryList = (req: SettlementFormListReq, params: RequestParams = {}) =>
    this.request<SettlementFormListResp, any>({
      path: `/api/finance/statement/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 调拨单
   * @name FinanceTransferSlipQueryDetail
   * @summary 详情查询
   * @request GET:/api/finance/transfer/slip/queryDetail
   * @response `200` `TransferSlipDetailQueryResp` OK
   */
  financeTransferSlipQueryDetail = (
    query: {
      /** code */
      code: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<TransferSlipDetailQueryResp, any>({
      path: `/api/finance/transfer/slip/queryDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 调拨单
   * @name FinanceTransferSlipQueryList
   * @summary 列表查询
   * @request POST:/api/finance/transfer/slip/queryList
   * @response `200` `TransferSlipListQueryResp` OK
   */
  financeTransferSlipQueryList = (req: TransferSlipListQueryReq, params: RequestParams = {}) =>
    this.request<TransferSlipListQueryResp, any>({
      path: `/api/finance/transfer/slip/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
}
