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

import { ImportDataReq, ImportDataResp, ImportTemplateQueryResp } from './data-contracts';

export namespace Api {
  /**
   * No description
   * @tags 导入模块
   * @name LuteosAiFileImportData
   * @summary 数据导入
   * @request POST:/api/luteos/ai/file/importData
   * @response `200` `ImportDataResp` OK
   */
  export namespace LuteosAiFileImportData {
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
   * @name LuteosAiFileQueryImportTemplate
   * @summary 获取导入模板
   * @request GET:/api/luteos/ai/file/queryImportTemplate
   * @response `200` `ImportTemplateQueryResp` OK
   */
  export namespace LuteosAiFileQueryImportTemplate {
    export type RequestParams = {};
    export type RequestQuery = {
      /** advertising_video_import 广告导入  */
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
}
