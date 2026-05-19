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

export namespace Api {
  /**
   * No description
   * @tags 应知应会模块
   * @name LuteosKnowledgeAddCourse
   * @summary 课程池-新增课堂
   * @request POST:/api/luteos/knowledge/addCourse
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosKnowledgeAddCourse {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CourseAddUpdateReq;
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
   * @tags 应知应会模块
   * @name LuteosKnowledgeAddCourseTaskDetail
   * @summary 学员学习任务清单-管理端-添加学习任务明细
   * @request POST:/api/luteos/knowledge/addCourseTaskDetail
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosKnowledgeAddCourseTaskDetail {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CourseTaskDetailAddReq;
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
   * @tags 应知应会模块
   * @name LuteosKnowledgeApplyFinish
   * @summary 学员学习任务清单-学员端-结业申请
   * @request POST:/api/luteos/knowledge/applyFinish
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosKnowledgeApplyFinish {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CourseTaskApplyFinishReq;
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
   * @tags 应知应会模块
   * @name LuteosKnowledgeApprovalCourseTaskDetail
   * @summary 学员学习任务清单-管理端-hr发起学习任务清单
   * @request POST:/api/luteos/knowledge/approvalCourseTaskDetail
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosKnowledgeApprovalCourseTaskDetail {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CourseTaskApprovalListReq;
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
   * @tags 应知应会模块
   * @name LuteosKnowledgeApproveCourseTask
   * @summary 学员学习任务清单-管理端-任务发起
   * @request POST:/api/luteos/knowledge/approveCourseTask
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosKnowledgeApproveCourseTask {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CourseTaskMasterApproveReq;
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
   * @tags 应知应会模块
   * @name LuteosKnowledgeApproveCourseTaskAgain
   * @summary 学员学习任务清单-管理端-再次任务发起
   * @request POST:/api/luteos/knowledge/approveCourseTaskAgain
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosKnowledgeApproveCourseTaskAgain {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CourseTaskMasterApproveReq;
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
   * @tags 应知应会模块
   * @name LuteosKnowledgeConfirmCourseTask
   * @summary 学员学习任务清单-管理端-确认学习任务
   * @request POST:/api/luteos/knowledge/confirmCourseTask
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosKnowledgeConfirmCourseTask {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CourseTaskConfirmReq;
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
   * @tags 应知应会模块
   * @name LuteosKnowledgeDeleteCourse
   * @summary 课程池-删除课堂
   * @request POST:/api/luteos/knowledge/deleteCourse
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosKnowledgeDeleteCourse {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CourseDeleteDetailReq;
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
   * @tags 应知应会模块
   * @name LuteosKnowledgeDeleteCourseTaskDetail
   * @summary 学员学习任务清单-管理端-删除学习任务明细
   * @request POST:/api/luteos/knowledge/deleteCourseTaskDetail
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosKnowledgeDeleteCourseTaskDetail {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CourseTaskDetailDeleteReq;
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
   * @tags 应知应会模块
   * @name LuteosKnowledgeDeleteLabel
   * @summary 标签管理-删除标签
   * @request POST:/api/luteos/knowledge/deleteLabel
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosKnowledgeDeleteLabel {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CourseLabelDeleteReq;
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
   * @tags 应知应会模块
   * @name LuteosKnowledgeDownloadCredentials
   * @summary 学员学习任务清单-学员端-结业凭证下载
   * @request POST:/api/luteos/knowledge/downloadCredentials
   * @deprecated
   * @response `200` `CommonRespCourseCredentialsDownLoadResp` OK
   */
  export namespace LuteosKnowledgeDownloadCredentials {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DownLoadCertificationReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespCourseCredentialsDownLoadResp;
  }

  /**
   * No description
   * @tags 应知应会模块
   * @name LuteosKnowledgeEditCourseTaskDetail
   * @summary 学员学习任务清单-管理端-编辑学习任务明细
   * @request POST:/api/luteos/knowledge/editCourseTaskDetail
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosKnowledgeEditCourseTaskDetail {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CourseTaskDetailAddReq;
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
   * @tags 应知应会模块
   * @name LuteosKnowledgeEvaluate
   * @summary 学员学习任务清单-管理端-评价
   * @request POST:/api/luteos/knowledge/evaluate
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosKnowledgeEvaluate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CourseTaskEvalutionReq;
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
   * @tags 应知应会模块
   * @name LuteosKnowledgeQueryCopyTaskInfo
   * @summary 学员学习任务清单-管理端-再次发起详情查询
   * @request POST:/api/luteos/knowledge/queryCopyTaskInfo
   * @response `200` `CourseTaskMasterInfoQueryResp` OK
   */
  export namespace LuteosKnowledgeQueryCopyTaskInfo {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CourseTaskMasterInfoQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CourseTaskMasterInfoQueryResp;
  }

  /**
   * No description
   * @tags 应知应会模块
   * @name LuteosKnowledgeQueryCourseDetail
   * @summary 课程池-课程详情
   * @request GET:/api/luteos/knowledge/queryCourseDetail
   * @response `200` `CourseQueryDetailResp` OK
   */
  export namespace LuteosKnowledgeQueryCourseDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 课程编码 */
      courseCode?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CourseQueryDetailResp;
  }

  /**
   * No description
   * @tags 应知应会模块
   * @name LuteosKnowledgeQueryCourseLabelList
   * @summary 标签管理-分页查询
   * @request POST:/api/luteos/knowledge/queryCourseLabelList
   * @response `200` `CourseLabelQueryPageResp` OK
   */
  export namespace LuteosKnowledgeQueryCourseLabelList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CourseLabelQueryPageReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CourseLabelQueryPageResp;
  }

  /**
   * No description
   * @tags 应知应会模块
   * @name LuteosKnowledgeQueryCourseLibraryList
   * @summary 课程池-分页列表
   * @request GET:/api/luteos/knowledge/queryCourseLibraryList
   * @response `200` `CourseQueryPageResp` OK
   */
  export namespace LuteosKnowledgeQueryCourseLibraryList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CourseQueryPageResp;
  }

  /**
   * No description
   * @tags 应知应会模块
   * @name LuteosKnowledgeQueryCourseTaskInfo
   * @summary 学员学习任务清单-管理端-详情查询
   * @request POST:/api/luteos/knowledge/queryCourseTaskInfo
   * @response `200` `CourseTaskMasterInfoQueryResp` OK
   */
  export namespace LuteosKnowledgeQueryCourseTaskInfo {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CourseTaskMasterInfoQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CourseTaskMasterInfoQueryResp;
  }

  /**
   * No description
   * @tags 应知应会模块
   * @name LuteosKnowledgeQueryCourseTaskList
   * @summary 学员学习任务清单-管理端-分页列表
   * @request GET:/api/luteos/knowledge/queryCourseTaskList
   * @response `200` `CourseTaskMasterQueryPageResp` OK
   */
  export namespace LuteosKnowledgeQueryCourseTaskList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CourseTaskMasterQueryPageResp;
  }

  /**
   * No description
   * @tags 应知应会模块
   * @name LuteosKnowledgeQueryCredentials
   * @summary 学员学习任务清单-学员端-结业凭证信息查询
   * @request POST:/api/luteos/knowledge/queryCredentials
   * @response `200` `CommonRespCourseCredentialsQueryResp` OK
   */
  export namespace LuteosKnowledgeQueryCredentials {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DownLoadCertificationReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespCourseCredentialsQueryResp;
  }

  /**
   * No description
   * @tags 应知应会模块
   * @name LuteosKnowledgeQueryLabelCourseList
   * @summary 学员学习任务清单-管理端-根据标签查询课程列表
   * @request POST:/api/luteos/knowledge/queryLabelCourseList
   * @response `200` `SelectCourseListResp` OK
   */
  export namespace LuteosKnowledgeQueryLabelCourseList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SelectCourseListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SelectCourseListResp;
  }

  /**
   * No description
   * @tags 应知应会模块
   * @name LuteosKnowledgeQueryLog
   * @summary 标签管理-查询修改日志
   * @request GET:/api/luteos/knowledge/queryLog
   * @response `200` `CourseLabelLogQueryResp` OK
   */
  export namespace LuteosKnowledgeQueryLog {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 标签行编码 */
      code?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CourseLabelLogQueryResp;
  }

  /**
   * No description
   * @tags 应知应会模块
   * @name LuteosKnowledgeQuerySelectLabelList
   * @summary 职能标签下拉查询-联动查询
   * @request GET:/api/luteos/knowledge/querySelectLabelList
   * @response `200` `CourseLabelSelectQueryResp` OK
   */
  export namespace LuteosKnowledgeQuerySelectLabelList {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * 部门ID
       * @format int64
       */
      deptId?: number;
      /** 标签类型 1-岗位职责 2-国家区域 3-产品线 */
      labelTypeList?: number[];
      /** 员工编码 */
      traineeCode?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CourseLabelSelectQueryResp;
  }

  /**
   * No description
   * @tags 应知应会模块
   * @name LuteosKnowledgeQueryTrainerCourseTaskInfo
   * @summary 学员学习任务清单-学员端-查询
   * @request GET:/api/luteos/knowledge/queryTrainerCourseTaskInfo
   * @response `200` `TrainerCourseTaskMasterInfoQueryResp` OK
   */
  export namespace LuteosKnowledgeQueryTrainerCourseTaskInfo {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = TrainerCourseTaskMasterInfoQueryResp;
  }

  /**
   * No description
   * @tags 应知应会模块
   * @name LuteosKnowledgeUpdateCourse
   * @summary 课程池-编辑课堂
   * @request POST:/api/luteos/knowledge/updateCourse
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosKnowledgeUpdateCourse {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CourseAddUpdateReq;
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
   * @tags 应知应会模块
   * @name LuteosKnowledgeUpdateLabel
   * @summary 标签管理-新增编辑标签
   * @request POST:/api/luteos/knowledge/updateLabel
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosKnowledgeUpdateLabel {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CourseLabelUpdateReq;
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
   * @tags 应知应会模块
   * @name LuteosKnowledgeUploadCredentials
   * @summary 学员学习任务清单-学员端-上传凭证
   * @request POST:/api/luteos/knowledge/uploadCredentials
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosKnowledgeUploadCredentials {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CourseTaskCredentialsReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonResp;
  }
}
