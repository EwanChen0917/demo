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
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags 审批管理
   * @name LuteosWorkflowApproveQueryAllList
   * @summary 当前审核工单列表查询
   * @request GET:/api/luteos/workflow/approve/queryAllList
   * @response `200` `ApproveListResp` OK
   */
  luteosWorkflowApproveQueryAllList = (params: RequestParams = {}) =>
    this.request<ApproveListResp, any>({
      path: `/api/luteos/workflow/approve/queryAllList`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 审批管理
   * @name LuteosWorkflowApproveQueryProcessCodeDetail
   * @summary 当前审核工单详情查询
   * @request GET:/api/luteos/workflow/approve/queryProcessCodeDetail
   * @response `200` `ProcessCodeDetail` OK
   */
  luteosWorkflowApproveQueryProcessCodeDetail = (
    query: {
      /** processCode */
      processCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<ProcessCodeDetail, any>({
      path: `/api/luteos/workflow/approve/queryProcessCodeDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 审批管理
   * @name LuteosWorkflowOaFlowCheck
   * @summary 测试链接器
   * @request POST:/api/luteos/workflow/oaFlowCheck
   * @response `200` `void` OK
   */
  luteosWorkflowOaFlowCheck = (req: OaFlowCheckReq, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/luteos/workflow/oaFlowCheck`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
}
