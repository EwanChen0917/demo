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

/** AreaSummaryPageReq */
export interface AreaSummaryPageReq {
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

/** AreaSummaryPageResp */
export interface AreaSummaryPageResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 摘要列表 */
  summaryList?: AreaSummaryRecordResp[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** AreaSummaryRecordResp */
export interface AreaSummaryRecordResp {
  /**
   * 主键
   * @format int64
   */
  id?: number;
  /** 链接地址 */
  link?: string;
  /** AI总结 */
  summary?: string;
  /** 日期 */
  time?: string;
  /** 标题 */
  title?: string;
}

/** AreaSummarySaveReq */
export interface AreaSummarySaveReq {
  /**
   * 链接地址
   * @example "https://example.com/article/1"
   */
  link?: string;
  /**
   * AI总结
   * @example "ai总结"
   */
  summary: string;
  /**
   * 日期
   * @example "2026-01-01"
   */
  time: string;
  /**
   * 标题
   * @example "表情"
   */
  title: string;
}

/** CurrencyRate */
export interface CurrencyRate {
  /** 货币代码 */
  currencyCode?: string;
  /** 货币名称 */
  currencyName?: string;
  /** 汇率（相对于美元） */
  rate?: number;
  /** 货币符号 */
  symbol?: string;
}

/** ExchangeRateResp */
export interface ExchangeRateResp {
  /**
   * 更新时间
   * @format date-time
   */
  lastUpdate?: string;
  /** 汇率列表 */
  rates?: CurrencyRate[];
}

/** TimeResp */
export interface TimeResp {
  /** 时区时间列表 */
  timeZoneTimes?: TimeZoneTimeResp[];
}

/** TimeZoneTimeResp */
export interface TimeZoneTimeResp {
  /** 当前时间 */
  currentTime?: string;
  /** 日期 */
  date?: string;
  /** 时间 */
  time?: string;
  /** 时区名称 */
  timeZone?: string;
  /** 时区标识 */
  zoneId?: string;
}

/** CommonResp«AreaSummaryPageResp» */
export interface CommonRespAreaSummaryPageResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: AreaSummaryPageResp;
  traceId?: string;
}

/** CommonResp«ExchangeRateResp» */
export interface CommonRespExchangeRateResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: ExchangeRateResp;
  traceId?: string;
}

/** CommonResp«TimeResp» */
export interface CommonRespTimeResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: TimeResp;
  traceId?: string;
}

/** CommonResp«Void» */
export interface CommonRespVoid {
  code?: string;
  enMessage?: string;
  message?: string;
  traceId?: string;
}

/** CommonResp«string» */
export interface CommonRespString {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: string;
  traceId?: string;
}
