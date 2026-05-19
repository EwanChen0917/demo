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

export namespace Api {
  /**
   * No description
   * @tags 路特智能体后台配置
   * @name LuteosAiAgentAdminDetail
   * @summary 路特智能体详情
   * @request GET:/api/luteos/ai/agent/admin/detail
   * @response `200` `AgentAdminDetailBean` OK
   */
  export namespace LuteosAiAgentAdminDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 智能体编码 */
      agentCode?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = AgentAdminDetailBean;
  }

  /**
   * No description
   * @tags 路特智能体后台配置
   * @name LuteosAiAgentAdminList
   * @summary 路特智能体列表
   * @request GET:/api/luteos/ai/agent/admin/list
   * @response `200` `AgentListResp` OK
   */
  export namespace LuteosAiAgentAdminList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = AgentListResp;
  }

  /**
   * No description
   * @tags 路特智能体后台配置
   * @name LuteosAiAgentAdminUpdate
   * @summary 编辑智能体
   * @request POST:/api/luteos/ai/agent/admin/update
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosAiAgentAdminUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AgentUpdateReq;
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
   * @tags 路特智能体
   * @name LuteosAiAgentDetail
   * @summary 路特智能体详情
   * @request GET:/api/luteos/ai/agent/detail
   * @response `200` `AgentDetailBean` OK
   */
  export namespace LuteosAiAgentDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 智能体编码 */
      agentCode?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = AgentDetailBean;
  }

  /**
   * No description
   * @tags 路特智能体
   * @name LuteosAiAgentList
   * @summary 路特智能体列表
   * @request GET:/api/luteos/ai/agent/list
   * @response `200` `AgentListResp` OK
   */
  export namespace LuteosAiAgentList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = AgentListResp;
  }

  /**
   * No description
   * @tags 路特智能体
   * @name LuteosAiAgentQueryHistoryChats
   * @summary 获取所有历史会话记录
   * @request GET:/api/luteos/ai/agent/queryHistoryChats
   * @response `200` `AgentHistoryChatsResp` OK
   */
  export namespace LuteosAiAgentQueryHistoryChats {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = AgentHistoryChatsResp;
  }

  /**
   * No description
   * @tags 路特智能体
   * @name LuteosAiAgentRecentChatList
   * @summary 最近聊天列表
   * @request GET:/api/luteos/ai/agent/recentChatList
   * @response `200` `RecentChatListResp` OK
   */
  export namespace LuteosAiAgentRecentChatList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = RecentChatListResp;
  }

  /**
   * No description
   * @tags 路特助手首页
   * @name LuteosAiHomeAgents
   * @summary 路特智能体
   * @request GET:/api/luteos/ai/home/agents
   * @response `200` `HomeAgentsResp` OK
   */
  export namespace LuteosAiHomeAgents {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = HomeAgentsResp;
  }

  /**
   * No description
   * @tags 路特助手首页
   * @name LuteosAiHomeTools
   * @summary 效率工具
   * @request GET:/api/luteos/ai/home/tools
   * @response `200` `HomeToolsResp` OK
   */
  export namespace LuteosAiHomeTools {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = HomeToolsResp;
  }

  /**
   * No description
   * @tags 路特助手通知相关
   * @name LuteosAiNotifyAllLabel
   * @summary 所有通知分类信息
   * @request GET:/api/luteos/ai/notify/allLabel
   * @response `200` `NotifyAllLabelResp` OK
   */
  export namespace LuteosAiNotifyAllLabel {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * -1-删除 0-草稿 1-已发布 2-下架 3-待发布
       * @format int32
       * @example 1
       */
      state: number;
    };
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
   * @tags 路特助手通知相关
   * @name LuteosAiNotifyAllNotifyLabel
   * @summary 用户所有通知分类信息
   * @request GET:/api/luteos/ai/notify/allNotifyLabel
   * @response `200` `NotifyAllLabelResp` OK
   */
  export namespace LuteosAiNotifyAllNotifyLabel {
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
   * @tags 路特助手通知相关
   * @name LuteosAiNotifyDetail
   * @summary 通知详情
   * @request GET:/api/luteos/ai/notify/detail
   * @response `200` `NotifyDetailBean` OK
   */
  export namespace LuteosAiNotifyDetail {
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
    export type ResponseBody = NotifyDetailBean;
  }

  /**
   * No description
   * @tags 路特助手通知相关
   * @name LuteosAiNotifyIfNewNotify
   * @summary 用户获取是否有新通知
   * @request GET:/api/luteos/ai/notify/ifNewNotify
   * @response `200` `IfNewNotifyResp` OK
   */
  export namespace LuteosAiNotifyIfNewNotify {
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
   * @tags 路特助手通知相关
   * @name LuteosAiNotifyList
   * @summary 通知列表
   * @request POST:/api/luteos/ai/notify/list
   * @response `200` `NotifyListResp` OK
   */
  export namespace LuteosAiNotifyList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = NotifyListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = NotifyListResp;
  }

  /**
   * No description
   * @tags 路特助手通知相关
   * @name LuteosAiNotifyNotifyReport
   * @summary 用户通知操作上报
   * @request POST:/api/luteos/ai/notify/notifyReport
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosAiNotifyNotifyReport {
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
   * @tags 路特助手通知相关
   * @name LuteosAiNotifySaveOrUpdate
   * @summary 新增/更新通知
   * @request POST:/api/luteos/ai/notify/saveOrUpdate
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosAiNotifySaveOrUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = NotifySaveReq;
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
   * @tags 路特助手通知相关
   * @name LuteosAiNotifyState
   * @summary 通知状态修改
   * @request POST:/api/luteos/ai/notify/state
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosAiNotifyState {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = NotifySetStateReq;
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
   * @tags 路特助手通知相关
   * @name LuteosAiNotifyUserNotifyDetail
   * @summary 用户通知详情
   * @request GET:/api/luteos/ai/notify/userNotifyDetail
   * @response `200` `UserNotifyDetailBean` OK
   */
  export namespace LuteosAiNotifyUserNotifyDetail {
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
   * @tags 路特助手通知相关
   * @name LuteosAiNotifyUserNotifyList
   * @summary 用户通知列表
   * @request GET:/api/luteos/ai/notify/userNotifyList
   * @response `200` `UserNotifyListResp` OK
   */
  export namespace LuteosAiNotifyUserNotifyList {
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
   * @tags 路特助手系统相关
   * @name LuteosAiSystemDeleteLog
   * @summary 操作日志删除
   * @request POST:/api/luteos/ai/system/deleteLog
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosAiSystemDeleteLog {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ReportLogReq;
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
   * @tags 路特助手系统相关
   * @name LuteosAiSystemReportLog
   * @summary 操作日志上报
   * @request POST:/api/luteos/ai/system/reportLog
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosAiSystemReportLog {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ReportLogReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespVoid;
  }
}
