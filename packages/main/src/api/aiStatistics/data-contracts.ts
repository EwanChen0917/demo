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

/** ChartsDataBean */
export interface ChartsDataBean {
  /** 日期区间数据 */
  dates?: string[];
  /** 邮件处理数 */
  processedEmails?: number[];
}

/** LabelSummaryItemBean */
export interface LabelSummaryItemBean {
  /** 标签说明 */
  explain?: string;
  /**
   * 标签id
   * @format int64
   */
  labelId?: number;
  /** 标签名 */
  labelName?: string;
  /**
   * 该标签邮件数
   * @format int32
   */
  labelNum?: number;
  /**
   * 该标签邮件数环比百分比
   * @format double
   */
  labelNumChange?: number;
  /**
   * 父级标签id
   * @format int64
   */
  parentLabelId?: number;
  /**
   * 上个周期该标签邮件数
   * @format int32
   */
  prevLabelNum?: number;
}

/** LabelSummaryReq */
export interface LabelSummaryReq {
  /**
   * 结束日期
   * @format date
   * @example "2025-03-11"
   */
  endDate?: string;
  /** 父级标签ID */
  parentLabelIds?: number[];
  /**
   * 开始日期
   * @format date
   * @example "2025-03-04"
   */
  startDate?: string;
}

/** LabelSummaryResp */
export interface LabelSummaryResp {
  /** 邮件二级分类数据 */
  childLabelStats?: LabelSummaryItemBean[];
}

/** TotalSummaryItemBean */
export interface TotalSummaryItemBean {
  /**
   * 邮件分发数
   * @format int32
   */
  forwardEmails?: number;
  /**
   * 邮件分发数环比百分比
   * @format double
   */
  forwardEmailsChange?: number;
  /**
   * 有标签邮件数
   * @format int32
   */
  labelEmails?: number;
  /**
   * 有标签邮件环比百分比
   * @format double
   */
  labelEmailsChange?: number;
  /**
   * 上个周期邮件分发数
   * @format int32
   */
  prevForwardEmails?: number;
  /**
   * 有标签邮件数
   * @format int32
   */
  prevLabelEmails?: number;
  /**
   * 上个周期回复草稿生成数
   * @format int32
   */
  prevReplyDrafts?: number;
  /**
   * 上个周期成功回复数
   * @format int32
   */
  prevReplySuccessEmails?: number;
  /**
   * 上个周期总邮件数
   * @format int32
   */
  prevTotalEmails?: number;
  /**
   * 回复草稿生成数
   * @format int32
   */
  replyDrafts?: number;
  /**
   * 回复草稿生成数环比百分比
   * @format double
   */
  replyDraftsChange?: number;
  /**
   * 成功回复数
   * @format int32
   */
  replySuccessEmails?: number;
  /**
   * 成功回复数环比百分比
   * @format double
   */
  replySuccessEmailsChange?: number;
  /**
   * 总邮件数
   * @format int32
   */
  totalEmails?: number;
  /**
   * 总邮件数环比百分比
   * @format double
   */
  totalEmailsChange?: number;
}

/** TotalSummaryReq */
export interface TotalSummaryReq {
  /**
   * 结束日期
   * @format date
   * @example "2025-03-11"
   */
  endDate?: string;
  /**
   * 开始日期
   * @format date
   * @example "2025-03-04"
   */
  startDate?: string;
}

/** TotalSummaryResp */
export interface TotalSummaryResp {
  /** 图表数据 */
  charts?: ChartsDataBean;
  /** 统计数据 */
  stats?: TotalSummaryItemBean;
}
