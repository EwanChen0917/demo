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
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags 流程导航
   * @name LuteosProcessNavigationApproveQueryDetail
   * @summary 我的事项-详情查询
   * @request GET:/api/luteos/process/navigation/approve/queryDetail
   * @response `200` `ApproveDetailQueryResp` OK
   */
  luteosProcessNavigationApproveQueryDetail = (
    query: {
      /**
       * 对象类型 默认 WorkflowItemTypeEnum.NAVIGATION.getType() = 8
       * @format int32
       */
      itemType?: number;
      /** 工单编码 */
      workflowCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<ApproveDetailQueryResp, any>({
      path: `/api/luteos/process/navigation/approve/queryDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 流程导航
   * @name LuteosProcessNavigationApproveQueryList
   * @summary 我的事项
   * @request GET:/api/luteos/process/navigation/approve/queryList
   * @response `200` `ApproveListQueryResp` OK
   */
  luteosProcessNavigationApproveQueryList = (
    query: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<ApproveListQueryResp, any>({
      path: `/api/luteos/process/navigation/approve/queryList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 流程导航
   * @name LuteosProcessNavigationMatterQueryDetail
   * @summary 事项管理-事项详情查询
   * @request GET:/api/luteos/process/navigation/matter/queryDetail
   * @response `200` `MatterDetailQueryResp` OK
   */
  luteosProcessNavigationMatterQueryDetail = (
    query: {
      /** 事项编码(id) */
      code: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<MatterDetailQueryResp, any>({
      path: `/api/luteos/process/navigation/matter/queryDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 流程导航
   * @name LuteosProcessNavigationMatterQueryList
   * @summary 事项管理-事项列表查询
   * @request GET:/api/luteos/process/navigation/matter/queryList
   * @response `200` `MatterListQueryResp` OK
   */
  luteosProcessNavigationMatterQueryList = (
    query?: {
      /** 创建人 */
      creator?: string;
      /** 关键字 */
      keyword?: string;
      /**
       * 状态: 0-停用 1-启用
       * @format int32
       */
      status?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<MatterListQueryResp, any>({
      path: `/api/luteos/process/navigation/matter/queryList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 流程导航
   * @name LuteosProcessNavigationMatterSave
   * @summary 事项管理-事项保存
   * @request POST:/api/luteos/process/navigation/matter/save
   * @response `200` `CommonResp` OK
   */
  luteosProcessNavigationMatterSave = (req: MatterSaveReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/process/navigation/matter/save`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 流程导航
   * @name LuteosProcessNavigationQueryList
   * @summary 流程导航查询
   * @request GET:/api/luteos/process/navigation/queryList
   * @response `200` `ProcessNavigationQueryResp` OK
   */
  luteosProcessNavigationQueryList = (
    query?: {
      /** 事项名称 */
      keyword?: string;
      /**
       * 是否合作项目查询流程导航 1-是 0-否
       * @format int32
       */
      projectSelectFlag?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<ProcessNavigationQueryResp, any>({
      path: `/api/luteos/process/navigation/queryList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 流程导航
   * @name LuteosProcessNavigationQueryProcessNavigationList
   * @summary 免登录流程导航查询
   * @request GET:/api/luteos/process/navigation/queryProcessNavigationList
   * @response `200` `ProcessNavigationListQueryResp` OK
   */
  luteosProcessNavigationQueryProcessNavigationList = (params: RequestParams = {}) =>
    this.request<ProcessNavigationListQueryResp, any>({
      path: `/api/luteos/process/navigation/queryProcessNavigationList`,
      method: 'GET',
      ...params,
    });
}
