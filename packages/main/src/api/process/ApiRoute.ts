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
  ApproveDetailQueryResp,
  ApproveListQueryResp,
  CommonResp,
  MatterDetailQueryResp,
  MatterListQueryResp,
  MatterSaveReq,
  ProcessNavigationListQueryResp,
  ProcessNavigationQueryResp,
} from './data-contracts';

export namespace Api {
  /**
   * No description
   * @tags 流程导航
   * @name LuteosProcessNavigationApproveQueryDetail
   * @summary 我的事项-详情查询
   * @request GET:/api/luteos/process/navigation/approve/queryDetail
   * @response `200` `ApproveDetailQueryResp` OK
   */
  export namespace LuteosProcessNavigationApproveQueryDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * 对象类型 默认 WorkflowItemTypeEnum.NAVIGATION.getType() = 8
       * @format int32
       */
      itemType?: number;
      /** 工单编码 */
      workflowCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ApproveDetailQueryResp;
  }

  /**
   * No description
   * @tags 流程导航
   * @name LuteosProcessNavigationApproveQueryList
   * @summary 我的事项
   * @request GET:/api/luteos/process/navigation/approve/queryList
   * @response `200` `ApproveListQueryResp` OK
   */
  export namespace LuteosProcessNavigationApproveQueryList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 关键字 */
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
       * 状态 10-审批中 11-已通过 13-已撤销 21-已完成
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
    export type ResponseBody = ApproveListQueryResp;
  }

  /**
   * No description
   * @tags 流程导航
   * @name LuteosProcessNavigationMatterQueryDetail
   * @summary 事项管理-事项详情查询
   * @request GET:/api/luteos/process/navigation/matter/queryDetail
   * @response `200` `MatterDetailQueryResp` OK
   */
  export namespace LuteosProcessNavigationMatterQueryDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 事项编码(id) */
      code: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MatterDetailQueryResp;
  }

  /**
   * No description
   * @tags 流程导航
   * @name LuteosProcessNavigationMatterQueryList
   * @summary 事项管理-事项列表查询
   * @request GET:/api/luteos/process/navigation/matter/queryList
   * @response `200` `MatterListQueryResp` OK
   */
  export namespace LuteosProcessNavigationMatterQueryList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 创建人 */
      creator?: string;
      /** 关键字 */
      keyword?: string;
      /**
       * 状态: 0-停用 1-启用
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
    export type ResponseBody = MatterListQueryResp;
  }

  /**
   * No description
   * @tags 流程导航
   * @name LuteosProcessNavigationMatterSave
   * @summary 事项管理-事项保存
   * @request POST:/api/luteos/process/navigation/matter/save
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosProcessNavigationMatterSave {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MatterSaveReq;
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
   * @tags 流程导航
   * @name LuteosProcessNavigationQueryList
   * @summary 流程导航查询
   * @request GET:/api/luteos/process/navigation/queryList
   * @response `200` `ProcessNavigationQueryResp` OK
   */
  export namespace LuteosProcessNavigationQueryList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 事项名称 */
      keyword?: string;
      /**
       * 是否合作项目查询流程导航 1-是 0-否
       * @format int32
       */
      projectSelectFlag?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ProcessNavigationQueryResp;
  }

  /**
   * No description
   * @tags 流程导航
   * @name LuteosProcessNavigationQueryProcessNavigationList
   * @summary 免登录流程导航查询
   * @request GET:/api/luteos/process/navigation/queryProcessNavigationList
   * @response `200` `ProcessNavigationListQueryResp` OK
   */
  export namespace LuteosProcessNavigationQueryProcessNavigationList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ProcessNavigationListQueryResp;
  }
}
