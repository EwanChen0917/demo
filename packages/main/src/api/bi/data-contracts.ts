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

/** AdAnalysisBean */
export interface AdAnalysisBean {
  /** Amazon广告分析 */
  amazonAdAnalysis?: AmazonAdAnalysisBean;
  /** Shopify广告分析 */
  shopifyAdAnalysis?: AmazonAdAnalysisBean;
  /** Tiktok广告分析 */
  tiktokAdAnalysis?: AmazonAdAnalysisBean;
}

/** AdAnalysisResp */
export interface AdAnalysisResp {
  /** 广告策略分析 */
  adsLevel?: AdsLevelTotalDO;
  /** 广告类型占比 */
  adsTypePropList?: AdDetailDO[];
  /** 品牌占比 */
  brandPropList?: AdDetailDO[];
  /** 品牌 TOP10 */
  brandTop10?: AdBrandTopDO;
  /** 品类 TOP10 */
  categoryTop10?: AdCategoryTopDO;
  /**
   * 点击量结束值
   * @format int64
   */
  clicksEnd?: number;
  /**
   * 点击量开始值
   * @format int64
   */
  clicksStart?: number;
  /** 国家数据概览 */
  countryDetailList?: AdDetailDO[];
  /** 国家占比 */
  countryPropList?: AdDetailDO[];
  /** GTM品线占比 */
  gtmProductLinePropList?: AdDetailDO[];
  /**
   * 点击量最大值
   * @format int32
   */
  maxClicks?: number;
  /**
   * 点击量最小值
   * @format int32
   */
  minClicks?: number;
  /** 品线占比 */
  productLinePropList?: AdDetailDO[];
  /** 各象限明细 */
  quadrantDetailList?: AdQuadrantDetailDO[];
  /** 总象限汇总 */
  quadrantTotal?: AdQuadrantTotalDO;
  /** 各象限汇总 */
  quadrantTotalList?: AdQuadrantTotalDO[];
  /** SPU TOP10 */
  spuTop10?: AdSpuTopDO;
  /** 广告总览 */
  total?: AdBaseMetricDO;
  /** 广告趋势 */
  trendList?: AdBaseMetricTrendDO[];
}

/** AdBaseMetricDO */
export interface AdBaseMetricDO {
  /** 广告成本占比（ACOS） */
  acos?: number;
  /** 广告成本占比环比 */
  acosMom?: number;
  /** 广告成本占比同比 */
  acosYoy?: number;
  /** 广告订单量 */
  adOrderQty?: number;
  /** 广告订单量环比 */
  adOrderQtyMom?: number;
  /** 广告订单量占比 */
  adOrderQtyProp?: number;
  /** 广告订单量占比环比 */
  adOrderQtyPropMom?: number;
  /** 广告订单量占比同比 */
  adOrderQtyPropYoy?: number;
  /** 广告订单量同比 */
  adOrderQtyYoy?: number;
  /** 广告销售额 */
  adSalesAmount?: number;
  /** 广告销售额环比 */
  adSalesAmountMom?: number;
  /** 广告销售额占比 */
  adSalesAmountProp?: number;
  /** 广告销售额占比环比 */
  adSalesAmountPropMom?: number;
  /** 广告销售额占比同比 */
  adSalesAmountPropYoy?: number;
  /** 广告销售额同比 */
  adSalesAmountYoy?: number;
  /** 客单价（ATV） */
  atv?: number;
  /** 客单价环比 */
  atvMom?: number;
  /** 客单价同比 */
  atvYoy?: number;
  /** 点击量 */
  clicks?: number;
  /** 点击量环比 */
  clicksMom?: number;
  /** 点击量占比 */
  clicksProp?: number;
  /** 点击量同比 */
  clicksYoy?: number;
  /** 广告花费 */
  cost?: number;
  /** 广告花费环比 */
  costMom?: number;
  /** 广告花费占比 */
  costProp?: number;
  /** 广告花费占比环比 */
  costPropMom?: number;
  /** 广告花费占比同比 */
  costPropYoy?: number;
  /** 广告花费同比 */
  costYoy?: number;
  /** 单订单成本（CPA） */
  cpa?: number;
  /** 单订单成本环比 */
  cpaMom?: number;
  /** 单订单成本同比 */
  cpaYoy?: number;
  /** 单次点击成本（CPC） */
  cpc?: number;
  /** 单次点击成本环比 */
  cpcMom?: number;
  /** 单次点击成本同比 */
  cpcYoy?: number;
  /** 千次曝光成本（CPM） */
  cpm?: number;
  /** 千次曝光成本环比 */
  cpmMom?: number;
  /** 千次曝光成本同比 */
  cpmYoy?: number;
  /** 点击率（CTR） */
  ctr?: number;
  /** 点击率环比 */
  ctrMom?: number;
  /** 点击率同比 */
  ctrYoy?: number;
  /** 转化率（CVR） */
  cvr?: number;
  /** 转化率环比 */
  cvrMom?: number;
  /** 转化率同比 */
  cvrYoy?: number;
  /** 曝光量 */
  impressions?: number;
  /** 曝光量环比 */
  impressionsMom?: number;
  /** 曝光量占比 */
  impressionsProp?: number;
  /** 曝光量同比 */
  impressionsYoy?: number;
  /** 广告投入产出比（ROAS） */
  roas?: number;
  /** 广告投入产出比环比 */
  roasMom?: number;
  /** 广告投入产出比同比 */
  roasYoy?: number;
  /** 总订单量 */
  totalOrderQty?: number;
  /** 总订单量环比 */
  totalOrderQtyMom?: number;
  /** 总订单量同比 */
  totalOrderQtyYoy?: number;
  /** 总销售额 */
  totalSalesAmount?: number;
  /** 总销售额环比 */
  totalSalesAmountMom?: number;
  /** 总销售额同比 */
  totalSalesAmountYoy?: number;
}

/** AdBaseMetricTrendDO */
export interface AdBaseMetricTrendDO {
  /** 广告成本占比（ACOS） */
  acos?: number;
  /** 广告成本占比环比 */
  acosMom?: number;
  /** 广告成本占比同比 */
  acosYoy?: number;
  /** 广告订单量 */
  adOrderQty?: number;
  /** 广告订单量环比 */
  adOrderQtyMom?: number;
  /** 广告订单量占比 */
  adOrderQtyProp?: number;
  /** 广告订单量占比环比 */
  adOrderQtyPropMom?: number;
  /** 广告订单量占比同比 */
  adOrderQtyPropYoy?: number;
  /** 广告订单量同比 */
  adOrderQtyYoy?: number;
  /** 广告销售额 */
  adSalesAmount?: number;
  /** 广告销售额环比 */
  adSalesAmountMom?: number;
  /** 广告销售额占比 */
  adSalesAmountProp?: number;
  /** 广告销售额占比环比 */
  adSalesAmountPropMom?: number;
  /** 广告销售额占比同比 */
  adSalesAmountPropYoy?: number;
  /** 广告销售额同比 */
  adSalesAmountYoy?: number;
  /** 客单价（ATV） */
  atv?: number;
  /** 客单价环比 */
  atvMom?: number;
  /** 客单价同比 */
  atvYoy?: number;
  /** 点击量 */
  clicks?: number;
  /** 点击量环比 */
  clicksMom?: number;
  /** 点击量占比 */
  clicksProp?: number;
  /** 点击量同比 */
  clicksYoy?: number;
  /** 广告花费 */
  cost?: number;
  /** 广告花费环比 */
  costMom?: number;
  /** 广告花费占比 */
  costProp?: number;
  /** 广告花费占比环比 */
  costPropMom?: number;
  /** 广告花费占比同比 */
  costPropYoy?: number;
  /** 广告花费同比 */
  costYoy?: number;
  /** 单订单成本（CPA） */
  cpa?: number;
  /** 单订单成本环比 */
  cpaMom?: number;
  /** 单订单成本同比 */
  cpaYoy?: number;
  /** 单次点击成本（CPC） */
  cpc?: number;
  /** 单次点击成本环比 */
  cpcMom?: number;
  /** 单次点击成本同比 */
  cpcYoy?: number;
  /** 千次曝光成本（CPM） */
  cpm?: number;
  /** 千次曝光成本环比 */
  cpmMom?: number;
  /** 千次曝光成本同比 */
  cpmYoy?: number;
  /** 点击率（CTR） */
  ctr?: number;
  /** 点击率环比 */
  ctrMom?: number;
  /** 点击率同比 */
  ctrYoy?: number;
  /** 转化率（CVR） */
  cvr?: number;
  /** 转化率环比 */
  cvrMom?: number;
  /** 转化率同比 */
  cvrYoy?: number;
  /** 日期 */
  date?: string;
  /** 曝光量 */
  impressions?: number;
  /** 曝光量环比 */
  impressionsMom?: number;
  /** 曝光量占比 */
  impressionsProp?: number;
  /** 曝光量同比 */
  impressionsYoy?: number;
  /** 广告投入产出比（ROAS） */
  roas?: number;
  /** 广告投入产出比环比 */
  roasMom?: number;
  /** 广告投入产出比同比 */
  roasYoy?: number;
  /** 总订单量 */
  totalOrderQty?: number;
  /** 总订单量环比 */
  totalOrderQtyMom?: number;
  /** 总订单量同比 */
  totalOrderQtyYoy?: number;
  /** 总销售额 */
  totalSalesAmount?: number;
  /** 总销售额环比 */
  totalSalesAmountMom?: number;
  /** 总销售额同比 */
  totalSalesAmountYoy?: number;
}

/** AdBrandTopDO */
export interface AdBrandTopDO {
  /** Best - ROAS - Top 10 */
  bestRoasTop10?: AdDetailDO[];
  /** 花费 - Top 10 */
  costTop10?: AdDetailDO[];
  /** Worst - ROAS - Top 10 */
  worstRoasTop10?: AdDetailDO[];
}

/** AdCategoryAnalysisResp */
export interface AdCategoryAnalysisResp {
  /** 品类数据概览 */
  adCategoryDetailList?: AdDetailDO[];
  code?: string;
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

/** AdCategoryTopDO */
export interface AdCategoryTopDO {
  /** Best - ROAS - Top 10 */
  bestRoasTop10?: AdDetailDO[];
  /** 花费 - Top 10 */
  costTop10?: AdDetailDO[];
  /** Worst - ROAS - Top 10 */
  worstRoasTop10?: AdDetailDO[];
}

/** AdCountryAnalysisResp */
export interface AdCountryAnalysisResp {
  /** 国家数据概览 */
  adCountryDetailList?: AdDetailDO[];
  code?: string;
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

/** AdDetailDO */
export interface AdDetailDO {
  /** 广告成本占比（ACOS） */
  acos?: number;
  /** 广告成本占比环比 */
  acosMom?: number;
  /** 广告成本占比同比 */
  acosYoy?: number;
  /** 广告订单量 */
  adOrderQty?: number;
  /** 广告订单量环比 */
  adOrderQtyMom?: number;
  /** 广告订单量占比 */
  adOrderQtyProp?: number;
  /** 广告订单量占比环比 */
  adOrderQtyPropMom?: number;
  /** 广告订单量占比同比 */
  adOrderQtyPropYoy?: number;
  /** 广告订单量同比 */
  adOrderQtyYoy?: number;
  /** 广告销售额 */
  adSalesAmount?: number;
  /** 广告销售额环比 */
  adSalesAmountMom?: number;
  /** 广告销售额占比 */
  adSalesAmountProp?: number;
  /** 广告销售额占比环比 */
  adSalesAmountPropMom?: number;
  /** 广告销售额占比同比 */
  adSalesAmountPropYoy?: number;
  /** 广告销售额同比 */
  adSalesAmountYoy?: number;
  /** 广告分层 */
  adsLevel?: string;
  /** 广告类型 */
  adsType?: string;
  /** 客单价（ATV） */
  atv?: number;
  /** 客单价环比 */
  atvMom?: number;
  /** 客单价同比 */
  atvYoy?: number;
  /** 品牌 */
  brand?: string;
  /** 广告活动名称 */
  campaignName?: string;
  /** 品类 */
  category?: string;
  /** 四级品类 */
  category4?: string;
  /** 点击量 */
  clicks?: number;
  /** 点击量环比 */
  clicksMom?: number;
  /** 点击量占比 */
  clicksProp?: number;
  /** 点击量同比 */
  clicksYoy?: number;
  /** 广告花费 */
  cost?: number;
  /** 广告花费环比 */
  costMom?: number;
  /** 广告花费占比 */
  costProp?: number;
  /** 广告花费占比环比 */
  costPropMom?: number;
  /** 广告花费占比同比 */
  costPropYoy?: number;
  /** 广告花费同比 */
  costYoy?: number;
  /** 国家编码 */
  countryCode?: string;
  /** 国家 */
  countryName?: string;
  /** 单订单成本（CPA） */
  cpa?: number;
  /** 单订单成本环比 */
  cpaMom?: number;
  /** 单订单成本同比 */
  cpaYoy?: number;
  /** 单次点击成本（CPC） */
  cpc?: number;
  /** 单次点击成本环比 */
  cpcMom?: number;
  /** 单次点击成本同比 */
  cpcYoy?: number;
  /** 千次曝光成本（CPM） */
  cpm?: number;
  /** 千次曝光成本环比 */
  cpmMom?: number;
  /** 千次曝光成本同比 */
  cpmYoy?: number;
  /** 点击率（CTR） */
  ctr?: number;
  /** 点击率环比 */
  ctrMom?: number;
  /** 点击率同比 */
  ctrYoy?: number;
  /** 转化率（CVR） */
  cvr?: number;
  /** 转化率环比 */
  cvrMom?: number;
  /** 转化率同比 */
  cvrYoy?: number;
  /** GTM品线 */
  gtmProductLine?: string;
  /** 图片地址 */
  imgUrl?: string;
  /** 曝光量 */
  impressions?: number;
  /** 曝光量环比 */
  impressionsMom?: number;
  /** 曝光量占比 */
  impressionsProp?: number;
  /** 曝光量同比 */
  impressionsYoy?: number;
  /** 品线 */
  productLine?: string;
  /** 广告投入产出比（ROAS） */
  roas?: number;
  /** 广告投入产出比环比 */
  roasMom?: number;
  /** 广告投入产出比同比 */
  roasYoy?: number;
  /** SPU名称 */
  spuName?: string;
  /** 总订单量 */
  totalOrderQty?: number;
  /** 总订单量环比 */
  totalOrderQtyMom?: number;
  /** 总订单量同比 */
  totalOrderQtyYoy?: number;
  /** 总销售额 */
  totalSalesAmount?: number;
  /** 总销售额环比 */
  totalSalesAmountMom?: number;
  /** 总销售额同比 */
  totalSalesAmountYoy?: number;
}

/** AdNameAnalysisResp */
export interface AdNameAnalysisResp {
  /** 广告活动数据概览 */
  adNameDetailList?: AdDetailDO[];
  code?: string;
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

/** AdQuadrantDetailDO */
export interface AdQuadrantDetailDO {
  /** 广告成本占比（ACOS） */
  acos?: number;
  /** 广告成本占比环比 */
  acosMom?: number;
  /** 广告成本占比同比 */
  acosYoy?: number;
  /** 广告组ID */
  adGroupId?: string;
  /** 广告组名称 */
  adGroupName?: string;
  /** 广告活动ID */
  adId?: string;
  /** 广告活动名称 */
  adName?: string;
  /** 广告订单量 */
  adOrderQty?: number;
  /** 广告订单量环比 */
  adOrderQtyMom?: number;
  /** 广告订单量占比 */
  adOrderQtyProp?: number;
  /** 广告订单量占比环比 */
  adOrderQtyPropMom?: number;
  /** 广告订单量占比同比 */
  adOrderQtyPropYoy?: number;
  /** 广告订单量同比 */
  adOrderQtyYoy?: number;
  /** 广告销售额 */
  adSalesAmount?: number;
  /** 广告销售额环比 */
  adSalesAmountMom?: number;
  /** 广告销售额占比 */
  adSalesAmountProp?: number;
  /** 广告销售额占比环比 */
  adSalesAmountPropMom?: number;
  /** 广告销售额占比同比 */
  adSalesAmountPropYoy?: number;
  /** 广告销售额同比 */
  adSalesAmountYoy?: number;
  /** 客单价（ATV） */
  atv?: number;
  /** 客单价环比 */
  atvMom?: number;
  /** 客单价同比 */
  atvYoy?: number;
  /** 广告系列ID */
  campaignId?: string;
  /** 广告系列名称 */
  campaignName?: string;
  /** 点击量 */
  clicks?: number;
  /** 点击量环比 */
  clicksMom?: number;
  /** 点击量占比 */
  clicksProp?: number;
  /** 点击量同比 */
  clicksYoy?: number;
  /** 广告花费 */
  cost?: number;
  /** 广告花费环比 */
  costMom?: number;
  /** 广告花费占比 */
  costProp?: number;
  /** 广告花费占比环比 */
  costPropMom?: number;
  /** 广告花费占比同比 */
  costPropYoy?: number;
  /** 广告花费同比 */
  costYoy?: number;
  /** 单订单成本（CPA） */
  cpa?: number;
  /** 单订单成本环比 */
  cpaMom?: number;
  /** 单订单成本同比 */
  cpaYoy?: number;
  /** 单次点击成本（CPC） */
  cpc?: number;
  /** 单次点击成本环比 */
  cpcMom?: number;
  /** 单次点击成本同比 */
  cpcYoy?: number;
  /** 千次曝光成本（CPM） */
  cpm?: number;
  /** 千次曝光成本环比 */
  cpmMom?: number;
  /** 千次曝光成本同比 */
  cpmYoy?: number;
  /** 点击率（CTR） */
  ctr?: number;
  /** 点击率环比 */
  ctrMom?: number;
  /** 点击率同比 */
  ctrYoy?: number;
  /** 转化率（CVR） */
  cvr?: number;
  /** 转化率环比 */
  cvrMom?: number;
  /** 转化率同比 */
  cvrYoy?: number;
  /** 曝光量 */
  impressions?: number;
  /** 曝光量环比 */
  impressionsMom?: number;
  /** 曝光量占比 */
  impressionsProp?: number;
  /** 曝光量同比 */
  impressionsYoy?: number;
  /** 点击量中位数 */
  medianClicks?: number;
  /** ROAS中位数 */
  medianRoas?: number;
  /** 象限 */
  quadrant?: string;
  /** 广告投入产出比（ROAS） */
  roas?: number;
  /** 广告投入产出比环比 */
  roasMom?: number;
  /** 广告投入产出比同比 */
  roasYoy?: number;
  /** 总订单量 */
  totalOrderQty?: number;
  /** 总订单量环比 */
  totalOrderQtyMom?: number;
  /** 总订单量同比 */
  totalOrderQtyYoy?: number;
  /** 总销售额 */
  totalSalesAmount?: number;
  /** 总销售额环比 */
  totalSalesAmountMom?: number;
  /** 总销售额同比 */
  totalSalesAmountYoy?: number;
}

/** AdQuadrantTotalDO */
export interface AdQuadrantTotalDO {
  /** 广告成本占比（ACOS） */
  acos?: number;
  /** 广告成本占比环比 */
  acosMom?: number;
  /** 广告成本占比同比 */
  acosYoy?: number;
  /**
   * 投放数量
   * @format int32
   */
  adCount?: number;
  /** 投放数量占比 */
  adCountProp?: number;
  /** 广告订单量 */
  adOrderQty?: number;
  /** 广告订单量环比 */
  adOrderQtyMom?: number;
  /** 广告订单量占比 */
  adOrderQtyProp?: number;
  /** 广告订单量占比环比 */
  adOrderQtyPropMom?: number;
  /** 广告订单量占比同比 */
  adOrderQtyPropYoy?: number;
  /** 广告订单量同比 */
  adOrderQtyYoy?: number;
  /** 广告销售额 */
  adSalesAmount?: number;
  /** 广告销售额环比 */
  adSalesAmountMom?: number;
  /** 广告销售额占比 */
  adSalesAmountProp?: number;
  /** 广告销售额占比环比 */
  adSalesAmountPropMom?: number;
  /** 广告销售额占比同比 */
  adSalesAmountPropYoy?: number;
  /** 广告销售额同比 */
  adSalesAmountYoy?: number;
  /** 客单价（ATV） */
  atv?: number;
  /** 客单价环比 */
  atvMom?: number;
  /** 客单价同比 */
  atvYoy?: number;
  /** 点击量 */
  clicks?: number;
  /** 点击量环比 */
  clicksMom?: number;
  /** 点击量占比 */
  clicksProp?: number;
  /** 点击量同比 */
  clicksYoy?: number;
  /** 广告花费 */
  cost?: number;
  /** 广告花费环比 */
  costMom?: number;
  /** 广告花费占比 */
  costProp?: number;
  /** 广告花费占比环比 */
  costPropMom?: number;
  /** 广告花费占比同比 */
  costPropYoy?: number;
  /** 广告花费同比 */
  costYoy?: number;
  /** 单订单成本（CPA） */
  cpa?: number;
  /** 单订单成本环比 */
  cpaMom?: number;
  /** 单订单成本同比 */
  cpaYoy?: number;
  /** 单次点击成本（CPC） */
  cpc?: number;
  /** 单次点击成本环比 */
  cpcMom?: number;
  /** 单次点击成本同比 */
  cpcYoy?: number;
  /** 千次曝光成本（CPM） */
  cpm?: number;
  /** 千次曝光成本环比 */
  cpmMom?: number;
  /** 千次曝光成本同比 */
  cpmYoy?: number;
  /** 点击率（CTR） */
  ctr?: number;
  /** 点击率环比 */
  ctrMom?: number;
  /** 点击率同比 */
  ctrYoy?: number;
  /** 转化率（CVR） */
  cvr?: number;
  /** 转化率环比 */
  cvrMom?: number;
  /** 转化率同比 */
  cvrYoy?: number;
  /** 曝光量 */
  impressions?: number;
  /** 曝光量环比 */
  impressionsMom?: number;
  /** 曝光量占比 */
  impressionsProp?: number;
  /** 曝光量同比 */
  impressionsYoy?: number;
  /** 点击量中位数 */
  medianClicks?: number;
  /** ROAS中位数 */
  medianRoas?: number;
  /** 象限 */
  quadrant?: string;
  /** 广告投入产出比（ROAS） */
  roas?: number;
  /** 广告投入产出比环比 */
  roasMom?: number;
  /** 广告投入产出比同比 */
  roasYoy?: number;
  /** 总订单量 */
  totalOrderQty?: number;
  /** 总订单量环比 */
  totalOrderQtyMom?: number;
  /** 总订单量同比 */
  totalOrderQtyYoy?: number;
  /** 总销售额 */
  totalSalesAmount?: number;
  /** 总销售额环比 */
  totalSalesAmountMom?: number;
  /** 总销售额同比 */
  totalSalesAmountYoy?: number;
}

/** AdSpuTopDO */
export interface AdSpuTopDO {
  /** Best - ROAS - Top 10 */
  bestRoasTop10?: AdDetailDO[];
  /** 花费 - Top 10 */
  costTop10?: AdDetailDO[];
  /** Worst - ROAS - Top 10 */
  worstRoasTop10?: AdDetailDO[];
}

/** AdsLevelTotalDO */
export interface AdsLevelTotalDO {
  /** 明细 */
  adsLevelList?: AdDetailDO[];
  /** 合计 */
  total?: AdDetailDO;
}

/** AfterSalesAnalysisBean */
export interface AfterSalesAnalysisBean {
  /** 亚马逊售后分析 */
  amazonAfterSalesAnalysis?: AmazonAfterSalesAnalysisBean;
  /** 独立站售后分析 */
  shopifyAfterSalesAnalysis?: OtherAfterSalesAnalysisBean;
  /** Tiktok售后分析 */
  tiktokAfterSalesAnalysis?: OtherAfterSalesAnalysisBean;
}

/** AfterSalesAnalysisResp */
export interface AfterSalesAnalysisResp {
  /** 分析结果 */
  analysisResults?: BiAnalysisResultBean[];
  /** 今年趋势 */
  currentYearTrends?: AfterSalesAnalysisTrendBean[];
  /** 下钻分析 */
  drillDownAnalysis?: AfterSalesDrillDownBean;
  /** 近12个月趋势 */
  last12MonthTrends?: AfterSalesAnalysisTrendBean[];
  /** 去年趋势 */
  lastYearTrends?: AfterSalesAnalysisTrendBean[];
  /** 退款原因 */
  refundReasons?: AfterSalesRefundReasonBean[];
  /** 标签分布 */
  tags?: AfterSalesTagBean[];
}

/** AfterSalesAnalysisTrendBean */
export interface AfterSalesAnalysisTrendBean {
  /** 月份 */
  month?: string;
  /** 退款额 */
  refundAmount?: number;
  /** 退款率 */
  refundAmountRate?: number;
}

/** AfterSalesBean */
export interface AfterSalesBean {
  /** 区域 */
  area?: string;
  /** 品类 */
  category?: string;
  /** 国家 */
  country?: string;
  /**
   * 下钻维度类型。1:BY区域,2:BY国家,3:BY平台,4:BY品类,5:BY SPU
   * @format int32
   */
  dimensionType?: number;
  /** 月份 */
  month?: string;
  /** 退款额 */
  refundAmount?: number;
  /** 退款率 */
  refundAmountRate?: number;
  /** 退款率环比 */
  refundAmountRateMom?: number;
  /** 退款率趋势 */
  refundAmountRateTrend?: number;
  /** 退款率趋势 */
  refundAmountRateTrends?: AfterSalesAnalysisTrendBean[];
  /** 退款率同比 */
  refundAmountRateYoy?: number;
  /** 销售额 */
  salesAmount?: number;
  /** SPU名称 */
  spuName?: string;
}

/** AfterSalesDrillDownBean */
export interface AfterSalesDrillDownBean {
  /** BY品类 */
  drillDownByCategory?: AfterSalesBean[];
  /** 合计 */
  drillDownTotal?: AfterSalesBean;
}

/** AfterSalesRefundReasonBean */
export interface AfterSalesRefundReasonBean {
  /** 月份 */
  month?: string;
  /**
   * 订单数量
   * @format int32
   */
  orderCount?: number;
  /** 退款数量占比 */
  orderCountRate?: number;
  /** 退款原因 */
  refundReason?: string;
  /** SPU名称 */
  spuName?: string;
}

/** AfterSalesTagBean */
export interface AfterSalesTagBean {
  /** 月份 */
  month?: string;
  /**
   * 负面数量
   * @format int32
   */
  negativeCount?: number;
  /**
   * 正面数量
   * @format int32
   */
  positiveCount?: number;
  /** SPU名称 */
  spuName?: string;
  /** 标签 */
  tag?: string;
}

/** AmazonAdAnalysisBean */
export interface AmazonAdAnalysisBean {
  /** 广告花费 */
  adCost?: number;
  /** 广告花费环比 */
  adCostMom?: number;
  /** 广告费率 */
  adCostRate?: number;
  /** 广告费率环比 */
  adCostRateMom?: number;
  /** 广告费率同比 */
  adCostRateYoy?: number;
  /** 广告花费同比 */
  adCostYoy?: number;
  /** 广告销售额 */
  adSalesAmount?: number;
  /** 广告销售额环比 */
  adSalesAmountMom?: number;
  /** 广告销售额同比 */
  adSalesAmountYoy?: number;
  /** CPC点击成本 */
  cpc?: number;
  /** CPC环比 */
  cpcMom?: number;
  /** CPC同比 */
  cpcYoy?: number;
  /** ROAS广告投资回报率 */
  roas?: number;
  /** ROAS环比 */
  roasMom?: number;
  /** ROAS同比 */
  roasYoy?: number;
}

/** AmazonAfterSalesAnalysisBean */
export interface AmazonAfterSalesAnalysisBean {
  /**
   * 中差评数
   * @format int64
   */
  negativeReviewCount?: number;
  /** 中差评数环比 */
  negativeReviewCountMom?: number;
  /** 中差评数同比 */
  negativeReviewCountYoy?: number;
  /**
   * 好评数
   * @format int64
   */
  positiveReviewCount?: number;
  /** 好评数环比 */
  positiveReviewCountMom?: number;
  /** 好评数同比 */
  positiveReviewCountYoy?: number;
  /**
   * 退货量
   * @format int64
   */
  returnQuantity?: number;
  /** 退货量环比 */
  returnQuantityMom?: number;
  /** 退货量同比 */
  returnQuantityYoy?: number;
  /** 退货率 */
  returnRate?: number;
  /** 退货率环比 */
  returnRateMom?: number;
  /** 退货率同比 */
  returnRateYoy?: number;
  /**
   * 评论数
   * @format int64
   */
  reviewCount?: number;
  /** 评论数环比 */
  reviewCountMom?: number;
  /** 评论数同比 */
  reviewCountYoy?: number;
  /** 留评率 */
  reviewRate?: number;
  /** 留评率环比 */
  reviewRateMom?: number;
  /** 留评率同比 */
  reviewRateYoy?: number;
  /** Review星级统计 */
  reviewStarStatList?: ReviewStarStatBean[];
  /** Review类型统计 */
  reviewTypeStatList?: ReviewTypeStatBean[];
  /** 标签词云 */
  tagCloudList?: TagCloudBean[];
}

/** AmazonTrafficAnalysisBean */
export interface AmazonTrafficAnalysisBean {
  /** 点击量 */
  clickCount?: number;
  /** 点击量环比 */
  clickCountMom?: number;
  /** 点击量同比 */
  clickCountYoy?: number;
  /** 点击率-亚马逊 */
  clickRateAmazon?: number;
  /** 点击率-亚马逊环比 */
  clickRateAmazonMom?: number;
  /** 点击率-亚马逊同比 */
  clickRateAmazonYoy?: number;
  /** 转化率 */
  conversionRate?: number;
  /** 转化率环比 */
  conversionRateMom?: number;
  /** 转化率同比 */
  conversionRateYoy?: number;
  /** 曝光量-亚马逊 */
  impressionsCount?: number;
  /** 曝光量-亚马逊环比 */
  impressionsCountMom?: number;
  /** 曝光量-亚马逊同比 */
  impressionsCountYoy?: number;
  /** 页面浏览量环比 */
  pageViewsMom?: number;
  /** 页面浏览量同比 */
  pageViewsYoy?: number;
  /** 会话数环比 */
  sessionsMom?: number;
  /** 会话数同比 */
  sessionsYoy?: number;
  /** 总页面浏览量 */
  totalPageViews?: number;
  /** 总会话数 */
  totalSessions?: number;
}

/** AmountBean */
export interface AmountBean {
  /** 金额 */
  amount?: number;
  /** 目标 */
  budget?: number;
  /** 达成率 */
  completionRate?: number;
  /** 差值 */
  diff?: number;
  /** 健康度 */
  healthLevel?: string;
  /** 月环比 */
  monthlyGrowth?: number;
  /** 趋势 */
  trendList?: TrendBean[];
  /** 年同比 */
  yearlyGrowth?: number;
}

/** AnalysisResultResp */
export interface AnalysisResultResp {
  /** 分析结果 */
  analysisResult?: BiAnalysisResultBean;
  /** 跳转URL */
  singleUrl?: string;
}

/** AreaCountryBean */
export interface AreaCountryBean {
  area?: string;
  countryList?: string[];
  salesAmount?: number;
}

/** AreaProportionBean */
export interface AreaProportionBean {
  /** 区域 */
  area?: string;
  /** 毛利额 */
  grossProfitAmount?: number;
  /** 毛利额占比 */
  grossProfitAmountRate?: number;
  /** 销售额 */
  salesAmount?: number;
  /** 销售额占比 */
  salesAmountRate?: number;
}

/** AreaSaleDO */
export interface AreaSaleDO {
  /** 区域 */
  area?: string;
  /** 目标销售额 */
  budgetSalesAmount?: number;
  /** 渠道 */
  channel?: string;
  /** 平台 */
  platform?: string;
  /**
   * 销量
   * @format int32
   */
  saleQty?: number;
  /** 销售额 */
  salesAmount?: number;
  /** 销售额达成率 */
  salesAmountCompletionRate?: number;
  /** 销售额同期 */
  salesAmountY?: number;
  /** 销售额同比 */
  salesAmountYoy?: number;
}

/** AreaSalesAnalysisBean */
export interface AreaSalesAnalysisBean {
  /** 广告花费 */
  adCost?: number;
  /** 区域 */
  area?: string;
  /** 国家 */
  country?: string;
  /**
   * 销量
   * @format int64
   */
  saleQty?: number;
  /** 销量占比 */
  saleQtyProp?: number;
  /** 销售额 */
  salesAmount?: number;
  /** 销售额占比 */
  salesAmountProp?: number;
  /** SPU图片 */
  spuImg?: string;
  /** SPU名称 */
  spuName?: string;
}

/** AverageOrderAmountTrendBean */
export interface AverageOrderAmountTrendBean {
  /** 客单价 */
  averageOrderAmount?: number;
  /** 月份 */
  month?: string;
  /** 销量 */
  totalOrders?: number;
}

/** AverageOrderAmountTrendResp */
export interface AverageOrderAmountTrendResp {
  /** 客单价 */
  averageOrderAmountTrends?: AverageOrderAmountTrendBean[];
}

/** BaseVocQueryReq */
export interface BaseVocQueryReq {
  /** 区域权限 */
  areaPermissionList?: string[];
  /** 三级类目 */
  categoryNameLevel3List?: string[];
  /** 品类权限 */
  categoryPermissionList?: string[];
  controlPermission?: boolean;
  /** 国家 */
  countryList?: string[];
  /** 国家权限 */
  countryPermissionList?: string[];
  dataCaliber?: string[];
  /** VOC来源 */
  dataSourceList?: string[];
  /** 产品经理权限 */
  developerNamePermissionList?: string[];
  /** 权限组 */
  dpGroupCodeList?: string[];
  /** GTM组权限 */
  gtmProductLinePermissionList?: string[];
  /** 指标类型 1：VOC量 2：VOC率 3：年累计VOC率 */
  metricType?: string;
  /** 月（格式：2025-11） */
  monthList?: string[];
  /** 统计周期类型: week/month */
  periodType?: string;
  /** 平台 */
  platformList?: string[];
  /** 平台权限 */
  platformPermissionList?: string[];
  /** 产品品线 */
  productLine?: string;
  /** 产品品线 */
  productLineList?: string[];
  /** GTM组 */
  productLineMarketGroupList?: string[];
  /** 产品品线权限 */
  productLinePermissionList?: string[];
  /** 店铺权限 */
  shopPermissionList?: string[];
  /** spu */
  spuCode?: string[];
  /** SPU名称 */
  spuNameList?: string[];
  /**
   * 选中的标签层级：2：二级；3：三级；4：四级
   * @format int32
   */
  vocLevel?: number;
  /** 一级标签列表 */
  vocLevel1List?: string[];
  /** 二级标签列表 */
  vocLevel2List?: string[];
  /** 三级标签列表 */
  vocLevel3List?: string[];
  /** 四级标签列表 */
  vocLevel4List?: string[];
  /** 选中的核心指标类型（客服工单/退货留言/商品评论） */
  vocType?: string;
  /** VOC类型 */
  vocTypeList?: string[];
  /** 周（格式：202517） */
  weekList?: string[];
}

/** BiAnalysisResultBean */
export interface BiAnalysisResultBean {
  /** 分析结果 */
  analysisResult?: string;
  /** 分析类型 */
  analysisType?: string;
  /** 分析人头像 */
  avatar?: string;
  /** 条件键 */
  conditionKey?: string;
  /** 是否可编辑 */
  editable?: boolean;
  /** 分析人编码 */
  memberCode?: string;
  /** 月份 */
  month?: string;
  /** 分析人 */
  name?: string;
  /** BI页面 */
  page?: string;
  /** 结果文本类型 */
  resultTextType?: string;
  /** 分析人部门 */
  rootDeptName?: string;
  /** 分析人岗位名称 */
  title?: string;
}

/** BiDimension */
export interface BiDimension {
  /** @format date-time */
  createTime?: string;
  defaultValue?: string;
  dimension?: string;
  dimensionAlias?: string;
  dimensionName?: string;
  dimensionPermissionMapping?: string;
  /** @format int64 */
  id?: number;
  /** @format int32 */
  orderBy?: number;
  queryDimension?: string;
  relatedDimensionTable?: string;
  relatedDimensionTableField?: string;
  relatedDimensionTableQueryField?: string;
  relatedDimensionTableRelatedField?: string;
  table?: string;
  tableName?: string;
  timeDimensionType?: string;
  /** @format date-time */
  updateTime?: string;
}

/** BiDimensionAddReq */
export interface BiDimensionAddReq {
  /** 默认条件 */
  defaultValue?: string;
  /** 维度 */
  dimension: string;
  /** 维度别名 */
  dimensionAlias?: string;
  /** 维度名称 */
  dimensionName: string;
  /** 维度权限映射 */
  dimensionPermissionMapping?: string;
  /**
   * 排序字段
   * @format int32
   */
  orderBy?: number;
  /** 实际查询的维度 */
  queryDimension?: string;
  /** 关联维度表 */
  relatedDimensionTable?: string;
  /** 关联维度表结果字段 */
  relatedDimensionTableField?: string;
  /** 关联维度表查询字段 */
  relatedDimensionTableQueryField?: string;
  /** 关联维度表关联字段 */
  relatedDimensionTableRelatedField?: string;
  /** 表 */
  table: string;
  /** 表名 */
  tableName?: string;
  /** 时间维度类型：YEAR-年, MONTH-月, WEEK-周, DAY-日, NULL-非时间维度 */
  timeDimensionType?: string;
}

/** BiDimensionListReq */
export interface BiDimensionListReq {
  /** 搜索关键词（维度、维度名称） */
  keyword?: string;
  /** 表名（必填） */
  table?: string;
}

/** BiDimensionUpdateReq */
export interface BiDimensionUpdateReq {
  /** 默认条件 */
  defaultValue?: string;
  /** 维度 */
  dimension: string;
  /** 维度别名 */
  dimensionAlias?: string;
  /** 维度名称 */
  dimensionName: string;
  /** 维度权限映射 */
  dimensionPermissionMapping?: string;
  /**
   * ID
   * @format int64
   */
  id: number;
  /**
   * 排序字段
   * @format int32
   */
  orderBy?: number;
  /** 实际查询的维度 */
  queryDimension?: string;
  /** 关联维度表 */
  relatedDimensionTable?: string;
  /** 关联维度表结果字段 */
  relatedDimensionTableField?: string;
  /** 关联维度表查询字段 */
  relatedDimensionTableQueryField?: string;
  /** 关联维度表关联字段 */
  relatedDimensionTableRelatedField?: string;
  /** 表 */
  table: string;
  /** 表名 */
  tableName?: string;
  /** 时间维度类型：YEAR-年, MONTH-月, WEEK-周, DAY-日, NULL-非时间维度 */
  timeDimensionType?: string;
}

/** BiMetric */
export interface BiMetric {
  /** @format int32 */
  calculateMom?: number;
  /** @format int32 */
  calculateYoy?: number;
  /** @format date-time */
  createTime?: string;
  /** @format int64 */
  id?: number;
  metric?: string;
  metricAlias?: string;
  metricCalculate?: string;
  metricDesc?: string;
  metricName?: string;
  table?: string;
  tableName?: string;
  /** @format date-time */
  updateTime?: string;
}

/** BiMetricAddReq */
export interface BiMetricAddReq {
  /**
   * 是否计算环比：0-否，1-是，默认1
   * @format int32
   */
  calculateMom?: number;
  /**
   * 是否计算同比：0-否，1-是，默认1
   * @format int32
   */
  calculateYoy?: number;
  /** 指标 */
  metric: string;
  /** 指标别名 */
  metricAlias?: string;
  /** 指标计算方式 */
  metricCalculate: string;
  /** 指标描述 */
  metricDesc?: string;
  /** 指标名称 */
  metricName: string;
  /** 表 */
  table: string;
  /** 表名 */
  tableName?: string;
}

/** BiMetricListReq */
export interface BiMetricListReq {
  /** 搜索关键词（指标、指标名称） */
  keyword?: string;
  /** 表名（必填） */
  table?: string;
}

/** BiMetricUpdateReq */
export interface BiMetricUpdateReq {
  /**
   * 是否计算环比：0-否，1-是
   * @format int32
   */
  calculateMom?: number;
  /**
   * 是否计算同比：0-否，1-是
   * @format int32
   */
  calculateYoy?: number;
  /**
   * ID
   * @format int64
   */
  id: number;
  /** 指标 */
  metric: string;
  /** 指标别名 */
  metricAlias?: string;
  /** 指标计算方式 */
  metricCalculate: string;
  /** 指标描述 */
  metricDesc?: string;
  /** 指标名称 */
  metricName: string;
  /** 表 */
  table: string;
  /** 表名 */
  tableName?: string;
}

/** BiReport */
export interface BiReport {
  /** @format date-time */
  createTime?: string;
  /** @format int64 */
  id?: number;
  menuCode?: string;
  reportCode?: string;
  reportDesc?: string;
  reportName?: string;
  /** @format date-time */
  updateTime?: string;
}

/** BiReportAddReq */
export interface BiReportAddReq {
  /** 所属菜单编码 */
  menuCode?: string;
  /** 看板编码 */
  reportCode: string;
  /** 看板描述 */
  reportDesc?: string;
  /** 看板名称 */
  reportName: string;
}

/** BiReportConfig */
export interface BiReportConfig {
  configCode?: string;
  configDay?: string;
  configDesc?: string;
  configMonth?: string;
  configQuarter?: string;
  configWeek?: string;
  configYear?: string;
  /** @format date-time */
  createTime?: string;
  /** @format int64 */
  id?: number;
  reportCode?: string;
  /** @format date-time */
  updateTime?: string;
}

/** BiReportConfigAddReq */
export interface BiReportConfigAddReq {
  /** 配置编码 */
  configCode: string;
  /** 日查询配置JSON */
  configDay?: string;
  /** 配置描述 */
  configDesc?: string;
  /** 月查询配置JSON */
  configMonth?: string;
  /** 季查询配置JSON */
  configQuarter?: string;
  /** 周查询配置JSON */
  configWeek?: string;
  /** 年查询配置JSON */
  configYear?: string;
  /** 看板编码 */
  reportCode: string;
}

/** BiReportConfigListReq */
export interface BiReportConfigListReq {
  /** 搜索关键词（配置编码） */
  keyword?: string;
  /** 看板编码（必填） */
  reportCode?: string;
}

/** BiReportConfigUpdateReq */
export interface BiReportConfigUpdateReq {
  /** 配置编码 */
  configCode: string;
  /** 日查询配置JSON */
  configDay?: string;
  /** 配置描述 */
  configDesc?: string;
  /** 月查询配置JSON */
  configMonth?: string;
  /** 季查询配置JSON */
  configQuarter?: string;
  /** 周查询配置JSON */
  configWeek?: string;
  /** 年查询配置JSON */
  configYear?: string;
  /**
   * ID
   * @format int64
   */
  id: number;
  /** 看板编码 */
  reportCode: string;
}

/** BiReportDimension */
export interface BiReportDimension {
  /** @format date-time */
  createTime?: string;
  dimension?: string;
  /** @format int64 */
  id?: number;
  reportCode?: string;
  /** @format date-time */
  updateTime?: string;
}

/** BiReportDimensionAddReq */
export interface BiReportDimensionAddReq {
  /** 查询维度 */
  dimension: string;
  /** 看板编码 */
  reportCode: string;
}

/** BiReportDimensionListReq */
export interface BiReportDimensionListReq {
  /** 搜索关键词（查询维度） */
  keyword?: string;
  /** 看板编码（必填） */
  reportCode?: string;
}

/** BiReportDimensionUpdateReq */
export interface BiReportDimensionUpdateReq {
  /** 查询维度 */
  dimension: string;
  /**
   * ID
   * @format int64
   */
  id: number;
  /** 看板编码 */
  reportCode: string;
}

/** BiReportListReq */
export interface BiReportListReq {
  /** 搜索关键词（看板编码、看板名称） */
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
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
}

/** BiReportListResp */
export interface BiReportListResp {
  code?: string;
  /** 看板列表 */
  list?: BiReport[];
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

/** BiReportUpdateReq */
export interface BiReportUpdateReq {
  /**
   * ID
   * @format int64
   */
  id: number;
  /** 所属菜单编码 */
  menuCode?: string;
  /** 看板编码 */
  reportCode: string;
  /** 看板描述 */
  reportDesc?: string;
  /** 看板名称 */
  reportName: string;
}

/** BiTable */
export interface BiTable {
  /** @format date-time */
  createTime?: string;
  /** @format int64 */
  id?: number;
  table?: string;
  tableDesc?: string;
  tableName?: string;
  /** @format date-time */
  updateTime?: string;
}

/** BiTableAddReq */
export interface BiTableAddReq {
  /** 表 */
  table: string;
  /** 表描述 */
  tableDesc?: string;
  /** 表名 */
  tableName: string;
}

/** BiTableListReq */
export interface BiTableListReq {
  /** 搜索关键词（表名、表描述） */
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
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
}

/** BiTableListResp */
export interface BiTableListResp {
  code?: string;
  /** 数据表列表 */
  list?: BiTable[];
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

/** BiTableUpdateReq */
export interface BiTableUpdateReq {
  /**
   * ID
   * @format int64
   */
  id: number;
  /** 表 */
  table: string;
  /** 表描述 */
  tableDesc?: string;
  /** 表名 */
  tableName: string;
}

/** BrandAnalysisBean */
export interface BrandAnalysisBean {
  /** 区域 */
  area?: string;
  /**
   * 品牌声量数
   * @format int32
   */
  brandVoiceCount?: number;
  /** 国家 */
  country?: string;
  /**
   * 新增注册用户数
   * @format int32
   */
  customerCount?: number;
  /**
   * 下钻维度类型。1:BY区域,2:BY国家,3:BY平台,4:BY品类,5:BY SPU
   * @format int32
   */
  dimensionType?: number;
  /** 月份 */
  month?: string;
  /**
   * 购买用户数
   * @format int32
   */
  purchaseCustomerCount?: number;
  /** 复购率 */
  repurchaseRate?: number;
}

/** BrandAnalysisDrillDownBean */
export interface BrandAnalysisDrillDownBean {
  /** BY区域 */
  drillDownByArea?: BrandAnalysisBean[];
  /** 合计 */
  drillDownTotal?: BrandAnalysisBean;
}

/** BrandAnalysisResp */
export interface BrandAnalysisResp {
  /** 分析结果 */
  analysisResults?: BiAnalysisResultBean[];
  /** 品牌声量今年趋势 */
  brandVoiceCurrentYearTrends?: BrandAnalysisTrendBean[];
  /** 品牌声量近12个月趋势 */
  brandVoiceLast12MonthTrends?: BrandAnalysisTrendBean[];
  /** 品牌声量去年趋势 */
  brandVoiceLastYearTrends?: BrandAnalysisTrendBean[];
  /** 品牌注册用户数今年趋势 */
  customerCountCurrentYearTrends?: BrandAnalysisTrendBean[];
  /** 品牌注册用户数近12个月趋势 */
  customerCountLast12MonthTrends?: BrandAnalysisTrendBean[];
  /** 品牌注册用户数去年趋势 */
  customerCountLastYearTrends?: BrandAnalysisTrendBean[];
  /** 下钻分析 */
  drillDownAnalysis?: BrandAnalysisDrillDownBean;
  /** 独立站购买用户数及复购率近12个月趋势 */
  purchaseLast12MonthTrends?: BrandAnalysisTrendBean[];
}

/** BrandAnalysisTrendBean */
export interface BrandAnalysisTrendBean {
  /**
   * 数量
   * @format int32
   */
  count?: number;
  /** 月份 */
  month?: string;
  /** 比率 */
  rate?: number;
}

/** BrandReturnRateBean */
export interface BrandReturnRateBean {
  /** 品牌 */
  brand?: string;
  /** 月份 */
  month?: string;
  /** 退货率 */
  returnRate?: number;
  /** 销量 */
  saleQty?: number;
}

/** Category */
export interface Category {
  categoryNameLevel3?: string;
  categoryNameLevel4List?: Category4[];
}

/** Category4 */
export interface Category4 {
  categoryNameLevel4?: string;
  categoryNameLevel5List?: string[];
}

/** CategoryProportionBean */
export interface CategoryProportionBean {
  /** 品类 */
  category?: string;
  /** 毛利额 */
  grossProfitAmount?: number;
  /** 毛利额占比 */
  grossProfitAmountRate?: number;
  /** 销售额 */
  salesAmount?: number;
  /** 销售额占比 */
  salesAmountRate?: number;
}

/** ClicksScopeSaveReq */
export interface ClicksScopeSaveReq {
  /**
   * 点击量结束值
   * @format int64
   */
  clicksEnd?: number;
  /**
   * 点击量开始值
   * @format int64
   */
  clicksStart?: number;
}

/** CommonAnalysisPageReq */
export interface CommonAnalysisPageReq {
  /** 广告类型 */
  adsType?: string;
  analysisType?: string;
  /** 区域 */
  area?: string;
  /** 区域 */
  areaList?: string[];
  /** 区域权限 */
  areaPermissionList?: string[];
  /** 品牌 */
  brandList?: string[];
  /** 品类 */
  category?: string;
  /** 三级类目 */
  category3List?: string[];
  /** 四级品类 */
  category4?: string;
  /** 四级类目 */
  category4List?: string[];
  /** 品类 */
  categoryList?: string[];
  /** 三级分类 */
  categoryNameLevel3List?: string[];
  /** 四级分类 */
  categoryNameLevel4List?: string[];
  /** 五级分类 */
  categoryNameLevel5List?: string[];
  /** 品类权限 */
  categoryPermissionList?: string[];
  /** 渠道 */
  channelList?: string[];
  conditionKey?: string;
  conditionKeyList?: string[];
  controlPermission?: boolean;
  /** 国家 */
  country?: string;
  /** 国家 */
  countryList?: string[];
  /** 国家权限 */
  countryPermissionList?: string[];
  /** 币种 */
  currencyCode?: string;
  /** @format int32 */
  dataSourceFlag?: number;
  /** VOC一级数据来源 */
  dataSourceList?: string[];
  /** VOC二级数据来源 */
  dataSourcePlatformList?: string[];
  /** VOC三级数据来源 */
  dataTypeList?: string[];
  /** 日期 */
  date?: string;
  /** 日期类型:month/week/year */
  dateType?: string;
  /** 产品经理 */
  developerNameList?: string[];
  /** 产品经理权限 */
  developerNamePermissionList?: string[];
  /** 下钻维度列表 */
  dimensionList?: Dimension[];
  /**
   * 下钻维度类型。1:BY区域,2:BY国家,3:BY平台,4:BY品类,5:BY SPU
   * @format int32
   */
  dimensionType?: number;
  /** 权限组 */
  dpGroupCodeList?: string[];
  /** 结束日期 */
  endDate?: string;
  /** 结束月份 */
  endMonth?: string;
  /** 结束周 */
  endWeek?: string;
  /**
   * 结束年
   * @format int32
   */
  endYear?: number;
  /** GTM组 */
  gtmProductLineList?: string[];
  /** GTM组权限 */
  gtmProductLinePermissionList?: string[];
  /**
   * 核心指标截止日期
   * @format date
   */
  lastDate?: string;
  /** 核心指标截止月份 */
  lastMonth?: string;
  /** 一级标签 */
  level1?: string;
  /** 一级标签 */
  level1List?: string[];
  /** 一级标签 */
  level2?: string;
  /** 二级标签 */
  level2List?: string[];
  /** @format int32 */
  limit?: number;
  /** 是否展示市占 */
  marketShare?: boolean;
  /** 月 */
  month?: string;
  /** @format int32 */
  monthMarketShareFlag?: number;
  monthStr?: string;
  /** @format int32 */
  onlyCurrMonth?: number;
  orderByColumn?: string;
  page?: string;
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
  /** 平台 */
  platform?: string;
  /** 平台 */
  platformList?: string[];
  /** 平台权限 */
  platformPermissionList?: string[];
  /** 产品品线 */
  productLineList?: string[];
  /** GTM组 */
  productLineMarketGroupList?: string[];
  /** GTM经理 */
  productLineMarketNameList?: string[];
  /** 产品品线权限 */
  productLinePermissionList?: string[];
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 是否展示退货率 */
  refundAmountRate?: boolean;
  /** 店铺 */
  shopList?: string[];
  /** 店铺权限 */
  shopPermissionList?: string[];
  /** 产品经理 */
  skuDeveloperNameList?: string[];
  /** 客服型号 */
  skuModelNameVocList?: string[];
  /** 是否AIOT产品 */
  spuAiotTag?: string;
  /** SPU编码 */
  spuCodeList?: string[];
  /** SPU名称 */
  spuName?: string;
  /** SPU名称 */
  spuNameList?: string[];
  /** 产品分类：新品/老品 */
  spuNewProductTag?: string;
  /** SPU状态 */
  spuStatusList?: string[];
  /** 开始日期 */
  startDate?: string;
  /** 开始月份 */
  startMonth?: string;
  /** 开始周 */
  startWeek?: string;
  /**
   * 开始年
   * @format int32
   */
  startYear?: number;
  /** 周 */
  week?: string;
  /** 年 */
  year?: string;
}

/** CommonAnalysisReq */
export interface CommonAnalysisReq {
  /** 广告类型 */
  adsType?: string;
  analysisType?: string;
  /** 区域 */
  area?: string;
  /** 区域 */
  areaList?: string[];
  /** 区域权限 */
  areaPermissionList?: string[];
  /** 品牌 */
  brandList?: string[];
  /** 品类 */
  category?: string;
  /** 三级类目 */
  category3List?: string[];
  /** 四级品类 */
  category4?: string;
  /** 四级类目 */
  category4List?: string[];
  /** 品类 */
  categoryList?: string[];
  /** 三级分类 */
  categoryNameLevel3List?: string[];
  /** 四级分类 */
  categoryNameLevel4List?: string[];
  /** 五级分类 */
  categoryNameLevel5List?: string[];
  /** 品类权限 */
  categoryPermissionList?: string[];
  /** 渠道 */
  channel?: string;
  /** 渠道 */
  channelList?: string[];
  /**
   * 点击量结束值
   * @format int64
   */
  clicksEnd?: number;
  /**
   * 点击量开始值
   * @format int64
   */
  clicksStart?: number;
  conditionKey?: string;
  conditionKeyList?: string[];
  controlPermission?: boolean;
  /** 国家 */
  country?: string;
  /** 国家 */
  countryList?: string[];
  /** 国家权限 */
  countryPermissionList?: string[];
  /** 币种 */
  currencyCode?: string;
  /** @format int32 */
  dataSourceFlag?: number;
  /** VOC一级数据来源 */
  dataSourceList?: string[];
  /** VOC二级数据来源 */
  dataSourcePlatformList?: string[];
  /** VOC三级数据来源 */
  dataTypeList?: string[];
  /** 日期 */
  date?: string;
  /** 日期类型:month/week/year */
  dateType?: string;
  /** 产品经理 */
  developerNameList?: string[];
  /** 产品经理权限 */
  developerNamePermissionList?: string[];
  /** 下钻维度列表 */
  dimensionList?: Dimension[];
  /**
   * 下钻维度类型。1:BY区域,2:BY国家,3:BY平台,4:BY品类,5:BY SPU,6:BY 品线
   * @format int32
   */
  dimensionType?: number;
  /** 权限组 */
  dpGroupCodeList?: string[];
  /** 结束日期 */
  endDate?: string;
  /** 结束月份 */
  endMonth?: string;
  /** 结束周 */
  endWeek?: string;
  /**
   * 结束年
   * @format int32
   */
  endYear?: number;
  /** GTM组 */
  gtmProductLineList?: string[];
  /** GTM组权限 */
  gtmProductLinePermissionList?: string[];
  /**
   * 核心指标截止日期
   * @format date
   */
  lastDate?: string;
  /** 核心指标截止月份 */
  lastMonth?: string;
  /** 一级标签 */
  level1?: string;
  /** 一级标签 */
  level1List?: string[];
  /** 一级标签 */
  level2?: string;
  /** 二级标签 */
  level2List?: string[];
  /** @format int32 */
  limit?: number;
  /** 是否展示市占 */
  marketShare?: boolean;
  /** 指标类型 1：VOC量/退货量 2：VOC率/退货率 3：年累计VOC率/年累退货率 4：年累VOC量/年累退货量 */
  metricType?: string;
  /** 月 */
  month?: string;
  /** @format int32 */
  monthMarketShareFlag?: number;
  monthStr?: string;
  /** @format int32 */
  onlyCurrMonth?: number;
  orderByColumn?: string;
  page?: string;
  /** 周期（日、周、月、年） */
  period?: string;
  /** 周期结束 */
  periodEnd?: string;
  /** 上期结束 */
  periodEndM?: string;
  /** 同期结束 */
  periodEndY?: string;
  /** 上期 */
  periodM?: string;
  /** 周期开始 */
  periodStart?: string;
  /** 上期开始 */
  periodStartM?: string;
  /** 同期开始 */
  periodStartY?: string;
  /** 同期 */
  periodY?: string;
  /** 平台 */
  platform?: string;
  /** 平台 */
  platformList?: string[];
  /** 平台权限 */
  platformPermissionList?: string[];
  /** 产品品线 */
  productLineList?: string[];
  /** GTM组 */
  productLineMarketGroupList?: string[];
  /** GTM经理 */
  productLineMarketNameList?: string[];
  /** 产品品线权限 */
  productLinePermissionList?: string[];
  /** 是否展示退货率 */
  refundAmountRate?: boolean;
  /** 店铺 */
  shopList?: string[];
  /** 店铺权限 */
  shopPermissionList?: string[];
  /** 产品经理 */
  skuDeveloperNameList?: string[];
  /** 客服型号 */
  skuModelNameVocList?: string[];
  /**
   * 跨度
   * @format int64
   */
  span?: number;
  /** 是否AIOT产品 */
  spuAiotTag?: string;
  /** SPU编码 */
  spuCodeList?: string[];
  /** SPU名称 */
  spuName?: string;
  /** SPU名称 */
  spuNameList?: string[];
  /** 产品分类：新品/老品 */
  spuNewProductTag?: string;
  /** SPU状态 */
  spuStatusList?: string[];
  /** 开始日期 */
  startDate?: string;
  /** 开始月份 */
  startMonth?: string;
  /** 起始价格 */
  startPrice?: number;
  /** 开始周 */
  startWeek?: string;
  /**
   * 开始年
   * @format int32
   */
  startYear?: number;
  /** 周 */
  week?: string;
  /** 年 */
  year?: string;
}

/** CommonReq */
export interface CommonReq {
  /** 区域集合 */
  areaList?: string[];
  /** 区域权限 */
  areaPermissionList?: string[];
  /** 品类 */
  category?: string;
  /** 品类集合 */
  categoryList?: string[];
  /** 品类权限 */
  categoryPermissionList?: string[];
  /** 渠道集合 */
  channelList?: string[];
  /** 看板页面配置编码 */
  configCode?: string;
  controlPermission?: boolean;
  /** 国家集合 */
  countryList?: string[];
  /** 国家权限 */
  countryPermissionList?: string[];
  /** 日期类型:day/week/month/quarter/year */
  dateType?: string;
  /** 产品经理权限 */
  developerNamePermissionList?: string[];
  /** 权限组 */
  dpGroupCodeList?: string[];
  /** GTM组集合 */
  gtmProductLineList?: string[];
  /** GTM组权限 */
  gtmProductLinePermissionList?: string[];
  /**
   * 查询前N条数据
   * @format int32
   */
  limit?: number;
  /** 周期（日（yyyy-MM-dd）、周（yyyyWeekXX）、月（yyyy-MM）、季（yyyyQQ）、年（yyyy）） */
  period?: string;
  /** 周期结束 */
  periodEnd?: string;
  /** 上期结束 */
  periodEndM?: string;
  /** 同期结束 */
  periodEndY?: string;
  /** 上期 */
  periodM?: string;
  /** 周期开始 */
  periodStart?: string;
  /** 上期开始 */
  periodStartM?: string;
  /** 同期开始 */
  periodStartY?: string;
  /** 同期 */
  periodY?: string;
  /** 平台集合 */
  platformList?: string[];
  /** 平台权限 */
  platformPermissionList?: string[];
  /** 产品品线集合 */
  productLineList?: string[];
  /** 产品品线权限 */
  productLinePermissionList?: string[];
  /** 看板编码 */
  reportCode?: string;
  /** 店铺权限 */
  shopPermissionList?: string[];
  /** 排序条件 */
  sorts?: SortCondition[];
  /**
   * 趋势周期数量
   * @format int32
   */
  trendCount?: number;
}

/** CompetitiveInsightResp */
export interface CompetitiveInsightResp {
  /** 区域业绩对比 */
  areaBrandMap?: Record<string, MarketBrandDO[]>;
  /** 品牌对比预览 */
  brandList?: MarketBrandDO[];
  /** 推广分析 - 社媒 */
  brandMediaMap?: Record<string, MarketBrandMediaDO[]>;
  /** 价格带分析 */
  brandPriceMap?: Record<string, MarketBrandPriceDO[]>;
  /** 商品排行对比 */
  brandProductRankList?: MarketBrandProductDO[];
  /** 品牌对比趋势 */
  brandTrendMap?: Record<string, MarketBrandTrendDO[]>;
  /** 美元价格带分析 */
  brandUsdPriceMap?: Record<string, MarketBrandPriceDO[]>;
  /** 国家业绩对比 */
  countryBrandMap?: Record<string, MarketBrandDO[]>;
  /** 枚举 */
  enumsResp?: EnumsResp;
  /** 价格带配置 */
  priceConfigList?: MarketPriceConfigBean[];
}

/** ConversionFunnelBean */
export interface ConversionFunnelBean {
  /** 添加购物车 */
  addToCartSession?: number;
  /** 加购 - 支付比例 */
  addToCartToCompletedPaymentRate?: number;
  /** 完成支付 */
  completedPaymentSession?: number;
  /** 总转化率 */
  conversionRate?: number;
  /** 访问人数 */
  visitSession?: string;
  /** 访问 - 加购比例 */
  visitToAddToCartRate?: number;
}

/** CoreIndicatorBean */
export interface CoreIndicatorBean {
  /** 广告推广费率 */
  adCostRate?: RateBean;
  /** 客单价 */
  averageOrderAmount?: AmountBean;
  /** 成交均价 */
  avgSalesAmount?: AmountBean;
  /** 品牌声量 */
  brandVoiceCount?: CountBean;
  /** 客户数 */
  customerCount?: CountBean;
  /** 折扣率 */
  discountRate?: RateBean;
  /** 毛利额 */
  grossProfitAmount?: AmountBean;
  /** 毛利率 */
  grossProfitRate?: RateBean;
  /** 库存周转数 */
  inventoryTurnoverDays?: AmountBean;
  /** 上架项目数 */
  listingCount?: CountBean;
  /** 退款率 */
  refundRate?: RateBean;
  /** 复购率 */
  repurchaseRate?: RateBean;
  /** 营收收入 */
  revenueAmount?: AmountBean;
  /** 销售额 */
  salesAmount?: AmountBean;
  /** 评分 */
  score?: AmountBean;
  /** 存销比 */
  stockSalesRate?: AmountBean;
  /** 年累计销售额 */
  yearRevenueAmount?: AmountBean;
  /** 年累计销售额 */
  yearSalesAmount?: AmountBean;
}

/** CountBean */
export interface CountBean {
  /** 达成率 */
  completionRate?: number;
  /**
   * 数量
   * @format int32
   */
  count?: number;
  /**
   * 延期数量
   * @format int32
   */
  delayedCount?: number;
  /** 健康度 */
  healthLevel?: string;
  /** 月环比 */
  monthlyGrowth?: number;
  /**
   * 如期数量
   * @format int32
   */
  normalCount?: number;
  /** 趋势 */
  trendList?: TrendBean[];
  /** 年同比 */
  yearlyGrowth?: number;
}

/** CountryPropBean */
export interface CountryPropBean {
  /** 国家 */
  country?: string;
  /** 国家销量占比 */
  countrySalesQtyRate?: number;
  /** 国家VOC量占比 */
  countryVocRate?: number;
  /**
   * 销量
   * @format int32
   */
  salesQty?: number;
  /**
   * VOC量
   * @format int32
   */
  vocCnt?: number;
  /** VOC占比率 */
  vocRate?: number;
}

/** CountryProportionBean */
export interface CountryProportionBean {
  /** 国家 */
  country?: string;
  /** 毛利额 */
  grossProfitAmount?: number;
  /** 毛利额占比 */
  grossProfitAmountRate?: number;
  /** 销售额 */
  salesAmount?: number;
  /** 销售额占比 */
  salesAmountRate?: number;
}

/** CountryRankingBean */
export interface CountryRankingBean {
  /** 访问持续时间 */
  allTrafficAverageVisitDuration?: number;
  /** 跳出率 */
  allTrafficBounceRate?: number;
  /** 页面数/访问 */
  allTrafficPagesPerVisit?: number;
  /** 每月访问量 */
  allTrafficVisits?: number;
  /**
   * 品类排名
   * @format int64
   */
  categoryRankNew?: number;
  /** 国家 */
  country?: string;
  /**
   * 国家排名
   * @format int64
   */
  countryRank?: number;
  /** 桌面端独立访客数 */
  desktopUniqueVisitors?: number;
  /** 桌面端访问量 */
  desktopVisits?: number;
  /** 域名 */
  domain?: string;
  /** 图标 */
  favicon?: string;
  /** 移动端独立访客数 */
  mobileUniqueVisitors?: number;
  /** 移动端访问量 */
  mobileVisits?: number;
  /** 月份 */
  month?: string;
  /** 销售额 */
  salesAmount?: number;
}

/** CountrySpuSaleDO */
export interface CountrySpuSaleDO {
  /** 目标销售额 */
  budgetSalesAmount?: number;
  /** 渠道 */
  channel?: string;
  /** 国家 */
  countryName?: string;
  /** 图片地址 */
  imgUrl?: string;
  /** 平台 */
  platform?: string;
  /**
   * 销量
   * @format int32
   */
  saleQty?: number;
  /** 销售额 */
  salesAmount?: number;
  /** 销售额达成率 */
  salesAmountCompletionRate?: number;
  /** 销售额同期 */
  salesAmountY?: number;
  /** 销售额同比 */
  salesAmountYoy?: number;
  /** SPU名称 */
  spuName?: string;
}

/** CustomerVoiceCategorySpuReviewDO */
export interface CustomerVoiceCategorySpuReviewDO {
  /**
   * 亚马逊评论数
   * @format int32
   */
  amazonReviewCount?: number;
  /** 品类 */
  category?: string;
  /** 四级品类 */
  category4?: string;
  /** 退款额 */
  refundAmount?: number;
  /** 退款率 */
  refundAmountRate?: number;
  /** 退款率环比 */
  refundAmountRateMom?: number;
  /** 退款率同比 */
  refundAmountRateYoy?: number;
  /** 销售额 */
  salesAmount?: number;
  /** SPU名称 */
  spuName?: string;
}

/** CustomerVoiceResp */
export interface CustomerVoiceResp {
  /** 品类-SPU评论分析 */
  customerVoiceCategoryReviewList?: CustomerVoiceCategorySpuReviewDO[];
  /** 品类-SPU评论分析合计 */
  customerVoiceCategoryReviewTotal?: CustomerVoiceCategorySpuReviewDO;
  /** 评论情感倾向对比 */
  customerVoiceSentimentList?: CustomerVoiceSentimentDO[];
  /** 基本概览 */
  customerVoiceTotal?: CustomerVoiceTotalDO;
  /** VOC趋势 */
  customerVoiceTrendList?: CustomerVoiceTrendDO[];
  /** Review星级统计 */
  reviewStarStatList?: ReviewStarStatBean[];
  /** 标签词云 */
  tagCloudList?: TagCloudBean[];
}

/** CustomerVoiceSentimentDO */
export interface CustomerVoiceSentimentDO {
  /**
   * 负向VOC量
   * @format int32
   */
  negativeVocCount?: number;
  /**
   * 正向VOC量
   * @format int32
   */
  positiveVocCount?: number;
  /** 一级标签 */
  vocLevel1?: string;
}

/** CustomerVoiceTotalDO */
export interface CustomerVoiceTotalDO {
  /**
   * 亚马逊评价数量
   * @format int32
   */
  amazonReviewCount?: number;
  /** 亚马逊评价数量环比 */
  amazonReviewCountMom?: number;
  /** 累计VOC占比 */
  cumulativeVocProp?: number;
  /** Meltwater舆情指标 */
  meltwaterOpinionIndex?: number;
  /** Meltwater舆情指标环比 */
  meltwaterOpinionIndexMom?: number;
  /**
   * Meltwater声量
   * @format int32
   */
  meltwaterVocCount?: number;
  /** Meltwater声量环比 */
  meltwaterVocCountMom?: number;
  /**
   * 差评数
   * @format int32
   */
  negativeCount?: number;
  /**
   * 差评数 - 上期
   * @format int32
   */
  negativeCountM?: number;
  /** 差评数环比 */
  negativeCountMom?: number;
  /**
   * 差评数 - 同期
   * @format int32
   */
  negativeCountY?: number;
  /** 差评数同比 */
  negativeCountYoy?: number;
  /** 差评率 */
  negativeRate?: number;
  /**
   * 负向VOC量
   * @format int32
   */
  negativeVocCount?: number;
  /** 负向VOC量环比 */
  negativeVocCountMom?: number;
  /** 负向VOC量占比 */
  negativeVocCountProp?: number;
  /**
   * 正向VOC量
   * @format int32
   */
  positiveVocCount?: number;
  /** 正向VOC量环比 */
  positiveVocCountMom?: number;
  /** 正向VOC量占比 */
  positiveVocCountProp?: number;
  /**
   * VOC量
   * @format int32
   */
  vocCount?: number;
  /**
   * VOC量-上期
   * @format int32
   */
  vocCountM?: number;
  /** VOC量环比 */
  vocCountMom?: number;
  /**
   * VOC量-同期
   * @format int32
   */
  vocCountY?: number;
  /** VOC量同比 */
  vocCountYoy?: number;
  /** VOC占比 */
  vocProp?: number;
  /** VOC占比环比 */
  vocPropMom?: number;
  /** VOC占比同比 */
  vocPropYoy?: number;
}

/** CustomerVoiceTrendDO */
export interface CustomerVoiceTrendDO {
  /** 负向VOC量占比 */
  negativeVocCountProp?: number;
  /** 周期 */
  period?: string;
  /**
   * 销量
   * @format int32
   */
  salesQty?: number;
  /**
   * VOC量
   * @format int32
   */
  vocCount?: number;
  /** VOC占比 */
  vocCountProp?: number;
}

/** DataSource */
export interface DataSource {
  dataSource?: string;
  dataSourcePlatformList?: DataSourcePlatform[];
}

/** DataSourceBean */
export interface DataSourceBean {
  dataSourceList?: string[];
  vocType?: string;
}

/** DataSourcePlatform */
export interface DataSourcePlatform {
  dataSourcePlatform?: string;
  dataTypeList?: string[];
}

/** DataSourcePropBean */
export interface DataSourcePropBean {
  /** 数据来源 */
  dataSource?: string;
  /** 数据来源销量占比 */
  dataSourceSalesQtyRate?: number;
  /** 数据来源VOC量占比 */
  dataSourceVocRate?: number;
  /**
   * 销量
   * @format int32
   */
  salesQty?: number;
  /**
   * VOC量
   * @format int32
   */
  vocCnt?: number;
  /** VOC占比率 */
  vocRate?: number;
}

/** DeveloperResp */
export interface DeveloperResp {
  /** 核心指标 */
  coreIndicator?: CoreIndicatorBean;
  /** 产品经理排行 */
  developerSpuSalesAnalysisList?: DeveloperSalesAnalysisBean[];
  /** BY品类下钻 */
  drillDownByCategoryList?: SalesDrillDownBean[];
  /** Review异常分析 */
  reviewUnusual?: ReviewUnusualBean;
  /** 合计 */
  salesAnalysisTotal?: SalesAnalysisDO;
  /** 销售趋势 */
  salesTrendList?: SalesCommonTrendBean[];
  /** SPU排行 */
  spuSalesAnalysisList?: SpuSalesAnalysisBean[];
}

/** DeveloperSalesAnalysisBean */
export interface DeveloperSalesAnalysisBean {
  /** 毛利额 */
  actualGtmGrossProfit?: number;
  /** 毛利率 */
  actualGtmGrossProfitRate?: number;
  /** 退款率 */
  actualRefundAmountRate?: number;
  /** 销售额 */
  actualSalesAmount?: number;
  /** 毛利额目标 */
  budgetGtmGrossProfit?: number;
  /** 毛利额目标 */
  budgetGtmGrossProfitRate?: number;
  /** 退款率目标 */
  budgetRefundAmountRate?: number;
  /** 销售额目标 */
  budgetSalesAmount?: number;
  /** 产品经理 */
  developerName?: string;
  /** 毛利额达成率 */
  gtmGrossProfitCompletionRate?: number;
  /** 毛利额差值 */
  gtmGrossProfitDiff?: number;
  /** GTM毛利额健康度 */
  gtmGrossProfitHealthLevel?: string;
  /** 毛利额差值 */
  gtmGrossProfitRateDiff?: number;
  /** 退款率差值 */
  refundAmountRateDiff?: number;
  /** 销售额达成率 */
  salesAmountCompletionRate?: number;
  /** 销售额差值 */
  salesAmountDiff?: number;
  /** 销售额健康度 */
  salesAmountHealthLevel?: string;
}

/** Dimension */
export interface Dimension {
  /** 下钻维度。BY一级标签：level1 */
  dimension?: string;
  /** 下钻维度值 */
  dimensionValue?: string;
}

/** DimensionBean */
export interface DimensionBean {
  /** 维度 */
  dimension?: string;
  /** 维度别名 */
  dimensionAlias?: string;
  /** 维度名称 */
  dimensionName?: string;
}

/** DynamicDataPageResp */
export interface DynamicDataPageResp {
  code?: string;
  /** 当前页数据 */
  list?: Record<string, object>[];
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

/** DynamicExcelImportOssReq */
export interface DynamicExcelImportOssReq {
  key: string;
}

/** DynamicExcelImportResult */
export interface DynamicExcelImportResult {
  errors?: string[];
  /** @format int32 */
  failCount?: number;
  /** @format int32 */
  successCount?: number;
}

/** DynamicTableColumnDTO */
export interface DynamicTableColumnDTO {
  autoIncrement?: boolean;
  columnComment?: string;
  columnName?: string;
  dataType?: string;
  defaultValue?: string;
  /** @format int32 */
  length?: number;
  nullable?: boolean;
  primaryKey?: boolean;
  /** @format int32 */
  scale?: number;
}

/** DynamicTableCreateReq */
export interface DynamicTableCreateReq {
  columns?: DynamicTableColumnDTO[];
  database: string;
  tableComment?: string;
  tableName: string;
}

/** DynamicTableDetailResp */
export interface DynamicTableDetailResp {
  columns?: DynamicTableColumnDTO[];
  /** @format date-time */
  createTime?: string;
  creator?: string;
  database?: string;
  /** @format int64 */
  id?: number;
  physicalTableName?: string;
  tableComment?: string;
  tableName?: string;
  /** @format date-time */
  updateTime?: string;
}

/** DynamicTableImportFromDdlReq */
export interface DynamicTableImportFromDdlReq {
  createTableSql: string;
}

/** DynamicTableImportFromDdlResp */
export interface DynamicTableImportFromDdlResp {
  /** @format int32 */
  columnCount?: number;
  database?: string;
  physicalTableName?: string;
  /** @format int64 */
  tableMetaId?: number;
  tableName?: string;
}

/** DynamicTableListResp */
export interface DynamicTableListResp {
  /** @format int32 */
  columnCount?: number;
  columns?: DynamicTableColumnDTO[];
  /** @format date-time */
  createTime?: string;
  database?: string;
  /** @format int64 */
  id?: number;
  physicalTableName?: string;
  tableComment?: string;
  tableName?: string;
}

/** DynamicTablePageResp */
export interface DynamicTablePageResp {
  code?: string;
  /** 当前页表列表 */
  list?: DynamicTableListResp[];
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

/** DynamicTableUpdateReq */
export interface DynamicTableUpdateReq {
  columns?: DynamicTableColumnDTO[];
  tableComment?: string;
}

/** EnumsReq */
export interface EnumsReq {
  /** 业务区域 */
  areaList?: string[];
  /** 区域权限 */
  areaPermissionList?: string[];
  /** 品牌 */
  brandList?: string[];
  /** 四级品类 */
  category4List?: string[];
  /** 品类 */
  categoryList?: string[];
  /** 品类权限 */
  categoryPermissionList?: string[];
  /** 渠道 */
  channelList?: string[];
  controlPermission?: boolean;
  /** 国家编码 */
  countryCodeList?: string[];
  /** 业务国家 */
  countryList?: string[];
  /** 国家权限 */
  countryPermissionList?: string[];
  /** 日期类型 */
  dateType?: string;
  /** 产品经理 */
  developerNameList?: string[];
  /** 产品经理权限 */
  developerNamePermissionList?: string[];
  /** 权限组 */
  dpGroupCodeList?: string[];
  /** 指定枚举查询。platform,channel,shop,spu_code,spu_name,country_code,area,country,category,category4,gtm_product_line,product_line,brand,developer_name,platform_channel,area_country,market_share_area,market_share_area_country,market_share_brand,market_share_category */
  enumList?: string[];
  /** 枚举类型 */
  enumType?: string;
  /** GTM品线 */
  gtmProductLineList?: string[];
  /** GTM组权限 */
  gtmProductLinePermissionList?: string[];
  /** 一级标签 */
  level1List?: string[];
  /** 月份 */
  month?: string;
  /** 平台 */
  platformList?: string[];
  /** 平台权限 */
  platformPermissionList?: string[];
  /** 产品品线 */
  productLineList?: string[];
  /** 产品品线权限 */
  productLinePermissionList?: string[];
  /** 店铺 */
  shopList?: string[];
  /** 店铺权限 */
  shopPermissionList?: string[];
  /** SPU编码 */
  spuCodeList?: string[];
  /** SPU名称 */
  spuNameList?: string[];
  /** 新老品 */
  spuNewProductTag?: string;
  /** SPU状态 */
  spuStatusList?: string[];
  /** 周 */
  week?: string;
  /** 年 */
  year?: string;
}

/** EnumsResp */
export interface EnumsResp {
  /** 广告类型 */
  adsType?: string[];
  /** 区域国家 */
  areaCountryList?: AreaCountryBean[];
  /** 区域 */
  areaList?: string[];
  /** 品牌 */
  brandList?: string[];
  /** 四级品类 */
  category4List?: string[];
  /** 品类 */
  categoryList?: string[];
  /** 渠道 */
  channelList?: string[];
  /** 国家 */
  countryList?: string[];
  /** 产品经理 */
  developerNameList?: string[];
  /** GTM品线 */
  gtmProductLineBeanList?: GtmProductLineBean[];
  /** GTM组 */
  gtmProductLineList?: string[];
  /** 一级标签 */
  level1List?: string[];
  /** 二级标签 */
  level2List?: string[];
  /** 市占区域国家 */
  marketShareAreaCountryList?: AreaCountryBean[];
  /** 市占区域 */
  marketShareAreaList?: string[];
  /** 市占品牌 */
  marketShareBrandList?: MarketShareBrand[];
  /** 市占品类 */
  marketShareCategoryList?: string[];
  /** 市占渠道 */
  marketShareChannelList?: string[];
  /** SPU新老品 */
  newProductTagList?: string[];
  /** 平台渠道 */
  platformChannelList?: PlatformChannelBean[];
  /** 平台 */
  platformList?: string[];
  /** 产品品线 */
  productLineList?: string[];
  /** 店铺 */
  shopList?: string[];
  /** SPU名称 */
  spuNameList?: string[];
  /** SPU状态 */
  spuStatusList?: string[];
  /** 周 */
  weekList?: WeekBean[];
  /** 周 */
  weekStrList?: string[];
}

/** FilterCondition */
export interface FilterCondition {
  /** 字段名 */
  fieldName?: string;
  /**
   * 操作符
   * @example "EQ,IN,BETWEEN,LIKE,GT,LT"
   */
  operator?: string;
  /** 值 */
  value?: object;
  /** 值列表(用于IN操作) */
  values?: string[];
}

/** FrontPageAllMetricBean */
export interface FrontPageAllMetricBean {
  /** 总广告点击量 */
  adClickCount?: number;
  /** 广告点击量_亚马逊 */
  adClickCountAmazon?: number;
  /** 广告点击量_亚马逊_上期 */
  adClickCountAmazonM?: number;
  /** 广告点击量_亚马逊_环比 */
  adClickCountAmazonMom?: number;
  /** 广告点击量_亚马逊_同期 */
  adClickCountAmazonY?: number;
  /** 广告点击量_亚马逊_同比 */
  adClickCountAmazonYoy?: number;
  /** 总广告点击量_上期 */
  adClickCountM?: number;
  /** 总广告点击量_环比 */
  adClickCountMom?: number;
  /** 广告点击量_独立站 */
  adClickCountShopify?: number;
  /** 广告点击量_独立站_上期 */
  adClickCountShopifyM?: number;
  /** 广告点击量_独立站_环比 */
  adClickCountShopifyMom?: number;
  /** 广告点击量_独立站_同期 */
  adClickCountShopifyY?: number;
  /** 广告点击量_独立站_同比 */
  adClickCountShopifyYoy?: number;
  /** 广告点击量_Tiktok */
  adClickCountTiktok?: number;
  /** 广告点击量_Tiktok_上期 */
  adClickCountTiktokM?: number;
  /** 广告点击量_Tiktok_环比 */
  adClickCountTiktokMom?: number;
  /** 广告点击量_Tiktok_同期 */
  adClickCountTiktokY?: number;
  /** 广告点击量_Tiktok_同比 */
  adClickCountTiktokYoy?: number;
  /** 总广告点击量_同期 */
  adClickCountY?: number;
  /** 总广告点击量_同比 */
  adClickCountYoy?: number;
  /** 总广告曝光量 */
  adImpressionsCount?: number;
  /** 广告曝光量_亚马逊 */
  adImpressionsCountAmazon?: number;
  /** 广告曝光量_亚马逊_上期 */
  adImpressionsCountAmazonM?: number;
  /** 广告曝光量_亚马逊_环比 */
  adImpressionsCountAmazonMom?: number;
  /** 广告曝光量_亚马逊_同期 */
  adImpressionsCountAmazonY?: number;
  /** 广告曝光量_亚马逊_同比 */
  adImpressionsCountAmazonYoy?: number;
  /** 总广告曝光量_上期 */
  adImpressionsCountM?: number;
  /** 总广告曝光量_环比 */
  adImpressionsCountMom?: number;
  /** 广告曝光量_独立站 */
  adImpressionsCountShopify?: number;
  /** 广告曝光量_独立站_上期 */
  adImpressionsCountShopifyM?: number;
  /** 广告曝光量_独立站_环比 */
  adImpressionsCountShopifyMom?: number;
  /** 广告曝光量_独立站_同期 */
  adImpressionsCountShopifyY?: number;
  /** 广告曝光量_独立站_同比 */
  adImpressionsCountShopifyYoy?: number;
  /** 广告曝光量_Tiktok */
  adImpressionsCountTiktok?: number;
  /** 广告曝光量_Tiktok_上期 */
  adImpressionsCountTiktokM?: number;
  /** 广告曝光量_Tiktok_环比 */
  adImpressionsCountTiktokMom?: number;
  /** 广告曝光量_Tiktok_同期 */
  adImpressionsCountTiktokY?: number;
  /** 广告曝光量_Tiktok_同比 */
  adImpressionsCountTiktokYoy?: number;
  /** 总广告曝光量_同期 */
  adImpressionsCountY?: number;
  /** 总广告曝光量_同比 */
  adImpressionsCountYoy?: number;
  /** 转化率_亚马逊 */
  conversionRateAmazon?: number;
  /** 转化率_亚马逊_上期 */
  conversionRateAmazonM?: number;
  /** 转化率_亚马逊_环比 */
  conversionRateAmazonMom?: number;
  /** 转化率_亚马逊_同期 */
  conversionRateAmazonY?: number;
  /** 转化率_亚马逊_同比 */
  conversionRateAmazonYoy?: number;
  /** 总红人曝光量 */
  impressionsKolCount?: number;
  /** 总红人曝光量_上期 */
  impressionsKolCountM?: number;
  /** 总红人曝光量_环比 */
  impressionsKolCountMom?: number;
  /** 红人曝光量_Tiktok */
  impressionsKolCountTiktok?: number;
  /** 红人曝光量_Tiktok_上期 */
  impressionsKolCountTiktokM?: number;
  /** 红人曝光量_Tiktok_环比 */
  impressionsKolCountTiktokMom?: number;
  /** 红人曝光量_Tiktok_同期 */
  impressionsKolCountTiktokY?: number;
  /** 红人曝光量_Tiktok_同比 */
  impressionsKolCountTiktokYoy?: number;
  /** 总红人曝光量_同期 */
  impressionsKolCountY?: number;
  /** 总红人曝光量_同比 */
  impressionsKolCountYoy?: number;
  /** 周期 */
  period?: string;
  /**
   * 总销量
   * @format int32
   */
  salesQty?: number;
  /**
   * 销量_亚马逊
   * @format int32
   */
  salesQtyAmazon?: number;
  /**
   * 销量_亚马逊_上期
   * @format int32
   */
  salesQtyAmazonM?: number;
  /** 销量_亚马逊_环比 */
  salesQtyAmazonMom?: number;
  /**
   * 销量_亚马逊_同期
   * @format int32
   */
  salesQtyAmazonY?: number;
  /** 销量_亚马逊_同比 */
  salesQtyAmazonYoy?: number;
  /**
   * 总销量_上期
   * @format int32
   */
  salesQtyM?: number;
  /** 总销量_环比 */
  salesQtyMom?: number;
  /**
   * 销量_独立站
   * @format int32
   */
  salesQtyShopify?: number;
  /**
   * 销量_独立站_上期
   * @format int32
   */
  salesQtyShopifyM?: number;
  /** 销量_独立站_环比 */
  salesQtyShopifyMom?: number;
  /**
   * 销量_独立站_同期
   * @format int32
   */
  salesQtyShopifyY?: number;
  /** 销量_独立站_同比 */
  salesQtyShopifyYoy?: number;
  /**
   * 销量_Tiktok
   * @format int32
   */
  salesQtyTiktok?: number;
  /**
   * 销量_Tiktok_上期
   * @format int32
   */
  salesQtyTiktokM?: number;
  /** 销量_Tiktok_环比 */
  salesQtyTiktokMom?: number;
  /**
   * 销量_Tiktok_同期
   * @format int32
   */
  salesQtyTiktokY?: number;
  /** 销量_Tiktok_同比 */
  salesQtyTiktokYoy?: number;
  /**
   * 总销量_同期
   * @format int32
   */
  salesQtyY?: number;
  /** 总销量_同比 */
  salesQtyYoy?: number;
  /** 结算会话数_亚马逊 */
  sessionsCompletedCheckoutAmazon?: number;
  /** 结算会话数_亚马逊_上期 */
  sessionsCompletedCheckoutAmazonM?: number;
  /** 结算会话数_亚马逊_环比 */
  sessionsCompletedCheckoutAmazonMom?: number;
  /** 结算会话数_亚马逊_同期 */
  sessionsCompletedCheckoutAmazonY?: number;
  /** 结算会话数_亚马逊_同比 */
  sessionsCompletedCheckoutAmazonYoy?: number;
  /** 页面浏览量_亚马逊 */
  sessionsPageviewsAmazon?: number;
  /** 页面浏览量_亚马逊_上期 */
  sessionsPageviewsAmazonM?: number;
  /** 页面浏览量_亚马逊_环比 */
  sessionsPageviewsAmazonMom?: number;
  /** 页面浏览量_亚马逊_同期 */
  sessionsPageviewsAmazonY?: number;
  /** 页面浏览量_亚马逊_同比 */
  sessionsPageviewsAmazonYoy?: number;
  /** 总会话数 */
  totalSessions?: number;
  /** 会话数_亚马逊 */
  totalSessionsAmazon?: number;
  /** 会话数_亚马逊_上期 */
  totalSessionsAmazonM?: number;
  /** 会话数_亚马逊_环比 */
  totalSessionsAmazonMom?: number;
  /** 会话数_亚马逊_同期 */
  totalSessionsAmazonY?: number;
  /** 会话数_亚马逊_同比 */
  totalSessionsAmazonYoy?: number;
  /** 总会话数_上期 */
  totalSessionsM?: number;
  /** 总会话数_环比 */
  totalSessionsMom?: number;
  /** 会话数_独立站 */
  totalSessionsShopify?: number;
  /** 会话数_独立站_上期 */
  totalSessionsShopifyM?: number;
  /** 会话数_独立站_环比 */
  totalSessionsShopifyMom?: number;
  /** 会话数_独立站_同期 */
  totalSessionsShopifyY?: number;
  /** 会话数_独立站_同比 */
  totalSessionsShopifyYoy?: number;
  /** 会话数_Tiktok */
  totalSessionsTiktok?: number;
  /** 会话数_Tiktok_上期 */
  totalSessionsTiktokM?: number;
  /** 会话数_Tiktok_环比 */
  totalSessionsTiktokMom?: number;
  /** 会话数_Tiktok_同期 */
  totalSessionsTiktokY?: number;
  /** 会话数_Tiktok_同比 */
  totalSessionsTiktokYoy?: number;
  /** 总会话数_同期 */
  totalSessionsY?: number;
  /** 总会话数_同比 */
  totalSessionsYoy?: number;
  /** 总VOC率 */
  vocRate?: number;
  /** VOC率_亚马逊 */
  vocRateAmazon?: number;
  /** VOC率_亚马逊_上期 */
  vocRateAmazonM?: number;
  /** VOC率_亚马逊_环比 */
  vocRateAmazonMom?: number;
  /** VOC率_亚马逊_同期 */
  vocRateAmazonY?: number;
  /** VOC率_亚马逊_同比 */
  vocRateAmazonYoy?: number;
  /** 总VOC率_上期 */
  vocRateM?: number;
  /** 总VOC率_环比 */
  vocRateMom?: number;
  /** VOC率_独立站 */
  vocRateShopify?: number;
  /** VOC率_独立站_上期 */
  vocRateShopifyM?: number;
  /** VOC率_独立站_环比 */
  vocRateShopifyMom?: number;
  /** VOC率_独立站_同期 */
  vocRateShopifyY?: number;
  /** VOC率_独立站_同比 */
  vocRateShopifyYoy?: number;
  /** VOC率_Tiktok */
  vocRateTiktok?: number;
  /** VOC率_Tiktok_上期 */
  vocRateTiktokM?: number;
  /** VOC率_Tiktok_环比 */
  vocRateTiktokMom?: number;
  /** VOC率_Tiktok_同期 */
  vocRateTiktokY?: number;
  /** VOC率_Tiktok_同比 */
  vocRateTiktokYoy?: number;
  /** 总VOC率_同期 */
  vocRateY?: number;
  /** 总VOC率_同比 */
  vocRateYoy?: number;
}

/** FrontPageReq */
export interface FrontPageReq {
  /** 区域 */
  areaList?: string[];
  /** 区域权限 */
  areaPermissionList?: string[];
  /** 三级类目 */
  category3List?: string[];
  /** 四级类目 */
  category4List?: string[];
  /** 三级类目 */
  categoryList?: string[];
  /** 三级分类 */
  categoryNameLevel3List?: string[];
  /** 四级分类 */
  categoryNameLevel4List?: string[];
  /** 五级分类 */
  categoryNameLevel5List?: string[];
  /** 品类权限 */
  categoryPermissionList?: string[];
  /** 渠道 */
  channel?: string;
  /** 渠道 */
  channelList?: string[];
  controlPermission?: boolean;
  /** 国家 */
  countryList?: string[];
  /** 国家权限 */
  countryPermissionList?: string[];
  /** 日期 */
  date?: string;
  /** 日期类型:month/week */
  dateType?: string;
  /** 产品经理 */
  developerNameList?: string[];
  /** 产品经理权限 */
  developerNamePermissionList?: string[];
  /** 下钻维度列表 */
  dimensionList?: Dimension[];
  /**
   * 下钻维度类型。1:BY区域,2:BY国家,3:BY平台,4:BY品类,5:BY SPU,6:BY GTM组
   * @format int32
   */
  dimensionType?: number;
  /** 权限组 */
  dpGroupCodeList?: string[];
  /** 结束日期 */
  endDate?: string;
  /** GTM组 */
  gtmProductLineList?: string[];
  /** GTM组权限 */
  gtmProductLinePermissionList?: string[];
  /** 月份 */
  month?: string;
  /** 平台 */
  platform?: string;
  /** 平台 */
  platformList?: string[];
  /** 平台权限 */
  platformPermissionList?: string[];
  /** 产品品线 */
  productLineList?: string[];
  /** GTM组 */
  productLineMarketGroupList?: string[];
  /** GTM经理 */
  productLineMarketNameList?: string[];
  /** 产品品线权限 */
  productLinePermissionList?: string[];
  /** 店铺 */
  shopList?: string[];
  /** 店铺权限 */
  shopPermissionList?: string[];
  /** 产品经理 */
  skuDeveloperNameList?: string[];
  /** 是否AIOT产品 */
  spuAiotTag?: string;
  /** SPU编码 */
  spuCodeList?: string[];
  /** SPU名称 */
  spuNameList?: string[];
  /** 产品分类：新品/老品 */
  spuNewProductTag?: string;
  /** SPU状态 */
  spuStatusList?: string[];
  /** 开始日期 */
  startDate?: string;
  /** 周 */
  week?: string;
  /**
   * 年
   * @format int32
   */
  year?: number;
}

/** FrontPageResp */
export interface FrontPageResp {
  /** 广告分析 */
  adAnalysis?: AdAnalysisBean;
  /** 售后分析 */
  afterSalesAnalysis?: AfterSalesAnalysisBean;
  /** 区域SPU排行 */
  areaSalesAnalysisList?: AreaSalesAnalysisBean[];
  /** GTM组SPU排行 */
  gtmSalesAnalysisList?: GtmSalesAnalysisBean[];
  /** 指标总览 */
  metricOverview?: FrontPageAllMetricBean;
  /** 指标总览趋势 */
  metricOverviewTrend?: FrontPageAllMetricBean[];
  /** 销售分析 */
  salesAnalysis?: FrontSalesAnalysisBean;
  /** SPU排行 */
  spuSalesAnalysisList?: SpuSalesAnalysisBean[];
  /** 库存分析 */
  supplyChainAnalysis?: SupplyChainAnalysisBean;
  /** 流量分析 */
  trafficAnalysis?: FrontTrafficAnalysisBean;
}

/** FrontSalesAnalysisBean */
export interface FrontSalesAnalysisBean {
  /** 广告花费 */
  adCost?: number;
  /** 广告花费环比 */
  adCostMom?: number;
  /** 广告花费环比差值 */
  adCostMomDiff?: number;
  /** 广告花费趋势 */
  adCostTrendList?: SalesTrandAnalysisBean[];
  /** 广告花费同比 */
  adCostYoy?: number;
  /** 广告花费同比差值 */
  adCostYoyDiff?: number;
  /** 销售单价 */
  avgSalesAmount?: number;
  /** 销售单价环比 */
  avgSalesAmountMom?: number;
  /** 销售单价环比差值 */
  avgSalesAmountMomDiff?: number;
  /** 销售单价趋势 */
  avgSalesAmountTrendList?: SalesTrandAnalysisBean[];
  /** 销售单价同比 */
  avgSalesAmountYoy?: number;
  /** 销售单价同比差值 */
  avgSalesAmountYoyDiff?: number;
  /** 促销折扣 */
  discountAmount?: number;
  /** 促销折扣环比 */
  discountAmountMom?: number;
  /** 促销折扣环比差值 */
  discountAmountMomDiff?: number;
  /** 促销折扣趋势 */
  discountAmountTrendList?: SalesTrandAnalysisBean[];
  /** 促销折扣同比 */
  discountAmountYoy?: number;
  /** 促销折扣同比差值 */
  discountAmountYoyDiff?: number;
  /** 周期 */
  period?: string;
  /** 退款额 */
  refundAmount?: number;
  /** 退款额环比 */
  refundAmountMom?: number;
  /** 退款额环比差值 */
  refundAmountMomDiff?: number;
  /** 退款额趋势 */
  refundAmountTrendList?: SalesTrandAnalysisBean[];
  /** 退款额同比 */
  refundAmountYoy?: number;
  /** 退款额同比差值 */
  refundAmountYoyDiff?: number;
  /** 销量 */
  saleQty?: number;
  /** 销量达成率 */
  saleQtyCompletionRate?: number;
  /** 销量环比 */
  saleQtyMom?: number;
  /** 销量目标 */
  saleQtyTarget?: number;
  /** 销量趋势 */
  saleQtyTrendList?: SalesTrandAnalysisBean[];
  /** 销量同比 */
  saleQtyYoy?: number;
  /** 销售额 */
  salesAmount?: number;
  /** 销售额达成率 */
  salesAmountCompletionRate?: number;
  /** 销售额环比 */
  salesAmountMom?: number;
  /** 销售额目标 */
  salesAmountTarget?: number;
  /** 销量趋势 */
  salesAmountTrendList?: SalesTrandAnalysisBean[];
  /** 销售额同比 */
  salesAmountYoy?: number;
}

/** FrontTrafficAnalysisBean */
export interface FrontTrafficAnalysisBean {
  /** Amazon流量分析数据 */
  amazonTrafficAnalysis?: AmazonTrafficAnalysisBean;
  /** Shopify流量分析数据 */
  shopifyTrafficAnalysis?: ShopifyTrafficAnalysisBean;
  /** Tiktok流量分析数据 */
  tiktokTrafficAnalysis?: TiktokTrafficAnalysisBean;
}

/** GroupSaleDO */
export interface GroupSaleDO {
  /** 目标销售额 */
  budgetSalesAmount?: number;
  /** 渠道 */
  channel?: string;
  /** 组别 */
  groupName?: string;
  /** 平台 */
  platform?: string;
  /**
   * 销量
   * @format int32
   */
  saleQty?: number;
  /** 销售额 */
  salesAmount?: number;
  /** 销售额达成率 */
  salesAmountCompletionRate?: number;
  /** 销售额同期 */
  salesAmountY?: number;
  /** 销售额同比 */
  salesAmountYoy?: number;
}

/** GtmProductLineBean */
export interface GtmProductLineBean {
  /** GTM品线名称 */
  gtmProductLine?: string;
  /** GTM品线编码 */
  gtmProductLineCode?: string;
}

/** GtmProductLineSaleDO */
export interface GtmProductLineSaleDO {
  /** 目标销售额 */
  budgetSalesAmount?: number;
  /** 渠道 */
  channel?: string;
  /** GTM组 */
  gtmProductLine?: string;
  /**
   * GTM组
   * @format int32
   */
  gtmProductLineRank?: number;
  /** 平台 */
  platform?: string;
  /**
   * 销量
   * @format int32
   */
  saleQty?: number;
  /** 销售额 */
  salesAmount?: number;
  /** 销售额达成率 */
  salesAmountCompletionRate?: number;
  /** 销售额同期 */
  salesAmountY?: number;
  /** 销售额同比 */
  salesAmountYoy?: number;
}

/** GtmSalesAnalysisBean */
export interface GtmSalesAnalysisBean {
  /** 广告花费 */
  adCost?: number;
  /** GTM组 */
  gtmProductLine?: string;
  /**
   * 销量
   * @format int64
   */
  saleQty?: number;
  /** 销量占比 */
  saleQtyProp?: number;
  /** 销售额 */
  salesAmount?: number;
  /** 销售额占比 */
  salesAmountProp?: number;
  /** SPU图片 */
  spuImg?: string;
  /** SPU名称 */
  spuName?: string;
}

/** IndustryBrandRankDO */
export interface IndustryBrandRankDO {
  /** 品牌 */
  brand?: string;
  /**
   * 排名
   * @format int32
   */
  brandRank?: number;
  /** 行业销售额同比 */
  industrySalesAmountYoy?: number;
  /**
   * 路特品牌标识
   * @format int32
   */
  luteBrand?: number;
  /** 排名趋势 */
  rankTrendList?: IndustryBrandRankTrendDO[];
  /** 销售额 */
  salesAmount?: number;
  /** 销售额市占 */
  salesAmountMarketShare?: number;
  /** 销售额市占同步 */
  salesAmountMarketShareYoy?: number;
  /** 销售额同比 */
  salesAmountYoy?: number;
}

/** IndustryBrandRankTrendDO */
export interface IndustryBrandRankTrendDO {
  /** 品牌 */
  brand?: string;
  /**
   * 排名
   * @format int32
   */
  brandRank?: number;
  /** 周期 */
  period?: string;
}

/** IndustryCategoryRankDO */
export interface IndustryCategoryRankDO {
  /** 品类 */
  category?: string;
  /**
   * 排名
   * @format int32
   */
  categoryRank?: number;
  /** 品类搜索趋势 */
  categorySearchTrendList?: IndustryCategorySearchTrendDO[];
  /** 图片 */
  imageUrl?: string;
  /** 行业销售额 */
  industrySalesAmount?: number;
  /** 行业销售额 */
  industrySalesAmountProp?: number;
  /** 行业销售额同比 */
  industrySalesAmountYoy?: number;
  /** 销售额 */
  luteSalesAmount?: number;
  /** 销售额 */
  luteSalesAmountProp?: number;
  /** 销售额同比 */
  luteSalesAmountYoy?: number;
}

/** IndustryCategorySearchTrendDO */
export interface IndustryCategorySearchTrendDO {
  /**
   * 亚马逊搜索量
   * @format int32
   */
  amazonSearchQty?: number;
  /** 周期 */
  category?: string;
  /** 周期 */
  period?: string;
}

/** IndustryTotalDO */
export interface IndustryTotalDO {
  /**
   * 品牌数
   * @format int32
   */
  brandQty?: number;
  /** 品牌数同比 */
  brandQtyYoy?: number;
  /**
   * 商品数
   * @format int32
   */
  productQty?: number;
  /** 商品数同比 */
  productQtyYoy?: number;
  /**
   * 销量
   * @format int32
   */
  saleQty?: number;
  /** 销量同比 */
  saleQtyYoy?: number;
  /** 销售额 */
  salesAmount?: number;
  /** 销售额同比 */
  salesAmountYoy?: number;
}

/** IndustryTrendDO */
export interface IndustryTrendDO {
  /** 行业销售额 */
  industrySalesAmount?: number;
  /** 行业销售额同比 */
  industrySalesAmountYoy?: number;
  /** 销售额 */
  luteSalesAmount?: number;
  /** 销售额同比 */
  luteSalesAmountYoy?: number;
  /** 周期 */
  period?: string;
}

/** IndustryTrendResp */
export interface IndustryTrendResp {
  /** 品牌排行TOP10 */
  brandRankList?: IndustryBrandRankDO[];
  /** 品类排行TOP10 */
  categoryRankList?: IndustryCategoryRankDO[];
  /** 市场规模 */
  industryTotal?: IndustryTotalDO;
  /** 市场趋势 */
  salesTrendList?: IndustryTrendDO[];
}

/** InventoryDrillDownAnalysisBean */
export interface InventoryDrillDownAnalysisBean {
  /** BY区域 */
  drillDownByArea?: InventoryDrillDownBean[];
  /** BY品类 */
  drillDownByCategory?: InventoryDrillDownBean[];
  /** BY平台 */
  drillDownByPlatform?: InventoryDrillDownBean[];
  /** 汇总 */
  drillDownTotal?: InventoryDrillDownBean;
}

/** InventoryDrillDownBean */
export interface InventoryDrillDownBean {
  /** 区域 */
  area?: string;
  /** 品类 */
  category?: string;
  /** 国家 */
  country?: string;
  /**
   * 下钻维度类型。1:BY区域,2:BY国家,3:BY平台,4:BY品类
   * @format int32
   */
  dimensionType?: number;
  /** 成品库存周转天数 */
  inventoryTurnoverDay?: number;
  /** 预测未来4个月月均销售成本 */
  next120DaysSalesCost?: number;
  /** 近30天销售成本 */
  past30DaysSalesCost?: number;
  /** 平台 */
  platform?: string;
  /** 成品库存金额 */
  stockAmount?: number;
  /** 成品库存存销比 */
  stockSalesRate?: number;
}

/** InventoryTrendAnalysisBean */
export interface InventoryTrendAnalysisBean {
  /** 成品库存趋势 */
  finishedProductInventoryTrend?: InventoryTurnoverTrendBean[];
  /** 全链路库存趋势 */
  fullChainInventoryTrend?: InventoryTurnoverTrendBean[];
}

/** InventoryTurnoverResp */
export interface InventoryTurnoverResp {
  /** 分析结果 */
  analysisResults?: BiAnalysisResultBean[];
  /** 下钻分析 */
  drillDownAnalysis?: InventoryDrillDownAnalysisBean;
  /** 月份 */
  monthList?: string[];
  /** 趋势分析 */
  trendAnalysis?: InventoryTrendAnalysisBean;
  /** 年份 */
  year?: string;
}

/** InventoryTurnoverTrendBean */
export interface InventoryTurnoverTrendBean {
  /** 库存周转天数 */
  inventoryTurnoverDay?: number;
  /** 月份 */
  month?: string;
  /** 库存金额 */
  stockAmount?: number;
  /** 存销比 */
  stockSalesRate?: number;
}

/** LabelTrendAnalysisBean */
export interface LabelTrendAnalysisBean {
  /** 标签分析 */
  labelList?: SupplyChainLabelAnalysisBean[];
  /** 周期 */
  period?: string;
}

/** Level */
export interface Level {
  level1?: string;
  level2List?: string[];
}

/** Level2ProportionBean */
export interface Level2ProportionBean {
  /** 二级标签 */
  level2?: string;
  /**
   * VOC量
   * @format int32
   */
  vocCnt?: number;
  /** 累计Voc占比 */
  vocGrandTotalRate?: number;
}

/** LevelDrillDownBean */
export interface LevelDrillDownBean {
  /**
   * 下钻维度类型。1:BY一级标签
   * @format int32
   */
  dimensionType?: number;
  /** 一级标签 */
  level1?: string;
  /** 二级标签 */
  level2?: string;
  /** 二级标签VOC量 */
  level2PeriodVocCnt?: PeriodVocCntBean[];
  /** VOC量 */
  periodVocCnt?: PeriodVocCntBean[];
  /** 周期集合 */
  periods?: string[];
  /**
   * VOC量
   * @format int32
   */
  vocCnt?: number;
  /** VOC占比 */
  vocRate?: number;
}

/** LevelPropBean */
export interface LevelPropBean {
  /** 一级标签 */
  level1?: string;
  /** 二级标签列表 */
  level2ProportionList?: Level2ProportionBean[];
  /**
   * VOC量
   * @format int32
   */
  vocCnt?: number;
  /** 累计Voc占比 */
  vocGrandTotalRate?: number;
}

/** LogisticsChannelDO */
export interface LogisticsChannelDO {
  /** 渠道名称 */
  channelName?: string;
  /**
   * 预估天数最大值
   * @format int32
   */
  estimatedDaysMax?: number;
  /**
   * 预估天数最小值
   * @format int32
   */
  estimatedDaysMin?: number;
  /** 预估总成本 */
  estimatedTotalCost?: number;
  /** 单价 */
  itemPrice?: number;
  /** 供应商编码 */
  supplierCode?: string;
  /** 供应商名称 */
  supplierName?: string;
  /** 总重量 */
  totalWeightKg?: number;
}

/** LogisticsChannelReq */
export interface LogisticsChannelReq {
  /** 国家 */
  destinationCountry?: string;
  /**
   * 预估天数
   * @format int32
   */
  expectedDeliveryDays?: number;
  /** 产品属性 */
  productAttributes?: string;
  /** 总重量 */
  totalWeightKg?: string;
}

/** LogisticsChannelResp */
export interface LogisticsChannelResp {
  /** 渠道列表 */
  logisticsChannelList?: LogisticsChannelDO[];
}

/** ManageAnalysisEnumsResp */
export interface ManageAnalysisEnumsResp {
  /** 区域国家 */
  areaCountryList?: AreaCountryBean[];
  /** 区域 */
  areaList?: string[];
  /** 品牌 */
  brandList?: string[];
  /** 三级品类 */
  category3List?: string[];
  /** 四级品类 */
  category4List?: string[];
  /** 品类 */
  categoryList?: string[];
  /** 国家 */
  countryList?: string[];
  /** GTM组 */
  gtmProductLineList?: string[];
  /** 平台渠道 */
  platformChannelList?: PlatformChannelBean[];
  /** 平台 */
  platformList?: string[];
  /** 品线 */
  productLineList?: string[];
  /** 店铺 */
  shopList?: string[];
  /** SPU名称 */
  spuNameList?: string[];
  /** 周 */
  weekList?: WeekBean[];
  /** 周 */
  weekStrList?: string[];
}

/** ManageAnalysisResp */
export interface ManageAnalysisResp {
  /** 分析结果 */
  analysisResults?: BiAnalysisResultBean[];
  /** 核心指标 */
  coreIndicator?: CoreIndicatorBean;
  /** 下钻分析 */
  drillDownAnalysis?: SalesDrillDownAnalysisBean;
  /** 占比分析 */
  proportionAnalysis?: ProportionAnalysisBean;
  /** 流量分析 */
  trafficAnalysis?: TrafficAnalysisBean;
  /** 趋势分析 */
  trendAnalysis?: TrendAnalysisBean;
  /** 数据更新时间 */
  updateDate?: string;
}

/** MarketBrandDO */
export interface MarketBrandDO {
  /** 区域 */
  area?: string;
  /** 客单价 */
  avgSalesAmount?: number;
  /** 品牌 */
  brand?: string;
  /** 国家 */
  country?: string;
  /**
   * 商品数
   * @format int32
   */
  productQty?: number;
  /**
   * 销量
   * @format int32
   */
  saleQty?: number;
  /** 销量市占 */
  saleQtyMarketShare?: number;
  /** 销售额 */
  salesAmount?: number;
  /** 销售额市占 */
  salesAmountMarketShare?: number;
}

/** MarketBrandMediaDO */
export interface MarketBrandMediaDO {
  /** 亚马逊搜索量 */
  amazonSearchQty?: number;
  /** 品牌 */
  brand?: string;
  /** 品牌声量 */
  brandVoice?: number;
  /** 谷歌搜索指数 */
  googleSearchIndex?: number;
  /** 周期 */
  period?: string;
}

/** MarketBrandPriceDO */
export interface MarketBrandPriceDO {
  /** 品牌 */
  brand?: string;
  /** 价格区间 */
  priceQuartile?: string;
  /**
   * 销量
   * @format int32
   */
  saleQty?: number;
}

/** MarketBrandProductDO */
export interface MarketBrandProductDO {
  /** 品牌 */
  brand?: string;
  /** 上周期销售额市占 */
  lastSalesAmountMarketShare?: number;
  /**
   * 是否路特品牌
   * @format int32
   */
  luteBrand?: number;
  /** 产品图片 */
  productImg?: string;
  /** 产品名称 */
  productName?: string;
  /**
   * 商品排名
   * @format int32
   */
  productRank?: number;
  /**
   * 销量
   * @format int32
   */
  saleQty?: number;
  /** 销量市占 */
  saleQtyMarketShare?: number;
  /** 销售额 */
  salesAmount?: number;
  /** 销售额市占 */
  salesAmountMarketShare?: number;
  /** 销售额市占变化 */
  salesAmountMarketShareDiff?: number;
}

/** MarketBrandTrendDO */
export interface MarketBrandTrendDO {
  /** 客单价 */
  avgSalesAmount?: number;
  /** 品牌 */
  brand?: string;
  /** 周期 */
  period?: string;
  /**
   * 商品数
   * @format int32
   */
  productQty?: number;
  /**
   * 销量
   * @format int32
   */
  saleQty?: number;
  /** 销量市占 */
  saleQtyMarketShare?: number;
  /** 销售额 */
  salesAmount?: number;
  /** 销售额市占 */
  salesAmountMarketShare?: number;
}

/** MarketPriceConfigBean */
export interface MarketPriceConfigBean {
  /** 币种 */
  currencyCode?: string;
  /**
   * 跨度
   * @format int64
   */
  span?: number;
  /** 起始价格 */
  startPrice?: number;
}

/** MarketShareBrand */
export interface MarketShareBrand {
  brand?: string;
  /** @format int32 */
  brandRank?: number;
  /** @format int32 */
  luteBrand?: number;
}

/** MetricBean */
export interface MetricBean {
  /** 指标 */
  metric?: string;
  /** 指标别名 */
  metricAlias?: string;
  /** 指标描述 */
  metricDesc?: string;
  /** 指标名称 */
  metricName?: string;
}

/** MetricDefinitionBean */
export interface MetricDefinitionBean {
  /** 数据来源 */
  dataSource?: string;
  /** 指标 */
  metric?: string;
  /** 定义 */
  metricDefinition?: string;
  /** 页面 */
  page?: string;
  /** 备注 */
  remark?: string;
  /** 更新频率 */
  updateFreq?: string;
}

/** MetricResp */
export interface MetricResp {
  /** 指标定义集合 */
  metricDefinitionList?: MetricDefinitionBean[];
}

/** MonthTrendBean */
export interface MonthTrendBean {
  /** 广告费率 */
  adCostRate?: number;
  /** 广告费率差值 */
  adCostRateDiff?: number;
  /** 成交均价 */
  avgSalesAmount?: number;
  /** 品牌声量 */
  brandVoice?: number;
  /** 目标广告费率 */
  budgetAdCostRate?: number;
  /** 目标毛利额 */
  budgetGrossProfitAmount?: number;
  /** 目标毛利率 */
  budgetGrossProfitRate?: number;
  /** 目标营业收入 */
  budgetMainBusinessIncome?: number;
  /** 目标销售额 */
  budgetSalesAmount?: number;
  /** 毛利额 */
  grossProfitAmount?: number;
  /** 毛利额达成率 */
  grossProfitAmountCompletionRate?: number;
  /** 毛利额环比 */
  grossProfitAmountMom?: number;
  /** 毛利率 */
  grossProfitRate?: number;
  /** 毛利率差值 */
  grossProfitRateDiff?: number;
  /** 营业收入 */
  mainBusinessIncome?: number;
  /** 营业收入达成率 */
  mainBusinessIncomeCompletionRate?: number;
  /** 月份 */
  month?: string;
  /** 新品销售额 */
  newProductSalesAmount?: number;
  /** 退款率 */
  refundAmountRate?: number;
  /** 退款率年累 */
  refundAmountRateCumulative?: number;
  /** 复购率 */
  repurchaseRate?: number;
  /** 退货率 */
  returnRate?: number;
  /** 退货率年累 */
  returnRateCumulative?: number;
  /** 销售额 */
  salesAmount?: number;
  /** 销售额达成率 */
  salesAmountCompletionRate?: number;
  /** 销售额年累 */
  salesAmountCumulative?: number;
  /** 销售额环比 */
  salesAmountMom?: number;
  /** 品牌声量 */
  userCount?: number;
}

/** MpcSpuAnalysisEnumsResp */
export interface MpcSpuAnalysisEnumsResp {
  /** SPU列表 */
  spuList?: SpuBean[];
}

/** MpcSpuAnalysisReq */
export interface MpcSpuAnalysisReq {
  /** 月份 */
  month?: string;
  /** 评分 */
  score?: number;
  /** 评分分析内容 */
  scoreAnalysis?: string;
  /** 卖点分析内容 */
  sellingPointsAnalysis?: string;
  /** SPU编码 */
  spuCode?: string;
  /** SPU名称 */
  spuName?: string;
}

/** MpcSpuAnalysisResp */
export interface MpcSpuAnalysisResp {
  /** 月份 */
  month?: string;
  /** 评分 */
  score?: number;
  /** 评分分析内容 */
  scoreAnalysis?: string;
  /** 卖点分析内容 */
  sellingPointsAnalysis?: string;
  /** SPU编码 */
  spuCode?: string;
  /** SPU名称 */
  spuName?: string;
}

/**
 * NewProductSpuBean
 * 新品问题标签趋势
 */
export interface NewProductSpuBean {
  /** SPU编码 */
  spuCode?: string;
  /** SPU名称 */
  spuName?: string;
}

/**
 * NewProductTagTrendBean
 * 新品问题标签趋势
 */
export interface NewProductTagTrendBean {
  /** 月份 */
  month?: string;
  /**
   * VOC量排名
   * @format int32
   */
  rk?: number;
  /** SPU编码 */
  spuCode?: string;
  /** SPU名称 */
  spuName?: string;
  /** 二级标签 */
  vocLevel2?: string;
  /**
   * VOC量
   * @format int64
   */
  vocQty?: number;
}

/**
 * NewProductVocRateBean
 * 新品VOC率表现
 */
export interface NewProductVocRateBean {
  /** 月份 */
  month?: string;
  /**
   * 销量
   * @format int64
   */
  saleQty?: number;
  /** SPU编码 */
  spuCode?: string;
  /** SPU名称 */
  spuName?: string;
  /**
   * VOC量
   * @format int64
   */
  vocQty?: number;
  /** VOC率 */
  vocRate?: number;
}

/** OtherAfterSalesAnalysisBean */
export interface OtherAfterSalesAnalysisBean {
  /** 退款率趋势 */
  refundTrandList?: RefundTrend[];
  /** 标签词云 */
  tagCloudList?: TagCloudBean[];
}

/** PageInfo */
export interface PageInfo {
  /**
   * 页码
   * @format int32
   */
  pageNum?: number;
  /**
   * 页大小
   * @format int32
   */
  pageSize?: number;
}

/** PeriodVocCntBean */
export interface PeriodVocCntBean {
  /** 下钻维度类型：1：周，2：月 */
  dimensionType?: string;
  /** 一级标签 */
  level1?: string;
  /** 二级标签 */
  level2?: string;
  /** 周期 */
  period?: string;
  /** 周期集合 */
  periods?: string[];
  /**
   * 销量
   * @format int32
   */
  salesQty?: number;
  /**
   * VOC量
   * @format int32
   */
  vocCnt?: number;
  /** VOC占比 */
  vocRate?: number;
}

/** PlatformChannelBean */
export interface PlatformChannelBean {
  channelList?: string[];
  platform?: string;
  salesAmount?: number;
}

/** PlatformPropBean */
export interface PlatformPropBean {
  /** 渠道 */
  channel?: string;
  /** 平台 */
  platform?: string;
  /** 平台销量占比 */
  platformSalesQtyRate?: number;
  /** 平台VOC量占比 */
  platformVocRate?: number;
  /**
   * 销量
   * @format int32
   */
  salesQty?: number;
  /**
   * VOC量
   * @format int32
   */
  vocCnt?: number;
  /** VOC占比率 */
  vocRate?: number;
}

/** PlatformProportionBean */
export interface PlatformProportionBean {
  /** 毛利额 */
  grossProfitAmount?: number;
  /** 毛利额占比 */
  grossProfitAmountRate?: number;
  /** 平台编码 */
  platform?: string;
  /** 销售额 */
  salesAmount?: number;
  /** 销售额占比 */
  salesAmountRate?: number;
}

/** PriceConfigSaveReq */
export interface PriceConfigSaveReq {
  /** 币种 */
  currencyCode?: string;
  /**
   * 跨度
   * @format int64
   */
  span?: number;
  /** 起始价格 */
  startPrice?: number;
}

/** ProductLine */
export interface ProductLine {
  productLine?: string;
  skuDeveloperNameList?: string[];
}

/** ProductLineMarket */
export interface ProductLineMarket {
  productLineMarketGroup?: string;
  productLineMarketNameList?: string[];
}

/** ProductLinePropBean */
export interface ProductLinePropBean {
  /**
   * 销量平均值
   * @format int32
   */
  avgSalesQty?: number;
  /**
   * VOC量平均值
   * @format int32
   */
  avgVocCnt?: number;
  /** 品线 */
  productLine?: string;
  /** 品线销量占比 */
  productLineSalesQtyRate?: number;
  /** 品线VOC量占比 */
  productLineVocRate?: number;
  /**
   * 销量
   * @format int32
   */
  salesQty?: number;
  /** SPU名称占比 */
  spuNameProportionList?: SpuNameProportionBean[];
  /**
   * VOC量
   * @format int32
   */
  vocCnt?: number;
  /** VOC占比率 */
  vocRate?: number;
}

/** ProductManagerBaseDO */
export interface ProductManagerBaseDO {
  /** 预算毛利率 */
  budgetGtmGrossProfitRate?: number;
  /** 预算退款率 */
  budgetRefundAmountRate?: number;
  /** 预算退货率 */
  budgetReturnRate?: number;
  /** 预算销售额 */
  budgetSalesAmount?: number;
  /** 累计VOC占比 */
  cumulativeVocProp?: number;
  /** 毛利率 */
  gtmGrossProfitRate?: number;
  /** 毛利率差值 */
  gtmGrossProfitRateDiff?: number;
  /** 毛利率健康度 */
  gtmGrossProfitRateHealthLevel?: string;
  /** 毛利率上期 */
  gtmGrossProfitRateM?: number;
  /** 毛利率环比 */
  gtmGrossProfitRateMom?: number;
  /** 毛利率同期 */
  gtmGrossProfitRateY?: number;
  /** 毛利率同比 */
  gtmGrossProfitRateYoy?: number;
  /**
   * 差评数
   * @format int32
   */
  negativeCount?: number;
  /**
   * 差评数上期
   * @format int32
   */
  negativeCountM?: number;
  /** 差评数环比 */
  negativeCountMom?: number;
  /**
   * 差评数同期
   * @format int32
   */
  negativeCountY?: number;
  /** 差评数同比 */
  negativeCountYoy?: number;
  /** 差评率健康度 */
  negativeHealthLevel?: string;
  /** 差评率 */
  negativeRate?: number;
  /** 新品预算销售额 */
  newProductBudgetSalesAmount?: number;
  /** 新品销售额 */
  newProductSalesAmount?: number;
  /** 新品销售额达成率 */
  newProductSalesAmountCompletionRate?: number;
  /** 新品销售额目标差值 */
  newProductSalesAmountDiff?: number;
  /** 新品销售额健康度 */
  newProductSalesAmountHealthLevel?: string;
  /** 新品销售额上期 */
  newProductSalesAmountM?: number;
  /** 新品销售额环比 */
  newProductSalesAmountMom?: number;
  /** 新品销售额同期 */
  newProductSalesAmountY?: number;
  /** 新品销售额同比 */
  newProductSalesAmountYoy?: number;
  /** 退款额 */
  refundAmount?: number;
  /** 退款额年累 */
  refundAmountCumulative?: number;
  /** 退款率 */
  refundAmountRate?: number;
  /** 退款率年累 */
  refundAmountRateCumulative?: number;
  /** 退款率差值 */
  refundAmountRateDiff?: number;
  /** 退款率健康度 */
  refundAmountRateHealthLevel?: string;
  /** 退款率上期 */
  refundAmountRateM?: number;
  /** 退款率环比 */
  refundAmountRateMom?: number;
  /** 退款率同期 */
  refundAmountRateY?: number;
  /** 退款率同比 */
  refundAmountRateYoy?: number;
  /**
   * 退货数量
   * @format int32
   */
  returnQty?: number;
  /**
   * 退货数量年累
   * @format int32
   */
  returnQtyCumulative?: number;
  /** 退货率 */
  returnRate?: number;
  /** 退货率年累 */
  returnRateCumulative?: number;
  /** 退货率差值 */
  returnRateDiff?: number;
  /** 退款率健康度 */
  returnRateHealthLevel?: string;
  /** 退货率环比 */
  returnRateMom?: number;
  /** 退货率同比 */
  returnRateYoy?: number;
  /**
   * 销量
   * @format int32
   */
  saleQty?: number;
  /**
   * 销量年累
   * @format int32
   */
  saleQtyCumulative?: number;
  /** 销售额 */
  salesAmount?: number;
  /** 销售额达成率 */
  salesAmountCompletionRate?: number;
  /** 销售额年累 */
  salesAmountCumulative?: number;
  /** 销售额目标差值 */
  salesAmountDiff?: number;
  /** 销售额健康度 */
  salesAmountHealthLevel?: string;
  /** 销售额上期 */
  salesAmountM?: number;
  /** 销售额环比 */
  salesAmountMom?: number;
  /** 销售额同期 */
  salesAmountY?: number;
  /** 销售额同比 */
  salesAmountYoy?: number;
  /**
   * VOC量
   * @format int32
   */
  vocCount?: number;
  /**
   * VOC量（年累）
   * @format int32
   */
  vocCountCumulative?: number;
  /**
   * VOC量上期
   * @format int32
   */
  vocCountM?: number;
  /** VOC量环比 */
  vocCountMom?: number;
  /**
   * VOC量同期
   * @format int32
   */
  vocCountY?: number;
  /** VOC量同比 */
  vocCountYoy?: number;
  /** VOC占比 */
  vocProp?: number;
}

/** ProductManagerLevelDO */
export interface ProductManagerLevelDO {
  /** 预算毛利率 */
  budgetGtmGrossProfitRate?: number;
  /** 预算退款率 */
  budgetRefundAmountRate?: number;
  /** 预算退货率 */
  budgetReturnRate?: number;
  /** 预算销售额 */
  budgetSalesAmount?: number;
  /** 累计VOC占比 */
  cumulativeVocProp?: number;
  /** 毛利率 */
  gtmGrossProfitRate?: number;
  /** 毛利率差值 */
  gtmGrossProfitRateDiff?: number;
  /** 毛利率健康度 */
  gtmGrossProfitRateHealthLevel?: string;
  /** 毛利率上期 */
  gtmGrossProfitRateM?: number;
  /** 毛利率环比 */
  gtmGrossProfitRateMom?: number;
  /** 毛利率同期 */
  gtmGrossProfitRateY?: number;
  /** 毛利率同比 */
  gtmGrossProfitRateYoy?: number;
  /** 二级标签 */
  level2?: string;
  /** 三级标签 */
  level3?: string;
  /** 四级标签 */
  level4?: string;
  /**
   * 差评数
   * @format int32
   */
  negativeCount?: number;
  /**
   * 差评数上期
   * @format int32
   */
  negativeCountM?: number;
  /** 差评数环比 */
  negativeCountMom?: number;
  /**
   * 差评数同期
   * @format int32
   */
  negativeCountY?: number;
  /** 差评数同比 */
  negativeCountYoy?: number;
  /** 差评率健康度 */
  negativeHealthLevel?: string;
  /** 差评率 */
  negativeRate?: number;
  /** 新品预算销售额 */
  newProductBudgetSalesAmount?: number;
  /** 新品销售额 */
  newProductSalesAmount?: number;
  /** 新品销售额达成率 */
  newProductSalesAmountCompletionRate?: number;
  /** 新品销售额目标差值 */
  newProductSalesAmountDiff?: number;
  /** 新品销售额健康度 */
  newProductSalesAmountHealthLevel?: string;
  /** 新品销售额上期 */
  newProductSalesAmountM?: number;
  /** 新品销售额环比 */
  newProductSalesAmountMom?: number;
  /** 新品销售额同期 */
  newProductSalesAmountY?: number;
  /** 新品销售额同比 */
  newProductSalesAmountYoy?: number;
  /** 退款额 */
  refundAmount?: number;
  /** 退款额年累 */
  refundAmountCumulative?: number;
  /** 退款率 */
  refundAmountRate?: number;
  /** 退款率年累 */
  refundAmountRateCumulative?: number;
  /** 退款率差值 */
  refundAmountRateDiff?: number;
  /** 退款率健康度 */
  refundAmountRateHealthLevel?: string;
  /** 退款率上期 */
  refundAmountRateM?: number;
  /** 退款率环比 */
  refundAmountRateMom?: number;
  /** 退款率同期 */
  refundAmountRateY?: number;
  /** 退款率同比 */
  refundAmountRateYoy?: number;
  /**
   * 退货数量
   * @format int32
   */
  returnQty?: number;
  /**
   * 退货数量年累
   * @format int32
   */
  returnQtyCumulative?: number;
  /** 退货率 */
  returnRate?: number;
  /** 退货率年累 */
  returnRateCumulative?: number;
  /** 退货率差值 */
  returnRateDiff?: number;
  /** 退款率健康度 */
  returnRateHealthLevel?: string;
  /** 退货率环比 */
  returnRateMom?: number;
  /** 退货率同比 */
  returnRateYoy?: number;
  /**
   * 销量
   * @format int32
   */
  saleQty?: number;
  /**
   * 销量年累
   * @format int32
   */
  saleQtyCumulative?: number;
  /** 销售额 */
  salesAmount?: number;
  /** 销售额达成率 */
  salesAmountCompletionRate?: number;
  /** 销售额年累 */
  salesAmountCumulative?: number;
  /** 销售额目标差值 */
  salesAmountDiff?: number;
  /** 销售额健康度 */
  salesAmountHealthLevel?: string;
  /** 销售额上期 */
  salesAmountM?: number;
  /** 销售额环比 */
  salesAmountMom?: number;
  /** 销售额同期 */
  salesAmountY?: number;
  /** 销售额同比 */
  salesAmountYoy?: number;
  /**
   * VOC量
   * @format int32
   */
  vocCount?: number;
  /**
   * VOC量（年累）
   * @format int32
   */
  vocCountCumulative?: number;
  /**
   * VOC量上期
   * @format int32
   */
  vocCountM?: number;
  /** VOC量环比 */
  vocCountMom?: number;
  /**
   * VOC量同期
   * @format int32
   */
  vocCountY?: number;
  /** VOC量同比 */
  vocCountYoy?: number;
  /** VOC占比 */
  vocProp?: number;
}

/** ProductManagerLevelTrendVO */
export interface ProductManagerLevelTrendVO {
  /** 列定义（period列表） */
  columns?: string[];
  /** 行数据 */
  rows?: Record<string, object>[];
  /** 累计VOC占比合计 */
  totalCumulativeVocProp?: Record<string, number>;
  /** 退款额合计 */
  totalRefundAmount?: Record<string, number>;
  /** 退款额合计 */
  totalRefundAmountCumulative?: Record<string, number>;
  /** 退款率合计 */
  totalRefundAmountRate?: Record<string, number>;
  /** 退款率年累合计 */
  totalRefundAmountRateCumulative?: Record<string, number>;
  /** 退货量合计 */
  totalReturnQty?: Record<string, number>;
  /** 退货量合计 */
  totalReturnQtyCumulative?: Record<string, number>;
  /** 退货率合计 */
  totalReturnRate?: Record<string, number>;
  /** 退货率年累合计 */
  totalReturnRateCumulative?: Record<string, number>;
  /** 退货量合计 */
  totalSaleQty?: Record<string, number>;
  /** 退货量合计 */
  totalSaleQtyCumulative?: Record<string, number>;
  /** 退货率合计 */
  totalSalesAmount?: Record<string, number>;
  /** 退货率年累合计 */
  totalSalesAmountCumulative?: Record<string, number>;
  /** VOC量合计 */
  totalVocCount?: Record<string, number>;
  /** VOC量年累合计 */
  totalVocCountCumulative?: Record<string, number>;
  /** VOC占比合计 */
  totalVocProp?: Record<string, number>;
}

/** ProductManagerResp */
export interface ProductManagerResp {
  /** 二级标签维度分析 */
  level2List?: ProductManagerLevelDO[];
  /** 二级标签趋势分析 */
  level2Trend?: ProductManagerLevelTrendVO;
  /** 三级标签维度分析 */
  level3MapList?: Record<string, ProductManagerLevelDO[]>;
  /** 退款率平台TOP3 */
  refundRateTop3Platform?: ProductManagerSpuDO[];
  /** 退货留言二级标签维度分析 */
  returnLevel2List?: ProductManagerLevelDO[];
  /** 退货留言二级标签趋势分析 */
  returnLevel2Trend?: ProductManagerLevelTrendVO;
  /** 退货留言三级标签维度分析 */
  returnLevel3MapList?: Record<string, ProductManagerLevelDO[]>;
  /** 退货率平台TOP3 */
  returnRateTop3Platform?: ProductManagerSpuDO[];
  /** 产品退货留言趋势分析（上线周期） */
  spuLaunchCycleReturnTrend?: ProductManagerLevelTrendVO;
  /** 上市周期产品三级标签维度分析 */
  spuLevel3LaunchCycleMapList?: Record<string, ProductManagerLevelDO[]>;
  /** 产品三级标签维度分析 */
  spuLevel3MapList?: Record<string, ProductManagerLevelDO[]>;
  /** 上市周期退货留言产品三级标签维度分析 */
  spuReturnLevel3LaunchCycleMapList?: Record<string, ProductManagerLevelDO[]>;
  /** 退货留言产品三级标签维度分析 */
  spuReturnLevel3MapList?: Record<string, ProductManagerLevelDO[]>;
  /** 产品退货留言趋势分析 */
  spuReturnTrend?: ProductManagerLevelTrendVO;
  /** 产品趋势分析 */
  spuTrend?: ProductManagerLevelTrendVO;
  /** 差评数TOP3 */
  top3NegativeCount?: ProductManagerSpuDO[];
  /** VOC量TOP3 */
  top3VocCount?: ProductManagerSpuDO[];
  /** 核心指标 */
  total?: ProductManagerBaseDO;
  /** 趋势分析 */
  trendList?: ProductManagerTrendDO[];
}

/** ProductManagerSpuDO */
export interface ProductManagerSpuDO {
  /** 预算毛利率 */
  budgetGtmGrossProfitRate?: number;
  /** 预算退款率 */
  budgetRefundAmountRate?: number;
  /** 预算退货率 */
  budgetReturnRate?: number;
  /** 预算销售额 */
  budgetSalesAmount?: number;
  /** 累计VOC占比 */
  cumulativeVocProp?: number;
  /** 毛利率 */
  gtmGrossProfitRate?: number;
  /** 毛利率差值 */
  gtmGrossProfitRateDiff?: number;
  /** 毛利率健康度 */
  gtmGrossProfitRateHealthLevel?: string;
  /** 毛利率上期 */
  gtmGrossProfitRateM?: number;
  /** 毛利率环比 */
  gtmGrossProfitRateMom?: number;
  /** 毛利率同期 */
  gtmGrossProfitRateY?: number;
  /** 毛利率同比 */
  gtmGrossProfitRateYoy?: number;
  /** 图片 */
  imgUrl?: string;
  /**
   * 差评数
   * @format int32
   */
  negativeCount?: number;
  /**
   * 差评数上期
   * @format int32
   */
  negativeCountM?: number;
  /** 差评数环比 */
  negativeCountMom?: number;
  /**
   * 差评数同期
   * @format int32
   */
  negativeCountY?: number;
  /** 差评数同比 */
  negativeCountYoy?: number;
  /** 差评率健康度 */
  negativeHealthLevel?: string;
  /** 差评率 */
  negativeRate?: number;
  /** 新品预算销售额 */
  newProductBudgetSalesAmount?: number;
  /** 新品销售额 */
  newProductSalesAmount?: number;
  /** 新品销售额达成率 */
  newProductSalesAmountCompletionRate?: number;
  /** 新品销售额目标差值 */
  newProductSalesAmountDiff?: number;
  /** 新品销售额健康度 */
  newProductSalesAmountHealthLevel?: string;
  /** 新品销售额上期 */
  newProductSalesAmountM?: number;
  /** 新品销售额环比 */
  newProductSalesAmountMom?: number;
  /** 新品销售额同期 */
  newProductSalesAmountY?: number;
  /** 新品销售额同比 */
  newProductSalesAmountYoy?: number;
  /** 平台 */
  platform?: string;
  /** 退款额 */
  refundAmount?: number;
  /** 退款额年累 */
  refundAmountCumulative?: number;
  /** 退款率 */
  refundAmountRate?: number;
  /** 退款率年累 */
  refundAmountRateCumulative?: number;
  /** 退款率差值 */
  refundAmountRateDiff?: number;
  /** 退款率健康度 */
  refundAmountRateHealthLevel?: string;
  /** 退款率上期 */
  refundAmountRateM?: number;
  /** 退款率环比 */
  refundAmountRateMom?: number;
  /** 退款率同期 */
  refundAmountRateY?: number;
  /** 退款率同比 */
  refundAmountRateYoy?: number;
  /**
   * 退货数量
   * @format int32
   */
  returnQty?: number;
  /**
   * 退货数量年累
   * @format int32
   */
  returnQtyCumulative?: number;
  /** 退货率 */
  returnRate?: number;
  /** 退货率年累 */
  returnRateCumulative?: number;
  /** 退货率差值 */
  returnRateDiff?: number;
  /** 退款率健康度 */
  returnRateHealthLevel?: string;
  /** 退货率环比 */
  returnRateMom?: number;
  /** 退货率同比 */
  returnRateYoy?: number;
  /**
   * 销量
   * @format int32
   */
  saleQty?: number;
  /**
   * 销量年累
   * @format int32
   */
  saleQtyCumulative?: number;
  /** 销售额 */
  salesAmount?: number;
  /** 销售额达成率 */
  salesAmountCompletionRate?: number;
  /** 销售额年累 */
  salesAmountCumulative?: number;
  /** 销售额目标差值 */
  salesAmountDiff?: number;
  /** 销售额健康度 */
  salesAmountHealthLevel?: string;
  /** 销售额上期 */
  salesAmountM?: number;
  /** 销售额环比 */
  salesAmountMom?: number;
  /** 销售额同期 */
  salesAmountY?: number;
  /** 销售额同比 */
  salesAmountYoy?: number;
  /** SPU名称 */
  spuName?: string;
  /**
   * VOC量
   * @format int32
   */
  vocCount?: number;
  /**
   * VOC量（年累）
   * @format int32
   */
  vocCountCumulative?: number;
  /**
   * VOC量上期
   * @format int32
   */
  vocCountM?: number;
  /** VOC量环比 */
  vocCountMom?: number;
  /**
   * VOC量同期
   * @format int32
   */
  vocCountY?: number;
  /** VOC量同比 */
  vocCountYoy?: number;
  /** VOC占比 */
  vocProp?: number;
}

/** ProductManagerTrendDO */
export interface ProductManagerTrendDO {
  /** 预算毛利率 */
  budgetGtmGrossProfitRate?: number;
  /** 预算退款率 */
  budgetRefundAmountRate?: number;
  /** 预算退货率 */
  budgetReturnRate?: number;
  /** 预算销售额 */
  budgetSalesAmount?: number;
  /** 累计VOC占比 */
  cumulativeVocProp?: number;
  /** 毛利率 */
  gtmGrossProfitRate?: number;
  /** 毛利率差值 */
  gtmGrossProfitRateDiff?: number;
  /** 毛利率健康度 */
  gtmGrossProfitRateHealthLevel?: string;
  /** 毛利率上期 */
  gtmGrossProfitRateM?: number;
  /** 毛利率环比 */
  gtmGrossProfitRateMom?: number;
  /** 毛利率同期 */
  gtmGrossProfitRateY?: number;
  /** 毛利率同比 */
  gtmGrossProfitRateYoy?: number;
  /**
   * 差评数
   * @format int32
   */
  negativeCount?: number;
  /**
   * 差评数上期
   * @format int32
   */
  negativeCountM?: number;
  /** 差评数环比 */
  negativeCountMom?: number;
  /**
   * 差评数同期
   * @format int32
   */
  negativeCountY?: number;
  /** 差评数同比 */
  negativeCountYoy?: number;
  /** 差评率健康度 */
  negativeHealthLevel?: string;
  /** 差评率 */
  negativeRate?: number;
  /** 新品预算销售额 */
  newProductBudgetSalesAmount?: number;
  /** 新品销售额 */
  newProductSalesAmount?: number;
  /** 新品销售额达成率 */
  newProductSalesAmountCompletionRate?: number;
  /** 新品销售额目标差值 */
  newProductSalesAmountDiff?: number;
  /** 新品销售额健康度 */
  newProductSalesAmountHealthLevel?: string;
  /** 新品销售额上期 */
  newProductSalesAmountM?: number;
  /** 新品销售额环比 */
  newProductSalesAmountMom?: number;
  /** 新品销售额同期 */
  newProductSalesAmountY?: number;
  /** 新品销售额同比 */
  newProductSalesAmountYoy?: number;
  /** 周期 */
  period?: string;
  /** 退款额 */
  refundAmount?: number;
  /** 退款额年累 */
  refundAmountCumulative?: number;
  /** 退款率 */
  refundAmountRate?: number;
  /** 退款率年累 */
  refundAmountRateCumulative?: number;
  /** 退款率差值 */
  refundAmountRateDiff?: number;
  /** 退款率健康度 */
  refundAmountRateHealthLevel?: string;
  /** 退款率上期 */
  refundAmountRateM?: number;
  /** 退款率环比 */
  refundAmountRateMom?: number;
  /** 退款率同期 */
  refundAmountRateY?: number;
  /** 退款率同比 */
  refundAmountRateYoy?: number;
  /**
   * 退货数量
   * @format int32
   */
  returnQty?: number;
  /**
   * 退货数量年累
   * @format int32
   */
  returnQtyCumulative?: number;
  /** 退货率 */
  returnRate?: number;
  /** 退货率年累 */
  returnRateCumulative?: number;
  /** 退货率差值 */
  returnRateDiff?: number;
  /** 退款率健康度 */
  returnRateHealthLevel?: string;
  /** 退货率环比 */
  returnRateMom?: number;
  /** 退货率同比 */
  returnRateYoy?: number;
  /**
   * 销量
   * @format int32
   */
  saleQty?: number;
  /**
   * 销量年累
   * @format int32
   */
  saleQtyCumulative?: number;
  /** 销售额 */
  salesAmount?: number;
  /** 销售额达成率 */
  salesAmountCompletionRate?: number;
  /** 销售额年累 */
  salesAmountCumulative?: number;
  /** 销售额目标差值 */
  salesAmountDiff?: number;
  /** 销售额健康度 */
  salesAmountHealthLevel?: string;
  /** 销售额上期 */
  salesAmountM?: number;
  /** 销售额环比 */
  salesAmountMom?: number;
  /** 销售额同期 */
  salesAmountY?: number;
  /** 销售额同比 */
  salesAmountYoy?: number;
  /**
   * VOC量
   * @format int32
   */
  vocCount?: number;
  /**
   * VOC量（年累）
   * @format int32
   */
  vocCountCumulative?: number;
  /**
   * VOC量上期
   * @format int32
   */
  vocCountM?: number;
  /** VOC量环比 */
  vocCountMom?: number;
  /**
   * VOC量同期
   * @format int32
   */
  vocCountY?: number;
  /** VOC量同比 */
  vocCountYoy?: number;
  /** VOC占比 */
  vocProp?: number;
}

/** ProductRatingItem */
export interface ProductRatingItem {
  /** 三级类目名称 */
  categoryLevel3Name?: string;
  /** 子级数据 */
  children?: ProductRatingItem[];
  /** 是否展开 */
  expanded?: boolean;
  /** 是否有子级 */
  hasChildren?: boolean;
  /** 三级类目/SPU名称（层级路径） */
  itemPath?: string;
  /**
   * 层级（1-2）
   * @format int32
   */
  level?: number;
  /** 中差评率（百分比） */
  negativeReviewRate?: number;
  /**
   * 新增评论数
   * @format int64
   */
  newReviewCount?: number;
  /** 好评率（百分比） */
  positiveReviewRate?: number;
  /**
   * 评论数
   * @format int64
   */
  reviewCount?: number;
  /** 情感标签分析（展开时显示） */
  sentimentTagList?: SentimentTag[];
  /** SPU编码 */
  spuCode?: string;
  /** SPU名称 */
  spuName?: string;
  /** 星级评分 */
  starRating?: number;
  /** 星级分布详情（展开时显示） */
  starRatingDistribution?: StarRatingDistribution;
  /** 星级评分周环比差值（百分比） */
  starRatingWeekOverWeekDiff?: number;
  /** 近6周VOC率趋势数据 */
  vocRateTrendData?: number[];
  /** 近6周VOC率趋势数据对应的时间列表 */
  vocRateTrendTimeList?: string[];
}

/** ProportionAnalysisBean */
export interface ProportionAnalysisBean {
  /** 区域占比 */
  areaProportions?: AreaProportionBean[];
  /** 品类占比(按毛利额排序) */
  categoryProportionOrderByGrossProfits?: CategoryProportionBean[];
  /** 品类占比(按销售额排序) */
  categoryProportionOrderBySales?: CategoryProportionBean[];
  /** 国家占比 */
  countryProportions?: CountryProportionBean[];
  /** 平台占比 */
  platformProportions?: PlatformProportionBean[];
}

/** QueryReq */
export interface QueryReq {
  /**
   * 聚合方式（废弃）
   * @example "SUM"
   */
  aggregateType?: string;
  /** 区域权限 */
  areaPermissionList?: string[];
  /**
   * 是否计算环比
   * @example true
   */
  calculateMom?: boolean;
  /**
   * 是否计算占比
   * @example true
   */
  calculateProp?: boolean;
  /**
   * 是否计算同比
   * @example true
   */
  calculateYoy?: boolean;
  /** 品类权限 */
  categoryPermissionList?: string[];
  controlPermission?: boolean;
  /** 国家权限 */
  countryPermissionList?: string[];
  /** 产品经理权限 */
  developerNamePermissionList?: string[];
  /**
   * 查询维度列表
   * @example ["platform","channel"]
   */
  dimensions?: string[];
  /** 权限组 */
  dpGroupCodeList?: string[];
  /** 过滤条件 */
  filters?: FilterCondition[];
  /** GTM组权限 */
  gtmProductLinePermissionList?: string[];
  /**
   * 限制返回条数（需配合排序使用）
   * @format int32
   * @example 10
   */
  limit?: number;
  /**
   * 查询指标列表
   * @example ["actualSalesGmv","budgetSalesGmv"]
   */
  metrics?: string[];
  /** 分页信息 */
  pageInfo?: PageInfo;
  /** 平台权限 */
  platformPermissionList?: string[];
  /** 产品品线权限 */
  productLinePermissionList?: string[];
  /** 店铺权限 */
  shopPermissionList?: string[];
  /** 排序条件 */
  sorts?: SortCondition[];
  /** 查询表 */
  table?: string;
  /** 用户编码 */
  user?: string;
}

/** QueryResp */
export interface QueryResp {
  /** 配置编码 */
  configCode?: string;
  /** 查询结果数据 */
  data?: Record<string, object>[];
  /** 数据权限 */
  dataPermission?: object;
  /** 查询维度 */
  dimensions?: DimensionBean[];
  /**
   * 执行时间(毫秒)
   * @format int64
   */
  executionTime?: number;
  /** 查询指标 */
  metrics?: MetricBean[];
  /**
   * 当前页码
   * @format int32
   */
  pageNum?: number;
  /**
   * 页大小
   * @format int32
   */
  pageSize?: number;
  /** 看板编码 */
  reportCode?: string;
  /**
   * 总记录数
   * @format int64
   */
  total?: number;
}

/** RateBean */
export interface RateBean {
  /** 预算比率 */
  budgetRate?: number;
  /** 差值 */
  diff?: number;
  /** 健康度 */
  healthLevel?: string;
  /** 月环比 */
  monthlyGrowth?: number;
  /** 比率 */
  rate?: number;
  /** 趋势 */
  trendList?: TrendBean[];
  /** 年同比 */
  yearlyGrowth?: number;
}

/** RealTimeSaleAnalysisResp */
export interface RealTimeSaleAnalysisResp {
  /** 活动名称 */
  activityName?: string;
  /** 区域销售同比 */
  areaSaleList?: AreaSaleDO[];
  /** 国家热销商品 */
  countrySpuSaleMap?: Record<string, CountrySpuSaleDO[]>;
  /** 当前时间 */
  currentTime?: string;
  /** 数据结束时间 */
  endTime?: string;
  /** 组别销售 */
  groupSaleList?: GroupSaleDO[];
  /** GTM销售同比 */
  gtmProductLineSaleList?: GtmProductLineSaleDO[];
  /** 销售总览 */
  saleTotal?: RealTimeSaleBaseDO;
  /** 是否快照数据 */
  snapshot?: boolean;
  /** 数据快照时间 */
  snapshotTime?: string;
  /** 数据开始时间 */
  startTime?: string;
  /** 销售趋势 */
  trendSaleList?: TrendSaleDO[];
}

/** RealTimeSaleBaseDO */
export interface RealTimeSaleBaseDO {
  /** 目标销售额 */
  budgetSalesAmount?: number;
  /** 渠道 */
  channel?: string;
  /** 平台 */
  platform?: string;
  /**
   * 销量
   * @format int32
   */
  saleQty?: number;
  /** 销售额 */
  salesAmount?: number;
  /** 销售额达成率 */
  salesAmountCompletionRate?: number;
  /** 销售额同期 */
  salesAmountY?: number;
  /** 销售额同比 */
  salesAmountYoy?: number;
}

/** RefundTrend */
export interface RefundTrend {
  /** 周期 */
  period?: string;
  /** 退款额 */
  refundAmount?: number;
  /** 退款率 */
  refundAmountRate?: number;
}

/** ReportConfigBean */
export interface ReportConfigBean {
  /** 配置编码 */
  configCode?: string;
  /** 配置描述 */
  configDesc?: string;
  /** 看板编码 */
  reportCode?: string;
}

/** ReportConfigReq */
export interface ReportConfigReq {
  /** 区域权限 */
  areaPermissionList?: string[];
  /** 品类权限 */
  categoryPermissionList?: string[];
  controlPermission?: boolean;
  /** 国家权限 */
  countryPermissionList?: string[];
  /** 产品经理权限 */
  developerNamePermissionList?: string[];
  /** 权限组 */
  dpGroupCodeList?: string[];
  /** GTM组权限 */
  gtmProductLinePermissionList?: string[];
  /** 平台权限 */
  platformPermissionList?: string[];
  /** 产品品线权限 */
  productLinePermissionList?: string[];
  /** 看板编码 */
  reportCode?: string;
  /** 店铺权限 */
  shopPermissionList?: string[];
}

/** ReportConfigResp */
export interface ReportConfigResp {
  /** 看板配置维度枚举 */
  dimensionEnumMap?: object;
  /** 看板配置维度 */
  dimensionList?: string[];
  /** 看板编码 */
  reportCode?: string;
  /** 看板配置结果集 */
  reportConfigList?: ReportConfigBean[];
}

/** ReturnRateResp */
export interface ReturnRateResp {
  /** AI分析结果 */
  analysisResults?: BiAnalysisResultBean[];
  /** TOP10品牌退货率 */
  brandReturnRates?: BrandReturnRateBean[];
  /** 趋势分析 */
  returnRateTrendAnalysis?: ReturnRateTrendAnalysisBean;
  /** Momcozy退货率 BY SPU */
  spuReturnRates?: SpuReturnRateBean[];
}

/** ReturnRateTrendAnalysisBean */
export interface ReturnRateTrendAnalysisBean {
  /** 退货率趋势 */
  returnRateTrends?: ReturnRateTrendBean[];
}

/** ReturnRateTrendBean */
export interface ReturnRateTrendBean {
  /** 竞品退货率 */
  competitiveReturnRate?: number;
  /** 月份 */
  month?: string;
  /** Momcozy退货率 */
  returnRate?: number;
}

/** ReviewStarStatBean */
export interface ReviewStarStatBean {
  /** 占比 */
  percentage?: number;
  /**
   * Review数量
   * @format int64
   */
  reviewCount?: number;
  /** 星级 */
  starLevel?: string;
}

/** ReviewTypeStatBean */
export interface ReviewTypeStatBean {
  /**
   * 非VP评价数量
   * @format int64
   */
  nonVpReviewCount?: number;
  /** 非VP评价占比 */
  nonVpReviewRatio?: number;
  /** VINE评价说明 */
  vineReviewNote?: string;
  /**
   * VP评价数量
   * @format int64
   */
  vpReviewCount?: number;
  /** VP评价占比 */
  vpReviewRatio?: number;
}

/** ReviewUnusualBean */
export interface ReviewUnusualBean {
  /** 异常列表 */
  reviewUnusualDataList?: ReviewUnusualDataBean[];
  /** 异常趋势 */
  reviewUnusualTrendList?: ReviewUnusualTrendBean[];
}

/** ReviewUnusualDataBean */
export interface ReviewUnusualDataBean {
  /** 标杆评分 */
  benchmarkScore?: string;
  /** 周期 */
  date?: string;
  /** 产品型号 */
  modelName?: string;
  /** 评分 */
  score?: string;
  /** SPU编码 */
  spuCode?: string;
  /** SPU图片 */
  spuImg?: string;
  /** SPU名称 */
  spuName?: string;
  /** TOP 3 平均评分 */
  top3AvgScore?: string;
}

/** ReviewUnusualTrendBean */
export interface ReviewUnusualTrendBean {
  /**
   * 异常数量
   * @format int32
   */
  count?: number;
  /** 周期 */
  date?: string;
}

/** SalesAnalysisBean */
export interface SalesAnalysisBean {
  /** 实际毛利额 */
  actualGtmGrossProfit?: number;
  /** 实际毛利率 */
  actualGtmGrossProfitRate?: number;
  /** 实际营业收入 */
  actualMainBusinessIncome?: number;
  /** 实际销售额 */
  actualSalesAmount?: number;
  /** 区域 */
  area?: string;
  /** 目标毛利额 */
  budgetGtmGrossProfit?: number;
  /** 目标毛利率 */
  budgetGtmGrossProfitRate?: number;
  /** 目标营业收入 */
  budgetMainBusinessIncome?: number;
  /** 目标销售额 */
  budgetSalesAmount?: number;
  /** 品类 */
  category?: string;
  /** 国家 */
  country?: string;
  /** 时间进度 */
  dateProgress?: string;
  /**
   * 下钻维度类型。1:BY区域,2:BY国家,3:BY平台,4:BY品类
   * @format int32
   */
  dimensionType?: number;
  /** 毛利额达成标识 */
  gtmGrossProfitCompletionFlag?: string;
  /** 毛利额达成率 */
  gtmGrossProfitCompletionRate?: number;
  /** 毛利额差值 */
  gtmGrossProfitDiff?: number;
  /** 毛利额健康度 */
  gtmGrossProfitHealthLevel?: string;
  /** 毛利率差值 */
  gtmGrossProfitRateDiff?: number;
  /** 毛利率健康度 */
  gtmGrossProfitRateHealthLevel?: string;
  /** GTM组 */
  gtmProductLine?: string;
  /** 营业收入达成率 */
  mainBusinessIncomeCompletionRate?: number;
  /** 营业收入差值 */
  mainBusinessIncomeDiff?: number;
  /** 营业收入健康度 */
  mainBusinessIncomeHealthLevel?: string;
  /** 月份 */
  month?: string;
  /** 平台 */
  platform?: string;
  /** 销售额达成标识 */
  salesAmountCompletionFlag?: string;
  /** 销售额达成率 */
  salesAmountCompletionRate?: number;
  /** 销售额差值 */
  salesAmountDiff?: number;
  /** 销售额健康度 */
  salesAmountHealthLevel?: string;
}

/** SalesAnalysisDO */
export interface SalesAnalysisDO {
  /** 实际广告推广费 */
  actualAdCost?: number;
  /** 实际广告推广费率 */
  actualAdCostRate?: number;
  /** 实际成交均价 */
  actualAvgSalesAmount?: number;
  /** 实际折扣率 */
  actualDiscountAmountRate?: number;
  /** 实际GTM毛利额 */
  actualGtmGrossProfit?: number;
  /** 实际GTM毛利率 */
  actualGtmGrossProfitRate?: number;
  /** 实际主营业务收入 */
  actualMainBusinessIncome?: number;
  /** 实际退款率 */
  actualRefundAmountRate?: number;
  /** 实际退货率 */
  actualReturnRate?: number;
  /** 实际销售额 */
  actualSalesAmount?: number;
  /** 实际销售数量 */
  actualSalesQuantity?: number;
  /** 广告推广费达成率 */
  adCostCompletionRate?: number;
  /** 广告推广费率差值 */
  adCostRateDiff?: number;
  /** 广告推广费率环比 */
  adCostRateMom?: number;
  /** 广告推广费率同比 */
  adCostRateYoy?: number;
  /** 成交均价达成率 */
  avgSalesAmountCompletionRate?: number;
  /** 成交均价环比 */
  avgSalesAmountMom?: number;
  /** 成交均价同比 */
  avgSalesAmountYoy?: number;
  /** 预算广告推广费 */
  budgetAdCost?: number;
  /** 预算广告推广费率 */
  budgetAdCostRate?: number;
  /** 预算成交均价 */
  budgetAvgSalesAmount?: number;
  /** 预算折扣率 */
  budgetDiscountAmountRate?: number;
  /** 预算GTM毛利额 */
  budgetGtmGrossProfit?: number;
  /** 预算GTM毛利率 */
  budgetGtmGrossProfitRate?: number;
  /** 预算主营业务收入 */
  budgetMainBusinessIncome?: number;
  /** 预算退款率 */
  budgetRefundAmountRate?: number;
  /** 预算退货率 */
  budgetReturnRate?: number;
  /** 预算销售额 */
  budgetSalesAmount?: number;
  /** 预算销售数量 */
  budgetSalesQuantity?: number;
  /** 折扣率差值 */
  discountAmountRateDiff?: number;
  /** GTM毛利额达成率 */
  gtmGrossProfitCompletionRate?: number;
  /** 毛利额差值 */
  gtmGrossProfitDiff?: number;
  /** GTM毛利额健康度 */
  gtmGrossProfitHealthLevel?: string;
  /** GTM毛利额环比 */
  gtmGrossProfitMom?: number;
  /** GTM毛利率差值 */
  gtmGrossProfitRateDiff?: number;
  /** GTM毛利率环比 */
  gtmGrossProfitRateMom?: number;
  /** GTM毛利率同比 */
  gtmGrossProfitRateYoy?: number;
  /** GTM毛利额同比 */
  gtmGrossProfitYoy?: number;
  /** 主营业务收入达成率 */
  mainBusinessIncomeCompletionRate?: number;
  /** 主营业务收入环比 */
  mainBusinessIncomeMom?: number;
  /** 主营业务收入同比 */
  mainBusinessIncomeYoy?: number;
  /** 新品预算销售额 */
  newProductBudgetSalesAmount?: number;
  /** 新品实际销售额 */
  newProductSalesAmount?: number;
  /** 新品销售额达成率 */
  newProductSalesAmountCompletionRate?: number;
  /** 新品销售额目标差值 */
  newProductSalesAmountDiff?: number;
  /** 新品销售额环比 */
  newProductSalesAmountMom?: number;
  /** 新品销售额同比 */
  newProductSalesAmountYoy?: number;
  /** 退款率差值 */
  refundAmountRateDiff?: number;
  /** 退款率环比 */
  refundAmountRateMom?: number;
  /** 退款率同比 */
  refundAmountRateYoy?: number;
  /** 退货率差值 */
  returnRateDiff?: number;
  /** 退货率环比 */
  returnRateMom?: number;
  /** 退货率同比 */
  returnRateYoy?: number;
  /** 销售额达成率 */
  salesAmountCompletionRate?: number;
  /** 销售额差值 */
  salesAmountDiff?: number;
  /** 销售额健康度 */
  salesAmountHealthLevel?: string;
  /** 销售额环比 */
  salesAmountMom?: number;
  /** 销售额同比 */
  salesAmountYoy?: number;
}

/** SalesAnalysisDrillDownBean */
export interface SalesAnalysisDrillDownBean {
  /** BY区域 */
  drillDownByArea?: SalesAnalysisBean[];
  /** BY品类 */
  drillDownByCategory?: SalesAnalysisBean[];
  /** BY平台 */
  drillDownByPlatform?: SalesAnalysisBean[];
  /** 合计 */
  drillDownTotal?: SalesAnalysisBean;
}

/** SalesAnalysisResp */
export interface SalesAnalysisResp {
  /** 分析结果 */
  analysisResults?: BiAnalysisResultBean[];
  /** 下钻分析 */
  drillDownAnalysis?: SalesAnalysisDrillDownBean;
  /** 毛利额趋势 */
  grossProfitAmountTrends?: SalesAnalysisTrendBean[];
  /** 毛利率趋势 */
  grossProfitRateTrends?: SalesAnalysisTrendBean[];
  /** 营业收入趋势 */
  mainBusinessIncomeTrends?: SalesAnalysisTrendBean[];
  /** 销售额趋势 */
  salesAmountTrends?: SalesAnalysisTrendBean[];
}

/** SalesAnalysisTrendBean */
export interface SalesAnalysisTrendBean {
  /** 实际值 */
  actualAmount?: number;
  /** 目标值 */
  budgetAmount?: number;
  /** 达成率/差值 */
  completionRate?: number;
  /** 月份 */
  month?: string;
}

/** SalesCommonTrendBean */
export interface SalesCommonTrendBean {
  /** 广告成本率 */
  adCostRate?: number;
  /** 周期 */
  date?: string;
  /** 毛利额 */
  grossProfit?: number;
  /** 毛利率 */
  grossProfitRate?: number;
  /** 主营业务收入 */
  mainBusinessIncome?: number;
  /** 退款率 */
  refundAmountRate?: number;
  /** 销售额 */
  salesAmount?: number;
}

/** SalesDayAnalysisResp */
export interface SalesDayAnalysisResp {
  /** 区域销售 */
  salesDayArea?: SalesDayAreaTotalBean;
  /** 品类销售 */
  salesDayCategory?: SalesDayCategoryTotalBean;
  /** 平台销售 */
  salesDayPlatform?: SalesDayPlatformTotalBean;
  /** 销售排名 */
  salesDayRank?: SalesDayRankTotalBean;
  /** 销售概览 */
  salesDayTotal?: SalesDayBean;
  /** 销售趋势分析 */
  salesDayTrendList?: SalesDayTrendBean[];
  /** 数据更新时间 */
  updateDate?: string;
}

/** SalesDayAreaBean */
export interface SalesDayAreaBean {
  /** 区域 */
  area?: string;
  /** 国家 */
  country?: string;
  /** 维度类型 */
  dimensionType?: string;
  /**
   * 当日销量
   * @format int32
   */
  saleQtyDay?: number;
  /** 销量环比 */
  saleQtyMom?: number;
  /** 销量占比 */
  saleQtyProp?: number;
  /** 当日销售额 */
  salesAmountDay?: number;
  /** 销售额环比 */
  salesAmountMom?: number;
  /** 销售额占比 */
  salesAmountProp?: number;
}

/** SalesDayAreaTotalBean */
export interface SalesDayAreaTotalBean {
  /** 区域占比 */
  salesDayAreaList?: SalesDayAreaBean[];
  /** 总计 */
  salesDayAreaTotal?: SalesDayAreaBean;
}

/** SalesDayBean */
export interface SalesDayBean {
  /**
   * 当日销量
   * @format int32
   */
  saleQtyDay?: number;
  /**
   * 日销量差值
   * @format int32
   */
  saleQtyDayDiff?: number;
  /** 日销量增长率 */
  saleQtyDayRate?: number;
  /**
   * 当月销量
   * @format int32
   */
  saleQtyMonth?: number;
  /**
   * 月销量差值
   * @format int32
   */
  saleQtyMonthDiff?: number;
  /** 月销量增长率 */
  saleQtyMonthRate?: number;
  /** 当日销售额 */
  salesAmountDay?: number;
  /** 日销售额差值 */
  salesAmountDayDiff?: number;
  /** 日销售额增长率 */
  salesAmountDayRate?: number;
  /** 当月销售额 */
  salesAmountMonth?: number;
  /** 月销售额差值 */
  salesAmountMonthDiff?: number;
  /** 月销售额增长率 */
  salesAmountMonthRate?: number;
  /** 日趋势 */
  salesDayTrends?: SalesDayTrendBean[];
  /** 月趋势 */
  salesMonthTrends?: SalesDayTrendBean[];
}

/** SalesDayCategoryBean */
export interface SalesDayCategoryBean {
  /** 品类 */
  category?: string;
  /** 图片 */
  imageUrl?: string;
  /**
   * 当日销量
   * @format int32
   */
  saleQtyDay?: number;
  /** 销量环比 */
  saleQtyMom?: number;
  /** 销量占比 */
  saleQtyProp?: number;
  /** 当日销售额 */
  salesAmountDay?: number;
  /** 销售额环比 */
  salesAmountMom?: number;
  /** 销售额占比 */
  salesAmountProp?: number;
}

/** SalesDayCategoryTotalBean */
export interface SalesDayCategoryTotalBean {
  /** 区域占比 */
  salesDayCategoryList?: SalesDayCategoryBean[];
  /** 总计 */
  salesDayCategoryTotal?: SalesDayCategoryBean;
}

/** SalesDayPlatformBean */
export interface SalesDayPlatformBean {
  /** 渠道 */
  channel?: string;
  /** 维度类型 */
  dimensionType?: string;
  /** 平台 */
  platform?: string;
  /**
   * 当日销量
   * @format int32
   */
  saleQtyDay?: number;
  /** 销量环比 */
  saleQtyMom?: number;
  /** 销量占比 */
  saleQtyProp?: number;
  /** 当日销售额 */
  salesAmountDay?: number;
  /** 销售额环比 */
  salesAmountMom?: number;
  /** 销售额占比 */
  salesAmountProp?: number;
}

/** SalesDayPlatformTotalBean */
export interface SalesDayPlatformTotalBean {
  /** 平台占比 */
  salesDayPlatformList?: SalesDayPlatformBean[];
  /** 总计 */
  salesDayPlatformTotal?: SalesDayPlatformBean;
}

/** SalesDayRankBean */
export interface SalesDayRankBean {
  /** 渠道 */
  channel?: string;
  /** GTM 品线 */
  gtmProductLine?: string;
  /** 品线 */
  productLine?: string;
  /**
   * 当日销量
   * @format int32
   */
  saleQtyDay?: number;
  /** 当日销售额 */
  salesAmountDay?: number;
  /** 店铺 */
  shop?: string;
  /** SPU */
  spuName?: string;
}

/** SalesDayRankTotalBean */
export interface SalesDayRankTotalBean {
  /** 渠道排名 */
  salesDayRankChannelList?: SalesDayRankBean[];
  /** GTM品线排名 */
  salesDayRankGtmList?: SalesDayRankBean[];
  /** 品线排名 */
  salesDayRankProductLineList?: SalesDayRankBean[];
  /** 店铺排名 */
  salesDayRankShopList?: SalesDayRankBean[];
  /** SPU排名 */
  salesDayRankSpuList?: SalesDayRankBean[];
}

/** SalesDayTrendBean */
export interface SalesDayTrendBean {
  /** 日期 */
  date?: string;
  /**
   * 日销量
   * @format int32
   */
  saleQtyDay?: number;
  /** 销量环比 */
  saleQtyMom?: number;
  /**
   * 月销量
   * @format int32
   */
  saleQtyMonth?: number;
  /** 日销售额 */
  salesAmountDay?: number;
  /** 销售额环比 */
  salesAmountMom?: number;
  /** 月销售额 */
  salesAmountMonth?: number;
}

/** SalesDrillDownAnalysisBean */
export interface SalesDrillDownAnalysisBean {
  /** BY区域 */
  drillDownByArea?: SalesDrillDownBean[];
  /** BY品类 */
  drillDownByCategory?: SalesDrillDownBean[];
  /** BY国家 */
  drillDownByCountry?: SalesDrillDownBean[];
  /** BY平台 */
  drillDownByPlatform?: SalesDrillDownBean[];
}

/** SalesDrillDownBean */
export interface SalesDrillDownBean {
  /** 广告推广费 */
  adCost?: number;
  /** 广告推广费率 */
  adCostRate?: number;
  /** 亚马逊小类排名 */
  amazonCategoryRanking?: number;
  /** 区域 */
  area?: string;
  /** 标杆评分 */
  benchmarkScore?: number;
  /** 品类 */
  category?: string;
  /** 竞品退货率 */
  competitiveReturnRate?: number;
  /** 竞对评分 */
  competitiveScore?: number;
  /** 国家 */
  country?: string;
  defaultScoreLevel?: boolean;
  /**
   * 下钻维度类型。1:BY区域,2:BY国家,3:BY平台,4:BY品类
   * @format int32
   */
  dimensionType?: number;
  /** 毛利额 */
  grossProfitAmount?: number;
  /** 毛利额占比 */
  grossProfitAmountRate?: number;
  /** 毛利率 */
  grossProfitRate?: number;
  /** 库存周转天数 */
  inventoryTurnoverDays?: number;
  /** 主营业务收入 */
  mainBusinessIncome?: number;
  /** 主营业务收入占比 */
  mainBusinessIncomeRate?: number;
  /** 市占 */
  marketShare?: number;
  /** 平台 */
  platform?: string;
  /** 退款额 */
  refundAmount?: number;
  /** 退款率 */
  refundAmountRate?: number;
  /** 退货率 */
  returnRate?: number;
  /**
   * 销量
   * @format int32
   */
  saleQty?: number;
  /** 销量占比 */
  saleQtyRate?: number;
  /** 销售额 */
  salesAmount?: number;
  /** 销售额占比 */
  salesAmountRate?: number;
  /** 评分 */
  score?: number;
  /** 评分等级 */
  scoreLevel?: string;
  /** 评分趋势 */
  scoreTrendList?: TrendBean[];
  /** 商品名称 */
  spuName?: string;
  /** 垂类TOP3平均评分 */
  top3AvgScore?: number;
}

/** SalesMonthAnalysisResp */
export interface SalesMonthAnalysisResp {
  /** 销售概览 */
  coreIndicator?: CoreIndicatorBean;
  /** 区域销售 */
  salesMonthArea?: SalesMonthAreaTotalBean;
  /** 品类销售 */
  salesMonthCategory?: SalesMonthCategoryTotalBean;
  /** 平台销售 */
  salesMonthPlatform?: SalesMonthPlatformTotalBean;
  /** 品线销售 */
  salesMonthProductLine?: SalesMonthProductLineTotalBean;
  /** 销售趋势分析 */
  salesMonthTrendList?: MonthTrendBean[];
  /** 数据更新时间 */
  updateDate?: string;
}

/** SalesMonthAreaBean */
export interface SalesMonthAreaBean {
  /** 广告成本率 */
  adCostRate?: number;
  /** 广告成本率达成率 */
  adCostRateCompletionRate?: number;
  /** 广告成本率进度差值 */
  adCostRateDateProgressDiff?: number;
  /** 广告成本率环比增长率 */
  adCostRateMom?: number;
  /** 广告成本率同比增长率 */
  adCostRateYoy?: number;
  /** 区域 */
  area?: string;
  /** 预算广告成本率 */
  budgetAdCostRate?: number;
  /** 预算毛利金额 */
  budgetGrossProfitAmount?: number;
  /** 预算毛利率 */
  budgetGrossProfitRate?: number;
  /** 预算主营业务收入 */
  budgetMainBusinessIncome?: number;
  /** 预算销售金额 */
  budgetSalesAmount?: number;
  /** 国家 */
  country?: string;
  /** 维度类型 */
  dimensionType?: string;
  /** 实际毛利金额 */
  grossProfitAmount?: number;
  /** 毛利金额完成率 */
  grossProfitAmountCompletionRate?: number;
  /** 毛利金额进度差值 */
  grossProfitAmountDateProgressDiff?: number;
  /** 毛利金额环比增长率 */
  grossProfitAmountMom?: number;
  /** 毛利金额占比 */
  grossProfitAmountRate?: number;
  /** 毛利金额同比增长率 */
  grossProfitAmountYoy?: number;
  /** 毛利率 */
  grossProfitRate?: number;
  /** 毛利率达成率 */
  grossProfitRateCompletionRate?: number;
  /** 毛利率进度差值 */
  grossProfitRateDateProgressDiff?: number;
  /** 毛利率环比增长率 */
  grossProfitRateMom?: number;
  /** 毛利率同比增长率 */
  grossProfitRateYoy?: number;
  /** 实际主营业务收入 */
  mainBusinessIncome?: number;
  /** 主营业务收入完成率 */
  mainBusinessIncomeCompletionRate?: number;
  /** 主营业务进度差值 */
  mainBusinessIncomeDateProgressDiff?: number;
  /** 主营业务收入环比增长率 */
  mainBusinessIncomeMom?: number;
  /** 主营业务收入占比 */
  mainBusinessIncomeRate?: number;
  /** 主营业务收入同比增长率 */
  mainBusinessIncomeYoy?: number;
  /** 实际销售金额 */
  salesAmount?: number;
  /** 销售金额完成率 */
  salesAmountCompletionRate?: number;
  /** 销售金额与日期进度差异 */
  salesAmountDateProgressDiff?: number;
  /** 销售金额环比增长率 */
  salesAmountMom?: number;
  /** 销售金额占比 */
  salesAmountRate?: number;
  /** 销售金额同比增长率 */
  salesAmountYoy?: number;
}

/** SalesMonthAreaTotalBean */
export interface SalesMonthAreaTotalBean {
  /** 区域占比 */
  salesMonthAreaList?: SalesMonthAreaBean[];
  /** 总计 */
  salesMonthAreaTotal?: SalesMonthAreaBean;
}

/** SalesMonthCategoryBean */
export interface SalesMonthCategoryBean {
  /** 广告成本率 */
  adCostRate?: number;
  /** 广告成本率达成率 */
  adCostRateCompletionRate?: number;
  /** 广告成本率进度差值 */
  adCostRateDateProgressDiff?: number;
  /** 广告成本率环比增长率 */
  adCostRateMom?: number;
  /** 预算广告成本率 */
  budgetAdCostRate?: number;
  /** 预算毛利金额 */
  budgetGrossProfitAmount?: number;
  /** 预算毛利率 */
  budgetGrossProfitRate?: number;
  /** 预算主营业务收入 */
  budgetMainBusinessIncome?: number;
  /** 预算销售金额 */
  budgetSalesAmount?: number;
  /** 品类 */
  category?: string;
  /** 实际毛利金额 */
  grossProfitAmount?: number;
  /** 毛利金额完成率 */
  grossProfitAmountCompletionRate?: number;
  /** 毛利金额进度差值 */
  grossProfitAmountDateProgressDiff?: number;
  /** 毛利金额环比增长率 */
  grossProfitAmountMom?: number;
  /** 毛利金额占比 */
  grossProfitAmountRate?: number;
  /** 毛利率 */
  grossProfitRate?: number;
  /** 毛利率达成率 */
  grossProfitRateCompletionRate?: number;
  /** 毛利率进度差值 */
  grossProfitRateDateProgressDiff?: number;
  /** 毛利率环比增长率 */
  grossProfitRateMom?: number;
  /** 图片 */
  imageUrl?: string;
  /** 实际主营业务收入 */
  mainBusinessIncome?: number;
  /** 主营业务收入完成率 */
  mainBusinessIncomeCompletionRate?: number;
  /** 主营业务进度差值 */
  mainBusinessIncomeDateProgressDiff?: number;
  /** 主营业务收入环比增长率 */
  mainBusinessIncomeMom?: number;
  /** 主营业务收入占比 */
  mainBusinessIncomeRate?: number;
  /** 实际销售金额 */
  salesAmount?: number;
  /** 销售金额完成率 */
  salesAmountCompletionRate?: number;
  /** 销售金额与日期进度差异 */
  salesAmountDateProgressDiff?: number;
  /** 销售金额环比增长率 */
  salesAmountMom?: number;
  /** 销售金额占比 */
  salesAmountRate?: number;
}

/** SalesMonthCategoryTotalBean */
export interface SalesMonthCategoryTotalBean {
  /** 区域占比 */
  salesMonthCategoryList?: SalesMonthCategoryBean[];
  /** 总计 */
  salesMonthCategoryTotal?: SalesMonthAreaBean;
}

/** SalesMonthPlatformBean */
export interface SalesMonthPlatformBean {
  /** 广告成本率 */
  adCostRate?: number;
  /** 广告成本率环比增长率 */
  adCostRateMom?: number;
  /** 预算广告成本率 */
  budgetAdCostRate?: number;
  /** 预算毛利金额 */
  budgetGrossProfitAmount?: number;
  /** 预算毛利率 */
  budgetGrossProfitRate?: number;
  /** 预算主营业务收入 */
  budgetMainBusinessIncome?: number;
  /** 预算销售金额 */
  budgetSalesAmount?: number;
  /** 渠道 */
  channel?: string;
  /** 维度类型 */
  dimensionType?: string;
  /** 实际毛利金额 */
  grossProfitAmount?: number;
  /** 毛利金额完成率 */
  grossProfitAmountCompletionRate?: number;
  /** 毛利金额进度差值 */
  grossProfitAmountDateProgressDiff?: number;
  /** 毛利金额环比增长率 */
  grossProfitAmountMom?: number;
  /** 毛利金额占比 */
  grossProfitAmountRate?: number;
  /** 毛利率 */
  grossProfitRate?: number;
  /** 毛利率环比增长率 */
  grossProfitRateMom?: number;
  /** 实际主营业务收入 */
  mainBusinessIncome?: number;
  /** 主营业务收入完成率 */
  mainBusinessIncomeCompletionRate?: number;
  /** 主营业务进度差值 */
  mainBusinessIncomeDateProgressDiff?: number;
  /** 主营业务收入环比增长率 */
  mainBusinessIncomeMom?: number;
  /** 主营业务收入占比 */
  mainBusinessIncomeRate?: number;
  /** 平台 */
  platform?: string;
  /** 实际销售金额 */
  salesAmount?: number;
  /** 销售金额完成率 */
  salesAmountCompletionRate?: number;
  /** 销售金额进度差值 */
  salesAmountDateProgressDiff?: number;
  /** 销售金额环比增长率 */
  salesAmountMom?: number;
  /** 销售金额占比 */
  salesAmountRate?: number;
}

/** SalesMonthPlatformTotalBean */
export interface SalesMonthPlatformTotalBean {
  /** 平台占比 */
  salesMonthPlatformList?: SalesMonthPlatformBean[];
  /** 总计 */
  salesMonthPlatformTotal?: SalesMonthAreaBean;
}

/** SalesMonthProductLineBean */
export interface SalesMonthProductLineBean {
  /** 广告成本率 */
  adCostRate?: number;
  /** 广告成本率达成率 */
  adCostRateCompletionRate?: number;
  /** 广告成本率进度差值 */
  adCostRateDateProgressDiff?: number;
  /** 广告成本率环比增长率 */
  adCostRateMom?: number;
  /** 广告成本率同比增长率 */
  adCostRateYoy?: number;
  /** 预算广告成本率 */
  budgetAdCostRate?: number;
  /** 预算毛利金额 */
  budgetGrossProfitAmount?: number;
  /** 预算毛利率 */
  budgetGrossProfitRate?: number;
  /** 预算主营业务收入 */
  budgetMainBusinessIncome?: number;
  /** 预算销售金额 */
  budgetSalesAmount?: number;
  /** 实际毛利金额 */
  grossProfitAmount?: number;
  /** 毛利金额完成率 */
  grossProfitAmountCompletionRate?: number;
  /** 毛利金额进度差值 */
  grossProfitAmountDateProgressDiff?: number;
  /** 毛利金额环比增长率 */
  grossProfitAmountMom?: number;
  /** 毛利金额占比 */
  grossProfitAmountRate?: number;
  /** 毛利金额同比增长率 */
  grossProfitAmountYoy?: number;
  /** 毛利率 */
  grossProfitRate?: number;
  /** 毛利率达成率 */
  grossProfitRateCompletionRate?: number;
  /** 毛利率进度差值 */
  grossProfitRateDateProgressDiff?: number;
  /** 毛利率环比增长率 */
  grossProfitRateMom?: number;
  /** 毛利率同比增长率 */
  grossProfitRateYoy?: number;
  /** 图片 */
  imageUrl?: string;
  /** 实际主营业务收入 */
  mainBusinessIncome?: number;
  /** 主营业务收入完成率 */
  mainBusinessIncomeCompletionRate?: number;
  /** 主营业务进度差值 */
  mainBusinessIncomeDateProgressDiff?: number;
  /** 主营业务收入环比增长率 */
  mainBusinessIncomeMom?: number;
  /** 主营业务收入占比 */
  mainBusinessIncomeRate?: number;
  /** 主营业务收入同比增长率 */
  mainBusinessIncomeYoy?: number;
  /** 品线负责人 */
  productLeader?: string;
  /** 品线 */
  productLine?: string;
  /** 实际销售金额 */
  salesAmount?: number;
  /** 销售金额完成率 */
  salesAmountCompletionRate?: number;
  /** 销售金额与日期进度差异 */
  salesAmountDateProgressDiff?: number;
  /** 销售金额环比增长率 */
  salesAmountMom?: number;
  /** 销售金额占比 */
  salesAmountRate?: number;
  /** 销售金额同比增长率 */
  salesAmountYoy?: number;
  /** SPU名称 */
  spuName?: string;
}

/** SalesMonthProductLineTotalBean */
export interface SalesMonthProductLineTotalBean {
  /** 品线占比 */
  salesMonthProductLineList?: SalesMonthProductLineBean[];
  /** 总计 */
  salesMonthProductLineTotal?: SalesMonthAreaBean;
}

/** SalesTrandAnalysisBean */
export interface SalesTrandAnalysisBean {
  /** 本期数据 */
  currentValue?: number;
  /** 日期 */
  date?: string;
  /** 环比数据 */
  momValue?: number;
  /** 同比数据 */
  yoyValue?: number;
}

/** SalesTrendBean */
export interface SalesTrendBean {
  /** 客单价 */
  averageOrderAmountTrends?: AverageOrderAmountTrendBean[];
  /** 本年度 */
  currentYearTrends?: MonthTrendBean[];
  /** 近12个月 */
  last12MonthTrends?: MonthTrendBean[];
  /** 近6个月 */
  last6MonthTrends?: MonthTrendBean[];
  /** 上年度 */
  lastYearTrends?: MonthTrendBean[];
}

/** SalesWeekAnalysisResp */
export interface SalesWeekAnalysisResp {
  /** 分析结果 */
  analysisResult?: string;
  /** 区域销售 */
  salesWeekArea?: SalesWeekAreaTotalBean;
  /** 品类销售 */
  salesWeekCategory?: SalesWeekCategoryTotalBean;
  /** 平台销售 */
  salesWeekPlatform?: SalesWeekPlatformTotalBean;
  /** 品线销售 */
  salesWeekProductLine?: SalesWeekProductLineTotalBean;
  /** 销售概览 */
  salesWeekTotal?: SalesWeekBean;
  /** 销售趋势分析 */
  salesWeekTrendList?: SalesWeekTrendBean[];
  /** 数据更新时间 */
  updateDate?: string;
}

/** SalesWeekAreaBean */
export interface SalesWeekAreaBean {
  /** 当周广告成本率 */
  adCostRateWeek?: number;
  /** 当周广告费 */
  adCostWeek?: number;
  /** 区域 */
  area?: string;
  /** 国家 */
  country?: string;
  /** 维度类型 */
  dimensionType?: string;
  /** 当周折扣金额 */
  discountAmountWeek?: number;
  /** 当周折扣率 */
  discountRateWeek?: number;
  /** 当周毛利率 */
  grossProfitRateWeek?: number;
  /** 当周毛利润 */
  grossProfitWeek?: number;
  /** 毛利润周环比 */
  grossProfitWeekMom?: number;
  /** 当周主营业务收入 */
  mainBusinessIncomeWeek?: number;
  /** 主营业务收入周环比 */
  mainBusinessIncomeWeekMom?: number;
  /** 当周退款金额率 */
  refundAmountRateWeek?: number;
  /** 当周退款金额 */
  refundAmountWeek?: number;
  /**
   * 当周销量
   * @format int32
   */
  saleQtyWeek?: number;
  /** 销量周环比 */
  saleQtyWeekMom?: number;
  /** 当周销售额 */
  salesAmountWeek?: number;
  /** 销售额周环比 */
  salesAmountWeekMom?: number;
  /** 销售额占比 */
  salesAmountWeekProp?: number;
}

/** SalesWeekAreaTotalBean */
export interface SalesWeekAreaTotalBean {
  /** 区域占比 */
  salesWeekAreaList?: SalesWeekAreaBean[];
  /** 总计 */
  salesWeekAreaTotal?: SalesWeekAreaBean;
}

/** SalesWeekBean */
export interface SalesWeekBean {
  /** 当周广告成本率 */
  adCostRateWeek?: number;
  /** 广告成本率差值 */
  adCostRateWeekDiff?: number;
  /** 当周成交均价 */
  avgSalesAmountWeek?: number;
  /** 成交均价周环比 */
  avgSalesAmountWeekMom?: number;
  /** 当周折扣率 */
  discountRateWeek?: number;
  /** 折扣率差值 */
  discountRateWeekDiff?: number;
  /** 当周毛利率 */
  grossProfitRateWeek?: number;
  /** 毛利率差值 */
  grossProfitRateWeekDiff?: number;
  /** 当周毛利润 */
  grossProfitWeek?: number;
  /** 毛利润差值 */
  grossProfitWeekMom?: number;
  /** 当月主营业务收入 */
  mainBusinessIncomeMonth?: number;
  /** 月主营业务收入差值 */
  mainBusinessIncomeMonthDiff?: number;
  /** 月主营业务收入环比 */
  mainBusinessIncomeMonthMom?: number;
  /** 当周主营业务收入 */
  mainBusinessIncomeWeek?: number;
  /** 周主营业务收入差值 */
  mainBusinessIncomeWeekDiff?: number;
  /** 周主营业务收入环比 */
  mainBusinessIncomeWeekMom?: number;
  /** 当周退款金额率 */
  refundAmountRateWeek?: number;
  /** 退款金额率差值 */
  refundAmountRateWeekDiff?: number;
  /**
   * 当周销量
   * @format int32
   */
  saleQtyWeek?: number;
  /** 当月销售额 */
  salesAmountMonth?: number;
  /** 月销售额差值 */
  salesAmountMonthDiff?: number;
  /** 月销售额环比 */
  salesAmountMonthMom?: number;
  /** 当周销售额 */
  salesAmountWeek?: number;
  /** 周销售额差值 */
  salesAmountWeekDiff?: number;
  /** 周销售额环比 */
  salesAmountWeekMom?: number;
  /** 月趋势 */
  salesMonthTrends?: SalesWeekTrendBean[];
  /** 周趋势 */
  salesWeekTrends?: SalesWeekTrendBean[];
}

/** SalesWeekCategoryBean */
export interface SalesWeekCategoryBean {
  /** 当周广告成本率 */
  adCostRateWeek?: number;
  /** 当周广告费 */
  adCostWeek?: number;
  /** 品类 */
  category?: string;
  /** 当周折扣金额 */
  discountAmountWeek?: number;
  /** 当周折扣率 */
  discountRateWeek?: number;
  /** 当周毛利率 */
  grossProfitRateWeek?: number;
  /** 当周毛利润 */
  grossProfitWeek?: number;
  /** 毛利润周环比 */
  grossProfitWeekMom?: number;
  /** 图片 */
  imageUrl?: string;
  /** 当周主营业务收入 */
  mainBusinessIncomeWeek?: number;
  /** 主营业务收入周环比 */
  mainBusinessIncomeWeekMom?: number;
  /** 当周退款金额率 */
  refundAmountRateWeek?: number;
  /** 当周退款金额 */
  refundAmountWeek?: number;
  /**
   * 当周销量
   * @format int32
   */
  saleQtyWeek?: number;
  /** 销量周环比 */
  saleQtyWeekMom?: number;
  /** 当周销售额 */
  salesAmountWeek?: number;
  /** 销售额周环比 */
  salesAmountWeekMom?: number;
  /** 销售额占比 */
  salesAmountWeekProp?: number;
}

/** SalesWeekCategoryTotalBean */
export interface SalesWeekCategoryTotalBean {
  /** 区域占比 */
  salesWeekCategoryList?: SalesWeekCategoryBean[];
  /** 总计 */
  salesWeekCategoryTotal?: SalesWeekAreaBean;
}

/** SalesWeekPlatformBean */
export interface SalesWeekPlatformBean {
  /** 当周广告成本率 */
  adCostRateWeek?: number;
  /** 当周广告费 */
  adCostWeek?: number;
  /** 渠道 */
  channel?: string;
  /** 维度类型 */
  dimensionType?: string;
  /** 当周折扣金额 */
  discountAmountWeek?: number;
  /** 当周折扣率 */
  discountRateWeek?: number;
  /** 当周毛利率 */
  grossProfitRateWeek?: number;
  /** 当周毛利润 */
  grossProfitWeek?: number;
  /** 毛利润周环比 */
  grossProfitWeekMom?: number;
  /** 当周主营业务收入 */
  mainBusinessIncomeWeek?: number;
  /** 主营业务收入周环比 */
  mainBusinessIncomeWeekMom?: number;
  /** 平台 */
  platform?: string;
  /** 当周退款金额率 */
  refundAmountRateWeek?: number;
  /** 当周退款金额 */
  refundAmountWeek?: number;
  /**
   * 当周销量
   * @format int32
   */
  saleQtyWeek?: number;
  /** 销量周环比 */
  saleQtyWeekMom?: number;
  /** 当周销售额 */
  salesAmountWeek?: number;
  /** 销售额周环比 */
  salesAmountWeekMom?: number;
  /** 销售额占比 */
  salesAmountWeekProp?: number;
}

/** SalesWeekPlatformTotalBean */
export interface SalesWeekPlatformTotalBean {
  /** 平台占比 */
  salesWeekPlatformList?: SalesWeekPlatformBean[];
  /** 总计 */
  salesWeekPlatformTotal?: SalesWeekAreaBean;
}

/** SalesWeekProductLineBean */
export interface SalesWeekProductLineBean {
  /** 当周广告成本率 */
  adCostRateWeek?: number;
  /** 当周广告费 */
  adCostWeek?: number;
  /** 当周折扣金额 */
  discountAmountWeek?: number;
  /** 当周折扣率 */
  discountRateWeek?: number;
  /** 当周毛利率 */
  grossProfitRateWeek?: number;
  /** 当周毛利润 */
  grossProfitWeek?: number;
  /** 毛利润周环比 */
  grossProfitWeekMom?: number;
  /** 毛利润同比 */
  grossProfitWeekYoy?: number;
  /** 图片 */
  imageUrl?: string;
  /** 当周主营业务收入 */
  mainBusinessIncomeWeek?: number;
  /** 主营业务收入周环比 */
  mainBusinessIncomeWeekMom?: number;
  /** 主营业务收入同比 */
  mainBusinessIncomeWeekYoy?: number;
  /** 品线负责人 */
  productLeader?: string;
  /** 品线 */
  productLine?: string;
  /** 当周退款金额率 */
  refundAmountRateWeek?: number;
  /** 当周退款金额 */
  refundAmountWeek?: number;
  /**
   * 当周销量
   * @format int32
   */
  saleQtyWeek?: number;
  /** 销量周环比 */
  saleQtyWeekMom?: number;
  /** 销量同比 */
  saleQtyWeekYoy?: number;
  /** 当周销售额 */
  salesAmountWeek?: number;
  /** 销售额周环比 */
  salesAmountWeekMom?: number;
  /** 销售额占比 */
  salesAmountWeekProp?: number;
  /** 销售额同比 */
  salesAmountWeekYoy?: number;
  /** SPU名称 */
  spuName?: string;
}

/** SalesWeekProductLineTotalBean */
export interface SalesWeekProductLineTotalBean {
  /** 品线占比 */
  salesWeekProductLineList?: SalesWeekProductLineBean[];
  /** 总计 */
  salesWeekProductLineTotal?: SalesWeekAreaBean;
}

/** SalesWeekTrendBean */
export interface SalesWeekTrendBean {
  /** 周广告成本率 */
  adCostRateWeek?: number;
  /** 广告成本率周环比 */
  adCostRateWeekMom?: number;
  /** 周期 */
  date?: string;
  /** 周毛利率 */
  grossProfitRateWeek?: number;
  /** 毛利率周环比 */
  grossProfitRateWeekMom?: number;
  /** 周毛利额 */
  grossProfitWeek?: number;
  /** 毛利额周环比 */
  grossProfitWeekMom?: number;
  /** 周主营业务收入 */
  mainBusinessIncomeWeek?: number;
  /** 周主营业务收入环比 */
  mainBusinessIncomeWeekMom?: number;
  /** 周销售额 */
  salesAmountWeek?: number;
  /** 周销售额环比 */
  salesAmountWeekMom?: number;
}

/** SalesYearAnalysisResp */
export interface SalesYearAnalysisResp {
  /** 区域销售 */
  salesYearArea?: SalesYearAreaTotalBean;
  /** 品类销售 */
  salesYearCategory?: SalesYearCategoryTotalBean;
  /** 平台销售 */
  salesYearPlatform?: SalesYearPlatformTotalBean;
  /** 品线销售 */
  salesYearProductLine?: SalesYearProductLineTotalBean;
  /** 销售概览 */
  salesYearTotal?: SalesYearBean;
  /** 销售趋势分析 */
  salesYearTrendList?: SalesYearTrendBean[];
  /** 数据更新时间 */
  updateDate?: string;
}

/** SalesYearAreaBean */
export interface SalesYearAreaBean {
  /** 广告成本率 */
  adCostRate?: number;
  /** 广告成本率达成率 */
  adCostRateCompletionRate?: number;
  /** 广告成本率进度差值 */
  adCostRateDateProgressDiff?: number;
  /** 广告成本率环比增长率 */
  adCostRateMom?: number;
  /** 广告成本率同比增长率 */
  adCostRateYoy?: number;
  /** 区域 */
  area?: string;
  /** 预算广告成本率 */
  budgetAdCostRate?: number;
  /** 预算毛利金额 */
  budgetGrossProfitAmount?: number;
  /** 预算毛利率 */
  budgetGrossProfitRate?: number;
  /** 预算主营业务收入 */
  budgetMainBusinessIncome?: number;
  /** 预算销售金额 */
  budgetSalesAmount?: number;
  /** 国家 */
  country?: string;
  /** 维度类型 */
  dimensionType?: string;
  /** 实际毛利金额 */
  grossProfitAmount?: number;
  /** 毛利金额完成率 */
  grossProfitAmountCompletionRate?: number;
  /** 毛利金额进度差值 */
  grossProfitAmountDateProgressDiff?: number;
  /** 毛利金额环比增长率 */
  grossProfitAmountMom?: number;
  /** 毛利金额占比 */
  grossProfitAmountRate?: number;
  /** 毛利金额同比增长率 */
  grossProfitAmountYoy?: number;
  /** 毛利率 */
  grossProfitRate?: number;
  /** 毛利率达成率 */
  grossProfitRateCompletionRate?: number;
  /** 毛利率进度差值 */
  grossProfitRateDateProgressDiff?: number;
  /** 毛利率环比增长率 */
  grossProfitRateMom?: number;
  /** 毛利率同比增长率 */
  grossProfitRateYoy?: number;
  /** 实际主营业务收入 */
  mainBusinessIncome?: number;
  /** 主营业务收入完成率 */
  mainBusinessIncomeCompletionRate?: number;
  /** 主营业务进度差值 */
  mainBusinessIncomeDateProgressDiff?: number;
  /** 主营业务收入环比增长率 */
  mainBusinessIncomeMom?: number;
  /** 主营业务收入占比 */
  mainBusinessIncomeRate?: number;
  /** 主营业务收入同比增长率 */
  mainBusinessIncomeYoy?: number;
  /** 实际销售金额 */
  salesAmount?: number;
  /** 销售金额完成率 */
  salesAmountCompletionRate?: number;
  /** 销售金额与日期进度差异 */
  salesAmountDateProgressDiff?: number;
  /** 销售金额环比增长率 */
  salesAmountMom?: number;
  /** 销售金额占比 */
  salesAmountRate?: number;
  /** 销售金额同比增长率 */
  salesAmountYoy?: number;
}

/** SalesYearAreaTotalBean */
export interface SalesYearAreaTotalBean {
  /** 区域占比 */
  salesYearAreaList?: SalesYearAreaBean[];
  /** 总计 */
  salesYearAreaTotal?: SalesYearAreaBean;
}

/** SalesYearBean */
export interface SalesYearBean {
  /** 实际广告成本率 */
  actualAdCostRate?: number;
  /** 实际平均销售金额 */
  actualAvgSalesAmount?: number;
  /** 实际折扣金额率 */
  actualDiscountAmountRate?: number;
  /** 实际GTM毛利 */
  actualGtmGrossProfit?: number;
  /** 实际GTM毛利率 */
  actualGtmGrossProfitRate?: number;
  /** 实际主营业务收入 */
  actualMainBusinessIncome?: number;
  /** 实际退款金额率 */
  actualRefundAmountRate?: number;
  /** 实际销售金额 */
  actualSalesAmount?: number;
  /** 广告成本率差异 */
  adCostRateDiff?: number;
  /** 广告成本率环比增长率 */
  adCostRateMom?: number;
  /** 平均销售金额达成率 */
  avgSalesAmountCompletionRate?: number;
  /** 平均销售金额环比增长率 */
  avgSalesAmountMom?: number;
  /** 预算广告成本率 */
  budgetAdCostRate?: number;
  /** 预算平均销售金额 */
  budgetAvgSalesAmount?: number;
  /** 预算折扣金额率 */
  budgetDiscountAmountRate?: number;
  /** 预算GTM毛利 */
  budgetGtmGrossProfit?: number;
  /** 预算GTM毛利率 */
  budgetGtmGrossProfitRate?: number;
  /** 预算主营业务收入 */
  budgetMainBusinessIncome?: number;
  /** 预算退款金额率 */
  budgetRefundAmountRate?: number;
  /** 预算销售金额 */
  budgetSalesAmount?: number;
  /** 折扣金额率差异 */
  discountAmountRateDiff?: number;
  /** 折扣金额率环比增长率 */
  discountAmountRateMom?: number;
  /** GTM毛利完成率 */
  gtmGrossProfitCompletionRate?: number;
  /** GTM毛利环比增长率 */
  gtmGrossProfitMom?: number;
  /** GTM毛利率差异 */
  gtmGrossProfitRateDiff?: number;
  /** GTM毛利率环比增长率 */
  gtmGrossProfitRateMom?: number;
  /** 主营业务收入完成率 */
  mainBusinessIncomeCompletionRate?: number;
  /** 营业收入健康度 */
  mainBusinessIncomeHealthLevel?: string;
  /** 主营业务收入环比增长率 */
  mainBusinessIncomeMom?: number;
  /** 退款金额率差异 */
  refundAmountRateDiff?: number;
  /** 退款金额率环比增长率 */
  refundAmountRateMom?: number;
  /** 销售金额完成率 */
  salesAmountCompletionRate?: number;
  /** 销售额健康度 */
  salesAmountHealthLevel?: string;
  /** 销售金额环比增长率 */
  salesAmountMom?: number;
  /** 年趋势 */
  salesYearTrends?: SalesYearTrendBean[];
}

/** SalesYearCategoryBean */
export interface SalesYearCategoryBean {
  /** 广告成本率 */
  adCostRate?: number;
  /** 广告成本率达成率 */
  adCostRateCompletionRate?: number;
  /** 广告成本率进度差值 */
  adCostRateDateProgressDiff?: number;
  /** 广告成本率环比增长率 */
  adCostRateMom?: number;
  /** 预算广告成本率 */
  budgetAdCostRate?: number;
  /** 预算毛利金额 */
  budgetGrossProfitAmount?: number;
  /** 预算毛利率 */
  budgetGrossProfitRate?: number;
  /** 预算主营业务收入 */
  budgetMainBusinessIncome?: number;
  /** 预算销售金额 */
  budgetSalesAmount?: number;
  /** 品类 */
  category?: string;
  /** 实际毛利金额 */
  grossProfitAmount?: number;
  /** 毛利金额完成率 */
  grossProfitAmountCompletionRate?: number;
  /** 毛利金额进度差值 */
  grossProfitAmountDateProgressDiff?: number;
  /** 毛利金额环比增长率 */
  grossProfitAmountMom?: number;
  /** 毛利金额占比 */
  grossProfitAmountRate?: number;
  /** 毛利率 */
  grossProfitRate?: number;
  /** 毛利率达成率 */
  grossProfitRateCompletionRate?: number;
  /** 毛利率进度差值 */
  grossProfitRateDateProgressDiff?: number;
  /** 毛利率环比增长率 */
  grossProfitRateMom?: number;
  /** 图片 */
  imageUrl?: string;
  /** 实际主营业务收入 */
  mainBusinessIncome?: number;
  /** 主营业务收入完成率 */
  mainBusinessIncomeCompletionRate?: number;
  /** 主营业务进度差值 */
  mainBusinessIncomeDateProgressDiff?: number;
  /** 主营业务收入环比增长率 */
  mainBusinessIncomeMom?: number;
  /** 主营业务收入占比 */
  mainBusinessIncomeRate?: number;
  /** 实际销售金额 */
  salesAmount?: number;
  /** 销售金额完成率 */
  salesAmountCompletionRate?: number;
  /** 销售金额与日期进度差异 */
  salesAmountDateProgressDiff?: number;
  /** 销售金额环比增长率 */
  salesAmountMom?: number;
  /** 销售金额占比 */
  salesAmountRate?: number;
}

/** SalesYearCategoryTotalBean */
export interface SalesYearCategoryTotalBean {
  /** 区域占比 */
  salesYearCategoryList?: SalesYearCategoryBean[];
  /** 总计 */
  salesYearCategoryTotal?: SalesYearAreaBean;
}

/** SalesYearPlatformBean */
export interface SalesYearPlatformBean {
  /** 广告成本率 */
  adCostRate?: number;
  /** 广告成本率环比增长率 */
  adCostRateMom?: number;
  /** 预算广告成本率 */
  budgetAdCostRate?: number;
  /** 预算毛利金额 */
  budgetGrossProfitAmount?: number;
  /** 预算毛利率 */
  budgetGrossProfitRate?: number;
  /** 预算主营业务收入 */
  budgetMainBusinessIncome?: number;
  /** 预算销售金额 */
  budgetSalesAmount?: number;
  /** 渠道 */
  channel?: string;
  /** 维度类型 */
  dimensionType?: string;
  /** 实际毛利金额 */
  grossProfitAmount?: number;
  /** 毛利金额完成率 */
  grossProfitAmountCompletionRate?: number;
  /** 毛利金额进度差值 */
  grossProfitAmountDateProgressDiff?: number;
  /** 毛利金额环比增长率 */
  grossProfitAmountMom?: number;
  /** 毛利金额占比 */
  grossProfitAmountRate?: number;
  /** 毛利率 */
  grossProfitRate?: number;
  /** 毛利率环比增长率 */
  grossProfitRateMom?: number;
  /** 实际主营业务收入 */
  mainBusinessIncome?: number;
  /** 主营业务收入完成率 */
  mainBusinessIncomeCompletionRate?: number;
  /** 主营业务进度差值 */
  mainBusinessIncomeDateProgressDiff?: number;
  /** 主营业务收入环比增长率 */
  mainBusinessIncomeMom?: number;
  /** 主营业务收入占比 */
  mainBusinessIncomeRate?: number;
  /** 平台 */
  platform?: string;
  /** 实际销售金额 */
  salesAmount?: number;
  /** 销售金额完成率 */
  salesAmountCompletionRate?: number;
  /** 销售金额与日期进度差异 */
  salesAmountDateProgressDiff?: number;
  /** 销售金额环比增长率 */
  salesAmountMom?: number;
  /** 销售金额占比 */
  salesAmountRate?: number;
}

/** SalesYearPlatformTotalBean */
export interface SalesYearPlatformTotalBean {
  /** 平台占比 */
  salesYearPlatformList?: SalesYearPlatformBean[];
  /** 总计 */
  salesYearPlatformTotal?: SalesYearAreaBean;
}

/** SalesYearProductLineBean */
export interface SalesYearProductLineBean {
  /** 广告成本率 */
  adCostRate?: number;
  /** 广告成本率达成率 */
  adCostRateCompletionRate?: number;
  /** 广告成本率进度差值 */
  adCostRateDateProgressDiff?: number;
  /** 广告成本率同比增长率 */
  adCostRateMYoy?: number;
  /** 广告成本率环比增长率 */
  adCostRateMom?: number;
  /** 预算广告成本率 */
  budgetAdCostRate?: number;
  /** 预算毛利金额 */
  budgetGrossProfitAmount?: number;
  /** 预算毛利率 */
  budgetGrossProfitRate?: number;
  /** 预算主营业务收入 */
  budgetMainBusinessIncome?: number;
  /** 预算销售金额 */
  budgetSalesAmount?: number;
  /** 实际毛利金额 */
  grossProfitAmount?: number;
  /** 毛利金额完成率 */
  grossProfitAmountCompletionRate?: number;
  /** 毛利金额进度差值 */
  grossProfitAmountDateProgressDiff?: number;
  /** 毛利金额环比增长率 */
  grossProfitAmountMom?: number;
  /** 毛利金额占比 */
  grossProfitAmountRate?: number;
  /** 毛利金额同比增长率 */
  grossProfitAmountYoy?: number;
  /** 毛利率 */
  grossProfitRate?: number;
  /** 毛利率达成率 */
  grossProfitRateCompletionRate?: number;
  /** 毛利率进度差值 */
  grossProfitRateDateProgressDiff?: number;
  /** 毛利率环比增长率 */
  grossProfitRateMom?: number;
  /** 毛利率同比增长率 */
  grossProfitRateYoy?: number;
  /** 图片 */
  imageUrl?: string;
  /** 实际主营业务收入 */
  mainBusinessIncome?: number;
  /** 主营业务收入完成率 */
  mainBusinessIncomeCompletionRate?: number;
  /** 主营业务进度差值 */
  mainBusinessIncomeDateProgressDiff?: number;
  /** 主营业务收入环比增长率 */
  mainBusinessIncomeMom?: number;
  /** 主营业务收入占比 */
  mainBusinessIncomeRate?: number;
  /** 主营业务收入同比增长率 */
  mainBusinessIncomeYoy?: number;
  /** 品线负责人 */
  productLeader?: string;
  /** 品线 */
  productLine?: string;
  /** 实际销售金额 */
  salesAmount?: number;
  /** 销售金额完成率 */
  salesAmountCompletionRate?: number;
  /** 销售金额与日期进度差异 */
  salesAmountDateProgressDiff?: number;
  /** 销售金额环比增长率 */
  salesAmountMom?: number;
  /** 销售金额占比 */
  salesAmountRate?: number;
  /** 销售金额同比增长率 */
  salesAmountYoy?: number;
  /** SPU名称 */
  spuName?: string;
}

/** SalesYearProductLineTotalBean */
export interface SalesYearProductLineTotalBean {
  /** 区域占比 */
  salesYearProductLineList?: SalesYearProductLineBean[];
  /** 总计 */
  salesYearProductLineTotal?: SalesYearAreaBean;
}

/** SalesYearTrendBean */
export interface SalesYearTrendBean {
  /** 广告费率 */
  adCostRate?: number;
  /** 广告费率差值 */
  adCostRateDiff?: number;
  /** 目标广告费率 */
  budgetAdCostRate?: number;
  /** 目标毛利额 */
  budgetGrossProfitAmount?: number;
  /** 目标毛利率 */
  budgetGrossProfitRate?: number;
  /** 目标营业收入 */
  budgetMainBusinessIncome?: number;
  /** 目标销售额 */
  budgetSalesAmount?: number;
  /** 毛利额 */
  grossProfitAmount?: number;
  /** 毛利额达成率 */
  grossProfitAmountCompletionRate?: number;
  /** 毛利额环比 */
  grossProfitAmountMom?: number;
  /** 毛利率 */
  grossProfitRate?: number;
  /** 毛利率差值 */
  grossProfitRateDiff?: number;
  /** 营业收入 */
  mainBusinessIncome?: number;
  /** 营业收入达成率 */
  mainBusinessIncomeCompletionRate?: number;
  /** 月份 */
  month?: string;
  /** 退款率 */
  refundAmountRate?: number;
  /** 销售额 */
  salesAmount?: number;
  /** 销售额达成率 */
  salesAmountCompletionRate?: number;
  /** 销售额环比 */
  salesAmountMom?: number;
  /** 年 */
  year?: string;
}

/** SaveAnalysisResultReq */
export interface SaveAnalysisResultReq {
  /** 分析结果 */
  analysisResult?: string;
  /** 分析类型 */
  analysisType?: string;
  /** 区域权限 */
  areaPermissionList?: string[];
  /** 品类权限 */
  categoryPermissionList?: string[];
  controlPermission?: boolean;
  /** 国家权限 */
  countryPermissionList?: string[];
  /** 产品经理权限 */
  developerNamePermissionList?: string[];
  /** 权限组 */
  dpGroupCodeList?: string[];
  /** GTM组权限 */
  gtmProductLinePermissionList?: string[];
  /** 月份 */
  month?: string;
  /** 平台权限 */
  platformPermissionList?: string[];
  /** 产品品线权限 */
  productLinePermissionList?: string[];
  /** 店铺权限 */
  shopPermissionList?: string[];
}

/** SentimentPropBean */
export interface SentimentPropBean {
  /**
   * 销量
   * @format int32
   */
  salesQty?: number;
  /** 情感类型 */
  sentiment?: string;
  /** 情感类型销量占比 */
  sentimentSalesQtyRate?: number;
  /** 情感类型VOC量占比 */
  sentimentVocRate?: number;
  /**
   * VOC量
   * @format int32
   */
  vocCnt?: number;
  /** VOC占比率 */
  vocRate?: number;
}

/** SentimentTag */
export interface SentimentTag {
  /**
   * 负向数量
   * @format int64
   */
  negativeCount?: number;
  /**
   * 正向数量
   * @format int64
   */
  positiveCount?: number;
  /** 标签名称 */
  tagName?: string;
}

/** ShopifyTrafficAnalysisBean */
export interface ShopifyTrafficAnalysisBean {
  /** 加购率 */
  addToCartRate?: number;
  /** 加购率环比 */
  addToCartRateMom?: number;
  /** 加购率同比 */
  addToCartRateYoy?: number;
  /** 加购会话数 */
  addToCartSessions?: number;
  /** 加购会话数环比 */
  addToCartSessionsMom?: number;
  /** 加购会话数同比 */
  addToCartSessionsYoy?: number;
  /** 点击率 */
  clickThroughRate?: number;
  /** 点击率环比 */
  clickThroughRateMom?: number;
  /** 点击率同比 */
  clickThroughRateYoy?: number;
  /** 转化率 */
  conversionRate?: number;
  /** 转化率环比 */
  conversionRateMom?: number;
  /** 转化率同比 */
  conversionRateYoy?: number;
  /** 页面浏览量环比 */
  pageViewsMom?: number;
  /** 页面浏览量同比 */
  pageViewsYoy?: number;
  /** 会话数环比 */
  sessionsMom?: number;
  /** 会话数同比 */
  sessionsYoy?: number;
  /** 总页面浏览量 */
  totalPageViews?: number;
  /** 总会话数 */
  totalSessions?: number;
  /** 访问用户数 */
  totalUsers?: number;
  /** 访问用户数环比 */
  usersMom?: number;
  /** 访问用户数同比 */
  usersYoy?: number;
}

/** SkuModelNamePropBean */
export interface SkuModelNamePropBean {
  /**
   * 销量-环比时间
   * @format int32
   */
  salesQtyGrowthDate?: number;
  /**
   * 销量-当期（周/月/季）
   * @format int32
   */
  salesQtyLastWeek?: number;
  /** 客服型号 */
  skuModelNameVoc?: string;
  /**
   * VOC量-环比增长量
   * @format int32
   */
  vocCntGrowth?: number;
  /**
   * VOC量-环比时间
   * @format int32
   */
  vocCntGrowthDate?: number;
  /**
   * VOC量-当期（周/月/季）
   * @format int32
   */
  vocCntLastWeek?: number;
  /** VOC量-环比增长率 */
  vocRateGrowth?: number;
  /** VOC占比率-当期（周/月/季） */
  vocRateLastWeek?: number;
}

/** SortCondition */
export interface SortCondition {
  /**
   * 排序方向
   * @example "ASC,DESC"
   */
  direction?: string;
  /** 字段名 */
  fieldName?: string;
}

/** SpuBean */
export interface SpuBean {
  code?: string;
  name?: string;
}

/** SpuNamePropBean */
export interface SpuNamePropBean {
  /**
   * 销量-环比时间
   * @format int32
   */
  salesQtyGrowthDate?: number;
  /**
   * 销量-当期（周/月/季）
   * @format int32
   */
  salesQtyLastWeek?: number;
  /** 客服型号 */
  spuName?: string;
  /**
   * VOC量-环比增长量
   * @format int32
   */
  vocCntGrowth?: number;
  /**
   * VOC量-环比时间
   * @format int32
   */
  vocCntGrowthDate?: number;
  /**
   * VOC量-当期（周/月/季）
   * @format int32
   */
  vocCntLastWeek?: number;
  /** VOC量-环比增长率 */
  vocRateGrowth?: number;
  /** VOC占比率-当期（周/月/季） */
  vocRateLastWeek?: number;
}

/** SpuNameProportionBean */
export interface SpuNameProportionBean {
  /**
   * 销量平均值
   * @format int32
   */
  avgSalesQty?: number;
  /**
   * VOC量平均值
   * @format int32
   */
  avgVocCnt?: number;
  /** SPU名称销量占比 */
  productLineSalesQtyRate?: number;
  /** SPU名称VOC量占比 */
  productLineVocRate?: number;
  /**
   * 销量
   * @format int32
   */
  salesQty?: number;
  /** SPU名称 */
  spuName?: string;
  /**
   * VOC量
   * @format int32
   */
  vocCnt?: number;
  /** VOC占比率 */
  vocRate?: number;
}

/** SpuReturnRateBean */
export interface SpuReturnRateBean {
  /** 平均退货率 */
  avgReturnRate?: number;
  /** 月份 */
  month?: string;
  /** 退货率 */
  returnRate?: number;
  /** 销量 */
  saleQty?: number;
  /** SPU */
  spuName?: string;
}

/** SpuSalesAnalysisBean */
export interface SpuSalesAnalysisBean {
  /** 毛利额 */
  actualGtmGrossProfit?: number;
  /** 毛利率 */
  actualGtmGrossProfitRate?: number;
  /** 退款率 */
  actualRefundAmountRate?: number;
  /** 销售额 */
  actualSalesAmount?: number;
  /** 毛利额目标 */
  budgetGtmGrossProfit?: number;
  /** 毛利额目标 */
  budgetGtmGrossProfitRate?: number;
  /** 退款率目标 */
  budgetRefundAmountRate?: number;
  /** 销售额目标 */
  budgetSalesAmount?: number;
  /** 毛利额达成率 */
  gtmGrossProfitCompletionRate?: number;
  /** 毛利额差值 */
  gtmGrossProfitDiff?: number;
  /** GTM毛利额健康度 */
  gtmGrossProfitHealthLevel?: string;
  /** 毛利额差值 */
  gtmGrossProfitRateDiff?: number;
  /** 退款率差值 */
  refundAmountRateDiff?: number;
  /**
   * 销量
   * @format int64
   */
  saleQty?: number;
  /** 销售额 */
  salesAmount?: number;
  /** 销售额达成率 */
  salesAmountCompletionRate?: number;
  /** 销售额差值 */
  salesAmountDiff?: number;
  /** 销售额健康度 */
  salesAmountHealthLevel?: string;
  /** 销售额占比 */
  salesAmountProp?: number;
  /** SPU编码 */
  spuCode?: string;
  /** SPU图片 */
  spuImg?: string;
  /** SPU名称 */
  spuName?: string;
}

/** SpuVocRateBean */
export interface SpuVocRateBean {
  /**
   * 累计VOC量
   * @format int64
   */
  cumulativeVocQty?: number;
  /** 累计VOC率 */
  cumulativeVocRate?: number;
  /** VOC率趋势 */
  list?: NewProductVocRateBean[];
  /** SPU名称 */
  spuName?: string;
}

/** StarRatingDistribution */
export interface StarRatingDistribution {
  /** 星级分布列表 */
  distributionList?: StarRatingItem[];
}

/** StarRatingItem */
export interface StarRatingItem {
  /** 占比（百分比） */
  proportion?: number;
  /**
   * Review数量
   * @format int64
   */
  reviewCount?: number;
  /**
   * 星级（1-5）
   * @format int32
   */
  star?: number;
}

/** SupplyChainAnalysisBean */
export interface SupplyChainAnalysisBean {
  /** 整体库存周转天数（总库存/日均销量） */
  inventoryTurnoverDay?: number;
  /** 库存周转天数环比变化率 */
  inventoryTurnoverDayMom?: number;
  /** 库存周转天数同比变化率 */
  inventoryTurnoverDayYoy?: number;
  /** 标签分析 */
  labelList?: SupplyChainLabelAnalysisBean[];
  /** 标签趋势分析 */
  labelTrendList?: LabelTrendAnalysisBean[];
  /** 低库存商品总库存（海外仓+平台仓） */
  lowInventoryStockQty?: number;
  /** 低库存商品环比增长率 */
  lowInventoryStockQtyMom?: number;
  /** 低库存商品同比增长率 */
  lowInventoryStockQtyYoy?: number;
  /** 海外仓总库存数量 */
  overseasWarehouseTotalStockQty?: number;
  /** 海外仓库存数量环比增长率 */
  overseasWarehouseTotalStockQtyMom?: number;
  /** 海外仓库存数量同比增长率 */
  overseasWarehouseTotalStockQtyYoy?: number;
  /** 周期 */
  period?: string;
  /** 平台仓总库存数量 */
  platformWarehouseTotalStockQty?: number;
  /** 平台仓库存数量环比增长率 */
  platformWarehouseTotalStockQtyMom?: number;
  /** 平台仓库存数量同比增长率 */
  platformWarehouseTotalStockQtyYoy?: number;
  /** 总库存数量 */
  totalStockQty?: number;
  /** 总库存数量环比增长率 */
  totalStockQtyMom?: number;
  /** 总库存数量同比增长率 */
  totalStockQtyYoy?: number;
  /** 趋势分析 */
  trendList?: SupplyChainTrendAnalysisBean[];
  /** 滞销商品总库存（海外仓+平台仓） */
  unsalableInventoryStockQty?: number;
  /** 滞销商品环比增长率 */
  unsalableInventoryStockQtyMom?: number;
  /** 滞销商品同比增长率 */
  unsalableInventoryStockQtyYoy?: number;
}

/** SupplyChainLabelAnalysisBean */
export interface SupplyChainLabelAnalysisBean {
  /** 库存标签（未售出/低库存/常规/滞销） */
  inventoryLabel?: string;
  /** 周期 */
  period?: string;
  /** 平均日销量 */
  saleQty?: number;
  /** 总库存数量 */
  totalStockQty?: number;
  /** 总库存数量占比 */
  totalStockQtyRate?: number;
}

/** SupplyChainTrendAnalysisBean */
export interface SupplyChainTrendAnalysisBean {
  /** 整体库存周转天数（总库存/日均销量） */
  inventoryTurnoverDay?: number;
  /** 低库存商品总库存（平台仓+海外仓） */
  lowInventoryStockQty?: number;
  /** 海外仓总库存数量 */
  overseasWarehouseTotalStockQty?: number;
  /** 周期 */
  period?: string;
  /** 平台仓总库存数量 */
  platformWarehouseTotalStockQty?: number;
  /** 总库存数量 */
  totalStockQty?: number;
  /** 滞销商品总库存（平台仓+中仓） */
  unsalableInventoryStockQty?: number;
}

/** TagCloudBean */
export interface TagCloudBean {
  /**
   * 数量
   * @format int32
   */
  qty?: number;
  /** 标签名称 */
  tagName?: string;
  /** 标签权重 */
  weight?: number;
}

/** TagDistributionItem */
export interface TagDistributionItem {
  accumulatedRatio?: number;
  /**
   * 数量
   * @format int64
   */
  count?: number;
  /** 占比（百分比） */
  proportion?: number;
  /** 标签名称 */
  tagName?: string;
}

/** TagLevelDetailItem */
export interface TagLevelDetailItem {
  accumulatedRatio?: number;
  /**
   * 数量
   * @format int64
   */
  count?: number;
  /** 占比（百分比） */
  proportion?: number;
  /** 标签名称 */
  tagName?: string;
}

/**
 * TagTrendBean
 * 问题标签趋势
 */
export interface TagTrendBean {
  /** 月份 */
  month?: string;
  /**
   * 排名
   * @format int32
   */
  rk?: number;
  /** 二级标签 */
  vocLevel2?: string;
  /**
   * VOC量
   * @format int64
   */
  vocQty?: number;
}

/** TiktokTrafficAnalysisBean */
export interface TiktokTrafficAnalysisBean {
  /** 点击率 */
  clickThroughRate?: number;
  /** 点击率环比 */
  clickThroughRateMom?: number;
  /** 点击率同比 */
  clickThroughRateYoy?: number;
  /** 转化率 */
  conversionRate?: number;
  /** 转化率环比 */
  conversionRateMom?: number;
  /** 转化率同比 */
  conversionRateYoy?: number;
  /** 曝光量 */
  impressions?: number;
  /** 曝光量环比 */
  impressionsMom?: number;
  /** 曝光量同比 */
  impressionsYoy?: number;
  /** 页面浏览量环比 */
  pageViewsMom?: number;
  /** 页面浏览量同比 */
  pageViewsYoy?: number;
  /** 会话数环比 */
  sessionsMom?: number;
  /** 会话数同比 */
  sessionsYoy?: number;
  /** 总页面浏览量 */
  totalPageViews?: number;
  /** 总会话数 */
  totalSessions?: number;
  /** 访问用户数 */
  totalUsers?: number;
  /** 访问用户数环比 */
  usersMom?: number;
  /** 访问用户数同比 */
  usersYoy?: number;
}

/** TimeZoneInfoBean */
export interface TimeZoneInfoBean {
  /** 地区 */
  area?: string;
  /** 备注 */
  remark?: string;
  /** 时区 */
  timeZone?: string;
  /** 时区编码 */
  timeZoneCode?: string;
}

/** TimeZoneResp */
export interface TimeZoneResp {
  /** 时区信息 */
  timeZoneInfoList?: TimeZoneInfoBean[];
}

/** TrafficAnalysisBean */
export interface TrafficAnalysisBean {
  /** 转化漏斗分析 */
  conversionFunnel?: ConversionFunnelBean;
  /** 国家排名 */
  countryRankingMap?: Record<string, CountryRankingBean[]>;
  /** 国家排名趋势 */
  countryRankingTrendMap?: Record<string, CountryRankingBean[]>;
  /** 流量来源分布 */
  trafficSourceDists?: TrafficSourceDistBean[];
}

/** TrafficSourceDistBean */
export interface TrafficSourceDistBean {
  /** 总流量 */
  sessionsTotal?: number;
  /** 流量占比 */
  sessionsTotalRate?: number;
  /** 流量来源 */
  trafficSource?: string;
}

/** TrendAnalysisBean */
export interface TrendAnalysisBean {
  /** 品牌声量趋势 */
  brandVoiceLast6MonthTrends?: BrandAnalysisTrendBean[];
  /** 库存周转趋势 */
  inventoryTrend?: InventoryTrendAnalysisBean;
  /** 复购率趋势 */
  purchaseLast6MonthTrends?: BrandAnalysisTrendBean[];
  /** 销售额&毛利额趋势 */
  salesTrend?: SalesTrendBean;
}

/** TrendAnalysisData */
export interface TrendAnalysisData {
  /** 去年12个月趋势数据（月查询时使用） */
  lastYearTrend?: TrendDataGroup;
  /** 近期12个月趋势数据（月查询时使用） */
  recent12MonthsTrend?: TrendDataGroup;
  /** 销量数据（周查询时使用） */
  salesQtyList?: number[];
  /** 今年12个月趋势数据（月查询时使用） */
  thisYearTrend?: TrendDataGroup;
  /** 时间序列（周查询时使用） */
  timeList?: string[];
  /** VOC量数据（周查询时使用） */
  vocCountList?: number[];
  /** VOC率数据（百分比，周查询时使用） */
  vocRateList?: number[];
  /** 年累计VOC率数据（百分比，周查询时使用） */
  yearCumulativeVocRateList?: number[];
}

/** TrendBean */
export interface TrendBean {
  /** 月份 */
  month?: string;
  /** 趋势值 */
  value?: number;
}

/** TrendData */
export interface TrendData {
  /** 时间（如：2025Week39） */
  time?: string;
  /** 值 */
  value?: number;
}

/** TrendDataGroup */
export interface TrendDataGroup {
  /** 销量数据 */
  salesQtyList?: number[];
  /** 时间序列 */
  timeList?: string[];
  /** VOC量数据 */
  vocCountList?: number[];
  /** VOC率数据（百分比） */
  vocRateList?: number[];
  /** 年累计VOC率数据（百分比） */
  yearCumulativeVocRateList?: number[];
}

/** TrendSaleDO */
export interface TrendSaleDO {
  /** 目标销售额 */
  budgetSalesAmount?: number;
  /** 渠道 */
  channel?: string;
  /** 小时 */
  hour?: string;
  /** 平台 */
  platform?: string;
  /**
   * 销量
   * @format int32
   */
  saleQty?: number;
  /** 销售额 */
  salesAmount?: number;
  /** 销售额达成率 */
  salesAmountCompletionRate?: number;
  /** 销售额同期 */
  salesAmountY?: number;
  /** 销售额同比 */
  salesAmountYoy?: number;
}

/**
 * TvProductLineVocRateBean
 * 产品线退货率
 */
export interface TvProductLineVocRateBean {
  /**
   * 销量
   * @format int64
   */
  saleQty?: number;
  /** SPU名称 */
  spuName?: string;
  /**
   * VOC量
   * @format int64
   */
  vocQty?: number;
  /** VOC率 */
  vocRate?: number;
}

/** VocAnalysisEnumsResp */
export interface VocAnalysisEnumsResp {
  /** 品类 */
  categoryList?: Category[];
  /** 渠道 */
  channelList?: string[];
  /** 国家 */
  countryList?: string[];
  /** VOC数据来源 */
  dataSourceList?: DataSource[];
  /** VOC标签 */
  levelList?: Level[];
  /** 平台 */
  platformList?: string[];
  /** 品线 */
  productLineList?: ProductLine[];
  /** GTM */
  productLineMarketList?: ProductLineMarket[];
  /** 客服型号 */
  skuModelNameVocList?: string[];
  /** SPU */
  spuCodeList?: string[];
  /** SPU名称 */
  spuNameList?: string[];
}

/** VocAnalysisReq */
export interface VocAnalysisReq {
  /** 品类 */
  categoryList?: string[];
  /** 三级分类 */
  categoryNameLevel3List?: string[];
  /** 四级分类 */
  categoryNameLevel4List?: string[];
  /** 五级分类 */
  categoryNameLevel5List?: string[];
  /** 渠道 */
  channelList?: string[];
  /** 国家 */
  countryList?: string[];
  /** @format int32 */
  dataSourceFlag?: number;
  /** VOC一级数据来源 */
  dataSourceList?: string[];
  /** VOC二级数据来源 */
  dataSourcePlatformList?: string[];
  /** VOC三级数据来源 */
  dataTypeList?: string[];
  /** 下钻维度列表 */
  dimensionList?: Dimension[];
  /**
   * 下钻维度类型：1：周，2：月
   * @format int32
   */
  dimensionType?: number;
  /** 结束日期 */
  endDate?: string;
  /** 一级标签 */
  level1?: string;
  /** 一级标签 */
  level1List?: string[];
  /** 二级标签 */
  level2List?: string[];
  /** 平台 */
  platform?: string;
  /** 平台 */
  platformList?: string[];
  /** 品线 */
  productLineList?: string[];
  /** GTM组 */
  productLineMarketGroupList?: string[];
  /** GTM经理 */
  productLineMarketNameList?: string[];
  /** 产品经理 */
  skuDeveloperNameList?: string[];
  /** 客服型号 */
  skuModelNameVocList?: string[];
  /** SPU */
  spuCodeList?: string[];
  /** SPU名称 */
  spuNameList?: string[];
  /** 开始日期 */
  startDate?: string;
}

/** VocAnalysisResp */
export interface VocAnalysisResp {
  /** 分析结果 */
  analysisResults?: BiAnalysisResultBean[];
  /** 核心指标 */
  coreIndicator?: VocCoreIndicatorBean;
  /** 国家维度分析 */
  countryPropList?: CountryPropBean[];
  /** 数据来源分析 */
  dataSourcePropList?: DataSourcePropBean[];
  /** 标签维度计数BY月 */
  levelDrillDownByMonthList?: LevelDrillDownBean[];
  /** 标签维度计数BY周 */
  levelDrillDownByWeekList?: LevelDrillDownBean[];
  /** 标签占比分析 */
  levelPropList?: LevelPropBean[];
  /** 平台维度分析 */
  platformPropList?: PlatformPropBean[];
  /** 品类/SPU维度分析 */
  productLinePropList?: ProductLinePropBean[];
  /** 情感标签分析 */
  sentimentPropList?: SentimentPropBean[];
  /** 趋势分析 */
  trendAnalysis?: VocTrendAnalysisBean;
  /** 标签维度计数BY月-合计 */
  vocCntTotalByMonthList?: PeriodVocCntBean[];
  /** 标签维度计数BY周-合计 */
  vocCntTotalByWeekList?: PeriodVocCntBean[];
}

/** VocConditionQueryResp */
export interface VocConditionQueryResp {
  /** 地区-国家映射（Map结构：key=地区，value=该地区下的国家列表） */
  areaCountryMap?: Record<string, string[]>;
  /** 三级类目 */
  categoryNameLevel3List?: string[];
  /** 国家 */
  countryList?: string[];
  dataCaliber?: string[];
  /** VOC来源 */
  dataSourceList?: DataSourceBean[];
  /**
   * 截止时间
   * @format date-time
   */
  endTime?: string;
  /** 月（格式：2025-11） */
  monthList?: string[];
  /** 平台 */
  platformList?: string[];
  /** 产品品线 */
  productLineList?: string[];
  /** GTM组 */
  productLineMarketGroupList?: string[];
  /** spu */
  spuBeanList?: SpuBean[];
  /** VOC标签树（四级结构） */
  vocTagTree?: VocTagTree;
  /** 周（格式：2025Week17） */
  weekList?: string[];
}

/** VocCoreIndicatorBean */
export interface VocCoreIndicatorBean {
  /** VOC量-筛选时间 */
  currDateCount?: VocCountBean;
  /** VOC量-近13周 */
  last13WeekCount?: VocCountBean;
  /** VOC量-近4周 */
  last4WeekCount?: VocCountBean;
  /** VOC量-上周 */
  lastWeekCount?: VocCountBean;
}

/** VocCoreIndicatorReq */
export interface VocCoreIndicatorReq {
  /** 区域权限 */
  areaPermissionList?: string[];
  /** 三级类目 */
  categoryNameLevel3List?: string[];
  /** 品类权限 */
  categoryPermissionList?: string[];
  controlPermission?: boolean;
  /** 国家 */
  countryList?: string[];
  /** 国家权限 */
  countryPermissionList?: string[];
  dataCaliber?: string[];
  /** VOC来源 */
  dataSourceList?: string[];
  /** 产品经理权限 */
  developerNamePermissionList?: string[];
  /** 权限组 */
  dpGroupCodeList?: string[];
  /** GTM组权限 */
  gtmProductLinePermissionList?: string[];
  /** 指标类型 1：VOC量 2：VOC率 3：年累计VOC率 */
  metricType?: string;
  /** 月（格式：2025-11） */
  monthList?: string[];
  /** 统计周期类型: week/month */
  periodType?: string;
  /** 平台 */
  platformList?: string[];
  /** 平台权限 */
  platformPermissionList?: string[];
  /** 产品品线 */
  productLine?: string;
  /** 产品品线 */
  productLineList?: string[];
  /** GTM组 */
  productLineMarketGroupList?: string[];
  /** 产品品线权限 */
  productLinePermissionList?: string[];
  /** 店铺权限 */
  shopPermissionList?: string[];
  /** spu */
  spuCode?: string[];
  /** SPU名称 */
  spuNameList?: string[];
  /**
   * 选中的标签层级：2：二级；3：三级；4：四级
   * @format int32
   */
  vocLevel?: number;
  /** 一级标签列表 */
  vocLevel1List?: string[];
  /** 二级标签列表 */
  vocLevel2List?: string[];
  /** 三级标签列表 */
  vocLevel3List?: string[];
  /** 四级标签列表 */
  vocLevel4List?: string[];
  /** 选中的核心指标类型（客服工单/退货留言/商品评论） */
  vocType?: string;
  /** VOC类型 */
  vocTypeList?: string[];
  /** 周（格式：202517） */
  weekList?: string[];
}

/** VocCoreIndicatorResp */
export interface VocCoreIndicatorResp {
  /** DOA率指标 */
  doaRate?: VocRateMetricBean;
  /** 中差评率指标 */
  negativeReviewRate?: VocRateMetricBean;
  /** 期末最新综合评分 */
  overallRating?: VocRateMetricBean;
  /** 好评率指标 */
  positiveReviewRate?: VocRateMetricBean;
  /** 退货量指标 */
  returnQty?: VocMetricBean;
  /** 退货率指标 */
  returnRate?: VocRateMetricBean;
  /** 销量指标 */
  salesQty?: VocMetricBean;
  /** 星级评分指标 */
  starRating?: VocStarRatingMetricBean;
  /** 整体VOC趋势分析 */
  trendList?: VocRateTrendBean[];
  /** VOC量指标 */
  vocCount?: VocMetricBean;
  /** VOC率指标 */
  vocRate?: VocRateMetricBean;
}

/** VocCountBean */
export interface VocCountBean {
  /**
   * VOC量
   * @format int32
   */
  count?: number;
  /** VOC环比增长率 */
  growth?: number;
  /**
   * VOC增长量
   * @format int32
   */
  growthCount?: number;
  /**
   * 上期VOC量
   * @format int32
   */
  preCount?: number;
  /**
   * 上期销量
   * @format int32
   */
  presalesQty?: number;
  /**
   * 销量
   * @format int32
   */
  salesQty?: number;
  /** VOC量趋势 */
  trendList?: VocTrendBean[];
  /** VOC上期占比 */
  vocPreRate?: number;
  /** VOC占比 */
  vocRate?: number;
  /** VOC占比环比增长率 */
  vocRateGrowth?: number;
}

/** VocEndDateResp */
export interface VocEndDateResp {
  endDate?: string;
}

/** VocMetricBean */
export interface VocMetricBean {
  /**
   * 当前值
   * @format int64
   */
  currentValue?: number;
  /** 周期环比变化率（百分比） */
  dateOverChange?: number;
  /**
   * 上一周期值
   * @format int64
   */
  previousValue?: number;
  /** 趋势数据 */
  trendList?: TrendData[];
}

/** VocProductAnalysisReq */
export interface VocProductAnalysisReq {
  /** 三级分类 */
  categoryNameLevel3List?: string[];
  /** 四级分类 */
  categoryNameLevel4List?: string[];
  /** 五级分类 */
  categoryNameLevel5List?: string[];
  /** 渠道 */
  channelList?: string[];
  /** 国家 */
  countryList?: string[];
  /** VOC一级数据来源 */
  dataSourceList?: string[];
  /** VOC二级数据来源 */
  dataSourcePlatformList?: string[];
  /** VOC三级数据来源 */
  dataTypeList?: string[];
  /** 结束日期 */
  endDate?: string;
  /** 一级标签 */
  level1List?: string[];
  /** 二级标签 */
  level2List?: string[];
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
  /** 平台 */
  platformList?: string[];
  /** 品线 */
  productLineList?: string[];
  /** GTM组 */
  productLineMarketGroupList?: string[];
  /** GTM经理 */
  productLineMarketNameList?: string[];
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 产品经理 */
  skuDeveloperNameList?: string[];
  /** 客服型号 */
  skuModelNameVocList?: string[];
  /** SPU */
  spuCodeList?: string[];
  /** SPU名称 */
  spuNameList?: string[];
  /** 开始日期 */
  startDate?: string;
  /**
   * 类型：1：客服型号-周环比，2：客服型号-月环比，3：客服型号-季环比，4：SPU名称-周环比，5：SPU名称-月环比，6：SPU名称-季环比
   * @format int32
   */
  type?: number;
}

/** VocProductAnalysisResp */
export interface VocProductAnalysisResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 客服型号-月环比 */
  skuModelNameMonthPropList?: SkuModelNamePropBean[];
  /** 客服型号-季环比 */
  skuModelNameQuarterPropList?: SkuModelNamePropBean[];
  /** 客服型号-周环比 */
  skuModelNameWeekPropList?: SkuModelNamePropBean[];
  /** 客服型号-月环比 */
  spuNameMonthPropList?: SpuNamePropBean[];
  /** 客服型号-季环比 */
  spuNameQuarterPropList?: SpuNamePropBean[];
  /** 客服型号-周环比 */
  spuNameWeekPropList?: SpuNamePropBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** VocProductLineResp */
export interface VocProductLineResp {
  /** 趋势 */
  productLineTrend?: ProductManagerLevelTrendVO;
}

/** VocProductRatingReq */
export interface VocProductRatingReq {
  /** 区域权限 */
  areaPermissionList?: string[];
  /** 三级类目名称（查询第二级时必填） */
  categoryLevel3Name?: string;
  /** 三级类目 */
  categoryNameLevel3List?: string[];
  /** 品类权限 */
  categoryPermissionList?: string[];
  controlPermission?: boolean;
  /** 国家 */
  countryList?: string[];
  /** 国家权限 */
  countryPermissionList?: string[];
  dataCaliber?: string[];
  /** 数据口径 */
  dataCaliberStr?: string;
  /** VOC来源 */
  dataSourceList?: string[];
  /** 产品经理权限 */
  developerNamePermissionList?: string[];
  /** 权限组 */
  dpGroupCodeList?: string[];
  /** GTM组权限 */
  gtmProductLinePermissionList?: string[];
  /**
   * 查询等级：1-第一级（三级类目），2-第二级（SPU）
   * @format int32
   */
  level?: number;
  /** 指标类型 1：VOC量 2：VOC率 3：年累计VOC率 */
  metricType?: string;
  /** 月（格式：2025-11） */
  monthList?: string[];
  /** 排序字段（reviewCount, starRating, positiveReviewRate等） */
  orderByColumn?: string;
  /** 排序方向: ASC/DESC */
  orderDirection?: string;
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
  /** 统计周期类型: week/month */
  periodType?: string;
  /** 平台 */
  platformList?: string[];
  /** 平台权限 */
  platformPermissionList?: string[];
  /** 产品品线 */
  productLine?: string;
  /** 产品品线 */
  productLineList?: string[];
  /** GTM组 */
  productLineMarketGroupList?: string[];
  /** 产品品线权限 */
  productLinePermissionList?: string[];
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 店铺权限 */
  shopPermissionList?: string[];
  /** spu */
  spuCode?: string[];
  /** SPU名称 */
  spuNameList?: string[];
  /** 一级标签列表 */
  vocLevel1List?: string[];
  /** 二级标签列表 */
  vocLevel2List?: string[];
  /** 三级标签列表 */
  vocLevel3List?: string[];
  /** 四级标签列表 */
  vocLevel4List?: string[];
  /** 选中的核心指标类型（客服工单/退货留言/商品评论） */
  vocType?: string;
  /** VOC类型 */
  vocTypeList?: string[];
  /** 周（格式：2025Week17） */
  weekList?: string[];
}

/** VocProductRatingResp */
export interface VocProductRatingResp {
  /** 结束日期 */
  endDate?: string;
  /**
   * 当前页码
   * @format int32
   */
  pageNum?: number;
  /**
   * 页大小
   * @format int32
   */
  pageSize?: number;
  /** 商品评分和评论列表 */
  productList?: ProductRatingItem[];
  /** 开始日期 */
  startDate?: string;
  /**
   * 总记录数
   * @format int64
   */
  total?: number;
}

/** VocProductRatingSpuDetailReq */
export interface VocProductRatingSpuDetailReq {
  /** 区域权限 */
  areaPermissionList?: string[];
  /** 三级类目 */
  categoryNameLevel3List?: string[];
  /** 品类权限 */
  categoryPermissionList?: string[];
  controlPermission?: boolean;
  /** 国家 */
  countryList?: string[];
  /** 国家权限 */
  countryPermissionList?: string[];
  dataCaliber?: string[];
  /** VOC来源 */
  dataSourceList?: string[];
  /** 产品经理权限 */
  developerNamePermissionList?: string[];
  /** 权限组 */
  dpGroupCodeList?: string[];
  /** 结束日期（格式：2025-07-31） */
  endDate?: string;
  /** GTM组权限 */
  gtmProductLinePermissionList?: string[];
  /** 指标类型 1：VOC量 2：VOC率 3：年累计VOC率 */
  metricType?: string;
  /** 月（格式：2025-11） */
  monthList?: string[];
  /** 统计周期类型: week/month */
  periodType?: string;
  /** 平台 */
  platformList?: string[];
  /** 平台权限 */
  platformPermissionList?: string[];
  /** 产品品线 */
  productLine?: string;
  /** 产品品线 */
  productLineList?: string[];
  /** GTM组 */
  productLineMarketGroupList?: string[];
  /** 产品品线权限 */
  productLinePermissionList?: string[];
  /** 店铺权限 */
  shopPermissionList?: string[];
  /** spu */
  spuCode?: string[];
  /** SPU名称 */
  spuNameList?: string[];
  /** 开始日期（格式：2025-05-01） */
  startDate?: string;
  /**
   * 选中的标签层级：2：二级；3：三级；4：四级
   * @format int32
   */
  vocLevel?: number;
  /** 一级标签列表 */
  vocLevel1List?: string[];
  /** 二级标签列表 */
  vocLevel2List?: string[];
  /** 三级标签列表 */
  vocLevel3List?: string[];
  /** 四级标签列表 */
  vocLevel4List?: string[];
  /** 选中的核心指标类型（客服工单/退货留言/商品评论） */
  vocType?: string;
  /** VOC类型 */
  vocTypeList?: string[];
  /** 周（格式：202517） */
  weekList?: string[];
}

/** VocProductRatingSpuDetailResp */
export interface VocProductRatingSpuDetailResp {
  reviewStarStatBeanList?: ReviewStarStatBean[];
  tags?: AfterSalesTagBean[];
}

/** VocRateMetricBean */
export interface VocRateMetricBean {
  /** 当前值（百分比） */
  currentValue?: number;
  /** 周环比差值（百分比） */
  dateOverChange?: number;
  /** 上周值（百分比） */
  previousValue?: number;
  /** 趋势数据 */
  trendList?: TrendData[];
}

/** VocRateTrendBean */
export interface VocRateTrendBean {
  /** 日 */
  date?: string;
  /** DOA率 */
  doaRate?: number;
  /** 月 */
  month?: string;
  /**
   * 差评数
   * @format int32
   */
  negativeCount?: number;
  /**
   * 非产品问题Voc量
   * @format int32
   */
  nonProductVocCnt?: number;
  /** 非产品问题累计Voc率 */
  nonProductVocGrandTotalRate?: number;
  /** 非产品问题Voc率 */
  nonProductVocRate?: number;
  /** 期末最新综合评分 */
  overallRating?: number;
  /** 周期 */
  period?: string;
  /**
   * 产品问题Voc量
   * @format int32
   */
  productVocCnt?: number;
  /** 产品问题累计Voc率 */
  productVocGrandTotalRate?: number;
  /** 产品问题Voc率 */
  productVocRate?: number;
  /**
   * 销量
   * @format int32
   */
  salesQty?: number;
  /**
   * Voc量
   * @format int32
   */
  vocCnt?: number;
  /** 累计Voc率 */
  vocGrandTotalRate?: number;
  /** Voc率 */
  vocRate?: number;
  /** 周 */
  week?: string;
}

/** VocStarRatingMetricBean */
export interface VocStarRatingMetricBean {
  /** 当前值（分） */
  currentValue?: number;
  /** 周环比差值（百分比） */
  dateOverChange?: number;
  /** 上周值（分） */
  previousValue?: number;
  /** 趋势数据 */
  trendList?: TrendData[];
}

/** VocTagDistributionReq */
export interface VocTagDistributionReq {
  /** 区域权限 */
  areaPermissionList?: string[];
  /** 三级类目 */
  categoryNameLevel3List?: string[];
  /** 品类权限 */
  categoryPermissionList?: string[];
  controlPermission?: boolean;
  /** 国家 */
  countryList?: string[];
  /** 国家权限 */
  countryPermissionList?: string[];
  dataCaliber?: string[];
  /** VOC来源 */
  dataSourceList?: string[];
  /** 产品经理权限 */
  developerNamePermissionList?: string[];
  /** 权限组 */
  dpGroupCodeList?: string[];
  /** GTM组权限 */
  gtmProductLinePermissionList?: string[];
  /** 指标类型 1：VOC量 2：VOC率 3：年累计VOC率 */
  metricType?: string;
  /** 月（格式：2025-11） */
  monthList?: string[];
  /** 统计周期类型: week/month */
  periodType?: string;
  /** 平台 */
  platformList?: string[];
  /** 平台权限 */
  platformPermissionList?: string[];
  /** 产品品线 */
  productLine?: string;
  /** 产品品线 */
  productLineList?: string[];
  /** GTM组 */
  productLineMarketGroupList?: string[];
  /** 产品品线权限 */
  productLinePermissionList?: string[];
  /** 选中的核心指标类型（客服工单/退货留言/商品评论） */
  selectedVocType?: string;
  /** 店铺权限 */
  shopPermissionList?: string[];
  /** spu */
  spuCode?: string[];
  /** SPU名称 */
  spuNameList?: string[];
  /**
   * 选中的标签层级：2：二级；3：三级；4：四级
   * @format int32
   */
  vocLevel?: number;
  /** 一级标签列表 */
  vocLevel1List?: string[];
  /** 二级标签列表 */
  vocLevel2List?: string[];
  /** 三级标签列表 */
  vocLevel3List?: string[];
  /** 四级标签列表 */
  vocLevel4List?: string[];
  /** 四级标签Top5列表 */
  vocLevel4Top5List?: string[];
  /** 选中的核心指标类型（客服工单/退货留言/商品评论） */
  vocType?: string;
  /** VOC类型 */
  vocTypeList?: string[];
  /** 周（格式：202517） */
  weekList?: string[];
}

/** VocTagDistributionResp */
export interface VocTagDistributionResp {
  /** 标签一级分类Top5 */
  level1TagTop5?: TagDistributionItem[];
  /** 标签二级分类Top5 */
  level2TagTop5?: TagDistributionItem[];
  /** 标签四级分类Top5 */
  level4TagTop5?: TagDistributionItem[];
  /** 标签趋势 */
  levelTagTrend?: ProductManagerLevelTrendVO;
  /** 趋势分析数据 */
  trendAnalysis?: TrendAnalysisData;
  /** VOC标签Top5 */
  vocTagTop5?: TagDistributionItem[];
  /** 核心指标汇总 */
  vocTypeSummaryList?: VocTypeSummary[];
}

/** VocTagItem */
export interface VocTagItem {
  /** 三级类目名称 */
  categoryLevel3Name?: string;
  /** 是否展开 */
  expanded?: boolean;
  /** 是否有子级 */
  hasChildren?: boolean;
  /**
   * 层级（1-3）
   * @format int32
   */
  level?: number;
  /**
   * 销量
   * @format int64
   */
  salesQty?: number;
  /** 三级类目/一级标签/二级标签（层级路径） */
  tagPath?: string;
  /**
   * VOC量
   * @format int64
   */
  vocCount?: number;
  /** VOC量组内占比（百分比） */
  vocCountGroupProportion?: number;
  /** 一级标签 */
  vocLevel1?: string;
  /** 二级标签 */
  vocLevel2?: string;
  /** VOC率（百分比） */
  vocRate?: number;
  /** 近6周VOC率趋势数据 */
  vocRateTrendData?: number[];
  /** 近6周VOC率趋势数据对应的时间列表 */
  vocRateTrendTimeList?: string[];
  /** VOC率周环比差值（百分比） */
  vocRateWeekOverWeekDiff?: number;
}

/** VocTagLevel1 */
export interface VocTagLevel1 {
  /**
   * 一级标签累计VOC量
   * @format int64
   */
  totalVocCnt?: number;
  /** 一级标签名称 */
  vocName?: string;
  /** 二级标签列表 */
  vocTagLevel2List?: VocTagLevel2[];
}

/** VocTagLevel2 */
export interface VocTagLevel2 {
  /**
   * 二级标签累计VOC量
   * @format int64
   */
  totalVocCnt?: number;
  /** 二级标签名称 */
  vocName?: string;
  /** 三级标签列表 */
  vocTagLevel3List?: VocTagLevel3[];
}

/** VocTagLevel3 */
export interface VocTagLevel3 {
  /**
   * 三级标签累计VOC量
   * @format int64
   */
  totalVocCnt?: number;
  /** 三级标签名称 */
  vocName?: string;
}

/** VocTagLevelDetailReq */
export interface VocTagLevelDetailReq {
  /** 区域权限 */
  areaPermissionList?: string[];
  /** 三级类目 */
  categoryNameLevel3List?: string[];
  /** 品类权限 */
  categoryPermissionList?: string[];
  controlPermission?: boolean;
  /** 国家 */
  countryList?: string[];
  /** 国家权限 */
  countryPermissionList?: string[];
  dataCaliber?: string[];
  /** VOC来源 */
  dataSourceList?: string[];
  /** 产品经理权限 */
  developerNamePermissionList?: string[];
  /** 权限组 */
  dpGroupCodeList?: string[];
  /** GTM组权限 */
  gtmProductLinePermissionList?: string[];
  /** 指标类型 1：VOC量 2：VOC率 3：年累计VOC率 */
  metricType?: string;
  /** 月（格式：2025-11） */
  monthList?: string[];
  /** 统计周期类型: week/month */
  periodType?: string;
  /** 平台 */
  platformList?: string[];
  /** 平台权限 */
  platformPermissionList?: string[];
  /** 产品品线 */
  productLine?: string;
  /** 产品品线 */
  productLineList?: string[];
  /** GTM组 */
  productLineMarketGroupList?: string[];
  /** 产品品线权限 */
  productLinePermissionList?: string[];
  /** 选中的核心指标类型（客服工单/退货留言/商品评论） */
  selectedVocType?: string;
  /** 店铺权限 */
  shopPermissionList?: string[];
  /** spu */
  spuCode?: string[];
  /** SPU名称 */
  spuNameList?: string[];
  /**
   * VOC标签层级（1-4），用于指定查询哪一级标签
   * @format int32
   * @min 1
   * @exclusiveMin false
   * @max 4
   * @exclusiveMax false
   * @example 1
   */
  vocLevel: number;
  /** 一级标签列表 */
  vocLevel1List?: string[];
  /** 二级标签列表 */
  vocLevel2List?: string[];
  /** 三级标签列表 */
  vocLevel3List?: string[];
  /** 四级标签列表 */
  vocLevel4List?: string[];
  /** 四级标签Top5列表 */
  vocLevel4Top5List?: string[];
  /** 选中的核心指标类型（客服工单/退货留言/商品评论） */
  vocType?: string;
  /** VOC类型 */
  vocTypeList?: string[];
  /** 周（格式：202517） */
  weekList?: string[];
}

/** VocTagLevelDetailResp */
export interface VocTagLevelDetailResp {
  /** 标签分类详情列表 */
  tagList?: TagLevelDetailItem[];
}

/** VocTagListReq */
export interface VocTagListReq {
  /** 区域权限 */
  areaPermissionList?: string[];
  /** 三级类目名称（查询level=2或3时需要传入，用于过滤） */
  categoryLevel3Name?: string;
  /** 三级类目 */
  categoryNameLevel3List?: string[];
  /** 品类权限 */
  categoryPermissionList?: string[];
  controlPermission?: boolean;
  /** 国家 */
  countryList?: string[];
  /** 国家权限 */
  countryPermissionList?: string[];
  dataCaliber?: string[];
  /** 数据口径 */
  dataCaliberStr?: string;
  /** VOC来源 */
  dataSourceList?: string[];
  /** 产品经理权限 */
  developerNamePermissionList?: string[];
  /** 权限组 */
  dpGroupCodeList?: string[];
  /** GTM组权限 */
  gtmProductLinePermissionList?: string[];
  /**
   * 当前查询等级（1=三级类目，2=一级标签，3=二级标签）
   * @format int32
   */
  level?: number;
  /** 指标类型 1：VOC量 2：VOC率 3：年累计VOC率 */
  metricType?: string;
  /** 月（格式：2025-11） */
  monthList?: string[];
  /** 排序字段 */
  orderByColumn?: string;
  /** 排序方向: ASC/DESC */
  orderDirection?: string;
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
  /** 统计周期类型: week/month */
  periodType?: string;
  /** 平台 */
  platformList?: string[];
  /** 平台权限 */
  platformPermissionList?: string[];
  /** 产品品线 */
  productLine?: string;
  /** 产品品线 */
  productLineList?: string[];
  /** GTM组 */
  productLineMarketGroupList?: string[];
  /** 产品品线权限 */
  productLinePermissionList?: string[];
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 店铺权限 */
  shopPermissionList?: string[];
  /** spu */
  spuCode?: string[];
  /** SPU名称 */
  spuNameList?: string[];
  /** 一级标签（查询level=3时需要传入，用于过滤） */
  vocLevel1?: string;
  /** 一级标签列表 */
  vocLevel1List?: string[];
  /** 二级标签列表 */
  vocLevel2List?: string[];
  /** 三级标签列表 */
  vocLevel3List?: string[];
  /** 四级标签列表 */
  vocLevel4List?: string[];
  /** 选中的核心指标类型（客服工单/退货留言/商品评论） */
  vocType?: string;
  /** VOC类型 */
  vocTypeList?: string[];
  /** 周（格式：2025Week17） */
  weekList?: string[];
}

/** VocTagListResp */
export interface VocTagListResp {
  /**
   * 当前页码
   * @format int32
   */
  pageNum?: number;
  /**
   * 页大小
   * @format int32
   */
  pageSize?: number;
  /** VOC标签列表 */
  tagList?: VocTagItem[];
  /**
   * 总记录数
   * @format int64
   */
  total?: number;
}

/**
 * VocTagTopBean
 * VOC量二级标签TOP3明细
 */
export interface VocTagTopBean {
  /**
   * 排名
   * @format int32
   */
  rk?: number;
  /** SPU编码 */
  spuCode?: string;
  /** SPU名称 */
  spuName?: string;
  /**
   * 二级标签VOC量
   * @format int64
   */
  totalVocQty?: number;
  /** 二级标签 */
  vocLevel2?: string;
  /** 三级标签 */
  vocLevel3?: string;
  /**
   * VOC量
   * @format int64
   */
  vocQty?: number;
}

/** VocTagTree */
export interface VocTagTree {
  /** VOC标签树列表（四级结构） */
  vocTagLevel1List?: VocTagLevel1[];
}

/** VocTrendAnalysisBean */
export interface VocTrendAnalysisBean {
  /** 近12个月趋势 */
  last12MonthTrends?: VocRateTrendBean[];
  /** 近13周趋势 */
  last13WeekTrends?: VocRateTrendBean[];
  /** 近30天趋势 */
  last30DayTrends?: VocRateTrendBean[];
}

/** VocTrendBean */
export interface VocTrendBean {
  /**
   * VOC量
   * @format int32
   */
  count?: number;
  /** 周期 */
  period?: string;
  /** VOC占比 */
  rate?: number;
}

/**
 * VocTvNewProductReturnRateResp
 * VOC电视看板-新品退货率表现响应
 */
export interface VocTvNewProductReturnRateResp {
  /** 新品退货率表现列表 */
  spuVocRateMap?: Record<string, SpuVocRateBean>;
}

/**
 * VocTvNewProductSpuResp
 * VOC电视看板-新品SPU列表
 */
export interface VocTvNewProductSpuResp {
  /** 新品SPU列表 */
  list?: NewProductSpuBean[];
}

/**
 * VocTvNewProductTagTrendResp
 * VOC电视看板-新品问题标签趋势响应
 */
export interface VocTvNewProductTagTrendResp {
  /** 新品问题标签趋势列表 */
  list?: NewProductTagTrendBean[];
}

/**
 * VocTvProductLineReturnRateResp
 * VOC电视看板-产品线退货率响应
 */
export interface VocTvProductLineReturnRateResp {
  /** 产品线退货率列表 */
  list?: TvProductLineVocRateBean[];
}

/**
 * VocTvReturnTagTopResp
 * VOC电视看板-退货标签TOP响应
 */
export interface VocTvReturnTagTopResp {
  /** 退货标签TOP列表 */
  list?: VocTagTopBean[];
  /** 退货标签TOP列表 */
  spuMapList?: Record<string, VocTagTopBean[]>;
}

/**
 * VocTvTagTrendResp
 * VOC电视看板-问题标签趋势响应
 */
export interface VocTvTagTrendResp {
  /** 问题标签趋势列表 */
  list?: TagTrendBean[];
}

/** VocTypeSummary */
export interface VocTypeSummary {
  /**
   * 数量
   * @format int64
   */
  count?: number;
  /** 占比（百分比） */
  proportion?: number;
  /** VOC类型（客服工单/退货留言/商品评论） */
  vocType?: string;
}

/** WeekBean */
export interface WeekBean {
  date?: string;
  week?: string;
}

/** WeekReq */
export interface WeekReq {
  /** 周 */
  week?: string;
  /** 周（带Week） */
  weekStr?: string;
  /** 周（带结束日期） */
  weekStrEnd?: string;
}

/** WeekResp */
export interface WeekResp {
  /** 周列表 */
  weekList?: WeekStrBean[];
}

/** WeekStrBean */
export interface WeekStrBean {
  endDate?: string;
  month?: string;
  monthStr?: string;
  startDate?: string;
  week?: string;
  weekStr?: string;
  weekStrEnd?: string;
  year?: string;
}

/** CommonResp«Void» */
export interface CommonRespVoid {
  code?: string;
  enMessage?: string;
  message?: string;
  traceId?: string;
}

/** CommonResp«boolean» */
export interface CommonRespBoolean {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: boolean;
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
