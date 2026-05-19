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

export interface UpdatePasswordReq {
  /** 原密码 */
  originPassword: string;
  /** 新密码 */
  newPassword: string;
  /** 确认密码 */
  newPasswordConfirm: string;
}

export interface CommonRespObject {
  code?: string;
  message?: string;
  traceId?: string;
  result?: object;
}

export interface TokenExchangeReq {
  /** code */
  code: string;
  /** code 来源 ERP */
  source?: string;
}

export interface AuthCallbackResp {
  /** 账号编码 */
  accountCode?: string;
  /**
   * 来源: 0-员工 1-供应商
   * @format int32
   */
  source?: number;
  /** 成员Code source=0 则是userCode, =1 则是supplierCode */
  memberCode?: string;
  /** 成员名称 */
  name?: string;
  /** 手机号 */
  mobile?: string;
  /** 头像 */
  avatar?: string;
  /** 昵称 */
  nickname?: string;
  /** 邮箱 */
  email?: string;
  /** 国家 */
  stateCode?: string;
  /** 工号 */
  jobNumber?: string;
  /** 职称 */
  title?: string;
  /**
   * 用户所属一级部门id
   * @format int64
   */
  rootDeptId?: number;
  /**
   * 是否超级管理员 1-是 0-否
   * @format int32
   */
  superAdmin?: number;
  /**
   * 是否角色管理菜单的超级管理员 1-是 0-否
   * @format int32
   */
  superAdminInRoleManagerMenu?: number;
  /**
   * 部门id
   * @format int64
   */
  deptId?: number;
  /** 部门名称 */
  deptName?: string;
  /** 成员所属全部部门（如部门成员列表接口；顺序稳定、按 mapping 主键升序，已按 deptId 去重；不表示主部门） */
  deptInfo?: MemberDeptInfoBean;
  /**
   * 是否删除 1-是 离职 0-否 在职
   * @format int32
   */
  deleted?: number;
  /**
   * 是否主账号 1-是 0-否
   * @format int32
   */
  master?: number;
  /** 省 */
  provinceName?: string;
  /** 市 */
  cityName?: string;
  /** 角色列表 */
  roleCodeList?: string[];
  /** ip */
  ipAddr?: string;
  /** 成员所属全部部门（如部门成员列表接口；顺序稳定、按 mapping 主键升序，已按 deptId 去重；不表示主部门） */
  deptList?: MemberDeptInfoBean[];
  /** token */
  token?: string;
  /**
   * 有效时长
   * @format int64
   */
  validTime?: number;
  secret?: string;
}

/** 成员所属全部部门（如部门成员列表接口；顺序稳定、按 mapping 主键升序，已按 deptId 去重；不表示主部门） */
export interface MemberDeptInfoBean {
  /** 员工编码 */
  memberCode?: string;
  /**
   * 部门id
   * @format int64
   */
  deptId?: number;
  /** 部门名称 */
  deptName?: string;
  /**
   * 父级部门id
   * @format int64
   */
  parentId?: number;
  /** 父级部门名称 */
  parentName?: string;
}

export interface SysReportReq {
  /** 员工编码 */
  memberCode: string;
  /** 平台 rpe/erp/kol/kms等 */
  platform: string;
  /** 类型：菜单-menu 行为(按钮-button  链接-link) */
  type: string;
  /** 菜单编码 */
  menuCode?: string;
  /** 菜单描述 */
  menuDesc?: string;
  /** 页面url */
  pageUrl: string;
  /** 事件id add_product 、detail 、link 更多在字典中维护 */
  eventId?: string;
  /** 事件描述 例如 新增商品-add_product 详情页-detail 跳转链接-link */
  eventName: string;
  /** 扩展信息 */
  extraInfo?: string;
}

export interface CommonRespVoid {
  code?: string;
  message?: string;
  traceId?: string;
  result?: object;
}

export interface SendPasswordReq {
  /** 邮箱 */
  email?: string;
}

export interface MemberMenuVisitSaveReq {
  /** 菜单 */
  menuCode: string;
}

export interface CommonResp {
  code?: string;
  message?: string;
  traceId?: string;
  result?: object;
}

/** 收藏对象 */
export interface MemberCollectSaveItem {
  /** 收藏对象编码 */
  itemCode: string;
  /**
   * 收藏状态 0-未收藏 1-已收藏
   * @format int32
   */
  collectFlag: number;
}

export interface MemberCollectSaveReq {
  /** 场景 sysnav-系统导航 */
  collectScene: string;
  /** 收藏对象 */
  itemList?: MemberCollectSaveItem[];
}

export interface CommonRespBoolean {
  code?: string;
  message?: string;
  traceId?: string;
  result?: boolean;
}

export interface DeptMemberMapQueryReq {
  /** 操作业务部门编码 */
  operatorDepartmentCode?: string[];
}

export interface CommonRespMapStringListMemberBean {
  code?: string;
  message?: string;
  traceId?: string;
  result?: Record<string, MemberBean[]>;
}

export interface MemberBean {
  /** 账号编码 */
  accountCode?: string;
  /**
   * 来源: 0-员工 1-供应商
   * @format int32
   */
  source?: number;
  /** 成员Code source=0 则是userCode, =1 则是supplierCode */
  memberCode?: string;
  /** 成员名称 */
  name?: string;
  /** 手机号 */
  mobile?: string;
  /** 头像 */
  avatar?: string;
  /** 昵称 */
  nickname?: string;
  /** 邮箱 */
  email?: string;
  /** 国家 */
  stateCode?: string;
  /** 工号 */
  jobNumber?: string;
  /** 职称 */
  title?: string;
  /**
   * 用户所属一级部门id
   * @format int64
   */
  rootDeptId?: number;
  /**
   * 是否超级管理员 1-是 0-否
   * @format int32
   */
  superAdmin?: number;
  /**
   * 是否角色管理菜单的超级管理员 1-是 0-否
   * @format int32
   */
  superAdminInRoleManagerMenu?: number;
  /**
   * 部门id
   * @format int64
   */
  deptId?: number;
  /** 部门名称 */
  deptName?: string;
  /** 成员所属全部部门（如部门成员列表接口；顺序稳定、按 mapping 主键升序，已按 deptId 去重；不表示主部门） */
  deptInfo?: MemberDeptInfoBean;
  /**
   * 是否删除 1-是 离职 0-否 在职
   * @format int32
   */
  deleted?: number;
  /**
   * 是否主账号 1-是 0-否
   * @format int32
   */
  master?: number;
  /** 省 */
  provinceName?: string;
  /** 市 */
  cityName?: string;
  /** 角色列表 */
  roleCodeList?: string[];
  /** ip */
  ipAddr?: string;
  /** 成员所属全部部门（如部门成员列表接口；顺序稳定、按 mapping 主键升序，已按 deptId 去重；不表示主部门） */
  deptList?: MemberDeptInfoBean[];
}

export interface MemberDataCacheReq {
  /**
   * 事件类型 1-上次进入菜单登记
   * @format int32
   */
  eventType: number;
  /** 事件内容 */
  content: string;
}

export interface AccountPwdLoginReq {
  /** 账号不能为空 */
  account: string;
  /** 密码 */
  pwd: string;
}

export interface MemberNameCheckReq {
  /** 用户名 */
  memberName: string;
}

export interface ChangeAccountStatusQueryReq {
  /** 账号编码 */
  accountCode: string;
  /**
   * 状态 0-停用 1-启用
   * @format int32
   */
  loginStatus: number;
}

export interface AuthCallbackReq {
  /**
   * 授权类型 1-钉钉
   * @format int32
   */
  authType: number;
  /** 授权码 */
  authCode: string;
  /** 回调校验 state */
  state?: string;
}

/** 导航列表 */
export interface SystemNavBean {
  /** 素材编码 */
  materialCode?: string;
  /** 素材图片 */
  materialImage?: string;
  /** 素材名称 */
  materialName?: string;
  /** 素材描述 */
  materialDesc?: string;
  /** 跳转链接 */
  jumpUrl?: string;
  /**
   * 是否收藏 1-收藏 0-未收藏
   * @format int32
   */
  collectFlag?: number;
  /**
   * 排序 从小到大
   * @format int32
   */
  sort?: number;
  /**
   * 是否可以移动 1-可移动 2-不可移动
   * @format int32
   */
  status?: number;
}

export interface SystemNavListQueryResp {
  /** 用户收藏导航列表 */
  memberCollectNavList?: SystemNavBean[];
  /** 系统导航模块列表 */
  systemNavModelList?: SystemNavModelBean[];
}

/** 系统导航模块列表 */
export interface SystemNavModelBean {
  /** 模块编码 */
  model?: string;
  /** 模块名称 */
  name?: string;
  /**
   * 模块排序
   * @format int32
   */
  sort?: number;
  /** 导航列表 */
  systemNavList?: SystemNavBean[];
}

export interface SubDeptListQueryReq {
  /**
   * 父级部门 id, 为空时查询跟级部门下的子部门
   * @format int64
   */
  parentId?: number;
}

/** 部门信息列表 */
export interface DeptInfoBean {
  /**
   * 部门id
   * @format int64
   */
  deptId?: number;
  /**
   * 父部门id
   * @format int64
   */
  parentId?: number;
  /** 部门名称 */
  deptName?: string;
  /** 部门来源标识 */
  sourceIdentifier?: string;
  /**
   * 排序
   * @format int64
   */
  sort?: number;
  /**
   * 部门直属成员数量
   * @format int32
   */
  memberCount?: number;
  /** 子部门列表 */
  children?: DeptInfoBean[];
}

export interface SubDeptListQueryResp {
  /** 部门信息列表 */
  deptInfoList?: DeptInfoBean[];
}

export interface MenuVisitListResp {
  /** 菜单编码 */
  menuCode?: string;
  /** 菜单描述 */
  menuDesc?: string;
  /** 菜单路径 */
  path?: string;
}

export interface MemberListQueryReq {
  /**
   * 页数
   * @format int32
   * @min 1
   * @default 1
   */
  pageNum: number;
  /**
   * 每页数量
   * @format int32
   * @max 100
   * @default 10
   */
  pageSize: number;
  /**
   * 用于导出时, 前端传递用户查询条件
   * @example {}
   */
  queryParam?: Record<string, string>;
  /** 关键字查询, 成员名称/昵称/手机号/邮箱 */
  keyword?: string;
  /** 根部门id */
  rootDeptId?: string;
}

export interface MemberListQueryResp {
  /**
   * 总数
   * @format int64
   */
  total?: number;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  code?: string;
  message?: string;
  /** 成员列表 */
  memberList?: MemberBean[];
}

export interface MemberInfoQueryResp {
  /** 姓名 */
  name?: string;
  /** 钉钉昵称 */
  nickname?: string;
  /** 钉钉头像 */
  avatar?: string;
  /**
   * 发起审批未完成数量
   * @format int32
   */
  approvalNumber?: number;
  /**
   * 个人任务数量
   * @format int32
   */
  taskNumber?: number;
  /**
   * 待处理工单数量
   * @format int32
   */
  workflowNumber?: number;
  /**
   * 钉钉悦积分
   * @format int32
   */
  dingTalkPoint?: number;
}

export interface MemberDetailQueryReq {
  /** 成员code */
  memberCode: string;
}

export interface MemberDetailQueryResp {
  /** 账号编码 */
  accountCode?: string;
  /**
   * 来源: 0-员工 1-供应商
   * @format int32
   */
  source?: number;
  /** 成员Code source=0 则是userCode, =1 则是supplierCode */
  memberCode?: string;
  /** 成员名称 */
  name?: string;
  /** 手机号 */
  mobile?: string;
  /** 头像 */
  avatar?: string;
  /** 昵称 */
  nickname?: string;
  /** 邮箱 */
  email?: string;
  /** 国家 */
  stateCode?: string;
  /** 工号 */
  jobNumber?: string;
  /** 职称 */
  title?: string;
  /**
   * 用户所属一级部门id
   * @format int64
   */
  rootDeptId?: number;
  /**
   * 是否超级管理员 1-是 0-否
   * @format int32
   */
  superAdmin?: number;
  /**
   * 是否角色管理菜单的超级管理员 1-是 0-否
   * @format int32
   */
  superAdminInRoleManagerMenu?: number;
  /**
   * 部门id
   * @format int64
   */
  deptId?: number;
  /** 部门名称 */
  deptName?: string;
  /** 成员所属全部部门（如部门成员列表接口；顺序稳定、按 mapping 主键升序，已按 deptId 去重；不表示主部门） */
  deptInfo?: MemberDeptInfoBean;
  /**
   * 是否删除 1-是 离职 0-否 在职
   * @format int32
   */
  deleted?: number;
  /**
   * 是否主账号 1-是 0-否
   * @format int32
   */
  master?: number;
  /** 省 */
  provinceName?: string;
  /** 市 */
  cityName?: string;
  /** 角色列表 */
  roleCodeList?: string[];
  /** ip */
  ipAddr?: string;
  /** 成员所属全部部门（如部门成员列表接口；顺序稳定、按 mapping 主键升序，已按 deptId 去重；不表示主部门） */
  deptList?: MemberDeptInfoBean[];
}

export interface MemberCollectListQueryResp {
  /** 用户收藏导航列表 */
  memberCollectNavList?: SystemNavBean[];
}

export type MemberCenterModuleListReq = object;

/** 模块列表 */
export interface MemberCenterModuleBean {
  /** 模块编码 */
  moduleCode?: string;
  /** 标题 */
  title?: string;
  /** 描述 */
  desc?: string;
  /** 图标 */
  icon?: string;
  /** 链接 */
  url?: string;
  /**
   * 分栏
   * @format int32
   */
  col?: number;
  /** 透传参数 */
  params?: {
    innerMap?: Record<string, object>;
    empty?: boolean;
    [key: string]: any;
  };
}

export interface MemberCenterModuleListResp {
  /** 模块列表 */
  moduleList?: MemberCenterModuleBean[];
}

export interface DeptTreeQueryReq {
  /**
   * 部门 id, 为空时查询所有部门
   * @format int64
   */
  deptId?: number;
}

export interface DeptTreeQueryResp {
  /** 部门信息列表 */
  deptInfoList?: DeptInfoBean[];
}

export interface DeptMemberListQueryReq {
  /**
   * 部门id
   * @format int64
   */
  deptId?: number;
  /** 操作业务部门编码 */
  operatorDepartmentCode?: string;
  /** 是否递归包含子部门成员, 默认false */
  recursive?: boolean;
}

export interface DeptMemberListQueryResp {
  /** 成员列表 */
  memberList?: MemberBean[];
}

export interface AuthInfoQueryReq {
  /**
   * 授权类型 1-钉钉
   * @format int32
   */
  authType: number;
  /** 重定向 url */
  redirectUrl?: string;
}

export interface AuthInfoQueryResp {
  /** 授权地址, 跳转到第三方授权页面使用 */
  authUrl?: string;
  /** 回调地址 */
  redirectUrl?: string;
  /** clientId */
  clientId?: string;
  /** state */
  state?: string;
}
