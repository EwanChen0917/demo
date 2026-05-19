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
  GtmOptionsResp,
  MemberListQueryResp,
  UrlInfoResp,
  WeekReportCreateReq,
  WeekReportCreateResp,
  WeekReportDeleteReq,
  WeekReportDetailCopyReq,
  WeekReportDetailCreateReq,
  WeekReportDetailCreateResp,
  WeekReportDetailDeleteReq,
  WeekReportDetailListResp,
  WeekReportDetailUpdateReq,
  WeekReportListResp,
  WeekReportUpdateReq,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags BI看板模块(RSP)
   * @name LuteosMarketingBiReportCashFlowUrl
   * @summary 获取资金流BI链接
   * @request GET:/api/luteos/marketing/BIReport/cashFlowUrl
   * @response `200` `UrlInfoResp` OK
   */
  luteosMarketingBiReportCashFlowUrl = (params: RequestParams = {}) =>
    this.request<UrlInfoResp, any>({
      path: `/api/luteos/marketing/BIReport/cashFlowUrl`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags BI看板模块(RSP)
   * @name LuteosMarketingBiReportGetBiUrl
   * @summary 获取BI看板链接
   * @request GET:/api/luteos/marketing/BIReport/getBiUrl
   * @response `200` `UrlInfoResp` OK
   */
  luteosMarketingBiReportGetBiUrl = (
    query: {
      /**
       * BI类型：1-VOC看板 2-亚马逊运营周报
       * @format int32
       */
      type: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<UrlInfoResp, any>({
      path: `/api/luteos/marketing/BIReport/getBiUrl`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags BI看板模块(RSP)
   * @name LuteosMarketingBiReportMonthlyUrl
   * @summary 获取月报BI链接
   * @request GET:/api/luteos/marketing/BIReport/monthlyUrl
   * @response `200` `UrlInfoResp` OK
   */
  luteosMarketingBiReportMonthlyUrl = (params: RequestParams = {}) =>
    this.request<UrlInfoResp, any>({
      path: `/api/luteos/marketing/BIReport/monthlyUrl`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags BI看板模块(RSP)
   * @name LuteosMarketingBiReportSpuNewProductUrl
   * @summary 获取SPU新品分析BI链接
   * @request GET:/api/luteos/marketing/BIReport/spuNewProductUrl
   * @response `200` `UrlInfoResp` OK
   */
  luteosMarketingBiReportSpuNewProductUrl = (params: RequestParams = {}) =>
    this.request<UrlInfoResp, any>({
      path: `/api/luteos/marketing/BIReport/spuNewProductUrl`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags BI看板模块(RSP)
   * @name LuteosMarketingBiReportStockUpUrl
   * @summary 获取供应链备货情况BI链接
   * @request GET:/api/luteos/marketing/BIReport/stockUpUrl
   * @response `200` `UrlInfoResp` OK
   */
  luteosMarketingBiReportStockUpUrl = (params: RequestParams = {}) =>
    this.request<UrlInfoResp, any>({
      path: `/api/luteos/marketing/BIReport/stockUpUrl`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 周报管理(RSP)
   * @name LuteosMarketingWeekReportAmazonOptions
   * @summary 亚马逊运营周报branch选择项
   * @request GET:/api/luteos/marketing/weekReport/amazonOptions
   * @response `200` `GtmOptionsResp` OK
   */
  luteosMarketingWeekReportAmazonOptions = (params: RequestParams = {}) =>
    this.request<GtmOptionsResp, any>({
      path: `/api/luteos/marketing/weekReport/amazonOptions`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 周报管理(RSP)
   * @name LuteosMarketingWeekReportBranchOptions
   * @summary 周报branch选择项
   * @request GET:/api/luteos/marketing/weekReport/branchOptions
   * @response `200` `GtmOptionsResp` OK
   */
  luteosMarketingWeekReportBranchOptions = (params: RequestParams = {}) =>
    this.request<GtmOptionsResp, any>({
      path: `/api/luteos/marketing/weekReport/branchOptions`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 周报管理(RSP)
   * @name LuteosMarketingWeekReportCreateDetail
   * @summary 新增周报详情
   * @request POST:/api/luteos/marketing/weekReport/createDetail
   * @response `200` `WeekReportDetailCreateResp` OK
   */
  luteosMarketingWeekReportCreateDetail = (
    req: WeekReportDetailCreateReq,
    params: RequestParams = {},
  ) =>
    this.request<WeekReportDetailCreateResp, any>({
      path: `/api/luteos/marketing/weekReport/createDetail`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 周报管理(RSP)
   * @name LuteosMarketingWeekReportDelete
   * @summary 删除周报
   * @request POST:/api/luteos/marketing/weekReport/delete
   * @response `200` `void` OK
   */
  luteosMarketingWeekReportDelete = (req: WeekReportDeleteReq, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/luteos/marketing/weekReport/delete`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 周报管理(RSP)
   * @name LuteosMarketingWeekReportDeleteDetail
   * @summary 删除周报详情
   * @request POST:/api/luteos/marketing/weekReport/deleteDetail
   * @response `200` `void` OK
   */
  luteosMarketingWeekReportDeleteDetail = (
    req: WeekReportDetailDeleteReq,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/luteos/marketing/weekReport/deleteDetail`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 周报管理(RSP)
   * @name LuteosMarketingWeekReportDetailCopy
   * @summary 复制周报详情
   * @request POST:/api/luteos/marketing/weekReport/detailCopy
   * @response `200` `WeekReportCreateResp` OK
   */
  luteosMarketingWeekReportDetailCopy = (
    req: WeekReportDetailCopyReq,
    params: RequestParams = {},
  ) =>
    this.request<WeekReportCreateResp, any>({
      path: `/api/luteos/marketing/weekReport/detailCopy`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 周报管理(RSP)
   * @name LuteosMarketingWeekReportDetailList
   * @summary 周报详情列表
   * @request GET:/api/luteos/marketing/weekReport/detailList
   * @response `200` `WeekReportDetailListResp` OK
   */
  luteosMarketingWeekReportDetailList = (
    query: {
      /** 员工工号 */
      jobNumber?: string;
      /** 员工编号 */
      memberCode?: string;
      /**
       * 每页数量
       * @format int32
       */
      pageNum?: number;
      /**
       * 页数
       * @format int32
       */
      pageSize?: number;
      /** 周报编码 */
      reportCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<WeekReportDetailListResp, any>({
      path: `/api/luteos/marketing/weekReport/detailList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 周报管理(RSP)
   * @name LuteosMarketingWeekReportList
   * @summary 周报列表
   * @request GET:/api/luteos/marketing/weekReport/list
   * @response `200` `WeekReportListResp` OK
   */
  luteosMarketingWeekReportList = (
    query: {
      /** 所属部门分支 */
      branch?: string;
      /** 员工工号 */
      jobNumber?: string;
      /** 员工编号 */
      memberCode?: string;
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
      /**
       * 报告类型(1 - 经营分析周报，2 - VOC周报，VOC报告必填，3-亚马逊周报)
       * @format int32
       */
      reportType?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<WeekReportListResp, any>({
      path: `/api/luteos/marketing/weekReport/list`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 周报管理(RSP)
   * @name LuteosMarketingWeekReportQueryPermissionMemberList
   * @summary 获取有权限的成员
   * @request GET:/api/luteos/marketing/weekReport/queryPermissionMemberList
   * @response `200` `MemberListQueryResp` OK
   */
  luteosMarketingWeekReportQueryPermissionMemberList = (
    query: {
      /**
       * 报告类型：1 - 经营分析周报，2 - VOC周报
       * @format int32
       */
      reportType: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<MemberListQueryResp, any>({
      path: `/api/luteos/marketing/weekReport/queryPermissionMemberList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 周报管理(RSP)
   * @name LuteosMarketingWeekReportSave
   * @summary 保存周报
   * @request POST:/api/luteos/marketing/weekReport/save
   * @response `200` `WeekReportCreateResp` OK
   */
  luteosMarketingWeekReportSave = (req: WeekReportCreateReq, params: RequestParams = {}) =>
    this.request<WeekReportCreateResp, any>({
      path: `/api/luteos/marketing/weekReport/save`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 周报管理(RSP)
   * @name LuteosMarketingWeekReportUpdate
   * @summary 修改周报
   * @request POST:/api/luteos/marketing/weekReport/update
   * @response `200` `void` OK
   */
  luteosMarketingWeekReportUpdate = (req: WeekReportUpdateReq, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/luteos/marketing/weekReport/update`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 周报管理(RSP)
   * @name LuteosMarketingWeekReportUpdateDetail
   * @summary 修改周报详情
   * @request POST:/api/luteos/marketing/weekReport/updateDetail
   * @response `200` `void` OK
   */
  luteosMarketingWeekReportUpdateDetail = (
    req: WeekReportDetailUpdateReq,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/luteos/marketing/weekReport/updateDetail`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
}
