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
  AmazonStockMskuReq,
  AmazonStockMskuResp,
  AmazonStockReq,
  AmazonStockResp,
  CisResultQuerySkuStockDetailResp,
  CommonExportResp,
  CommonPageReq,
  CommonResp,
  CommonRespBoolean,
  CommonRespCommonExportResp,
  CommonRespDirectFactoryWorkOrderAddReq,
  CommonRespErpFlowDetailQueryResp,
  CommonRespErpOrderPreCheckInventoryResp,
  CommonRespFulfillmentBiPageResp,
  CommonRespGucangPackageListResp,
  CommonRespImportDataResp,
  CommonRespImportTemplateQueryResp,
  CommonRespInventoryAllotItemResp,
  CommonRespListDirectFactoryWorkOrderDeliveryReq,
  CommonRespListDirectFactoryWorkOrderSupplierListResp,
  CommonRespListEnumDictItemResp,
  CommonRespListErpDictBean,
  CommonRespListErpOrderStockQueryResp,
  CommonRespListFulfillmentBiDashboardDistributionResp,
  CommonRespListFulfillmentBiDashboardSummaryResp,
  CommonRespListInventoryPoolResp,
  CommonRespListLabelInfoBean,
  CommonRespListMapStringObject,
  CommonRespListRuleLogListResp,
  CommonRespListWarehouseBean,
  CommonRespListWarehouseRuleOutBean,
  CommonRespLogisticsWarehouseVatQueryListResp,
  CommonRespObject,
  CommonRespOrderBatchAuthResp,
  CommonRespOrderBatchCommonResp,
  CommonRespOrderBatchSendNoticeResp,
  CommonRespOrderBatchToWaitSendResp,
  CommonRespOrderPreCheckStockResp,
  CommonRespOrderQueryStockAvailableResp,
  CommonRespOrderUpdateMskuResp,
  CommonRespOtherInboundOrderDetailReq,
  CommonRespOtherOutboundOrderDetailReq,
  CommonRespQueryStockQueryResp,
  CommonRespRuleBlacklistAddReq,
  CommonRespRuleDetailResp,
  CommonRespRuleListResp,
  CommonRespRuleMultipleSuppliesAddReq,
  CommonRespShippingMethodResp,
  CommonRespShopWarehousePageResp,
  CommonRespString,
  CommonRespTransferPlanOrderOutStockResp,
  CommonRespVoid,
  CommonRespWarehouseBumperPageResp,
  CommonRespWarehouseDeliveryOrderResp,
  CommonRespWarehouseLogisticsTrajectoryResp,
  CommonRespWarehouseShipResp,
  CommonRespWoPlaceOrderResp,
  CommonRespWoShippingMarkGenerateResp,
  CommonRespWoShippingMarkParseResp,
  CreditLimitLockRetryReq,
  DeliveryBillListReq,
  DeliveryBillListResp,
  DeliveryBillReq,
  DirectFactoryWorkOrderAddReq,
  DirectFactoryWorkOrderBatchReq,
  DirectFactoryWorkOrderDeliveryListReq,
  DirectFactoryWorkOrderDeliveryListResp,
  DirectFactoryWorkOrderExportReq,
  DirectFactoryWorkOrderListReq,
  DirectFactoryWorkOrderListResp,
  DirectFactoryWorkOrderSupplierListReq,
  DownloadOrderAttachmentUrlReq,
  EdiOrderListQueryResp,
  EdiOrderQueryReq,
  ErpOrderFreightRuleBean,
  ErpOrderPreCheckInventoryReq,
  ErpOrderReferenceParamsResp,
  ErpOrderWarehouseRuleBean,
  ErpOrderWpQueryListReq,
  ErpOrderWpQueryListResp,
  ErpOrderWpUpdateStatusReq,
  FoOrderListQueryResp,
  FoOrderQueryReq,
  FulfillmentBiEditReq,
  FulfillmentBiPageQueryReq,
  FulfillmentOrderBatchChangeSkuReq,
  FulfillmentOrderBatchChangeSkuResp,
  FulfillmentOrderUploadTrackingNoReq,
  GcUploadReq,
  GcUploadResp,
  GucangPackageListReq,
  GuCangTransferSlipOrderBean,
  GuCangTransferSlipOrderBeanWarehouseService,
  ImportDataReq,
  ImportDataResp,
  ImportTemplateQueryResp,
  InventoryAllotAddReq,
  InventoryAllotListReq,
  InventoryAllotListResp,
  InventoryPoolReq,
  LabelDeleteReq,
  LabelInfoBean,
  LabelListQueryReq,
  LogisticsOrderPushReq,
  LogisticsWarehouseVatQueryReq,
  ModifyWarehouseLogisticsReq,
  MonitorB2BOutboundQueryListReq,
  MonitorB2BOutboundQueryListResp,
  MonitorCisStorageQueryListReq,
  MonitorCisStorageQueryListResp,
  MonitorSalesQueryListReq,
  MonitorSalesQueryListResp,
  MonitorTransferQueryListReq,
  MonitorTransferQueryListResp,
  OmsBusinessTriggerTaskBatchRetryReq,
  OmsBusinessTriggerTaskPageQueryReq,
  OmsBusinessTriggerTaskPageResp,
  OmsBusinessTriggerTaskRetryReq,
  OperationLogReq,
  OperationLogResp,
  OrdeAddOrDelTabelReq,
  OrderAddItemGiftReq,
  OrderAuthSaveReq,
  OrderB2BOutboundReq,
  OrderB2BOutboundResp,
  OrderBatchAuthReq,
  OrderBatchAuthResp,
  OrderBatchCommonReq,
  OrderBatchCommonResp,
  OrderBatchConfirmSendReq,
  OrderBatchFbaDetailResp,
  OrderBatchFreezeReq,
  OrderBatchSendNoticeReq,
  OrderBatchSubReq,
  OrderBatchToAbondReq,
  OrderBatchToAuditReq,
  OrderBatchToFbaReq,
  OrderBatchToWaitSendReq,
  OrderBatchTransferSelfReq,
  OrderBatchUpdateAuthReq,
  OrderBindingWarehouseAndShipReq,
  OrderChangeSkuBatchToAuditResp,
  OrderChangeSkuReq,
  OrderCutAttBatchReq,
  OrderCutAttReq,
  OrderDetailResp,
  OrderFreezeReq,
  OrderJjPickTaskReq,
  OrderJjPickTaskResp,
  OrderListQueryResp,
  OrderMarkDeliveryReq,
  OrderPreCheckStockReq,
  OrderPushGuReq,
  OrderQueryStockAvailableReq,
  OrderReceiveInfoSaveReq,
  OrderRemarkReq,
  OrderRemarkSaveReq,
  OrderSalesOutboundReq,
  OrderSalesOutboundResp,
  OrderSaveReq,
  OrderSubReq,
  OrderTransferFbaBatchV2Req,
  OrderTransferFbaReq,
  OrderTransferSelfReq,
  OrderUpdateTabelReq,
  OrderUpdateUploadReq,
  OrderUploadAttachmentReq,
  OrderWarehouseLogisticsUpdateReq,
  OtherInboundOrderAddReq,
  OtherInboundOrderListReq,
  OtherInboundOrderListResp,
  OtherOutboundOrderAddReq,
  OtherOutboundOrderListReq,
  OtherOutboundOrderListResp,
  PlanDeliveryBillDetailResp,
  ProductSkuStockQueryReq,
  ProductSkuStockQueryResp,
  PurchaseOrderReq,
  PurchaseReturnOrderReq,
  QueryOrderBatchToFbaReq,
  QueryPushGcTransferSlipOrderEnumsResp,
  QuerySkuStockDetailReq,
  QueryStockQueryReq,
  QueryWarehouseLogisticsReq,
  ReferenceParamsDeliveryReq,
  ReplenishOrderSaveReq,
  ReplenishProductInfoResp,
  ReplenishProductReq,
  RuleAddReq,
  RuleBatchCommonReq,
  RuleBlacklistAddReq,
  RuleBlacklistEnableDisableReq,
  RuleBlacklistListReq,
  RuleBlacklistListResp,
  RuleEnableDisableReq,
  RuleListReq,
  RuleLogListReq,
  RuleMultipleSuppliesAddReq,
  RuleMultipleSuppliesListReq,
  RuleMultipleSuppliesListResp,
  RuleTaxListBatchUpdateReq,
  RuleTaxListReq,
  RuleTaxListResp,
  SampleOrderV3ListQueryReq,
  ShippingMethodReq,
  ShopifyOrderCommonReq,
  ShopifyOrderDetailResp,
  ShopifyOrderEditItemRemarkReq,
  ShopifyOrderEditRemarkReq,
  ShopifyOrderFetchOrderReq,
  ShopifyOrderQueryListReq,
  ShopifyOrderQueryListResp,
  SupplySkuListQueryReq,
  SupplySkuListQueryResp,
  SupplySkuQueryResp,
  SupplySkuWarehouseReq,
  SyncGcOrderInfoReq,
  TransferOrderBatchAbandonReq,
  TransferOrderBatchSubmitReq,
  TransferOrderCommonReq,
  TransferOrderConfirmReq,
  TransferOrderDetailQueryResp,
  TransferOrderExportReq,
  TransferOrderInboundReq,
  TransferOrderListQueryReq,
  TransferOrderListQueryResp,
  TransferOrderPushReq,
  TransferOrderRemarkReq,
  TransferOrderSaveReq,
  TransferOrderStatusStatisticsResp,
  TransferOrderSubmitReq,
  TransferOrderUploadAttachmentReq,
  TransferPlanOrderAuditReq,
  TransferPlanOrderBatchCodeReq,
  TransferPlanOrderCodeReq,
  TransferPlanOrderDetailResp,
  TransferPlanOrderExportReq,
  TransferPlanOrderItemListResp,
  TransferPlanOrderItemReq,
  TransferPlanOrderListQueryReq,
  TransferPlanOrderListQueryResp,
  TransferPlanOrderOutStockReq,
  TransferPlanOrderSaveReq,
  UpdateMskuMatchInfoReq,
  UploadReq,
  WarehouseBumperQueryReq,
  WarehouseCommonQueryReq,
  WarehouseDeliveryMapResp,
  WarehouseOrderDetailResp,
  WarehouseOrderListQueryReq,
  WarehouseOrderListQueryResp,
  WarehouseShipListQueryReq,
  WmsOutboundBackMessageBean,
  WoOrderRemarkSaveReq,
  WoPlaceOrderReq,
  WoShippingMarkGenerateReq,
  WoShippingMarkParseReq,
  WoUpdateTrackingNumReq,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description 字典-获取枚举下拉
   *
   * @tags 业务枚举
   * @name OmsCommonBizEnumsGetEnumDict
   * @summary 字典-获取枚举下拉
   * @request GET:/api/oms/common/bizEnums/getEnumDict
   * @response `200` `CommonRespListEnumDictItemResp` OK
   */
  omsCommonBizEnumsGetEnumDict = (
    query?: {
      /** enumDictCode */
      enumDictCode?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespListEnumDictItemResp, any>({
      path: `/api/oms/common/bizEnums/getEnumDict`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 导入模块
   * @name OmsCommonFileImportData
   * @summary 数据导入
   * @request POST:/api/oms/common/file/importData
   * @response `200` `ImportDataResp` OK
   */
  omsCommonFileImportData = (req: ImportDataReq, params: RequestParams = {}) =>
    this.request<ImportDataResp, any>({
      path: `/api/oms/common/file/importData`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 导入模块
   * @name OmsCommonFileQueryImportTemplate
   * @summary 获取导入模板
   * @request GET:/api/oms/common/file/queryImportTemplate
   * @response `200` `ImportTemplateQueryResp` OK
   */
  omsCommonFileQueryImportTemplate = (
    query: {
      /** 场景  amazon_ticket-亚马逊券码导入 product_spu-商品spu导入 product_sku-商品sku导入 platform_sku-映射sku导入 ly_order-领用订单导入 */
      importScene: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<ImportTemplateQueryResp, any>({
      path: `/api/oms/common/file/queryImportTemplate`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 日志通用接口
   * @name OmsCommonLogQueryLog
   * @summary 日志查询
   * @request POST:/api/oms/common/log/queryLog
   * @response `200` `OperationLogResp` OK
   */
  omsCommonLogQueryLog = (req: OperationLogReq, params: RequestParams = {}) =>
    this.request<OperationLogResp, any>({
      path: `/api/oms/common/log/queryLog`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 供应链SKU通用接口
   * @name OmsCommonProductQueryAddGiftSupplySkuList
   * @summary 查询Shopify赠品供应链SKU
   * @request POST:/api/oms/common/product/queryAddGiftSupplySkuList
   * @response `200` `SupplySkuListQueryResp` OK
   */
  omsCommonProductQueryAddGiftSupplySkuList = (
    req: SupplySkuListQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<SupplySkuListQueryResp, any>({
      path: `/api/oms/common/product/queryAddGiftSupplySkuList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 供应链SKU通用接口
   * @name OmsCommonProductQuerySupplySkuList
   * @summary 查询供应链SKU
   * @request POST:/api/oms/common/product/querySupplySkuList
   * @response `200` `SupplySkuListQueryResp` OK
   */
  omsCommonProductQuerySupplySkuList = (req: SupplySkuListQueryReq, params: RequestParams = {}) =>
    this.request<SupplySkuListQueryResp, any>({
      path: `/api/oms/common/product/querySupplySkuList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 供应链SKU通用接口
   * @name OmsCommonProductQuerySupplySkuListForTs
   * @summary 查询供应链SKU-TS
   * @request POST:/api/oms/common/product/querySupplySkuListForTs
   * @response `200` `SupplySkuListQueryResp` OK
   */
  omsCommonProductQuerySupplySkuListForTs = (
    req: SupplySkuListQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<SupplySkuListQueryResp, any>({
      path: `/api/oms/common/product/querySupplySkuListForTs`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存通用接口
   * @name OmsCommonStockQueryAmazonMskuStock
   * @summary 获取亚马逊库存-店铺+msku
   * @request POST:/api/oms/common/stock/queryAmazonMskuStock
   * @response `200` `AmazonStockMskuResp` OK
   */
  omsCommonStockQueryAmazonMskuStock = (req: AmazonStockMskuReq, params: RequestParams = {}) =>
    this.request<AmazonStockMskuResp, any>({
      path: `/api/oms/common/stock/queryAmazonMskuStock`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存通用接口
   * @name OmsCommonStockQueryAmazonSkuStock
   * @summary 获取亚马逊库存-仓库+supplySku
   * @request POST:/api/oms/common/stock/queryAmazonSkuStock
   * @response `200` `AmazonStockResp` OK
   */
  omsCommonStockQueryAmazonSkuStock = (req: AmazonStockReq, params: RequestParams = {}) =>
    this.request<AmazonStockResp, any>({
      path: `/api/oms/common/stock/queryAmazonSkuStock`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存通用接口
   * @name OmsCommonStockQueryPool
   * @summary 获取库存分配池
   * @request POST:/api/oms/common/stock/queryPool
   * @response `200` `CommonRespListInventoryPoolResp` OK
   */
  omsCommonStockQueryPool = (req: InventoryPoolReq, params: RequestParams = {}) =>
    this.request<CommonRespListInventoryPoolResp, any>({
      path: `/api/oms/common/stock/queryPool`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存通用接口
   * @name OmsCommonStockQuerySkuStock
   * @summary 查询产品SKU库存
   * @request POST:/api/oms/common/stock/querySkuStock
   * @response `200` `ProductSkuStockQueryResp` OK
   */
  omsCommonStockQuerySkuStock = (req: ProductSkuStockQueryReq, params: RequestParams = {}) =>
    this.request<ProductSkuStockQueryResp, any>({
      path: `/api/oms/common/stock/querySkuStock`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存通用接口
   * @name OmsCommonStockQuerySkuStockDetail
   * @summary 查询产品SKU库存明细
   * @request POST:/api/oms/common/stock/querySkuStockDetail
   * @response `200` `CisResultQuerySkuStockDetailResp` OK
   */
  omsCommonStockQuerySkuStockDetail = (req: QuerySkuStockDetailReq, params: RequestParams = {}) =>
    this.request<CisResultQuerySkuStockDetailResp, any>({
      path: `/api/oms/common/stock/querySkuStockDetail`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存通用接口
   * @name OmsCommonStockQueryStocks
   * @summary 查询库存产品
   * @request POST:/api/oms/common/stock/queryStocks
   * @response `200` `CommonRespQueryStockQueryResp` OK
   */
  omsCommonStockQueryStocks = (req: QueryStockQueryReq, params: RequestParams = {}) =>
    this.request<CommonRespQueryStockQueryResp, any>({
      path: `/api/oms/common/stock/queryStocks`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存通用接口
   * @name OmsCommonStockQuerySupplySkuList
   * @summary 商品Sku 关联供应链SKU查询并返回库存
   * @request GET:/api/oms/common/stock/querySupplySkuList
   * @response `200` `SupplySkuQueryResp` OK
   */
  omsCommonStockQuerySupplySkuList = (
    query: {
      /**
       * deliverType
       * @format int32
       */
      deliverType: number;
      /** salesmanCode */
      salesmanCode?: string;
      /** skuCode */
      skuCode: string;
      /** warehouseCode */
      warehouseCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<SupplySkuQueryResp, any>({
      path: `/api/oms/common/stock/querySupplySkuList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存通用接口
   * @name OmsCommonStockQuerySupplySkuStock
   * @summary 查询供应链SKU仓库库存
   * @request POST:/api/oms/common/stock/querySupplySkuStock
   * @response `200` `SupplySkuQueryResp` OK
   */
  omsCommonStockQuerySupplySkuStock = (req: SupplySkuWarehouseReq, params: RequestParams = {}) =>
    this.request<SupplySkuQueryResp, any>({
      path: `/api/oms/common/stock/querySupplySkuStock`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存通用接口
   * @name OmsCommonStockQuerySupplySkuStockDetail
   * @summary 查询供应链SKU库存明细
   * @request POST:/api/oms/common/stock/querySupplySkuStockDetail
   * @response `200` `CisResultQuerySkuStockDetailResp` OK
   */
  omsCommonStockQuerySupplySkuStockDetail = (
    req: QuerySkuStockDetailReq,
    params: RequestParams = {},
  ) =>
    this.request<CisResultQuerySkuStockDetailResp, any>({
      path: `/api/oms/common/stock/querySupplySkuStockDetail`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 系统通用接口
   * @name OmsCommonSysDeleteLabelInfo
   * @summary 删除标签信息
   * @request POST:/api/oms/common/sys/deleteLabelInfo
   * @response `200` `CommonRespObject` OK
   */
  omsCommonSysDeleteLabelInfo = (req: LabelDeleteReq, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/oms/common/sys/deleteLabelInfo`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 系统通用接口
   * @name OmsCommonSysQueryLabelList
   * @summary 查询系统标签
   * @request POST:/api/oms/common/sys/queryLabelList
   * @response `200` `CommonRespListLabelInfoBean` OK
   */
  omsCommonSysQueryLabelList = (req: LabelListQueryReq, params: RequestParams = {}) =>
    this.request<CommonRespListLabelInfoBean, any>({
      path: `/api/oms/common/sys/queryLabelList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 系统通用接口
   * @name OmsCommonSysSaveLabelInfo
   * @summary 新增系统标签
   * @request POST:/api/oms/common/sys/saveLabelInfo
   * @response `200` `CommonRespString` OK
   */
  omsCommonSysSaveLabelInfo = (labelInfoBean: LabelInfoBean, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/oms/common/sys/saveLabelInfo`,
      method: 'POST',
      body: labelInfoBean,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 业务任务通用接口
   * @name OmsCommonTaskBatchRetry
   * @summary 批量重试
   * @request POST:/api/oms/common/task/batchRetry
   * @response `200` `CommonRespOrderBatchAuthResp` OK
   */
  omsCommonTaskBatchRetry = (
    req: OmsBusinessTriggerTaskBatchRetryReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespOrderBatchAuthResp, any>({
      path: `/api/oms/common/task/batchRetry`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 业务任务通用接口
   * @name OmsCommonTaskQueryBusinessTaskList
   * @summary 查询当前用户当天任务列表
   * @request POST:/api/oms/common/task/queryBusinessTaskList
   * @response `200` `OmsBusinessTriggerTaskPageResp` OK
   */
  omsCommonTaskQueryBusinessTaskList = (
    req: OmsBusinessTriggerTaskPageQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<OmsBusinessTriggerTaskPageResp, any>({
      path: `/api/oms/common/task/queryBusinessTaskList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 业务任务通用接口
   * @name OmsCommonTaskRetry
   * @summary 重试
   * @request POST:/api/oms/common/task/retry
   * @response `200` `CommonRespObject` OK
   */
  omsCommonTaskRetry = (req: OmsBusinessTriggerTaskRetryReq, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/oms/common/task/retry`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 仓库通用接口
   * @name OmsCommonWarehouseList
   * @summary 查询仓库
   * @request POST:/api/oms/common/warehouse/list
   * @response `200` `CommonRespListWarehouseBean` OK
   */
  omsCommonWarehouseList = (
    warehouseCommonQueryReq: WarehouseCommonQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespListWarehouseBean, any>({
      path: `/api/oms/common/warehouse/list`,
      method: 'POST',
      body: warehouseCommonQueryReq,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 仓库通用接口
   * @name OmsCommonWarehouseQueryAllShipping
   * @summary 查询承运商运输方式列表
   * @request POST:/api/oms/common/warehouse/queryAllShipping
   * @response `200` `CommonRespShippingMethodResp` OK
   */
  omsCommonWarehouseQueryAllShipping = (req: ShippingMethodReq, params: RequestParams = {}) =>
    this.request<CommonRespShippingMethodResp, any>({
      path: `/api/oms/common/warehouse/queryAllShipping`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 仓库通用接口
   * @name OmsCommonWarehouseQueryLogisticsWarehouseVat
   * @summary 获取仓库VAT
   * @request POST:/api/oms/common/warehouse/queryLogisticsWarehouseVat
   * @response `200` `CommonRespLogisticsWarehouseVatQueryListResp` OK
   */
  omsCommonWarehouseQueryLogisticsWarehouseVat = (
    req: LogisticsWarehouseVatQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespLogisticsWarehouseVatQueryListResp, any>({
      path: `/api/oms/common/warehouse/queryLogisticsWarehouseVat`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 仓库通用接口
   * @name OmsCommonWarehouseQueryWarehouseShipList
   * @summary 查询仓库运输方式列表
   * @request POST:/api/oms/common/warehouse/queryWarehouseShipList
   * @response `200` `CommonRespWarehouseShipResp` OK
   */
  omsCommonWarehouseQueryWarehouseShipList = (
    req: WarehouseShipListQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespWarehouseShipResp, any>({
      path: `/api/oms/common/warehouse/queryWarehouseShipList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 送货管理
   * @name OmsDeliveryBillQueryDetail
   * @summary 详情
   * @request GET:/api/oms/delivery/bill/queryDetail
   * @response `200` `PlanDeliveryBillDetailResp` OK
   */
  omsDeliveryBillQueryDetail = (
    query: {
      /** code */
      code: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<PlanDeliveryBillDetailResp, any>({
      path: `/api/oms/delivery/bill/queryDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 送货管理
   * @name OmsDeliveryBillQueryList
   * @summary 查询列表
   * @request POST:/api/oms/delivery/bill/queryList
   * @response `200` `DeliveryBillListResp` OK
   */
  omsDeliveryBillQueryList = (req: DeliveryBillListReq, params: RequestParams = {}) =>
    this.request<DeliveryBillListResp, any>({
      path: `/api/oms/delivery/bill/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 工厂直发工单管理
   * @name OmsDirectFactoryWorkOrderAbandon
   * @summary 作废
   * @request GET:/api/oms/direct/factory/work/order/abandon
   * @response `200` `CommonRespString` OK
   */
  omsDirectFactoryWorkOrderAbandon = (
    query: {
      /**
       * id
       * @format int64
       */
      id: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespString, any>({
      path: `/api/oms/direct/factory/work/order/abandon`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 工厂直发工单管理
   * @name OmsDirectFactoryWorkOrderAdd
   * @summary 新增工单
   * @request POST:/api/oms/direct/factory/work/order/add
   * @response `200` `CommonRespString` OK
   */
  omsDirectFactoryWorkOrderAdd = (req: DirectFactoryWorkOrderAddReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/oms/direct/factory/work/order/add`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 工厂直发工单管理
   * @name OmsDirectFactoryWorkOrderAddUpload
   * @summary 上传批量新增
   * @request POST:/api/oms/direct/factory/work/order/add/upload
   * @response `200` `CommonRespImportDataResp` OK
   */
  omsDirectFactoryWorkOrderAddUpload = (req: UploadReq, params: RequestParams = {}) =>
    this.request<CommonRespImportDataResp, any>({
      path: `/api/oms/direct/factory/work/order/add/upload`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 工厂直发工单管理
   * @name OmsDirectFactoryWorkOrderBatchQualityInspectionReceipt
   * @summary 批量收货质检
   * @request POST:/api/oms/direct/factory/work/order/batchQualityInspectionReceipt
   * @response `200` `CommonRespString` OK
   */
  omsDirectFactoryWorkOrderBatchQualityInspectionReceipt = (
    req: DirectFactoryWorkOrderBatchReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespString, any>({
      path: `/api/oms/direct/factory/work/order/batchQualityInspectionReceipt`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 工厂直发工单管理
   * @name OmsDirectFactoryWorkOrderDownTransferyTemplate
   * @summary 下载积加调拨单模板
   * @request POST:/api/oms/direct/factory/work/order/downTransferyTemplate
   * @response `200` `CommonRespString` OK
   */
  omsDirectFactoryWorkOrderDownTransferyTemplate = (params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/oms/direct/factory/work/order/downTransferyTemplate`,
      method: 'POST',
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 工厂直发工单管理
   * @name OmsDirectFactoryWorkOrderExport
   * @summary 导出提货单
   * @request POST:/api/oms/direct/factory/work/order/export
   * @response `200` `CommonRespString` OK
   */
  omsDirectFactoryWorkOrderExport = (
    req: DirectFactoryWorkOrderExportReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespString, any>({
      path: `/api/oms/direct/factory/work/order/export`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 工厂直发工单管理
   * @name OmsDirectFactoryWorkOrderExportPoInfo
   * @summary 导出采购订单
   * @request POST:/api/oms/direct/factory/work/order/exportPoInfo
   * @response `200` `CommonExportResp` OK
   */
  omsDirectFactoryWorkOrderExportPoInfo = (
    req: DirectFactoryWorkOrderListReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/oms/direct/factory/work/order/exportPoInfo`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 工厂直发工单管理
   * @name OmsDirectFactoryWorkOrderLogisticsPickup
   * @summary 确认物流提货
   * @request GET:/api/oms/direct/factory/work/order/logisticsPickup
   * @response `200` `CommonRespString` OK
   */
  omsDirectFactoryWorkOrderLogisticsPickup = (
    query: {
      /**
       * id
       * @format int64
       */
      id: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespString, any>({
      path: `/api/oms/direct/factory/work/order/logisticsPickup`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 工厂直发工单管理
   * @name OmsDirectFactoryWorkOrderQueryDeliveryItemList
   * @summary 查询送货单明细列表
   * @request POST:/api/oms/direct/factory/work/order/queryDeliveryItemList
   * @response `200` `CommonRespListDirectFactoryWorkOrderDeliveryReq` OK
   */
  omsDirectFactoryWorkOrderQueryDeliveryItemList = (codes: string[], params: RequestParams = {}) =>
    this.request<CommonRespListDirectFactoryWorkOrderDeliveryReq, any>({
      path: `/api/oms/direct/factory/work/order/queryDeliveryItemList`,
      method: 'POST',
      body: codes,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 工厂直发工单管理
   * @name OmsDirectFactoryWorkOrderQueryDeliveryList
   * @summary 查询送货单列表
   * @request POST:/api/oms/direct/factory/work/order/queryDeliveryList
   * @response `200` `DirectFactoryWorkOrderDeliveryListResp` OK
   */
  omsDirectFactoryWorkOrderQueryDeliveryList = (
    req: DirectFactoryWorkOrderDeliveryListReq,
    params: RequestParams = {},
  ) =>
    this.request<DirectFactoryWorkOrderDeliveryListResp, any>({
      path: `/api/oms/direct/factory/work/order/queryDeliveryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 工厂直发工单管理
   * @name OmsDirectFactoryWorkOrderQueryDetail
   * @summary 查询详情
   * @request GET:/api/oms/direct/factory/work/order/queryDetail
   * @response `200` `CommonRespDirectFactoryWorkOrderAddReq` OK
   */
  omsDirectFactoryWorkOrderQueryDetail = (
    query: {
      /**
       * id
       * @format int64
       */
      id: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespDirectFactoryWorkOrderAddReq, any>({
      path: `/api/oms/direct/factory/work/order/queryDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 工厂直发工单管理
   * @name OmsDirectFactoryWorkOrderQueryList
   * @summary 查询列表
   * @request POST:/api/oms/direct/factory/work/order/queryList
   * @response `200` `DirectFactoryWorkOrderListResp` OK
   */
  omsDirectFactoryWorkOrderQueryList = (
    req: DirectFactoryWorkOrderListReq,
    params: RequestParams = {},
  ) =>
    this.request<DirectFactoryWorkOrderListResp, any>({
      path: `/api/oms/direct/factory/work/order/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 工厂直发工单管理
   * @name OmsDirectFactoryWorkOrderQueryStatusCount
   * @summary 查询状态统计
   * @request GET:/api/oms/direct/factory/work/order/queryStatusCount
   * @response `200` `CommonRespListMapStringObject` OK
   */
  omsDirectFactoryWorkOrderQueryStatusCount = (params: RequestParams = {}) =>
    this.request<CommonRespListMapStringObject, any>({
      path: `/api/oms/direct/factory/work/order/queryStatusCount`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 工厂直发工单管理
   * @name OmsDirectFactoryWorkOrderQuerySupplierList
   * @summary 查询供应商列表
   * @request POST:/api/oms/direct/factory/work/order/querySupplierList
   * @response `200` `CommonRespListDirectFactoryWorkOrderSupplierListResp` OK
   */
  omsDirectFactoryWorkOrderQuerySupplierList = (
    req: DirectFactoryWorkOrderSupplierListReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespListDirectFactoryWorkOrderSupplierListResp, any>({
      path: `/api/oms/direct/factory/work/order/querySupplierList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 工厂直发工单管理
   * @name OmsDirectFactoryWorkOrderUpdate
   * @summary 编辑
   * @request POST:/api/oms/direct/factory/work/order/update
   * @response `200` `CommonRespString` OK
   */
  omsDirectFactoryWorkOrderUpdate = (
    req: DirectFactoryWorkOrderAddReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespString, any>({
      path: `/api/oms/direct/factory/work/order/update`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags EDI订单
   * @name OmsEdiDownload
   * @summary 下载EDI订单
   * @request POST:/api/oms/edi/download
   * @response `200` `CommonExportResp` OK
   */
  omsEdiDownload = (req: EdiOrderQueryReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/oms/edi/download`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags EDI订单
   * @name OmsEdiQueryList
   * @summary 查询EDI订单
   * @request POST:/api/oms/edi/queryList
   * @response `200` `EdiOrderListQueryResp` OK
   */
  omsEdiQueryList = (req: EdiOrderQueryReq, params: RequestParams = {}) =>
    this.request<EdiOrderListQueryResp, any>({
      path: `/api/oms/edi/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 积加自发货订单管理
   * @name OmsFoOrderQueryList
   * @summary 查询列表
   * @request POST:/api/oms/fo/order/queryList
   * @response `200` `FoOrderListQueryResp` OK
   */
  omsFoOrderQueryList = (req: FoOrderQueryReq, params: RequestParams = {}) =>
    this.request<FoOrderListQueryResp, any>({
      path: `/api/oms/fo/order/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 订单履约可视化BI报表
   * @name OmsFulfillmentBiDashboardDistributionExceptionCustomerType
   * @summary 看板-异常+客户类型维度分布（year不传默认当前年，orderChannel不传返回全部渠道）
   * @request GET:/api/oms/fulfillment/bi/dashboard/distribution/exception-customer-type
   * @response `200` `CommonRespListFulfillmentBiDashboardDistributionResp` OK
   */
  omsFulfillmentBiDashboardDistributionExceptionCustomerType = (
    query?: {
      /** 订单渠道，不传返回全部渠道 */
      orderChannel?: string;
      /**
       * 年份，不传默认当前年
       * @format int32
       */
      year?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespListFulfillmentBiDashboardDistributionResp, any>({
      path: `/api/oms/fulfillment/bi/dashboard/distribution/exception-customer-type`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 订单履约可视化BI报表
   * @name OmsFulfillmentBiDashboardDistributionExceptionRegion
   * @summary 看板-异常+大区维度分布（year不传默认当前年，orderChannel不传返回全部渠道）
   * @request GET:/api/oms/fulfillment/bi/dashboard/distribution/exception-region
   * @response `200` `CommonRespListFulfillmentBiDashboardDistributionResp` OK
   */
  omsFulfillmentBiDashboardDistributionExceptionRegion = (
    query?: {
      /** 订单渠道，不传返回全部渠道 */
      orderChannel?: string;
      /**
       * 年份，不传默认当前年
       * @format int32
       */
      year?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespListFulfillmentBiDashboardDistributionResp, any>({
      path: `/api/oms/fulfillment/bi/dashboard/distribution/exception-region`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 订单履约可视化BI报表
   * @name OmsFulfillmentBiDashboardDistributionStatusCustomerType
   * @summary 看板-状态+客户类型维度分布（year不传默认当前年，orderChannel不传返回全部渠道）
   * @request GET:/api/oms/fulfillment/bi/dashboard/distribution/status-customer-type
   * @response `200` `CommonRespListFulfillmentBiDashboardDistributionResp` OK
   */
  omsFulfillmentBiDashboardDistributionStatusCustomerType = (
    query?: {
      /** 订单渠道，不传返回全部渠道 */
      orderChannel?: string;
      /**
       * 年份，不传默认当前年
       * @format int32
       */
      year?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespListFulfillmentBiDashboardDistributionResp, any>({
      path: `/api/oms/fulfillment/bi/dashboard/distribution/status-customer-type`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 订单履约可视化BI报表
   * @name OmsFulfillmentBiDashboardDistributionStatusRegion
   * @summary 看板-状态+大区维度分布（year不传默认当前年，orderChannel不传返回全部渠道）
   * @request GET:/api/oms/fulfillment/bi/dashboard/distribution/status-region
   * @response `200` `CommonRespListFulfillmentBiDashboardDistributionResp` OK
   */
  omsFulfillmentBiDashboardDistributionStatusRegion = (
    query?: {
      /** 订单渠道，不传返回全部渠道 */
      orderChannel?: string;
      /**
       * 年份，不传默认当前年
       * @format int32
       */
      year?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespListFulfillmentBiDashboardDistributionResp, any>({
      path: `/api/oms/fulfillment/bi/dashboard/distribution/status-region`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 订单履约可视化BI报表
   * @name OmsFulfillmentBiDashboardSummary
   * @summary 看板-年度订单汇总（返回当前年及上一年数据；year不传默认当前年，orderChannel不传返回全部渠道）
   * @request GET:/api/oms/fulfillment/bi/dashboard/summary
   * @response `200` `CommonRespListFulfillmentBiDashboardSummaryResp` OK
   */
  omsFulfillmentBiDashboardSummary = (
    query?: {
      /** 订单渠道，不传返回全部渠道 */
      orderChannel?: string;
      /**
       * 年份，不传默认当前年
       * @format int32
       */
      year?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespListFulfillmentBiDashboardSummaryResp, any>({
      path: `/api/oms/fulfillment/bi/dashboard/summary`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 订单履约可视化BI报表
   * @name OmsFulfillmentBiEdit
   * @summary 编辑可编辑字段
   * @request POST:/api/oms/fulfillment/bi/edit
   * @response `200` `CommonRespVoid` OK
   */
  omsFulfillmentBiEdit = (req: FulfillmentBiEditReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/oms/fulfillment/bi/edit`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 订单履约可视化BI报表
   * @name OmsFulfillmentBiLogisticsExport
   * @summary 物流-导出
   * @request POST:/api/oms/fulfillment/bi/logistics/export
   * @response `200` `CommonRespCommonExportResp` OK
   */
  omsFulfillmentBiLogisticsExport = (req: FulfillmentBiPageQueryReq, params: RequestParams = {}) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/oms/fulfillment/bi/logistics/export`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 订单履约可视化BI报表
   * @name OmsFulfillmentBiLogisticsImport
   * @summary 物流-导入
   * @request POST:/api/oms/fulfillment/bi/logistics/import
   * @response `200` `CommonRespImportDataResp` OK
   */
  omsFulfillmentBiLogisticsImport = (req: UploadReq, params: RequestParams = {}) =>
    this.request<CommonRespImportDataResp, any>({
      path: `/api/oms/fulfillment/bi/logistics/import`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 订单履约可视化BI报表
   * @name OmsFulfillmentBiLogisticsImportTemplate
   * @summary 物流-导入模板
   * @request GET:/api/oms/fulfillment/bi/logistics/import/template
   * @response `200` `CommonRespImportTemplateQueryResp` OK
   */
  omsFulfillmentBiLogisticsImportTemplate = (params: RequestParams = {}) =>
    this.request<CommonRespImportTemplateQueryResp, any>({
      path: `/api/oms/fulfillment/bi/logistics/import/template`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 订单履约可视化BI报表
   * @name OmsFulfillmentBiOrderExport
   * @summary 订单-导出
   * @request POST:/api/oms/fulfillment/bi/order/export
   * @response `200` `CommonRespCommonExportResp` OK
   */
  omsFulfillmentBiOrderExport = (req: FulfillmentBiPageQueryReq, params: RequestParams = {}) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/oms/fulfillment/bi/order/export`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 订单履约可视化BI报表
   * @name OmsFulfillmentBiOrderImport
   * @summary 订单-导入
   * @request POST:/api/oms/fulfillment/bi/order/import
   * @response `200` `CommonRespImportDataResp` OK
   */
  omsFulfillmentBiOrderImport = (req: UploadReq, params: RequestParams = {}) =>
    this.request<CommonRespImportDataResp, any>({
      path: `/api/oms/fulfillment/bi/order/import`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 订单履约可视化BI报表
   * @name OmsFulfillmentBiOrderImportTemplate
   * @summary 订单-导入模板
   * @request GET:/api/oms/fulfillment/bi/order/import/template
   * @response `200` `CommonRespImportTemplateQueryResp` OK
   */
  omsFulfillmentBiOrderImportTemplate = (params: RequestParams = {}) =>
    this.request<CommonRespImportTemplateQueryResp, any>({
      path: `/api/oms/fulfillment/bi/order/import/template`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 订单履约可视化BI报表
   * @name OmsFulfillmentBiPage
   * @summary 分页查询
   * @request POST:/api/oms/fulfillment/bi/page
   * @response `200` `CommonRespFulfillmentBiPageResp` OK
   */
  omsFulfillmentBiPage = (req: FulfillmentBiPageQueryReq, params: RequestParams = {}) =>
    this.request<CommonRespFulfillmentBiPageResp, any>({
      path: `/api/oms/fulfillment/bi/page`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 订单履约可视化BI报表
   * @name OmsFulfillmentBiPlanExport
   * @summary 计划-导出
   * @request POST:/api/oms/fulfillment/bi/plan/export
   * @response `200` `CommonRespCommonExportResp` OK
   */
  omsFulfillmentBiPlanExport = (req: FulfillmentBiPageQueryReq, params: RequestParams = {}) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/oms/fulfillment/bi/plan/export`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 订单履约可视化BI报表
   * @name OmsFulfillmentBiPlanImport
   * @summary 计划-导入
   * @request POST:/api/oms/fulfillment/bi/plan/import
   * @response `200` `CommonRespImportDataResp` OK
   */
  omsFulfillmentBiPlanImport = (req: UploadReq, params: RequestParams = {}) =>
    this.request<CommonRespImportDataResp, any>({
      path: `/api/oms/fulfillment/bi/plan/import`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 订单履约可视化BI报表
   * @name OmsFulfillmentBiPlanImportTemplate
   * @summary 计划-导入模板
   * @request GET:/api/oms/fulfillment/bi/plan/import/template
   * @response `200` `CommonRespImportTemplateQueryResp` OK
   */
  omsFulfillmentBiPlanImportTemplate = (params: RequestParams = {}) =>
    this.request<CommonRespImportTemplateQueryResp, any>({
      path: `/api/oms/fulfillment/bi/plan/import/template`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 自规划订单管理
   * @name OmsFulfillmentOrderAddLabel
   * @summary 追加标签
   * @request POST:/api/oms/fulfillment/order/addLabel
   * @response `200` `CommonRespObject` OK
   */
  omsFulfillmentOrderAddLabel = (req: OrdeAddOrDelTabelReq, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/oms/fulfillment/order/addLabel`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 自规划订单管理
   * @name OmsFulfillmentOrderBatchAbandon
   * @summary 批量作废
   * @request POST:/api/oms/fulfillment/order/batch/abandon
   * @response `200` `CommonRespOrderBatchAuthResp` OK
   */
  omsFulfillmentOrderBatchAbandon = (req: OrderBatchToAbondReq, params: RequestParams = {}) =>
    this.request<CommonRespOrderBatchAuthResp, any>({
      path: `/api/oms/fulfillment/order/batch/abandon`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 自规划订单管理
   * @name OmsFulfillmentOrderBatchChangeSku
   * @summary 批量换货
   * @request POST:/api/oms/fulfillment/order/batchChangeSku
   * @response `200` `CommonRespOrderBatchAuthResp` OK
   */
  omsFulfillmentOrderBatchChangeSku = (
    req: FulfillmentOrderBatchChangeSkuReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespOrderBatchAuthResp, any>({
      path: `/api/oms/fulfillment/order/batchChangeSku`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 自规划订单管理
   * @name OmsFulfillmentOrderBatchFreeze
   * @summary 批量禁止处理
   * @request POST:/api/oms/fulfillment/order/batchFreeze
   * @response `200` `CommonRespOrderBatchAuthResp` OK
   */
  omsFulfillmentOrderBatchFreeze = (req: OrderBatchFreezeReq, params: RequestParams = {}) =>
    this.request<CommonRespOrderBatchAuthResp, any>({
      path: `/api/oms/fulfillment/order/batchFreeze`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 自规划订单管理
   * @name OmsFulfillmentOrderBatchSubOrder
   * @summary 批量手动拆单
   * @request POST:/api/oms/fulfillment/order/batchSubOrder
   * @response `200` `CommonRespOrderBatchAuthResp` OK
   */
  omsFulfillmentOrderBatchSubOrder = (req: OrderBatchSubReq, params: RequestParams = {}) =>
    this.request<CommonRespOrderBatchAuthResp, any>({
      path: `/api/oms/fulfillment/order/batchSubOrder`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 自规划订单管理
   * @name OmsFulfillmentOrderBatchTransferFbaV2
   * @summary 批量手动转FBA-V2
   * @request POST:/api/oms/fulfillment/order/batchTransferFbaV2
   * @response `200` `CommonRespOrderBatchAuthResp` OK
   */
  omsFulfillmentOrderBatchTransferFbaV2 = (
    req: OrderTransferFbaBatchV2Req,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespOrderBatchAuthResp, any>({
      path: `/api/oms/fulfillment/order/batchTransferFbaV2`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 自规划订单管理
   * @name OmsFulfillmentOrderBatchTransferSelf
   * @summary 批量转自配送
   * @request POST:/api/oms/fulfillment/order/batchTransferSelf
   * @response `200` `CommonRespOrderBatchAuthResp` OK
   */
  omsFulfillmentOrderBatchTransferSelf = (
    req: OrderBatchTransferSelfReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespOrderBatchAuthResp, any>({
      path: `/api/oms/fulfillment/order/batchTransferSelf`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 自规划订单管理
   * @name OmsFulfillmentOrderBatchUnFreeze
   * @summary 批量禁止解禁处理
   * @request POST:/api/oms/fulfillment/order/batchUnFreeze
   * @response `200` `CommonRespObject` OK
   */
  omsFulfillmentOrderBatchUnFreeze = (req: OrderBatchFreezeReq, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/oms/fulfillment/order/batchUnFreeze`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 自规划订单管理
   * @name OmsFulfillmentOrderCancelOutbound
   * @summary 取消出库（截单）
   * @request POST:/api/oms/fulfillment/order/cancelOutbound
   * @response `200` `CommonRespOrderBatchCommonResp` OK
   */
  omsFulfillmentOrderCancelOutbound = (req: OrderBatchCommonReq, params: RequestParams = {}) =>
    this.request<CommonRespOrderBatchCommonResp, any>({
      path: `/api/oms/fulfillment/order/cancelOutbound`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 自规划订单管理
   * @name OmsFulfillmentOrderCancelReverse
   * @summary 取消预占
   * @request POST:/api/oms/fulfillment/order/cancelReverse
   * @response `200` `CommonRespOrderBatchCommonResp` OK
   */
  omsFulfillmentOrderCancelReverse = (req: OrderBatchCommonReq, params: RequestParams = {}) =>
    this.request<CommonRespOrderBatchCommonResp, any>({
      path: `/api/oms/fulfillment/order/cancelReverse`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 自规划订单管理
   * @name OmsFulfillmentOrderDelLabel
   * @summary 移除标签
   * @request POST:/api/oms/fulfillment/order/delLabel
   * @response `200` `CommonRespObject` OK
   */
  omsFulfillmentOrderDelLabel = (req: OrdeAddOrDelTabelReq, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/oms/fulfillment/order/delLabel`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 自规划订单管理
   * @name OmsFulfillmentOrderExecuteOrderRule
   * @summary 测试执行指定规则
   * @request GET:/api/oms/fulfillment/order/executeOrderRule
   * @response `200` `CommonRespBoolean` OK
   */
  omsFulfillmentOrderExecuteOrderRule = (
    query: {
      /** code */
      code: string;
      /** sceneCode */
      sceneCode: string;
      /** shop */
      shop: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespBoolean, any>({
      path: `/api/oms/fulfillment/order/executeOrderRule`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 自规划订单管理
   * @name OmsFulfillmentOrderExecuteOrderRuleAndNo
   * @summary 测试执行指定规则号
   * @request GET:/api/oms/fulfillment/order/executeOrderRuleAndNo
   * @response `200` `CommonRespBoolean` OK
   */
  omsFulfillmentOrderExecuteOrderRuleAndNo = (
    query: {
      /** code */
      code: string;
      /** ruleNo */
      ruleNo: string;
      /** sceneCode */
      sceneCode: string;
      /** shop */
      shop: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespBoolean, any>({
      path: `/api/oms/fulfillment/order/executeOrderRuleAndNo`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 自规划订单管理
   * @name OmsFulfillmentOrderExecuteOrderRuleFrom
   * @summary 测试从指定规则执行
   * @request GET:/api/oms/fulfillment/order/executeOrderRuleFrom
   * @response `200` `CommonRespBoolean` OK
   */
  omsFulfillmentOrderExecuteOrderRuleFrom = (
    query: {
      /** code */
      code: string;
      /** sceneCode */
      sceneCode: string;
      /** shop */
      shop: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespBoolean, any>({
      path: `/api/oms/fulfillment/order/executeOrderRuleFrom`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 自规划订单管理
   * @name OmsFulfillmentOrderExecuteOrderRuleFromAndNo
   * @summary 测试执行指定规则号
   * @request GET:/api/oms/fulfillment/order/executeOrderRuleFromAndNo
   * @response `200` `CommonRespBoolean` OK
   */
  omsFulfillmentOrderExecuteOrderRuleFromAndNo = (
    query: {
      /** code */
      code: string;
      /** ruleNo */
      ruleNo: string;
      /** sceneCode */
      sceneCode: string;
      /** shop */
      shop: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespBoolean, any>({
      path: `/api/oms/fulfillment/order/executeOrderRuleFromAndNo`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 自规划订单管理
   * @name OmsFulfillmentOrderExecuteOrderSplitAfterOrder
   * @summary 测试一品多供后拆单
   * @request GET:/api/oms/fulfillment/order/executeOrderSplitAfterOrder
   * @response `200` `CommonRespBoolean` OK
   */
  omsFulfillmentOrderExecuteOrderSplitAfterOrder = (
    query: {
      /** code */
      code: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespBoolean, any>({
      path: `/api/oms/fulfillment/order/executeOrderSplitAfterOrder`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 自规划订单管理
   * @name OmsFulfillmentOrderExportErrSaleSku
   * @summary 导出MSKU未匹配数据
   * @request POST:/api/oms/fulfillment/order/exportErrSaleSku
   * @response `200` `CommonExportResp` OK
   */
  omsFulfillmentOrderExportErrSaleSku = (req: CommonPageReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/oms/fulfillment/order/exportErrSaleSku`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 自规划订单管理
   * @name OmsFulfillmentOrderExportErrThirdSku
   * @summary 导出三方仓SKU未配对数据
   * @request POST:/api/oms/fulfillment/order/exportErrThirdSku
   * @response `200` `CommonExportResp` OK
   */
  omsFulfillmentOrderExportErrThirdSku = (req: CommonPageReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/oms/fulfillment/order/exportErrThirdSku`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 自规划订单管理
   * @name OmsFulfillmentOrderFreeze
   * @summary 禁止处理
   * @request POST:/api/oms/fulfillment/order/freeze
   * @response `200` `CommonRespObject` OK
   */
  omsFulfillmentOrderFreeze = (req: OrderFreezeReq, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/oms/fulfillment/order/freeze`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 自规划订单管理
   * @name OmsFulfillmentOrderInitRule
   * @summary 初始化规则
   * @request GET:/api/oms/fulfillment/order/initRule
   * @response `200` `CommonRespBoolean` OK
   */
  omsFulfillmentOrderInitRule = (
    query: {
      /** module */
      module: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespBoolean, any>({
      path: `/api/oms/fulfillment/order/initRule`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 自规划订单管理
   * @name OmsFulfillmentOrderMarkShipped
   * @summary 标记发货
   * @request POST:/api/oms/fulfillment/order/markShipped
   * @response `200` `CommonRespOrderBatchCommonResp` OK
   */
  omsFulfillmentOrderMarkShipped = (req: OrderBatchCommonReq, params: RequestParams = {}) =>
    this.request<CommonRespOrderBatchCommonResp, any>({
      path: `/api/oms/fulfillment/order/markShipped`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 自规划订单管理
   * @name OmsFulfillmentOrderPush
   * @summary 推送自规划订单（重新执行订单规则）
   * @request POST:/api/oms/fulfillment/order/push
   * @response `200` `CommonRespOrderBatchCommonResp` OK
   */
  omsFulfillmentOrderPush = (req: OrderBatchCommonReq, params: RequestParams = {}) =>
    this.request<CommonRespOrderBatchCommonResp, any>({
      path: `/api/oms/fulfillment/order/push`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 自规划订单管理
   * @name OmsFulfillmentOrderQueryChangeSkuList
   * @summary 批量换货查询
   * @request POST:/api/oms/fulfillment/order/queryChangeSkuList
   * @response `200` `FulfillmentOrderBatchChangeSkuResp` OK
   */
  omsFulfillmentOrderQueryChangeSkuList = (req: OrderBatchCommonReq, params: RequestParams = {}) =>
    this.request<FulfillmentOrderBatchChangeSkuResp, any>({
      path: `/api/oms/fulfillment/order/queryChangeSkuList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 自规划订单管理
   * @name OmsFulfillmentOrderQueryShopList
   * @summary 查询亚马逊店铺仓库列表
   * @request GET:/api/oms/fulfillment/order/queryShopList
   * @response `200` `CommonRespShopWarehousePageResp` OK
   */
  omsFulfillmentOrderQueryShopList = (
    query: {
      channel?: string;
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
       */
      pageSize: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespShopWarehousePageResp, any>({
      path: `/api/oms/fulfillment/order/queryShopList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 自规划订单管理
   * @name OmsFulfillmentOrderReOrderLogistics
   * @summary 重新物流下单
   * @request POST:/api/oms/fulfillment/order/reOrderLogistics
   * @response `200` `CommonRespVoid` OK
   */
  omsFulfillmentOrderReOrderLogistics = (req: LogisticsOrderPushReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/oms/fulfillment/order/reOrderLogistics`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 自规划订单管理
   * @name OmsFulfillmentOrderReplenishProductInfo
   * @summary 查询产品信息
   * @request POST:/api/oms/fulfillment/order/replenish/product/info
   * @response `200` `(ReplenishProductInfoResp)[]` OK
   */
  omsFulfillmentOrderReplenishProductInfo = (
    req: ReplenishProductReq,
    params: RequestParams = {},
  ) =>
    this.request<ReplenishProductInfoResp[], any>({
      path: `/api/oms/fulfillment/order/replenish/product/info`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 自规划订单管理
   * @name OmsFulfillmentOrderReplenishSave
   * @summary 新增补单发货
   * @request POST:/api/oms/fulfillment/order/replenish/save
   * @response `200` `CommonRespVoid` OK
   */
  omsFulfillmentOrderReplenishSave = (saveReq: ReplenishOrderSaveReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/oms/fulfillment/order/replenish/save`,
      method: 'POST',
      body: saveReq,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 自规划订单管理
   * @name OmsFulfillmentOrderSubOrder
   * @summary 单个手动拆单
   * @request POST:/api/oms/fulfillment/order/subOrder
   * @response `200` `CommonRespObject` OK
   */
  omsFulfillmentOrderSubOrder = (req: OrderSubReq, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/oms/fulfillment/order/subOrder`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 自规划订单管理
   * @name OmsFulfillmentOrderSubmitOutbound
   * @summary 提交出库（提交发货）
   * @request POST:/api/oms/fulfillment/order/submitOutbound
   * @response `200` `CommonRespOrderBatchCommonResp` OK
   */
  omsFulfillmentOrderSubmitOutbound = (req: OrderBatchCommonReq, params: RequestParams = {}) =>
    this.request<CommonRespOrderBatchCommonResp, any>({
      path: `/api/oms/fulfillment/order/submitOutbound`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 自规划订单管理
   * @name OmsFulfillmentOrderTransferFba
   * @summary 单个手动转FBA
   * @request POST:/api/oms/fulfillment/order/transferFba
   * @response `200` `CommonRespObject` OK
   */
  omsFulfillmentOrderTransferFba = (req: OrderTransferFbaReq, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/oms/fulfillment/order/transferFba`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 自规划订单管理
   * @name OmsFulfillmentOrderTransferSelf
   * @summary 转自配送
   * @request POST:/api/oms/fulfillment/order/transferSelf
   * @response `200` `CommonRespObject` OK
   */
  omsFulfillmentOrderTransferSelf = (req: OrderTransferSelfReq, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/oms/fulfillment/order/transferSelf`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 自规划订单管理
   * @name OmsFulfillmentOrderUnFreeze
   * @summary 禁止解禁处理
   * @request POST:/api/oms/fulfillment/order/unFreeze
   * @response `200` `CommonRespObject` OK
   */
  omsFulfillmentOrderUnFreeze = (req: OrderFreezeReq, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/oms/fulfillment/order/unFreeze`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 自规划订单管理
   * @name OmsFulfillmentOrderUpdateCustomRemark
   * @summary 修改客服备注
   * @request POST:/api/oms/fulfillment/order/updateCustomRemark
   * @response `200` `CommonResp` OK
   */
  omsFulfillmentOrderUpdateCustomRemark = (req: OrderRemarkReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/oms/fulfillment/order/updateCustomRemark`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 自规划订单管理
   * @name OmsFulfillmentOrderUpdateLabel
   * @summary 更新标签
   * @request POST:/api/oms/fulfillment/order/updateLabel
   * @response `200` `CommonRespObject` OK
   */
  omsFulfillmentOrderUpdateLabel = (req: OrderUpdateTabelReq, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/oms/fulfillment/order/updateLabel`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 自规划订单管理
   * @name OmsFulfillmentOrderUpdateMarkShipped
   * @summary 更新标发
   * @request POST:/api/oms/fulfillment/order/updateMarkShipped
   * @response `200` `CommonRespOrderBatchCommonResp` OK
   */
  omsFulfillmentOrderUpdateMarkShipped = (req: OrderBatchCommonReq, params: RequestParams = {}) =>
    this.request<CommonRespOrderBatchCommonResp, any>({
      path: `/api/oms/fulfillment/order/updateMarkShipped`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 自规划订单管理
   * @name OmsFulfillmentOrderUpdateWarehouseLogistics
   * @summary 批量设置仓库物流
   * @request POST:/api/oms/fulfillment/order/updateWarehouseLogistics
   * @response `200` `CommonRespVoid` OK
   */
  omsFulfillmentOrderUpdateWarehouseLogistics = (
    req: OrderWarehouseLogisticsUpdateReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/oms/fulfillment/order/updateWarehouseLogistics`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 自规划订单管理
   * @name OmsFulfillmentOrderUploadAttachment
   * @summary 附件上传
   * @request POST:/api/oms/fulfillment/order/uploadAttachment
   * @response `200` `CommonRespVoid` OK
   */
  omsFulfillmentOrderUploadAttachment = (
    req: OrderUploadAttachmentReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/oms/fulfillment/order/uploadAttachment`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 自规划订单管理
   * @name OmsFulfillmentOrderUploadTrackingNo
   * @summary 上传跟踪号
   * @request POST:/api/oms/fulfillment/order/uploadTrackingNo
   * @response `200` `CommonRespVoid` OK
   */
  omsFulfillmentOrderUploadTrackingNo = (
    req: FulfillmentOrderUploadTrackingNoReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/oms/fulfillment/order/uploadTrackingNo`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 其他入库管理
   * @name OmsInboundOrderCancel
   * @summary 作废
   * @request GET:/api/oms/inbound/order/cancel
   * @response `200` `CommonRespString` OK
   */
  omsInboundOrderCancel = (
    query: {
      /**
       * 其他入库id
       * @format int64
       */
      id: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespString, any>({
      path: `/api/oms/inbound/order/cancel`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 其他入库管理
   * @name OmsInboundOrderQueryDetail
   * @summary 查询详情
   * @request GET:/api/oms/inbound/order/queryDetail
   * @response `200` `CommonRespOtherInboundOrderDetailReq` OK
   */
  omsInboundOrderQueryDetail = (
    query: {
      /**
       * 其他入库id
       * @format int64
       */
      id: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespOtherInboundOrderDetailReq, any>({
      path: `/api/oms/inbound/order/queryDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 其他入库管理
   * @name OmsInboundOrderQueryList
   * @summary 查询列表
   * @request POST:/api/oms/inbound/order/queryList
   * @response `200` `OtherInboundOrderListResp` OK
   */
  omsInboundOrderQueryList = (req: OtherInboundOrderListReq, params: RequestParams = {}) =>
    this.request<OtherInboundOrderListResp, any>({
      path: `/api/oms/inbound/order/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 其他入库管理
   * @name OmsInboundOrderSubmit
   * @summary 提交
   * @request POST:/api/oms/inbound/order/submit
   * @response `200` `CommonRespString` OK
   */
  omsInboundOrderSubmit = (req: OtherInboundOrderAddReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/oms/inbound/order/submit`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存分配单
   * @name OmsInventoryAllotQueryDetail
   * @summary 查询详情
   * @request GET:/api/oms/inventory/allot/queryDetail
   * @response `200` `CommonRespInventoryAllotItemResp` OK
   */
  omsInventoryAllotQueryDetail = (
    query: {
      /** 库存分配单号 */
      allotCoe: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespInventoryAllotItemResp, any>({
      path: `/api/oms/inventory/allot/queryDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存分配单
   * @name OmsInventoryAllotQueryList
   * @summary 查询列表
   * @request POST:/api/oms/inventory/allot/queryList
   * @response `200` `InventoryAllotListResp` OK
   */
  omsInventoryAllotQueryList = (req: InventoryAllotListReq, params: RequestParams = {}) =>
    this.request<InventoryAllotListResp, any>({
      path: `/api/oms/inventory/allot/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存分配单
   * @name OmsInventoryAllotSubmit
   * @summary 提交
   * @request POST:/api/oms/inventory/allot/submit
   * @response `200` `CommonRespString` OK
   */
  omsInventoryAllotSubmit = (req: InventoryAllotAddReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/oms/inventory/allot/submit`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags B2B订单全链路监控日志接口
   * @name OmsMonitorB2BQueryList
   * @summary B2B订单全链路监控列表查询
   * @request POST:/api/oms/monitor/b2b/queryList
   * @response `200` `MonitorB2BOutboundQueryListResp` OK
   */
  omsMonitorB2BQueryList = (req: MonitorB2BOutboundQueryListReq, params: RequestParams = {}) =>
    this.request<MonitorB2BOutboundQueryListResp, any>({
      path: `/api/oms/monitor/b2b/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 积加CIS库存监控日志接口
   * @name OmsMonitorCisQueryList
   * @summary 积加CIS库存监控列表查询
   * @request POST:/api/oms/monitor/cis/queryList
   * @response `200` `MonitorCisStorageQueryListResp` OK
   */
  omsMonitorCisQueryList = (req: MonitorCisStorageQueryListReq, params: RequestParams = {}) =>
    this.request<MonitorCisStorageQueryListResp, any>({
      path: `/api/oms/monitor/cis/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 积加销售单全链路监控日志接口
   * @name OmsMonitorSalesQueryList
   * @summary 积加销售单全链路监控列表查询
   * @request POST:/api/oms/monitor/sales/queryList
   * @response `200` `MonitorSalesQueryListResp` OK
   */
  omsMonitorSalesQueryList = (req: MonitorSalesQueryListReq, params: RequestParams = {}) =>
    this.request<MonitorSalesQueryListResp, any>({
      path: `/api/oms/monitor/sales/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 积家调拨单全链路监控日志接口
   * @name OmsMonitorTransferQueryList
   * @summary 积家调拨单全链路监控列表查询
   * @request POST:/api/oms/monitor/transfer/queryList
   * @response `200` `MonitorTransferQueryListResp` OK
   */
  omsMonitorTransferQueryList = (req: MonitorTransferQueryListReq, params: RequestParams = {}) =>
    this.request<MonitorTransferQueryListResp, any>({
      path: `/api/oms/monitor/transfer/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name OmsOrderAbandon
   * @summary 作废
   * @request POST:/api/oms/order/abandon
   * @response `200` `CommonRespVoid` OK
   */
  omsOrderAbandon = (
    query: {
      /** erpCode */
      erpCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/oms/order/abandon`,
      method: 'POST',
      query: query,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name OmsOrderAddDownTemplate
   * @summary 下载批量新增模板
   * @request POST:/api/oms/order/add/downTemplate
   * @response `200` `CommonRespString` OK
   */
  omsOrderAddDownTemplate = (params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/oms/order/add/downTemplate`,
      method: 'POST',
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name OmsOrderAddUpload
   * @summary 上传批量新增
   * @request POST:/api/oms/order/add/upload
   * @response `200` `CommonResp` OK
   */
  omsOrderAddUpload = (req: UploadReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/oms/order/add/upload`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name OmsOrderAddUploads
   * @summary 上传批量新增,多个附件支持
   * @request POST:/api/oms/order/add/uploads
   * @response `200` `CommonResp` OK
   */
  omsOrderAddUploads = (reqs: UploadReq[], params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/oms/order/add/uploads`,
      method: 'POST',
      body: reqs,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name OmsOrderAuthAndUpdate
   * @summary 审核
   * @request POST:/api/oms/order/authAndUpdate
   * @response `200` `CommonResp` OK
   */
  omsOrderAuthAndUpdate = (req: OrderAuthSaveReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/oms/order/authAndUpdate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name OmsOrderBatchAbandon
   * @summary 批量作废
   * @request POST:/api/oms/order/batch/abandon
   * @response `200` `CommonRespOrderBatchAuthResp` OK
   */
  omsOrderBatchAbandon = (req: OrderBatchToAbondReq, params: RequestParams = {}) =>
    this.request<CommonRespOrderBatchAuthResp, any>({
      path: `/api/oms/order/batch/abandon`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name OmsOrderBatchChangeSkuList
   * @summary 批量换货查询
   * @request POST:/api/oms/order/batch/changeSkuList
   * @response `200` `OrderChangeSkuBatchToAuditResp` OK
   */
  omsOrderBatchChangeSkuList = (req: OrderBatchToAuditReq, params: RequestParams = {}) =>
    this.request<OrderChangeSkuBatchToAuditResp, any>({
      path: `/api/oms/order/batch/changeSkuList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name OmsOrderBatchChangeSkuListToAudit
   * @summary 批量换货
   * @request POST:/api/oms/order/batch/changeSkuListToAudit
   * @response `200` `CommonRespOrderBatchAuthResp` OK
   */
  omsOrderBatchChangeSkuListToAudit = (
    req: OrderChangeSkuBatchToAuditResp,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespOrderBatchAuthResp, any>({
      path: `/api/oms/order/batch/changeSkuListToAudit`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name OmsOrderBatchConfirmSend
   * @summary 批量确认发货
   * @request POST:/api/oms/order/batch/confirm/send
   * @response `200` `CommonRespOrderBatchAuthResp` OK
   */
  omsOrderBatchConfirmSend = (
    orderBatchConfirmSendReq: OrderBatchConfirmSendReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespOrderBatchAuthResp, any>({
      path: `/api/oms/order/batch/confirm/send`,
      method: 'POST',
      body: orderBatchConfirmSendReq,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name OmsOrderBatchSendNotice
   * @summary 发货通知
   * @request POST:/api/oms/order/batch/sendNotice
   * @response `200` `CommonRespOrderBatchSendNoticeResp` OK
   */
  omsOrderBatchSendNotice = (req: OrderBatchSendNoticeReq, params: RequestParams = {}) =>
    this.request<CommonRespOrderBatchSendNoticeResp, any>({
      path: `/api/oms/order/batch/sendNotice`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name OmsOrderBatchToAudit
   * @summary 批量转待审核
   * @request POST:/api/oms/order/batch/toAudit
   * @response `200` `CommonRespOrderBatchAuthResp` OK
   */
  omsOrderBatchToAudit = (req: OrderBatchToAuditReq, params: RequestParams = {}) =>
    this.request<CommonRespOrderBatchAuthResp, any>({
      path: `/api/oms/order/batch/toAudit`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name OmsOrderBatchToWaitSend
   * @summary 批量转待发货
   * @request POST:/api/oms/order/batch/toWaitSend
   * @response `200` `CommonRespOrderBatchToWaitSendResp` OK
   */
  omsOrderBatchToWaitSend = (req: OrderBatchToWaitSendReq, params: RequestParams = {}) =>
    this.request<CommonRespOrderBatchToWaitSendResp, any>({
      path: `/api/oms/order/batch/toWaitSend`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name OmsOrderBatchUpdate
   * @summary 批量审核
   * @request POST:/api/oms/order/batch/update
   * @response `200` `CommonRespOrderBatchAuthResp` OK
   */
  omsOrderBatchUpdate = (orderBatchAuthReq: OrderBatchAuthReq, params: RequestParams = {}) =>
    this.request<CommonRespOrderBatchAuthResp, any>({
      path: `/api/oms/order/batch/update`,
      method: 'POST',
      body: orderBatchAuthReq,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 输入订单号列表，批量打包导出订单附件
   *
   * @tags ERP订单
   * @name OmsOrderBatchDownloadAttachment
   * @summary 批量下载订单附件
   * @request POST:/api/oms/order/batchDownloadAttachment
   * @response `200` `CommonExportResp` OK
   */
  omsOrderBatchDownloadAttachment = (
    req: DownloadOrderAttachmentUrlReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/oms/order/batchDownloadAttachment`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name OmsOrderBatchToFba
   * @summary 批量转FBA
   * @request POST:/api/oms/order/batchToFba
   * @response `200` `CommonRespVoid` OK
   */
  omsOrderBatchToFba = (req: OrderBatchToFbaReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/oms/order/batchToFba`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name OmsOrderBindingOrderWarehouseAndShipReq
   * @summary 绑定发货仓库配送方式
   * @request POST:/api/oms/order/bindingOrderWarehouseAndShipReq
   * @response `200` `CommonRespVoid` OK
   */
  omsOrderBindingOrderWarehouseAndShipReq = (
    req: OrderBindingWarehouseAndShipReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/oms/order/bindingOrderWarehouseAndShipReq`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name OmsOrderCancelOutbound
   * @summary 取消出库
   * @request POST:/api/oms/order/cancelOutbound
   * @response `200` `CommonRespOrderBatchCommonResp` OK
   */
  omsOrderCancelOutbound = (req: OrderBatchCommonReq, params: RequestParams = {}) =>
    this.request<CommonRespOrderBatchCommonResp, any>({
      path: `/api/oms/order/cancelOutbound`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name OmsOrderCancelReverse
   * @summary 取消预占
   * @request POST:/api/oms/order/cancelReverse
   * @response `200` `CommonRespOrderBatchCommonResp` OK
   */
  omsOrderCancelReverse = (req: OrderBatchCommonReq, params: RequestParams = {}) =>
    this.request<CommonRespOrderBatchCommonResp, any>({
      path: `/api/oms/order/cancelReverse`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name OmsOrderChangeSku
   * @summary 换货
   * @request POST:/api/oms/order/changeSku
   * @response `200` `CommonRespVoid` OK
   */
  omsOrderChangeSku = (req: OrderChangeSkuReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/oms/order/changeSku`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name OmsOrderChangeWarehouseParamStaus
   * @summary 绑定发货仓库状态变更
   * @request POST:/api/oms/order/changeWarehouseParamStaus
   * @response `200` `CommonRespVoid` OK
   */
  omsOrderChangeWarehouseParamStaus = (
    req: ErpOrderWpUpdateStatusReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/oms/order/changeWarehouseParamStaus`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name OmsOrderCreditLimitLockRetry
   * @summary 订单信用额度预占重试
   * @request POST:/api/oms/order/creditLimitLockRetry
   * @response `200` `CommonRespOrderBatchCommonResp` OK
   */
  omsOrderCreditLimitLockRetry = (req: CreditLimitLockRetryReq, params: RequestParams = {}) =>
    this.request<CommonRespOrderBatchCommonResp, any>({
      path: `/api/oms/order/creditLimitLockRetry`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name OmsOrderDeleteAtt
   * @summary 删除附件
   * @request GET:/api/oms/order/delete/att
   * @response `200` `CommonResp` OK
   */
  omsOrderDeleteAtt = (
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
      path: `/api/oms/order/delete/att`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name OmsOrderDownUpdateAddressTemplate
   * @summary 下载批量修改地址模板
   * @request POST:/api/oms/order/downUpdateAddressTemplate
   * @response `200` `CommonRespString` OK
   */
  omsOrderDownUpdateAddressTemplate = (
    req: SampleOrderV3ListQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespString, any>({
      path: `/api/oms/order/downUpdateAddressTemplate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name OmsOrderDownUpdateAuthTemplate
   * @summary 下载编辑审核模板
   * @request POST:/api/oms/order/downUpdateAuthTemplate
   * @response `200` `CommonRespString` OK
   */
  omsOrderDownUpdateAuthTemplate = (req: SampleOrderV3ListQueryReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/oms/order/downUpdateAuthTemplate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name OmsOrderFbaRetry
   * @summary 异常重推fba
   * @request POST:/api/oms/order/fba/retry
   * @response `200` `CommonResp` OK
   */
  omsOrderFbaRetry = (
    query: {
      /** orderCode */
      orderCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonResp, any>({
      path: `/api/oms/order/fba/retry`,
      method: 'POST',
      query: query,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name OmsOrderFreightRuleHit
   * @summary 运费规则命中
   * @request POST:/api/oms/order/freightRuleHit
   * @response `200` `CommonRespErpFlowDetailQueryResp` OK
   */
  omsOrderFreightRuleHit = (req: ErpOrderFreightRuleBean[], params: RequestParams = {}) =>
    this.request<CommonRespErpFlowDetailQueryResp, any>({
      path: `/api/oms/order/freightRuleHit`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name OmsOrderMarkShipped
   * @summary 标记发货
   * @request POST:/api/oms/order/markShipped
   * @response `200` `CommonRespOrderBatchCommonResp` OK
   */
  omsOrderMarkShipped = (req: OrderBatchCommonReq, params: RequestParams = {}) =>
    this.request<CommonRespOrderBatchCommonResp, any>({
      path: `/api/oms/order/markShipped`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name OmsOrderModifyWarehouseLogistics
   * @summary 批量设置仓库物流
   * @request POST:/api/oms/order/modifyWarehouseLogistics
   * @response `200` `OrderBatchCommonResp` OK
   */
  omsOrderModifyWarehouseLogistics = (
    req: ModifyWarehouseLogisticsReq,
    params: RequestParams = {},
  ) =>
    this.request<OrderBatchCommonResp, any>({
      path: `/api/oms/order/modifyWarehouseLogistics`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name OmsOrderOrderAttachUpload
   * @summary 批量上传订单附件
   * @request POST:/api/oms/order/order/attach/upload
   * @response `200` `CommonResp` OK
   */
  omsOrderOrderAttachUpload = (req: OrderUpdateUploadReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/oms/order/order/attach/upload`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name OmsOrderOrderDownload
   * @summary 导出订单
   * @request POST:/api/oms/order/order/download
   * @response `200` `CommonExportResp` OK
   */
  omsOrderOrderDownload = (req: SampleOrderV3ListQueryReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/oms/order/order/download`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name OmsOrderPreCheckInventory
   * @summary 预校验库存
   * @request POST:/api/oms/order/preCheckInventory
   * @response `200` `CommonRespErpOrderPreCheckInventoryResp` OK
   */
  omsOrderPreCheckInventory = (req: ErpOrderPreCheckInventoryReq, params: RequestParams = {}) =>
    this.request<CommonRespErpOrderPreCheckInventoryResp, any>({
      path: `/api/oms/order/preCheckInventory`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name OmsOrderPreCheckStock
   * @summary 批量下单到物流-预校验库存
   * @request POST:/api/oms/order/preCheckStock
   * @response `200` `CommonRespOrderPreCheckStockResp` OK
   */
  omsOrderPreCheckStock = (req: OrderPreCheckStockReq, params: RequestParams = {}) =>
    this.request<CommonRespOrderPreCheckStockResp, any>({
      path: `/api/oms/order/preCheckStock`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name OmsOrderQueryAllShipping
   * @summary 获取所有配送方式
   * @request GET:/api/oms/order/queryAllShipping
   * @response `200` `CommonRespListErpDictBean` OK
   */
  omsOrderQueryAllShipping = (
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
      path: `/api/oms/order/queryAllShipping`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name OmsOrderQueryAllWarehouse
   * @summary 获取所有发货仓库
   * @request GET:/api/oms/order/queryAllWarehouse
   * @response `200` `CommonRespListErpDictBean` OK
   */
  omsOrderQueryAllWarehouse = (
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
      path: `/api/oms/order/queryAllWarehouse`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name OmsOrderQueryBatchFba
   * @summary 查询批量转FBA详情
   * @request POST:/api/oms/order/queryBatchFba
   * @response `200` `OrderBatchFbaDetailResp` OK
   */
  omsOrderQueryBatchFba = (req: QueryOrderBatchToFbaReq, params: RequestParams = {}) =>
    this.request<OrderBatchFbaDetailResp, any>({
      path: `/api/oms/order/queryBatchFba`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name OmsOrderQueryDetail
   * @summary 查询详情
   * @request GET:/api/oms/order/queryDetail
   * @response `200` `OrderDetailResp` OK
   */
  omsOrderQueryDetail = (
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
      path: `/api/oms/order/queryDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name OmsOrderQueryList
   * @summary 查询列表
   * @request POST:/api/oms/order/queryList
   * @response `200` `OrderListQueryResp` OK
   */
  omsOrderQueryList = (req: SampleOrderV3ListQueryReq, params: RequestParams = {}) =>
    this.request<OrderListQueryResp, any>({
      path: `/api/oms/order/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name OmsOrderQueryListCount
   * @summary 查询列表统计
   * @request POST:/api/oms/order/queryListCount
   * @response `200` `OrderListQueryResp` OK
   */
  omsOrderQueryListCount = (req: SampleOrderV3ListQueryReq, params: RequestParams = {}) =>
    this.request<OrderListQueryResp, any>({
      path: `/api/oms/order/queryListCount`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name OmsOrderQueryOfflineParam
   * @summary TS-Offlinechannel订单仓库物流查询
   * @request GET:/api/oms/order/queryOfflineParam
   * @response `200` `CommonRespWarehouseShipResp` OK
   */
  omsOrderQueryOfflineParam = (params: RequestParams = {}) =>
    this.request<CommonRespWarehouseShipResp, any>({
      path: `/api/oms/order/queryOfflineParam`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name OmsOrderQueryStockAvailable
   * @summary 查询库存可用量
   * @request POST:/api/oms/order/queryStockAvailable
   * @response `200` `CommonRespOrderQueryStockAvailableResp` OK
   */
  omsOrderQueryStockAvailable = (req: OrderQueryStockAvailableReq, params: RequestParams = {}) =>
    this.request<CommonRespOrderQueryStockAvailableResp, any>({
      path: `/api/oms/order/queryStockAvailable`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 为节省资源，对草稿/作废/待发货/已发货不做查询
   *
   * @tags ERP订单
   * @name OmsOrderQueryStockList
   * @summary 查询单据库存是否满足
   * @request POST:/api/oms/order/queryStockList
   * @response `200` `CommonRespListErpOrderStockQueryResp` OK
   */
  omsOrderQueryStockList = (erpCodeList: string[], params: RequestParams = {}) =>
    this.request<CommonRespListErpOrderStockQueryResp, any>({
      path: `/api/oms/order/queryStockList`,
      method: 'POST',
      body: erpCodeList,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name OmsOrderQueryWarehouseLogistics
   * @summary 查询订单仓库物流
   * @request POST:/api/oms/order/queryWarehouseLogistics
   * @response `200` `(WarehouseDeliveryMapResp)[]` OK
   */
  omsOrderQueryWarehouseLogistics = (req: QueryWarehouseLogisticsReq, params: RequestParams = {}) =>
    this.request<WarehouseDeliveryMapResp[], any>({
      path: `/api/oms/order/queryWarehouseLogistics`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name OmsOrderQueryWarehouseParamList
   * @summary 查询绑定发货仓库列表
   * @request POST:/api/oms/order/queryWarehouseParamList
   * @response `200` `ErpOrderWpQueryListResp` OK
   */
  omsOrderQueryWarehouseParamList = (req: ErpOrderWpQueryListReq, params: RequestParams = {}) =>
    this.request<ErpOrderWpQueryListResp, any>({
      path: `/api/oms/order/queryWarehouseParamList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name OmsOrderRePush
   * @summary 重新发货
   * @request GET:/api/oms/order/rePush
   * @response `200` `CommonRespVoid` OK
   */
  omsOrderRePush = (params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/oms/order/rePush`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name OmsOrderRecordQueryB2BOutboundSyncList
   * @summary 查询B2B出库同步记录列表
   * @request POST:/api/oms/order/record/queryB2bOutboundSyncList
   * @response `200` `OrderB2BOutboundResp` OK
   */
  omsOrderRecordQueryB2BOutboundSyncList = (req: OrderB2BOutboundReq, params: RequestParams = {}) =>
    this.request<OrderB2BOutboundResp, any>({
      path: `/api/oms/order/record/queryB2bOutboundSyncList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name OmsOrderRecordQueryJjPickTaskSyncList
   * @summary 查询拣货任务同步记录列表
   * @request POST:/api/oms/order/record/queryJjPickTaskSyncList
   * @response `200` `OrderJjPickTaskResp` OK
   */
  omsOrderRecordQueryJjPickTaskSyncList = (req: OrderJjPickTaskReq, params: RequestParams = {}) =>
    this.request<OrderJjPickTaskResp, any>({
      path: `/api/oms/order/record/queryJjPickTaskSyncList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name OmsOrderRecordQuerySalesOutboundOrderList
   * @summary 查询销售出库单列表
   * @request POST:/api/oms/order/record/querySalesOutboundOrderList
   * @response `200` `OrderSalesOutboundResp` OK
   */
  omsOrderRecordQuerySalesOutboundOrderList = (
    req: OrderSalesOutboundReq,
    params: RequestParams = {},
  ) =>
    this.request<OrderSalesOutboundResp, any>({
      path: `/api/oms/order/record/querySalesOutboundOrderList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name OmsOrderReferenceParams
   * @summary 引用特殊参数
   * @request GET:/api/oms/order/reference/params
   * @response `200` `ErpOrderReferenceParamsResp` OK
   */
  omsOrderReferenceParams = (
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
      path: `/api/oms/order/reference/params`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name OmsOrderReferenceParamsBySkuCode
   * @summary 引用特殊参数-按skucode过滤
   * @request POST:/api/oms/order/reference/paramsBySkuCode
   * @response `200` `WarehouseDeliveryMapResp` OK
   */
  omsOrderReferenceParamsBySkuCode = (
    req: ReferenceParamsDeliveryReq,
    params: RequestParams = {},
  ) =>
    this.request<WarehouseDeliveryMapResp, any>({
      path: `/api/oms/order/reference/paramsBySkuCode`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name OmsOrderSave
   * @summary 新增
   * @request POST:/api/oms/order/save
   * @response `200` `CommonRespString` OK
   */
  omsOrderSave = (req: OrderSaveReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/oms/order/save`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name OmsOrderSaveDraft
   * @summary 新增草稿
   * @request POST:/api/oms/order/saveDraft
   * @response `200` `CommonRespString` OK
   */
  omsOrderSaveDraft = (req: OrderSaveReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/oms/order/saveDraft`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name OmsOrderSaveItemGift
   * @summary 添加赠品
   * @request POST:/api/oms/order/saveItemGift
   * @response `200` `CommonRespString` OK
   */
  omsOrderSaveItemGift = (req: OrderAddItemGiftReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/oms/order/saveItemGift`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name OmsOrderSaveRemark
   * @summary 编辑备注
   * @request POST:/api/oms/order/saveRemark
   * @response `200` `CommonRespString` OK
   */
  omsOrderSaveRemark = (req: OrderRemarkSaveReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/oms/order/saveRemark`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name OmsOrderSubOrder
   * @summary 拆单
   * @request POST:/api/oms/order/subOrder
   * @response `200` `CommonRespVoid` OK
   */
  omsOrderSubOrder = (req: OrderSubReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/oms/order/subOrder`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name OmsOrderSubmitOutbound
   * @summary 提交出库
   * @request POST:/api/oms/order/submitOutbound
   * @response `200` `CommonRespOrderBatchCommonResp` OK
   */
  omsOrderSubmitOutbound = (req: OrderBatchCommonReq, params: RequestParams = {}) =>
    this.request<CommonRespOrderBatchCommonResp, any>({
      path: `/api/oms/order/submitOutbound`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name OmsOrderUpdate
   * @summary 编辑
   * @request POST:/api/oms/order/update
   * @response `200` `CommonRespString` OK
   */
  omsOrderUpdate = (req: OrderSaveReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/oms/order/update`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name OmsOrderUpdateAddressUpload
   * @summary 上传修改订单地址
   * @request POST:/api/oms/order/update/address/upload
   * @response `200` `CommonResp` OK
   */
  omsOrderUpdateAddressUpload = (req: UploadReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/oms/order/update/address/upload`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name OmsOrderUpdateAuthBatch
   * @summary 批量编辑审核
   * @request POST:/api/oms/order/updateAuthBatch
   * @response `200` `CommonResp` OK
   */
  omsOrderUpdateAuthBatch = (req: OrderBatchUpdateAuthReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/oms/order/updateAuthBatch`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name OmsOrderUpdateCustomRemark
   * @summary 编辑客服备注
   * @request POST:/api/oms/order/updateCustomRemark
   * @response `200` `CommonResp` OK
   */
  omsOrderUpdateCustomRemark = (req: OrderRemarkReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/oms/order/updateCustomRemark`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name OmsOrderUpdateMskuMatchInfo
   * @summary 更新MSKU配对信息
   * @request POST:/api/oms/order/updateMskuMatchInfo
   * @response `200` `CommonRespOrderUpdateMskuResp` OK
   */
  omsOrderUpdateMskuMatchInfo = (req: UpdateMskuMatchInfoReq, params: RequestParams = {}) =>
    this.request<CommonRespOrderUpdateMskuResp, any>({
      path: `/api/oms/order/updateMskuMatchInfo`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name OmsOrderUpdateReceiveInfo
   * @summary 编辑收件人信息
   * @request POST:/api/oms/order/updateReceiveInfo
   * @response `200` `CommonRespString` OK
   */
  omsOrderUpdateReceiveInfo = (receiveInfo: OrderReceiveInfoSaveReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/oms/order/updateReceiveInfo`,
      method: 'POST',
      body: receiveInfo,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ERP订单
   * @name OmsOrderWarehouseRuleHit
   * @summary 分仓规则命中
   * @request POST:/api/oms/order/warehouseRuleHit
   * @response `200` `CommonRespListWarehouseRuleOutBean` OK
   */
  omsOrderWarehouseRuleHit = (req: ErpOrderWarehouseRuleBean, params: RequestParams = {}) =>
    this.request<CommonRespListWarehouseRuleOutBean, any>({
      path: `/api/oms/order/warehouseRuleHit`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 其他出库管理
   * @name OmsOutboundOrderCancel
   * @summary 作废
   * @request GET:/api/oms/outbound/order/cancel
   * @response `200` `CommonRespString` OK
   */
  omsOutboundOrderCancel = (
    query: {
      /**
       * 其他出库id
       * @format int64
       */
      id: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespString, any>({
      path: `/api/oms/outbound/order/cancel`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 其他出库管理
   * @name OmsOutboundOrderQueryDetail
   * @summary 查询详情
   * @request GET:/api/oms/outbound/order/queryDetail
   * @response `200` `CommonRespOtherOutboundOrderDetailReq` OK
   */
  omsOutboundOrderQueryDetail = (
    query: {
      /**
       * 其他出库id
       * @format int64
       */
      id: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespOtherOutboundOrderDetailReq, any>({
      path: `/api/oms/outbound/order/queryDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 其他出库管理
   * @name OmsOutboundOrderQueryList
   * @summary 查询列表
   * @request POST:/api/oms/outbound/order/queryList
   * @response `200` `OtherOutboundOrderListResp` OK
   */
  omsOutboundOrderQueryList = (req: OtherOutboundOrderListReq, params: RequestParams = {}) =>
    this.request<OtherOutboundOrderListResp, any>({
      path: `/api/oms/outbound/order/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 其他出库管理
   * @name OmsOutboundOrderSubmit
   * @summary 提交
   * @request POST:/api/oms/outbound/order/submit
   * @response `200` `CommonRespString` OK
   */
  omsOutboundOrderSubmit = (req: OtherOutboundOrderAddReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/oms/outbound/order/submit`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 采购退货换货单管理
   * @name OmsPurchaseReoConfirm
   * @summary 采购退货单换货单数据同步
   * @request POST:/api/oms/purchase/reo/confirm
   * @response `200` `CommonRespObject` OK
   */
  omsPurchaseReoConfirm = (param: WmsOutboundBackMessageBean, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/oms/purchase/reo/confirm`,
      method: 'POST',
      body: param,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 采购退货换货单管理
   * @name OmsPurchaseReoReSync
   * @summary 采购退货单换货单数据同步
   * @request GET:/api/oms/purchase/reo/reSync
   * @response `200` `CommonRespObject` OK
   */
  omsPurchaseReoReSync = (
    query: {
      /** code */
      code: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/oms/purchase/reo/reSync`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 采购退货换货单管理
   * @name OmsPurchaseReoSync
   * @summary 采购退货单换货单数据同步
   * @request POST:/api/oms/purchase/reo/sync
   * @response `200` `CommonRespObject` OK
   */
  omsPurchaseReoSync = (req: PurchaseReturnOrderReq, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/oms/purchase/reo/sync`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 采购管理
   * @name OmsPurchaseSyncDeliveryBill
   * @summary 同步送货单
   * @request POST:/api/oms/purchase/syncDeliveryBill
   * @response `200` `CommonResp` OK
   */
  omsPurchaseSyncDeliveryBill = (req: DeliveryBillReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/oms/purchase/syncDeliveryBill`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 采购管理
   * @name OmsPurchaseSyncPurchaseOrder
   * @summary 同步采购订单
   * @request POST:/api/oms/purchase/syncPurchaseOrder
   * @response `200` `CommonResp` OK
   */
  omsPurchaseSyncPurchaseOrder = (req: PurchaseOrderReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/oms/purchase/syncPurchaseOrder`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 规则管理
   * @name OmsRuleAdd
   * @summary 新增
   * @request POST:/api/oms/rule/add
   * @response `200` `CommonRespString` OK
   */
  omsRuleAdd = (req: RuleAddReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/oms/rule/add`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 规则管理
   * @name OmsRuleBatchUpdateOrder
   * @summary 调整优先级
   * @request POST:/api/oms/rule/batchUpdateOrder
   * @response `200` `CommonRespString` OK
   */
  omsRuleBatchUpdateOrder = (codes: string[], params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/oms/rule/batchUpdateOrder`,
      method: 'POST',
      body: codes,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 规则-黑名单管理
   * @name OmsRuleBlacklistAdd
   * @summary 新增
   * @request POST:/api/oms/rule/blacklist/add
   * @response `200` `CommonRespString` OK
   */
  omsRuleBlacklistAdd = (req: RuleBlacklistAddReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/oms/rule/blacklist/add`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 规则-黑名单管理
   * @name OmsRuleBlacklistDelete
   * @summary 删除
   * @request POST:/api/oms/rule/blacklist/delete
   * @response `200` `CommonRespString` OK
   */
  omsRuleBlacklistDelete = (req: RuleBatchCommonReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/oms/rule/blacklist/delete`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 规则-黑名单管理
   * @name OmsRuleBlacklistEnableDisable
   * @summary 启用/禁用
   * @request POST:/api/oms/rule/blacklist/enableDisable
   * @response `200` `CommonRespString` OK
   */
  omsRuleBlacklistEnableDisable = (
    req: RuleBlacklistEnableDisableReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespString, any>({
      path: `/api/oms/rule/blacklist/enableDisable`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 规则-黑名单管理
   * @name OmsRuleBlacklistQueryDetail
   * @summary 查询详情
   * @request GET:/api/oms/rule/blacklist/queryDetail
   * @response `200` `CommonRespRuleBlacklistAddReq` OK
   */
  omsRuleBlacklistQueryDetail = (
    query: {
      /** ruleNo */
      ruleNo: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespRuleBlacklistAddReq, any>({
      path: `/api/oms/rule/blacklist/queryDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 规则-黑名单管理
   * @name OmsRuleBlacklistQueryList
   * @summary 查询列表
   * @request POST:/api/oms/rule/blacklist/queryList
   * @response `200` `RuleBlacklistListResp` OK
   */
  omsRuleBlacklistQueryList = (req: RuleBlacklistListReq, params: RequestParams = {}) =>
    this.request<RuleBlacklistListResp, any>({
      path: `/api/oms/rule/blacklist/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 规则-黑名单管理
   * @name OmsRuleBlacklistUpdate
   * @summary 编辑
   * @request POST:/api/oms/rule/blacklist/update
   * @response `200` `CommonRespString` OK
   */
  omsRuleBlacklistUpdate = (req: RuleBlacklistAddReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/oms/rule/blacklist/update`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 规则管理
   * @name OmsRuleDelete
   * @summary 删除
   * @request POST:/api/oms/rule/delete
   * @response `200` `CommonRespString` OK
   */
  omsRuleDelete = (req: RuleBatchCommonReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/oms/rule/delete`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 规则管理
   * @name OmsRuleEnableDisable
   * @summary 启用/禁用
   * @request POST:/api/oms/rule/enableDisable
   * @response `200` `CommonRespString` OK
   */
  omsRuleEnableDisable = (req: RuleEnableDisableReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/oms/rule/enableDisable`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 规则-一品多供发货管理
   * @name OmsRuleMultipleSuppliesAdd
   * @summary 新增
   * @request POST:/api/oms/rule/multiple/supplies/add
   * @response `200` `CommonRespString` OK
   */
  omsRuleMultipleSuppliesAdd = (req: RuleMultipleSuppliesAddReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/oms/rule/multiple/supplies/add`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 规则-一品多供发货管理
   * @name OmsRuleMultipleSuppliesDelete
   * @summary 删除
   * @request POST:/api/oms/rule/multiple/supplies/delete
   * @response `200` `CommonRespString` OK
   */
  omsRuleMultipleSuppliesDelete = (req: RuleBatchCommonReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/oms/rule/multiple/supplies/delete`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 规则-一品多供发货管理
   * @name OmsRuleMultipleSuppliesEnableDisable
   * @summary 启用/禁用
   * @request POST:/api/oms/rule/multiple/supplies/enableDisable
   * @response `200` `CommonRespString` OK
   */
  omsRuleMultipleSuppliesEnableDisable = (
    req: RuleBlacklistEnableDisableReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespString, any>({
      path: `/api/oms/rule/multiple/supplies/enableDisable`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 规则-一品多供发货管理
   * @name OmsRuleMultipleSuppliesQueryDetail
   * @summary 查询详情
   * @request GET:/api/oms/rule/multiple/supplies/queryDetail
   * @response `200` `CommonRespRuleMultipleSuppliesAddReq` OK
   */
  omsRuleMultipleSuppliesQueryDetail = (
    query: {
      /** ruleNo */
      ruleNo: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespRuleMultipleSuppliesAddReq, any>({
      path: `/api/oms/rule/multiple/supplies/queryDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 规则-一品多供发货管理
   * @name OmsRuleMultipleSuppliesQueryList
   * @summary 查询列表
   * @request POST:/api/oms/rule/multiple/supplies/queryList
   * @response `200` `RuleMultipleSuppliesListResp` OK
   */
  omsRuleMultipleSuppliesQueryList = (
    req: RuleMultipleSuppliesListReq,
    params: RequestParams = {},
  ) =>
    this.request<RuleMultipleSuppliesListResp, any>({
      path: `/api/oms/rule/multiple/supplies/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 规则-一品多供发货管理
   * @name OmsRuleMultipleSuppliesUpdate
   * @summary 编辑
   * @request POST:/api/oms/rule/multiple/supplies/update
   * @response `200` `CommonRespString` OK
   */
  omsRuleMultipleSuppliesUpdate = (req: RuleMultipleSuppliesAddReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/oms/rule/multiple/supplies/update`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 规则管理
   * @name OmsRuleQueryDetail
   * @summary 查询详情
   * @request GET:/api/oms/rule/queryDetail
   * @response `200` `CommonRespRuleDetailResp` OK
   */
  omsRuleQueryDetail = (
    query: {
      /** 规则ID */
      ruleNo: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespRuleDetailResp, any>({
      path: `/api/oms/rule/queryDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 规则管理
   * @name OmsRuleQueryList
   * @summary 查询列表
   * @request POST:/api/oms/rule/queryList
   * @response `200` `CommonRespRuleListResp` OK
   */
  omsRuleQueryList = (req: RuleListReq, params: RequestParams = {}) =>
    this.request<CommonRespRuleListResp, any>({
      path: `/api/oms/rule/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 规则管理
   * @name OmsRuleQueryLog
   * @summary 查询日志
   * @request POST:/api/oms/rule/queryLog
   * @response `200` `CommonRespListRuleLogListResp` OK
   */
  omsRuleQueryLog = (req: RuleLogListReq, params: RequestParams = {}) =>
    this.request<CommonRespListRuleLogListResp, any>({
      path: `/api/oms/rule/queryLog`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 规则-税务规则
   * @name OmsRuleTaxQueryList
   * @summary 查询列表
   * @request POST:/api/oms/rule/tax/queryList
   * @response `200` `RuleTaxListResp` OK
   */
  omsRuleTaxQueryList = (req: RuleTaxListReq, params: RequestParams = {}) =>
    this.request<RuleTaxListResp, any>({
      path: `/api/oms/rule/tax/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 规则-税务规则
   * @name OmsRuleTaxReset
   * @summary 更新
   * @request POST:/api/oms/rule/tax/reset
   * @response `200` `CommonRespObject` OK
   */
  omsRuleTaxReset = (req: RuleTaxListBatchUpdateReq, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/oms/rule/tax/reset`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 规则管理
   * @name OmsRuleUpdate
   * @summary 编辑
   * @request POST:/api/oms/rule/update
   * @response `200` `CommonRespString` OK
   */
  omsRuleUpdate = (req: RuleAddReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/oms/rule/update`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Shopify销售订单管理
   * @name OmsShopifyOrderDetail
   * @summary 详情
   * @request GET:/api/oms/shopify/order/detail
   * @response `200` `ShopifyOrderDetailResp` OK
   */
  omsShopifyOrderDetail = (
    query: {
      /** orderCode */
      orderCode: string;
      /** shop */
      shop: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<ShopifyOrderDetailResp, any>({
      path: `/api/oms/shopify/order/detail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags Shopify销售订单管理
   * @name OmsShopifyOrderEditItemRemark
   * @summary 编辑订单行备注
   * @request POST:/api/oms/shopify/order/editItemRemark
   * @response `200` `CommonRespVoid` OK
   */
  omsShopifyOrderEditItemRemark = (
    req: ShopifyOrderEditItemRemarkReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/oms/shopify/order/editItemRemark`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Shopify销售订单管理
   * @name OmsShopifyOrderEditRemark
   * @summary 编辑备注
   * @request POST:/api/oms/shopify/order/editRemark
   * @response `200` `CommonRespVoid` OK
   */
  omsShopifyOrderEditRemark = (req: ShopifyOrderEditRemarkReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/oms/shopify/order/editRemark`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Shopify销售订单管理
   * @name OmsShopifyOrderExport
   * @summary 导出
   * @request POST:/api/oms/shopify/order/export
   * @response `200` `CommonExportResp` OK
   */
  omsShopifyOrderExport = (req: ShopifyOrderQueryListReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/oms/shopify/order/export`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Shopify销售订单管理
   * @name OmsShopifyOrderFetchOrder
   * @summary 手动拉取订单
   * @request POST:/api/oms/shopify/order/fetchOrder
   * @response `200` `CommonRespVoid` OK
   */
  omsShopifyOrderFetchOrder = (req: ShopifyOrderFetchOrderReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/oms/shopify/order/fetchOrder`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Shopify销售订单管理
   * @name OmsShopifyOrderQueryList
   * @summary 查询列表
   * @request POST:/api/oms/shopify/order/queryList
   * @response `200` `ShopifyOrderQueryListResp` OK
   */
  omsShopifyOrderQueryList = (req: ShopifyOrderQueryListReq, params: RequestParams = {}) =>
    this.request<ShopifyOrderQueryListResp, any>({
      path: `/api/oms/shopify/order/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Shopify销售订单管理
   * @name OmsShopifyOrderRePushFoOrder
   * @summary 补推自发货
   * @request POST:/api/oms/shopify/order/rePushFoOrder
   * @response `200` `CommonRespOrderBatchCommonResp` OK
   */
  omsShopifyOrderRePushFoOrder = (req: ShopifyOrderCommonReq, params: RequestParams = {}) =>
    this.request<CommonRespOrderBatchCommonResp, any>({
      path: `/api/oms/shopify/order/rePushFoOrder`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 调拨单
   * @name OmsTransferAbandon
   * @summary 作废
   * @request POST:/api/oms/transfer/abandon
   * @response `200` `CommonRespVoid` OK
   */
  omsTransferAbandon = (req: TransferOrderCommonReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/oms/transfer/abandon`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 按列表顺序逐条作废，互不包在同一事务；任一条失败则中断
   *
   * @tags 调拨单
   * @name OmsTransferAbandonBatch
   * @summary 批量作废
   * @request POST:/api/oms/transfer/abandon/batch
   * @response `200` `CommonRespVoid` OK
   */
  omsTransferAbandonBatch = (req: TransferOrderBatchAbandonReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/oms/transfer/abandon/batch`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 批量将「待确认」更新为「已确认」(transfer_status=110)，与「待拣货出库」区分；入参为调拨单主键 id 列表
   *
   * @tags 调拨单
   * @name OmsTransferConfirm
   * @summary 确认
   * @request POST:/api/oms/transfer/confirm
   * @response `200` `CommonRespVoid` OK
   */
  omsTransferConfirm = (req: TransferOrderConfirmReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/oms/transfer/confirm`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 调拨单
   * @name OmsTransferExport
   * @summary 导出
   * @request POST:/api/oms/transfer/export
   * @response `200` `CommonExportResp` OK
   */
  omsTransferExport = (req: TransferOrderExportReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/oms/transfer/export`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 调拨单
   * @name OmsTransferForceComplete
   * @summary 强制完成
   * @request POST:/api/oms/transfer/forceComplete
   * @response `200` `CommonRespVoid` OK
   */
  omsTransferForceComplete = (req: TransferOrderCommonReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/oms/transfer/forceComplete`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 调拨单
   * @name OmsTransferInbound
   * @summary 入库
   * @request POST:/api/oms/transfer/inbound
   * @response `200` `CommonRespVoid` OK
   */
  omsTransferInbound = (req: TransferOrderInboundReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/oms/transfer/inbound`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 调拨计划单
   * @name OmsTransferPlanAbandon
   * @summary 作废
   * @request POST:/api/oms/transfer/plan/abandon
   * @response `200` `CommonRespVoid` OK
   */
  omsTransferPlanAbandon = (req: TransferPlanOrderCodeReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/oms/transfer/plan/abandon`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 调拨计划单
   * @name OmsTransferPlanAudit
   * @summary 审核（待审核状态下可提交每行审核数量、调出仓）
   * @request POST:/api/oms/transfer/plan/audit
   * @response `200` `CommonRespVoid` OK
   */
  omsTransferPlanAudit = (req: TransferPlanOrderAuditReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/oms/transfer/plan/audit`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 调拨计划单
   * @name OmsTransferPlanBatchAbandon
   * @summary 批量作废
   * @request POST:/api/oms/transfer/plan/batchAbandon
   * @response `200` `CommonRespVoid` OK
   */
  omsTransferPlanBatchAbandon = (req: TransferPlanOrderBatchCodeReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/oms/transfer/plan/batchAbandon`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 调拨计划单
   * @name OmsTransferPlanExport
   * @summary 导出（列表条件或勾选；详情维度见 exportType）
   * @request POST:/api/oms/transfer/plan/export
   * @response `200` `CommonExportResp` OK
   */
  omsTransferPlanExport = (req: TransferPlanOrderExportReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/oms/transfer/plan/export`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 调拨计划单
   * @name OmsTransferPlanQueryDetail
   * @summary 详情
   * @request POST:/api/oms/transfer/plan/queryDetail
   * @response `200` `TransferPlanOrderDetailResp` OK
   */
  omsTransferPlanQueryDetail = (req: TransferPlanOrderCodeReq, params: RequestParams = {}) =>
    this.request<TransferPlanOrderDetailResp, any>({
      path: `/api/oms/transfer/plan/queryDetail`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 调拨计划单
   * @name OmsTransferPlanQueryItemList
   * @summary 明细列表
   * @request POST:/api/oms/transfer/plan/queryItemList
   * @response `200` `TransferPlanOrderItemListResp` OK
   */
  omsTransferPlanQueryItemList = (req: TransferPlanOrderItemReq, params: RequestParams = {}) =>
    this.request<TransferPlanOrderItemListResp, any>({
      path: `/api/oms/transfer/plan/queryItemList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 调拨计划单
   * @name OmsTransferPlanQueryList
   * @summary 列表
   * @request POST:/api/oms/transfer/plan/queryList
   * @response `200` `TransferPlanOrderListQueryResp` OK
   */
  omsTransferPlanQueryList = (req: TransferPlanOrderListQueryReq, params: RequestParams = {}) =>
    this.request<TransferPlanOrderListQueryResp, any>({
      path: `/api/oms/transfer/plan/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 调拨计划单
   * @name OmsTransferPlanQueryOutStock
   * @summary 调出仓可用库存（供应链 SKU）
   * @request POST:/api/oms/transfer/plan/queryOutStock
   * @response `200` `CommonRespTransferPlanOrderOutStockResp` OK
   */
  omsTransferPlanQueryOutStock = (req: TransferPlanOrderOutStockReq, params: RequestParams = {}) =>
    this.request<CommonRespTransferPlanOrderOutStockResp, any>({
      path: `/api/oms/transfer/plan/queryOutStock`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 调拨计划单
   * @name OmsTransferPlanSave
   * @summary 保存
   * @request POST:/api/oms/transfer/plan/save
   * @response `200` `CommonRespString` OK
   */
  omsTransferPlanSave = (req: TransferPlanOrderSaveReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/oms/transfer/plan/save`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 调拨计划单
   * @name OmsTransferPlanSubmit
   * @summary 提交
   * @request POST:/api/oms/transfer/plan/submit
   * @response `200` `CommonRespVoid` OK
   */
  omsTransferPlanSubmit = (req: TransferPlanOrderSaveReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/oms/transfer/plan/submit`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 调拨单
   * @name OmsTransferPush
   * @summary 推送
   * @request POST:/api/oms/transfer/push
   * @response `200` `CommonRespBoolean` OK
   */
  omsTransferPush = (req: TransferOrderCommonReq, params: RequestParams = {}) =>
    this.request<CommonRespBoolean, any>({
      path: `/api/oms/transfer/push`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 调拨单
   * @name OmsTransferPushXy
   * @summary 推送兴运
   * @request POST:/api/oms/transfer/pushXy
   * @response `200` `CommonRespOrderBatchAuthResp` OK
   */
  omsTransferPushXy = (req: TransferOrderPushReq, params: RequestParams = {}) =>
    this.request<CommonRespOrderBatchAuthResp, any>({
      path: `/api/oms/transfer/pushXy`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 调拨单
   * @name OmsTransferQueryDetail
   * @summary 调拨单详情
   * @request POST:/api/oms/transfer/queryDetail
   * @response `200` `TransferOrderDetailQueryResp` OK
   */
  omsTransferQueryDetail = (req: TransferOrderCommonReq, params: RequestParams = {}) =>
    this.request<TransferOrderDetailQueryResp, any>({
      path: `/api/oms/transfer/queryDetail`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 调拨单
   * @name OmsTransferQueryList
   * @summary 调拨单列表
   * @request POST:/api/oms/transfer/queryList
   * @response `200` `TransferOrderListQueryResp` OK
   */
  omsTransferQueryList = (req: TransferOrderListQueryReq, params: RequestParams = {}) =>
    this.request<TransferOrderListQueryResp, any>({
      path: `/api/oms/transfer/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 调拨单
   * @name OmsTransferQueryWarehouse
   * @summary 调拨仓库
   * @request GET:/api/oms/transfer/queryWarehouse
   * @response `200` `CommonRespListWarehouseBean` OK
   */
  omsTransferQueryWarehouse = (
    query: {
      /** 调拨仓库类型：IN -- 调入；OUT -- 调出 */
      type: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespListWarehouseBean, any>({
      path: `/api/oms/transfer/queryWarehouse`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 调拨单
   * @name OmsTransferRemark
   * @summary 备注
   * @request POST:/api/oms/transfer/remark
   * @response `200` `CommonRespVoid` OK
   */
  omsTransferRemark = (req: TransferOrderRemarkReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/oms/transfer/remark`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 调拨单
   * @name OmsTransferSave
   * @summary 新增
   * @request POST:/api/oms/transfer/save
   * @response `200` `CommonRespVoid` OK
   */
  omsTransferSave = (req: TransferOrderSaveReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/oms/transfer/save`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 调拨单
   * @name OmsTransferStatusStatistics
   * @summary 调拨单状态统计
   * @request GET:/api/oms/transfer/status/statistics
   * @response `200` `TransferOrderStatusStatisticsResp` OK
   */
  omsTransferStatusStatistics = (params: RequestParams = {}) =>
    this.request<TransferOrderStatusStatisticsResp, any>({
      path: `/api/oms/transfer/status/statistics`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 调拨单
   * @name OmsTransferSubmit
   * @summary 确认提交
   * @request POST:/api/oms/transfer/submit
   * @response `200` `CommonRespVoid` OK
   */
  omsTransferSubmit = (req: TransferOrderSubmitReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/oms/transfer/submit`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 按列表顺序逐条提交，每条单独事务；任一条失败则中断且已成功的条目不回滚
   *
   * @tags 调拨单
   * @name OmsTransferSubmitBatch
   * @summary 批量确认提交
   * @request POST:/api/oms/transfer/submit/batch
   * @response `200` `CommonRespVoid` OK
   */
  omsTransferSubmitBatch = (req: TransferOrderBatchSubmitReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/oms/transfer/submit/batch`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 调拨单
   * @name OmsTransferUploadAttachment
   * @summary 附件上传
   * @request POST:/api/oms/transfer/uploadAttachment
   * @response `200` `CommonRespVoid` OK
   */
  omsTransferUploadAttachment = (
    req: TransferOrderUploadAttachmentReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/oms/transfer/uploadAttachment`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销售出库单
   * @name OmsWarehouseOrderAssemblePackageList
   * @summary 获取自动填写数据
   * @request POST:/api/oms/warehouse/order/assemblePackageList
   * @response `200` `CommonRespGucangPackageListResp` OK
   */
  omsWarehouseOrderAssemblePackageList = (req: GucangPackageListReq, params: RequestParams = {}) =>
    this.request<CommonRespGucangPackageListResp, any>({
      path: `/api/oms/warehouse/order/assemblePackageList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销售出库单
   * @name OmsWarehouseOrderAttachUpload
   * @summary 批量上传订单附件
   * @request POST:/api/oms/warehouse/order/attach/upload
   * @response `200` `CommonResp` OK
   */
  omsWarehouseOrderAttachUpload = (req: OrderUpdateUploadReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/oms/warehouse/order/attach/upload`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销售出库单
   * @name OmsWarehouseOrderBatchPush
   * @summary 批量推送积加
   * @request POST:/api/oms/warehouse/order/batchPush
   * @response `200` `CommonRespOrderBatchCommonResp` OK
   */
  omsWarehouseOrderBatchPush = (req: OrderBatchCommonReq, params: RequestParams = {}) =>
    this.request<CommonRespOrderBatchCommonResp, any>({
      path: `/api/oms/warehouse/order/batchPush`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销售出库单
   * @name OmsWarehouseOrderCancelOutbound
   * @summary 取消出库
   * @request POST:/api/oms/warehouse/order/cancelOutbound
   * @response `200` `CommonRespOrderBatchCommonResp` OK
   */
  omsWarehouseOrderCancelOutbound = (req: OrderBatchCommonReq, params: RequestParams = {}) =>
    this.request<CommonRespOrderBatchCommonResp, any>({
      path: `/api/oms/warehouse/order/cancelOutbound`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销售出库单
   * @name OmsWarehouseOrderConfirmOutbound
   * @summary 确认出库
   * @request POST:/api/oms/warehouse/order/confirmOutbound
   * @response `200` `OrderBatchCommonResp` OK
   */
  omsWarehouseOrderConfirmOutbound = (req: OrderBatchCommonReq, params: RequestParams = {}) =>
    this.request<OrderBatchCommonResp, any>({
      path: `/api/oms/warehouse/order/confirmOutbound`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销售出库单
   * @name OmsWarehouseOrderCutAtt
   * @summary 剪裁订单附件
   * @request POST:/api/oms/warehouse/order/cutAtt
   * @response `200` `CommonResp` OK
   */
  omsWarehouseOrderCutAtt = (req: OrderCutAttReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/oms/warehouse/order/cutAtt`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销售出库单
   * @name OmsWarehouseOrderCutAttBatch
   * @summary 剪裁订单附件-批量
   * @request POST:/api/oms/warehouse/order/cutAttBatch
   * @response `200` `CommonResp` OK
   */
  omsWarehouseOrderCutAttBatch = (req: OrderCutAttBatchReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/oms/warehouse/order/cutAttBatch`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销售出库单
   * @name OmsWarehouseOrderCutGuPdf
   * @summary 剪裁谷仓调拨单PDF
   * @request POST:/api/oms/warehouse/order/cutGuPdf
   * @response `200` `UploadReq` OK
   */
  omsWarehouseOrderCutGuPdf = (uploadReq: UploadReq, params: RequestParams = {}) =>
    this.request<UploadReq, any>({
      path: `/api/oms/warehouse/order/cutGuPdf`,
      method: 'POST',
      body: uploadReq,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销售出库单
   * @name OmsWarehouseOrderDownMarkDeliveryTemplate
   * @summary 下载谷仓模板
   * @request POST:/api/oms/warehouse/order/downMarkDeliveryTemplate
   * @response `200` `CommonRespString` OK
   */
  omsWarehouseOrderDownMarkDeliveryTemplate = (params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/oms/warehouse/order/downMarkDeliveryTemplate`,
      method: 'POST',
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销售出库单
   * @name OmsWarehouseOrderExport
   * @summary 导出
   * @request POST:/api/oms/warehouse/order/export
   * @response `200` `CommonRespCommonExportResp` OK
   */
  omsWarehouseOrderExport = (req: WarehouseOrderListQueryReq, params: RequestParams = {}) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/oms/warehouse/order/export`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销售出库单
   * @name OmsWarehouseOrderExportFeeDetail
   * @summary 下载费用明细
   * @request POST:/api/oms/warehouse/order/exportFeeDetail
   * @response `200` `CommonRespCommonExportResp` OK
   */
  omsWarehouseOrderExportFeeDetail = (
    req: WarehouseOrderListQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/oms/warehouse/order/exportFeeDetail`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销售出库单
   * @name OmsWarehouseOrderExportGcWarehouseService
   * @summary 下载谷仓包装信息
   * @request POST:/api/oms/warehouse/order/exportGcWarehouseService
   * @response `200` `CommonRespCommonExportResp` OK
   */
  omsWarehouseOrderExportGcWarehouseService = (
    warehouseService: GuCangTransferSlipOrderBeanWarehouseService,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/oms/warehouse/order/exportGcWarehouseService`,
      method: 'POST',
      body: warehouseService,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销售出库单
   * @name OmsWarehouseOrderExportReceiveDetail
   * @summary 下载领用单信息
   * @request POST:/api/oms/warehouse/order/exportReceiveDetail
   * @response `200` `CommonRespCommonExportResp` OK
   */
  omsWarehouseOrderExportReceiveDetail = (
    req: WarehouseOrderListQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/oms/warehouse/order/exportReceiveDetail`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销售出库单
   * @name OmsWarehouseOrderImportGcWarehouseService
   * @summary 导入谷仓包装信息
   * @request POST:/api/oms/warehouse/order/importGcWarehouseService
   * @response `200` `GuCangTransferSlipOrderBeanWarehouseService` OK
   */
  omsWarehouseOrderImportGcWarehouseService = (uploadReq: UploadReq, params: RequestParams = {}) =>
    this.request<GuCangTransferSlipOrderBeanWarehouseService, any>({
      path: `/api/oms/warehouse/order/importGcWarehouseService`,
      method: 'POST',
      body: uploadReq,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销售出库单
   * @name OmsWarehouseOrderMarkShipped
   * @summary 标记发货
   * @request POST:/api/oms/warehouse/order/markShipped
   * @response `200` `CommonRespBoolean` OK
   */
  omsWarehouseOrderMarkShipped = (req: OrderMarkDeliveryReq, params: RequestParams = {}) =>
    this.request<CommonRespBoolean, any>({
      path: `/api/oms/warehouse/order/markShipped`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销售出库单
   * @name OmsWarehouseOrderPlaceOrder
   * @summary 下单
   * @request POST:/api/oms/warehouse/order/placeOrder
   * @response `200` `CommonRespVoid` OK
   */
  omsWarehouseOrderPlaceOrder = (req: WoPlaceOrderReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/oms/warehouse/order/placeOrder`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销售出库单
   * @name OmsWarehouseOrderPushGcFba
   * @summary 推送FBA
   * @request POST:/api/oms/warehouse/order/pushGcFba
   * @response `200` `OrderBatchAuthResp` OK
   */
  omsWarehouseOrderPushGcFba = (req: OrderPushGuReq, params: RequestParams = {}) =>
    this.request<OrderBatchAuthResp, any>({
      path: `/api/oms/warehouse/order/pushGcFba`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销售出库单
   * @name OmsWarehouseOrderPushGcTransferSlipOrder
   * @summary 推送谷仓-其他调拨单
   * @request POST:/api/oms/warehouse/order/pushGcTransferSlipOrder
   * @response `200` `CommonResp` OK
   */
  omsWarehouseOrderPushGcTransferSlipOrder = (
    req: GuCangTransferSlipOrderBean,
    params: RequestParams = {},
  ) =>
    this.request<CommonResp, any>({
      path: `/api/oms/warehouse/order/pushGcTransferSlipOrder`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 查询装箱板分页列表
   *
   * @tags 销售出库单
   * @name OmsWarehouseOrderQueryBumperList
   * @summary 出库-仓配订单装箱板信息列表
   * @request POST:/api/oms/warehouse/order/queryBumperList
   * @response `200` `CommonRespWarehouseBumperPageResp` OK
   */
  omsWarehouseOrderQueryBumperList = (req: WarehouseBumperQueryReq, params: RequestParams = {}) =>
    this.request<CommonRespWarehouseBumperPageResp, any>({
      path: `/api/oms/warehouse/order/queryBumperList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 查询提货单
   *
   * @tags 销售出库单
   * @name OmsWarehouseOrderQueryDeliveryOrderList
   * @summary 出库-仓配订单提货单列表
   * @request GET:/api/oms/warehouse/order/queryDeliveryOrderList
   * @response `200` `CommonRespWarehouseDeliveryOrderResp` OK
   */
  omsWarehouseOrderQueryDeliveryOrderList = (
    query: {
      /** orderCode */
      orderCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespWarehouseDeliveryOrderResp, any>({
      path: `/api/oms/warehouse/order/queryDeliveryOrderList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销售出库单
   * @name OmsWarehouseOrderQueryDetail
   * @summary 查询详情
   * @request GET:/api/oms/warehouse/order/queryDetail
   * @response `200` `WarehouseOrderDetailResp` OK
   */
  omsWarehouseOrderQueryDetail = (
    query: {
      /** code */
      code: string;
      /** push */
      push?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<WarehouseOrderDetailResp, any>({
      path: `/api/oms/warehouse/order/queryDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销售出库单
   * @name OmsWarehouseOrderQueryList
   * @summary 查询列表
   * @request POST:/api/oms/warehouse/order/queryList
   * @response `200` `WarehouseOrderListQueryResp` OK
   */
  omsWarehouseOrderQueryList = (req: WarehouseOrderListQueryReq, params: RequestParams = {}) =>
    this.request<WarehouseOrderListQueryResp, any>({
      path: `/api/oms/warehouse/order/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 查询物流轨迹列表
   *
   * @tags 销售出库单
   * @name OmsWarehouseOrderQueryLogisticsTrajectoryList
   * @summary 出库-仓配订单物流轨迹列表
   * @request GET:/api/oms/warehouse/order/queryLogisticsTrajectoryList
   * @response `200` `CommonRespWarehouseLogisticsTrajectoryResp` OK
   */
  omsWarehouseOrderQueryLogisticsTrajectoryList = (
    query: {
      /** orderCode */
      orderCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespWarehouseLogisticsTrajectoryResp, any>({
      path: `/api/oms/warehouse/order/queryLogisticsTrajectoryList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销售出库单
   * @name OmsWarehouseOrderQueryPlaceOrder
   * @summary 下单查询
   * @request GET:/api/oms/warehouse/order/queryPlaceOrder
   * @response `200` `CommonRespWoPlaceOrderResp` OK
   */
  omsWarehouseOrderQueryPlaceOrder = (
    query: {
      /** code */
      code: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespWoPlaceOrderResp, any>({
      path: `/api/oms/warehouse/order/queryPlaceOrder`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销售出库单
   * @name OmsWarehouseOrderQueryPushGcTransferSlipOrderEnums
   * @summary 推送谷仓-其他调拨单-特殊枚举获取
   * @request GET:/api/oms/warehouse/order/queryPushGcTransferSlipOrderEnums
   * @response `200` `QueryPushGcTransferSlipOrderEnumsResp` OK
   */
  omsWarehouseOrderQueryPushGcTransferSlipOrderEnums = (
    query: {
      /** code */
      code: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<QueryPushGcTransferSlipOrderEnumsResp, any>({
      path: `/api/oms/warehouse/order/queryPushGcTransferSlipOrderEnums`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销售出库单
   * @name OmsWarehouseOrderSaveRemark
   * @summary 保存备注
   * @request POST:/api/oms/warehouse/order/saveRemark
   * @response `200` `CommonRespString` OK
   */
  omsWarehouseOrderSaveRemark = (req: WoOrderRemarkSaveReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/oms/warehouse/order/saveRemark`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销售出库单
   * @name OmsWarehouseOrderShippingMarkGenerate
   * @summary 批量生成箱唛
   * @request POST:/api/oms/warehouse/order/shippingMark/generate
   * @response `200` `CommonRespWoShippingMarkGenerateResp` OK
   */
  omsWarehouseOrderShippingMarkGenerate = (
    req: WoShippingMarkGenerateReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespWoShippingMarkGenerateResp, any>({
      path: `/api/oms/warehouse/order/shippingMark/generate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 限制10个pdf一批, 会按照传入的pdf顺序返回，但不一定每个都能解析出数据
   *
   * @tags 销售出库单
   * @name OmsWarehouseOrderShippingMarkParse
   * @summary 批量解析箱唛
   * @request POST:/api/oms/warehouse/order/shippingMark/parse
   * @response `200` `CommonRespWoShippingMarkParseResp` OK
   */
  omsWarehouseOrderShippingMarkParse = (req: WoShippingMarkParseReq, params: RequestParams = {}) =>
    this.request<CommonRespWoShippingMarkParseResp, any>({
      path: `/api/oms/warehouse/order/shippingMark/parse`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销售出库单
   * @name OmsWarehouseOrderSubmitOutbound
   * @summary 提交出库
   * @request POST:/api/oms/warehouse/order/submitOutbound
   * @response `200` `CommonRespOrderBatchCommonResp` OK
   */
  omsWarehouseOrderSubmitOutbound = (req: OrderBatchCommonReq, params: RequestParams = {}) =>
    this.request<CommonRespOrderBatchCommonResp, any>({
      path: `/api/oms/warehouse/order/submitOutbound`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 主动触发同步谷仓订单数据
   *
   * @tags 销售出库单
   * @name OmsWarehouseOrderSyncGcOrderInfo
   * @summary 手动同步谷仓订单物流附件信息
   * @request POST:/api/oms/warehouse/order/syncGcOrderInfo
   * @response `200` `CommonRespVoid` OK
   */
  omsWarehouseOrderSyncGcOrderInfo = (req: SyncGcOrderInfoReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/oms/warehouse/order/syncGcOrderInfo`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销售出库单
   * @name OmsWarehouseOrderUpdateTrackingNum
   * @summary 更新物流跟踪号
   * @request POST:/api/oms/warehouse/order/update/trackingNum
   * @response `200` `CommonRespString` OK
   */
  omsWarehouseOrderUpdateTrackingNum = (req: WoUpdateTrackingNumReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/oms/warehouse/order/update/trackingNum`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销售出库单
   * @name OmsWarehouseOrderUploadMarkShipped
   * @summary 上传批量标发
   * @request POST:/api/oms/warehouse/order/upload/markShipped
   * @response `200` `ImportDataResp` OK
   */
  omsWarehouseOrderUploadMarkShipped = (req: UploadReq, params: RequestParams = {}) =>
    this.request<ImportDataResp, any>({
      path: `/api/oms/warehouse/order/upload/markShipped`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 销售出库单
   * @name OmsWarehouseOrderUploadGuCangFile
   * @summary 推送谷仓-上传谷仓附件
   * @request POST:/api/oms/warehouse/order/uploadGuCangFile
   * @response `200` `GcUploadResp` OK
   */
  omsWarehouseOrderUploadGuCangFile = (req: GcUploadReq, params: RequestParams = {}) =>
    this.request<GcUploadResp, any>({
      path: `/api/oms/warehouse/order/uploadGuCangFile`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
}
