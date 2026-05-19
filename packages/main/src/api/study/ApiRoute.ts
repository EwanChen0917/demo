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
  CommonExportResp,
  RoleAccountResp,
  StudyCourseCalculateQueryReq,
  StudyCourseCalculateQueryResp,
  StudyCourseCatalogQueryResp,
  StudyCourseCatalogSaveReq,
  StudyCourseCatalogSaveResp,
  StudyCourseConfigDetailResp,
  StudyCourseConfigSaveReq,
  StudyCourseConfigSaveResp,
  StudyCourseDetailResp,
  StudyCourseDingNoticeReq,
  StudyCourseDingNoticeResp,
  StudyCourseMembersOperateReq,
  StudyCourseMembersOperateResp,
  StudyCourseMembersQueryResp,
  StudyCourseMembersSaveReq,
  StudyCourseMembersSaveResp,
  StudyCourseOffLineCalculateQueryReq,
  StudyCourseOffLineCalculateQueryResp,
  StudyCourseOperateReq,
  StudyCourseOperateResp,
  StudyCourseQueryResp,
  StudyCourseSaveReq,
  StudyCourseSaveResp,
  StudyCourseSignInReq,
  StudyCourseSignInResp,
  StudyCourseSignInStatusResp,
  StudyCourseSignUpReq,
  StudyCourseSignUpResp,
  StudyCourseSignUpStatusResp,
} from './data-contracts';

export namespace Api {
  /**
   * No description
   * @tags course-controller
   * @name LuteosStudyCancelStudyCourse
   * @summary 取消报名
   * @request POST:/api/luteos/study/cancelStudyCourse
   * @response `200` `StudyCourseSignUpResp` OK
   */
  export namespace LuteosStudyCancelStudyCourse {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = StudyCourseSignUpReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = StudyCourseSignUpResp;
  }

  /**
   * No description
   * @tags course-controller
   * @name LuteosStudyExportCourseCalculateInfo
   * @summary 线上课程-课程学习统计导出
   * @request POST:/api/luteos/study/exportCourseCalculateInfo
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosStudyExportCourseCalculateInfo {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = StudyCourseCalculateQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonExportResp;
  }

  /**
   * No description
   * @tags course-controller
   * @name LuteosStudyExportCourseCalculateOffLine
   * @summary 线下课程-学习统计导出
   * @request POST:/api/luteos/study/exportCourseCalculateOffLine
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosStudyExportCourseCalculateOffLine {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = StudyCourseOffLineCalculateQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonExportResp;
  }

  /**
   * No description
   * @tags course-controller
   * @name LuteosStudyOperateStudyCourse
   * @summary 课程操作
   * @request POST:/api/luteos/study/operateStudyCourse
   * @response `200` `StudyCourseOperateResp` OK
   */
  export namespace LuteosStudyOperateStudyCourse {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = StudyCourseOperateReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = StudyCourseOperateResp;
  }

  /**
   * No description
   * @tags course-controller
   * @name LuteosStudyOperateStudyCourseMembers
   * @summary 课程学员操作
   * @request POST:/api/luteos/study/operateStudyCourseMembers
   * @response `200` `StudyCourseMembersOperateResp` OK
   */
  export namespace LuteosStudyOperateStudyCourseMembers {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = StudyCourseMembersOperateReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = StudyCourseMembersOperateResp;
  }

  /**
   * No description
   * @tags course-controller
   * @name LuteosStudyQueryAllAccount
   * @summary 所有账号查询
   * @request GET:/api/luteos/study/queryAllAccount
   * @response `200` `RoleAccountResp` OK
   */
  export namespace LuteosStudyQueryAllAccount {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 课程编码 */
      courseCode: string;
      /**
       * 类型 1-必修 2-选修 3-公开报名
       * @format int32
       */
      type?: number;
    };
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
   * @tags course-controller
   * @name LuteosStudyQueryCourseCalculateInfo
   * @summary 线上课程-学习统计查询
   * @request GET:/api/luteos/study/queryCourseCalculateInfo
   * @response `200` `StudyCourseCalculateQueryResp` OK
   */
  export namespace LuteosStudyQueryCourseCalculateInfo {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = StudyCourseCalculateQueryResp;
  }

  /**
   * No description
   * @tags course-controller
   * @name LuteosStudyQueryCourseCalculateOffLine
   * @summary 线下课程-学习统计查询
   * @request GET:/api/luteos/study/queryCourseCalculateOffLine
   * @response `200` `StudyCourseOffLineCalculateQueryResp` OK
   */
  export namespace LuteosStudyQueryCourseCalculateOffLine {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = StudyCourseOffLineCalculateQueryResp;
  }

  /**
   * No description
   * @tags course-controller
   * @name LuteosStudyQuerySignInStatus
   * @summary 查询课程签到状态
   * @request GET:/api/luteos/study/querySignInStatus
   * @response `200` `StudyCourseSignInStatusResp` OK
   */
  export namespace LuteosStudyQuerySignInStatus {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 课程编码 */
      courseCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = StudyCourseSignInStatusResp;
  }

  /**
   * No description
   * @tags course-controller
   * @name LuteosStudyQuerySignUpStatus
   * @summary 查询课程报名状态
   * @request GET:/api/luteos/study/querySignUpStatus
   * @response `200` `StudyCourseSignUpStatusResp` OK
   */
  export namespace LuteosStudyQuerySignUpStatus {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 课程编码 */
      courseCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = StudyCourseSignUpStatusResp;
  }

  /**
   * No description
   * @tags course-controller
   * @name LuteosStudyQueryStudyConfig
   * @summary 查询高级设置
   * @request GET:/api/luteos/study/queryStudyConfig
   * @response `200` `StudyCourseConfigDetailResp` OK
   */
  export namespace LuteosStudyQueryStudyConfig {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 课程编码 */
      courseCode: string;
      /**
       * 类型 1-必修 2-选修 3-公开报名
       * @format int32
       */
      type?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = StudyCourseConfigDetailResp;
  }

  /**
   * No description
   * @tags course-controller
   * @name LuteosStudyQueryStudyCourseCatalogs
   * @summary 查询课件信息
   * @request GET:/api/luteos/study/queryStudyCourseCatalogs
   * @response `200` `StudyCourseCatalogQueryResp` OK
   */
  export namespace LuteosStudyQueryStudyCourseCatalogs {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 课程编码 */
      courseCode: string;
      /**
       * 类型 1-必修 2-选修 3-公开报名
       * @format int32
       */
      type?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = StudyCourseCatalogQueryResp;
  }

  /**
   * No description
   * @tags course-controller
   * @name LuteosStudyQueryStudyCourseDetail
   * @summary 查询课程详情
   * @request GET:/api/luteos/study/queryStudyCourseDetail
   * @response `200` `StudyCourseDetailResp` OK
   */
  export namespace LuteosStudyQueryStudyCourseDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 课程编码 */
      courseCode: string;
      /**
       * 类型 1-必修 2-选修 3-公开报名
       * @format int32
       */
      type?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = StudyCourseDetailResp;
  }

  /**
   * No description
   * @tags course-controller
   * @name LuteosStudyQueryStudyCourseList
   * @summary 查询课程列表
   * @request GET:/api/luteos/study/queryStudyCourseList
   * @response `200` `StudyCourseQueryResp` OK
   */
  export namespace LuteosStudyQueryStudyCourseList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 课程分类 */
      categoryCode?: string;
      /** 创建人 */
      creator?: string;
      /** 关键词 课程名称 */
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
      /** 课程类型 线上-online 线下-offline */
      scene?: string;
      /**
       * 状态 0-未发布 1-已发布 2-已关闭
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
    export type ResponseBody = StudyCourseQueryResp;
  }

  /**
   * No description
   * @tags course-controller
   * @name LuteosStudyQueryStudyCourseMembers
   * @summary 查询课程学员列表
   * @request GET:/api/luteos/study/queryStudyCourseMembers
   * @response `200` `StudyCourseMembersQueryResp` OK
   */
  export namespace LuteosStudyQueryStudyCourseMembers {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 课程编码 */
      courseCode: string;
      /** 关键词 学员名称 */
      keyword?: string;
      /** 学员编码 */
      memberCode?: string;
      /** 操作人 */
      operator?: string;
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
      /**
       * 选修/必修类型 1-必修 2-选修 3-公开报名
       * @format int32
       */
      type: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = StudyCourseMembersQueryResp;
  }

  /**
   * No description
   * @tags course-controller
   * @name LuteosStudySaveStudyCourse
   * @summary 保存课程设置
   * @request POST:/api/luteos/study/saveStudyCourse
   * @response `200` `StudyCourseSaveResp` OK
   */
  export namespace LuteosStudySaveStudyCourse {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = StudyCourseSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = StudyCourseSaveResp;
  }

  /**
   * No description
   * @tags course-controller
   * @name LuteosStudySaveStudyCourseCatalog
   * @summary 保存课程目录
   * @request POST:/api/luteos/study/saveStudyCourseCatalog
   * @response `200` `StudyCourseCatalogSaveResp` OK
   */
  export namespace LuteosStudySaveStudyCourseCatalog {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = StudyCourseCatalogSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = StudyCourseCatalogSaveResp;
  }

  /**
   * No description
   * @tags course-controller
   * @name LuteosStudySaveStudyCourseConfig
   * @summary 保存高级设置
   * @request POST:/api/luteos/study/saveStudyCourseConfig
   * @response `200` `StudyCourseConfigSaveResp` OK
   */
  export namespace LuteosStudySaveStudyCourseConfig {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = StudyCourseConfigSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = StudyCourseConfigSaveResp;
  }

  /**
   * No description
   * @tags course-controller
   * @name LuteosStudySaveStudyCourseMembers
   * @summary 保存课程学员
   * @request POST:/api/luteos/study/saveStudyCourseMembers
   * @response `200` `StudyCourseMembersSaveResp` OK
   */
  export namespace LuteosStudySaveStudyCourseMembers {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = StudyCourseMembersSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = StudyCourseMembersSaveResp;
  }

  /**
   * No description
   * @tags course-controller
   * @name LuteosStudySignInStudyCourse
   * @summary 课程签到
   * @request POST:/api/luteos/study/signInStudyCourse
   * @response `200` `StudyCourseSignInResp` OK
   */
  export namespace LuteosStudySignInStudyCourse {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = StudyCourseSignInReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = StudyCourseSignInResp;
  }

  /**
   * No description
   * @tags course-controller
   * @name LuteosStudySignUpStudyCourse
   * @summary 课程报名
   * @request POST:/api/luteos/study/signUpStudyCourse
   * @response `200` `StudyCourseSignUpResp` OK
   */
  export namespace LuteosStudySignUpStudyCourse {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = StudyCourseSignUpReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = StudyCourseSignUpResp;
  }

  /**
   * No description
   * @tags course-controller
   * @name LuteosStudyStudyCourseDingNotice
   * @summary 未完成钉钉通知
   * @request POST:/api/luteos/study/studyCourseDingNotice
   * @response `200` `StudyCourseDingNoticeResp` OK
   */
  export namespace LuteosStudyStudyCourseDingNotice {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = StudyCourseDingNoticeReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = StudyCourseDingNoticeResp;
  }
}
