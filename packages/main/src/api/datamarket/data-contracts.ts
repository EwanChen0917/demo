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

/** DataMakertReportTagPageResp */
export interface DataMakertReportTagPageResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 标签列表 */
  tagList?: ReportTagBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** DataMarketReportAuthReq */
export interface DataMarketReportAuthReq {
  /** 申请人编码 */
  currentMemberCode?: string;
  /** 备注 */
  remark?: string;
  /** 报表编码 */
  reportCode?: string;
}

/** DataMarketReportPageResp */
export interface DataMarketReportPageResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 主题-报表列表 */
  reportList?: MarketReport[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** DataMarketReportRequireReq */
export interface DataMarketReportRequireReq {
  /** 申请人编码 */
  currentMemberCode?: string;
  /** 需求详情 */
  requirementDetails?: string;
  /** 用途 */
  useToDesc?: string;
}

/** DataMarketReportTagAddReq */
export interface DataMarketReportTagAddReq {
  /** 报表列表 */
  reportBeanList?: ReportBean[];
  /**
   * 标签顺序
   * @format int32
   */
  sort?: number;
  /** 标签编码  带标签code为更新，不带为新增 */
  tagCode?: string;
  /** 标签名称 */
  tagName?: string;
}

/** DataMarketReportTagReq */
export interface DataMarketReportTagReq {
  /** 标签编码 */
  tagCode?: string;
}

/** MappingReportBean */
export interface MappingReportBean {
  /** 关联报表编码 */
  mappingReportCode?: string;
  /** 关联报表名称 */
  mappingReportDesc?: string;
}

/** MarketReport */
export interface MarketReport {
  /** 类型编码 */
  modelCode?: string;
  /** 类型描述 */
  modelDesc?: string;
  /** 卡片列表 */
  reportBeanList?: ReportBean[];
}

/** ReportBean */
export interface ReportBean {
  /** 报表编码 */
  reportCode?: string;
  /** 报表名称 */
  reportName?: string;
}

/** ReportTagBean */
export interface ReportTagBean {
  /** 关联报表 */
  mappingReportList?: MappingReportBean[];
  /**
   * 排序
   * @format int32
   */
  sort?: number;
  /** 标签编码 */
  tagCode?: string;
  /** 标签名称 */
  tagDesc?: string;
  /** 关联报表名称-拼接描述 */
  unionMappingReportDesc?: string;
}

/** CommonResp«object» */
export interface CommonRespObject {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: object;
  traceId?: string;
}
