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
  AgentAdminDetailBean,
  AgentDetailBean,
  AgentHistoryChatsResp,
  AgentListResp,
  AgentUpdateReq,
  CommonRespObject,
  CommonRespVoid,
  HomeAgentsResp,
  HomeToolsResp,
  IfNewNotifyResp,
  NotifyAllLabelResp,
  NotifyDetailBean,
  NotifyListReq,
  NotifyListResp,
  NotifyReportReq,
  NotifySaveReq,
  NotifySetStateReq,
  RecentChatListResp,
  ReportLogReq,
  UserNotifyDetailBean,
  UserNotifyListResp,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags 路特智能体后台配置
   * @name LuteosAiAgentAdminDetail
   * @summary 路特智能体详情
   * @request GET:/api/luteos/ai/agent/admin/detail
   * @response `200` `AgentAdminDetailBean` OK
   */
  luteosAiAgentAdminDetail = (
    query?: {
      /** 智能体编码 */
      agentCode?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<AgentAdminDetailBean, any>({
      path: `/api/luteos/ai/agent/admin/detail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 路特智能体后台配置
   * @name LuteosAiAgentAdminList
   * @summary 路特智能体列表
   * @request GET:/api/luteos/ai/agent/admin/list
   * @response `200` `AgentListResp` OK
   */
  luteosAiAgentAdminList = (
    query: {
      /** 搜索关键词 */
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
       * @example 1
       */
      status?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<AgentListResp, any>({
      path: `/api/luteos/ai/agent/admin/list`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 路特智能体后台配置
   * @name LuteosAiAgentAdminUpdate
   * @summary 编辑智能体
   * @request POST:/api/luteos/ai/agent/admin/update
   * @response `200` `CommonRespVoid` OK
   */
  luteosAiAgentAdminUpdate = (req: AgentUpdateReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/ai/agent/admin/update`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 路特智能体
   * @name LuteosAiAgentDetail
   * @summary 路特智能体详情
   * @request GET:/api/luteos/ai/agent/detail
   * @response `200` `AgentDetailBean` OK
   */
  luteosAiAgentDetail = (
    query?: {
      /** 智能体编码 */
      agentCode?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<AgentDetailBean, any>({
      path: `/api/luteos/ai/agent/detail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 路特智能体
   * @name LuteosAiAgentList
   * @summary 路特智能体列表
   * @request GET:/api/luteos/ai/agent/list
   * @response `200` `AgentListResp` OK
   */
  luteosAiAgentList = (
    query: {
      /** 搜索关键词 */
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
    this.request<AgentListResp, any>({
      path: `/api/luteos/ai/agent/list`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 路特智能体
   * @name LuteosAiAgentQueryHistoryChats
   * @summary 获取所有历史会话记录
   * @request GET:/api/luteos/ai/agent/queryHistoryChats
   * @response `200` `AgentHistoryChatsResp` OK
   */
  luteosAiAgentQueryHistoryChats = (
    query: {
      /**
       * 对话类型；0-全部,1-路小特,2-路特智能体
       * @format int32
       */
      chatType?: number;
      /** 搜索关键词 */
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
    },
    params: RequestParams = {},
  ) =>
    this.request<AgentHistoryChatsResp, any>({
      path: `/api/luteos/ai/agent/queryHistoryChats`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 路特智能体
   * @name LuteosAiAgentRecentChatList
   * @summary 最近聊天列表
   * @request GET:/api/luteos/ai/agent/recentChatList
   * @response `200` `RecentChatListResp` OK
   */
  luteosAiAgentRecentChatList = (params: RequestParams = {}) =>
    this.request<RecentChatListResp, any>({
      path: `/api/luteos/ai/agent/recentChatList`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 路特助手首页
   * @name LuteosAiHomeAgents
   * @summary 路特智能体
   * @request GET:/api/luteos/ai/home/agents
   * @response `200` `HomeAgentsResp` OK
   */
  luteosAiHomeAgents = (params: RequestParams = {}) =>
    this.request<HomeAgentsResp, any>({
      path: `/api/luteos/ai/home/agents`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 路特助手首页
   * @name LuteosAiHomeTools
   * @summary 效率工具
   * @request GET:/api/luteos/ai/home/tools
   * @response `200` `HomeToolsResp` OK
   */
  luteosAiHomeTools = (params: RequestParams = {}) =>
    this.request<HomeToolsResp, any>({
      path: `/api/luteos/ai/home/tools`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 路特助手通知相关
   * @name LuteosAiNotifyAllLabel
   * @summary 所有通知分类信息
   * @request GET:/api/luteos/ai/notify/allLabel
   * @response `200` `NotifyAllLabelResp` OK
   */
  luteosAiNotifyAllLabel = (
    query: {
      /**
       * -1-删除 0-草稿 1-已发布 2-下架 3-待发布
       * @format int32
       * @example 1
       */
      state: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<NotifyAllLabelResp, any>({
      path: `/api/luteos/ai/notify/allLabel`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 路特助手通知相关
   * @name LuteosAiNotifyAllNotifyLabel
   * @summary 用户所有通知分类信息
   * @request GET:/api/luteos/ai/notify/allNotifyLabel
   * @response `200` `NotifyAllLabelResp` OK
   */
  luteosAiNotifyAllNotifyLabel = (params: RequestParams = {}) =>
    this.request<NotifyAllLabelResp, any>({
      path: `/api/luteos/ai/notify/allNotifyLabel`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 路特助手通知相关
   * @name LuteosAiNotifyDetail
   * @summary 通知详情
   * @request GET:/api/luteos/ai/notify/detail
   * @response `200` `NotifyDetailBean` OK
   */
  luteosAiNotifyDetail = (
    query: {
      /** 通知编码 */
      notifyCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<NotifyDetailBean, any>({
      path: `/api/luteos/ai/notify/detail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 路特助手通知相关
   * @name LuteosAiNotifyIfNewNotify
   * @summary 用户获取是否有新通知
   * @request GET:/api/luteos/ai/notify/ifNewNotify
   * @response `200` `IfNewNotifyResp` OK
   */
  luteosAiNotifyIfNewNotify = (
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
      path: `/api/luteos/ai/notify/ifNewNotify`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 路特助手通知相关
   * @name LuteosAiNotifyList
   * @summary 通知列表
   * @request POST:/api/luteos/ai/notify/list
   * @response `200` `NotifyListResp` OK
   */
  luteosAiNotifyList = (req: NotifyListReq, params: RequestParams = {}) =>
    this.request<NotifyListResp, any>({
      path: `/api/luteos/ai/notify/list`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 路特助手通知相关
   * @name LuteosAiNotifyNotifyReport
   * @summary 用户通知操作上报
   * @request POST:/api/luteos/ai/notify/notifyReport
   * @response `200` `CommonRespObject` OK
   */
  luteosAiNotifyNotifyReport = (req: NotifyReportReq, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/ai/notify/notifyReport`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 路特助手通知相关
   * @name LuteosAiNotifySaveOrUpdate
   * @summary 新增/更新通知
   * @request POST:/api/luteos/ai/notify/saveOrUpdate
   * @response `200` `CommonRespVoid` OK
   */
  luteosAiNotifySaveOrUpdate = (req: NotifySaveReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/ai/notify/saveOrUpdate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 路特助手通知相关
   * @name LuteosAiNotifyState
   * @summary 通知状态修改
   * @request POST:/api/luteos/ai/notify/state
   * @response `200` `CommonRespVoid` OK
   */
  luteosAiNotifyState = (req: NotifySetStateReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/ai/notify/state`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 路特助手通知相关
   * @name LuteosAiNotifyUserNotifyDetail
   * @summary 用户通知详情
   * @request GET:/api/luteos/ai/notify/userNotifyDetail
   * @response `200` `UserNotifyDetailBean` OK
   */
  luteosAiNotifyUserNotifyDetail = (
    query: {
      /** 通知编码 */
      notifyCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<UserNotifyDetailBean, any>({
      path: `/api/luteos/ai/notify/userNotifyDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 路特助手通知相关
   * @name LuteosAiNotifyUserNotifyList
   * @summary 用户通知列表
   * @request GET:/api/luteos/ai/notify/userNotifyList
   * @response `200` `UserNotifyListResp` OK
   */
  luteosAiNotifyUserNotifyList = (
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
      path: `/api/luteos/ai/notify/userNotifyList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 路特助手系统相关
   * @name LuteosAiSystemDeleteLog
   * @summary 操作日志删除
   * @request POST:/api/luteos/ai/system/deleteLog
   * @response `200` `CommonRespVoid` OK
   */
  luteosAiSystemDeleteLog = (req: ReportLogReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/ai/system/deleteLog`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 路特助手系统相关
   * @name LuteosAiSystemReportLog
   * @summary 操作日志上报
   * @request POST:/api/luteos/ai/system/reportLog
   * @response `200` `CommonRespVoid` OK
   */
  luteosAiSystemReportLog = (req: ReportLogReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/ai/system/reportLog`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
}
