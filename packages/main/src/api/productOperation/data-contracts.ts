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

/** AIotMacAddressListQueryReq */
export interface AIotMacAddressListQueryReq {
  /** 批次号 */
  batchNumber?: string;
  /**
   * 创建结束时间
   * @format date-time
   */
  createTimeEnd?: string;
  /**
   * 创建开始时间
   * @format date-time
   */
  createTimeStart?: string;
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

/** AIotMacAddressListQueryResp */
export interface AIotMacAddressListQueryResp {
  code?: string;
  /** MAC地址信息 */
  macInfoList?: MacAddressInfo[];
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

/** AIotMacProductListQueryReq */
export interface AIotMacProductListQueryReq {
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

/** AIotMacProductListQueryResp */
export interface AIotMacProductListQueryResp {
  code?: string;
  /** 产品代码信息 */
  data?: ProductInfo[];
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

/** DataCollect */
export interface DataCollect {
  /** 广告数据-Acos-广告花费/广告销售额 */
  acosRate?: number;
  /** 销售数据-实际日销-平均 */
  actualDaySaleAvg?: number;
  /** 广告数据-广告转化率-广告订单/点击率 */
  advertisingConversionRate?: number;
  /** 广告数据-广告花费-取平均 */
  advertisingCostAvg?: number;
  /** 广告数据-广告花费占比-广告销售额/销售额 */
  advertisingCostRate?: number;
  /** 广告数据-广告订单占比-广告花费占比/日销 */
  advertisingOrderActualRate?: number;
  /** 广告数据-广告订单-取平均 */
  advertisingOrderNumAvg?: number;
  /** 广告数据-广告销售额-取平均 */
  advertisingSalesAvg?: number;
  /** 销售数据-总转换率-日销/总流量 */
  allConversionRate?: number;
  /** 销售数据-总流量-平均 */
  allFlowNumAvg?: number;
  /**
   * 排名数据-大类排名-最后一天
   * @format int32
   */
  categoryRankLast?: number;
  /** 广告数据-点击量-平均 */
  clickNumAvg?: number;
  /** 广告数据-点击率-点击量/曝光量 */
  clickRate?: number;
  /** 广告数据-cpa/单个订单花费-广告花费/广告订单 */
  cpaOrderCostRate?: number;
  /** 广告数据-cpc单次点击费用-平均 */
  cpcClickCostAvg?: number;
  /** 广告数据-曝光量-平均 */
  exposureNumAvg?: number;
  /** 销售数据-RV星级-最后一天 */
  rvLeveLast?: number;
  /**
   * 销售数据-RV数量-最后一天
   * @format int32
   */
  rvNumLast?: number;
  /** 销售数据-销售额-平均 */
  salesAvg?: number;
  /** 销售数据-销量差额-相加 */
  salesMarginSum?: number;
  /**
   * 排名数据-小类排名-最后一天
   * @format int32
   */
  subCategoryRankLast?: number;
}

/** MacAddressInfo */
export interface MacAddressInfo {
  /** 批次号 */
  batchNumber?: string;
  /** 衍生/迭代编码 */
  deriveCode?: string;
  /** 开发阶段 EVT DVT PVT MP */
  developState?: string;
  /** 工厂编码 */
  factoryCode?: string;
  /** MAC地址 */
  macAddr?: string;
  /** 来源PO */
  poCode?: string;
  /** 产品代码 */
  productCode?: string;
  /** 供应链产品sku */
  productSku?: string;
  /** 系列代码 */
  seriesCode?: string;
}

/** MacFactoryBean */
export interface MacFactoryBean {
  /** 工厂编码 */
  factoryCode?: string;
  /** 工厂名称 */
  factoryName?: string;
}

/** MemberSimpleBean */
export interface MemberSimpleBean {
  /** 成员编码 */
  memberCode?: string;
  /** 成员名称 */
  name?: string;
}

/** OperationProjectBaseBean */
export interface OperationProjectBaseBean {
  /** 核心卖点 */
  coreSellingPoint?: string;
  /** 营销策略 */
  marketingPolicy?: string;
  /** 次要卖点 */
  minorSellingPoint?: string;
  /** 定价策略 */
  pricingStrategy?: string;
  /** 产品编码 */
  productCode?: string;
  /** 产品名称 */
  productName?: string;
  /** 产品定位 */
  productPositioning?: string;
  /** 项目编码编码 */
  projectCode?: string;
  /** 项目名称 */
  projectName?: string;
  /**
   * 开售日期
   * @format date
   */
  saleStartDate?: string;
  /**
   * 目标销量-推广第一个月
   * @format int32
   */
  targetSaleOneMonth?: number;
  /**
   * 目标销量-推广第三个月
   * @format int32
   */
  targetSaleThreeMonth?: number;
  /**
   * 目标销量-推广第二个月
   * @format int32
   */
  targetSaleTwoMonth?: number;
}

/** OperationProjectDetailListReq */
export interface OperationProjectDetailListReq {
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
  /** 项目编码编码 */
  projectCode?: string;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
}

/** OperationProjectDetailResp */
export interface OperationProjectDetailResp {
  operationProject?: OperationProjectBaseBean;
  operationWeekTargetList?: OperationWeekTargetBean[];
}

/** OperationProjectDetailSaveReq */
export interface OperationProjectDetailSaveReq {
  /** 衡量指标-广告费用 */
  advertisingCost?: number;
  /** 衡量指标-广告费比/周 */
  advertisingCostRate?: number;
  /** 衡量指标-广告CVR */
  advertisingCvr?: number;
  /** 衡量指标-广告订单占比 */
  advertisingOrderRate?: number;
  /**
   * 衡量指标-大类排名
   * @format int32
   */
  categoryRank?: number;
  /**
   * 衡量指标-click/天
   * @format int32
   */
  click?: number;
  /** 衡量指标-转化率指标/日 */
  conversionRateTarget?: number;
  /** 衡量指标-CPC/天 */
  cpc?: number;
  /**
   * 衡量指标-流量指标/日
   * @format int32
   */
  flowTarget?: number;
  /** 运营项目每周每日实际数据集合 */
  operationWeekDailyActualList?: OperationWeekDailyActualBeanReq[];
  /** 售价 */
  price?: number;
  /** 衡量指标-毛利率/周 */
  profitRate?: number;
  /** 产品运营项目编码 */
  projectCode?: string;
  /** 推广前毛利率  例： 37.0% -> 37.0 */
  promotionProfitRate?: number;
  /** 目的 */
  purpose?: string;
  /**
   * 衡量指标-小类排名
   * @format int32
   */
  subCategoryRank?: number;
  /**
   * 目标日销
   * @format int32
   */
  targetDailySale?: number;
  /**
   * 周期结束日期
   * @format date
   */
  weekEndDate?: string;
  /** 周复盘 */
  weekReview?: string;
  /**
   * 周期开始日期
   * @format date
   */
  weekStartDate?: string;
  /** 运营周期记录编码 */
  weekTargetCode?: string;
}

/** OperationProjectDetailSaveResp */
export interface OperationProjectDetailSaveResp {
  /** 运营周期记录编码 */
  weekTargetCode?: string;
}

/** OperationProjectLogBean */
export interface OperationProjectLogBean {
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

/** OperationProjectLogResp */
export interface OperationProjectLogResp {
  /** 日志列表 */
  logList?: OperationProjectLogBean[];
}

/** OperationProjectQueryBean */
export interface OperationProjectQueryBean {
  /** 核心卖点 */
  coreSellingPoint?: string;
  /** 营销策略 */
  marketingPolicy?: string;
  /** 次要卖点 */
  minorSellingPoint?: string;
  /** 定价策略 */
  pricingStrategy?: string;
  /** 产品编码 */
  productCode?: string;
  /** 产品名称 */
  productName?: string;
  /** 产品定位 */
  productPositioning?: string;
  /** 项目编码编码 */
  projectCode?: string;
  /** 项目名称 */
  projectName?: string;
  /**
   * 开售日期
   * @format date
   */
  saleStartDate?: string;
  /**
   * 目标销量-推广第一个月
   * @format int32
   */
  targetSaleOneMonth?: number;
  /**
   * 目标销量-推广第三个月
   * @format int32
   */
  targetSaleThreeMonth?: number;
  /**
   * 目标销量-推广第二个月
   * @format int32
   */
  targetSaleTwoMonth?: number;
}

/** OperationProjectQueryResp */
export interface OperationProjectQueryResp {
  code?: string;
  message?: string;
  operationProductList?: OperationProjectQueryBean[];
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

/** OperationProjectSaveReq */
export interface OperationProjectSaveReq {
  /** 核心卖点 */
  coreSellingPoint?: string;
  /** 营销策略 */
  marketingPolicy?: string;
  /** 次要卖点 */
  minorSellingPoint?: string;
  /** 定价策略 */
  pricingStrategy?: string;
  /** 产品编码 */
  productCode?: string;
  /** 产品定位 */
  productPositioning?: string;
  /** 项目编码编码 */
  projectCode?: string;
  /** 项目名称 */
  projectName?: string;
  /**
   * 开售日期
   * @format date
   */
  saleStartDate?: string;
  /**
   * 目标销量-推广第一个月
   * @format int32
   */
  targetSaleOneMonth?: number;
  /**
   * 目标销量-推广第三个月
   * @format int32
   */
  targetSaleThreeMonth?: number;
  /**
   * 目标销量-推广第二个月
   * @format int32
   */
  targetSaleTwoMonth?: number;
}

/** OperationProjectSaveResp */
export interface OperationProjectSaveResp {
  /** 项目编码编码 */
  projectCode?: string;
}

/** OperationTeamBean */
export interface OperationTeamBean {
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /** 创建人 */
  creatorName?: string;
  /** 产品标签列表 */
  labelList?: ProductTagSimpleBean[];
  /** 负责人列表 */
  leaderList?: MemberSimpleBean[];
  /** 成员列表 */
  memberList?: MemberSimpleBean[];
  /** 操作人 */
  operator?: string;
  /** 操作人 */
  operatorName?: string;
  /** 备注 */
  remark?: string;
  /**
   * 状态 0-禁用 1-启用
   * @format int32
   */
  status?: number;
  /** 团队编码 */
  teamCode?: string;
  /** 团队名称 */
  teamName?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** OperationTeamHandleReq */
export interface OperationTeamHandleReq {
  /** 团队编码 更新时必传 */
  teamCode?: string;
  /** 操作类型 disable-禁用 enable-启用 */
  type?: string;
}

/** OperationTeamQueryResp */
export interface OperationTeamQueryResp {
  code?: string;
  message?: string;
  /** 运营团队列表 */
  operationTeamList?: OperationTeamBean[];
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

/** OperationTeamResp */
export interface OperationTeamResp {
  /** 团队编码 */
  teamCode?: string;
}

/** OperationTeamSaveReq */
export interface OperationTeamSaveReq {
  /** 产品标签编码列表 */
  labelList?: string[];
  /** 负责人编码列表 */
  leaderList?: string[];
  /** 成员编码列表 */
  memberList?: string[];
  /** 备注 */
  remark?: string;
  /** 场景 operation-经营团队, meta-红人业务团队 */
  scene?: string;
  /** 团队编码 更新时必传 */
  teamCode?: string;
  /** 团队名称 */
  teamName?: string;
}

/** OperationWeekDailyActualBeanReq */
export interface OperationWeekDailyActualBeanReq {
  /** 广告数据-Acos */
  acos?: number;
  /**
   * 销售数据-实际日销
   * @format int32
   */
  actualDaySale?: number;
  /** 广告数据-广告转化率 */
  advertisingConversionRate?: number;
  /** 广告数据-广告花费 */
  advertisingCostActual?: number;
  /** 广告数据-广告花费占比 */
  advertisingCostActualRate?: number;
  /** 广告数据-广告订单占比 */
  advertisingOrderActualRate?: number;
  /**
   * 广告数据-广告订单
   * @format int32
   */
  advertisingOrderNum?: number;
  /** 广告数据-广告销售额 */
  advertisingSales?: number;
  /** 销售数据-总转换率 */
  allConversionRate?: number;
  /**
   * 销售数据-总流量
   * @format int32
   */
  allFlowNum?: number;
  /**
   * 排名数据-大类排名
   * @format int32
   */
  categoryRankActual?: number;
  /**
   * 广告数据-点击量
   * @format int32
   */
  clickNum?: number;
  /** 广告数据-点击率 */
  clickRate?: number;
  /** 广告数据-cpa/单个订单花费 */
  cpaOrderCost?: number;
  /** 广告数据-cpc单次点击费用 */
  cpcClickCost?: number;
  /**
   * 广告数据-曝光量
   * @format int32
   */
  exposureNum?: number;
  /** 销售数据-RV星级 */
  rvLeve?: number;
  /**
   * 销售数据-RV数量
   * @format int32
   */
  rvNum?: number;
  /** 销售数据-销售额 */
  sales?: number;
  /** 销售数据-销量差额 */
  salesMargin?: number;
  /**
   * 排名数据-小类排名
   * @format int32
   */
  subCategoryRankActual?: number;
  /** 周期日维度记录编码 */
  weekDailyCode?: string;
  /**
   * 周期日期
   * @format date
   */
  weekDate?: string;
}

/** OperationWeekDailyActualBeanRes */
export interface OperationWeekDailyActualBeanRes {
  /**
   * 广告数据-Acos
   * @format int32
   */
  acos?: number;
  /**
   * 销售数据-实际日销
   * @format int32
   */
  actualDaySale?: number;
  /** 广告数据-广告转化率 */
  advertisingConversionRate?: number;
  /** 广告数据-广告转化率 字符 */
  advertisingConversionRateStr?: string;
  /** 广告数据-广告花费 */
  advertisingCostActual?: number;
  /** 广告数据-广告花费占比 */
  advertisingCostActualRate?: number;
  /** 广告数据-广告花费占比 字符 */
  advertisingCostActualRateStr?: string;
  /** 广告数据-广告订单占比 */
  advertisingOrderActualRate?: number;
  /** 广告数据-广告订单占比 字符 */
  advertisingOrderActualRateStr?: string;
  /**
   * 广告数据-广告订单
   * @format int32
   */
  advertisingOrderNum?: number;
  /** 广告数据-广告销售额 */
  advertisingSales?: number;
  /** 销售数据-总转换率 */
  allConversionRate?: number;
  /** 销售数据-总转换率 字符 */
  allConversionRateStr?: string;
  /**
   * 销售数据-总流量
   * @format int32
   */
  allFlowNum?: number;
  /**
   * 排名数据-大类排名
   * @format int32
   */
  categoryRankActual?: number;
  /**
   * 广告数据-点击量
   * @format int32
   */
  clickNum?: number;
  /** 广告数据-点击率 */
  clickRate?: number;
  /** 广告数据-点击率 字符 */
  clickRateStr?: string;
  /** 广告数据-cpa/单个订单花费 */
  cpaOrderCost?: number;
  /** 广告数据-cpc单次点击费用 */
  cpcClickCost?: number;
  /**
   * 广告数据-曝光量
   * @format int32
   */
  exposureNum?: number;
  /** 销售数据-RV星级 */
  rvLeve?: number;
  /**
   * 销售数据-RV数量
   * @format int32
   */
  rvNum?: number;
  /** 销售数据-销售额 */
  sales?: number;
  /** 销售数据-销量差额 */
  salesMargin?: number;
  /**
   * 排名数据-小类排名
   * @format int32
   */
  subCategoryRankActual?: number;
  /** 周期日维度记录编码 */
  weekDailyCode?: string;
  /**
   * 周期日期
   * @format date
   */
  weekDate?: string;
  /** 运营周期记录编码 */
  weekTargetCode?: string;
}

/** OperationWeekTargetBean */
export interface OperationWeekTargetBean {
  /** 衡量指标-广告费用 */
  advertisingCost?: number;
  /** 衡量指标-广告费比/周 */
  advertisingCostRate?: number;
  /** 衡量指标-广告费比/周 字符 */
  advertisingCostRateStr?: number;
  /** 衡量指标-广告CVR */
  advertisingCvr?: number;
  /** 衡量指标-广告订单占比 */
  advertisingOrderRate?: number;
  /** 衡量指标-广告订单占比 字符 */
  advertisingOrderRateStr?: string;
  /**
   * 衡量指标-大类排名
   * @format int32
   */
  categoryRank?: number;
  /**
   * 衡量指标-click/天
   * @format int32
   */
  click?: number;
  /** 衡量指标-转化率指标/日 */
  conversionRateTarget?: number;
  /** 衡量指标-转化率指标/日 字符 */
  conversionRateTargetStr?: string;
  /** 衡量指标-CPC/天 */
  cpc?: number;
  /** 数据汇总 */
  dataCollect?: DataCollect;
  /**
   * 衡量指标-流量指标/日
   * @format int32
   */
  flowTarget?: number;
  /** 运营项目每周每日实际数据集合 */
  operationWeekDailyActualList?: OperationWeekDailyActualBeanRes[];
  /** 售价 */
  price?: number;
  /** 衡量指标-毛利率/周 */
  profitRate?: number;
  /** 衡量指标-毛利率/周 字符 */
  profitRateStr?: number;
  /** 推广前毛利率  例： 37.0% -> 37.0 */
  promotionProfitRate?: number;
  /** 推广前毛利率  例： 37.0% */
  promotionProfitRateStr?: string;
  /** 目的 */
  purpose?: string;
  /**
   * 衡量指标-小类排名
   * @format int32
   */
  subCategoryRank?: number;
  /**
   * 目标日销
   * @format int32
   */
  targetDailySale?: number;
  /** 周期 */
  weekDateStr?: string;
  /**
   * 周期结束日期
   * @format date
   */
  weekEndDate?: string;
  /** 周复盘 */
  weekReview?: string;
  /**
   * 周期开始日期
   * @format date
   */
  weekStartDate?: string;
  /** 运营周期记录编码 */
  weekTargetCode?: string;
}

/** PdtNewProductBean */
export interface PdtNewProductBean {
  /** 关联项目编码 */
  productCode?: string;
  /** 关联项目名称 */
  productName?: string;
}

/** PlatformOperationBatchReq */
export interface PlatformOperationBatchReq {
  /** id列表 */
  idList?: number[];
  /** 运营人员 */
  operator?: string;
  /**
   * 平台类型。 1：独立站；2：新平台；3：亚马逊
   * @format int32
   */
  platformType?: number;
}

/** PlatformOperationQueryBean */
export interface PlatformOperationQueryBean {
  /** 渠道 */
  channel?: string;
  /**
   * id
   * @format int64
   */
  id?: number;
  /** 运营人员 */
  operator?: string;
  /** 运营人员名称 */
  operatorName?: string;
  /**
   * 平台类型。 1：独立站；2：新平台；3：亚马逊
   * @format int32
   */
  platformType?: number;
  /** 店铺 */
  shop?: string;
  /** 站点 */
  site?: string;
  /** 站点 */
  siteName?: string;
  /** 产品SKU */
  skuCode?: string;
}

/** PlatformOperationQueryReq */
export interface PlatformOperationQueryReq {
  /** 渠道 */
  channel?: string;
  /** 运营人员 */
  operatorList?: string[];
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
   * 平台类型。 1：独立站；2：新平台；3：亚马逊
   * @format int32
   */
  platformType?: number;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 店铺 */
  shop?: string;
  /** 站点 */
  site?: string;
  /** 产品SKU */
  skuCode?: string;
}

/** PlatformOperationQueryResp */
export interface PlatformOperationQueryResp {
  code?: string;
  message?: string;
  operationQueryBeanList?: PlatformOperationQueryBean[];
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

/** PlatformOperationSaveReq */
export interface PlatformOperationSaveReq {
  /** 渠道 */
  channel?: string;
  /**
   * id
   * @format int64
   */
  id?: number;
  /** 运营人员 */
  operator?: string;
  /**
   * 平台类型。 1：独立站；2：新平台；3：亚马逊
   * @format int32
   */
  platformType?: number;
  /** 店铺 */
  shop?: string;
  /** 站点 */
  site?: string;
  /** 产品SKU */
  skuCode?: string;
}

/** ProductInfo */
export interface ProductInfo {
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /** 创建人名 */
  creatorName?: string;
  /** 衍生/迭代编码 */
  deriveCode?: string;
  /** 衍生/迭代描述 */
  deriveDesc?: string;
  /** 工厂编码 */
  factoryList?: MacFactoryBean[];
  /** 更新人 */
  operator?: string;
  /** 更新人名 */
  operatorName?: string;
  /** 产品代码 */
  productCode?: string;
  /** 关联项目 */
  relationProjectList?: PdtNewProductBean[];
  /** 系列代码 */
  seriesCode?: string;
  /** 系列描述 */
  seriesDesc?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** ProductTagSimpleBean */
export interface ProductTagSimpleBean {
  /** 标签编码 */
  tagCode?: string;
  /** 标签名称 */
  tagName?: string;
}

/** CommonResp«string» */
export interface CommonRespString {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: string;
  traceId?: string;
}
