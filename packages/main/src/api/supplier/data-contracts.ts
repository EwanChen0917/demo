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

/** EncryptSupplierBean */
export interface EncryptSupplierBean {
  /** 供应商代码 */
  supplierCode?: string;
  /** 供应商加密名称 */
  supplierName?: string;
}

/** EncryptSupplierResp */
export interface EncryptSupplierResp {
  /** 供应商加密信息 */
  encryptSupplierList?: EncryptSupplierBean[];
}

/** SupplierListItem */
export interface SupplierListItem {
  /** 账号编码 */
  accountCode?: string;
  /** 供应商代码 */
  code?: string;
  /** 登录账号 */
  loginAccount?: string;
  /** 登录密码 */
  loginPwd?: string;
  /**
   * 登录状态: 0-停用 1-启用
   * @format int32
   */
  loginStatus?: number;
  /** 登录状态: 0-停用 1-启用 */
  loginStatusDesc?: string;
  /** 登录链接 */
  loginUrl?: string;
  /** 供应商名称 */
  name?: string;
  /**
   * 采购未交数量
   * @format int32
   */
  purchaseWaitPickQty?: number;
  /** 采购员编号 */
  purchaserCode?: string;
  /** 采购员名称 */
  purchaserName?: string;
  /**
   * 供应商状态: 0可用、1作废
   * @format int32
   */
  status?: number;
  /** 供应商状态: 0可用、1作废 */
  statusDesc?: string;
}

/** SupplierListQueryReq */
export interface SupplierListQueryReq {
  /** 关键字 供应商名称/供应商代码 */
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
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /**
   * 状态: 0-停用 1-启用
   * @format int32
   */
  status?: number;
}

/** SupplierListQueryResp */
export interface SupplierListQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  recordList?: SupplierListItem[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** SupplierPurchaseListItem */
export interface SupplierPurchaseListItem {
  /** po单号 */
  code?: string;
  /**
   * 预期数量
   * @format int32
   */
  expectQty?: number;
  /** 产品名称 */
  productName?: string;
  /**
   * 采购未交量
   * @format int32
   */
  purchaseWaitPickQty?: number;
  /**
   * 实收数量
   * @format int32
   */
  realReceivedQty?: number;
  /** 供应链SKU */
  supplySku?: string;
  /** 仓库编号 */
  warehouseCode?: string;
  /** 仓库名称 */
  warehouseDesc?: string;
}

/** SupplierPurchaseListQueryReq */
export interface SupplierPurchaseListQueryReq {
  /** 关键字 采购单号/采购仓库/供应链SKU */
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
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 供应商编号 */
  supplierCode?: string;
}

/** SupplierPurchaseListQueryResp */
export interface SupplierPurchaseListQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  recordList?: SupplierPurchaseListItem[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}
