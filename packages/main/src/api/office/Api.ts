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
  AutoTaskConfigQueryResp,
  AutoTaskDetailResp,
  AutoTaskListQueryReq,
  AutoTaskListQueryResp,
  AutoTaskLogResp,
  AutoTaskOperateReq,
  AutoTaskSaveReq,
  AutoTaskSaveResp,
  BusinessDetailResp,
  BusinessListQueryReq,
  BusinessListResp,
  BusinessSaveOrUpdateReq,
  CalendarListReq,
  CalendarListResp,
  CalendarUserSubscribeReq,
  CalendarUserSubscribeResp,
  CalendarUserSubscribeSaveReq,
  CheckRejectRecordResp,
  CommonExportResp,
  CommonResp,
  CommonRespBoolean,
  CommonRespString,
  CommonRespVoid,
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
  DesignTaskListQueryResp,
  DesignTaskOperateReq,
  DesignTaskOperationGroupQueryResp,
  DesignTaskPeriodViewResp,
  DesignTaskSaveReq,
  DesignTaskSaveResp,
  DesignTaskStatisticResp,
  DesignTypeStatisticResp,
  DeviceControlReq,
  DeviceControlResp,
  DeviceCountResp,
  DictBean,
  DictQueryResp,
  FortuneCardReq,
  FortuneCardResp,
  GenerateAutoTaskCodeResp,
  MeetingDeviceDetailResp,
  MeetingDeviceListQueryReq,
  MeetingDeviceListQueryResp,
  RecentlyItemTypeResp,
  ShopDetailResp,
  ShopList2Resp,
  ShopListQueryReq,
  ShopListResp,
  ShopRecycleLabelSaveReq,
  ShopRemarkSaveReq,
  ShopSaveReq,
  TaskExecuteCountResp,
  TaskSuccessRateResp,
  TodayInsightsResp,
  UserListQueryResp,
  UserSatisfactionReq,
  UserSatisfactionResp,
  UserSaveReq,
  UserSaveResp,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags user-controller
   * @name BaseUserQueryUserList
   * @summary 用户列表查询
   * @request GET:/api/base/user/queryUserList
   * @response `200` `UserListQueryResp` OK
   */
  baseUserQueryUserList = (
    query: {
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
      /** 用户名称 */
      username?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<UserListQueryResp, any>({
      path: `/api/base/user/queryUserList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags user-controller
   * @name BaseUserSaveUserInfo
   * @summary 保存用户信息
   * @request POST:/api/base/user/saveUserInfo
   * @response `200` `UserSaveResp` OK
   */
  baseUserSaveUserInfo = (req: UserSaveReq, params: RequestParams = {}) =>
    this.request<UserSaveResp, any>({
      path: `/api/base/user/saveUserInfo`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
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
   * @name LuteosDesignQueryDesignTaskList
   * @summary 任务列表查询
   * @request GET:/api/luteos/design/queryDesignTaskList
   * @response `200` `DesignTaskListQueryResp` OK
   */
  luteosDesignQueryDesignTaskList = (
    query: {
      /** 设计师 */
      designerCode?: string;
      /**
       * 截止时间
       * @format date
       */
      endDate?: string;
      /** 创建人 */
      initiator?: string;
      /**
       * 项目类型 选“全部“则不传
       * @format int32
       */
      itemType?: number;
      /** 任务名称 */
      name?: string;
      /** 运营组 ，选'全部'则不传 */
      operatorGroupCode?: string;
      /** 运营组编码集合 */
      operatorGroupCodeList?: string[];
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
      /** 产品等级 */
      productLevel?: string;
      /**
       * 查询类型 1-任务池，2-我的任务 3-待办中心
       * @format int32
       */
      selectType: number;
      /**
       * 开始时间
       * @format date
       */
      startDate?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<DesignTaskListQueryResp, any>({
      path: `/api/luteos/design/queryDesignTaskList`,
      method: 'GET',
      query: query,
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
  /**
   * No description
   *
   * @tags 经营管理
   * @name LuteosShopBusinessQueryDetail
   * @summary 经营信息详情查询
   * @request GET:/api/luteos/shop/business/queryDetail
   * @response `200` `BusinessDetailResp` OK
   */
  luteosShopBusinessQueryDetail = (
    query: {
      /** 经营信息code */
      code: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<BusinessDetailResp, any>({
      path: `/api/luteos/shop/business/queryDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 经营管理
   * @name LuteosShopBusinessQueryList
   * @summary 经营信息列表查询
   * @request POST:/api/luteos/shop/business/queryList
   * @response `200` `BusinessListResp` OK
   */
  luteosShopBusinessQueryList = (req: BusinessListQueryReq, params: RequestParams = {}) =>
    this.request<BusinessListResp, any>({
      path: `/api/luteos/shop/business/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 经营管理
   * @name LuteosShopBusinessSaveOrUpdate
   * @summary 经营信息保存
   * @request POST:/api/luteos/shop/business/saveOrUpdate
   * @response `200` `CommonResp` OK
   */
  luteosShopBusinessSaveOrUpdate = (req: BusinessSaveOrUpdateReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/shop/business/saveOrUpdate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 店铺管理
   * @name LuteosShopClose
   * @summary 关店、开店
   * @request POST:/api/luteos/shop/close
   * @response `200` `CommonRespString` OK
   */
  luteosShopClose = (
    query: {
      /** 关店开店 */
      open: boolean;
      /** 店铺code */
      shopCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/shop/close`,
      method: 'POST',
      query: query,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 店铺管理
   * @name LuteosShopQueryShopCommonList
   * @summary 店铺列表查询2
   * @request POST:/api/luteos/shop/queryShopCommonList
   * @response `200` `ShopList2Resp` OK
   */
  luteosShopQueryShopCommonList = (
    shopListQueryReq: ShopListQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<ShopList2Resp, any>({
      path: `/api/luteos/shop/queryShopCommonList`,
      method: 'POST',
      body: shopListQueryReq,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 店铺管理
   * @name LuteosShopQueryShopDetail
   * @summary 店铺详情查询
   * @request GET:/api/luteos/shop/queryShopDetail
   * @response `200` `ShopDetailResp` OK
   */
  luteosShopQueryShopDetail = (
    query: {
      /** 店铺code */
      shopCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<ShopDetailResp, any>({
      path: `/api/luteos/shop/queryShopDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 店铺管理
   * @name LuteosShopQueryShopList
   * @summary 店铺列表查询
   * @request POST:/api/luteos/shop/queryShopList
   * @response `200` `ShopListResp` OK
   */
  luteosShopQueryShopList = (shopListQueryReq: ShopListQueryReq, params: RequestParams = {}) =>
    this.request<ShopListResp, any>({
      path: `/api/luteos/shop/queryShopList`,
      method: 'POST',
      body: shopListQueryReq,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 店铺管理
   * @name LuteosShopRecycleLabel
   * @summary 回收标签设置
   * @request POST:/api/luteos/shop/recycleLabel
   * @response `200` `CommonRespString` OK
   */
  luteosShopRecycleLabel = (req: ShopRecycleLabelSaveReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/shop/recycleLabel`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 店铺管理
   * @name LuteosShopSaveOrUpdate
   * @summary 新增或者编辑
   * @request POST:/api/luteos/shop/saveOrUpdate
   * @response `200` `CommonRespString` OK
   */
  luteosShopSaveOrUpdate = (req: ShopSaveReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/shop/saveOrUpdate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 店铺管理
   * @name LuteosShopSaveRemark
   * @summary 店铺备注
   * @request POST:/api/luteos/shop/saveRemark
   * @response `200` `CommonRespString` OK
   */
  luteosShopSaveRemark = (shopRemarkSaveReq: ShopRemarkSaveReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/shop/saveRemark`,
      method: 'POST',
      body: shopRemarkSaveReq,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 店铺管理
   * @name LuteosShopSelectEcShopList
   * @summary 查询店铺列表-易仓店铺账号
   * @request GET:/api/luteos/shop/selectEcShopList
   * @response `200` `(DictBean)[]` OK
   */
  luteosShopSelectEcShopList = (params: RequestParams = {}) =>
    this.request<DictBean[], any>({
      path: `/api/luteos/shop/selectEcShopList`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 店铺管理
   * @name LuteosShopSelectShopList
   * @summary 查询店铺列表
   * @request GET:/api/luteos/shop/selectShopList
   * @response `200` `(DictBean)[]` OK
   */
  luteosShopSelectShopList = (
    query?: {
      /** 平台 amazon shopify walmart ... */
      platform?: string;
      /** 站点 */
      site?: string;
      /** 站点 可多选 */
      siteList?: string[];
    },
    params: RequestParams = {},
  ) =>
    this.request<DictBean[], any>({
      path: `/api/luteos/shop/selectShopList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 日程管理
   * @name OfficeCalendarGenerateFortuneCard
   * @summary 生成运势卡片
   * @request POST:/api/office/calendar/generateFortuneCard
   * @response `200` `FortuneCardResp` OK
   */
  officeCalendarGenerateFortuneCard = (req: FortuneCardReq, params: RequestParams = {}) =>
    this.request<FortuneCardResp, any>({
      path: `/api/office/calendar/generateFortuneCard`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 日程管理
   * @name OfficeCalendarPublishCalendarUpdatedEvents
   * @summary 测试日程发布订阅功能
   * @request GET:/api/office/calendar/publishCalendarUpdatedEvents
   * @response `200` `void` OK
   */
  officeCalendarPublishCalendarUpdatedEvents = (
    query: {
      /** calendarId */
      calendarId: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/office/calendar/publishCalendarUpdatedEvents`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 日程管理
   * @name OfficeCalendarQueryCalendarList
   * @summary 用户日程列表查询
   * @request POST:/api/office/calendar/queryCalendarList
   * @response `200` `CalendarListResp` OK
   */
  officeCalendarQueryCalendarList = (req: CalendarListReq, params: RequestParams = {}) =>
    this.request<CalendarListResp, any>({
      path: `/api/office/calendar/queryCalendarList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 日程管理
   * @name OfficeCalendarQueryTodayInsights
   * @summary 今日洞察
   * @request POST:/api/office/calendar/queryTodayInsights
   * @response `200` `TodayInsightsResp` OK
   */
  officeCalendarQueryTodayInsights = (params: RequestParams = {}) =>
    this.request<TodayInsightsResp, any>({
      path: `/api/office/calendar/queryTodayInsights`,
      method: 'POST',
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 日程管理
   * @name OfficeCalendarQueryUserSubscribe
   * @summary 用户订阅规则查询
   * @request POST:/api/office/calendar/queryUserSubscribe
   * @response `200` `CalendarUserSubscribeResp` OK
   */
  officeCalendarQueryUserSubscribe = (req: CalendarUserSubscribeReq, params: RequestParams = {}) =>
    this.request<CalendarUserSubscribeResp, any>({
      path: `/api/office/calendar/queryUserSubscribe`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 日程管理
   * @name OfficeCalendarSaveUserSubscribe
   * @summary 用户订阅规则保存
   * @request POST:/api/office/calendar/saveUserSubscribe
   * @response `200` `CommonRespVoid` OK
   */
  officeCalendarSaveUserSubscribe = (
    req: CalendarUserSubscribeSaveReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/office/calendar/saveUserSubscribe`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 仅处理 device_type=sensor，根据设备-会议室映射解析 roomId 并初始化人在传感器触发的自动化任务实例
   *
   * @tags 智能会议-自动化任务管理
   * @name OfficeMeetingAutoDeviceStateWebhook
   * @summary 设备状态变更回调（人在传感器主动触发）
   * @request POST:/api/office/meeting/auto/deviceStateWebhook
   * @response `200` `CommonRespVoid` OK
   */
  officeMeetingAutoDeviceStateWebhook = (req: Record<string, object>, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/office/meeting/auto/deviceStateWebhook`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 智能会议-自动化任务管理
   * @name OfficeMeetingAutoGenerateAutoTaskCode
   * @summary 初始化自动化任务编码
   * @request POST:/api/office/meeting/auto/generateAutoTaskCode
   * @response `200` `GenerateAutoTaskCodeResp` OK
   */
  officeMeetingAutoGenerateAutoTaskCode = (params: RequestParams = {}) =>
    this.request<GenerateAutoTaskCodeResp, any>({
      path: `/api/office/meeting/auto/generateAutoTaskCode`,
      method: 'POST',
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 智能会议-自动化任务管理
   * @name OfficeMeetingAutoOperate
   * @summary 操作
   * @request POST:/api/office/meeting/auto/operate
   * @response `200` `CommonRespVoid` OK
   */
  officeMeetingAutoOperate = (req: AutoTaskOperateReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/office/meeting/auto/operate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 智能会议-自动化任务管理
   * @name OfficeMeetingAutoQueryAutoTaskConfig
   * @summary 自动化任务触发动作及执行动作等配置
   * @request GET:/api/office/meeting/auto/queryAutoTaskConfig
   * @response `200` `AutoTaskConfigQueryResp` OK
   */
  officeMeetingAutoQueryAutoTaskConfig = (params: RequestParams = {}) =>
    this.request<AutoTaskConfigQueryResp, any>({
      path: `/api/office/meeting/auto/queryAutoTaskConfig`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 智能会议-自动化任务管理
   * @name OfficeMeetingAutoQueryAutoTaskList
   * @summary 自动化任务列表
   * @request POST:/api/office/meeting/auto/queryAutoTaskList
   * @response `200` `AutoTaskListQueryResp` OK
   */
  officeMeetingAutoQueryAutoTaskList = (req: AutoTaskListQueryReq, params: RequestParams = {}) =>
    this.request<AutoTaskListQueryResp, any>({
      path: `/api/office/meeting/auto/queryAutoTaskList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 智能会议-自动化任务管理
   * @name OfficeMeetingAutoQueryDetail
   * @summary 详情
   * @request GET:/api/office/meeting/auto/queryDetail
   * @response `200` `AutoTaskDetailResp` OK
   */
  officeMeetingAutoQueryDetail = (
    query?: {
      /** 任务编码 */
      taskCode?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<AutoTaskDetailResp, any>({
      path: `/api/office/meeting/auto/queryDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 智能会议-自动化任务管理
   * @name OfficeMeetingAutoSave
   * @summary 保存
   * @request POST:/api/office/meeting/auto/save
   * @response `200` `AutoTaskSaveResp` OK
   */
  officeMeetingAutoSave = (req: AutoTaskSaveReq, params: RequestParams = {}) =>
    this.request<AutoTaskSaveResp, any>({
      path: `/api/office/meeting/auto/save`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 智能会议-自动化任务管理
   * @name OfficeMeetingAutoStatisticQueryDeviceCount
   * @summary 设备在线情况
   * @request GET:/api/office/meeting/auto/statistic/queryDeviceCount
   * @response `200` `DeviceCountResp` OK
   */
  officeMeetingAutoStatisticQueryDeviceCount = (params: RequestParams = {}) =>
    this.request<DeviceCountResp, any>({
      path: `/api/office/meeting/auto/statistic/queryDeviceCount`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 智能会议-自动化任务管理
   * @name OfficeMeetingAutoStatisticQueryLog
   * @summary 任务执行流水明细
   * @request GET:/api/office/meeting/auto/statistic/queryLog
   * @response `200` `AutoTaskLogResp` OK
   */
  officeMeetingAutoStatisticQueryLog = (
    query: {
      /**
       * 截止时间
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
      /** 会议室id */
      roomId?: string;
      /**
       * 开始时间
       * @format date
       */
      startDate?: string;
      /** 执行状态 success/fail/conflict */
      status?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<AutoTaskLogResp, any>({
      path: `/api/office/meeting/auto/statistic/queryLog`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 智能会议-自动化任务管理
   * @name OfficeMeetingAutoStatisticQueryTaskExecuteCount
   * @summary 任务执行次数
   * @request GET:/api/office/meeting/auto/statistic/queryTaskExecuteCount
   * @response `200` `TaskExecuteCountResp` OK
   */
  officeMeetingAutoStatisticQueryTaskExecuteCount = (
    query?: {
      /**
       * 日期
       * @format date
       */
      day?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<TaskExecuteCountResp, any>({
      path: `/api/office/meeting/auto/statistic/queryTaskExecuteCount`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 智能会议-自动化任务管理
   * @name OfficeMeetingAutoStatisticQueryTaskSuccessRate
   * @summary 成功任务率
   * @request GET:/api/office/meeting/auto/statistic/queryTaskSuccessRate
   * @response `200` `TaskSuccessRateResp` OK
   */
  officeMeetingAutoStatisticQueryTaskSuccessRate = (
    query?: {
      /**
       * 日期
       * @format date
       */
      day?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<TaskSuccessRateResp, any>({
      path: `/api/office/meeting/auto/statistic/queryTaskSuccessRate`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 智能会议-设备管理
   * @name OfficeMeetingDeviceControlDevice
   * @summary 控制设备
   * @request POST:/api/office/meeting/device/controlDevice
   * @response `200` `DeviceControlResp` OK
   */
  officeMeetingDeviceControlDevice = (req: DeviceControlReq, params: RequestParams = {}) =>
    this.request<DeviceControlResp, any>({
      path: `/api/office/meeting/device/controlDevice`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 智能会议-设备管理
   * @name OfficeMeetingDeviceQueryMeetingDeviceDetail
   * @summary 会议设备详情
   * @request GET:/api/office/meeting/device/queryMeetingDeviceDetail
   * @response `200` `MeetingDeviceDetailResp` OK
   */
  officeMeetingDeviceQueryMeetingDeviceDetail = (
    query: {
      /** 设备编码 */
      deviceCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<MeetingDeviceDetailResp, any>({
      path: `/api/office/meeting/device/queryMeetingDeviceDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 智能会议-设备管理
   * @name OfficeMeetingDeviceQueryMeetingDeviceList
   * @summary 会议设备列表分页查询
   * @request POST:/api/office/meeting/device/queryMeetingDeviceList
   * @response `200` `MeetingDeviceListQueryResp` OK
   */
  officeMeetingDeviceQueryMeetingDeviceList = (
    req: MeetingDeviceListQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<MeetingDeviceListQueryResp, any>({
      path: `/api/office/meeting/device/queryMeetingDeviceList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 智能会议-设备管理
   * @name OfficeMeetingDeviceReflashDevice
   * @summary 获取第三方设备信息
   * @request POST:/api/office/meeting/device/reflashDevice
   * @response `200` `CommonRespVoid` OK
   */
  officeMeetingDeviceReflashDevice = (params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/office/meeting/device/reflashDevice`,
      method: 'POST',
      type: ContentType.Json,
      ...params,
    });
}
