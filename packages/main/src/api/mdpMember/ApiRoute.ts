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

export namespace Api {
  /**
   * No description
   * @tags 账户模块
   * @name LuteosMemberAuthCallback
   * @summary 授权回调
   * @request POST:/api/luteos/member/authCallback
   * @secure
   * @response `200` `AuthCallbackResp` OK
   */
  export namespace LuteosMemberAuthCallback {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AuthCallbackReq;
    export type RequestHeaders = {};
    export type ResponseBody = AuthCallbackResp;
  }

  /**
   * No description
   * @tags 账户模块
   * @name LuteosMemberChangeAccountStatus
   * @summary 变更账号状态
   * @request POST:/api/luteos/member/changeAccountStatus
   * @secure
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosMemberChangeAccountStatus {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ChangeAccountStatusQueryReq;
    export type RequestHeaders = {};
    export type ResponseBody = CommonResp;
  }

  /**
   * No description
   * @tags 账户模块
   * @name LuteosMemberCheckMemberName
   * @summary 成员名称校验
   * @request POST:/api/luteos/member/checkMemberName
   * @secure
   * @response `200` `void` OK
   */
  export namespace LuteosMemberCheckMemberName {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MemberNameCheckReq;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags 账户模块
   * @name LuteosMemberLogin
   * @summary 登录
   * @request POST:/api/luteos/member/login
   * @secure
   * @response `200` `AuthCallbackResp` OK
   */
  export namespace LuteosMemberLogin {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AccountPwdLoginReq;
    export type RequestHeaders = {};
    export type ResponseBody = AuthCallbackResp;
  }

  /**
   * No description
   * @tags 账户模块
   * @name LuteosMemberLoginWithDingtalk
   * @summary 钉钉静默登录
   * @request GET:/api/luteos/member/loginWithDingtalk
   * @secure
   * @response `200` `AuthCallbackResp` OK
   */
  export namespace LuteosMemberLoginWithDingtalk {
    export type RequestParams = {};
    export type RequestQuery = {
      dingCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = AuthCallbackResp;
  }

  /**
   * No description
   * @tags 账户模块
   * @name LuteosMemberLogout
   * @summary 退出登录
   * @request POST:/api/luteos/member/logout
   * @secure
   * @response `200` `void` OK
   */
  export namespace LuteosMemberLogout {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags 账户模块
   * @name LuteosMemberMemberDataCache
   * @summary 用户数据登记
   * @request POST:/api/luteos/member/memberDataCache
   * @secure
   * @response `200` `void` OK
   */
  export namespace LuteosMemberMemberDataCache {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MemberDataCacheReq;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags 账户模块
   * @name LuteosMemberQueryAuthInfo
   * @summary 获取授权信息
   * @request GET:/api/luteos/member/queryAuthInfo
   * @secure
   * @response `200` `AuthInfoQueryResp` OK
   */
  export namespace LuteosMemberQueryAuthInfo {
    export type RequestParams = {};
    export type RequestQuery = {
      req: AuthInfoQueryReq;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = AuthInfoQueryResp;
  }

  /**
   * No description
   * @tags 账户模块
   * @name LuteosMemberQueryCurrentUserInfo
   * @summary 获取当前成员信息
   * @request GET:/api/luteos/member/queryCurrentUserInfo
   * @secure
   * @response `200` `MemberBean` OK
   */
  export namespace LuteosMemberQueryCurrentUserInfo {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = MemberBean;
  }

  /**
   * No description
   * @tags 账户模块
   * @name LuteosMemberQueryDeptMemberList
   * @summary 获取部门下所有成员
   * @request GET:/api/luteos/member/queryDeptMemberList
   * @secure
   * @response `200` `DeptMemberListQueryResp` OK
   */
  export namespace LuteosMemberQueryDeptMemberList {
    export type RequestParams = {};
    export type RequestQuery = {
      req: DeptMemberListQueryReq;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = DeptMemberListQueryResp;
  }

  /**
   * No description
   * @tags 账户模块
   * @name LuteosMemberQueryDeptMemberMap
   * @summary 获取部门下所有成员(批量code)
   * @request POST:/api/luteos/member/queryDeptMemberMap
   * @secure
   * @response `200` `CommonRespMapStringListMemberBean` OK
   */
  export namespace LuteosMemberQueryDeptMemberMap {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DeptMemberMapQueryReq;
    export type RequestHeaders = {};
    export type ResponseBody = CommonRespMapStringListMemberBean;
  }

  /**
   * No description
   * @tags 账户模块
   * @name LuteosMemberQueryDeptTree
   * @summary 获取部门树结构
   * @request GET:/api/luteos/member/queryDeptTree
   * @secure
   * @response `200` `DeptTreeQueryResp` OK
   */
  export namespace LuteosMemberQueryDeptTree {
    export type RequestParams = {};
    export type RequestQuery = {
      req: DeptTreeQueryReq;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = DeptTreeQueryResp;
  }

  /**
   * No description
   * @tags 个人中心
   * @name LuteosMemberQueryMemberCenterModule
   * @summary 个人中心模块查询
   * @request GET:/api/luteos/member/queryMemberCenterModule
   * @secure
   * @response `200` `MemberCenterModuleListResp` OK
   */
  export namespace LuteosMemberQueryMemberCenterModule {
    export type RequestParams = {};
    export type RequestQuery = {
      req: MemberCenterModuleListReq;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = MemberCenterModuleListResp;
  }

  /**
   * No description
   * @tags 个人中心
   * @name LuteosMemberQueryMemberCollectNavList
   * @summary 用户导航收藏列表查询
   * @request GET:/api/luteos/member/queryMemberCollectNavList
   * @secure
   * @response `200` `MemberCollectListQueryResp` OK
   */
  export namespace LuteosMemberQueryMemberCollectNavList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = MemberCollectListQueryResp;
  }

  /**
   * No description
   * @tags 账户模块
   * @name LuteosMemberQueryMemberDetail
   * @summary 获取成员详情
   * @request GET:/api/luteos/member/queryMemberDetail
   * @secure
   * @response `200` `MemberDetailQueryResp` OK
   */
  export namespace LuteosMemberQueryMemberDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      req: MemberDetailQueryReq;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = MemberDetailQueryResp;
  }

  /**
   * No description
   * @tags 个人中心
   * @name LuteosMemberQueryMemberInfo
   * @summary 个人信息查询
   * @request GET:/api/luteos/member/queryMemberInfo
   * @secure
   * @response `200` `MemberInfoQueryResp` OK
   */
  export namespace LuteosMemberQueryMemberInfo {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = MemberInfoQueryResp;
  }

  /**
   * No description
   * @tags 账户模块
   * @name LuteosMemberQueryMemberList
   * @summary 获取成员列表
   * @request GET:/api/luteos/member/queryMemberList
   * @secure
   * @response `200` `MemberListQueryResp` OK
   */
  export namespace LuteosMemberQueryMemberList {
    export type RequestParams = {};
    export type RequestQuery = {
      req: MemberListQueryReq;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = MemberListQueryResp;
  }

  /**
   * No description
   * @tags 个人中心
   * @name LuteosMemberQueryMenuVisit
   * @summary 最近访问菜单查询
   * @request GET:/api/luteos/member/queryMenuVisit
   * @secure
   * @response `200` `(MenuVisitListResp)[]` OK
   */
  export namespace LuteosMemberQueryMenuVisit {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = MenuVisitListResp[];
  }

  /**
   * No description
   * @tags 账户模块
   * @name LuteosMemberQuerySubDeptList
   * @summary 子级部门查询
   * @request GET:/api/luteos/member/querySubDeptList
   * @secure
   * @response `200` `SubDeptListQueryResp` OK
   */
  export namespace LuteosMemberQuerySubDeptList {
    export type RequestParams = {};
    export type RequestQuery = {
      req: SubDeptListQueryReq;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = SubDeptListQueryResp;
  }

  /**
   * No description
   * @tags 个人中心
   * @name LuteosMemberQuerySystemNavList
   * @summary 系统导航列表查询
   * @request GET:/api/luteos/member/querySystemNavList
   * @secure
   * @response `200` `SystemNavListQueryResp` OK
   */
  export namespace LuteosMemberQuerySystemNavList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = SystemNavListQueryResp;
  }

  /**
   * No description
   * @tags 个人中心
   * @name LuteosMemberSaveMemberCollect
   * @summary 成员收藏标记
   * @request POST:/api/luteos/member/saveMemberCollect
   * @secure
   * @response `200` `CommonRespBoolean` OK
   */
  export namespace LuteosMemberSaveMemberCollect {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MemberCollectSaveReq;
    export type RequestHeaders = {};
    export type ResponseBody = CommonRespBoolean;
  }

  /**
   * No description
   * @tags 个人中心
   * @name LuteosMemberSaveMenuVisit
   * @summary 最近访问菜单保存
   * @request POST:/api/luteos/member/saveMenuVisit
   * @secure
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosMemberSaveMenuVisit {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MemberMenuVisitSaveReq;
    export type RequestHeaders = {};
    export type ResponseBody = CommonResp;
  }

  /**
   * No description
   * @tags 账户模块
   * @name LuteosMemberSendPwdToEmail
   * @summary 发送密码到邮箱
   * @request POST:/api/luteos/member/sendPwdToEmail
   * @secure
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosMemberSendPwdToEmail {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SendPasswordReq;
    export type RequestHeaders = {};
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags 个人中心
   * @name LuteosMemberSysReport
   * @summary 系统日志上报
   * @request POST:/api/luteos/member/sysReport
   * @secure
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosMemberSysReport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SysReportReq;
    export type RequestHeaders = {};
    export type ResponseBody = CommonRespVoid;
  }

  /**
   * No description
   * @tags 账户模块
   * @name LuteosMemberTokenExchange
   * @summary token 交换
   * @request POST:/api/luteos/member/tokenExchange
   * @secure
   * @response `200` `AuthCallbackResp` OK
   */
  export namespace LuteosMemberTokenExchange {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TokenExchangeReq;
    export type RequestHeaders = {};
    export type ResponseBody = AuthCallbackResp;
  }

  /**
   * No description
   * @tags 账户模块
   * @name LuteosMemberUpdatePassword
   * @summary 修改密码
   * @request POST:/api/luteos/member/updatePassword
   * @secure
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosMemberUpdatePassword {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UpdatePasswordReq;
    export type RequestHeaders = {};
    export type ResponseBody = CommonRespObject;
  }
}
