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
  AliyunTempMorePolicyResp,
  AliyunTempPolicyResp,
  CategoryTreeResp,
  ChannelAccountDeleteReq,
  ChannelAccountDetailQueryReq,
  ChannelAccountDetailResp,
  ChannelAccountListQueryReq,
  ChannelAccountListResp,
  ChannelAccountSaveOrUpdateReq,
  ChannelConfigDeleteReq,
  ChannelConfigDetailQueryReq,
  ChannelConfigDetailResp,
  ChannelConfigListQueryReq,
  ChannelConfigListResp,
  ChannelConfigPlatformListResp,
  ChannelConfigSaveOrUpdateReq,
  CommonExportResp,
  CommonOperateReq,
  CommonResp,
  CommonRespBoolean,
  CommonRespCommonExportResp,
  CommonRespDemandBrandCooperTypeResp,
  CommonRespObject,
  CommonRespOpenClawUrlResp,
  CommonRespPlatformRefreshBean,
  CommonRespString,
  CommonRespVoid,
  CountryInfoListQueryResp,
  CountryListQueryResp,
  CountryPlatformQueryReq,
  CountryPlatformQueryResp,
  CTripCityReq,
  CTripCityResp,
  CTripCountryResp,
  CTripFlowCheckReq,
  DemandAgencyListQueryReq,
  DemandAgencyListQueryResp,
  DemandBrandCheckReceiveReq,
  DemandBrandSelectProductResp,
  DemandCacheDraftResp,
  DemandDetailResp,
  DemandExecuteSaveReq,
  DemandExecutionFinishReq,
  DemandExpertListQueryReq,
  DemandExpertListQueryResp,
  DemandExpertTypeListQueryReq,
  DemandExpertTypeListQueryResp,
  DemandFinishMemberStaticsQueryResp,
  DemandFinishStaticsQueryResp,
  DemandItBatchOperateReq,
  DemandItBatchOperateResp,
  DemandItOperateReq,
  DemandListQueryReq,
  DemandListQueryResp,
  DemandMediaListQueryResp,
  DemandMemberResp,
  DemandNeedAvgStaticsQueryResp,
  DemandOperateReq,
  DemandOperateResp,
  DemandPdtCategoryReq,
  DemandPdtCategoryResp,
  DemandPersonLandStaticsQueryResp,
  DemandPersonMemberStaticsQueryResp,
  DemandPersonOnTimeStaticsQueryResp,
  DemandPersonScoreStaticsQueryResp,
  DemandProcessStepResp,
  DemandProductLineStatusStaticsQueryResp,
  DemandPurchaseAmountReq,
  DemandPurchaseAmountResp,
  DemandPurchaseMaterialListQueryResp,
  DemandPurchaseNoticeReq,
  DemandPurchaseNoticeResp,
  DemandPurchaseOperateReq,
  DemandPurchaseOperateResp,
  DemandPurchaseProcessStepResp,
  DemandPurchaseSyncReq,
  DemandPurchaseSyncResp,
  DemandPurchaseUpdateReq,
  DemandPurchaseUpdateResp,
  DemandSaveReq,
  DemandSaveResp,
  DemandSrmPoCallbackReq,
  DemandSrmPoCallbackResp,
  DemandStatusCountResp,
  DemandStatusDeptStaticsQueryResp,
  DemandStatusPersonStaticsQueryResp,
  DemandStatusStaticsQueryResp,
  DeptInfoResp,
  DesktopNotifyListResp,
  DesktopReportReq,
  DictBean,
  DictDeleteReq,
  DictModuleListResp,
  DictModuleQueryReq,
  DictQueryDetailQueryReq,
  DictQueryListSaveReq,
  DictQueryPageResp,
  DictQueryReq,
  DictQueryResp,
  DictQuerySingleResp,
  DictSaveOrUpdateReq,
  EntertainConflictReq,
  EntertainConflictResp,
  EntertainQueryReq,
  EntertainQueryResp,
  EntertainSaveReq,
  EntertainSaveResp,
  FeedbackDetailResp,
  FeedbackListResp,
  FeedbackMenuResp,
  FeedbackOperateReq,
  FeedbackOperateResp,
  FeedbackRecordListResp,
  FeedbackSaveReq,
  FeedbackSaveResp,
  FileRecordListQueryResp,
  FlowChangeStatusReq,
  FlowDetailQueryResp,
  FlowListQueryReq,
  FlowListQueryResp,
  FlowSaveReq,
  FlowTemplateResp,
  IfNewNotifyResp,
  LabelCategoryTreeQueryReq,
  LabelCategoryTreeQueryResp,
  LabelDeleteReq,
  LabelListQueryResp,
  LabelModelResp,
  LabelModelSaveReq,
  LabelModelSaveResp,
  LabelSaveMultiReq,
  LabelSaveReq,
  LabelSaveResp,
  LeadBpActionResp,
  LeadBpConfirmReq,
  LeadBpTransferReq,
  LeadDeptMappingListResp,
  LeadDeptMappingSaveReq,
  LeadDeptMappingSaveResp,
  LeadDetailResp,
  LeadOperationLogResp,
  LeadReviewReq,
  LeadReviewResp,
  LeadSubmitReq,
  LeadSubmitResp,
  LeadValueListResp,
  LeadValueStartAssessmentReq,
  LeadValueStartAssessmentResp,
  MeetingRoomResp,
  MenuDetailQueryResp,
  MenuOperateReq,
  MenuOperateResp,
  MenuSaveReq,
  MenuSaveResp,
  MenuTreeQueryResp,
  ModelRefreshReq,
  MyWorkflowCountResp,
  NotifyAllLabelResp,
  NotifyReportReq,
  OperationLogResp,
  OperationLogSaveReq,
  OssQueryResp,
  PlatformLogReq,
  PlatformLogResp,
  PlatformMappingChangeStatusReq,
  PlatformMappingDeletedReq,
  PlatformMappingListReq,
  PlatformMappingListResp,
  PlatformMappingSaveOrUpdateReq,
  PlatformRoleResourceSaveReq,
  ProductCenterDeptResp,
  ProvinceInfoListQueryReq,
  ProvinceInfoListQueryResp,
  RegionQueryResp,
  RoleAccountResp,
  RoleAccountSaveReq,
  RoleDetailResp,
  RoleListQueryPageResp,
  RoleListQueryResp,
  RoleMenuSaveReq,
  RoleMenuTreeQueryResp,
  RoleOperateReq,
  RoleRemoveReq,
  RoleSaveReq,
  RoleSaveResp,
  SalesTendencyChartResp,
  SearchConditionListQueryResp,
  SearchConditionSaveReq,
  SearchConditionSaveResp,
  SiteInfoDesp,
  SiteListQueryResp,
  SmartMeetingQueryRoomDeviceResp,
  SmartMeetingRoomDeviceChangeReq,
  SmartMeetingRoomDeviceResp,
  SmartMeetingRoomDeviceSaveReq,
  SmartMeetingRoomResp,
  SseEmitter,
  SysTemplateDetailResp,
  SysTemplateOperateReq,
  SysTemplateOperateResp,
  SysTemplateQueryResp,
  SysTemplateSaveReq,
  SysTemplateSaveResp,
  TaskCategoryListResp,
  TaskCategorySaveReq,
  TaskCategorySaveResp,
  TaskChangeDetailResp,
  TaskChangeReq,
  TaskDetailResp,
  TaskExportReq,
  TaskListResp,
  TaskOperateReq,
  TaskOperateResp,
  TaskSaveReq,
  TaskSaveResp,
  TaskStatisticsReq,
  TaskStatisticsResp,
  UserNotifyDetailBean,
  UserNotifyListResp,
  WorkflowDetailQueryResp,
  WorkflowListQueryResp,
  WorkflowWithdrawReq,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags 平台资源模块, 角色管理
   * @name PlatformAccountQueryAllAccount
   * @summary 所有账号查询
   * @request GET:/api/platform/account/queryAllAccount
   * @response `200` `RoleAccountResp` OK
   */
  platformAccountQueryAllAccount = (params: RequestParams = {}) =>
    this.request<RoleAccountResp, any>({
      path: `/api/platform/account/queryAllAccount`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags AI模块
   * @name PlatformAiOpenClawUrl
   * @summary 获取openClaw地址
   * @request GET:/api/platform/ai/openClawUrl
   * @response `200` `CommonRespOpenClawUrlResp` OK
   */
  platformAiOpenClawUrl = (
    query?: {
      /** 员工编码，不传默认取当前登录人 */
      memberCode?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespOpenClawUrlResp, any>({
      path: `/api/platform/ai/openClawUrl`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 平台模块
   * @name PlatformAllList
   * @summary 获取所有平台
   * @request GET:/api/platform/allList
   * @response `200` `(DictBean)[]` OK
   */
  platformAllList = (params: RequestParams = {}) =>
    this.request<DictBean[], any>({
      path: `/api/platform/allList`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 平台模块
   * @name PlatformCanLastRefresh
   * @summary 业务模块-是否能手动刷新
   * @request GET:/api/platform/can/lastRefresh
   * @response `200` `CommonRespPlatformRefreshBean` OK
   */
  platformCanLastRefresh = (
    query: {
      /** modelCode */
      modelCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespPlatformRefreshBean, any>({
      path: `/api/platform/can/lastRefresh`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 平台模块
   * @name PlatformCanRefresh
   * @summary 业务模块-是否能手动刷新-过时
   * @request GET:/api/platform/can/refresh
   * @deprecated
   * @response `200` `CommonRespBoolean` OK
   */
  platformCanRefresh = (
    query: {
      /** modelCode */
      modelCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespBoolean, any>({
      path: `/api/platform/can/refresh`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 第三方平台配置管理
   * @name PlatformChannelAccountDelete
   * @summary 第三方平台授权账号删除
   * @request POST:/api/platform/channel/account/delete
   * @response `200` `CommonResp` OK
   */
  platformChannelAccountDelete = (req: ChannelAccountDeleteReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/platform/channel/account/delete`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 第三方平台配置管理
   * @name PlatformChannelAccountQueryDetail
   * @summary 第三方平台授权账号详情查询
   * @request POST:/api/platform/channel/account/queryDetail
   * @response `200` `ChannelAccountDetailResp` OK
   */
  platformChannelAccountQueryDetail = (
    req: ChannelAccountDetailQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<ChannelAccountDetailResp, any>({
      path: `/api/platform/channel/account/queryDetail`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 第三方平台配置管理
   * @name PlatformChannelAccountQueryList
   * @summary 第三方平台授权账号列表查询
   * @request POST:/api/platform/channel/account/queryList
   * @response `200` `ChannelAccountListResp` OK
   */
  platformChannelAccountQueryList = (req: ChannelAccountListQueryReq, params: RequestParams = {}) =>
    this.request<ChannelAccountListResp, any>({
      path: `/api/platform/channel/account/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 第三方平台配置管理
   * @name PlatformChannelAccountSaveOrUpdate
   * @summary 第三方平台授权账号保存/编辑
   * @request POST:/api/platform/channel/account/saveOrUpdate
   * @response `200` `CommonResp` OK
   */
  platformChannelAccountSaveOrUpdate = (
    req: ChannelAccountSaveOrUpdateReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonResp, any>({
      path: `/api/platform/channel/account/saveOrUpdate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 第三方平台配置管理
   * @name PlatformChannelConfigDelete
   * @summary 第三方平台配置删除
   * @request POST:/api/platform/channel/config/delete
   * @response `200` `CommonResp` OK
   */
  platformChannelConfigDelete = (req: ChannelConfigDeleteReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/platform/channel/config/delete`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 第三方平台配置管理
   * @name PlatformChannelConfigPlatformList
   * @summary 平台下拉列表
   * @request GET:/api/platform/channel/config/platform/list
   * @response `200` `ChannelConfigPlatformListResp` OK
   */
  platformChannelConfigPlatformList = (params: RequestParams = {}) =>
    this.request<ChannelConfigPlatformListResp, any>({
      path: `/api/platform/channel/config/platform/list`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 第三方平台配置管理
   * @name PlatformChannelConfigQueryDetail
   * @summary 第三方平台配置详情查询
   * @request POST:/api/platform/channel/config/queryDetail
   * @response `200` `ChannelConfigDetailResp` OK
   */
  platformChannelConfigQueryDetail = (
    req: ChannelConfigDetailQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<ChannelConfigDetailResp, any>({
      path: `/api/platform/channel/config/queryDetail`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 第三方平台配置管理
   * @name PlatformChannelConfigQueryList
   * @summary 第三方平台配置列表查询
   * @request POST:/api/platform/channel/config/queryList
   * @response `200` `ChannelConfigListResp` OK
   */
  platformChannelConfigQueryList = (req: ChannelConfigListQueryReq, params: RequestParams = {}) =>
    this.request<ChannelConfigListResp, any>({
      path: `/api/platform/channel/config/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 第三方平台配置管理
   * @name PlatformChannelConfigSaveOrUpdate
   * @summary 第三方平台配置保存/编辑
   * @request POST:/api/platform/channel/config/saveOrUpdate
   * @response `200` `CommonResp` OK
   */
  platformChannelConfigSaveOrUpdate = (
    req: ChannelConfigSaveOrUpdateReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonResp, any>({
      path: `/api/platform/channel/config/saveOrUpdate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 平台模块
   * @name PlatformCountryQueryCountryInfoList
   * @summary 国家下拉列表查询
   * @request GET:/api/platform/country/queryCountryInfoList
   * @response `200` `CountryInfoListQueryResp` OK
   */
  platformCountryQueryCountryInfoList = (
    query?: {
      /** 关键字, 国家编码/国家名称 */
      keyword?: string;
      /**
       * 来源 0-默认 1-team sync 2-待扩展
       * @format int32
       */
      source?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<CountryInfoListQueryResp, any>({
      path: `/api/platform/country/queryCountryInfoList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 平台模块
   * @name PlatformCountryQueryCountryList
   * @summary 国家信息列表查询
   * @request GET:/api/platform/country/queryCountryList
   * @response `200` `CountryListQueryResp` OK
   */
  platformCountryQueryCountryList = (
    query: {
      /** 关键字, 国家编码/国家名称 */
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
    },
    params: RequestParams = {},
  ) =>
    this.request<CountryListQueryResp, any>({
      path: `/api/platform/country/queryCountryList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 携程商旅管理
   * @name PlatformCtripCTripFlowCheck
   * @summary 差旅审批单/外出公干校验
   * @request POST:/api/platform/ctrip/cTripFlowCheck
   * @response `200` `Record<string,object>` OK
   */
  platformCtripCTripFlowCheck = (req: CTripFlowCheckReq, params: RequestParams = {}) =>
    this.request<Record<string, object>, any>({
      path: `/api/platform/ctrip/cTripFlowCheck`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 携程商旅管理
   * @name PlatformCtripQueryCTripCityList
   * @summary 城市列表
   * @request POST:/api/platform/ctrip/queryCTripCityList
   * @response `200` `CTripCityResp` OK
   */
  platformCtripQueryCTripCityList = (req: CTripCityReq, params: RequestParams = {}) =>
    this.request<CTripCityResp, any>({
      path: `/api/platform/ctrip/queryCTripCityList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 携程商旅管理
   * @name PlatformCtripQueryCTripCountryList
   * @summary 国家列表
   * @request GET:/api/platform/ctrip/queryCTripCountryList
   * @response `200` `CTripCountryResp` OK
   */
  platformCtripQueryCTripCountryList = (params: RequestParams = {}) =>
    this.request<CTripCountryResp, any>({
      path: `/api/platform/ctrip/queryCTripCountryList`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 需求管理
   * @name PlatformDemandItBatchOperate
   * @summary IT批量操作
   * @request POST:/api/platform/demand/ItBatchOperate
   * @response `200` `DemandItBatchOperateResp` OK
   */
  platformDemandItBatchOperate = (req: DemandItBatchOperateReq, params: RequestParams = {}) =>
    this.request<DemandItBatchOperateResp, any>({
      path: `/api/platform/demand/ItBatchOperate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 需求管理
   * @name PlatformDemandItOperate
   * @summary IT操作
   * @request POST:/api/platform/demand/ItOperate
   * @response `200` `DemandOperateResp` OK
   */
  platformDemandItOperate = (req: DemandItOperateReq, params: RequestParams = {}) =>
    this.request<DemandOperateResp, any>({
      path: `/api/platform/demand/ItOperate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 需求管理
   * @name PlatformDemandAgencyList
   * @summary 品牌需求-查询机构信息
   * @request POST:/api/platform/demand/agencyList
   * @response `200` `DemandAgencyListQueryResp` OK
   */
  platformDemandAgencyList = (req: DemandAgencyListQueryReq, params: RequestParams = {}) =>
    this.request<DemandAgencyListQueryResp, any>({
      path: `/api/platform/demand/agencyList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 需求管理
   * @name PlatformDemandCacheDraftDemand
   * @summary 缓存需求草稿
   * @request POST:/api/platform/demand/cacheDraftDemand
   * @response `200` `void` OK
   */
  platformDemandCacheDraftDemand = (req: DemandSaveReq, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/platform/demand/cacheDraftDemand`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 需求管理
   * @name PlatformDemandCalculateTotalAmount
   * @summary 计算预估总价
   * @request POST:/api/platform/demand/calculateTotalAmount
   * @response `200` `DemandPurchaseAmountResp` OK
   */
  platformDemandCalculateTotalAmount = (req: DemandPurchaseAmountReq, params: RequestParams = {}) =>
    this.request<DemandPurchaseAmountResp, any>({
      path: `/api/platform/demand/calculateTotalAmount`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 需求管理
   * @name PlatformDemandCheckReceive
   * @summary 验收通过、拒绝
   * @request POST:/api/platform/demand/checkReceive
   * @response `200` `CommonRespObject` OK
   */
  platformDemandCheckReceive = (req: DemandBrandCheckReceiveReq, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/platform/demand/checkReceive`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 需求管理
   * @name PlatformDemandDemandFlowCheck
   * @summary 需求审批流配置校验
   * @request GET:/api/platform/demand/demandFlowCheck
   * @response `200` `void` OK
   */
  platformDemandDemandFlowCheck = (
    query?: {
      /** 需求模块 用研需求-user_research 品牌需求-brand_research IT需求-it */
      demandModule?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/platform/demand/demandFlowCheck`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 需求管理
   * @name PlatformDemandDetail
   * @summary 详情
   * @request GET:/api/platform/demand/detail
   * @response `200` `DemandDetailResp` OK
   */
  platformDemandDetail = (
    query?: {
      /** 需求记录编码 */
      demandCode?: string;
      /** 模块 */
      demandModule?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<DemandDetailResp, any>({
      path: `/api/platform/demand/detail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 需求管理
   * @name PlatformDemandDownloadBriefTemplate
   * @summary 下载brief模板接口
   * @request GET:/api/platform/demand/downloadBriefTemplate
   * @response `200` `CommonRespObject` OK
   */
  platformDemandDownloadBriefTemplate = (params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/platform/demand/downloadBriefTemplate`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 需求管理
   * @name PlatformDemandExecutionFinishOrSave
   * @summary 执行完成，保存
   * @request POST:/api/platform/demand/executionFinishOrSave
   * @response `200` `CommonRespObject` OK
   */
  platformDemandExecutionFinishOrSave = (
    req: DemandExecutionFinishReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/platform/demand/executionFinishOrSave`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 需求管理
   * @name PlatformDemandExpertList
   * @summary 品牌需求-查询专家信息
   * @request POST:/api/platform/demand/expertList
   * @response `200` `DemandExpertListQueryResp` OK
   */
  platformDemandExpertList = (req: DemandExpertListQueryReq, params: RequestParams = {}) =>
    this.request<DemandExpertListQueryResp, any>({
      path: `/api/platform/demand/expertList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 需求管理
   * @name PlatformDemandInterApprove
   * @summary 提交内审
   * @request POST:/api/platform/demand/interApprove
   * @response `200` `CommonRespVoid` OK
   */
  platformDemandInterApprove = (req: DemandExecuteSaveReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/platform/demand/interApprove`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 需求管理
   * @name PlatformDemandIsProductCenterDept
   * @summary 是否所属产品中心
   * @request GET:/api/platform/demand/isProductCenterDept
   * @response `200` `ProductCenterDeptResp` OK
   */
  platformDemandIsProductCenterDept = (params: RequestParams = {}) =>
    this.request<ProductCenterDeptResp, any>({
      path: `/api/platform/demand/isProductCenterDept`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 需求管理
   * @name PlatformDemandLeadValueBpConfirm
   * @summary BP 确认线索（分配产品经理，进入需求方案）
   * @request POST:/api/platform/demand/leadValue/bpConfirm
   * @response `200` `LeadBpActionResp` OK
   */
  platformDemandLeadValueBpConfirm = (req: LeadBpConfirmReq, params: RequestParams = {}) =>
    this.request<LeadBpActionResp, any>({
      path: `/api/platform/demand/leadValue/bpConfirm`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 需求管理
   * @name PlatformDemandLeadValueBpTransfer
   * @summary BP 转交线索
   * @request POST:/api/platform/demand/leadValue/bpTransfer
   * @response `200` `LeadBpActionResp` OK
   */
  platformDemandLeadValueBpTransfer = (req: LeadBpTransferReq, params: RequestParams = {}) =>
    this.request<LeadBpActionResp, any>({
      path: `/api/platform/demand/leadValue/bpTransfer`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 需求管理
   * @name PlatformDemandLeadValueDeptMappingDelete
   * @summary 需求线索组织映射删除
   * @request POST:/api/platform/demand/leadValue/deptMapping/delete
   * @response `200` `void` OK
   */
  platformDemandLeadValueDeptMappingDelete = (
    query: {
      /**
       * id
       * @format int64
       */
      id: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/platform/demand/leadValue/deptMapping/delete`,
      method: 'POST',
      query: query,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 需求管理
   * @name PlatformDemandLeadValueDeptMappingList
   * @summary 需求线索组织映射列表
   * @request GET:/api/platform/demand/leadValue/deptMapping/list
   * @response `200` `LeadDeptMappingListResp` OK
   */
  platformDemandLeadValueDeptMappingList = (
    query?: {
      /**
       * 一级组织 deptId
       * @format int64
       */
      deptId?: number;
      /**
       * 页码
       * @format int32
       */
      pageNum?: number;
      /**
       * 每页条数
       * @format int32
       */
      pageSize?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<LeadDeptMappingListResp, any>({
      path: `/api/platform/demand/leadValue/deptMapping/list`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 需求管理
   * @name PlatformDemandLeadValueDeptMappingSave
   * @summary 需求线索组织映射保存
   * @request POST:/api/platform/demand/leadValue/deptMapping/save
   * @response `200` `LeadDeptMappingSaveResp` OK
   */
  platformDemandLeadValueDeptMappingSave = (
    req: LeadDeptMappingSaveReq,
    params: RequestParams = {},
  ) =>
    this.request<LeadDeptMappingSaveResp, any>({
      path: `/api/platform/demand/leadValue/deptMapping/save`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 需求管理
   * @name PlatformDemandLeadValueLeadDetail
   * @summary 需求线索详情
   * @request GET:/api/platform/demand/leadValue/leadDetail
   * @response `200` `LeadDetailResp` OK
   */
  platformDemandLeadValueLeadDetail = (
    query: {
      /** 线索编码 */
      leadCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<LeadDetailResp, any>({
      path: `/api/platform/demand/leadValue/leadDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 需求管理
   * @name PlatformDemandLeadValueList
   * @summary LeadValue列表
   * @request GET:/api/platform/demand/leadValue/list
   * @response `200` `LeadValueListResp` OK
   */
  platformDemandLeadValueList = (
    query: {
      /** 业务线多选（二级部门 deptId 字符串） */
      bizLineList?: string[];
      /** 需求类型多选 */
      demandTypeList?: string[];
      /** 线索编码（精确）或名称（模糊）匹配 */
      keyword?: string;
      /** 当前节点多选 */
      nodeList?: string[];
      /** 仅查询当前用户提交的线索 */
      onlyMine?: boolean;
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
      /** 子状态多选 */
      subStatusList?: string[];
    },
    params: RequestParams = {},
  ) =>
    this.request<LeadValueListResp, any>({
      path: `/api/platform/demand/leadValue/list`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 需求管理
   * @name PlatformDemandLeadValueOperationLogs
   * @summary 需求线索操作日志
   * @request GET:/api/platform/demand/leadValue/operationLogs
   * @response `200` `LeadOperationLogResp` OK
   */
  platformDemandLeadValueOperationLogs = (
    query: {
      /** leadCode */
      leadCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<LeadOperationLogResp, any>({
      path: `/api/platform/demand/leadValue/operationLogs`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 需求管理
   * @name PlatformDemandLeadValueReview
   * @summary 提交价值评审
   * @request POST:/api/platform/demand/leadValue/review
   * @response `200` `LeadReviewResp` OK
   */
  platformDemandLeadValueReview = (req: LeadReviewReq, params: RequestParams = {}) =>
    this.request<LeadReviewResp, any>({
      path: `/api/platform/demand/leadValue/review`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 需求管理
   * @name PlatformDemandLeadValueStartAssessment
   * @summary 发起LeadValue评估
   * @request POST:/api/platform/demand/leadValue/startAssessment
   * @response `200` `LeadValueStartAssessmentResp` OK
   */
  platformDemandLeadValueStartAssessment = (
    req: LeadValueStartAssessmentReq,
    params: RequestParams = {},
  ) =>
    this.request<LeadValueStartAssessmentResp, any>({
      path: `/api/platform/demand/leadValue/startAssessment`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 需求管理
   * @name PlatformDemandLeadValueSubmitLead
   * @summary 提交需求线索
   * @request POST:/api/platform/demand/leadValue/submitLead
   * @response `200` `LeadSubmitResp` OK
   */
  platformDemandLeadValueSubmitLead = (req: LeadSubmitReq, params: RequestParams = {}) =>
    this.request<LeadSubmitResp, any>({
      path: `/api/platform/demand/leadValue/submitLead`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 需求管理
   * @name PlatformDemandList
   * @summary 需求列表
   * @request GET:/api/platform/demand/list
   * @response `200` `DemandListQueryResp` OK
   */
  platformDemandList = (
    query: {
      /** 待审批状态菜单，查询指定阶段的待审批记录，审批节点阶段例如： 1，2，3 */
      approveStageList?: number[];
      /**
       * 实际完成时间
       * @format date
       */
      'brandReq.actualFinishTime'?: string;
      /** 品牌 */
      'brandReq.brandCode'?: string;
      /** 合作类型 */
      'brandReq.cooperationType'?: string;
      /** 合作类型集合 */
      'brandReq.cooperationTypeList'?: string[];
      /** 投放国家 */
      'brandReq.countryCode'?: string;
      /**
       * 需求创建时间
       * @format date
       */
      'brandReq.createTime'?: string;
      /** 需求提出人 */
      'brandReq.creator'?: string;
      /** 需求类型 */
      'brandReq.demandType'?: string;
      /** 需求类型集合 */
      'brandReq.demandTypeList'?: string[];
      /**
       * 期望完成时间
       * @format date
       */
      'brandReq.expectFinishTime'?: string;
      /** 需求执行人 */
      'brandReq.handler'?: string;
      /** 需求标题/需求背景/需求内容 */
      'brandReq.keyWord'?: string;
      /**
       * 预计完成时间-结束
       * @format date
       */
      'brandReq.planFinishDate'?: string;
      /**
       * 预计开始时间-开始
       * @format date
       */
      'brandReq.planStartDate'?: string;
      /** 推广产品 */
      'brandReq.productName'?: string;
      /** 产品分类 */
      categoryCode?: string;
      /** 创建人 */
      creator?: string;
      /**
       * 是否延期 1-是 0-否
       * @format int32
       */
      delayFlag?: number;
      /** 执行人集合 */
      demandHandlerList?: string[];
      /** 业务对接人 */
      'demandItListQueryReq.businessFollower'?: string;
      /** 业务优先级 高-high 中-medium 低-low */
      'demandItListQueryReq.businessPriority'?: string;
      /** 线索优先级 */
      'demandItListQueryReq.cluePriority'?: string;
      /**
       * 筛选日期 提出时间 yyyy-MM-dd
       * @format date
       */
      'demandItListQueryReq.createTimeEnd'?: string;
      /**
       * 筛选日期 提出时间 yyyy-MM-dd
       * @format date
       */
      'demandItListQueryReq.createTimeStart'?: string;
      /** 提出人 */
      'demandItListQueryReq.creator'?: string;
      /**
       * 提出人组织
       * @format int64
       */
      'demandItListQueryReq.creatorDeptId'?: number;
      /** 编码 */
      'demandItListQueryReq.demandCode'?: string;
      /** 需求模块 用研需求-it */
      'demandItListQueryReq.demandModule'?: string;
      /** 线索标题 */
      'demandItListQueryReq.demandTitle'?: string;
      /**
       * 需求分类 1-业务支撑性的需求、2-业务承诺和财务指标挂钩的需求、3-业务工作流优化提升岗位要求的需求、4-其他
       * @format int32
       */
      'demandItListQueryReq.demandType'?: number;
      /**
       * 筛选日期 期望上线 yyyy-MM-dd
       * @format date
       */
      'demandItListQueryReq.expectFinishTimeEnd'?: string;
      /**
       * 筛选日期 期望上线 yyyy-MM-dd
       * @format date
       */
      'demandItListQueryReq.expectFinishTimeStart'?: string;
      /**
       * 筛选日期 完成时间 yyyy-MM-dd
       * @format date
       */
      'demandItListQueryReq.finishTimeEnd'?: string;
      /**
       * 筛选日期 完成时间 yyyy-MM-dd
       * @format date
       */
      'demandItListQueryReq.finishTimeStart'?: string;
      /** 跟进人 */
      'demandItListQueryReq.follower'?: string;
      /** 菜单标识 业务需求列表-it_business_list 业务信息数字化列表-it_digital_list */
      'demandItListQueryReq.menuTag'?: string;
      /** 所属系统 */
      'demandItListQueryReq.platform'?: string;
      /** 所属项目 */
      'demandItListQueryReq.project'?: string;
      /**
       * 查询数据过滤方式 1-我提出的 2-待我审批 3-带我对接 4-待我跟进
       * @format int32
       */
      'demandItListQueryReq.selectType'?: number;
      /** 状态 100-总计 0-草稿 40-审批中 41-已驳回  42-已挂起 43-待跟进 44-跟进中 45-研发中 46-已完成 47-已废弃 */
      'demandItListQueryReq.status'?: string;
      /** 状态 100-总计 0-草稿 40-审批中 41-已驳回  42-已挂起 43-待跟进 44-跟进中 45-研发中 46-已完成 47-已废弃 */
      'demandItListQueryReq.statusList'?: string[];
      /** TB编码 */
      'demandItListQueryReq.tbCode'?: string;
      /** TB需求名称 */
      'demandItListQueryReq.tbName'?: string;
      /**
       * 是否紧急 1-紧急
       * @format int32
       */
      'demandItListQueryReq.urgentFlag'?: number;
      /** 需求模块 用研需求-user_research  it需求-it */
      demandModule?: string;
      /**
       * 需求属性
       * @format int32
       */
      demandProperty?: number;
      /**
       * 需求类型
       * @format int32
       */
      demandType?: number;
      /** 需求执行人 */
      handler?: string;
      /**
       * 是否落地 1-是 0-否
       * @format int32
       */
      implementFlag?: number;
      /** 关键字 需求标题/需求内容 */
      keyword?: string;
      /**
       * 产品分类等级
       * @format int32
       */
      level?: number;
      /**
       * 是否低分 1-是 0-否
       * @format int32
       */
      lowScoreFlag?: number;
      /** 菜单标识 */
      menuTag?: string;
      /** 排序字段 */
      orderField?: string;
      /** 排序类型 */
      orderType?: string;
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
      /** 产品品线 */
      productLine?: string;
      /** 提出人 */
      'purchaseReq.creator'?: string;
      /** 需求模块 purchase-采购模块 */
      'purchaseReq.demandModule'?: string;
      /** 所在部门id */
      'purchaseReq.deptIdList'?: number[];
      /** 关键词 需求标题/需求内容/需求编码 */
      'purchaseReq.keyword'?: string;
      /** 菜单标识 采购提需求列表-submit_list 采购执行列表-execute_list */
      'purchaseReq.menuTag'?: string;
      /** 采购产品 */
      'purchaseReq.productSkuList'?: string[];
      /** 采购产品类型 */
      'purchaseReq.productTypeList'?: string[];
      /** 采购关键词 采购订单编码/采购订单行号 */
      'purchaseReq.purchaseKeyword'?: string;
      /** 采购订单行状态集合 */
      'purchaseReq.purchaseLineStatusList'?: number[];
      /** 采购员工编码 */
      'purchaseReq.purchaserCodeList'?: string[];
      /**
       * 状态
       * @format int32
       */
      'purchaseReq.status'?: number;
      /** 状态集合 */
      'purchaseReq.statusList'?: number[];
      /**
       * 列表展示视图模式 需求视图-0 产品视图-1 默认需求视图-0
       * @format int32
       */
      'purchaseReq.viewType'?: number;
      /** 产品sku编码 */
      skuCode?: string;
      /**
       * 状态 0-草稿 31-审批中 32-审批未通过 33-执行中 34-内审中 35-内审未通过 36-待查收 37-待反馈 38-已完结 大状态 ： 101-执行端 已完结（6，7，8）
       * @format int32
       */
      status?: number;
      /**
       * 判断是需求提交管理端还是执行管理端 0-提交管理端 1-执行管理端
       * @format int32
       */
      submitManageFlag?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<DemandListQueryResp, any>({
      path: `/api/platform/demand/list`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 需求管理
   * @name PlatformDemandMediaList
   * @summary 品牌需求-查询媒体信息
   * @request GET:/api/platform/demand/mediaList
   * @response `200` `DemandMediaListQueryResp` OK
   */
  platformDemandMediaList = (
    query: {
      /** 国家 */
      country?: string;
      /** 媒体 */
      mediaCategoryList?: string[];
      /** 媒体资源列表 */
      mediaNameList?: string[];
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
    this.request<DemandMediaListQueryResp, any>({
      path: `/api/platform/demand/mediaList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 需求管理
   * @name PlatformDemandOperate
   * @summary 操作
   * @request POST:/api/platform/demand/operate
   * @response `200` `DemandOperateResp` OK
   */
  platformDemandOperate = (req: DemandOperateReq, params: RequestParams = {}) =>
    this.request<DemandOperateResp, any>({
      path: `/api/platform/demand/operate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 需求管理
   * @name PlatformDemandPurchaseCategoryTree
   * @summary 综合采购分类树
   * @request GET:/api/platform/demand/purchaseCategoryTree
   * @response `200` `CategoryTreeResp` OK
   */
  platformDemandPurchaseCategoryTree = (params: RequestParams = {}) =>
    this.request<CategoryTreeResp, any>({
      path: `/api/platform/demand/purchaseCategoryTree`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 需求管理
   * @name PlatformDemandPurchaseMaterialList
   * @summary 综合采购物料列表
   * @request GET:/api/platform/demand/purchaseMaterialList
   * @response `200` `DemandPurchaseMaterialListQueryResp` OK
   */
  platformDemandPurchaseMaterialList = (
    query?: {
      /** 综合采购分类编码 */
      categoryCode?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<DemandPurchaseMaterialListQueryResp, any>({
      path: `/api/platform/demand/purchaseMaterialList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 需求管理
   * @name PlatformDemandPurchaseNotice
   * @summary 采购需求-采购通知
   * @request POST:/api/platform/demand/purchaseNotice
   * @response `200` `DemandPurchaseNoticeResp` OK
   */
  platformDemandPurchaseNotice = (req: DemandPurchaseNoticeReq, params: RequestParams = {}) =>
    this.request<DemandPurchaseNoticeResp, any>({
      path: `/api/platform/demand/purchaseNotice`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 需求管理
   * @name PlatformDemandPurchaseOperate
   * @summary 采购需求操作
   * @request POST:/api/platform/demand/purchaseOperate
   * @response `200` `DemandPurchaseOperateResp` OK
   */
  platformDemandPurchaseOperate = (req: DemandPurchaseOperateReq, params: RequestParams = {}) =>
    this.request<DemandPurchaseOperateResp, any>({
      path: `/api/platform/demand/purchaseOperate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 需求管理
   * @name PlatformDemandPurchaseProcessStep
   * @summary 采购需求进度条
   * @request GET:/api/platform/demand/purchaseProcessStep
   * @response `200` `DemandPurchaseProcessStepResp` OK
   */
  platformDemandPurchaseProcessStep = (
    query?: {
      /** 需求编码 */
      demandCode?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<DemandPurchaseProcessStepResp, any>({
      path: `/api/platform/demand/purchaseProcessStep`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 需求管理
   * @name PlatformDemandPurchaseStatusUpdate
   * @summary 采购需求-srm回调更新需求状态
   * @request POST:/api/platform/demand/purchaseStatusUpdate
   * @response `200` `DemandPurchaseUpdateResp` OK
   */
  platformDemandPurchaseStatusUpdate = (req: DemandPurchaseUpdateReq, params: RequestParams = {}) =>
    this.request<DemandPurchaseUpdateResp, any>({
      path: `/api/platform/demand/purchaseStatusUpdate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 需求管理
   * @name PlatformDemandPurchaseSync
   * @summary 采购需求-采购商品信息同步(重新推送/变更操作)
   * @request POST:/api/platform/demand/purchaseSync
   * @response `200` `DemandPurchaseSyncResp` OK
   */
  platformDemandPurchaseSync = (req: DemandPurchaseSyncReq, params: RequestParams = {}) =>
    this.request<DemandPurchaseSyncResp, any>({
      path: `/api/platform/demand/purchaseSync`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 需求管理
   * @name PlatformDemandQueryCacheDraftDemand
   * @summary 查询缓存需求草稿
   * @request GET:/api/platform/demand/queryCacheDraftDemand
   * @response `200` `DemandCacheDraftResp` OK
   */
  platformDemandQueryCacheDraftDemand = (
    query?: {
      /** 需求模块类型 */
      demandModule?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<DemandCacheDraftResp, any>({
      path: `/api/platform/demand/queryCacheDraftDemand`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 需求管理
   * @name PlatformDemandQueryCategoryTree
   * @summary 获取分类树
   * @request GET:/api/platform/demand/queryCategoryTree
   * @response `200` `CategoryTreeResp` OK
   */
  platformDemandQueryCategoryTree = (params: RequestParams = {}) =>
    this.request<CategoryTreeResp, any>({
      path: `/api/platform/demand/queryCategoryTree`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 需求管理
   * @name PlatformDemandQueryDemandProcessStep
   * @summary 需求进度条
   * @request GET:/api/platform/demand/queryDemandProcessStep
   * @response `200` `DemandProcessStepResp` OK
   */
  platformDemandQueryDemandProcessStep = (
    query?: {
      /** 需求管理 */
      demandCode?: string;
      /** 模块名称 */
      demandModule?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<DemandProcessStepResp, any>({
      path: `/api/platform/demand/queryDemandProcessStep`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 需求管理
   * @name PlatformDemandQueryExpertTypeList
   * @summary 品牌需求-查询专家类型
   * @request POST:/api/platform/demand/queryExpertTypeList
   * @response `200` `DemandExpertTypeListQueryResp` OK
   */
  platformDemandQueryExpertTypeList = (
    req: DemandExpertTypeListQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<DemandExpertTypeListQueryResp, any>({
      path: `/api/platform/demand/queryExpertTypeList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 需求管理
   * @name PlatformDemandQueryMember
   * @summary 根据员工筛选类型筛选员工列表
   * @request GET:/api/platform/demand/queryMember
   * @response `200` `DemandMemberResp` OK
   */
  platformDemandQueryMember = (
    query?: {
      /**
       * 类型 需求创建创建人-1 采购执行人-2
       * @format int32
       */
      type?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<DemandMemberResp, any>({
      path: `/api/platform/demand/queryMember`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 需求管理
   * @name PlatformDemandQueryProductCnName
   * @summary 查询商品中文名和品牌
   * @request GET:/api/platform/demand/queryProductCnName
   * @response `200` `DemandBrandSelectProductResp` OK
   */
  platformDemandQueryProductCnName = (params: RequestParams = {}) =>
    this.request<DemandBrandSelectProductResp, any>({
      path: `/api/platform/demand/queryProductCnName`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 需求管理
   * @name PlatformDemandQueryPurchaserList
   * @summary 采购需求采购执行人列表
   * @request GET:/api/platform/demand/queryPurchaserList
   * @response `200` `DemandMemberResp` OK
   */
  platformDemandQueryPurchaserList = (params: RequestParams = {}) =>
    this.request<DemandMemberResp, any>({
      path: `/api/platform/demand/queryPurchaserList`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 需求管理
   * @name PlatformDemandSave
   * @summary 需求保存
   * @request POST:/api/platform/demand/save
   * @response `200` `DemandSaveResp` OK
   */
  platformDemandSave = (req: DemandSaveReq, params: RequestParams = {}) =>
    this.request<DemandSaveResp, any>({
      path: `/api/platform/demand/save`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 需求管理
   * @name PlatformDemandSaveDemandPdtCategory
   * @summary 保存需求产品分类
   * @request POST:/api/platform/demand/saveDemandPdtCategory
   * @response `200` `DemandPdtCategoryResp` OK
   */
  platformDemandSaveDemandPdtCategory = (req: DemandPdtCategoryReq, params: RequestParams = {}) =>
    this.request<DemandPdtCategoryResp, any>({
      path: `/api/platform/demand/saveDemandPdtCategory`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 需求管理
   * @name PlatformDemandSelectCooperList
   * @summary 合作类型下拉
   * @request GET:/api/platform/demand/selectCooperList
   * @response `200` `CommonRespDemandBrandCooperTypeResp` OK
   */
  platformDemandSelectCooperList = (
    query?: {
      /** 资源类型 */
      resourceType?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespDemandBrandCooperTypeResp, any>({
      path: `/api/platform/demand/selectCooperList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 需求管理
   * @name PlatformDemandSrmPoCallback
   * @summary 采购需求-srm回调更新订单信息
   * @request POST:/api/platform/demand/srmPoCallback
   * @response `200` `DemandSrmPoCallbackResp` OK
   */
  platformDemandSrmPoCallback = (req: DemandSrmPoCallbackReq, params: RequestParams = {}) =>
    this.request<DemandSrmPoCallbackResp, any>({
      path: `/api/platform/demand/srmPoCallback`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 需求管理-数据统计
   * @name PlatformDemandStaticsQueryDeptStatusList
   * @summary 各部门状态需求数量统计
   * @request GET:/api/platform/demand/statics/queryDeptStatusList
   * @response `200` `DemandStatusDeptStaticsQueryResp` OK
   */
  platformDemandStaticsQueryDeptStatusList = (
    query?: {
      /**
       * 开始时间
       * @format date
       */
      endDate?: string;
      /**
       * 开始时间
       * @format date
       */
      startDate?: string;
      /**
       * 时间维度 1-年 2-季度 3-月 4-日 null-所有
       * @format int32
       */
      timeType?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<DemandStatusDeptStaticsQueryResp, any>({
      path: `/api/platform/demand/statics/queryDeptStatusList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 需求管理-数据统计
   * @name PlatformDemandStaticsQueryFinishStaticsList
   * @summary 已完结情况统计
   * @request GET:/api/platform/demand/statics/queryFinishStaticsList
   * @response `200` `DemandFinishStaticsQueryResp` OK
   */
  platformDemandStaticsQueryFinishStaticsList = (
    query?: {
      /**
       * 结束时间
       * @format date
       */
      endTime?: string;
      /**
       * 开始时间
       * @format date
       */
      startTime?: string;
      /**
       * 时间维度 1-年 2-季度 3-月
       * @format int32
       */
      timeType?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<DemandFinishStaticsQueryResp, any>({
      path: `/api/platform/demand/statics/queryFinishStaticsList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 需求管理-数据统计
   * @name PlatformDemandStaticsQueryMemberFinishStaticsList
   * @summary 成员已完成情况统计
   * @request GET:/api/platform/demand/statics/queryMemberFinishStaticsList
   * @response `200` `DemandFinishMemberStaticsQueryResp` OK
   */
  platformDemandStaticsQueryMemberFinishStaticsList = (
    query?: {
      /**
       * 时间维度 结束时间
       * @format date
       */
      endDate?: string;
      /**
       * 时间维度 开始时间
       * @format date
       */
      startDate?: string;
      /**
       * 时间维度 1-年 2-季度 3-月 4-天 其他所有
       * @format int32
       */
      timeType?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<DemandFinishMemberStaticsQueryResp, any>({
      path: `/api/platform/demand/statics/queryMemberFinishStaticsList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 需求管理-数据统计
   * @name PlatformDemandStaticsQueryOntimeAvgStaticsList
   * @summary 需求平均分统计
   * @request GET:/api/platform/demand/statics/queryOntimeAvgStaticsList
   * @response `200` `DemandNeedAvgStaticsQueryResp` OK
   */
  platformDemandStaticsQueryOntimeAvgStaticsList = (
    query?: {
      /**
       * 结束时间
       * @format date
       */
      endTime?: string;
      /**
       * 开始时间
       * @format date
       */
      startTime?: string;
      /**
       * 时间维度 1-年 2-季度 3-月
       * @format int32
       */
      timeType?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<DemandNeedAvgStaticsQueryResp, any>({
      path: `/api/platform/demand/statics/queryOntimeAvgStaticsList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 需求管理-数据统计
   * @name PlatformDemandStaticsQueryPersonLandStaticsList
   * @summary 个人统计-需求落地情况
   * @request GET:/api/platform/demand/statics/queryPersonLandStaticsList
   * @response `200` `DemandPersonLandStaticsQueryResp` OK
   */
  platformDemandStaticsQueryPersonLandStaticsList = (
    query?: {
      /**
       * 开始时间
       * @format date
       */
      endDate?: string;
      /**
       * 开始时间
       * @format date
       */
      startDate?: string;
      /**
       * 时间维度 1-年 2-季度 3-月 4-日 null-所有
       * @format int32
       */
      timeType?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<DemandPersonLandStaticsQueryResp, any>({
      path: `/api/platform/demand/statics/queryPersonLandStaticsList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 需求管理-数据统计
   * @name PlatformDemandStaticsQueryPersonMemberStaticsList
   * @summary 个人统计-我的需求与部门需求统计
   * @request GET:/api/platform/demand/statics/queryPersonMemberStaticsList
   * @response `200` `DemandPersonMemberStaticsQueryResp` OK
   */
  platformDemandStaticsQueryPersonMemberStaticsList = (
    query?: {
      /**
       * 开始时间
       * @format date
       */
      endDate?: string;
      /**
       * 开始时间
       * @format date
       */
      startDate?: string;
      /**
       * 时间维度 1-年 2-季度 3-月 4-日 null-所有
       * @format int32
       */
      timeType?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<DemandPersonMemberStaticsQueryResp, any>({
      path: `/api/platform/demand/statics/queryPersonMemberStaticsList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 需求管理-数据统计
   * @name PlatformDemandStaticsQueryPersonMemberStatusStaticsList
   * @summary 个人统计-我的需求
   * @request GET:/api/platform/demand/statics/queryPersonMemberStatusStaticsList
   * @response `200` `DemandStatusPersonStaticsQueryResp` OK
   */
  platformDemandStaticsQueryPersonMemberStatusStaticsList = (
    query?: {
      /**
       * 开始时间
       * @format date
       */
      endDate?: string;
      /**
       * 开始时间
       * @format date
       */
      startDate?: string;
      /**
       * 时间维度 1-年 2-季度 3-月 4-日 null-所有
       * @format int32
       */
      timeType?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<DemandStatusPersonStaticsQueryResp, any>({
      path: `/api/platform/demand/statics/queryPersonMemberStatusStaticsList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 需求管理-数据统计
   * @name PlatformDemandStaticsQueryPersonOnTimeStaticsList
   * @summary 个人统计-及时率
   * @request GET:/api/platform/demand/statics/queryPersonOnTimeStaticsList
   * @response `200` `DemandPersonOnTimeStaticsQueryResp` OK
   */
  platformDemandStaticsQueryPersonOnTimeStaticsList = (
    query?: {
      /**
       * 开始时间
       * @format date
       */
      endDate?: string;
      /**
       * 开始时间
       * @format date
       */
      startDate?: string;
      /**
       * 时间维度 1-年 2-季度 3-月 4-日 null-所有
       * @format int32
       */
      timeType?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<DemandPersonOnTimeStaticsQueryResp, any>({
      path: `/api/platform/demand/statics/queryPersonOnTimeStaticsList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 需求管理-数据统计
   * @name PlatformDemandStaticsQueryPersonScoreStaticsList
   * @summary 个人统计-需求评分情况
   * @request GET:/api/platform/demand/statics/queryPersonScoreStaticsList
   * @response `200` `DemandPersonScoreStaticsQueryResp` OK
   */
  platformDemandStaticsQueryPersonScoreStaticsList = (
    query?: {
      /**
       * 开始时间
       * @format date
       */
      endDate?: string;
      /**
       * 开始时间
       * @format date
       */
      startDate?: string;
      /**
       * 时间维度 1-年 2-季度 3-月 4-日 null-所有
       * @format int32
       */
      timeType?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<DemandPersonScoreStaticsQueryResp, any>({
      path: `/api/platform/demand/statics/queryPersonScoreStaticsList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 需求管理-数据统计
   * @name PlatformDemandStaticsQueryProductStatusList
   * @summary 各品线状态需求数量统计
   * @request GET:/api/platform/demand/statics/queryProductStatusList
   * @response `200` `DemandProductLineStatusStaticsQueryResp` OK
   */
  platformDemandStaticsQueryProductStatusList = (
    query?: {
      /**
       * 开始时间
       * @format date
       */
      endDate?: string;
      /**
       * 开始时间
       * @format date
       */
      startDate?: string;
      /**
       * 时间维度 1-年 2-季度 3-月 4-日 null-所有
       * @format int32
       */
      timeType?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<DemandProductLineStatusStaticsQueryResp, any>({
      path: `/api/platform/demand/statics/queryProductStatusList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 需求管理-数据统计
   * @name PlatformDemandStaticsQueryStatusList
   * @summary 各状态需求数量统计
   * @request GET:/api/platform/demand/statics/queryStatusList
   * @response `200` `DemandStatusStaticsQueryResp` OK
   */
  platformDemandStaticsQueryStatusList = (
    query?: {
      /**
       * 开始时间
       * @format date
       */
      endDate?: string;
      /**
       * 开始时间
       * @format date
       */
      startDate?: string;
      /**
       * 时间维度 1-年 2-季度 3-月 4-日 null-所有
       * @format int32
       */
      timeType?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<DemandStatusStaticsQueryResp, any>({
      path: `/api/platform/demand/statics/queryStatusList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 需求管理
   * @name PlatformDemandStatusCount
   * @summary 需求状态统计
   * @request GET:/api/platform/demand/statusCount
   * @response `200` `DemandStatusCountResp` OK
   */
  platformDemandStatusCount = (
    query: {
      /** 需求模块 用研需求-user_research IT需求-it */
      demandModule: string;
      /** 菜单标识  */
      menuTag?: string;
      /**
       * 判断是需求提交管理端还是执行管理端 0-提交管理端 1-执行管理端
       * @format int32
       */
      submitManageFlag?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<DemandStatusCountResp, any>({
      path: `/api/platform/demand/statusCount`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 需求管理
   * @name PlatformDemandV2List
   * @summary 需求列表-POST请求
   * @request POST:/api/platform/demand/v2/list
   * @response `200` `DemandListQueryResp` OK
   */
  platformDemandV2List = (req: DemandListQueryReq, params: RequestParams = {}) =>
    this.request<DemandListQueryResp, any>({
      path: `/api/platform/demand/v2/list`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 桌面管理模块
   * @name PlatformDesktopAllNotifyLabel
   * @summary 所有通知分类信息
   * @request GET:/api/platform/desktop/allNotifyLabel
   * @response `200` `NotifyAllLabelResp` OK
   */
  platformDesktopAllNotifyLabel = (params: RequestParams = {}) =>
    this.request<NotifyAllLabelResp, any>({
      path: `/api/platform/desktop/allNotifyLabel`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 桌面管理模块
   * @name PlatformDesktopIfNewNotify
   * @summary 获取是否有新通知
   * @request GET:/api/platform/desktop/ifNewNotify
   * @response `200` `IfNewNotifyResp` OK
   */
  platformDesktopIfNewNotify = (
    query?: {
      /**
       * 上次查看通知时间
       * @example "2025-05-01 00:00:00"
       */
      lastViewTime?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<IfNewNotifyResp, any>({
      path: `/api/platform/desktop/ifNewNotify`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 桌面管理模块
   * @name PlatformDesktopNotifyReport
   * @summary 通知操作上报
   * @request POST:/api/platform/desktop/notifyReport
   * @response `200` `CommonRespObject` OK
   */
  platformDesktopNotifyReport = (req: NotifyReportReq, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/platform/desktop/notifyReport`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 桌面管理模块
   * @name PlatformDesktopOperateDesktopNotify
   * @summary 操作桌面通知消息
   * @request POST:/api/platform/desktop/operateDesktopNotify
   * @response `200` `CommonRespObject` OK
   */
  platformDesktopOperateDesktopNotify = (req: DesktopReportReq, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/platform/desktop/operateDesktopNotify`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 桌面管理模块
   * @name PlatformDesktopQueryNotifyInfoList
   * @summary 查询桌面助手通知消息
   * @request GET:/api/platform/desktop/queryNotifyInfoList
   * @response `200` `DesktopNotifyListResp` OK
   */
  platformDesktopQueryNotifyInfoList = (
    query: {
      /** ip地址 */
      ipAddr?: string;
      /**
       * 状态 1-启动 0-关闭 默认启动
       * @format int32
       */
      status: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<DesktopNotifyListResp, any>({
      path: `/api/platform/desktop/queryNotifyInfoList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 桌面管理模块
   * @name PlatformDesktopSseClose
   * @summary sse断开连接
   * @request GET:/api/platform/desktop/sse/close/{memberCode}
   * @response `200` `CommonRespVoid` OK
   */
  platformDesktopSseClose = (memberCode: string, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/platform/desktop/sse/close/${memberCode}`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 桌面管理模块
   * @name PlatformDesktopSseSubscribe
   * @summary sse建立连接
   * @request GET:/api/platform/desktop/sse/subscribe/{memberCode}
   * @response `200` `SseEmitter` OK
   */
  platformDesktopSseSubscribe = (memberCode: string, params: RequestParams = {}) =>
    this.request<SseEmitter, any>({
      path: `/api/platform/desktop/sse/subscribe/${memberCode}`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 桌面管理模块
   * @name PlatformDesktopUserNotifyDetail
   * @summary 用户通知详情
   * @request GET:/api/platform/desktop/userNotifyDetail
   * @response `200` `UserNotifyDetailBean` OK
   */
  platformDesktopUserNotifyDetail = (
    query: {
      /** 通知编码 */
      notifyCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<UserNotifyDetailBean, any>({
      path: `/api/platform/desktop/userNotifyDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 桌面管理模块
   * @name PlatformDesktopUserNotifyList
   * @summary 用户通知列表
   * @request GET:/api/platform/desktop/userNotifyList
   * @response `200` `UserNotifyListResp` OK
   */
  platformDesktopUserNotifyList = (
    query: {
      /** 分类标签编码 */
      labelCode?: string;
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
    this.request<UserNotifyListResp, any>({
      path: `/api/platform/desktop/userNotifyList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 字典管理, 平台模块
   * @name PlatformDict
   * @summary 字典查询-common
   * @request POST:/api/platform/dict
   * @response `200` `DictQueryResp` OK
   */
  platformDict = (req: DictQueryReq, params: RequestParams = {}) =>
    this.request<DictQueryResp, any>({
      path: `/api/platform/dict`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 字典管理
   * @name PlatformDictDelete
   * @summary 删除字典
   * @request POST:/api/platform/dict/delete
   * @response `200` `CommonRespObject` OK
   */
  platformDictDelete = (req: DictDeleteReq, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/platform/dict/delete`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 字典管理
   * @name PlatformDictQueryDictByModule
   * @summary 某个模块-字典列表
   * @request GET:/api/platform/dict/queryDictByModule
   * @response `200` `CommonRespObject` OK
   */
  platformDictQueryDictByModule = (req: DictQueryListSaveReq, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/platform/dict/queryDictByModule`,
      method: 'GET',
      body: req,
      ...params,
    });
  /**
   * No description
   *
   * @tags 字典管理
   * @name PlatformDictQueryDictDetail
   * @summary 字典详情查询
   * @request POST:/api/platform/dict/queryDictDetail
   * @response `200` `DictQuerySingleResp` OK
   */
  platformDictQueryDictDetail = (req: DictQueryDetailQueryReq, params: RequestParams = {}) =>
    this.request<DictQuerySingleResp, any>({
      path: `/api/platform/dict/queryDictDetail`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 字典管理
   * @name PlatformDictQueryDictModuleList
   * @summary 字典模块列表
   * @request GET:/api/platform/dict/queryDictModuleList
   * @response `200` `DictModuleListResp` OK
   */
  platformDictQueryDictModuleList = (params: RequestParams = {}) =>
    this.request<DictModuleListResp, any>({
      path: `/api/platform/dict/queryDictModuleList`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 字典管理
   * @name PlatformDictQueryPage
   * @summary 字典分页查询
   * @request POST:/api/platform/dict/queryPage
   * @response `200` `DictQueryPageResp` OK
   */
  platformDictQueryPage = (req: DictModuleQueryReq, params: RequestParams = {}) =>
    this.request<DictQueryPageResp, any>({
      path: `/api/platform/dict/queryPage`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 字典管理
   * @name PlatformDictSave
   * @summary 字典保存/编辑
   * @request POST:/api/platform/dict/save
   * @response `200` `CommonRespObject` OK
   */
  platformDictSave = (req: DictSaveOrUpdateReq, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/platform/dict/save`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 字典管理, 平台模块
   * @name PlatformDictSaveBatch
   * @summary 字典保存-common
   * @request POST:/api/platform/dict/saveBatch
   * @response `200` `DictQueryResp` OK
   */
  platformDictSaveBatch = (req: DictQueryListSaveReq, params: RequestParams = {}) =>
    this.request<DictQueryResp, any>({
      path: `/api/platform/dict/saveBatch`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 字典管理, 平台模块
   * @name PlatformDictDisableAuth
   * @summary 字典查询-common
   * @request POST:/api/platform/dictDisableAuth
   * @response `200` `DictQueryResp` OK
   */
  platformDictDisableAuth = (req: DictQueryReq, params: RequestParams = {}) =>
    this.request<DictQueryResp, any>({
      path: `/api/platform/dictDisableAuth`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags OA能效模块
   * @name PlatformEntertainExportEntertain
   * @summary 导出对外招待申请
   * @request POST:/api/platform/entertain/exportEntertain
   * @response `200` `CommonExportResp` OK
   */
  platformEntertainExportEntertain = (req: EntertainQueryReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/platform/entertain/exportEntertain`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags OA能效模块
   * @name PlatformEntertainQueryConflictList
   * @summary 会议冲突员工列表
   * @request POST:/api/platform/entertain/queryConflictList
   * @response `200` `EntertainConflictResp` OK
   */
  platformEntertainQueryConflictList = (req: EntertainConflictReq, params: RequestParams = {}) =>
    this.request<EntertainConflictResp, any>({
      path: `/api/platform/entertain/queryConflictList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags OA能效模块
   * @name PlatformEntertainQueryEntertainList
   * @summary 对外招待申请列表
   * @request POST:/api/platform/entertain/queryEntertainList
   * @response `200` `EntertainQueryResp` OK
   */
  platformEntertainQueryEntertainList = (req: EntertainQueryReq, params: RequestParams = {}) =>
    this.request<EntertainQueryResp, any>({
      path: `/api/platform/entertain/queryEntertainList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags OA能效模块
   * @name PlatformEntertainSaveEntertain
   * @summary 保存对外招待申请
   * @request POST:/api/platform/entertain/saveEntertain
   * @response `200` `EntertainSaveResp` OK
   */
  platformEntertainSaveEntertain = (req: EntertainSaveReq, params: RequestParams = {}) =>
    this.request<EntertainSaveResp, any>({
      path: `/api/platform/entertain/saveEntertain`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 平台模块
   * @name PlatformExportPlatformLogList
   * @summary 平台日志导出
   * @request GET:/api/platform/exportPlatformLogList
   * @response `200` `CommonExportResp` OK
   */
  platformExportPlatformLogList = (req: PlatformLogReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/platform/exportPlatformLogList`,
      method: 'GET',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 反馈管理模块
   * @name PlatformFeedbackOperateFeedback
   * @summary 操作问卷反馈
   * @request POST:/api/platform/feedback/operateFeedback
   * @response `200` `FeedbackOperateResp` OK
   */
  platformFeedbackOperateFeedback = (req: FeedbackOperateReq, params: RequestParams = {}) =>
    this.request<FeedbackOperateResp, any>({
      path: `/api/platform/feedback/operateFeedback`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 反馈管理模块
   * @name PlatformFeedbackQueryList
   * @summary 调查列表查询
   * @request GET:/api/platform/feedback/queryList
   * @response `200` `FeedbackListResp` OK
   */
  platformFeedbackQueryList = (
    query: {
      /** 问卷投放页面 */
      menu?: string;
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
    this.request<FeedbackListResp, any>({
      path: `/api/platform/feedback/queryList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 反馈管理模块
   * @name PlatformFeedbackQueryMenuList
   * @summary 投放页面筛选查询
   * @request GET:/api/platform/feedback/queryMenuList
   * @response `200` `FeedbackMenuResp` OK
   */
  platformFeedbackQueryMenuList = (params: RequestParams = {}) =>
    this.request<FeedbackMenuResp, any>({
      path: `/api/platform/feedback/queryMenuList`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 反馈管理模块
   * @name PlatformFeedbackQueryRecordList
   * @summary 调查详情列表查询
   * @request GET:/api/platform/feedback/queryRecordList
   * @response `200` `FeedbackRecordListResp` OK
   */
  platformFeedbackQueryRecordList = (
    query: {
      /** 唯一编码 */
      feedbackCode: string;
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
    this.request<FeedbackRecordListResp, any>({
      path: `/api/platform/feedback/queryRecordList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 反馈管理模块
   * @name PlatformFeedbackQueryTemplate
   * @summary 调查反馈路由查询
   * @request GET:/api/platform/feedback/queryTemplate
   * @response `200` `FeedbackDetailResp` OK
   */
  platformFeedbackQueryTemplate = (
    query?: {
      /** 模块 例如：红人营销-meta */
      module?: string;
      /** 路由 */
      route?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<FeedbackDetailResp, any>({
      path: `/api/platform/feedback/queryTemplate`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 反馈管理模块
   * @name PlatformFeedbackSave
   * @summary 保存系统反馈
   * @request POST:/api/platform/feedback/save
   * @response `200` `FeedbackSaveResp` OK
   */
  platformFeedbackSave = (req: FeedbackSaveReq, params: RequestParams = {}) =>
    this.request<FeedbackSaveResp, any>({
      path: `/api/platform/feedback/save`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 平台模块, 文件管理
   * @name PlatformFileRecordQueryFileRecordList
   * @summary 导入导出记录查询
   * @request GET:/api/platform/fileRecord/queryFileRecordList
   * @response `200` `FileRecordListQueryResp` OK
   */
  platformFileRecordQueryFileRecordList = (
    query: {
      /** 应用编码 后端提供 */
      appCode?: string;
      /** 上传时间: yyyy-MM-dd hh:mm:ss */
      createTimeEnd?: string;
      /** 上传时间: yyyy-MM-dd hh:mm:ss */
      createTimeStart?: string;
      /** 上传人 */
      creator?: string;
      /** 关键字 */
      keyword?: string;
      /** 模块编码 后端提供 */
      moduleCode?: string;
      /** 模块编号 */
      moduleCodeList?: string;
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
      /** 平台 lute_os_v2,lute_erp */
      platform?: string;
      platformList?: string[];
      /** 记录编号 */
      recordCode?: string;
      /**
       * 记录类型 1-导入 2-导出
       * @format int32
       */
      recordType?: number;
      /** 是否查询全部上传人 */
      searchAllCreator?: boolean;
      /**
       * 状态 0-失败 1-处理中 2-成功
       * @format int32
       */
      status?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<FileRecordListQueryResp, any>({
      path: `/api/platform/fileRecord/queryFileRecordList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 审核管理
   * @name PlatformFlowChangeStatus
   * @summary 变更状态
   * @request POST:/api/platform/flow/changeStatus
   * @response `200` `CommonRespVoid` OK
   */
  platformFlowChangeStatus = (req: FlowChangeStatusReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/platform/flow/changeStatus`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 审核管理
   * @name PlatformFlowQueryDetail
   * @summary 详情
   * @request GET:/api/platform/flow/queryDetail
   * @response `200` `FlowDetailQueryResp` OK
   */
  platformFlowQueryDetail = (
    query?: {
      /** 审批流编码 */
      code?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<FlowDetailQueryResp, any>({
      path: `/api/platform/flow/queryDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 审核管理
   * @name PlatformFlowQueryList
   * @summary 列表查询
   * @request POST:/api/platform/flow/queryList
   * @response `200` `FlowListQueryResp` OK
   */
  platformFlowQueryList = (req: FlowListQueryReq, params: RequestParams = {}) =>
    this.request<FlowListQueryResp, any>({
      path: `/api/platform/flow/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 审核管理
   * @name PlatformFlowQueryTemplate
   * @summary 模板查询
   * @request GET:/api/platform/flow/queryTemplate
   * @response `200` `FlowTemplateResp` OK
   */
  platformFlowQueryTemplate = (
    query?: {
      /**
       * 类型：101-用研需求管理
       * @format int32
       */
      type?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<FlowTemplateResp, any>({
      path: `/api/platform/flow/queryTemplate`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 审核管理
   * @name PlatformFlowSaveOrUpdate
   * @summary 新增/更新
   * @request POST:/api/platform/flow/saveOrUpdate
   * @response `200` `CommonRespString` OK
   */
  platformFlowSaveOrUpdate = (req: FlowSaveReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/platform/flow/saveOrUpdate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 首页
   * @name PlatformHomepageSalesDaily
   * @summary 销售日报
   * @request GET:/api/platform/homepage/salesDaily
   * @response `200` `SalesTendencyChartResp` OK
   */
  platformHomepageSalesDaily = (params: RequestParams = {}) =>
    this.request<SalesTendencyChartResp, any>({
      path: `/api/platform/homepage/salesDaily`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 平台模块, 标签管理
   * @name PlatformLabelCategoryQueryTree
   * @summary 标签分类树查询
   * @request POST:/api/platform/label/category/queryTree
   * @response `200` `LabelCategoryTreeQueryResp` OK
   */
  platformLabelCategoryQueryTree = (req: LabelCategoryTreeQueryReq, params: RequestParams = {}) =>
    this.request<LabelCategoryTreeQueryResp, any>({
      path: `/api/platform/label/category/queryTree`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 平台模块, 标签管理
   * @name PlatformLabelDeleteLabelInfo
   * @summary 删除标签信息
   * @request POST:/api/platform/label/deleteLabelInfo
   * @response `200` `CommonRespObject` OK
   */
  platformLabelDeleteLabelInfo = (req: LabelDeleteReq, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/platform/label/deleteLabelInfo`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 平台模块, 标签管理
   * @name PlatformLabelQueryLabelAllList
   * @summary 标签列表多级一次性查询
   * @request GET:/api/platform/label/queryLabelAllList
   * @response `200` `LabelListQueryResp` OK
   */
  platformLabelQueryLabelAllList = (
    query?: {
      /** 标签模块 折扣码标识 mark_tag */
      module?: string;
      /**
       * 红人业务参数-类型： 默认1查全部，0-排除已废弃、关停中
       * @format int32
       */
      type?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<LabelListQueryResp, any>({
      path: `/api/platform/label/queryLabelAllList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 平台模块, 标签管理
   * @name PlatformLabelQueryLabelList
   * @summary 标签列表查询
   * @request GET:/api/platform/label/queryLabelList
   * @response `200` `LabelListQueryResp` OK
   */
  platformLabelQueryLabelList = (
    query: {
      /** 标签编码 （红人模块：不传查一级标签，传查二级标签） */
      labelCode?: string;
      /**
       * 标签等级
       * @format int32
       */
      level?: number;
      /** 标签模块 meta-红人 agency-服务商 */
      module?: string;
      /** 标签名称 */
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
      /** 父级标签编码 */
      parentLabelCode?: string;
      /**
       * 状态 1—启用 0-关闭
       * @format int32
       */
      status?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<LabelListQueryResp, any>({
      path: `/api/platform/label/queryLabelList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 平台模块, 标签管理
   * @name PlatformLabelSaveLabelInfo
   * @summary 保存标签信息
   * @request POST:/api/platform/label/saveLabelInfo
   * @response `200` `LabelSaveResp` OK
   */
  platformLabelSaveLabelInfo = (req: LabelSaveReq, params: RequestParams = {}) =>
    this.request<LabelSaveResp, any>({
      path: `/api/platform/label/saveLabelInfo`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 平台模块, 标签管理
   * @name PlatformLabelSaveLabelInfoMulti
   * @summary 保存多级标签信息
   * @request POST:/api/platform/label/saveLabelInfo/multi
   * @response `200` `CommonRespBoolean` OK
   */
  platformLabelSaveLabelInfoMulti = (req: LabelSaveMultiReq, params: RequestParams = {}) =>
    this.request<CommonRespBoolean, any>({
      path: `/api/platform/label/saveLabelInfo/multi`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 映射管理
   * @name PlatformMappingChangeStatus
   * @summary 变更状态
   * @request POST:/api/platform/mapping/changeStatus
   * @response `200` `CommonRespVoid` OK
   */
  platformMappingChangeStatus = (req: PlatformMappingChangeStatusReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/platform/mapping/changeStatus`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 映射管理
   * @name PlatformMappingDeleted
   * @summary 删除映射
   * @request POST:/api/platform/mapping/deleted
   * @response `200` `CommonRespVoid` OK
   */
  platformMappingDeleted = (req: PlatformMappingDeletedReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/platform/mapping/deleted`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 映射管理
   * @name PlatformMappingExportQueryList
   * @summary 查询列表导出(参数同查询列表)
   * @request POST:/api/platform/mapping/export/queryList
   * @response `200` `CommonRespCommonExportResp` OK
   */
  platformMappingExportQueryList = (req: PlatformMappingListReq, params: RequestParams = {}) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/platform/mapping/export/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 映射管理
   * @name PlatformMappingQueryList
   * @summary 查询列表
   * @request POST:/api/platform/mapping/queryList
   * @response `200` `PlatformMappingListResp` OK
   */
  platformMappingQueryList = (req: PlatformMappingListReq, params: RequestParams = {}) =>
    this.request<PlatformMappingListResp, any>({
      path: `/api/platform/mapping/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 映射管理
   * @name PlatformMappingQueryTargetEnums
   * @summary 查询映射枚举
   * @request GET:/api/platform/mapping/queryTargetEnums
   * @response `200` `(string)[]` OK
   */
  platformMappingQueryTargetEnums = (
    query: {
      /** mappingCode */
      mappingCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<string[], any>({
      path: `/api/platform/mapping/queryTargetEnums`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 映射管理
   * @name PlatformMappingSaveOrUpdate
   * @summary 新增或者更新
   * @request POST:/api/platform/mapping/saveOrUpdate
   * @response `200` `CommonRespVoid` OK
   */
  platformMappingSaveOrUpdate = (req: PlatformMappingSaveOrUpdateReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/platform/mapping/saveOrUpdate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 智能会议模块
   * @name PlatformMeetingChangeDeviceStatus
   * @summary 会议室-设备开关
   * @request POST:/api/platform/meeting/changeDeviceStatus
   * @response `200` `CommonRespObject` OK
   */
  platformMeetingChangeDeviceStatus = (
    req: SmartMeetingRoomDeviceChangeReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/platform/meeting/changeDeviceStatus`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 智能会议模块
   * @name PlatformMeetingDeleteMeetingRoomDevice
   * @summary 会议室-删除设备
   * @request POST:/api/platform/meeting/deleteMeetingRoomDevice
   * @response `200` `CommonRespObject` OK
   */
  platformMeetingDeleteMeetingRoomDevice = (
    req: SmartMeetingRoomDeviceSaveReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/platform/meeting/deleteMeetingRoomDevice`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 智能会议模块
   * @name PlatformMeetingQueryRoomDeviceList
   * @summary 会议室-设备明细列表
   * @request GET:/api/platform/meeting/queryRoomDeviceList
   * @response `200` `SmartMeetingRoomDeviceResp` OK
   */
  platformMeetingQueryRoomDeviceList = (
    query: {
      /**
       * 设备类型：0-辅助设备，1-核心设备
       * @format int32
       */
      deviceType?: number;
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
      /** 会议室编码 */
      roomCode?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<SmartMeetingRoomDeviceResp, any>({
      path: `/api/platform/meeting/queryRoomDeviceList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 智能会议模块
   * @name PlatformMeetingQueryRoomDeviceSelectList
   * @summary 会议室-设备下拉列表
   * @request GET:/api/platform/meeting/queryRoomDeviceSelectList
   * @response `200` `SmartMeetingQueryRoomDeviceResp` OK
   */
  platformMeetingQueryRoomDeviceSelectList = (
    query: {
      /**
       * 设备类型：0-辅助设备，1-核心设备
       * @format int32
       */
      deviceType?: number;
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
      /** 会议室编码 */
      roomCode?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<SmartMeetingQueryRoomDeviceResp, any>({
      path: `/api/platform/meeting/queryRoomDeviceSelectList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 智能会议模块
   * @name PlatformMeetingQueryRoomList
   * @summary 会议室-列表
   * @request GET:/api/platform/meeting/queryRoomList
   * @response `200` `SmartMeetingRoomResp` OK
   */
  platformMeetingQueryRoomList = (
    query: {
      /** 会议室名称 */
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
      /**
       * 会议室类别 0-其他 1-培训室 2-超大会议室 3-大会议室 4-中会议室 5-小会议室
       * @format int32
       */
      roomCategory?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<SmartMeetingRoomResp, any>({
      path: `/api/platform/meeting/queryRoomList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 智能会议模块
   * @name PlatformMeetingSaveMeetingRoomDevice
   * @summary 会议室-添加设备
   * @request POST:/api/platform/meeting/saveMeetingRoomDevice
   * @response `200` `CommonRespObject` OK
   */
  platformMeetingSaveMeetingRoomDevice = (
    req: SmartMeetingRoomDeviceSaveReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/platform/meeting/saveMeetingRoomDevice`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags OA能效模块
   * @name PlatformMeetingRoomQueryMeetingRoomList
   * @summary 会议室列表
   * @request GET:/api/platform/meetingRoom/queryMeetingRoomList
   * @response `200` `MeetingRoomResp` OK
   */
  platformMeetingRoomQueryMeetingRoomList = (
    query: {
      /**
       * 会议结束时间
       * @format date-time
       */
      meetingEndTime: string;
      /**
       * 会议开始时间
       * @format date-time
       */
      meetingStartTime: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<MeetingRoomResp, any>({
      path: `/api/platform/meetingRoom/queryMeetingRoomList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 平台资源模块, 菜单管理
   * @name PlatformMenuOperateMenu
   * @summary 操作菜单
   * @request POST:/api/platform/menu/operateMenu
   * @response `200` `MenuOperateResp` OK
   */
  platformMenuOperateMenu = (req: MenuOperateReq, params: RequestParams = {}) =>
    this.request<MenuOperateResp, any>({
      path: `/api/platform/menu/operateMenu`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 平台资源模块, 菜单管理
   * @name PlatformMenuQueryMenuDetail
   * @summary 菜单详情
   * @request GET:/api/platform/menu/queryMenuDetail
   * @response `200` `MenuDetailQueryResp` OK
   */
  platformMenuQueryMenuDetail = (
    query: {
      /** 菜单编码 */
      menuCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<MenuDetailQueryResp, any>({
      path: `/api/platform/menu/queryMenuDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 平台资源模块, 菜单管理
   * @name PlatformMenuQueryMenuTree
   * @summary 获取菜单树结构
   * @request GET:/api/platform/menu/queryMenuTree
   * @response `200` `MenuTreeQueryResp` OK
   */
  platformMenuQueryMenuTree = (
    query?: {
      /** 当前账号编码 */
      accountCode?: string;
      /**
       * 是否过滤禁用状态 0-否 1-是
       * @format int32
       */
      filterStatus?: number;
      /** 菜单编码, 不传则查询整棵菜单树 */
      menuCode?: string;
      /** 菜单所属平台 lute_os lute_iot lute_business... */
      platform?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<MenuTreeQueryResp, any>({
      path: `/api/platform/menu/queryMenuTree`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 平台资源模块, 菜单管理
   * @name PlatformMenuSaveMenu
   * @summary 保存菜单
   * @request POST:/api/platform/menu/saveMenu
   * @response `200` `MenuSaveResp` OK
   */
  platformMenuSaveMenu = (req: MenuSaveReq, params: RequestParams = {}) =>
    this.request<MenuSaveResp, any>({
      path: `/api/platform/menu/saveMenu`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 平台模块, 文件管理
   * @name PlatformOssQueryOssPublicPolicy
   * @summary 通用 - 获取OSS公有授权
   * @request GET:/api/platform/oss/queryOssPublicPolicy
   * @response `200` `AliyunTempPolicyResp` OK
   */
  platformOssQueryOssPublicPolicy = (
    query: {
      /** 文件目录 分类别区分(前后端约定), etc. 细分路径用/分隔 */
      directory: string;
      /** 文件名 带后缀 */
      filename: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<AliyunTempPolicyResp, any>({
      path: `/api/platform/oss/queryOssPublicPolicy`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 平台模块, 文件管理
   * @name PlatformOssQueryOssTempPolicy
   * @summary 通用 - 获取OSS临时授权
   * @request GET:/api/platform/oss/queryOssTempPolicy
   * @response `200` `AliyunTempMorePolicyResp` OK
   */
  platformOssQueryOssTempPolicy = (
    query: {
      /** 文件目录 分类别区分(前后端约定), etc. 细分路径用/分隔 */
      directory: string;
      /** 文件名 带后缀 */
      filename: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<AliyunTempMorePolicyResp, any>({
      path: `/api/platform/oss/queryOssTempPolicy`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 平台模块, 文件管理
   * @name PlatformOssUploadToTempOss
   * @summary 通用 - 上传文件到OSS临时桶
   * @request POST:/api/platform/oss/uploadToTempOss
   * @response `200` `CommonRespString` OK
   */
  platformOssUploadToTempOss = (
    query: {
      /** directory */
      directory: string;
    },
    file: File,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespString, any>({
      path: `/api/platform/oss/uploadToTempOss`,
      method: 'POST',
      query: query,
      body: file,
      type: ContentType.FormData,
      ...params,
    });
  /**
   * No description
   *
   * @tags 平台模块
   * @name PlatformProvinceQueryProvinceInfoList
   * @summary 省份下拉列表查询
   * @request GET:/api/platform/province/queryProvinceInfoList
   * @response `200` `ProvinceInfoListQueryResp` OK
   */
  platformProvinceQueryProvinceInfoList = (
    query: {
      /** 国家编码 */
      countryCode: string;
      /** 关键词 */
      keyword?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<ProvinceInfoListQueryResp, any>({
      path: `/api/platform/province/queryProvinceInfoList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 平台模块
   * @name PlatformQueryCommonDept
   * @summary 获取部门树结构/排列结构
   * @request POST:/api/platform/queryCommonDept
   * @response `200` `DeptInfoResp` OK
   */
  platformQueryCommonDept = (
    query?: {
      /**
       * 部门id
       * @format int64
       */
      deptId?: number;
      /** 部门名称 */
      deptName?: string;
      /**
       * 返回结构类型 1-树形结构部门 2-排列结构
       * @format int32
       */
      type?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<DeptInfoResp, any>({
      path: `/api/platform/queryCommonDept`,
      method: 'POST',
      query: query,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 平台模块, 标签管理
   * @name PlatformQueryLabelModelList
   * @summary 标签模块查询
   * @request GET:/api/platform/queryLabelModelList
   * @response `200` `LabelModelResp` OK
   */
  platformQueryLabelModelList = (params: RequestParams = {}) =>
    this.request<LabelModelResp, any>({
      path: `/api/platform/queryLabelModelList`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 平台模块
   * @name PlatformQueryLog
   * @summary 日志查询
   * @request GET:/api/platform/queryLog
   * @response `200` `OperationLogResp` OK
   */
  platformQueryLog = (
    query: {
      /**
       * 是否统计分页总数量 1-是 0-否 默认否
       * @format int32
       */
      countFlag?: number;
      /**
       * 结束时间
       * @format date-time
       */
      endTime?: string;
      /** 项目编码 */
      itemCode?: string;
      /** 项目类型 在线课程-study_course */
      itemType?: string;
      /** 模型类型 在线课程-study_course */
      moduleType?: string;
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
       * 开始时间
       * @format date-time
       */
      startTime?: string;
      /** 是否转换客服操作人 */
      transferKfOperator?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<OperationLogResp, any>({
      path: `/api/platform/queryLog`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 平台模块
   * @name PlatformQueryPlatformLogList
   * @summary 平台日志查询
   * @request GET:/api/platform/queryPlatformLogList
   * @response `200` `PlatformLogResp` OK
   */
  platformQueryPlatformLogList = (
    query: {
      /** 操作结束时间 */
      endTime?: string;
      /** 类型 */
      'operateTypeList[0].itemType'?: string;
      /** 模块 */
      'operateTypeList[0].moduleType'?: string;
      /** 操作类型 */
      'operateTypeList[0].operateType'?: string;
      /** 操作人 */
      operator: string;
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
      /** 平台 rpe-路特创新RPE系统 dingTalk-钉钉 钉钉管理后台-dingTalkAdmin */
      platform?: string;
      /** 操作开始时间 */
      startTime?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<PlatformLogResp, any>({
      path: `/api/platform/queryPlatformLogList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags oss模块, 平台模块
   * @name PlatformQueryUrl
   * @summary oss文件路径查询
   * @request GET:/api/platform/queryUrl
   * @response `200` `OssQueryResp` OK
   */
  platformQueryUrl = (
    query: {
      /** ossKey */
      ossKey: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<OssQueryResp, any>({
      path: `/api/platform/queryUrl`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 平台模块
   * @name PlatformRefresh
   * @summary 业务模块-手动刷新
   * @request POST:/api/platform/refresh
   * @deprecated
   * @response `200` `CommonRespBoolean` OK
   */
  platformRefresh = (req: ModelRefreshReq, params: RequestParams = {}) =>
    this.request<CommonRespBoolean, any>({
      path: `/api/platform/refresh`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 行政区划模块
   * @name PlatformRegionQueryAllProvinceList
   * @summary 查询省
   * @request GET:/api/platform/region/queryAllProvinceList
   * @response `200` `RegionQueryResp` OK
   */
  platformRegionQueryAllProvinceList = (params: RequestParams = {}) =>
    this.request<RegionQueryResp, any>({
      path: `/api/platform/region/queryAllProvinceList`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 行政区划模块
   * @name PlatformRegionQueryAreaList
   * @summary 查询区/县
   * @request GET:/api/platform/region/queryAreaList
   * @response `200` `RegionQueryResp` OK
   */
  platformRegionQueryAreaList = (
    query: {
      /** 区/县编码 */
      cityCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<RegionQueryResp, any>({
      path: `/api/platform/region/queryAreaList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 行政区划模块
   * @name PlatformRegionQueryCityList
   * @summary 查询市
   * @request GET:/api/platform/region/queryCityList
   * @response `200` `RegionQueryResp` OK
   */
  platformRegionQueryCityList = (
    query: {
      /** 省份编码 */
      provinceCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<RegionQueryResp, any>({
      path: `/api/platform/region/queryCityList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 平台资源模块, 角色管理
   * @name PlatformRoleAuth
   * @summary 角色权限
   * @request GET:/api/platform/role/auth
   * @response `200` `CommonRespBoolean` OK
   */
  platformRoleAuth = (
    query: {
      /** roleCode */
      roleCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespBoolean, any>({
      path: `/api/platform/role/auth`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 平台资源模块, 角色管理
   * @name PlatformRoleOperate
   * @summary 角色操作
   * @request POST:/api/platform/role/operate
   * @response `200` `CommonRespVoid` OK
   */
  platformRoleOperate = (req: RoleOperateReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/platform/role/operate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 平台资源模块, 角色管理
   * @name PlatformRoleQueryDetail
   * @summary 角色详情
   * @request GET:/api/platform/role/queryDetail
   * @response `200` `RoleDetailResp` OK
   */
  platformRoleQueryDetail = (
    query?: {
      /** 角色编码 */
      roleCode?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<RoleDetailResp, any>({
      path: `/api/platform/role/queryDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 平台资源模块, 角色管理
   * @name PlatformRoleQueryMenu
   * @summary 角色菜单详情
   * @request GET:/api/platform/role/queryMenu
   * @response `200` `RoleMenuTreeQueryResp` OK
   */
  platformRoleQueryMenu = (
    query: {
      /**
       * platform
       * @default "lute_os"
       */
      platform?: string;
      /** roleCode */
      roleCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<RoleMenuTreeQueryResp, any>({
      path: `/api/platform/role/queryMenu`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 平台资源模块, 角色管理
   * @name PlatformRoleQueryRoleAccount
   * @summary 角色账号查询
   * @request GET:/api/platform/role/queryRoleAccount
   * @response `200` `RoleAccountResp` OK
   */
  platformRoleQueryRoleAccount = (
    query: {
      /** roleCode */
      roleCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<RoleAccountResp, any>({
      path: `/api/platform/role/queryRoleAccount`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 平台资源模块, 角色管理
   * @name PlatformRoleQueryRoleList
   * @summary 角色列表查询
   * @request GET:/api/platform/role/queryRoleList
   * @response `200` `RoleListQueryResp` OK
   */
  platformRoleQueryRoleList = (
    query?: {
      /** 平台 */
      platform?: string;
      /** 角色编号 */
      roleCode?: string;
      /** 角色名字 模糊搜索 */
      roleName?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<RoleListQueryResp, any>({
      path: `/api/platform/role/queryRoleList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 平台资源模块, 角色管理
   * @name PlatformRoleQueryRoleListV2
   * @summary 角色列表查询V2
   * @request GET:/api/platform/role/queryRoleListV2
   * @response `200` `RoleListQueryPageResp` OK
   */
  platformRoleQueryRoleListV2 = (
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
      /** 平台 */
      platform?: string;
      /** 角色编号 */
      roleCode?: string;
      /** 角色名字 模糊搜索 */
      roleName?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<RoleListQueryPageResp, any>({
      path: `/api/platform/role/queryRoleListV2`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 平台资源模块, 角色管理
   * @name PlatformRoleRemoveRole
   * @summary 删除角色
   * @request POST:/api/platform/role/removeRole
   * @response `200` `CommonRespVoid` OK
   */
  platformRoleRemoveRole = (req: RoleRemoveReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/platform/role/removeRole`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 平台资源模块, 角色管理
   * @name PlatformRoleResourceMapping
   * @summary 角色资源映射
   * @request POST:/api/platform/role/resourceMapping
   * @response `200` `CommonRespVoid` OK
   */
  platformRoleResourceMapping = (req: PlatformRoleResourceSaveReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/platform/role/resourceMapping`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 平台资源模块, 角色管理
   * @name PlatformRoleSaveRole
   * @summary 保存角色
   * @request POST:/api/platform/role/saveRole
   * @response `200` `RoleSaveResp` OK
   */
  platformRoleSaveRole = (req: RoleSaveReq, params: RequestParams = {}) =>
    this.request<RoleSaveResp, any>({
      path: `/api/platform/role/saveRole`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 平台资源模块, 角色管理
   * @name PlatformRoleSaveRoleAccount
   * @summary 角色账号保存
   * @request POST:/api/platform/role/saveRoleAccount
   * @response `200` `CommonResp` OK
   */
  platformRoleSaveRoleAccount = (req: RoleAccountSaveReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/platform/role/saveRoleAccount`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 平台资源模块, 角色管理
   * @name PlatformRoleSaveRoleMenu
   * @summary 角色菜单保存
   * @request POST:/api/platform/role/saveRoleMenu
   * @response `200` `RoleSaveResp` OK
   */
  platformRoleSaveRoleMenu = (req: RoleMenuSaveReq, params: RequestParams = {}) =>
    this.request<RoleSaveResp, any>({
      path: `/api/platform/role/saveRoleMenu`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 平台模块, 标签管理
   * @name PlatformSaveLabelModel
   * @summary 标签模块保存
   * @request POST:/api/platform/saveLabelModel
   * @response `200` `LabelModelSaveResp` OK
   */
  platformSaveLabelModel = (req: LabelModelSaveReq, params: RequestParams = {}) =>
    this.request<LabelModelSaveResp, any>({
      path: `/api/platform/saveLabelModel`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 平台模块
   * @name PlatformSaveLog
   * @summary 保存日志
   * @request POST:/api/platform/saveLog
   * @response `200` `CommonRespVoid` OK
   */
  platformSaveLog = (req: OperationLogSaveReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/platform/saveLog`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 用户搜索模块
   * @name PlatformSearchOperateCondition
   * @summary 操作搜索条件
   * @request DELETE:/api/platform/search/operateCondition
   * @response `200` `void` OK
   */
  platformSearchOperateCondition = (req: CommonOperateReq, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/platform/search/operateCondition`,
      method: 'DELETE',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 用户搜索模块
   * @name PlatformSearchQueryConditionList
   * @summary 搜索条件列表查询（当前用户）
   * @request GET:/api/platform/search/queryConditionList
   * @response `200` `SearchConditionListQueryResp` OK
   */
  platformSearchQueryConditionList = (
    query: {
      /** 搜索条件编码 */
      conditionCode?: string;
      /** 模块标识 meta_user 红人标识 */
      itemType?: string;
      /** 关键字查询 */
      keyword?: string;
      /** 模块标识 meta */
      moduleType?: string;
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
      /** 平台标识 rpe、kms、kol、meta等 */
      platform?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<SearchConditionListQueryResp, any>({
      path: `/api/platform/search/queryConditionList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 用户搜索模块
   * @name PlatformSearchSaveCondition
   * @summary 保存搜索条件
   * @request POST:/api/platform/search/saveCondition
   * @response `200` `SearchConditionSaveResp` OK
   */
  platformSearchSaveCondition = (req: SearchConditionSaveReq, params: RequestParams = {}) =>
    this.request<SearchConditionSaveResp, any>({
      path: `/api/platform/search/saveCondition`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 平台模块
   * @name PlatformSiteQuerySiteList
   * @summary 站点信息列表查询
   * @request GET:/api/platform/site/querySiteList
   * @response `200` `SiteListQueryResp` OK
   */
  platformSiteQuerySiteList = (
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
      /** 站点编码 */
      siteCode?: string;
      /** 站点名称 */
      siteName?: string;
      /** 站点平台 amazon-亚马逊 station-独立站 */
      sitePlatform?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<SiteListQueryResp, any>({
      path: `/api/platform/site/querySiteList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 平台模块
   * @name PlatformSiteInfo
   * @summary 获取站点列表
   * @request GET:/api/platform/siteInfo
   * @response `200` `SiteInfoDesp` OK
   */
  platformSiteInfo = (params: RequestParams = {}) =>
    this.request<SiteInfoDesp, any>({
      path: `/api/platform/siteInfo`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 平台模块, 系统配置
   * @name PlatformSystemQuerySystemConfig
   * @summary 系统配置查询
   * @request GET:/api/platform/system/querySystemConfig
   * @response `200` `void` OK
   */
  platformSystemQuerySystemConfig = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/platform/system/querySystemConfig`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 平台模块, 系统配置
   * @name PlatformSystemSaveSystemConfig
   * @summary 保存系统配置
   * @request POST:/api/platform/system/saveSystemConfig
   * @response `200` `void` OK
   */
  platformSystemSaveSystemConfig = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/platform/system/saveSystemConfig`,
      method: 'POST',
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 任务管理
   * @name PlatformTaskAddCategory
   * @summary 新增任务分类
   * @request POST:/api/platform/task/addCategory
   * @response `200` `TaskCategorySaveResp` OK
   */
  platformTaskAddCategory = (req: TaskCategorySaveReq, params: RequestParams = {}) =>
    this.request<TaskCategorySaveResp, any>({
      path: `/api/platform/task/addCategory`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 任务管理
   * @name PlatformTaskChange
   * @summary 任务变更
   * @request POST:/api/platform/task/change
   * @response `200` `CommonRespVoid` OK
   */
  platformTaskChange = (req: TaskChangeReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/platform/task/change`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 任务管理
   * @name PlatformTaskChangeDetail
   * @summary 任务变更详情
   * @request GET:/api/platform/task/changeDetail
   * @response `200` `TaskChangeDetailResp` OK
   */
  platformTaskChangeDetail = (
    query?: {
      /** 任务编码 */
      taskCode?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<TaskChangeDetailResp, any>({
      path: `/api/platform/task/changeDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 任务管理
   * @name PlatformTaskDetail
   * @summary 任务详情
   * @request GET:/api/platform/task/detail
   * @response `200` `TaskDetailResp` OK
   */
  platformTaskDetail = (
    query: {
      /**
       * 是否显示变更前任务信息 1-是 0-否
       * @format int32
       */
      historyFlag?: number;
      /** 任务编码 */
      taskCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<TaskDetailResp, any>({
      path: `/api/platform/task/detail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 任务管理
   * @name PlatformTaskExport
   * @summary 任务导出
   * @request POST:/api/platform/task/export
   * @response `200` `CommonExportResp` OK
   */
  platformTaskExport = (req: TaskExportReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/platform/task/export`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 任务管理
   * @name PlatformTaskGetTaskCategoryList
   * @summary 任务分类列表
   * @request GET:/api/platform/task/getTaskCategoryList
   * @response `200` `TaskCategoryListResp` OK
   */
  platformTaskGetTaskCategoryList = (
    query?: {
      /** name */
      name?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<TaskCategoryListResp, any>({
      path: `/api/platform/task/getTaskCategoryList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 任务管理
   * @name PlatformTaskList
   * @summary 任务列表
   * @request GET:/api/platform/task/list
   * @response `200` `TaskListResp` OK
   */
  platformTaskList = (
    query: {
      /** 任务完成确认人 */
      acceptor?: string;
      /**
       * 关闭结束时间
       * @format date
       */
      closeEndDate?: string;
      /**
       * 关闭开始时间
       * @format date
       */
      closeStartDate?: string;
      /**
       * 本部门创建 1-勾选 0-不勾选
       * @format int32
       */
      createFlag?: number;
      /** 创建人编码 */
      creator?: string;
      /**
       * 创建结束时间
       * @format date
       */
      endDate?: string;
      /**
       * 是否关注 1-是
       * @format int32
       */
      followFlag?: number;
      /**
       * 本部门处理 1-勾选 0-不勾选
       * @format int32
       */
      handleFlag?: number;
      /** 责任人编码 */
      handler?: string;
      /**
       * 是否共同执行列表 1-是 0-否
       * @format int32
       */
      joinHandlerFlag?: number;
      /** 关键词 标题 */
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
      /**
       * 任务来源
       * @format int32
       */
      source?: number;
      /**
       * 创建开始时间
       * @format date
       */
      startDate?: string;
      /**
       * 状态
       * @format int32
       */
      status?: number;
      /** 任务分类编码 */
      taskCategoryCode?: string;
      /**
       * 团队任务 1-团队 0-个人
       * @format int32
       */
      teamFlag?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<TaskListResp, any>({
      path: `/api/platform/task/list`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 任务管理
   * @name PlatformTaskOperate
   * @summary 任务操作
   * @request POST:/api/platform/task/operate
   * @response `200` `TaskOperateResp` OK
   */
  platformTaskOperate = (req: TaskOperateReq, params: RequestParams = {}) =>
    this.request<TaskOperateResp, any>({
      path: `/api/platform/task/operate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 任务管理
   * @name PlatformTaskSaveTask
   * @summary 保存任务
   * @request POST:/api/platform/task/saveTask
   * @response `200` `TaskSaveResp` OK
   */
  platformTaskSaveTask = (req: TaskSaveReq, params: RequestParams = {}) =>
    this.request<TaskSaveResp, any>({
      path: `/api/platform/task/saveTask`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 任务管理
   * @name PlatformTaskStatistics
   * @summary 任务统计
   * @request POST:/api/platform/task/statistics
   * @response `200` `TaskStatisticsResp` OK
   */
  platformTaskStatistics = (req: TaskStatisticsReq, params: RequestParams = {}) =>
    this.request<TaskStatisticsResp, any>({
      path: `/api/platform/task/statistics`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 通用模板
   * @name PlatformTemplateOperate
   * @summary 操作模板
   * @request POST:/api/platform/template/operate
   * @response `200` `SysTemplateOperateResp` OK
   */
  platformTemplateOperate = (req: SysTemplateOperateReq, params: RequestParams = {}) =>
    this.request<SysTemplateOperateResp, any>({
      path: `/api/platform/template/operate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 通用模板
   * @name PlatformTemplateQueryTemplateDetail
   * @summary 通用模板详情
   * @request GET:/api/platform/template/queryTemplateDetail
   * @response `200` `SysTemplateDetailResp` OK
   */
  platformTemplateQueryTemplateDetail = (
    query?: {
      /** 模板编码 */
      templateCode?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<SysTemplateDetailResp, any>({
      path: `/api/platform/template/queryTemplateDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 通用模板
   * @name PlatformTemplateQueryTemplateList
   * @summary 通用模板列表
   * @request GET:/api/platform/template/queryTemplateList
   * @response `200` `SysTemplateQueryResp` OK
   */
  platformTemplateQueryTemplateList = (
    query: {
      /** 关键词 模板标题 */
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
      /**
       * 状态
       * @format int32
       */
      status?: number;
      /** 模板类型 */
      type?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<SysTemplateQueryResp, any>({
      path: `/api/platform/template/queryTemplateList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 通用模板
   * @name PlatformTemplateSave
   * @summary 保存通用模板
   * @request POST:/api/platform/template/save
   * @response `200` `SysTemplateSaveResp` OK
   */
  platformTemplateSave = (req: SysTemplateSaveReq, params: RequestParams = {}) =>
    this.request<SysTemplateSaveResp, any>({
      path: `/api/platform/template/save`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 平台模块
   * @name PlatformV1CountryQueryCountryList
   * @summary 国家信息列表查询
   * @request POST:/api/platform/v1/country/queryCountryList
   * @response `200` `CountryPlatformQueryResp` OK
   */
  platformV1CountryQueryCountryList = (req: CountryPlatformQueryReq, params: RequestParams = {}) =>
    this.request<CountryPlatformQueryResp, any>({
      path: `/api/platform/v1/country/queryCountryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 平台模块
   * @name PlatformV1ProvinceQueryProvinceList
   * @summary 省份下拉列表查询V1
   * @request POST:/api/platform/v1/province/queryProvinceList
   * @response `200` `ProvinceInfoListQueryResp` OK
   */
  platformV1ProvinceQueryProvinceList = (
    req: ProvinceInfoListQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<ProvinceInfoListQueryResp, any>({
      path: `/api/platform/v1/province/queryProvinceList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 工单管理, 平台模块
   * @name PlatformWorkflowHandleWithdraw
   * @summary 处理工单
   * @request POST:/api/platform/workflow/handleWithdraw
   * @response `200` `CommonRespBoolean` OK
   */
  platformWorkflowHandleWithdraw = (req: WorkflowWithdrawReq, params: RequestParams = {}) =>
    this.request<CommonRespBoolean, any>({
      path: `/api/platform/workflow/handleWithdraw`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 工单管理, 平台模块
   * @name PlatformWorkflowHandleWorkflow
   * @summary 撤销工单
   * @request POST:/api/platform/workflow/handleWorkflow
   * @response `200` `CommonRespBoolean` OK
   */
  platformWorkflowHandleWorkflow = (req: WorkflowWithdrawReq, params: RequestParams = {}) =>
    this.request<CommonRespBoolean, any>({
      path: `/api/platform/workflow/handleWorkflow`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 工单管理, 平台模块
   * @name PlatformWorkflowQueryMyWorkflowRecordCount
   * @summary 我的待办工单数
   * @request GET:/api/platform/workflow/queryMyWorkflowRecordCount
   * @response `200` `MyWorkflowCountResp` OK
   */
  platformWorkflowQueryMyWorkflowRecordCount = (params: RequestParams = {}) =>
    this.request<MyWorkflowCountResp, any>({
      path: `/api/platform/workflow/queryMyWorkflowRecordCount`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 工单管理, 平台模块
   * @name PlatformWorkflowQueryWorkflowRecordDetail
   * @summary 工单记录详情查询
   * @request GET:/api/platform/workflow/queryWorkflowRecordDetail
   * @response `200` `WorkflowDetailQueryResp` OK
   */
  platformWorkflowQueryWorkflowRecordDetail = (
    query: {
      /** 工单编码 */
      workflowCode: string;
      /**
       * 工单类型 1-审批流 2-待办
       * @format int32
       */
      workflowType: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<WorkflowDetailQueryResp, any>({
      path: `/api/platform/workflow/queryWorkflowRecordDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 工单管理, 平台模块
   * @name PlatformWorkflowQueryWorkflowRecordList
   * @summary 工单记录列表查询
   * @request GET:/api/platform/workflow/queryWorkflowRecordList
   * @response `200` `WorkflowListQueryResp` OK
   */
  platformWorkflowQueryWorkflowRecordList = (
    query: {
      /** 申请人 */
      creator?: string;
      /** 关键字 工单名称 */
      keyword?: string;
      /** 处理人 */
      operator?: string;
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
       * 状态
       * @format int32
       */
      status?: number;
      /**
       * 工单类型 1-审批流 2-待办
       * @format int32
       */
      workflowType?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<WorkflowListQueryResp, any>({
      path: `/api/platform/workflow/queryWorkflowRecordList`,
      method: 'GET',
      query: query,
      ...params,
    });
}
