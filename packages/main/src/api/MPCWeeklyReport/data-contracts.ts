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

/** MarketCurrentGroupAreaBean */
export interface MarketCurrentGroupAreaBean {
  /**
   * 区域ID
   * @format int64
   */
  areaId?: number;
  /** 区域 */
  areaName?: string;
  /**
   * 组别区域ID
   * @format int64
   */
  groupAreaId?: number;
  /** 组别名称 */
  groupName?: string;
  /**
   * 周报模版ID
   * @format int32
   */
  reportType?: number;
  /** 类型名称 */
  typeName?: string;
}

/** MarketCurrentUserGroupAreaResp */
export interface MarketCurrentUserGroupAreaResp {
  /** 当前用户组别区域列表 */
  currentGroupAreaList?: MarketCurrentGroupAreaBean[];
}

/** MarketWeeklyPeriodCopyReq */
export interface MarketWeeklyPeriodCopyReq {
  /** branch */
  branch: string;
  /** 周期 */
  period: string;
  /** reportType */
  reportType: string;
  /** 报告类型集合 */
  reportTypes: string[];
  /**
   * 结束日期名称
   * @format date
   */
  targetEndDate?: string;
  /** 目标周期 */
  targetPeriod: string;
  /**
   * 开始日期名称
   * @format date
   */
  targetStartDate?: string;
}

/** MarketWeeklyReportAreaBean */
export interface MarketWeeklyReportAreaBean {
  /**
   * ID
   * @format int64
   */
  id?: number;
  /** 区域名称 */
  name?: string;
}

/** MarketWeeklyReportAreaResp */
export interface MarketWeeklyReportAreaResp {
  /** 周报区域列表 */
  reportAreaList?: MarketWeeklyReportAreaBean[];
}

/** MarketWeeklyReportBean */
export interface MarketWeeklyReportBean {
  /** 头像 */
  avatar?: string;
  /** 所属部门分支（经营分析报告必填） */
  branch?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /** 创建人名称 */
  creatorName?: string;
  /** 部门名称 */
  deptName?: string;
  /** 详情 */
  detail?: MarketWeeklyReportDetailBean;
  /** 计划结束日期 */
  endDate?: string;
  /**
   * 组别区域ID
   * @format int64
   */
  groupAreaId?: number;
  /**
   * 周报ID
   * @format int64
   */
  id?: number;
  /** 员工工号 */
  jobNumber?: string;
  /** 员工编号 */
  memberCode?: string;
  /** 周期 */
  period?: string;
  /** 周报唯一键id */
  reportId?: string;
  /** 报告标题 */
  reportTitle?: string;
  /**
   * 报告类型
   * @format int32
   */
  reportType?: number;
  /** 计划开始日期 */
  startDate?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** MarketWeeklyReportConfigListResp */
export interface MarketWeeklyReportConfigListResp {
  /** 周报配置列表 */
  recordList?: WeekReportConfigBean[];
}

/** MarketWeeklyReportCopyReq */
export interface MarketWeeklyReportCopyReq {
  /** 周期 */
  period?: string;
  /** 周报唯一键id */
  reportId: string;
  /** 报告标题 */
  reportTitle?: string;
}

/** MarketWeeklyReportCopyResp */
export interface MarketWeeklyReportCopyResp {
  /** 复制结果 */
  weeklyReport?: MarketWeeklyReportBean;
}

/** MarketWeeklyReportCreateReq */
export interface MarketWeeklyReportCreateReq {
  /** 所属部门分支（经营分析报告必填） */
  branch?: string;
  /**
   * 结束日期名称
   * @format date
   */
  endDate?: string;
  /**
   * 组别区域ID，默认0
   * @format int32
   */
  groupAreaId?: number;
  /** 报告详情列表 */
  itemList?: MarketWeeklyReportDetailCreateReq[];
  /** 员工工号 */
  jobNumber?: string;
  /** 员工编号 */
  memberCode?: string;
  /** 周期 */
  period?: string;
  /** 报告标题 */
  reportTitle?: string;
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

/** MarketWeeklyReportCreateResp */
export interface MarketWeeklyReportCreateResp {
  /** 周报编码 */
  reportId?: string;
  /** 更新时间 */
  updateTime?: string;
  /** 更新人 */
  updater?: string;
  /** 更新人头像 */
  updaterAvatar?: string;
  /** 更新人部门 */
  updaterDeptName?: string;
  /** 更新人名称 */
  updaterName?: string;
  /** 更新人岗位名称 */
  updaterTitle?: string;
}

/** MarketWeeklyReportDeleteReq */
export interface MarketWeeklyReportDeleteReq {
  /** 周报唯一键id */
  reportId: string;
}

/** MarketWeeklyReportDetailBean */
export interface MarketWeeklyReportDetailBean {
  /** 公司编码 */
  companyCode?: string;
  /** 配置项内容 */
  configContent?: string;
  /** 周报配置id */
  configId?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /** 周报详情唯一键id */
  detailId?: string;
  /**
   * 周报详情草稿ID
   * @format int64
   */
  id?: number;
  /** 备注 */
  remark?: string;
  /** 关联周报唯一键id */
  reportId?: string;
  /**
   * 状态 0草稿 1正式
   * @format int32
   */
  status?: number;
  /** 配置项标题 */
  title?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** MarketWeeklyReportDetailCreateReq */
export interface MarketWeeklyReportDetailCreateReq {
  /** 配置项内容 */
  configContent?: string;
  /** 配置id */
  configId?: string;
  /** 详情id */
  detailId?: string;
  /** 备注 */
  remark?: string;
  /** 周报唯一键id */
  reportId?: string;
  /**
   * 状态 0草稿 1正式
   * @format int32
   */
  status?: number;
}

/** MarketWeeklyReportDetailResp */
export interface MarketWeeklyReportDetailResp {
  /** 区域 */
  areaName?: string;
  /** 创建人头像 */
  avatar?: string;
  /** 所属用户 */
  belongUser?: string;
  /** 所属部门分支（经营分析报告必填） */
  branch?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /** 创建人名称 */
  creatorName?: string;
  /** 创建人部门 */
  deptName?: string;
  /** 计划结束日期 */
  endDate?: string;
  /**
   * 组别区域ID
   * @format int64
   */
  groupAreaId?: number;
  /** 组别名称 */
  groupName?: string;
  /**
   * 周报ID
   * @format int64
   */
  id?: number;
  /** 周报详情列表 */
  itemList?: MarketWeeklyReportDetailBean[];
  /** 周期 */
  period?: string;
  /** 周报唯一键id */
  reportId?: string;
  /** 周报唯一键id */
  reportTitle?: string;
  /**
   * 周报类型：经营分析周报，OC周报等
   * @format int32
   */
  reportType?: number;
  /** 计划开始日期 */
  startDate?: string;
  /** 类型名称 */
  typeName?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /** 更新人 */
  updater?: string;
  /** 更新人头像 */
  updaterAvatar?: string;
  /** 更新人部门 */
  updaterDeptName?: string;
  /** 更新人名称 */
  updaterName?: string;
  /** 更新人岗位名称 */
  updaterTitle?: string;
}

/** MarketWeeklyReportDetailUpdateReq */
export interface MarketWeeklyReportDetailUpdateReq {
  /** 配置项内容 */
  configContent?: string;
  /** 配置id */
  configId?: string;
  /** 周报详情id */
  detailId?: string;
  /** 备注 */
  remark?: string;
  /** 周报id */
  reportId?: string;
  /**
   * 周报类型
   * @format int32
   */
  reportType?: number;
  /**
   * 状态 0草稿 1正式
   * @format int32
   */
  status?: number;
}

/** MarketWeeklyReportGroupAreaBean */
export interface MarketWeeklyReportGroupAreaBean {
  /**
   * 区域ID
   * @format int64
   */
  areaId?: number;
  /** 创建时间 */
  createTime?: string;
  /** 创建热 */
  creator?: string;
  /** 报告详情 */
  detail?: MarketWeeklyReportDetailBean[];
  /**
   * 组区域ID
   * @format int64
   */
  groupTypeAreaId?: number;
  /** 报告ID */
  reportId?: string;
  /** 报告标题 */
  reportTitle?: string;
  /** 更新时间 */
  updateTime?: string;
  /** 更新人 */
  updater?: string;
  /** 更新人头像 */
  updaterAvatar?: string;
  /** 更新人名称 */
  updaterName?: string;
  /** 更新人岗位名称 */
  updaterTitle?: string;
}

/** MarketWeeklyReportGroupBean */
export interface MarketWeeklyReportGroupBean {
  /** 子组别列表 */
  groupChildList?: MarketWeeklyReportGroupAreaBean[];
  /**
   * 类型ID
   * @format int64
   */
  typeId?: number;
  /** 类型名称 */
  typeName?: string;
}

/** MarketWeeklyReportGroupRemoveReq */
export interface MarketWeeklyReportGroupRemoveReq {
  /**
   * 区域ID
   * @format int64
   */
  groupAreaId?: number;
  /** 组别编码 */
  groupCode?: string;
  /**
   * 类型ID
   * @format int64
   */
  typeId?: number;
}

/** MarketWeeklyReportGroupResp */
export interface MarketWeeklyReportGroupResp {
  /** GTM组编码 */
  groupCode?: string;
  /** 组别列表 */
  groupList?: MarketWeeklyReportGroupBean[];
  /** GTM组名称 */
  groupName?: string;
  /** 是否是当前GTM组的GTM */
  gtmFlag?: boolean;
}

/** MarketWeeklyReportGroupSaveReq */
export interface MarketWeeklyReportGroupSaveReq {
  /** 区域ID列表 */
  areaIdList?: number[];
  /** 组别编码 */
  groupCode?: string;
  /** 组别名称 */
  groupName?: string;
  /** 汇报人 */
  reporter?: string;
  /**
   * 类型ID
   * @format int64
   */
  typeId?: number;
}

/** MarketWeeklyReportListPeriodResp */
export interface MarketWeeklyReportListPeriodResp {
  /** 周报列表 */
  recordList?: MarketWeeklyReportBean[];
}

/** MarketWeeklyReportListResp */
export interface MarketWeeklyReportListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 周报列表 */
  recordList?: MarketWeeklyReportBean[];
  /** 周期文件夹列表 */
  recordMapList?: Record<string, MarketWeeklyReportBean[]>;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** MarketWeeklyReportOptionBean */
export interface MarketWeeklyReportOptionBean {
  /** 描述 */
  desc?: string;
  /** GTM品线编码 */
  gtmPlCode?: string;
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

/** MarketWeeklyReportOptionsResp */
export interface MarketWeeklyReportOptionsResp {
  code?: string;
  message?: string;
  /** 选择项 */
  optionBeanList?: MarketWeeklyReportOptionBean[];
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

/** MarketWeeklyReportTypeBean */
export interface MarketWeeklyReportTypeBean {
  /**
   * ID
   * @format int64
   */
  id?: number;
  /** 类型编码 */
  typeCode?: string;
  /** 类型名称 */
  typeName?: string;
}

/** MarketWeeklyReportTypeResp */
export interface MarketWeeklyReportTypeResp {
  /** 存在的周报类型列表 */
  existTypeList?: MarketWeeklyReportTypeBean[];
  /** 不存在的周报类型列表 */
  notExistTypeList?: MarketWeeklyReportTypeBean[];
}

/** MarketWeeklyReportUpdateReq */
export interface MarketWeeklyReportUpdateReq {
  /** 所属部门分支（经营分析报告必填） */
  branch?: string;
  /**
   * 结束日期名称
   * @format date
   */
  endDate: string;
  /** 报告详情列表 */
  itemList?: MarketWeeklyReportDetailUpdateReq[];
  /** 员工工号 */
  jobNumber?: string;
  /** 员工编号 */
  memberCode?: string;
  /** 周期 */
  period?: string;
  /** 周报唯一键id */
  reportId: string;
  /** 报告标题 */
  reportTitle: string;
  /**
   * 周报类型：经营分析周报，OC周报等
   * @format int32
   */
  reportType: number;
  /**
   * 开始日期名称
   * @format date
   */
  startDate: string;
}

/** MarketWeeklyReportWeekListResp */
export interface MarketWeeklyReportWeekListResp {
  /** 周列表 */
  weekList?: WeekBean[];
}

/** MarketWeeklyReporterBean */
export interface MarketWeeklyReporterBean {
  /** 头像 */
  avatar?: string;
  /** 员工编码 */
  memberCode?: string;
  /** 员工名称 */
  name?: string;
  /** 职务 */
  title?: string;
}

/** MarketWeeklyReporterResp */
export interface MarketWeeklyReporterResp {
  /** 汇报人列表 */
  reporterList?: MarketWeeklyReporterBean[];
}

/** WeekBean */
export interface WeekBean {
  /** 结束日期 */
  endDate?: string;
  /** 开始日期 */
  startDate?: string;
  /** 周 */
  week?: string;
}

/** WeekReportConfigBean */
export interface WeekReportConfigBean {
  /** 配置id */
  configId?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 主键ID
   * @format int64
   */
  id?: number;
  /** 周报类型：经营分析周报，OC周报等 */
  reportType?: string;
  /** 标题名称 */
  title?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
}
