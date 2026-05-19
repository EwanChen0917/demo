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

/** CommonExportResp */
export interface CommonExportResp {
  /** app标识 */
  appCode?: string;
  /** 下载链接 */
  downloadUrl?: string;
  /** 模块标识 */
  moduleCode?: string;
}

/** CommonResp */
export interface CommonResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: object;
  traceId?: string;
}

/** EvaluateDetailQueryResp */
export interface EvaluateDetailQueryResp {
  /** 日程id */
  calendarId?: string;
  /** 参会人姓名 */
  calendarList?: string;
  code?: string;
  /** 预订人部门 */
  deptName?: string;
  /**
   * 会议开始时间
   * @format date-time
   */
  endDatetime?: string;
  /** 日程地点 */
  locationMeetingRooms?: string;
  /**
   * 会议时长
   * @format int64
   */
  meetingDuration?: number;
  /** memberCode */
  memberCode?: string;
  message?: string;
  /** 组织者显示名称 */
  organizerDisplayName?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 会议日期 */
  startDate?: string;
  /**
   * 会议开始时间
   * @format date-time
   */
  startDatetime?: string;
  /** 会议主题 */
  summary?: string;
  /**
   * 总数
   * @format int64
   */
  total?: number;
  /** 会议评价 */
  userEvaluateBeanList?: UserEvaluateBean[];
}

/** EvaluateListExportReq */
export interface EvaluateListExportReq {
  /** 预订人memberCode */
  bookerList?: string[];
  /** 预订人部门deptId */
  departIdList?: number[];
  /**
   * 会议结束时间
   * @format date-time
   */
  endTime?: string;
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
  /** 参会人memberCode */
  participantList?: string[];
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /**
   * 会议开始时间
   * @format date-time
   */
  startTime?: string;
  /** 会议主题 */
  summary?: string;
}

/** EvaluateListQueryResp */
export interface EvaluateListQueryResp {
  code?: string;
  /** 会议评价列表 */
  fileCenterBeanList?: MeetingEvaluateBean[];
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

/** EvaluateSubmitReq */
export interface EvaluateSubmitReq {
  /** 日程ID */
  calendarId: string;
  /** 列表 */
  itemList: SubmitItem[];
}

/** MeetingEvaluateBean */
export interface MeetingEvaluateBean {
  /** 日程id */
  calendarId?: string;
  /** 参会人姓名 */
  calendarList?: string;
  /** 预订人部门 */
  deptName?: string;
  /**
   * 会议开始时间
   * @format date-time
   */
  endDatetime?: string;
  /** 日程地点 */
  locationMeetingRooms?: string;
  /**
   * 会议时长
   * @format int64
   */
  meetingDuration?: number;
  /** 预订人memberCode */
  memberCode?: string;
  /** 预订人 */
  organizerDisplayName?: string;
  /** 会议日期 */
  startDate?: string;
  /**
   * 会议开始时间
   * @format date-time
   */
  startDatetime?: string;
  /** 会议主题 */
  summary?: string;
}

/** SubmitItem */
export interface SubmitItem {
  /** 问卷编码 */
  code: string;
  /** 答案 */
  evaluate: string;
  /**
   * 问卷类型
   * @format int32
   */
  type: number;
}

/** UserEvaluateBean */
export interface UserEvaluateBean {
  /**
   * 提交时间
   * @format date-time
   */
  createTime?: string;
  /** 问卷结果 */
  evaluateResult?: Record<string, string>;
  /** 提交人 */
  memberCode?: string;
  /** 提交人姓名 */
  memberName?: string;
}
