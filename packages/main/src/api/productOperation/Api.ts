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
  AIotMacAddressListQueryReq,
  AIotMacAddressListQueryResp,
  AIotMacProductListQueryReq,
  AIotMacProductListQueryResp,
  CommonExportResp,
  CommonResp,
  CommonRespString,
  OperationProjectDetailListReq,
  OperationProjectDetailResp,
  OperationProjectDetailSaveReq,
  OperationProjectDetailSaveResp,
  OperationProjectLogResp,
  OperationProjectQueryResp,
  OperationProjectSaveReq,
  OperationProjectSaveResp,
  OperationTeamHandleReq,
  OperationTeamQueryResp,
  OperationTeamResp,
  OperationTeamSaveReq,
  PlatformOperationBatchReq,
  PlatformOperationQueryReq,
  PlatformOperationQueryResp,
  PlatformOperationSaveReq,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags 开放平台-AIot
   * @name LuteosOpenapiAiotQueryMacAddressList
   * @summary 获取MAC地址信息
   * @request POST:/api/luteos/openapi/aiot/queryMacAddressList
   * @response `200` `AIotMacAddressListQueryResp` OK
   */
  luteosOpenapiAiotQueryMacAddressList = (
    req: AIotMacAddressListQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<AIotMacAddressListQueryResp, any>({
      path: `/api/luteos/openapi/aiot/queryMacAddressList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 开放平台-AIot
   * @name LuteosOpenapiAiotQueryProductCodeList
   * @summary 获取产品代码
   * @request POST:/api/luteos/openapi/aiot/queryProductCodeList
   * @response `200` `AIotMacProductListQueryResp` OK
   */
  luteosOpenapiAiotQueryProductCodeList = (
    req: AIotMacProductListQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<AIotMacProductListQueryResp, any>({
      path: `/api/luteos/openapi/aiot/queryProductCodeList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 运营团队
   * @name LuteosOperationTeamHandleTeam
   * @summary 团队操作
   * @request POST:/api/luteos/operation/team/handleTeam
   * @response `200` `OperationTeamResp` OK
   */
  luteosOperationTeamHandleTeam = (req: OperationTeamHandleReq, params: RequestParams = {}) =>
    this.request<OperationTeamResp, any>({
      path: `/api/luteos/operation/team/handleTeam`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 运营团队
   * @name LuteosOperationTeamQueryTeamList
   * @summary 查询运营团队列表
   * @request GET:/api/luteos/operation/team/queryTeamList
   * @response `200` `OperationTeamQueryResp` OK
   */
  luteosOperationTeamQueryTeamList = (
    query: {
      /** 关键字, 团队名称 */
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
      /** 场景 operation-经营团队, meta-红人业务团队 */
      scene: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<OperationTeamQueryResp, any>({
      path: `/api/luteos/operation/team/queryTeamList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 运营团队
   * @name LuteosOperationTeamSaveTeamInfo
   * @summary 运营团队信息保存
   * @request POST:/api/luteos/operation/team/saveTeamInfo
   * @response `200` `OperationTeamResp` OK
   */
  luteosOperationTeamSaveTeamInfo = (req: OperationTeamSaveReq, params: RequestParams = {}) =>
    this.request<OperationTeamResp, any>({
      path: `/api/luteos/operation/team/saveTeamInfo`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 产品运营
   * @name LuteosOpetationExportOperationProjectDetail
   * @summary 导出产品运营项目周期
   * @request POST:/api/luteos/opetation/exportOperationProjectDetail
   * @response `200` `CommonExportResp` OK
   */
  luteosOpetationExportOperationProjectDetail = (
    req: OperationProjectDetailListReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/opetation/exportOperationProjectDetail`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 独立站/新平台运营人员
   * @name LuteosOpetationPlatformBatchDeleteByIds
   * @summary 批量删除
   * @request POST:/api/luteos/opetation/platform/batch/deleteByIds
   * @response `200` `CommonRespString` OK
   */
  luteosOpetationPlatformBatchDeleteByIds = (
    req: PlatformOperationBatchReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/opetation/platform/batch/deleteByIds`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 独立站/新平台运营人员
   * @name LuteosOpetationPlatformBatchSaveBatch
   * @summary 批量编辑
   * @request POST:/api/luteos/opetation/platform/batch/saveBatch
   * @response `200` `CommonRespString` OK
   */
  luteosOpetationPlatformBatchSaveBatch = (
    req: PlatformOperationBatchReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/opetation/platform/batch/saveBatch`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 独立站/新平台运营人员
   * @name LuteosOpetationPlatformDownTemplate
   * @summary 下载-导入模板
   * @request POST:/api/luteos/opetation/platform/downTemplate
   * @response `200` `CommonResp` OK
   */
  luteosOpetationPlatformDownTemplate = (
    req: PlatformOperationQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/opetation/platform/downTemplate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 独立站/新平台运营人员
   * @name LuteosOpetationPlatformExportList
   * @summary 导出列表
   * @request POST:/api/luteos/opetation/platform/exportList
   * @response `200` `CommonExportResp` OK
   */
  luteosOpetationPlatformExportList = (
    req: PlatformOperationQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/opetation/platform/exportList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 独立站/新平台运营人员
   * @name LuteosOpetationPlatformQueryList
   * @summary 列表
   * @request POST:/api/luteos/opetation/platform/queryList
   * @response `200` `PlatformOperationQueryResp` OK
   */
  luteosOpetationPlatformQueryList = (req: PlatformOperationQueryReq, params: RequestParams = {}) =>
    this.request<PlatformOperationQueryResp, any>({
      path: `/api/luteos/opetation/platform/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 独立站/新平台运营人员
   * @name LuteosOpetationPlatformSaveOrUpdate
   * @summary 新增/更新
   * @request POST:/api/luteos/opetation/platform/saveOrUpdate
   * @response `200` `CommonRespString` OK
   */
  luteosOpetationPlatformSaveOrUpdate = (
    req: PlatformOperationSaveReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/opetation/platform/saveOrUpdate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 产品运营
   * @name LuteosOpetationQueryOperationProjectDetail
   * @summary 产品运营项目详情
   * @request GET:/api/luteos/opetation/queryOperationProjectDetail
   * @response `200` `OperationProjectDetailResp` OK
   */
  luteosOpetationQueryOperationProjectDetail = (
    query?: {
      /** 项目编码编码 */
      projectCode?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<OperationProjectDetailResp, any>({
      path: `/api/luteos/opetation/queryOperationProjectDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 产品运营
   * @name LuteosOpetationQueryOperationProjectList
   * @summary 产品运营项目列表查询
   * @request GET:/api/luteos/opetation/queryOperationProjectList
   * @response `200` `OperationProjectQueryResp` OK
   */
  luteosOpetationQueryOperationProjectList = (
    query: {
      keyWord?: string;
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
      /** @format date */
      saleStartDate?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<OperationProjectQueryResp, any>({
      path: `/api/luteos/opetation/queryOperationProjectList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 产品运营
   * @name LuteosOpetationQueryOperationProjectLogList
   * @summary 产品运营项目日志查询
   * @request GET:/api/luteos/opetation/queryOperationProjectLogList
   * @response `200` `OperationProjectLogResp` OK
   */
  luteosOpetationQueryOperationProjectLogList = (
    query?: {
      /** 产品运营项目编码 */
      projectCode?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<OperationProjectLogResp, any>({
      path: `/api/luteos/opetation/queryOperationProjectLogList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 产品运营
   * @name LuteosOpetationSaveOperationProject
   * @summary 产品运营项目保存
   * @request POST:/api/luteos/opetation/saveOperationProject
   * @response `200` `OperationProjectSaveResp` OK
   */
  luteosOpetationSaveOperationProject = (
    req: OperationProjectSaveReq,
    params: RequestParams = {},
  ) =>
    this.request<OperationProjectSaveResp, any>({
      path: `/api/luteos/opetation/saveOperationProject`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 产品运营
   * @name LuteosOpetationSaveOperationProjectDetail
   * @summary 产品运营项目周期保存
   * @request POST:/api/luteos/opetation/saveOperationProjectDetail
   * @response `200` `OperationProjectDetailSaveResp` OK
   */
  luteosOpetationSaveOperationProjectDetail = (
    req: OperationProjectDetailSaveReq,
    params: RequestParams = {},
  ) =>
    this.request<OperationProjectDetailSaveResp, any>({
      path: `/api/luteos/opetation/saveOperationProjectDetail`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
}
