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

/** BasicPushBean */
export interface BasicPushBean {
  /** 失败原因 */
  failReason?: string;
  /** 编码 */
  number?: string;
  /**
   * 推送状态: 0-未推送 1-推送成功 2-推送失败
   * @format int32
   */
  pushStatus?: number;
  /** 推送状态描述 */
  pushStatusDesc?: string;
  /**
   * 推送时间
   * @format date-time
   */
  pushTime?: string;
}

/** CommonExportResp */
export interface CommonExportResp {
  /** app标识 */
  appCode?: string;
  /** 下载链接 */
  downloadUrl?: string;
  /** 模块标识 */
  moduleCode?: string;
}

/** DictBean */
export interface DictBean {
  /** 键-值子集合 */
  children?: DictBean[];
  /** 键 */
  key?: string;
  /** 值 */
  value?: string;
}

/** MonitorCfgBean */
export interface MonitorCfgBean {
  /** 配置编码 */
  code?: string;
  /** 企业编码 */
  companyCode?: string;
  /**
   * 主键
   * @format int64
   */
  id?: number;
  /** 来源系统编码 */
  sourceSystemCode?: string;
  /** 来源系统描述 */
  sourceSystemDesc?: string;
  /** 来源系统路径 */
  sourceSystemPath?: string;
  /** 来源系统类型 */
  sourceSystemType?: string;
  /** 目标系统编码 */
  targetSystemCode?: string;
  /** 目标系统描述 */
  targetSystemDesc?: string;
  /** 目标系统路径 */
  targetSystemPath?: string;
  /** 目标系统类型 */
  targetSystemType?: string;
}

/** MonitorCfgResp */
export interface MonitorCfgResp {
  /** 来源系统 */
  sourceSystemList?: DictBean[];
}

/** MonitorCompareResultBean */
export interface MonitorCompareResultBean {
  /**
   * 路径排序
   * @format int32
   */
  compareCfgFilePathSort?: number;
  /** 异常描述 */
  compareResultDesc?: string;
  /** 比较结果:same、different、inexistence */
  compareResultType?: string;
  /** 比较结果描述 */
  compareResultTypeDesc?: string;
  /**
   * 字段比较排序
   * @format int32
   */
  compareSort?: number;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 自定义描述 */
  customerErrorDesc?: string;
  /** 字段名称 */
  filedName?: string;
  /** 是否一致 */
  isConsistent?: boolean;
  /** 路径类型 */
  pathType?: string;
  /** 路径类型描述 */
  pathTypeDesc?: string;
  /** 二级唯一编码 */
  secondUniqueCode?: string;
  /** 目标系统值 */
  targetValue?: string;
  /** 唯一编码 */
  uniqueCode?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /** 源系统值 */
  value?: string;
}

/** MonitorDataSummaryResp */
export interface MonitorDataSummaryResp {
  /**
   * 最近更新时间
   * @format date-time
   */
  recentUpdateTime?: string;
  /** 金额差异总量 */
  totalAmountDifference?: number;
  /**
   * 总异常数量
   * @format int32
   */
  totalPushExceptionNum?: number;
  /** 推送异常率 */
  totalPushExceptionRate?: string;
  /**
   * 总推送失败数量
   * @format int32
   */
  totalPushFailedNum?: number;
  /** 推送失败率 */
  totalPushFailedRate?: string;
  /**
   * 总推送总量
   * @format int32
   */
  totalPushNum?: number;
  /**
   * 数量差异总量
   * @format int32
   */
  totalQuantityDifference?: number;
}

/** MonitorDetailQueryResp */
export interface MonitorDetailQueryResp {
  /** 配置编码 */
  cfgCode?: string;
  /** 唯一编码 */
  code?: string;
  /** 企业编码 */
  companyCode?: string;
  /** 监控对比结果 */
  compareResultList?: MonitorCompareResultBean[];
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 异常状态描述 */
  errorDesc?: string;
  errorType?: string;
  /** 异常类型描述 */
  errorTypeDesc?: string;
  /** 扩展字段信息 */
  extJson?: MonitorExtraBean;
  /**
   * 主键
   * @format int64
   */
  id?: number;
  /** 监控配置 */
  monitorCfg?: MonitorCfgBean;
  /** 监控项 */
  monitorItemList?: MonitorItemBean[];
  /** 操作日志 */
  operationLogList?: OperationLogBean[];
  /** 推送信息 */
  pushInfo?: BasicPushBean;
  /** 源单据编码 */
  sourceCode?: string;
  /**
   * 来源-创建时间
   * @format date-time
   */
  sourceCreateTime?: string;
  /** 来源数据 */
  sourceData?: string;
  /** 目标单据 */
  targetCode?: string;
  /**
   * 目标单据-创建时间
   * @format date-time
   */
  targetCreateTime?: string;
  /** 目标数据 */
  targetData?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** MonitorExtraBean */
export interface MonitorExtraBean {
  /** 金额差异 */
  amountDiffer?: number;
  /** 数量差异 */
  quantityDiffer?: number;
}

/** MonitorItemBean */
export interface MonitorItemBean {
  /** 企业编码 */
  companyCode?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 扩展字段信息 */
  extJson?: MonitorItemExtraBean;
  /**
   * 主键
   * @format int64
   */
  id?: number;
  /** 唯一编码 */
  monitorCode?: string;
  /** 行唯一编码 */
  rowUnique?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** MonitorItemExtraBean */
export interface MonitorItemExtraBean {
  /** 金额差 */
  diffAmount?: string;
  /** 数量差 */
  diffQty?: string;
  /** 源系统金额 */
  sourceSystemAmount?: string;
  /** 源金额备注 */
  sourceSystemAmountRemark?: string;
  /** 源系统数量 */
  sourceSystemQty?: string;
  /** 源数量备注 */
  sourceSystemQtyRemark?: string;
  /** 目标系统金额 */
  targetSystemAmount?: string;
  /** 目标金额备注 */
  targetSystemAmountRemark?: string;
  /** 目标系统数量 */
  targetSystemQty?: string;
  /** 目标数量备注 */
  targetSystemQtyRemark?: string;
  /** 唯一编码 */
  uniqueCode?: string;
}

/** MonitorListQueryReq */
export interface MonitorListQueryReq {
  /**
   * 深度分页偏移Id, Id可以不用传
   * @format int64
   */
  deepPaginationOffsetId?: number;
  /** 异常类型: 1-信息不符 2-金额不符 3-数量不符 4-数据不存在 5-无差异 */
  errorTypes?: string[];
  /** 关键字: 来源单据编码/目标单据编码 */
  keyword?: string;
  monitorPlatformCfgCode?: string;
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
   * 推送状态:0-未推送 1-推送成功 2-推送失败
   * @format int32
   */
  pushStatus?: number;
  /**
   * 推送时间-结束
   * @format date-time
   */
  pushTimeEnd?: string;
  /**
   * 推送时间-开始
   * @format date-time
   */
  pushTimeStart?: string;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /**
   * 原单创建时间-结束
   * @format date-time
   */
  sourceCreateTimeEnd?: string;
  /**
   * 原单创建时间-开始
   * @format date-time
   */
  sourceCreateTimeStart?: string;
  /** 来源系统:金蝶-kingdee 分贝通-fbt SRM-srm Erp-erp */
  sourceSystemCodes?: string[];
  /** 来源系统单据 */
  sourceSystemTypes?: string[];
  /** 目标系统:金蝶-kingdee 分贝通-fbt SRM-srm Erp-erp */
  targetSystemCodes?: string[];
  /** 目标系统单据 */
  targetSystemTypes?: string[];
}

/** MonitorListQueryResp */
export interface MonitorListQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 监控列表 */
  recordList?: MonitorListQueryRespItem[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
  totalPageStr?: string;
}

/** MonitorListQueryRespItem */
export interface MonitorListQueryRespItem {
  /** 配置编码 */
  cfgCode?: string;
  /** 唯一编码 */
  code?: string;
  /** 企业编码 */
  companyCode?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 异常状态描述 */
  errorDesc?: string;
  errorType?: string;
  /** 异常类型描述 */
  errorTypeDesc?: string;
  /** 扩展字段信息 */
  extJson?: MonitorExtraBean;
  /**
   * 主键
   * @format int64
   */
  id?: number;
  /** 监控配置 */
  monitorCfg?: MonitorCfgBean;
  /** 监控项 */
  monitorItemList?: MonitorItemBean[];
  /** 推送信息 */
  pushInfo?: BasicPushBean;
  /** 源单据编码 */
  sourceCode?: string;
  /**
   * 来源-创建时间
   * @format date-time
   */
  sourceCreateTime?: string;
  /** 来源数据 */
  sourceData?: string;
  /** 目标单据 */
  targetCode?: string;
  /**
   * 目标单据-创建时间
   * @format date-time
   */
  targetCreateTime?: string;
  /** 目标数据 */
  targetData?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** OperationLogBean */
export interface OperationLogBean {
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 对象编码 */
  itemCode?: string;
  /** 对象内容 */
  itemContent?: string;
  /** 对象类型 */
  itemType?: string;
  /** 模块类型 */
  moduleType?: string;
  /** 操作类型 */
  operationType?: string;
  /** 操作类型 */
  operationTypeDesc?: string;
  /** 操作人 */
  operator?: string;
  /** 备注 */
  remark?: string;
  /** 流水编号 */
  serialCode?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** CommonResp«CommonExportResp» */
export interface CommonRespCommonExportResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: CommonExportResp;
  traceId?: string;
}

/** CommonResp«object» */
export interface CommonRespObject {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: object;
  traceId?: string;
}
