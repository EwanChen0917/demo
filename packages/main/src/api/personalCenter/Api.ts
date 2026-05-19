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
  AccountDetailResp,
  AccountPwdLoginReq,
  AccountQueryListReq,
  AccountSaveReq,
  AuthCallbackReq,
  AuthCallbackResp,
  AuthInfoQueryResp,
  ChangeAccountStatusQueryReq,
  ChangeMasterUserReq,
  ChangeRoleUserReq,
  ChangeUserRoleReq,
  CommonResp,
  CommonRespAccountQueryListResp,
  CommonRespInt,
  CommonRespMapStringListMemberBean,
  CommonRespObject,
  CommonRespVoid,
  DeptMemberListQueryResp,
  DeptMemberMapQueryReq,
  DeptTreeQueryResp,
  LoginTokenResp,
  MdpCodeResp,
  MemberBean,
  MemberCenterModuleListResp,
  MemberCollectBatchSaveReq,
  MemberCollectListQueryResp,
  MemberCollectQueryResp,
  MemberCollectSaveReq,
  MemberCollectSysListQueryResp,
  MemberDataCacheReq,
  MemberDetailQueryResp,
  MemberInfoQueryResp,
  MemberListByTitleResp,
  MemberListQueryResp,
  MemberMenuVisitSaveReq,
  MemberNameCheckReq,
  MemberSysSelectListQueryResp,
  MenuVisitListResp,
  RefreshVersionResp,
  RoleAccountResp,
  SecondLevelDeptResp,
  SendPasswordReq,
  SubDeptListQueryReq,
  SubDeptListQueryResp,
  SysReportReq,
  SystemNavListQueryResp,
  UpdatePasswordReq,
  UpdateUserInfoReq,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags 账户模块
   * @name LuteosMemberAddAccount
   * @summary 保存用户
   * @request POST:/api/luteos/member/addAccount
   * @response `200` `CommonRespVoid` OK
   */
  luteosMemberAddAccount = (req: AccountSaveReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/member/addAccount`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 账户模块
   * @name LuteosMemberAuthCallback
   * @summary 授权回调
   * @request POST:/api/luteos/member/authCallback
   * @response `200` `AuthCallbackResp` OK
   */
  luteosMemberAuthCallback = (req: AuthCallbackReq, params: RequestParams = {}) =>
    this.request<AuthCallbackResp, any>({
      path: `/api/luteos/member/authCallback`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 个人中心
   * @name LuteosMemberBatchSaveSysCollect
   * @summary 用户系统收藏批量保存接口
   * @request POST:/api/luteos/member/batchSaveSysCollect
   * @response `200` `CommonResp` OK
   */
  luteosMemberBatchSaveSysCollect = (req: MemberCollectBatchSaveReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/member/batchSaveSysCollect`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 账户模块
   * @name LuteosMemberChangeAccountStatus
   * @summary 变更账号状态
   * @request POST:/api/luteos/member/changeAccountStatus
   * @response `200` `CommonRespObject` OK
   */
  luteosMemberChangeAccountStatus = (
    req: ChangeAccountStatusQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/member/changeAccountStatus`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 账户模块
   * @name LuteosMemberChangeMasterUser
   * @summary 转移主账号
   * @request POST:/api/luteos/member/changeMasterUser
   * @response `200` `CommonRespVoid` OK
   */
  luteosMemberChangeMasterUser = (req: ChangeMasterUserReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/member/changeMasterUser`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 账户模块
   * @name LuteosMemberChangeRoleUser
   * @summary 角色添加员工或者移除员工
   * @request POST:/api/luteos/member/changeRoleUser
   * @response `200` `CommonRespVoid` OK
   */
  luteosMemberChangeRoleUser = (req: ChangeRoleUserReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/member/changeRoleUser`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 账户模块
   * @name LuteosMemberChangeUserRole
   * @summary 变更用户权限
   * @request POST:/api/luteos/member/changeUserRole
   * @response `200` `CommonRespVoid` OK
   */
  luteosMemberChangeUserRole = (req: ChangeUserRoleReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/member/changeUserRole`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 账户模块
   * @name LuteosMemberCheckMemberName
   * @summary 成员名称校验
   * @request POST:/api/luteos/member/checkMemberName
   * @response `200` `void` OK
   */
  luteosMemberCheckMemberName = (req: MemberNameCheckReq, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/luteos/member/checkMemberName`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 账户模块
   * @name LuteosMemberLogin
   * @summary 登录
   * @request POST:/api/luteos/member/login
   * @response `200` `AuthCallbackResp` OK
   */
  luteosMemberLogin = (req: AccountPwdLoginReq, params: RequestParams = {}) =>
    this.request<AuthCallbackResp, any>({
      path: `/api/luteos/member/login`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 账户模块
   * @name LuteosMemberLoginWithDingtalk
   * @summary 钉钉静默登录
   * @request GET:/api/luteos/member/loginWithDingtalk
   * @response `200` `AuthCallbackResp` OK
   */
  luteosMemberLoginWithDingtalk = (
    query: {
      /** dingCode */
      dingCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<AuthCallbackResp, any>({
      path: `/api/luteos/member/loginWithDingtalk`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 账户模块
   * @name LuteosMemberLogout
   * @summary 退出登录
   * @request POST:/api/luteos/member/logout
   * @response `200` `void` OK
   */
  luteosMemberLogout = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/luteos/member/logout`,
      method: 'POST',
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 账户模块
   * @name LuteosMemberMemberDataCache
   * @summary 用户数据登记
   * @request POST:/api/luteos/member/memberDataCache
   * @response `200` `void` OK
   */
  luteosMemberMemberDataCache = (req: MemberDataCacheReq, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/luteos/member/memberDataCache`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 账户模块
   * @name LuteosMemberQueryAccountDetail
   * @summary 获取用户账号详情
   * @request GET:/api/luteos/member/queryAccountDetail
   * @response `200` `AccountDetailResp` OK
   */
  luteosMemberQueryAccountDetail = (
    query?: {
      /** 账号编码 */
      accountCode?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<AccountDetailResp, any>({
      path: `/api/luteos/member/queryAccountDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 账户模块
   * @name LuteosMemberQueryAccountMemberList
   * @summary 获取用户管理列表
   * @request POST:/api/luteos/member/queryAccountMemberList
   * @response `200` `CommonRespAccountQueryListResp` OK
   */
  luteosMemberQueryAccountMemberList = (req: AccountQueryListReq, params: RequestParams = {}) =>
    this.request<CommonRespAccountQueryListResp, any>({
      path: `/api/luteos/member/queryAccountMemberList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 账户模块
   * @name LuteosMemberQueryAccountToken
   * @summary 获取用户授权token
   * @request GET:/api/luteos/member/queryAccountToken
   * @response `200` `LoginTokenResp` OK
   */
  luteosMemberQueryAccountToken = (
    query: {
      /** 用户账号编码 */
      accountCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<LoginTokenResp, any>({
      path: `/api/luteos/member/queryAccountToken`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 个人中心
   * @name LuteosMemberQueryAllSysTemList
   * @summary 路特数字化工具查询
   * @request GET:/api/luteos/member/queryAllSysTemList
   * @response `200` `MemberSysSelectListQueryResp` OK
   */
  luteosMemberQueryAllSysTemList = (
    query?: {
      /** 模块 */
      model?: string;
      /** 场景 */
      scene?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<MemberSysSelectListQueryResp, any>({
      path: `/api/luteos/member/queryAllSysTemList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 账户模块
   * @name LuteosMemberQueryAuthInfo
   * @summary 获取授权信息
   * @request GET:/api/luteos/member/queryAuthInfo
   * @response `200` `AuthInfoQueryResp` OK
   */
  luteosMemberQueryAuthInfo = (
    query: {
      /**
       * 授权类型 1-钉钉
       * @format int32
       */
      authType: number;
      /** 平台 kms用户端：kms；kms管理端：kmsAdmin 根据平台返回对应的回调地址 */
      platform: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<AuthInfoQueryResp, any>({
      path: `/api/luteos/member/queryAuthInfo`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 账户模块
   * @name LuteosMemberQueryCurrentUserInfo
   * @summary 获取当前成员信息
   * @request GET:/api/luteos/member/queryCurrentUserInfo
   * @response `200` `MemberBean` OK
   */
  luteosMemberQueryCurrentUserInfo = (params: RequestParams = {}) =>
    this.request<MemberBean, any>({
      path: `/api/luteos/member/queryCurrentUserInfo`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 账户模块
   * @name LuteosMemberQueryCurrentUserInfoByDingCode
   * @summary 获取当前成员信息
   * @request GET:/api/luteos/member/queryCurrentUserInfoByDingCode
   * @response `200` `MemberBean` OK
   */
  luteosMemberQueryCurrentUserInfoByDingCode = (
    query: {
      /** dingCode */
      dingCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<MemberBean, any>({
      path: `/api/luteos/member/queryCurrentUserInfoByDingCode`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 账户模块
   * @name LuteosMemberQueryDeptMemberList
   * @summary 获取部门下所有成员
   * @request GET:/api/luteos/member/queryDeptMemberList
   * @response `200` `DeptMemberListQueryResp` OK
   */
  luteosMemberQueryDeptMemberList = (
    query?: {
      /**
       * 部门id
       * @format int64
       */
      deptId?: number;
      /** 操作业务部门编码 */
      operatorDepartmentCode?: string;
      /** 是否查询子部门 */
      searchChildDept?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<DeptMemberListQueryResp, any>({
      path: `/api/luteos/member/queryDeptMemberList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 账户模块
   * @name LuteosMemberQueryDeptMemberMap
   * @summary 获取部门下所有成员(批量code)
   * @request POST:/api/luteos/member/queryDeptMemberMap
   * @response `200` `CommonRespMapStringListMemberBean` OK
   */
  luteosMemberQueryDeptMemberMap = (req: DeptMemberMapQueryReq, params: RequestParams = {}) =>
    this.request<CommonRespMapStringListMemberBean, any>({
      path: `/api/luteos/member/queryDeptMemberMap`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 账户模块
   * @name LuteosMemberQueryDeptMemberNewList
   * @summary 获取部门下所有成员
   * @request GET:/api/luteos/member/queryDeptMemberNewList
   * @response `200` `DeptMemberListQueryResp` OK
   */
  luteosMemberQueryDeptMemberNewList = (
    query?: {
      /**
       * 部门id
       * @format int64
       */
      deptId?: number;
      /** 操作业务部门编码 */
      operatorDepartmentCode?: string;
      /** 是否查询子部门 */
      searchChildDept?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<DeptMemberListQueryResp, any>({
      path: `/api/luteos/member/queryDeptMemberNewList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 账户模块
   * @name LuteosMemberQueryDeptMemberTree
   * @summary 查询部门以及用户
   * @request GET:/api/luteos/member/queryDeptMemberTree
   * @response `200` `RoleAccountResp` OK
   */
  luteosMemberQueryDeptMemberTree = (params: RequestParams = {}) =>
    this.request<RoleAccountResp, any>({
      path: `/api/luteos/member/queryDeptMemberTree`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 账户模块
   * @name LuteosMemberQueryDeptTree
   * @summary 获取部门树结构
   * @request GET:/api/luteos/member/queryDeptTree
   * @response `200` `DeptTreeQueryResp` OK
   */
  luteosMemberQueryDeptTree = (
    query?: {
      /**
       * 部门 id, 为空时查询所有部门
       * @format int64
       */
      deptId?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<DeptTreeQueryResp, any>({
      path: `/api/luteos/member/queryDeptTree`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 账户模块
   * @name LuteosMemberQueryGtmMemberList
   * @summary 获取部门下所有GTM负责人
   * @request GET:/api/luteos/member/queryGtmMemberList
   * @response `200` `DeptMemberListQueryResp` OK
   */
  luteosMemberQueryGtmMemberList = (
    query?: {
      /**
       * 部门id
       * @format int64
       */
      deptId?: number;
      /** 操作业务部门编码 */
      operatorDepartmentCode?: string;
      /** 是否查询子部门 */
      searchChildDept?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<DeptMemberListQueryResp, any>({
      path: `/api/luteos/member/queryGtmMemberList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 账户模块
   * @name LuteosMemberQueryLastVersionSync
   * @summary 查询发版通知标记
   * @request GET:/api/luteos/member/queryLastVersionSync
   * @response `200` `RefreshVersionResp` OK
   */
  luteosMemberQueryLastVersionSync = (
    query: {
      /** 平台类型 */
      platform: string;
      /**
       * 提醒类型 0-发版通知 1-新品机会列表新手指引  2-新品机会参数配置 新手指引 3-新品机会运行与结果详情新手指引
       * @format int32
       */
      refreshType?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<RefreshVersionResp, any>({
      path: `/api/luteos/member/queryLastVersionSync`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 账户模块
   * @name LuteosMemberQueryManageMemberList
   * @summary 获取当前成员所管成员列表
   * @request GET:/api/luteos/member/queryManageMemberList
   * @response `200` `MemberListQueryResp` OK
   */
  luteosMemberQueryManageMemberList = (params: RequestParams = {}) =>
    this.request<MemberListQueryResp, any>({
      path: `/api/luteos/member/queryManageMemberList`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 账户模块
   * @name LuteosMemberQueryMdpCode
   * @summary 获取MDP的token
   * @request POST:/api/luteos/member/queryMdpCode
   * @response `200` `MdpCodeResp` OK
   */
  luteosMemberQueryMdpCode = (params: RequestParams = {}) =>
    this.request<MdpCodeResp, any>({
      path: `/api/luteos/member/queryMdpCode`,
      method: 'POST',
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 个人中心
   * @name LuteosMemberQueryMemberCenterModule
   * @summary 个人中心模块查询
   * @request GET:/api/luteos/member/queryMemberCenterModule
   * @response `200` `MemberCenterModuleListResp` OK
   */
  luteosMemberQueryMemberCenterModule = (params: RequestParams = {}) =>
    this.request<MemberCenterModuleListResp, any>({
      path: `/api/luteos/member/queryMemberCenterModule`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 个人中心
   * @name LuteosMemberQueryMemberCollectList
   * @summary 用户收藏列表查询
   * @request GET:/api/luteos/member/queryMemberCollectList
   * @response `200` `MemberCollectQueryResp` OK
   */
  luteosMemberQueryMemberCollectList = (
    query?: {
      /** 场景 */
      collectScene?: string;
      /** 来源 */
      source?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<MemberCollectQueryResp, any>({
      path: `/api/luteos/member/queryMemberCollectList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 个人中心
   * @name LuteosMemberQueryMemberCollectNavList
   * @summary 用户导航收藏列表查询
   * @request GET:/api/luteos/member/queryMemberCollectNavList
   * @response `200` `MemberCollectListQueryResp` OK
   */
  luteosMemberQueryMemberCollectNavList = (
    query?: {
      /** 场景 */
      collectScene?: string;
      /** 来源 */
      source?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<MemberCollectListQueryResp, any>({
      path: `/api/luteos/member/queryMemberCollectNavList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 个人中心
   * @name LuteosMemberQueryMemberCollectSysList
   * @summary 用户系统收藏列表查询
   * @request GET:/api/luteos/member/queryMemberCollectSysList
   * @response `200` `MemberCollectSysListQueryResp` OK
   */
  luteosMemberQueryMemberCollectSysList = (
    query?: {
      /** 平台 */
      platform?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<MemberCollectSysListQueryResp, any>({
      path: `/api/luteos/member/queryMemberCollectSysList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 账户模块
   * @name LuteosMemberQueryMemberDetail
   * @summary 获取成员详情
   * @request GET:/api/luteos/member/queryMemberDetail
   * @response `200` `MemberDetailQueryResp` OK
   */
  luteosMemberQueryMemberDetail = (
    query: {
      /** 成员code */
      memberCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<MemberDetailQueryResp, any>({
      path: `/api/luteos/member/queryMemberDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 个人中心
   * @name LuteosMemberQueryMemberInfo
   * @summary 个人信息查询
   * @request GET:/api/luteos/member/queryMemberInfo
   * @response `200` `MemberInfoQueryResp` OK
   */
  luteosMemberQueryMemberInfo = (params: RequestParams = {}) =>
    this.request<MemberInfoQueryResp, any>({
      path: `/api/luteos/member/queryMemberInfo`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 账户模块
   * @name LuteosMemberQueryMemberList
   * @summary 获取成员列表
   * @request GET:/api/luteos/member/queryMemberList
   * @response `200` `MemberListQueryResp` OK
   */
  luteosMemberQueryMemberList = (
    query: {
      /**
       * 部门id
       * @format int64
       */
      deptId?: number;
      /** 关键字查询, 成员名称/昵称/手机号/邮箱 */
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
      /** 根部门id */
      rootDeptId?: string;
      /**
       * 账号状态。是否启用,0-停用 1-启用
       * @format int32
       */
      status?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<MemberListQueryResp, any>({
      path: `/api/luteos/member/queryMemberList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 账户模块
   * @name LuteosMemberQueryMemberListByTitle
   * @summary 根据职务查询员工
   * @request GET:/api/luteos/member/queryMemberListByTitle
   * @response `200` `MemberListByTitleResp` OK
   */
  luteosMemberQueryMemberListByTitle = (
    query?: {
      /** 职业 */
      title?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<MemberListByTitleResp, any>({
      path: `/api/luteos/member/queryMemberListByTitle`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 个人中心
   * @name LuteosMemberQueryMenuVisit
   * @summary 最近访问菜单查询
   * @request GET:/api/luteos/member/queryMenuVisit
   * @response `200` `(MenuVisitListResp)[]` OK
   */
  luteosMemberQueryMenuVisit = (params: RequestParams = {}) =>
    this.request<MenuVisitListResp[], any>({
      path: `/api/luteos/member/queryMenuVisit`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 账户模块
   * @name LuteosMemberQuerySecondLevelDept
   * @summary 获取二级部门
   * @request GET:/api/luteos/member/querySecondLevelDept
   * @response `200` `SecondLevelDeptResp` OK
   */
  luteosMemberQuerySecondLevelDept = (
    query?: {
      /**
       * 父级部门id
       * @format int64
       */
      parentDeptId?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<SecondLevelDeptResp, any>({
      path: `/api/luteos/member/querySecondLevelDept`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 个人中心
   * @name LuteosMemberQuerySevenDaysMenuVisit
   * @summary 最近七天高频菜单查询
   * @request GET:/api/luteos/member/querySevenDaysMenuVisit
   * @response `200` `(MenuVisitListResp)[]` OK
   */
  luteosMemberQuerySevenDaysMenuVisit = (params: RequestParams = {}) =>
    this.request<MenuVisitListResp[], any>({
      path: `/api/luteos/member/querySevenDaysMenuVisit`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 账户模块
   * @name LuteosMemberQuerySubDeptList
   * @summary 子级部门查询
   * @request GET:/api/luteos/member/querySubDeptList
   * @response `200` `SubDeptListQueryResp` OK
   */
  luteosMemberQuerySubDeptList = (
    query?: {
      /**
       * 父级部门 id, 为空时查询跟级部门下的子部门
       * @format int64
       */
      parentId?: number;
      /** 父级部门id列表 */
      parentIdList?: number[];
    },
    params: RequestParams = {},
  ) =>
    this.request<SubDeptListQueryResp, any>({
      path: `/api/luteos/member/querySubDeptList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 账户模块
   * @name LuteosMemberQuerySubDeptListV2
   * @summary 子级部门查询V2
   * @request POST:/api/luteos/member/querySubDeptListV2
   * @response `200` `SubDeptListQueryResp` OK
   */
  luteosMemberQuerySubDeptListV2 = (req: SubDeptListQueryReq, params: RequestParams = {}) =>
    this.request<SubDeptListQueryResp, any>({
      path: `/api/luteos/member/querySubDeptListV2`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 个人中心
   * @name LuteosMemberQuerySystemNavList
   * @summary 系统导航列表查询
   * @request GET:/api/luteos/member/querySystemNavList
   * @response `200` `SystemNavListQueryResp` OK
   */
  luteosMemberQuerySystemNavList = (params: RequestParams = {}) =>
    this.request<SystemNavListQueryResp, any>({
      path: `/api/luteos/member/querySystemNavList`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 个人中心
   * @name LuteosMemberSaveMenuVisit
   * @summary 最近访问菜单保存
   * @request POST:/api/luteos/member/saveMenuVisit
   * @response `200` `CommonResp` OK
   */
  luteosMemberSaveMenuVisit = (req: MemberMenuVisitSaveReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/member/saveMenuVisit`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 个人中心
   * @name LuteosMemberSaveOrUpdateMemberCollect
   * @summary 单个成员收藏标记
   * @request POST:/api/luteos/member/saveOrUpdateMemberCollect
   * @response `200` `CommonResp` OK
   */
  luteosMemberSaveOrUpdateMemberCollect = (req: MemberCollectSaveReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/member/saveOrUpdateMemberCollect`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 账户模块
   * @name LuteosMemberSendPwdToEmail
   * @summary 发送密码到邮箱
   * @request POST:/api/luteos/member/sendPwdToEmail
   * @response `200` `CommonRespObject` OK
   */
  luteosMemberSendPwdToEmail = (req: SendPasswordReq, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/member/sendPwdToEmail`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 账户模块
   * @name LuteosMemberSyncLastVersion
   * @summary 标记是否更新 1-更新 0-未更新
   * @request GET:/api/luteos/member/syncLastVersion
   * @response `200` `CommonRespInt` OK
   */
  luteosMemberSyncLastVersion = (
    query: {
      /** 平台类型 */
      platform: string;
      /**
       * 提醒类型 0-发版通知 1-新品机会列表新手指引  2-新品机会参数配置 新手指引 3-新品机会运行与结果详情新手指引
       * @format int32
       */
      refreshType?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespInt, any>({
      path: `/api/luteos/member/syncLastVersion`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 个人中心
   * @name LuteosMemberSysReport
   * @summary 系统日志上报
   * @request POST:/api/luteos/member/sysReport
   * @response `200` `CommonRespVoid` OK
   */
  luteosMemberSysReport = (req: SysReportReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/member/sysReport`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 账户模块
   * @name LuteosMemberUpdatePassword
   * @summary 修改密码
   * @request POST:/api/luteos/member/updatePassword
   * @response `200` `CommonRespObject` OK
   */
  luteosMemberUpdatePassword = (req: UpdatePasswordReq, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/member/updatePassword`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 账户模块
   * @name LuteosMemberUpdateUserInfo
   * @summary 更新用户信息
   * @request POST:/api/luteos/member/updateUserInfo
   * @response `200` `CommonRespVoid` OK
   */
  luteosMemberUpdateUserInfo = (req: UpdateUserInfoReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/member/updateUserInfo`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
}
