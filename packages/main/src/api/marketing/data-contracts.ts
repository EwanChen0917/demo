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

/** GtmOptionBean */
export interface GtmOptionBean {
  /** 描述 */
  desc?: string;
  /** 父类菜单名 */
  parentName?: string;
  /**
   * 排序值，从小到大
   * @format int32
   */
  sort?: number;
  /** 统计看板链接 */
  statisticsUrl?: string;
  /**
   * 1仅查看 2可编辑
   * @format int32
   */
  type?: number;
  /** 值 */
  value?: string;
}

/** GtmOptionsResp */
export interface GtmOptionsResp {
  code?: string;
  /** GTM选择项 */
  gtmList?: GtmOptionBean[];
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

/** UrlInfoResp */
export interface UrlInfoResp {
  /** BI编辑看板链接 */
  customUrl?: string;
  /** SSO TOKEN */
  ssoToken?: string;
  /** BI数据链接 */
  url?: string;
}

/** WeekReportBean */
export interface WeekReportBean {
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /** 计划结束日期 */
  endDate?: string;
  /**
   * 周报ID
   * @format int64
   */
  id?: number;
  /** 周报code */
  reportCode?: string;
  /** 计划开始日期 */
  startDate?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** WeekReportCreateReq */
export interface WeekReportCreateReq {
  /** 所属部门分支（经营分析报告必填） */
  branch?: string;
  /**
   * 结束日期名称
   * @format date
   */
  endDate?: string;
  /** 员工工号 */
  jobNumber?: string;
  /** 员工编号 */
  memberCode?: string;
  /**
   * 报告类型：1 - 经营分析周报，2 - VOC周报， 3-亚马逊周报
   * @format int32
   */
  reportType?: number;
  /**
   * 开始日期名称
   * @format date
   */
  startDate?: string;
}

/** WeekReportCreateResp */
export interface WeekReportCreateResp {
  /** 周报编码 */
  reportCode?: string;
}

/** WeekReportDeleteReq */
export interface WeekReportDeleteReq {
  /** 周报编码 */
  reportCode: string;
}

/** WeekReportDetailBean */
export interface WeekReportDetailBean {
  /** 行动 */
  action?: string;
  /** 检查 */
  check?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 周报详情编码 */
  detailCode?: string;
  /** 执行 */
  doText?: string;
  /**
   * 周报详情ID
   * @format int64
   */
  id?: number;
  /** 计划 */
  plan?: string;
  /** 备注 */
  remark?: string;
  /** 周报编码 */
  reportCode?: string;
  /**
   * 状态 0草稿 1正式
   * @format int32
   */
  status?: number;
  /** 分析对象 */
  target?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** WeekReportDetailCopyReq */
export interface WeekReportDetailCopyReq {
  /**
   * 结束日期名称
   * @format date
   */
  endDate?: string;
  /** 来源周报编码 */
  fromReportCode?: string;
  /**
   * 开始日期名称
   * @format date
   */
  startDate?: string;
}

/** WeekReportDetailCreateReq */
export interface WeekReportDetailCreateReq {
  /** 行动 */
  action?: string;
  /** 检查 */
  check?: string;
  /** 执行 */
  doText?: string;
  /** 计划 */
  plan?: string;
  /** 备注 */
  remark?: string;
  /** 周报编码 */
  reportCode?: string;
  /**
   * 状态 0草稿 1正式
   * @format int32
   */
  status?: number;
  /** 分析对象 */
  target?: string;
}

/** WeekReportDetailCreateResp */
export interface WeekReportDetailCreateResp {
  /** 周报详情编码 */
  detailCode?: string;
}

/** WeekReportDetailDeleteReq */
export interface WeekReportDetailDeleteReq {
  /** 周报详情编码 */
  detailCode: string;
}

/** WeekReportDetailListResp */
export interface WeekReportDetailListResp {
  code?: string;
  /** 周报详情列表 */
  detailList?: WeekReportDetailBean[];
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
  /** 周报信息 */
  weekReport?: WeekReportBean;
}

/** WeekReportDetailUpdateReq */
export interface WeekReportDetailUpdateReq {
  /** 行动 */
  action?: string;
  /** 检查 */
  check?: string;
  /** 周报详情编码 */
  detailCode?: string;
  /** 执行 */
  doText?: string;
  /** 计划 */
  plan?: string;
  /** 备注 */
  remark?: string;
  /**
   * 状态 0草稿 1正式
   * @format int32
   */
  status?: number;
  /** 分析对象 */
  target?: string;
}

/** WeekReportListResp */
export interface WeekReportListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 周报列表 */
  reportList?: WeekReportBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** WeekReportUpdateReq */
export interface WeekReportUpdateReq {
  /**
   * 结束日期名称
   * @format date
   */
  endDate: string;
  /** 周报编码 */
  reportCode: string;
  /**
   * 开始日期名称
   * @format date
   */
  startDate: string;
}
