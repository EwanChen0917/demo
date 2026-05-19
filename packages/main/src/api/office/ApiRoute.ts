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

export namespace Api {
  /**
   * No description
   * @tags user-controller
   * @name BaseUserQueryUserList
   * @summary 用户列表查询
   * @request GET:/api/base/user/queryUserList
   * @response `200` `UserListQueryResp` OK
   */
  export namespace BaseUserQueryUserList {
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
      /** 用户名称 */
      username?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = UserListQueryResp;
  }

  /**
   * No description
   * @tags user-controller
   * @name BaseUserSaveUserInfo
   * @summary 保存用户信息
   * @request POST:/api/base/user/saveUserInfo
   * @response `200` `UserSaveResp` OK
   */
  export namespace BaseUserSaveUserInfo {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UserSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = UserSaveResp;
  }

  /**
   * No description
   * @tags 品牌管理
   * @name LuteosDesignBrandQueryDesignBrandDetail
   * @summary 品牌详情查询
   * @request GET:/api/luteos/design/brand/queryDesignBrandDetail
   * @response `200` `DesignBrandDetailResp` OK
   */
  export namespace LuteosDesignBrandQueryDesignBrandDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 记录编码 */
      designBrandCode?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DesignBrandDetailResp;
  }

  /**
   * No description
   * @tags 品牌管理
   * @name LuteosDesignBrandQueryDesignBrandList
   * @summary 品牌列表查询
   * @request GET:/api/luteos/design/brand/queryDesignBrandList
   * @response `200` `DesignBrandListQueryResp` OK
   */
  export namespace LuteosDesignBrandQueryDesignBrandList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DesignBrandListQueryResp;
  }

  /**
   * No description
   * @tags 品牌管理
   * @name LuteosDesignBrandSaveDesignBrand
   * @summary 品牌保存
   * @request POST:/api/luteos/design/brand/saveDesignBrand
   * @response `200` `void` OK
   */
  export namespace LuteosDesignBrandSaveDesignBrand {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DesignBrandSaveReq;
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
   * @tags 设计任务
   * @name LuteosDesignChangeTask
   * @summary 变更操作
   * @request POST:/api/luteos/design/changeTask
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosDesignChangeTask {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DesignTaskChangeReq;
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
   * @tags 产品等级管理
   * @name LuteosDesignLevelQueryDesignPdtLevelList
   * @summary 产品等级列表查询
   * @request GET:/api/luteos/design/level/queryDesignPdtLevelList
   * @response `200` `DesignPdtLevelListResp` OK
   */
  export namespace LuteosDesignLevelQueryDesignPdtLevelList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DesignPdtLevelListResp;
  }

  /**
   * No description
   * @tags 设计任务
   * @name LuteosDesignOperateDesignTask
   * @summary 设计任务操作
   * @request POST:/api/luteos/design/operateDesignTask
   * @response `200` `CommonRespBoolean` OK
   */
  export namespace LuteosDesignOperateDesignTask {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DesignTaskOperateReq;
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
   * @tags 配置类型及通知管理
   * @name LuteosDesignOperationQueryDesignOperationGroupDetail
   * @summary 配置类型详情查询
   * @request GET:/api/luteos/design/operation/queryDesignOperationGroupDetail
   * @response `200` `DesignOperationGroupDetailResp` OK
   */
  export namespace LuteosDesignOperationQueryDesignOperationGroupDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 记录编码 */
      operatorGroupCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DesignOperationGroupDetailResp;
  }

  /**
   * No description
   * @tags 配置类型及通知管理
   * @name LuteosDesignOperationQueryDesignOperationGroupList
   * @summary 配置类型列表查询
   * @request GET:/api/luteos/design/operation/queryDesignOperationGroupList
   * @response `200` `DesignOperationGroupListQueryResp` OK
   */
  export namespace LuteosDesignOperationQueryDesignOperationGroupList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DesignOperationGroupListQueryResp;
  }

  /**
   * No description
   * @tags 配置类型及通知管理
   * @name LuteosDesignOperationSaveDesignOperationGroup
   * @summary 配置类型保存
   * @request POST:/api/luteos/design/operation/saveDesignOperationGroup
   * @response `200` `void` OK
   */
  export namespace LuteosDesignOperationSaveDesignOperationGroup {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DesignOperationGroupSaveReq;
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
   * @tags 设计任务
   * @name LuteosDesignQueryDesignItemTypeAuth
   * @summary 二期设计任务项目类型访问权限
   * @request GET:/api/luteos/design/queryDesignItemTypeAuth
   * @response `200` `DesignItemTypeAuthResp` OK
   */
  export namespace LuteosDesignQueryDesignItemTypeAuth {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DesignItemTypeAuthResp;
  }

  /**
   * No description
   * @tags 设计任务
   * @name LuteosDesignQueryDesignLevelDict
   * @summary 设计任务等级
   * @request GET:/api/luteos/design/queryDesignLevelDict
   * @response `200` `DictQueryResp` OK
   */
  export namespace LuteosDesignQueryDesignLevelDict {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * 项目类型 1-电商/网页设计 2-平面物料设计 3-视频/MG动画 4-摄影 5-三维渲染 6-包装设计 7-ID设计 8-CMF设计 9-网页设计 10-UI设计  配置管理分数查等级 默认传20
       * @format int32
       */
      itemType?: number;
    };
    export type RequestBody = never;
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
   * @tags 设计任务
   * @name LuteosDesignQueryDesignTaskDetail
   * @summary 设计任务详情查询
   * @request GET:/api/luteos/design/queryDesignTaskDetail
   * @response `200` `DesignTaskDetailResp` OK
   */
  export namespace LuteosDesignQueryDesignTaskDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 设计任务编码 */
      designTaskCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DesignTaskDetailResp;
  }

  /**
   * No description
   * @tags 设计任务
   * @name LuteosDesignQueryDesignTaskList
   * @summary 任务列表查询
   * @request GET:/api/luteos/design/queryDesignTaskList
   * @response `200` `DesignTaskListQueryResp` OK
   */
  export namespace LuteosDesignQueryDesignTaskList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DesignTaskListQueryResp;
  }

  /**
   * No description
   * @tags 设计任务
   * @name LuteosDesignQueryDesignTaskOperationGroupList
   * @summary 项目类型运营组查询
   * @request GET:/api/luteos/design/queryDesignTaskOperationGroupList
   * @response `200` `DesignTaskOperationGroupQueryResp` OK
   */
  export namespace LuteosDesignQueryDesignTaskOperationGroupList {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * 项目类型
       * @format int32
       */
      itemType?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DesignTaskOperationGroupQueryResp;
  }

  /**
   * No description
   * @tags 设计任务
   * @name LuteosDesignQueryDesignTaskPeriodViewList
   * @summary 设计任务日历周期查询
   * @request GET:/api/luteos/design/queryDesignTaskPeriodViewList
   * @response `200` `DesignTaskPeriodViewResp` OK
   */
  export namespace LuteosDesignQueryDesignTaskPeriodViewList {
    export type RequestParams = {};
    export type RequestQuery = {
      designTaskCodeList?: string[];
      /**
       * 设计类型
       * @format int32
       */
      itemType: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DesignTaskPeriodViewResp;
  }

  /**
   * No description
   * @tags 设计任务
   * @name LuteosDesignQueryDesignerList
   * @summary 设计师列表查询
   * @request GET:/api/luteos/design/queryDesignerList
   * @response `200` `DesignerListResp` OK
   */
  export namespace LuteosDesignQueryDesignerList {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * 项目类型
       * @format int32
       */
      itemType?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DesignerListResp;
  }

  /**
   * No description
   * @tags 设计任务
   * @name LuteosDesignQueryFileUrl
   * @summary 附件url查询
   * @request GET:/api/luteos/design/queryFileUrl
   * @response `200` `DesignTaskFileUrlResp` OK
   */
  export namespace LuteosDesignQueryFileUrl {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 设计任务编码 */
      designTaskCode: string;
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
    export type ResponseBody = DesignTaskFileUrlResp;
  }

  /**
   * No description
   * @tags 设计任务
   * @name LuteosDesignQueryRecentlyItemType
   * @summary 最近项目类型
   * @request GET:/api/luteos/design/queryRecentlyItemType
   * @response `200` `RecentlyItemTypeResp` OK
   */
  export namespace LuteosDesignQueryRecentlyItemType {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = RecentlyItemTypeResp;
  }

  /**
   * No description
   * @tags 设计任务
   * @name LuteosDesignQueryRejectRecordList
   * @summary 驳回记录查询
   * @request GET:/api/luteos/design/queryRejectRecordList
   * @response `200` `CheckRejectRecordResp` OK
   */
  export namespace LuteosDesignQueryRejectRecordList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 设计任务编码 */
      designTaskCode?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CheckRejectRecordResp;
  }

  /**
   * No description
   * @tags 设计任务
   * @name LuteosDesignSaveDesignTask
   * @summary 设计任务保存
   * @request POST:/api/luteos/design/saveDesignTask
   * @response `200` `DesignTaskSaveResp` OK
   */
  export namespace LuteosDesignSaveDesignTask {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DesignTaskSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DesignTaskSaveResp;
  }

  /**
   * No description
   * @tags 设计分数管理
   * @name LuteosDesignScoreQueryDesignScoreDetail
   * @summary 设计分数详情查询
   * @request GET:/api/luteos/design/score/queryDesignScoreDetail
   * @response `200` `DesignScoreDetailResp` OK
   */
  export namespace LuteosDesignScoreQueryDesignScoreDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 记录编码 */
      designScoreCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DesignScoreDetailResp;
  }

  /**
   * No description
   * @tags 设计分数管理
   * @name LuteosDesignScoreQueryDesignScoreList
   * @summary 设计分数列表查询
   * @request GET:/api/luteos/design/score/queryDesignScoreList
   * @response `200` `DesignScoreListQueryResp` OK
   */
  export namespace LuteosDesignScoreQueryDesignScoreList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DesignScoreListQueryResp;
  }

  /**
   * No description
   * @tags 设计分数管理
   * @name LuteosDesignScoreSaveDesignScore
   * @summary 设计分数保存
   * @request POST:/api/luteos/design/score/saveDesignScore
   * @response `200` `CommonRespBoolean` OK
   */
  export namespace LuteosDesignScoreSaveDesignScore {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DesignScoreSaveReq;
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
   * @tags 统计分析管理
   * @name LuteosDesignStatisticAnalysisExportDesignScoreStatistic
   * @summary 设计分数导出
   * @request POST:/api/luteos/design/statistic/analysis/exportDesignScoreStatistic
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosDesignStatisticAnalysisExportDesignScoreStatistic {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DesignScoreStatisticReq;
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
   * @tags 统计分析管理
   * @name LuteosDesignStatisticAnalysisExportDesignTaskStatistic
   * @summary 任务分析导出
   * @request POST:/api/luteos/design/statistic/analysis/exportDesignTaskStatistic
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosDesignStatisticAnalysisExportDesignTaskStatistic {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DesignScoreStatisticReq;
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
   * @tags 统计分析管理
   * @name LuteosDesignStatisticAnalysisExportDesignerStatistic
   * @summary 设计师数据导出
   * @request POST:/api/luteos/design/statistic/analysis/exportDesignerStatistic
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosDesignStatisticAnalysisExportDesignerStatistic {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DesignerStatisticReq;
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
   * @tags 统计分析管理
   * @name LuteosDesignStatisticAnalysisExportUserSatisfaction
   * @summary 用户满意度分析导出
   * @request POST:/api/luteos/design/statistic/analysis/exportUserSatisfaction
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosDesignStatisticAnalysisExportUserSatisfaction {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UserSatisfactionReq;
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
   * @tags 统计分析管理
   * @name LuteosDesignStatisticAnalysisQueryDesignDeptStatisticList
   * @summary 部门总统计数据
   * @request GET:/api/luteos/design/statistic/analysis/queryDesignDeptStatisticList
   * @response `200` `DesignDeptStatisticResp` OK
   */
  export namespace LuteosDesignStatisticAnalysisQueryDesignDeptStatisticList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DesignDeptStatisticResp;
  }

  /**
   * No description
   * @tags 统计分析管理
   * @name LuteosDesignStatisticAnalysisQueryDesignScoreStatisticList
   * @summary 设计分数统计查询
   * @request GET:/api/luteos/design/statistic/analysis/queryDesignScoreStatisticList
   * @response `200` `DesignScoreStatisticResp` OK
   */
  export namespace LuteosDesignStatisticAnalysisQueryDesignScoreStatisticList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DesignScoreStatisticResp;
  }

  /**
   * No description
   * @tags 统计分析管理
   * @name LuteosDesignStatisticAnalysisQueryDesignTaskStatisticList
   * @summary 任务总统计数据
   * @request GET:/api/luteos/design/statistic/analysis/queryDesignTaskStatisticList
   * @response `200` `DesignTaskStatisticResp` OK
   */
  export namespace LuteosDesignStatisticAnalysisQueryDesignTaskStatisticList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DesignTaskStatisticResp;
  }

  /**
   * No description
   * @tags 统计分析管理
   * @name LuteosDesignStatisticAnalysisQueryDesignTypeStatisticList
   * @summary 类型总统计数据
   * @request GET:/api/luteos/design/statistic/analysis/queryDesignTypeStatisticList
   * @response `200` `DesignTypeStatisticResp` OK
   */
  export namespace LuteosDesignStatisticAnalysisQueryDesignTypeStatisticList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DesignTypeStatisticResp;
  }

  /**
   * No description
   * @tags 统计分析管理
   * @name LuteosDesignStatisticAnalysisQueryDesignerStatisticList
   * @summary 设计师数据统计查询
   * @request GET:/api/luteos/design/statistic/analysis/queryDesignerStatisticList
   * @response `200` `DesignerStatisticResp` OK
   */
  export namespace LuteosDesignStatisticAnalysisQueryDesignerStatisticList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DesignerStatisticResp;
  }

  /**
   * No description
   * @tags 统计分析管理
   * @name LuteosDesignStatisticAnalysisQueryUserSatisfactionList
   * @summary 用户满意度分析
   * @request GET:/api/luteos/design/statistic/analysis/queryUserSatisfactionList
   * @response `200` `UserSatisfactionResp` OK
   */
  export namespace LuteosDesignStatisticAnalysisQueryUserSatisfactionList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = UserSatisfactionResp;
  }

  /**
   * No description
   * @tags 经营管理
   * @name LuteosShopBusinessQueryDetail
   * @summary 经营信息详情查询
   * @request GET:/api/luteos/shop/business/queryDetail
   * @response `200` `BusinessDetailResp` OK
   */
  export namespace LuteosShopBusinessQueryDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 经营信息code */
      code: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = BusinessDetailResp;
  }

  /**
   * No description
   * @tags 经营管理
   * @name LuteosShopBusinessQueryList
   * @summary 经营信息列表查询
   * @request POST:/api/luteos/shop/business/queryList
   * @response `200` `BusinessListResp` OK
   */
  export namespace LuteosShopBusinessQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BusinessListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = BusinessListResp;
  }

  /**
   * No description
   * @tags 经营管理
   * @name LuteosShopBusinessSaveOrUpdate
   * @summary 经营信息保存
   * @request POST:/api/luteos/shop/business/saveOrUpdate
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosShopBusinessSaveOrUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BusinessSaveOrUpdateReq;
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
   * @tags 店铺管理
   * @name LuteosShopClose
   * @summary 关店、开店
   * @request POST:/api/luteos/shop/close
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosShopClose {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 关店开店 */
      open: boolean;
      /** 店铺code */
      shopCode: string;
    };
    export type RequestBody = never;
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
   * @tags 店铺管理
   * @name LuteosShopQueryShopCommonList
   * @summary 店铺列表查询2
   * @request POST:/api/luteos/shop/queryShopCommonList
   * @response `200` `ShopList2Resp` OK
   */
  export namespace LuteosShopQueryShopCommonList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ShopListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ShopList2Resp;
  }

  /**
   * No description
   * @tags 店铺管理
   * @name LuteosShopQueryShopDetail
   * @summary 店铺详情查询
   * @request GET:/api/luteos/shop/queryShopDetail
   * @response `200` `ShopDetailResp` OK
   */
  export namespace LuteosShopQueryShopDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 店铺code */
      shopCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ShopDetailResp;
  }

  /**
   * No description
   * @tags 店铺管理
   * @name LuteosShopQueryShopList
   * @summary 店铺列表查询
   * @request POST:/api/luteos/shop/queryShopList
   * @response `200` `ShopListResp` OK
   */
  export namespace LuteosShopQueryShopList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ShopListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ShopListResp;
  }

  /**
   * No description
   * @tags 店铺管理
   * @name LuteosShopRecycleLabel
   * @summary 回收标签设置
   * @request POST:/api/luteos/shop/recycleLabel
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosShopRecycleLabel {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ShopRecycleLabelSaveReq;
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
   * @tags 店铺管理
   * @name LuteosShopSaveOrUpdate
   * @summary 新增或者编辑
   * @request POST:/api/luteos/shop/saveOrUpdate
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosShopSaveOrUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ShopSaveReq;
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
   * @tags 店铺管理
   * @name LuteosShopSaveRemark
   * @summary 店铺备注
   * @request POST:/api/luteos/shop/saveRemark
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosShopSaveRemark {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ShopRemarkSaveReq;
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
   * @tags 店铺管理
   * @name LuteosShopSelectEcShopList
   * @summary 查询店铺列表-易仓店铺账号
   * @request GET:/api/luteos/shop/selectEcShopList
   * @response `200` `(DictBean)[]` OK
   */
  export namespace LuteosShopSelectEcShopList {
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
   * @tags 店铺管理
   * @name LuteosShopSelectShopList
   * @summary 查询店铺列表
   * @request GET:/api/luteos/shop/selectShopList
   * @response `200` `(DictBean)[]` OK
   */
  export namespace LuteosShopSelectShopList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 平台 amazon shopify walmart ... */
      platform?: string;
      /** 站点 */
      site?: string;
      /** 站点 可多选 */
      siteList?: string[];
    };
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
   * @tags 日程管理
   * @name OfficeCalendarGenerateFortuneCard
   * @summary 生成运势卡片
   * @request POST:/api/office/calendar/generateFortuneCard
   * @response `200` `FortuneCardResp` OK
   */
  export namespace OfficeCalendarGenerateFortuneCard {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FortuneCardReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = FortuneCardResp;
  }

  /**
   * No description
   * @tags 日程管理
   * @name OfficeCalendarPublishCalendarUpdatedEvents
   * @summary 测试日程发布订阅功能
   * @request GET:/api/office/calendar/publishCalendarUpdatedEvents
   * @response `200` `void` OK
   */
  export namespace OfficeCalendarPublishCalendarUpdatedEvents {
    export type RequestParams = {};
    export type RequestQuery = {
      /** calendarId */
      calendarId: string;
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
   * @tags 日程管理
   * @name OfficeCalendarQueryCalendarList
   * @summary 用户日程列表查询
   * @request POST:/api/office/calendar/queryCalendarList
   * @response `200` `CalendarListResp` OK
   */
  export namespace OfficeCalendarQueryCalendarList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CalendarListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CalendarListResp;
  }

  /**
   * No description
   * @tags 日程管理
   * @name OfficeCalendarQueryTodayInsights
   * @summary 今日洞察
   * @request POST:/api/office/calendar/queryTodayInsights
   * @response `200` `TodayInsightsResp` OK
   */
  export namespace OfficeCalendarQueryTodayInsights {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = TodayInsightsResp;
  }

  /**
   * No description
   * @tags 日程管理
   * @name OfficeCalendarQueryUserSubscribe
   * @summary 用户订阅规则查询
   * @request POST:/api/office/calendar/queryUserSubscribe
   * @response `200` `CalendarUserSubscribeResp` OK
   */
  export namespace OfficeCalendarQueryUserSubscribe {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CalendarUserSubscribeReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CalendarUserSubscribeResp;
  }

  /**
   * No description
   * @tags 日程管理
   * @name OfficeCalendarSaveUserSubscribe
   * @summary 用户订阅规则保存
   * @request POST:/api/office/calendar/saveUserSubscribe
   * @response `200` `CommonRespVoid` OK
   */
  export namespace OfficeCalendarSaveUserSubscribe {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CalendarUserSubscribeSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespVoid;
  }

  /**
   * @description 仅处理 device_type=sensor，根据设备-会议室映射解析 roomId 并初始化人在传感器触发的自动化任务实例
   * @tags 智能会议-自动化任务管理
   * @name OfficeMeetingAutoDeviceStateWebhook
   * @summary 设备状态变更回调（人在传感器主动触发）
   * @request POST:/api/office/meeting/auto/deviceStateWebhook
   * @response `200` `CommonRespVoid` OK
   */
  export namespace OfficeMeetingAutoDeviceStateWebhook {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = Record<string, object>;
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
   * @tags 智能会议-自动化任务管理
   * @name OfficeMeetingAutoGenerateAutoTaskCode
   * @summary 初始化自动化任务编码
   * @request POST:/api/office/meeting/auto/generateAutoTaskCode
   * @response `200` `GenerateAutoTaskCodeResp` OK
   */
  export namespace OfficeMeetingAutoGenerateAutoTaskCode {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = GenerateAutoTaskCodeResp;
  }

  /**
   * No description
   * @tags 智能会议-自动化任务管理
   * @name OfficeMeetingAutoOperate
   * @summary 操作
   * @request POST:/api/office/meeting/auto/operate
   * @response `200` `CommonRespVoid` OK
   */
  export namespace OfficeMeetingAutoOperate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AutoTaskOperateReq;
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
   * @tags 智能会议-自动化任务管理
   * @name OfficeMeetingAutoQueryAutoTaskConfig
   * @summary 自动化任务触发动作及执行动作等配置
   * @request GET:/api/office/meeting/auto/queryAutoTaskConfig
   * @response `200` `AutoTaskConfigQueryResp` OK
   */
  export namespace OfficeMeetingAutoQueryAutoTaskConfig {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = AutoTaskConfigQueryResp;
  }

  /**
   * No description
   * @tags 智能会议-自动化任务管理
   * @name OfficeMeetingAutoQueryAutoTaskList
   * @summary 自动化任务列表
   * @request POST:/api/office/meeting/auto/queryAutoTaskList
   * @response `200` `AutoTaskListQueryResp` OK
   */
  export namespace OfficeMeetingAutoQueryAutoTaskList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AutoTaskListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = AutoTaskListQueryResp;
  }

  /**
   * No description
   * @tags 智能会议-自动化任务管理
   * @name OfficeMeetingAutoQueryDetail
   * @summary 详情
   * @request GET:/api/office/meeting/auto/queryDetail
   * @response `200` `AutoTaskDetailResp` OK
   */
  export namespace OfficeMeetingAutoQueryDetail {
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
    export type ResponseBody = AutoTaskDetailResp;
  }

  /**
   * No description
   * @tags 智能会议-自动化任务管理
   * @name OfficeMeetingAutoSave
   * @summary 保存
   * @request POST:/api/office/meeting/auto/save
   * @response `200` `AutoTaskSaveResp` OK
   */
  export namespace OfficeMeetingAutoSave {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AutoTaskSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = AutoTaskSaveResp;
  }

  /**
   * No description
   * @tags 智能会议-自动化任务管理
   * @name OfficeMeetingAutoStatisticQueryDeviceCount
   * @summary 设备在线情况
   * @request GET:/api/office/meeting/auto/statistic/queryDeviceCount
   * @response `200` `DeviceCountResp` OK
   */
  export namespace OfficeMeetingAutoStatisticQueryDeviceCount {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DeviceCountResp;
  }

  /**
   * No description
   * @tags 智能会议-自动化任务管理
   * @name OfficeMeetingAutoStatisticQueryLog
   * @summary 任务执行流水明细
   * @request GET:/api/office/meeting/auto/statistic/queryLog
   * @response `200` `AutoTaskLogResp` OK
   */
  export namespace OfficeMeetingAutoStatisticQueryLog {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = AutoTaskLogResp;
  }

  /**
   * No description
   * @tags 智能会议-自动化任务管理
   * @name OfficeMeetingAutoStatisticQueryTaskExecuteCount
   * @summary 任务执行次数
   * @request GET:/api/office/meeting/auto/statistic/queryTaskExecuteCount
   * @response `200` `TaskExecuteCountResp` OK
   */
  export namespace OfficeMeetingAutoStatisticQueryTaskExecuteCount {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * 日期
       * @format date
       */
      day?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = TaskExecuteCountResp;
  }

  /**
   * No description
   * @tags 智能会议-自动化任务管理
   * @name OfficeMeetingAutoStatisticQueryTaskSuccessRate
   * @summary 成功任务率
   * @request GET:/api/office/meeting/auto/statistic/queryTaskSuccessRate
   * @response `200` `TaskSuccessRateResp` OK
   */
  export namespace OfficeMeetingAutoStatisticQueryTaskSuccessRate {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * 日期
       * @format date
       */
      day?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = TaskSuccessRateResp;
  }

  /**
   * No description
   * @tags 智能会议-设备管理
   * @name OfficeMeetingDeviceControlDevice
   * @summary 控制设备
   * @request POST:/api/office/meeting/device/controlDevice
   * @response `200` `DeviceControlResp` OK
   */
  export namespace OfficeMeetingDeviceControlDevice {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DeviceControlReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DeviceControlResp;
  }

  /**
   * No description
   * @tags 智能会议-设备管理
   * @name OfficeMeetingDeviceQueryMeetingDeviceDetail
   * @summary 会议设备详情
   * @request GET:/api/office/meeting/device/queryMeetingDeviceDetail
   * @response `200` `MeetingDeviceDetailResp` OK
   */
  export namespace OfficeMeetingDeviceQueryMeetingDeviceDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 设备编码 */
      deviceCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MeetingDeviceDetailResp;
  }

  /**
   * No description
   * @tags 智能会议-设备管理
   * @name OfficeMeetingDeviceQueryMeetingDeviceList
   * @summary 会议设备列表分页查询
   * @request POST:/api/office/meeting/device/queryMeetingDeviceList
   * @response `200` `MeetingDeviceListQueryResp` OK
   */
  export namespace OfficeMeetingDeviceQueryMeetingDeviceList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MeetingDeviceListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MeetingDeviceListQueryResp;
  }

  /**
   * No description
   * @tags 智能会议-设备管理
   * @name OfficeMeetingDeviceReflashDevice
   * @summary 获取第三方设备信息
   * @request POST:/api/office/meeting/device/reflashDevice
   * @response `200` `CommonRespVoid` OK
   */
  export namespace OfficeMeetingDeviceReflashDevice {
    export type RequestParams = {};
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
}
