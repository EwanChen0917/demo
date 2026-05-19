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
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags 客户管理
   * @name LuteosErpBaseB2BClientChangeStatus
   * @summary 变更状态
   * @request POST:/api/luteos/erp/base/b2b/client/changeStatus
   * @response `200` `CommonResp` OK
   */
  luteosErpBaseB2BClientChangeStatus = (
    req: ClientDetailChangeStatusReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/base/b2b/client/changeStatus`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 客户管理
   * @name LuteosErpBaseB2BClientInfoDownTemplate
   * @summary 下载批量更新上传模板
   * @request POST:/api/luteos/erp/base/b2b/client/info/downTemplate
   * @response `200` `CommonRespString` OK
   */
  luteosErpBaseB2BClientInfoDownTemplate = (req: ClientListQueryReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/erp/base/b2b/client/info/downTemplate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 客户管理
   * @name LuteosErpBaseB2BClientProductSkuSyncCrm
   * @summary 测试接口-客户产品信息同步CRM
   * @request POST:/api/luteos/erp/base/b2b/client/productSkuSyncCrm
   * @response `200` `CommonRespListString` OK
   */
  luteosErpBaseB2BClientProductSkuSyncCrm = (
    query: {
      /** skuCodes */
      skuCodes: string[];
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespListString, any>({
      path: `/api/luteos/erp/base/b2b/client/productSkuSyncCrm`,
      method: 'POST',
      query: query,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 客户管理
   * @name LuteosErpBaseB2BClientQueryDetail
   * @summary 详情
   * @request GET:/api/luteos/erp/base/b2b/client/queryDetail
   * @response `200` `ClientDetailQueryResp` OK
   */
  luteosErpBaseB2BClientQueryDetail = (
    query: {
      /** code */
      code: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<ClientDetailQueryResp, any>({
      path: `/api/luteos/erp/base/b2b/client/queryDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 客户管理
   * @name LuteosErpBaseB2BClientQueryList
   * @summary 列表查询
   * @request POST:/api/luteos/erp/base/b2b/client/queryList
   * @response `200` `ClientListQueryResp` OK
   */
  luteosErpBaseB2BClientQueryList = (req: ClientListQueryReq, params: RequestParams = {}) =>
    this.request<ClientListQueryResp, any>({
      path: `/api/luteos/erp/base/b2b/client/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 客户管理
   * @name LuteosErpBaseB2BClientQueryProductUpcEanList
   * @summary 查询-产品up、ean码列表
   * @request POST:/api/luteos/erp/base/b2b/client/queryProductUpcEanList
   * @response `200` `CustomerSkuLabelListQueryResp` OK
   */
  luteosErpBaseB2BClientQueryProductUpcEanList = (
    req: CustomerSkuLabelQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<CustomerSkuLabelListQueryResp, any>({
      path: `/api/luteos/erp/base/b2b/client/queryProductUpcEanList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 客户管理
   * @name LuteosErpBaseB2BClientSaveOrUpdate
   * @summary 新增/更新
   * @request POST:/api/luteos/erp/base/b2b/client/saveOrUpdate
   * @response `200` `CommonRespString` OK
   */
  luteosErpBaseB2BClientSaveOrUpdate = (req: ClientDetailSaveReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/erp/base/b2b/client/saveOrUpdate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 客户管理
   * @name LuteosErpBaseB2BClientSaveOrUpdateProduct
   * @summary 新增编辑-产品up、ean码
   * @request POST:/api/luteos/erp/base/b2b/client/saveOrUpdateProduct
   * @response `200` `CommonResp` OK
   */
  luteosErpBaseB2BClientSaveOrUpdateProduct = (
    req: CustomerSkuLabelUpdateReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/base/b2b/client/saveOrUpdateProduct`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 客户管理
   * @name LuteosErpBaseB2BClientSkuLabelDownTemplate
   * @summary 下载sku贴标上传模板
   * @request POST:/api/luteos/erp/base/b2b/client/skuLabel/downTemplate
   * @response `200` `CommonRespString` OK
   */
  luteosErpBaseB2BClientSkuLabelDownTemplate = (
    req: ClientListQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/erp/base/b2b/client/skuLabel/downTemplate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 客户管理
   * @name LuteosErpBaseB2BClientSyncCrm
   * @summary 同步CRM测试接口
   * @request POST:/api/luteos/erp/base/b2b/client/syncCrm
   * @response `200` `OpenApiCustomerSaveResp` OK
   */
  luteosErpBaseB2BClientSyncCrm = (req: OpenApiCustomerSaveReq, params: RequestParams = {}) =>
    this.request<OpenApiCustomerSaveResp, any>({
      path: `/api/luteos/erp/base/b2b/client/syncCrm`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 客户管理
   * @name LuteosErpBaseB2BClientUpload
   * @summary 上传sku贴标上传模板
   * @request POST:/api/luteos/erp/base/b2b/client/upload
   * @response `200` `CommonResp` OK
   */
  luteosErpBaseB2BClientUpload = (req: CustomerProductTagUploadReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/base/b2b/client/upload`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 客户管理
   * @name LuteosErpBaseB2BClientUploadInfo
   * @summary 上传批量更新
   * @request POST:/api/luteos/erp/base/b2b/client/upload/info
   * @response `200` `CommonResp` OK
   */
  luteosErpBaseB2BClientUploadInfo = (req: UploadReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/base/b2b/client/upload/info`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 客户对接关系
   * @name LuteosErpBaseCustomerDockingRelationBatchDelete
   * @summary 批量删除
   * @request POST:/api/luteos/erp/base/customer/docking/relation/batchDelete
   * @response `200` `CommonRespVoid` OK
   */
  luteosErpBaseCustomerDockingRelationBatchDelete = (
    req: CustomerDockingRelationDeleteReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/erp/base/customer/docking/relation/batchDelete`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 客户对接关系
   * @name LuteosErpBaseCustomerDockingRelationDownImportTemplate
   * @summary 下载导入模板
   * @request POST:/api/luteos/erp/base/customer/docking/relation/downImportTemplate
   * @response `200` `CommonRespString` OK
   */
  luteosErpBaseCustomerDockingRelationDownImportTemplate = (params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/erp/base/customer/docking/relation/downImportTemplate`,
      method: 'POST',
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 客户对接关系
   * @name LuteosErpBaseCustomerDockingRelationExport
   * @summary 导出
   * @request POST:/api/luteos/erp/base/customer/docking/relation/export
   * @response `200` `CommonExportResp` OK
   */
  luteosErpBaseCustomerDockingRelationExport = (
    req: CustomerDockingRelationQueryListReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/erp/base/customer/docking/relation/export`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 客户对接关系
   * @name LuteosErpBaseCustomerDockingRelationImport
   * @summary 导入
   * @request POST:/api/luteos/erp/base/customer/docking/relation/import
   * @response `200` `ImportDataResp` OK
   */
  luteosErpBaseCustomerDockingRelationImport = (req: UploadReq, params: RequestParams = {}) =>
    this.request<ImportDataResp, any>({
      path: `/api/luteos/erp/base/customer/docking/relation/import`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 客户对接关系
   * @name LuteosErpBaseCustomerDockingRelationQueryList
   * @summary 列表查询
   * @request POST:/api/luteos/erp/base/customer/docking/relation/queryList
   * @response `200` `CustomerDockingRelationQueryListResp` OK
   */
  luteosErpBaseCustomerDockingRelationQueryList = (
    req: CustomerDockingRelationQueryListReq,
    params: RequestParams = {},
  ) =>
    this.request<CustomerDockingRelationQueryListResp, any>({
      path: `/api/luteos/erp/base/customer/docking/relation/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 客户对接关系
   * @name LuteosErpBaseCustomerDockingRelationSaveOrUpdate
   * @summary 新增/更新
   * @request POST:/api/luteos/erp/base/customer/docking/relation/saveOrUpdate
   * @response `200` `CommonRespString` OK
   */
  luteosErpBaseCustomerDockingRelationSaveOrUpdate = (
    req: CustomerDockingRelationSaveReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/erp/base/customer/docking/relation/saveOrUpdate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP审核管理
   * @name LuteosErpBaseFlowChangeStatus
   * @summary 变更状态
   * @request POST:/api/luteos/erp/base/flow/changeStatus
   * @response `200` `CommonResp` OK
   */
  luteosErpBaseFlowChangeStatus = (req: ErpFlowChangeStatusReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/base/flow/changeStatus`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP审核管理
   * @name LuteosErpBaseFlowExportList
   * @summary 导出
   * @request POST:/api/luteos/erp/base/flow/exportList
   * @response `200` `CommonRespCommonExportResp` OK
   */
  luteosErpBaseFlowExportList = (req: ErpFlowListQueryReq, params: RequestParams = {}) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/luteos/erp/base/flow/exportList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP审核管理
   * @name LuteosErpBaseFlowQueryCreatorList
   * @summary 创建人列表查询
   * @request POST:/api/luteos/erp/base/flow/queryCreatorList
   * @response `200` `ErpFlowCreatorListResp` OK
   */
  luteosErpBaseFlowQueryCreatorList = (req: ErpFlowListQueryReq, params: RequestParams = {}) =>
    this.request<ErpFlowCreatorListResp, any>({
      path: `/api/luteos/erp/base/flow/queryCreatorList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP审核管理
   * @name LuteosErpBaseFlowQueryDetail
   * @summary 详情
   * @request GET:/api/luteos/erp/base/flow/queryDetail
   * @response `200` `ErpFlowDetailQueryResp` OK
   */
  luteosErpBaseFlowQueryDetail = (
    query: {
      /** code */
      code: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<ErpFlowDetailQueryResp, any>({
      path: `/api/luteos/erp/base/flow/queryDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP审核管理
   * @name LuteosErpBaseFlowQueryList
   * @summary 列表查询
   * @request POST:/api/luteos/erp/base/flow/queryList
   * @response `200` `ErpFlowListQueryResp` OK
   */
  luteosErpBaseFlowQueryList = (req: ErpFlowListQueryReq, params: RequestParams = {}) =>
    this.request<ErpFlowListQueryResp, any>({
      path: `/api/luteos/erp/base/flow/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP审核管理
   * @name LuteosErpBaseFlowQueryTemplate
   * @summary 模板查询
   * @request GET:/api/luteos/erp/base/flow/queryTemplate
   * @response `200` `ErpFlowTemplateResp` OK
   */
  luteosErpBaseFlowQueryTemplate = (
    query: {
      /**
       * 类型：0-报价单 1-线下订单 2-申购单 3-销售预测 4-分仓规则 5-运费规则 7-自动拆单 8-shopify分仓规则
       * @format int32
       */
      type: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<ErpFlowTemplateResp, any>({
      path: `/api/luteos/erp/base/flow/queryTemplate`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP审核管理
   * @name LuteosErpBaseFlowSaveOrUpdate
   * @summary 新增/更新
   * @request POST:/api/luteos/erp/base/flow/saveOrUpdate
   * @response `200` `CommonRespString` OK
   */
  luteosErpBaseFlowSaveOrUpdate = (req: ErpFlowSaveReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/erp/base/flow/saveOrUpdate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 物流配置
   * @name LuteosErpBaseLogisticsConfigBatchDelete
   * @summary 批量删除
   * @request POST:/api/luteos/erp/base/logistics/config/batchDelete
   * @response `200` `CommonRespString` OK
   */
  luteosErpBaseLogisticsConfigBatchDelete = (
    req: LogisticsConfigDeleteReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/erp/base/logistics/config/batchDelete`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 物流配置
   * @name LuteosErpBaseLogisticsConfigExport
   * @summary 导出
   * @request POST:/api/luteos/erp/base/logistics/config/export
   * @response `200` `CommonExportResp` OK
   */
  luteosErpBaseLogisticsConfigExport = (
    req: LogisticsConfigQueryListReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/erp/base/logistics/config/export`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 物流配置
   * @name LuteosErpBaseLogisticsConfigImport
   * @summary 导入
   * @request POST:/api/luteos/erp/base/logistics/config/import
   * @response `200` `ImportDataResp` OK
   */
  luteosErpBaseLogisticsConfigImport = (req: UploadReq, params: RequestParams = {}) =>
    this.request<ImportDataResp, any>({
      path: `/api/luteos/erp/base/logistics/config/import`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 物流配置
   * @name LuteosErpBaseLogisticsConfigImportTemplateUrl
   * @summary 获取导入模板链接
   * @request GET:/api/luteos/erp/base/logistics/config/importTemplateUrl
   * @response `200` `CommonRespString` OK
   */
  luteosErpBaseLogisticsConfigImportTemplateUrl = (params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/erp/base/logistics/config/importTemplateUrl`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 物流配置
   * @name LuteosErpBaseLogisticsConfigQueryList
   * @summary 列表查询
   * @request POST:/api/luteos/erp/base/logistics/config/queryList
   * @response `200` `LogisticsConfigQueryListResp` OK
   */
  luteosErpBaseLogisticsConfigQueryList = (
    req: LogisticsConfigQueryListReq,
    params: RequestParams = {},
  ) =>
    this.request<LogisticsConfigQueryListResp, any>({
      path: `/api/luteos/erp/base/logistics/config/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 物流配置
   * @name LuteosErpBaseLogisticsConfigSaveOrUpdate
   * @summary 新增/更新
   * @request POST:/api/luteos/erp/base/logistics/config/saveOrUpdate
   * @response `200` `CommonRespString` OK
   */
  luteosErpBaseLogisticsConfigSaveOrUpdate = (
    req: LogisticsConfigSaveReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/erp/base/logistics/config/saveOrUpdate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-基础管理
   * @name LuteosErpBasePriceSync
   * @summary 价格主数据同步
   * @request POST:/api/luteos/erp/base/price/sync
   * @response `200` `CommonRespString` OK
   */
  luteosErpBasePriceSync = (req: PriceRecordSyncReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/erp/base/price/sync`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 站点列表
   * @name LuteosErpBaseSiteQueryList
   * @summary 列表查询（去重）
   * @request POST:/api/luteos/erp/base/site/queryList
   * @response `200` `ErpSiteQueryListResp` OK
   */
  luteosErpBaseSiteQueryList = (req: ErpSiteQueryListReq, params: RequestParams = {}) =>
    this.request<ErpSiteQueryListResp, any>({
      path: `/api/luteos/erp/base/site/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 站点列表
   * @name LuteosErpBaseSiteQueryListV1
   * @summary 列表查询(未去重)
   * @request POST:/api/luteos/erp/base/site/queryListV1
   * @response `200` `ErpSiteQueryListResp` OK
   */
  luteosErpBaseSiteQueryListV1 = (req: ErpSiteQueryListReq, params: RequestParams = {}) =>
    this.request<ErpSiteQueryListResp, any>({
      path: `/api/luteos/erp/base/site/queryListV1`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 站点列表
   * @name LuteosErpBaseSiteSaveOrUpdate
   * @summary 新增/更新
   * @request POST:/api/luteos/erp/base/site/saveOrUpdate
   * @response `200` `CommonResp` OK
   */
  luteosErpBaseSiteSaveOrUpdate = (req: ErpSiteSaveReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/base/site/saveOrUpdate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-供应商管理
   * @name LuteosErpBaseSupplierSync
   * @summary 同步供应商
   * @request POST:/api/luteos/erp/base/supplier/sync
   * @response `200` `CommonRespString` OK
   */
  luteosErpBaseSupplierSync = (req: SyncSupplierReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/erp/base/supplier/sync`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-订单-整箱规则
   * @name LuteosErpCartonSizeDelete
   * @summary 删除
   * @request POST:/api/luteos/erp/carton/size/delete
   * @response `200` `CommonRespString` OK
   */
  luteosErpCartonSizeDelete = (req: CartonSizeDeleteReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/erp/carton/size/delete`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-订单-整箱规则
   * @name LuteosErpCartonSizeDownTemplate
   * @summary 下载批量导入模板(导出)
   * @request POST:/api/luteos/erp/carton/size/downTemplate
   * @response `200` `CommonRespString` OK
   */
  luteosErpCartonSizeDownTemplate = (req: CartonSizeListQueryReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/erp/carton/size/downTemplate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-订单-整箱规则
   * @name LuteosErpCartonSizeQueryList
   * @summary 查询列表
   * @request POST:/api/luteos/erp/carton/size/queryList
   * @response `200` `CartonSizeListQueryResp` OK
   */
  luteosErpCartonSizeQueryList = (req: CartonSizeListQueryReq, params: RequestParams = {}) =>
    this.request<CartonSizeListQueryResp, any>({
      path: `/api/luteos/erp/carton/size/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-订单-整箱规则
   * @name LuteosErpCartonSizeSave
   * @summary 新增
   * @request POST:/api/luteos/erp/carton/size/save
   * @response `200` `CommonRespVoid` OK
   */
  luteosErpCartonSizeSave = (req: CartonSizeListSaveReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/erp/carton/size/save`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-订单-整箱规则
   * @name LuteosErpCartonSizeUpdate
   * @summary 编辑
   * @request POST:/api/luteos/erp/carton/size/update
   * @response `200` `CommonRespString` OK
   */
  luteosErpCartonSizeUpdate = (req: CartonSizeListSaveReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/erp/carton/size/update`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-订单-整箱规则
   * @name LuteosErpCartonSizeUpload
   * @summary 批量导入
   * @request POST:/api/luteos/erp/carton/size/upload
   * @response `200` `CommonResp` OK
   */
  luteosErpCartonSizeUpload = (req: UploadReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/carton/size/upload`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 信用额度管理
   * @name LuteosErpCustomerCreditLimitBatchLockOperation
   * @summary 信用额度批量操作--只给openApi RPC,页面不使用这个接口
   * @request POST:/api/luteos/erp/customer/credit/limit/batchLockOperation
   * @response `200` `CommonResp` OK
   */
  luteosErpCustomerCreditLimitBatchLockOperation = (
    req: CustomerCreditLimitOperationBeanRpc[],
    params: RequestParams = {},
  ) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/customer/credit/limit/batchLockOperation`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 信用额度管理
   * @name LuteosErpCustomerCreditLimitDownCreditLimitTemplate
   * @summary 下载信用额度列表上传模板
   * @request POST:/api/luteos/erp/customer/credit/limit/downCreditLimitTemplate
   * @response `200` `CommonRespString` OK
   */
  luteosErpCustomerCreditLimitDownCreditLimitTemplate = (params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/erp/customer/credit/limit/downCreditLimitTemplate`,
      method: 'POST',
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 信用额度管理
   * @name LuteosErpCustomerCreditLimitExportCustomerCreditList
   * @summary 信用额度列表查询-导出
   * @request POST:/api/luteos/erp/customer/credit/limit/exportCustomerCreditList
   * @response `200` `CommonRespCommonExportResp` OK
   */
  luteosErpCustomerCreditLimitExportCustomerCreditList = (
    req: CustomerCreditLimitQueryListReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/luteos/erp/customer/credit/limit/exportCustomerCreditList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 信用额度管理
   * @name LuteosErpCustomerCreditLimitImportCustomerCreditList
   * @summary 信用额度列表查询-导入
   * @request POST:/api/luteos/erp/customer/credit/limit/importCustomerCreditList
   * @response `200` `ImportDataResp` OK
   */
  luteosErpCustomerCreditLimitImportCustomerCreditList = (
    req: UploadReq,
    params: RequestParams = {},
  ) =>
    this.request<ImportDataResp, any>({
      path: `/api/luteos/erp/customer/credit/limit/importCustomerCreditList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 信用额度管理
   * @name LuteosErpCustomerCreditLimitOperation
   * @summary 信用额度操作--只给openApi RPC,页面不使用这个接口
   * @request POST:/api/luteos/erp/customer/credit/limit/operation
   * @response `200` `CommonResp` OK
   */
  luteosErpCustomerCreditLimitOperation = (
    req: CustomerCreditLimitOperationBeanRpc,
    params: RequestParams = {},
  ) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/customer/credit/limit/operation`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 信用额度管理
   * @name LuteosErpCustomerCreditLimitQueryCustomerCreditLimit
   * @summary 信用额度查询
   * @request POST:/api/luteos/erp/customer/credit/limit/queryCustomerCreditLimit
   * @response `200` `CommonRespListCustomerCreditLimitBeanRpc` OK
   */
  luteosErpCustomerCreditLimitQueryCustomerCreditLimit = (
    customerCodeList: string[],
    params: RequestParams = {},
  ) =>
    this.request<CommonRespListCustomerCreditLimitBeanRpc, any>({
      path: `/api/luteos/erp/customer/credit/limit/queryCustomerCreditLimit`,
      method: 'POST',
      body: customerCodeList,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 信用额度管理
   * @name LuteosErpCustomerCreditLimitQueryCustomerCreditList
   * @summary 信用额度列表查询
   * @request POST:/api/luteos/erp/customer/credit/limit/queryCustomerCreditList
   * @response `200` `CommonRespCustomerCreditLimitQueryListResp` OK
   */
  luteosErpCustomerCreditLimitQueryCustomerCreditList = (
    req: CustomerCreditLimitQueryListReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespCustomerCreditLimitQueryListResp, any>({
      path: `/api/luteos/erp/customer/credit/limit/queryCustomerCreditList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 信用额度管理
   * @name LuteosErpCustomerCreditLimitQueryOperationLogs
   * @summary 信用额度操作日志查询-不分页-页面不用,测试
   * @request POST:/api/luteos/erp/customer/credit/limit/queryOperationLogs
   * @response `200` `CustomerCreditLimitLogBeanRpc` OK
   */
  luteosErpCustomerCreditLimitQueryOperationLogs = (
    req: CustomerCreditLimitLogQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<CustomerCreditLimitLogBeanRpc, any>({
      path: `/api/luteos/erp/customer/credit/limit/queryOperationLogs`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 信用额度管理
   * @name LuteosErpCustomerCreditLimitQueryOperationPageLog
   * @summary 信用额度操作日志查询
   * @request POST:/api/luteos/erp/customer/credit/limit/queryOperationPageLog
   * @response `200` `CustomerCreditLimitLogPageResp` OK
   */
  luteosErpCustomerCreditLimitQueryOperationPageLog = (
    req: CustomerCreditLimitLogPageReq,
    params: RequestParams = {},
  ) =>
    this.request<CustomerCreditLimitLogPageResp, any>({
      path: `/api/luteos/erp/customer/credit/limit/queryOperationPageLog`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 报关单
   * @name LuteosErpCustomsDeleteOwnSingleCustomsFile
   * @summary 报关入库-删除
   * @request POST:/api/luteos/erp/customs/deleteOwnSingleCustomsFile
   * @response `200` `CommonRespVoid` OK
   */
  luteosErpCustomsDeleteOwnSingleCustomsFile = (
    req: CustomsSingDownloadReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/erp/customs/deleteOwnSingleCustomsFile`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 报关单
   * @name LuteosErpCustomsDeleteProduct
   * @summary 报关产品-删除
   * @request POST:/api/luteos/erp/customs/deleteProduct
   * @response `200` `CommonRespVoid` OK
   */
  luteosErpCustomsDeleteProduct = (
    req: CustomsProductEntityDeleteReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/erp/customs/deleteProduct`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 报关单
   * @name LuteosErpCustomsDownElmentTemplate
   * @summary 下载报关要素上传模板
   * @request POST:/api/luteos/erp/customs/downElmentTemplate
   * @response `200` `CommonRespString` OK
   */
  luteosErpCustomsDownElmentTemplate = (params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/erp/customs/downElmentTemplate`,
      method: 'POST',
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 报关单
   * @name LuteosErpCustomsDownProductTemplate
   * @summary 下载报关产品上传模板
   * @request POST:/api/luteos/erp/customs/downProductTemplate
   * @response `200` `CommonRespString` OK
   */
  luteosErpCustomsDownProductTemplate = (params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/erp/customs/downProductTemplate`,
      method: 'POST',
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 报关单
   * @name LuteosErpCustomsDownloadCustomsTemplate
   * @summary 报关入库-下载报关单上传模板
   * @request POST:/api/luteos/erp/customs/downloadCustomsTemplate
   * @response `200` `CommonRespString` OK
   */
  luteosErpCustomsDownloadCustomsTemplate = (params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/erp/customs/downloadCustomsTemplate`,
      method: 'POST',
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 报关单
   * @name LuteosErpCustomsExportBatchCustomsFile
   * @summary 报关入库-批量记录下载
   * @request POST:/api/luteos/erp/customs/exportBatchCustomsFile
   * @response `200` `CommonExportResp` OK
   */
  luteosErpCustomsExportBatchCustomsFile = (
    req: CustomsBatchDownloadReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/erp/customs/exportBatchCustomsFile`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 报关单
   * @name LuteosErpCustomsExportCustomsList
   * @summary 报关入库-导出报关清单
   * @request POST:/api/luteos/erp/customs/exportCustomsList
   * @response `200` `CommonExportResp` OK
   */
  luteosErpCustomsExportCustomsList = (req: CustomsListQueryReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/erp/customs/exportCustomsList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 报关单
   * @name LuteosErpCustomsExportNewCustomsData
   * @summary 报关产品-导出未下载数据
   * @request POST:/api/luteos/erp/customs/exportNewCustomsData
   * @response `200` `CommonExportResp` OK
   */
  luteosErpCustomsExportNewCustomsData = (req: CustomsListQueryReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/erp/customs/exportNewCustomsData`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 报关单
   * @name LuteosErpCustomsExportPackData
   * @summary 报关入库-导出装箱数据
   * @request POST:/api/luteos/erp/customs/exportPackData
   * @response `200` `CommonExportResp` OK
   */
  luteosErpCustomsExportPackData = (req: CustomTransferQueryReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/erp/customs/exportPackData`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 报关单
   * @name LuteosErpCustomsExportProductList
   * @summary 报关产品-导出
   * @request GET:/api/luteos/erp/customs/exportProductList
   * @response `200` `CommonRespCommonExportResp` OK
   */
  luteosErpCustomsExportProductList = (
    query: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/luteos/erp/customs/exportProductList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 报关单
   * @name LuteosErpCustomsExportSingleCustomsFile
   * @summary 报关入库-单个记录下载
   * @request POST:/api/luteos/erp/customs/exportSingleCustomsFile
   * @response `200` `CommonRespString` OK
   */
  luteosErpCustomsExportSingleCustomsFile = (
    req: CustomsSingDownloadReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/erp/customs/exportSingleCustomsFile`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 报关单
   * @name LuteosErpCustomsImportCustoms
   * @summary 报关入库-导入报关单
   * @request POST:/api/luteos/erp/customs/importCustoms
   * @response `200` `ImportDataResp` OK
   */
  luteosErpCustomsImportCustoms = (req: CustomsUploadReq, params: RequestParams = {}) =>
    this.request<ImportDataResp, any>({
      path: `/api/luteos/erp/customs/importCustoms`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 报关单
   * @name LuteosErpCustomsImportElement
   * @summary 导入报关要素
   * @request POST:/api/luteos/erp/customs/importElement
   * @response `200` `ImportDataResp` OK
   */
  luteosErpCustomsImportElement = (req: UploadReq, params: RequestParams = {}) =>
    this.request<ImportDataResp, any>({
      path: `/api/luteos/erp/customs/importElement`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 报关单
   * @name LuteosErpCustomsImportProduct
   * @summary 报关产品-导入
   * @request POST:/api/luteos/erp/customs/importProduct
   * @response `200` `ImportDataResp` OK
   */
  luteosErpCustomsImportProduct = (req: UploadReq, params: RequestParams = {}) =>
    this.request<ImportDataResp, any>({
      path: `/api/luteos/erp/customs/importProduct`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 报关单
   * @name LuteosErpCustomsImportReceipt
   * @summary 报关入库-回执单上传
   * @request POST:/api/luteos/erp/customs/importReceipt
   * @response `200` `CommonResp` OK
   */
  luteosErpCustomsImportReceipt = (req: CustomsReceiptUploadReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/customs/importReceipt`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 报关单
   * @name LuteosErpCustomsQueryCustomsList
   * @summary 报关入库-查询报关列表
   * @request GET:/api/luteos/erp/customs/queryCustomsList
   * @response `200` `CustomsListQueryResp` OK
   */
  luteosErpCustomsQueryCustomsList = (
    query: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<CustomsListQueryResp, any>({
      path: `/api/luteos/erp/customs/queryCustomsList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 报关单
   * @name LuteosErpCustomsQueryDeclarationEntity
   * @summary 报关主体-查询列表
   * @request GET:/api/luteos/erp/customs/queryDeclarationEntity
   * @response `200` `CustomsDeclarationEntityListQueryResp` OK
   */
  luteosErpCustomsQueryDeclarationEntity = (
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
    this.request<CustomsDeclarationEntityListQueryResp, any>({
      path: `/api/luteos/erp/customs/queryDeclarationEntity`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 报关单
   * @name LuteosErpCustomsQueryDeclarationEntityDetail
   * @summary 报关主体-查询详情
   * @request GET:/api/luteos/erp/customs/queryDeclarationEntityDetail
   * @response `200` `CustomsDeclarationEntityDetailQueryResp` OK
   */
  luteosErpCustomsQueryDeclarationEntityDetail = (
    query?: {
      /** 唯一编码 */
      code?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CustomsDeclarationEntityDetailQueryResp, any>({
      path: `/api/luteos/erp/customs/queryDeclarationEntityDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 报关单
   * @name LuteosErpCustomsQueryDeclarationEntitySelectList
   * @summary 报关主体-下拉列表查询
   * @request GET:/api/luteos/erp/customs/queryDeclarationEntitySelectList
   * @response `200` `CustomsDeclarationEntitySelectListQueryResp` OK
   */
  luteosErpCustomsQueryDeclarationEntitySelectList = (params: RequestParams = {}) =>
    this.request<CustomsDeclarationEntitySelectListQueryResp, any>({
      path: `/api/luteos/erp/customs/queryDeclarationEntitySelectList`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 报关单
   * @name LuteosErpCustomsQueryElementDetail
   * @summary 报关要素-查询详情
   * @request GET:/api/luteos/erp/customs/queryElementDetail
   * @response `200` `CustomsElementDetailQueryResp` OK
   */
  luteosErpCustomsQueryElementDetail = (
    query?: {
      /**
       * 海关编码
       * @format int64
       */
      id?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<CustomsElementDetailQueryResp, any>({
      path: `/api/luteos/erp/customs/queryElementDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 报关单
   * @name LuteosErpCustomsQueryElementList
   * @summary 报关要素-查询列表
   * @request GET:/api/luteos/erp/customs/queryElementList
   * @response `200` `CustomsElementListQueryResp` OK
   */
  luteosErpCustomsQueryElementList = (
    query: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<CustomsElementListQueryResp, any>({
      path: `/api/luteos/erp/customs/queryElementList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 报关单
   * @name LuteosErpCustomsQueryGenerateRecordList
   * @summary 报关入库-下载记录查询
   * @request GET:/api/luteos/erp/customs/queryGenerateRecordList
   * @response `200` `CustomsGenerateRecordQueryResp` OK
   */
  luteosErpCustomsQueryGenerateRecordList = (
    query: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<CustomsGenerateRecordQueryResp, any>({
      path: `/api/luteos/erp/customs/queryGenerateRecordList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 报关单
   * @name LuteosErpCustomsQueryProductList
   * @summary 报关产品-查询列表
   * @request GET:/api/luteos/erp/customs/queryProductList
   * @response `200` `CustomsProductListQueryResp` OK
   */
  luteosErpCustomsQueryProductList = (
    query: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<CustomsProductListQueryResp, any>({
      path: `/api/luteos/erp/customs/queryProductList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 报关单
   * @name LuteosErpCustomsSaveOrUpdateDeclarationEntity
   * @summary 报关主体-修改/保存
   * @request POST:/api/luteos/erp/customs/saveOrUpdateDeclarationEntity
   * @response `200` `CommonResp` OK
   */
  luteosErpCustomsSaveOrUpdateDeclarationEntity = (
    req: CustomsDeclarationEntityUpdateReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/customs/saveOrUpdateDeclarationEntity`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 报关单
   * @name LuteosErpCustomsSaveOrUpdateElement
   * @summary 报关要素-修改保存
   * @request POST:/api/luteos/erp/customs/saveOrUpdateElement
   * @response `200` `CommonResp` OK
   */
  luteosErpCustomsSaveOrUpdateElement = (
    req: CustomsElementUpdateReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/customs/saveOrUpdateElement`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 报关单
   * @name LuteosErpCustomsSaveOrUpdateProduct
   * @summary 报关产品-修改/保存
   * @request POST:/api/luteos/erp/customs/saveOrUpdateProduct
   * @response `200` `CommonRespVoid` OK
   */
  luteosErpCustomsSaveOrUpdateProduct = (
    req: CustomsProductEntityUpdateReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/erp/customs/saveOrUpdateProduct`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 报关单
   * @name LuteosErpCustomsUpdateDefault
   * @summary 报关主体-设置默认
   * @request POST:/api/luteos/erp/customs/updateDefault
   * @response `200` `CommonResp` OK
   */
  luteosErpCustomsUpdateDefault = (
    req: CustomsDeclarationEntityDefaultReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/customs/updateDefault`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 调拨单
   * @name LuteosErpDeliveryOrderExport
   * @summary 导出
   * @request POST:/api/luteos/erp/deliveryOrder/export
   * @response `200` `CommonExportResp` OK
   */
  luteosErpDeliveryOrderExport = (req: DeliveryOrderQueryReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/erp/deliveryOrder/export`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 调拨单
   * @name LuteosErpDeliveryOrderPushXyPlan
   * @summary 推送兴运计划单
   * @request POST:/api/luteos/erp/deliveryOrder/pushXyPlan
   * @response `200` `CommonRespOrderBatchAuthResp` OK
   */
  luteosErpDeliveryOrderPushXyPlan = (codeList: string[], params: RequestParams = {}) =>
    this.request<CommonRespOrderBatchAuthResp, any>({
      path: `/api/luteos/erp/deliveryOrder/pushXyPlan`,
      method: 'POST',
      body: codeList,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 调拨单
   * @name LuteosErpDeliveryOrderQueryList
   * @summary 列表查询
   * @request POST:/api/luteos/erp/deliveryOrder/queryList
   * @response `200` `DeliveryOrderListQueryResp` OK
   */
  luteosErpDeliveryOrderQueryList = (req: DeliveryOrderQueryReq, params: RequestParams = {}) =>
    this.request<DeliveryOrderListQueryResp, any>({
      path: `/api/luteos/erp/deliveryOrder/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags EDI订单
   * @name LuteosErpEdiDownload
   * @summary 下载EDI订单
   * @request POST:/api/luteos/erp/edi/download
   * @response `200` `CommonExportResp` OK
   */
  luteosErpEdiDownload = (req: EdiOrderQueryReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/erp/edi/download`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags EDI订单
   * @name LuteosErpEdiQueryList
   * @summary 查询EDI订单
   * @request POST:/api/luteos/erp/edi/queryList
   * @response `200` `EdiOrderListQueryResp` OK
   */
  luteosErpEdiQueryList = (req: EdiOrderQueryReq, params: RequestParams = {}) =>
    this.request<EdiOrderListQueryResp, any>({
      path: `/api/luteos/erp/edi/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-展销会申请单
   * @name LuteosErpExhibitionAbandon
   * @summary 作废
   * @request POST:/api/luteos/erp/exhibition/abandon
   * @response `200` `CommonResp` OK
   */
  luteosErpExhibitionAbandon = (req: ExhibitionOrderAbandonReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/exhibition/abandon`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-展销会申请单
   * @name LuteosErpExhibitionDownload
   * @summary 导出
   * @request GET:/api/luteos/erp/exhibition/download
   * @response `200` `CommonExportResp` OK
   */
  luteosErpExhibitionDownload = (
    query: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/erp/exhibition/download`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-展销会申请单
   * @name LuteosErpExhibitionHandleMapping
   * @summary 关联单据 - 暂存/完成所有单据/保存
   * @request POST:/api/luteos/erp/exhibition/handleMapping
   * @response `200` `CommonResp` OK
   */
  luteosErpExhibitionHandleMapping = (req: ExhibitionOrderMappingReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/exhibition/handleMapping`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-展销会申请单
   * @name LuteosErpExhibitionQueryDetail
   * @summary 查询详情
   * @request GET:/api/luteos/erp/exhibition/queryDetail
   * @response `200` `ExhibitionOrderDetailResp` OK
   */
  luteosErpExhibitionQueryDetail = (
    query?: {
      /** 展销会单号 */
      exhibitionCode?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<ExhibitionOrderDetailResp, any>({
      path: `/api/luteos/erp/exhibition/queryDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-展销会申请单
   * @name LuteosErpExhibitionQueryList
   * @summary 查询列表
   * @request GET:/api/luteos/erp/exhibition/queryList
   * @response `200` `ExhibitionOrderQueryListResp` OK
   */
  luteosErpExhibitionQueryList = (
    query: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<ExhibitionOrderQueryListResp, any>({
      path: `/api/luteos/erp/exhibition/queryList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-展销会申请单
   * @name LuteosErpExhibitionRePush
   * @summary 重新推送
   * @request POST:/api/luteos/erp/exhibition/rePush
   * @response `200` `CommonResp` OK
   */
  luteosErpExhibitionRePush = (req: ExhibitionOrderRePushReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/exhibition/rePush`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-展销会申请单
   * @name LuteosErpExhibitionSaveOrUpdate
   * @summary 新增/编辑
   * @request POST:/api/luteos/erp/exhibition/saveOrUpdate
   * @response `200` `CommonResp` OK
   */
  luteosErpExhibitionSaveOrUpdate = (req: ExhibitionOrderAddReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/exhibition/saveOrUpdate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-基础管理
   * @name LuteosErpExportExportTkShopAcountInfo
   * @summary TK小店-机构达人挂链表-源数据快照
   * @request POST:/api/luteos/erp/export/export/tkShopAcountInfo
   * @response `200` `CommonRespCommonExportResp` OK
   */
  luteosErpExportExportTkShopAcountInfo = (req: CommonPageReq, params: RequestParams = {}) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/luteos/erp/export/export/tkShopAcountInfo`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 头程时效
   * @name LuteosErpFirstVesselTimelinessExportList
   * @summary 列表导出
   * @request POST:/api/luteos/erp/firstVesselTimeliness/exportList
   * @response `200` `CommonExportResp` OK
   */
  luteosErpFirstVesselTimelinessExportList = (
    req: FirstVesselTimelinessQueryListReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/erp/firstVesselTimeliness/exportList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 头程时效
   * @name LuteosErpFirstVesselTimelinessQueryList
   * @summary 列表查询
   * @request POST:/api/luteos/erp/firstVesselTimeliness/queryList
   * @response `200` `FirstVesselTimelinessQueryListResp` OK
   */
  luteosErpFirstVesselTimelinessQueryList = (
    req: FirstVesselTimelinessQueryListReq,
    params: RequestParams = {},
  ) =>
    this.request<FirstVesselTimelinessQueryListResp, any>({
      path: `/api/luteos/erp/firstVesselTimeliness/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 头程时效
   * @name LuteosErpFirstVesselTimelinessQuerySendLogList
   * @summary 发货日志查询
   * @request GET:/api/luteos/erp/firstVesselTimeliness/querySendLogList
   * @response `200` `FirstVesselTimelinessQuerySendLogListResp` OK
   */
  luteosErpFirstVesselTimelinessQuerySendLogList = (
    query: {
      /** code */
      code: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<FirstVesselTimelinessQuerySendLogListResp, any>({
      path: `/api/luteos/erp/firstVesselTimeliness/querySendLogList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 头程时效
   * @name LuteosErpFirstVesselTimelinessSendNotice
   * @summary 发货提醒-支持批量
   * @request POST:/api/luteos/erp/firstVesselTimeliness/sendNotice
   * @response `200` `CommonResp` OK
   */
  luteosErpFirstVesselTimelinessSendNotice = (
    req: FirstVesselTimelinessSendNoticeReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/firstVesselTimeliness/sendNotice`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存
   * @name LuteosErpInventoryAmazonQueryPlatformList
   * @summary 亚马逊平台库存查询
   * @request POST:/api/luteos/erp/inventory/amazon/queryPlatformList
   * @response `200` `PlatformInventoryQueryListResp` OK
   */
  luteosErpInventoryAmazonQueryPlatformList = (
    req: PlatformInventoryQueryListReq,
    params: RequestParams = {},
  ) =>
    this.request<PlatformInventoryQueryListResp, any>({
      path: `/api/luteos/erp/inventory/amazon/queryPlatformList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存
   * @name LuteosErpInventoryAmazonPlatformListExport
   * @summary 下载亚马逊平台库存查询
   * @request POST:/api/luteos/erp/inventory/amazonPlatformListExport
   * @response `200` `CommonRespCommonExportResp` OK
   */
  luteosErpInventoryAmazonPlatformListExport = (
    req: PlatformInventoryQueryListReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/luteos/erp/inventory/amazonPlatformListExport`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存
   * @name LuteosErpInventoryBatchInventoryListExport
   * @summary 下载批次库存查询
   * @request POST:/api/luteos/erp/inventory/batchInventoryListExport
   * @response `200` `CommonRespCommonExportResp` OK
   */
  luteosErpInventoryBatchInventoryListExport = (
    req: BatchInventoryQueryListReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/luteos/erp/inventory/batchInventoryListExport`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存
   * @name LuteosErpInventoryBatchInventoryLogListExport
   * @summary 下载批次库存日志查询
   * @request POST:/api/luteos/erp/inventory/batchInventoryLogListExport
   * @response `200` `CommonRespCommonExportResp` OK
   */
  luteosErpInventoryBatchInventoryLogListExport = (
    req: BatchInventoryLogQueryListReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/luteos/erp/inventory/batchInventoryLogListExport`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存
   * @name LuteosErpInventoryCenterListExport
   * @summary 下载中仓库存
   * @request POST:/api/luteos/erp/inventory/centerListExport
   * @response `200` `CommonRespCommonExportResp` OK
   */
  luteosErpInventoryCenterListExport = (
    req: CenterInventoryQueryListReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/luteos/erp/inventory/centerListExport`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存
   * @name LuteosErpInventoryDownSnap
   * @summary 下载库存快照
   * @request GET:/api/luteos/erp/inventory/downSnap
   * @response `200` `CommonRespCommonExportResp` OK
   */
  luteosErpInventoryDownSnap = (
    query: {
      /** snapshotDate */
      snapshotDate: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/luteos/erp/inventory/downSnap`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存
   * @name LuteosErpInventoryFbaQuerySendList
   * @summary FBA发货单查询
   * @request POST:/api/luteos/erp/inventory/fba/querySendList
   * @response `200` `FbaDeliverBatchQueryListResp` OK
   */
  luteosErpInventoryFbaQuerySendList = (req: FbaSendQueryListReq, params: RequestParams = {}) =>
    this.request<FbaDeliverBatchQueryListResp, any>({
      path: `/api/luteos/erp/inventory/fba/querySendList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存
   * @name LuteosErpInventoryFbaShipmentMonitorChangeStatus
   * @summary FBA货件监控-修改状态
   * @request POST:/api/luteos/erp/inventory/fba/shipment/monitor/changeStatus
   * @response `200` `void` OK
   */
  luteosErpInventoryFbaShipmentMonitorChangeStatus = (
    req: FbaShipmentMonitorChangeStatusReq,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/luteos/erp/inventory/fba/shipment/monitor/changeStatus`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存
   * @name LuteosErpInventoryFbaShipmentMonitorDetail
   * @summary FBA货件监控-查询详情
   * @request GET:/api/luteos/erp/inventory/fba/shipment/monitor/detail
   * @response `200` `FbaShipmentMonitorDetailQueryResp` OK
   */
  luteosErpInventoryFbaShipmentMonitorDetail = (
    query: {
      /** ruleId */
      ruleId: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<FbaShipmentMonitorDetailQueryResp, any>({
      path: `/api/luteos/erp/inventory/fba/shipment/monitor/detail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存
   * @name LuteosErpInventoryFbaShipmentMonitorQuery
   * @summary FBA货件监控-查询列表
   * @request POST:/api/luteos/erp/inventory/fba/shipment/monitor/query
   * @response `200` `FbaShipmentMonitorListQueryResp` OK
   */
  luteosErpInventoryFbaShipmentMonitorQuery = (req: CommonPageReq, params: RequestParams = {}) =>
    this.request<FbaShipmentMonitorListQueryResp, any>({
      path: `/api/luteos/erp/inventory/fba/shipment/monitor/query`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存
   * @name LuteosErpInventoryFbaShipmentMonitorSave
   * @summary FBA货件监控-新增和修改
   * @request POST:/api/luteos/erp/inventory/fba/shipment/monitor/save
   * @response `200` `void` OK
   */
  luteosErpInventoryFbaShipmentMonitorSave = (
    req: FbaShipmentMonitorSaveReq,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/luteos/erp/inventory/fba/shipment/monitor/save`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存
   * @name LuteosErpInventoryFbaShipmentMonitorTransportType
   * @summary FBA货件监控-获取所有运输方式
   * @request GET:/api/luteos/erp/inventory/fba/shipment/monitor/transportType
   * @response `200` `(FbaShipmentMonitorTransportQueryResp)[]` OK
   */
  luteosErpInventoryFbaShipmentMonitorTransportType = (params: RequestParams = {}) =>
    this.request<FbaShipmentMonitorTransportQueryResp[], any>({
      path: `/api/luteos/erp/inventory/fba/shipment/monitor/transportType`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存
   * @name LuteosErpInventoryFbaSendListExport
   * @summary 下载FBA发货单查询
   * @request POST:/api/luteos/erp/inventory/fbaSendListExport
   * @response `200` `CommonRespCommonExportResp` OK
   */
  luteosErpInventoryFbaSendListExport = (req: FbaSendQueryListReq, params: RequestParams = {}) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/luteos/erp/inventory/fbaSendListExport`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存
   * @name LuteosErpInventoryFbaShipmentListDetailExport
   * @summary 下载FBA货件明细
   * @request POST:/api/luteos/erp/inventory/fbaShipmentListDetailExport
   * @response `200` `CommonRespCommonExportResp` OK
   */
  luteosErpInventoryFbaShipmentListDetailExport = (
    req: FbaShipmentQueryListReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/luteos/erp/inventory/fbaShipmentListDetailExport`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存
   * @name LuteosErpInventoryGoodInListExport
   * @summary 下载谷仓入库单
   * @request POST:/api/luteos/erp/inventory/goodInListExport
   * @response `200` `CommonRespCommonExportResp` OK
   */
  luteosErpInventoryGoodInListExport = (req: GoodInQueryListReq, params: RequestParams = {}) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/luteos/erp/inventory/goodInListExport`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存
   * @name LuteosErpInventoryInventoryInDetailListExport
   * @summary 下载入库明细查询
   * @request POST:/api/luteos/erp/inventory/inventoryInDetailListExport
   * @response `200` `CommonRespCommonExportResp` OK
   */
  luteosErpInventoryInventoryInDetailListExport = (
    req: InventoryInDetailQueryListReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/luteos/erp/inventory/inventoryInDetailListExport`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存
   * @name LuteosErpInventoryOverseaQueryFirstVesselList
   * @summary 海外仓头程计划查询
   * @request POST:/api/luteos/erp/inventory/oversea/queryFirstVesselList
   * @response `200` `FirstVtQueryListResp` OK
   */
  luteosErpInventoryOverseaQueryFirstVesselList = (
    req: OverseaFirstVesselQueryListReq,
    params: RequestParams = {},
  ) =>
    this.request<FirstVtQueryListResp, any>({
      path: `/api/luteos/erp/inventory/oversea/queryFirstVesselList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存
   * @name LuteosErpInventoryOverseaQuerySendList
   * @summary 海外仓发货单查询
   * @request POST:/api/luteos/erp/inventory/oversea/querySendList
   * @response `200` `OverseaSendQueryListResp` OK
   */
  luteosErpInventoryOverseaQuerySendList = (
    req: OverseaSendQueryListReq,
    params: RequestParams = {},
  ) =>
    this.request<OverseaSendQueryListResp, any>({
      path: `/api/luteos/erp/inventory/oversea/querySendList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存
   * @name LuteosErpInventoryOverseaFirstVesseListExport
   * @summary 下载海外仓头程计划查询
   * @request POST:/api/luteos/erp/inventory/overseaFirstVesseListExport
   * @response `200` `CommonRespCommonExportResp` OK
   */
  luteosErpInventoryOverseaFirstVesseListExport = (
    req: OverseaFirstVesselQueryListReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/luteos/erp/inventory/overseaFirstVesseListExport`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存
   * @name LuteosErpInventoryOverseaSendListExport
   * @summary 下载海外仓发货单
   * @request POST:/api/luteos/erp/inventory/overseaSendListExport
   * @response `200` `CommonRespCommonExportResp` OK
   */
  luteosErpInventoryOverseaSendListExport = (
    req: OverseaSendQueryListReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/luteos/erp/inventory/overseaSendListExport`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存
   * @name LuteosErpInventoryPlanCenterListExport
   * @summary 下载中仓库存-计划
   * @request POST:/api/luteos/erp/inventory/plan/centerListExport
   * @response `200` `CommonRespCommonExportResp` OK
   */
  luteosErpInventoryPlanCenterListExport = (
    req: CenterInventoryQueryListReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/luteos/erp/inventory/plan/centerListExport`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存
   * @name LuteosErpInventoryPlanPlatformListExport
   * @summary 下载计划平台库存查询
   * @request POST:/api/luteos/erp/inventory/planPlatformListExport
   * @response `200` `CommonRespCommonExportResp` OK
   */
  luteosErpInventoryPlanPlatformListExport = (
    req: PlatformInventoryQueryListReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/luteos/erp/inventory/planPlatformListExport`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存
   * @name LuteosErpInventoryPurchaseQueryList
   * @summary 采购单明细查询
   * @request POST:/api/luteos/erp/inventory/purchase/queryList
   * @response `200` `PurchaseQueryListResp` OK
   */
  luteosErpInventoryPurchaseQueryList = (req: PurchaseQueryListReq, params: RequestParams = {}) =>
    this.request<PurchaseQueryListResp, any>({
      path: `/api/luteos/erp/inventory/purchase/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存
   * @name LuteosErpInventoryPurchaseListAllExport
   * @summary 下载采购单明细-ALL
   * @request POST:/api/luteos/erp/inventory/purchaseListAllExport
   * @response `200` `CommonRespCommonExportResp` OK
   */
  luteosErpInventoryPurchaseListAllExport = (
    req: PurchaseQueryListReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/luteos/erp/inventory/purchaseListAllExport`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存
   * @name LuteosErpInventoryPurchaseListExport
   * @summary 下载采购单明细
   * @request POST:/api/luteos/erp/inventory/purchaseListExport
   * @response `200` `CommonRespCommonExportResp` OK
   */
  luteosErpInventoryPurchaseListExport = (req: PurchaseQueryListReq, params: RequestParams = {}) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/luteos/erp/inventory/purchaseListExport`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存
   * @name LuteosErpInventoryQuertSnap
   * @summary 获取所有库存快照
   * @request GET:/api/luteos/erp/inventory/quertSnap
   * @response `200` `CommonRespListInventorySnapQueryResp` OK
   */
  luteosErpInventoryQuertSnap = (params: RequestParams = {}) =>
    this.request<CommonRespListInventorySnapQueryResp, any>({
      path: `/api/luteos/erp/inventory/quertSnap`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存
   * @name LuteosErpInventoryQueryAllInventoryAmount
   * @summary 全链路库存分析
   * @request POST:/api/luteos/erp/inventory/queryAllInventoryAmount
   * @response `200` `AllInventoryAmountListResp` OK
   */
  luteosErpInventoryQueryAllInventoryAmount = (
    req: AllInventoryAmountListReq,
    params: RequestParams = {},
  ) =>
    this.request<AllInventoryAmountListResp, any>({
      path: `/api/luteos/erp/inventory/queryAllInventoryAmount`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存
   * @name LuteosErpInventoryQueryBatchInventoryList
   * @summary 批次库存查询
   * @request POST:/api/luteos/erp/inventory/queryBatchInventoryList
   * @response `200` `BatchInventoryQueryListResp` OK
   */
  luteosErpInventoryQueryBatchInventoryList = (
    req: BatchInventoryQueryListReq,
    params: RequestParams = {},
  ) =>
    this.request<BatchInventoryQueryListResp, any>({
      path: `/api/luteos/erp/inventory/queryBatchInventoryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存
   * @name LuteosErpInventoryQueryBatchInventoryLogList
   * @summary 批次库存日志查询
   * @request POST:/api/luteos/erp/inventory/queryBatchInventoryLogList
   * @response `200` `BatchInventoryLogQueryListResp` OK
   */
  luteosErpInventoryQueryBatchInventoryLogList = (
    req: BatchInventoryLogQueryListReq,
    params: RequestParams = {},
  ) =>
    this.request<BatchInventoryLogQueryListResp, any>({
      path: `/api/luteos/erp/inventory/queryBatchInventoryLogList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存
   * @name LuteosErpInventoryQueryCenterList
   * @summary 中仓库存查询
   * @request POST:/api/luteos/erp/inventory/queryCenterList
   * @response `200` `CenterInventoryQueryListResp` OK
   */
  luteosErpInventoryQueryCenterList = (
    req: CenterInventoryQueryListReq,
    params: RequestParams = {},
  ) =>
    this.request<CenterInventoryQueryListResp, any>({
      path: `/api/luteos/erp/inventory/queryCenterList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存
   * @name LuteosErpInventoryQueryGoodInList
   * @summary 谷仓入库单查询
   * @request POST:/api/luteos/erp/inventory/queryGoodInList
   * @response `200` `GoodInQueryListResp` OK
   */
  luteosErpInventoryQueryGoodInList = (req: GoodInQueryListReq, params: RequestParams = {}) =>
    this.request<GoodInQueryListResp, any>({
      path: `/api/luteos/erp/inventory/queryGoodInList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存
   * @name LuteosErpInventoryQueryInventoryInDetailList
   * @summary 入库明细查询
   * @request POST:/api/luteos/erp/inventory/queryInventoryInDetailList
   * @response `200` `InventoryInDetailQueryListResp` OK
   */
  luteosErpInventoryQueryInventoryInDetailList = (
    req: InventoryInDetailQueryListReq,
    params: RequestParams = {},
  ) =>
    this.request<InventoryInDetailQueryListResp, any>({
      path: `/api/luteos/erp/inventory/queryInventoryInDetailList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存
   * @name LuteosErpInventoryQueryPlatformListExport2
   * @summary 查询沃尔玛在途库存
   * @request POST:/api/luteos/erp/inventory/queryPlatformListExport2
   * @response `200` `PlatformInventoryQueryListResp` OK
   */
  luteosErpInventoryQueryPlatformListExport2 = (
    req: PlatformInventoryQueryListReq,
    params: RequestParams = {},
  ) =>
    this.request<PlatformInventoryQueryListResp, any>({
      path: `/api/luteos/erp/inventory/queryPlatformListExport2`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存
   * @name LuteosErpInventoryShopifyQueryPlatformList
   * @summary 独立站平台库存查询
   * @request POST:/api/luteos/erp/inventory/shopify/queryPlatformList
   * @response `200` `PlatformInventoryQueryListResp` OK
   */
  luteosErpInventoryShopifyQueryPlatformList = (
    req: PlatformInventoryQueryListReq,
    params: RequestParams = {},
  ) =>
    this.request<PlatformInventoryQueryListResp, any>({
      path: `/api/luteos/erp/inventory/shopify/queryPlatformList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存
   * @name LuteosErpInventoryShopifyPlatformListExport
   * @summary 下载独立站平台库存查询
   * @request POST:/api/luteos/erp/inventory/shopifyPlatformListExport
   * @response `200` `CommonRespCommonExportResp` OK
   */
  luteosErpInventoryShopifyPlatformListExport = (
    req: PlatformInventoryQueryListReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/luteos/erp/inventory/shopifyPlatformListExport`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存
   * @name LuteosErpInventoryTtQueryPlatformList
   * @summary TT平台库存查询
   * @request POST:/api/luteos/erp/inventory/tt/queryPlatformList
   * @response `200` `PlatformInventoryQueryListResp` OK
   */
  luteosErpInventoryTtQueryPlatformList = (
    req: PlatformInventoryQueryListReq,
    params: RequestParams = {},
  ) =>
    this.request<PlatformInventoryQueryListResp, any>({
      path: `/api/luteos/erp/inventory/tt/queryPlatformList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存
   * @name LuteosErpInventoryTtPlatformListExport
   * @summary 下载TT平台库存查询
   * @request POST:/api/luteos/erp/inventory/ttPlatformListExport
   * @response `200` `CommonRespCommonExportResp` OK
   */
  luteosErpInventoryTtPlatformListExport = (
    req: PlatformInventoryQueryListReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/luteos/erp/inventory/ttPlatformListExport`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存
   * @name LuteosErpInventoryV2InventoryAllListExport
   * @summary 下载库存240807
   * @request POST:/api/luteos/erp/inventory/v2/inventoryAllListExport
   * @response `200` `CommonRespCommonExportResp` OK
   */
  luteosErpInventoryV2InventoryAllListExport = (
    req: InventoryV2QueryListReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/luteos/erp/inventory/v2/inventoryAllListExport`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存
   * @name LuteosErpInventoryVcInventoryAllListExport
   * @summary 下载VC在库
   * @request POST:/api/luteos/erp/inventory/vc/inventoryAllListExport
   * @response `200` `CommonRespCommonExportResp` OK
   */
  luteosErpInventoryVcInventoryAllListExport = (
    req: InventoryVcQueryListReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/luteos/erp/inventory/vc/inventoryAllListExport`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存
   * @name LuteosErpInventoryVcOnWayInventoryAllListExport
   * @summary 下载VC在途库存
   * @request POST:/api/luteos/erp/inventory/vc/onWayInventoryAllListExport
   * @response `200` `CommonRespCommonExportResp` OK
   */
  luteosErpInventoryVcOnWayInventoryAllListExport = (
    req: OnWayInventoryVcQueryListReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/luteos/erp/inventory/vc/onWayInventoryAllListExport`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存
   * @name LuteosErpInventoryWalmartQueryPlatformList
   * @summary 沃尔玛平台库存查询
   * @request POST:/api/luteos/erp/inventory/walmart/queryPlatformList
   * @response `200` `PlatformInventoryQueryListResp` OK
   */
  luteosErpInventoryWalmartQueryPlatformList = (
    req: PlatformInventoryQueryListReq,
    params: RequestParams = {},
  ) =>
    this.request<PlatformInventoryQueryListResp, any>({
      path: `/api/luteos/erp/inventory/walmart/queryPlatformList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存
   * @name LuteosErpInventoryWalmartPlatformListExport
   * @summary 下载沃尔玛平台库存查询
   * @request POST:/api/luteos/erp/inventory/walmartPlatformListExport
   * @response `200` `CommonRespCommonExportResp` OK
   */
  luteosErpInventoryWalmartPlatformListExport = (
    req: PlatformInventoryQueryListReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/luteos/erp/inventory/walmartPlatformListExport`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存
   * @name LuteosErpInventoryWalmartPlatformListExport2
   * @summary 下载沃尔玛在途库存
   * @request POST:/api/luteos/erp/inventory/walmartPlatformListExport2
   * @response `200` `CommonRespCommonExportResp` OK
   */
  luteosErpInventoryWalmartPlatformListExport2 = (
    req: PlatformInventoryQueryListReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/luteos/erp/inventory/walmartPlatformListExport2`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存
   * @name LuteosErpInventoryWarehouseQueryList
   * @summary 仓库库存查询
   * @request POST:/api/luteos/erp/inventory/warehouse/queryList
   * @response `200` `WarehouseInventoryQueryListResp` OK
   */
  luteosErpInventoryWarehouseQueryList = (
    req: WarehouseInventoryQueryListReq,
    params: RequestParams = {},
  ) =>
    this.request<WarehouseInventoryQueryListResp, any>({
      path: `/api/luteos/erp/inventory/warehouse/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存
   * @name LuteosErpInventoryWarehouseListExport
   * @summary 下载仓库库存
   * @request POST:/api/luteos/erp/inventory/warehouseListExport
   * @response `200` `CommonRespCommonExportResp` OK
   */
  luteosErpInventoryWarehouseListExport = (
    req: WarehouseInventoryQueryListReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/luteos/erp/inventory/warehouseListExport`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 供应商邀请
   * @name LuteosErpInviteSupplierDelete
   * @summary 删除
   * @request POST:/api/luteos/erp/invite/supplier/delete
   * @response `200` `void` OK
   */
  luteosErpInviteSupplierDelete = (
    query: {
      /** inviteCode */
      inviteCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/luteos/erp/invite/supplier/delete`,
      method: 'POST',
      query: query,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 供应商邀请
   * @name LuteosErpInviteSupplierExport
   * @summary 导出
   * @request POST:/api/luteos/erp/invite/supplier/export
   * @response `200` `CommonExportResp` OK
   */
  luteosErpInviteSupplierExport = (req: SupplierInviteListReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/erp/invite/supplier/export`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 供应商邀请
   * @name LuteosErpInviteSupplierQueryCurrencyList
   * @summary 获取币种（无鉴权）
   * @request POST:/api/luteos/erp/invite/supplier/queryCurrencyList
   * @response `200` `CurrencyQueryResp` OK
   */
  luteosErpInviteSupplierQueryCurrencyList = (
    query?: {
      /** 货币名称 */
      currencyName?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CurrencyQueryResp, any>({
      path: `/api/luteos/erp/invite/supplier/queryCurrencyList`,
      method: 'POST',
      query: query,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 供应商邀请
   * @name LuteosErpInviteSupplierQueryDetail
   * @summary 详情
   * @request GET:/api/luteos/erp/invite/supplier/queryDetail
   * @response `200` `SupplierInviteDetailResp` OK
   */
  luteosErpInviteSupplierQueryDetail = (
    query: {
      /** code */
      code: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<SupplierInviteDetailResp, any>({
      path: `/api/luteos/erp/invite/supplier/queryDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 供应商邀请
   * @name LuteosErpInviteSupplierQueryList
   * @summary 列表查询
   * @request POST:/api/luteos/erp/invite/supplier/queryList
   * @response `200` `SupplierInviteListResp` OK
   */
  luteosErpInviteSupplierQueryList = (req: SupplierInviteListReq, params: RequestParams = {}) =>
    this.request<SupplierInviteListResp, any>({
      path: `/api/luteos/erp/invite/supplier/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 供应商邀请
   * @name LuteosErpInviteSupplierSave
   * @summary 保存数据(有鉴权获取操作用户信息)
   * @request POST:/api/luteos/erp/invite/supplier/save
   * @response `200` `void` OK
   */
  luteosErpInviteSupplierSave = (req: SupplierInviteSaveReq, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/luteos/erp/invite/supplier/save`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 供应商邀请
   * @name LuteosErpInviteSupplierSaveTemp
   * @summary 保存数据(无鉴权)
   * @request POST:/api/luteos/erp/invite/supplier/save/temp
   * @response `200` `void` OK
   */
  luteosErpInviteSupplierSaveTemp = (req: SupplierInviteSaveReq, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/luteos/erp/invite/supplier/save/temp`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 供应商邀请
   * @name LuteosErpInviteSupplierSendEmail
   * @summary 发起邀请
   * @request POST:/api/luteos/erp/invite/supplier/send/email
   * @response `200` `void` OK
   */
  luteosErpInviteSupplierSendEmail = (req: SupplierInviteInitSaveReq, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/luteos/erp/invite/supplier/send/email`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 供应商邀请
   * @name LuteosErpInviteSupplierSubmitReview
   * @summary 提交审核
   * @request POST:/api/luteos/erp/invite/supplier/submit/review
   * @response `200` `void` OK
   */
  luteosErpInviteSupplierSubmitReview = (req: SupplierInviteSaveReq, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/luteos/erp/invite/supplier/submit/review`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 供应商邀请
   * @name LuteosErpInviteSupplierSubmitReviewTemp
   * @summary 提交审核（无鉴权）
   * @request POST:/api/luteos/erp/invite/supplier/submit/review/temp
   * @response `200` `void` OK
   */
  luteosErpInviteSupplierSubmitReviewTemp = (
    req: SupplierInviteSaveReq,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/luteos/erp/invite/supplier/submit/review/temp`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 积加库存同步
   * @name LuteosErpJiJiaInventorySyncFbaListExport
   * @summary 下载FBA库存查询
   * @request POST:/api/luteos/erp/jiJiaInventorySync/fbaListExport
   * @response `200` `CommonRespCommonExportResp` OK
   */
  luteosErpJiJiaInventorySyncFbaListExport = (
    req: FbaInventoryQueryListReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/luteos/erp/jiJiaInventorySync/fbaListExport`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 积加库存同步
   * @name LuteosErpJiJiaInventorySyncProductListExport
   * @summary 下载产品库存查询
   * @request POST:/api/luteos/erp/jiJiaInventorySync/productListExport
   * @response `200` `CommonRespCommonExportResp` OK
   */
  luteosErpJiJiaInventorySyncProductListExport = (
    req: ProductInventoryQueryListReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/luteos/erp/jiJiaInventorySync/productListExport`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 积加库存同步
   * @name LuteosErpJiJiaInventorySyncQueryFbaList
   * @summary FBA库存查询
   * @request POST:/api/luteos/erp/jiJiaInventorySync/queryFbaList
   * @response `200` `FbaInventoryQueryListResp` OK
   */
  luteosErpJiJiaInventorySyncQueryFbaList = (
    req: FbaInventoryQueryListReq,
    params: RequestParams = {},
  ) =>
    this.request<FbaInventoryQueryListResp, any>({
      path: `/api/luteos/erp/jiJiaInventorySync/queryFbaList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 积加库存同步
   * @name LuteosErpJiJiaInventorySyncQueryProductList
   * @summary 产品库存查询
   * @request POST:/api/luteos/erp/jiJiaInventorySync/queryProductList
   * @response `200` `ProductInventoryQueryListResp` OK
   */
  luteosErpJiJiaInventorySyncQueryProductList = (
    req: ProductInventoryQueryListReq,
    params: RequestParams = {},
  ) =>
    this.request<ProductInventoryQueryListResp, any>({
      path: `/api/luteos/erp/jiJiaInventorySync/queryProductList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 积加库存同步
   * @name LuteosErpJiJiaInventorySyncQueryThirdList
   * @summary third库存查询
   * @request POST:/api/luteos/erp/jiJiaInventorySync/queryThirdList
   * @response `200` `ThirdInventoryQueryListResp` OK
   */
  luteosErpJiJiaInventorySyncQueryThirdList = (
    req: ThirdInventoryQueryListReq,
    params: RequestParams = {},
  ) =>
    this.request<ThirdInventoryQueryListResp, any>({
      path: `/api/luteos/erp/jiJiaInventorySync/queryThirdList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 积加库存同步
   * @name LuteosErpJiJiaInventorySyncQueryTiktokList
   * @summary tiktok库存查询
   * @request POST:/api/luteos/erp/jiJiaInventorySync/queryTiktokList
   * @response `200` `TiktokInventoryQueryListResp` OK
   */
  luteosErpJiJiaInventorySyncQueryTiktokList = (
    req: TiktokInventoryQueryListReq,
    params: RequestParams = {},
  ) =>
    this.request<TiktokInventoryQueryListResp, any>({
      path: `/api/luteos/erp/jiJiaInventorySync/queryTiktokList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 积加库存同步
   * @name LuteosErpJiJiaInventorySyncQueryTiktokShopList
   * @summary 获取tiktok店铺列表
   * @request POST:/api/luteos/erp/jiJiaInventorySync/queryTiktokShopList
   * @response `200` `TiktokInventoryShopQueryListResp` OK
   */
  luteosErpJiJiaInventorySyncQueryTiktokShopList = (
    req: TiktokInventoryQueryListReq,
    params: RequestParams = {},
  ) =>
    this.request<TiktokInventoryShopQueryListResp, any>({
      path: `/api/luteos/erp/jiJiaInventorySync/queryTiktokShopList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 积加库存同步
   * @name LuteosErpJiJiaInventorySyncQueryWalmartList
   * @summary walmart库存查询
   * @request POST:/api/luteos/erp/jiJiaInventorySync/queryWalmartList
   * @response `200` `WalmartInventoryQueryListResp` OK
   */
  luteosErpJiJiaInventorySyncQueryWalmartList = (
    req: WalmartInventoryQueryListReq,
    params: RequestParams = {},
  ) =>
    this.request<WalmartInventoryQueryListResp, any>({
      path: `/api/luteos/erp/jiJiaInventorySync/queryWalmartList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 积加库存同步
   * @name LuteosErpJiJiaInventorySyncThirdListExport
   * @summary 下载third库存查询
   * @request POST:/api/luteos/erp/jiJiaInventorySync/thirdListExport
   * @response `200` `CommonRespCommonExportResp` OK
   */
  luteosErpJiJiaInventorySyncThirdListExport = (
    req: ThirdInventoryQueryListReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/luteos/erp/jiJiaInventorySync/thirdListExport`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 积加库存同步
   * @name LuteosErpJiJiaInventorySyncTiktokListExport
   * @summary 下载tiktok库存查询
   * @request POST:/api/luteos/erp/jiJiaInventorySync/tiktokListExport
   * @response `200` `CommonRespCommonExportResp` OK
   */
  luteosErpJiJiaInventorySyncTiktokListExport = (
    req: TiktokInventoryQueryListReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/luteos/erp/jiJiaInventorySync/tiktokListExport`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 积加库存同步
   * @name LuteosErpJiJiaInventorySyncWalmartListExport
   * @summary 下载walmart库存查询
   * @request POST:/api/luteos/erp/jiJiaInventorySync/walmartListExport
   * @response `200` `CommonRespCommonExportResp` OK
   */
  luteosErpJiJiaInventorySyncWalmartListExport = (
    req: WalmartInventoryQueryListReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/luteos/erp/jiJiaInventorySync/walmartListExport`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 物流基础数据
   * @name LuteosErpLogisticsChannelAdd
   * @summary 物流渠道-新增
   * @request POST:/api/luteos/erp/logistics/channel/add
   * @response `200` `CommonRespVoid` OK
   */
  luteosErpLogisticsChannelAdd = (req: LogisticsChannelAddReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/erp/logistics/channel/add`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 物流基础数据
   * @name LuteosErpLogisticsChannelChangeStatus
   * @summary 物流渠道-启用/禁用
   * @request POST:/api/luteos/erp/logistics/channel/changeStatus
   * @response `200` `CommonRespVoid` OK
   */
  luteosErpLogisticsChannelChangeStatus = (
    req: LogisticsChannelChangeReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/erp/logistics/channel/changeStatus`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 物流基础数据
   * @name LuteosErpLogisticsChannelDetail
   * @summary 物流渠道-查询详情
   * @request GET:/api/luteos/erp/logistics/channel/detail
   * @response `200` `CommonRespLogisticsChannelDetailResp` OK
   */
  luteosErpLogisticsChannelDetail = (
    query: {
      /**
       * 渠道id
       * @format int64
       */
      channelId: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespLogisticsChannelDetailResp, any>({
      path: `/api/luteos/erp/logistics/channel/detail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 物流基础数据
   * @name LuteosErpLogisticsChannelDownTemplate
   * @summary 物流渠道-下载批量新增模板
   * @request POST:/api/luteos/erp/logistics/channel/downTemplate
   * @response `200` `CommonRespString` OK
   */
  luteosErpLogisticsChannelDownTemplate = (params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/erp/logistics/channel/downTemplate`,
      method: 'POST',
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 物流基础数据
   * @name LuteosErpLogisticsChannelDownloadSelectTemplate
   * @summary 物流渠道-选择下载批量新增模板
   * @request POST:/api/luteos/erp/logistics/channel/downloadSelectTemplate
   * @response `200` `CommonRespString` OK
   */
  luteosErpLogisticsChannelDownloadSelectTemplate = (
    req: LogisticsChannelSelectDownloadReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/erp/logistics/channel/downloadSelectTemplate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 物流基础数据
   * @name LuteosErpLogisticsChannelImport
   * @summary 物流渠道-批量上传更新
   * @request POST:/api/luteos/erp/logistics/channel/import
   * @response `200` `CommonRespVoid` OK
   */
  luteosErpLogisticsChannelImport = (req: LogisticsChannelUploadReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/erp/logistics/channel/import`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 物流基础数据
   * @name LuteosErpLogisticsChannelPriceUpdate
   * @summary 物流渠道-更新报价
   * @request POST:/api/luteos/erp/logistics/channel/price/update
   * @response `200` `CommonRespVoid` OK
   */
  luteosErpLogisticsChannelPriceUpdate = (
    req: LogisticsChannelPriceUpdateReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/erp/logistics/channel/price/update`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 物流基础数据
   * @name LuteosErpLogisticsChannelPriceUpdateVolume
   * @summary 物流渠道-更新体积报价
   * @request POST:/api/luteos/erp/logistics/channel/price/updateVolume
   * @response `200` `CommonRespVoid` OK
   */
  luteosErpLogisticsChannelPriceUpdateVolume = (
    req: LogisticsChannelVolumePriceUpdateReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/erp/logistics/channel/price/updateVolume`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 物流基础数据
   * @name LuteosErpLogisticsChannelQueryList
   * @summary 物流渠道-查询列表
   * @request POST:/api/luteos/erp/logistics/channel/queryList
   * @response `200` `LogisticsChannelListResp` OK
   */
  luteosErpLogisticsChannelQueryList = (req: LogisticsChannelListReq, params: RequestParams = {}) =>
    this.request<LogisticsChannelListResp, any>({
      path: `/api/luteos/erp/logistics/channel/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 物流基础数据
   * @name LuteosErpLogisticsChannelQueryLog
   * @summary 物流渠道-查询操作日志
   * @request GET:/api/luteos/erp/logistics/channel/queryLog
   * @response `200` `CommonRespListLogisticsOpLog` OK
   */
  luteosErpLogisticsChannelQueryLog = (
    query: {
      /**
       * 渠道id
       * @format int32
       */
      channelId: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespListLogisticsOpLog, any>({
      path: `/api/luteos/erp/logistics/channel/queryLog`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 物流基础数据
   * @name LuteosErpLogisticsChannelUpdate
   * @summary 物流渠道-修改
   * @request POST:/api/luteos/erp/logistics/channel/update
   * @response `200` `CommonRespVoid` OK
   */
  luteosErpLogisticsChannelUpdate = (req: LogisticsChannelUpdateReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/erp/logistics/channel/update`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 物流索赔管理
   * @name LuteosErpLogisticsClaimAdd
   * @summary 索赔单-新增
   * @request POST:/api/luteos/erp/logistics/claim/add
   * @response `200` `void` OK
   */
  luteosErpLogisticsClaimAdd = (req: LogisticsClaimAddReq, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/luteos/erp/logistics/claim/add`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 物流索赔管理
   * @name LuteosErpLogisticsClaimBatchInvalidate
   * @summary 索赔单-批量作废
   * @request POST:/api/luteos/erp/logistics/claim/batch/invalidate
   * @response `200` `CommonRespListOsLogisticsClaim` OK
   */
  luteosErpLogisticsClaimBatchInvalidate = (claimIds: number[], params: RequestParams = {}) =>
    this.request<CommonRespListOsLogisticsClaim, any>({
      path: `/api/luteos/erp/logistics/claim/batch/invalidate`,
      method: 'POST',
      body: claimIds,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 物流索赔管理
   * @name LuteosErpLogisticsClaimDetail
   * @summary 索赔单-查询详情
   * @request GET:/api/luteos/erp/logistics/claim/detail
   * @response `200` `CommonRespOsLogisticsClaim` OK
   */
  luteosErpLogisticsClaimDetail = (
    query: {
      /**
       * id
       * @format int64
       */
      id: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespOsLogisticsClaim, any>({
      path: `/api/luteos/erp/logistics/claim/detail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 物流索赔管理
   * @name LuteosErpLogisticsClaimInvalidate
   * @summary 索赔单-作废
   * @request POST:/api/luteos/erp/logistics/claim/invalidate
   * @response `200` `CommonRespOsLogisticsClaim` OK
   */
  luteosErpLogisticsClaimInvalidate = (
    req: LogisticsClaimInvalidateReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespOsLogisticsClaim, any>({
      path: `/api/luteos/erp/logistics/claim/invalidate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 物流索赔管理
   * @name LuteosErpLogisticsClaimLogs
   * @summary 索赔单-查询操作日志
   * @request GET:/api/luteos/erp/logistics/claim/logs
   * @response `200` `CommonRespListOsLogisticsClaimLog` OK
   */
  luteosErpLogisticsClaimLogs = (
    query: {
      /**
       * id
       * @format int64
       */
      id: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespListOsLogisticsClaimLog, any>({
      path: `/api/luteos/erp/logistics/claim/logs`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 物流索赔管理
   * @name LuteosErpLogisticsClaimQueryList
   * @summary 索赔单-分页查询列表
   * @request POST:/api/luteos/erp/logistics/claim/queryList
   * @response `200` `LogisticsClaimPageResp` OK
   */
  luteosErpLogisticsClaimQueryList = (req: LogisticsClaimQueryReq, params: RequestParams = {}) =>
    this.request<LogisticsClaimPageResp, any>({
      path: `/api/luteos/erp/logistics/claim/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 物流索赔管理
   * @name LuteosErpLogisticsClaimUpdate
   * @summary 索赔单-更新
   * @request POST:/api/luteos/erp/logistics/claim/update
   * @response `200` `void` OK
   */
  luteosErpLogisticsClaimUpdate = (req: LogisticsClaimUpdateReq, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/luteos/erp/logistics/claim/update`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 物流对账管理
   * @name LuteosErpLogisticsReconciliationCancelConfirm
   * @summary 撤销确认
   * @request POST:/api/luteos/erp/logistics/reconciliation/cancelConfirm
   * @response `200` `CommonRespVoid` OK
   */
  luteosErpLogisticsReconciliationCancelConfirm = (
    req: LogisticsReconciliationCommonReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/erp/logistics/reconciliation/cancelConfirm`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 物流对账管理
   * @name LuteosErpLogisticsReconciliationCancelPayable
   * @summary 作废应付单
   * @request POST:/api/luteos/erp/logistics/reconciliation/cancelPayable
   * @response `200` `void` OK
   */
  luteosErpLogisticsReconciliationCancelPayable = (
    payableNo: string[],
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/luteos/erp/logistics/reconciliation/cancelPayable`,
      method: 'POST',
      body: payableNo,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 物流对账管理
   * @name LuteosErpLogisticsReconciliationConfirm
   * @summary 确认对账单
   * @request POST:/api/luteos/erp/logistics/reconciliation/confirm
   * @response `200` `CommonRespVoid` OK
   */
  luteosErpLogisticsReconciliationConfirm = (
    req: LogisticsReconciliationCommonReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/erp/logistics/reconciliation/confirm`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 物流对账管理
   * @name LuteosErpLogisticsReconciliationDownload
   * @summary 下载对账单
   * @request POST:/api/luteos/erp/logistics/reconciliation/download
   * @response `200` `CommonRespVoid` OK
   */
  luteosErpLogisticsReconciliationDownload = (
    req: LogisticsReconciliationQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/erp/logistics/reconciliation/download`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 物流对账管理
   * @name LuteosErpLogisticsReconciliationGenerateEstimate
   * @summary 生成预估单
   * @request POST:/api/luteos/erp/logistics/reconciliation/generateEstimate
   * @response `200` `CommonRespVoid` OK
   */
  luteosErpLogisticsReconciliationGenerateEstimate = (params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/erp/logistics/reconciliation/generateEstimate`,
      method: 'POST',
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 物流对账管理
   * @name LuteosErpLogisticsReconciliationGeneratePayable
   * @summary 生成应付单
   * @request POST:/api/luteos/erp/logistics/reconciliation/generatePayable
   * @response `200` `void` OK
   */
  luteosErpLogisticsReconciliationGeneratePayable = (
    req: GeneratePayableReq,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/luteos/erp/logistics/reconciliation/generatePayable`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 物流对账管理
   * @name LuteosErpLogisticsReconciliationQueryList
   * @summary 查询物流对账列表
   * @request POST:/api/luteos/erp/logistics/reconciliation/queryList
   * @response `200` `LogisticsReconciliationPageResp` OK
   */
  luteosErpLogisticsReconciliationQueryList = (
    req: LogisticsReconciliationQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<LogisticsReconciliationPageResp, any>({
      path: `/api/luteos/erp/logistics/reconciliation/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 物流对账管理
   * @name LuteosErpLogisticsReconciliationRecomputeFee
   * @summary 重新计费
   * @request POST:/api/luteos/erp/logistics/reconciliation/recomputeFee
   * @response `200` `void` OK
   */
  luteosErpLogisticsReconciliationRecomputeFee = (
    req: RecomputeFeeReq,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/luteos/erp/logistics/reconciliation/recomputeFee`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 物流对账管理
   * @name LuteosErpLogisticsReconciliationUpdate
   * @summary 手动更新对账单
   * @request POST:/api/luteos/erp/logistics/reconciliation/update
   * @response `200` `CommonRespVoid` OK
   */
  luteosErpLogisticsReconciliationUpdate = (
    req: LogisticsReconciliationUpdateReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/erp/logistics/reconciliation/update`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 物流对账管理
   * @name LuteosErpLogisticsReconciliationUpload
   * @summary 上传对账单
   * @request POST:/api/luteos/erp/logistics/reconciliation/upload
   * @response `200` `CommonRespVoid` OK
   */
  luteosErpLogisticsReconciliationUpload = (req: UploadReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/erp/logistics/reconciliation/upload`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 物流基础数据
   * @name LuteosErpLogisticsSupplierAdd
   * @summary 物流供应商-新增
   * @request POST:/api/luteos/erp/logistics/supplier/add
   * @response `200` `CommonRespVoid` OK
   */
  luteosErpLogisticsSupplierAdd = (req: LogisticsSupplierAddReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/erp/logistics/supplier/add`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 物流基础数据
   * @name LuteosErpLogisticsSupplierChangeStatus
   * @summary 物流供应商-启用/禁用
   * @request POST:/api/luteos/erp/logistics/supplier/changeStatus
   * @response `200` `CommonRespVoid` OK
   */
  luteosErpLogisticsSupplierChangeStatus = (
    req: LogisticsSupplierChangeReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/erp/logistics/supplier/changeStatus`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 物流基础数据
   * @name LuteosErpLogisticsSupplierQueryAccountToken
   * @summary 物流供应商-获取登录信息
   * @request GET:/api/luteos/erp/logistics/supplier/queryAccountToken
   * @response `200` `CommonRespLogisticsSupplierAccountTokenResp` OK
   */
  luteosErpLogisticsSupplierQueryAccountToken = (
    query: {
      /** supplierCode */
      supplierCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespLogisticsSupplierAccountTokenResp, any>({
      path: `/api/luteos/erp/logistics/supplier/queryAccountToken`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 物流基础数据
   * @name LuteosErpLogisticsSupplierQueryList
   * @summary 物流供应商-查询列表
   * @request POST:/api/luteos/erp/logistics/supplier/queryList
   * @response `200` `LogisticsSupplierListResp` OK
   */
  luteosErpLogisticsSupplierQueryList = (
    req: LogisticsSupplierListReq,
    params: RequestParams = {},
  ) =>
    this.request<LogisticsSupplierListResp, any>({
      path: `/api/luteos/erp/logistics/supplier/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 物流基础数据
   * @name LuteosErpLogisticsSupplierQueryLog
   * @summary 物流供应商-查询操作日志
   * @request GET:/api/luteos/erp/logistics/supplier/queryLog
   * @response `200` `CommonRespListLogisticsOpLog` OK
   */
  luteosErpLogisticsSupplierQueryLog = (
    query: {
      /** supplierCode */
      supplierCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespListLogisticsOpLog, any>({
      path: `/api/luteos/erp/logistics/supplier/queryLog`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 物流基础数据
   * @name LuteosErpLogisticsSupplierUpdate
   * @summary 物流供应商-修改
   * @request POST:/api/luteos/erp/logistics/supplier/update
   * @response `200` `CommonRespVoid` OK
   */
  luteosErpLogisticsSupplierUpdate = (
    req: LogisticsSupplierUpdateReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/erp/logistics/supplier/update`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 物流基础数据
   * @name LuteosErpLogisticsSupplierUpdateAccountToken
   * @summary 物流供应商-手动更新token
   * @request POST:/api/luteos/erp/logistics/supplier/updateAccountToken
   * @response `200` `CommonRespLogisticsSupplierAccountTokenResp` OK
   */
  luteosErpLogisticsSupplierUpdateAccountToken = (
    req: LogisticsSupplierRefreshTokenReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespLogisticsSupplierAccountTokenResp, any>({
      path: `/api/luteos/erp/logistics/supplier/updateAccountToken`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 物流基础数据
   * @name LuteosErpLogisticsTransportAdd
   * @summary 物流方式-新增
   * @request POST:/api/luteos/erp/logistics/transport/add
   * @response `200` `CommonRespVoid` OK
   */
  luteosErpLogisticsTransportAdd = (req: LogisticsTransportAddReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/erp/logistics/transport/add`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 物流基础数据
   * @name LuteosErpLogisticsTransportChangeStatus
   * @summary 物流方式-启用/禁用
   * @request POST:/api/luteos/erp/logistics/transport/changeStatus
   * @response `200` `CommonRespVoid` OK
   */
  luteosErpLogisticsTransportChangeStatus = (
    req: LogisticsTransportChangeReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/erp/logistics/transport/changeStatus`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 物流基础数据
   * @name LuteosErpLogisticsTransportQueryList
   * @summary 物流方式-查询列表
   * @request POST:/api/luteos/erp/logistics/transport/queryList
   * @response `200` `LogisticsTransportListResp` OK
   */
  luteosErpLogisticsTransportQueryList = (
    req: LogisticsTransportListReq,
    params: RequestParams = {},
  ) =>
    this.request<LogisticsTransportListResp, any>({
      path: `/api/luteos/erp/logistics/transport/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 物流基础数据
   * @name LuteosErpLogisticsTransportQueryListV2
   * @summary 物流方式-查询列表V2
   * @request POST:/api/luteos/erp/logistics/transport/queryListV2
   * @response `200` `LogisticsTransportListV2Resp` OK
   */
  luteosErpLogisticsTransportQueryListV2 = (
    req: LogisticsTransportListV2Req,
    params: RequestParams = {},
  ) =>
    this.request<LogisticsTransportListV2Resp, any>({
      path: `/api/luteos/erp/logistics/transport/queryListV2`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 物流基础数据
   * @name LuteosErpLogisticsTransportUpdate
   * @summary 物流方式-修改
   * @request POST:/api/luteos/erp/logistics/transport/update
   * @response `200` `CommonRespVoid` OK
   */
  luteosErpLogisticsTransportUpdate = (
    req: LogisticsTransportUpdateReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/erp/logistics/transport/update`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-账户查询
   * @name LuteosErpMemberQueryDeptMemberList
   * @summary 获取部门下所有成员
   * @request GET:/api/luteos/erp/member/queryDeptMemberList
   * @response `200` `DeptMemberListQueryResp` OK
   */
  luteosErpMemberQueryDeptMemberList = (
    query?: {
      /**
       * 部门id
       * @format int64
       */
      deptId?: number;
      /** 操作业务部门编码 */
      operatorDepartmentCode?: string;
      /** 是否查询子部门 */
      searchChildDept?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<DeptMemberListQueryResp, any>({
      path: `/api/luteos/erp/member/queryDeptMemberList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-账户查询
   * @name LuteosErpMemberQueryOperationMemberList
   * @summary 获取业务编码下成员列表
   * @request POST:/api/luteos/erp/member/queryOperationMemberList
   * @response `200` `MemberListMapQueryResp` OK
   */
  luteosErpMemberQueryOperationMemberList = (
    req: OperationMemberListQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<MemberListMapQueryResp, any>({
      path: `/api/luteos/erp/member/queryOperationMemberList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-账户查询
   * @name LuteosErpMemberQuerySubDeptList
   * @summary 子级部门查询
   * @request POST:/api/luteos/erp/member/querySubDeptList
   * @response `200` `SubDeptListQueryResp` OK
   */
  luteosErpMemberQuerySubDeptList = (req: SubDeptListQueryReq, params: RequestParams = {}) =>
    this.request<SubDeptListQueryResp, any>({
      path: `/api/luteos/erp/member/querySubDeptList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 自发货订单
   * @name LuteosErpOdoCommonAbandon
   * @summary 通用作废接口
   * @request POST:/api/luteos/erp/odo/commonAbandon
   * @response `200` `CommonRespVoid` OK
   */
  luteosErpOdoCommonAbandon = (req: OdoAbondonReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/erp/odo/commonAbandon`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 自发货订单
   * @name LuteosErpOdoCommonSave
   * @summary 通用创建接口接口
   * @request POST:/api/luteos/erp/odo/commonSave
   * @response `200` `CommonRespVoid` OK
   */
  luteosErpOdoCommonSave = (req: OdoDetailSaveReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/erp/odo/commonSave`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 自发货订单
   * @name LuteosErpOdoCommonUpdate
   * @summary 通用编辑接口
   * @request POST:/api/luteos/erp/odo/commonUpdate
   * @response `200` `CommonRespVoid` OK
   */
  luteosErpOdoCommonUpdate = (req: OdoDetailUpdateReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/erp/odo/commonUpdate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 自发货订单
   * @name LuteosErpOdoDownDetail
   * @summary 下载-拣货单
   * @request POST:/api/luteos/erp/odo/downDetail
   * @response `200` `CommonRespString` OK
   */
  luteosErpOdoDownDetail = (
    query: {
      /** code */
      code: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/erp/odo/downDetail`,
      method: 'POST',
      query: query,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 自发货订单
   * @name LuteosErpOdoDownLyOrderTemplate
   * @summary 下载-领用订单导入模板
   * @request POST:/api/luteos/erp/odo/downLyOrderTemplate
   * @response `200` `CommonRespString` OK
   */
  luteosErpOdoDownLyOrderTemplate = (params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/erp/odo/downLyOrderTemplate`,
      method: 'POST',
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 自发货订单
   * @name LuteosErpOdoDownLyTrackNumTemplate
   * @summary 下载-领用跟踪号导入模板
   * @request POST:/api/luteos/erp/odo/downLyTrackNumTemplate
   * @response `200` `CommonRespString` OK
   */
  luteosErpOdoDownLyTrackNumTemplate = (params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/erp/odo/downLyTrackNumTemplate`,
      method: 'POST',
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 自发货订单
   * @name LuteosErpOdoDownPackTemplate
   * @summary 下载-装箱单模板
   * @request POST:/api/luteos/erp/odo/downPackTemplate
   * @response `200` `CommonRespString` OK
   */
  luteosErpOdoDownPackTemplate = (
    query: {
      /** code */
      code: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/erp/odo/downPackTemplate`,
      method: 'POST',
      query: query,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 自发货订单
   * @name LuteosErpOdoExportList
   * @summary 导出列表
   * @request POST:/api/luteos/erp/odo/exportList
   * @response `200` `CommonRespCommonExportResp` OK
   */
  luteosErpOdoExportList = (req: OdsListQueryReq, params: RequestParams = {}) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/luteos/erp/odo/exportList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 自发货订单
   * @name LuteosErpOdoExportPickingList
   * @summary 导出拣货单
   * @request POST:/api/luteos/erp/odo/exportPickingList
   * @response `200` `CommonRespCommonExportResp` OK
   */
  luteosErpOdoExportPickingList = (req: OdoBatchReq, params: RequestParams = {}) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/luteos/erp/odo/exportPickingList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 自发货订单
   * @name LuteosErpOdoImportLyOrder
   * @summary 批量导入领用订单
   * @request POST:/api/luteos/erp/odo/importLyOrder
   * @response `200` `ImportDataResp` OK
   */
  luteosErpOdoImportLyOrder = (req: UploadReq, params: RequestParams = {}) =>
    this.request<ImportDataResp, any>({
      path: `/api/luteos/erp/odo/importLyOrder`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 自发货订单
   * @name LuteosErpOdoImportTrackNum
   * @summary 批量导入跟踪号
   * @request POST:/api/luteos/erp/odo/importTrackNum
   * @response `200` `ImportDataResp` OK
   */
  luteosErpOdoImportTrackNum = (req: UploadReq, params: RequestParams = {}) =>
    this.request<ImportDataResp, any>({
      path: `/api/luteos/erp/odo/importTrackNum`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 自发货订单
   * @name LuteosErpOdoQueryCommonDetail
   * @summary 查询通用详情
   * @request GET:/api/luteos/erp/odo/queryCommonDetail
   * @response `200` `OdoDetailResp` OK
   */
  luteosErpOdoQueryCommonDetail = (
    query: {
      /** code */
      code: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<OdoDetailResp, any>({
      path: `/api/luteos/erp/odo/queryCommonDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 自发货订单
   * @name LuteosErpOdoQueryDetail
   * @summary 查询详情-包括草稿
   * @request GET:/api/luteos/erp/odo/queryDetail
   * @response `200` `OdoDetailAndDraftResp` OK
   */
  luteosErpOdoQueryDetail = (
    query: {
      /** code */
      code: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<OdoDetailAndDraftResp, any>({
      path: `/api/luteos/erp/odo/queryDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 自发货订单
   * @name LuteosErpOdoQueryList
   * @summary 查询列表
   * @request POST:/api/luteos/erp/odo/queryList
   * @response `200` `OdsListQueryResp` OK
   */
  luteosErpOdoQueryList = (req: OdsListQueryReq, params: RequestParams = {}) =>
    this.request<OdsListQueryResp, any>({
      path: `/api/luteos/erp/odo/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 为节省资源，对草稿/作废/待发货/已发货不做查询
   *
   * @tags 自发货订单
   * @name LuteosErpOdoQueryStockList
   * @summary 查询单据库存是否满足
   * @request POST:/api/luteos/erp/odo/queryStockList
   * @response `200` `CommonRespListErpOrderStockQueryResp` OK
   */
  luteosErpOdoQueryStockList = (erpCodeList: string[], params: RequestParams = {}) =>
    this.request<CommonRespListErpOrderStockQueryResp, any>({
      path: `/api/luteos/erp/odo/queryStockList`,
      method: 'POST',
      body: erpCodeList,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 自发货订单
   * @name LuteosErpOdoReConfirm
   * @summary 失败重试按钮
   * @request POST:/api/luteos/erp/odo/reConfirm
   * @response `200` `CommonRespVoid` OK
   */
  luteosErpOdoReConfirm = (req: OdoAbondonReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/erp/odo/reConfirm`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 自发货订单
   * @name LuteosErpOdoReceiveConfirm
   * @summary 领用单领用-验收
   * @request POST:/api/luteos/erp/odo/receiveConfirm
   * @response `200` `CommonRespVoid` OK
   */
  luteosErpOdoReceiveConfirm = (req: ErpOdoBaseReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/erp/odo/receiveConfirm`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 自发货订单
   * @name LuteosErpOdoSaveDraft
   * @summary 自发货单-保存草稿
   * @request POST:/api/luteos/erp/odo/saveDraft
   * @response `200` `CommonRespVoid` OK
   */
  luteosErpOdoSaveDraft = (req: OdoDraftSaveReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/erp/odo/saveDraft`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 自发货订单
   * @name LuteosErpOdoSaveRemark
   * @summary 保存备注
   * @request POST:/api/luteos/erp/odo/saveRemark
   * @response `200` `CommonRespString` OK
   */
  luteosErpOdoSaveRemark = (req: ErpOdoRemarkSaveReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/erp/odo/saveRemark`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 自发货订单
   * @name LuteosErpOdoStatusReverse
   * @summary 自发货单-状态扭转及保存草稿
   * @request POST:/api/luteos/erp/odo/statusReverse
   * @response `200` `CommonRespVoid` OK
   */
  luteosErpOdoStatusReverse = (req: OdoStatusReverseReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/erp/odo/statusReverse`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 自发货订单
   * @name LuteosErpOdoUploadPack
   * @summary 上传装箱单
   * @request POST:/api/luteos/erp/odo/uploadPack
   * @response `200` `CommonResp` OK
   */
  luteosErpOdoUploadPack = (req: OdoUploadPackReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/odo/uploadPack`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 自发货订单
   * @name LuteosErpOdoUploadPicking
   * @summary 领用-上传拣货单
   * @request POST:/api/luteos/erp/odo/uploadPicking
   * @response `200` `CommonResp` OK
   */
  luteosErpOdoUploadPicking = (req: OdoUploadPackReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/odo/uploadPicking`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 自发货订单
   * @name LuteosErpOdoUploadTrackNum
   * @summary 上传物流跟踪号
   * @request POST:/api/luteos/erp/odo/uploadTrackNum
   * @response `200` `CommonRespString` OK
   */
  luteosErpOdoUploadTrackNum = (req: OdoUploadTrackNumReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/erp/odo/uploadTrackNum`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 自发货订单
   * @name LuteosErpOdoV2UploadTrackNum
   * @summary 上传物流跟踪号-v2
   * @request POST:/api/luteos/erp/odo/v2/uploadTrackNum
   * @response `200` `CommonRespVoid` OK
   */
  luteosErpOdoV2UploadTrackNum = (req: OdoUploadTrackNumReq2, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/erp/odo/v2/uploadTrackNum`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name LuteosErpOrderAbandon
   * @summary 作废
   * @request POST:/api/luteos/erp/order/abandon
   * @response `200` `CommonResp` OK
   */
  luteosErpOrderAbandon = (
    query: {
      /** erpCode */
      erpCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/order/abandon`,
      method: 'POST',
      query: query,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name LuteosErpOrderAddDownTemplate
   * @summary 下载批量新增模板
   * @request POST:/api/luteos/erp/order/add/downTemplate
   * @response `200` `CommonRespString` OK
   */
  luteosErpOrderAddDownTemplate = (params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/erp/order/add/downTemplate`,
      method: 'POST',
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name LuteosErpOrderAddUpload
   * @summary 上传批量新增
   * @request POST:/api/luteos/erp/order/add/upload
   * @response `200` `CommonResp` OK
   */
  luteosErpOrderAddUpload = (req: UploadReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/order/add/upload`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name LuteosErpOrderAddUploads
   * @summary 上传批量新增,多个附件支持
   * @request POST:/api/luteos/erp/order/add/uploads
   * @response `200` `CommonResp` OK
   */
  luteosErpOrderAddUploads = (reqs: UploadReq[], params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/order/add/uploads`,
      method: 'POST',
      body: reqs,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name LuteosErpOrderAuthAndUpdate
   * @summary 审核
   * @request POST:/api/luteos/erp/order/authAndUpdate
   * @response `200` `CommonResp` OK
   */
  luteosErpOrderAuthAndUpdate = (req: OrderAuthSaveReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/order/authAndUpdate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name LuteosErpOrderBatchAbandon
   * @summary 批量作废
   * @request POST:/api/luteos/erp/order/batch/abandon
   * @response `200` `CommonRespOrderBatchAuthResp` OK
   */
  luteosErpOrderBatchAbandon = (req: OrderBatchToAbondReq, params: RequestParams = {}) =>
    this.request<CommonRespOrderBatchAuthResp, any>({
      path: `/api/luteos/erp/order/batch/abandon`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name LuteosErpOrderBatchChangeSkuList
   * @summary 批量换货查询
   * @request POST:/api/luteos/erp/order/batch/changeSkuList
   * @response `200` `OrderChangeSkuBatchToAuditResp` OK
   */
  luteosErpOrderBatchChangeSkuList = (req: OrderBatchToAuditReq, params: RequestParams = {}) =>
    this.request<OrderChangeSkuBatchToAuditResp, any>({
      path: `/api/luteos/erp/order/batch/changeSkuList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name LuteosErpOrderBatchChangeSkuListToAudit
   * @summary 批量换货
   * @request POST:/api/luteos/erp/order/batch/changeSkuListToAudit
   * @response `200` `CommonRespOrderBatchAuthResp` OK
   */
  luteosErpOrderBatchChangeSkuListToAudit = (
    req: OrderChangeSkuBatchToAuditResp,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespOrderBatchAuthResp, any>({
      path: `/api/luteos/erp/order/batch/changeSkuListToAudit`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name LuteosErpOrderBatchConfirmSend
   * @summary 批量确认发货
   * @request POST:/api/luteos/erp/order/batch/confirm/send
   * @response `200` `CommonRespOrderBatchAuthResp` OK
   */
  luteosErpOrderBatchConfirmSend = (
    orderBatchConfirmSendReq: OrderBatchConfirmSendReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespOrderBatchAuthResp, any>({
      path: `/api/luteos/erp/order/batch/confirm/send`,
      method: 'POST',
      body: orderBatchConfirmSendReq,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name LuteosErpOrderBatchSendNotice
   * @summary 发货通知
   * @request POST:/api/luteos/erp/order/batch/sendNotice
   * @response `200` `CommonRespOrderBatchSendNoticeResp` OK
   */
  luteosErpOrderBatchSendNotice = (req: OrderBatchSendNoticeReq, params: RequestParams = {}) =>
    this.request<CommonRespOrderBatchSendNoticeResp, any>({
      path: `/api/luteos/erp/order/batch/sendNotice`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name LuteosErpOrderBatchToAudit
   * @summary 批量转待审核
   * @request POST:/api/luteos/erp/order/batch/toAudit
   * @response `200` `CommonRespOrderBatchAuthResp` OK
   */
  luteosErpOrderBatchToAudit = (req: OrderBatchToAuditReq, params: RequestParams = {}) =>
    this.request<CommonRespOrderBatchAuthResp, any>({
      path: `/api/luteos/erp/order/batch/toAudit`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name LuteosErpOrderBatchToWaitSend
   * @summary 批量转待发货
   * @request POST:/api/luteos/erp/order/batch/toWaitSend
   * @response `200` `CommonRespOrderBatchToWaitSendResp` OK
   */
  luteosErpOrderBatchToWaitSend = (req: OrderBatchToWaitSendReq, params: RequestParams = {}) =>
    this.request<CommonRespOrderBatchToWaitSendResp, any>({
      path: `/api/luteos/erp/order/batch/toWaitSend`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name LuteosErpOrderBatchUpdate
   * @summary 批量审核
   * @request POST:/api/luteos/erp/order/batch/update
   * @response `200` `CommonRespOrderBatchAuthResp` OK
   */
  luteosErpOrderBatchUpdate = (orderBatchAuthReq: OrderBatchAuthReq, params: RequestParams = {}) =>
    this.request<CommonRespOrderBatchAuthResp, any>({
      path: `/api/luteos/erp/order/batch/update`,
      method: 'POST',
      body: orderBatchAuthReq,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 输入订单号列表，批量打包导出订单附件
   *
   * @tags ERP订单
   * @name LuteosErpOrderBatchDownloadAttachment
   * @summary 批量下载订单附件
   * @request POST:/api/luteos/erp/order/batchDownloadAttachment
   * @response `200` `CommonExportResp` OK
   */
  luteosErpOrderBatchDownloadAttachment = (
    req: DownloadOrderAttachmentUrlReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/erp/order/batchDownloadAttachment`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name LuteosErpOrderBatchToFba
   * @summary 批量转FBA
   * @request POST:/api/luteos/erp/order/batchToFba
   * @response `200` `CommonRespVoid` OK
   */
  luteosErpOrderBatchToFba = (req: OrderBatchToFbaReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/erp/order/batchToFba`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name LuteosErpOrderBindingOrderWarehouseAndShipReq
   * @summary 绑定发货仓库配送方式
   * @request POST:/api/luteos/erp/order/bindingOrderWarehouseAndShipReq
   * @response `200` `CommonRespVoid` OK
   */
  luteosErpOrderBindingOrderWarehouseAndShipReq = (
    req: OrderBindingWarehouseAndShipReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/erp/order/bindingOrderWarehouseAndShipReq`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name LuteosErpOrderChangeSku
   * @summary 换货
   * @request POST:/api/luteos/erp/order/changeSku
   * @response `200` `CommonRespVoid` OK
   */
  luteosErpOrderChangeSku = (req: OrderChangeSkuReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/erp/order/changeSku`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name LuteosErpOrderChangeWarehouseParamStaus
   * @summary 绑定发货仓库状态变更
   * @request POST:/api/luteos/erp/order/changeWarehouseParamStaus
   * @response `200` `CommonRespVoid` OK
   */
  luteosErpOrderChangeWarehouseParamStaus = (
    req: ErpOrderWpUpdateStatusReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/erp/order/changeWarehouseParamStaus`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name LuteosErpOrderDeleteAtt
   * @summary 删除附件
   * @request GET:/api/luteos/erp/order/delete/att
   * @response `200` `CommonResp` OK
   */
  luteosErpOrderDeleteAtt = (
    query: {
      /**
       * id
       * @format int64
       */
      id: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/order/delete/att`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name LuteosErpOrderDownUpdateAddressTemplate
   * @summary 下载批量修改地址模板
   * @request POST:/api/luteos/erp/order/downUpdateAddressTemplate
   * @response `200` `CommonRespString` OK
   */
  luteosErpOrderDownUpdateAddressTemplate = (
    req: SampleOrderV3ListQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/erp/order/downUpdateAddressTemplate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name LuteosErpOrderDownUpdateAuthTemplate
   * @summary 下载编辑审核模板
   * @request POST:/api/luteos/erp/order/downUpdateAuthTemplate
   * @response `200` `CommonRespString` OK
   */
  luteosErpOrderDownUpdateAuthTemplate = (
    req: SampleOrderV3ListQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/erp/order/downUpdateAuthTemplate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name LuteosErpOrderExportQueryAllChannelList
   * @summary 导出-全渠道订单查询
   * @request POST:/api/luteos/erp/order/exportQueryAllChannelList
   * @response `200` `CommonExportResp` OK
   */
  luteosErpOrderExportQueryAllChannelList = (
    req: ErpOrderAllChannelQueryListReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/erp/order/exportQueryAllChannelList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name LuteosErpOrderExportWarehouseParamList
   * @summary 绑定发货仓库列表-导出
   * @request POST:/api/luteos/erp/order/exportWarehouseParamList
   * @response `200` `CommonRespCommonExportResp` OK
   */
  luteosErpOrderExportWarehouseParamList = (
    req: ErpOrderWpQueryListReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/luteos/erp/order/exportWarehouseParamList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name LuteosErpOrderFbaRetry
   * @summary 异常重推fba
   * @request POST:/api/luteos/erp/order/fba/retry
   * @response `200` `CommonResp` OK
   */
  luteosErpOrderFbaRetry = (
    query: {
      /** orderCode */
      orderCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/order/fba/retry`,
      method: 'POST',
      query: query,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name LuteosErpOrderFreightRuleHit
   * @summary 运费规则命中
   * @request POST:/api/luteos/erp/order/freightRuleHit
   * @response `200` `CommonRespErpFlowDetailQueryResp` OK
   */
  luteosErpOrderFreightRuleHit = (req: ErpOrderFreightRuleBean[], params: RequestParams = {}) =>
    this.request<CommonRespErpFlowDetailQueryResp, any>({
      path: `/api/luteos/erp/order/freightRuleHit`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name LuteosErpOrderJijiaRePush
   * @summary 异常单据重推积加
   * @request POST:/api/luteos/erp/order/jijia/rePush
   * @response `200` `CommonRespObject` OK
   */
  luteosErpOrderJijiaRePush = (orderCodes: string[], params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/erp/order/jijia/rePush`,
      method: 'POST',
      body: orderCodes,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name LuteosErpOrderModifyWarehouseLogistics
   * @summary 批量设置仓库物流
   * @request POST:/api/luteos/erp/order/modifyWarehouseLogistics
   * @response `200` `CommonRespString` OK
   */
  luteosErpOrderModifyWarehouseLogistics = (
    req: ModifyWarehouseLogisticsReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/erp/order/modifyWarehouseLogistics`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name LuteosErpOrderOrderAttachUpload
   * @summary 批量上传订单附件
   * @request POST:/api/luteos/erp/order/order/attach/upload
   * @response `200` `CommonResp` OK
   */
  luteosErpOrderOrderAttachUpload = (req: OrderUpdateUploadReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/order/order/attach/upload`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name LuteosErpOrderOrderDownload
   * @summary 导出订单
   * @request POST:/api/luteos/erp/order/order/download
   * @response `200` `CommonExportResp` OK
   */
  luteosErpOrderOrderDownload = (req: SampleOrderV3ListQueryReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/erp/order/order/download`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name LuteosErpOrderPreCheckInventory
   * @summary 预校验库存
   * @request POST:/api/luteos/erp/order/preCheckInventory
   * @response `200` `CommonRespErpOrderPreCheckInventoryResp` OK
   */
  luteosErpOrderPreCheckInventory = (
    req: ErpOrderPreCheckInventoryReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespErpOrderPreCheckInventoryResp, any>({
      path: `/api/luteos/erp/order/preCheckInventory`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name LuteosErpOrderPreCheckStock
   * @summary 批量下单到物流-预校验库存
   * @request POST:/api/luteos/erp/order/preCheckStock
   * @response `200` `CommonRespOrderPreCheckStockResp` OK
   */
  luteosErpOrderPreCheckStock = (req: OrderPreCheckStockReq, params: RequestParams = {}) =>
    this.request<CommonRespOrderPreCheckStockResp, any>({
      path: `/api/luteos/erp/order/preCheckStock`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name LuteosErpOrderQueryAllChannelList
   * @summary 全渠道订单查询
   * @request POST:/api/luteos/erp/order/queryAllChannelList
   * @response `200` `AllChannelOrderListQueryResp` OK
   */
  luteosErpOrderQueryAllChannelList = (
    req: ErpOrderAllChannelQueryListReq,
    params: RequestParams = {},
  ) =>
    this.request<AllChannelOrderListQueryResp, any>({
      path: `/api/luteos/erp/order/queryAllChannelList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name LuteosErpOrderQueryAllShipping
   * @summary 获取所有配送方式
   * @request GET:/api/luteos/erp/order/queryAllShipping
   * @response `200` `CommonRespListErpDictBean` OK
   */
  luteosErpOrderQueryAllShipping = (
    query: {
      /**
       * 类型：0-红人发样单 1-线下订单 2-TT订单
       * @format int32
       */
      type: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespListErpDictBean, any>({
      path: `/api/luteos/erp/order/queryAllShipping`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name LuteosErpOrderQueryAllWarehouse
   * @summary 获取所有发货仓库
   * @request GET:/api/luteos/erp/order/queryAllWarehouse
   * @response `200` `CommonRespListErpDictBean` OK
   */
  luteosErpOrderQueryAllWarehouse = (
    query: {
      /**
       * 类型：0-红人发样单 1-线下订单 2-TT订单
       * @format int32
       */
      type: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespListErpDictBean, any>({
      path: `/api/luteos/erp/order/queryAllWarehouse`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name LuteosErpOrderQueryBatchFba
   * @summary 查询批量转FBA详情
   * @request POST:/api/luteos/erp/order/queryBatchFba
   * @response `200` `OrderBatchFbaDetailResp` OK
   */
  luteosErpOrderQueryBatchFba = (req: QueryOrderBatchToFbaReq, params: RequestParams = {}) =>
    this.request<OrderBatchFbaDetailResp, any>({
      path: `/api/luteos/erp/order/queryBatchFba`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name LuteosErpOrderQueryDetail
   * @summary 查询详情
   * @request GET:/api/luteos/erp/order/queryDetail
   * @response `200` `OrderDetailResp` OK
   */
  luteosErpOrderQueryDetail = (
    query: {
      /** erpCode */
      erpCode: string;
      /**
       * searchEdit
       * @default true
       */
      searchEdit?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<OrderDetailResp, any>({
      path: `/api/luteos/erp/order/queryDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name LuteosErpOrderQueryList
   * @summary 查询列表
   * @request POST:/api/luteos/erp/order/queryList
   * @response `200` `OrderListQueryResp` OK
   */
  luteosErpOrderQueryList = (req: SampleOrderV3ListQueryReq, params: RequestParams = {}) =>
    this.request<OrderListQueryResp, any>({
      path: `/api/luteos/erp/order/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name LuteosErpOrderQueryStockAvailable
   * @summary 查询库存可用量
   * @request POST:/api/luteos/erp/order/queryStockAvailable
   * @response `200` `CommonRespOrderQueryStockAvailableResp` OK
   */
  luteosErpOrderQueryStockAvailable = (
    req: OrderQueryStockAvailableReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespOrderQueryStockAvailableResp, any>({
      path: `/api/luteos/erp/order/queryStockAvailable`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 为节省资源，对草稿/作废/待发货/已发货不做查询
   *
   * @tags ERP订单
   * @name LuteosErpOrderQueryStockList
   * @summary 查询单据库存是否满足
   * @request POST:/api/luteos/erp/order/queryStockList
   * @response `200` `CommonRespListErpOrderStockQueryResp` OK
   */
  luteosErpOrderQueryStockList = (erpCodeList: string[], params: RequestParams = {}) =>
    this.request<CommonRespListErpOrderStockQueryResp, any>({
      path: `/api/luteos/erp/order/queryStockList`,
      method: 'POST',
      body: erpCodeList,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name LuteosErpOrderQueryWarehouseLogistics
   * @summary 查询订单仓库物流
   * @request POST:/api/luteos/erp/order/queryWarehouseLogistics
   * @response `200` `(ReferenceParamsDeliveryMapResp)[]` OK
   */
  luteosErpOrderQueryWarehouseLogistics = (
    req: QueryWarehouseLogisticsReq,
    params: RequestParams = {},
  ) =>
    this.request<ReferenceParamsDeliveryMapResp[], any>({
      path: `/api/luteos/erp/order/queryWarehouseLogistics`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name LuteosErpOrderQueryWarehouseParamList
   * @summary 查询绑定发货仓库列表
   * @request POST:/api/luteos/erp/order/queryWarehouseParamList
   * @response `200` `ErpOrderWpQueryListResp` OK
   */
  luteosErpOrderQueryWarehouseParamList = (
    req: ErpOrderWpQueryListReq,
    params: RequestParams = {},
  ) =>
    this.request<ErpOrderWpQueryListResp, any>({
      path: `/api/luteos/erp/order/queryWarehouseParamList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name LuteosErpOrderRePush
   * @summary 订单重推第三方系统
   * @request POST:/api/luteos/erp/order/rePush
   * @response `200` `CommonRespObject` OK
   */
  luteosErpOrderRePush = (erpCodes: string[], params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/erp/order/rePush`,
      method: 'POST',
      body: erpCodes,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name LuteosErpOrderReferenceParams
   * @summary 引用特殊参数
   * @request GET:/api/luteos/erp/order/reference/params
   * @response `200` `ErpOrderReferenceParamsResp` OK
   */
  luteosErpOrderReferenceParams = (
    query: {
      /** countryCode */
      countryCode?: string;
      /**
       * 类型：0-红人发样单 1-线下订单 2-TT订单
       * @format int32
       */
      type: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<ErpOrderReferenceParamsResp, any>({
      path: `/api/luteos/erp/order/reference/params`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name LuteosErpOrderReferenceParamsByNoSkuCode
   * @summary 无领用订单商品下拉框
   * @request POST:/api/luteos/erp/order/reference/paramsByNoSkuCode
   * @response `200` `NavigationParam` OK
   */
  luteosErpOrderReferenceParamsByNoSkuCode = (params: RequestParams = {}) =>
    this.request<NavigationParam, any>({
      path: `/api/luteos/erp/order/reference/paramsByNoSkuCode`,
      method: 'POST',
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name LuteosErpOrderReferenceParamsBySkuCode
   * @summary 引用特殊参数-按skucode过滤
   * @request POST:/api/luteos/erp/order/reference/paramsBySkuCode
   * @response `200` `ReferenceParamsDeliveryMapResp` OK
   */
  luteosErpOrderReferenceParamsBySkuCode = (
    req: ReferenceParamsDeliveryReq,
    params: RequestParams = {},
  ) =>
    this.request<ReferenceParamsDeliveryMapResp, any>({
      path: `/api/luteos/erp/order/reference/paramsBySkuCode`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name LuteosErpOrderSave
   * @summary 新增
   * @request POST:/api/luteos/erp/order/save
   * @response `200` `CommonRespString` OK
   */
  luteosErpOrderSave = (req: OrderSaveReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/erp/order/save`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name LuteosErpOrderSaveDraft
   * @summary 新增草稿
   * @request POST:/api/luteos/erp/order/saveDraft
   * @response `200` `CommonRespString` OK
   */
  luteosErpOrderSaveDraft = (req: OrderSaveReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/erp/order/saveDraft`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name LuteosErpOrderSaveRemark
   * @summary 保存备注
   * @request POST:/api/luteos/erp/order/saveRemark
   * @response `200` `CommonRespString` OK
   */
  luteosErpOrderSaveRemark = (req: OrderRemarkSaveReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/erp/order/saveRemark`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-订单-运输方式
   * @name LuteosErpOrderShipmentOptionalQueryList
   * @summary 查询所有运输方式下拉列表
   * @request GET:/api/luteos/erp/order/shipment/optional/queryList
   * @response `200` `(DictCommonBean)[]` OK
   */
  luteosErpOrderShipmentOptionalQueryList = (params: RequestParams = {}) =>
    this.request<DictCommonBean[], any>({
      path: `/api/luteos/erp/order/shipment/optional/queryList`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-订单-运输方式
   * @name LuteosErpOrderShipmentQueryList
   * @summary 查询列表
   * @request POST:/api/luteos/erp/order/shipment/queryList
   * @response `200` `ShippingMethodListQueryResp` OK
   */
  luteosErpOrderShipmentQueryList = (req: ShippingMethodListQueryReq, params: RequestParams = {}) =>
    this.request<ShippingMethodListQueryResp, any>({
      path: `/api/luteos/erp/order/shipment/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-订单-运输方式
   * @name LuteosErpOrderShipmentQuerySpList
   * @summary 查询服务商列表
   * @request POST:/api/luteos/erp/order/shipment/querySpList
   * @response `200` `SpListQueryResp` OK
   */
  luteosErpOrderShipmentQuerySpList = (req: SpListQueryReq, params: RequestParams = {}) =>
    this.request<SpListQueryResp, any>({
      path: `/api/luteos/erp/order/shipment/querySpList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-订单-运输方式
   * @name LuteosErpOrderShipmentQueryWarehouseShipList
   * @summary 查询仓库运输方式列表
   * @request POST:/api/luteos/erp/order/shipment/queryWarehouseShipList
   * @response `200` `CommonRespWarehouseShipResp` OK
   */
  luteosErpOrderShipmentQueryWarehouseShipList = (
    req: WarehouseShipListQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespWarehouseShipResp, any>({
      path: `/api/luteos/erp/order/shipment/queryWarehouseShipList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-订单-运输方式
   * @name LuteosErpOrderShipmentUpdate
   * @summary 编辑
   * @request POST:/api/luteos/erp/order/shipment/update
   * @deprecated
   * @response `200` `CommonRespVoid` OK
   */
  luteosErpOrderShipmentUpdate = (req: ShippingMethodSaveReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/erp/order/shipment/update`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-订单-运输方式
   * @name LuteosErpOrderShipmentUpdateSmwp
   * @summary 编辑运输方式
   * @request POST:/api/luteos/erp/order/shipment/updateSmwp
   * @response `200` `CommonRespVoid` OK
   */
  luteosErpOrderShipmentUpdateSmwp = (req: SmwpUpdateReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/erp/order/shipment/updateSmwp`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-shopify订单
   * @name LuteosErpOrderShopifyCancel
   * @summary webhook专用-取消shopify订单
   * @request POST:/api/luteos/erp/order/shopify/cancel
   * @response `200` `DubboCommonRespString` OK
   */
  luteosErpOrderShopifyCancel = (req: ShopifyOrderReq, params: RequestParams = {}) =>
    this.request<DubboCommonRespString, any>({
      path: `/api/luteos/erp/order/shopify/cancel`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-shopify订单
   * @name LuteosErpOrderShopifyMockSave
   * @summary webhook专用-创建shopify订单-重新生成订单-生成不支持
   * @request GET:/api/luteos/erp/order/shopify/mock/save
   * @response `200` `CommonRespString` OK
   */
  luteosErpOrderShopifyMockSave = (
    query?: {
      /** erpCode */
      erpCode?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/erp/order/shopify/mock/save`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-shopify订单
   * @name LuteosErpOrderShopifyModify
   * @summary webhook专用-修改shopify订单
   * @request POST:/api/luteos/erp/order/shopify/modify
   * @response `200` `DubboCommonRespString` OK
   */
  luteosErpOrderShopifyModify = (req: ShopifyOrderReq, params: RequestParams = {}) =>
    this.request<DubboCommonRespString, any>({
      path: `/api/luteos/erp/order/shopify/modify`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-shopify订单
   * @name LuteosErpOrderShopifySave
   * @summary webhook专用-创建shopify订单
   * @request POST:/api/luteos/erp/order/shopify/save
   * @response `200` `DubboCommonRespString` OK
   */
  luteosErpOrderShopifySave = (req: ShopifyOrderReq, params: RequestParams = {}) =>
    this.request<DubboCommonRespString, any>({
      path: `/api/luteos/erp/order/shopify/save`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name LuteosErpOrderSubOrder
   * @summary 拆单
   * @request POST:/api/luteos/erp/order/subOrder
   * @response `200` `CommonResp` OK
   */
  luteosErpOrderSubOrder = (req: OrderSubReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/order/subOrder`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-自动创建调拨单
   * @name LuteosErpOrderTransferCopySave
   * @summary 复制保存
   * @request POST:/api/luteos/erp/order/transfer/copySave
   * @response `200` `CommonRespVoid` OK
   */
  luteosErpOrderTransferCopySave = (
    req: ErpOrderTransferCopySaveReq[],
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/erp/order/transfer/copySave`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-自动创建调拨单
   * @name LuteosErpOrderTransferCreateThirdCode
   * @summary 创建调拨单号
   * @request POST:/api/luteos/erp/order/transfer/createThirdCode
   * @response `200` `CommonRespVoid` OK
   */
  luteosErpOrderTransferCreateThirdCode = (
    req: ErpOrderTransferThirdCodeReq[],
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/erp/order/transfer/createThirdCode`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-自动创建调拨单
   * @name LuteosErpOrderTransferDelete
   * @summary 删除
   * @request POST:/api/luteos/erp/order/transfer/delete
   * @response `200` `CommonRespVoid` OK
   */
  luteosErpOrderTransferDelete = (req: ErpOrderTransferDeleteReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/erp/order/transfer/delete`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-自动创建调拨单
   * @name LuteosErpOrderTransferDownloadTemplate
   * @summary 下载调拨单上传模板
   * @request POST:/api/luteos/erp/order/transfer/downloadTemplate
   * @response `200` `CommonRespString` OK
   */
  luteosErpOrderTransferDownloadTemplate = (params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/erp/order/transfer/downloadTemplate`,
      method: 'POST',
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-自动创建调拨单
   * @name LuteosErpOrderTransferExportFile
   * @summary 调拨单导出
   * @request POST:/api/luteos/erp/order/transfer/exportFile
   * @response `200` `CommonExportResp` OK
   */
  luteosErpOrderTransferExportFile = (
    req: ErpOrderTransferListQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/erp/order/transfer/exportFile`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-自动创建调拨单
   * @name LuteosErpOrderTransferImportTransfer
   * @summary 调拨单导入
   * @request POST:/api/luteos/erp/order/transfer/importTransfer
   * @response `200` `ImportDataResp` OK
   */
  luteosErpOrderTransferImportTransfer = (req: UploadReq, params: RequestParams = {}) =>
    this.request<ImportDataResp, any>({
      path: `/api/luteos/erp/order/transfer/importTransfer`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-自动创建调拨单
   * @name LuteosErpOrderTransferQueryDetail
   * @summary 调拨单详情
   * @request POST:/api/luteos/erp/order/transfer/queryDetail
   * @response `200` `ErpOrderTransferDetailQueryResp` OK
   */
  luteosErpOrderTransferQueryDetail = (
    query: {
      /** transferId */
      transferId: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<ErpOrderTransferDetailQueryResp, any>({
      path: `/api/luteos/erp/order/transfer/queryDetail`,
      method: 'POST',
      query: query,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-自动创建调拨单
   * @name LuteosErpOrderTransferQueryList
   * @summary 调拨单列表
   * @request POST:/api/luteos/erp/order/transfer/queryList
   * @response `200` `ErpOrderTransferListQueryResp` OK
   */
  luteosErpOrderTransferQueryList = (
    req: ErpOrderTransferListQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<ErpOrderTransferListQueryResp, any>({
      path: `/api/luteos/erp/order/transfer/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-自动创建调拨单
   * @name LuteosErpOrderTransferQueryLogList
   * @summary 查询日志
   * @request GET:/api/luteos/erp/order/transfer/queryLogList
   * @response `200` `ErpOrderTransferLogQueryResp` OK
   */
  luteosErpOrderTransferQueryLogList = (
    query: {
      /** transferId */
      transferId: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<ErpOrderTransferLogQueryResp, any>({
      path: `/api/luteos/erp/order/transfer/queryLogList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-自动创建调拨单
   * @name LuteosErpOrderTransferSave
   * @summary 保存
   * @request POST:/api/luteos/erp/order/transfer/save
   * @response `200` `CommonRespVoid` OK
   */
  luteosErpOrderTransferSave = (req: ErpOrderTransferSaveReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/erp/order/transfer/save`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-自动创建调拨单
   * @name LuteosErpOrderTransferUpdateApprovalStatus
   * @summary 更改审核状态
   * @request POST:/api/luteos/erp/order/transfer/updateApprovalStatus
   * @response `200` `CommonRespVoid` OK
   */
  luteosErpOrderTransferUpdateApprovalStatus = (
    req: ErpOrderTransferApprovalStatusReq[],
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/erp/order/transfer/updateApprovalStatus`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-自动创建调拨单
   * @name LuteosErpOrderTransferUpdateGroupCode
   * @summary 更改分组号
   * @request POST:/api/luteos/erp/order/transfer/updateGroupCode
   * @response `200` `CommonRespVoid` OK
   */
  luteosErpOrderTransferUpdateGroupCode = (
    req: ErpOrderTransferGroupCodeReq[],
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/erp/order/transfer/updateGroupCode`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-自动创建调拨单
   * @name LuteosErpOrderTransferUpdateTransport
   * @summary 批量更新物流方式
   * @request POST:/api/luteos/erp/order/transfer/updateTransport
   * @response `200` `CommonRespVoid` OK
   */
  luteosErpOrderTransferUpdateTransport = (
    req: ErpOrderTransferTransportReq[],
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/erp/order/transfer/updateTransport`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name LuteosErpOrderUpdate
   * @summary 编辑
   * @request POST:/api/luteos/erp/order/update
   * @response `200` `CommonRespString` OK
   */
  luteosErpOrderUpdate = (req: OrderSaveReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/erp/order/update`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name LuteosErpOrderUpdateAddressUpload
   * @summary 上传修改订单地址
   * @request POST:/api/luteos/erp/order/update/address/upload
   * @response `200` `CommonResp` OK
   */
  luteosErpOrderUpdateAddressUpload = (req: UploadReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/order/update/address/upload`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name LuteosErpOrderUpdateAuthBatch
   * @summary 批量编辑审核
   * @request POST:/api/luteos/erp/order/updateAuthBatch
   * @response `200` `CommonResp` OK
   */
  luteosErpOrderUpdateAuthBatch = (req: OrderBatchUpdateAuthReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/order/updateAuthBatch`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name LuteosErpOrderUpdateCustomRemark
   * @summary 修改客服备注
   * @request POST:/api/luteos/erp/order/updateCustomRemark
   * @response `200` `CommonResp` OK
   */
  luteosErpOrderUpdateCustomRemark = (req: OrderRemarkReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/order/updateCustomRemark`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name LuteosErpOrderUpdateWarehouseParam
   * @summary 绑定发货仓库
   * @request POST:/api/luteos/erp/order/updateWarehouseParam
   * @deprecated
   * @response `200` `CommonRespVoid` OK
   */
  luteosErpOrderUpdateWarehouseParam = (req: ErpOrderWpUpdateReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/erp/order/updateWarehouseParam`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags VC订单
   * @name LuteosErpOrderVcQueryList
   * @summary 查询列表
   * @request POST:/api/luteos/erp/order/vc/queryList
   * @response `200` `VcOrderListQueryResp` OK
   */
  luteosErpOrderVcQueryList = (req: VcOrderListQueryReq, params: RequestParams = {}) =>
    this.request<VcOrderListQueryResp, any>({
      path: `/api/luteos/erp/order/vc/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name LuteosErpOrderWarehouseRuleHit
   * @summary 分仓规则命中
   * @request POST:/api/luteos/erp/order/warehouseRuleHit
   * @response `200` `CommonRespListWarehouseRuleOutBean` OK
   */
  luteosErpOrderWarehouseRuleHit = (req: ErpOrderWarehouseRuleBean, params: RequestParams = {}) =>
    this.request<CommonRespListWarehouseRuleOutBean, any>({
      path: `/api/luteos/erp/order/warehouseRuleHit`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销售出库
   * @name LuteosErpOutboundQueryDetail
   * @summary 详情查询
   * @request POST:/api/luteos/erp/outbound/queryDetail
   * @response `200` `SaleOutboundOrderDetailResp` OK
   */
  luteosErpOutboundQueryDetail = (req: SaleOutboundOrderDetailReq, params: RequestParams = {}) =>
    this.request<SaleOutboundOrderDetailResp, any>({
      path: `/api/luteos/erp/outbound/queryDetail`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销售出库
   * @name LuteosErpOutboundQueryList
   * @summary 列表查询
   * @request POST:/api/luteos/erp/outbound/queryList
   * @response `200` `SaleOutboundOrderResp` OK
   */
  luteosErpOutboundQueryList = (req: SaleOutboundOrderReq, params: RequestParams = {}) =>
    this.request<SaleOutboundOrderResp, any>({
      path: `/api/luteos/erp/outbound/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销售出库
   * @name LuteosErpOutboundToList
   * @summary 枚举
   * @request POST:/api/luteos/erp/outbound/toList
   * @response `200` `Record<string,object>` OK
   */
  luteosErpOutboundToList = (params: RequestParams = {}) =>
    this.request<Record<string, object>, any>({
      path: `/api/luteos/erp/outbound/toList`,
      method: 'POST',
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 箱唛托唛
   * @name LuteosErpPackageBatchUpdateAddress
   * @summary 批量修改发货地址和订单地址
   * @request POST:/api/luteos/erp/package/batchUpdateAddress
   * @response `200` `CommonResp` OK
   */
  luteosErpPackageBatchUpdateAddress = (req: BatchUpdateAddressReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/package/batchUpdateAddress`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 箱唛托唛
   * @name LuteosErpPackageCheckOrderList
   * @summary 来源订单选择合法性校验
   * @request POST:/api/luteos/erp/package/checkOrderList
   * @response `200` `CommonRespBoolean` OK
   */
  luteosErpPackageCheckOrderList = (
    req: PackageChooseOrderListCheckReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespBoolean, any>({
      path: `/api/luteos/erp/package/checkOrderList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 箱唛托唛
   * @name LuteosErpPackageConfirmPackageMark
   * @summary 确认并生成新的箱唛
   * @request POST:/api/luteos/erp/package/confirmPackageMark
   * @response `200` `CommonRespString` OK
   */
  luteosErpPackageConfirmPackageMark = (req: PackageMarkConfirmReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/erp/package/confirmPackageMark`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 箱唛托唛
   * @name LuteosErpPackageConfirmPackageMarkV2
   * @summary 保存箱唛文件
   * @request POST:/api/luteos/erp/package/confirmPackageMarkV2
   * @response `200` `CommonRespObject` OK
   */
  luteosErpPackageConfirmPackageMarkV2 = (
    req: PackageMarkConfirmV2Req,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/erp/package/confirmPackageMarkV2`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 箱唛托唛
   * @name LuteosErpPackageConfirmPackageOrder
   * @summary 确认装箱单
   * @request POST:/api/luteos/erp/package/confirmPackageOrder
   * @response `200` `CommonRespString` OK
   */
  luteosErpPackageConfirmPackageOrder = (req: PackageOrderUpdateReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/erp/package/confirmPackageOrder`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 箱唛托唛
   * @name LuteosErpPackageConfirmPalletFile
   * @summary 托唛-保存托唛文件
   * @request POST:/api/luteos/erp/package/confirmPalletFile
   * @response `200` `CommonRespObject` OK
   */
  luteosErpPackageConfirmPalletFile = (req: PalletMarkFileConfirmReq, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/erp/package/confirmPalletFile`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 箱唛托唛
   * @name LuteosErpPackageConfirmPalletMark
   * @summary 托唛-确认&生成托唛
   * @request POST:/api/luteos/erp/package/confirmPalletMark
   * @response `200` `CommonRespString` OK
   */
  luteosErpPackageConfirmPalletMark = (req: PalletMarkConfirmReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/erp/package/confirmPalletMark`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 箱唛托唛
   * @name LuteosErpPackageConfirmPalletOrder
   * @summary 托唛-确认打托单
   * @request POST:/api/luteos/erp/package/confirmPalletOrder
   * @response `200` `CommonRespString` OK
   */
  luteosErpPackageConfirmPalletOrder = (req: PalletOrderUpdateReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/erp/package/confirmPalletOrder`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 箱唛托唛
   * @name LuteosErpPackageDeleteZipPackage
   * @summary 删除箱托记录
   * @request POST:/api/luteos/erp/package/deleteZipPackage
   * @response `200` `CommonResp` OK
   */
  luteosErpPackageDeleteZipPackage = (req: PalletPackageDeleteReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/package/deleteZipPackage`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 箱唛托唛
   * @name LuteosErpPackageDownLoadPackageMakFile
   * @summary 下载箱唛文件
   * @request POST:/api/luteos/erp/package/downLoadPackageMakFile
   * @response `200` `CommonRespString` OK
   */
  luteosErpPackageDownLoadPackageMakFile = (
    req: PackageMarkDownLoadReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/erp/package/downLoadPackageMakFile`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 箱唛托唛
   * @name LuteosErpPackageDownLoadPalletDetail
   * @summary 托唛-导出打托单明细
   * @request POST:/api/luteos/erp/package/downLoadPalletDetail
   * @response `200` `CommonRespString` OK
   */
  luteosErpPackageDownLoadPalletDetail = (
    req: PalletDetailDownLoadReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/erp/package/downLoadPalletDetail`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 箱唛托唛
   * @name LuteosErpPackageDownLoadPalletTemplate
   * @summary 托唛-导出打托单模板
   * @request POST:/api/luteos/erp/package/downLoadPalletTemplate
   * @response `200` `CommonRespString` OK
   */
  luteosErpPackageDownLoadPalletTemplate = (req: PalletTemplateReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/erp/package/downLoadPalletTemplate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 箱唛托唛
   * @name LuteosErpPackageDownPackageOrder
   * @summary 下载装箱单
   * @request POST:/api/luteos/erp/package/downPackageOrder
   * @response `200` `CommonRespString` OK
   */
  luteosErpPackageDownPackageOrder = (req: PackageOrderDownLoadReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/erp/package/downPackageOrder`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 箱唛托唛
   * @name LuteosErpPackageDownPackageTemplate
   * @summary 导出装箱单模板
   * @request POST:/api/luteos/erp/package/downPackageTemplate
   * @response `200` `CommonRespString` OK
   */
  luteosErpPackageDownPackageTemplate = (req: PackageTemplateReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/erp/package/downPackageTemplate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 箱唛托唛
   * @name LuteosErpPackageDownPackageTemplateWithOutOrder
   * @summary 导出装箱单模板-无订单
   * @request GET:/api/luteos/erp/package/downPackageTemplateWithOutOrder
   * @response `200` `CommonRespString` OK
   */
  luteosErpPackageDownPackageTemplateWithOutOrder = (params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/erp/package/downPackageTemplateWithOutOrder`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 箱唛托唛
   * @name LuteosErpPackageDownloadBolFile
   * @summary BOL-下载bol提单
   * @request POST:/api/luteos/erp/package/downloadBolFile
   * @response `200` `CommonResp` OK
   */
  luteosErpPackageDownloadBolFile = (
    req: PalletPackageZipDownLoadReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/package/downloadBolFile`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 箱唛托唛
   * @name LuteosErpPackageDownloadInboundFile
   * @summary 下载入库单
   * @request POST:/api/luteos/erp/package/downloadInboundFile
   * @response `200` `CommonResp` OK
   */
  luteosErpPackageDownloadInboundFile = (req: PalletInboundReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/package/downloadInboundFile`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 箱唛托唛
   * @name LuteosErpPackageDownloadList
   * @summary 导出箱托列表
   * @request POST:/api/luteos/erp/package/downloadList
   * @response `200` `CommonExportResp` OK
   */
  luteosErpPackageDownloadList = (req: PalletPackageQueryReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/erp/package/downloadList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 箱唛托唛
   * @name LuteosErpPackageDownloadOperationOrderFile
   * @summary 运营装箱单-运营装箱单下载
   * @request POST:/api/luteos/erp/package/downloadOperationOrderFile
   * @response `200` `CommonResp` OK
   */
  luteosErpPackageDownloadOperationOrderFile = (
    req: PalletPackageZipDownLoadReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/package/downloadOperationOrderFile`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 箱唛托唛
   * @name LuteosErpPackageDownloadPalletMarkFile
   * @summary 托唛-下载箱唛文件
   * @request POST:/api/luteos/erp/package/downloadPalletMarkFile
   * @response `200` `CommonRespString` OK
   */
  luteosErpPackageDownloadPalletMarkFile = (
    req: PalletPackageZipDownLoadReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/erp/package/downloadPalletMarkFile`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 箱唛托唛
   * @name LuteosErpPackageDownloadZipFile
   * @summary 列表下载文件包
   * @request POST:/api/luteos/erp/package/downloadZipFile
   * @response `200` `CommonExportResp` OK
   */
  luteosErpPackageDownloadZipFile = (
    req: PalletPackageZipDownLoadReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/erp/package/downloadZipFile`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 箱唛托唛
   * @name LuteosErpPackageGeneratePackageMarkFile
   * @summary 生成箱唛文件
   * @request POST:/api/luteos/erp/package/generatePackageMarkFile
   * @response `200` `CommonRespObject` OK
   */
  luteosErpPackageGeneratePackageMarkFile = (
    req: PackageMarkGeneratorFileReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/erp/package/generatePackageMarkFile`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 箱唛托唛
   * @name LuteosErpPackageInitBolData
   * @summary BOL-初始化BOL提单查询
   * @request POST:/api/luteos/erp/package/initBolData
   * @response `200` `CommonResp` OK
   */
  luteosErpPackageInitBolData = (req: LadingBillReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/package/initBolData`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 箱唛托唛
   * @name LuteosErpPackageInitInboundOrder
   * @summary 入库单-生成入库单
   * @request POST:/api/luteos/erp/package/initInboundOrder
   * @response `200` `CommonRespObject` OK
   */
  luteosErpPackageInitInboundOrder = (req: PalletInboundReq, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/erp/package/initInboundOrder`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 箱唛托唛
   * @name LuteosErpPackageInitMarkData
   * @summary 箱唛-生成箱唛数据-初始化
   * @request POST:/api/luteos/erp/package/initMarkData
   * @response `200` `CommonResp` OK
   */
  luteosErpPackageInitMarkData = (
    req: PackageGeneratePackageMarkDataReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/package/initMarkData`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 箱唛托唛
   * @name LuteosErpPackageInitOperationPackageOrder
   * @summary 运营装箱单-运营装箱发票初始化
   * @request POST:/api/luteos/erp/package/initOperationPackageOrder
   * @response `200` `CommonRespObject` OK
   */
  luteosErpPackageInitOperationPackageOrder = (
    req: OperationPackageOrderQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/erp/package/initOperationPackageOrder`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 箱唛托唛
   * @name LuteosErpPackageInitPalletMarkData
   * @summary 托唛-生成托唛数据-初始化
   * @request POST:/api/luteos/erp/package/initPalletMarkData
   * @response `200` `CommonResp` OK
   */
  luteosErpPackageInitPalletMarkData = (
    req: PackageGeneratePalletMarkDataReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/package/initPalletMarkData`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 箱唛托唛
   * @name LuteosErpPackageQueryBolData
   * @summary BOL-BOL提单查询
   * @request POST:/api/luteos/erp/package/queryBolData
   * @response `200` `CommonRespLadingBillResp` OK
   */
  luteosErpPackageQueryBolData = (req: LadingBillReq, params: RequestParams = {}) =>
    this.request<CommonRespLadingBillResp, any>({
      path: `/api/luteos/erp/package/queryBolData`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 箱唛托唛
   * @name LuteosErpPackageQueryChooseOrderList
   * @summary 选择订单查询
   * @request POST:/api/luteos/erp/package/queryChooseOrderList
   * @response `200` `PackageChooseOrderListResp` OK
   */
  luteosErpPackageQueryChooseOrderList = (
    req: PackageChooseOrderListReq,
    params: RequestParams = {},
  ) =>
    this.request<PackageChooseOrderListResp, any>({
      path: `/api/luteos/erp/package/queryChooseOrderList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 箱唛托唛
   * @name LuteosErpPackageQueryDetail
   * @summary 详情查询
   * @request POST:/api/luteos/erp/package/queryDetail
   * @response `200` `PalletPackageDetailResp` OK
   */
  luteosErpPackageQueryDetail = (req: PalletPackageDetailReq, params: RequestParams = {}) =>
    this.request<PalletPackageDetailResp, any>({
      path: `/api/luteos/erp/package/queryDetail`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 箱唛托唛
   * @name LuteosErpPackageQueryInboundOrder
   * @summary 入库单-查询入库单
   * @request POST:/api/luteos/erp/package/queryInboundOrder
   * @response `200` `CommonRespPalletInboundResp` OK
   */
  luteosErpPackageQueryInboundOrder = (req: PalletInboundReq, params: RequestParams = {}) =>
    this.request<CommonRespPalletInboundResp, any>({
      path: `/api/luteos/erp/package/queryInboundOrder`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 箱唛托唛
   * @name LuteosErpPackageQueryList
   * @summary 列表查询
   * @request POST:/api/luteos/erp/package/queryList
   * @response `200` `PalletPackageQueryResp` OK
   */
  luteosErpPackageQueryList = (req: PalletPackageQueryReq, params: RequestParams = {}) =>
    this.request<PalletPackageQueryResp, any>({
      path: `/api/luteos/erp/package/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 箱唛托唛
   * @name LuteosErpPackageQueryMarkData
   * @summary 查询所有箱唛数据
   * @request POST:/api/luteos/erp/package/queryMarkData
   * @response `200` `CommonRespPackageMarkDataResp` OK
   */
  luteosErpPackageQueryMarkData = (req: PackageMarkDataReq, params: RequestParams = {}) =>
    this.request<CommonRespPackageMarkDataResp, any>({
      path: `/api/luteos/erp/package/queryMarkData`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 箱唛托唛
   * @name LuteosErpPackageQueryMarkDataPage
   * @summary 分页查询箱唛数据
   * @request POST:/api/luteos/erp/package/queryMarkDataPage
   * @response `200` `CommonRespPackageMarkDataPageResp` OK
   */
  luteosErpPackageQueryMarkDataPage = (req: PackageMarkDataPageReq, params: RequestParams = {}) =>
    this.request<CommonRespPackageMarkDataPageResp, any>({
      path: `/api/luteos/erp/package/queryMarkDataPage`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 箱唛托唛
   * @name LuteosErpPackageQueryOperationPackageOrder
   * @summary 运营装箱单-运营装箱发票单查询
   * @request POST:/api/luteos/erp/package/queryOperationPackageOrder
   * @response `200` `CommonRespOperationPackageOrderResp` OK
   */
  luteosErpPackageQueryOperationPackageOrder = (
    req: OperationPackageOrderQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespOperationPackageOrderResp, any>({
      path: `/api/luteos/erp/package/queryOperationPackageOrder`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 箱唛托唛
   * @name LuteosErpPackageQueryPackageMark
   * @summary 查询装箱单&箱唛信息&装箱单&入库单-查询单个
   * @request POST:/api/luteos/erp/package/queryPackageMark
   * @response `200` `CommonRespPackageMarkListQueryResp` OK
   */
  luteosErpPackageQueryPackageMark = (req: PackageMarkListQueryReq, params: RequestParams = {}) =>
    this.request<CommonRespPackageMarkListQueryResp, any>({
      path: `/api/luteos/erp/package/queryPackageMark`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 箱唛托唛
   * @name LuteosErpPackageQueryPalletDetail
   * @summary 托唛-查询托唛信息
   * @request POST:/api/luteos/erp/package/queryPalletDetail
   * @response `200` `CommonRespPackageMarkListQueryResp` OK
   */
  luteosErpPackageQueryPalletDetail = (req: PackageMarkListQueryReq, params: RequestParams = {}) =>
    this.request<CommonRespPackageMarkListQueryResp, any>({
      path: `/api/luteos/erp/package/queryPalletDetail`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 箱唛托唛
   * @name LuteosErpPackageQueryPalletMarkData
   * @summary 托唛-查询所有托唛
   * @request POST:/api/luteos/erp/package/queryPalletMarkData
   * @response `200` `CommonRespPalletDataResp` OK
   */
  luteosErpPackageQueryPalletMarkData = (req: PalletDataReq, params: RequestParams = {}) =>
    this.request<CommonRespPalletDataResp, any>({
      path: `/api/luteos/erp/package/queryPalletMarkData`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 箱唛托唛
   * @name LuteosErpPackageQueryPalletMarkPage
   * @summary 托唛-分页查询托唛数据
   * @request POST:/api/luteos/erp/package/queryPalletMarkPage
   * @response `200` `CommonRespPalletDataPageResp` OK
   */
  luteosErpPackageQueryPalletMarkPage = (req: PalletDataPageReq, params: RequestParams = {}) =>
    this.request<CommonRespPalletDataPageResp, any>({
      path: `/api/luteos/erp/package/queryPalletMarkPage`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 箱唛托唛
   * @name LuteosErpPackageQueryProductProperties
   * @summary 查询对应的属性
   * @request POST:/api/luteos/erp/package/queryProductProperties
   * @response `200` `CommonRespProductConfigPropertyResp` OK
   */
  luteosErpPackageQueryProductProperties = (
    req: ProductConfigPropertyReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespProductConfigPropertyResp, any>({
      path: `/api/luteos/erp/package/queryProductProperties`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 箱唛托唛
   * @name LuteosErpPackageQueryRecordStatus
   * @summary 相托-整体状态信息
   * @request POST:/api/luteos/erp/package/queryRecordStatus
   * @response `200` `CommonRespPalletStatusBean` OK
   */
  luteosErpPackageQueryRecordStatus = (req: PackageStatusReq, params: RequestParams = {}) =>
    this.request<CommonRespPalletStatusBean, any>({
      path: `/api/luteos/erp/package/queryRecordStatus`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 箱唛托唛
   * @name LuteosErpPackageQuerySourceOrderList
   * @summary 来源订单选择分页
   * @request POST:/api/luteos/erp/package/querySourceOrderList
   * @response `200` `CommonRespPackageChooseSourceOrderListResp` OK
   */
  luteosErpPackageQuerySourceOrderList = (
    req: PackageChooseSourceOrderListReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespPackageChooseSourceOrderListResp, any>({
      path: `/api/luteos/erp/package/querySourceOrderList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 箱唛托唛
   * @name LuteosErpPackageSingleConfirmPackageMark
   * @summary 箱唛-保存单个箱唛数据
   * @request POST:/api/luteos/erp/package/singleConfirmPackageMark
   * @response `200` `CommonRespString` OK
   */
  luteosErpPackageSingleConfirmPackageMark = (
    req: PackageSingleMarkConfirmReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/erp/package/singleConfirmPackageMark`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 箱唛托唛
   * @name LuteosErpPackageSingleConfirmPalletMark
   * @summary 托唛-保存单个托唛数据
   * @request POST:/api/luteos/erp/package/singleConfirmPalletMark
   * @response `200` `CommonRespString` OK
   */
  luteosErpPackageSingleConfirmPalletMark = (
    req: PalletMarkSingleConfirmReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/erp/package/singleConfirmPalletMark`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 箱唛托唛
   * @name LuteosErpPackageUpdateBolData
   * @summary BOL-BOL提单数据保存
   * @request POST:/api/luteos/erp/package/updateBolData
   * @response `200` `CommonResp` OK
   */
  luteosErpPackageUpdateBolData = (req: LadingBillUpdateReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/package/updateBolData`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 箱唛托唛
   * @name LuteosErpPackageUpdateBolFile
   * @summary BOL-BOL提单文件保存
   * @request POST:/api/luteos/erp/package/updateBolFile
   * @response `200` `CommonResp` OK
   */
  luteosErpPackageUpdateBolFile = (req: LadingBillFileUpdateReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/package/updateBolFile`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 箱唛托唛
   * @name LuteosErpPackageUpdateInboundData
   * @summary 入库单-入库单保存&更新数据
   * @request POST:/api/luteos/erp/package/updateInboundData
   * @response `200` `CommonResp` OK
   */
  luteosErpPackageUpdateInboundData = (req: PalletInboundUpdateReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/package/updateInboundData`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 箱唛托唛
   * @name LuteosErpPackageUpdateInboundFile
   * @summary 入库单-入库单保存&更新文件
   * @request POST:/api/luteos/erp/package/updateInboundFile
   * @response `200` `CommonResp` OK
   */
  luteosErpPackageUpdateInboundFile = (
    req: PalletInboundUpdateFileReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/package/updateInboundFile`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 箱唛托唛
   * @name LuteosErpPackageUpdateOperationData
   * @summary 运营装箱单-保存运营装箱单&发票数据
   * @request POST:/api/luteos/erp/package/updateOperationData
   * @response `200` `CommonResp` OK
   */
  luteosErpPackageUpdateOperationData = (
    req: OperationPackageOrderUpdateReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/package/updateOperationData`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 箱唛托唛
   * @name LuteosErpPackageUpdateOperationFile
   * @summary 运营装箱单-保存运营装箱单&发票文件
   * @request POST:/api/luteos/erp/package/updateOperationFile
   * @response `200` `CommonResp` OK
   */
  luteosErpPackageUpdateOperationFile = (
    req: OperationPackageOrderUpdateFileReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/package/updateOperationFile`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 箱唛托唛
   * @name LuteosErpPackageUpdatePalletPackageName
   * @summary 更新箱托名称
   * @request POST:/api/luteos/erp/package/updatePalletPackageName
   * @response `200` `CommonResp` OK
   */
  luteosErpPackageUpdatePalletPackageName = (
    req: PalletPackageNameUpdateReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/package/updatePalletPackageName`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 箱唛托唛
   * @name LuteosErpPackageUploadPackageOrder
   * @summary 导入装箱单
   * @request POST:/api/luteos/erp/package/uploadPackageOrder
   * @response `200` `ImportDataResp` OK
   */
  luteosErpPackageUploadPackageOrder = (req: PackageOrderUploadReq, params: RequestParams = {}) =>
    this.request<ImportDataResp, any>({
      path: `/api/luteos/erp/package/uploadPackageOrder`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 箱唛托唛
   * @name LuteosErpPackageUploadPackageWithOutOrder
   * @summary 上传装箱单清单文件-无订单
   * @request POST:/api/luteos/erp/package/uploadPackageWithOutOrder
   * @response `200` `CommonResp` OK
   */
  luteosErpPackageUploadPackageWithOutOrder = (
    req: PackageOrderUploadWithOutOrderReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/package/uploadPackageWithOutOrder`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 箱唛托唛
   * @name LuteosErpPackageUploadPalletOrder
   * @summary 托唛-导入打托单
   * @request POST:/api/luteos/erp/package/uploadPalletOrder
   * @response `200` `ImportDataResp` OK
   */
  luteosErpPackageUploadPalletOrder = (req: PalletOrderUploadReq, params: RequestParams = {}) =>
    this.request<ImportDataResp, any>({
      path: `/api/luteos/erp/package/uploadPalletOrder`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 提货管理
   * @name LuteosErpPlanBillLadingAbandon
   * @summary 提货管理-作废
   * @request GET:/api/luteos/erp/plan/bill/lading/abandon
   * @response `200` `CommonResp` OK
   */
  luteosErpPlanBillLadingAbandon = (
    query: {
      /** code */
      code: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/plan/bill/lading/abandon`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 提货管理
   * @name LuteosErpPlanBillLadingAuth
   * @summary 提货管理-审核
   * @request POST:/api/luteos/erp/plan/bill/lading/auth
   * @response `200` `CommonResp` OK
   */
  luteosErpPlanBillLadingAuth = (req: PlanBillLadingAuthReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/plan/bill/lading/auth`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 提货管理
   * @name LuteosErpPlanBillLadingModifyAndSubmit
   * @summary 提货管理-编辑并提交审核
   * @request POST:/api/luteos/erp/plan/bill/lading/modifyAndSubmit
   * @response `200` `CommonResp` OK
   */
  luteosErpPlanBillLadingModifyAndSubmit = (
    req: PlanBillLadingModifyReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/plan/bill/lading/modifyAndSubmit`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 提货管理
   * @name LuteosErpPlanBillLadingQuertPickType
   * @summary 提货管理-选择提货方式及仓库关系
   * @request POST:/api/luteos/erp/plan/bill/lading/quertPickType
   * @response `200` `PlanBillLadingPickListQueryResp` OK
   */
  luteosErpPlanBillLadingQuertPickType = (params: RequestParams = {}) =>
    this.request<PlanBillLadingPickListQueryResp, any>({
      path: `/api/luteos/erp/plan/bill/lading/quertPickType`,
      method: 'POST',
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 提货管理
   * @name LuteosErpPlanBillLadingQueryDetail
   * @summary 提货管理-提货单详情
   * @request GET:/api/luteos/erp/plan/bill/lading/queryDetail
   * @response `200` `PlanBillLadingDetailQueryResp` OK
   */
  luteosErpPlanBillLadingQueryDetail = (
    query: {
      /** code */
      code: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<PlanBillLadingDetailQueryResp, any>({
      path: `/api/luteos/erp/plan/bill/lading/queryDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 提货管理
   * @name LuteosErpPlanBillLadingQueryList
   * @summary 提货管理-列表查询
   * @request POST:/api/luteos/erp/plan/bill/lading/queryList
   * @response `200` `PlanBillLadingListQueryResp` OK
   */
  luteosErpPlanBillLadingQueryList = (
    req: PlanBillLadingListQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<PlanBillLadingListQueryResp, any>({
      path: `/api/luteos/erp/plan/bill/lading/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 提货管理
   * @name LuteosErpPlanBillLadingQueryProduct
   * @summary 提货管理-选择产品
   * @request POST:/api/luteos/erp/plan/bill/lading/queryProduct
   * @response `200` `PlanBillLadingProductListQueryResp` OK
   */
  luteosErpPlanBillLadingQueryProduct = (
    req: PlanBillLadingProductListQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<PlanBillLadingProductListQueryResp, any>({
      path: `/api/luteos/erp/plan/bill/lading/queryProduct`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 提货管理
   * @name LuteosErpPlanBillLadingSaveAndSubmit
   * @summary 提货管理-新增并提交审核
   * @request POST:/api/luteos/erp/plan/bill/lading/saveAndSubmit
   * @response `200` `CommonRespString` OK
   */
  luteosErpPlanBillLadingSaveAndSubmit = (req: PlanBillLadingSaveReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/erp/plan/bill/lading/saveAndSubmit`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 送货单
   * @name LuteosErpPlanDeliveryBillAbandon
   * @summary 废弃
   * @request POST:/api/luteos/erp/plan/delivery/bill/abandon
   * @response `200` `CommonResp` OK
   */
  luteosErpPlanDeliveryBillAbandon = (
    req: PlanDeliveryBillAbandonReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/plan/delivery/bill/abandon`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 送货单
   * @name LuteosErpPlanDeliveryBillConfirm
   * @summary 确认收货
   * @request POST:/api/luteos/erp/plan/delivery/bill/confirm
   * @response `200` `CommonResp` OK
   */
  luteosErpPlanDeliveryBillConfirm = (
    req: PlanDeliveryBillConfirmQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/plan/delivery/bill/confirm`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 送货单
   * @name LuteosErpPlanDeliveryBillQueryDetail
   * @summary 详情
   * @request GET:/api/luteos/erp/plan/delivery/bill/queryDetail
   * @response `200` `PlanDeliveryBillDetailResp` OK
   */
  luteosErpPlanDeliveryBillQueryDetail = (
    query: {
      /** code */
      code: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<PlanDeliveryBillDetailResp, any>({
      path: `/api/luteos/erp/plan/delivery/bill/queryDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 送货单
   * @name LuteosErpPlanDeliveryBillQueryList
   * @summary 列表查询
   * @request POST:/api/luteos/erp/plan/delivery/bill/queryList
   * @response `200` `PlanDeliveryBillListQueryResp` OK
   */
  luteosErpPlanDeliveryBillQueryList = (
    req: PlanDeliveryBillListQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<PlanDeliveryBillListQueryResp, any>({
      path: `/api/luteos/erp/plan/delivery/bill/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 送货单
   * @name LuteosErpPlanDeliveryBillRetryEc
   * @summary 异常重推异常
   * @request POST:/api/luteos/erp/plan/delivery/bill/retryEc
   * @response `200` `CommonResp` OK
   */
  luteosErpPlanDeliveryBillRetryEc = (
    req: PlanDeliveryBillRetryEcQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/plan/delivery/bill/retryEc`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 送货单
   * @name LuteosErpPlanDeliveryBillSync
   * @summary 同步送货单
   * @request POST:/api/luteos/erp/plan/delivery/bill/sync
   * @response `200` `CommonResp` OK
   */
  luteosErpPlanDeliveryBillSync = (req: PlanDeliveryBillSyncReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/plan/delivery/bill/sync`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 计划库存
   * @name LuteosErpPlanInventoryAmazonExportList
   * @summary 导出亚马逊计划库存
   * @request POST:/api/luteos/erp/plan/inventory/amazon/exportList
   * @response `200` `CommonExportResp` OK
   */
  luteosErpPlanInventoryAmazonExportList = (
    req: PlanInventoryFbaQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/erp/plan/inventory/amazon/exportList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 计划库存
   * @name LuteosErpPlanInventoryAmazonQueryList
   * @summary 查询亚马逊计划库存
   * @request POST:/api/luteos/erp/plan/inventory/amazon/queryList
   * @response `200` `PlanInventoryFbaPageResp` OK
   */
  luteosErpPlanInventoryAmazonQueryList = (
    req: PlanInventoryFbaQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<PlanInventoryFbaPageResp, any>({
      path: `/api/luteos/erp/plan/inventory/amazon/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 计划库存
   * @name LuteosErpPlanInventoryRetailExportList
   * @summary 导出线下零售计划库存
   * @request POST:/api/luteos/erp/plan/inventory/retail/exportList
   * @response `200` `CommonExportResp` OK
   */
  luteosErpPlanInventoryRetailExportList = (
    req: RetailPlanInventoryQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/erp/plan/inventory/retail/exportList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 计划库存
   * @name LuteosErpPlanInventoryRetailQueryList
   * @summary 查询线下零售计划库存
   * @request POST:/api/luteos/erp/plan/inventory/retail/queryList
   * @response `200` `RetailPlanInventoryPageResp` OK
   */
  luteosErpPlanInventoryRetailQueryList = (
    req: RetailPlanInventoryQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<RetailPlanInventoryPageResp, any>({
      path: `/api/luteos/erp/plan/inventory/retail/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 计划库存
   * @name LuteosErpPlanInventorySelfExportList
   * @summary 导出自营仓库计划库存
   * @request POST:/api/luteos/erp/plan/inventory/self/exportList
   * @response `200` `CommonExportResp` OK
   */
  luteosErpPlanInventorySelfExportList = (
    req: PlanInventorySelfQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/erp/plan/inventory/self/exportList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 计划库存
   * @name LuteosErpPlanInventorySelfQueryList
   * @summary 查询自营仓库计划库存
   * @request POST:/api/luteos/erp/plan/inventory/self/queryList
   * @response `200` `PlanInventorySelfPageResp` OK
   */
  luteosErpPlanInventorySelfQueryList = (
    req: PlanInventorySelfQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<PlanInventorySelfPageResp, any>({
      path: `/api/luteos/erp/plan/inventory/self/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 计划库存
   * @name LuteosErpPlanInventoryShopifyExportList
   * @summary 导出shopify计划库存
   * @request POST:/api/luteos/erp/plan/inventory/shopify/exportList
   * @response `200` `CommonExportResp` OK
   */
  luteosErpPlanInventoryShopifyExportList = (
    req: ShopifyPlanInventoryQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/erp/plan/inventory/shopify/exportList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 计划库存
   * @name LuteosErpPlanInventoryShopifyQueryList
   * @summary 查询shopify计划库存
   * @request POST:/api/luteos/erp/plan/inventory/shopify/queryList
   * @response `200` `ShopifyPlanInventoryPageResp` OK
   */
  luteosErpPlanInventoryShopifyQueryList = (
    req: ShopifyPlanInventoryQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<ShopifyPlanInventoryPageResp, any>({
      path: `/api/luteos/erp/plan/inventory/shopify/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 计划库存
   * @name LuteosErpPlanInventoryShopifySync
   * @summary 查询shopify计划库存
   * @request POST:/api/luteos/erp/plan/inventory/shopify/sync
   * @response `200` `void` OK
   */
  luteosErpPlanInventoryShopifySync = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/luteos/erp/plan/inventory/shopify/sync`,
      method: 'POST',
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 计划库存
   * @name LuteosErpPlanInventoryTiktokExportList
   * @summary 导出tiktok计划库存
   * @request POST:/api/luteos/erp/plan/inventory/tiktok/exportList
   * @response `200` `CommonExportResp` OK
   */
  luteosErpPlanInventoryTiktokExportList = (
    req: PlanInventoryTiktokQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/erp/plan/inventory/tiktok/exportList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 计划库存
   * @name LuteosErpPlanInventoryTiktokQueryList
   * @summary 查询tiktok计划库存
   * @request POST:/api/luteos/erp/plan/inventory/tiktok/queryList
   * @response `200` `PlanInventoryTiktokPageResp` OK
   */
  luteosErpPlanInventoryTiktokQueryList = (
    req: PlanInventoryTiktokQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<PlanInventoryTiktokPageResp, any>({
      path: `/api/luteos/erp/plan/inventory/tiktok/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 计划库存
   * @name LuteosErpPlanInventoryWalmartExportList
   * @summary 导出沃尔玛计划库存
   * @request POST:/api/luteos/erp/plan/inventory/walmart/exportList
   * @response `200` `CommonExportResp` OK
   */
  luteosErpPlanInventoryWalmartExportList = (
    req: PlanInventoryWalmartQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/erp/plan/inventory/walmart/exportList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 计划库存
   * @name LuteosErpPlanInventoryWalmartQueryList
   * @summary 查询沃尔玛计划库存
   * @request POST:/api/luteos/erp/plan/inventory/walmart/queryList
   * @response `200` `PlanInventoryWalmartPageResp` OK
   */
  luteosErpPlanInventoryWalmartQueryList = (
    req: PlanInventoryWalmartQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<PlanInventoryWalmartPageResp, any>({
      path: `/api/luteos/erp/plan/inventory/walmart/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 计划-提货计划
   * @name LuteosErpPlanPickupAcceptSupplier
   * @summary 接收供应商操作数据
   * @request POST:/api/luteos/erp/plan/pickup/acceptSupplier
   * @response `200` `CommonRespVoid` OK
   */
  luteosErpPlanPickupAcceptSupplier = (
    req: SaleDeliveryNoticeAcceptReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/erp/plan/pickup/acceptSupplier`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 计划-提货计划
   * @name LuteosErpPlanPickupAllocateOrderNumberList
   * @summary PO单分配列表
   * @request POST:/api/luteos/erp/plan/pickup/allocateOrderNumberList
   * @response `200` `PlanPickupItemQueryResp` OK
   */
  luteosErpPlanPickupAllocateOrderNumberList = (
    req: PlanPickupItemQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<PlanPickupItemQueryResp, any>({
      path: `/api/luteos/erp/plan/pickup/allocateOrderNumberList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 计划-提货计划
   * @name LuteosErpPlanPickupBatchSave
   * @summary 批量保存
   * @request POST:/api/luteos/erp/plan/pickup/batchSave
   * @response `200` `CommonRespVoid` OK
   */
  luteosErpPlanPickupBatchSave = (req: PlanPickupBatchSaveReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/erp/plan/pickup/batchSave`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 计划-提货计划
   * @name LuteosErpPlanPickupClose
   * @summary 计划关闭
   * @request POST:/api/luteos/erp/plan/pickup/close
   * @response `200` `CommonRespVoid` OK
   */
  luteosErpPlanPickupClose = (req: PlanPickupPlantOperationReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/erp/plan/pickup/close`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 计划-提货计划
   * @name LuteosErpPlanPickupDelete
   * @summary 删除
   * @request POST:/api/luteos/erp/plan/pickup/delete
   * @response `200` `CommonRespVoid` OK
   */
  luteosErpPlanPickupDelete = (req: PlanPickupDeleteReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/erp/plan/pickup/delete`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 计划-提货计划
   * @name LuteosErpPlanPickupDownloadTemplate
   * @summary 下载上传模板
   * @request POST:/api/luteos/erp/plan/pickup/downloadTemplate
   * @response `200` `CommonRespString` OK
   */
  luteosErpPlanPickupDownloadTemplate = (params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/erp/plan/pickup/downloadTemplate`,
      method: 'POST',
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 计划-提货计划
   * @name LuteosErpPlanPickupExportFile
   * @summary 导出
   * @request POST:/api/luteos/erp/plan/pickup/exportFile
   * @response `200` `CommonExportResp` OK
   */
  luteosErpPlanPickupExportFile = (req: PlanPickupListQueryReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/erp/plan/pickup/exportFile`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 计划-提货计划
   * @name LuteosErpPlanPickupGetMaterialPurchaseSummary
   * @summary 统计物料采购汇总信息
   * @request GET:/api/luteos/erp/plan/pickup/getMaterialPurchaseSummary
   * @response `200` `PlanPickupMaterialPurchaseSummaryQueryResp` OK
   */
  luteosErpPlanPickupGetMaterialPurchaseSummary = (
    query: {
      /** keyword */
      keyword?: string;
      /** supplierCode */
      supplierCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<PlanPickupMaterialPurchaseSummaryQueryResp, any>({
      path: `/api/luteos/erp/plan/pickup/getMaterialPurchaseSummary`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 计划-提货计划
   * @name LuteosErpPlanPickupGetSupplierList
   * @summary 获取供应商列表
   * @request POST:/api/luteos/erp/plan/pickup/getSupplierList
   * @response `200` `PlanPickupSupplierQueryResp` OK
   */
  luteosErpPlanPickupGetSupplierList = (
    req: PlanPickupSupplierQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<PlanPickupSupplierQueryResp, any>({
      path: `/api/luteos/erp/plan/pickup/getSupplierList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 计划-提货计划
   * @name LuteosErpPlanPickupImportFile
   * @summary 导入
   * @request POST:/api/luteos/erp/plan/pickup/importFile
   * @response `200` `ImportDataResp` OK
   */
  luteosErpPlanPickupImportFile = (req: UploadReq, params: RequestParams = {}) =>
    this.request<ImportDataResp, any>({
      path: `/api/luteos/erp/plan/pickup/importFile`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 计划-提货计划
   * @name LuteosErpPlanPickupPushSupplier
   * @summary 推送供应商
   * @request POST:/api/luteos/erp/plan/pickup/pushSupplier
   * @response `200` `CommonRespVoid` OK
   */
  luteosErpPlanPickupPushSupplier = (req: PlanPickupPushReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/erp/plan/pickup/pushSupplier`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 计划-提货计划
   * @name LuteosErpPlanPickupQueryDetail
   * @summary 查询详情
   * @request GET:/api/luteos/erp/plan/pickup/queryDetail
   * @response `200` `PlanPickupDetailQueryResp` OK
   */
  luteosErpPlanPickupQueryDetail = (
    query: {
      /** itemId */
      itemId: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<PlanPickupDetailQueryResp, any>({
      path: `/api/luteos/erp/plan/pickup/queryDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 计划-提货计划
   * @name LuteosErpPlanPickupQueryDetailByCode
   * @summary 通过计划提货批号查询详情
   * @request GET:/api/luteos/erp/plan/pickup/queryDetailByCode
   * @response `200` `PlanPickupBatchDetailQueryResp` OK
   */
  luteosErpPlanPickupQueryDetailByCode = (
    query: {
      /** code */
      code: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<PlanPickupBatchDetailQueryResp, any>({
      path: `/api/luteos/erp/plan/pickup/queryDetailByCode`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 计划-提货计划
   * @name LuteosErpPlanPickupQueryList
   * @summary 查询列表
   * @request POST:/api/luteos/erp/plan/pickup/queryList
   * @response `200` `PlanPickupListQueryResp` OK
   */
  luteosErpPlanPickupQueryList = (req: PlanPickupListQueryReq, params: RequestParams = {}) =>
    this.request<PlanPickupListQueryResp, any>({
      path: `/api/luteos/erp/plan/pickup/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 计划-提货计划
   * @name LuteosErpPlanPickupSave
   * @summary 保存
   * @request POST:/api/luteos/erp/plan/pickup/save
   * @response `200` `CommonRespVoid` OK
   */
  luteosErpPlanPickupSave = (req: PlanPickupSaveReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/erp/plan/pickup/save`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预约入库
   * @name LuteosErpPlanPrebookInboundAddPrebookInbound
   * @summary 预约入库-新增预约入库
   * @request POST:/api/luteos/erp/plan/prebook/inbound/addPrebookInbound
   * @response `200` `CommonRespObject` OK
   */
  luteosErpPlanPrebookInboundAddPrebookInbound = (
    req: PlanPrebookInboundAddReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/erp/plan/prebook/inbound/addPrebookInbound`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预约入库
   * @name LuteosErpPlanPrebookInboundDelete
   * @summary 预约入库-作废
   * @request POST:/api/luteos/erp/plan/prebook/inbound/delete
   * @response `200` `CommonRespObject` OK
   */
  luteosErpPlanPrebookInboundDelete = (
    req: PlanPreBookInBoundDeleteReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/erp/plan/prebook/inbound/delete`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预约入库
   * @name LuteosErpPlanPrebookInboundQueryInboundDetail
   * @summary 预约入库-详情列表
   * @request POST:/api/luteos/erp/plan/prebook/inbound/queryInboundDetail
   * @response `200` `PlanPreBookInboundDetailResp` OK
   */
  luteosErpPlanPrebookInboundQueryInboundDetail = (
    req: PlanPreBookInboudDetailReq,
    params: RequestParams = {},
  ) =>
    this.request<PlanPreBookInboundDetailResp, any>({
      path: `/api/luteos/erp/plan/prebook/inbound/queryInboundDetail`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预约入库
   * @name LuteosErpPlanPrebookInboundQueryInboundOrder
   * @summary 预约入库-查询预约入库单
   * @request POST:/api/luteos/erp/plan/prebook/inbound/queryInboundOrder
   * @response `200` `PlanPrebookInboundQueryResp` OK
   */
  luteosErpPlanPrebookInboundQueryInboundOrder = (
    req: PlanPrebookInboundQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<PlanPrebookInboundQueryResp, any>({
      path: `/api/luteos/erp/plan/prebook/inbound/queryInboundOrder`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预约入库
   * @name LuteosErpPlanPrebookInboundShip
   * @summary 预约入库-送货
   * @request POST:/api/luteos/erp/plan/prebook/inbound/ship
   * @response `200` `CommonRespObject` OK
   */
  luteosErpPlanPrebookInboundShip = (req: PlanPreBookInboundShipReq, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/erp/plan/prebook/inbound/ship`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预约入库
   * @name LuteosErpPlanPrebookInboundUpdatePrebookInbound
   * @summary 预约入库-编辑预约入库
   * @request POST:/api/luteos/erp/plan/prebook/inbound/updatePrebookInbound
   * @response `200` `CommonRespObject` OK
   */
  luteosErpPlanPrebookInboundUpdatePrebookInbound = (
    req: PlanPrebookInboundModifyReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/erp/plan/prebook/inbound/updatePrebookInbound`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 零售预测-SKU汇总配置
   * @name LuteosErpPlanPrsfssChangeStatus
   * @summary 变更状态
   * @request POST:/api/luteos/erp/plan/prsfss/changeStatus
   * @response `200` `CommonRespObject` OK
   */
  luteosErpPlanPrsfssChangeStatus = (req: PrsfssChangeStatusReq, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/erp/plan/prsfss/changeStatus`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 零售预测-SKU汇总配置
   * @name LuteosErpPlanPrsfssExportFile
   * @summary 文件导出
   * @request POST:/api/luteos/erp/plan/prsfss/exportFile
   * @response `200` `CommonExportResp` OK
   */
  luteosErpPlanPrsfssExportFile = (req: PrsfssQueryListReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/erp/plan/prsfss/exportFile`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 零售预测-SKU汇总配置
   * @name LuteosErpPlanPrsfssQueryList
   * @summary 列表查询
   * @request POST:/api/luteos/erp/plan/prsfss/queryList
   * @response `200` `PrsfssQueryListResp` OK
   */
  luteosErpPlanPrsfssQueryList = (req: PrsfssQueryListReq, params: RequestParams = {}) =>
    this.request<PrsfssQueryListResp, any>({
      path: `/api/luteos/erp/plan/prsfss/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 零售预测-SKU汇总配置
   * @name LuteosErpPlanPrsfssSaveOrUpdate
   * @summary 新增或者编辑
   * @request POST:/api/luteos/erp/plan/prsfss/saveOrUpdate
   * @response `200` `CommonResp` OK
   */
  luteosErpPlanPrsfssSaveOrUpdate = (req: PrsfssSaveOrUpdateReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/plan/prsfss/saveOrUpdate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预测-活动增量管理
   * @name LuteosErpPlanPsfaiChangeStatus
   * @summary 变更状态
   * @request POST:/api/luteos/erp/plan/psfai/changeStatus
   * @response `200` `CommonResp` OK
   */
  luteosErpPlanPsfaiChangeStatus = (req: PsfaiChangeStatusReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/plan/psfai/changeStatus`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预测-活动增量管理
   * @name LuteosErpPlanPsfaiQueryList
   * @summary 列表查询
   * @request POST:/api/luteos/erp/plan/psfai/queryList
   * @response `200` `PsfaiQueryListResp` OK
   */
  luteosErpPlanPsfaiQueryList = (req: PsfaiQueryListReq, params: RequestParams = {}) =>
    this.request<PsfaiQueryListResp, any>({
      path: `/api/luteos/erp/plan/psfai/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预测-活动增量管理
   * @name LuteosErpPlanPsfaiSaveOrUpdate
   * @summary 新增/更新
   * @request POST:/api/luteos/erp/plan/psfai/saveOrUpdate
   * @response `200` `CommonResp` OK
   */
  luteosErpPlanPsfaiSaveOrUpdate = (req: PsfaiSaveReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/plan/psfai/saveOrUpdate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预测-自动打标管理
   * @name LuteosErpPlanPsfatChangeStatus
   * @summary 变更状态
   * @request POST:/api/luteos/erp/plan/psfat/changeStatus
   * @response `200` `CommonResp` OK
   */
  luteosErpPlanPsfatChangeStatus = (req: PsfatChangeStatusReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/plan/psfat/changeStatus`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预测-自动打标管理
   * @name LuteosErpPlanPsfatQueryList
   * @summary 列表查询
   * @request POST:/api/luteos/erp/plan/psfat/queryList
   * @response `200` `PsfatQueryListResp` OK
   */
  luteosErpPlanPsfatQueryList = (req: PsfatQueryListReq, params: RequestParams = {}) =>
    this.request<PsfatQueryListResp, any>({
      path: `/api/luteos/erp/plan/psfat/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预测-自动打标管理
   * @name LuteosErpPlanPsfatSaveOrUpdate
   * @summary 新增/更新
   * @request POST:/api/luteos/erp/plan/psfat/saveOrUpdate
   * @response `200` `CommonResp` OK
   */
  luteosErpPlanPsfatSaveOrUpdate = (req: PsfatSaveReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/plan/psfat/saveOrUpdate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 零售预测-客户汇总管理
   * @name LuteosErpPlanPsfccChangeStatus
   * @summary 变更状态
   * @request POST:/api/luteos/erp/plan/psfcc/changeStatus
   * @response `200` `CommonResp` OK
   */
  luteosErpPlanPsfccChangeStatus = (req: PsfccChangeStatusReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/plan/psfcc/changeStatus`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 零售预测-客户汇总管理
   * @name LuteosErpPlanPsfccExportFile
   * @summary 文件导出
   * @request POST:/api/luteos/erp/plan/psfcc/exportFile
   * @response `200` `CommonRespCommonExportResp` OK
   */
  luteosErpPlanPsfccExportFile = (req: PsfccQueryListReq, params: RequestParams = {}) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/luteos/erp/plan/psfcc/exportFile`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 零售预测-客户汇总管理
   * @name LuteosErpPlanPsfccImportFile
   * @summary 文件导入
   * @request POST:/api/luteos/erp/plan/psfcc/importFile
   * @response `200` `ImportDataResp` OK
   */
  luteosErpPlanPsfccImportFile = (req: UploadReq, params: RequestParams = {}) =>
    this.request<ImportDataResp, any>({
      path: `/api/luteos/erp/plan/psfcc/importFile`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 零售预测-客户汇总管理
   * @name LuteosErpPlanPsfccQueryList
   * @summary 列表查询
   * @request POST:/api/luteos/erp/plan/psfcc/queryList
   * @response `200` `PsfccQueryListResp` OK
   */
  luteosErpPlanPsfccQueryList = (req: PsfccQueryListReq, params: RequestParams = {}) =>
    this.request<PsfccQueryListResp, any>({
      path: `/api/luteos/erp/plan/psfcc/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 零售预测-客户汇总管理
   * @name LuteosErpPlanPsfccSaveOrUpdate
   * @summary 新增/更新
   * @request POST:/api/luteos/erp/plan/psfcc/saveOrUpdate
   * @response `200` `CommonResp` OK
   */
  luteosErpPlanPsfccSaveOrUpdate = (req: PsfccSaveReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/plan/psfcc/saveOrUpdate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预测-商品匹配管理
   * @name LuteosErpPlanPsfpcChangeStatus
   * @summary 变更状态
   * @request POST:/api/luteos/erp/plan/psfpc/changeStatus
   * @response `200` `CommonResp` OK
   */
  luteosErpPlanPsfpcChangeStatus = (req: PsfpcChangeStatusReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/plan/psfpc/changeStatus`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预测-商品匹配管理
   * @name LuteosErpPlanPsfpcDownTemplate
   * @summary 下载批量导入模板(导出)
   * @request POST:/api/luteos/erp/plan/psfpc/downTemplate
   * @response `200` `CommonRespString` OK
   */
  luteosErpPlanPsfpcDownTemplate = (req: PsfpcQueryListReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/erp/plan/psfpc/downTemplate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预测-商品匹配管理
   * @name LuteosErpPlanPsfpcQueryList
   * @summary 列表查询
   * @request POST:/api/luteos/erp/plan/psfpc/queryList
   * @response `200` `PsfpcQueryListResp` OK
   */
  luteosErpPlanPsfpcQueryList = (req: PsfpcQueryListReq, params: RequestParams = {}) =>
    this.request<PsfpcQueryListResp, any>({
      path: `/api/luteos/erp/plan/psfpc/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预测-商品匹配管理
   * @name LuteosErpPlanPsfpcSaveOrUpdate
   * @summary 新增/更新
   * @request POST:/api/luteos/erp/plan/psfpc/saveOrUpdate
   * @response `200` `CommonResp` OK
   */
  luteosErpPlanPsfpcSaveOrUpdate = (req: PsfpcSaveReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/plan/psfpc/saveOrUpdate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预测-商品匹配管理
   * @name LuteosErpPlanPsfpcUpload
   * @summary 批量导入
   * @request POST:/api/luteos/erp/plan/psfpc/upload
   * @response `200` `CommonResp` OK
   */
  luteosErpPlanPsfpcUpload = (req: UploadReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/plan/psfpc/upload`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预测-策略管理
   * @name LuteosErpPlanPsfsChangeStatus
   * @summary 变更状态
   * @request POST:/api/luteos/erp/plan/psfs/changeStatus
   * @response `200` `CommonResp` OK
   */
  luteosErpPlanPsfsChangeStatus = (req: PsfsChangeStatusReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/plan/psfs/changeStatus`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预测-策略管理
   * @name LuteosErpPlanPsfsQueryList
   * @summary 列表查询
   * @request POST:/api/luteos/erp/plan/psfs/queryList
   * @response `200` `PsfsQueryListResp` OK
   */
  luteosErpPlanPsfsQueryList = (req: PsfsQueryListReq, params: RequestParams = {}) =>
    this.request<PsfsQueryListResp, any>({
      path: `/api/luteos/erp/plan/psfs/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预测-策略管理
   * @name LuteosErpPlanPsfsSaveOrUpdate
   * @summary 新增/更新
   * @request POST:/api/luteos/erp/plan/psfs/saveOrUpdate
   * @response `200` `CommonResp` OK
   */
  luteosErpPlanPsfsSaveOrUpdate = (req: PsfsSaveReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/plan/psfs/saveOrUpdate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预测-SKU汇总配置
   * @name LuteosErpPlanPsfssChangeStatus
   * @summary 变更状态
   * @request POST:/api/luteos/erp/plan/psfss/changeStatus
   * @response `200` `CommonRespObject` OK
   */
  luteosErpPlanPsfssChangeStatus = (req: PsfssChangeStatusReq, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/erp/plan/psfss/changeStatus`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预测-SKU汇总配置
   * @name LuteosErpPlanPsfssDownTemplate
   * @summary 下载批量导入模板(导出)
   * @request POST:/api/luteos/erp/plan/psfss/downTemplate
   * @response `200` `CommonRespString` OK
   */
  luteosErpPlanPsfssDownTemplate = (req: PsfssQueryListReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/erp/plan/psfss/downTemplate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预测-SKU汇总配置
   * @name LuteosErpPlanPsfssExportFile
   * @summary 文件导出
   * @request POST:/api/luteos/erp/plan/psfss/exportFile
   * @response `200` `CommonExportResp` OK
   */
  luteosErpPlanPsfssExportFile = (req: PsfssQueryListReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/erp/plan/psfss/exportFile`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预测-SKU汇总配置
   * @name LuteosErpPlanPsfssQueryList
   * @summary 列表查询
   * @request POST:/api/luteos/erp/plan/psfss/queryList
   * @response `200` `PsfssQueryListResp` OK
   */
  luteosErpPlanPsfssQueryList = (req: PsfssQueryListReq, params: RequestParams = {}) =>
    this.request<PsfssQueryListResp, any>({
      path: `/api/luteos/erp/plan/psfss/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预测-SKU汇总配置
   * @name LuteosErpPlanPsfssSaveOrUpdate
   * @summary 新增或者编辑
   * @request POST:/api/luteos/erp/plan/psfss/saveOrUpdate
   * @response `200` `CommonResp` OK
   */
  luteosErpPlanPsfssSaveOrUpdate = (req: PsfssSaveOrUpdateReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/plan/psfss/saveOrUpdate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预测-SKU汇总配置
   * @name LuteosErpPlanPsfssUpload
   * @summary 批量导入
   * @request POST:/api/luteos/erp/plan/psfss/upload
   * @response `200` `CommonResp` OK
   */
  luteosErpPlanPsfssUpload = (req: UploadReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/plan/psfss/upload`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预测-标签管理
   * @name LuteosErpPlanPsftChangeStatus
   * @summary 变更状态
   * @request POST:/api/luteos/erp/plan/psft/changeStatus
   * @response `200` `CommonRespObject` OK
   */
  luteosErpPlanPsftChangeStatus = (req: PsftChangeStatusReq, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/erp/plan/psft/changeStatus`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预测-标签管理
   * @name LuteosErpPlanPsftQueryList
   * @summary 列表查询
   * @request POST:/api/luteos/erp/plan/psft/queryList
   * @response `200` `PsftQueryListResp` OK
   */
  luteosErpPlanPsftQueryList = (req: PsftQueryListReq, params: RequestParams = {}) =>
    this.request<PsftQueryListResp, any>({
      path: `/api/luteos/erp/plan/psft/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预测-标签管理
   * @name LuteosErpPlanPsftQueryOptionList
   * @summary 列表下拉查询
   * @request POST:/api/luteos/erp/plan/psft/queryOptionList
   * @response `200` `PsftQueryOptionListResp` OK
   */
  luteosErpPlanPsftQueryOptionList = (req: PsftOptionReq, params: RequestParams = {}) =>
    this.request<PsftQueryOptionListResp, any>({
      path: `/api/luteos/erp/plan/psft/queryOptionList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预测-标签管理
   * @name LuteosErpPlanPsftSaveOrUpdate
   * @summary 新增/更新
   * @request POST:/api/luteos/erp/plan/psft/saveOrUpdate
   * @response `200` `CommonRespObject` OK
   */
  luteosErpPlanPsftSaveOrUpdate = (req: PsftSaveReq, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/erp/plan/psft/saveOrUpdate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 发货指令
   * @name LuteosErpPlanShipCommandDownTemplate
   * @summary 下载上传模板
   * @request GET:/api/luteos/erp/plan/ship/command/downTemplate
   * @deprecated
   * @response `200` `CommonRespString` OK
   */
  luteosErpPlanShipCommandDownTemplate = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/erp/plan/ship/command/downTemplate`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 发货指令
   * @name LuteosErpPlanShipCommandLockCommand
   * @summary 锁定、解锁、作废接口
   * @request POST:/api/luteos/erp/plan/ship/command/lockCommand
   * @deprecated
   * @response `200` `CommonRespObject` OK
   */
  luteosErpPlanShipCommandLockCommand = (
    req: PlanShipCommandUpdateStatusReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/erp/plan/ship/command/lockCommand`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 发货指令
   * @name LuteosErpPlanShipCommandQueryDetailList
   * @summary 发货指令详情
   * @request GET:/api/luteos/erp/plan/ship/command/queryDetailList
   * @deprecated
   * @response `200` `PlanShipCommandDetailResp` OK
   */
  luteosErpPlanShipCommandQueryDetailList = (
    query?: {
      /** 指令编码 */
      commandCode?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<PlanShipCommandDetailResp, any>({
      path: `/api/luteos/erp/plan/ship/command/queryDetailList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 发货指令
   * @name LuteosErpPlanShipCommandQueryList
   * @summary 发货指令查询
   * @request GET:/api/luteos/erp/plan/ship/command/queryList
   * @deprecated
   * @response `200` `PlanShipCommandListQueryResp` OK
   */
  luteosErpPlanShipCommandQueryList = (
    query: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<PlanShipCommandListQueryResp, any>({
      path: `/api/luteos/erp/plan/ship/command/queryList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 发货指令
   * @name LuteosErpPlanShipCommandQueryShipMaxQty
   * @summary 发货指令-获取最大发货数量
   * @request GET:/api/luteos/erp/plan/ship/command/queryShipMaxQty
   * @deprecated
   * @response `200` `PlanShipCommandSupplyQtyResp` OK
   */
  luteosErpPlanShipCommandQueryShipMaxQty = (
    query?: {
      /** supplySku */
      supplySku?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<PlanShipCommandSupplyQtyResp, any>({
      path: `/api/luteos/erp/plan/ship/command/queryShipMaxQty`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 发货指令
   * @name LuteosErpPlanShipCommandQuerySupplySkuList
   * @summary 发货指令-供应链SKU列表
   * @request GET:/api/luteos/erp/plan/ship/command/querySupplySkuList
   * @deprecated
   * @response `200` `PlanShipCommandSupplyQueryResp` OK
   */
  luteosErpPlanShipCommandQuerySupplySkuList = (
    query?: {
      /** skuCode */
      skuCode?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<PlanShipCommandSupplyQueryResp, any>({
      path: `/api/luteos/erp/plan/ship/command/querySupplySkuList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 发货指令
   * @name LuteosErpPlanShipCommandSave
   * @summary 新增发货指令
   * @request POST:/api/luteos/erp/plan/ship/command/save
   * @deprecated
   * @response `200` `CommonRespObject` OK
   */
  luteosErpPlanShipCommandSave = (req: PlanShipCommandSaveReq, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/erp/plan/ship/command/save`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 发货指令
   * @name LuteosErpPlanShipCommandShip
   * @summary 发货接口
   * @request POST:/api/luteos/erp/plan/ship/command/ship
   * @deprecated
   * @response `200` `CommonRespObject` OK
   */
  luteosErpPlanShipCommandShip = (req: PlanShipCommandShipReq, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/erp/plan/ship/command/ship`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 发货指令
   * @name LuteosErpPlanShipCommandUpload
   * @summary 批量发货、更新
   * @request POST:/api/luteos/erp/plan/ship/command/upload
   * @deprecated
   * @response `200` `CommonRespObject` OK
   */
  luteosErpPlanShipCommandUpload = (req: PlanCommandShipUploadReq, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/erp/plan/ship/command/upload`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 发货指令-V2
   * @name LuteosErpPlanShipCommandV2DownTemplate
   * @summary 发货指令-下载上传模板
   * @request GET:/api/luteos/erp/plan/ship/command/v2/downTemplate
   * @response `200` `void` OK
   */
  luteosErpPlanShipCommandV2DownTemplate = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/luteos/erp/plan/ship/command/v2/downTemplate`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 发货指令-V2
   * @name LuteosErpPlanShipCommandV2LockCommand
   * @summary 发货指令-锁定、解锁、作废
   * @request POST:/api/luteos/erp/plan/ship/command/v2/lockCommand
   * @response `200` `CommonResp` OK
   */
  luteosErpPlanShipCommandV2LockCommand = (
    req: PlanShipCommandUpdateStatusReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/plan/ship/command/v2/lockCommand`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 发货指令-V2
   * @name LuteosErpPlanShipCommandV2Modify
   * @summary 发货指令-编辑
   * @request POST:/api/luteos/erp/plan/ship/command/v2/modify
   * @response `200` `CommonResp` OK
   */
  luteosErpPlanShipCommandV2Modify = (
    req: PlanShipCommandUpdateV2Req,
    params: RequestParams = {},
  ) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/plan/ship/command/v2/modify`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 发货指令-V2
   * @name LuteosErpPlanShipCommandV2QueryDetail
   * @summary 发货指令-详情
   * @request GET:/api/luteos/erp/plan/ship/command/v2/queryDetail
   * @response `200` `PlanShipCommandDetailQueryV2Resp` OK
   */
  luteosErpPlanShipCommandV2QueryDetail = (
    query: {
      /** commandCode */
      commandCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<PlanShipCommandDetailQueryV2Resp, any>({
      path: `/api/luteos/erp/plan/ship/command/v2/queryDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 发货指令-V2
   * @name LuteosErpPlanShipCommandV2QueryList
   * @summary 发货指令-列表查询
   * @request GET:/api/luteos/erp/plan/ship/command/v2/queryList
   * @response `200` `PlanShipCommandListQueryV2Resp` OK
   */
  luteosErpPlanShipCommandV2QueryList = (
    query: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<PlanShipCommandListQueryV2Resp, any>({
      path: `/api/luteos/erp/plan/ship/command/v2/queryList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 发货指令-V2
   * @name LuteosErpPlanShipCommandV2QuerySelectPlanList
   * @summary 发货指令-查询下拉列表
   * @request GET:/api/luteos/erp/plan/ship/command/v2/querySelectPlanList
   * @response `200` `PlanShipCommandSelectPlanListQueryResp` OK
   */
  luteosErpPlanShipCommandV2QuerySelectPlanList = (
    query: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<PlanShipCommandSelectPlanListQueryResp, any>({
      path: `/api/luteos/erp/plan/ship/command/v2/querySelectPlanList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 发货指令-V2
   * @name LuteosErpPlanShipCommandV2QueryShipMaxQty
   * @summary 发货指令-获取最大发货数量
   * @request GET:/api/luteos/erp/plan/ship/command/v2/queryShipMaxQty
   * @response `200` `PlanShipCommandSupplyQtyResp` OK
   */
  luteosErpPlanShipCommandV2QueryShipMaxQty = (
    query: {
      /** skuCode */
      skuCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<PlanShipCommandSupplyQtyResp, any>({
      path: `/api/luteos/erp/plan/ship/command/v2/queryShipMaxQty`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 发货指令-V2
   * @name LuteosErpPlanShipCommandV2QuerySupplySkuList
   * @summary 发货指令-供应链SKU列表
   * @request GET:/api/luteos/erp/plan/ship/command/v2/querySupplySkuList
   * @response `200` `PlanShipCommandSupplyQueryV2Resp` OK
   */
  luteosErpPlanShipCommandV2QuerySupplySkuList = (
    query: {
      /** skuCode */
      skuCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<PlanShipCommandSupplyQueryV2Resp, any>({
      path: `/api/luteos/erp/plan/ship/command/v2/querySupplySkuList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 发货指令-V2
   * @name LuteosErpPlanShipCommandV2Save
   * @summary 发货指令-新增
   * @request POST:/api/luteos/erp/plan/ship/command/v2/save
   * @response `200` `CommonResp` OK
   */
  luteosErpPlanShipCommandV2Save = (req: PlanShipCommandSaveV2Req, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/plan/ship/command/v2/save`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 发货指令-V2
   * @name LuteosErpPlanShipCommandV2Upload
   * @summary 发货指令-批量发货、更新
   * @request POST:/api/luteos/erp/plan/ship/command/v2/upload
   * @response `200` `CommonRespObject` OK
   */
  luteosErpPlanShipCommandV2Upload = (req: PlanCommandShipUploadReq, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/erp/plan/ship/command/v2/upload`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 货件管理
   * @name LuteosErpPlanShipmentQueryList
   * @summary 货件管理-列表查询
   * @request POST:/api/luteos/erp/plan/shipment/queryList
   * @deprecated
   * @response `200` `PlanShipmentListQueryResp` OK
   */
  luteosErpPlanShipmentQueryList = (req: PlanShipmentListQueryReq, params: RequestParams = {}) =>
    this.request<PlanShipmentListQueryResp, any>({
      path: `/api/luteos/erp/plan/shipment/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 货件管理
   * @name LuteosErpPlanShipmentQuerySelectPlanList
   * @summary 货件管理-查询下拉列表
   * @request GET:/api/luteos/erp/plan/shipment/querySelectPlanList
   * @deprecated
   * @response `200` `PlanShipmentSelectPlanListQueryResp` OK
   */
  luteosErpPlanShipmentQuerySelectPlanList = (
    query: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<PlanShipmentSelectPlanListQueryResp, any>({
      path: `/api/luteos/erp/plan/shipment/querySelectPlanList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 货件管理
   * @name LuteosErpPlanShipmentSave
   * @summary 发货指令-发货
   * @request POST:/api/luteos/erp/plan/shipment/save
   * @deprecated
   * @response `200` `CommonResp` OK
   */
  luteosErpPlanShipmentSave = (req: PlanShipmentSaveV2Req, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/plan/shipment/save`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 供应周期
   * @name LuteosErpPlanSupplyCycleDownTemplate
   * @summary 下载批量导入模板(导出)
   * @request POST:/api/luteos/erp/plan/supply/cycle/downTemplate
   * @response `200` `CommonRespString` OK
   */
  luteosErpPlanSupplyCycleDownTemplate = (
    req: PlanSupplyCycleListQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/erp/plan/supply/cycle/downTemplate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 供应周期
   * @name LuteosErpPlanSupplyCycleQueryList
   * @summary 供应周期查询
   * @request GET:/api/luteos/erp/plan/supply/cycle/queryList
   * @response `200` `PlanSupplyCycleListQueryResp` OK
   */
  luteosErpPlanSupplyCycleQueryList = (
    query: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<PlanSupplyCycleListQueryResp, any>({
      path: `/api/luteos/erp/plan/supply/cycle/queryList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 供应周期
   * @name LuteosErpPlanSupplyCycleQueryPlatfromSkuIdentify
   * @summary 原平台标识查询
   * @request GET:/api/luteos/erp/plan/supply/cycle/queryPlatfromSkuIdentify
   * @response `200` `CommonRespListString` OK
   */
  luteosErpPlanSupplyCycleQueryPlatfromSkuIdentify = (
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
      path: `/api/luteos/erp/plan/supply/cycle/queryPlatfromSkuIdentify`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 供应周期
   * @name LuteosErpPlanSupplyCycleQuerySupplySku
   * @summary 供应链SKU查询
   * @request GET:/api/luteos/erp/plan/supply/cycle/querySupplySku
   * @response `200` `CommonRespListString` OK
   */
  luteosErpPlanSupplyCycleQuerySupplySku = (params: RequestParams = {}) =>
    this.request<CommonRespListString, any>({
      path: `/api/luteos/erp/plan/supply/cycle/querySupplySku`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 供应周期
   * @name LuteosErpPlanSupplyCycleSave
   * @summary 供应周期保存
   * @request POST:/api/luteos/erp/plan/supply/cycle/save
   * @response `200` `CommonResp` OK
   */
  luteosErpPlanSupplyCycleSave = (req: PlanSuppluCycleSaveReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/plan/supply/cycle/save`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 供应周期
   * @name LuteosErpPlanSupplyCycleUpload
   * @summary 批量导入
   * @request POST:/api/luteos/erp/plan/supply/cycle/upload
   * @response `200` `CommonResp` OK
   */
  luteosErpPlanSupplyCycleUpload = (req: UploadReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/plan/supply/cycle/upload`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 周转管理, 备货调整-批量更新状态
   * @name LuteosErpPlanTurnoverBatchUpdateStatus
   * @summary 批量更新状态
   * @request POST:/api/luteos/erp/plan/turnover/batchUpdateStatus
   * @response `200` `CommonRespVoid` OK
   */
  luteosErpPlanTurnoverBatchUpdateStatus = (
    req: PlanTurnoverConfirmStatusReq[],
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/erp/plan/turnover/batchUpdateStatus`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 周转天数, 周转管理
   * @name LuteosErpPlanTurnoverCalcuTurnDayList
   * @summary 周转天数列表计算
   * @request POST:/api/luteos/erp/plan/turnover/calcuTurnDayList
   * @response `200` `CommonRespPlanTurnOverCacuBean` OK
   */
  luteosErpPlanTurnoverCalcuTurnDayList = (req: PlanTurnOverCacuBean, params: RequestParams = {}) =>
    this.request<CommonRespPlanTurnOverCacuBean, any>({
      path: `/api/luteos/erp/plan/turnover/calcuTurnDayList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 周转天数, 周转管理
   * @name LuteosErpPlanTurnoverCanRefresh
   * @summary 周转-是否能手动刷新
   * @request POST:/api/luteos/erp/plan/turnover/can/refresh
   * @response `200` `CommonRespBoolean` OK
   */
  luteosErpPlanTurnoverCanRefresh = (params: RequestParams = {}) =>
    this.request<CommonRespBoolean, any>({
      path: `/api/luteos/erp/plan/turnover/can/refresh`,
      method: 'POST',
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 周转天数, 周转管理
   * @name LuteosErpPlanTurnoverExportList
   * @summary 周转详情列表导出
   * @request POST:/api/luteos/erp/plan/turnover/exportList
   * @response `200` `CommonExportResp` OK
   */
  luteosErpPlanTurnoverExportList = (req: PlanTurnOverListQueryReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/erp/plan/turnover/exportList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 周转管理
   * @name LuteosErpPlanTurnoverGetTurnOverLogList
   * @summary 获取周转变更日志
   * @request GET:/api/luteos/erp/plan/turnover/getTurnOverLogList
   * @response `200` `CommonRespListOperationLogBean` OK
   */
  luteosErpPlanTurnoverGetTurnOverLogList = (
    query: {
      /** 周转单号 */
      code: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespListOperationLogBean, any>({
      path: `/api/luteos/erp/plan/turnover/getTurnOverLogList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 周转物流, 周转管理
   * @name LuteosErpPlanTurnoverLogisticsQueryList
   * @summary 物流方式列表查询
   * @request GET:/api/luteos/erp/plan/turnover/logistics/queryList
   * @response `200` `PlanTurnOverLogisticsQueryResp` OK
   */
  luteosErpPlanTurnoverLogisticsQueryList = (params: RequestParams = {}) =>
    this.request<PlanTurnOverLogisticsQueryResp, any>({
      path: `/api/luteos/erp/plan/turnover/logistics/queryList`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 周转物流, 周转管理
   * @name LuteosErpPlanTurnoverLogisticsQueryListForSku
   * @summary 物流方式列表查询(SKU基础配置)
   * @request GET:/api/luteos/erp/plan/turnover/logistics/queryListForSku
   * @response `200` `PlanTurnOverLogisticsQueryResp` OK
   */
  luteosErpPlanTurnoverLogisticsQueryListForSku = (params: RequestParams = {}) =>
    this.request<PlanTurnOverLogisticsQueryResp, any>({
      path: `/api/luteos/erp/plan/turnover/logistics/queryListForSku`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 周转物流, 周转管理
   * @name LuteosErpPlanTurnoverLogisticsSave
   * @summary 物流方式保存
   * @request POST:/api/luteos/erp/plan/turnover/logistics/save
   * @response `200` `CommonRespVoid` OK
   */
  luteosErpPlanTurnoverLogisticsSave = (
    req: PlanTurnOverLogisticsSaveReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/erp/plan/turnover/logistics/save`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 周转管理
   * @name LuteosErpPlanTurnoverManualSnapOnWay
   * @summary 手动同步在途在制
   * @request POST:/api/luteos/erp/plan/turnover/manualSnapOnWay
   * @response `200` `CommonRespVoid` OK
   */
  luteosErpPlanTurnoverManualSnapOnWay = (
    req: PlanTurnoverRefreshReq[],
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/erp/plan/turnover/manualSnapOnWay`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 周转管理
   * @name LuteosErpPlanTurnoverManualSyncForecast
   * @summary 手动同步销量预测
   * @request POST:/api/luteos/erp/plan/turnover/manualSyncForecast
   * @response `200` `CommonRespVoid` OK
   */
  luteosErpPlanTurnoverManualSyncForecast = (
    req: PlanTurnoverRefreshReq[],
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/erp/plan/turnover/manualSyncForecast`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 周转天数, 周转管理
   * @name LuteosErpPlanTurnoverQueryDetail
   * @summary 周转天数详情
   * @request GET:/api/luteos/erp/plan/turnover/queryDetail
   * @response `200` `PlanTurnOverDetailQueryResp` OK
   */
  luteosErpPlanTurnoverQueryDetail = (
    query: {
      /** 编码 */
      code: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<PlanTurnOverDetailQueryResp, any>({
      path: `/api/luteos/erp/plan/turnover/queryDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 周转天数, 周转管理
   * @name LuteosErpPlanTurnoverQueryList
   * @summary 周转天数列表查询
   * @request POST:/api/luteos/erp/plan/turnover/queryList
   * @response `200` `PlanTurnOverListQueryResp` OK
   */
  luteosErpPlanTurnoverQueryList = (req: PlanTurnOverListQueryReq, params: RequestParams = {}) =>
    this.request<PlanTurnOverListQueryResp, any>({
      path: `/api/luteos/erp/plan/turnover/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 周转管理, 查询备货时效详情
   * @name LuteosErpPlanTurnoverQueryStockTimeDetails
   * @summary 查询备货时效详情
   * @request POST:/api/luteos/erp/plan/turnover/queryStockTimeDetails
   * @response `200` `StockingTimeDetailsQueryResp` OK
   */
  luteosErpPlanTurnoverQueryStockTimeDetails = (
    req: StockingTimeDetailsQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<StockingTimeDetailsQueryResp, any>({
      path: `/api/luteos/erp/plan/turnover/queryStockTimeDetails`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 周转管理, 查询备货时效列表
   * @name LuteosErpPlanTurnoverQueryStockTimeList
   * @summary 查询备货时效列表
   * @request POST:/api/luteos/erp/plan/turnover/queryStockTimeList
   * @response `200` `StockingTimeListQueryResp` OK
   */
  luteosErpPlanTurnoverQueryStockTimeList = (
    req: StockingTimeListQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<StockingTimeListQueryResp, any>({
      path: `/api/luteos/erp/plan/turnover/queryStockTimeList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 周转天数, 周转管理
   * @name LuteosErpPlanTurnoverQueryStrategyDetail
   * @summary 周转天数策略详情
   * @request GET:/api/luteos/erp/plan/turnover/queryStrategyDetail
   * @response `200` `PlanTurnoverStrategyBean` OK
   */
  luteosErpPlanTurnoverQueryStrategyDetail = (
    query: {
      /** 编码 */
      code: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<PlanTurnoverStrategyBean, any>({
      path: `/api/luteos/erp/plan/turnover/queryStrategyDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 周转管理
   * @name LuteosErpPlanTurnoverQueryuploadAutoPackTemplate
   * @summary 获取上传自动装箱模板
   * @request GET:/api/luteos/erp/plan/turnover/queryuploadAutoPackTemplate
   * @response `200` `ImportTemplateQueryResp` OK
   */
  luteosErpPlanTurnoverQueryuploadAutoPackTemplate = (params: RequestParams = {}) =>
    this.request<ImportTemplateQueryResp, any>({
      path: `/api/luteos/erp/plan/turnover/queryuploadAutoPackTemplate`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 周转天数, 周转管理
   * @name LuteosErpPlanTurnoverRefresh
   * @summary 周转-刷新
   * @request POST:/api/luteos/erp/plan/turnover/refresh
   * @response `200` `CommonResp` OK
   */
  luteosErpPlanTurnoverRefresh = (params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/plan/turnover/refresh`,
      method: 'POST',
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 周转天数, 周转管理
   * @name LuteosErpPlanTurnoverSaveCalcuTurnDayList
   * @summary 周转天数列表计算-保存
   * @request POST:/api/luteos/erp/plan/turnover/saveCalcuTurnDayList
   * @response `200` `CommonRespObject` OK
   */
  luteosErpPlanTurnoverSaveCalcuTurnDayList = (
    req: PlanTurnOverCacuBean[],
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/erp/plan/turnover/saveCalcuTurnDayList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 周转管理, 备货调整列表导出
   * @name LuteosErpPlanTurnoverStockListExport
   * @summary 备货调整列表导出
   * @request POST:/api/luteos/erp/plan/turnover/stockListExport
   * @response `200` `CommonExportResp` OK
   */
  luteosErpPlanTurnoverStockListExport = (
    req: PlanTurnOverListQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/erp/plan/turnover/stockListExport`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 周转管理, 备货调整列表导入
   * @name LuteosErpPlanTurnoverStockListImport
   * @summary 备货调整列表导入
   * @request POST:/api/luteos/erp/plan/turnover/stockListImport
   * @response `200` `CommonResp` OK
   */
  luteosErpPlanTurnoverStockListImport = (
    req: PlanTurnOverListImportReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/plan/turnover/stockListImport`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 周转管理, 备货时效保存更新
   * @name LuteosErpPlanTurnoverStockingTimeSaveOrUpdate
   * @summary 备货时效保存更新
   * @request POST:/api/luteos/erp/plan/turnover/stockingTime/saveOrUpdate
   * @response `200` `CommonRespVoid` OK
   */
  luteosErpPlanTurnoverStockingTimeSaveOrUpdate = (
    req: StockingTimeSaveReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/erp/plan/turnover/stockingTime/saveOrUpdate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 周转天数, 周转管理
   * @name LuteosErpPlanTurnoverStrategySave
   * @summary 周转策略保存
   * @request POST:/api/luteos/erp/plan/turnover/strategy/save
   * @response `200` `CommonRespVoid` OK
   */
  luteosErpPlanTurnoverStrategySave = (
    req: PlanTurnoverStrategySaveReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/erp/plan/turnover/strategy/save`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 周转管理
   * @name LuteosErpPlanTurnoverStrategyTemplateChangeStatus
   * @summary 周转策略模板变更状态
   * @request POST:/api/luteos/erp/plan/turnover/strategy/template/changeStatus
   * @response `200` `CommonResp` OK
   */
  luteosErpPlanTurnoverStrategyTemplateChangeStatus = (
    req: PsfatChangeStatusReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/plan/turnover/strategy/template/changeStatus`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 周转策略模板, 周转管理
   * @name LuteosErpPlanTurnoverStrategyTemplateQueryAllList
   * @summary 所有周转策略模板查询
   * @request GET:/api/luteos/erp/plan/turnover/strategy/template/queryAllList
   * @response `200` `CommonRespListPlanTurnoverStrategyTemplateBean` OK
   */
  luteosErpPlanTurnoverStrategyTemplateQueryAllList = (params: RequestParams = {}) =>
    this.request<CommonRespListPlanTurnoverStrategyTemplateBean, any>({
      path: `/api/luteos/erp/plan/turnover/strategy/template/queryAllList`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 周转策略模板, 周转管理
   * @name LuteosErpPlanTurnoverStrategyTemplateQueryDefault
   * @summary 查询默认周转策略模板
   * @request GET:/api/luteos/erp/plan/turnover/strategy/template/queryDefault
   * @response `200` `PlanTurnoverStrategyTemplateBean` OK
   */
  luteosErpPlanTurnoverStrategyTemplateQueryDefault = (params: RequestParams = {}) =>
    this.request<PlanTurnoverStrategyTemplateBean, any>({
      path: `/api/luteos/erp/plan/turnover/strategy/template/queryDefault`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 周转策略模板, 周转管理
   * @name LuteosErpPlanTurnoverStrategyTemplateQueryList
   * @summary 周转策略模板查询
   * @request GET:/api/luteos/erp/plan/turnover/strategy/template/queryList
   * @response `200` `PlanTurnOverStrategyTemplateListQueryResp` OK
   */
  luteosErpPlanTurnoverStrategyTemplateQueryList = (
    query: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<PlanTurnOverStrategyTemplateListQueryResp, any>({
      path: `/api/luteos/erp/plan/turnover/strategy/template/queryList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 周转策略模板, 周转管理
   * @name LuteosErpPlanTurnoverStrategyTemplateSave
   * @summary 周转策略模板编辑保存
   * @request POST:/api/luteos/erp/plan/turnover/strategy/template/save
   * @response `200` `CommonResp` OK
   */
  luteosErpPlanTurnoverStrategyTemplateSave = (
    req: PlanTurnoverStrategyTemplateSaveReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/plan/turnover/strategy/template/save`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 周转管理
   * @name LuteosErpPlanTurnoverUploadAutoPack
   * @summary 上传自动装箱
   * @request POST:/api/luteos/erp/plan/turnover/uploadAutoPack
   * @response `200` `CommonResp` OK
   */
  luteosErpPlanTurnoverUploadAutoPack = (req: UploadReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/plan/turnover/uploadAutoPack`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP平台模块
   * @name LuteosErpPlatformRefresh
   * @summary 业务模块-手动刷新
   * @request POST:/api/luteos/erp/platform/refresh
   * @response `200` `CommonRespBoolean` OK
   */
  luteosErpPlatformRefresh = (req: ModelRefreshReq, params: RequestParams = {}) =>
    this.request<CommonRespBoolean, any>({
      path: `/api/luteos/erp/platform/refresh`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-PO单
   * @name LuteosErpPoClose
   * @summary 关闭PO单
   * @request POST:/api/luteos/erp/po/close
   * @response `200` `CommonRespString` OK
   */
  luteosErpPoClose = (req: ErpPoCloseReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/erp/po/close`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-PO单
   * @name LuteosErpPoSync
   * @summary 同步PO单
   * @request POST:/api/luteos/erp/po/sync
   * @response `200` `CommonRespString` OK
   */
  luteosErpPoSync = (req: ErpPoSyncReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/erp/po/sync`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-申购单
   * @name LuteosErpPrAbandon
   * @summary 作废
   * @request POST:/api/luteos/erp/pr/abandon
   * @response `200` `CommonResp` OK
   */
  luteosErpPrAbandon = (
    query: {
      /** code */
      code: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/pr/abandon`,
      method: 'POST',
      query: query,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-申购单
   * @name LuteosErpPrAnalysisDetail
   * @summary 解析批量修改产品明细模板
   * @request POST:/api/luteos/erp/pr/analysis/detail
   * @response `200` `CommonRespListPrDownDetailItemReq` OK
   */
  luteosErpPrAnalysisDetail = (req: UploadReq, params: RequestParams = {}) =>
    this.request<CommonRespListPrDownDetailItemReq, any>({
      path: `/api/luteos/erp/pr/analysis/detail`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-申购单
   * @name LuteosErpPrAuth
   * @summary 审核
   * @request POST:/api/luteos/erp/pr/auth
   * @response `200` `CommonResp` OK
   */
  luteosErpPrAuth = (req: PrAuthReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/pr/auth`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-申购单
   * @name LuteosErpPrDownUpdateDetail
   * @summary 下载批量修改产品明细模板
   * @request POST:/api/luteos/erp/pr/downUpdateDetail
   * @response `200` `CommonRespString` OK
   */
  luteosErpPrDownUpdateDetail = (req: PrDownDetailItemReq[], params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/erp/pr/downUpdateDetail`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-申购单
   * @name LuteosErpPrDownloadList
   * @summary 下载Pr单
   * @request POST:/api/luteos/erp/pr/downloadList
   * @response `200` `CommonRespCommonExportResp` OK
   */
  luteosErpPrDownloadList = (req: PrListQueryReq, params: RequestParams = {}) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/luteos/erp/pr/downloadList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-申购单
   * @name LuteosErpPrQueryDetail
   * @summary 查询详情
   * @request GET:/api/luteos/erp/pr/queryDetail
   * @response `200` `PrDetailQueryResp` OK
   */
  luteosErpPrQueryDetail = (
    query: {
      /** code */
      code: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<PrDetailQueryResp, any>({
      path: `/api/luteos/erp/pr/queryDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-申购单
   * @name LuteosErpPrQueryList
   * @summary 查询列表
   * @request POST:/api/luteos/erp/pr/queryList
   * @response `200` `PrListQueryResp` OK
   */
  luteosErpPrQueryList = (req: PrListQueryReq, params: RequestParams = {}) =>
    this.request<PrListQueryResp, any>({
      path: `/api/luteos/erp/pr/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-申购单
   * @name LuteosErpPrSave
   * @summary 新增
   * @request POST:/api/luteos/erp/pr/save
   * @response `200` `CommonRespString` OK
   */
  luteosErpPrSave = (req: PrSaveResp, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/erp/pr/save`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-申购单
   * @name LuteosErpPrUpdate
   * @summary 编辑
   * @request POST:/api/luteos/erp/pr/update
   * @response `200` `CommonRespString` OK
   */
  luteosErpPrUpdate = (req: PrSaveResp, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/erp/pr/update`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 报价单
   * @name LuteosErpQuotationAbandon
   * @summary 作废
   * @request POST:/api/luteos/erp/quotation/abandon
   * @response `200` `CommonResp` OK
   */
  luteosErpQuotationAbandon = (req: QuotationOrderAbandonReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/quotation/abandon`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 报价单
   * @name LuteosErpQuotationAuth
   * @summary 审核
   * @request POST:/api/luteos/erp/quotation/auth
   * @response `200` `CommonResp` OK
   */
  luteosErpQuotationAuth = (req: QuotationOrderAuthReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/quotation/auth`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 报价单
   * @name LuteosErpQuotationDownTemplate
   * @summary 下载批量新增上传模板
   * @request POST:/api/luteos/erp/quotation/downTemplate
   * @response `200` `CommonRespString` OK
   */
  luteosErpQuotationDownTemplate = (params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/erp/quotation/downTemplate`,
      method: 'POST',
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 报价单
   * @name LuteosErpQuotationDownload
   * @summary 导出报价单
   * @request POST:/api/luteos/erp/quotation/download
   * @response `200` `CommonExportResp` OK
   */
  luteosErpQuotationDownload = (req: QuotationOrderListReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/erp/quotation/download`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 报价定价策略
   * @name LuteosErpQuotationPriceDownTemplate
   * @summary 下载上传模板
   * @request POST:/api/luteos/erp/quotation/price/downTemplate
   * @response `200` `CommonRespString` OK
   */
  luteosErpQuotationPriceDownTemplate = (req: QuotationPriceListReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/erp/quotation/price/downTemplate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 报价定价策略
   * @name LuteosErpQuotationPriceGetSuggestPrice
   * @summary 获取建议售价
   * @request GET:/api/luteos/erp/quotation/price/getSuggestPrice
   * @response `200` `SuggestPriceResp` OK
   */
  luteosErpQuotationPriceGetSuggestPrice = (
    query: {
      /** currencyCode */
      currencyCode: string;
      /** customerCode */
      customerCode?: string;
      /** skuCode */
      skuCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<SuggestPriceResp, any>({
      path: `/api/luteos/erp/quotation/price/getSuggestPrice`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 报价定价策略
   * @name LuteosErpQuotationPriceGetSuggestPrice2
   * @summary 获取建议售价批量
   * @request POST:/api/luteos/erp/quotation/price/getSuggestPrice
   * @originalName luteosErpQuotationPriceGetSuggestPrice
   * @duplicate
   * @response `200` `Record<string,SuggestPriceResp>` OK
   */
  luteosErpQuotationPriceGetSuggestPrice2 = (req: SuggestPriceReq, params: RequestParams = {}) =>
    this.request<Record<string, SuggestPriceResp>, any>({
      path: `/api/luteos/erp/quotation/price/getSuggestPrice`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 报价定价策略
   * @name LuteosErpQuotationPriceQueryList
   * @summary 报价单列表查询
   * @request POST:/api/luteos/erp/quotation/price/queryList
   * @response `200` `QuotationPriceListResp` OK
   */
  luteosErpQuotationPriceQueryList = (req: QuotationPriceListReq, params: RequestParams = {}) =>
    this.request<QuotationPriceListResp, any>({
      path: `/api/luteos/erp/quotation/price/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 报价定价策略
   * @name LuteosErpQuotationPriceSaveOrUpdate
   * @summary 新增/编辑
   * @request POST:/api/luteos/erp/quotation/price/saveOrUpdate
   * @response `200` `CommonResp` OK
   */
  luteosErpQuotationPriceSaveOrUpdate = (req: QuotationPriceSaveReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/quotation/price/saveOrUpdate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 报价定价策略
   * @name LuteosErpQuotationPriceUpload
   * @summary 上传定价
   * @request POST:/api/luteos/erp/quotation/price/upload
   * @response `200` `CommonResp` OK
   */
  luteosErpQuotationPriceUpload = (req: UploadReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/quotation/price/upload`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 报价单
   * @name LuteosErpQuotationQueryDetail
   * @summary 详情
   * @request GET:/api/luteos/erp/quotation/queryDetail
   * @response `200` `QuotationOrderDetailResp` OK
   */
  luteosErpQuotationQueryDetail = (
    query: {
      /** code */
      code: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<QuotationOrderDetailResp, any>({
      path: `/api/luteos/erp/quotation/queryDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 报价单
   * @name LuteosErpQuotationQueryList
   * @summary 列表查询
   * @request POST:/api/luteos/erp/quotation/queryList
   * @response `200` `QuotationOrderListResp` OK
   */
  luteosErpQuotationQueryList = (req: QuotationOrderListReq, params: RequestParams = {}) =>
    this.request<QuotationOrderListResp, any>({
      path: `/api/luteos/erp/quotation/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 报价单
   * @name LuteosErpQuotationSaveOrUpdate
   * @summary 新增/保存
   * @request POST:/api/luteos/erp/quotation/saveOrUpdate
   * @response `200` `CommonRespString` OK
   */
  luteosErpQuotationSaveOrUpdate = (req: QuotationOrderSaveReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/erp/quotation/saveOrUpdate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 报价单
   * @name LuteosErpQuotationUpload
   * @summary 上传批量新新增
   * @request POST:/api/luteos/erp/quotation/upload
   * @response `200` `CommonResp` OK
   */
  luteosErpQuotationUpload = (req: UploadReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/quotation/upload`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-订单-税率配置
   * @name LuteosErpRateCfgChangeStatus
   * @summary 变更状态
   * @request POST:/api/luteos/erp/rate/cfg/changeStatus
   * @response `200` `CommonResp` OK
   */
  luteosErpRateCfgChangeStatus = (
    req: ErpOrderRateCfgChangeStatusReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/rate/cfg/changeStatus`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-订单-税率配置
   * @name LuteosErpRateCfgChooseRateCfg
   * @summary 选择汇率
   * @request POST:/api/luteos/erp/rate/cfg/chooseRateCfg
   * @response `200` `ErpOrderRateCfgListQueryRespItem` OK
   */
  luteosErpRateCfgChooseRateCfg = (req: ErpOrderRateCfgChooseBean, params: RequestParams = {}) =>
    this.request<ErpOrderRateCfgListQueryRespItem, any>({
      path: `/api/luteos/erp/rate/cfg/chooseRateCfg`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-订单-税率配置
   * @name LuteosErpRateCfgDownTemplate
   * @summary 下载批量导入模板(导出)
   * @request POST:/api/luteos/erp/rate/cfg/downTemplate
   * @response `200` `CommonRespString` OK
   */
  luteosErpRateCfgDownTemplate = (params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/erp/rate/cfg/downTemplate`,
      method: 'POST',
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-订单-税率配置
   * @name LuteosErpRateCfgExport
   * @summary 导出
   * @request POST:/api/luteos/erp/rate/cfg/export
   * @response `200` `CommonRespCommonExportResp` OK
   */
  luteosErpRateCfgExport = (req: ErpOrderRateCfgListQueryReq, params: RequestParams = {}) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/luteos/erp/rate/cfg/export`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-订单-税率配置
   * @name LuteosErpRateCfgQueryList
   * @summary 查询列表
   * @request POST:/api/luteos/erp/rate/cfg/queryList
   * @response `200` `ErpOrderRateCfgListQueryResp` OK
   */
  luteosErpRateCfgQueryList = (req: ErpOrderRateCfgListQueryReq, params: RequestParams = {}) =>
    this.request<ErpOrderRateCfgListQueryResp, any>({
      path: `/api/luteos/erp/rate/cfg/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-订单-税率配置
   * @name LuteosErpRateCfgUpload
   * @summary 批量导入
   * @request POST:/api/luteos/erp/rate/cfg/upload
   * @response `200` `CommonResp` OK
   */
  luteosErpRateCfgUpload = (req: UploadReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/rate/cfg/upload`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 移仓订单
   * @name LuteosErpRemovalAbandon
   * @summary 移仓单作废
   * @request POST:/api/luteos/erp/removal/abandon
   * @response `200` `CommonRespVoid` OK
   */
  luteosErpRemovalAbandon = (req: RemovalBatchReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/erp/removal/abandon`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 移仓订单
   * @name LuteosErpRemovalApply
   * @summary 移仓单审核
   * @request POST:/api/luteos/erp/removal/apply
   * @response `200` `CommonRespVoid` OK
   */
  luteosErpRemovalApply = (req: RemovalBatchReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/erp/removal/apply`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 移仓订单
   * @name LuteosErpRemovalDetail
   * @summary 移仓单详情
   * @request GET:/api/luteos/erp/removal/detail
   * @response `200` `CommonRespRemovalDetailBean` OK
   */
  luteosErpRemovalDetail = (
    query: {
      /** 移仓单号 */
      orderId: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespRemovalDetailBean, any>({
      path: `/api/luteos/erp/removal/detail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 移仓订单
   * @name LuteosErpRemovalExport
   * @summary 导出
   * @request POST:/api/luteos/erp/removal/export
   * @response `200` `CommonExportResp` OK
   */
  luteosErpRemovalExport = (req: QueryRemovalReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/erp/removal/export`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 移仓订单
   * @name LuteosErpRemovalManualSync
   * @summary 手动同步
   * @request POST:/api/luteos/erp/removal/manualSync
   * @response `200` `CommonRespVoid` OK
   */
  luteosErpRemovalManualSync = (req: RemovalBatchReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/erp/removal/manualSync`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 移仓订单
   * @name LuteosErpRemovalPush
   * @summary 移仓单推送
   * @request POST:/api/luteos/erp/removal/push
   * @response `200` `CommonRespVoid` OK
   */
  luteosErpRemovalPush = (req: RemovalBatchReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/erp/removal/push`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 移仓订单
   * @name LuteosErpRemovalQueryList
   * @summary 移仓单分页查询
   * @request POST:/api/luteos/erp/removal/queryList
   * @response `200` `RemovalPageResp` OK
   */
  luteosErpRemovalQueryList = (req: QueryRemovalReq, params: RequestParams = {}) =>
    this.request<RemovalPageResp, any>({
      path: `/api/luteos/erp/removal/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 移仓订单
   * @name LuteosErpRemovalSaveOrUpdate
   * @summary 新增/修改移仓单
   * @request POST:/api/luteos/erp/removal/saveOrUpdate
   * @response `200` `CommonRespString` OK
   */
  luteosErpRemovalSaveOrUpdate = (req: RemovalSaveReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/erp/removal/saveOrUpdate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-退货入库单
   * @name LuteosErpReoSync
   * @summary 同步退货入库单
   * @request POST:/api/luteos/erp/reo/sync
   * @response `200` `CommonRespString` OK
   */
  luteosErpReoSync = (req: ErpReoSyncReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/erp/reo/sync`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 需求建议
   * @name LuteosErpRequirementSugguestAutoSaveNew
   * @summary 更新需求
   * @request POST:/api/luteos/erp/requirement/sugguest/autoSaveNew
   * @response `200` `CommonRespObject` OK
   */
  luteosErpRequirementSugguestAutoSaveNew = (params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/erp/requirement/sugguest/autoSaveNew`,
      method: 'POST',
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 需求建议
   * @name LuteosErpRequirementSugguestExportDetail
   * @summary 导出需求建议详情
   * @request POST:/api/luteos/erp/requirement/sugguest/exportDetail
   * @response `200` `CommonExportResp` OK
   */
  luteosErpRequirementSugguestExportDetail = (
    req: RequirementSugguestExportResp,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/erp/requirement/sugguest/exportDetail`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 需求建议
   * @name LuteosErpRequirementSugguestExportInventorySnapshot
   * @summary 导出库存快照
   * @request POST:/api/luteos/erp/requirement/sugguest/exportInventorySnapshot
   * @response `200` `CommonExportResp` OK
   */
  luteosErpRequirementSugguestExportInventorySnapshot = (
    req: InventorySnaoshotReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/erp/requirement/sugguest/exportInventorySnapshot`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 需求建议
   * @name LuteosErpRequirementSugguestQueryCurrentList
   * @summary 查询当前需求
   * @request POST:/api/luteos/erp/requirement/sugguest/queryCurrentList
   * @response `200` `RequirementSugguestCurrentQueryResp` OK
   */
  luteosErpRequirementSugguestQueryCurrentList = (
    req: RequirementSugguestCurrentQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<RequirementSugguestCurrentQueryResp, any>({
      path: `/api/luteos/erp/requirement/sugguest/queryCurrentList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 需求建议
   * @name LuteosErpRequirementSugguestQueryDetail
   * @summary 需求建议详情
   * @request GET:/api/luteos/erp/requirement/sugguest/queryDetail
   * @response `200` `RequirementSugguestDetailQueryResp` OK
   */
  luteosErpRequirementSugguestQueryDetail = (
    query: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<RequirementSugguestDetailQueryResp, any>({
      path: `/api/luteos/erp/requirement/sugguest/queryDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 需求建议
   * @name LuteosErpRequirementSugguestQueryList
   * @summary 需求建议查询
   * @request GET:/api/luteos/erp/requirement/sugguest/queryList
   * @response `200` `RequirementSugguestListQueryResp` OK
   */
  luteosErpRequirementSugguestQueryList = (
    query: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<RequirementSugguestListQueryResp, any>({
      path: `/api/luteos/erp/requirement/sugguest/queryList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 需求建议
   * @name LuteosErpRequirementSugguestSave
   * @summary 需求建议新增
   * @request POST:/api/luteos/erp/requirement/sugguest/save
   * @response `200` `CommonRespObject` OK
   */
  luteosErpRequirementSugguestSave = (
    req: RequirementSugguestSaveReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/erp/requirement/sugguest/save`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 零售预测
   * @name LuteosErpRetailSaleForecastAuditQueryDetail
   * @summary 销售预测变更审核详情--预测审核列表如果type=2用这个接口查详情
   * @request GET:/api/luteos/erp/retail/sale/forecast/audit/queryDetail
   * @response `200` `RetailSalesForecastAuditDetailV2Resp` OK
   */
  luteosErpRetailSaleForecastAuditQueryDetail = (
    query: {
      /** code */
      code: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<RetailSalesForecastAuditDetailV2Resp, any>({
      path: `/api/luteos/erp/retail/sale/forecast/audit/queryDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 零售预测
   * @name LuteosErpRetailSaleForecastAuditUpdate
   * @summary 销售预测审核重新提交情--预测审核列表如果type=2用这个接口编辑重新提交
   * @request POST:/api/luteos/erp/retail/sale/forecast/audit/update
   * @response `200` `CommonResp` OK
   */
  luteosErpRetailSaleForecastAuditUpdate = (
    req: RetailSalesForecastUpdateSubmitReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/retail/sale/forecast/audit/update`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 零售预测
   * @name LuteosErpRetailSaleForecastAuditHistory
   * @summary 预测行-预测历史
   * @request POST:/api/luteos/erp/retail/sale/forecast/auditHistory
   * @response `200` `SalesForecastAuditHistoryQueryResp` OK
   */
  luteosErpRetailSaleForecastAuditHistory = (
    req: RetailSalesForecastAuditHistoryQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<SalesForecastAuditHistoryQueryResp, any>({
      path: `/api/luteos/erp/retail/sale/forecast/auditHistory`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 零售预测
   * @name LuteosErpRetailSaleForecastBatchChangeStatus
   * @summary 批量-预测更新状态
   * @request POST:/api/luteos/erp/retail/sale/forecast/batchChangeStatus
   * @response `200` `CommonResp` OK
   */
  luteosErpRetailSaleForecastBatchChangeStatus = (
    req: BatchSalesForecastWeekChangeStatusReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/retail/sale/forecast/batchChangeStatus`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 零售预测
   * @name LuteosErpRetailSaleForecastExportSaveSkuTemplate
   * @summary 下载批量添加商品模版
   * @request POST:/api/luteos/erp/retail/sale/forecast/exportSaveSkuTemplate
   * @response `200` `CommonResp` OK
   */
  luteosErpRetailSaleForecastExportSaveSkuTemplate = (params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/retail/sale/forecast/exportSaveSkuTemplate`,
      method: 'POST',
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 零售预测
   * @name LuteosErpRetailSaleForecastExportTemplate
   * @summary 导出数据(批量更新模版)
   * @request POST:/api/luteos/erp/retail/sale/forecast/exportTemplate
   * @response `200` `CommonExportResp` OK
   */
  luteosErpRetailSaleForecastExportTemplate = (
    req: RetailSalesForecastListQueryV2Req,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/erp/retail/sale/forecast/exportTemplate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 零售预测
   * @name LuteosErpRetailSaleForecastQueryAllAddSkuList
   * @summary 查询所有新增的sku预测
   * @request GET:/api/luteos/erp/retail/sale/forecast/queryAllAddSkuList
   * @response `200` `(RetailSalesForecastSaveSkuReqItem)[]` OK
   */
  luteosErpRetailSaleForecastQueryAllAddSkuList = (params: RequestParams = {}) =>
    this.request<RetailSalesForecastSaveSkuReqItem[], any>({
      path: `/api/luteos/erp/retail/sale/forecast/queryAllAddSkuList`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 零售预测
   * @name LuteosErpRetailSaleForecastQueryList
   * @summary 销售预测列表
   * @request POST:/api/luteos/erp/retail/sale/forecast/queryList
   * @response `200` `RetailSalesForecastListQueryV2Resp` OK
   */
  luteosErpRetailSaleForecastQueryList = (
    req: RetailSalesForecastListQueryV2Req,
    params: RequestParams = {},
  ) =>
    this.request<RetailSalesForecastListQueryV2Resp, any>({
      path: `/api/luteos/erp/retail/sale/forecast/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 零售预测
   * @name LuteosErpRetailSaleForecastQuerySalesList
   * @summary 获取销量统计列表
   * @request POST:/api/luteos/erp/retail/sale/forecast/querySalesList
   * @response `200` `RetailSalesStatisticsResp` OK
   */
  luteosErpRetailSaleForecastQuerySalesList = (
    req: RetailSalesStatisticsReq,
    params: RequestParams = {},
  ) =>
    this.request<RetailSalesStatisticsResp, any>({
      path: `/api/luteos/erp/retail/sale/forecast/querySalesList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 零售预测
   * @name LuteosErpRetailSaleForecastSaveSkus
   * @summary 添加商品预测
   * @request POST:/api/luteos/erp/retail/sale/forecast/saveSkus
   * @response `200` `CommonResp` OK
   */
  luteosErpRetailSaleForecastSaveSkus = (
    req: RetailSalesForecastSaveSkuReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/retail/sale/forecast/saveSkus`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 零售预测
   * @name LuteosErpRetailSaleForecastSnapHistory
   * @summary 查询快照历史
   * @request POST:/api/luteos/erp/retail/sale/forecast/snapHistory
   * @response `200` `SalesForecastSnapHistoryQueryResp` OK
   */
  luteosErpRetailSaleForecastSnapHistory = (
    req: SalesForecastSnapHistoryQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<SalesForecastSnapHistoryQueryResp, any>({
      path: `/api/luteos/erp/retail/sale/forecast/snapHistory`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 零售预测
   * @name LuteosErpRetailSaleForecastUpdateAndSubmit
   * @summary 批量更新销量预测
   * @request POST:/api/luteos/erp/retail/sale/forecast/updateAndSubmit
   * @response `200` `CommonResp` OK
   */
  luteosErpRetailSaleForecastUpdateAndSubmit = (
    req: RetailSalesForecastUpdateSubmitReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/retail/sale/forecast/updateAndSubmit`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 零售预测
   * @name LuteosErpRetailSaleForecastUpload
   * @summary 上传销量预测
   * @request POST:/api/luteos/erp/retail/sale/forecast/upload
   * @response `200` `CommonResp` OK
   */
  luteosErpRetailSaleForecastUpload = (req: UploadReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/retail/sale/forecast/upload`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 零售预测
   * @name LuteosErpRetailSaleForecastUploadSaveSku
   * @summary 上传批量添加商品
   * @request POST:/api/luteos/erp/retail/sale/forecast/uploadSaveSku
   * @response `200` `CommonResp` OK
   */
  luteosErpRetailSaleForecastUploadSaveSku = (req: UploadReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/retail/sale/forecast/uploadSaveSku`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 售后预测
   * @name LuteosErpSaleAfterForecastExportAfterSalesList
   * @summary 导出售后销量统计列表
   * @request POST:/api/luteos/erp/sale/after/forecast/exportAfterSalesList
   * @response `200` `CommonExportResp` OK
   */
  luteosErpSaleAfterForecastExportAfterSalesList = (
    req: AfterSalesStatisticsReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/erp/sale/after/forecast/exportAfterSalesList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 售后预测
   * @name LuteosErpSaleAfterForecastQuerySalesList
   * @summary 获取售后销量统计列表
   * @request POST:/api/luteos/erp/sale/after/forecast/querySalesList
   * @response `200` `SalesStatisticsResp` OK
   */
  luteosErpSaleAfterForecastQuerySalesList = (
    req: AfterSalesStatisticsReq,
    params: RequestParams = {},
  ) =>
    this.request<SalesStatisticsResp, any>({
      path: `/api/luteos/erp/sale/after/forecast/querySalesList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销售订单
   * @name LuteosErpSaleExport
   * @summary 亚马逊导出销量统计列表
   * @request POST:/api/luteos/erp/sale/export
   * @response `200` `CommonExportResp` OK
   */
  luteosErpSaleExport = (req: SalesOrderStatisticsReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/erp/sale/export`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销量预测
   * @name LuteosErpSaleForecastChangeStatus
   * @summary 销量预测更新状态
   * @request POST:/api/luteos/erp/sale/forecast/changeStatus
   * @deprecated
   * @response `200` `CommonResp` OK
   */
  luteosErpSaleForecastChangeStatus = (
    req: SalesForecastWeekChangeStatusReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/sale/forecast/changeStatus`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销量预测
   * @name LuteosErpSaleForecastDownTemplate
   * @summary 下载上传模板
   * @request POST:/api/luteos/erp/sale/forecast/downTemplate
   * @deprecated
   * @response `200` `void` OK
   */
  luteosErpSaleForecastDownTemplate = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/luteos/erp/sale/forecast/downTemplate`,
      method: 'POST',
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销量预测
   * @name LuteosErpSaleForecastLogQueryDetail
   * @summary 销量预测日志详情
   * @request GET:/api/luteos/erp/sale/forecast/log/queryDetail
   * @deprecated
   * @response `200` `SalesForecastLogDetailQueryResp` OK
   */
  luteosErpSaleForecastLogQueryDetail = (
    query: {
      /** code */
      code: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<SalesForecastLogDetailQueryResp, any>({
      path: `/api/luteos/erp/sale/forecast/log/queryDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销量预测
   * @name LuteosErpSaleForecastLogQueryList
   * @summary 销量预测日志查询
   * @request GET:/api/luteos/erp/sale/forecast/log/queryList
   * @deprecated
   * @response `200` `SalesForecastLogListQueryResp` OK
   */
  luteosErpSaleForecastLogQueryList = (
    query: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<SalesForecastLogListQueryResp, any>({
      path: `/api/luteos/erp/sale/forecast/log/queryList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销量预测
   * @name LuteosErpSaleForecastQueryAllList
   * @summary 销量预测所有下拉查询
   * @request GET:/api/luteos/erp/sale/forecast/queryAllList
   * @deprecated
   * @response `200` `(SalesForecastAllListQueryResp)[]` OK
   */
  luteosErpSaleForecastQueryAllList = (params: RequestParams = {}) =>
    this.request<SalesForecastAllListQueryResp[], any>({
      path: `/api/luteos/erp/sale/forecast/queryAllList`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 销量预测
   * @name LuteosErpSaleForecastQueryList
   * @summary 销量预测查询
   * @request GET:/api/luteos/erp/sale/forecast/queryList
   * @deprecated
   * @response `200` `SalesForecastListQueryResp` OK
   */
  luteosErpSaleForecastQueryList = (
    query: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<SalesForecastListQueryResp, any>({
      path: `/api/luteos/erp/sale/forecast/queryList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销量预测
   * @name LuteosErpSaleForecastSaveWeek
   * @summary 销量预测保存
   * @request POST:/api/luteos/erp/sale/forecast/saveWeek
   * @deprecated
   * @response `200` `CommonResp` OK
   */
  luteosErpSaleForecastSaveWeek = (req: SalesForecastWeekSaveReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/sale/forecast/saveWeek`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销量预测
   * @name LuteosErpSaleForecastUpload
   * @summary 上传销量预测
   * @request POST:/api/luteos/erp/sale/forecast/upload
   * @deprecated
   * @response `200` `CommonResp` OK
   */
  luteosErpSaleForecastUpload = (req: UploadReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/sale/forecast/upload`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销量预测V2
   * @name LuteosErpSaleForecastV2Audit
   * @summary 销售预测变更审核
   * @request POST:/api/luteos/erp/sale/forecast/v2/audit
   * @response `200` `CommonResp` OK
   */
  luteosErpSaleForecastV2Audit = (req: ErpAuditReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/sale/forecast/v2/audit`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销量预测V2
   * @name LuteosErpSaleForecastV2AuditAbandon
   * @summary 销售预测审核作废
   * @request DELETE:/api/luteos/erp/sale/forecast/v2/audit/abandon
   * @response `200` `CommonResp` OK
   */
  luteosErpSaleForecastV2AuditAbandon = (
    query: {
      /** code */
      code: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/sale/forecast/v2/audit/abandon`,
      method: 'DELETE',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销量预测V2
   * @name LuteosErpSaleForecastV2AuditQueryDetail
   * @summary 销售预测变更审核详情
   * @request GET:/api/luteos/erp/sale/forecast/v2/audit/queryDetail
   * @response `200` `SalesForecastAuditDetailV2Resp` OK
   */
  luteosErpSaleForecastV2AuditQueryDetail = (
    query: {
      /** code */
      code: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<SalesForecastAuditDetailV2Resp, any>({
      path: `/api/luteos/erp/sale/forecast/v2/audit/queryDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销量预测V2
   * @name LuteosErpSaleForecastV2AuditQueryList
   * @summary 销售预测变更审核列表查询
   * @request POST:/api/luteos/erp/sale/forecast/v2/audit/queryList
   * @response `200` `SalesForecastAuditQueryResp` OK
   */
  luteosErpSaleForecastV2AuditQueryList = (
    req: SalesForecastAuditQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<SalesForecastAuditQueryResp, any>({
      path: `/api/luteos/erp/sale/forecast/v2/audit/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销量预测V2
   * @name LuteosErpSaleForecastV2AuditUpdate
   * @summary 销售预测审核重新提交
   * @request POST:/api/luteos/erp/sale/forecast/v2/audit/update
   * @response `200` `CommonResp` OK
   */
  luteosErpSaleForecastV2AuditUpdate = (
    req: SalesForecastUpdateSubmitReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/sale/forecast/v2/audit/update`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销量预测V2
   * @name LuteosErpSaleForecastV2AuditHistory
   * @summary 审核历史
   * @request POST:/api/luteos/erp/sale/forecast/v2/auditHistory
   * @response `200` `SalesForecastAuditHistoryQueryResp` OK
   */
  luteosErpSaleForecastV2AuditHistory = (
    req: SalesForecastAuditHistoryQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<SalesForecastAuditHistoryQueryResp, any>({
      path: `/api/luteos/erp/sale/forecast/v2/auditHistory`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销量预测V2
   * @name LuteosErpSaleForecastV2BatchChangeStatus
   * @summary 批量销量预测更新状态
   * @request POST:/api/luteos/erp/sale/forecast/v2/batchChangeStatus
   * @response `200` `CommonResp` OK
   */
  luteosErpSaleForecastV2BatchChangeStatus = (
    req: BatchSalesForecastWeekChangeStatusReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/sale/forecast/v2/batchChangeStatus`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销量预测V2
   * @name LuteosErpSaleForecastV2ChangeStatus
   * @summary 销量预测更新状态
   * @request POST:/api/luteos/erp/sale/forecast/v2/changeStatus
   * @response `200` `CommonResp` OK
   */
  luteosErpSaleForecastV2ChangeStatus = (
    req: SalesForecastWeekChangeStatusReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/sale/forecast/v2/changeStatus`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销量预测V2
   * @name LuteosErpSaleForecastV2ClearSort
   * @summary 清除排序
   * @request POST:/api/luteos/erp/sale/forecast/v2/clear/sort
   * @response `200` `CommonResp` OK
   */
  luteosErpSaleForecastV2ClearSort = (req: SaleClearSortReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/sale/forecast/v2/clear/sort`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销量预测V2
   * @name LuteosErpSaleForecastV2DownAddTemplate
   * @summary 下载上传批量添加模板
   * @request POST:/api/luteos/erp/sale/forecast/v2/downAddTemplate
   * @response `200` `void` OK
   */
  luteosErpSaleForecastV2DownAddTemplate = (
    req: SaleForecastUploadReq,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/luteos/erp/sale/forecast/v2/downAddTemplate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销量预测V2
   * @name LuteosErpSaleForecastV2DownTemplate
   * @summary 下载上传模板
   * @request POST:/api/luteos/erp/sale/forecast/v2/downTemplate
   * @response `200` `CommonExportResp` OK
   */
  luteosErpSaleForecastV2DownTemplate = (
    req: SalesForecastListQueryV2Req,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/erp/sale/forecast/v2/downTemplate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销量预测V2
   * @name LuteosErpSaleForecastV2DownTemplateV1
   * @summary 下载上传模板V1-泛欧合并
   * @request POST:/api/luteos/erp/sale/forecast/v2/downTemplateV1
   * @response `200` `CommonExportResp` OK
   */
  luteosErpSaleForecastV2DownTemplateV1 = (
    req: SalesForecastListQueryV2Req,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/erp/sale/forecast/v2/downTemplateV1`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销量预测V2
   * @name LuteosErpSaleForecastV2ExportSalesList
   * @summary 导出销量统计列表
   * @request POST:/api/luteos/erp/sale/forecast/v2/exportSalesList
   * @response `200` `CommonExportResp` OK
   */
  luteosErpSaleForecastV2ExportSalesList = (req: SalesStatisticsReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/erp/sale/forecast/v2/exportSalesList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销量预测V2
   * @name LuteosErpSaleForecastV2QueryList
   * @summary 销售预测列表
   * @request POST:/api/luteos/erp/sale/forecast/v2/queryList
   * @response `200` `SalesForecastListQueryV2Resp` OK
   */
  luteosErpSaleForecastV2QueryList = (
    req: SalesForecastListQueryV2Req,
    params: RequestParams = {},
  ) =>
    this.request<SalesForecastListQueryV2Resp, any>({
      path: `/api/luteos/erp/sale/forecast/v2/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销量预测V2
   * @name LuteosErpSaleForecastV2QuerySalesList
   * @summary 获取销量统计列表
   * @request POST:/api/luteos/erp/sale/forecast/v2/querySalesList
   * @response `200` `SalesStatisticsResp` OK
   */
  luteosErpSaleForecastV2QuerySalesList = (req: SalesStatisticsReq, params: RequestParams = {}) =>
    this.request<SalesStatisticsResp, any>({
      path: `/api/luteos/erp/sale/forecast/v2/querySalesList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销量预测V2
   * @name LuteosErpSaleForecastV2RefreshListingOperatorCache
   * @summary 更新在线商品运营人员缓存
   * @request DELETE:/api/luteos/erp/sale/forecast/v2/refreshListingOperatorCache
   * @response `200` `CommonResp` OK
   */
  luteosErpSaleForecastV2RefreshListingOperatorCache = (
    query: {
      /** version */
      version: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/sale/forecast/v2/refreshListingOperatorCache`,
      method: 'DELETE',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销量预测V2
   * @name LuteosErpSaleForecastV2Save
   * @summary 添加商品预测
   * @request POST:/api/luteos/erp/sale/forecast/v2/save
   * @response `200` `CommonResp` OK
   */
  luteosErpSaleForecastV2Save = (req: SalesForecastSaveReq[], params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/sale/forecast/v2/save`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销量预测V2
   * @name LuteosErpSaleForecastV2SnapHistory
   * @summary 快照历史
   * @request POST:/api/luteos/erp/sale/forecast/v2/snapHistory
   * @response `200` `SalesForecastSnapHistoryQueryResp` OK
   */
  luteosErpSaleForecastV2SnapHistory = (
    req: SalesForecastSnapHistoryQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<SalesForecastSnapHistoryQueryResp, any>({
      path: `/api/luteos/erp/sale/forecast/v2/snapHistory`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销量预测V2
   * @name LuteosErpSaleForecastV2UpdateAndSubmit
   * @summary 批量更新销量预测
   * @request POST:/api/luteos/erp/sale/forecast/v2/updateAndSubmit
   * @response `200` `CommonResp` OK
   */
  luteosErpSaleForecastV2UpdateAndSubmit = (
    req: SalesForecastUpdateSubmitReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/sale/forecast/v2/updateAndSubmit`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销量预测V2
   * @name LuteosErpSaleForecastV2Upload
   * @summary 上传销量预测
   * @request POST:/api/luteos/erp/sale/forecast/v2/upload
   * @response `200` `CommonResp` OK
   */
  luteosErpSaleForecastV2Upload = (req: SaleForecastUploadReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/sale/forecast/v2/upload`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销量预测V2
   * @name LuteosErpSaleForecastV2UploadAddTemplate
   * @summary 上传批量添加
   * @request POST:/api/luteos/erp/sale/forecast/v2/uploadAddTemplate
   * @response `200` `CommonResp` OK
   */
  luteosErpSaleForecastV2UploadAddTemplate = (
    req: SaleForecastUploadReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/sale/forecast/v2/uploadAddTemplate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销量预测V2
   * @name LuteosErpSaleForecastV2UploadCheckOperator
   * @summary 上传销量预测--校验运营人
   * @request POST:/api/luteos/erp/sale/forecast/v2/uploadCheckOperator
   * @response `200` `CommonRespListString` OK
   */
  luteosErpSaleForecastV2UploadCheckOperator = (
    req: SaleForecastUploadReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespListString, any>({
      path: `/api/luteos/erp/sale/forecast/v2/uploadCheckOperator`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销量预测V2
   * @name LuteosErpSaleForecastV2UploadSort
   * @summary 上传销量预测排序
   * @request POST:/api/luteos/erp/sale/forecast/v2/uploadSort
   * @response `200` `CommonResp` OK
   */
  luteosErpSaleForecastV2UploadSort = (req: SaleForecastUploadReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/sale/forecast/v2/uploadSort`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销售订单
   * @name LuteosErpSaleQuerySalesList
   * @summary 获取销量统计列表
   * @request POST:/api/luteos/erp/sale/querySalesList
   * @response `200` `SalesOrderStaticsResp` OK
   */
  luteosErpSaleQuerySalesList = (req: SalesOrderStatisticsReq, params: RequestParams = {}) =>
    this.request<SalesOrderStaticsResp, any>({
      path: `/api/luteos/erp/sale/querySalesList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 货件管理-V3
   * @name LuteosErpShipmentExportFbaList
   * @summary FBA货件列表查询-导出
   * @request POST:/api/luteos/erp/shipment/exportFbaList
   * @response `200` `CommonExportResp` OK
   */
  luteosErpShipmentExportFbaList = (req: ErpFbaShipmentListQueryReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/erp/shipment/exportFbaList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 货件管理-V3
   * @name LuteosErpShipmentExportJjList
   * @summary 积加列表查询-导出
   * @request POST:/api/luteos/erp/shipment/exportJjList
   * @response `200` `CommonExportResp` OK
   */
  luteosErpShipmentExportJjList = (req: ErpJjTransfeQueryReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/erp/shipment/exportJjList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 货件管理-V3
   * @name LuteosErpShipmentPushOverSeaList
   * @summary 货件-推送兴运
   * @request POST:/api/luteos/erp/shipment/pushOverSeaList
   * @response `200` `CommonRespOrderBatchAuthResp` OK
   */
  luteosErpShipmentPushOverSeaList = (req: ErpShipmentListPushXyReq, params: RequestParams = {}) =>
    this.request<CommonRespOrderBatchAuthResp, any>({
      path: `/api/luteos/erp/shipment/pushOverSeaList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 货件管理-V3
   * @name LuteosErpShipmentQueryFbaList
   * @summary FBA货件列表查询
   * @request POST:/api/luteos/erp/shipment/queryFbaList
   * @response `200` `ErpFbaShipmentListQueryResp` OK
   */
  luteosErpShipmentQueryFbaList = (req: ErpFbaShipmentListQueryReq, params: RequestParams = {}) =>
    this.request<ErpFbaShipmentListQueryResp, any>({
      path: `/api/luteos/erp/shipment/queryFbaList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 货件管理-V3
   * @name LuteosErpShipmentQueryFbaSendList
   * @summary FBA发货单列表
   * @request POST:/api/luteos/erp/shipment/queryFbaSendList
   * @response `200` `ErpFbaSendListQueryResp` OK
   */
  luteosErpShipmentQueryFbaSendList = (req: ErpFbaSendListQueryReq, params: RequestParams = {}) =>
    this.request<ErpFbaSendListQueryResp, any>({
      path: `/api/luteos/erp/shipment/queryFbaSendList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 货件管理-V3
   * @name LuteosErpShipmentQueryOverSeaList
   * @summary 海外仓货件列表查询
   * @request POST:/api/luteos/erp/shipment/queryOverSeaList
   * @response `200` `ErpOverSeaShipmentListQueryResp` OK
   */
  luteosErpShipmentQueryOverSeaList = (
    req: ErpOverSeaShipmentListQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<ErpOverSeaShipmentListQueryResp, any>({
      path: `/api/luteos/erp/shipment/queryOverSeaList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 产品SN入库
   * @name LuteosErpSnInboundExportList
   * @summary 列表导出
   * @request POST:/api/luteos/erp/sn/inbound/exportList
   * @response `200` `CommonExportResp` OK
   */
  luteosErpSnInboundExportList = (req: ProductSnInboundQueryListReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/erp/sn/inbound/exportList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 产品SN入库
   * @name LuteosErpSnInboundList
   * @summary 列表查询
   * @request POST:/api/luteos/erp/sn/inbound/list
   * @response `200` `ProductSnInboundQueryListResp` OK
   */
  luteosErpSnInboundList = (req: ProductSnInboundQueryListReq, params: RequestParams = {}) =>
    this.request<ProductSnInboundQueryListResp, any>({
      path: `/api/luteos/erp/sn/inbound/list`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 产品SN出库
   * @name LuteosErpSnOutboundBatchDeleted
   * @summary 批量删除
   * @request POST:/api/luteos/erp/sn/outbound/batchDeleted
   * @response `200` `CommonRespString` OK
   */
  luteosErpSnOutboundBatchDeleted = (
    req: ProductSnOutboundDeletedListReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/erp/sn/outbound/batchDeleted`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 产品SN出库
   * @name LuteosErpSnOutboundBatchSaveOutBound
   * @summary 批量保存
   * @request POST:/api/luteos/erp/sn/outbound/batchSaveOutBound
   * @response `200` `CommonResp` OK
   */
  luteosErpSnOutboundBatchSaveOutBound = (
    req: ProductSnOutboundAppSaveReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/sn/outbound/batchSaveOutBound`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 产品SN出库
   * @name LuteosErpSnOutboundCheckExists
   * @summary 是否存在
   * @request POST:/api/luteos/erp/sn/outbound/checkExists
   * @response `200` `ProductSnOutboundScanCheckResp` OK
   */
  luteosErpSnOutboundCheckExists = (
    req: ProductSnOutboundScanCheckReq,
    params: RequestParams = {},
  ) =>
    this.request<ProductSnOutboundScanCheckResp, any>({
      path: `/api/luteos/erp/sn/outbound/checkExists`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 产品SN出库
   * @name LuteosErpSnOutboundExportList
   * @summary 列表导出
   * @request POST:/api/luteos/erp/sn/outbound/exportList
   * @response `200` `CommonExportResp` OK
   */
  luteosErpSnOutboundExportList = (
    req: ProductSnOutboundQueryListReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/erp/sn/outbound/exportList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 产品SN出库, 导入模块
   * @name LuteosErpSnOutboundImportData
   * @summary 数据导入
   * @request POST:/api/luteos/erp/sn/outbound/importData
   * @response `200` `ImportDataResp` OK
   */
  luteosErpSnOutboundImportData = (req: ImportDataReq, params: RequestParams = {}) =>
    this.request<ImportDataResp, any>({
      path: `/api/luteos/erp/sn/outbound/importData`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 产品SN出库
   * @name LuteosErpSnOutboundList
   * @summary 列表查询
   * @request POST:/api/luteos/erp/sn/outbound/list
   * @response `200` `ProductSnOutboundQueryListResp` OK
   */
  luteosErpSnOutboundList = (req: ProductSnOutboundQueryListReq, params: RequestParams = {}) =>
    this.request<ProductSnOutboundQueryListResp, any>({
      path: `/api/luteos/erp/sn/outbound/list`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 产品SN出库, 导入模块
   * @name LuteosErpSnOutboundQueryImportTemplate
   * @summary 获取导入模板
   * @request GET:/api/luteos/erp/sn/outbound/queryImportTemplate
   * @response `200` `ImportTemplateQueryResp` OK
   */
  luteosErpSnOutboundQueryImportTemplate = (
    query: {
      /** 场景  amazon_ticket-亚马逊券码导入 product_spu-商品spu导入 product_sku-商品sku导入 platform_sku-映射sku导入 ly_order-领用订单导入 */
      importScene: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<ImportTemplateQueryResp, any>({
      path: `/api/luteos/erp/sn/outbound/queryImportTemplate`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 产品SN出库
   * @name LuteosErpSnOutboundQueryScanList
   * @summary app查询列表
   * @request POST:/api/luteos/erp/sn/outbound/queryScanList
   * @response `200` `ProductSnOutboundScanQueryResp` OK
   */
  luteosErpSnOutboundQueryScanList = (
    req: ProductSnOutboundScanQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<ProductSnOutboundScanQueryResp, any>({
      path: `/api/luteos/erp/sn/outbound/queryScanList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 备货设置-SKU配置
   * @name LuteosErpSpSkuConfigDownTemplate
   * @summary 下载批量导入模板(导出)
   * @request POST:/api/luteos/erp/sp/sku/config/downTemplate
   * @response `200` `CommonRespString` OK
   */
  luteosErpSpSkuConfigDownTemplate = (req: SpSkuConfigQueryReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/erp/sp/sku/config/downTemplate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 备货设置-SKU配置
   * @name LuteosErpSpSkuConfigQueryList
   * @summary 列表查询
   * @request POST:/api/luteos/erp/sp/sku/config/queryList
   * @response `200` `SpSkuConfigQueryResp` OK
   */
  luteosErpSpSkuConfigQueryList = (req: SpSkuConfigQueryReq, params: RequestParams = {}) =>
    this.request<SpSkuConfigQueryResp, any>({
      path: `/api/luteos/erp/sp/sku/config/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 备货设置-SKU配置
   * @name LuteosErpSpSkuConfigSaveOrUpdate
   * @summary 新增编辑
   * @request POST:/api/luteos/erp/sp/sku/config/saveOrUpdate
   * @response `200` `CommonResp` OK
   */
  luteosErpSpSkuConfigSaveOrUpdate = (req: SpSkuConfigSaveReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/sp/sku/config/saveOrUpdate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 备货设置-SKU配置
   * @name LuteosErpSpSkuConfigUpload
   * @summary 批量导入
   * @request POST:/api/luteos/erp/sp/sku/config/upload
   * @response `200` `CommonResp` OK
   */
  luteosErpSpSkuConfigUpload = (req: UploadReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/sp/sku/config/upload`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags SRM-供应商主数据
   * @name LuteosErpSrmSupplierMasterExportList
   * @summary 导出供应商主数据列表
   * @request POST:/api/luteos/erp/srm/supplierMaster/exportList
   * @response `200` `CommonRespCommonExportResp` OK
   */
  luteosErpSrmSupplierMasterExportList = (
    req: SupplierMasterDataExportReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/luteos/erp/srm/supplierMaster/exportList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags SRM-供应商主数据
   * @name LuteosErpSrmSupplierMasterQueryList
   * @summary 供应商主数据分页查询（字典已转义为 _dictText）
   * @request POST:/api/luteos/erp/srm/supplierMaster/queryList
   * @response `200` `SupplierMasterDataQueryResp` OK
   */
  luteosErpSrmSupplierMasterQueryList = (
    req: SupplierMasterDataQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<SupplierMasterDataQueryResp, any>({
      path: `/api/luteos/erp/srm/supplierMaster/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags SRM-供应商主数据
   * @name LuteosErpSrmSupplierMasterSupplierStatusCount
   * @summary 供应商状态数量统计（Tab），GET 无参
   * @request GET:/api/luteos/erp/srm/supplierMaster/supplierStatusCount
   * @response `200` `(SupplierStatusCountItem)[]` OK
   */
  luteosErpSrmSupplierMasterSupplierStatusCount = (params: RequestParams = {}) =>
    this.request<SupplierStatusCountItem[], any>({
      path: `/api/luteos/erp/srm/supplierMaster/supplierStatusCount`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 采购订单
   * @name LuteosErpSrmPurchaseExportDetailList
   * @summary 导出采购明细列表
   * @request POST:/api/luteos/erp/srmPurchase/exportDetailList
   * @response `200` `CommonRespCommonExportResp` OK
   */
  luteosErpSrmPurchaseExportDetailList = (
    req: PurchaseOrderItemListQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/luteos/erp/srmPurchase/exportDetailList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 采购订单
   * @name LuteosErpSrmPurchaseExportList
   * @summary 导出列表
   * @request POST:/api/luteos/erp/srmPurchase/exportList
   * @response `200` `CommonRespCommonExportResp` OK
   */
  luteosErpSrmPurchaseExportList = (req: PurchaseOrderListQueryReq, params: RequestParams = {}) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/luteos/erp/srmPurchase/exportList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 采购订单
   * @name LuteosErpSrmPurchaseQueryDetailList
   * @summary 查询采购明细列表
   * @request POST:/api/luteos/erp/srmPurchase/queryDetailList
   * @response `200` `PurchaseOrderItemListQueryResp` OK
   */
  luteosErpSrmPurchaseQueryDetailList = (
    req: PurchaseOrderItemListQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<PurchaseOrderItemListQueryResp, any>({
      path: `/api/luteos/erp/srmPurchase/queryDetailList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 采购订单
   * @name LuteosErpSrmPurchaseQueryList
   * @summary 查询列表
   * @request POST:/api/luteos/erp/srmPurchase/queryList
   * @response `200` `PurchaseOrderHeadListQueryResp` OK
   */
  luteosErpSrmPurchaseQueryList = (req: PurchaseOrderListQueryReq, params: RequestParams = {}) =>
    this.request<PurchaseOrderHeadListQueryResp, any>({
      path: `/api/luteos/erp/srmPurchase/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 采购订单
   * @name LuteosErpSrmPurchaseQuerySrmDictMap
   * @summary srm字典查询列表
   * @request POST:/api/luteos/erp/srmPurchase/querySrmDictMap
   * @response `200` `Record<string,Record<string,string>>` OK
   */
  luteosErpSrmPurchaseQuerySrmDictMap = (req: DictQueryReq, params: RequestParams = {}) =>
    this.request<Record<string, Record<string, string>>, any>({
      path: `/api/luteos/erp/srmPurchase/querySrmDictMap`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 采购订单
   * @name LuteosErpSrmPurchaseQuerySrmMemberList
   * @summary srm字典查询列表
   * @request POST:/api/luteos/erp/srmPurchase/querySrmMemberList
   * @response `200` `(ElsSubaccountInfo)[]` OK
   */
  luteosErpSrmPurchaseQuerySrmMemberList = (params: RequestParams = {}) =>
    this.request<ElsSubaccountInfo[], any>({
      path: `/api/luteos/erp/srmPurchase/querySrmMemberList`,
      method: 'POST',
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-第三方推送接口
   * @name LuteosErpThirdpartySrmSyncKingdee
   * @summary 从SRM推送单到金蝶
   * @request POST:/api/luteos/erp/thirdparty/srmSyncKingdee
   * @response `200` `CommonRespVoid` OK
   */
  luteosErpThirdpartySrmSyncKingdee = (req: SrmSyncKingdeeReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/erp/thirdparty/srmSyncKingdee`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags tiktok库存调整
   * @name LuteosErpTiktokStockAdjustmentDeleted
   * @summary 删除
   * @request GET:/api/luteos/erp/tiktok/stock/adjustment/deleted/{id}
   * @response `200` `CommonRespString` OK
   */
  luteosErpTiktokStockAdjustmentDeleted = (id: number, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/erp/tiktok/stock/adjustment/deleted/${id}`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags tiktok库存调整
   * @name LuteosErpTiktokStockAdjustmentDetail
   * @summary 明细
   * @request GET:/api/luteos/erp/tiktok/stock/adjustment/detail/{id}
   * @response `200` `CommonRespTkStockAdjustmentDetailQueryResp` OK
   */
  luteosErpTiktokStockAdjustmentDetail = (id: number, params: RequestParams = {}) =>
    this.request<CommonRespTkStockAdjustmentDetailQueryResp, any>({
      path: `/api/luteos/erp/tiktok/stock/adjustment/detail/${id}`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags tiktok库存调整
   * @name LuteosErpTiktokStockAdjustmentPush
   * @summary 推送
   * @request GET:/api/luteos/erp/tiktok/stock/adjustment/push/{id}
   * @response `200` `CommonRespString` OK
   */
  luteosErpTiktokStockAdjustmentPush = (id: number, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/erp/tiktok/stock/adjustment/push/${id}`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags tiktok库存调整
   * @name LuteosErpTiktokStockAdjustmentQueryList
   * @summary 列表查询
   * @request POST:/api/luteos/erp/tiktok/stock/adjustment/queryList
   * @response `200` `CommonRespTkStockAdjustmentQueryListResp` OK
   */
  luteosErpTiktokStockAdjustmentQueryList = (
    req: TiktokStockAdjustmentQueryListReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespTkStockAdjustmentQueryListResp, any>({
      path: `/api/luteos/erp/tiktok/stock/adjustment/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags tiktok库存调整
   * @name LuteosErpTiktokStockAdjustmentQuerySkuIdInfo
   * @summary 根据sku+店铺获取skuid数据
   * @request POST:/api/luteos/erp/tiktok/stock/adjustment/querySkuIdInfo
   * @response `200` `CommonRespTiktokStockAdjustmentQuerySkuIdInfoResp` OK
   */
  luteosErpTiktokStockAdjustmentQuerySkuIdInfo = (
    req: TiktokStockAdjustmentQuerySkuIdInfoReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespTiktokStockAdjustmentQuerySkuIdInfoResp, any>({
      path: `/api/luteos/erp/tiktok/stock/adjustment/querySkuIdInfo`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags tiktok库存调整
   * @name LuteosErpTiktokStockAdjustmentQuerySkuInfo
   * @summary 根据仓库获取sku信息
   * @request POST:/api/luteos/erp/tiktok/stock/adjustment/querySkuInfo
   * @response `200` `CommonRespTiktokStockAdjustmentQuerySkuInfoResp` OK
   */
  luteosErpTiktokStockAdjustmentQuerySkuInfo = (
    req: TiktokStockAdjustmentQuerySkuInfoReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespTiktokStockAdjustmentQuerySkuInfoResp, any>({
      path: `/api/luteos/erp/tiktok/stock/adjustment/querySkuInfo`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags tiktok库存调整
   * @name LuteosErpTiktokStockAdjustmentQuerySkuShopInfo
   * @summary 根据seller sku获取店铺数据
   * @request POST:/api/luteos/erp/tiktok/stock/adjustment/querySkuShopInfo
   * @response `200` `CommonRespTiktokStockAdjustmentQuerySkuShopInfoResp` OK
   */
  luteosErpTiktokStockAdjustmentQuerySkuShopInfo = (
    req: TiktokStockAdjustmentQuerySkuShopInfoReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespTiktokStockAdjustmentQuerySkuShopInfoResp, any>({
      path: `/api/luteos/erp/tiktok/stock/adjustment/querySkuShopInfo`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags tiktok库存调整
   * @name LuteosErpTiktokStockAdjustmentQueryStock
   * @summary 获取即时库存
   * @request POST:/api/luteos/erp/tiktok/stock/adjustment/queryStock
   * @response `200` `CommonRespTiktokStockAdjustmentQueryStockResp` OK
   */
  luteosErpTiktokStockAdjustmentQueryStock = (
    req: TiktokStockAdjustmentQueryStockReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespTiktokStockAdjustmentQueryStockResp, any>({
      path: `/api/luteos/erp/tiktok/stock/adjustment/queryStock`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags tiktok库存调整
   * @name LuteosErpTiktokStockAdjustmentQuerySyncStatus
   * @summary 状态
   * @request GET:/api/luteos/erp/tiktok/stock/adjustment/querySyncStatus
   * @response `200` `CommonRespTiktokStockAdjustmentSyncStatusResp` OK
   */
  luteosErpTiktokStockAdjustmentQuerySyncStatus = (params: RequestParams = {}) =>
    this.request<CommonRespTiktokStockAdjustmentSyncStatusResp, any>({
      path: `/api/luteos/erp/tiktok/stock/adjustment/querySyncStatus`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags tiktok库存调整
   * @name LuteosErpTiktokStockAdjustmentSaveOrUpdate
   * @summary 新增或修改
   * @request POST:/api/luteos/erp/tiktok/stock/adjustment/saveOrUpdate
   * @response `200` `CommonRespString` OK
   */
  luteosErpTiktokStockAdjustmentSaveOrUpdate = (
    req: TiktokStockAdjustmentSaveReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/erp/tiktok/stock/adjustment/saveOrUpdate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 头程物流V2
   * @name LuteosErpV2FirstLogisticsAddDownTemplate
   * @summary 头程-下载批量新增模板
   * @request POST:/api/luteos/erp/v2/firstLogistics/add/downTemplate
   * @response `200` `CommonRespString` OK
   */
  luteosErpV2FirstLogisticsAddDownTemplate = (params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/erp/v2/firstLogistics/add/downTemplate`,
      method: 'POST',
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 头程物流V2
   * @name LuteosErpV2FirstLogisticsAddUpload
   * @summary 头程-批量新增
   * @request POST:/api/luteos/erp/v2/firstLogistics/add/upload
   * @response `200` `CommonRespVoid` OK
   */
  luteosErpV2FirstLogisticsAddUpload = (req: UploadReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/erp/v2/firstLogistics/add/upload`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 头程物流V2
   * @name LuteosErpV2FirstLogisticsAddUploadOther
   * @summary 头程-批量上传(三方)
   * @request POST:/api/luteos/erp/v2/firstLogistics/add/uploadOther
   * @response `200` `CommonRespVoid` OK
   */
  luteosErpV2FirstLogisticsAddUploadOther = (req: UploadReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/erp/v2/firstLogistics/add/uploadOther`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 头程物流V2
   * @name LuteosErpV2FirstLogisticsDelete
   * @summary 头程-删除
   * @request POST:/api/luteos/erp/v2/firstLogistics/delete
   * @response `200` `CommonRespObject` OK
   */
  luteosErpV2FirstLogisticsDelete = (req: FirstLogisticsCommonV2Req, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/erp/v2/firstLogistics/delete`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 头程物流V2
   * @name LuteosErpV2FirstLogisticsDeleteAttachment
   * @summary 头程-删除附件
   * @request POST:/api/luteos/erp/v2/firstLogistics/deleteAttachment
   * @response `200` `CommonRespObject` OK
   */
  luteosErpV2FirstLogisticsDeleteAttachment = (
    req: FirstLogisticsCommonV2Req,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/erp/v2/firstLogistics/deleteAttachment`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 头程物流V2
   * @name LuteosErpV2FirstLogisticsDiffDeleteIgnore
   * @summary 差异列表-恢复记录
   * @request POST:/api/luteos/erp/v2/firstLogistics/diff/deleteIgnore
   * @response `200` `CommonRespVoid` OK
   */
  luteosErpV2FirstLogisticsDiffDeleteIgnore = (
    req: FirstLogDiffIgnoreReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/erp/v2/firstLogistics/diff/deleteIgnore`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 头程物流V2
   * @name LuteosErpV2FirstLogisticsDiffDownloadDiffTemplate
   * @summary 差异列表-批量更新模板下载
   * @request POST:/api/luteos/erp/v2/firstLogistics/diff/downloadDiffTemplate
   * @response `200` `CommonRespString` OK
   */
  luteosErpV2FirstLogisticsDiffDownloadDiffTemplate = (params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/erp/v2/firstLogistics/diff/downloadDiffTemplate`,
      method: 'POST',
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 头程物流V2
   * @name LuteosErpV2FirstLogisticsDiffIgnore
   * @summary 差异列表-忽略记录
   * @request POST:/api/luteos/erp/v2/firstLogistics/diff/ignore
   * @response `200` `CommonRespVoid` OK
   */
  luteosErpV2FirstLogisticsDiffIgnore = (req: FirstLogDiffIgnoreReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/erp/v2/firstLogistics/diff/ignore`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 头程物流V2
   * @name LuteosErpV2FirstLogisticsDiffQueryIgnoreList
   * @summary 差异列表-忽略记录列表
   * @request POST:/api/luteos/erp/v2/firstLogistics/diff/queryIgnoreList
   * @response `200` `FirstLogDiffIgnoreListResp` OK
   */
  luteosErpV2FirstLogisticsDiffQueryIgnoreList = (
    req: FirstLogDiffIgnoreListReq,
    params: RequestParams = {},
  ) =>
    this.request<FirstLogDiffIgnoreListResp, any>({
      path: `/api/luteos/erp/v2/firstLogistics/diff/queryIgnoreList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 头程物流V2
   * @name LuteosErpV2FirstLogisticsDiffUpload
   * @summary 差异列表批量更新
   * @request POST:/api/luteos/erp/v2/firstLogistics/diff/upload
   * @response `200` `CommonRespVoid` OK
   */
  luteosErpV2FirstLogisticsDiffUpload = (req: UploadReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/erp/v2/firstLogistics/diff/upload`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 头程物流V2
   * @name LuteosErpV2FirstLogisticsDownloadAttachment
   * @summary 头程-下载附件
   * @request POST:/api/luteos/erp/v2/firstLogistics/downloadAttachment
   * @response `200` `CommonRespString` OK
   */
  luteosErpV2FirstLogisticsDownloadAttachment = (
    req: FirstLogisticsCommonV2Req,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/erp/v2/firstLogistics/downloadAttachment`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 头程物流V2
   * @name LuteosErpV2FirstLogisticsExportActualDelay
   * @summary 头程-导出实际延误
   * @request POST:/api/luteos/erp/v2/firstLogistics/exportActualDelay
   * @response `200` `CommonExportResp` OK
   */
  luteosErpV2FirstLogisticsExportActualDelay = (
    req: FirstLogisticsQueryListV2Req,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/erp/v2/firstLogistics/exportActualDelay`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 头程物流V2
   * @name LuteosErpV2FirstLogisticsExportDiffList
   * @summary 差异列表-导出
   * @request POST:/api/luteos/erp/v2/firstLogistics/exportDiffList
   * @response `200` `CommonExportResp` OK
   */
  luteosErpV2FirstLogisticsExportDiffList = (
    req: FirstLogDiffQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/erp/v2/firstLogistics/exportDiffList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 头程物流V2
   * @name LuteosErpV2FirstLogisticsExportList
   * @summary 头程-列表导出
   * @request POST:/api/luteos/erp/v2/firstLogistics/exportList
   * @response `200` `CommonExportResp` OK
   */
  luteosErpV2FirstLogisticsExportList = (
    req: FirstLogisticsQueryListV2Req,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/erp/v2/firstLogistics/exportList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 头程物流V2
   * @name LuteosErpV2FirstLogisticsExportMaintainData
   * @summary 导出待维护数据
   * @request POST:/api/luteos/erp/v2/firstLogistics/exportMaintainData
   * @response `200` `CommonExportResp` OK
   */
  luteosErpV2FirstLogisticsExportMaintainData = (
    req: FirstLogisticsQueryListV2Req,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/erp/v2/firstLogistics/exportMaintainData`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 头程物流V2
   * @name LuteosErpV2FirstLogisticsQueryDetail
   * @summary 头程-明细
   * @request POST:/api/luteos/erp/v2/firstLogistics/queryDetail
   * @response `200` `FirstLogisticsQueryV2Resp` OK
   */
  luteosErpV2FirstLogisticsQueryDetail = (
    req: FirstLogisticsQueryV2Req,
    params: RequestParams = {},
  ) =>
    this.request<FirstLogisticsQueryV2Resp, any>({
      path: `/api/luteos/erp/v2/firstLogistics/queryDetail`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 头程物流V2
   * @name LuteosErpV2FirstLogisticsQueryDiffList
   * @summary 差异列表-查询
   * @request POST:/api/luteos/erp/v2/firstLogistics/queryDiffList
   * @response `200` `FirstLogisticsDiffQueryListV2Resp` OK
   */
  luteosErpV2FirstLogisticsQueryDiffList = (
    req: FirstLogDiffQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<FirstLogisticsDiffQueryListV2Resp, any>({
      path: `/api/luteos/erp/v2/firstLogistics/queryDiffList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 头程物流V2
   * @name LuteosErpV2FirstLogisticsQueryList
   * @summary 头程-列表查询
   * @request POST:/api/luteos/erp/v2/firstLogistics/queryList
   * @response `200` `FirstLogisticsQueryListV2Resp` OK
   */
  luteosErpV2FirstLogisticsQueryList = (
    req: FirstLogisticsQueryListV2Req,
    params: RequestParams = {},
  ) =>
    this.request<FirstLogisticsQueryListV2Resp, any>({
      path: `/api/luteos/erp/v2/firstLogistics/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 头程物流V2
   * @name LuteosErpV2FirstLogisticsQueryOperateLog
   * @summary 头程-操作日志
   * @request POST:/api/luteos/erp/v2/firstLogistics/queryOperateLog
   * @response `200` `CommonRespListFirstLogisticsOperateLogBean` OK
   */
  luteosErpV2FirstLogisticsQueryOperateLog = (
    query: {
      /** fbaId */
      fbaId: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespListFirstLogisticsOperateLogBean, any>({
      path: `/api/luteos/erp/v2/firstLogistics/queryOperateLog`,
      method: 'POST',
      query: query,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 头程物流V2
   * @name LuteosErpV2FirstLogisticsQuerySkuDetail
   * @summary 头程-查询sku明细
   * @request POST:/api/luteos/erp/v2/firstLogistics/querySkuDetail
   * @response `200` `FirstLogisticsSkuQueryV2Resp` OK
   */
  luteosErpV2FirstLogisticsQuerySkuDetail = (
    req: FirstLogisticsQueryV2Req,
    params: RequestParams = {},
  ) =>
    this.request<FirstLogisticsSkuQueryV2Resp, any>({
      path: `/api/luteos/erp/v2/firstLogistics/querySkuDetail`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 头程物流V2
   * @name LuteosErpV2FirstLogisticsSave
   * @summary 头程-新增
   * @request POST:/api/luteos/erp/v2/firstLogistics/save
   * @response `200` `CommonRespObject` OK
   */
  luteosErpV2FirstLogisticsSave = (req: FirstLogisticsSaveV2Req, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/erp/v2/firstLogistics/save`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 头程物流V2
   * @name LuteosErpV2FirstLogisticsSaveSkuDetail
   * @summary 头程-编辑sku明细
   * @request POST:/api/luteos/erp/v2/firstLogistics/saveSkuDetail
   * @response `200` `CommonRespObject` OK
   */
  luteosErpV2FirstLogisticsSaveSkuDetail = (
    req: FirstLogisticsSkuSaveV2Req,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/erp/v2/firstLogistics/saveSkuDetail`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 头程物流V2
   * @name LuteosErpV2FirstLogisticsUpdate
   * @summary 头程-修改
   * @request POST:/api/luteos/erp/v2/firstLogistics/update
   * @response `200` `CommonRespObject` OK
   */
  luteosErpV2FirstLogisticsUpdate = (req: FirstLogisticsUpdateV2Req, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/erp/v2/firstLogistics/update`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 头程物流V2
   * @name LuteosErpV2FirstLogisticsUploadAttachment
   * @summary 头程-上传附件
   * @request POST:/api/luteos/erp/v2/firstLogistics/uploadAttachment
   * @response `200` `CommonRespObject` OK
   */
  luteosErpV2FirstLogisticsUploadAttachment = (
    req: FirstLogAttachmentUploadReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/erp/v2/firstLogistics/uploadAttachment`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 仓库归属
   * @name LuteosErpWarehouseAffiliationAllList
   * @summary 获取所有平台
   * @request GET:/api/luteos/erp/warehouse/affiliation/allList
   * @response `200` `(DictCommonBean)[]` OK
   */
  luteosErpWarehouseAffiliationAllList = (params: RequestParams = {}) =>
    this.request<DictCommonBean[], any>({
      path: `/api/luteos/erp/warehouse/affiliation/allList`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 仓库归属
   * @name LuteosErpWarehouseAffiliationChangeStatus
   * @summary 变更归属仓库状态
   * @request POST:/api/luteos/erp/warehouse/affiliation/changeStatus
   * @response `200` `CommonResp` OK
   */
  luteosErpWarehouseAffiliationChangeStatus = (
    req: WarehouseAffiliationChangeStatusReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/warehouse/affiliation/changeStatus`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 仓库归属
   * @name LuteosErpWarehouseAffiliationQueryList
   * @summary 仓库归属查询
   * @request GET:/api/luteos/erp/warehouse/affiliation/queryList
   * @response `200` `WarehouseAffiliationListQueryResp` OK
   */
  luteosErpWarehouseAffiliationQueryList = (
    query: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<WarehouseAffiliationListQueryResp, any>({
      path: `/api/luteos/erp/warehouse/affiliation/queryList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 仓库归属
   * @name LuteosErpWarehouseAffiliationQueryWarehouseList
   * @summary 仓库列表枚举查询(会排除已配置仓库)
   * @request GET:/api/luteos/erp/warehouse/affiliation/queryWarehouseList
   * @response `200` `(WarehouseAffiliationWarehouseListQueryResp)[]` OK
   */
  luteosErpWarehouseAffiliationQueryWarehouseList = (params: RequestParams = {}) =>
    this.request<WarehouseAffiliationWarehouseListQueryResp[], any>({
      path: `/api/luteos/erp/warehouse/affiliation/queryWarehouseList`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 仓库归属
   * @name LuteosErpWarehouseAffiliationSave
   * @summary 编辑归属仓库
   * @request POST:/api/luteos/erp/warehouse/affiliation/save
   * @response `200` `CommonResp` OK
   */
  luteosErpWarehouseAffiliationSave = (
    req: WarehouseAffiliationSaveReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/warehouse/affiliation/save`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 仓库管理-V2
   * @name LuteosErpWarehouseEditWarehouse
   * @summary 编辑仓库信息
   * @request POST:/api/luteos/erp/warehouse/editWarehouse
   * @deprecated
   * @response `200` `CommonResp` OK
   */
  luteosErpWarehouseEditWarehouse = (req: WarehouseUpdateReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/warehouse/editWarehouse`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 仓库管理-V2
   * @name LuteosErpWarehouseExport
   * @summary 导出
   * @request POST:/api/luteos/erp/warehouse/export
   * @response `200` `CommonExportResp` OK
   */
  luteosErpWarehouseExport = (req: WarehouseQueryReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/erp/warehouse/export`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 仓库管理-V2
   * @name LuteosErpWarehouseMappingOtherWarehouse
   * @summary 关联易仓仓库映射
   * @request POST:/api/luteos/erp/warehouse/mappingOtherWarehouse
   * @response `200` `CommonResp` OK
   */
  luteosErpWarehouseMappingOtherWarehouse = (
    req: WarehouseMappingReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/warehouse/mappingOtherWarehouse`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-仓配订单
   * @name LuteosErpWarehouseOrderAddUpload
   * @summary 上传谷仓批量标发
   * @request POST:/api/luteos/erp/warehouse/order/add/upload
   * @response `200` `ImportDataResp` OK
   */
  luteosErpWarehouseOrderAddUpload = (req: UploadReq, params: RequestParams = {}) =>
    this.request<ImportDataResp, any>({
      path: `/api/luteos/erp/warehouse/order/add/upload`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-仓配订单
   * @name LuteosErpWarehouseOrderAssemblePackageList
   * @summary 获取自动填写数据
   * @request POST:/api/luteos/erp/warehouse/order/assemblePackageList
   * @response `200` `CommonRespGucangPackageListResp` OK
   */
  luteosErpWarehouseOrderAssemblePackageList = (
    req: GucangPackageListReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespGucangPackageListResp, any>({
      path: `/api/luteos/erp/warehouse/order/assemblePackageList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-仓配订单
   * @name LuteosErpWarehouseOrderAttachUpload
   * @summary 批量上传订单附件
   * @request POST:/api/luteos/erp/warehouse/order/attach/upload
   * @response `200` `CommonResp` OK
   */
  luteosErpWarehouseOrderAttachUpload = (req: OrderUpdateUploadReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/warehouse/order/attach/upload`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-仓配订单
   * @name LuteosErpWarehouseOrderCutAtt
   * @summary 剪裁订单附件
   * @request POST:/api/luteos/erp/warehouse/order/cutAtt
   * @response `200` `CommonResp` OK
   */
  luteosErpWarehouseOrderCutAtt = (req: OrderCutAttReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/warehouse/order/cutAtt`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-仓配订单
   * @name LuteosErpWarehouseOrderCutAttBatch
   * @summary 剪裁订单附件-批量
   * @request POST:/api/luteos/erp/warehouse/order/cutAttBatch
   * @response `200` `CommonResp` OK
   */
  luteosErpWarehouseOrderCutAttBatch = (req: OrderCutAttBatchReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/warehouse/order/cutAttBatch`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-仓配订单
   * @name LuteosErpWarehouseOrderCutGuPdf
   * @summary 剪裁谷仓调拨单PDF
   * @request POST:/api/luteos/erp/warehouse/order/cutGuPdf
   * @response `200` `UploadReq` OK
   */
  luteosErpWarehouseOrderCutGuPdf = (uploadReq: UploadReq, params: RequestParams = {}) =>
    this.request<UploadReq, any>({
      path: `/api/luteos/erp/warehouse/order/cutGuPdf`,
      method: 'POST',
      body: uploadReq,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-仓配订单
   * @name LuteosErpWarehouseOrderDownMarkDeliveryTemplate
   * @summary 下载谷仓模板
   * @request POST:/api/luteos/erp/warehouse/order/downMarkDeliveryTemplate
   * @response `200` `CommonRespString` OK
   */
  luteosErpWarehouseOrderDownMarkDeliveryTemplate = (params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/erp/warehouse/order/downMarkDeliveryTemplate`,
      method: 'POST',
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-仓配订单
   * @name LuteosErpWarehouseOrderExport
   * @summary 下载
   * @request POST:/api/luteos/erp/warehouse/order/export
   * @response `200` `CommonRespCommonExportResp` OK
   */
  luteosErpWarehouseOrderExport = (req: WarehouseOrderListQueryReq, params: RequestParams = {}) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/luteos/erp/warehouse/order/export`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-仓配订单
   * @name LuteosErpWarehouseOrderExportFeeDetail
   * @summary 下载费用明细
   * @request POST:/api/luteos/erp/warehouse/order/exportFeeDetail
   * @response `200` `CommonRespCommonExportResp` OK
   */
  luteosErpWarehouseOrderExportFeeDetail = (
    req: WarehouseOrderListQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/luteos/erp/warehouse/order/exportFeeDetail`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-仓配订单
   * @name LuteosErpWarehouseOrderExportGcWarehouseService
   * @summary 下载谷仓包装信息
   * @request POST:/api/luteos/erp/warehouse/order/exportGcWarehouseService
   * @response `200` `CommonRespCommonExportResp` OK
   */
  luteosErpWarehouseOrderExportGcWarehouseService = (
    warehouseService: GuCangTransferSlipOrderBeanWarehouseService,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/luteos/erp/warehouse/order/exportGcWarehouseService`,
      method: 'POST',
      body: warehouseService,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-仓配订单
   * @name LuteosErpWarehouseOrderExportReceiveDetail
   * @summary 下载领用单信息
   * @request POST:/api/luteos/erp/warehouse/order/exportReceiveDetail
   * @response `200` `CommonRespCommonExportResp` OK
   */
  luteosErpWarehouseOrderExportReceiveDetail = (
    req: WarehouseOrderListQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/luteos/erp/warehouse/order/exportReceiveDetail`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-仓配订单
   * @name LuteosErpWarehouseOrderImportGcWarehouseService
   * @summary 导入谷仓包装信息
   * @request POST:/api/luteos/erp/warehouse/order/importGcWarehouseService
   * @response `200` `GuCangTransferSlipOrderBeanWarehouseService` OK
   */
  luteosErpWarehouseOrderImportGcWarehouseService = (
    uploadReq: UploadReq,
    params: RequestParams = {},
  ) =>
    this.request<GuCangTransferSlipOrderBeanWarehouseService, any>({
      path: `/api/luteos/erp/warehouse/order/importGcWarehouseService`,
      method: 'POST',
      body: uploadReq,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-仓配订单
   * @name LuteosErpWarehouseOrderMarkDelivery
   * @summary 谷仓订单-标记发货
   * @request POST:/api/luteos/erp/warehouse/order/markDelivery
   * @response `200` `CommonRespVoid` OK
   */
  luteosErpWarehouseOrderMarkDelivery = (req: OrderMarkDeliveryReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/erp/warehouse/order/markDelivery`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-仓配订单
   * @name LuteosErpWarehouseOrderPushGcFba
   * @summary 推送谷仓-FBA
   * @request POST:/api/luteos/erp/warehouse/order/pushGcFba
   * @response `200` `OrderBatchAuthResp` OK
   */
  luteosErpWarehouseOrderPushGcFba = (req: OrderPushGuReq, params: RequestParams = {}) =>
    this.request<OrderBatchAuthResp, any>({
      path: `/api/luteos/erp/warehouse/order/pushGcFba`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-仓配订单
   * @name LuteosErpWarehouseOrderPushGcTransferSlipOrder
   * @summary 推送谷仓-其他调拨单
   * @request POST:/api/luteos/erp/warehouse/order/pushGcTransferSlipOrder
   * @response `200` `CommonResp` OK
   */
  luteosErpWarehouseOrderPushGcTransferSlipOrder = (
    req: GuCangTransferSlipOrderBean,
    params: RequestParams = {},
  ) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/warehouse/order/pushGcTransferSlipOrder`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 查询装箱板分页列表
   *
   * @tags ERP-仓配订单
   * @name LuteosErpWarehouseOrderQueryBumperList
   * @summary 出库-仓配订单装箱板信息列表
   * @request POST:/api/luteos/erp/warehouse/order/queryBumperList
   * @response `200` `CommonRespWarehouseBumperPageResp` OK
   */
  luteosErpWarehouseOrderQueryBumperList = (
    req: QueryWarehouseBumperReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespWarehouseBumperPageResp, any>({
      path: `/api/luteos/erp/warehouse/order/queryBumperList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 查询提货单
   *
   * @tags ERP-仓配订单
   * @name LuteosErpWarehouseOrderQueryDeliveryOrderList
   * @summary 出库-仓配订单提货单列表
   * @request GET:/api/luteos/erp/warehouse/order/queryDeliveryOrderList
   * @response `200` `CommonRespWarehouseDeliveryOrderResp` OK
   */
  luteosErpWarehouseOrderQueryDeliveryOrderList = (
    query: {
      /** orderCode */
      orderCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespWarehouseDeliveryOrderResp, any>({
      path: `/api/luteos/erp/warehouse/order/queryDeliveryOrderList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-仓配订单
   * @name LuteosErpWarehouseOrderQueryDetail
   * @summary 查询详情
   * @request GET:/api/luteos/erp/warehouse/order/queryDetail
   * @response `200` `WarehouseOrderDetailResp` OK
   */
  luteosErpWarehouseOrderQueryDetail = (
    query: {
      /** code */
      code: string;
      /** push */
      push?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<WarehouseOrderDetailResp, any>({
      path: `/api/luteos/erp/warehouse/order/queryDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-仓配订单
   * @name LuteosErpWarehouseOrderQueryList
   * @summary 查询列表
   * @request POST:/api/luteos/erp/warehouse/order/queryList
   * @response `200` `WarehouseOrderListQueryResp` OK
   */
  luteosErpWarehouseOrderQueryList = (
    req: WarehouseOrderListQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<WarehouseOrderListQueryResp, any>({
      path: `/api/luteos/erp/warehouse/order/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 查询物流轨迹列表
   *
   * @tags ERP-仓配订单
   * @name LuteosErpWarehouseOrderQueryLogisticsTrajectoryList
   * @summary 出库-仓配订单物流轨迹列表
   * @request GET:/api/luteos/erp/warehouse/order/queryLogisticsTrajectoryList
   * @response `200` `CommonRespWarehouseLogisticsTrajectoryResp` OK
   */
  luteosErpWarehouseOrderQueryLogisticsTrajectoryList = (
    query: {
      /** orderCode */
      orderCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespWarehouseLogisticsTrajectoryResp, any>({
      path: `/api/luteos/erp/warehouse/order/queryLogisticsTrajectoryList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-仓配订单
   * @name LuteosErpWarehouseOrderQueryPushGcTransferSlipOrderEnums
   * @summary 推送谷仓-其他调拨单-特殊枚举获取
   * @request GET:/api/luteos/erp/warehouse/order/queryPushGcTransferSlipOrderEnums
   * @response `200` `QueryPushGcTransferSlipOrderEnumsResp` OK
   */
  luteosErpWarehouseOrderQueryPushGcTransferSlipOrderEnums = (
    query: {
      /** code */
      code: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<QueryPushGcTransferSlipOrderEnumsResp, any>({
      path: `/api/luteos/erp/warehouse/order/queryPushGcTransferSlipOrderEnums`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-仓配订单
   * @name LuteosErpWarehouseOrderSaveRemark
   * @summary 保存备注
   * @request POST:/api/luteos/erp/warehouse/order/saveRemark
   * @response `200` `CommonRespString` OK
   */
  luteosErpWarehouseOrderSaveRemark = (req: WoOrderRemarkSaveReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/erp/warehouse/order/saveRemark`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-仓配订单
   * @name LuteosErpWarehouseOrderShippingMarkGenerate
   * @summary 批量生成箱唛
   * @request POST:/api/luteos/erp/warehouse/order/shippingMark/generate
   * @response `200` `CommonRespWoShippingMarkGenerateResp` OK
   */
  luteosErpWarehouseOrderShippingMarkGenerate = (
    req: WoShippingMarkGenerateReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespWoShippingMarkGenerateResp, any>({
      path: `/api/luteos/erp/warehouse/order/shippingMark/generate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 限制10个pdf一批, 会按照传入的pdf顺序返回，但不一定每个都能解析出数据
   *
   * @tags ERP-仓配订单
   * @name LuteosErpWarehouseOrderShippingMarkParse
   * @summary 批量解析箱唛
   * @request POST:/api/luteos/erp/warehouse/order/shippingMark/parse
   * @response `200` `CommonRespWoShippingMarkParseResp` OK
   */
  luteosErpWarehouseOrderShippingMarkParse = (
    req: WoShippingMarkParseReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespWoShippingMarkParseResp, any>({
      path: `/api/luteos/erp/warehouse/order/shippingMark/parse`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 主动触发同步谷仓订单数据
   *
   * @tags ERP-仓配订单
   * @name LuteosErpWarehouseOrderSyncGcOrderInfo
   * @summary 手动同步谷仓订单物流附件信息
   * @request POST:/api/luteos/erp/warehouse/order/syncGcOrderInfo
   * @response `200` `CommonRespVoid` OK
   */
  luteosErpWarehouseOrderSyncGcOrderInfo = (req: SyncGcOrderInfoReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/erp/warehouse/order/syncGcOrderInfo`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-仓配订单
   * @name LuteosErpWarehouseOrderUnbindOrderNo
   * @summary 换绑仓配单号
   * @request POST:/api/luteos/erp/warehouse/order/unbindOrderNo
   * @response `200` `CommonRespVoid` OK
   */
  luteosErpWarehouseOrderUnbindOrderNo = (req: UnBindOrderCodeReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/erp/warehouse/order/unbindOrderNo`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP-仓配订单
   * @name LuteosErpWarehouseOrderUploadGuCangFile
   * @summary 推送谷仓-上传谷仓附件
   * @request POST:/api/luteos/erp/warehouse/order/uploadGuCangFile
   * @response `200` `GcUploadResp` OK
   */
  luteosErpWarehouseOrderUploadGuCangFile = (req: GcUploadReq, params: RequestParams = {}) =>
    this.request<GcUploadResp, any>({
      path: `/api/luteos/erp/warehouse/order/uploadGuCangFile`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 仓库管理-V2
   * @name LuteosErpWarehouseQueryCascadeTree
   * @summary 仓库级联树（一次性返回）：前两列为分类，第三列为启用积加仓库叶子；名称搜索由前端本地过滤
   * @request GET:/api/luteos/erp/warehouse/queryCascadeTree
   * @response `200` `CommonRespListWarehouseCascadeTreeNodeResp` OK
   */
  luteosErpWarehouseQueryCascadeTree = (params: RequestParams = {}) =>
    this.request<CommonRespListWarehouseCascadeTreeNodeResp, any>({
      path: `/api/luteos/erp/warehouse/queryCascadeTree`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 仓库管理-V2
   * @name LuteosErpWarehouseQueryEcWarehouseList
   * @summary 查询易仓仓库列表
   * @request GET:/api/luteos/erp/warehouse/queryEcWarehouseList
   * @response `200` `WarehouseEcBeanResp` OK
   */
  luteosErpWarehouseQueryEcWarehouseList = (params: RequestParams = {}) =>
    this.request<WarehouseEcBeanResp, any>({
      path: `/api/luteos/erp/warehouse/queryEcWarehouseList`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 仓库管理-V2
   * @name LuteosErpWarehouseQueryEcWarehousePageList
   * @summary 查询易仓仓库列表-分页
   * @request GET:/api/luteos/erp/warehouse/queryEcWarehousePageList
   * @response `200` `WarehouseEcBeanPageResp` OK
   */
  luteosErpWarehouseQueryEcWarehousePageList = (
    query: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<WarehouseEcBeanPageResp, any>({
      path: `/api/luteos/erp/warehouse/queryEcWarehousePageList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 仓库管理-V2
   * @name LuteosErpWarehouseQueryList
   * @summary 仓库列表查询
   * @request GET:/api/luteos/erp/warehouse/queryList
   * @response `200` `WarehouseQueryResp` OK
   */
  luteosErpWarehouseQueryList = (
    query: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<WarehouseQueryResp, any>({
      path: `/api/luteos/erp/warehouse/queryList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 仓库管理-V2
   * @name LuteosErpWarehouseQueryLogs
   * @summary 仓库日志查询信息
   * @request POST:/api/luteos/erp/warehouse/queryLogs
   * @response `200` `WarehouseLogResp` OK
   */
  luteosErpWarehouseQueryLogs = (req: WarehouseLogReq, params: RequestParams = {}) =>
    this.request<WarehouseLogResp, any>({
      path: `/api/luteos/erp/warehouse/queryLogs`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 仓库管理-V2
   * @name LuteosErpWarehouseQueryPlatformListByType
   * @summary 查询平台仓库列表通过平台code
   * @request POST:/api/luteos/erp/warehouse/queryPlatformListByType
   * @response `200` `WarehouseQueryResp` OK
   */
  luteosErpWarehouseQueryPlatformListByType = (
    req: WarehouseSimpleQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<WarehouseQueryResp, any>({
      path: `/api/luteos/erp/warehouse/queryPlatformListByType`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 仓库管理-V2
   * @name LuteosErpWarehouseQueryWarehouseListByWarehouseType
   * @summary 查询仓库列表通过仓库类型
   * @request POST:/api/luteos/erp/warehouse/queryWarehouseListByWarehouseType
   * @response `200` `WarehouseQueryResp` OK
   */
  luteosErpWarehouseQueryWarehouseListByWarehouseType = (
    req: WarehouseSimpleQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<WarehouseQueryResp, any>({
      path: `/api/luteos/erp/warehouse/queryWarehouseListByWarehouseType`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 仓库管理-V2
   * @name LuteosErpWarehouseSync
   * @summary 手动同步仓库
   * @request POST:/api/luteos/erp/warehouse/sync
   * @response `200` `CommonResp` OK
   */
  luteosErpWarehouseSync = (req: WarehouseSyncReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/warehouse/sync`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 仓库管理-V2
   * @name LuteosErpWarehouseUpdateCenterWarehouse
   * @summary 更新是否中仓
   * @request POST:/api/luteos/erp/warehouse/updateCenterWarehouse
   * @response `200` `CommonResp` OK
   */
  luteosErpWarehouseUpdateCenterWarehouse = (req: WarehouseUpdateReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/erp/warehouse/updateCenterWarehouse`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 仓库Vat映射
   * @name LuteosErpWarehouseVatAdd
   * @summary 新增
   * @request POST:/api/luteos/erp/warehouse/vat/add
   * @response `200` `CommonRespVoid` OK
   */
  luteosErpWarehouseVatAdd = (req: WarehouseVatAddReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/erp/warehouse/vat/add`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 仓库Vat映射
   * @name LuteosErpWarehouseVatChangeStatus
   * @summary 修改状态
   * @request POST:/api/luteos/erp/warehouse/vat/changeStatus
   * @response `200` `CommonRespVoid` OK
   */
  luteosErpWarehouseVatChangeStatus = (req: WarehouseVatStatusReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/erp/warehouse/vat/changeStatus`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 仓库Vat映射
   * @name LuteosErpWarehouseVatDelete
   * @summary 删除
   * @request POST:/api/luteos/erp/warehouse/vat/delete
   * @response `200` `CommonRespVoid` OK
   */
  luteosErpWarehouseVatDelete = (
    query: {
      /**
       * id
       * @format int32
       */
      id: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/erp/warehouse/vat/delete`,
      method: 'POST',
      query: query,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 仓库Vat映射
   * @name LuteosErpWarehouseVatDownTemplate
   * @summary 下载批量新增模板
   * @request POST:/api/luteos/erp/warehouse/vat/downTemplate
   * @response `200` `CommonRespString` OK
   */
  luteosErpWarehouseVatDownTemplate = (params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/erp/warehouse/vat/downTemplate`,
      method: 'POST',
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 仓库Vat映射
   * @name LuteosErpWarehouseVatQueryList
   * @summary 仓库Vat映射列表查询
   * @request POST:/api/luteos/erp/warehouse/vat/queryList
   * @response `200` `WarehouseVatQueryListResp` OK
   */
  luteosErpWarehouseVatQueryList = (req: WarehouseVatQueryReq, params: RequestParams = {}) =>
    this.request<WarehouseVatQueryListResp, any>({
      path: `/api/luteos/erp/warehouse/vat/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 仓库Vat映射
   * @name LuteosErpWarehouseVatUpdate
   * @summary 编辑
   * @request POST:/api/luteos/erp/warehouse/vat/update
   * @response `200` `CommonRespVoid` OK
   */
  luteosErpWarehouseVatUpdate = (req: WarehouseVatUpdateReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/erp/warehouse/vat/update`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 仓库Vat映射
   * @name LuteosErpWarehouseVatUpload
   * @summary 批量导入
   * @request POST:/api/luteos/erp/warehouse/vat/upload
   * @response `200` `CommonRespVoid` OK
   */
  luteosErpWarehouseVatUpload = (req: UploadReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/erp/warehouse/vat/upload`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
}
