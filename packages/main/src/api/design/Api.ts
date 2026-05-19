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
  CheckRejectRecordResp,
  CommonExportResp,
  CommonRespBoolean,
  CommonRespVoid,
  DesignApprovalConfigDetailResp,
  DesignApprovalConfigListResp,
  DesignApprovalConfigSaveReq,
  DesignApprovalConfigSaveResp,
  DesignBrandDetailResp,
  DesignBrandListQueryResp,
  DesignBrandSaveReq,
  DesignDeptStatisticResp,
  DesignerListResp,
  DesignerStatisticReq,
  DesignerStatisticResp,
  DesignItemTypeAuthResp,
  DesignOperationGroupDetailResp,
  DesignOperationGroupListQueryResp,
  DesignOperationGroupSaveReq,
  DesignPdtLevelListResp,
  DesignScoreDetailResp,
  DesignScoreListQueryResp,
  DesignScoreSaveReq,
  DesignScoreStatisticReq,
  DesignScoreStatisticResp,
  DesignTaskChangeReq,
  DesignTaskDetailResp,
  DesignTaskFileUrlResp,
  DesignTaskItemType02ListResp,
  DesignTaskListQueryReq,
  DesignTaskListQueryResp,
  DesignTaskOperateReq,
  DesignTaskOperationGroupQueryResp,
  DesignTaskPeriodViewResp,
  DesignTaskSaveReq,
  DesignTaskSaveResp,
  DesignTaskStatisticResp,
  DesignTypeStatisticResp,
  DictQueryResp,
  RecentlyItemTypeResp,
  UserSatisfactionReq,
  UserSatisfactionResp,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags 品牌管理
   * @name LuteosDesignBrandQueryDesignBrandDetail
   * @summary 品牌详情查询
   * @request GET:/api/luteos/design/brand/queryDesignBrandDetail
   * @response `200` `DesignBrandDetailResp` OK
   */
  luteosDesignBrandQueryDesignBrandDetail = (
    query?: {
      /** 记录编码 */
      designBrandCode?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<DesignBrandDetailResp, any>({
      path: `/api/luteos/design/brand/queryDesignBrandDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 品牌管理
   * @name LuteosDesignBrandQueryDesignBrandList
   * @summary 品牌列表查询
   * @request GET:/api/luteos/design/brand/queryDesignBrandList
   * @response `200` `DesignBrandListQueryResp` OK
   */
  luteosDesignBrandQueryDesignBrandList = (
    query: {
      /** 名称 */
      name?: string;
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
    this.request<DesignBrandListQueryResp, any>({
      path: `/api/luteos/design/brand/queryDesignBrandList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 品牌管理
   * @name LuteosDesignBrandSaveDesignBrand
   * @summary 品牌保存
   * @request POST:/api/luteos/design/brand/saveDesignBrand
   * @response `200` `void` OK
   */
  luteosDesignBrandSaveDesignBrand = (req: DesignBrandSaveReq, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/luteos/design/brand/saveDesignBrand`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 设计任务
   * @name LuteosDesignChangeTask
   * @summary 变更操作
   * @request POST:/api/luteos/design/changeTask
   * @response `200` `CommonRespVoid` OK
   */
  luteosDesignChangeTask = (req: DesignTaskChangeReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/design/changeTask`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 产品等级管理
   * @name LuteosDesignLevelQueryDesignPdtLevelList
   * @summary 产品等级列表查询
   * @request GET:/api/luteos/design/level/queryDesignPdtLevelList
   * @response `200` `DesignPdtLevelListResp` OK
   */
  luteosDesignLevelQueryDesignPdtLevelList = (params: RequestParams = {}) =>
    this.request<DesignPdtLevelListResp, any>({
      path: `/api/luteos/design/level/queryDesignPdtLevelList`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 设计任务
   * @name LuteosDesignOperateDesignTask
   * @summary 设计任务操作
   * @request POST:/api/luteos/design/operateDesignTask
   * @response `200` `CommonRespBoolean` OK
   */
  luteosDesignOperateDesignTask = (req: DesignTaskOperateReq, params: RequestParams = {}) =>
    this.request<CommonRespBoolean, any>({
      path: `/api/luteos/design/operateDesignTask`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 配置类型及通知管理
   * @name LuteosDesignOperationQueryDesignApprovalConfigDetail
   * @summary 设计审批配置详情
   * @request GET:/api/luteos/design/operation/queryDesignApprovalConfigDetail
   * @response `200` `DesignApprovalConfigDetailResp` OK
   */
  luteosDesignOperationQueryDesignApprovalConfigDetail = (
    query: {
      /**
       * 主键
       * @format int64
       */
      id: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<DesignApprovalConfigDetailResp, any>({
      path: `/api/luteos/design/operation/queryDesignApprovalConfigDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 配置类型及通知管理
   * @name LuteosDesignOperationQueryDesignApprovalConfigList
   * @summary 设计审批配置列表（任务类型同 queryDesignerList 的 itemType / DesignTaskItemTypeEnum）
   * @request GET:/api/luteos/design/operation/queryDesignApprovalConfigList
   * @response `200` `DesignApprovalConfigListResp` OK
   */
  luteosDesignOperationQueryDesignApprovalConfigList = (
    query: {
      /**
       * 任务类型 DesignTaskItemTypeEnum，与 queryDesignerList 的 itemType 一致
       * @format int32
       */
      itemType?: number;
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
       * 状态 1启用 0禁止
       * @format int32
       */
      status?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<DesignApprovalConfigListResp, any>({
      path: `/api/luteos/design/operation/queryDesignApprovalConfigList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 配置类型及通知管理
   * @name LuteosDesignOperationQueryDesignOperationGroupDetail
   * @summary 配置类型详情查询
   * @request GET:/api/luteos/design/operation/queryDesignOperationGroupDetail
   * @response `200` `DesignOperationGroupDetailResp` OK
   */
  luteosDesignOperationQueryDesignOperationGroupDetail = (
    query: {
      /** 记录编码 */
      operatorGroupCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<DesignOperationGroupDetailResp, any>({
      path: `/api/luteos/design/operation/queryDesignOperationGroupDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 配置类型及通知管理
   * @name LuteosDesignOperationQueryDesignOperationGroupList
   * @summary 配置类型列表查询
   * @request GET:/api/luteos/design/operation/queryDesignOperationGroupList
   * @response `200` `DesignOperationGroupListQueryResp` OK
   */
  luteosDesignOperationQueryDesignOperationGroupList = (
    query: {
      /**
       * 项目类型
       * @format int32
       */
      itemType: number;
      /** 产品名称 */
      name?: string;
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
    this.request<DesignOperationGroupListQueryResp, any>({
      path: `/api/luteos/design/operation/queryDesignOperationGroupList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 配置类型及通知管理
   * @name LuteosDesignOperationSaveDesignApprovalConfig
   * @summary 设计审批配置保存（新增不传 id，编辑传 id）
   * @request POST:/api/luteos/design/operation/saveDesignApprovalConfig
   * @response `200` `DesignApprovalConfigSaveResp` OK
   */
  luteosDesignOperationSaveDesignApprovalConfig = (
    req: DesignApprovalConfigSaveReq,
    params: RequestParams = {},
  ) =>
    this.request<DesignApprovalConfigSaveResp, any>({
      path: `/api/luteos/design/operation/saveDesignApprovalConfig`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 配置类型及通知管理
   * @name LuteosDesignOperationSaveDesignOperationGroup
   * @summary 配置类型保存
   * @request POST:/api/luteos/design/operation/saveDesignOperationGroup
   * @response `200` `void` OK
   */
  luteosDesignOperationSaveDesignOperationGroup = (
    req: DesignOperationGroupSaveReq,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/luteos/design/operation/saveDesignOperationGroup`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 设计任务
   * @name LuteosDesignQueryDesignItemTypeAuth
   * @summary 二期设计任务项目类型访问权限
   * @request GET:/api/luteos/design/queryDesignItemTypeAuth
   * @response `200` `DesignItemTypeAuthResp` OK
   */
  luteosDesignQueryDesignItemTypeAuth = (params: RequestParams = {}) =>
    this.request<DesignItemTypeAuthResp, any>({
      path: `/api/luteos/design/queryDesignItemTypeAuth`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 设计任务
   * @name LuteosDesignQueryDesignLevelDict
   * @summary 设计任务等级
   * @request GET:/api/luteos/design/queryDesignLevelDict
   * @response `200` `DictQueryResp` OK
   */
  luteosDesignQueryDesignLevelDict = (
    query?: {
      /**
       * 项目类型 1-电商/网页设计 2-平面物料设计 3-视频/MG动画 4-摄影 5-三维渲染 6-包装设计 7-ID设计 8-CMF设计 9-网页设计 10-UI设计  配置管理分数查等级 默认传20
       * @format int32
       */
      itemType?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<DictQueryResp, any>({
      path: `/api/luteos/design/queryDesignLevelDict`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 设计任务
   * @name LuteosDesignQueryDesignTaskDetail
   * @summary 设计任务详情查询
   * @request GET:/api/luteos/design/queryDesignTaskDetail
   * @response `200` `DesignTaskDetailResp` OK
   */
  luteosDesignQueryDesignTaskDetail = (
    query: {
      /** 设计任务编码 */
      designTaskCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<DesignTaskDetailResp, any>({
      path: `/api/luteos/design/queryDesignTaskDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 设计任务
   * @name LuteosDesignQueryDesignTaskItemType02List
   * @summary 获取二期任务类型列表（DesignTaskItemTypeEnum.itemType02）
   * @request GET:/api/luteos/design/queryDesignTaskItemType02List
   * @response `200` `DesignTaskItemType02ListResp` OK
   */
  luteosDesignQueryDesignTaskItemType02List = (params: RequestParams = {}) =>
    this.request<DesignTaskItemType02ListResp, any>({
      path: `/api/luteos/design/queryDesignTaskItemType02List`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 设计任务
   * @name LuteosDesignQueryDesignTaskList
   * @summary 任务列表查询
   * @request POST:/api/luteos/design/queryDesignTaskList
   * @response `200` `DesignTaskListQueryResp` OK
   */
  luteosDesignQueryDesignTaskList = (req: DesignTaskListQueryReq, params: RequestParams = {}) =>
    this.request<DesignTaskListQueryResp, any>({
      path: `/api/luteos/design/queryDesignTaskList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 设计任务
   * @name LuteosDesignQueryDesignTaskOperationGroupList
   * @summary 项目类型运营组查询
   * @request GET:/api/luteos/design/queryDesignTaskOperationGroupList
   * @response `200` `DesignTaskOperationGroupQueryResp` OK
   */
  luteosDesignQueryDesignTaskOperationGroupList = (
    query?: {
      /**
       * 项目类型
       * @format int32
       */
      itemType?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<DesignTaskOperationGroupQueryResp, any>({
      path: `/api/luteos/design/queryDesignTaskOperationGroupList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 设计任务
   * @name LuteosDesignQueryDesignTaskPeriodViewList
   * @summary 设计任务日历周期查询
   * @request GET:/api/luteos/design/queryDesignTaskPeriodViewList
   * @response `200` `DesignTaskPeriodViewResp` OK
   */
  luteosDesignQueryDesignTaskPeriodViewList = (
    query: {
      designTaskCodeList?: string[];
      /**
       * 设计类型
       * @format int32
       */
      itemType: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<DesignTaskPeriodViewResp, any>({
      path: `/api/luteos/design/queryDesignTaskPeriodViewList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 设计任务
   * @name LuteosDesignQueryDesignerList
   * @summary 设计师列表查询
   * @request GET:/api/luteos/design/queryDesignerList
   * @response `200` `DesignerListResp` OK
   */
  luteosDesignQueryDesignerList = (
    query?: {
      /**
       * 项目类型
       * @format int32
       */
      itemType?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<DesignerListResp, any>({
      path: `/api/luteos/design/queryDesignerList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 设计任务
   * @name LuteosDesignQueryFileUrl
   * @summary 附件url查询
   * @request GET:/api/luteos/design/queryFileUrl
   * @response `200` `DesignTaskFileUrlResp` OK
   */
  luteosDesignQueryFileUrl = (
    query: {
      /** 设计任务编码 */
      designTaskCode: string;
      /** ossKey */
      ossKey: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<DesignTaskFileUrlResp, any>({
      path: `/api/luteos/design/queryFileUrl`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 设计任务
   * @name LuteosDesignQueryRecentlyItemType
   * @summary 最近项目类型
   * @request GET:/api/luteos/design/queryRecentlyItemType
   * @response `200` `RecentlyItemTypeResp` OK
   */
  luteosDesignQueryRecentlyItemType = (params: RequestParams = {}) =>
    this.request<RecentlyItemTypeResp, any>({
      path: `/api/luteos/design/queryRecentlyItemType`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 设计任务
   * @name LuteosDesignQueryRejectRecordList
   * @summary 驳回记录查询
   * @request GET:/api/luteos/design/queryRejectRecordList
   * @response `200` `CheckRejectRecordResp` OK
   */
  luteosDesignQueryRejectRecordList = (
    query?: {
      /** 设计任务编码 */
      designTaskCode?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CheckRejectRecordResp, any>({
      path: `/api/luteos/design/queryRejectRecordList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 设计任务
   * @name LuteosDesignSaveDesignTask
   * @summary 设计任务保存
   * @request POST:/api/luteos/design/saveDesignTask
   * @response `200` `DesignTaskSaveResp` OK
   */
  luteosDesignSaveDesignTask = (req: DesignTaskSaveReq, params: RequestParams = {}) =>
    this.request<DesignTaskSaveResp, any>({
      path: `/api/luteos/design/saveDesignTask`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 设计分数管理
   * @name LuteosDesignScoreQueryDesignScoreDetail
   * @summary 设计分数详情查询
   * @request GET:/api/luteos/design/score/queryDesignScoreDetail
   * @response `200` `DesignScoreDetailResp` OK
   */
  luteosDesignScoreQueryDesignScoreDetail = (
    query: {
      /** 记录编码 */
      designScoreCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<DesignScoreDetailResp, any>({
      path: `/api/luteos/design/score/queryDesignScoreDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 设计分数管理
   * @name LuteosDesignScoreQueryDesignScoreList
   * @summary 设计分数列表查询
   * @request GET:/api/luteos/design/score/queryDesignScoreList
   * @response `200` `DesignScoreListQueryResp` OK
   */
  luteosDesignScoreQueryDesignScoreList = (
    query: {
      /**
       * 项目类型
       * @format int32
       */
      itemType: number;
      /** 名称 */
      name?: string;
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
      /** 任务类别 */
      taskType?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<DesignScoreListQueryResp, any>({
      path: `/api/luteos/design/score/queryDesignScoreList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 设计分数管理
   * @name LuteosDesignScoreSaveDesignScore
   * @summary 设计分数保存
   * @request POST:/api/luteos/design/score/saveDesignScore
   * @response `200` `CommonRespBoolean` OK
   */
  luteosDesignScoreSaveDesignScore = (req: DesignScoreSaveReq, params: RequestParams = {}) =>
    this.request<CommonRespBoolean, any>({
      path: `/api/luteos/design/score/saveDesignScore`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 统计分析管理
   * @name LuteosDesignStatisticAnalysisExportDesignScoreStatistic
   * @summary 设计分数导出
   * @request POST:/api/luteos/design/statistic/analysis/exportDesignScoreStatistic
   * @response `200` `CommonExportResp` OK
   */
  luteosDesignStatisticAnalysisExportDesignScoreStatistic = (
    req: DesignScoreStatisticReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/design/statistic/analysis/exportDesignScoreStatistic`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 统计分析管理
   * @name LuteosDesignStatisticAnalysisExportDesignTaskStatistic
   * @summary 任务分析导出
   * @request POST:/api/luteos/design/statistic/analysis/exportDesignTaskStatistic
   * @response `200` `CommonExportResp` OK
   */
  luteosDesignStatisticAnalysisExportDesignTaskStatistic = (
    req: DesignScoreStatisticReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/design/statistic/analysis/exportDesignTaskStatistic`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 统计分析管理
   * @name LuteosDesignStatisticAnalysisExportDesignerStatistic
   * @summary 设计师数据导出
   * @request POST:/api/luteos/design/statistic/analysis/exportDesignerStatistic
   * @response `200` `CommonExportResp` OK
   */
  luteosDesignStatisticAnalysisExportDesignerStatistic = (
    req: DesignerStatisticReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/design/statistic/analysis/exportDesignerStatistic`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 统计分析管理
   * @name LuteosDesignStatisticAnalysisExportUserSatisfaction
   * @summary 用户满意度分析导出
   * @request POST:/api/luteos/design/statistic/analysis/exportUserSatisfaction
   * @response `200` `CommonExportResp` OK
   */
  luteosDesignStatisticAnalysisExportUserSatisfaction = (
    req: UserSatisfactionReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/design/statistic/analysis/exportUserSatisfaction`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 统计分析管理
   * @name LuteosDesignStatisticAnalysisQueryDesignDeptStatisticList
   * @summary 部门总统计数据
   * @request GET:/api/luteos/design/statistic/analysis/queryDesignDeptStatisticList
   * @response `200` `DesignDeptStatisticResp` OK
   */
  luteosDesignStatisticAnalysisQueryDesignDeptStatisticList = (
    query?: {
      /**
       * 结束日期
       * @format date
       */
      endDate?: string;
      /**
       * 开始日期
       * @format date
       */
      startDate?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<DesignDeptStatisticResp, any>({
      path: `/api/luteos/design/statistic/analysis/queryDesignDeptStatisticList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 统计分析管理
   * @name LuteosDesignStatisticAnalysisQueryDesignScoreStatisticList
   * @summary 设计分数统计查询
   * @request GET:/api/luteos/design/statistic/analysis/queryDesignScoreStatisticList
   * @response `200` `DesignScoreStatisticResp` OK
   */
  luteosDesignStatisticAnalysisQueryDesignScoreStatisticList = (
    query: {
      /** 设计师编码 */
      designerCode?: string;
      /** 设计类型 brand_design-品牌设计部 experience_design-体验设计部 creative_design-创意设计部 industrial_design-工业设计部 old_design-一期任务 */
      designType?: string;
      /**
       * 结束日期
       * @format date
       */
      endDate?: string;
      /** 设计类型 brand_design-品牌设计部 experience_design-体验设计部 creative_design-创意设计部 industrial_design-工业设计部 old_design-一期任务 */
      itemType?: string;
      /** 关键词 任务名称/合同编码 */
      keyword?: string;
      /** 任务名称 */
      name?: string;
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
      /** 选择日期 */
      selectDate?: string;
      /**
       * 开始日期
       * @format date
       */
      startDate?: string;
      /**
       * 状态
       * @format int32
       */
      status?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<DesignScoreStatisticResp, any>({
      path: `/api/luteos/design/statistic/analysis/queryDesignScoreStatisticList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 统计分析管理
   * @name LuteosDesignStatisticAnalysisQueryDesignTaskStatisticList
   * @summary 任务总统计数据
   * @request GET:/api/luteos/design/statistic/analysis/queryDesignTaskStatisticList
   * @response `200` `DesignTaskStatisticResp` OK
   */
  luteosDesignStatisticAnalysisQueryDesignTaskStatisticList = (
    query: {
      /**
       * 结束日期
       * @format date
       */
      endDate?: string;
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
       * 开始日期
       * @format date
       */
      startDate?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<DesignTaskStatisticResp, any>({
      path: `/api/luteos/design/statistic/analysis/queryDesignTaskStatisticList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 统计分析管理
   * @name LuteosDesignStatisticAnalysisQueryDesignTypeStatisticList
   * @summary 类型总统计数据
   * @request GET:/api/luteos/design/statistic/analysis/queryDesignTypeStatisticList
   * @response `200` `DesignTypeStatisticResp` OK
   */
  luteosDesignStatisticAnalysisQueryDesignTypeStatisticList = (
    query?: {
      /**
       * 结束日期
       * @format date
       */
      endDate?: string;
      /**
       * 开始日期
       * @format date
       */
      startDate?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<DesignTypeStatisticResp, any>({
      path: `/api/luteos/design/statistic/analysis/queryDesignTypeStatisticList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 统计分析管理
   * @name LuteosDesignStatisticAnalysisQueryDesignerStatisticList
   * @summary 设计师数据统计查询
   * @request GET:/api/luteos/design/statistic/analysis/queryDesignerStatisticList
   * @response `200` `DesignerStatisticResp` OK
   */
  luteosDesignStatisticAnalysisQueryDesignerStatisticList = (
    query: {
      /**
       * 结束日期
       * @format date
       */
      endDate?: string;
      /**
       * 项目类型
       * @format int32
       */
      itemType?: number;
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
       * 开始日期
       * @format date
       */
      startDate?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<DesignerStatisticResp, any>({
      path: `/api/luteos/design/statistic/analysis/queryDesignerStatisticList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 统计分析管理
   * @name LuteosDesignStatisticAnalysisQueryUserSatisfactionList
   * @summary 用户满意度分析
   * @request GET:/api/luteos/design/statistic/analysis/queryUserSatisfactionList
   * @response `200` `UserSatisfactionResp` OK
   */
  luteosDesignStatisticAnalysisQueryUserSatisfactionList = (
    query: {
      /** 关键词 */
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
      /** 年份 */
      selectDate?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<UserSatisfactionResp, any>({
      path: `/api/luteos/design/statistic/analysis/queryUserSatisfactionList`,
      method: 'GET',
      query: query,
      ...params,
    });
}
