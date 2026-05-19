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
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description 异步导出，返回导出记录模块信息
   *
   * @tags 仓库主数据
   * @name LuteosMdsWarehouseExport
   * @summary 导出全部
   * @request POST:/api/luteos/mds/warehouse/export
   * @response `200` `CommonExportResp` OK
   */
  luteosMdsWarehouseExport = (req: MdsWarehouseRelQueryReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/mds/warehouse/export`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 默认条件：仓库类型=实体仓、业务类型=自营仓、国家=中国、状态=启用、服务商=全部
   *
   * @tags 仓库主数据
   * @name LuteosMdsWarehouseQuery
   * @summary 分页查询
   * @request GET:/api/luteos/mds/warehouse/query
   * @response `200` `MdsWarehouseRelQueryResp` OK
   */
  luteosMdsWarehouseQuery = (
    query: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<MdsWarehouseRelQueryResp, any>({
      path: `/api/luteos/mds/warehouse/query`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * @description 单条新增或编辑，校验不通过抛出 LuteException
   *
   * @tags 仓库主数据
   * @name LuteosMdsWarehouseSubmit
   * @summary 提交
   * @request POST:/api/luteos/mds/warehouse/submit
   * @response `200` `void` OK
   */
  luteosMdsWarehouseSubmit = (req: MdsWarehouseRelSubmitReq, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/luteos/mds/warehouse/submit`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
}
