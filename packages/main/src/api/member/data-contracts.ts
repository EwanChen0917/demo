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

/** AccountDetailResp */
export interface AccountDetailResp {
  /** 员工账号 */
  account?: string;
  /** 员工账号编码 */
  accountCode?: string;
  /** 部门信息 */
  deptList?: DictCommonBean[];
  /** 邮箱 */
  email?: string;
  /**
   * 是否主账号
   * @format int32
   */
  isMaster?: number;
  /**
   * 在职状态: 0-在职 1-离职
   * @format int64
   */
  jobStatus?: number;
  /** 在职状态描述 */
  jobStatusDesc?: string;
  /** 最后登录时间 */
  lastLogin?: string;
  /** 最后操作时间 */
  lastOperation?: string;
  /** 员工编码 */
  memberCode?: string;
  /** 员工名称 */
  name?: string;
  /** 手机号 */
  phone?: string;
  /** 职务 */
  position?: string;
  /** 备注 */
  remark?: string;
  /** 角色 */
  roleList?: DictCommonBean[];
  /**
   * 来源类型
   * @format int32
   */
  source?: number;
  /** 来源类型描述 */
  sourceDesc?: string;
  /**
   * 状态: 0-启用 1-禁用
   * @format int32
   */
  status?: number;
  /** 状态描述 */
  statusDesc?: string;
  /**
   * 外部员工（不包含默认系统）默认-1
   * @format int32
   */
  unDefaultSystemFlag?: number;
}

/** AccountPwdLoginReq */
export interface AccountPwdLoginReq {
  /** 账号不能为空 */
  account?: string;
  /** 密码 */
  pwd?: string;
}

/** AccountQueryListReq */
export interface AccountQueryListReq {
  /** 部门编码列表 */
  deptIdList?: string[];
  /**
   * 在职状态: 0-在职 1-离职
   * @format int32
   */
  jobStatus?: number;
  /** 姓名/手机/邮箱 */
  keyword?: string;
  /** 不包含部门编码列表 */
  notInDeptIdList?: string[];
  /** 不包含部门编码列表 */
  notRoleCodeList?: string[];
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
  /** 角色编码列表 */
  roleCodeList?: string[];
  /** 类型来源 0-员工 1-供应商 2-SRM  3-外部员工 */
  source?: string;
}

/** AccountQueryListResp */
export interface AccountQueryListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  recordList?: AccountQueryListRespItem[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** AccountQueryListRespItem */
export interface AccountQueryListRespItem {
  /** 账号 */
  accountCode?: string;
  /** 部门 */
  deptList?: DictCommonBean[];
  /** 邮箱 */
  email?: string;
  /**
   * 主键
   * @format int64
   */
  id?: number;
  /**
   * 是否是主账号: 0-否 1-是
   * @format int32
   */
  isMaster?: number;
  /**
   * 在职状态: 0-在职 1-离职
   * @format int32
   */
  jobStatus?: number;
  /** 在职状态描述 */
  jobStatusDesc?: string;
  /** 最后登录时间 */
  lastLogin?: string;
  /** 最后操作时间 */
  lastOperation?: string;
  /** 姓名 */
  name?: string;
  /** 手机号 */
  phone?: string;
  /** 职位 */
  position?: string;
  /** 角色 */
  roleList?: DictCommonBean[];
  /**
   * 来源： 0-员工 1-供应商 2-外部员工
   * @format int32
   */
  source?: number;
  /** 来源： 0-员工 1-供应商 2-外部员工 */
  sourceDesc?: string;
  /**
   * 状态: 0-启用 1-禁用
   * @format int32
   */
  status?: number;
  /** 状态描述 */
  statusDesc?: string;
}

/** AccountSaveReq */
export interface AccountSaveReq {
  /** 账号 */
  account?: string;
  /** 账号编码 */
  accountCode?: string;
  /**
   * 账号类型 参考AccountTypeEnum
   * @format int32
   */
  accountType?: number;
  /**
   * 用户所属部门
   * @format int64
   */
  deptId?: number;
  /** 部门集合 */
  deptIdList?: number[];
  /** 用户手机号 */
  mobile?: string;
  /** 用户名 */
  name?: string;
  /** 密码 */
  password?: string;
  /** 说明备注 */
  remark?: string;
  /** 用户角色 */
  roleList?: string[];
  /** 用户职位 */
  title?: string;
  /**
   * 外部员工（不包含默认系统）默认: 1
   * @format int32
   */
  unDefaultSystemFlag?: number;
}

/** AuthCallbackReq */
export interface AuthCallbackReq {
  /** 授权码 */
  authCode: string;
  /**
   * 授权类型 1-钉钉
   * @format int32
   */
  authType: number;
  /** 平台标识，如 lute_aigc_global */
  platform?: string;
  /** 回调校验 state */
  state?: string;
}

/** AuthCallbackResp */
export interface AuthCallbackResp {
  /** 账号编码 */
  accountCode?: string;
  /** 员工所属所有部门信息 */
  allDepts?: string[];
  /** 头像 */
  avatar?: string;
  /** 生日 */
  birthday?: string;
  /** 市 */
  cityName?: string;
  /**
   * 是否删除 1-是 离职 0-否 在职
   * @format int32
   */
  deleted?: number;
  /**
   * 部门id
   * @format int64
   */
  deptId?: number;
  /** 员工所属最高级部门信息 */
  deptInfo?: MemberDeptInfoBean;
  /** 部门名称 */
  deptName?: string;
  /** 邮箱 */
  email?: string;
  /** 性别 */
  gender?: string;
  /** ip */
  ipAddr?: string;
  /** 工号 */
  jobNumber?: string;
  /** 直属领导id */
  managerUserid?: string;
  /**
   * 是否主账号 1-是 0-否
   * @format int32
   */
  master?: number;
  /** 成员Code source=0 则是userCode, =1 则是supplierCode */
  memberCode?: string;
  /** 手机号 */
  mobile?: string;
  /** 成员名称 */
  name?: string;
  /** 昵称 */
  nickname?: string;
  /** 省 */
  provinceName?: string;
  /** 角色列表 */
  roleCodeList?: string[];
  /**
   * 用户所属一级部门id
   * @format int64
   */
  rootDeptId?: number;
  secret?: string;
  /**
   * 来源: 0-员工 1-供应商
   * @format int32
   */
  source?: number;
  /** 国家 */
  stateCode?: string;
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
  /** 职称 */
  title?: string;
  /** token */
  token?: string;
  /**
   * 外部员工（不包含默认系统）默认-1
   * @format int32
   */
  unDefaultSystemFlag?: number;
  /**
   * 有效时长
   * @format int64
   */
  validTime?: number;
}

/** AuthInfoQueryResp */
export interface AuthInfoQueryResp {
  /** 授权地址, 跳转到第三方授权页面使用 */
  authUrl?: string;
  /** clientId */
  clientId?: string;
  /** 回调地址 */
  redirectUrl?: string;
  /** state */
  state?: string;
}

/** ChangeAccountStatusQueryReq */
export interface ChangeAccountStatusQueryReq {
  /** 账号编码 */
  accountCode?: string;
  /**
   * 状态 0-停用 1-启用
   * @format int32
   */
  loginStatus?: number;
}

/** ChangeMasterUserReq */
export interface ChangeMasterUserReq {
  /** 账号 */
  accountCode?: string;
}

/** ChangeRoleUserReq */
export interface ChangeRoleUserReq {
  /** 添加员工 */
  addUserAccountCodeList?: string[];
  /** 删除员工 */
  deleteUserAccountCodeList?: string[];
  /** 账号 */
  roleCode?: string;
}

/** ChangeUserRoleReq */
export interface ChangeUserRoleReq {
  /** 账号 */
  accountCodeList?: string[];
  /** 添加权限 */
  addRoleCodeList?: string[];
  /** 删除权限 */
  deleteRoleCodeList?: string[];
  /** 保存权限--全量 */
  saveRoleCodeList?: string[];
}

/** CommonResp */
export interface CommonResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: object;
  traceId?: string;
}

/** Dept */
export interface Dept {
  /** 校验 */
  checked?: boolean;
  /** 子部门列表 */
  children?: Dept[];
  /**
   * 部门id
   * @format int64
   */
  deptId?: number;
  /** 部门名称 */
  deptName?: string;
  /**
   * 父部门id
   * @format int64
   */
  parentId?: number;
  /** 角色账号 */
  roleAccountBean?: RoleAccountBean;
  /**
   * 排序
   * @format int64
   */
  sort?: number;
  /** 部门来源标识 */
  sourceIdentifier?: string;
}

/** DeptBean */
export interface DeptBean {
  /**
   * 部门编码
   * @format int64
   */
  deptId?: number;
  /** 部门名称 */
  deptName?: string;
  /**
   * 部门负责人 1-是 0-不是
   * @format int32
   */
  leader?: number;
}

/** DeptInfoBean */
export interface DeptInfoBean {
  /** 是否勾选 使用处：在线知识库 */
  check?: boolean;
  /** 子部门列表 */
  children?: DeptInfoBean[];
  /**
   * 部门id
   * @format int64
   */
  deptId?: number;
  /** 部门名称 */
  deptName?: string;
  /**
   * 父部门id
   * @format int64
   */
  parentId?: number;
  /**
   * 排序
   * @format int64
   */
  sort?: number;
  /** 部门来源标识 */
  sourceIdentifier?: string;
}

/** DeptMemberListQueryResp */
export interface DeptMemberListQueryResp {
  /** 成员列表 */
  memberList?: MemberBean[];
}

/** DeptMemberMapQueryReq */
export interface DeptMemberMapQueryReq {
  /** 操作业务部门编码 */
  operatorDepartmentCode?: string[];
}

/** DeptTreeQueryResp */
export interface DeptTreeQueryResp {
  /** 部门信息列表 */
  deptInfoList?: DeptInfoBean[];
}

/** DictCommonBean */
export interface DictCommonBean {
  desc?: string;
  /** 过滤关键字 */
  filterKeyWord?: string;
  value?: string;
}

/** LoginTokenResp */
export interface LoginTokenResp {
  /** 员工编码 */
  accountCode?: string;
  /** token */
  token?: string;
}

/** MdpCodeResp */
export interface MdpCodeResp {
  /** mdp系统ssotoken */
  mdpSsoCode?: string;
}

/** MemberBean */
export interface MemberBean {
  /** 账号编码 */
  accountCode?: string;
  /** 员工所属所有部门信息 */
  allDepts?: string[];
  /** 头像 */
  avatar?: string;
  /** 生日 */
  birthday?: string;
  /** 市 */
  cityName?: string;
  /**
   * 是否删除 1-是 离职 0-否 在职
   * @format int32
   */
  deleted?: number;
  /**
   * 部门id
   * @format int64
   */
  deptId?: number;
  /** 员工所属最高级部门信息 */
  deptInfo?: MemberDeptInfoBean;
  /** 部门名称 */
  deptName?: string;
  /** 邮箱 */
  email?: string;
  /** 性别 */
  gender?: string;
  /** ip */
  ipAddr?: string;
  /** 工号 */
  jobNumber?: string;
  /** 直属领导id */
  managerUserid?: string;
  /**
   * 是否主账号 1-是 0-否
   * @format int32
   */
  master?: number;
  /** 成员Code source=0 则是userCode, =1 则是supplierCode */
  memberCode?: string;
  /** 手机号 */
  mobile?: string;
  /** 成员名称 */
  name?: string;
  /** 昵称 */
  nickname?: string;
  /** 省 */
  provinceName?: string;
  /** 角色列表 */
  roleCodeList?: string[];
  /**
   * 用户所属一级部门id
   * @format int64
   */
  rootDeptId?: number;
  /**
   * 来源: 0-员工 1-供应商
   * @format int32
   */
  source?: number;
  /** 国家 */
  stateCode?: string;
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
  /** 职称 */
  title?: string;
  /**
   * 外部员工（不包含默认系统）默认-1
   * @format int32
   */
  unDefaultSystemFlag?: number;
}

/** MemberCenterModuleBean */
export interface MemberCenterModuleBean {
  /**
   * 分栏
   * @format int32
   */
  col?: number;
  /** 描述 */
  desc?: string;
  /** 图标 */
  icon?: string;
  /** 模块编码 */
  moduleCode?: string;
  /** 透传参数 */
  params?: Record<string, object>;
  /** 标题 */
  title?: string;
  /** 链接 */
  url?: string;
}

/** MemberCenterModuleListResp */
export interface MemberCenterModuleListResp {
  /** 模块列表 */
  moduleList?: MemberCenterModuleBean[];
}

/** MemberCollectBatchSaveReq */
export interface MemberCollectBatchSaveReq {
  /** 场景 sys-系统导航 menue-菜单收藏 */
  collectScene?: string;
  /** 收藏对象 */
  itemList?: MemberCollectSaveItem[];
  /** 来源 lute_os_v2,lute_erp */
  source?: string;
}

/** MemberCollectBean */
export interface MemberCollectBean {
  /**
   * 收藏状态 0-未收藏 1-已收藏
   * @format int32
   */
  collectFlag?: number;
  /** 场景 sys-系统导航 menue */
  collectScene?: string;
  /** 组件名称 */
  componentName?: string;
  /** 收藏对象编码 */
  itemCode?: string;
  /** 素材名称 */
  itemName?: string;
  /** 成员编码 */
  memberCode?: string;
  /** 菜单类型 */
  menuType?: string;
  /** 路径 */
  path?: string;
  /**
   * 排序从小到大
   * @format int32
   */
  sort?: number;
  /** 收藏归属平台 lute_os、lute_erp、common */
  source?: string;
}

/** MemberCollectListQueryResp */
export interface MemberCollectListQueryResp {
  /** 用户收藏导航列表 */
  memberCollectNavList?: SystemNavBean[];
}

/** MemberCollectQueryResp */
export interface MemberCollectQueryResp {
  /** 用户收藏导航列表 */
  memberCollectList?: MemberCollectBean[];
}

/** MemberCollectSaveItem */
export interface MemberCollectSaveItem {
  /**
   * 收藏状态 0-未收藏 1-已收藏
   * @format int32
   */
  collectFlag?: number;
  /** 收藏对象编码 */
  itemCode?: string;
  /**
   * 排序 从小到大
   * @format int32
   */
  sort?: number;
}

/** MemberCollectSaveReq */
export interface MemberCollectSaveReq {
  /**
   * 收藏状态 0-未收藏 1-已收藏
   * @format int32
   */
  collectFlag?: number;
  /** 场景 sys-系统导航 menue-菜单收藏 */
  collectScene?: string;
  /** 收藏对象编码 */
  itemCode?: string;
  /** 菜单类型 */
  menuType?: string;
  /** 系统路径 */
  path?: string;
  /**
   * 排序 从小到大
   * @format int32
   */
  sort?: number;
  /** 来源 lute_os_v2,lute_erp */
  source?: string;
}

/** MemberCollectSysListQueryResp */
export interface MemberCollectSysListQueryResp {
  /** 用户收藏系统列表 */
  collectSysList?: SystemNavBean[];
  /** 用户备选列表 */
  navModelBeanList?: SystemNavModelBean[];
}

/** MemberDataCacheReq */
export interface MemberDataCacheReq {
  /** 事件内容 */
  content?: string;
  /**
   * 事件类型 1-上次进入菜单登记
   * @format int32
   */
  eventType?: number;
}

/** MemberDeptInfoBean */
export interface MemberDeptInfoBean {
  /**
   * 部门id
   * @format int64
   */
  deptId?: number;
  /** 部门名称 */
  deptName?: string;
  /**
   * 一级部门id
   * @format int64
   */
  firstDeptId?: number;
  /** 一级部门名称 */
  firstDeptName?: string;
  /** 员工编码 */
  memberCode?: string;
  /**
   * 父级部门id
   * @format int64
   */
  parentId?: number;
  /** 父级部门名称 */
  parentName?: string;
  /**
   * 二级部门id
   * @format int64
   */
  secondDeptId?: number;
  /** 二级部门名称 */
  secondDeptName?: string;
  /**
   * 三级部门id
   * @format int64
   */
  thirdDeptId?: number;
  /** 三级部门名称 */
  thirdDeptName?: string;
}

/** MemberDetailQueryResp */
export interface MemberDetailQueryResp {
  /** 账号编码 */
  accountCode?: string;
  /** 员工所属所有部门信息 */
  allDepts?: string[];
  /** 头像 */
  avatar?: string;
  /** 生日 */
  birthday?: string;
  /** 市 */
  cityName?: string;
  /**
   * 是否删除 1-是 离职 0-否 在职
   * @format int32
   */
  deleted?: number;
  /**
   * 部门id
   * @format int64
   */
  deptId?: number;
  /** 员工所属最高级部门信息 */
  deptInfo?: MemberDeptInfoBean;
  /** 部门信息 */
  deptList?: DeptBean[];
  /** 部门名称 */
  deptName?: string;
  /** 邮箱 */
  email?: string;
  /** 性别 */
  gender?: string;
  /** ip */
  ipAddr?: string;
  /** 工号 */
  jobNumber?: string;
  /**
   * 是否部门负责人
   * @format int32
   */
  leader?: number;
  /** 直属领导id */
  managerUserid?: string;
  /**
   * 是否主账号 1-是 0-否
   * @format int32
   */
  master?: number;
  /** 成员Code source=0 则是userCode, =1 则是supplierCode */
  memberCode?: string;
  /** 手机号 */
  mobile?: string;
  /** 成员名称 */
  name?: string;
  /** 昵称 */
  nickname?: string;
  /** 省 */
  provinceName?: string;
  /** 角色列表 */
  roleCodeList?: string[];
  /**
   * 用户所属一级部门id
   * @format int64
   */
  rootDeptId?: number;
  /**
   * 来源: 0-员工 1-供应商
   * @format int32
   */
  source?: number;
  /** 国家 */
  stateCode?: string;
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
  /** 职称 */
  title?: string;
  /**
   * 外部员工（不包含默认系统）默认-1
   * @format int32
   */
  unDefaultSystemFlag?: number;
}

/** MemberInfoQueryResp */
export interface MemberInfoQueryResp {
  /**
   * 发起审批未完成数量
   * @format int32
   */
  approvalNumber?: number;
  /** 钉钉头像 */
  avatar?: string;
  /**
   * 钉钉悦积分
   * @format int32
   */
  dingTalkPoint?: number;
  /** 姓名 */
  name?: string;
  /** 钉钉昵称 */
  nickname?: string;
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
}

/** MemberListByTitleResp */
export interface MemberListByTitleResp {
  /** 员工信息 */
  memberList?: MemberSimpleBean[];
}

/** MemberListQueryResp */
export interface MemberListQueryResp {
  code?: string;
  /** 成员列表 */
  memberList?: MemberBean[];
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

/** MemberMenuVisitSaveReq */
export interface MemberMenuVisitSaveReq {
  /** 菜单 */
  menuCode?: string;
}

/** MemberNameCheckReq */
export interface MemberNameCheckReq {
  /** 用户名 */
  memberName?: string;
}

/** MemberSimpleBean */
export interface MemberSimpleBean {
  /** 成员编码 */
  memberCode?: string;
  /** 成员名称 */
  name?: string;
}

/** MemberSysSelectListQueryResp */
export interface MemberSysSelectListQueryResp {
  /** 导航模型列表 */
  navModelBeanList?: SystemNavModelBean[];
}

/** MenuVisitListResp */
export interface MenuVisitListResp {
  /** 组件名称 */
  componentName?: string;
  /** 菜单编码 */
  menuCode?: string;
  /** 菜单描述 */
  menuDesc?: string;
  /** 菜单路径 */
  path?: string;
  /** 重定向 */
  redirect?: string;
}

/** RefreshVersionResp */
export interface RefreshVersionResp {
  /**
   * 是否更新 1-需要更新 0-不需要更新
   * @format int32
   */
  isSync?: number;
}

/** RoleAccountBean */
export interface RoleAccountBean {
  /** 账号编号 */
  accountCode?: string;
  /** 校验 */
  checked?: boolean;
  /** 名称 */
  name?: string;
  /**
   * 来源: 0-员工 1-供应商
   * @format int32
   */
  source?: number;
  /** 来源编码 */
  sourceCode?: string;
  /** 唯一code */
  uniqueCode?: string;
}

/** RoleAccountResp */
export interface RoleAccountResp {
  /** 组织架构 */
  deptList?: Dept[];
  /** 角色 */
  roleCode?: string;
}

/** SecondLevelDeptResp */
export interface SecondLevelDeptResp {
  /** 部门信息 */
  deptInfoList?: DeptInfoBean[];
}

/** SendPasswordReq */
export interface SendPasswordReq {
  /** 邮箱 */
  email?: string;
}

/** SubDeptListQueryReq */
export interface SubDeptListQueryReq {
  /**
   * 父级部门 id, 为空时查询跟级部门下的子部门
   * @format int64
   */
  parentId?: number;
  /** 父级部门id列表 */
  parentIdList?: number[];
}

/** SubDeptListQueryResp */
export interface SubDeptListQueryResp {
  /** 部门信息列表 */
  deptInfoList?: DeptInfoBean[];
}

/** SysReportReq */
export interface SysReportReq {
  /** 事件id add_product 、detail 、link 更多在字典中维护 - 暂时废弃 */
  eventId?: string;
  /** 事件描述 例如 新增商品-add_product 详情页-detail 跳转链接-link */
  eventName?: string;
  /** 上报拓展参数 extraInfo 参数内容必须是json格式数据 */
  extraInfo?: string;
  /** 员工编码 */
  memberCode?: string;
  /** 菜单编码 */
  menuCode?: string;
  /** 菜单描述 */
  menuDesc?: string;
  /** 页面url */
  pageUrl: string;
  /** 平台 rpe/erp/kol/aigc/aigc-admin等 */
  platform: string;
  /** 类型：菜单-menu 行为(按钮-button  链接-link) */
  type: string;
}

/** SystemNavBean */
export interface SystemNavBean {
  /**
   * 是否收藏 1-收藏 0-未收藏
   * @format int32
   */
  collectFlag?: number;
  /** 跳转链接 */
  jumpUrl?: string;
  /** 素材编码 */
  materialCode?: string;
  /** 素材描述 */
  materialDesc?: string;
  /** 素材图片 */
  materialImage?: string;
  /** 素材名称 */
  materialName?: string;
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

/** SystemNavListQueryResp */
export interface SystemNavListQueryResp {
  /** 用户收藏导航列表 */
  memberCollectNavList?: SystemNavBean[];
  /** 系统导航模块列表 */
  systemNavModelList?: SystemNavModelBean[];
}

/** SystemNavModelBean */
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

/** UpdatePasswordReq */
export interface UpdatePasswordReq {
  /** 新密码 */
  newPassword?: string;
  /** 确认密码 */
  newPasswordConfirm?: string;
  /** 原密码 */
  originPassword?: string;
}

/** UpdateUserInfoReq */
export interface UpdateUserInfoReq {
  /** 账号 */
  accountCodeList?: string[];
  /** 添加权限 */
  addRoleCodeList?: string[];
  /** 生日 */
  birthday?: string;
  /** 删除权限 */
  deleteRoleCodeList?: string[];
  /** 性别 */
  gender?: string;
  /** 员工编码 */
  memberCode?: string;
  /** 用户名称 */
  name?: string;
  /** 保存权限--全量 */
  saveRoleCodeList?: string[];
  /**
   * 是否只更新基础信息 1-是 0-否
   * @format int32
   */
  updateBaseInfoFlag?: number;
}

/** CommonResp«AccountQueryListResp» */
export interface CommonRespAccountQueryListResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: AccountQueryListResp;
  traceId?: string;
}

/** CommonResp«Map«string,List«MemberBean»»» */
export interface CommonRespMapStringListMemberBean {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: Record<string, MemberBean[]>;
  traceId?: string;
}

/** CommonResp«Void» */
export interface CommonRespVoid {
  code?: string;
  enMessage?: string;
  message?: string;
  traceId?: string;
}

/** CommonResp«int» */
export interface CommonRespInt {
  code?: string;
  enMessage?: string;
  message?: string;
  /** @format int32 */
  result?: number;
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
