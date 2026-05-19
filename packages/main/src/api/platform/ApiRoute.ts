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

export namespace Api {
  /**
   * No description
   * @tags 平台资源模块, 角色管理
   * @name PlatformAccountQueryAllAccount
   * @summary 所有账号查询
   * @request GET:/api/platform/account/queryAllAccount
   * @response `200` `RoleAccountResp` OK
   */
  export namespace PlatformAccountQueryAllAccount {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = RoleAccountResp;
  }

  /**
   * No description
   * @tags AI模块
   * @name PlatformAiOpenClawUrl
   * @summary 获取openClaw地址
   * @request GET:/api/platform/ai/openClawUrl
   * @response `200` `CommonRespOpenClawUrlResp` OK
   */
  export namespace PlatformAiOpenClawUrl {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 员工编码，不传默认取当前登录人 */
      memberCode?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespOpenClawUrlResp;
  }

  /**
   * No description
   * @tags 平台模块
   * @name PlatformAllList
   * @summary 获取所有平台
   * @request GET:/api/platform/allList
   * @response `200` `(DictBean)[]` OK
   */
  export namespace PlatformAllList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DictBean[];
  }

  /**
   * No description
   * @tags 平台模块
   * @name PlatformCanLastRefresh
   * @summary 业务模块-是否能手动刷新
   * @request GET:/api/platform/can/lastRefresh
   * @response `200` `CommonRespPlatformRefreshBean` OK
   */
  export namespace PlatformCanLastRefresh {
    export type RequestParams = {};
    export type RequestQuery = {
      /** modelCode */
      modelCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespPlatformRefreshBean;
  }

  /**
   * No description
   * @tags 平台模块
   * @name PlatformCanRefresh
   * @summary 业务模块-是否能手动刷新-过时
   * @request GET:/api/platform/can/refresh
   * @deprecated
   * @response `200` `CommonRespBoolean` OK
   */
  export namespace PlatformCanRefresh {
    export type RequestParams = {};
    export type RequestQuery = {
      /** modelCode */
      modelCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespBoolean;
  }

  /**
   * No description
   * @tags 第三方平台配置管理
   * @name PlatformChannelAccountDelete
   * @summary 第三方平台授权账号删除
   * @request POST:/api/platform/channel/account/delete
   * @response `200` `CommonResp` OK
   */
  export namespace PlatformChannelAccountDelete {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ChannelAccountDeleteReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonResp;
  }

  /**
   * No description
   * @tags 第三方平台配置管理
   * @name PlatformChannelAccountQueryDetail
   * @summary 第三方平台授权账号详情查询
   * @request POST:/api/platform/channel/account/queryDetail
   * @response `200` `ChannelAccountDetailResp` OK
   */
  export namespace PlatformChannelAccountQueryDetail {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ChannelAccountDetailQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ChannelAccountDetailResp;
  }

  /**
   * No description
   * @tags 第三方平台配置管理
   * @name PlatformChannelAccountQueryList
   * @summary 第三方平台授权账号列表查询
   * @request POST:/api/platform/channel/account/queryList
   * @response `200` `ChannelAccountListResp` OK
   */
  export namespace PlatformChannelAccountQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ChannelAccountListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ChannelAccountListResp;
  }

  /**
   * No description
   * @tags 第三方平台配置管理
   * @name PlatformChannelAccountSaveOrUpdate
   * @summary 第三方平台授权账号保存/编辑
   * @request POST:/api/platform/channel/account/saveOrUpdate
   * @response `200` `CommonResp` OK
   */
  export namespace PlatformChannelAccountSaveOrUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ChannelAccountSaveOrUpdateReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonResp;
  }

  /**
   * No description
   * @tags 第三方平台配置管理
   * @name PlatformChannelConfigDelete
   * @summary 第三方平台配置删除
   * @request POST:/api/platform/channel/config/delete
   * @response `200` `CommonResp` OK
   */
  export namespace PlatformChannelConfigDelete {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ChannelConfigDeleteReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonResp;
  }

  /**
   * No description
   * @tags 第三方平台配置管理
   * @name PlatformChannelConfigPlatformList
   * @summary 平台下拉列表
   * @request GET:/api/platform/channel/config/platform/list
   * @response `200` `ChannelConfigPlatformListResp` OK
   */
  export namespace PlatformChannelConfigPlatformList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ChannelConfigPlatformListResp;
  }

  /**
   * No description
   * @tags 第三方平台配置管理
   * @name PlatformChannelConfigQueryDetail
   * @summary 第三方平台配置详情查询
   * @request POST:/api/platform/channel/config/queryDetail
   * @response `200` `ChannelConfigDetailResp` OK
   */
  export namespace PlatformChannelConfigQueryDetail {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ChannelConfigDetailQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ChannelConfigDetailResp;
  }

  /**
   * No description
   * @tags 第三方平台配置管理
   * @name PlatformChannelConfigQueryList
   * @summary 第三方平台配置列表查询
   * @request POST:/api/platform/channel/config/queryList
   * @response `200` `ChannelConfigListResp` OK
   */
  export namespace PlatformChannelConfigQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ChannelConfigListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ChannelConfigListResp;
  }

  /**
   * No description
   * @tags 第三方平台配置管理
   * @name PlatformChannelConfigSaveOrUpdate
   * @summary 第三方平台配置保存/编辑
   * @request POST:/api/platform/channel/config/saveOrUpdate
   * @response `200` `CommonResp` OK
   */
  export namespace PlatformChannelConfigSaveOrUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ChannelConfigSaveOrUpdateReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonResp;
  }

  /**
   * No description
   * @tags 平台模块
   * @name PlatformCountryQueryCountryInfoList
   * @summary 国家下拉列表查询
   * @request GET:/api/platform/country/queryCountryInfoList
   * @response `200` `CountryInfoListQueryResp` OK
   */
  export namespace PlatformCountryQueryCountryInfoList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 关键字, 国家编码/国家名称 */
      keyword?: string;
      /**
       * 来源 0-默认 1-team sync 2-待扩展
       * @format int32
       */
      source?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CountryInfoListQueryResp;
  }

  /**
   * No description
   * @tags 平台模块
   * @name PlatformCountryQueryCountryList
   * @summary 国家信息列表查询
   * @request GET:/api/platform/country/queryCountryList
   * @response `200` `CountryListQueryResp` OK
   */
  export namespace PlatformCountryQueryCountryList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CountryListQueryResp;
  }

  /**
   * No description
   * @tags 携程商旅管理
   * @name PlatformCtripCTripFlowCheck
   * @summary 差旅审批单/外出公干校验
   * @request POST:/api/platform/ctrip/cTripFlowCheck
   * @response `200` `Record<string,object>` OK
   */
  export namespace PlatformCtripCTripFlowCheck {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CTripFlowCheckReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = Record<string, object>;
  }

  /**
   * No description
   * @tags 携程商旅管理
   * @name PlatformCtripQueryCTripCityList
   * @summary 城市列表
   * @request POST:/api/platform/ctrip/queryCTripCityList
   * @response `200` `CTripCityResp` OK
   */
  export namespace PlatformCtripQueryCTripCityList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CTripCityReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CTripCityResp;
  }

  /**
   * No description
   * @tags 携程商旅管理
   * @name PlatformCtripQueryCTripCountryList
   * @summary 国家列表
   * @request GET:/api/platform/ctrip/queryCTripCountryList
   * @response `200` `CTripCountryResp` OK
   */
  export namespace PlatformCtripQueryCTripCountryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CTripCountryResp;
  }

  /**
   * No description
   * @tags 需求管理
   * @name PlatformDemandItBatchOperate
   * @summary IT批量操作
   * @request POST:/api/platform/demand/ItBatchOperate
   * @response `200` `DemandItBatchOperateResp` OK
   */
  export namespace PlatformDemandItBatchOperate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DemandItBatchOperateReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DemandItBatchOperateResp;
  }

  /**
   * No description
   * @tags 需求管理
   * @name PlatformDemandItOperate
   * @summary IT操作
   * @request POST:/api/platform/demand/ItOperate
   * @response `200` `DemandOperateResp` OK
   */
  export namespace PlatformDemandItOperate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DemandItOperateReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DemandOperateResp;
  }

  /**
   * No description
   * @tags 需求管理
   * @name PlatformDemandAgencyList
   * @summary 品牌需求-查询机构信息
   * @request POST:/api/platform/demand/agencyList
   * @response `200` `DemandAgencyListQueryResp` OK
   */
  export namespace PlatformDemandAgencyList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DemandAgencyListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DemandAgencyListQueryResp;
  }

  /**
   * No description
   * @tags 需求管理
   * @name PlatformDemandCacheDraftDemand
   * @summary 缓存需求草稿
   * @request POST:/api/platform/demand/cacheDraftDemand
   * @response `200` `void` OK
   */
  export namespace PlatformDemandCacheDraftDemand {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DemandSaveReq;
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
   * @tags 需求管理
   * @name PlatformDemandCalculateTotalAmount
   * @summary 计算预估总价
   * @request POST:/api/platform/demand/calculateTotalAmount
   * @response `200` `DemandPurchaseAmountResp` OK
   */
  export namespace PlatformDemandCalculateTotalAmount {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DemandPurchaseAmountReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DemandPurchaseAmountResp;
  }

  /**
   * No description
   * @tags 需求管理
   * @name PlatformDemandCheckReceive
   * @summary 验收通过、拒绝
   * @request POST:/api/platform/demand/checkReceive
   * @response `200` `CommonRespObject` OK
   */
  export namespace PlatformDemandCheckReceive {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DemandBrandCheckReceiveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags 需求管理
   * @name PlatformDemandDemandFlowCheck
   * @summary 需求审批流配置校验
   * @request GET:/api/platform/demand/demandFlowCheck
   * @response `200` `void` OK
   */
  export namespace PlatformDemandDemandFlowCheck {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 需求模块 用研需求-user_research 品牌需求-brand_research IT需求-it */
      demandModule?: string;
    };
    export type RequestBody = never;
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
   * @tags 需求管理
   * @name PlatformDemandDetail
   * @summary 详情
   * @request GET:/api/platform/demand/detail
   * @response `200` `DemandDetailResp` OK
   */
  export namespace PlatformDemandDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 需求记录编码 */
      demandCode?: string;
      /** 模块 */
      demandModule?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DemandDetailResp;
  }

  /**
   * No description
   * @tags 需求管理
   * @name PlatformDemandDownloadBriefTemplate
   * @summary 下载brief模板接口
   * @request GET:/api/platform/demand/downloadBriefTemplate
   * @response `200` `CommonRespObject` OK
   */
  export namespace PlatformDemandDownloadBriefTemplate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags 需求管理
   * @name PlatformDemandExecutionFinishOrSave
   * @summary 执行完成，保存
   * @request POST:/api/platform/demand/executionFinishOrSave
   * @response `200` `CommonRespObject` OK
   */
  export namespace PlatformDemandExecutionFinishOrSave {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DemandExecutionFinishReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags 需求管理
   * @name PlatformDemandExpertList
   * @summary 品牌需求-查询专家信息
   * @request POST:/api/platform/demand/expertList
   * @response `200` `DemandExpertListQueryResp` OK
   */
  export namespace PlatformDemandExpertList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DemandExpertListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DemandExpertListQueryResp;
  }

  /**
   * No description
   * @tags 需求管理
   * @name PlatformDemandInterApprove
   * @summary 提交内审
   * @request POST:/api/platform/demand/interApprove
   * @response `200` `CommonRespVoid` OK
   */
  export namespace PlatformDemandInterApprove {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DemandExecuteSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespVoid;
  }

  /**
   * No description
   * @tags 需求管理
   * @name PlatformDemandIsProductCenterDept
   * @summary 是否所属产品中心
   * @request GET:/api/platform/demand/isProductCenterDept
   * @response `200` `ProductCenterDeptResp` OK
   */
  export namespace PlatformDemandIsProductCenterDept {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ProductCenterDeptResp;
  }

  /**
   * No description
   * @tags 需求管理
   * @name PlatformDemandLeadValueBpConfirm
   * @summary BP 确认线索（分配产品经理，进入需求方案）
   * @request POST:/api/platform/demand/leadValue/bpConfirm
   * @response `200` `LeadBpActionResp` OK
   */
  export namespace PlatformDemandLeadValueBpConfirm {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LeadBpConfirmReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = LeadBpActionResp;
  }

  /**
   * No description
   * @tags 需求管理
   * @name PlatformDemandLeadValueBpTransfer
   * @summary BP 转交线索
   * @request POST:/api/platform/demand/leadValue/bpTransfer
   * @response `200` `LeadBpActionResp` OK
   */
  export namespace PlatformDemandLeadValueBpTransfer {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LeadBpTransferReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = LeadBpActionResp;
  }

  /**
   * No description
   * @tags 需求管理
   * @name PlatformDemandLeadValueDeptMappingDelete
   * @summary 需求线索组织映射删除
   * @request POST:/api/platform/demand/leadValue/deptMapping/delete
   * @response `200` `void` OK
   */
  export namespace PlatformDemandLeadValueDeptMappingDelete {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * id
       * @format int64
       */
      id: number;
    };
    export type RequestBody = never;
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
   * @tags 需求管理
   * @name PlatformDemandLeadValueDeptMappingList
   * @summary 需求线索组织映射列表
   * @request GET:/api/platform/demand/leadValue/deptMapping/list
   * @response `200` `LeadDeptMappingListResp` OK
   */
  export namespace PlatformDemandLeadValueDeptMappingList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = LeadDeptMappingListResp;
  }

  /**
   * No description
   * @tags 需求管理
   * @name PlatformDemandLeadValueDeptMappingSave
   * @summary 需求线索组织映射保存
   * @request POST:/api/platform/demand/leadValue/deptMapping/save
   * @response `200` `LeadDeptMappingSaveResp` OK
   */
  export namespace PlatformDemandLeadValueDeptMappingSave {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LeadDeptMappingSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = LeadDeptMappingSaveResp;
  }

  /**
   * No description
   * @tags 需求管理
   * @name PlatformDemandLeadValueLeadDetail
   * @summary 需求线索详情
   * @request GET:/api/platform/demand/leadValue/leadDetail
   * @response `200` `LeadDetailResp` OK
   */
  export namespace PlatformDemandLeadValueLeadDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 线索编码 */
      leadCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = LeadDetailResp;
  }

  /**
   * No description
   * @tags 需求管理
   * @name PlatformDemandLeadValueList
   * @summary LeadValue列表
   * @request GET:/api/platform/demand/leadValue/list
   * @response `200` `LeadValueListResp` OK
   */
  export namespace PlatformDemandLeadValueList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = LeadValueListResp;
  }

  /**
   * No description
   * @tags 需求管理
   * @name PlatformDemandLeadValueOperationLogs
   * @summary 需求线索操作日志
   * @request GET:/api/platform/demand/leadValue/operationLogs
   * @response `200` `LeadOperationLogResp` OK
   */
  export namespace PlatformDemandLeadValueOperationLogs {
    export type RequestParams = {};
    export type RequestQuery = {
      /** leadCode */
      leadCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = LeadOperationLogResp;
  }

  /**
   * No description
   * @tags 需求管理
   * @name PlatformDemandLeadValueReview
   * @summary 提交价值评审
   * @request POST:/api/platform/demand/leadValue/review
   * @response `200` `LeadReviewResp` OK
   */
  export namespace PlatformDemandLeadValueReview {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LeadReviewReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = LeadReviewResp;
  }

  /**
   * No description
   * @tags 需求管理
   * @name PlatformDemandLeadValueStartAssessment
   * @summary 发起LeadValue评估
   * @request POST:/api/platform/demand/leadValue/startAssessment
   * @response `200` `LeadValueStartAssessmentResp` OK
   */
  export namespace PlatformDemandLeadValueStartAssessment {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LeadValueStartAssessmentReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = LeadValueStartAssessmentResp;
  }

  /**
   * No description
   * @tags 需求管理
   * @name PlatformDemandLeadValueSubmitLead
   * @summary 提交需求线索
   * @request POST:/api/platform/demand/leadValue/submitLead
   * @response `200` `LeadSubmitResp` OK
   */
  export namespace PlatformDemandLeadValueSubmitLead {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LeadSubmitReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = LeadSubmitResp;
  }

  /**
   * No description
   * @tags 需求管理
   * @name PlatformDemandList
   * @summary 需求列表
   * @request GET:/api/platform/demand/list
   * @response `200` `DemandListQueryResp` OK
   */
  export namespace PlatformDemandList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DemandListQueryResp;
  }

  /**
   * No description
   * @tags 需求管理
   * @name PlatformDemandMediaList
   * @summary 品牌需求-查询媒体信息
   * @request GET:/api/platform/demand/mediaList
   * @response `200` `DemandMediaListQueryResp` OK
   */
  export namespace PlatformDemandMediaList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DemandMediaListQueryResp;
  }

  /**
   * No description
   * @tags 需求管理
   * @name PlatformDemandOperate
   * @summary 操作
   * @request POST:/api/platform/demand/operate
   * @response `200` `DemandOperateResp` OK
   */
  export namespace PlatformDemandOperate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DemandOperateReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DemandOperateResp;
  }

  /**
   * No description
   * @tags 需求管理
   * @name PlatformDemandPurchaseCategoryTree
   * @summary 综合采购分类树
   * @request GET:/api/platform/demand/purchaseCategoryTree
   * @response `200` `CategoryTreeResp` OK
   */
  export namespace PlatformDemandPurchaseCategoryTree {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CategoryTreeResp;
  }

  /**
   * No description
   * @tags 需求管理
   * @name PlatformDemandPurchaseMaterialList
   * @summary 综合采购物料列表
   * @request GET:/api/platform/demand/purchaseMaterialList
   * @response `200` `DemandPurchaseMaterialListQueryResp` OK
   */
  export namespace PlatformDemandPurchaseMaterialList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 综合采购分类编码 */
      categoryCode?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DemandPurchaseMaterialListQueryResp;
  }

  /**
   * No description
   * @tags 需求管理
   * @name PlatformDemandPurchaseNotice
   * @summary 采购需求-采购通知
   * @request POST:/api/platform/demand/purchaseNotice
   * @response `200` `DemandPurchaseNoticeResp` OK
   */
  export namespace PlatformDemandPurchaseNotice {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DemandPurchaseNoticeReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DemandPurchaseNoticeResp;
  }

  /**
   * No description
   * @tags 需求管理
   * @name PlatformDemandPurchaseOperate
   * @summary 采购需求操作
   * @request POST:/api/platform/demand/purchaseOperate
   * @response `200` `DemandPurchaseOperateResp` OK
   */
  export namespace PlatformDemandPurchaseOperate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DemandPurchaseOperateReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DemandPurchaseOperateResp;
  }

  /**
   * No description
   * @tags 需求管理
   * @name PlatformDemandPurchaseProcessStep
   * @summary 采购需求进度条
   * @request GET:/api/platform/demand/purchaseProcessStep
   * @response `200` `DemandPurchaseProcessStepResp` OK
   */
  export namespace PlatformDemandPurchaseProcessStep {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 需求编码 */
      demandCode?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DemandPurchaseProcessStepResp;
  }

  /**
   * No description
   * @tags 需求管理
   * @name PlatformDemandPurchaseStatusUpdate
   * @summary 采购需求-srm回调更新需求状态
   * @request POST:/api/platform/demand/purchaseStatusUpdate
   * @response `200` `DemandPurchaseUpdateResp` OK
   */
  export namespace PlatformDemandPurchaseStatusUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DemandPurchaseUpdateReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DemandPurchaseUpdateResp;
  }

  /**
   * No description
   * @tags 需求管理
   * @name PlatformDemandPurchaseSync
   * @summary 采购需求-采购商品信息同步(重新推送/变更操作)
   * @request POST:/api/platform/demand/purchaseSync
   * @response `200` `DemandPurchaseSyncResp` OK
   */
  export namespace PlatformDemandPurchaseSync {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DemandPurchaseSyncReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DemandPurchaseSyncResp;
  }

  /**
   * No description
   * @tags 需求管理
   * @name PlatformDemandQueryCacheDraftDemand
   * @summary 查询缓存需求草稿
   * @request GET:/api/platform/demand/queryCacheDraftDemand
   * @response `200` `DemandCacheDraftResp` OK
   */
  export namespace PlatformDemandQueryCacheDraftDemand {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 需求模块类型 */
      demandModule?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DemandCacheDraftResp;
  }

  /**
   * No description
   * @tags 需求管理
   * @name PlatformDemandQueryCategoryTree
   * @summary 获取分类树
   * @request GET:/api/platform/demand/queryCategoryTree
   * @response `200` `CategoryTreeResp` OK
   */
  export namespace PlatformDemandQueryCategoryTree {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CategoryTreeResp;
  }

  /**
   * No description
   * @tags 需求管理
   * @name PlatformDemandQueryDemandProcessStep
   * @summary 需求进度条
   * @request GET:/api/platform/demand/queryDemandProcessStep
   * @response `200` `DemandProcessStepResp` OK
   */
  export namespace PlatformDemandQueryDemandProcessStep {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 需求管理 */
      demandCode?: string;
      /** 模块名称 */
      demandModule?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DemandProcessStepResp;
  }

  /**
   * No description
   * @tags 需求管理
   * @name PlatformDemandQueryExpertTypeList
   * @summary 品牌需求-查询专家类型
   * @request POST:/api/platform/demand/queryExpertTypeList
   * @response `200` `DemandExpertTypeListQueryResp` OK
   */
  export namespace PlatformDemandQueryExpertTypeList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DemandExpertTypeListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DemandExpertTypeListQueryResp;
  }

  /**
   * No description
   * @tags 需求管理
   * @name PlatformDemandQueryMember
   * @summary 根据员工筛选类型筛选员工列表
   * @request GET:/api/platform/demand/queryMember
   * @response `200` `DemandMemberResp` OK
   */
  export namespace PlatformDemandQueryMember {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * 类型 需求创建创建人-1 采购执行人-2
       * @format int32
       */
      type?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DemandMemberResp;
  }

  /**
   * No description
   * @tags 需求管理
   * @name PlatformDemandQueryProductCnName
   * @summary 查询商品中文名和品牌
   * @request GET:/api/platform/demand/queryProductCnName
   * @response `200` `DemandBrandSelectProductResp` OK
   */
  export namespace PlatformDemandQueryProductCnName {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DemandBrandSelectProductResp;
  }

  /**
   * No description
   * @tags 需求管理
   * @name PlatformDemandQueryPurchaserList
   * @summary 采购需求采购执行人列表
   * @request GET:/api/platform/demand/queryPurchaserList
   * @response `200` `DemandMemberResp` OK
   */
  export namespace PlatformDemandQueryPurchaserList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DemandMemberResp;
  }

  /**
   * No description
   * @tags 需求管理
   * @name PlatformDemandSave
   * @summary 需求保存
   * @request POST:/api/platform/demand/save
   * @response `200` `DemandSaveResp` OK
   */
  export namespace PlatformDemandSave {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DemandSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DemandSaveResp;
  }

  /**
   * No description
   * @tags 需求管理
   * @name PlatformDemandSaveDemandPdtCategory
   * @summary 保存需求产品分类
   * @request POST:/api/platform/demand/saveDemandPdtCategory
   * @response `200` `DemandPdtCategoryResp` OK
   */
  export namespace PlatformDemandSaveDemandPdtCategory {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DemandPdtCategoryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DemandPdtCategoryResp;
  }

  /**
   * No description
   * @tags 需求管理
   * @name PlatformDemandSelectCooperList
   * @summary 合作类型下拉
   * @request GET:/api/platform/demand/selectCooperList
   * @response `200` `CommonRespDemandBrandCooperTypeResp` OK
   */
  export namespace PlatformDemandSelectCooperList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 资源类型 */
      resourceType?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespDemandBrandCooperTypeResp;
  }

  /**
   * No description
   * @tags 需求管理
   * @name PlatformDemandSrmPoCallback
   * @summary 采购需求-srm回调更新订单信息
   * @request POST:/api/platform/demand/srmPoCallback
   * @response `200` `DemandSrmPoCallbackResp` OK
   */
  export namespace PlatformDemandSrmPoCallback {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DemandSrmPoCallbackReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DemandSrmPoCallbackResp;
  }

  /**
   * No description
   * @tags 需求管理-数据统计
   * @name PlatformDemandStaticsQueryDeptStatusList
   * @summary 各部门状态需求数量统计
   * @request GET:/api/platform/demand/statics/queryDeptStatusList
   * @response `200` `DemandStatusDeptStaticsQueryResp` OK
   */
  export namespace PlatformDemandStaticsQueryDeptStatusList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DemandStatusDeptStaticsQueryResp;
  }

  /**
   * No description
   * @tags 需求管理-数据统计
   * @name PlatformDemandStaticsQueryFinishStaticsList
   * @summary 已完结情况统计
   * @request GET:/api/platform/demand/statics/queryFinishStaticsList
   * @response `200` `DemandFinishStaticsQueryResp` OK
   */
  export namespace PlatformDemandStaticsQueryFinishStaticsList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DemandFinishStaticsQueryResp;
  }

  /**
   * No description
   * @tags 需求管理-数据统计
   * @name PlatformDemandStaticsQueryMemberFinishStaticsList
   * @summary 成员已完成情况统计
   * @request GET:/api/platform/demand/statics/queryMemberFinishStaticsList
   * @response `200` `DemandFinishMemberStaticsQueryResp` OK
   */
  export namespace PlatformDemandStaticsQueryMemberFinishStaticsList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DemandFinishMemberStaticsQueryResp;
  }

  /**
   * No description
   * @tags 需求管理-数据统计
   * @name PlatformDemandStaticsQueryOntimeAvgStaticsList
   * @summary 需求平均分统计
   * @request GET:/api/platform/demand/statics/queryOntimeAvgStaticsList
   * @response `200` `DemandNeedAvgStaticsQueryResp` OK
   */
  export namespace PlatformDemandStaticsQueryOntimeAvgStaticsList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DemandNeedAvgStaticsQueryResp;
  }

  /**
   * No description
   * @tags 需求管理-数据统计
   * @name PlatformDemandStaticsQueryPersonLandStaticsList
   * @summary 个人统计-需求落地情况
   * @request GET:/api/platform/demand/statics/queryPersonLandStaticsList
   * @response `200` `DemandPersonLandStaticsQueryResp` OK
   */
  export namespace PlatformDemandStaticsQueryPersonLandStaticsList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DemandPersonLandStaticsQueryResp;
  }

  /**
   * No description
   * @tags 需求管理-数据统计
   * @name PlatformDemandStaticsQueryPersonMemberStaticsList
   * @summary 个人统计-我的需求与部门需求统计
   * @request GET:/api/platform/demand/statics/queryPersonMemberStaticsList
   * @response `200` `DemandPersonMemberStaticsQueryResp` OK
   */
  export namespace PlatformDemandStaticsQueryPersonMemberStaticsList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DemandPersonMemberStaticsQueryResp;
  }

  /**
   * No description
   * @tags 需求管理-数据统计
   * @name PlatformDemandStaticsQueryPersonMemberStatusStaticsList
   * @summary 个人统计-我的需求
   * @request GET:/api/platform/demand/statics/queryPersonMemberStatusStaticsList
   * @response `200` `DemandStatusPersonStaticsQueryResp` OK
   */
  export namespace PlatformDemandStaticsQueryPersonMemberStatusStaticsList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DemandStatusPersonStaticsQueryResp;
  }

  /**
   * No description
   * @tags 需求管理-数据统计
   * @name PlatformDemandStaticsQueryPersonOnTimeStaticsList
   * @summary 个人统计-及时率
   * @request GET:/api/platform/demand/statics/queryPersonOnTimeStaticsList
   * @response `200` `DemandPersonOnTimeStaticsQueryResp` OK
   */
  export namespace PlatformDemandStaticsQueryPersonOnTimeStaticsList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DemandPersonOnTimeStaticsQueryResp;
  }

  /**
   * No description
   * @tags 需求管理-数据统计
   * @name PlatformDemandStaticsQueryPersonScoreStaticsList
   * @summary 个人统计-需求评分情况
   * @request GET:/api/platform/demand/statics/queryPersonScoreStaticsList
   * @response `200` `DemandPersonScoreStaticsQueryResp` OK
   */
  export namespace PlatformDemandStaticsQueryPersonScoreStaticsList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DemandPersonScoreStaticsQueryResp;
  }

  /**
   * No description
   * @tags 需求管理-数据统计
   * @name PlatformDemandStaticsQueryProductStatusList
   * @summary 各品线状态需求数量统计
   * @request GET:/api/platform/demand/statics/queryProductStatusList
   * @response `200` `DemandProductLineStatusStaticsQueryResp` OK
   */
  export namespace PlatformDemandStaticsQueryProductStatusList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DemandProductLineStatusStaticsQueryResp;
  }

  /**
   * No description
   * @tags 需求管理-数据统计
   * @name PlatformDemandStaticsQueryStatusList
   * @summary 各状态需求数量统计
   * @request GET:/api/platform/demand/statics/queryStatusList
   * @response `200` `DemandStatusStaticsQueryResp` OK
   */
  export namespace PlatformDemandStaticsQueryStatusList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DemandStatusStaticsQueryResp;
  }

  /**
   * No description
   * @tags 需求管理
   * @name PlatformDemandStatusCount
   * @summary 需求状态统计
   * @request GET:/api/platform/demand/statusCount
   * @response `200` `DemandStatusCountResp` OK
   */
  export namespace PlatformDemandStatusCount {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 需求模块 用研需求-user_research IT需求-it */
      demandModule: string;
      /** 菜单标识  */
      menuTag?: string;
      /**
       * 判断是需求提交管理端还是执行管理端 0-提交管理端 1-执行管理端
       * @format int32
       */
      submitManageFlag?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DemandStatusCountResp;
  }

  /**
   * No description
   * @tags 需求管理
   * @name PlatformDemandV2List
   * @summary 需求列表-POST请求
   * @request POST:/api/platform/demand/v2/list
   * @response `200` `DemandListQueryResp` OK
   */
  export namespace PlatformDemandV2List {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DemandListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DemandListQueryResp;
  }

  /**
   * No description
   * @tags 桌面管理模块
   * @name PlatformDesktopAllNotifyLabel
   * @summary 所有通知分类信息
   * @request GET:/api/platform/desktop/allNotifyLabel
   * @response `200` `NotifyAllLabelResp` OK
   */
  export namespace PlatformDesktopAllNotifyLabel {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = NotifyAllLabelResp;
  }

  /**
   * No description
   * @tags 桌面管理模块
   * @name PlatformDesktopIfNewNotify
   * @summary 获取是否有新通知
   * @request GET:/api/platform/desktop/ifNewNotify
   * @response `200` `IfNewNotifyResp` OK
   */
  export namespace PlatformDesktopIfNewNotify {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * 上次查看通知时间
       * @example "2025-05-01 00:00:00"
       */
      lastViewTime?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = IfNewNotifyResp;
  }

  /**
   * No description
   * @tags 桌面管理模块
   * @name PlatformDesktopNotifyReport
   * @summary 通知操作上报
   * @request POST:/api/platform/desktop/notifyReport
   * @response `200` `CommonRespObject` OK
   */
  export namespace PlatformDesktopNotifyReport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = NotifyReportReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags 桌面管理模块
   * @name PlatformDesktopOperateDesktopNotify
   * @summary 操作桌面通知消息
   * @request POST:/api/platform/desktop/operateDesktopNotify
   * @response `200` `CommonRespObject` OK
   */
  export namespace PlatformDesktopOperateDesktopNotify {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DesktopReportReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags 桌面管理模块
   * @name PlatformDesktopQueryNotifyInfoList
   * @summary 查询桌面助手通知消息
   * @request GET:/api/platform/desktop/queryNotifyInfoList
   * @response `200` `DesktopNotifyListResp` OK
   */
  export namespace PlatformDesktopQueryNotifyInfoList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** ip地址 */
      ipAddr?: string;
      /**
       * 状态 1-启动 0-关闭 默认启动
       * @format int32
       */
      status: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DesktopNotifyListResp;
  }

  /**
   * No description
   * @tags 桌面管理模块
   * @name PlatformDesktopSseClose
   * @summary sse断开连接
   * @request GET:/api/platform/desktop/sse/close/{memberCode}
   * @response `200` `CommonRespVoid` OK
   */
  export namespace PlatformDesktopSseClose {
    export type RequestParams = {
      /** memberCode */
      memberCode: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespVoid;
  }

  /**
   * No description
   * @tags 桌面管理模块
   * @name PlatformDesktopSseSubscribe
   * @summary sse建立连接
   * @request GET:/api/platform/desktop/sse/subscribe/{memberCode}
   * @response `200` `SseEmitter` OK
   */
  export namespace PlatformDesktopSseSubscribe {
    export type RequestParams = {
      /** memberCode */
      memberCode: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SseEmitter;
  }

  /**
   * No description
   * @tags 桌面管理模块
   * @name PlatformDesktopUserNotifyDetail
   * @summary 用户通知详情
   * @request GET:/api/platform/desktop/userNotifyDetail
   * @response `200` `UserNotifyDetailBean` OK
   */
  export namespace PlatformDesktopUserNotifyDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 通知编码 */
      notifyCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = UserNotifyDetailBean;
  }

  /**
   * No description
   * @tags 桌面管理模块
   * @name PlatformDesktopUserNotifyList
   * @summary 用户通知列表
   * @request GET:/api/platform/desktop/userNotifyList
   * @response `200` `UserNotifyListResp` OK
   */
  export namespace PlatformDesktopUserNotifyList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = UserNotifyListResp;
  }

  /**
   * No description
   * @tags 字典管理, 平台模块
   * @name PlatformDict
   * @summary 字典查询-common
   * @request POST:/api/platform/dict
   * @response `200` `DictQueryResp` OK
   */
  export namespace PlatformDict {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DictQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DictQueryResp;
  }

  /**
   * No description
   * @tags 字典管理
   * @name PlatformDictDelete
   * @summary 删除字典
   * @request POST:/api/platform/dict/delete
   * @response `200` `CommonRespObject` OK
   */
  export namespace PlatformDictDelete {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DictDeleteReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags 字典管理
   * @name PlatformDictQueryDictByModule
   * @summary 某个模块-字典列表
   * @request GET:/api/platform/dict/queryDictByModule
   * @response `200` `CommonRespObject` OK
   */
  export namespace PlatformDictQueryDictByModule {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DictQueryListSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags 字典管理
   * @name PlatformDictQueryDictDetail
   * @summary 字典详情查询
   * @request POST:/api/platform/dict/queryDictDetail
   * @response `200` `DictQuerySingleResp` OK
   */
  export namespace PlatformDictQueryDictDetail {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DictQueryDetailQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DictQuerySingleResp;
  }

  /**
   * No description
   * @tags 字典管理
   * @name PlatformDictQueryDictModuleList
   * @summary 字典模块列表
   * @request GET:/api/platform/dict/queryDictModuleList
   * @response `200` `DictModuleListResp` OK
   */
  export namespace PlatformDictQueryDictModuleList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DictModuleListResp;
  }

  /**
   * No description
   * @tags 字典管理
   * @name PlatformDictQueryPage
   * @summary 字典分页查询
   * @request POST:/api/platform/dict/queryPage
   * @response `200` `DictQueryPageResp` OK
   */
  export namespace PlatformDictQueryPage {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DictModuleQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DictQueryPageResp;
  }

  /**
   * No description
   * @tags 字典管理
   * @name PlatformDictSave
   * @summary 字典保存/编辑
   * @request POST:/api/platform/dict/save
   * @response `200` `CommonRespObject` OK
   */
  export namespace PlatformDictSave {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DictSaveOrUpdateReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags 字典管理, 平台模块
   * @name PlatformDictSaveBatch
   * @summary 字典保存-common
   * @request POST:/api/platform/dict/saveBatch
   * @response `200` `DictQueryResp` OK
   */
  export namespace PlatformDictSaveBatch {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DictQueryListSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DictQueryResp;
  }

  /**
   * No description
   * @tags 字典管理, 平台模块
   * @name PlatformDictDisableAuth
   * @summary 字典查询-common
   * @request POST:/api/platform/dictDisableAuth
   * @response `200` `DictQueryResp` OK
   */
  export namespace PlatformDictDisableAuth {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DictQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DictQueryResp;
  }

  /**
   * No description
   * @tags OA能效模块
   * @name PlatformEntertainExportEntertain
   * @summary 导出对外招待申请
   * @request POST:/api/platform/entertain/exportEntertain
   * @response `200` `CommonExportResp` OK
   */
  export namespace PlatformEntertainExportEntertain {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = EntertainQueryReq;
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
   * @tags OA能效模块
   * @name PlatformEntertainQueryConflictList
   * @summary 会议冲突员工列表
   * @request POST:/api/platform/entertain/queryConflictList
   * @response `200` `EntertainConflictResp` OK
   */
  export namespace PlatformEntertainQueryConflictList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = EntertainConflictReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = EntertainConflictResp;
  }

  /**
   * No description
   * @tags OA能效模块
   * @name PlatformEntertainQueryEntertainList
   * @summary 对外招待申请列表
   * @request POST:/api/platform/entertain/queryEntertainList
   * @response `200` `EntertainQueryResp` OK
   */
  export namespace PlatformEntertainQueryEntertainList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = EntertainQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = EntertainQueryResp;
  }

  /**
   * No description
   * @tags OA能效模块
   * @name PlatformEntertainSaveEntertain
   * @summary 保存对外招待申请
   * @request POST:/api/platform/entertain/saveEntertain
   * @response `200` `EntertainSaveResp` OK
   */
  export namespace PlatformEntertainSaveEntertain {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = EntertainSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = EntertainSaveResp;
  }

  /**
   * No description
   * @tags 平台模块
   * @name PlatformExportPlatformLogList
   * @summary 平台日志导出
   * @request GET:/api/platform/exportPlatformLogList
   * @response `200` `CommonExportResp` OK
   */
  export namespace PlatformExportPlatformLogList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlatformLogReq;
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
   * @tags 反馈管理模块
   * @name PlatformFeedbackOperateFeedback
   * @summary 操作问卷反馈
   * @request POST:/api/platform/feedback/operateFeedback
   * @response `200` `FeedbackOperateResp` OK
   */
  export namespace PlatformFeedbackOperateFeedback {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FeedbackOperateReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = FeedbackOperateResp;
  }

  /**
   * No description
   * @tags 反馈管理模块
   * @name PlatformFeedbackQueryList
   * @summary 调查列表查询
   * @request GET:/api/platform/feedback/queryList
   * @response `200` `FeedbackListResp` OK
   */
  export namespace PlatformFeedbackQueryList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = FeedbackListResp;
  }

  /**
   * No description
   * @tags 反馈管理模块
   * @name PlatformFeedbackQueryMenuList
   * @summary 投放页面筛选查询
   * @request GET:/api/platform/feedback/queryMenuList
   * @response `200` `FeedbackMenuResp` OK
   */
  export namespace PlatformFeedbackQueryMenuList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = FeedbackMenuResp;
  }

  /**
   * No description
   * @tags 反馈管理模块
   * @name PlatformFeedbackQueryRecordList
   * @summary 调查详情列表查询
   * @request GET:/api/platform/feedback/queryRecordList
   * @response `200` `FeedbackRecordListResp` OK
   */
  export namespace PlatformFeedbackQueryRecordList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = FeedbackRecordListResp;
  }

  /**
   * No description
   * @tags 反馈管理模块
   * @name PlatformFeedbackQueryTemplate
   * @summary 调查反馈路由查询
   * @request GET:/api/platform/feedback/queryTemplate
   * @response `200` `FeedbackDetailResp` OK
   */
  export namespace PlatformFeedbackQueryTemplate {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 模块 例如：红人营销-meta */
      module?: string;
      /** 路由 */
      route?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = FeedbackDetailResp;
  }

  /**
   * No description
   * @tags 反馈管理模块
   * @name PlatformFeedbackSave
   * @summary 保存系统反馈
   * @request POST:/api/platform/feedback/save
   * @response `200` `FeedbackSaveResp` OK
   */
  export namespace PlatformFeedbackSave {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FeedbackSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = FeedbackSaveResp;
  }

  /**
   * No description
   * @tags 平台模块, 文件管理
   * @name PlatformFileRecordQueryFileRecordList
   * @summary 导入导出记录查询
   * @request GET:/api/platform/fileRecord/queryFileRecordList
   * @response `200` `FileRecordListQueryResp` OK
   */
  export namespace PlatformFileRecordQueryFileRecordList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = FileRecordListQueryResp;
  }

  /**
   * No description
   * @tags 审核管理
   * @name PlatformFlowChangeStatus
   * @summary 变更状态
   * @request POST:/api/platform/flow/changeStatus
   * @response `200` `CommonRespVoid` OK
   */
  export namespace PlatformFlowChangeStatus {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FlowChangeStatusReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespVoid;
  }

  /**
   * No description
   * @tags 审核管理
   * @name PlatformFlowQueryDetail
   * @summary 详情
   * @request GET:/api/platform/flow/queryDetail
   * @response `200` `FlowDetailQueryResp` OK
   */
  export namespace PlatformFlowQueryDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 审批流编码 */
      code?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = FlowDetailQueryResp;
  }

  /**
   * No description
   * @tags 审核管理
   * @name PlatformFlowQueryList
   * @summary 列表查询
   * @request POST:/api/platform/flow/queryList
   * @response `200` `FlowListQueryResp` OK
   */
  export namespace PlatformFlowQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FlowListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = FlowListQueryResp;
  }

  /**
   * No description
   * @tags 审核管理
   * @name PlatformFlowQueryTemplate
   * @summary 模板查询
   * @request GET:/api/platform/flow/queryTemplate
   * @response `200` `FlowTemplateResp` OK
   */
  export namespace PlatformFlowQueryTemplate {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * 类型：101-用研需求管理
       * @format int32
       */
      type?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = FlowTemplateResp;
  }

  /**
   * No description
   * @tags 审核管理
   * @name PlatformFlowSaveOrUpdate
   * @summary 新增/更新
   * @request POST:/api/platform/flow/saveOrUpdate
   * @response `200` `CommonRespString` OK
   */
  export namespace PlatformFlowSaveOrUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FlowSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespString;
  }

  /**
   * No description
   * @tags 首页
   * @name PlatformHomepageSalesDaily
   * @summary 销售日报
   * @request GET:/api/platform/homepage/salesDaily
   * @response `200` `SalesTendencyChartResp` OK
   */
  export namespace PlatformHomepageSalesDaily {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SalesTendencyChartResp;
  }

  /**
   * No description
   * @tags 平台模块, 标签管理
   * @name PlatformLabelCategoryQueryTree
   * @summary 标签分类树查询
   * @request POST:/api/platform/label/category/queryTree
   * @response `200` `LabelCategoryTreeQueryResp` OK
   */
  export namespace PlatformLabelCategoryQueryTree {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LabelCategoryTreeQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = LabelCategoryTreeQueryResp;
  }

  /**
   * No description
   * @tags 平台模块, 标签管理
   * @name PlatformLabelDeleteLabelInfo
   * @summary 删除标签信息
   * @request POST:/api/platform/label/deleteLabelInfo
   * @response `200` `CommonRespObject` OK
   */
  export namespace PlatformLabelDeleteLabelInfo {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LabelDeleteReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags 平台模块, 标签管理
   * @name PlatformLabelQueryLabelAllList
   * @summary 标签列表多级一次性查询
   * @request GET:/api/platform/label/queryLabelAllList
   * @response `200` `LabelListQueryResp` OK
   */
  export namespace PlatformLabelQueryLabelAllList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 标签模块 折扣码标识 mark_tag */
      module?: string;
      /**
       * 红人业务参数-类型： 默认1查全部，0-排除已废弃、关停中
       * @format int32
       */
      type?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = LabelListQueryResp;
  }

  /**
   * No description
   * @tags 平台模块, 标签管理
   * @name PlatformLabelQueryLabelList
   * @summary 标签列表查询
   * @request GET:/api/platform/label/queryLabelList
   * @response `200` `LabelListQueryResp` OK
   */
  export namespace PlatformLabelQueryLabelList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = LabelListQueryResp;
  }

  /**
   * No description
   * @tags 平台模块, 标签管理
   * @name PlatformLabelSaveLabelInfo
   * @summary 保存标签信息
   * @request POST:/api/platform/label/saveLabelInfo
   * @response `200` `LabelSaveResp` OK
   */
  export namespace PlatformLabelSaveLabelInfo {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LabelSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = LabelSaveResp;
  }

  /**
   * No description
   * @tags 平台模块, 标签管理
   * @name PlatformLabelSaveLabelInfoMulti
   * @summary 保存多级标签信息
   * @request POST:/api/platform/label/saveLabelInfo/multi
   * @response `200` `CommonRespBoolean` OK
   */
  export namespace PlatformLabelSaveLabelInfoMulti {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LabelSaveMultiReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespBoolean;
  }

  /**
   * No description
   * @tags 映射管理
   * @name PlatformMappingChangeStatus
   * @summary 变更状态
   * @request POST:/api/platform/mapping/changeStatus
   * @response `200` `CommonRespVoid` OK
   */
  export namespace PlatformMappingChangeStatus {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlatformMappingChangeStatusReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespVoid;
  }

  /**
   * No description
   * @tags 映射管理
   * @name PlatformMappingDeleted
   * @summary 删除映射
   * @request POST:/api/platform/mapping/deleted
   * @response `200` `CommonRespVoid` OK
   */
  export namespace PlatformMappingDeleted {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlatformMappingDeletedReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespVoid;
  }

  /**
   * No description
   * @tags 映射管理
   * @name PlatformMappingExportQueryList
   * @summary 查询列表导出(参数同查询列表)
   * @request POST:/api/platform/mapping/export/queryList
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace PlatformMappingExportQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlatformMappingListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespCommonExportResp;
  }

  /**
   * No description
   * @tags 映射管理
   * @name PlatformMappingQueryList
   * @summary 查询列表
   * @request POST:/api/platform/mapping/queryList
   * @response `200` `PlatformMappingListResp` OK
   */
  export namespace PlatformMappingQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlatformMappingListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PlatformMappingListResp;
  }

  /**
   * No description
   * @tags 映射管理
   * @name PlatformMappingQueryTargetEnums
   * @summary 查询映射枚举
   * @request GET:/api/platform/mapping/queryTargetEnums
   * @response `200` `(string)[]` OK
   */
  export namespace PlatformMappingQueryTargetEnums {
    export type RequestParams = {};
    export type RequestQuery = {
      /** mappingCode */
      mappingCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = string[];
  }

  /**
   * No description
   * @tags 映射管理
   * @name PlatformMappingSaveOrUpdate
   * @summary 新增或者更新
   * @request POST:/api/platform/mapping/saveOrUpdate
   * @response `200` `CommonRespVoid` OK
   */
  export namespace PlatformMappingSaveOrUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlatformMappingSaveOrUpdateReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespVoid;
  }

  /**
   * No description
   * @tags 智能会议模块
   * @name PlatformMeetingChangeDeviceStatus
   * @summary 会议室-设备开关
   * @request POST:/api/platform/meeting/changeDeviceStatus
   * @response `200` `CommonRespObject` OK
   */
  export namespace PlatformMeetingChangeDeviceStatus {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SmartMeetingRoomDeviceChangeReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags 智能会议模块
   * @name PlatformMeetingDeleteMeetingRoomDevice
   * @summary 会议室-删除设备
   * @request POST:/api/platform/meeting/deleteMeetingRoomDevice
   * @response `200` `CommonRespObject` OK
   */
  export namespace PlatformMeetingDeleteMeetingRoomDevice {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SmartMeetingRoomDeviceSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags 智能会议模块
   * @name PlatformMeetingQueryRoomDeviceList
   * @summary 会议室-设备明细列表
   * @request GET:/api/platform/meeting/queryRoomDeviceList
   * @response `200` `SmartMeetingRoomDeviceResp` OK
   */
  export namespace PlatformMeetingQueryRoomDeviceList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SmartMeetingRoomDeviceResp;
  }

  /**
   * No description
   * @tags 智能会议模块
   * @name PlatformMeetingQueryRoomDeviceSelectList
   * @summary 会议室-设备下拉列表
   * @request GET:/api/platform/meeting/queryRoomDeviceSelectList
   * @response `200` `SmartMeetingQueryRoomDeviceResp` OK
   */
  export namespace PlatformMeetingQueryRoomDeviceSelectList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SmartMeetingQueryRoomDeviceResp;
  }

  /**
   * No description
   * @tags 智能会议模块
   * @name PlatformMeetingQueryRoomList
   * @summary 会议室-列表
   * @request GET:/api/platform/meeting/queryRoomList
   * @response `200` `SmartMeetingRoomResp` OK
   */
  export namespace PlatformMeetingQueryRoomList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SmartMeetingRoomResp;
  }

  /**
   * No description
   * @tags 智能会议模块
   * @name PlatformMeetingSaveMeetingRoomDevice
   * @summary 会议室-添加设备
   * @request POST:/api/platform/meeting/saveMeetingRoomDevice
   * @response `200` `CommonRespObject` OK
   */
  export namespace PlatformMeetingSaveMeetingRoomDevice {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SmartMeetingRoomDeviceSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags OA能效模块
   * @name PlatformMeetingRoomQueryMeetingRoomList
   * @summary 会议室列表
   * @request GET:/api/platform/meetingRoom/queryMeetingRoomList
   * @response `200` `MeetingRoomResp` OK
   */
  export namespace PlatformMeetingRoomQueryMeetingRoomList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MeetingRoomResp;
  }

  /**
   * No description
   * @tags 平台资源模块, 菜单管理
   * @name PlatformMenuOperateMenu
   * @summary 操作菜单
   * @request POST:/api/platform/menu/operateMenu
   * @response `200` `MenuOperateResp` OK
   */
  export namespace PlatformMenuOperateMenu {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MenuOperateReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MenuOperateResp;
  }

  /**
   * No description
   * @tags 平台资源模块, 菜单管理
   * @name PlatformMenuQueryMenuDetail
   * @summary 菜单详情
   * @request GET:/api/platform/menu/queryMenuDetail
   * @response `200` `MenuDetailQueryResp` OK
   */
  export namespace PlatformMenuQueryMenuDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 菜单编码 */
      menuCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MenuDetailQueryResp;
  }

  /**
   * No description
   * @tags 平台资源模块, 菜单管理
   * @name PlatformMenuQueryMenuTree
   * @summary 获取菜单树结构
   * @request GET:/api/platform/menu/queryMenuTree
   * @response `200` `MenuTreeQueryResp` OK
   */
  export namespace PlatformMenuQueryMenuTree {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MenuTreeQueryResp;
  }

  /**
   * No description
   * @tags 平台资源模块, 菜单管理
   * @name PlatformMenuSaveMenu
   * @summary 保存菜单
   * @request POST:/api/platform/menu/saveMenu
   * @response `200` `MenuSaveResp` OK
   */
  export namespace PlatformMenuSaveMenu {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MenuSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MenuSaveResp;
  }

  /**
   * No description
   * @tags 平台模块, 文件管理
   * @name PlatformOssQueryOssPublicPolicy
   * @summary 通用 - 获取OSS公有授权
   * @request GET:/api/platform/oss/queryOssPublicPolicy
   * @response `200` `AliyunTempPolicyResp` OK
   */
  export namespace PlatformOssQueryOssPublicPolicy {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 文件目录 分类别区分(前后端约定), etc. 细分路径用/分隔 */
      directory: string;
      /** 文件名 带后缀 */
      filename: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = AliyunTempPolicyResp;
  }

  /**
   * No description
   * @tags 平台模块, 文件管理
   * @name PlatformOssQueryOssTempPolicy
   * @summary 通用 - 获取OSS临时授权
   * @request GET:/api/platform/oss/queryOssTempPolicy
   * @response `200` `AliyunTempMorePolicyResp` OK
   */
  export namespace PlatformOssQueryOssTempPolicy {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 文件目录 分类别区分(前后端约定), etc. 细分路径用/分隔 */
      directory: string;
      /** 文件名 带后缀 */
      filename: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = AliyunTempMorePolicyResp;
  }

  /**
   * No description
   * @tags 平台模块, 文件管理
   * @name PlatformOssUploadToTempOss
   * @summary 通用 - 上传文件到OSS临时桶
   * @request POST:/api/platform/oss/uploadToTempOss
   * @response `200` `CommonRespString` OK
   */
  export namespace PlatformOssUploadToTempOss {
    export type RequestParams = {};
    export type RequestQuery = {
      /** directory */
      directory: string;
    };
    export type RequestBody = File;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespString;
  }

  /**
   * No description
   * @tags 平台模块
   * @name PlatformProvinceQueryProvinceInfoList
   * @summary 省份下拉列表查询
   * @request GET:/api/platform/province/queryProvinceInfoList
   * @response `200` `ProvinceInfoListQueryResp` OK
   */
  export namespace PlatformProvinceQueryProvinceInfoList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 国家编码 */
      countryCode: string;
      /** 关键词 */
      keyword?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ProvinceInfoListQueryResp;
  }

  /**
   * No description
   * @tags 平台模块
   * @name PlatformQueryCommonDept
   * @summary 获取部门树结构/排列结构
   * @request POST:/api/platform/queryCommonDept
   * @response `200` `DeptInfoResp` OK
   */
  export namespace PlatformQueryCommonDept {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DeptInfoResp;
  }

  /**
   * No description
   * @tags 平台模块, 标签管理
   * @name PlatformQueryLabelModelList
   * @summary 标签模块查询
   * @request GET:/api/platform/queryLabelModelList
   * @response `200` `LabelModelResp` OK
   */
  export namespace PlatformQueryLabelModelList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = LabelModelResp;
  }

  /**
   * No description
   * @tags 平台模块
   * @name PlatformQueryLog
   * @summary 日志查询
   * @request GET:/api/platform/queryLog
   * @response `200` `OperationLogResp` OK
   */
  export namespace PlatformQueryLog {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = OperationLogResp;
  }

  /**
   * No description
   * @tags 平台模块
   * @name PlatformQueryPlatformLogList
   * @summary 平台日志查询
   * @request GET:/api/platform/queryPlatformLogList
   * @response `200` `PlatformLogResp` OK
   */
  export namespace PlatformQueryPlatformLogList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PlatformLogResp;
  }

  /**
   * No description
   * @tags oss模块, 平台模块
   * @name PlatformQueryUrl
   * @summary oss文件路径查询
   * @request GET:/api/platform/queryUrl
   * @response `200` `OssQueryResp` OK
   */
  export namespace PlatformQueryUrl {
    export type RequestParams = {};
    export type RequestQuery = {
      /** ossKey */
      ossKey: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = OssQueryResp;
  }

  /**
   * No description
   * @tags 平台模块
   * @name PlatformRefresh
   * @summary 业务模块-手动刷新
   * @request POST:/api/platform/refresh
   * @deprecated
   * @response `200` `CommonRespBoolean` OK
   */
  export namespace PlatformRefresh {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ModelRefreshReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespBoolean;
  }

  /**
   * No description
   * @tags 行政区划模块
   * @name PlatformRegionQueryAllProvinceList
   * @summary 查询省
   * @request GET:/api/platform/region/queryAllProvinceList
   * @response `200` `RegionQueryResp` OK
   */
  export namespace PlatformRegionQueryAllProvinceList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = RegionQueryResp;
  }

  /**
   * No description
   * @tags 行政区划模块
   * @name PlatformRegionQueryAreaList
   * @summary 查询区/县
   * @request GET:/api/platform/region/queryAreaList
   * @response `200` `RegionQueryResp` OK
   */
  export namespace PlatformRegionQueryAreaList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 区/县编码 */
      cityCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = RegionQueryResp;
  }

  /**
   * No description
   * @tags 行政区划模块
   * @name PlatformRegionQueryCityList
   * @summary 查询市
   * @request GET:/api/platform/region/queryCityList
   * @response `200` `RegionQueryResp` OK
   */
  export namespace PlatformRegionQueryCityList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 省份编码 */
      provinceCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = RegionQueryResp;
  }

  /**
   * No description
   * @tags 平台资源模块, 角色管理
   * @name PlatformRoleAuth
   * @summary 角色权限
   * @request GET:/api/platform/role/auth
   * @response `200` `CommonRespBoolean` OK
   */
  export namespace PlatformRoleAuth {
    export type RequestParams = {};
    export type RequestQuery = {
      /** roleCode */
      roleCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespBoolean;
  }

  /**
   * No description
   * @tags 平台资源模块, 角色管理
   * @name PlatformRoleOperate
   * @summary 角色操作
   * @request POST:/api/platform/role/operate
   * @response `200` `CommonRespVoid` OK
   */
  export namespace PlatformRoleOperate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = RoleOperateReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespVoid;
  }

  /**
   * No description
   * @tags 平台资源模块, 角色管理
   * @name PlatformRoleQueryDetail
   * @summary 角色详情
   * @request GET:/api/platform/role/queryDetail
   * @response `200` `RoleDetailResp` OK
   */
  export namespace PlatformRoleQueryDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 角色编码 */
      roleCode?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = RoleDetailResp;
  }

  /**
   * No description
   * @tags 平台资源模块, 角色管理
   * @name PlatformRoleQueryMenu
   * @summary 角色菜单详情
   * @request GET:/api/platform/role/queryMenu
   * @response `200` `RoleMenuTreeQueryResp` OK
   */
  export namespace PlatformRoleQueryMenu {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * platform
       * @default "lute_os"
       */
      platform?: string;
      /** roleCode */
      roleCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = RoleMenuTreeQueryResp;
  }

  /**
   * No description
   * @tags 平台资源模块, 角色管理
   * @name PlatformRoleQueryRoleAccount
   * @summary 角色账号查询
   * @request GET:/api/platform/role/queryRoleAccount
   * @response `200` `RoleAccountResp` OK
   */
  export namespace PlatformRoleQueryRoleAccount {
    export type RequestParams = {};
    export type RequestQuery = {
      /** roleCode */
      roleCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = RoleAccountResp;
  }

  /**
   * No description
   * @tags 平台资源模块, 角色管理
   * @name PlatformRoleQueryRoleList
   * @summary 角色列表查询
   * @request GET:/api/platform/role/queryRoleList
   * @response `200` `RoleListQueryResp` OK
   */
  export namespace PlatformRoleQueryRoleList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 平台 */
      platform?: string;
      /** 角色编号 */
      roleCode?: string;
      /** 角色名字 模糊搜索 */
      roleName?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = RoleListQueryResp;
  }

  /**
   * No description
   * @tags 平台资源模块, 角色管理
   * @name PlatformRoleQueryRoleListV2
   * @summary 角色列表查询V2
   * @request GET:/api/platform/role/queryRoleListV2
   * @response `200` `RoleListQueryPageResp` OK
   */
  export namespace PlatformRoleQueryRoleListV2 {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = RoleListQueryPageResp;
  }

  /**
   * No description
   * @tags 平台资源模块, 角色管理
   * @name PlatformRoleRemoveRole
   * @summary 删除角色
   * @request POST:/api/platform/role/removeRole
   * @response `200` `CommonRespVoid` OK
   */
  export namespace PlatformRoleRemoveRole {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = RoleRemoveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespVoid;
  }

  /**
   * No description
   * @tags 平台资源模块, 角色管理
   * @name PlatformRoleResourceMapping
   * @summary 角色资源映射
   * @request POST:/api/platform/role/resourceMapping
   * @response `200` `CommonRespVoid` OK
   */
  export namespace PlatformRoleResourceMapping {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlatformRoleResourceSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespVoid;
  }

  /**
   * No description
   * @tags 平台资源模块, 角色管理
   * @name PlatformRoleSaveRole
   * @summary 保存角色
   * @request POST:/api/platform/role/saveRole
   * @response `200` `RoleSaveResp` OK
   */
  export namespace PlatformRoleSaveRole {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = RoleSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = RoleSaveResp;
  }

  /**
   * No description
   * @tags 平台资源模块, 角色管理
   * @name PlatformRoleSaveRoleAccount
   * @summary 角色账号保存
   * @request POST:/api/platform/role/saveRoleAccount
   * @response `200` `CommonResp` OK
   */
  export namespace PlatformRoleSaveRoleAccount {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = RoleAccountSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonResp;
  }

  /**
   * No description
   * @tags 平台资源模块, 角色管理
   * @name PlatformRoleSaveRoleMenu
   * @summary 角色菜单保存
   * @request POST:/api/platform/role/saveRoleMenu
   * @response `200` `RoleSaveResp` OK
   */
  export namespace PlatformRoleSaveRoleMenu {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = RoleMenuSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = RoleSaveResp;
  }

  /**
   * No description
   * @tags 平台模块, 标签管理
   * @name PlatformSaveLabelModel
   * @summary 标签模块保存
   * @request POST:/api/platform/saveLabelModel
   * @response `200` `LabelModelSaveResp` OK
   */
  export namespace PlatformSaveLabelModel {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LabelModelSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = LabelModelSaveResp;
  }

  /**
   * No description
   * @tags 平台模块
   * @name PlatformSaveLog
   * @summary 保存日志
   * @request POST:/api/platform/saveLog
   * @response `200` `CommonRespVoid` OK
   */
  export namespace PlatformSaveLog {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OperationLogSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespVoid;
  }

  /**
   * No description
   * @tags 用户搜索模块
   * @name PlatformSearchOperateCondition
   * @summary 操作搜索条件
   * @request DELETE:/api/platform/search/operateCondition
   * @response `200` `void` OK
   */
  export namespace PlatformSearchOperateCondition {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CommonOperateReq;
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
   * @tags 用户搜索模块
   * @name PlatformSearchQueryConditionList
   * @summary 搜索条件列表查询（当前用户）
   * @request GET:/api/platform/search/queryConditionList
   * @response `200` `SearchConditionListQueryResp` OK
   */
  export namespace PlatformSearchQueryConditionList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SearchConditionListQueryResp;
  }

  /**
   * No description
   * @tags 用户搜索模块
   * @name PlatformSearchSaveCondition
   * @summary 保存搜索条件
   * @request POST:/api/platform/search/saveCondition
   * @response `200` `SearchConditionSaveResp` OK
   */
  export namespace PlatformSearchSaveCondition {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SearchConditionSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SearchConditionSaveResp;
  }

  /**
   * No description
   * @tags 平台模块
   * @name PlatformSiteQuerySiteList
   * @summary 站点信息列表查询
   * @request GET:/api/platform/site/querySiteList
   * @response `200` `SiteListQueryResp` OK
   */
  export namespace PlatformSiteQuerySiteList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SiteListQueryResp;
  }

  /**
   * No description
   * @tags 平台模块
   * @name PlatformSiteInfo
   * @summary 获取站点列表
   * @request GET:/api/platform/siteInfo
   * @response `200` `SiteInfoDesp` OK
   */
  export namespace PlatformSiteInfo {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SiteInfoDesp;
  }

  /**
   * No description
   * @tags 平台模块, 系统配置
   * @name PlatformSystemQuerySystemConfig
   * @summary 系统配置查询
   * @request GET:/api/platform/system/querySystemConfig
   * @response `200` `void` OK
   */
  export namespace PlatformSystemQuerySystemConfig {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
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
   * @tags 平台模块, 系统配置
   * @name PlatformSystemSaveSystemConfig
   * @summary 保存系统配置
   * @request POST:/api/platform/system/saveSystemConfig
   * @response `200` `void` OK
   */
  export namespace PlatformSystemSaveSystemConfig {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
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
   * @tags 任务管理
   * @name PlatformTaskAddCategory
   * @summary 新增任务分类
   * @request POST:/api/platform/task/addCategory
   * @response `200` `TaskCategorySaveResp` OK
   */
  export namespace PlatformTaskAddCategory {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TaskCategorySaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = TaskCategorySaveResp;
  }

  /**
   * No description
   * @tags 任务管理
   * @name PlatformTaskChange
   * @summary 任务变更
   * @request POST:/api/platform/task/change
   * @response `200` `CommonRespVoid` OK
   */
  export namespace PlatformTaskChange {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TaskChangeReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespVoid;
  }

  /**
   * No description
   * @tags 任务管理
   * @name PlatformTaskChangeDetail
   * @summary 任务变更详情
   * @request GET:/api/platform/task/changeDetail
   * @response `200` `TaskChangeDetailResp` OK
   */
  export namespace PlatformTaskChangeDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 任务编码 */
      taskCode?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = TaskChangeDetailResp;
  }

  /**
   * No description
   * @tags 任务管理
   * @name PlatformTaskDetail
   * @summary 任务详情
   * @request GET:/api/platform/task/detail
   * @response `200` `TaskDetailResp` OK
   */
  export namespace PlatformTaskDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * 是否显示变更前任务信息 1-是 0-否
       * @format int32
       */
      historyFlag?: number;
      /** 任务编码 */
      taskCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = TaskDetailResp;
  }

  /**
   * No description
   * @tags 任务管理
   * @name PlatformTaskExport
   * @summary 任务导出
   * @request POST:/api/platform/task/export
   * @response `200` `CommonExportResp` OK
   */
  export namespace PlatformTaskExport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TaskExportReq;
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
   * @tags 任务管理
   * @name PlatformTaskGetTaskCategoryList
   * @summary 任务分类列表
   * @request GET:/api/platform/task/getTaskCategoryList
   * @response `200` `TaskCategoryListResp` OK
   */
  export namespace PlatformTaskGetTaskCategoryList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** name */
      name?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = TaskCategoryListResp;
  }

  /**
   * No description
   * @tags 任务管理
   * @name PlatformTaskList
   * @summary 任务列表
   * @request GET:/api/platform/task/list
   * @response `200` `TaskListResp` OK
   */
  export namespace PlatformTaskList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = TaskListResp;
  }

  /**
   * No description
   * @tags 任务管理
   * @name PlatformTaskOperate
   * @summary 任务操作
   * @request POST:/api/platform/task/operate
   * @response `200` `TaskOperateResp` OK
   */
  export namespace PlatformTaskOperate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TaskOperateReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = TaskOperateResp;
  }

  /**
   * No description
   * @tags 任务管理
   * @name PlatformTaskSaveTask
   * @summary 保存任务
   * @request POST:/api/platform/task/saveTask
   * @response `200` `TaskSaveResp` OK
   */
  export namespace PlatformTaskSaveTask {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TaskSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = TaskSaveResp;
  }

  /**
   * No description
   * @tags 任务管理
   * @name PlatformTaskStatistics
   * @summary 任务统计
   * @request POST:/api/platform/task/statistics
   * @response `200` `TaskStatisticsResp` OK
   */
  export namespace PlatformTaskStatistics {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TaskStatisticsReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = TaskStatisticsResp;
  }

  /**
   * No description
   * @tags 通用模板
   * @name PlatformTemplateOperate
   * @summary 操作模板
   * @request POST:/api/platform/template/operate
   * @response `200` `SysTemplateOperateResp` OK
   */
  export namespace PlatformTemplateOperate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SysTemplateOperateReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SysTemplateOperateResp;
  }

  /**
   * No description
   * @tags 通用模板
   * @name PlatformTemplateQueryTemplateDetail
   * @summary 通用模板详情
   * @request GET:/api/platform/template/queryTemplateDetail
   * @response `200` `SysTemplateDetailResp` OK
   */
  export namespace PlatformTemplateQueryTemplateDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 模板编码 */
      templateCode?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SysTemplateDetailResp;
  }

  /**
   * No description
   * @tags 通用模板
   * @name PlatformTemplateQueryTemplateList
   * @summary 通用模板列表
   * @request GET:/api/platform/template/queryTemplateList
   * @response `200` `SysTemplateQueryResp` OK
   */
  export namespace PlatformTemplateQueryTemplateList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SysTemplateQueryResp;
  }

  /**
   * No description
   * @tags 通用模板
   * @name PlatformTemplateSave
   * @summary 保存通用模板
   * @request POST:/api/platform/template/save
   * @response `200` `SysTemplateSaveResp` OK
   */
  export namespace PlatformTemplateSave {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SysTemplateSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SysTemplateSaveResp;
  }

  /**
   * No description
   * @tags 平台模块
   * @name PlatformV1CountryQueryCountryList
   * @summary 国家信息列表查询
   * @request POST:/api/platform/v1/country/queryCountryList
   * @response `200` `CountryPlatformQueryResp` OK
   */
  export namespace PlatformV1CountryQueryCountryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CountryPlatformQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CountryPlatformQueryResp;
  }

  /**
   * No description
   * @tags 平台模块
   * @name PlatformV1ProvinceQueryProvinceList
   * @summary 省份下拉列表查询V1
   * @request POST:/api/platform/v1/province/queryProvinceList
   * @response `200` `ProvinceInfoListQueryResp` OK
   */
  export namespace PlatformV1ProvinceQueryProvinceList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProvinceInfoListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ProvinceInfoListQueryResp;
  }

  /**
   * No description
   * @tags 工单管理, 平台模块
   * @name PlatformWorkflowHandleWithdraw
   * @summary 处理工单
   * @request POST:/api/platform/workflow/handleWithdraw
   * @response `200` `CommonRespBoolean` OK
   */
  export namespace PlatformWorkflowHandleWithdraw {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = WorkflowWithdrawReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespBoolean;
  }

  /**
   * No description
   * @tags 工单管理, 平台模块
   * @name PlatformWorkflowHandleWorkflow
   * @summary 撤销工单
   * @request POST:/api/platform/workflow/handleWorkflow
   * @response `200` `CommonRespBoolean` OK
   */
  export namespace PlatformWorkflowHandleWorkflow {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = WorkflowWithdrawReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespBoolean;
  }

  /**
   * No description
   * @tags 工单管理, 平台模块
   * @name PlatformWorkflowQueryMyWorkflowRecordCount
   * @summary 我的待办工单数
   * @request GET:/api/platform/workflow/queryMyWorkflowRecordCount
   * @response `200` `MyWorkflowCountResp` OK
   */
  export namespace PlatformWorkflowQueryMyWorkflowRecordCount {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MyWorkflowCountResp;
  }

  /**
   * No description
   * @tags 工单管理, 平台模块
   * @name PlatformWorkflowQueryWorkflowRecordDetail
   * @summary 工单记录详情查询
   * @request GET:/api/platform/workflow/queryWorkflowRecordDetail
   * @response `200` `WorkflowDetailQueryResp` OK
   */
  export namespace PlatformWorkflowQueryWorkflowRecordDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 工单编码 */
      workflowCode: string;
      /**
       * 工单类型 1-审批流 2-待办
       * @format int32
       */
      workflowType: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = WorkflowDetailQueryResp;
  }

  /**
   * No description
   * @tags 工单管理, 平台模块
   * @name PlatformWorkflowQueryWorkflowRecordList
   * @summary 工单记录列表查询
   * @request GET:/api/platform/workflow/queryWorkflowRecordList
   * @response `200` `WorkflowListQueryResp` OK
   */
  export namespace PlatformWorkflowQueryWorkflowRecordList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = WorkflowListQueryResp;
  }
}
