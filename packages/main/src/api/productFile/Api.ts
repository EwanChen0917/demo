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
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags 导入模块
   * @name LuteosAiFileImportData
   * @summary 数据导入
   * @request POST:/api/luteos/ai/file/importData
   * @response `200` `ImportDataResp` OK
   */
  luteosAiFileImportData = (req: ImportDataReq, params: RequestParams = {}) =>
    this.request<ImportDataResp, any>({
      path: `/api/luteos/ai/file/importData`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 导入模块
   * @name LuteosAiFileQueryImportTemplate
   * @summary 获取导入模板
   * @request GET:/api/luteos/ai/file/queryImportTemplate
   * @response `200` `ImportTemplateQueryResp` OK
   */
  luteosAiFileQueryImportTemplate = (
    query: {
      /** advertising_video_import 广告导入  */
      importScene: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<ImportTemplateQueryResp, any>({
      path: `/api/luteos/ai/file/queryImportTemplate`,
      method: 'GET',
      query: query,
      ...params,
    });
}
