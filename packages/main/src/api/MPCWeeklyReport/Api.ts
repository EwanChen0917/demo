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
  MarketCurrentUserGroupAreaResp,
  MarketWeeklyPeriodCopyReq,
  MarketWeeklyReportAreaResp,
  MarketWeeklyReportConfigListResp,
  MarketWeeklyReportCopyReq,
  MarketWeeklyReportCopyResp,
  MarketWeeklyReportCreateReq,
  MarketWeeklyReportCreateResp,
  MarketWeeklyReportDeleteReq,
  MarketWeeklyReportDetailResp,
  MarketWeeklyReporterResp,
  MarketWeeklyReportGroupRemoveReq,
  MarketWeeklyReportGroupResp,
  MarketWeeklyReportGroupSaveReq,
  MarketWeeklyReportListPeriodResp,
  MarketWeeklyReportListResp,
  MarketWeeklyReportOptionsResp,
  MarketWeeklyReportTypeResp,
  MarketWeeklyReportUpdateReq,
  MarketWeeklyReportWeekListResp,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags 周报管理(MCP)
   * @name LuteosMarketWeekReportCancelDelete
   * @summary 撤销删除周报
   * @request POST:/api/luteos/market/weekReport/cancelDelete
   * @response `200` `void` OK
   */
  luteosMarketWeekReportCancelDelete = (
    req: MarketWeeklyReportDeleteReq,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/luteos/market/weekReport/cancelDelete`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 周报管理(MCP)
   * @name LuteosMarketWeekReportCopyPeriod
   * @summary 复制文件夹
   * @request POST:/api/luteos/market/weekReport/copyPeriod
   * @response `200` `void` OK
   */
  luteosMarketWeekReportCopyPeriod = (req: MarketWeeklyPeriodCopyReq, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/luteos/market/weekReport/copyPeriod`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 周报管理(MCP)
   * @name LuteosMarketWeekReportCopyReport
   * @summary 复制周报
   * @request POST:/api/luteos/market/weekReport/copyReport
   * @response `200` `MarketWeeklyReportCopyResp` OK
   */
  luteosMarketWeekReportCopyReport = (req: MarketWeeklyReportCopyReq, params: RequestParams = {}) =>
    this.request<MarketWeeklyReportCopyResp, any>({
      path: `/api/luteos/market/weekReport/copyReport`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 周报管理(MCP)
   * @name LuteosMarketWeekReportDelete
   * @summary 删除周报
   * @request POST:/api/luteos/market/weekReport/delete
   * @response `200` `void` OK
   */
  luteosMarketWeekReportDelete = (req: MarketWeeklyReportDeleteReq, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/luteos/market/weekReport/delete`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 周报管理(MCP)
   * @name LuteosMarketWeekReportList
   * @summary 周报列表
   * @request GET:/api/luteos/market/weekReport/list
   * @response `200` `MarketWeeklyReportListResp` OK
   */
  luteosMarketWeekReportList = (
    query: {
      /** 所属部门分支 */
      branch?: string;
      /** 所属部门分支集合（团队报告） */
      branchList?: string[];
      /** 结束日期 */
      endDate?: string;
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
      /** @format int32 */
      pageStart?: number;
      /** 周期 */
      period?: string;
      /** 报告 */
      reportTitle?: string;
      /** 报告类型(1- 经营分析周报，2 - VOC周报，VOC报告必填，3-亚马逊周报) */
      reportTypes?: number[];
      /** 开始日期 */
      startDate?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<MarketWeeklyReportListResp, any>({
      path: `/api/luteos/market/weekReport/list`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 周报管理(MCP)
   * @name LuteosMarketWeekReportListByPeriod
   * @summary 周期周报列表
   * @request GET:/api/luteos/market/weekReport/listByPeriod
   * @response `200` `MarketWeeklyReportListPeriodResp` OK
   */
  luteosMarketWeekReportListByPeriod = (
    query?: {
      /** 所属部门分支 */
      branch?: string;
      /** 结束日期 */
      endDate?: string;
      /** 员工工号 */
      jobNumber?: string;
      /** 员工编号 */
      memberCode?: string;
      /** 周期 */
      period?: string;
      /** 报告 */
      reportTitle?: string;
      /** 报告类型(1- 经营分析周报，2 - VOC周报，VOC报告必填，3-亚马逊周报) */
      reportTypes?: number[];
      /** 开始日期 */
      startDate?: string;
      /**
       * 团队报告
       * @format int32
       */
      teamReport?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<MarketWeeklyReportListPeriodResp, any>({
      path: `/api/luteos/market/weekReport/listByPeriod`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 周报管理(MCP)
   * @name LuteosMarketWeekReportListTeamReport
   * @summary 团队周报列表
   * @request GET:/api/luteos/market/weekReport/listTeamReport
   * @response `200` `MarketWeeklyReportListResp` OK
   */
  luteosMarketWeekReportListTeamReport = (
    query: {
      /** 所属部门分支 */
      branch?: string;
      /** 所属部门分支集合（团队报告） */
      branchList?: string[];
      /** 结束日期 */
      endDate?: string;
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
      /** @format int32 */
      pageStart?: number;
      /** 周期 */
      period?: string;
      /** 报告 */
      reportTitle?: string;
      /** 报告类型(1- 经营分析周报，2 - VOC周报，VOC报告必填，3-亚马逊周报) */
      reportTypes?: number[];
      /** 开始日期 */
      startDate?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<MarketWeeklyReportListResp, any>({
      path: `/api/luteos/market/weekReport/listTeamReport`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 周报管理(MCP)
   * @name LuteosMarketWeekReportQueryAiAnalysisReportDetail
   * @summary 查询AI经营分析周报详情
   * @request GET:/api/luteos/market/weekReport/queryAiAnalysisReportDetail
   * @response `200` `MarketWeeklyReportDetailResp` OK
   */
  luteosMarketWeekReportQueryAiAnalysisReportDetail = (
    query?: {
      /** 周期 */
      period?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<MarketWeeklyReportDetailResp, any>({
      path: `/api/luteos/market/weekReport/queryAiAnalysisReportDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 周报管理(MCP)
   * @name LuteosMarketWeekReportQueryAiAnalysisWeekList
   * @summary 获取AI经营分析周列表
   * @request GET:/api/luteos/market/weekReport/queryAiAnalysisWeekList
   * @response `200` `MarketWeeklyReportWeekListResp` OK
   */
  luteosMarketWeekReportQueryAiAnalysisWeekList = (params: RequestParams = {}) =>
    this.request<MarketWeeklyReportWeekListResp, any>({
      path: `/api/luteos/market/weekReport/queryAiAnalysisWeekList`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 周报管理(MCP)
   * @name LuteosMarketWeekReportQueryArea
   * @summary 查询周报区域
   * @request GET:/api/luteos/market/weekReport/queryArea
   * @response `200` `MarketWeeklyReportAreaResp` OK
   */
  luteosMarketWeekReportQueryArea = (params: RequestParams = {}) =>
    this.request<MarketWeeklyReportAreaResp, any>({
      path: `/api/luteos/market/weekReport/queryArea`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 周报管理(MCP)
   * @name LuteosMarketWeekReportQueryConfigList
   * @summary 获取周报配置列表
   * @request GET:/api/luteos/market/weekReport/queryConfigList
   * @response `200` `MarketWeeklyReportConfigListResp` OK
   */
  luteosMarketWeekReportQueryConfigList = (
    query: {
      /**
       * 周报类型
       * @format int32
       */
      reportType: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<MarketWeeklyReportConfigListResp, any>({
      path: `/api/luteos/market/weekReport/queryConfigList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 周报管理(MCP)
   * @name LuteosMarketWeekReportQueryCurrentGroupArea
   * @summary 查询当前用户周报组别区域
   * @request GET:/api/luteos/market/weekReport/queryCurrentGroupArea
   * @response `200` `MarketCurrentUserGroupAreaResp` OK
   */
  luteosMarketWeekReportQueryCurrentGroupArea = (params: RequestParams = {}) =>
    this.request<MarketCurrentUserGroupAreaResp, any>({
      path: `/api/luteos/market/weekReport/queryCurrentGroupArea`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 周报管理(MCP)
   * @name LuteosMarketWeekReportQueryGroupList
   * @summary 查询GTM组视角周报
   * @request GET:/api/luteos/market/weekReport/queryGroupList
   * @response `200` `MarketWeeklyReportGroupResp` OK
   */
  luteosMarketWeekReportQueryGroupList = (
    query?: {
      /** 组别编码 */
      groupCode?: string;
      /** 组别类型,默认GTM,后续可扩展 */
      groupType?: string;
      /** 周期 */
      period?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<MarketWeeklyReportGroupResp, any>({
      path: `/api/luteos/market/weekReport/queryGroupList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 周报管理(MCP)
   * @name LuteosMarketWeekReportQueryOptions
   * @summary 周报branch选择项
   * @request GET:/api/luteos/market/weekReport/queryOptions
   * @response `200` `MarketWeeklyReportOptionsResp` OK
   */
  luteosMarketWeekReportQueryOptions = (
    query?: {
      /** 组件名称 */
      componentName?: string;
      /** 菜单应用平台 lute_os lute_iot lute_business ... */
      platform?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<MarketWeeklyReportOptionsResp, any>({
      path: `/api/luteos/market/weekReport/queryOptions`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 周报管理(MCP)
   * @name LuteosMarketWeekReportQueryReportDetail
   * @summary 查询周报详情
   * @request GET:/api/luteos/market/weekReport/queryReportDetail
   * @response `200` `MarketWeeklyReportDetailResp` OK
   */
  luteosMarketWeekReportQueryReportDetail = (
    query: {
      /** 周报唯一键id */
      reportId: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<MarketWeeklyReportDetailResp, any>({
      path: `/api/luteos/market/weekReport/queryReportDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 周报管理(MCP)
   * @name LuteosMarketWeekReportQueryReporter
   * @summary 查询汇报人
   * @request GET:/api/luteos/market/weekReport/queryReporter
   * @response `200` `MarketWeeklyReporterResp` OK
   */
  luteosMarketWeekReportQueryReporter = (params: RequestParams = {}) =>
    this.request<MarketWeeklyReporterResp, any>({
      path: `/api/luteos/market/weekReport/queryReporter`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 周报管理(MCP)
   * @name LuteosMarketWeekReportQueryType
   * @summary 查询周报类型
   * @request GET:/api/luteos/market/weekReport/queryType
   * @response `200` `MarketWeeklyReportTypeResp` OK
   */
  luteosMarketWeekReportQueryType = (
    query?: {
      /** 组别编码 */
      groupCode?: string;
      /** 组别类型,默认GTM,后续可扩展 */
      groupType?: string;
      /** 周期 */
      period?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<MarketWeeklyReportTypeResp, any>({
      path: `/api/luteos/market/weekReport/queryType`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 周报管理(MCP)
   * @name LuteosMarketWeekReportQueryWeekList
   * @summary 获取周列表
   * @request GET:/api/luteos/market/weekReport/queryWeekList
   * @response `200` `MarketWeeklyReportWeekListResp` OK
   */
  luteosMarketWeekReportQueryWeekList = (params: RequestParams = {}) =>
    this.request<MarketWeeklyReportWeekListResp, any>({
      path: `/api/luteos/market/weekReport/queryWeekList`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 周报管理(MCP)
   * @name LuteosMarketWeekReportRemoveGroupType
   * @summary 删除周报类型映射
   * @request POST:/api/luteos/market/weekReport/removeGroupType
   * @response `200` `void` OK
   */
  luteosMarketWeekReportRemoveGroupType = (
    req: MarketWeeklyReportGroupRemoveReq,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/luteos/market/weekReport/removeGroupType`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 周报管理(MCP)
   * @name LuteosMarketWeekReportRemoveGroupTypeArea
   * @summary 删除周报区域映射
   * @request POST:/api/luteos/market/weekReport/removeGroupTypeArea
   * @response `200` `void` OK
   */
  luteosMarketWeekReportRemoveGroupTypeArea = (
    req: MarketWeeklyReportGroupRemoveReq,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/luteos/market/weekReport/removeGroupTypeArea`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 周报管理(MCP)
   * @name LuteosMarketWeekReportSave
   * @summary 保存周报
   * @request POST:/api/luteos/market/weekReport/save
   * @response `200` `MarketWeeklyReportCreateResp` OK
   */
  luteosMarketWeekReportSave = (req: MarketWeeklyReportCreateReq, params: RequestParams = {}) =>
    this.request<MarketWeeklyReportCreateResp, any>({
      path: `/api/luteos/market/weekReport/save`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 周报管理(MCP)
   * @name LuteosMarketWeekReportSaveGroupType
   * @summary 保存周报类型映射
   * @request POST:/api/luteos/market/weekReport/saveGroupType
   * @response `200` `void` OK
   */
  luteosMarketWeekReportSaveGroupType = (
    req: MarketWeeklyReportGroupSaveReq,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/luteos/market/weekReport/saveGroupType`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 周报管理(MCP)
   * @name LuteosMarketWeekReportSaveGroupTypeArea
   * @summary 保存周报类型区域映射
   * @request POST:/api/luteos/market/weekReport/saveGroupTypeArea
   * @response `200` `void` OK
   */
  luteosMarketWeekReportSaveGroupTypeArea = (
    req: MarketWeeklyReportGroupSaveReq,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/luteos/market/weekReport/saveGroupTypeArea`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 周报管理(MCP)
   * @name LuteosMarketWeekReportUpdate
   * @summary 修改周报
   * @request POST:/api/luteos/market/weekReport/update
   * @response `200` `MarketWeeklyReportCreateResp` OK
   */
  luteosMarketWeekReportUpdate = (req: MarketWeeklyReportUpdateReq, params: RequestParams = {}) =>
    this.request<MarketWeeklyReportCreateResp, any>({
      path: `/api/luteos/market/weekReport/update`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 周报管理(MCP)
   * @name LuteosMarketWeekReportUpdateByDetailId
   * @summary 修改周报详情
   * @request POST:/api/luteos/market/weekReport/updateByDetailId
   * @response `200` `MarketWeeklyReportCreateResp` OK
   */
  luteosMarketWeekReportUpdateByDetailId = (
    req: MarketWeeklyReportUpdateReq,
    params: RequestParams = {},
  ) =>
    this.request<MarketWeeklyReportCreateResp, any>({
      path: `/api/luteos/market/weekReport/updateByDetailId`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
}
