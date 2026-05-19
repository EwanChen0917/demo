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

import { ApproveListResp, OaFlowCheckReq, ProcessCodeDetail } from './data-contracts';

export namespace Api {
  /**
   * No description
   * @tags 审批管理
   * @name LuteosWorkflowApproveQueryAllList
   * @summary 当前审核工单列表查询
   * @request GET:/api/luteos/workflow/approve/queryAllList
   * @response `200` `ApproveListResp` OK
   */
  export namespace LuteosWorkflowApproveQueryAllList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ApproveListResp;
  }

  /**
   * No description
   * @tags 审批管理
   * @name LuteosWorkflowApproveQueryProcessCodeDetail
   * @summary 当前审核工单详情查询
   * @request GET:/api/luteos/workflow/approve/queryProcessCodeDetail
   * @response `200` `ProcessCodeDetail` OK
   */
  export namespace LuteosWorkflowApproveQueryProcessCodeDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** processCode */
      processCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ProcessCodeDetail;
  }

  /**
   * No description
   * @tags 审批管理
   * @name LuteosWorkflowOaFlowCheck
   * @summary 测试链接器
   * @request POST:/api/luteos/workflow/oaFlowCheck
   * @response `200` `void` OK
   */
  export namespace LuteosWorkflowOaFlowCheck {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OaFlowCheckReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = void;
  }
}
