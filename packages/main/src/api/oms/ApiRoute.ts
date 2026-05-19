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

export namespace Api {
  /**
   * @description 字典-获取枚举下拉
   * @tags 业务枚举
   * @name OmsCommonBizEnumsGetEnumDict
   * @summary 字典-获取枚举下拉
   * @request GET:/api/oms/common/bizEnums/getEnumDict
   * @response `200` `CommonRespListEnumDictItemResp` OK
   */
  export namespace OmsCommonBizEnumsGetEnumDict {
    export type RequestParams = {};
    export type RequestQuery = {
      /** enumDictCode */
      enumDictCode?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespListEnumDictItemResp;
  }

  /**
   * No description
   * @tags 导入模块
   * @name OmsCommonFileImportData
   * @summary 数据导入
   * @request POST:/api/oms/common/file/importData
   * @response `200` `ImportDataResp` OK
   */
  export namespace OmsCommonFileImportData {
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
   * @tags 导入模块
   * @name OmsCommonFileQueryImportTemplate
   * @summary 获取导入模板
   * @request GET:/api/oms/common/file/queryImportTemplate
   * @response `200` `ImportTemplateQueryResp` OK
   */
  export namespace OmsCommonFileQueryImportTemplate {
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
   * @tags 日志通用接口
   * @name OmsCommonLogQueryLog
   * @summary 日志查询
   * @request POST:/api/oms/common/log/queryLog
   * @response `200` `OperationLogResp` OK
   */
  export namespace OmsCommonLogQueryLog {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OperationLogReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = OperationLogResp;
  }

  /**
   * No description
   * @tags 供应链SKU通用接口
   * @name OmsCommonProductQueryAddGiftSupplySkuList
   * @summary 查询Shopify赠品供应链SKU
   * @request POST:/api/oms/common/product/queryAddGiftSupplySkuList
   * @response `200` `SupplySkuListQueryResp` OK
   */
  export namespace OmsCommonProductQueryAddGiftSupplySkuList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SupplySkuListQueryReq;
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
   * @tags 供应链SKU通用接口
   * @name OmsCommonProductQuerySupplySkuList
   * @summary 查询供应链SKU
   * @request POST:/api/oms/common/product/querySupplySkuList
   * @response `200` `SupplySkuListQueryResp` OK
   */
  export namespace OmsCommonProductQuerySupplySkuList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SupplySkuListQueryReq;
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
   * @tags 供应链SKU通用接口
   * @name OmsCommonProductQuerySupplySkuListForTs
   * @summary 查询供应链SKU-TS
   * @request POST:/api/oms/common/product/querySupplySkuListForTs
   * @response `200` `SupplySkuListQueryResp` OK
   */
  export namespace OmsCommonProductQuerySupplySkuListForTs {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SupplySkuListQueryReq;
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
   * @tags 库存通用接口
   * @name OmsCommonStockQueryAmazonMskuStock
   * @summary 获取亚马逊库存-店铺+msku
   * @request POST:/api/oms/common/stock/queryAmazonMskuStock
   * @response `200` `AmazonStockMskuResp` OK
   */
  export namespace OmsCommonStockQueryAmazonMskuStock {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AmazonStockMskuReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = AmazonStockMskuResp;
  }

  /**
   * No description
   * @tags 库存通用接口
   * @name OmsCommonStockQueryAmazonSkuStock
   * @summary 获取亚马逊库存-仓库+supplySku
   * @request POST:/api/oms/common/stock/queryAmazonSkuStock
   * @response `200` `AmazonStockResp` OK
   */
  export namespace OmsCommonStockQueryAmazonSkuStock {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AmazonStockReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = AmazonStockResp;
  }

  /**
   * No description
   * @tags 库存通用接口
   * @name OmsCommonStockQueryPool
   * @summary 获取库存分配池
   * @request POST:/api/oms/common/stock/queryPool
   * @response `200` `CommonRespListInventoryPoolResp` OK
   */
  export namespace OmsCommonStockQueryPool {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = InventoryPoolReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespListInventoryPoolResp;
  }

  /**
   * No description
   * @tags 库存通用接口
   * @name OmsCommonStockQuerySkuStock
   * @summary 查询产品SKU库存
   * @request POST:/api/oms/common/stock/querySkuStock
   * @response `200` `ProductSkuStockQueryResp` OK
   */
  export namespace OmsCommonStockQuerySkuStock {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductSkuStockQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ProductSkuStockQueryResp;
  }

  /**
   * No description
   * @tags 库存通用接口
   * @name OmsCommonStockQuerySkuStockDetail
   * @summary 查询产品SKU库存明细
   * @request POST:/api/oms/common/stock/querySkuStockDetail
   * @response `200` `CisResultQuerySkuStockDetailResp` OK
   */
  export namespace OmsCommonStockQuerySkuStockDetail {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = QuerySkuStockDetailReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CisResultQuerySkuStockDetailResp;
  }

  /**
   * No description
   * @tags 库存通用接口
   * @name OmsCommonStockQueryStocks
   * @summary 查询库存产品
   * @request POST:/api/oms/common/stock/queryStocks
   * @response `200` `CommonRespQueryStockQueryResp` OK
   */
  export namespace OmsCommonStockQueryStocks {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = QueryStockQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespQueryStockQueryResp;
  }

  /**
   * No description
   * @tags 库存通用接口
   * @name OmsCommonStockQuerySupplySkuList
   * @summary 商品Sku 关联供应链SKU查询并返回库存
   * @request GET:/api/oms/common/stock/querySupplySkuList
   * @response `200` `SupplySkuQueryResp` OK
   */
  export namespace OmsCommonStockQuerySupplySkuList {
    export type RequestParams = {};
    export type RequestQuery = {
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
   * @tags 库存通用接口
   * @name OmsCommonStockQuerySupplySkuStock
   * @summary 查询供应链SKU仓库库存
   * @request POST:/api/oms/common/stock/querySupplySkuStock
   * @response `200` `SupplySkuQueryResp` OK
   */
  export namespace OmsCommonStockQuerySupplySkuStock {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SupplySkuWarehouseReq;
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
   * @tags 库存通用接口
   * @name OmsCommonStockQuerySupplySkuStockDetail
   * @summary 查询供应链SKU库存明细
   * @request POST:/api/oms/common/stock/querySupplySkuStockDetail
   * @response `200` `CisResultQuerySkuStockDetailResp` OK
   */
  export namespace OmsCommonStockQuerySupplySkuStockDetail {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = QuerySkuStockDetailReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CisResultQuerySkuStockDetailResp;
  }

  /**
   * No description
   * @tags 系统通用接口
   * @name OmsCommonSysDeleteLabelInfo
   * @summary 删除标签信息
   * @request POST:/api/oms/common/sys/deleteLabelInfo
   * @response `200` `CommonRespObject` OK
   */
  export namespace OmsCommonSysDeleteLabelInfo {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LabelDeleteReq;
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
   * @tags 系统通用接口
   * @name OmsCommonSysQueryLabelList
   * @summary 查询系统标签
   * @request POST:/api/oms/common/sys/queryLabelList
   * @response `200` `CommonRespListLabelInfoBean` OK
   */
  export namespace OmsCommonSysQueryLabelList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LabelListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespListLabelInfoBean;
  }

  /**
   * No description
   * @tags 系统通用接口
   * @name OmsCommonSysSaveLabelInfo
   * @summary 新增系统标签
   * @request POST:/api/oms/common/sys/saveLabelInfo
   * @response `200` `CommonRespString` OK
   */
  export namespace OmsCommonSysSaveLabelInfo {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LabelInfoBean;
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
   * @tags 业务任务通用接口
   * @name OmsCommonTaskBatchRetry
   * @summary 批量重试
   * @request POST:/api/oms/common/task/batchRetry
   * @response `200` `CommonRespOrderBatchAuthResp` OK
   */
  export namespace OmsCommonTaskBatchRetry {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OmsBusinessTriggerTaskBatchRetryReq;
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
   * @tags 业务任务通用接口
   * @name OmsCommonTaskQueryBusinessTaskList
   * @summary 查询当前用户当天任务列表
   * @request POST:/api/oms/common/task/queryBusinessTaskList
   * @response `200` `OmsBusinessTriggerTaskPageResp` OK
   */
  export namespace OmsCommonTaskQueryBusinessTaskList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OmsBusinessTriggerTaskPageQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = OmsBusinessTriggerTaskPageResp;
  }

  /**
   * No description
   * @tags 业务任务通用接口
   * @name OmsCommonTaskRetry
   * @summary 重试
   * @request POST:/api/oms/common/task/retry
   * @response `200` `CommonRespObject` OK
   */
  export namespace OmsCommonTaskRetry {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OmsBusinessTriggerTaskRetryReq;
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
   * @tags 仓库通用接口
   * @name OmsCommonWarehouseList
   * @summary 查询仓库
   * @request POST:/api/oms/common/warehouse/list
   * @response `200` `CommonRespListWarehouseBean` OK
   */
  export namespace OmsCommonWarehouseList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = WarehouseCommonQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespListWarehouseBean;
  }

  /**
   * No description
   * @tags 仓库通用接口
   * @name OmsCommonWarehouseQueryAllShipping
   * @summary 查询承运商运输方式列表
   * @request POST:/api/oms/common/warehouse/queryAllShipping
   * @response `200` `CommonRespShippingMethodResp` OK
   */
  export namespace OmsCommonWarehouseQueryAllShipping {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ShippingMethodReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespShippingMethodResp;
  }

  /**
   * No description
   * @tags 仓库通用接口
   * @name OmsCommonWarehouseQueryLogisticsWarehouseVat
   * @summary 获取仓库VAT
   * @request POST:/api/oms/common/warehouse/queryLogisticsWarehouseVat
   * @response `200` `CommonRespLogisticsWarehouseVatQueryListResp` OK
   */
  export namespace OmsCommonWarehouseQueryLogisticsWarehouseVat {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LogisticsWarehouseVatQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespLogisticsWarehouseVatQueryListResp;
  }

  /**
   * No description
   * @tags 仓库通用接口
   * @name OmsCommonWarehouseQueryWarehouseShipList
   * @summary 查询仓库运输方式列表
   * @request POST:/api/oms/common/warehouse/queryWarehouseShipList
   * @response `200` `CommonRespWarehouseShipResp` OK
   */
  export namespace OmsCommonWarehouseQueryWarehouseShipList {
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
   * @tags 送货管理
   * @name OmsDeliveryBillQueryDetail
   * @summary 详情
   * @request GET:/api/oms/delivery/bill/queryDetail
   * @response `200` `PlanDeliveryBillDetailResp` OK
   */
  export namespace OmsDeliveryBillQueryDetail {
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
   * @tags 送货管理
   * @name OmsDeliveryBillQueryList
   * @summary 查询列表
   * @request POST:/api/oms/delivery/bill/queryList
   * @response `200` `DeliveryBillListResp` OK
   */
  export namespace OmsDeliveryBillQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DeliveryBillListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DeliveryBillListResp;
  }

  /**
   * No description
   * @tags 工厂直发工单管理
   * @name OmsDirectFactoryWorkOrderAbandon
   * @summary 作废
   * @request GET:/api/oms/direct/factory/work/order/abandon
   * @response `200` `CommonRespString` OK
   */
  export namespace OmsDirectFactoryWorkOrderAbandon {
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
    export type ResponseBody = CommonRespString;
  }

  /**
   * No description
   * @tags 工厂直发工单管理
   * @name OmsDirectFactoryWorkOrderAdd
   * @summary 新增工单
   * @request POST:/api/oms/direct/factory/work/order/add
   * @response `200` `CommonRespString` OK
   */
  export namespace OmsDirectFactoryWorkOrderAdd {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DirectFactoryWorkOrderAddReq;
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
   * @tags 工厂直发工单管理
   * @name OmsDirectFactoryWorkOrderAddUpload
   * @summary 上传批量新增
   * @request POST:/api/oms/direct/factory/work/order/add/upload
   * @response `200` `CommonRespImportDataResp` OK
   */
  export namespace OmsDirectFactoryWorkOrderAddUpload {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UploadReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespImportDataResp;
  }

  /**
   * No description
   * @tags 工厂直发工单管理
   * @name OmsDirectFactoryWorkOrderBatchQualityInspectionReceipt
   * @summary 批量收货质检
   * @request POST:/api/oms/direct/factory/work/order/batchQualityInspectionReceipt
   * @response `200` `CommonRespString` OK
   */
  export namespace OmsDirectFactoryWorkOrderBatchQualityInspectionReceipt {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DirectFactoryWorkOrderBatchReq;
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
   * @tags 工厂直发工单管理
   * @name OmsDirectFactoryWorkOrderDownTransferyTemplate
   * @summary 下载积加调拨单模板
   * @request POST:/api/oms/direct/factory/work/order/downTransferyTemplate
   * @response `200` `CommonRespString` OK
   */
  export namespace OmsDirectFactoryWorkOrderDownTransferyTemplate {
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
   * @tags 工厂直发工单管理
   * @name OmsDirectFactoryWorkOrderExport
   * @summary 导出提货单
   * @request POST:/api/oms/direct/factory/work/order/export
   * @response `200` `CommonRespString` OK
   */
  export namespace OmsDirectFactoryWorkOrderExport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DirectFactoryWorkOrderExportReq;
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
   * @tags 工厂直发工单管理
   * @name OmsDirectFactoryWorkOrderExportPoInfo
   * @summary 导出采购订单
   * @request POST:/api/oms/direct/factory/work/order/exportPoInfo
   * @response `200` `CommonExportResp` OK
   */
  export namespace OmsDirectFactoryWorkOrderExportPoInfo {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DirectFactoryWorkOrderListReq;
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
   * @tags 工厂直发工单管理
   * @name OmsDirectFactoryWorkOrderLogisticsPickup
   * @summary 确认物流提货
   * @request GET:/api/oms/direct/factory/work/order/logisticsPickup
   * @response `200` `CommonRespString` OK
   */
  export namespace OmsDirectFactoryWorkOrderLogisticsPickup {
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
    export type ResponseBody = CommonRespString;
  }

  /**
   * No description
   * @tags 工厂直发工单管理
   * @name OmsDirectFactoryWorkOrderQueryDeliveryItemList
   * @summary 查询送货单明细列表
   * @request POST:/api/oms/direct/factory/work/order/queryDeliveryItemList
   * @response `200` `CommonRespListDirectFactoryWorkOrderDeliveryReq` OK
   */
  export namespace OmsDirectFactoryWorkOrderQueryDeliveryItemList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = string[];
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespListDirectFactoryWorkOrderDeliveryReq;
  }

  /**
   * No description
   * @tags 工厂直发工单管理
   * @name OmsDirectFactoryWorkOrderQueryDeliveryList
   * @summary 查询送货单列表
   * @request POST:/api/oms/direct/factory/work/order/queryDeliveryList
   * @response `200` `DirectFactoryWorkOrderDeliveryListResp` OK
   */
  export namespace OmsDirectFactoryWorkOrderQueryDeliveryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DirectFactoryWorkOrderDeliveryListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DirectFactoryWorkOrderDeliveryListResp;
  }

  /**
   * No description
   * @tags 工厂直发工单管理
   * @name OmsDirectFactoryWorkOrderQueryDetail
   * @summary 查询详情
   * @request GET:/api/oms/direct/factory/work/order/queryDetail
   * @response `200` `CommonRespDirectFactoryWorkOrderAddReq` OK
   */
  export namespace OmsDirectFactoryWorkOrderQueryDetail {
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
    export type ResponseBody = CommonRespDirectFactoryWorkOrderAddReq;
  }

  /**
   * No description
   * @tags 工厂直发工单管理
   * @name OmsDirectFactoryWorkOrderQueryList
   * @summary 查询列表
   * @request POST:/api/oms/direct/factory/work/order/queryList
   * @response `200` `DirectFactoryWorkOrderListResp` OK
   */
  export namespace OmsDirectFactoryWorkOrderQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DirectFactoryWorkOrderListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DirectFactoryWorkOrderListResp;
  }

  /**
   * No description
   * @tags 工厂直发工单管理
   * @name OmsDirectFactoryWorkOrderQueryStatusCount
   * @summary 查询状态统计
   * @request GET:/api/oms/direct/factory/work/order/queryStatusCount
   * @response `200` `CommonRespListMapStringObject` OK
   */
  export namespace OmsDirectFactoryWorkOrderQueryStatusCount {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespListMapStringObject;
  }

  /**
   * No description
   * @tags 工厂直发工单管理
   * @name OmsDirectFactoryWorkOrderQuerySupplierList
   * @summary 查询供应商列表
   * @request POST:/api/oms/direct/factory/work/order/querySupplierList
   * @response `200` `CommonRespListDirectFactoryWorkOrderSupplierListResp` OK
   */
  export namespace OmsDirectFactoryWorkOrderQuerySupplierList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DirectFactoryWorkOrderSupplierListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespListDirectFactoryWorkOrderSupplierListResp;
  }

  /**
   * No description
   * @tags 工厂直发工单管理
   * @name OmsDirectFactoryWorkOrderUpdate
   * @summary 编辑
   * @request POST:/api/oms/direct/factory/work/order/update
   * @response `200` `CommonRespString` OK
   */
  export namespace OmsDirectFactoryWorkOrderUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DirectFactoryWorkOrderAddReq;
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
   * @tags EDI订单
   * @name OmsEdiDownload
   * @summary 下载EDI订单
   * @request POST:/api/oms/edi/download
   * @response `200` `CommonExportResp` OK
   */
  export namespace OmsEdiDownload {
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
   * @name OmsEdiQueryList
   * @summary 查询EDI订单
   * @request POST:/api/oms/edi/queryList
   * @response `200` `EdiOrderListQueryResp` OK
   */
  export namespace OmsEdiQueryList {
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
   * @tags 积加自发货订单管理
   * @name OmsFoOrderQueryList
   * @summary 查询列表
   * @request POST:/api/oms/fo/order/queryList
   * @response `200` `FoOrderListQueryResp` OK
   */
  export namespace OmsFoOrderQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FoOrderQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = FoOrderListQueryResp;
  }

  /**
   * No description
   * @tags 订单履约可视化BI报表
   * @name OmsFulfillmentBiDashboardDistributionExceptionCustomerType
   * @summary 看板-异常+客户类型维度分布（year不传默认当前年，orderChannel不传返回全部渠道）
   * @request GET:/api/oms/fulfillment/bi/dashboard/distribution/exception-customer-type
   * @response `200` `CommonRespListFulfillmentBiDashboardDistributionResp` OK
   */
  export namespace OmsFulfillmentBiDashboardDistributionExceptionCustomerType {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 订单渠道，不传返回全部渠道 */
      orderChannel?: string;
      /**
       * 年份，不传默认当前年
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
    export type ResponseBody = CommonRespListFulfillmentBiDashboardDistributionResp;
  }

  /**
   * No description
   * @tags 订单履约可视化BI报表
   * @name OmsFulfillmentBiDashboardDistributionExceptionRegion
   * @summary 看板-异常+大区维度分布（year不传默认当前年，orderChannel不传返回全部渠道）
   * @request GET:/api/oms/fulfillment/bi/dashboard/distribution/exception-region
   * @response `200` `CommonRespListFulfillmentBiDashboardDistributionResp` OK
   */
  export namespace OmsFulfillmentBiDashboardDistributionExceptionRegion {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 订单渠道，不传返回全部渠道 */
      orderChannel?: string;
      /**
       * 年份，不传默认当前年
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
    export type ResponseBody = CommonRespListFulfillmentBiDashboardDistributionResp;
  }

  /**
   * No description
   * @tags 订单履约可视化BI报表
   * @name OmsFulfillmentBiDashboardDistributionStatusCustomerType
   * @summary 看板-状态+客户类型维度分布（year不传默认当前年，orderChannel不传返回全部渠道）
   * @request GET:/api/oms/fulfillment/bi/dashboard/distribution/status-customer-type
   * @response `200` `CommonRespListFulfillmentBiDashboardDistributionResp` OK
   */
  export namespace OmsFulfillmentBiDashboardDistributionStatusCustomerType {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 订单渠道，不传返回全部渠道 */
      orderChannel?: string;
      /**
       * 年份，不传默认当前年
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
    export type ResponseBody = CommonRespListFulfillmentBiDashboardDistributionResp;
  }

  /**
   * No description
   * @tags 订单履约可视化BI报表
   * @name OmsFulfillmentBiDashboardDistributionStatusRegion
   * @summary 看板-状态+大区维度分布（year不传默认当前年，orderChannel不传返回全部渠道）
   * @request GET:/api/oms/fulfillment/bi/dashboard/distribution/status-region
   * @response `200` `CommonRespListFulfillmentBiDashboardDistributionResp` OK
   */
  export namespace OmsFulfillmentBiDashboardDistributionStatusRegion {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 订单渠道，不传返回全部渠道 */
      orderChannel?: string;
      /**
       * 年份，不传默认当前年
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
    export type ResponseBody = CommonRespListFulfillmentBiDashboardDistributionResp;
  }

  /**
   * No description
   * @tags 订单履约可视化BI报表
   * @name OmsFulfillmentBiDashboardSummary
   * @summary 看板-年度订单汇总（返回当前年及上一年数据；year不传默认当前年，orderChannel不传返回全部渠道）
   * @request GET:/api/oms/fulfillment/bi/dashboard/summary
   * @response `200` `CommonRespListFulfillmentBiDashboardSummaryResp` OK
   */
  export namespace OmsFulfillmentBiDashboardSummary {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 订单渠道，不传返回全部渠道 */
      orderChannel?: string;
      /**
       * 年份，不传默认当前年
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
    export type ResponseBody = CommonRespListFulfillmentBiDashboardSummaryResp;
  }

  /**
   * No description
   * @tags 订单履约可视化BI报表
   * @name OmsFulfillmentBiEdit
   * @summary 编辑可编辑字段
   * @request POST:/api/oms/fulfillment/bi/edit
   * @response `200` `CommonRespVoid` OK
   */
  export namespace OmsFulfillmentBiEdit {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FulfillmentBiEditReq;
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
   * @tags 订单履约可视化BI报表
   * @name OmsFulfillmentBiLogisticsExport
   * @summary 物流-导出
   * @request POST:/api/oms/fulfillment/bi/logistics/export
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace OmsFulfillmentBiLogisticsExport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FulfillmentBiPageQueryReq;
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
   * @tags 订单履约可视化BI报表
   * @name OmsFulfillmentBiLogisticsImport
   * @summary 物流-导入
   * @request POST:/api/oms/fulfillment/bi/logistics/import
   * @response `200` `CommonRespImportDataResp` OK
   */
  export namespace OmsFulfillmentBiLogisticsImport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UploadReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespImportDataResp;
  }

  /**
   * No description
   * @tags 订单履约可视化BI报表
   * @name OmsFulfillmentBiLogisticsImportTemplate
   * @summary 物流-导入模板
   * @request GET:/api/oms/fulfillment/bi/logistics/import/template
   * @response `200` `CommonRespImportTemplateQueryResp` OK
   */
  export namespace OmsFulfillmentBiLogisticsImportTemplate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespImportTemplateQueryResp;
  }

  /**
   * No description
   * @tags 订单履约可视化BI报表
   * @name OmsFulfillmentBiOrderExport
   * @summary 订单-导出
   * @request POST:/api/oms/fulfillment/bi/order/export
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace OmsFulfillmentBiOrderExport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FulfillmentBiPageQueryReq;
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
   * @tags 订单履约可视化BI报表
   * @name OmsFulfillmentBiOrderImport
   * @summary 订单-导入
   * @request POST:/api/oms/fulfillment/bi/order/import
   * @response `200` `CommonRespImportDataResp` OK
   */
  export namespace OmsFulfillmentBiOrderImport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UploadReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespImportDataResp;
  }

  /**
   * No description
   * @tags 订单履约可视化BI报表
   * @name OmsFulfillmentBiOrderImportTemplate
   * @summary 订单-导入模板
   * @request GET:/api/oms/fulfillment/bi/order/import/template
   * @response `200` `CommonRespImportTemplateQueryResp` OK
   */
  export namespace OmsFulfillmentBiOrderImportTemplate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespImportTemplateQueryResp;
  }

  /**
   * No description
   * @tags 订单履约可视化BI报表
   * @name OmsFulfillmentBiPage
   * @summary 分页查询
   * @request POST:/api/oms/fulfillment/bi/page
   * @response `200` `CommonRespFulfillmentBiPageResp` OK
   */
  export namespace OmsFulfillmentBiPage {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FulfillmentBiPageQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespFulfillmentBiPageResp;
  }

  /**
   * No description
   * @tags 订单履约可视化BI报表
   * @name OmsFulfillmentBiPlanExport
   * @summary 计划-导出
   * @request POST:/api/oms/fulfillment/bi/plan/export
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace OmsFulfillmentBiPlanExport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FulfillmentBiPageQueryReq;
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
   * @tags 订单履约可视化BI报表
   * @name OmsFulfillmentBiPlanImport
   * @summary 计划-导入
   * @request POST:/api/oms/fulfillment/bi/plan/import
   * @response `200` `CommonRespImportDataResp` OK
   */
  export namespace OmsFulfillmentBiPlanImport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UploadReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespImportDataResp;
  }

  /**
   * No description
   * @tags 订单履约可视化BI报表
   * @name OmsFulfillmentBiPlanImportTemplate
   * @summary 计划-导入模板
   * @request GET:/api/oms/fulfillment/bi/plan/import/template
   * @response `200` `CommonRespImportTemplateQueryResp` OK
   */
  export namespace OmsFulfillmentBiPlanImportTemplate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespImportTemplateQueryResp;
  }

  /**
   * No description
   * @tags 自规划订单管理
   * @name OmsFulfillmentOrderAddLabel
   * @summary 追加标签
   * @request POST:/api/oms/fulfillment/order/addLabel
   * @response `200` `CommonRespObject` OK
   */
  export namespace OmsFulfillmentOrderAddLabel {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OrdeAddOrDelTabelReq;
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
   * @tags 自规划订单管理
   * @name OmsFulfillmentOrderBatchAbandon
   * @summary 批量作废
   * @request POST:/api/oms/fulfillment/order/batch/abandon
   * @response `200` `CommonRespOrderBatchAuthResp` OK
   */
  export namespace OmsFulfillmentOrderBatchAbandon {
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
   * @tags 自规划订单管理
   * @name OmsFulfillmentOrderBatchChangeSku
   * @summary 批量换货
   * @request POST:/api/oms/fulfillment/order/batchChangeSku
   * @response `200` `CommonRespOrderBatchAuthResp` OK
   */
  export namespace OmsFulfillmentOrderBatchChangeSku {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FulfillmentOrderBatchChangeSkuReq;
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
   * @tags 自规划订单管理
   * @name OmsFulfillmentOrderBatchFreeze
   * @summary 批量禁止处理
   * @request POST:/api/oms/fulfillment/order/batchFreeze
   * @response `200` `CommonRespOrderBatchAuthResp` OK
   */
  export namespace OmsFulfillmentOrderBatchFreeze {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OrderBatchFreezeReq;
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
   * @tags 自规划订单管理
   * @name OmsFulfillmentOrderBatchSubOrder
   * @summary 批量手动拆单
   * @request POST:/api/oms/fulfillment/order/batchSubOrder
   * @response `200` `CommonRespOrderBatchAuthResp` OK
   */
  export namespace OmsFulfillmentOrderBatchSubOrder {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OrderBatchSubReq;
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
   * @tags 自规划订单管理
   * @name OmsFulfillmentOrderBatchTransferFbaV2
   * @summary 批量手动转FBA-V2
   * @request POST:/api/oms/fulfillment/order/batchTransferFbaV2
   * @response `200` `CommonRespOrderBatchAuthResp` OK
   */
  export namespace OmsFulfillmentOrderBatchTransferFbaV2 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OrderTransferFbaBatchV2Req;
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
   * @tags 自规划订单管理
   * @name OmsFulfillmentOrderBatchTransferSelf
   * @summary 批量转自配送
   * @request POST:/api/oms/fulfillment/order/batchTransferSelf
   * @response `200` `CommonRespOrderBatchAuthResp` OK
   */
  export namespace OmsFulfillmentOrderBatchTransferSelf {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OrderBatchTransferSelfReq;
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
   * @tags 自规划订单管理
   * @name OmsFulfillmentOrderBatchUnFreeze
   * @summary 批量禁止解禁处理
   * @request POST:/api/oms/fulfillment/order/batchUnFreeze
   * @response `200` `CommonRespObject` OK
   */
  export namespace OmsFulfillmentOrderBatchUnFreeze {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OrderBatchFreezeReq;
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
   * @tags 自规划订单管理
   * @name OmsFulfillmentOrderCancelOutbound
   * @summary 取消出库（截单）
   * @request POST:/api/oms/fulfillment/order/cancelOutbound
   * @response `200` `CommonRespOrderBatchCommonResp` OK
   */
  export namespace OmsFulfillmentOrderCancelOutbound {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OrderBatchCommonReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespOrderBatchCommonResp;
  }

  /**
   * No description
   * @tags 自规划订单管理
   * @name OmsFulfillmentOrderCancelReverse
   * @summary 取消预占
   * @request POST:/api/oms/fulfillment/order/cancelReverse
   * @response `200` `CommonRespOrderBatchCommonResp` OK
   */
  export namespace OmsFulfillmentOrderCancelReverse {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OrderBatchCommonReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespOrderBatchCommonResp;
  }

  /**
   * No description
   * @tags 自规划订单管理
   * @name OmsFulfillmentOrderDelLabel
   * @summary 移除标签
   * @request POST:/api/oms/fulfillment/order/delLabel
   * @response `200` `CommonRespObject` OK
   */
  export namespace OmsFulfillmentOrderDelLabel {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OrdeAddOrDelTabelReq;
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
   * @tags 自规划订单管理
   * @name OmsFulfillmentOrderExecuteOrderRule
   * @summary 测试执行指定规则
   * @request GET:/api/oms/fulfillment/order/executeOrderRule
   * @response `200` `CommonRespBoolean` OK
   */
  export namespace OmsFulfillmentOrderExecuteOrderRule {
    export type RequestParams = {};
    export type RequestQuery = {
      /** code */
      code: string;
      /** sceneCode */
      sceneCode: string;
      /** shop */
      shop: string;
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
   * @tags 自规划订单管理
   * @name OmsFulfillmentOrderExecuteOrderRuleAndNo
   * @summary 测试执行指定规则号
   * @request GET:/api/oms/fulfillment/order/executeOrderRuleAndNo
   * @response `200` `CommonRespBoolean` OK
   */
  export namespace OmsFulfillmentOrderExecuteOrderRuleAndNo {
    export type RequestParams = {};
    export type RequestQuery = {
      /** code */
      code: string;
      /** ruleNo */
      ruleNo: string;
      /** sceneCode */
      sceneCode: string;
      /** shop */
      shop: string;
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
   * @tags 自规划订单管理
   * @name OmsFulfillmentOrderExecuteOrderRuleFrom
   * @summary 测试从指定规则执行
   * @request GET:/api/oms/fulfillment/order/executeOrderRuleFrom
   * @response `200` `CommonRespBoolean` OK
   */
  export namespace OmsFulfillmentOrderExecuteOrderRuleFrom {
    export type RequestParams = {};
    export type RequestQuery = {
      /** code */
      code: string;
      /** sceneCode */
      sceneCode: string;
      /** shop */
      shop: string;
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
   * @tags 自规划订单管理
   * @name OmsFulfillmentOrderExecuteOrderRuleFromAndNo
   * @summary 测试执行指定规则号
   * @request GET:/api/oms/fulfillment/order/executeOrderRuleFromAndNo
   * @response `200` `CommonRespBoolean` OK
   */
  export namespace OmsFulfillmentOrderExecuteOrderRuleFromAndNo {
    export type RequestParams = {};
    export type RequestQuery = {
      /** code */
      code: string;
      /** ruleNo */
      ruleNo: string;
      /** sceneCode */
      sceneCode: string;
      /** shop */
      shop: string;
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
   * @tags 自规划订单管理
   * @name OmsFulfillmentOrderExecuteOrderSplitAfterOrder
   * @summary 测试一品多供后拆单
   * @request GET:/api/oms/fulfillment/order/executeOrderSplitAfterOrder
   * @response `200` `CommonRespBoolean` OK
   */
  export namespace OmsFulfillmentOrderExecuteOrderSplitAfterOrder {
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
    export type ResponseBody = CommonRespBoolean;
  }

  /**
   * No description
   * @tags 自规划订单管理
   * @name OmsFulfillmentOrderExportErrSaleSku
   * @summary 导出MSKU未匹配数据
   * @request POST:/api/oms/fulfillment/order/exportErrSaleSku
   * @response `200` `CommonExportResp` OK
   */
  export namespace OmsFulfillmentOrderExportErrSaleSku {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CommonPageReq;
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
   * @tags 自规划订单管理
   * @name OmsFulfillmentOrderExportErrThirdSku
   * @summary 导出三方仓SKU未配对数据
   * @request POST:/api/oms/fulfillment/order/exportErrThirdSku
   * @response `200` `CommonExportResp` OK
   */
  export namespace OmsFulfillmentOrderExportErrThirdSku {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CommonPageReq;
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
   * @tags 自规划订单管理
   * @name OmsFulfillmentOrderFreeze
   * @summary 禁止处理
   * @request POST:/api/oms/fulfillment/order/freeze
   * @response `200` `CommonRespObject` OK
   */
  export namespace OmsFulfillmentOrderFreeze {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OrderFreezeReq;
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
   * @tags 自规划订单管理
   * @name OmsFulfillmentOrderInitRule
   * @summary 初始化规则
   * @request GET:/api/oms/fulfillment/order/initRule
   * @response `200` `CommonRespBoolean` OK
   */
  export namespace OmsFulfillmentOrderInitRule {
    export type RequestParams = {};
    export type RequestQuery = {
      /** module */
      module: string;
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
   * @tags 自规划订单管理
   * @name OmsFulfillmentOrderMarkShipped
   * @summary 标记发货
   * @request POST:/api/oms/fulfillment/order/markShipped
   * @response `200` `CommonRespOrderBatchCommonResp` OK
   */
  export namespace OmsFulfillmentOrderMarkShipped {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OrderBatchCommonReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespOrderBatchCommonResp;
  }

  /**
   * No description
   * @tags 自规划订单管理
   * @name OmsFulfillmentOrderPush
   * @summary 推送自规划订单（重新执行订单规则）
   * @request POST:/api/oms/fulfillment/order/push
   * @response `200` `CommonRespOrderBatchCommonResp` OK
   */
  export namespace OmsFulfillmentOrderPush {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OrderBatchCommonReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespOrderBatchCommonResp;
  }

  /**
   * No description
   * @tags 自规划订单管理
   * @name OmsFulfillmentOrderQueryChangeSkuList
   * @summary 批量换货查询
   * @request POST:/api/oms/fulfillment/order/queryChangeSkuList
   * @response `200` `FulfillmentOrderBatchChangeSkuResp` OK
   */
  export namespace OmsFulfillmentOrderQueryChangeSkuList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OrderBatchCommonReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = FulfillmentOrderBatchChangeSkuResp;
  }

  /**
   * No description
   * @tags 自规划订单管理
   * @name OmsFulfillmentOrderQueryShopList
   * @summary 查询亚马逊店铺仓库列表
   * @request GET:/api/oms/fulfillment/order/queryShopList
   * @response `200` `CommonRespShopWarehousePageResp` OK
   */
  export namespace OmsFulfillmentOrderQueryShopList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespShopWarehousePageResp;
  }

  /**
   * No description
   * @tags 自规划订单管理
   * @name OmsFulfillmentOrderReOrderLogistics
   * @summary 重新物流下单
   * @request POST:/api/oms/fulfillment/order/reOrderLogistics
   * @response `200` `CommonRespVoid` OK
   */
  export namespace OmsFulfillmentOrderReOrderLogistics {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LogisticsOrderPushReq;
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
   * @tags 自规划订单管理
   * @name OmsFulfillmentOrderReplenishProductInfo
   * @summary 查询产品信息
   * @request POST:/api/oms/fulfillment/order/replenish/product/info
   * @response `200` `(ReplenishProductInfoResp)[]` OK
   */
  export namespace OmsFulfillmentOrderReplenishProductInfo {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ReplenishProductReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ReplenishProductInfoResp[];
  }

  /**
   * No description
   * @tags 自规划订单管理
   * @name OmsFulfillmentOrderReplenishSave
   * @summary 新增补单发货
   * @request POST:/api/oms/fulfillment/order/replenish/save
   * @response `200` `CommonRespVoid` OK
   */
  export namespace OmsFulfillmentOrderReplenishSave {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ReplenishOrderSaveReq;
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
   * @tags 自规划订单管理
   * @name OmsFulfillmentOrderSubOrder
   * @summary 单个手动拆单
   * @request POST:/api/oms/fulfillment/order/subOrder
   * @response `200` `CommonRespObject` OK
   */
  export namespace OmsFulfillmentOrderSubOrder {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OrderSubReq;
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
   * @tags 自规划订单管理
   * @name OmsFulfillmentOrderSubmitOutbound
   * @summary 提交出库（提交发货）
   * @request POST:/api/oms/fulfillment/order/submitOutbound
   * @response `200` `CommonRespOrderBatchCommonResp` OK
   */
  export namespace OmsFulfillmentOrderSubmitOutbound {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OrderBatchCommonReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespOrderBatchCommonResp;
  }

  /**
   * No description
   * @tags 自规划订单管理
   * @name OmsFulfillmentOrderTransferFba
   * @summary 单个手动转FBA
   * @request POST:/api/oms/fulfillment/order/transferFba
   * @response `200` `CommonRespObject` OK
   */
  export namespace OmsFulfillmentOrderTransferFba {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OrderTransferFbaReq;
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
   * @tags 自规划订单管理
   * @name OmsFulfillmentOrderTransferSelf
   * @summary 转自配送
   * @request POST:/api/oms/fulfillment/order/transferSelf
   * @response `200` `CommonRespObject` OK
   */
  export namespace OmsFulfillmentOrderTransferSelf {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OrderTransferSelfReq;
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
   * @tags 自规划订单管理
   * @name OmsFulfillmentOrderUnFreeze
   * @summary 禁止解禁处理
   * @request POST:/api/oms/fulfillment/order/unFreeze
   * @response `200` `CommonRespObject` OK
   */
  export namespace OmsFulfillmentOrderUnFreeze {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OrderFreezeReq;
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
   * @tags 自规划订单管理
   * @name OmsFulfillmentOrderUpdateCustomRemark
   * @summary 修改客服备注
   * @request POST:/api/oms/fulfillment/order/updateCustomRemark
   * @response `200` `CommonResp` OK
   */
  export namespace OmsFulfillmentOrderUpdateCustomRemark {
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
   * @tags 自规划订单管理
   * @name OmsFulfillmentOrderUpdateLabel
   * @summary 更新标签
   * @request POST:/api/oms/fulfillment/order/updateLabel
   * @response `200` `CommonRespObject` OK
   */
  export namespace OmsFulfillmentOrderUpdateLabel {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OrderUpdateTabelReq;
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
   * @tags 自规划订单管理
   * @name OmsFulfillmentOrderUpdateMarkShipped
   * @summary 更新标发
   * @request POST:/api/oms/fulfillment/order/updateMarkShipped
   * @response `200` `CommonRespOrderBatchCommonResp` OK
   */
  export namespace OmsFulfillmentOrderUpdateMarkShipped {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OrderBatchCommonReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespOrderBatchCommonResp;
  }

  /**
   * No description
   * @tags 自规划订单管理
   * @name OmsFulfillmentOrderUpdateWarehouseLogistics
   * @summary 批量设置仓库物流
   * @request POST:/api/oms/fulfillment/order/updateWarehouseLogistics
   * @response `200` `CommonRespVoid` OK
   */
  export namespace OmsFulfillmentOrderUpdateWarehouseLogistics {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OrderWarehouseLogisticsUpdateReq;
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
   * @tags 自规划订单管理
   * @name OmsFulfillmentOrderUploadAttachment
   * @summary 附件上传
   * @request POST:/api/oms/fulfillment/order/uploadAttachment
   * @response `200` `CommonRespVoid` OK
   */
  export namespace OmsFulfillmentOrderUploadAttachment {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OrderUploadAttachmentReq;
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
   * @tags 自规划订单管理
   * @name OmsFulfillmentOrderUploadTrackingNo
   * @summary 上传跟踪号
   * @request POST:/api/oms/fulfillment/order/uploadTrackingNo
   * @response `200` `CommonRespVoid` OK
   */
  export namespace OmsFulfillmentOrderUploadTrackingNo {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FulfillmentOrderUploadTrackingNoReq;
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
   * @tags 其他入库管理
   * @name OmsInboundOrderCancel
   * @summary 作废
   * @request GET:/api/oms/inbound/order/cancel
   * @response `200` `CommonRespString` OK
   */
  export namespace OmsInboundOrderCancel {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * 其他入库id
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
    export type ResponseBody = CommonRespString;
  }

  /**
   * No description
   * @tags 其他入库管理
   * @name OmsInboundOrderQueryDetail
   * @summary 查询详情
   * @request GET:/api/oms/inbound/order/queryDetail
   * @response `200` `CommonRespOtherInboundOrderDetailReq` OK
   */
  export namespace OmsInboundOrderQueryDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * 其他入库id
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
    export type ResponseBody = CommonRespOtherInboundOrderDetailReq;
  }

  /**
   * No description
   * @tags 其他入库管理
   * @name OmsInboundOrderQueryList
   * @summary 查询列表
   * @request POST:/api/oms/inbound/order/queryList
   * @response `200` `OtherInboundOrderListResp` OK
   */
  export namespace OmsInboundOrderQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OtherInboundOrderListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = OtherInboundOrderListResp;
  }

  /**
   * No description
   * @tags 其他入库管理
   * @name OmsInboundOrderSubmit
   * @summary 提交
   * @request POST:/api/oms/inbound/order/submit
   * @response `200` `CommonRespString` OK
   */
  export namespace OmsInboundOrderSubmit {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OtherInboundOrderAddReq;
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
   * @tags 库存分配单
   * @name OmsInventoryAllotQueryDetail
   * @summary 查询详情
   * @request GET:/api/oms/inventory/allot/queryDetail
   * @response `200` `CommonRespInventoryAllotItemResp` OK
   */
  export namespace OmsInventoryAllotQueryDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 库存分配单号 */
      allotCoe: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespInventoryAllotItemResp;
  }

  /**
   * No description
   * @tags 库存分配单
   * @name OmsInventoryAllotQueryList
   * @summary 查询列表
   * @request POST:/api/oms/inventory/allot/queryList
   * @response `200` `InventoryAllotListResp` OK
   */
  export namespace OmsInventoryAllotQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = InventoryAllotListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = InventoryAllotListResp;
  }

  /**
   * No description
   * @tags 库存分配单
   * @name OmsInventoryAllotSubmit
   * @summary 提交
   * @request POST:/api/oms/inventory/allot/submit
   * @response `200` `CommonRespString` OK
   */
  export namespace OmsInventoryAllotSubmit {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = InventoryAllotAddReq;
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
   * @tags B2B订单全链路监控日志接口
   * @name OmsMonitorB2BQueryList
   * @summary B2B订单全链路监控列表查询
   * @request POST:/api/oms/monitor/b2b/queryList
   * @response `200` `MonitorB2BOutboundQueryListResp` OK
   */
  export namespace OmsMonitorB2BQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MonitorB2BOutboundQueryListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MonitorB2BOutboundQueryListResp;
  }

  /**
   * No description
   * @tags 积加CIS库存监控日志接口
   * @name OmsMonitorCisQueryList
   * @summary 积加CIS库存监控列表查询
   * @request POST:/api/oms/monitor/cis/queryList
   * @response `200` `MonitorCisStorageQueryListResp` OK
   */
  export namespace OmsMonitorCisQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MonitorCisStorageQueryListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MonitorCisStorageQueryListResp;
  }

  /**
   * No description
   * @tags 积加销售单全链路监控日志接口
   * @name OmsMonitorSalesQueryList
   * @summary 积加销售单全链路监控列表查询
   * @request POST:/api/oms/monitor/sales/queryList
   * @response `200` `MonitorSalesQueryListResp` OK
   */
  export namespace OmsMonitorSalesQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MonitorSalesQueryListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MonitorSalesQueryListResp;
  }

  /**
   * No description
   * @tags 积家调拨单全链路监控日志接口
   * @name OmsMonitorTransferQueryList
   * @summary 积家调拨单全链路监控列表查询
   * @request POST:/api/oms/monitor/transfer/queryList
   * @response `200` `MonitorTransferQueryListResp` OK
   */
  export namespace OmsMonitorTransferQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MonitorTransferQueryListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MonitorTransferQueryListResp;
  }

  /**
   * No description
   * @tags ERP订单
   * @name OmsOrderAbandon
   * @summary 作废
   * @request POST:/api/oms/order/abandon
   * @response `200` `CommonRespVoid` OK
   */
  export namespace OmsOrderAbandon {
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
    export type ResponseBody = CommonRespVoid;
  }

  /**
   * No description
   * @tags ERP订单
   * @name OmsOrderAddDownTemplate
   * @summary 下载批量新增模板
   * @request POST:/api/oms/order/add/downTemplate
   * @response `200` `CommonRespString` OK
   */
  export namespace OmsOrderAddDownTemplate {
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
   * @name OmsOrderAddUpload
   * @summary 上传批量新增
   * @request POST:/api/oms/order/add/upload
   * @response `200` `CommonResp` OK
   */
  export namespace OmsOrderAddUpload {
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
   * @name OmsOrderAddUploads
   * @summary 上传批量新增,多个附件支持
   * @request POST:/api/oms/order/add/uploads
   * @response `200` `CommonResp` OK
   */
  export namespace OmsOrderAddUploads {
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
   * @name OmsOrderAuthAndUpdate
   * @summary 审核
   * @request POST:/api/oms/order/authAndUpdate
   * @response `200` `CommonResp` OK
   */
  export namespace OmsOrderAuthAndUpdate {
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
   * @name OmsOrderBatchAbandon
   * @summary 批量作废
   * @request POST:/api/oms/order/batch/abandon
   * @response `200` `CommonRespOrderBatchAuthResp` OK
   */
  export namespace OmsOrderBatchAbandon {
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
   * @name OmsOrderBatchChangeSkuList
   * @summary 批量换货查询
   * @request POST:/api/oms/order/batch/changeSkuList
   * @response `200` `OrderChangeSkuBatchToAuditResp` OK
   */
  export namespace OmsOrderBatchChangeSkuList {
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
   * @name OmsOrderBatchChangeSkuListToAudit
   * @summary 批量换货
   * @request POST:/api/oms/order/batch/changeSkuListToAudit
   * @response `200` `CommonRespOrderBatchAuthResp` OK
   */
  export namespace OmsOrderBatchChangeSkuListToAudit {
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
   * @name OmsOrderBatchConfirmSend
   * @summary 批量确认发货
   * @request POST:/api/oms/order/batch/confirm/send
   * @response `200` `CommonRespOrderBatchAuthResp` OK
   */
  export namespace OmsOrderBatchConfirmSend {
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
   * @name OmsOrderBatchSendNotice
   * @summary 发货通知
   * @request POST:/api/oms/order/batch/sendNotice
   * @response `200` `CommonRespOrderBatchSendNoticeResp` OK
   */
  export namespace OmsOrderBatchSendNotice {
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
   * @name OmsOrderBatchToAudit
   * @summary 批量转待审核
   * @request POST:/api/oms/order/batch/toAudit
   * @response `200` `CommonRespOrderBatchAuthResp` OK
   */
  export namespace OmsOrderBatchToAudit {
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
   * @name OmsOrderBatchToWaitSend
   * @summary 批量转待发货
   * @request POST:/api/oms/order/batch/toWaitSend
   * @response `200` `CommonRespOrderBatchToWaitSendResp` OK
   */
  export namespace OmsOrderBatchToWaitSend {
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
   * @name OmsOrderBatchUpdate
   * @summary 批量审核
   * @request POST:/api/oms/order/batch/update
   * @response `200` `CommonRespOrderBatchAuthResp` OK
   */
  export namespace OmsOrderBatchUpdate {
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
   * @name OmsOrderBatchDownloadAttachment
   * @summary 批量下载订单附件
   * @request POST:/api/oms/order/batchDownloadAttachment
   * @response `200` `CommonExportResp` OK
   */
  export namespace OmsOrderBatchDownloadAttachment {
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
   * @name OmsOrderBatchToFba
   * @summary 批量转FBA
   * @request POST:/api/oms/order/batchToFba
   * @response `200` `CommonRespVoid` OK
   */
  export namespace OmsOrderBatchToFba {
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
   * @name OmsOrderBindingOrderWarehouseAndShipReq
   * @summary 绑定发货仓库配送方式
   * @request POST:/api/oms/order/bindingOrderWarehouseAndShipReq
   * @response `200` `CommonRespVoid` OK
   */
  export namespace OmsOrderBindingOrderWarehouseAndShipReq {
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
   * @name OmsOrderCancelOutbound
   * @summary 取消出库
   * @request POST:/api/oms/order/cancelOutbound
   * @response `200` `CommonRespOrderBatchCommonResp` OK
   */
  export namespace OmsOrderCancelOutbound {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OrderBatchCommonReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespOrderBatchCommonResp;
  }

  /**
   * No description
   * @tags ERP订单
   * @name OmsOrderCancelReverse
   * @summary 取消预占
   * @request POST:/api/oms/order/cancelReverse
   * @response `200` `CommonRespOrderBatchCommonResp` OK
   */
  export namespace OmsOrderCancelReverse {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OrderBatchCommonReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespOrderBatchCommonResp;
  }

  /**
   * No description
   * @tags ERP订单
   * @name OmsOrderChangeSku
   * @summary 换货
   * @request POST:/api/oms/order/changeSku
   * @response `200` `CommonRespVoid` OK
   */
  export namespace OmsOrderChangeSku {
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
   * @name OmsOrderChangeWarehouseParamStaus
   * @summary 绑定发货仓库状态变更
   * @request POST:/api/oms/order/changeWarehouseParamStaus
   * @response `200` `CommonRespVoid` OK
   */
  export namespace OmsOrderChangeWarehouseParamStaus {
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
   * @name OmsOrderCreditLimitLockRetry
   * @summary 订单信用额度预占重试
   * @request POST:/api/oms/order/creditLimitLockRetry
   * @response `200` `CommonRespOrderBatchCommonResp` OK
   */
  export namespace OmsOrderCreditLimitLockRetry {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreditLimitLockRetryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespOrderBatchCommonResp;
  }

  /**
   * No description
   * @tags ERP订单
   * @name OmsOrderDeleteAtt
   * @summary 删除附件
   * @request GET:/api/oms/order/delete/att
   * @response `200` `CommonResp` OK
   */
  export namespace OmsOrderDeleteAtt {
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
   * @name OmsOrderDownUpdateAddressTemplate
   * @summary 下载批量修改地址模板
   * @request POST:/api/oms/order/downUpdateAddressTemplate
   * @response `200` `CommonRespString` OK
   */
  export namespace OmsOrderDownUpdateAddressTemplate {
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
   * @name OmsOrderDownUpdateAuthTemplate
   * @summary 下载编辑审核模板
   * @request POST:/api/oms/order/downUpdateAuthTemplate
   * @response `200` `CommonRespString` OK
   */
  export namespace OmsOrderDownUpdateAuthTemplate {
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
   * @name OmsOrderFbaRetry
   * @summary 异常重推fba
   * @request POST:/api/oms/order/fba/retry
   * @response `200` `CommonResp` OK
   */
  export namespace OmsOrderFbaRetry {
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
   * @name OmsOrderFreightRuleHit
   * @summary 运费规则命中
   * @request POST:/api/oms/order/freightRuleHit
   * @response `200` `CommonRespErpFlowDetailQueryResp` OK
   */
  export namespace OmsOrderFreightRuleHit {
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
   * @name OmsOrderMarkShipped
   * @summary 标记发货
   * @request POST:/api/oms/order/markShipped
   * @response `200` `CommonRespOrderBatchCommonResp` OK
   */
  export namespace OmsOrderMarkShipped {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OrderBatchCommonReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespOrderBatchCommonResp;
  }

  /**
   * No description
   * @tags ERP订单
   * @name OmsOrderModifyWarehouseLogistics
   * @summary 批量设置仓库物流
   * @request POST:/api/oms/order/modifyWarehouseLogistics
   * @response `200` `OrderBatchCommonResp` OK
   */
  export namespace OmsOrderModifyWarehouseLogistics {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ModifyWarehouseLogisticsReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = OrderBatchCommonResp;
  }

  /**
   * No description
   * @tags ERP订单
   * @name OmsOrderOrderAttachUpload
   * @summary 批量上传订单附件
   * @request POST:/api/oms/order/order/attach/upload
   * @response `200` `CommonResp` OK
   */
  export namespace OmsOrderOrderAttachUpload {
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
   * @name OmsOrderOrderDownload
   * @summary 导出订单
   * @request POST:/api/oms/order/order/download
   * @response `200` `CommonExportResp` OK
   */
  export namespace OmsOrderOrderDownload {
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
   * @name OmsOrderPreCheckInventory
   * @summary 预校验库存
   * @request POST:/api/oms/order/preCheckInventory
   * @response `200` `CommonRespErpOrderPreCheckInventoryResp` OK
   */
  export namespace OmsOrderPreCheckInventory {
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
   * @name OmsOrderPreCheckStock
   * @summary 批量下单到物流-预校验库存
   * @request POST:/api/oms/order/preCheckStock
   * @response `200` `CommonRespOrderPreCheckStockResp` OK
   */
  export namespace OmsOrderPreCheckStock {
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
   * @name OmsOrderQueryAllShipping
   * @summary 获取所有配送方式
   * @request GET:/api/oms/order/queryAllShipping
   * @response `200` `CommonRespListErpDictBean` OK
   */
  export namespace OmsOrderQueryAllShipping {
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
   * @name OmsOrderQueryAllWarehouse
   * @summary 获取所有发货仓库
   * @request GET:/api/oms/order/queryAllWarehouse
   * @response `200` `CommonRespListErpDictBean` OK
   */
  export namespace OmsOrderQueryAllWarehouse {
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
   * @name OmsOrderQueryBatchFba
   * @summary 查询批量转FBA详情
   * @request POST:/api/oms/order/queryBatchFba
   * @response `200` `OrderBatchFbaDetailResp` OK
   */
  export namespace OmsOrderQueryBatchFba {
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
   * @name OmsOrderQueryDetail
   * @summary 查询详情
   * @request GET:/api/oms/order/queryDetail
   * @response `200` `OrderDetailResp` OK
   */
  export namespace OmsOrderQueryDetail {
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
   * @name OmsOrderQueryList
   * @summary 查询列表
   * @request POST:/api/oms/order/queryList
   * @response `200` `OrderListQueryResp` OK
   */
  export namespace OmsOrderQueryList {
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
   * @name OmsOrderQueryListCount
   * @summary 查询列表统计
   * @request POST:/api/oms/order/queryListCount
   * @response `200` `OrderListQueryResp` OK
   */
  export namespace OmsOrderQueryListCount {
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
   * @name OmsOrderQueryOfflineParam
   * @summary TS-Offlinechannel订单仓库物流查询
   * @request GET:/api/oms/order/queryOfflineParam
   * @response `200` `CommonRespWarehouseShipResp` OK
   */
  export namespace OmsOrderQueryOfflineParam {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
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
   * @tags ERP订单
   * @name OmsOrderQueryStockAvailable
   * @summary 查询库存可用量
   * @request POST:/api/oms/order/queryStockAvailable
   * @response `200` `CommonRespOrderQueryStockAvailableResp` OK
   */
  export namespace OmsOrderQueryStockAvailable {
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
   * @name OmsOrderQueryStockList
   * @summary 查询单据库存是否满足
   * @request POST:/api/oms/order/queryStockList
   * @response `200` `CommonRespListErpOrderStockQueryResp` OK
   */
  export namespace OmsOrderQueryStockList {
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
   * @name OmsOrderQueryWarehouseLogistics
   * @summary 查询订单仓库物流
   * @request POST:/api/oms/order/queryWarehouseLogistics
   * @response `200` `(WarehouseDeliveryMapResp)[]` OK
   */
  export namespace OmsOrderQueryWarehouseLogistics {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = QueryWarehouseLogisticsReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = WarehouseDeliveryMapResp[];
  }

  /**
   * No description
   * @tags ERP订单
   * @name OmsOrderQueryWarehouseParamList
   * @summary 查询绑定发货仓库列表
   * @request POST:/api/oms/order/queryWarehouseParamList
   * @response `200` `ErpOrderWpQueryListResp` OK
   */
  export namespace OmsOrderQueryWarehouseParamList {
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
   * @name OmsOrderRePush
   * @summary 重新发货
   * @request GET:/api/oms/order/rePush
   * @response `200` `CommonRespVoid` OK
   */
  export namespace OmsOrderRePush {
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
   * @tags ERP订单
   * @name OmsOrderRecordQueryB2BOutboundSyncList
   * @summary 查询B2B出库同步记录列表
   * @request POST:/api/oms/order/record/queryB2bOutboundSyncList
   * @response `200` `OrderB2BOutboundResp` OK
   */
  export namespace OmsOrderRecordQueryB2BOutboundSyncList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OrderB2BOutboundReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = OrderB2BOutboundResp;
  }

  /**
   * No description
   * @tags ERP订单
   * @name OmsOrderRecordQueryJjPickTaskSyncList
   * @summary 查询拣货任务同步记录列表
   * @request POST:/api/oms/order/record/queryJjPickTaskSyncList
   * @response `200` `OrderJjPickTaskResp` OK
   */
  export namespace OmsOrderRecordQueryJjPickTaskSyncList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OrderJjPickTaskReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = OrderJjPickTaskResp;
  }

  /**
   * No description
   * @tags ERP订单
   * @name OmsOrderRecordQuerySalesOutboundOrderList
   * @summary 查询销售出库单列表
   * @request POST:/api/oms/order/record/querySalesOutboundOrderList
   * @response `200` `OrderSalesOutboundResp` OK
   */
  export namespace OmsOrderRecordQuerySalesOutboundOrderList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OrderSalesOutboundReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = OrderSalesOutboundResp;
  }

  /**
   * No description
   * @tags ERP订单
   * @name OmsOrderReferenceParams
   * @summary 引用特殊参数
   * @request GET:/api/oms/order/reference/params
   * @response `200` `ErpOrderReferenceParamsResp` OK
   */
  export namespace OmsOrderReferenceParams {
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
   * @name OmsOrderReferenceParamsBySkuCode
   * @summary 引用特殊参数-按skucode过滤
   * @request POST:/api/oms/order/reference/paramsBySkuCode
   * @response `200` `WarehouseDeliveryMapResp` OK
   */
  export namespace OmsOrderReferenceParamsBySkuCode {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ReferenceParamsDeliveryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = WarehouseDeliveryMapResp;
  }

  /**
   * No description
   * @tags ERP订单
   * @name OmsOrderSave
   * @summary 新增
   * @request POST:/api/oms/order/save
   * @response `200` `CommonRespString` OK
   */
  export namespace OmsOrderSave {
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
   * @name OmsOrderSaveDraft
   * @summary 新增草稿
   * @request POST:/api/oms/order/saveDraft
   * @response `200` `CommonRespString` OK
   */
  export namespace OmsOrderSaveDraft {
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
   * @name OmsOrderSaveItemGift
   * @summary 添加赠品
   * @request POST:/api/oms/order/saveItemGift
   * @response `200` `CommonRespString` OK
   */
  export namespace OmsOrderSaveItemGift {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OrderAddItemGiftReq;
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
   * @name OmsOrderSaveRemark
   * @summary 编辑备注
   * @request POST:/api/oms/order/saveRemark
   * @response `200` `CommonRespString` OK
   */
  export namespace OmsOrderSaveRemark {
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
   * @tags ERP订单
   * @name OmsOrderSubOrder
   * @summary 拆单
   * @request POST:/api/oms/order/subOrder
   * @response `200` `CommonRespVoid` OK
   */
  export namespace OmsOrderSubOrder {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OrderSubReq;
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
   * @name OmsOrderSubmitOutbound
   * @summary 提交出库
   * @request POST:/api/oms/order/submitOutbound
   * @response `200` `CommonRespOrderBatchCommonResp` OK
   */
  export namespace OmsOrderSubmitOutbound {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OrderBatchCommonReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespOrderBatchCommonResp;
  }

  /**
   * No description
   * @tags ERP订单
   * @name OmsOrderUpdate
   * @summary 编辑
   * @request POST:/api/oms/order/update
   * @response `200` `CommonRespString` OK
   */
  export namespace OmsOrderUpdate {
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
   * @name OmsOrderUpdateAddressUpload
   * @summary 上传修改订单地址
   * @request POST:/api/oms/order/update/address/upload
   * @response `200` `CommonResp` OK
   */
  export namespace OmsOrderUpdateAddressUpload {
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
   * @name OmsOrderUpdateAuthBatch
   * @summary 批量编辑审核
   * @request POST:/api/oms/order/updateAuthBatch
   * @response `200` `CommonResp` OK
   */
  export namespace OmsOrderUpdateAuthBatch {
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
   * @name OmsOrderUpdateCustomRemark
   * @summary 编辑客服备注
   * @request POST:/api/oms/order/updateCustomRemark
   * @response `200` `CommonResp` OK
   */
  export namespace OmsOrderUpdateCustomRemark {
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
   * @name OmsOrderUpdateMskuMatchInfo
   * @summary 更新MSKU配对信息
   * @request POST:/api/oms/order/updateMskuMatchInfo
   * @response `200` `CommonRespOrderUpdateMskuResp` OK
   */
  export namespace OmsOrderUpdateMskuMatchInfo {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UpdateMskuMatchInfoReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespOrderUpdateMskuResp;
  }

  /**
   * No description
   * @tags ERP订单
   * @name OmsOrderUpdateReceiveInfo
   * @summary 编辑收件人信息
   * @request POST:/api/oms/order/updateReceiveInfo
   * @response `200` `CommonRespString` OK
   */
  export namespace OmsOrderUpdateReceiveInfo {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OrderReceiveInfoSaveReq;
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
   * @name OmsOrderWarehouseRuleHit
   * @summary 分仓规则命中
   * @request POST:/api/oms/order/warehouseRuleHit
   * @response `200` `CommonRespListWarehouseRuleOutBean` OK
   */
  export namespace OmsOrderWarehouseRuleHit {
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
   * @tags 其他出库管理
   * @name OmsOutboundOrderCancel
   * @summary 作废
   * @request GET:/api/oms/outbound/order/cancel
   * @response `200` `CommonRespString` OK
   */
  export namespace OmsOutboundOrderCancel {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * 其他出库id
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
    export type ResponseBody = CommonRespString;
  }

  /**
   * No description
   * @tags 其他出库管理
   * @name OmsOutboundOrderQueryDetail
   * @summary 查询详情
   * @request GET:/api/oms/outbound/order/queryDetail
   * @response `200` `CommonRespOtherOutboundOrderDetailReq` OK
   */
  export namespace OmsOutboundOrderQueryDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * 其他出库id
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
    export type ResponseBody = CommonRespOtherOutboundOrderDetailReq;
  }

  /**
   * No description
   * @tags 其他出库管理
   * @name OmsOutboundOrderQueryList
   * @summary 查询列表
   * @request POST:/api/oms/outbound/order/queryList
   * @response `200` `OtherOutboundOrderListResp` OK
   */
  export namespace OmsOutboundOrderQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OtherOutboundOrderListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = OtherOutboundOrderListResp;
  }

  /**
   * No description
   * @tags 其他出库管理
   * @name OmsOutboundOrderSubmit
   * @summary 提交
   * @request POST:/api/oms/outbound/order/submit
   * @response `200` `CommonRespString` OK
   */
  export namespace OmsOutboundOrderSubmit {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OtherOutboundOrderAddReq;
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
   * @tags 采购退货换货单管理
   * @name OmsPurchaseReoConfirm
   * @summary 采购退货单换货单数据同步
   * @request POST:/api/oms/purchase/reo/confirm
   * @response `200` `CommonRespObject` OK
   */
  export namespace OmsPurchaseReoConfirm {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = WmsOutboundBackMessageBean;
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
   * @tags 采购退货换货单管理
   * @name OmsPurchaseReoReSync
   * @summary 采购退货单换货单数据同步
   * @request GET:/api/oms/purchase/reo/reSync
   * @response `200` `CommonRespObject` OK
   */
  export namespace OmsPurchaseReoReSync {
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
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags 采购退货换货单管理
   * @name OmsPurchaseReoSync
   * @summary 采购退货单换货单数据同步
   * @request POST:/api/oms/purchase/reo/sync
   * @response `200` `CommonRespObject` OK
   */
  export namespace OmsPurchaseReoSync {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PurchaseReturnOrderReq;
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
   * @tags 采购管理
   * @name OmsPurchaseSyncDeliveryBill
   * @summary 同步送货单
   * @request POST:/api/oms/purchase/syncDeliveryBill
   * @response `200` `CommonResp` OK
   */
  export namespace OmsPurchaseSyncDeliveryBill {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DeliveryBillReq;
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
   * @tags 采购管理
   * @name OmsPurchaseSyncPurchaseOrder
   * @summary 同步采购订单
   * @request POST:/api/oms/purchase/syncPurchaseOrder
   * @response `200` `CommonResp` OK
   */
  export namespace OmsPurchaseSyncPurchaseOrder {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PurchaseOrderReq;
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
   * @tags 规则管理
   * @name OmsRuleAdd
   * @summary 新增
   * @request POST:/api/oms/rule/add
   * @response `200` `CommonRespString` OK
   */
  export namespace OmsRuleAdd {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = RuleAddReq;
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
   * @tags 规则管理
   * @name OmsRuleBatchUpdateOrder
   * @summary 调整优先级
   * @request POST:/api/oms/rule/batchUpdateOrder
   * @response `200` `CommonRespString` OK
   */
  export namespace OmsRuleBatchUpdateOrder {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = string[];
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
   * @tags 规则-黑名单管理
   * @name OmsRuleBlacklistAdd
   * @summary 新增
   * @request POST:/api/oms/rule/blacklist/add
   * @response `200` `CommonRespString` OK
   */
  export namespace OmsRuleBlacklistAdd {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = RuleBlacklistAddReq;
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
   * @tags 规则-黑名单管理
   * @name OmsRuleBlacklistDelete
   * @summary 删除
   * @request POST:/api/oms/rule/blacklist/delete
   * @response `200` `CommonRespString` OK
   */
  export namespace OmsRuleBlacklistDelete {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = RuleBatchCommonReq;
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
   * @tags 规则-黑名单管理
   * @name OmsRuleBlacklistEnableDisable
   * @summary 启用/禁用
   * @request POST:/api/oms/rule/blacklist/enableDisable
   * @response `200` `CommonRespString` OK
   */
  export namespace OmsRuleBlacklistEnableDisable {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = RuleBlacklistEnableDisableReq;
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
   * @tags 规则-黑名单管理
   * @name OmsRuleBlacklistQueryDetail
   * @summary 查询详情
   * @request GET:/api/oms/rule/blacklist/queryDetail
   * @response `200` `CommonRespRuleBlacklistAddReq` OK
   */
  export namespace OmsRuleBlacklistQueryDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** ruleNo */
      ruleNo: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespRuleBlacklistAddReq;
  }

  /**
   * No description
   * @tags 规则-黑名单管理
   * @name OmsRuleBlacklistQueryList
   * @summary 查询列表
   * @request POST:/api/oms/rule/blacklist/queryList
   * @response `200` `RuleBlacklistListResp` OK
   */
  export namespace OmsRuleBlacklistQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = RuleBlacklistListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = RuleBlacklistListResp;
  }

  /**
   * No description
   * @tags 规则-黑名单管理
   * @name OmsRuleBlacklistUpdate
   * @summary 编辑
   * @request POST:/api/oms/rule/blacklist/update
   * @response `200` `CommonRespString` OK
   */
  export namespace OmsRuleBlacklistUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = RuleBlacklistAddReq;
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
   * @tags 规则管理
   * @name OmsRuleDelete
   * @summary 删除
   * @request POST:/api/oms/rule/delete
   * @response `200` `CommonRespString` OK
   */
  export namespace OmsRuleDelete {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = RuleBatchCommonReq;
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
   * @tags 规则管理
   * @name OmsRuleEnableDisable
   * @summary 启用/禁用
   * @request POST:/api/oms/rule/enableDisable
   * @response `200` `CommonRespString` OK
   */
  export namespace OmsRuleEnableDisable {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = RuleEnableDisableReq;
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
   * @tags 规则-一品多供发货管理
   * @name OmsRuleMultipleSuppliesAdd
   * @summary 新增
   * @request POST:/api/oms/rule/multiple/supplies/add
   * @response `200` `CommonRespString` OK
   */
  export namespace OmsRuleMultipleSuppliesAdd {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = RuleMultipleSuppliesAddReq;
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
   * @tags 规则-一品多供发货管理
   * @name OmsRuleMultipleSuppliesDelete
   * @summary 删除
   * @request POST:/api/oms/rule/multiple/supplies/delete
   * @response `200` `CommonRespString` OK
   */
  export namespace OmsRuleMultipleSuppliesDelete {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = RuleBatchCommonReq;
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
   * @tags 规则-一品多供发货管理
   * @name OmsRuleMultipleSuppliesEnableDisable
   * @summary 启用/禁用
   * @request POST:/api/oms/rule/multiple/supplies/enableDisable
   * @response `200` `CommonRespString` OK
   */
  export namespace OmsRuleMultipleSuppliesEnableDisable {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = RuleBlacklistEnableDisableReq;
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
   * @tags 规则-一品多供发货管理
   * @name OmsRuleMultipleSuppliesQueryDetail
   * @summary 查询详情
   * @request GET:/api/oms/rule/multiple/supplies/queryDetail
   * @response `200` `CommonRespRuleMultipleSuppliesAddReq` OK
   */
  export namespace OmsRuleMultipleSuppliesQueryDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** ruleNo */
      ruleNo: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespRuleMultipleSuppliesAddReq;
  }

  /**
   * No description
   * @tags 规则-一品多供发货管理
   * @name OmsRuleMultipleSuppliesQueryList
   * @summary 查询列表
   * @request POST:/api/oms/rule/multiple/supplies/queryList
   * @response `200` `RuleMultipleSuppliesListResp` OK
   */
  export namespace OmsRuleMultipleSuppliesQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = RuleMultipleSuppliesListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = RuleMultipleSuppliesListResp;
  }

  /**
   * No description
   * @tags 规则-一品多供发货管理
   * @name OmsRuleMultipleSuppliesUpdate
   * @summary 编辑
   * @request POST:/api/oms/rule/multiple/supplies/update
   * @response `200` `CommonRespString` OK
   */
  export namespace OmsRuleMultipleSuppliesUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = RuleMultipleSuppliesAddReq;
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
   * @tags 规则管理
   * @name OmsRuleQueryDetail
   * @summary 查询详情
   * @request GET:/api/oms/rule/queryDetail
   * @response `200` `CommonRespRuleDetailResp` OK
   */
  export namespace OmsRuleQueryDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 规则ID */
      ruleNo: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespRuleDetailResp;
  }

  /**
   * No description
   * @tags 规则管理
   * @name OmsRuleQueryList
   * @summary 查询列表
   * @request POST:/api/oms/rule/queryList
   * @response `200` `CommonRespRuleListResp` OK
   */
  export namespace OmsRuleQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = RuleListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespRuleListResp;
  }

  /**
   * No description
   * @tags 规则管理
   * @name OmsRuleQueryLog
   * @summary 查询日志
   * @request POST:/api/oms/rule/queryLog
   * @response `200` `CommonRespListRuleLogListResp` OK
   */
  export namespace OmsRuleQueryLog {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = RuleLogListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespListRuleLogListResp;
  }

  /**
   * No description
   * @tags 规则-税务规则
   * @name OmsRuleTaxQueryList
   * @summary 查询列表
   * @request POST:/api/oms/rule/tax/queryList
   * @response `200` `RuleTaxListResp` OK
   */
  export namespace OmsRuleTaxQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = RuleTaxListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = RuleTaxListResp;
  }

  /**
   * No description
   * @tags 规则-税务规则
   * @name OmsRuleTaxReset
   * @summary 更新
   * @request POST:/api/oms/rule/tax/reset
   * @response `200` `CommonRespObject` OK
   */
  export namespace OmsRuleTaxReset {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = RuleTaxListBatchUpdateReq;
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
   * @tags 规则管理
   * @name OmsRuleUpdate
   * @summary 编辑
   * @request POST:/api/oms/rule/update
   * @response `200` `CommonRespString` OK
   */
  export namespace OmsRuleUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = RuleAddReq;
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
   * @tags Shopify销售订单管理
   * @name OmsShopifyOrderDetail
   * @summary 详情
   * @request GET:/api/oms/shopify/order/detail
   * @response `200` `ShopifyOrderDetailResp` OK
   */
  export namespace OmsShopifyOrderDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** orderCode */
      orderCode: string;
      /** shop */
      shop: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ShopifyOrderDetailResp;
  }

  /**
   * No description
   * @tags Shopify销售订单管理
   * @name OmsShopifyOrderEditItemRemark
   * @summary 编辑订单行备注
   * @request POST:/api/oms/shopify/order/editItemRemark
   * @response `200` `CommonRespVoid` OK
   */
  export namespace OmsShopifyOrderEditItemRemark {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ShopifyOrderEditItemRemarkReq;
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
   * @tags Shopify销售订单管理
   * @name OmsShopifyOrderEditRemark
   * @summary 编辑备注
   * @request POST:/api/oms/shopify/order/editRemark
   * @response `200` `CommonRespVoid` OK
   */
  export namespace OmsShopifyOrderEditRemark {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ShopifyOrderEditRemarkReq;
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
   * @tags Shopify销售订单管理
   * @name OmsShopifyOrderExport
   * @summary 导出
   * @request POST:/api/oms/shopify/order/export
   * @response `200` `CommonExportResp` OK
   */
  export namespace OmsShopifyOrderExport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ShopifyOrderQueryListReq;
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
   * @tags Shopify销售订单管理
   * @name OmsShopifyOrderFetchOrder
   * @summary 手动拉取订单
   * @request POST:/api/oms/shopify/order/fetchOrder
   * @response `200` `CommonRespVoid` OK
   */
  export namespace OmsShopifyOrderFetchOrder {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ShopifyOrderFetchOrderReq;
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
   * @tags Shopify销售订单管理
   * @name OmsShopifyOrderQueryList
   * @summary 查询列表
   * @request POST:/api/oms/shopify/order/queryList
   * @response `200` `ShopifyOrderQueryListResp` OK
   */
  export namespace OmsShopifyOrderQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ShopifyOrderQueryListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ShopifyOrderQueryListResp;
  }

  /**
   * No description
   * @tags Shopify销售订单管理
   * @name OmsShopifyOrderRePushFoOrder
   * @summary 补推自发货
   * @request POST:/api/oms/shopify/order/rePushFoOrder
   * @response `200` `CommonRespOrderBatchCommonResp` OK
   */
  export namespace OmsShopifyOrderRePushFoOrder {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ShopifyOrderCommonReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespOrderBatchCommonResp;
  }

  /**
   * No description
   * @tags 调拨单
   * @name OmsTransferAbandon
   * @summary 作废
   * @request POST:/api/oms/transfer/abandon
   * @response `200` `CommonRespVoid` OK
   */
  export namespace OmsTransferAbandon {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TransferOrderCommonReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespVoid;
  }

  /**
   * @description 按列表顺序逐条作废，互不包在同一事务；任一条失败则中断
   * @tags 调拨单
   * @name OmsTransferAbandonBatch
   * @summary 批量作废
   * @request POST:/api/oms/transfer/abandon/batch
   * @response `200` `CommonRespVoid` OK
   */
  export namespace OmsTransferAbandonBatch {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TransferOrderBatchAbandonReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespVoid;
  }

  /**
   * @description 批量将「待确认」更新为「已确认」(transfer_status=110)，与「待拣货出库」区分；入参为调拨单主键 id 列表
   * @tags 调拨单
   * @name OmsTransferConfirm
   * @summary 确认
   * @request POST:/api/oms/transfer/confirm
   * @response `200` `CommonRespVoid` OK
   */
  export namespace OmsTransferConfirm {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TransferOrderConfirmReq;
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
   * @tags 调拨单
   * @name OmsTransferExport
   * @summary 导出
   * @request POST:/api/oms/transfer/export
   * @response `200` `CommonExportResp` OK
   */
  export namespace OmsTransferExport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TransferOrderExportReq;
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
   * @name OmsTransferForceComplete
   * @summary 强制完成
   * @request POST:/api/oms/transfer/forceComplete
   * @response `200` `CommonRespVoid` OK
   */
  export namespace OmsTransferForceComplete {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TransferOrderCommonReq;
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
   * @tags 调拨单
   * @name OmsTransferInbound
   * @summary 入库
   * @request POST:/api/oms/transfer/inbound
   * @response `200` `CommonRespVoid` OK
   */
  export namespace OmsTransferInbound {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TransferOrderInboundReq;
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
   * @tags 调拨计划单
   * @name OmsTransferPlanAbandon
   * @summary 作废
   * @request POST:/api/oms/transfer/plan/abandon
   * @response `200` `CommonRespVoid` OK
   */
  export namespace OmsTransferPlanAbandon {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TransferPlanOrderCodeReq;
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
   * @tags 调拨计划单
   * @name OmsTransferPlanAudit
   * @summary 审核（待审核状态下可提交每行审核数量、调出仓）
   * @request POST:/api/oms/transfer/plan/audit
   * @response `200` `CommonRespVoid` OK
   */
  export namespace OmsTransferPlanAudit {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TransferPlanOrderAuditReq;
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
   * @tags 调拨计划单
   * @name OmsTransferPlanBatchAbandon
   * @summary 批量作废
   * @request POST:/api/oms/transfer/plan/batchAbandon
   * @response `200` `CommonRespVoid` OK
   */
  export namespace OmsTransferPlanBatchAbandon {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TransferPlanOrderBatchCodeReq;
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
   * @tags 调拨计划单
   * @name OmsTransferPlanExport
   * @summary 导出（列表条件或勾选；详情维度见 exportType）
   * @request POST:/api/oms/transfer/plan/export
   * @response `200` `CommonExportResp` OK
   */
  export namespace OmsTransferPlanExport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TransferPlanOrderExportReq;
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
   * @tags 调拨计划单
   * @name OmsTransferPlanQueryDetail
   * @summary 详情
   * @request POST:/api/oms/transfer/plan/queryDetail
   * @response `200` `TransferPlanOrderDetailResp` OK
   */
  export namespace OmsTransferPlanQueryDetail {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TransferPlanOrderCodeReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = TransferPlanOrderDetailResp;
  }

  /**
   * No description
   * @tags 调拨计划单
   * @name OmsTransferPlanQueryItemList
   * @summary 明细列表
   * @request POST:/api/oms/transfer/plan/queryItemList
   * @response `200` `TransferPlanOrderItemListResp` OK
   */
  export namespace OmsTransferPlanQueryItemList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TransferPlanOrderItemReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = TransferPlanOrderItemListResp;
  }

  /**
   * No description
   * @tags 调拨计划单
   * @name OmsTransferPlanQueryList
   * @summary 列表
   * @request POST:/api/oms/transfer/plan/queryList
   * @response `200` `TransferPlanOrderListQueryResp` OK
   */
  export namespace OmsTransferPlanQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TransferPlanOrderListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = TransferPlanOrderListQueryResp;
  }

  /**
   * No description
   * @tags 调拨计划单
   * @name OmsTransferPlanQueryOutStock
   * @summary 调出仓可用库存（供应链 SKU）
   * @request POST:/api/oms/transfer/plan/queryOutStock
   * @response `200` `CommonRespTransferPlanOrderOutStockResp` OK
   */
  export namespace OmsTransferPlanQueryOutStock {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TransferPlanOrderOutStockReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespTransferPlanOrderOutStockResp;
  }

  /**
   * No description
   * @tags 调拨计划单
   * @name OmsTransferPlanSave
   * @summary 保存
   * @request POST:/api/oms/transfer/plan/save
   * @response `200` `CommonRespString` OK
   */
  export namespace OmsTransferPlanSave {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TransferPlanOrderSaveReq;
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
   * @tags 调拨计划单
   * @name OmsTransferPlanSubmit
   * @summary 提交
   * @request POST:/api/oms/transfer/plan/submit
   * @response `200` `CommonRespVoid` OK
   */
  export namespace OmsTransferPlanSubmit {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TransferPlanOrderSaveReq;
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
   * @tags 调拨单
   * @name OmsTransferPush
   * @summary 推送
   * @request POST:/api/oms/transfer/push
   * @response `200` `CommonRespBoolean` OK
   */
  export namespace OmsTransferPush {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TransferOrderCommonReq;
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
   * @tags 调拨单
   * @name OmsTransferPushXy
   * @summary 推送兴运
   * @request POST:/api/oms/transfer/pushXy
   * @response `200` `CommonRespOrderBatchAuthResp` OK
   */
  export namespace OmsTransferPushXy {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TransferOrderPushReq;
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
   * @name OmsTransferQueryDetail
   * @summary 调拨单详情
   * @request POST:/api/oms/transfer/queryDetail
   * @response `200` `TransferOrderDetailQueryResp` OK
   */
  export namespace OmsTransferQueryDetail {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TransferOrderCommonReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = TransferOrderDetailQueryResp;
  }

  /**
   * No description
   * @tags 调拨单
   * @name OmsTransferQueryList
   * @summary 调拨单列表
   * @request POST:/api/oms/transfer/queryList
   * @response `200` `TransferOrderListQueryResp` OK
   */
  export namespace OmsTransferQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TransferOrderListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = TransferOrderListQueryResp;
  }

  /**
   * No description
   * @tags 调拨单
   * @name OmsTransferQueryWarehouse
   * @summary 调拨仓库
   * @request GET:/api/oms/transfer/queryWarehouse
   * @response `200` `CommonRespListWarehouseBean` OK
   */
  export namespace OmsTransferQueryWarehouse {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 调拨仓库类型：IN -- 调入；OUT -- 调出 */
      type: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespListWarehouseBean;
  }

  /**
   * No description
   * @tags 调拨单
   * @name OmsTransferRemark
   * @summary 备注
   * @request POST:/api/oms/transfer/remark
   * @response `200` `CommonRespVoid` OK
   */
  export namespace OmsTransferRemark {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TransferOrderRemarkReq;
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
   * @tags 调拨单
   * @name OmsTransferSave
   * @summary 新增
   * @request POST:/api/oms/transfer/save
   * @response `200` `CommonRespVoid` OK
   */
  export namespace OmsTransferSave {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TransferOrderSaveReq;
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
   * @tags 调拨单
   * @name OmsTransferStatusStatistics
   * @summary 调拨单状态统计
   * @request GET:/api/oms/transfer/status/statistics
   * @response `200` `TransferOrderStatusStatisticsResp` OK
   */
  export namespace OmsTransferStatusStatistics {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = TransferOrderStatusStatisticsResp;
  }

  /**
   * No description
   * @tags 调拨单
   * @name OmsTransferSubmit
   * @summary 确认提交
   * @request POST:/api/oms/transfer/submit
   * @response `200` `CommonRespVoid` OK
   */
  export namespace OmsTransferSubmit {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TransferOrderSubmitReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespVoid;
  }

  /**
   * @description 按列表顺序逐条提交，每条单独事务；任一条失败则中断且已成功的条目不回滚
   * @tags 调拨单
   * @name OmsTransferSubmitBatch
   * @summary 批量确认提交
   * @request POST:/api/oms/transfer/submit/batch
   * @response `200` `CommonRespVoid` OK
   */
  export namespace OmsTransferSubmitBatch {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TransferOrderBatchSubmitReq;
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
   * @tags 调拨单
   * @name OmsTransferUploadAttachment
   * @summary 附件上传
   * @request POST:/api/oms/transfer/uploadAttachment
   * @response `200` `CommonRespVoid` OK
   */
  export namespace OmsTransferUploadAttachment {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TransferOrderUploadAttachmentReq;
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
   * @tags 销售出库单
   * @name OmsWarehouseOrderAssemblePackageList
   * @summary 获取自动填写数据
   * @request POST:/api/oms/warehouse/order/assemblePackageList
   * @response `200` `CommonRespGucangPackageListResp` OK
   */
  export namespace OmsWarehouseOrderAssemblePackageList {
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
   * @tags 销售出库单
   * @name OmsWarehouseOrderAttachUpload
   * @summary 批量上传订单附件
   * @request POST:/api/oms/warehouse/order/attach/upload
   * @response `200` `CommonResp` OK
   */
  export namespace OmsWarehouseOrderAttachUpload {
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
   * @tags 销售出库单
   * @name OmsWarehouseOrderBatchPush
   * @summary 批量推送积加
   * @request POST:/api/oms/warehouse/order/batchPush
   * @response `200` `CommonRespOrderBatchCommonResp` OK
   */
  export namespace OmsWarehouseOrderBatchPush {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OrderBatchCommonReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespOrderBatchCommonResp;
  }

  /**
   * No description
   * @tags 销售出库单
   * @name OmsWarehouseOrderCancelOutbound
   * @summary 取消出库
   * @request POST:/api/oms/warehouse/order/cancelOutbound
   * @response `200` `CommonRespOrderBatchCommonResp` OK
   */
  export namespace OmsWarehouseOrderCancelOutbound {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OrderBatchCommonReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespOrderBatchCommonResp;
  }

  /**
   * No description
   * @tags 销售出库单
   * @name OmsWarehouseOrderConfirmOutbound
   * @summary 确认出库
   * @request POST:/api/oms/warehouse/order/confirmOutbound
   * @response `200` `OrderBatchCommonResp` OK
   */
  export namespace OmsWarehouseOrderConfirmOutbound {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OrderBatchCommonReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = OrderBatchCommonResp;
  }

  /**
   * No description
   * @tags 销售出库单
   * @name OmsWarehouseOrderCutAtt
   * @summary 剪裁订单附件
   * @request POST:/api/oms/warehouse/order/cutAtt
   * @response `200` `CommonResp` OK
   */
  export namespace OmsWarehouseOrderCutAtt {
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
   * @tags 销售出库单
   * @name OmsWarehouseOrderCutAttBatch
   * @summary 剪裁订单附件-批量
   * @request POST:/api/oms/warehouse/order/cutAttBatch
   * @response `200` `CommonResp` OK
   */
  export namespace OmsWarehouseOrderCutAttBatch {
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
   * @tags 销售出库单
   * @name OmsWarehouseOrderCutGuPdf
   * @summary 剪裁谷仓调拨单PDF
   * @request POST:/api/oms/warehouse/order/cutGuPdf
   * @response `200` `UploadReq` OK
   */
  export namespace OmsWarehouseOrderCutGuPdf {
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
   * @tags 销售出库单
   * @name OmsWarehouseOrderDownMarkDeliveryTemplate
   * @summary 下载谷仓模板
   * @request POST:/api/oms/warehouse/order/downMarkDeliveryTemplate
   * @response `200` `CommonRespString` OK
   */
  export namespace OmsWarehouseOrderDownMarkDeliveryTemplate {
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
   * @tags 销售出库单
   * @name OmsWarehouseOrderExport
   * @summary 导出
   * @request POST:/api/oms/warehouse/order/export
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace OmsWarehouseOrderExport {
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
   * @tags 销售出库单
   * @name OmsWarehouseOrderExportFeeDetail
   * @summary 下载费用明细
   * @request POST:/api/oms/warehouse/order/exportFeeDetail
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace OmsWarehouseOrderExportFeeDetail {
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
   * @tags 销售出库单
   * @name OmsWarehouseOrderExportGcWarehouseService
   * @summary 下载谷仓包装信息
   * @request POST:/api/oms/warehouse/order/exportGcWarehouseService
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace OmsWarehouseOrderExportGcWarehouseService {
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
   * @tags 销售出库单
   * @name OmsWarehouseOrderExportReceiveDetail
   * @summary 下载领用单信息
   * @request POST:/api/oms/warehouse/order/exportReceiveDetail
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace OmsWarehouseOrderExportReceiveDetail {
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
   * @tags 销售出库单
   * @name OmsWarehouseOrderImportGcWarehouseService
   * @summary 导入谷仓包装信息
   * @request POST:/api/oms/warehouse/order/importGcWarehouseService
   * @response `200` `GuCangTransferSlipOrderBeanWarehouseService` OK
   */
  export namespace OmsWarehouseOrderImportGcWarehouseService {
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
   * @tags 销售出库单
   * @name OmsWarehouseOrderMarkShipped
   * @summary 标记发货
   * @request POST:/api/oms/warehouse/order/markShipped
   * @response `200` `CommonRespBoolean` OK
   */
  export namespace OmsWarehouseOrderMarkShipped {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OrderMarkDeliveryReq;
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
   * @tags 销售出库单
   * @name OmsWarehouseOrderPlaceOrder
   * @summary 下单
   * @request POST:/api/oms/warehouse/order/placeOrder
   * @response `200` `CommonRespVoid` OK
   */
  export namespace OmsWarehouseOrderPlaceOrder {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = WoPlaceOrderReq;
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
   * @tags 销售出库单
   * @name OmsWarehouseOrderPushGcFba
   * @summary 推送FBA
   * @request POST:/api/oms/warehouse/order/pushGcFba
   * @response `200` `OrderBatchAuthResp` OK
   */
  export namespace OmsWarehouseOrderPushGcFba {
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
   * @tags 销售出库单
   * @name OmsWarehouseOrderPushGcTransferSlipOrder
   * @summary 推送谷仓-其他调拨单
   * @request POST:/api/oms/warehouse/order/pushGcTransferSlipOrder
   * @response `200` `CommonResp` OK
   */
  export namespace OmsWarehouseOrderPushGcTransferSlipOrder {
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
   * @tags 销售出库单
   * @name OmsWarehouseOrderQueryBumperList
   * @summary 出库-仓配订单装箱板信息列表
   * @request POST:/api/oms/warehouse/order/queryBumperList
   * @response `200` `CommonRespWarehouseBumperPageResp` OK
   */
  export namespace OmsWarehouseOrderQueryBumperList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = WarehouseBumperQueryReq;
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
   * @tags 销售出库单
   * @name OmsWarehouseOrderQueryDeliveryOrderList
   * @summary 出库-仓配订单提货单列表
   * @request GET:/api/oms/warehouse/order/queryDeliveryOrderList
   * @response `200` `CommonRespWarehouseDeliveryOrderResp` OK
   */
  export namespace OmsWarehouseOrderQueryDeliveryOrderList {
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
   * @tags 销售出库单
   * @name OmsWarehouseOrderQueryDetail
   * @summary 查询详情
   * @request GET:/api/oms/warehouse/order/queryDetail
   * @response `200` `WarehouseOrderDetailResp` OK
   */
  export namespace OmsWarehouseOrderQueryDetail {
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
   * @tags 销售出库单
   * @name OmsWarehouseOrderQueryList
   * @summary 查询列表
   * @request POST:/api/oms/warehouse/order/queryList
   * @response `200` `WarehouseOrderListQueryResp` OK
   */
  export namespace OmsWarehouseOrderQueryList {
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
   * @tags 销售出库单
   * @name OmsWarehouseOrderQueryLogisticsTrajectoryList
   * @summary 出库-仓配订单物流轨迹列表
   * @request GET:/api/oms/warehouse/order/queryLogisticsTrajectoryList
   * @response `200` `CommonRespWarehouseLogisticsTrajectoryResp` OK
   */
  export namespace OmsWarehouseOrderQueryLogisticsTrajectoryList {
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
   * @tags 销售出库单
   * @name OmsWarehouseOrderQueryPlaceOrder
   * @summary 下单查询
   * @request GET:/api/oms/warehouse/order/queryPlaceOrder
   * @response `200` `CommonRespWoPlaceOrderResp` OK
   */
  export namespace OmsWarehouseOrderQueryPlaceOrder {
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
    export type ResponseBody = CommonRespWoPlaceOrderResp;
  }

  /**
   * No description
   * @tags 销售出库单
   * @name OmsWarehouseOrderQueryPushGcTransferSlipOrderEnums
   * @summary 推送谷仓-其他调拨单-特殊枚举获取
   * @request GET:/api/oms/warehouse/order/queryPushGcTransferSlipOrderEnums
   * @response `200` `QueryPushGcTransferSlipOrderEnumsResp` OK
   */
  export namespace OmsWarehouseOrderQueryPushGcTransferSlipOrderEnums {
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
   * @tags 销售出库单
   * @name OmsWarehouseOrderSaveRemark
   * @summary 保存备注
   * @request POST:/api/oms/warehouse/order/saveRemark
   * @response `200` `CommonRespString` OK
   */
  export namespace OmsWarehouseOrderSaveRemark {
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
   * @tags 销售出库单
   * @name OmsWarehouseOrderShippingMarkGenerate
   * @summary 批量生成箱唛
   * @request POST:/api/oms/warehouse/order/shippingMark/generate
   * @response `200` `CommonRespWoShippingMarkGenerateResp` OK
   */
  export namespace OmsWarehouseOrderShippingMarkGenerate {
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
   * @tags 销售出库单
   * @name OmsWarehouseOrderShippingMarkParse
   * @summary 批量解析箱唛
   * @request POST:/api/oms/warehouse/order/shippingMark/parse
   * @response `200` `CommonRespWoShippingMarkParseResp` OK
   */
  export namespace OmsWarehouseOrderShippingMarkParse {
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
   * No description
   * @tags 销售出库单
   * @name OmsWarehouseOrderSubmitOutbound
   * @summary 提交出库
   * @request POST:/api/oms/warehouse/order/submitOutbound
   * @response `200` `CommonRespOrderBatchCommonResp` OK
   */
  export namespace OmsWarehouseOrderSubmitOutbound {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OrderBatchCommonReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespOrderBatchCommonResp;
  }

  /**
   * @description 主动触发同步谷仓订单数据
   * @tags 销售出库单
   * @name OmsWarehouseOrderSyncGcOrderInfo
   * @summary 手动同步谷仓订单物流附件信息
   * @request POST:/api/oms/warehouse/order/syncGcOrderInfo
   * @response `200` `CommonRespVoid` OK
   */
  export namespace OmsWarehouseOrderSyncGcOrderInfo {
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
   * @tags 销售出库单
   * @name OmsWarehouseOrderUpdateTrackingNum
   * @summary 更新物流跟踪号
   * @request POST:/api/oms/warehouse/order/update/trackingNum
   * @response `200` `CommonRespString` OK
   */
  export namespace OmsWarehouseOrderUpdateTrackingNum {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = WoUpdateTrackingNumReq;
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
   * @name OmsWarehouseOrderUploadMarkShipped
   * @summary 上传批量标发
   * @request POST:/api/oms/warehouse/order/upload/markShipped
   * @response `200` `ImportDataResp` OK
   */
  export namespace OmsWarehouseOrderUploadMarkShipped {
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
   * @tags 销售出库单
   * @name OmsWarehouseOrderUploadGuCangFile
   * @summary 推送谷仓-上传谷仓附件
   * @request POST:/api/oms/warehouse/order/uploadGuCangFile
   * @response `200` `GcUploadResp` OK
   */
  export namespace OmsWarehouseOrderUploadGuCangFile {
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
}
