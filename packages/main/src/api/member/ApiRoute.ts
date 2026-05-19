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

export namespace Api {
  /**
   * No description
   * @tags 账户模块
   * @name LuteosMemberAddAccount
   * @summary 保存用户
   * @request POST:/api/luteos/member/addAccount
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosMemberAddAccount {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AccountSaveReq;
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
   * @tags 账户模块
   * @name LuteosMemberAuthCallback
   * @summary 授权回调
   * @request POST:/api/luteos/member/authCallback
   * @response `200` `AuthCallbackResp` OK
   */
  export namespace LuteosMemberAuthCallback {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AuthCallbackReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = AuthCallbackResp;
  }

  /**
   * No description
   * @tags 个人中心
   * @name LuteosMemberBatchSaveSysCollect
   * @summary 用户系统收藏批量保存接口
   * @request POST:/api/luteos/member/batchSaveSysCollect
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosMemberBatchSaveSysCollect {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MemberCollectBatchSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonResp;
  }

  /**
   * No description
   * @tags 账户模块
   * @name LuteosMemberChangeAccountStatus
   * @summary 变更账号状态
   * @request POST:/api/luteos/member/changeAccountStatus
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosMemberChangeAccountStatus {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ChangeAccountStatusQueryReq;
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
   * @tags 账户模块
   * @name LuteosMemberChangeMasterUser
   * @summary 转移主账号
   * @request POST:/api/luteos/member/changeMasterUser
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosMemberChangeMasterUser {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ChangeMasterUserReq;
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
   * @tags 账户模块
   * @name LuteosMemberChangeRoleUser
   * @summary 角色添加员工或者移除员工
   * @request POST:/api/luteos/member/changeRoleUser
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosMemberChangeRoleUser {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ChangeRoleUserReq;
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
   * @tags 账户模块
   * @name LuteosMemberChangeUserRole
   * @summary 变更用户权限
   * @request POST:/api/luteos/member/changeUserRole
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosMemberChangeUserRole {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ChangeUserRoleReq;
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
   * @tags 账户模块
   * @name LuteosMemberCheckMemberName
   * @summary 成员名称校验
   * @request POST:/api/luteos/member/checkMemberName
   * @response `200` `void` OK
   */
  export namespace LuteosMemberCheckMemberName {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MemberNameCheckReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags 账户模块
   * @name LuteosMemberLogin
   * @summary 登录
   * @request POST:/api/luteos/member/login
   * @response `200` `AuthCallbackResp` OK
   */
  export namespace LuteosMemberLogin {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AccountPwdLoginReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = AuthCallbackResp;
  }

  /**
   * No description
   * @tags 账户模块
   * @name LuteosMemberLoginWithDingtalk
   * @summary 钉钉静默登录
   * @request GET:/api/luteos/member/loginWithDingtalk
   * @response `200` `AuthCallbackResp` OK
   */
  export namespace LuteosMemberLoginWithDingtalk {
    export type RequestParams = {};
    export type RequestQuery = {
      /** dingCode */
      dingCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = AuthCallbackResp;
  }

  /**
   * No description
   * @tags 账户模块
   * @name LuteosMemberLogout
   * @summary 退出登录
   * @request POST:/api/luteos/member/logout
   * @response `200` `void` OK
   */
  export namespace LuteosMemberLogout {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags 账户模块
   * @name LuteosMemberMemberDataCache
   * @summary 用户数据登记
   * @request POST:/api/luteos/member/memberDataCache
   * @response `200` `void` OK
   */
  export namespace LuteosMemberMemberDataCache {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MemberDataCacheReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags 账户模块
   * @name LuteosMemberQueryAccountDetail
   * @summary 获取用户账号详情
   * @request GET:/api/luteos/member/queryAccountDetail
   * @response `200` `AccountDetailResp` OK
   */
  export namespace LuteosMemberQueryAccountDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 账号编码 */
      accountCode?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = AccountDetailResp;
  }

  /**
   * No description
   * @tags 账户模块
   * @name LuteosMemberQueryAccountMemberList
   * @summary 获取用户管理列表
   * @request POST:/api/luteos/member/queryAccountMemberList
   * @response `200` `CommonRespAccountQueryListResp` OK
   */
  export namespace LuteosMemberQueryAccountMemberList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AccountQueryListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespAccountQueryListResp;
  }

  /**
   * No description
   * @tags 账户模块
   * @name LuteosMemberQueryAccountToken
   * @summary 获取用户授权token
   * @request GET:/api/luteos/member/queryAccountToken
   * @response `200` `LoginTokenResp` OK
   */
  export namespace LuteosMemberQueryAccountToken {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 用户账号编码 */
      accountCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = LoginTokenResp;
  }

  /**
   * No description
   * @tags 个人中心
   * @name LuteosMemberQueryAllSysTemList
   * @summary 路特数字化工具查询
   * @request GET:/api/luteos/member/queryAllSysTemList
   * @response `200` `MemberSysSelectListQueryResp` OK
   */
  export namespace LuteosMemberQueryAllSysTemList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 模块 */
      model?: string;
      /** 场景 */
      scene?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MemberSysSelectListQueryResp;
  }

  /**
   * No description
   * @tags 账户模块
   * @name LuteosMemberQueryAuthInfo
   * @summary 获取授权信息
   * @request GET:/api/luteos/member/queryAuthInfo
   * @response `200` `AuthInfoQueryResp` OK
   */
  export namespace LuteosMemberQueryAuthInfo {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * 授权类型 1-钉钉
       * @format int32
       */
      authType: number;
      /** 平台 kms用户端：kms；kms管理端：kmsAdmin 根据平台返回对应的回调地址 */
      platform: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = AuthInfoQueryResp;
  }

  /**
   * No description
   * @tags 账户模块
   * @name LuteosMemberQueryCurrentUserInfo
   * @summary 获取当前成员信息
   * @request GET:/api/luteos/member/queryCurrentUserInfo
   * @response `200` `MemberBean` OK
   */
  export namespace LuteosMemberQueryCurrentUserInfo {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MemberBean;
  }

  /**
   * No description
   * @tags 账户模块
   * @name LuteosMemberQueryCurrentUserInfoByDingCode
   * @summary 获取当前成员信息
   * @request GET:/api/luteos/member/queryCurrentUserInfoByDingCode
   * @response `200` `MemberBean` OK
   */
  export namespace LuteosMemberQueryCurrentUserInfoByDingCode {
    export type RequestParams = {};
    export type RequestQuery = {
      /** dingCode */
      dingCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MemberBean;
  }

  /**
   * No description
   * @tags 账户模块
   * @name LuteosMemberQueryDeptMemberList
   * @summary 获取部门下所有成员
   * @request GET:/api/luteos/member/queryDeptMemberList
   * @response `200` `DeptMemberListQueryResp` OK
   */
  export namespace LuteosMemberQueryDeptMemberList {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * 部门id
       * @format int64
       */
      deptId?: number;
      /** 操作业务部门编码 */
      operatorDepartmentCode?: string;
      /** 是否查询子部门 */
      searchChildDept?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DeptMemberListQueryResp;
  }

  /**
   * No description
   * @tags 账户模块
   * @name LuteosMemberQueryDeptMemberMap
   * @summary 获取部门下所有成员(批量code)
   * @request POST:/api/luteos/member/queryDeptMemberMap
   * @response `200` `CommonRespMapStringListMemberBean` OK
   */
  export namespace LuteosMemberQueryDeptMemberMap {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DeptMemberMapQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespMapStringListMemberBean;
  }

  /**
   * No description
   * @tags 账户模块
   * @name LuteosMemberQueryDeptMemberNewList
   * @summary 获取部门下所有成员
   * @request GET:/api/luteos/member/queryDeptMemberNewList
   * @response `200` `DeptMemberListQueryResp` OK
   */
  export namespace LuteosMemberQueryDeptMemberNewList {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * 部门id
       * @format int64
       */
      deptId?: number;
      /** 操作业务部门编码 */
      operatorDepartmentCode?: string;
      /** 是否查询子部门 */
      searchChildDept?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DeptMemberListQueryResp;
  }

  /**
   * No description
   * @tags 账户模块
   * @name LuteosMemberQueryDeptMemberTree
   * @summary 查询部门以及用户
   * @request GET:/api/luteos/member/queryDeptMemberTree
   * @response `200` `RoleAccountResp` OK
   */
  export namespace LuteosMemberQueryDeptMemberTree {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = RoleAccountResp;
  }

  /**
   * No description
   * @tags 账户模块
   * @name LuteosMemberQueryDeptTree
   * @summary 获取部门树结构
   * @request GET:/api/luteos/member/queryDeptTree
   * @response `200` `DeptTreeQueryResp` OK
   */
  export namespace LuteosMemberQueryDeptTree {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * 部门 id, 为空时查询所有部门
       * @format int64
       */
      deptId?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DeptTreeQueryResp;
  }

  /**
   * No description
   * @tags 账户模块
   * @name LuteosMemberQueryGtmMemberList
   * @summary 获取部门下所有GTM负责人
   * @request GET:/api/luteos/member/queryGtmMemberList
   * @response `200` `DeptMemberListQueryResp` OK
   */
  export namespace LuteosMemberQueryGtmMemberList {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * 部门id
       * @format int64
       */
      deptId?: number;
      /** 操作业务部门编码 */
      operatorDepartmentCode?: string;
      /** 是否查询子部门 */
      searchChildDept?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DeptMemberListQueryResp;
  }

  /**
   * No description
   * @tags 账户模块
   * @name LuteosMemberQueryLastVersionSync
   * @summary 查询发版通知标记
   * @request GET:/api/luteos/member/queryLastVersionSync
   * @response `200` `RefreshVersionResp` OK
   */
  export namespace LuteosMemberQueryLastVersionSync {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 平台类型 */
      platform: string;
      /**
       * 提醒类型 0-发版通知 1-新品机会列表新手指引  2-新品机会参数配置 新手指引 3-新品机会运行与结果详情新手指引
       * @format int32
       */
      refreshType?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = RefreshVersionResp;
  }

  /**
   * No description
   * @tags 账户模块
   * @name LuteosMemberQueryManageMemberList
   * @summary 获取当前成员所管成员列表
   * @request GET:/api/luteos/member/queryManageMemberList
   * @response `200` `MemberListQueryResp` OK
   */
  export namespace LuteosMemberQueryManageMemberList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MemberListQueryResp;
  }

  /**
   * No description
   * @tags 账户模块
   * @name LuteosMemberQueryMdpCode
   * @summary 获取MDP的token
   * @request POST:/api/luteos/member/queryMdpCode
   * @response `200` `MdpCodeResp` OK
   */
  export namespace LuteosMemberQueryMdpCode {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MdpCodeResp;
  }

  /**
   * No description
   * @tags 个人中心
   * @name LuteosMemberQueryMemberCenterModule
   * @summary 个人中心模块查询
   * @request GET:/api/luteos/member/queryMemberCenterModule
   * @response `200` `MemberCenterModuleListResp` OK
   */
  export namespace LuteosMemberQueryMemberCenterModule {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MemberCenterModuleListResp;
  }

  /**
   * No description
   * @tags 个人中心
   * @name LuteosMemberQueryMemberCollectList
   * @summary 用户收藏列表查询
   * @request GET:/api/luteos/member/queryMemberCollectList
   * @response `200` `MemberCollectQueryResp` OK
   */
  export namespace LuteosMemberQueryMemberCollectList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 场景 */
      collectScene?: string;
      /** 来源 */
      source?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MemberCollectQueryResp;
  }

  /**
   * No description
   * @tags 个人中心
   * @name LuteosMemberQueryMemberCollectNavList
   * @summary 用户导航收藏列表查询
   * @request GET:/api/luteos/member/queryMemberCollectNavList
   * @response `200` `MemberCollectListQueryResp` OK
   */
  export namespace LuteosMemberQueryMemberCollectNavList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 场景 */
      collectScene?: string;
      /** 来源 */
      source?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MemberCollectListQueryResp;
  }

  /**
   * No description
   * @tags 个人中心
   * @name LuteosMemberQueryMemberCollectSysList
   * @summary 用户系统收藏列表查询
   * @request GET:/api/luteos/member/queryMemberCollectSysList
   * @response `200` `MemberCollectSysListQueryResp` OK
   */
  export namespace LuteosMemberQueryMemberCollectSysList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 平台 */
      platform?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MemberCollectSysListQueryResp;
  }

  /**
   * No description
   * @tags 账户模块
   * @name LuteosMemberQueryMemberDetail
   * @summary 获取成员详情
   * @request GET:/api/luteos/member/queryMemberDetail
   * @response `200` `MemberDetailQueryResp` OK
   */
  export namespace LuteosMemberQueryMemberDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 成员code */
      memberCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MemberDetailQueryResp;
  }

  /**
   * No description
   * @tags 个人中心
   * @name LuteosMemberQueryMemberInfo
   * @summary 个人信息查询
   * @request GET:/api/luteos/member/queryMemberInfo
   * @response `200` `MemberInfoQueryResp` OK
   */
  export namespace LuteosMemberQueryMemberInfo {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MemberInfoQueryResp;
  }

  /**
   * No description
   * @tags 账户模块
   * @name LuteosMemberQueryMemberList
   * @summary 获取成员列表
   * @request GET:/api/luteos/member/queryMemberList
   * @response `200` `MemberListQueryResp` OK
   */
  export namespace LuteosMemberQueryMemberList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MemberListQueryResp;
  }

  /**
   * No description
   * @tags 账户模块
   * @name LuteosMemberQueryMemberListByTitle
   * @summary 根据职务查询员工
   * @request GET:/api/luteos/member/queryMemberListByTitle
   * @response `200` `MemberListByTitleResp` OK
   */
  export namespace LuteosMemberQueryMemberListByTitle {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 职业 */
      title?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MemberListByTitleResp;
  }

  /**
   * No description
   * @tags 个人中心
   * @name LuteosMemberQueryMenuVisit
   * @summary 最近访问菜单查询
   * @request GET:/api/luteos/member/queryMenuVisit
   * @response `200` `(MenuVisitListResp)[]` OK
   */
  export namespace LuteosMemberQueryMenuVisit {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MenuVisitListResp[];
  }

  /**
   * No description
   * @tags 账户模块
   * @name LuteosMemberQuerySecondLevelDept
   * @summary 获取二级部门
   * @request GET:/api/luteos/member/querySecondLevelDept
   * @response `200` `SecondLevelDeptResp` OK
   */
  export namespace LuteosMemberQuerySecondLevelDept {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * 父级部门id
       * @format int64
       */
      parentDeptId?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SecondLevelDeptResp;
  }

  /**
   * No description
   * @tags 个人中心
   * @name LuteosMemberQuerySevenDaysMenuVisit
   * @summary 最近七天高频菜单查询
   * @request GET:/api/luteos/member/querySevenDaysMenuVisit
   * @response `200` `(MenuVisitListResp)[]` OK
   */
  export namespace LuteosMemberQuerySevenDaysMenuVisit {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MenuVisitListResp[];
  }

  /**
   * No description
   * @tags 账户模块
   * @name LuteosMemberQuerySubDeptList
   * @summary 子级部门查询
   * @request GET:/api/luteos/member/querySubDeptList
   * @response `200` `SubDeptListQueryResp` OK
   */
  export namespace LuteosMemberQuerySubDeptList {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * 父级部门 id, 为空时查询跟级部门下的子部门
       * @format int64
       */
      parentId?: number;
      /** 父级部门id列表 */
      parentIdList?: number[];
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SubDeptListQueryResp;
  }

  /**
   * No description
   * @tags 账户模块
   * @name LuteosMemberQuerySubDeptListV2
   * @summary 子级部门查询V2
   * @request POST:/api/luteos/member/querySubDeptListV2
   * @response `200` `SubDeptListQueryResp` OK
   */
  export namespace LuteosMemberQuerySubDeptListV2 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SubDeptListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SubDeptListQueryResp;
  }

  /**
   * No description
   * @tags 个人中心
   * @name LuteosMemberQuerySystemNavList
   * @summary 系统导航列表查询
   * @request GET:/api/luteos/member/querySystemNavList
   * @response `200` `SystemNavListQueryResp` OK
   */
  export namespace LuteosMemberQuerySystemNavList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SystemNavListQueryResp;
  }

  /**
   * No description
   * @tags 个人中心
   * @name LuteosMemberSaveMenuVisit
   * @summary 最近访问菜单保存
   * @request POST:/api/luteos/member/saveMenuVisit
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosMemberSaveMenuVisit {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MemberMenuVisitSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonResp;
  }

  /**
   * No description
   * @tags 个人中心
   * @name LuteosMemberSaveOrUpdateMemberCollect
   * @summary 单个成员收藏标记
   * @request POST:/api/luteos/member/saveOrUpdateMemberCollect
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosMemberSaveOrUpdateMemberCollect {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MemberCollectSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonResp;
  }

  /**
   * No description
   * @tags 账户模块
   * @name LuteosMemberSendPwdToEmail
   * @summary 发送密码到邮箱
   * @request POST:/api/luteos/member/sendPwdToEmail
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosMemberSendPwdToEmail {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SendPasswordReq;
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
   * @tags 账户模块
   * @name LuteosMemberSyncLastVersion
   * @summary 标记是否更新 1-更新 0-未更新
   * @request GET:/api/luteos/member/syncLastVersion
   * @response `200` `CommonRespInt` OK
   */
  export namespace LuteosMemberSyncLastVersion {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 平台类型 */
      platform: string;
      /**
       * 提醒类型 0-发版通知 1-新品机会列表新手指引  2-新品机会参数配置 新手指引 3-新品机会运行与结果详情新手指引
       * @format int32
       */
      refreshType?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespInt;
  }

  /**
   * No description
   * @tags 个人中心
   * @name LuteosMemberSysReport
   * @summary 系统日志上报
   * @request POST:/api/luteos/member/sysReport
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosMemberSysReport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SysReportReq;
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
   * @tags 账户模块
   * @name LuteosMemberUpdatePassword
   * @summary 修改密码
   * @request POST:/api/luteos/member/updatePassword
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosMemberUpdatePassword {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UpdatePasswordReq;
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
   * @tags 账户模块
   * @name LuteosMemberUpdateUserInfo
   * @summary 更新用户信息
   * @request POST:/api/luteos/member/updateUserInfo
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosMemberUpdateUserInfo {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UpdateUserInfoReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespVoid;
  }
}
