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
  CommonResp,
  CommonRespCourseCredentialsDownLoadResp,
  CommonRespCourseCredentialsQueryResp,
  CourseAddUpdateReq,
  CourseDeleteDetailReq,
  CourseLabelDeleteReq,
  CourseLabelLogQueryResp,
  CourseLabelQueryPageReq,
  CourseLabelQueryPageResp,
  CourseLabelSelectQueryResp,
  CourseLabelUpdateReq,
  CourseQueryDetailResp,
  CourseQueryPageResp,
  CourseTaskApplyFinishReq,
  CourseTaskApprovalListReq,
  CourseTaskConfirmReq,
  CourseTaskCredentialsReq,
  CourseTaskDetailAddReq,
  CourseTaskDetailDeleteReq,
  CourseTaskEvalutionReq,
  CourseTaskMasterApproveReq,
  CourseTaskMasterInfoQueryReq,
  CourseTaskMasterInfoQueryResp,
  CourseTaskMasterQueryPageResp,
  DownLoadCertificationReq,
  SelectCourseListReq,
  SelectCourseListResp,
  TrainerCourseTaskMasterInfoQueryResp,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags 应知应会模块
   * @name LuteosKnowledgeAddCourse
   * @summary 课程池-新增课堂
   * @request POST:/api/luteos/knowledge/addCourse
   * @response `200` `CommonResp` OK
   */
  luteosKnowledgeAddCourse = (req: CourseAddUpdateReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/knowledge/addCourse`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 应知应会模块
   * @name LuteosKnowledgeAddCourseTaskDetail
   * @summary 学员学习任务清单-管理端-添加学习任务明细
   * @request POST:/api/luteos/knowledge/addCourseTaskDetail
   * @response `200` `CommonResp` OK
   */
  luteosKnowledgeAddCourseTaskDetail = (req: CourseTaskDetailAddReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/knowledge/addCourseTaskDetail`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 应知应会模块
   * @name LuteosKnowledgeApplyFinish
   * @summary 学员学习任务清单-学员端-结业申请
   * @request POST:/api/luteos/knowledge/applyFinish
   * @response `200` `CommonResp` OK
   */
  luteosKnowledgeApplyFinish = (req: CourseTaskApplyFinishReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/knowledge/applyFinish`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 应知应会模块
   * @name LuteosKnowledgeApprovalCourseTaskDetail
   * @summary 学员学习任务清单-管理端-hr发起学习任务清单
   * @request POST:/api/luteos/knowledge/approvalCourseTaskDetail
   * @response `200` `CommonResp` OK
   */
  luteosKnowledgeApprovalCourseTaskDetail = (
    req: CourseTaskApprovalListReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/knowledge/approvalCourseTaskDetail`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 应知应会模块
   * @name LuteosKnowledgeApproveCourseTask
   * @summary 学员学习任务清单-管理端-任务发起
   * @request POST:/api/luteos/knowledge/approveCourseTask
   * @response `200` `CommonResp` OK
   */
  luteosKnowledgeApproveCourseTask = (
    req: CourseTaskMasterApproveReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/knowledge/approveCourseTask`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 应知应会模块
   * @name LuteosKnowledgeApproveCourseTaskAgain
   * @summary 学员学习任务清单-管理端-再次任务发起
   * @request POST:/api/luteos/knowledge/approveCourseTaskAgain
   * @response `200` `CommonResp` OK
   */
  luteosKnowledgeApproveCourseTaskAgain = (
    req: CourseTaskMasterApproveReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/knowledge/approveCourseTaskAgain`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 应知应会模块
   * @name LuteosKnowledgeConfirmCourseTask
   * @summary 学员学习任务清单-管理端-确认学习任务
   * @request POST:/api/luteos/knowledge/confirmCourseTask
   * @response `200` `CommonResp` OK
   */
  luteosKnowledgeConfirmCourseTask = (req: CourseTaskConfirmReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/knowledge/confirmCourseTask`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 应知应会模块
   * @name LuteosKnowledgeDeleteCourse
   * @summary 课程池-删除课堂
   * @request POST:/api/luteos/knowledge/deleteCourse
   * @response `200` `CommonResp` OK
   */
  luteosKnowledgeDeleteCourse = (req: CourseDeleteDetailReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/knowledge/deleteCourse`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 应知应会模块
   * @name LuteosKnowledgeDeleteCourseTaskDetail
   * @summary 学员学习任务清单-管理端-删除学习任务明细
   * @request POST:/api/luteos/knowledge/deleteCourseTaskDetail
   * @response `200` `CommonResp` OK
   */
  luteosKnowledgeDeleteCourseTaskDetail = (
    req: CourseTaskDetailDeleteReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/knowledge/deleteCourseTaskDetail`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 应知应会模块
   * @name LuteosKnowledgeDeleteLabel
   * @summary 标签管理-删除标签
   * @request POST:/api/luteos/knowledge/deleteLabel
   * @response `200` `CommonResp` OK
   */
  luteosKnowledgeDeleteLabel = (req: CourseLabelDeleteReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/knowledge/deleteLabel`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 应知应会模块
   * @name LuteosKnowledgeDownloadCredentials
   * @summary 学员学习任务清单-学员端-结业凭证下载
   * @request POST:/api/luteos/knowledge/downloadCredentials
   * @deprecated
   * @response `200` `CommonRespCourseCredentialsDownLoadResp` OK
   */
  luteosKnowledgeDownloadCredentials = (
    req: DownLoadCertificationReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespCourseCredentialsDownLoadResp, any>({
      path: `/api/luteos/knowledge/downloadCredentials`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 应知应会模块
   * @name LuteosKnowledgeEditCourseTaskDetail
   * @summary 学员学习任务清单-管理端-编辑学习任务明细
   * @request POST:/api/luteos/knowledge/editCourseTaskDetail
   * @response `200` `CommonResp` OK
   */
  luteosKnowledgeEditCourseTaskDetail = (req: CourseTaskDetailAddReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/knowledge/editCourseTaskDetail`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 应知应会模块
   * @name LuteosKnowledgeEvaluate
   * @summary 学员学习任务清单-管理端-评价
   * @request POST:/api/luteos/knowledge/evaluate
   * @response `200` `CommonResp` OK
   */
  luteosKnowledgeEvaluate = (req: CourseTaskEvalutionReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/knowledge/evaluate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 应知应会模块
   * @name LuteosKnowledgeQueryCopyTaskInfo
   * @summary 学员学习任务清单-管理端-再次发起详情查询
   * @request POST:/api/luteos/knowledge/queryCopyTaskInfo
   * @response `200` `CourseTaskMasterInfoQueryResp` OK
   */
  luteosKnowledgeQueryCopyTaskInfo = (
    req: CourseTaskMasterInfoQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<CourseTaskMasterInfoQueryResp, any>({
      path: `/api/luteos/knowledge/queryCopyTaskInfo`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 应知应会模块
   * @name LuteosKnowledgeQueryCourseDetail
   * @summary 课程池-课程详情
   * @request GET:/api/luteos/knowledge/queryCourseDetail
   * @response `200` `CourseQueryDetailResp` OK
   */
  luteosKnowledgeQueryCourseDetail = (
    query?: {
      /** 课程编码 */
      courseCode?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CourseQueryDetailResp, any>({
      path: `/api/luteos/knowledge/queryCourseDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 应知应会模块
   * @name LuteosKnowledgeQueryCourseLabelList
   * @summary 标签管理-分页查询
   * @request POST:/api/luteos/knowledge/queryCourseLabelList
   * @response `200` `CourseLabelQueryPageResp` OK
   */
  luteosKnowledgeQueryCourseLabelList = (
    req: CourseLabelQueryPageReq,
    params: RequestParams = {},
  ) =>
    this.request<CourseLabelQueryPageResp, any>({
      path: `/api/luteos/knowledge/queryCourseLabelList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 应知应会模块
   * @name LuteosKnowledgeQueryCourseLibraryList
   * @summary 课程池-分页列表
   * @request GET:/api/luteos/knowledge/queryCourseLibraryList
   * @response `200` `CourseQueryPageResp` OK
   */
  luteosKnowledgeQueryCourseLibraryList = (
    query: {
      /**
       * 核验方式 1-后台记录 2-考试 3-HR导入
       * @format int32
       */
      courseType?: number;
      /**
       * 部门ID
       * @format int64
       */
      deptId?: number;
      /**
       * 标签类型 1-岗位职责 2-国家区域 3-产品线
       * @format int32
       */
      labelType?: number;
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
      /** 学习方式 online-线上课程 offline-线下培训 mentor-导师带教 */
      studyMethod?: string;
      /** 学习任务类型 common-通用类 manage-管理类 must-上岗必备 */
      taskType?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CourseQueryPageResp, any>({
      path: `/api/luteos/knowledge/queryCourseLibraryList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 应知应会模块
   * @name LuteosKnowledgeQueryCourseTaskInfo
   * @summary 学员学习任务清单-管理端-详情查询
   * @request POST:/api/luteos/knowledge/queryCourseTaskInfo
   * @response `200` `CourseTaskMasterInfoQueryResp` OK
   */
  luteosKnowledgeQueryCourseTaskInfo = (
    req: CourseTaskMasterInfoQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<CourseTaskMasterInfoQueryResp, any>({
      path: `/api/luteos/knowledge/queryCourseTaskInfo`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 应知应会模块
   * @name LuteosKnowledgeQueryCourseTaskList
   * @summary 学员学习任务清单-管理端-分页列表
   * @request GET:/api/luteos/knowledge/queryCourseTaskList
   * @response `200` `CourseTaskMasterQueryPageResp` OK
   */
  luteosKnowledgeQueryCourseTaskList = (
    query: {
      /**
       * 部门ID
       * @format int64
       */
      deptId?: number;
      /** 部门标签编码 */
      labelCode?: string;
      /**
       * 标签类型 1-岗位职责 2-国家区域 3-产品线
       * @format int32
       */
      labelType?: number;
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
    },
    params: RequestParams = {},
  ) =>
    this.request<CourseTaskMasterQueryPageResp, any>({
      path: `/api/luteos/knowledge/queryCourseTaskList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 应知应会模块
   * @name LuteosKnowledgeQueryCredentials
   * @summary 学员学习任务清单-学员端-结业凭证信息查询
   * @request POST:/api/luteos/knowledge/queryCredentials
   * @response `200` `CommonRespCourseCredentialsQueryResp` OK
   */
  luteosKnowledgeQueryCredentials = (req: DownLoadCertificationReq, params: RequestParams = {}) =>
    this.request<CommonRespCourseCredentialsQueryResp, any>({
      path: `/api/luteos/knowledge/queryCredentials`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 应知应会模块
   * @name LuteosKnowledgeQueryLabelCourseList
   * @summary 学员学习任务清单-管理端-根据标签查询课程列表
   * @request POST:/api/luteos/knowledge/queryLabelCourseList
   * @response `200` `SelectCourseListResp` OK
   */
  luteosKnowledgeQueryLabelCourseList = (req: SelectCourseListReq, params: RequestParams = {}) =>
    this.request<SelectCourseListResp, any>({
      path: `/api/luteos/knowledge/queryLabelCourseList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 应知应会模块
   * @name LuteosKnowledgeQueryLog
   * @summary 标签管理-查询修改日志
   * @request GET:/api/luteos/knowledge/queryLog
   * @response `200` `CourseLabelLogQueryResp` OK
   */
  luteosKnowledgeQueryLog = (
    query?: {
      /** 标签行编码 */
      code?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CourseLabelLogQueryResp, any>({
      path: `/api/luteos/knowledge/queryLog`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 应知应会模块
   * @name LuteosKnowledgeQuerySelectLabelList
   * @summary 职能标签下拉查询-联动查询
   * @request GET:/api/luteos/knowledge/querySelectLabelList
   * @response `200` `CourseLabelSelectQueryResp` OK
   */
  luteosKnowledgeQuerySelectLabelList = (
    query?: {
      /**
       * 部门ID
       * @format int64
       */
      deptId?: number;
      /** 标签类型 1-岗位职责 2-国家区域 3-产品线 */
      labelTypeList?: number[];
      /** 员工编码 */
      traineeCode?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CourseLabelSelectQueryResp, any>({
      path: `/api/luteos/knowledge/querySelectLabelList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 应知应会模块
   * @name LuteosKnowledgeQueryTrainerCourseTaskInfo
   * @summary 学员学习任务清单-学员端-查询
   * @request GET:/api/luteos/knowledge/queryTrainerCourseTaskInfo
   * @response `200` `TrainerCourseTaskMasterInfoQueryResp` OK
   */
  luteosKnowledgeQueryTrainerCourseTaskInfo = (params: RequestParams = {}) =>
    this.request<TrainerCourseTaskMasterInfoQueryResp, any>({
      path: `/api/luteos/knowledge/queryTrainerCourseTaskInfo`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 应知应会模块
   * @name LuteosKnowledgeUpdateCourse
   * @summary 课程池-编辑课堂
   * @request POST:/api/luteos/knowledge/updateCourse
   * @response `200` `CommonResp` OK
   */
  luteosKnowledgeUpdateCourse = (req: CourseAddUpdateReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/knowledge/updateCourse`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 应知应会模块
   * @name LuteosKnowledgeUpdateLabel
   * @summary 标签管理-新增编辑标签
   * @request POST:/api/luteos/knowledge/updateLabel
   * @response `200` `CommonResp` OK
   */
  luteosKnowledgeUpdateLabel = (req: CourseLabelUpdateReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/knowledge/updateLabel`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 应知应会模块
   * @name LuteosKnowledgeUploadCredentials
   * @summary 学员学习任务清单-学员端-上传凭证
   * @request POST:/api/luteos/knowledge/uploadCredentials
   * @response `200` `CommonResp` OK
   */
  luteosKnowledgeUploadCredentials = (req: CourseTaskCredentialsReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/knowledge/uploadCredentials`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
}
