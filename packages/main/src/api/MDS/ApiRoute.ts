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
  CommonExportResp,
  MdsWarehouseRelQueryReq,
  MdsWarehouseRelQueryResp,
  MdsWarehouseRelSubmitReq,
} from './data-contracts';

export namespace Api {
  /**
   * @description 异步导出，返回导出记录模块信息
   * @tags 仓库主数据
   * @name LuteosMdsWarehouseExport
   * @summary 导出全部
   * @request POST:/api/luteos/mds/warehouse/export
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosMdsWarehouseExport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MdsWarehouseRelQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonExportResp;
  }

  /**
   * @description 默认条件：仓库类型=实体仓、业务类型=自营仓、国家=中国、状态=启用、服务商=全部
   * @tags 仓库主数据
   * @name LuteosMdsWarehouseQuery
   * @summary 分页查询
   * @request GET:/api/luteos/mds/warehouse/query
   * @response `200` `MdsWarehouseRelQueryResp` OK
   */
  export namespace LuteosMdsWarehouseQuery {
    export type RequestParams = {};
    export type RequestQuery = {
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
      /** 服务商名称，模糊筛选，空表示不按服务商筛 */
      serviceProviderName?: string;
      /**
       * 仓库类型 1-实体仓 2-虚拟仓
       * @format byte
       */
      warehouseCategory?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MdsWarehouseRelQueryResp;
  }

  /**
   * @description 单条新增或编辑，校验不通过抛出 LuteException
   * @tags 仓库主数据
   * @name LuteosMdsWarehouseSubmit
   * @summary 提交
   * @request POST:/api/luteos/mds/warehouse/submit
   * @response `200` `void` OK
   */
  export namespace LuteosMdsWarehouseSubmit {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MdsWarehouseRelSubmitReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = void;
  }
}
