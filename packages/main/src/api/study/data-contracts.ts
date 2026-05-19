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

/** CatalogSaveBean */
export interface CatalogSaveBean {
  fileCode?: string;
  /** @format int64 */
  minLearningTime?: number;
}

/** CommonExportResp */
export interface CommonExportResp {
  /** app标识 */
  appCode?: string;
  /** 下载链接 */
  downloadUrl?: string;
  /** 模块标识 */
  moduleCode?: string;
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

/** MemberCourseProgressBean */
export interface MemberCourseProgressBean {
  /**
   * 全部状态数量
   * @format int64
   */
  allCount?: number;
  /**
   * 进行中状态数量
   * @format int64
   */
  doingCount?: number;
  /**
   * 已完成状态数量
   * @format int64
   */
  finishedCount?: number;
  /**
   * 未开始状态数量
   * @format int64
   */
  unStartCount?: number;
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

/** StudyCourseCalculateBean */
export interface StudyCourseCalculateBean {
  /**
   * 部门id
   * @format int64
   */
  deptId?: number;
  /** 部门名称 */
  deptName?: string;
  /**
   * 截止时间
   * @format date-time
   */
  endTime?: string;
  /** 完成率 */
  finishedRate?: string;
  /**
   * 完成时间
   * @format date-time
   */
  finishedTime?: string;
  /**
   * 状态 0-未开始 1-学习中 2-已完成 3-逾期已完成 4-逾期完成
   * @format int32
   */
  learningStatus?: number;
  /** 状态 0-未开始 1-学习中 2-已完成 3-逾期已完成 4-逾期完成 */
  learningStatusDesc?: string;
  /** 员工编码 */
  memberCode?: string;
  /** 员工名称 */
  memberName?: string;
  /** 类型 */
  typeDesc?: string;
}

/** StudyCourseCalculateQueryReq */
export interface StudyCourseCalculateQueryReq {
  /** 课程编码 */
  courseCode: string;
  /**
   * 部门id
   * @format int64
   */
  deptId?: number;
  /** 关键词 */
  keyword?: string;
  /** 用户编码 */
  memberCode?: string;
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
  /**
   * 状态 0-未开始 1-学习中 2-已完成 3-逾期已完成 4-逾期完成
   * @format int32
   */
  status?: number;
  /**
   * 类型 1-必修 2-选修
   * @format int32
   */
  type?: number;
}

/** StudyCourseCalculateQueryResp */
export interface StudyCourseCalculateQueryResp {
  code?: string;
  /** 课程统计 */
  courseCalculateList?: StudyCourseCalculateBean[];
  /** 各个状态数量 */
  memberCourseProgress?: MemberCourseProgressBean;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 课程名称 */
  title?: string;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** StudyCourseCatalogQueryResp */
export interface StudyCourseCatalogQueryResp {
  /** 课件信息 */
  catalogList?: CatalogBean[];
}

/** StudyCourseCatalogSaveReq */
export interface StudyCourseCatalogSaveReq {
  /** 文件编码集合 */
  catalogSaveList: CatalogSaveBean[];
  /** 课程编码 */
  courseCode: string;
  /**
   * 操作 1-保存 2-编辑 3-删除 4-排序
   * @format int32
   */
  operateType: number;
}

/** StudyCourseCatalogSaveResp */
export interface StudyCourseCatalogSaveResp {
  /** 课程编码 */
  courseCode?: string;
}

/** StudyCourseConfigDetailResp */
export interface StudyCourseConfigDetailResp {
  /** 配置编码 */
  configCode?: string;
  /** 课程编码 */
  courseCode: string;
  /**
   * 课程截止时间
   * @format date-time
   */
  courseEndTime?: string;
  /**
   * 课程评价 0-不评价 1-评价
   * @format int32
   */
  courseEvaluate?: number;
  /**
   * 学习方式 0-自由式学习 1-解锁式学习
   * @format int32
   */
  learningWay?: number;
  /** 推送内容 */
  remindContent?: string;
  /**
   * 未学提醒 0-关闭 1-启动
   * @format int32
   */
  remindFlag?: number;
  /**
   * 推送周期 单位-天
   * @format int32
   */
  remindPeriod?: number;
  /**
   * 推送时间
   * @format date-time
   */
  remindTime?: string;
}

/** StudyCourseConfigSaveReq */
export interface StudyCourseConfigSaveReq {
  /** 课程编码 */
  courseCode: string;
  /**
   * 课程截止时间
   * @format date-time
   */
  courseEndTime?: string;
  /**
   * 课程评价 0-不评价 1-评价
   * @format int32
   */
  courseEvaluate?: number;
  /**
   * 学习方式 0-自由式学习 1-解锁式学习
   * @format int32
   */
  learningWay?: number;
  /** 推送内容 */
  remindContent?: string;
  /**
   * 未学提醒 0-关闭 1-启动
   * @format int32
   */
  remindFlag?: number;
  /**
   * 推送周期 单位-天
   * @format int32
   */
  remindPeriod?: number;
  /**
   * 推送时间
   * @format date-time
   */
  remindTime?: string;
}

/** StudyCourseConfigSaveResp */
export interface StudyCourseConfigSaveResp {
  /** 课程编码 */
  courseCode?: string;
}

/** StudyCourseDetailResp */
export interface StudyCourseDetailResp {
  /** 培训地址 */
  address?: string;
  /** 分类编码 */
  categoryCode?: string;
  /** 分类 */
  categoryName?: string;
  /** 课程编码 */
  courseCode?: string;
  /** 封面图片url */
  coverUrl?: string;
  /** 简介 */
  description?: string;
  /**
   * 培训结束时间
   * @format date-time
   */
  endTime?: string;
  /** 外部讲师 */
  lecturer?: string;
  /**
   * 讲师类型 1-内部讲师 2-外部讲师
   * @format int32
   */
  memberType?: number;
  /**
   * 是否关联讲师 1-是 0-否
   * @format int32
   */
  relTeacherFlag?: number;
  /**
   * 报名结束时间
   * @format date-time
   */
  signEndTime?: string;
  /**
   * 报名开始时间
   * @format date-time
   */
  signStartTime?: string;
  /**
   * 培训开始时间
   * @format date-time
   */
  startTime?: string;
  /** 讲师编码集合 */
  teacherList?: TeacherBean[];
  /** 标题 */
  title?: string;
}

/** StudyCourseDingNoticeReq */
export interface StudyCourseDingNoticeReq {
  /** 课程编码 */
  courseCode: string;
  /** 学员编码 传则只推送这个人，否则推送所有未完成的人 */
  memberCode?: string;
}

/** StudyCourseDingNoticeResp */
export interface StudyCourseDingNoticeResp {
  /** 课程编码 */
  courseCode?: string;
}

/** StudyCourseMemberNumBean */
export interface StudyCourseMemberNumBean {
  /**
   * 参加人数
   * @format int64
   */
  joinNum?: number;
  /**
   * 签到人数
   * @format int64
   */
  signInNum?: number;
}

/** StudyCourseMembersOperateReq */
export interface StudyCourseMembersOperateReq {
  /** 课程编码 */
  courseCode?: string;
  /** 员工编码 */
  memberCode?: string;
  /**
   * 操作类型 1-取消 2-重新指派
   * @format int32
   */
  operateType?: number;
  /**
   * 学习类型 1-必修 2-选修
   * @format int32
   */
  type: number;
}

/** StudyCourseMembersOperateResp */
export interface StudyCourseMembersOperateResp {
  /** 课程编码 */
  courseCode?: string;
  /** 员工编码 */
  memberCode?: string;
}

/** StudyCourseMembersQueryBean */
export interface StudyCourseMembersQueryBean {
  /**
   * 部门id
   * @format int64
   */
  deptId?: number;
  /** 部门名称 */
  deptName?: string;
  /** 学员编码 */
  memberCode?: string;
  /** 学员名称 */
  memberName?: string;
  /** 操作人名称 */
  operatorName?: string;
  /**
   * 状态
   * @format int32
   */
  status?: number;
  /** 状态 1-指派成功 0-已取消 */
  statusDesc?: string;
  /**
   * 操作时间
   * @format date-time
   */
  updateTime?: string;
}

/** StudyCourseMembersQueryResp */
export interface StudyCourseMembersQueryResp {
  code?: string;
  /** 课程员工信息 */
  courseMembersList?: StudyCourseMembersQueryBean[];
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

/** StudyCourseMembersSaveReq */
export interface StudyCourseMembersSaveReq {
  /** 课程编码 */
  courseCode: string;
  /** 部门id集合 */
  deptIdList?: number[];
  /** 员工编码 */
  memberCodeList?: string[];
  /**
   * 学习类型 1-必修 2-选修
   * @format int32
   */
  type: number;
}

/** StudyCourseMembersSaveResp */
export interface StudyCourseMembersSaveResp {
  /** 课程编码 */
  courseCode?: string;
}

/** StudyCourseOffCalculateBean */
export interface StudyCourseOffCalculateBean {
  /**
   * 部门id
   * @format int64
   */
  deptId?: number;
  /** 部门名称 */
  deptName?: string;
  /**
   * 指派/报名时间
   * @format date-time
   */
  joinTime?: string;
  /** 员工编码 */
  memberCode?: string;
  /** 员工名称 */
  memberName?: string;
  /**
   * 签到时间
   * @format date-time
   */
  signInTime?: string;
  /** 状态 */
  statusDesc?: string;
  /** 获取学时 */
  studyTimeStr?: string;
  /** 加入方式 */
  typeDesc?: string;
}

/** StudyCourseOffLineCalculateQueryReq */
export interface StudyCourseOffLineCalculateQueryReq {
  /** 课程编码 */
  courseCode: string;
  /** 关键词 */
  keyword?: string;
  /** 用户编码 */
  memberCode?: string;
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
  /**
   * 状态  1-已指派未签到 2-已指派已签到 3-已报名未签到 4-已报名已签到
   * @format int32
   */
  status?: number;
  /**
   * 类型 1-必修 3-公开报名
   * @format int32
   */
  type?: number;
}

/** StudyCourseOffLineCalculateQueryResp */
export interface StudyCourseOffLineCalculateQueryResp {
  code?: string;
  /** 课程学员信息 */
  infoList?: StudyCourseOffCalculateBean[];
  /** 学员数量 */
  memberNum?: StudyCourseMemberNumBean;
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

/** StudyCourseOperateReq */
export interface StudyCourseOperateReq {
  /** 课程编码 */
  courseCode: string;
  /**
   * 操作类型 1-发布 2-关闭 3-删除 4-复制 5-置顶 6-取消置顶
   * @format int32
   */
  operateType?: number;
  /** 场景 线上-online 线下-offline */
  scene?: string;
}

/** StudyCourseOperateResp */
export interface StudyCourseOperateResp {
  /** 课程编码 */
  courseCode?: string;
}

/** StudyCourseQueryBean */
export interface StudyCourseQueryBean {
  /** 培训地址 */
  address?: string;
  /** 分类编码 */
  categoryCode?: string;
  /** 分类名称 */
  categoryName?: string;
  /**
   * 关闭时间
   * @format date-time
   */
  closeTime?: string;
  /** 课程编码 */
  courseCode?: string;
  /**
   * 课件数量
   * @format int64
   */
  courseNum?: number;
  /** 封面图片url */
  coverUrl?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /** 创建人名称 */
  creatorName?: string;
  /** 简介 */
  description?: string;
  /**
   * 授课截止时间/截止时间
   * @format date-time
   */
  endTime?: string;
  /**
   * 发布时间
   * @format date-time
   */
  publishTime?: string;
  /**
   * 是否排序 1-排序 0-不排序
   * @format int32
   */
  sortFlag?: number;
  /**
   * 授课开始时间
   * @format date-time
   */
  startTime?: string;
  /**
   * 状态
   * @format int32
   */
  status?: number;
  /** 状态 */
  statusDesc?: string;
  /**
   * 学习人数
   * @format int64
   */
  studyNum?: number;
  /** 标题 */
  title?: string;
}

/** StudyCourseQueryResp */
export interface StudyCourseQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 课程信息集合 */
  studyCourseList?: StudyCourseQueryBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** StudyCourseSaveReq */
export interface StudyCourseSaveReq {
  /** 培训地址 */
  address?: string;
  /** 分类编码 */
  categoryCode?: string;
  /** 课程编码 */
  courseCode?: string;
  /** 封面图片url */
  coverUrl?: string;
  /** 简介 */
  description?: string;
  /**
   * 结束时间
   * @format date-time
   */
  endTime?: string;
  /** 外部讲师 */
  lecturer?: string;
  /** 讲师编码集合 */
  memberCodeList?: string[];
  /**
   * 讲师类型 1-内部讲师 2-外部讲师
   * @format int32
   */
  memberType?: number;
  /**
   * 是否关联讲师 1-是 0-否
   * @format int32
   */
  relTeacherFlag?: number;
  /** 场景 线上-online 线下-offline */
  scene: string;
  /**
   * 允许学员报名
   * @format int32
   */
  sign?: number;
  /**
   * 报名结束时间
   * @format date-time
   */
  signEndTime?: string;
  /**
   * 报名人数限制
   * @format int32
   */
  signLimit?: number;
  /**
   * 报名开始时间
   * @format date-time
   */
  signStartTime?: string;
  /**
   * 开始时间
   * @format date-time
   */
  startTime?: string;
  /** 标题 */
  title: string;
}

/** StudyCourseSaveResp */
export interface StudyCourseSaveResp {
  /** 课程编码 */
  courseCode?: string;
}

/** StudyCourseSignInReq */
export interface StudyCourseSignInReq {
  /** 课程编码 */
  courseCode: string;
}

/** StudyCourseSignInResp */
export interface StudyCourseSignInResp {
  /** 课程编码 */
  courseCode?: string;
}

/** StudyCourseSignInStatusResp */
export interface StudyCourseSignInStatusResp {
  /** 培训地址 */
  address?: string;
  /** 分类编码 */
  categoryCode?: string;
  /** 分类 */
  categoryName?: string;
  /** 课程编码 */
  courseCode?: string;
  /** 封面图片url */
  coverUrl?: string;
  /** 简介 */
  description?: string;
  /**
   * 培训结束时间
   * @format date-time
   */
  endTime?: string;
  /** 外部讲师 */
  lecturer?: string;
  /**
   * 讲师类型 1-内部讲师 2-外部讲师
   * @format int32
   */
  memberType?: number;
  /**
   * 操作按钮 -1-未到签到时间 0-签到按钮 1-已签到 2-已结束
   * @format int32
   */
  operateType?: number;
  /**
   * 是否关联讲师 1-是 0-否
   * @format int32
   */
  relTeacherFlag?: number;
  /**
   * 报名结束时间
   * @format date-time
   */
  signEndTime?: string;
  /**
   * 报名开始时间
   * @format date-time
   */
  signStartTime?: string;
  /**
   * 培训开始时间
   * @format date-time
   */
  startTime?: string;
  /** 讲师编码集合 */
  teacherList?: TeacherBean[];
  /** 标题 */
  title?: string;
}

/** StudyCourseSignUpReq */
export interface StudyCourseSignUpReq {
  /** 课程编码 */
  courseCode: string;
}

/** StudyCourseSignUpResp */
export interface StudyCourseSignUpResp {
  /** 课程编码 */
  courseCode?: string;
}

/** StudyCourseSignUpStatusResp */
export interface StudyCourseSignUpStatusResp {
  /** 培训地址 */
  address?: string;
  /** 分类编码 */
  categoryCode?: string;
  /** 分类 */
  categoryName?: string;
  /** 课程编码 */
  courseCode?: string;
  /** 封面图片url */
  coverUrl?: string;
  /** 简介 */
  description?: string;
  /**
   * 培训结束时间
   * @format date-time
   */
  endTime?: string;
  /** 外部讲师 */
  lecturer?: string;
  /**
   * 讲师类型 1-内部讲师 2-外部讲师
   * @format int32
   */
  memberType?: number;
  /**
   * 操作按钮 -1-未报名 0-立即报名 1-取消报名 2-已报名 3-报名已截止
   * @format int32
   */
  operateType?: number;
  /**
   * 是否关联讲师 1-是 0-否
   * @format int32
   */
  relTeacherFlag?: number;
  /**
   * 报名结束时间
   * @format date-time
   */
  signEndTime?: string;
  /**
   * 报名开始时间
   * @format date-time
   */
  signStartTime?: string;
  /**
   * 培训开始时间
   * @format date-time
   */
  startTime?: string;
  /**
   * 报名状态 0-未报名 1-已报名
   * @format int32
   */
  status?: number;
  /** 讲师编码集合 */
  teacherList?: TeacherBean[];
  /** 标题 */
  title?: string;
}

/** TeacherBean */
export interface TeacherBean {
  /** 头像 */
  avatar?: string;
  /** 职位 */
  job?: string;
  /** 讲师编码 */
  memberCode?: string;
  /** 讲师名称 */
  memberName?: string;
}

/** catalogBean */
export interface CatalogBean {
  /** 唯一编码 */
  catalogCode?: string;
  /** 文件格式 */
  extType?: string;
  /** 文件编码 */
  fileCode?: string;
  /** 文件名称 */
  fileName?: string;
  /** 文件url */
  fileUrl?: string;
  /**
   * 最短学习时长 秒
   * @format int64
   */
  minLearningTime?: number;
}
