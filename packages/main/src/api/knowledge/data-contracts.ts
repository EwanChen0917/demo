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

/** CommonResp */
export interface CommonResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: object;
  traceId?: string;
}

/** CourseAddUpdateReq */
export interface CourseAddUpdateReq {
  /** 课程内容 */
  contentList?: CourseContentBean[];
  /**
   * 课程获取方式 1-链接 2-上传附件 3-文本输入 4-授客学堂
   * @format int32
   */
  contentType?: number;
  /** 课程编码 */
  courseCode?: string;
  /** 标签列表 code */
  courseLabelCodeList?: string[];
  /** 课程名称 */
  courseName?: string;
  /**
   * 核验方式 1-后台记录 2-考试 3-HR导入
   * @format int32
   */
  courseType?: number;
  /** 学习方式 online-线上课程 offline-线下培训 mentor-导师带教 */
  studyMethod?: string;
  /** 任务类型 common-通用类 manage-管理类 must-上岗必备 */
  taskType?: string;
}

/** CourseBean */
export interface CourseBean {
  /** 课程内容 */
  contentList?: CourseContentBean[];
  /**
   * 课程获取方式 1-链接 2-上传附件 3-文本输入 4-授客学堂
   * @format int32
   */
  contentType?: number;
  /** 课程获取方式 1-链接 2-上传附件 3-文本输入 4-授客学堂 */
  contentTypeDesc?: string;
  /** 课程编码 */
  courseCode?: string;
  /** 课程名称 */
  courseName?: string;
  /**
   * 核验方式 1-后台记录 2-考试 3-HR导入
   * @format int32
   */
  courseType?: number;
  /** 核验方式 1-后台记录 2-考试 3-HR导入  */
  courseTypeDesc?: string;
  /**
   * 部门ID
   * @format int64
   */
  deptId?: number;
  /** 部门名称 */
  deptName?: string;
  /** 标签列表 */
  labelBeanList?: CourseLabelBean[];
  /**
   * 标签类型 1-岗位职责 2-国家区域 3-产品线
   * @format int32
   */
  labelType?: number;
  /** 标签类型描述 */
  labelTypeDesc?: string;
  /** 学习方式 online-线上课程 offline-线下培训 mentor-导师带教 */
  studyMethod?: string;
  /** 学习方式 online-线上课程 offline-线下培训 mentor-导师带教 */
  studyMethodDesc?: string;
  /** 任务类型 common-通用类 manage-管理类 must-上岗必备 */
  taskType?: string;
  /** 任务类型 common-通用类 manage-管理类 must-上岗必备 */
  taskTypeDesc?: string;
  /** @format date */
  updateTime?: string;
}

/** CourseContentBean */
export interface CourseContentBean {
  /** 课程内容 */
  content?: string;
  /** 课程内容oss链接 */
  fileKey?: string;
  /** 上传附件名称 */
  fileName?: string;
  /** 课程内容 */
  url?: string;
}

/** CourseCredentialsDownLoadResp */
export interface CourseCredentialsDownLoadResp {
  /** 下载链接 */
  url?: string;
}

/** CourseCredentialsQueryResp */
export interface CourseCredentialsQueryResp {
  /**
   * 结业时间
   * @format date
   */
  endTime?: string;
  /** 学员信息 */
  name?: string;
}

/** CourseDeleteDetailReq */
export interface CourseDeleteDetailReq {
  /** 课程编码 */
  courseCode?: string;
}

/** CourseLabelBean */
export interface CourseLabelBean {
  /** 标签行code */
  code?: string;
  /**
   * 创建时间
   * @format date
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /** 创建人名称 */
  creatorName?: string;
  /**
   * 部门ID
   * @format int64
   */
  deptId?: number;
  /** 部门名称 */
  deptName?: string;
  /**
   * 标签ID
   * @format int64
   */
  id?: number;
  /** 标签编码 */
  labelCode?: string;
  /** 标签名称 */
  labelName?: string;
  /** 标签类型描述 */
  labelTpeDesc?: string;
  /**
   * 标签类型
   * @format int32
   */
  labelType?: number;
}

/** CourseLabelDeleteReq */
export interface CourseLabelDeleteReq {
  /** 删除标签 */
  code?: string;
}

/** CourseLabelLogBean */
export interface CourseLabelLogBean {
  /** 内容 */
  content?: string;
  /** 日志ID */
  creator?: string;
  /** 姓名 */
  creatorName?: string;
  /** 操作类型 */
  operationType?: string;
  /** 操作类型描述 */
  operationTypeDesc?: string;
  /**
   * 创建时间
   * @format date-time
   */
  updateTime?: string;
}

/** CourseLabelLogQueryResp */
export interface CourseLabelLogQueryResp {
  /** 日志列表 */
  logList?: CourseLabelLogBean[];
}

/** CourseLabelQueryPageReq */
export interface CourseLabelQueryPageReq {
  /**
   * 部门ID
   * @format int64
   */
  deptId?: number;
  /** 标签编码 */
  labelCodeList?: string[];
  /** 标签类型 1-岗位职责 2-国家区域 3-产品线 */
  labelTypeList?: number[];
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
}

/** CourseLabelQueryPageResp */
export interface CourseLabelQueryPageResp {
  code?: string;
  /** 标签列表 */
  courseLabelList?: CourseLabelBean[];
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

/** CourseLabelSelectQueryResp */
export interface CourseLabelSelectQueryResp {
  /** 标签列表 */
  courseLabelList?: SelectLabelBean[];
}

/** CourseLabelUpdateReq */
export interface CourseLabelUpdateReq {
  /** 唯一编码 */
  code?: string;
  /**
   * 一级部门ID
   * @format int64
   */
  deptId?: number;
  /**
   * 标签名称
   * @minLength 0
   * @maxLength 64
   */
  labelName?: string;
  /**
   * 标签类型 1-岗位职责 2-国家区域 3-产品线
   * @format int32
   */
  labelType?: number;
}

/** CourseQueryDetailResp */
export interface CourseQueryDetailResp {
  /** 课程内容 */
  contentList?: CourseContentBean[];
  /**
   * 课程获取方式 1-链接 2-上传附件 3-文本输入 4-授客学堂
   * @format int32
   */
  contentType?: number;
  /** 课程获取方式 1-链接 2-上传附件 3-文本输入 4-授客学堂 */
  contentTypeDesc?: string;
  /** 课程编码 */
  courseCode?: string;
  /** 课程名称 */
  courseName?: string;
  /**
   * 核验方式 1-后台记录 2-考试 3-HR导入
   * @format int32
   */
  courseType?: number;
  /** 核验方式 1-后台记录 2-考试 3-HR导入  */
  courseTypeDesc?: string;
  /**
   * 部门ID
   * @format int64
   */
  deptId?: number;
  /** 部门名称 */
  deptName?: string;
  /** 标签列表 */
  labelBeanList?: CourseLabelBean[];
  /**
   * 标签类型 1-岗位职责 2-国家区域 3-产品线
   * @format int32
   */
  labelType?: number;
  /** 标签类型描述 */
  labelTypeDesc?: string;
  /** 学习方式 online-线上课程 offline-线下培训 mentor-导师带教 */
  studyMethod?: string;
  /** 学习方式 online-线上课程 offline-线下培训 mentor-导师带教 */
  studyMethodDesc?: string;
  /** 任务类型 common-通用类 manage-管理类 must-上岗必备 */
  taskType?: string;
  /** 任务类型 common-通用类 manage-管理类 must-上岗必备 */
  taskTypeDesc?: string;
}

/** CourseQueryPageResp */
export interface CourseQueryPageResp {
  code?: string;
  /** 课程列表 */
  courseBeanList?: CourseBean[];
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

/** CourseTaskApplyFinishReq */
export interface CourseTaskApplyFinishReq {
  /** 任务编码 */
  taskCode?: string;
}

/** CourseTaskApprovalListReq */
export interface CourseTaskApprovalListReq {
  /** 任务编码 */
  taskCode?: string;
}

/** CourseTaskConfirmReq */
export interface CourseTaskConfirmReq {
  /** 任务编码 */
  taskCode?: string;
}

/** CourseTaskCredentialsReq */
export interface CourseTaskCredentialsReq {
  /** 课程编码 */
  courseCode?: string;
  /** 任务编码 */
  taskCode?: string;
  /** 学员编码 */
  traineeCode?: string;
  /** 上传附件列表 */
  uploadFileList?: UploadFileBean[];
}

/** CourseTaskDetailAddReq */
export interface CourseTaskDetailAddReq {
  /** 完成凭证 编辑时候，当类型是hr导入时候由hr填写 */
  completionCertificate?: string;
  /** 课程内容 */
  contentList?: CourseContentBean[];
  /**
   * 课程获取方式 1-链接 2-上传附件 3-文本输入 4-授客学堂
   * @format int32
   */
  contentType?: number;
  /** 课程负责人 */
  courseCharger?: string;
  /** 课程编码 | 编辑时候必填 */
  courseCode?: string;
  /** 课程名称 */
  courseName?: string;
  /**
   * 核验方式 1-后台记录 2-考试 3-HR导入
   * @format int32
   */
  courseType?: number;
  /**
   * 学习截止日期
   * @format date
   */
  lastEndTime?: string;
  /** 学习方式 online-线上课程 offline-线下培训 mentor-导师带教 */
  studyMethod?: string;
  /** 任务编码 */
  taskCode?: string;
  /** 任务类型 common-通用类 manage-管理类 must-上岗必备 */
  taskType?: string;
  /** 学员 */
  traineeCode?: string;
}

/** CourseTaskDetailBean */
export interface CourseTaskDetailBean {
  /** 如果上传凭证的是名称这需要展示名称 */
  certificateName?: string;
  /** 完成凭证 */
  completionCertificate?: string;
  /** 课程内容 */
  contentList?: CourseContentBean[];
  /**
   * 课程获取方式 1-链接 2-上传附件 3-文本输入 4-授客学堂
   * @format int32
   */
  contentType?: number;
  /** 课程获取方式 1-链接 2-上传附件 3-文本输入 4-授客学堂 */
  contentTypeDesc?: string;
  /** 负责人 */
  courseCharger?: string;
  /** 负责人名称 */
  courseChargerName?: string;
  /** 课程编码 */
  courseCode?: string;
  /** 课程名称 */
  courseName?: string;
  /**
   * 核验方式 1-后台记录 2-考试 3-HR导入
   * @format int32
   */
  courseType?: number;
  /** 核验方式 1-后台记录 2-考试 3-HR导入  */
  courseTypeDesc?: string;
  /**
   * id
   * @format int64
   */
  id?: number;
  /** 学习方式 online-线上课程 offline-线下培训 mentor-导师带教 */
  studyMethod?: string;
  /** 学习方式 online-线上课程 offline-线下培训 mentor-导师带教 */
  studyMethodDesc?: string;
  /** 任务编码 */
  taskCode?: string;
  /** 任务类型 common-通用类 manage-管理类 must-上岗必备  */
  taskType?: string;
  /** 任务类型 common-通用类 manage-管理类 must-上岗必备  */
  taskTypeDesc?: string;
}

/** CourseTaskDetailBean0 */
export interface CourseTaskDetailBean0 {
  /** 完成凭证 */
  completionCertificate?: string;
  /** 课程内容 */
  contentList?: CourseContentBean[];
  /**
   * 课程获取方式 1-链接 2-上传附件 3-文本输入
   * @format int32
   */
  contentType?: number;
  /** 课程获取方式 1-链接 2-上传附件 3-文本输入 */
  contentTypeDesc?: string;
  /** 负责人 */
  courseCharger?: string;
  /** 负责人名称 */
  courseChargerName?: string;
  /** 课程编码 */
  courseCode?: string;
  /** 课程名称 */
  courseName?: string;
  /**
   * 核验方式 1-后台记录 2-考试 3-HR导入
   * @format int32
   */
  courseType?: number;
  /** 核验方式 1-后台记录 2-考试 3-HR导入  */
  courseTypeDesc?: string;
  /**
   * id
   * @format int64
   */
  id?: number;
  /**
   * 是否hr 0-否 1-是
   * @format int32
   */
  isHr?: number;
  /** 学习方式 online-线上课程 offline-线下培训 mentor-导师带教 */
  studyMethod?: string;
  /** 学习方式 online-线上课程 offline-线下培训 mentor-导师带教 */
  studyMethodDesc?: string;
  /** 任务编码 */
  taskCode?: string;
  /** 任务类型 common-通用类 manage-管理类 must-上岗必备  */
  taskType?: string;
  /** 任务类型 common-通用类 manage-管理类 must-上岗必备  */
  taskTypeDesc?: string;
  /** 附件列表 */
  uploadFileList?: UploadFileBean[];
}

/** CourseTaskDetailDeleteReq */
export interface CourseTaskDetailDeleteReq {
  /** 课程编码 | 编辑时候必填 */
  courseCode?: string;
  /** 任务编码 */
  taskCode?: string;
}

/** CourseTaskEvalutionReq */
export interface CourseTaskEvalutionReq {
  /** 评价 */
  remark?: string;
  /** 任务编码 */
  taskCode?: string;
}

/** CourseTaskHandleAuthBean */
export interface CourseTaskHandleAuthBean {
  /** 按钮key */
  key?: string;
  /** 按钮描述 */
  value?: string;
}

/** CourseTaskMasterApproveReq */
export interface CourseTaskMasterApproveReq {
  /**
   * 员工类型 1-校招生  2-普通员工   3-基层管理者（小组Team Leader） 4-中层管理者（二级部门负责人） 5-高层管理者（一级部门负责人）
   * @format int32
   */
  employeeType?: number;
  /**
   * 试用期结束时间
   * @format date
   */
  endTime?: string;
  /** 标签编码 */
  labelCodeList?: string[];
  /** 学员上级编码 */
  leaderCode?: string;
  /** 学员导师 */
  mentorCode?: string;
  /**
   * 试用期开始时间
   * @format date
   */
  startTime?: string;
  /** 课程详情 */
  taskDetailList?: CourseTaskDetailBean[];
  /** 学员 */
  traineeCode?: string;
}

/** CourseTaskMasterBean */
export interface CourseTaskMasterBean {
  /** 管理端按钮权限 */
  btnList?: CourseTaskHandleAuthBean[];
  /**
   * 部门ID
   * @format int64
   */
  deptId?: number;
  /** 部门名称 */
  deptName?: string;
  /**
   * 员工类型 1-校招生  2-普通员工   3-基层管理者（小组Team Leader） 4-中层管理者（二级部门负责人） 5-高层管理者（一级部门负责人）
   * @format int32
   */
  employeeType?: number;
  /** 员工类型描述 */
  employeeTypeDesc?: string;
  /**
   * 试用期结束时间
   * @format date
   */
  endTime?: string;
  /** hr评价 */
  hrEvaluation?: string;
  /** 标签列表 */
  labelBeanList?: CourseLabelBean[];
  /**
   * 标签类型 1-岗位职责 2-国家区域 3-产品线
   * @format int32
   */
  labelType?: number;
  /** 标签类型描述 */
  labelTypeDesc?: string;
  /**
   * 学习截止日期
   * @format date
   */
  lastEndTime?: string;
  /** 学员上级编码 */
  leaderCode?: string;
  /** 学员上级名称 */
  leaderName?: string;
  /**
   * 学习状态 1-未学习 2-学习中 3-已完成
   * @format int32
   */
  learningStatus?: number;
  /** 学习状态 1-未学习 2-学习中 3-已完成 */
  learningStatusDesc?: string;
  /** 学员导师 */
  mentorCode?: string;
  /** 导师评价 */
  mentorEvaluation?: string;
  /** 学员导师名称 */
  mentorName?: string;
  /**
   * 试用期开始时间
   * @format date
   */
  startTime?: string;
  /** 任务编码 */
  taskCode?: string;
  /**
   * 任务清单状态  1-hr发起状态  2-导师确认状态 3，leader确认状态 4-hr确认状态 5-完成状态
   * @format int32
   */
  taskStatus?: number;
  /** 任务清单状态 1-未学习 2-学习中 3-已完成 */
  taskStatusDesc?: string;
  /** 学员 */
  traineeCode?: string;
  /** 学员名称 */
  traineeName?: string;
}

/** CourseTaskMasterInfoBean */
export interface CourseTaskMasterInfoBean {
  /**
   * 部门ID
   * @format int64
   */
  deptId?: number;
  /** 部门名称 */
  deptName?: string;
  /**
   * 员工类型 1-校招生  2-普通员工   3-基层管理者（小组Team Leader） 4-中层管理者（二级部门负责人） 5-高层管理者（一级部门负责人）
   * @format int32
   */
  employeeType?: number;
  /** 员工类型描述 */
  employeeTypeDesc?: string;
  /**
   * 试用期结束时间
   * @format date
   */
  endTime?: string;
  /** hr评价 */
  hrEvaluation?: string;
  /** 标签列表 */
  labelBeanList?: CourseLabelBean[];
  /**
   * 标签类型 1-岗位职责 2-国家区域 3-产品线
   * @format int32
   */
  labelType?: number;
  /** 标签类型描述 */
  labelTypeDesc?: string;
  /**
   * 学习截止日期
   * @format date
   */
  lastEndTime?: string;
  /** 学员上级编码 */
  leaderCode?: string;
  /** 学员上级名称 */
  leaderName?: string;
  /**
   * 学习状态 1-未学习 2-学习中 3-已完成
   * @format int32
   */
  learningStatus?: number;
  /** 学习状态 1-未学习 2-学习中 3-已完成 */
  learningStatusDesc?: string;
  /** 学员导师 */
  mentorCode?: string;
  /** 导师评价 */
  mentorEvaluation?: string;
  /** 学员导师名称 */
  mentorName?: string;
  /**
   * 试用期开始时间
   * @format date
   */
  startTime?: string;
  /** 任务编码 */
  taskCode?: string;
  /**
   * 任务清单状态  1-hr发起状态  2-导师确认状态 3，leader确认状态 4-hr确认状态 5-完成状态
   * @format int32
   */
  taskStatus?: number;
  /** 任务清单状态 1-未学习 2-学习中 3-已完成 */
  taskStatusDesc?: string;
  /** 学员 */
  traineeCode?: string;
  /** 学员名称 */
  traineeName?: string;
}

/** CourseTaskMasterInfoQueryReq */
export interface CourseTaskMasterInfoQueryReq {
  /** 学员任务编码 */
  taskCode?: string;
}

/** CourseTaskMasterInfoQueryResp */
export interface CourseTaskMasterInfoQueryResp {
  /** 详情 */
  detailInfo?: CourseTaskMasterInfoBean;
  /** 任务清单详情 */
  taskDetailList?: CourseTaskDetailBean0[];
}

/** CourseTaskMasterQueryPageResp */
export interface CourseTaskMasterQueryPageResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 管理端列表 */
  resultList?: CourseTaskMasterBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** DownLoadCertificationReq */
export interface DownLoadCertificationReq {
  taskCode?: string;
}

/** SelectCourseListReq */
export interface SelectCourseListReq {
  /** 标签编码 */
  labelCodeList?: string[];
  /** 学员 */
  traineeCode?: string;
}

/** SelectCourseListResp */
export interface SelectCourseListResp {
  /** 详情 */
  taskDetailList?: CourseTaskDetailBean0[];
}

/** SelectLabelBean */
export interface SelectLabelBean {
  /** 标签行code-查询选这个标签 */
  code?: string;
  /**
   * 部门ID
   * @format int64
   */
  deptId?: number;
  /** 部门名称 */
  deptName?: string;
  /**
   * 标签ID
   * @format int64
   */
  id?: number;
  /** 标签编码 */
  labelCode?: string;
  /** 标签名称 */
  labelName?: string;
  /** 标签类型描述 */
  labelTpeDesc?: string;
  /**
   * 标签类型
   * @format int32
   */
  labelType?: number;
}

/** TrainerCourseTaskDetailBean */
export interface TrainerCourseTaskDetailBean {
  /** 1-后台记录  2-考试 时候的完成凭证 */
  completionCertificate?: string;
  /** 课程内容 */
  contentList?: CourseContentBean[];
  /**
   * 课程获取方式 1-链接 2-上传附件 3-文本输入 4-授客学堂
   * @format int32
   */
  contentType?: number;
  /** 课程获取方式 1-链接 2-上传附件 3-文本输入 4-授客学堂 */
  contentTypeDesc?: string;
  /** 负责人 */
  courseCharger?: string;
  /** 负责人名称 */
  courseChargerName?: string;
  /** 课程编码 */
  courseCode?: string;
  /** 课程名称 */
  courseName?: string;
  /**
   * 核验方式 1-后台记录 2-考试 3-HR导入
   * @format int32
   */
  courseType?: number;
  /** 核验方式 1-后台记录 2-考试 3-HR导入  */
  courseTypeDesc?: string;
  /**
   * 学习截止日期
   * @format date
   */
  deadlineTime?: string;
  /**
   * id
   * @format int64
   */
  id?: number;
  /**
   * 学习状态 1-未学习 2-学习中 3-已完成
   * @format int32
   */
  learningStatus?: number;
  /** 学习状态 1-未学习 2-学习中 3-已完成 */
  learningStatusDesc?: string;
  /** 学习方式 online-线上课程 offline-线下培训 mentor-导师带教 */
  studyMethod?: string;
  /** 学习方式 online-线上课程 offline-线下培训 mentor-导师带教 */
  studyMethodDesc?: string;
  /** 任务编码 */
  taskCode?: string;
  /** 任务类型 common-通用类 manage-管理类 must-上岗必备  */
  taskType?: string;
  /** 任务类型 common-通用类 manage-管理类 must-上岗必备  */
  taskTypeDesc?: string;
  /** 3-HR导入 时候的完成凭证 */
  uploadFileList?: UploadFileBean[];
}

/** TrainerCourseTaskMasterInfoBean */
export interface TrainerCourseTaskMasterInfoBean {
  /** 岗位 */
  chargeTitle?: string;
  /**
   * 部门ID
   * @format int64
   */
  deptId?: number;
  /** 部门名称 */
  deptName?: string;
  /**
   * 转正日期
   * @format date
   */
  endTime?: string;
  /** 标签列表 */
  labelBeanList?: CourseLabelBean[];
  /** 学员上级编码 */
  leaderCode?: string;
  /** 学员上级名称 */
  leaderName?: string;
  /** 学员导师 */
  mentorCode?: string;
  /** 学员导师名称 */
  mentorName?: string;
  /**
   * 入职日期
   * @format date
   */
  startTime?: string;
  /** 任务编码 */
  taskCode?: string;
  /** 学员 */
  traineeCode?: string;
  /** 学员名称 */
  traineeName?: string;
}

/** TrainerCourseTaskMasterInfoQueryResp */
export interface TrainerCourseTaskMasterInfoQueryResp {
  /** 详情 */
  detailInfo?: TrainerCourseTaskMasterInfoBean;
  /** 任务清单详情 */
  taskDetailList?: TrainerCourseTaskDetailBean[];
}

/** UploadFileBean */
export interface UploadFileBean {
  /** 文件key */
  fileKey?: string;
  /** 文件名称 */
  fileName?: string;
  /** 文件oss地址-展示时候使用 */
  url?: string;
}

/** CommonResp«CourseCredentialsDownLoadResp» */
export interface CommonRespCourseCredentialsDownLoadResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: CourseCredentialsDownLoadResp;
  traceId?: string;
}

/** CommonResp«CourseCredentialsQueryResp» */
export interface CommonRespCourseCredentialsQueryResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: CourseCredentialsQueryResp;
  traceId?: string;
}
