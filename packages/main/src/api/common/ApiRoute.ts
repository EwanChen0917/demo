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

export namespace Api {
  /**
   * @description 字典-获取枚举下拉
   * @tags 业务枚举
   * @name LuteosCommonBizEnumsGetEnumDict
   * @summary 字典-获取枚举下拉
   * @request GET:/api/luteos/common/bizEnums/getEnumDict
   * @response `200` `CommonRespListEnumDictItemResp` OK
   */
  export namespace LuteosCommonBizEnumsGetEnumDict {
    export type RequestParams = {};
    export type RequestQuery = {
      /** enumDictCode */
      enumDictCode?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespListEnumDictItemResp;
  }

  /**
   * No description
   * @tags 数据权限模块
   * @name LuteosCommonDpQueryDpFieldPermissionList
   * @summary 获取用户字段权限值列表
   * @request GET:/api/luteos/common/dp/queryDpFieldPermissionList
   * @response `200` `DpFieldPermissionResp` OK
   */
  export namespace LuteosCommonDpQueryDpFieldPermissionList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 平台编码 通用-common os应用-lute_os erp应用-lute_erp 具体参考SystemPlatformEnum */
      platform?: string;
      /** 规则编码集合 */
      ruleCodeList?: string[];
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DpFieldPermissionResp;
  }

  /**
   * No description
   * @tags 数据权限模块
   * @name LuteosCommonDpQueryDpSelectOptionList
   * @summary 获取用户可选的下拉选项列表
   * @request GET:/api/luteos/common/dp/queryDpSelectOptionList
   * @response `200` `DpSelectOptionResp` OK
   */
  export namespace LuteosCommonDpQueryDpSelectOptionList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 平台编码 通用-common os应用-lute_os erp应用-lute_erp 具体参考SystemPlatformEnum */
      platform?: string;
      /** 规则编码集合 */
      ruleCodeList?: string[];
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DpSelectOptionResp;
  }

  /**
   * No description
   * @tags 导入模块
   * @name LuteosCommonFileImportData
   * @summary 数据导入
   * @request POST:/api/luteos/common/file/importData
   * @response `200` `ImportDataResp` OK
   */
  export namespace LuteosCommonFileImportData {
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
   * @name LuteosCommonFileQueryImportTemplate
   * @summary 获取导入模板
   * @request GET:/api/luteos/common/file/queryImportTemplate
   * @response `200` `ImportTemplateQueryResp` OK
   */
  export namespace LuteosCommonFileQueryImportTemplate {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 场景  amazon_ticket-亚马逊券码导入 product_spu-商品spu导入 product_sku-商品sku导入 platform_sku-映射sku导入  */
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
   * @tags 素材模块
   * @name LuteosCommonMaterialMaterialInteract
   * @summary 素材板块互动
   * @request POST:/api/luteos/common/material/materialInteract
   * @response `200` `LuteMaterialPraiseResp` OK
   */
  export namespace LuteosCommonMaterialMaterialInteract {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LuteMaterialPraiseReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = LuteMaterialPraiseResp;
  }

  /**
   * No description
   * @tags 素材模块
   * @name LuteosCommonMaterialQueryChangeSysList
   * @summary 获取切换系统列表
   * @request GET:/api/luteos/common/material/queryChangeSysList
   * @response `200` `LuteChangeSysMaterialListQueryResp` OK
   */
  export namespace LuteosCommonMaterialQueryChangeSysList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = LuteChangeSysMaterialListQueryResp;
  }

  /**
   * No description
   * @tags 素材模块
   * @name LuteosCommonMaterialQueryMaterialDetail
   * @summary 素材详情查询
   * @request GET:/api/luteos/common/material/queryMaterialDetail
   * @response `200` `LuteMaterialDetailQueryResp` OK
   */
  export namespace LuteosCommonMaterialQueryMaterialDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 素材编码 */
      materialCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = LuteMaterialDetailQueryResp;
  }

  /**
   * No description
   * @tags 素材模块
   * @name LuteosCommonMaterialQueryMaterialList
   * @summary 获取素材列表
   * @request GET:/api/luteos/common/material/queryMaterialList
   * @response `200` `LuteMaterialListQueryResp` OK
   */
  export namespace LuteosCommonMaterialQueryMaterialList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = LuteMaterialListQueryResp;
  }

  /**
   * No description
   * @tags 素材模块
   * @name LuteosCommonMaterialQueryMaterialModelList
   * @summary 素材板块列表查询
   * @request GET:/api/luteos/common/material/queryMaterialModelList
   * @response `200` `LuteMaterialModelListQueryResp` OK
   */
  export namespace LuteosCommonMaterialQueryMaterialModelList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 板块名称 */
      desc?: string;
      /** 板块编码 */
      model?: string;
      /** 场景 */
      scene?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = LuteMaterialModelListQueryResp;
  }

  /**
   * No description
   * @tags 素材模块
   * @name LuteosCommonMaterialQueryMaterialSceneList
   * @summary 素材场景类型列表查询
   * @request GET:/api/luteos/common/material/queryMaterialSceneList
   * @response `200` `LuteMaterialSceneListQueryResp` OK
   */
  export namespace LuteosCommonMaterialQueryMaterialSceneList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 场景类型名称 */
      desc?: string;
      /** 场景类型编码 */
      scene?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = LuteMaterialSceneListQueryResp;
  }

  /**
   * No description
   * @tags 素材模块
   * @name LuteosCommonMaterialSaveMaterial
   * @summary 保存素材信息
   * @request POST:/api/luteos/common/material/saveMaterial
   * @response `200` `LuteMaterialSaveResp` OK
   */
  export namespace LuteosCommonMaterialSaveMaterial {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LuteMaterialSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = LuteMaterialSaveResp;
  }

  /**
   * No description
   * @tags 素材模块
   * @name LuteosCommonMaterialSaveMaterialModel
   * @summary 素材板块保存
   * @request POST:/api/luteos/common/material/saveMaterialModel
   * @response `200` `LuteMaterialModelSaveResp` OK
   */
  export namespace LuteosCommonMaterialSaveMaterialModel {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LuteMaterialModelSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = LuteMaterialModelSaveResp;
  }

  /**
   * No description
   * @tags 素材模块
   * @name LuteosCommonMaterialSaveMaterialScene
   * @summary 场景类型保存
   * @request POST:/api/luteos/common/material/saveMaterialScene
   * @response `200` `LuteMaterialSceneSaveResp` OK
   */
  export namespace LuteosCommonMaterialSaveMaterialScene {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LuteMaterialSceneSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = LuteMaterialSceneSaveResp;
  }
}
