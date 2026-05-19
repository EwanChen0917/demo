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

export namespace Api {
  /**
   * No description
   * @tags 导入模块
   * @name CisCommonFileImportData
   * @summary 数据导入
   * @request POST:/api/cis/common/file/importData
   * @response `200` `ImportDataResp` OK
   */
  export namespace CisCommonFileImportData {
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
   * @name CisCommonFileQueryImportTemplate
   * @summary 获取导入模板
   * @request GET:/api/cis/common/file/queryImportTemplate
   * @response `200` `ImportTemplateQueryResp` OK
   */
  export namespace CisCommonFileQueryImportTemplate {
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
   * @tags 库存
   * @name CisInventoryAvailableExport
   * @summary 可售库存导出
   * @request POST:/api/cis/inventory/availableExport
   * @response `200` `CommonExportResp` OK
   */
  export namespace CisInventoryAvailableExport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AvailableInventoryQueryListReq;
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
   * @tags 库存
   * @name CisInventoryAvailableQueryList
   * @summary 可售库存查询列表
   * @request POST:/api/cis/inventory/availableQueryList
   * @response `200` `AvailableInventoryQueryListResp` OK
   */
  export namespace CisInventoryAvailableQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AvailableInventoryQueryListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = AvailableInventoryQueryListResp;
  }

  /**
   * No description
   * @tags 库存
   * @name CisInventoryExport
   * @summary 库存导出
   * @request POST:/api/cis/inventory/export
   * @response `200` `CommonExportResp` OK
   */
  export namespace CisInventoryExport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = InventoryQueryListReq;
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
   * @tags 库存记账
   * @name CisInventoryLedgerExport
   * @summary 库存记账导出
   * @request POST:/api/cis/inventory/ledger/export
   * @response `200` `CommonExportResp` OK
   */
  export namespace CisInventoryLedgerExport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = InventoryLedgerQueryListReq;
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
   * @tags 库存记账
   * @name CisInventoryLedgerQueryList
   * @summary 库存记账查询列表
   * @request POST:/api/cis/inventory/ledger/queryList
   * @response `200` `InventoryLedgerQueryListResp` OK
   */
  export namespace CisInventoryLedgerQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = InventoryLedgerQueryListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = InventoryLedgerQueryListResp;
  }

  /**
   * No description
   * @tags 库存
   * @name CisInventoryQueryList
   * @summary 库存查询列表
   * @request POST:/api/cis/inventory/queryList
   * @response `200` `InventoryQueryListResp` OK
   */
  export namespace CisInventoryQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = InventoryQueryListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = InventoryQueryListResp;
  }

  /**
   * No description
   * @tags shopify库存
   * @name CisInventoryShopifyLevelDetail
   * @summary shopify库存-库存明细详情（主表+明细子记录+推送日志子记录）
   * @request GET:/api/cis/inventory/shopify/level/detail
   * @response `200` `ShopifyInventoryLevelDetailResp` OK
   */
  export namespace CisInventoryShopifyLevelDetail {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ShopifyInventoryLevelDetailResp;
  }

  /**
   * No description
   * @tags shopify库存
   * @name CisInventoryShopifyLevelExport
   * @summary shopify库存-库存明细导出（列表列+明细仓库/库龄展开）
   * @request POST:/api/cis/inventory/shopify/level/export
   * @response `200` `CommonExportResp` OK
   */
  export namespace CisInventoryShopifyLevelExport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ShopifyInventoryLevelQueryReq;
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
   * @tags shopify库存
   * @name CisInventoryShopifyLevelList
   * @summary shopify库存-库存明细列表
   * @request POST:/api/cis/inventory/shopify/level/list
   * @response `200` `ShopifyInventoryLevelQueryResp` OK
   */
  export namespace CisInventoryShopifyLevelList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ShopifyInventoryLevelQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ShopifyInventoryLevelQueryResp;
  }

  /**
   * No description
   * @tags shopify库存
   * @name CisInventoryShopifyLevelSync
   * @summary shopify库存-同步库存
   * @request POST:/api/cis/inventory/shopify/level/sync
   * @response `200` `void` OK
   */
  export namespace CisInventoryShopifyLevelSync {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ShopifyInventoryLevelSyncReq;
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
   * @tags shopify库存
   * @name CisInventoryShopifyLevelUpdateConfig
   * @summary shopify库存-修改level配置（跟踪状态/最大超售量/缺货售卖/自动同步库存），按需传参
   * @request POST:/api/cis/inventory/shopify/level/update/config
   * @response `200` `void` OK
   */
  export namespace CisInventoryShopifyLevelUpdateConfig {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ShopifyInventoryLevelUpdateReq;
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
   * @tags shopify库存
   * @name CisInventoryShopifyLocationLocationSync
   * @summary shopify库存地点-手动同步关系；传 shopAccount 仅同步该店，不传则按配置同步全部店铺
   * @request POST:/api/cis/inventory/shopify/location/location/sync
   * @response `200` `void` OK
   */
  export namespace CisInventoryShopifyLocationLocationSync {
    export type RequestParams = {};
    export type RequestQuery = {
      /** shopAccount */
      shopAccount?: string;
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
   * @tags shopify库存
   * @name CisInventoryShopifyLocationQueryList
   * @summary shopify库存地点-地址列表查询
   * @request POST:/api/cis/inventory/shopify/location/queryList
   * @response `200` `ShopifyLocationQueryResp` OK
   */
  export namespace CisInventoryShopifyLocationQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ShopifyLocationQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ShopifyLocationQueryResp;
  }

  /**
   * No description
   * @tags shopify库存
   * @name CisInventoryShopifyLocationRelationQueryListSave
   * @summary shopify库存地点-仓库映射关系保存
   * @request POST:/api/cis/inventory/shopify/location/relation/queryList/save
   * @response `200` `void` OK
   */
  export namespace CisInventoryShopifyLocationRelationQueryListSave {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ShopifyLocationRelationSaveReq;
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
   * @tags shopify库存
   * @name CisInventoryShopifyLocationRelationQueryList
   * @summary shopify库存地点-仓库映射关系列表
   * @request GET:/api/cis/inventory/shopify/location/relation/queryList/{locationId}
   * @response `200` `(ShopifyLocationWarehouseRelationItem)[]` OK
   */
  export namespace CisInventoryShopifyLocationRelationQueryList {
    export type RequestParams = {
      /** locationId */
      locationId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ShopifyLocationWarehouseRelationItem[];
  }

  /**
   * No description
   * @tags shopify库存
   * @name CisInventoryShopifyProductSync
   * @summary shopify库存-同步sku列表
   * @request GET:/api/cis/inventory/shopify/product/sync
   * @response `200` `void` OK
   */
  export namespace CisInventoryShopifyProductSync {
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
   * @tags shopify库存
   * @name CisInventoryShopifyShipSkuQueryList
   * @summary shopify库存-可发货SKU列表
   * @request POST:/api/cis/inventory/shopify/shipSku/queryList
   * @response `200` `ShopifyShipSkuQueryResp` OK
   */
  export namespace CisInventoryShopifyShipSkuQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ShopifyShipSkuQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ShopifyShipSkuQueryResp;
  }

  /**
   * No description
   * @tags 库存SN
   * @name CisInventorySnExport
   * @summary 库存SN导出
   * @request POST:/api/cis/inventory/sn/export
   * @response `200` `CommonExportResp` OK
   */
  export namespace CisInventorySnExport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SnPageListQueryReq;
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
   * @tags 库存SN
   * @name CisInventorySnQueryList
   * @summary 库存SN查询列表
   * @request POST:/api/cis/inventory/sn/queryList
   * @response `200` `SnPageListQueryResp` OK
   */
  export namespace CisInventorySnQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SnPageListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SnPageListQueryResp;
  }

  /**
   * No description
   * @tags 库存差异
   * @name CisInventorySnapExportQueryList
   * @summary 库存快照列表-导出
   * @request POST:/api/cis/inventory/snap/exportQueryList
   * @response `200` `CommonExportResp` OK
   */
  export namespace CisInventorySnapExportQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = InventorySnapQueryListReq;
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
   * @tags 库存差异
   * @name CisInventorySnapQueryDiffErpFluxList
   * @summary 库存快照差异列表erp-flux
   * @request POST:/api/cis/inventory/snap/queryDiffErpFluxList
   * @response `200` `InventorySnapDiffErpFluxQueryListResp` OK
   */
  export namespace CisInventorySnapQueryDiffErpFluxList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = InventorySnapDiffErpFluxQueryListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = InventorySnapDiffErpFluxQueryListResp;
  }

  /**
   * No description
   * @tags 库存差异
   * @name CisInventorySnapQueryDiffErpJijiaList
   * @summary 库存快照差异列表erp-jijia
   * @request POST:/api/cis/inventory/snap/queryDiffErpJijiaList
   * @response `200` `InventorySnapDiffErpJijiaQueryListResp` OK
   */
  export namespace CisInventorySnapQueryDiffErpJijiaList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = InventorySnapDiffErpJijiaQueryListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = InventorySnapDiffErpJijiaQueryListResp;
  }

  /**
   * No description
   * @tags 库存差异
   * @name CisInventorySnapQueryList
   * @summary 库存快照列表
   * @request POST:/api/cis/inventory/snap/queryList
   * @response `200` `InventorySnapQueryListResp` OK
   */
  export namespace CisInventorySnapQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = InventorySnapQueryListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = InventorySnapQueryListResp;
  }

  /**
   * No description
   * @tags 库存差异
   * @name CisInventorySnapReGenerate
   * @summary 库存快照(差异)重新生成
   * @request POST:/api/cis/inventory/snap/reGenerate
   * @response `200` `CommonResp` OK
   */
  export namespace CisInventorySnapReGenerate {
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
   * @tags 库存
   * @name CisInventorySupplySkuReservedList
   * @summary 获取SKU预占库存明细列表
   * @request POST:/api/cis/inventory/supplySku/reserved/list
   * @response `200` `ReservedInventoryQueryListResp` OK
   */
  export namespace CisInventorySupplySkuReservedList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ReservedInventoryQueryListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ReservedInventoryQueryListResp;
  }

  /**
   * No description
   * @tags 库存分配池管理
   * @name CisPoolAuthorityDelete
   * @summary 删除货权范围
   * @request POST:/api/cis/pool/authority/delete/{id}
   * @response `200` `void` OK
   */
  export namespace CisPoolAuthorityDelete {
    export type RequestParams = {
      /**
       * 货权ID
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
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags 库存分配池管理
   * @name CisPoolAuthorityDetail
   * @summary 货权范围详情查询
   * @request GET:/api/cis/pool/authority/detail/{id}
   * @response `200` `PoolAuthorityListItem` OK
   */
  export namespace CisPoolAuthorityDetail {
    export type RequestParams = {
      /**
       * 货权ID
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
    export type ResponseBody = PoolAuthorityListItem;
  }

  /**
   * No description
   * @tags 库存分配池管理
   * @name CisPoolAuthorityDisable
   * @summary 禁用货权范围
   * @request POST:/api/cis/pool/authority/disable/{id}
   * @response `200` `void` OK
   */
  export namespace CisPoolAuthorityDisable {
    export type RequestParams = {
      /**
       * 货权ID
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
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags 库存分配池管理
   * @name CisPoolAuthorityEnable
   * @summary 启用货权范围
   * @request POST:/api/cis/pool/authority/enable/{id}
   * @response `200` `void` OK
   */
  export namespace CisPoolAuthorityEnable {
    export type RequestParams = {
      /**
       * 货权ID
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
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags 库存分配池管理
   * @name CisPoolAuthorityQueryList
   * @summary 货权范围列表查询
   * @request POST:/api/cis/pool/authority/queryList
   * @response `200` `PoolAuthorityQueryListResp` OK
   */
  export namespace CisPoolAuthorityQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PoolAuthorityQueryListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PoolAuthorityQueryListResp;
  }

  /**
   * No description
   * @tags 库存分配池管理
   * @name CisPoolAuthoritySave
   * @summary 保存货权范围
   * @request POST:/api/cis/pool/authority/save
   * @response `200` `number` OK
   */
  export namespace CisPoolAuthoritySave {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PoolAuthoritySaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = number;
  }

  /**
   * No description
   * @tags 库存分配池管理
   * @name CisPoolDelete
   * @summary 删除分配池
   * @request POST:/api/cis/pool/delete/{poolCode}
   * @response `200` `void` OK
   */
  export namespace CisPoolDelete {
    export type RequestParams = {
      /** 分配池ID */
      poolCode: string;
    };
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
   * @tags 库存分配池管理
   * @name CisPoolDetail
   * @summary 分配池详情查询
   * @request GET:/api/cis/pool/detail/{poolCode}
   * @response `200` `CommonRespPoolDetailResp` OK
   */
  export namespace CisPoolDetail {
    export type RequestParams = {
      /** 分配池ID */
      poolCode: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespPoolDetailResp;
  }

  /**
   * No description
   * @tags 库存分配池管理
   * @name CisPoolQueryList
   * @summary 分配池列表查询
   * @request POST:/api/cis/pool/queryList
   * @response `200` `CommonRespPoolQueryListResp` OK
   */
  export namespace CisPoolQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PoolQueryListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespPoolQueryListResp;
  }

  /**
   * No description
   * @tags 库存分配池管理
   * @name CisPoolSaveOrUpdate
   * @summary 保存/修改分配池
   * @request POST:/api/cis/pool/saveOrUpdate
   * @response `200` `CommonRespObject` OK
   */
  export namespace CisPoolSaveOrUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PoolSaveReq;
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
   * @tags 库存分配池管理
   * @name CisPoolValidList
   * @summary 查询有效的分配池列表（下拉选择）
   * @request GET:/api/cis/pool/validList
   * @response `200` `(PoolListItem)[]` OK
   */
  export namespace CisPoolValidList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PoolListItem[];
  }

  /**
   * No description
   * @tags 任务配置
   * @name CisTaskConfigDetail
   * @summary 任务配置详情查询
   * @request GET:/api/cis/task/config/detail/{taskType}
   * @response `200` `CommonRespTaskConfigDetailResp` OK
   */
  export namespace CisTaskConfigDetail {
    export type RequestParams = {
      /** 任务类型编码 */
      taskType: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespTaskConfigDetailResp;
  }

  /**
   * No description
   * @tags 任务配置
   * @name CisTaskConfigQueryList
   * @summary 任务配置查询列表
   * @request POST:/api/cis/task/config/queryList
   * @response `200` `TaskConfigQueryListResp` OK
   */
  export namespace CisTaskConfigQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TaskConfigQueryListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = TaskConfigQueryListResp;
  }

  /**
   * No description
   * @tags 采购单任务
   * @name CisTaskPurchaseItemQueryList
   * @summary 采购单任务明细列表
   * @request POST:/api/cis/task/purchase/item/queryList
   * @response `200` `TaskPurchaseItemQueryListResp` OK
   */
  export namespace CisTaskPurchaseItemQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TaskPurchaseItemQueryListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = TaskPurchaseItemQueryListResp;
  }

  /**
   * No description
   * @tags 采购单任务
   * @name CisTaskPurchaseQueryList
   * @summary 采购单任务列表
   * @request POST:/api/cis/task/purchase/queryList
   * @response `200` `TaskPurchaseQueryListResp` OK
   */
  export namespace CisTaskPurchaseQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TaskPurchaseQueryListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = TaskPurchaseQueryListResp;
  }

  /**
   * No description
   * @tags 三方仓库存差异
   * @name CisTpwStorageExportList
   * @summary 三方库存列表导出
   * @request POST:/api/cis/tpwStorage/exportList
   * @response `200` `CommonExportResp` OK
   */
  export namespace CisTpwStorageExportList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TpwStorageListQueryReq;
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
   * @tags 三方仓库存差异
   * @name CisTpwStorageManualSync
   * @summary 手动同步三方库存
   * @request POST:/api/cis/tpwStorage/manualSync
   * @response `200` `CommonRespObject` OK
   */
  export namespace CisTpwStorageManualSync {
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
   * @tags 三方仓库存差异
   * @name CisTpwStorageProcessVariance
   * @summary 处理三方库存差异
   * @request POST:/api/cis/tpwStorage/processVariance
   * @response `200` `CommonRespObject` OK
   */
  export namespace CisTpwStorageProcessVariance {
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
   * @tags 三方仓库存差异
   * @name CisTpwStorageQueryAdjustFlow
   * @summary 处理流水
   * @request POST:/api/cis/tpwStorage/queryAdjustFlow
   * @response `200` `TpwStorageAdjustFlowListResp` OK
   */
  export namespace CisTpwStorageQueryAdjustFlow {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TpwStorageAdjustFlowReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = TpwStorageAdjustFlowListResp;
  }

  /**
   * No description
   * @tags 三方仓库存差异
   * @name CisTpwStorageQueryList
   * @summary 三方库存列表查询
   * @request POST:/api/cis/tpwStorage/queryList
   * @response `200` `TpwStorageListResp` OK
   */
  export namespace CisTpwStorageQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TpwStorageListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = TpwStorageListResp;
  }

  /**
   * No description
   * @tags 三方仓库存差异
   * @name CisTpwStorageQueryVarianceList
   * @summary 三方库存差异查询
   * @request POST:/api/cis/tpwStorage/queryVarianceList
   * @response `200` `TpwStorageVarianceListResp` OK
   */
  export namespace CisTpwStorageQueryVarianceList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TpwStorageVarianceListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = TpwStorageVarianceListResp;
  }

  /**
   * No description
   * @tags 三方仓库存差异
   * @name CisTpwStorageRefreshVariance
   * @summary 手动刷新三方库存差异
   * @request POST:/api/cis/tpwStorage/refreshVariance
   * @response `200` `CommonRespObject` OK
   */
  export namespace CisTpwStorageRefreshVariance {
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
}
