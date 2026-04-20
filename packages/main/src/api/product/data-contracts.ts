/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** ActiveDiscountPlanAddBean */
export interface ActiveDiscountPlanAddBean {
  /** sku列表 */
  activeDiscountSkuList?: ActiveDiscountPlanAddSkuBeanRes[];
  /** 唯一键 */
  code?: string;
  /**
   * 产品类型
   * @format int32
   */
  productType?: number;
  /** spu编码 */
  spuCode?: string;
  /** spu名称 */
  spuName?: string;
  /** 对应周销售额数据 */
  weekSaleInfoList?: WeekSaleInfo[];
}

/** ActiveDiscountPlanAddQueryResp */
export interface ActiveDiscountPlanAddQueryResp {
  /** sku列表 */
  activeDiscountSkuBeanList?: ActiveDiscountPlanAddSkuBeanRes[];
  /** 渠道 */
  channel?: string;
  channelDesc?: string;
  /** 唯一键 */
  code?: string;
  /** 国家 */
  countryCode?: string;
  countryDesc?: string;
  /** GTM组 */
  gtm?: string;
  /** 运营 */
  operator?: string;
  operatorDesc?: string;
  /**
   * 产品类型
   * @format int32
   */
  productType?: number;
  /** MSRP价格 */
  salePriceStr?: string;
  /** sku列表 */
  skuCodeList?: string[];
  /** spu编码 */
  spuCode?: string;
  /** spu名称 */
  spuName?: string;
  /** 对应周销售额数据 */
  weekSaleInfoList?: WeekSaleInfo[];
}

/** ActiveDiscountPlanAddReq */
export interface ActiveDiscountPlanAddReq {
  /** sku列表 */
  activeDiscountSkuBeanList?: ActiveDiscountPlanAddSkuBeanReq[];
  /** 渠道 */
  channel: string;
  /** 记录编码记录编码 */
  code: string;
  /** 国家 */
  countryCode: string;
  /** gtm组 */
  gtm: string;
  /** 运营 */
  operator: string;
  /** spu编码 */
  spuCode: string;
  /** 对应周销售额数据 */
  weekSaleInfoList?: WeekSaleSaveInfo[];
}

/** ActiveDiscountPlanAddSkuBeanReq */
export interface ActiveDiscountPlanAddSkuBeanReq {
  /** 唯一键 */
  code: string;
  /** sku编码 */
  skuCode: string;
  /** spu编码 */
  spuCode: string;
  /** 对应周销售额数据 */
  weekSaleInfoList?: WeekSaleSaveInfo[];
}

/** ActiveDiscountPlanAddSkuBeanRes */
export interface ActiveDiscountPlanAddSkuBeanRes {
  /** 渠道 */
  channel?: string;
  /** 唯一键 */
  code?: string;
  /** 国家 */
  countryCode?: string;
  /** 币种 */
  currency?: string;
  /**
   * 产品类型
   * @format int32
   */
  productType?: number;
  /** sku编码 */
  skuCode?: string;
  /** spu名称 */
  skuName?: string;
  /** sku的msrp价格 */
  skuSalePrice?: number;
  /** spu编码 */
  spuCode?: string;
  /** 对应周销售额数据 */
  weekSaleInfoList?: WeekSaleInfo[];
}

/** ActiveDiscountPlanAddSpuBean */
export interface ActiveDiscountPlanAddSpuBean {
  /** sku列表 */
  activeDiscountSkuList?: ActiveDiscountPlanAddSkuBeanReq[];
  /** 记录编码 */
  code?: string;
  /** 对应周销售额数据 */
  weekSaleInfoList?: WeekSaleSaveInfo[];
}

/** ActiveDiscountPlanBatchAddReq */
export interface ActiveDiscountPlanBatchAddReq {
  /** 添加列表 */
  activeDiscountSpuList?: ActiveDiscountPlanAddSpuBean[];
}

/** ActiveDiscountPlanBatchEditQueryReq */
export interface ActiveDiscountPlanBatchEditQueryReq {
  codeList?: string[];
}

/** ActiveDiscountPlanBatchEditQueryResp */
export interface ActiveDiscountPlanBatchEditQueryResp {
  /** 活动折扣记录集合 */
  activeDiscountSpuList?: ActiveDiscountPlanAddBean[];
}

/** ActiveDiscountPlanListResp */
export interface ActiveDiscountPlanListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 活动折扣计划spu列表 */
  planSpuBeanList?: ActiveDiscountPlanSpuBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** ActiveDiscountPlanReq */
export interface ActiveDiscountPlanReq {
  /** 渠道 */
  channelList?: string[];
  /** 国家 */
  countryCodeList?: string[];
  /**
   * 结束时间
   * @format date
   */
  endTime?: string;
  /** gtm */
  gtmList?: string[];
  /** 关键词 */
  keyword?: string;
  /**
   * 关键词类型 1-spu 2-sku 3-产品名称
   * @format int32
   */
  keywordType?: number;
  /** 运营 */
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
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /**
   * 开始时间
   * @format date
   */
  startDate?: string;
}

/** ActiveDiscountPlanSpuBean */
export interface ActiveDiscountPlanSpuBean {
  /** sku列表 */
  activeDiscountSkuBeanList?: ActiveDiscountPlanAddSkuBeanRes[];
  /** 渠道 */
  channel?: string;
  channelDesc?: string;
  /** 唯一键 */
  code?: string;
  /** 国家 */
  countryCode?: string;
  countryDesc?: string;
  /** GTM组 */
  gtm?: string;
  /** 运营 */
  operator?: string;
  operatorDesc?: string;
  /**
   * 产品类型
   * @format int32
   */
  productType?: number;
  /** MSRP价格 */
  salePriceStr?: string;
  /** sku列表 */
  skuCodeList?: string[];
  /** spu编码 */
  spuCode?: string;
  /** spu名称 */
  spuName?: string;
  /** 对应周销售额数据 */
  weekSaleInfoList?: WeekSaleInfo[];
}

/** AddActivityDetailResp */
export interface AddActivityDetailResp {
  /** 渠道 */
  channel?: string;
  /** 国家编码 */
  countryCode?: string;
  /** SKU编码列表 */
  skuCodeList?: string[];
  /** SPU编码 */
  spuCode?: string;
  /** SPU名称 */
  spuName?: string;
}

/** AddressBean */
export interface AddressBean {
  /** 详细地址 */
  address?: string;
  /** 记录编码 */
  addressCode?: string;
  /** 区/县编码 */
  areaCode?: string;
  /** 市编码 */
  cityCode?: string;
  /** 订单号 */
  orderCode: string;
  /** 省编码 */
  provinceCode?: string;
  /** 收件人名称 */
  receiverName?: string;
  /** 收件人手机号 */
  receiverPhone?: string;
  /** 收件人手机区号 */
  receiverPhoneArea?: string;
}

/** AmazonAsinListBean */
export interface AmazonAsinListBean {
  /** 子ASIN */
  asin?: string;
  categoryCode?: string;
  /** 分类名称 */
  categoryName?: string;
  /** ERP站点 */
  erpSite?: string;
  /** fnSku */
  fnSkuList?: string[];
  /** 商品图片 */
  imageUrl?: string;
  /** 型号 */
  modelCode?: string;
  /** 型号名字 */
  modelName?: string;
  /** msku */
  msku?: string;
  /** 新/老品 */
  newOldProduct?: string;
  /**
   * 运营方式编码
   * @format int32
   */
  operationMethod?: number;
  /** 运营方式名称 */
  operationMethodDesc?: string;
  /** 运营人员编码 */
  operator?: string;
  /** 运营人员名称 */
  operatorName?: string;
  /** 父ASIN */
  parentAsin?: string;
  /** 商品唯一ID */
  productId?: string;
  /** 产品线 */
  productLineCode?: string;
  /** 品线名字 */
  productLineName?: string;
  /** 商品链接 */
  productLink?: string;
  /** 商品名称 */
  productTitle?: string;
  /** 店铺 */
  shop?: string;
  /** 站点 */
  site?: string;
  /** sku编码 */
  skuCode?: string;
  /** spu编码 */
  spuCode?: string;
  /**
   * 商品状态
   * @format int32
   */
  status?: number;
  /** 商品状态描述 */
  statusDesc?: string;
  /** 标签列表 */
  tagList?: ListingTagBean[];
  /** 三级分类编码 */
  thirdCategoryCode?: string;
  /** 三级分类名称 */
  thirdCategoryName?: string;
}

/** AmazonListingParentResp */
export interface AmazonListingParentResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 父ASIN列表 */
  resultList?: AmazonParentBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** AmazonListingReq */
export interface AmazonListingReq {
  /**
   * 批量动作 1-标签
   * @format int32
   */
  actionType?: number;
  /** ASIN/父ASIN */
  asin?: string;
  /** ERP站点 */
  erpSite?: string;
  /** 进行了销量预测的数据 */
  filterSalesforecast?: boolean;
  /** ASIN/父ASIN/MSKu */
  keyword?: string;
  /** 型号 */
  modelCode?: string;
  /** MSKU */
  msku?: string;
  /** 运营人员列表 */
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
  /** 产品线 */
  productLineCode?: string;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 店铺列表 */
  shopList?: string[];
  /** 站点列表 */
  siteList?: string[];
  /** sku列表 */
  skuCodeList?: string[];
  /** 状态列表 1-在售 2-不在售 */
  statusList?: number[];
  /** 标签列表 */
  tagList?: string[];
  /** 三级分类编码 */
  thirdCategoryCode?: string;
}

/** AmazonListingResp */
export interface AmazonListingResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 亚马逊子ASIN列表 */
  resultList?: AmazonAsinListBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** AmazonOperatorBean */
export interface AmazonOperatorBean {
  /** 运营人员编码 */
  operator?: string;
  /** 运营人员姓名 */
  operatorName?: string;
}

/** AmazonOperatorCheckBean */
export interface AmazonOperatorCheckBean {
  /** 三级分类名称 */
  categoryNameLevel3?: string;
  /** 四级分类名称 */
  categoryNameLevel4?: string;
  /** GTM小组 */
  gtm?: string;
  /** 运营人员 */
  operator?: string;
  /**
   * 已配置运营人员数,跟据该字段等于0或者大于1判断如何展示稽查类型
   * @format int32
   */
  operatorCount?: number;
  /** 站点 */
  site?: string;
  /** SPU编码 */
  spuCode?: string;
  /** SPU名称 */
  spuName?: string;
  /** SPU状态 */
  spuState?: string;
}

/** AmazonOperatorCheckDetailBean */
export interface AmazonOperatorCheckDetailBean {
  /** asin */
  asin?: string;
  /** gtm小组 */
  gtm?: string;
  /** msku */
  msku?: string;
  /** 运营人员 */
  operator?: string;
  /** 父asin */
  parentAsin?: string;
  /** 店铺 */
  shop?: string;
  /** 站点 */
  site?: string;
  /** 产品sku编码 */
  skuCode?: string;
  /** 产品sku名称 */
  skuName?: string;
  /** 产品状态 */
  skuState?: string;
  /**
   * 产品状态编码
   * @format int32
   */
  skuStateCode?: number;
  /** 亚马逊商品标题 */
  title?: string;
}

/** AmazonOperatorMethodBean */
export interface AmazonOperatorMethodBean {
  /**
   * 运营方式1
   * @format int32
   */
  operationMethod?: number;
  /** 运营方式描述1 */
  operationMethodDesc?: string;
}

/** AmazonParentBean */
export interface AmazonParentBean {
  /** 子ASIN1 */
  asinList?: string[];
  /** FNSKU */
  fnSkuList?: string[];
  /** 商品图片1 */
  imageUrl?: string;
  /** msku1 */
  mskuList?: string[];
  /**
   * 新/老品
   * @uniqueItems true
   */
  newOldProductList?: string[];
  /** 运营方式列表1 1-FBM 2-FBA */
  operationMethodList?: AmazonOperatorMethodBean[];
  /** 运营人员列表1 */
  operatorList?: AmazonOperatorBean[];
  /** 父ASIN1 */
  parentAsin?: string;
  /** 商品名称1 */
  productTitle?: string;
  /** 店铺1 */
  shop?: string;
  /** 站点1 */
  site?: string;
  /** 商品状态列表1 */
  statusList?: AmazonStatusBean[];
  /** 标签列表1 */
  tagList?: ListingTagBean[];
}

/** AmazonProductListingReq */
export interface AmazonProductListingReq {
  /** 国家列表 */
  countryCodeList?: string[];
  /** ASIN/父ASIN/MSKu */
  keyword?: string;
  /** 运营人员列表 */
  operatorIdList?: string[];
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
  /** 店铺列表 */
  shopList?: string[];
  /** 站点列表 */
  siteList?: string[];
  /**
   * 1-上架 2-下架
   * @format int32
   */
  status?: number;
  /** 标签列表 */
  tagList?: string[];
}

/** AmazonProductListingResp */
export interface AmazonProductListingResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** ASIN列表 */
  resultList?: ProductListingBean[];
  /** 状态数量列表 */
  statusCountBean?: StatusCountBean;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** AmazonProductOperatorCheckDetailReq */
export interface AmazonProductOperatorCheckDetailReq {
  /** 站点 */
  site?: string;
  /** SPU编码 */
  spuCode?: string;
}

/** AmazonProductOperatorCheckReq */
export interface AmazonProductOperatorCheckReq {
  /** 类型 missing:缺失,notUnique:不唯一 */
  checkType?: string;
  /** GTM */
  gtmList?: string[];
  /** spu编码 */
  keyword?: string;
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
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 站点 */
  site?: string[];
}

/** AmazonProductOperatorListResp */
export interface AmazonProductOperatorListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  resultList?: AmazonOperatorCheckBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** AmazonRankingBean */
export interface AmazonRankingBean {
  /** 品类层级 */
  categoryLevel?: string;
  /** 产品分类编码 */
  categoryLevelCode?: string;
  /** 产品分类 */
  categoryLevelCodeDesc?: string;
  /** 品类层级 */
  categoryLevelDesc?: string;
  /**
   * 添加时间
   * @format date-time
   */
  createTime?: string;
  /** 亚马逊运营组 */
  gtmGroup?: string;
  /** 亚马逊运营组 */
  gtmGroupDesc?: string;
  /**
   * 主键ID
   * @format int64
   */
  id?: number;
  /** 组长 */
  leader?: string;
  /** 组长 */
  leaderDesc?: string;
  /** 运营 */
  operator?: string;
  /** 运营 */
  operatorDesc?: string;
  /** 备注 */
  remark?: string;
  /** 站点 */
  site?: string;
  /** 站点 */
  siteDesc?: string;
  /** 监控链接 */
  url?: string;
}

/** AmazonRankingListBatchOperationReq */
export interface AmazonRankingListBatchOperationReq {
  /** id集合 */
  idList: number[];
  /** 组长 */
  leader?: string;
  /** 运营 */
  operator?: string;
}

/** AmazonRankingListOperationReq */
export interface AmazonRankingListOperationReq {
  /**
   * id
   * @format int64
   */
  id: number;
  /** 组长 */
  leader?: string;
  /** 运营 */
  operator?: string;
  /**
   * 备注
   * @minLength 0
   * @maxLength 500
   */
  remark?: string;
}

/** AmazonRankingListQueryListReq */
export interface AmazonRankingListQueryListReq {
  /**
   * 品类层级
   * @format int32
   */
  categoryLevel?: number;
  /** 品类编码 */
  categoryLevelCode?: string;
  /**
   * 添加结束日期
   * @format date-time
   * @example "2025-03-11"
   */
  endDate?: string;
  /** GTM组 */
  gtmGroupList?: number[];
  /** 运营 */
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
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 备注 */
  remark?: string;
  /** 站点 */
  siteList?: string[];
  /**
   * 添加开始日期
   * @format date-time
   * @example "2025-03-04"
   */
  startDate?: string;
}

/** AmazonRankingListQueryListResp */
export interface AmazonRankingListQueryListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 结果列表 */
  resultList?: AmazonRankingBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** AmazonRankingListSaveReq */
export interface AmazonRankingListSaveReq {
  /**
   * 品类层级
   * @format int32
   */
  categoryLevel?: number;
  /** 产品分类 */
  categoryLevelCode?: string;
  /** 亚马逊运营组 */
  gtmGroup: string;
  /** 组长 */
  leader: string;
  /** 运营 */
  operator: string;
  /**
   * 备注
   * @minLength 0
   * @maxLength 500
   */
  remark?: string;
  /** 站点 */
  site: string;
  /** 监控链接 */
  url: string;
}

/** AmazonStatusBean */
export interface AmazonStatusBean {
  /**
   * 商品状态
   * @format int32
   */
  status?: number;
  /** 商品状态描述 */
  statusDesc?: string;
}

/** AttrBean */
export interface AttrBean {
  /** 属性编码 */
  attrCode: string;
  /** 属性值 */
  attrCodeValList: string[];
  /**
   * 序号
   * @format int32
   */
  sort?: number;
}

/** AttrCategoryConnectReq */
export interface AttrCategoryConnectReq {
  /** 属性编码 */
  attrCode: string;
  /** 分类编码，必传 */
  categoryCodeList: string[];
}

/** AttrDataBean */
export interface AttrDataBean {
  /** 属性编码 */
  attrCode?: string;
  /** 属性名称 */
  attrName?: string;
  /** 属性值列表 */
  attrValList?: AttrValBean[];
  /** 属性值名称 */
  attrValueNames?: string;
  /** 关联分类 */
  categoryNames?: string;
  /**
   * 关联分类数量
   * @format int32
   */
  categoryNums?: number;
}

/** AttrDetailResp */
export interface AttrDetailResp {
  /** 属性编码 */
  attrCode?: string;
  /** 属性名称 */
  attrName?: string;
  /** 属性备注 */
  attrRemark?: string;
  /** 属性值列表 */
  attrValueDataBeanList?: AttrValueDataBean[];
  /** 关联分类列表 */
  categoryConnectBeanList?: CategoryConnectBean[];
}

/** AttrListQueryReq */
export interface AttrListQueryReq {
  /** 属性Id */
  attrCode?: string;
  /** 属性名称 */
  attrName?: string;
  /** 属性值名称 */
  attrValueName?: string;
  /** 勾选导出的编码 */
  codeList?: string[];
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

/** AttrListQueryResp */
export interface AttrListQueryResp {
  /** 属性信息列表 */
  attrDataBeanList?: AttrDataBean[];
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

/** AttrOperateReq */
export interface AttrOperateReq {
  /** 属性编码 */
  attrCode: string;
  /** 属性值编码，删除属性值时必传 */
  attrValueCode?: string;
  /** 分类编码，取消关联时必传 */
  cagegoryCode?: string;
  /**
   * 操作类型 1：删除属性 2：删除关联属性值 3：删除关联属性分类关联
   * @format int32
   */
  operateType?: number;
}

/** AttrSaveReq */
export interface AttrSaveReq {
  /** 属性编码,更新时，必传 */
  attrCode?: string;
  /** 属性名称,必填 */
  attrName?: string;
  /** 描述 */
  attrRemark?: string;
  /** 属性值集合 */
  attrValueList?: AttrValueSaveBean[];
  /** 分类编码集合 */
  categoryCodeList?: string[];
}

/** AttrSaveResp */
export interface AttrSaveResp {
  /** 属性编码 */
  attrCode?: string;
}

/** AttrValBean */
export interface AttrValBean {
  /** 属性值编码 */
  attrValueCode?: string;
  /** 属性值名称 */
  attrValueName?: string;
}

/** AttrValSaveReq */
export interface AttrValSaveReq {
  /** 属性编码,必传 */
  attrCode?: string;
  /** 属性值编码,属性值Id */
  attrValueCode?: string;
  /** 属性值名称,必传 */
  attrValueName?: string;
  /** 属性值备注 */
  attrValueRemark?: string;
  /**
   * 序号
   * @format int32
   */
  sort?: number;
}

/** AttrValSaveResp */
export interface AttrValSaveResp {
  /** 属性值编码 */
  attrValueCode?: string;
}

/** AttrValueBean */
export interface AttrValueBean {
  /** 属性值编码 */
  attrValueCode?: string;
  /** 属性值名称 */
  attrValueName?: string;
  /** 是否关联商品 */
  connectFlag?: boolean;
  /** 是否选择 */
  selectFlag?: boolean;
}

/** AttrValueDataBean */
export interface AttrValueDataBean {
  /** 属性编码 */
  attrCode?: string;
  /** 属性值编码,属性值Id */
  attrValueCode?: string;
  /** 属性值名称 */
  attrValueName?: string;
  /** 属性值备注 */
  attrValueRemark?: string;
  /** 是否关联商品 true : 是 false : 否 */
  connectFlag?: boolean;
  /**
   * 序号
   * @format int32
   */
  sort?: number;
}

/** AttrValueSaveBean */
export interface AttrValueSaveBean {
  /** 属性值编码,属性值Id */
  attrValueCode?: string;
  /** 属性值名称,必传 */
  attrValueName: string;
  /** 属性值备注 */
  attrValueRemark?: string;
  /**
   * 序号
   * @format int32
   */
  sort?: number;
}

/** B2cChannelResp */
export interface B2CChannelResp {
  /** 渠道列表 */
  channelList?: string[];
}

/** B2cListingProductBean */
export interface B2CListingProductBean {
  categoryCode?: string;
  /** 分类名称 */
  categoryName?: string;
  /** 渠道 */
  channel?: string;
  /** 渠道名称 */
  channelName?: string;
  /** 国家 */
  countryCode?: string;
  /** 国家名称 */
  countryName?: string;
  /** 币种 */
  currencyCode?: string;
  /**
   * 最近15销量
   * @format int32
   */
  day15Sales?: number;
  /**
   * 最近30销量
   * @format int32
   */
  day30Sales?: number;
  /**
   * 最近7销量
   * @format int32
   */
  day7Sales?: number;
  /** erp站点 */
  erpSite?: string;
  /**
   * 推广首单日期
   * @format date
   */
  firstOrderTime?: string;
  /** 图片 */
  imageUrl?: string;
  /**
   * 上架时间
   * @format date-time
   */
  listingTime?: string;
  /**
   * 销售映射日期
   * @format date
   */
  mappingTime?: string;
  /**
   * 是否缺失映射 0-不缺少 1-缺少
   * @format int32
   */
  missingMapping?: number;
  /** 型号 */
  modelCode?: string;
  /** 型号名字 */
  modelName?: string;
  /** msku */
  msku?: string;
  /** 运营人员编码 */
  operator?: string;
  /** 运营人员名称 */
  operatorName?: string;
  /** 原价 */
  price?: number;
  /** 产品线 */
  productLineCode?: string;
  /** 品线名字 */
  productLineName?: string;
  /** 监控链接 */
  productLink?: string;
  /** 商品名称 */
  productTitle?: string;
  /** 商品链接 */
  productUrl?: string;
  /** 销售SKU/ITEM_ID/子ASIN */
  saleSkuCode?: string;
  /** 店铺 */
  shop?: string;
  /** 站点 */
  site?: string;
  /** 站点名称 */
  siteName?: string;
  /** SKU */
  skuCode?: string;
  /** SPU */
  spuCode?: string;
  /**
   * 状态 0-正常 1-异常
   * @format int32
   */
  status?: number;
  /** 状态描述 0-正常 1-异常 */
  statusDesc?: string;
  /** 标签列表 */
  tagList?: ListingTagBean[];
  /** 三级分类编码 */
  thirdCategoryCode?: string;
  /** 三级分类名称 */
  thirdCategoryName?: string;
}

/** B2cListingProductReq */
export interface B2CListingProductReq {
  /** 渠道 */
  channel?: string;
  /** 国家列表 */
  countryCodeList?: string[];
  /** ERP站点 */
  erpSite?: string;
  /** 进行了销量预测的数据 */
  filterSalesforecast?: boolean;
  /** 销售SKU/ITEM_ID/子ASIN/msku */
  keyword?: string;
  /** 型号 */
  modelCode?: string;
  /** 运营人员列表 */
  operatorIdList?: string[];
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
  /** 产品线 */
  productLineCode?: string;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 店铺列表 */
  shopList?: string[];
  /** 站点列表 */
  siteList?: string[];
  /** SKU列表 */
  skuCodeList?: string[];
  /**
   * 0-正常 1-异常
   * @format int32
   */
  status?: number;
  /** 标签列表 */
  tagList?: string[];
  /** 三级分类编码 */
  thirdCategoryCode?: string;
}

/** B2cProductListingResp */
export interface B2CProductListingResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 在线商品列表 */
  resultList?: B2CListingProductBean[];
  /** 状态数量列表 */
  statusCountBean?: StatusCountBean;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** BatchOperatorReq */
export interface BatchOperatorReq {
  /** 在线商品渠道 walmart、shopify、TikTok、b2c、offline */
  channel?: string;
  /** 运营人员 */
  operator: string;
  /** 在线信息集合 */
  productList: ProductBean[];
}

/** BrandBean */
export interface BrandBean {
  /** 品牌编码 */
  brandCode?: string;
  /** 品牌简码 */
  brandCodeAli?: string;
  /** 品牌描述 */
  brandDesc?: string;
  /** 品牌logo */
  brandLogo?: string;
  /** 品牌名称 */
  brandName?: string;
  /** 英文名称 */
  brandNameEn?: string;
  /**
   * 商品数量
   * @format int64
   */
  brandProductCount?: number;
}

/** BrandDetailResp */
export interface BrandDetailResp {
  /** 品牌详情信息 */
  brandBean?: BrandBean;
  /** 关联商品信息集合 */
  productBeanList?: ProductBean[];
}

/** BrandListQueryReq */
export interface BrandListQueryReq {
  /** 品牌编号 */
  brandCode?: string;
  /** 品牌名称 */
  brandName?: string;
  /** 英文名称 */
  brandNameEn?: string;
  /** 勾选导出的编码 */
  codeList?: string[];
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

/** BrandListQueryResp */
export interface BrandListQueryResp {
  /** 品牌列表 */
  brandBeanList?: BrandBean[];
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

/** BrandOperateReq */
export interface BrandOperateReq {
  /** 品牌编码 */
  brandCode?: string;
  /**
   * 操作类型 1:删除品牌 2：删除品牌与商品的关联
   * @format int32
   */
  operateType?: number;
  /** 商品Spu，删除关联时必传 */
  productSpu?: string;
}

/** BrandProductConnectReq */
export interface BrandProductConnectReq {
  /** 品牌编码 */
  brandCode?: string;
  /** 商品sku集合 */
  productSpuList?: string[];
}

/** BrandSaveReq */
export interface BrandSaveReq {
  /** 品牌编码 */
  brandCode?: string;
  /** 品牌简码 */
  brandCodeAli?: string;
  /** 品牌描述 */
  brandDesc?: string;
  /** 品牌logo */
  brandLogo?: string;
  /** 品牌名称 */
  brandName: string;
  /** 英文名称 */
  brandNameEn?: string;
  /** 商品sku集合,详情有关联商品的时候传 */
  productSpuList?: string[];
}

/** BrandSaveResp */
export interface BrandSaveResp {
  /** 品牌编码 */
  brandCode?: string;
}

/** CategoryAttrBean */
export interface CategoryAttrBean {
  /** 属性编码 */
  attrCode?: string;
  /** 属性名称 */
  attrName?: string;
  /** 属性值编码 */
  attrValueBeanList?: AttrValueBean[];
  /** 该属性是否关联商品 */
  connectFlag?: boolean;
  /**
   * id
   * @format int64
   */
  id?: number;
  /**
   * 序号
   * @format int32
   */
  sort?: number;
}

/** CategoryAttrConnectReq */
export interface CategoryAttrConnectReq {
  /** 属性 */
  attrBeanList?: AttrBean[];
  /** 分类编码 */
  categoryCode: string;
}

/** CategoryAttrLevelBean */
export interface CategoryAttrLevelBean {
  /** 当前分类等级的所有属性 */
  categoryAttrList?: CategoryAttrBean[];
  /**
   * 分类等级
   * @format int32
   */
  level?: number;
}

/** CategoryBean */
export interface CategoryBean {
  /** 分类编码 */
  categoryCode?: string;
  /** 分类名称 四级名称/五级名称 或者 五级名称 */
  categoryName?: string;
  /** 分类名称 一级>二级>三级>四级>五级 */
  fullCategoryName?: string;
}

/** CategoryBean0 */
export interface CategoryBean0 {
  /** 子集 */
  categoryBeanList?: CategoryBean0[];
  /** 分类id */
  categoryCode?: string;
  /** 分类名称 */
  categoryName?: string;
  /** 分类名称-en */
  categoryNameEn?: string;
  /**
   * 是否关联SPU
   * @format int32
   */
  hasCorrelationSpu?: number;
  /** 分类标签编码 */
  labelCode?: string;
  /** 分类标签名称 */
  labelName?: string;
  /**
   * 等级
   * @format int32
   */
  level?: number;
  /** 分类父id */
  parentCategoryCode?: string;
  /** 产品线编码 */
  productLineCode?: string;
  /** 产品线名称 */
  productLineName?: string;
  /**
   * 状态
   * @format int32
   */
  status?: number;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** CategoryChildrenQueryResp */
export interface CategoryChildrenQueryResp {
  /** 子节点列表 */
  childrenList?: CategoryTreeNode[];
}

/** CategoryConnectBean */
export interface CategoryConnectBean {
  /** 分类id */
  categoryCode?: string;
  /** 分类名称 */
  categoryName?: string;
  /** 是否有商品 true : 是 false ：否 */
  connectFlag?: boolean;
  /**
   * 等级
   * @format int32
   */
  level?: number;
  /** 上级分类 */
  parentCategoryCode?: string;
  /** 所有上级分类名称拼接 */
  parentCategoryNames?: string;
}

/** CategoryDetailResp */
export interface CategoryDetailResp {
  /** 所有父级名称拼接 */
  allParCategory?: string;
  /** 属性和属性值信息集合 */
  categoryAttrLevelList?: CategoryAttrLevelBean[];
  /** 分类编码 */
  categoryCode?: string;
  /** 分类描述 */
  categoryDesc?: string;
  /** 分类名称 */
  categoryName?: string;
  /** 英文名称 */
  categoryNameEn?: string;
  /** 当前分类及所有父级名称拼接 */
  currAndAllParCategory?: string;
  /**
   * 层级
   * @format int32
   */
  level?: number;
  /** 分类父id */
  parentCategoryCode?: string;
  /**
   * 产品类型 1-产品 2-配件 3-用研产品  13-组合产品 14-虚拟产品
   * @format int32
   */
  productType?: number;
  /** 产品类型描述 */
  productTypeDesc?: string;
  /**
   * 状态
   * @format int32
   */
  status?: number;
  /** 状态 */
  statusDesc?: string;
}

/** CategoryInfo */
export interface CategoryInfo {
  /** 分类编码 */
  categoryCode?: string;
  /** 分类描述 */
  categoryDescription?: string;
  /** 分类名称 */
  categoryName?: string;
  /** 路径字符串 */
  pathString?: string;
}

/** CategoryItem */
export interface CategoryItem {
  /** 分类编码 */
  categoryCode?: string;
  /** 分类描述 */
  categoryDescription?: string;
  /** 分类名称 */
  categoryName?: string;
  /**
   * 分组等级
   * @format int32
   */
  level?: number;
  /** 操作 */
  operation?: string;
  /** 父分类编码 */
  parentCategoryCode?: string;
  /** 标签组名称 */
  pathString?: string;
  /**
   * 排序
   * @format int32
   */
  sortOrder?: number;
  /**
   * 标签数量
   * @format int64
   */
  tagCount?: number;
}

/** CategoryLevelBean */
export interface CategoryLevelBean {
  /** 分类编码 */
  categoryCode?: string;
  /** 分类名称 */
  categoryName?: string;
  /**
   * 层级
   * @format int32
   */
  level?: number;
  /** 父级分类编码 */
  parentCategoryCode?: string;
  /** 父级分类名称 */
  parentCategoryName?: string;
  /**
   * 排序字段
   * @format int32
   */
  sort?: number;
}

/** CategoryLevelQueryInAttrResp */
export interface CategoryLevelQueryInAttrResp {
  /** 分类列表 */
  categoryLevelBeanList?: CategoryLevelBean[];
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

/** CategoryLevelQueryResp */
export interface CategoryLevelQueryResp {
  /** 分类列表 */
  categoryLevelBeanList?: CategoryLevelBean[];
}

/** CategoryListQueryReq */
export interface CategoryListQueryReq {
  /** 分类名称 */
  categoryName?: string;
  /** 标签组编码 */
  codeList?: string[];
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

/** CategoryListQueryResp */
export interface CategoryListQueryResp {
  /** 分类列表 */
  categoryList?: CategoryItem[];
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

/** CategoryNodeBean */
export interface CategoryNodeBean {
  /** 分类编码 */
  categoryCode?: string;
  /** 分类名称 */
  categoryName?: string;
  /** 子节点 */
  children?: CategoryNodeBean[];
  /**
   * 分类层级
   * @format int32
   */
  level?: number;
  /** 关联员工编码 */
  memberCode?: string;
  /** 员工名称 */
  memberName?: string;
  /** 父分类编码 */
  parentCategoryCode?: string;
  /**
   * 是否勾选
   * @format int32
   */
  selected?: number;
  /**
   * 状态
   * @format int32
   */
  status?: number;
  /** 状态描述 */
  statusDesc?: string;
}

/** CategoryOperateReq */
export interface CategoryOperateReq {
  /** 属性编码，取消关联时必传 */
  attrCode: string;
  /** 属性值编码，取消关联属性值必传 */
  attrValueCode?: string;
  /** 分类编码 */
  categoryCode: string;
  /**
   * 操作类型CategoryOperateTypeEnum 1：取消分类与属性的关联 2: 取消分类与属性值的关联  3 生效VALID_OPERATE 4 失效UN_VALID_OPERATE
   * @format int32
   */
  operateType: number;
}

/** CategorySaveReq */
export interface CategorySaveReq {
  /** 属性 */
  attrBeanList?: AttrBean[];
  /** 分类id,分类编码 */
  categoryCode?: string;
  /** 类目描述 */
  categoryDesc?: string;
  /** 分类名称 */
  categoryName: string;
  /** 英文名称 */
  categoryNameEn: string;
  /**
   * 等级
   * @format int32
   * @min 1
   * @exclusiveMin false
   * @max 5
   * @exclusiveMax false
   */
  level: number;
  /** 分类父id */
  parentCategoryCode: string;
  /**
   * 产品类型ProductTypeEnum 1-产品 2-配件 3-用研产品  13-组合产品 14-虚拟产品
   * @format int32
   */
  productType?: number;
}

/** CategorySaveResp */
export interface CategorySaveResp {
  /** 分类编码 */
  categoryCode?: string;
}

/** CategoryTreeNode */
export interface CategoryTreeNode {
  /** 分类编码 */
  categoryCode?: string;
  /** 分类描述 */
  categoryDescription?: string;
  /** 分类名称 */
  categoryName?: string;
  /** 子节点列表 */
  children?: CategoryTreeNode[];
  /**
   * 层级
   * @format int32
   */
  level?: number;
  /** 父分类编码 */
  parentCategoryCode?: string;
  /** 路径字符串 */
  pathString?: string;
  /**
   * 排序
   * @format int32
   */
  sortOrder?: number;
  /**
   * 标签数量
   * @format int64
   */
  tagCount?: number;
}

/** CategoryTreeResp */
export interface CategoryTreeResp {
  /** 树节点列表 */
  treeList?: CategoryTreeNode[];
}

/** ChargeBean */
export interface ChargeBean {
  memberCode?: string;
  memberName?: string;
}

/** ChartInfo */
export interface ChartInfo {
  /** 时间轴 */
  dateTime?: string;
  /** 是否是有竞争力价格-[type=4,true-有竞争力价格，false-购物车价格] */
  hasCompetitivenessPrice?: boolean;
  /**
   * 跟卖异常 0-正常 1-异常
   * @format int32
   */
  hasHijackErr?: number;
  /** 跟卖异常 0-正常 1-异常  */
  hasHijackErrDesc?: string;
  /**
   * 丢失购物车 0-否 1-是
   * @format int32
   */
  hasMissingShopCart?: number;
  /** 丢失购物车 0-否 1-是 */
  hasMissingShopCartDesc?: string;
  /**
   * 退货标记 0-正常 1-高退货率
   * @format int32
   */
  hasReturnRisk?: number;
  /** 退货标记 0-正常 1-高退货率 */
  hasReturnRiskDesc?: string;
  /** 有竞争力价格 */
  num?: number;
  /** 跟卖店铺信息<店铺名, url> */
  shopMap?: Record<string, string>;
  /**
   * 跟卖店铺数量
   * @format int32
   */
  shopNum?: number;
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

/** CountryAreaListResp */
export interface CountryAreaListResp {
  /** 区域名称 */
  area?: string;
  /** 国家信息列表 */
  countryInfoList?: CountryInfoBean[];
  /** 国家列表（中文名称） */
  countryList?: string[];
}

/** CountryInfoBean */
export interface CountryInfoBean {
  /** 国家编码 */
  countryCode?: string;
  /** 国家名称 */
  countryName?: string;
  /** 国家英文名 */
  countryNameEn?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** CreateCategoryReq */
export interface CreateCategoryReq {
  /** 分类编码 */
  categoryCode?: string;
  /** 分类描述 */
  categoryDescription?: string;
  /** 分类名称 */
  categoryName: string;
  /** 父分类编码 */
  parentCategoryCode?: string;
}

/** CreateCategoryResp */
export interface CreateCategoryResp {
  /** 分类编码 */
  categoryCode?: string;
  /** 分类名称 */
  categoryName?: string;
}

/** DeptMemberListQueryResp */
export interface DeptMemberListQueryResp {
  /** 成员列表 */
  memberList?: MemberBean[];
}

/** DeriveListParamResp */
export interface DeriveListParamResp {
  /** 申请原因 */
  applyReasonList?: EnumBeanString[];
  /** 变更领域 */
  changeFieldList?: EnumBeanString[];
  /** 优先级 */
  priorityList?: EnumBeanString[];
  /** 品线列表 */
  productLineList?: EnumBeanString[];
}

/** DeriveProductBean */
export interface DeriveProductBean {
  /** 申请原因 */
  applyReason?: string;
  /** 审批编码 */
  approvalCode?: string;
  /** 变更领域 */
  changeField?: string;
  /** 上市区域/地区 */
  country?: string;
  /** 申请人 */
  creator?: string;
  /** 申请人名称 */
  creatorName?: string;
  /** 需求详细描述 */
  demandDesc?: string;
  /**
   * 期望收单交付时间
   * @format date
   */
  expectDeliveryTime?: string;
  /** 首单数量需求 */
  firstNumDemand?: string;
  /** 预测销量 */
  forecastNum?: string;
  /** GTM负责人 */
  gtmList?: ChargeBean[];
  /** 项目经理 */
  pmList?: ChargeBean[];
  /** 优先级 P0-高 P1-中 P2-低 */
  priority?: string;
  /** 产品品线 */
  productLine?: string;
  /** 产品品线名称 */
  productLineDesc?: string;
  /** 项目背景描述 */
  projectBackground?: string;
  /** 基准sku */
  standardSku?: string;
  /**
   * 状态
   * @format int32
   */
  status?: number;
  /** 状态描述 */
  statusDesc?: string;
}

/** DeriveQueryResp */
export interface DeriveQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 项目列表 */
  productList?: DeriveProductBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** DictCommonBean */
export interface DictCommonBean {
  desc?: string;
  /** 过滤关键字 */
  filterKeyWord?: string;
  value?: string;
}

/** DictSalesChannelResp */
export interface DictSalesChannelResp {
  code?: string;
  /** 路特渠道信息集合 */
  dictSalesChannelList?: OdsDictSalesChannelBean[];
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

/** DimSkuInfoBean */
export interface DimSkuInfoBean {
  categoryCodeLevel1?: string;
  categoryCodeLevel2?: string;
  categoryCodeLevel3?: string;
  categoryCodeLevel4?: string;
  categoryCodeLevel5?: string;
  categoryNameLevel1?: string;
  categoryNameLevel2?: string;
  categoryNameLevel3?: string;
  categoryNameLevel4?: string;
  categoryNameLevel5?: string;
  operatorCenter?: string;
  productLine?: string;
  productLineCode?: string;
  productLineLeader?: string;
  productLineMarket?: string;
  productLineMarketGroup?: string;
  productLineMarketName?: string;
  skuBrand?: string;
  skuBrandName?: string;
  skuCode?: string;
  skuColor?: string;
  skuDeveloper?: string;
  skuDeveloperDept?: string;
  skuDeveloperName?: string;
  skuHeight?: number;
  skuImage?: string;
  skuLength?: number;
  /** @format date-time */
  skuListingTime?: string;
  skuModelCode?: string;
  skuModelName?: string;
  skuName?: string;
  skuNameEn?: string;
  skuNetWeight?: number;
  skuPack?: string;
  skuPlannerCode?: string;
  skuPurchaseBasePrice?: number;
  skuSize?: string;
  /** @format int32 */
  skuState?: number;
  skuStateDesc?: string;
  skuSuggestPrice?: number;
  skuSuggestPriceCurrency?: string;
  skuWeight?: number;
  skuWidth?: number;
  spuCode?: string;
  spuModelCode?: string;
  spuModelName?: string;
  spuName?: string;
  spuNameEn?: string;
  spuProductType?: string;
}

/** DiscountPlanWeekApproveReq */
export interface DiscountPlanWeekApproveReq {
  /** code编码 */
  code?: string;
  /** 对应周销售额数据 */
  weekSaleInfoList: WeekSaleBaseInfo[];
}

/** DiscountPlanWeekCancelReq */
export interface DiscountPlanWeekCancelReq {
  /** 记录编码 */
  code: string;
  /** 促销活动周记录编码 */
  discountPlanCodeList: string[];
}

/** DiscountPlanWeekEditReq */
export interface DiscountPlanWeekEditReq {
  /** code编码 */
  code?: string;
  /** 对应周销售额数据 */
  weekSaleInfoList: WeekSaleSaveInfo[];
}

/** EccangSkuBean */
export interface EccangSkuBean {
  /** 商品图片 */
  produceImage?: string;
  /** SKU */
  skuCode?: string;
  /** SKU名称 */
  skuName?: string;
  /** 供应链SKU */
  supplierBeanList?: EccangSkuSupplierBean[];
}

/** EccangSkuBean2 */
export interface EccangSkuBean2 {
  /** 默认供应商 */
  defaulSupplierName?: string;
  /** 默认供应商编码 */
  defaultSupplierCode?: string;
  eccangSkuDetailExcelBean?: EccangSkuDetailExcelBean;
  new?: boolean;
  /** 新供应链SKU */
  newProductSku?: string;
  /** 商品图片 */
  produceImage?: string;
  /** 供应链SKU */
  productSku?: string;
  /** SKU */
  skuCode?: string;
  /** SKU名称 */
  skuName?: string;
  /**
   * 对应产品sku状态
   * @format int32
   */
  skuState?: number;
  /** 对应产品sku状态描述 */
  skuStateDesc?: string;
  /** 供应商编码 */
  supplierCode?: string;
  /** 供应商 */
  supplierName?: string;
  /** 同步易仓结果 */
  syncResult?: string;
}

/** EccangSkuDetailExcelBean */
export interface EccangSkuDetailExcelBean {
  categoryCodeLevel1?: string;
  categoryCodeLevel2?: string;
  categoryCodeLevel3?: string;
  categoryCodeLevel4?: string;
  categoryCodeLevel5?: string;
  categoryNameLevel1?: string;
  categoryNameLevel2?: string;
  categoryNameLevel3?: string;
  categoryNameLevel4?: string;
  categoryNameLevel5?: string;
  productLine?: string;
  productLineMarket?: string;
  /** 供应链SKU */
  productSku?: string;
  skuBrand?: string;
  /** SKU */
  skuCode?: string;
  skuDeveloper?: string;
  /** 商品SKU名称 */
  skuName?: string;
  spuCode?: string;
  spuName?: string;
}

/** EccangSkuExcelBean */
export interface EccangSkuExcelBean {
  productSku?: string;
  skuCode?: string;
  skuName?: string;
  supplierName?: string;
}

/** EccangSkuExcelBean2 */
export interface EccangSkuExcelBean2 {
  /** 新供应链SKU */
  newProductSku?: string;
  /** 供应链SKU */
  productSku?: string;
  /** SKU */
  skuCode?: string;
  /** 商品SKU名称 */
  skuName?: string;
}

/** EccangSkuFullBean */
export interface EccangSkuFullBean {
  /** 品牌代码 */
  brandCode?: string;
  /** 品牌名称 */
  brandName?: string;
  /** 自定义分类 */
  customCategory?: string;
  /** 申报说明 */
  declareExplain?: string;
  /**
   * 默认采购仓库
   * @format int32
   */
  defaulBuyWarehouseId?: number;
  /**
   * 默认发货仓库ID
   * @format int32
   */
  defaultWarehouseId?: number;
  /**
   * 保质期（天数）⾮必填
   * @format int32
   */
  expDay?: number;
  /** 海关属性 */
  hsAttr?: string;
  /** 海关编码 */
  hsCode?: string;
  /**
   * 海关税率
   * @format double
   */
  hsTariffRate?: number;
  /**
   * 是否有自定义属性
   * @format int32
   */
  isCustom?: number;
  /**
   * 是否存在有效期
   * @format int32
   */
  isExpDate?: number;
  /**
   * 是否质检 0-否 1-是
   * @format int32
   */
  isQc?: number;
  /**
   * 上架时间
   * @format date-time
   */
  listingTime?: string;
  /** 产品物流属性 */
  logisticAttribute?: string;
  /** 英文材质 */
  materialEn?: string;
  /**
   * 最小起订量
   * @format int32
   */
  moq?: number;
  /**
   * 最小包装量
   * @format int32
   */
  mpq?: number;
  /** 采购负责人名称 */
  operatorName?: string;
  /** 申报币种 */
  pdDeclareCurrencyCode?: string;
  /** 申报品名CN */
  pdOiverseaTypeCn?: string;
  /** 申报品名EN */
  pdOiverseaTypeEn?: string;
  /** 采购价格币种 */
  pdPurchaseCurrencyCode?: string;
  /** 开发负责人Id */
  personDevelopId?: string;
  /** 开发负责人名称 */
  personDevelopName?: string;
  /** 采购负责人Id */
  personOpraterId?: string;
  /** 销售负责人Id */
  personSellerId?: string;
  /** 销售负责人名称 */
  personSellerName?: string;
  /**
   * 产品创建时间
   * @format date-time
   */
  productAddTime?: string;
  /** 产品成本 */
  productCost?: string;
  /**
   * 申报价值
   * @format double
   */
  productDeclaredValue?: number;
  /**
   * 体积（单位cm3）
   * @format double
   */
  productGoodsVolume?: number;
  /**
   * 产品高度
   * @format double
   */
  productHeight?: number;
  /** 图片链接 */
  productImage?: string;
  /** 进口申报价值 */
  productImportDeclareValue?: number;
  /**
   * 产品长度
   * @format double
   */
  productLength?: number;
  /**
   * 产品等级
   * @format int32
   */
  productLevel?: number;
  /** 中文材质 */
  productMaterial?: string;
  /**
   * 净重（单位g）
   * @format double
   */
  productNetWeight?: number;
  /**
   * 采购价格
   * @format double
   */
  productPurchasePrice?: number;
  /** 供应链SKU编码 */
  productSku?: string;
  /** 商品SPU代码 */
  productSpu?: string;
  /** 产品状态: 0:不可用,1:可用,2:开发产品 */
  productStatus?: string;
  /** 名称CN */
  productTitle?: string;
  /** 名称EN */
  productTitleEn?: string;
  /**
   * 商品类型。 1：商品；2：物料
   * @format int32
   */
  productType?: number;
  /**
   * 产品更新时间
   * @format date-time
   */
  productUpdateTime?: string;
  /**
   * ⽑重（单位g）
   * @format double
   */
  productWeight?: number;
  /**
   * 产品宽度
   * @format double
   */
  productWidth?: number;
  /** 单位名称 */
  puName?: string;
  /** 备注 */
  remark?: string;
  /**
   * 产品销售状态 1-清货待下架 2-正常销售 5-订制类产品 6-平台下架 16-停售淘汰 17-新品测试 18-新品
   * @format int32
   */
  saleStatus?: number;
  suggestPrice?: string;
  /** 境内货源地 */
  territoryGoods?: string;
  /**
   * 侵权等级
   * @format int32
   */
  tortLevel?: number;
  /** 中文用途 */
  use?: string;
  /** 英文用途 */
  useEn?: string;
  warehouseBarcode?: string;
}

/** EccangSkuFullQueryResp */
export interface EccangSkuFullQueryResp {
  code?: string;
  /** 易仓sku列表 */
  eccangSkuFullList?: EccangSkuFullBean[];
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

/** EccangSkuQueryReq */
export interface EccangSkuQueryReq {
  /**
   * 导出类型 1:导出界面信息，2：导出销售映射全表
   * @format int32
   */
  exportType?: number;
  /** 是否过滤物料 */
  filterProductMateriel?: boolean;
  /** 关键字 */
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
  /** 供应链SKU集合（同步易仓使用） */
  productSkuList?: string[];
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** SKU编码/供应链SKU */
  skuCode?: string;
  /** 产品sku状态 1:待上架 2:在销售 3:清仓中 4:已退市 0:已取消 */
  skuStateList?: number[];
  /** 供应商 */
  supplierName?: string;
}

/** EccangSkuQueryResp */
export interface EccangSkuQueryResp {
  code?: string;
  /** 供应链SKU导出列表 */
  eccangSkuExcelList?: EccangSkuExcelBean[];
  /** 供应链SKU列表 */
  eccangSkuList?: EccangSkuBean[];
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

/** EccangSkuQueryV2Resp */
export interface EccangSkuQueryV2Resp {
  code?: string;
  eccangSkuExcelList?: EccangSkuExcelBean2[];
  /** 供应链SKU列表 */
  eccangSkuList?: EccangSkuBean2[];
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  skuDetailExcelBeanList?: EccangSkuDetailExcelBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** EccangSkuSupplierBean */
export interface EccangSkuSupplierBean {
  /** 默认供应商 */
  defaulSupplierName?: string;
  /** 默认供应商编码 */
  defaultSupplierCode?: string;
  new?: boolean;
  /** 新供应链SKU */
  newProductSku?: string;
  /** 供应链SKU */
  productSku?: string;
  /** 供应商编码 */
  supplierCode?: string;
  /** 供应商 */
  supplierName?: string;
  /** 同步易仓结果 */
  syncResult?: string;
}

/** FinanceProductLineListResp */
export interface FinanceProductLineListResp {
  recordList?: FinanceProductLineListRespItem[];
}

/** FinanceProductLineListRespItem */
export interface FinanceProductLineListRespItem {
  /** 编码 */
  code?: string;
  /** 品线名称 */
  productLine?: string;
}

/** HijackShop */
export interface HijackShop {
  /** 跟卖店铺 */
  shop?: string;
  /** 跟卖店铺链接 */
  url?: string;
}

/** Item */
export interface Item {
  /**
   * 库存数
   * @format int32
   */
  inventory?: number;
  /** 商品编码 */
  skuCode?: string;
  /** 供应链SKU */
  supplySku?: string;
}

/** KeyWordBean */
export interface KeyWordBean {
  /** 父/子商品编码 */
  keyword?: string;
  /** 店铺 */
  shop?: string;
}

/** KeywordBean */
export interface KeywordBean {
  /** 商品编码 */
  keyword?: string;
  /** 店铺 */
  shop?: string;
}

/** LabelItem */
export interface LabelItem {
  /** 分类编码 */
  categoryCode?: string;
  /** 分组路径 */
  groupPathString?: string;
  /** 标签编码 */
  tagCode?: string;
  /** 标签名称 */
  tagName?: string;
  /** 标签备注 */
  tagRemark?: string;
  /** 标签类型 */
  tagType?: string;
}

/** LabelListQueryResp */
export interface LabelListQueryResp {
  code?: string;
  /** 标签列表 */
  labelList?: LabelItem[];
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

/** ListingBatchList */
export interface ListingBatchList {
  /** 父/子ASIN */
  keyword?: string;
  /** 店铺 */
  shop?: string;
}

/** ListingBatchModifyPlanReq */
export interface ListingBatchModifyPlanReq {
  /**
   * 数据维度 parent-父维度 son-子维度
   * @format int32
   */
  dimensionType?: number;
  /** 父子类asin列表 */
  listingBatchListList?: ListingBatchList[];
  /** 计划人员编码 */
  planCode?: string;
}

/** ListingBatchModifyTagReq */
export interface ListingBatchModifyTagReq {
  /**
   * 批量动作 1-单个操作 2-批量操作
   * @format int32
   */
  actionType?: number;
  /**
   * 数据维度 1-父维度 2-子维度
   * @format int32
   */
  dimensionType?: number;
  /** listing列表 */
  listingBeanList?: ListingCommonBean[];
  /** 标签列表 */
  tagList?: ListingTagBean[];
}

/** ListingBatchModifyTagV2Req */
export interface ListingBatchModifyTagV2Req {
  /**
   * 批量动作 1-单个操作 2-批量操作
   * @format int32
   */
  actionType?: number;
  /** 渠道 */
  channel?: string;
  /** listing列表 */
  listingBeanList?: ListingCommonBean[];
  /** 标签列表 */
  tagList?: ListingTagBean[];
}

/** ListingCommonBean */
export interface ListingCommonBean {
  /** 渠道 */
  channel?: string;
  /** ASIN/父ASIN */
  keyword?: string;
  /** 店铺 */
  shop?: string;
}

/** ListingQueryTagReq */
export interface ListingQueryTagReq {
  /**
   * 操作类型 1-单个 2-批量
   * @format int32
   */
  actionType?: number;
  /** asin列表 */
  asinList?: KeyWordBean[];
  /**
   * 数据维度 1-父维度 2-子维度
   * @format int32
   */
  dimensionType?: number;
  /** 新平台在线商品唯一键 */
  uniqueCode?: string;
}

/** ListingQueryTagV2Req */
export interface ListingQueryTagV2Req {
  /** keyword列表 */
  keywordList?: KeywordBean[];
  platform?: string;
}

/** ListingTagBean */
export interface ListingTagBean {
  /**
   * 勾选 1-勾选 0-非勾选
   * @format int32
   */
  hasChoose?: number;
  /** 标签编码 */
  tagCode?: string;
  /** 标签名称 */
  tagDesc?: string;
}

/** ListingTagResp */
export interface ListingTagResp {
  /** 标签列表 */
  tagList?: ListingTagBean[];
}

/** LuteConditionResp */
export interface LuteConditionResp {
  /** 路特渠道 */
  luteChannelList?: string[];
  /** 路特平台 */
  lutePlatformList?: string[];
}

/** MSkuRelationListResp */
export interface MSkuRelationListResp {
  /** 店铺sku映射关系(新) */
  mskuRelationList?: ProductSellerSkuPriceBean[];
}

/** MacAddrOperateReq */
export interface MacAddrOperateReq {
  /** mac地址 batch_update_status：批量更新状态 */
  macAddrList?: string[];
  /** 操作类型  batch_update_status：批量更新状态 */
  operateType?: string;
  /**
   * 状态 1-正常 0-作废 batch_update_status：批量更新状态
   * @format int32
   */
  status?: number;
}

/** MacAddrQueryBean */
export interface MacAddrQueryBean {
  /** 批次号 */
  batchNumber?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /** 创建人名称 */
  creatorName?: string;
  /** 衍生/迭代编码 */
  deriveCode?: string;
  /** 衍生/迭代编码 */
  deriveDesc?: string;
  /** 开发阶段 */
  developState?: string;
  /** 贴片工厂编码 */
  factoryCode?: string;
  /** 贴片工厂名称 */
  factoryName?: string;
  /** MAC地址 */
  macAddr?: string;
  /** 操作人 */
  operator?: string;
  /** 操作人名称 */
  operatorName?: string;
  /**
   * 订单行
   * @format int32
   */
  orderLine?: number;
  /** 来源PO */
  poCode?: string;
  /** 产品代码 */
  productCode?: string;
  /** 供应链产品名称 */
  productName?: string;
  /** 供应链产品SKU */
  productSku?: string;
  /** 系列编码 */
  seriesCode?: string;
  /** 系列描述 */
  seriesDesc?: string;
  /**
   * 状态
   * @format int32
   */
  status?: number;
  /** 状态描述 */
  statusDesc?: string;
  /** 供应商编码 */
  supplierCode?: string;
  /** 供应商名称 */
  supplierName?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** MacAddrQueryReq */
export interface MacAddrQueryReq {
  /** 开发阶段 */
  developStateList?: string[];
  /** 工厂编码 */
  factoryCode?: string;
  /** MAC地址/产品名称/供应链SKU */
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
  /** PO单号 */
  poCodeList?: string[];
  /** 产品代码 */
  productCodeList?: string[];
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 供应商编码 */
  supplierCode?: string;
}

/** MacAddrQueryResp */
export interface MacAddrQueryResp {
  code?: string;
  /** MAC地址信息 */
  macAddressList?: MacAddrQueryBean[];
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

/** MacAddrSaveReq */
export interface MacAddrSaveReq {
  /** 衍生/迭代编码 */
  deriveCode?: string;
  /** 开发阶段 */
  developState: string;
  /** 贴片工厂编码 */
  factoryCode: string;
  /**
   * 本次生成MAC数量
   * @format int32
   */
  macNum?: number;
  /** PO采购单信息 */
  poInfoList?: PoInfoBean[];
  /** 产品代码 */
  productCode: string;
  /** 系列编码 */
  seriesCode: string;
  /** 组装厂供应商编码 */
  supplierCode?: string;
}

/** MacFactoryBean */
export interface MacFactoryBean {
  /** 工厂编码 */
  factoryCode?: string;
  /** 工厂名称 */
  factoryName?: string;
}

/** MacFactoryDetailResp */
export interface MacFactoryDetailResp {
  /** 工厂编码 */
  factoryCode?: string;
  /** 工厂名称 */
  factoryName?: string;
  /**
   * id
   * @format int64
   */
  id?: number;
  /** 生产项目 */
  project?: string;
  /** 备注 */
  remark?: string;
  /** 供应商编码 */
  supplierCode?: string;
  /** 供应商名称 */
  supplierName?: string;
}

/** MacFactoryOperateReq */
export interface MacFactoryOperateReq {
  /** 工厂代码 delete-删除必填 */
  factoryCode?: string;
  /** 操作类型 delete-删除 */
  operateType?: string;
}

/** MacFactoryOperateResp */
export interface MacFactoryOperateResp {
  factoryCode?: string;
}

/** MacFactoryQueryBean */
export interface MacFactoryQueryBean {
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人编码 */
  creator?: string;
  /** 创建人名称 */
  creatorName?: string;
  /** 工厂编码 */
  factoryCode?: string;
  /** 工厂名称 */
  factoryName?: string;
  /**
   * id
   * @format int64
   */
  id?: number;
  /** 更新人编码 */
  operator?: string;
  /** 更新人名称 */
  operatorName?: string;
  /** 生产项目 */
  project?: string;
  /** 备注 */
  remark?: string;
  /** 供应商编码 */
  supplierCode?: string;
  /** 供应商名称 */
  supplierName?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** MacFactoryQueryResp */
export interface MacFactoryQueryResp {
  code?: string;
  /** 贴片工厂 */
  macFactoryList?: MacFactoryQueryBean[];
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

/** MacFactorySaveReq */
export interface MacFactorySaveReq {
  /**
   * 工厂编码
   * @minLength 1
   * @maxLength 1
   */
  factoryCode: string;
  /**
   * 工厂名称
   * @minLength 0
   * @maxLength 30
   */
  factoryName: string;
  /**
   * id
   * @format int64
   */
  id?: number;
  /**
   * 生产项目
   * @minLength 0
   * @maxLength 100
   */
  project?: string;
  /**
   * 备注
   * @minLength 0
   * @maxLength 100
   */
  remark?: string;
  /** 供应商编码 */
  supplierCode?: string;
}

/** MacFactorySaveResp */
export interface MacFactorySaveResp {
  /** 工厂编码 */
  factoryCode?: string;
}

/** MacProductCodeDetailResp */
export interface MacProductCodeDetailResp {
  /** 衍生/迭代编码 */
  deriveCode?: string;
  /** 衍生/迭代名称 */
  deriveName?: string;
  /** 工厂编码 */
  factoryCodeList?: string[];
  /** 工厂名称 */
  factoryNameList?: string[];
  /**
   * id
   * @format int64
   */
  id?: number;
  /** 关联项目-新品年规 */
  pdtNewProductCodeList?: string[];
  /** 关联项目-新品年规 */
  pdtNewProductNameList?: string[];
  /** 产品代码 */
  productCode?: string;
  /** 系列代码 */
  seriesCode?: string;
  /** 系列名称 */
  seriesName?: string;
  /** 供应链产品sku */
  supplySkuList?: RelSupplySkuBean[];
}

/** MacProductCodeOperateReq */
export interface MacProductCodeOperateReq {
  /** 操作类型 delete-删除 */
  operateType?: string;
  /** 产品代码 delete-删除必传 */
  productCode?: string;
}

/** MacProductCodeOperateResp */
export interface MacProductCodeOperateResp {
  productCode?: string;
}

/** MacProductCodeQueryBean */
export interface MacProductCodeQueryBean {
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /** 创建人名称 */
  creatorName?: string;
  /** 衍生/迭代编码 */
  deriveCode?: string;
  /** 衍生/迭代描述 */
  deriveDesc?: string;
  /** 贴片工厂 */
  factoryList?: MacFactoryBean[];
  /** 操作人 */
  operator?: string;
  /** 操作人名称 */
  operatorName?: string;
  /** 关联项目 */
  pdtNewProductList?: PdtNewProductBean[];
  /** 产品代码 */
  productCode?: string;
  /**
   * 关联供应链产品数量
   * @format int64
   */
  productSkuNum?: number;
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

/** MacProductCodeQueryResp */
export interface MacProductCodeQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 产品代码列表 */
  productCodeList?: MacProductCodeQueryBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** MacProductCodeSaveReq */
export interface MacProductCodeSaveReq {
  /** 衍生/迭代编码 */
  deriveCode?: string;
  /** 工厂编码 */
  factoryCodeList?: string[];
  /**
   * id
   * @format int64
   */
  id?: number;
  /** 关联项目-新品年规 */
  pdtNewProductCodeList?: string[];
  /**
   * 产品代码
   * @minLength 3
   * @maxLength 3
   */
  productCode: string;
  /** 供应链产品sku */
  productSkuList?: string[];
  /** 系列代码 */
  seriesCode?: string;
}

/** MacProductCodeSaveResp */
export interface MacProductCodeSaveResp {
  /** 产品代码 */
  productCode?: string;
}

/** MacRelSupplyCheckReq */
export interface MacRelSupplyCheckReq {
  /** 产品代码 */
  productCode: string;
  /** 供应链sku集合 */
  productSkuList: string[];
}

/** MacSupplierQueryResp */
export interface MacSupplierQueryResp {
  /** 供应商列表 */
  supplierList?: SupplierBaseBean[];
}

/** MallClientOrderOperateReq */
export interface MallClientOrderOperateReq {
  /** 地址信息 */
  address: AddressBean;
  /** 操作类型 update_addr-修改地址 */
  operateType: string;
}

/** MallOrderBean */
export interface MallOrderBean {
  /** 详细地址 */
  address?: string;
  /** 支付宝交易号 */
  alipayTradeNo?: string;
  /** 区/县编码 */
  areaCode?: string;
  /** 区/县名称 */
  areaName?: string;
  /** 市编码 */
  cityCode?: string;
  /** 市名称 */
  cityName?: string;
  /** 关闭原因 */
  closeReason?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /** 创建人名称 */
  creatorName?: string;
  /** 币种 */
  currency?: string;
  /**
   * 发货时间
   * @format date-time
   */
  deliveryTime?: string;
  /** 折扣金额 */
  discountAmount?: number;
  /** 异常原因 */
  errorMsg?: string;
  /**
   * 异常状态码
   * @format int32
   */
  errorStatus?: number;
  /** 运费 */
  freightAmount?: number;
  /** 运费规则编码 */
  freightAmountRuleCode?: string;
  /**
   * 是否已确认收货 0-否 1-是
   * @format int32
   */
  isConfirmed?: number;
  /** 系统生成订单号 */
  orderCode?: string;
  /** 订单明细 */
  orderItemList?: MallOrderItemBean[];
  /** 支付宝状态 WAIT_BUYER_PAY-待支付 TRADE_SUCCESS-交易成功 TRADE_FINISHED-交易完成 TRADE_CLOSED-交易关闭 */
  paymentStatus?: string;
  /** 支付宝状态 WAIT_BUYER_PAY-待支付 TRADE_SUCCESS-交易成功 TRADE_FINISHED-交易完成 TRADE_CLOSED-交易关闭 */
  paymentStatusDesc?: string;
  /**
   * 支付宝付款时间
   * @format date-time
   */
  paymentTime?: string;
  /** 省编码 */
  provinceCode?: string;
  /** 省名称 */
  provinceName?: string;
  /** 支付二维码链接 */
  qrCode?: string;
  /**
   * 支付二维码链接失效时间
   * @format date-time
   */
  qrCodeOutOfTime?: string;
  /** 实际总金额=total_amount+freightAmount */
  realAmount?: number;
  /** @format int32 */
  receiveGoodsType?: number;
  /** 收件人名称 */
  receiverName?: string;
  /** 收件人手机号 */
  receiverPhone?: string;
  /** 收件人手机区号 */
  receiverPhoneArea?: string;
  /** 订单状态 PENDING-待付款 PAID-(已付款)待发货 SHIPPED-已发货 CLOSED-已关闭 */
  status?: string;
  /** 订单状态 PENDING-待付款 PAID-(已付款)待发货 SHIPPED-已发货 CLOSED-已关闭 */
  statusDesc?: string;
  /** 实付款金额 */
  subtotalAmount?: number;
  /** 订单总金额 */
  totalAmount?: number;
  /** 快递单号 */
  trackingNum?: string;
}

/** MallOrderDetailResp */
export interface MallOrderDetailResp {
  /** 支付宝交易号 */
  alipayTradeNo?: string;
  /** 关闭原因 */
  closeReason?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /** 创建人名称 */
  creatorName?: string;
  /** 币种 */
  currency?: string;
  /**
   * 发货时间
   * @format date-time
   */
  deliveryTime?: string;
  /** 折扣金额 */
  discountAmount?: number;
  /** 运费 */
  freightAmount?: number;
  /** 运费规则编码 */
  freightAmountRuleCode?: string;
  /**
   * 是否已确认收货 0-否 1-是
   * @format int32
   */
  isConfirmed?: number;
  /** 系统生成订单号 */
  orderCode?: string;
  /** 订单明细 */
  orderItemList?: MallOrderItemBean[];
  /** 支付宝状态 WAIT_BUYER_PAY-待支付 TRADE_SUCCESS-交易成功 TRADE_FINISHED-交易完成 TRADE_CLOSED-交易关闭 */
  paymentStatus?: string;
  /** 支付宝状态 WAIT_BUYER_PAY-待支付 TRADE_SUCCESS-交易成功 TRADE_FINISHED-交易完成 TRADE_CLOSED-交易关闭 */
  paymentStatusDesc?: string;
  /**
   * 支付宝付款时间
   * @format date-time
   */
  paymentTime?: string;
  /** 支付二维码 */
  qrCode?: string;
  /**
   * 支付二维码链接失效时间
   * @format date-time
   */
  qrCodeOutOfTime?: string;
  /** 实际总金额=total_amount+freightAmount */
  realAmount?: number;
  /**
   * 取货方式
   * @format int32
   */
  receiveGoodsType?: number;
  /** 取货方式 */
  receiveGoodsTypeStr?: string;
  /** 收件人地址 */
  receiverAddress?: string;
  /** 收件人区县编码 */
  receiverAreaCode?: string;
  /** 收件人区县名称 */
  receiverAreaName?: string;
  /** 收件人市编码 */
  receiverCityCode?: string;
  /** 收件人市名称 */
  receiverCityName?: string;
  /** 收货人名字 */
  receiverName?: string;
  /** 收件人手机号 */
  receiverPhone?: string;
  /** 收件人省份编码 */
  receiverProvinceCode?: string;
  /** 收件人省份名称 */
  receiverProvinceName?: string;
  /** 订单状态 PENDING-待付款 PAID-(已付款)待发货 SHIPPED-已发货 CLOSED-已关闭 */
  status?: string;
  /** 订单状态 PENDING-待付款 PAID-(已付款)待发货 SHIPPED-已发货 CLOSED-已关闭 */
  statusDesc?: string;
  /** 实付款金额 */
  subtotalAmount?: number;
  /** 订单总金额 */
  totalAmount?: number;
  /** 快递单号 */
  trackingNum?: string;
}

/** MallOrderItemBean */
export interface MallOrderItemBean {
  /** 商品图片 */
  imageUrl?: string;
  /** 商品单价 */
  price?: number;
  /** 商品名称 */
  productName?: string;
  /** 供应链sku */
  productSku?: string;
  /** 商品链接 */
  productUrl?: string;
  /**
   * 商品数量
   * @format int32
   */
  quantity?: number;
}

/** MallOrderListReq */
export interface MallOrderListReq {
  /** 创建人 */
  creator?: string;
  /**
   * 结束日期
   * @format date
   */
  endDate?: string;
  /**
   * 0-管理端 1-用户端
   * @format int32
   */
  operateType?: number;
  /** 系统订单号 */
  orderCode?: string;
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
  /** 供应链sku */
  productSku?: string;
  /** 商品名称 */
  productTitle?: string;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /**
   * 开始日期
   * @format date
   */
  startDate?: string;
  /** 状态 */
  status?: string;
}

/** MallOrderListResp */
export interface MallOrderListResp {
  code?: string;
  message?: string;
  /** 订单信息 */
  orderList?: MallOrderBean[];
  /** 各订单状态 */
  orderStatus?: OrderStatusBean;
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

/** MallOrderOperateReq */
export interface MallOrderOperateReq {
  /** 操作类型 close_order-关闭订单 manual_delivery-手动发货 update_tracking_num-上传/修改快递单号 */
  operateType: string;
  /** 订单号 */
  orderCode: string;
  /** 原因 close-关闭操作; */
  reason?: string;
  /**
   * 快递单号 update_tracking_num-上传/修改快递单号时必填
   * @minLength 0
   * @maxLength 200
   */
  trackingNum?: string;
}

/** MallOrderStatusResp */
export interface MallOrderStatusResp {
  orderCode?: string;
  /** 支付状态 success-支付成功 fail-支付失败 */
  payStatus?: string;
}

/** MallOrderSubmitReq */
export interface MallOrderSubmitReq {
  /** 用户地址编码  提交订单选传 */
  addressCode?: string;
  /**
   * 购买场景 1-自购 2-代亲友下单
   * @format int32
   * @min 1
   * @exclusiveMin false
   * @max 2
   * @exclusiveMax false
   */
  buyScene: number;
  /** 购物记录编码集合 提交订单必传  */
  cartCodeList?: string[];
  /** 运费 */
  freightAmount?: number;
  /** 运费规则编码 */
  freightAmountRuleCode?: string;
}

/** MallOrderSubmitResp */
export interface MallOrderSubmitResp {
  /** 运费 */
  freightAmount?: number;
  /** 订单号 */
  orderCode?: string;
  /** 支付宝预支付二维码 */
  qrCode?: string;
  /**
   * 支付二维码链接失效时间
   * @format date-time
   */
  qrCodeOutOfTime?: string;
  /** 订单总金额 */
  totalAmount?: number;
}

/** MallProductBean */
export interface MallProductBean {
  /** 币种 */
  currency?: string;
  /** 图片链接 */
  imageUrl?: string;
  /** 商品标签 */
  labelList?: MallProductLabelBean[];
  /** 商品标签名称 */
  labelNameList?: string[];
  /**
   * 限购数量 为null则不限购，不为null则显示限购数量
   * @format int32
   */
  limitedNum?: number;
  /** 价格 */
  price?: number;
  /** 供应链sku */
  productSku?: string;
  /** 产品名称 */
  productTitle?: string;
  /** 产品英文名称 */
  productTitleEn?: string;
  /**
   * 商品分类
   * @format int32
   */
  productType?: number;
  /** 商品分类描述 */
  productTypeDesc?: string;
  /** 产品链接 */
  productUrl?: string;
  /**
   * 当前库存
   * @format int32
   */
  remainingStock?: number;
  /**
   * 产品状态 1-销售中 2-无库存 3-已下架
   * @format int32
   */
  status?: number;
  /** 产品状态 1-销售中 2-无库存 3-已下架 */
  statusDesc?: string;
}

/** MallProductClientListReq */
export interface MallProductClientListReq {
  /**
   * 是否仅看库存 1-是 0-否
   * @format int32
   */
  hasStock?: number;
  /** 关键词 */
  keyword?: string;
  /** 标签编码集合 */
  labelCodeList?: string[];
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
  /** 价格排序 asc-升序 desc-降序 */
  priceOrderBy?: string;
  /**
   * 产品类型 1-在售 2-清仓
   * @format int32
   */
  productType?: number;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 库存排序 asc-升序 desc-降序 */
  stockOrderBy?: string;
}

/** MallProductClientListResp */
export interface MallProductClientListResp {
  code?: string;
  /** 商品信息 */
  mallProductList?: MallProductBean[];
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

/** MallProductDetailResp */
export interface MallProductDetailResp {
  /** 币种 */
  currency?: string;
  /**
   * id
   * @format int64
   */
  id?: number;
  /** 商品图片 */
  imageUrl?: string;
  /** 标签编码 */
  labelCodeList?: string[];
  /** 标签名称 */
  labelNameList?: string[];
  /**
   * 是否限购 1-是 0-否
   * @format int32
   */
  limitedFlag?: number;
  /**
   * 限购数量
   * @format int32
   */
  limitedNum?: number;
  /**
   * 价格
   * @min 0
   * @exclusiveMin false
   */
  price?: number;
  /** 供应链sku */
  productSku?: string;
  /** 产品名称 */
  productTitle?: string;
  /** 产品英文名称 */
  productTitleEn?: string;
  /**
   * 产品类型
   * @format int32
   */
  productType?: number;
  /** 产品详情链接 */
  productUrl?: string;
  /**
   * 当前库存
   * @format int32
   */
  remainingStock?: number;
  /**
   * 状态
   * @format int32
   */
  status?: number;
  /** 状态描述 */
  statusDesc?: string;
  /**
   * 总库存
   * @format int32
   */
  totalStock?: number;
}

/** MallProductLabelBean */
export interface MallProductLabelBean {
  /** 标签编码 */
  labelCode?: string;
  /** 标签名称 */
  labelName?: string;
}

/** MallProductListReq */
export interface MallProductListReq {
  /** 产品分类 */
  categoryCode?: string;
  /** 供应链sku/产品名称 */
  keyword?: string;
  /** 标签编码集合 */
  labelCodeList?: string[];
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
  /** 商品编码集合 导出时勾选的商品sku编码 */
  productSkuList?: string[];
  /**
   * 商品分类
   * @format int32
   */
  productType?: number;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /**
   * 产品状态
   * @format int32
   */
  status?: number;
}

/** MallProductListResp */
export interface MallProductListResp {
  code?: string;
  /** 商品列表 */
  mallProductList?: MallProductBean[];
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

/** MallProductOperateReq */
export interface MallProductOperateReq {
  /** 操作类型 on_shelf-上架 off_shelf-下架 */
  operateType: string;
  /** 供应链sku */
  productSku: string;
}

/** MallProductSaveReq */
export interface MallProductSaveReq {
  /** 币种 */
  currency?: string;
  /**
   * id
   * @format int64
   */
  id?: number;
  /** 标签编码 */
  labelCodeList?: string[];
  /**
   * 是否限购 1-是 0-否
   * @format int32
   */
  limitedFlag: number;
  /**
   * 限购数量
   * @format int32
   */
  limitedNum?: number;
  /**
   * 价格
   * @min 0
   * @exclusiveMin false
   */
  price?: number;
  /** 供应链sku */
  productSku: string;
  /** 产品名称 */
  productTitle: string;
  /** 产品英文名称 */
  productTitleEn?: string;
  /**
   * 产品分类 1-在售品 2-清仓品
   * @format int32
   */
  productType: number;
  /** 商品链接 */
  productUrl?: string;
  /**
   * 当前库存
   * @format int32
   * @min 0
   * @exclusiveMin false
   */
  remainingStock: number;
}

/** MallProductSaveResp */
export interface MallProductSaveResp {
  /** 供应链sku */
  productSku?: string;
}

/** MallShopCartBean */
export interface MallShopCartBean {
  /** 品牌 */
  brandCode?: string;
  /** 品牌名称 */
  brandName?: string;
  /** 购物车编号 */
  cartCode?: string;
  /** 用户编码 */
  creator?: string;
  /**
   * 是否有库存 1-有 0-无
   * @format int32
   */
  hasStock?: number;
  /** 商品图片 */
  imageUrl?: string;
  /** 商品标签 */
  labelList?: MallProductLabelBean[];
  /** 商品标签名称 */
  labelNameList?: string[];
  /**
   * 购买限制重置时间，为null时表示不限购
   * @format date-time
   */
  limitResetTime?: string;
  /**
   * 限购数量 为null则不限购，不为null则显示限购数量
   * @format int32
   */
  limitedNum?: number;
  /** 商品单价 */
  price?: number;
  /** 商品名称 */
  productName?: string;
  /** 供应链sku */
  productSku?: string;
  /**
   * 商品状态
   * @format int32
   */
  productStatus?: number;
  /**
   * 产品分类 1-在售品 2-清仓品
   * @format int32
   */
  productType?: number;
  /** 产品分类 1-在售品 2-清仓品 */
  productTypeDesc?: string;
  /**
   * 商品数量
   * @format int32
   */
  quantity?: number;
  /**
   * 剩余库存(当前库存)
   * @format int32
   */
  remainingStock?: number;
  /**
   * 状态 是否选择 1-选择 0-未选择
   * @format int32
   */
  status?: number;
}

/** MallShopCartCountResp */
export interface MallShopCartCountResp {
  /**
   * 购物车商品数量
   * @format int32
   */
  cartProductCount?: number;
}

/** MallShopCartListResp */
export interface MallShopCartListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  shopCartList?: MallShopCartBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** MallShopCartOperateReq */
export interface MallShopCartOperateReq {
  /** 购物记录编码 加购物车/减购物车/更新购物车/删除必传 */
  cartCode?: string;
  /** 购物车操作 add_shopping_cart-加购物车 subtract_shopping_cart-减购物车 update_shopping_cart-更新购物车  delete-删 */
  operateType?: string;
  /** 供应链sku 加购物车/减购物车/更新购物车/删除必传 */
  productSku?: string;
  /**
   * 购物车数量 加减购物车，添加购物车默认1，修改购物车，直接传数量，例如10件：quantity = 10;
   * @format int32
   */
  quantity: number;
}

/** MallShopCartOperateResp */
export interface MallShopCartOperateResp {
  /**
   * 购买限制重置时间，为null时表示不限购
   * @format date-time
   */
  limitResetTime?: string;
  /**
   * 剩余可购买数量，为-1时表示不限购
   * @format int32
   */
  limitedNum?: number;
  /** 订单号 */
  orderCode?: string;
  /** 支付宝预支付二维码 */
  qrCode?: string;
  /**
   * 支付二维码链接失效时间
   * @format date-time
   */
  qrCodeOutOfTime?: string;
}

/** MallUserAddrBean */
export interface MallUserAddrBean {
  /** 详细地址 */
  address?: string;
  /** 地址编码 */
  addressCode?: string;
  /** 区/县编码 */
  areaCode?: string;
  /** 区/县名称 */
  areaName?: string;
  /** 市编码 */
  cityCode?: string;
  /** 市名称 */
  cityName?: string;
  /**
   * 是否默认 0-不默认 1-默认
   * @format int32
   */
  defaultFlag?: number;
  /** 员工编码 */
  memberCode?: string;
  /** 省编码 */
  provinceCode?: string;
  /** 省名称 */
  provinceName?: string;
  /** 收件人名称 */
  receiverName?: string;
  /** 收件人手机号 */
  receiverPhone?: string;
  /** 收件人手机区号 */
  receiverPhoneArea?: string;
}

/** MallUserAddrListResp */
export interface MallUserAddrListResp {
  userAddrList?: MallUserAddrBean[];
}

/** MallUserAddrSaveReq */
export interface MallUserAddrSaveReq {
  /** 详细地址 */
  address?: string;
  /** 记录编码 */
  addressCode?: string;
  /** 区/县编码 */
  areaCode?: string;
  /** 市编码 */
  cityCode?: string;
  /**
   * 是否默认 0-不默认 1-默认
   * @format int32
   */
  defaultFlag?: number;
  /** 省编码 */
  provinceCode?: string;
  /** 收件人名称 */
  receiverName?: string;
  /** 收件人手机号 */
  receiverPhone?: string;
  /** 收件人手机区号 */
  receiverPhoneArea?: string;
}

/** MallUserAddrSaveResp */
export interface MallUserAddrSaveResp {
  /** 地址编码 */
  addressCode?: string;
}

/** MallUserDefaultAddrResp */
export interface MallUserDefaultAddrResp {
  /** 详细地址 */
  address?: string;
  /** 地址编码 */
  addressCode?: string;
  /** 区/县编码 */
  areaCode?: string;
  /** 区/县名称 */
  areaName?: string;
  /** 市编码 */
  cityCode?: string;
  /** 市名称 */
  cityName?: string;
  /**
   * 是否默认 0-不默认 1-默认
   * @format int32
   */
  defaultFlag?: number;
  /** 员工编码 */
  memberCode?: string;
  /** 省编码 */
  provinceCode?: string;
  /** 省名称 */
  provinceName?: string;
  /** 收件人名称 */
  receiverName?: string;
  /** 收件人手机号 */
  receiverPhone?: string;
  /** 收件人手机区号 */
  receiverPhoneArea?: string;
}

/** MallUserDeleteReq */
export interface MallUserDeleteReq {
  /** 地址编码 */
  addressCode: string;
}

/** MemberBean */
export interface MemberBean {
  /** 账号编码 */
  accountCode?: string;
  /** 员工所属所有部门信息 */
  allDepts?: string[];
  /** 头像 */
  avatar?: string;
  /** 生日 */
  birthday?: string;
  /** 市 */
  cityName?: string;
  /**
   * 是否删除 1-是 离职 0-否 在职
   * @format int32
   */
  deleted?: number;
  /**
   * 部门id
   * @format int64
   */
  deptId?: number;
  /** 员工所属最高级部门信息 */
  deptInfo?: MemberDeptInfoBean;
  /** 部门名称 */
  deptName?: string;
  /** 邮箱 */
  email?: string;
  /** 性别 */
  gender?: string;
  /** ip */
  ipAddr?: string;
  /** 工号 */
  jobNumber?: string;
  /** 直属领导id */
  managerUserid?: string;
  /**
   * 是否主账号 1-是 0-否
   * @format int32
   */
  master?: number;
  /** 成员Code source=0 则是userCode, =1 则是supplierCode */
  memberCode?: string;
  /** 手机号 */
  mobile?: string;
  /** 成员名称 */
  name?: string;
  /** 昵称 */
  nickname?: string;
  /** 省 */
  provinceName?: string;
  /** 角色列表 */
  roleCodeList?: string[];
  /**
   * 用户所属一级部门id
   * @format int64
   */
  rootDeptId?: number;
  /**
   * 来源: 0-员工 1-供应商
   * @format int32
   */
  source?: number;
  /** 国家 */
  stateCode?: string;
  /**
   * 是否超级管理员 1-是 0-否
   * @format int32
   */
  superAdmin?: number;
  /**
   * 是否角色管理菜单的超级管理员 1-是 0-否
   * @format int32
   */
  superAdminInRoleManagerMenu?: number;
  /** 职称 */
  title?: string;
  /**
   * 外部员工（不包含默认系统）默认-1
   * @format int32
   */
  unDefaultSystemFlag?: number;
}

/** MemberCenterStatsQueryResp */
export interface MemberCenterStatsQueryResp {
  /** 年规新品, 产品线数量统计 */
  pdtLineCountList?: PdtLineCountBean[];
  /**
   * 开发中商品数量
   * @format int32
   */
  productDevelopNumber?: number;
  /**
   * 已下架商品数量
   * @format int32
   */
  productOffSaleNumber?: number;
  /**
   * 待上架商品数量
   * @format int32
   */
  productOnSaleNumber?: number;
  /**
   * 可销售商品数量
   * @format int32
   */
  productSaleNumber?: number;
  /**
   * 已退市SKU数量
   * @format int32
   */
  productSkuOffMarketNumber?: number;
  /**
   * 清仓中SKU数量
   * @format int32
   */
  productSkuOffSaleNumber?: number;
  /**
   * 未上架SKU数量
   * @format int32
   */
  productSkuOnSaleNumber?: number;
  /**
   * 在销售SKU数量
   * @format int32
   */
  productSkuSaleNumber?: number;
  /** SKU 分类数量分类统计（占比） */
  skuCategoryCountList?: ProductSkuCategoryCountBean[];
}

/** MemberDeptInfoBean */
export interface MemberDeptInfoBean {
  /**
   * 部门id
   * @format int64
   */
  deptId?: number;
  /** 部门名称 */
  deptName?: string;
  /** 一级部门名称 */
  firstDeptName?: string;
  /** 员工编码 */
  memberCode?: string;
  /**
   * 父级部门id
   * @format int64
   */
  parentId?: number;
  /** 父级部门名称 */
  parentName?: string;
  /** 二级部门名称 */
  secondDeptName?: string;
  /** 三级部门名称 */
  thirdDeptName?: string;
}

/** MemberSimpleBean */
export interface MemberSimpleBean {
  /** 成员编码 */
  memberCode?: string;
  /** 成员名称 */
  name?: string;
}

/** MetaTiktokReportSumQueryReq */
export interface MetaTiktokReportSumQueryReq {
  /** 红人名称/挂链产品/产品名称/SPU */
  keyword?: string;
  /** 团队推广成员 */
  memberCodeList?: string[];
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
   * 上线日期月
   * @format int32
   */
  videoMonth?: number;
  /**
   * 上线日期季
   * @format int32
   */
  videoQuarter?: number;
  /**
   * 上线日期周
   * @format int32
   */
  videoWeek?: number;
  /**
   * 上线日期年
   * @format int32
   */
  videoYear?: number;
}

/** MetaTiktokReportSumQueryResp */
export interface MetaTiktokReportSumQueryResp {
  /** 机构达人表现 */
  affiliateAccountsSpuList?: TiktokAffiliateAccountsSpuQueryBean[];
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

/** ModelBean */
export interface ModelBean {
  /** 品牌编码 */
  brandCode?: string;
  /** 品牌名称 */
  brandName?: string;
  /** 渠道编码 A-线上医疗款 B-线上非医疗 C-线下医疗款 D-线下非医疗 */
  channelCode?: string;
  /** 渠道名称 */
  channelName?: string;
  /** 类型编码 */
  modelCode?: string;
  /** 类型名称 */
  modelName?: string;
  /** 类型备注 */
  modelRemark?: string;
  /** 分类编码 */
  productCategoryCode?: string;
  /** 分类名称 */
  productCategoryName?: string;
  /**
   * 商品数量
   * @format int32
   */
  productCount?: number;
  /** 关联SPU/SKU */
  productSkuBeanList?: ProductSkuBean[];
  /** 系列编码 */
  seriesCode?: string;
  /** 系列名称 */
  seriesName?: string;
}

/** ModelDetailResp */
export interface ModelDetailResp {
  /** 型号详情信息 */
  modelBean?: ModelBean;
  /** 关联商品信息集合 */
  productBeanList?: ProductBean[];
}

/** ModelListQueryReq */
export interface ModelListQueryReq {
  /** 勾选导出的编码 */
  codeList?: string[];
  /** 型号编号 */
  modelCode?: string;
  /** 型号名称 */
  modelName?: string;
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

/** ModelListQueryResp */
export interface ModelListQueryResp {
  code?: string;
  message?: string;
  /** 型号列表 */
  modelBeanList?: ModelBean[];
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

/** ModelOperateReq */
export interface ModelOperateReq {
  /** 型号编码 */
  modelCode?: string;
  /**
   * 操作类型 1:删除删除型号 2：删除型号与商品的关联
   * @format int32
   */
  operateType?: number;
  /** 商品Spu，删除关联时必传 */
  productSpu?: string;
}

/** ModelProductConnectReq */
export interface ModelProductConnectReq {
  /** 型号编码 */
  modelCode?: string;
  /** 商品sku集合 */
  productSpuList?: string[];
}

/** ModelSaveReq */
export interface ModelSaveReq {
  /** 型号编码 */
  modelCode?: string;
  /** 型号名称 */
  modelName?: string;
  /** 型号备注 */
  modelRemark?: string;
  /** 商品sku集合,详情保存的时候传，非必填 */
  productSpuList?: string[];
}

/** ModelSaveResp */
export interface ModelSaveResp {
  /** 型号编码 */
  modelCode?: string;
}

/** MsrpBatchQueryReq */
export interface MsrpBatchQueryReq {
  /** 列表编码 */
  codeList?: string[];
}

/** MsrpBatchSaveResp */
export interface MsrpBatchSaveResp {
  /** 提示 */
  tip?: string;
}

/** MsrpBean */
export interface MsrpBean {
  /** msrp价格 */
  msrpPriceStr?: string;
  /** 商品sku */
  skuCode?: string;
}

/** MsrpCalculateBaseDataResp */
export interface MsrpCalculateBaseDataResp {
  /** 业务区域 */
  businessArea?: string;
  /** 三级类目编码 */
  categoryCodeLevel3?: string;
  /** 四级类目编码 */
  categoryCodeLevel4?: string;
  /** 五级类目编码 */
  categoryCodeLevel5?: string;
  /** 三级类目名称（品类） */
  categoryNameLevel3?: string;
  /** 四级类目名称（品类） */
  categoryNameLevel4?: string;
  /** 五级类目名称（品类） */
  categoryNameLevel5?: string;
  /** 渠道 */
  channel?: string;
  /** 佣金费率 */
  commissionRate?: number;
  /** 站点 */
  countryCode?: string;
  /** 所在洲 */
  countryLocateState?: string;
  /** 站点名称 */
  countryName?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 头程单价(平均) */
  firstPrice?: number;
  /** 采购单价(平均) */
  purchasePrice?: number;
  /** 产品sku */
  skuCode?: string;
  /** 产品高度cm */
  skuHeight?: number;
  /** 产品长度cm */
  skuLength?: number;
  /** 产品sku名称 */
  skuName?: string;
  /** 毛重 */
  skuWeight?: number;
  /** 产品宽度cm */
  skuWidth?: number;
  /** 产品spu */
  spuCode?: string;
  /** 产品spu名称 */
  spuName?: string;
  /** 尾程费用 */
  tailFee?: number;
  /** 关税税率 */
  trafficRate?: number;
  /** VAT费率 */
  vatRate?: number;
}

/** MsrpCalculateBaseReq */
export interface MsrpCalculateBaseReq {
  /** 渠道 */
  channel?: string;
  /** 国家编码 */
  countryCode?: string;
  /** sku编码 */
  skuCode?: string;
  /** spu编码 */
  spuCode?: string;
}

/** MsrpCalculatePriceDetailResp */
export interface MsrpCalculatePriceDetailResp {
  /** 测算明细 */
  itemBean?: MsrpCalculatePriceItemBean;
  /** SKU明细 */
  skuBean?: MsrpCalculatePriceSkuBean;
}

/** MsrpCalculatePriceDetailSaveReq */
export interface MsrpCalculatePriceDetailSaveReq {
  /** 测算明细 */
  itemBean?: MsrpCalculatePriceItemSaveBean;
  /** SKU明细 */
  skuBean?: MsrpCalculatePriceSkuSaveBean;
}

/** MsrpCalculatePriceItemBean */
export interface MsrpCalculatePriceItemBean {
  /** 广告推广费率 */
  adPromotionRate?: number;
  /** MSRP测算价 */
  calculatePrice?: number;
  /** MSRP最终定价 */
  calculatePriceFinal?: number;
  /** MSRP测算价(当地货币) */
  calculatePriceLocal?: number;
  /** MSRP(线下) */
  calculatePriceOffline?: number;
  /** 渠道毛利率 */
  channelMargin?: number;
  /** 佣金率 */
  commissionRate?: number;
  /** 企业编码 */
  companyCode?: string;
  /** 消费税率 */
  consumptionRate?: number;
  /** 币种编码(MSRP测算价) */
  currencyCode?: string;
  /** 币种编码(最终定价) */
  currencyCodeFinal?: string;
  /** 币种编码(当地货币) */
  currencyCodeLocal?: string;
  /** 币种(MSRP线下) */
  currencyCodeOffline?: string;
  /** 币种(默认) */
  currencyCodeRmb?: string;
  /** 经销商毛利率 */
  distMargin?: number;
  /** 尾程费用 */
  endCost?: number;
  /** GTM推广费率 */
  gtmPromotionRate?: number;
  /** 头程费用 */
  headCost?: number;
  /**
   * 主表主键ID
   * @format int64
   */
  headId?: number;
  /**
   * id
   * @format int64
   */
  id?: number;
  /** Invoice Price */
  invoicePrice?: number;
  /** 渠道营销费用率 */
  marketingRate?: number;
  /** MDF */
  mdf?: number;
  /** 其他费用 */
  otherCost?: number;
  /** 其他费用率 */
  otherRate?: number;
  /** 平台佣金率 */
  platformCommissionRate?: number;
  /** 定价毛利率 */
  pricingMargin?: number;
  /** 品线毛利率 */
  productLineGrossMargin?: number;
  /** 品线毛利率(线下) */
  productLineGrossMarginOffline?: number;
  /** 促销折扣率 */
  promotionRate?: number;
  /** 采购成本 */
  purchaseCost?: number;
  /** 零售毛利率 */
  retailMargin?: number;
  /** 退货 */
  returnGoods?: number;
  /** 返点 */
  returnPoint?: number;
  /** Sell-in Rev(抵扣后) */
  sellInRev?: number;
  /** selling价格 */
  sellingPrice?: number;
  /** Av Sellout Price */
  selloutPrice?: number;
  /** SOA促销补贴均值 */
  soaPromotion?: number;
  /** 关税费用 */
  tariffCost?: number;
  /** 退税率 */
  taxRefundRate?: number;
}

/** MsrpCalculatePriceItemSaveBean */
export interface MsrpCalculatePriceItemSaveBean {
  /** 广告推广费率 */
  adPromotionRate?: number;
  /** MSRP最终定价 */
  calculatePriceFinal?: number;
  /** MSRP当前价(当地货币) */
  calculatePriceLocal?: number;
  /** MSRP最终定价(线下) */
  calculatePriceOffline?: number;
  /** 渠道毛利率 */
  channelMargin?: number;
  /** 佣金率 */
  commissionRate?: number;
  /** 消费税率 */
  consumptionRate?: number;
  /** 币种编码(最终定价) */
  currencyCodeFinal?: string;
  /** 币种编码(MSRP当前价) */
  currencyCodeLocal?: string;
  /** 币种(MSRP最终定价线下) */
  currencyCodeOffline?: string;
  /** 币种(默认) */
  currencyCodeRmb?: string;
  /** 经销商毛利率 */
  distMargin?: number;
  /** 尾程费用 */
  endCost?: number;
  /** GTM推广费率 */
  gtmPromotionRate?: number;
  /** 头程费用 */
  headCost?: number;
  /**
   * SKU表主键ID
   * @format int64
   */
  headId?: number;
  /**
   * Item表主键ID
   * @format int64
   */
  id?: number;
  /** Invoice Price */
  invoicePrice?: number;
  /** 渠道营销费用率 */
  marketingRate?: number;
  /** MDF */
  mdf?: number;
  /** 其他费用 */
  otherCost?: number;
  /** 其他费用率 */
  otherRate?: number;
  /** 平台佣金率/手续费率 */
  platformCommissionRate?: number;
  /** 定价毛利率 */
  pricingMargin?: number;
  /** 品线毛利率 */
  productLineGrossMargin?: number;
  /** 品线毛利率(线下) */
  productLineGrossMarginOffline?: number;
  /** 促销折扣率 */
  promotionRate?: number;
  /** 采购成本 */
  purchaseCost?: number;
  /** 零售毛利率 */
  retailMargin?: number;
  /** 退货 */
  returnGoods?: number;
  /** 返点 */
  returnPoint?: number;
  /** Sell-in Rev(抵扣后) */
  sellInRev?: number;
  /** selling价格 */
  sellingPrice?: number;
  /** Av Sellout Price */
  selloutPrice?: number;
  /** SOA促销补贴均值 */
  soaPromotion?: number;
  /** 关税费用 */
  tariffCost?: number;
  /** 退款率(含补发) */
  taxRefundRate?: number;
}

/** MsrpCalculatePriceQueryListResp */
export interface MsrpCalculatePriceQueryListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 结果列表 */
  resultList?: MsrpCalculatePriceSpuBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** MsrpCalculatePriceSkuBean */
export interface MsrpCalculatePriceSkuBean {
  /** 渠道 */
  channel?: string;
  /**
   * 确认时间
   * @format date-time
   */
  confirmTime?: string;
  /** 国家编码 */
  countryCode?: string;
  /** 币种编码 */
  currencyCode?: string;
  /**
   * 明细id
   * @format int64
   */
  id?: number;
  /** 运营人员 */
  operator?: string;
  /** 运营人员 */
  operatorName?: string;
  /** 定价类型 */
  priceType?: string;
  /**
   * 产品维度 1-spu 2-sku
   * @format int32
   */
  productType?: number;
  /** 销售价格 */
  salePrice?: number;
  /** 细分场景 */
  sceneType?: string;
  /** sku编码 */
  skuCode?: string;
  /** sku名称 */
  skuName?: string;
  /** spu编码 */
  spuCode?: string;
  /** 产品spu名称 */
  spuName?: string;
  /**
   * 状态 0-待确认 1-已确认
   * @format int32
   */
  state?: number;
  /** 版本号 */
  version?: string;
}

/** MsrpCalculatePriceSkuSaveBean */
export interface MsrpCalculatePriceSkuSaveBean {
  /** 渠道 */
  channel?: string;
  /** 国家编码 */
  countryCode?: string;
  /** 币种编码 */
  currencyCode?: string;
  /**
   * 主键ID
   * @format int64
   */
  id?: number;
  /** 运营人员 */
  operator?: string;
  /** 定价类型 */
  priceType?: string;
  /**
   * 产品维度 1-spu 2-sku
   * @format int32
   */
  productType?: number;
  /** 销售价格 */
  salePrice?: number;
  /** 细分场景 */
  sceneType?: string;
  /** sku编码 */
  skuCode?: string;
  /** spu编码 */
  spuCode?: string;
}

/** MsrpCalculatePriceSpuBean */
export interface MsrpCalculatePriceSpuBean {
  /** 产品分类 */
  categoryLevel?: string;
  /** 渠道 */
  channel?: string;
  /** 国家编码 */
  countryCode?: string;
  /** 国家名称 */
  countryCodeDesc?: string;
  /** 币种编码 */
  currencyCode?: string;
  /**
   * SPU-id
   * @format int64
   */
  id?: number;
  /** 定价类型 */
  priceType?: string;
  /**
   * 产品类型 1-spu 2-sku
   * @format int32
   */
  productType?: number;
  /** 销售价格 */
  salePrice?: number;
  /** sku明细 */
  skuBeanList?: MsrpCalculatePriceSkuBean[];
  /** 产品spu编码 */
  spuCode?: string;
  /** 产品spu名称 */
  spuName?: string;
  /** 版本号 */
  version?: string;
}

/** MsrpOnlinePromotionResp */
export interface MsrpOnlinePromotionResp {
  /** 促销折扣率 */
  promotionRate?: number;
}

/** MsrpQueryChannelBatchListResp */
export interface MsrpQueryChannelBatchListResp {
  /** 结果列表-带渠道 */
  resultList?: MsrpSpuChannelBean[];
}

/** MsrpQueryChannelListResp */
export interface MsrpQueryChannelListResp {
  /** 结果列表-带渠道 */
  resultList?: MsrpSpuChannelBean[];
}

/** MsrpQueryListReq */
export interface MsrpQueryListReq {
  /** 三级类目 */
  category3List?: string[];
  /** 四级类目 */
  category4List?: string[];
  /** 分类编码，如果传分类编码，分类等级一定要赋值 */
  categoryCode?: string;
  /** 渠道 */
  channelCodeList?: string[];
  /** 国家 */
  countryCodeList?: string[];
  /** 国家/区域 */
  countryList?: string[];
  /** GTM组 */
  gtmList?: string[];
  /** GTM经理 */
  gtmManagerList?: string[];
  /** 查询关键词 */
  keyword?: string;
  /**
   * 关键词类型 1-spu 2-sku 3-产品名称
   * @format int32
   */
  keywordType?: number;
  /**
   * 分类等级，如果传分类编码，分类等级一定要赋值
   * @format int32
   * @min 1
   * @exclusiveMin false
   * @max 5
   * @exclusiveMax false
   */
  level?: number;
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
  /** 产品名称 */
  productName?: string;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** sku编码列表 */
  skuCodeList?: string[];
  /** spu编码列表 */
  spuCodeList?: string[];
  userProductSpuList?: string[];
}

/** MsrpQueryListResp */
export interface MsrpQueryListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 结果列表 */
  resultList?: MsrpSpuBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** MsrpSaveReq */
export interface MsrpSaveReq {
  /** 保存数据列表 */
  saveBeanList?: MsrpSpuChannelSaveBean[];
}

/** MsrpSaveSkuReq */
export interface MsrpSaveSkuReq {
  operationType?: string;
  /** sku保存数据 */
  skuSaveBeanList?: MsrpSkuDetailSaveBean[];
}

/** MsrpSaveSkuResp */
export interface MsrpSaveSkuResp {
  /** 提示内容 */
  tip?: string;
}

/** MsrpSaveSpuReq */
export interface MsrpSaveSpuReq {
  operationType?: string;
  /** spu保存数据 */
  spuSaveBean?: MsrpSpuDetailSaveBean;
}

/** MsrpSaveSpuResp */
export interface MsrpSaveSpuResp {
  /** 提示内容 */
  tip?: string;
}

/** MsrpSkuBean */
export interface MsrpSkuBean {
  /** 大促红线价折扣率 */
  bigPromotionRedlineDiscountRate?: number;
  /** 大促红线价 */
  bigPromotionRedlinePrice?: number;
  /** 编码 */
  code?: string;
  /** 国家编码 */
  countryCode?: string;
  /** 币种编码 */
  currencyCode?: string;
  /** 币种编码(亚马逊VC) */
  currencyCodeVc?: string;
  /** 币种名称 */
  currencyName?: string;
  /**
   * 明细id
   * @format int64
   */
  id?: number;
  /** 最大销售价格 */
  maxSalePrice?: number;
  /** 最大销售价格(亚马逊VC) */
  maxVcSalePrice?: number;
  /** 最小销售价格 */
  minSalePrice?: number;
  /** 最小销售价格(亚马逊VC) */
  minVcSalePrice?: number;
  /** 平销红线价折扣率 */
  normalRedlineDiscountRate?: number;
  /** 平销红线价 */
  normalRedlinePrice?: number;
  /**
   * 产品维度 1-spu 2-sku
   * @format int32
   */
  productType?: number;
  /** sku编码 */
  skuCode?: string;
  /** sku名称 */
  skuName?: string;
  /** 小促红线价折扣率 */
  smallPromotionRedlineDiscountRate?: number;
  /** 小促红线价 */
  smallPromotionRedlinePrice?: number;
  /** spu编码 */
  spuCode?: string;
}

/** MsrpSkuChannelBean */
export interface MsrpSkuChannelBean {
  /** 编码 */
  code?: string;
  /** 国家编码 */
  countryCode?: string;
  /** 国家名称 */
  countryCodeDesc?: string;
  /** 币种编码 */
  currencyCode?: string;
  /** 币种编码(亚马逊VC) */
  currencyCodeVc?: string;
  /**
   * 明细id
   * @format int64
   */
  id?: number;
  /** 最大销售价格 */
  maxSalePrice?: number;
  /** 最大销售价格(亚马逊VC) */
  maxVcSalePrice?: number;
  /** 最小销售价格 */
  minSalePrice?: number;
  /** 最小销售价格(亚马逊VC) */
  minVcSalePrice?: number;
  /**
   * 产品类型 1-spu 2-sku
   * @format int32
   */
  productType?: number;
  /** sku编码 */
  skuCode?: string;
  /** sku名称 */
  skuName?: string;
  /** spu编码 */
  spuCode?: string;
  /** VC唯一key */
  vcCode?: string;
}

/** MsrpSkuChannelSaveBean */
export interface MsrpSkuChannelSaveBean {
  /** 大促红线价折扣率 */
  bigPromotionRedlineDiscountRate?: number;
  /**
   * 大促红线价
   * @max 100000000
   * @exclusiveMax false
   */
  bigPromotionRedlinePrice?: number;
  /** 渠道编码 */
  channelCode?: string;
  /** 唯一编码 */
  code?: string;
  /** 国家编码 */
  countryCode?: string;
  /** 币种编码 */
  currencyCode?: string;
  /** 币种编码(亚马逊VC) */
  currencyCodeVc?: string;
  /**
   * 最大销售价格
   * @max 100000000
   * @exclusiveMax false
   */
  maxSalePrice?: number;
  /**
   * 最大销售价格(亚马逊VC)
   * @max 100000000
   * @exclusiveMax false
   */
  maxVcSalePrice?: number;
  /**
   * 最小销售价格
   * @max 100000000
   * @exclusiveMax false
   */
  minSalePrice?: number;
  /**
   * 最小销售价格(亚马逊VC)
   * @max 100000000
   * @exclusiveMax false
   */
  minVcSalePrice?: number;
  /** 平销红线价折扣率 */
  normalRedlineDiscountRate?: number;
  /**
   * 平销红线价
   * @max 100000000
   * @exclusiveMax false
   */
  normalRedlinePrice?: number;
  /** sku编码 */
  skuCode?: string;
  /** 小促红线价折扣率 */
  smallPromotionRedlineDiscountRate?: number;
  /**
   * 小促红线价
   * @max 100000000
   * @exclusiveMax false
   */
  smallPromotionRedlinePrice?: number;
  /** spu编码 */
  spuCode?: string;
  /** 唯一编码(VC) 新增时候为空 */
  vcCode?: string;
}

/** MsrpSkuDetailBean */
export interface MsrpSkuDetailBean {
  /** 大促红线价折扣率 */
  bigPromotionRedlineDiscountRate?: number;
  /** 大促红线价 */
  bigPromotionRedlinePrice?: number;
  /** 渠道编码 父记录是- 或者 null */
  channelCode?: string;
  /** 渠道名称 - 或者 null */
  channelName?: string;
  /** 唯一键 */
  code?: string;
  /** 国家编码 */
  countryCode?: string;
  /** 国家名称 */
  countryCodeDesc?: string;
  /** 币种编码 */
  currencyCode?: string;
  /** 币种编码(亚马逊VC) */
  currencyCodeVc?: string;
  /** 币种名称 */
  currencyName?: string;
  /** 最大销售价格 */
  maxSalePrice?: number;
  /** 最大销售价格(亚马逊VC) */
  maxVcSalePrice?: number;
  /** 最小销售价格 */
  minSalePrice?: number;
  /** 最小销售价格(亚马逊VC) */
  minVcSalePrice?: number;
  /** 平销红线价折扣率 */
  normalRedlineDiscountRate?: number;
  /** 平销红线价 */
  normalRedlinePrice?: number;
  /**
   * 产品类型 1-spu 2-sku
   * @format int32
   */
  productType?: number;
  /** spu编码 */
  skuCode?: string;
  /** spu名称 */
  skuName?: string;
  /** 小促红线价折扣率 */
  smallPromotionRedlineDiscountRate?: number;
  /** 小促红线价 */
  smallPromotionRedlinePrice?: number;
  /** VC唯一键 */
  vcCode?: string;
}

/** MsrpSkuDetailResp */
export interface MsrpSkuDetailResp {
  /** sku明细 */
  skuDetailBeanList?: MsrpSkuDetailBean[];
}

/** MsrpSkuDetailSaveBean */
export interface MsrpSkuDetailSaveBean {
  /** 大促红线价折扣率 */
  bigPromotionRedlineDiscountRate?: number;
  /**
   * 大促红线价
   * @max 100000000
   * @exclusiveMax false
   */
  bigPromotionRedlinePrice?: number;
  /** 渠道编码 父记录是- 或者 null */
  channelCode?: string;
  /** 唯一键 */
  code?: string;
  /** 国家编码 */
  countryCode?: string;
  /** 币种编码 */
  currencyCode?: string;
  /** 币种编码(亚马逊VC) */
  currencyCodeVc?: string;
  /**
   * 最大销售价格
   * @max 100000000
   * @exclusiveMax false
   */
  maxSalePrice?: number;
  /**
   * 最大销售价格(亚马逊VC)
   * @max 100000000
   * @exclusiveMax false
   */
  maxVcSalePrice?: number;
  /**
   * 最小销售价格
   * @max 100000000
   * @exclusiveMax false
   */
  minSalePrice?: number;
  /**
   * 最小销售价格(亚马逊VC)
   * @max 100000000
   * @exclusiveMax false
   */
  minVcSalePrice?: number;
  /** 平销红线价折扣率 */
  normalRedlineDiscountRate?: number;
  /**
   * 平销红线价
   * @max 100000000
   * @exclusiveMax false
   */
  normalRedlinePrice?: number;
  /** spu编码 */
  skuCode?: string;
  /** 小促红线价折扣率 */
  smallPromotionRedlineDiscountRate?: number;
  /**
   * 小促红线价
   * @max 100000000
   * @exclusiveMax false
   */
  smallPromotionRedlinePrice?: number;
  /** VC唯一键 */
  vcCode?: string;
}

/** MsrpSkuListQueryReq */
export interface MsrpSkuListQueryReq {
  /** 查询关键词 */
  countryCode?: string;
  /** sku编码列表 */
  skuCodeList?: string[];
  /** spu编码 */
  spuCode?: string;
}

/** MsrpSkuListResp */
export interface MsrpSkuListResp {
  /** sku列表 */
  msrpSkuPlanBeanList?: MsrpSkuPlanBean[];
}

/** MsrpSkuPlanBean */
export interface MsrpSkuPlanBean {
  /** 币种 */
  currency?: string;
  /** 币种名称 */
  currencyDesc?: string;
  /** msrp价格 */
  msrp?: string;
  /** sku编码 */
  skuCode?: string;
  /** sku名称 */
  skuName?: string;
}

/** MsrpSpuBean */
export interface MsrpSpuBean {
  /** 大促红线价折扣率 */
  bigPromotionRedlineDiscountRate?: string;
  /** 大促红线价 */
  bigPromotionRedlinePrice?: string;
  /** 产品分类 */
  categoryLevel?: string;
  /** 记录编码 */
  code?: string;
  /** 国家编码 */
  countryCode?: string;
  /** 国家名称 */
  countryCodeDesc?: string;
  /** 币种编码 */
  currencyCode?: string;
  /** 币种编码(亚马逊VC) */
  currencyCodeVc?: string;
  /** 币种名称 */
  currencyName?: string;
  /** 最大销售价格 */
  maxSalePrice?: number;
  /** 最大销售价格(亚马逊VC) */
  maxVcSalePrice?: number;
  /** 最小销售价格 */
  minSalePrice?: number;
  /** 最小销售价格(亚马逊VC) */
  minVcSalePrice?: number;
  /** 平销红线价折扣率 */
  normalRedlineDiscountRate?: string;
  /** 平销红线价 */
  normalRedlinePrice?: string;
  /**
   * 产品类型 1-spu 2-sku
   * @format int32
   */
  productType?: number;
  /** sku明细 */
  skuBeanList?: MsrpSkuBean[];
  /** 小促红线价折扣率 */
  smallPromotionRedlineDiscountRate?: string;
  /** 小促红线价 */
  smallPromotionRedlinePrice?: string;
  /** 产品spu编码 */
  spuCode?: string;
  /** 产品spu名称 */
  spuName?: string;
}

/** MsrpSpuChannelBean */
export interface MsrpSpuChannelBean {
  /** 唯一key */
  code?: string;
  /** 国家编码 */
  countryCode?: string;
  /** 国家名称 */
  countryCodeDesc?: string;
  /** 币种编码 */
  currencyCode?: string;
  /** 币种编码(亚马逊VC) */
  currencyCodeVc?: string;
  /**
   * id
   * @format int64
   */
  id?: number;
  /** 最大销售价格 */
  maxSalePrice?: number;
  /** 最大销售价格(亚马逊VC) */
  maxVcSalePrice?: number;
  /** 最小销售价格 */
  minSalePrice?: number;
  /** 最小销售价格(亚马逊VC) */
  minVcSalePrice?: number;
  /**
   * 产品类型 1-spu 2-sku
   * @format int32
   */
  productType?: number;
  /** sku明细 */
  skuBeanList?: MsrpSkuChannelBean[];
  /** 产品spu编码 */
  spuCode?: string;
  /** 产品spu名称 */
  spuName?: string;
  /** VC唯一key */
  vcCode?: string;
}

/** MsrpSpuChannelSaveBean */
export interface MsrpSpuChannelSaveBean {
  /** 渠道编码 */
  channelCode?: string;
  /** 唯一编码 新增时候为空 */
  code?: string;
  /** 国家编码 */
  countryCode?: string;
  /** 币种编码 */
  currencyCode?: string;
  /** 币种编码 */
  currencyCodeVc?: string;
  /**
   * 最大销售价格
   * @max 100000000
   * @exclusiveMax false
   */
  maxSalePrice?: number;
  /**
   * 最大销售价格(亚马逊VC)
   * @max 100000000
   * @exclusiveMax false
   */
  maxVcSalePrice?: number;
  /**
   * 最小销售价格
   * @max 100000000
   * @exclusiveMax false
   */
  minSalePrice?: number;
  /**
   * 最小销售价格(亚马逊VC)
   * @max 100000000
   * @exclusiveMax false
   */
  minVcSalePrice?: number;
  /** sku明细 */
  skuBeanList?: MsrpSkuChannelSaveBean[];
  /** 产品spu编码 */
  spuCode?: string;
  /** 唯一编码(VC) 新增时候为空 */
  vcCode?: string;
}

/** MsrpSpuDetailBean */
export interface MsrpSpuDetailBean {
  /** 大促红线价折扣率 */
  bigPromotionRedlineDiscountRate?: string;
  /** 大促红线价 */
  bigPromotionRedlinePrice?: string;
  /** 渠道编码 父记录是- */
  channelCode?: string;
  /** 渠道名称 */
  channelName?: string;
  /** 唯一键 */
  code?: string;
  /** 国家编码 */
  countryCode?: string;
  /** 国家名称 */
  countryCodeDesc?: string;
  /** 币种编码 */
  currencyCode?: string;
  /** 币种编码(亚马逊VC) */
  currencyCodeVc?: string;
  /** 币种名称 */
  currencyName?: string;
  /** GTM组 */
  gtm?: string;
  /** 最大销售价格 */
  maxSalePrice?: number;
  /** 最大销售价格(亚马逊VC) */
  maxVcSalePrice?: number;
  /** 最小销售价格 */
  minSalePrice?: number;
  /** 最小销售价格(亚马逊VC) */
  minVcSalePrice?: number;
  /** 平销红线价折扣率 */
  normalRedlineDiscountRate?: string;
  /** 平销红线价 */
  normalRedlinePrice?: string;
  /** 运营 */
  operator?: string;
  operatorDesc?: string;
  /**
   * 产品类型 1-spu 2-sku
   * @format int32
   */
  productType?: number;
  /** sku明细 */
  skuBeanList?: MsrpSkuDetailBean[];
  /** 小促红线价折扣率 */
  smallPromotionRedlineDiscountRate?: string;
  /** 小促红线价 */
  smallPromotionRedlinePrice?: string;
  /** spu编码 */
  spuCode?: string;
  /** spu名称 */
  spuName?: string;
  /** VC唯一键 */
  vcCode?: string;
}

/** MsrpSpuDetailReq */
export interface MsrpSpuDetailReq {
  /** 唯一键 */
  code?: string;
}

/** MsrpSpuDetailResp */
export interface MsrpSpuDetailResp {
  /** spu明细 */
  spuDetailBean?: MsrpSpuDetailBean;
}

/** MsrpSpuDetailSaveBean */
export interface MsrpSpuDetailSaveBean {
  /** 渠道编码 父记录是- */
  channelCode?: string;
  /** 唯一键 */
  code?: string;
  /** 国家编码 */
  countryCode?: string;
  /** 币种编码 */
  currencyCode?: string;
  /** 币种编码(亚马逊VC) */
  currencyCodeVc?: string;
  /**
   * 最大销售价格
   * @max 100000000
   * @exclusiveMax false
   */
  maxSalePrice?: number;
  /**
   * 最大销售价格(亚马逊VC)
   * @max 100000000
   * @exclusiveMax false
   */
  maxVcSalePrice?: number;
  /**
   * 最小销售价格
   * @max 100000000
   * @exclusiveMax false
   */
  minSalePrice?: number;
  /**
   * 最小销售价格(亚马逊VC)
   * @max 100000000
   * @exclusiveMax false
   */
  minVcSalePrice?: number;
  /** sku明细 */
  skuBeanList?: MsrpSkuDetailSaveBean[];
  /** spu编码 */
  spuCode?: string;
  /** VC唯一键 */
  vcCode?: string;
}

/** MultiPriceBean */
export interface MultiPriceBean {
  /** 亚马逊ASIN */
  amazonAsin?: string;
  /** 亚马逊币种 */
  amazonCurrency?: string;
  /** 亚马逊定价 */
  amazonListPrice?: number;
  /** 亚马逊商品链接 */
  amazonProductUrl?: string;
  /** 亚马逊促销价 */
  amazonPromotionPrice?: number;
  /** code */
  code?: string;
  /**
   * 主键ID
   * @format int64
   */
  id?: number;
  /** 独立站币种 */
  independentCurrency?: string;
  /** 独立站定价最大值 */
  independentListPriceMax?: number;
  /** 独立站定价最小值 */
  independentListPriceMin?: number;
  /** 独立站促销价最大值 */
  independentPromotionPriceMax?: number;
  /** 独立站促销价最小值 */
  independentPromotionPriceMin?: number;
  /** 独立站店铺SKU列表 */
  independentStoreSkuList?: string[];
  /** Lazada币种 */
  lazadaCurrency?: string;
  /** Lazada定价最大值 */
  lazadaListPriceMax?: number;
  /** Lazada定价最小值 */
  lazadaListPriceMin?: number;
  /** Lazada促销价最大值 */
  lazadaPromotionPriceMax?: number;
  /** Lazada促销价最小值 */
  lazadaPromotionPriceMin?: number;
  /** Lazada店铺SKU列表 */
  lazadaStoreSkuList?: string[];
  /** 产品名称 */
  productName?: string;
  /** 产品SKU */
  productSku?: string;
  /** Shopee币种 */
  shopeeCurrency?: string;
  /** Shopee定价最大值 */
  shopeeListPriceMax?: number;
  /** Shopee定价最小值 */
  shopeeListPriceMin?: number;
  /** Shopee促销价最大值 */
  shopeePromotionPriceMax?: number;
  /** Shopee促销价最小值 */
  shopeePromotionPriceMin?: number;
  /** Shopee店铺SKU列表 */
  shopeeStoreSkuList?: string[];
  /** 站点 */
  site?: string;
  /** 供应链SKU */
  supplySku?: string;
  /** Target币种 */
  targetCurrency?: string;
  /** Target定价最大值 */
  targetListPriceMax?: number;
  /** Target定价最小值 */
  targetListPriceMin?: number;
  /** Target促销价最大值 */
  targetPromotionPriceMax?: number;
  /** Target促销价最小值 */
  targetPromotionPriceMin?: number;
  /** Target店铺SKU列表 */
  targetStoreSkuList?: string[];
  /** TK币种 */
  tkCurrency?: string;
  /** TK定价最大值 */
  tkListPriceMax?: number;
  /** TK定价最小值 */
  tkListPriceMin?: number;
  /** TK促销价最大值 */
  tkPromotionPriceMax?: number;
  /** TK促销价最小值 */
  tkPromotionPriceMin?: number;
  /** TK店铺SKU列表 */
  tkStoreSkuList?: string[];
  /** 沃尔玛币种 */
  walmartCurrency?: string;
  /** 沃尔玛定价最大值 */
  walmartListPriceMax?: number;
  /** 沃尔玛定价最小值 */
  walmartListPriceMin?: number;
  /** 沃尔玛促销价最大值 */
  walmartPromotionPriceMax?: number;
  /** 沃尔玛促销价最小值 */
  walmartPromotionPriceMin?: number;
  /** 沃尔玛店铺SKU列表 */
  walmartStoreSkuList?: string[];
}

/** MultiPriceDetailResp */
export interface MultiPriceDetailResp {
  /** 币种 */
  currency?: string;
  /** 定价 */
  listPrice?: number;
  /** 店铺sku */
  platformSku?: string;
  /** 产品链接 */
  productUrl?: string;
  /** 促销价 */
  promotionPrice?: number;
  /** 店铺 */
  shop?: string;
  /** 站点 */
  site?: string;
}

/** MultiPriceQueryListReq */
export interface MultiPriceQueryListReq {
  /** 亚马逊子ASIN/店铺MSKU（模糊查询） */
  amazonAsinOrMsku?: string;
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
  /** 产品SKU/供应链SKU/产品名称（模糊查询） */
  productSkuOrSupplySkuOrName?: string;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 站点 */
  site?: string;
}

/** MultiPriceQueryListResp */
export interface MultiPriceQueryListResp {
  code?: string;
  /** 抓取更新时间 */
  crawlUpdateTime?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 结果列表 */
  resultList?: MultiPriceBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** OdsDictSalesChannelBean */
export interface OdsDictSalesChannelBean {
  /** lute_channel */
  luteChannel?: string;
  /** lute_platform */
  lutePlatform?: string;
  /** operate_dept */
  operateDept?: string;
  /** shop_channel */
  shopChannel?: string;
}

/** OdsFinanceCurrency */
export interface OdsFinanceCurrency {
  /** @format date-time */
  createTime?: string;
  dataStatus?: string;
  directRate?: number;
  disableStatus?: string;
  exchangeRateDate?: string;
  exchangeRateUsageMonth?: string;
  /** @format int64 */
  id?: number;
  originalCurrency?: string;
  originalCurrencyCode?: string;
  rateCny?: number;
  rateUsd?: number;
  reportMonth?: string;
  systemPreset?: string;
  /** @format date-time */
  updateTime?: string;
}

/** OfflineListingProductBean */
export interface OfflineListingProductBean {
  /** 渠道 */
  channel?: string;
  /** 渠道名称 */
  channelName?: string;
  /** 国家 */
  countryCode?: string;
  /** 国家名称 */
  countryName?: string;
  /**
   * 最近15销量
   * @format int32
   */
  day15Sales?: number;
  /**
   * 最近30销量
   * @format int32
   */
  day30Sales?: number;
  /**
   * 最近7销量
   * @format int32
   */
  day7Sales?: number;
  /**
   * 推广首单日期
   * @format date
   */
  firstOrderTime?: string;
  /** 图片 */
  imageUrl?: string;
  /**
   * 销售映射日期
   * @format date
   */
  mappingTime?: string;
  /**
   * 是否缺失映射 0-不缺少 1-缺少
   * @format int32
   */
  missingMapping?: number;
  /** 运营人员编码 */
  operator?: string;
  /** 运营人员名称 */
  operatorName?: string;
  /** 监控链接 */
  productLink?: string;
  /** 供应链sku/料号 */
  productSku?: string;
  /** 商品名称 */
  productTitle?: string;
  /** 采购价格 */
  purchasePrice?: number;
  /**
   * 记录日期
   * @format date-time
   */
  recordTime?: string;
  /** 店铺 */
  shop?: string;
  /** 站点 */
  site?: string;
  /** 站点名称 */
  siteName?: string;
  /** 商品SKU */
  skuCode?: string;
  /** 商品SPU */
  spuCode?: string;
  /** 产品状态 */
  status?: string;
  /** 产品状态描述 */
  statusDesc?: string;
  /** 标签列表 */
  tagList?: ListingTagBean[];
}

/** OfflineListingProductReq */
export interface OfflineListingProductReq {
  /** spu/skuCode/productSku */
  keyword?: string;
  /** msku列表 */
  mskuList?: string[];
  /** 运营负责人 */
  operatorIdList?: string[];
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
  /** 状态: 正常售卖 新品 清货状态 已完成清货 未知 */
  status?: string;
  /** 标签列表 */
  tagList?: string[];
}

/** OfflineProductListingResp */
export interface OfflineProductListingResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 在线商品列表 */
  resultList?: OfflineListingProductBean[];
  /** 状态数量列表 */
  statusCountBean?: StatusCountBean;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** OnlineProductBean */
export interface OnlineProductBean {
  /** 渠道 */
  channel?: string;
  /**
   * 首单时间
   * @format date
   */
  firstOrderTime?: string;
  /**
   * 是否缺失映射 0-不缺少 1-缺少
   * @format int32
   */
  missingMapping?: number;
  /** MSKU */
  msku?: string;
  /** 新/老品 */
  newOldProduct?: string;
  /**
   * 上架时间
   * @format date-time
   */
  onShelfTime?: string;
  /** 运营人员编码 */
  operator?: string;
  /** 运营人员名称 */
  operatorName?: string;
  /** 商品图片 */
  productImage?: string;
  /** 商品链接 */
  productLink?: string;
  /** 商品名称 */
  productName?: string;
  /** 销售SKU/ITEM_ID/MSKU */
  saleSkuCode?: string;
  /** 店铺 */
  shop?: string;
  /** 站点 */
  site?: string;
  /** 标签列表 */
  tagList?: ListingTagBean[];
  /** 唯一键 */
  uniqueCode?: string;
}

/** OnlineProductChartReq */
export interface OnlineProductChartReq {
  /**
   * 截止时间
   * @format date
   */
  endTime?: string;
  /**
   * 主键ID
   * @format int64
   */
  id?: number;
  /**
   * 开始时间
   * @format date
   */
  startTime?: string;
  /**
   * 趋势图类型 1-异常趋势 2-跟卖店铺信息  4-有竞争力价格趋势图
   * @format int32
   */
  type?: number;
}

/** OnlineProductChartResp */
export interface OnlineProductChartResp {
  /** 趋势数据 */
  chartInfoList?: ChartInfo[];
  /** 历史跟卖店铺信息 */
  historicalHijackList?: HijackShop[];
  /** 近七天跟卖店铺信息 */
  recentHijackList?: HijackShop[];
  /**
   * 趋势图类型 1-异常趋势 2-跟卖店铺信息 4-有竞争力价格
   * @format int32
   */
  type?: number;
  /** 趋势图类型 1-异常趋势 2-跟卖店铺信息 4-有竞争力价格 */
  typeDesc?: string;
}

/** OnlineProductMonitorBean */
export interface OnlineProductMonitorBean {
  /** asin */
  asin?: string;
  /** 子asin跳转链接 */
  asinUrl?: string;
  /** 有竞争力价格币种 */
  competitivenessCurrency?: string;
  /** 有竞争力价格 */
  competitivenessPrice?: number;
  /** 国家 */
  countryCode?: string;
  /** 国家名称 */
  countryName?: string;
  /** 商品币种 */
  currency?: string;
  /**
   * 首次出现时间
   * @format date
   */
  firstSignTime?: string;
  /** 组别 */
  group?: string;
  /**
   * 是否出现有竞争力价格 0-否 1是
   * @format int32
   */
  hasCompetitivenessPrice?: number;
  /** 是否出现有竞争力价格 0-否 1是 */
  hasCompetitivenessPriceDesc?: string;
  /**
   * 是否首次出现 0否 1是
   * @format int32
   */
  hasFirst?: number;
  /**
   * 是否跟卖异常 0-正常 1-异常
   * @format int32
   */
  hasHijackErr?: number;
  /** 是否跟卖异常 0-正常 1-异常 */
  hasHijackErrDesc?: string;
  /**
   * 是否缺失购物车 0-否 1是
   * @format int32
   */
  hasMissingShopCart?: number;
  /** 是否缺失购物车 0-否 1是 */
  hasMissingShopCartDesc?: string;
  /**
   * 是否高退货标记 0-正常 1-高退货 2低退货
   * @format int32
   */
  hasReturnRisk?: number;
  /** 是否高退货标记 0-否 1-是 */
  hasReturnRiskDesc?: string;
  /** 跟卖店铺信息 */
  hijackShop?: string;
  /** 历史跟卖店铺信息 */
  historicalHijackList?: HijackShop[];
  /**
   * id
   * @format int64
   */
  id?: number;
  /** 商品图片链接 */
  imageUrl?: string;
  /** 运营人员编码 */
  operator?: string;
  /** 运营人员名称 */
  operatorName?: string;
  /** 父asin */
  parentAsin?: string;
  /** 父asin跳转链接 */
  parentAsinUrl?: string;
  /** 平台 */
  platform?: string;
  /** 商品价格 */
  price?: number;
  /** 产品链接 */
  productLink?: string;
  /** 商品名称 */
  productTitle?: string;
  /** 近七天跟卖店铺信息 */
  recentHijackList?: HijackShop[];
  /** 店铺 */
  shop?: string;
  /** 站点 */
  site?: string;
  /** 站点id */
  siteId?: string;
  /** 站点名称 */
  siteName?: string;
  /** sku(msku) */
  sku?: string;
  /**
   * 状态(前台) 0-正常 1-变狗 2-停售
   * @format int32
   */
  state?: number;
  /** 状态(前台) 0-正常 1-变狗 2-停售 */
  stateDesc?: string;
  /**
   * 商品上架状态 1-上架 2-下架
   * @format int32
   */
  upStatus?: number;
  /** 商品上架状态描述 1-上架 2-下架 */
  upStatusDesc?: string;
}

/** OnlineProductMonitorReq */
export interface OnlineProductMonitorReq {
  /** asin列表 */
  asinList?: string[];
  /**
   * 是否出现有竞争力价格 0-否 1是
   * @format int32
   */
  hasCompetitivenessPrice?: number;
  /**
   * 是否跟卖异常 0正常 1异常
   * @format int32
   */
  hasHijackErr?: number;
  /**
   * 是否缺失购物车 0-否 1是
   * @format int32
   */
  hasMissingShopCart?: number;
  /**
   * 是否高退货标记 0否 1是
   * @format int32
   */
  hasReturnRisk?: number;
  /** ASIN/父ASIN */
  keyword?: string;
  /** 运营人员列表 */
  operatorIdList?: string[];
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
  /** 店铺列表 */
  shopList?: string[];
  /** 站点列表 */
  siteList?: string[];
  /**
   * 状态(前台)-正常/变狗/在售
   * @format int32
   */
  state?: number;
  /**
   * 1-上架 2-下架
   * @format int32
   */
  status?: number;
}

/** OnlineProductMonitorResp */
export interface OnlineProductMonitorResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 在线商品监控列表 */
  resultList?: OnlineProductMonitorBean[];
  /** 状态数量列表 */
  statusCountBean?: StatusCountBean;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** OnlineProductQueryReq */
export interface OnlineProductQueryReq {
  /** 渠道 */
  channel?: string;
  /** 渠道列表 */
  channelList?: string[];
  /** ITEM_ID/MSKU */
  keyword?: string;
  /** 运营人员列表 */
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
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 销售SKU集合 */
  saleSkuCodeList?: string[];
  /** 店铺 */
  shop?: string;
  /** 店铺列表 */
  shopList?: string[];
  /** 标签列表 */
  tagList?: string[];
}

/** OnlineProductQueryResp */
export interface OnlineProductQueryResp {
  code?: string;
  message?: string;
  /** 在线商品列表 */
  onlineProductList?: OnlineProductBean[];
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

/** OnlineProductSaveReq */
export interface OnlineProductSaveReq {
  /** 在线商品集合 */
  onlineProductList?: OnlineProductBean[];
}

/** OperationLogBean */
export interface OperationLogBean {
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 拓展信息 */
  extraInfo?: string;
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
  /** 操作人头像 */
  operatorAvatar?: string;
  /** 操作人编码 */
  operatorCode?: string;
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

/** OperatorCommonSaveReq */
export interface OperatorCommonSaveReq {
  /** 在线商品渠道 amazon、walmart、shopify、tiktok、b2c、offline */
  channel?: string;
  /** 唯一键 */
  keywords?: string;
  /** msku */
  msku?: string;
  /** 运营人员 */
  operator?: string;
  /** 店铺 */
  shop?: string;
}

/** OperatorConfig */
export interface OperatorConfig {
  /** 运营人员 */
  operator?: string;
  /** 站点 */
  site?: string;
}

/** OperatorQueryResp */
export interface OperatorQueryResp {
  /** 成员列表 */
  memberList?: MemberBean[];
  /** 运营人员 */
  operator?: string;
}

/** OperatorSaveReq */
export interface OperatorSaveReq {
  /** 运营人员 */
  operator?: string;
  /**
   * 亚马逊在线商品唯一键
   * @format int64
   */
  productId?: number;
  /** 沃尔玛在线商品唯一键(shop+sku) */
  shop?: string;
  /** 沃尔玛在线商品唯一键(shop+sku) */
  sku?: string;
  /** 新平台在线商品唯一键 */
  uniqueCode?: string;
  /**
   * Shopify在线商品唯一键
   * @format int64
   */
  variantId?: number;
}

/** OrderStatusBean */
export interface OrderStatusBean {
  /**
   * 全部
   * @format int64
   */
  all?: number;
  /**
   * 已关闭数量
   * @format int64
   */
  closedCount?: number;
  /**
   * 异常数量
   * @format int64
   */
  exceptionCount?: number;
  /**
   * 待发货数量
   * @format int64
   */
  paidCount?: number;
  /**
   * 待付款数量
   * @format int64
   */
  pendingCount?: number;
  /** 取货方式 */
  receiveGoodsTypeStr?: string;
  /** 收件人地址 */
  receiverAddress?: string;
  /** 收件人区县编码 */
  receiverAreaCode?: string;
  /** 收件人区县名称 */
  receiverAreaName?: string;
  /** 收件人市编码 */
  receiverCityCode?: string;
  /** 收件人市名称 */
  receiverCityName?: string;
  /** 收货人名字 */
  receiverName?: string;
  /** 收件人手机号 */
  receiverPhone?: string;
  /** 收件人省份编码 */
  receiverProvinceCode?: string;
  /** 收件人省份名称 */
  receiverProvinceName?: string;
  /**
   * 已发货数量
   * @format int64
   */
  shippedCount?: number;
}

/** PdtLineCountBean */
export interface PdtLineCountBean {
  /** 品线编码 */
  lineCode?: string;
  /** 品线名称 */
  lineName?: string;
  /**
   * 商品数量
   * @format int32
   */
  productNumber?: number;
}

/** PdtNewProductBean */
export interface PdtNewProductBean {
  /** 关联项目编码 */
  productCode?: string;
  /** 关联项目名称 */
  productName?: string;
}

/** PerformanceProductReq */
export interface PerformanceProductReq {
  /** 渠道 */
  channel?: string;
  /** 店铺asin/asin */
  keywords?: string;
  /** 店铺 */
  shop?: string;
}

/** PlanCreateCheckResp */
export interface PlanCreateCheckResp {
  skuCodeList?: string[];
}

/** PoInfoBean */
export interface PoInfoBean {
  /**
   * 本次生成MAC数量
   * @format int32
   */
  macNum?: number;
  /**
   * 订单行
   * @format int32
   */
  orderLine?: number;
  /** PO采购单编码 */
  poCode?: string;
  /** 供应商产品sku */
  productSku?: string;
}

/** Product */
export interface Product {
  name?: string;
  productSpu?: string;
}

/** ProductAttrBean */
export interface ProductAttrBean {
  /** 属性编码 */
  attrCode?: string;
  /** 属性名称 */
  attrName?: string;
  /** 属性值编码 */
  attrValueBeanList?: AttrValueBean[];
  /** 该属性是否关联商品 */
  connectFlag?: boolean;
  /**
   * id
   * @format int64
   */
  id?: number;
  /**
   * 序号
   * @format int32
   */
  sort?: number;
}

/** ProductAttrListQueryResp */
export interface ProductAttrListQueryResp {
  /** 商品属性列表 */
  productAttrList?: ProductAttrBean[];
}

/** ProductBarCodeBean */
export interface ProductBarCodeBean {
  /** 条形码 */
  barCode?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /** 创建人名称 */
  creatorName?: string;
  /**
   * 条形码ID
   * @format int64
   */
  id?: number;
  /** 备注 */
  remark?: string;
  /** 商品sku */
  skuCode?: string;
  /** 商品名称 */
  skuName?: string;
  /** 商品spu */
  spuCode?: string;
  /** 商品spu名称 */
  spuName?: string;
  /**
   * 条形码状态
   * @format int32
   */
  status?: number;
  /** 条形码状态描述 */
  statusDesc?: string;
  /**
   * 修改时间
   * @format date-time
   */
  updateTime?: string;
  /** 修改人 */
  updator?: string;
  /** 修改人名称 */
  updatorName?: string;
}

/** ProductBarCodeCancelReq */
export interface ProductBarCodeCancelReq {
  /**
   * 产品条形码
   * @format int64
   */
  id?: number;
}

/** ProductBarCodeQueryReq */
export interface ProductBarCodeQueryReq {
  /** 69条形码 */
  barCode?: string;
  /** 创建人/更新人 */
  handler?: string;
  /** 产品名称/产品SKU/产品SPU */
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

/** ProductBarCodeQueryResp */
export interface ProductBarCodeQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 条形码列表 */
  recordList?: ProductBarCodeBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** ProductBarCodeSaveUpdateReq */
export interface ProductBarCodeSaveUpdateReq {
  /** 产品条形码 */
  barCode?: string;
  /**
   * 条形码ID,编辑时候传入
   * @format int64
   */
  id?: number;
  /** 备注 */
  remark?: string;
  /** 商品sku */
  skuCode?: string;
}

/** ProductBatchOperateReq */
export interface ProductBatchOperateReq {
  /** gtm经理 操作：更新GTM经理-batch_update_gtm_manager */
  gtmManager?: string;
  /** 操作类型 更新产品经理-batch_update_pro_manager 更新GTM经理-batch_update_gtm_manager 关联SPU标签¬batch_rel_label 更新计划专员-batch_update_planner_manager */
  operateType?: string;
  /** 计划专员 操作：更新计划专员-batch_update_planner_manager */
  planner?: string;
  /** 产品经理 操作：更新产品经理-batch_update_pro_manager */
  productManager?: string;
  /** 产品SPU */
  productSpuList?: string[];
  /** SPU标签 操作：关联SPU标签¬batch_rel_label */
  tagCodeList?: string[];
}

/** ProductBean */
export interface ProductBean {
  /** 商品别名 */
  aliasName?: string;
  /** 分类编码 */
  categoryCode?: string;
  /** 一级分类 */
  categoryCodeLevel1?: string;
  /** 二级分类 */
  categoryCodeLevel2?: string;
  /** 三级分类 */
  categoryCodeLevel3?: string;
  /** 四级分类 */
  categoryCodeLevel4?: string;
  /** 五级分类 */
  categoryCodeLevel5?: string;
  /** 产品标签 */
  categoryLabelName?: string;
  /** 分类名称 */
  categoryLevel?: string;
  /** 商品分类名称 */
  categoryNames?: string;
  /** 创建时间 */
  createTime?: string;
  /** 采购是否已填 */
  declareFlag?: boolean;
  /** 申报价格,默认美元USD */
  declarePriceStr?: string;
  /**
   * 申报状态
   * @format int32
   */
  declareStatus?: number;
  /** 申报状态名称 */
  declareStatusDesc?: string;
  /** 申报工单编码 */
  declareWorkflowCode?: string;
  /** GTM经理 */
  gtm?: string;
  /** GTM负责人 */
  gtmLeader?: string;
  /** GTM负责人 */
  gtmLeaderCode?: string;
  /** GTM经理型号 */
  gtmModel?: string;
  /** GTM经理名称 */
  gtmName?: string;
  /**
   * 商品等级 0-暂无 1-正常 2-淘汰 3-侵权
   * @format int32
   */
  level?: number;
  /** 商品等级名称 */
  levelDesc?: string;
  /** 等级是否已填 */
  levelFlag?: boolean;
  /** 上架时间 */
  listingTime?: string;
  /** 型号名称 */
  modelsNames?: string;
  /** 商品名称 */
  name?: string;
  /** 产品英文名称 */
  nameEn?: string;
  /** 规格信息：包装尺寸（长*宽*高）cm3 */
  packageSizeStr?: string;
  /** 计划专员 */
  planner?: string;
  /** 计划专员 */
  plannerName?: string;
  /** 商品图片 */
  productImage?: string;
  /** 品线负责人 */
  productLeader?: string;
  /** 品线负责人 */
  productLeaderCode?: string;
  productLevel?: string;
  productLevelDesc?: string;
  /** 品线 */
  productLine?: string;
  /** 品线名称 */
  productLineName?: string;
  /** 产品经理编码 */
  productManagerCode?: string;
  /** 产品经理名称 */
  productManagerName?: string;
  /**
   * 商品sku数量
   * @format int32
   */
  productSkuCount?: number;
  /** 产品Id,商品编码，商品spu/sku */
  productSpu?: string;
  /**
   * 商品类型
   * @format int32
   */
  productType?: number;
  /** 商品类型名称 */
  productTypeDesc?: string;
  /** 规格信息：毛重量kg */
  productWeightStr?: string;
  /** 采购是否已填 */
  purchaseFlag?: boolean;
  /** 采购信息：采购单价,带币种 */
  purchasePriceStr?: string;
  /**
   * 采购信息：采购审批状态 审批状态 0-未审批 1-审批中 2-审批通过 3-审批拒绝
   * @format int32
   */
  purchaseStatus?: number;
  /** 采购信息：采购审批状态名称 */
  purchaseStatusDesc?: string;
  /**
   * 产品等级：产品质检 0-不需要 1-需要
   * @format int32
   */
  qualityCheck?: number;
  /** 产品等级：产品质检名称 0-不需要 1-需要 */
  qualityCheckDesc?: string;
  /** 产品卖点 */
  sellingPoint?: string;
  /** 系列名称 */
  seriesNames?: string;
  /** sku */
  skuCode?: string;
  /** 规格是否已填 */
  specFlag?: boolean;
  /**
   * 商品状态
   * @format int32
   */
  state?: number;
  /** 商品状态名称 */
  stateDesc?: string;
  /** 建议销售价格,带币种 */
  suggestSellPriceStr?: string;
  /** 采购信息：供应商代码 */
  supplierCode?: string;
  /** 采购信息：供应商名称 */
  supplierName?: string;
  /** 产品标签名称 */
  tagsNames?: string;
  /** 更新时间 */
  updateTime?: string;
  /** voc型号 */
  vocModel?: string;
}

/** ProductCategoryBean */
export interface ProductCategoryBean {
  /** 分类id */
  categoryCode?: string;
  /** 分类名称 */
  categoryName?: string;
  /**
   * 等级
   * @format int32
   */
  level?: number;
  /** 分类父id */
  parentCategoryCode?: string;
  /** 子分类 */
  productCategory?: ProductCategoryBean;
  /**
   * 状态
   * @format int32
   */
  status?: number;
}

/** ProductCategoryReq */
export interface ProductCategoryReq {
  /** 分类编码 */
  categoryCode: string;
}

/** ProductCategoryResp */
export interface ProductCategoryResp {
  /** 关联SPU */
  product?: Product;
}

/** ProductCheckRepeatReq */
export interface ProductCheckRepeatReq {
  /**
   * 商品类型 1-spu 2-sku
   * @format int32
   */
  productType?: number;
  /** 记录编码 */
  recordCode?: string;
}

/** ProductConnectCategoryReq */
export interface ProductConnectCategoryReq {
  /** 类目编码 */
  categoryCode: string;
  /** 商品Spu集合 */
  productSpuList: string[];
}

/** ProductDetailAttrBean */
export interface ProductDetailAttrBean {
  /** 属性编码 */
  attrCode?: string;
  /** 属性名称 */
  attrName?: string;
  /** 属性值编码 */
  attrValueCodeList?: string[];
}

/** ProductDetailQueryResp */
export interface ProductDetailQueryResp {
  /** 属性信息 */
  attrList?: ProductDetailAttrBean[];
  /** 品牌编码 */
  brandCode?: string;
  /** 品牌名称 */
  brandName?: string;
  /** 产品经理 */
  createBy?: string;
  /** 产品经理名称 */
  createByName?: string;
  /** 建议销售价币种编码 */
  currencyCode?: string;
  /** GTM经理 */
  gtm?: string;
  /** GTM负责人 */
  gtmLeader?: string;
  /** GTM负责人 */
  gtmLeaderCode?: string;
  /** GTM型号(GTM品线) */
  gtmModel?: string;
  /** GTM经理名称 */
  gtmName?: string;
  invalidSkuList?: ProductSkuDetailInfoBean[];
  /** 型号信息 */
  modelCodeList?: string[];
  /** 商品名称 */
  name?: string;
  /** 商品名称英文 */
  nameEn?: string;
  /** 计划专员 */
  planner?: string;
  /** 计划专员名称 */
  plannerName?: string;
  /** 分类信息 */
  productCategory?: ProductCategoryBean;
  /**
   * 商品id
   * @format int64
   */
  productId?: number;
  /** 商品图片 */
  productImage?: string;
  /** 品线负责人 */
  productLeader?: string;
  /** 品线负责人 */
  productLeaderCode?: string;
  /** 商品等级 S级：S A级：A B级：B C级：C */
  productLevelNew?: string;
  /** 品线名称 */
  productLine?: string;
  /** 品线名称 */
  productLineName?: string;
  /** 产品Id,商品编码，商品spu */
  productSpu?: string;
  /** 状态记录 */
  productStatusRecordList?: ProductStatusRecordBean[];
  /**
   * 商品类型
   * @format int32
   */
  productType?: number;
  /** 商品类型名称 */
  productTypeDesc?: string;
  /** 产品卖点 */
  sellingPoint?: string;
  /** 系列信息 */
  seriesCodeList?: string[];
  /** sku信息 */
  skuList?: ProductSkuDetailInfoBean[];
  /**
   * 商品状态
   * @format int32
   */
  state?: number;
  /** 商品状态名称 */
  stateDesc?: string;
  /** 建议销售价格 */
  suggestSellPrice?: number;
  /** 商品标签 */
  tagCodeList?: string[];
  /** voc型号 */
  vocModel?: string;
}

/** ProductGroupBean */
export interface ProductGroupBean {
  /** 分类编码 */
  categoryCode?: string;
  /** 分类名称 */
  categoryName?: string;
  /** 产品经理ID */
  developLuteId?: string;
  /** 产品经理 */
  developLuteName?: string;
  /** 组合产品SPU */
  groupProductSpu?: string;
  /**
   * 组合SKU数量
   * @format int32
   */
  groupSkuCount?: number;
  /** 中文名称 */
  name?: string;
  /** 英文名称 */
  nameEn?: string;
  /** 商品图片 */
  productImage?: string;
  /** 商品图片 */
  productImageUrl?: string;
  /** 建议销售币种 */
  suggestPriceCurrencyCode?: string;
  /** 建议销售价格 */
  suggestSellPrice?: number;
  /**
   * 商品类型
   * @format int32
   */
  type?: number;
  /**
   * 商品类型描述
   * @format int32
   */
  typeDesc?: number;
}

/** ProductGroupDetailResp */
export interface ProductGroupDetailResp {
  /** 品牌编码 */
  brandCode?: string;
  /** 品牌名称 */
  brandName?: string;
  /** 产品经理ID */
  developLuteId?: string;
  /** 产品经理 */
  developLuteName?: string;
  /** 组合产品SPU */
  groupProductSpu?: string;
  /** 组合SKU信息 */
  groupSkuList?: ProductGroupSkuBean[];
  /**
   * 组合SPU ID
   * @format int64
   */
  id?: number;
  /** 型号信息 */
  modelCodeList?: string[];
  /** 商品名称 */
  name?: string;
  /** 商品名称英文 */
  nameEn?: string;
  /** 分类信息 */
  productCategory?: ProductCategoryBean;
  /** 商品图片 */
  productImage?: string;
  /** 商品图片 */
  productImageUrl?: string;
  /** 系列信息 */
  seriesCodeList?: string[];
  /** 建议销售价币种编码 */
  suggestPriceCurrencyCode?: string;
  /** 建议销售价格 */
  suggestSellPrice?: number;
  /** 商品标签 */
  tagCodeList?: string[];
  /**
   * 商品类型
   * @format int32
   */
  type?: number;
  /** 商品类型名称 */
  typeDesc?: string;
}

/** ProductGroupListResp */
export interface ProductGroupListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 组合产品列表 */
  productGroupBeanList?: ProductGroupBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** ProductGroupSaveReq */
export interface ProductGroupSaveReq {
  /** 品牌编码 */
  brandCode?: string;
  /** 品牌名称 */
  brandName?: string;
  /** 分类编码 */
  categoryCode?: string;
  /** 产品经理ID */
  developLuteId?: string;
  /** 产品经理 */
  developLuteName?: string;
  /** 组合产品SPU */
  groupProductSpu?: string;
  /** 组合SKU信息 */
  groupSkuList?: ProductGroupSkuBean[];
  /**
   * 组合商品ID
   * @format int64
   */
  id?: number;
  /** 型号信息 */
  modelCodeList?: string[];
  /** 中文名称 */
  name?: string;
  /** 英文名称 */
  nameEn?: string;
  /** 商品图片 */
  productImage?: string;
  /** 系列信息 */
  seriesCodeList?: string[];
  /** 建议销售价币种编码 */
  suggestPriceCurrencyCode?: string;
  /** 建议销售价格 */
  suggestSellPrice?: number;
  /** 商品标签 */
  tagCodeList?: string[];
  /**
   * 商品类型
   * @format int32
   */
  type?: number;
  /** 商品类型名称 */
  typeDesc?: string;
}

/** ProductGroupSaveResp */
export interface ProductGroupSaveResp {
  /** 组合SPU编码 */
  groupProductSpu?: string;
}

/** ProductGroupSkuBean */
export interface ProductGroupSkuBean {
  /** 分类编码 */
  categoryCode?: string;
  /** 分类名称 */
  categoryName?: string;
  /** 产品经理ID */
  developLuteId?: string;
  /** 产品经理 */
  developLuteName?: string;
  /** 组合SPU编码 */
  groupProductSpu?: string;
  /** 组合SKU编码 */
  groupSkuCode?: string;
  /**
   * 组合SKU ID
   * @format int64
   */
  id?: number;
  /** 商品名称中文 */
  name?: string;
  /** 商品名称英文 */
  nameEn?: string;
  /** 图片链接 */
  productImageUrl?: string;
  /** 组合SKU列表 */
  skuList?: ProductGroupSkuItemBean[];
  /** 建议销售价格 */
  suggestPrice?: number;
  /** 建议销售价格币种 */
  suggestPriceCurrencyCode?: string;
  /**
   * 类型
   * @format int32
   */
  type?: number;
  /** 类型 */
  typeDesc?: string;
}

/** ProductGroupSkuDetailResp */
export interface ProductGroupSkuDetailResp {
  /** 品牌编码 */
  brandCode?: string;
  /** 品牌名称 */
  brandName?: string;
  /** 产品经理ID */
  developLuteId?: string;
  /** 产品经理 */
  developLuteName?: string;
  /** 组合产品SPU */
  groupProductSpu?: string;
  /** 组合SKU */
  groupSkuCode?: string;
  /** SKU中文名 */
  name?: string;
  /** SKU英文名 */
  nameEn?: string;
  /** 分类信息 */
  productCategory?: ProductCategoryBean;
  /** 商品图片 */
  productImage?: string;
  /** 商品图片 */
  productImageUrl?: string;
  /** 组合SKU Item 信息 */
  skuItemBeanList?: ProductGroupSkuItemBean[];
  /** 店铺sku销售信息-基础资料下的店铺的关联信息 */
  skuSalesPriceList?: ProductSkuSalePriceBean[];
  /** 建议销售价格 */
  suggestPrice?: number;
  /** 建议销售价币种编码 */
  suggestPriceCurrencyCode?: string;
  /**
   * 商品类型
   * @format int32
   */
  type?: number;
  /** 商品类型名称 */
  typeDesc?: string;
}

/** ProductGroupSkuItemBean */
export interface ProductGroupSkuItemBean {
  /** 产品经理ID */
  developLuteId?: string;
  /** 产品经理 */
  developLuteName?: string;
  /** 组合SKU编码 */
  groupSkuCode?: string;
  /**
   * 组合SKU Item ID
   * @format int64
   */
  id?: number;
  /** 商品名称中文 */
  name?: string;
  /** 商品名称英文 */
  nameEn?: string;
  /** 费用占比（小数） */
  priceRatio?: number;
  /** 费用占比（百分百） */
  priceRatioStr?: string;
  /** 图片链接 */
  productImageUrl?: string;
  /**
   * 数量
   * @format int32
   */
  qty?: number;
  /** SKU编码 */
  skuCode?: string;
  /**
   * 商品sku状态 1-未上架 2-在销售 3-清仓中 4-已退市
   * @format int32
   */
  state?: number;
  /** 状态描述 */
  stateDesc?: string;
  /** 建议销售价格 */
  suggestPrice?: number;
  /** 建议销售价格币种 */
  suggestPriceCurrencyCode?: string;
  /**
   * 类型
   * @format int32
   */
  type?: number;
  /** 类型 */
  typeDesc?: string;
}

/** ProductGroupSkuListResp */
export interface ProductGroupSkuListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 组合SKU列表 */
  productGroupSkuBeanList?: ProductGroupSkuBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** ProductGroupSkuSaveReq */
export interface ProductGroupSkuSaveReq {
  /** 品牌编码 */
  brandCode?: string;
  /** 分类编码 */
  categoryCode?: string;
  /** 产品经理ID */
  developLuteId?: string;
  /** 组合产品SPU */
  groupProductSpu?: string;
  /** 组合SKU */
  groupSkuCode?: string;
  /**
   * 组合SKU ID
   * @format int64
   */
  id?: number;
  /** 中文名称 */
  name?: string;
  /** 英文名称 */
  nameEn?: string;
  /** 商品图片 */
  productImage?: string;
  /** 组合信息 */
  skuItemBeanList?: ProductGroupSkuItemBean[];
  /** 店铺sku销售信息-基础资料下的店铺的关联信息 */
  skuSalesPriceList?: ProductSkuSalePriceBean[];
  /** 建议销售价格 */
  suggestPrice?: number;
  /** 建议销售价币种编码 */
  suggestPriceCurrencyCode?: string;
  /**
   * 商品类型
   * @format int32
   */
  type?: number;
}

/** ProductGroupSkuSaveResp */
export interface ProductGroupSkuSaveResp {
  /** 组合SKU编码 */
  groupSkuCode?: string;
}

/** ProductInfoPerfectionBean */
export interface ProductInfoPerfectionBean {
  /**
   * 完善数
   * @format int32
   */
  completeCount?: number;
  percentage?: string;
  /**
   * 总数
   * @format int32
   */
  totalCount?: number;
}

/** ProductInfoResp */
export interface ProductInfoResp {
  /** 商品名称 */
  name?: string;
  /** 商品图片 */
  productImage?: string;
  /** 产品Id,商品编码，商品spu */
  productSpu?: string;
}

/** ProductLineBean */
export interface ProductLineBean {
  /** 编码 */
  code?: string;
  /** 品线名称 */
  productLine?: string;
}

/** ProductLineDetailResp */
export interface ProductLineDetailResp {
  /** 编码 */
  code?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** GTM负责人 */
  gtmLeader?: string;
  /** GTM负责人 */
  gtmLeaderCode?: string;
  /** 关联商品信息集合 */
  productBeanList?: ProductBean[];
  /** 品线负责人 */
  productLeader?: string;
  /** 品线负责人 */
  productLeaderCode?: string;
  /** 品线名称 */
  productLine?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** ProductLineListQueryReq */
export interface ProductLineListQueryReq {
  /** GTM负责人 */
  gtmLeaderCode?: string;
  /** 品线名称 */
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
  /** 品线负责人 */
  productLeaderCode?: string;
  /** 品线编码 */
  productLineCode?: string;
  /** 品线名称 */
  productLineName?: string;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
}

/** ProductLineListResp */
export interface ProductLineListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  recordList?: ProductLineListRespItem[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** ProductLineListRespItem */
export interface ProductLineListRespItem {
  /** 编码 */
  code?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** GTM负责人 */
  gtmLeader?: string;
  /** GTM负责人 */
  gtmLeaderCode?: string;
  /** 品线负责人 */
  productLeader?: string;
  /** 品线负责人 */
  productLeaderCode?: string;
  /** 品线名称 */
  productLine?: string;
  /**
   * 关联产品数
   * @format int32
   */
  spuNums?: number;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** ProductLineSaveReq */
export interface ProductLineSaveReq {
  /** 编码 */
  code?: string;
  /** GTM负责人 */
  gtmLeaderCode?: string;
  /** 品线负责人 */
  productLeaderCode?: string;
  /** 品线名称 */
  productLine?: string;
  /** SPU编码列表 */
  spuCodeList?: string[];
}

/** ProductLineSaveResp */
export interface ProductLineSaveResp {
  /** 品线名称 */
  productLineNew?: string;
  productLineOld?: string;
  /** 编码 */
  spuCode?: string;
  /** 名称 */
  spuName?: string;
}

/** ProductLinkCommonSaveReq */
export interface ProductLinkCommonSaveReq {
  /** 在线商品渠道 amazon、walmart、shopify、tiktok、b2c、offline */
  channel?: string;
  /** 唯一键 */
  keywords?: string;
  /** msku */
  msku?: string;
  /** 商品链接 */
  productLink?: string;
  /** 店铺 */
  shop?: string;
}

/** ProductLinkSaveReq */
export interface ProductLinkSaveReq {
  /** 渠道 */
  channel?: string;
  /**
   * 亚马逊在线商品唯一键
   * @format int64
   */
  productId?: number;
  /** 商品链接 */
  productLink?: string;
  /** 沃尔玛在线商品唯一键(shop+sku) */
  shop?: string;
  /** 站点 */
  site?: string;
  /** 沃尔玛在线商品唯一键(shop+sku) */
  sku?: string;
  /** 新平台在线商品唯一键 */
  uniqueCode?: string;
  /**
   * Shopify在线商品唯一键
   * @format int64
   */
  variantId?: number;
}

/** ProductListQueryReq */
export interface ProductListQueryReq {
  /** 时间排序,默认false */
  asc?: boolean;
  /** 品牌编码 */
  brandCode?: string;
  /** 分类编码，如果传分类编码，分类等级一定要赋值 */
  categoryCode?: string;
  /** 产品分类批量 */
  categoryListWeb?: string[];
  /** 勾选导出的编码 */
  codeList?: string[];
  /** 国家编码 */
  countryCode?: string;
  /**
   * 创建时间-结束
   * @format date-time
   */
  createTimeEnd?: string;
  /**
   * 创建时间-开始
   * @format date-time
   */
  createTimeStart?: string;
  /** GTM经理 */
  gtm?: string;
  /** GTM经理批量 */
  gtmListWeb?: string[];
  /** GTM品线批量 */
  gtmProductLineListWeb?: string[];
  /**
   * 缺失信息 0-卖点 1-上架时间
   * @format int32
   */
  hasMissing?: number;
  /** 对象编码 */
  itemCode?: string;
  /**
   * 对象类型 1-品牌 2-型号 3-系列 4-敏感类型 5-标签
   * @format int32
   */
  itemType?: number;
  /** 商品名称/spu */
  keyWord?: string;
  /**
   * 分类等级，如果传分类编码，分类等级一定要赋值
   * @format int32
   * @min 1
   * @exclusiveMin false
   * @max 5
   * @exclusiveMax false
   */
  level?: number;
  /** 排序字段,默认updateTime,createTime */
  orderBy?: string;
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
  /** 品线 */
  productLine?: string;
  /** 产品品线批量 */
  productLineListWeb?: string[];
  /** 产品经理编码 */
  productManagerCode?: string;
  /** 产品经理批量 */
  productManagerListWeb?: string[];
  /** 商品名称 */
  productName?: string;
  /** 商品spu编码 */
  productSpu?: string;
  /** 商品spu编码列表 */
  productSpuList?: string[];
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /**
   * 状态
   * @format int32
   */
  state?: number;
  /** 状态批量 */
  stateListWeb?: number[];
  /** 标签编码 */
  tagCode?: string;
  /** 产品分类标签批量 */
  tagListWeb?: string[];
}

/** ProductListQueryResp */
export interface ProductListQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 商品列表 */
  productBeanList?: ProductBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** ProductListingBean */
export interface ProductListingBean {
  /** 子ASIN */
  asin?: string;
  /** 子asin跳转链接 */
  asinUrl?: string;
  /** 渠道 */
  channel?: string;
  /** 渠道名称 */
  channelName?: string;
  /** 国家 */
  countryCode?: string;
  /** 国家名称 */
  countryName?: string;
  /** 商品当前价格 */
  currPrice?: number;
  /** 商品当前价格币种 */
  currency?: string;
  /**
   * 近15天销量
   * @format int32
   */
  day15Sales?: number;
  /**
   * 近30天销量
   * @format int32
   */
  day30Sales?: number;
  /**
   * 近7天销量
   * @format int32
   */
  day7Sales?: number;
  /**
   * 推广标记状态 0-推广新品 2-日常销售 3-异常
   * @format int32
   */
  dspStatus?: number;
  /** 推广标记状态 0-推广新品 2-日常销售 3-异常 */
  dspStatusDesc?: string;
  /**
   * 推广首单时间
   * @format date
   */
  firstOrderTime?: string;
  /** fnsku */
  fnsku?: string;
  /**
   * ID
   * @format int64
   */
  id?: number;
  /** 商品图片 */
  imageUrl?: string;
  /**
   * 商品状态 1-删除 0-正常
   * @format int32
   */
  isDelete?: number;
  /** 商品存储状态描述 1-删除 0-正常 */
  isDeleteDesc?: string;
  /**
   * 亚马逊上架日期
   * @format date
   */
  listingTime?: string;
  /**
   * 0-不缺少 1-缺少
   * @format int32
   */
  missingMapping?: number;
  /** msku */
  msku?: string;
  /** msrp价格 */
  msrpList?: MsrpBean[];
  /** 分组（船长） */
  operatorCapitalGroup?: string;
  /** 运营人员编码 */
  operatorCode?: string;
  /** 运营人员名称 */
  operatorName?: string;
  /** 父ASIN */
  parentAsin?: string;
  /** 父asin跳转链接 */
  parentAsinUrl?: string;
  /** 产品信息集合 */
  productSkuList?: ProductSkuBaseBean[];
  /** 商品名称 */
  productTitle?: string;
  /** 商品销售价格 */
  regularPrice?: number;
  /** 商品促销价格 */
  salePrice?: number;
  /** 店铺 */
  shop?: string;
  /** 站点 */
  site?: string;
  /** 站点名称 */
  siteName?: string;
  /**
   * 状态 1-正常 2-待发布 3-发布中 4-发布失败
   * @format int32
   */
  status?: number;
  /** 状态描述 1-正常 2-待发布 3-发布中 4-发布失败 */
  statusDesc?: string;
  /** 标签 */
  tagList?: ListingTagBean[];
  /**
   * 运输方式
   * @format int32
   */
  transportMode?: number;
  /** 运输方式描述 */
  transportModeDesc?: string;
  /**
   * 商品上架状态 1-上架 2-下架
   * @format int32
   */
  upStatus?: number;
  /** 商品上架状态描述 1-上架 2-下架 */
  upStatusDesc?: string;
}

/** ProductOperateReq */
export interface ProductOperateReq {
  /** 申报信息：申报编码 */
  declareCode?: string;
  /** 申报信息：申报品名CN */
  declareName?: string;
  /** 申报信息：申报品名EN */
  declareNameEn?: string;
  /** 申报信息：申报价 */
  declarePrice?: number;
  /** 合并商品spu */
  mergeProductSpu?: string;
  /**
   * 操作类型 1：合并spu 2：添加产品等级 3：添加规格信息 4：添加采购信息 5：添加申报信息 6：上架 7：下架 8-取消 9-开启 10-待上架 11-开发中 12-废弃
   * @format int32
   */
  operateType?: number;
  /**
   * 规格信息：产品高度cm
   * @format double
   */
  productHeight?: number;
  /**
   * 规格信息：产品长度cm
   * @format double
   */
  productLength?: number;
  /**
   * 产品等级 1-正常 2-淘汰 3-侵权
   * @format int32
   */
  productLevel?: number;
  /** 申报信息：商品材质及成分含量 */
  productMaterialIngredient?: string;
  /**
   * 规格信息：产品净高度cm
   * @format double
   */
  productNetHeight?: number;
  /**
   * 规格信息：产品净长度cm
   * @format double
   */
  productNetLength?: number;
  /**
   * 规格信息：净重kg
   * @format double
   */
  productNetWeight?: number;
  /**
   * 规格信息：产品净宽度cm
   * @format double
   */
  productNetWidth?: number;
  /** 商品spu */
  productSpu: string;
  /**
   * 规格信息：毛重kg
   * @format double
   */
  productWeight?: number;
  /**
   * 规格信息：产品宽度cm
   * @format double
   */
  productWidth?: number;
  /** 采购信息：采购编码 */
  purchaseCode?: string;
  /** 采购信息：采购币种 */
  purchaseCurrencyCode?: string;
  /** 采购信息：采购负责人 */
  purchaseOperator?: string;
  /** 采购信息：默认采购单价 */
  purchasePrice?: number;
  /**
   * 产品质检 0-不需要 1-需要
   * @format int32
   */
  qualityCheck?: number;
  /** 敏感类型 */
  sensitiveTypeCodeList?: string[];
  /** 采购信息：供应商代码 */
  supplierCode?: string;
}

/** ProductPerfectionQueryResp */
export interface ProductPerfectionQueryResp {
  /** 完善度 */
  perfectionBean?: ProductInfoPerfectionBean;
}

/** ProductPerformanceDetailResp */
export interface ProductPerformanceDetailResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 销售价格列表 */
  sellerPriceList?: ProductSellerSkuPriceBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** ProductPerformanceMSkuBean */
export interface ProductPerformanceMSkuBean {
  /** 渠道 */
  channel?: string;
  /** MSKU */
  msku?: string;
  /** SKU图片 */
  productImageUrl?: string;
  /** 商品链接 */
  productLink?: string;
  /** SKU名称 */
  productTitle?: string;
  /** 销售SKU/ITEM_ID/ASIN */
  saleSkuCode?: string;
  /** 店铺 */
  shop?: string;
  /** 站点 */
  site?: string;
  /** SKU编码 */
  skuCode?: string;
  /** 唯一键 */
  uniqueCode?: string;
}

/** ProductPerformanceOnlineBean */
export interface ProductPerformanceOnlineBean {
  /** 渠道 */
  channel?: string;
  /** MSKU */
  msku?: string;
  /** 商品链接 */
  productLink?: string;
  /** 销售SKU/ITEM_ID/ASIN */
  saleSkuCode?: string;
  /** 店铺 */
  shop?: string;
  /** 站点 */
  site?: string;
  /** 唯一键 */
  uniqueCode?: string;
}

/** ProductPerformanceResp */
export interface ProductPerformanceResp {
  code?: string;
  message?: string;
  /** MSKU列表 */
  mskuList?: ProductPerformanceMSkuBean[];
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** SKU列表 */
  skuList?: ProductPerformanceSkuBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** ProductPerformanceSkuBean */
export interface ProductPerformanceSkuBean {
  /** 在线商品列表 */
  onlineProductList?: ProductPerformanceOnlineBean[];
  /** SKU图片 */
  productImageUrl?: string;
  /** SKU名称 */
  productTitle?: string;
  /** SKU编码 */
  skuCode?: string;
}

/** ProductRelationListResp */
export interface ProductRelationListResp {
  /** 品牌列表 */
  brandBeanList?: BrandBean[];
  /** 型号列表 */
  modelBeanList?: ModelBean[];
  /** 敏感类型列表 */
  sensitiveTypeBeanList?: SensitiveTypeBean[];
  /** 系列列表 */
  seriesBeanList?: SeriesBean[];
  /** 标签列表 */
  tagBeanList?: TagBean[];
}

/** ProductSaveResp */
export interface ProductSaveResp {
  /** 商品spu编码 */
  productSpu?: string;
}

/** ProductSellerSkuBean */
export interface ProductSellerSkuBean {
  /**
   * 是否启动 1-启动 0-未启动
   * @format int32
   */
  activeFlag?: number;
  /** 实际售价 */
  actualPrice?: number;
  /** 实际售价币种 默认美元 */
  actualPriceCurrency?: string;
  /** 渠道 */
  channel?: string;
  /** 店铺sku */
  msku?: string;
  /** 商品链接 */
  productLink?: string;
  /**
   * 记录日期
   * @format date
   */
  recordDate?: string;
  /** 店铺账号 */
  shop?: string;
  /** 店铺站点 */
  site?: string;
  /** 建议售价 */
  suggestPrice?: number;
  /** 建议售价币种 默认美元 */
  suggestPriceCurrency?: string;
}

/** ProductSellerSkuPriceBean */
export interface ProductSellerSkuPriceBean {
  /** 大类排名 */
  bigCategoryRanking?: string;
  /** 渠道 */
  channel?: string;
  /** 币种 */
  currency?: string;
  /** 市占 */
  marketShare?: string;
  /** 店铺SKU */
  msku?: string;
  /** 实时价格 */
  price?: string;
  /** 商品链接 */
  productLink?: string;
  /**
   * 记录日期
   * @format date
   */
  recordDate?: string;
  /** 店铺 */
  shop?: string;
  /** 站点 */
  site?: string;
  /** SKU */
  skuCode?: string;
  /** 小类排名 */
  smallCategoryRanking?: string;
  /** 商品名称 */
  title?: string;
  /** 唯一键 */
  uniqueCode?: string;
}

/** ProductSellerSkuQueryResp */
export interface ProductSellerSkuQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 在线销售商品信息 */
  sellerSkuList?: ProductSellerSkuBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** ProductShadowDetailStaticsSearchReq */
export interface ProductShadowDetailStaticsSearchReq {
  /**
   * 结束时间
   * @format date-time
   */
  endTime?: string;
  /** SKU */
  skuCode?: string;
  /**
   * 开始时间
   * @format date-time
   */
  startTime?: string;
}

/** ProductShadowDetailStatisticsResp */
export interface ProductShadowDetailStatisticsResp {
  /** 所有渠道销量 */
  allChannelSales?: Record<string, ProductShowDetailStatisticsRespSalesItem[]>;
  /** 亚马逊渠道销量 */
  amazonSales?: ProductShowDetailStatisticsRespSalesItem[];
  /** 大类排名 */
  bigCategoryTop?: ProductShowDetailStatisticsRespCategoryTop[];
  /** 市占 */
  marketShare?: ProductShowDetailStatisticsRespCommonShow[];
  /** 销量 */
  sales?: ProductShowDetailStatisticsRespSalesItem[];
  /** 小类排名 */
  samllCategoryTop?: ProductShowDetailStatisticsRespCategoryTop[];
  /** 评分 */
  score?: ProductShowDetailStatisticsRespCommonShow[];
  /** 独立站渠道销量 */
  shopifySales?: ProductShowDetailStatisticsRespSalesItem[];
  /** 沃尔玛渠道销量 */
  walmartSales?: ProductShowDetailStatisticsRespSalesItem[];
}

/** ProductShadowSearchReq */
export interface ProductShadowSearchReq {
  /** 分类 */
  catrgoryCode?: string;
  /** 关键字:产品名称/SKU/SPU */
  keyword?: string;
  /** 产品经理 */
  managerCode?: string;
  /** 品线 */
  productLint?: string;
}

/** ProductShadowSearchResp */
export interface ProductShadowSearchResp {
  /** 产品表现列表 */
  items?: ProductShadowSearchRespItem[];
}

/** ProductShadowSearchRespItem */
export interface ProductShadowSearchRespItem {
  /** 分类 */
  categoryDesc?: string;
  /** 图片 */
  imageUrl?: string;
  /** 产品经理 */
  maneger?: string;
  /** 产品经理 */
  manegerName?: string;
  /** 产品线 */
  productLineName?: string;
  /** 产品名称 */
  productName?: string;
  /** SKU */
  skuCode?: string;
  /** 规格描述 */
  specificationDesc?: string;
  /** SPU */
  spuCode?: string;
}

/** ProductShowDetailSearchReq */
export interface ProductShowDetailSearchReq {
  /** ASIN */
  asin?: string;
  /** 渠道 */
  channel?: string;
  /** 图片 */
  imageUrl?: string;
  /** 产品名称 */
  productName?: string;
  /** 店铺SKU */
  sellerSku?: string;
  /** 店铺 */
  shop?: string;
  /** 站点 */
  site?: string;
  /** SKU */
  skuCode?: string;
  /** 是否在线商品列表 */
  sourceOnlineSku?: boolean;
}

/** ProductShowDetailSearchResp */
export interface ProductShowDetailSearchResp {
  /** 基础信息 */
  baseInfo?: ProductShowDetailSearchRespBaseInfo;
}

/** ProductShowDetailSearchRespBaseInfo */
export interface ProductShowDetailSearchRespBaseInfo {
  /** ASIN */
  asin?: string;
  /** 渠道 */
  channel?: string;
  /** 首次下单时间 */
  firstOrderTime?: string;
  /** 图片 */
  imageUrl?: string;
  /** 父ASIN */
  parentAsin?: string;
  /** 产品名称 */
  productName?: string;
  /** 店铺SKU */
  sellerSku?: string;
  /** 店铺 */
  shop?: string;
  /** 站点 */
  site?: string;
  /** SKU */
  skuCode?: string;
  /** 上线时间 */
  upLineTime?: string;
}

/** ProductShowDetailStaticsSearchReq */
export interface ProductShowDetailStaticsSearchReq {
  /** ASIN */
  asin?: string;
  /** 渠道 */
  channel?: string;
  /**
   * 结束时间
   * @format date-time
   */
  endTime?: string;
  /** 图片 */
  imageUrl?: string;
  /** 产品名称 */
  productName?: string;
  /** 店铺SKU */
  sellerSku?: string;
  /** 店铺 */
  shop?: string;
  /** 站点 */
  site?: string;
  /** SKU */
  skuCode?: string;
  /** 是否在线商品列表 */
  sourceOnlineSku?: boolean;
  /**
   * 开始时间
   * @format date-time
   */
  startTime?: string;
}

/** ProductShowDetailStatisticsResp */
export interface ProductShowDetailStatisticsResp {
  /** 大类排名 */
  bigCategoryTop?: ProductShowDetailStatisticsRespCategoryTop[];
  /** 市占 */
  marketShare?: ProductShowDetailStatisticsRespCommonShow[];
  /** 销量 */
  sales?: ProductShowDetailStatisticsRespSalesItem[];
  /** 小类排名 */
  samllCategoryTop?: ProductShowDetailStatisticsRespCategoryTop[];
  /** 评分 */
  score?: ProductShowDetailStatisticsRespCommonShow[];
}

/** ProductShowDetailStatisticsRespCategoryTop */
export interface ProductShowDetailStatisticsRespCategoryTop {
  /** 时间 */
  time?: string;
  /**
   * 排名
   * @format int32
   */
  topNum?: number;
}

/** ProductShowDetailStatisticsRespCommonShow */
export interface ProductShowDetailStatisticsRespCommonShow {
  /** 评分 */
  desc?: string;
  /** 时间 */
  time?: string;
}

/** ProductShowDetailStatisticsRespSalesItem */
export interface ProductShowDetailStatisticsRespSalesItem {
  /** 金额 */
  amount?: number;
  /**
   * 数量
   * @format int32
   */
  num?: number;
  /** 店铺SKU */
  sellerSku?: string;
  /** 店铺 */
  shop?: string;
  /** 时间 */
  time?: string;
}

/** ProductShowSearchReq */
export interface ProductShowSearchReq {
  /** 渠道 */
  channel?: string;
  /** 关键字:店铺SKU/asin */
  keyword?: string;
  /** 销售sku */
  sellerSku?: string;
  /** 店铺 */
  shop?: string;
  /** 站点 */
  site?: string;
}

/** ProductShowSearchResp */
export interface ProductShowSearchResp {
  /** 产品表现列表 */
  items?: ProductShowSearchRespItem[];
}

/** ProductShowSearchRespItem */
export interface ProductShowSearchRespItem {
  /** ASIN */
  asin?: string;
  /** 渠道 */
  channel?: string;
  /** 图片 */
  imageUrl?: string;
  /** 产品名称 */
  productName?: string;
  /** 店铺SKU */
  sellerSku?: string;
  /** 店铺 */
  shop?: string;
  /** 站点 */
  site?: string;
  /** SKU */
  skuCode?: string;
  /** 是否在线商品列表 */
  sourceOnlineSku?: boolean;
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

/** ProductSkuBatchOpeReq */
export interface ProductSkuBatchOpeReq {
  /** 产品经理编码 batch_productManager-批量更新产品经理 */
  memberCode?: string;
  /** 操作类型 batch_update-批量更新 batch_update_pro_manager-批量更新产品经理 batch_sendEccang-批量推送易仓 batch_addTag-批量关联标签 */
  operateType: string;
  /** 商品sku */
  skuCodeList: string[];
  /**
   * 商品sku状态  0-已取消 1-未上架 2-在销售 3-清仓中 4-已退市  batch_update-批量更新
   * @format int32
   */
  status?: number;
  /** 标签编码  batch_addTag-批量关联标签 */
  tagCodeList?: string[];
}

/** ProductSkuBatteryBean */
export interface ProductSkuBatteryBean {
  /**
   * 电池是否内置(0-否,1-是)
   * @format int32
   */
  batteryContained?: number;
  /** 电池是否内置(否,是) */
  batteryContainedDesc?: string;
  /**
   * 电池数量
   * @format int32
   */
  batteryNum?: number;
  /** 电池尺寸(单位mm) */
  batterySize?: string;
  /** 电池类型 */
  batteryType?: string;
  /**
   * 产品是否含有电池(0-否,1-是)
   * @format int32
   */
  containsBattery?: number;
  /** 产品是否含有电池(否,是) */
  containsBatteryDesc?: string;
  /** 续航(年) */
  endurance?: string;
  /** 供电方式 */
  powerSupplyType?: string;
  /** 一个电池的重量(单位g) */
  singleBatteryWeight?: number;
  /** 电压(电压V) */
  voltage?: number;
}

/** ProductSkuBean */
export interface ProductSkuBean {
  /** 品牌 */
  brandCode?: string;
  /** 品牌名称 */
  brandName?: string;
  /** 五级分类编码 */
  categoryCode?: string;
  /** 分类标签名称 */
  categoryLabelName?: string;
  /** 五级分类名称 */
  categoryName?: string;
  /** 分类名称多级 */
  categoryNames?: string;
  /**
   * 中仓库存
   * @format int32
   */
  centerInventory?: number;
  /** 产品经理编码 */
  createBy?: string;
  /** 产品经理名称 */
  createByName?: string;
  /** 创建时间 */
  createTime?: string;
  /** 币种 */
  currency?: string;
  /** 币种-描述 */
  currencyDesc?: string;
  /** 出口申报价值币种 */
  declareCurrency?: string;
  /** 进口申报价值币种 */
  declarePrice?: number;
  /** 产品经理Id */
  developLuteId?: string;
  /** 易仓SKU列表 */
  eccangSkuList?: string[];
  /** GTM负责人 */
  gtmLeader?: string;
  /** GTM负责人 */
  gtmLeaderCode?: string;
  /**
   * 库存数
   * @format int32
   */
  inventory?: number;
  /** 最低价-报价策略 */
  minPrice?: number;
  /** 渠道售价MSRP */
  msrp?: string;
  /**
   * 海外仓库存
   * @format int32
   */
  overseasInventory?: number;
  /** 计划专员 */
  planner?: string;
  /** 计划专员名称 */
  plannerName?: string;
  /** 报价 */
  postalPrice?: string;
  /** 报价最大值 */
  postalPriceMax?: number;
  /** 报价最小值 */
  postalPriceMin?: number;
  /** 建议售价 */
  price?: number;
  /** 图片链接 */
  productImageList?: string[];
  /** 首张图片 */
  productImageUrl?: string;
  /** 品线负责人 */
  productLeader?: string;
  /** 品线负责人 */
  productLeaderCode?: string;
  /** 品线 */
  productLine?: string;
  /** 品线名称 */
  productLineName?: string;
  /** 供应链SKU编码 */
  productSku?: string;
  /** 商品SPU代码 , 归属SPU */
  productSpu?: string;
  /** 商品名称中文 */
  productTitle?: string;
  /** 商品名称英文 */
  productTitleEn?: string;
  /**
   * 商品类型
   * @format int32
   */
  productType?: number;
  /** 商品类型名称 */
  productTypeDesc?: string;
  /** 销售区域，结构为[[区域,国家],...] */
  saleRegionList?: string[][];
  /** 商品中心sku */
  skuCode?: string;
  /**
   * 商品sku状态 1-未上架 2-在销售 3-清仓中 4-已退市
   * @format int32
   */
  state?: number;
  /** 商品sku状态名称 */
  stateDesc?: string;
  /** 更新时间 */
  updateTime?: string;
  /** VOC型号 */
  vocModel?: string;
}

/** ProductSkuCategoryCountBean */
export interface ProductSkuCategoryCountBean {
  /** 分类编码 */
  categoryCode?: string;
  /** 分类名称 */
  categoryName?: string;
  /**
   * 商品SKU数量
   * @format int32
   */
  productSkuNumber?: number;
  /**
   * 占比, 保留两位小数
   * @format double
   */
  proportion?: number;
}

/** ProductSkuCertificationBean */
export interface ProductSkuCertificationBean {
  /** 认证地址 */
  certificationAddress?: string;
  /** 认证类型 */
  certificationName?: string;
  /** 认证产品名称（英文） */
  certificationProductNameEn?: string;
  /** 认证状态 */
  certificationStatus?: string;
  /** 认证适用国家名称 */
  complianceCountryName?: string;
  /** 产品认证生效日期 */
  effectiveDate?: string;
  /** 产品认证失效日期 */
  expiryDate?: string;
}

/** ProductSkuCertificationItem */
export interface ProductSkuCertificationItem {
  /** 认证证书报告路径 */
  certificatePath?: string;
  /**
   * 证书id 用于导出
   * @format int64
   */
  certificationId?: number;
  /** 认证项目 */
  certificationItem?: string;
  /**
   * 认证状态
   * @format int32
   */
  certificationStatus?: number;
  /** 认证状态 */
  certificationStatusDesc?: string;
  /** 合规覆盖的国家code */
  complianceCountry?: string;
  /** 合规覆盖的国家名称 */
  complianceCountryName?: string;
  /** 生效日期 */
  effectiveDate?: string;
  /** 失效日期 */
  expiryDate?: string;
  /** model */
  model?: string;
  /** skuCode */
  skuCode?: string;
  /** skuName */
  skuName?: string;
  /** 更新时间 */
  updateTime?: string;
  /** 修改人 */
  updater?: string;
}

/** ProductSkuCertificationListReq */
export interface ProductSkuCertificationListReq {
  /** 证书记录id */
  certificationIdList?: number[];
  /** 关键字 */
  keyword: string;
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
  /** 销售区域 */
  saleRegionList?: string[];
  /** 认证状态 */
  statusList?: number[];
  /**
   * 更新时间-结束
   * @format date-time
   */
  updateTimeEnd?: string;
  /**
   * 更新时间-开始
   * @format date-time
   */
  updateTimeStart?: string;
  /** 修改人 */
  updaterCodeList?: string[];
}

/** ProductSkuCertificationListResp */
export interface ProductSkuCertificationListResp {
  code?: string;
  /** 数据 */
  list?: ProductSkuCertificationItem[];
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

/** ProductSkuChannelBean */
export interface ProductSkuChannelBean {
  /** 线下渠道资料信息链接（产品经理填写） */
  offlineChannelInfoLink?: string;
}

/** ProductSkuClearanceSaveBean */
export interface ProductSkuClearanceSaveBean {
  /** 清关唯一编码 */
  clearanceCode?: string;
  /** 国家 */
  countryCodeList?: string[];
  /** 清关-进口海关编码 */
  hsImportCode?: string;
  /** 清关-进口申报价值币种 */
  hsImportCurrency?: string;
  /** 清关-进口申报价值 */
  hsImportPrice?: number;
  /** 清关-海关税率 */
  hsTariffRate?: number;
  /** 供应链sku编码 */
  productSku?: string;
  /** sku编码 */
  skuCode?: string;
}

/** ProductSkuDeclareSaveBean */
export interface ProductSkuDeclareSaveBean {
  /** 申报信息：申报编码 */
  declareCode?: string;
  /** 报关-出口申报价值币种 */
  declareCurrency?: string;
  /** 报关-报关申请要素 */
  declareElement?: string;
  /** 申报说明 */
  declareExplain?: string;
  /** 申报信息：申报品名CN */
  declareName: string;
  /** 申报信息：申报品名EN */
  declareNameEn: string;
  /** 报关-出口申报价值 */
  declarePrice: number;
  /**
   * 海关属性
   * @format int32
   */
  hsAttr?: number;
  /** 报关-出口海关编码 */
  hsCode?: string;
  /** 清关-中文材质 */
  productMaterialIngredient?: string;
  /** 清关-英文材质 */
  productMaterialIngredientEn?: string;
  /** 供应链sku编码 */
  productSku?: string;
  /** sku编码 */
  skuCode?: string;
  /** 征免 */
  taxExemption?: string;
  /** 境内货源地 */
  territoryGoods?: string;
  /** 报关-成交单位 */
  transactionUnit?: string;
  /** 清关-中文用途 */
  useCn?: string;
  /** 清关-英文用途 */
  useEn?: string;
}

/** ProductSkuDetailInfoBean */
export interface ProductSkuDetailInfoBean {
  /** 废弃按钮权限 false 无权限 true 有权限 */
  abandonFlag?: boolean;
  /** 是否启用 false 废弃，true 激活 */
  activeFlag?: boolean;
  /** 属性信息 */
  attrvalueList?: AttrValBean[];
  /** 分类名称 */
  categoryNames?: string;
  /**
   * sku主键id
   * @format int64
   */
  id?: number;
  /** 型号编码 */
  modelCode?: string;
  /** 型号名称 */
  modelName?: string;
  /** 图片链接 */
  productImageList?: string[];
  /** 首张图片 */
  productImageUrl?: string;
  /** 商品SKU代码 */
  productSku?: string;
  /** 商品SPU代码 */
  productSpu?: string;
  /** 商品名称中文 */
  productTitle?: string;
  /** 商品名称英文 */
  productTitleEn?: string;
  /** 商品sku */
  skuCode?: string;
  /** 组合SKU列表 */
  skuItemBeanList?: ProductGroupSkuItemBean[];
  /**
   * 商品sku状态 1-未上架 2-在销售 3-清仓中 4-已退市
   * @format int32
   */
  state?: number;
  /** 商品sku状态名称 */
  stateDesc?: string;
  /** 建议销售价格 */
  suggestPrice?: number;
  /** 建议销售价格币种 */
  suggestPriceCurrencyCode?: string;
}

/** ProductSkuDetailResp */
export interface ProductSkuDetailResp {
  /** 适用周期 */
  applicablePeriod?: string;
  /** 属性,拼接好的属性值 */
  attrValueNames?: string;
  /** 电池信息 */
  batteryInfo?: ProductSkuBatteryBean;
  /** 品牌编码 */
  brandCode?: string;
  /** 品牌名称 */
  brandName?: string;
  /** 分类名称 */
  categoryNames?: string;
  /** 认证信息 */
  certificationInfo?: ProductSkuCertificationBean;
  /** 渠道资料信息 */
  channelInfo?: ProductSkuChannelBean;
  /** 清洁方式说明 */
  cleaningInstructions?: string;
  /** 彩盒内的所有产品以及配件 */
  colorBoxContents?: string;
  /** 产品经理编码 */
  createBy?: string;
  /** 产品经理名称 */
  createByName?: string;
  /** 默认供应链sku */
  defaultProductSku?: string;
  /** EAN13码 */
  ean13?: string;
  /** EAN14码 */
  ean14?: string;
  /** 专供渠道 */
  exclusiveChannel?: string;
  /** 专供国家 */
  exclusiveCountry?: string;
  /** 硬件参数信息 */
  hardwareParamInfo?: ProductSkuHardwareParamBean;
  /**
   * 是否专供
   * @format int32
   */
  isExclusive?: number;
  /** 型号 */
  modelCode?: string;
  /** 型号名称 */
  modelName?: string;
  /** 在线完整产品规格 */
  onlineFullProductSpecs?: string;
  /** 线上产品全称 */
  onlineProductFullName?: string;
  /** 计划专员 */
  planner?: string;
  /** 计划专员名称 */
  plannerName?: string;
  /** 清关信息 */
  productClearanceList?: SkuClearanceSimpleBean[];
  /** 报关信息 */
  productDeclare?: SkuDeclareSimpleBean;
  /** 图片链接 */
  productImageList?: string[];
  /** 商品图片 */
  productImageUrl?: string;
  /** 供应链sku编码 */
  productSku?: string;
  /** 规格信息 */
  productSpec?: ProductSkuSpecBean;
  /** 商品SPU代码 */
  productSpu?: string;
  /** 商品名称中文 */
  productTitle?: string;
  /** 商品名称英文 */
  productTitleEn?: string;
  /**
   * 商品类型
   * @format int32
   */
  productType?: number;
  /** 商品类型名称 */
  productTypeDesc?: string;
  /** 产品回收信息 */
  recycleInfo?: ProductSkuRecycleBean;
  /** 备注 */
  remark?: string;
  /** 销售区域，结构为[[区域,国家],...] */
  saleRegionList?: string[][];
  /** 卖点 */
  sellingPoint?: string;
  /** 装运信息 */
  shipmentInfo?: ProductSkuShipmentBean;
  /** 适用周期 */
  skuApplicablePeriod?: string;
  /** 商品sku编码 */
  skuCode?: string;
  /** 组合SKU Item信息 */
  skuItemBeanList?: ProductGroupSkuItemBean[];
  /**
   * 商品sku状态 1-未上架 2-在销售 3-清仓中 4-已退市
   * @format int32
   */
  state?: number;
  /** 商品sku状态名称 */
  stateDesc?: string;
  /** 建议销售价格 */
  suggestPrice?: number;
  /** 建议销售价格币种 */
  suggestPriceCurrencyCode?: string;
  /** 建议销售价格币种 */
  suggestPriceCurrencyDesc?: string;
  /** VOC型号 */
  vocModel?: string;
  /** 质保信息 */
  warrantyInfo?: ProductSkuWarrantyBean;
}

/** ProductSkuHardwareParamBean */
export interface ProductSkuHardwareParamBean {
  /** 输入 */
  input?: string;
  /** 最大负载电流（单位A） */
  maxLoadCurrent?: number;
  /** 最大负载功率（单位W） */
  maxiLoadPower?: number;
  /** 输出 */
  output?: string;
}

/** ProductSkuInfoResp */
export interface ProductSkuInfoResp {
  /** 商品sku名称 */
  name?: string;
  /** 商品图片 */
  productImage?: string;
  /** 商品spu编码 */
  productSpu?: string;
  /** 商品sku编码 */
  skuCode?: string;
}

/** ProductSkuListQueryReq */
export interface ProductSkuListQueryReq {
  /** 创建时间排序,默认false */
  asc?: boolean;
  /** 品牌code */
  brandCode?: string;
  /** 品牌-批量 */
  brandListWeb?: string[];
  /** 分类编码，如果传分类编码，分类等级一定要赋值 */
  categoryCode?: string;
  /** 产品分类-批量 */
  categoryListWeb?: string[];
  /** 勾选导出的编码 */
  codeList?: string[];
  /** 查询库存用的countryCode */
  countryCode?: string;
  /**
   * 创建时间-结束
   * @format date-time
   */
  createTimeEnd?: string;
  /**
   * 创建时间-开始
   * @format date-time
   */
  createTimeStart?: string;
  /** currencyCode */
  currencyCode?: string;
  /** 客户编码 */
  customerCode?: string;
  /** 发货方法 1-FBA 2-中仓直发 3-海外仓直发 */
  deliveryCode?: string;
  /** 通过易仓SKU查出来的SkuCode */
  eccangSkuCodeList?: string[];
  /**
   * 导出文件类型。1： 所有信息；2： 采购信息；3： 报关/清关信息；4： 供应链SKU信息
   * @format int32
   */
  exportType?: number;
  /** SKU缺失信息 0-缺失图片,1-是否含有电池为空 */
  hasMissing?: number[];
  /** 关键词 */
  keyWord?: string;
  /**
   * 分类等级，如果传分类编码，分类等级一定要赋值
   * @format int32
   * @min 1
   * @exclusiveMin false
   * @max 5
   * @exclusiveMax false
   */
  level?: number;
  /** 排序字段,默认updateTime,createTime */
  orderBy?: string;
  /**
   * 0-红人发样 1-线下订单
   * @format int32
   */
  orderType?: number;
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
  /** 品线 */
  productLine?: string;
  /** 产品品线-批量 */
  productLineListWeb?: string[];
  /** 产品经理编码 */
  productManagerCode?: string;
  /** 产品经理-批量 */
  productManagerListWeb?: string[];
  /** 商品spu或者物料编码 */
  productSpu?: string;
  /** 商品spu或者物料编码 */
  productSpus?: string[];
  /**
   * 商品类型1：产品；2：物料 3-用研产品 12-配件 13-组合产品 14-虚拟产品
   * @format int32
   */
  productType?: number;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 销售区域 */
  saleRegionList?: string[];
  /** 查询erp报价定价 */
  searchErpQuotation?: boolean;
  /** 查询库存 */
  searchInventory?: boolean;
  /**
   * 商品sku状态 0-未上架 1-在销售 2-清仓中 3-待报废 4-已退市
   * @format int32
   */
  status?: number;
  /** 状态-批量 */
  statusListWeb?: string[];
  /** 商品sku状态 0-未上架 1-在销售 2-清仓中 3-待报废 4-已退市 */
  statuses?: string;
  /** 标签编码 */
  tagCode?: string;
  /** sku/产品分类标签-批量 */
  tagListWeb?: string[];
}

/** ProductSkuListQueryResp */
export interface ProductSkuListQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 商品Sku集合 */
  productSkuBeanList?: ProductSkuBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** ProductSkuMappingClearReq */
export interface ProductSkuMappingClearReq {
  /** 清除映射IDS */
  ids?: number[];
}

/** ProductSkuMappingQueryReq */
export interface ProductSkuMappingQueryReq {
  /**
   * 是否映射 0-否 1-是
   * @format int32
   */
  isMapping?: number;
  /**
   * 是否单品 0-否 1-是
   * @format int32
   */
  isSingle?: number;
  /** 店铺SKU/仓库SKU */
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
  /** 站点 */
  site?: string;
  /** 用户账号 */
  userAccount?: string;
  /** 仓库编码 */
  warehouseCode?: string;
}

/** ProductSkuMappingQueryResp */
export interface ProductSkuMappingQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 记录列表 */
  recordList?: ProductSkuMappingQueryRespItem[];
  /** 统计信息 */
  statisticsInfo?: StatisticsInfo;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** ProductSkuMappingQueryRespItem */
export interface ProductSkuMappingQueryRespItem {
  /** 创建时间 */
  createTime?: string;
  /** 币种 */
  currency?: string;
  /**
   * 主键
   * @format int64
   */
  id?: number;
  /** 商品图片 */
  imageUrl?: string;
  /**
   * 是否单品 0-否 1-是
   * @format int32
   */
  isSingle?: number;
  /** 是否单品 0-否 1-是 */
  isSingleDesc?: string;
  /** 操作日志列表 */
  operationLogList?: OperationLogBean[];
  /** 建议售价 */
  price?: number;
  /** 供应商sku */
  productSku?: string;
  /** 价格占比 */
  productSkuPuPrice?: number;
  /**
   * 商品sku数量
   * @format int32
   */
  productSkuQty?: number;
  /** 供应商SKU*数量 */
  productSkuQtyDesc?: string;
  /** 商品名称 */
  productTitle?: string;
  /** MSKU */
  sellerSku?: string;
  /** 站点 */
  site?: string;
  /** 商品sku编码 */
  skuCode?: string;
  /** 更新时间 */
  updateTime?: string;
  /** 用户账号 */
  userAccount?: string;
  /** 店铺信息 */
  userAccountSiteDesc?: string;
  /** 仓库编码 */
  warehouseCode?: string;
  /** 仓库名称 */
  warehouseName?: string;
}

/** ProductSkuMappingUpdateReq */
export interface ProductSkuMappingUpdateReq {
  /**
   * 主键ID
   * @format int64
   */
  id?: number;
  /**
   * 是否单品
   * @format int32
   */
  isSingle?: number;
  /** 供应商sku */
  productSku?: string;
  /**
   * 商品sku数量
   * @format int32
   */
  productSkuQty?: number;
  /** MSKU */
  sellerSku?: string;
  /** 用户账号 */
  userAccount?: string;
  /** 仓库编码 */
  warehouseCode?: string;
}

/** ProductSkuNotifyReq */
export interface ProductSkuNotifyReq {
  /** 部门或人员名称 */
  name?: string;
  /**
   * 通知类型：1：采购，2：报关，3：清关
   * @format int32
   */
  noticeType?: number;
  /** SKU名称集合 */
  skuCodeNames?: string[];
  /** SKU编码集合 */
  skuCodes?: string[];
  /**
   * 通知类型：1：部门，2：人员
   * @format int32
   */
  type?: number;
  /** 部门或人员ID */
  userIdList?: string[];
}

/** ProductSkuOldNewBean */
export interface ProductSkuOldNewBean {
  /** 产品经理Id */
  developLuteId?: string;
  /** GTM组成员memberCode */
  gtm?: string;
  /** GTM经理名称 */
  gtmManageName?: string;
  /** GTM组名称 */
  gtmName?: string;
  /** 型号 */
  modelCode?: string;
  /** 型号名称 */
  modelName?: string;
  /** 新产品SKU */
  newSkuCode?: string;
  /** 品线code */
  productLine?: string;
  /** 品线名称 */
  productLineName?: string;
  /** 产品经理名称 */
  productManageName?: string;
  /** 商品名称中文 */
  productTitle?: string;
  /** 产品sku */
  skuCode?: string;
  /**
   * 商品sku状态 1-未上架 2-在销售 3-清仓中 4-已退市
   * @format int32
   */
  state?: number;
  /** 商品sku状态名称 */
  stateDesc?: string;
}

/** ProductSkuOldNewListQueryReq */
export interface ProductSkuOldNewListQueryReq {
  /**
   * gtm组Id
   * @format int64
   */
  gtmDeptId?: number;
  /** 关键词 */
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
  /** 品线 */
  productLine?: string;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /**
   * 商品sku状态 1-未上架 2-在销售 3-清仓中 4-已退市
   * @format int32
   */
  state?: number;
}

/** ProductSkuOldNewMappingResp */
export interface ProductSkuOldNewMappingResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 记录列表 */
  recordList?: ProductSkuOldNewBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** ProductSkuOldNewSaveOrUpdReq */
export interface ProductSkuOldNewSaveOrUpdReq {
  /** 新产品SKU */
  newSkuCode?: string;
  /** 产品sku */
  skuCode?: string;
}

/** ProductSkuOperateReq */
export interface ProductSkuOperateReq {
  /**
   * 操作类型 1：归属spu 2：上架 3：清仓 4：退市
   * @format int32
   */
  operateType?: number;
  /** 商品spu，归属spu操作必填 */
  productSpu?: string;
  /** 商品sku，归属spu操作必填 */
  skuCode?: string;
}

/** ProductSkuPerfectionQueryResp */
export interface ProductSkuPerfectionQueryResp {
  /** 产品基本信息完善度 */
  productPerfectionBean?: ProductInfoPerfectionBean;
  /** SKU完善度 */
  skuPerfectionBean?: ProductInfoPerfectionBean;
  /** 供应链SKU完善度 */
  supplyPerfectionBean?: ProductInfoPerfectionBean;
}

/** ProductSkuRecycleBean */
export interface ProductSkuRecycleBean {
  /** 回收单位（产品）：纸板重量（克） */
  recycleCardboardWeight?: number;
  /** 回收单位：外包装纸板重量（克） */
  recycleOuterCardboardWeight?: number;
  /** 回收单位：外包装塑料重量（克） */
  recycleOuterPlasticWeight?: number;
  /** 回收总包装（产品包装+外包装）重量（克） */
  recyclePackagingWeight?: number;
  /** 回收单位（产品）：塑料重量（克） */
  recyclePlasticWeight?: number;
}

/** ProductSkuRelationSpecSaveBean */
export interface ProductSkuRelationSpecSaveBean {
  /** 箱规-高 */
  cartonHeight?: number;
  /** 箱规-长 */
  cartonLength?: number;
  /** 外箱净重（单位kg） */
  cartonNetWeight?: number;
  /**
   * 箱规-单箱数量
   * @format int32
   */
  cartonNum?: number;
  /** 箱规-单项重量 */
  cartonWeight?: number;
  /** 箱规-宽 */
  cartonWidth?: number;
  /** 材质 */
  material?: string;
  /**
   * 规格信息：产品高度cm
   * @format double
   */
  productHeight: number;
  /**
   * 规格信息：产品长度cm
   * @format double
   */
  productLength: number;
  /**
   * 产品等级 1-正常 2-淘汰 3-侵权
   * @format int32
   */
  productLevel?: number;
  /**
   * 规格信息：产品净高度cm
   * @format double
   */
  productNetHeight?: number;
  /**
   * 规格信息：产品净长度cm
   * @format double
   */
  productNetLength?: number;
  /**
   * 规格信息：净重kg
   * @format double
   */
  productNetWeight?: number;
  /**
   * 规格信息：产品净宽度cm
   * @format double
   */
  productNetWidth?: number;
  /**
   * 规格信息：毛重kg
   * @format double
   */
  productWeight: number;
  /**
   * 规格信息：产品宽度cm
   * @format double
   */
  productWidth: number;
  /**
   * 产品质检 0-不需要 1-需要
   * @format int32
   */
  qualityCheck?: number;
  /** 敏感类型 */
  sensitiveTypeCodeList?: string[];
}

/** ProductSkuSalePriceBean */
export interface ProductSkuSalePriceBean {
  /** 实际价格 */
  activityType?: string;
  /** 实际价格 */
  actualPrice?: number;
  /** 渠道 */
  channel?: string;
  channelName?: string;
  /** 币种 */
  currencyCode?: string;
  /** 记录编码 */
  saleSkuCode?: string;
  /** 店铺 */
  shop?: string;
  shopName?: string;
  /** 站点 */
  site?: string;
  siteName?: string;
  /** 商品sku编码 */
  skuCode?: string;
}

/** ProductSkuSaveBean */
export interface ProductSkuSaveBean {
  /** 是否启用 false 废弃，true 激活 */
  activeFlag: boolean;
  /** 属性信息，当前sku记录的属性值编码放到集合，即 红色*M码 ，红色属性值编码和M码的属性值编码 */
  attrValuecodeList?: string[];
  /**
   * sku的id
   * @format int64
   */
  id?: number;
  /** 型号编码 */
  modelCode?: string;
  /** 图片链接 */
  productImageList?: string[];
  /** 首张图片 */
  productImageUrl?: string;
  /** 商品SKU代码 */
  productSku?: string;
  /** 商品名称中文 */
  productTitle?: string;
  /** 商品名称英文 */
  productTitleEn?: string;
  /** 商品sku */
  skuCode?: string;
  /** 组合SKU列表 */
  skuItemBeanList?: ProductGroupSkuItemBean[];
  /** 建议销售价格 */
  suggestPrice?: number;
  /** 建议销售价格币种 */
  suggestPriceCurrencyCode?: string;
}

/** ProductSkuSaveReq */
export interface ProductSkuSaveReq {
  /** 适用周期 */
  applicablePeriod?: string;
  /** 电池信息 */
  batteryInfo?: ProductSkuBatteryBean;
  /** 品牌编码 */
  brandCode?: string;
  /** 认证信息 */
  certificationInfo?: ProductSkuCertificationBean;
  /** 渠道资料信息 */
  channelInfo?: ProductSkuChannelBean;
  /** 彩盒内的所有产品以及配件 */
  colorBoxContents?: string;
  /** 产品经理 */
  createBy?: string;
  /** EAN13码 */
  ean13?: string;
  /** EAN14码 */
  ean14?: string;
  /** 硬件参数信息 */
  hardwareParamInfo?: ProductSkuHardwareParamBean;
  /** 型号 */
  modelCode: string;
  /** 在线完整产品规格 */
  onlineFullProductSpecs?: string;
  /** 线上产品全称 */
  onlineProductFullName?: string;
  /** 计划专员 */
  planner?: string;
  /** 清关信息 */
  productClearanceList?: ProductSkuClearanceSaveBean[];
  /** 申报信息 */
  productDeclare?: ProductSkuDeclareSaveBean;
  /** 图片链接 */
  productImageList?: string[];
  /** 规格信息 */
  productSpec: ProductSkuRelationSpecSaveBean;
  /** 商品名称中文 */
  productTitle: string;
  /** 商品名称英文 */
  productTitleEn: string;
  /** 产品回收信息 */
  recycleInfo?: ProductSkuRecycleBean;
  /** 备注 */
  remark?: string;
  /** 销售区域，结构为[[区域,国家],...]，如[["北美","美国"],["北美","加拿大"]] */
  saleRegionList?: string[][];
  /** 卖点 */
  sellingPoint?: string;
  /** 装运信息 */
  shipmentInfo?: ProductSkuShipmentBean;
  /** 商品sku编码 */
  skuCode: string;
  /** 组合信息 */
  skuItemBeanList?: ProductGroupSkuItemBean[];
  /** 建议销售价格 */
  suggestPrice: number;
  /** 建议销售价格币种 */
  suggestPriceCurrencyCode: string;
  /** 质保信息 */
  warrantyInfo?: ProductSkuWarrantyBean;
}

/** ProductSkuSaveResp */
export interface ProductSkuSaveResp {
  /** 商品sku编码 */
  skuCode?: string;
}

/** ProductSkuShipmentBean */
export interface ProductSkuShipmentBean {
  /** 托盘高度(m) */
  palletHeight?: number;
  /**
   * 托盘总层数(单位层)
   * @format int32
   */
  palletLayerNum?: number;
  /**
   * 托盘单层箱数(单位箱)
   * @format int32
   */
  palletSingleLayerBoxNum?: number;
  /** 托盘单层尺寸(高,单位m) */
  palletSingleLayerHeight?: number;
  /** 托盘单层尺寸(长,单位m) */
  palletSingleLayerLength?: number;
  /** 托盘单层尺寸(宽,单位m) */
  palletSingleLayerWidth?: number;
  /** 托盘类型 */
  palletType?: string;
  /** 托盘重量(kg) */
  palletWeight?: number;
}

/** ProductSkuSpecBean */
export interface ProductSkuSpecBean {
  /** 是否激活 */
  activeFlag?: boolean;
  /** 箱规-高(外箱) */
  cartonHeight?: number;
  /** 箱规-长(外箱) */
  cartonLength?: number;
  /** 外箱净重（单位kg） */
  cartonNetWeight?: number;
  /**
   * 箱规-单箱数量
   * @format int32
   */
  cartonNum?: number;
  /** 箱规-单箱重量(外箱毛重) */
  cartonWeight?: number;
  /** 箱规-宽(外箱) */
  cartonWidth?: number;
  /** 材质 */
  material?: string;
  /**
   * 产品高度cm
   * @format double
   */
  productHeight?: number;
  /**
   * 产品长度cm
   * @format double
   */
  productLength?: number;
  /**
   * 产品等级 1-正常 2-淘汰 3-侵权
   * @format int32
   */
  productLevel?: number;
  /** 产品等级名称 */
  productLevelDesc?: string;
  /**
   * 产品净高度cm
   * @format double
   */
  productNetHeight?: number;
  /**
   * 产品净长度cm
   * @format double
   */
  productNetLength?: number;
  /**
   * 产品净重kg
   * @format double
   */
  productNetWeight?: number;
  /**
   * 产品净宽度cm
   * @format double
   */
  productNetWidth?: number;
  /** 商品SPU代码 */
  productSpu?: string;
  /**
   * 产品毛重kg
   * @format double
   */
  productWeight?: number;
  /**
   * 产品宽度cm
   * @format double
   */
  productWidth?: number;
  /**
   * 产品质检 0-不需要 1-需要
   * @format int32
   */
  qualityCheck?: number;
  /** 产品质检名称 0-不需要 1-需要 */
  qualityCheckDesc?: string;
  /** 敏感类型 */
  sensitiveTypeCodeList?: string[];
  /** SKU */
  skuCode?: string;
}

/** ProductSkuWarrantyBean */
export interface ProductSkuWarrantyBean {
  /** 求助热线联系方式（电话和电子邮件） */
  helplineContact?: string;
  /**
   * 是否保修
   * @format int32
   */
  isWarranty?: number;
  /**
   * 英国消费者保修（以月为单位）
   * @format int32
   */
  ukConsumerWarranty?: number;
  /**
   * 英国制造商保修（以月为单位）
   * @format int32
   */
  ukManufacturerWarranty?: number;
  /** 保修时效 */
  warrantyPeriod?: string;
}

/** ProductSpecSaveBean */
export interface ProductSpecSaveBean {
  /** 箱规-高 */
  cartonHeight?: number;
  /** 箱规-长 */
  cartonLength?: number;
  /**
   * 箱规-单箱数量
   * @format int32
   */
  cartonNum?: number;
  /** 箱规-单箱重量 */
  cartonWeight?: number;
  /** 箱规-宽 */
  cartonWidth?: number;
  /**
   * 规格信息：产品高度cm
   * @format double
   */
  productHeight?: number;
  /**
   * 规格信息：产品长度cm
   * @format double
   */
  productLength?: number;
  /**
   * 产品等级 1-正常 2-淘汰 3-侵权
   * @format int32
   */
  productLevel?: number;
  /**
   * 规格信息：产品净高度cm
   * @format double
   */
  productNetHeight?: number;
  /**
   * 规格信息：产品净长度cm
   * @format double
   */
  productNetLength?: number;
  /**
   * 规格信息：净重kg
   * @format double
   */
  productNetWeight?: number;
  /**
   * 规格信息：产品净宽度cm
   * @format double
   */
  productNetWidth?: number;
  /**
   * 规格信息：毛重kg
   * @format double
   */
  productWeight?: number;
  /**
   * 规格信息：产品宽度cm
   * @format double
   */
  productWidth?: number;
  /**
   * 产品质检 0-不需要 1-需要
   * @format int32
   */
  qualityCheck?: number;
  /** SKU */
  skuCode?: string;
}

/** ProductStatusRecordBean */
export interface ProductStatusRecordBean {
  /** 状态名称 */
  statusName?: string;
  /** 操作人 */
  updateByName?: string;
  /**
   * 状态变更时间
   * @format date-time
   */
  updateTime?: string;
}

/** PromotionPlanApplyBean */
export interface PromotionPlanApplyBean {
  /** 活动名称 */
  activityName?: string;
  /** 活动毛利率 */
  activityProfitRate?: number;
  /**
   * 活动状态
   * @format int32
   */
  activityStatus?: number;
  /** 活动状态描述 */
  activityStatusDesc?: string;
  /** 活动类型 */
  activityTypeDesc?: string;
  /** 渠道 */
  channel?: string;
  /** 国家 */
  country?: string;
  /** 创建时间 */
  createTimeStr?: string;
  /** 创建人 */
  creator?: string;
  /** 币种 */
  currency?: string;
  /** 当前审批人 */
  currentApprover?: string;
  /** 折扣率 */
  discountRate?: number;
  /** 活动结束日期 */
  endDate?: string;
  /** GTM组 */
  gtmName?: string;
  /** MSRP价格 */
  msrp?: number;
  /**
   * OA审批状态
   * @format int32
   */
  oaApproveStatus?: number;
  /** OA审批状态描述 */
  oaApproveStatusDesc?: string;
  /** 运营 */
  operator?: string;
  /** 原毛利率 */
  originalProfitRate?: number;
  /** 活动id */
  planCode?: string;
  /** 促销等级 */
  promotionLevelDesc?: string;
  /** 活动价 */
  promotionPrice?: number;
  /** SKU */
  skuCode?: string;
  /** SKU产品名称 */
  skuName?: string;
  /** SPU */
  spuCode?: string;
  /** SPU产品名称 */
  spuName?: string;
  /** 活动开始日期 */
  startDate?: string;
  /**
   * 目标销量
   * @format int32
   */
  targetSales?: number;
}

/** PromotionPlanApplyListResp */
export interface PromotionPlanApplyListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  recordList?: PromotionPlanApplyBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** PromotionPlanCreateReq */
export interface PromotionPlanCreateReq {
  /** 活动名称 */
  activityName: string;
  /**
   * 活动类型：0-默认 1-直降 2-Coupon 3-秒杀 4-PED 5-CODE 6-BD
   * @format int32
   */
  activityType: number;
  /** 渠道 */
  channel: string;
  /** 国家编码 */
  countryCode: string;
  /**
   * 活动结束日期
   * @format date
   */
  endDate: string;
  /**
   * 是否走OA 0-否 1-是
   * @format int32
   */
  isOa?: number;
  /**
   * 是否走OA审批:0-否 1-是
   * @format int32
   */
  isOaApproval?: number;
  /** 计划编码 */
  planCode?: string;
  /**
   * 促销等级：0-默认 1-大促 2-小促 3-平促
   * @format int32
   */
  promotionLevel: number;
  /** SKU明细列表 */
  skuItems: PromotionPlanSkuItem[];
  /** SPU编码 */
  spuCode: string;
  /**
   * 活动开始日期
   * @format date
   */
  startDate: string;
}

/** PromotionPlanDeleteResp */
export interface PromotionPlanDeleteResp {
  /** 是否确认删除 */
  confirm?: boolean;
  /** 提示信息 */
  message?: string;
}

/** PromotionPlanDetailResp */
export interface PromotionPlanDetailResp {
  /** 活动名称 */
  activityName?: string;
  /** 活动价 */
  activityPrice?: number;
  /** 活动毛利率 */
  activityProfitRate?: number;
  /**
   * 活动类型：0-默认 1-直降 2-Coupon 3-秒杀 4-PED 5-CODE 6-BD
   * @format int32
   */
  activityType?: number;
  /**
   * 活动状态：0-待审核 1-审核通过 2-已驳回
   * @format int32
   */
  approveStatus?: number;
  /** 渠道 */
  channel?: string;
  /** 企业编码 */
  companyCode?: string;
  /** 国家编码 */
  countryCode?: string;
  /** 币种 */
  currency?: string;
  /** 币种名称 */
  currencyDesc?: string;
  /** 折扣率 */
  discountRate?: number;
  /**
   * 活动结束日期
   * @format date
   */
  endDate?: string;
  /**
   * 是否OA审批：0-否 1-是
   * @format int32
   */
  isOaApprove?: number;
  /** MSRP */
  msrp?: number;
  /**
   * OA审批状态：0-待审核 1-审核中 2-审核通过 3-审核驳回
   * @format int32
   */
  oaApproveStatus?: number;
  /** 原毛利率 */
  originalProfitRate?: number;
  /** 计划编码 */
  planCode?: string;
  /**
   * 促销等级：0-默认 1-大促 2-小促 3-平促
   * @format int32
   */
  promotionLevel?: number;
  /** SKU编码 */
  skuCode?: string;
  /** SkU名称 */
  skuName?: string;
  /** SPU编码 */
  spuCode?: string;
  /** SPU名称 */
  spuName?: string;
  /**
   * 活动开始日期
   * @format date
   */
  startDate?: string;
  /**
   * 目标销量
   * @format int32
   */
  targetSales?: number;
}

/** PromotionPlanListQueryReq */
export interface PromotionPlanListQueryReq {
  /**
   * 活动状态：0-待审核 1-审核通过 2-已驳回
   * @format int32
   */
  approveStatus?: number;
  /** 渠道 */
  channel?: string;
  /** 国家编码 */
  countryCode?: string;
  /**
   * 结束时间
   * @format date
   */
  endDate?: string;
  /** 品线 */
  gtm?: string;
  /** gtm经理 */
  gtmMember?: string;
  /** 是否导出 */
  isExport?: boolean;
  /**
   * 是否走OA 0-否 1-是
   * @format int32
   */
  isOa?: number;
  /**
   * OA审批状态：0-待审核 1-审核中 2-审核通过 3-审核驳回
   * @format int32
   */
  oaApproveStatus?: number;
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
  /** SKU编码 */
  skuCode?: string;
  /** SPU编码 */
  spuCode?: string;
  /** SPU编码列表 */
  spuCodeList?: string[];
  /**
   * 开始时间
   * @format date
   */
  startDate?: string;
}

/** PromotionPlanListQuerySkuResp */
export interface PromotionPlanListQuerySkuResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 列表项 */
  recordList?: SkuPromotionPlanListBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** PromotionPlanListQuerySpuResp */
export interface PromotionPlanListQuerySpuResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 列表项 */
  recordList?: SpuPromotionPlanListBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** PromotionPlanReviewListBean */
export interface PromotionPlanReviewListBean {
  /** 活动名称 */
  activityName?: string;
  /** 活动价格 */
  activityPrice?: number;
  /** 活动毛利率 */
  activityProfitRate?: number;
  /**
   * 审核状态
   * @format int32
   */
  approveStatus?: number;
  /** 审核状态 */
  approveStatusDesc?: string;
  /** 提交人 */
  auditUser?: string;
  /** 渠道 */
  channel?: string;
  /** 币种 */
  currency?: string;
  /** 折扣率 */
  discountRate?: number;
  /** 结束日期 */
  endDate?: string;
  /** MSRP */
  msrp?: number;
  /** 原毛利率 */
  originalProfitRate?: number;
  /** 计划编码 */
  planCode?: string;
  /** SKU编码 */
  skuCode?: string;
  /** SPU编码 */
  spuCode?: string;
  /** 开始日期 */
  startDate?: string;
  /**
   * 目标销量
   * @format int32
   */
  targetSales?: number;
}

/** PromotionPlanReviewListReq */
export interface PromotionPlanReviewListReq {
  /** 渠道 */
  channel?: string;
  /** 国家编码 */
  countryCode: string;
  /**
   * 活动结束日期
   * @format date
   */
  endDate: string;
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
  /** SKU编码 */
  skuCode: string;
  /** SPU编码 */
  spuCode: string;
  /**
   * 活动开始日期
   * @format date
   */
  startDate: string;
}

/** PromotionPlanReviewListResp */
export interface PromotionPlanReviewListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  recordList?: PromotionPlanReviewListBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** PromotionPlanReviewReq */
export interface PromotionPlanReviewReq {
  /**
   * 审核状态：1-审核通过 2-已驳回
   * @format int32
   */
  approveStatus: number;
  /** 计划编码列表 */
  planCodes: string[];
}

/** PromotionPlanSkuItem */
export interface PromotionPlanSkuItem {
  /** 活动价 */
  activityPrice?: number;
  /** 活动毛利率 */
  activityProfitRate?: number;
  /** 币种 */
  currency: string;
  /** 折扣率 */
  discountRate?: number;
  /** MSRP */
  msrp?: number;
  /** 原毛利率 */
  originalProfitRate?: number;
  /** SKU编码 */
  skuCode: string;
  /**
   * 目标销量
   * @format int32
   */
  targetSales?: number;
}

/** PurchaseOperatorQueryResp */
export interface PurchaseOperatorQueryResp {
  /** 运营人员列表 */
  memberList?: MemberBean[];
}

/** PurchaseOrderBean */
export interface PurchaseOrderBean {
  /**
   * 已生成mac数量
   * @format int64
   */
  macQty?: number;
  /**
   * 订单行
   * @format int32
   */
  orderLine?: number;
  /** PO采购单编码 */
  poCode?: string;
  /** 供应链sku名称 */
  productName?: string;
  /** 供应链sku */
  productSku?: string;
  /**
   * 订单数量
   * @format int32
   */
  qty?: number;
  /** 供应商代码 */
  supplierCode?: string;
  /** 供应商名称 */
  supplierName?: string;
}

/** PurchaseOrderQueryResp */
export interface PurchaseOrderQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** PO采购订单 */
  purchaseOrderList?: PurchaseOrderBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** QueryLabelReq */
export interface QueryLabelReq {
  /** 标签编码 */
  labelCode: string;
}

/** QueryLabelResp */
export interface QueryLabelResp {
  /** 分类编码 */
  categoryCode?: string;
  /** 分类信息 */
  categoryInfo?: CategoryInfo;
  /** 分组路径 */
  groupPathString?: string;
  /** 标签编码 */
  tagCode?: string;
  /** 标签名称 */
  tagName?: string;
  /** 标签备注 */
  tagRemark?: string;
  /** 标签类型 */
  tagType?: string;
}

/** RelSupplySkuBean */
export interface RelSupplySkuBean {
  /** 供应链名称 */
  productName?: string;
  /** 供应链sku */
  productSku?: string;
  /** 产品spu */
  productSpu?: string;
  /** 供应商编码 */
  supplierCode?: string;
  /** 供应商名称 */
  supplierName?: string;
}

/** SaleSkuBean */
export interface SaleSkuBean {
  /** 渠道 */
  channel?: string;
  /** 渠道名称 */
  channelName?: string;
  /**
   * 首单时间
   * @format date
   */
  firstOrderTime?: string;
  gtin?: string;
  itemId?: string;
  listingStatus?: string;
  /** 店铺SKU（亚马逊） */
  msku?: string;
  /**
   * 上架时间
   * @format date
   */
  openTime?: string;
  /** 运营 */
  operator?: string;
  /** 分组（船长） */
  operatorCapitalGroup?: string;
  /** 运营部门名称 */
  operatorDeptName?: string;
  /** 运营名称 */
  operatorName?: string;
  parentAsin?: string;
  /** 平台 */
  platform?: string;
  /** 备注 */
  remark?: string;
  /** 渠道唯一标识 */
  saleSkuCode?: string;
  /** 销售类型 */
  saleType?: string;
  /** 是否显示按钮(删除/编辑) */
  showBtn?: boolean;
  /** 站点 */
  site?: string;
  /** 站点名称 */
  siteName?: string;
  /** SKU集合 */
  skuRelationList?: SaleSkuRelationBean[];
  /** 来源，枚举值：JJ - 积加；AUTO - 自动创建；手工 - MANUAL */
  source?: string;
  /** 来源，枚举值：JJ - 积加；AUTO - 自动创建；手工 - MANUAL */
  sourceDesc?: string;
  /**
   * 状态
   * @format int32
   */
  status?: number;
  /** 状态描述 */
  statusDesc?: string;
  /**
   * 类型 0-单商品 1-组合商品
   * @format int32
   */
  type?: number;
  /** 类型名称 */
  typeDesc?: string;
  /** 唯一键 */
  uniqueCode?: string;
  upc?: string;
  /** 店铺账户 */
  userAccount?: string;
  wpid?: string;
}

/** SaleSkuDetailExcelBean */
export interface SaleSkuDetailExcelBean {
  asin?: string;
  categoryCodeLevel1?: string;
  categoryCodeLevel2?: string;
  categoryCodeLevel3?: string;
  categoryCodeLevel4?: string;
  categoryCodeLevel5?: string;
  categoryNameLevel1?: string;
  categoryNameLevel2?: string;
  categoryNameLevel3?: string;
  categoryNameLevel4?: string;
  categoryNameLevel5?: string;
  channel?: string;
  firstOrderTime?: string;
  gtin?: string;
  itemId?: string;
  listingStatus?: string;
  operatorCapitalGroup?: string;
  operatorCenter?: string;
  operatorDeptName?: string;
  operatorName?: string;
  parentAsin?: string;
  platform?: string;
  platformSku?: string;
  productLine?: string;
  productLineMarketGroup?: string;
  productLineMarketName?: string;
  productSku?: string;
  shop?: string;
  site?: string;
  skuBrand?: string;
  skuCode?: string;
  skuDeveloperDept?: string;
  skuDeveloperName?: string;
  skuFirstOrderTime?: string;
  skuListingTime?: string;
  skuName?: string;
  skuProportion?: number;
  /** @format int32 */
  skuQty?: number;
  skuSuggestPrice?: number;
  skuSuggestPriceCurrency?: string;
  skuTagFlag?: string;
  spuCode?: string;
  spuName?: string;
  spuProductType?: string;
  typeDesc?: string;
  upc?: string;
  wpid?: string;
}

/** SaleSkuDetailQueryResp */
export interface SaleSkuDetailQueryResp {
  /** 渠道 */
  channel?: string;
  /** 渠道名称 */
  channelName?: string;
  /** 店铺SKU */
  msku?: string;
  /** 渠道唯一标识 */
  saleSkuCode?: string;
  /** 销售类型 */
  saleType?: string;
  /** 销售类型名称 */
  saleTypeName?: string;
  /** 站点 */
  site?: string;
  /** 站点名称 */
  siteName?: string;
  /** 关联商品sku列表 */
  skuRelationList?: SaleSkuRelationBean[];
  /** 店铺账户 */
  userAccount?: string;
}

/** SaleSkuExcelBean */
export interface SaleSkuExcelBean {
  channel?: string;
  msku?: string;
  operatorName?: string;
  productSku?: string;
  saleSkuCode?: string;
  saleType?: string;
  site?: string;
  skuCode?: string;
  /** @format int32 */
  skuQty?: number;
  /** @format int32 */
  type?: number;
  userAccount?: string;
}

/** SaleSkuLogDetailBean */
export interface SaleSkuLogDetailBean {
  /** 内容 */
  content?: string;
  /**
   * 操作时间
   * @format date-time
   */
  createTime?: string;
  /** 操作时间 */
  operationType?: string;
  /** 操作类型 */
  operationTypeDesc?: string;
  /** 操作人 */
  operator?: string;
  /** 操作人名称 */
  operatorName?: string;
  /** 来源 */
  source?: string;
  /** 操作入口 */
  sourceDesc?: string;
  /** 唯一键 */
  uniqueCode?: string;
}

/** SaleSkuLogDetailQueryResp */
export interface SaleSkuLogDetailQueryResp {
  code?: string;
  /** 日志列表 */
  logDetailList?: SaleSkuLogDetailBean[];
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

/** SaleSkuQueryReq */
export interface SaleSkuQueryReq {
  /** 渠道 */
  channel?: string;
  /**
   * 导出类型 1:导出界面信息，2：导出销售映射全表
   * @format int32
   */
  exportType?: number;
  /** 运营人编码 */
  operator?: string;
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
  /** 渠道唯一标识/商品sku/供应链sku */
  saleSkuCode?: string;
  /** 站点 */
  site?: string;
  /** 来源，枚举值：JJ - 积加；ORDER - 订单；手工 - MANUAL */
  source?: string;
  /**
   * 状态 全部-null  0-正常 1-缺失映射 2-忽略 3-已废弃
   * @format int32
   */
  status?: number;
  /** 类型 */
  type?: string;
  /** 唯一键集合 */
  uniqueCodeList?: string[];
  /** 店铺账号 */
  userAccount?: string;
}

/** SaleSkuQueryResp */
export interface SaleSkuQueryResp {
  code?: string;
  message?: string;
  /** 各缺失映射状态统计数量 */
  missStatus?: SalesSkuMissStatusCountBean;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 映射关系列表 */
  saleSkuBeanList?: SaleSkuBean[];
  /** 映射关系导出列表 */
  saleSkuDetailExcelBeanList?: SaleSkuDetailExcelBean[];
  /** 映射关系导出列表 */
  saleSkuExcelBeanList?: SaleSkuExcelBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** SaleSkuRelationBean */
export interface SaleSkuRelationBean {
  /** 币种 */
  currency?: string;
  dimSkuInfoBean?: DimSkuInfoBean;
  /** 建议售价 */
  price?: number;
  /** 商品图片 */
  productImage?: string;
  /** 供应链SKU */
  productSku?: string;
  /**
   * 供应链SKU类型
   * @format int32
   */
  productType?: number;
  /** 商品sku */
  skuCode?: string;
  /** 商品sku名称 */
  skuName?: string;
  /** 费用占比 */
  skuProportion?: number;
  /**
   * 商品SKU数量
   * @format int32
   */
  skuQty?: number;
}

/** SaleSkuRelationMissBean */
export interface SaleSkuRelationMissBean {
  /** 渠道 */
  channel?: string;
  /** 渠道名称 */
  channelName?: string;
  /** 店铺SKU（亚马逊） */
  msku?: string;
  /** 运营人员code */
  operator?: string;
  /** 运营人员名称 */
  operatorName?: string;
  /** 渠道唯一标识 */
  saleSkuCode?: string;
  /** 站点 */
  site?: string;
  /** 站点名称 */
  siteName?: string;
  /** 唯一键 */
  uniqueCode?: string;
  /** 店铺账户 */
  userAccount?: string;
}

/** SaleSkuRelationMissQueryReq */
export interface SaleSkuRelationMissQueryReq {
  /** 渠道 */
  channel?: string;
  /**
   * 是否查询当前运营：0：否 1：是
   * @format int32
   */
  currOperator?: number;
  /** 运营 */
  operator?: string;
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
  /** 渠道唯一标识 */
  saleSkuCode?: string;
  /** 站点 */
  site?: string;
  /**
   * 是否同步下载：0：否 1：是
   * @format int32
   */
  syncExport?: number;
  /** 类型 */
  type?: string;
  /** 唯一键集合 */
  uniqueCodeList?: string[];
  /** 店铺账号 */
  userAccount?: string;
}

/** SaleSkuRelationMissQueryResp */
export interface SaleSkuRelationMissQueryResp {
  code?: string;
  message?: string;
  /** 映射关系缺失列表 */
  missList?: SaleSkuRelationMissBean[];
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

/** SaleSkuSaveReq */
export interface SaleSkuSaveReq {
  /** 渠道 */
  channel?: string;
  /**
   * 自定义店铺SKU 1:自定义 2:系统自动生成
   * @format int32
   */
  customizeSaleSku?: number;
  /**
   * 是否导入保存
   * @format int32
   */
  isImport?: number;
  /** 店铺SKU(亚马逊) */
  msku?: string;
  /** 运营 */
  operator?: string;
  /** 渠道唯一标识 */
  saleSkuCode?: string;
  /** 主销/跟卖 */
  saleType?: string;
  /** 站点 */
  site?: string;
  /** sku列表 */
  skuList?: SaleSkuRelationBean[];
  /**
   * 类型
   * @format int32
   */
  type?: number;
  /** 唯一键 */
  uniqueCode?: string;
  /** 店铺账号 */
  userAccount?: string;
}

/** SaleSkuSaveResp */
export interface SaleSkuSaveResp {
  /** 渠道唯一标识 */
  saleSkuCode?: string;
}

/** SaleSkuSourcelQueryResp */
export interface SaleSkuSourcelQueryResp {
  /** 数据来源 */
  sourceList?: DictCommonBean[];
}

/** SalesSkuMissStatusCountBean */
export interface SalesSkuMissStatusCountBean {
  /**
   * 所有状态数量
   * @format int64
   */
  allCount?: number;
  /**
   * 正常状态数量
   * @format int64
   */
  commonCount?: number;
  /**
   * 已废弃状态数量
   * @format int64
   */
  endCount?: number;
  /**
   * 忽略状态数量
   * @format int64
   */
  ignoreCount?: number;
  /**
   * 缺失状态数量
   * @format int64
   */
  missCount?: number;
}

/** SensitiveTypeBean */
export interface SensitiveTypeBean {
  /**
   * 商品数量
   * @format int64
   */
  productCount?: number;
  /** 敏感类型商品SPU */
  productSpus?: string;
  /** 敏感类型编码 */
  sensitiveTypeCode?: string;
  /** 敏感类型名称 */
  sensitiveTypeName?: string;
  /** 敏感类型备注 */
  sensitiveTypeRemark?: string;
  /** 敏感类型简码 */
  sensitiveTypeSimpleCode?: string;
}

/** SensitiveTypeDetailResp */
export interface SensitiveTypeDetailResp {
  /** 关联商品信息集合 */
  productBeanList?: ProductBean[];
  /** 敏感类型详情信息 */
  sensitiveTypeBean?: SensitiveTypeBean;
}

/** SensitiveTypeListQueryReq */
export interface SensitiveTypeListQueryReq {
  /** 勾选导出的编码 */
  codeList?: string[];
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
  /** 敏感类型编号 */
  sensitiveTypeCode?: string;
  /** 敏感类型名称 */
  sensitiveTypeName?: string;
  /** 敏感类型简码 */
  sensitiveTypeSimpleCode?: string;
}

/** SensitiveTypeListQueryResp */
export interface SensitiveTypeListQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 敏感类型列表 */
  sensitiveTypeBeanList?: SensitiveTypeBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** SensitiveTypeOperateReq */
export interface SensitiveTypeOperateReq {
  /**
   * 操作类型 1:删除删除敏感类型 2：删除敏感类型与商品的关联
   * @format int32
   */
  operateType?: number;
  /** 商品Spu，删除关联时必传 */
  productSpu?: string;
  /** 敏感类型编码 */
  sensitiveTypeCode?: string;
}

/** SensitiveTypeProductConnectReq */
export interface SensitiveTypeProductConnectReq {
  /** 商品sku集合 */
  productSpuList?: string[];
  /** 敏感类型编码 */
  sensitiveTypeCode?: string;
}

/** SensitiveTypeSaveReq */
export interface SensitiveTypeSaveReq {
  /** 商品sku集合 */
  productSpuList?: string[];
  /** 敏感类型编码 */
  sensitiveTypeCode?: string;
  /** 敏感类型名称 */
  sensitiveTypeName?: string;
  /** 敏感类型备注 */
  sensitiveTypeRemark?: string;
  /** 敏感类型简码 */
  sensitiveTypeSimpleCode?: string;
}

/** SensitiveTypeSaveResp */
export interface SensitiveTypeSaveResp {
  /** 敏感类型编码 */
  sensitiveTypeCode?: string;
}

/** SeriesBean */
export interface SeriesBean {
  /**
   * 商品数量
   * @format int64
   */
  productCount?: number;
  /** 系列编码 */
  seriesCode?: string;
  /** 系列名称 */
  seriesName?: string;
  /** 系列备注 */
  seriesRemark?: string;
}

/** SeriesDetailResp */
export interface SeriesDetailResp {
  /** 关联商品信息集合 */
  productBeanList?: ProductBean[];
  /** 系列详情信息 */
  seriesBean?: SeriesBean;
}

/** SeriesListQueryReq */
export interface SeriesListQueryReq {
  /** 勾选导出的编码 */
  codeList?: string[];
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
  /** 系列编号 */
  seriesCode?: string;
  /** 系列名称 */
  seriesName?: string;
}

/** SeriesListQueryResp */
export interface SeriesListQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 系列列表 */
  seriesBeanList?: SeriesBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** SeriesOperateReq */
export interface SeriesOperateReq {
  /**
   * 操作类型 1:删除删除系列 2：删除系列与商品的关联
   * @format int32
   */
  operateType?: number;
  /** 商品Spu，删除关联时必传 */
  productSpu?: string;
  /** 系列编码 */
  seriesCode?: string;
}

/** SeriesProductConnectReq */
export interface SeriesProductConnectReq {
  /** 商品sku集合 */
  productSpuList?: string[];
  /** 系列编码 */
  seriesCode?: string;
}

/** SeriesSaveReq */
export interface SeriesSaveReq {
  /** 商品sku集合 */
  productSpuList?: string[];
  /** 系列编码 */
  seriesCode?: string;
  /** 系列名称 */
  seriesName?: string;
  /** 系列备注 */
  seriesRemark?: string;
}

/** SeriesSaveResp */
export interface SeriesSaveResp {
  /** 系列编码 */
  seriesCode?: string;
}

/** ShopUserAccountListResp */
export interface ShopUserAccountListResp {
  /** 店铺账号集合 */
  userAccountList?: string[];
}

/** ShopUserAccountResp */
export interface ShopUserAccountResp {
  /** 店铺账号 */
  userAccount?: string;
}

/** ShopifyBatchOperatorSaveReq */
export interface ShopifyBatchOperatorSaveReq {
  operators?: OperatorConfig[];
  /** Shopify在线商品唯一键 */
  variantIds?: number[];
}

/** ShopifyListingParentResp */
export interface ShopifyListingParentResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** shopify父维度商品列表 */
  resultList?: ShopifyParentBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** ShopifyListingReq */
export interface ShopifyListingReq {
  /** ERP站点 */
  erpSite?: string;
  /** 进行了销量预测的数据 */
  filterSalesforecast?: boolean;
  /** ProductId/variantId/MSKU */
  keyword?: string;
  /** 型号 */
  modelCode?: string;
  /** MSKU */
  msku?: string;
  /** 运营计划列表 */
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
  /** 产品线 */
  productLineCode?: string;
  /** ProductId/variantId */
  pvId?: string;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 店铺列表 */
  shopList?: string[];
  /** 站点列表 */
  siteList?: string[];
  /** sku列表 */
  skuCodeList?: string[];
  /** 状态列表 active-在售 draft-草稿 */
  statusList?: string[];
  /** 标签列表 */
  tagList?: string[];
  /** 三级分类编码 */
  thirdCategoryCode?: string;
}

/** ShopifyOperatorBean */
export interface ShopifyOperatorBean {
  /** 运营人员编码 */
  operator?: string;
  /** 运营人员姓名 */
  operatorName?: string;
}

/** ShopifyOperatorSaveReq */
export interface ShopifyOperatorSaveReq {
  /** msku */
  msku?: string;
  operators?: OperatorConfig[];
  /** 店铺 */
  shop?: string;
  /**
   * Shopify在线商品唯一键
   * @format int64
   */
  variantId?: number;
}

/** ShopifyParentBean */
export interface ShopifyParentBean {
  /** 商品图片 */
  imageUrl?: string;
  /** MSKU */
  mskuList?: string[];
  /**
   * 新/老品
   * @uniqueItems true
   */
  newOldProductList?: string[];
  /** 运营人员列表 */
  operatorList?: ShopifyOperatorBean[];
  /** ProductId */
  productId?: string;
  /** 商品名称 */
  productTitle?: string;
  /** 店铺 */
  shop?: string;
  /** 站点 */
  site?: string;
  /** 父状态 draf:草稿 active:在售 */
  status?: string;
  /** 父状态描述 */
  statusDesc?: string;
  /** 状态列表 */
  statusList?: ShopifyStatusBean[];
  /** 标签列表 */
  tagList?: ListingTagBean[];
  /** Variant ID */
  variantList?: string[];
}

/** ShopifyProductListingBean */
export interface ShopifyProductListingBean {
  /** 渠道 */
  channel?: string;
  /** 渠道名称 */
  channelName?: string;
  /** 国家 */
  countryCode?: string;
  /** 国家名称 */
  countryName?: string;
  /** 商品当前价格 */
  currPrice?: number;
  /** 商品当前价格币种 */
  currency?: string;
  /**
   * 最近15销量
   * @format int32
   */
  day15Sales?: number;
  /**
   * 最近30销量
   * @format int32
   */
  day30Sales?: number;
  /**
   * 最近7销量
   * @format int32
   */
  day7Sales?: number;
  /**
   * 推广首单日期
   * @format date
   */
  firstOrderTime?: string;
  /** 商品图片 */
  imageUrl?: string;
  /**
   * 是否缺失映射 0-不缺少 1-缺少
   * @format int32
   */
  missingMapping?: number;
  /** MSKU */
  msku?: string;
  /** msrp价格 */
  msrpList?: MsrpBean[];
  /** 运营人员编码 */
  operatorCode?: string;
  /** 运营人员列表 */
  operatorList?: ShopifyProductOperatorBean[];
  /** 运营人员名称 */
  operatorName?: string;
  /** 价格 */
  price?: number;
  /** ProductId */
  productId?: string;
  /** 监控链接 */
  productLink?: string;
  /** 产品信息集合 */
  productSkuList?: ProductSkuBaseBean[];
  /** 商品名称 */
  productTitle?: string;
  /**
   * 发布时间
   * @format date-time
   */
  publishTime?: string;
  /** 店铺 */
  shop?: string;
  /** 站点 */
  site?: string;
  /** 站点名称 */
  siteName?: string;
  /** 产品SKU(已去重) */
  skuCodeList?: string[];
  /** 父状态 draf:草稿 active:在售 */
  status?: string;
  /** 父状态描述 */
  statusDesc?: string;
  /** 标签列表 */
  tagList?: ListingTagBean[];
  /** Variant ID */
  variantId?: string;
}

/** ShopifyProductListingReq */
export interface ShopifyProductListingReq {
  /** 国家列表 */
  countryCodeList?: string[];
  /** ProductId/variantId/MSKU */
  keyword?: string;
  /** 运营计划列表 */
  operatorIdList?: string[];
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
  /** 店铺列表 */
  shopList?: string[];
  /** 站点列表 */
  siteList?: string[];
  /** 状态列表 active-在售 draft-草稿 */
  status?: string;
  /** 标签列表 */
  tagList?: string[];
}

/** ShopifyProductListingResp */
export interface ShopifyProductListingResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** shopify商品列表 */
  resultList?: ShopifyProductListingBean[];
  /** 状态数量列表 */
  statusCountBean?: StatusCountBean;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** ShopifyProductOperatorBean */
export interface ShopifyProductOperatorBean {
  operatorCode?: string;
  operatorName?: string;
  site?: string;
  /** 产品SKU */
  skuCode?: string;
}

/** ShopifySonListingResp */
export interface ShopifySonListingResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 子维度商品列表 */
  resultList?: SonBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** ShopifyStatusBean */
export interface ShopifyStatusBean {
  /** 商品状态 */
  status?: string;
  /** 商品状态描述 */
  statusDesc?: string;
}

/** SkuActiveDiscountPlanAddReq */
export interface SkuActiveDiscountPlanAddReq {
  /** 唯一键 */
  code: string;
  /** gtm组 */
  gtm: string;
  /** 运营 */
  operator: string;
  /** 父code */
  parentCode: string;
  /** 对应周销售额数据 */
  weekSaleInfoList?: WeekSaleSaveInfo[];
}

/** SkuActiveDiscountPlanQueryResp */
export interface SkuActiveDiscountPlanQueryResp {
  /** 渠道 */
  channel?: string;
  /** 渠道名称 */
  channelDesc?: string;
  /** 唯一键 */
  code?: string;
  /** 国家 */
  countryCode?: string;
  /** 国家名称 */
  countryDesc?: string;
  /** 币种 */
  currency?: string;
  /** GTM组 */
  gtm?: string;
  /** 运营 */
  operator?: string;
  /** 运营名称 */
  operatorName?: string;
  /**
   * 产品类型
   * @format int32
   */
  productType?: number;
  /** spu的msrp价格 */
  salePriceStr?: string;
  /** sku编码 */
  skuCode?: string;
  /** spu名称 */
  skuName?: string;
  /** sku的msrp价格 */
  skuSalePrice?: number;
  /** spu编码 */
  spuCode?: string;
  /** spu名称 */
  spuName?: string;
  /** 对应周销售额数据 */
  weekSaleInfoList?: WeekSaleInfo[];
}

/** SkuClearanceSimpleBean */
export interface SkuClearanceSimpleBean {
  /** 清关唯一编码 */
  clearanceCode?: string;
  /** 国家编码 */
  countryCodeList?: string[];
  /** 国家名称 */
  countryNames?: string;
  /** 清关-进口海关编码 */
  hsImportCode?: string;
  /** 清关-进口申报价值币种 */
  hsImportCurrency?: string;
  /** 清关-进口申报价值币种描述 */
  hsImportCurrencyDesc?: string;
  /** 清关-进口申报价值 */
  hsImportPrice?: number;
  /** 清关-海关税率 */
  hsTariffRate?: number;
  /** 供应链sku编码 */
  productSku?: string;
  /** sku编码 */
  skuCode?: string;
}

/** SkuDeclareSimpleBean */
export interface SkuDeclareSimpleBean {
  /** 申报信息：申报编码 */
  declareCode?: string;
  /** 报关-出口申报价值币种 */
  declareCurrency?: string;
  /** 报关-报关申请要素 */
  declareElement?: string;
  /** 申报说明 */
  declareExplain?: string;
  /** 申报信息：申报品名CN */
  declareName?: string;
  /** 申报信息：申报品名EN */
  declareNameEn?: string;
  /** 报关-出口申报价值 */
  declarePrice?: number;
  /**
   * 海关属性
   * @format int32
   */
  hsAttr?: number;
  /** 海关属性描述 */
  hsAttrDesc?: string;
  /** 报关-出口海关编码 */
  hsCode?: string;
  /** 清关-中文材质 */
  productMaterialIngredient?: string;
  /** 清关-英文材质 */
  productMaterialIngredientEn?: string;
  /** 供应链sku编码 */
  productSku?: string;
  /** sku编码 */
  skuCode?: string;
  /** 征免 */
  taxExemption?: string;
  /** 征免描述 */
  taxExemptionDesc?: string;
  /** 境内货源地 */
  territoryGoods?: string;
  /** 报关-成交单位 */
  transactionUnit?: string;
  /** 清关-中文用途 */
  useCn?: string;
  /** 清关-英文用途 */
  useEn?: string;
}

/** SkuInfoBean */
export interface SkuInfoBean {
  /** 适用周期 */
  applicablePeriod?: string;
  /** 彩盒内的所有产品以及配件 */
  colorBoxContents?: string;
  /** EAN13码 */
  ean13?: string;
  /** EAN14码 */
  ean14?: string;
  /** 型号 */
  modelCode?: string;
  /** 型号名称 */
  modelName?: string;
  /** 在线完整产品规格 */
  onlineFullProductSpecs?: string;
  /** 线上产品全称 */
  onlineProductFullName?: string;
  /** 图片列表 */
  productImageList?: string[];
  /** 首张图片 */
  productImageUrl?: string;
  /** 名称CN */
  productTitle?: string;
  /** 卖点 */
  sellingPoint?: string;
  /** 商品中心 唯一编码 */
  skuCode?: string;
  /** sn码 */
  snCode?: string;
  /**
   * 状态 1-未上架 2-在销售 3-清仓中 4-已退市
   * @format int32
   */
  state?: number;
  /** 状态描述 1-未上架 2-在销售 3-清仓中 4-已退市 */
  stateDesc?: string;
  /** 建议销售价格 */
  suggestPrice?: number;
  /** 建议销售价格币种 */
  suggestPriceCurrencyCode?: string;
}

/** SkuPromotionPlanListBean */
export interface SkuPromotionPlanListBean {
  /** 渠道 */
  channel?: string;
  /** 编码 */
  code?: string;
  /** 国家编码 */
  countryCode?: string;
  /** 币种 */
  currency?: string;
  /** GTM组名称 */
  gtmName?: string;
  /** MSRP */
  msrp?: number;
  /** SKU编码 */
  skuCode?: string;
  /** SKU名称 */
  skuName?: string;
  /** spu编码 */
  spuCode?: string;
  /** spu名称 */
  spuName?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /** 对应周活动数据 */
  weekActivityInfoList?: WeekActivityInfoBean[];
}

/** SkuSnListBean */
export interface SkuSnListBean {
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建者 */
  creator?: string;
  /** 创建者名称 */
  creatorName?: string;
  /** @format int64 */
  id?: number;
  /** 产品SPU名称 */
  productName?: string;
  /** 商品SPU */
  productSpu?: string;
  /** 商品skuCode */
  skuCode?: string;
  /** 产品SKU名称 */
  skuName?: string;
  /** SN码（产品代码） */
  snCode?: string;
  /** 供应商代码 */
  supplierCode?: string;
  /** 供应商名称 */
  supplierName?: string;
}

/** SkuSnQueryReq */
export interface SkuSnQueryReq {
  /** 产品SKU名称/产品SKU/产品SPU */
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
  /** SN码 */
  snCode?: string;
  supplierCode?: string;
}

/** SkuSnQueryResp */
export interface SkuSnQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 商品供应商信息 */
  skuSnList?: SkuSnListBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** SkuSnSaveReq */
export interface SkuSnSaveReq {
  /** 产品SKU */
  skuCodeList: string[];
  /** 供应商代码 */
  supplierCode: string;
}

/** SmaSkuQueryListReq */
export interface SmaSkuQueryListReq {
  /** 分类编码集合 */
  categoryCodeList?: string[];
  /** 渠道 */
  channel?: string;
  /** 国家集合 */
  countryList?: string[];
  /** 过滤掉选择过的数据 */
  filterSelected?: boolean;
  /** 商品sku/渠道唯一标识/产品名称 */
  keyword?: string;
  /** 型号 */
  modelCode?: string;
  /** 未映射 */
  noMapping?: boolean;
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
  /** 产品线 */
  productLine?: string;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  salesforecstCode?: string;
  /** 站点 */
  site?: string;
  /** skuCode集合 */
  skuCodeList?: string[];
  /**
   * 状态 1-未上架 2-在销售 3-清仓中 4-已退市
   * @format int32
   */
  state?: number;
  /** 三级分类编码 */
  thirdCategoryCode?: string;
}

/** SmaSkuQueryListResp */
export interface SmaSkuQueryListResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  recordList?: SmaSkuQueryListRespItem[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** SmaSkuQueryListRespItem */
export interface SmaSkuQueryListRespItem {
  /** 品牌编码 */
  brandCode?: string;
  /** 品牌名称 */
  brandName?: string;
  /** 分类编码 */
  categoryCode?: string;
  /** 分类 */
  categoryName?: string;
  /** 渠道 */
  channel?: string;
  /** 渠道 */
  channelDesc?: string;
  /** 国家 */
  country?: string;
  /** 型号 */
  modelCode?: string;
  /** 型号 */
  modelName?: string;
  /** 产品图片 */
  productImageUrl?: string;
  /** 产品线 */
  productLine?: string;
  /** 产品线 */
  productLineName?: string;
  /** 产品spu */
  productSpu?: string;
  /** 产品标题 */
  productTitle?: string;
  /** 站点 */
  site?: string;
  /** sku编码 */
  skuCode?: string;
  /**
   * 状态 1-未上架 2-在销售 3-清仓中 4-已退市
   * @format int32
   */
  state?: number;
  /** 状态 1-未上架 2-在销售 3-清仓中 4-已退市 */
  stateDesc?: string;
  /** 三级分类编码 */
  thirdCategoryCode?: string;
  /** 三级分类 */
  thirdCategoryName?: string;
}

/** SonBean */
export interface SonBean {
  /** 分类编码 */
  categoryCode?: string;
  /** 分类名称 */
  categoryName?: string;
  /** ERP站点 */
  erpSite?: string;
  /** gtin */
  gtin?: string;
  /** 商品图片 */
  imageUrl?: string;
  /** ItemId */
  itemId?: string;
  /** 型号 */
  modelCode?: string;
  /** 型号名字 */
  modelName?: string;
  /** msku */
  msku?: string;
  /** 新/老品 */
  newOldProduct?: string;
  /** 运营人员编码 */
  operator?: string;
  /** 运营人员名称 */
  operatorName?: string;
  /** 产品线 */
  productLineCode?: string;
  /** 品线名字 */
  productLineName?: string;
  /** 商品链接 */
  productLink?: string;
  /** 商品名称 */
  productTitle?: string;
  /** 店铺 */
  shop?: string;
  /** 站点 */
  site?: string;
  /** sku编码 */
  skuCode?: string;
  /** spu编码 */
  spuCode?: string;
  /** 父状态 RETIRED:草稿 ACTIVE:在售 ARCHIVED:归档 */
  status?: string;
  /** 商品状态描述 */
  statusDesc?: string;
  /** 标签列表 */
  tagList?: ListingTagBean[];
  /** 三级分类编码 */
  thirdCategoryCode?: string;
  /** 三级分类名称 */
  thirdCategoryName?: string;
  /** upc */
  upc?: string;
  /** WPID */
  wpId?: string;
}

/** SpuPromotionPlanListBean */
export interface SpuPromotionPlanListBean {
  /** 渠道 */
  channel?: string;
  /** 编码 */
  code?: string;
  /** 国家编码 */
  countryCode?: string;
  /** 币种 */
  currency?: string;
  /** GTM组名称 */
  gtmName?: string;
  /** MSRP */
  msrp?: number;
  /** SKU编码 */
  skuCode?: string;
  /** SKU名称 */
  skuName?: string;
  /** spu编码 */
  spuCode?: string;
  /** spu名称 */
  spuName?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /** 对应周活动数据 */
  weekActivityInfoList?: WeekActivityInfoBean[];
}

/** StatisticsInfo */
export interface StatisticsInfo {
  /**
   * 总数
   * @format int64
   */
  all?: number;
  /**
   * 已关联
   * @format int64
   */
  mapping?: number;
  /**
   * 未关联
   * @format int64
   */
  notMapping?: number;
}

/** StatusCountBean */
export interface StatusCountBean {
  /**
   * 在售状态数量
   * @format int64
   */
  activeCount?: number;
  /**
   * 所有状态数量
   * @format int64
   */
  allCount?: number;
  /**
   * 归档状态数量
   * @format int64
   */
  archivedCount?: number;
  /**
   * 未知状态数量
   * @format int64
   */
  errorCount?: number;
  /**
   * 草稿状态数量
   * @format int64
   */
  retiredCount?: number;
}

/** SupplierBaseBean */
export interface SupplierBaseBean {
  /** 供应商编码 */
  supplierCode?: string;
  /** 供应商名称 */
  supplierName?: string;
}

/** SupplierSkuBean */
export interface SupplierSkuBean {
  /** 五级分类名称 */
  categoryName?: string;
  /** 分类名称多级 */
  categoryNames?: string;
  /** 币种 */
  currency?: string;
  /** 建议售价 */
  price?: number;
  /** 商品图片 */
  productImageUrl?: string;
  /** 供应链SKU编码 */
  productSku?: string;
  /** 商品spu编码 */
  productSpu?: string;
  /** 商品名称 */
  productTitle?: string;
  /** 商品sku编码 */
  skuCode?: string;
}

/** SupplierSkuListQueryResp */
export interface SupplierSkuListQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  supplierSkuList?: SupplierSkuBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** SupplyPurchaserResp */
export interface SupplyPurchaserResp {
  /** 采购员信息 */
  memberList?: MemberSimpleBean[];
}

/** SupplySkuClearanceBean */
export interface SupplySkuClearanceBean {
  /** 唯一编码 */
  clearanceCode?: string;
  /** 国家 */
  countryCodeList?: string[];
  /** 国家名称 */
  countryName?: string;
  /** 国家名称 */
  countryNames?: string;
  /** 清关-进口海关编码 */
  hsImportCode?: string;
  /** 清关-进口申报价值币种 */
  hsImportCurrency?: string;
  /** 清关-进口申报价值币种描述 */
  hsImportCurrencyDesc?: string;
  /** 清关-进口申报价值 */
  hsImportPrice?: number;
  /** 海关税率 */
  hsTariffRate?: number;
  /** 供应链sku编码 */
  productSku?: string;
  /** 商品SPU代码 */
  productSpu?: string;
  /** 商品sku编码 */
  skuCode?: string;
}

/** SupplySkuCommonResp */
export interface SupplySkuCommonResp {
  /** 供应链SKU */
  productSku?: string;
}

/** SupplySkuDeclareBean */
export interface SupplySkuDeclareBean {
  /** 报关-出口申报价值币种 */
  declareCurrency?: string;
  /** 报关申报要素 */
  declareElement?: string;
  /** 申报说明 */
  declareExplain?: string;
  /** 申报品名CN */
  declareName?: string;
  /** 申报品名EN */
  declareNameEn?: string;
  /** 报关-出口申报价值 */
  declarePrice?: number;
  /**
   * 海关属性
   * @format int32
   */
  hsAttr?: number;
  /** 海关属性描述 */
  hsAttrDesc?: string;
  /** 出口海关编码 */
  hsCode?: string;
  /** 中文材质 */
  productIngredient?: string;
  /** 英文材质 */
  productIngredientEn?: string;
  /** 供应链SKU */
  productSku?: string;
  /** 商品SPU代码 */
  productSpu?: string;
  /** 商品SKU编码 */
  skuCode?: string;
  /** 征免 */
  taxExemption?: string;
  /** 征免描述 */
  taxExemptionDesc?: string;
  /** 境内货源地 */
  territoryGoods?: string;
  /** 成交单位 */
  transactionUnit?: string;
  /** 中文用途 */
  useCn?: string;
  /** 英文用途 */
  useEn?: string;
}

/** SupplySkuDetailResp */
export interface SupplySkuDetailResp {
  /** 电池信息 */
  batteryInfo?: ProductSkuBatteryBean;
  /** 品牌代码 */
  brandCode?: string;
  /** 品牌名称 */
  brandName?: string;
  /** 认证信息 */
  certificationInfo?: ProductSkuCertificationBean;
  /** 渠道资料信息 */
  channelInfo?: ProductSkuChannelBean;
  /** 清关信息 */
  clearanceInfoList?: SupplySkuClearanceBean[];
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /** 创建人 */
  creatorName?: string;
  /** 报关信息 */
  declareInfo?: SupplySkuDeclareBean;
  /**
   * 开发时间
   * @format date-time
   */
  developTime?: string;
  /**
   * 保质期（天数）⾮必填
   * @format int32
   */
  expDay?: number;
  /** 采购信息 */
  financeInfo?: SupplySkuFinanceBean;
  /** 硬件参数信息 */
  hardwareParamInfo?: ProductSkuHardwareParamBean;
  /**
   * id
   * @format int64
   */
  id?: number;
  /**
   * 是否存在有效期 1-存在 0-不存在
   * @format int32
   */
  isExpDate?: number;
  /**
   * 上架时间
   * @format date-time
   */
  listingTime?: string;
  /** 更新人 */
  operator?: string;
  /** 更新人 */
  operatorName?: string;
  /** 检索SKU */
  primarySku?: string;
  /**
   * 产品创建时间
   * @format date-time
   */
  productCreateTime?: string;
  /** 图片链接 */
  productImageList?: string[];
  /** 商品sku信息 */
  productInfo?: SkuInfoBean;
  /** 供应链SKU */
  productSku?: string;
  /** 新供应链SKU */
  productSkuNew?: string;
  /** 商品SPU代码 */
  productSpu?: string;
  /**
   * 产品状态: 0:不可用,1:可用,2:开发产品
   * @format int32
   */
  productStatus?: number;
  /** 名称CN */
  productTitle?: string;
  /** 名称EN */
  productTitleEn?: string;
  /**
   * 商品类型 1：产品；2：物料
   * @format int32
   */
  productType?: number;
  /** 商品类型描述 */
  productTypeDesc?: string;
  /**
   * 产品更新时间
   * @format date-time
   */
  productUpdateTime?: string;
  /** 采购信息 */
  purchaseInfo?: SupplySkuPurchaseBean;
  /** 产品回收信息 */
  recycleInfo?: ProductSkuRecycleBean;
  /**
   * 销售状态
   * @format int32
   */
  saleStatus?: number;
  /** 装运信息 */
  shipmentInfo?: ProductSkuShipmentBean;
  /** 商品中心 唯一编码 */
  skuCode?: string;
  /** 规格信息 */
  specInfo?: SupplySkuSpecBean;
  /** 建议售价 */
  suggestPrice?: number;
  /** 建议售价币种 */
  suggestPriceCurrency?: string;
  /** 供应商品号 */
  supplierSku?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /** 仓库条码 */
  warehouseBarcode?: string;
  /** 质保信息 */
  warrantyInfo?: ProductSkuWarrantyBean;
}

/** SupplySkuFinanceBean */
export interface SupplySkuFinanceBean {
  /** 费用归属人Code */
  costMemberCode?: string;
  /** 费用归属人名称 */
  costMemberName?: string;
  /** 费用归属品线 */
  costProductLine?: string;
  /** 费用归属SPU名称 */
  costProductName?: string;
  /** 费用归属SPU */
  costProductSpu?: string;
  /** 分类信息 */
  productCategory?: ProductCategoryBean;
  /** 费用归属品线名称 */
  productLineName?: string;
}

/** SupplySkuListBean */
export interface SupplySkuListBean {
  /** 箱规-高(外箱) */
  cartonHeight?: number;
  /** 箱规-长(外箱) */
  cartonLength?: number;
  /**
   * 箱规-单箱数量
   * @format int32
   */
  cartonNum?: number;
  /**  箱规-单项重量 */
  cartonWeight?: number;
  /** 箱规-宽(外箱) */
  cartonWidth?: number;
  /**
   * 中仓库存
   * @format int32
   */
  centerInventory?: number;
  /** 费用归属人名称 */
  costMemberName?: string;
  /** 费用归属品线名称 */
  costProductLineDesc?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creator?: string;
  /** 创建人 */
  creatorName?: string;
  declareCurrency?: string;
  declareElement?: string;
  declareExplain?: string;
  /** 中文报关品名（必填） */
  declareName?: string;
  /** 英文报关品名（必填） */
  declareNameEn?: string;
  declarePrice?: number;
  /**
   * 是否默认供应链SKU 1-默认 0-非默认
   * @format int32
   */
  defaultPurchase?: number;
  hsAttr?: string;
  hsCode?: string;
  hsImportCode?: string;
  /** 进口申报币种 */
  hsImportCurrency?: string;
  /** 进口申报价值（必填） */
  hsImportPrice?: number;
  /** @format double */
  hsTariffRate?: number;
  /**
   * 库存数
   * @format int32
   */
  inventory?: number;
  /** 物流属性 */
  logisticAttribute?: string;
  /** 最小订单数量 */
  minQuantity?: number;
  /** 更新人 */
  operator?: string;
  /** 更新人 */
  operatorName?: string;
  /**
   * 海外仓库存
   * @format int32
   */
  overseasInventory?: number;
  /** 计划专员 */
  planner?: string;
  /** 计划专员 */
  plannerName?: string;
  /** 包装尺寸（高）（必填） */
  productHeight?: number;
  /** 首张图片 */
  productImage?: string;
  /** 图片列表 */
  productImageList?: string[];
  /** 包装尺寸（长）（必填） */
  productLength?: number;
  productMaterialIngredient?: string;
  productMaterialIngredientEn?: string;
  /** 规格信息：产品净高度 */
  productNetHeight?: number;
  /** 规格信息：产品净长度 */
  productNetLength?: number;
  /** 规格信息：产品净重 */
  productNetWeight?: number;
  /** 规格信息：产品净宽度 */
  productNetWidth?: number;
  /** 供应链SKU */
  productSku?: string;
  /** 供应链SKU NEW */
  productSkuNew?: string;
  /** 商品SPU代码 */
  productSpu?: string;
  /**
   * 产品状态: 0:不可用,1:可用,2:开发产品
   * @format int32
   */
  productStatus?: number;
  /** 名称CN */
  productTitle?: string;
  /** 名称CN */
  productTitleEn?: string;
  /**
   * 商品类型 1：产品；2：物料
   * @format int32
   */
  productType?: number;
  /** 商品链接 */
  productUrl?: string;
  /** 毛重（必填） */
  productWeight?: number;
  /** 包装尺寸（宽）（必填） */
  productWidth?: number;
  /** 采购币种 */
  purchaseCurrencyCode?: string;
  /** 采购单价 */
  purchasePrice?: number;
  /** 执行采购（成员编码） */
  purchaser?: string;
  /** 执行采购（姓名） */
  purchaserName?: string;
  /**
   * 销售状态
   * @format int32
   */
  saleStatus?: number;
  /** 商品中心 唯一编码 */
  skuCode?: string;
  /** 标准LT */
  standardLT?: string;
  /** 战略采购（成员编码） */
  strategicPurchaser?: string;
  /** 战略采购（姓名） */
  strategicPurchaserName?: string;
  /** 供应商编码 */
  supplierCode?: string;
  /** 供应商名称 */
  supplierName?: string;
  taxExemption?: string;
  territoryGoods?: string;
  transactionUnit?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  useCn?: string;
  useEn?: string;
}

/** SupplySkuListQueryReq */
export interface SupplySkuListQueryReq {
  /** 国家编码 */
  countryCode?: string;
  /** 发货方法 1-FBA 2-中仓直发 3-海外仓直发 */
  deliveryCode?: string;
  /**
   * 导出文件类型。1： 供应链SKU产品类型所有信息；2：其他类型供应链SKU信息导出
   * @format int32
   */
  exportType?: number;
  /** 关键字 供应链产品名称/SKU */
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
  /** 排除供应链sku */
  productSkuList?: string[];
  /**
   * 产品状态: 0:不可用,1:可用,2:开发产品
   * @format int32
   */
  productStatus?: number;
  /**
   * 产品类型 1：产品；2：物料 3：用研产品
   * @format int32
   */
  productType?: number;
  /** 产品类型集合 */
  productTypeList?: number[];
  /** 采购人 */
  purchaser?: string;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /**
   * 销售状态
   * @format int32
   */
  saleStatus?: number;
  /** 是否查询库存 */
  searchInventory?: boolean;
  /** 供应商代码 */
  supplierCode?: string;
  /** 供应商代码集合 */
  supplierCodeList?: string[];
  /** 排除产品类型 */
  unProductTypeList?: number[];
}

/** SupplySkuListQueryResp */
export interface SupplySkuListQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 列表 */
  supplySkuList?: SupplySkuListBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** SupplySkuOperateReq */
export interface SupplySkuOperateReq {
  /**
   * 操作类型 1-默认供应商
   * @format int32
   */
  operateType?: number;
  /** 供应链SKU */
  productSku?: string;
}

/** SupplySkuPerfectionQueryResp */
export interface SupplySkuPerfectionQueryResp {
  /** 报关/清关完善度 */
  skuDeclarePerfectionBean?: ProductInfoPerfectionBean;
  /** SKU完善度 */
  skuPerfectionBean?: ProductInfoPerfectionBean;
  /** 采购信息完善度 */
  skuPurchasePerfectionBean?: ProductInfoPerfectionBean;
  /** 规格包装信息完善度 */
  skuSpecPerfectionBean?: ProductInfoPerfectionBean;
}

/** SupplySkuPurchaseBean */
export interface SupplySkuPurchaseBean {
  /** 采购币种 */
  currencyCode?: string;
  /**
   * 是否默认采购 0-否 1-是
   * @format int32
   */
  defaultPurchase?: number;
  /** FOB交货提前期 */
  fobDeliveryLeadTime?: string;
  /** FOB最小起订量 */
  fobSkuOrderMin?: string;
  /** 最小订单数量 */
  minQuantity?: number;
  /** 最小起订箱数 */
  orderMinBoxNum?: string;
  /** 最小起订类型 */
  orderMinBoxType?: string;
  /** 计划专员 */
  plannerName?: string;
  /** 供应链SKU */
  productSku?: string;
  /** 采购单价 */
  purchasePrice?: number;
  /** 执行采购（成员编码） */
  purchaser?: string;
  /** 执行采购（姓名） */
  purchaserName?: string;
  /** 标准LT */
  standardLT?: string;
  /** 战略采购（成员编码） */
  strategicPurchaser?: string;
  /** 战略采购（姓名） */
  strategicPurchaserName?: string;
  /** 供应商代码 */
  supplierCode?: string;
  /** 供应商名称 */
  supplierName?: string;
}

/** SupplySkuPurchaseSaveReq */
export interface SupplySkuPurchaseSaveReq {
  /** 采购币种 */
  currencyCode?: string;
  /** 采购单价 */
  purchasePrice?: number;
  /** 执行采购（成员编码） */
  purchaser?: string;
  /** 战略采购（成员编码） */
  strategicPurchaser?: string;
  /** 供应商代码 */
  supplierCode?: string;
}

/** SupplySkuQueryResp */
export interface SupplySkuQueryResp {
  supplySkuItemList?: Item[];
}

/** SupplySkuSaveReq */
export interface SupplySkuSaveReq {
  /** 清关信息 */
  clearanceInfoList?: SupplySkuClearanceBean[];
  /** 申报信息 */
  declareInfo?: SupplySkuDeclareBean;
  /**
   * 开发时间
   * @format date-time
   */
  developTime?: string;
  /** 财务信息 */
  financeInfo?: SupplySkuFinanceBean;
  /**
   * id
   * @format int64
   */
  id?: number;
  /**
   * 上架时间
   * @format date-time
   */
  listingTime?: string;
  /**
   * 物料类型
   * @format int32
   */
  materialType?: number;
  /** 图片链接列表 */
  productImageList?: string[];
  /** 供应链SKU, 保存时必填 */
  productSku?: string;
  /** 商品SPU代码 */
  productSpu?: string;
  /**
   * 产品状态: 0:不可用,1:可用,2:开发产品
   * @format int32
   */
  productStatus?: number;
  /** 名称CN */
  productTitle?: string;
  /** 名称EN */
  productTitleEn?: string;
  /**
   * 商品类型 1：产品；2：物料
   * @format int32
   */
  productType?: number;
  /** 采购信息 */
  purchaseInfo?: SupplySkuPurchaseSaveReq;
  /**
   * 销售状态
   * @format int32
   */
  saleStatus?: number;
  /** 商品中心sku */
  skuCode?: string;
  /** 规格信息 */
  specInfo?: SupplySkuSpecBean;
  /** 建议售价 */
  suggestPrice?: number;
  /** 建议售价币种 */
  suggestPriceCurrency?: string;
}

/** SupplySkuSpecBean */
export interface SupplySkuSpecBean {
  /** 箱规-高 */
  cartonHeight?: number;
  /** 箱规-长 */
  cartonLength?: number;
  /** 外箱净重（单位kg） */
  cartonNetWeight?: number;
  /**
   * 箱规-单箱数量
   * @format int32
   */
  cartonNum?: number;
  /** 箱规-单项重量 */
  cartonWeight?: number;
  /** 箱规-宽 */
  cartonWidth?: number;
  /** 材质 */
  material?: string;
  /** 产品高度cm */
  productHeight?: number;
  /** 产品长度cm */
  productLength?: number;
  /**
   * 产品等级 1-正常 2-淘汰 3-侵权
   * @format int32
   */
  productLevel?: number;
  /** 产品等级描述 1-正常 2-淘汰 3-侵权 */
  productLevelDesc?: string;
  /** 产品净高度cm */
  productNetHeight?: number;
  /** 产品净长度cm */
  productNetLength?: number;
  /** 净重kg */
  productNetWeight?: number;
  /** 产品净宽度cm */
  productNetWidth?: number;
  /** 供应链sku */
  productSku?: string;
  /** 产品体积(cm3) */
  productVolume?: number;
  /** 毛重kg */
  productWeight?: number;
  /** 产品宽度cm */
  productWidth?: number;
  /**
   * 产品质检 0-不需要 1-需要
   * @format int32
   */
  qualityCheck?: number;
  /** 敏感类型 */
  sensitiveTypeCodeList?: string[];
}

/** SupplySkuSpecResp */
export interface SupplySkuSpecResp {
  /** 箱规-高 */
  cartonHeight?: number;
  /** 箱规-长 */
  cartonLength?: number;
  /** 外箱净重（单位kg） */
  cartonNetWeight?: number;
  /**
   * 箱规-单箱数量
   * @format int32
   */
  cartonNum?: number;
  /** 箱规-单项重量 */
  cartonWeight?: number;
  /** 箱规-宽 */
  cartonWidth?: number;
  /** 材质 */
  material?: string;
  /** 产品高度cm */
  productHeight?: number;
  /** 产品长度cm */
  productLength?: number;
  /**
   * 产品等级 1-正常 2-淘汰 3-侵权
   * @format int32
   */
  productLevel?: number;
  /** 产品等级描述 1-正常 2-淘汰 3-侵权 */
  productLevelDesc?: string;
  /** 产品净高度cm */
  productNetHeight?: number;
  /** 产品净长度cm */
  productNetLength?: number;
  /** 净重kg */
  productNetWeight?: number;
  /** 产品净宽度cm */
  productNetWidth?: number;
  /** 供应链sku */
  productSku?: string;
  /** 产品体积(cm3) */
  productVolume?: number;
  /** 毛重kg */
  productWeight?: number;
  /** 产品宽度cm */
  productWidth?: number;
  /**
   * 产品质检 0-不需要 1-需要
   * @format int32
   */
  qualityCheck?: number;
  /** 敏感类型 */
  sensitiveTypeCodeList?: string[];
}

/** TagBean */
export interface TagBean {
  /** 分组码值 */
  categoryCode?: string;
  /**
   * 分类等级
   * @format int32
   */
  categoryLevel?: number;
  /** 分类名称 */
  categoryNames?: string;
  /** `分组路径` */
  groupPathString?: string;
  /**
   * 商品数量
   * @format int64
   */
  productCount?: number;
  /** 标签商品SPU */
  productSpus?: string;
  /** 标签编码 */
  tagCode?: string;
  /** 标签名称 */
  tagName?: string;
  /** 标签备注 */
  tagRemark?: string;
  /** 标签类型: 空spu, sku , category */
  tagType?: string;
  /** 标签类型描述 */
  tagTypeDesc?: string;
}

/** TagDetailResp */
export interface TagDetailResp {
  /** 关联分类列表-平铺 */
  categoryLevelList?: CategoryLevelBean[];
  /** 关联分类列表-层级 */
  categoryList?: CategoryNodeBean[];
  /** 关联商品SPU/SKU信息集合 */
  productBeanList?: ProductBean[];
  /** 标签关联品线信息 */
  productLineBeanList?: ProductLineBean[];
  /** 标签详情信息 */
  tagBean?: TagBean;
}

/** TagListQueryReq */
export interface TagListQueryReq {
  /** 标签分组码 */
  categoryCode?: string;
  /** 标签分组名 */
  categoryName?: string;
  /** 勾选导出的编码 */
  codeList?: string[];
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
  /** 标签编号 */
  tagCode?: string;
  /** 标签名称 */
  tagName?: string;
  /** 标签类型: 不传是spu, sku, category */
  tagType?: string;
  /** 标签类型列表 */
  tagTypeList?: string[];
}

/** TagListQueryResp */
export interface TagListQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 标签列表 */
  tagBeanList?: TagBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** TagOperateReq */
export interface TagOperateReq {
  /**
   * 操作类型 1:删除删除标签 2：删除标签与商品的关联
   * @format int32
   */
  operateType?: number;
  /** 商品Spu，删除关联时必传 */
  productSpu?: string;
  /** 标签编码 */
  tagCode?: string;
}

/** TagProductConnectReq */
export interface TagProductConnectReq {
  /** 商品sku集合 */
  productSpuList?: string[];
  /** 标签编码 */
  tagCode?: string;
}

/** TagProductResp */
export interface TagProductResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 标签关联的商品信息 */
  productList?: ProductBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** TagSaveReq */
export interface TagSaveReq {
  /** 分组编码 */
  categoryCode?: string;
  /** 对象编码集合 */
  itemCodeList?: string[];
  /** 商品sku集合 */
  productSpuList?: string[];
  /** 标签编码 */
  tagCode?: string;
  /** 标签名称 */
  tagName?: string;
  /** 标签备注 */
  tagRemark?: string;
  /** 标签类型: 不传是spu, sku ,产品分类-category, 产品品线-gtm */
  tagType?: string;
}

/** TagSaveResp */
export interface TagSaveResp {
  /** 标签编码 */
  tagCode?: string;
}

/** TikTokListingProductBean */
export interface TikTokListingProductBean {
  /** 分类编码 */
  categoryCode?: string;
  /** 分类名称 */
  categoryName?: string;
  /** 渠道 */
  channel?: string;
  /** 渠道名称 */
  channelName?: string;
  /** 国家 */
  countryCode?: string;
  /** 国家名称 */
  countryName?: string;
  /** 币种 */
  currencyCode?: string;
  /**
   * 最近15销量
   * @format int32
   */
  day15Sales?: number;
  /**
   * 最近30销量
   * @format int32
   */
  day30Sales?: number;
  /**
   * 最近7销量
   * @format int32
   */
  day7Sales?: number;
  /** ERP站点 */
  erpSite?: string;
  /**
   * 推广首单日期
   * @format date
   */
  firstOrderTime?: string;
  /**
   * 是否缺失映射 0-不缺少 1-缺少
   * @format int32
   */
  missingMapping?: number;
  /** 型号 */
  modelCode?: string;
  /** 型号名字 */
  modelName?: string;
  /** msku */
  msku?: string;
  /** 运营人员编码 */
  operator?: string;
  /** 运营人员名称 */
  operatorName?: string;
  /** 原价 */
  originalPrice?: number;
  /** 价格含税价格 */
  priceIncludeVat?: number;
  /** ItemId */
  productId?: string;
  /** 产品线 */
  productLineCode?: string;
  /** 品线名字 */
  productLineName?: string;
  /** 商品链接 */
  productLink?: string;
  /** 商品名称 */
  productTitle?: string;
  /**
   * 记录时间
   * @format date-time
   */
  recordTime?: string;
  /** 店铺 */
  shop?: string;
  /** 站点 */
  site?: string;
  /** 站点名称 */
  siteName?: string;
  /** skuCode */
  skuCode?: string;
  /** skuId */
  skuId?: string;
  /** spuCode */
  spuCode?: string;
  /**
   * 状态 1-草稿、2-处理中、3-正常、4-异常
   * @format int32
   */
  status?: number;
  /** 状态 1-草稿、2-处理中、3-正常、4-异常 */
  statusDesc?: string;
  /** 标签列表 */
  tagList?: ListingTagBean[];
  /** 三级分类编码 */
  thirdCategoryCode?: string;
  /** 三级分类名称 */
  thirdCategoryName?: string;
}

/** TikTokListingProductReq */
export interface TikTokListingProductReq {
  /** ERP站点 */
  erpSite?: string;
  /** 进行了销量预测的数据 */
  filterSalesforecast?: boolean;
  /** productId/sku_id/msku */
  keyword?: string;
  /** 型号 */
  modelCode?: string;
  /** 运营人员列表 */
  operatorIdList?: string[];
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
  /** 产品线 */
  productLineCode?: string;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 店铺列表 */
  shopList?: string[];
  /** 站点列表 */
  siteList?: string[];
  /** sku列表 */
  skuCodeList?: string[];
  /**
   * 状态 1-草稿、2-处理中、3-正常、4-异常
   * @format int32
   */
  status?: number;
  /** 标签列表 */
  tagList?: string[];
  /** 三级分类编码 */
  thirdCategoryCode?: string;
}

/** TikTokProductListingResp */
export interface TikTokProductListingResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 在线商品列表 */
  resultList?: TikTokListingProductBean[];
  /** 状态数量列表 */
  statusCountBean?: StatusCountBean;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** TiktokAdsPlatformSkuQueryBean */
export interface TiktokAdsPlatformSkuQueryBean {
  /** 广告id */
  adId?: string;
  /** 广告名称 */
  adName?: string;
  /** 店铺sku */
  msku?: string;
}

/** TiktokAdsPlatformSkuQueryResp */
export interface TiktokAdsPlatformSkuQueryResp {
  /** 广告店铺sku映射信息集合 */
  adsPlatformSkuList?: TiktokAdsPlatformSkuQueryBean[];
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

/** TiktokAdsQueryReq */
export interface TiktokAdsQueryReq {
  /** 活动名称/广告组名称/店铺sku */
  keyword?: string;
  /**
   * 月
   * @format int32
   */
  month?: number;
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
   * 季
   * @format int32
   */
  quarter?: number;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /**
   * 周
   * @format int32
   */
  week?: number;
  /**
   * 年
   * @format int32
   */
  year?: number;
}

/** TiktokAdsQueryResp */
export interface TiktokAdsQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 广告信息集合 */
  tiktokAdsQueryList?: TiktokAdsSkuQueryBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** TiktokAdsSkuQueryBean */
export interface TiktokAdsSkuQueryBean {
  /** 广告组名称 */
  adGroupName?: string;
  /** 广告Id */
  adId?: string;
  /** 唯一编码 */
  adsSkuCode?: string;
  /** Average order value */
  averageOrderValue?: number;
  /** 活动名称 */
  campaignName?: string;
  /**
   * 点击量
   * @format int32
   */
  clicks?: number;
  /** 费用 */
  cost?: number;
  /** 每次购买费用 */
  costPerPurchase?: number;
  /** CPC */
  cpc?: number;
  /** CPM */
  cpm?: number;
  /** CTR */
  ctrStr?: string;
  /** 币种 */
  currency?: string;
  /**
   * 统计结束日期
   * @format date
   */
  endDate?: string;
  /** 营业总收入 */
  grossRevenue?: number;
  /**
   * impression
   * @format int32
   */
  impression?: number;
  /**
   * 统计月份
   * @format int32
   */
  month?: number;
  /** 购买比例 */
  purchaseRateStr?: string;
  /**
   * 购买量
   * @format int32
   */
  purchases?: number;
  /** 日期范围 */
  rangeDate?: string;
  /** ROAS */
  roas?: number;
  /** 店铺sku */
  sellerSku?: string;
  /**
   * 统计开始日期
   * @format date
   */
  startDate?: string;
  /**
   * 统计周数
   * @format int32
   */
  week?: number;
  /**
   * 统计年份
   * @format int32
   */
  year?: number;
}

/** TiktokAdsSkuSaveReq */
export interface TiktokAdsSkuSaveReq {
  /** 广告id */
  adId: string;
  /** 店铺sku */
  sellerSku: string;
}

/** TiktokAdsSkuSaveResp */
export interface TiktokAdsSkuSaveResp {
  /** 广告id */
  adId?: string;
}

/** TiktokAffiliateAccountsSpuQueryBean */
export interface TiktokAffiliateAccountsSpuQueryBean {
  /** 唯一编码 */
  affAccountCode?: string;
  /**
   * Buyers
   * @format int32
   */
  buyers?: number;
  /** CO rate */
  coRateStr?: string;
  /**
   * 评论
   * @format int32
   */
  comments?: number;
  /** 达人ID */
  creatorId?: string;
  /** 达人名称 */
  creatorName?: string;
  /** CTR */
  ctrStr?: string;
  /**
   * 统计结束日期
   * @format date
   */
  endDate?: string;
  /** GPM ($) */
  gpm?: number;
  /** 互动率 */
  interactionRateStr?: string;
  /**
   * 点赞
   * @format int32
   */
  likes?: number;
  /**
   * 统计月份
   * @format int32
   */
  month?: number;
  /**
   * New followers
   * @format int32
   */
  newFollowers?: number;
  /**
   * Orders
   * @format int32
   */
  orders?: number;
  /**
   * Product Clicks
   * @format int32
   */
  productClicks?: number;
  /**
   * product impressions
   * @format int32
   */
  productImpressions?: number;
  /** 挂链产品名称 */
  productName?: string;
  /**
   * Product refunds
   * @format int32
   */
  productRefunds?: number;
  /**
   * 在线商品ID
   * @format int64
   */
  productsId?: number;
  /** 团队推广成员 */
  promotionalMemberName?: string;
  /**
   * Refunds ($)
   * @format int32
   */
  refunds?: number;
  /**
   * 分享
   * @format int32
   */
  shares?: number;
  /** 商品SPU */
  spu?: string;
  /** 商品名称中文 */
  spuName?: string;
  /**
   * 统计开始日期
   * @format date
   */
  startDate?: string;
  /**
   * Unit Sales
   * @format int32
   */
  unitSales?: number;
  /**
   * 上线日期
   * @format date
   */
  videoDate?: string;
  /** Video Finish Rate */
  videoFinishRateStr?: string;
  /** 视频ID */
  videoId?: string;
  /** 上线文案 */
  videoInfo?: string;
  /** 上线链接 */
  videoLink?: string;
  /**
   * 上线日期月份
   * @format int32
   */
  videoMonth?: number;
  /**
   * 上线日期季度
   * @format int32
   */
  videoQuarter?: number;
  /** Video Revenue ($) */
  videoRevenue?: number;
  /**
   * Time
   * @format date-time
   */
  videoTime?: string;
  /**
   * 上线日期周数
   * @format int32
   */
  videoWeek?: number;
  /**
   * 上线日期年份
   * @format int32
   */
  videoYear?: number;
  /** @format int32 */
  vtoClicks?: number;
  vtoLRateStr?: string;
  /**
   * 曝光量
   * @format int32
   */
  vv?: number;
  /**
   * 统计周数
   * @format int32
   */
  week?: number;
  /**
   * 统计年份
   * @format int32
   */
  year?: number;
}

/** TiktokAffiliateAccountsSpuQueryReq */
export interface TiktokAffiliateAccountsSpuQueryReq {
  /** 红人名称/挂链产品/产品名称/SPU */
  keyword?: string;
  /** 团队推广成员 */
  memberCodeList?: string[];
  /**
   * 统计月
   * @format int32
   */
  month?: number;
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
   * 统计季
   * @format int32
   */
  quarter?: number;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /**
   * 上线日期月
   * @format int32
   */
  videoMonth?: number;
  /**
   * 上线日期季
   * @format int32
   */
  videoQuarter?: number;
  /**
   * 上线日期周
   * @format int32
   */
  videoWeek?: number;
  /**
   * 上线日期年
   * @format int32
   */
  videoYear?: number;
  /**
   * 统计周
   * @format int32
   */
  week?: number;
  /**
   * 统计年
   * @format int32
   */
  year?: number;
}

/** TiktokAffiliateAccountsSpuQueryResp */
export interface TiktokAffiliateAccountsSpuQueryResp {
  /** 机构达人表现 */
  affiliateAccountsSpuList?: TiktokAffiliateAccountsSpuQueryBean[];
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

/** TiktokTkShopReportByWeekBean */
export interface TiktokTkShopReportByWeekBean {
  /** 广告佣金费用($) */
  adsFee?: number;
  adsOrderAmount?: number;
  /**
   * 广告订单量
   * @format int32
   */
  adsOrderNum?: number;
  /** 广告ROI */
  adsRoiStr?: string;
  /** 品牌编码 */
  brandCode?: string;
  /** 品牌名称 */
  brandName?: string;
  /**
   * 合作量
   * @format int32
   */
  cooperationNum?: number;
  /** 唯一编码 */
  dayReportCode?: string;
  /** 固定合作费用($) */
  fixCooperFee?: number;
  /**
   * 统计月份
   * @format int32
   */
  month?: number;
  /** 自然流量ROI */
  naturalFlowRoiStr?: string;
  /** 自然订单金额($) */
  naturalOrderAmount?: number;
  /**
   * 自然订单量
   * @format int32
   */
  naturalOrderNum?: number;
  /**
   * 上线链接
   * @format int32
   */
  onlineLinkNum?: number;
  /**
   * 总订单量
   * @format int32
   */
  orderSum?: number;
  /** 总订单金额 */
  paymentSum?: number;
  /** 成交金额 */
  priceSum?: number;
  /** 产品名称 */
  productName?: string;
  /** 商品spu */
  productSpu?: string;
  /** 样品费用（含头程+尾程） */
  sampleAmount?: number;
  /** 服务商佣金费用($) */
  serviceCommissionFee?: number;
  /** 总费用($) */
  sumFee?: number;
  /** 总ROI */
  sumRoiStr?: string;
  /** 红人佣金费用($) */
  userCommissionFee?: number;
  /**
   * 曝光量
   * @format int32
   */
  vvNum?: number;
  /**
   * 统计周期
   * @format int32
   */
  week?: number;
  /**
   * 统计年份
   * @format int32
   */
  year?: number;
}

/** TiktokWeekReportQueryReq */
export interface TiktokWeekReportQueryReq {
  /** 产品名称 */
  keyword?: string;
  /**
   * 月份
   * @format int32
   */
  month?: number;
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
   * 季度
   * @format int32
   */
  quarter?: number;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /**
   * 周期
   * @format int32
   */
  week?: number;
  /**
   * 年份
   * @format int32
   */
  year?: number;
}

/** TiktokWeekReportQueryResp */
export interface TiktokWeekReportQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** tiktok小店周报信息 */
  tiktokTkShopReportList?: TiktokTkShopReportByWeekBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** UpdateCategoryReq */
export interface UpdateCategoryReq {
  /** 分类描述 */
  categoryDescription?: string;
  /** 分类名称 */
  categoryName?: string;
  /**
   * 排序
   * @format int32
   */
  sortOrder?: number;
  /** 要修改的分类编码 */
  targetCategoryCode: string;
}

/** UpdateCategoryResp */
export interface UpdateCategoryResp {
  isSuccess?: boolean;
}

/** WalmartListingProductBean */
export interface WalmartListingProductBean {
  /** 渠道 */
  channel?: string;
  /** 渠道名称 */
  channelName?: string;
  /** 国家 */
  countryCode?: string;
  /** 国家名称 */
  countryName?: string;
  /** 商品当前价格 */
  currPrice?: number;
  /** 商品当前价格币种 */
  currency?: string;
  /**
   * 最近15销量
   * @format int32
   */
  day15Sales?: number;
  /**
   * 最近30销量
   * @format int32
   */
  day30Sales?: number;
  /**
   * 最近7销量
   * @format int32
   */
  day7Sales?: number;
  /**
   * 推广首单日期
   * @format date
   */
  firstOrderTime?: string;
  /** gtin */
  gtin?: string;
  /** 商品图片 */
  imageUrl?: string;
  /** ItemId */
  itemId?: string;
  /**
   * 是否缺失映射 0-不缺少 1-缺少
   * @format int32
   */
  missingMapping?: number;
  /** msku */
  msku?: string;
  /** msrp价格 */
  msrpList?: MsrpBean[];
  /** 运营人员编码 */
  operator?: string;
  /** 运营人员名称 */
  operatorName?: string;
  /** 价格 */
  price?: number;
  /** 商品链接 */
  productLink?: string;
  /** 产品信息集合 */
  productSkuList?: ProductSkuBaseBean[];
  /** 商品名称 */
  productTitle?: string;
  /**
   * 记录时间
   * @format date-time
   */
  recordTime?: string;
  /** 备注 */
  remark?: string;
  /** 店铺 */
  shop?: string;
  /** 站点 */
  site?: string;
  /** 站点名称 */
  siteName?: string;
  /** 状态 RETIRED:草稿 ACTIVE:在售 ARCHIVED:归档 */
  status?: string;
  /** 商品状态描述 RETIRED:草稿 ACTIVE:在售 ARCHIVED:归档 */
  statusDesc?: string;
  /** 标签列表 */
  tagList?: ListingTagBean[];
  /** upc */
  upc?: string;
  /** WPID */
  wpId?: string;
}

/** WalmartListingProductReq */
export interface WalmartListingProductReq {
  /** 国家列表 */
  countryCodeList?: string[];
  /** ItemId/msku */
  keyword?: string;
  /** 运营人员列表 */
  operatorIdList?: string[];
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
  /** 店铺列表 */
  shopList?: string[];
  /** 站点列表 */
  siteList?: string[];
  /** 状态 ACTIVE-在售 ARCHIVED-归档 RETIRED-退市 ERROR-异常 */
  status?: string;
  /** 标签列表 */
  tagList?: string[];
}

/** WalmartListingReq */
export interface WalmartListingReq {
  /**
   * 批量动作 1-标签 2-计划人员
   * @format int32
   */
  actionType?: number;
  /** ERP站点 */
  erpSite?: string;
  /** 进行了销量预测的数据 */
  filterSalesforecast?: boolean;
  /** ItemId */
  itemId?: string;
  /** ItemId/msku */
  keyword?: string;
  /** 型号 */
  modelCode?: string;
  /** MSKU */
  msku?: string;
  /** 运营人员列表 */
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
  /** 产品线 */
  productLineCode?: string;
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
  /** 店铺列表 */
  shopList?: string[];
  /** 站点列表 */
  siteList?: string[];
  /** sku列表 */
  skuCodeList?: string[];
  /** 状态列表 ACTIVE-在售 ARCHIVED-归档 RETIRED-退市 */
  statusList?: string[];
  /** 标签列表 */
  tagList?: string[];
  /** 三级分类编码 */
  thirdCategoryCode?: string;
}

/** WalmartListingResp */
export interface WalmartListingResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 在线商品列表 */
  resultList?: SonBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** WalmartProductListingResp */
export interface WalmartProductListingResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 在线商品列表 */
  resultList?: WalmartListingProductBean[];
  /** 状态数量列表 */
  statusCountBean?: StatusCountBean;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** WeekActivityInfoBean */
export interface WeekActivityInfoBean {
  /**
   * 活动天数
   * @format int32
   */
  activityDays?: number;
  /**
   * 活动在本周所占天数
   * @format int32
   */
  activityDaysInWeek?: number;
  /** 活动名称 */
  activityName?: string;
  /** 活动价 */
  activityPrice?: number;
  /** 活动毛利率 */
  activityProfitRate?: number;
  /**
   * 活动类型：0-默认 1-直降 2-Coupon 3-秒杀 4-PED 5-CODE 6-BD
   * @format int32
   */
  activityType?: number;
  /** 活动类型描述 */
  activityTypeDesc?: string;
  /**
   * 活动状态：0-待审核 1-审核通过 2-已驳回
   * @format int32
   */
  approveStatus?: number;
  /** 活动状态描述 */
  approveStatusDesc?: string;
  /** 折扣率 */
  discountRate?: number;
  /**
   * 活动结束日期
   * @format date
   */
  endDate?: string;
  /** 原毛利率 */
  originalProfitRate?: number;
  /** 计划编码 */
  planCode?: string;
  /**
   * 促销等级：0-默认 1-大促 2-小促 3-平促
   * @format int32
   */
  promotionLevel?: number;
  /** 促销等级描述 */
  promotionLevelDesc?: string;
  /**
   * 活动开始日期
   * @format date
   */
  startDate?: string;
  /**
   * 目标销量
   * @format int32
   */
  targetSales?: number;
  /**
   * 周数
   * @format int32
   */
  week?: number;
  /** 周标签 */
  weekTag?: string;
}

/** WeekApproveLogBean */
export interface WeekApproveLogBean {
  /** 审批状态 */
  approveStatusStr?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 创建人 */
  creatorName?: string;
  /** 产品编码 spu编码或者sku编码 */
  dimensionCode?: string;
  /** 产品名称 */
  dimensionName?: string;
  /** 记录编码 */
  discountPlanCode?: string;
  /** 折扣率 */
  discountRateStr?: string;
  /** 类型 */
  discountTypesStr?: string;
  /** 日销 */
  estimateDaySale?: string;
  /** 使用率 */
  usageRateStr?: string;
  /** 周 */
  weekTag?: string;
}

/** WeekApproveLogResp */
export interface WeekApproveLogResp {
  /** 记录 */
  logList?: WeekApproveLogBean[];
}

/** WeekSaleBaseInfo */
export interface WeekSaleBaseInfo {
  /** 唯一记录编码 */
  discountPlanCode?: string;
  /** 折扣 */
  discountRate?: number;
  /**
   * 折扣类型
   * @format int32
   */
  discountType?: number;
  /** 折扣类型集合 请求保存的时候用 */
  discountTypeList?: number[];
  /** 折扣类型 */
  discountTypeStr?: string;
  /**
   * 预估日销
   * @format int32
   */
  estimateDaySale?: number;
  /** 使用率 */
  useRate?: number;
  /**
   * 周数
   * @format int32
   */
  week?: number;
  /** 周标签 */
  weekTag?: string;
}

/** WeekSaleInfo */
export interface WeekSaleInfo {
  /**
   * 审批状态
   * @format int32
   */
  approveStatus?: number;
  /** 审批状态描述 */
  approveStatusDesc?: string;
  /** 币种(成交价) */
  currencyPrice?: string;
  /** 唯一记录编码 */
  discountPlanCode?: string;
  /** 折扣率(小) */
  discountRate?: number;
  /**
   * 折扣类型
   * @format int32
   */
  discountType?: number;
  /** 折扣类型列表 */
  discountTypeList?: number[];
  /** 折扣类型 */
  discountTypeStr?: string;
  /**
   * 预估日销
   * @format int32
   */
  estimateDaySale?: number;
  /**
   * 是否关联 0-否 1-是
   * @format int32
   */
  hasCorrelation?: number;
  /** 折扣率(大) */
  maxDiscountRate?: number;
  /** 毛利率%(大) */
  maxProfitRate?: number;
  /** 成交价(大) */
  maxTransactionPrice?: number;
  /** 毛利率%(小) */
  profitRate?: number;
  /** 成交价(小) */
  transactionPrice?: number;
  /** 使用率 */
  useRate?: number;
  /**
   * 周数
   * @format int32
   */
  week?: number;
  /** 周标签 */
  weekTag?: string;
}

/** WeekSaleSaveInfo */
export interface WeekSaleSaveInfo {
  /** 币种(成交价) */
  currencyPrice?: string;
  /** 唯一记录编码 */
  discountPlanCode?: string;
  /** 折扣率(小) */
  discountRate?: number;
  /** 折扣类型集合 */
  discountTypeList?: number[];
  /**
   * 预估日销
   * @format int32
   */
  estimateDaySale?: number;
  /**
   * 是否关联 0-否 1-是
   * @format int32
   */
  hasCorrelation?: number;
  /** 折扣率(大) */
  maxDiscountRate?: number;
  /** 毛利率%(大) */
  maxProfitRate?: number;
  /** 成交价(大) */
  maxTransactionPrice?: number;
  /** 毛利率%(小) */
  profitRate?: number;
  /** 成交价(小) */
  transactionPrice?: number;
  /** 使用率 */
  useRate?: number;
  /**
   * 周数
   * @format int32
   */
  week?: number;
}

/** WorkflowSubmitResp */
export interface WorkflowSubmitResp {
  instanceId?: string;
  workflowCode?: string;
}

/** productBean */
export interface ProductBean {
  /** 在线商品唯一键 walmart-Msku shopify-variantId TikTok-skuId b2c-msku offline-productSku */
  keyword?: string;
  /** 在线商品店铺 */
  shop?: string;
}

/** CommonResp«AddActivityDetailResp» */
export interface CommonRespAddActivityDetailResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: AddActivityDetailResp;
  traceId?: string;
}

/** CommonResp«AmazonRankingListQueryListResp» */
export interface CommonRespAmazonRankingListQueryListResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: AmazonRankingListQueryListResp;
  traceId?: string;
}

/** CommonResp«CommonExportResp» */
export interface CommonRespCommonExportResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: CommonExportResp;
  traceId?: string;
}

/** CommonResp«List«AmazonOperatorCheckDetailBean»» */
export interface CommonRespListAmazonOperatorCheckDetailBean {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: AmazonOperatorCheckDetailBean[];
  traceId?: string;
}

/** CommonResp«List«MultiPriceDetailResp»» */
export interface CommonRespListMultiPriceDetailResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: MultiPriceDetailResp[];
  traceId?: string;
}

/** CommonResp«List«ProductLineSaveResp»» */
export interface CommonRespListProductLineSaveResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: ProductLineSaveResp[];
  traceId?: string;
}

/** CommonResp«List«string»» */
export interface CommonRespListString {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: string[];
  traceId?: string;
}

/** CommonResp«MacSupplierQueryResp» */
export interface CommonRespMacSupplierQueryResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: MacSupplierQueryResp;
  traceId?: string;
}

/** CommonResp«Map«string,OdsFinanceCurrency»» */
export interface CommonRespMapStringOdsFinanceCurrency {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: Record<string, OdsFinanceCurrency>;
  traceId?: string;
}

/** CommonResp«MsrpCalculateBaseDataResp» */
export interface CommonRespMsrpCalculateBaseDataResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: MsrpCalculateBaseDataResp;
  traceId?: string;
}

/** CommonResp«MsrpCalculatePriceDetailResp» */
export interface CommonRespMsrpCalculatePriceDetailResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: MsrpCalculatePriceDetailResp;
  traceId?: string;
}

/** CommonResp«MsrpOnlinePromotionResp» */
export interface CommonRespMsrpOnlinePromotionResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: MsrpOnlinePromotionResp;
  traceId?: string;
}

/** CommonResp«MsrpQueryChannelBatchListResp» */
export interface CommonRespMsrpQueryChannelBatchListResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: MsrpQueryChannelBatchListResp;
  traceId?: string;
}

/** CommonResp«MsrpSkuDetailBean» */
export interface CommonRespMsrpSkuDetailBean {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: MsrpSkuDetailBean;
  traceId?: string;
}

/** CommonResp«MsrpSkuDetailResp» */
export interface CommonRespMsrpSkuDetailResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: MsrpSkuDetailResp;
  traceId?: string;
}

/** CommonResp«MsrpSkuListResp» */
export interface CommonRespMsrpSkuListResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: MsrpSkuListResp;
  traceId?: string;
}

/** CommonResp«MsrpSpuDetailResp» */
export interface CommonRespMsrpSpuDetailResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: MsrpSpuDetailResp;
  traceId?: string;
}

/** CommonResp«MultiPriceQueryListResp» */
export interface CommonRespMultiPriceQueryListResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: MultiPriceQueryListResp;
  traceId?: string;
}

/** CommonResp«OperatorQueryResp» */
export interface CommonRespOperatorQueryResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: OperatorQueryResp;
  traceId?: string;
}

/** CommonResp«PlanCreateCheckResp» */
export interface CommonRespPlanCreateCheckResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: PlanCreateCheckResp;
  traceId?: string;
}

/** CommonResp«ProductListQueryResp» */
export interface CommonRespProductListQueryResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: ProductListQueryResp;
  traceId?: string;
}

/** CommonResp«ProductShadowDetailStatisticsResp» */
export interface CommonRespProductShadowDetailStatisticsResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: ProductShadowDetailStatisticsResp;
  traceId?: string;
}

/** CommonResp«ProductShadowSearchResp» */
export interface CommonRespProductShadowSearchResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: ProductShadowSearchResp;
  traceId?: string;
}

/** CommonResp«ProductShowDetailSearchResp» */
export interface CommonRespProductShowDetailSearchResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: ProductShowDetailSearchResp;
  traceId?: string;
}

/** CommonResp«ProductShowDetailStatisticsResp» */
export interface CommonRespProductShowDetailStatisticsResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: ProductShowDetailStatisticsResp;
  traceId?: string;
}

/** CommonResp«ProductShowSearchResp» */
export interface CommonRespProductShowSearchResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: ProductShowSearchResp;
  traceId?: string;
}

/** CommonResp«ProductSkuMappingQueryResp» */
export interface CommonRespProductSkuMappingQueryResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: ProductSkuMappingQueryResp;
  traceId?: string;
}

/** CommonResp«PromotionPlanDeleteResp» */
export interface CommonRespPromotionPlanDeleteResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: PromotionPlanDeleteResp;
  traceId?: string;
}

/** CommonResp«PromotionPlanDetailResp» */
export interface CommonRespPromotionPlanDetailResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: PromotionPlanDetailResp;
  traceId?: string;
}

/** CommonResp«PromotionPlanReviewListResp» */
export interface CommonRespPromotionPlanReviewListResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: PromotionPlanReviewListResp;
  traceId?: string;
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

/** CommonResp«object» */
export interface CommonRespObject {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: object;
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

/** EnumBean«string» */
export interface EnumBeanString {
  /** 字段code */
  key?: string;
  /** 字段值, 用于前端展示 */
  value?: string;
}

/** 商品保存参数 */
export interface _ {
  /** 品牌编码 */
  brandCode?: string;
  /** 五级分类编码 */
  categoryCode: string;
  /** 归属人编码 */
  createBy?: string;
  /** GTM经理 */
  gtm?: string;
  /** 型号信息 */
  modelCodeList?: string[];
  /** 商品名称 */
  name: string;
  /** 商品名称英文 */
  nameEn?: string;
  /** 商品属性列表 */
  newAttrList?: ProductAttrBean[];
  /** 商品属性列表 */
  oldAttrList?: ProductAttrBean[];
  /**
   * 操作类型 1：保存草稿 2：提交审批
   * @format int32
   * @min 1
   * @exclusiveMin false
   * @max 2
   * @exclusiveMax false
   */
  operateType?: number;
  /** 计划专员 */
  planner?: string;
  /**
   * 商品id
   * @format int64
   */
  productId?: number;
  /** 商品图片 */
  productImage?: string;
  /** 商品等级 S级：S A级：A B级：B C级：C */
  productLevelNew?: string;
  /** 品线 */
  productLine?: string;
  productSpecList?: ProductSpecSaveBean[];
  /** 产品Id,商品编码，商品spu  */
  productSpu: string;
  /**
   * 商品类型
   * @format int32
   */
  productType?: number;
  /**
   * 产品卖点
   * @minLength 1
   * @maxLength 200
   */
  sellingPoint?: string;
  /** 系列信息 */
  seriesCodeList?: string[];
  /** sku信息 */
  skuList?: ProductSkuSaveBean[];
  /** 是否更新sku */
  skuUpdateFlag?: boolean;
  /** 商品标签 */
  tagCodeList?: string[];
}
