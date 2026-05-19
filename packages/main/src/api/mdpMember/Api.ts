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
  AccountPwdLoginReq,
  AuthCallbackReq,
  AuthCallbackResp,
  AuthInfoQueryReq,
  AuthInfoQueryResp,
  ChangeAccountStatusQueryReq,
  CommonResp,
  CommonRespBoolean,
  CommonRespMapStringListMemberBean,
  CommonRespObject,
  CommonRespVoid,
  DeptMemberListQueryReq,
  DeptMemberListQueryResp,
  DeptMemberMapQueryReq,
  DeptTreeQueryReq,
  DeptTreeQueryResp,
  MemberBean,
  MemberCenterModuleListReq,
  MemberCenterModuleListResp,
  MemberCollectListQueryResp,
  MemberCollectSaveReq,
  MemberDataCacheReq,
  MemberDetailQueryReq,
  MemberDetailQueryResp,
  MemberInfoQueryResp,
  MemberListQueryReq,
  MemberListQueryResp,
  MemberMenuVisitSaveReq,
  MemberNameCheckReq,
  MenuVisitListResp,
  SendPasswordReq,
  SubDeptListQueryReq,
  SubDeptListQueryResp,
  SysReportReq,
  SystemNavListQueryResp,
  TokenExchangeReq,
  UpdatePasswordReq,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags 账户模块
   * @name LuteosMemberAuthCallback
   * @summary 授权回调
   * @request POST:/api/luteos/member/authCallback
   * @secure
   * @response `200` `AuthCallbackResp` OK
   */
  luteosMemberAuthCallback = (data: AuthCallbackReq, params: RequestParams = {}) =>
    this.request<AuthCallbackResp, any>({
      path: `/api/luteos/member/authCallback`,
      method: 'POST',
      body: data,
      secure: true,
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
   * @secure
   * @response `200` `CommonResp` OK
   */
  luteosMemberChangeAccountStatus = (
    data: ChangeAccountStatusQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/member/changeAccountStatus`,
      method: 'POST',
      body: data,
      secure: true,
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
   * @secure
   * @response `200` `void` OK
   */
  luteosMemberCheckMemberName = (data: MemberNameCheckReq, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/luteos/member/checkMemberName`,
      method: 'POST',
      body: data,
      secure: true,
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
   * @secure
   * @response `200` `AuthCallbackResp` OK
   */
  luteosMemberLogin = (data: AccountPwdLoginReq, params: RequestParams = {}) =>
    this.request<AuthCallbackResp, any>({
      path: `/api/luteos/member/login`,
      method: 'POST',
      body: data,
      secure: true,
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
   * @secure
   * @response `200` `AuthCallbackResp` OK
   */
  luteosMemberLoginWithDingtalk = (
    query: {
      dingCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<AuthCallbackResp, any>({
      path: `/api/luteos/member/loginWithDingtalk`,
      method: 'GET',
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags 账户模块
   * @name LuteosMemberLogout
   * @summary 退出登录
   * @request POST:/api/luteos/member/logout
   * @secure
   * @response `200` `void` OK
   */
  luteosMemberLogout = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/luteos/member/logout`,
      method: 'POST',
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags 账户模块
   * @name LuteosMemberMemberDataCache
   * @summary 用户数据登记
   * @request POST:/api/luteos/member/memberDataCache
   * @secure
   * @response `200` `void` OK
   */
  luteosMemberMemberDataCache = (data: MemberDataCacheReq, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/luteos/member/memberDataCache`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 账户模块
   * @name LuteosMemberQueryAuthInfo
   * @summary 获取授权信息
   * @request GET:/api/luteos/member/queryAuthInfo
   * @secure
   * @response `200` `AuthInfoQueryResp` OK
   */
  luteosMemberQueryAuthInfo = (
    query: {
      req: AuthInfoQueryReq;
    },
    params: RequestParams = {},
  ) =>
    this.request<AuthInfoQueryResp, any>({
      path: `/api/luteos/member/queryAuthInfo`,
      method: 'GET',
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags 账户模块
   * @name LuteosMemberQueryCurrentUserInfo
   * @summary 获取当前成员信息
   * @request GET:/api/luteos/member/queryCurrentUserInfo
   * @secure
   * @response `200` `MemberBean` OK
   */
  luteosMemberQueryCurrentUserInfo = (params: RequestParams = {}) =>
    this.request<MemberBean, any>({
      path: `/api/luteos/member/queryCurrentUserInfo`,
      method: 'GET',
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags 账户模块
   * @name LuteosMemberQueryDeptMemberList
   * @summary 获取部门下所有成员
   * @request GET:/api/luteos/member/queryDeptMemberList
   * @secure
   * @response `200` `DeptMemberListQueryResp` OK
   */
  luteosMemberQueryDeptMemberList = (
    query: {
      req: DeptMemberListQueryReq;
    },
    params: RequestParams = {},
  ) =>
    this.request<DeptMemberListQueryResp, any>({
      path: `/api/luteos/member/queryDeptMemberList`,
      method: 'GET',
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags 账户模块
   * @name LuteosMemberQueryDeptMemberMap
   * @summary 获取部门下所有成员(批量code)
   * @request POST:/api/luteos/member/queryDeptMemberMap
   * @secure
   * @response `200` `CommonRespMapStringListMemberBean` OK
   */
  luteosMemberQueryDeptMemberMap = (data: DeptMemberMapQueryReq, params: RequestParams = {}) =>
    this.request<CommonRespMapStringListMemberBean, any>({
      path: `/api/luteos/member/queryDeptMemberMap`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 账户模块
   * @name LuteosMemberQueryDeptTree
   * @summary 获取部门树结构
   * @request GET:/api/luteos/member/queryDeptTree
   * @secure
   * @response `200` `DeptTreeQueryResp` OK
   */
  luteosMemberQueryDeptTree = (
    query: {
      req: DeptTreeQueryReq;
    },
    params: RequestParams = {},
  ) =>
    this.request<DeptTreeQueryResp, any>({
      path: `/api/luteos/member/queryDeptTree`,
      method: 'GET',
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags 个人中心
   * @name LuteosMemberQueryMemberCenterModule
   * @summary 个人中心模块查询
   * @request GET:/api/luteos/member/queryMemberCenterModule
   * @secure
   * @response `200` `MemberCenterModuleListResp` OK
   */
  luteosMemberQueryMemberCenterModule = (
    query: {
      req: MemberCenterModuleListReq;
    },
    params: RequestParams = {},
  ) =>
    this.request<MemberCenterModuleListResp, any>({
      path: `/api/luteos/member/queryMemberCenterModule`,
      method: 'GET',
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags 个人中心
   * @name LuteosMemberQueryMemberCollectNavList
   * @summary 用户导航收藏列表查询
   * @request GET:/api/luteos/member/queryMemberCollectNavList
   * @secure
   * @response `200` `MemberCollectListQueryResp` OK
   */
  luteosMemberQueryMemberCollectNavList = (params: RequestParams = {}) =>
    this.request<MemberCollectListQueryResp, any>({
      path: `/api/luteos/member/queryMemberCollectNavList`,
      method: 'GET',
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags 账户模块
   * @name LuteosMemberQueryMemberDetail
   * @summary 获取成员详情
   * @request GET:/api/luteos/member/queryMemberDetail
   * @secure
   * @response `200` `MemberDetailQueryResp` OK
   */
  luteosMemberQueryMemberDetail = (
    query: {
      req: MemberDetailQueryReq;
    },
    params: RequestParams = {},
  ) =>
    this.request<MemberDetailQueryResp, any>({
      path: `/api/luteos/member/queryMemberDetail`,
      method: 'GET',
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags 个人中心
   * @name LuteosMemberQueryMemberInfo
   * @summary 个人信息查询
   * @request GET:/api/luteos/member/queryMemberInfo
   * @secure
   * @response `200` `MemberInfoQueryResp` OK
   */
  luteosMemberQueryMemberInfo = (params: RequestParams = {}) =>
    this.request<MemberInfoQueryResp, any>({
      path: `/api/luteos/member/queryMemberInfo`,
      method: 'GET',
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags 账户模块
   * @name LuteosMemberQueryMemberList
   * @summary 获取成员列表
   * @request GET:/api/luteos/member/queryMemberList
   * @secure
   * @response `200` `MemberListQueryResp` OK
   */
  luteosMemberQueryMemberList = (
    query: {
      req: MemberListQueryReq;
    },
    params: RequestParams = {},
  ) =>
    this.request<MemberListQueryResp, any>({
      path: `/api/luteos/member/queryMemberList`,
      method: 'GET',
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags 个人中心
   * @name LuteosMemberQueryMenuVisit
   * @summary 最近访问菜单查询
   * @request GET:/api/luteos/member/queryMenuVisit
   * @secure
   * @response `200` `(MenuVisitListResp)[]` OK
   */
  luteosMemberQueryMenuVisit = (params: RequestParams = {}) =>
    this.request<MenuVisitListResp[], any>({
      path: `/api/luteos/member/queryMenuVisit`,
      method: 'GET',
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags 账户模块
   * @name LuteosMemberQuerySubDeptList
   * @summary 子级部门查询
   * @request GET:/api/luteos/member/querySubDeptList
   * @secure
   * @response `200` `SubDeptListQueryResp` OK
   */
  luteosMemberQuerySubDeptList = (
    query: {
      req: SubDeptListQueryReq;
    },
    params: RequestParams = {},
  ) =>
    this.request<SubDeptListQueryResp, any>({
      path: `/api/luteos/member/querySubDeptList`,
      method: 'GET',
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags 个人中心
   * @name LuteosMemberQuerySystemNavList
   * @summary 系统导航列表查询
   * @request GET:/api/luteos/member/querySystemNavList
   * @secure
   * @response `200` `SystemNavListQueryResp` OK
   */
  luteosMemberQuerySystemNavList = (params: RequestParams = {}) =>
    this.request<SystemNavListQueryResp, any>({
      path: `/api/luteos/member/querySystemNavList`,
      method: 'GET',
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags 个人中心
   * @name LuteosMemberSaveMemberCollect
   * @summary 成员收藏标记
   * @request POST:/api/luteos/member/saveMemberCollect
   * @secure
   * @response `200` `CommonRespBoolean` OK
   */
  luteosMemberSaveMemberCollect = (data: MemberCollectSaveReq, params: RequestParams = {}) =>
    this.request<CommonRespBoolean, any>({
      path: `/api/luteos/member/saveMemberCollect`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 个人中心
   * @name LuteosMemberSaveMenuVisit
   * @summary 最近访问菜单保存
   * @request POST:/api/luteos/member/saveMenuVisit
   * @secure
   * @response `200` `CommonResp` OK
   */
  luteosMemberSaveMenuVisit = (data: MemberMenuVisitSaveReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/member/saveMenuVisit`,
      method: 'POST',
      body: data,
      secure: true,
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
   * @secure
   * @response `200` `CommonRespObject` OK
   */
  luteosMemberSendPwdToEmail = (data: SendPasswordReq, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/member/sendPwdToEmail`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 个人中心
   * @name LuteosMemberSysReport
   * @summary 系统日志上报
   * @request POST:/api/luteos/member/sysReport
   * @secure
   * @response `200` `CommonRespVoid` OK
   */
  luteosMemberSysReport = (data: SysReportReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/member/sysReport`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 账户模块
   * @name LuteosMemberTokenExchange
   * @summary token 交换
   * @request POST:/api/luteos/member/tokenExchange
   * @secure
   * @response `200` `AuthCallbackResp` OK
   */
  luteosMemberTokenExchange = (data: TokenExchangeReq, params: RequestParams = {}) =>
    this.request<AuthCallbackResp, any>({
      path: `/api/luteos/member/tokenExchange`,
      method: 'POST',
      body: data,
      secure: true,
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
   * @secure
   * @response `200` `CommonRespObject` OK
   */
  luteosMemberUpdatePassword = (data: UpdatePasswordReq, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/member/updatePassword`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
}
