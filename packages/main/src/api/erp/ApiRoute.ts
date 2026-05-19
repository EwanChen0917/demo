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
  AfterSalesStatisticsReq,
  AllChannelOrderListQueryResp,
  AllInventoryAmountListReq,
  AllInventoryAmountListResp,
  BatchInventoryLogQueryListReq,
  BatchInventoryLogQueryListResp,
  BatchInventoryQueryListReq,
  BatchInventoryQueryListResp,
  BatchSalesForecastWeekChangeStatusReq,
  BatchUpdateAddressReq,
  CartonSizeDeleteReq,
  CartonSizeListQueryReq,
  CartonSizeListQueryResp,
  CartonSizeListSaveReq,
  CenterInventoryQueryListReq,
  CenterInventoryQueryListResp,
  ClientDetailChangeStatusReq,
  ClientDetailQueryResp,
  ClientDetailSaveReq,
  ClientListQueryReq,
  ClientListQueryResp,
  CommonExportResp,
  CommonPageReq,
  CommonResp,
  CommonRespBoolean,
  CommonRespCommonExportResp,
  CommonRespCustomerCreditLimitQueryListResp,
  CommonRespErpFlowDetailQueryResp,
  CommonRespErpOrderPreCheckInventoryResp,
  CommonRespGucangPackageListResp,
  CommonRespLadingBillResp,
  CommonRespListCustomerCreditLimitBeanRpc,
  CommonRespListErpDictBean,
  CommonRespListErpOrderStockQueryResp,
  CommonRespListFirstLogisticsOperateLogBean,
  CommonRespListInventorySnapQueryResp,
  CommonRespListLogisticsOpLog,
  CommonRespListOperationLogBean,
  CommonRespListOsLogisticsClaim,
  CommonRespListOsLogisticsClaimLog,
  CommonRespListPlanTurnoverStrategyTemplateBean,
  CommonRespListPrDownDetailItemReq,
  CommonRespListString,
  CommonRespListWarehouseCascadeTreeNodeResp,
  CommonRespListWarehouseRuleOutBean,
  CommonRespLogisticsChannelDetailResp,
  CommonRespLogisticsSupplierAccountTokenResp,
  CommonRespObject,
  CommonRespOperationPackageOrderResp,
  CommonRespOrderBatchAuthResp,
  CommonRespOrderBatchSendNoticeResp,
  CommonRespOrderBatchToWaitSendResp,
  CommonRespOrderPreCheckStockResp,
  CommonRespOrderQueryStockAvailableResp,
  CommonRespOsLogisticsClaim,
  CommonRespPackageChooseSourceOrderListResp,
  CommonRespPackageMarkDataPageResp,
  CommonRespPackageMarkDataResp,
  CommonRespPackageMarkListQueryResp,
  CommonRespPalletDataPageResp,
  CommonRespPalletDataResp,
  CommonRespPalletInboundResp,
  CommonRespPalletStatusBean,
  CommonRespPlanTurnOverCacuBean,
  CommonRespProductConfigPropertyResp,
  CommonRespRemovalDetailBean,
  CommonRespString,
  CommonRespTiktokStockAdjustmentQuerySkuIdInfoResp,
  CommonRespTiktokStockAdjustmentQuerySkuInfoResp,
  CommonRespTiktokStockAdjustmentQuerySkuShopInfoResp,
  CommonRespTiktokStockAdjustmentQueryStockResp,
  CommonRespTiktokStockAdjustmentSyncStatusResp,
  CommonRespTkStockAdjustmentDetailQueryResp,
  CommonRespTkStockAdjustmentQueryListResp,
  CommonRespVoid,
  CommonRespWarehouseBumperPageResp,
  CommonRespWarehouseDeliveryOrderResp,
  CommonRespWarehouseLogisticsTrajectoryResp,
  CommonRespWarehouseShipResp,
  CommonRespWoShippingMarkGenerateResp,
  CommonRespWoShippingMarkParseResp,
  CurrencyQueryResp,
  CustomerCreditLimitLogBeanRpc,
  CustomerCreditLimitLogPageReq,
  CustomerCreditLimitLogPageResp,
  CustomerCreditLimitLogQueryReq,
  CustomerCreditLimitOperationBeanRpc,
  CustomerCreditLimitQueryListReq,
  CustomerDockingRelationDeleteReq,
  CustomerDockingRelationQueryListReq,
  CustomerDockingRelationQueryListResp,
  CustomerDockingRelationSaveReq,
  CustomerProductTagUploadReq,
  CustomerSkuLabelListQueryResp,
  CustomerSkuLabelQueryReq,
  CustomerSkuLabelUpdateReq,
  CustomsBatchDownloadReq,
  CustomsDeclarationEntityDefaultReq,
  CustomsDeclarationEntityDetailQueryResp,
  CustomsDeclarationEntityListQueryResp,
  CustomsDeclarationEntitySelectListQueryResp,
  CustomsDeclarationEntityUpdateReq,
  CustomsElementDetailQueryResp,
  CustomsElementListQueryResp,
  CustomsElementUpdateReq,
  CustomsGenerateRecordQueryResp,
  CustomsListQueryReq,
  CustomsListQueryResp,
  CustomsProductEntityDeleteReq,
  CustomsProductEntityUpdateReq,
  CustomsProductListQueryResp,
  CustomsReceiptUploadReq,
  CustomsSingDownloadReq,
  CustomsUploadReq,
  CustomTransferQueryReq,
  DeliveryOrderListQueryResp,
  DeliveryOrderQueryReq,
  DeptMemberListQueryResp,
  DictCommonBean,
  DictQueryReq,
  DownloadOrderAttachmentUrlReq,
  DubboCommonRespString,
  EdiOrderListQueryResp,
  EdiOrderQueryReq,
  ElsSubaccountInfo,
  ErpAuditReq,
  ErpFbaSendListQueryReq,
  ErpFbaSendListQueryResp,
  ErpFbaShipmentListQueryReq,
  ErpFbaShipmentListQueryResp,
  ErpFlowChangeStatusReq,
  ErpFlowCreatorListResp,
  ErpFlowDetailQueryResp,
  ErpFlowListQueryReq,
  ErpFlowListQueryResp,
  ErpFlowSaveReq,
  ErpFlowTemplateResp,
  ErpJjTransfeQueryReq,
  ErpOdoBaseReq,
  ErpOdoRemarkSaveReq,
  ErpOrderAllChannelQueryListReq,
  ErpOrderFreightRuleBean,
  ErpOrderPreCheckInventoryReq,
  ErpOrderRateCfgChangeStatusReq,
  ErpOrderRateCfgChooseBean,
  ErpOrderRateCfgListQueryReq,
  ErpOrderRateCfgListQueryResp,
  ErpOrderRateCfgListQueryRespItem,
  ErpOrderReferenceParamsResp,
  ErpOrderTransferApprovalStatusReq,
  ErpOrderTransferCopySaveReq,
  ErpOrderTransferDeleteReq,
  ErpOrderTransferDetailQueryResp,
  ErpOrderTransferGroupCodeReq,
  ErpOrderTransferListQueryReq,
  ErpOrderTransferListQueryResp,
  ErpOrderTransferLogQueryResp,
  ErpOrderTransferSaveReq,
  ErpOrderTransferThirdCodeReq,
  ErpOrderTransferTransportReq,
  ErpOrderWarehouseRuleBean,
  ErpOrderWpQueryListReq,
  ErpOrderWpQueryListResp,
  ErpOrderWpUpdateReq,
  ErpOrderWpUpdateStatusReq,
  ErpOverSeaShipmentListQueryReq,
  ErpOverSeaShipmentListQueryResp,
  ErpPoCloseReq,
  ErpPoSyncReq,
  ErpReoSyncReq,
  ErpShipmentListPushXyReq,
  ErpSiteQueryListReq,
  ErpSiteQueryListResp,
  ErpSiteSaveReq,
  ExhibitionOrderAbandonReq,
  ExhibitionOrderAddReq,
  ExhibitionOrderDetailResp,
  ExhibitionOrderMappingReq,
  ExhibitionOrderQueryListResp,
  ExhibitionOrderRePushReq,
  FbaDeliverBatchQueryListResp,
  FbaInventoryQueryListReq,
  FbaInventoryQueryListResp,
  FbaSendQueryListReq,
  FbaShipmentMonitorChangeStatusReq,
  FbaShipmentMonitorDetailQueryResp,
  FbaShipmentMonitorListQueryResp,
  FbaShipmentMonitorSaveReq,
  FbaShipmentMonitorTransportQueryResp,
  FbaShipmentQueryListReq,
  FirstLogAttachmentUploadReq,
  FirstLogDiffIgnoreListReq,
  FirstLogDiffIgnoreListResp,
  FirstLogDiffIgnoreReq,
  FirstLogDiffQueryReq,
  FirstLogisticsCommonV2Req,
  FirstLogisticsDiffQueryListV2Resp,
  FirstLogisticsQueryListV2Req,
  FirstLogisticsQueryListV2Resp,
  FirstLogisticsQueryV2Req,
  FirstLogisticsQueryV2Resp,
  FirstLogisticsSaveV2Req,
  FirstLogisticsSkuQueryV2Resp,
  FirstLogisticsSkuSaveV2Req,
  FirstLogisticsUpdateV2Req,
  FirstVesselTimelinessQueryListReq,
  FirstVesselTimelinessQueryListResp,
  FirstVesselTimelinessQuerySendLogListResp,
  FirstVesselTimelinessSendNoticeReq,
  FirstVtQueryListResp,
  GcUploadReq,
  GcUploadResp,
  GeneratePayableReq,
  GoodInQueryListReq,
  GoodInQueryListResp,
  GucangPackageListReq,
  GuCangTransferSlipOrderBean,
  GuCangTransferSlipOrderBeanWarehouseService,
  ImportDataReq,
  ImportDataResp,
  ImportTemplateQueryResp,
  InventoryInDetailQueryListReq,
  InventoryInDetailQueryListResp,
  InventorySnaoshotReq,
  InventoryV2QueryListReq,
  InventoryVcQueryListReq,
  LadingBillFileUpdateReq,
  LadingBillReq,
  LadingBillUpdateReq,
  LogisticsChannelAddReq,
  LogisticsChannelChangeReq,
  LogisticsChannelListReq,
  LogisticsChannelListResp,
  LogisticsChannelPriceUpdateReq,
  LogisticsChannelSelectDownloadReq,
  LogisticsChannelUpdateReq,
  LogisticsChannelUploadReq,
  LogisticsChannelVolumePriceUpdateReq,
  LogisticsClaimAddReq,
  LogisticsClaimInvalidateReq,
  LogisticsClaimPageResp,
  LogisticsClaimQueryReq,
  LogisticsClaimUpdateReq,
  LogisticsConfigDeleteReq,
  LogisticsConfigQueryListReq,
  LogisticsConfigQueryListResp,
  LogisticsConfigSaveReq,
  LogisticsReconciliationCommonReq,
  LogisticsReconciliationPageResp,
  LogisticsReconciliationQueryReq,
  LogisticsReconciliationUpdateReq,
  LogisticsSupplierAddReq,
  LogisticsSupplierChangeReq,
  LogisticsSupplierListReq,
  LogisticsSupplierListResp,
  LogisticsSupplierRefreshTokenReq,
  LogisticsSupplierUpdateReq,
  LogisticsTransportAddReq,
  LogisticsTransportChangeReq,
  LogisticsTransportListReq,
  LogisticsTransportListResp,
  LogisticsTransportListV2Req,
  LogisticsTransportListV2Resp,
  LogisticsTransportUpdateReq,
  MemberListMapQueryResp,
  ModelRefreshReq,
  ModifyWarehouseLogisticsReq,
  NavigationParam,
  OdoAbondonReq,
  OdoBatchReq,
  OdoDetailAndDraftResp,
  OdoDetailResp,
  OdoDetailSaveReq,
  OdoDetailUpdateReq,
  OdoDraftSaveReq,
  OdoStatusReverseReq,
  OdoUploadPackReq,
  OdoUploadTrackNumReq,
  OdoUploadTrackNumReq2,
  OdsListQueryReq,
  OdsListQueryResp,
  OnWayInventoryVcQueryListReq,
  OpenApiCustomerSaveReq,
  OpenApiCustomerSaveResp,
  OperationMemberListQueryReq,
  OperationPackageOrderQueryReq,
  OperationPackageOrderUpdateFileReq,
  OperationPackageOrderUpdateReq,
  OrderAuthSaveReq,
  OrderBatchAuthReq,
  OrderBatchAuthResp,
  OrderBatchConfirmSendReq,
  OrderBatchFbaDetailResp,
  OrderBatchSendNoticeReq,
  OrderBatchToAbondReq,
  OrderBatchToAuditReq,
  OrderBatchToFbaReq,
  OrderBatchToWaitSendReq,
  OrderBatchUpdateAuthReq,
  OrderBindingWarehouseAndShipReq,
  OrderChangeSkuBatchToAuditResp,
  OrderChangeSkuReq,
  OrderCutAttBatchReq,
  OrderCutAttReq,
  OrderDetailResp,
  OrderListQueryResp,
  OrderMarkDeliveryReq,
  OrderPreCheckStockReq,
  OrderPushGuReq,
  OrderQueryStockAvailableReq,
  OrderRemarkReq,
  OrderRemarkSaveReq,
  OrderSaveReq,
  OrderSubReq,
  OrderUpdateUploadReq,
  OverseaFirstVesselQueryListReq,
  OverseaSendQueryListReq,
  OverseaSendQueryListResp,
  PackageChooseOrderListCheckReq,
  PackageChooseOrderListReq,
  PackageChooseOrderListResp,
  PackageChooseSourceOrderListReq,
  PackageGeneratePackageMarkDataReq,
  PackageGeneratePalletMarkDataReq,
  PackageMarkConfirmReq,
  PackageMarkConfirmV2Req,
  PackageMarkDataPageReq,
  PackageMarkDataReq,
  PackageMarkDownLoadReq,
  PackageMarkGeneratorFileReq,
  PackageMarkListQueryReq,
  PackageOrderDownLoadReq,
  PackageOrderUpdateReq,
  PackageOrderUploadReq,
  PackageOrderUploadWithOutOrderReq,
  PackageSingleMarkConfirmReq,
  PackageStatusReq,
  PackageTemplateReq,
  PalletDataPageReq,
  PalletDataReq,
  PalletDetailDownLoadReq,
  PalletInboundReq,
  PalletInboundUpdateFileReq,
  PalletInboundUpdateReq,
  PalletMarkConfirmReq,
  PalletMarkFileConfirmReq,
  PalletMarkSingleConfirmReq,
  PalletOrderUpdateReq,
  PalletOrderUploadReq,
  PalletPackageDeleteReq,
  PalletPackageDetailReq,
  PalletPackageDetailResp,
  PalletPackageNameUpdateReq,
  PalletPackageQueryReq,
  PalletPackageQueryResp,
  PalletPackageZipDownLoadReq,
  PalletTemplateReq,
  PlanBillLadingAuthReq,
  PlanBillLadingDetailQueryResp,
  PlanBillLadingListQueryReq,
  PlanBillLadingListQueryResp,
  PlanBillLadingModifyReq,
  PlanBillLadingPickListQueryResp,
  PlanBillLadingProductListQueryReq,
  PlanBillLadingProductListQueryResp,
  PlanBillLadingSaveReq,
  PlanCommandShipUploadReq,
  PlanDeliveryBillAbandonReq,
  PlanDeliveryBillConfirmQueryReq,
  PlanDeliveryBillDetailResp,
  PlanDeliveryBillListQueryReq,
  PlanDeliveryBillListQueryResp,
  PlanDeliveryBillRetryEcQueryReq,
  PlanDeliveryBillSyncReq,
  PlanInventoryFbaPageResp,
  PlanInventoryFbaQueryReq,
  PlanInventorySelfPageResp,
  PlanInventorySelfQueryReq,
  PlanInventoryTiktokPageResp,
  PlanInventoryTiktokQueryReq,
  PlanInventoryWalmartPageResp,
  PlanInventoryWalmartQueryReq,
  PlanPickupBatchDetailQueryResp,
  PlanPickupBatchSaveReq,
  PlanPickupDeleteReq,
  PlanPickupDetailQueryResp,
  PlanPickupItemQueryReq,
  PlanPickupItemQueryResp,
  PlanPickupListQueryReq,
  PlanPickupListQueryResp,
  PlanPickupMaterialPurchaseSummaryQueryResp,
  PlanPickupPlantOperationReq,
  PlanPickupPushReq,
  PlanPickupSaveReq,
  PlanPickupSupplierQueryReq,
  PlanPickupSupplierQueryResp,
  PlanPreBookInboudDetailReq,
  PlanPrebookInboundAddReq,
  PlanPreBookInBoundDeleteReq,
  PlanPreBookInboundDetailResp,
  PlanPrebookInboundModifyReq,
  PlanPrebookInboundQueryReq,
  PlanPrebookInboundQueryResp,
  PlanPreBookInboundShipReq,
  PlanShipCommandDetailQueryV2Resp,
  PlanShipCommandDetailResp,
  PlanShipCommandListQueryResp,
  PlanShipCommandListQueryV2Resp,
  PlanShipCommandSaveReq,
  PlanShipCommandSaveV2Req,
  PlanShipCommandSelectPlanListQueryResp,
  PlanShipCommandShipReq,
  PlanShipCommandSupplyQtyResp,
  PlanShipCommandSupplyQueryResp,
  PlanShipCommandSupplyQueryV2Resp,
  PlanShipCommandUpdateStatusReq,
  PlanShipCommandUpdateV2Req,
  PlanShipmentListQueryReq,
  PlanShipmentListQueryResp,
  PlanShipmentSaveV2Req,
  PlanShipmentSelectPlanListQueryResp,
  PlanSuppluCycleSaveReq,
  PlanSupplyCycleListQueryReq,
  PlanSupplyCycleListQueryResp,
  PlanTurnOverCacuBean,
  PlanTurnoverConfirmStatusReq,
  PlanTurnOverDetailQueryResp,
  PlanTurnOverListImportReq,
  PlanTurnOverListQueryReq,
  PlanTurnOverListQueryResp,
  PlanTurnOverLogisticsQueryResp,
  PlanTurnOverLogisticsSaveReq,
  PlanTurnoverRefreshReq,
  PlanTurnoverStrategyBean,
  PlanTurnoverStrategySaveReq,
  PlanTurnoverStrategyTemplateBean,
  PlanTurnOverStrategyTemplateListQueryResp,
  PlanTurnoverStrategyTemplateSaveReq,
  PlatformInventoryQueryListReq,
  PlatformInventoryQueryListResp,
  PrAuthReq,
  PrDetailQueryResp,
  PrDownDetailItemReq,
  PriceRecordSyncReq,
  PrListQueryReq,
  PrListQueryResp,
  ProductConfigPropertyReq,
  ProductInventoryQueryListReq,
  ProductInventoryQueryListResp,
  ProductSnInboundQueryListReq,
  ProductSnInboundQueryListResp,
  ProductSnOutboundAppSaveReq,
  ProductSnOutboundDeletedListReq,
  ProductSnOutboundQueryListReq,
  ProductSnOutboundQueryListResp,
  ProductSnOutboundScanCheckReq,
  ProductSnOutboundScanCheckResp,
  ProductSnOutboundScanQueryReq,
  ProductSnOutboundScanQueryResp,
  PrSaveResp,
  PrsfssChangeStatusReq,
  PrsfssQueryListReq,
  PrsfssQueryListResp,
  PrsfssSaveOrUpdateReq,
  PsfaiChangeStatusReq,
  PsfaiQueryListReq,
  PsfaiQueryListResp,
  PsfaiSaveReq,
  PsfatChangeStatusReq,
  PsfatQueryListReq,
  PsfatQueryListResp,
  PsfatSaveReq,
  PsfccChangeStatusReq,
  PsfccQueryListReq,
  PsfccQueryListResp,
  PsfccSaveReq,
  PsfpcChangeStatusReq,
  PsfpcQueryListReq,
  PsfpcQueryListResp,
  PsfpcSaveReq,
  PsfsChangeStatusReq,
  PsfsQueryListReq,
  PsfsQueryListResp,
  PsfsSaveReq,
  PsfssChangeStatusReq,
  PsfssQueryListReq,
  PsfssQueryListResp,
  PsfssSaveOrUpdateReq,
  PsftChangeStatusReq,
  PsftOptionReq,
  PsftQueryListReq,
  PsftQueryListResp,
  PsftQueryOptionListResp,
  PsftSaveReq,
  PurchaseOrderHeadListQueryResp,
  PurchaseOrderItemListQueryReq,
  PurchaseOrderItemListQueryResp,
  PurchaseOrderListQueryReq,
  PurchaseQueryListReq,
  PurchaseQueryListResp,
  QueryOrderBatchToFbaReq,
  QueryPushGcTransferSlipOrderEnumsResp,
  QueryRemovalReq,
  QueryWarehouseBumperReq,
  QueryWarehouseLogisticsReq,
  QuotationOrderAbandonReq,
  QuotationOrderAuthReq,
  QuotationOrderDetailResp,
  QuotationOrderListReq,
  QuotationOrderListResp,
  QuotationOrderSaveReq,
  QuotationPriceListReq,
  QuotationPriceListResp,
  QuotationPriceSaveReq,
  RecomputeFeeReq,
  ReferenceParamsDeliveryMapResp,
  ReferenceParamsDeliveryReq,
  RemovalBatchReq,
  RemovalPageResp,
  RemovalSaveReq,
  RequirementSugguestCurrentQueryReq,
  RequirementSugguestCurrentQueryResp,
  RequirementSugguestDetailQueryResp,
  RequirementSugguestExportResp,
  RequirementSugguestListQueryResp,
  RequirementSugguestSaveReq,
  RetailPlanInventoryPageResp,
  RetailPlanInventoryQueryReq,
  RetailSalesForecastAuditDetailV2Resp,
  RetailSalesForecastAuditHistoryQueryReq,
  RetailSalesForecastListQueryV2Req,
  RetailSalesForecastListQueryV2Resp,
  RetailSalesForecastSaveSkuReq,
  RetailSalesForecastSaveSkuReqItem,
  RetailSalesForecastUpdateSubmitReq,
  RetailSalesStatisticsReq,
  RetailSalesStatisticsResp,
  SaleClearSortReq,
  SaleDeliveryNoticeAcceptReq,
  SaleForecastUploadReq,
  SaleOutboundOrderDetailReq,
  SaleOutboundOrderDetailResp,
  SaleOutboundOrderReq,
  SaleOutboundOrderResp,
  SalesForecastAllListQueryResp,
  SalesForecastAuditDetailV2Resp,
  SalesForecastAuditHistoryQueryReq,
  SalesForecastAuditHistoryQueryResp,
  SalesForecastAuditQueryReq,
  SalesForecastAuditQueryResp,
  SalesForecastListQueryResp,
  SalesForecastListQueryV2Req,
  SalesForecastListQueryV2Resp,
  SalesForecastLogDetailQueryResp,
  SalesForecastLogListQueryResp,
  SalesForecastSaveReq,
  SalesForecastSnapHistoryQueryReq,
  SalesForecastSnapHistoryQueryResp,
  SalesForecastUpdateSubmitReq,
  SalesForecastWeekChangeStatusReq,
  SalesForecastWeekSaveReq,
  SalesOrderStaticsResp,
  SalesOrderStatisticsReq,
  SalesStatisticsReq,
  SalesStatisticsResp,
  SampleOrderV3ListQueryReq,
  ShippingMethodListQueryReq,
  ShippingMethodListQueryResp,
  ShippingMethodSaveReq,
  ShopifyOrderReq,
  ShopifyPlanInventoryPageResp,
  ShopifyPlanInventoryQueryReq,
  SmwpUpdateReq,
  SpListQueryReq,
  SpListQueryResp,
  SpSkuConfigQueryReq,
  SpSkuConfigQueryResp,
  SpSkuConfigSaveReq,
  SrmSyncKingdeeReq,
  StockingTimeDetailsQueryReq,
  StockingTimeDetailsQueryResp,
  StockingTimeListQueryReq,
  StockingTimeListQueryResp,
  StockingTimeSaveReq,
  SubDeptListQueryReq,
  SubDeptListQueryResp,
  SuggestPriceReq,
  SuggestPriceResp,
  SupplierInviteDetailResp,
  SupplierInviteInitSaveReq,
  SupplierInviteListReq,
  SupplierInviteListResp,
  SupplierInviteSaveReq,
  SupplierMasterDataExportReq,
  SupplierMasterDataQueryReq,
  SupplierMasterDataQueryResp,
  SupplierStatusCountItem,
  SyncGcOrderInfoReq,
  SyncSupplierReq,
  ThirdInventoryQueryListReq,
  ThirdInventoryQueryListResp,
  TiktokInventoryQueryListReq,
  TiktokInventoryQueryListResp,
  TiktokInventoryShopQueryListResp,
  TiktokStockAdjustmentQueryListReq,
  TiktokStockAdjustmentQuerySkuIdInfoReq,
  TiktokStockAdjustmentQuerySkuInfoReq,
  TiktokStockAdjustmentQuerySkuShopInfoReq,
  TiktokStockAdjustmentQueryStockReq,
  TiktokStockAdjustmentSaveReq,
  UnBindOrderCodeReq,
  UploadReq,
  VcOrderListQueryReq,
  VcOrderListQueryResp,
  WalmartInventoryQueryListReq,
  WalmartInventoryQueryListResp,
  WarehouseAffiliationChangeStatusReq,
  WarehouseAffiliationListQueryResp,
  WarehouseAffiliationSaveReq,
  WarehouseAffiliationWarehouseListQueryResp,
  WarehouseEcBeanPageResp,
  WarehouseEcBeanResp,
  WarehouseInventoryQueryListReq,
  WarehouseInventoryQueryListResp,
  WarehouseLogReq,
  WarehouseLogResp,
  WarehouseMappingReq,
  WarehouseOrderDetailResp,
  WarehouseOrderListQueryReq,
  WarehouseOrderListQueryResp,
  WarehouseQueryReq,
  WarehouseQueryResp,
  WarehouseShipListQueryReq,
  WarehouseSimpleQueryReq,
  WarehouseSyncReq,
  WarehouseUpdateReq,
  WarehouseVatAddReq,
  WarehouseVatQueryListResp,
  WarehouseVatQueryReq,
  WarehouseVatStatusReq,
  WarehouseVatUpdateReq,
  WoOrderRemarkSaveReq,
  WoShippingMarkGenerateReq,
  WoShippingMarkParseReq,
} from './data-contracts';

export namespace Api {
  /**
   * No description
   * @tags 客户管理
   * @name LuteosErpBaseB2BClientChangeStatus
   * @summary 变更状态
   * @request POST:/api/luteos/erp/base/b2b/client/changeStatus
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpBaseB2BClientChangeStatus {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ClientDetailChangeStatusReq;
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
   * @tags 客户管理
   * @name LuteosErpBaseB2BClientInfoDownTemplate
   * @summary 下载批量更新上传模板
   * @request POST:/api/luteos/erp/base/b2b/client/info/downTemplate
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosErpBaseB2BClientInfoDownTemplate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ClientListQueryReq;
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
   * @tags 客户管理
   * @name LuteosErpBaseB2BClientProductSkuSyncCrm
   * @summary 测试接口-客户产品信息同步CRM
   * @request POST:/api/luteos/erp/base/b2b/client/productSkuSyncCrm
   * @response `200` `CommonRespListString` OK
   */
  export namespace LuteosErpBaseB2BClientProductSkuSyncCrm {
    export type RequestParams = {};
    export type RequestQuery = {
      /** skuCodes */
      skuCodes: string[];
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
   * @tags 客户管理
   * @name LuteosErpBaseB2BClientQueryDetail
   * @summary 详情
   * @request GET:/api/luteos/erp/base/b2b/client/queryDetail
   * @response `200` `ClientDetailQueryResp` OK
   */
  export namespace LuteosErpBaseB2BClientQueryDetail {
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
    export type ResponseBody = ClientDetailQueryResp;
  }

  /**
   * No description
   * @tags 客户管理
   * @name LuteosErpBaseB2BClientQueryList
   * @summary 列表查询
   * @request POST:/api/luteos/erp/base/b2b/client/queryList
   * @response `200` `ClientListQueryResp` OK
   */
  export namespace LuteosErpBaseB2BClientQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ClientListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ClientListQueryResp;
  }

  /**
   * No description
   * @tags 客户管理
   * @name LuteosErpBaseB2BClientQueryProductUpcEanList
   * @summary 查询-产品up、ean码列表
   * @request POST:/api/luteos/erp/base/b2b/client/queryProductUpcEanList
   * @response `200` `CustomerSkuLabelListQueryResp` OK
   */
  export namespace LuteosErpBaseB2BClientQueryProductUpcEanList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CustomerSkuLabelQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CustomerSkuLabelListQueryResp;
  }

  /**
   * No description
   * @tags 客户管理
   * @name LuteosErpBaseB2BClientSaveOrUpdate
   * @summary 新增/更新
   * @request POST:/api/luteos/erp/base/b2b/client/saveOrUpdate
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosErpBaseB2BClientSaveOrUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ClientDetailSaveReq;
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
   * @tags 客户管理
   * @name LuteosErpBaseB2BClientSaveOrUpdateProduct
   * @summary 新增编辑-产品up、ean码
   * @request POST:/api/luteos/erp/base/b2b/client/saveOrUpdateProduct
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpBaseB2BClientSaveOrUpdateProduct {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CustomerSkuLabelUpdateReq;
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
   * @tags 客户管理
   * @name LuteosErpBaseB2BClientSkuLabelDownTemplate
   * @summary 下载sku贴标上传模板
   * @request POST:/api/luteos/erp/base/b2b/client/skuLabel/downTemplate
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosErpBaseB2BClientSkuLabelDownTemplate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ClientListQueryReq;
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
   * @tags 客户管理
   * @name LuteosErpBaseB2BClientSyncCrm
   * @summary 同步CRM测试接口
   * @request POST:/api/luteos/erp/base/b2b/client/syncCrm
   * @response `200` `OpenApiCustomerSaveResp` OK
   */
  export namespace LuteosErpBaseB2BClientSyncCrm {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OpenApiCustomerSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = OpenApiCustomerSaveResp;
  }

  /**
   * No description
   * @tags 客户管理
   * @name LuteosErpBaseB2BClientUpload
   * @summary 上传sku贴标上传模板
   * @request POST:/api/luteos/erp/base/b2b/client/upload
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpBaseB2BClientUpload {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CustomerProductTagUploadReq;
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
   * @tags 客户管理
   * @name LuteosErpBaseB2BClientUploadInfo
   * @summary 上传批量更新
   * @request POST:/api/luteos/erp/base/b2b/client/upload/info
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpBaseB2BClientUploadInfo {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UploadReq;
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
   * @tags 客户对接关系
   * @name LuteosErpBaseCustomerDockingRelationBatchDelete
   * @summary 批量删除
   * @request POST:/api/luteos/erp/base/customer/docking/relation/batchDelete
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosErpBaseCustomerDockingRelationBatchDelete {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CustomerDockingRelationDeleteReq;
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
   * @tags 客户对接关系
   * @name LuteosErpBaseCustomerDockingRelationDownImportTemplate
   * @summary 下载导入模板
   * @request POST:/api/luteos/erp/base/customer/docking/relation/downImportTemplate
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosErpBaseCustomerDockingRelationDownImportTemplate {
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
   * @tags 客户对接关系
   * @name LuteosErpBaseCustomerDockingRelationExport
   * @summary 导出
   * @request POST:/api/luteos/erp/base/customer/docking/relation/export
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosErpBaseCustomerDockingRelationExport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CustomerDockingRelationQueryListReq;
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
   * @tags 客户对接关系
   * @name LuteosErpBaseCustomerDockingRelationImport
   * @summary 导入
   * @request POST:/api/luteos/erp/base/customer/docking/relation/import
   * @response `200` `ImportDataResp` OK
   */
  export namespace LuteosErpBaseCustomerDockingRelationImport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UploadReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ImportDataResp;
  }

  /**
   * No description
   * @tags 客户对接关系
   * @name LuteosErpBaseCustomerDockingRelationQueryList
   * @summary 列表查询
   * @request POST:/api/luteos/erp/base/customer/docking/relation/queryList
   * @response `200` `CustomerDockingRelationQueryListResp` OK
   */
  export namespace LuteosErpBaseCustomerDockingRelationQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CustomerDockingRelationQueryListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CustomerDockingRelationQueryListResp;
  }

  /**
   * No description
   * @tags 客户对接关系
   * @name LuteosErpBaseCustomerDockingRelationSaveOrUpdate
   * @summary 新增/更新
   * @request POST:/api/luteos/erp/base/customer/docking/relation/saveOrUpdate
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosErpBaseCustomerDockingRelationSaveOrUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CustomerDockingRelationSaveReq;
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
   * @tags ERP审核管理
   * @name LuteosErpBaseFlowChangeStatus
   * @summary 变更状态
   * @request POST:/api/luteos/erp/base/flow/changeStatus
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpBaseFlowChangeStatus {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ErpFlowChangeStatusReq;
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
   * @tags ERP审核管理
   * @name LuteosErpBaseFlowExportList
   * @summary 导出
   * @request POST:/api/luteos/erp/base/flow/exportList
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace LuteosErpBaseFlowExportList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ErpFlowListQueryReq;
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
   * @tags ERP审核管理
   * @name LuteosErpBaseFlowQueryCreatorList
   * @summary 创建人列表查询
   * @request POST:/api/luteos/erp/base/flow/queryCreatorList
   * @response `200` `ErpFlowCreatorListResp` OK
   */
  export namespace LuteosErpBaseFlowQueryCreatorList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ErpFlowListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ErpFlowCreatorListResp;
  }

  /**
   * No description
   * @tags ERP审核管理
   * @name LuteosErpBaseFlowQueryDetail
   * @summary 详情
   * @request GET:/api/luteos/erp/base/flow/queryDetail
   * @response `200` `ErpFlowDetailQueryResp` OK
   */
  export namespace LuteosErpBaseFlowQueryDetail {
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
    export type ResponseBody = ErpFlowDetailQueryResp;
  }

  /**
   * No description
   * @tags ERP审核管理
   * @name LuteosErpBaseFlowQueryList
   * @summary 列表查询
   * @request POST:/api/luteos/erp/base/flow/queryList
   * @response `200` `ErpFlowListQueryResp` OK
   */
  export namespace LuteosErpBaseFlowQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ErpFlowListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ErpFlowListQueryResp;
  }

  /**
   * No description
   * @tags ERP审核管理
   * @name LuteosErpBaseFlowQueryTemplate
   * @summary 模板查询
   * @request GET:/api/luteos/erp/base/flow/queryTemplate
   * @response `200` `ErpFlowTemplateResp` OK
   */
  export namespace LuteosErpBaseFlowQueryTemplate {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * 类型：0-报价单 1-线下订单 2-申购单 3-销售预测 4-分仓规则 5-运费规则 7-自动拆单 8-shopify分仓规则
       * @format int32
       */
      type: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ErpFlowTemplateResp;
  }

  /**
   * No description
   * @tags ERP审核管理
   * @name LuteosErpBaseFlowSaveOrUpdate
   * @summary 新增/更新
   * @request POST:/api/luteos/erp/base/flow/saveOrUpdate
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosErpBaseFlowSaveOrUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ErpFlowSaveReq;
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
   * @tags 物流配置
   * @name LuteosErpBaseLogisticsConfigBatchDelete
   * @summary 批量删除
   * @request POST:/api/luteos/erp/base/logistics/config/batchDelete
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosErpBaseLogisticsConfigBatchDelete {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LogisticsConfigDeleteReq;
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
   * @tags 物流配置
   * @name LuteosErpBaseLogisticsConfigExport
   * @summary 导出
   * @request POST:/api/luteos/erp/base/logistics/config/export
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosErpBaseLogisticsConfigExport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LogisticsConfigQueryListReq;
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
   * @tags 物流配置
   * @name LuteosErpBaseLogisticsConfigImport
   * @summary 导入
   * @request POST:/api/luteos/erp/base/logistics/config/import
   * @response `200` `ImportDataResp` OK
   */
  export namespace LuteosErpBaseLogisticsConfigImport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UploadReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ImportDataResp;
  }

  /**
   * No description
   * @tags 物流配置
   * @name LuteosErpBaseLogisticsConfigImportTemplateUrl
   * @summary 获取导入模板链接
   * @request GET:/api/luteos/erp/base/logistics/config/importTemplateUrl
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosErpBaseLogisticsConfigImportTemplateUrl {
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
   * @tags 物流配置
   * @name LuteosErpBaseLogisticsConfigQueryList
   * @summary 列表查询
   * @request POST:/api/luteos/erp/base/logistics/config/queryList
   * @response `200` `LogisticsConfigQueryListResp` OK
   */
  export namespace LuteosErpBaseLogisticsConfigQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LogisticsConfigQueryListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = LogisticsConfigQueryListResp;
  }

  /**
   * No description
   * @tags 物流配置
   * @name LuteosErpBaseLogisticsConfigSaveOrUpdate
   * @summary 新增/更新
   * @request POST:/api/luteos/erp/base/logistics/config/saveOrUpdate
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosErpBaseLogisticsConfigSaveOrUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LogisticsConfigSaveReq;
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
   * @tags ERP-基础管理
   * @name LuteosErpBasePriceSync
   * @summary 价格主数据同步
   * @request POST:/api/luteos/erp/base/price/sync
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosErpBasePriceSync {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PriceRecordSyncReq;
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
   * @tags 站点列表
   * @name LuteosErpBaseSiteQueryList
   * @summary 列表查询（去重）
   * @request POST:/api/luteos/erp/base/site/queryList
   * @response `200` `ErpSiteQueryListResp` OK
   */
  export namespace LuteosErpBaseSiteQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ErpSiteQueryListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ErpSiteQueryListResp;
  }

  /**
   * No description
   * @tags 站点列表
   * @name LuteosErpBaseSiteQueryListV1
   * @summary 列表查询(未去重)
   * @request POST:/api/luteos/erp/base/site/queryListV1
   * @response `200` `ErpSiteQueryListResp` OK
   */
  export namespace LuteosErpBaseSiteQueryListV1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ErpSiteQueryListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ErpSiteQueryListResp;
  }

  /**
   * No description
   * @tags 站点列表
   * @name LuteosErpBaseSiteSaveOrUpdate
   * @summary 新增/更新
   * @request POST:/api/luteos/erp/base/site/saveOrUpdate
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpBaseSiteSaveOrUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ErpSiteSaveReq;
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
   * @tags ERP-供应商管理
   * @name LuteosErpBaseSupplierSync
   * @summary 同步供应商
   * @request POST:/api/luteos/erp/base/supplier/sync
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosErpBaseSupplierSync {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SyncSupplierReq;
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
   * @tags ERP-订单-整箱规则
   * @name LuteosErpCartonSizeDelete
   * @summary 删除
   * @request POST:/api/luteos/erp/carton/size/delete
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosErpCartonSizeDelete {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CartonSizeDeleteReq;
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
   * @tags ERP-订单-整箱规则
   * @name LuteosErpCartonSizeDownTemplate
   * @summary 下载批量导入模板(导出)
   * @request POST:/api/luteos/erp/carton/size/downTemplate
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosErpCartonSizeDownTemplate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CartonSizeListQueryReq;
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
   * @tags ERP-订单-整箱规则
   * @name LuteosErpCartonSizeQueryList
   * @summary 查询列表
   * @request POST:/api/luteos/erp/carton/size/queryList
   * @response `200` `CartonSizeListQueryResp` OK
   */
  export namespace LuteosErpCartonSizeQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CartonSizeListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CartonSizeListQueryResp;
  }

  /**
   * No description
   * @tags ERP-订单-整箱规则
   * @name LuteosErpCartonSizeSave
   * @summary 新增
   * @request POST:/api/luteos/erp/carton/size/save
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosErpCartonSizeSave {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CartonSizeListSaveReq;
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
   * @tags ERP-订单-整箱规则
   * @name LuteosErpCartonSizeUpdate
   * @summary 编辑
   * @request POST:/api/luteos/erp/carton/size/update
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosErpCartonSizeUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CartonSizeListSaveReq;
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
   * @tags ERP-订单-整箱规则
   * @name LuteosErpCartonSizeUpload
   * @summary 批量导入
   * @request POST:/api/luteos/erp/carton/size/upload
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpCartonSizeUpload {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UploadReq;
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
   * @tags 信用额度管理
   * @name LuteosErpCustomerCreditLimitBatchLockOperation
   * @summary 信用额度批量操作--只给openApi RPC,页面不使用这个接口
   * @request POST:/api/luteos/erp/customer/credit/limit/batchLockOperation
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpCustomerCreditLimitBatchLockOperation {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CustomerCreditLimitOperationBeanRpc[];
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
   * @tags 信用额度管理
   * @name LuteosErpCustomerCreditLimitDownCreditLimitTemplate
   * @summary 下载信用额度列表上传模板
   * @request POST:/api/luteos/erp/customer/credit/limit/downCreditLimitTemplate
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosErpCustomerCreditLimitDownCreditLimitTemplate {
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
   * @tags 信用额度管理
   * @name LuteosErpCustomerCreditLimitExportCustomerCreditList
   * @summary 信用额度列表查询-导出
   * @request POST:/api/luteos/erp/customer/credit/limit/exportCustomerCreditList
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace LuteosErpCustomerCreditLimitExportCustomerCreditList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CustomerCreditLimitQueryListReq;
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
   * @tags 信用额度管理
   * @name LuteosErpCustomerCreditLimitImportCustomerCreditList
   * @summary 信用额度列表查询-导入
   * @request POST:/api/luteos/erp/customer/credit/limit/importCustomerCreditList
   * @response `200` `ImportDataResp` OK
   */
  export namespace LuteosErpCustomerCreditLimitImportCustomerCreditList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UploadReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ImportDataResp;
  }

  /**
   * No description
   * @tags 信用额度管理
   * @name LuteosErpCustomerCreditLimitOperation
   * @summary 信用额度操作--只给openApi RPC,页面不使用这个接口
   * @request POST:/api/luteos/erp/customer/credit/limit/operation
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpCustomerCreditLimitOperation {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CustomerCreditLimitOperationBeanRpc;
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
   * @tags 信用额度管理
   * @name LuteosErpCustomerCreditLimitQueryCustomerCreditLimit
   * @summary 信用额度查询
   * @request POST:/api/luteos/erp/customer/credit/limit/queryCustomerCreditLimit
   * @response `200` `CommonRespListCustomerCreditLimitBeanRpc` OK
   */
  export namespace LuteosErpCustomerCreditLimitQueryCustomerCreditLimit {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = string[];
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespListCustomerCreditLimitBeanRpc;
  }

  /**
   * No description
   * @tags 信用额度管理
   * @name LuteosErpCustomerCreditLimitQueryCustomerCreditList
   * @summary 信用额度列表查询
   * @request POST:/api/luteos/erp/customer/credit/limit/queryCustomerCreditList
   * @response `200` `CommonRespCustomerCreditLimitQueryListResp` OK
   */
  export namespace LuteosErpCustomerCreditLimitQueryCustomerCreditList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CustomerCreditLimitQueryListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespCustomerCreditLimitQueryListResp;
  }

  /**
   * No description
   * @tags 信用额度管理
   * @name LuteosErpCustomerCreditLimitQueryOperationLogs
   * @summary 信用额度操作日志查询-不分页-页面不用,测试
   * @request POST:/api/luteos/erp/customer/credit/limit/queryOperationLogs
   * @response `200` `CustomerCreditLimitLogBeanRpc` OK
   */
  export namespace LuteosErpCustomerCreditLimitQueryOperationLogs {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CustomerCreditLimitLogQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CustomerCreditLimitLogBeanRpc;
  }

  /**
   * No description
   * @tags 信用额度管理
   * @name LuteosErpCustomerCreditLimitQueryOperationPageLog
   * @summary 信用额度操作日志查询
   * @request POST:/api/luteos/erp/customer/credit/limit/queryOperationPageLog
   * @response `200` `CustomerCreditLimitLogPageResp` OK
   */
  export namespace LuteosErpCustomerCreditLimitQueryOperationPageLog {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CustomerCreditLimitLogPageReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CustomerCreditLimitLogPageResp;
  }

  /**
   * No description
   * @tags 报关单
   * @name LuteosErpCustomsDeleteOwnSingleCustomsFile
   * @summary 报关入库-删除
   * @request POST:/api/luteos/erp/customs/deleteOwnSingleCustomsFile
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosErpCustomsDeleteOwnSingleCustomsFile {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CustomsSingDownloadReq;
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
   * @tags 报关单
   * @name LuteosErpCustomsDeleteProduct
   * @summary 报关产品-删除
   * @request POST:/api/luteos/erp/customs/deleteProduct
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosErpCustomsDeleteProduct {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CustomsProductEntityDeleteReq;
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
   * @tags 报关单
   * @name LuteosErpCustomsDownElmentTemplate
   * @summary 下载报关要素上传模板
   * @request POST:/api/luteos/erp/customs/downElmentTemplate
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosErpCustomsDownElmentTemplate {
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
   * @tags 报关单
   * @name LuteosErpCustomsDownProductTemplate
   * @summary 下载报关产品上传模板
   * @request POST:/api/luteos/erp/customs/downProductTemplate
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosErpCustomsDownProductTemplate {
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
   * @tags 报关单
   * @name LuteosErpCustomsDownloadCustomsTemplate
   * @summary 报关入库-下载报关单上传模板
   * @request POST:/api/luteos/erp/customs/downloadCustomsTemplate
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosErpCustomsDownloadCustomsTemplate {
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
   * @tags 报关单
   * @name LuteosErpCustomsExportBatchCustomsFile
   * @summary 报关入库-批量记录下载
   * @request POST:/api/luteos/erp/customs/exportBatchCustomsFile
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosErpCustomsExportBatchCustomsFile {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CustomsBatchDownloadReq;
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
   * @tags 报关单
   * @name LuteosErpCustomsExportCustomsList
   * @summary 报关入库-导出报关清单
   * @request POST:/api/luteos/erp/customs/exportCustomsList
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosErpCustomsExportCustomsList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CustomsListQueryReq;
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
   * @tags 报关单
   * @name LuteosErpCustomsExportNewCustomsData
   * @summary 报关产品-导出未下载数据
   * @request POST:/api/luteos/erp/customs/exportNewCustomsData
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosErpCustomsExportNewCustomsData {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CustomsListQueryReq;
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
   * @tags 报关单
   * @name LuteosErpCustomsExportPackData
   * @summary 报关入库-导出装箱数据
   * @request POST:/api/luteos/erp/customs/exportPackData
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosErpCustomsExportPackData {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CustomTransferQueryReq;
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
   * @tags 报关单
   * @name LuteosErpCustomsExportProductList
   * @summary 报关产品-导出
   * @request GET:/api/luteos/erp/customs/exportProductList
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace LuteosErpCustomsExportProductList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
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
   * @tags 报关单
   * @name LuteosErpCustomsExportSingleCustomsFile
   * @summary 报关入库-单个记录下载
   * @request POST:/api/luteos/erp/customs/exportSingleCustomsFile
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosErpCustomsExportSingleCustomsFile {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CustomsSingDownloadReq;
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
   * @tags 报关单
   * @name LuteosErpCustomsImportCustoms
   * @summary 报关入库-导入报关单
   * @request POST:/api/luteos/erp/customs/importCustoms
   * @response `200` `ImportDataResp` OK
   */
  export namespace LuteosErpCustomsImportCustoms {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CustomsUploadReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ImportDataResp;
  }

  /**
   * No description
   * @tags 报关单
   * @name LuteosErpCustomsImportElement
   * @summary 导入报关要素
   * @request POST:/api/luteos/erp/customs/importElement
   * @response `200` `ImportDataResp` OK
   */
  export namespace LuteosErpCustomsImportElement {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UploadReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ImportDataResp;
  }

  /**
   * No description
   * @tags 报关单
   * @name LuteosErpCustomsImportProduct
   * @summary 报关产品-导入
   * @request POST:/api/luteos/erp/customs/importProduct
   * @response `200` `ImportDataResp` OK
   */
  export namespace LuteosErpCustomsImportProduct {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UploadReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ImportDataResp;
  }

  /**
   * No description
   * @tags 报关单
   * @name LuteosErpCustomsImportReceipt
   * @summary 报关入库-回执单上传
   * @request POST:/api/luteos/erp/customs/importReceipt
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpCustomsImportReceipt {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CustomsReceiptUploadReq;
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
   * @tags 报关单
   * @name LuteosErpCustomsQueryCustomsList
   * @summary 报关入库-查询报关列表
   * @request GET:/api/luteos/erp/customs/queryCustomsList
   * @response `200` `CustomsListQueryResp` OK
   */
  export namespace LuteosErpCustomsQueryCustomsList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 合同协议号 */
      contractNo?: string;
      /**
       * 创建时间 -结束
       * @format date
       */
      createDateEnd?: string;
      /**
       * 创建时间 -开始
       * @format date
       */
      createDateStart?: string;
      /** 创建人 */
      creator?: string;
      /** 公司主体 */
      declarationEntity?: string;
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
      /** 货件号 */
      shipmentId?: string;
      /** 货件号 */
      shipmentIds?: string[];
      /** skuCode */
      skuCode?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CustomsListQueryResp;
  }

  /**
   * No description
   * @tags 报关单
   * @name LuteosErpCustomsQueryDeclarationEntity
   * @summary 报关主体-查询列表
   * @request GET:/api/luteos/erp/customs/queryDeclarationEntity
   * @response `200` `CustomsDeclarationEntityListQueryResp` OK
   */
  export namespace LuteosErpCustomsQueryDeclarationEntity {
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
    export type ResponseBody = CustomsDeclarationEntityListQueryResp;
  }

  /**
   * No description
   * @tags 报关单
   * @name LuteosErpCustomsQueryDeclarationEntityDetail
   * @summary 报关主体-查询详情
   * @request GET:/api/luteos/erp/customs/queryDeclarationEntityDetail
   * @response `200` `CustomsDeclarationEntityDetailQueryResp` OK
   */
  export namespace LuteosErpCustomsQueryDeclarationEntityDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 唯一编码 */
      code?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CustomsDeclarationEntityDetailQueryResp;
  }

  /**
   * No description
   * @tags 报关单
   * @name LuteosErpCustomsQueryDeclarationEntitySelectList
   * @summary 报关主体-下拉列表查询
   * @request GET:/api/luteos/erp/customs/queryDeclarationEntitySelectList
   * @response `200` `CustomsDeclarationEntitySelectListQueryResp` OK
   */
  export namespace LuteosErpCustomsQueryDeclarationEntitySelectList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CustomsDeclarationEntitySelectListQueryResp;
  }

  /**
   * No description
   * @tags 报关单
   * @name LuteosErpCustomsQueryElementDetail
   * @summary 报关要素-查询详情
   * @request GET:/api/luteos/erp/customs/queryElementDetail
   * @response `200` `CustomsElementDetailQueryResp` OK
   */
  export namespace LuteosErpCustomsQueryElementDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * 海关编码
       * @format int64
       */
      id?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CustomsElementDetailQueryResp;
  }

  /**
   * No description
   * @tags 报关单
   * @name LuteosErpCustomsQueryElementList
   * @summary 报关要素-查询列表
   * @request GET:/api/luteos/erp/customs/queryElementList
   * @response `200` `CustomsElementListQueryResp` OK
   */
  export namespace LuteosErpCustomsQueryElementList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 海关编码 */
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
    export type ResponseBody = CustomsElementListQueryResp;
  }

  /**
   * No description
   * @tags 报关单
   * @name LuteosErpCustomsQueryGenerateRecordList
   * @summary 报关入库-下载记录查询
   * @request GET:/api/luteos/erp/customs/queryGenerateRecordList
   * @response `200` `CustomsGenerateRecordQueryResp` OK
   */
  export namespace LuteosErpCustomsQueryGenerateRecordList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 合同协议号 */
      contractNoList?: string;
      /**
       * 报关时间 -结束
       * @format date
       */
      createDateEnd?: string;
      /**
       * 报关时间 -开始
       * @format date
       */
      createDateStart?: string;
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
    export type ResponseBody = CustomsGenerateRecordQueryResp;
  }

  /**
   * No description
   * @tags 报关单
   * @name LuteosErpCustomsQueryProductList
   * @summary 报关产品-查询列表
   * @request GET:/api/luteos/erp/customs/queryProductList
   * @response `200` `CustomsProductListQueryResp` OK
   */
  export namespace LuteosErpCustomsQueryProductList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CustomsProductListQueryResp;
  }

  /**
   * No description
   * @tags 报关单
   * @name LuteosErpCustomsSaveOrUpdateDeclarationEntity
   * @summary 报关主体-修改/保存
   * @request POST:/api/luteos/erp/customs/saveOrUpdateDeclarationEntity
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpCustomsSaveOrUpdateDeclarationEntity {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CustomsDeclarationEntityUpdateReq;
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
   * @tags 报关单
   * @name LuteosErpCustomsSaveOrUpdateElement
   * @summary 报关要素-修改保存
   * @request POST:/api/luteos/erp/customs/saveOrUpdateElement
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpCustomsSaveOrUpdateElement {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CustomsElementUpdateReq;
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
   * @tags 报关单
   * @name LuteosErpCustomsSaveOrUpdateProduct
   * @summary 报关产品-修改/保存
   * @request POST:/api/luteos/erp/customs/saveOrUpdateProduct
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosErpCustomsSaveOrUpdateProduct {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CustomsProductEntityUpdateReq;
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
   * @tags 报关单
   * @name LuteosErpCustomsUpdateDefault
   * @summary 报关主体-设置默认
   * @request POST:/api/luteos/erp/customs/updateDefault
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpCustomsUpdateDefault {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CustomsDeclarationEntityDefaultReq;
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
   * @tags 调拨单
   * @name LuteosErpDeliveryOrderExport
   * @summary 导出
   * @request POST:/api/luteos/erp/deliveryOrder/export
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosErpDeliveryOrderExport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DeliveryOrderQueryReq;
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
   * @tags 调拨单
   * @name LuteosErpDeliveryOrderPushXyPlan
   * @summary 推送兴运计划单
   * @request POST:/api/luteos/erp/deliveryOrder/pushXyPlan
   * @response `200` `CommonRespOrderBatchAuthResp` OK
   */
  export namespace LuteosErpDeliveryOrderPushXyPlan {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = string[];
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespOrderBatchAuthResp;
  }

  /**
   * No description
   * @tags 调拨单
   * @name LuteosErpDeliveryOrderQueryList
   * @summary 列表查询
   * @request POST:/api/luteos/erp/deliveryOrder/queryList
   * @response `200` `DeliveryOrderListQueryResp` OK
   */
  export namespace LuteosErpDeliveryOrderQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DeliveryOrderQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DeliveryOrderListQueryResp;
  }

  /**
   * No description
   * @tags EDI订单
   * @name LuteosErpEdiDownload
   * @summary 下载EDI订单
   * @request POST:/api/luteos/erp/edi/download
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosErpEdiDownload {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = EdiOrderQueryReq;
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
   * @tags EDI订单
   * @name LuteosErpEdiQueryList
   * @summary 查询EDI订单
   * @request POST:/api/luteos/erp/edi/queryList
   * @response `200` `EdiOrderListQueryResp` OK
   */
  export namespace LuteosErpEdiQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = EdiOrderQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = EdiOrderListQueryResp;
  }

  /**
   * No description
   * @tags ERP-展销会申请单
   * @name LuteosErpExhibitionAbandon
   * @summary 作废
   * @request POST:/api/luteos/erp/exhibition/abandon
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpExhibitionAbandon {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ExhibitionOrderAbandonReq;
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
   * @tags ERP-展销会申请单
   * @name LuteosErpExhibitionDownload
   * @summary 导出
   * @request GET:/api/luteos/erp/exhibition/download
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosErpExhibitionDownload {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * 申请部门
       * @format int64
       */
      applicationDeptId?: number;
      /** 申请人 */
      applicator?: string;
      /**
       * 创建结束时间时间
       * @format date
       */
      endTime?: string;
      /** 展销会单号/OA单号/调拨单号/海外仓出库单/入库单单号/B2B单号/其他单号 */
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
       * 创建开始时间
       * @format date
       */
      startTime?: string;
      /**
       * 状态 100:待确认,200:审核中,300:待调拨,400:已完成,500:异常,600:作废
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
   * @tags ERP-展销会申请单
   * @name LuteosErpExhibitionHandleMapping
   * @summary 关联单据 - 暂存/完成所有单据/保存
   * @request POST:/api/luteos/erp/exhibition/handleMapping
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpExhibitionHandleMapping {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ExhibitionOrderMappingReq;
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
   * @tags ERP-展销会申请单
   * @name LuteosErpExhibitionQueryDetail
   * @summary 查询详情
   * @request GET:/api/luteos/erp/exhibition/queryDetail
   * @response `200` `ExhibitionOrderDetailResp` OK
   */
  export namespace LuteosErpExhibitionQueryDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 展销会单号 */
      exhibitionCode?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ExhibitionOrderDetailResp;
  }

  /**
   * No description
   * @tags ERP-展销会申请单
   * @name LuteosErpExhibitionQueryList
   * @summary 查询列表
   * @request GET:/api/luteos/erp/exhibition/queryList
   * @response `200` `ExhibitionOrderQueryListResp` OK
   */
  export namespace LuteosErpExhibitionQueryList {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * 申请部门
       * @format int64
       */
      applicationDeptId?: number;
      /** 申请人 */
      applicator?: string;
      /**
       * 创建结束时间时间
       * @format date
       */
      endTime?: string;
      /** 展销会单号/OA单号/调拨单号/海外仓出库单/入库单单号/B2B单号/其他单号 */
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
       * 创建开始时间
       * @format date
       */
      startTime?: string;
      /**
       * 状态 100:待确认,200:审核中,300:待调拨,400:已完成,500:异常,600:作废
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
    export type ResponseBody = ExhibitionOrderQueryListResp;
  }

  /**
   * No description
   * @tags ERP-展销会申请单
   * @name LuteosErpExhibitionRePush
   * @summary 重新推送
   * @request POST:/api/luteos/erp/exhibition/rePush
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpExhibitionRePush {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ExhibitionOrderRePushReq;
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
   * @tags ERP-展销会申请单
   * @name LuteosErpExhibitionSaveOrUpdate
   * @summary 新增/编辑
   * @request POST:/api/luteos/erp/exhibition/saveOrUpdate
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpExhibitionSaveOrUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ExhibitionOrderAddReq;
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
   * @tags ERP-基础管理
   * @name LuteosErpExportExportTkShopAcountInfo
   * @summary TK小店-机构达人挂链表-源数据快照
   * @request POST:/api/luteos/erp/export/export/tkShopAcountInfo
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace LuteosErpExportExportTkShopAcountInfo {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CommonPageReq;
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
   * @tags 头程时效
   * @name LuteosErpFirstVesselTimelinessExportList
   * @summary 列表导出
   * @request POST:/api/luteos/erp/firstVesselTimeliness/exportList
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosErpFirstVesselTimelinessExportList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FirstVesselTimelinessQueryListReq;
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
   * @tags 头程时效
   * @name LuteosErpFirstVesselTimelinessQueryList
   * @summary 列表查询
   * @request POST:/api/luteos/erp/firstVesselTimeliness/queryList
   * @response `200` `FirstVesselTimelinessQueryListResp` OK
   */
  export namespace LuteosErpFirstVesselTimelinessQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FirstVesselTimelinessQueryListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = FirstVesselTimelinessQueryListResp;
  }

  /**
   * No description
   * @tags 头程时效
   * @name LuteosErpFirstVesselTimelinessQuerySendLogList
   * @summary 发货日志查询
   * @request GET:/api/luteos/erp/firstVesselTimeliness/querySendLogList
   * @response `200` `FirstVesselTimelinessQuerySendLogListResp` OK
   */
  export namespace LuteosErpFirstVesselTimelinessQuerySendLogList {
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
    export type ResponseBody = FirstVesselTimelinessQuerySendLogListResp;
  }

  /**
   * No description
   * @tags 头程时效
   * @name LuteosErpFirstVesselTimelinessSendNotice
   * @summary 发货提醒-支持批量
   * @request POST:/api/luteos/erp/firstVesselTimeliness/sendNotice
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpFirstVesselTimelinessSendNotice {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FirstVesselTimelinessSendNoticeReq;
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
   * @tags 库存
   * @name LuteosErpInventoryAmazonQueryPlatformList
   * @summary 亚马逊平台库存查询
   * @request POST:/api/luteos/erp/inventory/amazon/queryPlatformList
   * @response `200` `PlatformInventoryQueryListResp` OK
   */
  export namespace LuteosErpInventoryAmazonQueryPlatformList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlatformInventoryQueryListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PlatformInventoryQueryListResp;
  }

  /**
   * No description
   * @tags 库存
   * @name LuteosErpInventoryAmazonPlatformListExport
   * @summary 下载亚马逊平台库存查询
   * @request POST:/api/luteos/erp/inventory/amazonPlatformListExport
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace LuteosErpInventoryAmazonPlatformListExport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlatformInventoryQueryListReq;
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
   * @tags 库存
   * @name LuteosErpInventoryBatchInventoryListExport
   * @summary 下载批次库存查询
   * @request POST:/api/luteos/erp/inventory/batchInventoryListExport
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace LuteosErpInventoryBatchInventoryListExport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BatchInventoryQueryListReq;
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
   * @tags 库存
   * @name LuteosErpInventoryBatchInventoryLogListExport
   * @summary 下载批次库存日志查询
   * @request POST:/api/luteos/erp/inventory/batchInventoryLogListExport
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace LuteosErpInventoryBatchInventoryLogListExport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BatchInventoryLogQueryListReq;
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
   * @tags 库存
   * @name LuteosErpInventoryCenterListExport
   * @summary 下载中仓库存
   * @request POST:/api/luteos/erp/inventory/centerListExport
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace LuteosErpInventoryCenterListExport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CenterInventoryQueryListReq;
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
   * @tags 库存
   * @name LuteosErpInventoryDownSnap
   * @summary 下载库存快照
   * @request GET:/api/luteos/erp/inventory/downSnap
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace LuteosErpInventoryDownSnap {
    export type RequestParams = {};
    export type RequestQuery = {
      /** snapshotDate */
      snapshotDate: string;
    };
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
   * @tags 库存
   * @name LuteosErpInventoryFbaQuerySendList
   * @summary FBA发货单查询
   * @request POST:/api/luteos/erp/inventory/fba/querySendList
   * @response `200` `FbaDeliverBatchQueryListResp` OK
   */
  export namespace LuteosErpInventoryFbaQuerySendList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FbaSendQueryListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = FbaDeliverBatchQueryListResp;
  }

  /**
   * No description
   * @tags 库存
   * @name LuteosErpInventoryFbaShipmentMonitorChangeStatus
   * @summary FBA货件监控-修改状态
   * @request POST:/api/luteos/erp/inventory/fba/shipment/monitor/changeStatus
   * @response `200` `void` OK
   */
  export namespace LuteosErpInventoryFbaShipmentMonitorChangeStatus {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FbaShipmentMonitorChangeStatusReq;
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
   * @tags 库存
   * @name LuteosErpInventoryFbaShipmentMonitorDetail
   * @summary FBA货件监控-查询详情
   * @request GET:/api/luteos/erp/inventory/fba/shipment/monitor/detail
   * @response `200` `FbaShipmentMonitorDetailQueryResp` OK
   */
  export namespace LuteosErpInventoryFbaShipmentMonitorDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** ruleId */
      ruleId: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = FbaShipmentMonitorDetailQueryResp;
  }

  /**
   * No description
   * @tags 库存
   * @name LuteosErpInventoryFbaShipmentMonitorQuery
   * @summary FBA货件监控-查询列表
   * @request POST:/api/luteos/erp/inventory/fba/shipment/monitor/query
   * @response `200` `FbaShipmentMonitorListQueryResp` OK
   */
  export namespace LuteosErpInventoryFbaShipmentMonitorQuery {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CommonPageReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = FbaShipmentMonitorListQueryResp;
  }

  /**
   * No description
   * @tags 库存
   * @name LuteosErpInventoryFbaShipmentMonitorSave
   * @summary FBA货件监控-新增和修改
   * @request POST:/api/luteos/erp/inventory/fba/shipment/monitor/save
   * @response `200` `void` OK
   */
  export namespace LuteosErpInventoryFbaShipmentMonitorSave {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FbaShipmentMonitorSaveReq;
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
   * @tags 库存
   * @name LuteosErpInventoryFbaShipmentMonitorTransportType
   * @summary FBA货件监控-获取所有运输方式
   * @request GET:/api/luteos/erp/inventory/fba/shipment/monitor/transportType
   * @response `200` `(FbaShipmentMonitorTransportQueryResp)[]` OK
   */
  export namespace LuteosErpInventoryFbaShipmentMonitorTransportType {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = FbaShipmentMonitorTransportQueryResp[];
  }

  /**
   * No description
   * @tags 库存
   * @name LuteosErpInventoryFbaSendListExport
   * @summary 下载FBA发货单查询
   * @request POST:/api/luteos/erp/inventory/fbaSendListExport
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace LuteosErpInventoryFbaSendListExport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FbaSendQueryListReq;
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
   * @tags 库存
   * @name LuteosErpInventoryFbaShipmentListDetailExport
   * @summary 下载FBA货件明细
   * @request POST:/api/luteos/erp/inventory/fbaShipmentListDetailExport
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace LuteosErpInventoryFbaShipmentListDetailExport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FbaShipmentQueryListReq;
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
   * @tags 库存
   * @name LuteosErpInventoryGoodInListExport
   * @summary 下载谷仓入库单
   * @request POST:/api/luteos/erp/inventory/goodInListExport
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace LuteosErpInventoryGoodInListExport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = GoodInQueryListReq;
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
   * @tags 库存
   * @name LuteosErpInventoryInventoryInDetailListExport
   * @summary 下载入库明细查询
   * @request POST:/api/luteos/erp/inventory/inventoryInDetailListExport
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace LuteosErpInventoryInventoryInDetailListExport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = InventoryInDetailQueryListReq;
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
   * @tags 库存
   * @name LuteosErpInventoryOverseaQueryFirstVesselList
   * @summary 海外仓头程计划查询
   * @request POST:/api/luteos/erp/inventory/oversea/queryFirstVesselList
   * @response `200` `FirstVtQueryListResp` OK
   */
  export namespace LuteosErpInventoryOverseaQueryFirstVesselList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OverseaFirstVesselQueryListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = FirstVtQueryListResp;
  }

  /**
   * No description
   * @tags 库存
   * @name LuteosErpInventoryOverseaQuerySendList
   * @summary 海外仓发货单查询
   * @request POST:/api/luteos/erp/inventory/oversea/querySendList
   * @response `200` `OverseaSendQueryListResp` OK
   */
  export namespace LuteosErpInventoryOverseaQuerySendList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OverseaSendQueryListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = OverseaSendQueryListResp;
  }

  /**
   * No description
   * @tags 库存
   * @name LuteosErpInventoryOverseaFirstVesseListExport
   * @summary 下载海外仓头程计划查询
   * @request POST:/api/luteos/erp/inventory/overseaFirstVesseListExport
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace LuteosErpInventoryOverseaFirstVesseListExport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OverseaFirstVesselQueryListReq;
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
   * @tags 库存
   * @name LuteosErpInventoryOverseaSendListExport
   * @summary 下载海外仓发货单
   * @request POST:/api/luteos/erp/inventory/overseaSendListExport
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace LuteosErpInventoryOverseaSendListExport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OverseaSendQueryListReq;
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
   * @tags 库存
   * @name LuteosErpInventoryPlanCenterListExport
   * @summary 下载中仓库存-计划
   * @request POST:/api/luteos/erp/inventory/plan/centerListExport
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace LuteosErpInventoryPlanCenterListExport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CenterInventoryQueryListReq;
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
   * @tags 库存
   * @name LuteosErpInventoryPlanPlatformListExport
   * @summary 下载计划平台库存查询
   * @request POST:/api/luteos/erp/inventory/planPlatformListExport
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace LuteosErpInventoryPlanPlatformListExport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlatformInventoryQueryListReq;
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
   * @tags 库存
   * @name LuteosErpInventoryPurchaseQueryList
   * @summary 采购单明细查询
   * @request POST:/api/luteos/erp/inventory/purchase/queryList
   * @response `200` `PurchaseQueryListResp` OK
   */
  export namespace LuteosErpInventoryPurchaseQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PurchaseQueryListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PurchaseQueryListResp;
  }

  /**
   * No description
   * @tags 库存
   * @name LuteosErpInventoryPurchaseListAllExport
   * @summary 下载采购单明细-ALL
   * @request POST:/api/luteos/erp/inventory/purchaseListAllExport
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace LuteosErpInventoryPurchaseListAllExport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PurchaseQueryListReq;
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
   * @tags 库存
   * @name LuteosErpInventoryPurchaseListExport
   * @summary 下载采购单明细
   * @request POST:/api/luteos/erp/inventory/purchaseListExport
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace LuteosErpInventoryPurchaseListExport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PurchaseQueryListReq;
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
   * @tags 库存
   * @name LuteosErpInventoryQuertSnap
   * @summary 获取所有库存快照
   * @request GET:/api/luteos/erp/inventory/quertSnap
   * @response `200` `CommonRespListInventorySnapQueryResp` OK
   */
  export namespace LuteosErpInventoryQuertSnap {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespListInventorySnapQueryResp;
  }

  /**
   * No description
   * @tags 库存
   * @name LuteosErpInventoryQueryAllInventoryAmount
   * @summary 全链路库存分析
   * @request POST:/api/luteos/erp/inventory/queryAllInventoryAmount
   * @response `200` `AllInventoryAmountListResp` OK
   */
  export namespace LuteosErpInventoryQueryAllInventoryAmount {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AllInventoryAmountListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = AllInventoryAmountListResp;
  }

  /**
   * No description
   * @tags 库存
   * @name LuteosErpInventoryQueryBatchInventoryList
   * @summary 批次库存查询
   * @request POST:/api/luteos/erp/inventory/queryBatchInventoryList
   * @response `200` `BatchInventoryQueryListResp` OK
   */
  export namespace LuteosErpInventoryQueryBatchInventoryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BatchInventoryQueryListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = BatchInventoryQueryListResp;
  }

  /**
   * No description
   * @tags 库存
   * @name LuteosErpInventoryQueryBatchInventoryLogList
   * @summary 批次库存日志查询
   * @request POST:/api/luteos/erp/inventory/queryBatchInventoryLogList
   * @response `200` `BatchInventoryLogQueryListResp` OK
   */
  export namespace LuteosErpInventoryQueryBatchInventoryLogList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BatchInventoryLogQueryListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = BatchInventoryLogQueryListResp;
  }

  /**
   * No description
   * @tags 库存
   * @name LuteosErpInventoryQueryCenterList
   * @summary 中仓库存查询
   * @request POST:/api/luteos/erp/inventory/queryCenterList
   * @response `200` `CenterInventoryQueryListResp` OK
   */
  export namespace LuteosErpInventoryQueryCenterList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CenterInventoryQueryListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CenterInventoryQueryListResp;
  }

  /**
   * No description
   * @tags 库存
   * @name LuteosErpInventoryQueryGoodInList
   * @summary 谷仓入库单查询
   * @request POST:/api/luteos/erp/inventory/queryGoodInList
   * @response `200` `GoodInQueryListResp` OK
   */
  export namespace LuteosErpInventoryQueryGoodInList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = GoodInQueryListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = GoodInQueryListResp;
  }

  /**
   * No description
   * @tags 库存
   * @name LuteosErpInventoryQueryInventoryInDetailList
   * @summary 入库明细查询
   * @request POST:/api/luteos/erp/inventory/queryInventoryInDetailList
   * @response `200` `InventoryInDetailQueryListResp` OK
   */
  export namespace LuteosErpInventoryQueryInventoryInDetailList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = InventoryInDetailQueryListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = InventoryInDetailQueryListResp;
  }

  /**
   * No description
   * @tags 库存
   * @name LuteosErpInventoryQueryPlatformListExport2
   * @summary 查询沃尔玛在途库存
   * @request POST:/api/luteos/erp/inventory/queryPlatformListExport2
   * @response `200` `PlatformInventoryQueryListResp` OK
   */
  export namespace LuteosErpInventoryQueryPlatformListExport2 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlatformInventoryQueryListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PlatformInventoryQueryListResp;
  }

  /**
   * No description
   * @tags 库存
   * @name LuteosErpInventoryShopifyQueryPlatformList
   * @summary 独立站平台库存查询
   * @request POST:/api/luteos/erp/inventory/shopify/queryPlatformList
   * @response `200` `PlatformInventoryQueryListResp` OK
   */
  export namespace LuteosErpInventoryShopifyQueryPlatformList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlatformInventoryQueryListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PlatformInventoryQueryListResp;
  }

  /**
   * No description
   * @tags 库存
   * @name LuteosErpInventoryShopifyPlatformListExport
   * @summary 下载独立站平台库存查询
   * @request POST:/api/luteos/erp/inventory/shopifyPlatformListExport
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace LuteosErpInventoryShopifyPlatformListExport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlatformInventoryQueryListReq;
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
   * @tags 库存
   * @name LuteosErpInventoryTtQueryPlatformList
   * @summary TT平台库存查询
   * @request POST:/api/luteos/erp/inventory/tt/queryPlatformList
   * @response `200` `PlatformInventoryQueryListResp` OK
   */
  export namespace LuteosErpInventoryTtQueryPlatformList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlatformInventoryQueryListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PlatformInventoryQueryListResp;
  }

  /**
   * No description
   * @tags 库存
   * @name LuteosErpInventoryTtPlatformListExport
   * @summary 下载TT平台库存查询
   * @request POST:/api/luteos/erp/inventory/ttPlatformListExport
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace LuteosErpInventoryTtPlatformListExport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlatformInventoryQueryListReq;
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
   * @tags 库存
   * @name LuteosErpInventoryV2InventoryAllListExport
   * @summary 下载库存240807
   * @request POST:/api/luteos/erp/inventory/v2/inventoryAllListExport
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace LuteosErpInventoryV2InventoryAllListExport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = InventoryV2QueryListReq;
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
   * @tags 库存
   * @name LuteosErpInventoryVcInventoryAllListExport
   * @summary 下载VC在库
   * @request POST:/api/luteos/erp/inventory/vc/inventoryAllListExport
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace LuteosErpInventoryVcInventoryAllListExport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = InventoryVcQueryListReq;
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
   * @tags 库存
   * @name LuteosErpInventoryVcOnWayInventoryAllListExport
   * @summary 下载VC在途库存
   * @request POST:/api/luteos/erp/inventory/vc/onWayInventoryAllListExport
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace LuteosErpInventoryVcOnWayInventoryAllListExport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OnWayInventoryVcQueryListReq;
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
   * @tags 库存
   * @name LuteosErpInventoryWalmartQueryPlatformList
   * @summary 沃尔玛平台库存查询
   * @request POST:/api/luteos/erp/inventory/walmart/queryPlatformList
   * @response `200` `PlatformInventoryQueryListResp` OK
   */
  export namespace LuteosErpInventoryWalmartQueryPlatformList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlatformInventoryQueryListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PlatformInventoryQueryListResp;
  }

  /**
   * No description
   * @tags 库存
   * @name LuteosErpInventoryWalmartPlatformListExport
   * @summary 下载沃尔玛平台库存查询
   * @request POST:/api/luteos/erp/inventory/walmartPlatformListExport
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace LuteosErpInventoryWalmartPlatformListExport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlatformInventoryQueryListReq;
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
   * @tags 库存
   * @name LuteosErpInventoryWalmartPlatformListExport2
   * @summary 下载沃尔玛在途库存
   * @request POST:/api/luteos/erp/inventory/walmartPlatformListExport2
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace LuteosErpInventoryWalmartPlatformListExport2 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlatformInventoryQueryListReq;
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
   * @tags 库存
   * @name LuteosErpInventoryWarehouseQueryList
   * @summary 仓库库存查询
   * @request POST:/api/luteos/erp/inventory/warehouse/queryList
   * @response `200` `WarehouseInventoryQueryListResp` OK
   */
  export namespace LuteosErpInventoryWarehouseQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = WarehouseInventoryQueryListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = WarehouseInventoryQueryListResp;
  }

  /**
   * No description
   * @tags 库存
   * @name LuteosErpInventoryWarehouseListExport
   * @summary 下载仓库库存
   * @request POST:/api/luteos/erp/inventory/warehouseListExport
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace LuteosErpInventoryWarehouseListExport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = WarehouseInventoryQueryListReq;
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
   * @tags 供应商邀请
   * @name LuteosErpInviteSupplierDelete
   * @summary 删除
   * @request POST:/api/luteos/erp/invite/supplier/delete
   * @response `200` `void` OK
   */
  export namespace LuteosErpInviteSupplierDelete {
    export type RequestParams = {};
    export type RequestQuery = {
      /** inviteCode */
      inviteCode: string;
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
   * @tags 供应商邀请
   * @name LuteosErpInviteSupplierExport
   * @summary 导出
   * @request POST:/api/luteos/erp/invite/supplier/export
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosErpInviteSupplierExport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SupplierInviteListReq;
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
   * @tags 供应商邀请
   * @name LuteosErpInviteSupplierQueryCurrencyList
   * @summary 获取币种（无鉴权）
   * @request POST:/api/luteos/erp/invite/supplier/queryCurrencyList
   * @response `200` `CurrencyQueryResp` OK
   */
  export namespace LuteosErpInviteSupplierQueryCurrencyList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 货币名称 */
      currencyName?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CurrencyQueryResp;
  }

  /**
   * No description
   * @tags 供应商邀请
   * @name LuteosErpInviteSupplierQueryDetail
   * @summary 详情
   * @request GET:/api/luteos/erp/invite/supplier/queryDetail
   * @response `200` `SupplierInviteDetailResp` OK
   */
  export namespace LuteosErpInviteSupplierQueryDetail {
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
    export type ResponseBody = SupplierInviteDetailResp;
  }

  /**
   * No description
   * @tags 供应商邀请
   * @name LuteosErpInviteSupplierQueryList
   * @summary 列表查询
   * @request POST:/api/luteos/erp/invite/supplier/queryList
   * @response `200` `SupplierInviteListResp` OK
   */
  export namespace LuteosErpInviteSupplierQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SupplierInviteListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SupplierInviteListResp;
  }

  /**
   * No description
   * @tags 供应商邀请
   * @name LuteosErpInviteSupplierSave
   * @summary 保存数据(有鉴权获取操作用户信息)
   * @request POST:/api/luteos/erp/invite/supplier/save
   * @response `200` `void` OK
   */
  export namespace LuteosErpInviteSupplierSave {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SupplierInviteSaveReq;
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
   * @tags 供应商邀请
   * @name LuteosErpInviteSupplierSaveTemp
   * @summary 保存数据(无鉴权)
   * @request POST:/api/luteos/erp/invite/supplier/save/temp
   * @response `200` `void` OK
   */
  export namespace LuteosErpInviteSupplierSaveTemp {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SupplierInviteSaveReq;
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
   * @tags 供应商邀请
   * @name LuteosErpInviteSupplierSendEmail
   * @summary 发起邀请
   * @request POST:/api/luteos/erp/invite/supplier/send/email
   * @response `200` `void` OK
   */
  export namespace LuteosErpInviteSupplierSendEmail {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SupplierInviteInitSaveReq;
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
   * @tags 供应商邀请
   * @name LuteosErpInviteSupplierSubmitReview
   * @summary 提交审核
   * @request POST:/api/luteos/erp/invite/supplier/submit/review
   * @response `200` `void` OK
   */
  export namespace LuteosErpInviteSupplierSubmitReview {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SupplierInviteSaveReq;
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
   * @tags 供应商邀请
   * @name LuteosErpInviteSupplierSubmitReviewTemp
   * @summary 提交审核（无鉴权）
   * @request POST:/api/luteos/erp/invite/supplier/submit/review/temp
   * @response `200` `void` OK
   */
  export namespace LuteosErpInviteSupplierSubmitReviewTemp {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SupplierInviteSaveReq;
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
   * @tags 积加库存同步
   * @name LuteosErpJiJiaInventorySyncFbaListExport
   * @summary 下载FBA库存查询
   * @request POST:/api/luteos/erp/jiJiaInventorySync/fbaListExport
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace LuteosErpJiJiaInventorySyncFbaListExport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FbaInventoryQueryListReq;
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
   * @tags 积加库存同步
   * @name LuteosErpJiJiaInventorySyncProductListExport
   * @summary 下载产品库存查询
   * @request POST:/api/luteos/erp/jiJiaInventorySync/productListExport
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace LuteosErpJiJiaInventorySyncProductListExport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductInventoryQueryListReq;
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
   * @tags 积加库存同步
   * @name LuteosErpJiJiaInventorySyncQueryFbaList
   * @summary FBA库存查询
   * @request POST:/api/luteos/erp/jiJiaInventorySync/queryFbaList
   * @response `200` `FbaInventoryQueryListResp` OK
   */
  export namespace LuteosErpJiJiaInventorySyncQueryFbaList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FbaInventoryQueryListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = FbaInventoryQueryListResp;
  }

  /**
   * No description
   * @tags 积加库存同步
   * @name LuteosErpJiJiaInventorySyncQueryProductList
   * @summary 产品库存查询
   * @request POST:/api/luteos/erp/jiJiaInventorySync/queryProductList
   * @response `200` `ProductInventoryQueryListResp` OK
   */
  export namespace LuteosErpJiJiaInventorySyncQueryProductList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductInventoryQueryListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ProductInventoryQueryListResp;
  }

  /**
   * No description
   * @tags 积加库存同步
   * @name LuteosErpJiJiaInventorySyncQueryThirdList
   * @summary third库存查询
   * @request POST:/api/luteos/erp/jiJiaInventorySync/queryThirdList
   * @response `200` `ThirdInventoryQueryListResp` OK
   */
  export namespace LuteosErpJiJiaInventorySyncQueryThirdList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ThirdInventoryQueryListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ThirdInventoryQueryListResp;
  }

  /**
   * No description
   * @tags 积加库存同步
   * @name LuteosErpJiJiaInventorySyncQueryTiktokList
   * @summary tiktok库存查询
   * @request POST:/api/luteos/erp/jiJiaInventorySync/queryTiktokList
   * @response `200` `TiktokInventoryQueryListResp` OK
   */
  export namespace LuteosErpJiJiaInventorySyncQueryTiktokList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TiktokInventoryQueryListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = TiktokInventoryQueryListResp;
  }

  /**
   * No description
   * @tags 积加库存同步
   * @name LuteosErpJiJiaInventorySyncQueryTiktokShopList
   * @summary 获取tiktok店铺列表
   * @request POST:/api/luteos/erp/jiJiaInventorySync/queryTiktokShopList
   * @response `200` `TiktokInventoryShopQueryListResp` OK
   */
  export namespace LuteosErpJiJiaInventorySyncQueryTiktokShopList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TiktokInventoryQueryListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = TiktokInventoryShopQueryListResp;
  }

  /**
   * No description
   * @tags 积加库存同步
   * @name LuteosErpJiJiaInventorySyncQueryWalmartList
   * @summary walmart库存查询
   * @request POST:/api/luteos/erp/jiJiaInventorySync/queryWalmartList
   * @response `200` `WalmartInventoryQueryListResp` OK
   */
  export namespace LuteosErpJiJiaInventorySyncQueryWalmartList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = WalmartInventoryQueryListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = WalmartInventoryQueryListResp;
  }

  /**
   * No description
   * @tags 积加库存同步
   * @name LuteosErpJiJiaInventorySyncThirdListExport
   * @summary 下载third库存查询
   * @request POST:/api/luteos/erp/jiJiaInventorySync/thirdListExport
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace LuteosErpJiJiaInventorySyncThirdListExport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ThirdInventoryQueryListReq;
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
   * @tags 积加库存同步
   * @name LuteosErpJiJiaInventorySyncTiktokListExport
   * @summary 下载tiktok库存查询
   * @request POST:/api/luteos/erp/jiJiaInventorySync/tiktokListExport
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace LuteosErpJiJiaInventorySyncTiktokListExport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TiktokInventoryQueryListReq;
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
   * @tags 积加库存同步
   * @name LuteosErpJiJiaInventorySyncWalmartListExport
   * @summary 下载walmart库存查询
   * @request POST:/api/luteos/erp/jiJiaInventorySync/walmartListExport
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace LuteosErpJiJiaInventorySyncWalmartListExport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = WalmartInventoryQueryListReq;
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
   * @tags 物流基础数据
   * @name LuteosErpLogisticsChannelAdd
   * @summary 物流渠道-新增
   * @request POST:/api/luteos/erp/logistics/channel/add
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosErpLogisticsChannelAdd {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LogisticsChannelAddReq;
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
   * @tags 物流基础数据
   * @name LuteosErpLogisticsChannelChangeStatus
   * @summary 物流渠道-启用/禁用
   * @request POST:/api/luteos/erp/logistics/channel/changeStatus
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosErpLogisticsChannelChangeStatus {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LogisticsChannelChangeReq;
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
   * @tags 物流基础数据
   * @name LuteosErpLogisticsChannelDetail
   * @summary 物流渠道-查询详情
   * @request GET:/api/luteos/erp/logistics/channel/detail
   * @response `200` `CommonRespLogisticsChannelDetailResp` OK
   */
  export namespace LuteosErpLogisticsChannelDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * 渠道id
       * @format int64
       */
      channelId: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespLogisticsChannelDetailResp;
  }

  /**
   * No description
   * @tags 物流基础数据
   * @name LuteosErpLogisticsChannelDownTemplate
   * @summary 物流渠道-下载批量新增模板
   * @request POST:/api/luteos/erp/logistics/channel/downTemplate
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosErpLogisticsChannelDownTemplate {
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
   * @tags 物流基础数据
   * @name LuteosErpLogisticsChannelDownloadSelectTemplate
   * @summary 物流渠道-选择下载批量新增模板
   * @request POST:/api/luteos/erp/logistics/channel/downloadSelectTemplate
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosErpLogisticsChannelDownloadSelectTemplate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LogisticsChannelSelectDownloadReq;
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
   * @tags 物流基础数据
   * @name LuteosErpLogisticsChannelImport
   * @summary 物流渠道-批量上传更新
   * @request POST:/api/luteos/erp/logistics/channel/import
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosErpLogisticsChannelImport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LogisticsChannelUploadReq;
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
   * @tags 物流基础数据
   * @name LuteosErpLogisticsChannelPriceUpdate
   * @summary 物流渠道-更新报价
   * @request POST:/api/luteos/erp/logistics/channel/price/update
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosErpLogisticsChannelPriceUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LogisticsChannelPriceUpdateReq;
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
   * @tags 物流基础数据
   * @name LuteosErpLogisticsChannelPriceUpdateVolume
   * @summary 物流渠道-更新体积报价
   * @request POST:/api/luteos/erp/logistics/channel/price/updateVolume
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosErpLogisticsChannelPriceUpdateVolume {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LogisticsChannelVolumePriceUpdateReq;
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
   * @tags 物流基础数据
   * @name LuteosErpLogisticsChannelQueryList
   * @summary 物流渠道-查询列表
   * @request POST:/api/luteos/erp/logistics/channel/queryList
   * @response `200` `LogisticsChannelListResp` OK
   */
  export namespace LuteosErpLogisticsChannelQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LogisticsChannelListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = LogisticsChannelListResp;
  }

  /**
   * No description
   * @tags 物流基础数据
   * @name LuteosErpLogisticsChannelQueryLog
   * @summary 物流渠道-查询操作日志
   * @request GET:/api/luteos/erp/logistics/channel/queryLog
   * @response `200` `CommonRespListLogisticsOpLog` OK
   */
  export namespace LuteosErpLogisticsChannelQueryLog {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * 渠道id
       * @format int32
       */
      channelId: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespListLogisticsOpLog;
  }

  /**
   * No description
   * @tags 物流基础数据
   * @name LuteosErpLogisticsChannelUpdate
   * @summary 物流渠道-修改
   * @request POST:/api/luteos/erp/logistics/channel/update
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosErpLogisticsChannelUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LogisticsChannelUpdateReq;
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
   * @tags 物流索赔管理
   * @name LuteosErpLogisticsClaimAdd
   * @summary 索赔单-新增
   * @request POST:/api/luteos/erp/logistics/claim/add
   * @response `200` `void` OK
   */
  export namespace LuteosErpLogisticsClaimAdd {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LogisticsClaimAddReq;
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
   * @tags 物流索赔管理
   * @name LuteosErpLogisticsClaimBatchInvalidate
   * @summary 索赔单-批量作废
   * @request POST:/api/luteos/erp/logistics/claim/batch/invalidate
   * @response `200` `CommonRespListOsLogisticsClaim` OK
   */
  export namespace LuteosErpLogisticsClaimBatchInvalidate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = number[];
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespListOsLogisticsClaim;
  }

  /**
   * No description
   * @tags 物流索赔管理
   * @name LuteosErpLogisticsClaimDetail
   * @summary 索赔单-查询详情
   * @request GET:/api/luteos/erp/logistics/claim/detail
   * @response `200` `CommonRespOsLogisticsClaim` OK
   */
  export namespace LuteosErpLogisticsClaimDetail {
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
    export type ResponseBody = CommonRespOsLogisticsClaim;
  }

  /**
   * No description
   * @tags 物流索赔管理
   * @name LuteosErpLogisticsClaimInvalidate
   * @summary 索赔单-作废
   * @request POST:/api/luteos/erp/logistics/claim/invalidate
   * @response `200` `CommonRespOsLogisticsClaim` OK
   */
  export namespace LuteosErpLogisticsClaimInvalidate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LogisticsClaimInvalidateReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespOsLogisticsClaim;
  }

  /**
   * No description
   * @tags 物流索赔管理
   * @name LuteosErpLogisticsClaimLogs
   * @summary 索赔单-查询操作日志
   * @request GET:/api/luteos/erp/logistics/claim/logs
   * @response `200` `CommonRespListOsLogisticsClaimLog` OK
   */
  export namespace LuteosErpLogisticsClaimLogs {
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
    export type ResponseBody = CommonRespListOsLogisticsClaimLog;
  }

  /**
   * No description
   * @tags 物流索赔管理
   * @name LuteosErpLogisticsClaimQueryList
   * @summary 索赔单-分页查询列表
   * @request POST:/api/luteos/erp/logistics/claim/queryList
   * @response `200` `LogisticsClaimPageResp` OK
   */
  export namespace LuteosErpLogisticsClaimQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LogisticsClaimQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = LogisticsClaimPageResp;
  }

  /**
   * No description
   * @tags 物流索赔管理
   * @name LuteosErpLogisticsClaimUpdate
   * @summary 索赔单-更新
   * @request POST:/api/luteos/erp/logistics/claim/update
   * @response `200` `void` OK
   */
  export namespace LuteosErpLogisticsClaimUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LogisticsClaimUpdateReq;
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
   * @tags 物流对账管理
   * @name LuteosErpLogisticsReconciliationCancelConfirm
   * @summary 撤销确认
   * @request POST:/api/luteos/erp/logistics/reconciliation/cancelConfirm
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosErpLogisticsReconciliationCancelConfirm {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LogisticsReconciliationCommonReq;
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
   * @tags 物流对账管理
   * @name LuteosErpLogisticsReconciliationCancelPayable
   * @summary 作废应付单
   * @request POST:/api/luteos/erp/logistics/reconciliation/cancelPayable
   * @response `200` `void` OK
   */
  export namespace LuteosErpLogisticsReconciliationCancelPayable {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = string[];
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
   * @tags 物流对账管理
   * @name LuteosErpLogisticsReconciliationConfirm
   * @summary 确认对账单
   * @request POST:/api/luteos/erp/logistics/reconciliation/confirm
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosErpLogisticsReconciliationConfirm {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LogisticsReconciliationCommonReq;
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
   * @tags 物流对账管理
   * @name LuteosErpLogisticsReconciliationDownload
   * @summary 下载对账单
   * @request POST:/api/luteos/erp/logistics/reconciliation/download
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosErpLogisticsReconciliationDownload {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LogisticsReconciliationQueryReq;
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
   * @tags 物流对账管理
   * @name LuteosErpLogisticsReconciliationGenerateEstimate
   * @summary 生成预估单
   * @request POST:/api/luteos/erp/logistics/reconciliation/generateEstimate
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosErpLogisticsReconciliationGenerateEstimate {
    export type RequestParams = {};
    export type RequestQuery = {};
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
   * @tags 物流对账管理
   * @name LuteosErpLogisticsReconciliationGeneratePayable
   * @summary 生成应付单
   * @request POST:/api/luteos/erp/logistics/reconciliation/generatePayable
   * @response `200` `void` OK
   */
  export namespace LuteosErpLogisticsReconciliationGeneratePayable {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = GeneratePayableReq;
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
   * @tags 物流对账管理
   * @name LuteosErpLogisticsReconciliationQueryList
   * @summary 查询物流对账列表
   * @request POST:/api/luteos/erp/logistics/reconciliation/queryList
   * @response `200` `LogisticsReconciliationPageResp` OK
   */
  export namespace LuteosErpLogisticsReconciliationQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LogisticsReconciliationQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = LogisticsReconciliationPageResp;
  }

  /**
   * No description
   * @tags 物流对账管理
   * @name LuteosErpLogisticsReconciliationRecomputeFee
   * @summary 重新计费
   * @request POST:/api/luteos/erp/logistics/reconciliation/recomputeFee
   * @response `200` `void` OK
   */
  export namespace LuteosErpLogisticsReconciliationRecomputeFee {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = RecomputeFeeReq;
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
   * @tags 物流对账管理
   * @name LuteosErpLogisticsReconciliationUpdate
   * @summary 手动更新对账单
   * @request POST:/api/luteos/erp/logistics/reconciliation/update
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosErpLogisticsReconciliationUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LogisticsReconciliationUpdateReq;
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
   * @tags 物流对账管理
   * @name LuteosErpLogisticsReconciliationUpload
   * @summary 上传对账单
   * @request POST:/api/luteos/erp/logistics/reconciliation/upload
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosErpLogisticsReconciliationUpload {
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
   * @tags 物流基础数据
   * @name LuteosErpLogisticsSupplierAdd
   * @summary 物流供应商-新增
   * @request POST:/api/luteos/erp/logistics/supplier/add
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosErpLogisticsSupplierAdd {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LogisticsSupplierAddReq;
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
   * @tags 物流基础数据
   * @name LuteosErpLogisticsSupplierChangeStatus
   * @summary 物流供应商-启用/禁用
   * @request POST:/api/luteos/erp/logistics/supplier/changeStatus
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosErpLogisticsSupplierChangeStatus {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LogisticsSupplierChangeReq;
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
   * @tags 物流基础数据
   * @name LuteosErpLogisticsSupplierQueryAccountToken
   * @summary 物流供应商-获取登录信息
   * @request GET:/api/luteos/erp/logistics/supplier/queryAccountToken
   * @response `200` `CommonRespLogisticsSupplierAccountTokenResp` OK
   */
  export namespace LuteosErpLogisticsSupplierQueryAccountToken {
    export type RequestParams = {};
    export type RequestQuery = {
      /** supplierCode */
      supplierCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespLogisticsSupplierAccountTokenResp;
  }

  /**
   * No description
   * @tags 物流基础数据
   * @name LuteosErpLogisticsSupplierQueryList
   * @summary 物流供应商-查询列表
   * @request POST:/api/luteos/erp/logistics/supplier/queryList
   * @response `200` `LogisticsSupplierListResp` OK
   */
  export namespace LuteosErpLogisticsSupplierQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LogisticsSupplierListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = LogisticsSupplierListResp;
  }

  /**
   * No description
   * @tags 物流基础数据
   * @name LuteosErpLogisticsSupplierQueryLog
   * @summary 物流供应商-查询操作日志
   * @request GET:/api/luteos/erp/logistics/supplier/queryLog
   * @response `200` `CommonRespListLogisticsOpLog` OK
   */
  export namespace LuteosErpLogisticsSupplierQueryLog {
    export type RequestParams = {};
    export type RequestQuery = {
      /** supplierCode */
      supplierCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespListLogisticsOpLog;
  }

  /**
   * No description
   * @tags 物流基础数据
   * @name LuteosErpLogisticsSupplierUpdate
   * @summary 物流供应商-修改
   * @request POST:/api/luteos/erp/logistics/supplier/update
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosErpLogisticsSupplierUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LogisticsSupplierUpdateReq;
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
   * @tags 物流基础数据
   * @name LuteosErpLogisticsSupplierUpdateAccountToken
   * @summary 物流供应商-手动更新token
   * @request POST:/api/luteos/erp/logistics/supplier/updateAccountToken
   * @response `200` `CommonRespLogisticsSupplierAccountTokenResp` OK
   */
  export namespace LuteosErpLogisticsSupplierUpdateAccountToken {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LogisticsSupplierRefreshTokenReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespLogisticsSupplierAccountTokenResp;
  }

  /**
   * No description
   * @tags 物流基础数据
   * @name LuteosErpLogisticsTransportAdd
   * @summary 物流方式-新增
   * @request POST:/api/luteos/erp/logistics/transport/add
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosErpLogisticsTransportAdd {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LogisticsTransportAddReq;
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
   * @tags 物流基础数据
   * @name LuteosErpLogisticsTransportChangeStatus
   * @summary 物流方式-启用/禁用
   * @request POST:/api/luteos/erp/logistics/transport/changeStatus
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosErpLogisticsTransportChangeStatus {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LogisticsTransportChangeReq;
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
   * @tags 物流基础数据
   * @name LuteosErpLogisticsTransportQueryList
   * @summary 物流方式-查询列表
   * @request POST:/api/luteos/erp/logistics/transport/queryList
   * @response `200` `LogisticsTransportListResp` OK
   */
  export namespace LuteosErpLogisticsTransportQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LogisticsTransportListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = LogisticsTransportListResp;
  }

  /**
   * No description
   * @tags 物流基础数据
   * @name LuteosErpLogisticsTransportQueryListV2
   * @summary 物流方式-查询列表V2
   * @request POST:/api/luteos/erp/logistics/transport/queryListV2
   * @response `200` `LogisticsTransportListV2Resp` OK
   */
  export namespace LuteosErpLogisticsTransportQueryListV2 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LogisticsTransportListV2Req;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = LogisticsTransportListV2Resp;
  }

  /**
   * No description
   * @tags 物流基础数据
   * @name LuteosErpLogisticsTransportUpdate
   * @summary 物流方式-修改
   * @request POST:/api/luteos/erp/logistics/transport/update
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosErpLogisticsTransportUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LogisticsTransportUpdateReq;
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
   * @tags ERP-账户查询
   * @name LuteosErpMemberQueryDeptMemberList
   * @summary 获取部门下所有成员
   * @request GET:/api/luteos/erp/member/queryDeptMemberList
   * @response `200` `DeptMemberListQueryResp` OK
   */
  export namespace LuteosErpMemberQueryDeptMemberList {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * 部门id
       * @format int64
       */
      deptId?: number;
      /** 操作业务部门编码 */
      operatorDepartmentCode?: string;
      /** 是否查询子部门 */
      searchChildDept?: boolean;
    };
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
   * @tags ERP-账户查询
   * @name LuteosErpMemberQueryOperationMemberList
   * @summary 获取业务编码下成员列表
   * @request POST:/api/luteos/erp/member/queryOperationMemberList
   * @response `200` `MemberListMapQueryResp` OK
   */
  export namespace LuteosErpMemberQueryOperationMemberList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OperationMemberListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MemberListMapQueryResp;
  }

  /**
   * No description
   * @tags ERP-账户查询
   * @name LuteosErpMemberQuerySubDeptList
   * @summary 子级部门查询
   * @request POST:/api/luteos/erp/member/querySubDeptList
   * @response `200` `SubDeptListQueryResp` OK
   */
  export namespace LuteosErpMemberQuerySubDeptList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SubDeptListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SubDeptListQueryResp;
  }

  /**
   * No description
   * @tags 自发货订单
   * @name LuteosErpOdoCommonAbandon
   * @summary 通用作废接口
   * @request POST:/api/luteos/erp/odo/commonAbandon
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosErpOdoCommonAbandon {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OdoAbondonReq;
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
   * @tags 自发货订单
   * @name LuteosErpOdoCommonSave
   * @summary 通用创建接口接口
   * @request POST:/api/luteos/erp/odo/commonSave
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosErpOdoCommonSave {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OdoDetailSaveReq;
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
   * @tags 自发货订单
   * @name LuteosErpOdoCommonUpdate
   * @summary 通用编辑接口
   * @request POST:/api/luteos/erp/odo/commonUpdate
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosErpOdoCommonUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OdoDetailUpdateReq;
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
   * @tags 自发货订单
   * @name LuteosErpOdoDownDetail
   * @summary 下载-拣货单
   * @request POST:/api/luteos/erp/odo/downDetail
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosErpOdoDownDetail {
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
    export type ResponseBody = CommonRespString;
  }

  /**
   * No description
   * @tags 自发货订单
   * @name LuteosErpOdoDownLyOrderTemplate
   * @summary 下载-领用订单导入模板
   * @request POST:/api/luteos/erp/odo/downLyOrderTemplate
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosErpOdoDownLyOrderTemplate {
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
   * @tags 自发货订单
   * @name LuteosErpOdoDownLyTrackNumTemplate
   * @summary 下载-领用跟踪号导入模板
   * @request POST:/api/luteos/erp/odo/downLyTrackNumTemplate
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosErpOdoDownLyTrackNumTemplate {
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
   * @tags 自发货订单
   * @name LuteosErpOdoDownPackTemplate
   * @summary 下载-装箱单模板
   * @request POST:/api/luteos/erp/odo/downPackTemplate
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosErpOdoDownPackTemplate {
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
    export type ResponseBody = CommonRespString;
  }

  /**
   * No description
   * @tags 自发货订单
   * @name LuteosErpOdoExportList
   * @summary 导出列表
   * @request POST:/api/luteos/erp/odo/exportList
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace LuteosErpOdoExportList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OdsListQueryReq;
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
   * @tags 自发货订单
   * @name LuteosErpOdoExportPickingList
   * @summary 导出拣货单
   * @request POST:/api/luteos/erp/odo/exportPickingList
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace LuteosErpOdoExportPickingList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OdoBatchReq;
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
   * @tags 自发货订单
   * @name LuteosErpOdoImportLyOrder
   * @summary 批量导入领用订单
   * @request POST:/api/luteos/erp/odo/importLyOrder
   * @response `200` `ImportDataResp` OK
   */
  export namespace LuteosErpOdoImportLyOrder {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UploadReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ImportDataResp;
  }

  /**
   * No description
   * @tags 自发货订单
   * @name LuteosErpOdoImportTrackNum
   * @summary 批量导入跟踪号
   * @request POST:/api/luteos/erp/odo/importTrackNum
   * @response `200` `ImportDataResp` OK
   */
  export namespace LuteosErpOdoImportTrackNum {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UploadReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ImportDataResp;
  }

  /**
   * No description
   * @tags 自发货订单
   * @name LuteosErpOdoQueryCommonDetail
   * @summary 查询通用详情
   * @request GET:/api/luteos/erp/odo/queryCommonDetail
   * @response `200` `OdoDetailResp` OK
   */
  export namespace LuteosErpOdoQueryCommonDetail {
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
    export type ResponseBody = OdoDetailResp;
  }

  /**
   * No description
   * @tags 自发货订单
   * @name LuteosErpOdoQueryDetail
   * @summary 查询详情-包括草稿
   * @request GET:/api/luteos/erp/odo/queryDetail
   * @response `200` `OdoDetailAndDraftResp` OK
   */
  export namespace LuteosErpOdoQueryDetail {
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
    export type ResponseBody = OdoDetailAndDraftResp;
  }

  /**
   * No description
   * @tags 自发货订单
   * @name LuteosErpOdoQueryList
   * @summary 查询列表
   * @request POST:/api/luteos/erp/odo/queryList
   * @response `200` `OdsListQueryResp` OK
   */
  export namespace LuteosErpOdoQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OdsListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = OdsListQueryResp;
  }

  /**
   * @description 为节省资源，对草稿/作废/待发货/已发货不做查询
   * @tags 自发货订单
   * @name LuteosErpOdoQueryStockList
   * @summary 查询单据库存是否满足
   * @request POST:/api/luteos/erp/odo/queryStockList
   * @response `200` `CommonRespListErpOrderStockQueryResp` OK
   */
  export namespace LuteosErpOdoQueryStockList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = string[];
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespListErpOrderStockQueryResp;
  }

  /**
   * No description
   * @tags 自发货订单
   * @name LuteosErpOdoReConfirm
   * @summary 失败重试按钮
   * @request POST:/api/luteos/erp/odo/reConfirm
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosErpOdoReConfirm {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OdoAbondonReq;
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
   * @tags 自发货订单
   * @name LuteosErpOdoReceiveConfirm
   * @summary 领用单领用-验收
   * @request POST:/api/luteos/erp/odo/receiveConfirm
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosErpOdoReceiveConfirm {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ErpOdoBaseReq;
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
   * @tags 自发货订单
   * @name LuteosErpOdoSaveDraft
   * @summary 自发货单-保存草稿
   * @request POST:/api/luteos/erp/odo/saveDraft
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosErpOdoSaveDraft {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OdoDraftSaveReq;
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
   * @tags 自发货订单
   * @name LuteosErpOdoSaveRemark
   * @summary 保存备注
   * @request POST:/api/luteos/erp/odo/saveRemark
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosErpOdoSaveRemark {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ErpOdoRemarkSaveReq;
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
   * @tags 自发货订单
   * @name LuteosErpOdoStatusReverse
   * @summary 自发货单-状态扭转及保存草稿
   * @request POST:/api/luteos/erp/odo/statusReverse
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosErpOdoStatusReverse {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OdoStatusReverseReq;
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
   * @tags 自发货订单
   * @name LuteosErpOdoUploadPack
   * @summary 上传装箱单
   * @request POST:/api/luteos/erp/odo/uploadPack
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpOdoUploadPack {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OdoUploadPackReq;
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
   * @tags 自发货订单
   * @name LuteosErpOdoUploadPicking
   * @summary 领用-上传拣货单
   * @request POST:/api/luteos/erp/odo/uploadPicking
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpOdoUploadPicking {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OdoUploadPackReq;
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
   * @tags 自发货订单
   * @name LuteosErpOdoUploadTrackNum
   * @summary 上传物流跟踪号
   * @request POST:/api/luteos/erp/odo/uploadTrackNum
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosErpOdoUploadTrackNum {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OdoUploadTrackNumReq;
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
   * @tags 自发货订单
   * @name LuteosErpOdoV2UploadTrackNum
   * @summary 上传物流跟踪号-v2
   * @request POST:/api/luteos/erp/odo/v2/uploadTrackNum
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosErpOdoV2UploadTrackNum {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OdoUploadTrackNumReq2;
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
   * @tags ERP订单
   * @name LuteosErpOrderAbandon
   * @summary 作废
   * @request POST:/api/luteos/erp/order/abandon
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpOrderAbandon {
    export type RequestParams = {};
    export type RequestQuery = {
      /** erpCode */
      erpCode: string;
    };
    export type RequestBody = never;
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
   * @tags ERP订单
   * @name LuteosErpOrderAddDownTemplate
   * @summary 下载批量新增模板
   * @request POST:/api/luteos/erp/order/add/downTemplate
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosErpOrderAddDownTemplate {
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
   * @tags ERP订单
   * @name LuteosErpOrderAddUpload
   * @summary 上传批量新增
   * @request POST:/api/luteos/erp/order/add/upload
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpOrderAddUpload {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UploadReq;
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
   * @tags ERP订单
   * @name LuteosErpOrderAddUploads
   * @summary 上传批量新增,多个附件支持
   * @request POST:/api/luteos/erp/order/add/uploads
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpOrderAddUploads {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UploadReq[];
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
   * @tags ERP订单
   * @name LuteosErpOrderAuthAndUpdate
   * @summary 审核
   * @request POST:/api/luteos/erp/order/authAndUpdate
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpOrderAuthAndUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OrderAuthSaveReq;
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
   * @tags ERP订单
   * @name LuteosErpOrderBatchAbandon
   * @summary 批量作废
   * @request POST:/api/luteos/erp/order/batch/abandon
   * @response `200` `CommonRespOrderBatchAuthResp` OK
   */
  export namespace LuteosErpOrderBatchAbandon {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OrderBatchToAbondReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespOrderBatchAuthResp;
  }

  /**
   * No description
   * @tags ERP订单
   * @name LuteosErpOrderBatchChangeSkuList
   * @summary 批量换货查询
   * @request POST:/api/luteos/erp/order/batch/changeSkuList
   * @response `200` `OrderChangeSkuBatchToAuditResp` OK
   */
  export namespace LuteosErpOrderBatchChangeSkuList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OrderBatchToAuditReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = OrderChangeSkuBatchToAuditResp;
  }

  /**
   * No description
   * @tags ERP订单
   * @name LuteosErpOrderBatchChangeSkuListToAudit
   * @summary 批量换货
   * @request POST:/api/luteos/erp/order/batch/changeSkuListToAudit
   * @response `200` `CommonRespOrderBatchAuthResp` OK
   */
  export namespace LuteosErpOrderBatchChangeSkuListToAudit {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OrderChangeSkuBatchToAuditResp;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespOrderBatchAuthResp;
  }

  /**
   * No description
   * @tags ERP订单
   * @name LuteosErpOrderBatchConfirmSend
   * @summary 批量确认发货
   * @request POST:/api/luteos/erp/order/batch/confirm/send
   * @response `200` `CommonRespOrderBatchAuthResp` OK
   */
  export namespace LuteosErpOrderBatchConfirmSend {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OrderBatchConfirmSendReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespOrderBatchAuthResp;
  }

  /**
   * No description
   * @tags ERP订单
   * @name LuteosErpOrderBatchSendNotice
   * @summary 发货通知
   * @request POST:/api/luteos/erp/order/batch/sendNotice
   * @response `200` `CommonRespOrderBatchSendNoticeResp` OK
   */
  export namespace LuteosErpOrderBatchSendNotice {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OrderBatchSendNoticeReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespOrderBatchSendNoticeResp;
  }

  /**
   * No description
   * @tags ERP订单
   * @name LuteosErpOrderBatchToAudit
   * @summary 批量转待审核
   * @request POST:/api/luteos/erp/order/batch/toAudit
   * @response `200` `CommonRespOrderBatchAuthResp` OK
   */
  export namespace LuteosErpOrderBatchToAudit {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OrderBatchToAuditReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespOrderBatchAuthResp;
  }

  /**
   * No description
   * @tags ERP订单
   * @name LuteosErpOrderBatchToWaitSend
   * @summary 批量转待发货
   * @request POST:/api/luteos/erp/order/batch/toWaitSend
   * @response `200` `CommonRespOrderBatchToWaitSendResp` OK
   */
  export namespace LuteosErpOrderBatchToWaitSend {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OrderBatchToWaitSendReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespOrderBatchToWaitSendResp;
  }

  /**
   * No description
   * @tags ERP订单
   * @name LuteosErpOrderBatchUpdate
   * @summary 批量审核
   * @request POST:/api/luteos/erp/order/batch/update
   * @response `200` `CommonRespOrderBatchAuthResp` OK
   */
  export namespace LuteosErpOrderBatchUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OrderBatchAuthReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespOrderBatchAuthResp;
  }

  /**
   * @description 输入订单号列表，批量打包导出订单附件
   * @tags ERP订单
   * @name LuteosErpOrderBatchDownloadAttachment
   * @summary 批量下载订单附件
   * @request POST:/api/luteos/erp/order/batchDownloadAttachment
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosErpOrderBatchDownloadAttachment {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DownloadOrderAttachmentUrlReq;
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
   * @tags ERP订单
   * @name LuteosErpOrderBatchToFba
   * @summary 批量转FBA
   * @request POST:/api/luteos/erp/order/batchToFba
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosErpOrderBatchToFba {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OrderBatchToFbaReq;
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
   * @tags ERP订单
   * @name LuteosErpOrderBindingOrderWarehouseAndShipReq
   * @summary 绑定发货仓库配送方式
   * @request POST:/api/luteos/erp/order/bindingOrderWarehouseAndShipReq
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosErpOrderBindingOrderWarehouseAndShipReq {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OrderBindingWarehouseAndShipReq;
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
   * @tags ERP订单
   * @name LuteosErpOrderChangeSku
   * @summary 换货
   * @request POST:/api/luteos/erp/order/changeSku
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosErpOrderChangeSku {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OrderChangeSkuReq;
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
   * @tags ERP订单
   * @name LuteosErpOrderChangeWarehouseParamStaus
   * @summary 绑定发货仓库状态变更
   * @request POST:/api/luteos/erp/order/changeWarehouseParamStaus
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosErpOrderChangeWarehouseParamStaus {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ErpOrderWpUpdateStatusReq;
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
   * @tags ERP订单
   * @name LuteosErpOrderDeleteAtt
   * @summary 删除附件
   * @request GET:/api/luteos/erp/order/delete/att
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpOrderDeleteAtt {
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
    export type ResponseBody = CommonResp;
  }

  /**
   * No description
   * @tags ERP订单
   * @name LuteosErpOrderDownUpdateAddressTemplate
   * @summary 下载批量修改地址模板
   * @request POST:/api/luteos/erp/order/downUpdateAddressTemplate
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosErpOrderDownUpdateAddressTemplate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SampleOrderV3ListQueryReq;
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
   * @tags ERP订单
   * @name LuteosErpOrderDownUpdateAuthTemplate
   * @summary 下载编辑审核模板
   * @request POST:/api/luteos/erp/order/downUpdateAuthTemplate
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosErpOrderDownUpdateAuthTemplate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SampleOrderV3ListQueryReq;
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
   * @tags ERP订单
   * @name LuteosErpOrderExportQueryAllChannelList
   * @summary 导出-全渠道订单查询
   * @request POST:/api/luteos/erp/order/exportQueryAllChannelList
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosErpOrderExportQueryAllChannelList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ErpOrderAllChannelQueryListReq;
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
   * @tags ERP订单
   * @name LuteosErpOrderExportWarehouseParamList
   * @summary 绑定发货仓库列表-导出
   * @request POST:/api/luteos/erp/order/exportWarehouseParamList
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace LuteosErpOrderExportWarehouseParamList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ErpOrderWpQueryListReq;
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
   * @tags ERP订单
   * @name LuteosErpOrderFbaRetry
   * @summary 异常重推fba
   * @request POST:/api/luteos/erp/order/fba/retry
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpOrderFbaRetry {
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
    export type ResponseBody = CommonResp;
  }

  /**
   * No description
   * @tags ERP订单
   * @name LuteosErpOrderFreightRuleHit
   * @summary 运费规则命中
   * @request POST:/api/luteos/erp/order/freightRuleHit
   * @response `200` `CommonRespErpFlowDetailQueryResp` OK
   */
  export namespace LuteosErpOrderFreightRuleHit {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ErpOrderFreightRuleBean[];
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespErpFlowDetailQueryResp;
  }

  /**
   * No description
   * @tags ERP订单
   * @name LuteosErpOrderJijiaRePush
   * @summary 异常单据重推积加
   * @request POST:/api/luteos/erp/order/jijia/rePush
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosErpOrderJijiaRePush {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = string[];
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
   * @tags ERP订单
   * @name LuteosErpOrderModifyWarehouseLogistics
   * @summary 批量设置仓库物流
   * @request POST:/api/luteos/erp/order/modifyWarehouseLogistics
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosErpOrderModifyWarehouseLogistics {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ModifyWarehouseLogisticsReq;
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
   * @tags ERP订单
   * @name LuteosErpOrderOrderAttachUpload
   * @summary 批量上传订单附件
   * @request POST:/api/luteos/erp/order/order/attach/upload
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpOrderOrderAttachUpload {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OrderUpdateUploadReq;
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
   * @tags ERP订单
   * @name LuteosErpOrderOrderDownload
   * @summary 导出订单
   * @request POST:/api/luteos/erp/order/order/download
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosErpOrderOrderDownload {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SampleOrderV3ListQueryReq;
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
   * @tags ERP订单
   * @name LuteosErpOrderPreCheckInventory
   * @summary 预校验库存
   * @request POST:/api/luteos/erp/order/preCheckInventory
   * @response `200` `CommonRespErpOrderPreCheckInventoryResp` OK
   */
  export namespace LuteosErpOrderPreCheckInventory {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ErpOrderPreCheckInventoryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespErpOrderPreCheckInventoryResp;
  }

  /**
   * No description
   * @tags ERP订单
   * @name LuteosErpOrderPreCheckStock
   * @summary 批量下单到物流-预校验库存
   * @request POST:/api/luteos/erp/order/preCheckStock
   * @response `200` `CommonRespOrderPreCheckStockResp` OK
   */
  export namespace LuteosErpOrderPreCheckStock {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OrderPreCheckStockReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespOrderPreCheckStockResp;
  }

  /**
   * No description
   * @tags ERP订单
   * @name LuteosErpOrderQueryAllChannelList
   * @summary 全渠道订单查询
   * @request POST:/api/luteos/erp/order/queryAllChannelList
   * @response `200` `AllChannelOrderListQueryResp` OK
   */
  export namespace LuteosErpOrderQueryAllChannelList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ErpOrderAllChannelQueryListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = AllChannelOrderListQueryResp;
  }

  /**
   * No description
   * @tags ERP订单
   * @name LuteosErpOrderQueryAllShipping
   * @summary 获取所有配送方式
   * @request GET:/api/luteos/erp/order/queryAllShipping
   * @response `200` `CommonRespListErpDictBean` OK
   */
  export namespace LuteosErpOrderQueryAllShipping {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * 类型：0-红人发样单 1-线下订单 2-TT订单
       * @format int32
       */
      type: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespListErpDictBean;
  }

  /**
   * No description
   * @tags ERP订单
   * @name LuteosErpOrderQueryAllWarehouse
   * @summary 获取所有发货仓库
   * @request GET:/api/luteos/erp/order/queryAllWarehouse
   * @response `200` `CommonRespListErpDictBean` OK
   */
  export namespace LuteosErpOrderQueryAllWarehouse {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * 类型：0-红人发样单 1-线下订单 2-TT订单
       * @format int32
       */
      type: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespListErpDictBean;
  }

  /**
   * No description
   * @tags ERP订单
   * @name LuteosErpOrderQueryBatchFba
   * @summary 查询批量转FBA详情
   * @request POST:/api/luteos/erp/order/queryBatchFba
   * @response `200` `OrderBatchFbaDetailResp` OK
   */
  export namespace LuteosErpOrderQueryBatchFba {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = QueryOrderBatchToFbaReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = OrderBatchFbaDetailResp;
  }

  /**
   * No description
   * @tags ERP订单
   * @name LuteosErpOrderQueryDetail
   * @summary 查询详情
   * @request GET:/api/luteos/erp/order/queryDetail
   * @response `200` `OrderDetailResp` OK
   */
  export namespace LuteosErpOrderQueryDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** erpCode */
      erpCode: string;
      /**
       * searchEdit
       * @default true
       */
      searchEdit?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = OrderDetailResp;
  }

  /**
   * No description
   * @tags ERP订单
   * @name LuteosErpOrderQueryList
   * @summary 查询列表
   * @request POST:/api/luteos/erp/order/queryList
   * @response `200` `OrderListQueryResp` OK
   */
  export namespace LuteosErpOrderQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SampleOrderV3ListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = OrderListQueryResp;
  }

  /**
   * No description
   * @tags ERP订单
   * @name LuteosErpOrderQueryStockAvailable
   * @summary 查询库存可用量
   * @request POST:/api/luteos/erp/order/queryStockAvailable
   * @response `200` `CommonRespOrderQueryStockAvailableResp` OK
   */
  export namespace LuteosErpOrderQueryStockAvailable {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OrderQueryStockAvailableReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespOrderQueryStockAvailableResp;
  }

  /**
   * @description 为节省资源，对草稿/作废/待发货/已发货不做查询
   * @tags ERP订单
   * @name LuteosErpOrderQueryStockList
   * @summary 查询单据库存是否满足
   * @request POST:/api/luteos/erp/order/queryStockList
   * @response `200` `CommonRespListErpOrderStockQueryResp` OK
   */
  export namespace LuteosErpOrderQueryStockList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = string[];
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespListErpOrderStockQueryResp;
  }

  /**
   * No description
   * @tags ERP订单
   * @name LuteosErpOrderQueryWarehouseLogistics
   * @summary 查询订单仓库物流
   * @request POST:/api/luteos/erp/order/queryWarehouseLogistics
   * @response `200` `(ReferenceParamsDeliveryMapResp)[]` OK
   */
  export namespace LuteosErpOrderQueryWarehouseLogistics {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = QueryWarehouseLogisticsReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ReferenceParamsDeliveryMapResp[];
  }

  /**
   * No description
   * @tags ERP订单
   * @name LuteosErpOrderQueryWarehouseParamList
   * @summary 查询绑定发货仓库列表
   * @request POST:/api/luteos/erp/order/queryWarehouseParamList
   * @response `200` `ErpOrderWpQueryListResp` OK
   */
  export namespace LuteosErpOrderQueryWarehouseParamList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ErpOrderWpQueryListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ErpOrderWpQueryListResp;
  }

  /**
   * No description
   * @tags ERP订单
   * @name LuteosErpOrderRePush
   * @summary 订单重推第三方系统
   * @request POST:/api/luteos/erp/order/rePush
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosErpOrderRePush {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = string[];
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
   * @tags ERP订单
   * @name LuteosErpOrderReferenceParams
   * @summary 引用特殊参数
   * @request GET:/api/luteos/erp/order/reference/params
   * @response `200` `ErpOrderReferenceParamsResp` OK
   */
  export namespace LuteosErpOrderReferenceParams {
    export type RequestParams = {};
    export type RequestQuery = {
      /** countryCode */
      countryCode?: string;
      /**
       * 类型：0-红人发样单 1-线下订单 2-TT订单
       * @format int32
       */
      type: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ErpOrderReferenceParamsResp;
  }

  /**
   * No description
   * @tags ERP订单
   * @name LuteosErpOrderReferenceParamsByNoSkuCode
   * @summary 无领用订单商品下拉框
   * @request POST:/api/luteos/erp/order/reference/paramsByNoSkuCode
   * @response `200` `NavigationParam` OK
   */
  export namespace LuteosErpOrderReferenceParamsByNoSkuCode {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = NavigationParam;
  }

  /**
   * No description
   * @tags ERP订单
   * @name LuteosErpOrderReferenceParamsBySkuCode
   * @summary 引用特殊参数-按skucode过滤
   * @request POST:/api/luteos/erp/order/reference/paramsBySkuCode
   * @response `200` `ReferenceParamsDeliveryMapResp` OK
   */
  export namespace LuteosErpOrderReferenceParamsBySkuCode {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ReferenceParamsDeliveryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ReferenceParamsDeliveryMapResp;
  }

  /**
   * No description
   * @tags ERP订单
   * @name LuteosErpOrderSave
   * @summary 新增
   * @request POST:/api/luteos/erp/order/save
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosErpOrderSave {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OrderSaveReq;
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
   * @tags ERP订单
   * @name LuteosErpOrderSaveDraft
   * @summary 新增草稿
   * @request POST:/api/luteos/erp/order/saveDraft
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosErpOrderSaveDraft {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OrderSaveReq;
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
   * @tags ERP订单
   * @name LuteosErpOrderSaveRemark
   * @summary 保存备注
   * @request POST:/api/luteos/erp/order/saveRemark
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosErpOrderSaveRemark {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OrderRemarkSaveReq;
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
   * @tags ERP-订单-运输方式
   * @name LuteosErpOrderShipmentOptionalQueryList
   * @summary 查询所有运输方式下拉列表
   * @request GET:/api/luteos/erp/order/shipment/optional/queryList
   * @response `200` `(DictCommonBean)[]` OK
   */
  export namespace LuteosErpOrderShipmentOptionalQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DictCommonBean[];
  }

  /**
   * No description
   * @tags ERP-订单-运输方式
   * @name LuteosErpOrderShipmentQueryList
   * @summary 查询列表
   * @request POST:/api/luteos/erp/order/shipment/queryList
   * @response `200` `ShippingMethodListQueryResp` OK
   */
  export namespace LuteosErpOrderShipmentQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ShippingMethodListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ShippingMethodListQueryResp;
  }

  /**
   * No description
   * @tags ERP-订单-运输方式
   * @name LuteosErpOrderShipmentQuerySpList
   * @summary 查询服务商列表
   * @request POST:/api/luteos/erp/order/shipment/querySpList
   * @response `200` `SpListQueryResp` OK
   */
  export namespace LuteosErpOrderShipmentQuerySpList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SpListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SpListQueryResp;
  }

  /**
   * No description
   * @tags ERP-订单-运输方式
   * @name LuteosErpOrderShipmentQueryWarehouseShipList
   * @summary 查询仓库运输方式列表
   * @request POST:/api/luteos/erp/order/shipment/queryWarehouseShipList
   * @response `200` `CommonRespWarehouseShipResp` OK
   */
  export namespace LuteosErpOrderShipmentQueryWarehouseShipList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = WarehouseShipListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespWarehouseShipResp;
  }

  /**
   * No description
   * @tags ERP-订单-运输方式
   * @name LuteosErpOrderShipmentUpdate
   * @summary 编辑
   * @request POST:/api/luteos/erp/order/shipment/update
   * @deprecated
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosErpOrderShipmentUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ShippingMethodSaveReq;
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
   * @tags ERP-订单-运输方式
   * @name LuteosErpOrderShipmentUpdateSmwp
   * @summary 编辑运输方式
   * @request POST:/api/luteos/erp/order/shipment/updateSmwp
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosErpOrderShipmentUpdateSmwp {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SmwpUpdateReq;
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
   * @tags ERP-shopify订单
   * @name LuteosErpOrderShopifyCancel
   * @summary webhook专用-取消shopify订单
   * @request POST:/api/luteos/erp/order/shopify/cancel
   * @response `200` `DubboCommonRespString` OK
   */
  export namespace LuteosErpOrderShopifyCancel {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ShopifyOrderReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DubboCommonRespString;
  }

  /**
   * No description
   * @tags ERP-shopify订单
   * @name LuteosErpOrderShopifyMockSave
   * @summary webhook专用-创建shopify订单-重新生成订单-生成不支持
   * @request GET:/api/luteos/erp/order/shopify/mock/save
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosErpOrderShopifyMockSave {
    export type RequestParams = {};
    export type RequestQuery = {
      /** erpCode */
      erpCode?: string;
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
   * @tags ERP-shopify订单
   * @name LuteosErpOrderShopifyModify
   * @summary webhook专用-修改shopify订单
   * @request POST:/api/luteos/erp/order/shopify/modify
   * @response `200` `DubboCommonRespString` OK
   */
  export namespace LuteosErpOrderShopifyModify {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ShopifyOrderReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DubboCommonRespString;
  }

  /**
   * No description
   * @tags ERP-shopify订单
   * @name LuteosErpOrderShopifySave
   * @summary webhook专用-创建shopify订单
   * @request POST:/api/luteos/erp/order/shopify/save
   * @response `200` `DubboCommonRespString` OK
   */
  export namespace LuteosErpOrderShopifySave {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ShopifyOrderReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DubboCommonRespString;
  }

  /**
   * No description
   * @tags ERP订单
   * @name LuteosErpOrderSubOrder
   * @summary 拆单
   * @request POST:/api/luteos/erp/order/subOrder
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpOrderSubOrder {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OrderSubReq;
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
   * @tags ERP-自动创建调拨单
   * @name LuteosErpOrderTransferCopySave
   * @summary 复制保存
   * @request POST:/api/luteos/erp/order/transfer/copySave
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosErpOrderTransferCopySave {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ErpOrderTransferCopySaveReq[];
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
   * @tags ERP-自动创建调拨单
   * @name LuteosErpOrderTransferCreateThirdCode
   * @summary 创建调拨单号
   * @request POST:/api/luteos/erp/order/transfer/createThirdCode
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosErpOrderTransferCreateThirdCode {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ErpOrderTransferThirdCodeReq[];
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
   * @tags ERP-自动创建调拨单
   * @name LuteosErpOrderTransferDelete
   * @summary 删除
   * @request POST:/api/luteos/erp/order/transfer/delete
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosErpOrderTransferDelete {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ErpOrderTransferDeleteReq;
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
   * @tags ERP-自动创建调拨单
   * @name LuteosErpOrderTransferDownloadTemplate
   * @summary 下载调拨单上传模板
   * @request POST:/api/luteos/erp/order/transfer/downloadTemplate
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosErpOrderTransferDownloadTemplate {
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
   * @tags ERP-自动创建调拨单
   * @name LuteosErpOrderTransferExportFile
   * @summary 调拨单导出
   * @request POST:/api/luteos/erp/order/transfer/exportFile
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosErpOrderTransferExportFile {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ErpOrderTransferListQueryReq;
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
   * @tags ERP-自动创建调拨单
   * @name LuteosErpOrderTransferImportTransfer
   * @summary 调拨单导入
   * @request POST:/api/luteos/erp/order/transfer/importTransfer
   * @response `200` `ImportDataResp` OK
   */
  export namespace LuteosErpOrderTransferImportTransfer {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UploadReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ImportDataResp;
  }

  /**
   * No description
   * @tags ERP-自动创建调拨单
   * @name LuteosErpOrderTransferQueryDetail
   * @summary 调拨单详情
   * @request POST:/api/luteos/erp/order/transfer/queryDetail
   * @response `200` `ErpOrderTransferDetailQueryResp` OK
   */
  export namespace LuteosErpOrderTransferQueryDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** transferId */
      transferId: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ErpOrderTransferDetailQueryResp;
  }

  /**
   * No description
   * @tags ERP-自动创建调拨单
   * @name LuteosErpOrderTransferQueryList
   * @summary 调拨单列表
   * @request POST:/api/luteos/erp/order/transfer/queryList
   * @response `200` `ErpOrderTransferListQueryResp` OK
   */
  export namespace LuteosErpOrderTransferQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ErpOrderTransferListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ErpOrderTransferListQueryResp;
  }

  /**
   * No description
   * @tags ERP-自动创建调拨单
   * @name LuteosErpOrderTransferQueryLogList
   * @summary 查询日志
   * @request GET:/api/luteos/erp/order/transfer/queryLogList
   * @response `200` `ErpOrderTransferLogQueryResp` OK
   */
  export namespace LuteosErpOrderTransferQueryLogList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** transferId */
      transferId: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ErpOrderTransferLogQueryResp;
  }

  /**
   * No description
   * @tags ERP-自动创建调拨单
   * @name LuteosErpOrderTransferSave
   * @summary 保存
   * @request POST:/api/luteos/erp/order/transfer/save
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosErpOrderTransferSave {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ErpOrderTransferSaveReq;
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
   * @tags ERP-自动创建调拨单
   * @name LuteosErpOrderTransferUpdateApprovalStatus
   * @summary 更改审核状态
   * @request POST:/api/luteos/erp/order/transfer/updateApprovalStatus
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosErpOrderTransferUpdateApprovalStatus {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ErpOrderTransferApprovalStatusReq[];
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
   * @tags ERP-自动创建调拨单
   * @name LuteosErpOrderTransferUpdateGroupCode
   * @summary 更改分组号
   * @request POST:/api/luteos/erp/order/transfer/updateGroupCode
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosErpOrderTransferUpdateGroupCode {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ErpOrderTransferGroupCodeReq[];
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
   * @tags ERP-自动创建调拨单
   * @name LuteosErpOrderTransferUpdateTransport
   * @summary 批量更新物流方式
   * @request POST:/api/luteos/erp/order/transfer/updateTransport
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosErpOrderTransferUpdateTransport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ErpOrderTransferTransportReq[];
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
   * @tags ERP订单
   * @name LuteosErpOrderUpdate
   * @summary 编辑
   * @request POST:/api/luteos/erp/order/update
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosErpOrderUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OrderSaveReq;
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
   * @tags ERP订单
   * @name LuteosErpOrderUpdateAddressUpload
   * @summary 上传修改订单地址
   * @request POST:/api/luteos/erp/order/update/address/upload
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpOrderUpdateAddressUpload {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UploadReq;
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
   * @tags ERP订单
   * @name LuteosErpOrderUpdateAuthBatch
   * @summary 批量编辑审核
   * @request POST:/api/luteos/erp/order/updateAuthBatch
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpOrderUpdateAuthBatch {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OrderBatchUpdateAuthReq;
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
   * @tags ERP订单
   * @name LuteosErpOrderUpdateCustomRemark
   * @summary 修改客服备注
   * @request POST:/api/luteos/erp/order/updateCustomRemark
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpOrderUpdateCustomRemark {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OrderRemarkReq;
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
   * @tags ERP订单
   * @name LuteosErpOrderUpdateWarehouseParam
   * @summary 绑定发货仓库
   * @request POST:/api/luteos/erp/order/updateWarehouseParam
   * @deprecated
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosErpOrderUpdateWarehouseParam {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ErpOrderWpUpdateReq;
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
   * @tags VC订单
   * @name LuteosErpOrderVcQueryList
   * @summary 查询列表
   * @request POST:/api/luteos/erp/order/vc/queryList
   * @response `200` `VcOrderListQueryResp` OK
   */
  export namespace LuteosErpOrderVcQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = VcOrderListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = VcOrderListQueryResp;
  }

  /**
   * No description
   * @tags ERP订单
   * @name LuteosErpOrderWarehouseRuleHit
   * @summary 分仓规则命中
   * @request POST:/api/luteos/erp/order/warehouseRuleHit
   * @response `200` `CommonRespListWarehouseRuleOutBean` OK
   */
  export namespace LuteosErpOrderWarehouseRuleHit {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ErpOrderWarehouseRuleBean;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespListWarehouseRuleOutBean;
  }

  /**
   * No description
   * @tags 销售出库
   * @name LuteosErpOutboundQueryDetail
   * @summary 详情查询
   * @request POST:/api/luteos/erp/outbound/queryDetail
   * @response `200` `SaleOutboundOrderDetailResp` OK
   */
  export namespace LuteosErpOutboundQueryDetail {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SaleOutboundOrderDetailReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SaleOutboundOrderDetailResp;
  }

  /**
   * No description
   * @tags 销售出库
   * @name LuteosErpOutboundQueryList
   * @summary 列表查询
   * @request POST:/api/luteos/erp/outbound/queryList
   * @response `200` `SaleOutboundOrderResp` OK
   */
  export namespace LuteosErpOutboundQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SaleOutboundOrderReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SaleOutboundOrderResp;
  }

  /**
   * No description
   * @tags 销售出库
   * @name LuteosErpOutboundToList
   * @summary 枚举
   * @request POST:/api/luteos/erp/outbound/toList
   * @response `200` `Record<string,object>` OK
   */
  export namespace LuteosErpOutboundToList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = Record<string, object>;
  }

  /**
   * No description
   * @tags 箱唛托唛
   * @name LuteosErpPackageBatchUpdateAddress
   * @summary 批量修改发货地址和订单地址
   * @request POST:/api/luteos/erp/package/batchUpdateAddress
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpPackageBatchUpdateAddress {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BatchUpdateAddressReq;
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
   * @tags 箱唛托唛
   * @name LuteosErpPackageCheckOrderList
   * @summary 来源订单选择合法性校验
   * @request POST:/api/luteos/erp/package/checkOrderList
   * @response `200` `CommonRespBoolean` OK
   */
  export namespace LuteosErpPackageCheckOrderList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PackageChooseOrderListCheckReq;
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
   * @tags 箱唛托唛
   * @name LuteosErpPackageConfirmPackageMark
   * @summary 确认并生成新的箱唛
   * @request POST:/api/luteos/erp/package/confirmPackageMark
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosErpPackageConfirmPackageMark {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PackageMarkConfirmReq;
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
   * @tags 箱唛托唛
   * @name LuteosErpPackageConfirmPackageMarkV2
   * @summary 保存箱唛文件
   * @request POST:/api/luteos/erp/package/confirmPackageMarkV2
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosErpPackageConfirmPackageMarkV2 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PackageMarkConfirmV2Req;
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
   * @tags 箱唛托唛
   * @name LuteosErpPackageConfirmPackageOrder
   * @summary 确认装箱单
   * @request POST:/api/luteos/erp/package/confirmPackageOrder
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosErpPackageConfirmPackageOrder {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PackageOrderUpdateReq;
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
   * @tags 箱唛托唛
   * @name LuteosErpPackageConfirmPalletFile
   * @summary 托唛-保存托唛文件
   * @request POST:/api/luteos/erp/package/confirmPalletFile
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosErpPackageConfirmPalletFile {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PalletMarkFileConfirmReq;
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
   * @tags 箱唛托唛
   * @name LuteosErpPackageConfirmPalletMark
   * @summary 托唛-确认&生成托唛
   * @request POST:/api/luteos/erp/package/confirmPalletMark
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosErpPackageConfirmPalletMark {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PalletMarkConfirmReq;
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
   * @tags 箱唛托唛
   * @name LuteosErpPackageConfirmPalletOrder
   * @summary 托唛-确认打托单
   * @request POST:/api/luteos/erp/package/confirmPalletOrder
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosErpPackageConfirmPalletOrder {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PalletOrderUpdateReq;
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
   * @tags 箱唛托唛
   * @name LuteosErpPackageDeleteZipPackage
   * @summary 删除箱托记录
   * @request POST:/api/luteos/erp/package/deleteZipPackage
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpPackageDeleteZipPackage {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PalletPackageDeleteReq;
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
   * @tags 箱唛托唛
   * @name LuteosErpPackageDownLoadPackageMakFile
   * @summary 下载箱唛文件
   * @request POST:/api/luteos/erp/package/downLoadPackageMakFile
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosErpPackageDownLoadPackageMakFile {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PackageMarkDownLoadReq;
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
   * @tags 箱唛托唛
   * @name LuteosErpPackageDownLoadPalletDetail
   * @summary 托唛-导出打托单明细
   * @request POST:/api/luteos/erp/package/downLoadPalletDetail
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosErpPackageDownLoadPalletDetail {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PalletDetailDownLoadReq;
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
   * @tags 箱唛托唛
   * @name LuteosErpPackageDownLoadPalletTemplate
   * @summary 托唛-导出打托单模板
   * @request POST:/api/luteos/erp/package/downLoadPalletTemplate
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosErpPackageDownLoadPalletTemplate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PalletTemplateReq;
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
   * @tags 箱唛托唛
   * @name LuteosErpPackageDownPackageOrder
   * @summary 下载装箱单
   * @request POST:/api/luteos/erp/package/downPackageOrder
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosErpPackageDownPackageOrder {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PackageOrderDownLoadReq;
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
   * @tags 箱唛托唛
   * @name LuteosErpPackageDownPackageTemplate
   * @summary 导出装箱单模板
   * @request POST:/api/luteos/erp/package/downPackageTemplate
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosErpPackageDownPackageTemplate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PackageTemplateReq;
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
   * @tags 箱唛托唛
   * @name LuteosErpPackageDownPackageTemplateWithOutOrder
   * @summary 导出装箱单模板-无订单
   * @request GET:/api/luteos/erp/package/downPackageTemplateWithOutOrder
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosErpPackageDownPackageTemplateWithOutOrder {
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
   * @tags 箱唛托唛
   * @name LuteosErpPackageDownloadBolFile
   * @summary BOL-下载bol提单
   * @request POST:/api/luteos/erp/package/downloadBolFile
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpPackageDownloadBolFile {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PalletPackageZipDownLoadReq;
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
   * @tags 箱唛托唛
   * @name LuteosErpPackageDownloadInboundFile
   * @summary 下载入库单
   * @request POST:/api/luteos/erp/package/downloadInboundFile
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpPackageDownloadInboundFile {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PalletInboundReq;
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
   * @tags 箱唛托唛
   * @name LuteosErpPackageDownloadList
   * @summary 导出箱托列表
   * @request POST:/api/luteos/erp/package/downloadList
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosErpPackageDownloadList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PalletPackageQueryReq;
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
   * @tags 箱唛托唛
   * @name LuteosErpPackageDownloadOperationOrderFile
   * @summary 运营装箱单-运营装箱单下载
   * @request POST:/api/luteos/erp/package/downloadOperationOrderFile
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpPackageDownloadOperationOrderFile {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PalletPackageZipDownLoadReq;
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
   * @tags 箱唛托唛
   * @name LuteosErpPackageDownloadPalletMarkFile
   * @summary 托唛-下载箱唛文件
   * @request POST:/api/luteos/erp/package/downloadPalletMarkFile
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosErpPackageDownloadPalletMarkFile {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PalletPackageZipDownLoadReq;
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
   * @tags 箱唛托唛
   * @name LuteosErpPackageDownloadZipFile
   * @summary 列表下载文件包
   * @request POST:/api/luteos/erp/package/downloadZipFile
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosErpPackageDownloadZipFile {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PalletPackageZipDownLoadReq;
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
   * @tags 箱唛托唛
   * @name LuteosErpPackageGeneratePackageMarkFile
   * @summary 生成箱唛文件
   * @request POST:/api/luteos/erp/package/generatePackageMarkFile
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosErpPackageGeneratePackageMarkFile {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PackageMarkGeneratorFileReq;
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
   * @tags 箱唛托唛
   * @name LuteosErpPackageInitBolData
   * @summary BOL-初始化BOL提单查询
   * @request POST:/api/luteos/erp/package/initBolData
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpPackageInitBolData {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LadingBillReq;
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
   * @tags 箱唛托唛
   * @name LuteosErpPackageInitInboundOrder
   * @summary 入库单-生成入库单
   * @request POST:/api/luteos/erp/package/initInboundOrder
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosErpPackageInitInboundOrder {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PalletInboundReq;
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
   * @tags 箱唛托唛
   * @name LuteosErpPackageInitMarkData
   * @summary 箱唛-生成箱唛数据-初始化
   * @request POST:/api/luteos/erp/package/initMarkData
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpPackageInitMarkData {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PackageGeneratePackageMarkDataReq;
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
   * @tags 箱唛托唛
   * @name LuteosErpPackageInitOperationPackageOrder
   * @summary 运营装箱单-运营装箱发票初始化
   * @request POST:/api/luteos/erp/package/initOperationPackageOrder
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosErpPackageInitOperationPackageOrder {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OperationPackageOrderQueryReq;
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
   * @tags 箱唛托唛
   * @name LuteosErpPackageInitPalletMarkData
   * @summary 托唛-生成托唛数据-初始化
   * @request POST:/api/luteos/erp/package/initPalletMarkData
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpPackageInitPalletMarkData {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PackageGeneratePalletMarkDataReq;
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
   * @tags 箱唛托唛
   * @name LuteosErpPackageQueryBolData
   * @summary BOL-BOL提单查询
   * @request POST:/api/luteos/erp/package/queryBolData
   * @response `200` `CommonRespLadingBillResp` OK
   */
  export namespace LuteosErpPackageQueryBolData {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LadingBillReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespLadingBillResp;
  }

  /**
   * No description
   * @tags 箱唛托唛
   * @name LuteosErpPackageQueryChooseOrderList
   * @summary 选择订单查询
   * @request POST:/api/luteos/erp/package/queryChooseOrderList
   * @response `200` `PackageChooseOrderListResp` OK
   */
  export namespace LuteosErpPackageQueryChooseOrderList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PackageChooseOrderListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PackageChooseOrderListResp;
  }

  /**
   * No description
   * @tags 箱唛托唛
   * @name LuteosErpPackageQueryDetail
   * @summary 详情查询
   * @request POST:/api/luteos/erp/package/queryDetail
   * @response `200` `PalletPackageDetailResp` OK
   */
  export namespace LuteosErpPackageQueryDetail {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PalletPackageDetailReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PalletPackageDetailResp;
  }

  /**
   * No description
   * @tags 箱唛托唛
   * @name LuteosErpPackageQueryInboundOrder
   * @summary 入库单-查询入库单
   * @request POST:/api/luteos/erp/package/queryInboundOrder
   * @response `200` `CommonRespPalletInboundResp` OK
   */
  export namespace LuteosErpPackageQueryInboundOrder {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PalletInboundReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespPalletInboundResp;
  }

  /**
   * No description
   * @tags 箱唛托唛
   * @name LuteosErpPackageQueryList
   * @summary 列表查询
   * @request POST:/api/luteos/erp/package/queryList
   * @response `200` `PalletPackageQueryResp` OK
   */
  export namespace LuteosErpPackageQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PalletPackageQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PalletPackageQueryResp;
  }

  /**
   * No description
   * @tags 箱唛托唛
   * @name LuteosErpPackageQueryMarkData
   * @summary 查询所有箱唛数据
   * @request POST:/api/luteos/erp/package/queryMarkData
   * @response `200` `CommonRespPackageMarkDataResp` OK
   */
  export namespace LuteosErpPackageQueryMarkData {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PackageMarkDataReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespPackageMarkDataResp;
  }

  /**
   * No description
   * @tags 箱唛托唛
   * @name LuteosErpPackageQueryMarkDataPage
   * @summary 分页查询箱唛数据
   * @request POST:/api/luteos/erp/package/queryMarkDataPage
   * @response `200` `CommonRespPackageMarkDataPageResp` OK
   */
  export namespace LuteosErpPackageQueryMarkDataPage {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PackageMarkDataPageReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespPackageMarkDataPageResp;
  }

  /**
   * No description
   * @tags 箱唛托唛
   * @name LuteosErpPackageQueryOperationPackageOrder
   * @summary 运营装箱单-运营装箱发票单查询
   * @request POST:/api/luteos/erp/package/queryOperationPackageOrder
   * @response `200` `CommonRespOperationPackageOrderResp` OK
   */
  export namespace LuteosErpPackageQueryOperationPackageOrder {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OperationPackageOrderQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespOperationPackageOrderResp;
  }

  /**
   * No description
   * @tags 箱唛托唛
   * @name LuteosErpPackageQueryPackageMark
   * @summary 查询装箱单&箱唛信息&装箱单&入库单-查询单个
   * @request POST:/api/luteos/erp/package/queryPackageMark
   * @response `200` `CommonRespPackageMarkListQueryResp` OK
   */
  export namespace LuteosErpPackageQueryPackageMark {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PackageMarkListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespPackageMarkListQueryResp;
  }

  /**
   * No description
   * @tags 箱唛托唛
   * @name LuteosErpPackageQueryPalletDetail
   * @summary 托唛-查询托唛信息
   * @request POST:/api/luteos/erp/package/queryPalletDetail
   * @response `200` `CommonRespPackageMarkListQueryResp` OK
   */
  export namespace LuteosErpPackageQueryPalletDetail {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PackageMarkListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespPackageMarkListQueryResp;
  }

  /**
   * No description
   * @tags 箱唛托唛
   * @name LuteosErpPackageQueryPalletMarkData
   * @summary 托唛-查询所有托唛
   * @request POST:/api/luteos/erp/package/queryPalletMarkData
   * @response `200` `CommonRespPalletDataResp` OK
   */
  export namespace LuteosErpPackageQueryPalletMarkData {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PalletDataReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespPalletDataResp;
  }

  /**
   * No description
   * @tags 箱唛托唛
   * @name LuteosErpPackageQueryPalletMarkPage
   * @summary 托唛-分页查询托唛数据
   * @request POST:/api/luteos/erp/package/queryPalletMarkPage
   * @response `200` `CommonRespPalletDataPageResp` OK
   */
  export namespace LuteosErpPackageQueryPalletMarkPage {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PalletDataPageReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespPalletDataPageResp;
  }

  /**
   * No description
   * @tags 箱唛托唛
   * @name LuteosErpPackageQueryProductProperties
   * @summary 查询对应的属性
   * @request POST:/api/luteos/erp/package/queryProductProperties
   * @response `200` `CommonRespProductConfigPropertyResp` OK
   */
  export namespace LuteosErpPackageQueryProductProperties {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductConfigPropertyReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespProductConfigPropertyResp;
  }

  /**
   * No description
   * @tags 箱唛托唛
   * @name LuteosErpPackageQueryRecordStatus
   * @summary 相托-整体状态信息
   * @request POST:/api/luteos/erp/package/queryRecordStatus
   * @response `200` `CommonRespPalletStatusBean` OK
   */
  export namespace LuteosErpPackageQueryRecordStatus {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PackageStatusReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespPalletStatusBean;
  }

  /**
   * No description
   * @tags 箱唛托唛
   * @name LuteosErpPackageQuerySourceOrderList
   * @summary 来源订单选择分页
   * @request POST:/api/luteos/erp/package/querySourceOrderList
   * @response `200` `CommonRespPackageChooseSourceOrderListResp` OK
   */
  export namespace LuteosErpPackageQuerySourceOrderList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PackageChooseSourceOrderListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespPackageChooseSourceOrderListResp;
  }

  /**
   * No description
   * @tags 箱唛托唛
   * @name LuteosErpPackageSingleConfirmPackageMark
   * @summary 箱唛-保存单个箱唛数据
   * @request POST:/api/luteos/erp/package/singleConfirmPackageMark
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosErpPackageSingleConfirmPackageMark {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PackageSingleMarkConfirmReq;
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
   * @tags 箱唛托唛
   * @name LuteosErpPackageSingleConfirmPalletMark
   * @summary 托唛-保存单个托唛数据
   * @request POST:/api/luteos/erp/package/singleConfirmPalletMark
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosErpPackageSingleConfirmPalletMark {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PalletMarkSingleConfirmReq;
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
   * @tags 箱唛托唛
   * @name LuteosErpPackageUpdateBolData
   * @summary BOL-BOL提单数据保存
   * @request POST:/api/luteos/erp/package/updateBolData
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpPackageUpdateBolData {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LadingBillUpdateReq;
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
   * @tags 箱唛托唛
   * @name LuteosErpPackageUpdateBolFile
   * @summary BOL-BOL提单文件保存
   * @request POST:/api/luteos/erp/package/updateBolFile
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpPackageUpdateBolFile {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LadingBillFileUpdateReq;
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
   * @tags 箱唛托唛
   * @name LuteosErpPackageUpdateInboundData
   * @summary 入库单-入库单保存&更新数据
   * @request POST:/api/luteos/erp/package/updateInboundData
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpPackageUpdateInboundData {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PalletInboundUpdateReq;
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
   * @tags 箱唛托唛
   * @name LuteosErpPackageUpdateInboundFile
   * @summary 入库单-入库单保存&更新文件
   * @request POST:/api/luteos/erp/package/updateInboundFile
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpPackageUpdateInboundFile {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PalletInboundUpdateFileReq;
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
   * @tags 箱唛托唛
   * @name LuteosErpPackageUpdateOperationData
   * @summary 运营装箱单-保存运营装箱单&发票数据
   * @request POST:/api/luteos/erp/package/updateOperationData
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpPackageUpdateOperationData {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OperationPackageOrderUpdateReq;
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
   * @tags 箱唛托唛
   * @name LuteosErpPackageUpdateOperationFile
   * @summary 运营装箱单-保存运营装箱单&发票文件
   * @request POST:/api/luteos/erp/package/updateOperationFile
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpPackageUpdateOperationFile {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OperationPackageOrderUpdateFileReq;
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
   * @tags 箱唛托唛
   * @name LuteosErpPackageUpdatePalletPackageName
   * @summary 更新箱托名称
   * @request POST:/api/luteos/erp/package/updatePalletPackageName
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpPackageUpdatePalletPackageName {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PalletPackageNameUpdateReq;
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
   * @tags 箱唛托唛
   * @name LuteosErpPackageUploadPackageOrder
   * @summary 导入装箱单
   * @request POST:/api/luteos/erp/package/uploadPackageOrder
   * @response `200` `ImportDataResp` OK
   */
  export namespace LuteosErpPackageUploadPackageOrder {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PackageOrderUploadReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ImportDataResp;
  }

  /**
   * No description
   * @tags 箱唛托唛
   * @name LuteosErpPackageUploadPackageWithOutOrder
   * @summary 上传装箱单清单文件-无订单
   * @request POST:/api/luteos/erp/package/uploadPackageWithOutOrder
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpPackageUploadPackageWithOutOrder {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PackageOrderUploadWithOutOrderReq;
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
   * @tags 箱唛托唛
   * @name LuteosErpPackageUploadPalletOrder
   * @summary 托唛-导入打托单
   * @request POST:/api/luteos/erp/package/uploadPalletOrder
   * @response `200` `ImportDataResp` OK
   */
  export namespace LuteosErpPackageUploadPalletOrder {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PalletOrderUploadReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ImportDataResp;
  }

  /**
   * No description
   * @tags 提货管理
   * @name LuteosErpPlanBillLadingAbandon
   * @summary 提货管理-作废
   * @request GET:/api/luteos/erp/plan/bill/lading/abandon
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpPlanBillLadingAbandon {
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
    export type ResponseBody = CommonResp;
  }

  /**
   * No description
   * @tags 提货管理
   * @name LuteosErpPlanBillLadingAuth
   * @summary 提货管理-审核
   * @request POST:/api/luteos/erp/plan/bill/lading/auth
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpPlanBillLadingAuth {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlanBillLadingAuthReq;
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
   * @tags 提货管理
   * @name LuteosErpPlanBillLadingModifyAndSubmit
   * @summary 提货管理-编辑并提交审核
   * @request POST:/api/luteos/erp/plan/bill/lading/modifyAndSubmit
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpPlanBillLadingModifyAndSubmit {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlanBillLadingModifyReq;
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
   * @tags 提货管理
   * @name LuteosErpPlanBillLadingQuertPickType
   * @summary 提货管理-选择提货方式及仓库关系
   * @request POST:/api/luteos/erp/plan/bill/lading/quertPickType
   * @response `200` `PlanBillLadingPickListQueryResp` OK
   */
  export namespace LuteosErpPlanBillLadingQuertPickType {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PlanBillLadingPickListQueryResp;
  }

  /**
   * No description
   * @tags 提货管理
   * @name LuteosErpPlanBillLadingQueryDetail
   * @summary 提货管理-提货单详情
   * @request GET:/api/luteos/erp/plan/bill/lading/queryDetail
   * @response `200` `PlanBillLadingDetailQueryResp` OK
   */
  export namespace LuteosErpPlanBillLadingQueryDetail {
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
    export type ResponseBody = PlanBillLadingDetailQueryResp;
  }

  /**
   * No description
   * @tags 提货管理
   * @name LuteosErpPlanBillLadingQueryList
   * @summary 提货管理-列表查询
   * @request POST:/api/luteos/erp/plan/bill/lading/queryList
   * @response `200` `PlanBillLadingListQueryResp` OK
   */
  export namespace LuteosErpPlanBillLadingQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlanBillLadingListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PlanBillLadingListQueryResp;
  }

  /**
   * No description
   * @tags 提货管理
   * @name LuteosErpPlanBillLadingQueryProduct
   * @summary 提货管理-选择产品
   * @request POST:/api/luteos/erp/plan/bill/lading/queryProduct
   * @response `200` `PlanBillLadingProductListQueryResp` OK
   */
  export namespace LuteosErpPlanBillLadingQueryProduct {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlanBillLadingProductListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PlanBillLadingProductListQueryResp;
  }

  /**
   * No description
   * @tags 提货管理
   * @name LuteosErpPlanBillLadingSaveAndSubmit
   * @summary 提货管理-新增并提交审核
   * @request POST:/api/luteos/erp/plan/bill/lading/saveAndSubmit
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosErpPlanBillLadingSaveAndSubmit {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlanBillLadingSaveReq;
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
   * @tags 送货单
   * @name LuteosErpPlanDeliveryBillAbandon
   * @summary 废弃
   * @request POST:/api/luteos/erp/plan/delivery/bill/abandon
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpPlanDeliveryBillAbandon {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlanDeliveryBillAbandonReq;
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
   * @tags 送货单
   * @name LuteosErpPlanDeliveryBillConfirm
   * @summary 确认收货
   * @request POST:/api/luteos/erp/plan/delivery/bill/confirm
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpPlanDeliveryBillConfirm {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlanDeliveryBillConfirmQueryReq;
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
   * @tags 送货单
   * @name LuteosErpPlanDeliveryBillQueryDetail
   * @summary 详情
   * @request GET:/api/luteos/erp/plan/delivery/bill/queryDetail
   * @response `200` `PlanDeliveryBillDetailResp` OK
   */
  export namespace LuteosErpPlanDeliveryBillQueryDetail {
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
    export type ResponseBody = PlanDeliveryBillDetailResp;
  }

  /**
   * No description
   * @tags 送货单
   * @name LuteosErpPlanDeliveryBillQueryList
   * @summary 列表查询
   * @request POST:/api/luteos/erp/plan/delivery/bill/queryList
   * @response `200` `PlanDeliveryBillListQueryResp` OK
   */
  export namespace LuteosErpPlanDeliveryBillQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlanDeliveryBillListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PlanDeliveryBillListQueryResp;
  }

  /**
   * No description
   * @tags 送货单
   * @name LuteosErpPlanDeliveryBillRetryEc
   * @summary 异常重推异常
   * @request POST:/api/luteos/erp/plan/delivery/bill/retryEc
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpPlanDeliveryBillRetryEc {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlanDeliveryBillRetryEcQueryReq;
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
   * @tags 送货单
   * @name LuteosErpPlanDeliveryBillSync
   * @summary 同步送货单
   * @request POST:/api/luteos/erp/plan/delivery/bill/sync
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpPlanDeliveryBillSync {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlanDeliveryBillSyncReq;
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
   * @tags 计划库存
   * @name LuteosErpPlanInventoryAmazonExportList
   * @summary 导出亚马逊计划库存
   * @request POST:/api/luteos/erp/plan/inventory/amazon/exportList
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosErpPlanInventoryAmazonExportList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlanInventoryFbaQueryReq;
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
   * @tags 计划库存
   * @name LuteosErpPlanInventoryAmazonQueryList
   * @summary 查询亚马逊计划库存
   * @request POST:/api/luteos/erp/plan/inventory/amazon/queryList
   * @response `200` `PlanInventoryFbaPageResp` OK
   */
  export namespace LuteosErpPlanInventoryAmazonQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlanInventoryFbaQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PlanInventoryFbaPageResp;
  }

  /**
   * No description
   * @tags 计划库存
   * @name LuteosErpPlanInventoryRetailExportList
   * @summary 导出线下零售计划库存
   * @request POST:/api/luteos/erp/plan/inventory/retail/exportList
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosErpPlanInventoryRetailExportList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = RetailPlanInventoryQueryReq;
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
   * @tags 计划库存
   * @name LuteosErpPlanInventoryRetailQueryList
   * @summary 查询线下零售计划库存
   * @request POST:/api/luteos/erp/plan/inventory/retail/queryList
   * @response `200` `RetailPlanInventoryPageResp` OK
   */
  export namespace LuteosErpPlanInventoryRetailQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = RetailPlanInventoryQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = RetailPlanInventoryPageResp;
  }

  /**
   * No description
   * @tags 计划库存
   * @name LuteosErpPlanInventorySelfExportList
   * @summary 导出自营仓库计划库存
   * @request POST:/api/luteos/erp/plan/inventory/self/exportList
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosErpPlanInventorySelfExportList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlanInventorySelfQueryReq;
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
   * @tags 计划库存
   * @name LuteosErpPlanInventorySelfQueryList
   * @summary 查询自营仓库计划库存
   * @request POST:/api/luteos/erp/plan/inventory/self/queryList
   * @response `200` `PlanInventorySelfPageResp` OK
   */
  export namespace LuteosErpPlanInventorySelfQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlanInventorySelfQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PlanInventorySelfPageResp;
  }

  /**
   * No description
   * @tags 计划库存
   * @name LuteosErpPlanInventoryShopifyExportList
   * @summary 导出shopify计划库存
   * @request POST:/api/luteos/erp/plan/inventory/shopify/exportList
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosErpPlanInventoryShopifyExportList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ShopifyPlanInventoryQueryReq;
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
   * @tags 计划库存
   * @name LuteosErpPlanInventoryShopifyQueryList
   * @summary 查询shopify计划库存
   * @request POST:/api/luteos/erp/plan/inventory/shopify/queryList
   * @response `200` `ShopifyPlanInventoryPageResp` OK
   */
  export namespace LuteosErpPlanInventoryShopifyQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ShopifyPlanInventoryQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ShopifyPlanInventoryPageResp;
  }

  /**
   * No description
   * @tags 计划库存
   * @name LuteosErpPlanInventoryShopifySync
   * @summary 查询shopify计划库存
   * @request POST:/api/luteos/erp/plan/inventory/shopify/sync
   * @response `200` `void` OK
   */
  export namespace LuteosErpPlanInventoryShopifySync {
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
   * @tags 计划库存
   * @name LuteosErpPlanInventoryTiktokExportList
   * @summary 导出tiktok计划库存
   * @request POST:/api/luteos/erp/plan/inventory/tiktok/exportList
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosErpPlanInventoryTiktokExportList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlanInventoryTiktokQueryReq;
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
   * @tags 计划库存
   * @name LuteosErpPlanInventoryTiktokQueryList
   * @summary 查询tiktok计划库存
   * @request POST:/api/luteos/erp/plan/inventory/tiktok/queryList
   * @response `200` `PlanInventoryTiktokPageResp` OK
   */
  export namespace LuteosErpPlanInventoryTiktokQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlanInventoryTiktokQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PlanInventoryTiktokPageResp;
  }

  /**
   * No description
   * @tags 计划库存
   * @name LuteosErpPlanInventoryWalmartExportList
   * @summary 导出沃尔玛计划库存
   * @request POST:/api/luteos/erp/plan/inventory/walmart/exportList
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosErpPlanInventoryWalmartExportList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlanInventoryWalmartQueryReq;
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
   * @tags 计划库存
   * @name LuteosErpPlanInventoryWalmartQueryList
   * @summary 查询沃尔玛计划库存
   * @request POST:/api/luteos/erp/plan/inventory/walmart/queryList
   * @response `200` `PlanInventoryWalmartPageResp` OK
   */
  export namespace LuteosErpPlanInventoryWalmartQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlanInventoryWalmartQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PlanInventoryWalmartPageResp;
  }

  /**
   * No description
   * @tags 计划-提货计划
   * @name LuteosErpPlanPickupAcceptSupplier
   * @summary 接收供应商操作数据
   * @request POST:/api/luteos/erp/plan/pickup/acceptSupplier
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosErpPlanPickupAcceptSupplier {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SaleDeliveryNoticeAcceptReq;
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
   * @tags 计划-提货计划
   * @name LuteosErpPlanPickupAllocateOrderNumberList
   * @summary PO单分配列表
   * @request POST:/api/luteos/erp/plan/pickup/allocateOrderNumberList
   * @response `200` `PlanPickupItemQueryResp` OK
   */
  export namespace LuteosErpPlanPickupAllocateOrderNumberList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlanPickupItemQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PlanPickupItemQueryResp;
  }

  /**
   * No description
   * @tags 计划-提货计划
   * @name LuteosErpPlanPickupBatchSave
   * @summary 批量保存
   * @request POST:/api/luteos/erp/plan/pickup/batchSave
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosErpPlanPickupBatchSave {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlanPickupBatchSaveReq;
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
   * @tags 计划-提货计划
   * @name LuteosErpPlanPickupClose
   * @summary 计划关闭
   * @request POST:/api/luteos/erp/plan/pickup/close
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosErpPlanPickupClose {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlanPickupPlantOperationReq;
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
   * @tags 计划-提货计划
   * @name LuteosErpPlanPickupDelete
   * @summary 删除
   * @request POST:/api/luteos/erp/plan/pickup/delete
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosErpPlanPickupDelete {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlanPickupDeleteReq;
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
   * @tags 计划-提货计划
   * @name LuteosErpPlanPickupDownloadTemplate
   * @summary 下载上传模板
   * @request POST:/api/luteos/erp/plan/pickup/downloadTemplate
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosErpPlanPickupDownloadTemplate {
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
   * @tags 计划-提货计划
   * @name LuteosErpPlanPickupExportFile
   * @summary 导出
   * @request POST:/api/luteos/erp/plan/pickup/exportFile
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosErpPlanPickupExportFile {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlanPickupListQueryReq;
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
   * @tags 计划-提货计划
   * @name LuteosErpPlanPickupGetMaterialPurchaseSummary
   * @summary 统计物料采购汇总信息
   * @request GET:/api/luteos/erp/plan/pickup/getMaterialPurchaseSummary
   * @response `200` `PlanPickupMaterialPurchaseSummaryQueryResp` OK
   */
  export namespace LuteosErpPlanPickupGetMaterialPurchaseSummary {
    export type RequestParams = {};
    export type RequestQuery = {
      /** keyword */
      keyword?: string;
      /** supplierCode */
      supplierCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PlanPickupMaterialPurchaseSummaryQueryResp;
  }

  /**
   * No description
   * @tags 计划-提货计划
   * @name LuteosErpPlanPickupGetSupplierList
   * @summary 获取供应商列表
   * @request POST:/api/luteos/erp/plan/pickup/getSupplierList
   * @response `200` `PlanPickupSupplierQueryResp` OK
   */
  export namespace LuteosErpPlanPickupGetSupplierList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlanPickupSupplierQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PlanPickupSupplierQueryResp;
  }

  /**
   * No description
   * @tags 计划-提货计划
   * @name LuteosErpPlanPickupImportFile
   * @summary 导入
   * @request POST:/api/luteos/erp/plan/pickup/importFile
   * @response `200` `ImportDataResp` OK
   */
  export namespace LuteosErpPlanPickupImportFile {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UploadReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ImportDataResp;
  }

  /**
   * No description
   * @tags 计划-提货计划
   * @name LuteosErpPlanPickupPushSupplier
   * @summary 推送供应商
   * @request POST:/api/luteos/erp/plan/pickup/pushSupplier
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosErpPlanPickupPushSupplier {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlanPickupPushReq;
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
   * @tags 计划-提货计划
   * @name LuteosErpPlanPickupQueryDetail
   * @summary 查询详情
   * @request GET:/api/luteos/erp/plan/pickup/queryDetail
   * @response `200` `PlanPickupDetailQueryResp` OK
   */
  export namespace LuteosErpPlanPickupQueryDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** itemId */
      itemId: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PlanPickupDetailQueryResp;
  }

  /**
   * No description
   * @tags 计划-提货计划
   * @name LuteosErpPlanPickupQueryDetailByCode
   * @summary 通过计划提货批号查询详情
   * @request GET:/api/luteos/erp/plan/pickup/queryDetailByCode
   * @response `200` `PlanPickupBatchDetailQueryResp` OK
   */
  export namespace LuteosErpPlanPickupQueryDetailByCode {
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
    export type ResponseBody = PlanPickupBatchDetailQueryResp;
  }

  /**
   * No description
   * @tags 计划-提货计划
   * @name LuteosErpPlanPickupQueryList
   * @summary 查询列表
   * @request POST:/api/luteos/erp/plan/pickup/queryList
   * @response `200` `PlanPickupListQueryResp` OK
   */
  export namespace LuteosErpPlanPickupQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlanPickupListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PlanPickupListQueryResp;
  }

  /**
   * No description
   * @tags 计划-提货计划
   * @name LuteosErpPlanPickupSave
   * @summary 保存
   * @request POST:/api/luteos/erp/plan/pickup/save
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosErpPlanPickupSave {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlanPickupSaveReq;
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
   * @tags 预约入库
   * @name LuteosErpPlanPrebookInboundAddPrebookInbound
   * @summary 预约入库-新增预约入库
   * @request POST:/api/luteos/erp/plan/prebook/inbound/addPrebookInbound
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosErpPlanPrebookInboundAddPrebookInbound {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlanPrebookInboundAddReq;
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
   * @tags 预约入库
   * @name LuteosErpPlanPrebookInboundDelete
   * @summary 预约入库-作废
   * @request POST:/api/luteos/erp/plan/prebook/inbound/delete
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosErpPlanPrebookInboundDelete {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlanPreBookInBoundDeleteReq;
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
   * @tags 预约入库
   * @name LuteosErpPlanPrebookInboundQueryInboundDetail
   * @summary 预约入库-详情列表
   * @request POST:/api/luteos/erp/plan/prebook/inbound/queryInboundDetail
   * @response `200` `PlanPreBookInboundDetailResp` OK
   */
  export namespace LuteosErpPlanPrebookInboundQueryInboundDetail {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlanPreBookInboudDetailReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PlanPreBookInboundDetailResp;
  }

  /**
   * No description
   * @tags 预约入库
   * @name LuteosErpPlanPrebookInboundQueryInboundOrder
   * @summary 预约入库-查询预约入库单
   * @request POST:/api/luteos/erp/plan/prebook/inbound/queryInboundOrder
   * @response `200` `PlanPrebookInboundQueryResp` OK
   */
  export namespace LuteosErpPlanPrebookInboundQueryInboundOrder {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlanPrebookInboundQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PlanPrebookInboundQueryResp;
  }

  /**
   * No description
   * @tags 预约入库
   * @name LuteosErpPlanPrebookInboundShip
   * @summary 预约入库-送货
   * @request POST:/api/luteos/erp/plan/prebook/inbound/ship
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosErpPlanPrebookInboundShip {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlanPreBookInboundShipReq;
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
   * @tags 预约入库
   * @name LuteosErpPlanPrebookInboundUpdatePrebookInbound
   * @summary 预约入库-编辑预约入库
   * @request POST:/api/luteos/erp/plan/prebook/inbound/updatePrebookInbound
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosErpPlanPrebookInboundUpdatePrebookInbound {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlanPrebookInboundModifyReq;
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
   * @tags 零售预测-SKU汇总配置
   * @name LuteosErpPlanPrsfssChangeStatus
   * @summary 变更状态
   * @request POST:/api/luteos/erp/plan/prsfss/changeStatus
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosErpPlanPrsfssChangeStatus {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PrsfssChangeStatusReq;
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
   * @tags 零售预测-SKU汇总配置
   * @name LuteosErpPlanPrsfssExportFile
   * @summary 文件导出
   * @request POST:/api/luteos/erp/plan/prsfss/exportFile
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosErpPlanPrsfssExportFile {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PrsfssQueryListReq;
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
   * @tags 零售预测-SKU汇总配置
   * @name LuteosErpPlanPrsfssQueryList
   * @summary 列表查询
   * @request POST:/api/luteos/erp/plan/prsfss/queryList
   * @response `200` `PrsfssQueryListResp` OK
   */
  export namespace LuteosErpPlanPrsfssQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PrsfssQueryListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PrsfssQueryListResp;
  }

  /**
   * No description
   * @tags 零售预测-SKU汇总配置
   * @name LuteosErpPlanPrsfssSaveOrUpdate
   * @summary 新增或者编辑
   * @request POST:/api/luteos/erp/plan/prsfss/saveOrUpdate
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpPlanPrsfssSaveOrUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PrsfssSaveOrUpdateReq;
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
   * @tags 预测-活动增量管理
   * @name LuteosErpPlanPsfaiChangeStatus
   * @summary 变更状态
   * @request POST:/api/luteos/erp/plan/psfai/changeStatus
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpPlanPsfaiChangeStatus {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PsfaiChangeStatusReq;
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
   * @tags 预测-活动增量管理
   * @name LuteosErpPlanPsfaiQueryList
   * @summary 列表查询
   * @request POST:/api/luteos/erp/plan/psfai/queryList
   * @response `200` `PsfaiQueryListResp` OK
   */
  export namespace LuteosErpPlanPsfaiQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PsfaiQueryListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PsfaiQueryListResp;
  }

  /**
   * No description
   * @tags 预测-活动增量管理
   * @name LuteosErpPlanPsfaiSaveOrUpdate
   * @summary 新增/更新
   * @request POST:/api/luteos/erp/plan/psfai/saveOrUpdate
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpPlanPsfaiSaveOrUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PsfaiSaveReq;
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
   * @tags 预测-自动打标管理
   * @name LuteosErpPlanPsfatChangeStatus
   * @summary 变更状态
   * @request POST:/api/luteos/erp/plan/psfat/changeStatus
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpPlanPsfatChangeStatus {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PsfatChangeStatusReq;
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
   * @tags 预测-自动打标管理
   * @name LuteosErpPlanPsfatQueryList
   * @summary 列表查询
   * @request POST:/api/luteos/erp/plan/psfat/queryList
   * @response `200` `PsfatQueryListResp` OK
   */
  export namespace LuteosErpPlanPsfatQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PsfatQueryListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PsfatQueryListResp;
  }

  /**
   * No description
   * @tags 预测-自动打标管理
   * @name LuteosErpPlanPsfatSaveOrUpdate
   * @summary 新增/更新
   * @request POST:/api/luteos/erp/plan/psfat/saveOrUpdate
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpPlanPsfatSaveOrUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PsfatSaveReq;
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
   * @tags 零售预测-客户汇总管理
   * @name LuteosErpPlanPsfccChangeStatus
   * @summary 变更状态
   * @request POST:/api/luteos/erp/plan/psfcc/changeStatus
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpPlanPsfccChangeStatus {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PsfccChangeStatusReq;
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
   * @tags 零售预测-客户汇总管理
   * @name LuteosErpPlanPsfccExportFile
   * @summary 文件导出
   * @request POST:/api/luteos/erp/plan/psfcc/exportFile
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace LuteosErpPlanPsfccExportFile {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PsfccQueryListReq;
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
   * @tags 零售预测-客户汇总管理
   * @name LuteosErpPlanPsfccImportFile
   * @summary 文件导入
   * @request POST:/api/luteos/erp/plan/psfcc/importFile
   * @response `200` `ImportDataResp` OK
   */
  export namespace LuteosErpPlanPsfccImportFile {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UploadReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ImportDataResp;
  }

  /**
   * No description
   * @tags 零售预测-客户汇总管理
   * @name LuteosErpPlanPsfccQueryList
   * @summary 列表查询
   * @request POST:/api/luteos/erp/plan/psfcc/queryList
   * @response `200` `PsfccQueryListResp` OK
   */
  export namespace LuteosErpPlanPsfccQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PsfccQueryListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PsfccQueryListResp;
  }

  /**
   * No description
   * @tags 零售预测-客户汇总管理
   * @name LuteosErpPlanPsfccSaveOrUpdate
   * @summary 新增/更新
   * @request POST:/api/luteos/erp/plan/psfcc/saveOrUpdate
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpPlanPsfccSaveOrUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PsfccSaveReq;
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
   * @tags 预测-商品匹配管理
   * @name LuteosErpPlanPsfpcChangeStatus
   * @summary 变更状态
   * @request POST:/api/luteos/erp/plan/psfpc/changeStatus
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpPlanPsfpcChangeStatus {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PsfpcChangeStatusReq;
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
   * @tags 预测-商品匹配管理
   * @name LuteosErpPlanPsfpcDownTemplate
   * @summary 下载批量导入模板(导出)
   * @request POST:/api/luteos/erp/plan/psfpc/downTemplate
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosErpPlanPsfpcDownTemplate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PsfpcQueryListReq;
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
   * @tags 预测-商品匹配管理
   * @name LuteosErpPlanPsfpcQueryList
   * @summary 列表查询
   * @request POST:/api/luteos/erp/plan/psfpc/queryList
   * @response `200` `PsfpcQueryListResp` OK
   */
  export namespace LuteosErpPlanPsfpcQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PsfpcQueryListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PsfpcQueryListResp;
  }

  /**
   * No description
   * @tags 预测-商品匹配管理
   * @name LuteosErpPlanPsfpcSaveOrUpdate
   * @summary 新增/更新
   * @request POST:/api/luteos/erp/plan/psfpc/saveOrUpdate
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpPlanPsfpcSaveOrUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PsfpcSaveReq;
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
   * @tags 预测-商品匹配管理
   * @name LuteosErpPlanPsfpcUpload
   * @summary 批量导入
   * @request POST:/api/luteos/erp/plan/psfpc/upload
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpPlanPsfpcUpload {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UploadReq;
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
   * @tags 预测-策略管理
   * @name LuteosErpPlanPsfsChangeStatus
   * @summary 变更状态
   * @request POST:/api/luteos/erp/plan/psfs/changeStatus
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpPlanPsfsChangeStatus {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PsfsChangeStatusReq;
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
   * @tags 预测-策略管理
   * @name LuteosErpPlanPsfsQueryList
   * @summary 列表查询
   * @request POST:/api/luteos/erp/plan/psfs/queryList
   * @response `200` `PsfsQueryListResp` OK
   */
  export namespace LuteosErpPlanPsfsQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PsfsQueryListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PsfsQueryListResp;
  }

  /**
   * No description
   * @tags 预测-策略管理
   * @name LuteosErpPlanPsfsSaveOrUpdate
   * @summary 新增/更新
   * @request POST:/api/luteos/erp/plan/psfs/saveOrUpdate
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpPlanPsfsSaveOrUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PsfsSaveReq;
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
   * @tags 预测-SKU汇总配置
   * @name LuteosErpPlanPsfssChangeStatus
   * @summary 变更状态
   * @request POST:/api/luteos/erp/plan/psfss/changeStatus
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosErpPlanPsfssChangeStatus {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PsfssChangeStatusReq;
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
   * @tags 预测-SKU汇总配置
   * @name LuteosErpPlanPsfssDownTemplate
   * @summary 下载批量导入模板(导出)
   * @request POST:/api/luteos/erp/plan/psfss/downTemplate
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosErpPlanPsfssDownTemplate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PsfssQueryListReq;
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
   * @tags 预测-SKU汇总配置
   * @name LuteosErpPlanPsfssExportFile
   * @summary 文件导出
   * @request POST:/api/luteos/erp/plan/psfss/exportFile
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosErpPlanPsfssExportFile {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PsfssQueryListReq;
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
   * @tags 预测-SKU汇总配置
   * @name LuteosErpPlanPsfssQueryList
   * @summary 列表查询
   * @request POST:/api/luteos/erp/plan/psfss/queryList
   * @response `200` `PsfssQueryListResp` OK
   */
  export namespace LuteosErpPlanPsfssQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PsfssQueryListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PsfssQueryListResp;
  }

  /**
   * No description
   * @tags 预测-SKU汇总配置
   * @name LuteosErpPlanPsfssSaveOrUpdate
   * @summary 新增或者编辑
   * @request POST:/api/luteos/erp/plan/psfss/saveOrUpdate
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpPlanPsfssSaveOrUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PsfssSaveOrUpdateReq;
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
   * @tags 预测-SKU汇总配置
   * @name LuteosErpPlanPsfssUpload
   * @summary 批量导入
   * @request POST:/api/luteos/erp/plan/psfss/upload
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpPlanPsfssUpload {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UploadReq;
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
   * @tags 预测-标签管理
   * @name LuteosErpPlanPsftChangeStatus
   * @summary 变更状态
   * @request POST:/api/luteos/erp/plan/psft/changeStatus
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosErpPlanPsftChangeStatus {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PsftChangeStatusReq;
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
   * @tags 预测-标签管理
   * @name LuteosErpPlanPsftQueryList
   * @summary 列表查询
   * @request POST:/api/luteos/erp/plan/psft/queryList
   * @response `200` `PsftQueryListResp` OK
   */
  export namespace LuteosErpPlanPsftQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PsftQueryListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PsftQueryListResp;
  }

  /**
   * No description
   * @tags 预测-标签管理
   * @name LuteosErpPlanPsftQueryOptionList
   * @summary 列表下拉查询
   * @request POST:/api/luteos/erp/plan/psft/queryOptionList
   * @response `200` `PsftQueryOptionListResp` OK
   */
  export namespace LuteosErpPlanPsftQueryOptionList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PsftOptionReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PsftQueryOptionListResp;
  }

  /**
   * No description
   * @tags 预测-标签管理
   * @name LuteosErpPlanPsftSaveOrUpdate
   * @summary 新增/更新
   * @request POST:/api/luteos/erp/plan/psft/saveOrUpdate
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosErpPlanPsftSaveOrUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PsftSaveReq;
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
   * @tags 发货指令
   * @name LuteosErpPlanShipCommandDownTemplate
   * @summary 下载上传模板
   * @request GET:/api/luteos/erp/plan/ship/command/downTemplate
   * @deprecated
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosErpPlanShipCommandDownTemplate {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 渠道 */
      channel?: string;
      /** 预计到货结束时间时间: yyyy-MM-dd */
      estimateArriveTimeEnd?: string;
      /** 预计到货开始时间: yyyy-MM-dd */
      estimateArriveTimeStart?: string;
      /** 编码/原平台标识/产品名称/商品SKU */
      keyword?: string;
      /** 运营人员编码 */
      operatorCode?: string;
      /** 计划人员编码 */
      plannerCode?: string;
      /** 站点 */
      site?: string;
      statusList?: number[];
      /**
       * 上传类型 1-批量发货 2-批量更新
       * @format int32
       */
      type?: number;
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
   * @tags 发货指令
   * @name LuteosErpPlanShipCommandLockCommand
   * @summary 锁定、解锁、作废接口
   * @request POST:/api/luteos/erp/plan/ship/command/lockCommand
   * @deprecated
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosErpPlanShipCommandLockCommand {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlanShipCommandUpdateStatusReq;
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
   * @tags 发货指令
   * @name LuteosErpPlanShipCommandQueryDetailList
   * @summary 发货指令详情
   * @request GET:/api/luteos/erp/plan/ship/command/queryDetailList
   * @deprecated
   * @response `200` `PlanShipCommandDetailResp` OK
   */
  export namespace LuteosErpPlanShipCommandQueryDetailList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 指令编码 */
      commandCode?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PlanShipCommandDetailResp;
  }

  /**
   * No description
   * @tags 发货指令
   * @name LuteosErpPlanShipCommandQueryList
   * @summary 发货指令查询
   * @request GET:/api/luteos/erp/plan/ship/command/queryList
   * @deprecated
   * @response `200` `PlanShipCommandListQueryResp` OK
   */
  export namespace LuteosErpPlanShipCommandQueryList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 渠道 */
      channel?: string;
      /**
       * 发货状态 NULL-全部 0-待发货 1-已发货 2-作废 3-锁定 4-更新中
       * @format int32
       */
      commandStatus?: number;
      /** 编码/原平台标识/产品名称/商品SKU */
      keyword?: string;
      /** 运营人员编码 */
      operatorCode?: string;
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
      /** 计划人员编码 */
      plannerCode?: string;
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
    export type ResponseBody = PlanShipCommandListQueryResp;
  }

  /**
   * No description
   * @tags 发货指令
   * @name LuteosErpPlanShipCommandQueryShipMaxQty
   * @summary 发货指令-获取最大发货数量
   * @request GET:/api/luteos/erp/plan/ship/command/queryShipMaxQty
   * @deprecated
   * @response `200` `PlanShipCommandSupplyQtyResp` OK
   */
  export namespace LuteosErpPlanShipCommandQueryShipMaxQty {
    export type RequestParams = {};
    export type RequestQuery = {
      /** supplySku */
      supplySku?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PlanShipCommandSupplyQtyResp;
  }

  /**
   * No description
   * @tags 发货指令
   * @name LuteosErpPlanShipCommandQuerySupplySkuList
   * @summary 发货指令-供应链SKU列表
   * @request GET:/api/luteos/erp/plan/ship/command/querySupplySkuList
   * @deprecated
   * @response `200` `PlanShipCommandSupplyQueryResp` OK
   */
  export namespace LuteosErpPlanShipCommandQuerySupplySkuList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** skuCode */
      skuCode?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PlanShipCommandSupplyQueryResp;
  }

  /**
   * No description
   * @tags 发货指令
   * @name LuteosErpPlanShipCommandSave
   * @summary 新增发货指令
   * @request POST:/api/luteos/erp/plan/ship/command/save
   * @deprecated
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosErpPlanShipCommandSave {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlanShipCommandSaveReq;
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
   * @tags 发货指令
   * @name LuteosErpPlanShipCommandShip
   * @summary 发货接口
   * @request POST:/api/luteos/erp/plan/ship/command/ship
   * @deprecated
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosErpPlanShipCommandShip {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlanShipCommandShipReq;
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
   * @tags 发货指令
   * @name LuteosErpPlanShipCommandUpload
   * @summary 批量发货、更新
   * @request POST:/api/luteos/erp/plan/ship/command/upload
   * @deprecated
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosErpPlanShipCommandUpload {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlanCommandShipUploadReq;
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
   * @tags 发货指令-V2
   * @name LuteosErpPlanShipCommandV2DownTemplate
   * @summary 发货指令-下载上传模板
   * @request GET:/api/luteos/erp/plan/ship/command/v2/downTemplate
   * @response `200` `void` OK
   */
  export namespace LuteosErpPlanShipCommandV2DownTemplate {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 渠道 */
      channel?: string;
      /** 预计到货结束时间时间: yyyy-MM-dd */
      estimateArriveTimeEnd?: string;
      /** 预计到货开始时间: yyyy-MM-dd */
      estimateArriveTimeStart?: string;
      /** 编码/原平台标识/产品名称/商品SKU */
      keyword?: string;
      /** 运营人员编码 */
      operatorCode?: string;
      /** 计划人员编码 */
      plannerCode?: string;
      /** 站点 */
      site?: string;
      statusList?: number[];
      /**
       * 上传类型 1-批量发货 2-批量更新
       * @format int32
       */
      type?: number;
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
   * @tags 发货指令-V2
   * @name LuteosErpPlanShipCommandV2LockCommand
   * @summary 发货指令-锁定、解锁、作废
   * @request POST:/api/luteos/erp/plan/ship/command/v2/lockCommand
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpPlanShipCommandV2LockCommand {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlanShipCommandUpdateStatusReq;
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
   * @tags 发货指令-V2
   * @name LuteosErpPlanShipCommandV2Modify
   * @summary 发货指令-编辑
   * @request POST:/api/luteos/erp/plan/ship/command/v2/modify
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpPlanShipCommandV2Modify {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlanShipCommandUpdateV2Req;
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
   * @tags 发货指令-V2
   * @name LuteosErpPlanShipCommandV2QueryDetail
   * @summary 发货指令-详情
   * @request GET:/api/luteos/erp/plan/ship/command/v2/queryDetail
   * @response `200` `PlanShipCommandDetailQueryV2Resp` OK
   */
  export namespace LuteosErpPlanShipCommandV2QueryDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** commandCode */
      commandCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PlanShipCommandDetailQueryV2Resp;
  }

  /**
   * No description
   * @tags 发货指令-V2
   * @name LuteosErpPlanShipCommandV2QueryList
   * @summary 发货指令-列表查询
   * @request GET:/api/luteos/erp/plan/ship/command/v2/queryList
   * @response `200` `PlanShipCommandListQueryV2Resp` OK
   */
  export namespace LuteosErpPlanShipCommandV2QueryList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 渠道 */
      channel?: string;
      /**
       * 发货状态 NULL-全部 0-待发货 1-已发货 2-作废 3-锁定 4-更新中
       * @format int32
       */
      commandStatus?: number;
      /** 发货状态 NULL-全部 0-待发货 1-已发货 2-作废 3-锁定 4-更新中 */
      commandStatusList?: number[];
      /** 预计到货结束时间时间: yyyy-MM-dd */
      estimateArriveTimeEnd?: string;
      /** 预计到货开始时间: yyyy-MM-dd */
      estimateArriveTimeStart?: string;
      /** 预计发货结束时间时间: yyyy-MM-dd */
      estimateShipTimeEnd?: string;
      /** 预计发货开始时间: yyyy-MM-dd */
      estimateShipTimeStart?: string;
      /** 编码/原平台标识/产品名称/商品SKU */
      keyword?: string;
      /** 运营人员编码 */
      operatorCode?: string;
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
      /** 计划人员编码 */
      plannerCode?: string;
      /** 发货结束时间时间: yyyy-MM-dd */
      shipDateEnd?: string;
      /** 发货开始时间: yyyy-MM-dd */
      shipDateStart?: string;
      /** 发货方式 1-中仓直发  2-工厂直发 */
      shipMethod?: string;
      /** 站点 */
      site?: string;
      /** 供应商code */
      supplierCode?: string;
      /** 待提货 */
      waitPick?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PlanShipCommandListQueryV2Resp;
  }

  /**
   * No description
   * @tags 发货指令-V2
   * @name LuteosErpPlanShipCommandV2QuerySelectPlanList
   * @summary 发货指令-查询下拉列表
   * @request GET:/api/luteos/erp/plan/ship/command/v2/querySelectPlanList
   * @response `200` `PlanShipCommandSelectPlanListQueryResp` OK
   */
  export namespace LuteosErpPlanShipCommandV2QuerySelectPlanList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 过滤掉有计划单号的数据 */
      filterHasPlanCode?: boolean;
      /** 编码 */
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
    export type ResponseBody = PlanShipCommandSelectPlanListQueryResp;
  }

  /**
   * No description
   * @tags 发货指令-V2
   * @name LuteosErpPlanShipCommandV2QueryShipMaxQty
   * @summary 发货指令-获取最大发货数量
   * @request GET:/api/luteos/erp/plan/ship/command/v2/queryShipMaxQty
   * @response `200` `PlanShipCommandSupplyQtyResp` OK
   */
  export namespace LuteosErpPlanShipCommandV2QueryShipMaxQty {
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
    export type ResponseBody = PlanShipCommandSupplyQtyResp;
  }

  /**
   * No description
   * @tags 发货指令-V2
   * @name LuteosErpPlanShipCommandV2QuerySupplySkuList
   * @summary 发货指令-供应链SKU列表
   * @request GET:/api/luteos/erp/plan/ship/command/v2/querySupplySkuList
   * @response `200` `PlanShipCommandSupplyQueryV2Resp` OK
   */
  export namespace LuteosErpPlanShipCommandV2QuerySupplySkuList {
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
    export type ResponseBody = PlanShipCommandSupplyQueryV2Resp;
  }

  /**
   * No description
   * @tags 发货指令-V2
   * @name LuteosErpPlanShipCommandV2Save
   * @summary 发货指令-新增
   * @request POST:/api/luteos/erp/plan/ship/command/v2/save
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpPlanShipCommandV2Save {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlanShipCommandSaveV2Req;
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
   * @tags 发货指令-V2
   * @name LuteosErpPlanShipCommandV2Upload
   * @summary 发货指令-批量发货、更新
   * @request POST:/api/luteos/erp/plan/ship/command/v2/upload
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosErpPlanShipCommandV2Upload {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlanCommandShipUploadReq;
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
   * @tags 货件管理
   * @name LuteosErpPlanShipmentQueryList
   * @summary 货件管理-列表查询
   * @request POST:/api/luteos/erp/plan/shipment/queryList
   * @deprecated
   * @response `200` `PlanShipmentListQueryResp` OK
   */
  export namespace LuteosErpPlanShipmentQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlanShipmentListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PlanShipmentListQueryResp;
  }

  /**
   * No description
   * @tags 货件管理
   * @name LuteosErpPlanShipmentQuerySelectPlanList
   * @summary 货件管理-查询下拉列表
   * @request GET:/api/luteos/erp/plan/shipment/querySelectPlanList
   * @deprecated
   * @response `200` `PlanShipmentSelectPlanListQueryResp` OK
   */
  export namespace LuteosErpPlanShipmentQuerySelectPlanList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 过滤掉已被绑定的计划单号数据 */
      filterHasPlanCode?: boolean;
      /** 计划单号/货件单号/跟踪单号/发货仓/目的仓代码 */
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
    export type ResponseBody = PlanShipmentSelectPlanListQueryResp;
  }

  /**
   * No description
   * @tags 货件管理
   * @name LuteosErpPlanShipmentSave
   * @summary 发货指令-发货
   * @request POST:/api/luteos/erp/plan/shipment/save
   * @deprecated
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpPlanShipmentSave {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlanShipmentSaveV2Req;
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
   * @tags 供应周期
   * @name LuteosErpPlanSupplyCycleDownTemplate
   * @summary 下载批量导入模板(导出)
   * @request POST:/api/luteos/erp/plan/supply/cycle/downTemplate
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosErpPlanSupplyCycleDownTemplate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlanSupplyCycleListQueryReq;
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
   * @tags 供应周期
   * @name LuteosErpPlanSupplyCycleQueryList
   * @summary 供应周期查询
   * @request GET:/api/luteos/erp/plan/supply/cycle/queryList
   * @response `200` `PlanSupplyCycleListQueryResp` OK
   */
  export namespace LuteosErpPlanSupplyCycleQueryList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 分类 */
      categoryCode?: string;
      /** 渠道 */
      channel?: string;
      /** 国家 */
      country?: string;
      /** 供应链SKU/商品SKU/产品名称 */
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
      /** 计划人员编码 */
      plannerCode?: string;
      /** 三级分类编码 */
      thirdCategoryCode?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PlanSupplyCycleListQueryResp;
  }

  /**
   * No description
   * @tags 供应周期
   * @name LuteosErpPlanSupplyCycleQueryPlatfromSkuIdentify
   * @summary 原平台标识查询
   * @request GET:/api/luteos/erp/plan/supply/cycle/queryPlatfromSkuIdentify
   * @response `200` `CommonRespListString` OK
   */
  export namespace LuteosErpPlanSupplyCycleQueryPlatfromSkuIdentify {
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
   * @tags 供应周期
   * @name LuteosErpPlanSupplyCycleQuerySupplySku
   * @summary 供应链SKU查询
   * @request GET:/api/luteos/erp/plan/supply/cycle/querySupplySku
   * @response `200` `CommonRespListString` OK
   */
  export namespace LuteosErpPlanSupplyCycleQuerySupplySku {
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
   * @tags 供应周期
   * @name LuteosErpPlanSupplyCycleSave
   * @summary 供应周期保存
   * @request POST:/api/luteos/erp/plan/supply/cycle/save
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpPlanSupplyCycleSave {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlanSuppluCycleSaveReq;
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
   * @tags 供应周期
   * @name LuteosErpPlanSupplyCycleUpload
   * @summary 批量导入
   * @request POST:/api/luteos/erp/plan/supply/cycle/upload
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpPlanSupplyCycleUpload {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UploadReq;
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
   * @tags 周转管理, 备货调整-批量更新状态
   * @name LuteosErpPlanTurnoverBatchUpdateStatus
   * @summary 批量更新状态
   * @request POST:/api/luteos/erp/plan/turnover/batchUpdateStatus
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosErpPlanTurnoverBatchUpdateStatus {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlanTurnoverConfirmStatusReq[];
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
   * @tags 周转天数, 周转管理
   * @name LuteosErpPlanTurnoverCalcuTurnDayList
   * @summary 周转天数列表计算
   * @request POST:/api/luteos/erp/plan/turnover/calcuTurnDayList
   * @response `200` `CommonRespPlanTurnOverCacuBean` OK
   */
  export namespace LuteosErpPlanTurnoverCalcuTurnDayList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlanTurnOverCacuBean;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespPlanTurnOverCacuBean;
  }

  /**
   * No description
   * @tags 周转天数, 周转管理
   * @name LuteosErpPlanTurnoverCanRefresh
   * @summary 周转-是否能手动刷新
   * @request POST:/api/luteos/erp/plan/turnover/can/refresh
   * @response `200` `CommonRespBoolean` OK
   */
  export namespace LuteosErpPlanTurnoverCanRefresh {
    export type RequestParams = {};
    export type RequestQuery = {};
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
   * @tags 周转天数, 周转管理
   * @name LuteosErpPlanTurnoverExportList
   * @summary 周转详情列表导出
   * @request POST:/api/luteos/erp/plan/turnover/exportList
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosErpPlanTurnoverExportList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlanTurnOverListQueryReq;
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
   * @tags 周转管理
   * @name LuteosErpPlanTurnoverGetTurnOverLogList
   * @summary 获取周转变更日志
   * @request GET:/api/luteos/erp/plan/turnover/getTurnOverLogList
   * @response `200` `CommonRespListOperationLogBean` OK
   */
  export namespace LuteosErpPlanTurnoverGetTurnOverLogList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 周转单号 */
      code: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespListOperationLogBean;
  }

  /**
   * No description
   * @tags 周转物流, 周转管理
   * @name LuteosErpPlanTurnoverLogisticsQueryList
   * @summary 物流方式列表查询
   * @request GET:/api/luteos/erp/plan/turnover/logistics/queryList
   * @response `200` `PlanTurnOverLogisticsQueryResp` OK
   */
  export namespace LuteosErpPlanTurnoverLogisticsQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PlanTurnOverLogisticsQueryResp;
  }

  /**
   * No description
   * @tags 周转物流, 周转管理
   * @name LuteosErpPlanTurnoverLogisticsQueryListForSku
   * @summary 物流方式列表查询(SKU基础配置)
   * @request GET:/api/luteos/erp/plan/turnover/logistics/queryListForSku
   * @response `200` `PlanTurnOverLogisticsQueryResp` OK
   */
  export namespace LuteosErpPlanTurnoverLogisticsQueryListForSku {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PlanTurnOverLogisticsQueryResp;
  }

  /**
   * No description
   * @tags 周转物流, 周转管理
   * @name LuteosErpPlanTurnoverLogisticsSave
   * @summary 物流方式保存
   * @request POST:/api/luteos/erp/plan/turnover/logistics/save
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosErpPlanTurnoverLogisticsSave {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlanTurnOverLogisticsSaveReq;
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
   * @tags 周转管理
   * @name LuteosErpPlanTurnoverManualSnapOnWay
   * @summary 手动同步在途在制
   * @request POST:/api/luteos/erp/plan/turnover/manualSnapOnWay
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosErpPlanTurnoverManualSnapOnWay {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlanTurnoverRefreshReq[];
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
   * @tags 周转管理
   * @name LuteosErpPlanTurnoverManualSyncForecast
   * @summary 手动同步销量预测
   * @request POST:/api/luteos/erp/plan/turnover/manualSyncForecast
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosErpPlanTurnoverManualSyncForecast {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlanTurnoverRefreshReq[];
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
   * @tags 周转天数, 周转管理
   * @name LuteosErpPlanTurnoverQueryDetail
   * @summary 周转天数详情
   * @request GET:/api/luteos/erp/plan/turnover/queryDetail
   * @response `200` `PlanTurnOverDetailQueryResp` OK
   */
  export namespace LuteosErpPlanTurnoverQueryDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 编码 */
      code: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PlanTurnOverDetailQueryResp;
  }

  /**
   * No description
   * @tags 周转天数, 周转管理
   * @name LuteosErpPlanTurnoverQueryList
   * @summary 周转天数列表查询
   * @request POST:/api/luteos/erp/plan/turnover/queryList
   * @response `200` `PlanTurnOverListQueryResp` OK
   */
  export namespace LuteosErpPlanTurnoverQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlanTurnOverListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PlanTurnOverListQueryResp;
  }

  /**
   * No description
   * @tags 周转管理, 查询备货时效详情
   * @name LuteosErpPlanTurnoverQueryStockTimeDetails
   * @summary 查询备货时效详情
   * @request POST:/api/luteos/erp/plan/turnover/queryStockTimeDetails
   * @response `200` `StockingTimeDetailsQueryResp` OK
   */
  export namespace LuteosErpPlanTurnoverQueryStockTimeDetails {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = StockingTimeDetailsQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = StockingTimeDetailsQueryResp;
  }

  /**
   * No description
   * @tags 周转管理, 查询备货时效列表
   * @name LuteosErpPlanTurnoverQueryStockTimeList
   * @summary 查询备货时效列表
   * @request POST:/api/luteos/erp/plan/turnover/queryStockTimeList
   * @response `200` `StockingTimeListQueryResp` OK
   */
  export namespace LuteosErpPlanTurnoverQueryStockTimeList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = StockingTimeListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = StockingTimeListQueryResp;
  }

  /**
   * No description
   * @tags 周转天数, 周转管理
   * @name LuteosErpPlanTurnoverQueryStrategyDetail
   * @summary 周转天数策略详情
   * @request GET:/api/luteos/erp/plan/turnover/queryStrategyDetail
   * @response `200` `PlanTurnoverStrategyBean` OK
   */
  export namespace LuteosErpPlanTurnoverQueryStrategyDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 编码 */
      code: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PlanTurnoverStrategyBean;
  }

  /**
   * No description
   * @tags 周转管理
   * @name LuteosErpPlanTurnoverQueryuploadAutoPackTemplate
   * @summary 获取上传自动装箱模板
   * @request GET:/api/luteos/erp/plan/turnover/queryuploadAutoPackTemplate
   * @response `200` `ImportTemplateQueryResp` OK
   */
  export namespace LuteosErpPlanTurnoverQueryuploadAutoPackTemplate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ImportTemplateQueryResp;
  }

  /**
   * No description
   * @tags 周转天数, 周转管理
   * @name LuteosErpPlanTurnoverRefresh
   * @summary 周转-刷新
   * @request POST:/api/luteos/erp/plan/turnover/refresh
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpPlanTurnoverRefresh {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
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
   * @tags 周转天数, 周转管理
   * @name LuteosErpPlanTurnoverSaveCalcuTurnDayList
   * @summary 周转天数列表计算-保存
   * @request POST:/api/luteos/erp/plan/turnover/saveCalcuTurnDayList
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosErpPlanTurnoverSaveCalcuTurnDayList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlanTurnOverCacuBean[];
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
   * @tags 周转管理, 备货调整列表导出
   * @name LuteosErpPlanTurnoverStockListExport
   * @summary 备货调整列表导出
   * @request POST:/api/luteos/erp/plan/turnover/stockListExport
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosErpPlanTurnoverStockListExport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlanTurnOverListQueryReq;
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
   * @tags 周转管理, 备货调整列表导入
   * @name LuteosErpPlanTurnoverStockListImport
   * @summary 备货调整列表导入
   * @request POST:/api/luteos/erp/plan/turnover/stockListImport
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpPlanTurnoverStockListImport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlanTurnOverListImportReq;
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
   * @tags 周转管理, 备货时效保存更新
   * @name LuteosErpPlanTurnoverStockingTimeSaveOrUpdate
   * @summary 备货时效保存更新
   * @request POST:/api/luteos/erp/plan/turnover/stockingTime/saveOrUpdate
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosErpPlanTurnoverStockingTimeSaveOrUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = StockingTimeSaveReq;
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
   * @tags 周转天数, 周转管理
   * @name LuteosErpPlanTurnoverStrategySave
   * @summary 周转策略保存
   * @request POST:/api/luteos/erp/plan/turnover/strategy/save
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosErpPlanTurnoverStrategySave {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlanTurnoverStrategySaveReq;
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
   * @tags 周转管理
   * @name LuteosErpPlanTurnoverStrategyTemplateChangeStatus
   * @summary 周转策略模板变更状态
   * @request POST:/api/luteos/erp/plan/turnover/strategy/template/changeStatus
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpPlanTurnoverStrategyTemplateChangeStatus {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PsfatChangeStatusReq;
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
   * @tags 周转策略模板, 周转管理
   * @name LuteosErpPlanTurnoverStrategyTemplateQueryAllList
   * @summary 所有周转策略模板查询
   * @request GET:/api/luteos/erp/plan/turnover/strategy/template/queryAllList
   * @response `200` `CommonRespListPlanTurnoverStrategyTemplateBean` OK
   */
  export namespace LuteosErpPlanTurnoverStrategyTemplateQueryAllList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespListPlanTurnoverStrategyTemplateBean;
  }

  /**
   * No description
   * @tags 周转策略模板, 周转管理
   * @name LuteosErpPlanTurnoverStrategyTemplateQueryDefault
   * @summary 查询默认周转策略模板
   * @request GET:/api/luteos/erp/plan/turnover/strategy/template/queryDefault
   * @response `200` `PlanTurnoverStrategyTemplateBean` OK
   */
  export namespace LuteosErpPlanTurnoverStrategyTemplateQueryDefault {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PlanTurnoverStrategyTemplateBean;
  }

  /**
   * No description
   * @tags 周转策略模板, 周转管理
   * @name LuteosErpPlanTurnoverStrategyTemplateQueryList
   * @summary 周转策略模板查询
   * @request GET:/api/luteos/erp/plan/turnover/strategy/template/queryList
   * @response `200` `PlanTurnOverStrategyTemplateListQueryResp` OK
   */
  export namespace LuteosErpPlanTurnoverStrategyTemplateQueryList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 编码 */
      code?: string;
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
    export type ResponseBody = PlanTurnOverStrategyTemplateListQueryResp;
  }

  /**
   * No description
   * @tags 周转策略模板, 周转管理
   * @name LuteosErpPlanTurnoverStrategyTemplateSave
   * @summary 周转策略模板编辑保存
   * @request POST:/api/luteos/erp/plan/turnover/strategy/template/save
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpPlanTurnoverStrategyTemplateSave {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlanTurnoverStrategyTemplateSaveReq;
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
   * @tags 周转管理
   * @name LuteosErpPlanTurnoverUploadAutoPack
   * @summary 上传自动装箱
   * @request POST:/api/luteos/erp/plan/turnover/uploadAutoPack
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpPlanTurnoverUploadAutoPack {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UploadReq;
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
   * @tags ERP平台模块
   * @name LuteosErpPlatformRefresh
   * @summary 业务模块-手动刷新
   * @request POST:/api/luteos/erp/platform/refresh
   * @response `200` `CommonRespBoolean` OK
   */
  export namespace LuteosErpPlatformRefresh {
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
   * @tags ERP-PO单
   * @name LuteosErpPoClose
   * @summary 关闭PO单
   * @request POST:/api/luteos/erp/po/close
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosErpPoClose {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ErpPoCloseReq;
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
   * @tags ERP-PO单
   * @name LuteosErpPoSync
   * @summary 同步PO单
   * @request POST:/api/luteos/erp/po/sync
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosErpPoSync {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ErpPoSyncReq;
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
   * @tags ERP-申购单
   * @name LuteosErpPrAbandon
   * @summary 作废
   * @request POST:/api/luteos/erp/pr/abandon
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpPrAbandon {
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
    export type ResponseBody = CommonResp;
  }

  /**
   * No description
   * @tags ERP-申购单
   * @name LuteosErpPrAnalysisDetail
   * @summary 解析批量修改产品明细模板
   * @request POST:/api/luteos/erp/pr/analysis/detail
   * @response `200` `CommonRespListPrDownDetailItemReq` OK
   */
  export namespace LuteosErpPrAnalysisDetail {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UploadReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespListPrDownDetailItemReq;
  }

  /**
   * No description
   * @tags ERP-申购单
   * @name LuteosErpPrAuth
   * @summary 审核
   * @request POST:/api/luteos/erp/pr/auth
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpPrAuth {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PrAuthReq;
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
   * @tags ERP-申购单
   * @name LuteosErpPrDownUpdateDetail
   * @summary 下载批量修改产品明细模板
   * @request POST:/api/luteos/erp/pr/downUpdateDetail
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosErpPrDownUpdateDetail {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PrDownDetailItemReq[];
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
   * @tags ERP-申购单
   * @name LuteosErpPrDownloadList
   * @summary 下载Pr单
   * @request POST:/api/luteos/erp/pr/downloadList
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace LuteosErpPrDownloadList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PrListQueryReq;
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
   * @tags ERP-申购单
   * @name LuteosErpPrQueryDetail
   * @summary 查询详情
   * @request GET:/api/luteos/erp/pr/queryDetail
   * @response `200` `PrDetailQueryResp` OK
   */
  export namespace LuteosErpPrQueryDetail {
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
    export type ResponseBody = PrDetailQueryResp;
  }

  /**
   * No description
   * @tags ERP-申购单
   * @name LuteosErpPrQueryList
   * @summary 查询列表
   * @request POST:/api/luteos/erp/pr/queryList
   * @response `200` `PrListQueryResp` OK
   */
  export namespace LuteosErpPrQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PrListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PrListQueryResp;
  }

  /**
   * No description
   * @tags ERP-申购单
   * @name LuteosErpPrSave
   * @summary 新增
   * @request POST:/api/luteos/erp/pr/save
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosErpPrSave {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PrSaveResp;
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
   * @tags ERP-申购单
   * @name LuteosErpPrUpdate
   * @summary 编辑
   * @request POST:/api/luteos/erp/pr/update
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosErpPrUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PrSaveResp;
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
   * @tags 报价单
   * @name LuteosErpQuotationAbandon
   * @summary 作废
   * @request POST:/api/luteos/erp/quotation/abandon
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpQuotationAbandon {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = QuotationOrderAbandonReq;
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
   * @tags 报价单
   * @name LuteosErpQuotationAuth
   * @summary 审核
   * @request POST:/api/luteos/erp/quotation/auth
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpQuotationAuth {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = QuotationOrderAuthReq;
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
   * @tags 报价单
   * @name LuteosErpQuotationDownTemplate
   * @summary 下载批量新增上传模板
   * @request POST:/api/luteos/erp/quotation/downTemplate
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosErpQuotationDownTemplate {
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
   * @tags 报价单
   * @name LuteosErpQuotationDownload
   * @summary 导出报价单
   * @request POST:/api/luteos/erp/quotation/download
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosErpQuotationDownload {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = QuotationOrderListReq;
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
   * @tags 报价定价策略
   * @name LuteosErpQuotationPriceDownTemplate
   * @summary 下载上传模板
   * @request POST:/api/luteos/erp/quotation/price/downTemplate
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosErpQuotationPriceDownTemplate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = QuotationPriceListReq;
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
   * @tags 报价定价策略
   * @name LuteosErpQuotationPriceGetSuggestPrice
   * @summary 获取建议售价
   * @request GET:/api/luteos/erp/quotation/price/getSuggestPrice
   * @response `200` `SuggestPriceResp` OK
   */
  export namespace LuteosErpQuotationPriceGetSuggestPrice {
    export type RequestParams = {};
    export type RequestQuery = {
      /** currencyCode */
      currencyCode: string;
      /** customerCode */
      customerCode?: string;
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
    export type ResponseBody = SuggestPriceResp;
  }

  /**
   * No description
   * @tags 报价定价策略
   * @name LuteosErpQuotationPriceGetSuggestPrice2
   * @summary 获取建议售价批量
   * @request POST:/api/luteos/erp/quotation/price/getSuggestPrice
   * @originalName luteosErpQuotationPriceGetSuggestPrice
   * @duplicate
   * @response `200` `Record<string,SuggestPriceResp>` OK
   */
  export namespace LuteosErpQuotationPriceGetSuggestPrice2 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SuggestPriceReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = Record<string, SuggestPriceResp>;
  }

  /**
   * No description
   * @tags 报价定价策略
   * @name LuteosErpQuotationPriceQueryList
   * @summary 报价单列表查询
   * @request POST:/api/luteos/erp/quotation/price/queryList
   * @response `200` `QuotationPriceListResp` OK
   */
  export namespace LuteosErpQuotationPriceQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = QuotationPriceListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = QuotationPriceListResp;
  }

  /**
   * No description
   * @tags 报价定价策略
   * @name LuteosErpQuotationPriceSaveOrUpdate
   * @summary 新增/编辑
   * @request POST:/api/luteos/erp/quotation/price/saveOrUpdate
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpQuotationPriceSaveOrUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = QuotationPriceSaveReq;
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
   * @tags 报价定价策略
   * @name LuteosErpQuotationPriceUpload
   * @summary 上传定价
   * @request POST:/api/luteos/erp/quotation/price/upload
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpQuotationPriceUpload {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UploadReq;
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
   * @tags 报价单
   * @name LuteosErpQuotationQueryDetail
   * @summary 详情
   * @request GET:/api/luteos/erp/quotation/queryDetail
   * @response `200` `QuotationOrderDetailResp` OK
   */
  export namespace LuteosErpQuotationQueryDetail {
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
    export type ResponseBody = QuotationOrderDetailResp;
  }

  /**
   * No description
   * @tags 报价单
   * @name LuteosErpQuotationQueryList
   * @summary 列表查询
   * @request POST:/api/luteos/erp/quotation/queryList
   * @response `200` `QuotationOrderListResp` OK
   */
  export namespace LuteosErpQuotationQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = QuotationOrderListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = QuotationOrderListResp;
  }

  /**
   * No description
   * @tags 报价单
   * @name LuteosErpQuotationSaveOrUpdate
   * @summary 新增/保存
   * @request POST:/api/luteos/erp/quotation/saveOrUpdate
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosErpQuotationSaveOrUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = QuotationOrderSaveReq;
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
   * @tags 报价单
   * @name LuteosErpQuotationUpload
   * @summary 上传批量新新增
   * @request POST:/api/luteos/erp/quotation/upload
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpQuotationUpload {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UploadReq;
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
   * @tags ERP-订单-税率配置
   * @name LuteosErpRateCfgChangeStatus
   * @summary 变更状态
   * @request POST:/api/luteos/erp/rate/cfg/changeStatus
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpRateCfgChangeStatus {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ErpOrderRateCfgChangeStatusReq;
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
   * @tags ERP-订单-税率配置
   * @name LuteosErpRateCfgChooseRateCfg
   * @summary 选择汇率
   * @request POST:/api/luteos/erp/rate/cfg/chooseRateCfg
   * @response `200` `ErpOrderRateCfgListQueryRespItem` OK
   */
  export namespace LuteosErpRateCfgChooseRateCfg {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ErpOrderRateCfgChooseBean;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ErpOrderRateCfgListQueryRespItem;
  }

  /**
   * No description
   * @tags ERP-订单-税率配置
   * @name LuteosErpRateCfgDownTemplate
   * @summary 下载批量导入模板(导出)
   * @request POST:/api/luteos/erp/rate/cfg/downTemplate
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosErpRateCfgDownTemplate {
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
   * @tags ERP-订单-税率配置
   * @name LuteosErpRateCfgExport
   * @summary 导出
   * @request POST:/api/luteos/erp/rate/cfg/export
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace LuteosErpRateCfgExport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ErpOrderRateCfgListQueryReq;
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
   * @tags ERP-订单-税率配置
   * @name LuteosErpRateCfgQueryList
   * @summary 查询列表
   * @request POST:/api/luteos/erp/rate/cfg/queryList
   * @response `200` `ErpOrderRateCfgListQueryResp` OK
   */
  export namespace LuteosErpRateCfgQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ErpOrderRateCfgListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ErpOrderRateCfgListQueryResp;
  }

  /**
   * No description
   * @tags ERP-订单-税率配置
   * @name LuteosErpRateCfgUpload
   * @summary 批量导入
   * @request POST:/api/luteos/erp/rate/cfg/upload
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpRateCfgUpload {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UploadReq;
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
   * @tags 移仓订单
   * @name LuteosErpRemovalAbandon
   * @summary 移仓单作废
   * @request POST:/api/luteos/erp/removal/abandon
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosErpRemovalAbandon {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = RemovalBatchReq;
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
   * @tags 移仓订单
   * @name LuteosErpRemovalApply
   * @summary 移仓单审核
   * @request POST:/api/luteos/erp/removal/apply
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosErpRemovalApply {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = RemovalBatchReq;
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
   * @tags 移仓订单
   * @name LuteosErpRemovalDetail
   * @summary 移仓单详情
   * @request GET:/api/luteos/erp/removal/detail
   * @response `200` `CommonRespRemovalDetailBean` OK
   */
  export namespace LuteosErpRemovalDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 移仓单号 */
      orderId: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespRemovalDetailBean;
  }

  /**
   * No description
   * @tags 移仓订单
   * @name LuteosErpRemovalExport
   * @summary 导出
   * @request POST:/api/luteos/erp/removal/export
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosErpRemovalExport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = QueryRemovalReq;
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
   * @tags 移仓订单
   * @name LuteosErpRemovalManualSync
   * @summary 手动同步
   * @request POST:/api/luteos/erp/removal/manualSync
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosErpRemovalManualSync {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = RemovalBatchReq;
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
   * @tags 移仓订单
   * @name LuteosErpRemovalPush
   * @summary 移仓单推送
   * @request POST:/api/luteos/erp/removal/push
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosErpRemovalPush {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = RemovalBatchReq;
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
   * @tags 移仓订单
   * @name LuteosErpRemovalQueryList
   * @summary 移仓单分页查询
   * @request POST:/api/luteos/erp/removal/queryList
   * @response `200` `RemovalPageResp` OK
   */
  export namespace LuteosErpRemovalQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = QueryRemovalReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = RemovalPageResp;
  }

  /**
   * No description
   * @tags 移仓订单
   * @name LuteosErpRemovalSaveOrUpdate
   * @summary 新增/修改移仓单
   * @request POST:/api/luteos/erp/removal/saveOrUpdate
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosErpRemovalSaveOrUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = RemovalSaveReq;
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
   * @tags ERP-退货入库单
   * @name LuteosErpReoSync
   * @summary 同步退货入库单
   * @request POST:/api/luteos/erp/reo/sync
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosErpReoSync {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ErpReoSyncReq;
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
   * @tags 需求建议
   * @name LuteosErpRequirementSugguestAutoSaveNew
   * @summary 更新需求
   * @request POST:/api/luteos/erp/requirement/sugguest/autoSaveNew
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosErpRequirementSugguestAutoSaveNew {
    export type RequestParams = {};
    export type RequestQuery = {};
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
   * @tags 需求建议
   * @name LuteosErpRequirementSugguestExportDetail
   * @summary 导出需求建议详情
   * @request POST:/api/luteos/erp/requirement/sugguest/exportDetail
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosErpRequirementSugguestExportDetail {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = RequirementSugguestExportResp;
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
   * @tags 需求建议
   * @name LuteosErpRequirementSugguestExportInventorySnapshot
   * @summary 导出库存快照
   * @request POST:/api/luteos/erp/requirement/sugguest/exportInventorySnapshot
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosErpRequirementSugguestExportInventorySnapshot {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = InventorySnaoshotReq;
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
   * @tags 需求建议
   * @name LuteosErpRequirementSugguestQueryCurrentList
   * @summary 查询当前需求
   * @request POST:/api/luteos/erp/requirement/sugguest/queryCurrentList
   * @response `200` `RequirementSugguestCurrentQueryResp` OK
   */
  export namespace LuteosErpRequirementSugguestQueryCurrentList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = RequirementSugguestCurrentQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = RequirementSugguestCurrentQueryResp;
  }

  /**
   * No description
   * @tags 需求建议
   * @name LuteosErpRequirementSugguestQueryDetail
   * @summary 需求建议详情
   * @request GET:/api/luteos/erp/requirement/sugguest/queryDetail
   * @response `200` `RequirementSugguestDetailQueryResp` OK
   */
  export namespace LuteosErpRequirementSugguestQueryDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** code */
      code: string;
      /** 关键字 */
      keyword?: string;
      /** 计划人 */
      planer?: string;
      /**
       * 1-正数 0-负数 -1-0
       * @format int32
       */
      plus?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = RequirementSugguestDetailQueryResp;
  }

  /**
   * No description
   * @tags 需求建议
   * @name LuteosErpRequirementSugguestQueryList
   * @summary 需求建议查询
   * @request GET:/api/luteos/erp/requirement/sugguest/queryList
   * @response `200` `RequirementSugguestListQueryResp` OK
   */
  export namespace LuteosErpRequirementSugguestQueryList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 操作结束时间: yyyy-MM-dd */
      createTimeEnd?: string;
      /** 操作开始时间: yyyy-MM-dd */
      createTimeStart?: string;
      /** 需求建议名称/需求建议编码 */
      keyword?: string;
      /** 操作人 */
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = RequirementSugguestListQueryResp;
  }

  /**
   * No description
   * @tags 需求建议
   * @name LuteosErpRequirementSugguestSave
   * @summary 需求建议新增
   * @request POST:/api/luteos/erp/requirement/sugguest/save
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosErpRequirementSugguestSave {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = RequirementSugguestSaveReq;
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
   * @tags 零售预测
   * @name LuteosErpRetailSaleForecastAuditQueryDetail
   * @summary 销售预测变更审核详情--预测审核列表如果type=2用这个接口查详情
   * @request GET:/api/luteos/erp/retail/sale/forecast/audit/queryDetail
   * @response `200` `RetailSalesForecastAuditDetailV2Resp` OK
   */
  export namespace LuteosErpRetailSaleForecastAuditQueryDetail {
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
    export type ResponseBody = RetailSalesForecastAuditDetailV2Resp;
  }

  /**
   * No description
   * @tags 零售预测
   * @name LuteosErpRetailSaleForecastAuditUpdate
   * @summary 销售预测审核重新提交情--预测审核列表如果type=2用这个接口编辑重新提交
   * @request POST:/api/luteos/erp/retail/sale/forecast/audit/update
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpRetailSaleForecastAuditUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = RetailSalesForecastUpdateSubmitReq;
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
   * @tags 零售预测
   * @name LuteosErpRetailSaleForecastAuditHistory
   * @summary 预测行-预测历史
   * @request POST:/api/luteos/erp/retail/sale/forecast/auditHistory
   * @response `200` `SalesForecastAuditHistoryQueryResp` OK
   */
  export namespace LuteosErpRetailSaleForecastAuditHistory {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = RetailSalesForecastAuditHistoryQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SalesForecastAuditHistoryQueryResp;
  }

  /**
   * No description
   * @tags 零售预测
   * @name LuteosErpRetailSaleForecastBatchChangeStatus
   * @summary 批量-预测更新状态
   * @request POST:/api/luteos/erp/retail/sale/forecast/batchChangeStatus
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpRetailSaleForecastBatchChangeStatus {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BatchSalesForecastWeekChangeStatusReq;
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
   * @tags 零售预测
   * @name LuteosErpRetailSaleForecastExportSaveSkuTemplate
   * @summary 下载批量添加商品模版
   * @request POST:/api/luteos/erp/retail/sale/forecast/exportSaveSkuTemplate
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpRetailSaleForecastExportSaveSkuTemplate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
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
   * @tags 零售预测
   * @name LuteosErpRetailSaleForecastExportTemplate
   * @summary 导出数据(批量更新模版)
   * @request POST:/api/luteos/erp/retail/sale/forecast/exportTemplate
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosErpRetailSaleForecastExportTemplate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = RetailSalesForecastListQueryV2Req;
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
   * @tags 零售预测
   * @name LuteosErpRetailSaleForecastQueryAllAddSkuList
   * @summary 查询所有新增的sku预测
   * @request GET:/api/luteos/erp/retail/sale/forecast/queryAllAddSkuList
   * @response `200` `(RetailSalesForecastSaveSkuReqItem)[]` OK
   */
  export namespace LuteosErpRetailSaleForecastQueryAllAddSkuList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = RetailSalesForecastSaveSkuReqItem[];
  }

  /**
   * No description
   * @tags 零售预测
   * @name LuteosErpRetailSaleForecastQueryList
   * @summary 销售预测列表
   * @request POST:/api/luteos/erp/retail/sale/forecast/queryList
   * @response `200` `RetailSalesForecastListQueryV2Resp` OK
   */
  export namespace LuteosErpRetailSaleForecastQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = RetailSalesForecastListQueryV2Req;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = RetailSalesForecastListQueryV2Resp;
  }

  /**
   * No description
   * @tags 零售预测
   * @name LuteosErpRetailSaleForecastQuerySalesList
   * @summary 获取销量统计列表
   * @request POST:/api/luteos/erp/retail/sale/forecast/querySalesList
   * @response `200` `RetailSalesStatisticsResp` OK
   */
  export namespace LuteosErpRetailSaleForecastQuerySalesList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = RetailSalesStatisticsReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = RetailSalesStatisticsResp;
  }

  /**
   * No description
   * @tags 零售预测
   * @name LuteosErpRetailSaleForecastSaveSkus
   * @summary 添加商品预测
   * @request POST:/api/luteos/erp/retail/sale/forecast/saveSkus
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpRetailSaleForecastSaveSkus {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = RetailSalesForecastSaveSkuReq;
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
   * @tags 零售预测
   * @name LuteosErpRetailSaleForecastSnapHistory
   * @summary 查询快照历史
   * @request POST:/api/luteos/erp/retail/sale/forecast/snapHistory
   * @response `200` `SalesForecastSnapHistoryQueryResp` OK
   */
  export namespace LuteosErpRetailSaleForecastSnapHistory {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SalesForecastSnapHistoryQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SalesForecastSnapHistoryQueryResp;
  }

  /**
   * No description
   * @tags 零售预测
   * @name LuteosErpRetailSaleForecastUpdateAndSubmit
   * @summary 批量更新销量预测
   * @request POST:/api/luteos/erp/retail/sale/forecast/updateAndSubmit
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpRetailSaleForecastUpdateAndSubmit {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = RetailSalesForecastUpdateSubmitReq;
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
   * @tags 零售预测
   * @name LuteosErpRetailSaleForecastUpload
   * @summary 上传销量预测
   * @request POST:/api/luteos/erp/retail/sale/forecast/upload
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpRetailSaleForecastUpload {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UploadReq;
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
   * @tags 零售预测
   * @name LuteosErpRetailSaleForecastUploadSaveSku
   * @summary 上传批量添加商品
   * @request POST:/api/luteos/erp/retail/sale/forecast/uploadSaveSku
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpRetailSaleForecastUploadSaveSku {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UploadReq;
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
   * @tags 售后预测
   * @name LuteosErpSaleAfterForecastExportAfterSalesList
   * @summary 导出售后销量统计列表
   * @request POST:/api/luteos/erp/sale/after/forecast/exportAfterSalesList
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosErpSaleAfterForecastExportAfterSalesList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AfterSalesStatisticsReq;
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
   * @tags 售后预测
   * @name LuteosErpSaleAfterForecastQuerySalesList
   * @summary 获取售后销量统计列表
   * @request POST:/api/luteos/erp/sale/after/forecast/querySalesList
   * @response `200` `SalesStatisticsResp` OK
   */
  export namespace LuteosErpSaleAfterForecastQuerySalesList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AfterSalesStatisticsReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SalesStatisticsResp;
  }

  /**
   * No description
   * @tags 销售订单
   * @name LuteosErpSaleExport
   * @summary 亚马逊导出销量统计列表
   * @request POST:/api/luteos/erp/sale/export
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosErpSaleExport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SalesOrderStatisticsReq;
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
   * @tags 销量预测
   * @name LuteosErpSaleForecastChangeStatus
   * @summary 销量预测更新状态
   * @request POST:/api/luteos/erp/sale/forecast/changeStatus
   * @deprecated
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpSaleForecastChangeStatus {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SalesForecastWeekChangeStatusReq;
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
   * @tags 销量预测
   * @name LuteosErpSaleForecastDownTemplate
   * @summary 下载上传模板
   * @request POST:/api/luteos/erp/sale/forecast/downTemplate
   * @deprecated
   * @response `200` `void` OK
   */
  export namespace LuteosErpSaleForecastDownTemplate {
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
   * @tags 销量预测
   * @name LuteosErpSaleForecastLogQueryDetail
   * @summary 销量预测日志详情
   * @request GET:/api/luteos/erp/sale/forecast/log/queryDetail
   * @deprecated
   * @response `200` `SalesForecastLogDetailQueryResp` OK
   */
  export namespace LuteosErpSaleForecastLogQueryDetail {
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
    export type ResponseBody = SalesForecastLogDetailQueryResp;
  }

  /**
   * No description
   * @tags 销量预测
   * @name LuteosErpSaleForecastLogQueryList
   * @summary 销量预测日志查询
   * @request GET:/api/luteos/erp/sale/forecast/log/queryList
   * @deprecated
   * @response `200` `SalesForecastLogListQueryResp` OK
   */
  export namespace LuteosErpSaleForecastLogQueryList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 上传时间: yyyy-MM-dd hh:mm:ss */
      createTimeEnd?: string;
      /** 上传时间: yyyy-MM-dd hh:mm:ss */
      createTimeStart?: string;
      /** 文件名称/编码 */
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
       * 上传状态：0-上传失败 1-处理中 2-上传成功
       * @format int32
       */
      status?: number;
      /** 更新者 */
      updater?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SalesForecastLogListQueryResp;
  }

  /**
   * No description
   * @tags 销量预测
   * @name LuteosErpSaleForecastQueryAllList
   * @summary 销量预测所有下拉查询
   * @request GET:/api/luteos/erp/sale/forecast/queryAllList
   * @deprecated
   * @response `200` `(SalesForecastAllListQueryResp)[]` OK
   */
  export namespace LuteosErpSaleForecastQueryAllList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SalesForecastAllListQueryResp[];
  }

  /**
   * No description
   * @tags 销量预测
   * @name LuteosErpSaleForecastQueryList
   * @summary 销量预测查询
   * @request GET:/api/luteos/erp/sale/forecast/queryList
   * @deprecated
   * @response `200` `SalesForecastListQueryResp` OK
   */
  export namespace LuteosErpSaleForecastQueryList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 渠道 */
      channel?: string;
      /** 站点 */
      country?: string;
      /** 原平台标识/产品名称 */
      keyword?: string;
      /** 运营人 */
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
      /** 计划 */
      planer?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SalesForecastListQueryResp;
  }

  /**
   * No description
   * @tags 销量预测
   * @name LuteosErpSaleForecastSaveWeek
   * @summary 销量预测保存
   * @request POST:/api/luteos/erp/sale/forecast/saveWeek
   * @deprecated
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpSaleForecastSaveWeek {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SalesForecastWeekSaveReq;
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
   * @tags 销量预测
   * @name LuteosErpSaleForecastUpload
   * @summary 上传销量预测
   * @request POST:/api/luteos/erp/sale/forecast/upload
   * @deprecated
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpSaleForecastUpload {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UploadReq;
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
   * @tags 销量预测V2
   * @name LuteosErpSaleForecastV2Audit
   * @summary 销售预测变更审核
   * @request POST:/api/luteos/erp/sale/forecast/v2/audit
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpSaleForecastV2Audit {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ErpAuditReq;
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
   * @tags 销量预测V2
   * @name LuteosErpSaleForecastV2AuditAbandon
   * @summary 销售预测审核作废
   * @request DELETE:/api/luteos/erp/sale/forecast/v2/audit/abandon
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpSaleForecastV2AuditAbandon {
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
    export type ResponseBody = CommonResp;
  }

  /**
   * No description
   * @tags 销量预测V2
   * @name LuteosErpSaleForecastV2AuditQueryDetail
   * @summary 销售预测变更审核详情
   * @request GET:/api/luteos/erp/sale/forecast/v2/audit/queryDetail
   * @response `200` `SalesForecastAuditDetailV2Resp` OK
   */
  export namespace LuteosErpSaleForecastV2AuditQueryDetail {
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
    export type ResponseBody = SalesForecastAuditDetailV2Resp;
  }

  /**
   * No description
   * @tags 销量预测V2
   * @name LuteosErpSaleForecastV2AuditQueryList
   * @summary 销售预测变更审核列表查询
   * @request POST:/api/luteos/erp/sale/forecast/v2/audit/queryList
   * @response `200` `SalesForecastAuditQueryResp` OK
   */
  export namespace LuteosErpSaleForecastV2AuditQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SalesForecastAuditQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SalesForecastAuditQueryResp;
  }

  /**
   * No description
   * @tags 销量预测V2
   * @name LuteosErpSaleForecastV2AuditUpdate
   * @summary 销售预测审核重新提交
   * @request POST:/api/luteos/erp/sale/forecast/v2/audit/update
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpSaleForecastV2AuditUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SalesForecastUpdateSubmitReq;
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
   * @tags 销量预测V2
   * @name LuteosErpSaleForecastV2AuditHistory
   * @summary 审核历史
   * @request POST:/api/luteos/erp/sale/forecast/v2/auditHistory
   * @response `200` `SalesForecastAuditHistoryQueryResp` OK
   */
  export namespace LuteosErpSaleForecastV2AuditHistory {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SalesForecastAuditHistoryQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SalesForecastAuditHistoryQueryResp;
  }

  /**
   * No description
   * @tags 销量预测V2
   * @name LuteosErpSaleForecastV2BatchChangeStatus
   * @summary 批量销量预测更新状态
   * @request POST:/api/luteos/erp/sale/forecast/v2/batchChangeStatus
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpSaleForecastV2BatchChangeStatus {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BatchSalesForecastWeekChangeStatusReq;
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
   * @tags 销量预测V2
   * @name LuteosErpSaleForecastV2ChangeStatus
   * @summary 销量预测更新状态
   * @request POST:/api/luteos/erp/sale/forecast/v2/changeStatus
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpSaleForecastV2ChangeStatus {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SalesForecastWeekChangeStatusReq;
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
   * @tags 销量预测V2
   * @name LuteosErpSaleForecastV2ClearSort
   * @summary 清除排序
   * @request POST:/api/luteos/erp/sale/forecast/v2/clear/sort
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpSaleForecastV2ClearSort {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SaleClearSortReq;
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
   * @tags 销量预测V2
   * @name LuteosErpSaleForecastV2DownAddTemplate
   * @summary 下载上传批量添加模板
   * @request POST:/api/luteos/erp/sale/forecast/v2/downAddTemplate
   * @response `200` `void` OK
   */
  export namespace LuteosErpSaleForecastV2DownAddTemplate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SaleForecastUploadReq;
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
   * @tags 销量预测V2
   * @name LuteosErpSaleForecastV2DownTemplate
   * @summary 下载上传模板
   * @request POST:/api/luteos/erp/sale/forecast/v2/downTemplate
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosErpSaleForecastV2DownTemplate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SalesForecastListQueryV2Req;
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
   * @tags 销量预测V2
   * @name LuteosErpSaleForecastV2DownTemplateV1
   * @summary 下载上传模板V1-泛欧合并
   * @request POST:/api/luteos/erp/sale/forecast/v2/downTemplateV1
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosErpSaleForecastV2DownTemplateV1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SalesForecastListQueryV2Req;
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
   * @tags 销量预测V2
   * @name LuteosErpSaleForecastV2ExportSalesList
   * @summary 导出销量统计列表
   * @request POST:/api/luteos/erp/sale/forecast/v2/exportSalesList
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosErpSaleForecastV2ExportSalesList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SalesStatisticsReq;
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
   * @tags 销量预测V2
   * @name LuteosErpSaleForecastV2QueryList
   * @summary 销售预测列表
   * @request POST:/api/luteos/erp/sale/forecast/v2/queryList
   * @response `200` `SalesForecastListQueryV2Resp` OK
   */
  export namespace LuteosErpSaleForecastV2QueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SalesForecastListQueryV2Req;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SalesForecastListQueryV2Resp;
  }

  /**
   * No description
   * @tags 销量预测V2
   * @name LuteosErpSaleForecastV2QuerySalesList
   * @summary 获取销量统计列表
   * @request POST:/api/luteos/erp/sale/forecast/v2/querySalesList
   * @response `200` `SalesStatisticsResp` OK
   */
  export namespace LuteosErpSaleForecastV2QuerySalesList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SalesStatisticsReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SalesStatisticsResp;
  }

  /**
   * No description
   * @tags 销量预测V2
   * @name LuteosErpSaleForecastV2RefreshListingOperatorCache
   * @summary 更新在线商品运营人员缓存
   * @request DELETE:/api/luteos/erp/sale/forecast/v2/refreshListingOperatorCache
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpSaleForecastV2RefreshListingOperatorCache {
    export type RequestParams = {};
    export type RequestQuery = {
      /** version */
      version: string;
    };
    export type RequestBody = never;
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
   * @tags 销量预测V2
   * @name LuteosErpSaleForecastV2Save
   * @summary 添加商品预测
   * @request POST:/api/luteos/erp/sale/forecast/v2/save
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpSaleForecastV2Save {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SalesForecastSaveReq[];
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
   * @tags 销量预测V2
   * @name LuteosErpSaleForecastV2SnapHistory
   * @summary 快照历史
   * @request POST:/api/luteos/erp/sale/forecast/v2/snapHistory
   * @response `200` `SalesForecastSnapHistoryQueryResp` OK
   */
  export namespace LuteosErpSaleForecastV2SnapHistory {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SalesForecastSnapHistoryQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SalesForecastSnapHistoryQueryResp;
  }

  /**
   * No description
   * @tags 销量预测V2
   * @name LuteosErpSaleForecastV2UpdateAndSubmit
   * @summary 批量更新销量预测
   * @request POST:/api/luteos/erp/sale/forecast/v2/updateAndSubmit
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpSaleForecastV2UpdateAndSubmit {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SalesForecastUpdateSubmitReq;
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
   * @tags 销量预测V2
   * @name LuteosErpSaleForecastV2Upload
   * @summary 上传销量预测
   * @request POST:/api/luteos/erp/sale/forecast/v2/upload
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpSaleForecastV2Upload {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SaleForecastUploadReq;
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
   * @tags 销量预测V2
   * @name LuteosErpSaleForecastV2UploadAddTemplate
   * @summary 上传批量添加
   * @request POST:/api/luteos/erp/sale/forecast/v2/uploadAddTemplate
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpSaleForecastV2UploadAddTemplate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SaleForecastUploadReq;
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
   * @tags 销量预测V2
   * @name LuteosErpSaleForecastV2UploadCheckOperator
   * @summary 上传销量预测--校验运营人
   * @request POST:/api/luteos/erp/sale/forecast/v2/uploadCheckOperator
   * @response `200` `CommonRespListString` OK
   */
  export namespace LuteosErpSaleForecastV2UploadCheckOperator {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SaleForecastUploadReq;
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
   * @tags 销量预测V2
   * @name LuteosErpSaleForecastV2UploadSort
   * @summary 上传销量预测排序
   * @request POST:/api/luteos/erp/sale/forecast/v2/uploadSort
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpSaleForecastV2UploadSort {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SaleForecastUploadReq;
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
   * @tags 销售订单
   * @name LuteosErpSaleQuerySalesList
   * @summary 获取销量统计列表
   * @request POST:/api/luteos/erp/sale/querySalesList
   * @response `200` `SalesOrderStaticsResp` OK
   */
  export namespace LuteosErpSaleQuerySalesList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SalesOrderStatisticsReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SalesOrderStaticsResp;
  }

  /**
   * No description
   * @tags 货件管理-V3
   * @name LuteosErpShipmentExportFbaList
   * @summary FBA货件列表查询-导出
   * @request POST:/api/luteos/erp/shipment/exportFbaList
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosErpShipmentExportFbaList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ErpFbaShipmentListQueryReq;
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
   * @tags 货件管理-V3
   * @name LuteosErpShipmentExportJjList
   * @summary 积加列表查询-导出
   * @request POST:/api/luteos/erp/shipment/exportJjList
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosErpShipmentExportJjList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ErpJjTransfeQueryReq;
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
   * @tags 货件管理-V3
   * @name LuteosErpShipmentPushOverSeaList
   * @summary 货件-推送兴运
   * @request POST:/api/luteos/erp/shipment/pushOverSeaList
   * @response `200` `CommonRespOrderBatchAuthResp` OK
   */
  export namespace LuteosErpShipmentPushOverSeaList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ErpShipmentListPushXyReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespOrderBatchAuthResp;
  }

  /**
   * No description
   * @tags 货件管理-V3
   * @name LuteosErpShipmentQueryFbaList
   * @summary FBA货件列表查询
   * @request POST:/api/luteos/erp/shipment/queryFbaList
   * @response `200` `ErpFbaShipmentListQueryResp` OK
   */
  export namespace LuteosErpShipmentQueryFbaList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ErpFbaShipmentListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ErpFbaShipmentListQueryResp;
  }

  /**
   * No description
   * @tags 货件管理-V3
   * @name LuteosErpShipmentQueryFbaSendList
   * @summary FBA发货单列表
   * @request POST:/api/luteos/erp/shipment/queryFbaSendList
   * @response `200` `ErpFbaSendListQueryResp` OK
   */
  export namespace LuteosErpShipmentQueryFbaSendList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ErpFbaSendListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ErpFbaSendListQueryResp;
  }

  /**
   * No description
   * @tags 货件管理-V3
   * @name LuteosErpShipmentQueryOverSeaList
   * @summary 海外仓货件列表查询
   * @request POST:/api/luteos/erp/shipment/queryOverSeaList
   * @response `200` `ErpOverSeaShipmentListQueryResp` OK
   */
  export namespace LuteosErpShipmentQueryOverSeaList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ErpOverSeaShipmentListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ErpOverSeaShipmentListQueryResp;
  }

  /**
   * No description
   * @tags 产品SN入库
   * @name LuteosErpSnInboundExportList
   * @summary 列表导出
   * @request POST:/api/luteos/erp/sn/inbound/exportList
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosErpSnInboundExportList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductSnInboundQueryListReq;
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
   * @tags 产品SN入库
   * @name LuteosErpSnInboundList
   * @summary 列表查询
   * @request POST:/api/luteos/erp/sn/inbound/list
   * @response `200` `ProductSnInboundQueryListResp` OK
   */
  export namespace LuteosErpSnInboundList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductSnInboundQueryListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ProductSnInboundQueryListResp;
  }

  /**
   * No description
   * @tags 产品SN出库
   * @name LuteosErpSnOutboundBatchDeleted
   * @summary 批量删除
   * @request POST:/api/luteos/erp/sn/outbound/batchDeleted
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosErpSnOutboundBatchDeleted {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductSnOutboundDeletedListReq;
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
   * @tags 产品SN出库
   * @name LuteosErpSnOutboundBatchSaveOutBound
   * @summary 批量保存
   * @request POST:/api/luteos/erp/sn/outbound/batchSaveOutBound
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpSnOutboundBatchSaveOutBound {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductSnOutboundAppSaveReq;
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
   * @tags 产品SN出库
   * @name LuteosErpSnOutboundCheckExists
   * @summary 是否存在
   * @request POST:/api/luteos/erp/sn/outbound/checkExists
   * @response `200` `ProductSnOutboundScanCheckResp` OK
   */
  export namespace LuteosErpSnOutboundCheckExists {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductSnOutboundScanCheckReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ProductSnOutboundScanCheckResp;
  }

  /**
   * No description
   * @tags 产品SN出库
   * @name LuteosErpSnOutboundExportList
   * @summary 列表导出
   * @request POST:/api/luteos/erp/sn/outbound/exportList
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosErpSnOutboundExportList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductSnOutboundQueryListReq;
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
   * @tags 产品SN出库, 导入模块
   * @name LuteosErpSnOutboundImportData
   * @summary 数据导入
   * @request POST:/api/luteos/erp/sn/outbound/importData
   * @response `200` `ImportDataResp` OK
   */
  export namespace LuteosErpSnOutboundImportData {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ImportDataReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ImportDataResp;
  }

  /**
   * No description
   * @tags 产品SN出库
   * @name LuteosErpSnOutboundList
   * @summary 列表查询
   * @request POST:/api/luteos/erp/sn/outbound/list
   * @response `200` `ProductSnOutboundQueryListResp` OK
   */
  export namespace LuteosErpSnOutboundList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductSnOutboundQueryListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ProductSnOutboundQueryListResp;
  }

  /**
   * No description
   * @tags 产品SN出库, 导入模块
   * @name LuteosErpSnOutboundQueryImportTemplate
   * @summary 获取导入模板
   * @request GET:/api/luteos/erp/sn/outbound/queryImportTemplate
   * @response `200` `ImportTemplateQueryResp` OK
   */
  export namespace LuteosErpSnOutboundQueryImportTemplate {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 场景  amazon_ticket-亚马逊券码导入 product_spu-商品spu导入 product_sku-商品sku导入 platform_sku-映射sku导入 ly_order-领用订单导入 */
      importScene: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ImportTemplateQueryResp;
  }

  /**
   * No description
   * @tags 产品SN出库
   * @name LuteosErpSnOutboundQueryScanList
   * @summary app查询列表
   * @request POST:/api/luteos/erp/sn/outbound/queryScanList
   * @response `200` `ProductSnOutboundScanQueryResp` OK
   */
  export namespace LuteosErpSnOutboundQueryScanList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductSnOutboundScanQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ProductSnOutboundScanQueryResp;
  }

  /**
   * No description
   * @tags 备货设置-SKU配置
   * @name LuteosErpSpSkuConfigDownTemplate
   * @summary 下载批量导入模板(导出)
   * @request POST:/api/luteos/erp/sp/sku/config/downTemplate
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosErpSpSkuConfigDownTemplate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SpSkuConfigQueryReq;
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
   * @tags 备货设置-SKU配置
   * @name LuteosErpSpSkuConfigQueryList
   * @summary 列表查询
   * @request POST:/api/luteos/erp/sp/sku/config/queryList
   * @response `200` `SpSkuConfigQueryResp` OK
   */
  export namespace LuteosErpSpSkuConfigQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SpSkuConfigQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SpSkuConfigQueryResp;
  }

  /**
   * No description
   * @tags 备货设置-SKU配置
   * @name LuteosErpSpSkuConfigSaveOrUpdate
   * @summary 新增编辑
   * @request POST:/api/luteos/erp/sp/sku/config/saveOrUpdate
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpSpSkuConfigSaveOrUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SpSkuConfigSaveReq;
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
   * @tags 备货设置-SKU配置
   * @name LuteosErpSpSkuConfigUpload
   * @summary 批量导入
   * @request POST:/api/luteos/erp/sp/sku/config/upload
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpSpSkuConfigUpload {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UploadReq;
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
   * @tags SRM-供应商主数据
   * @name LuteosErpSrmSupplierMasterExportList
   * @summary 导出供应商主数据列表
   * @request POST:/api/luteos/erp/srm/supplierMaster/exportList
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace LuteosErpSrmSupplierMasterExportList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SupplierMasterDataExportReq;
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
   * @tags SRM-供应商主数据
   * @name LuteosErpSrmSupplierMasterQueryList
   * @summary 供应商主数据分页查询（字典已转义为 _dictText）
   * @request POST:/api/luteos/erp/srm/supplierMaster/queryList
   * @response `200` `SupplierMasterDataQueryResp` OK
   */
  export namespace LuteosErpSrmSupplierMasterQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SupplierMasterDataQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SupplierMasterDataQueryResp;
  }

  /**
   * No description
   * @tags SRM-供应商主数据
   * @name LuteosErpSrmSupplierMasterSupplierStatusCount
   * @summary 供应商状态数量统计（Tab），GET 无参
   * @request GET:/api/luteos/erp/srm/supplierMaster/supplierStatusCount
   * @response `200` `(SupplierStatusCountItem)[]` OK
   */
  export namespace LuteosErpSrmSupplierMasterSupplierStatusCount {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SupplierStatusCountItem[];
  }

  /**
   * No description
   * @tags 采购订单
   * @name LuteosErpSrmPurchaseExportDetailList
   * @summary 导出采购明细列表
   * @request POST:/api/luteos/erp/srmPurchase/exportDetailList
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace LuteosErpSrmPurchaseExportDetailList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PurchaseOrderItemListQueryReq;
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
   * @tags 采购订单
   * @name LuteosErpSrmPurchaseExportList
   * @summary 导出列表
   * @request POST:/api/luteos/erp/srmPurchase/exportList
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace LuteosErpSrmPurchaseExportList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PurchaseOrderListQueryReq;
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
   * @tags 采购订单
   * @name LuteosErpSrmPurchaseQueryDetailList
   * @summary 查询采购明细列表
   * @request POST:/api/luteos/erp/srmPurchase/queryDetailList
   * @response `200` `PurchaseOrderItemListQueryResp` OK
   */
  export namespace LuteosErpSrmPurchaseQueryDetailList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PurchaseOrderItemListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PurchaseOrderItemListQueryResp;
  }

  /**
   * No description
   * @tags 采购订单
   * @name LuteosErpSrmPurchaseQueryList
   * @summary 查询列表
   * @request POST:/api/luteos/erp/srmPurchase/queryList
   * @response `200` `PurchaseOrderHeadListQueryResp` OK
   */
  export namespace LuteosErpSrmPurchaseQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PurchaseOrderListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PurchaseOrderHeadListQueryResp;
  }

  /**
   * No description
   * @tags 采购订单
   * @name LuteosErpSrmPurchaseQuerySrmDictMap
   * @summary srm字典查询列表
   * @request POST:/api/luteos/erp/srmPurchase/querySrmDictMap
   * @response `200` `Record<string,Record<string,string>>` OK
   */
  export namespace LuteosErpSrmPurchaseQuerySrmDictMap {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DictQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = Record<string, Record<string, string>>;
  }

  /**
   * No description
   * @tags 采购订单
   * @name LuteosErpSrmPurchaseQuerySrmMemberList
   * @summary srm字典查询列表
   * @request POST:/api/luteos/erp/srmPurchase/querySrmMemberList
   * @response `200` `(ElsSubaccountInfo)[]` OK
   */
  export namespace LuteosErpSrmPurchaseQuerySrmMemberList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ElsSubaccountInfo[];
  }

  /**
   * No description
   * @tags ERP-第三方推送接口
   * @name LuteosErpThirdpartySrmSyncKingdee
   * @summary 从SRM推送单到金蝶
   * @request POST:/api/luteos/erp/thirdparty/srmSyncKingdee
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosErpThirdpartySrmSyncKingdee {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SrmSyncKingdeeReq;
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
   * @tags tiktok库存调整
   * @name LuteosErpTiktokStockAdjustmentDeleted
   * @summary 删除
   * @request GET:/api/luteos/erp/tiktok/stock/adjustment/deleted/{id}
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosErpTiktokStockAdjustmentDeleted {
    export type RequestParams = {
      /**
       * id
       * @format int64
       */
      id: number;
    };
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
   * @tags tiktok库存调整
   * @name LuteosErpTiktokStockAdjustmentDetail
   * @summary 明细
   * @request GET:/api/luteos/erp/tiktok/stock/adjustment/detail/{id}
   * @response `200` `CommonRespTkStockAdjustmentDetailQueryResp` OK
   */
  export namespace LuteosErpTiktokStockAdjustmentDetail {
    export type RequestParams = {
      /**
       * id
       * @format int64
       */
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespTkStockAdjustmentDetailQueryResp;
  }

  /**
   * No description
   * @tags tiktok库存调整
   * @name LuteosErpTiktokStockAdjustmentPush
   * @summary 推送
   * @request GET:/api/luteos/erp/tiktok/stock/adjustment/push/{id}
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosErpTiktokStockAdjustmentPush {
    export type RequestParams = {
      /**
       * id
       * @format int64
       */
      id: number;
    };
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
   * @tags tiktok库存调整
   * @name LuteosErpTiktokStockAdjustmentQueryList
   * @summary 列表查询
   * @request POST:/api/luteos/erp/tiktok/stock/adjustment/queryList
   * @response `200` `CommonRespTkStockAdjustmentQueryListResp` OK
   */
  export namespace LuteosErpTiktokStockAdjustmentQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TiktokStockAdjustmentQueryListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespTkStockAdjustmentQueryListResp;
  }

  /**
   * No description
   * @tags tiktok库存调整
   * @name LuteosErpTiktokStockAdjustmentQuerySkuIdInfo
   * @summary 根据sku+店铺获取skuid数据
   * @request POST:/api/luteos/erp/tiktok/stock/adjustment/querySkuIdInfo
   * @response `200` `CommonRespTiktokStockAdjustmentQuerySkuIdInfoResp` OK
   */
  export namespace LuteosErpTiktokStockAdjustmentQuerySkuIdInfo {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TiktokStockAdjustmentQuerySkuIdInfoReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespTiktokStockAdjustmentQuerySkuIdInfoResp;
  }

  /**
   * No description
   * @tags tiktok库存调整
   * @name LuteosErpTiktokStockAdjustmentQuerySkuInfo
   * @summary 根据仓库获取sku信息
   * @request POST:/api/luteos/erp/tiktok/stock/adjustment/querySkuInfo
   * @response `200` `CommonRespTiktokStockAdjustmentQuerySkuInfoResp` OK
   */
  export namespace LuteosErpTiktokStockAdjustmentQuerySkuInfo {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TiktokStockAdjustmentQuerySkuInfoReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespTiktokStockAdjustmentQuerySkuInfoResp;
  }

  /**
   * No description
   * @tags tiktok库存调整
   * @name LuteosErpTiktokStockAdjustmentQuerySkuShopInfo
   * @summary 根据seller sku获取店铺数据
   * @request POST:/api/luteos/erp/tiktok/stock/adjustment/querySkuShopInfo
   * @response `200` `CommonRespTiktokStockAdjustmentQuerySkuShopInfoResp` OK
   */
  export namespace LuteosErpTiktokStockAdjustmentQuerySkuShopInfo {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TiktokStockAdjustmentQuerySkuShopInfoReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespTiktokStockAdjustmentQuerySkuShopInfoResp;
  }

  /**
   * No description
   * @tags tiktok库存调整
   * @name LuteosErpTiktokStockAdjustmentQueryStock
   * @summary 获取即时库存
   * @request POST:/api/luteos/erp/tiktok/stock/adjustment/queryStock
   * @response `200` `CommonRespTiktokStockAdjustmentQueryStockResp` OK
   */
  export namespace LuteosErpTiktokStockAdjustmentQueryStock {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TiktokStockAdjustmentQueryStockReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespTiktokStockAdjustmentQueryStockResp;
  }

  /**
   * No description
   * @tags tiktok库存调整
   * @name LuteosErpTiktokStockAdjustmentQuerySyncStatus
   * @summary 状态
   * @request GET:/api/luteos/erp/tiktok/stock/adjustment/querySyncStatus
   * @response `200` `CommonRespTiktokStockAdjustmentSyncStatusResp` OK
   */
  export namespace LuteosErpTiktokStockAdjustmentQuerySyncStatus {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespTiktokStockAdjustmentSyncStatusResp;
  }

  /**
   * No description
   * @tags tiktok库存调整
   * @name LuteosErpTiktokStockAdjustmentSaveOrUpdate
   * @summary 新增或修改
   * @request POST:/api/luteos/erp/tiktok/stock/adjustment/saveOrUpdate
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosErpTiktokStockAdjustmentSaveOrUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TiktokStockAdjustmentSaveReq;
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
   * @tags 头程物流V2
   * @name LuteosErpV2FirstLogisticsAddDownTemplate
   * @summary 头程-下载批量新增模板
   * @request POST:/api/luteos/erp/v2/firstLogistics/add/downTemplate
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosErpV2FirstLogisticsAddDownTemplate {
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
   * @tags 头程物流V2
   * @name LuteosErpV2FirstLogisticsAddUpload
   * @summary 头程-批量新增
   * @request POST:/api/luteos/erp/v2/firstLogistics/add/upload
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosErpV2FirstLogisticsAddUpload {
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
   * @tags 头程物流V2
   * @name LuteosErpV2FirstLogisticsAddUploadOther
   * @summary 头程-批量上传(三方)
   * @request POST:/api/luteos/erp/v2/firstLogistics/add/uploadOther
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosErpV2FirstLogisticsAddUploadOther {
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
   * @tags 头程物流V2
   * @name LuteosErpV2FirstLogisticsDelete
   * @summary 头程-删除
   * @request POST:/api/luteos/erp/v2/firstLogistics/delete
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosErpV2FirstLogisticsDelete {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FirstLogisticsCommonV2Req;
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
   * @tags 头程物流V2
   * @name LuteosErpV2FirstLogisticsDeleteAttachment
   * @summary 头程-删除附件
   * @request POST:/api/luteos/erp/v2/firstLogistics/deleteAttachment
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosErpV2FirstLogisticsDeleteAttachment {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FirstLogisticsCommonV2Req;
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
   * @tags 头程物流V2
   * @name LuteosErpV2FirstLogisticsDiffDeleteIgnore
   * @summary 差异列表-恢复记录
   * @request POST:/api/luteos/erp/v2/firstLogistics/diff/deleteIgnore
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosErpV2FirstLogisticsDiffDeleteIgnore {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FirstLogDiffIgnoreReq;
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
   * @tags 头程物流V2
   * @name LuteosErpV2FirstLogisticsDiffDownloadDiffTemplate
   * @summary 差异列表-批量更新模板下载
   * @request POST:/api/luteos/erp/v2/firstLogistics/diff/downloadDiffTemplate
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosErpV2FirstLogisticsDiffDownloadDiffTemplate {
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
   * @tags 头程物流V2
   * @name LuteosErpV2FirstLogisticsDiffIgnore
   * @summary 差异列表-忽略记录
   * @request POST:/api/luteos/erp/v2/firstLogistics/diff/ignore
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosErpV2FirstLogisticsDiffIgnore {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FirstLogDiffIgnoreReq;
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
   * @tags 头程物流V2
   * @name LuteosErpV2FirstLogisticsDiffQueryIgnoreList
   * @summary 差异列表-忽略记录列表
   * @request POST:/api/luteos/erp/v2/firstLogistics/diff/queryIgnoreList
   * @response `200` `FirstLogDiffIgnoreListResp` OK
   */
  export namespace LuteosErpV2FirstLogisticsDiffQueryIgnoreList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FirstLogDiffIgnoreListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = FirstLogDiffIgnoreListResp;
  }

  /**
   * No description
   * @tags 头程物流V2
   * @name LuteosErpV2FirstLogisticsDiffUpload
   * @summary 差异列表批量更新
   * @request POST:/api/luteos/erp/v2/firstLogistics/diff/upload
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosErpV2FirstLogisticsDiffUpload {
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
   * @tags 头程物流V2
   * @name LuteosErpV2FirstLogisticsDownloadAttachment
   * @summary 头程-下载附件
   * @request POST:/api/luteos/erp/v2/firstLogistics/downloadAttachment
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosErpV2FirstLogisticsDownloadAttachment {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FirstLogisticsCommonV2Req;
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
   * @tags 头程物流V2
   * @name LuteosErpV2FirstLogisticsExportActualDelay
   * @summary 头程-导出实际延误
   * @request POST:/api/luteos/erp/v2/firstLogistics/exportActualDelay
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosErpV2FirstLogisticsExportActualDelay {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FirstLogisticsQueryListV2Req;
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
   * @tags 头程物流V2
   * @name LuteosErpV2FirstLogisticsExportDiffList
   * @summary 差异列表-导出
   * @request POST:/api/luteos/erp/v2/firstLogistics/exportDiffList
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosErpV2FirstLogisticsExportDiffList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FirstLogDiffQueryReq;
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
   * @tags 头程物流V2
   * @name LuteosErpV2FirstLogisticsExportList
   * @summary 头程-列表导出
   * @request POST:/api/luteos/erp/v2/firstLogistics/exportList
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosErpV2FirstLogisticsExportList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FirstLogisticsQueryListV2Req;
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
   * @tags 头程物流V2
   * @name LuteosErpV2FirstLogisticsExportMaintainData
   * @summary 导出待维护数据
   * @request POST:/api/luteos/erp/v2/firstLogistics/exportMaintainData
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosErpV2FirstLogisticsExportMaintainData {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FirstLogisticsQueryListV2Req;
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
   * @tags 头程物流V2
   * @name LuteosErpV2FirstLogisticsQueryDetail
   * @summary 头程-明细
   * @request POST:/api/luteos/erp/v2/firstLogistics/queryDetail
   * @response `200` `FirstLogisticsQueryV2Resp` OK
   */
  export namespace LuteosErpV2FirstLogisticsQueryDetail {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FirstLogisticsQueryV2Req;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = FirstLogisticsQueryV2Resp;
  }

  /**
   * No description
   * @tags 头程物流V2
   * @name LuteosErpV2FirstLogisticsQueryDiffList
   * @summary 差异列表-查询
   * @request POST:/api/luteos/erp/v2/firstLogistics/queryDiffList
   * @response `200` `FirstLogisticsDiffQueryListV2Resp` OK
   */
  export namespace LuteosErpV2FirstLogisticsQueryDiffList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FirstLogDiffQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = FirstLogisticsDiffQueryListV2Resp;
  }

  /**
   * No description
   * @tags 头程物流V2
   * @name LuteosErpV2FirstLogisticsQueryList
   * @summary 头程-列表查询
   * @request POST:/api/luteos/erp/v2/firstLogistics/queryList
   * @response `200` `FirstLogisticsQueryListV2Resp` OK
   */
  export namespace LuteosErpV2FirstLogisticsQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FirstLogisticsQueryListV2Req;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = FirstLogisticsQueryListV2Resp;
  }

  /**
   * No description
   * @tags 头程物流V2
   * @name LuteosErpV2FirstLogisticsQueryOperateLog
   * @summary 头程-操作日志
   * @request POST:/api/luteos/erp/v2/firstLogistics/queryOperateLog
   * @response `200` `CommonRespListFirstLogisticsOperateLogBean` OK
   */
  export namespace LuteosErpV2FirstLogisticsQueryOperateLog {
    export type RequestParams = {};
    export type RequestQuery = {
      /** fbaId */
      fbaId: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespListFirstLogisticsOperateLogBean;
  }

  /**
   * No description
   * @tags 头程物流V2
   * @name LuteosErpV2FirstLogisticsQuerySkuDetail
   * @summary 头程-查询sku明细
   * @request POST:/api/luteos/erp/v2/firstLogistics/querySkuDetail
   * @response `200` `FirstLogisticsSkuQueryV2Resp` OK
   */
  export namespace LuteosErpV2FirstLogisticsQuerySkuDetail {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FirstLogisticsQueryV2Req;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = FirstLogisticsSkuQueryV2Resp;
  }

  /**
   * No description
   * @tags 头程物流V2
   * @name LuteosErpV2FirstLogisticsSave
   * @summary 头程-新增
   * @request POST:/api/luteos/erp/v2/firstLogistics/save
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosErpV2FirstLogisticsSave {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FirstLogisticsSaveV2Req;
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
   * @tags 头程物流V2
   * @name LuteosErpV2FirstLogisticsSaveSkuDetail
   * @summary 头程-编辑sku明细
   * @request POST:/api/luteos/erp/v2/firstLogistics/saveSkuDetail
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosErpV2FirstLogisticsSaveSkuDetail {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FirstLogisticsSkuSaveV2Req;
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
   * @tags 头程物流V2
   * @name LuteosErpV2FirstLogisticsUpdate
   * @summary 头程-修改
   * @request POST:/api/luteos/erp/v2/firstLogistics/update
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosErpV2FirstLogisticsUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FirstLogisticsUpdateV2Req;
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
   * @tags 头程物流V2
   * @name LuteosErpV2FirstLogisticsUploadAttachment
   * @summary 头程-上传附件
   * @request POST:/api/luteos/erp/v2/firstLogistics/uploadAttachment
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosErpV2FirstLogisticsUploadAttachment {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FirstLogAttachmentUploadReq;
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
   * @tags 仓库归属
   * @name LuteosErpWarehouseAffiliationAllList
   * @summary 获取所有平台
   * @request GET:/api/luteos/erp/warehouse/affiliation/allList
   * @response `200` `(DictCommonBean)[]` OK
   */
  export namespace LuteosErpWarehouseAffiliationAllList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DictCommonBean[];
  }

  /**
   * No description
   * @tags 仓库归属
   * @name LuteosErpWarehouseAffiliationChangeStatus
   * @summary 变更归属仓库状态
   * @request POST:/api/luteos/erp/warehouse/affiliation/changeStatus
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpWarehouseAffiliationChangeStatus {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = WarehouseAffiliationChangeStatusReq;
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
   * @tags 仓库归属
   * @name LuteosErpWarehouseAffiliationQueryList
   * @summary 仓库归属查询
   * @request GET:/api/luteos/erp/warehouse/affiliation/queryList
   * @response `200` `WarehouseAffiliationListQueryResp` OK
   */
  export namespace LuteosErpWarehouseAffiliationQueryList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 渠道 */
      channel?: string;
      /** 国家 */
      country?: string;
      /** 仓库名称/仓库代码 */
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
       * 归属状态: 0-开启 1-关闭
       * @format int32
       */
      status?: number;
      /**
       * 仓库类型: 本地产-2、海外仓-3、FBA-1
       * @format int32
       */
      warehouseType?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = WarehouseAffiliationListQueryResp;
  }

  /**
   * No description
   * @tags 仓库归属
   * @name LuteosErpWarehouseAffiliationQueryWarehouseList
   * @summary 仓库列表枚举查询(会排除已配置仓库)
   * @request GET:/api/luteos/erp/warehouse/affiliation/queryWarehouseList
   * @response `200` `(WarehouseAffiliationWarehouseListQueryResp)[]` OK
   */
  export namespace LuteosErpWarehouseAffiliationQueryWarehouseList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = WarehouseAffiliationWarehouseListQueryResp[];
  }

  /**
   * No description
   * @tags 仓库归属
   * @name LuteosErpWarehouseAffiliationSave
   * @summary 编辑归属仓库
   * @request POST:/api/luteos/erp/warehouse/affiliation/save
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpWarehouseAffiliationSave {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = WarehouseAffiliationSaveReq;
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
   * @tags 仓库管理-V2
   * @name LuteosErpWarehouseEditWarehouse
   * @summary 编辑仓库信息
   * @request POST:/api/luteos/erp/warehouse/editWarehouse
   * @deprecated
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpWarehouseEditWarehouse {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = WarehouseUpdateReq;
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
   * @tags 仓库管理-V2
   * @name LuteosErpWarehouseExport
   * @summary 导出
   * @request POST:/api/luteos/erp/warehouse/export
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosErpWarehouseExport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = WarehouseQueryReq;
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
   * @tags 仓库管理-V2
   * @name LuteosErpWarehouseMappingOtherWarehouse
   * @summary 关联易仓仓库映射
   * @request POST:/api/luteos/erp/warehouse/mappingOtherWarehouse
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpWarehouseMappingOtherWarehouse {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = WarehouseMappingReq;
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
   * @tags ERP-仓配订单
   * @name LuteosErpWarehouseOrderAddUpload
   * @summary 上传谷仓批量标发
   * @request POST:/api/luteos/erp/warehouse/order/add/upload
   * @response `200` `ImportDataResp` OK
   */
  export namespace LuteosErpWarehouseOrderAddUpload {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UploadReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ImportDataResp;
  }

  /**
   * No description
   * @tags ERP-仓配订单
   * @name LuteosErpWarehouseOrderAssemblePackageList
   * @summary 获取自动填写数据
   * @request POST:/api/luteos/erp/warehouse/order/assemblePackageList
   * @response `200` `CommonRespGucangPackageListResp` OK
   */
  export namespace LuteosErpWarehouseOrderAssemblePackageList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = GucangPackageListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespGucangPackageListResp;
  }

  /**
   * No description
   * @tags ERP-仓配订单
   * @name LuteosErpWarehouseOrderAttachUpload
   * @summary 批量上传订单附件
   * @request POST:/api/luteos/erp/warehouse/order/attach/upload
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpWarehouseOrderAttachUpload {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OrderUpdateUploadReq;
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
   * @tags ERP-仓配订单
   * @name LuteosErpWarehouseOrderCutAtt
   * @summary 剪裁订单附件
   * @request POST:/api/luteos/erp/warehouse/order/cutAtt
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpWarehouseOrderCutAtt {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OrderCutAttReq;
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
   * @tags ERP-仓配订单
   * @name LuteosErpWarehouseOrderCutAttBatch
   * @summary 剪裁订单附件-批量
   * @request POST:/api/luteos/erp/warehouse/order/cutAttBatch
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpWarehouseOrderCutAttBatch {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OrderCutAttBatchReq;
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
   * @tags ERP-仓配订单
   * @name LuteosErpWarehouseOrderCutGuPdf
   * @summary 剪裁谷仓调拨单PDF
   * @request POST:/api/luteos/erp/warehouse/order/cutGuPdf
   * @response `200` `UploadReq` OK
   */
  export namespace LuteosErpWarehouseOrderCutGuPdf {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UploadReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = UploadReq;
  }

  /**
   * No description
   * @tags ERP-仓配订单
   * @name LuteosErpWarehouseOrderDownMarkDeliveryTemplate
   * @summary 下载谷仓模板
   * @request POST:/api/luteos/erp/warehouse/order/downMarkDeliveryTemplate
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosErpWarehouseOrderDownMarkDeliveryTemplate {
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
   * @tags ERP-仓配订单
   * @name LuteosErpWarehouseOrderExport
   * @summary 下载
   * @request POST:/api/luteos/erp/warehouse/order/export
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace LuteosErpWarehouseOrderExport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = WarehouseOrderListQueryReq;
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
   * @tags ERP-仓配订单
   * @name LuteosErpWarehouseOrderExportFeeDetail
   * @summary 下载费用明细
   * @request POST:/api/luteos/erp/warehouse/order/exportFeeDetail
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace LuteosErpWarehouseOrderExportFeeDetail {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = WarehouseOrderListQueryReq;
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
   * @tags ERP-仓配订单
   * @name LuteosErpWarehouseOrderExportGcWarehouseService
   * @summary 下载谷仓包装信息
   * @request POST:/api/luteos/erp/warehouse/order/exportGcWarehouseService
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace LuteosErpWarehouseOrderExportGcWarehouseService {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = GuCangTransferSlipOrderBeanWarehouseService;
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
   * @tags ERP-仓配订单
   * @name LuteosErpWarehouseOrderExportReceiveDetail
   * @summary 下载领用单信息
   * @request POST:/api/luteos/erp/warehouse/order/exportReceiveDetail
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace LuteosErpWarehouseOrderExportReceiveDetail {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = WarehouseOrderListQueryReq;
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
   * @tags ERP-仓配订单
   * @name LuteosErpWarehouseOrderImportGcWarehouseService
   * @summary 导入谷仓包装信息
   * @request POST:/api/luteos/erp/warehouse/order/importGcWarehouseService
   * @response `200` `GuCangTransferSlipOrderBeanWarehouseService` OK
   */
  export namespace LuteosErpWarehouseOrderImportGcWarehouseService {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UploadReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = GuCangTransferSlipOrderBeanWarehouseService;
  }

  /**
   * No description
   * @tags ERP-仓配订单
   * @name LuteosErpWarehouseOrderMarkDelivery
   * @summary 谷仓订单-标记发货
   * @request POST:/api/luteos/erp/warehouse/order/markDelivery
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosErpWarehouseOrderMarkDelivery {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OrderMarkDeliveryReq;
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
   * @tags ERP-仓配订单
   * @name LuteosErpWarehouseOrderPushGcFba
   * @summary 推送谷仓-FBA
   * @request POST:/api/luteos/erp/warehouse/order/pushGcFba
   * @response `200` `OrderBatchAuthResp` OK
   */
  export namespace LuteosErpWarehouseOrderPushGcFba {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OrderPushGuReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = OrderBatchAuthResp;
  }

  /**
   * No description
   * @tags ERP-仓配订单
   * @name LuteosErpWarehouseOrderPushGcTransferSlipOrder
   * @summary 推送谷仓-其他调拨单
   * @request POST:/api/luteos/erp/warehouse/order/pushGcTransferSlipOrder
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpWarehouseOrderPushGcTransferSlipOrder {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = GuCangTransferSlipOrderBean;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonResp;
  }

  /**
   * @description 查询装箱板分页列表
   * @tags ERP-仓配订单
   * @name LuteosErpWarehouseOrderQueryBumperList
   * @summary 出库-仓配订单装箱板信息列表
   * @request POST:/api/luteos/erp/warehouse/order/queryBumperList
   * @response `200` `CommonRespWarehouseBumperPageResp` OK
   */
  export namespace LuteosErpWarehouseOrderQueryBumperList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = QueryWarehouseBumperReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespWarehouseBumperPageResp;
  }

  /**
   * @description 查询提货单
   * @tags ERP-仓配订单
   * @name LuteosErpWarehouseOrderQueryDeliveryOrderList
   * @summary 出库-仓配订单提货单列表
   * @request GET:/api/luteos/erp/warehouse/order/queryDeliveryOrderList
   * @response `200` `CommonRespWarehouseDeliveryOrderResp` OK
   */
  export namespace LuteosErpWarehouseOrderQueryDeliveryOrderList {
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
    export type ResponseBody = CommonRespWarehouseDeliveryOrderResp;
  }

  /**
   * No description
   * @tags ERP-仓配订单
   * @name LuteosErpWarehouseOrderQueryDetail
   * @summary 查询详情
   * @request GET:/api/luteos/erp/warehouse/order/queryDetail
   * @response `200` `WarehouseOrderDetailResp` OK
   */
  export namespace LuteosErpWarehouseOrderQueryDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** code */
      code: string;
      /** push */
      push?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = WarehouseOrderDetailResp;
  }

  /**
   * No description
   * @tags ERP-仓配订单
   * @name LuteosErpWarehouseOrderQueryList
   * @summary 查询列表
   * @request POST:/api/luteos/erp/warehouse/order/queryList
   * @response `200` `WarehouseOrderListQueryResp` OK
   */
  export namespace LuteosErpWarehouseOrderQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = WarehouseOrderListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = WarehouseOrderListQueryResp;
  }

  /**
   * @description 查询物流轨迹列表
   * @tags ERP-仓配订单
   * @name LuteosErpWarehouseOrderQueryLogisticsTrajectoryList
   * @summary 出库-仓配订单物流轨迹列表
   * @request GET:/api/luteos/erp/warehouse/order/queryLogisticsTrajectoryList
   * @response `200` `CommonRespWarehouseLogisticsTrajectoryResp` OK
   */
  export namespace LuteosErpWarehouseOrderQueryLogisticsTrajectoryList {
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
    export type ResponseBody = CommonRespWarehouseLogisticsTrajectoryResp;
  }

  /**
   * No description
   * @tags ERP-仓配订单
   * @name LuteosErpWarehouseOrderQueryPushGcTransferSlipOrderEnums
   * @summary 推送谷仓-其他调拨单-特殊枚举获取
   * @request GET:/api/luteos/erp/warehouse/order/queryPushGcTransferSlipOrderEnums
   * @response `200` `QueryPushGcTransferSlipOrderEnumsResp` OK
   */
  export namespace LuteosErpWarehouseOrderQueryPushGcTransferSlipOrderEnums {
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
    export type ResponseBody = QueryPushGcTransferSlipOrderEnumsResp;
  }

  /**
   * No description
   * @tags ERP-仓配订单
   * @name LuteosErpWarehouseOrderSaveRemark
   * @summary 保存备注
   * @request POST:/api/luteos/erp/warehouse/order/saveRemark
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosErpWarehouseOrderSaveRemark {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = WoOrderRemarkSaveReq;
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
   * @tags ERP-仓配订单
   * @name LuteosErpWarehouseOrderShippingMarkGenerate
   * @summary 批量生成箱唛
   * @request POST:/api/luteos/erp/warehouse/order/shippingMark/generate
   * @response `200` `CommonRespWoShippingMarkGenerateResp` OK
   */
  export namespace LuteosErpWarehouseOrderShippingMarkGenerate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = WoShippingMarkGenerateReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespWoShippingMarkGenerateResp;
  }

  /**
   * @description 限制10个pdf一批, 会按照传入的pdf顺序返回，但不一定每个都能解析出数据
   * @tags ERP-仓配订单
   * @name LuteosErpWarehouseOrderShippingMarkParse
   * @summary 批量解析箱唛
   * @request POST:/api/luteos/erp/warehouse/order/shippingMark/parse
   * @response `200` `CommonRespWoShippingMarkParseResp` OK
   */
  export namespace LuteosErpWarehouseOrderShippingMarkParse {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = WoShippingMarkParseReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespWoShippingMarkParseResp;
  }

  /**
   * @description 主动触发同步谷仓订单数据
   * @tags ERP-仓配订单
   * @name LuteosErpWarehouseOrderSyncGcOrderInfo
   * @summary 手动同步谷仓订单物流附件信息
   * @request POST:/api/luteos/erp/warehouse/order/syncGcOrderInfo
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosErpWarehouseOrderSyncGcOrderInfo {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SyncGcOrderInfoReq;
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
   * @tags ERP-仓配订单
   * @name LuteosErpWarehouseOrderUnbindOrderNo
   * @summary 换绑仓配单号
   * @request POST:/api/luteos/erp/warehouse/order/unbindOrderNo
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosErpWarehouseOrderUnbindOrderNo {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UnBindOrderCodeReq;
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
   * @tags ERP-仓配订单
   * @name LuteosErpWarehouseOrderUploadGuCangFile
   * @summary 推送谷仓-上传谷仓附件
   * @request POST:/api/luteos/erp/warehouse/order/uploadGuCangFile
   * @response `200` `GcUploadResp` OK
   */
  export namespace LuteosErpWarehouseOrderUploadGuCangFile {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = GcUploadReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = GcUploadResp;
  }

  /**
   * No description
   * @tags 仓库管理-V2
   * @name LuteosErpWarehouseQueryCascadeTree
   * @summary 仓库级联树（一次性返回）：前两列为分类，第三列为启用积加仓库叶子；名称搜索由前端本地过滤
   * @request GET:/api/luteos/erp/warehouse/queryCascadeTree
   * @response `200` `CommonRespListWarehouseCascadeTreeNodeResp` OK
   */
  export namespace LuteosErpWarehouseQueryCascadeTree {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespListWarehouseCascadeTreeNodeResp;
  }

  /**
   * No description
   * @tags 仓库管理-V2
   * @name LuteosErpWarehouseQueryEcWarehouseList
   * @summary 查询易仓仓库列表
   * @request GET:/api/luteos/erp/warehouse/queryEcWarehouseList
   * @response `200` `WarehouseEcBeanResp` OK
   */
  export namespace LuteosErpWarehouseQueryEcWarehouseList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = WarehouseEcBeanResp;
  }

  /**
   * No description
   * @tags 仓库管理-V2
   * @name LuteosErpWarehouseQueryEcWarehousePageList
   * @summary 查询易仓仓库列表-分页
   * @request GET:/api/luteos/erp/warehouse/queryEcWarehousePageList
   * @response `200` `WarehouseEcBeanPageResp` OK
   */
  export namespace LuteosErpWarehouseQueryEcWarehousePageList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 仓库编码/仓库名称 */
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
    export type ResponseBody = WarehouseEcBeanPageResp;
  }

  /**
   * No description
   * @tags 仓库管理-V2
   * @name LuteosErpWarehouseQueryList
   * @summary 仓库列表查询
   * @request GET:/api/luteos/erp/warehouse/queryList
   * @response `200` `WarehouseQueryResp` OK
   */
  export namespace LuteosErpWarehouseQueryList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 关键字 仓库ID、仓库名称、积加仓库名称 易仓名称 */
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
      /** 平台Code: WALMART, AMAZON */
      platformCode?: string;
      /**
       * 服务商 1-谷仓 2-amos
       * @format int32
       */
      providerType?: number;
      /**
       * 启用状态 0-禁用 1-启用
       * @format int32
       */
      status?: number;
      /**
       * 仓库类型 1-自营仓库 2-供应商仓 3-三方仓 4-平台仓
       * @format int32
       */
      warehouseType?: number;
      /** 仓库类型 1-自营仓库 2-供应商仓 3-三方仓 4-平台仓 */
      warehouseTypes?: string[];
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = WarehouseQueryResp;
  }

  /**
   * No description
   * @tags 仓库管理-V2
   * @name LuteosErpWarehouseQueryLogs
   * @summary 仓库日志查询信息
   * @request POST:/api/luteos/erp/warehouse/queryLogs
   * @response `200` `WarehouseLogResp` OK
   */
  export namespace LuteosErpWarehouseQueryLogs {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = WarehouseLogReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = WarehouseLogResp;
  }

  /**
   * No description
   * @tags 仓库管理-V2
   * @name LuteosErpWarehouseQueryPlatformListByType
   * @summary 查询平台仓库列表通过平台code
   * @request POST:/api/luteos/erp/warehouse/queryPlatformListByType
   * @response `200` `WarehouseQueryResp` OK
   */
  export namespace LuteosErpWarehouseQueryPlatformListByType {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = WarehouseSimpleQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = WarehouseQueryResp;
  }

  /**
   * No description
   * @tags 仓库管理-V2
   * @name LuteosErpWarehouseQueryWarehouseListByWarehouseType
   * @summary 查询仓库列表通过仓库类型
   * @request POST:/api/luteos/erp/warehouse/queryWarehouseListByWarehouseType
   * @response `200` `WarehouseQueryResp` OK
   */
  export namespace LuteosErpWarehouseQueryWarehouseListByWarehouseType {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = WarehouseSimpleQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = WarehouseQueryResp;
  }

  /**
   * No description
   * @tags 仓库管理-V2
   * @name LuteosErpWarehouseSync
   * @summary 手动同步仓库
   * @request POST:/api/luteos/erp/warehouse/sync
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpWarehouseSync {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = WarehouseSyncReq;
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
   * @tags 仓库管理-V2
   * @name LuteosErpWarehouseUpdateCenterWarehouse
   * @summary 更新是否中仓
   * @request POST:/api/luteos/erp/warehouse/updateCenterWarehouse
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosErpWarehouseUpdateCenterWarehouse {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = WarehouseUpdateReq;
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
   * @tags 仓库Vat映射
   * @name LuteosErpWarehouseVatAdd
   * @summary 新增
   * @request POST:/api/luteos/erp/warehouse/vat/add
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosErpWarehouseVatAdd {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = WarehouseVatAddReq;
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
   * @tags 仓库Vat映射
   * @name LuteosErpWarehouseVatChangeStatus
   * @summary 修改状态
   * @request POST:/api/luteos/erp/warehouse/vat/changeStatus
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosErpWarehouseVatChangeStatus {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = WarehouseVatStatusReq;
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
   * @tags 仓库Vat映射
   * @name LuteosErpWarehouseVatDelete
   * @summary 删除
   * @request POST:/api/luteos/erp/warehouse/vat/delete
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosErpWarehouseVatDelete {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * id
       * @format int32
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
    export type ResponseBody = CommonRespVoid;
  }

  /**
   * No description
   * @tags 仓库Vat映射
   * @name LuteosErpWarehouseVatDownTemplate
   * @summary 下载批量新增模板
   * @request POST:/api/luteos/erp/warehouse/vat/downTemplate
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosErpWarehouseVatDownTemplate {
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
   * @tags 仓库Vat映射
   * @name LuteosErpWarehouseVatQueryList
   * @summary 仓库Vat映射列表查询
   * @request POST:/api/luteos/erp/warehouse/vat/queryList
   * @response `200` `WarehouseVatQueryListResp` OK
   */
  export namespace LuteosErpWarehouseVatQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = WarehouseVatQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = WarehouseVatQueryListResp;
  }

  /**
   * No description
   * @tags 仓库Vat映射
   * @name LuteosErpWarehouseVatUpdate
   * @summary 编辑
   * @request POST:/api/luteos/erp/warehouse/vat/update
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosErpWarehouseVatUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = WarehouseVatUpdateReq;
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
   * @tags 仓库Vat映射
   * @name LuteosErpWarehouseVatUpload
   * @summary 批量导入
   * @request POST:/api/luteos/erp/warehouse/vat/upload
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosErpWarehouseVatUpload {
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
}
