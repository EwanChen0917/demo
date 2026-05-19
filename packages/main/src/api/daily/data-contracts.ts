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

/** DailyAttachmentBean */
export interface DailyAttachmentBean {
  /** 附件名字 */
  attachmentName?: string;
  /** 附件url */
  attachmentUrl?: string;
}

/** DailyBean */
export interface DailyBean {
  /** 编码 */
  code?: string;
  /** 附件 */
  dailyAttachmentBeanList?: DailyAttachmentBean[];
  /** 指标-快照 */
  dailyInicatorBeanList?: DailyInicatorBean[];
  /**
   * 状态 0-草稿 1-提交
   * @format int32
   */
  status?: number;
  /** 状态 0-草稿 1-提交 */
  statusDesc?: string;
  /**
   * 提交时间
   * @format date-time
   */
  submitTime?: string;
  /** 今日工作内容 */
  todayWorkContext?: string;
  /** 明日工作内容 */
  tomorrowWorkContext?: string;
}

/** DailyInicatorBean */
export interface DailyInicatorBean {
  /** 指标描述 */
  desc?: string;
  /** 指标名称 */
  indicator?: string;
  /**
   * 排序
   * @format int32
   */
  sort?: number;
  /**
   * 类型 0-部门 1-个人
   * @format int32
   */
  type?: number;
  /** 类型值 */
  typeValue?: string;
}

/** DailyQueryReq */
export interface DailyQueryReq {
  /**
   * 时间
   * @format date-time
   */
  time?: string;
}

/** DailySaveReq */
export interface DailySaveReq {
  /** 编码 */
  code?: string;
  /** 附件 */
  dailyAttachmentBeanList?: DailyAttachmentBean[];
  /**
   * 状态 0-草稿 1-提交
   * @format int32
   */
  status?: number;
  /** 今日工作内容 */
  todayWorkContext?: string;
  /** 明日工作内容 */
  tomorrowWorkContext?: string;
}

/** DailySumQueryReq */
export interface DailySumQueryReq {
  /** 部门id */
  deptId?: string;
  /**
   * 时间-开始
   * @format date-time
   */
  timeBegin?: string;
  /**
   * 时间-结束
   * @format date-time
   */
  timeEnd?: string;
}
