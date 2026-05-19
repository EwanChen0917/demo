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

/** BusinessDictBean */
export interface BusinessDictBean {
  /** 字典编码 */
  code?: string;
  /**
   * ID
   * @format int64
   */
  id?: number;
  /** 字典名称 */
  name?: string;
  /** 备注 */
  remark?: string;
}

/** BusinessDictItemBatchQueryResp */
export interface BusinessDictItemBatchQueryResp {
  dictItemMap?: Record<string, BusinessDictItemBean[]>;
}

/** BusinessDictItemBean */
export interface BusinessDictItemBean {
  /** 字典详情编码 */
  code?: string;
  /**
   * 字典ID
   * @format int64
   */
  dictId?: number;
  /**
   * ID
   * @format int64
   */
  id?: number;
  /** 字典详情名称 */
  name?: string;
  /** 备注 */
  remark?: string;
}

/** BusinessDictItemListResp */
export interface BusinessDictItemListResp {
  code?: string;
  /** 业务字典详情列表 */
  list?: BusinessDictItemBean[];
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

/** BusinessDictItemRemoveReq */
export interface BusinessDictItemRemoveReq {
  /**
   * ID
   * @format int64
   */
  id?: number;
}

/** BusinessDictItemSaveReq */
export interface BusinessDictItemSaveReq {
  /** 字典详情编码 */
  code?: string;
  /**
   * 字典ID
   * @format int64
   */
  dictId?: number;
  /**
   * ID
   * @format int64
   */
  id?: number;
  /** 字典详情名称 */
  name?: string;
  /** 备注 */
  remark?: string;
}

/** BusinessDictItemSaveResp */
export interface BusinessDictItemSaveResp {
  /** 业务字典详情编码 */
  code?: string;
}

/** BusinessDictListResp */
export interface BusinessDictListResp {
  code?: string;
  /** 业务字典列表 */
  list?: BusinessDictBean[];
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

/** BusinessDictSaveReq */
export interface BusinessDictSaveReq {
  /** 字典编码 */
  code?: string;
  /**
   * ID
   * @format int64
   */
  id?: number;
  /** 字典名称 */
  name?: string;
  /** 备注 */
  remark?: string;
}

/** BusinessDictSaveResp */
export interface BusinessDictSaveResp {
  /** 业务字典编码 */
  code?: string;
}

/** SettlementOrganizationBean */
export interface SettlementOrganizationBean {
  /**
   * 区域类型 1-大陆 2-其他
   * @format int32
   */
  areaType?: number;
  /** 区域类型描述 */
  areaTypeDesc?: string;
  /** 结算组织编码 */
  code?: string;
  /**
   * ID
   * @format int64
   */
  id?: number;
  /** 结算组织名称 */
  name?: string;
  /** 备注 */
  remark?: string;
}

/** SettlementOrganizationListResp */
export interface SettlementOrganizationListResp {
  code?: string;
  /** 结算组织列表 */
  list?: SettlementOrganizationBean[];
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

/** SettlementOrganizationSaveReq */
export interface SettlementOrganizationSaveReq {
  /**
   * 区域类型 1-大陆 2-其他
   * @format int32
   */
  areaType?: number;
  /** 结算组织编码 */
  code?: string;
  /**
   * ID
   * @format int64
   */
  id?: number;
  /** 结算组织名称 */
  name?: string;
  /** 备注 */
  remark?: string;
}

/** SettlementOrganizationSaveResp */
export interface SettlementOrganizationSaveResp {
  /** 结算组织编码 */
  code?: string;
}
