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
  CommonRespListEnumDictItemResp,
  DpFieldPermissionResp,
  DpSelectOptionResp,
  ImportDataReq,
  ImportDataResp,
  ImportTemplateQueryResp,
  LuteChangeSysMaterialListQueryResp,
  LuteMaterialDetailQueryResp,
  LuteMaterialListQueryResp,
  LuteMaterialModelListQueryResp,
  LuteMaterialModelSaveReq,
  LuteMaterialModelSaveResp,
  LuteMaterialPraiseReq,
  LuteMaterialPraiseResp,
  LuteMaterialSaveReq,
  LuteMaterialSaveResp,
  LuteMaterialSceneListQueryResp,
  LuteMaterialSceneSaveReq,
  LuteMaterialSceneSaveResp,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description 字典-获取枚举下拉
   *
   * @tags 业务枚举
   * @name LuteosCommonBizEnumsGetEnumDict
   * @summary 字典-获取枚举下拉
   * @request GET:/api/luteos/common/bizEnums/getEnumDict
   * @response `200` `CommonRespListEnumDictItemResp` OK
   */
  luteosCommonBizEnumsGetEnumDict = (
    query?: {
      /** enumDictCode */
      enumDictCode?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespListEnumDictItemResp, any>({
      path: `/api/luteos/common/bizEnums/getEnumDict`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 数据权限模块
   * @name LuteosCommonDpQueryDpFieldPermissionList
   * @summary 获取用户字段权限值列表
   * @request GET:/api/luteos/common/dp/queryDpFieldPermissionList
   * @response `200` `DpFieldPermissionResp` OK
   */
  luteosCommonDpQueryDpFieldPermissionList = (
    query?: {
      /** 平台编码 通用-common os应用-lute_os erp应用-lute_erp 具体参考SystemPlatformEnum */
      platform?: string;
      /** 规则编码集合 */
      ruleCodeList?: string[];
    },
    params: RequestParams = {},
  ) =>
    this.request<DpFieldPermissionResp, any>({
      path: `/api/luteos/common/dp/queryDpFieldPermissionList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 数据权限模块
   * @name LuteosCommonDpQueryDpSelectOptionList
   * @summary 获取用户可选的下拉选项列表
   * @request GET:/api/luteos/common/dp/queryDpSelectOptionList
   * @response `200` `DpSelectOptionResp` OK
   */
  luteosCommonDpQueryDpSelectOptionList = (
    query?: {
      /** 平台编码 通用-common os应用-lute_os erp应用-lute_erp 具体参考SystemPlatformEnum */
      platform?: string;
      /** 规则编码集合 */
      ruleCodeList?: string[];
    },
    params: RequestParams = {},
  ) =>
    this.request<DpSelectOptionResp, any>({
      path: `/api/luteos/common/dp/queryDpSelectOptionList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 导入模块
   * @name LuteosCommonFileImportData
   * @summary 数据导入
   * @request POST:/api/luteos/common/file/importData
   * @response `200` `ImportDataResp` OK
   */
  luteosCommonFileImportData = (req: ImportDataReq, params: RequestParams = {}) =>
    this.request<ImportDataResp, any>({
      path: `/api/luteos/common/file/importData`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 导入模块
   * @name LuteosCommonFileQueryImportTemplate
   * @summary 获取导入模板
   * @request GET:/api/luteos/common/file/queryImportTemplate
   * @response `200` `ImportTemplateQueryResp` OK
   */
  luteosCommonFileQueryImportTemplate = (
    query: {
      /** 场景  amazon_ticket-亚马逊券码导入 product_spu-商品spu导入 product_sku-商品sku导入 platform_sku-映射sku导入  */
      importScene: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<ImportTemplateQueryResp, any>({
      path: `/api/luteos/common/file/queryImportTemplate`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 素材模块
   * @name LuteosCommonMaterialMaterialInteract
   * @summary 素材板块互动
   * @request POST:/api/luteos/common/material/materialInteract
   * @response `200` `LuteMaterialPraiseResp` OK
   */
  luteosCommonMaterialMaterialInteract = (req: LuteMaterialPraiseReq, params: RequestParams = {}) =>
    this.request<LuteMaterialPraiseResp, any>({
      path: `/api/luteos/common/material/materialInteract`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 素材模块
   * @name LuteosCommonMaterialQueryChangeSysList
   * @summary 获取切换系统列表
   * @request GET:/api/luteos/common/material/queryChangeSysList
   * @response `200` `LuteChangeSysMaterialListQueryResp` OK
   */
  luteosCommonMaterialQueryChangeSysList = (
    query?: {
      /** 启用状态 过滤平台 */
      filterPlatform?: string;
      /**
       * 列表类型 1-配置列表 2-应用列表
       * @format int32
       */
      listType?: number;
      /** 板块 */
      model?: string;
      /** scene */
      scene?: string;
      /**
       * 启用状态 0-关闭 1-启用
       * @format int32
       */
      status?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<LuteChangeSysMaterialListQueryResp, any>({
      path: `/api/luteos/common/material/queryChangeSysList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 素材模块
   * @name LuteosCommonMaterialQueryMaterialDetail
   * @summary 素材详情查询
   * @request GET:/api/luteos/common/material/queryMaterialDetail
   * @response `200` `LuteMaterialDetailQueryResp` OK
   */
  luteosCommonMaterialQueryMaterialDetail = (
    query: {
      /** 素材编码 */
      materialCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<LuteMaterialDetailQueryResp, any>({
      path: `/api/luteos/common/material/queryMaterialDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 素材模块
   * @name LuteosCommonMaterialQueryMaterialList
   * @summary 获取素材列表
   * @request GET:/api/luteos/common/material/queryMaterialList
   * @response `200` `LuteMaterialListQueryResp` OK
   */
  luteosCommonMaterialQueryMaterialList = (
    query: {
      /**
       * 列表类型 1-配置列表 2-应用列表
       * @format int32
       */
      listType?: number;
      /** 板块 */
      model?: string;
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
      /** scene */
      scene?: string;
      /**
       * 启用状态 0-关闭 1-启用
       * @format int32
       */
      status?: number;
      /** 标题 */
      title?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<LuteMaterialListQueryResp, any>({
      path: `/api/luteos/common/material/queryMaterialList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 素材模块
   * @name LuteosCommonMaterialQueryMaterialModelList
   * @summary 素材板块列表查询
   * @request GET:/api/luteos/common/material/queryMaterialModelList
   * @response `200` `LuteMaterialModelListQueryResp` OK
   */
  luteosCommonMaterialQueryMaterialModelList = (
    query?: {
      /** 板块名称 */
      desc?: string;
      /** 板块编码 */
      model?: string;
      /** 场景 */
      scene?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<LuteMaterialModelListQueryResp, any>({
      path: `/api/luteos/common/material/queryMaterialModelList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 素材模块
   * @name LuteosCommonMaterialQueryMaterialSceneList
   * @summary 素材场景类型列表查询
   * @request GET:/api/luteos/common/material/queryMaterialSceneList
   * @response `200` `LuteMaterialSceneListQueryResp` OK
   */
  luteosCommonMaterialQueryMaterialSceneList = (
    query?: {
      /** 场景类型名称 */
      desc?: string;
      /** 场景类型编码 */
      scene?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<LuteMaterialSceneListQueryResp, any>({
      path: `/api/luteos/common/material/queryMaterialSceneList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 素材模块
   * @name LuteosCommonMaterialSaveMaterial
   * @summary 保存素材信息
   * @request POST:/api/luteos/common/material/saveMaterial
   * @response `200` `LuteMaterialSaveResp` OK
   */
  luteosCommonMaterialSaveMaterial = (req: LuteMaterialSaveReq, params: RequestParams = {}) =>
    this.request<LuteMaterialSaveResp, any>({
      path: `/api/luteos/common/material/saveMaterial`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 素材模块
   * @name LuteosCommonMaterialSaveMaterialModel
   * @summary 素材板块保存
   * @request POST:/api/luteos/common/material/saveMaterialModel
   * @response `200` `LuteMaterialModelSaveResp` OK
   */
  luteosCommonMaterialSaveMaterialModel = (
    req: LuteMaterialModelSaveReq,
    params: RequestParams = {},
  ) =>
    this.request<LuteMaterialModelSaveResp, any>({
      path: `/api/luteos/common/material/saveMaterialModel`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 素材模块
   * @name LuteosCommonMaterialSaveMaterialScene
   * @summary 场景类型保存
   * @request POST:/api/luteos/common/material/saveMaterialScene
   * @response `200` `LuteMaterialSceneSaveResp` OK
   */
  luteosCommonMaterialSaveMaterialScene = (
    req: LuteMaterialSceneSaveReq,
    params: RequestParams = {},
  ) =>
    this.request<LuteMaterialSceneSaveResp, any>({
      path: `/api/luteos/common/material/saveMaterialScene`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
}
