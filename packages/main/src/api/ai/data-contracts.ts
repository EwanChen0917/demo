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

/** AgentAdminDetailBean */
export interface AgentAdminDetailBean {
  /** 工作成果 */
  achievementExperiences?: AgentExperienceBean[];
  /** 智能体编码 */
  agentCode?: string;
  /** 智能体名称 */
  agentName?: string;
  /** 智能体类型 */
  agentType?: string;
  /** 适用场景 */
  applicableScopes?: string[];
  /** 工作经历 */
  courseExperiences?: AgentExperienceBean[];
  /** 封面图 */
  cover?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 部门 */
  department?: string;
  /** 智能体描述 */
  description?: string;
  /** Dify的api密钥 */
  difyApiKey?: string;
  /** Dify的appid */
  difyAppId?: string;
  /**
   * Dify平台域名
   * @example "dify.luteos.com"
   */
  difyHost?: string;
  /**
   * 智能体链接
   * @example "https://dify.luteos.com/app/ddba4d16-e1ef-4203-8e6c-202b79702dfe/workflow"
   */
  difyUrl?: string;
  /**
   * 智能体ID
   * @format int64
   */
  id?: number;
  /**
   * 是否管理员
   * @example true
   */
  isManager?: boolean;
  /**
   * 是否超级管理员
   * @example true
   */
  isSuperAdmin?: boolean;
  /**
   * 最新启用时间
   * @format date-time
   */
  lastEnableTime?: string;
  /** logo */
  logo?: string;
  /** 管理员用户编码，逗号分隔 */
  managerMembers?: string[];
  /** 可见用户编码，逗号分隔 */
  members?: string[];
  /**
   * 是否可联网 1-可联网 0-不可联网
   * @format int32
   */
  networkEnable?: number;
  /** 姓名 */
  nickname?: string;
  /** 可见范围 all-全员 member-指定用户 */
  scope?: string;
  /** 技能 */
  skills?: AgentSkillBean[];
  /**
   * 排序字段
   * @format int32
   */
  sort?: number;
  /**
   * 状态 1-启用 0-禁用
   * @format int32
   */
  status?: number;
  /** 推荐问题 */
  suggestedQuestions?: string[];
  /**
   * 是否可思考 1-可思考 0-不可思考
   * @format int32
   */
  thinkable?: number;
}

/** AgentDetailBean */
export interface AgentDetailBean {
  /** 工作成果 */
  achievementExperiences?: AgentExperienceBean[];
  /** 智能体编码 */
  agentCode?: string;
  /** 智能体名称 */
  agentName?: string;
  /** 智能体类型 */
  agentType?: string;
  /** 适用场景 */
  applicableScopes?: string[];
  /** 工作经历 */
  courseExperiences?: AgentExperienceBean[];
  /** 封面图 */
  cover?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 部门 */
  department?: string;
  /** 智能体描述 */
  description?: string;
  /** Dify的API密钥 */
  difyApiKey?: string;
  /** Dify的appid */
  difyAppId?: string;
  /**
   * Dify平台域名
   * @example "dify.luteos.com"
   */
  difyHost?: string;
  /**
   * 智能体ID
   * @format int64
   */
  id?: number;
  /**
   * 最新启用时间
   * @format date-time
   */
  lastEnableTime?: string;
  /** logo */
  logo?: string;
  /**
   * 是否可联网 1-可联网 0-不可联网
   * @format int32
   */
  networkEnable?: number;
  /** 姓名 */
  nickname?: string;
  /** 技能 */
  skills?: AgentSkillBean[];
  /**
   * 状态 1-启用 0-禁用
   * @format int32
   */
  status?: number;
  /** 推荐问题 */
  suggestedQuestions?: string[];
  /**
   * 是否可思考 1-可思考 0-不可思考
   * @format int32
   */
  thinkable?: number;
}

/** AgentExperienceBean */
export interface AgentExperienceBean {
  /**
   * 获取日期
   * @format date
   */
  date?: string;
  /** 智能体经历编码 */
  experienceCode?: string;
  /** 经历描述 */
  experienceDesc?: string;
  /** 经历标题 */
  experienceTitle?: string;
  /**
   * 智能体经历ID
   * @format int64
   */
  id?: number;
}

/** AgentHistoryChatBean */
export interface AgentHistoryChatBean {
  /** 智能体信息 */
  agent?: HomeAgentBean;
  /**
   * 创建时间
   * @format int64
   */
  createdAt?: number;
  /** 第一条对话信息 */
  firstMessage?: AgentMessageBean;
  /**
   * 会话id
   * @format uuid
   */
  id?: string;
  /** inputs */
  inputs?: string;
  /** introduction */
  introduction?: string;
  /** name */
  name?: string;
  /** 状态 */
  status?: string;
  /**
   * 更新时间
   * @format int64
   */
  updatedAt?: number;
}

/** AgentHistoryChatsResp */
export interface AgentHistoryChatsResp {
  /** 智能体历史会话列表 */
  agentHistoryList?: AgentHistoryChatBean[];
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** AgentListBean */
export interface AgentListBean {
  /** 智能体编码 */
  agentCode?: string;
  /** 智能体名称 */
  agentName?: string;
  /** 智能体类型 */
  agentType?: string;
  /** 封面图 */
  cover?: string;
  /** 部门 */
  department?: string;
  /** 智能体描述 */
  description?: string;
  /** Dify的API密钥 */
  difyApiKey?: string;
  /** Dify的appid */
  difyAppId?: string;
  /**
   * Dify平台域名
   * @example "dify.luteos.com"
   */
  difyHost?: string;
  /**
   * 智能体ID
   * @format int64
   */
  id?: number;
  /**
   * 最新启用时间
   * @format date-time
   */
  lastEnableTime?: string;
  /** logo */
  logo?: string;
  /**
   * 是否可联网 1-可联网 0-不可联网
   * @format int32
   */
  networkEnable?: number;
  /** 姓名 */
  nickname?: string;
  /** 技能 */
  skills?: AgentSkillBean[];
  /**
   * 状态 1-启用 0-禁用
   * @format int32
   */
  status?: number;
  /**
   * 是否可思考 1-可思考 0-不可思考
   * @format int32
   */
  thinkable?: number;
}

/** AgentListResp */
export interface AgentListResp {
  /** 智能体列表 */
  agentList?: AgentListBean[];
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** AgentMessageBean */
export interface AgentMessageBean {
  /** answer */
  answer?: string;
  /** inputs */
  inputs?: string;
  /** message */
  message?: string;
  /** query */
  query?: string;
}

/** AgentSkillBean */
export interface AgentSkillBean {
  /**
   * 技能名称
   * @example "需求分析"
   */
  name?: string;
  /**
   * 状态 0-学习中 1-已完成
   * @format int32
   * @example 1
   */
  status?: number;
}

/** AgentUpdateReq */
export interface AgentUpdateReq {
  /** 智能体编码 */
  agentCode?: string;
  /** 智能体岗位 */
  agentName?: string;
  /** 封面图 */
  cover?: string;
  /**
   * 部门
   * @example "信息技术中心"
   */
  department?: string;
  /** 智能体简介 */
  description?: string;
  /** API密钥 */
  difyApiKey?: string;
  /** 智能体链接 */
  difyUrl?: string;
  /** logo */
  logo?: string;
  /** 管理员编码列表 */
  managerMembers?: string[];
  /** 可见成员编码列表 */
  members?: string[];
  /**
   * 是否可联网
   * @format int32
   * @example 1
   */
  networkEnable?: number;
  /** 智能体名称 */
  nickname?: string;
  /**
   * 可见范围 all-全员 member-指定成员
   * @example "all"
   */
  scope?: string;
  /** 技能 */
  skills?: AgentSkillBean[];
  /**
   * 排序(越小越前)
   * @format int32
   */
  sort?: number;
  /**
   * 是否启用
   * @format int32
   * @example 1
   */
  status?: number;
  /** 推荐问题 */
  suggestedQuestions?: string[];
  /**
   * 是否可深度思考
   * @format int32
   * @example 1
   */
  thinkable?: number;
}

/** HomeAgentBean */
export interface HomeAgentBean {
  /** 智能体编码 */
  agentCode?: string;
  /** 智能体名称 */
  agentName?: string;
  /** 智能体类型 */
  agentType?: string;
  /** 部门 */
  department?: string;
  /** 智能体描述 */
  description?: string;
  /** Dify的API密钥 */
  difyApiKey?: string;
  /** Dify的appid */
  difyAppId?: string;
  /**
   * Dify平台域名
   * @example "dify.luteos.com"
   */
  difyHost?: string;
  /**
   * 智能体ID
   * @format int64
   */
  id?: number;
  /** logo */
  logo?: string;
  /**
   * 是否可联网 1-可联网 0-不可联网
   * @format int32
   */
  networkEnable?: number;
  /**
   * 是否可思考 1-可思考 0-不可思考
   * @format int32
   */
  thinkable?: number;
}

/** HomeAgentsResp */
export interface HomeAgentsResp {
  /** 智能体列表 */
  agents?: HomeAgentBean[];
}

/** HomeToolBean */
export interface HomeToolBean {
  /** 工具描述 */
  description?: string;
  /**
   * 跳转类型
   * @format int32
   */
  linkType?: number;
  /** 跳转地址 */
  linkUrl?: string;
  /** logo */
  logo?: string;
  /** 工具标题 */
  title?: string;
}

/** HomeToolsResp */
export interface HomeToolsResp {
  /** 效率工具列表 */
  tools?: HomeToolBean[];
}

/** IfNewNotifyResp */
export interface IfNewNotifyResp {
  /**
   * 是否有新通知
   * @example true
   */
  fresh?: boolean;
}

/** NotifyAllLabelBean */
export interface NotifyAllLabelBean {
  /** 分类标签编码 */
  labelCode?: string;
  /** 分类标签名 */
  labelName?: string;
  /**
   * 分类标签下的通知数
   * @format int32
   */
  notifyCount?: number;
}

/** NotifyAllLabelResp */
export interface NotifyAllLabelResp {
  /** 分类标签信息列表 */
  labelList?: NotifyAllLabelBean[];
}

/** NotifyAttachmentBean */
export interface NotifyAttachmentBean {
  /** 文件key */
  fileKey: string;
  /** 文件名称 */
  fileName: string;
  /**
   * 文件大小（字节）
   * @example 1024
   */
  fileSize: string;
}

/** NotifyDetailBean */
export interface NotifyDetailBean {
  /** 附件列表 */
  attachmentList?: NotifyAttachmentBean[];
  /**
   * 作者
   * @example "路特创新"
   */
  author?: string;
  /** 内容 */
  content?: string;
  /** 封面图路径 */
  coverPath?: string;
  /** 封面图地址 */
  coverUrl?: string;
  /**
   * 创建时间
   * @format date-time
   * @example "2025-05-01 00:00:00"
   */
  createTime?: string;
  /** 可见部门id列表 */
  deptIdList?: number[];
  /** 详情链接 */
  detailUrl?: string;
  /**
   * 是否置顶 1-置顶 0非置顶
   * @format int32
   * @example 0
   */
  isTop?: number;
  /**
   * 分类编码
   * @example "L2025042110354397130635"
   */
  labelCode?: string;
  /**
   * 分类名称
   * @example "公司公告"
   */
  labelName?: string;
  /** 唯一编码 */
  notifyCode?: string;
  /**
   * 发布时间
   * @format date-time
   * @example "2025-05-01 00:00"
   */
  publishTime?: string;
  /**
   * 是否定时 0-立即发送 1-定时发布
   * @format int32
   * @example 0
   */
  scheduled?: number;
  /**
   * 定时发布时间
   * @format date-time
   * @example "2025-05-01 00:00"
   */
  scheduledTime?: string;
  /**
   * -1-删除 0-草稿 1-已发布 2-下架 3-待发布
   * @format int32
   * @example 0
   */
  state?: number;
  /** 标题 */
  title?: string;
  /**
   * 修改时间
   * @format date-time
   * @example "2025-05-01 00:00:00"
   */
  updateTime?: string;
}

/** NotifyListBean */
export interface NotifyListBean {
  /**
   * 作者
   * @example "路特创新"
   */
  author?: string;
  /** 内容 */
  content?: string;
  /** 封面图路径 */
  coverPath?: string;
  /** 封面图地址 */
  coverUrl?: string;
  /**
   * 创建时间
   * @format date-time
   * @example "2025-05-01 00:00:00"
   */
  createTime?: string;
  /**
   * 是否置顶 1-置顶 0非置顶
   * @format int32
   * @example 0
   */
  isTop?: number;
  /**
   * 分类编码
   * @example "L2025042110354397130635"
   */
  labelCode?: string;
  /**
   * 分类名称
   * @example "公司公告"
   */
  labelName?: string;
  /** 唯一编码 */
  notifyCode?: string;
  /**
   * 发布时间
   * @format date-time
   * @example "2025-05-01 00:00"
   */
  publishTime?: string;
  /**
   * 是否定时 0-立即发送 1-定时发布
   * @format int32
   * @example 0
   */
  scheduled?: number;
  /**
   * 定时发布时间
   * @format date-time
   * @example "2025-05-01 00:00"
   */
  scheduledTime?: string;
  /**
   * -1-删除 0-草稿 1-已发布 2-下架 3-待发布
   * @format int32
   * @example 0
   */
  state?: number;
  /** 标题 */
  title?: string;
  /**
   * 修改时间
   * @format date-time
   * @example "2025-05-01 00:00:00"
   */
  updateTime?: string;
}

/** NotifyListReq */
export interface NotifyListReq {
  /** 搜索关键词 */
  keyword?: string;
  /** 分类标签编码 */
  labelCodes?: string[];
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
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 状态 */
  states?: number[];
}

/** NotifyListResp */
export interface NotifyListResp {
  code?: string;
  message?: string;
  /** 通知列表 */
  notifyList?: NotifyListBean[];
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** NotifyReportReq */
export interface NotifyReportReq {
  /** 用户编码 */
  memberCode: string;
  /** 通知编码 */
  notifyCode: string;
  /** 操作类型 我知道-known 查看详情-detail */
  operateType: string;
}

/** NotifySaveReq */
export interface NotifySaveReq {
  /** 附件列表 */
  attachmentList?: NotifyAttachmentBean[];
  /**
   * 作者
   * @example "路特创新"
   */
  author: string;
  /** 正文 */
  content?: string;
  /** 封面图路径 */
  coverPath?: string;
  /** 可见部门id列表 */
  deptIdList: number[];
  /** 跳转url */
  detailUrl?: string;
  /**
   * 是否置顶 1-置顶 0非置顶
   * @format int32
   * @example 0
   */
  isTop?: number;
  /**
   * 分类编码
   * @example "L2025042110354397130635"
   */
  labelCode?: string;
  /** 通知编码 */
  notifyCode?: string;
  /**
   * 发布时间
   * @format date-time
   * @example "2025-05-01 00:00"
   */
  publishTime?: string;
  /**
   * 0-立即发送 1-定时发布
   * @format int32
   * @example 0
   */
  scheduled?: number;
  /**
   * 定时发布时间
   * @format date-time
   * @example "2025-05-01 00:00"
   */
  scheduledTime?: string;
  /**
   * -1-删除 0-草稿 1-已发布 2-下架 3-待发布
   * @format int32
   * @example 0
   */
  state?: number;
  /** 标题 */
  title: string;
}

/** NotifySetStateReq */
export interface NotifySetStateReq {
  /** 通知编码 */
  notifyCode: string;
  /**
   * 是否定时 0-立即发送 1-定时发布
   * @format int32
   * @example 0
   */
  scheduled?: number;
  /**
   * -1-删除 0-草稿 1-已发布 2-下架
   * @format int32
   * @example 0
   */
  state: number;
}

/** RecentChatListResp */
export interface RecentChatListResp {
  /** 智能体最近对话列表 */
  agentList?: HomeAgentBean[];
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** ReportLogReq */
export interface ReportLogReq {
  /** 额外信息,json格式 */
  extraInfo?: string;
  /**
   * hr_helper oa_helper等
   * @example "oa_helper"
   */
  itemCode: string;
  /**
   * agent 等
   * @example "agent"
   */
  itemType: string;
  /**
   * 智能体聊天-agent_talk
   * @example "agent_talk"
   */
  operationType: string;
  /**
   * 是否覆盖，默认true true-覆盖 false-新增
   * @example true
   */
  overwrite?: boolean;
}

/** UserNotifyDetailBean */
export interface UserNotifyDetailBean {
  /** 附件列表 */
  attachmentList?: NotifyAttachmentBean[];
  /**
   * 作者
   * @example "路特创新"
   */
  author?: string;
  /** 内容 */
  content?: string;
  /** 封面图路径 */
  coverPath?: string;
  /** 封面图地址 */
  coverUrl?: string;
  /**
   * 创建时间
   * @format date-time
   * @example "2025-05-01 00:00:00"
   */
  createTime?: string;
  /** 详情链接 */
  detailUrl?: string;
  /**
   * 是否置顶 1-置顶 0非置顶
   * @format int32
   * @example 0
   */
  isTop?: number;
  /**
   * 分类编码
   * @example "L2025042110354397130635"
   */
  labelCode?: string;
  /**
   * 分类名称
   * @example "公司公告"
   */
  labelName?: string;
  /** 唯一编码 */
  notifyCode?: string;
  /**
   * 发布时间
   * @format date-time
   * @example "2025-05-01 00:00"
   */
  publishTime?: string;
  /**
   * 是否定时 0-立即发送 1-定时发布
   * @format int32
   * @example 0
   */
  scheduled?: number;
  /**
   * 定时发布时间
   * @format date-time
   * @example "2025-05-01 00:00"
   */
  scheduledTime?: string;
  /**
   * -1-删除 0-草稿 1-已发布 2-下架 3-待发布
   * @format int32
   * @example 0
   */
  state?: number;
  /** 标题 */
  title?: string;
  /**
   * 修改时间
   * @format date-time
   * @example "2025-05-01 00:00:00"
   */
  updateTime?: string;
}

/** UserNotifyListBean */
export interface UserNotifyListBean {
  /**
   * 作者
   * @example "路特创新"
   */
  author?: string;
  /** 内容 */
  content?: string;
  /** 封面图路径 */
  coverPath?: string;
  /** 封面图地址 */
  coverUrl?: string;
  /**
   * 创建时间
   * @format date-time
   * @example "2025-05-01 00:00:00"
   */
  createTime?: string;
  /**
   * 是否置顶 1-置顶 0非置顶
   * @format int32
   * @example 0
   */
  isTop?: number;
  /**
   * 分类编码
   * @example "L2025042110354397130635"
   */
  labelCode?: string;
  /**
   * 分类名称
   * @example "公司公告"
   */
  labelName?: string;
  /** 唯一编码 */
  notifyCode?: string;
  /**
   * 发布时间
   * @format date-time
   * @example "2025-05-01 00:00"
   */
  publishTime?: string;
  /**
   * 是否定时 0-立即发送 1-定时发布
   * @format int32
   * @example 0
   */
  scheduled?: number;
  /**
   * 定时发布时间
   * @format date-time
   * @example "2025-05-01 00:00"
   */
  scheduledTime?: string;
  /**
   * -1-删除 0-草稿 1-已发布 2-下架 3-待发布
   * @format int32
   * @example 0
   */
  state?: number;
  /** 标题 */
  title?: string;
  /**
   * 修改时间
   * @format date-time
   * @example "2025-05-01 00:00:00"
   */
  updateTime?: string;
}

/** UserNotifyListResp */
export interface UserNotifyListResp {
  code?: string;
  message?: string;
  /** 通知列表 */
  notifyList?: UserNotifyListBean[];
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** CommonResp«Void» */
export interface CommonRespVoid {
  code?: string;
  enMessage?: string;
  message?: string;
  traceId?: string;
}

/** CommonResp«object» */
export interface CommonRespObject {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: object;
  traceId?: string;
}
