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
  MaterialListQueryResp,
  MaterialPropertyOperateReq,
  MaterialQueryResp,
  PackageDeleteReq,
  PackageDetailQueryResp,
  PackageEnumQueryResp,
  PackageExportReq,
  PackageListQueryResp,
  PackageSaveReq,
  PackageSaveResp,
  PackageSubmitReq,
  TemplateDeleteReq,
  TemplateDetailQueryResp,
  TemplateListQueryResp,
  TemplateSaveReq,
  TemplateSaveResp,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags SOP模块, 包装管理
   * @name LuteosSopDeletePackage
   * @summary 删除包装
   * @request POST:/api/luteos/sop/deletePackage
   * @response `200` `void` OK
   */
  luteosSopDeletePackage = (req: PackageDeleteReq, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/luteos/sop/deletePackage`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags SOP模块, 模板管理
   * @name LuteosSopDeleteTemplate
   * @summary 删除模板
   * @request POST:/api/luteos/sop/deleteTemplate
   * @response `200` `void` OK
   */
  luteosSopDeleteTemplate = (req: TemplateDeleteReq, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/luteos/sop/deleteTemplate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags SOP模块, 包装管理
   * @name LuteosSopExportPackageInfo
   * @summary 导出包装详情
   * @request POST:/api/luteos/sop/exportPackageInfo
   * @response `200` `CommonExportResp` OK
   */
  luteosSopExportPackageInfo = (req: PackageExportReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/sop/exportPackageInfo`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags SOP模块
   * @name LuteosSopOperateMaterialProperty
   * @summary 操作物料属性
   * @request POST:/api/luteos/sop/operateMaterialProperty
   * @response `200` `void` OK
   */
  luteosSopOperateMaterialProperty = (
    req: MaterialPropertyOperateReq,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/luteos/sop/operateMaterialProperty`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags SOP模块, 包装管理
   * @name LuteosSopQueryMaterialDetailList
   * @summary 查询BOM配置
   * @request GET:/api/luteos/sop/queryMaterialDetailList
   * @response `200` `MaterialQueryResp` OK
   */
  luteosSopQueryMaterialDetailList = (params: RequestParams = {}) =>
    this.request<MaterialQueryResp, any>({
      path: `/api/luteos/sop/queryMaterialDetailList`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags SOP模块, 包装管理
   * @name LuteosSopQueryMaterialList
   * @summary 物料信息查询
   * @request GET:/api/luteos/sop/queryMaterialList
   * @response `200` `MaterialListQueryResp` OK
   */
  luteosSopQueryMaterialList = (params: RequestParams = {}) =>
    this.request<MaterialListQueryResp, any>({
      path: `/api/luteos/sop/queryMaterialList`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags SOP模块, 包装管理
   * @name LuteosSopQueryPackageDetail
   * @summary 获取包装详情
   * @request GET:/api/luteos/sop/queryPackageDetail
   * @response `200` `PackageDetailQueryResp` OK
   */
  luteosSopQueryPackageDetail = (
    query: {
      /** 包装编码 */
      packageCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<PackageDetailQueryResp, any>({
      path: `/api/luteos/sop/queryPackageDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags SOP模块, 包装管理
   * @name LuteosSopQueryPackageEnum
   * @summary 获取包装枚举
   * @request GET:/api/luteos/sop/queryPackageEnum
   * @response `200` `PackageEnumQueryResp` OK
   */
  luteosSopQueryPackageEnum = (params: RequestParams = {}) =>
    this.request<PackageEnumQueryResp, any>({
      path: `/api/luteos/sop/queryPackageEnum`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags SOP模块, 包装管理
   * @name LuteosSopQueryPackageList
   * @summary 获取包装列表
   * @request GET:/api/luteos/sop/queryPackageList
   * @response `200` `PackageListQueryResp` OK
   */
  luteosSopQueryPackageList = (
    query: {
      /** 关键字 名称/型号 */
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
      /** 产品经理 */
      productMember?: string;
      /** 模板 */
      templateCode?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<PackageListQueryResp, any>({
      path: `/api/luteos/sop/queryPackageList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags SOP模块, 模板管理
   * @name LuteosSopQueryTemplateDetail
   * @summary 获取模板详情
   * @request GET:/api/luteos/sop/queryTemplateDetail
   * @response `200` `TemplateDetailQueryResp` OK
   */
  luteosSopQueryTemplateDetail = (
    query: {
      /** 模板编码 */
      templateCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<TemplateDetailQueryResp, any>({
      path: `/api/luteos/sop/queryTemplateDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags SOP模块, 模板管理
   * @name LuteosSopQueryTemplateList
   * @summary 获取模板列表
   * @request GET:/api/luteos/sop/queryTemplateList
   * @response `200` `TemplateListQueryResp` OK
   */
  luteosSopQueryTemplateList = (
    query: {
      /** 创建人 */
      creator?: string;
      /** 关键字 模板名称或者模板编码 */
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
    },
    params: RequestParams = {},
  ) =>
    this.request<TemplateListQueryResp, any>({
      path: `/api/luteos/sop/queryTemplateList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags SOP模块, 包装管理
   * @name LuteosSopSavePackageInfo
   * @summary 保存包装详情
   * @request POST:/api/luteos/sop/savePackageInfo
   * @response `200` `PackageSaveResp` OK
   */
  luteosSopSavePackageInfo = (req: PackageSaveReq, params: RequestParams = {}) =>
    this.request<PackageSaveResp, any>({
      path: `/api/luteos/sop/savePackageInfo`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags SOP模块, 模板管理
   * @name LuteosSopSaveTemplateInfo
   * @summary 保存模板详情
   * @request POST:/api/luteos/sop/saveTemplateInfo
   * @response `200` `TemplateSaveResp` OK
   */
  luteosSopSaveTemplateInfo = (req: TemplateSaveReq, params: RequestParams = {}) =>
    this.request<TemplateSaveResp, any>({
      path: `/api/luteos/sop/saveTemplateInfo`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags SOP模块, 包装管理
   * @name LuteosSopSubmitPackage
   * @summary 提交包装审批
   * @request POST:/api/luteos/sop/submitPackage
   * @response `200` `void` OK
   */
  luteosSopSubmitPackage = (req: PackageSubmitReq, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/luteos/sop/submitPackage`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
}
