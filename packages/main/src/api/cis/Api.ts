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
  AvailableInventoryQueryListReq,
  AvailableInventoryQueryListResp,
  CommonExportResp,
  CommonResp,
  CommonRespObject,
  CommonRespPoolDetailResp,
  CommonRespPoolQueryListResp,
  CommonRespTaskConfigDetailResp,
  ImportDataReq,
  ImportDataResp,
  ImportTemplateQueryResp,
  InventoryLedgerQueryListReq,
  InventoryLedgerQueryListResp,
  InventoryQueryListReq,
  InventoryQueryListResp,
  InventorySnapDiffErpFluxQueryListReq,
  InventorySnapDiffErpFluxQueryListResp,
  InventorySnapDiffErpJijiaQueryListReq,
  InventorySnapDiffErpJijiaQueryListResp,
  InventorySnapQueryListReq,
  InventorySnapQueryListResp,
  PoolAuthorityListItem,
  PoolAuthorityQueryListReq,
  PoolAuthorityQueryListResp,
  PoolAuthoritySaveReq,
  PoolListItem,
  PoolQueryListReq,
  PoolSaveReq,
  ReservedInventoryQueryListReq,
  ReservedInventoryQueryListResp,
  ShopifyInventoryLevelDetailResp,
  ShopifyInventoryLevelQueryReq,
  ShopifyInventoryLevelQueryResp,
  ShopifyInventoryLevelSyncReq,
  ShopifyInventoryLevelUpdateReq,
  ShopifyLocationQueryReq,
  ShopifyLocationQueryResp,
  ShopifyLocationRelationSaveReq,
  ShopifyLocationWarehouseRelationItem,
  ShopifyShipSkuQueryReq,
  ShopifyShipSkuQueryResp,
  SnPageListQueryReq,
  SnPageListQueryResp,
  TaskConfigQueryListReq,
  TaskConfigQueryListResp,
  TaskPurchaseItemQueryListReq,
  TaskPurchaseItemQueryListResp,
  TaskPurchaseQueryListReq,
  TaskPurchaseQueryListResp,
  TpwStorageAdjustFlowListResp,
  TpwStorageAdjustFlowReq,
  TpwStorageListQueryReq,
  TpwStorageListResp,
  TpwStorageVarianceListReq,
  TpwStorageVarianceListResp,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags 导入模块
   * @name CisCommonFileImportData
   * @summary 数据导入
   * @request POST:/api/cis/common/file/importData
   * @response `200` `ImportDataResp` OK
   */
  cisCommonFileImportData = (req: ImportDataReq, params: RequestParams = {}) =>
    this.request<ImportDataResp, any>({
      path: `/api/cis/common/file/importData`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 导入模块
   * @name CisCommonFileQueryImportTemplate
   * @summary 获取导入模板
   * @request GET:/api/cis/common/file/queryImportTemplate
   * @response `200` `ImportTemplateQueryResp` OK
   */
  cisCommonFileQueryImportTemplate = (
    query: {
      /** 场景  amazon_ticket-亚马逊券码导入 product_spu-商品spu导入 product_sku-商品sku导入 platform_sku-映射sku导入 ly_order-领用订单导入 */
      importScene: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<ImportTemplateQueryResp, any>({
      path: `/api/cis/common/file/queryImportTemplate`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存
   * @name CisInventoryAvailableExport
   * @summary 可售库存导出
   * @request POST:/api/cis/inventory/availableExport
   * @response `200` `CommonExportResp` OK
   */
  cisInventoryAvailableExport = (req: AvailableInventoryQueryListReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/cis/inventory/availableExport`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存
   * @name CisInventoryAvailableQueryList
   * @summary 可售库存查询列表
   * @request POST:/api/cis/inventory/availableQueryList
   * @response `200` `AvailableInventoryQueryListResp` OK
   */
  cisInventoryAvailableQueryList = (
    req: AvailableInventoryQueryListReq,
    params: RequestParams = {},
  ) =>
    this.request<AvailableInventoryQueryListResp, any>({
      path: `/api/cis/inventory/availableQueryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存
   * @name CisInventoryExport
   * @summary 库存导出
   * @request POST:/api/cis/inventory/export
   * @response `200` `CommonExportResp` OK
   */
  cisInventoryExport = (req: InventoryQueryListReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/cis/inventory/export`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存记账
   * @name CisInventoryLedgerExport
   * @summary 库存记账导出
   * @request POST:/api/cis/inventory/ledger/export
   * @response `200` `CommonExportResp` OK
   */
  cisInventoryLedgerExport = (req: InventoryLedgerQueryListReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/cis/inventory/ledger/export`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存记账
   * @name CisInventoryLedgerQueryList
   * @summary 库存记账查询列表
   * @request POST:/api/cis/inventory/ledger/queryList
   * @response `200` `InventoryLedgerQueryListResp` OK
   */
  cisInventoryLedgerQueryList = (req: InventoryLedgerQueryListReq, params: RequestParams = {}) =>
    this.request<InventoryLedgerQueryListResp, any>({
      path: `/api/cis/inventory/ledger/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存
   * @name CisInventoryQueryList
   * @summary 库存查询列表
   * @request POST:/api/cis/inventory/queryList
   * @response `200` `InventoryQueryListResp` OK
   */
  cisInventoryQueryList = (req: InventoryQueryListReq, params: RequestParams = {}) =>
    this.request<InventoryQueryListResp, any>({
      path: `/api/cis/inventory/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags shopify库存
   * @name CisInventoryShopifyLevelDetail
   * @summary shopify库存-库存明细详情（主表+明细子记录+推送日志子记录）
   * @request GET:/api/cis/inventory/shopify/level/detail
   * @response `200` `ShopifyInventoryLevelDetailResp` OK
   */
  cisInventoryShopifyLevelDetail = (
    query: {
      /**
       * inventoryItemId
       * @format int64
       */
      inventoryItemId: number;
      /** locationId */
      locationId: string;
      /** 店铺账号（与 ShopInfoEnum.userAccount 一致） */
      shopAccount: string;
      /** 明细是否升序，默认降序 */
      warehouseSortAsc?: boolean;
      /** 明细排序字段：inStockAndTransit、inTransitQuantity、reservedQuantity、availableQuantity */
      warehouseSortField?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<ShopifyInventoryLevelDetailResp, any>({
      path: `/api/cis/inventory/shopify/level/detail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags shopify库存
   * @name CisInventoryShopifyLevelExport
   * @summary shopify库存-库存明细导出（列表列+明细仓库/库龄展开）
   * @request POST:/api/cis/inventory/shopify/level/export
   * @response `200` `CommonExportResp` OK
   */
  cisInventoryShopifyLevelExport = (
    req: ShopifyInventoryLevelQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/cis/inventory/shopify/level/export`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags shopify库存
   * @name CisInventoryShopifyLevelList
   * @summary shopify库存-库存明细列表
   * @request POST:/api/cis/inventory/shopify/level/list
   * @response `200` `ShopifyInventoryLevelQueryResp` OK
   */
  cisInventoryShopifyLevelList = (req: ShopifyInventoryLevelQueryReq, params: RequestParams = {}) =>
    this.request<ShopifyInventoryLevelQueryResp, any>({
      path: `/api/cis/inventory/shopify/level/list`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags shopify库存
   * @name CisInventoryShopifyLevelSync
   * @summary shopify库存-同步库存
   * @request POST:/api/cis/inventory/shopify/level/sync
   * @response `200` `void` OK
   */
  cisInventoryShopifyLevelSync = (req: ShopifyInventoryLevelSyncReq, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/cis/inventory/shopify/level/sync`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags shopify库存
   * @name CisInventoryShopifyLevelUpdateConfig
   * @summary shopify库存-修改level配置（跟踪状态/最大超售量/缺货售卖/自动同步库存），按需传参
   * @request POST:/api/cis/inventory/shopify/level/update/config
   * @response `200` `void` OK
   */
  cisInventoryShopifyLevelUpdateConfig = (
    req: ShopifyInventoryLevelUpdateReq,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/cis/inventory/shopify/level/update/config`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags shopify库存
   * @name CisInventoryShopifyLocationLocationSync
   * @summary shopify库存地点-手动同步关系；传 shopAccount 仅同步该店，不传则按配置同步全部店铺
   * @request POST:/api/cis/inventory/shopify/location/location/sync
   * @response `200` `void` OK
   */
  cisInventoryShopifyLocationLocationSync = (
    query?: {
      /** shopAccount */
      shopAccount?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/cis/inventory/shopify/location/location/sync`,
      method: 'POST',
      query: query,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags shopify库存
   * @name CisInventoryShopifyLocationQueryList
   * @summary shopify库存地点-地址列表查询
   * @request POST:/api/cis/inventory/shopify/location/queryList
   * @response `200` `ShopifyLocationQueryResp` OK
   */
  cisInventoryShopifyLocationQueryList = (
    req: ShopifyLocationQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<ShopifyLocationQueryResp, any>({
      path: `/api/cis/inventory/shopify/location/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags shopify库存
   * @name CisInventoryShopifyLocationRelationQueryListSave
   * @summary shopify库存地点-仓库映射关系保存
   * @request POST:/api/cis/inventory/shopify/location/relation/queryList/save
   * @response `200` `void` OK
   */
  cisInventoryShopifyLocationRelationQueryListSave = (
    req: ShopifyLocationRelationSaveReq,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/cis/inventory/shopify/location/relation/queryList/save`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags shopify库存
   * @name CisInventoryShopifyLocationRelationQueryList
   * @summary shopify库存地点-仓库映射关系列表
   * @request GET:/api/cis/inventory/shopify/location/relation/queryList/{locationId}
   * @response `200` `(ShopifyLocationWarehouseRelationItem)[]` OK
   */
  cisInventoryShopifyLocationRelationQueryList = (locationId: string, params: RequestParams = {}) =>
    this.request<ShopifyLocationWarehouseRelationItem[], any>({
      path: `/api/cis/inventory/shopify/location/relation/queryList/${locationId}`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags shopify库存
   * @name CisInventoryShopifyProductSync
   * @summary shopify库存-同步sku列表
   * @request GET:/api/cis/inventory/shopify/product/sync
   * @response `200` `void` OK
   */
  cisInventoryShopifyProductSync = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/cis/inventory/shopify/product/sync`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags shopify库存
   * @name CisInventoryShopifyShipSkuQueryList
   * @summary shopify库存-可发货SKU列表
   * @request POST:/api/cis/inventory/shopify/shipSku/queryList
   * @response `200` `ShopifyShipSkuQueryResp` OK
   */
  cisInventoryShopifyShipSkuQueryList = (req: ShopifyShipSkuQueryReq, params: RequestParams = {}) =>
    this.request<ShopifyShipSkuQueryResp, any>({
      path: `/api/cis/inventory/shopify/shipSku/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存SN
   * @name CisInventorySnExport
   * @summary 库存SN导出
   * @request POST:/api/cis/inventory/sn/export
   * @response `200` `CommonExportResp` OK
   */
  cisInventorySnExport = (req: SnPageListQueryReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/cis/inventory/sn/export`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存SN
   * @name CisInventorySnQueryList
   * @summary 库存SN查询列表
   * @request POST:/api/cis/inventory/sn/queryList
   * @response `200` `SnPageListQueryResp` OK
   */
  cisInventorySnQueryList = (req: SnPageListQueryReq, params: RequestParams = {}) =>
    this.request<SnPageListQueryResp, any>({
      path: `/api/cis/inventory/sn/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存差异
   * @name CisInventorySnapExportQueryList
   * @summary 库存快照列表-导出
   * @request POST:/api/cis/inventory/snap/exportQueryList
   * @response `200` `CommonExportResp` OK
   */
  cisInventorySnapExportQueryList = (req: InventorySnapQueryListReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/cis/inventory/snap/exportQueryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存差异
   * @name CisInventorySnapQueryDiffErpFluxList
   * @summary 库存快照差异列表erp-flux
   * @request POST:/api/cis/inventory/snap/queryDiffErpFluxList
   * @response `200` `InventorySnapDiffErpFluxQueryListResp` OK
   */
  cisInventorySnapQueryDiffErpFluxList = (
    req: InventorySnapDiffErpFluxQueryListReq,
    params: RequestParams = {},
  ) =>
    this.request<InventorySnapDiffErpFluxQueryListResp, any>({
      path: `/api/cis/inventory/snap/queryDiffErpFluxList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存差异
   * @name CisInventorySnapQueryDiffErpJijiaList
   * @summary 库存快照差异列表erp-jijia
   * @request POST:/api/cis/inventory/snap/queryDiffErpJijiaList
   * @response `200` `InventorySnapDiffErpJijiaQueryListResp` OK
   */
  cisInventorySnapQueryDiffErpJijiaList = (
    req: InventorySnapDiffErpJijiaQueryListReq,
    params: RequestParams = {},
  ) =>
    this.request<InventorySnapDiffErpJijiaQueryListResp, any>({
      path: `/api/cis/inventory/snap/queryDiffErpJijiaList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存差异
   * @name CisInventorySnapQueryList
   * @summary 库存快照列表
   * @request POST:/api/cis/inventory/snap/queryList
   * @response `200` `InventorySnapQueryListResp` OK
   */
  cisInventorySnapQueryList = (req: InventorySnapQueryListReq, params: RequestParams = {}) =>
    this.request<InventorySnapQueryListResp, any>({
      path: `/api/cis/inventory/snap/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存差异
   * @name CisInventorySnapReGenerate
   * @summary 库存快照(差异)重新生成
   * @request POST:/api/cis/inventory/snap/reGenerate
   * @response `200` `CommonResp` OK
   */
  cisInventorySnapReGenerate = (params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/cis/inventory/snap/reGenerate`,
      method: 'POST',
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存
   * @name CisInventorySupplySkuReservedList
   * @summary 获取SKU预占库存明细列表
   * @request POST:/api/cis/inventory/supplySku/reserved/list
   * @response `200` `ReservedInventoryQueryListResp` OK
   */
  cisInventorySupplySkuReservedList = (
    req: ReservedInventoryQueryListReq,
    params: RequestParams = {},
  ) =>
    this.request<ReservedInventoryQueryListResp, any>({
      path: `/api/cis/inventory/supplySku/reserved/list`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存分配池管理
   * @name CisPoolAuthorityDelete
   * @summary 删除货权范围
   * @request POST:/api/cis/pool/authority/delete/{id}
   * @response `200` `void` OK
   */
  cisPoolAuthorityDelete = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/cis/pool/authority/delete/${id}`,
      method: 'POST',
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存分配池管理
   * @name CisPoolAuthorityDetail
   * @summary 货权范围详情查询
   * @request GET:/api/cis/pool/authority/detail/{id}
   * @response `200` `PoolAuthorityListItem` OK
   */
  cisPoolAuthorityDetail = (id: number, params: RequestParams = {}) =>
    this.request<PoolAuthorityListItem, any>({
      path: `/api/cis/pool/authority/detail/${id}`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存分配池管理
   * @name CisPoolAuthorityDisable
   * @summary 禁用货权范围
   * @request POST:/api/cis/pool/authority/disable/{id}
   * @response `200` `void` OK
   */
  cisPoolAuthorityDisable = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/cis/pool/authority/disable/${id}`,
      method: 'POST',
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存分配池管理
   * @name CisPoolAuthorityEnable
   * @summary 启用货权范围
   * @request POST:/api/cis/pool/authority/enable/{id}
   * @response `200` `void` OK
   */
  cisPoolAuthorityEnable = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/cis/pool/authority/enable/${id}`,
      method: 'POST',
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存分配池管理
   * @name CisPoolAuthorityQueryList
   * @summary 货权范围列表查询
   * @request POST:/api/cis/pool/authority/queryList
   * @response `200` `PoolAuthorityQueryListResp` OK
   */
  cisPoolAuthorityQueryList = (req: PoolAuthorityQueryListReq, params: RequestParams = {}) =>
    this.request<PoolAuthorityQueryListResp, any>({
      path: `/api/cis/pool/authority/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存分配池管理
   * @name CisPoolAuthoritySave
   * @summary 保存货权范围
   * @request POST:/api/cis/pool/authority/save
   * @response `200` `number` OK
   */
  cisPoolAuthoritySave = (req: PoolAuthoritySaveReq, params: RequestParams = {}) =>
    this.request<number, any>({
      path: `/api/cis/pool/authority/save`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存分配池管理
   * @name CisPoolDelete
   * @summary 删除分配池
   * @request POST:/api/cis/pool/delete/{poolCode}
   * @response `200` `void` OK
   */
  cisPoolDelete = (poolCode: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/cis/pool/delete/${poolCode}`,
      method: 'POST',
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存分配池管理
   * @name CisPoolDetail
   * @summary 分配池详情查询
   * @request GET:/api/cis/pool/detail/{poolCode}
   * @response `200` `CommonRespPoolDetailResp` OK
   */
  cisPoolDetail = (poolCode: string, params: RequestParams = {}) =>
    this.request<CommonRespPoolDetailResp, any>({
      path: `/api/cis/pool/detail/${poolCode}`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存分配池管理
   * @name CisPoolQueryList
   * @summary 分配池列表查询
   * @request POST:/api/cis/pool/queryList
   * @response `200` `CommonRespPoolQueryListResp` OK
   */
  cisPoolQueryList = (req: PoolQueryListReq, params: RequestParams = {}) =>
    this.request<CommonRespPoolQueryListResp, any>({
      path: `/api/cis/pool/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存分配池管理
   * @name CisPoolSaveOrUpdate
   * @summary 保存/修改分配池
   * @request POST:/api/cis/pool/saveOrUpdate
   * @response `200` `CommonRespObject` OK
   */
  cisPoolSaveOrUpdate = (req: PoolSaveReq, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/cis/pool/saveOrUpdate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 库存分配池管理
   * @name CisPoolValidList
   * @summary 查询有效的分配池列表（下拉选择）
   * @request GET:/api/cis/pool/validList
   * @response `200` `(PoolListItem)[]` OK
   */
  cisPoolValidList = (params: RequestParams = {}) =>
    this.request<PoolListItem[], any>({
      path: `/api/cis/pool/validList`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 任务配置
   * @name CisTaskConfigDetail
   * @summary 任务配置详情查询
   * @request GET:/api/cis/task/config/detail/{taskType}
   * @response `200` `CommonRespTaskConfigDetailResp` OK
   */
  cisTaskConfigDetail = (taskType: string, params: RequestParams = {}) =>
    this.request<CommonRespTaskConfigDetailResp, any>({
      path: `/api/cis/task/config/detail/${taskType}`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 任务配置
   * @name CisTaskConfigQueryList
   * @summary 任务配置查询列表
   * @request POST:/api/cis/task/config/queryList
   * @response `200` `TaskConfigQueryListResp` OK
   */
  cisTaskConfigQueryList = (req: TaskConfigQueryListReq, params: RequestParams = {}) =>
    this.request<TaskConfigQueryListResp, any>({
      path: `/api/cis/task/config/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 采购单任务
   * @name CisTaskPurchaseItemQueryList
   * @summary 采购单任务明细列表
   * @request POST:/api/cis/task/purchase/item/queryList
   * @response `200` `TaskPurchaseItemQueryListResp` OK
   */
  cisTaskPurchaseItemQueryList = (req: TaskPurchaseItemQueryListReq, params: RequestParams = {}) =>
    this.request<TaskPurchaseItemQueryListResp, any>({
      path: `/api/cis/task/purchase/item/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 采购单任务
   * @name CisTaskPurchaseQueryList
   * @summary 采购单任务列表
   * @request POST:/api/cis/task/purchase/queryList
   * @response `200` `TaskPurchaseQueryListResp` OK
   */
  cisTaskPurchaseQueryList = (req: TaskPurchaseQueryListReq, params: RequestParams = {}) =>
    this.request<TaskPurchaseQueryListResp, any>({
      path: `/api/cis/task/purchase/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 三方仓库存差异
   * @name CisTpwStorageExportList
   * @summary 三方库存列表导出
   * @request POST:/api/cis/tpwStorage/exportList
   * @response `200` `CommonExportResp` OK
   */
  cisTpwStorageExportList = (req: TpwStorageListQueryReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/cis/tpwStorage/exportList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 三方仓库存差异
   * @name CisTpwStorageManualSync
   * @summary 手动同步三方库存
   * @request POST:/api/cis/tpwStorage/manualSync
   * @response `200` `CommonRespObject` OK
   */
  cisTpwStorageManualSync = (params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/cis/tpwStorage/manualSync`,
      method: 'POST',
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 三方仓库存差异
   * @name CisTpwStorageProcessVariance
   * @summary 处理三方库存差异
   * @request POST:/api/cis/tpwStorage/processVariance
   * @response `200` `CommonRespObject` OK
   */
  cisTpwStorageProcessVariance = (params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/cis/tpwStorage/processVariance`,
      method: 'POST',
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 三方仓库存差异
   * @name CisTpwStorageQueryAdjustFlow
   * @summary 处理流水
   * @request POST:/api/cis/tpwStorage/queryAdjustFlow
   * @response `200` `TpwStorageAdjustFlowListResp` OK
   */
  cisTpwStorageQueryAdjustFlow = (req: TpwStorageAdjustFlowReq, params: RequestParams = {}) =>
    this.request<TpwStorageAdjustFlowListResp, any>({
      path: `/api/cis/tpwStorage/queryAdjustFlow`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 三方仓库存差异
   * @name CisTpwStorageQueryList
   * @summary 三方库存列表查询
   * @request POST:/api/cis/tpwStorage/queryList
   * @response `200` `TpwStorageListResp` OK
   */
  cisTpwStorageQueryList = (req: TpwStorageListQueryReq, params: RequestParams = {}) =>
    this.request<TpwStorageListResp, any>({
      path: `/api/cis/tpwStorage/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 三方仓库存差异
   * @name CisTpwStorageQueryVarianceList
   * @summary 三方库存差异查询
   * @request POST:/api/cis/tpwStorage/queryVarianceList
   * @response `200` `TpwStorageVarianceListResp` OK
   */
  cisTpwStorageQueryVarianceList = (req: TpwStorageVarianceListReq, params: RequestParams = {}) =>
    this.request<TpwStorageVarianceListResp, any>({
      path: `/api/cis/tpwStorage/queryVarianceList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 三方仓库存差异
   * @name CisTpwStorageRefreshVariance
   * @summary 手动刷新三方库存差异
   * @request POST:/api/cis/tpwStorage/refreshVariance
   * @response `200` `CommonRespObject` OK
   */
  cisTpwStorageRefreshVariance = (params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/cis/tpwStorage/refreshVariance`,
      method: 'POST',
      type: ContentType.Json,
      ...params,
    });
}
