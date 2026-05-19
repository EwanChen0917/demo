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
  CommonRespJSONObject,
  CommonRespString,
  CommonRespVoid,
  OpenWorkflowSubmitReq,
  SubmitApproveCanelReq,
  SubmitApproveSubmitReq,
  WorkflowSubmitReq,
} from './data-contracts';

export namespace Api {
  /**
   * No description
   * @tags 钉钉模块
   * @name LuteosPlatformOaNotify
   * @summary 发送工作通知
   * @request POST:/api/luteos/platform/oa/notify
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosPlatformOaNotify {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OpenWorkflowSubmitReq;
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
   * @tags 钉钉模块
   * @name LuteosPlatformOaProcessesForecast
   * @summary 获取审核节点信息
   * @request POST:/api/luteos/platform/oa/processes/forecast
   * @response `200` `CommonRespJSONObject` OK
   */
  export namespace LuteosPlatformOaProcessesForecast {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SubmitApproveSubmitReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespJSONObject;
  }

  /**
   * No description
   * @tags 钉钉模块
   * @name LuteosPlatformOaSubmit
   * @summary 发起审核
   * @request POST:/api/luteos/platform/oa/submit
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosPlatformOaSubmit {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SubmitApproveSubmitReq;
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
   * @tags 钉钉模块
   * @name LuteosPlatformOaSubmitDingOaAndRecord
   * @summary 发起审核--并记录RPE工单
   * @request POST:/api/luteos/platform/oa/submitDingOaAndRecord
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosPlatformOaSubmitDingOaAndRecord {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = WorkflowSubmitReq;
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
   * @tags 钉钉模块
   * @name LuteosPlatformOaWithdraw
   * @summary 撤回审批
   * @request POST:/api/luteos/platform/oa/withdraw
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosPlatformOaWithdraw {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SubmitApproveCanelReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespVoid;
  }
}
