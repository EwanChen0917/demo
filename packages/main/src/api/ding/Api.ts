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
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags 钉钉模块
   * @name LuteosPlatformOaNotify
   * @summary 发送工作通知
   * @request POST:/api/luteos/platform/oa/notify
   * @response `200` `CommonRespVoid` OK
   */
  luteosPlatformOaNotify = (req: OpenWorkflowSubmitReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/platform/oa/notify`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 钉钉模块
   * @name LuteosPlatformOaProcessesForecast
   * @summary 获取审核节点信息
   * @request POST:/api/luteos/platform/oa/processes/forecast
   * @response `200` `CommonRespJSONObject` OK
   */
  luteosPlatformOaProcessesForecast = (req: SubmitApproveSubmitReq, params: RequestParams = {}) =>
    this.request<CommonRespJSONObject, any>({
      path: `/api/luteos/platform/oa/processes/forecast`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 钉钉模块
   * @name LuteosPlatformOaSubmit
   * @summary 发起审核
   * @request POST:/api/luteos/platform/oa/submit
   * @response `200` `CommonRespString` OK
   */
  luteosPlatformOaSubmit = (req: SubmitApproveSubmitReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/platform/oa/submit`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 钉钉模块
   * @name LuteosPlatformOaSubmitDingOaAndRecord
   * @summary 发起审核--并记录RPE工单
   * @request POST:/api/luteos/platform/oa/submitDingOaAndRecord
   * @response `200` `CommonRespString` OK
   */
  luteosPlatformOaSubmitDingOaAndRecord = (req: WorkflowSubmitReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/platform/oa/submitDingOaAndRecord`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 钉钉模块
   * @name LuteosPlatformOaWithdraw
   * @summary 撤回审批
   * @request POST:/api/luteos/platform/oa/withdraw
   * @response `200` `CommonRespVoid` OK
   */
  luteosPlatformOaWithdraw = (req: SubmitApproveCanelReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/platform/oa/withdraw`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
}
