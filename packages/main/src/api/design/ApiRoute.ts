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

export namespace Api {
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
   * @name LuteosDesignOperationQueryDesignApprovalConfigDetail
   * @summary 设计审批配置详情
   * @request GET:/api/luteos/design/operation/queryDesignApprovalConfigDetail
   * @response `200` `DesignApprovalConfigDetailResp` OK
   */
  export namespace LuteosDesignOperationQueryDesignApprovalConfigDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * 主键
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
    export type ResponseBody = DesignApprovalConfigDetailResp;
  }

  /**
   * No description
   * @tags 配置类型及通知管理
   * @name LuteosDesignOperationQueryDesignApprovalConfigList
   * @summary 设计审批配置列表（任务类型同 queryDesignerList 的 itemType / DesignTaskItemTypeEnum）
   * @request GET:/api/luteos/design/operation/queryDesignApprovalConfigList
   * @response `200` `DesignApprovalConfigListResp` OK
   */
  export namespace LuteosDesignOperationQueryDesignApprovalConfigList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DesignApprovalConfigListResp;
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
   * @name LuteosDesignOperationSaveDesignApprovalConfig
   * @summary 设计审批配置保存（新增不传 id，编辑传 id）
   * @request POST:/api/luteos/design/operation/saveDesignApprovalConfig
   * @response `200` `DesignApprovalConfigSaveResp` OK
   */
  export namespace LuteosDesignOperationSaveDesignApprovalConfig {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DesignApprovalConfigSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DesignApprovalConfigSaveResp;
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
   * @name LuteosDesignQueryDesignTaskItemType02List
   * @summary 获取二期任务类型列表（DesignTaskItemTypeEnum.itemType02）
   * @request GET:/api/luteos/design/queryDesignTaskItemType02List
   * @response `200` `DesignTaskItemType02ListResp` OK
   */
  export namespace LuteosDesignQueryDesignTaskItemType02List {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DesignTaskItemType02ListResp;
  }

  /**
   * No description
   * @tags 设计任务
   * @name LuteosDesignQueryDesignTaskList
   * @summary 任务列表查询
   * @request POST:/api/luteos/design/queryDesignTaskList
   * @response `200` `DesignTaskListQueryResp` OK
   */
  export namespace LuteosDesignQueryDesignTaskList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DesignTaskListQueryReq;
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
}
