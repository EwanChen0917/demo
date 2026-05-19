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

/** AmazonCapitalShopBean */
export interface AmazonCapitalShopBean {
  /** 店铺 */
  shop?: string;
}

/** AmazonCapitalShopResp */
export interface AmazonCapitalShopResp {
  /** 店铺名称，即编码 */
  shopList?: AmazonCapitalShopBean[];
}

/** AmazonCapitalSiteBean */
export interface AmazonCapitalSiteBean {
  /** 站点编码 */
  countryCode?: string;
  /**
   * 站点id
   * @format int64
   */
  siteId?: number;
  /** 站点名称 */
  siteName?: string;
}

/** AmazonCapitalSiteResp */
export interface AmazonCapitalSiteResp {
  /** 站点集合 */
  siteList?: AmazonCapitalSiteBean[];
}

/** AsinSpuListQueryReq */
export interface AsinSpuListQueryReq {
  /** 关键字 */
  keyWord?: string;
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
  /** 父级编码 查子asin/variant/itemId/skuId时传 */
  parentCode?: string;
  /**
   * 平台 1-亚马逊 2-独立站 3-新平台 4-tiktok
   * @format int32
   */
  platform?: number;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 店铺 ,查父/子都必传 */
  shopList?: string[];
}

/** AsinSpuListQueryResp */
export interface AsinSpuListQueryResp {
  /** ASIN商品信息列表 */
  asinSpuQueryList?: AsinSpuQueryBean[];
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

/** AsinSpuQueryBean */
export interface AsinSpuQueryBean {
  /** 父编码 查询父spu的时候，取这个字段 */
  code?: string;
  /** 在线商品的页面实时售价 目前使用在调价选了亚马逊子asin/独立站variantId/tiktok的SkuId时返回使用 */
  currPrice?: number;
  /** 在线商品的页面实时售价 目前使用在调价选了亚马逊子asin/独立站variantId/tiktok的SkuId时返回使用 */
  currPriceCurrency?: string;
  /** 店铺sku编码 */
  msku?: string;
  /** 商品售价 查询父spu的时候，取这个字段 */
  price?: number;
  /** 店铺编码 */
  shop?: string;
  /** 商品名称 查询父spu的时候，取这个字段 */
  spuName?: string;
  /** 子编码 查询子sku的时候(子asin/variantId/subItemId)，取这个字段 */
  subCode?: string;
}

/** ChildPriceAdjustmentBean */
export interface ChildPriceAdjustmentBean {
  /** 申请售价 */
  adjustPrice?: number;
  /** 申请售价币种编码 */
  adjustPriceCurrencyCode?: string;
  /** 跳转后毛利率% */
  adjustProfitRate?: string;
  /** 子asin/子variantId/子itemId  平台标识 */
  childCode?: string;
  /** 当前价格 */
  currentPrice?: number;
  /** 现在售价币种编码 */
  currentPriceCurrencyCode?: string;
  /** 调整前毛利率% */
  currentProfitRate?: string;
  /** 店铺sku */
  msku?: string;
  /** 店铺 */
  shop?: string;
}

/** ChildPriceExportReq */
export interface ChildPriceExportReq {
  /** 子Asin/variant/item信息 */
  childPriceAdjustmentList?: ChildPriceAdjustmentBean[];
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

/** ChildPriceImportReq */
export interface ChildPriceImportReq {
  /** 上传文件的key或者完整路径 */
  key?: string;
}

/** ChildPriceImportResp */
export interface ChildPriceImportResp {
  /** 子Asin/variant/item信息 */
  childPriceAdjustmentList?: ChildPriceAdjustmentBean[];
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

/** CommonExportResp */
export interface CommonExportResp {
  /** app标识 */
  appCode?: string;
  /** 下载链接 */
  downloadUrl?: string;
  /** 模块标识 */
  moduleCode?: string;
}

/** MonitorBean */
export interface MonitorBean {
  /** 描述内容 */
  description?: string;
  /** 监控价格类型 */
  priceType?: string;
  /** 监控类型描述 */
  typeStr?: string;
}

/** MonitorSaveReq */
export interface MonitorSaveReq {
  /** 渠道 */
  channel?: string;
  /** 国家 */
  countryCode?: string;
  /** 监控信息集合 */
  monitorList: SellerMonitorBean[];
  /**
   * 监控范围 1-全量商品 0-指定商品
   * @format int32
   */
  monitorRange?: number;
  /**
   * 监控状态 1-开启 0-关闭
   * @format int32
   */
  monitorStatus?: number;
  /**
   * 监控类型 1- 价格监控
   * @format int32
   */
  monitorType?: number;
  /**
   * 产品类型
   * @format int32
   */
  productType?: number;
  /** 唯一编码集合 */
  rpaCodeList: string[];
}

/** MsrpBean */
export interface MsrpBean {
  /** msrp价格 */
  msrpPriceStr?: string;
  /** 商品sku */
  skuCode?: string;
}

/** PriceAdjustmentBean */
export interface PriceAdjustmentBean {
  /** 实际大类排名 */
  actualCategoryRank?: string;
  /** 实际日销 */
  actualDaySales?: string;
  /** 实际销量 */
  actualSales?: string;
  /** 实际小类排名 */
  actualSubCategoryRank?: string;
  /** 申请调价 */
  adjustPrice?: string;
  /** 申请售价币种编码 */
  adjustPriceCurrencyCode?: string;
  /** 调价后毛利率 */
  adjustProfitRate?: string;
  /**
   * 调价类型 1-涨价 2-降价 3-秒杀 4-coupon
   * @format int32
   */
  adjustType?: number;
  /** 调价类型 1-涨价 2-降价 3-秒杀 4-coupon */
  adjustTypeDesc?: string;
  /** 复盘说明 */
  ajustReview?: string;
  /**
   * 审批状态 1-待审批 2-审批通过 3-审批拒绝 4-已撤回
   * @format int32
   */
  approveStatus?: number;
  /** 审批状态 1-待审批 2-审批通过 3-审批拒绝 4-已撤回 */
  approveStatusDesc?: string;
  /** 审批人名称 */
  approverName?: string;
  /** 渠道 */
  channel?: string;
  /** 渠道名称 */
  channelDesc?: string;
  /** 子Asin/SKU 新平台 */
  childAsin?: string;
  /** Coupon Code */
  couponCode?: string;
  /**
   * Coupon比例
   * @format double
   */
  couponNum?: number;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /** 创建人名称 */
  creatorName?: string;
  /** 审批人 */
  currentApprover?: string;
  /** 现在售价 */
  currentPrice?: string;
  /** 现在售价币种编码 */
  currentPriceCurrencyCode?: string;
  /** 调价前毛利率 */
  currentProfitRate?: string;
  /**
   * 调价周期结束时间
   * @format date-time
   */
  endTime?: string;
  /** itemId/Seller SPU 新平台 */
  itemId?: string;
  /** 调价活动编码 */
  paCode: string;
  /** 调价子详情编码  子调价列表使用 */
  paDetailCode: string;
  /** 父ASIN/SPU 亚马逊平台 */
  parentAsin?: string;
  /**
   * 调价次数
   * @format int64
   */
  priceAdjustCount?: number;
  /** productId/SPU 独立站平台 */
  productId?: string;
  /** 调价原因 */
  reason?: string;
  /** 备注 */
  remark?: string;
  /** 站点  废弃 */
  shopSite?: string;
  /** 站点名称 废弃 */
  shopSiteDesc?: string;
  /** 站点集合 */
  siteList?: PriceAdjustmentSiteBean[];
  /** 子asin/SKU */
  skuCode?: string;
  /** 产品编码 */
  spuCode?: string;
  /** 商品名称 */
  spuName?: string;
  /**
   * 调价周期开始时间
   * @format date-time
   */
  startTime?: string;
  /**
   * 活动状态 1-待开始 2-进行中 3-已结束 4-已取消
   * @format int32
   */
  status?: number;
  /** 活动状态 1-待开始 2-进行中 3-已结束 4-已取消 */
  statusDesc?: string;
  /** 子itemId/Seller SKU 新平台 */
  subItemId?: string;
  /**
   * 调价次数
   * @format int64
   */
  subPriceAdjustCount?: number;
  /** 目标大类排名 */
  targetCategoryRank?: string;
  /** 目标日销 */
  targetDaySales?: string;
  /** 目标销量 */
  targetSales?: string;
  /** 目标小类排名 */
  targetSubCategoryRank?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /** 子variantId/SKU 新平台 */
  variantId?: string;
}

/** PriceAdjustmentDetailBean */
export interface PriceAdjustmentDetailBean {
  /** 调价价格 */
  adjustPrice?: number;
  /** 申请售价币种编码 */
  adjustPriceCurrencyCode?: string;
  /** 调价毛利率 */
  adjustProfitRate?: string;
  /** 子asin */
  childAsin?: string;
  /** 当前价格 */
  currentPrice?: number;
  /** 现在售价币种编码 */
  currentPriceCurrencyCode?: string;
  /** 当前毛利率 */
  currentProfitRate?: string;
  /** 亚马逊父Asin/独立站&tiktok的ProductId */
  itemCode?: string;
  /** 商品名称 */
  itemName?: string;
  /** 店铺sku */
  msku?: string;
  /** 调价活动编码 */
  paCode?: string;
  /** 子asin记录编码 */
  paDetailCode?: string;
  /** 商品名称 */
  productList?: ProductInfoBean[];
  /** 商品链接 */
  productUrl?: string;
  /** 店铺编码 */
  shop?: string;
  /** 子skuId */
  skuId?: string;
  /** 子itemId */
  subItemId?: string;
  /** 子variantId */
  variantId?: string;
}

/** PriceAdjustmentDetailSaveBean */
export interface PriceAdjustmentDetailSaveBean {
  /** 调价价格 */
  adjustPrice?: number;
  /** 申请售价币种编码 */
  adjustPriceCurrencyCode?: string;
  /** 调价毛利率 */
  adjustProfitRate?: string;
  /** 子asin */
  childAsin?: string;
  /** 当前价格 */
  currentPrice?: number;
  /** 现在售价币种编码 */
  currentPriceCurrencyCode?: string;
  /** 当前毛利率 */
  currentProfitRate?: string;
  /** 亚马逊父asin/独立站&shopify的ProductId */
  itemCode?: string;
  /** 商品名称 */
  itemName?: string;
  /** 店铺sku */
  msku?: string;
  /** 调价活动编码 */
  paCode?: string;
  /** 子asin记录编码 */
  paDetailCode?: string;
  /** 商品路径 */
  productUrl?: string;
  /** 店铺编码 */
  shop?: string;
  /** 子skuId */
  skuId?: string;
  /** 子itemId */
  subItemId?: string;
  /** 子variantId */
  variantId?: string;
}

/** PriceAdjustmentGroupBean */
export interface PriceAdjustmentGroupBean {
  /** 调价明细 */
  detailList?: PriceAdjustmentDetailBean[];
  /** 亚马逊父Asin/独立站&tiktok的ProductId */
  itemCode?: string;
  /** 亚马逊父Asin/独立站&tiktok的ProductId名称 */
  itemName?: string;
}

/** PriceAdjustmentRuleBean */
export interface PriceAdjustmentRuleBean {
  /**
   * 涨价、降价、秒杀和coupon规则的值
   * @format int32
   */
  num?: number;
  /**
   * 涨价、降价、秒杀和coupon规则 1-不得低于现在售价 2-不得高于现在售价 3-不得低于 4-不得高于
   * @format int32
   */
  ruleMode?: number;
  /**
   * 涨价、降价、秒杀和coupon规则 1-负数符号(-) 2-正数符号(+)
   * @format int32
   */
  ruleModeSymbol?: number;
  /**
   * 涨价、降价、秒杀和coupon规则值单位 1-(金额) 2-(%)
   * @format int32
   */
  ruleModeUnit?: number;
  /**
   * 规则监控规则类型 1-涨价 2-降价 3-秒杀 4-coupon
   * @format int32
   */
  ruleType?: number;
  /**
   * 状态 0-关闭 1-开启
   * @format int32
   */
  status?: number;
}

/** PriceAdjustmentRuleOperationLogBean */
export interface PriceAdjustmentRuleOperationLogBean {
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

/** PriceAdjustmentSiteBean */
export interface PriceAdjustmentSiteBean {
  /** 站点编码 */
  siteCode?: string;
  /** 站点名称 */
  siteName?: string;
}

/** PriceAdjustmentStatisticsBean */
export interface PriceAdjustmentStatisticsBean {
  /**
   * 实际大类排名 日排名
   * @format int64
   */
  actualCategoryRank?: number;
  /** 实际售价 */
  actualPrice?: number;
  /**
   * 实际销量 日销量
   * @format int64
   */
  actualSales?: number;
  /**
   * 实际小类排名 日排名
   * @format int64
   */
  actualSubCategoryRank?: number;
  /** 统计日期 */
  statisticsDate?: string;
  /**
   * 目标大类排名
   * @format int64
   */
  targetCategoryRank?: number;
  /**
   * 目标销量 日销量
   * @format int64
   */
  targetSales?: number;
  /**
   * 目标小类排名
   * @format int64
   */
  targetSubCategoryRank?: number;
}

/** PriceInfoSaveReq */
export interface PriceInfoSaveReq {
  /** 申请调价 */
  adjustPrice?: number;
  /** 申请售价币种编码 */
  adjustPriceCurrencyCode?: string;
  /** 调价后毛利率 */
  adjustProfitRate?: string;
  /**
   * 调价类型 1-涨价 2-降价 3-秒杀 4-coupon
   * @format int32
   */
  adjustType?: number;
  /** 复盘说明 */
  ajustReview?: string;
  /** 渠道 */
  channel?: string;
  /** 子Asin/sku信息 */
  childPriceAdjustmentList?: PriceAdjustmentDetailSaveBean[];
  /** Coupon Code */
  couponCode?: string;
  /**
   * Coupon比例
   * @format double
   */
  couponNum?: number;
  /** 现在售价 */
  currentPrice?: number;
  /** 现在售价币种编码 */
  currentPriceCurrencyCode?: string;
  /** 调价前毛利率 */
  currentProfitRate?: string;
  /**
   * 调价周期结束时间
   * @format date
   */
  endTime?: string;
  /** item Id /Seller SKU 新平台 */
  itemId?: string;
  /**
   * 操作类型 1-草稿 2-提交
   * @format int32
   */
  operateType: number;
  /** 调价活动编码 */
  paCode: string;
  /** 父ASIN/SPU 亚马逊平台 */
  parentAsin?: string;
  /**
   * 平台 1-亚马逊 2-独立站 3-新平台 4-tiktok
   * @format int32
   */
  platform: number;
  /** product Id/SPU 独立站平台/tiktok平台 */
  productId?: string;
  /** 品线GTM部门 */
  productLineGtmList?: string[];
  /** 调价原因 */
  reason?: string;
  /** 备注 */
  remark?: string;
  /** 店铺集合 */
  shopList?: string[];
  /** 站点  废弃 */
  shopSite?: string;
  /** 站点集合 */
  siteList?: string[];
  /** sku编码 */
  skuCode?: string;
  /** spu编码 */
  spuCode?: string;
  /** 商品名称 */
  spuName?: string;
  /**
   * 调价周期开始时间
   * @format date
   */
  startTime?: string;
  /** 目标大类排名 */
  targetCategoryRank?: string;
  /** 目标销量 */
  targetSales?: string;
  /** 目标小类排名 */
  targetSubCategoryRank?: string;
}

/** PriceInfoSaveResp */
export interface PriceInfoSaveResp {
  /** 调价编码 */
  paCode?: string;
}

/** PriceInfoSubSaveReq */
export interface PriceInfoSubSaveReq {
  /** 调价价格 */
  adjustPrice?: number;
  /** 申请售价币种编码 */
  adjustPriceCurrencyCode?: string;
  /** 调价毛利率 */
  adjustProfitRate?: string;
  /** 复盘说明 */
  adjustReview?: string;
  /** 当前价格 */
  currentPrice?: number;
  /** 现在售价币种编码 */
  currentPriceCurrencyCode?: string;
  /** 当前毛利率 */
  currentProfitRate?: string;
  /** 调价活动编码 */
  paCode: string;
  /** 调价详情编码 */
  paDetailCode: string;
  /**
   * 平台 1-亚马逊 2-独立站 3-新平台
   * @format int32
   */
  platform: number;
}

/** PriceOperateReq */
export interface PriceOperateReq {
  /**
   * 操作类型 1-复制 2-提交审核 3-取消
   * @format int32
   */
  operateType: number;
  /** 调价活动编码 */
  paCode: string;
  /**
   * 平台 1-亚马逊 2-独立站 3-新平台
   * @format int32
   */
  platform: number;
}

/** PriceRuleOperationLogQueryListResp */
export interface PriceRuleOperationLogQueryListResp {
  /** 操作日志列表 */
  operationLogList?: PriceAdjustmentRuleOperationLogBean[];
  /**
   * 平台 1-亚马逊 2-独立站 3-新平台
   * @format int32
   */
  platform?: number;
}

/** PriceRuleResp */
export interface PriceRuleResp {
  /**
   * 平台 1-亚马逊 2-独立站 3-新平台
   * @format int32
   */
  platform: number;
  /**
   * 过程监控状态 0-关闭 1-开启
   * @format int32
   */
  processMonitoringStatus: number;
  /**
   * 结果监控状态 0-关闭 1-开启
   * @format int32
   */
  resultMonitoringStatus: number;
  /** 规则监控 */
  rulesMonitoring: PriceAdjustmentRuleBean[];
}

/** PriceRuleSaveReq */
export interface PriceRuleSaveReq {
  /**
   * 平台 1-亚马逊 2-独立站 3-新平台
   * @format int32
   */
  platform: number;
  /**
   * 过程监控状态 0-关闭 1-开启
   * @format int32
   */
  processMonitoringStatus: number;
  /**
   * 结果监控状态 0-关闭 1-开启
   * @format int32
   */
  resultMonitoringStatus: number;
  /** 规则监控 */
  rulesMonitoring: PriceAdjustmentRuleBean[];
}

/** ProductInfoBean */
export interface ProductInfoBean {
  /** 商品币种 */
  productCurrencyCode?: string;
  /** 商品图片地址 */
  productImage?: string;
  /** 商品名称 */
  productName?: string;
  /** 商品价格 */
  productPrice?: number;
  /** SKU商品编码 */
  skuCode?: string;
}

/** ProductSKuBean */
export interface ProductSKuBean {
  /**
   * 数量
   * @format int32
   */
  num?: number;
  /** 品线 */
  productLine?: string;
  /** 品线描述 */
  productLineDesc?: string;
  /** 产品名称 */
  productTitle?: string;
  /** skuCode */
  skuCode?: string;
  /** 建议价格币种 */
  suggestCurrency?: string;
  /** 建议价格 */
  suggestPrice?: number;
}

/** ProductSkuBaseBean */
export interface ProductSkuBaseBean {
  /** 渠道唯一编码（asin/item_id等） */
  platformSkuCode?: string;
  /** 品线 */
  productLine?: string;
  /** 品线描述 */
  productLineDesc?: string;
  /** 产品名称 */
  productTitle?: string;
  /** skuCode */
  skuCode?: string;
  /** 建议价格币种 */
  suggestCurrency?: string;
  /** 建议价格 */
  suggestPrice?: number;
}

/** QueryPriceInfoListResp */
export interface QueryPriceInfoListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /**
   * 平台 1-亚马逊 2-独立站 3-新平台
   * @format int32
   */
  platform?: number;
  /** 调价信息列表 */
  priceAdjustmentBeanList?: PriceAdjustmentBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** QueryPriceInfoResp */
export interface QueryPriceInfoResp {
  /** 申请调价 */
  adjustPrice?: number;
  /** 申请售价币种编码 */
  adjustPriceCurrencyCode?: string;
  /** 调价后毛利率 */
  adjustProfitRate?: string;
  /** 复盘说明 */
  adjustReview?: string;
  /**
   * 调价类型 1-涨价 2-降价 3-秒杀 4-coupon
   * @format int32
   */
  adjustType?: number;
  /**
   * 审批状态 0-草稿中 1-审核中 2-审核通过 3-审核驳回 4-取消
   * @format int32
   */
  approveStatus?: number;
  /** 渠道 */
  channel?: string;
  /** 子Asin/sku信息 */
  childPriceAdjustmentList?: PriceAdjustmentDetailBean[];
  /** Coupon Code */
  couponCode?: string;
  /**
   * Coupon比例
   * @format double
   */
  couponNum?: number;
  /** 现在售价 */
  currentPrice?: number;
  /** 现在售价币种编码 */
  currentPriceCurrencyCode?: string;
  /** 调价前毛利率 */
  currentProfitRate?: string;
  /**
   * 调价周期结束时间
   * @format date-time
   */
  endTime?: string;
  /** 亚马逊父Asin/独立站&tiktok的ProductId */
  itemCodeList?: string[];
  /** itemId/SellerSKU新平台 */
  itemId?: string;
  /** 调价活动编码 */
  paCode: string;
  /** 父ASIN/SPU */
  parentAsin?: string;
  /**
   * 平台 1-亚马逊 2-独立站 3-新平台
   * @format int32
   */
  platform: number;
  /** 亚马逊父Asin/独立站&tiktok的ProductId的子商品分组 */
  priceAdjustmentGroupList?: PriceAdjustmentGroupBean[];
  /** productId/SPU 独立站平台/tiktok平台 */
  productId?: string;
  /** 品线GTM-废弃 */
  productLineGtm?: string;
  /** 品线GTM部门 */
  productLineGtmList?: string[];
  /** 调价原因 */
  reason?: string;
  /** 备注 */
  remark?: string;
  /** 店铺集合 */
  shopList?: string[];
  /** 站点 废弃 */
  shopSite?: string;
  /** 站点名称 */
  shopSiteDesc?: string;
  /** 站点集合 */
  siteList?: string[];
  /** 商品名称 */
  spuName?: string;
  /**
   * 调价周期开始时间
   * @format date-time
   */
  startTime?: string;
  /**
   * 活动状态 0-草稿中 1-待审核 2-已生效 3-已结束 4-已取消
   * @format int32
   */
  status?: number;
  /** 目标大类排名 */
  targetCategoryRank?: string;
  /** 目标销量 */
  targetSales?: string;
  /** 目标小类排名 */
  targetSubCategoryRank?: string;
}

/** QuerySubPriceInfoResp */
export interface QuerySubPriceInfoResp {
  /** 申请调价 */
  adjustPrice?: number;
  /** 申请售价币种编码 */
  adjustPriceCurrencyCode?: string;
  /** 调价后毛利率 */
  adjustProfitRate?: string;
  /**
   * 调价类型 1-涨价 2-降价 3-秒杀 4-coupon
   * @format int32
   */
  adjustType?: number;
  /** 复盘说明 */
  ajustReview?: string;
  /**
   * 审批状态 0-草稿中 1-审核中 2-审核通过 3-审核驳回 4-取消
   * @format int32
   */
  approveStatus?: number;
  /** 渠道 */
  channel?: string;
  /** 子Asin/sku信息 */
  childPriceAdjustment?: PriceAdjustmentDetailBean;
  /** Coupon Code */
  couponCode?: string;
  /**
   * Coupon比例
   * @format double
   */
  couponNum?: number;
  /** 现在售价 */
  currentPrice?: number;
  /** 现在售价币种编码 */
  currentPriceCurrencyCode?: string;
  /** 调价前毛利率 */
  currentProfitRate?: string;
  /**
   * 调价周期结束时间
   * @format date-time
   */
  endTime?: string;
  /** 调价活动编码 */
  paCode: string;
  /** 调价详情编码 */
  paDetailCode: string;
  /** 父ASIN/SPU */
  parentAsin?: string;
  /**
   * 平台 1-亚马逊 2-独立站 3-新平台
   * @format int32
   */
  platform: number;
  /** 调价原因 */
  reason?: string;
  /** 备注 */
  remark?: string;
  /** 店铺 */
  shopList?: string[];
  /** 站点  废弃 */
  shopSite?: string;
  /** 站点 */
  siteList?: string[];
  /** SKU */
  skuCode?: string;
  /** sku商品名称 */
  skuName?: string;
  /** spu商品名称 */
  spuName?: string;
  /**
   * 调价周期开始时间
   * @format date-time
   */
  startTime?: string;
  /**
   * 活动状态 0-草稿中 1-待审核 2-已生效 3-已结束 4-已取消
   * @format int32
   */
  status?: number;
  /** 目标大类排名 */
  targetCategoryRank?: string;
  /** 目标销量 */
  targetSales?: string;
  /** 目标小类排名 */
  targetSubCategoryRank?: string;
}

/** QuerySubPriceStatisticsListResp */
export interface QuerySubPriceStatisticsListResp {
  /**
   * 实际大类排名 最前
   * @format int64
   */
  actualMaxCategoryRank?: number;
  /**
   * 实际小类排名 最前
   * @format int64
   */
  actualMaxSubCategoryRank?: number;
  /**
   * 实际销量总和
   * @format int64
   */
  actualSaleSum?: number;
  code?: string;
  message?: string;
  /** 调价活动编码 */
  paCode?: string;
  /** 调价活动详情编码 */
  paDetailCode?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /**
   * 平台 1-亚马逊 2-独立站 3-新平台
   * @format int32
   */
  platform?: number;
  /** 统计结果列表 */
  statisticsList?: PriceAdjustmentStatisticsBean[];
  /** 子asin/子productId/子itemId编码 */
  subCode?: string;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** SellerMonitorBean */
export interface SellerMonitorBean {
  /** 监控等级 A B C */
  monitorLevel?: string;
  /**
   * 通知方式 0:钉钉
   * @format int32
   */
  notifyType?: number;
  /** 通知方式描述 */
  notifyTypeDesc?: string;
  /** 价格类型 促销计划参考价-discount 渠道销售参考价-msrp */
  priceType?: string;
  /** 价格类型描述 */
  priceTypeDesc?: string;
  /** 金额百分比% 0~100 */
  rate?: number;
  /** 规则编码 */
  roleCode?: string;
}

/** SellerMonitorOperateReq */
export interface SellerMonitorOperateReq {
  /** 操作类型 enable-启动 disable-关闭 */
  operateType?: string;
  /**
   * 产品类型 1-指定msku 2-sku 3-spu 4-全量msku
   * @format int32
   */
  productType?: number;
  /** 唯一编码 */
  rpaCode: string;
}

/** SellerMskuDetailResp */
export interface SellerMskuDetailResp {
  /** 子ASIN */
  asin?: string;
  /** 渠道 */
  channel?: string;
  /** 当前售价 */
  currPrice?: number;
  /** 当前售价币种 */
  currency?: string;
  /** 监控设置 */
  monitorList?: SellerMonitorBean[];
  /** 店铺sku */
  msku?: string;
  /** msrp信息 */
  msrpList?: MsrpBean[];
  /** 运营编码 */
  operator?: string;
  /** 运营人 */
  operatorName?: string;
  /** 父ASIN */
  parentAsin?: string;
  /** 产品信息 */
  productSkuList?: ProductSKuBean[];
  /** 在线商品状态 */
  productStatusDesc?: string;
  /** 唯一编码 */
  rpaCode?: string;
  /** 店铺 */
  shop?: string;
  /** 站点 */
  site?: string;
  /**
   * 状态 1-启用 0-关闭
   * @format int32
   */
  status?: number;
  /** 建议售价币种 */
  suggestCurrency?: string;
  /** 建议售价 */
  suggestPrice?: number;
  /**
   * 最新更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** SellerMskuQueryBean */
export interface SellerMskuQueryBean {
  /** 子asin */
  asin?: string;
  /** 渠道 */
  channel?: string;
  /** 当前售价 */
  currPrice?: number;
  /** 当前售价币种 */
  currency?: string;
  /** 监控内容集合 */
  monitorList?: MonitorBean[];
  /**
   * 监控启动状态 1-启动 0-关闭
   * @format int32
   */
  monitorStatus?: number;
  /** 监控启动状态 1-启动 0-关闭 */
  monitorStatusDesc?: string;
  /** 店铺sku */
  msku?: string;
  /** msrp信息 */
  msrpList?: MsrpBean[];
  /** 运营编码 */
  operator?: string;
  /** 运营人 */
  operatorName?: string;
  /** 产品信息 */
  productSkuList?: ProductSkuBean[];
  /** 唯一编码 */
  rpaCode?: string;
  /** 店铺 */
  shop?: string;
  /** 站点 */
  site?: string;
  /** 在线商品状态 */
  statusDesc?: string;
  /**
   * 最新更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** SellerMskuQueryResp */
export interface SellerMskuQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 售价信息集合 */
  sellerSkuList?: SellerMskuQueryBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** SellerSkuAllMskuDetailResp */
export interface SellerSkuAllMskuDetailResp {
  /** 渠道 */
  channel?: string;
  /** 国家 */
  country?: string;
  /** 国家 */
  countryCode?: string;
  /** 监控设置 */
  monitorList?: SellerMonitorBean[];
  /**
   * 监控范围
   * @format int32
   */
  monitorRange?: number;
  /** `监控范围 1-全量商品 0-指定商品` */
  monitorRangeDesc?: string;
  /**
   * 状态 1-启用 0-关闭
   * @format int32
   */
  monitorStatus?: number;
  /** 状态 1-启用 0-关闭 */
  monitorStatusDesc?: string;
  /**
   * 监控类型
   * @format int32
   */
  monitorType?: number;
  /**
   * 产品类型 1-指定msku 2-sku 3-spu 4-全量msku
   * @format int32
   */
  productType?: number;
  /** 记录编码 */
  rpaCode?: string;
}

/** SellerSkuAllMskuQueryBean */
export interface SellerSkuAllMskuQueryBean {
  /** 渠道 */
  channel?: string;
  /** 国家 */
  country?: string;
  /** 监控内容集合 */
  monitorList?: MonitorBean[];
  /**
   * 监控启动状态 1-启动 0-关闭
   * @format int32
   */
  monitorStatus?: number;
  /** 监控启动状态 1-启动 0-关闭 */
  monitorStatusDesc?: string;
  /**
   * 监控类型
   * @format int32
   */
  monitorType?: number;
  /** 监控类型 */
  monitorTypeDesc?: string;
  /** 唯一编码 */
  rpaCode?: string;
  /** 店铺 */
  shop?: string;
}

/** SellerSkuAllMskuQueryReq */
export interface SellerSkuAllMskuQueryReq {
  /** 渠道 */
  channel?: string;
  /** 国家 */
  countryCode?: string;
  /** 关键词 */
  keyword?: string;
  /**
   * 监控状态 1-开启 0-关闭
   * @format int32
   */
  monitorStatus?: number;
  /**
   * 监控类型
   * @format int32
   */
  monitorType?: number;
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
   * 产品类型
   * @format int32
   */
  productType?: number;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
}

/** SellerSkuAllMskuQueryResp */
export interface SellerSkuAllMskuQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 监控信息 */
  recordList?: SellerSkuAllMskuQueryBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** SellerSkuCommonResp */
export interface SellerSkuCommonResp {
  /** 唯一编码 */
  rpaCode?: string;
}

/** SellerSkuDetailReq */
export interface SellerSkuDetailReq {
  /** 唯一编码 */
  rpaCode: string;
}

/** SellerSkuDetailResp */
export interface SellerSkuDetailResp {
  /** 监控设置 */
  monitorList?: SellerMonitorBean[];
  /** 渠道销售价格MSRP */
  msrp?: string;
  /** 品线 */
  productLine?: string;
  /** 品线名称 */
  productLineName?: string;
  /**
   * 商品状态
   * @format int32
   */
  productStatus?: number;
  /** 商品状态描述 */
  productStatusDesc?: string;
  /** 记录编码 */
  rpaCode?: string;
  /** 商品sku */
  skuCode?: string;
  /** 商品sku名称 */
  skuName?: string;
  /**
   * 状态 1-启用 0-关闭
   * @format int32
   */
  status?: number;
}

/** SellerSkuQueryBean */
export interface SellerSkuQueryBean {
  /** 对象编码 商品SPU/商品SKU */
  itemCode?: string;
  /** 商品名称 */
  itemName?: string;
  /** 监控内容集合 */
  monitorList?: MonitorBean[];
  /**
   * 监控启动状态 1-启动 0-关闭
   * @format int32
   */
  monitorStatus?: number;
  /** 监控启动状态 1-启动 0-关闭 */
  monitorStatusDesc?: string;
  /** 渠道售价MSRP */
  msrp?: string;
  /** 运营编码 */
  operator?: string;
  /** 运营人 */
  operatorName?: string;
  /** 产品品线 */
  productLine?: string;
  /** 产品品线名称 */
  productLineDesc?: string;
  /** 产品信息 */
  productSkuList?: ProductSkuBean[];
  /**
   * 产品状态
   * @format int32
   */
  productStatus?: number;
  /** 产品状态描述 */
  productStatusDesc?: string;
  /** 唯一编码 */
  rpaCode?: string;
  /**
   * 最新更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** SellerSkuQueryResp */
export interface SellerSkuQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 监控信息 */
  sellerSkuList?: SellerSkuQueryBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** SellerSkuRecordBean */
export interface SellerSkuRecordBean {
  /** 差额 */
  balance?: string;
  /** 渠道 */
  channel?: string;
  /** 渠道信息 */
  channelInfo?: string;
  /** 异常信息描述 */
  errorDesc?: string;
  /** 异常类型 */
  errorMonitorType?: string;
  /** 异常类型 */
  errorMonitorTypeDesc?: string;
  /** gmv */
  gmv?: string;
  /**
   * 监控类型
   * @format int32
   */
  monitorType?: number;
  /** 监控类型 */
  monitorTypeDesc?: string;
  /** 店铺sku-msku */
  msku?: string;
  /** 店铺sku信息 */
  mskuInfo?: string;
  /** 运营编码 */
  operator?: string;
  /** 运营人员 */
  operatorName?: string;
  /** 渠道唯一编码（asin/item_id等） */
  platformSkuCode?: string;
  /** 成交价格 */
  price?: string;
  /** 产品信息 */
  productInfo?: string;
  /** 产品信息明细 */
  productSku?: ProductSkuBaseBean;
  /**
   * 监控日期
   * @format date
   */
  recordDate?: string;
  /** 参考价 */
  referencePrice?: string;
  /** 参考价类型 */
  referenceType?: string;
  /** 参考价类型 */
  referenceTypeDesc?: string;
  /** 规则编码 */
  rpaCode?: string;
  /** 店铺 */
  shop?: string;
  /** 站点 */
  site?: string;
}

/** SellerSkuRecordResp */
export interface SellerSkuRecordResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 售价信息集合 */
  sellerSkuList?: SellerSkuRecordBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** SellerSkuRpaSaveReq */
export interface SellerSkuRpaSaveReq {
  /** 渠道 */
  channel?: string;
  /** 国家 */
  countryCode?: string;
  /** 监控信息集合 */
  monitorList: SellerMonitorBean[];
  /**
   * 监控范围 1-全量商品 0-指定商品
   * @format int32
   */
  monitorRange?: number;
  /**
   * 监控状态 1-开启 0-关闭
   * @format int32
   */
  monitorStatus?: number;
  /**
   * 监控类型 1- 价格监控
   * @format int32
   */
  monitorType?: number;
  /**
   * 在线商品集合
   * @example "监控范围是特定商品时，至少勾选一个在线商品"
   */
  onLineProductList: SellerSkuSaveBean[];
  /**
   * 产品类型
   * @format int32
   */
  productType?: number;
  /** 唯一编码集合 */
  rpaCodeList: string[];
}

/** SellerSkuSaveBean */
export interface SellerSkuSaveBean {
  /** 渠道 */
  channel?: string;
  /** 店铺sku */
  msku?: string;
  /** 店铺 */
  shop?: string;
  /** 站点 */
  site?: string;
  /** 商品sku */
  skuCode?: string;
}

/** productSkuBean */
export interface ProductSkuBean {
  /** 品线 */
  productLine?: string;
  /** 品线描述 */
  productLineDesc?: string;
  /** 产品名称 */
  productTitle?: string;
  /** skuCode */
  skuCode?: string;
  /** 建议价格币种 */
  suggestCurrency?: string;
  /** 建议价格 */
  suggestPrice?: number;
}

/** CommonResp«object» */
export interface CommonRespObject {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: object;
  traceId?: string;
}
