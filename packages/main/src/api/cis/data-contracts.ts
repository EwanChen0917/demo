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

/** AdjustFlowBean */
export interface AdjustFlowBean {
  /**
   * 可用量
   * @format int32
   */
  availableQuantity?: number;
  /**
   * 对账时间
   * @format date-time
   */
  checkTime?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 错误信息 */
  errorMessage?: string;
  /** 日志流水号 */
  flowNo?: string;
  /**
   * id
   * @format int32
   */
  id?: number;
  /**
   * cis在途量
   * @format int32
   */
  onWayQuantity?: number;
  /** 产品名 */
  productTitle?: string;
  /** 商品sku */
  skuCode?: string;
  /** 三方仓服务商 */
  spCode?: string;
  /** 三方仓服务商名称 */
  spName?: string;
  /** 三方仓库编码 */
  spwCode?: string;
  /** 三方仓库名称 */
  spwName?: string;
  /** 处理结果 */
  status?: string;
  /** 库存流水编码 */
  stockFlowNo?: string;
  /** 供应链sku */
  supplySku?: string;
  /**
   * 三方仓可用量
   * @format int32
   */
  thirdAvailableQuantity?: number;
  /**
   * 三方在途量
   * @format int32
   */
  thirdOnWayQuantity?: number;
  /** 三方仓产品状态 */
  thirdProductStatus?: string;
  /** 三方仓产品名 */
  thirdProductTitle?: string;
  /** 三方仓sku */
  thirdSku?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /** 路特仓库编码 */
  warehouseCode?: string;
  /** 路特仓库名称 */
  warehouseName?: string;
}

/** AvailableInventoryQueryListItem */
export interface AvailableInventoryQueryListItem {
  /**
   * 可售数量
   * @format int32
   */
  availableQuantity?: number;
  /** 平台（来自货权属性） */
  channelCode?: string;
  /** 平台名称 */
  channelName?: string;
  /** 国家（来自货权属性） */
  countryCode?: string;
  /** 国家名称 */
  countryName?: string;
  /**
   * 是否共享：1-共享，0-独享
   * @format int32
   */
  isShared?: number;
  /** 是否共享描述 */
  isSharedDesc?: string;
  /**
   * 锁库数量
   * @format int32
   */
  lockedQuantity?: number;
  /** 分配池编码 */
  poolCode?: string;
  /** 分配池名称 */
  poolName?: string;
  /**
   * 剩余可用数量
   * @format int32
   */
  remainingQuantity?: number;
  /**
   * 预占数量
   * @format int32
   */
  reservedQuantity?: number;
  /** 业务员（来自货权属性） */
  salesmanCode?: string;
  /** 业务员名称 */
  salesmanName?: string;
  /** 店铺/站点（来自货权属性） */
  siteCode?: string;
  /** 店铺/站点名称 */
  siteName?: string;
  /** 产品SKU */
  skuCode?: string;
  /** 产品名称 */
  skuName?: string;
  /** 状态：在库 */
  status?: string;
  /** 状态描述 */
  statusDesc?: string;
  /** 供应链SKU */
  supplySku?: string;
  /**
   * 收货未上架数量
   * @format int32
   */
  unShelveQuantity?: number;
  /** 单位 */
  unit?: string;
  /**
   * 不可售数量
   * @format int32
   */
  unsellableQuantity?: number;
  /** 仓库编码 */
  warehouseCode?: string;
  /** 仓库名称 */
  warehouseName?: string;
  /** 仓库类型 */
  warehouseType?: string;
  /** 仓库类型名称 */
  warehouseTypeDesc?: string;
}

/** AvailableInventoryQueryListReq */
export interface AvailableInventoryQueryListReq {
  /** 平台列表（多选） */
  channelCodeList?: string[];
  /** 国家编码列表（多选，模糊查询） */
  countryCodeList?: string[];
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
  /** 分配池编码列表（多选，模糊查询） */
  poolCodeList?: string[];
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 业务员编码列表（多选，模糊查询） */
  salesmanCodeList?: string[];
  /** 门店/站点编码列表（多选，模糊查询） */
  siteCodeList?: string[];
  /** 产品SKU列表（多选，模糊查询） */
  skuCodeList?: string[];
  /** 产品名称列表（多选，模糊查询） */
  skuNameList?: string[];
  /** 排序字段: available_quantity, reserved_quantity, locked_quantity, remaining_quantity */
  sortField?: string;
  /** 排序方向: asc/desc */
  sortOrder?: string;
  /** 供应链SKU列表（多选，模糊查询） */
  supplySkuList?: string[];
  /** 仓库编码列表（多选） */
  warehouseCodeList?: string[];
  /** 仓库类型列表（多选） */
  warehouseTypeList?: string[];
}

/** AvailableInventoryQueryListResp */
export interface AvailableInventoryQueryListResp {
  code?: string;
  /** 可售库存列表 */
  list?: AvailableInventoryQueryListItem[];
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** CommonExportResp */
export interface CommonExportResp {
  /** app标识 */
  appCode?: string;
  /** 下载链接 */
  downloadUrl?: string;
  /** 模块标识 */
  moduleCode?: string;
}

/** CommonResp */
export interface CommonResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: object;
  traceId?: string;
}

/** ImportDataReq */
export interface ImportDataReq {
  async?: boolean;
  /** 文件名称 */
  fileName?: string;
  /** 导入场景 例如线下渠道商品：channel_product */
  importScene?: string;
  /** 上传文件的key或者完整路径 */
  key?: string;
  /** 产品运营项目编码  导入产品运营项目周期数据时，必传 */
  projectCode?: string;
}

/** ImportDataResp */
export interface ImportDataResp {
  /** 业务编码 */
  businessData?: object;
  /**
   * 失败数量
   * @format int32
   */
  failedCount?: number;
  /** 导入记录code */
  recordCode?: string;
  /**
   * 成功数量
   * @format int32
   */
  succeededCount?: number;
}

/** ImportTemplateQueryResp */
export interface ImportTemplateQueryResp {
  /** 下载地址 */
  templateUrl?: string;
}

/** InventoryLedgerQueryListItem */
export interface InventoryLedgerQueryListItem {
  /** 含税金额 */
  amount?: number;
  /** 品类 */
  category?: string;
  /**
   * 入库日期
   * @format int32
   */
  inboundDay?: number;
  /** 入库单行号 */
  inboundNo?: string;
  /**
   * 入库日期
   * @format date-time
   */
  inboundTime?: string;
  /** po号 */
  poNumber?: string;
  /** 采购单价（未税单价） */
  price?: number;
  /** 商品sku */
  skuCode?: string;
  /** 供应商编码 */
  supplierCode?: string;
  /** 供应商名称 */
  supplierName?: string;
  /** 供应链sku */
  supplySku?: string;
  /** 任务单号 */
  taskCode?: string;
  /** 任务单行号 */
  taskCodeLine?: string;
  /** 任务类型 */
  taskType?: string;
  /** 任务类型描述 */
  taskTypeDesc?: string;
  /** 税额 */
  tax?: number;
  /** 仓库编码 */
  warehouseCode?: string;
  /** 仓库名称 */
  warehouseDesc?: string;
  /** 仓库类型 */
  warehouseType?: string;
  /** 仓库类型名称 */
  warehouseTypeDesc?: string;
}

/** InventoryLedgerQueryListReq */
export interface InventoryLedgerQueryListReq {
  /** 入库单行号 */
  inboundNo?: string;
  /** 入库时间时间穿梭框，默认为最近3个月 */
  inboundTimeEnd?: string;
  /** 入库时间时间穿梭框，默认为最近3个月 */
  inboundTimeStart?: string;
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
  /** 采购单号 */
  poNumber?: string;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 产品SKU列表（多选，模糊查询） */
  skuCodeList?: string[];
  /** 供应商 */
  supplierCodeList?: string[];
  /** 供应链SKU列表（多选，模糊查询） */
  supplySkuList?: string[];
  /** 仓库编码列表（多选） */
  warehouseList?: string[];
  /** 仓库类型列表（多选） */
  warehouseTypeList?: string[];
}

/** InventoryLedgerQueryListResp */
export interface InventoryLedgerQueryListResp {
  code?: string;
  /** 库存记账列表 */
  list?: InventoryLedgerQueryListItem[];
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** InventoryLevelSyncItem */
export interface InventoryLevelSyncItem {
  /**
   * 库存ItemID
   * @format int64
   */
  inventoryItemId?: number;
  /**
   * 库存地址ID
   * @format int64
   */
  locationId?: number;
  /** 店铺名称 */
  shopAccount?: string;
}

/** InventoryLevelUpdateItem */
export interface InventoryLevelUpdateItem {
  /**
   * 缺货售卖 0:否 1:是（改 level 表）
   * @format int32
   */
  allowBackorder?: number;
  /**
   * 是否自动同步库存 0:否 1:是（改 level 表）
   * @format int32
   */
  autoSyncStock?: number;
  /**
   * 库存ItemID
   * @format int64
   */
  inventoryItemId?: number;
  /**
   * 库存地址ID（改 level 维度的字段时必填；仅改跟踪状态时可空）
   * @format int64
   */
  locationId?: number;
  /**
   * 最大允许超售量，非负整数（改 level 表）
   * @format int32
   * @min 0
   * @exclusiveMin false
   */
  oversellLimit?: number;
  /** 店铺账号；不传则使用请求级 shopAccount */
  shopAccount?: string;
  /**
   * 跟踪状态 0:不跟踪 1:跟踪（改 item 表）
   * @format int32
   */
  tracked?: number;
}

/** InventoryQueryListItem */
export interface InventoryQueryListItem {
  /**
   * 可售数量 - 统计L1层'在库'的可售数量
   * @format int32
   */
  availableQuantity?: number;
  /**
   * 良品库存 可用库存+预占库存+锁定库存+未上架库存
   * @format int32
   */
  goodQuantity?: number;
  /**
   * 在制库存
   * @format int32
   */
  inProductionQuantity?: number;
  /**
   * 总库存数量 - （在途在制）
   * @format int32
   */
  inTransitQuantity?: number;
  /**
   * 锁库 - 统计L1层'在库'的锁库数量
   * @format int32
   */
  lockedQuantity?: number;
  /**
   * 剩余可用数量 - 统计L1层'在库'的剩余可用数量
   * @format int32
   */
  remainingQuantity?: number;
  /**
   * 预占 - 统计L1层'在库'的预占数量
   * @format int32
   */
  reservedQuantity?: number;
  /** 产品SKU */
  skuCode?: string;
  /** 产品名称 */
  skuDesc?: string;
  /** 供应链SKU */
  supplySku?: string;
  /**
   * 实物库存 未上架库存+不良库存+可用库存+预占库存+锁定库存
   * @format int32
   */
  totalQuantity?: number;
  /**
   * 收货未上架数量 - 统计L1层'在库'的收货未上架数量
   * @format int32
   */
  unShelveQuantity?: number;
  /** 单位 */
  unit?: string;
  /**
   * 不可售数量 - 统计L1层'在库'的不可售数量
   * @format int32
   */
  unsellableQuantity?: number;
  /** 仓库编码 */
  warehouseCode?: string;
  /** 仓库名称 */
  warehouseDesc?: string;
  /** 仓库类型 */
  warehouseType?: string;
  /** 仓库类型名称 */
  warehouseTypeDesc?: string;
}

/** InventoryQueryListReq */
export interface InventoryQueryListReq {
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
  /** 分配池编码列表（多选，模糊查询） */
  poolCodeList?: string[];
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 产品SKU列表（多选，模糊查询） */
  skuCodeList?: string[];
  /** 产品名称列表（多选，模糊查询） */
  skuNameList?: string[];
  /** 排序字段: in_transit_quantity, un_shelve_quantity, unsellable_quantity, available_quantity, reserved_quantity, locked_quantity, remaining_quantity */
  sortField?: string;
  /** 排序方向: asc/desc */
  sortOrder?: string;
  /** 供应链SKU列表（多选，模糊查询） */
  supplySkuList?: string[];
  /** 仓库编码列表（多选） */
  warehouseCodeList?: string[];
  /** 仓库类型列表（多选） */
  warehouseTypeList?: string[];
}

/** InventoryQueryListResp */
export interface InventoryQueryListResp {
  code?: string;
  /** 库存列表 */
  list?: InventoryQueryListItem[];
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/**
 * InventorySnapBean
 * 库存快照）
 */
export interface InventorySnapBean {
  /**
   * 富勒可用库存
   * @format int32
   */
  fluxAvailableStock?: number;
  /**
   * 富勒次品库存
   * @format int32
   */
  fluxDefectiveStock?: number;
  /**
   * 富勒良品库存
   * @format int32
   */
  fluxGoodStock?: number;
  /**
   * 富勒实物库存
   * @format int32
   */
  fluxPhysicalStock?: number;
  /**
   * 富勒预占库存
   * @format int32
   */
  fluxReservedStock?: number;
  /**
   * 主键
   * @format int64
   */
  id?: number;
  /** 产品名称 */
  productName?: string;
  /** 生成日期 */
  snapDate?: string;
  /** 库存明细 */
  snapDetailBeans?: SnapDetailBean[];
  /** 生成时间 */
  snapTime?: string;
  /** 供应链SKU */
  supplySku?: string;
  /** 快照版本 */
  version?: string;
}

/**
 * InventorySnapDiffCidFluxBean
 * 库存快照差异对账 CID（富勒 vs ERP）
 */
export interface InventorySnapDiffCidFluxBean {
  /**
   * 可用差异(富勒-ERP)
   * @format int32
   */
  availableStockDiff?: number;
  /** 企业编码 */
  companyCode?: string;
  /**
   * 次品差异(富勒-ERP)
   * @format int32
   */
  defectiveStockDiff?: number;
  /**
   * ERP可用库存
   * @format int32
   */
  erpAvailableStock?: number;
  /**
   * ERP次品库存
   * @format int32
   */
  erpDefectiveStock?: number;
  /**
   * ERP良品库存
   * @format int32
   */
  erpGoodStock?: number;
  /**
   * ERP实物库存
   * @format int32
   */
  erpPhysicalStock?: number;
  /**
   * ERP预占库存
   * @format int32
   */
  erpReservedStock?: number;
  /**
   * 富勒可用库存
   * @format int32
   */
  fluxAvailableStock?: number;
  /**
   * 富勒次品库存
   * @format int32
   */
  fluxDefectiveStock?: number;
  /**
   * 富勒良品库存
   * @format int32
   */
  fluxGoodStock?: number;
  /**
   * 富勒实物库存
   * @format int32
   */
  fluxPhysicalStock?: number;
  /**
   * 富勒预占库存
   * @format int32
   */
  fluxReservedStock?: number;
  /**
   * 良品库存差异(富勒-ERP)
   * @format int32
   */
  goodStockDiff?: number;
  /**
   * 主键
   * @format int64
   */
  id?: number;
  /**
   * 实物差异(富勒-ERP)
   * @format int32
   */
  physicalStockDiff?: number;
  /** 产品名称 */
  productName?: string;
  /**
   * 预占差异(富勒-ERP)
   * @format int32
   */
  reservedStockDiff?: number;
  /**
   * 生成日期
   * @format date-time
   */
  snapDate?: string;
  /**
   * 生成时间
   * @format date-time
   */
  snapTime?: string;
  /** 供应链SKU */
  supplySku?: string;
  /** 快照版本 */
  version?: string;
}

/**
 * InventorySnapDiffCidJiJiaBean
 * 库存快照差异对账 CID（积加 vs ERP）
 */
export interface InventorySnapDiffCidJiJiaBean {
  /**
   * 可用差异(积加-ERP)
   * @format int32
   */
  availableStockDiff?: number;
  /** 企业编码 */
  companyCode?: string;
  /**
   * 不良差异(积加-ERP)
   * @format int32
   */
  defectiveStockDiff?: number;
  /**
   * ERP可用库存
   * @format int32
   */
  erpAvailableStock?: number;
  /**
   * ERP不良库存
   * @format int32
   */
  erpDefectiveStock?: number;
  /**
   * ERP良品库存
   * @format int32
   */
  erpGoodStock?: number;
  /**
   * ERP实物库存
   * @format int32
   */
  erpPhysicalStock?: number;
  /**
   * ERP预占库存
   * @format int32
   */
  erpReservedStock?: number;
  /**
   * 良品库存差异(积加-ERP)
   * @format int32
   */
  goodStockDiff?: number;
  /**
   * 主键
   * @format int64
   */
  id?: number;
  /**
   * 积加可用库存
   * @format int32
   */
  jijiaAvailableStock?: number;
  /**
   * 积加不良库存
   * @format int32
   */
  jijiaDefectiveStock?: number;
  /**
   * 积加良品库存
   * @format int32
   */
  jijiaGoodStock?: number;
  /**
   * 积加实物库存
   * @format int32
   */
  jijiaPhysicalStock?: number;
  /**
   * 积加预占库存
   * @format int32
   */
  jijiaReservedStock?: number;
  /** 原始平台仓库ID */
  originWarehouseId?: string;
  /**
   * 实物差异(积加-ERP)
   * @format int32
   */
  physicalStockDiff?: number;
  /** 产品名称 */
  productName?: string;
  /**
   * 预占差异(积加-ERP)
   * @format int32
   */
  reservedStockDiff?: number;
  /** 自研平台仓库编码 */
  selfWarehouseCode?: string;
  /**
   * 生成日期
   * @format date-time
   */
  snapDate?: string;
  /**
   * 生成时间
   * @format date-time
   */
  snapTime?: string;
  /** 供应链SKU */
  supplySku?: string;
  /** 快照版本 */
  version?: string;
  /** 仓库名称 */
  warehouseName?: string;
}

/** InventorySnapDiffErpFluxQueryListReq */
export interface InventorySnapDiffErpFluxQueryListReq {
  /**
   * 页码， 默认1，从1开始
   * @format int32
   */
  pageNum?: number;
  /**
   * 每页数量， 默认10
   * @format int32
   */
  pageSize?: number;
  /** 产品名称 */
  productName?: string;
  /** 供应链SKU */
  supplySku?: string;
}

/** InventorySnapDiffErpFluxQueryListResp */
export interface InventorySnapDiffErpFluxQueryListResp {
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 记录列表 */
  recordList?: InventorySnapDiffCidFluxBean[];
  /**
   * 总条数
   * @format int64
   */
  total?: number;
}

/** InventorySnapDiffErpJijiaQueryListReq */
export interface InventorySnapDiffErpJijiaQueryListReq {
  /**
   * 页码， 默认1，从1开始
   * @format int32
   */
  pageNum?: number;
  /**
   * 每页数量， 默认10
   * @format int32
   */
  pageSize?: number;
  /** 产品名称 */
  productName?: string;
  /** 供应链SKU */
  supplySku?: string;
  /** 仓库编码 */
  warehouseCode?: string;
}

/** InventorySnapDiffErpJijiaQueryListResp */
export interface InventorySnapDiffErpJijiaQueryListResp {
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 记录列表 */
  recordList?: InventorySnapDiffCidJiJiaBean[];
  /**
   * 总条数
   * @format int64
   */
  total?: number;
}

/** InventorySnapQueryListReq */
export interface InventorySnapQueryListReq {
  /**
   * 页码， 默认1，从1开始
   * @format int32
   */
  pageNum?: number;
  /**
   * 每页数量， 默认10
   * @format int32
   */
  pageSize?: number;
  /** 产品名称 */
  productName?: string;
  /** 生成日期 */
  snapDate?: string;
  /** 供应链SKU */
  supplySku?: string;
}

/** InventorySnapQueryListResp */
export interface InventorySnapQueryListResp {
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 记录列表 */
  recordList?: InventorySnapBean[];
  /**
   * 总条数
   * @format int64
   */
  total?: number;
}

/** PoolAuthorityListItem */
export interface PoolAuthorityListItem {
  /** 货权条件：CHANNEL-渠道，REGION-区域，COUNTRY-国家，SITE-站点，SALESMAN-业务员 */
  authorityType?: string;
  /** 货权条件描述 */
  authorityTypeDesc?: string;
  /** 渠道编码 */
  channelCode?: string;
  /** 渠道名称 */
  channelName?: string;
  /** 国家编码 */
  countryCode?: string;
  /** 国家名称 */
  countryName?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /**
   * 主键ID
   * @format int64
   */
  id?: number;
  /** 分配池编码 */
  poolCode?: string;
  /** 分配池名称 */
  poolName?: string;
  /** 区域编码 */
  regionCode?: string;
  /** 区域名称 */
  regionName?: string;
  /** 备注 */
  remark?: string;
  /** 业务员编码 */
  salesmanCode?: string;
  /** 业务员名称 */
  salesmanName?: string;
  /** 站点编码 */
  siteCode?: string;
  /** 站点名称 */
  siteName?: string;
  /**
   * 状态：0-失效，1-有效
   * @format int32
   */
  status?: number;
  /** 状态描述 */
  statusDesc?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /**
   * 版本号
   * @format int32
   */
  version?: number;
  /** 仓库类型 */
  warehouseTypes?: string;
  /** 仓库类型描述 */
  warehouseTypesDesc?: string;
}

/** PoolAuthorityQueryListReq */
export interface PoolAuthorityQueryListReq {
  /** 货权条件：CHANNEL-渠道，REGION-区域，COUNTRY-国家，SITE-站点，SALESMAN-业务员 */
  authorityType?: string;
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
  /** 分配池编码 */
  poolCode: string;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /**
   * 状态：0-失效，1-有效，不传则查全部
   * @format int32
   */
  status?: number;
}

/** PoolAuthorityQueryListResp */
export interface PoolAuthorityQueryListResp {
  code?: string;
  /** 货权范围列表 */
  list?: PoolAuthorityListItem[];
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** PoolAuthoritySaveReq */
export interface PoolAuthoritySaveReq {
  /** 货权条件：CHANNEL-渠道，REGION-区域，COUNTRY-国家，SITE-站点，SALESMAN-业务员 */
  authorityType: string;
  /** 渠道编码（多个用逗号隔开） */
  channelCode?: string;
  /** 渠道名称 */
  channelName?: string;
  /** 国家编码（多个用逗号隔开） */
  countryCode?: string;
  /** 国家名称 */
  countryName?: string;
  /**
   * 主键ID（编辑时必填）
   * @format int64
   */
  id?: number;
  /** 分配池编码 */
  poolCode: string;
  /** 区域编码（多个用逗号隔开） */
  regionCode?: string;
  /** 区域名称 */
  regionName?: string;
  /** 备注 */
  remark?: string;
  /** 业务员编码（多个用逗号隔开） */
  salesmanCode?: string;
  /** 业务员名称 */
  salesmanName?: string;
  /** 站点编码（多个用逗号隔开） */
  siteCode?: string;
  /** 站点名称 */
  siteName?: string;
  /**
   * 状态：0-失效，1-有效
   * @format int32
   */
  status: number;
  /**
   * 版本号（编辑时必填）
   * @format int32
   */
  version?: number;
  /** 仓库类型，多选用逗号分隔：OVERSEAS-海外仓，PLATFORM-平台仓，SELF-自营仓，VIRTUAL-虚拟仓 */
  warehouseTypes?: string;
}

/** PoolDetailResp */
export interface PoolDetailResp {
  poolDetail?: PoolListItem;
}

/** PoolListItem */
export interface PoolListItem {
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /**
   * 主键ID
   * @format int64
   */
  id?: number;
  /**
   * 是否共享：0-专享，1-共享
   * @format int32
   */
  isShared?: number;
  /** 是否共享描述 */
  isSharedDesc?: string;
  /**
   * 层级：NULL-顶层，1-基础层，2-逻辑层
   * @format int32
   */
  level?: number;
  /** 层级描述 */
  levelDesc?: string;
  /** 上级分配池编码 */
  parentCode?: string;
  /** 分配池编码 */
  poolCode?: string;
  /** 分配池名称 */
  poolName?: string;
  /**
   * 优先级别1-10
   * @format int32
   */
  priority?: number;
  /** 备注 */
  remark?: string;
  /**
   * 状态：0-失效，1-有效
   * @format int32
   */
  status?: number;
  /** 状态描述 */
  statusDesc?: string;
  /**
   * 是否支持锁库：0-否，1-是
   * @format int32
   */
  supportLock?: number;
  /** 是否支持锁库描述 */
  supportLockDesc?: string;
  /** 类型 IN_TRANSIT-在途 IN_PRODUCTION-在制 IN_STOCK-在库 */
  type?: string;
  /** 类型描述 */
  typeDesc?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /**
   * 版本号
   * @format int32
   */
  version?: number;
}

/** PoolQueryListReq */
export interface PoolQueryListReq {
  /** 分配池名称或编码（模糊查询） */
  keyword?: string;
  /**
   * 层级：0-顶层，1-基础层，2-逻辑层
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
  /** 上级分配池编码 */
  parentCode?: string;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /**
   * 是否共享：0-专享，1-共享
   * @format int32
   */
  shared?: number;
  /**
   * 状态：0-失效，1-有效，不传则查全部
   * @format int32
   */
  status?: number;
  /**
   * 是否支持锁库：0-否，1-是
   * @format int32
   */
  supportLock?: number;
}

/** PoolQueryListResp */
export interface PoolQueryListResp {
  code?: string;
  /** 分配池列表 */
  list?: PoolListItem[];
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** PoolSaveReq */
export interface PoolSaveReq {
  /**
   * 主键ID（编辑时必填）
   * @format int64
   */
  id?: number;
  /**
   * 层级：0-顶层，1-基础层，2-逻辑层
   * @format int32
   */
  level?: number;
  /** 上级分配池编码 */
  parentCode?: string;
  /** 分配池编码,编辑不允许修改 */
  poolCode: string;
  /** 分配池名称 */
  poolName: string;
  /**
   * 优先级别1-10，数字越大优先级越高，仅逻辑层需要
   * @format int32
   */
  priority?: number;
  /**
   * 状态：0-失效，1-有效
   * @format int32
   */
  status: number;
  /**
   * 是否支持锁库：0-否，1-是
   * @format int32
   */
  supportLock: number;
  /**
   * 版本号（编辑时必填）
   * @format int32
   */
  version?: number;
}

/** ReservedInventoryQueryListItem */
export interface ReservedInventoryQueryListItem {
  /** 业务单号 */
  bizNo?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /**
   * 数量
   * @format int32
   */
  reservedQty?: number;
  /** 系统来源 */
  sourceSystem?: string;
}

/** ReservedInventoryQueryListReq */
export interface ReservedInventoryQueryListReq {
  /** 业务单号code */
  bizCode?: string;
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
  /** 分配池code列表 */
  poolCodeList?: string[];
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 供应链SKU列表 */
  supplySkuList?: string[];
  /** 仓库编码列表 */
  warehouseCodeList?: string[];
}

/** ReservedInventoryQueryListResp */
export interface ReservedInventoryQueryListResp {
  code?: string;
  /** 预占库存列表 */
  list?: ReservedInventoryQueryListItem[];
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** ShopifyInventoryLevelDetailPushLogBean */
export interface ShopifyInventoryLevelDetailPushLogBean {
  /** 错误信息（失败时） */
  errorMessage?: string;
  /**
   * 最近推送时间
   * @format date-time
   */
  lastPushTime?: string;
  /**
   * 推送数量
   * @format int32
   */
  pushQuantity?: number;
  /**
   * 推送状态：0-待推送，1-成功，2-失败
   * @format int32
   */
  pushStatus?: number;
  /** 推送状态描述 */
  pushStatusDesc?: string;
  /** 推送接口响应数据（推送记录结果） */
  responseData?: string;
}

/** ShopifyInventoryLevelDetailResp */
export interface ShopifyInventoryLevelDetailResp {
  /** 主表数据（与列表单行一致） */
  levelInfo?: ShopifyInventoryLevelInfoBean;
  /** 推送日志：推送数量、最近推送时间 */
  pushLogs?: ShopifyInventoryLevelDetailPushLogBean[];
  /** 明细-仓库维度：仓库、供应链SKU、可用/在途库存、库龄等 */
  warehouseDetails?: ShopifyInventoryLevelDetailWarehouseBean[];
}

/** ShopifyInventoryLevelDetailWarehouseBean */
export interface ShopifyInventoryLevelDetailWarehouseBean {
  /**
   * 可用库存
   * @format int32
   */
  availableQuantity?: number;
  /**
   * 在库在途
   * @format int32
   */
  inStockAndTransit?: number;
  /**
   * 在途库存
   * @format int32
   */
  inTransitQuantity?: number;
  /**
   * （0-30）库龄
   * @format int32
   */
  invAge0To30Days?: number;
  /**
   * （31-60）库龄
   * @format int32
   */
  invAge31To60Days?: number;
  /**
   * （61-90）库龄
   * @format int32
   */
  invAge61To90Days?: number;
  /**
   * 大于90天
   * @format int32
   */
  invAgeOver90Days?: number;
  /**
   * 预占库存
   * @format int32
   */
  reservedQuantity?: number;
  /** 产品SKU */
  skuCode?: string;
  /** 产品名称 */
  skuName?: string;
  /** 供应链SKU */
  supplySku?: string;
  /** 仓库名称（无映射名称时回退为仓库编码） */
  warehouse?: string;
}

/** ShopifyInventoryLevelInfoBean */
export interface ShopifyInventoryLevelInfoBean {
  /**
   * 缺货售卖 0-否 1-是
   * @format int32
   */
  allowBackorder?: number;
  /**
   * 库存同步 0-否 1-是
   * @format int32
   */
  autoSyncStock?: number;
  /**
   * 可用库存
   * @format int32
   */
  available?: number;
  /**
   * 普船海运周期
   * @format int32
   */
  generalShipDeliveryDays?: number;
  /** GTM产品经理(member_code) */
  gtmMemberCode?: string;
  /** GTM品线code */
  gtmProductLineCode?: string;
  /** GTM品线名称 */
  gtmProductLineName?: string;
  /**
   * 在途库存
   * @format int32
   */
  inTransitQty?: number;
  /**
   * 在库在途库存
   * @format int32
   */
  inTransitStockQty?: number;
  /**
   * shopify存货编码
   * @format int64
   */
  inventoryItemId?: number;
  /** 库存地点编码 */
  locationCountryCode?: string;
  /** 库存地点ID */
  locationId?: string;
  /** 库存地点 */
  locationName?: string;
  /** 店铺SKU */
  msku?: string;
  /**
   * 超售预警 0-否 1-是
   * @format int32
   */
  oversellAlertFlag?: number;
  /** 超售预警 */
  oversellAlertFlagDesc?: string;
  /**
   * 最大允许超售量
   * @format int32
   */
  oversellLimit?: number;
  /** 品类 */
  productCategory?: string;
  /** 品线 */
  productLine?: string;
  /** 产品名称 */
  productName?: string;
  /** 运营 */
  productOperatorName?: string;
  /** 计划人员(member_code) */
  productPlanner?: string;
  /** 计划人员姓名 */
  productPlannerName?: string;
  /** 4周销售预测均值 */
  recent4wSaleAvg?: number;
  /**
   * 预占库存
   * @format int32
   */
  reservedQuantity?: number;
  /**
   * 安全库存天数
   * @format int32
   */
  safetyStockDays?: number;
  /**
   * 可售库存
   * @format int32
   */
  saleableStockQty?: number;
  /**
   * 可售天数
   * @format int32
   */
  sellableDays?: number;
  /**
   * 在库在途可售天数
   * @format int32
   */
  sellableDaysWithTransit?: number;
  /** 店铺账号 */
  shop?: string;
  /**
   * 呆滞预警 0-否 1-是
   * @format int32
   */
  slowMovingAlertFlag?: number;
  /** 呆滞预警 */
  slowMovingAlertFlagDesc?: string;
  /** 平台在售状态 */
  status?: string;
  /** 平台在售状态 */
  statusDesc?: string;
  /**
   * 缺货预警 0-否 1-是
   * @format int32
   */
  stockoutAlertFlag?: number;
  /** 缺货预警 */
  stockoutAlertFlagDesc?: string;
  /**
   * 缺货数量/缺货调拨数
   * @format int32
   */
  stockoutTransferQuantity?: number;
  /**
   * 跟踪状态
   * @format int32
   */
  tracked?: number;
  /**
   * 调仓建议数量
   * @format int32
   */
  transferSuggestionQuantity?: number;
  /**
   * 产品类型 0-单品 1-组合
   * @format int32
   */
  type?: number;
  /** 平台在售状态 */
  typeDesc?: string;
  /**
   * 未配货数量
   * @format int32
   */
  unallocatedQuantity?: number;
}

/** ShopifyInventoryLevelQueryReq */
export interface ShopifyInventoryLevelQueryReq {
  /**
   * 库存同步 0:否 1:是
   * @format int32
   */
  autoSyncStock?: number;
  /** GTM产品经理 member_code（多选任一命中，与扩展表逗号分隔存储一致，子串匹配） */
  gtmMemberCodeList?: string[];
  /** GTM品线 code（多选任一命中） */
  gtmProductLineCodeList?: string[];
  /** 缺货售卖 deny：不允许 continue：允许 */
  inventoryPolicy?: string;
  /** 关键词 */
  keyword?: string;
  /**
   * 关键词类型 2:产品名称 3:MSKU（店铺SKU） 4:shopify存货编码（inventory_item_id）
   * @format int32
   */
  keywordType?: number;
  /** 是否升序，默认 false */
  orderByAsc?: boolean;
  /** 排序字段（白名单，见接口说明） */
  orderByColumn?: string;
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
  /** 平台在售状态 active-已激活 draft-草稿，默认已激活 */
  platformSaleStatus?: string;
  /** 品类 */
  productCategoryList?: string[];
  /** 品线 */
  productLineList?: string[];
  /** 运营 */
  productOperatorList?: string[];
  /** 计划人员 member_code（多选任一命中） */
  productPlannerCodeList?: string[];
  /**
   * 商品类型 0-单品 1-组合
   * @format int32
   */
  productType?: number;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 库存地点ID列表（与 Shopify 库存地点维护中的 location_id 一致，非国家编码） */
  siteList?: string[];
  /**
   * 缺货预警 0-正常 1-预警
   * @format int32
   */
  stockOutAlertFlag?: number;
  /**
   * 跟踪状态 0-关闭 1-开启
   * @format int32
   */
  tracked?: number;
}

/** ShopifyInventoryLevelQueryResp */
export interface ShopifyInventoryLevelQueryResp {
  /** 列表数据 */
  list?: ShopifyInventoryLevelInfoBean[];
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /**
   * 总条数
   * @format int64
   */
  total?: number;
}

/** ShopifyInventoryLevelSyncReq */
export interface ShopifyInventoryLevelSyncReq {
  /** 同步数据 */
  syncList?: InventoryLevelSyncItem[];
}

/** ShopifyInventoryLevelUpdateReq */
export interface ShopifyInventoryLevelUpdateReq {
  /** 保存数据 */
  saveList?: InventoryLevelUpdateItem[];
}

/** ShopifyLocationListItem */
export interface ShopifyLocationListItem {
  /**
   * 状态
   * @format int32
   */
  active?: number;
  /** 状态 */
  activeDesc?: string;
  /** 地点 */
  country?: string;
  /** Location的唯一ID */
  locationId?: string;
  /**
   * Location的更新时间
   * @format date-time
   */
  locationUpdatedAt?: string;
  /**
   * 映射状态 没映射：0 已映射：1
   * @format int32
   */
  mappingStatus?: number;
  /** 映射状态 */
  mappingStatusDesc?: string;
  /** 名称 */
  name?: string;
  /** 关联关系 */
  relationItemList?: ShopifyLocationWarehouseRelationItem[];
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /** 店铺账号 */
  userAccount?: string;
}

/** ShopifyLocationQueryReq */
export interface ShopifyLocationQueryReq {
  /**
   * 状态 没激活：0 已激活：1
   * @format int32
   */
  active?: number;
  /** 库存地点 */
  country?: string;
  /**
   * 映射状态 没映射：0 已映射：1
   * @format int32
   */
  mappingStatus?: number;
  /**
   * 页码， 默认1，从1开始
   * @format int32
   */
  pageNum?: number;
  /**
   * 每页数量， 默认10
   * @format int32
   */
  pageSize?: number;
  /** 仓库关键词-（支持code和名称查询） */
  warehouseKeyword?: string;
}

/** ShopifyLocationQueryResp */
export interface ShopifyLocationQueryResp {
  /** 库存地点列表 */
  list?: ShopifyLocationListItem[];
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 库存地点枚举 */
  shopifyLocationEnumList?: string[];
  /**
   * 总条数
   * @format int64
   */
  total?: number;
}

/** ShopifyLocationRelationSaveReq */
export interface ShopifyLocationRelationSaveReq {
  /** Location的唯一ID */
  locationId?: string;
  /** 保存数据 */
  saveList?: ShopifyLocationWarehouseRelationItem[];
  /** 店铺账号（与 ShopInfoEnum.userAccount 一致） */
  shopAccount: string;
}

/** ShopifyLocationWarehouseRelationItem */
export interface ShopifyLocationWarehouseRelationItem {
  /** locationId */
  locationId?: string;
  /** 仓库编码 */
  warehouseCode?: string;
  /** 仓库名称 */
  warehouseName?: string;
}

/** ShopifyShipSkuDetailItem */
export interface ShopifyShipSkuDetailItem {
  /** 供应链SKU */
  productSku?: string;
  /** 产品SKU */
  skuCode?: string;
  /** 可发SKU（一品多供组） */
  skuGroup?: string[];
  /**
   * 数量
   * @format int32
   */
  skuQty?: number;
}

/** ShopifyShipSkuQueryReq */
export interface ShopifyShipSkuQueryReq {
  /** 状态 没激活：archived 已激活：active */
  active?: string;
  /** 关键词 */
  keyword?: string;
  /**
   * 可选条件项：MSKU(4)、产品SKU(2)、产品名称(3)、供应链SKU(1)、shopify存货编码(5)
   * @format int32
   * @example 1
   */
  keywordType?: number;
  /**
   * 页码， 默认1，从1开始
   * @format int32
   */
  pageNum?: number;
  /**
   * 每页数量， 默认10
   * @format int32
   */
  pageSize?: number;
  /**
   * 商品类型：0-单商品 1-组合，不传或空表示全部
   * @format int32
   */
  productType?: number;
  /** 站点集合 */
  siteList?: string[];
}

/** ShopifyShipSkuQueryResp */
export interface ShopifyShipSkuQueryResp {
  /** 列表数据（外层汇总 + 内层明细） */
  list?: ShopifyShipSkuSummaryItem[];
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /**
   * 总条数
   * @format int64
   */
  total?: number;
}

/** ShopifyShipSkuSummaryItem */
export interface ShopifyShipSkuSummaryItem {
  /** 内层明细：t_sale_sku_relation_new 行（产品SKU、数量、供应链SKU、可发SKU 等） */
  details?: ShopifyShipSkuDetailItem[];
  /** shopify 存货编码 inventory_item_id */
  inventoryItemId?: string;
  /** MSKU */
  msku?: string;
  /** 产品名称 */
  productName?: string;
  /**
   * 商品类型：0-单商品 1-组合
   * @format int32
   */
  productType?: number;
  /** 商品类型描述：单商品/组合 */
  productTypeDesc?: string;
  /** 店铺账号 */
  shop?: string;
  /** 站点 */
  site?: string;
  /** 后台产品状态 */
  status?: string;
  /** 后台产品状态描述 */
  statusDesc?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** SnItem */
export interface SnItem {
  /** 入库单行号 与任务单号一对一 */
  inboundLineNo?: string;
  /**
   * 入库日期
   * @format date-time
   */
  inboundTime?: string;
  /** 采购单号来源原单信息 */
  poNumber?: string;
  /** 品类来源产品信息 */
  productCategory?: string;
  /** 产品SKU来源产品信息 */
  skuCode?: string;
  /** 销售单号来源原单信息 */
  soNumber?: string;
  /** 供应链SKU来源产品信息 */
  supplySku?: string;
  /** 任务单行号 */
  taskLineNo?: string;
  /** 任务类型 采购入库、其他入库、退货 */
  taskType?: string;
  /** 仓库来源仓库资料信息 */
  warehouseCode?: string;
}

/** SnPageListQueryReq */
export interface SnPageListQueryReq {
  /** 入库单号模糊查询 */
  inboundNo?: string;
  /** 入库时间时间穿梭框，默认为最近3个月 */
  inboundTimeEnd?: string;
  /** 入库时间时间穿梭框，默认为最近3个月 */
  inboundTimeStart?: string;
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
  /** 采购单号模糊查询 */
  poNumber?: string;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 产品SKU支持多选，模糊查询 */
  skuCodeList?: string[];
  /** SN码模糊查询 */
  sn?: string;
  /** 销售单号模糊查询 */
  soNumber?: string;
  /** 供应链SKU支持多选，模糊查询 */
  supplySkuList?: string[];
  /** 任务类型支持多选 */
  taskTypeList?: string[];
  /** 仓库支持多选 */
  warehouseList?: string[];
}

/** SnPageListQueryResp */
export interface SnPageListQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  recordList?: SnItem[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** SnapDetailBean */
export interface SnapDetailBean {
  /** 维度 */
  dimensionDesc?: string;
  /**
   * ERP可用库存
   * @format int32
   */
  erpAvailableStock?: number;
  /**
   * ERP次品库存
   * @format int32
   */
  erpDefectiveStock?: number;
  /**
   * ERP良品库存
   * @format int32
   */
  erpGoodStock?: number;
  /**
   * ERP实物库存
   * @format int32
   */
  erpPhysicalStock?: number;
  /**
   * ERP预占库存
   * @format int32
   */
  erpReservedStock?: number;
  /**
   * 积加可用库存
   * @format int32
   */
  jijiaAvailableStock?: number;
  /**
   * 积加次品库存
   * @format int32
   */
  jijiaDefectiveStock?: number;
  /**
   * 积加良品库存
   * @format int32
   */
  jijiaGoodStock?: number;
  /**
   * 积加实物库存
   * @format int32
   */
  jijiaPhysicalStock?: number;
  /**
   * 积加预占库存
   * @format int32
   */
  jijiaReservedStock?: number;
  /** 仓库编码 */
  warehouseCode?: string;
  /** 仓库名称 */
  warehouseName?: string;
}

/** TaskConfigDetailResp */
export interface TaskConfigDetailResp {
  /** 任务配置 */
  item?: TaskConfigQueryListItem;
}

/** TaskConfigQueryListItem */
export interface TaskConfigQueryListItem {
  /** 编码前缀 */
  codePrefix?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 是否允许重复 */
  isAllowRepeat?: boolean;
  /**
   * 上一级
   * @format int32
   */
  parentId?: number;
  /**
   * 优先级
   * @format int32
   */
  priority?: number;
  /**
   * 状态 1-启用 0-禁用
   * @format int32
   */
  status?: number;
  /** 类型名 */
  taskName?: string;
  /** 类型编码 */
  taskType?: string;
}

/** TaskConfigQueryListReq */
export interface TaskConfigQueryListReq {
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
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 任务类型名称 */
  taskName?: string;
}

/** TaskConfigQueryListResp */
export interface TaskConfigQueryListResp {
  code?: string;
  /** 集合列表 */
  list?: TaskConfigQueryListItem[];
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** TaskPurchaseItemQueryListItem */
export interface TaskPurchaseItemQueryListItem {
  /** 含税价格 */
  amount?: number;
  /**
   * 下单日期
   * @format date-time
   */
  createTime?: string;
  /**
   * 执行状态
   * @format int32
   */
  executeStatus?: number;
  /** 执行状态描述 */
  executeStatusDesc?: string;
  /** 采购单号 */
  poNumber?: string;
  /** 未税单价 */
  price?: number;
  /**
   * 采购数量
   * @format int32
   */
  quantity?: number;
  /** 商品sku */
  skuCode?: string;
  /** 子任务号 */
  subTaskCode?: string;
  /** 采购商编码 */
  supplierCode?: string;
  /** 采购商名称 */
  supplierName?: string;
  /** 供应链sku */
  supplySku?: string;
  /** 任务类型 */
  taskType?: string;
  /** 任务类型描述 */
  taskTypeDesc?: string;
  /** 税额 */
  taxAmount?: number;
  /** 税率 */
  taxRate?: number;
  /** 采购单位 */
  unit?: string;
  /**
   * 执行时间
   * @format date-time
   */
  updateTime?: string;
  /** 仓库 */
  warehouseCode?: string;
  /** 仓库名称 */
  warehouseName?: string;
}

/** TaskPurchaseItemQueryListReq */
export interface TaskPurchaseItemQueryListReq {
  /** 结束时间 */
  endDate?: string;
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
  /** 采购单号 */
  poNumber?: string;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 商品SKU */
  skuCodeList?: string[];
  /** 排序字段: createTime,quantity */
  sortField?: string;
  /** 排序方向: asc/desc */
  sortOrder?: string;
  /** 开始时间 */
  startDate?: string;
  /** 任务状态 */
  statusList?: number[];
  /** 供应商 */
  supplierCodeList?: string[];
  /** 供应链SKU */
  supplySkuList?: string[];
  /** 任务类型 */
  taskTypeList?: string[];
  /** 目的仓 */
  warehouseCodeList?: string[];
}

/** TaskPurchaseItemQueryListResp */
export interface TaskPurchaseItemQueryListResp {
  code?: string;
  /** 集合列表 */
  list?: TaskPurchaseItemQueryListItem[];
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** TaskPurchaseQueryListItem */
export interface TaskPurchaseQueryListItem {
  /**
   * 下单日期
   * @format date-time
   */
  createTime?: string;
  /**
   * 执行状态
   * @format int32
   */
  executeStatus?: number;
  /** 执行状态描述 */
  executeStatusDesc?: string;
  /** 操作类型 */
  opType?: string;
  /** 操作类型描述 */
  opTypeDesc?: string;
  /** 采购单号 */
  poNumber?: string;
  /**
   * 优先级
   * @format int32
   */
  priority?: number;
  /** 采购商编码 */
  supplierCode?: string;
  /** 采购商名称 */
  supplierName?: string;
  /** 任务号 */
  taskCode?: string;
  /**
   * 执行时间
   * @format date-time
   */
  updateTime?: string;
  /** 仓库 */
  warehouseCode?: string;
  /** 仓库名称 */
  warehouseName?: string;
}

/** TaskPurchaseQueryListReq */
export interface TaskPurchaseQueryListReq {
  /** 结束时间 */
  endDate?: string;
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
  /** 采购单号 */
  poNumber?: string;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 排序字段: createTime */
  sortField?: string;
  /** 排序方向: asc/desc */
  sortOrder?: string;
  /** 开始时间 */
  startDate?: string;
  /** 任务状态 */
  statusList?: number[];
  /** 供应商 */
  supplierCodeList?: string[];
  /** 任务类型 */
  taskTypeList?: string[];
  /** 目的仓 */
  warehouseCodeList?: string[];
}

/** TaskPurchaseQueryListResp */
export interface TaskPurchaseQueryListResp {
  code?: string;
  /** 集合列表 */
  list?: TaskPurchaseQueryListItem[];
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** ThirdInventoryBean */
export interface ThirdInventoryBean {
  /**
   * 可用量
   * @format int32
   */
  availableQuantity?: number;
  /**
   * 更新时间时间
   * @format date-time
   */
  creatTime?: string;
  /**
   * 在库量
   * @format int32
   */
  inStockQuantity?: number;
  /**
   * 在途量
   * @format int32
   */
  onWayQuantity?: number;
  /**
   * 预占量
   * @format int32
   */
  preAllocateQuantity?: number;
  /** 产品状态 */
  productStatus?: string;
  /** 产品名称 */
  productTitle?: string;
  /** 产品SKU */
  skuCode?: string;
  /**
   * 原始数据的更新时间
   * @format date-time
   */
  sourceUpdateTime?: string;
  /** 三方仓名称 */
  spName?: string;
  /** 三方仓编码 */
  spwCode?: string;
  /** 三方仓名称 */
  spwName?: string;
  /** 供应链SKU */
  supplySku?: string;
  /** 三方仓产品状态 */
  thirdProductState?: string;
  /** 三方仓产品名称 */
  thirdProductTitle?: string;
  /** 三方仓SKU */
  thirdSku?: string;
  /**
   * 次品量
   * @format int32
   */
  unsellableQuantity?: number;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /** 路特仓库编码 */
  warehouseCode?: string;
  /** 路特仓库名称 */
  warehouseName?: string;
}

/** TpwStorageAdjustFlowListResp */
export interface TpwStorageAdjustFlowListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  recordList?: AdjustFlowBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** TpwStorageAdjustFlowReq */
export interface TpwStorageAdjustFlowReq {
  /**
   * 对账结束时间
   * @format date-time
   */
  checkTimeEnd?: string;
  /**
   * 对账开始时间
   * @format date-time
   */
  checkTimeStart?: string;
  /** 日志流水号 */
  flowNo?: string[];
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
  /** 产品名 */
  productTitle?: string;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 商品sku */
  skuCodeList?: string[];
  /** 处理状态 */
  statusList?: string[];
  /** 供应链SKU */
  supplySkuList?: string[];
  /** 三方仓产品名称 */
  thirdProductTitle?: string;
  /** 三方仓SKU */
  thirdSkuList?: string[];
  /** 三方仓库存名 */
  thirdSpwName?: string;
  /**
   * 更新时间结束
   * @format date-time
   */
  updateTimeEnd?: string;
  /**
   * 更新时间开始
   * @format date-time
   */
  updateTimeStart?: string;
  /** 路特仓库编码 */
  warehouseCodeList?: string[];
  /** 路特仓库名 模糊搜索 */
  warehouseDesc?: string;
}

/** TpwStorageListQueryReq */
export interface TpwStorageListQueryReq {
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
  /** 产品名称 */
  productTitle?: string;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 产品SKU */
  skuCodeList?: string[];
  /** 供应链SKU */
  supplySkuList?: string[];
  /** 三方仓产品名称 */
  thirdProductTitle?: string;
  /** 三方仓SKU */
  thirdSkuSku?: string[];
  /** 三方仓库存名 */
  thirdSpwName?: string;
  /** 路特仓库编码 */
  warehouseCodeList?: string[];
  /** 路特仓库名 模糊搜索 */
  warehouseDesc?: string;
}

/** TpwStorageListResp */
export interface TpwStorageListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  recordList?: ThirdInventoryBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** TpwStorageVarianceListReq */
export interface TpwStorageVarianceListReq {
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
  /** 产品名称 */
  productTitle?: string;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 产品sku */
  skuCodeList?: string[];
  /** 供应链SKU */
  supplySkuList?: string[];
  /** 三方仓产品名称 */
  thirdProductTitle?: string;
  /** 三方仓SKU */
  thirdSkuList?: string[];
  /** 三方仓库存名 */
  thirdSpwName?: string;
  /** 路特仓库编码 */
  warehouseCodeList?: string[];
  /** 路特仓库名 模糊搜索 */
  warehouseDesc?: string;
}

/** TpwStorageVarianceListResp */
export interface TpwStorageVarianceListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  recordList?: VarianceBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** VarianceBean */
export interface VarianceBean {
  /**
   * 可用量
   * @format int32
   */
  availableQuantity?: number;
  /**
   * 对账时间
   * @format date-time
   */
  checkTime?: string;
  /**
   * id
   * @format int32
   */
  id?: number;
  /**
   * cis在途量
   * @format int32
   */
  onWayQuantity?: number;
  productStatus?: string;
  /** 产品名 */
  productTitle?: string;
  /** 商品sku */
  skuCode?: string;
  /** 三方仓服务商 */
  spCode?: string;
  /** 三方仓服务商名称 */
  spName?: string;
  /** 三方仓库编码 */
  spwCode?: string;
  /** 三方仓库名称 */
  spwName?: string;
  /** 处理结果 */
  status?: string;
  /** 供应链sku */
  supplySku?: string;
  /**
   * 三方仓可用量
   * @format int32
   */
  thirdAvailableQuantity?: number;
  /**
   * 三方在途量
   * @format int32
   */
  thirdOnWayQuantity?: number;
  /** 三方仓产品状态 */
  thirdProductStatus?: string;
  /** 三方仓产品名 */
  thirdProductTitle?: string;
  /** 三方仓sku */
  thirdSku?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /** 路特仓库编码 */
  warehouseCode?: string;
  /** 路特仓库名称 */
  warehouseName?: string;
}

/** CommonResp«PoolDetailResp» */
export interface CommonRespPoolDetailResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: PoolDetailResp;
  traceId?: string;
}

/** CommonResp«PoolQueryListResp» */
export interface CommonRespPoolQueryListResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: PoolQueryListResp;
  traceId?: string;
}

/** CommonResp«TaskConfigDetailResp» */
export interface CommonRespTaskConfigDetailResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: TaskConfigDetailResp;
  traceId?: string;
}

/** CommonResp«object» */
export interface CommonRespObject {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: object;
  traceId?: string;
}
