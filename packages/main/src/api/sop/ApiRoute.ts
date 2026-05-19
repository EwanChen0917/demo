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

export namespace Api {
  /**
   * No description
   * @tags SOP模块, 包装管理
   * @name LuteosSopDeletePackage
   * @summary 删除包装
   * @request POST:/api/luteos/sop/deletePackage
   * @response `200` `void` OK
   */
  export namespace LuteosSopDeletePackage {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PackageDeleteReq;
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
   * @tags SOP模块, 模板管理
   * @name LuteosSopDeleteTemplate
   * @summary 删除模板
   * @request POST:/api/luteos/sop/deleteTemplate
   * @response `200` `void` OK
   */
  export namespace LuteosSopDeleteTemplate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TemplateDeleteReq;
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
   * @tags SOP模块, 包装管理
   * @name LuteosSopExportPackageInfo
   * @summary 导出包装详情
   * @request POST:/api/luteos/sop/exportPackageInfo
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosSopExportPackageInfo {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PackageExportReq;
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
   * @tags SOP模块
   * @name LuteosSopOperateMaterialProperty
   * @summary 操作物料属性
   * @request POST:/api/luteos/sop/operateMaterialProperty
   * @response `200` `void` OK
   */
  export namespace LuteosSopOperateMaterialProperty {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MaterialPropertyOperateReq;
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
   * @tags SOP模块, 包装管理
   * @name LuteosSopQueryMaterialDetailList
   * @summary 查询BOM配置
   * @request GET:/api/luteos/sop/queryMaterialDetailList
   * @response `200` `MaterialQueryResp` OK
   */
  export namespace LuteosSopQueryMaterialDetailList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MaterialQueryResp;
  }

  /**
   * No description
   * @tags SOP模块, 包装管理
   * @name LuteosSopQueryMaterialList
   * @summary 物料信息查询
   * @request GET:/api/luteos/sop/queryMaterialList
   * @response `200` `MaterialListQueryResp` OK
   */
  export namespace LuteosSopQueryMaterialList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MaterialListQueryResp;
  }

  /**
   * No description
   * @tags SOP模块, 包装管理
   * @name LuteosSopQueryPackageDetail
   * @summary 获取包装详情
   * @request GET:/api/luteos/sop/queryPackageDetail
   * @response `200` `PackageDetailQueryResp` OK
   */
  export namespace LuteosSopQueryPackageDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 包装编码 */
      packageCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PackageDetailQueryResp;
  }

  /**
   * No description
   * @tags SOP模块, 包装管理
   * @name LuteosSopQueryPackageEnum
   * @summary 获取包装枚举
   * @request GET:/api/luteos/sop/queryPackageEnum
   * @response `200` `PackageEnumQueryResp` OK
   */
  export namespace LuteosSopQueryPackageEnum {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PackageEnumQueryResp;
  }

  /**
   * No description
   * @tags SOP模块, 包装管理
   * @name LuteosSopQueryPackageList
   * @summary 获取包装列表
   * @request GET:/api/luteos/sop/queryPackageList
   * @response `200` `PackageListQueryResp` OK
   */
  export namespace LuteosSopQueryPackageList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PackageListQueryResp;
  }

  /**
   * No description
   * @tags SOP模块, 模板管理
   * @name LuteosSopQueryTemplateDetail
   * @summary 获取模板详情
   * @request GET:/api/luteos/sop/queryTemplateDetail
   * @response `200` `TemplateDetailQueryResp` OK
   */
  export namespace LuteosSopQueryTemplateDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 模板编码 */
      templateCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = TemplateDetailQueryResp;
  }

  /**
   * No description
   * @tags SOP模块, 模板管理
   * @name LuteosSopQueryTemplateList
   * @summary 获取模板列表
   * @request GET:/api/luteos/sop/queryTemplateList
   * @response `200` `TemplateListQueryResp` OK
   */
  export namespace LuteosSopQueryTemplateList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = TemplateListQueryResp;
  }

  /**
   * No description
   * @tags SOP模块, 包装管理
   * @name LuteosSopSavePackageInfo
   * @summary 保存包装详情
   * @request POST:/api/luteos/sop/savePackageInfo
   * @response `200` `PackageSaveResp` OK
   */
  export namespace LuteosSopSavePackageInfo {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PackageSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PackageSaveResp;
  }

  /**
   * No description
   * @tags SOP模块, 模板管理
   * @name LuteosSopSaveTemplateInfo
   * @summary 保存模板详情
   * @request POST:/api/luteos/sop/saveTemplateInfo
   * @response `200` `TemplateSaveResp` OK
   */
  export namespace LuteosSopSaveTemplateInfo {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TemplateSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = TemplateSaveResp;
  }

  /**
   * No description
   * @tags SOP模块, 包装管理
   * @name LuteosSopSubmitPackage
   * @summary 提交包装审批
   * @request POST:/api/luteos/sop/submitPackage
   * @response `200` `void` OK
   */
  export namespace LuteosSopSubmitPackage {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PackageSubmitReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = void;
  }
}
