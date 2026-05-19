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

/** CommonExportResp */
export interface CommonExportResp {
  /** app标识 */
  appCode?: string;
  /** 下载链接 */
  downloadUrl?: string;
  /** 模块标识 */
  moduleCode?: string;
}

/** MdsWarehouseRelBean */
export interface MdsWarehouseRelBean {
  /** 业务类型 */
  businessType?: string;
  /** 销售渠道编码列表 */
  channelCodes?: string[];
  /** 公司编码 */
  companyCode?: string;
  /** 公司名称 */
  companyName?: string;
  /** 国家 */
  countryCode?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /**
   * 职能仓状态 0-禁用 1-启用
   * @format int32
   */
  functionStatus?: number;
  /** 职能仓编码 */
  functionWarehouseCode?: string;
  /** 职能仓名称 */
  functionWarehouseName?: string;
  /**
   * 关联主表id
   * @format int64
   */
  id?: number;
  /** 物理仓编码 */
  physicalWarehouseCode?: string;
  /** 物理仓名称 */
  physicalWarehouseName?: string;
  /** 服务商账号 */
  serviceProviderAccount?: string;
  /** 服务商名称 */
  serviceProviderName?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /**
   * 仓库类型 1-实体仓 2-虚拟仓
   * @format byte
   */
  warehouseCategory?: string;
}

/** MdsWarehouseRelQueryReq */
export interface MdsWarehouseRelQueryReq {
  /** 业务类型 自营仓/平台仓/三方仓/客户仓/供应商仓 */
  businessType?: string;
  /** 国家 */
  countryCode?: string;
  /**
   * 职能仓状态 0-禁用 1-启用
   * @format int32
   */
  functionStatus?: number;
  /** 物理仓编码/名称 模糊 */
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
  /** 服务商名称，模糊筛选，空表示不按服务商筛 */
  serviceProviderName?: string;
  /**
   * 仓库类型 1-实体仓 2-虚拟仓
   * @format byte
   */
  warehouseCategory?: string;
}

/** MdsWarehouseRelQueryResp */
export interface MdsWarehouseRelQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 关联列表 */
  relList?: MdsWarehouseRelBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** MdsWarehouseRelSubmitReq */
export interface MdsWarehouseRelSubmitReq {
  /**
   * 业务类型 自营仓/平台仓/三方仓/客户仓/供应商仓
   * @minLength 0
   * @maxLength 50
   */
  businessType?: string;
  /** 销售渠道编码列表，多选 */
  channelCodes?: string[];
  /**
   * 公司编码
   * @minLength 0
   * @maxLength 50
   */
  companyCode?: string;
  /**
   * 公司名称
   * @minLength 0
   * @maxLength 50
   */
  companyName?: string;
  /**
   * 国家
   * @minLength 0
   * @maxLength 50
   */
  countryCode?: string;
  /**
   * 职能仓状态 0-禁用 1-启用
   * @format int32
   */
  functionStatus?: number;
  /**
   * 职能仓编码，必填，需在 t_lute_warehouse 中存在且未删除已启用
   * @minLength 0
   * @maxLength 50
   */
  functionWarehouseCode?: string;
  /**
   * 职能仓名称
   * @minLength 0
   * @maxLength 50
   */
  functionWarehouseName?: string;
  /**
   * 关联主表id，编辑时必填
   * @format int64
   */
  id?: number;
  /**
   * 物理仓编码，新增时可为空（自动生成WH+4位）
   * @minLength 0
   * @maxLength 50
   */
  physicalWarehouseCode?: string;
  /**
   * 物理仓名称
   * @minLength 0
   * @maxLength 50
   */
  physicalWarehouseName?: string;
  /**
   * 服务商账号，可选
   * @minLength 0
   * @maxLength 50
   */
  serviceProviderAccount?: string;
  /**
   * 服务商名称，可选；新增时若为新的则写入服务商表
   * @minLength 0
   * @maxLength 50
   */
  serviceProviderName?: string;
  /**
   * 仓库类型 1-实体仓 2-虚拟仓
   * @format byte
   */
  warehouseCategory?: string;
}
