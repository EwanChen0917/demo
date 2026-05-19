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

/** MediaOperateLogResp */
export interface MediaOperateLogResp {
  code?: string;
  /** 媒体资源-操作日志列表 */
  logList?: MediaResourcesLogBean[];
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

/** MediaOperateTypeReq */
export interface MediaOperateTypeReq {
  /** 媒体详情-联系方式  操作2必填 */
  contactList?: MediaRelationContactEditBean[];
  /** 选择内容 操作3-标记 非必填 */
  contentType?: string;
  /** 媒体详情-基础信息  操作1必填 */
  detail?: MediaResourcesEditBean;
  /** 媒体关键词 操作3-标记 非必填 */
  keywords?: string;
  /**
   * 标记类型 1-媒体标记 2-类型标记 4-批量标记必传
   * @format int32
   */
  markType?: number;
  /** 媒体编码 */
  mediaCode?: string;
  /** 媒体编码集合 4-批量标记 */
  mediaCodeList?: string[];
  /** 媒体类型 操作3-标记 非必填 */
  mediaType?: string;
  /**
   * 操作类型 1-编辑详情 2-新增或者编辑联系方式 3-标记 4-批量标记
   * @format int32
   */
  operateType?: number;
}

/** MediaOperateTypeResp */
export interface MediaOperateTypeResp {
  /** 媒体编码 */
  mediaCode?: string;
}

/** MediaRelationContactBean */
export interface MediaRelationContactBean {
  /** 编辑领域 */
  area?: string;
  /** 编辑其他联系方式 */
  contact?: string;
  /** 编辑国家 */
  country?: string;
  /** 跟进人 */
  creator?: string;
  /** 跟进人名称 */
  creatorName?: string;
  /** 编辑邮箱 */
  email?: string;
  /** 编辑职位 */
  job?: string;
  /** 媒体编码 */
  mediaCode?: string;
  /** 媒体联系编码 */
  mediaContactCode?: string;
  /** 编辑合作的媒体 */
  mediaPartners?: string;
  /** 编辑名称 */
  name?: string;
  /** 报价 */
  quotation?: string;
  /**
   * 录入时间
   * @format date
   */
  recordDate?: string;
  remark?: string;
  /** 回复情况 */
  responseSituation?: string;
  /**
   * 状态 1-正常 2-失效
   * @format int32
   */
  status?: number;
  /** 状态描述 */
  statusDesc?: string;
}

/** MediaRelationContactEditBean */
export interface MediaRelationContactEditBean {
  /** 编辑领域 */
  area?: string;
  /** 编辑其他联系方式 */
  contact?: string;
  /** 编辑国家 */
  country?: string;
  /** 跟进人 */
  creator?: string;
  /** 编辑邮箱 */
  email?: string;
  /** 编辑职位 */
  job?: string;
  /** 媒体编码 */
  mediaCode?: string;
  /** 媒体联系编码 */
  mediaContactCode?: string;
  /** 编辑合作的媒体 */
  mediaPartners?: string;
  /** 编辑名称 */
  name?: string;
  /** 报价 */
  quotation?: string;
  /**
   * 录入时间
   * @format date
   */
  recordDate?: string;
  /** 备注 */
  remark?: string;
  /** 回复情况 */
  responseSituation?: string;
  /**
   * 状态 1-正常 2-失效
   * @format int32
   */
  status?: number;
}

/** MediaResourcesBean */
export interface MediaResourcesBean {
  /** 内容类型 */
  contentType?: string;
  /** 内容类型描述 */
  contentTypeDesc?: string;
  /**
   * 录入时间
   * @format date-time
   */
  createTime?: string;
  /** 录入人员 */
  creator?: string;
  /** 录入人员名称 */
  creatorDesc?: string;
  /**
   * 是否有联系方式 1-有 0-没有
   * @format int32
   */
  hasContact?: number;
  /** 媒体关键词 */
  keywords?: string;
  /** 主要流量国家 */
  mainCountry?: string;
  /** 媒体编码 */
  mediaCode?: string;
  /** 媒体量级 */
  mediaLevel?: string;
  /** 媒体量级描述 */
  mediaLevelDesc?: string;
  /** 媒体名称 */
  mediaName?: string;
  /** 媒体类型 */
  mediaType?: string;
  /** 媒体类型描述 */
  mediaTypeDesc?: string;
  /**
   * 月流量
   * @format int32
   */
  monthTraffic?: number;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /** 媒体链接 */
  url?: string;
}

/** MediaResourcesContactListResp */
export interface MediaResourcesContactListResp {
  code?: string;
  /** 媒体编辑联系集合 */
  mediaContactList?: MediaRelationContactBean[];
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

/** MediaResourcesDetailResp */
export interface MediaResourcesDetailResp {
  /**
   * 媒体类目排名
   * @format int32
   */
  categoryRank?: number;
  /**
   * 媒体类目排名更新时间
   * @format date-time
   */
  categoryRankTime?: string;
  /** 内容类型 */
  contentType?: string;
  /** 内容类型描述 */
  contentTypeDesc?: string;
  /**
   * 媒体国家排名
   * @format int32
   */
  countryRank?: number;
  /**
   * 媒体国家排名更新时间
   * @format date-time
   */
  countryRankTime?: string;
  /** 录入 */
  creator?: string;
  /** 录入名称 */
  creatorName?: string;
  /**
   * 媒体全球排名
   * @format int32
   */
  globalRank?: number;
  /**
   * 媒体全球排名更新时间
   * @format date-time
   */
  globalRankTime?: string;
  /** 媒体关键词 */
  keywords?: string;
  /** 媒体量级 */
  level?: string;
  /** 媒体量级描述 */
  levelDesc?: string;
  /** 主要流量国家 */
  mainCountry?: string;
  /** 媒体编码 */
  mediaCode?: string;
  /**
   * 媒体DR
   * @format int32
   */
  mediaDr?: number;
  /** 媒体名称 */
  mediaName?: string;
  /** 媒体类型 */
  mediaType?: string;
  /** 媒体类型描述 */
  mediaTypeDesc?: string;
  /**
   * 月度流量
   * @format int32
   */
  monthFlow?: number;
  /**
   * 月度流量更新时间
   * @format date-time
   */
  monthFlowTime?: string;
  /** 月独立访客量 */
  monthlyVisitorCount?: string;
  /**
   * 月独立访客量更新时间
   * @format date-time
   */
  monthlyVisitorCountTime?: string;
  /** 备注 */
  remark?: string;
  /** 媒体链接 */
  url?: string;
}

/** MediaResourcesEditBean */
export interface MediaResourcesEditBean {
  /**
   * 媒体类目排名
   * @format int32
   */
  categoryRank?: number;
  /** 选择内容 */
  contentType?: string;
  /**
   * 媒体国家排名
   * @format int32
   */
  countryRank?: number;
  /**
   * 媒体全球排名
   * @format int32
   */
  globalRank?: number;
  /** 媒体关键词 */
  keywords?: string;
  /** 主要流量国家 */
  mainCountry?: string;
  /**
   * 媒体DR
   * @format int32
   */
  mediaDr?: number;
  /** 媒体类型 */
  mediaType?: string;
  /**
   * 月度流量
   * @format int32
   */
  monthFlow?: number;
  /**
   * 月独立访客量
   * @format int32
   */
  monthlyVisitorCount?: number;
  /** 备注 */
  remark?: string;
}

/** MediaResourcesLogBean */
export interface MediaResourcesLogBean {
  /** 更新内容(操作内容) */
  operationContent?: string;
  /**
   * 更新时间(操作时间)
   * @format date-time
   */
  operationTime?: string;
  /** 更新人(操作人) */
  operatorName?: string;
}

/** MediaResourcesReq */
export interface MediaResourcesReq {
  /** 选择内容类型 */
  contentTypeList?: string[];
  /** 录入人列表 */
  creatorList?: string[];
  /**
   * 录入结束时间
   * @format date-time
   */
  endTime?: string;
  /**
   * 是否有联系方式 1:有 0:无
   * @format int32
   */
  hasContact?: number;
  /** 媒体名称/媒体关键词/rpa关键词 */
  keyword?: string;
  /** 媒体量级列表 */
  levelList?: string[];
  /** 主要流量国家列表 */
  mainCountryList?: string[];
  /** 媒体编码集合 导出勾选时使用 */
  mediaCodeList?: string[];
  /** 媒体类型列表 */
  mediaTypeList?: string[];
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
   * 录入开始时间
   * @format date-time
   */
  startTime?: string;
}

/** MediaResourcesResp */
export interface MediaResourcesResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 媒体资源列表 */
  resultList?: MediaResourcesBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}
